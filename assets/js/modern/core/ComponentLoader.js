/**
 * Modern Component Loader - ES6 Module version
 * Loads header/footer components without jQuery
 */

export class ComponentLoader {
    constructor() {
        this.basePath = this.getBasePath();
        this.cache = new Map();
        console.log(`ComponentLoader: Base path: ${this.basePath}`);
    }

    getBasePath() {
        const path = window.location.pathname;
        
        if (path.includes('/pages/projects/') || path.includes('/pages/about/')) {
            return '../../';
        } else if (path.includes('/pages/')) {
            return '../';
        }
        return './';
    }

    async loadAll() {
        const componentElements = document.querySelectorAll('[data-component]');
        console.log(`ComponentLoader: Found ${componentElements.length} components`);
        
        const loadPromises = Array.from(componentElements).map(element => {
            const componentName = element.getAttribute('data-component');
            const config = this.parseConfig(element);
            return this.loadComponent(element, componentName, config);
        });

        await Promise.all(loadPromises);
        console.log('ComponentLoader: All components loaded');
    }

    parseConfig(element) {
        const config = {};
        
        for (const attr of element.attributes) {
            if (attr.name.startsWith('data-') && attr.name !== 'data-component') {
                const key = attr.name.replace('data-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                const templateKey = key.toUpperCase().replace(/([A-Z])/g, '_$1').replace(/^_/, '');
                config[templateKey] = attr.value;
            }
        }
        
        return config;
    }

    async loadComponent(element, componentName, config = {}) {
        try {
            let html = await this.fetchComponent(componentName);
            
            if (!html) {
                html = this.getEmbeddedTemplate(componentName);
            }
            
            if (!html) {
                throw new Error(`Component template not found: ${componentName}`);
            }
            
            console.log(`ComponentLoader: Processing template for ${componentName}, length: ${html.length}`);
            
            html = this.processTemplate(html, config);
            element.innerHTML = html;
            console.log(`ComponentLoader: Successfully inserted ${componentName} into DOM`);
            
            this.executeScripts(element);
            
            // Dispatch component loaded event
            const event = new CustomEvent('component:loaded', {
                detail: { name: componentName, element }
            });
            document.dispatchEvent(event);
            
        } catch (error) {
            console.error(`ComponentLoader: Error loading ${componentName}:`, error);
            element.innerHTML = `<div style="color: red; padding: 10px;">Error loading ${componentName}</div>`;
        }
    }

    async fetchComponent(componentName) {
        if (this.cache.has(componentName)) {
            return this.cache.get(componentName);
        }

        try {
            const componentPath = `${this.basePath}components/${componentName}.html`;
            const response = await fetch(componentPath);
            
            if (!response.ok) {
                console.warn(`ComponentLoader: Failed to fetch ${componentPath}`);
                return null;
            }
            
            const html = await response.text();
            this.cache.set(componentName, html);
            return html.trim();
            
        } catch (error) {
            console.warn(`ComponentLoader: Network error for ${componentName}:`, error);
            return null;
        }
    }

    getEmbeddedTemplate(componentName) {
        const templates = {
            header: `<nav class="navbar navbar-expand-md navbar-light fixed-top navbar-custom">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="main-navbar">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="{WORKS_LINK}">Works</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{NEWS_LINK}">News</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{ABOUT_LINK}">About Me</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{CONTACTS_LINK}">Contacts</a>
            </li>
        </ul>
    </div>
    <div class="avatar-container">
        <div class="avatar-img-border">
            <img alt="Navbar avatar" class="avatar-img" src="{AVATAR_PATH}">
        </div>
    </div>
</nav>
<header class="header-section{HEADER_CLASSES}">
    {HEADER_CONTENT}
</header>`,
            footer: `<footer>
    <div class="container-md beautiful-jekyll-footer">
        <div class="row">
            <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <p class="copyright text-muted">
                    AZ
                    &nbsp;•&nbsp;
                    2021-2025
                    &nbsp;•&nbsp;
                    <a href="https://kesaudf.github.io/" target="_blank">kesaudf.github.io</a>
                    &nbsp;•&nbsp;
                    <a href="mailto:alexapperwelt@mail.com">e-mail</a>
                    &nbsp;•&nbsp;
                    <a href="https://t.me/AlexApperwelt" target="_blank">telegram</a>
                </p>
            </div>
        </div>
    </div>
</footer>`
        };
        
        console.log(`ComponentLoader: Getting embedded template for ${componentName}`);
        return templates[componentName] || null;
    }

    processTemplate(html, config) {
        const defaults = this.getDefaults();
        const finalConfig = { ...defaults, ...config };
        
        console.log(`ComponentLoader: Processing template with config:`, finalConfig);
        
        for (const [key, value] of Object.entries(finalConfig)) {
            const placeholder = new RegExp(`\\{${key.toUpperCase()}\\}`, 'g');
            html = html.replace(placeholder, value || '');
        }
        
        // Remove any remaining unmatched placeholders
        html = html.replace(/\{[A-Z_]+\}/g, '');
        
        return html;
    }

    getDefaults() {
        const path = window.location.pathname;
        
        const defaults = {
            AVATAR_PATH: `${this.basePath}assets/images/badge.jpg`,
            HEADER_CLASSES: '',
            HEADER_CONTENT: ''
        };

        // Set navigation links
        if (path.includes('/pages/about/') || path.includes('/pages/projects/')) {
            defaults.WORKS_LINK = '../../index.html';
            defaults.NEWS_LINK = '../../News.html';
            defaults.ABOUT_LINK = '../about/AboutMe.html';
            defaults.CONTACTS_LINK = '../about/Contacts.html';
        } else {
            defaults.WORKS_LINK = 'index.html';
            defaults.NEWS_LINK = 'News.html';
            defaults.ABOUT_LINK = 'pages/about/AboutMe.html';
            defaults.CONTACTS_LINK = 'pages/about/Contacts.html';
        }

        return defaults;
    }

    executeScripts(element) {
        const scripts = element.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            
            for (const attr of script.attributes) {
                newScript.setAttribute(attr.name, attr.value);
            }
            
            script.parentNode.replaceChild(newScript, script);
        });
    }
}
