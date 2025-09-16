/**
 * Simple Component Loader - Works with file:// protocol
 * Loads components using XMLHttpRequest for better compatibility
 */

function loadComponents() {
    console.log('Simple Component Loader: Starting...');
    
    // Get base path
    const path = window.location.pathname;
    let basePath = './';
    if (path.includes('/pages/about/') || path.includes('/pages/projects/')) {
        basePath = '../../';
    }
    console.log('Base path:', basePath);
    
    // Find all component elements
    const componentElements = document.querySelectorAll('[data-component]');
    console.log('Found components:', componentElements.length);
    
    let loadedCount = 0;
    const totalComponents = componentElements.length;
    
    componentElements.forEach((element, index) => {
        const componentName = element.getAttribute('data-component');
        const componentUrl = basePath + 'components/' + componentName + '.html';
        
        console.log(`Loading component ${index + 1}/${totalComponents}: ${componentName} from ${componentUrl}`);
        
        // Use XMLHttpRequest for better compatibility with file:// protocol
        const xhr = new XMLHttpRequest();
        xhr.open('GET', componentUrl, true);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) { // status 0 for file:// protocol
                    let html = xhr.responseText;
                    
                    // Replace placeholders with actual values
                    html = html.replace(/{WORKS_LINK}/g, basePath + 'index.html');
                    html = html.replace(/{NEWS_LINK}/g, basePath + 'News.html');
                    html = html.replace(/{ABOUT_LINK}/g, basePath + 'pages/about/AboutMe.html');
                    html = html.replace(/{CONTACTS_LINK}/g, basePath + 'pages/about/Contacts.html');
                    html = html.replace(/{AVATAR_PATH}/g, basePath + 'assets/images/badge.jpg');
                    html = html.replace(/{HEADER_CLASSES}/g, '');
                    html = html.replace(/{HEADER_CONTENT}/g, '');
                    
                    element.innerHTML = html;
                    console.log(`Successfully loaded component: ${componentName}`);
                    
                    loadedCount++;
                    if (loadedCount === totalComponents) {
                        console.log('All components loaded successfully!');
                        // Initialize any scripts that depend on the loaded components
                        if (typeof initializeNavbarScripts === 'function') {
                            initializeNavbarScripts();
                        }
                    }
                } else {
                    console.error(`Failed to load component ${componentName}: HTTP ${xhr.status}`);
                    element.innerHTML = `<!-- Failed to load ${componentName} component -->`;
                    loadedCount++;
                }
            }
        };
        
        xhr.onerror = function() {
            console.error(`Network error loading component: ${componentName}`);
            element.innerHTML = `<!-- Network error loading ${componentName} component -->`;
            loadedCount++;
        };
        
        xhr.send();
    });
    
    if (totalComponents === 0) {
        console.log('No components found to load');
    }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
