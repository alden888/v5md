/**
 * V14.2 PRO - CRM & Expenses Module (Enhanced)
 * CRM客户管理 + 支出管理模块
 * @namespace WorkbenchCRM
 * @namespace WorkbenchExpenses
 */
const WorkbenchCRMExpenses = (() => {
    'use strict';

    // 配置常量
    const CONFIG = {
        STORAGE_KEYS: {
            CUSTOMERS: 'v14_customers',
            EXPENSES: 'v14_expenses'
        },
        CUSTOMER_FIELDS: [
            'name', 'contact', 'whatsapp', 'email', 'address', 
            'country', 'currency', 'notes', 'tags'
        ],
        EXPENSE_CATEGORIES: [
            '房租', '薪资', '办公费用', '差旅费', '招待费', 
            '物流费', '采购成本', '营销费用', '税费', '其他'
        ],
        CURRENCIES: [
            { code: 'CNY', name: '人民币' },
            { code: 'USD', name: '美元' },
            { code: 'EUR', name: '欧元' },
            { code: 'GBP', name: '英镑' },
            { code: 'JPY', name: '日元' },
            { code: 'KRW', name: '韩元' },
            { code: 'SGD', name: '新加坡元' },
            { code: 'MYR', name: '马来西亚林吉特' },
            { code: 'THB', name: '泰铢' },
            { code: 'IDR', name: '印尼盾' }
        ]
    };

    // CRM模块状态
    const crmState = {
        customers: [],
        currentEditId: null,
        isProcessing: false,
        searchQuery: ''
    };

    // 支出模块状态
    const expensesState = {
        expenses: [],
        currentEditId: null,
        isProcessing: false,
        filterCategory: 'all',
        dateRange: {
            start: null,
            end: null
        }
    };

    /**
     * 初始化CRM模块
     * @returns {Promise<boolean>} 是否初始化成功
     */
    async function initCRM() {
        try {
            console.log('[CRM] 🚀 初始化CRM模块...');
            
            // 加载客户数据
            await loadCustomersData();
            
            // 绑定事件
            bindCRMEvents();
            
            // 渲染客户列表
            renderCustomers();
            
            console.log('[CRM] ✅ CRM模块初始化完成', {
                customerCount: crmState.customers.length
            });
            
            return true;
        } catch (error) {
            console.error('[CRM] ❌ 初始化失败:', error);
            showError('CRM模块初始化失败');
            return false;
        }
    }

    /**
     * 初始化支出模块
     * @returns {Promise<boolean>} 是否初始化成功
     */
    async function initExpenses() {
        try {
            console.log('[Expenses] 🚀 初始化支出模块...');
            
            // 加载支出数据
            await loadExpensesData();
            
            // 绑定事件
            bindExpensesEvents();
            
            // 渲染支出列表
            renderExpenses();
            
            console.log('[Expenses] ✅ 支出模块初始化完成', {
                expenseCount: expensesState.expenses.length
            });
            
            return true;
        } catch (error) {
            console.error('[Expenses] ❌ 初始化失败:', error);
            showError('支出模块初始化失败');
            return false;
        }
    }

    /**
     * 加载客户数据
     * @returns {Promise<void>}
     */
    async function loadCustomersData() {
        try {
            // 从存储加载数据
            if (window.WorkbenchStorage) {
                crmState.customers = await window.WorkbenchStorage.loadArray(CONFIG.STORAGE_KEYS.CUSTOMERS, []);
            } else {
                crmState.customers = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CUSTOMERS) || '[]');
            }
            
            // 规范化客户数据
            crmState.customers = crmState.customers.map(normalizeCustomerData);
            
        } catch (error) {
            console.error('[CRM] ❌ 加载客户数据失败:', error);
            crmState.customers = [];
        }
    }

    /**
     * 加载支出数据
     * @returns {Promise<void>}
     */
    async function loadExpensesData() {
        try {
            // 从存储加载数据
            if (window.WorkbenchStorage) {
                expensesState.expenses = await window.WorkbenchStorage.loadArray(CONFIG.STORAGE_KEYS.EXPENSES, []);
            } else {
                expensesState.expenses = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.EXPENSES) || '[]');
            }
            
            // 规范化支出数据
            expensesState.expenses = expensesState.expenses.map(normalizeExpenseData);
            
        } catch (error) {
            console.error('[Expenses] ❌ 加载支出数据失败:', error);
            expensesState.expenses = [];
        }
    }

    /**
     * 规范化客户数据
     * @param {Object} customer - 客户数据
     * @returns {Object} 规范化后的客户数据
     */
    function normalizeCustomerData(customer) {
        const now = new Date().toISOString();
        
        return {
            id: customer.id || generateCustomerId(),
            name: customer.name || '',
            contact: customer.contact || '',
            whatsapp: customer.whatsapp || '',
            email: customer.email || '',
            address: customer.address || '',
            country: customer.country || '',
            currency: customer.currency || 'USD',
            notes: customer.notes || '',
            tags: Array.isArray(customer.tags) ? customer.tags : [],
            createdAt: customer.createdAt || now,
            updatedAt: now,
            lastContactDate: customer.lastContactDate || null,
            totalOrders: customer.totalOrders || 0,
            totalRevenue: customer.totalRevenue || 0
        };
    }

    /**
     * 规范化支出数据
     * @param {Object} expense - 支出数据
     * @returns {Object} 规范化后的支出数据
     */
    function normalizeExpenseData(expense) {
        const now = new Date().toISOString();
        const date = expense.date || now.split('T')[0];
        
        return {
            id: expense.id || generateExpenseId(),
            amount: expense.amount ? parseFloat(expense.amount.toFixed(2)) : 0,
            category: expense.category || '其他',
            description: expense.description || '',
            customer: expense.customer || '',
            date: date,
            notes: expense.notes || '',
            createdAt: expense.createdAt || now,
            updatedAt: now,
            relatedOrder: expense.relatedOrder || null,
            paymentMethod: expense.paymentMethod || 'cash'
        };
    }

    /**
     * 绑定CRM事件
     */
    function bindCRMEvents() {
        console.log('[CRM] 🎯 绑定CRM事件...');
        
        // 添加客户按钮
        const addBtn = document.getElementById('add-customer-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => openCustomerModal());
        }
        
        // 关闭模态框按钮
        const closeBtn = document.getElementById('close-customer-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCustomerModal);
        }
        
        // 保存客户按钮
        const saveBtn = document.getElementById('save-customer-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveCustomer);
        }
        
        // 搜索框事件
        const searchInput = document.getElementById('customer-search');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                crmState.searchQuery = e.target.value.toLowerCase();
                renderCustomers();
            }, 300));
        }
        
        // 模态框背景点击关闭
        const modal = document.getElementById('customer-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeCustomerModal();
                }
            });
        }
        
        console.log('[CRM] ✅ CRM事件绑定完成');
    }

    /**
     * 绑定支出事件
     */
    function bindExpensesEvents() {
        console.log('[Expenses] 🎯 绑定支出事件...');
        
        // 添加支出按钮
        const addBtn = document.getElementById('add-expense-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => openExpenseModal());
        }
        
        // 关闭模态框按钮
        const closeBtn = document.getElementById('close-expense-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeExpenseModal);
        }
        
        // 保存支出按钮
        const saveBtn = document.getElementById('save-expense-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveExpense);
        }
        
        // 类别筛选
        const categoryFilter = document.getElementById('expense-category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                expensesState.filterCategory = e.target.value;
                renderExpenses();
            });
        }
        
        // 日期范围选择
        const dateStart = document.getElementById('expense-date-start');
        const dateEnd = document.getElementById('expense-date-end');
        
        if (dateStart) {
            dateStart.addEventListener('change', (e) => {
                expensesState.dateRange.start = e.target.value;
                renderExpenses();
            });
        }
        
        if (dateEnd) {
            dateEnd.addEventListener('change', (e) => {
                expensesState.dateRange.end = e.target.value;
                renderExpenses();
            });
        }
        
        // 模态框背景点击关闭
        const modal = document.getElementById('expense-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeExpenseModal();
                }
            });
        }
        
        console.log('[Expenses] ✅ 支出事件绑定完成');
    }

    /**
     * 打开客户模态框
     * @param {string} [customerId] - 客户ID（编辑模式）
     */
    function openCustomerModal(customerId = null) {
        console.log('[CRM] 📝 打开客户模态框', { customerId });
        
        const modal = document.getElementById('customer-modal');
        if (!modal) {
            console.error('[CRM] ❌ 客户模态框未找到');
            showError('客户模态框未找到，请检查页面');
            return;
        }
        
        // 清空表单
        clearCustomerForm();
        
        // 设置当前编辑ID
        crmState.currentEditId = customerId;
        
        // 如果是编辑模式，加载客户数据
        if (customerId) {
            const customer = crmState.customers.find(c => c.id === customerId);
            if (customer) {
                populateCustomerForm(customer);
            }
        }
        
        // 显示模态框
        modal.classList.add('active');
        console.log('[CRM] ✅ 客户模态框已打开');
    }

    /**
     * 关闭客户模态框
     */
    function closeCustomerModal() {
        console.log('[CRM] 🚪 关闭客户模态框');
        
        const modal = document.getElementById('customer-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        // 重置状态
        crmState.currentEditId = null;
    }

    /**
     * 清空客户表单
     */
    function clearCustomerForm() {
        const fields = CONFIG.CUSTOMER_FIELDS;
        fields.forEach(field => {
            const element = document.getElementById(`customer-${field}`);
            if (element) {
                if (field === 'tags') {
                    element.value = '';
                } else {
                    element.value = '';
                }
            }
        });
        
        // 重置货币选择
        const currencyEl = document.getElementById('customer-currency');
        if (currencyEl) {
            currencyEl.value = 'USD';
        }
    }

    /**
     * 填充客户表单
     * @param {Object} customer - 客户数据
     */
    function populateCustomerForm(customer) {
        const fields = CONFIG.CUSTOMER_FIELDS;
        fields.forEach(field => {
            const element = document.getElementById(`customer-${field}`);
            if (element && customer[field] !== undefined) {
                if (field === 'tags' && Array.isArray(customer[field])) {
                    element.value = customer[field].join(', ');
                } else {
                    element.value = customer[field];
                }
            }
        });
    }

    /**
     * 保存客户
     */
    async function saveCustomer() {
        if (crmState.isProcessing) return;
        
        try {
            crmState.isProcessing = true;
            
            // 获取表单数据
            const formData = getCustomerFormData();
            
            // 验证数据
            validateCustomerData(formData);
            
            // 处理标签
            if (formData.tags) {
                formData.tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            }
            
            let result;
            
            if (crmState.currentEditId) {
                // 编辑模式
                result = await updateCustomer(crmState.currentEditId, formData);
            } else {
                // 新增模式
                result = await addCustomer(formData);
            }
            
            if (result) {
                closeCustomerModal();
                renderCustomers();
                showSuccess(`客户 ${formData.name} 已${crmState.currentEditId ? '更新' : '添加'}`);
            }
            
        } catch (error) {
            console.error('[CRM] ❌ 保存客户失败:', error);
            showError(`保存客户失败: ${error.message}`);
        } finally {
            crmState.isProcessing = false;
        }
    }

    /**
     * 获取客户表单数据
     * @returns {Object} 表单数据
     */
    function getCustomerFormData() {
        const formData = {};
        const fields = CONFIG.CUSTOMER_FIELDS;
        
        fields.forEach(field => {
            const element = document.getElementById(`customer-${field}`);
            if (element) {
                formData[field] = element.value;
            }
        });
        
        return formData;
    }

    /**
     * 验证客户数据
     * @param {Object} data - 客户数据
     * @throws {Error} 验证失败时抛出错误
     */
    function validateCustomerData(data) {
        if (!data.name || data.name.trim() === '') {
            throw new Error('客户名称不能为空');
        }
        
        if (data.email && data.email.trim() !== '' && !isValidEmail(data.email)) {
            throw new Error('请输入有效的邮箱地址');
        }
    }

    /**
     * 添加客户
     * @param {Object} customerData - 客户数据
     * @returns {Promise<Object>} 添加的客户
     */
    async function addCustomer(customerData) {
        try {
            const newCustomer = normalizeCustomerData({
                ...customerData,
                id: generateCustomerId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            
            crmState.customers.unshift(newCustomer);
            await saveCustomersData();
            
            return newCustomer;
        } catch (error) {
            console.error('[CRM] ❌ 添加客户失败:', error);
            throw error;
        }
    }

    /**
     * 更新客户
     * @param {string} customerId - 客户ID
     * @param {Object} updates - 更新数据
     * @returns {Promise<Object|null>} 更新后的客户
     */
    async function updateCustomer(customerId, updates) {
        try {
            const index = crmState.customers.findIndex(c => c.id === customerId);
            if (index === -1) {
                throw new Error('客户不存在');
            }
            
            const updatedCustomer = normalizeCustomerData({
                ...crmState.customers[index],
                ...updates,
                updatedAt: new Date().toISOString()
            });
            
            crmState.customers[index] = updatedCustomer;
            await saveCustomersData();
            
            return updatedCustomer;
        } catch (error) {
            console.error('[CRM] ❌ 更新客户失败:', error);
            throw error;
        }
    }

    /**
     * 删除客户
     * @param {string} customerId - 客户ID
     * @returns {Promise<boolean>} 是否成功
     */
    async function deleteCustomer(customerId) {
        if (crmState.isProcessing) return false;
        
        // 安全确认
        if (!confirm('⚠️ 警告！\n\n确定删除此客户吗？\n此操作将同时删除该客户的所有相关数据！')) {
            return false;
        }
        
        try {
            crmState.isProcessing = true;
            
            const initialCount = crmState.customers.length;
            crmState.customers = crmState.customers.filter(c => c.id !== customerId);
            
            if (crmState.customers.length === initialCount) {
                throw new Error('客户删除失败，未找到对应客户');
            }
            
            await saveCustomersData();
            renderCustomers();
            
            showSuccess('客户已成功删除');
            return true;
        } catch (error) {
            console.error('[CRM] ❌ 删除客户失败:', error);
            showError(`删除客户失败: ${error.message}`);
            return false;
        } finally {
            crmState.isProcessing = false;
        }
    }

    /**
     * 保存客户数据
     * @returns {Promise<boolean>} 是否成功
     */
    async function saveCustomersData() {
        try {
            if (window.WorkbenchStorage) {
                await window.WorkbenchStorage.save(CONFIG.STORAGE_KEYS.CUSTOMERS, crmState.customers);
            } else {
                localStorage.setItem(CONFIG.STORAGE_KEYS.CUSTOMERS, JSON.stringify(crmState.customers));
            }
            
            // 更新仪表盘
            if (window.WorkbenchDashboard && typeof window.WorkbenchDashboard.updateDashboard === 'function') {
                window.WorkbenchDashboard.updateDashboard();
            }
            
            return true;
        } catch (error) {
            console.error('[CRM] ❌ 保存客户数据失败:', error);
            return false;
        }
    }

    /**
     * 渲染客户列表
     */
    function renderCustomers() {
        console.log('[CRM] 📊 渲染客户列表...');
        
        const tableBody = document.getElementById('customer-list');
        if (!tableBody) {
            console.error('[CRM] ❌ 客户列表容器未找到');
            return;
        }
        
        // 过滤客户
        let filteredCustomers = [...crmState.customers];
        
        if (crmState.searchQuery) {
            const query = crmState.searchQuery.toLowerCase();
            filteredCustomers = filteredCustomers.filter(customer => 
                customer.name.toLowerCase().includes(query) ||
                customer.contact.toLowerCase().includes(query) ||
                customer.email.toLowerCase().includes(query) ||
                customer.country.toLowerCase().includes(query) ||
                customer.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        
        // 按名称排序
        filteredCustomers.sort((a, b) => a.name.localeCompare(b.name));
        
        if (filteredCustomers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-gray-500 py-8">
                        <div class="text-4xl mb-2">👥</div>
                        <div class="text-sm">暂无客户数据</div>
                        <button onclick="WorkbenchCRM.openCustomerModal()" 
                                class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                            添加第一个客户
                        </button>
                    </td>
                </tr>
            `;
            return;
        }
        
        tableBody.innerHTML = filteredCustomers.map(customer => `
            <tr class="hover:bg-gray-800 transition">
                <td class="p-4">${customer.name}</td>
                <td class="p-4">${customer.contact || '-'}</td>
                <td class="p-4">${customer.email || '-'}</td>
                <td class="p-4">${customer.country || '-'}</td>
                <td class="p-4">${customer.currency}</td>
                <td class="p-4">
                    ${customer.tags.map(tag => 
                        `<span class="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs mr-1">${tag}</span>`
                    ).join('') || '-'}
                </td>
                <td class="p-4 text-center">
                    <div class="flex justify-center space-x-2">
                        <button onclick="WorkbenchCRM.openCustomerModal('${customer.id}')" 
                                class="text-blue-500 hover:text-blue-400">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="WorkbenchCRM.deleteCustomer('${customer.id}')" 
                                class="text-red-500 hover:text-red-400">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        
        console.log(`[CRM] ✅ 渲染完成，显示 ${filteredCustomers.length} 个客户`);
    }

    /**
     * 打开支出模态框
     * @param {string} [expenseId] - 支出ID（编辑模式）
     */
    function openExpenseModal(expenseId = null) {
        console.log('[Expenses] 📝 打开支出模态框', { expenseId });
        
        const modal = document.getElementById('expense-modal');
        if (!modal) {
            console.error('[Expenses] ❌ 支出模态框未找到');
            showError('支出模态框未找到，请检查页面');
            return;
        }
        
        // 清空表单
        clearExpenseForm();
        
        // 设置当前编辑ID
        expensesState.currentEditId = expenseId;
        
        // 如果是编辑模式，加载支出数据
        if (expenseId) {
            const expense = expensesState.expenses.find(e => e.id === expenseId);
            if (expense) {
                populateExpenseForm(expense);
            }
        } else {
            // 设置默认日期为今天
            const today = new Date().toISOString().split('T')[0];
            const dateInput = document.getElementById('expense-date');
            if (dateInput) {
                dateInput.value = today;
            }
        }
        
        // 显示模态框
        modal.classList.add('active');
        console.log('[Expenses] ✅ 支出模态框已打开');
    }

    /**
     * 关闭支出模态框
     */
    function closeExpenseModal() {
        console.log('[Expenses] 🚪 关闭支出模态框');
        
        const modal = document.getElementById('expense-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        // 重置状态
        expensesState.currentEditId = null;
    }

    /**
     * 清空支出表单
     */
    function clearExpenseForm() {
        const fields = ['amount', 'description', 'customer', 'notes', 'related-order'];
        fields.forEach(field => {
            const element = document.getElementById(`expense-${field}`);
            if (element) {
                element.value = '';
            }
        });
        
        // 重置类别和支付方式
        const categoryEl = document.getElementById('expense-category');
        const paymentEl = document.getElementById('expense-payment-method');
        
        if (categoryEl) categoryEl.value = '其他';
        if (paymentEl) paymentEl.value = 'cash';
    }

    /**
     * 填充支出表单
     * @param {Object} expense - 支出数据
     */
    function populateExpenseForm(expense) {
        const fields = ['amount', 'description', 'customer', 'notes', 'related-order'];
        fields.forEach(field => {
            const element = document.getElementById(`expense-${field}`);
            if (element && expense[field] !== undefined) {
                element.value = expense[field];
            }
        });
        
        // 设置日期
        const dateInput = document.getElementById('expense-date');
        if (dateInput && expense.date) {
            dateInput.value = expense.date;
        }
        
        // 设置类别和支付方式
        const categoryEl = document.getElementById('expense-category');
        const paymentEl = document.getElementById('expense-payment-method');
        
        if (categoryEl && expense.category) {
            categoryEl.value = expense.category;
        }
        
        if (paymentEl && expense.paymentMethod) {
            paymentEl.value = expense.paymentMethod;
        }
    }

    /**
     * 保存支出
     */
    async function saveExpense() {
        if (expensesState.isProcessing) return;
        
        try {
            expensesState.isProcessing = true;
            
            // 获取表单数据
            const formData = getExpenseFormData();
            
            // 验证数据
            validateExpenseData(formData);
            
            let result;
            
            if (expensesState.currentEditId) {
                // 编辑模式
                result = await updateExpense(expensesState.currentEditId, formData);
            } else {
                // 新增模式
                result = await addExpense(formData);
            }
            
            if (result) {
                closeExpenseModal();
                renderExpenses();
                showSuccess(`支出 ¥${formData.amount} 已${expensesState.currentEditId ? '更新' : '记录'}`);
                
                // 更新仪表盘
                if (window.WorkbenchDashboard && typeof window.WorkbenchDashboard.updateDashboard === 'function') {
                    window.WorkbenchDashboard.updateDashboard();
                }
            }
            
        } catch (error) {
            console.error('[Expenses] ❌ 保存支出失败:', error);
            showError(`保存支出失败: ${error.message}`);
        } finally {
            expensesState.isProcessing = false;
        }
    }

    /**
     * 获取支出表单数据
     * @returns {Object} 表单数据
     */
    function getExpenseFormData() {
        return {
            amount: parseFloat(document.getElementById('expense-amount')?.value || 0),
            category: document.getElementById('expense-category')?.value || '其他',
            description: document.getElementById('expense-description')?.value || '',
            customer: document.getElementById('expense-customer')?.value || '',
            date: document.getElementById('expense-date')?.value || new Date().toISOString().split('T')[0],
            notes: document.getElementById('expense-notes')?.value || '',
            relatedOrder: document.getElementById('expense-related-order')?.value || null,
            paymentMethod: document.getElementById('expense-payment-method')?.value || 'cash'
        };
    }

    /**
     * 验证支出数据
     * @param {Object} data - 支出数据
     * @throws {Error} 验证失败时抛出错误
     */
    function validateExpenseData(data) {
        if (!data.amount || data.amount <= 0) {
            throw new Error('支出金额必须大于0');
        }
        
        if (!data.category || !CONFIG.EXPENSE_CATEGORIES.includes(data.category)) {
            throw new Error('请选择有效的支出类别');
        }
        
        if (!data.date) {
            throw new Error('请选择支出日期');
        }
    }

    /**
     * 添加支出
     * @param {Object} expenseData - 支出数据
     * @returns {Promise<Object>} 添加的支出
     */
    async function addExpense(expenseData) {
        try {
            const newExpense = normalizeExpenseData({
                ...expenseData,
                id: generateExpenseId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            
            expensesState.expenses.unshift(newExpense);
            await saveExpensesData();
            
            return newExpense;
        } catch (error) {
            console.error('[Expenses] ❌ 添加支出失败:', error);
            throw error;
        }
    }

    /**
     * 更新支出
     * @param {string} expenseId - 支出ID
     * @param {Object} updates - 更新数据
     * @returns {Promise<Object|null>} 更新后的支出
     */
    async function updateExpense(expenseId, updates) {
        try {
            const index = expensesState.expenses.findIndex(e => e.id === expenseId);
            if (index === -1) {
                throw new Error('支出不存在');
            }
            
            const updatedExpense = normalizeExpenseData({
                ...expensesState.expenses[index],
                ...updates,
                updatedAt: new Date().toISOString()
            });
            
            expensesState.expenses[index] = updatedExpense;
            await saveExpensesData();
            
            return updatedExpense;
        } catch (error) {
            console.error('[Expenses] ❌ 更新支出失败:', error);
            throw error;
        }
    }

    /**
     * 删除支出
     * @param {string} expenseId - 支出ID
     * @returns {Promise<boolean>} 是否成功
     */
    async function deleteExpense(expenseId) {
        if (expensesState.isProcessing) return false;
        
        const expense = expensesState.expenses.find(e => e.id === expenseId);
        if (!expense) {
            showError('支出不存在');
            return false;
        }
        
        // 安全确认
        if (!confirm(`⚠️ 确定删除此支出吗？\n\n金额: ¥${expense.amount}\n类别: ${expense.category}\n日期: ${expense.date}\n\n此操作不可撤销！`)) {
            return false;
        }
        
        try {
            expensesState.isProcessing = true;
            
            const initialCount = expensesState.expenses.length;
            expensesState.expenses = expensesState.expenses.filter(e => e.id !== expenseId);
            
            if (expensesState.expenses.length === initialCount) {
                throw new Error('支出删除失败，未找到对应支出');
            }
            
            await saveExpensesData();
            renderExpenses();
            
            // 更新仪表盘
            if (window.WorkbenchDashboard && typeof window.WorkbenchDashboard.updateDashboard === 'function') {
                window.WorkbenchDashboard.updateDashboard();
            }
            
            showSuccess('支出已成功删除');
            return true;
        } catch (error) {
            console.error('[Expenses] ❌ 删除支出失败:', error);
            showError(`删除支出失败: ${error.message}`);
            return false;
        } finally {
            expensesState.isProcessing = false;
        }
    }

    /**
     * 保存支出数据
     * @returns {Promise<boolean>} 是否成功
     */
    async function saveExpensesData() {
        try {
            if (window.WorkbenchStorage) {
                await window.WorkbenchStorage.save(CONFIG.STORAGE_KEYS.EXPENSES, expensesState.expenses);
            } else {
                localStorage.setItem(CONFIG.STORAGE_KEYS.EXPENSES, JSON.stringify(expensesState.expenses));
            }
            
            return true;
        } catch (error) {
            console.error('[Expenses] ❌ 保存支出数据失败:', error);
            return false;
        }
    }

    /**
     * 渲染支出列表
     */
    function renderExpenses() {
        console.log('[Expenses] 📊 渲染支出列表...');
        
        const tableBody = document.getElementById('expense-list');
        if (!tableBody) {
            console.error('[Expenses] ❌ 支出列表容器未找到');
            return;
        }
        
        // 过滤支出
        let filteredExpenses = [...expensesState.expenses];
        
        // 类别筛选
        if (expensesState.filterCategory !== 'all') {
            filteredExpenses = filteredExpenses.filter(
                expense => expense.category === expensesState.filterCategory
            );
        }
        
        // 日期范围筛选
        if (expensesState.dateRange.start) {
            filteredExpenses = filteredExpenses.filter(
                expense => new Date(expense.date) >= new Date(expensesState.dateRange.start)
            );
        }
        
        if (expensesState.dateRange.end) {
            filteredExpenses = filteredExpenses.filter(
                expense => new Date(expense.date) <= new Date(expensesState.dateRange.end)
            );
        }
        
        // 按日期排序（最新在前）
        filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (filteredExpenses.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-gray-500 py-8">
                        <div class="text-4xl mb-2">💸</div>
                        <div class="text-sm">暂无支出记录</div>
                        <button onclick="WorkbenchExpenses.openExpenseModal()" 
                                class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                            记录第一笔支出
                        </button>
                    </td>
                </tr>
            `;
            return;
        }
        
        // 计算统计数据
        const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        const categoryStats = {};
        
        filteredExpenses.forEach(expense => {
            categoryStats[expense.category] = (categoryStats[expense.category] || 0) + expense.amount;
        });
        
        // 更新统计信息
        updateExpenseStats(totalAmount, categoryStats);
        
        tableBody.innerHTML = filteredExpenses.map(expense => `
            <tr class="hover:bg-gray-800 transition">
                <td class="p-4">${expense.date}</td>
                <td class="p-4">
                    <span class="bg-gray-800 px-2 py-1 rounded text-xs">${expense.category}</span>
                </td>
                <td class="p-4 font-bold text-red-400">¥${formatNumber(expense.amount)}</td>
                <td class="p-4 text-gray-400">${expense.customer || '-'}</td>
                <td class="p-4 text-sm text-gray-400">${expense.description || '-'}</td>
                <td class="p-4 text-center">
                    <div class="flex justify-center space-x-2">
                        <button onclick="WorkbenchExpenses.openExpenseModal('${expense.id}')" 
                                class="text-blue-500 hover:text-blue-400">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="WorkbenchExpenses.deleteExpense('${expense.id}')" 
                                class="text-red-500 hover:text-red-400">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        
        console.log(`[Expenses] ✅ 渲染完成，显示 ${filteredExpenses.length} 笔支出，总计 ¥${formatNumber(totalAmount)}`);
    }

    /**
     * 更新支出统计信息
     * @param {number} totalAmount - 总金额
     * @param {Object} categoryStats - 类别统计
     */
    function updateExpenseStats(totalAmount, categoryStats) {
        const statsElement = document.getElementById('expense-stats');
        if (!statsElement) return;
        
        // 转换为数组并排序
        const categoryArray = Object.entries(categoryStats)
            .map(([category, amount]) => ({ category, amount }))
            .sort((a, b) => b.amount - a.amount);
        
        statsElement.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div class="text-sm text-gray-400 mb-1">总支出</div>
                    <div class="text-2xl font-bold text-red-400">¥${formatNumber(totalAmount)}</div>
                </div>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div class="text-sm text-gray-400 mb-1">支出笔数</div>
                    <div class="text-2xl font-bold text-white">${expensesState.expenses.length} 笔</div>
                </div>
                <div class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div class="text-sm text-gray-400 mb-1">平均每笔</div>
                    <div class="text-2xl font-bold text-white">
                        ¥${formatNumber(expensesState.expenses.length > 0 ? totalAmount / expensesState.expenses.length : 0)}
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
                <div class="text-sm text-gray-400 mb-2">支出分类占比</div>
                <div class="space-y-2">
                    ${categoryArray.map(({ category, amount }) => {
                        const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
                        return `
                            <div class="flex items-center">
                                <div class="w-24 text-sm">${category}</div>
                                <div class="flex-1 bg-gray-700 rounded-full h-2 mr-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${percentage}%"></div>
                                </div>
                                <div class="w-24 text-right text-sm">
                                    ¥${formatNumber(amount)} (${percentage.toFixed(1)}%)
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 生成客户ID
     * @returns {string} 客户ID
     */
    function generateCustomerId() {
        return `CUST-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    }

    /**
     * 生成支出ID
     * @returns {string} 支出ID
     */
    function generateExpenseId() {
        return `EXP-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    }

    /**
     * 格式化数字
     * @param {number} num - 数字
     * @returns {string} 格式化后的数字
     */
    function formatNumber(num) {
        if (isNaN(num)) return '0';
        return num.toLocaleString('zh-CN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    /**
     * 验证邮箱格式
     * @param {string} email - 邮箱地址
     * @returns {boolean} 是否有效
     */
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * 防抖函数
     * @param {Function} func - 函数
     * @param {number} wait - 等待时间
     * @returns {Function} 防抖函数
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * 显示成功消息
     * @param {string} message - 消息内容
     */
    function showSuccess(message) {
        if (window.WorkbenchUtils && typeof window.WorkbenchUtils.toast === 'function') {
            window.WorkbenchUtils.toast(message, 'success');
        } else {
            alert(message);
        }
    }

    /**
     * 显示错误消息
     * @param {string} message - 消息内容
     */
    function showError(message) {
        if (window.WorkbenchUtils && typeof window.WorkbenchUtils.toast === 'function') {
            window.WorkbenchUtils.toast(message, 'error');
        } else {
            alert(`错误: ${message}`);
        }
    }

    /**
     * 初始化模块
     * @returns {Promise<boolean>} 是否成功
     */
    async function init() {
        try {
            console.log('[CRM-Expenses] 🚀 初始化CRM和支出模块...');
            
            // 并行初始化两个模块
            const [crmSuccess, expensesSuccess] = await Promise.all([
                initCRM(),
                initExpenses()
            ]);
            
            console.log('[CRM-Expenses] ✅ 模块初始化完成', {
                crmSuccess,
                expensesSuccess
            });
            
            return crmSuccess && expensesSuccess;
        } catch (error) {
            console.error('[CRM-Expenses] ❌ 初始化失败:', error);
            return false;
        }
    }

    // CRM公共API
    const crmAPI = {
        init: initCRM,
        openCustomerModal,
        closeCustomerModal,
        saveCustomer,
        deleteCustomer,
        renderCustomers,
        getCustomers: () => [...crmState.customers],
        getCustomerById: (id) => crmState.customers.find(c => c.id === id) || null
    };

    // 支出公共API
    const expensesAPI = {
        init: initExpenses,
        openExpenseModal,
        closeExpenseModal,
        saveExpense,
        deleteExpense,
        renderExpenses,
        getExpenses: () => [...expensesState.expenses],
        getExpenseById: (id) => expensesState.expenses.find(e => e.id === id) || null,
        calculateExpenseStats: () => {
            const totalAmount = expensesState.expenses.reduce((sum, expense) => sum + expense.amount, 0);
            return {
                totalAmount,
                count: expensesState.expenses.length,
                average: expensesState.expenses.length > 0 ? totalAmount / expensesState.expenses.length : 0
            };
        }
    };

    // 自动初始化
    document.addEventListener('DOMContentLoaded', async () => {
        window.WorkbenchCRM = crmAPI;
        window.WorkbenchExpenses = expensesAPI;
        await init();
        console.log('✅ [CRM-Expenses] V14.2 Enhanced 模块已加载并初始化');
    });

    return {
        CRM: crmAPI,
        Expenses: expensesAPI,
        init
    };
})();

// 兼容旧版API
window.WorkbenchCRM = WorkbenchCRMExpenses.CRM;
window.WorkbenchExpenses = WorkbenchCRMExpenses.Expenses;

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchCRMExpenses;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchCRMExpenses);
}