/**
 * V14.2 ERP - Finance Module
 * 财务模块：支出管理 + 收入管理 + 利润计算 + 报表分析
 * @namespace WorkbenchFinance
 */
const WorkbenchFinance = (() => {
    'use strict';

    // 配置常量
    const CONFIG = {
        STORAGE_KEY_EXPENSES: 'v14_finance_expenses',
        STORAGE_KEY_INCOMES: 'v14_finance_incomes',
        STORAGE_KEY_BUDGETS: 'v14_finance_budgets',
        DEFAULT_CURRENCY: 'CNY',
        DECIMAL_PRECISION: 2,
        TAX_RATE: 0.13 // 13% 税率
    };

    // 财务分类
    const CATEGORIES = {
        EXPENSE: [
            '房租', '薪资', '办公费用', '差旅费', '招待费', 
            '物流费', '采购成本', '营销费用', '税费', '其他'
        ],
        INCOME: [
            '销售收入', '服务收入', '投资收益', '退款收入', '其他收入'
        ]
    };

    // 状态管理
    const state = {
        expenses: [],
        incomes: [],
        budgets: {},
        isInitialized: false
    };

    /**
     * 初始化财务模块
     * @returns {Promise<boolean>} 是否初始化成功
     */
    async function init() {
        if (state.isInitialized) return true;

        try {
            console.log('[Finance] 初始化财务模块...');
            
            // 加载财务数据
            await loadFinancialData();
            
            state.isInitialized = true;
            console.log('[Finance] 财务模块初始化完成', {
                expensesCount: state.expenses.length,
                incomesCount: state.incomes.length,
                budgetsCount: Object.keys(state.budgets).length
            });
            
            return true;
        } catch (error) {
            console.error('[Finance] 初始化失败:', error);
            return false;
        }
    }

    /**
     * 加载财务数据
     * @returns {Promise<void>}
     */
    async function loadFinancialData() {
        try {
            // 使用存储模块加载数据
            if (WorkbenchStorage) {
                state.expenses = await WorkbenchStorage.loadArray(CONFIG.STORAGE_KEY_EXPENSES, []);
                state.incomes = await WorkbenchStorage.loadArray(CONFIG.STORAGE_KEY_INCOMES, []);
                state.budgets = await WorkbenchStorage.loadObject(CONFIG.STORAGE_KEY_BUDGETS, {});
            } else {
                // 降级到localStorage
                state.expenses = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_EXPENSES) || '[]');
                state.incomes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_INCOMES) || '[]');
                state.budgets = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_BUDGETS) || '{}');
            }
        } catch (error) {
            console.error('[Finance] 加载财务数据失败:', error);
            // 使用默认值
            state.expenses = [];
            state.incomes = [];
            state.budgets = {};
        }
    }

    /**
     * 保存财务数据
     * @returns {Promise<boolean>} 是否成功
     */
    async function saveFinancialData() {
        try {
            if (WorkbenchStorage) {
                await WorkbenchStorage.save(CONFIG.STORAGE_KEY_EXPENSES, state.expenses);
                await WorkbenchStorage.save(CONFIG.STORAGE_KEY_INCOMES, state.incomes);
                await WorkbenchStorage.save(CONFIG.STORAGE_KEY_BUDGETS, state.budgets);
            } else {
                localStorage.setItem(CONFIG.STORAGE_KEY_EXPENSES, JSON.stringify(state.expenses));
                localStorage.setItem(CONFIG.STORAGE_KEY_INCOMES, JSON.stringify(state.incomes));
                localStorage.setItem(CONFIG.STORAGE_KEY_BUDGETS, JSON.stringify(state.budgets));
            }
            return true;
        } catch (error) {
            console.error('[Finance] 保存财务数据失败:', error);
            return false;
        }
    }

    /**
     * 添加支出记录
     * @param {Object} expense - 支出记录
     * @returns {Promise<Object>} 添加的记录
     */
    async function addExpense(expense) {
        try {
            // 参数验证
            if (!expense || typeof expense !== 'object') {
                throw new Error('支出记录必须是对象');
            }

            if (!expense.amount || expense.amount <= 0) {
                throw new Error('支出金额必须大于0');
            }

            if (!expense.category || !CATEGORIES.EXPENSE.includes(expense.category)) {
                throw new Error('无效的支出分类');
            }

            // 创建完整的支出记录
            const newExpense = {
                id: generateId('EXP'),
                amount: parseFloat(expense.amount.toFixed(CONFIG.DECIMAL_PRECISION)),
                category: expense.category,
                description: expense.description || '',
                date: expense.date || new Date().toISOString().split('T')[0],
                relatedOrder: expense.relatedOrder || null,
                relatedCustomer: expense.relatedCustomer || null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // 添加到数组
            state.expenses.unshift(newExpense);
            
            // 保存数据
            await saveFinancialData();

            // 显示成功消息
            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`支出记录已添加: ¥${newExpense.amount}`, 'success');
            }

            return newExpense;
        } catch (error) {
            console.error('[Finance] 添加支出失败:', error);
            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`添加支出失败: ${error.message}`, 'error');
            }
            throw error;
        }
    }

    /**
     * 添加收入记录
     * @param {Object} income - 收入记录
     * @returns {Promise<Object>} 添加的记录
     */
    async function addIncome(income) {
        try {
            // 参数验证
            if (!income || typeof income !== 'object') {
                throw new Error('收入记录必须是对象');
            }

            if (!income.amount || income.amount <= 0) {
                throw new Error('收入金额必须大于0');
            }

            if (!income.category || !CATEGORIES.INCOME.includes(income.category)) {
                throw new Error('无效的收入分类');
            }

            // 创建完整的收入记录
            const newIncome = {
                id: generateId('INC'),
                amount: parseFloat(income.amount.toFixed(CONFIG.DECIMAL_PRECISION)),
                category: income.category,
                description: income.description || '',
                date: income.date || new Date().toISOString().split('T')[0],
                relatedOrder: income.relatedOrder || null,
                relatedCustomer: income.relatedCustomer || null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // 添加到数组
            state.incomes.unshift(newIncome);
            
            // 保存数据
            await saveFinancialData();

            // 显示成功消息
            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`收入记录已添加: ¥${newIncome.amount}`, 'success');
            }

            return newIncome;
        } catch (error) {
            console.error('[Finance] 添加收入失败:', error);
            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`添加收入失败: ${error.message}`, 'error');
            }
            throw error;
        }
    }

    /**
     * 更新支出记录
     * @param {string} id - 记录ID
     * @param {Object} updates - 更新内容
     * @returns {Promise<Object|null>} 更新后的记录
     */
    async function updateExpense(id, updates) {
        try {
            const index = state.expenses.findIndex(exp => exp.id === id);
            if (index === -1) {
                throw new Error(`支出记录 ${id} 不存在`);
            }

            // 合并更新
            const updatedExpense = {
                ...state.expenses[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };

            // 验证金额
            if (updatedExpense.amount !== undefined && updatedExpense.amount <= 0) {
                throw new Error('支出金额必须大于0');
            }

            // 更新记录
            state.expenses[index] = updatedExpense;
            
            // 保存数据
            await saveFinancialData();

            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`支出记录已更新`, 'success');
            }

            return updatedExpense;
        } catch (error) {
            console.error('[Finance] 更新支出失败:', error);
            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`更新支出失败: ${error.message}`, 'error');
            }
            throw error;
        }
    }

    /**
     * 更新收入记录
     * @param {string} id - 记录ID
     * @param {Object} updates - 更新内容
     * @returns {Promise<Object|null>} 更新后的记录
     */
    async function updateIncome(id, updates) {
        try {
            const index = state.incomes.findIndex(inc => inc.id === id);
            if (index === -1) {
                throw new Error(`收入记录 ${id} 不存在`);
            }

            // 合并更新
            const updatedIncome = {
                ...state.incomes[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };

            // 验证金额
            if (updatedIncome.amount !== undefined && updatedIncome.amount <= 0) {
                throw new Error('收入金额必须大于0');
            }

            // 更新记录
            state.incomes[index] = updatedIncome;
            
            // 保存数据
            await saveFinancialData();

            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`收入记录已更新`, 'success');
            }

            return updatedIncome;
        } catch (error) {
            console.error('[Finance] 更新收入失败:', error);
            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`更新收入失败: ${error.message}`, 'error');
            }
            throw error;
        }
    }

    /**
     * 删除支出记录
     * @param {string} id - 记录ID
     * @returns {Promise<boolean>} 是否成功
     */
    async function deleteExpense(id) {
        try {
            const initialLength = state.expenses.length;
            state.expenses = state.expenses.filter(exp => exp.id !== id);
            
            if (state.expenses.length === initialLength) {
                throw new Error(`支出记录 ${id} 不存在`);
            }

            // 保存数据
            await saveFinancialData();

            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`支出记录已删除`, 'success');
            }

            return true;
        } catch (error) {
            console.error('[Finance] 删除支出失败:', error);
            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`删除支出失败: ${error.message}`, 'error');
            }
            throw error;
        }
    }

    /**
     * 删除收入记录
     * @param {string} id - 记录ID
     * @returns {Promise<boolean>} 是否成功
     */
    async function deleteIncome(id) {
        try {
            const initialLength = state.incomes.length;
            state.incomes = state.incomes.filter(inc => inc.id !== id);
            
            if (state.incomes.length === initialLength) {
                throw new Error(`收入记录 ${id} 不存在`);
            }

            // 保存数据
            await saveFinancialData();

            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`收入记录已删除`, 'success');
            }

            return true;
        } catch (error) {
            console.error('[Finance] 删除收入失败:', error);
            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`删除收入失败: ${error.message}`, 'error');
            }
            throw error;
        }
    }

    /**
     * 设置预算
     * @param {string} category - 分类
     * @param {number} amount - 预算金额
     * @param {string} period - 期间 (month/quarter/year)
     * @returns {Promise<Object>} 预算设置
     */
    async function setBudget(category, amount, period = 'month') {
        try {
            if (!category || !amount || amount <= 0) {
                throw new Error('无效的预算参数');
            }

            const budgetKey = `${category}_${period}`;
            state.budgets[budgetKey] = {
                category,
                amount,
                period,
                updatedAt: new Date().toISOString()
            };

            // 保存数据
            await saveFinancialData();

            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`${category} ${period} 预算已设置为 ¥${amount}`, 'success');
            }

            return state.budgets[budgetKey];
        } catch (error) {
            console.error('[Finance] 设置预算失败:', error);
            if (WorkbenchUtils) {
                WorkbenchUtils.toast(`设置预算失败: ${error.message}`, 'error');
            }
            throw error;
        }
    }

    /**
     * 获取财务统计
     * @param {string} period - 期间 (week/month/quarter/year/all)
     * @returns {Object} 统计数据
     */
    function getFinancialStats(period = 'month') {
        const now = new Date();
        const filterDate = getPeriodStartDate(period, now);

        // 过滤当前期间的记录
        const periodExpenses = state.expenses.filter(exp => 
            new Date(exp.date) >= filterDate
        );

        const periodIncomes = state.incomes.filter(inc => 
            new Date(inc.date) >= filterDate
        );

        // 计算总额
        const totalExpenses = periodExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const totalIncomes = periodIncomes.reduce((sum, inc) => sum + inc.amount, 0);
        const netProfit = totalIncomes - totalExpenses;
        const profitMargin = totalIncomes > 0 ? (netProfit / totalIncomes) * 100 : 0;

        // 按分类统计
        const expensesByCategory = {};
        periodExpenses.forEach(exp => {
            expensesByCategory[exp.category] = (expensesByCategory[exp.category] || 0) + exp.amount;
        });

        const incomesByCategory = {};
        periodIncomes.forEach(inc => {
            incomesByCategory[inc.category] = (incomesByCategory[inc.category] || 0) + inc.amount;
        });

        return {
            period,
            dateRange: {
                start: formatDate(filterDate),
                end: formatDate(now)
            },
            totals: {
                expenses: parseFloat(totalExpenses.toFixed(CONFIG.DECIMAL_PRECISION)),
                incomes: parseFloat(totalIncomes.toFixed(CONFIG.DECIMAL_PRECISION)),
                profit: parseFloat(netProfit.toFixed(CONFIG.DECIMAL_PRECISION)),
                margin: parseFloat(profitMargin.toFixed(1))
            },
            expensesByCategory: Object.entries(expensesByCategory).map(([category, amount]) => ({
                category,
                amount: parseFloat(amount.toFixed(CONFIG.DECIMAL_PRECISION)),
                percentage: totalExpenses > 0 ? parseFloat(((amount / totalExpenses) * 100).toFixed(1)) : 0
            })),
            incomesByCategory: Object.entries(incomesByCategory).map(([category, amount]) => ({
                category,
                amount: parseFloat(amount.toFixed(CONFIG.DECIMAL_PRECISION)),
                percentage: totalIncomes > 0 ? parseFloat(((amount / totalIncomes) * 100).toFixed(1)) : 0
            })),
            counts: {
                expenses: periodExpenses.length,
                incomes: periodIncomes.length
            }
        };
    }

    /**
     * 获取预算执行情况
     * @returns {Object} 预算执行数据
     */
    function getBudgetStatus() {
        const currentMonthStats = getFinancialStats('month');
        const budgetStatus = [];

        // 检查每个预算分类
        Object.values(state.budgets).forEach(budget => {
            const { category, amount, period } = budget;
            
            // 获取对应期间的支出
            const periodStats = getFinancialStats(period);
            const categoryExpense = periodStats.expensesByCategory.find(
                item => item.category === category
            )?.amount || 0;

            const usedPercentage = (categoryExpense / amount) * 100;
            const status = usedPercentage > 100 ? 'over' : usedPercentage > 80 ? 'warning' : 'normal';

            budgetStatus.push({
                category,
                period,
                budget: amount,
                used: categoryExpense,
                remaining: amount - categoryExpense,
                usedPercentage: parseFloat(usedPercentage.toFixed(1)),
                status,
                remainingDays: getDaysRemainingInPeriod(period)
            });
        });

        return budgetStatus;
    }

    /**
     * 生成财务报告
     * @param {string} type - 报告类型 (summary/detailed)
     * @param {string} period - 期间
     * @returns {Object} 财务报告
     */
    function generateReport(type = 'summary', period = 'month') {
        const stats = getFinancialStats(period);
        const budgetStatus = getBudgetStatus();

        const report = {
            reportId: generateId('REP'),
            type,
            period,
            generatedAt: new Date().toISOString(),
            stats,
            budgetStatus
        };

        if (type === 'detailed') {
            // 添加详细记录
            const filterDate = getPeriodStartDate(period);
            report.expenseDetails = state.expenses
                .filter(exp => new Date(exp.date) >= filterDate)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            
            report.incomeDetails = state.incomes
                .filter(inc => new Date(inc.date) >= filterDate)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        return report;
    }

    /**
     * 搜索财务记录
     * @param {string} query - 搜索关键词
     * @param {string} type - 类型 (expense/income/all)
     * @returns {Object} 搜索结果
     */
    function searchRecords(query, type = 'all') {
        if (!query) {
            return { expenses: [], incomes: [] };
        }

        const lowerQuery = query.toLowerCase();
        const results = { expenses: [], incomes: [] };

        if (type === 'expense' || type === 'all') {
            results.expenses = state.expenses.filter(exp => 
                exp.description.toLowerCase().includes(lowerQuery) ||
                exp.category.toLowerCase().includes(lowerQuery) ||
                (exp.relatedOrder && exp.relatedOrder.toLowerCase().includes(lowerQuery)) ||
                (exp.relatedCustomer && exp.relatedCustomer.toLowerCase().includes(lowerQuery))
            );
        }

        if (type === 'income' || type === 'all') {
            results.incomes = state.incomes.filter(inc => 
                inc.description.toLowerCase().includes(lowerQuery) ||
                inc.category.toLowerCase().includes(lowerQuery) ||
                (inc.relatedOrder && inc.relatedOrder.toLowerCase().includes(lowerQuery)) ||
                (inc.relatedCustomer && inc.relatedCustomer.toLowerCase().includes(lowerQuery))
            );
        }

        return results;
    }

    /**
     * 计算税费
     * @param {number} amount - 金额
     * @param {string} type - 类型 (inclusive/exclusive)
     * @returns {Object} 税费计算结果
     */
    function calculateTax(amount, type = 'exclusive') {
        const taxAmount = parseFloat((amount * CONFIG.TAX_RATE).toFixed(CONFIG.DECIMAL_PRECISION));
        const totalAmount = type === 'inclusive' 
            ? amount 
            : parseFloat((amount + taxAmount).toFixed(CONFIG.DECIMAL_PRECISION));

        return {
            subtotal: type === 'inclusive' 
                ? parseFloat((amount - taxAmount).toFixed(CONFIG.DECIMAL_PRECISION)) 
                : amount,
            tax: taxAmount,
            total: totalAmount,
            taxRate: CONFIG.TAX_RATE * 100
        };
    }

    /**
     * 获取期间开始日期
     * @param {string} period - 期间
     * @param {Date} [date] - 基准日期
     * @returns {Date} 开始日期
     */
    function getPeriodStartDate(period, date = new Date()) {
        const startDate = new Date(date);

        switch (period) {
            case 'week':
                // 本周第一天（周一）
                startDate.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
                break;
            case 'month':
                startDate.setDate(1);
                break;
            case 'quarter':
                const quarterStartMonth = Math.floor(date.getMonth() / 3) * 3;
                startDate.setMonth(quarterStartMonth, 1);
                break;
            case 'year':
                startDate.setMonth(0, 1);
                break;
            case 'all':
            default:
                return new Date(0); // 纪元开始
        }

        startDate.setHours(0, 0, 0, 0);
        return startDate;
    }

    /**
     * 获取期间剩余天数
     * @param {string} period - 期间
     * @returns {number} 剩余天数
     */
    function getDaysRemainingInPeriod(period) {
        const now = new Date();
        const endDate = new Date(now);

        switch (period) {
            case 'week':
                endDate.setDate(now.getDate() + (7 - now.getDay()));
                break;
            case 'month':
                endDate.setMonth(now.getMonth() + 1, 0);
                break;
            case 'quarter':
                const quarterEndMonth = Math.floor(now.getMonth() / 3) * 3 + 2;
                endDate.setMonth(quarterEndMonth + 1, 0);
                break;
            case 'year':
                endDate.setMonth(11, 31);
                break;
            default:
                return 0;
        }

        endDate.setHours(23, 59, 59, 999);
        const timeDiff = endDate - now;
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    /**
     * 格式化日期
     * @param {Date} date - 日期
     * @returns {string} 格式化后的日期
     */
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    /**
     * 生成唯一ID
     * @param {string} prefix - 前缀
     * @returns {string} 唯一ID
     */
    function generateId(prefix = 'ID') {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `${prefix}-${timestamp}-${random}`;
    }

    // 公共API
    const api = {
        // 初始化
        init,
        
        // 支出管理
        addExpense,
        updateExpense,
        deleteExpense,
        
        // 收入管理
        addIncome,
        updateIncome,
        deleteIncome,
        
        // 预算管理
        setBudget,
        getBudgetStatus,
        
        // 统计分析
        getFinancialStats,
        generateReport,
        searchRecords,
        
        // 工具方法
        calculateTax,
        
        // 常量
        CATEGORIES,
        CONFIG
    };

    // 自动初始化
    document.addEventListener('DOMContentLoaded', async () => {
        await init();
    });

    return api;
})();

// 挂载到全局
window.WorkbenchFinance = WorkbenchFinance;

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchFinance;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchFinance);
}