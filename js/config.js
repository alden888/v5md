/**
 * V5 Medical Website Configuration
 * Centralized configuration for all aspects of the website
 * @version 2.1.0
 * @updated 2024-12-16
 */

const V5Config = (() => {
    // 环境检测
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    const isProduction = hostname === 'v5md.com' || hostname === 'www.v5md.com';
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

    return {
        // Environment Status
        ENV: {
            IS_PRODUCTION: isProduction,
            IS_LOCAL: isLocal
        },

        // Base URLs
        // 生产环境: 使用相对路径 '/' 以适应可能得 CDN 代理或子目录
        // 开发/预览: 使用完整路径确保资源加载正确
        BASE_URL: isProduction ? '' : (isLocal ? '' : 'https://alden888.github.io/v5md'),
        
        // Paths
        PATHS: {
            IMAGES: 'images',
            PRODUCTS: 'images/products',
            JS: 'js',
            CSS: 'css',
            PDF: 'pdf'
        },
        
        // Product Database Configuration
        PRODUCT_DB: {
            FILE_PATH: 'js/complete-products.js',
            GLOBAL_VAR: 'completeProductDatabase',
            TIMEOUT: 8000,
            RETRY_ATTEMPTS: 2
        },
        
        // Image Configuration
        IMAGES: {
            PLACEHOLDER: 'images/products/default-product.jpg',
            
            // [修复] 使用 Cloudflare R2 绝对路径作为首选 Logo，解决显示不稳问题
            LOGO: 'https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5logo.png',
            
            // 本地回退路径 (用于 onerror)
            LOGO_LOCAL: 'images/v5logo.png',

            // 外部资源回退 (GitHub Raw)
            FALLBACK_BASE: 'https://raw.githubusercontent.com/alden888/v5md/main/'
        },
        
        // SEO Defaults
        SEO: {
            SITE_NAME: 'V5 Medical LTD',
            DEFAULT_TITLE: 'V5 Medical LTD - Global Medical Consumables Supplier',
            DEFAULT_DESC: 'ISO 13485, CE & FDA certified medical consumables manufacturer. Factory direct pricing for surgical sutures, packs, and injection devices.',
            DEFAULT_IMAGE: 'images/v5medlogo.png',
            CANONICAL_URL: 'https://v5md.com'
        },
        
        // Analytics Configuration
        ANALYTICS: {
            GA_ID: 'G-JE15YSMC2W',
            ENABLED: true,
            EVENTS: {
                LEAD: 'generate_lead',
                VIEW: 'view_item',
                DOWNLOAD: 'file_download'
            }
        },
        
        // Contact Information
        CONTACT: {
            WHATSAPP: {
                DISPLAY: '+44 078 9504 7944',
                NUMBER: '447895047944',
                API_URL: 'https://wa.me/447895047944'
            },
            WHATSAPP_CN: {
                DISPLAY: '+86 180 1266 9897',
                NUMBER: '8618012669897',
                API_URL: 'https://wa.me/8618012669897'
            },
            EMAIL: {
                SALES: 'sales@v5md.com',
                SUPPORT: 'info@v5md.com'
            },
            ADDRESS: 'No. 168, Luying Road, Kunshan, Jiangsu, China'
        },
        
        // Feature Flags
        FEATURES: {
            ENABLE_LAZY_LOAD: true,
            SHOW_PRICES: false,
            ENABLE_DEBUG: isLocal
        }
    };
})();

// Export for module usage (Node.js environments)
if (typeof module !== 'undefined') {
    module.exports = V5Config;
}

// Make globally available in Browser
if (typeof window !== 'undefined') {
    window.V5Config = V5Config;
}
