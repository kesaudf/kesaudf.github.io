#!/usr/bin/env node

/**
 * Simple build script for the modern site
 * Handles component synchronization and optimization
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SiteBuild {
    constructor() {
        this.componentsDir = path.join(__dirname, 'components');
        this.modernJsDir = path.join(__dirname, 'assets', 'js', 'modern');
        this.outputDir = path.join(__dirname, 'dist');
    }

    async build() {
        console.log('🚀 Building modern site...');
        
        try {
            await this.syncComponents();
            await this.validateModules();
            await this.generateServiceWorker();
            
            console.log('✅ Build completed successfully!');
            console.log('\n📝 Build Summary:');
            console.log('- Components synchronized');
            console.log('- ES6 modules validated');
            console.log('- Service worker generated');
            console.log('\n🌐 To serve the site:');
            console.log('  npm run serve');
            
        } catch (error) {
            console.error('❌ Build failed:', error.message);
            process.exit(1);
        }
    }

    async syncComponents() {
        console.log('📦 Synchronizing components...');
        
        const headerPath = path.join(this.componentsDir, 'header.html');
        const footerPath = path.join(this.componentsDir, 'footer.html');
        
        if (!fs.existsSync(headerPath) || !fs.existsSync(footerPath)) {
            console.log('⚠️  Component files not found, skipping sync');
            return;
        }
        
        const header = fs.readFileSync(headerPath, 'utf8');
        const footer = fs.readFileSync(footerPath, 'utf8');
        
        // Update embedded templates in ComponentLoader
        const loaderPath = path.join(this.modernJsDir, 'core', 'ComponentLoader.js');
        let loaderContent = fs.readFileSync(loaderPath, 'utf8');
        
        // Update header template
        loaderContent = loaderContent.replace(
            /header: `[^`]*`/s,
            `header: \`${header.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\``
        );
        
        // Update footer template
        loaderContent = loaderContent.replace(
            /footer: `[^`]*`/s,
            `footer: \`${footer.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\``
        );
        
        fs.writeFileSync(loaderPath, loaderContent);
        console.log('✓ Components synchronized');
    }

    async validateModules() {
        console.log('🔍 Validating ES6 modules...');
        
        const moduleFiles = this.getAllJSFiles(this.modernJsDir);
        let hasErrors = false;
        
        for (const file of moduleFiles) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                
                // Basic syntax validation
                if (content.includes('import') && !content.includes('export')) {
                    console.warn(`⚠️  ${path.relative(__dirname, file)}: Has imports but no exports`);
                }
                
                // Check for common issues
                if (content.includes('$') && !content.includes('DOMUtils') && !content.includes('LegacyCompat')) {
                    console.warn(`⚠️  ${path.relative(__dirname, file)}: Uses $ without proper import`);
                }
                
            } catch (error) {
                console.error(`❌ ${path.relative(__dirname, file)}: ${error.message}`);
                hasErrors = true;
            }
        }
        
        if (!hasErrors) {
            console.log('✓ All modules validated');
        }
    }

    async generateServiceWorker() {
        console.log('🔧 Generating service worker...');
        
        const swContent = `
// Service Worker for Modern Site
const CACHE_NAME = 'mysite-modern-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/News.html',
    '/assets/css/main.css',
    '/assets/css/site.css',
    '/assets/js/modern/core/App.js',
    '/assets/images/badge.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            }
        )
    );
});
`.trim();

        fs.writeFileSync(path.join(__dirname, 'sw.js'), swContent);
        console.log('✓ Service worker generated');
    }

    getAllJSFiles(dir) {
        const files = [];
        
        function traverse(currentDir) {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    traverse(fullPath);
                } else if (item.endsWith('.js')) {
                    files.push(fullPath);
                }
            }
        }
        
        traverse(dir);
        return files;
    }
}

// Run build if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const build = new SiteBuild();
    build.build();
}

export default SiteBuild;
