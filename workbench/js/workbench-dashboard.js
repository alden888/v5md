/**
 * V5 Medical Workbench - Enhanced Dashboard
 * 增强版仪表盘（响应式 + 性能优化）
 * @version 2.2.0 (优化版)
 * @author V5 Medical Team
 * @description 性能优化/错误兜底/兼容性增强/代码解耦
 */
class WorkbenchDashboard {
    // 静态常量（抽离配置，便于维护）
    static DEFAULT_CONFIG = {
        REFRESH_INTERVAL: 60000, // 1分钟自动刷新
        DEFAULT_TARGET: 5000000,
        DEFAULT_USD_RATE: 7.25,
        CHART_COLORS: {
            primary: '#1e40af',
            secondary: '#f59e0b',
            success: '#10b981',
            danger: '#ef4444',
            warning: '#f59e0b'
        },
        // 全球城市配置（标准化）
        WORLD_CITIES: [
            { name: 'Beijing', tz: 'Asia/Shanghai', icon: '🇨🇳', workHours: [9, 18] },
            { name: 'London', tz: 'Europe/London', icon: '🇬🇧', workHours: [9, 18] },
            { name: 'New York', tz: 'America/New_York', icon: '🇺🇸', workHours: [9, 18] },
            { name: 'Dubai', tz: 'Asia/Dubai', icon: '🇦🇪', workHours: [9, 18] },
            { name: 'Istanbul', tz: 'Europe/Istanbul', icon: '🇹🇷', workHours: [9, 18] },
            { name: 'Sao Paulo', tz: 'America/Sao_Paulo', icon: '🇧🇷', workHours: [9, 18] }
        ],
        // 数字格式化配置
        FORMAT_OPTIONS: {
            zhCN: { locale: 'zh-CN', minimumFractionDigits: 0, maximumFractionDigits: 0 },
            usEN: { locale: 'en-US', minimumFractionDigits: 2, maximumFractionDigits: 2 }
        }
    };

    constructor() {
        // 依赖注入（降低耦合）
        this.config = window.WorkbenchConfig || { getRandomQuote: () => '行动是成功的基石！' };
        this.storage = window.V5Workbench?.storage || {
            getOrders: async () => [],
            getTarget: async () => WorkbenchDashboard.DEFAULT_CONFIG.DEFAULT_TARGET,
            setTarget: async () => {}
        };
        
        // 状态管理（初始化默认值）
        this.state = {
            currentRate: WorkbenchDashboard.DEFAULT_CONFIG.DEFAULT_USD_RATE,
            orders: [],
            target: WorkbenchDashboard.DEFAULT_CONFIG.DEFAULT_TARGET,
            totalSales: 0,
            pipeline: 0,
            achievement: 0,
            gap: 0,
            pendingCount: 0,
            dailyNeed: 0
        };

        // 资源引用（便于销毁）
        this.chart = null;
        this.refreshInterval = null;
        this.clockInterval = null; // 独立时钟定时器
    }

    /**
     * 初始化仪表盘（入口方法）
     */
    async init() {
        try {
            // 性能监控：记录初始化开始时间
            const initStart = performance.now();
            
            // 1. 加载并计算数据
            await this.loadAndCalculateData();
            
            // 2. 渲染UI
            this.render();
            
            // 3. 启动自动刷新
            this.startAutoRefresh();
            
            // 性能监控：输出初始化耗时
            console.log(`[Dashboard] 初始化完成，耗时: ${(performance.now() - initStart).toFixed(2)}ms`);
        } catch (error) {
            console.error('[Dashboard] 初始化失败:', error);
            this.renderError(error);
        }
    }

    /**
     * 加载数据 + 计算指标（解耦核心逻辑）
     */
    async loadAndCalculateData() {
        try {
            // 1. 加载基础数据（带超时兜底）
            const [orders, target] = await Promise.all([
                this.safeLoadData(() => this.storage.getOrders(), []),
                this.safeLoadData(() => this.storage.getTarget(), WorkbenchDashboard.DEFAULT_CONFIG.DEFAULT_TARGET)
            ]);
            
            // 2. 加载汇率（本地存储兜底）
            this.state.currentRate = parseFloat(localStorage.getItem('v5_usd_rate')) || WorkbenchDashboard.DEFAULT_CONFIG.DEFAULT_USD_RATE;
            
            // 3. 更新状态
            this.state.orders = orders;
            this.state.target = parseInt(target) || WorkbenchDashboard.DEFAULT_CONFIG.DEFAULT_TARGET;
            
            // 4. 计算核心指标
            this.calculateMetrics();
        } catch (error) {
            console.error('[Dashboard] 数据加载/计算失败:', error);
            throw new Error(`数据处理异常: ${error.message || '未知错误'}`);
        }
    }

