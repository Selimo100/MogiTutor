import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { competencyRoutes } from './routes/competencies';
import { evidenceRoutes } from './routes/evidence';

export const buildApp = async (): Promise<FastifyInstance> => {
  const app = fastify({
    logger: true,
  });

  // Validation
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Plugins
  await app.register(cors, {
    origin: '*', // Allow all for dev, restrict in prod if needed
  });

  await app.register(multipart, {
    limits: {
      fileSize: 25 * 1024 * 1024, // 25MB
    },
  });

  // Health Check
  app.get('/api/health', async () => {
    return { ok: true, version: '1.0.0', time: new Date().toISOString() };
  });

  // Routes
  await app.register(competencyRoutes, { prefix: '/api' });
  await app.register(evidenceRoutes, { prefix: '/api' }); // General evidence/file routes

  return app;
};
