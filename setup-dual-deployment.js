#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Setting up Dual Deployment (Original + React)...\n');

try {
  // Build the React application
  console.log('📦 Building React application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed!\n');

  // Create modern subdirectory
  const modernDir = 'modern';
  if (!fs.existsSync(modernDir)) {
    fs.mkdirSync(modernDir);
  }

  // Copy built files to modern subdirectory
  console.log('📁 Setting up modern version in /modern/...');
  copyDir('dist', modernDir);
  console.log('✅ Modern version ready in /modern/\n');

  // Create navigation links in original index.html
  const originalIndex = 'index.html';
  const modernIndex = path.join(modernDir, 'index.html');

  // Read original index if it exists (backup)
  let originalContent = '';
  if (fs.existsSync('index-original-backup.html')) {
    originalContent = fs.readFileSync('index-original-backup.html', 'utf8');
  } else if (fs.existsSync('Archive/index_.html')) {
    originalContent = fs.readFileSync('Archive/index_.html', 'utf8');
  }

  if (originalContent) {
    // Add link to modern version
    const modernLink = `
    <div style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
      <a href="/modern/" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
        🚀 View Modern Version
      </a>
    </div>`;
    
    const updatedContent = originalContent.replace('<body>', '<body>' + modernLink);
    fs.writeFileSync('index-with-modern-link.html', updatedContent);
  }

  // Create a landing page that lets users choose
  const landingPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AZ Portfolio - Choose Version</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 300;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 3rem;
            opacity: 0.9;
        }
        .versions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-top: 2rem;
        }
        .version-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease;
        }
        .version-card:hover {
            transform: translateY(-5px);
        }
        .version-card h2 {
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        .version-card p {
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: #f0f0f0;
            transform: scale(1.05);
        }
        .modern-badge {
            background: #28a745;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            margin-left: 10px;
        }
        @media (max-width: 768px) {
            .versions {
                grid-template-columns: 1fr;
            }
            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>AZ Portfolio</h1>
        <p>Senior Software Development Engineer at Autodesk</p>
        
        <div class="versions">
            <div class="version-card">
                <h2>Classic Version</h2>
                <p>Traditional HTML site with jQuery and Bootstrap. Familiar interface with all original content.</p>
                <a href="/classic/" class="btn">View Classic</a>
            </div>
            
            <div class="version-card">
                <h2>Modern Version <span class="modern-badge">NEW</span></h2>
                <p>React-powered site with video integration, smooth animations, and mobile-first design.</p>
                <a href="/modern/" class="btn">View Modern</a>
            </div>
        </div>
    </div>
</body>
</html>`;

  fs.writeFileSync('version-selector.html', landingPage);

  console.log('🎉 Dual deployment ready!');
  console.log('\n📋 What was created:');
  console.log('  ✅ /modern/ - Your new React application');
  console.log('  ✅ version-selector.html - Landing page to choose versions');
  console.log('\n🚀 Deployment options:');
  console.log('1. Use version-selector.html as your main index.html');
  console.log('2. Keep original site as main, link to /modern/');
  console.log('3. Replace everything with modern version');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
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
