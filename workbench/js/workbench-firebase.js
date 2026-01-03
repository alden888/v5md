/**
 * V14.2 Firebase Connection Module
 * 负责与 Google Cloud Firestore 通信
 * @namespace WorkbenchFirebase
 */
const WorkbenchFirebase = (() => {
    'use strict';

    // 默认配置模板
    const DEFAULT_CONFIG = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    // 模块状态
    const state = {
        isInitialized: false,
        isConnected: false,
        isPersistenceEnabled: false,
        db: null,
        auth: null,
        storage: null,
        functions: null,
        config: null,
        error: null
    };

    /**
     * 初始化Firebase
     * @param {Object} config - Firebase配置
     * @returns {Promise<boolean>} 是否成功
     */
    async function initialize(config = null) {
        try {
            if (state.isInitialized) {
                console.warn('[Firebase] 已初始化，跳过重复初始化');
                return true;
            }

            console.log('[Firebase] 初始化中...');

            // 验证Firebase SDK是否加载
            if (typeof firebase === 'undefined') {
                throw new Error('Firebase SDK未加载，请确保已包含Firebase脚本');
            }

            // 使用提供的配置或默认配置
            state.config = config || DEFAULT_CONFIG;

            // 验证配置完整性
            validateConfig(state.config);

            // 初始化Firebase应用
            const app = firebase.initializeApp(state.config);
            
            // 初始化服务
            state.db = app.firestore();
            state.auth = app.auth();
            state.storage = app.storage();
            state.functions = app.functions();

            // 启用离线持久化
            await enablePersistence();

            // 设置连接状态监听
            setupConnectionListeners();

            // 初始化认证状态
            await initializeAuthState();

            state.isInitialized = true;
            state.isConnected = true;

            console.log('[Firebase] 初始化成功 ✅');
            return true;
        } catch (error) {
            state.error = error;
            console.error('[Firebase] 初始化失败 ❌:', error.message);
            return false;
        }
    }

    /**
     * 验证配置完整性
     * @param {Object} config - 配置对象
     * @throws {Error} 配置不完整时抛出错误
     */
    function validateConfig(config) {
        const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
        
        for (const field of requiredFields) {
            if (!config[field] || config[field] === DEFAULT_CONFIG[field]) {
                throw new Error(`Firebase配置不完整，请设置有效的${field}`);
            }
        }
    }

    /**
     * 启用离线持久化
     * @returns {Promise<void>}
     */
    async function enablePersistence() {
        try {
            await state.db.enablePersistence({
                synchronizeTabs: true
            });
            state.isPersistenceEnabled = true;
            console.log('[Firebase] 离线持久化已启用 📱');
        } catch (error) {
            console.warn('[Firebase] 离线持久化启用失败:', error.code);
            state.isPersistenceEnabled = false;
            
            // 根据错误类型提供解决方案
            if (error.code === 'failed-precondition') {
                console.warn('[Firebase] 提示: 多个标签页打开时，离线持久化可能无法正常工作');
            } else if (error.code === 'unimplemented') {
                console.warn('[Firebase] 提示: 当前浏览器不支持离线持久化');
            }
        }
    }

    /**
     * 设置连接状态监听
     */
    function setupConnectionListeners() {
        // 网络连接状态监听
        firebase.firestore().enableNetwork()
            .then(() => {
                state.isConnected = true;
                console.log('[Firebase] 已连接到网络 🌐');
            })
            .catch(error => {
                state.isConnected = false;
                console.warn('[Firebase] 网络连接失败:', error);
            });

        // 监听网络状态变化
        firebase.firestore().onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
            const isConnected = snapshot.metadata.fromCache ? false : true;
            if (isConnected !== state.isConnected) {
                state.isConnected = isConnected;
                console.log(`[Firebase] 连接状态变化: ${isConnected ? '在线' : '离线'}`);
            }
        });
    }

    /**
     * 初始化认证状态
     * @returns {Promise<void>}
     */
    async function initializeAuthState() {
        return new Promise((resolve) => {
            state.auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log('[Firebase] 用户已登录:', user.email);
                } else {
                    console.log('[Firebase] 用户未登录');
                }
                resolve();
            });
        });
    }

    /**
     * 保存数据到云端
     * @param {string} collection - 集合名称
     * @param {string} docId - 文档ID
     * @param {Object} data - 数据对象
     * @param {boolean} merge - 是否合并数据
     * @returns {Promise<boolean>} 是否成功
     */
    async function save(collection, docId, data, merge = true) {
        try {
            validateInitialization();
            validateCollectionName(collection);
            validateDocumentId(docId);
            validateData(data);

            await state.db.collection(collection).doc(docId).set(data, { merge });
            console.log(`[Firebase] 已保存 ${collection}/${docId}`);
            return true;
        } catch (error) {
            console.error('[Firebase] 保存失败:', error.message);
            return false;
        }
    }

    /**
     * 从云端读取数据
     * @param {string} collection - 集合名称
     * @param {string} docId - 文档ID
     * @returns {Promise<Object|null>} 文档数据
     */
    async function load(collection, docId) {
        try {
            validateInitialization();
            validateCollectionName(collection);
            validateDocumentId(docId);

            const doc = await state.db.collection(collection).doc(docId).get();
            
            if (doc.exists) {
                console.log(`[Firebase] 已加载 ${collection}/${docId}`);
                return {
                    ...doc.data(),
                    _id: doc.id,
                    _exists: true,
                    _metadata: doc.metadata
                };
            }
            
            console.log(`[Firebase] 文档 ${collection}/${docId} 不存在`);
            return null;
        } catch (error) {
            console.error('[Firebase] 加载失败:', error.message);
            return null;
        }
    }

    /**
     * 查询集合数据
     * @param {string} collection - 集合名称
     * @param {Array} queries - 查询条件数组
     * @param {Object} options - 查询选项
     * @returns {Promise<Array>} 查询结果
     */
    async function query(collection, queries = [], options = {}) {
        try {
            validateInitialization();
            validateCollectionName(collection);

            let queryRef = state.db.collection(collection);

            // 应用查询条件
            queries.forEach(([field, operator, value]) => {
                queryRef = queryRef.where(field, operator, value);
            });

            // 应用排序
            if (options.orderBy) {
                const { field, direction = 'asc' } = options.orderBy;
                queryRef = queryRef.orderBy(field, direction);
            }

            // 应用限制
            if (options.limit) {
                queryRef = queryRef.limit(options.limit);
            }

            // 应用分页
            if (options.startAfter) {
                queryRef = queryRef.startAfter(options.startAfter);
            }

            const snapshot = await queryRef.get();
            
            const results = [];
            snapshot.forEach(doc => {
                results.push({
                    ...doc.data(),
                    _id: doc.id,
                    _exists: true,
                    _metadata: doc.metadata
                });
            });

            console.log(`[Firebase] 查询 ${collection} 返回 ${results.length} 条结果`);
            return results;
        } catch (error) {
            console.error('[Firebase] 查询失败:', error.message);
            return [];
        }
    }

    /**
     * 删除文档
     * @param {string} collection - 集合名称
     * @param {string} docId - 文档ID
     * @returns {Promise<boolean>} 是否成功
     */
    async function remove(collection, docId) {
        try {
            validateInitialization();
            validateCollectionName(collection);
            validateDocumentId(docId);

            await state.db.collection(collection).doc(docId).delete();
            console.log(`[Firebase] 已删除 ${collection}/${docId}`);
            return true;
        } catch (error) {
            console.error('[Firebase] 删除失败:', error.message);
            return false;
        }
    }

    /**
     * 批量操作
     * @param {Array} operations - 操作数组
     * @returns {Promise<boolean>} 是否成功
     */
    async function batch(operations) {
        try {
            validateInitialization();
            
            if (!Array.isArray(operations) || operations.length === 0) {
                throw new Error('批量操作数组不能为空');
            }

            const batch = state.db.batch();

            operations.forEach(op => {
                const { type, collection, docId, data } = op;
                
                validateCollectionName(collection);
                validateDocumentId(docId);

                const docRef = state.db.collection(collection).doc(docId);

                switch (type) {
                    case 'set':
                        validateData(data);
                        batch.set(docRef, data);
                        break;
                    case 'update':
                        validateData(data);
                        batch.update(docRef, data);
                        break;
                    case 'delete':
                        batch.delete(docRef);
                        break;
                    default:
                        throw new Error(`不支持的操作类型: ${type}`);
                }
            });

            await batch.commit();
            console.log(`[Firebase] 批量操作已完成 (${operations.length} 个操作)`);
            return true;
        } catch (error) {
            console.error('[Firebase] 批量操作失败:', error.message);
            return false;
        }
    }

    /**
     * 上传文件到存储
     * @param {string} path - 存储路径
     * @param {File} file - 文件对象
     * @param {Object} metadata - 文件元数据
     * @returns {Promise<Object>} 上传结果
     */
    async function uploadFile(path, file, metadata = {}) {
        try {
            validateInitialization();
            
            if (!path || typeof path !== 'string') {
                throw new Error('存储路径不能为空');
            }

            if (!(file instanceof File)) {
                throw new Error('必须提供有效的File对象');
            }

            const storageRef = state.storage.ref(path);
            const uploadTask = storageRef.put(file, metadata);

            return new Promise((resolve, reject) => {
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`[Firebase] 文件上传进度: ${progress.toFixed(2)}%`);
                    },
                    (error) => {
                        console.error('[Firebase] 文件上传失败:', error.message);
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                        console.log(`[Firebase] 文件上传成功: ${downloadURL}`);
                        resolve({
                            path,
                            downloadURL,
                            metadata: uploadTask.snapshot.metadata
                        });
                    }
                );
            });
        } catch (error) {
            console.error('[Firebase] 文件上传失败:', error.message);
            throw error;
        }
    }

    /**
     * 删除存储中的文件
     * @param {string} path - 存储路径
     * @returns {Promise<boolean>} 是否成功
     */
    async function deleteFile(path) {
        try {
            validateInitialization();
            
            if (!path || typeof path !== 'string') {
                throw new Error('存储路径不能为空');
            }

            const storageRef = state.storage.ref(path);
            await storageRef.delete();
            console.log(`[Firebase] 文件已删除: ${path}`);
            return true;
        } catch (error) {
            console.error('[Firebase] 文件删除失败:', error.message);
            return false;
        }
    }

    /**
     * 用户登录
     * @param {string} email - 邮箱
     * @param {string} password - 密码
     * @returns {Promise<Object>} 用户信息
     */
    async function login(email, password) {
        try {
            validateInitialization();
            
            if (!email || !password) {
                throw new Error('邮箱和密码不能为空');
            }

            const userCredential = await state.auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            console.log('[Firebase] 用户登录成功:', user.email);
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified
            };
        } catch (error) {
            console.error('[Firebase] 登录失败:', error.message);
            throw error;
        }
    }

    /**
     * 用户注册
     * @param {string} email - 邮箱
     * @param {string} password - 密码
     * @param {string} displayName - 显示名称
     * @returns {Promise<Object>} 用户信息
     */
    async function register(email, password, displayName = '') {
        try {
            validateInitialization();
            
            if (!email || !password) {
                throw new Error('邮箱和密码不能为空');
            }

            const userCredential = await state.auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // 设置显示名称
            if (displayName) {
                await user.updateProfile({ displayName });
            }

            console.log('[Firebase] 用户注册成功:', user.email);
            return {
                uid: user.uid,
                email: user.email,
                displayName: displayName || user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified
            };
        } catch (error) {
            console.error('[Firebase] 注册失败:', error.message);
            throw error;
        }
    }

    /**
     * 用户登出
     * @returns {Promise<boolean>} 是否成功
     */
    async function logout() {
        try {
            validateInitialization();
            
            await state.auth.signOut();
            console.log('[Firebase] 用户已登出');
            return true;
        } catch (error) {
            console.error('[Firebase] 登出失败:', error.message);
            return false;
        }
    }

    /**
     * 获取当前用户
     * @returns {Object|null} 用户信息
     */
    function getCurrentUser() {
        try {
            validateInitialization();
            
            const user = state.auth.currentUser;
            if (!user) return null;

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified
            };
        } catch (error) {
            console.error('[Firebase] 获取用户失败:', error.message);
            return null;
        }
    }

    /**
     * 调用云函数
     * @param {string} functionName - 函数名称
     * @param {Object} data - 函数参数
     * @returns {Promise<any>} 函数返回值
     */
    async function callFunction(functionName, data = {}) {
        try {
            validateInitialization();
            
            if (!functionName || typeof functionName !== 'string') {
                throw new Error('函数名称不能为空');
            }

            const callable = state.functions.httpsCallable(functionName);
            const result = await callable(data);
            
            console.log(`[Firebase] 云函数 ${functionName} 调用成功`);
            return result.data;
        } catch (error) {
            console.error('[Firebase] 云函数调用失败:', error.message);
            throw error;
        }
    }

    /**
     * 验证初始化状态
     * @throws {Error} 未初始化时抛出错误
     */
    function validateInitialization() {
        if (!state.isInitialized || !state.db) {
            throw new Error('Firebase尚未初始化，请先调用initialize()');
        }
    }

    /**
     * 验证集合名称
     * @param {string} collection - 集合名称
     * @throws {Error} 无效集合名称时抛出错误
     */
    function validateCollectionName(collection) {
        if (!collection || typeof collection !== 'string' || collection.trim() === '') {
            throw new Error('集合名称不能为空');
        }
    }

    /**
     * 验证文档ID
     * @param {string} docId - 文档ID
     * @throws {Error} 无效文档ID时抛出错误
     */
    function validateDocumentId(docId) {
        if (!docId || typeof docId !== 'string' || docId.trim() === '') {
            throw new Error('文档ID不能为空');
        }
    }

    /**
     * 验证数据对象
     * @param {Object} data - 数据对象
     * @throws {Error} 无效数据时抛出错误
     */
    function validateData(data) {
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('数据必须是有效的对象');
        }
    }

    /**
     * 获取模块状态
     * @returns {Object} 状态信息
     */
    function getStatus() {
        return {
            isInitialized: state.isInitialized,
            isConnected: state.isConnected,
            isPersistenceEnabled: state.isPersistenceEnabled,
            hasAuth: !!state.auth,
            hasStorage: !!state.storage,
            hasFunctions: !!state.functions,
            error: state.error ? {
                message: state.error.message,
                code: state.error.code
            } : null
        };
    }

    /**
     * 生成唯一ID
     * @param {string} prefix - 前缀
     * @returns {string} 唯一ID
     */
    function generateId(prefix = 'doc') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // 公共API
    const api = {
        // 初始化
        initialize,
        
        // 核心操作
        save,
        load,
        query,
        remove,
        batch,
        
        // 文件存储
        uploadFile,
        deleteFile,
        
        // 认证
        login,
        register,
        logout,
        getCurrentUser,
        
        // 云函数
        callFunction,
        
        // 工具方法
        getStatus,
        generateId,
        
        // 常量
        DEFAULT_CONFIG
    };

    // 自动初始化（如果配置已设置）
    document.addEventListener('DOMContentLoaded', async () => {
        // 检查是否有全局配置
        if (window.WorkbenchConfig && window.WorkbenchConfig.firebase) {
            await initialize(window.WorkbenchConfig.firebase);
        }
    });

    return api;
})();

// 挂载到全局
window.WorkbenchFirebase = WorkbenchFirebase;

// 兼容旧版API
window.V5Firebase = {
    db: WorkbenchFirebase.db,
    save: (collection, docId, data) => WorkbenchFirebase.save(collection, docId, data),
    load: (collection, docId) => WorkbenchFirebase.load(collection, docId)
};

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchFirebase;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchFirebase);
}