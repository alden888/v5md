// ============================================
// V14.1 ERP - AUTHENTICATION MODULE
// ============================================

const WorkbenchAuth = {
    init() {
        console.log('[Auth] Initializing...');
        return this;
    },
    
    checkAuth() {
        return true; // 简化版：总是通过
    }
};

window.WorkbenchAuth = WorkbenchAuth;
