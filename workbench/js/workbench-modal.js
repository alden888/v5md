/**
 * V14.2 PRO - 模态框管理器
 * 统一管理所有模态框，解决重叠显示问题
 * @namespace WorkbenchModal
 */
const WorkbenchModal = (() => {
    'use strict';

    // 模态框栈（支持多层模态框）
    const modalStack = [];
    
    // 当前活动的模态框
    let currentModal = null;

    /**
     * 初始化模态框管理器
     */
    function init() {
        console.log('[Modal] 模态框管理器已初始化');
        
        // 监听ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && currentModal) {
                close();
            }
        });
    }

    /**
     * 打开模态框
     * @param {Object} options - 模态框配置
     * @returns {HTMLElement} 模态框元素
     */
    function open(options = {}) {
        try {
            // 默认配置
            const defaultOptions = {
                title: '提示',
                content: '',
                buttons: [],
                size: 'md', // sm, md, lg, xl
                closeOnClickOutside: true,
                closeOnEsc: true,
                showCloseButton: true,
                className: '',
                onOpen: null,
                onClose: null
            };

            const config = { ...defaultOptions, ...options };

            // 关闭当前模态框（如果存在）
            if (currentModal) {
                close();
            }

            // 创建模态框元素
            const modal = createModalElement(config);
            
            // 添加到DOM
            document.body.appendChild(modal);
            
            // 设置为当前模态框
            currentModal = modal;
            modalStack.push(modal);

            // 添加动画
            requestAnimationFrame(() => {
                modal.classList.add('modal-show');
            });

            // 锁定页面滚动
            document.body.style.overflow = 'hidden';

            // 调用回调
            if (config.onOpen && typeof config.onOpen === 'function') {
                config.onOpen(modal);
            }

            console.log('[Modal] 模态框已打开');
            return modal;
        } catch (error) {
            console.error('[Modal] 打开模态框失败:', error);
            return null;
        }
    }

    /**
     * 创建模态框元素
     * @param {Object} config - 配置
     * @returns {HTMLElement} 模态框元素
     */
    function createModalElement(config) {
        const modal = document.createElement('div');
        modal.className = `workbench-modal fixed inset-0 z-[9999] flex items-center justify-center ${config.className}`;
        modal.dataset.modalId = `modal-${Date.now()}`;

        // 尺寸映射
        const sizeClasses = {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
            '2xl': 'max-w-2xl',
            '3xl': 'max-w-3xl',
            '4xl': 'max-w-4xl',
            full: 'max-w-full'
        };

        const sizeClass = sizeClasses[config.size] || sizeClasses.md;

        modal.innerHTML = `
            <!-- 背景遮罩 -->
            <div class="modal-backdrop absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"></div>
            
            <!-- 模态框容器 -->
            <div class="modal-container relative bg-gray-900 rounded-lg shadow-2xl w-full ${sizeClass} mx-4 transform transition-all">
                <!-- 头部 -->
                <div class="modal-header flex justify-between items-center p-6 border-b border-gray-800">
                    <h3 class="modal-title text-xl font-bold text-white">${config.title}</h3>
                    ${config.showCloseButton ? `
                        <button class="modal-close-btn text-gray-400 hover:text-white text-2xl leading-none transition-colors" 
                                aria-label="关闭">&times;</button>
                    ` : ''}
                </div>
                
                <!-- 内容 -->
                <div class="modal-content p-6">
                    ${config.content}
                </div>
                
                <!-- 底部按钮 -->
                ${config.buttons && config.buttons.length > 0 ? `
                    <div class="modal-footer flex justify-end gap-3 p-6 border-t border-gray-800">
                        ${config.buttons.map((btn, index) => `
                            <button class="modal-btn ${btn.className || 'bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors'}" 
                                    data-btn-index="${index}">
                                ${btn.text || '按钮'}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        // 绑定关闭按钮事件
        if (config.showCloseButton) {
            const closeBtn = modal.querySelector('.modal-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => close());
            }
        }

        // 绑定自定义按钮事件
        if (config.buttons) {
            const buttons = modal.querySelectorAll('.modal-btn');
            buttons.forEach((btn, index) => {
                const btnConfig = config.buttons[index];
                if (btnConfig && btnConfig.onClick) {
                    btn.addEventListener('click', (e) => {
                        btnConfig.onClick(modal, e);
                    });
                }
            });
        }

        // 点击背景关闭
        if (config.closeOnClickOutside) {
            const backdrop = modal.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.addEventListener('click', () => close());
            }
        }

        return modal;
    }

    /**
     * 关闭模态框
     * @param {HTMLElement} modal - 指定要关闭的模态框（可选，默认关闭当前）
     */
    function close(modal = null) {
        try {
            const targetModal = modal || currentModal;
            
            if (!targetModal) {
                console.warn('[Modal] 没有打开的模态框');
                return;
            }

            // 移除动画
            targetModal.classList.remove('modal-show');
            targetModal.classList.add('modal-hide');

            // 延迟移除DOM
            setTimeout(() => {
                if (targetModal.parentNode) {
                    targetModal.parentNode.removeChild(targetModal);
                }

                // 从栈中移除
                const index = modalStack.indexOf(targetModal);
                if (index > -1) {
                    modalStack.splice(index, 1);
                }

                // 更新当前模态框
                if (targetModal === currentModal) {
                    currentModal = modalStack[modalStack.length - 1] || null;
                }

                // 如果没有模态框了，解锁页面滚动
                if (modalStack.length === 0) {
                    document.body.style.overflow = '';
                }
            }, 300);

            console.log('[Modal] 模态框已关闭');
        } catch (error) {
            console.error('[Modal] 关闭模态框失败:', error);
        }
    }

    /**
     * 关闭所有模态框
     */
    function closeAll() {
        try {
            // 复制栈（避免在遍历时修改）
            const modals = [...modalStack];
            
            modals.forEach(modal => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            });

            // 清空栈
            modalStack.length = 0;
            currentModal = null;

            // 解锁页面滚动
            document.body.style.overflow = '';

            console.log('[Modal] 所有模态框已关闭');
        } catch (error) {
            console.error('[Modal] 关闭所有模态框失败:', error);
        }
    }

    /**
     * 确认对话框
     * @param {string} message - 消息
     * @param {Object} options - 选项
     * @returns {Promise<boolean>} 是否确认
     */
    function confirm(message, options = {}) {
        return new Promise((resolve) => {
            const defaultOptions = {
                title: '确认操作',
                confirmText: '确认',
                cancelText: '取消',
                confirmColor: 'bg-red-600 hover:bg-red-700',
                cancelColor: 'bg-gray-700 hover:bg-gray-600',
                ...options
            };

            open({
                title: defaultOptions.title,
                content: `<p class="text-gray-300">${message}</p>`,
                buttons: [
                    {
                        text: defaultOptions.cancelText,
                        className: `${defaultOptions.cancelColor} text-white px-6 py-2 rounded font-medium`,
                        onClick: (modal) => {
                            close(modal);
                            resolve(false);
                        }
                    },
                    {
                        text: defaultOptions.confirmText,
                        className: `${defaultOptions.confirmColor} text-white px-6 py-2 rounded font-medium`,
                        onClick: (modal) => {
                            close(modal);
                            resolve(true);
                        }
                    }
                ],
                closeOnClickOutside: false
            });
        });
    }

    /**
     * 警告对话框
     * @param {string} message - 消息
     * @param {Object} options - 选项
     * @returns {Promise<void>}
     */
    function alert(message, options = {}) {
        return new Promise((resolve) => {
            const defaultOptions = {
                title: '提示',
                buttonText: '确定',
                ...options
            };

            open({
                title: defaultOptions.title,
                content: `<p class="text-gray-300">${message}</p>`,
                buttons: [
                    {
                        text: defaultOptions.buttonText,
                        className: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium',
                        onClick: (modal) => {
                            close(modal);
                            resolve();
                        }
                    }
                ]
            });
        });
    }

    /**
     * 获取当前模态框
     * @returns {HTMLElement|null} 当前模态框
     */
    function getCurrent() {
        return currentModal;
    }

    /**
     * 检查是否有打开的模态框
     * @returns {boolean} 是否有模态框打开
     */
    function isOpen() {
        return modalStack.length > 0;
    }

    // 添加必要的CSS样式
    function injectStyles() {
        if (document.getElementById('workbench-modal-styles')) {
            return; // 已注入
        }

        const style = document.createElement('style');
        style.id = 'workbench-modal-styles';
        style.textContent = `
            .workbench-modal {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .workbench-modal.modal-show {
                opacity: 1;
            }
            
            .workbench-modal.modal-show .modal-backdrop {
                opacity: 1;
            }
            
            .workbench-modal.modal-show .modal-container {
                transform: scale(1);
                opacity: 1;
            }
            
            .workbench-modal .modal-container {
                transform: scale(0.95);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            .workbench-modal.modal-hide {
                opacity: 0;
            }
            
            .workbench-modal.modal-hide .modal-container {
                transform: scale(0.95);
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }

    // 公共API
    const api = {
        init,
        open,
        close,
        closeAll,
        confirm,
        alert,
        getCurrent,
        isOpen
    };

    // 自动初始化
    document.addEventListener('DOMContentLoaded', () => {
        init();
        injectStyles();
    });

    return api;
})();

// 挂载到全局
window.WorkbenchModal = WorkbenchModal;

// 模块导出（支持CommonJS和ES模块）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkbenchModal;
} else if (typeof define === 'function' && define.amd) {
    define([], () => WorkbenchModal);
}
