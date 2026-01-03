/**
 * CRM费用模块 - 完整优化版
 * 包含客户表单数据获取、校验、兜底
 */
// 全局配置兜底（避免CONFIG未定义）
const CONFIG = window.CONFIG || {
    CUSTOMER_FIELDS: ['name', 'phone', 'email', 'company', 'address', 'remark'],
    FORM_VALIDATION: {
        name: { required: true, message: '客户名称不能为空' },
        phone: { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
        email: { pattern: /^[\w.-]+@[\w.-]+\.\w+$/, message: '邮箱格式不正确' }
    }
};

/**
 * 获取客户表单数据（带校验）
 * @param {boolean} validate - 是否校验数据
 * @returns {Object|null} 表单数据（校验失败返回null）
 */
function getCustomerFormData(validate = true) {
    try {
        const formData = {};
        const fields = Array.isArray(CONFIG.CUSTOMER_FIELDS) ? CONFIG.CUSTOMER_FIELDS : [];

        // 遍历字段获取值
        fields.forEach(field => {
            if (typeof field !== 'string') return; // 过滤非法字段名
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
                formData[field] = ''; // 字段不存在时兜底为空字符串
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
        console.error('[CRM] 获取客户表单数据失败:', error);
        (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast(`表单数据获取失败：${error.message}`, 'error');
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
    for (const [field, rules] of Object.entries(CONFIG.FORM_VALIDATION || {})) {
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
        const fields = Array.isArray(CONFIG.CUSTOMER_FIELDS) ? CONFIG.CUSTOMER_FIELDS : [];
        fields.forEach(field => {
            if (typeof field !== 'string') return;
            const element = document.getElementById(`customer-${field}`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = false;
                } else {
                    element.value = '';
                }
            }
        });
        console.log('[CRM] 客户表单已重置');
    } catch (error) {
        console.error('[CRM] 重置客户表单失败:', error);
        (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast(`表单重置失败：${error.message}`, 'error');
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
        // 模拟接口提交（实际项目替换为真实API）
        console.log('[CRM] 提交客户表单数据:', formData);
        // await fetch('/api/customer', { method: 'POST', body: JSON.stringify(formData) });
        
        // 成功处理
        (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast('客户信息提交成功', 'success');
        resetCustomerForm();
        return true;
    } catch (error) {
        console.error('[CRM] 提交客户表单失败:', error);
        (window.WorkbenchUtils || {toast: (m,t)=>console.log(m,t)}).toast(`提交失败：${error.message}`, 'error');
        return false;
    }
}

// 绑定表单提交事件
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('customer-form-submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitCustomerForm);
    } else {
        console.warn('[CRM] 客户表单提交按钮未找到');
    }

    const resetBtn = document.getElementById('customer-form-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCustomerForm);
    }
});

// 暴露全局方法
window.getCustomerFormData = getCustomerFormData;
window.validateCustomerFormData = validateCustomerFormData;
window.resetCustomerForm = resetCustomerForm;
window.submitCustomerForm = submitCustomerForm;