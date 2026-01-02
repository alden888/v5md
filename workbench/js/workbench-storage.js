// ============================================
// V14.0 ERP - STORAGE MODULE
// LocalStorage + Cloudflare KV Integration
// ============================================

const WorkbenchStorage = {
    // 🆕 V14.0: 默认启用云端存储
    USE_CLOUD: true,
    WORKER_URL: '', // 从LocalStorage读取或手动配置
    
    /**
     * 初始化存储系统
     */
    init() {
        console.log('[Storage] Initializing V14.0 ERP Storage System...');
        
        // 从LocalStorage读取Worker URL配置
        const savedWorkerUrl = localStorage.getItem('v5_worker_url');
        if (savedWorkerUrl) {
            this.WORKER_URL = savedWorkerUrl;
            console.log('[Storage] Cloudflare Worker URL loaded:', this.WORKER_URL);
        }
        
        return this;
    },
    
    /**
     * 保存数据到LocalStorage
     */
    saveLocal(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('[Storage] LocalStorage save failed:', error);
            return false;
        }
    },
    
    /**
     * 从LocalStorage读取数据
     */
    loadLocal(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('[Storage] LocalStorage load failed:', error);
            return defaultValue;
        }
    },
    
    /**
     * 保存数据到云端 (Cloudflare KV)
     */
    async saveCloud(key, value) {
        if (!this.USE_CLOUD || !this.WORKER_URL) {
            console.log('[Storage] Cloud storage disabled or not configured');
            return false;
        }
        
        try {
            const response = await fetch(`${this.WORKER_URL}/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value })
            });
            
            if (response.ok) {
                console.log(`[Storage] Cloud save successful: ${key}`);
                return true;
            } else {
                console.error('[Storage] Cloud save failed:', await response.text());
                return false;
            }
        } catch (error) {
            console.error('[Storage] Cloud save error:', error);
            return false;
        }
    },
    
    /**
     * 从云端读取数据 (Cloudflare KV)
     */
    async loadCloud(key) {
        if (!this.USE_CLOUD || !this.WORKER_URL) {
            return null;
        }
        
        try {
            const response = await fetch(`${this.WORKER_URL}/load?key=${key}`);
            
            if (response.ok) {
                const data = await response.json();
                console.log(`[Storage] Cloud load successful: ${key}`);
                return data.value;
            } else {
                console.error('[Storage] Cloud load failed:', await response.text());
                return null;
            }
        } catch (error) {
            console.error('[Storage] Cloud load error:', error);
            return null;
        }
    },
    
    /**
     * 统一保存接口 (LocalStorage + Cloud)
     */
    async save(key, value) {
        // 始终保存到LocalStorage
        this.saveLocal(key, value);
        
        // 如果启用云端，异步保存
        if (this.USE_CLOUD && this.WORKER_URL) {
            this.saveCloud(key, value).catch(err => {
                console.error('[Storage] Background cloud save failed:', err);
            });
        }
    },
    
    /**
     * 统一读取接口 (优先Cloud，降级LocalStorage)
     */
    async load(key, defaultValue = null) {
        // 如果启用云端，优先从云端读取
        if (this.USE_CLOUD && this.WORKER_URL) {
            const cloudData = await this.loadCloud(key);
            if (cloudData !== null) {
                return cloudData;
            }
        }
        
        // 降级到LocalStorage
        return this.loadLocal(key, defaultValue);
    },
    
    /**
     * 配置Worker URL
     */
    setWorkerUrl(url) {
        this.WORKER_URL = url;
        localStorage.setItem('v5_worker_url', url);
        console.log('[Storage] Worker URL configured:', url);
    },
    
    /**
     * 启用/禁用云端存储
     */
    toggleCloud(enabled) {
        this.USE_CLOUD = enabled;
        console.log('[Storage] Cloud storage', enabled ? 'enabled' : 'disabled');
    },
    
    /**
     * 导出所有数据 (用于备份)
     */
    exportAll() {
        const backup = {
            version: WorkbenchConfig.VERSION,
            exportDate: new Date().toISOString(),
            data: {
                orders: this.loadLocal(WorkbenchConfig.STORAGE_KEYS.ORDERS, []),
                customers: this.loadLocal(WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, []),
                suppliers: this.loadLocal(WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, []),
                expenses: this.loadLocal(WorkbenchConfig.STORAGE_KEYS.EXPENSES, []),
                target: this.loadLocal(WorkbenchConfig.STORAGE_KEYS.TARGET, 5000000),
                rate: this.loadLocal(WorkbenchConfig.STORAGE_KEYS.USD_RATE, 6.98),
                webhook: this.loadLocal(WorkbenchConfig.STORAGE_KEYS.FEISHU_WEBHOOK, ''),
                todayActions: this.loadLocal(WorkbenchConfig.STORAGE_KEYS.TODAY_ACTIONS, ['', '', ''])
            }
        };
        
        return backup;
    },
    
    /**
     * 导入数据 (用于恢复)
     */
    async importAll(backupData) {
        if (!backupData || !backupData.data) {
            console.error('[Storage] Invalid backup data');
            return false;
        }
        
        try {
            const { data } = backupData;
            
            await this.save(WorkbenchConfig.STORAGE_KEYS.ORDERS, data.orders || []);
            await this.save(WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, data.customers || []);
            await this.save(WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, data.suppliers || []);
            await this.save(WorkbenchConfig.STORAGE_KEYS.EXPENSES, data.expenses || []);
            await this.save(WorkbenchConfig.STORAGE_KEYS.TARGET, data.target || 5000000);
            await this.save(WorkbenchConfig.STORAGE_KEYS.USD_RATE, data.rate || 6.98);
            await this.save(WorkbenchConfig.STORAGE_KEYS.FEISHU_WEBHOOK, data.webhook || '');
            await this.save(WorkbenchConfig.STORAGE_KEYS.TODAY_ACTIONS, data.todayActions || ['', '', '']);
            
            console.log('[Storage] Data import successful');
            return true;
        } catch (error) {
            console.error('[Storage] Import failed:', error);
            return false;
        }
    },
    
    /**
     * 清空所有数据 (危险操作)
     */
    clearAll() {
        if (!confirm('⚠️ 确定要清空所有数据？此操作不可恢复！')) {
            return false;
        }
        
        Object.values(WorkbenchConfig.STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        
        console.log('[Storage] All data cleared');
        return true;
    }
};

// 🔥 FIX: 显式挂载到 window 对象
window.WorkbenchStorage = WorkbenchStorage;

// 自动初始化
WorkbenchStorage.init();
