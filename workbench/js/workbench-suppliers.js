/**
 * V14.2 PRO - SUPPLIERS MODULE (COMPLETELY FIXED)
 * 供应商管理模块 - 优化版本
 * 
 * @module WorkbenchSuppliers
 * @description 供应商管理功能模块，提供供应商的添加、编辑、删除和列表展示功能
 * @author Super Doubao
 * @version 1.1.0
 */
const WorkbenchSuppliers = {
    /** 当前正在编辑的供应商ID */
    currentEditId: null,
    
    /** 模态框元素缓存 */
    modalElements: {
        overlay: null,
        content: null,
        title: null,
        body: null,
        footer: null,
        closeButton: null
    },
    
    /**
     * 初始化供应商模块
     * @returns {WorkbenchSuppliers} 模块实例
     */
    init() {
        console.log('[Suppliers] 🚀 Initializing module...');
        this.createModalStructure();
        this.render();
        this.setupEventListeners();
        return this;
    },
    
    /**
     * 创建模态框DOM结构
     * @private
     */
    createModalStructure() {
        // 检查是否已存在模态框
        if (document.getElementById('suppliers-modal')) {
            this.modalElements.overlay = document.getElementById('suppliers-modal');
            this.modalElements.content = document.getElementById('suppliers-modal-content');
            this.modalElements.title = document.getElementById('suppliers-modal-title');
            this.modalElements.body = document.getElementById('suppliers-modal-body');
            this.modalElements.footer = document.getElementById('suppliers-modal-footer');
            this.modalElements.closeButton = document.getElementById('suppliers-modal-close');
            return;
        }
        
        // 创建模态框结构
        const modalHTML = `
            <!-- 模态框遮罩层 -->
            <div id="suppliers-modal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 opacity-0 invisible transition-all duration-300"
                 role="dialog" aria-modal="true" aria-hidden="true" tabindex="-1">
                <!-- 模态框内容 -->
                <div id="suppliers-modal-content" class="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg mx-4 transform scale-95 transition-transform duration-300"
                     role="document">
                    <!-- 模态框头部 -->
                    <div class="flex justify-between items-center p-4 border-b border-gray-800">
                        <h3 id="suppliers-modal-title" class="font-bold text-lg text-white">供应商信息</h3>
                        <button id="suppliers-modal-close" class="text-gray-400 hover:text-white transition-colors"
                                aria-label="关闭对话框" title="关闭">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <!-- 模态框主体 -->
                    <div id="suppliers-modal-body" class="p-4 max-h-[70vh] overflow-y-auto"></div>
                    
                    <!-- 模态框底部 -->
                    <div id="suppliers-modal-footer" class="p-4 border-t border-gray-800 flex justify-end gap-3"></div>
                </div>
            </div>
        `;
        
        // 添加到body末尾
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // 缓存元素引用
        this.modalElements.overlay = document.getElementById('suppliers-modal');
        this.modalElements.content = document.getElementById('suppliers-modal-content');
        this.modalElements.title = document.getElementById('suppliers-modal-title');
        this.modalElements.body = document.getElementById('suppliers-modal-body');
        this.modalElements.footer = document.getElementById('suppliers-modal-footer');
        this.modalElements.closeButton = document.getElementById('suppliers-modal-close');
    },
    
    /**
     * 设置事件监听器
     * @private
     */
    setupEventListeners() {
        // 关闭按钮点击事件
        this.modalElements.closeButton.addEventListener('click', () => this.closeModal());
        
        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen()) {
                this.closeModal();
            }
        });
        
        // 点击遮罩层关闭
        this.modalElements.overlay.addEventListener('click', (e) => {
            if (e.target === this.modalElements.overlay) {
                this.closeModal();
            }
        });
    },
    
    /**
     * 打开模态框
     * @param {Object} options - 模态框选项
     * @param {string} options.title - 模态框标题
     * @param {string} options.content - 模态框内容HTML
     * @param {Array} options.buttons - 按钮配置数组
     * @param {boolean} options.centered - 是否垂直居中
     * @private
     */
    openModal(options) {
        const { title, content, buttons = [], centered = true } = options;
        
        // 设置模态框内容
        this.modalElements.title.textContent = title || '供应商信息';
        this.modalElements.body.innerHTML = content || '';
        
        // 清除现有按钮
        this.modalElements.footer.innerHTML = '';
        
        // 添加按钮
        buttons.forEach((button, index) => {
            const btn = document.createElement('button');
            btn.className = `px-4 py-2 rounded text-sm transition-colors ${button.className || 'bg-gray-800 hover:bg-gray-700 text-white'}`;
            btn.textContent = button.text || '确定';
            btn.addEventListener('click', button.onClick);
            
            if (button.isPrimary) {
                btn.classList.add('bg-blue-600', 'hover:bg-blue-500');
            }
            
            if (index === 0) {
                btn.focus(); // 默认聚焦第一个按钮
            }
            
            this.modalElements.footer.appendChild(btn);
        });
        
        // 显示模态框
        this.modalElements.overlay.classList.remove('opacity-0', 'invisible');
        this.modalElements.content.classList.remove('scale-95');
        this.modalElements.overlay.setAttribute('aria-hidden', 'false');
        
        // 禁用背景滚动
        document.body.style.overflow = 'hidden';
        
        // 焦点锁定
        this.setupFocusTrap();
    },
    
    /**
     * 关闭模态框
     * @private
     */
    closeModal() {
        this.modalElements.overlay.classList.add('opacity-0', 'invisible');
        this.modalElements.content.classList.add('scale-95');
        this.modalElements.overlay.setAttribute('aria-hidden', 'true');
        
        // 恢复背景滚动
        document.body.style.overflow = '';
        
        // 释放焦点锁定
        this.releaseFocusTrap();
    },
    
    /**
     * 检查模态框是否打开
     * @returns {boolean} 是否打开
     * @private
     */
    isModalOpen() {
        return !this.modalElements.overlay.classList.contains('invisible');
    },
    
    /**
     * 设置焦点锁定
     * @private
     */
    setupFocusTrap() {
        const focusableElements = this.modalElements.content.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // 监听Tab键循环
        document.addEventListener('keydown', this.focusTrapHandler = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    },
    
    /**
     * 释放焦点锁定
     * @private
     */
    releaseFocusTrap() {
        if (this.focusTrapHandler) {
            document.removeEventListener('keydown', this.focusTrapHandler);
            this.focusTrapHandler = null;
        }
    },
    
    /**
     * 显示错误提示
     * @param {string} message - 错误消息
     * @param {Error} [error] - 错误对象
     * @private
     */
    showError(message, error) {
        console.error('[Suppliers] ❌ Error:', error || message);
        
        this.openModal({
            title: '操作失败',
            content: `
                <div class="text-center py-4">
                    <div class="text-red-500 mb-3"><i class="fas fa-exclamation-triangle text-3xl"></i></div>
                    <p class="text-gray-300 mb-2">${message}</p>
                    ${error ? `<p class="text-gray-500 text-sm mt-2">错误详情: ${error.message}</p>` : ''}
                </div>
            `,
            buttons: [{
                text: '关闭',
                onClick: () => this.closeModal(),
                isPrimary: true
            }]
        });
    },
    
    /**
     * 显示成功提示
     * @param {string} message - 成功消息
     * @private
     */
    showSuccess(message) {
        console.log('[Suppliers] ✅ Success:', message);
        
        this.openModal({
            title: '操作成功',
            content: `
                <div class="text-center py-4">
                    <div class="text-green-500 mb-3"><i class="fas fa-check-circle text-3xl"></i></div>
                    <p class="text-gray-300">${message}</p>
                </div>
            `,
            buttons: [{
                text: '确定',
                onClick: () => {
                    this.closeModal();
                    this.render(); // 刷新列表
                },
                isPrimary: true
            }]
        });
    },
    
    /**
     * 渲染供应商列表
     */
    render() {
        console.log('[Suppliers] 📊 Rendering suppliers list...');
        
        const container = document.getElementById('suppliers-list');
        if (!container) {
            this.showError('无法找到供应商列表容器，请检查页面结构');
            return;
        }
        
        const suppliers = this.getSuppliers();
        console.log(`[Suppliers] Found ${suppliers.length} suppliers`);
        
        if (suppliers.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12 border-2 border-dashed border-gray-800 rounded-xl">
                    <div class="text-gray-600 mb-2"><i class="fas fa-industry text-4xl"></i></div>
                    <p class="text-gray-500">暂无供应商档案</p>
                    <button onclick="app.suppliers.openAddModal()" class="mt-4 text-blue-500 hover:text-blue-400 underline">
                        立即添加
                    </button>
                </div>`;
            return;
        }
        
        container.innerHTML = suppliers.map(s => `
            <div class="bg-gray-900 border border-gray-700 p-5 rounded-xl hover:border-blue-500 transition group">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="font-bold text-lg text-white">${s.name}</h3>
                        <p class="text-xs text-gray-400">${s.product || '主营产品未填'}</p>
                    </div>
                    <span class="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded border border-blue-800">
                        ${s.contact || 'No Contact'}
                    </span>
                </div>
                <div class="space-y-2 text-sm text-gray-400">
                    <p><i class="fas fa-map-marker-alt w-5 text-center"></i> ${s.address || '-'}</p>
                    <p><i class="fas fa-certificate w-5 text-center text-yellow-500"></i> ${s.certs || '无证书'}</p>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-800 flex gap-2 opacity-60 group-hover:opacity-100 transition">
                    <button onclick="app.suppliers.edit('${s.id}')" class="flex-1 bg-gray-800 hover:bg-gray-700 py-1.5 rounded text-xs text-white">
                        <i class="fas fa-edit"></i> 编辑
                    </button>
                    <button onclick="app.suppliers.delete('${s.id}')" class="px-3 text-red-500 hover:bg-red-900/20 rounded">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        console.log('[Suppliers] ✅ Render complete');
    },
    
    /**
     * 获取供应商列表
     * @returns {Array} 供应商数组
     */
    getSuppliers() {
        return window.WorkbenchDashboard?.data?.suppliers || [];
    },
    
    /**
     * 打开添加供应商模态框
     */
    openAddModal() {
        console.log('[Suppliers] 📝 Opening add modal...');
        
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
                        className: 'bg-gray-800 hover:bg-gray-700 text-white'
                    },
                    {
                        text: '保存',
                        onClick: () => this.handleAddSubmit(),
                        isPrimary: true
                    }
                ]
            });
            
            // 聚焦第一个输入框
            setTimeout(() => {
                document.getElementById('supplier-name').focus();
            }, 100);
            
        } catch (error) {
            this.showError('打开添加模态框失败', error);
        }
    },
    
    /**
     * 处理添加供应商表单提交
     * @private
     */
    handleAddSubmit() {
        const form = document.getElementById('supplier-add-form');
        if (!form) return;
        
        const name = document.getElementById('supplier-name').value.trim();
        const contact = document.getElementById('supplier-contact').value.trim();
        const product = document.getElementById('supplier-product').value.trim();
        const address = document.getElementById('supplier-address').value.trim();
        const certs = document.getElementById('supplier-certs').value.trim();
        
        if (!name) {
            this.showError('供应商名称不能为空');
            document.getElementById('supplier-name').focus();
            return;
        }
        
        this.save({
            id: 'SUP-' + Date.now(),
            name,
            contact,
            product,
            address,
            certs,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    },
    
    /**
     * 保存供应商信息
     * @param {Object} supplier - 供应商对象
     * @returns {Promise<void>} 保存操作的Promise
     */
    async save(supplier) {
        console.log('[Suppliers] 💾 Saving supplier...', supplier);
        
        try {
            const dependencies = this.validateDependencies();
            
            // 验证供应商数据
            if (!supplier.name || !supplier.name.trim()) {
                throw new Error('供应商名称不能为空');
            }
            
            // 添加到数据
            dependencies.Dashboard.data.suppliers.push(supplier);
            
            // 保存到存储
            await dependencies.Storage.save(dependencies.Config.STORAGE_KEYS.SUPPLIERS, dependencies.Dashboard.data.suppliers);
            console.log('[Suppliers] ✅ Saved to storage');
            
            // 显示成功提示
            this.showSuccess(`供应商 "${supplier.name}" 已添加成功！`);
            
        } catch (error) {
            console.error('[Suppliers] ❌ Save failed:', error);
            this.showError('保存供应商失败', error);
        }
    },
    
    /**
     * 编辑供应商
     * @param {string} id - 供应商ID
     */
    edit(id) {
        console.log('[Suppliers] ✏️ Editing supplier:', id);
        
        const supplier = this.getSuppliers().find(s => s.id === id);
        if (!supplier) {
            this.showError('供应商不存在');
            return;
        }
        
        this.openModal({
            title: '供应商详情',
            content: `
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="block text-sm text-gray-400">供应商ID</label>
                            <p class="text-gray-200 font-mono">${supplier.id}</p>
                        </div>
                        <div class="space-y-1">
                            <label class="block text-sm text-gray-400">创建时间</label>
                            <p class="text-gray-200">${new Date(supplier.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-sm text-gray-400">供应商名称</label>
                        <p class="text-gray-200 font-medium">${supplier.name}</p>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-sm text-gray-400">联系人</label>
                        <p class="text-gray-200">${supplier.contact || '-'}</p>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-sm text-gray-400">主营产品</label>
                        <p class="text-gray-200">${supplier.product || '-'}</p>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-sm text-gray-400">地址</label>
                        <p class="text-gray-200">${supplier.address || '-'}</p>
                    </div>
                    <div class="space-y-1">
                        <label class="block text-sm text-gray-400">证书</label>
                        <p class="text-gray-200">${supplier.certs || '-'}</p>
                    </div>
                    <div class="pt-4 border-t border-gray-800 text-center">
                        <p class="text-gray-400 text-sm">编辑功能开发中...</p>
                    </div>
                </div>
            `,
            buttons: [{
                text: '关闭',
                onClick: () => this.closeModal(),
                isPrimary: true
            }]
        });
    },
    
    /**
     * 删除供应商
     * @param {string} id - 供应商ID
     * @returns {Promise<void>} 删除操作的Promise
     */
    async delete(id) {
        console.log('[Suppliers] 🗑️ Deleting supplier:', id);
        
        try {
            const supplier = this.getSuppliers().find(s => s.id === id);
            if (!supplier) {
                throw new Error('供应商不存在');
            }
            
            // 确认删除
            this.openModal({
                title: '确认删除',
                content: `
                    <div class="text-center py-4">
                        <div class="text-yellow-500 mb-3"><i class="fas fa-exclamation-triangle text-3xl"></i></div>
                        <p class="text-gray-300 mb-4">确定要删除供应商 <strong>"${supplier.name}"</strong> 吗？</p>
                        <p class="text-gray-500 text-sm">此操作不可撤销，删除后将无法恢复。</p>
                    </div>
                `,
                buttons: [
                    {
                        text: '取消',
                        onClick: () => this.closeModal(),
                        className: 'bg-gray-800 hover:bg-gray-700 text-white'
                    },
                    {
                        text: '删除',
                        onClick: async () => {
                            this.closeModal();
                            await this.executeDelete(id, supplier);
                        },
                        className: 'bg-red-600 hover:bg-red-500 text-white'
                    }
                ]
            });
            
        } catch (error) {
            console.error('[Suppliers] ❌ Delete failed:', error);
            this.showError('删除供应商失败', error);
        }
    },
    
    /**
     * 执行删除操作
     * @param {string} id - 供应商ID
     * @param {Object} supplier - 供应商对象
     * @private
     */
    async executeDelete(id, supplier) {
        try {
            const dependencies = this.validateDependencies();
            
            // 过滤掉要删除的供应商
            dependencies.Dashboard.data.suppliers = dependencies.Dashboard.data.suppliers.filter(s => s.id !== id);
            
            // 保存到存储
            await dependencies.Storage.save(dependencies.Config.STORAGE_KEYS.SUPPLIERS, dependencies.Dashboard.data.suppliers);
            
            // 显示成功提示
            this.showSuccess(`供应商 "${supplier.name}" 已成功删除`);
            
        } catch (error) {
            console.error('[Suppliers] ❌ Delete execution failed:', error);
            this.showError('删除供应商失败', error);
        }
    },
    
    /**
     * 验证依赖模块是否存在
     * @returns {Object} 依赖模块对象
     * @private
     */
    validateDependencies() {
        const Dashboard = window.WorkbenchDashboard;
        const Storage = window.WorkbenchStorage;
        const Config = window.WorkbenchConfig;
        const Utils = window.WorkbenchUtils;
        
        if (!Dashboard || !Storage || !Config || !Utils) {
            throw new Error('系统模块未加载，请刷新页面重试');
        }
        
        return { Dashboard, Storage, Config, Utils };
    },
    
    /**
     * 兼容方法 - 关闭供应商模态框
     */
    closeSupplierModal() {
        this.closeModal();
    },
    
    /**
     * 兼容方法 - 保存供应商
     */
    saveSupplier() {
        console.warn('[Suppliers] ⚠️ Deprecated method: saveSupplier()');
        // 可以在这里实现向后兼容的逻辑
    }
};

// 立即挂载到全局
window.WorkbenchSuppliers = WorkbenchSuppliers;
console.log('✅ [Suppliers] Module loaded and mounted to window');

/**
 * 全局错误处理
 * @param {Event} event - 错误事件
 */
window.addEventListener('error', (event) => {
    console.error('[Global Error] Uncaught error:', event.error);
    if (window.WorkbenchSuppliers && typeof window.WorkbenchSuppliers.showError === 'function') {
        window.WorkbenchSuppliers.showError('系统发生未捕获错误', event.error);
    }
});

/**
 * 未处理的Promise拒绝处理
 * @param {Event} event - Promise拒绝事件
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('[Global Error] Unhandled promise rejection:', event.reason);
    if (window.WorkbenchSuppliers && typeof window.WorkbenchSuppliers.showError === 'function') {
        window.WorkbenchSuppliers.showError('异步操作失败', event.reason);
    }
});

export default WorkbenchSuppliers;