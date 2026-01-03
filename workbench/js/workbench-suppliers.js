/**
 * 供应商模块 - 完整优化版
 * 包含模态框操作、表单处理、错误捕获、依赖兜底
 */
class WorkbenchSuppliers {
    constructor() {
        // 初始化模块状态
        this.modal = null;
        this.suppliers = JSON.parse(localStorage.getItem('workbench_suppliers')) || [];
        // 全局工具类兜底
        this.utils = window.WorkbenchUtils || {
            toast: (msg, type) => console.log(`[Toast] ${type}: ${msg}`),
            showError: (msg) => console.error(`[Error] ${msg}`)
        };
    }

    /**
     * 初始化供应商模块
     * @returns {WorkbenchSuppliers|null} 模块实例（失败返回null）
     */
    init() {
        try {
            console.log('[Suppliers] 🚀 初始化供应商模块...');
            
            // 校验核心方法完整性
            const requiredMethods = ['openModal', 'closeModal', 'setupEventListeners', 'renderSuppliers'];
            const missingMethods = requiredMethods.filter(method => typeof this[method] !== 'function');
            if (missingMethods.length > 0) {
                throw new Error(`缺失核心方法：${missingMethods.join(', ')}`);
            }

            // 初始化DOM和事件
            this.renderSuppliers();
            this.setupEventListeners();
            
            console.log('[Suppliers] ✅ 模块初始化成功');
            return this;
        } catch (error) {
            console.error('[Suppliers] ❌ 初始化失败:', error);
            this.utils.toast(`供应商模块初始化失败：${error.message}`, 'error');
            return null;
        }
    }

    /**
     * 打开添加供应商模态框
     */
    openAddModal() {
        console.log('[Suppliers] 📝 打开添加供应商模态框...');
        
        try {
            this.openModal({
                title: '添加新供应商',
                content: `
                    <form id="supplier-add-form" class="space-y-4">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-300">供应商名称 <span class="text-red-500">*</span></label>
                            <input type="text" id="supplier-name" class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   placeholder="请输入供应商名称" required>
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-300">联系人</label>
                            <input type="text" id="supplier-contact" class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   placeholder="请输入联系人姓名">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-300">主营产品</label>
                            <input type="text" id="supplier-product" class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   placeholder="请输入主营产品">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-300">地址</label>
                            <input type="text" id="supplier-address" class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   placeholder="请输入地址">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-300">证书 (如: CE, ISO, FDA)</label>
                            <input type="text" id="supplier-certs" class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   placeholder="请输入证书信息">
                        </div>
                    </form>
                `,
                buttons: [
                    {
                        text: '取消',
                        onClick: () => this.closeModal(),
                        className: 'bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded'
                    },
                    {
                        text: '保存',
                        onClick: () => this.handleAddSubmit(),
                        isPrimary: true,
                        className: 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
                    }
                ]
            });
            
            // 聚焦第一个输入框（兼容DOM渲染延迟）
            setTimeout(() => {
                const nameInput = document.getElementById('supplier-name');
                if (nameInput) {
                    nameInput.focus();
                } else {
                    throw new Error('供应商名称输入框未找到');
                }
            }, 100);
            
        } catch (error) {
            this.showError('打开添加模态框失败', error);
        }
    }

    /**
     * 打开通用模态框（核心方法）
     * @param {Object} options - 模态框配置
     */
    openModal(options) {
        // 关闭已有模态框
        this.closeModal();

        // 创建模态框DOM
        this.modal = document.createElement('div');
        this.modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        this.modal.innerHTML = `
            <div class="bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-white">${options.title || '操作面板'}</h3>
                    <button class="text-gray-400 hover:text-white" id="modal-close-btn">×</button>
                </div>
                <div class="modal-content">${options.content || ''}</div>
                <div class="flex justify-end space-x-3 mt-6">
                    ${options.buttons?.map(btn => `
                        <button class="${btn.className || (btn.isPrimary ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-700')} text-white px-4 py-2 rounded" data-action="${btn.text}">
                            ${btn.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // 挂载到页面
        document.body.appendChild(this.modal);

        // 绑定按钮事件
        options.buttons?.forEach(btn => {
            const btnEl = this.modal.querySelector(`[data-action="${btn.text}"]`);
            if (btnEl) {
                btnEl.addEventListener('click', btn.onClick);
            }
        });

        // 绑定关闭按钮事件
        const closeBtn = this.modal.querySelector('#modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
    }

    /**
     * 关闭模态框
     */
    closeModal() {
        if (this.modal) {
            document.body.removeChild(this.modal);
            this.modal = null;
        }
    }

    /**
     * 处理添加供应商提交
     */
    handleAddSubmit() {
        try {
            // 获取表单数据
            const name = document.getElementById('supplier-name')?.value?.trim();
            const contact = document.getElementById('supplier-contact')?.value?.trim() || '';
            const product = document.getElementById('supplier-product')?.value?.trim() || '';
            const address = document.getElementById('supplier-address')?.value?.trim() || '';
            const certs = document.getElementById('supplier-certs')?.value?.trim() || '';

            // 校验必填项
            if (!name) {
                throw new Error('供应商名称不能为空');
            }

            // 构建供应商数据
            const supplier = {
                id: `supp_${Date.now()}`,
                name,
                contact,
                product,
                address,
                certs,
                createTime: new Date().toISOString(),
                updateTime: new Date().toISOString()
            };

            // 保存数据
            this.suppliers.push(supplier);
            localStorage.setItem('workbench_suppliers', JSON.stringify(this.suppliers));

            // 反馈+刷新列表+关闭模态框
            this.utils.toast('供应商添加成功', 'success');
            this.renderSuppliers();
            this.closeModal();

        } catch (error) {
            this.showError('添加供应商失败', error);
        }
    }

    /**
     * 渲染供应商列表（占位实现，可根据实际DOM结构调整）
     */
    renderSuppliers() {
        const container = document.getElementById('suppliers-list');
        if (!container) {
            console.warn('[Suppliers] 供应商列表容器未找到');
            return;
        }

        // 空数据处理
        if (this.suppliers.length === 0) {
            container.innerHTML = '<div class="text-gray-400 text-center py-8">暂无供应商数据</div>';
            return;
        }

        // 渲染列表项
        container.innerHTML = this.suppliers.map(supplier => `
            <div class="bg-gray-800 rounded p-4 mb-3" data-id="${supplier.id}">
                <h4 class="text-white font-medium">${supplier.name}</h4>
                <p class="text-gray-400 text-sm mt-1">联系人：${supplier.contact || '无'}</p>
                <p class="text-gray-400 text-sm">主营产品：${supplier.product || '无'}</p>
                <p class="text-gray-400 text-sm">证书：${supplier.certs || '无'}</p>
            </div>
        `).join('');
    }

    /**
     * 绑定全局事件（如添加按钮点击）
     */
    setupEventListeners() {
        const addBtn = document.getElementById('add-supplier-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.openAddModal());
        } else {
            console.warn('[Suppliers] 添加供应商按钮未找到');
        }
    }

    /**
     * 错误提示统一处理
     * @param {string} msg - 错误提示文本
     * @param {Error} error - 错误对象
     */
    showError(msg, error) {
        console.error(`[Suppliers] ${msg}:`, error);
        this.utils.toast(`${msg}：${error.message}`, 'error');
    }
}

// 实例化并挂载到全局，供外部调用
window.WorkbenchSuppliers = new WorkbenchSuppliers();
// 页面加载完成后自动初始化
document.addEventListener('DOMContentLoaded', () => {
    window.WorkbenchSuppliers.init();
});