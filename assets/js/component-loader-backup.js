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
            header: `<!-- Modern Navigation Header -->
<nav class="modern-navbar" role="navigation" aria-label="Main Navigation">
    <div class="navbar-container">
        <!-- Brand/Logo Section -->
        <div class="navbar-brand">
            <div class="brand-avatar">
                <img alt="AZ - Profile Avatar" class="avatar-image" src="{AVATAR_PATH}">
            </div>
            <div class="brand-text">
                <span class="brand-name">AZ</span>
                <span class="brand-tagline">Developer & Designer</span>
            </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="main-navigation">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button>

        <!-- Navigation Menu -->
        <div class="navbar-menu" id="main-navigation">
            <ul class="nav-links" role="list">
                <li class="nav-item" role="listitem">
                    <a class="nav-link" href="{WORKS_LINK}" aria-label="View my portfolio works">
                        <span class="nav-icon">💼</span>
                        <span class="nav-text">Works</span>
                    </a>
                </li>
                <li class="nav-item" role="listitem">
                    <a class="nav-link" href="{NEWS_LINK}" aria-label="Read latest news and updates">
                        <span class="nav-icon">📰</span>
                        <span class="nav-text">News</span>
                    </a>
                </li>
                <li class="nav-item" role="listitem">
                    <a class="nav-link" href="{ABOUT_LINK}" aria-label="Learn more about me">
                        <span class="nav-icon">👨‍💻</span>
                        <span class="nav-text">About</span>
                    </a>
                </li>
                <li class="nav-item" role="listitem">
                    <a class="nav-link nav-link-cta" href="{CONTACTS_LINK}" aria-label="Get in touch with me">
                        <span class="nav-icon">📧</span>
                        <span class="nav-text">Contact</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- Modern Header Section -->
<header class="modern-header{HEADER_CLASSES}" role="banner">
    <div class="header-content-wrapper">
        {HEADER_CONTENT}
    </div>
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
        // Modern navbar toggle functionality
        setTimeout(() => {
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            const navbarMenu = document.querySelector('.navbar-menu');
            const navLinks = document.querySelectorAll('.nav-link');
            
            if (mobileToggle && navbarMenu) {
                console.log('Backup Component Loader: Setting up modern navbar toggle');
                
                mobileToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                    
                    mobileToggle.setAttribute('aria-expanded', !isExpanded);
                    navbarMenu.classList.toggle('active');
                    
                    // Prevent body scroll when menu is open
                    document.body.style.overflow = !isExpanded ? 'hidden' : '';
                });
                
                // Close menu when clicking on links (mobile)
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth < 768) {
                            mobileToggle.setAttribute('aria-expanded', 'false');
                            navbarMenu.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    });
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (event) => {
                    const navbar = document.querySelector('.modern-navbar');
                    if (navbar && !navbar.contains(event.target) && navbarMenu.classList.contains('active')) {
                        mobileToggle.setAttribute('aria-expanded', 'false');
                        navbarMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
                
                // Handle resize events
                window.addEventListener('resize', () => {
                    if (window.innerWidth > 768) {
                        mobileToggle.setAttribute('aria-expanded', 'false');
                        navbarMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
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