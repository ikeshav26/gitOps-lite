# GitOps Architecture

A modern CI/CD pipeline implementation demonstrating automated deployment of a full-stack application using GitHub Actions, Docker, and manual workflow triggers.

## Architecture Overview

This project implements a **3-tier containerized architecture** with:

- **Frontend Layer**: React/Vite static application served by Nginx
- **Application Layer**: Node.js/TypeScript backend API
- **Infrastructure Layer**: Docker Compose orchestration with SSL support (Certbot)

## Project Structure

```
.
├── client/                 # React/Vite frontend
│   ├── src/
│   ├── public/
│   ├── vite.config.ts
│   └── package.json
├── server/                 # Node.js/TypeScript backend
│   ├── src/
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
├── nginx/                  # Reverse proxy configuration
│   └── nginx.conf
├── .github/workflows/      # GitHub Actions CI/CD
│   └── deploy.yml
│   └── version.yml
├── docker-compose.yml      # Container orchestration
├── deploy.sh              # Deployment script
└── package.json           # Root workspace config
```

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express (implied), TypeScript
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Reverse Proxy**: Nginx
- **SSL/TLS**: Certbot

## Deployment Workflow

The deployment follows a **manual trigger CI/CD pipeline**:

1. Developer pushes code to `main` branch
2. Manually trigger GitHub Actions workflow via `workflow_dispatch`
3. GitHub Actions runs version bump and release jobs
4. Workflow triggers `deploy.yml` on successful release
5. Server pulls latest changes and redeploys containers

## Setup Instructions

### Prerequisites

- Node.js 18+ with pnpm
- Docker and Docker Compose
- Git
- GitHub repository with Actions enabled

### Local Development

```bash
# Install dependencies
pnpm install

# Frontend
cd client && pnpm build

# Backend
cd server && pnpm build

# Start containers
docker-compose up -d
```

### Server Deployment

The deployment script handles:
- Pulling latest changes from main branch
- Building frontend assets
- Copying static files to Nginx directory
- Rebuilding Docker containers
- Reloading Nginx configuration
- Health checks

```bash
# Run deployment (on server)
./deploy.sh
```

## GitHub Actions Workflows

### version.yml
- Bumps version in package.json
- Creates Git tags
- Generates GitHub releases
- Triggers deploy workflow

**Trigger**: Manual via `workflow_dispatch`

### deploy.yml
- Automatically triggered after successful version bump
- Pulls latest changes on server
- Rebuilds and deploys containers

## Important Notes

### Nginx Configuration Conflicts

The `nginx.conf` file is modified by Certbot during SSL certificate renewal. To avoid conflicts during pulls:

```bash
# Use direct pull without rebase
git pull origin main
```

If needed, exclude nginx.conf from tracking:
```bash
git update-index --assume-unchanged nginx/nginx.conf
```

### Manual vs Automatic Deployment

This implementation uses **manual workflow triggers** instead of auto-deployment on every commit because:

- Prevents unintended deployments from minor commits
- Reduces resource usage and server restarts
- Avoids unnecessary downtime
- Provides control over production release timing

## Health Checks

The deployment script includes an API health check:

```bash
curl -f http://localhost:3000/api
```

## Monitoring

```bash
# Check running containers
docker ps

# View Nginx status
systemctl status nginx

# Check backend health
curl http://localhost:3000/api
```

## License

MIT
