/**
 * Legacy Compatibility Layer
 * Provides backward compatibility for any remaining legacy code
 */

import { DOMUtils } from '../utils/DOMUtils.js';

export class LegacyCompat {
    static init() {
        // Provide jQuery-like global functions if needed
        if (typeof window.$ === 'undefined') {
            window.$ = this.createJQueryCompat();
        }

        // Provide BeautifulJekyllJS compatibility
        window.BeautifulJekyllJS = this.createBeautifulJekyllCompat();

        console.log('LegacyCompat: Initialized compatibility layer');
    }

    static createJQueryCompat() {
        const $ = (selector, context) => {
            const elements = DOMUtils.$(selector, context);
            return this.createJQueryLikeObject(elements);
        };

        // Add common jQuery methods to the $ function
        $.fn = {};
        
        return $;
    }

    static createJQueryLikeObject(elements) {
        const obj = {
            length: elements.length,
            [Symbol.iterator]: function* () {
                for (let i = 0; i < elements.length; i++) {
                    yield elements[i];
                }
            }
        };

        // Add array-like indexing
        for (let i = 0; i < elements.length; i++) {
            obj[i] = elements[i];
        }

        // Add common jQuery methods
        obj.addClass = function(className) {
            elements.forEach(el => el.classList.add(className));
            return obj;
        };

        obj.removeClass = function(className) {
            elements.forEach(el => el.classList.remove(className));
            return obj;
        };

        obj.toggleClass = function(className) {
            elements.forEach(el => el.classList.toggle(className));
            return obj;
        };

        obj.hasClass = function(className) {
            return elements.length > 0 && elements[0].classList.contains(className);
        };

        obj.css = function(property, value) {
            if (typeof property === 'object') {
                elements.forEach(el => Object.assign(el.style, property));
            } else if (value !== undefined) {
                elements.forEach(el => el.style[property] = value);
            } else {
                return elements.length > 0 ? getComputedStyle(elements[0])[property] : undefined;
            }
            return obj;
        };

        obj.attr = function(name, value) {
            if (value !== undefined) {
                elements.forEach(el => el.setAttribute(name, value));
                return obj;
            } else {
                return elements.length > 0 ? elements[0].getAttribute(name) : undefined;
            }
        };

        obj.on = function(event, handler) {
            elements.forEach(el => el.addEventListener(event, handler));
            return obj;
        };

        obj.off = function(event, handler) {
            elements.forEach(el => el.removeEventListener(event, handler));
            return obj;
        };

        obj.click = function(handler) {
            if (handler) {
                elements.forEach(el => el.addEventListener('click', handler));
                return obj;
            } else {
                elements.forEach(el => el.click());
                return obj;
            }
        };

        obj.scroll = function(handler) {
            if (handler) {
                if (elements.length === 0 || elements[0] === window) {
                    window.addEventListener('scroll', handler);
                } else {
                    elements.forEach(el => el.addEventListener('scroll', handler));
                }
            }
            return obj;
        };

        obj.offset = function() {
            if (elements.length > 0) {
                const rect = elements[0].getBoundingClientRect();
                return {
                    top: rect.top + window.pageYOffset,
                    left: rect.left + window.pageXOffset
                };
            }
            return undefined;
        };

        obj.show = function() {
            elements.forEach(el => el.style.display = '');
            return obj;
        };

        obj.hide = function() {
            elements.forEach(el => el.style.display = 'none');
            return obj;
        };

        obj.text = function(content) {
            if (content !== undefined) {
                elements.forEach(el => el.textContent = content);
                return obj;
            } else {
                return elements.length > 0 ? elements[0].textContent : '';
            }
        };

        obj.html = function(content) {
            if (content !== undefined) {
                elements.forEach(el => el.innerHTML = content);
                return obj;
            } else {
                return elements.length > 0 ? elements[0].innerHTML : '';
            }
        };

        obj.prepend = function(content) {
            elements.forEach(el => {
                if (typeof content === 'string') {
                    el.insertAdjacentHTML('afterbegin', content);
                } else {
                    el.prepend(content);
                }
            });
            return obj;
        };

        obj.remove = function() {
            elements.forEach(el => el.remove());
            return obj;
        };

        obj.length = elements.length;

        return obj;
    }

    static createBeautifulJekyllCompat() {
        return {
            bigImgEl: null,
            numImgs: null,
            
            init: function() {
                // Modern implementation handles this automatically
                console.log('BeautifulJekyllJS.init() called - handled by modern framework');
            },
            
            initImgs: function() {
                // Modern implementation handles this automatically
                console.log('BeautifulJekyllJS.initImgs() called - handled by modern framework');
            },
            
            getImgInfo: function() {
                // Compatibility stub
                return { src: '', desc: '' };
            },
            
            setImg: function(src, desc) {
                // Compatibility stub
                console.log('BeautifulJekyllJS.setImg() called - handled by modern framework');
            }
        };
    }

    // Global window functions compatibility
    static setupGlobalFunctions() {
        // Ensure window.$ points to our compatibility layer
        if (!window.$) {
            window.$ = this.createJQueryCompat();
        }

        // Add window resize helper
        window.$(window).resize = function(handler) {
            window.addEventListener('resize', handler);
        };

        // Document ready helper
        window.$(document).ready = function(handler) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', handler);
            } else {
                handler();
            }
        };
    }
}

// Auto-initialize
LegacyCompat.init();
LegacyCompat.setupGlobalFunctions();
