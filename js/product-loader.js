/**
 * Universal Product Loader for V5 Medical
 * Handles product loading from multiple sources
 * @version 1.0.0
 */

class ProductLoader {
    constructor() {
        this.products = null;
        this.loading = false;
    }

    async loadProducts() {
        if (this.products) {
            return this.products;
        }

        this.loading = true;
        console.log('[ProductLoader] Loading products...');

        try {
            // First try to load from complete database
            if (window.completeProductDatabase) {
                this.products = window.completeProductDatabase;
                console.log('[ProductLoader] Loaded from completeProductDatabase');
            } 
            // Then try productDatabase
            else if (window.productDatabase) {
                this.products = window.productDatabase;
                console.log('[ProductLoader] Loaded from productDatabase');
            }
            // Finally, try to load from external file
            else {
                await this.loadExternalDatabase();
            }

            if (!this.products) {
                throw new Error('No product database found');
            }

            console.log(`[ProductLoader] Loaded ${this.products.products.length} products`);
            return this.products;
        } catch (error) {
            console.error('[ProductLoader] Error loading products:', error);
            return null;
        } finally {
            this.loading = false;
        }
    }

    async loadExternalDatabase() {
        return new Promise((resolve, reject) => {
            // Try to load complete products first
            const script = document.createElement('script');
            script.src = 'js/complete-products.js';
            script.onload = () => {
                if (window.completeProductDatabase) {
                    this.products = window.completeProductDatabase;
                    resolve(this.products);
                } else {
                    reject(new Error('External database not loaded'));
                }
            };
            script.onerror = () => {
                reject(new Error('Failed to load external database'));
            };
            document.head.appendChild(script);
        });
    }

    getProductById(productId) {
        if (!this.products) {
            console.warn('[ProductLoader] Products not loaded yet');
            return null;
        }

        const product = this.products.byId[productId] || 
                       this.products.products.find(p => p.id === productId);
        
        if (!product) {
            console.warn(`[ProductLoader] Product not found: ${productId}`);
        }
        
        return product;
    }

    getProductsByCategory(category) {
        if (!this.products) {
            console.warn('[ProductLoader] Products not loaded yet');
            return [];
        }

        return this.products.products.filter(p => p.category === category);
    }

    getAllCategories() {
        if (!this.products) {
            console.warn('[ProductLoader] Products not loaded yet');
            return {};
        }

        return this.products.categories;
    }
}

// Initialize global product loader
window.productLoader = new ProductLoader();