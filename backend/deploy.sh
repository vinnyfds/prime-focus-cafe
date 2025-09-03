#!/bin/bash

# Prime Focus C.A.F.E. Backend Deployment Script
# This script deploys the backend API to AWS EC2 or similar server

echo "🚀 Starting Prime Focus C.A.F.E. Backend Deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy env.example to .env and configure your environment variables."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests (if any)
echo "🧪 Running tests..."
npm test || echo "⚠️  No tests found or tests failed"

# Build the application (if needed)
echo "🔨 Building application..."
# No build step needed for Node.js backend

# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# Stop existing PM2 process if running
echo "🛑 Stopping existing processes..."
pm2 stop primefocus-api 2>/dev/null || true
pm2 delete primefocus-api 2>/dev/null || true

# Start the application with PM2
echo "🎯 Starting application with PM2..."
pm2 start server.js --name "primefocus-api" --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup

echo "✅ Backend deployment completed!"
echo "📊 Use 'pm2 status' to check application status"
echo "📋 Use 'pm2 logs primefocus-api' to view logs"
