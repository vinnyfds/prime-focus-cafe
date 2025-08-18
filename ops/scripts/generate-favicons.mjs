import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '../../..');
const publicDir = path.join(projectRoot, 'public');
const docsDir = path.join(projectRoot, '../docs');

console.log('🎨 Generating favicon files...\n');

// Check if public directory exists
if (!fs.existsSync(publicDir)) {
  console.error('❌ public/ directory not found.');
  process.exit(1);
}

// Look for source images in docs directory
const sourceImages = [];
if (fs.existsSync(docsDir)) {
  const files = fs.readdirSync(docsDir);
  files.forEach(file => {
    if (/\.(png|jpg|jpeg|svg)$/i.test(file)) {
      sourceImages.push(file);
    }
  });
}

console.log(`📁 Found ${sourceImages.length} potential source images in docs/:`);
sourceImages.forEach(img => console.log(`   - ${img}`));

// For now, we'll use the existing logo-owl.jpg as our favicon source
// In a real implementation, you'd use the favicons package to generate proper favicon files
const faviconSource = path.join(publicDir, 'images', 'logo-owl.jpg');

if (!fs.existsSync(faviconSource)) {
  console.error('❌ Favicon source image not found:', faviconSource);
  process.exit(1);
}

console.log(`\n🎯 Using source image: ${faviconSource}`);

// Create basic favicon files (copy the source for now)
const faviconFiles = [
  { name: 'favicon.ico', source: faviconSource },
  { name: 'favicon-32x32.jpg', source: faviconSource },
  { name: 'favicon-16x16.jpg', source: faviconSource },
  { name: 'apple-touch-icon.jpg', source: faviconSource }
];

console.log('\n📝 Creating favicon files...');
faviconFiles.forEach(file => {
  const destPath = path.join(publicDir, file.name);
  try {
    fs.copyFileSync(file.source, destPath);
    console.log(`   ✅ Created: ${file.name}`);
  } catch (error) {
    console.error(`   ❌ Failed to create ${file.name}:`, error.message);
  }
});

// Create site.webmanifest
const manifestPath = path.join(publicDir, 'site.webmanifest');
const manifest = {
  name: "Prime Focus C.A.F.E.",
  short_name: "PFC",
  description: "Clarity • Awareness • Focus • Energy",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#0b0e11",
  icons: [
    {
      src: "/favicon-32x32.jpg",
      sizes: "32x32",
      type: "image/jpeg"
    },
    {
      src: "/apple-touch-icon.jpg",
      sizes: "180x180",
      type: "image/jpeg"
    }
  ]
};

try {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('   ✅ Created: site.webmanifest');
} catch (error) {
  console.error('   ❌ Failed to create site.webmanifest:', error.message);
}

console.log('\n🎉 Favicon generation complete!');
console.log('\n📝 Note: These are basic favicon files. For production, consider:');
console.log('   - Using the favicons package for proper favicon generation');
console.log('   - Creating multiple sizes (16x16, 32x32, 48x48, 180x180)');
console.log('   - Converting to .ico format for favicon.ico');
console.log('   - Optimizing images for web use');
