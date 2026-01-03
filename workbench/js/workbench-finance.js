/**
 * 财务模块 - 完整优化版
 * 包含收入管理、金额校验、数据持久化
 */
// 全局状态初始化（兜底）
const workbenchFinanceState = window.workbenchFinanceState || {
    incomes: JSON.parse(localStorage.getItem('workbench_incomes')) || [],
    expenses: JSON.parse(localStorage.getItem('workbench_expenses')) || []
};

// 全局工具类兜底
const WorkbenchUtils = window.WorkbenchUtils || {
    toast: (message, type) => console.log(`[Toast] ${type}: ${message}`)
};

/**
 * 保存财务数据到本地存储（核心持久化方法）
 */
async function saveFinancialData() {
    try {
        localStorage.setItem('workbench_incomes', JSON.stringify(workbenchFinanceState.incomes));
        localStorage.setItem('workbench_expenses', JSON.stringify(workbenchFinanceState.expenses));
        console.log('[Finance] 财务数据已保存');
        return true;
    } catch (error) {
        console.error('[Finance] 保存财务数据失败:', error);
        WorkbenchUtils.toast(`保存财务数据失败：${error.message}`, 'error');
        return false;
    }
}

/**
 * 更新收入记录
 * @param {string} id - 记录ID
 * @param {Object} updates - 更新内容
 * @returns {Promise<Object|null>} 更新后的记录
 */
