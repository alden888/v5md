/**
 * V5 Medical Workbench - Suppliers Module
 * 供应商管理系统
 * @version 14.1 (Fixed Export)
 */

const WorkbenchSuppliers = {
    // 初始化
    init() {
        console.log('[Suppliers] Initializing...');
        this.render();
    },

    // 渲染供应商列表
    render() {
        const container = document.getElementById('suppliers-list');
        if (!container) return;

        const suppliers = this.getSuppliers();
        
        if (suppliers.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12 border-2 border-dashed border-gray-800 rounded-xl">
                    <div class="text-gray-600 mb-2"><i class="fas fa-industry text-4xl"></i></div>
                    <p class="text-gray-500">暂无供应商档案</p>
                    <button onclick="app.suppliers.openAddModal()" class="mt-4 text-blue-500 hover:text-blue-400 underline">立即添加</button>
                </div>`;
            return;
        }

        container.innerHTML = suppliers.map(s => `
            <div class="bg-gray-900 border border-gray-700 p-5 rounded-xl hover:border-blue-500 transition group relative">
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
                    <button onclick="alert('编辑功能开发中')" class="flex-1 bg-gray-800 hover:bg-gray-700 py-1.5 rounded text-xs text-white">编辑</button>
                    <button onclick="app.suppliers.delete('${s.id}')" class="px-3 text-red-500 hover:bg-red-900/20 rounded"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    },

    // 获取数据
    getSuppliers() {
        return JSON.parse(localStorage.getItem('v5_suppliers') || '[]');
    },

    // 打开新增弹窗 (使用 prompt 简化版，防止弹窗HTML丢失导致无法输入)
    openAddModal() {
        // 为了确保能用，暂时使用系统级输入框，绕过HTML结构问题
        const name = prompt("请输入供应商名称 (必填):");
        if (!name) return;
        
        const contact = prompt("联系人姓名:");
        const product = prompt("主营产品:");
        
        this.save({
            id: 'SUP-' + Date.now(),
            name,
            contact,
            product,
            address: '',
            certs: '',
            createdAt: new Date().toISOString()
        });
    },

    // 保存数据
    save(supplier) {
        const list = this.getSuppliers();
        list.unshift(supplier);
        localStorage.setItem('v5_suppliers', JSON.stringify(list));
        this.render();
        // 尝试调用工具类通知，如果失败则alert
        if(window.WorkbenchUtils) window.WorkbenchUtils.toast('供应商已添加', 'success');
        else alert('供应商已添加');
    },

    // 删除
    delete(id) {
        if(!confirm('确定删除该供应商吗？')) return;
        const list = this.getSuppliers().filter(s => s.id !== id);
        localStorage.setItem('v5_suppliers', JSON.stringify(list));
        this.render();
    }
};

// 🔥🔥🔥 核心修复：强制挂载到 Window 对象 🔥🔥🔥
window.WorkbenchSuppliers = WorkbenchSuppliers;
console.log('✅ WorkbenchSuppliers: FORCED LOADED');
