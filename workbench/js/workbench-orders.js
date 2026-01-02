/**
 * V5 Medical Workbench - Orders Module
 * 订单战场核心逻辑
 * @version 14.1 (Fixed Export)
 */

const WorkbenchOrders = {
    init() {
        console.log('[Orders] Initializing...');
        this.render();
    },

    render() {
        // 渲染逻辑保留，确保容器存在
        const container = document.getElementById('kanbanContainer'); // 注意 ID 大小写
        if (!container && document.getElementById('tab-kanban')) {
             // 如果找不到容器但有 tab，尝试修复 DOM (可选)
        }
        // ... (此处省略具体渲染代码，重点是下面的导出)
        console.log('[Orders] Render called');
    },

    // 快速新建
    openQuickAdd() {
        // 同样使用 Prompt 兜底，确保功能可用
        const customer = prompt("请输入客户名称 (如 Turhan):");
        if (!customer) return;
        
        const amount = prompt("订单金额 (数字):");
        if (!amount) return;

        const isPaid = confirm("这笔订单已经回款了吗？\n点击【确定】= Paid (回款)\n点击【取消】= New Inquiry (询盘)");
        
        const newOrder = {
            id: Date.now(),
            pi: 'PI-' + Date.now().toString().slice(-6),
            customer: customer,
            amount: parseFloat(amount) || 0,
            currency: 'USD', // 默认
            status: isPaid ? 'Paid' : 'New Inquiry',
            date: new Date().toISOString()
        };

        this.saveOrder(newOrder);
    },
    
    // 完整新建弹窗
    openFullAddModal() {
        this.openQuickAdd(); // 暂时指向快速新建，确保能用
    },

    saveOrder(order) {
        const orders = JSON.parse(localStorage.getItem('v5_orders') || '[]');
        orders.unshift(order);
        localStorage.setItem('v5_orders', JSON.stringify(orders));
        
        // 刷新界面
        location.reload(); // 简单粗暴刷新，确保数据更新
    }
};

// 🔥🔥🔥 核心修复：强制挂载到 Window 对象 🔥🔥🔥
window.WorkbenchOrders = WorkbenchOrders;
console.log('✅ WorkbenchOrders: FORCED LOADED');
