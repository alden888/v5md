/**
 * V5 Medical Workbench - Dashboard Module
 * 业绩仪表盘与数据可视化
 * @version 2.0.1 (Fixed World Clock)
 */

class WorkbenchDashboard {
    constructor() {
        this.config = window.WorkbenchConfig;
        this.storage = window.V5Workbench?.storage;
        this.currentRate = 7.25; // 默认汇率
        this.clockInterval = null; // 用于存储定时器ID
        this.data = {
            orders: [],
            target: 5000000,
            totalSales: 0,
            pipeline: 0,
            achievement: 0
        };
    }

    /**
     * 初始化仪表盘
     */
    async init() {
        // 确保 Config 已加载
        if (!this.config) {
            console.warn('[Dashboard] Config not found, retrying...');
            this.config = window.WorkbenchConfig;
        }
        
        await this.loadData();
        this.render();
        this.startAutoRefresh();
    }

    /**
     * 加载数据
     */
    async loadData() {
        try {
            if (this.storage) {
                this.data.orders = await this.storage.getOrders() || [];
                this.data.target = await this.storage.getTarget() || 5000000;
            }
            this.currentRate = parseFloat(localStorage.getItem('v5_usd_rate')) || 7.25;
            
            this.calculateMetrics();
        } catch (error) {
            console.error('[Dashboard] Load data failed:', error);
        }
    }

    /**
     * 计算关键指标
     */
    calculateMetrics() {
        let totalSalesRMB = 0;
        let pipelineRMB = 0;
        let pendingCount = 0;

        if (Array.isArray(this.data.orders)) {
            this.data.orders.forEach(order => {
                const amountRMB = order.total * this.currentRate;
                if (order.status === 'Paid') {
                    totalSalesRMB += amountRMB;
                } else if (order.status === 'Pending') {
                    pipelineRMB += amountRMB;
                    pendingCount++;
                }
            });
        }

        this.data.totalSales = totalSalesRMB;
        this.data.pipeline = pipelineRMB;
        this.data.achievement = this.data.target > 0 ? (totalSalesRMB / this.data.target) * 100 : 0;
        this.data.gap = this.data.target - totalSalesRMB;
        this.data.pendingCount = pendingCount;
        
        // 计算每日所需进账
        const today = new Date();
        const endYear = new Date(today.getFullYear(), 11, 31);
        const daysLeft = Math.ceil((endYear - today) / (1000 * 60 * 60 * 24));
        this.data.dailyNeed = daysLeft > 0 ? (this.data.gap / daysLeft) : 0;
    }

    /**
     * 渲染仪表盘
     */
    render() {
        const container = document.getElementById('workbench-content');
        if (!container) return;

        container.innerHTML = `
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h2 class="text-3xl font-bold text-slate-800">2026 战报指挥舱</h2>
                    <p class="text-sm text-slate-500 mt-1">实时业绩监控与目标达成追踪</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <div class="text-xs text-slate-500 uppercase tracking-wider">Annual Target</div>
                        <div class="text-2xl font-bold text-primary cursor-pointer hover:text-blue-700 transition" onclick="window.V5Workbench.dashboard.editTarget()">
                            ¥${this.formatNumber(this.data.target)}
                            <i class="fas fa-pen text-sm ml-1"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                ${this.renderKPICard('trophy', '年度达成率', `${this.data.achievement.toFixed(1)}%`, 'primary', this.data.achievement)}
                ${this.renderKPICard('coins', '已回款金额', `¥${this.formatNumber(this.data.totalSales)}`, 'green', null, `约 $${this.formatNumber(this.data.totalSales / this.currentRate)}`)}
                ${this.renderKPICard('mountain', '距离目标还差', `¥${this.formatNumber(this.data.gap / 10000, 1)}w`, 'red', null, `需每日 ¥${this.formatNumber(this.data.dailyNeed)}`)}
                ${this.renderKPICard('hourglass-half', '待回款 Pipeline', `¥${this.formatNumber(this.data.pipeline)}`, 'yellow', null, `${this.data.pendingCount} 个订单跟进中`)}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <i class="fas fa-chart-line text-blue-600"></i> 月度业绩趋势
                    </h3>
                    <div class="h-64 flex items-center justify-center text-slate-400">
                        <canvas id="sales-chart"></canvas>
                        <span class="text-xs italic ml-2">(Chart.js 待集成)</span>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <i class="fas fa-clock text-green-600"></i> 全球商机时钟
                    </h3>
                    <div id="world-clock-container" class="space-y-3 min-h-[200px]">
                        <div class="text-center py-10 text-slate-300">Loading Clocks...</div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-file-invoice text-blue-600"></i> 最近订单记录
                    </h3>
                    <a href="javascript:void(0)" onclick="document.querySelector('a[href=\\'#orders\\']')?.click()" class="text-sm text-blue-600 hover:underline">查看全部 →</a>
                </div>
                <div id="recent-orders-list">
                    ${this.renderRecentOrders()}
                </div>
            </div>
        `;

        // 延迟一小会儿执行，确保 DOM 完全就绪
        setTimeout(() => {
            this.initWorldClock();
            this.initChart();
        }, 50);
    }

