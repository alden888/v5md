// ============================================
// V14.2 PRO - UTILITIES MODULE (ENHANCED)
// 通用工具函数封装 + 性能优化 + 功能增强
// ============================================

/**
 * 工具类命名空间，提供通用工具函数
 * @namespace WorkbenchUtils
 */
const WorkbenchUtils = (() => {
    'use strict';

    // 私有配置
    const config = {
        defaultToastDuration: 3000,
        animationDuration: 300,
        dateFormats: {
            short: 'YYYY-MM-DD',
            long: 'YYYY-MM-DD HH:mm:ss',
            time: 'HH:mm:ss',
            month: 'YYYY-MM'
        }
    };

    // 私有工具函数
    const privateUtils = {
        /**
         * 检查是否为DOM元素
         * @param {*} element - 要检查的元素
         * @returns {boolean} 是否为DOM元素
         */
        isElement(element) {
            return element instanceof HTMLElement;
        },

        /**
         * 安全的JSON解析
         * @param {string} jsonString - JSON字符串
         * @param {*} defaultValue - 默认值
         * @returns {*} 解析结果
         */
        safeJsonParse(jsonString, defaultValue = {}) {
            try {
                return JSON.parse(jsonString);
            } catch (error) {
                console.warn('[Utils] JSON解析失败:', error);
                return defaultValue;
            }
        },

        /**
         * 安全的JSON字符串化
         * @param {*} data - 数据
         * @param {*} defaultValue - 默认值
         * @returns {string} JSON字符串
         */
        safeJsonStringify(data, defaultValue = '{}') {
            try {
                return JSON.stringify(data, null, 2);
            } catch (error) {
                console.warn('[Utils] JSON字符串化失败:', error);
                return defaultValue;
            }
        }
    };

    // 公共API
    const api = {
        /**
         * 初始化工具模块
         */
        init() {
            this._initAnimations();
            this._initToastContainer();
            console.log('✅ [Utils] V14.2 PRO 工具模块已加载并初始化');
        },

        /**
         * 初始化动画样式
         * @private
         */
        _initAnimations() {
            if (!document.getElementById('utils-animations')) {
                const style = document.createElement('style');
                style.id = 'utils-animations';
                style.textContent = `
                    @keyframes slideIn {
                        from { opacity: 0; transform: translateX(400px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                    }
                    
                    .animate-slide-in { animation: slideIn ${config.animationDuration}ms ease-out; }
                    .animate-fade-in { animation: fadeIn ${config.animationDuration}ms ease-out; }
                    .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                    
                    /* Toast响应式适配 */
                    @media (max-width: 768px) {
                        #toast-container { left: 4px; right: 4px; bottom: 4px; }
                        #toast-container > div { min-width: unset; width: 100%; max-width: unset; }
                    }
                `;
                document.head.appendChild(style);
            }
        },

        /**
         * 初始化Toast容器
         * @private
         */
        _initToastContainer() {
            if (!document.getElementById('toast-container')) {
                const container = document.createElement('div');
                container.id = 'toast-container';
                container.className = 'fixed bottom-4 right-4 z-[9999] space-y-2';
                document.body.appendChild(container);
            }
        },

        /**
         * 显示Toast通知
         * @param {string} message - 提示信息
         * @param {string} type - 类型: success/error/warning/info
         * @param {number} duration - 显示时长(ms)
         * @returns {HTMLElement} Toast元素
         */
        toast(message, type = 'info', duration = config.defaultToastDuration) {
            // 参数验证
            if (!message || message.trim() === '') {
                console.warn('[Utils] Toast消息不能为空');
                return null;
            }

            const container = document.getElementById('toast-container');
            if (!container) return null;

            // 定义配置
            const config = {
                icons: {
                    success: '✅',
                    error: '❌',
                    warning: '⚠️',
                    info: 'ℹ️'
                },
                colors: {
                    success: 'bg-green-600 border-green-500',
                    error: 'bg-red-600 border-red-500',
                    warning: 'bg-yellow-600 border-yellow-500',
                    info: 'bg-blue-600 border-blue-500'
                }
            };

            // 创建Toast元素
            const toast = document.createElement('div');
            toast.className = `${config.colors[type] || config.colors.info} border-2 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-[400px] animate-slide-in`;
            
            // 处理消息内容
            const safeMessage = this.escapeHtml(message)
                .replace(/\n/g, '<br>')
                .replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>')
                .replace(/\[i\](.*?)\[\/i\]/g, '<em>$1</em>');

            toast.innerHTML = `
                <span class="text-2xl flex-shrink-0">${config.icons[type] || config.icons.info}</span>
                <span class="flex-1 font-medium">${safeMessage}</span>
                <button class="text-white/70 hover:text-white transition flex-shrink-0" aria-label="关闭">
                    <i class="fas fa-times"></i>
                </button>
            `;

            // 添加关闭事件
            const closeBtn = toast.querySelector('button');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this._removeToast(toast));
            }

            // 添加到容器
            container.appendChild(toast);

            // 自动移除
            setTimeout(() => this._removeToast(toast), duration);

            return toast;
        },

        /**
         * 移除Toast元素
         * @private
         * @param {HTMLElement} toast - Toast元素
         */
        _removeToast(toast) {
            if (!privateUtils.isElement(toast)) return;

            toast.style.opacity = '0';
            toast.style.transform = 'translateX(400px)';
            
            setTimeout(() => {
                try {
                    toast.remove();
                } catch (error) {
                    console.warn('[Utils] Toast移除失败:', error);
                }
            }, config.animationDuration);
        },

        /**
         * 格式化数字（千分位）
         * @param {number|string} num - 数字
         * @param {number} decimals - 小数位数
         * @returns {string} 格式化后的数字
         */
        formatNumber(num, decimals = 0) {
            const number = this.parseNumber(num);
            if (isNaN(number)) return '0';

            return number.toLocaleString('zh-CN', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            });
        },

        /**
         * 生成唯一ID
         * @param {string} prefix - 前缀
         * @param {number} length - 随机部分长度
         * @returns {string} 唯一ID
         */
        generateId(prefix = 'ID', length = 9) {
            try {
                const timestamp = Date.now();
                const random = Math.random().toString(36)
                    .substr(2, length)
                    .padEnd(length, '0');
                return `${prefix}-${timestamp}-${random}`;
            } catch (error) {
                console.error('[Utils] 生成ID失败:', error);
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
            } catch (error) {
                console.error('[Utils] 生成PI编号失败:', error);
                return `PI${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
            }
        },

        /**
         * 格式化日期
         * @param {Date|string|number} date - 日期
         * @param {string} format - 格式 YYYY-MM-DD HH:mm:ss
         * @returns {string} 格式化后的日期
         */
        formatDate(date, format = config.dateFormats.short) {
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
            } catch (error) {
                console.error('[Utils] 格式化日期失败:', error);
                return date ? String(date) : '';
            }
        },

        /**
         * 下载JSON文件
         * @param {object} data - 数据
         * @param {string} filename - 文件名
         * @param {string} contentType - 内容类型
         */
        downloadJSON(data, filename = 'data.json', contentType = 'application/json; charset=utf-8') {
            try {
                const jsonString = privateUtils.safeJsonStringify(data);
                const blob = new Blob([jsonString], { type: contentType });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.style.display = 'none';
                
                document.body.appendChild(a);
                a.click();
                
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);

                this.toast(`文件 ${filename} 已下载`, 'success');
            } catch (error) {
                console.error('[Utils] 下载JSON失败:', error);
                this.toast('文件下载失败', 'error');
            }
        },

        /**
         * 复制文本到剪贴板
         * @param {string} text - 文本
         * @param {string} successMessage - 成功消息
         * @returns {Promise<boolean>} 是否成功
         */
        async copyToClipboard(text, successMessage = '已复制到剪贴板') {
            if (!text) {
                this.toast('复制内容不能为空', 'warning');
                return false;
            }

            try {
                // 现代浏览器API
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(text);
                    this.toast(successMessage, 'success');
                    return true;
                }

                // 降级方案
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                
                document.body.appendChild(textarea);
                textarea.select();
                
                const success = document.execCommand('copy');
                document.body.removeChild(textarea);

                if (success) {
                    this.toast(successMessage, 'success');
                    return true;
                }

                throw new Error('剪贴板API不可用');
            } catch (error) {
                console.error('[Utils] 复制失败:', error);
                this.toast('复制失败，请手动复制', 'error');
                return false;
            }
        },

        /**
         * 安全的数字解析
         * @param {any} value - 值
         * @param {number} defaultValue - 默认值
         * @returns {number} 解析后的数字
         */
        parseNumber(value, defaultValue = 0) {
            if (value === null || value === undefined) return defaultValue;
            
            const num = parseFloat(value);
            return isNaN(num) ? defaultValue : num;
        },

        /**
         * 设置元素文本
         * @param {string|HTMLElement} target - 元素ID或元素
         * @param {string} text - 文本
         * @returns {boolean} 是否成功
         */
        setText(target, text) {
            try {
                const el = this.getElement(target);
                if (el) {
                    el.textContent = text;
                    return true;
                }
                return false;
            } catch (error) {
                console.error('[Utils] 设置文本失败:', error);
                return false;
            }
        },

        /**
         * 设置元素HTML
         * @param {string|HTMLElement} target - 元素ID或元素
         * @param {string} html - HTML内容
         * @returns {boolean} 是否成功
         */
        setHTML(target, html) {
            try {
                const el = this.getElement(target);
                if (el) {
                    el.innerHTML = html;
                    return true;
                }
                return false;
            } catch (error) {
                console.error('[Utils] 设置HTML失败:', error);
                return false;
            }
        },

        /**
         * 获取DOM元素
         * @param {string|HTMLElement} target - 元素ID或元素
         * @returns {HTMLElement|null} DOM元素
         */
        getElement(target) {
            if (!target) return null;
            
            if (privateUtils.isElement(target)) {
                return target;
            }
            
            if (typeof target === 'string') {
                return document.getElementById(target);
            }
            
            return null;
        },

        /**
         * 防重复点击检查
         * @param {string|HTMLElement} target - 按钮ID或元素
         * @param {number} lockDuration - 锁定时长(ms)
         * @returns {boolean} 是否重复点击
         */
        isDoubleClick(target, lockDuration = 3000) {
            const btn = this.getElement(target);
            if (!btn) return false;

            if (btn.dataset.clicking === 'true') {
                this.toast('操作中，请稍候...', 'warning');
                return true;
            }

            btn.dataset.clicking = 'true';
            btn.disabled = true;
            
            // 自动释放（防止卡死）
            setTimeout(() => this.releaseClick(btn), lockDuration);
            return false;
        },

        /**
         * 释放点击锁定
         * @param {string|HTMLElement} target - 按钮ID或元素
         */
        releaseClick(target) {
            const btn = this.getElement(target);
            if (btn) {
                btn.dataset.clicking = 'false';
                btn.disabled = false;
            }
        },

        /**
         * HTML转义
         * @param {string} text - 文本
         * @returns {string} 转义后的文本
         */
        escapeHtml(text) {
            if (!text) return '';
            
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            
            return text.replace(/[&<>"']/g, m => map[m]);
        },

        /**
         * 防抖函数
         * @param {Function} func - 要执行的函数
         * @param {number} wait - 等待时间(ms)
         * @param {boolean} immediate - 是否立即执行
         * @returns {Function} 防抖函数
         */
        debounce(func, wait = 300, immediate = false) {
            let timeout;
            
            return function executedFunction(...args) {
                const context = this;
                
                const later = () => {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                
                if (callNow) func.apply(context, args);
            };
        },

        /**
         * 节流函数
         * @param {Function} func - 要执行的函数
         * @param {number} limit - 限制时间(ms)
         * @returns {Function} 节流函数
         */
        throttle(func, limit = 300) {
            let inThrottle;
            
            return function executedFunction(...args) {
                const context = this;
                
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * 获取URL参数
         * @param {string} name - 参数名
         * @param {string} url - URL地址
         * @returns {string|null} 参数值
         */
        getUrlParam(name, url = window.location.href) {
            const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
            const results = regex.exec(url);
            
            if (!results) return null;
            if (!results[2]) return '';
            
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        },

        /**
         * 深度克隆对象
         * @param {*} obj - 要克隆的对象
         * @returns {*} 克隆后的对象
         */
        deepClone(obj) {
            if (obj === null || typeof obj !== 'object') return obj;
            
            if (obj instanceof Date) return new Date(obj);
            if (obj instanceof RegExp) return new RegExp(obj);
            
            if (Array.isArray(obj)) {
                return obj.map(item => this.deepClone(item));
            }
            
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            
            return clonedObj;
        },

        /**
         * 金额转大写
         * @param {number|string} amount - 金额
         * @param {string} currency - 币种
         * @returns {string} 大写金额
         */
        amountToChinese(amount, currency = 'CNY') {
            const num = this.parseNumber(amount);
            if (num === 0) return '零元整';

            const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
            const units = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿'];
            const decimals = ['角', '分'];

            const integerPart = Math.floor(num);
            const decimalPart = Math.round((num - integerPart) * 100);

            let result = '';

            // 处理整数部分
            if (integerPart > 0) {
                const integerStr = integerPart.toString();
                const length = integerStr.length;

                for (let i = 0; i < length; i++) {
                    const digit = parseInt(integerStr[i]);
                    const position = length - i - 1;
                    const unit = units[position % 8];

                    if (digit !== 0) {
                        result += digits[digit] + unit;
                    } else {
                        // 处理连续零
                        if (i > 0 && parseInt(integerStr[i - 1]) !== 0) {
                            result += digits[digit];
                        }
                        // 处理万和亿单位
                        if (position % 8 === 4) {
                            result += '万';
                        } else if (position % 8 === 0 && position > 0) {
                            result += '亿';
                        }
                    }
                }

                result += currency === 'CNY' ? '元' : '圆';
            }

            // 处理小数部分
            if (decimalPart > 0) {
                const jiao = Math.floor(decimalPart / 10);
                const fen = decimalPart % 10;

                if (jiao > 0) {
                    result += digits[jiao] + decimals[0];
                } else if (integerPart > 0) {
                    result += '零';
                }

                if (fen > 0) {
                    result += digits[fen] + decimals[1];
                }
            } else {
                result += '整';
            }

            // 处理特殊情况
            result = result.replace(/零万/g, '万');
            result = result.replace(/零亿/g, '亿');
            result = result.replace(/亿万/g, '亿');
            result = result.replace(/零零/g, '零');
            result = result.replace(/零元/g, '元');
            result = result.replace(/^零/, '');

            return result;
        },

        /**
         * 验证邮箱格式
         * @param {string} email - 邮箱地址
         * @returns {boolean} 是否有效
         */
        isValidEmail(email) {
            if (!email) return false;
            
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        /**
         * 验证手机号码
         * @param {string} phone - 手机号码
         * @param {string} country - 国家代码
         * @returns {boolean} 是否有效
         */
        isValidPhone(phone, country = 'CN') {
            if (!phone) return false;
            
            const patterns = {
                CN: /^1[3-9]\d{9}$/,
                US: /^\d{10}$/,
                UK: /^\d{11}$/,
                JP: /^\d{10,11}$/
            };
            
            const pattern = patterns[country] || patterns.CN;
            return pattern.test(phone.replace(/\D/g, ''));
        },

        /**
         * 格式化电话号码
         * @param {string} phone - 电话号码
         * @param {string} country - 国家代码
         * @returns {string} 格式化后的号码
         */
        formatPhone(phone, country = 'CN') {
            if (!phone) return '';
            
            const cleaned = phone.replace(/\D/g, '');
            
            const formats = {
                CN: (num) => num.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3'),
                US: (num) => num.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'),
                UK: (num) => num.replace(/(\d{5})(\d{6})/, '$1 $2'),
                JP: (num) => num.length === 10 
                    ? num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') 
                    : num.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3')
            };
            
            const format = formats[country] || formats.CN;
            return format(cleaned);
        },

        /**
         * 计算两个日期之间的天数
         * @param {Date|string} date1 - 日期1
         * @param {Date|string} date2 - 日期2
         * @returns {number} 天数差
         */
        daysBetween(date1, date2) {
            try {
                const d1 = new Date(date1);
                const d2 = new Date(date2);
                
                if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
                
                const timeDiff = Math.abs(d2.getTime() - d1.getTime());
                return Math.ceil(timeDiff / (1000 * 3600 * 24));
            } catch (error) {
                console.error('[Utils] 计算日期差失败:', error);
                return 0;
            }
        },

        /**
         * 生成随机颜色
         * @param {boolean} opacity - 是否包含透明度
         * @returns {string} 颜色值
         */
        randomColor(opacity = false) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            
            if (opacity) {
                const a = (Math.random() * 0.5 + 0.5).toFixed(2);
                return `rgba(${r}, ${g}, ${b}, ${a})`;
            }
            
            return `rgb(${r}, ${g}, ${b})`;
        },

        /**
         * 存储数据到本地存储
         * @param {string} key - 键名
         * @param {*} value - 值
         * @param {number} expiration - 过期时间(秒)
         * @returns {boolean} 是否成功
         */
        setLocalStorage(key, value, expiration = null) {
            try {
                const item = {
                    value: value,
                    timestamp: Date.now()
                };
                
                if (expiration) {
                    item.expiration = Date.now() + expiration * 1000;
                }
                
                localStorage.setItem(key, JSON.stringify(item));
                return true;
            } catch (error) {
                console.error('[Utils] 设置本地存储失败:', error);
                return false;
            }
        },

        /**
         * 从本地存储获取数据
         * @param {string} key - 键名
         * @returns {*} 存储的值
         */
        getLocalStorage(key) {
            try {
                const itemStr = localStorage.getItem(key);
                if (!itemStr) return null;
                
                const item = JSON.parse(itemStr);
                
                // 检查过期时间
                if (item.expiration && Date.now() > item.expiration) {
                    localStorage.removeItem(key);
                    return null;
                }
                
                return item.value;
            } catch (error) {
                console.error('[Utils] 获取本地存储失败:', error);
                return null;
            }
        },

        /**
         * 显示加载指示器
         * @param {string} targetId - 目标容器ID
         * @param {string} message - 加载消息
         * @returns {HTMLElement} 加载元素
         */
        showLoading(targetId = 'loading-container', message = '加载中...') {
            let container = document.getElementById(targetId);
            
            if (!container) {
                container = document.createElement('div');
                container.id = targetId;
                container.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]';
                document.body.appendChild(container);
            }
            
            container.innerHTML = `
                <div class="bg-dark border border-gray-700 rounded-xl p-8 text-center animate-fade-in">
                    <div class="animate-spin text-4xl mb-4">⟳</div>
                    <div class="text-xl font-bold text-white mb-2">${message}</div>
                    <div class="text-sm text-gray-400">请稍候...</div>
                </div>
            `;
            
            container.style.display = 'flex';
            return container;
        },

        /**
         * 隐藏加载指示器
         * @param {string} targetId - 目标容器ID
         */
        hideLoading(targetId = 'loading-container') {
            const container = document.getElementById(targetId);
            if (container) {
                container.style.display = 'none';
            }
        },

        /**
         * 显示确认对话框
         * @param {string} message - 消息
         * @param {string} title - 标题
         * @param {Object} options - 选项
         * @returns {Promise<boolean>} 是否确认
         */
        confirmDialog(message, title = '确认操作', options = {}) {
            return new Promise((resolve) => {
                const defaultOptions = {
                    confirmText: '确认',
                    cancelText: '取消',
                    confirmColor: 'bg-red-600 hover:bg-red-700',
                    cancelColor: 'bg-gray-600 hover:bg-gray-700'
                };

                const dialogOptions = { ...defaultOptions, ...options };
                const dialogId = `confirm-dialog-${Date.now()}`;

                // 创建对话框
                const dialog = document.createElement('div');
                dialog.id = dialogId;
                dialog.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fade-in';
                dialog.innerHTML = `
                    <div class="bg-dark border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4">
                        <div class="text-xl font-bold text-white mb-4">${title}</div>
                        <div class="text-gray-300 mb-6">${message}</div>
                        <div class="flex gap-3">
                            <button id="confirm-btn" class="${dialogOptions.confirmColor} text-white px-6 py-2 rounded font-bold transition-colors">
                                ${dialogOptions.confirmText}
                            </button>
                            <button id="cancel-btn" class="${dialogOptions.cancelColor} text-white px-6 py-2 rounded font-bold transition-colors">
                                ${dialogOptions.cancelText}
                            </button>
                        </div>
                    </div>
                `;

                document.body.appendChild(dialog);

                // 添加事件监听
                const confirmBtn = dialog.querySelector('#confirm-btn');
                const cancelBtn = dialog.querySelector('#cancel-btn');

                const cleanup = () => {
                    if (dialog.parentNode) {
                        dialog.parentNode.removeChild(dialog);
                    }
                };

                confirmBtn.addEventListener('click', () => {
                    cleanup();
                    resolve(true);
                });

                cancelBtn.addEventListener('click', () => {
                    cleanup();
                    resolve(false);
                });

                // 点击背景关闭
                dialog.addEventListener('click', (e) => {
                    if (e.target === dialog) {
                        cleanup();
                        resolve(false);
                    }
                });
            });
        }
    };

    // 自动初始化
    document.addEventListener('DOMContentLoaded', () => {
        api.init();
    });

    return api;
})();

// 挂载到全局
window.WorkbenchUtils = WorkbenchUtils;

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchUtils;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchUtils);
}