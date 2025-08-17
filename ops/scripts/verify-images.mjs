import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Since we're running from project root, go up 2 levels from ops/scripts/
const projectRoot = path.join(__dirname, '../..');
const distDir = path.join(projectRoot, 'dist');
const publicDir = path.join(projectRoot, 'public');

console.log('🔍 Verifying image assets...\n');
console.log('Project root:', projectRoot);
console.log('Dist dir:', distDir);
console.log('Public dir:', publicDir);
console.log('Current working directory:', process.cwd());
console.log('');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Run "npm run build" first.');
  console.error('Expected path:', distDir);
  process.exit(1);
}

// Check if public directory exists
if (!fs.existsSync(publicDir)) {
  console.error('❌ public/ directory not found.');
  console.error('Expected path:', publicDir);
  process.exit(1);
}

// Get all image files in dist/images
const distImagesDir = path.join(distDir, 'images');
if (!fs.existsSync(distImagesDir)) {
  console.error('❌ dist/images/ directory not found.');
  console.error('Expected path:', distImagesDir);
  process.exit(1);
}

const distImages = fs.readdirSync(distImagesDir)
  .filter(file => /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(file));

console.log(`📁 Found ${distImages.length} images in dist/images/:`);
distImages.forEach(img => console.log(`   - ${img}`));

// Check if index.html references any missing images
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/index.html not found.');
  console.error('Expected path:', indexPath);
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf8');
const imageRefs = indexContent.match(/src=["']([^"']*\.(png|jpg|jpeg|gif|svg|webp))["']/gi) || [];

console.log(`\n🔗 Found ${imageRefs.length} image references in index.html:`);
imageRefs.forEach(ref => console.log(`   - ${ref}`));

// Check if all referenced images exist
let missingCount = 0;
const missingImages = [];

imageRefs.forEach(ref => {
  const srcMatch = ref.match(/src=["']([^"']*\.(png|jpg|jpeg|gif|svg|webp))["']/i);
  if (srcMatch) {
    const imagePath = srcMatch[1];
    const fullPath = path.join(distDir, imagePath.replace(/^\//, ''));
    
    if (!fs.existsSync(fullPath)) {
      missingCount++;
      missingImages.push(imagePath);
      console.log(`   ❌ Missing: ${imagePath}`);
    } else {
      console.log(`   ✅ Found: ${imagePath}`);
    }
  }
});

console.log(`\n📊 Summary:`);
console.log(`   - Total images in dist/images/: ${distImages.length}`);
console.log(`   - Image references in index.html: ${imageRefs.length}`);
console.log(`   - Missing images: ${missingCount}`);

if (missingCount === 0) {
  console.log('\n🎉 All image assets verified successfully!');
  process.exit(0);
} else {
  console.log('\n❌ Some images are missing. Please check the paths above.');
  console.log('   Missing images:');
  missingImages.forEach(img => console.log(`     - ${img}`));
  process.exit(1);
}
