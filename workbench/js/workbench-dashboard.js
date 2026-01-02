// ============================================
// V14.0 ERP - DASHBOARD & SURVIVAL MODE
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
    
    /**
     * 初始化Dashboard
     */
    async init() {
        console.log('[Dashboard] Initializing V14.0 ERP Dashboard...');
        
        // 加载数据
        await this.loadData();
        
        // 检查红线状态
        this.checkCashRedLine();
        
        // 更新Dashboard
        this.updateDashboard();
        
        // 启动时钟
        this.startClock();
        
        // 定时检查红线 (每5分钟)
        setInterval(() => this.checkCashRedLine(), 5 * 60 * 1000);
        
        return this;
    },
    
    /**
     * 加载数据
     */
    async loadData() {
        console.log('[Dashboard] Loading data from storage...');
        
        this.data.orders = await WorkbenchStorage.load(
            WorkbenchConfig.STORAGE_KEYS.ORDERS, []
        );
        this.data.customers = await WorkbenchStorage.load(
            WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, []
        );
        this.data.suppliers = await WorkbenchStorage.load(
            WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, []
        );
        this.data.expenses = await WorkbenchStorage.load(
            WorkbenchConfig.STORAGE_KEYS.EXPENSES, []
        );
        this.data.target = await WorkbenchStorage.load(
            WorkbenchConfig.STORAGE_KEYS.TARGET, 5000000
        );
        this.data.rate = await WorkbenchStorage.load(
            WorkbenchConfig.STORAGE_KEYS.USD_RATE, 6.98
        );
        this.data.feishuWebhook = await WorkbenchStorage.load(
            WorkbenchConfig.STORAGE_KEYS.FEISHU_WEBHOOK, ''
        );
        this.data.todayActions = await WorkbenchStorage.load(
            WorkbenchConfig.STORAGE_KEYS.TODAY_ACTIONS, ['', '', '']
        );
        
        // 🆕 V14.0: 数据迁移 - 为旧订单添加成本字段
        this.data.orders = this.data.orders.map(order => {
            if (order.cost === undefined) {
                order.cost = 0;
                order.supplier = '';
                order.costCurrency = order.currency || 'USD';
                order.costExchangeRate = order.exchangeRate || this.data.rate;
                order._needsCostUpdate = true;
            }
            return order;
        });
        
        // 🆕 V13.5: 自动提取客户档案
        if (this.data.customers.length === 0 && this.data.orders.length > 0) {
            this.extractCustomersFromOrders();
        }
        
        console.log('[Dashboard] Data loaded:', {
            orders: this.data.orders.length,
            customers: this.data.customers.length,
            suppliers: this.data.suppliers.length,
            expenses: this.data.expenses.length
        });
    },
    
    /**
     * 从订单中提取客户档案
     */
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
        WorkbenchStorage.save(WorkbenchConfig.STORAGE_KEYS.CUSTOMERS, this.data.customers);
        
        console.log('[Dashboard] Extracted', this.data.customers.length, 'customers from orders');
    },
    
    /**
     * 🔥 V13.5强化: 检查现金红线 (72小时未进账)
     */
    checkCashRedLine() {
        console.log('[V14.0 CRITICAL] ========== RED LINE CHECK START ==========');
        
        // STEP 1: Triple-check Paid orders
        const paidOrders = this.data.orders.filter(o => {
            const isPaid = o.kanbanStatus === 'Paid' || o.status === 'Paid';
            if (isPaid) {
                console.log(`  ✅ Paid Order Found: ${o.id} | ${o.customer} | ${o.currency} ${o.total} | Date: ${o.date}`);
            }
            return isPaid;
        });
        
        console.log(`[V14.0] Total Paid Orders: ${paidOrders.length}`);
        
        if (paidOrders.length === 0) {
            console.log('[V14.0] ❌ No Paid orders - ACTIVATE CRITICAL MODE');
            this.activateCriticalMode('无Paid订单');
            console.log('[V14.0 CRITICAL] ========== RED LINE CHECK END ==========');
            return;
        }
        
        // STEP 2: Force sort using getTime() for millisecond precision
        const sortedPaid = [...paidOrders].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            const diff = dateB.getTime() - dateA.getTime(); // Descending
            console.log(`  Sort Compare: ${a.id}(${dateA.toISOString()}) vs ${b.id}(${dateB.toISOString()}) diff=${diff}ms`);
            return diff;
        });
        
        const lastPaid = sortedPaid[0];
        console.log(`[V14.0] Most Recent Paid Order: ${lastPaid.id}`);
        
        // STEP 3: Strict date field validation
        if (!lastPaid.date) {
            console.error('[V14.0 ERROR] ❌ lastPaid.date is MISSING!', lastPaid);
            this.activateCriticalMode('数据异常：缺少日期字段');
            console.log('[V14.0 CRITICAL] ========== RED LINE CHECK END ==========');
            return;
        }
        
        // STEP 4: Millisecond-level time calculation
        const lastPaidDate = new Date(lastPaid.date);
        const now = new Date();
        const millisSince = now.getTime() - lastPaidDate.getTime();
        const hoursSince = millisSince / (1000 * 60 * 60);
        const daysSince = Math.floor(hoursSince / 24);
        
        console.log('[V14.0] TIME CALCULATION:');
        console.log(`  Last Paid Date: ${lastPaidDate.toISOString()} (${lastPaidDate.getTime()})`);
        console.log(`  Current Time:   ${now.toISOString()} (${now.getTime()})`);
        console.log(`  Milliseconds Since: ${millisSince}`);
        console.log(`  Hours Since: ${hoursSince.toFixed(2)}`);
        console.log(`  Days Since: ${daysSince}`);
        
        // STEP 5: 72-hour threshold check
        const THRESHOLD = WorkbenchConfig.CASH_RED_LINE_HOURS;
        if (hoursSince > THRESHOLD) {
            console.log(`[V14.0] ❌ ${hoursSince.toFixed(2)}h > ${THRESHOLD}h - ACTIVATE CRITICAL MODE`);
            this.activateCriticalMode(`${daysSince}天未进账`);
        } else {
            console.log(`[V14.0] ✅ ${hoursSince.toFixed(2)}h <= ${THRESHOLD}h - DEACTIVATE CRITICAL MODE`);
            this.deactivateCriticalMode();
        }
        
        console.log('[V14.0 CRITICAL] ========== RED LINE CHECK END ==========');
    },
    
    /**
     * 激活生存模式 (红屏)
     */
    activateCriticalMode(reason = '现金流告急') {
        if (this.data.isCritical) return; // 已经是红屏状态
        
        console.log('[Dashboard] 🔴 ACTIVATING CRITICAL MODE:', reason);
        
        this.data.isCritical = true;
        
        // 红屏效果
        const header = document.getElementById('header');
        if (header) {
            header.classList.remove('bg-slate-900');
            header.classList.add('bg-danger');
        }
        
        // 修改标题
        const title = document.getElementById('header-title');
        if (title) {
            title.innerHTML = `
                <span class="text-white">⚠️ 战时指挥台</span>
                <span class="text-xs bg-white text-danger px-2 py-0.5 rounded-full">生存模式</span>
            `;
        }
        
        // 修改副标题
        const subtitle = document.getElementById('header-subtitle');
        if (subtitle) {
            subtitle.textContent = `SURVIVAL MODE · ${reason}`;
        }
        
        // 🔥 CRITICAL FIX: 隐藏非核心功能（使用.survival-hidden类）
        const nonCriticalModules = [
            'tools-section',
            'logistics-section', 
            'global-clock-section'
        ];
        
        nonCriticalModules.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('survival-hidden');
            }
        });
        
        WorkbenchUtils.toast(`🔴 生存模式激活: ${reason}`, 'error', 5000);
    },
    
    /**
     * 🔥 CRITICAL FIX: 解除生存模式 (移除.survival-hidden类)
     */
    deactivateCriticalMode() {
        if (!this.data.isCritical) return; // 本来就不是红屏状态
        
        console.log('[Dashboard] ✅ DEACTIVATING CRITICAL MODE');
        
        this.data.isCritical = false;
        
        // 恢复正常Header
        const header = document.getElementById('header');
        if (header) {
            header.classList.remove('bg-danger');
            header.classList.add('bg-slate-900');
        }
        
        // 恢复标题
        const title = document.getElementById('header-title');
        if (title) {
            title.innerHTML = `
                战时指挥台 <span class="text-xs bg-danger text-white px-2 py-0.5 rounded-full">V14.0</span>
            `;
        }
        
        // 恢复副标题
        const subtitle = document.getElementById('header-subtitle');
        if (subtitle) {
            subtitle.textContent = 'ERP EDITION · 供应链 · 财务 · 真实利润';
        }
        
        // 🔥 CRITICAL FIX: 显示所有功能模块（移除.survival-hidden类）
        const allModules = [
            'tools-section',
            'logistics-section',
            'global-clock-section'
        ];
        
        allModules.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('survival-hidden');
            }
        });
        
        WorkbenchUtils.toast('✅ 生存模式解除 - 全功能恢复', 'success', 5000);
    },
    
    /**
     * 更新Dashboard数据
     */
    updateDashboard() {
        console.log('[Dashboard] Updating dashboard metrics...');
        
        // 🆕 V14.0: 财务指标计算
        let totalRevenue = 0;
        let totalCost = 0;
        let totalGrossProfit = 0;
        
        this.data.orders.forEach(order => {
            if (order.kanbanStatus === 'Paid' || order.status === 'Paid') {
                const rate = order.currency === 'CNY' ? 1 : (order.exchangeRate || this.data.rate);
                const revenueRMB = order.total * rate;
                const costRMB = (order.cost || 0) * (order.costCurrency === 'CNY' ? 1 : (order.costExchangeRate || rate));
                
                totalRevenue += revenueRMB;
                totalCost += costRMB;
                totalGrossProfit += (revenueRMB - costRMB);
            }
        });
        
        // 运营支出
        const totalExpenses = this.data.expenses.reduce((sum, exp) => {
            const expRMB = exp.currency === 'CNY' ? exp.amount : exp.amount * this.data.rate;
            return sum + expRMB;
        }, 0);
        
        // 净利润
        const netProfit = totalGrossProfit - totalExpenses;
        
        // 目标缺口
        const gap = this.data.target - totalRevenue;
        const progress = (totalRevenue / this.data.target * 100).toFixed(1);
        
        // 更新显示
        WorkbenchUtils.setText('total-revenue', '¥' + WorkbenchUtils.formatNumber(totalRevenue / 10000, 1) + 'w');
        WorkbenchUtils.setText('total-cost', '¥' + WorkbenchUtils.formatNumber(totalCost / 10000, 1) + 'w');
        WorkbenchUtils.setText('gross-profit', '¥' + WorkbenchUtils.formatNumber(totalGrossProfit / 10000, 1) + 'w');
        WorkbenchUtils.setText('total-expenses', '¥' + WorkbenchUtils.formatNumber(totalExpenses / 10000, 1) + 'w');
        WorkbenchUtils.setText('net-profit', '¥' + WorkbenchUtils.formatNumber(netProfit / 10000, 1) + 'w');
        WorkbenchUtils.setText('target-amount', '¥' + WorkbenchUtils.formatNumber(this.data.target / 10000, 0) + 'w');
        WorkbenchUtils.setText('gap-amount', '¥' + WorkbenchUtils.formatNumber(gap / 10000, 0) + 'w');
        WorkbenchUtils.setText('progress-percent', progress + '%');
        
        // 更新进度条
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
        
        console.log('[Dashboard] Metrics updated:', {
            revenue: totalRevenue,
            cost: totalCost,
            grossProfit: totalGrossProfit,
            expenses: totalExpenses,
            netProfit: netProfit
        });
    },
    
    /**
     * 启动时钟
     */
    startClock() {
        const updateClock = () => {
            // 本地时间
            const now = new Date();
            WorkbenchUtils.setText('local-time', WorkbenchUtils.formatDate(now, 'HH:mm:ss'));
            WorkbenchUtils.setText('local-date', WorkbenchUtils.formatDate(now, 'YYYY-MM-DD'));
            
            // 全球时钟
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
                    console.error(`Clock error for ${tz.city}:`, error);
                }
            });
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    },
    
    /**
     * 保存今日行动
     */
    async saveTodayActions() {
        this.data.todayActions = [
            document.getElementById('action-1')?.value || '',
            document.getElementById('action-2')?.value || '',
            document.getElementById('action-3')?.value || ''
        ];
        
        await WorkbenchStorage.save(
            WorkbenchConfig.STORAGE_KEYS.TODAY_ACTIONS,
            this.data.todayActions
        );
        
        WorkbenchUtils.toast('今日行动已保存', 'success');
    },
    
    /**
     * 导出数据
     */
    exportData() {
        const backup = WorkbenchStorage.exportAll();
        const filename = `V14.0_ERP_Backup_${WorkbenchUtils.formatDate(new Date(), 'YYYY-MM-DD')}.json`;
        WorkbenchUtils.downloadJSON(backup, filename);
        WorkbenchUtils.toast('数据导出成功', 'success');
    },
    
    /**
     * 导入数据
     */
    async importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                
                const success = await WorkbenchStorage.importAll(data);
                if (success) {
                    WorkbenchUtils.toast('数据导入成功，页面即将刷新', 'success');
                    setTimeout(() => location.reload(), 1500);
                } else {
                    WorkbenchUtils.toast('数据导入失败', 'error');
                }
            } catch (error) {
                console.error('Import error:', error);
                WorkbenchUtils.toast('文件格式错误', 'error');
            }
        };
        
        input.click();
    }
};
