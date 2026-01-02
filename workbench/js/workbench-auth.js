// ============================================
// V14.0 ERP - AUTHENTICATION MODULE
// ============================================

const WorkbenchAuth = {
    init() {
        console.log('[Auth] Initializing authentication...');
        // Simplified auth - can be extended
        return this;
    },
    
    checkAuth() {
        // Simple check - can be extended with real auth
        return true;
    }
};

// 🔥 FIX: 显式挂载到 window 对象
window.WorkbenchAuth = WorkbenchAuth;
