/**
 * V5 Medical Image Utilities
 * Handles image path resolution, lazy loading, and robust error fallback.
 * @version 2.0.0
 * @updated 2024-12-16
 */

class ImageUtils {
    constructor() {
        // Dependency Check
        if (!window.V5Config) {
            console.error('[ImageUtils] V5Config not found.');
            this.config = { BASE_URL: '', IMAGES: { FALLBACK_BASE: '' } }; // Empty fallback
        } else {
            this.config = window.V5Config;
        }

        this.placeholder = this._resolveUrl(this.config.IMAGES?.PLACEHOLDER || 'images/products/default-product.jpg');
        this.fallbackBase = this.config.IMAGES?.FALLBACK_BASE || '';
        
        // Logger setup
        this.logger = window.console; 
    }

    /**
     * Get the full usable URL for an image
     * @param {string} path - Relative path (e.g. "products/suture.jpg")
     * @param {string} type - Optional sub-folder (e.g. "products")
     */
    getImageUrl(path, type = null) {
        if (!path) return this.placeholder;
        if (path.startsWith('http')) return path;

        // Clean up path
        let cleanPath = path.startsWith('/') ? path.substring(1) : path;
        
        // Handle Type prefix if provided and not already in path
        if (type && !cleanPath.includes(type)) {
            const typePath = this.config.PATHS?.[type.toUpperCase()] || type;
            cleanPath = `${typePath}/${cleanPath}`;
        }

        // Return primary URL (usually local or CDN based on config)
        return this._resolveUrl(cleanPath);
    }

    /**
     * Global Image Error Handler (Call this from HTML onerror)
     * Implements 3-Level Fallback: Primary -> GitHub Raw -> Placeholder
     * @param {HTMLImageElement} img - The image element
     */
    handleError(img) {
        const currentSrc = img.src;
        
        // Prevent infinite loops
        img.onerror = null;

        // Level 1 Fail -> Try Level 2 (GitHub Raw)
        // Check if we haven't tried fallback yet and if fallback is configured
        if (this.fallbackBase && !currentSrc.includes('raw.githubusercontent.com')) {
            // Extract relative path from current URL
            // This logic assumes standard structure, might need adjustment based on specific deployment
            const urlObj = new URL(currentSrc);
            const relativePath = urlObj.pathname.substring(1); // Remove leading slash
            
            const fallbackUrl = `${this.fallbackBase}${relativePath}`;
            this.logger.warn(`[Image] Load failed, trying fallback: ${fallbackUrl}`);
            img.src = fallbackUrl;
            return;
        }

        // Level 2 Fail -> Try Level 3 (Placeholder)
        if (currentSrc !== this.placeholder) {
            this.logger.warn(`[Image] Fallback failed, showing placeholder.`);
            img.src = this.placeholder;
        }
    }

    /**
     * Initialize Lazy Loading
     */
    initLazyLoad(selector = 'img[loading="lazy"]') {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser native lazy loading - just ensure src is set
            document.querySelectorAll(selector).forEach(img => {
                if (img.dataset.src) {
                    img.src = this.getImageUrl(img.dataset.src);
                }
            });
        } else {
            // Polyfill or simple load for older browsers
            this._loadImagesImmediately(selector);
        }
    }

    // --- Private Helpers ---

    _resolveUrl(path) {
        if (path.startsWith('http')) return path;
        
        const baseUrl = this.config.BASE_URL || '';
        // Ensure no double slashes between base and path
        const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        
        return cleanBase ? `${cleanBase}/${cleanPath}` : cleanPath;
    }

    _loadImagesImmediately(selector) {
        document.querySelectorAll(selector).forEach(img => {
            if (img.dataset.src) img.src = this.getImageUrl(img.dataset.src);
        });
    }
}

// Initialize and Expose
window.imageUtils = new ImageUtils();

// Export
if (typeof module !== 'undefined') {
    module.exports = window.imageUtils;
}
