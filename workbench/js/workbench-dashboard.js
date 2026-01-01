/**
 * V5 Medical Workbench - Dashboard Module
 * 业绩仪表盘与数据可视化
 * @version 2.0.1
 * @author V5 Medical Tech
 */
class WorkbenchDashboard {
    constructor() {
        // 配置与存储引用
        this.config = window.WorkbenchConfig || {};
        this.storage = window.V5Workbench?.storage || {};
        
        // 默认汇率（USD to CNY）
        this.currentRate = 7.25;
        
        // 核心数据模型
        this.data = {
            orders: [],
            target: 5000000,       // 年度目标默认值
            totalSales: 0,         // 已回款金额（RMB）
            pipeline: 0,           // 待回款金额（RMB）
            achievement: 0,        // 达成率（%）
            gap: 0,                // 距离目标差额
            pendingCount: 0,       // 待跟进订单数
            dailyNeed: 0           // 每日所需进账
        };
        
        // 图表实例
        this.chart = null;
        
        // 自动刷新定时器
        this.refreshTimer = null;
        this.refreshInterval = 5 * 60 * 1000; // 5分钟自动刷新
    }

    /**
     * 初始化仪表盘
     */
    async init() {
        try {
            await this.loadData();
            this.render();
            this.startAutoRefresh();
            this.bindEditTargetHandler();
            console.log('[Dashboard] Initialized successfully');
        } catch (error) {
            console.error('[Dashboard] Initialization failed:', error);
            this.showErrorState('初始化失败，请刷新页面重试');
        }
    }

    /**
     * 加载数据（从存储/API）
     */
    async loadData() {
        try {
            // 从存储加载核心数据
            this.data.orders = await this.storage.getOrders() || [];
            this.data.target = await this.storage.getTarget() || 5000000;
            
            // 从本地存储获取汇率（支持用户自定义）
            const storedRate = localStorage.getItem('v5_usd_rate');
            this.currentRate = storedRate ? parseFloat(storedRate) : 7.25;
            
            // 计算关键指标
            this.calculateMetrics();
        } catch (error) {
            console.error('[Dashboard] Load data failed:', error);
            throw error;
        }
    }

    /**
     * 计算关键业务指标
     */
    calculateMetrics() {
        if (!Array.isArray(this.data.orders)) {
            this.data.orders = [];
        }

        let totalSalesRMB = 0;
        let pipelineRMB = 0;
        let pendingCount = 0;

        // 遍历订单计算金额
        this.data.orders.forEach(order => {
            if (!order.total || isNaN(order.total)) return;
            
            // 转换为人民币金额
            const amountRMB = order.total * this.currentRate;
            
            // 已回款订单
            if (order.status === 'Paid') {
                totalSalesRMB += amountRMB;
            }
            // 待回款订单
            else if (order.status === 'Pending') {
                pipelineRMB += amountRMB;
                pendingCount++;
            }
        });

        // 更新核心数据
        this.data.totalSales = totalSalesRMB;
        this.data.pipeline = pipelineRMB;
        this.data.pendingCount = pendingCount;
        this.data.achievement = this.data.target > 0 
            ? (totalSalesRMB / this.data.target) * 100 
            : 0;
        this.data.gap = Math.max(0, this.data.target - totalSalesRMB);

        // 计算每日所需进账（到年底）
        const today = new Date();
        const endYear = new Date(today.getFullYear(), 11, 31);
        const daysLeft = Math.ceil((endYear - today) / (1000 * 60 * 60 * 24));
        this.data.dailyNeed = daysLeft > 0 
            ? Math.max(0, this.data.gap / daysLeft) 
            : 0;
    }

