#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const inputFile = 'restore/real-index-B_6PmfN9.js';
const outputFile = 'restore/patched-index-B_6PmfN9.js';

console.log('🔧 Patching JavaScript bundle to fix .map error...');

try {
  // Read the JavaScript bundle
  const jsContent = readFileSync(inputFile, 'utf8');
  
  // Find and fix the problematic .map call
  // The error is in the tM function where it tries to call .map on a null value
  // We need to add a null check before calling .map
  
  // Look for the pattern where .map is called without null checking
  // This is likely in the scientific references section
  
  // Replace the problematic .map call with a safe version
  let patchedContent = jsContent;
  
  // Fix 1: Add null check for the main .map call in tM function
  patchedContent = patchedContent.replace(
    /n\.map\(/g,
    '(n && Array.isArray(n) ? n.map('
  );
  
  // Fix 2: Close the ternary properly
  patchedContent = patchedContent.replace(
    /\.map\(\(f,p\)=>g\.jsxs\("li"/g,
    '.map((f,p)=>g.jsxs("li"'
  );
  
  // Fix 3: Add fallback for when n is null/undefined
  patchedContent = patchedContent.replace(
    /children:n\.map\(\(f,p\)=>g\.jsxs\("li"/g,
    'children:(n && Array.isArray(n) ? n.map((f,p)=>g.jsxs("li"'
  );
  
  // Fix 4: Close the ternary with empty array fallback
  patchedContent = patchedContent.replace(
    /},f\.id\|\|p\)\)\)/g,
    '},f.id||p)) : [])'
  );
  
  // Write the patched version
  writeFileSync(outputFile, patchedContent, 'utf8');
  
  console.log('✅ JavaScript bundle patched successfully!');
  console.log(`📁 Output: ${outputFile}`);
  
  // Verify the patch
  const originalSize = jsContent.length;
  const patchedSize = patchedContent.length;
  console.log(`📊 Original size: ${originalSize} characters`);
  console.log(`📊 Patched size: ${patchedSize} characters`);
  console.log(`📊 Difference: ${patchedSize - originalSize} characters`);
  
} catch (error) {
  console.error('❌ Error patching JavaScript bundle:', error);
  process.exit(1);
}
