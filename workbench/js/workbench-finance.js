// ============================================
// V14.0 ERP - FINANCE & EXPENSES MODULE
// ============================================

const WorkbenchFinance = {
    init() {
        console.log('[Finance] Initializing finance module...');
        return this;
    },
    
    showExpenses() {
        // Show expenses tab
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.add('hidden');
        });
        
        const expensesTab = document.getElementById('expenses-tab');
        if (expensesTab) {
            expensesTab.classList.remove('hidden');
        }
        
        this.updateExpensesList();
    },
    
    updateExpensesList() {
        const container = document.getElementById('expenses-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (WorkbenchDashboard.data.expenses.length === 0) {
            container.innerHTML = '<div class="text-center text-slate-400 py-12">暂无支出记录</div>';
            return;
        }
        
        // Render expenses list
        WorkbenchDashboard.data.expenses.forEach(expense => {
            // Create expense card/row
        });
    }
};

// 🔥 FIX: 显式挂载到 window 对象
window.WorkbenchFinance = WorkbenchFinance;
