/**
 * V14.2 PRO - 订单看板模块
 * 负责订单管理、看板状态控制、快速添加等功能
 * 优化版本 - 2026-01-03
 * @namespace WorkbenchOrders
 */
const WorkbenchOrders = (() => {
    'use strict';

    // 看板状态定义
    const KANBAN_STATUS = {
        NEW: 'New',
        PROCESSING: 'Processing',
        PAID: 'Paid',
        SHIPPED: 'Shipped',
        COMPLETED: 'Completed'
    };

    // 订单状态颜色映射
    const STATUS_COLORS = {
        [KANBAN_STATUS.NEW]: 'bg-blue-600',
        [KANBAN_STATUS.PROCESSING]: 'bg-yellow-600',
        [KANBAN_STATUS.PAID]: 'bg-green-600',
        [KANBAN_STATUS.SHIPPED]: 'bg-purple-600',
        [KANBAN_STATUS.COMPLETED]: 'bg-gray-600'
    };

    // 模块状态
    const state = {
        orders: [],
        currentEditingOrder: null,
        isInitialized: false
    };

    /**
     * 初始化订单模块（供loader调用）
     * @returns {boolean} 是否成功
     */
    function init() {
        try {
            console.log('[Orders] 订单模块初始化中...');

            // 加载订单数据
            loadOrders();

            // 绑定事件
            bindEvents();

            // 渲染看板
            renderKanban();

            state.isInitialized = true;
            console.log('[Orders] ✅ 订单模块已初始化');
            console.log('[Orders] 当前订单数:', state.orders.length);
            return true;
        } catch (error) {
            console.error('[Orders] ❌ 初始化失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast('订单模块初始化失败', 'error');
            }
            return false;
        }
    }

    /**
     * 从存储加载订单数据
     */
    function loadOrders() {
        try {
            // 使用WorkbenchState（优先）
            if (window.WorkbenchState && WorkbenchState.get) {
                state.orders = WorkbenchState.get('data.orders') || [];
                console.log('[Orders] 从State加载订单');
            } else if (window.WorkbenchStorage && WorkbenchStorage.load) {
                state.orders = WorkbenchStorage.load('orders') || [];
                console.log('[Orders] 从Storage加载订单');
            } else {
                // 降级到localStorage
                const ordersJson = localStorage.getItem('workbench_orders');
                state.orders = ordersJson ? JSON.parse(ordersJson) : [];
                console.log('[Orders] 从localStorage加载订单');
            }
            console.log(`[Orders] ✅ 已加载 ${state.orders.length} 条订单`);
        } catch (error) {
            console.error('[Orders] ❌ 加载订单数据失败:', error);
            state.orders = [];
        }
    }

    /**
     * 保存订单数据
     * @returns {boolean} 是否成功
     */
    function saveOrders() {
        try {
            // 使用WorkbenchState（优先）
            if (window.WorkbenchState && WorkbenchState.set) {
                WorkbenchState.set('data.orders', state.orders, true);
                console.log('[Orders] 保存到State');
            } else if (window.WorkbenchStorage && WorkbenchStorage.save) {
                WorkbenchStorage.save('orders', state.orders);
                console.log('[Orders] 保存到Storage');
            } else {
                // 降级到localStorage
                localStorage.setItem('workbench_orders', JSON.stringify(state.orders));
                console.log('[Orders] 保存到localStorage');
            }
            
            console.log(`[Orders] ✅ 已保存 ${state.orders.length} 条订单`);
            
            // 同步到Firebase（如果启用）
            if (window.WorkbenchFirebase && WorkbenchFirebase.isInitialized && WorkbenchFirebase.isInitialized()) {
                WorkbenchFirebase.syncOrders(state.orders).catch(err => {
                    console.warn('[Orders] Firebase同步失败:', err);
                });
            }
            
            return true;
        } catch (error) {
            console.error('[Orders] ❌ 保存订单数据失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast('订单数据保存失败', 'error');
            }
            return false;
        }
    }

    /**
     * 绑定事件监听器
     */
    function bindEvents() {
        // 快速添加按钮
        const quickAddBtn = document.getElementById('kanban-quick-add');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', () => openQuickAddModal());
            console.log('[Orders] 快速添加按钮已绑定');
        }

        // 刷新按钮
        const refreshBtn = document.getElementById('kanban-refresh');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                loadOrders();
                renderKanban();
                if (window.WorkbenchUtils) {
                    WorkbenchUtils.toast('订单数据已刷新', 'success');
                }
            });
            console.log('[Orders] 刷新按钮已绑定');
        }
    }

    /**
     * 渲染看板
     */
    function renderKanban() {
        try {
            // 按状态分组订单
            const groupedOrders = {};
            Object.values(KANBAN_STATUS).forEach(status => {
                groupedOrders[status] = state.orders.filter(order => order.kanbanStatus === status);
            });

            // 渲染各个列
            Object.entries(groupedOrders).forEach(([status, orders]) => {
                renderKanbanColumn(status, orders);
            });

            console.log('[Orders] ✅ 看板渲染完成');
        } catch (error) {
            console.error('[Orders] ❌ 渲染看板失败:', error);
        }
    }

    /**
     * 渲染看板列
     * @param {string} status - 状态
     * @param {Array} orders - 订单列表
     */
    function renderKanbanColumn(status, orders) {
        const columnId = `kanban-column-${status.toLowerCase()}`;
        const column = document.getElementById(columnId);

        if (!column) {
            return;
        }

        // 生成订单卡片HTML
        const cardsHtml = orders.map(order => generateOrderCard(order)).join('');

        // 更新列内容
        const cardsContainer = column.querySelector('.kanban-cards') || column;
        cardsContainer.innerHTML = cardsHtml || '<div class="text-gray-500 text-center py-8 text-sm">暂无订单</div>';
    }

    /**
     * 生成订单卡片HTML
     * @param {Object} order - 订单数据
     * @returns {string} HTML字符串
     */
    function generateOrderCard(order) {
        const statusColor = STATUS_COLORS[order.kanbanStatus] || 'bg-gray-600';
        const amount = parseFloat(order.amount) || 0;
        const currency = order.currency || 'USD';
        const customerName = escapeHtml(order.customerName || '未命名客户');

        return `
            <div class="bg-gray-800 rounded-lg p-4 mb-3 border-l-4 ${statusColor} cursor-pointer hover:bg-gray-750 transition-colors"
                 data-order-id="${order.id}"
                 onclick="WorkbenchOrders.openOrderDetail('${order.id}')">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-medium text-white truncate flex-1">${customerName}</h4>
                    <span class="text-xs ${statusColor} text-white px-2 py-1 rounded ml-2">${order.kanbanStatus}</span>
                </div>
                <p class="text-sm text-gray-400 mb-2">订单号: ${order.orderNumber || order.id}</p>
                <div class="flex justify-between items-center">
                    <span class="text-green-400 font-bold">${currency} ${amount.toFixed(2)}</span>
                    <span class="text-xs text-gray-500">${formatDate(order.createTime)}</span>
                </div>
            </div>
        `;
    }

    /**
     * 打开快速添加模态框
     */
    function openQuickAddModal() {
        try {
            // 使用WorkbenchModal
            if (window.WorkbenchModal && WorkbenchModal.open) {
                WorkbenchModal.open({
                    title: '快速添加订单',
                    content: generateQuickAddForm(),
                    size: 'lg',
                    buttons: [
                        {
                            text: '取消',
                            className: 'bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium',
                            onClick: (modal) => WorkbenchModal.close(modal)
                        },
                        {
                            text: '保存',
                            className: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium',
                            onClick: () => handleQuickAdd()
                        }
                    ]
                });
            } else {
                console.warn('[Orders] WorkbenchModal未找到');
                if (window.WorkbenchUtils) {
                    WorkbenchUtils.toast('模态框功能不可用', 'warning');
                }
            }

            console.log('[Orders] 快速添加模态框已打开');
        } catch (error) {
            console.error('[Orders] ❌ 打开快速添加模态框失败:', error);
        }
    }

    /**
     * 生成快速添加表单HTML
     * @returns {string} HTML字符串
     */
    function generateQuickAddForm() {
        return `
            <form id="quick-add-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">客户名称 *</label>
                    <input type="text" id="order-customer-name" required
                           class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="请输入客户名称">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">订单号</label>
                    <input type="text" id="order-number"
                           class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="自动生成或手动输入">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">金额 *</label>
                        <input type="number" id="order-amount" required step="0.01" min="0"
                               class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                               placeholder="0.00">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">货币</label>
                        <select id="order-currency"
                                class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="USD">USD - 美元</option>
                            <option value="EUR">EUR - 欧元</option>
                            <option value="GBP">GBP - 英镑</option>
                            <option value="CNY">CNY - 人民币</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">看板状态</label>
                    <select id="order-status"
                            class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="${KANBAN_STATUS.NEW}">New - 新订单</option>
                        <option value="${KANBAN_STATUS.PROCESSING}">Processing - 处理中</option>
                        <option value="${KANBAN_STATUS.PAID}">Paid - 已付款</option>
                        <option value="${KANBAN_STATUS.SHIPPED}">Shipped - 已发货</option>
                        <option value="${KANBAN_STATUS.COMPLETED}">Completed - 已完成</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-1">备注</label>
                    <textarea id="order-remark" rows="3"
                              class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="订单备注信息（可选）"></textarea>
                </div>
            </form>
        `;
    }

    /**
     * 处理快速添加提交
     */
    function handleQuickAdd() {
        try {
            const formData = {
                customerName: document.getElementById('order-customer-name')?.value?.trim(),
                orderNumber: document.getElementById('order-number')?.value?.trim(),
                amount: parseFloat(document.getElementById('order-amount')?.value) || 0,
                currency: document.getElementById('order-currency')?.value || 'USD',
                kanbanStatus: document.getElementById('order-status')?.value || KANBAN_STATUS.NEW,
                remark: document.getElementById('order-remark')?.value?.trim() || ''
            };

            if (!formData.customerName) {
                if (window.WorkbenchUtils) {
                    WorkbenchUtils.toast('请输入客户名称', 'warning');
                }
                return;
            }

            if (formData.amount <= 0) {
                if (window.WorkbenchUtils) {
                    WorkbenchUtils.toast('请输入有效的订单金额', 'warning');
                }
                return;
            }

            const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const orderNumber = formData.orderNumber || `ORD-${Date.now().toString().slice(-8)}`;

            const newOrder = {
                id: orderId,
                orderNumber: orderNumber,
                customerName: formData.customerName,
                amount: formData.amount,
                currency: formData.currency,
                kanbanStatus: formData.kanbanStatus,
                remark: formData.remark,
                createTime: new Date().toISOString(),
                updateTime: new Date().toISOString()
            };

            state.orders.push(newOrder);
            saveOrders();
            renderKanban();

            if (window.WorkbenchModal) {
                WorkbenchModal.close();
            }

            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast('订单添加成功', 'success');
            }

            console.log('[Orders] ✅ 订单添加成功:', newOrder);
        } catch (error) {
            console.error('[Orders] ❌ 添加订单失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast('添加订单失败', 'error');
            }
        }
    }

    /**
     * 打开订单详情
     * @param {string} orderId - 订单ID
     */
    function openOrderDetail(orderId) {
        try {
            const order = state.orders.find(o => o.id === orderId);
            if (!order) {
                console.warn('[Orders] 订单不存在:', orderId);
                return;
            }

            state.currentEditingOrder = order;

            if (window.WorkbenchModal) {
                WorkbenchModal.open({
                    title: '订单详情',
                    content: generateOrderDetailHTML(order),
                    size: 'xl',
                    buttons: [
                        {
                            text: '关闭',
                            className: 'bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium',
                            onClick: (modal) => WorkbenchModal.close(modal)
                        }
                    ]
                });
            } else {
                if (window.WorkbenchUtils) {
                    WorkbenchUtils.toast('详情功能开发中', 'info');
                }
            }
        } catch (error) {
            console.error('[Orders] ❌ 打开订单详情失败:', error);
        }
    }

    /**
     * 生成订单详情HTML
     * @param {Object} order - 订单对象
     * @returns {string} HTML字符串
     */
    function generateOrderDetailHTML(order) {
        return `
            <div class="space-y-4 text-gray-300">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm text-gray-500">订单号</label>
                        <p class="text-white font-medium">${order.orderNumber}</p>
                    </div>
                    <div>
                        <label class="text-sm text-gray-500">客户名称</label>
                        <p class="text-white font-medium">${escapeHtml(order.customerName)}</p>
                    </div>
                    <div>
                        <label class="text-sm text-gray-500">订单金额</label>
                        <p class="text-white font-medium">${order.currency} ${parseFloat(order.amount).toFixed(2)}</p>
                    </div>
                    <div>
                        <label class="text-sm text-gray-500">看板状态</label>
                        <p class="text-white font-medium">${order.kanbanStatus}</p>
                    </div>
                    <div>
                        <label class="text-sm text-gray-500">创建时间</label>
                        <p class="text-white font-medium">${formatDate(order.createTime)}</p>
                    </div>
                    <div>
                        <label class="text-sm text-gray-500">更新时间</label>
                        <p class="text-white font-medium">${formatDate(order.updateTime)}</p>
                    </div>
                </div>
                ${order.remark ? `
                    <div>
                        <label class="text-sm text-gray-500">备注</label>
                        <p class="text-white">${escapeHtml(order.remark)}</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatDate(dateStr) {
        if (!dateStr) return '未知';
        try {
            if (window.WorkbenchUtils && WorkbenchUtils.formatDate) {
                return WorkbenchUtils.formatDate(dateStr, 'YYYY-MM-DD HH:mm');
            }
            const date = new Date(dateStr);
            return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN');
        } catch {
            return '未知';
        }
    }

    function getAllOrders() {
        return [...state.orders];
    }

    function getOrdersByStatus(status) {
        return state.orders.filter(order => order.kanbanStatus === status);
    }

    const api = {
        init,
        openQuickAddModal,
        openOrderDetail,
        getAllOrders,
        getOrdersByStatus,
        renderKanban,
        loadOrders,
        saveOrders,
        KANBAN_STATUS,
        STATUS_COLORS
    };

    return api;
})();

window.WorkbenchOrders = WorkbenchOrders;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchOrders;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchOrders);
}

console.log('[Orders] 订单模块已加载');
