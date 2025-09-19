/**
 * Backup Component Loader - Simple, reliable component loading
 * This is a fallback for when the modern framework has issues
 */

(function() {
    console.log('Backup Component Loader: Starting...');
    
    function loadComponents() {
        // Get base path based on current location
        const path = window.location.pathname;
        let basePath = './';
        
        if (path.includes('/pages/projects/') || path.includes('/pages/about/')) {
            basePath = '../../';
        } else if (path.includes('/pages/')) {
            basePath = '../';
        }
        
        console.log('Backup Component Loader: Base path:', basePath);
        
        // Find all component elements
        const componentElements = document.querySelectorAll('[data-component]');
        console.log('Backup Component Loader: Found', componentElements.length, 'components');
        
        componentElements.forEach(element => {
            const componentName = element.getAttribute('data-component');
            loadComponent(element, componentName, basePath);
        });
    }
    
    function loadComponent(element, componentName, basePath) {
        console.log(`Backup Component Loader: Loading ${componentName}...`);
        
        // Try to fetch from file first
        const componentPath = `${basePath}components/${componentName}.html`;
        
        fetch(componentPath)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            })
            .then(html => {
                console.log(`Backup Component Loader: Loaded ${componentName} from file`);
                processAndInsert(element, html, basePath);
            })
            .catch(error => {
                console.log(`Backup Component Loader: File fetch failed for ${componentName}, using fallback`);
                const fallbackHTML = getFallbackTemplate(componentName);
                if (fallbackHTML) {
                    processAndInsert(element, fallbackHTML, basePath);
                } else {
                    console.error(`Backup Component Loader: No fallback for ${componentName}`);
                }
            });
    }
    
    function processAndInsert(element, html, basePath) {
        // Process template variables
        html = html.replace(/{WORKS_LINK}/g, basePath + 'index.html');
        html = html.replace(/{NEWS_LINK}/g, basePath + 'News.html');
        html = html.replace(/{ABOUT_LINK}/g, basePath + 'pages/about/AboutMe.html');
        html = html.replace(/{CONTACTS_LINK}/g, basePath + 'pages/about/Contacts.html');
        html = html.replace(/{AVATAR_PATH}/g, basePath + 'assets/images/badge.jpg');
        html = html.replace(/{HEADER_CLASSES}/g, '');
        html = html.replace(/{HEADER_CONTENT}/g, '');
        
        // Remove any remaining placeholders
        html = html.replace(/\{[A-Z_]+\}/g, '');
        
        element.innerHTML = html;
        
        // Setup navbar functionality if this is header
        if (element.getAttribute('data-component') === 'header') {
            setupNavbar();
        }
    }
    
    function getFallbackTemplate(componentName) {
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
    
    function setupNavbar() {
        // Simple navbar toggle functionality
        setTimeout(() => {
            const toggler = document.querySelector('.navbar-toggler');
            const collapse = document.querySelector('.navbar-collapse');
            
            if (toggler && collapse) {
                console.log('Backup Component Loader: Setting up navbar toggle');
                
                toggler.addEventListener('click', function(e) {
                    e.preventDefault();
                    collapse.classList.toggle('show');
                    
                    const expanded = collapse.classList.contains('show');
                    toggler.setAttribute('aria-expanded', expanded);
                });
                
                // Close menu when clicking on links (mobile)
                const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth < 768) {
                            collapse.classList.remove('show');
                            toggler.setAttribute('aria-expanded', 'false');
                        }
                    });
                });
            }
        }, 100);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComponents);
    } else {
        loadComponents();
    }
    
    console.log('Backup Component Loader: Initialized');
})();
