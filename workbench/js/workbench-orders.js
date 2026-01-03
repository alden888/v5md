/**
 * V14.2 PRO - Orders Module (Enhanced)
 * 订单看板模块：订单管理 + 状态跟踪 + 数据分析
 * @namespace WorkbenchOrders
 */
const WorkbenchOrders = (() => {
    'use strict';

    // 配置常量
    const CONFIG = {
        STORAGE_KEY: 'v14_orders',
        KANBAN_STAGES: ['New', 'Processing', 'Shipped', 'Paid'],
        DEFAULT_CURRENCY: 'CNY',
        DECIMAL_PRECISION: 2,
        PAGE_SIZE: 10
    };

    // 模块状态
    const state = {
        orders: [],
        currentEditId: null,
        isProcessing: false,
        currentPage: 1,
        searchQuery: '',
        filterStatus: 'all',
        sortBy: 'createdAt',
        sortDirection: 'desc',
        isInitialized: false
    };

    /**
     * 初始化订单模块
     * @returns {Promise<boolean>} 是否初始化成功
     */
    async function init() {
        if (state.isInitialized) return true;

        try {
            console.log('[Orders] 🚀 初始化订单模块 (V14.2 PRO)...');
            
            // 加载订单数据
            await loadOrdersData();
            
            // 绑定DOM事件
            bindEvents();
            
            // 渲染初始界面
            render();
            
            state.isInitialized = true;
            console.log('[Orders] ✅ 订单模块初始化完成', {
                orderCount: state.orders.length
            });
            
            return true;
        } catch (error) {
            console.error('[Orders] ❌ 初始化失败:', error);
            showError('订单模块初始化失败，请刷新页面重试');
            return false;
        }
    }

    /**
     * 加载订单数据
     * @returns {Promise<void>}
     */
    async function loadOrdersData() {
        try {
            // 使用存储模块加载数据
            if (window.WorkbenchStorage) {
                state.orders = await window.WorkbenchStorage.loadArray(CONFIG.STORAGE_KEY, []);
            } else {
                // 降级到localStorage
                state.orders = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]');
            }

            // 确保订单数据结构完整
            state.orders = state.orders.map(order => normalizeOrderData(order));
        } catch (error) {
            console.error('[Orders] ❌ 加载订单数据失败:', error);
            state.orders = [];
        }
    }

    /**
     * 保存订单数据
     * @returns {Promise<boolean>} 是否成功
     */
    async function saveOrdersData() {
        try {
            if (window.WorkbenchStorage) {
                await window.WorkbenchStorage.save(CONFIG.STORAGE_KEY, state.orders);
            } else {
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.orders));
            }
            
            // 通知仪表盘更新
            if (window.WorkbenchDashboard && typeof window.WorkbenchDashboard.updateDashboard === 'function') {
                window.WorkbenchDashboard.updateDashboard();
            }
            
            return true;
        } catch (error) {
            console.error('[Orders] ❌ 保存订单数据失败:', error);
            showError('保存订单数据失败');
            return false;
        }
    }

    /**
     * 规范化订单数据结构
     * @param {Object} order - 订单数据
     * @returns {Object} 规范化后的订单数据
     */
    function normalizeOrderData(order) {
        const now = new Date().toISOString();
        
        return {
            id: order.id || generateOrderId(),
            customer: order.customer || '',
            product: order.product || '',
            amount: order.amount ? parseFloat(order.amount.toFixed(CONFIG.DECIMAL_PRECISION)) : 0,
            quantity: order.quantity || 1,
            totalAmount: order.totalAmount ? parseFloat(order.totalAmount.toFixed(CONFIG.DECIMAL_PRECISION)) : 
                (order.amount ? parseFloat((order.amount * (order.quantity || 1)).toFixed(CONFIG.DECIMAL_PRECISION)) : 0),
            status: order.status || 'New',
            kanbanStatus: order.kanbanStatus || order.status || 'New',
            notes: order.notes || '',
            createdAt: order.createdAt || now,
            updatedAt: now,
            paidDate: order.paidDate || null,
            shippedDate: order.shippedDate || null,
            customerId: order.customerId || null,
            supplierId: order.supplierId || null,
            tags: order.tags || []
        };
    }

    /**
     * 绑定DOM事件
     */
    function bindEvents() {
        console.log('[Orders] 🎯 绑定事件...');

        // 快速添加订单按钮
        const quickAddBtn = document.getElementById('quick-add-order');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', openQuickAddModal);
        }

        // 传统表单提交事件
        const orderForm = document.getElementById('new-order-form');
        if (orderForm) {
            orderForm.addEventListener('submit', handleFormSubmit);
        }

        // 搜索框事件
        const searchInput = document.getElementById('order-search');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                state.searchQuery = e.target.value.toLowerCase();
                render();
            }, 300));
        }

        // 状态筛选事件
        const statusFilter = document.getElementById('order-status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                state.filterStatus = e.target.value;
                render();
            });
        }

        // 排序选择事件
        const sortSelect = document.getElementById('order-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                const [sortBy, sortDirection] = e.target.value.split('-');
                state.sortBy = sortBy;
                state.sortDirection = sortDirection;
                render();
            });
        }

        console.log('[Orders] ✅ 事件绑定完成');
    }

    /**
     * 渲染订单看板
     */
    function render() {
        console.log('[Orders] 📊 渲染订单看板...');

        try {
            // 获取看板容器
            const kanbanContainer = document.getElementById('orders-kanban');
            if (!kanbanContainer) {
                console.error('[Orders] ❌ 未找到看板容器');
                return;
            }

            // 清空容器
            kanbanContainer.innerHTML = '';

            // 过滤和排序订单
            const filteredOrders = filterAndSortOrders();

            // 创建看板列
            CONFIG.KANBAN_STAGES.forEach(stage => {
                const stageOrders = filteredOrders.filter(order => order.kanbanStatus === stage);
                const stageColumn = createStageColumn(stage, stageOrders);
                kanbanContainer.appendChild(stageColumn);
            });

            // 更新统计信息
            updateOrderStats(filteredOrders);

            console.log(`[Orders] ✅ 渲染完成，显示 ${filteredOrders.length} 个订单`);
        } catch (error) {
            console.error('[Orders] ❌ 渲染失败:', error);
            showError('订单看板渲染失败');
        }
    }

    /**
     * 过滤和排序订单
     * @returns {Array} 处理后的订单数组
     */
    function filterAndSortOrders() {
        let result = [...state.orders];

        // 状态过滤
        if (state.filterStatus !== 'all') {
            result = result.filter(order => order.kanbanStatus === state.filterStatus);
        }

        // 搜索过滤
        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            result = result.filter(order => 
                order.customer.toLowerCase().includes(query) ||
                order.product.toLowerCase().includes(query) ||
                order.notes.toLowerCase().includes(query) ||
                order.id.toLowerCase().includes(query)
            );
        }

        // 排序
        result.sort((a, b) => {
            if (state.sortBy === 'amount') {
                return state.sortDirection === 'asc' 
                    ? a.totalAmount - b.totalAmount 
                    : b.totalAmount - a.totalAmount;
            } else {
                return state.sortDirection === 'asc' 
                    ? new Date(a[state.sortBy]) - new Date(b[state.sortBy]) 
                    : new Date(b[state.sortBy]) - new Date(a[state.sortBy]);
            }
        });

        return result;
    }

    /**
     * 创建看板列
     * @param {string} stage - 阶段名称
     * @param {Array} orders - 该阶段的订单
     * @returns {HTMLElement} 看板列元素
     */
    function createStageColumn(stage, orders) {
        const column = document.createElement('div');
        column.className = 'kanban-column bg-gray-800 border border-gray-700 rounded-lg p-4 flex-1 min-w-[300px] max-w-[400px]';
        
        // 阶段标题
        const header = document.createElement('div');
        header.className = 'flex justify-between items-center mb-4 pb-2 border-b border-gray-700';
        
        const title = document.createElement('h3');
        title.className = 'text-lg font-bold text-white';
        title.textContent = `${getStageDisplayName(stage)} (${orders.length})`;
        
        const countBadge = document.createElement('span');
        countBadge.className = `px-2 py-1 rounded-full text-xs font-bold ${getStageBadgeClass(stage)}`;
        countBadge.textContent = orders.length;
        
        header.appendChild(title);
        header.appendChild(countBadge);
        column.appendChild(header);
        
        // 订单列表
        const orderList = document.createElement('div');
        orderList.className = 'space-y-3 min-h-[500px]';
        
        if (orders.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'text-center py-8 text-gray-500';
            emptyState.innerHTML = `
                <div class="text-4xl mb-2">📭</div>
                <div class="text-sm">暂无订单</div>
            `;
            orderList.appendChild(emptyState);
        } else {
            orders.forEach(order => {
                const orderCard = createOrderCard(order);
                orderList.appendChild(orderCard);
            });
        }
        
        column.appendChild(orderList);
        
        return column;
    }

    /**
     * 创建订单卡片
     * @param {Object} order - 订单数据
     * @returns {HTMLElement} 订单卡片元素
     */
    function createOrderCard(order) {
        const card = document.createElement('div');
        card.className = 'order-card bg-dark border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-all cursor-move';
        card.dataset.orderId = order.id;
        
        // 订单信息
        const infoDiv = document.createElement('div');
        infoDiv.className = 'mb-3';
        
        const idSpan = document.createElement('span');
        idSpan.className = 'text-xs text-gray-400 block mb-1';
        idSpan.textContent = `订单 #${order.id}`;
        
        const customerDiv = document.createElement('div');
        customerDiv.className = 'font-bold text-white mb-1';
        customerDiv.textContent = order.customer || '未知客户';
        
        const productDiv = document.createElement('div');
        productDiv.className = 'text-sm text-gray-300 mb-2';
        productDiv.textContent = order.product || '未指定产品';
        
        infoDiv.appendChild(idSpan);
        infoDiv.appendChild(customerDiv);
        infoDiv.appendChild(productDiv);
        
        // 金额信息
        const amountDiv = document.createElement('div');
        amountDiv.className = 'flex justify-between items-center mb-3 pb-3 border-b border-gray-700';
        
        const totalAmount = document.createElement('div');
        totalAmount.className = 'text-lg font-bold text-white';
        totalAmount.textContent = `¥${window.WorkbenchUtils?.formatNumber(order.totalAmount) || order.totalAmount}`;
        
        const quantity = document.createElement('span');
        quantity.className = 'text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded';
        quantity.textContent = `×${order.quantity}`;
        
        amountDiv.appendChild(totalAmount);
        amountDiv.appendChild(quantity);
        
        // 操作按钮
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'flex justify-between items-center';
        
        const moveBtn = document.createElement('button');
        moveBtn.className = 'text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors';
        moveBtn.textContent = '移至下一步';
        moveBtn.addEventListener('click', () => moveOrderToNextStage(order.id));
        
        // 禁用最后阶段的移动按钮
        const currentIndex = CONFIG.KANBAN_STAGES.indexOf(order.kanbanStatus);
        if (currentIndex >= CONFIG.KANBAN_STAGES.length - 1) {
            moveBtn.disabled = true;
            moveBtn.className = 'text-xs bg-gray-600 text-gray-400 px-3 py-1 rounded cursor-not-allowed';
            moveBtn.textContent = '已完成';
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors';
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', () => deleteOrder(order.id));
        
        actionsDiv.appendChild(moveBtn);
        actionsDiv.appendChild(deleteBtn);
        
        // 组装卡片
        card.appendChild(infoDiv);
        card.appendChild(amountDiv);
        card.appendChild(actionsDiv);
        
        // 添加拖放功能
        setupDragAndDrop(card);
        
        return card;
    }

    /**
     * 设置拖放功能
     * @param {HTMLElement} card - 订单卡片元素
     */
    function setupDragAndDrop(card) {
        card.draggable = true;
        
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', card.dataset.orderId);
            card.classList.add('opacity-50');
        });
        
        card.addEventListener('dragend', () => {
            card.classList.remove('opacity-50');
        });
        
        // 为列添加拖放区域
        const columns = document.querySelectorAll('.kanban-column');
        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
                column.classList.add('bg-gray-700');
            });
            
            column.addEventListener('dragleave', () => {
                column.classList.remove('bg-gray-700');
            });
            
            column.addEventListener('drop', (e) => {
                e.preventDefault();
                column.classList.remove('bg-gray-700');
                
                const orderId = e.dataTransfer.getData('text/plain');
                const stage = column.querySelector('h3').textContent.split(' ')[0];
                
                if (orderId && stage) {
                    moveOrderToStage(orderId, stage);
                }
            });
        });
    }

    /**
     * 移动订单到下一阶段
     * @param {string} orderId - 订单ID
     */
    async function moveOrderToNextStage(orderId) {
        if (state.isProcessing) return;
        
        try {
            state.isProcessing = true;
            
            const order = state.orders.find(o => o.id === orderId);
            if (!order) {
                throw new Error('未找到订单');
            }
            
            const currentIndex = CONFIG.KANBAN_STAGES.indexOf(order.kanbanStatus);
            if (currentIndex >= CONFIG.KANBAN_STAGES.length - 1) {
                showInfo('已经是最终阶段（已付款）');
                return;
            }
            
            const nextStage = CONFIG.KANBAN_STAGES[currentIndex + 1];
            await updateOrderStage(orderId, nextStage);
            
            // 现金流检查
            if (nextStage === 'Paid' && window.WorkbenchDashboard && typeof window.WorkbenchDashboard.checkCashRedLine === 'function') {
                window.WorkbenchDashboard.checkCashRedLine();
            }
            
            showSuccess(`订单已移至: ${getStageDisplayName(nextStage)}`);
        } catch (error) {
            console.error('[Orders] ❌ 移动订单失败:', error);
            showError(`操作失败: ${error.message}`);
        } finally {
            state.isProcessing = false;
        }
    }

    /**
     * 移动订单到指定阶段
     * @param {string} orderId - 订单ID
     * @param {string} stage - 目标阶段
     */
    async function moveOrderToStage(orderId, stage) {
        if (state.isProcessing || !CONFIG.KANBAN_STAGES.includes(stage)) return;
        
        try {
            state.isProcessing = true;
            
            await updateOrderStage(orderId, stage);
            showSuccess(`订单已移至: ${getStageDisplayName(stage)}`);
        } catch (error) {
            console.error('[Orders] ❌ 移动订单失败:', error);
            showError(`操作失败: ${error.message}`);
        } finally {
            state.isProcessing = false;
        }
    }

    /**
     * 更新订单阶段
     * @param {string} orderId - 订单ID
     * @param {string} stage - 目标阶段
     */
    async function updateOrderStage(orderId, stage) {
        const order = state.orders.find(o => o.id === orderId);
        if (!order) {
            throw new Error('未找到订单');
        }
        
        // 更新订单状态
        order.kanbanStatus = stage;
        order.status = stage;
        order.updatedAt = new Date().toISOString();
        
        // 设置阶段日期
        if (stage === 'Shipped' && !order.shippedDate) {
            order.shippedDate = new Date().toISOString();
        } else if (stage === 'Paid' && !order.paidDate) {
            order.paidDate = new Date().toISOString();
        }
        
        // 保存更新
        await saveOrdersData();
        
        // 重新渲染
        render();
    }

    /**
     * 删除订单
     * @param {string} orderId - 订单ID
     */
    async function deleteOrder(orderId) {
        if (state.isProcessing) return;
        
        // 安全确认
        if (!confirm('⚠️ 警告！\n\n确定删除此订单吗？\n此操作不可撤销！')) {
            return;
        }
        
        try {
            state.isProcessing = true;
            
            const initialCount = state.orders.length;
            state.orders = state.orders.filter(o => o.id !== orderId);
            
            if (state.orders.length === initialCount) {
                throw new Error('订单删除失败，未找到对应订单');
            }
            
            // 保存更新
            await saveOrdersData();
            
            // 重新渲染
            render();
            
            showSuccess('🗑️ 订单已成功删除');
        } catch (error) {
            console.error('[Orders] ❌ 删除订单失败:', error);
            showError(`删除失败: ${error.message}`);
        } finally {
            state.isProcessing = false;
        }
    }

    /**
     * 添加新订单
     * @param {Object} orderData - 订单数据
     * @returns {Promise<Object>} 添加的订单
     */
    async function addOrder(orderData) {
        if (state.isProcessing) return null;
        
        try {
            state.isProcessing = true;
            
            // 验证订单数据
            validateOrderData(orderData);
            
            // 创建新订单
            const newOrder = normalizeOrderData({
                ...orderData,
                id: generateOrderId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            
            // 添加到订单列表
            state.orders.unshift(newOrder);
            
            // 保存数据
            await saveOrdersData();
            
            // 重新渲染
            render();
            
            showSuccess(`✅ 订单 #${newOrder.id} 已创建`);
            
            return newOrder;
        } catch (error) {
            console.error('[Orders] ❌ 添加订单失败:', error);
            showError(`创建失败: ${error.message}`);
            return null;
        } finally {
            state.isProcessing = false;
        }
    }

    /**
     * 更新订单
     * @param {string} orderId - 订单ID
     * @param {Object} updates - 更新数据
     * @returns {Promise<Object|null>} 更新后的订单
     */
    async function updateOrder(orderId, updates) {
        if (state.isProcessing) return null;
        
        try {
            state.isProcessing = true;
            
            const order = state.orders.find(o => o.id === orderId);
            if (!order) {
                throw new Error('未找到订单');
            }
            
            // 更新订单数据
            const updatedOrder = normalizeOrderData({
                ...order,
                ...updates,
                updatedAt: new Date().toISOString()
            });
            
            // 替换订单
            const index = state.orders.findIndex(o => o.id === orderId);
            state.orders[index] = updatedOrder;
            
            // 保存数据
            await saveOrdersData();
            
            // 重新渲染
            render();
            
            showSuccess(`✅ 订单 #${orderId} 已更新`);
            
            return updatedOrder;
        } catch (error) {
            console.error('[Orders] ❌ 更新订单失败:', error);
            showError(`更新失败: ${error.message}`);
            return null;
        } finally {
            state.isProcessing = false;
        }
    }

    /**
     * 验证订单数据
     * @param {Object} orderData - 订单数据
     * @throws {Error} 验证失败时抛出错误
     */
    function validateOrderData(orderData) {
        if (!orderData.customer || orderData.customer.trim() === '') {
            throw new Error('客户名称不能为空');
        }
        
        if (!orderData.product || orderData.product.trim() === '') {
            throw new Error('产品名称不能为空');
        }
        
        if (!orderData.amount || orderData.amount <= 0) {
            throw new Error('订单金额必须大于0');
        }
        
        if (!orderData.quantity || orderData.quantity <= 0) {
            throw new Error('数量必须大于0');
        }
    }

    /**
     * 生成订单ID
     * @returns {string} 唯一订单ID
     */
    function generateOrderId() {
        const date = new Date();
        const year = date.getFullYear().toString().substr(2, 2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        return `ORD${year}${month}${day}${random}`;
    }

    /**
     * 打开快速添加模态框
     */
    function openQuickAddModal() {
        // 实现快速添加模态框逻辑
        showInfo("✨ 快速添加功能开发中，敬请期待");
    }

    /**
     * 处理表单提交
     * @param {Event} e - 事件对象
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        const orderData = {
            customer: formData.get('customer'),
            product: formData.get('product'),
            amount: parseFloat(formData.get('amount')),
            quantity: parseInt(formData.get('quantity')),
            notes: formData.get('notes')
        };
        
        addOrder(orderData);
        form.reset();
    }

    /**
     * 更新订单统计信息
     * @param {Array} orders - 订单数组
     */
    function updateOrderStats(orders) {
        const stats = calculateOrderStats(orders);
        
        // 更新统计面板
        const statsElement = document.getElementById('order-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <div class="text-sm text-gray-400 mb-1">总订单数</div>
                        <div class="text-2xl font-bold text-white">${stats.totalOrders}</div>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <div class="text-sm text-gray-400 mb-1">总金额</div>
                        <div class="text-2xl font-bold text-white">¥${window.WorkbenchUtils?.formatNumber(stats.totalAmount) || stats.totalAmount}</div>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <div class="text-sm text-gray-400 mb-1">已付款</div>
                        <div class="text-2xl font-bold text-green-400">${stats.paidPercentage}%</div>
                    </div>
                    <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <div class="text-sm text-gray-400 mb-1">平均金额</div>
                        <div class="text-2xl font-bold text-white">¥${window.WorkbenchUtils?.formatNumber(stats.averageAmount) || stats.averageAmount}</div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * 计算订单统计
     * @param {Array} orders - 订单数组
     * @returns {Object} 统计数据
     */
    function calculateOrderStats(orders) {
        const totalOrders = orders.length;
        const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const paidOrders = orders.filter(order => order.kanbanStatus === 'Paid').length;
        const paidPercentage = totalOrders > 0 ? Math.round((paidOrders / totalOrders) * 100) : 0;
        const averageAmount = totalOrders > 0 ? totalAmount / totalOrders : 0;
        
        return {
            totalOrders,
            totalAmount: parseFloat(totalAmount.toFixed(CONFIG.DECIMAL_PRECISION)),
            paidOrders,
            paidPercentage,
            averageAmount: parseFloat(averageAmount.toFixed(CONFIG.DECIMAL_PRECISION))
        };
    }

    /**
     * 获取阶段显示名称
     * @param {string} stage - 阶段名称
     * @returns {string} 显示名称
     */
    function getStageDisplayName(stage) {
        const stageNames = {
            'New': '新订单',
            'Processing': '处理中',
            'Shipped': '已发货',
            'Paid': '已付款'
        };
        return stageNames[stage] || stage;
    }

    /**
     * 获取阶段徽章样式
     * @param {string} stage - 阶段名称
     * @returns {string} CSS类名
     */
    function getStageBadgeClass(stage) {
        const badgeClasses = {
            'New': 'bg-blue-600',
            'Processing': 'bg-yellow-600',
            'Shipped': 'bg-purple-600',
            'Paid': 'bg-green-600'
        };
        return badgeClasses[stage] || 'bg-gray-600';
    }

    /**
     * 防抖函数
     * @param {Function} func - 函数
     * @param {number} wait - 等待时间
     * @returns {Function} 防抖函数
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
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
     * 显示信息消息
     * @param {string} message - 消息内容
     */
    function showInfo(message) {
        if (window.WorkbenchUtils && typeof window.WorkbenchUtils.toast === 'function') {
            window.WorkbenchUtils.toast(message, 'info');
        } else {
            alert(message);
        }
    }

    // 公共API
    const api = {
        // 初始化
        init,
        
        // 订单管理
        addOrder,
        updateOrder,
        deleteOrder,
        moveOrderToNextStage,
        moveOrderToStage,
        
        // 数据操作
        getOrders: () => [...state.orders],
        getOrderById: (id) => state.orders.find(o => o.id === id) || null,
        calculateOrderStats,
        
        // UI操作
        render,
        openQuickAddModal,
        
        // 状态管理
        getStatus: () => ({
            orderCount: state.orders.length,
            isInitialized: state.isInitialized,
            isProcessing: state.isProcessing
        }),
        
        // 常量
        CONFIG
    };

    // 自动初始化
    document.addEventListener('DOMContentLoaded', async () => {
        window.WorkbenchOrders = api;
        await api.init();
        console.log('✅ [Orders] V14.2 PRO 模块已加载并初始化');
    });

    return api;
})();

// 兼容旧版API
window.WorkbenchOrders = WorkbenchOrders;

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchOrders;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchOrders);
}