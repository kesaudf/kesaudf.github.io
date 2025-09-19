/**
 * Modern DOM Utilities - Replaces jQuery helper functions
 */

export class DOMUtils {
    // Modern querySelector shortcuts
    static $(selector, context = document) {
        return context.querySelectorAll(selector);
    }

    static $1(selector, context = document) {
        return context.querySelector(selector);
    }

    // Event handling utilities
    static on(element, event, handler, options = {}) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            element.addEventListener(event, handler, options);
        }
    }

    static off(element, event, handler) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            element.removeEventListener(event, handler);
        }
    }

    static delegate(container, selector, event, handler) {
        if (typeof container === 'string') {
            container = this.$1(container);
        }
        if (container) {
            container.addEventListener(event, (e) => {
                if (e.target.matches(selector) || e.target.closest(selector)) {
                    handler.call(e.target, e);
                }
            });
        }
    }

    // Class manipulation
    static addClass(element, className) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            element.classList.add(className);
        }
    }

    static removeClass(element, className) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            element.classList.remove(className);
        }
    }

    static toggleClass(element, className) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            element.classList.toggle(className);
        }
    }

    static hasClass(element, className) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        return element ? element.classList.contains(className) : false;
    }

    // Style manipulation
    static css(element, styles) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            if (typeof styles === 'string') {
                return getComputedStyle(element).getPropertyValue(styles);
            } else {
                Object.assign(element.style, styles);
            }
        }
    }

    // Attribute manipulation
    static attr(element, name, value) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            if (value === undefined) {
                return element.getAttribute(name);
            } else {
                element.setAttribute(name, value);
            }
        }
    }

    static removeAttr(element, name) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            element.removeAttribute(name);
        }
    }

    // Content manipulation
    static html(element, content) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            if (content === undefined) {
                return element.innerHTML;
            } else {
                element.innerHTML = content;
            }
        }
    }

    static text(element, content) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            if (content === undefined) {
                return element.textContent;
            } else {
                element.textContent = content;
            }
        }
    }

    // Visibility and display
    static show(element) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            element.style.display = '';
        }
    }

    static hide(element) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            element.style.display = 'none';
        }
    }

    static isVisible(element) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        return element ? element.offsetParent !== null : false;
    }

    // Animation utilities
    static fadeIn(element, duration = 300) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            element.style.opacity = '0';
            element.style.display = '';
            element.style.transition = `opacity ${duration}ms ease`;
            
            requestAnimationFrame(() => {
                element.style.opacity = '1';
            });
        }
    }

    static fadeOut(element, duration = 300) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.display = 'none';
            }, duration);
        }
    }

    // Position and dimensions
    static offset(element) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.top + window.pageYOffset,
                left: rect.left + window.pageXOffset,
                width: rect.width,
                height: rect.height
            };
        }
        return null;
    }

    static position(element) {
        if (typeof element === 'string') {
            element = this.$1(element);
        }
        if (element) {
            return {
                top: element.offsetTop,
                left: element.offsetLeft,
                width: element.offsetWidth,
                height: element.offsetHeight
            };
        }
        return null;
    }

    // Window and document utilities
    static scrollTop(value) {
        if (value !== undefined) {
            window.scrollTo(0, value);
        } else {
            return window.pageYOffset || document.documentElement.scrollTop;
        }
    }

    static windowHeight() {
        return window.innerHeight;
    }

    static windowWidth() {
        return window.innerWidth;
    }

    static documentHeight() {
        return Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
    }

    // Utility functions
    static ready(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    static debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    static throttle(func, delay) {
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            }
        };
    }
}

// Export individual functions for convenience
export const { $, $1, on, off, delegate, addClass, removeClass, toggleClass, hasClass, css, attr, removeAttr, html, text, show, hide, isVisible, fadeIn, fadeOut, offset, position, scrollTop, windowHeight, windowWidth, documentHeight, ready, debounce, throttle } = DOMUtils;
