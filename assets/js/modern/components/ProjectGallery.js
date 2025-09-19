/**
 * Modern Project Gallery Component
 * Handles project thumbnail display and interactions
 */

export class ProjectGallery {
    constructor(container) {
        this.container = container;
        this.projects = [];
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        this.loadProjects();
        this.setupLazyLoading();
        this.setupInteractions();
        this.isInitialized = true;
        
        console.log('ProjectGallery: Initialized with', this.projects.length, 'projects');
    }

    loadProjects() {
        const projectElements = this.container.querySelectorAll('.project');
        
        this.projects = Array.from(projectElements).map((element, index) => {
            const img = element.querySelector('img');
            const href = element.getAttribute('href');
            
            return {
                id: index,
                element,
                img,
                href,
                title: this.extractProjectTitle(href),
                loaded: false
            };
        });
    }

    extractProjectTitle(href) {
        if (!href) return 'Unknown Project';
        
        const filename = href.split('/').pop();
        const name = filename.replace('.html', '');
        
        // Convert filename to readable title
        const titleMap = {
            'revit': 'Revit',
            'autocad': 'AutoCAD',
            'bim360': 'BIM 360',
            'Inventor': 'Inventor',
            'Unity': 'Unity',
            'Unreal': 'Unreal Engine',
            'DesktopApps': 'Desktop Applications',
            'GoogleDrive': 'Google Drive',
            'Word': 'Word',
            'PDF': 'PDF',
            'UWP': 'UWP',
            'Android': 'Android',
            'AspNetCore': 'ASP.NET Core'
        };
        
        return titleMap[name] || name;
    }

    setupLazyLoading() {
        // Use Intersection Observer for modern lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            this.projects.forEach(project => {
                if (project.img) {
                    imageObserver.observe(project.img);
                }
            });
        } else {
            // Fallback for older browsers
            this.projects.forEach(project => {
                if (project.img) {
                    this.loadImage(project.img);
                }
            });
        }
    }

    loadImage(img) {
        if (!img.dataset.src && img.src) {
            // Image already has src, just add loading class
            img.classList.add('loaded');
            return;
        }

        const src = img.dataset.src || img.src;
        if (!src) return;

        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.style.opacity = '1';
            img.classList.add('loaded');
        };
        tempImg.onerror = () => {
            img.classList.add('error');
            console.warn('ProjectGallery: Failed to load image:', src);
        };
        tempImg.src = src;
    }

    setupInteractions() {
        this.projects.forEach(project => {
            this.setupProjectInteractions(project);
        });
    }

    setupProjectInteractions(project) {
        const { element, img } = project;
        
        // Add hover effects
        element.addEventListener('mouseenter', () => {
            this.onProjectHover(project, true);
        });
        
        element.addEventListener('mouseleave', () => {
            this.onProjectHover(project, false);
        });
        
        // Add click analytics
        element.addEventListener('click', (event) => {
            this.onProjectClick(project, event);
        });
        
        // Add keyboard navigation
        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                element.click();
            }
        });

        // Ensure proper accessibility
        if (!element.getAttribute('aria-label')) {
            element.setAttribute('aria-label', `View ${project.title} project`);
        }
    }

    onProjectHover(project, isHovering) {
        const { element, img } = project;
        
        if (isHovering) {
            element.classList.add('project-hover');
            if (img) {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease';
            }
        } else {
            element.classList.remove('project-hover');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        }
    }

    onProjectClick(project, event) {
        console.log('ProjectGallery: Project clicked:', project.title);
        
        // Add analytics tracking here if needed
        this.trackProjectClick(project);
        
        // Add loading state
        project.element.classList.add('project-loading');
    }

    trackProjectClick(project) {
        // Modern analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'project_click', {
                'project_name': project.title,
                'project_url': project.href
            });
        }
        
        // Custom analytics can be added here
        document.dispatchEvent(new CustomEvent('project:click', {
            detail: { project }
        }));
    }

    // Public methods for external control
    getProjects() {
        return this.projects;
    }

    getProject(id) {
        return this.projects.find(p => p.id === id);
    }

    refreshGallery() {
        this.loadProjects();
        this.setupLazyLoading();
        this.setupInteractions();
    }

    // Filter projects (for future search functionality)
    filterProjects(filterFn) {
        this.projects.forEach(project => {
            const shouldShow = filterFn(project);
            project.element.style.display = shouldShow ? '' : 'none';
        });
    }

    showAllProjects() {
        this.projects.forEach(project => {
            project.element.style.display = '';
        });
    }
}
