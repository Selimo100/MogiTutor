import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pipeline } from 'stream';
import util from 'util';

const pump = util.promisify(pipeline);
const UPLOAD_DIR = '/data/uploads';

// Ensure upload dir exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function evidenceRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  // GET evidence for competency
  server.get('/competencies/:id/evidence', {
    schema: {
      params: z.object({ id: z.string() })
    }
  }, async (req, reply) => {
    const { id } = req.params;
    
    const competency = await prisma.competency.findFirst({
        where: { OR: [{ id }, { code: id }] }
    });
    
    if (!competency) return reply.code(404).send({ error: 'Competency not found' });

    const evidence = await prisma.evidence.findMany({
      where: { competencyId: competency.id },
      include: { fileAsset: true },
      orderBy: { createdAt: 'desc' }
    });
    return evidence;
  });

  // UPLOAD PDF (and create evidence)
  server.post('/evidence/:competencyId/upload-pdf', async (req, reply) => {
    const { competencyId } = req.params as { competencyId: string };
    
    // Find competency
    const competency = await prisma.competency.findFirst({
         where: { OR: [{ id: competencyId }, { code: competencyId }] }
    });
    if (!competency) return reply.code(404).send({ error: 'Competency not found' });

    const data = await req.file();
    if (!data) return reply.code(400).send({ error: 'No file uploaded' });

    // Validate MIME
    if (data.mimetype !== 'application/pdf') {
        return reply.code(400).send({ error: 'Only PDF files are allowed' });
    }

    // Prepare storage
    const fileId = crypto.randomUUID();
    const storedFileName = `${fileId}.pdf`;
    const storagePath = path.join(UPLOAD_DIR, storedFileName);
    
    // Create write stream
    const writeStream = fs.createWriteStream(storagePath);
    
    // Calculate hash on the fly? Or read later. Let's just write first.
    // To check magic bytes, we need to peek at the stream. 
    // fastify-multipart stream doesn't easily allow peeking without buffering.
    // For simplicity, we write to disk, then validate header.
    
    await pump(data.file, writeStream);

    // Validate size and magic bytes
    const stats = fs.statSync(storagePath);
    
    // Check magic bytes
    const fd = fs.openSync(storagePath, 'r');
    const buffer = Buffer.alloc(5);
    fs.readSync(fd, buffer, 0, 5, 0);
    fs.closeSync(fd);
    
    if (buffer.toString('utf8') !== '%PDF-') {
        fs.unlinkSync(storagePath);
        return reply.code(400).send({ error: 'Invalid PDF file content' });
    }

    // SHA256 of file
    const fileBuffer = fs.readFileSync(storagePath);
    const sha256 = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // Create Evidence record
    const evidence = await prisma.evidence.create({
        data: {
            competencyId: competency.id,
            type: 'pdf',
            title: data.filename,
            description: 'Uploaded PDF',
            fileAsset: {
                create: {
                    originalName: data.filename,
                    mimeType: data.mimetype,
                    fileType: 'pdf',
                    sizeBytes: stats.size,
                    sha256: sha256,
                    storagePath: storedFileName // Relative to upload dir
                }
            }
        },
        include: { fileAsset: true }
    });

    return evidence;
  });

  // DOWNLOAD File
  server.get('/files/:id', {
      schema: { 
          params: z.object({ id: z.string() }) 
      }
  }, async (req, reply) => {
      const { id } = req.params;
      const asset = await prisma.fileAsset.findUnique({ where: { id } });
      if (!asset) return reply.code(404).send({ error: 'File not found' });

      const filePath = path.join(UPLOAD_DIR, asset.storagePath);
      if (!fs.existsSync(filePath)) {
          // Fallback cleanup if file missing
          return reply.code(404).send({ error: 'File on disk missing' });
      }

      const stream = fs.createReadStream(filePath);
      reply.type(asset.mimeType);
      
      // Images inline, everything else attachment
      if (asset.mimeType.startsWith('image/')) {
          reply.header('Content-Disposition', 'inline');
      } else {
          reply.header('Content-Disposition', `attachment; filename="${asset.originalName}"`);
      }
      
      return reply.send(stream);
  });


  // DELETE Evidence
  server.delete('/evidence/:id', {
      schema: { params: z.object({ id: z.string() }) }
  }, async (req, reply) => {
      const { id } = req.params;
      
      const evidence = await prisma.evidence.findUnique({ 
          where: { id },
          include: { fileAsset: true } 
      });

      if (!evidence) {
          return reply.code(404).send({ error: 'Evidence not found' });
      }

      // If there is a file asset, delete the physical file
      if (evidence.fileAsset) {
          const filePath = path.join(UPLOAD_DIR, evidence.fileAsset.storagePath);
          if (fs.existsSync(filePath)) {
              try {
                  fs.unlinkSync(filePath);
              } catch (e) {
                  server.log.warn({ err: e }, `Failed to delete file on disk: ${filePath}`);
              }
          }
      }

      await prisma.evidence.delete({ where: { id } });

      return { success: true };
  });

  // DELETE File
  server.delete('/files/:id', {
      schema: { params: z.object({ id: z.string() }) }
  }, async (req, reply) => {
      const { id } = req.params;
      const asset = await prisma.fileAsset.findUnique({ where: { id } });
      if (!asset) return reply.code(404).send({ error: 'File not found' });

      // Delete file from disk
      const filePath = path.join(UPLOAD_DIR, asset.storagePath);
      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
      }

      // Delete DB record (Cascade deletes Evidence? No, Evidence deletes Asset. Asset -> Evidence is unique.)
      // Actually schema says: Evidence -> FileAsset (FileAsset.evidenceId is FK).
      // So deleting local FileAsset is fine. But we probably want to delete the Parent Evidence too if it's just a file wrapper.
      // Let's delete the Evidence, which cascades to FileAsset.
      
      const evidenceId = asset.evidenceId;
      await prisma.evidence.delete({ where: { id: evidenceId } });

      return { success: true };
  });
}
