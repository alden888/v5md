/**
 * V5 Medical Workbench - 订单管理模块
 * 优化点：完善依赖校验、全流程错误处理、数据兜底、DOM 安全操作
 * @version 2.1.0
 */
class WorkbenchOrders {
    constructor() {
        // 初始化存储层 & 工具类（增加兜底）
        this.storage = window.V5Workbench?.storage || {
            getOrders: async () => [],
            saveToCloud: async (key, data) => Promise.reject('Storage not initialized'),
            getLocalOrders: async () => JSON.parse(localStorage.getItem('v5_orders') || '[]')
        };
        this.utils = window.WorkbenchUtils || {
            toast: {
                success: (msg) => alert(`成功：${msg}`),
                error: (msg) => alert(`错误：${msg}`),
                warn: (msg) => alert(`警告：${msg}`)
            }
        };
        this.currentRate = 7.25; // 默认汇率
        this.data = { orders: [] };
        // DOM 节点缓存（避免重复查询）
        this.domCache = {
            orderList: null,
            emptyState: null,
            loadingState: null
        };
    }

    /**
     * 初始化订单模块（入口方法）
     */
    async init() {
        try {
            // 1. 校验 DOM 节点
            this._cacheDOM();
            if (!this.domCache.orderList) {
                throw new Error('核心DOM节点缺失：#recent-orders-list');
            }

            // 2. 显示加载状态
            this._toggleLoading(true);

            // 3. 加载订单数据（云存储优先，本地兜底）
            await this.loadOrders();

            // 4. 渲染订单列表
            this.renderOrders();

            // 5. 绑定事件（如清空订单按钮）
            this.bindEvents();

            this._toggleLoading(false);
            this.utils.toast.success('订单模块加载成功');
        } catch (error) {
            this._toggleLoading(false);
            this.utils.toast.error(`订单模块加载失败：${error.message}`);
            console.error('[Orders Module] Init failed:', error);
            // 渲染空状态（友好提示）
            this._renderEmptyState('加载失败，请刷新页面重试');
        }
    }

    /**
     * 缓存 DOM 节点（安全获取）
     */
    _cacheDOM() {
        this.domCache.orderList = document.getElementById('recent-orders-list');
        this.domCache.emptyState = document.getElementById('orders-empty-state');
        this.domCache.loadingState = document.getElementById('orders-loading-state');
        // 兼容未定义的节点（避免后续判断报错）
        Object.keys(this.domCache).forEach(key => {
            if (!this.domCache[key]) {
                this.domCache[key] = document.createElement('div');
                this.domCache[key].id = key;
            }
        });
    }

    /**
     * 加载订单数据（云存储 + 本地兜底）
     */
    async loadOrders() {
        try {
            // 优先从云存储加载
            const cloudOrders = await this.storage.getOrders();
            // 校验数据格式（必须是数组）
            this.data.orders = Array.isArray(cloudOrders) ? cloudOrders : [];
            
            // 若云存储无数据，从本地缓存兜底
            if (this.data.orders.length === 0) {
                const localOrders = await this.storage.getLocalOrders();
                this.data.orders = Array.isArray(localOrders) ? localOrders : [];
                this.utils.toast.warn('云存储无订单数据，已加载本地缓存');
            }

            // 校验汇率有效性
            this.currentRate = parseFloat(localStorage.getItem('v5_usd_rate')) || 7.25;
            if (isNaN(this.currentRate) || this.currentRate <= 0) {
                this.currentRate = 7.25;
                this.utils.toast.warn('汇率异常，已重置为默认值 7.25');
            }

        } catch (cloudError) {
            // 云存储加载失败，降级到本地缓存
            console.error('[Orders] Load cloud orders failed:', cloudError);
            const localOrders = await this.storage.getLocalOrders().catch(() => []);
            this.data.orders = Array.isArray(localOrders) ? localOrders : [];
            this.utils.toast.warn('云存储访问失败，已加载本地订单数据');
        }
    }

