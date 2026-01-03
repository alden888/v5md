/**
 * V14.2 PRO - ORDERS MODULE (COMPLETELY FIXED)
 * 适配V14.2 PRO Utils + 增强稳定性
 */
const WorkbenchOrders = {
    currentEditId: null,
    isProcessing: false, // 防重复提交标记
    
    /**
     * 初始化订单模块
     */
    init() {
        console.log('[Orders] 🚀 Initializing Orders Module (V14.2 PRO)...');
        this.bindEvents(); // 绑定快速添加按钮事件
        this.render();
        return this;
    },

    /**
     * 绑定DOM事件
     */
    bindEvents() {
        // 绑定快速添加订单按钮
        const quickAddBtn = document.getElementById('quick-add-order');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', () => this.openQuickAdd());
        }
        
        // 绑定传统表单提交事件（兼容旧版）
        const orderForm = document.getElementById('new-order-form');
        if (orderForm) {
            orderForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
        
        console.log('[Orders] 🎯 Events bound successfully');
    },

    /**
     * 渲染订单看板
     */
    render() {
        console.log('[Orders] 📊 Rendering kanban...');
        
        const Dashboard = window.WorkbenchDashboard;
        const Utils = window.WorkbenchUtils;
        
        if (!Dashboard || !Dashboard.data) {
            console.error('[Orders] Dashboard not ready');
            Utils?.toast('数据面板未加载，请刷新页面', 'warning');
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
        const Utils = window.WorkbenchUtils;
        let profitDisplay = '';
        
        if (order.cost > 0 || order.grossProfit) {
            const profit = order.grossProfit || 0;
            const margin = order.grossMargin || 0;
            const color = profit >= 0 ? 'text-green-400' : 'text-red-400';
            profitDisplay = `
                <div class="text-xs mt-2 pt-2 border-t border-gray-700 ${color}">
                    毛利: ¥${Utils.formatNumber(profit, 2)} (${margin.toFixed(1)}%)
                </div>
            `;
        }
        
        // 格式化日期和金额
        const formattedDate = Utils.formatDate(order.date, 'YYYY-MM-DD');
        const formattedAmount = Utils.formatNumber(order.total || 0, 2);
        const currencySymbol = order.currency === 'USD' ? '$' : '¥';
        const amountColor = order.currency === 'USD' ? 'text-green-400' : 'text-yellow-400';
        
        return `
            <div class="bg-gray-800 p-3 rounded border border-gray-700 hover:border-blue-500 cursor-pointer transition" onclick="window.WorkbenchOrders.openEditModal('${order.id}')">
                <div class="flex justify-between items-start text-xs text-gray-400 mb-1">
                    <span>${order.id || 'NO-ID'}</span>
                    <span class="bg-gray-900 px-2 py-0.5 rounded">${order.currency || 'USD'}</span>
                </div>
                <div class="font-bold text-white mb-2">${order.customer || '未知客户'}</div>
                <div class="text-sm text-right ${amountColor}">
                    ${currencySymbol}${formattedAmount}
                </div>
                ${profitDisplay}
                <div class="text-xs text-gray-500 mt-2">
                    ${formattedDate}
                </div>
            </div>
        `;
    },

    /**
     * 快速添加订单（增强版）
     */
    openQuickAdd() {
        // 防重复点击
        if (this.isProcessing) {
            window.WorkbenchUtils?.toast('操作中，请稍候...', 'warning');
            return;
        }
        
        console.log('[Orders] 📝 Opening quick add...');
        this.isProcessing = true;
        
        const Utils = window.WorkbenchUtils;
        if (!Utils) {
            alert('系统模块未加载，请刷新页面');
            this.isProcessing = false;
            return;
        }
        
        try {
            // 第1步：客户名称（增强验证）
            let customer = prompt("📋 输入客户名称 (必填):", "");
            if (!customer || !customer.trim()) {
                console.log('[Orders] User cancelled');
                this.isProcessing = false;
                return;
            }
            customer = customer.trim();
            
            // 第2步：金额（增强验证）
            let amountStr = prompt("💰 输入金额 (数字，大于0):", "");
            if (!amountStr) {
                this.isProcessing = false;
                return;
            }
            
            const amount = Utils.parseNumber(amountStr);
            if (amount <= 0) {
                Utils.toast('请输入有效金额（必须大于0）', 'error');
                this.isProcessing = false;
                return;
            }
            
            // 第3步：币种（增强验证）
            let currency = prompt("💱 币种 (USD/CNY/EUR):", "USD");
            currency = (currency || 'USD').toUpperCase();
            if (!['USD', 'CNY', 'EUR', 'GBP'].includes(currency)) {
                currency = 'USD';
                Utils.toast(`不支持的币种，自动切换为USD`, 'info');
            }
            
            // 第4步：状态
            const isPaid = confirm("💵 是否已付款？\n\n点击\"确定\"=已付款\n点击\"取消\"=新询价");
            const status = isPaid ? 'Paid' : 'New Inquiry';
            
            // 保存订单
            this.saveNewOrder({
                customer: customer,
                total: amount,
                currency: currency,
                status: status,
                date: new Date().toISOString()
            }).finally(() => {
                this.isProcessing = false; // 重置状态
            });
            
        } catch (error) {
            console.error('[Orders] Quick add error:', error);
            window.WorkbenchUtils?.toast(`添加失败: ${error.message}`, 'error');
            this.isProcessing = false;
        }
    },

    /**
     * 处理传统表单提交
     */
    handleFormSubmit(e) {
        e.preventDefault();
        const Utils = window.WorkbenchUtils;
        
        // 防重复提交
        if (this.isProcessing) return;
        this.isProcessing = true;
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        if (Utils.isDoubleClick(submitBtn)) {
            this.isProcessing = false;
            return;
        }
        
        try {
            // 获取表单数据
            const formData = {
                customer: document.getElementById('order-customer').value.trim(),
                product: document.getElementById('order-product').value.trim(),
                quantity: Utils.parseNumber(document.getElementById('order-quantity').value, 0),
                total: Utils.parseNumber(document.getElementById('order-total').value, 0),
                currency: document.getElementById('order-currency').value || 'USD',
                status: 'New Inquiry' // 表单默认新增为新询价
            };
            
            // 数据验证
            const errors = [];
            if (!formData.customer) errors.push('客户名称不能为空');
            if (!formData.product) errors.push('产品名称不能为空');
            if (formData.quantity <= 0) errors.push('数量必须大于0');
            if (formData.total <= 0) errors.push('订单金额必须大于0');
            
            if (errors.length > 0) {
                Utils.toast(errors.join('<br>'), 'error');
                Utils.releaseClick(submitBtn);
                this.isProcessing = false;
                return;
            }
            
            // 保存订单
            this.saveNewOrder(formData).then(() => {
                // 重置表单
                e.target.reset();
                Utils.toast(`✅ 订单创建成功！`, 'success');
            }).catch((err) => {
                Utils.toast(`创建失败: ${err.message}`, 'error');
            }).finally(() => {
                Utils.releaseClick(submitBtn);
                this.isProcessing = false;
            });
            
        } catch (error) {
            console.error('[Orders] Form submit error:', error);
            Utils.toast(`提交失败: ${error.message}`, 'error');
            Utils.releaseClick(submitBtn);
            this.isProcessing = false;
        }
    },

    /**
     * 保存新订单（核心方法）
     */
    async saveNewOrder(orderData) {
        console.log('[Orders] 💾 Saving order...', orderData);
        
        try {
            const Utils = window.WorkbenchUtils;
            const Dashboard = window.WorkbenchDashboard;
            const Storage = window.WorkbenchStorage;
            const Config = window.WorkbenchConfig;
            
            // 核心模块检查
            const missingModules = [];
            if (!Dashboard) missingModules.push('Dashboard');
            if (!Storage) missingModules.push('Storage');
            if (!Config) missingModules.push('Config');
            
            if (missingModules.length > 0) {
                throw new Error(`系统核心模块未加载: ${missingModules.join(', ')}`);
            }
            
            // 生成订单ID（使用新Utils方法）
            const orderId = Utils.generatePINumber();
            
            // 构建完整订单对象
            const newOrder = {
                id: orderId,
                customer: orderData.customer,
                product: orderData.product || '',
                quantity: orderData.quantity || 1,
                total: orderData.total,
                currency: orderData.currency || 'USD',
                exchangeRate: Dashboard.data.rate || 6.98,
                kanbanStatus: orderData.status || 'New Inquiry',
                status: orderData.status || 'New Inquiry',
                date: orderData.date || new Date().toISOString(),
                supplier: '',
                cost: 0,
                grossProfit: 0,
                grossMargin: 0,
                notes: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            console.log('[Orders] Created order:', newOrder);
            
            // 初始化订单数组（防止undefined）
            if (!Array.isArray(Dashboard.data.orders)) {
                Dashboard.data.orders = [];
            }
            
            // 添加到Dashboard数据
            Dashboard.data.orders.push(newOrder);
            
            // 保存到本地存储
            await Storage.save(Config.STORAGE_KEYS.ORDERS, Dashboard.data.orders);
            console.log('[Orders] ✅ Saved to storage');
            
            // 如果是Paid状态，触发现金流检查
            if (newOrder.status === 'Paid' && typeof Dashboard.checkCashRedLine === 'function') {
                Dashboard.checkCashRedLine();
            }
            
            // 刷新界面
            this.render();
            if (typeof Dashboard.updateDashboard === 'function') {
                Dashboard.updateDashboard();
            }
            
            // 成功提示（快速添加专用）
            if (!document.getElementById('new-order-form')) {
                Utils.toast(`✅ 订单 ${orderId} 已创建！`, 'success');
            }
            
            return newOrder;
            
        } catch (error) {
            console.error('[Orders] ❌ Save failed:', error);
            throw error; // 向上抛出错误
        }
    },

    /**
     * 打开编辑Modal
     */
    openEditModal(orderId) {
        // 防重复操作
        if (this.isProcessing) return;
        this.isProcessing = true;
        
        console.log('[Orders] Opening edit for:', orderId);
        const Utils = window.WorkbenchUtils;
        const Dashboard = window.WorkbenchDashboard;
        
        const order = Dashboard?.data?.orders?.find(o => o.id === orderId);
        if (!order) {
            Utils?.toast('订单不存在', 'error');
            this.isProcessing = false;
            return;
        }
        
        // 格式化订单信息
        const formattedDate = Utils.formatDate(order.date);
        const formattedAmount = Utils.formatNumber(order.total, 2);
        
        const details = `📝 订单详情 [${order.id}]
━━━━━━━━━━━━━━
客户: ${order.customer}
金额: ${order.currency} ${formattedAmount}
状态: ${order.status}
日期: ${formattedDate}
━━━━━━━━━━━━━━

🔧 操作选项：
1 - 移动到下一阶段
2 - 删除订单
回车/取消 - 关闭`;
        
        const action = prompt(details);
        
        if (action === '1') {
            this.moveToNextStage(orderId).finally(() => {
                this.isProcessing = false;
            });
        } else if (action === '2') {
            this.deleteOrder(orderId).finally(() => {
                this.isProcessing = false;
            });
        } else {
            // 取消操作
            this.isProcessing = false;
        }
    },
    
    /**
     * 移动订单到下一阶段
     */
    async moveToNextStage(orderId) {
        const Utils = window.WorkbenchUtils;
        const Dashboard = window.WorkbenchDashboard;
        const order = Dashboard?.data?.orders?.find(o => o.id === orderId);
        
        if (!order) {
            Utils?.toast('订单不存在', 'error');
            return;
        }
        
        const stages = ['New Inquiry', 'PI Sent', 'Production', 'Shipped', 'Paid'];
        const currentStatus = order.kanbanStatus || order.status;
        const currentIndex = stages.indexOf(currentStatus);
        
        if (currentIndex >= stages.length - 1) {
            Utils?.toast('📌 已经是最终阶段（已付款）', 'info');
            return;
        }
        
        try {
            const nextStage = stages[currentIndex + 1];
            order.kanbanStatus = nextStage;
            order.status = nextStage;
            order.updatedAt = new Date().toISOString();
            
            if (nextStage === 'Paid') {
                order.paidDate = new Date().toISOString();
            }
            
            // 保存更新
            await window.WorkbenchStorage.save(
                window.WorkbenchConfig.STORAGE_KEYS.ORDERS,
                Dashboard.data.orders
            );
            
            // 刷新界面
            this.render();
            if (typeof Dashboard.updateDashboard === 'function') {
                Dashboard.updateDashboard();
            }
            
            // 现金流检查
            if (nextStage === 'Paid' && typeof Dashboard.checkCashRedLine === 'function') {
                Dashboard.checkCashRedLine();
            }
            
            Utils?.toast(`✅ 订单已移至: ${nextStage}`, 'success');
            
        } catch (error) {
            console.error('[Orders] Move stage failed:', error);
            Utils?.toast(`操作失败: ${error.message}`, 'error');
        }
    },
    
    /**
     * 删除订单
     */
    async deleteOrder(orderId) {
        const Utils = window.WorkbenchUtils;
        const Dashboard = window.WorkbenchDashboard;
        
        // 安全确认
        if (!confirm('⚠️ 警告！\n\n确定删除此订单吗？\n此操作不可撤销！')) {
            return;
        }
        
        try {
            // 过滤删除
            const initialCount = Dashboard.data.orders.length;
            Dashboard.data.orders = Dashboard.data.orders.filter(
                o => o.id !== orderId
            );
            
            // 检查是否真的删除了
            if (Dashboard.data.orders.length === initialCount) {
                throw new Error('订单删除失败，未找到对应订单');
            }
            
            // 保存更新
            await window.WorkbenchStorage.save(
                window.WorkbenchConfig.STORAGE_KEYS.ORDERS,
                Dashboard.data.orders
            );
            
            // 刷新界面
            this.render();
            if (typeof Dashboard.updateDashboard === 'function') {
                Dashboard.updateDashboard();
            }
            
            Utils?.toast('🗑️ 订单已成功删除', 'success');
            
        } catch (error) {
            console.error('[Orders] Delete failed:', error);
            Utils?.toast(`删除失败: ${error.message}`, 'error');
        }
    },

    // 兼容方法（防止旧代码报错）
    closeQuickAdd() {},
    openFullAddModal() {
        window.WorkbenchUtils?.toast("✨ 推荐使用快速添加功能（点击右上角+号）", 'info');
    },
    closeFullAddModal() {},
    saveQuickOrder() {},
    saveFullOrder() {}
};

// 初始化并挂载到全局
document.addEventListener('DOMContentLoaded', () => {
    window.WorkbenchOrders = WorkbenchOrders;
    WorkbenchOrders.init();
    console.log('✅ [Orders] V14.2 PRO Module loaded and initialized');
});
