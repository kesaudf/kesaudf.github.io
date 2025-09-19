/**
 * Bootstrap Bridge - Handles Bootstrap components without jQuery
 * Provides modern alternatives to Bootstrap's jQuery dependencies
 */

export class BootstrapBridge {
    constructor() {
        this.collapseInstances = new Map();
    }

    init() {
        this.initializeCollapseComponents();
        console.log('BootstrapBridge: Initialized');
    }

    initializeCollapseComponents() {
        const collapseElements = document.querySelectorAll('[data-bs-toggle="collapse"], [data-toggle="collapse"]');
        
        collapseElements.forEach(trigger => {
            this.initializeCollapse(trigger);
        });
    }

    initializeCollapse(trigger) {
        const targetSelector = trigger.getAttribute('data-bs-target') || trigger.getAttribute('data-target');
        const target = document.querySelector(targetSelector);
        
        if (!target) return;

        const collapseInstance = new ModernCollapse(target, trigger);
        this.collapseInstances.set(target, collapseInstance);

        // Handle trigger click
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            collapseInstance.toggle();
        });
    }

    getCollapseInstance(element) {
        return this.collapseInstances.get(element);
    }
}

/**
 * Modern Collapse Component - Replaces Bootstrap's jQuery collapse
 */
class ModernCollapse {
    constructor(element, trigger) {
        this.element = element;
        this.trigger = trigger;
        this.isShown = element.classList.contains('show');
        this.isTransitioning = false;
        
        this.setupTransitions();
    }

    setupTransitions() {
        this.element.style.transition = 'height 0.35s ease';
        this.element.style.overflow = 'hidden';
    }

    show() {
        if (this.isShown || this.isTransitioning) return;

        this.isTransitioning = true;
        
        // Dispatch show event
        this.dispatchEvent('show.bs.collapse');
        
        // Set initial height
        this.element.style.height = '0px';
        this.element.classList.add('collapsing');
        this.element.classList.remove('collapse');
        
        // Force reflow
        this.element.offsetHeight;
        
        // Get target height
        const scrollHeight = this.element.scrollHeight;
        this.element.style.height = scrollHeight + 'px';
        
        // Update trigger state
        this.trigger.setAttribute('aria-expanded', 'true');
        this.trigger.classList.remove('collapsed');
        
        // Handle transition end
        const handleTransitionEnd = () => {
            this.element.classList.remove('collapsing');
            this.element.classList.add('collapse', 'show');
            this.element.style.height = '';
            this.isTransitioning = false;
            this.isShown = true;
            
            this.dispatchEvent('shown.bs.collapse');
            this.element.removeEventListener('transitionend', handleTransitionEnd);
        };
        
        this.element.addEventListener('transitionend', handleTransitionEnd);
    }

    hide() {
        if (!this.isShown || this.isTransitioning) return;

        this.isTransitioning = true;
        
        // Dispatch hide event
        this.dispatchEvent('hide.bs.collapse');
        
        // Set current height
        this.element.style.height = this.element.scrollHeight + 'px';
        
        // Force reflow
        this.element.offsetHeight;
        
        this.element.classList.add('collapsing');
        this.element.classList.remove('collapse', 'show');
        this.element.style.height = '0px';
        
        // Update trigger state
        this.trigger.setAttribute('aria-expanded', 'false');
        this.trigger.classList.add('collapsed');
        
        // Handle transition end
        const handleTransitionEnd = () => {
            this.element.classList.remove('collapsing');
            this.element.classList.add('collapse');
            this.element.style.height = '';
            this.isTransitioning = false;
            this.isShown = false;
            
            this.dispatchEvent('hidden.bs.collapse');
            this.element.removeEventListener('transitionend', handleTransitionEnd);
        };
        
        this.element.addEventListener('transitionend', handleTransitionEnd);
    }

    toggle() {
        if (this.isShown) {
            this.hide();
        } else {
            this.show();
        }
    }

    dispatchEvent(eventType) {
        const event = new CustomEvent(eventType, {
            bubbles: true,
            cancelable: true,
            detail: { target: this.element }
        });
        this.element.dispatchEvent(event);
    }
}

// Export for global use
export { ModernCollapse };
