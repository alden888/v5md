// ============================================
// js/workbench-orders.js - 修复版
// ============================================

const WorkbenchOrders = {
    /**
     * 初始化订单模块
     */
    init() {
        console.log('[Orders] Initializing...');
        this.updateCustomerSuggestions();
        this.updateSupplierSuggestions();
        this.render();
        return this;
    },
    
    /**
     * 渲染看板 - 🔥 修复：只渲染到看板容器
     */
    render() {
        console.log('[Orders] Rendering kanban...');
        
        // 🔥 FIX: 渲染到正确的容器
        const containers = {
            'inquiry': document.getElementById('kanban-inquiry'),
            'pi': document.getElementById('kanban-pi'),
            'production': document.getElementById('kanban-production'),
            'shipped': document.getElementById('kanban-shipped'),
            'paid': document.getElementById('kanban-paid')
        };
        
        // 清空所有列
        Object.values(containers).forEach(container => {
            if (container) container.innerHTML = '';
        });
        
        // 按状态分组订单
        const orders = WorkbenchDashboard.data.orders || [];
        const groups = {
            'New Inquiry': [],
            'PI Sent': [],
            'Production': [],
            'Shipped': [],
            'Paid': []
        };
        
        orders.forEach(order => {
            const status = order.kanbanStatus || order.status || 'New Inquiry';
            if (groups[status]) {
                groups[status].push(order);
            }
        });
        
        // 渲染每列的订单卡片
        if (containers.inquiry) {
            containers.inquiry.innerHTML = groups['New Inquiry'].map(o => this._createCard(o)).join('');
        }
        if (containers.pi) {
            containers.pi.innerHTML = groups['PI Sent'].map(o => this._createCard(o)).join('');
        }
        if (containers.production) {
            containers.production.innerHTML = groups['Production'].map(o => this._createCard(o)).join('');
        }
        if (containers.shipped) {
            containers.shipped.innerHTML = groups['Shipped'].map(o => this._createCard(o)).join('');
        }
        if (containers.paid) {
            containers.paid.innerHTML = groups['Paid'].map(o => this._createCard(o)).join('');
        }
        
        // 更新计数
        document.querySelectorAll('[data-count]').forEach(badge => {
            const status = badge.dataset.count;
            const statusMap = {
                'inquiry': 'New Inquiry',
                'pi': 'PI Sent',
                'production': 'Production',
                'shipped': 'Shipped',
                'paid': 'Paid'
            };
            badge.textContent = groups[statusMap[status]]?.length || 0;
        });
    },
    
    /**
     * 创建订单卡片
     */
    _createCard(order) {
        const currencySymbol = WorkbenchUtils.getCurrencySymbol(order.currency);
        const revenueRMB = order.currency === 'CNY' ? order.total : order.total * (order.exchangeRate || 6.98);
        const profit = order.grossProfit || 0;
        const margin = order.grossMargin || 0;
        
        return `
            <div class="kanban-card" onclick="app.kanban.editOrder('${order.id}')">
                <div class="flex justify-between items-start mb-2">
                    <div class="font-bold text-sm text-white">${order.id}</div>
                    <div class="text-xs text-slate-400">${WorkbenchUtils.formatDate(order.date, 'MM-DD')}</div>
                </div>
                <div class="text-sm text-slate-300 mb-1">${order.customer}</div>
                ${order.product ? `<div class="text-xs text-slate-400 mb-2">${order.product}</div>` : ''}
                <div class="flex justify-between items-end">
                    <div>
                        <div class="text-green-400 font-bold">${currencySymbol}${WorkbenchUtils.formatNumber(order.total, 2)}</div>
                        <div class="text-xs text-slate-500">¥${WorkbenchUtils.formatNumber(revenueRMB, 0)}</div>
                    </div>
                    ${order.cost > 0 ? `
                        <div class="text-right">
                            <div class="text-xs ${profit >= 0 ? 'text-green-400' : 'text-red-400'}">
                                ¥${WorkbenchUtils.formatNumber(profit, 0)}
                            </div>
                            <div class="text-xs text-slate-500">(${margin.toFixed(1)}%)</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },
    
    /**
     * 打开Quick Add
     */
    openQuickAdd() {
        const modal = document.getElementById('quick-add-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
        }
        
        // 预填充
        document.getElementById('quick-currency').value = 'USD';
        document.getElementById('quick-rate').value = WorkbenchDashboard.data.rate;
        document.getElementById('quick-status').value = 'Paid';
        document.getElementById('quick-customer').value = '';
        document.getElementById('quick-amount').value = '';
        document.getElementById('quick-cost').value = '';
        
        this.updateSupplierSuggestions();
        setTimeout(() => document.getElementById('quick-customer').focus(), 100);
    },
    
    closeQuickAdd() {
        const modal = document.getElementById('quick-add-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('active');
        }
    },
    
    /**
     * 保存Quick Add订单
     */
    saveQuickOrder() {
        const customer = document.getElementById('quick-customer').value.trim();
        const amount = parseFloat(document.getElementById('quick-amount').value);
        const currency = document.getElementById('quick-currency').value;
        const rate = parseFloat(document.getElementById('quick-rate').value);
        const status = document.getElementById('quick-status').value;
        const supplier = document.getElementById('quick-supplier').value;
        const cost = parseFloat(document.getElementById('quick-cost').value) || 0;
        
        if (!customer || !amount) {
            WorkbenchUtils.toast('请填写客户名称和金额', 'warning');
            return;
        }
        
        // 检查客户是否在档案库
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
                WorkbenchStorage.save(WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, WorkbenchDashboard.data.customers);
            }
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
            date: new Date().toISOString(),
            product: '',
            notes: '',
            supplier: supplier,
            cost: cost,
            costCurrency: currency,
            costExchangeRate: rate,
            grossProfit: grossProfit,
            grossMargin: grossMargin
        };
        
        WorkbenchDashboard.data.orders.push(order);
        WorkbenchStorage.save(WorkbenchConfig.STORAGE_KEYS.ORDERS, WorkbenchDashboard.data.orders);
        
        if (status === 'Paid') {
            WorkbenchUtils.toast('🎉 Paid订单已录入！正在检查红屏状态...', 'success');
            setTimeout(() => {
                WorkbenchDashboard.checkCashRedLine();
                WorkbenchDashboard.updateDashboard();
            }, 500);
        } else {
            WorkbenchUtils.toast('订单创建成功', 'success');
        }
        
        this.closeQuickAdd();
        this.render();
        WorkbenchDashboard.updateDashboard();
    },
    
    /**
     * 编辑订单
     */
    editOrder(orderId) {
        const order = WorkbenchDashboard.data.orders.find(o => o.id === orderId);
        if (!order) return;
        
        document.getElementById('edit-pi').value = order.id;
        document.getElementById('edit-customer').value = order.customer;
        document.getElementById('edit-product').value = order.product || '';
        document.getElementById('edit-amount').value = order.total;
        document.getElementById('edit-currency').value = order.currency;
        document.getElementById('edit-rate').value = order.exchangeRate;
        document.getElementById('edit-status').value = order.kanbanStatus || order.status;
        
        const modal = document.getElementById('edit-order-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
        }
    },
    
    closeEditModal() {
        const modal = document.getElementById('edit-order-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('active');
        }
    },
    
    saveEditOrder() {
        const id = document.getElementById('edit-pi').value;
        const order = WorkbenchDashboard.data.orders.find(o => o.id === id);
        if (!order) return;
        
        order.customer = document.getElementById('edit-customer').value.trim();
        order.product = document.getElementById('edit-product').value.trim();
        order.total = parseFloat(document.getElementById('edit-amount').value);
        order.currency = document.getElementById('edit-currency').value;
        order.exchangeRate = parseFloat(document.getElementById('edit-rate').value);
        order.kanbanStatus = document.getElementById('edit-status').value;
        order.status = document.getElementById('edit-status').value;
        
        // 重新计算毛利
        const revenueRMB = order.currency === 'CNY' ? order.total : order.total * order.exchangeRate;
        const costRMB = order.currency === 'CNY' ? (order.cost || 0) : (order.cost || 0) * order.exchangeRate;
        order.grossProfit = revenueRMB - costRMB;
        order.grossMargin = revenueRMB > 0 ? (order.grossProfit / revenueRMB * 100) : 0;
        
        WorkbenchStorage.save(WorkbenchConfig.STORAGE_KEYS.ORDERS, WorkbenchDashboard.data.orders);
        WorkbenchUtils.toast('订单已更新', 'success');
        this.closeEditModal();
        
        if (order.kanbanStatus === 'Paid') {
            WorkbenchDashboard.checkCashRedLine();
        }
        
        this.render();
        WorkbenchDashboard.updateDashboard();
    },
    
    openFullAddModal() {
        const modal = document.getElementById('add-order-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
        }
        
        const now = new Date();
        const piNo = `PI-${now.getFullYear().toString().substr(2,2)}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${String(WorkbenchDashboard.data.orders.length + 1).padStart(2,'0')}`;
        document.getElementById('new-pi').value = piNo;
        document.getElementById('new-customer').value = '';
        document.getElementById('new-product').value = '';
        document.getElementById('new-amount').value = '';
        document.getElementById('new-currency').value = 'USD';
        document.getElementById('new-rate').value = WorkbenchDashboard.data.rate;
        document.getElementById('new-status').value = 'New Inquiry';
    },
    
    closeFullAddModal() {
        const modal = document.getElementById('add-order-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('active');
        }
    },
    
    saveFullOrder() {
        const customer = document.getElementById('new-customer').value.trim();
        const amount = parseFloat(document.getElementById('new-amount').value);
        
        if (!customer || !amount) {
            WorkbenchUtils.toast('请填写必填项', 'warning');
            return;
        }
        
        const order = {
            id: document.getElementById('new-pi').value,
            customer: customer,
            product: document.getElementById('new-product').value.trim(),
            total: amount,
            currency: document.getElementById('new-currency').value,
            exchangeRate: parseFloat(document.getElementById('new-rate').value),
            kanbanStatus: document.getElementById('new-status').value,
            status: document.getElementById('new-status').value,
            date: new Date().toISOString(),
            notes: '',
            supplier: '',
            cost: 0,
            grossProfit: 0,
            grossMargin: 0
        };
        
        WorkbenchDashboard.data.orders.push(order);
        WorkbenchStorage.save(WorkbenchConfig.STORAGE_KEYS.ORDERS, WorkbenchDashboard.data.orders);
        
        WorkbenchUtils.toast('订单创建成功', 'success');
        this.closeFullAddModal();
        this.render();
        WorkbenchDashboard.updateDashboard();
    },
    
    updateQuickRate() {
        const currency = document.getElementById('quick-currency').value;
        const rateInput = document.getElementById('quick-rate');
        if (currency === 'CNY') {
            rateInput.value = 1;
        } else {
            rateInput.value = WorkbenchDashboard.data.rate;
        }
    },
    
    updateFullRate() {
        const currency = document.getElementById('new-currency').value;
        const rateInput = document.getElementById('new-rate');
        if (currency === 'CNY') {
            rateInput.value = 1;
        } else {
            rateInput.value = WorkbenchDashboard.data.rate;
        }
    },
    
    updateEditRate() {
        const currency = document.getElementById('edit-currency').value;
        const rateInput = document.getElementById('edit-rate');
        if (currency === 'CNY') {
            rateInput.value = 1;
        } else {
            rateInput.value = WorkbenchDashboard.data.rate;
        }
    },
    
    calculateQuickProfit() {
        const amount = parseFloat(document.getElementById('quick-amount').value) || 0;
        const cost = parseFloat(document.getElementById('quick-cost').value) || 0;
        const currency = document.getElementById('quick-currency').value;
        const rate = parseFloat(document.getElementById('quick-rate').value) || WorkbenchDashboard.data.rate;
        
        const revenueRMB = currency === 'CNY' ? amount : amount * rate;
        const costRMB = currency === 'CNY' ? cost : cost * rate;
        const profit = revenueRMB - costRMB;
        const margin = revenueRMB > 0 ? (profit / revenueRMB * 100) : 0;
        
        const profitValue = document.getElementById('quick-profit-value');
        const marginValue = document.getElementById('quick-margin-value');
        
        if (profitValue && marginValue) {
            profitValue.textContent = '¥' + WorkbenchUtils.formatNumber(profit, 0);
            marginValue.textContent = '(' + margin.toFixed(1) + '%)';
            profitValue.className = profit < 0 ? 'text-red-400 font-bold ml-2' : 'text-green-400 font-bold ml-2';
        }
    },
    
    updateCustomerSuggestions() {
        const datalists = [
            document.getElementById('customer-datalist'),
            document.getElementById('customer-datalist-full')
        ];
        
        datalists.forEach(datalist => {
            if (!datalist) return;
            datalist.innerHTML = '';
            WorkbenchDashboard.data.customers.forEach(customer => {
                const option = document.createElement('option');
                option.value = customer.company;
                datalist.appendChild(option);
            });
        });
    },
    
    updateSupplierSuggestions() {
        const selects = [
            document.getElementById('quick-supplier'),
            document.getElementById('new-supplier'),
            document.getElementById('edit-supplier')
        ];
        
        selects.forEach(select => {
            if (!select) return;
            select.innerHTML = '<option value="">未指定</option>';
            WorkbenchDashboard.data.suppliers.forEach(supplier => {
                const option = document.createElement('option');
                option.value = supplier.id;
                option.textContent = supplier.company;
                select.appendChild(option);
            });
        });
    }
};
// ============================================
// js/workbench-orders.js - 末尾添加
// ============================================

// ... (所有现有代码保持不变) ...

// 🔥 FIX: 显式挂载到window对象
window.WorkbenchOrders = WorkbenchOrders;