    /**
     * 渲染完整仪表盘
     */
    render() {
        const container = document.getElementById('workbench-content');
        if (!container) {
            console.warn('[Dashboard] Container not found');
            return;
        }

        // 渲染主界面
        container.innerHTML = `
            <!-- 顶部目标设置 -->
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h2 class="text-3xl font-bold text-slate-800">2026 战报指挥舱</h2>
                    <p class="text-sm text-slate-500 mt-1">实时业绩监控与目标达成追踪</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <div class="text-xs text-slate-500 uppercase tracking-wider">Annual Target</div>
                        <div class="text-2xl font-bold text-primary cursor-pointer hover:text-blue-700 transition" id="edit-target-btn">
                            ¥${this.formatNumber(this.data.target)}
                            <i class="fas fa-pen text-sm ml-1"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- KPI 卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                ${this.renderKPICard(
                    'trophy', 
                    '年度达成率', 
                    `${this.data.achievement.toFixed(1)}%`, 
                    'primary', 
                    this.data.achievement
                )}
                ${this.renderKPICard(
                    'coins', 
                    '已回款金额', 
                    `¥${this.formatNumber(this.data.totalSales)}`, 
                    'green', 
                    null, 
                    `约 $${this.formatNumber(this.data.totalSales / this.currentRate)}`
                )}
                ${this.renderKPICard(
                    'mountain', 
                    '距离目标还差', 
                    `¥${this.formatNumber(this.data.gap / 10000, 1)}w`, 
                    'red', 
                    null, 
                    `需每日 ¥${this.formatNumber(this.data.dailyNeed)}`
                )}
                ${this.renderKPICard(
                    'hourglass-half', 
                    '待回款 Pipeline', 
                    `¥${this.formatNumber(this.data.pipeline)}`, 
                    'yellow', 
                    null, 
                    `${this.data.pendingCount} 个订单跟进中`
                )}
            </div>

            <!-- 图表区域 -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <i class="fas fa-chart-line text-blue-600"></i> 月度业绩趋势
                    </h3>
                    <div class="h-64 flex items-center justify-center text-slate-400">
                        <canvas id="sales-chart"></canvas>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <i class="fas fa-clock text-green-600"></i> 全球商机时钟
                    </h3>
                    <div id="world-clock-container" class="space-y-3"></div>
                </div>
            </div>

            <!-- 最近订单 -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-file-invoice text-blue-600"></i> 最近订单记录
                    </h3>
                    <a href="#orders" onclick="switchModule('orders')" class="text-sm text-blue-600 hover:underline">查看全部 →</a>
                </div>
                <div id="recent-orders-list">
                    ${this.renderRecentOrders()}
                </div>
            </div>
        `;

        // 初始化子组件
        this.initWorldClock();
        this.initChart();
    }

    /**
     * 渲染KPI卡片
     * @param {string} icon - FontAwesome图标名称
     * @param {string} title - 卡片标题
     * @param {string} value - 主数值
     * @param {string} color - 颜色主题 (primary/green/red/yellow)
     * @param {number} progress - 进度值（百分比）
     * @param {string} subtitle - 副标题/补充信息
     * @returns {string} HTML字符串
     */
    renderKPICard(icon, title, value, color, progress = null, subtitle = null) {
        // 颜色映射配置
        const colors = {
            primary: { bg: 'blue-100', text: 'blue-600', border: 'blue-500' },
            green: { bg: 'green-100', text: 'green-600', border: 'green-500' },
            red: { bg: 'red-100', text: 'red-600', border: 'red-500' },
            yellow: { bg: 'yellow-100', text: 'yellow-600', border: 'yellow-500' }
        };
        const c = colors[color] || colors.primary;

        // 进度条HTML
        const progressHtml = progress !== null ? `
            <div class="mt-3 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div class="bg-${c.text} h-full rounded-full transition-all duration-500" 
                     style="width: ${Math.min(progress, 100)}%"></div>
            </div>
        ` : '';

        // 副标题HTML
        const subtitleHtml = subtitle ? `<div class="text-xs text-slate-400">${subtitle}</div>` : '';

        return `
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 border-l-4 border-l-${c.border} 
                      relative overflow-hidden hover:shadow-md transition">
                <i class="fas fa-${icon} absolute right-4 top-4 text-4xl text-${c.bg} opacity-50"></i>
                <div class="relative z-10">
                    <div class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">${title}</div>
                    <div class="text-3xl font-black text-slate-800 mb-1">${value}</div>
                    ${subtitleHtml}
                    ${progressHtml}
                </div>
            </div>
        `;
    }

