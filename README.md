# DockTutor

A fullstack application for tracking competency progress in module M347.

## Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Fastify, TypeScript, Prisma, Zod, Sharp (Image Processing)
- **Database**: PostgreSQL 15 (Docker)
- **Container**: Docker Compose

## Features

- Competency Tracking & Reflection
- Evidence Upload (PDF, PNG, JPG)
  - **PDF**: Max 25 MB
  - **Images**: Max 10 MB (Metadata/EXIF stripped)
  - Secure Magic Byte Validation
- Inline Image Previews & Grid Layout
- Progress Dashboard
- Export to PDF (Browser Print Friendly)

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local dev)
- pnpm

### Quick Start (Docker)

Run the entire stack with one command:

\`\`\`bash
pnpm docker:up

# OR

docker compose up --build
\`\`\`

- **Web**: [http://localhost:4173](http://localhost:4173)
- **API**: [http://localhost:4180](http://localhost:4180)
- **Adminer (DB UI)**: [http://localhost:4181](http://localhost:4181)

### Development (Local)

1. Start Database:
   \`\`\`bash
   docker compose up -d db
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`
3. Run migrations:
   \`\`\`bash
   cd apps/api && pnpm migrate:dev
   \`\`\`
4. Seed database (creates competencies):
   \`\`\`bash
   cd apps/api && pnpm seed
   \`\`\`
5. Start dev servers:
   \`\`\`bash
   pnpm dev
   \`\`\`

## Features

### Competency Editing

Navigate to any competency status page (e.g., A1G) via the M347 Matrix.
Click **"Edit Mode"** to:

- Change status (Open / In Progress / Done)
- Edit summary, implementation notes, and reflection (Markdown supported)
- Add tags

Saved changes persist to the database (`docktutor_db` volume).

### PDF Uploads

In Edit Mode (or View Mode), scroll to **Evidence & Files**.

- Click "Upload PDF" and select a file.
- Files are stored in the `docktutor_uploads` Docker volume.
- Max file size: 25MB.
- Only valid PDFs (`application/pdf`) are accepted.

## Architecture

- `apps/web`: Next.js frontend.
- `apps/api`: Fastify backend API.
- `docker-compose.yml`: Orchestrator.

The API runs on port 8080 internally.
The Frontend connects to API via internal network `http://api:8080/api` (SSR) or external `http://localhost:4180/api` (Client).
The `docker-compose.yml` configures `NEXT_PUBLIC_API_BASE_URL` appropriately.

## Volumes

- `docktutor_db`: Persists PostgreSQL data.
- `docktutor_uploads`: Persists uploaded PDF files.
