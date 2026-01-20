# Docker Development Guide (Full Container Mode)

This mode runs the entire stack (Frontend, Backend, Database) inside isolated Docker containers. This is the most reliable way to ensure your environment matches production, but the development loop (edit -> see changes) can be slightly slower than the hybrid mode.

## 🚀 Quick Start

### 1. Start the Environment

Run this single command to build and start all services.

```bash
docker compose up --build
```

- `--build` ensures that any changes to `package.json` or `Dockerfile` are applied.
- The terminal will stream logs from all services.

### 2. Access the Application

Once the logs show `Server listening`, you can access the services:

- **Web App:** [http://localhost:4173](http://localhost:4173)
- **Public API:** [http://localhost:4180](http://localhost:4180)
- **Database UI (Adminer):** [http://localhost:4181](http://localhost:4181)

---

## ⚡️ Workflow Tips

### Common Tasks

| Task                             | Command                                       |
| -------------------------------- | --------------------------------------------- |
| **Stop App**                     | `Ctrl + C`                                    |
| **Stop & Remove Containers**     | `docker compose down`                         |
| **Reset Database (Wipe Data)**   | `docker compose down -v` (Removes volumes)    |
| **View Logs (Specific Service)** | `docker compose logs -f api` (or `web`, `db`) |

### Running Commands Inside Containers

To run scripts like migrations or seeding without stopping the server, execute them inside the running container:

**Run Migrations:**

```bash
docker compose exec api npx prisma migrate deploy
```

**Reseed Database:**

```bash
docker compose exec api npm run seed
```

### When do I need to Rebuild?

If you make any of these changes, you must run `docker compose up --build`:

1.  **Installing new packages:** (`pnpm add ...` in package.json)
2.  **Changing Environment Variables:** (`docker-compose.yml` or `.env`)
3.  **Editing Dockerfiles:** (`apps/web/Dockerfile`, `apps/api/Dockerfile`)

### Troubleshooting

If the database connection fails on startup, it might be that the `db` container isn't ready yet. The `api` container is configured to wait for it, but you can always restart just the api:

```bash
docker compose restart api
```
