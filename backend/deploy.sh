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

# Start the application
echo "🎯 Starting application..."
if [ "$NODE_ENV" = "production" ]; then
    echo "🌐 Starting in production mode..."
    npm start
else
    echo "🔧 Starting in development mode..."
    npm run dev
fi

echo "✅ Backend deployment completed!"