    /**
     * 安全加载数据（带超时和兜底）
     * @param {Function} fn - 异步加载函数
     * @param {any} fallback - 兜底值
     * @param {number} timeout - 超时时间(ms)
     */
    async safeLoadData(fn, fallback = [], timeout = 5000) {
        try {
            return await Promise.race([
                fn(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('加载超时')), timeout))
            ]);
        } catch (error) {
            console.warn('[Dashboard] 数据加载失败，使用兜底值:', error.message);
            return fallback;
        }
    }

    /**
     * 计算关键业务指标（纯函数化）
     */
    calculateMetrics() {
        const { orders, target, currentRate } = this.state;
        let totalSalesRMB = 0;
        let pipelineRMB = 0;
        let pendingCount = 0;

        // 订单数据计算（防御性编程）
        if (Array.isArray(orders) && orders.length > 0) {
            orders.forEach(order => {
                if (!order || !order.total || !order.status) return;
                
                const amountRMB = Number(order.total) * currentRate;
                if (isNaN(amountRMB)) return;

                if (order.status === 'Paid') {
                    totalSalesRMB += amountRMB;
                } else if (order.status === 'Pending') {
                    pipelineRMB += amountRMB;
                    pendingCount++;
                }
            });
        }

        // 计算达成率（避免除以0）
        const achievement = target > 0 ? (totalSalesRMB / target) * 100 : 0;
        
        // 计算剩余天数和每日所需
        const [daysLeft, dailyNeed] = this.calculateDailyNeed(target, totalSalesRMB);

        // 更新状态（不可变更新）
        this.state = {
            ...this.state,
            totalSales: totalSalesRMB,
            pipeline: pipelineRMB,
            achievement: achievement,
            gap: target - totalSalesRMB,
            pendingCount: pendingCount,
            dailyNeed: dailyNeed
        };
    }

    /**
     * 计算每日所需进账（独立函数，便于测试）
     */
    calculateDailyNeed(target, totalSales) {
        const today = new Date();
        const endYear = new Date(today.getFullYear(), 11, 31);
        const daysLeft = Math.max(1, Math.ceil((endYear - today) / (1000 * 60 * 60 * 24))); // 至少1天
        const gap = target - totalSales;
        const dailyNeed = gap > 0 ? gap / daysLeft : 0;
        
        return [daysLeft, dailyNeed];
    }

    /**
     * 渲染主界面（响应式优化）
     */
    render() {
        const container = document.getElementById('workbench-content');
        if (!container) {
            console.warn('[Dashboard] 容器元素不存在');
            return;
        }

        // 渲染主模板（模板字符串优化）
        container.innerHTML = this.getMainTemplate();
        
        // 初始化子组件
        this.initWorldClock();
        this.initChart();
    }

    /**
     * 获取主模板（解耦模板逻辑）
     */
    getMainTemplate() {
        const { target, achievement, totalSales, gap, pipeline, dailyNeed, pendingCount, currentRate } = this.state;
        const 励志语录 = this.config.getRandomQuote?.() || '500万不是梦，是必须拿下的山头！';

        return `
            <!-- 顶部区域（移动端优先） -->
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h2 class="text-2xl md:text-3xl font-bold text-slate-800">2026 战报指挥舱</h2>
                    <p class="text-xs md:text-sm text-slate-500 mt-1">实时业绩监控与目标达成追踪</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <div class="text-xs text-slate-500 uppercase tracking-wider">Annual Target</div>
                        <div class="text-xl md:text-2xl font-bold text-primary cursor-pointer hover:text-blue-700 transition" onclick="window.V5Workbench.dashboard.editTarget()">
                            ¥${this.formatNumber(target)}
                            <i class="fas fa-pen text-xs ml-1"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 励志语录 -->
            <div class="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                <div class="flex items-center gap-3">
                    <div class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm md:text-base text-slate-700 font-medium italic">
                            "${励志语录}"
                        </p>
                    </div>
                </div>
            </div>

            <!-- KPI卡片（响应式栅格） -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                ${this.renderKPICard('trophy', '年度达成率', `${achievement.toFixed(1)}%`, 'primary', achievement)}
                ${this.renderKPICard('coins', '已回款金额', `¥${this.formatNumber(totalSales)}`, 'green', null, `约 $${this.formatNumber(totalSales / currentRate, 2)}`)}
                ${this.renderKPICard('mountain', '距离目标还差', `¥${this.formatNumber(gap / 10000, 1)}w`, 'red', null, `需每日 ¥${this.formatNumber(dailyNeed)}`)}
                ${this.renderKPICard('hourglass-half', '待回款 Pipeline', `¥${this.formatNumber(pipeline)}`, 'yellow', null, `${pendingCount} 个订单跟进中`)}
            </div>

            <!-- 图表与时钟区域 -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <!-- 月度趋势图 -->
                <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6">
                    <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                        <i class="fas fa-chart-line text-blue-600"></i> 月度业绩趋势
                    </h3>
                    <div class="h-48 md:h-64">
                        <canvas id="sales-chart"></canvas>
                    </div>
                </div>

                <!-- 全球商机时钟 -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6">
                    <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                        <i class="fas fa-clock text-green-600"></i> 全球商机时钟
                    </h3>
                    <div id="world-clock-container" class="space-y-3"></div>
                </div>
            </div>

            <!-- 最近订单 -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="font-bold text-slate-800 flex items-center gap-2 text-sm md:text-base">
                        <i class="fas fa-file-invoice text-blue-600"></i> 最近订单记录
                    </h3>
                    <a href="#orders" onclick="switchModule?.('orders')" class="text-xs md:text-sm text-blue-600 hover:underline">查看全部 →</a>
                </div>
                <div id="recent-orders-list" class="overflow-x-auto">
                    ${this.renderRecentOrders()}
                </div>
            </div>
        `;
    }

    /**
     * 渲染KPI卡片（样式标准化）
     */
    renderKPICard(icon, title, value, color, progress = null, subtitle = null) {
        const colorMap = {
            primary: { bg: 'blue-100', text: 'blue-600', border: 'blue-500' },
            green: { bg: 'green-100', text: 'green-600', border: 'green-500' },
            red: { bg: 'red-100', text: 'red-600', border: 'red-500' },
            yellow: { bg: 'yellow-100', text: 'yellow-600', border: 'yellow-500' }
        };
        const c = colorMap[color] || colorMap.primary;
        const safeProgress = Math.min(Math.max(progress || 0, 0), 100); // 限制0-100

        return `
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 border-l-4 border-l-${c.border} relative overflow-hidden hover:shadow-md transition-all duration-300">
                <i class="fas fa-${icon} absolute right-3 top-3 md:right-4 md:top-4 text-3xl md:text-4xl text-${c.bg} opacity-50"></i>
                <div class="relative z-10">
                    <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">${title}</div>
                    <div class="text-2xl md:text-3xl font-black text-slate-800 mb-1">${value}</div>
                    ${subtitle ? `<div class="text-xs text-slate-400">${subtitle}</div>` : ''}
                    ${progress !== null ? `
                        <div class="mt-3 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div class="bg-${c.text} h-full rounded-full transition-all duration-1000 ease-out" style="width: ${safeProgress}%"></div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * 渲染最近订单（防御性渲染）
     */
    renderRecentOrders() {
        const { orders } = this.state;
        const recent = Array.isArray(orders) ? orders.slice(0, 5) : [];
        
        if (recent.length === 0) {
            return '<div class="text-center py-8 text-slate-400">暂无订单记录</div>';
        }

        return `
            <table class="w-full text-xs md:text-sm min-w-[600px]">
                <thead class="bg-slate-50 text-xs text-slate-500 uppercase">
                    <tr>
                        <th class="px-3 md:px-4 py-3 text-left">PI No.</th>
                        <th class="px-3 md:px-4 py-3 text-left">客户</th>
                        <th class="px-3 md:px-4 py-3 text-right">金额</th>
                        <th class="px-3 md:px-4 py-3 text-center">状态</th>
                        <th class="px-3 md:px-4 py-3 text-center hidden sm:table-cell">日期</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    ${recent.map(o => this.renderOrderRow(o)).join('')}
                </tbody>
            </table>
        `;
    }

    /**
     * 渲染单个订单行（解耦+防御性编程）
     */
    renderOrderRow(order) {
        if (!order || !order.id) return '';
        
        const statusClass = order.status === 'Paid' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-amber-100 text-amber-700';
        const dateStr = order.date 
            ? new Date(order.date).toLocaleDateString('zh-CN') 
            : '未知日期';
        const amount = Number(order.total) || 0;

        return `
            <tr class="hover:bg-slate-50 transition-colors duration-200">
                <td class="px-3 md:px-4 py-3 font-mono font-bold text-slate-800">${order.id}</td>
                <td class="px-3 md:px-4 py-3 text-slate-600">${order.customer || '未知客户'}</td>
                <td class="px-3 md:px-4 py-3 text-right font-bold text-blue-600">$${amount.toFixed(2)}</td>
                <td class="px-3 md:px-4 py-3 text-center">
                    <span class="px-2 py-1 rounded-full text-xs font-bold ${statusClass}">
                        ${order.status || '未知'}
                    </span>
                </td>
                <td class="px-3 md:px-4 py-3 text-center text-xs text-slate-400 hidden sm:table-cell">
                    ${dateStr}
                </td>
            </tr>
        `;
    }

    /**
     * 初始化图表（性能优化+兼容性）
     */
    initChart() {
        const ctx = document.getElementById('sales-chart');
        if (!ctx || typeof Chart === 'undefined') {
            console.warn('[Dashboard] Chart.js 未加载或画布不存在');
            return;
        }
        
        // 销毁旧图表（避免内存泄漏）
        if (this.chart) {
            this.chart.destroy();
        }
        
        // 构建图表数据
        const { monthlyData, monthlyTarget } = this.buildChartData();
        
        // 创建新图表
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [
                    {
                        label: '实际业绩 (RMB)',
                        data: monthlyData,
                        borderColor: WorkbenchDashboard.DEFAULT_CONFIG.CHART_COLORS.primary,
                        backgroundColor: 'rgba(30, 64, 175, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 2,
                        pointHoverRadius: 4
                    },
                    {
                        label: '月度目标 (RMB)',
                        data: monthlyTarget,
                        borderColor: WorkbenchDashboard.DEFAULT_CONFIG.CHART_COLORS.secondary,
                        borderWidth: 2,
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
                    legend: { position: 'top', labels: { boxWidth: 12, usePointStyle: true } },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: (context) => {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y || 0;
                                return `${label}: ¥${this.formatNumber(value)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => value >= 10000 ? `${(value / 10000).toFixed(0)}w` : value
                        },
                        grid: { drawBorder: false }
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                animation: { duration: 500 } // 优化动画性能
            }
        });
    }

    /**
     * 构建图表数据（解耦）
     */
    buildChartData() {
        const { orders, target, currentRate } = this.state;
        const monthlyData = Array(12).fill(0);
        const monthlyTarget = Array(12).fill(target / 12);

        if (Array.isArray(orders)) {
            orders.forEach(order => {
                if (order.status !== 'Paid' || !order.date || !order.total) return;
                
                const month = new Date(order.date).getMonth();
                if (month < 0 || month > 11) return;
                
                monthlyData[month] += Number(order.total) * currentRate;
            });
        }

        return { monthlyData, monthlyTarget };
    }

    /**
     * 初始化全球时钟（独立定时器+性能优化）
     */
    initWorldClock() {
        const container = document.getElementById('world-clock-container');
        if (!container) return;

        // 清理旧定时器
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
        }

        // 立即更新一次
        this.updateWorldClock();
        
        // 启动独立定时器（避免和数据刷新冲突）
        this.clockInterval = setInterval(() => {
            this.updateWorldClock();
        }, 60000);
    }

    /**
     * 更新全球时钟（纯渲染函数）
     */
    updateWorldClock() {
        const container = document.getElementById('world-clock-container');
        if (!container) return;

        const cities = this.config.WORKBENCH?.WORLD_CITIES || WorkbenchDashboard.DEFAULT_CONFIG.WORLD_CITIES;
        
        container.innerHTML = cities.map(city => {
            try {
                const now = new Date();
                const timeString = new Intl.DateTimeFormat('en-US', {
                    timeZone: city.tz,
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                }).format(now);
                
                const hour = parseInt(timeString.split(':')[0]) || 0;
                const workHours = city.workHours || [9, 18];
                const isWorking = hour >= workHours[0] && hour < workHours[1];

                return `
                    <div class="flex items-center justify-between p-3 rounded-lg border ${isWorking ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'} transition-all duration-200">
                        <div class="flex items-center gap-2">
                            <span class="text-lg">${city.icon || '🌍'}</span>
                            <div>
                                <div class="text-xs font-bold text-slate-700">${city.name || 'Unknown'}</div>
                                <div class="text-base md:text-lg font-mono font-black text-slate-800">${timeString}</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="w-2 h-2 rounded-full ${isWorking ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}"></span>
                            <span class="text-xs font-bold ${isWorking ? 'text-green-600' : 'text-slate-400'}">${isWorking ? 'OPEN' : 'OFF'}</span>
                        </div>
                    </div>
                `;
            } catch (error) {
                console.warn(`[Dashboard] 渲染${city.name}时钟失败:`, error);
                return `<div class="p-3 text-xs text-slate-400">${city.name} 时钟加载失败</div>`;
            }
        }).join('');
    }

    /**
     * 编辑年度目标（用户体验优化）
     */
    async editTarget() {
        const { target } = this.state;
        const newTargetStr = prompt('请输入新的年度销售目标 (RMB):', this.formatNumber(target));
        
        if (!newTargetStr) return; // 用户取消
        
        const newTarget = parseInt(newTargetStr.replace(/,/g, '')); // 移除千分位分隔符
        if (isNaN(newTarget) || newTarget <= 0) {
            window.WorkbenchUtils?.toast?.error('请输入有效的正数！');
            return;
        }

        try {
            await this.storage.setTarget(newTarget);
            this.state.target = newTarget;
            await this.loadAndCalculateData();
            this.render();
            window.WorkbenchUtils?.toast?.success('年度目标已更新！');
        } catch (error) {
            console.error('[Dashboard] 更新目标失败:', error);
            window.WorkbenchUtils?.toast?.error('更新失败，请重试！');
        }
    }

    /**
     * 格式化数字（通用方法）
     */
    formatNumber(num, decimals = 0) {
        const numValue = Number(num) || 0;
        return numValue.toLocaleString(
            WorkbenchDashboard.DEFAULT_CONFIG.FORMAT_OPTIONS.zhCN.locale,
            {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }
        );
    }

    /**
     * 启动自动刷新（防抖+容错）
     */
    startAutoRefresh() {
        // 清理旧定时器
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }

        // 启动新定时器
        this.refreshInterval = setInterval(async () => {
            try {
                console.log('[Dashboard] 自动刷新数据...');
                await this.loadAndCalculateData();
                this.initChart(); // 仅更新图表，不重渲染整个页面
            } catch (error) {
                console.error('[Dashboard] 自动刷新失败:', error);
            }
        }, WorkbenchDashboard.DEFAULT_CONFIG.REFRESH_INTERVAL);
    }

    /**
     * 渲染错误状态（用户友好）
     */
    renderError(error) {
        const container = document.getElementById('workbench-content');
        if (!container) return;

        container.innerHTML = `
            <div class="text-center py-16">
                <i class="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
                <h3 class="text-xl font-bold text-slate-800 mb-2">数据加载失败</h3>
                <p class="text-slate-500 mb-6 max-w-md mx-auto">${error.message || '请稍后重试'}</p>
                <button onclick="window.V5Workbench.dashboard.init()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all active:scale-95">
                    <i class="fas fa-redo mr-2"></i> 重试
                </button>
            </div>
        `;
    }

    /**
     * 销毁资源（完整清理）
     */
    destroy() {
        // 清理定时器
        if (this.refreshInterval) clearInterval(this.refreshInterval);
        if (this.clockInterval) clearInterval(this.clockInterval);
        
        // 销毁图表
        if (this.chart) this.chart.destroy();
        
        // 重置状态
        this.chart = null;
        this.refreshInterval = null;
        this.clockInterval = null;
        
        console.log('[Dashboard] 资源已销毁');
    }
}

// 全局暴露（兼容旧代码）
window.WorkbenchDashboard = WorkbenchDashboard;

// 自动初始化（可选，根据项目需求）
document.addEventListener('DOMContentLoaded', () => {
    if (window.V5Workbench && !window.V5Workbench.dashboard) {
        window.V5Workbench.dashboard = new WorkbenchDashboard();
    }
});
