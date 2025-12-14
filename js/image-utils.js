/**
 * Image Utilities for V5 Medical Website
 * Handles image path management, preloading, error handling, and optimization
 * @version 1.0.0
 */

class ImageUtils {
    constructor() {
        this.config = window.V5Config || {};
        this.placeholderImage = this.getPlaceholderImage();
        this.loadedImages = new Map();
        this.preloadQueue = [];
        this.logger = this.createLogger();
    }

    /**
     * Get the full URL for an image
     * @param {string} imagePath - Relative or absolute image path
     * @param {string} category - Optional category folder
     * @returns {string} Full image URL
     */
    getImageUrl(imagePath, category = '') {
        if (!imagePath) return this.placeholderImage;
        
        // If already a full URL, use it
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        
        // If starts with /, it's relative to root
        if (imagePath.startsWith('/')) {
            return `${this.config.GITHUB_RAW_BASE}${imagePath}`;
        }
        
        // If category is provided, build path with category
        if (category) {
            return `${this.config.GITHUB_RAW_BASE}${this.config.PATHS.PRODUCTS}/${category}/${imagePath}`;
        }
        
        // Check if it's a product image (contains products/)
        if (imagePath.includes('products/')) {
            return `${this.config.GITHUB_RAW_BASE}/${imagePath}`;
        }
        
        // Default to images folder
        return `${this.config.GITHUB_RAW_BASE}${this.config.PATHS.IMAGES}/${imagePath}`;
    }

    /**
     * Get placeholder image URL
     * @returns {string} Placeholder image URL
     */
    getPlaceholderImage() {
        return this.getImageUrl(this.config.IMAGES.PLACEHOLDER);
    }

    /**
     * Preload an image with error handling
     * @param {string} imageUrl - Image URL to preload
     * @param {Object} options - Preload options
     * @returns {Promise<string>} Resolved with valid image URL
     */
    preloadImage(imageUrl, options = {}) {
        const { timeout = 5000, retry = 1 } = options;
        
        return new Promise((resolve) => {
            // If already loaded, return immediately
            if (this.loadedImages.has(imageUrl)) {
                return resolve(this.loadedImages.get(imageUrl));
            }
            
            const startTime = performance.now();
            const img = new Image();
            let retryCount = 0;
            
            const loadHandler = () => {
                const loadTime = performance.now() - startTime;
                this.loadedImages.set(imageUrl, imageUrl);
                this.logger.info(`Image loaded: ${imageUrl} (${loadTime.toFixed(0)}ms)`);
                resolve(imageUrl);
            };
            
            const errorHandler = () => {
                this.logger.warn(`Image failed to load: ${imageUrl}`);
                if (retryCount < retry) {
                    retryCount++;
                    this.logger.info(`Retrying image load (${retryCount}/${retry}): ${imageUrl}`);
                    setTimeout(() => img.src = imageUrl, 500 * retryCount);
                } else {
                    this.loadedImages.set(imageUrl, this.placeholderImage);
                    resolve(this.placeholderImage);
                }
            };
            
            img.onload = loadHandler;
            img.onerror = errorHandler;
            img.src = imageUrl;
            
            // Timeout handling
            setTimeout(() => {
                if (!this.loadedImages.has(imageUrl)) {
                    this.logger.warn(`Image load timed out: ${imageUrl}`);
                    errorHandler();
                }
            }, timeout);
        });
    }

    /**
     * Preload multiple images in parallel
     * @param {Array<string>} imageUrls - Array of image URLs
     * @param {Object} options - Preload options
     * @returns {Promise<Array<string>>} Resolved with array of valid image URLs
     */
    preloadImages(imageUrls, options = {}) {
        return Promise.all(imageUrls.map(url => this.preloadImage(url, options)));
    }

    /**
     * Create lazy loading observer
     * @param {string} selector - CSS selector for lazy images
     */
    initLazyLoading(selector = 'img[data-src]') {
        if (!('IntersectionObserver' in window)) {
            this.logger.warn('IntersectionObserver not supported, falling back to immediate loading');
            this.loadAllLazyImages(selector);
            return;
        }

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        this.preloadImage(src).then(validUrl => {
                            img.src = validUrl;
                            img.removeAttribute('data-src');
                            this.logger.info(`Lazy loaded image: ${validUrl}`);
                        });
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '200px 0px',
            threshold: 0.01
        });

        document.querySelectorAll(selector).forEach(img => {
            observer.observe(img);
        });
    }

    /**
     * Load all lazy images immediately (fallback)
     * @param {string} selector - CSS selector for lazy images
     */
    loadAllLazyImages(selector = 'img[data-src]') {
        document.querySelectorAll(selector).forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                this.preloadImage(src).then(validUrl => {
                    img.src = validUrl;
                    img.removeAttribute('data-src');
                });
            }
        });
    }

    /**
     * Create logger instance
     * @returns {Object} Logger object
     */
    createLogger() {
        const logLevel = this.config.PERFORMANCE?.LOG_LEVEL || 'info';
        const levels = ['debug', 'info', 'warn', 'error'];
        const levelIndex = levels.indexOf(logLevel);

        return {
            debug: (...args) => levelIndex <= 0 && console.debug('[ImageUtils]', ...args),
            info: (...args) => levelIndex <= 1 && console.info('[ImageUtils]', ...args),
            warn: (...args) => levelIndex <= 2 && console.warn('[ImageUtils]', ...args),
            error: (...args) => levelIndex <= 3 && console.error('[ImageUtils]', ...args)
        };
    }
}

// Initialize and make globally available
const imageUtils = new ImageUtils();
window.imageUtils = imageUtils;

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = imageUtils;
}