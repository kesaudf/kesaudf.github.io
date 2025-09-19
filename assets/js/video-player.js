/**
 * Modern Video Player Initialization using Video.js
 * Lightweight replacement for JW Player with excellent fullscreen support
 * Author: AZ
 * Version: 2.1 - Added JWPlayer compatibility
 */

/**
 * JWPlayer compatibility function with lazy loading support
 * @param {string} containerId - The ID of the container element
 * @returns {Object} - Object with setup method for JWPlayer compatibility
 */
function jwplayer(containerId) {
    return {
        setup: function(options) {
            // Check if lazy loading is enabled and if the container is inside a closed <details> element
            const container = document.getElementById(containerId);
            if (container) {
                const detailsParent = container.closest('details');
                
                // If inside a closed <details> element, defer loading
                if (detailsParent && !detailsParent.open) {
                    // Store the setup options for later use
                    container.setAttribute('data-lazy-video-options', JSON.stringify(options));
                    container.innerHTML = 'Video will load when expanded...';
                    
                    // Set up the listener if not already set
                    if (!detailsParent.hasAttribute('data-lazy-listener')) {
                        detailsParent.setAttribute('data-lazy-listener', 'true');
                        detailsParent.addEventListener('toggle', function() {
                            if (this.open) {
                                const lazyContainers = this.querySelectorAll('[data-lazy-video-options]');
                                lazyContainers.forEach(lazyContainer => {
                                    console.log('Loading lazy video player:', lazyContainer.id);
                                    lazyContainer.innerHTML = 'Loading player...';
                                    const lazyOptions = JSON.parse(lazyContainer.getAttribute('data-lazy-video-options'));
                                    lazyContainer.removeAttribute('data-lazy-video-options');
                                    setupVideoPlayerImmediate(lazyContainer.id, lazyOptions);
                                });
                            }
                        });
                    }
                    return;
                }
            }
            
            // Immediate setup for containers not in closed <details> elements
            setupVideoPlayerImmediate(containerId, options);
        }
    };
}

/**
 * Immediate video player setup (extracted from original logic)
 */
function setupVideoPlayerImmediate(containerId, options) {
    // Fix relative paths for project pages
    if (options.file && !options.file.startsWith('http') && !options.file.startsWith('/')) {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/projects/') || currentPath.includes('/pages/about/')) {
            if (!options.file.startsWith('../../')) {
                options.file = '../../' + options.file;
            }
        }
    }
    
    // Call the actual video player setup
    setTimeout(() => setupVideoPlayer(containerId, options), 100);
}

/**
 * Function to setup a video player (replacement for jwplayer().setup())
 * @param {string} containerId - The ID of the container element
 * @param {Object} options - Video options (file, width, height, title)
 */
function setupVideoPlayer(containerId, options) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Video container not found:', containerId);
        return;
    }
    
    console.log('Setting up video player for:', containerId, 'with file:', options.file);
    
    // Check if Video.js is available, wait if not
    if (typeof videojs === 'undefined') {
        console.log('Video.js not ready yet for:', containerId, '- waiting...');
        container.innerHTML = 'Loading Video.js library...';
        setTimeout(() => setupVideoPlayer(containerId, options), 200);
        return;
    }

    // Create video element with Video.js classes
    const videoElement = document.createElement('video');
    videoElement.id = containerId + '_video';
    videoElement.className = 'video-js vjs-default-skin';
    videoElement.setAttribute('controls', '');
    videoElement.setAttribute('preload', 'auto');
    videoElement.setAttribute('data-setup', '{}');
    
    // Set dimensions
    const width = options.width || 400;
    const height = options.height || 240;
    videoElement.setAttribute('width', width);
    videoElement.setAttribute('height', height);
    
    // Add poster if provided
    if (options.image) {
        videoElement.setAttribute('poster', options.image);
    }
    
    // Add source
    if (options.file) {
        const source = document.createElement('source');
        source.src = options.file;
        source.type = 'video/mp4';
        videoElement.appendChild(source);
        
        // Fallback message
        const fallback = document.createElement('p');
        fallback.className = 'vjs-no-js';
        fallback.innerHTML = 'To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>.';
        videoElement.appendChild(fallback);
    }
    
    // Clear container and add video
    container.innerHTML = '';
    container.appendChild(videoElement);
    
    // Add title if provided
    if (options.title) {
        const titleElement = document.createElement('div');
        titleElement.className = 'video-title';
        titleElement.textContent = options.title;
        titleElement.style.cssText = 'font-size: 14px; color: #666; margin-top: 5px; text-align: center; font-family: Arial, sans-serif;';
        container.appendChild(titleElement);
    }
    
    // Initialize Video.js player immediately (we already checked videojs is available)
    const initializePlayer = () => {
        
        // Video.js configuration with enhanced fullscreen support
        const vjsConfig = {
            fluid: true, // Makes video responsive
            responsive: true,
            playbackRates: [0.5, 1, 1.25, 1.5, 2], // Speed control
            controls: true,
            preload: 'auto',
            techOrder: ['html5'], // Use HTML5 tech for better fullscreen support
            html5: {
                vhs: {
                    overrideNative: true
                }
            },
            userActions: {
                hotkeys: true // Enable keyboard shortcuts
            }
        };
        
        // Initialize Video.js player
        console.log('Initializing Video.js player for:', containerId);
        let player;
        try {
            player = videojs(videoElement.id, vjsConfig);
            console.log('Video.js player initialized successfully for:', containerId);
        } catch (error) {
            console.error('Error initializing Video.js player for:', containerId, error);
            container.innerHTML = `<div style="color: red;">Error loading video player: ${error.message}</div>`;
            return;
        }
        
        // Enhanced fullscreen handling
        player.ready(() => {
            // Add custom fullscreen button behavior
            player.on('fullscreenchange', () => {
                if (player.isFullscreen()) {
                    // Ensure video fills the entire screen
                    player.el().style.width = '100vw';
                    player.el().style.height = '100vh';
                } else {
                    // Reset to normal size
                    player.el().style.width = '';
                    player.el().style.height = '';
                }
            });
            
            // Add double-click to fullscreen
            player.on('dblclick', () => {
                if (player.isFullscreen()) {
                    player.exitFullscreen();
                } else {
                    player.requestFullscreen();
                }
            });
            
            // Ensure proper fullscreen API usage
            player.on('loadedmetadata', () => {
                // Force fullscreen to use the entire viewport
                if (player.tech_) {
                    const tech = player.tech_;
                    if (tech.el_) {
                        tech.el_.style.objectFit = 'contain';
                    }
                }
            });
        });
        
        // Store player reference
        window[containerId + '_player'] = player;
        
        return player;
    };
    
    // Initialize the player
    return initializePlayer();
}

// Note: jwplayer function is defined above with lazy loading support

// Make jwplayer function available globally for backward compatibility
window.jwplayer = jwplayer;
window.setupVideoPlayer = setupVideoPlayer;
