// ============================================
// V14.0 ERP - UTILITIES MODULE
// ============================================

const WorkbenchUtils = {
    /**
     * 格式化数字 (千分位)
     */
    formatNumber(num, decimals = 0) {
        if (isNaN(num)) return '0';
        return Number(num).toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },
    
    /**
     * 格式化货币
     */
    formatCurrency(amount, currency = 'CNY') {
        const config = WorkbenchConfig.CURRENCIES[currency];
        if (!config) return `${amount}`;
        
        return `${config.symbol}${this.formatNumber(amount, 2)}`;
    },
    
    /**
     * 将外币转换为人民币
     */
    convertToRMB(amount, currency, exchangeRate = null) {
        if (currency === 'CNY') return amount;
        
        const rate = exchangeRate || WorkbenchConfig.CURRENCIES[currency]?.rate || 1;
        return amount * rate;
    },
    
    /**
     * 生成唯一ID
     */
    generateId(prefix = 'ID') {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `${prefix}-${timestamp}-${random}`;
    },
    
    /**
     * 生成PI编号
     */
    generatePINumber() {
        const now = new Date();
        const year = now.getFullYear().toString().substr(2, 2);
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        return `PI-${year}${month}${day}-${random}`;
    },
    
    /**
     * 格式化日期
     */
    formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    },
    
    /**
     * 计算时间差 (小时)
     */
    getHoursDiff(date1, date2 = new Date()) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diff = Math.abs(d2.getTime() - d1.getTime());
        return diff / (1000 * 60 * 60);
    },
    
    /**
     * 显示Toast消息
     */
    toast(message, type = 'info', duration = 3000) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        
        toast.innerHTML = `
            <div class="${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
                <span class="text-2xl">${icons[type]}</span>
                <span>${message}</span>
            </div>
        `;
        
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, duration);
    },
    
    /**
     * 设置元素文本内容
     */
    setText(id, text) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    },
    
    /**
     * 设置元素HTML内容
     */
    setHTML(id, html) {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = html;
        }
    },
    
    /**
     * 显示/隐藏元素
     */
    toggle(id, show = null) {
        const element = document.getElementById(id);
        if (!element) return;
        
        if (show === null) {
            element.classList.toggle('hidden');
        } else {
            if (show) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    },
    
    /**
     * 添加/移除CSS类
     */
    toggleClass(id, className, add = null) {
        const element = document.getElementById(id);
        if (!element) return;
        
        if (add === null) {
            element.classList.toggle(className);
        } else {
            if (add) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        }
    },
    
    /**
     * 下载JSON文件
     */
    downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { 
            type: 'application/json' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    /**
     * 复制文本到剪贴板
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.toast('已复制到剪贴板', 'success');
            return true;
        } catch (error) {
            console.error('Copy failed:', error);
            this.toast('复制失败', 'error');
            return false;
        }
    },
    
    /**
     * 防抖函数
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * 节流函数
     */
    throttle(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * 验证邮箱
     */
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    /**
     * 验证电话
     */
    isValidPhone(phone) {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 7;
    },
    
    /**
     * 获取国家信息
     */
    getCountry(code) {
        return WorkbenchConfig.COUNTRIES.find(c => c.code === code);
    },
    
    /**
     * 获取货币符号
     */
    getCurrencySymbol(currency) {
        return WorkbenchConfig.CURRENCIES[currency]?.symbol || currency;
    }
};
