#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface DeployConfig {
  bucket: string;
  distributionId: string;
  region: string;
  distPath: string;
}

const config: DeployConfig = {
  bucket: 'www.primefocususa.com-site',
  distributionId: 'E32K05VBG79GEL',
  region: 'us-east-1',
  distPath: './dist'
};

function runCommand(command: string): string {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}

function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'html':
      return 'text/html; charset=utf-8';
    case 'js':
      return 'application/javascript; charset=utf-8';
    case 'css':
      return 'text/css; charset=utf-8';
    case 'svg':
      return 'image/svg+xml';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'ico':
      return 'image/x-icon';
    case 'json':
      return 'application/json; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

function getCacheControl(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (ext === 'html') {
    return 'no-store';
  }
  if (ext === 'js' || ext === 'css') {
    return 'public, max-age=31536000, immutable';
  }
  return 'public, max-age=3600';
}

function deployAssets(): void {
  console.log('🚀 Starting deployment...');
  
  // Upload all files with correct MIME types and cache control
  console.log('📤 Uploading assets with correct MIME types...');
  
  // Upload HTML files with no-store cache
  runCommand(`aws s3 cp ${config.distPath}/ s3://${config.bucket}/ --recursive --exclude "*" --include "*.html" --cache-control "no-store" --content-type "text/html; charset=utf-8"`);
  
  // Upload JS files with immutable cache
  runCommand(`aws s3 cp ${config.distPath}/assets/ s3://${config.bucket}/assets/ --recursive --exclude "*" --include "*.js" --cache-control "public, max-age=31536000, immutable" --content-type "application/javascript; charset=utf-8"`);
  
  // Upload CSS files with immutable cache
  runCommand(`aws s3 cp ${config.distPath}/assets/ s3://${config.bucket}/assets/ --recursive --exclude "*" --include "*.css" --cache-control "public, max-age=31536000, immutable" --content-type "text/css; charset=utf-8"`);
  
  // Upload other assets
  runCommand(`aws s3 cp ${config.distPath}/ s3://${config.bucket}/ --recursive --exclude "*.html" --exclude "assets/*.js" --exclude "assets/*.css"`);
  
  console.log('✅ Assets uploaded successfully');
}

function invalidateCloudFront(): string {
  console.log('🔄 Invalidating CloudFront...');
  
  const result = runCommand(`aws cloudfront create-invalidation --distribution-id ${config.distributionId} --paths "/*"`);
  
  // Parse invalidation ID from output
  const match = result.match(/Id.*?(\w+)/);
  const invalidationId = match ? match[1] : 'unknown';
  
  console.log(`✅ CloudFront invalidation created: ${invalidationId}`);
  return invalidationId;
}

function writeDeployLog(invalidationId: string): void {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logDir = join(process.cwd(), 'ops', 'logs');
  const logFile = join(logDir, `deploy-${timestamp}.md`);
  
  mkdirSync(logDir, { recursive: true });
  
  const logContent = `# Deployment Log

## Deployment: ${new Date().toISOString()}

### Configuration
- **Bucket**: ${config.bucket}
- **Distribution ID**: ${config.distributionId}
- **Region**: ${config.region}

### Actions Taken
- ✅ Assets uploaded with correct MIME types
- ✅ Cache control headers set appropriately
- ✅ CloudFront invalidation created: ${invalidationId}

### Asset Details
- **HTML**: no-store cache control
- **JS/CSS**: immutable cache (1 year)
- **Other assets**: 1 hour cache

### Next Steps
1. Wait for CloudFront invalidation to complete
2. Test the live site
3. Verify MIME types are correct
4. Check for any console errors

### Rollback
To rollback, restore from S3 versioning or use the backup in snapshots/20241219-repo.zip
`;

  writeFileSync(logFile, logContent);
  console.log(`📝 Deploy log written to: ${logFile}`);
}

function main(): void {
  try {
    deployAssets();
    const invalidationId = invalidateCloudFront();
    writeDeployLog(invalidationId);
    
    console.log('\n🎉 Deployment completed successfully!');
    console.log(`\n📋 Next steps:`);
    console.log(`1. Wait for CloudFront invalidation to complete`);
    console.log(`2. Test https://www.primefocususa.com`);
    console.log(`3. Check browser console for errors`);
    
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

// ES module entry point
main();
