/**
 * V5 Medical Workbench - Utility Functions
 * 通用工具函数库
 * @version 1.0.0
 */

const WorkbenchUtils = {
    /**
     * Toast 通知系统
     */
    toast: {
        show(message, type = 'success', duration = 3000) {
            // 移除旧的 toast
            const old = document.getElementById('v5-toast');
            if (old) old.remove();

            const toast = document.createElement('div');
            toast.id = 'v5-toast';
            toast.className = 'fixed bottom-6 right-6 z-[9999] bg-white shadow-2xl rounded-xl border border-slate-200 p-4 flex items-center gap-3 transform translate-y-10 opacity-0 transition-all duration-300';
            
            const icons = {
                success: '<i class="fas fa-check-circle text-green-500 text-xl"></i>',
                error: '<i class="fas fa-times-circle text-red-500 text-xl"></i>',
                warning: '<i class="fas fa-exclamation-triangle text-yellow-500 text-xl"></i>',
                info: '<i class="fas fa-info-circle text-blue-500 text-xl"></i>'
            };

            toast.innerHTML = `
                ${icons[type] || icons.success}
                <div>
                    <div class="font-bold text-sm text-slate-800">${message}</div>
                    <div class="text-xs text-slate-500 mt-0.5">${new Date().toLocaleTimeString('zh-CN')}</div>
                </div>
            `;

            document.body.appendChild(toast);

            // 触发动画
            setTimeout(() => {
                toast.classList.remove('translate-y-10', 'opacity-0');
            }, 10);

            // 自动隐藏
            setTimeout(() => {
                toast.classList.add('translate-y-10', 'opacity-0');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        },

        success(msg) { this.show(msg, 'success'); },
        error(msg) { this.show(msg, 'error'); },
        warning(msg) { this.show(msg, 'warning'); },
        info(msg) { this.show(msg, 'info'); }
    },

    /**
     * 格式化金额
     */
    formatCurrency(amount, currency = 'CNY', decimals = 0) {
        const symbols = { CNY: '¥', USD: '$', EUR: '€', GBP: '£' };
        const symbol = symbols[currency] || currency;
        const formatted = Math.abs(amount).toLocaleString('zh-CN', { 
            minimumFractionDigits: decimals, 
            maximumFractionDigits: decimals 
        });
        return amount < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
    },

    /**
     * 格式化日期
     */
    formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const hours = d.getHours().toString().padStart(2, '0');
        const minutes = d.getMinutes().toString().padStart(2, '0');

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes);
    },

    /**
     * 计算日期差（天数）
     */
    daysBetween(date1, date2 = new Date()) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    },

    /**
     * 深度克隆对象
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
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
     * 生成唯一ID
     */
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * 复制到剪贴板
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.toast.success('已复制到剪贴板');
            return true;
        } catch (err) {
            // 降级方案
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.toast.success('已复制到剪贴板');
            return true;
        }
    },

    /**
     * 数字转大写金额（中文）
     */
    numberToChinese(num) {
        const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        const units = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿'];
        const decimalUnits = ['角', '分'];

        if (num === 0) return '零元整';

        let [intPart, decPart] = num.toFixed(2).split('.');
        let result = '';

        // 处理整数部分
        intPart = parseInt(intPart);
        if (intPart > 0) {
            const intStr = intPart.toString().split('').reverse();
            for (let i = 0; i < intStr.length; i++) {
                const digit = parseInt(intStr[i]);
                if (digit !== 0) {
                    result = digits[digit] + units[i] + result;
                } else if (result && !result.startsWith('零')) {
                    result = '零' + result;
                }
            }
            result += '元';
        }

        // 处理小数部分
        if (decPart && parseInt(decPart) > 0) {
            const [jiao, fen] = decPart.split('');
            if (jiao !== '0') result += digits[parseInt(jiao)] + decimalUnits[0];
            if (fen !== '0') result += digits[parseInt(fen)] + decimalUnits[1];
        } else {
            result += '整';
        }

        return result;
    },

    /**
     * 英文金额大写（用于PI）
     */
    numberToEnglishWords(num, currency = 'USD') {
        const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
        const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
        const teens = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];

        const currencyNames = {
            USD: 'US DOLLARS',
            EUR: 'EUROS',
            GBP: 'POUNDS STERLING',
            CNY: 'CHINESE YUAN'
        };

        const intPart = Math.floor(num);
        const decPart = Math.round((num - intPart) * 100);

        let words = 'SAY TOTAL ' + (currencyNames[currency] || 'DOLLARS') + ' ';

        // 处理整数部分
        if (intPart === 0) {
            words += 'ZERO';
        } else {
            const thousands = Math.floor(intPart / 1000);
            const remainder = intPart % 1000;
            const hundreds = Math.floor(remainder / 100);
            const lastTwo = remainder % 100;

            if (thousands > 0) {
                words += ones[thousands] + ' THOUSAND ';
            }
            if (hundreds > 0) {
                words += ones[hundreds] + ' HUNDRED ';
            }
            if (lastTwo >= 10 && lastTwo < 20) {
                words += teens[lastTwo - 10] + ' ';
            } else {
                const tensPart = Math.floor(lastTwo / 10);
                const onesPart = lastTwo % 10;
                if (tensPart > 0) words += tens[tensPart] + ' ';
                if (onesPart > 0) words += ones[onesPart] + ' ';
            }
        }

        // 处理小数部分
        if (decPart > 0) {
            words += `AND ${decPart}/100 CENTS ONLY`;
        } else {
            words += 'ONLY';
        }

        return words.trim();
    },

    /**
     * 下载文件
     */
    downloadFile(data, filename, type = 'text/plain') {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },

    /**
     * 导出JSON
     */
    exportJSON(data, filename) {
        const json = JSON.stringify(data, null, 2);
        this.downloadFile(json, filename, 'application/json');
    },

    /**
     * 导出CSV
     */
    exportCSV(data, filename, headers = null) {
        const BOM = '\uFEFF'; // UTF-8 BOM for Excel
        let csv = '';

        if (headers) {
            csv += headers.join(',') + '\n';
        }

        data.forEach(row => {
            csv += row.map(cell => `"${cell}"`).join(',') + '\n';
        });

        this.downloadFile(BOM + csv, filename, 'text/csv;charset=utf-8');
    },

    /**
     * 医疗单位转换
     */
    medical: {
        // Fr/Ch 转 mm
        frToMm(fr) {
            return (fr / 3).toFixed(2);
        },
        mmToFr(mm) {
            return (mm * 3).toFixed(1);
        },

        // Gauge 颜色映射
        gaugeColors: {
            18: { color: 'Pink', od: '1.2mm' },
            20: { color: 'Yellow', od: '0.9mm' },
            21: { color: 'Green', od: '0.8mm' },
            22: { color: 'Black', od: '0.7mm' },
            23: { color: 'Blue', od: '0.6mm' },
            25: { color: 'Orange', od: '0.5mm' }
        }
    },

    /**
     * 表单验证
     */
    validate: {
        email(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        phone(phone) {
            return /^[0-9+\-\s()]{7,20}$/.test(phone);
        },
        notEmpty(value) {
            return value && value.toString().trim().length > 0;
        }
    },

    /**
     * 错误日志
     */
    logError(context, error) {
        const logs = JSON.parse(localStorage.getItem('v5_error_logs') || '[]');
        logs.push({
            context,
            message: error.message,
            stack: error.stack,
            time: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
        localStorage.setItem('v5_error_logs', JSON.stringify(logs.slice(-50)));
        console.error(`[${context}]`, error);
    }
};

// 全局导出
window.WorkbenchUtils = WorkbenchUtils;