async function updateIncome(id, updates) {
    // 前置参数校验
    if (!id || typeof id !== 'string') {
        const errMsg = '收入记录ID必须为非空字符串';
        WorkbenchUtils.toast(errMsg, 'error');
        throw new Error(errMsg);
    }

    if (!updates || typeof updates !== 'object' || Array.isArray(updates)) {
        const errMsg = '更新内容必须为非数组对象';
        WorkbenchUtils.toast(errMsg, 'error');
        throw new Error(errMsg);
    }

    try {
        // 查找记录
        const index = workbenchFinanceState.incomes.findIndex(inc => inc.id === id);
        if (index === -1) {
            throw new Error(`收入记录 ${id} 不存在`);
        }

        // 合并更新数据
        const updatedIncome = {
            ...workbenchFinanceState.incomes[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        // 增强金额验证：非数字/<=0 都报错
        if (updatedIncome.amount !== undefined) {
            const amount = Number(updatedIncome.amount);
            if (isNaN(amount) || amount <= 0) {
                throw new Error('收入金额必须是大于0的有效数字');
            }
            updatedIncome.amount = amount; // 统一转为数字类型
        }

        // 更新状态
        workbenchFinanceState.incomes[index] = updatedIncome;
        
        // 保存数据（兼容异步）
        await saveFinancialData();

        WorkbenchUtils.toast(`收入记录已更新`, 'success');
        return updatedIncome;
    } catch (error) {
        console.error('[Finance] 更新收入失败:', error);
        WorkbenchUtils.toast(`更新收入失败: ${error.message}`, 'error');
        return null;
    }
}

/**
 * 添加收入记录
 * @param {Object} incomeData - 收入数据
 * @returns {Promise<Object|null>} 添加的记录
 */
async function addIncome(incomeData) {
    try {
        // 校验必填项
        if (!incomeData || typeof incomeData !== 'object') {
            throw new Error('收入数据必须为对象');
        }
        if (!incomeData.name || typeof incomeData.name !== 'string' || !incomeData.name.trim()) {
            throw new Error('收入名称不能为空');
        }
        const amount = Number(incomeData.amount);
        if (isNaN(amount) || amount <= 0) {
            throw new Error('收入金额必须是大于0的有效数字');
        }

        // 构建收入记录
        const newIncome = {
            id: `income_${Date.now()}`,
            name: incomeData.name.trim(),
            amount: amount,
            type: incomeData.type || '其他',
            date: incomeData.date || new Date().toISOString(),
            remark: incomeData.remark || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // 添加到状态并保存
        workbenchFinanceState.incomes.push(newIncome);
        await saveFinancialData();

        WorkbenchUtils.toast('收入记录添加成功', 'success');
        return newIncome;
    } catch (error) {
        console.error('[Finance] 添加收入失败:', error);
        WorkbenchUtils.toast(`添加收入失败: ${error.message}`, 'error');
        return null;
    }
}

/**
 * 删除收入记录
 * @param {string} id - 记录ID
 * @returns {Promise<boolean>} 删除结果
 */
async function deleteIncome(id) {
    try {
        if (!id || typeof id !== 'string') {
            throw new Error('收入记录ID必须为非空字符串');
        }

        const initialLength = workbenchFinanceState.incomes.length;
        workbenchFinanceState.incomes = workbenchFinanceState.incomes.filter(inc => inc.id !== id);

        // 校验是否删除成功
        if (workbenchFinanceState.incomes.length === initialLength) {
            throw new Error(`收入记录 ${id} 不存在`);
        }

        await saveFinancialData();
        WorkbenchUtils.toast('收入记录已删除', 'success');
        return true;
    } catch (error) {
        console.error('[Finance] 删除收入失败:', error);
        WorkbenchUtils.toast(`删除收入失败: ${error.message}`, 'error');
        return false;
    }
}

/**
 * 获取收入记录列表（支持过滤）
 * @param {Object} filters - 过滤条件
 * @returns {Array} 过滤后的收入记录
 */
function getIncomes(filters = {}) {
    try {
        let result = [...workbenchFinanceState.incomes];

        // 按类型过滤
        if (filters.type && typeof filters.type === 'string') {
            result = result.filter(inc => inc.type === filters.type);
        }

        // 按日期范围过滤
        if (filters.startDate && filters.endDate) {
            const start = new Date(filters.startDate);
            const end = new Date(filters.endDate);
            if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                result = result.filter(inc => {
                    const date = new Date(inc.date);
                    return date >= start && date <= end;
                });
            }
        }

        // 按金额范围过滤
        if (filters.minAmount || filters.maxAmount) {
            const min = Number(filters.minAmount) || 0;
            const max = Number(filters.maxAmount) || Infinity;
            result = result.filter(inc => inc.amount >= min && inc.amount <= max);
        }

        // 排序（默认按日期降序）
        result.sort((a, b) => new Date(b.date) - new Date(a.date));

        return result;
    } catch (error) {
        console.error('[Finance] 获取收入记录失败:', error);
        WorkbenchUtils.toast(`获取收入记录失败: ${error.message}`, 'error');
        return [];
    }
}

/**
 * 渲染收入列表
 */
function renderIncomes(filters = {}) {
    const incomes = getIncomes(filters);
    const container = document.getElementById('incomes-list');

    if (!container) {
        console.warn('[Finance] 收入列表容器未找到');
        return;
    }

    // 空数据处理
    if (incomes.length === 0) {
        container.innerHTML = '<div class="text-gray-400 text-center py-8">暂无收入记录</div>';
        return;
    }

    // 渲染收入项
    container.innerHTML = incomes.map(income => `
        <div class="bg-gray-800 rounded p-4 mb-3" data-id="${income.id}">
            <div class="flex justify-between items-center">
                <h4 class="text-white font-medium">${income.name}</h4>
                <span class="text-green-500 font-bold">¥${income.amount.toFixed(2)}</span>
            </div>
            <p class="text-gray-400 text-sm mt-1">类型：${income.type || '其他'}</p>
            <p class="text-gray-400 text-sm">日期：${formatDate(income.date)}</p>
            <p class="text-gray-500 text-xs mt-1">备注：${income.remark || '无'}</p>
            <div class="flex space-x-2 mt-3">
                <button class="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded" onclick="editIncome('${income.id}')">编辑</button>
                <button class="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded" onclick="deleteIncome('${income.id}')">删除</button>
            </div>
        </div>
    `).join('');
}

/**
 * 辅助：格式化日期
 * @param {string} dateStr - 日期字符串
 * @returns {string} 格式化后的日期
 */
function formatDate(dateStr) {
    if (!dateStr) return '未知日期';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '未知日期' : date.toLocaleDateString('zh-CN');
}

/**
 * 绑定收入模块事件
 */
function bindFinanceEvents() {
    // 添加收入按钮
    const addIncomeBtn = document.getElementById('add-income-btn');
    if (addIncomeBtn) {
        addIncomeBtn.addEventListener('click', async () => {
            // 模拟从表单获取数据（实际项目替换为真实表单值）
            const incomeData = {
                name: document.getElementById('income-name')?.value?.trim() || '',
                amount: document.getElementById('income-amount')?.value || 0,
                type: document.getElementById('income-type')?.value || '其他',
                remark: document.getElementById('income-remark')?.value?.trim() || ''
            };
            await addIncome(incomeData);
            renderIncomes();
        });
    }

    // 收入筛选按钮
    const filterIncomeBtn = document.getElementById('filter-income-btn');
    if (filterIncomeBtn) {
        filterIncomeBtn.addEventListener('click', () => {
            const filters = {
                type: document.getElementById('income-filter-type')?.value,
                startDate: document.getElementById('income-filter-start')?.value,
                endDate: document.getElementById('income-filter-end')?.value,
                minAmount: document.getElementById('income-filter-min')?.value,
                maxAmount: document.getElementById('income-filter-max')?.value
            };
            renderIncomes(filters);
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    bindFinanceEvents();
    renderIncomes();
});

// 暴露全局方法（供HTML直接调用）
window.addIncome = addIncome;
window.updateIncome = updateIncome;
window.deleteIncome = deleteIncome;
window.getIncomes = getIncomes;
window.renderIncomes = renderIncomes;
window.saveFinancialData = saveFinancialData;