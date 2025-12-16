/**
 * V5 Medical Website Configuration
 * Centralized configuration for all aspects of the website
 * @version 2.3.0 (Added Google Translate support)
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
        // 生产环境: 使用相对路径 '' 以适应 CDN
        // 开发环境: 如果是本地服务器使用 ''，如果是 GitHub Pages 预览可能需要仓库名前缀
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
            
            // [关键修复] 使用 Cloudflare R2 直链作为首选 Logo
            LOGO: 'https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5logo.png',
            
            // 本地回退路径 (当 CDN 不可用时使用)
            LOGO_LOCAL: 'images/v5logo.png',

            // 外部资源回退 (GitHub Raw) - 用于产品图片
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
            ENABLED: true
        },
        
        // Google Translate Configuration
        GOOGLE_TRANSLATE: {
            ENABLED: true,
            PAGE_LANGUAGE: 'en',
            LANGUAGES: 'en,es,fr,de,zh-CN,zh-TW,ar,ru,ja,ko,pt,it,hi',
            DEFAULT_LABEL: 'Translate',
            POSITION: {
                DESKTOP: { top: '6rem', right: '1rem' },
                MOBILE: { top: '5.5rem', right: '0.75rem' }
            },
            STYLE: {
                BACKGROUND: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)',
                HOVER_BACKGROUND: 'linear-gradient(135deg, #3367d6 0%, #2e8b57 100%)',
                BORDER: '2px solid #ffffff',
                SHADOW: '0 4px 12px rgba(0, 0, 0, 0.15)',
                HOVER_SHADOW: '0 6px 16px rgba(0, 0, 0, 0.2)'
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
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = V5Config;
}

// Make globally available
if (typeof window !== 'undefined') {
    window.V5Config = V5Config;
}
