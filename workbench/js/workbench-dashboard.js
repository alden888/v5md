/**
 * 仪表盘模块 - 完整优化版
 * 包含元素文本更新、数据统计、渲染仪表盘
 */

/**
 * 更新元素文本（增强版）
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

        console.log(`[Dashboard] 元素 ${id} 文本已更新：${textContent}`);
    } catch (error) {
        console.error('[Dashboard] 更新元素文本失败:', error);
        (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast(`文本更新失败：${error.message}`, 'error');
    }
}

/**
 * 统计仪表盘核心数据
 * @returns {Object} 统计数据
 */
function getDashboardStats() {
    try {
        // 从全局状态获取原始数据（兜底）
        const state = window.workbenchState || {
            orders: JSON.parse(localStorage.getItem('workbench_orders')) || [],
            incomes: JSON.parse(localStorage.getItem('workbench_incomes')) || [],
            suppliers: JSON.parse(localStorage.getItem('workbench_suppliers')) || []
        };

        // 订单统计
        const totalOrders = state.orders.length;
        const pendingOrders = state.orders.filter(o => o.kanbanStatus === 'New' || o.kanbanStatus === 'Processing').length;
        const completedOrders = state.orders.filter(o => o.kanbanStatus === 'Paid' || o.kanbanStatus === 'Shipped').length;

        // 收入统计
        const totalIncome = state.incomes.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        const monthIncome = state.incomes
            .filter(item => {
                const itemDate = new Date(item.createTime);
                const now = new Date();
                return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
            })
            .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

        // 供应商统计
        const totalSuppliers = state.suppliers.length;

        return {
            totalOrders,
            pendingOrders,
            completedOrders,
            totalIncome: totalIncome.toFixed(2),
            monthIncome: monthIncome.toFixed(2),
            totalSuppliers
        };
    } catch (error) {
        console.error('[Dashboard] 统计数据失败:', error);
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

        // 渲染趋势图（占位，实际项目替换为ECharts等）
        renderTrendChart('income-trend-chart', stats.monthIncome);

        console.log('[Dashboard] 仪表盘渲染完成');
    } catch (error) {
        console.error('[Dashboard] 渲染仪表盘失败:', error);
        (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast(`仪表盘渲染失败：${error.message}`, 'error');
    }
}

/**
 * 渲染趋势图（占位实现）
 * @param {string} chartId - 图表容器ID
 * @param {string} monthIncome - 本月收入
 */
function renderTrendChart(chartId, monthIncome) {
    const container = document.getElementById(chartId);
    if (!container) {
        console.warn(`[Dashboard] 图表容器未找到：${chartId}`);
        return;
    }

    container.innerHTML = `
        <div class="bg-gray-800 rounded p-4 h-64 flex flex-col justify-center items-center">
            <p class="text-gray-400 mb-2">本月收入趋势（模拟）</p>
            <div class="text-2xl text-white font-bold">¥${monthIncome}</div>
            <p class="text-green-500 text-sm mt-2">较上月增长 12.5%</p>
        </div>
    `;
}

/**
 * 刷新仪表盘数据（定时+手动调用）
 * @param {number} interval - 刷新间隔（毫秒，0为仅刷新一次）
 */
function refreshDashboard(interval = 0) {
    renderDashboard();
    if (interval > 0) {
        clearInterval(window.dashboardRefreshTimer);
        window.dashboardRefreshTimer = setInterval(renderDashboard, interval);
        console.log(`[Dashboard] 已设置自动刷新，间隔${interval}ms`);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 首次渲染
    renderDashboard();

    // 绑定刷新按钮事件
    const refreshBtn = document.getElementById('dashboard-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => refreshDashboard());
    }

    // 可选：设置5分钟自动刷新
    // refreshDashboard(300000);
});

// 暴露全局方法
window.updateElementText = updateElementText;
window.getDashboardStats = getDashboardStats;
window.renderDashboard = renderDashboard;
window.refreshDashboard = refreshDashboard;