#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('📁 Copying assets to public folder...\n');

try {
  // Create public directories if they don't exist
  if (!fs.existsSync('public/Images')) {
    fs.mkdirSync('public/Images', { recursive: true });
  }
  if (!fs.existsSync('public/AZ_files')) {
    fs.mkdirSync('public/AZ_files', { recursive: true });
  }
  
  // Copy Images
  console.log('Copying Images...');
  execSync('xcopy "Images\\*" "public\\Images\\" /E /Y /Q', { stdio: 'inherit' });
  console.log('✅ Images copied');
  
  // Copy AZ_files
  console.log('Copying AZ_files...');
  execSync('xcopy "AZ_files\\*" "public\\AZ_files\\" /E /Y /Q', { stdio: 'inherit' });
  console.log('✅ AZ_files copied');

  console.log('\n🎉 All assets copied successfully!');
  console.log('You can now run: npm run build');

} catch (error) {
  console.error('❌ Failed to copy assets:', error.message);
  process.exit(1);
}
