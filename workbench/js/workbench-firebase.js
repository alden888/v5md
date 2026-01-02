/**
 * V14.1 Firebase Connection Module
 * 负责与 Google Cloud Firestore 通信
 */

// 🔴 请替换为您在 Firebase 后台复制的真实配置
const firebaseConfig = {
  apiKey: "AIzaSyBVV_GTqIe-Wu7D10h2P_Ti8q-MbUK-qiY", // 替换
  authDomain: "v5-erp.firebaseapp.com",   // 替换
  projectId: "v5-erp",                    // 替换
  storageBucket: "v5-erp.firebasestorage.app",    // 替换
  messagingSenderId: "551027305578",         // 替换
  appId: "1:551027305578:web:0e78a2fba1e41d4532ee13"    // 替换
};

// 初始化 Firebase
let db = null;
let auth = null;

try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    console.log('[Firebase] Connected successfully ☁️');
    
    // 启用离线持久化 (这是 Firebase 的黑科技，断网也能用，联网自动同步)
    db.enablePersistence().catch((err) => {
        console.warn('[Firebase] Persistence failed:', err.code);
    });

} catch (e) {
    console.error('[Firebase] Initialization failed:', e);
}

// 挂载到全局
window.V5Firebase = {
    db: db,
    
    // 保存数据到云端
    async save(collection, docId, data) {
        if (!db) return false;
        try {
            await db.collection(collection).doc(docId).set(data, { merge: true });
            console.log(`[Cloud] Saved ${collection}/${docId}`);
            return true;
        } catch (e) {
            console.error('[Cloud] Save Error:', e);
            return false;
        }
    },

    // 从云端读取数据
    async load(collection, docId) {
        if (!db) return null;
        try {
            const doc = await db.collection(collection).doc(docId).get();
            if (doc.exists) {
                console.log(`[Cloud] Loaded ${collection}/${docId}`);
                return doc.data();
            }
            return null;
        } catch (e) {
            console.error('[Cloud] Load Error:', e);
            return null;
        }
    }
};
