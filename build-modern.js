#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Modern React Application...\n');

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed\n');
}

// Build the application
console.log('🏗️  Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Create deployment instructions
const deployInstructions = `
🎉 Build Complete!

Your modern React application has been built successfully.

📁 Output Directory: ./dist

🚀 Deployment Options:

1. Static Hosting (Vercel, Netlify, GitHub Pages):
   - Upload the contents of the 'dist' folder
   - Configure your hosting service to serve index.html for all routes

2. Local Preview:
   - Run: npm run preview
   - Open: http://localhost:4173

3. Server Deployment:
   - Copy the 'dist' folder to your web server
   - Configure server to serve index.html for client-side routing

🔧 Modern Features Included:
✅ React 18 with TypeScript
✅ Responsive design with CSS Grid/Flexbox
✅ Smooth animations with Framer Motion
✅ Modern JavaScript (ES2020+)
✅ Optimized build with Vite
✅ Accessibility improvements
✅ Performance optimizations

📱 The application is now mobile-first and fully responsive!
`;

console.log(deployInstructions);

// Create a simple deployment guide file
fs.writeFileSync('DEPLOYMENT.md', deployInstructions.trim());
console.log('📝 Deployment guide created: DEPLOYMENT.md');
