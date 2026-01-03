/**
 * 存储模块 - 完整优化版
 * 包含键名验证、数据CRUD、异常处理
 */

// 常量定义（兜底）
const STORAGE_CONFIG = {
    PREFIX: 'workbench_', // 存储键前缀
    MAX_KEY_LENGTH: 100,  // 最大键名长度
    EXPIRY_SUFFIX: '_expiry' // 过期时间键后缀
};

const STORAGE_ERROR_TYPE = {
    INVALID_KEY: 'INVALID_KEY',
    KEY_TOO_LONG: 'KEY_TOO_LONG',
    STORAGE_FULL: 'STORAGE_FULL',
    EXPIRED: 'EXPIRED'
};

/**
 * 创建标准化错误对象
 * @param {string} type - 错误类型
 * @param {string} message - 错误信息
 * @returns {Error} 错误对象
 */
function createStorageError(type, message) {
    const error = new Error(message);
    error.type = type;
    return error;
}

/**
 * 验证存储键合法性
 * @param {string} key - 键名
 * @returns {string} 验证后的键名（带前缀）
 * @throws {Error} 无效键名错误
 */
function validateStorageKey(key) {
    // 1. 基础类型校验
    if (!key || typeof key !== 'string') {
        throw createStorageError(STORAGE_ERROR_TYPE.INVALID_KEY, '无效的存储键名：必须为非空字符串');
    }

    // 2. 特殊字符/空格校验
    const trimmedKey = key.trim();
    if (trimmedKey.length === 0) {
        throw createStorageError(STORAGE_ERROR_TYPE.INVALID_KEY, '无效的存储键名：不能仅包含空格');
    }
    const illegalChars = /[\\/:*?"<>|]/; // 禁止文件系统非法字符
    if (illegalChars.test(trimmedKey)) {
        throw createStorageError(STORAGE_ERROR_TYPE.INVALID_KEY, '无效的存储键名：包含非法字符（\\/:*?"<>|）');
    }

    // 3. 长度校验
    const finalKey = trimmedKey.startsWith(STORAGE_CONFIG.PREFIX) 
        ? trimmedKey 
        : `${STORAGE_CONFIG.PREFIX}${trimmedKey}`;
    
    if (finalKey.length > STORAGE_CONFIG.MAX_KEY_LENGTH) {
        throw createStorageError(STORAGE_ERROR_TYPE.KEY_TOO_LONG, `键名过长（最大${STORAGE_CONFIG.MAX_KEY_LENGTH}字符）`);
    }

    return finalKey;
}

/**
 * 安全验证存储键（兜底版，不抛出异常）
 * @param {string} key - 键名
 * @returns {string|null} 验证后的键名（失败返回null）
 */
function safeValidateStorageKey(key) {
    try {
        return validateStorageKey(key);
    } catch (error) {
        console.error('[Storage] 键名验证失败:', error);
        (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast(`存储键验证失败：${error.message}`, 'error');
        return null;
    }
}

/**
 * 设置本地存储（支持过期时间）
 * @param {string} key - 键名
 * @param {any} value - 存储值
 * @param {number} expiryMinutes - 过期时间（分钟，0为永不过期）
 * @returns {boolean} 是否成功
 */
function setStorage(key, value, expiryMinutes = 0) {
    try {
        const finalKey = validateStorageKey(key);
        if (!finalKey) return false;

        // 序列化值（处理循环引用）
        let serializedValue;
        try {
            serializedValue = JSON.stringify(value);
        } catch (error) {
            throw createStorageError('SERIALIZE_ERROR', `值序列化失败：${error.message}`);
        }

        // 存储值
        localStorage.setItem(finalKey, serializedValue);

        // 存储过期时间（如果设置）
        if (expiryMinutes > 0) {
            const expiryTime = Date.now() + (expiryMinutes * 60 * 1000);
            localStorage.setItem(`${finalKey}${STORAGE_CONFIG.EXPIRY_SUFFIX}`, expiryTime.toString());
        } else {
            // 清除已存在的过期时间
            localStorage.removeItem(`${finalKey}${STORAGE_CONFIG.EXPIRY_SUFFIX}`);
        }

        console.log(`[Storage] 数据已存储：${finalKey}`);
        return true;
    } catch (error) {
        // 处理存储满的情况
        if (error.name === 'QuotaExceededError') {
            error.type = STORAGE_ERROR_TYPE.STORAGE_FULL;
            error.message = '本地存储已满，无法存储数据';
        }
        console.error('[Storage] 设置存储失败:', error);
        (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast(`存储失败：${error.message}`, 'error');
        return false;
    }
}

/**
 * 获取本地存储值
 * @param {string} key - 键名
 * @returns {any|null} 存储值（过期/不存在返回null）
 */
function getStorage(key) {
    try {
        const finalKey = validateStorageKey(key);
        if (!finalKey) return null;

        // 检查过期时间
        const expiryKey = `${finalKey}${STORAGE_CONFIG.EXPIRY_SUFFIX}`;
        const expiryTimeStr = localStorage.getItem(expiryKey);
        if (expiryTimeStr) {
            const expiryTime = Number(expiryTimeStr);
            if (Date.now() > expiryTime) {
                // 已过期，删除数据
                removeStorage(key);
                throw createStorageError(STORAGE_ERROR_TYPE.EXPIRED, `存储键 ${key} 已过期`);
            }
        }

        // 获取并反序列化值
        const serializedValue = localStorage.getItem(finalKey);
        if (serializedValue === null) return null;

        try {
            return JSON.parse(serializedValue);
        } catch (error) {
            throw createStorageError('DESERIALIZE_ERROR', `值反序列化失败：${error.message}`);
        }
    } catch (error) {
        if (error.type !== STORAGE_ERROR_TYPE.EXPIRED) {
            console.error('[Storage] 获取存储失败:', error);
            (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast(`获取存储失败：${error.message}`, 'error');
        }
        return null;
    }
}

/**
 * 删除本地存储
 * @param {string} key - 键名
 * @returns {boolean} 是否成功
 */
function removeStorage(key) {
    try {
        const finalKey = validateStorageKey(key);
        if (!finalKey) return false;

        // 删除值和过期时间
        localStorage.removeItem(finalKey);
        localStorage.removeItem(`${finalKey}${STORAGE_CONFIG.EXPIRY_SUFFIX}`);

        console.log(`[Storage] 数据已删除：${finalKey}`);
        return true;
    } catch (error) {
        console.error('[Storage] 删除存储失败:', error);
        (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast(`删除存储失败：${error.message}`, 'error');
        return false;
    }
}

/**
 * 清空所有workbench前缀的存储
 * @returns {boolean} 是否成功
 */
function clearWorkbenchStorage() {
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(STORAGE_CONFIG.PREFIX)) {
                localStorage.removeItem(key);
            }
        });
        console.log('[Storage] Workbench存储已清空');
        return true;
    } catch (error) {
        console.error('[Storage] 清空存储失败:', error);
        (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast(`清空存储失败：${error.message}`, 'error');
        return false;
    }
}

/**
 * 获取存储占用大小（字节）
 * @returns {number} 占用字节数
 */
function getStorageSize() {
    try {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            total += key.length + (value ? value.length : 0);
        }
        return total;
    } catch (error) {
        console.error('[Storage] 获取存储大小失败:', error);
        return 0;
    }
}

// 暴露全局方法
window.validateStorageKey = validateStorageKey;
window.safeValidateStorageKey = safeValidateStorageKey;
window.setStorage = setStorage;
window.getStorage = getStorage;
window.removeStorage = removeStorage;
window.clearWorkbenchStorage = clearWorkbenchStorage;
window.getStorageSize = getStorageSize;
window.STORAGE_CONFIG = STORAGE_CONFIG;
window.STORAGE_ERROR_TYPE = STORAGE_ERROR_TYPE;