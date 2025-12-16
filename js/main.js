/*!
 * V5 Medical LTD Core Interaction Script
 * @version 2.1.0
 * @author V5 Medical Development Team
 * @description Centralized logic for UI interactions, analytics, and forms
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

    const safeExecute = (func, name = 'Function') => {
        try { return func(); } 
        catch (e) { console.warn(`[V5Medical] ${name} error:`, e); }
    };

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // === 3. 核心模块 ===

    const initAnalytics = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
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

        // Global Tracking Functions
        window.trackWhatsAppClick = () => gtag('event', 'whatsapp_click', { event_category: 'Lead', event_label: 'WhatsApp Button' });
        window.trackPDFDownload = (name) => gtag('event', 'pdf_download', { event_category: 'Resource', event_label: name });
        window.trackEmailClick = () => gtag('event', 'email_click', { event_category: 'Contact', event_label: 'Email Link' });
        window.trackProductClick = (name) => gtag('event', 'view_item', { event_category: 'Product', event_label: name });
    };

    const initUI = () => {
        // Mobile Menu
        const menuBtn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        
        if (menuBtn && menu) {
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

        // Navbar Scroll
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

        // Back to Top
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            const handleBackToTop = throttle(() => {
                if (window.scrollY > config.scroll.backToTopThreshold) {
                    backToTop.classList.remove('opacity-0', 'invisible', 'translate-y-10');
                    backToTop.classList.add('opacity-100', 'visible', 'translate-y-0');
                } else {
                    backToTop.classList.add('opacity-0', 'invisible', 'translate-y-10');
                    backToTop.classList.remove('opacity-100', 'visible', 'translate-y-0');
                }
            }, 100);
            
            window.addEventListener('scroll', handleBackToTop);
            backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const initTranslate = () => {
        if (window.googleTranslateInitialized) return;
        
        window.googleTranslateElementInit = () => {
            new google.translate.TranslateElement({
                pageLanguage: config.translate.pageLanguage,
                includedLanguages: config.translate.includedLanguages,
                layout: google.translate.TranslateElement.InlineLayout[config.translate.layout],
                autoDisplay: config.translate.autoDisplay
            }, 'google_translate_element');
            
            const style = document.createElement('style');
            style.innerHTML = `
                .goog-te-gadget { font-family: inherit !important; color: white !important; } /* 文字白色 */
    .goog-te-gadget-simple { 
        background-color: rgba(255,255,255,0.15) !important; /* 半透明背景 */
        border: 1px solid rgba(255,255,255,0.3) !important; 
        padding: 8px 12px !important;
        border-radius: 99px !important;
    }
    .goog-te-gadget-simple span { color: white !important; font-weight: 600 !important; }
    .goog-te-gadget-icon { display: none !important; }
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
     * 表单处理逻辑更新
     */
    const initForms = () => {
        // Updated ID selector
        const form = document.getElementById('inquiry-form') || document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            
            // 验证
            let isValid = true;
            form.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500', 'ring-1', 'ring-red-500');
                    input.addEventListener('input', () => input.classList.remove('border-red-500', 'ring-1', 'ring-red-500'), { once: true });
                }
            });

            if (!isValid) return showNotification('Please fill in all required fields marked with *', 'error');

            // 提交状态
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin animate-spin"></i> Sending...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    showNotification('Inquiry sent successfully! We will contact you shortly.', 'success');
                    if(window.gtag) gtag('event', 'generate_lead', { event_category: 'Form', event_label: 'Inquiry' });
                } else {
                    throw new Error('Submission failed');
                }
            } catch (err) {
                showNotification('Connection error. Please try WhatsApp instead.', 'error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalHTML;
            }
        });
    };

    const showNotification = (msg, type = 'info') => {
        const div = document.createElement('div');
        const colors = { 
            success: 'bg-green-600 border-green-700', 
            error: 'bg-red-600 border-red-700', 
            info: 'bg-blue-600 border-blue-700' 
        };
        
        div.className = `fixed top-24 right-4 z-[9999] ${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl border flex items-center gap-3 transform transition-all duration-500 translate-x-full opacity-0 max-w-sm`;
        div.innerHTML = `
            <div class="bg-white/20 rounded-full p-1"><i class="fas ${type === 'success' ? 'fa-check' : 'fa-info-circle'}"></i></div>
            <span class="font-medium text-sm">${msg}</span>
        `;
        document.body.appendChild(div);
        
        // 动画进入
        requestAnimationFrame(() => {
            div.classList.remove('translate-x-full', 'opacity-0');
        });
        
        // 自动移除
        setTimeout(() => {
            div.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => div.remove(), 500);
        }, 4000);
    };

    const initLoader = () => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, config.loader.fadeDuration);
            }, 300);
        }
    };

    // === 4. 初始化入口 ===
    const init = async () => {
        safeExecute(initAnalytics, 'Analytics');

        // 等待 Layout 渲染
        let attempts = 0;
        while (!document.getElementById('navbar') && attempts < 20) {
            await wait(50);
            attempts++;
        }

        safeExecute(initUI, 'UI Interactions');
        safeExecute(initTranslate, 'Google Translate');
        safeExecute(initForms, 'Forms');
        
        // Lazy Load Polyfill
        if (!('loading' in HTMLImageElement.prototype)) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
        }

        initLoader();
    };

    return { init, showNotification };
})();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', V5Medical.init);
} else {
    V5Medical.init();
}
