// ============================================
// V14.0 ERP - CONFIGURATION MODULE
// ============================================

const WorkbenchConfig = {
    // Version Info
    VERSION: 'V14.0-ERP',
    APP_NAME: 'V5 Medical 战时指挥台',
    
    // Survival Mode Thresholds
    CASH_RED_LINE_HOURS: 72, // 72小时红线
    
    // Currency Configuration
    DEFAULT_CURRENCY: 'USD',
    DEFAULT_RATE: 6.98,
    
    CURRENCIES: {
        'USD': { symbol: '$', name: '美元', rate: 6.98 },
        'EUR': { symbol: '€', name: '欧元', rate: 7.85 },
        'GBP': { symbol: '£', name: '英镑', rate: 8.96 },
        'CNY': { symbol: '¥', name: '人民币', rate: 1.00 }
    },
    
    // Country List - 必须包含的国家
    COUNTRIES: [
        { code: 'CN', name: 'China', flag: '🇨🇳' },
        { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
        { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
        { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
        { code: 'GB', name: 'UK', flag: '🇬🇧' },
        { code: 'US', name: 'USA', flag: '🇺🇸' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪' },
        { code: 'FR', name: 'France', flag: '🇫🇷' },
        { code: 'IT', name: 'Italy', flag: '🇮🇹' },
        { code: 'ES', name: 'Spain', flag: '🇪🇸' },
        { code: 'JP', name: 'Japan', flag: '🇯🇵' },
        { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
        { code: 'AU', name: 'Australia', flag: '🇦🇺' },
        { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
        { code: 'IN', name: 'India', flag: '🇮🇳' },
        { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
        { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
        { code: 'RU', name: 'Russia', flag: '🇷🇺' },
        { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
        { code: 'ZA', name: 'South Africa', flag: '🇿🇦' }
    ],
    
    // Order Status
    ORDER_STATUS: {
        'Inquiry': { label: '询盘', color: 'bg-gray-500' },
        'Quotation': { label: '报价', color: 'bg-blue-500' },
        'Negotiation': { label: '谈判', color: 'bg-yellow-500' },
        'Paid': { label: '已付款', color: 'bg-green-500' },
        'Production': { label: '生产', color: 'bg-purple-500' },
        'Shipped': { label: '已发货', color: 'bg-indigo-500' },
        'Delivered': { label: '已交付', color: 'bg-teal-500' }
    },
    
    // Expense Categories
    EXPENSE_CATEGORIES: [
        '房租',
        '差旅',
        '招待',
        '物流',
        '其他'
    ],
    
    // Timezones for Global Clock
    TIMEZONES: [
        { city: 'Beijing', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
        { city: 'Manila', timezone: 'Asia/Manila', flag: '🇵🇭' },
        { city: 'Istanbul', timezone: 'Europe/Istanbul', flag: '🇹🇷' },
        { city: 'Amsterdam', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
        { city: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
        { city: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
        { city: 'Frankfurt', timezone: 'Europe/Berlin', flag: '🇩🇪' }
    ],
    
    // LocalStorage Keys
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
    
    // Toast Duration
    TOAST_DURATION: 3000
};
