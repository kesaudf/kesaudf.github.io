/**
 * Modern App Core - ES6 Module-based Architecture
 * Replaces jQuery with modern vanilla JavaScript
 */

import { ComponentLoader } from './ComponentLoader.js';
import { NavigationManager } from './NavigationManager.js';
import { ProjectGallery } from '../components/ProjectGallery.js';
import { HeaderImageCycler } from '../components/HeaderImageCycler.js';
import { ScrollHandler } from './ScrollHandler.js';
import { BootstrapBridge } from '../legacy/BootstrapBridge.js';
import { LegacyCompat } from '../legacy/LegacyCompat.js';
import { DOMUtils } from '../utils/DOMUtils.js';

export class App {
    constructor() {
        this.components = new Map();
        this.isInitialized = false;
        console.log('Modern App: Initializing...');
    }

    async init() {
        if (this.isInitialized) return;
        
        try {
            // Wait for DOM to be ready
            await this.waitForDOM();
            
            // Initialize core systems
            this.componentLoader = new ComponentLoader();
            this.navigationManager = new NavigationManager();
            this.scrollHandler = new ScrollHandler();
            this.bootstrapBridge = new BootstrapBridge();
            
            // Load components
            await this.loadComponents();
            
            // Initialize page-specific functionality
            this.initializePageSpecific();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            this.isInitialized = true;
            console.log('Modern App: Initialization complete');
            
            // Dispatch custom event for app ready
            this.dispatchEvent('app:ready');
            
        } catch (error) {
            console.error('Modern App: Initialization failed:', error);
        }
    }

    async waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    async loadComponents() {
        // Load header and footer components
        await this.componentLoader.loadAll();
        
            // Initialize navigation after components are loaded
            await this.navigationManager.init();
            
            // Initialize scroll handler
            this.scrollHandler.init();
            
            // Initialize Bootstrap bridge
            this.bootstrapBridge.init();
    }

    initializePageSpecific() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        // Initialize project gallery on home page
        if (filename === 'index.html' || filename === '') {
            this.initializeProjectGallery();
        }
        
        // Initialize header image cycling
        this.initializeHeaderImageCycler();
        
        // Initialize other page-specific components as needed
        this.initializePageComponents(filename);
    }

    initializeProjectGallery() {
        const projectContainer = document.querySelector('#projectThumbs');
        if (projectContainer) {
            const gallery = new ProjectGallery(projectContainer);
            gallery.init();
            this.components.set('projectGallery', gallery);
        }
    }

    initializeHeaderImageCycler() {
        const headerImageCycler = new HeaderImageCycler();
        headerImageCycler.init();
        this.components.set('headerImageCycler', headerImageCycler);
    }

    initializePageComponents(filename) {
        // Add page-specific initialization logic here
        console.log(`Modern App: Initializing page-specific components for ${filename}`);
        
        // Example: Initialize video players, forms, etc. based on page
        this.initializeVideoPlayers();
        this.initializePasswordForms();
    }

    initializeVideoPlayers() {
        const videoElements = document.querySelectorAll('[data-video-player]');
        videoElements.forEach(element => {
            // Initialize video player functionality
            console.log('Modern App: Initializing video player');
        });
    }

    initializePasswordForms() {
        // Replace the global passwd function with modern implementation
        window.passwd = this.passwordPrompt.bind(this);
    }

    passwordPrompt() {
        const password = prompt('Enter the password to download the file:');
        if (password && password.toLowerCase() === "teacher") {
            window.open("assets/documents/AZ_CV.pdf");
            return true;
        } else {
            alert("Incorrect password!! please try again");
            return false;
        }
    }

    setupGlobalEvents() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.dispatchEvent('app:resize');
            }, 250);
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            this.dispatchEvent('app:visibilitychange', {
                hidden: document.hidden
            });
        });
    }

    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }

    // Utility methods for component communication
    getComponent(name) {
        return this.components.get(name);
    }

    registerComponent(name, instance) {
        this.components.set(name, instance);
    }

    // Modern replacement for jQuery-like functionality
    static $(selector, context = document) {
        return DOMUtils.$(selector, context);
    }

    static $1(selector, context = document) {
        return DOMUtils.$1(selector, context);
    }

    // Expose DOMUtils for global access
    static get DOMUtils() {
        return DOMUtils;
    }
}

// Initialize app when module loads
const app = new App();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Export for global access
window.ModernApp = app;
export default app;
