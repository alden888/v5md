// ============================================
// V14.1 ERP - CONFIGURATION MODULE
// 核心配置文件，包含系统常量、货币/国家映射、存储键等
// ============================================

const WorkbenchConfig = Object.freeze({
    // 系统基础信息
    SYSTEM: {
        VERSION: 'V14.1-ERP',
        APP_NAME: 'V5 Medical 战时指挥台',
        CASH_RED_LINE_HOURS: 72, // 现金红线预警小时数
        TOAST_DURATION: 3000 // 提示框默认显示时长(ms)
    },

    // 货币配置（基础汇率：人民币为基准）
    CURRENCY: {
        DEFAULT: 'USD',
        DEFAULT_RATE: 6.9785, // 美元兑人民币默认汇率
        DEFAULT_TARGET: 5000000, // 默认目标金额(人民币)
        LIST: {
            'USD': { symbol: '$', name: '美元', rate: 6.9785 },
            'EUR': { symbol: '€', name: '欧元', rate: 8.164 },
            'GBP': { symbol: '£', name: '英镑', rate: 9.3779 },
            'CNY': { symbol: '¥', name: '人民币', rate: 1.00 },
            'PHP': { symbol: '₱', name: '菲律宾比索', rate: 0.1176 }, 
            'TRY': { symbol: '₺', name: '土耳其里拉', rate: 0.151 }  
        }
    },

    // 国家/地区配置（关联对应货币）
    COUNTRIES: [
        { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY' },
        { code: 'PH', name: 'Philippines', flag: '🇵🇭', currency: 'PHP' },
        { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY' },
        { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR' },
        { code: 'GB', name: 'UK', flag: '🇬🇧', currency: 'GBP' },
        { code: 'US', name: 'USA', flag: '🇺🇸', currency: 'USD' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR' }
    ],

    // 本地存储键名（统一前缀，避免冲突）
    STORAGE_KEYS: {
        ORDERS: 'v5_erp_orders',
        CUSTOMERS: 'v5_erp_customers',
        SUPPLIERS: 'v5_erp_suppliers',
        EXPENSES: 'v5_erp_expenses',
        TARGET: 'v5_erp_target',
        USD_RATE: 'v5_erp_usd_rate',
        FEISHU_WEBHOOK: 'v5_erp_feishu_webhook',
        TODAY_ACTIONS: 'v5_erp_today_actions',
        AUTH_TOKEN: 'v5_erp_auth_token'
    }
});

// 挂载到全局，同时做兼容性判断
if (typeof window !== 'undefined') {
    window.WorkbenchConfig = WorkbenchConfig;
}

// 模块化导出（支持ES6模块引入）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchConfig;
}