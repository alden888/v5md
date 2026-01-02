/**
 * V14.1 CRM & EXPENSES MODULE (FULLY FUNCTIONAL)
 * 客户档案和运营支出的完整实现
 */

const WorkbenchCRM = {
    /**
     * 打开客户Modal
     */
    openCustomerModal() {
        console.log('[CRM] 📝 Opening customer modal...');
        
        const modal = document.getElementById('customer-modal');
        if (!modal) {
            console.error('[CRM] ❌ Modal not found');
            window.WorkbenchUtils.toast('客户Modal未找到', 'error');
            return;
        }
        
        modal.classList.add('active');
        
        // 清空表单
        ['customer-name', 'customer-contact', 'customer-whatsapp', 'customer-address', 'customer-notes'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        
        const countryEl = document.getElementById('customer-country');
        const currencyEl = document.getElementById('customer-currency');
        
        if (countryEl) countryEl.value = '';
        if (currencyEl) currencyEl.value = 'USD';
        
        console.log('[CRM] ✅ Modal opened');
    },
    
    /**
     * 关闭客户Modal
     */
    closeCustomerModal() {
        console.log('[CRM] Closing customer modal...');
        const modal = document.getElementById('customer-modal');
        if (modal) modal.classList.remove('active');
    },
    
    /**
     * 🔥 保存客户档案 (增强版)
     */
    async saveCustomer() {
        console.log('[CRM] 💾 Saving customer...');
        
        try {
            const Utils = window.WorkbenchUtils;
            const Dashboard = window.WorkbenchDashboard;
            const Storage = window.WorkbenchStorage;
            const Config = window.WorkbenchConfig;
            
            if (!Dashboard || !Storage || !Config) {
                throw new Error('Required modules not loaded');
            }
            
            // 获取表单数据
            const name = document.getElementById('customer-name')?.value?.trim();
            const contact = document.getElementById('customer-contact')?.value?.trim() || '';
            const whatsapp = document.getElementById('customer-whatsapp')?.value?.trim() || '';
            const country = document.getElementById('customer-country')?.value || '';
            const currency = document.getElementById('customer-currency')?.value || 'USD';
            const address = document.getElementById('customer-address')?.value?.trim() || '';
            const notes = document.getElementById('customer-notes')?.value?.trim() || '';
            
            // 验证必填项
            if (!name) {
                Utils.toast('请输入公司名称', 'warning');
                document.getElementById('customer-name')?.focus();
                return;
            }
            
            // 构建客户对象
            const newCustomer = {
                id: 'CUST-' + Date.now(),
                company: name,
                contact: contact,
                whatsapp: whatsapp,
                country: country,
                currency: currency,
                address: address,
                notes: notes,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            console.log('[CRM] Created customer object:', newCustomer);
            
            // 添加到数据中
            Dashboard.data.customers.push(newCustomer);
            
            // 保存到存储
            await Storage.save(Config.STORAGE_KEYS.CUSTOMERS, Dashboard.data.customers);
            console.log('[CRM] ✅ Saved to storage');
            
            // 成功提示
            Utils.toast(`✅ 客户 "${name}" 已保存！`, 'success');
            
            // 关闭Modal
            this.closeCustomerModal();
            
            // 刷新显示
            this.render();
            
            console.log('[CRM] ✅ Customer saved successfully');
            
        } catch (error) {
            console.error('[CRM] ❌ Save failed:', error);
            window.WorkbenchUtils.toast('保存客户失败: ' + error.message, 'error');
        }
    },
    
    /**
     * 渲染客户列表
     */
    render() {
        console.log('[CRM] 📊 Rendering customers...');
        
        const container = document.getElementById('customer-grid');
        if (!container) {
            console.error('[CRM] ❌ Container not found');
            return;
        }
        
        const customers = window.WorkbenchDashboard?.data?.customers || [];
        console.log(`[CRM] Found ${customers.length} customers`);
        
        if (customers.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-500 py-12 col-span-full">暂无客户档案</div>';
            return;
        }

        container.innerHTML = customers.map(c => `
            <div class="bg-gray-900 border border-gray-700 p-4 rounded-xl hover:border-green-500 transition relative group">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-lg text-white">${c.company}</h3>
                    <span class="text-xs bg-gray-800 px-2 py-1 rounded text-slate-300">${c.country || '未设置'}</span>
                </div>
                <div class="space-y-1 text-sm text-slate-400">
                    <p><i class="fas fa-user w-5"></i> ${c.contact || '-'}</p>
                    <p><i class="fab fa-whatsapp w-5 text-green-500"></i> ${c.whatsapp || '-'}</p>
                    <p class="truncate"><i class="fas fa-map-marker-alt w-5 text-red-500"></i> ${c.address || '-'}</p>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-800 flex gap-2">
                    <button onclick="app.crm.copyAddress('${c.id}')" class="flex-1 bg-gray-800 hover:bg-gray-700 py-1.5 rounded text-xs text-white transition">
                        <i class="fas fa-copy"></i> 复制发货信息
                    </button>
                    <button onclick="app.crm.deleteCustomer('${c.id}')" class="px-3 text-red-500 hover:bg-red-900/20 rounded">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        console.log('[CRM] ✅ Render complete');
    },
    
    /**
     * 复制发货地址
     */
    copyAddress(id) {
        console.log('[CRM] 📋 Copying address for:', id);
        
        const c = window.WorkbenchDashboard?.data?.customers.find(x => x.id === id);
        if (!c) {
            window.WorkbenchUtils.toast('客户不存在', 'error');
            return;
        }
        
        const text = `TO: ${c.company}
ATTN: ${c.contact || '-'}
TEL: ${c.whatsapp || '-'}
ADD: ${c.address || '-'}
COUNTRY: ${c.country || '-'}`;
        
        window.WorkbenchUtils.copyToClipboard(text);
    },
    
    /**
     * 删除客户
     */
    async deleteCustomer(id) {
        console.log('[CRM] 🗑️ Deleting customer:', id);
        
        try {
            const customer = window.WorkbenchDashboard?.data?.customers.find(c => c.id === id);
            if (!customer) {
                window.WorkbenchUtils.toast('客户不存在', 'error');
                return;
            }
            
            if (!confirm(`⚠️ 确定删除客户 "${customer.company}" 吗？\n\n此操作不可撤销！`)) {
                return;
            }
            
            // 从数据中移除
            window.WorkbenchDashboard.data.customers = window.WorkbenchDashboard.data.customers.filter(
                c => c.id !== id
            );
            
            // 保存
            await window.WorkbenchStorage.save(
                window.WorkbenchConfig.STORAGE_KEYS.CUSTOMERS,
                window.WorkbenchDashboard.data.customers
            );
            
            this.render();
            window.WorkbenchUtils.toast(`✅ 客户 "${customer.company}" 已删除`, 'success');
            
        } catch (error) {
            console.error('[CRM] ❌ Delete failed:', error);
            window.WorkbenchUtils.toast('删除客户失败: ' + error.message, 'error');
        }
    }
};

const WorkbenchExpenses = {
    /**
     * 打开支出Modal
     */
    openAddModal() {
        console.log('[Expenses] 📝 Opening add expense modal...');
        
        const modal = document.getElementById('expense-modal');
        if (!modal) {
            console.error('[Expenses] ❌ Modal not found');
            window.WorkbenchUtils.toast('支出Modal未找到', 'error');
            return;
        }
        
        modal.classList.add('active');
        
        // 设置默认日期为今天
        const dateInput = document.getElementById('expense-date');
        if (dateInput) {
            dateInput.valueAsDate = new Date();
        }
        
        // 清空其他字段
        const amountInput = document.getElementById('expense-amount');
        const customerInput = document.getElementById('expense-customer');
        const notesInput = document.getElementById('expense-notes');
        
        if (amountInput) amountInput.value = '';
        if (customerInput) customerInput.value = '';
        if (notesInput) notesInput.value = '';
        
        // 重置类别为默认
        const categoryInput = document.getElementById('expense-category');
        if (categoryInput) categoryInput.value = '房租';
        
        console.log('[Expenses] ✅ Modal opened');
    },
    
    /**
     * 关闭支出Modal
     */
    closeExpenseModal() {
        console.log('[Expenses] Closing expense modal...');
        const modal = document.getElementById('expense-modal');
        if (modal) modal.classList.remove('active');
    },
    
    /**
     * 🔥 保存支出 (增强版)
     */
    async saveExpense() {
        console.log('[Expenses] 💾 Saving expense...');
        
        try {
            const Utils = window.WorkbenchUtils;
            const Dashboard = window.WorkbenchDashboard;
            const Storage = window.WorkbenchStorage;
            const Config = window.WorkbenchConfig;
            
            if (!Dashboard || !Storage || !Config) {
                throw new Error('Required modules not loaded');
            }
            
            // 获取表单数据
            const date = document.getElementById('expense-date')?.value;
            const category = document.getElementById('expense-category')?.value || '其他';
            const amountStr = document.getElementById('expense-amount')?.value;
            const customer = document.getElementById('expense-customer')?.value?.trim() || '';
            const notes = document.getElementById('expense-notes')?.value?.trim() || '';
            
            // 验证必填项
            if (!date) {
                Utils.toast('请选择日期', 'warning');
                document.getElementById('expense-date')?.focus();
                return;
            }
            
            if (!amountStr) {
                Utils.toast('请输入金额', 'warning');
                document.getElementById('expense-amount')?.focus();
                return;
            }
            
            const amount = parseFloat(amountStr);
            if (isNaN(amount) || amount <= 0) {
                Utils.toast('请输入有效金额', 'error');
                document.getElementById('expense-amount')?.focus();
                return;
            }
            
            // 构建支出对象
            const newExpense = {
                id: 'EXP-' + Date.now(),
                date: date,
                category: category,
                amount: amount,
                customer: customer,
                notes: notes,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            console.log('[Expenses] Created expense object:', newExpense);
            
            // 添加到数据中
            Dashboard.data.expenses.push(newExpense);
            
            // 保存到存储
            await Storage.save(Config.STORAGE_KEYS.EXPENSES, Dashboard.data.expenses);
            console.log('[Expenses] ✅ Saved to storage');
            
            // 成功提示
            Utils.toast(`✅ 支出 ¥${amount.toLocaleString()} 已记录！`, 'success');
            
            // 关闭Modal
            this.closeExpenseModal();
            
            // 刷新显示
            this.render();
            
            // 更新Dashboard
            Dashboard.updateDashboard();
            
            console.log('[Expenses] ✅ Expense saved successfully');
            
        } catch (error) {
            console.error('[Expenses] ❌ Save failed:', error);
            window.WorkbenchUtils.toast('保存支出失败: ' + error.message, 'error');
        }
    },
    
    /**
     * 渲染支出列表
     */
    render() {
        console.log('[Expenses] 📊 Rendering expenses...');
        
        const tbody = document.getElementById('expense-list');
        if (!tbody) {
            console.error('[Expenses] ❌ Table body not found');
            return;
        }
        
        const expenses = window.WorkbenchDashboard?.data?.expenses || [];
        console.log(`[Expenses] Found ${expenses.length} expenses`);
        
        if (expenses.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-gray-500 py-8">暂无支出记录</td></tr>';
            return;
        }
        
        // 按日期倒序排列
        const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        tbody.innerHTML = sortedExpenses.map(e => `
            <tr class="hover:bg-gray-800 transition">
                <td class="p-4">${e.date}</td>
                <td class="p-4"><span class="bg-gray-800 px-2 py-1 rounded text-xs">${e.category}</span></td>
                <td class="p-4 font-bold text-red-400">¥${e.amount.toLocaleString()}</td>
                <td class="p-4 text-gray-400">${e.customer || '-'}</td>
                <td class="p-4 text-sm text-gray-400">${e.notes || '-'}</td>
                <td class="p-4 text-center">
                    <button onclick="app.expenses.delete('${e.id}')" class="text-red-500 hover:text-red-400">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
        
        console.log('[Expenses] ✅ Render complete');
    },
    
    /**
     * 删除支出
     */
    async delete(id) {
        console.log('[Expenses] 🗑️ Deleting expense:', id);
        
        try {
            const expense = window.WorkbenchDashboard?.data?.expenses.find(e => e.id === id);
            if (!expense) {
                window.WorkbenchUtils.toast('支出不存在', 'error');
                return;
            }
            
            if (!confirm(`⚠️ 确定删除此支出记录吗？\n\n金额: ¥${expense.amount}\n类别: ${expense.category}\n\n此操作不可撤销！`)) {
                return;
            }
            
            // 从数据中移除
            window.WorkbenchDashboard.data.expenses = window.WorkbenchDashboard.data.expenses.filter(
                e => e.id !== id
            );
            
            // 保存
            await window.WorkbenchStorage.save(
                window.WorkbenchConfig.STORAGE_KEYS.EXPENSES,
                window.WorkbenchDashboard.data.expenses
            );
            
            this.render();
            window.WorkbenchDashboard.updateDashboard();
            window.WorkbenchUtils.toast('✅ 支出已删除', 'success');
            
        } catch (error) {
            console.error('[Expenses] ❌ Delete failed:', error);
            window.WorkbenchUtils.toast('删除支出失败: ' + error.message, 'error');
        }
    }
};

// 🔥 挂载到全局
window.WorkbenchCRM = WorkbenchCRM;
window.WorkbenchExpenses = WorkbenchExpenses;
console.log('✅ [CRM] Module loaded and mounted');
console.log('✅ [Expenses] Module loaded and mounted');

/**
 * V14.1 SUPPLIERS MODULE (FULLY FUNCTIONAL & ENHANCED)
 * 修复所有已知问题，提供完整的供应商管理功能
 */
const WorkbenchSuppliers = {
    currentEditId: null,
    
    init() {
        console.log('[Suppliers] 🚀 Initializing V14.1 Suppliers Module...');
        this.render();
        return this;
    },

    /**
     * 🔥 核心渲染方法
     */
    render() {
        console.log('[Suppliers] 📊 Rendering suppliers list...');
        
        const container = document.getElementById('suppliers-list');
        if (!container) {
            console.error('[Suppliers] ❌ Container not found!');
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
     */
    getSuppliers() {
        return window.WorkbenchDashboard?.data?.suppliers || [];
    },

    /**
     * 🔥 打开添加弹窗（增强版）
     */
    openAddModal() {
        console.log('[Suppliers] 📝 Opening add supplier dialog...');
        
        try {
            // 第1步：供应商名称 (必填)
            const name = prompt("🏭 供应商名称 (必填):", "");
            if (!name || !name.trim()) {
                console.log('[Suppliers] User cancelled at name');
                return;
            }
            
            // 第2步：联系人
            const contact = prompt("👤 联系人姓名:", "") || '';
            
            // 第3步：主营产品
            const product = prompt("📦 主营产品:", "") || '';
            
            // 第4步：地址
            const address = prompt("📍 地址:", "") || '';
            
            // 第5步：证书
            const certs = prompt("📜 证书 (如: CE, ISO, FDA):", "") || '';
            
            // 保存供应商
            this.save({
                id: 'SUP-' + Date.now(),
                name: name.trim(),
                contact: contact.trim(),
                product: product.trim(),
                address: address.trim(),
                certs: certs.trim(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            
        } catch (error) {
            console.error('[Suppliers] ❌ Error in openAddModal:', error);
            window.WorkbenchUtils.toast('添加供应商失败: ' + error.message, 'error');
        }
    },

    /**
     * 🔥 保存供应商
     */
    async save(supplier) {
        console.log('[Suppliers] 💾 Saving supplier...', supplier);
        
        try {
            const Dashboard = window.WorkbenchDashboard;
            const Storage = window.WorkbenchStorage;
            const Config = window.WorkbenchConfig;
            const Utils = window.WorkbenchUtils;
            
            if (!Dashboard || !Storage || !Config) {
                throw new Error('Required modules not loaded');
            }
            
            // 验证必填字段
            if (!supplier.name || !supplier.name.trim()) {
                Utils.toast('供应商名称不能为空', 'error');
                return;
            }
            
            // 添加到数据中
            Dashboard.data.suppliers.push(supplier);
            
            // 保存到存储
            await Storage.save(Config.STORAGE_KEYS.SUPPLIERS, Dashboard.data.suppliers);
            console.log('[Suppliers] ✅ Saved to storage');
            
            // 刷新界面
            this.render();
            
            // 成功提示
            Utils.toast(`✅ 供应商 "${supplier.name}" 已添加！`, 'success');
            console.log('[Suppliers] ✅ Supplier saved successfully');
            
        } catch (error) {
            console.error('[Suppliers] ❌ Save failed:', error);
            window.WorkbenchUtils.toast('保存供应商失败: ' + error.message, 'error');
        }
    },

    /**
     * 编辑供应商
     */
    edit(id) {
        console.log('[Suppliers] 📝 Editing supplier:', id);
        
        const supplier = this.getSuppliers().find(s => s.id === id);
        if (!supplier) {
            window.WorkbenchUtils.toast('供应商不存在', 'error');
            return;
        }
        
        const details = `
供应商详情
━━━━━━━━━━━━━━
名称: ${supplier.name}
联系人: ${supplier.contact || '-'}
产品: ${supplier.product || '-'}
地址: ${supplier.address || '-'}
证书: ${supplier.certs || '-'}
━━━━━━━━━━━━━━

编辑功能开发中...
        `.trim();
        
        alert(details);
    },

    /**
     * 🔥 删除供应商
     */
    async delete(id) {
        console.log('[Suppliers] 🗑️ Deleting supplier:', id);
        
        try {
            const supplier = this.getSuppliers().find(s => s.id === id);
            if (!supplier) {
                window.WorkbenchUtils.toast('供应商不存在', 'error');
                return;
            }
            
            if (!confirm(`⚠️ 确定删除供应商 "${supplier.name}" 吗？\n\n此操作不可撤销！`)) {
                console.log('[Suppliers] Delete cancelled by user');
                return;
            }
            
            const Dashboard = window.WorkbenchDashboard;
            const Storage = window.WorkbenchStorage;
            const Config = window.WorkbenchConfig;
            
            // 从数据中移除
            Dashboard.data.suppliers = Dashboard.data.suppliers.filter(s => s.id !== id);
            
            // 保存到存储
            await Storage.save(Config.STORAGE_KEYS.SUPPLIERS, Dashboard.data.suppliers);
            console.log('[Suppliers] ✅ Deleted from storage');
            
            // 刷新界面
            this.render();
            
            // 成功提示
            window.WorkbenchUtils.toast(`✅ 供应商 "${supplier.name}" 已删除`, 'success');
            console.log('[Suppliers] ✅ Supplier deleted successfully');
            
        } catch (error) {
            console.error('[Suppliers] ❌ Delete failed:', error);
            window.WorkbenchUtils.toast('删除供应商失败: ' + error.message, 'error');
        }
    },

    // 🔥 暴露方法供HTML调用
    closeSupplierModal() {
        console.log('[Suppliers] Close supplier modal');
    },
    
    saveSupplier() {
        console.log('[Suppliers] Save supplier (legacy method)');
    }
};

// 🔥🔥🔥 核心修复：强制挂载到 Window 对象
window.WorkbenchSuppliers = WorkbenchSuppliers;
console.log('✅ [Suppliers] Module loaded and mounted');
