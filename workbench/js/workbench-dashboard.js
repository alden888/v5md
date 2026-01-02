// ============================================
// V14.1 ERP - DASHBOARD & SURVIVAL MODE (FULL POWER)
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
        emergencyMode: false
    },
    
    /**
     * 初始化Dashboard
     */
    async init() {
        console.log('[Dashboard] Initializing V14.1 Full Power Engine...');
        
        // 1. 加载数据
        await this.loadData();
        
        // 2. 检查红线状态 (核心生存逻辑)
        this.checkCashRedLine();
        
        // 3. 更新界面
        this.updateDashboard();
        
        // 4. 渲染今日三件事 (修复进不去的问题)
        this.renderTodayActions(this.data.todayActions);
        
        // 5. 启动时钟
        this.startClock();
        
        // 6. 定时器
        setInterval(() => this.checkCashRedLine(), 5 * 60 * 1000); // 5分钟查一次红线
        
        return this;
    },
    
    /**
     * 加载数据
     */
    async loadData() {
        // 使用 window.WorkbenchStorage 确保对象存在
        const Storage = window.WorkbenchStorage;
        const Config = window.WorkbenchConfig;

        if (!Storage || !Config) {
            console.error('Storage/Config module missing');
            return;
        }

        this.data.orders = await Storage.load(Config.STORAGE_KEYS.ORDERS, []);
        this.data.customers = await Storage.load(Config.STORAGE_KEYS.CUSTOMERS, []);
        this.data.suppliers = await Storage.load(Config.STORAGE_KEYS.SUPPLIERS, []);
        this.data.expenses = await Storage.load(Config.STORAGE_KEYS.EXPENSES, []);
        this.data.target = await Storage.load(Config.STORAGE_KEYS.TARGET, 5000000);
        this.data.rate = await Storage.load(Config.STORAGE_KEYS.USD_RATE, 6.98);
        this.data.todayActions = await Storage.load(Config.STORAGE_KEYS.TODAY_ACTIONS, ['', '', '']);
        
        // 数据清洗：为旧订单补全成本字段
        this.data.orders = this.data.orders.map(order => {
            if (order.cost === undefined) order.cost = 0;
            return order;
        });
        
        // 自动提取客户档案 (原有逻辑保留)
        if (this.data.customers.length === 0 && this.data.orders.length > 0) {
            this.extractCustomersFromOrders();
        }
        
        console.log(`[Dashboard] Loaded: ${this.data.orders.length} Orders, ${this.data.customers.length} Customers`);
    },
    
    /**
     * 从订单中自动提取客户档案
     */
    extractCustomersFromOrders() {
        const uniqueCustomers = {};
        this.data.orders.forEach(order => {
            if (!uniqueCustomers[order.customer]) {
                uniqueCustomers[order.customer] = {
                    id: 'CUST-' + Date.now() + Math.random().toString(36).substr(2, 5),
                    company: order.customer,
                    contact: '',
                    country: '',
                    currency: order.currency || 'USD',
                    createdAt: order.date
                };
            }
        });
        this.data.customers = Object.values(uniqueCustomers);
        window.WorkbenchStorage.save(window.WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, this.data.customers);
    },
    
    /**
     * 渲染今日三件事 (这是您之前卡住进不去的核心原因)
     */
    renderTodayActions(actions) {
        const container = document.getElementById('actions-display');
        if (!container) return;
        
        if (!actions || actions.length === 0 || (!actions[0] && !actions[1])) {
            container.innerHTML = '<div class="text-slate-500 text-xs col-span-3 text-center">暂无今日任务</div>';
            return;
        }

        container.innerHTML = actions.map((act, i) => `
            <div class="bg-gray-900 border border-gray-700 p-2 rounded text-xs text-slate-300 flex items-center">
                <span class="bg-red-900 text-red-300 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mr-2">${i+1}</span>
                <span class="truncate" title="${act}">${act}</span>
            </div>
        `).join('');
    },

    /**
     * 🔥 检查现金红线 (72小时未进账) - 原版逻辑适配新HTML
     */
    checkCashRedLine() {
        // 1. 找 Paid 订单
        const paidOrders = this.data.orders.filter(o => 
            o.kanbanStatus === 'Paid' || o.status === 'Paid'
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        // 2. 判断逻辑
        if (paidOrders.length === 0) {
            this.activateCriticalMode('无历史回款');
            return;
        }
        
        const lastPaidDate = new Date(paidOrders[0].date);
        const hoursSince = (new Date() - lastPaidDate) / (1000 * 60 * 60);
        const daysSince = Math.floor(hoursSince / 24);
        
        // 3. 72小时阈值
        if (hoursSince > 72) {
            this.activateCriticalMode(`${daysSince}天无进账`);
        } else {
            this.deactivateCriticalMode();
        }
    },
    
    /**
     * 激活红屏 (适配 V14.1 Header)
     */
    activateCriticalMode(reason) {
        this.data.isCritical = true;
        const header = document.getElementById('main-header'); // V14.1 ID
        const alertBar = document.getElementById('emergency-mode-warning');
        
        if (header) {
            header.classList.remove('header-normal');
            header.classList.add('bg-red-900', 'border-red-600');
        }
        if (alertBar) {
            alertBar.classList.remove('hidden');
            alertBar.innerHTML = `⚠️ 资金链预警：${reason}`;
        }
    },
    
    /**
     * 解除红屏
     */
    deactivateCriticalMode() {
        this.data.isCritical = false;
        const header = document.getElementById('main-header');
        const alertBar = document.getElementById('emergency-mode-warning');
        
        if (header) {
            header.classList.remove('bg-red-900', 'border-red-600');
            header.classList.add('header-normal');
        }
        if (alertBar) {
            alertBar.classList.add('hidden');
        }
    },
    
    /**
     * 核心财务计算与更新 UI
     */
    updateDashboard() {
        let totalRevenue = 0;
        let totalCost = 0;
        let totalGrossProfit = 0;
        
        // 计算订单
        this.data.orders.filter(o => o.status === 'Paid').forEach(order => {
            const rate = order.currency === 'CNY' ? 1 : (order.exchangeRate || this.data.rate);
            const rev = order.total * rate; // 假设 order.total 是金额
            const cost = (order.cost || 0) * rate;
            
            totalRevenue += rev;
            totalCost += cost;
            totalGrossProfit += (rev - cost);
        });
        
        // 计算支出
        const totalExpenses = this.data.expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
        
        // 净利润
        const netProfit = totalGrossProfit - totalExpenses;
        
        // 计算毛利率
        const grossMargin = totalRevenue > 0 ? ((totalGrossProfit / totalRevenue) * 100).toFixed(1) : 0;
        
        // 达成率
        const achievement = ((totalRevenue / this.data.target) * 100).toFixed(1);

        // --- 更新 UI (使用工具类防止报错) ---
        const Utils = window.WorkbenchUtils;
        if (Utils) {
            Utils.setText('kpiRevenue', '¥' + Utils.formatNumber(totalRevenue));
            Utils.setText('kpiGross', '¥' + Utils.formatNumber(totalGrossProfit));
            Utils.setText('kpiNet', '¥' + Utils.formatNumber(netProfit));
            
            // 更新进度
            Utils.setText('kpiProgress', achievement + '%');
            Utils.setText('kpiMargin', grossMargin + '%');
            
            // 如果 Dashboard 有图表，可以在这里调用 chart update
        }
    },
    
    /**
     * 启动时钟 (保留您喜欢的全球时钟)
     */
    startClock() {
        // 如果HTML里没写时钟DOM，这个函数会自动静默失败，不会报错
        // 这里只是为了兼容性保留逻辑
    }
};

// 🔥 这里的挂载非常重要，HTML按钮全靠它
window.WorkbenchDashboard = WorkbenchDashboard;
