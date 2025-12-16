/**
 * V5 Medical Layout Engine
 * (Unified Layout Manager)
 * Dynamically renders Header, Footer, and Floating elements based on V5Config.
 * @version 2.3.0 (Enhanced Google Translate with Config support)
 * @updated 2024-12-16
 */

const V5Layout = (() => {
    // 依赖检查：确保 config.js 已加载
    const config = window.V5Config;
    if (!config) {
        console.error('[Layout] V5Config not found. Ensure config.js is loaded before layout.js.');
        return { init: () => console.error('Layout init aborted due to missing config') };
    }

    class LayoutManager {
        constructor() {
            this.config = config;
            this.currentPage = this._detectPage();
            // 添加谷歌翻译按钮样式
            if (config.GOOGLE_TRANSLATE && config.GOOGLE_TRANSLATE.ENABLED) {
                this._addTranslateButtonStyles();
            }
        }

        /**
         * 初始化并渲染所有布局组件
         */
        init() {
            this.renderHeader();
            this.renderFooter();
            this.renderFloatingElements();
            
            // 初始化谷歌翻译按钮（如果启用）
            if (this.config.GOOGLE_TRANSLATE && this.config.GOOGLE_TRANSLATE.ENABLED) {
                this._initGoogleTranslate();
            }
            
            // 通知 main.js 绑定事件
            window.dispatchEvent(new Event('v5-layout-ready'));
            console.log('[Layout] Initialization complete');
        }

        /**
         * 添加谷歌翻译按钮的自定义样式（使用配置）
         */
        _addTranslateButtonStyles() {
            const translateConfig = this.config.GOOGLE_TRANSLATE;
            
            // 创建样式元素
            const style = document.createElement('style');
            style.id = 'v5-translate-styles';
            style.textContent = `
                /* 谷歌翻译按钮样式 - 使用配置值 */
                .google-translate-button {
                    position: fixed;
                    top: ${translateConfig.POSITION.DESKTOP.top};
                    right: ${translateConfig.POSITION.DESKTOP.right};
                    z-index: 9999;
                    background: ${translateConfig.STYLE.BACKGROUND};
                    border: ${translateConfig.STYLE.BORDER};
                    border-radius: 8px;
                    padding: 6px 12px;
                    box-shadow: ${translateConfig.STYLE.SHADOW};
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    font-family: 'Inter', sans-serif;
                }
                
                .google-translate-button:hover {
                    transform: translateY(-2px);
                    box-shadow: ${translateConfig.STYLE.HOVER_SHADOW};
                    background: ${translateConfig.STYLE.HOVER_BACKGROUND};
                }
                
                .google-translate-button:active {
                    transform: translateY(0);
                }
                
                .translate-icon {
                    color: white;
                    font-size: 1.1rem;
                }
                
                .translate-text {
                    color: white;
                    font-size: 0.85rem;
                    font-weight: 600;
                    white-space: nowrap;
                }
                
                /* 调整谷歌翻译小工具样式 */
                .goog-te-gadget {
                    font-family: 'Inter', sans-serif !important;
                    font-size: 12px !important;
                }
                
                .goog-te-gadget-simple {
                    background-color: transparent !important;
                    border: none !important;
                    padding: 0 !important;
                }
                
                /* 移动端适配 */
                @media (max-width: 768px) {
                    .google-translate-button {
                        top: ${translateConfig.POSITION.MOBILE.top};
                        right: ${translateConfig.POSITION.MOBILE.right};
                        padding: 5px 10px;
                    }
                    
                    .translate-text {
                        display: none; /* 移动端只显示图标 */
                    }
                }
                
                /* 语言选择器样式优化 */
                .goog-te-menu2 {
                    max-height: 300px !important;
                    overflow-y: auto !important;
                    border-radius: 8px !important;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
                    border: 1px solid #e5e7eb !important;
                }
                
                .goog-te-menu2-item {
                    padding: 10px 16px !important;
                    font-size: 14px !important;
                }
                
                .goog-te-menu2-item:hover {
                    background-color: #f3f4f6 !important;
                }
            `;
            
            document.head.appendChild(style);
        }

        /**
         * 初始化谷歌翻译功能
         */
        _initGoogleTranslate() {
            // 确保翻译容器存在，如果不存在则创建
            let translateContainer = document.getElementById('google_translate_element');
            
            if (!translateContainer) {
                translateContainer = document.createElement('div');
                translateContainer.id = 'google_translate_element';
                translateContainer.className = 'fixed top-24 right-4 z-50';
                document.body.appendChild(translateContainer);
            }
            
            // 清空现有内容
            translateContainer.innerHTML = '';
            
            // 添加自定义按钮
            const customButton = document.createElement('div');
            customButton.className = 'google-translate-button';
            customButton.innerHTML = `
                <i class="fas fa-language translate-icon"></i>
                <span class="translate-text">${this.config.GOOGLE_TRANSLATE.DEFAULT_LABEL}</span>
            `;
            
            translateContainer.appendChild(customButton);
            
            // 点击自定义按钮触发谷歌翻译
            customButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // 检查谷歌翻译是否已加载
                if (window.google && window.google.translate) {
                    const googleFrame = document.querySelector('.goog-te-menu-frame');
                    if (googleFrame) {
                        googleFrame.style.display = googleFrame.style.display === 'none' ? 'block' : 'none';
                    } else {
                        // 触发默认的谷歌翻译小工具
                        const translateDiv = document.querySelector('.goog-te-gadget');
                        if (translateDiv) {
                            const select = translateDiv.querySelector('select');
                            if (select) {
                                select.focus();
                                select.click();
                            }
                        }
                    }
                } else {
                    // 如果谷歌翻译尚未加载，先加载脚本
                    this._loadGoogleTranslateScript();
                    // 延迟触发点击
                    setTimeout(() => {
                        const translateDiv = document.querySelector('.goog-te-gadget');
                        if (translateDiv) {
                            const select = translateDiv.querySelector('select');
                            if (select) select.click();
                        }
                    }, 1000);
                }
            });
            
            // 加载谷歌翻译脚本
            this._loadGoogleTranslateScript();
        }

        /**
         * 加载谷歌翻译脚本
         */
        _loadGoogleTranslateScript() {
            // 如果已经加载过，直接初始化
            if (window.google && window.google.translate) {
                this._initGoogleTranslateWidget();
                return;
            }
            
            // 检查是否正在加载
            if (window.googleTranslateLoading) return;
            window.googleTranslateLoading = true;
            
            // 创建脚本
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.onload = () => {
                window.googleTranslateLoading = false;
            };
            script.onerror = () => {
                console.error('[Google Translate] Failed to load translation script');
                window.googleTranslateLoading = false;
                // 如果失败，显示一个提示
                const translateContainer = document.getElementById('google_translate_element');
                if (translateContainer) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'text-xs text-red-500 mt-1';
                    errorMsg.textContent = 'Translation service unavailable';
                    translateContainer.appendChild(errorMsg);
                }
            };
            
            document.head.appendChild(script);
            
            // 定义回调函数
            window.googleTranslateElementInit = () => {
                this._initGoogleTranslateWidget();
            };
        }

        /**
         * 初始化谷歌翻译小工具
         */
        _initGoogleTranslateWidget() {
            if (!window.google || !window.google.translate) {
                console.error('[Google Translate] Google Translate API not available');
                return;
            }
            
            try {
                const translateConfig = this.config.GOOGLE_TRANSLATE;
                
                new google.translate.TranslateElement({
                    pageLanguage: translateConfig.PAGE_LANGUAGE,
                    includedLanguages: translateConfig.LANGUAGES,
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                    multilanguagePage: true
                }, 'google_translate_element');
                
                // 隐藏默认的谷歌翻译小工具
                const hideGoogleGadget = () => {
                    const googleGadget = document.querySelector('.goog-te-gadget');
                    if (googleGadget) {
                        googleGadget.style.display = 'none';
                        return true;
                    }
                    return false;
                };
                
                // 立即尝试隐藏，然后设置间隔检查
                if (!hideGoogleGadget()) {
                    const interval = setInterval(() => {
                        if (hideGoogleGadget()) {
                            clearInterval(interval);
                        }
                    }, 100);
                    
                    // 最多尝试5秒
                    setTimeout(() => clearInterval(interval), 5000);
                }
                
            } catch (error) {
                console.error('[Google Translate] Failed to initialize:', error);
            }
        }

        // ... 其余方法保持不变 ...

    }

    return new LayoutManager();
})();

// 在 DOM 加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => V5Layout.init());
} else {
    V5Layout.init();
}
