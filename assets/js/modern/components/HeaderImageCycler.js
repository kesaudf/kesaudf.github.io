/**
 * Modern Header Image Cycler - Replaces BeautifulJekyllJS image cycling
 */

export class HeaderImageCycler {
    constructor() {
        this.bigImgEl = null;
        this.numImgs = 0;
        this.currentImg = 0;
        this.cycleTimer = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        this.bigImgEl = document.querySelector("#header-big-imgs");
        if (!this.bigImgEl) {
            console.log('HeaderImageCycler: No header images found');
            return;
        }

        this.numImgs = parseInt(this.bigImgEl.getAttribute("data-num-img")) || 0;
        if (this.numImgs <= 0) {
            console.log('HeaderImageCycler: No images to cycle');
            return;
        }

        console.log(`HeaderImageCycler: Initializing with ${this.numImgs} images`);
        
        // Set initial image
        this.setInitialImage();
        
        // Start cycling if multiple images
        if (this.numImgs > 1) {
            this.startCycling();
        }

        this.isInitialized = true;
    }

    setInitialImage() {
        const imgInfo = this.getImageInfo();
        this.setImage(imgInfo.src, imgInfo.desc);
        this.preloadNextImage();
    }

    getImageInfo(imageIndex = null) {
        const index = imageIndex !== null ? imageIndex : Math.floor(Math.random() * this.numImgs) + 1;
        const src = this.bigImgEl.getAttribute(`data-img-src-${index}`);
        const desc = this.bigImgEl.getAttribute(`data-img-desc-${index}`);
        
        return { src, desc, index };
    }

    setImage(src, desc) {
        const headerEl = document.querySelector(".intro-header.big-img");
        if (headerEl) {
            headerEl.style.backgroundImage = `url(${src})`;
        }

        const descEl = document.querySelector(".img-desc");
        if (descEl) {
            if (desc && desc !== 'false') {
                descEl.textContent = desc;
                descEl.style.display = 'block';
            } else {
                descEl.style.display = 'none';
            }
        }
    }

    preloadNextImage() {
        if (this.numImgs <= 1) return;

        const nextIndex = (this.currentImg % this.numImgs) + 1;
        const imgInfo = this.getImageInfo(nextIndex);
        
        if (imgInfo.src) {
            const img = new Image();
            img.src = imgInfo.src;
            // Preloading happens in background
        }
    }

    startCycling() {
        this.cycleTimer = setInterval(() => {
            this.cycleToNextImage();
        }, 6000); // 6 second interval
    }

    cycleToNextImage() {
        this.currentImg = (this.currentImg % this.numImgs) + 1;
        const imgInfo = this.getImageInfo(this.currentImg);
        
        if (imgInfo.src) {
            this.transitionToImage(imgInfo.src, imgInfo.desc);
            this.preloadNextImage();
        }
    }

    transitionToImage(src, desc) {
        const headerEl = document.querySelector(".intro-header.big-img");
        if (!headerEl) return;

        // Create transition element
        const transitionEl = document.createElement('div');
        transitionEl.className = 'big-img-transition';
        transitionEl.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url(${src});
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 1s ease;
            z-index: -1;
        `;

        headerEl.style.position = 'relative';
        headerEl.prepend(transitionEl);

        // Trigger fade in
        requestAnimationFrame(() => {
            transitionEl.style.opacity = '1';
        });

        // Complete transition
        setTimeout(() => {
            this.setImage(src, desc);
            transitionEl.remove();
        }, 1000);
    }

    stop() {
        if (this.cycleTimer) {
            clearInterval(this.cycleTimer);
            this.cycleTimer = null;
        }
    }

    start() {
        if (this.numImgs > 1 && !this.cycleTimer) {
            this.startCycling();
        }
    }

    destroy() {
        this.stop();
        this.isInitialized = false;
    }
}
