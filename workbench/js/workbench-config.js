// ============================================
// V14.2 PRO ERP - CONFIGURATION MODULE
// 核心配置文件，包含系统常量、货币/国家映射、存储键等
// 优化版本 - 2026-01-03
// ============================================

const WorkbenchConfig = Object.freeze({
    // 系统基础信息
    SYSTEM: {
        VERSION: 'V14.2-PRO-ERP',
        APP_NAME: 'V5 Medical 战时指挥台',
        CASH_RED_LINE_HOURS: 72, // 现金红线预警小时数
        TOAST_DURATION: 3000, // 提示框默认显示时长(ms)
        STORAGE_PREFIX: 'workbench_' // 统一存储前缀
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

    // 本地存储键名（统一workbench_前缀）
    STORAGE_KEYS: {
        ORDERS: 'workbench_orders',
        CUSTOMERS: 'workbench_customers',
        SUPPLIERS: 'workbench_suppliers',
        EXPENSES: 'workbench_expenses',
        TARGET: 'workbench_target',
        EXCHANGE_RATE: 'workbench_exchange_rate',
        SETTINGS: 'workbench_settings',
        TODAY_ACTIONS: 'workbench_today_actions',
        UNLOCK_TIME: 'workbench_unlock_time',
        AUTH_TOKEN: 'workbench_auth_token',
        FIREBASE_CONFIG: 'workbench_firebase_config',
        DEVICE_ID: 'workbench_device_id',
        
        // 兼容旧版本（用于数据迁移）
        _LEGACY: {
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
    },

    // Firebase集合名称（与workbench-firebase.js保持一致）
    FIREBASE_COLLECTIONS: {
        ORDERS: 'orders',
        SUPPLIERS: 'suppliers',
        CUSTOMERS: 'customers',
        EXPENSES: 'expenses',
        TODAY_ACTIONS: 'today_actions',
        SETTINGS: 'settings',
        USERS: 'users'
    },

    // 数据迁移配置
    MIGRATION: {
        ENABLED: true,
        VERSION: '14.2',
        MAPPINGS: [
            { from: 'v5_erp_orders', to: 'workbench_orders' },
            { from: 'v5_erp_customers', to: 'workbench_customers' },
            { from: 'v5_erp_suppliers', to: 'workbench_suppliers' },
            { from: 'v5_erp_expenses', to: 'workbench_expenses' },
            { from: 'v5_erp_target', to: 'workbench_target' },
            { from: 'v5_erp_usd_rate', to: 'workbench_exchange_rate' },
            { from: 'v5_erp_feishu_webhook', to: 'workbench_settings' },
            { from: 'v5_erp_today_actions', to: 'workbench_today_actions' },
            { from: 'v5_erp_auth_token', to: 'workbench_auth_token' },
            { from: 'v14_today_actions', to: 'workbench_today_actions' },
            { from: 'v14_unlock_time', to: 'workbench_unlock_time' },
            { from: 'v14_settings', to: 'workbench_settings' },
            { from: 'v14_exchange_rate', to: 'workbench_exchange_rate' }
        ]
    },

    // 模块初始化方法（供index.html的loader调用）
    init: function() {
        console.log('[Config] 配置模块已加载');
        console.log('[Config] 版本:', this.SYSTEM.VERSION);
        console.log('[Config] 存储前缀:', this.SYSTEM.STORAGE_PREFIX);
        
        // 执行数据迁移（如果启用）
        if (this.MIGRATION.ENABLED && typeof this.migrateData === 'function') {
            this.migrateData();
        }
        
        return true;
    },

    // 数据迁移方法
    migrateData: function() {
        if (!this.MIGRATION.ENABLED) {
            console.log('[Config] 数据迁移已禁用');
            return;
        }

        console.log('[Config] 开始检查数据迁移...');
        let migratedCount = 0;

        this.MIGRATION.MAPPINGS.forEach(({ from, to }) => {
            try {
                const oldData = localStorage.getItem(from);
                
                // 如果旧数据存在且新数据不存在，则迁移
                if (oldData && !localStorage.getItem(to)) {
                    localStorage.setItem(to, oldData);
                    migratedCount++;
                    console.log(`[Config] ✅ 迁移: ${from} → ${to}`);
                    
                    // 可选：迁移后删除旧数据（谨慎操作）
                    // localStorage.removeItem(from);
                }
            } catch (error) {
                console.error(`[Config] ❌ 迁移失败: ${from}`, error);
            }
        });

        if (migratedCount > 0) {
            console.log(`[Config] ✅ 数据迁移完成，共迁移 ${migratedCount} 项`);
        } else {
            console.log('[Config] 无需迁移数据');
        }
    },

    // 获取存储键名（辅助方法）
    getStorageKey: function(key) {
        return this.STORAGE_KEYS[key] || `${this.SYSTEM.STORAGE_PREFIX}${key.toLowerCase()}`;
    },

    // 获取货币信息
    getCurrency: function(code) {
        return this.CURRENCY.LIST[code] || this.CURRENCY.LIST[this.CURRENCY.DEFAULT];
    },

    // 获取国家信息
    getCountry: function(code) {
        return this.COUNTRIES.find(c => c.code === code) || this.COUNTRIES[0];
    }
});

// 挂载到全局
if (typeof window !== 'undefined') {
    window.WorkbenchConfig = WorkbenchConfig;
}

// 模块化导出（支持ES6模块引入）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchConfig;
}

console.log('[Config] 配置模块已加载，版本:', WorkbenchConfig.SYSTEM.VERSION);
