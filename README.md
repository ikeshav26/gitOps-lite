# Production Deployment Pipeline

This project is a CI/CD pipeline that automates versioning, releasing, and deploying a full-stack application to a DigitalOcean droplet using GitHub Actions, Docker, and Nginx.

---

## Tech Stack
- GitHub Actions (CI/CD)
- Docker & Docker Compose
- Node.js (Backend)
- Vite (Frontend)
- Nginx (Reverse Proxy)
- DigitalOcean Droplet
- Bash scripting

---

## Workflow Overview

The project has two main workflows:

### 1. Version Workflow (`version.yml`)
Triggered manually.

- Reads current version from Git
- Updates version (Git tag like `v1.0.0`)
- Commits version bump
- Creates GitHub Release
- Triggers deployment workflow

---

### 2. Deployment Workflow (`deploy.yml`)
Runs after release trigger.

- Connects to DigitalOcean server via SSH
- Pulls latest code from GitHub
- Builds frontend assets
- Rebuilds Docker containers
- Copies frontend build to Nginx directory
- Reloads Nginx
- Performs health check

---

## Deployment Flow

GitHub commit → Manual version trigger → Git tag created → GitHub release → Deploy workflow → Server update → Application live

---

## Server Setup

- Frontend served via Nginx
- Backend runs in Docker containers
- Deployment is fully automated via SSH script

---

## Purpose

This project demonstrates a production-like CI/CD system with automated releases, version control, and server deployment.