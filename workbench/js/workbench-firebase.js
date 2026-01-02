/**
 * V14.1 Firebase Connection Module
 * 负责与 Google Cloud Firestore 通信
 */

// 🔴 请替换为您在 Firebase 后台复制的真实配置
const firebaseConfig = {
  apiKey: "AIzaSyDBb8AtMjSzjgh1SDmIQNJPHUPxk6tLhQQ", // 替换
  authDomain: "v5merp.firebaseapp.com",   // 替换
  projectId: "v5merp",                    // 替换
  storageBucket: "v5merp.firebasestorage.app",    // 替换
  messagingSenderId: "393124793142",         // 替换
  appId: "1:393124793142:web:f669fb0287683970d38197"    // 替换
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
