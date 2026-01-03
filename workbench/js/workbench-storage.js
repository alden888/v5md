/**
 * V14.2 Enhanced Storage Module
 * 智能存储层：本地存储封装 + 云端同步 + 类型安全
 * @namespace WorkbenchStorage
 */
const WorkbenchStorage = (() => {
    'use strict';

    // 配置常量
    const CONFIG = {
        PREFIX: 'v14_',
        VERSION: 'v2',
        DEFAULT_COLLECTION: 'v14_store',
        SYNC_INTERVAL: 30000, // 30秒自动同步
        MAX_RETRY: 3,
        RETRY_DELAY: 1000
    };

    // 错误类型枚举
    const ErrorType = {
        STORAGE_NOT_SUPPORTED: 'STORAGE_NOT_SUPPORTED',
        JSON_PARSE_ERROR: 'JSON_PARSE_ERROR',
        JSON_STRINGIFY_ERROR: 'JSON_STRINGIFY_ERROR',
        CLOUD_CONNECTION_ERROR: 'CLOUD_CONNECTION_ERROR',
        CLOUD_AUTH_ERROR: 'CLOUD_AUTH_ERROR',
        CLOUD_OPERATION_ERROR: 'CLOUD_OPERATION_ERROR',
        INVALID_KEY: 'INVALID_KEY',
        INVALID_VALUE: 'INVALID_VALUE',
        TYPE_MISMATCH: 'TYPE_MISMATCH',
        STORAGE_FULL: 'STORAGE_FULL',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR'
    };

    // 存储状态
    const state = {
        isCloudAvailable: false,
        isSyncing: false,
        lastSyncTime: 0,
        retryCount: 0,
        listeners: new Map()
    };

    /**
     * 初始化存储模块
     * @returns {Promise<boolean>} 是否初始化成功
     */
    async function init() {
        try {
            // 检查本地存储支持
            if (!isLocalStorageSupported()) {
                throw createError(ErrorType.STORAGE_NOT_SUPPORTED, '本地存储不受支持');
            }

            // 检查云端连接
            state.isCloudAvailable = await checkCloudConnection();

            // 启动自动同步
            startAutoSync();

            console.log('✅ [Storage] 存储模块已初始化', {
                local: true,
                cloud: state.isCloudAvailable,
                version: CONFIG.VERSION
            });

            return true;
        } catch (error) {
            console.error('❌ [Storage] 初始化失败:', error);
            return false;
        }
    }

    /**
     * 检查本地存储支持
     * @returns {boolean} 是否支持
     */
    function isLocalStorageSupported() {
        try {
            const key = '__storage_test__';
            localStorage.setItem(key, key);
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 检查云端连接
     * @returns {Promise<boolean>} 是否连接成功
     */
    async function checkCloudConnection() {
        try {
            if (window.V5Firebase && window.V5Firebase.db) {
                // 简单的连接测试
                return true;
            }
            return false;
        } catch (error) {
            console.warn('[Storage] 云端连接检查失败:', error);
            return false;
        }
    }

    /**
     * 启动自动同步
     */
    function startAutoSync() {
        if (state.autoSyncInterval) {
            clearInterval(state.autoSyncInterval);
        }

        state.autoSyncInterval = setInterval(async () => {
            if (state.isCloudAvailable && !state.isSyncing) {
                await syncLocalToCloud();
            }
        }, CONFIG.SYNC_INTERVAL);
    }

    /**
     * 创建标准化错误对象
     * @param {string} type - 错误类型
     * @param {string} message - 错误消息
     * @param {Error} [originalError] - 原始错误
     * @returns {Error} 错误对象
     */
    function createError(type, message, originalError) {
        const error = new Error(message);
        error.type = type;
        error.code = type;
        error.timestamp = new Date().toISOString();
        if (originalError) {
            error.original = originalError;
        }
        return error;
    }

    /**
     * 验证存储键
     * @param {string} key - 键名
     * @returns {string} 验证后的键名
     * @throws {Error} 无效键名错误
     */
    function validateKey(key) {
        if (!key || typeof key !== 'string') {
            throw createError(ErrorType.INVALID_KEY, '无效的存储键名');
        }

        // 自动添加前缀
        if (!key.startsWith(CONFIG.PREFIX)) {
            return `${CONFIG.PREFIX}${key}`;
        }

        return key;
    }

    /**
     * 验证存储值
     * @param {*} value - 值
     * @param {string} [type] - 期望类型
     * @returns {*} 验证后的值
     * @throws {Error} 无效值或类型不匹配错误
     */
    function validateValue(value, type) {
        // 检查是否为undefined
        if (value === undefined) {
            throw createError(ErrorType.INVALID_VALUE, '存储值不能为undefined');
        }

        // 类型检查
        if (type && typeof value !== type) {
            throw createError(ErrorType.TYPE_MISMATCH, 
                `值类型不匹配，期望${type}，实际${typeof value}`);
        }

        return value;
    }

    /**
     * 安全的JSON解析
     * @param {string} jsonString - JSON字符串
     * @param {*} defaultValue - 默认值
     * @returns {*} 解析结果
     */
    function safeJsonParse(jsonString, defaultValue = null) {
        if (!jsonString) return defaultValue;

        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('[Storage] JSON解析失败:', error);
            return defaultValue;
        }
    }

    /**
     * 安全的JSON字符串化
     * @param {*} data - 数据
     * @param {string} defaultValue - 默认值
     * @returns {string} JSON字符串
     */
    function safeJsonStringify(data, defaultValue = 'null') {
        try {
            return JSON.stringify(data, null, 2);
        } catch (error) {
            console.error('[Storage] JSON字符串化失败:', error);
            return defaultValue;
        }
    }

    /**
     * 加载数据 (优先云端 -> 降级本地)
     * @param {string} key - 键名
     * @param {*} defaultValue - 默认值
     * @param {string} [type] - 期望类型
     * @returns {Promise<*>} 加载的数据
     */
    async function load(key, defaultValue = null, type) {
        try {
            const validatedKey = validateKey(key);
            let data = null;

            // 1. 尝试从云端拉取
            if (state.isCloudAvailable) {
                try {
                    const cloudData = await loadFromCloud(validatedKey);
                    if (cloudData !== null) {
                        data = cloudData;
                        // 同步回本地
                        await saveToLocal(validatedKey, data);
                        notifyListeners(validatedKey, 'cloud_loaded');
                    }
                } catch (cloudError) {
                    console.warn('[Storage] 云端加载失败，降级到本地:', cloudError);
                }
            }

            // 2. 如果云端失败或没数据，读本地
            if (data === null) {
                data = loadFromLocal(validatedKey, defaultValue);
                notifyListeners(validatedKey, 'local_loaded');
            }

            // 类型验证
            if (type) {
                validateValue(data, type);
            }

            return data;
        } catch (error) {
            console.error('[Storage] 加载失败:', error);
            notifyListeners(key, 'error', error);
            return defaultValue;
        }
    }

    /**
     * 从云端加载数据
     * @param {string} key - 键名
     * @returns {Promise<*>} 数据
     */
    async function loadFromCloud(key) {
        try {
            if (!window.V5Firebase || !window.V5Firebase.db) {
                throw createError(ErrorType.CLOUD_CONNECTION_ERROR, '云端连接不可用');
            }

            const result = await window.V5Firebase.load(CONFIG.DEFAULT_COLLECTION, key);
            return result?.value !== undefined ? result.value : null;
        } catch (error) {
            throw createError(ErrorType.CLOUD_OPERATION_ERROR, '云端加载失败', error);
        }
    }

    /**
     * 从本地存储加载数据
     * @param {string} key - 键名
     * @param {*} defaultValue - 默认值
     * @returns {*} 数据
     */
    function loadFromLocal(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? safeJsonParse(value) : defaultValue;
        } catch (error) {
            console.error('[Storage] 本地加载失败:', error);
            return defaultValue;
        }
    }

    /**
     * 保存数据 (本地 + 云端双写)
     * @param {string} key - 键名
     * @param {*} value - 值
     * @param {string} [type] - 期望类型
     * @returns {Promise<boolean>} 是否成功
     */
    async function save(key, value, type) {
        try {
            const validatedKey = validateKey(key);
            validateValue(value, type);

            // 1. 存本地 (极速反馈)
            await saveToLocal(validatedKey, value);
            notifyListeners(validatedKey, 'local_saved');

            // 2. 存云端 (异步后台)
            if (state.isCloudAvailable) {
                try {
                    await saveToCloud(validatedKey, value);
                    notifyListeners(validatedKey, 'cloud_saved');
                } catch (cloudError) {
                    console.warn('[Storage] 云端保存失败，将在下次同步时重试:', cloudError);
                    queueForSync(validatedKey, value);
                }
            }

            return true;
        } catch (error) {
            console.error('[Storage] 保存失败:', error);
            notifyListeners(key, 'error', error);
            return false;
        }
    }

    /**
     * 保存到本地存储
     * @param {string} key - 键名
     * @param {*} value - 值
     * @returns {Promise<boolean>} 是否成功
     */
    async function saveToLocal(key, value) {
        try {
            const jsonValue = safeJsonStringify(value);
            localStorage.setItem(key, jsonValue);
            return true;
        } catch (error) {
            // 检查是否是存储已满错误
            if (error.name === 'QuotaExceededError') {
                throw createError(ErrorType.STORAGE_FULL, '本地存储已满', error);
            }
            throw createError(ErrorType.UNKNOWN_ERROR, '本地保存失败', error);
        }
    }

    /**
     * 保存到云端
     * @param {string} key - 键名
     * @param {*} value - 值
     * @returns {Promise<boolean>} 是否成功
     */
    async function saveToCloud(key, value) {
        try {
            if (!window.V5Firebase || !window.V5Firebase.db) {
                throw createError(ErrorType.CLOUD_CONNECTION_ERROR, '云端连接不可用');
            }

            await window.V5Firebase.save(CONFIG.DEFAULT_COLLECTION, key, {
                value: value,
                updatedAt: new Date().toISOString(),
                version: CONFIG.VERSION
            });

            state.lastSyncTime = Date.now();
            return true;
        } catch (error) {
            throw createError(ErrorType.CLOUD_OPERATION_ERROR, '云端保存失败', error);
        }
    }

    /**
     * 删除数据
     * @param {string} key - 键名
     * @returns {Promise<boolean>} 是否成功
     */
    async function remove(key) {
        try {
            const validatedKey = validateKey(key);

            // 1. 删除本地
            localStorage.removeItem(validatedKey);
            notifyListeners(validatedKey, 'local_removed');

            // 2. 删除云端
            if (state.isCloudAvailable) {
                try {
                    await window.V5Firebase.remove(CONFIG.DEFAULT_COLLECTION, validatedKey);
                    notifyListeners(validatedKey, 'cloud_removed');
                } catch (cloudError) {
                    console.warn('[Storage] 云端删除失败:', cloudError);
                }
            }

            return true;
        } catch (error) {
            console.error('[Storage] 删除失败:', error);
            notifyListeners(key, 'error', error);
            return false;
        }
    }

    /**
     * 清除所有数据
     * @returns {Promise<boolean>} 是否成功
     */
    async function clear() {
        try {
            // 1. 清除本地
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(CONFIG.PREFIX)) {
                    keysToRemove.push(key);
                }
            }

            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
                notifyListeners(key, 'local_removed');
            });

            // 2. 清除云端
            if (state.isCloudAvailable) {
                try {
                    await window.V5Firebase.clearCollection(CONFIG.DEFAULT_COLLECTION);
                    console.log('[Storage] 云端数据已清除');
                } catch (cloudError) {
                    console.warn('[Storage] 云端清除失败:', cloudError);
                }
            }

            return true;
        } catch (error) {
            console.error('[Storage] 清除失败:', error);
            return false;
        }
    }

    /**
     * 批量导出所有数据
     * @returns {Object} 导出的数据
     */
    function exportAll() {
        try {
            const data = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(CONFIG.PREFIX)) {
                    try {
                        data[key] = safeJsonParse(localStorage.getItem(key));
                    } catch (error) {
                        console.warn('[Storage] 导出解析失败:', key, error);
                        data[key] = null;
                    }
                }
            }
            return data;
        } catch (error) {
            console.error('[Storage] 导出失败:', error);
            return {};
        }
    }

    /**
     * 批量导入数据
     * @param {Object} data - 导入的数据
     * @returns {Promise<boolean>} 是否成功
     */
    async function importAll(data) {
        try {
            if (!data || typeof data !== 'object') {
                throw createError(ErrorType.INVALID_VALUE, '导入数据必须是对象');
            }

            const keys = Object.keys(data);
            for (const key of keys) {
                await save(key, data[key]);
            }

            return true;
        } catch (error) {
            console.error('[Storage] 导入失败:', error);
            return false;
        }
    }

    /**
     * 同步本地到云端
     * @returns {Promise<boolean>} 是否成功
     */
    async function syncLocalToCloud() {
        if (state.isSyncing || !state.isCloudAvailable) return false;

        state.isSyncing = true;
        try {
            const localData = exportAll();
            const keys = Object.keys(localData);

            for (const key of keys) {
                try {
                    await saveToCloud(key, localData[key]);
                    notifyListeners(key, 'synced');
                } catch (error) {
                    console.warn('[Storage] 同步失败:', key, error);
                    queueForSync(key, localData[key]);
                }
            }

            state.lastSyncTime = Date.now();
            return true;
        } catch (error) {
            console.error('[Storage] 同步失败:', error);
            return false;
        } finally {
            state.isSyncing = false;
        }
    }

    /**
     * 队列同步
     * @param {string} key - 键名
     * @param {*} value - 值
     */
    function queueForSync(key, value) {
        if (!state.syncQueue) {
            state.syncQueue = new Map();
        }
        state.syncQueue.set(key, value);
    }

    /**
     * 处理队列同步
     * @returns {Promise<boolean>} 是否成功
     */
    async function processSyncQueue() {
        if (!state.syncQueue || state.syncQueue.size === 0) return false;

        const queue = new Map(state.syncQueue);
        state.syncQueue.clear();

        for (const [key, value] of queue) {
            try {
                await saveToCloud(key, value);
                notifyListeners(key, 'synced');
            } catch (error) {
                console.warn('[Storage] 队列同步失败:', key, error);
                // 如果重试次数未达上限，重新加入队列
                if (state.retryCount < CONFIG.MAX_RETRY) {
                    state.retryCount++;
                    setTimeout(() => queueForSync(key, value), CONFIG.RETRY_DELAY * state.retryCount);
                }
            }
        }

        state.retryCount = 0;
        return true;
    }

    /**
     * 添加事件监听器
     * @param {string} key - 键名
     * @param {Function} callback - 回调函数
     * @returns {string} 监听器ID
     */
    function addListener(key, callback) {
        if (typeof callback !== 'function') {
            throw createError(ErrorType.INVALID_VALUE, '回调必须是函数');
        }

        const validatedKey = validateKey(key);
        if (!state.listeners.has(validatedKey)) {
            state.listeners.set(validatedKey, new Map());
        }

        const listenerId = `listener_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        state.listeners.get(validatedKey).set(listenerId, callback);

        return listenerId;
    }

    /**
     * 移除事件监听器
     * @param {string} key - 键名
     * @param {string} listenerId - 监听器ID
     * @returns {boolean} 是否成功
     */
    function removeListener(key, listenerId) {
        const validatedKey = validateKey(key);
        if (state.listeners.has(validatedKey)) {
            const listeners = state.listeners.get(validatedKey);
            if (listeners.has(listenerId)) {
                listeners.delete(listenerId);
                return true;
            }
        }
        return false;
    }

    /**
     * 通知监听器
     * @param {string} key - 键名
     * @param {string} event - 事件类型
     * @param {*} [data] - 事件数据
     */
    function notifyListeners(key, event, data) {
        const validatedKey = validateKey(key);
        if (state.listeners.has(validatedKey)) {
            const listeners = state.listeners.get(validatedKey);
            listeners.forEach(callback => {
                try {
                    callback({
                        key: validatedKey,
                        event: event,
                        data: data,
                        timestamp: Date.now()
                    });
                } catch (error) {
                    console.error('[Storage] 监听器回调失败:', error);
                }
            });
        }
    }

    /**
     * 获取存储状态
     * @returns {Object} 状态信息
     */
    function getStatus() {
        return {
            isCloudAvailable: state.isCloudAvailable,
            isSyncing: state.isSyncing,
            lastSyncTime: state.lastSyncTime,
            queueSize: state.syncQueue ? state.syncQueue.size : 0,
            itemCount: Object.keys(exportAll()).length,
            version: CONFIG.VERSION
        };
    }

    /**
     * 类型化存储方法
     */
    const typedStorage = {
        /**
         * 加载字符串
         * @param {string} key - 键名
         * @param {string} defaultValue - 默认值
         * @returns {Promise<string>} 字符串
         */
        loadString: (key, defaultValue = '') => load(key, defaultValue, 'string'),

        /**
         * 加载数字
         * @param {string} key - 键名
         * @param {number} defaultValue - 默认值
         * @returns {Promise<number>} 数字
         */
        loadNumber: (key, defaultValue = 0) => load(key, defaultValue, 'number'),

        /**
         * 加载布尔值
         * @param {string} key - 键名
         * @param {boolean} defaultValue - 默认值
         * @returns {Promise<boolean>} 布尔值
         */
        loadBoolean: (key, defaultValue = false) => load(key, defaultValue, 'boolean'),

        /**
         * 加载对象
         * @param {string} key - 键名
         * @param {Object} defaultValue - 默认值
         * @returns {Promise<Object>} 对象
         */
        loadObject: (key, defaultValue = {}) => load(key, defaultValue, 'object'),

        /**
         * 加载数组
         * @param {string} key - 键名
         * @param {Array} defaultValue - 默认值
         * @returns {Promise<Array>} 数组
         */
        loadArray: (key, defaultValue = []) => load(key, defaultValue).then(value => 
            Array.isArray(value) ? value : defaultValue
        )
    };

    // 公共API
    const api = {
        // 初始化
        init,
        
        // 基础操作
        load,
        save,
        remove,
        clear,
        
        // 批量操作
        exportAll,
        importAll,
        
        // 同步操作
        sync: syncLocalToCloud,
        getStatus,
        
        // 事件监听
        addListener,
        removeListener,
        
        // 类型化方法
        ...typedStorage,
        
        // 常量
        ErrorType,
        CONFIG
    };

    // 自动初始化
    document.addEventListener('DOMContentLoaded', async () => {
        await init();
    });

    return api;
})();

// 挂载到全局
window.WorkbenchStorage = WorkbenchStorage;

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchStorage;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchStorage);
}