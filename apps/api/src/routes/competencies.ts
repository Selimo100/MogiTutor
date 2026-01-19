import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import fs from 'fs';
import path from 'path';
import util from 'util';
import { pipeline } from 'stream';
import crypto from 'crypto';
import sharp from 'sharp';

const pump = util.promisify(pipeline);
const UPLOAD_DIR = '/data/uploads';

// Ensure upload dir exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Validation constants
const MAX_PDF_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_IMG_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

// Schema definitions
const StepSchema = z.object({
  title: z.string(),
  description: z.string(),
  codeBlocks: z.array(z.object({
    language: z.string(),
    label: z.string().optional(),
    code: z.string()
  })).optional()
});

const CompetencyUpdateSchema = z.object({
  summary: z.string().nullable().optional(),
  implementationNotes: z.string().nullable().optional(),
  reflection: z.string().nullable().optional(),
  learningGoal: z.string().nullable().optional(),
  status: z.enum(['open', 'in_progress', 'done']).optional(),
  tags: z.array(z.string()).optional(),
  steps: z.array(StepSchema).optional()
});

export async function competencyRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  // GET /api/modules - List all modules with stats
  server.get('/', async (req, reply) => {
    // Group by module and status
    const stats = await prisma.competency.groupBy({
      by: ['module', 'status'],
      _count: {
        status: true
      }
    });

    // Transform into nice format
    const modules: Record<string, any> = {};
    for (const s of stats) {
      if (!modules[s.module]) {
        modules[s.module] = { module: s.module, total: 0, done: 0, open: 0, in_progress: 0 };
      }
      modules[s.module][s.status] += s._count.status;
      modules[s.module].total += s._count.status;
    }

    return Object.values(modules);
  });

  // GET /api/modules/:module/competencies
  server.get('/:module/competencies', {
    schema: {
      params: z.object({ module: z.string() }),
      querystring: z.object({
        level: z.string().optional(),
        tag: z.string().optional(),
        status: z.string().optional(),
      })
    }
  }, async (req, reply) => {
    const { module } = req.params;
    const { level, tag, status } = req.query;
    
    // Build where clause
    const where: any = { module };
    if (level) where.level = level;
    if (status) where.status = status;
    if (tag) where.tags = { has: tag };

    const competencies = await prisma.competency.findMany({
      where,
      orderBy: { code: 'asc' }
    });
    return competencies;
  });

  // GET /api/modules/:module/competencies/:code
  server.get('/:module/competencies/:code', {
    schema: {
      params: z.object({ module: z.string(), code: z.string() })
    }
  }, async (req, reply) => {
    const { module, code } = req.params;
    const competency = await prisma.competency.findFirst({
        where: { 
          module,
          code: { equals: code, mode: 'insensitive' }
        },
        include: {
            evidence: {
                include: { fileAsset: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    });
    
    if (!competency) {
      return reply.code(404).send({ error: 'Competency not found' });
    }
    return competency;
  });

  // PATCH /api/modules/:module/competencies/:code
  server.patch('/:module/competencies/:code', {
    schema: {
      params: z.object({ module: z.string(), code: z.string() }),
      body: CompetencyUpdateSchema
    }
  }, async (req, reply) => {
    const { module, code } = req.params;
    const data = req.body;
    
    const existing = await prisma.competency.findFirst({
        where: { 
            module,
            code: { equals: code, mode: 'insensitive' }
        }
    });

    if (!existing) return reply.code(404).send({ error: 'Not found' });

    const updateData: any = { ...data };
    if (data.steps) {
        updateData.stepsJson = data.steps;
        delete updateData.steps;
    }

    const updated = await prisma.competency.update({
      where: { id: existing.id },
      data: updateData
    });

    return updated;
  });

  // POST /api/modules/:module/competencies/:code/evidence
  server.post('/:module/competencies/:code/evidence', async (req, reply) => {
    const { module, code } = req.params as { module: string, code: string };
    
    // 1. Verify Competency
    const competency = await prisma.competency.findFirst({
        where: { 
            module,
            code: { equals: code, mode: 'insensitive' }
        }
    });

    if (!competency) return reply.code(404).send({ error: 'Competency not found' });

    // 2. Process Files
    const parts = req.parts();
    let evidenceCreated;

    for await (const part of parts) {
      if (part.type === 'file') {
        const { filename, mimetype } = part;

        // Validation
        if (!ALLOWED_MIME_TYPES.includes(mimetype)) {
             await pump(part.file, fs.createWriteStream('/dev/null'));
             return reply.code(400).send({ error: 'Invalid file type. Only PDF, PNG, JPG allowed.' });
        }

        const isImage = mimetype.startsWith('image/');
        const limit = isImage ? MAX_IMG_SIZE : MAX_PDF_SIZE;

        try {
            // Buffer
            const chunks = [];
            let size = 0;
            for await (const chunk of part.file) {
                size += chunk.length;
                if (size > limit) throw new Error('File too large');
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);
            
            // Hash
            const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
            
            // Magic Header Validation
            const header = buffer.toString('hex', 0, 8).toUpperCase();
            let isValidHeader = false;
            
            if (mimetype === 'application/pdf') {
                // %PDF- (25 50 44 46 2D)
                if (buffer.toString('utf8', 0, 5) === '%PDF-') isValidHeader = true;
            } else if (mimetype === 'image/png') {
                // 89 50 4E 47 0D 0A 1A 0A
                if (header.startsWith('89504E470D0A1A0A')) isValidHeader = true; 
            } else if (mimetype === 'image/jpeg' || mimetype === 'image/jpg') {
                // FF D8
                if (header.startsWith('FFD8')) isValidHeader = true;
            }

            if (!isValidHeader) {
                throw new Error('Invalid file content: Magic header mismatch');
            }

            // Generate Filename
            const ext = path.extname(filename).toLowerCase() || (isImage ? '.jpg' : '.pdf');
            const storedFileName = `${crypto.randomUUID()}${ext}`;
            const storagePath = path.join(UPLOAD_DIR, storedFileName);

            let width = null;
            let height = null;
            let fileType = 'pdf'; 

            // Image Processing
            if (isImage) {
                fileType = 'image';
                const image = sharp(buffer);
                const metadata = await image.metadata();
                width = metadata.width;
                height = metadata.height;
                // Strip Metadata (Exif) and save
                await image.rotate().withMetadata({ density: undefined }).toFile(storagePath);
            } else {
                // Write PDF
                fs.writeFileSync(storagePath, buffer);
            }

            // Create DB Entry
            // fileType needs to catch the Enum "pdf" | "image" which matches our string 'pdf'/'image'
            evidenceCreated = await prisma.evidence.create({
                data: {
                    competencyId: competency.id,
                    type: fileType,
                    title: filename,
                    description: `Uploaded ${fileType}`,
                    fileAsset: {
                        create: {
                            originalName: filename,
                            mimeType: mimetype,
                            fileType: fileType as any, // Cast to Enum
                            sizeBytes: size,
                            sha256,
                            storagePath: storedFileName,
                            width: width || undefined,
                            height: height || undefined
                        }
                    }
                },
                include: { fileAsset: true }
            });
            break; // Single file only
        } catch (e: any) {
            console.error(e);
            return reply.code(400).send({ error: e.message || 'Upload failed' });
        }
      }
    }
    
    if (!evidenceCreated) return reply.code(400).send({ error: 'No file uploaded' });
    return evidenceCreated;
  });
}
