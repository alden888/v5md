/**
 * V5 Medical Website Configuration
 * Centralized configuration for all aspects of the website
 * @version 1.0.0
 */

const CONFIG = {
    // Base URLs
    BASE_URL: 'https://alden888.github.io/v5md',
    GITHUB_RAW_BASE: 'https://raw.githubusercontent.com/alden888/v5md/main',
    
    // Paths
    PATHS: {
        IMAGES: '/images',
        PRODUCTS: '/images/products',
        JS: '/js',
        CSS: '/css',
        PDF: '/pdf'
    },
    
    // Product Database Configuration
    PRODUCT_DB: {
        MAIN_FILE: 'products.js',
        FALLBACK_FILE: 'products.js',
        TIMEOUT: 5000,
        RETRY_ATTEMPTS: 2,
        RETRY_DELAY: 1000
    },
    
    // Image Configuration
    IMAGES: {
        PLACEHOLDER: 'placeholder.jpg',
        LOGO: 'logo/v5logo.png',
        QUALITY_CERTS: {
            CE: 'quality/ce-mark.png',
            ISO: 'quality/iso13485-2016.jpg',
            FDA: 'quality/fda.jpg'
        }
    },
    
    // SEO Configuration
    SEO: {
        DEFAULT_TITLE: 'V5 Medical LTD - Global Medical Consumables Supplier',
        DEFAULT_DESCRIPTION: 'ISO 13485, CE & FDA certified medical consumables manufacturer and supplier from China. Factory direct pricing with 20+ years experience.',
        DEFAULT_KEYWORDS: 'medical products, ISO 13485, CE certified, FDA approved, medical consumables, China medical supplier, surgical sutures, disposable syringes',
        DEFAULT_IMAGE: 'https://raw.githubusercontent.com/alden888/v5md/main/images/logo/v5logo.png',
        CANONICAL_URL: 'https://alden888.github.io/v5md'
    },
    
    // Analytics Configuration
    ANALYTICS: {
        GA_ID: 'G-JE15YSMC2W',
        EVENT_CATEGORIES: {
            PRODUCT: 'Product Interaction',
            NAVIGATION: 'Navigation',
            LEAD: 'Lead Generation',
            PERFORMANCE: 'Performance'
        }
    },
    
    // Contact Information
    CONTACT: {
        WHATSAPP_UK: '+44 078 9504 7944',
        WHATSAPP_CN: '+86 180 1266 9897',
        EMAIL_SALES: 'sales@v5md.com',
        EMAIL_GMAIL: 'v5md.com@gmail.com',
        ADDRESS: 'No. 168, Luying Road, Kunshan, Jiangsu, China'
    },
    
    // Performance Monitoring
    PERFORMANCE: {
        THRESHOLDS: {
            PAGE_LOAD: 2000,
            PRODUCT_LOAD: 1000,
            IMAGE_LOAD: 1500
        },
        LOG_LEVEL: 'info' // debug, info, warn, error
    }
};

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = CONFIG;
}

// Make globally available
window.V5Config = CONFIG;
