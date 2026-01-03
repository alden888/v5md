/**
 * V14.2 ERP - Dashboard & Survival Mode (Enhanced)
 * 仪表盘模块：数据可视化 + 财务监控 + 生存模式
 * @namespace WorkbenchDashboard
 */
const WorkbenchDashboard = (() => {
    'use strict';

    // 配置常量
    const CONFIG = {
        STORAGE_KEYS: {
            ORDERS: 'v14_orders',
            CUSTOMERS: 'v14_customers',
            SUPPLIERS: 'v14_suppliers',
            EXPENSES: 'v14_expenses',
            DASHBOARD: 'v14_dashboard',
            TODAY_ACTIONS: 'v14_today_actions'
        },
        DEFAULT_TARGET: 5000000, // 默认年度目标
        DEFAULT_RATE: 6.98, // 默认汇率
        CHECK_INTERVAL: 5 * 60 * 1000, // 5分钟检查一次
        RED_LINE_THRESHOLD: 0.3, // 红线阈值（30%）
        EMERGENCY_THRESHOLD: 0.1, // 紧急阈值（10%）
        CURRENCY: 'CNY'
    };

    // 模块状态
    const state = {
        data: {
            orders: [],
            customers: [],
            suppliers: [],
            expenses: [],
            target: CONFIG.DEFAULT_TARGET,
            rate: CONFIG.DEFAULT_RATE,
            feishuWebhook: '',
            todayActions: ['', '', ''],
            isCritical: false,
            emergencyMode: false,
            lastUpdated: new Date().toISOString()
        },
        timers: {},
        isInitialized: false,
        isProcessing: false
    };

    /**
     * 初始化仪表盘
     * @returns {Promise<boolean>} 是否初始化成功
     */
    async function init() {
        if (state.isInitialized) return true;

        try {
            console.log('[Dashboard] 🚀 初始化仪表盘模块 (V14.2 Enhanced)...');
            
            // 加载配置
            await loadDashboardConfig();
            
            // 加载业务数据
            await loadBusinessData();
            
            // 检查红线状态
            checkCashRedLine();
            
            // 更新界面
            updateDashboard();
            
            // 渲染今日三件事
            renderTodayActions();
            
            // 启动时钟
            startClock();
            
            // 启动定时器
            startTimers();
            
            state.isInitialized = true;
            console.log('[Dashboard] ✅ 仪表盘初始化完成');
            
            return true;
        } catch (error) {
            console.error('[Dashboard] ❌ 初始化失败:', error);
            showError('仪表盘初始化失败，请刷新页面重试');
            return false;
        }
    }

    /**
     * 加载仪表盘配置
     * @returns {Promise<void>}
     */
    async function loadDashboardConfig() {
        try {
            let configData = null;
            
            // 使用存储模块加载配置
            if (window.WorkbenchStorage) {
                configData = await window.WorkbenchStorage.load(CONFIG.STORAGE_KEYS.DASHBOARD);
            } else {
                // 降级到localStorage
                configData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.DASHBOARD) || 'null');
            }
            
            if (configData) {
                state.data.target = configData.target || CONFIG.DEFAULT_TARGET;
                state.data.rate = configData.rate || CONFIG.DEFAULT_RATE;
                state.data.feishuWebhook = configData.feishuWebhook || '';
            }
            
            // 加载今日三件事
            let actionsData = null;
            if (window.WorkbenchStorage) {
                actionsData = await window.WorkbenchStorage.load(CONFIG.STORAGE_KEYS.TODAY_ACTIONS);
            } else {
                actionsData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TODAY_ACTIONS) || 'null');
            }
            
            if (actionsData && Array.isArray(actionsData) && actionsData.length === 3) {
                state.data.todayActions = actionsData;
            }
            
        } catch (error) {
            console.error('[Dashboard] ❌ 加载配置失败:', error);
            // 使用默认值
        }
    }

    /**
     * 保存仪表盘配置
     * @returns {Promise<boolean>} 是否成功
     */
    async function saveDashboardConfig() {
        try {
            const configData = {
                target: state.data.target,
                rate: state.data.rate,
                feishuWebhook: state.data.feishuWebhook
            };
            
            if (window.WorkbenchStorage) {
                await window.WorkbenchStorage.save(CONFIG.STORAGE_KEYS.DASHBOARD, configData);
            } else {
                localStorage.setItem(CONFIG.STORAGE_KEYS.DASHBOARD, JSON.stringify(configData));
            }
            
            return true;
        } catch (error) {
            console.error('[Dashboard] ❌ 保存配置失败:', error);
            return false;
        }
    }

    /**
     * 加载业务数据
     * @returns {Promise<void>}
     */
    async function loadBusinessData() {
        try {
            // 从其他模块获取数据
            if (window.WorkbenchOrders) {
                state.data.orders = window.WorkbenchOrders.getOrders() || [];
            }
            
            if (window.WorkbenchFinance) {
                state.data.expenses = window.WorkbenchFinance.getExpenses() || [];
            }
            
            // 兼容旧版数据加载
            if (state.data.orders.length === 0) {
                await loadLegacyData();
            }
            
            state.data.lastUpdated = new Date().toISOString();
        } catch (error) {
            console.error('[Dashboard] ❌ 加载业务数据失败:', error);
            // 使用空数据
            state.data.orders = [];
            state.data.expenses = [];
        }
    }

    /**
     * 加载旧版数据（兼容）
     * @returns {Promise<void>}
     */
    async function loadLegacyData() {
        try {
            // 尝试从存储加载旧版数据
            if (window.WorkbenchStorage) {
                state.data.orders = await window.WorkbenchStorage.loadArray(CONFIG.STORAGE_KEYS.ORDERS, []);
                state.data.expenses = await window.WorkbenchStorage.loadArray(CONFIG.STORAGE_KEYS.EXPENSES, []);
            } else {
                state.data.orders = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.ORDERS) || '[]');
                state.data.expenses = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.EXPENSES) || '[]');
            }
        } catch (error) {
            console.error('[Dashboard] ❌ 加载旧版数据失败:', error);
        }
    }

    /**
     * 检查现金红线状态
     */
    function checkCashRedLine() {
        try {
            const financialStats = calculateFinancialStats();
            const achievementRate = financialStats.achievement / 100;
            
            // 更新状态
            state.data.isCritical = achievementRate < CONFIG.RED_LINE_THRESHOLD;
            state.data.emergencyMode = achievementRate < CONFIG.EMERGENCY_THRESHOLD;
            
            // 更新UI状态
            updateRedLineIndicator();
            
            // 发送警报（如果需要）
            if (state.data.emergencyMode) {
                sendEmergencyAlert(financialStats);
            } else if (state.data.isCritical) {
                sendCriticalAlert(financialStats);
            }
            
            console.log('[Dashboard] 🚨 现金红线检查完成', {
                achievement: financialStats.achievement,
                isCritical: state.data.isCritical,
                emergencyMode: state.data.emergencyMode
            });
            
        } catch (error) {
            console.error('[Dashboard] ❌ 现金红线检查失败:', error);
        }
    }

    /**
     * 计算财务统计数据
     * @returns {Object} 统计数据
     */
    function calculateFinancialStats() {
        let totalRevenue = 0;
        let totalCost = 0;
        let totalGrossProfit = 0;

        // 计算已付款订单
        state.data.orders.filter(order => 
            order.status === 'Paid' || order.kanbanStatus === 'Paid'
        ).forEach(order => {
            const rate = order.currency === CONFIG.CURRENCY ? 1 : (order.exchangeRate || state.data.rate);
            const revenue = (order.totalAmount || order.total || 0) * rate;
            const cost = (order.cost || 0) * rate;

            totalRevenue += revenue;
            totalCost += cost;
            totalGrossProfit += (revenue - cost);
        });

        // 计算支出
        const totalExpenses = state.data.expenses.reduce(
            (sum, exp) => sum + parseFloat(exp.amount || 0), 0
        );

        // 净利润
        const netProfit = totalGrossProfit - totalExpenses;

        // 毛利率
        const grossMargin = totalRevenue > 0 ? ((totalGrossProfit / totalRevenue) * 100) : 0;

        // 达成率
        const achievement = ((totalRevenue / state.data.target) * 100);

        return {
            totalRevenue: parseFloat(totalRevenue.toFixed(2)),
            totalCost: parseFloat(totalCost.toFixed(2)),
            totalGrossProfit: parseFloat(totalGrossProfit.toFixed(2)),
            totalExpenses: parseFloat(totalExpenses.toFixed(2)),
            netProfit: parseFloat(netProfit.toFixed(2)),
            grossMargin: parseFloat(grossMargin.toFixed(1)),
            achievement: parseFloat(achievement.toFixed(1))
        };
    }

    /**
     * 更新仪表盘界面
     */
    function updateDashboard() {
        try {
            const stats = calculateFinancialStats();
            
            // 更新主要指标
            updateMetric('dashboard-revenue', stats.totalRevenue, '¥');
            updateMetric('dashboard-cost', stats.totalCost, '¥');
            updateMetric('dashboard-gross', stats.totalGrossProfit, '¥');
            updateMetric('dashboard-net', stats.netProfit, '¥');
            updateMetric('dashboard-progress', stats.achievement, '%');
            updateMetric('dashboard-margin', stats.grossMargin, '%');
            
            // 更新进度条
            updateProgressBar(stats.achievement);
            
            // 更新图表
            updateCharts(stats);
            
            console.log('[Dashboard] 📊 仪表盘数据已更新', stats);
            
        } catch (error) {
            console.error('[Dashboard] ❌ 更新仪表盘失败:', error);
            showError('更新仪表盘数据失败');
        }
    }

    /**
     * 更新指标显示
     * @param {string} elementId - 元素ID
     * @param {number} value - 数值
     * @param {string} unit - 单位
     */
    function updateMetric(elementId, value, unit = '') {
        const element = document.getElementById(elementId);
        if (element) {
            const formattedValue = window.WorkbenchUtils?.formatNumber(value) || formatNumber(value);
            element.textContent = `${unit}${formattedValue}`;
        }
    }

    /**
     * 更新进度条
     * @param {number} percentage - 百分比
     */
    function updateProgressBar(percentage) {
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        
        if (progressBar) {
            progressBar.style.width = `${Math.min(percentage, 100)}%`;
            
            // 根据进度设置颜色
            if (percentage < 30) {
                progressBar.className = 'h-2 bg-red-600 transition-all duration-1000';
            } else if (percentage < 70) {
                progressBar.className = 'h-2 bg-yellow-600 transition-all duration-1000';
            } else {
                progressBar.className = 'h-2 bg-green-600 transition-all duration-1000';
            }
        }
        
        if (progressText) {
            progressText.textContent = `${percentage.toFixed(1)}%`;
        }
    }

    /**
     * 更新红线指示器
     */
    function updateRedLineIndicator() {
        const indicator = document.getElementById('red-line-indicator');
        const statusText = document.getElementById('status-text');
        
        if (indicator) {
            if (state.data.emergencyMode) {
                indicator.className = 'inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse';
                statusText.textContent = '紧急状态';
                statusText.className = 'text-red-500 font-bold';
            } else if (state.data.isCritical) {
                indicator.className = 'inline-block w-3 h-3 bg-yellow-500 rounded-full';
                statusText.textContent = '警戒状态';
                statusText.className = 'text-yellow-500 font-bold';
            } else {
                indicator.className = 'inline-block w-3 h-3 bg-green-500 rounded-full';
                statusText.textContent = '正常状态';
                statusText.className = 'text-green-500 font-bold';
            }
        }
    }

    /**
     * 更新图表
     * @param {Object} stats - 统计数据
     */
    function updateCharts(stats) {
        // 简单的图表实现，实际项目中可以使用Chart.js等库
        updateRevenueChart(stats);
        updateProfitChart(stats);
    }

    /**
     * 更新收入图表
     * @param {Object} stats - 统计数据
     */
    function updateRevenueChart(stats) {
        const chartElement = document.getElementById('revenue-chart');
        if (!chartElement) return;
        
        // 模拟图表数据
        const target = state.data.target;
        const revenue = stats.totalRevenue;
        const remaining = target - revenue;
        
        chartElement.innerHTML = `
            <div class="grid grid-cols-2 gap-4 text-center">
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div class="text-sm text-gray-400 mb-1">已完成</div>
                    <div class="text-xl font-bold text-green-400">¥${formatNumber(revenue)}</div>
                    <div class="text-xs text-gray-500">${(revenue/target*100).toFixed(1)}%</div>
                </div>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div class="text-sm text-gray-400 mb-1">剩余目标</div>
                    <div class="text-xl font-bold text-blue-400">¥${formatNumber(remaining)}</div>
                    <div class="text-xs text-gray-500">${(remaining/target*100).toFixed(1)}%</div>
                </div>
            </div>
        `;
    }

    /**
     * 更新利润图表
     * @param {Object} stats - 统计数据
     */
    function updateProfitChart(stats) {
        const chartElement = document.getElementById('profit-chart');
        if (!chartElement) return;
        
        chartElement.innerHTML = `
            <div class="grid grid-cols-3 gap-4 text-center">
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div class="text-sm text-gray-400 mb-1">总收入</div>
                    <div class="text-lg font-bold text-white">¥${formatNumber(stats.totalRevenue)}</div>
                </div>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div class="text-sm text-gray-400 mb-1">总支出</div>
                    <div class="text-lg font-bold text-red-400">¥${formatNumber(stats.totalExpenses)}</div>
                </div>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div class="text-sm text-gray-400 mb-1">净利润</div>
                    <div class="text-lg font-bold ${stats.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}">
                        ¥${formatNumber(Math.abs(stats.netProfit))}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染今日三件事
     */
    function renderTodayActions() {
        const container = document.getElementById('today-actions');
        if (!container) return;
        
        container.innerHTML = '';
        
        state.data.todayActions.forEach((action, index) => {
            const actionElement = document.createElement('div');
            actionElement.className = 'flex items-center mb-3';
            
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'flex-1 bg-gray-700 border border-gray-600 rounded-l-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500';
            input.value = action;
            input.placeholder = `今日要事 ${index + 1}`;
            
            input.addEventListener('change', (e) => {
                state.data.todayActions[index] = e.target.value;
                saveTodayActions();
            });
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-r-lg transition-colors';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            
            deleteBtn.addEventListener('click', () => {
                state.data.todayActions[index] = '';
                input.value = '';
                saveTodayActions();
            });
            
            actionElement.appendChild(input);
            actionElement.appendChild(deleteBtn);
            container.appendChild(actionElement);
        });
    }

    /**
     * 保存今日三件事
     * @returns {Promise<boolean>} 是否成功
     */
    async function saveTodayActions() {
        try {
            if (window.WorkbenchStorage) {
                await window.WorkbenchStorage.save(CONFIG.STORAGE_KEYS.TODAY_ACTIONS, state.data.todayActions);
            } else {
                localStorage.setItem(CONFIG.STORAGE_KEYS.TODAY_ACTIONS, JSON.stringify(state.data.todayActions));
            }
            return true;
        } catch (error) {
            console.error('[Dashboard] ❌ 保存今日三件事失败:', error);
            return false;
        }
    }

    /**
     * 启动时钟
     */
    function startClock() {
        updateClock();
    }

    /**
     * 更新时钟显示
     */
    function updateClock() {
        const now = new Date();
        
        // 本地时间
        updateElementText('local-time', now.toLocaleTimeString('zh-CN', { hour12: false }));
        updateElementText('local-date', now.toLocaleDateString('zh-CN'));
        
        // 全球时钟
        try {
            updateElementText('time-beijing', now.toLocaleTimeString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }));
            updateElementText('time-manila', now.toLocaleTimeString('zh-CN', { timeZone: 'Asia/Manila', hour12: false }));
            updateElementText('time-istanbul', now.toLocaleTimeString('zh-CN', { timeZone: 'Europe/Istanbul', hour12: false }));
            updateElementText('time-amsterdam', now.toLocaleTimeString('zh-CN', { timeZone: 'Europe/Amsterdam', hour12: false }));
        } catch (error) {
            console.warn('[Dashboard] ⚠️ 时区更新失败:', error);
        }
    }

    /**
     * 启动定时器
     */
    function startTimers() {
        // 现金红线检查定时器
        state.timers.redLineCheck = setInterval(() => {
            checkCashRedLine();
        }, CONFIG.CHECK_INTERVAL);
        
        // 时钟更新定时器
        state.timers.clockUpdate = setInterval(() => {
            updateClock();
        }, 1000);
        
        console.log('[Dashboard] ⏱️ 定时器已启动');
    }

    /**
     * 停止定时器
     */
    function stopTimers() {
        Object.values(state.timers).forEach(timer => {
            clearInterval(timer);
        });
        state.timers = {};
        console.log('[Dashboard] ⏱️ 定时器已停止');
    }

    /**
     * 发送紧急警报
     * @param {Object} stats - 统计数据
     */
    function sendEmergencyAlert(stats) {
        console.log('[Dashboard] 🚨 发送紧急警报:', stats);
        
        // 显示紧急通知
        showEmergencyNotification();
        
        // 如果配置了飞书Webhook，发送通知
        if (state.data.feishuWebhook) {
            sendFeishuAlert('紧急', stats);
        }
    }

    /**
     * 发送警戒警报
     * @param {Object} stats - 统计数据
     */
    function sendCriticalAlert(stats) {
        console.log('[Dashboard] ⚠️ 发送警戒警报:', stats);
        
        // 显示警戒通知
        showCriticalNotification();
        
        // 如果配置了飞书Webhook，发送通知
        if (state.data.feishuWebhook) {
            sendFeishuAlert('警戒', stats);
        }
    }

    /**
     * 发送飞书警报
     * @param {string} level - 警报级别
     * @param {Object} stats - 统计数据
     */
    async function sendFeishuAlert(level, stats) {
        try {
            const message = {
                msg_type: 'interactive',
                card: {
                    config: {
                        wide_screen_mode: true
                    },
                    header: {
                        title: {
                            tag: 'plain_text',
                            content: `财务${level}警报`
                        },
                        template: level === '紧急' ? 'red' : 'orange'
                    },
                    elements: [
                        {
                            tag: 'div',
                            text: {
                                tag: 'plain_text',
                                content: `达成率仅为 ${stats.achievement}%，已低于${level === '紧急' ? '10%' : '30%'} 红线！`
                            }
                        },
                        {
                            tag: 'div',
                            text: {
                                tag: 'plain_text',
                                content: `当前收入：¥${formatNumber(stats.totalRevenue)}`
                            }
                        },
                        {
                            tag: 'div',
                            text: {
                                tag: 'plain_text',
                                content: `年度目标：¥${formatNumber(state.data.target)}`
                            }
                        },
                        {
                            tag: 'div',
                            text: {
                                tag: 'plain_text',
                                content: `更新时间：${new Date().toLocaleString()}`
                            }
                        }
                    ]
                }
            };
            
            const response = await fetch(state.data.feishuWebhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });
            
            if (response.ok) {
                console.log('[Dashboard] ✅ 飞书警报已发送');
            } else {
                console.error('[Dashboard] ❌ 飞书警报发送失败');
            }
            
        } catch (error) {
            console.error('[Dashboard] ❌ 发送飞书警报失败:', error);
        }
    }

    /**
     * 显示紧急通知
     */
    function showEmergencyNotification() {
        if (window.WorkbenchUtils && typeof window.WorkbenchUtils.toast === 'function') {
            window.WorkbenchUtils.toast(
                '🚨 <b>紧急警报！</b>\n达成率已低于10%，请立即采取行动！', 
                'error', 
                10000
            );
        }
    }

    /**
     * 显示警戒通知
     */
    function showCriticalNotification() {
        if (window.WorkbenchUtils && typeof window.WorkbenchUtils.toast === 'function') {
            window.WorkbenchUtils.toast(
                '⚠️ <b>警戒提醒！</b>\n达成率已低于30%，请注意风险！', 
                'warning', 
                5000
            );
        }
    }

    /**
     * 显示成功消息
     * @param {string} message - 消息内容
     */
    function showSuccess(message) {
        if (window.WorkbenchUtils && typeof window.WorkbenchUtils.toast === 'function') {
            window.WorkbenchUtils.toast(message, 'success');
        } else {
            alert(message);
        }
    }

    /**
     * 显示错误消息
     * @param {string} message - 消息内容
     */
    function showError(message) {
        if (window.WorkbenchUtils && typeof window.WorkbenchUtils.toast === 'function') {
            window.WorkbenchUtils.toast(message, 'error');
        } else {
            alert(`错误: ${message}`);
        }
    }

    /**
     * 更新元素文本
     * @param {string} id - 元素ID
     * @param {string} text - 文本内容
     */
    function updateElementText(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }

    /**
     * 格式化数字
     * @param {number} num - 数字
     * @returns {string} 格式化后的数字
     */
    function formatNumber(num) {
        if (isNaN(num)) return '0';
        return Math.round(num).toLocaleString('zh-CN');
    }

    /**
     * 设置目标金额
     * @param {number} target - 目标金额
     * @returns {Promise<boolean>} 是否成功
     */
    async function setTarget(target) {
        try {
            if (target <= 0) {
                throw new Error('目标金额必须大于0');
            }
            
            state.data.target = target;
            await saveDashboardConfig();
            updateDashboard();
            
            showSuccess(`年度目标已设置为 ¥${formatNumber(target)}`);
            return true;
        } catch (error) {
            console.error('[Dashboard] ❌ 设置目标失败:', error);
            showError(`设置失败: ${error.message}`);
            return false;
        }
    }

    /**
     * 设置汇率
     * @param {number} rate - 汇率
     * @returns {Promise<boolean>} 是否成功
     */
    async function setExchangeRate(rate) {
        try {
            if (rate <= 0) {
                throw new Error('汇率必须大于0');
            }
            
            state.data.rate = rate;
            await saveDashboardConfig();
            updateDashboard();
            
            showSuccess(`汇率已设置为 ${rate}`);
            return true;
        } catch (error) {
            console.error('[Dashboard] ❌ 设置汇率失败:', error);
            showError(`设置失败: ${error.message}`);
            return false;
        }
    }

    /**
     * 设置飞书Webhook
     * @param {string} webhook - Webhook URL
     * @returns {Promise<boolean>} 是否成功
     */
    async function setFeishuWebhook(webhook) {
        try {
            state.data.feishuWebhook = webhook;
            await saveDashboardConfig();
            
            showSuccess('飞书Webhook已设置');
            return true;
        } catch (error) {
            console.error('[Dashboard] ❌ 设置飞书Webhook失败:', error);
            showError(`设置失败: ${error.message}`);
            return false;
        }
    }

    // 公共API
    const api = {
        // 初始化
        init,
        
        // 数据管理
        updateDashboard,
        checkCashRedLine,
        
        // 配置管理
        setTarget,
        setExchangeRate,
        setFeishuWebhook,
        
        // 今日三件事
        saveTodayActions,
        
        // 状态管理
        getStatus: () => ({
            isInitialized: state.isInitialized,
            isCritical: state.data.isCritical,
            emergencyMode: state.data.emergencyMode,
            lastUpdated: state.data.lastUpdated
        }),
        
        // 数据访问
        getFinancialStats: calculateFinancialStats,
        getTarget: () => state.data.target,
        getExchangeRate: () => state.data.rate,
        
        // 工具方法
        formatNumber,
        
        // 常量
        CONFIG
    };

    // 自动初始化
    document.addEventListener('DOMContentLoaded', async () => {
        window.WorkbenchDashboard = api;
        await api.init();
        console.log('✅ [Dashboard] V14.2 Enhanced 模块已加载并初始化');
    });

    // 清理函数
    window.addEventListener('beforeunload', () => {
        stopTimers();
    });

    return api;
})();

// 兼容旧版API
window.WorkbenchDashboard = WorkbenchDashboard;

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchDashboard;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchDashboard);
}