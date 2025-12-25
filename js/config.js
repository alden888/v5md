/**
 * V5 Medical Website Configuration
 * @version 2.6.0
 * @updated 2024-12-16
 */

const V5Config = (() => {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    const isProduction = hostname === 'v5md.com' || hostname === 'www.v5md.com';
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

    return {
        ENV: { IS_PRODUCTION: isProduction, IS_LOCAL: isLocal },
        
        // 关键：留空让浏览器自动处理相对路径
        BASE_URL: '', 
        
        PATHS: { IMAGES: 'images', PRODUCTS: 'images/products' },
        
        IMAGES: {
            PLACEHOLDER: 'images/products/default-product.jpg',
            LOGO: 'https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5logo.png',
            LOGO_LOCAL: 'images/v5logo.png',
            
            // 关键：指向您的 GitHub 仓库的 Raw 地址，用于图片回退
            FALLBACK_BASE: 'https://raw.githubusercontent.com/alden888/v5md/main/'
        },
        
        SEO: {
            SITE_NAME: 'V5 Medical LTD',
            DEFAULT_TITLE: 'V5 Medical LTD - Global Medical Consumables Supplier'
        },
        
        CONTACT: {
            WHATSAPP: { DISPLAY: '078 9504 7944', NUMBER: '447895047944', API_URL: 'https://wa.me/447895047944' },
            WHATSAPP_CN: { DISPLAY: '+86 180 1266 9897', NUMBER: '8618012669897', API_URL: 'https://wa.me/8618012669897' },
            EMAIL: { SALES: 'sales@v5md.com' },
            ADDRESS: 'No. 168, Luying Road, Kunshan, Jiangsu, China'
        }
    };
})();

if (typeof window !== 'undefined') window.V5Config = V5Config;
if (typeof module !== 'undefined') module.exports = V5Config;
