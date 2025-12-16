/**
 * V5 Medical Website Configuration
 * @version 2.3.0
 */
const V5Config = (() => {
    // 环境检测
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
    const isProduction = hostname === 'v5md.com' || hostname === 'www.v5md.com';
    // 基础路径：生产环境为空，本地/GitHub可能需要前缀
    // 注意：如果是在本地 file:// 打开，这可能需要根据您的服务器设置调整
    const BASE_URL = isProduction ? '' : ''; 

    return {
        // ... (其他配置保持不变)
        
        // 核心修复：图片配置
        IMAGES: {
            // 默认占位图
            PLACEHOLDER: '/images/products/default-product.jpg',
            
            // LOGO 策略：
            // 1. 首选：Cloudflare R2 全球 CDN (速度快，稳定)
            LOGO: 'https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5logo.png',
            
            // 2. 备选：本地文件 (必须以 / 开头，表示从根目录查找)
            LOGO_LOCAL: 'images/v5logo.png' 
        },

        // 核心修复：联系方式 (确保 API 链接正确)
        CONTACT: {
            WHATSAPP: {
                DISPLAY: '+44 078 9504 7944',
                API_URL: 'https://wa.me/447895047944'
            },
            WHATSAPP_CN: {
                DISPLAY: '+86 180 1266 9897',
                API_URL: 'https://wa.me/8618012669897' // 修正了号码格式
            },
            EMAIL: {
                SALES: 'sales@v5md.com'
            },
            ADDRESS: 'No. 168, Luying Road, Kunshan, Jiangsu, China'
        },

        SEO: {
            SITE_NAME: 'V5 Medical LTD'
        },
        
        // ... (其他配置保持不变)
    };
})();

if (typeof window !== 'undefined') window.V5Config = V5Config;
