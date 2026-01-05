/**
 * V14.2 PRO - 供应商管理模块（完全重构版）
 * 供应商CRUD + 数据持久化 + 云端同步
 * 优化版本 - 2026-01-05
 * @namespace WorkbenchSuppliers
 */
const WorkbenchSuppliers = (() => {
    'use strict';

    // 模块状态
    const state = {
        suppliers: [],
        isInitialized: false,
        currentEditingSupplier: null
    };

    /**
     * 初始化供应商模块（供loader调用）
     * @returns {boolean} 是否成功
     */
    function init() {
        try {
            console.log('[Suppliers] 供应商模块初始化中...');
            
            // 加载供应商数据
            loadSuppliers();
            
            // 绑定事件
            bindEvents();
            
            state.isInitialized = true;
            
            console.log('[Suppliers] ✅ 供应商模块已初始化');
            console.log('[Suppliers] 供应商数量:', state.suppliers.length);
            
            return true;
        } catch (error) {
            console.error('[Suppliers] ❌ 初始化失败:', error);
            return false;
        }
    }

    /**
     * 从存储加载供应商数据
     */
    function loadSuppliers() {
        try {
            if (window.WorkbenchStorage) {
                state.suppliers = WorkbenchStorage.load('suppliers') || [];
            } else {
                const suppliersJson = localStorage.getItem('workbench_suppliers');
                state.suppliers = suppliersJson ? JSON.parse(suppliersJson) : [];
            }
            
            console.log(`[Suppliers] ✅ 已加载 ${state.suppliers.length} 个供应商`);
        } catch (error) {
            console.error('[Suppliers] ❌ 加载供应商数据失败:', error);
            state.suppliers = [];
        }
    }

    /**
     * 保存供应商数据
     * @returns {boolean} 是否成功
     */
    function saveSuppliers() {
        try {
            if (window.WorkbenchStorage) {
                WorkbenchStorage.save('suppliers', state.suppliers);
            } else {
                localStorage.setItem('workbench_suppliers', JSON.stringify(state.suppliers));
            }
            
            // 同步到WorkbenchState
            if (window.WorkbenchState) {
                WorkbenchState.set('data.suppliers', state.suppliers, false);
            }
            
            // 同步到Firebase（如果启用）
            if (window.WorkbenchFirebase && WorkbenchFirebase.isInitialized && WorkbenchFirebase.isInitialized()) {
                WorkbenchFirebase.syncSuppliers(state.suppliers).catch(err => {
                    console.warn('[Suppliers] Firebase同步失败:', err);
                });
            }
            
            console.log(`[Suppliers] ✅ 已保存 ${state.suppliers.length} 个供应商`);
            return true;
        } catch (error) {
            console.error('[Suppliers] ❌ 保存供应商数据失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast('供应商数据保存失败', 'error');
            }
            return false;
        }
    }

    /**
     * 绑定事件监听器
     */
    function bindEvents() {
        // 供应商模块暂无需要绑定的全局事件
        console.log('[Suppliers] 事件绑定完成');
    }

    /**
     * 渲染供应商列表
     */
    function renderSuppliers() {
        try {
            // 查找供应商列表容器（兼容多种可能的ID）
            const container = document.getElementById('suppliers-list') || 
                            document.getElementById('supplierList') ||
                            document.getElementById('supplier-list');

            if (!container) {
                console.warn('[Suppliers] 供应商列表容器未找到');
                return;
            }

            // 空数据处理
            if (state.suppliers.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12 text-gray-500">
                        <i class="fas fa-industry text-4xl mb-4 opacity-50"></i>
                        <p>暂无供应商数据</p>
                        <p class="text-sm mt-2">点击"新增供应商"开始添加</p>
                    </div>
                `;
                return;
            }

            // 渲染供应商卡片
            container.innerHTML = state.suppliers.map(supplier => `
                <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500 transition-all group relative">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-lg font-bold text-white">${escapeHtml(supplier.name)}</h3>
                        <span class="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">
                            ${escapeHtml(supplier.product || '综合')}
                        </span>
                    </div>
                    
                    <div class="text-sm text-gray-400 space-y-2">
                        ${supplier.contact ? `
                            <p><i class="fas fa-user w-5 text-gray-500"></i> ${escapeHtml(supplier.contact)}</p>
                        ` : ''}
                        ${supplier.phone ? `
                            <p><i class="fas fa-phone w-5 text-gray-500"></i> ${escapeHtml(supplier.phone)}</p>
                        ` : ''}
                        ${supplier.email ? `
                            <p><i class="fas fa-envelope w-5 text-gray-500"></i> ${escapeHtml(supplier.email)}</p>
                        ` : ''}
                        ${supplier.address ? `
                            <p><i class="fas fa-map-marker-alt w-5 text-gray-500"></i> ${escapeHtml(supplier.address)}</p>
                        ` : ''}
                    </div>
                    
                    <div class="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onclick="WorkbenchSuppliers.openEditModal('${supplier.id}')"
                            class="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                        >
                            <i class="fas fa-edit mr-1"></i>编辑
                        </button>
                        <button 
                            onclick="WorkbenchSuppliers.deleteSupplier('${supplier.id}')"
                            class="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                        >
                            <i class="fas fa-trash mr-1"></i>删除
                        </button>
                    </div>
                </div>
            `).join('');
            
            console.log('[Suppliers] ✅ 供应商列表渲染完成');
        } catch (error) {
            console.error('[Suppliers] ❌ 渲染供应商列表失败:', error);
        }
    }

    /**
     * 打开新增供应商模态框
     */
    function openAddModal() {
        try {
            state.currentEditingSupplier = null;

            if (window.WorkbenchModal) {
                WorkbenchModal.open({
                    title: '新增供应商',
                    content: generateSupplierForm(),
                    size: 'lg',
                    buttons: [
                        {
                            text: '取消',
                            className: 'bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded',
                            onClick: (modal) => WorkbenchModal.close(modal)
                        },
                        {
                            text: '保存',
                            className: 'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded',
                            onClick: () => handleSaveSupplier()
                        }
                    ]
                });
            } else {
                // 降级处理：使用原生alert
                alert('模态框管理器未加载，请刷新页面');
            }
            
            console.log('[Suppliers] 新增供应商模态框已打开');
        } catch (error) {
            console.error('[Suppliers] ❌ 打开新增模态框失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast('打开新增窗口失败', 'error');
            }
        }
    }

    /**
     * 打开编辑供应商模态框
     * @param {string} supplierId - 供应商ID
     */
    function openEditModal(supplierId) {
        try {
            const supplier = state.suppliers.find(s => s.id === supplierId);
            if (!supplier) {
                throw new Error(`供应商 ${supplierId} 不存在`);
            }

            state.currentEditingSupplier = supplier;

            if (window.WorkbenchModal) {
                WorkbenchModal.open({
                    title: '编辑供应商',
                    content: generateSupplierForm(supplier),
                    size: 'lg',
                    buttons: [
                        {
                            text: '取消',
                            className: 'bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded',
                            onClick: (modal) => WorkbenchModal.close(modal)
                        },
                        {
                            text: '保存',
                            className: 'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded',
                            onClick: () => handleSaveSupplier()
                        }
                    ]
                });
            }
            
            console.log('[Suppliers] 编辑供应商模态框已打开:', supplier);
        } catch (error) {
            console.error('[Suppliers] ❌ 打开编辑模态框失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast(`打开编辑窗口失败: ${error.message}`, 'error');
            }
        }
    }

    /**
     * 生成供应商表单HTML
     * @param {Object} supplier - 供应商数据（编辑时传入）
     * @returns {string} HTML字符串
     */
    function generateSupplierForm(supplier = null) {
        return `
            <form id="supplier-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">供应商名称 *</label>
                    <input 
                        type="text" 
                        id="supplier-name" 
                        value="${supplier ? escapeHtml(supplier.name) : ''}"
                        required
                        class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="请输入供应商名称"
                    >
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">主营产品</label>
                    <input 
                        type="text" 
                        id="supplier-product" 
                        value="${supplier ? escapeHtml(supplier.product || '') : ''}"
                        class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="例如：医疗器械、电子元件等"
                    >
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">联系人</label>
                        <input 
                            type="text" 
                            id="supplier-contact" 
                            value="${supplier ? escapeHtml(supplier.contact || '') : ''}"
                            class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="联系人姓名"
                        >
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">联系电话</label>
                        <input 
                            type="tel" 
                            id="supplier-phone" 
                            value="${supplier ? escapeHtml(supplier.phone || '') : ''}"
                            class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="联系电话"
                        >
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">邮箱</label>
                    <input 
                        type="email" 
                        id="supplier-email" 
                        value="${supplier ? escapeHtml(supplier.email || '') : ''}"
                        class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="email@example.com"
                    >
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">地址</label>
                    <textarea 
                        id="supplier-address" 
                        rows="2"
                        class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="供应商地址"
                    >${supplier ? escapeHtml(supplier.address || '') : ''}</textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">备注</label>
                    <textarea 
                        id="supplier-remark" 
                        rows="3"
                        class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="其他备注信息（可选）"
                    >${supplier ? escapeHtml(supplier.remark || '') : ''}</textarea>
                </div>
            </form>
        `;
    }

    /**
     * 处理保存供应商
     */
    function handleSaveSupplier() {
        try {
            // 获取表单数据
            const formData = {
                name: document.getElementById('supplier-name')?.value?.trim(),
                product: document.getElementById('supplier-product')?.value?.trim(),
                contact: document.getElementById('supplier-contact')?.value?.trim(),
                phone: document.getElementById('supplier-phone')?.value?.trim(),
                email: document.getElementById('supplier-email')?.value?.trim(),
                address: document.getElementById('supplier-address')?.value?.trim(),
                remark: document.getElementById('supplier-remark')?.value?.trim()
            };

            // 验证必填项
            if (!formData.name) {
                if (window.WorkbenchUtils) {
                    WorkbenchUtils.toast('请输入供应商名称', 'warning');
                }
                return;
            }

            if (state.currentEditingSupplier) {
                // 编辑模式：更新现有供应商
                const supplier = state.suppliers.find(s => s.id === state.currentEditingSupplier.id);
                if (supplier) {
                    Object.assign(supplier, {
                        ...formData,
                        updateTime: new Date().toISOString()
                    });
                }
            } else {
                // 新增模式：创建新供应商
                const newSupplier = {
                    id: window.WorkbenchUtils ? 
                        WorkbenchUtils.generateId('supplier') : 
                        `supplier_${Date.now()}`,
                    ...formData,
                    createTime: new Date().toISOString(),
                    updateTime: new Date().toISOString()
                };
                state.suppliers.push(newSupplier);
            }

            // 保存数据
            saveSuppliers();

            // 刷新列表
            renderSuppliers();

            // 关闭模态框
            if (window.WorkbenchModal) {
                WorkbenchModal.close();
            }

            // 成功提示
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast(
                    state.currentEditingSupplier ? '供应商信息已更新' : '供应商添加成功', 
                    'success'
                );
            }

            // 清除编辑状态
            state.currentEditingSupplier = null;

            console.log('[Suppliers] ✅ 供应商保存成功');
        } catch (error) {
            console.error('[Suppliers] ❌ 保存供应商失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast('保存供应商失败，请重试', 'error');
            }
        }
    }

    /**
     * 删除供应商
     * @param {string} supplierId - 供应商ID
     */
    async function deleteSupplier(supplierId) {
        try {
            // 确认删除
            let confirmed = false;
            if (window.WorkbenchModal) {
                confirmed = await WorkbenchModal.confirm('确定要删除该供应商吗？此操作不可恢复。', {
                    title: '删除确认',
                    confirmText: '确认删除',
                    cancelText: '取消'
                });
            } else {
                confirmed = confirm('确定要删除该供应商吗？');
            }

            if (!confirmed) return;

            // 查找并删除
            const index = state.suppliers.findIndex(s => s.id === supplierId);
            if (index === -1) {
                throw new Error(`供应商 ${supplierId} 不存在`);
            }

            state.suppliers.splice(index, 1);
            
            // 保存数据
            saveSuppliers();

            // 刷新列表
            renderSuppliers();

            // 成功提示
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast('供应商已删除', 'success');
            }

            console.log('[Suppliers] ✅ 供应商已删除:', supplierId);
        } catch (error) {
            console.error('[Suppliers] ❌ 删除供应商失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast('删除供应商失败，请重试', 'error');
            }
        }
    }

    /**
     * 获取所有供应商
     * @returns {Array} 供应商列表
     */
    function getAllSuppliers() {
        return [...state.suppliers];
    }

    /**
     * 按ID获取供应商
     * @param {string} supplierId - 供应商ID
     * @returns {Object|null} 供应商对象
     */
    function getSupplierById(supplierId) {
        return state.suppliers.find(s => s.id === supplierId) || null;
    }

    /**
     * HTML转义
     * @param {string} str - 字符串
     * @returns {string} 转义后的字符串
     */
    function escapeHtml(str) {
        if (!str) return '';
        if (window.WorkbenchUtils && WorkbenchUtils.escapeHtml) {
            return WorkbenchUtils.escapeHtml(str);
        }
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // 公共API
    const api = {
        // 初始化
        init,
        
        // 供应商操作
        openAddModal,
        openEditModal,
        deleteSupplier,
        getAllSuppliers,
        getSupplierById,
        
        // 渲染
        renderSuppliers,
        
        // 数据管理
        loadSuppliers,
        saveSuppliers
    };

    return api;
})();

// 挂载到全局
window.WorkbenchSuppliers = WorkbenchSuppliers;

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchSuppliers;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchSuppliers);
}

console.log('[Suppliers] 供应商模块已加载 (V14.2 重构版)');
