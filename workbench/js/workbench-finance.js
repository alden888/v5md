// ============================================
// js/workbench-finance.js - 新建（运营支出等功能）
// ============================================

const WorkbenchFinance = {
    init() {
        console.log('[Finance] Initializing...');
        return this;
    },
    
    showXTransferInfo() {
        const modal = document.getElementById('xtransfer-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
        }
    },
    
    closeXTransferInfo() {
        const modal = document.getElementById('xtransfer-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('active');
        }
    },
    
    copyBankInfo() {
        const info = `Beneficiary: Kunshan Vvohoo Industry Co., Ltd
Bank: JPMorgan Chase Bank N.A.
Account: 63007935038
SWIFT: CHASHKHH`;
        
        WorkbenchUtils.copyToClipboard(info);
    }
};
// ============================================
// js/workbench-finance.js - 末尾添加
// ============================================

// ... (所有现有代码保持不变) ...

// 🔥 FIX: 显式挂载到window对象
window.WorkbenchFinance = WorkbenchFinance;
