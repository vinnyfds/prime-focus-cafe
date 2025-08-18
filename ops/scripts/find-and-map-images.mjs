import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function normalizePath(ref) {
  // Remove ./ and leading docs/ if present
  let normalized = ref.replace(/^\.\//, '').replace(/^docs\//, '');
  
  // Ensure it starts with /images/ for web paths
  if (!normalized.startsWith('/images/')) {
    normalized = `/images/${normalized}`;
  }
  
  return normalized;
}

function findImageReferences() {
  const references = [];
  
  // Scan TypeScript/TSX files
  const tsFiles = glob.sync('src/**/*.{ts,tsx}');
  tsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Look for src= attributes and url() references
      const srcMatches = line.match(/src=["']([^"']*\.(png|jpg|jpeg|webp|svg))["']/g);
      const urlMatches = line.match(/url\(["']?([^"')]*\.(png|jpg|jpeg|webp|svg))["']?\)/g);
      
      if (srcMatches) {
        srcMatches.forEach(match => {
          const srcValue = match.match(/src=["']([^"']*\.(png|jpg|jpeg|webp|svg))["']/)?.[1];
          if (srcValue) {
            references.push({
              file,
              line: index + 1,
              reference: srcValue,
              normalizedPath: normalizePath(srcValue)
            });
          }
        });
      }
      
      if (urlMatches) {
        urlMatches.forEach(match => {
          const urlValue = match.match(/url\(["']?([^"')]*\.(png|jpg|jpeg|webp|svg))["']?\)/)?.[1];
          if (urlValue) {
            references.push({
              file,
              line: index + 1,
              reference: urlValue,
              normalizedPath: normalizePath(urlValue)
            });
          }
        });
      }
    });
  });
  
  // Scan HTML files
  const htmlFiles = glob.sync('public/**/*.html');
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const srcMatches = line.match(/src=["']([^"']*\.(png|jpg|jpeg|webp|svg))["']/g);
      if (srcMatches) {
        srcMatches.forEach(match => {
          const srcValue = match.match(/src=["']([^"']*\.(png|jpg|jpeg|webp|svg))["']/)?.[1];
          if (srcValue) {
            references.push({
              file,
              line: index + 1,
              reference: srcValue,
              normalizedPath: normalizePath(srcValue)
            });
          }
        });
      }
    });
  });
  
  return references;
}

function getAvailableImages() {
  const docsDir = path.join(__dirname, '../../../docs');
  const images = [];
  
  console.log('Looking for docs directory at:', docsDir);
  
  if (fs.existsSync(docsDir)) {
    const files = fs.readdirSync(docsDir);
    console.log('Found files in docs:', files);
    files.forEach(file => {
      if (/\.(png|jpg|jpeg|webp|svg)$/i.test(file)) {
        images.push(file);
      }
    });
  } else {
    console.log('Docs directory not found at:', docsDir);
  }
  
  return images;
}

function findBestMatch(reference, availableImages) {
  const refBasename = path.basename(reference, path.extname(reference)).toLowerCase();
  const refExt = path.extname(reference).toLowerCase();
  
  // First try exact case-insensitive match
  const exactMatch = availableImages.find(img => 
    img.toLowerCase() === reference.toLowerCase()
  );
  if (exactMatch) return `/images/${exactMatch}`;
  
  // Try basename match with different extensions
  const basenameMatches = availableImages.filter(img => {
    const imgBasename = path.basename(img, path.extname(img)).toLowerCase();
    return imgBasename === refBasename;
  });
  
  if (basenameMatches.length > 0) {
    // Prefer the same extension, then common web formats
    const sameExt = basenameMatches.find(img => 
      path.extname(img).toLowerCase() === refExt
    );
    if (sameExt) return `/images/${sameExt}`;
    
    // Prefer PNG, then JPG, then others
    const pngMatch = basenameMatches.find(img => 
      path.extname(img).toLowerCase() === '.png'
    );
    if (pngMatch) return `/images/${pngMatch}`;
    
    const jpgMatch = basenameMatches.find(img => 
      /\.(jpg|jpeg)$/i.test(img)
    );
    if (jpgMatch) return `/images/${jpgMatch}`;
    
    return `/images/${basenameMatches[0]}`;
  }
  
  // Try fuzzy match by basename similarity
  const fuzzyMatches = availableImages.filter(img => {
    const imgBasename = path.basename(img, path.extname(img)).toLowerCase();
    return imgBasename.includes(refBasename) || refBasename.includes(imgBasename);
  });
  
  if (fuzzyMatches.length > 0) {
    return `/images/${fuzzyMatches[0]}`;
  }
  
  return null;
}

function main() {
  console.log('🔍 Scanning for image references...\n');
  
  const references = findImageReferences();
  const availableImages = getAvailableImages();
  
  console.log(`📁 Found ${availableImages.length} available images in docs/:`);
  availableImages.forEach(img => console.log(`   - ${img}`));
  
  console.log(`\n🔗 Found ${references.length} image references:`);
  references.forEach(ref => {
    console.log(`   ${ref.file}:${ref.line} - ${ref.reference}`);
  });
  
  const mapping = {};
  const unresolved = [];
  
  references.forEach(ref => {
    const bestMatch = findBestMatch(ref.reference, availableImages);
    if (bestMatch) {
      mapping[ref.reference] = bestMatch;
      console.log(`   ✅ ${ref.reference} → ${bestMatch}`);
    } else {
      unresolved.push(ref.reference);
      console.log(`   ❌ ${ref.reference} - NO MATCH FOUND`);
    }
  });
  
  // Write mapping file
  const mappingPath = path.join(__dirname, '../logs/image-mapping.json');
  fs.mkdirSync(path.dirname(mappingPath), { recursive: true });
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  
  // Write missing images list
  const missingPath = path.join(__dirname, '../logs/missing-images.txt');
  fs.writeFileSync(missingPath, unresolved.join('\n'));
  
  console.log(`\n📊 Summary:`);
  console.log(`   - Total references: ${references.length}`);
  console.log(`   - Mapped: ${Object.keys(mapping).length}`);
  console.log(`   - Unresolved: ${unresolved.length}`);
  console.log(`   - Mapping file: ${mappingPath}`);
  console.log(`   - Missing list: ${missingPath}`);
  
  if (unresolved.length > 0) {
    console.log('\n❌ Unresolved references:');
    unresolved.forEach(ref => console.log(`   - ${ref}`));
    process.exit(1);
  } else {
    console.log('\n🎉 All image references mapped successfully!');
    process.exit(0);
  }
}

main();