    /**
     * 渲染订单列表（安全处理边界情况）
     */
    renderOrders() {
        const { orders } = this.data;
        // 空数据处理
        if (!orders || orders.length === 0) {
            this._renderEmptyState('暂无订单记录');
            return;
        }

        // 截取前5条（安全处理数组）
        const recentOrders = Array.isArray(orders) ? orders.slice(0, 5) : [];
        
        // 渲染订单表格
        this.domCache.orderList.innerHTML = `
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
                        ${recentOrders.map(o => this._renderOrderRow(o)).join('')}
                    </tbody>
                </table>
            </div>
        `;

        // 隐藏空状态
        if (this.domCache.emptyState) {
            this.domCache.emptyState.classList.add('hidden');
        }
    }

    /**
     * 渲染单个订单行（状态兜底 + 数据校验）
     */
    _renderOrderRow(order) {
        // 订单数据兜底
        const o = {
            id: order?.id || '未知订单号',
            customer: order?.customer || '未知客户',
            total: parseFloat(order?.total) || 0,
            status: order?.status || 'Unknown',
            date: order?.date || new Date().toISOString()
        };

        // 金额格式化（避免 NaN）
        const amountUSD = o.total.toFixed(2);
        const amountRMB = (o.total * this.currentRate).toFixed(2);

        // 状态样式兜底
        const statusClass = o.status === 'Paid' 
            ? 'bg-green-100 text-green-700' 
            : o.status === 'Pending' 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-slate-100 text-slate-700';

        // 日期格式化（容错）
        let orderDate = '未知日期';
        try {
            orderDate = new Date(o.date).toLocaleDateString('zh-CN');
        } catch (e) {}

        return `
            <tr class="hover:bg-slate-50 transition">
                <td class="px-4 py-3 font-mono font-bold text-slate-800">${o.id}</td>
                <td class="px-4 py-3 text-slate-600">${o.customer}</td>
                <td class="px-4 py-3 text-right font-bold text-blue-600">$${amountUSD}</td>
                <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 rounded-full text-xs font-bold ${statusClass}">
                        ${o.status}
                    </span>
                </td>
                <td class="px-4 py-3 text-center text-xs text-slate-400">
                    ${orderDate}
                </td>
            </tr>
        `;
    }

    /**
     * 渲染空状态
     */
    _renderEmptyState(text) {
        this.domCache.orderList.innerHTML = `<div class="text-center py-8 text-slate-400">${text}</div>`;
        if (this.domCache.emptyState) {
            this.domCache.emptyState.classList.remove('hidden');
        }
    }

    /**
     * 切换加载状态
     */
    _toggleLoading(show) {
        if (this.domCache.loadingState) {
            this.domCache.loadingState.classList.toggle('hidden', !show);
        }
    }

    /**
     * 绑定订单相关事件（如清空订单）
     */
    bindEvents() {
        const clearBtn = document.getElementById('clear-orders-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllOrders());
        }
    }

    /**
     * 清空所有订单（优化版：完善校验 + 错误处理 + 用户提示）
     */
    async clearAllOrders() {
        // 1. 二次确认（增强用户体验）
        const confirmMsg = '⚠️ 确定清空所有订单记录？\n此操作不可恢复！\n\n当前将清空云存储+本地缓存的订单数据。';
        if (!confirm(confirmMsg)) {
            return;
        }

        try {
            // 2. 显示加载状态
            this._toggleLoading(true);

            // 3. 清空云存储订单
            await this.storage.saveToCloud('orders', []);
            
            // 4. 清空本地缓存订单
            localStorage.setItem('v5_orders', JSON.stringify([]));
            
            // 5. 重新加载数据并渲染
            await this.loadOrders();
            this.renderOrders();

            // 6. 提示成功
            this.utils.toast.success('订单记录已清空（云存储+本地缓存）');
        } catch (error) {
            // 7. 错误处理（区分云存储/本地缓存失败）
            console.error('[Orders] Clear failed:', error);
            this.utils.toast.error(`清空失败：${error.message}\n已尝试保留本地缓存数据`);
        } finally {
            // 8. 隐藏加载状态（无论成功/失败）
            this._toggleLoading(false);
        }
    }
}

// 初始化调用（确保 DOM 加载完成后执行）
document.addEventListener('DOMContentLoaded', async () => {
    const ordersModule = new WorkbenchOrders();
    await ordersModule.init();
    // 挂载到全局，方便其他模块调用
    window.V5Workbench = window.V5Workbench || {};
    window.V5Workbench.orders = ordersModule;
});
