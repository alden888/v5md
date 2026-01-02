// ============================================
// js/workbench-dashboard.js - 修复版（只更新KPI）
// ============================================

const WorkbenchDashboard = {
    data: {
        orders: [],
        customers: [],
        suppliers: [],
        expenses: [],
        target: 5000000,
        rate: 6.98,
        feishuWebhook: '',
        todayActions: ['', '', ''],
        isCritical: false,
        emergencyMode: false,
        emergencyEndTime: 0
    },
    
    async init() {
        console.log('[Dashboard] Initializing...');
        await this.loadData();
        this.checkCashRedLine();
        this.updateDashboard();
        this.startClock();
        
        setInterval(() => this.checkCashRedLine(), 5 * 60 * 1000);
        return this;
    },
    
    async loadData() {
        console.log('[Dashboard] Loading data...');
        
        this.data.orders = WorkbenchStorage.loadLocal(WorkbenchConfig.STORAGE_KEYS.ORDERS, []);
        this.data.customers = WorkbenchStorage.loadLocal(WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, []);
        this.data.suppliers = WorkbenchStorage.loadLocal(WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, []);
        this.data.expenses = WorkbenchStorage.loadLocal(WorkbenchConfig.STORAGE_KEYS.EXPENSES, []);
        this.data.target = WorkbenchStorage.loadLocal(WorkbenchConfig.STORAGE_KEYS.TARGET, 5000000);
        this.data.rate = WorkbenchStorage.loadLocal(WorkbenchConfig.STORAGE_KEYS.USD_RATE, 6.98);
        this.data.feishuWebhook = WorkbenchStorage.loadLocal(WorkbenchConfig.STORAGE_KEYS.FEISHU_WEBHOOK, '');
        this.data.todayActions = WorkbenchStorage.loadLocal(WorkbenchConfig.STORAGE_KEYS.TODAY_ACTIONS, ['', '', '']);
        
        // 数据迁移
        this.data.orders = this.data.orders.map(order => {
            if (order.cost === undefined) {
                order.cost = 0;
                order.supplier = '';
                order._needsCostUpdate = true;
            }
            return order;
        });
        
        // 自动提取客户
        if (this.data.customers.length === 0 && this.data.orders.length > 0) {
            this.extractCustomersFromOrders();
        }
    },
    
    extractCustomersFromOrders() {
        const uniqueCustomers = {};
        
        this.data.orders.forEach(order => {
            if (!uniqueCustomers[order.customer]) {
                uniqueCustomers[order.customer] = {
                    id: WorkbenchUtils.generateId('CUST'),
                    company: order.customer,
                    contact: '',
                    country: '',
                    currency: order.currency || 'USD',
                    notes: '自动提取',
                    createdAt: order.date,
                    totalOrders: 0,
                    totalSales: 0
                };
            }
        });
        
        this.data.customers = Object.values(uniqueCustomers);
        WorkbenchStorage.saveLocal(WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, this.data.customers);
    },
    
    checkCashRedLine() {
        console.log('[V14.0 CRITICAL] ========== RED LINE CHECK START ==========');
        
        const paidOrders = this.data.orders.filter(o => {
            const isPaid = o.kanbanStatus === 'Paid' || o.status === 'Paid';
            if (isPaid) {
                console.log(`  ✅ Paid Order: ${o.id} | ${o.customer} | ${o.currency} ${o.total}`);
            }
            return isPaid;
        });
        
        if (paidOrders.length === 0) {
            this.activateCriticalMode('无Paid订单');
            return;
        }
        
        const sortedPaid = [...paidOrders].sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        const lastPaid = sortedPaid[0];
        if (!lastPaid.date) {
            this.activateCriticalMode('数据异常');
            return;
        }
        
        const hoursSince = WorkbenchUtils.getHoursDiff(lastPaid.date);
        const daysSince = Math.floor(hoursSince / 24);
        
        console.log(`[V14.0] Hours since last Paid: ${hoursSince.toFixed(2)}h`);
        
        if (hoursSince > WorkbenchConfig.CASH_RED_LINE_HOURS) {
            this.activateCriticalMode(`${daysSince}天未进账`);
        } else {
            this.deactivateCriticalMode();
        }
        
        console.log('[V14.0 CRITICAL] ========== RED LINE CHECK END ==========');
    },
    
    activateCriticalMode(reason = '现金流告急') {
        if (this.data.isCritical) return;
        
        console.log('[Dashboard] 🔴 ACTIVATING CRITICAL MODE:', reason);
        this.data.isCritical = true;
        
        const header = document.getElementById('main-header');
        if (header) {
            header.classList.remove('header-normal');
            header.classList.add('header-critical');
        }
        
        const warning = document.getElementById('critical-warning');
        if (warning) {
            warning.classList.remove('hidden');
            document.getElementById('warning-text').textContent = reason;
        }
        
        // 🔥 FIX: 隐藏非核心功能
        document.querySelectorAll('.survival-hidden').forEach(el => {
            el.style.display = 'none';
        });
        
        WorkbenchUtils.toast(`🔴 生存模式激活: ${reason}`, 'error', 5000);
    },
    
    deactivateCriticalMode() {
        if (!this.data.isCritical) return;
        
        console.log('[Dashboard] ✅ DEACTIVATING CRITICAL MODE');
        this.data.isCritical = false;
        
        const header = document.getElementById('main-header');
        if (header) {
            header.classList.remove('header-critical');
            header.classList.add('header-normal');
        }
        
        const warning = document.getElementById('critical-warning');
        if (warning) {
            warning.classList.add('hidden');
        }
        
        // 🔥 FIX: 显示所有功能
        document.querySelectorAll('.survival-hidden').forEach(el => {
            el.style.display = '';
        });
        
        WorkbenchUtils.toast('✅ 生存模式解除', 'success', 5000);
    },
    
    /**
     * 🔥 FIX: 只更新Dashboard Tab内的数字，不重写DOM
     */
    updateDashboard() {
        console.log('[Dashboard] Updating metrics...');
        
        let totalRevenue = 0;
        let totalCost = 0;
        let totalGrossProfit = 0;
        
        this.data.orders.forEach(order => {
            if (order.kanbanStatus === 'Paid' || order.status === 'Paid') {
                const rate = order.currency === 'CNY' ? 1 : (order.exchangeRate || this.data.rate);
                const revenueRMB = order.total * rate;
                const costRMB = (order.cost || 0) * rate;
                
                totalRevenue += revenueRMB;
                totalCost += costRMB;
                totalGrossProfit += (revenueRMB - costRMB);
            }
        });
        
        const totalExpenses = this.data.expenses.reduce((sum, exp) => {
            const expRMB = exp.currency === 'CNY' ? exp.amount : exp.amount * this.data.rate;
            return sum + expRMB;
        }, 0);
        
        const netProfit = totalGrossProfit - totalExpenses;
        const gap = this.data.target - totalRevenue;
        const progress = (totalRevenue / this.data.target * 100).toFixed(1);
        
        // 🔥 只更新数字，不重写DOM
        WorkbenchUtils.setText('cash-actual', '¥' + WorkbenchUtils.formatNumber(totalRevenue / 10000, 1) + 'w');
        WorkbenchUtils.setText('cash-target', '¥' + WorkbenchUtils.formatNumber(this.data.target / 10000, 0) + 'w');
        WorkbenchUtils.setText('cash-percent', progress + '%');
        
        const progressBar = document.getElementById('cash-progress');
        if (progressBar) {
            progressBar.style.width = Math.min(parseFloat(progress), 100) + '%';
        }
        
        // 月度缺口
        const now = new Date();
        const monthsLeft = 12 - now.getMonth();
        const monthlyGap = gap / monthsLeft;
        WorkbenchUtils.setText('monthly-gap', '¥' + WorkbenchUtils.formatNumber(monthlyGap / 10000, 1) + 'w');
        WorkbenchUtils.setText('months-left', monthsLeft.toString());
        
        // 大单进行中（>1w）
        const bigDeals = this.data.orders.filter(o => {
            const statusOk = !['Paid', 'Lost'].includes(o.kanbanStatus || o.status);
            const rate = o.currency === 'CNY' ? 1 : (o.exchangeRate || this.data.rate);
            const valueRMB = o.total * rate;
            return statusOk && valueRMB >= 10000;
        });
        
        const bigDealsValue = bigDeals.reduce((sum, o) => {
            const rate = o.currency === 'CNY' ? 1 : (o.exchangeRate || this.data.rate);
            return sum + (o.total * rate);
        }, 0);
        
        WorkbenchUtils.setText('big-deals-count', bigDeals.length.toString());
        WorkbenchUtils.setText('big-deals-value', '价值 ¥' + WorkbenchUtils.formatNumber(bigDealsValue / 10000, 1) + 'w');
        
        // 最后回款
        if (paidOrders.length > 0) {
            const sortedPaid = [...paidOrders].sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            const lastPaid = sortedPaid[0];
            const daysSince = Math.floor(WorkbenchUtils.getHoursDiff(lastPaid.date) / 24);
            
            const symbol = WorkbenchUtils.getCurrencySymbol(lastPaid.currency);
            WorkbenchUtils.setText('last-income-amount', symbol + WorkbenchUtils.formatNumber(lastPaid.total, 2));
            WorkbenchUtils.setText('last-income-customer', lastPaid.customer);
            WorkbenchUtils.setText('days-since-income', daysSince.toString());
            
            const statusText = daysSince === 0 ? '今天回款' : 
                              daysSince === 1 ? '昨天回款' : 
                              `${daysSince}天前`;
            WorkbenchUtils.setText('income-status', statusText);
            
            const card = document.getElementById('last-income-card');
            if (card) {
                if (daysSince > 3) {
                    card.classList.add('danger');
                } else {
                    card.classList.remove('danger');
                }
            }
        }
    },
    
    startClock() {
        const updateClock = () => {
            const now = new Date();
            WorkbenchConfig.TIMEZONES.forEach(tz => {
                try {
                    const time = new Intl.DateTimeFormat('en-US', {
                        timeZone: tz.timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    }).format(now);
                    
                    WorkbenchUtils.setText(`clock-${tz.city.toLowerCase().replace(' ', '-')}`, time);
                } catch (error) {
                    // Ignore
                }
            });
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    },
    
    renderTodayActions(actions) {
        const container = document.getElementById('actions-display');
        if (!container) return;
        
        container.innerHTML = actions.map((act, i) => `
            <div class="action-item">
                <span class="action-number">${i+1}</span>
                <span class="flex-1 truncate">${act || '待填写'}</span>
            </div>
        `).join('');
    }
};
// ============================================
// js/workbench-dashboard.js - 末尾添加
// ============================================

// ... (所有现有代码保持不变) ...

// 🔥 FIX: 显式挂载到window对象
window.WorkbenchDashboard = WorkbenchDashboard;
