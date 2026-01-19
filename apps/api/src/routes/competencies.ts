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
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');

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

  // GET /tutors - List all tutors with modules and aggregated stats
  server.get('/tutors', async (req, reply) => {
    const tutors = await prisma.tutor.findMany({
      include: {
        modules: {
          include: {
            competencies: {
                select: { status: true }
            }
          }
        }
      }
    });

    // Transform into frontend-friendly format with stats
    const result = tutors.map(tutor => ({
      slug: tutor.slug,
      name: tutor.name,
      modules: tutor.modules.map(module => {
         const stats = module.competencies.reduce((acc, curr) => {
             acc[curr.status] = (acc[curr.status] || 0) + 1;
             acc.total += 1;
             return acc;
         }, { total: 0, open: 0, in_progress: 0, done: 0 } as any);
         
         return {
             code: module.code,
             title: module.title,
             stats
         };
      })
    }));

    return result;
  });

  // GET /tutors/:tutorSlug/modules/:moduleCode/competencies
  // List competencies for a specific module
  server.get('/tutors/:tutorSlug/modules/:moduleCode/competencies', {
    schema: {
      params: z.object({ tutorSlug: z.string(), moduleCode: z.string() }),
      querystring: z.object({
        level: z.string().optional(),
        tag: z.string().optional(),
        status: z.string().optional(),
      })
    }
  }, async (req, reply) => {
    const { tutorSlug, moduleCode } = req.params;
    const { level, tag, status } = req.query;
    
    // Find module ID first
    const module = await prisma.module.findFirst({
        where: {
            code: moduleCode,
            tutor: { slug: tutorSlug }
        }
    });

    if (!module) return reply.code(404).send({ error: 'Module not found' });

    // Build where clause
    const where: any = { moduleId: module.id };
    if (level) where.level = level;
    if (status) where.status = status;
    if (tag) where.tags = { has: tag };

    const competencies = await prisma.competency.findMany({
      where,
      orderBy: { code: 'asc' }
    });
    return competencies;
  });

  // GET /tutors/:tutorSlug/modules/:moduleCode/competencies/:code
  server.get('/tutors/:tutorSlug/modules/:moduleCode/competencies/:code', {
    schema: {
      params: z.object({ tutorSlug: z.string(), moduleCode: z.string(), code: z.string() })
    }
  }, async (req, reply) => {
    const { tutorSlug, moduleCode, code } = req.params;
    
    const competency = await prisma.competency.findFirst({
        where: { 
          code: { equals: code, mode: 'insensitive' },
          module: {
              code: moduleCode,
              tutor: { slug: tutorSlug }
          }
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

  // PATCH /tutors/:tutorSlug/modules/:moduleCode/competencies/:code
  server.patch('/tutors/:tutorSlug/modules/:moduleCode/competencies/:code', {
    schema: {
      params: z.object({ tutorSlug: z.string(), moduleCode: z.string(), code: z.string() }),
      body: CompetencyUpdateSchema
    }
  }, async (req, reply) => {
    const { tutorSlug, moduleCode, code } = req.params;
    const data = req.body;
    
    const existing = await prisma.competency.findFirst({
        where: { 
            code: { equals: code, mode: 'insensitive' },
            module: {
                code: moduleCode,
                tutor: { slug: tutorSlug }
            }
        }
    });

    if (!existing) return reply.code(404).send({ error: 'Competency not found' });

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

  // POST /tutors/:tutorSlug/modules/:moduleCode/competencies/:code/evidence
  server.post('/tutors/:tutorSlug/modules/:moduleCode/competencies/:code/evidence', async (req, reply) => {
    const { tutorSlug, moduleCode, code } = req.params as { tutorSlug: string, moduleCode: string, code: string };
    
    // 1. Verify Competency
    const competency = await prisma.competency.findFirst({
        where: { 
            code: { equals: code, mode: 'insensitive' },
            module: {
                code: moduleCode,
                tutor: { slug: tutorSlug }
            }
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
                if (buffer.toString('utf8', 0, 5) === '%PDF-') isValidHeader = true;
            } else if (mimetype === 'image/png') {
                if (header.startsWith('89504E470D0A1A0A')) isValidHeader = true; 
            } else if (mimetype === 'image/jpeg' || mimetype === 'image/jpg') {
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
                await image.rotate().withMetadata({ density: undefined }).toFile(storagePath);
            } else {
                fs.writeFileSync(storagePath, buffer);
            }

            // Create DB Entry
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
                            fileType: fileType as any, 
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
            break; 
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
