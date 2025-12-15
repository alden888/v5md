/*!
 * V5 Medical LTD Core Interaction Script
 * @version 2.0.0
 * @author V5 Medical Development Team
 * @description Centralized logic for UI interactions, analytics, and performance
 */

'use strict';

const V5Medical = (() => {
    // === 1. 配置中心 ===
    const config = {
        loader: { timeout: 1500, fadeDuration: 300 },
        scroll: { navbarThreshold: 50, backToTopThreshold: 300 },
        analytics: { trackingId: 'G-JE15YSMC2W' },
        translate: {
            pageLanguage: 'en',
            includedLanguages: 'en,ar,es,fr,ru,nl,de,it,pt,ja,ko,tr,pl,vi,hi,id,th,sv,zh-CN,zh-TW',
            layout: 'SIMPLE',
            autoDisplay: false
        }
    };

    // === 2. 工具函数 ===
    
    // 节流函数
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // 安全执行
    const safeExecute = (func, name = 'Function') => {
        try { return func(); } 
        catch (e) { console.warn(`[V5Medical] ${name} error:`, e); }
    };

    // 延迟工具
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // === 3. 核心模块 ===

    /**
     * 全局分析追踪 (暴露给 Window 以支持 onclick)
     */
    const initAnalytics = () => {
        // 初始化 DataLayer
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        
        // 挂载 gtag 到 window 供内部使用
        window.gtag = gtag;

        if (!document.querySelector(`script[src*="${config.analytics.trackingId}"]`)) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.trackingId}`;
            document.head.appendChild(script);
            
            script.onload = () => {
                gtag('js', new Date());
                gtag('config', config.analytics.trackingId, { 'anonymize_ip': true });
            };
        }

        // 定义全局追踪函数 (修复 HTML 中的 ReferenceError)
        window.trackWhatsAppClick = () => {
            gtag('event', 'whatsapp_click', { event_category: 'Lead', event_label: 'WhatsApp Button' });
        };
        
        window.trackPDFDownload = (name) => {
            gtag('event', 'pdf_download', { event_category: 'Resource', event_label: name });
        };
        
        window.trackEmailClick = () => {
            gtag('event', 'email_click', { event_category: 'Contact', event_label: 'Email Link' });
        };

        window.trackProductClick = (name) => {
            gtag('event', 'view_item', { event_category: 'Product', event_label: name });
        };
        
        window.trackNavigationClick = (section) => {
            gtag('event', 'navigation', { event_category: 'UI', event_label: section });
        };
    };

    /**
     * UI 交互逻辑 (菜单、滚动、回到顶部)
     * 等待 Layout 注入完成后再绑定
     */
    const initUI = () => {
        // 1. 移动端菜单 (接管 Layout 的逻辑)
        const menuBtn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        
        if (menuBtn && menu) {
            // 移除旧的监听器 (如果存在) 并添加新的
            const newBtn = menuBtn.cloneNode(true);
            menuBtn.parentNode.replaceChild(newBtn, menuBtn);
            
            newBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('hidden');
                const icon = newBtn.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });

            document.addEventListener('click', (e) => {
                if (!newBtn.contains(e.target) && !menu.contains(e.target) && !menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                    const icon = newBtn.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            });
        }

        // 2. 导航栏滚动效果
        const navbar = document.getElementById('navbar');
        if (navbar) {
            const handleScroll = throttle(() => {
                if (window.scrollY > config.scroll.navbarThreshold) {
                    navbar.classList.add('nav-scrolled', 'shadow-lg');
                    navbar.classList.remove('shadow-md');
                } else {
                    navbar.classList.remove('nav-scrolled', 'shadow-lg');
                    navbar.classList.add('shadow-md');
                }
            }, 100);
            window.addEventListener('scroll', handleScroll);
        }

        // 3. 回到顶部按钮
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            const handleBackToTop = throttle(() => {
                if (window.scrollY > config.scroll.backToTopThreshold) {
                    backToTop.classList.remove('opacity-0', 'invisible');
                    backToTop.classList.add('opacity-100', 'visible');
                } else {
                    backToTop.classList.add('opacity-0', 'invisible');
                    backToTop.classList.remove('opacity-100', 'visible');
                }
            }, 100);
            
            window.addEventListener('scroll', handleBackToTop);
            backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    /**
     * 谷歌翻译
     */
    const initTranslate = () => {
        // 避免重复初始化
        if (window.googleTranslateInitialized) return;
        
        window.googleTranslateElementInit = () => {
            new google.translate.TranslateElement({
                pageLanguage: config.translate.pageLanguage,
                includedLanguages: config.translate.includedLanguages,
                layout: google.translate.TranslateElement.InlineLayout[config.translate.layout],
                autoDisplay: config.translate.autoDisplay
            }, 'google_translate_element');
            
            // 样式修复
            const style = document.createElement('style');
            style.innerHTML = `
                .goog-te-gadget { font-family: inherit !important; color: #4b5563 !important; }
                .goog-te-gadget-simple { background-color: transparent !important; border: none !important; padding: 0 !important; }
                .goog-te-banner-frame { display: none !important; }
                body { top: 0 !important; }
            `;
            document.head.appendChild(style);
        };

        if (!document.querySelector('script[src*="translate.google.com"]')) {
            const script = document.createElement('script');
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }
        window.googleTranslateInitialized = true;
    };

    /**
     * 表单处理
     */
    const initForms = () => {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // 验证
            let isValid = true;
            form.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if (!isValid) return showNotification('Please fill in all required fields.', 'error');

            // 提交
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    showNotification('Message sent successfully!', 'success');
                    if(window.gtag) gtag('event', 'generate_lead', { event_category: 'Form', event_label: 'Contact' });
                } else {
                    throw new Error('Submission failed');
                }
            } catch (err) {
                showNotification('Failed to send message. Please try WhatsApp.', 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    };

    /**
     * 通知气泡
     */
    const showNotification = (msg, type = 'info') => {
        const div = document.createElement('div');
        const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-blue-500' };
        div.className = `fixed top-4 right-4 z-[9999] ${colors[type]} text-white px-6 py-3 rounded-lg shadow-xl transform transition-all duration-300 translate-x-full flex items-center gap-3`;
        div.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check' : 'fa-info-circle'}"></i> <span>${msg}</span>`;
        document.body.appendChild(div);
        
        requestAnimationFrame(() => div.classList.remove('translate-x-full'));
        setTimeout(() => {
            div.classList.add('translate-x-full');
            setTimeout(() => div.remove(), 300);
        }, 4000);
    };

    /**
     * 4. 页面加载动画控制
     */
    const initLoader = () => {
        const loader = document.getElementById('loader');
        if (loader) {
            // 确保至少显示一瞬间，避免闪烁
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, config.loader.fadeDuration);
            }, 300); // 最小显示时间
        }
    };

    // === 4. 初始化入口 ===
    const init = async () => {
        // 1. 初始化分析工具 (最优先)
        safeExecute(initAnalytics, 'Analytics');

        // 2. 等待 Layout.js 注入 DOM (如果是动态注入的)
        // 简单的检查机制：如果 #navbar 不存在，稍微等待一下
        let attempts = 0;
        while (!document.getElementById('navbar') && attempts < 10) {
            await wait(50);
            attempts++;
        }

        // 3. 初始化 UI 和功能
        safeExecute(initUI, 'UI Interactions');
        safeExecute(initTranslate, 'Google Translate');
        safeExecute(initForms, 'Forms');
        
        // 4. 图片懒加载
        if ('loading' in HTMLImageElement.prototype) {
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                if (img.dataset.src) img.src = img.dataset.src;
            });
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }

        // 5. 隐藏加载动画
        initLoader();
    };

    return { init, showNotification };
})();

// 启动
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', V5Medical.init);
} else {
    V5Medical.init();
}