    /**
     * 渲染 KPI 卡片
     */
    renderKPICard(icon, title, value, color, progress = null, subtitle = null) {
        const colors = {
            primary: { bg: 'blue-100', text: 'blue-600', border: 'blue-500' },
            green: { bg: 'green-100', text: 'green-600', border: 'green-500' },
            red: { bg: 'red-100', text: 'red-600', border: 'red-500' },
            yellow: { bg: 'yellow-100', text: 'yellow-600', border: 'yellow-500' }
        };
        const c = colors[color] || colors.primary;

        return `
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 border-l-4 border-l-${c.border} relative overflow-hidden hover:shadow-md transition">
                <i class="fas fa-${icon} absolute right-4 top-4 text-4xl text-${c.bg} opacity-50"></i>
                <div class="relative z-10">
                    <div class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">${title}</div>
                    <div class="text-3xl font-black text-slate-800 mb-1">${value}</div>
                    ${subtitle ? `<div class="text-xs text-slate-400">${subtitle}</div>` : ''}
                    ${progress !== null ? `
                        <div class="mt-3 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div class="bg-${c.text} h-full rounded-full transition-all duration-500" style="width: ${Math.min(progress, 100)}%"></div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * 渲染最近订单
     */
    renderRecentOrders() {
        if (!this.data.orders || this.data.orders.length === 0) {
            return '<div class="text-center py-8 text-slate-400">暂无订单记录</div>';
        }

        const recent = this.data.orders.slice(0, 5);
        return `
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="bg-slate-50 text-xs text-slate-500 uppercase">
                        <tr>
                            <th class="px-4 py-3 text-left">PI No.</th>
                            <th class="px-4 py-3 text-left">客户</th>
                            <th class="px-4 py-3 text-right">金额</th>
                            <th class="px-4 py-3 text-center">状态</th>
                            <th class="px-4 py-3 text-center">日期</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${recent.map(o => `
                            <tr class="hover:bg-slate-50 transition">
                                <td class="px-4 py-3 font-mono font-bold text-slate-800">${o.id}</td>
                                <td class="px-4 py-3 text-slate-600">${o.customer}</td>
                                <td class="px-4 py-3 text-right font-bold text-blue-600">$${o.total.toFixed(2)}</td>
                                <td class="px-4 py-3 text-center">
                                    <span class="px-2 py-1 rounded-full text-xs font-bold ${o.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">
                                        ${o.status}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-center text-xs text-slate-400">
                                    ${new Date(o.date).toLocaleDateString('zh-CN')}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    /**
     * 初始化图表
     */
    initChart() {
        console.log('[Dashboard] Chart initialized (placeholder)');
    }

    /**
     * 初始化全球时钟 (修复版)
     */
    initWorldClock() {
        // 安全检查：防止 Config 未加载导致崩溃
        if (!this.config || !this.config.WORKBENCH || !this.config.WORKBENCH.WORLD_CITIES) {
            console.error('[Dashboard] Config or World Cities missing!');
            const container = document.getElementById('world-clock-container');
            if(container) container.innerHTML = '<div class="text-center text-red-400 text-xs py-4">配置加载失败</div>';
            return;
        }

        const cities = this.config.WORKBENCH.WORLD_CITIES;
        const container = document.getElementById('world-clock-container');
        if (!container) return;

        const updateClock = () => {
            try {
                container.innerHTML = cities.map(city => {
                    try {
                        const now = new Date();
                        let timeString = '00:00';
                        
                        // 尝试使用 Intl 格式化，如果不被支持则回退
                        try {
                            timeString = new Intl.DateTimeFormat('en-US', {
                                timeZone: city.tz,
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: false
                            }).format(now);
                        } catch (tzError) {
                            console.warn(`[Dashboard] Timezone error for ${city.name}: ${city.tz}`);
                            return ''; // 如果时区不支持，跳过该城市
                        }

                        // 处理可能出现的异常格式
                        if (!timeString) return '';
                        
                        const hour = parseInt(timeString.split(':')[0]);
                        const isWorking = hour >= city.workHours[0] && hour < city.workHours[1];

                        return `
                            <div class="flex items-center justify-between p-3 rounded-lg border transition-colors duration-500 ${isWorking ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}">
                                <div class="flex items-center gap-2">
                                    <span class="text-lg">${city.icon}</span>
                                    <div>
                                        <div class="text-xs font-bold text-slate-700">${city.name}</div>
                                        <div class="text-lg font-mono font-black text-slate-800 tracking-tight">${timeString}</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-1">
                                    <span class="w-2 h-2 rounded-full ${isWorking ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}"></span>
                                    <span class="text-[10px] font-bold ${isWorking ? 'text-green-600' : 'text-slate-400'}">${isWorking ? 'OPEN' : 'CLOSED'}</span>
                                </div>
                            </div>
                        `;
                    } catch (itemError) {
                        console.error(`[Dashboard] Error rendering city ${city.name}`, itemError);
                        return '';
                    }
                }).join('');
            } catch (e) {
                console.error('[Dashboard] Clock update loop failed', e);
            }
        };

        // 先清除之前的定时器（防止多次 init 导致重复）
        if (this.clockInterval) clearInterval(this.clockInterval);
        
        // 立即执行一次，然后启动定时器
        updateClock();
        this.clockInterval = setInterval(updateClock, 60000); // 每分钟更新
    }

    /**
     * 编辑年度目标
     */
    async editTarget() {
        const newTarget = prompt('请输入新的年度销售目标 (RMB):', this.data.target);
        if (newTarget && !isNaN(newTarget)) {
            this.data.target = parseInt(newTarget);
            await this.storage.setTarget(this.data.target);
            await this.loadData();
            this.render(); // 重新渲染以更新界面
            if(window.WorkbenchUtils?.toast) {
                window.WorkbenchUtils.toast.success('年度目标已更新！');
            }
        }
    }

    /**
     * 格式化数字
     */
    formatNumber(num, decimals = 0) {
        if (num === undefined || num === null) return '0';
        return Math.floor(num).toLocaleString('zh-CN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    /**
     * 自动刷新
     */
    startAutoRefresh() {
        // 使用一个实例变量来避免重复 Interval
        if(this.refreshInterval) clearInterval(this.refreshInterval);
        this.refreshInterval = setInterval(() => {
            this.loadData().then(() => this.render());
        }, 60000); // 每分钟刷新一次
    }
}

// 确保挂载到 window
window.WorkbenchDashboard = WorkbenchDashboard;
    }
});
