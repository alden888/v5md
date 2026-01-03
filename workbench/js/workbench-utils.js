// ============================================
// V14.2 PRO - UTILITIES MODULE (FULLY FIXED)
// 修复所有功能性问题 + 增强兼容性
// ============================================

const WorkbenchUtils = {
    /**
     * 显示Toast通知 (完全修复版)
     * @param {string} message - 提示信息
     * @param {string} type - 类型: success/error/warning/info
     * @param {number} duration - 显示时长(ms)
     */
    toast(message, type = 'info', duration = 3000) {
        // 安全校验：避免空消息
        if (!message || message.trim() === '') return;
        
        console.log(`[Toast] ${type.toUpperCase()}: ${message}`);
        
        // 创建toast容器（如果不存在）
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-4 right-4 z-[9999] space-y-2';
            document.body.appendChild(container);
        }
        
        // 定义图标和样式
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
        
        // 创建toast元素
        const toast = document.createElement('div');
        toast.className = `${colors[type] || colors.info} border-2 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-[400px]`;
        toast.style.animation = 'slideIn 0.3s ease-out';
        toast.style.transition = 'opacity 0.3s, transform 0.3s';
        
        // 处理HTML内容（支持换行）
        const safeMessage = message.replace(/<br>/g, '\n').replace(/\n/g, '<br>');
        toast.innerHTML = `
            <span class="text-2xl flex-shrink-0">${icons[type] || icons.info}</span>
            <span class="flex-1 font-medium">${safeMessage}</span>
            <button onclick="this.parentElement.remove()" class="text-white/70 hover:text-white transition flex-shrink-0">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // 兼容无FontAwesome的情况
        setTimeout(() => {
            const closeBtn = toast.querySelector('button');
            if (closeBtn && !closeBtn.innerHTML.trim()) {
                closeBtn.textContent = '×';
                closeBtn.style.fontSize = '18px';
                closeBtn.style.padding = '0 8px';
            }
        }, 100);
        
        container.appendChild(toast);
        
        // 自动移除
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                try {
                    toast.remove();
                } catch (e) {
                    console.warn('[Toast] Remove failed:', e);
                }
            }, 300);
        }, duration);
    },
    
    /**
     * 格式化数字（千分位）
     * @param {number} num - 数字
     * @param {number} decimals - 小数位数
     * @returns {string} 格式化后的数字
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
     * @param {string} prefix - 前缀
     * @returns {string} 唯一ID
     */
    generateId(prefix = 'ID') {
        try {
            const timestamp = Date.now();
            const random = Math.random().toString(36).substr(2, 9);
            return `${prefix}-${timestamp}-${random}`;
        } catch (e) {
            console.error('[Utils] Generate ID failed:', e);
            return `${prefix}-${Math.random().toString(36).substr(2, 15)}`;
        }
    },
    
    /**
     * 生成PI编号（订单专用）
     * @returns {string} PI编号
     */
    generatePINumber() {
        try {
            const now = new Date();
            const year = now.getFullYear().toString().substr(2, 2);
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            return `PI${year}${month}${day}-${random}`;
        } catch (e) {
            console.error('[Utils] Generate PI failed:', e);
            return `PI${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
        }
    },
    
    /**
     * 格式化日期
     * @param {Date|string} date - 日期
     * @param {string} format - 格式 YYYY-MM-DD HH:mm:ss
     * @returns {string} 格式化后的日期
     */
    formatDate(date, format = 'YYYY-MM-DD') {
        try {
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
        } catch (e) {
            console.error('[Utils] Format date failed:', e);
            return date || '';
        }
    },
    
    /**
     * 下载JSON文件
     * @param {object} data - 数据
     * @param {string} filename - 文件名
     */
    downloadJSON(data, filename = 'data.json') {
        try {
            const blob = new Blob([JSON.stringify(data, null, 2)], { 
                type: 'application/json; charset=utf-8' 
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.toast(`文件 ${filename} 已下载`, 'success');
        } catch (e) {
            console.error('[Utils] Download JSON failed:', e);
            this.toast('文件下载失败', 'error');
        }
    },
    
    /**
     * 复制文本到剪贴板 (增强版)
     * @param {string} text - 文本
     * @returns {boolean} 是否成功
     */
    async copyToClipboard(text) {
        if (!text) {
            this.toast('复制内容不能为空', 'warning');
            return false;
        }
        
        try {
            await navigator.clipboard.writeText(text);
            this.toast('已复制到剪贴板', 'success');
            return true;
        } catch (error) {
            console.error('[Utils] Copy failed (navigator):', error);
            // 降级方案
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                this.toast('已复制到剪贴板', 'success');
                return true;
            } catch (e) {
                console.error('[Utils] Copy failed (fallback):', e);
                this.toast('复制失败，请手动复制', 'error');
                return false;
            }
        }
    },
    
    /**
     * 安全的数字解析
     * @param {any} value - 值
     * @param {number} defaultValue - 默认值
     * @returns {number} 解析后的数字
     */
    parseNumber(value, defaultValue = 0) {
        const num = parseFloat(value);
        return isNaN(num) ? defaultValue : num;
    },
    
    /**
     * 设置元素文本
     * @param {string} id - 元素ID
     * @param {string} text - 文本
     */
    setText(id, text) {
        try {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        } catch (e) {
            console.error(`[Utils] Set text failed (${id}):`, e);
        }
    },
    
    /**
     * 设置元素HTML
     * @param {string} id - 元素ID
     * @param {string} html - HTML内容
     */
    setHTML(id, html) {
        try {
            const el = document.getElementById(id);
            if (el) el.innerHTML = html;
        } catch (e) {
            console.error(`[Utils] Set HTML failed (${id}):`, e);
        }
    },
    
    /**
     * 防重复点击检查 (新增兼容方法)
     * @param {HTMLElement} btn - 按钮元素
     * @returns {boolean} 是否重复点击
     */
    isDoubleClick(btn) {
        if (!btn) return false;
        
        if (btn.dataset.clicking === 'true') {
            this.toast('操作中，请稍候...', 'warning');
            return true;
        }
        
        btn.dataset.clicking = 'true';
        btn.disabled = true;
        // 自动释放（防止卡死）
        setTimeout(() => this.releaseClick(btn), 3000);
        return false;
    },
    
    /**
     * 释放点击锁定 (新增兼容方法)
     * @param {HTMLElement} btn - 按钮元素
     */
    releaseClick(btn) {
        if (btn) {
            btn.dataset.clicking = 'false';
            btn.disabled = false;
        }
    }
};

// 添加动画样式（确保只添加一次）
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
        
        /* Toast响应式适配 */
        @media (max-width: 768px) {
            #toast-container {
                left: 4px;
                right: 4px;
                bottom: 4px;
            }
            #toast-container > div {
                min-width: unset;
                width: 100%;
                max-width: unset;
            }
        }
    `;
    document.head.appendChild(style);
}

// 🔥 关键：立即挂载到全局（确保DOM加载前可用）
window.WorkbenchUtils = WorkbenchUtils;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ [Utils] V14.2 PRO Module loaded and ready');
});
