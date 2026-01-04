/**
 * V14.2 PRO - CRM费用模块
 * 客户管理与费用跟踪功能
 * 优化版本 - 2026-01-03
 * @namespace WorkbenchCRM
 */
const WorkbenchCRM = (() => {
    'use strict';

    // 客户表单字段配置
    const CUSTOMER_FIELDS = ['name', 'phone', 'email', 'company', 'address', 'remark'];

    // 表单验证规则
    const VALIDATION_RULES = {
        name: { required: true, message: '客户名称不能为空' },
        phone: { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
        email: { pattern: /^[\w.-]+@[\w.-]+\.\w+$/, message: '邮箱格式不正确' }
    };

    /**
     * 初始化CRM模块（供loader调用）
     * @returns {boolean} 是否成功
     */
    function init() {
        try {
            console.log('[CRM] CRM模块初始化中...');
            
            // 绑定事件
            bindEvents();
            
            console.log('[CRM] ✅ CRM模块已初始化');
            return true;
        } catch (error) {
            console.error('[CRM] ❌ 初始化失败:', error);
            return false;
        }
    }

    /**
     * 绑定事件监听器
     */
    function bindEvents() {
        try {
            // 绑定表单提交按钮
            const submitBtn = document.getElementById('customer-form-submit');
            if (submitBtn) {
                submitBtn.addEventListener('click', submitCustomerForm);
            }

            // 绑定表单重置按钮
            const resetBtn = document.getElementById('customer-form-reset');
            if (resetBtn) {
                resetBtn.addEventListener('click', resetCustomerForm);
            }
        } catch (error) {
            console.warn('[CRM] 绑定事件失败:', error);
        }
    }

    /**
     * 获取客户表单数据（带校验）
     * @param {boolean} validate - 是否校验数据
     * @returns {Object|null} 表单数据（校验失败返回null）
     */
    function getCustomerFormData(validate = true) {
        try {
            const formData = {};

            // 遍历字段获取值
            CUSTOMER_FIELDS.forEach(field => {
                const element = document.getElementById(`customer-${field}`);
                if (element) {
                    // 根据输入类型处理值
                    if (element.type === 'checkbox') {
                        formData[field] = element.checked;
                    } else if (element.type === 'number') {
                        formData[field] = Number(element.value) || 0;
                    } else {
                        formData[field] = element.value.trim() || '';
                    }
                } else {
                    formData[field] = '';
                    console.warn(`[CRM] 客户表单字段未找到：customer-${field}`);
                }
            });

            // 数据校验
            if (validate) {
                const validationResult = validateCustomerFormData(formData);
                if (!validationResult.valid) {
                    throw new Error(validationResult.message);
                }
            }

            return formData;
        } catch (error) {
            console.error('[CRM] ❌ 获取客户表单数据失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast(`表单数据获取失败：${error.message}`, 'error');
            }
            return null;
        }
    }

    /**
     * 校验客户表单数据
     * @param {Object} formData - 表单数据
     * @returns {Object} 校验结果 { valid: boolean, message: string }
     */
    function validateCustomerFormData(formData) {
        if (!formData || typeof formData !== 'object') {
            return { valid: false, message: '表单数据必须为对象' };
        }

        // 遍历校验规则
        for (const [field, rules] of Object.entries(VALIDATION_RULES)) {
            const value = formData[field] || '';

            // 必填项校验
            if (rules.required && !value) {
                return { valid: false, message: rules.message };
            }

            // 正则校验
            if (rules.pattern && value && !rules.pattern.test(value)) {
                return { valid: false, message: rules.message };
            }
        }

        return { valid: true, message: '校验通过' };
    }

    /**
     * 重置客户表单
     */
    function resetCustomerForm() {
        try {
            CUSTOMER_FIELDS.forEach(field => {
                const element = document.getElementById(`customer-${field}`);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = false;
                    } else {
                        element.value = '';
                    }
                }
            });
            console.log('[CRM] ✅ 客户表单已重置');
        } catch (error) {
            console.error('[CRM] ❌ 重置客户表单失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast(`表单重置失败：${error.message}`, 'error');
            }
        }
    }

    /**
     * 提交客户表单
     * @returns {Promise<boolean>} 提交结果
     */
    async function submitCustomerForm() {
        const formData = getCustomerFormData(true);
        if (!formData) return false;

        try {
            console.log('[CRM] 提交客户表单数据:', formData);

            // 生成客户ID
            const customerId = window.WorkbenchUtils ? 
                WorkbenchUtils.generateId('customer') : 
                `customer_${Date.now()}`;

            // 创建客户对象
            const customer = {
                id: customerId,
                ...formData,
                createTime: new Date().toISOString(),
                updateTime: new Date().toISOString()
            };

            // 保存到存储
            let customers = [];
            if (window.WorkbenchStorage) {
                customers = WorkbenchStorage.load('customers') || [];
            } else {
                const customersJson = localStorage.getItem('workbench_customers');
                customers = customersJson ? JSON.parse(customersJson) : [];
            }

            customers.push(customer);

            if (window.WorkbenchStorage) {
                WorkbenchStorage.save('customers', customers);
            } else {
                localStorage.setItem('workbench_customers', JSON.stringify(customers));
            }

            // 成功处理
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast('客户信息提交成功', 'success');
            }
            
            resetCustomerForm();
            
            console.log('[CRM] ✅ 客户信息提交成功:', customer);
            return true;
        } catch (error) {
            console.error('[CRM] ❌ 提交客户表单失败:', error);
            if (window.WorkbenchUtils) {
                WorkbenchUtils.toast(`提交失败：${error.message}`, 'error');
            }
            return false;
        }
    }

    /**
     * 获取所有客户
     * @returns {Array} 客户列表
     */
    function getAllCustomers() {
        try {
            if (window.WorkbenchStorage) {
                return WorkbenchStorage.load('customers') || [];
            } else {
                const customersJson = localStorage.getItem('workbench_customers');
                return customersJson ? JSON.parse(customersJson) : [];
            }
        } catch (error) {
            console.error('[CRM] ❌ 获取客户列表失败:', error);
            return [];
        }
    }

    /**
     * 按ID获取客户
     * @param {string} customerId - 客户ID
     * @returns {Object|null} 客户对象
     */
    function getCustomerById(customerId) {
        try {
            const customers = getAllCustomers();
            return customers.find(c => c.id === customerId) || null;
        } catch (error) {
            console.error('[CRM] ❌ 获取客户失败:', error);
            return null;
        }
    }

    // 公共API
    const api = {
        // 初始化
        init,
        
        // 表单操作
        getCustomerFormData,
        validateCustomerFormData,
        resetCustomerForm,
        submitCustomerForm,
        
        // 客户查询
        getAllCustomers,
        getCustomerById,
        
        // 常量
        CUSTOMER_FIELDS,
        VALIDATION_RULES
    };

    return api;
})();

// 挂载到全局
window.WorkbenchCRM = WorkbenchCRM;

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchCRM;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchCRM);
}

console.log('[CRM] CRM模块已加载');
