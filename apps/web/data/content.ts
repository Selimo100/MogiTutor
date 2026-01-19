export type ContentBlock = {
  type: 'text' | 'code';
  content: string;
  language?: string;
  filename?: string;
};

export type Section = {
  id: string;
  title: string;
  img?: string; 
  blocks: ContentBlock[];
};

export const guideContent: Section[] = [
  {
    id: 'intro',
    title: '1. What is Docker?',
    blocks: [
      {
        type: 'text',
        content: `Docker is an open-source platform that developers use to build, deploy, run, update, and manage containers—standardized, executable components that combine application source code with the operating system (OS) libraries and dependencies required to run that code in any environment.
        
        Think of it like a shipping container: it doesn't matter what's inside (cars, food, electronics) or what vehicle carries it (ship, train, truck); the container itself is standard. Similarly, a Docker container runs the same on your laptop, a colleague's machine, or a production server.`
      },
      {
        type: 'code',
        language: 'bash',
        content: 'docker --version\n# Docker version 24.0.5, build ced0996',
        filename: 'Terminal'
      }
    ]
  },
  {
    id: 'install',
    title: '2. Install Docker',
    blocks: [
      {
        type: 'text',
        content: 'To get started, you need Docker Desktop (for Mac/Windows) or Docker Engine (for Linux).'
      },
      {
        type: 'code',
        language: 'bash',
        content: `# Linux (Ubuntu example)
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify installation
sudo docker run hello-world`,
        filename: 'Install Command'
      },
      {
        type: 'text',
        content: 'For Mac and Windows, simply download "Docker Desktop" from the official site and run the installer.'
      }
    ]
  },
  {
    id: 'concepts',
    title: '3. Core Concepts',
    blocks: [
      {
        type: 'text',
        content: `**Image**: A read-only template with instructions for creating a Docker container. It's like a class in OOP.
        
**Container**: A runnable instance of an image. It's like an object in OOP.
        
**Registry**: A place to store images (e.g., Docker Hub).`
      },
      {
        type: 'code',
        language: 'bash',
        content: `# List local images
docker images

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a`,
        filename: 'Concept Check'
      }
    ]
  },
  {
    id: 'cheat-sheet',
    title: '4. Essential Commands',
    blocks: [
      {
        type: 'text',
        content: 'Here are the commands you will use 90% of the time.'
      },
      {
        type: 'code',
        language: 'bash',
        content: `# Pull an image from registry
docker pull node:18-alpine

# Run a container from an image
# -d: detach (run in background)
# -p: map port 3000 host to 3000 container
# --name: give it a custom name
docker run -d -p 3000:3000 --name my-app node:18-alpine

# Stop a container
docker stop my-app

# Remove a container
docker rm my-app`,
        filename: 'Cheat Sheet'
      }
    ]
  },
  {
    id: 'dockerfile',
    title: '5. Build a Dockerfile',
    blocks: [
      {
        type: 'text',
        content: 'A `Dockerfile` is a text document that contains all the commands a user could call on the command line to assemble an image.'
      },
      {
        type: 'code',
        language: 'dockerfile',
        content: `# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]`,
        filename: 'Dockerfile'
      },
      {
        type: 'code',
        language: 'bash',
        content: `# Build the image
# -t: tag the image with a name
# .: look for Dockerfile in current dir
docker build -t my-node-app .

# Run your new image
docker run -p 3000:3000 my-node-app`,
        filename: 'Build & Run'
      }
    ]
  },
  {
    id: 'compose',
    title: '6. Docker Compose',
    blocks: [
      {
        type: 'text',
        content: 'Docker Compose is a tool for defining and running multi-container Docker applications. You define services in a YAML file.'
      },
      {
        type: 'code',
        language: 'yaml',
        content: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
  
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:`,
        filename: 'docker-compose.yml'
      },
      {
        type: 'code',
        language: 'bash',
        content: `# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop and remove containers
docker compose down`,
        filename: 'Compose Commands'
      }
    ]
  },
  {
    id: 'networking',
    title: '7. Networking',
    blocks: [
      {
        type: 'text',
        content: 'Containers are isolated by default. Networks allow them to talk to each other.'
      },
      {
        type: 'code',
        language: 'bash',
        content: `# Create a network
docker network create my-net

# Connect a container
docker network connect my-net my-container

# Run a container attached to a network
docker run -d --network my-net --name c1 nginx
docker run -d --network my-net --name c2 nginx

# c1 can now ping c2 by name!`,
        filename: 'Networking'
      }
    ]
  },
  {
    id: 'volumes',
    title: '8. Volumes & Persistence',
    blocks: [
      {
        type: 'text',
        content: 'Containers are ephemeral. If you delete a container, its data is gone unless you use Volumes.'
      },
      {
        type: 'code',
        language: 'bash',
        content: `# Create a volume
docker volume create my-vol

# Mount volume to container
# -v volume_name:container_path
docker run -d -v my-vol:/app/data my-app

# Inspect volume
docker volume inspect my-vol`,
        filename: 'Volume Usage'
      }
    ]
  },
  {
    id: 'debugging',
    title: '9. Debugging',
    blocks: [
      {
        type: 'text',
        content: 'Things go wrong. Here is how to peek inside.'
      },
      {
        type: 'code',
        language: 'bash',
        content: `# View container logs
docker logs my-container

# Follow logs (tail)
docker logs -f my-container

# Inspect container details (JSON)
docker inspect my-container

# Open a shell inside a running container
docker exec -it my-container sh`,
        filename: 'Debug Tools'
      }
    ]
  },
  {
    id: 'best-practices',
    title: '10. Best Practices',
    blocks: [
      {
        type: 'text',
        content: 'Keep your images small and secure.'
      },
      {
        type: 'code',
        language: 'dockerfile',
        content: `# Multi-stage build example
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["npm", "start"]`,
        filename: 'Multi-stage Dockerfile'
      },
      {
        type: 'code',
        language: 'text',
        content: `node_modules
npm-debug.log
.git
.next
.env.local`,
        filename: '.dockerignore'
      }
    ]
  }
];
