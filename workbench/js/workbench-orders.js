/**
 * V14.2 PRO - ORDERS MODULE (COMPLETELY FIXED)
 * 修复快速新建订单功能
 */
const WorkbenchOrders = {
    currentEditId: null,
    
    init() {
        console.log('[Orders] 🚀 Initializing Orders Module...');
        this.render();
        return this;
    },

    /**
     * 🔥 修复：渲染看板
     */
    render() {
        console.log('[Orders] 📊 Rendering kanban...');
        
        const Dashboard = window.WorkbenchDashboard;
        if (!Dashboard || !Dashboard.data) {
            console.error('[Orders] Dashboard not ready');
            return;
        }
        
        const orders = Dashboard.data.orders || [];
        console.log(`[Orders] Rendering ${orders.length} orders`);
        
        // 定义所有看板列
        const columns = {
            'inquiry': 'New Inquiry',
            'pi': 'PI Sent',
            'production': 'Production',
            'shipped': 'Shipped',
            'paid': 'Paid'
        };
        
        // 按状态分组
        const grouped = {
            'inquiry': [],
            'pi': [],
            'production': [],
            'shipped': [],
            'paid': []
        };
        
        orders.forEach(order => {
            const status = order.kanbanStatus || order.status || 'New Inquiry';
            if (status.includes('Inquiry')) grouped.inquiry.push(order);
            else if (status.includes('PI') || status.includes('Sent')) grouped.pi.push(order);
            else if (status.includes('Production')) grouped.production.push(order);
            else if (status.includes('Shipped')) grouped.shipped.push(order);
            else if (status.includes('Paid')) grouped.paid.push(order);
            else grouped.inquiry.push(order);
        });

        // 渲染每一列
        Object.keys(grouped).forEach(key => {
            const container = document.getElementById(`kanban-${key}`);
            if (!container) return;
            
            if (grouped[key].length === 0) {
                container.innerHTML = '<div class="text-gray-600 text-xs text-center py-4">暂无订单</div>';
            } else {
                container.innerHTML = grouped[key].map(order => this.createCardHTML(order)).join('');
            }
            
            // 更新计数
            const countEl = document.querySelector(`span[data-count="${key}"]`);
            if (countEl) countEl.textContent = grouped[key].length;
        });
        
        console.log('[Orders] ✅ Render complete');
    },

    /**
     * 创建订单卡片HTML
     */
    createCardHTML(order) {
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
        
        return `
            <div class="bg-gray-800 p-3 rounded border border-gray-700 hover:border-blue-500 cursor-pointer transition" onclick="app.kanban.openEditModal('${order.id}')">
                <div class="flex justify-between items-start text-xs text-gray-400 mb-1">
                    <span>${order.id || 'NO-ID'}</span>
                    <span class="bg-gray-900 px-2 py-0.5 rounded">${order.currency || 'USD'}</span>
                </div>
                <div class="font-bold text-white mb-2">${order.customer || '未知客户'}</div>
                <div class="text-sm text-right ${order.currency === 'USD' ? 'text-green-400' : 'text-yellow-400'}">
                    ${order.currency === 'USD' ? '$' : '¥'}${(order.total || 0).toLocaleString()}
                </div>
                ${profitDisplay}
                <div class="text-xs text-gray-500 mt-2">
                    ${new Date(order.date).toLocaleDateString()}
                </div>
            </div>
        `;
    },

    /**
     * 🔥 关键修复：快速添加订单
     */
    openQuickAdd() {
        console.log('[Orders] 📝 Opening quick add...');
        
        const Utils = window.WorkbenchUtils;
        if (!Utils) {
            alert('系统模块未加载，请刷新页面');
            return;
        }
        
        try {
            // 第1步：客户名称
            const customer = prompt("📋 输入客户名称:", "");
            if (!customer || !customer.trim()) {
                console.log('[Orders] User cancelled');
                return;
            }
            
            // 第2步：金额
            const amountStr = prompt("💰 输入金额 (数字):", "");
            if (!amountStr) return;
            
            const amount = parseFloat(amountStr);
            if (isNaN(amount) || amount <= 0) {
                Utils.toast('请输入有效金额', 'error');
                return;
            }
            
            // 第3步：币种
            let currency = prompt("💱 币种 (USD/CNY/EUR):", "USD");
            currency = (currency || 'USD').toUpperCase();
            if (!['USD', 'CNY', 'EUR', 'GBP'].includes(currency)) {
                currency = 'USD';
            }
            
            // 第4步：状态
            const isPaid = confirm("💵 是否已付款？\n\n点击"确定"=已付款\n点击"取消"=新询价");
            const status = isPaid ? 'Paid' : 'New Inquiry';
            
            // 保存订单
            this.saveNewOrder({
                customer: customer.trim(),
                total: amount,
                currency: currency,
                status: status,
                date: new Date().toISOString()
            });
            
        } catch (error) {
            console.error('[Orders] Error:', error);
            Utils.toast('添加失败: ' + error.message, 'error');
        }
    },

    /**
     * 🔥 关键修复：保存新订单
     */
    async saveNewOrder(orderData) {
        console.log('[Orders] 💾 Saving order...', orderData);
        
        try {
            const Utils = window.WorkbenchUtils;
            const Dashboard = window.WorkbenchDashboard;
            const Storage = window.WorkbenchStorage;
            const Config = window.WorkbenchConfig;
            
            if (!Dashboard || !Storage || !Config || !Utils) {
                throw new Error('系统模块未加载');
            }
            
            // 生成订单ID
            const orderId = Utils.generatePINumber();
            
            // 构建完整订单对象
            const newOrder = {
                id: orderId,
                customer: orderData.customer,
                total: orderData.total,
                currency: orderData.currency || 'USD',
                exchangeRate: Dashboard.data.rate || 6.98,
                kanbanStatus: orderData.status,
                status: orderData.status,
                date: orderData.date || new Date().toISOString(),
                product: orderData.product || '',
                supplier: '',
                cost: 0,
                grossProfit: 0,
                grossMargin: 0,
                notes: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            console.log('[Orders] Created order:', newOrder);
            
            // 添加到数据
            Dashboard.data.orders.push(newOrder);
            
            // 保存
            await Storage.save(Config.STORAGE_KEYS.ORDERS, Dashboard.data.orders);
            console.log('[Orders] ✅ Saved to storage');
            
            // 如果是Paid，触发检查
            if (newOrder.status === 'Paid') {
                Dashboard.checkCashRedLine();
            }
            
            // 刷新界面
            this.render();
            Dashboard.updateDashboard();
            
            // 成功提示
            Utils.toast(`✅ 订单 ${orderId} 已创建！`, 'success');
            console.log('[Orders] ✅ Order saved successfully');
            
        } catch (error) {
            console.error('[Orders] ❌ Save failed:', error);
            window.WorkbenchUtils?.toast('保存失败: ' + error.message, 'error');
        }
    },

    /**
     * 打开编辑Modal
     */
    openEditModal(orderId) {
        console.log('[Orders] Opening edit for:', orderId);
        
        const order = window.WorkbenchDashboard?.data?.orders.find(o => o.id === orderId);
        if (!order) {
            window.WorkbenchUtils?.toast('订单不存在', 'error');
            return;
        }
        
        const details = `订单详情
━━━━━━━━━━━━━━
ID: ${order.id}
客户: ${order.customer}
金额: ${order.currency} ${order.total}
状态: ${order.status}
日期: ${new Date(order.date).toLocaleDateString()}
━━━━━━━━━━━━━━

操作：
1 - 移动到下一阶段
2 - 删除订单
回车 - 取消`;
        
        const action = prompt(details);
        
        if (action === '1') {
            this.moveToNextStage(orderId);
        } else if (action === '2') {
            this.deleteOrder(orderId);
        }
    },
    
    /**
     * 移动到下一阶段
     */
    async moveToNextStage(orderId) {
        const order = window.WorkbenchDashboard?.data?.orders.find(o => o.id === orderId);
        if (!order) return;
        
        const stages = ['New Inquiry', 'PI Sent', 'Production', 'Shipped', 'Paid'];
        const currentIndex = stages.indexOf(order.kanbanStatus || order.status);
        
        if (currentIndex >= stages.length - 1) {
            window.WorkbenchUtils?.toast('已经是最终阶段', 'info');
            return;
        }
        
        const nextStage = stages[currentIndex + 1];
        order.kanbanStatus = nextStage;
        order.status = nextStage;
        order.updatedAt = new Date().toISOString();
        
        if (nextStage === 'Paid') {
            order.paidDate = new Date().toISOString();
        }
        
        await window.WorkbenchStorage.save(
            window.WorkbenchConfig.STORAGE_KEYS.ORDERS,
            window.WorkbenchDashboard.data.orders
        );
        
        this.render();
        window.WorkbenchDashboard.updateDashboard();
        
        if (nextStage === 'Paid') {
            window.WorkbenchDashboard.checkCashRedLine();
        }
        
        window.WorkbenchUtils?.toast(`✅ 已移至: ${nextStage}`, 'success');
    },
    
    /**
     * 删除订单
     */
    async deleteOrder(orderId) {
        if (!confirm('⚠️ 确定删除此订单吗？\n\n此操作不可撤销！')) {
            return;
        }
        
        window.WorkbenchDashboard.data.orders = window.WorkbenchDashboard.data.orders.filter(
            o => o.id !== orderId
        );
        
        await window.WorkbenchStorage.save(
            window.WorkbenchConfig.STORAGE_KEYS.ORDERS,
            window.WorkbenchDashboard.data.orders
        );
        
        this.render();
        window.WorkbenchDashboard.updateDashboard();
        window.WorkbenchUtils?.toast('✅ 订单已删除', 'success');
    },

    // 兼容方法
    closeQuickAdd() {},
    openFullAddModal() {
        window.WorkbenchUtils?.toast("请使用快速添加功能", 'info');
    },
    closeFullAddModal() {},
    saveQuickOrder() {},
    saveFullOrder() {}
};

// 🔥 立即挂载到全局
window.WorkbenchOrders = WorkbenchOrders;
console.log('✅ [Orders] Module loaded and mounted to window');
