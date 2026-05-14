#!/bin/bash

set -e

echo "======================================"
echo "🟢 Starting Deployment"
echo "======================================"

PROJECT_DIR="/root/pipeline"

cd $PROJECT_DIR

echo ""
echo "📥 Pulling latest changes..."
git pull --rebase origin main

echo ""
echo "📦 Current version:"
git describe --tags --always || echo "No tags yet"

echo ""
echo "🎨 Building frontend assets..."
cd $PROJECT_DIR/client
pnpm build

echo ""
echo "📂 Copying frontend build for static serving..."
sudo rm -rf /var/www/pipeline/*
sudo cp -r dist/* /var/www/pipeline/

echo ""
echo "🐳 Rebuilding Docker containers..."
cd $PROJECT_DIR
docker-compose up -d --build

echo ""
echo "🧹 Cleaning unused Docker images..."
docker image prune -f

echo ""
echo "🔍 Checking running containers..."
docker ps

echo ""
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo ""
echo "✅ Nginx status:"
systemctl is-active nginx

echo ""
echo "🌐 Checking backend health..."

sleep 5

curl -f http://localhost:3000/api || echo "⚠️ Health check endpoint not found"

echo ""
echo "======================================"
echo "✅ Deployment Successful"
echo "======================================"