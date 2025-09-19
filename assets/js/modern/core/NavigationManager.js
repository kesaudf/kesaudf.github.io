/**
 * Modern Navigation Manager - Replaces jQuery navbar functionality
 */

export class NavigationManager {
    constructor() {
        this.navbar = null;
        this.navbarToggler = null;
        this.navbarCollapse = null;
        this.isInitialized = false;
    }

    async init() {
        // Wait for components to load
        await this.waitForNavbar();
        this.setupNavbarElements();
        this.setupEventListeners();
        this.isInitialized = true;
        console.log('NavigationManager: Initialized');
    }

    async waitForNavbar() {
        return new Promise((resolve) => {
            const checkNavbar = () => {
                const navbar = document.querySelector('.navbar-custom');
                if (navbar) {
                    resolve();
                } else {
                    setTimeout(checkNavbar, 50);
                }
            };
            checkNavbar();
        });
    }

    setupNavbarElements() {
        this.navbar = document.querySelector('.navbar-custom');
        this.navbarToggler = document.querySelector('.navbar-toggler');
        this.navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (!this.navbar || !this.navbarToggler || !this.navbarCollapse) {
            console.warn('NavigationManager: Required navbar elements not found');
            return;
        }

        // Style the toggle icon
        this.styleToggleIcon();
    }

    styleToggleIcon() {
        const toggleIcon = this.navbarToggler.querySelector('.navbar-toggler-icon');
        if (toggleIcon) {
            Object.assign(toggleIcon.style, {
                display: 'inline-block',
                width: '1.5em',
                height: '1.5em',
                verticalAlign: 'middle',
                background: 'no-repeat center center',
                backgroundSize: '100% 100%',
                backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'30\' height=\'30\' viewBox=\'0 0 30 30\'%3e%3cpath stroke=\'rgba%2833, 37, 41, 0.75%29\' stroke-linecap=\'round\' stroke-miterlimit=\'10\' stroke-width=\'2\' d=\'M4 7h22M4 15h22M4 23h22\'/%3e%3c/svg%3e")',
                opacity: '1',
                visibility: 'visible'
            });
        }

        // Style the toggler button
        Object.assign(this.navbarToggler.style, {
            border: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '0.25rem 0.5rem',
            backgroundColor: 'transparent',
            borderRadius: '0.25rem',
            cursor: 'pointer'
        });
    }

    setupEventListeners() {
        // Navbar toggle functionality
        this.navbarToggler.addEventListener('click', this.handleToggleClick.bind(this));
        
        // Close mobile menu on nav link clicks
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavLinkClick.bind(this));
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', this.handleDocumentClick.bind(this));
        
        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleToggleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        const isCollapsed = !this.navbarCollapse.classList.contains('show');
        
        if (isCollapsed) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    handleNavLinkClick() {
        if (this.isMobileView() && this.navbarCollapse.classList.contains('show')) {
            this.closeMobileMenu();
        }
    }

    handleDocumentClick(event) {
        if (this.isMobileView() && 
            !event.target.closest('.navbar') && 
            this.navbarCollapse.classList.contains('show')) {
            this.closeMobileMenu();
        }
    }

    handleResize() {
        // Close mobile menu if switching to desktop view
        if (!this.isMobileView() && this.navbarCollapse.classList.contains('show')) {
            this.closeMobileMenu();
        }
    }

    openMobileMenu() {
        this.navbarCollapse.classList.add('show');
        this.navbar.classList.add('top-nav-expanded');
        this.navbarToggler.setAttribute('aria-expanded', 'true');
        
        // Trigger reflow
        this.navbarCollapse.offsetHeight;
    }

    closeMobileMenu() {
        this.navbarCollapse.classList.remove('show');
        this.navbar.classList.remove('top-nav-expanded');
        this.navbarToggler.setAttribute('aria-expanded', 'false');
    }

    isMobileView() {
        return window.innerWidth < 768;
    }

    // Public methods for external use
    isMenuOpen() {
        return this.navbarCollapse && this.navbarCollapse.classList.contains('show');
    }

    toggleMenu() {
        if (this.isMenuOpen()) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
}
