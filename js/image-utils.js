/**
 * V5 Medical Image Utilities
 * Handles image path resolution and robust error fallback.
 * @version 2.3.0 (Added data-attribute fallback strategy)
 * @updated 2024-12-16
 */

class ImageUtils {
    constructor() {
        this.config = window.V5Config || { BASE_URL: '', IMAGES: {} };
        this.placeholder = this.config.IMAGES.PLACEHOLDER || 'images/products/default-product.jpg';
    }

    /**
     * Get usable URL
     */
    getImageUrl(path) {
        if (!path) return this.placeholder;
        if (path.startsWith('http')) return path;
        
        // Handle Base URL
        const baseUrl = this.config.BASE_URL ? this.config.BASE_URL.replace(/\/$/, '') : '';
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return baseUrl ? `${baseUrl}/${cleanPath}` : cleanPath;
    }

    /**
     * Robust Error Handler
     * Strategy: 
     * 1. Try GitHub Raw URL using exact path from data-original-src
     * 2. Fallback to placeholder
     */
    handleError(img) {
        img.onerror = null; // Prevent infinite loops
        const currentSrc = img.src;
        const fallbackBase = this.config.IMAGES.FALLBACK_BASE;

        // Stop if we are already on the placeholder to avoid loops
        if (currentSrc.includes('default-product.jpg')) return;

        // STRATEGY 1: Use exact path from data attribute (Most Reliable)
        const originalPath = img.getAttribute('data-original-src');
        
        if (fallbackBase && originalPath && !currentSrc.includes('raw.githubusercontent.com')) {
            const newSrc = `${fallbackBase}${originalPath}`;
            console.warn(`[ImageUtils] Local load failed. Retrying with GitHub: ${newSrc}`);
            img.src = newSrc;
            return;
        }

        // STRATEGY 2: Fallback to Placeholder
        console.warn(`[ImageUtils] All sources failed for ${originalPath || currentSrc}. Showing placeholder.`);
        img.src = this.placeholder;
    }
}

window.imageUtils = new ImageUtils();