    /**
     * 渲染最近订单列表
     * @returns {string} HTML字符串
     */
    renderRecentOrders() {
        const recent = this.data.orders.slice(0, 5);
        
        if (recent.length === 0) {
            return '<div class="text-center py-8 text-slate-400">暂无订单记录</div>';
        }

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
                        ${recent.map(order => `
                            <tr class="hover:bg-slate-50 transition">
                                <td class="px-4 py-3 font-mono font-bold text-slate-800">${order.id || 'N/A'}</td>
                                <td class="px-4 py-3 text-slate-600">${order.customer || '未知客户'}</td>
                                <td class="px-4 py-3 text-right font-bold text-blue-600">
                                    $${order.total ? order.total.toFixed(2) : '0.00'}
                                </td>
                                <td class="px-4 py-3 text-center">
                                    <span class="px-2 py-1 rounded-full text-xs font-bold 
                                             ${order.status === 'Paid' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-amber-100 text-amber-700'}">
                                        ${order.status || 'Unknown'}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-center text-xs text-slate-400">
                                    ${order.date ? new Date(order.date).toLocaleDateString('zh-CN') : '未知日期'}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    /**
     * 初始化全球商机时钟
     */
    initWorldClock() {
        const container = document.getElementById('world-clock-container');
        if (!container) return;

        // 主要时区配置
        const timezones = [
            { name: '中国·上海', timezone: 'Asia/Shanghai', icon: 'cn' },
            { name: '土耳其·伊斯坦布尔', timezone: 'Europe/Istanbul', icon: 'tr' },
            { name: '阿联酋·迪拜', timezone: 'Asia/Dubai', icon: 'ae' },
            { name: '美国·纽约', timezone: 'America/New_York', icon: 'us' },
            { name: '德国·柏林', timezone: 'Europe/Berlin', icon: 'de' }
        ];

        // 渲染时钟
        container.innerHTML = timezones.map(tz => {
            const now = new Date();
            const options = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                timeZone: tz.timezone 
            };
            const timeString = now.toLocaleTimeString('zh-CN', options);

            return `
                <div class="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-globe-${tz.icon} text-blue-600"></i>
                        <span class="font-medium text-slate-700">${tz.name}</span>
                    </div>
                    <span class="font-mono text-slate-800">${timeString}</span>
                </div>
            `;
        }).join('');

        // 每秒更新时钟
        if (this.clockInterval) clearInterval(this.clockInterval);
        this.clockInterval = setInterval(() => this.initWorldClock(), 1000);
    }

    /**
     * 初始化业绩趋势图表
     */
    initChart() {
        const ctx = document.getElementById('sales-chart');
        if (!ctx || typeof Chart === 'undefined') {
            ctx?.parentNode?.innerHTML = '<div class="text-slate-500">图表组件未加载</div>';
            return;
        }

        // 销毁旧图表
        if (this.chart) {
            this.chart.destroy();
        }

        // 准备月度数据
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        const currentMonth = new Date().getMonth();
        
        // 按月份分组订单数据
        const monthlySales = Array(12).fill(0);
        this.data.orders.forEach(order => {
            if (!order.date || order.status !== 'Paid') return;
            const month = new Date(order.date).getMonth();
            monthlySales[month] += order.total * this.currentRate;
        });

        // 创建图表
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: '月度回款 (¥)',
                        data: monthlySales,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: '#3b82f6',
                        pointRadius: 3,
                        pointHoverRadius: 5
                    },
                    {
                        label: '目标线',
                        data: Array(12).fill(this.data.target / 12),
                        borderColor: '#ef4444',
                        borderWidth: 1,
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 6
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.raw;
                                return `${context.dataset.label}: ¥${this.formatNumber(value)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `¥${this.formatNumber(value / 10000)}w`
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    /**
     * 编辑年度目标
     */
    async editTarget() {
        const newTarget = prompt(
            '请输入新的年度目标金额（人民币）',
            this.data.target.toString().replace(/,/g, '')
        );

        if (newTarget === null) return;

        const parsedTarget = parseFloat(newTarget);
        if (isNaN(parsedTarget) || parsedTarget <= 0) {
            alert('请输入有效的正数金额');
            return;
        }

        try {
            // 保存新目标
            await this.storage.setTarget(parsedTarget);
            this.data.target = parsedTarget;
            this.calculateMetrics();
            this.render();
            alert('年度目标已更新！');
        } catch (error) {
            console.error('[Dashboard] Update target failed:', error);
            alert('更新目标失败，请重试');
        }
    }

    /**
     * 格式化数字显示
     * @param {number} num - 要格式化的数字
     * @param {number} decimals - 小数位数
     * @returns {string} 格式化后的字符串
     */
    formatNumber(num, decimals = 0) {
        if (isNaN(num)) return '0';
        
        return num.toLocaleString('zh-CN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    /**
     * 启动自动刷新
     */
    startAutoRefresh() {
        if (this.refreshTimer) clearInterval(this.refreshTimer);
        
        this.refreshTimer = setInterval(async () => {
            try {
                await this.loadData();
                this.render();
            } catch (error) {
                console.error('[Dashboard] Auto-refresh failed:', error);
            }
        }, this.refreshInterval);
    }

    /**
     * 绑定编辑目标事件处理器
     */
    bindEditTargetHandler() {
        const btn = document.getElementById('edit-target-btn');
        if (btn) {
            btn.addEventListener('click', () => this.editTarget());
        }
        
        // 全局暴露方法
        window.V5Workbench = window.V5Workbench || {};
        window.V5Workbench.dashboard = this;
    }

    /**
     * 显示错误状态
     * @param {string} message - 错误信息
     */
    showErrorState(message) {
        const container = document.getElementById('workbench-content');
        if (container) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-96 text-center p-8">
                    <div class="text-6xl text-red-300 mb-4">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2">加载失败</h3>
                    <p class="text-slate-500 mb-6">${message}</p>
                    <button onclick="window.V5Workbench.dashboard.init()" 
                            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        重试加载
                    </button>
                </div>
            `;
        }
    }

    /**
     * 销毁仪表盘（清理资源）
     */
    destroy() {
        // 清除定时器
        if (this.refreshTimer) clearInterval(this.refreshTimer);
        if (this.clockInterval) clearInterval(this.clockInterval);
        
        // 销毁图表
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
        
        console.log('[Dashboard] Destroyed successfully');
    }
}

// 初始化（如果在工作台页面）
document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('workbench-content')) {
        const dashboard = new WorkbenchDashboard();
        await dashboard.init();
        
        // 窗口关闭时清理资源
        window.addEventListener('beforeunload', () => dashboard.destroy());
    }
});
