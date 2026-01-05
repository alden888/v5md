/**
 * V14.2 Suppliers Module
 * 供应商管理 - 适配 V14 Tab 架构
 */
const WorkbenchSuppliers = {
    init() {
        console.log('[Suppliers] Initializing...');
        this.render();
    },

    // 渲染供应商列表
    async render() {
        const container = document.getElementById('supplierList'); // 注意：index.html里ID是 supplierList
        if (!container) return;

        // 从统一存储读取
        const suppliers = await window.WorkbenchStorage.load(window.WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, []);

        if (!suppliers || suppliers.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-10 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                    <i class="fas fa-box-open text-4xl mb-3 opacity-30"></i>
                    <p>暂无供应商档案</p>
                </div>`;
            return;
        }

        container.innerHTML = suppliers.map(s => `
            <div class="bg-gray-900 border border-gray-800 p-4 rounded-xl hover:border-indigo-500 transition group relative">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-lg text-white">${s.name}</h3>
                    <span class="text-xs bg-indigo-900 text-indigo-300 px-2 py-1 rounded">${s.product || '综合'}</span>
                </div>
                <div class="text-sm text-gray-400 space-y-1">
                    <p><i class="fas fa-user w-5"></i> ${s.contact || '-'}</p>
                    <p><i class="fas fa-phone w-5"></i> ${s.phone || '-'}</p>
                </div>
                <button onclick="WorkbenchSuppliers.delete('${s.id}')" class="absolute top-2 right-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    },

    // 打开新增弹窗
    openAddModal() {
        const modal = document.getElementById('supplier-modal');
        if (modal) modal.classList.remove('hidden');
    },

    // 关闭弹窗
    closeModal() {
        const modal = document.getElementById('supplier-modal');
        if (modal) modal.classList.add('hidden');
    },

    // 保存供应商
    async save() {
        const nameInput = document.getElementById('supp-name');
        const productInput = document.getElementById('supp-product');
        const contactInput = document.getElementById('supp-contact');

        if (!nameInput.value) {
            alert('请输入供应商名称');
            return;
        }

        const newSupplier = {
            id: 'SUP-' + Date.now(),
            name: nameInput.value,
            product: productInput.value,
            contact: contactInput.value,
            createdAt: new Date().toISOString()
        };

        // 读取旧数据 -> 追加 -> 保存
        const suppliers = await window.WorkbenchStorage.load(window.WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, []);
        suppliers.push(newSupplier);
        await window.WorkbenchStorage.save(window.WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, suppliers);

        // 清空表单并刷新
        nameInput.value = '';
        productInput.value = '';
        contactInput.value = '';
        this.closeModal();
        this.render();
        
        // 提示成功 (如果有 Utils)
        if(window.WorkbenchUtils) window.WorkbenchUtils.toast('供应商已保存', 'success');
    },

    // 删除供应商
    async delete(id) {
        if(!confirm('确定删除该供应商吗？')) return;
        
        let suppliers = await window.WorkbenchStorage.load(window.WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, []);
        suppliers = suppliers.filter(s => s.id !== id);
        await window.WorkbenchStorage.save(window.WorkbenchConfig.STORAGE_KEYS.SUPPLIERS, suppliers);
        this.render();
    }
};

// 🔥 关键：挂载到 Window，供 HTML 调用
window.WorkbenchSuppliers = WorkbenchSuppliers;
