// ============================================
// V14.0 ERP - ORDERS MANAGEMENT MODULE
// ============================================

const WorkbenchOrders = {
    /**
     * 初始化订单模块
     */
    init() {
        console.log('[Orders] Initializing orders management module...');
        
        // 绑定事件
        this.bindEvents();
        
        // 更新看板
        this.updateKanban();
        
        return this;
    },
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // Quick Add按钮
        const quickAddBtn = document.getElementById('quick-add-btn');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', () => this.openQuickAdd());
        }
        
        // Full Add按钮
        const fullAddBtn = document.getElementById('full-add-btn');
        if (fullAddBtn) {
            fullAddBtn.addEventListener('click', () => this.openFullAdd());
        }
    },
    
    /**
     * 打开Quick Add模态框
     */
    openQuickAdd() {
        WorkbenchUtils.toggle('quick-add-modal', true);
        
        // 预填充默认值
        document.getElementById('quick-currency').value = 'USD';
        document.getElementById('quick-rate').value = WorkbenchDashboard.data.rate;
        document.getElementById('quick-status').value = 'Paid';
        
        // 清空表单
        document.getElementById('quick-customer').value = '';
        document.getElementById('quick-amount').value = '';
        document.getElementById('quick-supplier').value = '';
        document.getElementById('quick-cost').value = '';
        
        // 更新供应商下拉
        this.updateSupplierOptions('quick-supplier');
        
        // 聚焦到客户名称输入框
        setTimeout(() => document.getElementById('quick-customer').focus(), 100);
    },
    
    /**
     * 打开Full Add模态框
     */
    openFullAdd() {
        WorkbenchUtils.toggle('full-add-modal', true);
        
        // 预填充默认值
        document.getElementById('new-currency').value = 'USD';
        document.getElementById('new-rate').value = WorkbenchDashboard.data.rate;
        document.getElementById('new-status').value = 'Inquiry';
        document.getElementById('new-date').value = WorkbenchUtils.formatDate(new Date(), 'YYYY-MM-DD');
        
        // 清空表单
        document.getElementById('new-customer').value = '';
        document.getElementById('new-amount').value = '';
        document.getElementById('new-product').value = '';
        document.getElementById('new-notes').value = '';
        document.getElementById('new-supplier').value = '';
        document.getElementById('new-cost').value = '';
        
        // 更新供应商下拉
        this.updateSupplierOptions('new-supplier');
        
        // 聚焦到客户名称输入框
        setTimeout(() => document.getElementById('new-customer').focus(), 100);
    },
    
    /**
     * 更新供应商下拉选项
     */
    updateSupplierOptions(selectId) {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        // 清空现有选项
        select.innerHTML = '<option value="">未指定</option>';
        
        // 添加供应商选项
        WorkbenchDashboard.data.suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier.id;
            option.textContent = supplier.company;
            select.appendChild(option);
        });
    },
    
    /**
     * 🆕 V14.0: 计算Quick Add利润
     */
    calculateQuickProfit() {
        const amount = parseFloat(document.getElementById('quick-amount').value) || 0;
        const cost = parseFloat(document.getElementById('quick-cost').value) || 0;
        const currency = document.getElementById('quick-currency').value;
        const rate = parseFloat(document.getElementById('quick-rate').value) || WorkbenchDashboard.data.rate;
        
        // 统一转为RMB计算
        const revenueRMB = currency === 'CNY' ? amount : amount * rate;
        const costRMB = currency === 'CNY' ? cost : cost * rate;
        const profit = revenueRMB - costRMB;
        const margin = revenueRMB > 0 ? (profit / revenueRMB * 100) : 0;
        
        // 更新显示
        const profitValue = document.getElementById('quick-profit-value');
        const marginValue = document.getElementById('quick-margin-value');
        
        if (profitValue && marginValue) {
            profitValue.textContent = '¥' + WorkbenchUtils.formatNumber(profit, 0);
            marginValue.textContent = '(' + margin.toFixed(1) + '%)';
            
            // 负毛利红色警告
            if (profit < 0) {
                profitValue.className = 'text-red-400 font-bold ml-2';
            } else {
                profitValue.className = 'text-green-400 font-bold ml-2';
            }
        }
    },
    
    /**
     * 保存Quick Add订单
     */
    async saveQuickOrder() {
        const customer = document.getElementById('quick-customer').value.trim();
        const amount = parseFloat(document.getElementById('quick-amount').value);
        const currency = document.getElementById('quick-currency').value;
        const rate = parseFloat(document.getElementById('quick-rate').value);
        const status = document.getElementById('quick-status').value;
        const supplier = document.getElementById('quick-supplier').value;
        const cost = parseFloat(document.getElementById('quick-cost').value) || 0;
        
        // 验证
        if (!customer || !amount) {
            WorkbenchUtils.toast('请填写客户名称和金额', 'warning');
            return;
        }
        
        // 🆕 V13.5: 检查客户是否在档案库
        const existingCustomer = WorkbenchDashboard.data.customers.find(c => c.company === customer);
        if (!existingCustomer) {
            const addToArchive = confirm(`"${customer}" 不在客户库中。\n\n是否添加到客户档案？`);
            
            if (addToArchive) {
                WorkbenchDashboard.data.customers.push({
                    id: WorkbenchUtils.generateId('CUST'),
                    company: customer,
                    contact: '',
                    country: '',
                    currency: currency,
                    notes: '快速新建时添加',
                    createdAt: new Date().toISOString(),
                    totalOrders: 0,
                    totalSales: 0
                });
                
                await WorkbenchStorage.save(
                    WorkbenchConfig.STORAGE_KEYS.CUSTOMERS,
                    WorkbenchDashboard.data.customers
                );
            }
        }
        
        // 🆕 V14.0: 计算毛利
        const revenueRMB = currency === 'CNY' ? amount : amount * rate;
        const costRMB = currency === 'CNY' ? cost : cost * rate;
        const grossProfit = revenueRMB - costRMB;
        const grossMargin = revenueRMB > 0 ? (grossProfit / revenueRMB * 100) : 0;
        
        // 创建订单
        const order = {
            id: WorkbenchUtils.generatePINumber(),
            customer: customer,
            total: amount,
            currency: currency,
            exchangeRate: rate,
            kanbanStatus: status,
            status: status,
            date: new Date().toISOString(),
            product: '',
            notes: '',
            // 🆕 V14.0: 成本和利润字段
            supplier: supplier,
            cost: cost,
            costCurrency: currency,
            costExchangeRate: rate,
            grossProfit: grossProfit,
            grossMargin: grossMargin
        };
        
        // 保存订单
        WorkbenchDashboard.data.orders.push(order);
        await WorkbenchStorage.save(
            WorkbenchConfig.STORAGE_KEYS.ORDERS,
            WorkbenchDashboard.data.orders
        );
        
        // 🔥 V13: 如果是Paid订单，立即检查红线
        if (status === 'Paid') {
            WorkbenchUtils.toast('🎉 Paid订单已录入！正在检查红屏状态...', 'success');
            setTimeout(() => {
                WorkbenchDashboard.checkCashRedLine();
                WorkbenchDashboard.updateDashboard();
            }, 500);
        } else {
            WorkbenchUtils.toast('订单创建成功', 'success');
        }
        
        // 关闭模态框
        WorkbenchUtils.toggle('quick-add-modal', false);
        
        // 更新看板和Dashboard
        this.updateKanban();
        WorkbenchDashboard.updateDashboard();
    },
    
    /**
     * 保存Full Add订单
     */
    async saveFullOrder() {
        const customer = document.getElementById('new-customer').value.trim();
        const amount = parseFloat(document.getElementById('new-amount').value);
        const currency = document.getElementById('new-currency').value;
        const rate = parseFloat(document.getElementById('new-rate').value);
        const status = document.getElementById('new-status').value;
        const date = document.getElementById('new-date').value;
        const product = document.getElementById('new-product').value.trim();
        const notes = document.getElementById('new-notes').value.trim();
        const supplier = document.getElementById('new-supplier').value;
        const cost = parseFloat(document.getElementById('new-cost').value) || 0;
        
        // 验证
        if (!customer || !amount) {
            WorkbenchUtils.toast('请填写必填项', 'warning');
            return;
        }
        
        // 计算毛利
        const revenueRMB = currency === 'CNY' ? amount : amount * rate;
        const costRMB = currency === 'CNY' ? cost : cost * rate;
        const grossProfit = revenueRMB - costRMB;
        const grossMargin = revenueRMB > 0 ? (grossProfit / revenueRMB * 100) : 0;
        
        // 创建订单
        const order = {
            id: WorkbenchUtils.generatePINumber(),
            customer: customer,
            total: amount,
            currency: currency,
            exchangeRate: rate,
            kanbanStatus: status,
            status: status,
            date: date ? new Date(date).toISOString() : new Date().toISOString(),
            product: product,
            notes: notes,
            supplier: supplier,
            cost: cost,
            costCurrency: currency,
            costExchangeRate: rate,
            grossProfit: grossProfit,
            grossMargin: grossMargin
        };
        
        // 保存订单
        WorkbenchDashboard.data.orders.push(order);
        await WorkbenchStorage.save(
            WorkbenchConfig.STORAGE_KEYS.ORDERS,
            WorkbenchDashboard.data.orders
        );
        
        if (status === 'Paid') {
            WorkbenchUtils.toast('🎉 Paid订单已录入！正在检查红屏状态...', 'success');
            setTimeout(() => {
                WorkbenchDashboard.checkCashRedLine();
                WorkbenchDashboard.updateDashboard();
            }, 500);
        } else {
            WorkbenchUtils.toast('订单创建成功', 'success');
        }
        
        // 关闭模态框
        WorkbenchUtils.toggle('full-add-modal', false);
        
        // 更新看板和Dashboard
        this.updateKanban();
        WorkbenchDashboard.updateDashboard();
    },
    
    /**
     * 更新看板显示
     */
    updateKanban() {
        console.log('[Orders] Updating kanban...');
        
        // 按状态分组订单
        const columns = {
            'Inquiry': [],
            'Quotation': [],
            'Negotiation': [],
            'Paid': [],
            'Production': [],
            'Shipped': [],
            'Delivered': []
        };
        
        WorkbenchDashboard.data.orders.forEach(order => {
            const status = order.kanbanStatus || order.status || 'Inquiry';
            if (columns[status]) {
                columns[status].push(order);
            }
        });
        
        // 更新每列
        Object.keys(columns).forEach(status => {
            const columnId = `kanban-${status.toLowerCase()}`;
            const column = document.getElementById(columnId);
            
            if (column) {
                // 清空现有卡片
                column.innerHTML = '';
                
                // 添加订单卡片
                columns[status].forEach(order => {
                    const card = this.createOrderCard(order);
                    column.appendChild(card);
                });
                
                // 显示数量
                const countBadge = document.getElementById(`count-${status.toLowerCase()}`);
                if (countBadge) {
                    countBadge.textContent = columns[status].length;
                }
            }
        });
    },
    
    /**
     * 创建订单卡片
     */
    createOrderCard(order) {
        const card = document.createElement('div');
        card.className = 'kanban-card bg-slate-800 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-blue-500';
        card.onclick = () => this.editOrder(order.id);
        
        // 🆕 V14.0: 显示利润信息
        const profitHTML = order.cost > 0 ? `
            <div class="text-xs mt-2 pt-2 border-t border-slate-700">
                <div class="flex justify-between">
                    <span class="text-slate-400">毛利:</span>
                    <span class="${order.grossProfit >= 0 ? 'text-green-400' : 'text-red-400'}">
                        ¥${WorkbenchUtils.formatNumber(order.grossProfit, 0)}
                        (${order.grossMargin.toFixed(1)}%)
                    </span>
                </div>
            </div>
        ` : '';
        
        card.innerHTML = `
            <div class="text-sm font-bold text-white">${order.id}</div>
            <div class="text-xs text-slate-300 mt-1">${order.customer}</div>
            ${order.product ? `<div class="text-xs text-slate-400 mt-1">${order.product}</div>` : ''}
            <div class="text-sm font-bold text-blue-400 mt-2">
                ${WorkbenchUtils.getCurrencySymbol(order.currency)}${WorkbenchUtils.formatNumber(order.total, 2)}
            </div>
            ${profitHTML}
            <div class="text-xs text-slate-500 mt-2">
                ${WorkbenchUtils.formatDate(order.date, 'YYYY-MM-DD')}
            </div>
        `;
        
        return card;
    },
    
    /**
     * 编辑订单
     */
    editOrder(orderId) {
        const order = WorkbenchDashboard.data.orders.find(o => o.id === orderId);
        if (!order) return;
        
        // 填充编辑表单
        document.getElementById('edit-id').value = order.id;
        document.getElementById('edit-customer').value = order.customer;
        document.getElementById('edit-amount').value = order.total;
        document.getElementById('edit-currency').value = order.currency;
        document.getElementById('edit-rate').value = order.exchangeRate;
        document.getElementById('edit-status').value = order.kanbanStatus || order.status;
        document.getElementById('edit-date').value = WorkbenchUtils.formatDate(order.date, 'YYYY-MM-DD');
        document.getElementById('edit-product').value = order.product || '';
        document.getElementById('edit-notes').value = order.notes || '';
        document.getElementById('edit-supplier').value = order.supplier || '';
        document.getElementById('edit-cost').value = order.cost || 0;
        
        // 更新供应商下拉
        this.updateSupplierOptions('edit-supplier');
        
        // 如果订单缺少成本数据，显示提示
        if (order._needsCostUpdate) {
            WorkbenchUtils.toast('⚠️ 该订单缺少成本数据，请补录', 'warning');
        }
        
        // 打开编辑模态框
        WorkbenchUtils.toggle('edit-modal', true);
    },
    
    /**
     * 更新订单
     */
    async updateOrder() {
        const id = document.getElementById('edit-id').value;
        const order = WorkbenchDashboard.data.orders.find(o => o.id === id);
        if (!order) return;
        
        // 更新字段
        order.customer = document.getElementById('edit-customer').value.trim();
        order.total = parseFloat(document.getElementById('edit-amount').value);
        order.currency = document.getElementById('edit-currency').value;
        order.exchangeRate = parseFloat(document.getElementById('edit-rate').value);
        order.kanbanStatus = document.getElementById('edit-status').value;
        order.status = document.getElementById('edit-status').value;
        order.date = new Date(document.getElementById('edit-date').value).toISOString();
        order.product = document.getElementById('edit-product').value.trim();
        order.notes = document.getElementById('edit-notes').value.trim();
        order.supplier = document.getElementById('edit-supplier').value;
        order.cost = parseFloat(document.getElementById('edit-cost').value) || 0;
        
        // 重新计算毛利
        const revenueRMB = order.currency === 'CNY' ? order.total : order.total * order.exchangeRate;
        const costRMB = order.currency === 'CNY' ? order.cost : order.cost * order.exchangeRate;
        order.grossProfit = revenueRMB - costRMB;
        order.grossMargin = revenueRMB > 0 ? (order.grossProfit / revenueRMB * 100) : 0;
        order._needsCostUpdate = false; // 清除标记
        
        // 保存
        await WorkbenchStorage.save(
            WorkbenchConfig.STORAGE_KEYS.ORDERS,
            WorkbenchDashboard.data.orders
        );
        
        WorkbenchUtils.toast('订单已更新', 'success');
        WorkbenchUtils.toggle('edit-modal', false);
        
        // 如果是Paid订单，检查红线
        if (order.kanbanStatus === 'Paid') {
            WorkbenchDashboard.checkCashRedLine();
        }
        
        this.updateKanban();
        WorkbenchDashboard.updateDashboard();
    },
    
    /**
     * 删除订单
     */
    async deleteOrder() {
        const id = document.getElementById('edit-id').value;
        
        if (!confirm('确定要删除这个订单吗？')) {
            return;
        }
        
        WorkbenchDashboard.data.orders = WorkbenchDashboard.data.orders.filter(o => o.id !== id);
        
        await WorkbenchStorage.save(
            WorkbenchConfig.STORAGE_KEYS.ORDERS,
            WorkbenchDashboard.data.orders
        );
        
        WorkbenchUtils.toast('订单已删除', 'success');
        WorkbenchUtils.toggle('edit-modal', false);
        
        this.updateKanban();
        WorkbenchDashboard.updateDashboard();
        WorkbenchDashboard.checkCashRedLine();
    }
};

// 🔥 FIX: 显式挂载到 window 对象
window.WorkbenchOrders = WorkbenchOrders;
