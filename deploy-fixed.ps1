# Deploy Fixed Frontend Script
# This script deploys the crash-resistant version

Write-Host "🚀 Deploying Fixed Frontend..." -ForegroundColor Green

# Build the project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Deploy to S3
Write-Host "☁️ Deploying to S3..." -ForegroundColor Yellow
aws s3 sync dist/ s3://www.primefocususa.com-site --delete

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ S3 deployment failed!" -ForegroundColor Red
    exit 1
}

# Set proper cache control for HTML files
Write-Host "📄 Setting cache control for HTML..." -ForegroundColor Yellow
aws s3 cp dist/ s3://www.primefocususa.com-site/ --recursive --exclude "*" --include "*.html" --cache-control "no-store"

# Invalidate CloudFront
Write-Host "🔄 Invalidating CloudFront..." -ForegroundColor Yellow
aws cloudfront create-invalidation --distribution-id E32K05VBG79GEL --paths "/*"

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your site should now be crash-resistant!" -ForegroundColor Green
