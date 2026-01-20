# Local Development Guide (Hybrid Mode)

For the fastest development experience, we recommend running the database in Docker and the applications (Web & API) natively on your machine. This avoids the need to rebuild Docker containers for every code change.

## 🚀 Quick Start

### 1. Start the Database

Start only the database container in the background. It will be exposed on port `55432`.

```bash
docker compose up db -d
```

### 2. Install Dependencies (First Run Only)

If this is your first time running locally, install packages and set up the database.

```bash
pnpm install

# Initialize Database Schema
cd apps/api
pnpm prisma migrate dev

# Populate Initial Data (Tutors, Modules, Competencies)
pnpm run seed

# Return to root
cd ../..
```

### 3. Start Development Servers

Run this command in the root folder. It starts both the Next.js frontend and Fastify backend.

```bash
pnpm dev
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8080](http://localhost:8080)

---

## ⚡️ Workflow Tips

### When do I need to restart `pnpm dev`?

| Scenario                  | Action Required                                          |
| ------------------------- | -------------------------------------------------------- |
| **Edit React / TS / CSS** | ✅ **None** (Auto-Reloads)                               |
| **Edit `seed-data.ts`**   | ⚠️ Run `pnpm run seed` in `apps/api` (Separate Terminal) |
| **Edit `schema.prisma`**  | ⚠️ Run `pnpm prisma migrate dev` in `apps/api`           |
| **Edit `.env` or config** | 🔴 **Restart** `pnpm dev`                                |
| **Install new package**   | 🔴 **Restart** `pnpm dev`                                |

### Using Multiple Terminals

We recommend keeping **two terminal tabs** open in VS Code:

1.  **Server Terminal:** Runs `pnpm dev`. Only touch this if you need to restart the server.
2.  **Command Terminal:** Use this for git commands, running migrations, seeding data, or installing packages.

### Database Management

To view or debug your local database, you can use the Adminer interface if you start it:

```bash
docker compose up adminer -d
```

Then access [http://localhost:8081](http://localhost:8081).
