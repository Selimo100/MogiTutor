FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS builder
WORKDIR /app

# Copy configuration files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN pnpm install --frozen-lockfile --filter docktutor-api...

# Copy source code
COPY apps/api ./apps/api

# Generate client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build
RUN pnpm run build
# Compile seed script
RUN npx tsc prisma/seed.ts --outDir dist --skipLibCheck --module commonjs --target es2019 --moduleResolution node --esModuleInterop

# Deploy prod deps
WORKDIR /app
RUN pnpm deploy --filter=docktutor-api --prod --legacy /prod/api

# Runner
FROM base AS runner
WORKDIR /app
RUN apk add --no-cache openssl

# Copy deployed app
COPY --from=builder /prod/api ./

# Copy build
COPY --from=builder /app/apps/api/dist ./dist

# Copy schema
COPY --from=builder /app/apps/api/prisma ./prisma

# Install prisma to helper generate client
# Force pnpm to run build scripts (download engines) by disabling verify-store-integrity check or similar if needed, 
# but specifically we need to ensure postinstall runs. 
# pnpm v10+ requires approval.
RUN pnpm config set ignore-scripts false
# Match the version of @prisma/client found in logs (5.22.0)
RUN pnpm add -D prisma@5.22.0
RUN pnpm prisma generate

EXPOSE 8080
CMD ["node", "dist/src/index.js"]
