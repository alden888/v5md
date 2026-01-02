/**
 * V14.1 Hybrid Storage Module (Cloud + Local)
 * 智能存储层：自动同步 Firebase 与 LocalStorage
 */
class WorkbenchStorage {
    constructor() {
        this.config = window.WorkbenchConfig;
        // 设置唯一文档ID，你可以改成 "master_v1" 或者基于用户ID
        this.DOC_ID = 'v5_master_data_v1'; 
    }

    /**
     * 加载数据 (优先云端 -> 降级本地)
     */
    static async load(key, defaultValue) {
        let data = null;

        // 1. 尝试从云端拉取 (如果是核心数据)
        if (window.V5Firebase && window.V5Firebase.db) {
            // 我们把所有数据打包存在一个大文档里，或者分集合存
            // 为了兼容现有代码，我们这里模拟 key 读取
            // 实际生产建议分集合：db.collection('orders')...
            
            // 简单策略：从 'v5_data' 集合读取 'settings' 文档
            const cloudData = await window.V5Firebase.load('v5_store', key);
            if (cloudData && cloudData.value) {
                data = cloudData.value;
                // 同步回本地，保证下次断网也能用
                localStorage.setItem(key, JSON.stringify(data));
            }
        }

        // 2. 如果云端失败或没数据，读本地
        if (!data) {
            const local = localStorage.getItem(key);
            if (local) {
                try {
                    data = JSON.parse(local);
                } catch (e) {
                    console.error('Local parse error', e);
                }
            }
        }

        return data || defaultValue;
    }

    /**
     * 保存数据 (本地 + 云端双写)
     */
    static async save(key, value) {
        // 1. 存本地 (极速反馈)
        localStorage.setItem(key, JSON.stringify(value));

        // 2. 存云端 (异步后台)
        if (window.V5Firebase && window.V5Firebase.db) {
            // 不等待云端返回，避免界面卡顿
            window.V5Firebase.save('v5_store', key, { 
                value: value, 
                updatedAt: new Date().toISOString() 
            });
        }
    }

    // --- 批量导出/导入保持不变 ---
    static exportAll() {
        // ... (保持原代码)
        const data = {};
        for(let i=0; i<localStorage.length; i++) {
            const k = localStorage.key(i);
            if(k.startsWith('v5_') || k.startsWith('v14_')) {
                data[k] = JSON.parse(localStorage.getItem(k));
            }
        }
        return data;
    }

    static async importAll(data) {
        // ... (保持原代码)
        for (const [key, val] of Object.entries(data)) {
            await this.save(key, val); // 会自动同步到云端
        }
        return true;
    }
}

// 挂载
window.WorkbenchStorage = WorkbenchStorage;
