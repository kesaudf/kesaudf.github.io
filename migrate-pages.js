#!/usr/bin/env node

/**
 * Migration script to update all HTML pages to use modern framework
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PageMigrator {
    constructor() {
        this.siteRoot = __dirname;
        this.pagesUpdated = 0;
        this.errors = [];
    }

    async migrate() {
        console.log('🔄 Migrating HTML pages to modern framework...');
        
        try {
            await this.migrateAllPages();
            
            console.log(`\n✅ Migration completed successfully!`);
            console.log(`📊 Pages updated: ${this.pagesUpdated}`);
            
            if (this.errors.length > 0) {
                console.log(`\n⚠️  Errors encountered:`);
                this.errors.forEach(error => console.log(`  - ${error}`));
            }
            
        } catch (error) {
            console.error('❌ Migration failed:', error.message);
            process.exit(1);
        }
    }

    async migrateAllPages() {
        const htmlFiles = this.findHtmlFiles(this.siteRoot);
        
        for (const file of htmlFiles) {
            await this.migratePage(file);
        }
    }

    findHtmlFiles(dir) {
        const files = [];
        
        function traverse(currentDir) {
            const items = fs.readdirSync(currentDir);
            
            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    // Skip certain directories
                    if (!item.startsWith('.') && item !== 'node_modules' && item !== 'dist') {
                        traverse(fullPath);
                    }
                } else if (item.endsWith('.html')) {
                    files.push(fullPath);
                }
            }
        }
        
        traverse(dir);
        return files;
    }

    async migratePage(filePath) {
        try {
            const relativePath = path.relative(this.siteRoot, filePath);
            console.log(`📝 Processing: ${relativePath}`);
            
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Check if already migrated
            if (content.includes('assets/js/modern/core/App.js')) {
                console.log(`  ✓ Already migrated`);
                return;
            }
            
            // Check if needs migration
            if (!content.includes('jquery') && !content.includes('component-loader.js')) {
                console.log(`  ⏭️  No jQuery/component-loader found, skipping`);
                return;
            }
            
            // Calculate relative path to assets
            const depth = relativePath.split('/').length - 1;
            const assetsPath = '../'.repeat(depth) + 'assets/js/modern/core/App.js';
            
            // Replace jQuery and old scripts
            const oldScriptPattern = /<script src="[^"]*jquery[^"]*"[^>]*><\/script>\s*<script src="[^"]*popper[^"]*"[^>]*><\/script>\s*<script src="[^"]*bootstrap[^"]*"[^>]*><\/script>\s*<script src="[^"]*main\.js"[^>]*><\/script>\s*(?:<!--[^>]*-->\s*)?<script src="[^"]*component-loader\.js"[^>]*><\/script>/gi;
            
            const newScripts = `<!-- Bootstrap JS (keeping for CSS compatibility, but using modern collapse API) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>

<!-- Modern App - ES6 Modules (replaces jQuery and old scripts) -->
<script type="module" src="${assetsPath}"></script>`;

            if (oldScriptPattern.test(content)) {
                content = content.replace(oldScriptPattern, newScripts);
            } else {
                // Fallback: replace individual components
                content = this.replaceIndividualScripts(content, assetsPath);
            }
            
            // Write updated content
            fs.writeFileSync(filePath, content);
            this.pagesUpdated++;
            console.log(`  ✅ Updated`);
            
        } catch (error) {
            const errorMsg = `${path.relative(this.siteRoot, filePath)}: ${error.message}`;
            this.errors.push(errorMsg);
            console.log(`  ❌ Error: ${error.message}`);
        }
    }

    replaceIndividualScripts(content, assetsPath) {
        // Remove jQuery
        content = content.replace(/<script src="[^"]*jquery[^"]*"[^>]*><\/script>\s*/gi, '');
        
        // Remove Popper
        content = content.replace(/<script src="[^"]*popper[^"]*"[^>]*><\/script>\s*/gi, '');
        
        // Update Bootstrap to keep only the script we need
        content = content.replace(
            /<script src="[^"]*bootstrap[^"]*"[^>]*><\/script>/gi,
            '<!-- Bootstrap JS (keeping for CSS compatibility, but using modern collapse API) -->\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>'
        );
        
        // Remove main.js
        content = content.replace(/<script src="[^"]*main\.js"[^>]*><\/script>\s*/gi, '');
        
        // Remove component-loader and add modern app
        content = content.replace(
            /<!--[^>]*-->\s*<script src="[^"]*component-loader\.js"[^>]*><\/script>/gi,
            `<!-- Modern App - ES6 Modules (replaces jQuery and old scripts) -->\n<script type="module" src="${assetsPath}"></script>`
        );
        
        // If component-loader wasn't found with comment, try without
        content = content.replace(
            /<script src="[^"]*component-loader\.js"[^>]*><\/script>/gi,
            `<!-- Modern App - ES6 Modules (replaces jQuery and old scripts) -->\n<script type="module" src="${assetsPath}"></script>`
        );
        
        return content;
    }
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const migrator = new PageMigrator();
    migrator.migrate();
}

export default PageMigrator;
