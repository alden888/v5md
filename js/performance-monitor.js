/**
 * Performance Monitor for V5 Medical Website
 * Tracks and logs performance metrics
 * @version 1.0.0
 */

class PerformanceMonitor {
    constructor() {
        this.config = window.V5Config || {};
        this.metrics = new Map();
        this.logger = this.createLogger();
        this.initTime = performance.now();
        
        // Initialize core metrics
        this.initCoreMetrics();
        
        // Start monitoring
        this.startMonitoring();
    }

    /**
     * Initialize core performance metrics
     */
    initCoreMetrics() {
        this.metrics.set('page_load_start', {
            value: this.initTime,
            description: 'Page load start time'
        });
        
        this.metrics.set('dom_content_loaded', {
            value: null,
            description: 'DOM Content Loaded time'
        });
        
        this.metrics.set('window_load', {
            value: null,
            description: 'Window Load time'
        });
        
        this.metrics.set('first_contentful_paint', {
            value: null,
            description: 'First Contentful Paint'
        });
        
        this.metrics.set('product_database_load', {
            value: null,
            description: 'Product database load time'
        });
        
        this.metrics.set('critical_images_loaded', {
            value: null,
            description: 'Critical images loaded time'
        });
    }

    /**
     * Start performance monitoring
     */
    startMonitoring() {
        this.logger.info('Starting performance monitoring');

        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.setMetric('dom_content_loaded', performance.now());
            this.logger.info('DOM Content Loaded event fired');
        });

        // Window Load
        window.addEventListener('load', () => {
            this.setMetric('window_load', performance.now());
            this.logger.info('Window Load event fired');
            this.logPerformanceSummary();
        });

        // First Contentful Paint using PerformanceObserver
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        this.setMetric('first_contentful_paint', entry.startTime);
                        this.logger.info(`First Contentful Paint: ${entry.startTime.toFixed(0)}ms`);
                    }
                }
            });

            observer.observe({ entryTypes: ['paint'] });
        }

        // Track product database load time
        if (window.productLoader) {
            window.productLoader.loadProducts().then(() => {
                this.setMetric('product_database_load', performance.now());
                this.logger.info('Product database loaded');
            }).catch(error => {
                this.logger.error(`Product database load failed: ${error.message}`);
            });
        }
    }

    /**
     * Set a performance metric
     * @param {string} name - Metric name
     * @param {number} value - Metric value
     * @param {string} description - Metric description
     */
    setMetric(name, value, description = '') {
        this.metrics.set(name, {
            value,
            description: description || this.metrics.get(name)?.description || ''
        });
    }

    /**
     * Get a performance metric
     * @param {string} name - Metric name
     * @returns {number|null} Metric value
     */
    getMetric(name) {
        return this.metrics.get(name)?.value || null;
    }

    /**
     * Calculate metric duration
     * @param {string} startMetric - Start metric name
     * @param {string} endMetric - End metric name
     * @returns {number|null} Duration in milliseconds
     */
    calculateDuration(startMetric, endMetric) {
        const start = this.getMetric(startMetric);
        const end = this.getMetric(endMetric);
        
        if (start && end) {
            return end - start;
        }
        
        return null;
    }

    /**
     * Log performance summary
     */
    logPerformanceSummary() {
        const pageLoadDuration = this.calculateDuration('page_load_start', 'window_load');
        const domContentLoadedDuration = this.calculateDuration('page_load_start', 'dom_content_loaded');
        const productLoadDuration = this.calculateDuration('page_load_start', 'product_database_load');

        const summary = {
            page_load_duration: pageLoadDuration ? `${pageLoadDuration.toFixed(0)}ms` : 'N/A',
            dom_content_loaded: domContentLoadedDuration ? `${domContentLoadedDuration.toFixed(0)}ms` : 'N/A',
            product_database_load: productLoadDuration ? `${productLoadDuration.toFixed(0)}ms` : 'N/A',
            first_contentful_paint: this.getMetric('first_contentful_paint') ? 
                `${this.getMetric('first_contentful_paint').toFixed(0)}ms` : 'N/A'
        };

        this.logger.info('Performance Summary:', summary);

        // Track performance metrics with analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_summary', {
                event_category: this.config.ANALYTICS.EVENT_CATEGORIES.PERFORMANCE,
                page_load_duration: pageLoadDuration,
                dom_content_loaded: domContentLoadedDuration,
                product_database_load: productLoadDuration,
                first_contentful_paint: this.getMetric('first_contentful_paint'),
                page_type: window.seoUtils?.currentPage || 'unknown'
            });
        }
    }

    /**
     * Log custom performance event
     * @param {string} eventName - Event name
     * @param {Object} data - Event data
     */
    logCustomEvent(eventName, data = {}) {
        this.logger.info(`Custom Performance Event: ${eventName}`, data);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: this.config.ANALYTICS.EVENT_CATEGORIES.PERFORMANCE,
                ...data
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
            debug: (...args) => levelIndex <= 0 && console.debug('[PerformanceMonitor]', ...args),
            info: (...args) => levelIndex <= 1 && console.info('[PerformanceMonitor]', ...args),
            warn: (...args) => levelIndex <= 2 && console.warn('[PerformanceMonitor]', ...args),
            error: (...args) => levelIndex <= 3 && console.error('[PerformanceMonitor]', ...args)
        };
    }
}

// Initialize and make globally available
const performanceMonitor = new PerformanceMonitor();
window.performanceMonitor = performanceMonitor;

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = performanceMonitor;
}