/**
 * V14.2 PRO - CRM & EXPENSES MODULE (COMPLETELY FIXED)
 * 修复客户档案和运营支出保存功能
 */

const WorkbenchCRM = {
    /**
     * 🔥 修复：打开客户Modal
     */
    openCustomerModal() {
        console.log('[CRM] 📝 Opening customer modal...');
        
        const modal = document.getElementById('customer-modal');
        if (!modal) {
            console.error('[CRM] ❌ Modal not found');
            window.WorkbenchUtils?.toast('Modal未找到，请检查页面', 'error');
            return;
        }
        
        // 显示Modal
        modal.classList.add('active');
        
        // 清空表单
        const fields = ['customer-name', 'customer-contact', 'customer-whatsapp', 'customer-address', 'customer-notes'];
        fields.forEach(id => {
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
        console.log('[CRM] Closing modal...');
        const modal = document.getElementById('customer-modal');
        if (modal) modal.classList.remove('active');
    },
    
    /**
     * 🔥 关键修复：保存客户档案
     */
    async saveCustomer() {
        console.log('[CRM] 💾 Saving customer...');
        
        try {
            const Utils = window.WorkbenchUtils;
            const Dashboard = window.WorkbenchDashboard;
            const Storage = window.WorkbenchStorage;
            const Config = window.WorkbenchConfig;
            
            if (!Dashboard || !Storage || !Config || !Utils) {
                throw new Error('系统模块未加载，请刷新页面');
            }
            
            // 获取表单数据
            const nameEl = document.getElementById('customer-name');
            const name = nameEl?.value?.trim();
            
            if (!name) {
                Utils.toast('请输入公司名称', 'warning');
                nameEl?.focus();
                return;
            }
            
            const contact = document.getElementById('customer-contact')?.value?.trim() || '';
            const whatsapp = document.getElementById('customer-whatsapp')?.value?.trim() || '';
            const country = document.getElementById('customer-country')?.value || '';
            const currency = document.getElementById('customer-currency')?.value || 'USD';
            const address = document.getElementById('customer-address')?.value?.trim() || '';
            const notes = document.getElementById('customer-notes')?.value?.trim() || '';
            
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
            
            console.log('[CRM] New customer:', newCustomer);
            
            // 添加到数据
            Dashboard.data.customers.push(newCustomer);
            
            // 保存
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
            window.WorkbenchUtils?.toast('保存失败: ' + error.message, 'error');
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
            <div class="bg-gray-900 border border-gray-700 p-4 rounded-xl hover:border-green-500 transition">
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
        const c = window.WorkbenchDashboard?.data?.customers.find(x => x.id === id);
        if (!c) {
            window.WorkbenchUtils?.toast('客户不存在', 'error');
            return;
        }
        
        const text = `TO: ${c.company}
ATTN: ${c.contact || '-'}
TEL: ${c.whatsapp || '-'}
ADD: ${c.address || '-'}
COUNTRY: ${c.country || '-'}`;
        
        window.WorkbenchUtils?.copyToClipboard(text);
    },
    
    /**
     * 删除客户
     */
    async deleteCustomer(id) {
        try {
            const customer = window.WorkbenchDashboard?.data?.customers.find(c => c.id === id);
            if (!customer) {
                window.WorkbenchUtils?.toast('客户不存在', 'error');
                return;
            }
            
            if (!confirm(`⚠️ 确定删除客户 "${customer.company}" 吗？\n\n此操作不可撤销！`)) {
                return;
            }
            
            window.WorkbenchDashboard.data.customers = window.WorkbenchDashboard.data.customers.filter(
                c => c.id !== id
            );
            
            await window.WorkbenchStorage.save(
                window.WorkbenchConfig.STORAGE_KEYS.CUSTOMERS,
                window.WorkbenchDashboard.data.customers
            );
            
            this.render();
            window.WorkbenchUtils?.toast(`✅ 客户 "${customer.company}" 已删除`, 'success');
            
        } catch (error) {
            console.error('[CRM] ❌ Delete failed:', error);
            window.WorkbenchUtils?.toast('删除失败: ' + error.message, 'error');
        }
    }
};

const WorkbenchExpenses = {
    /**
     * 🔥 修复：打开支出Modal
     */
    openAddModal() {
        console.log('[Expenses] 📝 Opening modal...');
        
        const modal = document.getElementById('expense-modal');
        if (!modal) {
            console.error('[Expenses] ❌ Modal not found');
            window.WorkbenchUtils?.toast('Modal未找到，请检查页面', 'error');
            return;
        }
        
        // 显示Modal
        modal.classList.add('active');
        
        // 设置默认日期
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
        
        const categoryInput = document.getElementById('expense-category');
        if (categoryInput) categoryInput.value = '房租';
        
        console.log('[Expenses] ✅ Modal opened');
    },
    
    /**
     * 关闭支出Modal
     */
    closeExpenseModal() {
        console.log('[Expenses] Closing modal...');
        const modal = document.getElementById('expense-modal');
        if (modal) modal.classList.remove('active');
    },
    
    /**
     * 🔥 关键修复：保存支出
     */
    async saveExpense() {
        console.log('[Expenses] 💾 Saving expense...');
        
        try {
            const Utils = window.WorkbenchUtils;
            const Dashboard = window.WorkbenchDashboard;
            const Storage = window.WorkbenchStorage;
            const Config = window.WorkbenchConfig;
            
            if (!Dashboard || !Storage || !Config || !Utils) {
                throw new Error('系统模块未加载，请刷新页面');
            }
            
            // 获取表单数据
            const dateEl = document.getElementById('expense-date');
            const date = dateEl?.value;
            
            if (!date) {
                Utils.toast('请选择日期', 'warning');
                dateEl?.focus();
                return;
            }
            
            const category = document.getElementById('expense-category')?.value || '其他';
            
            const amountEl = document.getElementById('expense-amount');
            const amountStr = amountEl?.value;
            
            if (!amountStr) {
                Utils.toast('请输入金额', 'warning');
                amountEl?.focus();
                return;
            }
            
            const amount = parseFloat(amountStr);
            if (isNaN(amount) || amount <= 0) {
                Utils.toast('请输入有效金额', 'error');
                amountEl?.focus();
                return;
            }
            
            const customer = document.getElementById('expense-customer')?.value?.trim() || '';
            const notes = document.getElementById('expense-notes')?.value?.trim() || '';
            
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
            
            console.log('[Expenses] New expense:', newExpense);
            
            // 添加到数据
            Dashboard.data.expenses.push(newExpense);
            
            // 保存
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
            window.WorkbenchUtils?.toast('保存失败: ' + error.message, 'error');
        }
    },
    
    /**
     * 渲染支出列表
     */
    render() {
        console.log('[Expenses] 📊 Rendering...');
        
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
        try {
            const expense = window.WorkbenchDashboard?.data?.expenses.find(e => e.id === id);
            if (!expense) {
                window.WorkbenchUtils?.toast('支出不存在', 'error');
                return;
            }
            
            if (!confirm(`⚠️ 确定删除此支出吗？\n\n金额: ¥${expense.amount}\n类别: ${expense.category}\n\n此操作不可撤销！`)) {
                return;
            }
            
            window.WorkbenchDashboard.data.expenses = window.WorkbenchDashboard.data.expenses.filter(
                e => e.id !== id
            );
            
            await window.WorkbenchStorage.save(
                window.WorkbenchConfig.STORAGE_KEYS.EXPENSES,
                window.WorkbenchDashboard.data.expenses
            );
            
            this.render();
            window.WorkbenchDashboard.updateDashboard();
            window.WorkbenchUtils?.toast('✅ 支出已删除', 'success');
            
        } catch (error) {
            console.error('[Expenses] ❌ Delete failed:', error);
            window.WorkbenchUtils?.toast('删除失败: ' + error.message, 'error');
        }
    }
};

// 🔥 立即挂载到全局
window.WorkbenchCRM = WorkbenchCRM;
window.WorkbenchExpenses = WorkbenchExpenses;
console.log('✅ [CRM] Module loaded and mounted to window');
console.log('✅ [Expenses] Module loaded and mounted to window');
