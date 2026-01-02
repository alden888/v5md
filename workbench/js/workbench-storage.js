// ============================================
// V14.1 ERP - STORAGE MODULE
// ============================================

const WorkbenchStorage = {
    USE_CLOUD: false, // 简化版先关闭云存储
    
    async save(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('[Storage] Save failed:', error);
            return false;
        }
    },
    
    async load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('[Storage] Load failed:', error);
            return defaultValue;
        }
    },
    
    exportAll() {
        return {
            version: WorkbenchConfig.VERSION,
            exportDate: new Date().toISOString(),
            data: {
                orders: this.load(WorkbenchConfig.STORAGE_KEYS.ORDERS, []),
                customers: this.load(WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, []),
                suppliers: this.load(WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, []),
                expenses: this.load(WorkbenchConfig.STORAGE_KEYS.EXPENSES, []),
                target: this.load(WorkbenchConfig.STORAGE_KEYS.TARGET, 5000000),
                rate: this.load(WorkbenchConfig.STORAGE_KEYS.USD_RATE, 6.98)
            }
        };
    },
    
    async importAll(backupData) {
        if (!backupData || !backupData.data) return false;
        
        try {
            const { data } = backupData;
            await this.save(WorkbenchConfig.STORAGE_KEYS.ORDERS, data.orders || []);
            await this.save(WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, data.customers || []);
            await this.save(WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, data.suppliers || []);
            await this.save(WorkbenchConfig.STORAGE_KEYS.EXPENSES, data.expenses || []);
            await this.save(WorkbenchConfig.STORAGE_KEYS.TARGET, data.target || 5000000);
            await this.save(WorkbenchConfig.STORAGE_KEYS.USD_RATE, data.rate || 6.98);
            return true;
        } catch (error) {
            console.error('[Storage] Import failed:', error);
            return false;
        }
    }
};

window.WorkbenchStorage = WorkbenchStorage;
