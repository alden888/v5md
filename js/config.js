/**
 * V5 Medical Website Configuration
 * Centralized Data Source
 * @version 2.4.0
 * @updated 2024-12-16
 */

const V5Config = (() => {
    // 环境检测
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    const isProduction = hostname === 'v5md.com' || hostname === 'www.v5md.com';
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

    return {
        // 环境状态
        ENV: {
            IS_PRODUCTION: isProduction,
            IS_LOCAL: isLocal
        },

        // 基础路径
        // 如果在 GitHub Pages 子目录下预览，可能需要设置为 '/v5md'，否则为空字符串
        BASE_URL: isProduction ? '' : (isLocal ? '' : ''),
        
        // 路径配置
        PATHS: {
            IMAGES: 'images',
            PRODUCTS: 'images/products'
        },
        
        // 产品数据库配置
        PRODUCT_DB: {
            FILE_PATH: 'js/complete-products.js',
            GLOBAL_VAR: 'completeProductDatabase'
        },
        
        // 图片配置 (核心修复)
        IMAGES: {
            // 默认产品占位图
            PLACEHOLDER: 'images/products/default-product.jpg',
            
            // LOGO 策略 (双重保险):
            // 1. 主链接: Cloudflare R2 CDN (极速)
            LOGO: 'https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5logo.png',
            
            // 2. 备用链接: 本地相对路径 (当 CDN 不可用时自动回退)
            LOGO_LOCAL: 'images/v5logo.png',

            // GitHub Raw 回退 (用于产品图)
            FALLBACK_BASE: 'https://raw.githubusercontent.com/alden888/v5md/main/'
        },
        
        // SEO 默认值
        SEO: {
            SITE_NAME: 'V5 Medical LTD',
            DEFAULT_TITLE: 'V5 Medical LTD - Global Medical Consumables Supplier',
            DEFAULT_IMAGE: 'images/v5medlogo.png'
        },
        
        // 分析工具
        ANALYTICS: {
            GA_ID: 'G-JE15YSMC2W',
            ENABLED: true
        },
        
        // 联系方式 (集中管理)
        CONTACT: {
            WHATSAPP: {
                DISPLAY: '+44 078 9504 7944', // 显示给用户看
                NUMBER: '447895047944',        // API 用
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

// 导出配置
if (typeof window !== 'undefined') window.V5Config = V5Config;
if (typeof module !== 'undefined') module.exports = V5Config;
