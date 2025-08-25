#!/usr/bin/env node

/**
 * Script to sync README.md from root to numpyjs package directory
 * This ensures both locations always have the same documentation
 */

const fs = require('fs');
const path = require('path');

const rootReadme = path.join(__dirname, '..', 'README.md');
const packageReadme = path.join(__dirname, '..', 'numpyjs', 'README.md');

try {
  // Check if root README exists
  if (!fs.existsSync(rootReadme)) {
    console.error('❌ Root README.md not found');
    process.exit(1);
  }

  // Read the root README content
  const content = fs.readFileSync(rootReadme, 'utf8');
  
  // Write to package README
  fs.writeFileSync(packageReadme, content, 'utf8');
  
  console.log('✅ README.md synced successfully');
  console.log(`   Root: ${rootReadme}`);
  console.log(`   Package: ${packageReadme}`);
  
} catch (error) {
  console.error('❌ Error syncing README:', error.message);
  process.exit(1);
}