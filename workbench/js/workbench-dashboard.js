// ============================================
// V14.1 ERP - DASHBOARD & SURVIVAL MODE
// FULLY FUNCTIONAL & OPTIMIZED
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
        console.log('[Dashboard] 🚀 Initializing V14.1 Full Power Engine...');
        
        try {
            // 1. 加载数据
            await this.loadData();
            
            // 2. 检查红线状态
            this.checkCashRedLine();
            
            // 3. 更新界面
            this.updateDashboard();
            
            // 4. 渲染今日三件事
            const savedActions = JSON.parse(localStorage.getItem('v14_today_actions') || '["", "", ""]');
            this.renderTodayActions(savedActions);
            
            // 5. 启动时钟
            this.startClock();
            
            // 6. 定时器
            setInterval(() => this.checkCashRedLine(), 5 * 60 * 1000); // 5分钟查一次
            setInterval(() => this.updateClock(), 1000); // 每秒更新时钟
            
            console.log('[Dashboard] ✅ Initialization Complete');
        } catch (error) {
            console.error('[Dashboard] ❌ Initialization Failed:', error);
        }
        
        return this;
    },
    
    /**
     * 加载数据
     */
    async loadData() {
        const Storage = window.WorkbenchStorage;
        const Config = window.WorkbenchConfig;

        if (!Storage || !Config) {
            console.error('[Dashboard] Storage/Config module missing');
            return;
        }

        try {
            this.data.orders = await Storage.load(Config.STORAGE_KEYS.ORDERS, []);
            this.data.customers = await Storage.load(Config.STORAGE_KEYS.CUSTOMERS, []);
            this.data.suppliers = await Storage.load(Config.STORAGE_KEYS.SUPPLIERS, []);
            this.data.expenses = await Storage.load(Config.STORAGE_KEYS.EXPENSES, []);
            this.data.target = await Storage.load(Config.STORAGE_KEYS.TARGET, 5000000);
            this.data.rate = await Storage.load(Config.STORAGE_KEYS.USD_RATE, 6.98);
            this.data.feishuWebhook = await Storage.load(Config.STORAGE_KEYS.FEISHU_WEBHOOK, '');
            this.data.todayActions = await Storage.load(Config.STORAGE_KEYS.TODAY_ACTIONS, ['', '', '']);
            
            // 数据清洗：为旧订单补全成本字段
            this.data.orders = this.data.orders.map(order => {
                if (order.cost === undefined) order.cost = 0;
                if (order.grossProfit === undefined) order.grossProfit = 0;
                if (order.grossMargin === undefined) order.grossMargin = 0;
                return order;
            });
            
            // 自动提取客户档案
            if (this.data.customers.length === 0 && this.data.orders.length > 0) {
                this.extractCustomersFromOrders();
            }
            
            console.log(`[Dashboard] 📊 Loaded: ${this.data.orders.length} Orders, ${this.data.customers.length} Customers, ${this.data.expenses.length} Expenses`);
        } catch (error) {
            console.error('[Dashboard] ❌ Data Load Failed:', error);
        }
    },
    
    /**
     * 从订单中自动提取客户档案
     */
    extractCustomersFromOrders() {
        const uniqueCustomers = {};
        this.data.orders.forEach(order => {
            if (order.customer && !uniqueCustomers[order.customer]) {
                uniqueCustomers[order.customer] = {
                    id: 'CUST-' + Date.now() + Math.random().toString(36).substr(2, 5),
                    company: order.customer,
                    contact: '',
                    whatsapp: '',
                    country: '',
                    currency: order.currency || 'USD',
                    address: '',
                    notes: '',
                    createdAt: order.date || new Date().toISOString()
                };
            }
        });
        this.data.customers = Object.values(uniqueCustomers);
        window.WorkbenchStorage.save(window.WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, this.data.customers);
        console.log(`[Dashboard] 📇 Extracted ${this.data.customers.length} customers from orders`);
    },
    
    /**
     * 渲染今日三件事
     */
    renderTodayActions(actions) {
        const container = document.getElementById('actions-display');
        if (!container) return;
        
        if (!actions || actions.length === 0 || (!actions[0] && !actions[1] && !actions[2])) {
            container.innerHTML = '<div class="text-slate-500 text-xs col-span-3 text-center">暂无今日任务</div>';
            return;
        }

        container.innerHTML = actions.map((act, i) => `
            <div class="bg-gray-900 border border-gray-700 p-2 rounded text-xs text-slate-300 flex items-center">
                <span class="bg-red-900 text-red-300 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mr-2">${i+1}</span>
                <span class="truncate flex-1" title="${act || ''}">${act || '未填写'}</span>
            </div>
        `).join('');
    },

    /**
     * 🔥 检查现金红线（72小时未进账）
     */
    checkCashRedLine() {
        // 找Paid订单
        const paidOrders = this.data.orders
            .filter(o => o.kanbanStatus === 'Paid' || o.status === 'Paid')
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // 判断逻辑
        if (paidOrders.length === 0) {
            this.activateCriticalMode('无历史回款');
            return;
        }
        
        const lastPaidDate = new Date(paidOrders[0].date);
        const hoursSince = (new Date() - lastPaidDate) / (1000 * 60 * 60);
        const daysSince = Math.floor(hoursSince / 24);
        
        // 更新最后回款显示
        this.updateLastIncomeDisplay(paidOrders[0], hoursSince);
        
        // 72小时阈值
        if (hoursSince > 72) {
            this.activateCriticalMode(`${daysSince}天无进账`);
        } else {
            this.deactivateCriticalMode();
        }
    },
    
    /**
     * 更新最后回款显示
     */
    updateLastIncomeDisplay(lastOrder, hoursSince) {
        const infoEl = document.getElementById('lastIncomeInfo');
        const hoursEl = document.getElementById('hoursSinceIncome');
        const cardEl = document.getElementById('last-income-card');
        
        if (infoEl && lastOrder) {
            const amount = lastOrder.currency === 'CNY' ? lastOrder.total : lastOrder.total * this.data.rate;
            infoEl.textContent = `${lastOrder.customer} · ${lastOrder.currency} ${lastOrder.total.toLocaleString()} (≈¥${Math.round(amount).toLocaleString()})`;
        }
        
        if (hoursEl) {
            const hours = Math.floor(hoursSince);
            hoursEl.textContent = hours;
            
            // 根据时间改变颜色
            if (hours < 24) {
                hoursEl.className = 'text-4xl font-black text-green-400';
            } else if (hours < 48) {
                hoursEl.className = 'text-4xl font-black text-yellow-400';
            } else if (hours < 72) {
                hoursEl.className = 'text-4xl font-black text-orange-400';
            } else {
                hoursEl.className = 'text-4xl font-black text-red-400';
            }
        }
        
        // 卡片警告样式
        if (cardEl) {
            if (hoursSince > 72) {
                cardEl.className = 'bg-red-900/20 p-6 rounded-xl border-2 border-red-500 animate-pulse';
            } else {
                cardEl.className = 'bg-gray-900 p-6 rounded-xl border-2 border-gray-700';
            }
        }
    },
    
    /**
     * 激活红屏（适配V14.1 Header）
     */
    activateCriticalMode(reason) {
        this.data.isCritical = true;
        const header = document.getElementById('main-header');
        const alertBar = document.getElementById('emergency-mode-warning');
        
        if (header) {
            header.className = 'fixed top-0 left-0 right-0 bg-gradient-to-r from-red-900 to-red-800 z-50 h-[70px] border-b border-red-700';
        }
        if (alertBar) {
            alertBar.classList.remove('hidden');
            alertBar.textContent = `⚠️ 资金链预警：${reason}`;
        }
        
        console.log(`[Dashboard] 🚨 CRITICAL MODE ACTIVATED: ${reason}`);
    },
    
    /**
     * 解除红屏
     */
    deactivateCriticalMode() {
        this.data.isCritical = false;
        const header = document.getElementById('main-header');
        const alertBar = document.getElementById('emergency-mode-warning');
        
        if (header) {
            header.className = 'fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-blue-800 z-50 h-[70px] border-b border-blue-700';
        }
        if (alertBar) {
            alertBar.classList.add('hidden');
        }
    },
    
    /**
     * 核心财务计算与更新UI
     */
    updateDashboard() {
        let totalRevenue = 0;
        let totalCost = 0;
        let totalGrossProfit = 0;
        
        // 计算订单（只统计Paid的）
        this.data.orders.filter(o => o.status === 'Paid' || o.kanbanStatus === 'Paid').forEach(order => {
            const rate = order.currency === 'CNY' ? 1 : (order.exchangeRate || this.data.rate);
            const rev = order.total * rate;
            const cost = (order.cost || 0) * rate;
            
            totalRevenue += rev;
            totalCost += cost;
            totalGrossProfit += (rev - cost);
        });
        
        // 计算支出
        const totalExpenses = this.data.expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
        
        // 净利润
        const netProfit = totalGrossProfit - totalExpenses;
        
        // 毛利率
        const grossMargin = totalRevenue > 0 ? ((totalGrossProfit / totalRevenue) * 100) : 0;
        
        // 达成率
        const achievement = ((totalRevenue / this.data.target) * 100);

        // 更新UI
        this.setElementText('dashboard-revenue', '¥' + this.formatNumber(totalRevenue));
        this.setElementText('dashboard-cost', '¥' + this.formatNumber(totalCost));
        this.setElementText('dashboard-gross', '¥' + this.formatNumber(totalGrossProfit));
        this.setElementText('dashboard-net', '¥' + this.formatNumber(netProfit));
        this.setElementText('dashboard-progress', achievement.toFixed(1) + '%');
        this.setElementText('dashboard-margin', grossMargin.toFixed(1) + '%');
        
        console.log('[Dashboard] 📊 Metrics Updated:', {
            revenue: totalRevenue,
            cost: totalCost,
            grossProfit: totalGrossProfit,
            netProfit: netProfit,
            margin: grossMargin,
            achievement: achievement
        });
    },
    
    /**
     * 启动时钟
     */
    startClock() {
        this.updateClock();
        // 时钟每秒更新一次，已在init中设置interval
    },
    
    /**
     * 更新时钟显示
     */
    updateClock() {
        // 本地时间
        const now = new Date();
        const timeStr = now.toLocaleTimeString('zh-CN', { hour12: false });
        const dateStr = now.toLocaleDateString('zh-CN');
        
        this.setElementText('local-time', timeStr);
        this.setElementText('local-date', dateStr);
        
        // 全球时钟
        try {
            this.setElementText('time-beijing', now.toLocaleTimeString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }));
            this.setElementText('time-manila', now.toLocaleTimeString('zh-CN', { timeZone: 'Asia/Manila', hour12: false }));
            this.setElementText('time-istanbul', now.toLocaleTimeString('zh-CN', { timeZone: 'Europe/Istanbul', hour12: false }));
            this.setElementText('time-amsterdam', now.toLocaleTimeString('zh-CN', { timeZone: 'Europe/Amsterdam', hour12: false }));
        } catch (e) {
            // 时区不支持时静默失败
        }
    },
    
    /**
     * 工具方法：设置元素文本
     */
    setElementText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    },
    
    /**
     * 工具方法：格式化数字
     */
    formatNumber(num) {
        if (isNaN(num)) return '0';
        return Math.round(num).toLocaleString('zh-CN');
    }
};

// 🔥 挂载到Window
window.WorkbenchDashboard = WorkbenchDashboard;
