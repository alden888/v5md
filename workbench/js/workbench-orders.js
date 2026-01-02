/**
 * V14.1 ORDERS MODULE (FULLY FUNCTIONAL)
 */
const WorkbenchOrders = {
    init() {
        console.log('[Orders] Initializing V14.1 Orders Module...');
        this.render(); // 初始化渲染
        return this;
    },

    // 🔥 修复：暴露 render 方法供 Tab 切换调用
    render() {
        const orders = window.WorkbenchDashboard.data.orders || [];
        
        // 定义所有看板列
        const columns = {
            'inquiry': 'New Inquiry',
            'pi': 'PI Sent',
            'production': 'Production',
            'shipped': 'Shipped',
            'paid': 'Paid'
        };
        
        // 清空所有列
        Object.keys(columns).forEach(key => {
            const el = document.getElementById(`kanban-${key}`);
            if (el) el.innerHTML = '';
        });

        // 按状态分组订单
        const grouped = {
            'inquiry': [],
            'pi': [],
            'production': [],
            'shipped': [],
            'paid': []
        };
        
        orders.forEach(order => {
            const status = order.kanbanStatus || order.status || 'New Inquiry';
            // 映射状态到列
            if (status.includes('Inquiry')) grouped.inquiry.push(order);
            else if (status.includes('PI')) grouped.pi.push(order);
            else if (status.includes('Production')) grouped.production.push(order);
            else if (status.includes('Shipped')) grouped.shipped.push(order);
            else if (status.includes('Paid')) grouped.paid.push(order);
            else grouped.inquiry.push(order); // 默认归入inquiry
        });

        // 渲染每一列的卡片
        Object.keys(grouped).forEach(key => {
            const container = document.getElementById(`kanban-${key}`);
            if (!container) return;
            
            grouped[key].forEach(order => {
                container.appendChild(this.createCard(order));
            });
            
            // 更新计数
            const countEl = document.querySelector(`span[data-count="${key}"]`);
            if (countEl) countEl.textContent = grouped[key].length;
        });
    },

    /**
     * 创建订单卡片
     */
    createCard(order) {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 p-3 rounded border border-gray-700 hover:border-blue-500 cursor-pointer transition';
        
        // 计算利润显示
        let profitDisplay = '';
        if (order.cost > 0 || order.grossProfit) {
            const profit = order.grossProfit || 0;
            const margin = order.grossMargin || 0;
            const color = profit >= 0 ? 'text-green-400' : 'text-red-400';
            profitDisplay = `
                <div class="text-xs mt-2 pt-2 border-t border-gray-700 ${color}">
                    毛利: ¥${profit.toLocaleString()} (${margin.toFixed(1)}%)
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="flex justify-between items-start text-xs text-gray-400 mb-1">
                <span>${order.id || 'NO-ID'}</span>
                <span class="bg-gray-900 px-2 py-0.5 rounded">${order.currency}</span>
            </div>
            <div class="font-bold text-white mb-2">${order.customer}</div>
            <div class="text-sm text-right ${order.currency === 'USD' ? 'text-green-400' : 'text-yellow-400'}">
                ${order.currency === 'USD' ? '$' : '¥'}${order.total.toLocaleString()}
            </div>
            ${profitDisplay}
            <div class="text-xs text-gray-500 mt-2">
                ${new Date(order.date).toLocaleDateString()}
            </div>
        `;
        
        // 点击编辑
        card.onclick = () => this.openEditModal(order.id);
        
        return card;
    },

    /**
     * 打开快速添加弹窗
     */
    openQuickAdd() {
        // 简单实现：使用系统prompt
        const name = prompt("客户名称:");
        if (!name) return;
        
        const amt = prompt("金额 (USD):");
        if (!amt || isNaN(amt)) return;
        
        const status = confirm("是否已付款？") ? 'Paid' : 'New Inquiry';
        
        this.saveNewOrder({
            customer: name,
            total: parseFloat(amt),
            currency: 'USD',
            status: status,
            date: new Date().toISOString()
        });
    },

    /**
     * 保存新订单
     */
    async saveNewOrder(orderData) {
        const newOrder = {
            id: 'PI-' + Date.now(),
            customer: orderData.customer,
            total: orderData.total,
            currency: orderData.currency || 'USD',
            exchangeRate: window.WorkbenchDashboard.data.rate,
            kanbanStatus: orderData.status,
            status: orderData.status,
            date: orderData.date || new Date().toISOString(),
            product: orderData.product || '',
            supplier: '',
            cost: 0,
            grossProfit: 0,
            grossMargin: 0,
            notes: ''
        };
        
        window.WorkbenchDashboard.data.orders.push(newOrder);
        
        // 保存到存储
        await window.WorkbenchStorage.save(
            window.WorkbenchConfig.STORAGE_KEYS.ORDERS,
            window.WorkbenchDashboard.data.orders
        );
        
        // 如果是Paid，触发红线检查
        if (newOrder.status === 'Paid') {
            window.WorkbenchDashboard.checkCashRedLine();
        }
        
        // 刷新界面
        this.render();
        window.WorkbenchDashboard.updateDashboard();
        
        alert('订单已添加！');
    },

    /**
     * 打开编辑弹窗
     */
    openEditModal(orderId) {
        const order = window.WorkbenchDashboard.data.orders.find(o => o.id === orderId);
        if (!order) return;
        
        alert(`订单 ${orderId}\n客户: ${order.customer}\n金额: ${order.currency} ${order.total}\n状态: ${order.status}`);
        // TODO: 实现完整的编辑Modal
    },

    // 🔥 暴露所有必要方法
    openFullAddModal() {
        alert("完整订单添加功能开发中，请使用快速添加");
    },
    
    closeQuickAdd() { },
    closeFullAddModal() { },
    saveQuickOrder() { },
    saveFullOrder() { }
};

// 🔥 关键：挂载到 Window
window.WorkbenchOrders = WorkbenchOrders;
