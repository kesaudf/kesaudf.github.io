/**
 * Component Loader - Dynamically loads header and footer components
 * 
 * WORKFLOW:
 * 1. Edit components/header.html and components/footer.html
 * 2. For HTTP servers: Changes work immediately
 * 3. For file:// protocol: Run "node sync-components.js" to sync embedded templates
 * 
 * LOADING ORDER:
 * 1. Try to fetch from HTML files (works with HTTP servers)
 * 2. Fallback to embedded templates (works with file:// protocol)
 * 
 * Usage: Add data-component attributes to divs where you want components loaded
 */

class ComponentLoader {
    constructor() {
        console.log('ComponentLoader: Initializing...');
        this.basePath = this.getBasePath();
        console.log(`ComponentLoader: Base path determined as: ${this.basePath}`);
        this.init();
    }

    // Determine the base path based on current page location
    getBasePath() {
        const path = window.location.pathname;
        console.log('ComponentLoader: Current path:', path);
        
        // Handle file:// protocol paths
        if (path.includes('/pages/projects/') || path.includes('/pages/about/')) {
            console.log('ComponentLoader: Detected nested page, using ../../');
            return '../../';
        } else if (path.includes('/pages/')) {
            console.log('ComponentLoader: Detected pages directory, using ../');
            return '../';
        } else {
            console.log('ComponentLoader: Detected root level, using ./');
            return './';
        }
    }

