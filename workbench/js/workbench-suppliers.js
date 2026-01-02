// ============================================
// V14.0 ERP - SUPPLIERS MANAGEMENT MODULE
// ============================================

const WorkbenchSuppliers = {
    /**
     * 初始化供应商模块
     */
    init() {
        console.log('[Suppliers] Initializing suppliers management module...');
        
        // 绑定Tab点击事件
        this.bindEvents();
        
        return this;
    },
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 🔥 FIX: 确保供应商Tab点击事件正确绑定
        const suppliersTab = document.querySelector('[data-tab="suppliers"]');
        if (suppliersTab) {
            suppliersTab.addEventListener('click', () => {
                console.log('[Suppliers] Tab clicked');
                this.showSuppliers();
            });
        }
        
        // 新增供应商按钮
        const addBtn = document.getElementById('add-supplier-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.openAddSupplier());
        }
    },
    
    /**
     * 🔥 FIX: 显示供应商列表（使用正确的元素ID）
     */
    showSuppliers() {
        console.log('[Suppliers] Showing suppliers tab');
        
        // 隐藏其他Tab
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // 显示供应商Tab - 🔥 FIX: 正确的ID是 tab-suppliers，不是 suppliers-tab
        const suppliersContent = document.getElementById('tab-suppliers');
        if (suppliersContent) {
            suppliersContent.classList.add('active');
            console.log('[Suppliers] Tab is now visible');
        } else {
            console.error('[Suppliers] tab-suppliers element not found!');
        }
        
        // 更新供应商列表
        this.render();
    },
    
    /**
     * 渲染供应商列表
     */
    render() {
        console.log('[Suppliers] Rendering suppliers list');
        const container = document.getElementById('suppliers-list');
        if (!container) {
            console.error('[Suppliers] suppliers-list element not found!');
            return;
        }
        
        container.innerHTML = '';
        
        if (!WorkbenchDashboard?.data?.suppliers || WorkbenchDashboard.data.suppliers.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center text-slate-400 py-12">
                    <div class="text-4xl mb-4">🏭</div>
                    <div>暂无供应商</div>
                    <div class="text-sm mt-2">点击右上角"新增供应商"开始添加</div>
                </div>
            `;
            return;
        }
        
        WorkbenchDashboard.data.suppliers.forEach(supplier => {
            const card = this.createSupplierCard(supplier);
            container.appendChild(card);
        });
    },
    
    /**
     * 更新供应商列表（已废弃，使用 render 代替）
     */
    updateSuppliersList() {
        console.warn('[Suppliers] updateSuppliersList is deprecated, use render() instead');
        this.render();
    },
    
    /**
     * 创建供应商卡片
     */
    createSupplierCard(supplier) {
        const card = document.createElement('div');
        card.className = 'bg-slate-800 p-4 rounded-lg border border-slate-700';
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-bold text-white">${supplier.company}</h3>
                <div class="flex gap-2">
                    <button onclick="WorkbenchSuppliers.editSupplier('${supplier.id}')" 
                            class="text-blue-400 hover:text-blue-300">
                        📝 编辑
                    </button>
                    <button onclick="WorkbenchSuppliers.deleteSupplier('${supplier.id}')" 
                            class="text-red-400 hover:text-red-300">
                        🗑️ 删除
                    </button>
                </div>
            </div>
            
            ${supplier.contact ? `<div class="text-sm text-slate-300">联系人: ${supplier.contact}</div>` : ''}
            ${supplier.phone ? `<div class="text-sm text-slate-300">电话: ${supplier.phone}</div>` : ''}
            ${supplier.mainProducts ? `<div class="text-sm text-slate-400 mt-2">主营: ${supplier.mainProducts}</div>` : ''}
            ${supplier.certificates ? `<div class="text-sm text-green-400 mt-1">证书: ${supplier.certificates}</div>` : ''}
            ${supplier.notes ? `<div class="text-xs text-slate-500 mt-2">${supplier.notes}</div>` : ''}
            
            <div class="mt-3 pt-3 border-t border-slate-700 flex justify-between text-xs">
                <span class="text-slate-400">累计采购: ¥${WorkbenchUtils.formatNumber(supplier.totalPurchases || 0, 0)}</span>
                <span class="text-slate-500">${WorkbenchUtils.formatDate(supplier.createdAt, 'YYYY-MM-DD')}</span>
            </div>
        `;
        
        return card;
    },
    
    /**
     * 打开新增供应商模态框
     */
    openAddSupplier() {
        document.getElementById('supplier-id').value = '';
        document.getElementById('supplier-company').value = '';
        document.getElementById('supplier-contact').value = '';
        document.getElementById('supplier-phone').value = '';
        document.getElementById('supplier-address').value = '';
        document.getElementById('supplier-products').value = '';
        document.getElementById('supplier-certificates').value = '';
        document.getElementById('supplier-notes').value = '';
        
        WorkbenchUtils.toggle('supplier-modal', true);
        setTimeout(() => document.getElementById('supplier-company').focus(), 100);
    },
    
    /**
     * 编辑供应商
     */
    editSupplier(id) {
        const supplier = WorkbenchDashboard.data.suppliers.find(s => s.id === id);
        if (!supplier) return;
        
        document.getElementById('supplier-id').value = supplier.id;
        document.getElementById('supplier-company').value = supplier.company;
        document.getElementById('supplier-contact').value = supplier.contact || '';
        document.getElementById('supplier-phone').value = supplier.phone || '';
        document.getElementById('supplier-address').value = supplier.address || '';
        document.getElementById('supplier-products').value = supplier.mainProducts || '';
        document.getElementById('supplier-certificates').value = supplier.certificates || '';
        document.getElementById('supplier-notes').value = supplier.notes || '';
        
        WorkbenchUtils.toggle('supplier-modal', true);
    },
    
    /**
     * 保存供应商
     */
    async saveSupplier() {
        const id = document.getElementById('supplier-id').value;
        const company = document.getElementById('supplier-company').value.trim();
        
        if (!company) {
            WorkbenchUtils.toast('请输入供应商名称', 'warning');
            return;
        }
        
        const supplierData = {
            company: company,
            contact: document.getElementById('supplier-contact').value.trim(),
            phone: document.getElementById('supplier-phone').value.trim(),
            address: document.getElementById('supplier-address').value.trim(),
            mainProducts: document.getElementById('supplier-products').value.trim(),
            certificates: document.getElementById('supplier-certificates').value.trim(),
            notes: document.getElementById('supplier-notes').value.trim()
        };
        
        if (id) {
            // 更新现有供应商
            const supplier = WorkbenchDashboard.data.suppliers.find(s => s.id === id);
            if (supplier) {
                Object.assign(supplier, supplierData);
            }
            WorkbenchUtils.toast('供应商已更新', 'success');
        } else {
            // 新增供应商
            WorkbenchDashboard.data.suppliers.push({
                id: WorkbenchUtils.generateId('SUPP'),
                ...supplierData,
                createdAt: new Date().toISOString(),
                totalPurchases: 0
            });
            WorkbenchUtils.toast('供应商已添加', 'success');
        }
        
        await WorkbenchStorage.save(
            WorkbenchConfig.STORAGE_KEYS.SUPPLIERS,
            WorkbenchDashboard.data.suppliers
        );
        
        WorkbenchUtils.toggle('supplier-modal', false);
        this.updateSuppliersList();
    },
    
    /**
     * 删除供应商
     */
    async deleteSupplier(id) {
        if (!confirm('确定要删除这个供应商吗？')) {
            return;
        }
        
        WorkbenchDashboard.data.suppliers = WorkbenchDashboard.data.suppliers.filter(s => s.id !== id);
        
        await WorkbenchStorage.save(
            WorkbenchConfig.STORAGE_KEYS.SUPPLIERS,
            WorkbenchDashboard.data.suppliers
        );
        
        WorkbenchUtils.toast('供应商已删除', 'success');
        this.updateSuppliersList();
    }
};
if (!window.WorkbenchSuppliers) {
  window.WorkbenchSuppliers = new WorkbenchSuppliersModule();
// 🔥 FIX: 显式挂载到 window 对象
window.WorkbenchSuppliers = WorkbenchSuppliers;
