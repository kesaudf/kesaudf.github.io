#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building and Deploying to GitHub Pages...\n');

try {
  // Build the React application
  console.log('📦 Building React application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed!\n');

  // Check if dist folder exists
  if (!fs.existsSync('dist')) {
    throw new Error('Build folder (dist) not found!');
  }

  // Backup original files
  console.log('💾 Backing up original files...');
  const backupDir = 'backup-original-site';
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  // List of original files to backup
  const originalFiles = [
    'index.html',
    'AboutMe.html',
    'Contacts.html',
    'News.html',
    'footer.html'
  ];

  originalFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const backupPath = path.join(backupDir, file);
      fs.copyFileSync(file, backupPath);
      console.log(`  ✅ Backed up: ${file}`);
    }
  });

  // Copy built files to root for GitHub Pages
  console.log('\n📁 Copying built files for GitHub Pages...');
  
  // Copy all files from dist to root
  const distFiles = fs.readdirSync('dist');
  distFiles.forEach(file => {
    const srcPath = path.join('dist', file);
    const destPath = file;
    
    if (fs.statSync(srcPath).isDirectory()) {
      // Copy directory recursively
      copyDir(srcPath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
    }
    console.log(`  ✅ Copied: ${file}`);
  });

  // Create .nojekyll file for GitHub Pages
  fs.writeFileSync('.nojekyll', '');
  console.log('  ✅ Created .nojekyll file');

  // Create custom 404.html for client-side routing
  const notFoundHtml = fs.readFileSync('index.html', 'utf8');
  fs.writeFileSync('404.html', notFoundHtml);
  console.log('  ✅ Created 404.html for client-side routing');

  console.log('\n🎉 Deployment files ready!');
  console.log('\n📋 Next Steps:');
  console.log('1. Commit all changes: git add . && git commit -m "Deploy React app"');
  console.log('2. Push to GitHub: git push origin main');
  console.log('3. Your site will be live at: https://yourusername.github.io/');
  console.log('\n💡 Your original files are backed up in:', backupDir);

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