    // Initialize component loading when DOM is ready
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadAllComponents());
        } else {
            this.loadAllComponents();
        }
    }

    // Load all components on the page
    async loadAllComponents() {
        console.log('ComponentLoader: Starting to load components...');
        const componentElements = document.querySelectorAll('[data-component]');
        console.log(`ComponentLoader: Found ${componentElements.length} components to load`);
        
        for (const element of componentElements) {
            const componentName = element.getAttribute('data-component');
            const config = this.parseConfig(element);
            console.log(`ComponentLoader: Loading component "${componentName}"`);
            await this.loadComponent(element, componentName, config);
        }
        console.log('ComponentLoader: Finished loading all components');
    }

    // Parse configuration from data attributes
    parseConfig(element) {
        const config = {};
        
        // Get all data attributes that start with 'data-'
        for (const attr of element.attributes) {
            if (attr.name.startsWith('data-') && attr.name !== 'data-component') {
                const key = attr.name.replace('data-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                // Convert to uppercase for template matching
                const templateKey = key.toUpperCase().replace(/([A-Z])/g, '_$1').replace(/^_/, '');
                config[templateKey] = attr.value;
            }
        }
        
        return config;
    }

    // Load a specific component
    async loadComponent(element, componentName, config = {}) {
        try {
            console.log(`ComponentLoader: Loading component "${componentName}"`);
            
            // Try to load from HTML file first, fallback to embedded template
            let html = await this.fetchComponentFromFile(componentName);
            
            if (!html) {
                console.log(`ComponentLoader: File fetch failed (likely file:// protocol), using embedded template for ${componentName}`);
                html = this.getComponentTemplate(componentName);
            }
            
            if (!html) {
                throw new Error(`Component template not found: ${componentName}`);
            }
            
            console.log(`ComponentLoader: Loaded ${componentName}, content length: ${html.length}`);
            
            // Process the HTML with configuration
            html = this.processTemplate(html, config);
            
            element.innerHTML = html;
            console.log(`ComponentLoader: Successfully inserted ${componentName} into DOM`);
            
            // Execute any scripts in the loaded component
            this.executeScripts(element);
            
            // Setup navigation behavior if this is the header component
            if (componentName === 'header') {
                this.setupNavigation();
            }
            
        } catch (error) {
            console.error(`ComponentLoader: Error loading component ${componentName}:`, error);
            element.innerHTML = `<div style="color: red; padding: 10px;">Error loading ${componentName} component</div>`;
        }
    }

    // Fetch component from HTML file
    async fetchComponentFromFile(componentName) {
        try {
            const componentPath = `${this.basePath}components/${componentName}.html`;
            console.log(`ComponentLoader: Attempting to fetch ${componentName} from ${componentPath}`);
            
            const response = await fetch(componentPath);
            
            if (!response.ok) {
                console.warn(`ComponentLoader: Failed to fetch ${componentPath}, status: ${response.status}`);
                return null;
            }
            
            const html = await response.text();
            console.log(`ComponentLoader: Successfully fetched ${componentName} from file`);
            return html.trim();
            
        } catch (error) {
            console.warn(`ComponentLoader: Error fetching ${componentName} from file:`, error);
            return null;
        }
    }

    // Get component template (fallback for file:// protocol compatibility)
    // NOTE: Keep these templates in sync with the HTML files in components/ folder
    getComponentTemplate(componentName) {
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
        
        return templates[componentName] || null;
    }

    // Process template with configuration values
    processTemplate(html, config) {
        // Set default values based on current page
        const defaults = this.getDefaults();
        const finalConfig = { ...defaults, ...config };
        
        // Replace all placeholders
        for (const [key, value] of Object.entries(finalConfig)) {
            const placeholder = new RegExp(`\\{${key.toUpperCase()}\\}`, 'g');
            html = html.replace(placeholder, value || '');
        }
        
        return html;
    }

    // Get default configuration values based on page location
    getDefaults() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        const defaults = {
            faviconPath: `${this.basePath}assets/images/favicon.ico`,
            analyticsPath: `${this.basePath}assets/js/analytics.js`,
            personalJsPath: `${this.basePath}assets/js/mypersonal.js`,
            cssAllPath: `${this.basePath}assets/css/all.css`,
            css002Path: `${this.basePath}assets/css/css_002.css`,
            cssMainPath: `${this.basePath}assets/css/css.css`,
            cssBootstrapSocialPath: `${this.basePath}assets/css/bootstrap-social.css`,
            cssSitePath: `${this.basePath}assets/css/site.css`,
            cssMobileFixPath: `${this.basePath}assets/css/mobile-fix.css`,
            AVATAR_PATH: `${this.basePath}assets/images/badge.jpg`,
            mainJsPath: `${this.basePath}assets/js/main.js`,
            pageTitle: 'AZ',
            pageAuthor: 'AZ',
            additionalHeadContent: '',
            HEADER_CLASSES: '',
            HEADER_CONTENT: '',
            additionalScripts: ''
        };

        // Set navigation links based on current location (using correct template variable names)
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

    // Setup navigation behavior for the navbar
    setupNavigation() {
        // Use multiple attempts to ensure setup works
        this.attemptNavbarSetup(0);
    }

    // Attempt navbar setup with retries
    attemptNavbarSetup(attempt) {
        const maxAttempts = 5;
        
        if (attempt >= maxAttempts) {
            console.warn('ComponentLoader: Max setup attempts reached');
            return;
        }

        setTimeout(() => {
            if (typeof $ !== 'undefined' && $('.navbar-toggler').length > 0) {
                console.log(`ComponentLoader: Setting up navbar (attempt ${attempt + 1})`);
                this.setupNavbarBehavior();
                this.setupScrollBehavior();
                this.reinitializeMainJS();
            } else {
                console.log(`ComponentLoader: Navbar not ready, retrying (attempt ${attempt + 1})`);
                this.attemptNavbarSetup(attempt + 1);
            }
        }, 100 + (attempt * 50)); // Increasing delay with each attempt
    }

    // Reinitialize main.js functionality after components are loaded
    reinitializeMainJS() {
        try {
            // Only reinitialize if BeautifulJekyllJS exists and navbar is now available
            if (typeof BeautifulJekyllJS !== 'undefined' && $('.navbar').length > 0) {
                console.log('ComponentLoader: Reinitializing main.js functionality');
                BeautifulJekyllJS.init();
            }
        } catch (error) {
            console.warn('ComponentLoader: Could not reinitialize main.js:', error);
        }
    }

    // Setup navbar toggle and mobile behavior
    setupNavbarBehavior() {
        const $navbarToggler = $('.navbar-toggler');
        const $navbarCollapse = $('.navbar-collapse');
        const $navbar = $('.navbar-custom');
        
        if ($navbarToggler.length && $navbarCollapse.length) {
            // Ensure toggle icon is visible and properly styled
            $('.navbar-toggler-icon').css({
                'display': 'inline-block',
                'width': '1.5em',
                'height': '1.5em',
                'vertical-align': 'middle',
                'background': 'no-repeat center center',
                'background-size': '100% 100%',
                'background-image': 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'30\' height=\'30\' viewBox=\'0 0 30 30\'%3e%3cpath stroke=\'rgba%2833, 37, 41, 0.75%29\' stroke-linecap=\'round\' stroke-miterlimit=\'10\' stroke-width=\'2\' d=\'M4 7h22M4 15h22M4 23h22\'/%3e%3c/svg%3e")',
                'opacity': '1',
                'visibility': 'visible'
            });
            
            // Ensure the toggler button itself is properly styled
            $navbarToggler.css({
                'border': '1px solid rgba(0, 0, 0, 0.1)',
                'padding': '0.25rem 0.5rem',
                'background-color': 'transparent',
                'border-radius': '0.25rem',
                'cursor': 'pointer'
            });
            
            // Enhanced navbar toggle functionality
            $navbarToggler.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isCollapsed = !$navbarCollapse.hasClass('show');
                
                if (isCollapsed) {
                    $navbarCollapse.addClass('show');
                    $navbar.addClass('top-nav-expanded');
                    $(this).attr('aria-expanded', 'true');
                } else {
                    $navbarCollapse.removeClass('show');
                    $navbar.removeClass('top-nav-expanded');
                    $(this).attr('aria-expanded', 'false');
                }
                
                // Force reflow
                $navbarCollapse[0].offsetHeight;
            });
            
            // Close mobile menu when clicking on nav links
            $('.navbar-nav .nav-link').on('click', function() {
                if ($(window).width() < 768 && $navbarCollapse.hasClass('show')) {
                    $navbarCollapse.removeClass('show');
                    $navbar.removeClass('top-nav-expanded');
                    $navbarToggler.attr('aria-expanded', 'false');
                }
            });
            
            // Close mobile menu when clicking outside
            $(document).on('click', function(e) {
                if ($(window).width() < 768 && 
                    !$(e.target).closest('.navbar').length && 
                    $navbarCollapse.hasClass('show')) {
                    $navbarCollapse.removeClass('show');
                    $navbar.removeClass('top-nav-expanded');
                    $navbarToggler.attr('aria-expanded', 'false');
                }
            });
        }
    }

    // Setup scroll behavior for navbar
    setupScrollBehavior() {
        const $navbar = $('.navbar-custom');
        const $avatar = $('.avatar-container');
        const scrollThreshold = 50;
        
        function checkScroll() {
            const scrollTop = $(window).scrollTop();
            
            if (scrollTop > scrollThreshold) {
                $navbar.addClass("top-nav-short");
            } else {
                $navbar.removeClass("top-nav-short");
            }
        }
        
        // Throttled scroll event
        let scrollTimer = null;
        $(window).scroll(function() {
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(checkScroll, 10);
        });
        
        // Initial check
        checkScroll();
        
        // Ensure avatar is visible on page load
        if ($avatar.length) {
            $avatar.css('opacity', '1').css('visibility', 'visible');
        }
    }

    // Execute any scripts found in the loaded component
    executeScripts(element) {
        const scripts = element.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            
            // Copy attributes
            for (const attr of script.attributes) {
                newScript.setAttribute(attr.name, attr.value);
            }
            
            script.parentNode.replaceChild(newScript, script);
        });
    }
}

// Initialize the component loader
window.ComponentLoader = new ComponentLoader();
