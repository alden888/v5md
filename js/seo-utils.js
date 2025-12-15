/**
 * V5 Medical SEO Utilities
 * Handles dynamic meta tag updates and structured data injection (JSON-LD)
 * @version 2.0.0
 * @updated 2024-12-16
 */

class SEOUtils {
    constructor() {
        this.config = window.V5Config?.SEO || {};
        this.baseUrl = window.V5Config?.BASE_URL || window.location.origin;
        this.schemaId = 'v5-dynamic-schema';
    }

    /**
     * Main entry point to update all SEO elements for a page
     * @param {Object} data - { title, description, image, type, keywords, product }
     */
    updatePage(data = {}) {
        const title = data.title || this.config.DEFAULT_TITLE;
        const description = data.description || this.config.DEFAULT_DESC;
        const image = this._resolveUrl(data.image || this.config.DEFAULT_IMAGE);
        const url = window.location.href;

        // 1. Update Document Title
        document.title = title;

        // 2. Update Standard Meta Tags
        this._setMeta('name', 'description', description);
        this._setMeta('name', 'keywords', data.keywords || '');
        this._setLink('rel', 'canonical', url);

        // 3. Update Open Graph (Facebook/LinkedIn/WhatsApp)
        this._setMeta('property', 'og:title', title);
        this._setMeta('property', 'og:description', description);
        this._setMeta('property', 'og:image', image);
        this._setMeta('property', 'og:url', url);
        this._setMeta('property', 'og:type', data.type || 'website');
        this._setMeta('property', 'og:site_name', this.config.SITE_NAME);

        // 4. Update Twitter Card
        this._setMeta('name', 'twitter:card', 'summary_large_image');
        this._setMeta('name', 'twitter:title', title);
        this._setMeta('name', 'twitter:description', description);
        this._setMeta('name', 'twitter:image', image);

        // 5. Inject Structured Data (JSON-LD)
        this._injectSchema(data);
        
        // 6. Track Update
        console.log(`[SEO] Updated meta tags for: ${title}`);
    }

    /**
     * Helper: Set <meta> tag content. Creates tag if missing.
     * @param {string} attrName - 'name' or 'property'
     * @param {string} attrValue - e.g., 'description' or 'og:title'
     * @param {string} content - The content value
     */
    _setMeta(attrName, attrValue, content) {
        if (!content) return;
        let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(attrName, attrValue);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    }

    /**
     * Helper: Set <link> tag href. Creates tag if missing.
     */
    _setLink(attrName, attrValue, href) {
        let element = document.querySelector(`link[${attrName}="${attrValue}"]`);
        if (!element) {
            element = document.createElement('link');
            element.setAttribute(attrName, attrValue);
            document.head.appendChild(element);
        }
        element.setAttribute('href', href);
    }

    /**
     * Helper: Resolve absolute URL for images (required for OG tags)
     */
    _resolveUrl(path) {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        // Clean up path and join with base URL
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${this.baseUrl}/${cleanPath}`;
    }

    /**
     * Inject JSON-LD Schema based on page type
     */
    _injectSchema(data) {
        const schemas = [];

        // 1. Organization Schema (Always included)
        schemas.push({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "V5 Medical LTD",
            "url": this.baseUrl,
            "logo": this._resolveUrl(this.config.DEFAULT_IMAGE),
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": window.V5Config?.CONTACT?.WHATSAPP?.DISPLAY || "+44 7895 047944",
                "contactType": "customer service"
            }
        });

        // 2. Product Schema (If product data exists)
        if (data.product) {
            schemas.push({
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": data.product.name,
                "image": data.product.images ? data.product.images.map(img => this._resolveUrl(img)) : [],
                "description": data.product.short || data.product.description,
                "sku": data.product.id,
                "brand": { "@type": "Brand", "name": "V5 Medical" },
                "offers": {
                    "@type": "Offer",
                    "url": window.location.href,
                    "priceCurrency": "USD",
                    "price": "0", // 0 indicates contact for price in B2B often, or omit
                    "availability": "https://schema.org/InStock",
                    "itemCondition": "https://schema.org/NewCondition"
                }
            });
        }

        // 3. Breadcrumb Schema
        schemas.push({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": this.baseUrl },
                { "@type": "ListItem", "position": 2, "name": data.title || "Page", "item": window.location.href }
            ]
        });

        // Remove old dynamic schema
        const oldScript = document.getElementById(this.schemaId);
        if (oldScript) oldScript.remove();

        // Inject new schema
        const script = document.createElement('script');
        script.id = this.schemaId;
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemas);
        document.head.appendChild(script);
    }
}

// Initialize and Expose
window.seoUtils = new SEOUtils();

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = window.seoUtils;
}
