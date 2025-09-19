/**
 * Modern Header JavaScript
 * Handles mobile menu toggle and smooth scrolling effects
 */

class ModernHeader {
  constructor() {
    this.navbar = document.querySelector('.modern-navbar');
    this.mobileToggle = document.querySelector('.mobile-menu-toggle');
    this.navbarMenu = document.querySelector('.navbar-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.lastScrollY = window.scrollY;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.handleScroll();
  }

  bindEvents() {
    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
    }

    // Close mobile menu when clicking nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', this.closeMobileMenu.bind(this));
    });

    // Handle scroll events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 10));

    // Handle resize events
    window.addEventListener('resize', this.handleResize.bind(this));

    // Close mobile menu when clicking outside
    document.addEventListener('click', this.handleOutsideClick.bind(this));

    // Handle keyboard navigation
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  toggleMobileMenu() {
    const isExpanded = this.mobileToggle.getAttribute('aria-expanded') === 'true';
    
    this.mobileToggle.setAttribute('aria-expanded', !isExpanded);
    this.navbarMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
    
    // Add animation class for smooth transition
    this.navbarMenu.style.animation = !isExpanded ? 'slideInDown 0.3s ease-out' : '';
  }

  closeMobileMenu() {
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.navbarMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class for styling
    if (currentScrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll (optional)
    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      this.navbar.style.transform = 'translateY(-100%)';
    } else {
      this.navbar.style.transform = 'translateY(0)';
    }

    this.lastScrollY = currentScrollY;
  }

  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  handleOutsideClick(event) {
    // Close mobile menu when clicking outside
    if (!this.navbar.contains(event.target) && 
        this.navbarMenu.classList.contains('active')) {
      this.closeMobileMenu();
    }
  }

  handleKeydown(event) {
    // Close mobile menu with Escape key
    if (event.key === 'Escape' && this.navbarMenu.classList.contains('active')) {
      this.closeMobileMenu();
      this.mobileToggle.focus();
    }

    // Handle tab navigation in mobile menu
    if (event.key === 'Tab' && this.navbarMenu.classList.contains('active')) {
      this.handleTabNavigation(event);
    }
  }

  handleTabNavigation(event) {
    const focusableElements = this.navbarMenu.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  // Utility function for throttling scroll events
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.modern-navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new ModernHeader();
  initSmoothScrolling();
});

// Add additional CSS for scrolled state
const additionalCSS = `
  .modern-navbar.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.15);
  }
  
  .modern-navbar.scrolled .brand-avatar {
    width: 40px;
    height: 40px;
  }
  
  @media (prefers-color-scheme: dark) {
    .modern-navbar.scrolled {
      background: rgba(44, 62, 80, 0.98);
    }
  }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
