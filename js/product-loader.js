/**
 * Product Loader for V5 Medical Website
 * Simplified product database loading with error handling and retry logic
 * @version 1.0.0
 */

class ProductLoader {
    constructor() {
        this.config = window.V5Config || {};
        this.productDatabase = null;
        this.isLoading = false;
        this.loadPromise = null;
        this.logger = this.createLogger();
        this.performanceData = {
            loadAttempts: 0,
            loadStartTime: null,
            loadEndTime: null,
            loadDuration: null,
            success: false,
            error: null
        };
    }

    /**
     * Load product database with simplified strategy
     * @returns {Promise<Object>} Resolved with product database
     */
    loadProducts() {
        if (this.productDatabase) {
            this.logger.debug('Returning cached product database');
            return Promise.resolve(this.productDatabase);
        }

        if (this.loadPromise) {
            this.logger.debug('Returning existing load promise');
            return this.loadPromise;
        }

        this.performanceData.loadAttempts++;
        this.performanceData.loadStartTime = performance.now();
        this.isLoading = true;

        this.loadPromise = new Promise((resolve, reject) => {
            this.logger.info('Starting product database loading');
            
            // Try to get from window object first
            if (window.productDatabase || window.finalProductDatabase) {
                this.logger.info('Using existing product database from window');
                this.handleSuccess(window.productDatabase || window.finalProductDatabase);
                return resolve(this.productDatabase);
            }

            // Load the main product file
            this.loadProductFile(this.config.PRODUCT_DB.MAIN_FILE)
                .then(database => {
                    this.handleSuccess(database);
                    resolve(database);
                })
                .catch(error => {
                    this.logger.warn(`Main product file failed: ${error.message}, trying fallback`);
                    
                    // Try fallback file
                    this.loadProductFile(this.config.PRODUCT_DB.FALLBACK_FILE)
                        .then(database => {
                            this.handleSuccess(database);
                            resolve(database);
                        })
                        .catch(fallbackError => {
                            this.handleError(fallbackError);
                            reject(fallbackError);
                        });
                });
        });

        return this.loadPromise;
    }

    /**
     * Load product file from URL
     * @param {string} fileName - Product file name
     * @returns {Promise<Object>} Resolved with product database
     */
    loadProductFile(fileName) {
        return new Promise((resolve, reject) => {
            const url = `${this.config.GITHUB_RAW_BASE}${this.config.PATHS.JS}/${fileName}`;
            this.logger.info(`Loading product file: ${url}`);

            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.defer = true;

            const timeoutId = setTimeout(() => {
                this.logger.error(`Product file load timed out: ${url}`);
                script.onerror();
            }, this.config.PRODUCT_DB.TIMEOUT);

            script.onload = () => {
                clearTimeout(timeoutId);
                this.logger.info(`Product file loaded successfully: ${url}`);
                
                // Check if database was loaded
                if (window.productDatabase || window.finalProductDatabase) {
                    resolve(window.productDatabase || window.finalProductDatabase);
                } else {
                    reject(new Error(`Product database not found in ${url}`));
                }
            };

            script.onerror = () => {
                clearTimeout(timeoutId);
                reject(new Error(`Failed to load product file: ${url}`));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Handle successful product database load
     * @param {Object} database - Product database
     */
    handleSuccess(database) {
        this.productDatabase = database;
        this.isLoading = false;
        this.performanceData.success = true;
        this.performanceData.loadEndTime = performance.now();
        this.performanceData.loadDuration = this.performanceData.loadEndTime - this.performanceData.loadStartTime;
        
        this.logger.info(`Product database loaded successfully in ${this.performanceData.loadDuration.toFixed(0)}ms`);
        this.logPerformance();
    }

    /**
     * Handle product database load error
     * @param {Error} error - Error object
     */
    handleError(error) {
        this.isLoading = false;
        this.performanceData.success = false;
        this.performanceData.error = error.message;
        this.performanceData.loadEndTime = performance.now();
        this.performanceData.loadDuration = this.performanceData.loadEndTime - this.performanceData.loadStartTime;
        
        this.logger.error(`Product database load failed: ${error.message}`);
        this.logPerformance();
    }

    /**
     * Get product by ID
     * @param {string} productId - Product ID
     * @returns {Promise<Object>} Resolved with product data
     */
    async getProductById(productId) {
        try {
            const database = await this.loadProducts();
            return database[productId] || null;
        } catch (error) {
            this.logger.error(`Failed to get product ${productId}: ${error.message}`);
            return null;
        }
    }

    /**
     * Get products by category
     * @param {string} category - Product category
     * @returns {Promise<Array>} Resolved with array of products
     */
    async getProductsByCategory(category) {
        try {
            const database = await this.loadProducts();
            return Object.values(database).filter(product => product.category === category);
        } catch (error) {
            this.logger.error(`Failed to get products for category ${category}: ${error.message}`);
            return [];
        }
    }

    /**
     * Log performance data
     */
    logPerformance() {
        this.logger.info('Product load performance:', this.performanceData);
        
        // Track performance event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'product_database_load', {
                event_category: this.config.ANALYTICS.EVENT_CATEGORIES.PERFORMANCE,
                event_label: this.performanceData.success ? 'success' : 'failure',
                value: this.performanceData.loadDuration,
                success: this.performanceData.success,
                attempts: this.performanceData.loadAttempts,
                error: this.performanceData.error
            });
        }
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
            debug: (...args) => levelIndex <= 0 && console.debug('[ProductLoader]', ...args),
            info: (...args) => levelIndex <= 1 && console.info('[ProductLoader]', ...args),
            warn: (...args) => levelIndex <= 2 && console.warn('[ProductLoader]', ...args),
            error: (...args) => levelIndex <= 3 && console.error('[ProductLoader]', ...args)
        };
    }
}

// Initialize and make globally available
const productLoader = new ProductLoader();
window.productLoader = productLoader;

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = productLoader;
}