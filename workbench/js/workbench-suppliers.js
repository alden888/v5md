// ============================================
// js/workbench-suppliers.js - 新建
// ============================================

const WorkbenchSuppliers = {
    init() {
        console.log('[Suppliers] Initializing...');
        return this;
    },
    
    /**
     * 渲染供应商列表 - 🔥 渲染到 #suppliers-list
     */
    render() {
        console.log('[Suppliers] Rendering suppliers list...');
        
        const container = document.getElementById('suppliers-list');
        if (!container) {
            console.error('[Suppliers] #suppliers-list not found!');
            return;
        }
        
        container.innerHTML = '';
        
        const suppliers = WorkbenchDashboard.data.suppliers || [];
        
        if (suppliers.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center text-slate-400 py-12">
                    <div class="text-4xl mb-4">🏭</div>
                    <div>暂无供应商</div>
                    <div class="text-sm mt-2">点击右上角"新增供应商"开始添加</div>
                </div>
            `;
            return;
        }
        
        suppliers.forEach(supplier => {
            const card = this._createCard(supplier);
            container.appendChild(card);
        });
    },
    
    _createCard(supplier) {
        const card = document.createElement('div');
        card.className = 'bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition';
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-bold text-white">${supplier.company}</h3>
                <div class="flex gap-2">
                    <button onclick="WorkbenchSuppliers.openEditModal('${supplier.id}')" 
                            class="text-blue-400 hover:text-blue-300 text-sm">
                        📝 编辑
                    </button>
                    <button onclick="WorkbenchSuppliers.deleteSupplier('${supplier.id}')" 
                            class="text-red-400 hover:text-red-300 text-sm">
                        🗑️
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
    
    openAddModal() {
        document.getElementById('supplier-id').value = '';
        document.getElementById('supplier-company').value = '';
        document.getElementById('supplier-contact').value = '';
        document.getElementById('supplier-phone').value = '';
        document.getElementById('supplier-address').value = '';
        document.getElementById('supplier-products').value = '';
        document.getElementById('supplier-certificates').value = '';
        document.getElementById('supplier-notes').value = '';
        
        const modalTitle = document.getElementById('supplier-modal-title');
        if (modalTitle) modalTitle.textContent = '新增供应商';
        
        const modal = document.getElementById('supplier-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
        }
        
        setTimeout(() => document.getElementById('supplier-company').focus(), 100);
    },
    
    openEditModal(id) {
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
        
        const modalTitle = document.getElementById('supplier-modal-title');
        if (modalTitle) modalTitle.textContent = '编辑供应商';
        
        const modal = document.getElementById('supplier-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('active');
        }
    },
    
    closeSupplierModal() {
        const modal = document.getElementById('supplier-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('active');
        }
    },
    
    saveSupplier() {
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
            const supplier = WorkbenchDashboard.data.suppliers.find(s => s.id === id);
            if (supplier) {
                Object.assign(supplier, supplierData);
            }
            WorkbenchUtils.toast('供应商已更新', 'success');
        } else {
            WorkbenchDashboard.data.suppliers.push({
                id: WorkbenchUtils.generateId('SUPP'),
                ...supplierData,
                createdAt: new Date().toISOString(),
                totalPurchases: 0
            });
            WorkbenchUtils.toast('供应商已添加', 'success');
        }
        
        WorkbenchStorage.save(WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, WorkbenchDashboard.data.suppliers);
        
        this.closeSupplierModal();
        this.render();
        WorkbenchOrders.updateSupplierSuggestions();
    },
    
    deleteSupplier(id) {
        if (!confirm('确定要删除这个供应商吗？')) return;
        
        WorkbenchDashboard.data.suppliers = WorkbenchDashboard.data.suppliers.filter(s => s.id !== id);
        WorkbenchStorage.save(WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, WorkbenchDashboard.data.suppliers);
        
        WorkbenchUtils.toast('供应商已删除', 'success');
        this.render();
        WorkbenchOrders.updateSupplierSuggestions();
    }
};
// ============================================
// js/workbench-suppliers.js - 末尾添加
// ============================================

// ... (所有现有代码保持不变) ...

// 🔥 FIX: 显式挂载到window对象
window.WorkbenchSuppliers = WorkbenchSuppliers;
