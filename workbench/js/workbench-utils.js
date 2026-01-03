// ============================================
// V14.2 PRO - UTILITIES MODULE (FULLY FIXED)
// 修复所有功能性问题
// ============================================

const WorkbenchUtils = {
    /**
     * 显示Toast通知 (完全修复版)
     */
    toast(message, type = 'info', duration = 3000) {
        console.log(`[Toast] ${type.toUpperCase()}: ${message}`);
        
        // 创建toast容器（如果不存在）
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-4 right-4 z-[9999] space-y-2';
            document.body.appendChild(container);
        }
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        const colors = {
            success: 'bg-green-600 border-green-500',
            error: 'bg-red-600 border-red-500',
            warning: 'bg-yellow-600 border-yellow-500',
            info: 'bg-blue-600 border-blue-500'
        };
        
        const toast = document.createElement('div');
        toast.className = `${colors[type]} border-2 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in min-w-[300px]`;
        toast.style.animation = 'slideIn 0.3s ease-out';
        toast.innerHTML = `
            <span class="text-2xl">${icons[type]}</span>
            <span class="flex-1 font-medium">${message}</span>
            <button onclick="this.parentElement.remove()" class="text-white/70 hover:text-white transition">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(toast);
        
        // 自动移除
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    /**
     * 格式化数字（千分位）
     */
    formatNumber(num, decimals = 0) {
        if (num === null || num === undefined || isNaN(num)) return '0';
        return Number(num).toLocaleString('zh-CN', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
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
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `PI${year}${month}${day}-${random}`;
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
     * 复制文本到剪贴板 (增强版)
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.toast('已复制到剪贴板', 'success');
            return true;
        } catch (error) {
            console.error('[Utils] Copy failed:', error);
            // 降级方案
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                this.toast('已复制到剪贴板', 'success');
                return true;
            } catch (e) {
                this.toast('复制失败', 'error');
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    },
    
    /**
     * 安全的数字解析
     */
    parseNumber(value, defaultValue = 0) {
        const num = parseFloat(value);
        return isNaN(num) ? defaultValue : num;
    },
    
    /**
     * 设置元素文本
     */
    setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    },
    
    /**
     * 设置元素HTML
     */
    setHTML(id, html) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }
};

// 添加动画样式
if (!document.getElementById('utils-animations')) {
    const style = document.createElement('style');
    style.id = 'utils-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(400px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .animate-slide-in {
            animation: slideIn 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// 🔥 关键：立即挂载到全局
window.WorkbenchUtils = WorkbenchUtils;
console.log('✅ [Utils] Module loaded and mounted to window');
