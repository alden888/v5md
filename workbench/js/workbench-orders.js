/**
 * V5 Medical Workbench - Orders Module
 * 订单管理与 PI 生成系统
 * @version 2.0.0
 */

class WorkbenchOrders {
    constructor() {
        this.config = window.WorkbenchConfig;
        this.storage = window.V5Workbench?.storage;
        this.currentCart = [];
        this.currentPINumber = '';
    }

    /**
     * 初始化订单模块
     */
    async init() {
        this.generatePINumber();
        await this.render();
        this.bindEvents();
    }

    /**
     * 渲染订单管理界面
     */
    async render() {
        const container = document.getElementById('workbench-content');
        if (!container) return;

        const orders = await this.storage.getOrders();

        container.innerHTML = `
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-slate-800 mb-2">订单与 PI 生成</h2>
                <p class="text-sm text-slate-500">Mini ERP System - 创建专业 Proforma Invoice</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- 左侧: 创建订单表单 -->
                <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                        <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
                            <i class="fas fa-cart-plus text-blue-600"></i> 创建新订单
                        </h3>
                        <div class="text-xs text-slate-500">
                            PI No: <span id="current-pi-no" class="font-mono font-bold text-blue-600">${this.currentPINumber}</span>
                        </div>
                    </div>

                    <!-- 客户信息 -->
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">客户名称 *</label>
                            <input type="text" id="pi-customer" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm" placeholder="例如: MedTurk Ltd.">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">贸易条款</label>
                            <select id="pi-term" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm">
                                ${this.config.WORKBENCH.ORDER.TERMS.map(term => 
                                    `<option value="${term}" ${term === this.config.WORKBENCH.ORDER.DEFAULT_TERM ? 'selected' : ''}>${term}</option>`
                                ).join('')}
                            </select>
                        </div>
                    </div>

                    <!-- 产品选择 -->
                    <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                        <div class="grid grid-cols-12 gap-3 mb-3">
                            <div class="col-span-12 md:col-span-6">
                                <label class="block text-xs font-bold text-slate-600 mb-1.5">选择产品 SKU</label>
                                <select id="pi-product-select" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" onchange="window.V5Workbench.orders.updateUnitPrice()">
                                    <option value="">-- 请选择产品 --</option>
                                    ${this.config.WORKBENCH.PRODUCTS.map(p => 
                                        `<option value="${p.sku}" data-price="${p.price}" data-name="${p.name}">${p.sku} - ${p.name}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="col-span-6 md:col-span-3">
                                <label class="block text-xs font-bold text-slate-600 mb-1.5">单价 (USD)</label>
                                <input type="number" id="pi-price" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="0.00" step="0.01">
                            </div>
                            <div class="col-span-6 md:col-span-3">
                                <label class="block text-xs font-bold text-slate-600 mb-1.5">数量</label>
                                <input type="number" id="pi-qty" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="Qty" min="1">
                            </div>
                        </div>
                        <button onclick="window.V5Workbench.orders.addToCart()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-2">
                            <i class="fas fa-plus-circle"></i> 添加到订单列表
                        </button>
                    </div>

                    <!-- 购物车 -->
                    <div class="border border-slate-200 rounded-xl overflow-hidden mb-4">
                        <table class="w-full text-sm">
                            <thead class="bg-slate-50 text-xs text-slate-500 uppercase">
                                <tr>
                                    <th class="px-4 py-3 text-left">产品名称</th>
                                    <th class="px-4 py-3 text-right">单价</th>
                                    <th class="px-4 py-3 text-right">数量</th>
                                    <th class="px-4 py-3 text-right">小计</th>
                                    <th class="px-4 py-3 text-center w-16">操作</th>
                                </tr>
                            </thead>
                            <tbody id="pi-cart-body" class="divide-y divide-slate-100 bg-white">
                                <tr id="cart-empty">
                                    <td colspan="5" class="px-4 py-8 text-center text-slate-400 text-xs">
                                        暂无产品，请使用上方表单添加
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="bg-slate-50 font-bold text-slate-800">
                                <tr>
                                    <td colspan="3" class="px-4 py-3 text-right">Total Amount (USD):</td>
                                    <td class="px-4 py-3 text-right text-blue-600 text-lg" id="pi-total">$0.00</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <!-- 操作按钮 -->
                    <div class="flex gap-3">
                        <button onclick="window.V5Workbench.orders.saveOrder()" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition shadow-md flex items-center justify-center gap-2">
                            <i class="fas fa-save"></i> 保存订单
                        </button>
                        <button onclick="window.V5Workbench.orders.printPI()" class="flex-1 bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
                            <i class="fas fa-print"></i> 打印预览
                        </button>
                        <button onclick="window.V5Workbench.orders.clearCart()" class="bg-red-100 hover:bg-red-200 text-red-600 font-bold px-4 py-3 rounded-lg transition">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>

                <!-- 右侧: 订单历史 -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                        <h3 class="font-bold text-slate-800 flex items-center gap-2">
                            <i class="fas fa-history"></i> 订单历史
                        </h3>
                        <button onclick="window.V5Workbench.orders.clearAllOrders()" class="text-xs text-red-400 hover:text-red-600 transition">
                            <i class="fas fa-trash mr-1"></i> 清空
                        </button>
                    </div>
                    
                    <div class="text-xs text-slate-400 mb-4 flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg p-2">
                        <i class="fas fa-info-circle text-green-600"></i>
                        <span>标记为 <strong class="text-green-700">Paid</strong> 后将计入业绩</span>
                    </div>

                    <div id="order-list" class="space-y-3 max-h-[600px] overflow-y-auto">
                        ${this.renderOrderList(orders)}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染订单列表
     */
    renderOrderList(orders) {
        if (!orders || orders.length === 0) {
            return '<div class="text-center py-8 text-slate-400 text-xs">暂无订单记录</div>';
        }

        return orders.map(order => `
            <div class="p-4 rounded-lg border-l-4 ${order.status === 'Paid' ? 'border-green-500 bg-green-50/50' : 'border-amber-400 bg-amber-50/50'} hover:shadow-md transition group">
                <div class="flex items-start justify-between mb-2">
                    <div class="font-mono text-xs font-bold text-slate-700">${order.id}</div>
                    <div class="text-[10px] text-slate-400">${new Date(order.date).toLocaleDateString('zh-CN')}</div>
                </div>
                <div class="font-bold text-sm text-slate-800 mb-1">${order.customer}</div>
                <div class="flex items-center justify-between">
                    <div class="text-lg font-black text-blue-600">$${order.total.toFixed(2)}</div>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${order.status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-amber-200 text-amber-800'}">
                            ${order.status}
                        </span>
                        <button onclick="window.V5Workbench.orders.toggleStatus('${order.id}')" class="opacity-0 group-hover:opacity-100 text-xs text-blue-600 hover:underline transition">
                            ${order.status === 'Paid' ? '撤销' : '确认'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * 生成 PI 编号
     */
    generatePINumber() {
        this.currentPINumber = this.config.generatePINumber();
        const el = document.getElementById('current-pi-no');
        if (el) el.textContent = this.currentPINumber;
    }

    /**
     * 更新单价 (根据选择的产品)
     */
    updateUnitPrice() {
        const select = document.getElementById('pi-product-select');
        const priceInput = document.getElementById('pi-price');
        
        if (select.value) {
            const price = select.options[select.selectedIndex].dataset.price;
            priceInput.value = price || '';
        }
    }

    /**
     * 添加到购物车
     */
    addToCart() {
        const select = document.getElementById('pi-product-select');
        const priceInput = document.getElementById('pi-price');
        const qtyInput = document.getElementById('pi-qty');

        if (!select.value) {
            window.WorkbenchUtils.toast.error('请选择产品');
            return;
        }

        const qty = parseInt(qtyInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;

        if (qty <= 0) {
            window.WorkbenchUtils.toast.error('请输入有效数量');
            return;
        }

        if (price <= 0) {
            window.WorkbenchUtils.toast.error('请输入有效单价');
            return;
        }

        const item = {
            sku: select.value,
            name: select.options[select.selectedIndex].dataset.name,
            price: price,
            qty: qty,
            total: price * qty
        };

        this.currentCart.push(item);
        this.renderCart();
        
        // 清空输入
        qtyInput.value = '';
        priceInput.value = '';
        select.value = '';
        
        window.WorkbenchUtils.toast.success('已添加到订单');
    }

    /**
     * 渲染购物车
     */
    renderCart() {
        const tbody = document.getElementById('pi-cart-body');
        if (!tbody) return;

        if (this.currentCart.length === 0) {
            tbody.innerHTML = `
                <tr id="cart-empty">
                    <td colspan="5" class="px-4 py-8 text-center text-slate-400 text-xs">
                        暂无产品，请使用上方表单添加
                    </td>
                </tr>
            `;
            document.getElementById('pi-total').textContent = '$0.00';
            return;
        }

        let total = 0;
        tbody.innerHTML = this.currentCart.map((item, index) => {
            total += item.total;
            return `
                <tr class="hover:bg-slate-50 transition">
                    <td class="px-4 py-3 font-medium text-slate-800">${item.name}</td>
                    <td class="px-4 py-3 text-right">$${item.price.toFixed(2)}</td>
                    <td class="px-4 py-3 text-right">${item.qty}</td>
                    <td class="px-4 py-3 text-right font-bold">$${item.total.toFixed(2)}</td>
                    <td class="px-4 py-3 text-center">
                        <button onclick="window.V5Workbench.orders.removeFromCart(${index})" class="text-red-400 hover:text-red-600 transition">
                            <i class="fas fa-times"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        document.getElementById('pi-total').textContent = '$' + total.toFixed(2);
    }

    /**
     * 从购物车移除
     */
    removeFromCart(index) {
        this.currentCart.splice(index, 1);
        this.renderCart();
        window.WorkbenchUtils.toast.info('已移除');
    }

    /**
     * 清空购物车
     */
    clearCart() {
        if (this.currentCart.length === 0) return;
        
        if (confirm('确定清空购物车？')) {
            this.currentCart = [];
            this.renderCart();
            window.WorkbenchUtils.toast.info('购物车已清空');
        }
    }

    /**
     * 保存订单
     */
    async saveOrder() {
        const customerInput = document.getElementById('pi-customer');
        const termSelect = document.getElementById('pi-term');

        if (this.currentCart.length === 0) {
            window.WorkbenchUtils.toast.error('购物车为空，请先添加产品');
            return;
        }

        if (!customerInput.value.trim()) {
            window.WorkbenchUtils.toast.error('请输入客户名称');
            customerInput.focus();
            return;
        }

        const total = parseFloat(document.getElementById('pi-total').textContent.replace('$', ''));

        const order = {
            id: this.currentPINumber,
            customer: customerInput.value.trim(),
            term: termSelect.value,
            date: new Date().toISOString(),
            total: total,
            status: 'Pending',
            items: [...this.currentCart]
        };

        try {
            await this.storage.saveOrder(order);
            
            window.WorkbenchUtils.toast.success('订单已保存！');
            
            // 重置表单
            this.currentCart = [];
            this.generatePINumber();
            customerInput.value = '';
            
            // 重新渲染
            await this.render();
            
        } catch (error) {
            window.WorkbenchUtils.toast.error('保存失败: ' + error.message);
        }
    }

    /**
     * 切换订单状态
     */
    async toggleStatus(orderId) {
        const orders = await this.storage.getOrders();
        const order = orders.find(o => o.id === orderId);
        
        if (!order) return;

        const newStatus = order.status === 'Paid' ? 'Pending' : 'Paid';
        
        try {
            await this.storage.updateOrderStatus(orderId, newStatus);
            await this.render();
            
            if (newStatus === 'Paid') {
                window.WorkbenchUtils.toast.success('🎉 已确认回款，业绩已更新！');
            } else {
                window.WorkbenchUtils.toast.info('已撤销回款状态');
            }
            
        } catch (error) {
            window.WorkbenchUtils.toast.error('状态更新失败');
        }
    }

    /**
     * 清空所有订单
     */
    async clearAllOrders() {
        if (!confirm('⚠️ 确定清空所有订单记录？\n此操作不可恢复！')) {
            return;
        }

        try {
            await this.storage.saveToCloud('orders', []);
            await this.render();
            window.WorkbenchUtils.toast.success('订单记录已清空');
        } catch (error) {
            window.WorkbenchUtils.toast.error('清空失败');
        }
    }

    /**
     * 打印 PI (模拟)
     */
    printPI() {
        if (this.currentCart.length === 0) {
            window.WorkbenchUtils.toast.error('购物车为空');
            return;
        }

        const customer = document.getElementById('pi-customer').value || 'Customer';
        const total = document.getElementById('pi-total').textContent;

        alert(`正在生成 PI PDF:\n\nPI No: ${this.currentPINumber}\n客户: ${customer}\n总额: ${total}\n\n(此处为模拟打印，实际需要后端生成 PDF)`);
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 可以在这里添加全局事件监听
    }
}

window.WorkbenchOrders = WorkbenchOrders;
