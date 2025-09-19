/**
 * Modern Scroll Handler - Replaces jQuery scroll functionality
 */

export class ScrollHandler {
    constructor() {
        this.navbar = null;
        this.avatar = null;
        this.scrollThreshold = 50;
        this.isScrolling = false;
        this.scrollTimer = null;
    }

    init() {
        this.navbar = document.querySelector('.navbar-custom');
        this.avatar = document.querySelector('.avatar-container');
        
        if (!this.navbar) {
            console.warn('ScrollHandler: Navbar not found, waiting for components...');
            // Listen for component loaded event
            document.addEventListener('component:loaded', (event) => {
                if (event.detail.name === 'header') {
                    this.initAfterDelay();
                }
            });
            return;
        }

        this.setupScrollListener();
        this.initialCheck();
        console.log('ScrollHandler: Initialized');
    }

    initAfterDelay() {
        setTimeout(() => {
            this.navbar = document.querySelector('.navbar-custom');
            this.avatar = document.querySelector('.avatar-container');
            if (this.navbar) {
                this.setupScrollListener();
                this.initialCheck();
                console.log('ScrollHandler: Initialized after component load');
            }
        }, 100);
    }

    setupScrollListener() {
        // Use passive listener for better performance
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Handle resize events
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleScroll() {
        // Throttle scroll events for better performance
        if (!this.isScrolling) {
            window.requestAnimationFrame(this.updateNavbarState.bind(this));
            this.isScrolling = true;
        }
    }

    handleResize() {
        // Debounce resize events
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(() => {
            this.updateNavbarState();
        }, 150);
    }

    updateNavbarState() {
        if (!this.navbar) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > this.scrollThreshold) {
            this.navbar.classList.add('top-nav-short');
        } else {
            this.navbar.classList.remove('top-nav-short');
        }

        // Ensure avatar visibility
        if (this.avatar) {
            this.avatar.style.opacity = '1';
            this.avatar.style.visibility = 'visible';
        }

        this.isScrolling = false;
    }

    initialCheck() {
        // Initial state check
        this.updateNavbarState();
    }

    // Public methods
    getScrollPosition() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    isNavbarShort() {
        return this.navbar && this.navbar.classList.contains('top-nav-short');
    }

    scrollToTop(smooth = true) {
        window.scrollTo({
            top: 0,
            behavior: smooth ? 'smooth' : 'auto'
        });
    }

    scrollToElement(element, offset = 0) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
}
