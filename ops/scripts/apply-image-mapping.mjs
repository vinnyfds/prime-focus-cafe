import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function applyImageMapping() {
  const mappingPath = path.join(__dirname, '../logs/image-mapping.json');
  
  if (!fs.existsSync(mappingPath)) {
    console.log('❌ No image mapping file found. Run "npm run images:map" first.');
    process.exit(1);
  }
  
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  
  if (Object.keys(mapping).length === 0) {
    console.log('✅ No image mappings to apply.');
    return;
  }
  
  console.log('🔧 Applying image mappings...\n');
  
  const changedFiles = new Set();
  
  Object.entries(mapping).forEach(([oldPath, newPath]) => {
    console.log(`   ${oldPath} → ${newPath}`);
    
    // Find files that reference the old path
    const files = findFilesWithReference(oldPath);
    
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const newContent = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
      
      if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        changedFiles.add(file);
        console.log(`     ✅ Updated: ${file}`);
      }
    });
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   - Mappings applied: ${Object.keys(mapping).length}`);
  console.log(`   - Files changed: ${changedFiles.size}`);
  
  if (changedFiles.size > 0) {
    console.log('\n📝 Changed files:');
    Array.from(changedFiles).forEach(file => console.log(`   - ${file}`));
  }
}

function findFilesWithReference(reference) {
  const files = [];
  
  // Scan TypeScript/TSX files
  const tsFiles = glob.sync('src/**/*.{ts,tsx}');
  tsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(reference)) {
      files.push(file);
    }
  });
  
  // Scan HTML files
  const htmlFiles = glob.sync('public/**/*.html');
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes(reference)) {
      files.push(file);
    }
  });
  
  return files;
}

function main() {
  try {
    applyImageMapping();
    console.log('\n🎉 Image mapping application complete!');
  } catch (error) {
    console.error('❌ Error applying image mappings:', error.message);
    process.exit(1);
  }
}

main();
