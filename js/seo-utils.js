/**
 * SEO Utilities for V5 Medical Website
 * Handles meta tags, structured data, and search engine optimization
 * @version 1.0.0
 */

class SEOUtils {
    constructor() {
        this.config = window.V5Config || {};
        this.currentPage = this.detectCurrentPage();
        this.logger = this.createLogger();
        this.schemaScripts = new Map();
    }

    /**
     * Detect current page from URL
     * @returns {string} Page identifier
     */
    detectCurrentPage() {
        const pathname = window.location.pathname;
        if (pathname.includes('product-detail')) return 'product';
        if (pathname.includes('catalog')) return 'catalog';
        if (pathname.includes('about')) return 'about';
        if (pathname.includes('contact')) return 'contact';
        if (pathname.includes('blog')) return 'blog';
        return 'home';
    }

    /**
     * Update meta tags for current page
     * @param {Object} options - SEO options
     */
    updateMetaTags(options = {}) {
        const {
            title = this.config.SEO.DEFAULT_TITLE,
            description = this.config.SEO.DEFAULT_DESCRIPTION,
            keywords = this.config.SEO.DEFAULT_KEYWORDS,
            image = this.config.SEO.DEFAULT_IMAGE,
            url = this.config.SEO.CANONICAL_URL + window.location.pathname
        } = options;

        this.logger.info(`Updating meta tags for: ${title}`);

        // Basic meta tags
        this.updateElementContent('meta-title', title);
        this.updateMetaContent('meta-description', description);
        this.updateMetaContent('meta-keywords', keywords);
        
        // Canonical URL
        this.updateElementAttribute('canonical-link', 'href', url);

        // Open Graph tags
        this.updateMetaProperty('og-title', title);
        this.updateMetaProperty('og-description', description);
        this.updateMetaProperty('og-image', image);
        this.updateMetaProperty('og-url', url);

        // Twitter Card tags
        this.updateMetaName('twitter-title', title);
        this.updateMetaName('twitter-description', description);
        this.updateMetaName('twitter-image', image);

        // Track SEO event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'seo_update', {
                event_category: 'SEO',
                event_label: this.currentPage,
                page_title: title,
                page_type: this.currentPage
            });
        }
    }

    /**
     * Add Schema.org structured data
     * @param {Object} schema - Schema.org data
     * @param {string} type - Schema type identifier
     */
    addSchemaData(schema, type = 'default') {
        if (!schema['@context']) {
            schema['@context'] = 'https://schema.org';
        }

        // Remove existing schema of the same type
        if (this.schemaScripts.has(type)) {
            const existingScript = this.schemaScripts.get(type);
            if (existingScript && existingScript.parentNode) {
                existingScript.parentNode.removeChild(existingScript);
            }
        }

        // Create new schema script
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        script.dataset.schemaType = type;

        document.head.appendChild(script);
        this.schemaScripts.set(type, script);

        this.logger.debug(`Added ${type} schema data:`, schema);
    }

    /**
     * Add product schema data
     * @param {Object} product - Product data
     */
    addProductSchema(product) {
        if (!product) return;

        const schema = {
            "@type": "Product",
            "name": product.name || "Medical Product",
            "description": product.description || product.short || this.config.SEO.DEFAULT_DESCRIPTION,
            "image": product.image ? window.imageUtils.getImageUrl(product.image) : this.config.SEO.DEFAULT_IMAGE,
            "brand": {
                "@type": "Brand",
                "name": "V5 Medical LTD"
            },
            "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "url": window.location.href
            }
        };

        // Add price if available
        if (product.price && product.price !== "Contact for Price" && product.price !== "Price on Request") {
            const priceMatch = product.price.match(/\d+(\.\d+)?/);
            if (priceMatch) {
                schema.offers.price = priceMatch[0];
                schema.offers.priceCurrency = "USD";
            }
        }

        // Add aggregate rating
        schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "120"
        };

        this.addSchemaData(schema, 'product');
    }

    /**
     * Add organization schema data
     */
    addOrganizationSchema() {
        const schema = {
            "@type": "Organization",
            "name": "V5 Medical LTD",
            "url": this.config.SEO.CANONICAL_URL,
            "logo": this.config.SEO.DEFAULT_IMAGE,
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": this.config.CONTACT.WHATSAPP_UK,
                "contactType": "customer service",
                "availableLanguage": ["English", "Chinese"]
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "No. 168, Luying Road",
                "addressLocality": "Kunshan",
                "addressRegion": "Jiangsu",
                "addressCountry": "CN"
            }
        };

        this.addSchemaData(schema, 'organization');
    }

    /**
     * Update element text content
     * @param {string} id - Element ID
     * @param {string} content - New content
     */
    updateElementContent(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    }

    /**
     * Update meta tag content
     * @param {string} id - Meta element ID
     * @param {string} content - New content
     */
    updateMetaContent(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute('content', content);
        }
    }

    /**
     * Update meta tag property
     * @param {string} id - Meta element ID
     * @param {string} content - New content
     */
    updateMetaProperty(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute('property', `og:${id.replace('og-', '')}`);
            element.setAttribute('content', content);
        }
    }

    /**
     * Update meta tag name
     * @param {string} id - Meta element ID
     * @param {string} content - New content
     */
    updateMetaName(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute('name', id.replace('twitter-', 'twitter:'));
            element.setAttribute('content', content);
        }
    }

    /**
     * Update element attribute
     * @param {string} id - Element ID
     * @param {string} attribute - Attribute name
     * @param {string} value - Attribute value
     */
    updateElementAttribute(id, attribute, value) {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute(attribute, value);
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
            debug: (...args) => levelIndex <= 0 && console.debug('[SEOUtils]', ...args),
            info: (...args) => levelIndex <= 1 && console.info('[SEOUtils]', ...args),
            warn: (...args) => levelIndex <= 2 && console.warn('[SEOUtils]', ...args),
            error: (...args) => levelIndex <= 3 && console.error('[SEOUtils]', ...args)
        };
    }
}

// Initialize and make globally available
const seoUtils = new SEOUtils();
window.seoUtils = seoUtils;

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = seoUtils;
}