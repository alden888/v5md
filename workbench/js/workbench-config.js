/**
 * V5 Medical Workbench - Configuration Center
 * 工作台配置中心
 * @version 1.0.0
 */

const WorkbenchConfig = {
    // 版本信息
    VERSION: '2.0.0',
    BUILD_DATE: '2025-01-02',

    // 继承主站配置
    MAIN_SITE: window.V5Config || {
        BASE_URL: '',
        CONTACT: {
            WHATSAPP: { DISPLAY: '+44 078 9504 7944', API_URL: 'https://wa.me/447895047944' },
            EMAIL: { SALES: 'sales@v5md.com' }
        }
    },

    // 工作台专属配置
    WORKBENCH: {
        // 年度目标 (可修改)
        DEFAULT_ANNUAL_TARGET: 5000000, // 500万人民币

        // 默认汇率
        DEFAULT_USD_RATE: 7.25,

        // 数据存储Key
        STORAGE_KEYS: {
            TARGET: 'v5_target',
            ORDERS: 'v5_orders',
            USD_RATE: 'v5_usd_rate',
            SETTINGS: 'v5_workbench_settings'
        },

        // 自动保存间隔 (毫秒)
        AUTO_SAVE_INTERVAL: 30000, // 30秒

        // 订单配置
        ORDER: {
            PI_PREFIX: 'PI',
            STATUSES: ['Pending', 'Paid', 'Cancelled'],
            DEFAULT_TERM: 'FOB Shanghai',
            TERMS: ['FOB Shanghai', 'CIF London', 'EXW Kunshan', 'DDP Dubai']
        },

        // 报价计算默认值
        PRICING: {
            DEFAULT_REBATE: 13, // 退税率 %
            DEFAULT_MARGIN: 20, // 目标利润率 %
            VAT_RATE: 13 // 增值税率 %
        },

        // 财务配置
        FINANCE: {
            BANK: {
                BENEFICIARY: 'SUZHOU V5 MEDICAL TECHNOLOGY CO., LTD.',
                BANK_NAME: 'CHINA CONSTRUCTION BANK CORP SUZHOU BRANCH',
                ACCOUNT_USD: '32250198643609850772',
                SWIFT: 'PCBCCNBJJSS',
                ADDRESS: 'NO 180 QIANJIN MID-ROAD KUNSHAN CITY JIANGSU PROVINCE CHINA',
                POSTCODE: '215300'
            },
            XTRANSFER: {
                BENEFICIARY: 'Kunshan Vvohoo Industry Co., Ltd',
                BANK: 'JPMorgan Chase Bank N.A., Hong Kong Branch',
                ACCOUNT: '63007935038',
                SWIFT: 'CHASHKHH',
                ADDRESS: '18/F, 20/F, 22-29/F, CHATER HOUSE, 8 CONNAUGHT ROAD CENTRAL, HONG KONG'
            }
        },

        // 产品数据库 (示例SKU)
        PRODUCTS: [
            { sku: 'V5-SUT-PGA', name: 'PGA Absorbable Suture', price: 1.25, category: 'Sutures' },
            { sku: 'V5-SUT-SILK', name: 'Silk Braided Suture', price: 0.85, category: 'Sutures' },
            { sku: 'V5-SUT-NYLON', name: 'Nylon Monofilament', price: 0.75, category: 'Sutures' },
            { sku: 'V5-SYR-1ML', name: '1ml Luer Slip Syringe', price: 0.04, category: 'Injection' },
            { sku: 'V5-SYR-3ML', name: '3ml Luer Lock Syringe', price: 0.06, category: 'Injection' },
            { sku: 'V5-GLOVE-L', name: 'Latex Surgical Gloves (L)', price: 0.22, category: 'PPE' },
            { sku: 'V5-MASK-N95', name: 'N95 Respirator Mask', price: 0.15, category: 'PPE' },
            { sku: 'V5-PACK-BASIC', name: 'Basic Surgical Pack', price: 3.50, category: 'Packs' },
            { sku: 'V5-GAUZE-10X10', name: 'Gauze Swab 10x10cm', price: 0.02, category: 'Dressings' }
        ],

        // 全球时钟城市
        WORLD_CITIES: [
            { name: 'Beijing', tz: 'Asia/Shanghai', icon: '🇨🇳', workHours: [9, 18] },
            { name: 'London', tz: 'Europe/London', icon: '🇬🇧', workHours: [9, 17] },
            { name: 'New York', tz: 'America/New_York', icon: '🇺🇸', workHours: [9, 17] },
            { name: 'Dubai', tz: 'Asia/Dubai', icon: '🇦🇪', workHours: [8, 17] },
            { name: 'Istanbul', tz: 'Europe/Istanbul', icon: '🇹🇷', workHours: [9, 18] },
            { name: 'São Paulo', tz: 'America/Sao_Paulo', icon: '🇧🇷', workHours: [9, 18] }
        ],

        // 每日励志语录
        DAILY_QUOTES: [
            "Every 'No' brings you closer to a 'Yes'. (每一次拒绝都让你离成交更近)",
            "Quality is the best business plan. (质量是最好的商业计划)",
            "Don't wait for opportunity. Create it. (不要等待机会，去创造它)",
            "今天多打一个电话，明天多一个订单！",
            "Speed is the new currency of business. (速度是新的商业货币)",
            "500万不是梦，是必须拿下的山头！",
            "Great things never come from comfort zones. (伟大的成就从不源于舒适区)",
            "Your network is your net worth. (你的人脉就是你的净资产)",
            "成交之前的每一次拒绝，都是在积累运气。",
            "Action is the foundational key to all success. (行动是所有成功的基石)",
            "The harder you work, the luckier you get. (越努力，越幸运)",
            "Success is not final, failure is not fatal. (成功不是终点，失败不是致命)"
        ],

        // UI配置
        UI: {
            TOAST_DURATION: 3000, // Toast显示时长
            AUTO_HIDE_DELAY: 5000, // 自动隐藏延迟
            ANIMATION_DURATION: 300 // 动画持续时间
        }
    },

    // 快捷链接
    QUICK_LINKS: {
        GMAIL: 'https://mail.google.com/mail/u/0/#inbox',
        WHATSAPP: 'https://web.whatsapp.com',
        AMAZON_US: 'https://sellercentral.amazon.com/',
        AMAZON_UK: 'https://sellercentral.amazon.co.uk/',
        TRACKING_17TRACK: 'https://www.17track.net/zh-cn',
        BOC_FOREX: 'https://www.boc.cn/sourcedb/whpj/',
        SINA_FOREX: 'https://finance.sina.com.cn/forex/',
        XTRANSFER: 'https://www.xtransfer.cn/'
    },

    // 获取配置项的辅助方法
    get(path, defaultValue = null) {
        const keys = path.split('.');
        let value = this;
        for (const key of keys) {
            value = value[key];
            if (value === undefined) return defaultValue;
        }
        return value;
    },

    // 获取随机励志语录
    getRandomQuote() {
        const quotes = this.WORKBENCH.DAILY_QUOTES;
        return quotes[Math.floor(Math.random() * quotes.length)];
    },

    // 生成PI编号
    generatePINumber() {
        const date = new Date();
        const year = date.getFullYear().toString().substr(2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return `${this.WORKBENCH.ORDER.PI_PREFIX}-${year}${month}${day}-${random}`;
    }
};

// 冻结配置对象（防止意外修改）
Object.freeze(WorkbenchConfig.WORKBENCH.FINANCE);
Object.freeze(WorkbenchConfig.QUICK_LINKS);

// 全局导出
window.WorkbenchConfig = WorkbenchConfig;
