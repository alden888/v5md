// ============================================
// V14.1 ERP - CONFIGURATION MODULE
// ============================================

const WorkbenchConfig = {
    VERSION: 'V14.1-ERP',
    APP_NAME: 'V5 Medical 战时指挥台',
    
    CASH_RED_LINE_HOURS: 72,
    
    DEFAULT_CURRENCY: 'USD',
    DEFAULT_RATE: 6.98,
    DEFAULT_TARGET: 5000000,
    
    CURRENCIES: {
        'USD': { symbol: '$', name: '美元', rate: 6.98 },
        'EUR': { symbol: '€', name: '欧元', rate: 7.85 },
        'GBP': { symbol: '£', name: '英镑', rate: 8.96 },
        'CNY': { symbol: '¥', name: '人民币', rate: 1.00 }
    },
    
    COUNTRIES: [
        { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY' },
        { code: 'PH', name: 'Philippines', flag: '🇵🇭', currency: 'PHP' },
        { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY' },
        { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR' },
        { code: 'GB', name: 'UK', flag: '🇬🇧', currency: 'GBP' },
        { code: 'US', name: 'USA', flag: '🇺🇸', currency: 'USD' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR' }
    ],
    
    STORAGE_KEYS: {
        ORDERS: 'v5_orders',
        CUSTOMERS: 'v5_customers',
        SUPPLIERS: 'v5_suppliers',
        EXPENSES: 'v5_expenses',
        TARGET: 'v5_target',
        USD_RATE: 'v5_usd_rate',
        FEISHU_WEBHOOK: 'v5_feishu_webhook',
        TODAY_ACTIONS: 'v5_today_actions',
        AUTH_TOKEN: 'v5_auth_token'
    },
    
    TOAST_DURATION: 3000
};

window.WorkbenchConfig = WorkbenchConfig;
