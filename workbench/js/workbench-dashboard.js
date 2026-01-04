/**
 * V14.2 PRO - 仪表盘模块
 * 数据统计、可视化、趋势分析
 * 优化版本 - 2026-01-03
 * @namespace WorkbenchDashboard
 */
const WorkbenchDashboard = (() => {
    'use strict';

    // 刷新定时器
    let refreshTimer = null;

    /**
     * 初始化仪表盘模块（供loader调用）
     * @returns {boolean} 是否成功
     */
    function init() {
        try {
            console.log('[Dashboard] 仪表盘模块初始化中...');
            
            // 首次渲染
            renderDashboard();
            
            // 绑定事件
            bindEvents();
            
            console.log('[Dashboard] ✅ 仪表盘模块已初始化');
            return true;
        } catch (error) {
            console.error('[Dashboard] ❌ 初始化失败:', error);
            return false;
        }
    }

    /**
     * 绑定事件监听器
     */
    function bindEvents() {
        try {
            // 绑定刷新按钮事件
            const refreshBtn = document.getElementById('dashboard-refresh');
            if (refreshBtn) {
                refreshBtn.addEventListener('click', () => refreshDashboard());
            }
        } catch (error) {
            console.warn('[Dashboard] 绑定事件失败:', error);
        }
    }

    /**
     * 更新元素文本
     * @param {string} id - 元素ID
     * @param {string|number} text - 文本内容
     * @param {boolean} append - 是否追加文本（默认覆盖）
     */
    function updateElementText(id, text, append = false) {
        try {
            // 校验参数合法性
            if (!id || typeof id !== 'string') {
                throw new Error('元素ID必须为非空字符串');
            }

            const element = document.getElementById(id);
            if (!element) {
                console.warn(`[Dashboard] 元素未找到：${id}`);
                return;
            }

            // 处理文本内容（兜底为字符串）
            const textContent = typeof text === 'string' || typeof text === 'number' 
                ? text.toString() 
                : '';

            // 更新文本（覆盖/追加）
            if (append) {
                element.textContent += textContent;
            } else {
                element.textContent = textContent;
            }
        } catch (error) {
            console.error('[Dashboard] ❌ 更新元素文本失败:', error);
        }
    }

    /**
     * 统计仪表盘核心数据
     * @returns {Object} 统计数据
     */
    function getDashboardStats() {
        try {
            // 从WorkbenchStorage或localStorage获取数据
            let orders = [];
            let incomes = [];
            let suppliers = [];

            if (window.WorkbenchStorage) {
                orders = WorkbenchStorage.load('orders') || [];
                incomes = WorkbenchStorage.load('incomes') || [];
                suppliers = WorkbenchStorage.load('suppliers') || [];
            } else {
                orders = JSON.parse(localStorage.getItem('workbench_orders') || '[]');
                incomes = JSON.parse(localStorage.getItem('workbench_incomes') || '[]');
                suppliers = JSON.parse(localStorage.getItem('workbench_suppliers') || '[]');
            }

            // 订单统计
            const totalOrders = orders.length;
            const pendingOrders = orders.filter(o => 
                o.kanbanStatus === 'New' || o.kanbanStatus === 'Processing'
            ).length;
            const completedOrders = orders.filter(o => 
                o.kanbanStatus === 'Paid' || o.kanbanStatus === 'Shipped' || o.kanbanStatus === 'Completed'
            ).length;

            // 收入统计
            const totalIncome = incomes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
            const now = new Date();
            const monthIncome = incomes
                .filter(item => {
                    const itemDate = new Date(item.createTime);
                    return itemDate.getMonth() === now.getMonth() && 
                           itemDate.getFullYear() === now.getFullYear();
                })
                .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

            // 供应商统计
            const totalSuppliers = suppliers.length;

            return {
                totalOrders,
                pendingOrders,
                completedOrders,
                totalIncome: totalIncome.toFixed(2),
                monthIncome: monthIncome.toFixed(2),
                totalSuppliers
            };
        } catch (error) {
            console.error('[Dashboard] ❌ 统计数据失败:', error);
            // 数据统计失败时返回兜底值
            return {
                totalOrders: 0,
                pendingOrders: 0,
                completedOrders: 0,
                totalIncome: '0.00',
                monthIncome: '0.00',
                totalSuppliers: 0
            };
        }
    }

    /**
     * 渲染仪表盘（核心入口）
     */
    function renderDashboard() {
        try {
            const stats = getDashboardStats();

            // 更新核心指标
            updateElementText('dashboard-total-orders', stats.totalOrders);
            updateElementText('dashboard-pending-orders', stats.pendingOrders);
            updateElementText('dashboard-completed-orders', stats.completedOrders);
            updateElementText('dashboard-total-income', `¥${stats.totalIncome}`);
            updateElementText('dashboard-month-income', `¥${stats.monthIncome}`);
            updateElementText('dashboard-total-suppliers', stats.totalSuppliers);

            // 渲染趋势图
            renderTrendChart('income-trend-chart', stats.monthIncome);

            console.log('[Dashboard] ✅ 仪表盘渲染完成');
        } catch (error) {
            console.error('[Dashboard] ❌ 渲染仪表盘失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast(`仪表盘渲染失败：${error.message}`, 'error');
            }
        }
    }

    /**
     * 渲染趋势图
     * @param {string} chartId - 图表容器ID
     * @param {string} monthIncome - 本月收入
     */
    function renderTrendChart(chartId, monthIncome) {
        const container = document.getElementById(chartId);
        if (!container) {
            console.warn(`[Dashboard] 图表容器未找到：${chartId}`);
            return;
        }

        // 简化实现（实际项目可使用ECharts等图表库）
        container.innerHTML = `
            <div class="bg-gray-800 rounded p-4 h-64 flex flex-col justify-center items-center">
                <p class="text-gray-400 mb-2">本月收入趋势</p>
                <div class="text-2xl text-white font-bold">¥${monthIncome}</div>
                <p class="text-green-500 text-sm mt-2">数据统计中...</p>
            </div>
        `;
    }

    /**
     * 刷新仪表盘数据
     * @param {number} interval - 刷新间隔（毫秒，0为仅刷新一次）
     */
    function refreshDashboard(interval = 0) {
        try {
            renderDashboard();
            
            if (interval > 0) {
                clearInterval(refreshTimer);
                refreshTimer = setInterval(renderDashboard, interval);
                console.log(`[Dashboard] ✅ 已设置自动刷新，间隔${interval}ms`);
            } else {
                console.log('[Dashboard] ✅ 仪表盘已刷新');
            }
        } catch (error) {
            console.error('[Dashboard] ❌ 刷新失败:', error);
        }
    }

    /**
     * 停止自动刷新
     */
    function stopAutoRefresh() {
        if (refreshTimer) {
            clearInterval(refreshTimer);
            refreshTimer = null;
            console.log('[Dashboard] ✅ 已停止自动刷新');
        }
    }

    // 公共API
    const api = {
        // 初始化
        init,
        
        // 渲染操作
        renderDashboard,
        refreshDashboard,
        stopAutoRefresh,
        
        // 数据统计
        getDashboardStats,
        
        // 工具方法
        updateElementText
    };

    return api;
})();

// 挂载到全局
window.WorkbenchDashboard = WorkbenchDashboard;

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchDashboard;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchDashboard);
}

console.log('[Dashboard] 仪表盘模块已加载');
