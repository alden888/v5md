/**
 * V5 Medical Workbench - Storage Layer
 * 数据持久化层 (Cloudflare Workers KV)
 * @version 2.0.0
 */

class WorkbenchStorage {
    constructor() {
        this.config = window.WorkbenchConfig;
        this.USE_CLOUD = true; // 🔥 切换到云端存储
        
        // Cloudflare Workers API 配置
        this.WORKER_URL = 'https://v5-workbench-api.alden888.workers.dev'; // ⚠️ 需要替换为实际 Worker URL
        this.API_KEY = 'v5bright2026_secret_key'; // ⚠️ 需要配置 API Key
        
        // 本地缓存
        this.cache = {
            orders: null,
            target: null,
            settings: null,
            lastSync: null
        };
    }

    /**
     * 初始化存储
     */
    async init() {
        try {
            // 尝试从云端加载数据
            if (this.USE_CLOUD) {
                await this.syncFromCloud();
            } else {
                // 降级到 localStorage
                this.loadFromLocal();
            }
            console.log('[Storage] Initialized successfully');
            return true;
        } catch (error) {
            console.warn('[Storage] Cloud sync failed, using local storage', error);
            this.USE_CLOUD = false;
            this.loadFromLocal();
            return false;
        }
    }

    /**
     * 从 Cloudflare Workers KV 同步数据
     */
    async syncFromCloud() {
        const response = await fetch(`${this.WORKER_URL}/sync`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Cloud sync failed');
        }

        const data = await response.json();
        this.cache = {
            orders: data.orders || [],
            target: data.target || this.config.WORKBENCH.DEFAULT_ANNUAL_TARGET,
            settings: data.settings || {},
            lastSync: Date.now()
        };

        // 同步到 localStorage 作为备份
        this.saveToLocal();
    }

    /**
     * 保存数据到云端
     */
    async saveToCloud(key, value) {
        if (!this.USE_CLOUD) {
            return this.saveToLocal();
        }

        try {
            const response = await fetch(`${this.WORKER_URL}/save`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    key,
                    value,
                    timestamp: Date.now()
                })
            });

            if (!response.ok) {
                throw new Error('Cloud save failed');
            }

            // 更新本地缓存
            this.cache[key] = value;
            this.saveToLocal(); // 本地备份
            
            return true;
        } catch (error) {
            console.error('[Storage] Cloud save failed:', error);
            // 降级到本地存储
            return this.saveToLocal();
        }
    }

    /**
     * 本地存储操作 (降级方案)
     */
    loadFromLocal() {
        this.cache = {
            orders: JSON.parse(localStorage.getItem('v5_orders') || '[]'),
            target: parseInt(localStorage.getItem('v5_target')) || this.config.WORKBENCH.DEFAULT_ANNUAL_TARGET,
            settings: JSON.parse(localStorage.getItem('v5_settings') || '{}'),
            lastSync: Date.now()
        };
    }

    saveToLocal() {
        localStorage.setItem('v5_orders', JSON.stringify(this.cache.orders));
        localStorage.setItem('v5_target', this.cache.target.toString());
        localStorage.setItem('v5_settings', JSON.stringify(this.cache.settings));
        return true;
    }

    /**
     * 获取订单数据
     */
    async getOrders() {
        if (this.USE_CLOUD && !this.cache.orders) {
            await this.syncFromCloud();
        }
        return this.cache.orders || [];
    }

    /**
     * 保存订单
     */
    async saveOrder(order) {
        const orders = await this.getOrders();
        orders.unshift(order);
        return await this.saveToCloud('orders', orders);
    }

    /**
     * 更新订单状态
     */
    async updateOrderStatus(orderId, status) {
        const orders = await this.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            return await this.saveToCloud('orders', orders);
        }
        return false;
    }

    /**
     * 获取年度目标
     */
    async getTarget() {
        if (this.USE_CLOUD && !this.cache.target) {
            await this.syncFromCloud();
        }
        return this.cache.target || this.config.WORKBENCH.DEFAULT_ANNUAL_TARGET;
    }

    /**
     * 更新年度目标
     */
    async setTarget(target) {
        return await this.saveToCloud('target', target);
    }

    /**
     * 清除所有数据
     */
    async clearAll() {
        if (this.USE_CLOUD) {
            await fetch(`${this.WORKER_URL}/clear`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${this.API_KEY}` }
            });
        }
        
        localStorage.clear();
        this.cache = {
            orders: [],
            target: this.config.WORKBENCH.DEFAULT_ANNUAL_TARGET,
            settings: {},
            lastSync: null
        };
    }

    /**
     * 导出备份
     */
    async exportBackup() {
        const data = {
            orders: await this.getOrders(),
            target: await this.getTarget(),
            settings: this.cache.settings,
            exportDate: new Date().toISOString(),
            version: this.config.VERSION
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `V5_Backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * 导入备份
     */
    async importBackup(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.orders) await this.saveToCloud('orders', data.orders);
                    if (data.target) await this.saveToCloud('target', data.target);
                    if (data.settings) await this.saveToCloud('settings', data.settings);
                    
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }
}

window.WorkbenchStorage = WorkbenchStorage;
