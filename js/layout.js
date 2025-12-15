/**
 * V5 Medical Layout Engine
 * (Unified Layout Manager - Replaces old layout.js & components.js)
 * Dynamically renders Header, Footer, and Floating elements based on V5Config.
 * @version 2.1.0
 * @updated 2024-12-16
 */

const V5Layout = (() => {
    // 依赖检查：确保 config.js 已加载
    const config = window.V5Config;
    if (!config) {
        console.error('[Layout] V5Config not found. Ensure config.js is loaded before layout.js.');
        // 紧急回退：如果找不到配置，防止页面崩溃（可选）
        return { init: () => console.error('Layout init aborted due to missing config') };
    }

    class LayoutManager {
        constructor() {
            this.config = config;
            this.currentPage = this._detectPage();
        }

        /**
         * 初始化并渲染所有布局组件
         */
        init() {
            // 1. 渲染头部导航
            this.renderHeader();
            // 2. 渲染页脚
            this.renderFooter();
            // 3. 渲染悬浮按钮
            this.renderFloatingElements();
            
            // 4. 发送布局就绪事件 (通知 main.js 可以绑定交互了)
            window.dispatchEvent(new Event('v5-layout-ready'));
            
            console.log('[Layout] Initialization complete');
        }

        /**
         * 渲染头部 (Header)
         */
        renderHeader() {
            const headerContainer = document.getElementById('v5-header');
            if (!headerContainer) return;

            // 获取 Logo 路径 (自动处理 CDN/本地)
            const logoSrc = this._getImgPath(this.config.IMAGES.LOGO);
            
            // 定义菜单项
            const navItems = [
                { id: 'home', label: 'Home', href: 'index.html' },
                { id: 'about', label: 'About Us', href: 'about.html' },
                { id: 'catalog', label: 'Products', href: 'catalog.html' },
                { id: 'blog', label: 'Blog', href: 'blog.html' },
                { id: 'contact', label: 'Contact', href: 'contact.html' }
            ];

            // 生成桌面端菜单 HTML
            const navLinksHTML = navItems.map(item => `
                <a href="${item.href}" 
                   class="nav-link font-medium transition duration-200 ${this._getActiveClass(item.id)}">
                    ${item.label}
                </a>
            `).join('');

            // 生成移动端菜单 HTML
            const mobileLinksHTML = navItems.map(item => `
                <a href="${item.href}" 
                   class="block px-4 py-3 rounded-lg text-base font-medium transition ${this._getMobileActiveClass(item.id)}">
                    ${item.label}
                </a>
            `).join('');

            // 注入 HTML
            headerContainer.innerHTML = `
                <nav id="navbar" class="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center h-20">
                            <a href="index.html" class="flex items-center gap-3 group">
                                <img src="${logoSrc}" 
                                     onerror="this.style.display='none'" 
                                     class="h-10 w-auto transition-transform group-hover:scale-105" 
                                     alt="${this.config.SEO.SITE_NAME}">
                                <div>
                                    <div class="font-bold text-xl text-blue-900 leading-none tracking-tight">V5 Medical</div>
                                    <div class="text-[10px] text-blue-600 font-medium tracking-wider uppercase mt-0.5">Global Supply Chain</div>
                                </div>
                            </a>

                            <div class="hidden md:flex gap-8 items-center">
                                ${navLinksHTML}
                                <a href="${this.config.CONTACT.WHATSAPP.API_URL}" 
                                   target="_blank" 
                                   class="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-md flex items-center gap-2 transition transform hover:-translate-y-0.5"
                                   onclick="window.trackWhatsAppClick && window.trackWhatsAppClick()">
                                    <i class="fab fa-whatsapp text-lg"></i>
                                    <span>Quick Chat</span>
                                </a>
                            </div>

                            <button id="mobile-menu-btn" class="md:hidden text-gray-600 hover:text-blue-900 p-2 focus:outline-none" aria-label="Toggle menu">
                                <i class="fas fa-bars text-2xl"></i>
                            </button>
                        </div>
                    </div>

                    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
                        <div class="px-4 py-4 space-y-2">
                            ${mobileLinksHTML}
                            <div class="pt-4 mt-2 border-t border-gray-100">
                                <a href="${this.config.CONTACT.WHATSAPP.API_URL}" 
                                   target="_blank"
                                   class="flex items-center justify-center gap-2 w-full bg-green-500 text-white px-4 py-3 rounded-lg font-bold">
                                    <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            `;
        }

        /**
         * 渲染页脚 (Footer)
         */
        renderFooter() {
            const footerContainer = document.getElementById('v5-footer');
            if (!footerContainer) return;

            const year = new Date().getFullYear();
            const { CONTACT, IMAGES } = this.config;

            footerContainer.innerHTML = `
                <footer class="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                            <div class="space-y-4">
                                <div class="flex items-center gap-2 text-white font-bold text-xl">
                                    <img src="${this._getImgPath(IMAGES.LOGO)}" class="h-8 brightness-0 invert" alt="V5 Logo">
                                    <span>V5 Medical</span>
                                </div>
                                <p class="text-sm leading-relaxed text-gray-400">
                                    Professional global medical consumables supplier. ISO 13485 certified manufacturer providing factory-direct solutions.
                                </p>
                                <div class="flex gap-4 pt-2">
                                    <a href="#" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"><i class="fab fa-linkedin-in text-sm"></i></a>
                                    <a href="#" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 transition"><i class="fab fa-facebook-f text-sm"></i></a>
                                    <a href="#" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition"><i class="fab fa-youtube text-sm"></i></a>
                                </div>
                            </div>

                            <div>
                                <h3 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">Product Lines</h3>
                                <ul class="space-y-3 text-sm">
                                    <li><a href="catalog.html#surgical-sutures" class="hover:text-blue-400 transition">Surgical Sutures</a></li>
                                    <li><a href="catalog.html#surgical-packs" class="hover:text-blue-400 transition">Surgical Packs</a></li>
                                    <li><a href="catalog.html#injection" class="hover:text-blue-400 transition">Injection & Infusion</a></li>
                                    <li><a href="catalog.html#protective" class="hover:text-blue-400 transition">Protective Equipment</a></li>
                                    <li><a href="catalog.html#dental" class="hover:text-blue-400 transition">Dental Consumables</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h3>
                                <ul class="space-y-3 text-sm">
                                    <li><a href="about.html" class="hover:text-blue-400 transition">About Us</a></li>
                                    <li><a href="blog.html" class="hover:text-blue-400 transition">News & Blog</a></li>
                                    <li><a href="contact.html" class="hover:text-blue-400 transition">Contact Support</a></li>
                                    <li><a href="privacy.html" class="hover:text-blue-400 transition">Privacy Policy</a></li>
                                    <li><a href="terms.html" class="hover:text-blue-400 transition">Terms of Service</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 class="text-white font-bold mb-6 uppercase text-xs tracking-widest">Get in Touch</h3>
                                <ul class="space-y-4 text-sm">
                                    <li class="flex items-start gap-3">
                                        <i class="fas fa-map-marker-alt mt-1 text-blue-500"></i>
                                        <span>${CONTACT.ADDRESS}</span>
                                    </li>
                                    <li class="flex items-center gap-3">
                                        <i class="fas fa-envelope text-blue-500"></i>
                                        <a href="mailto:${CONTACT.EMAIL.SALES}" class="hover:text-white transition">${CONTACT.EMAIL.SALES}</a>
                                    </li>
                                    <li class="flex items-center gap-3">
                                        <i class="fab fa-whatsapp text-green-500 text-lg"></i>
                                        <a href="${CONTACT.WHATSAPP.API_URL}" target="_blank" class="hover:text-white transition font-medium">${CONTACT.WHATSAPP.DISPLAY}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                            <p>&copy; ${year} V5 Medical LTD. All rights reserved.</p>
                            <p class="mt-2 md:mt-0">Professional Global Medical Supply Chain</p>
                        </div>
                    </div>
                </footer>
            `;
        }

        /**
         * 渲染悬浮按钮 (WhatsApp & BackToTop)
         */
        renderFloatingElements() {
            // 1. WhatsApp Float (如果尚未存在)
            if (!document.getElementById('whatsapp-float')) {
                const waDiv = document.createElement('div');
                waDiv.innerHTML = `
                    <a href="${this.config.CONTACT.WHATSAPP.API_URL}" 
                       id="whatsapp-float"
                       target="_blank" 
                       class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 hover:scale-110 hover:-rotate-12 group flex items-center justify-center"
                       aria-label="Chat on WhatsApp"
                       onclick="window.trackWhatsAppClick && window.trackWhatsAppClick()">
                        <i class="fab fa-whatsapp text-3xl"></i>
                        <span class="absolute right-full mr-3 bg-gray-900 text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Chat with us
                        </span>
                    </a>
                `;
                document.body.appendChild(waDiv.firstElementChild);
            }

            // 2. Back to Top Button (如果尚未存在)
            if (!document.getElementById('back-to-top')) {
                const topBtn = document.createElement('button');
                topBtn.id = 'back-to-top';
                topBtn.className = 'fixed bottom-24 right-6 bg-blue-900/80 hover:bg-blue-900 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 opacity-0 invisible translate-y-10';
                topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
                topBtn.setAttribute('aria-label', 'Back to top');
                document.body.appendChild(topBtn);
            }
        }

        // --- 内部辅助函数 ---

        // 检测当前页面以高亮导航
        _detectPage() {
            const path = window.location.pathname;
            if (path.includes('catalog') || path.includes('product')) return 'catalog';
            if (path.includes('about')) return 'about';
            if (path.includes('contact')) return 'contact';
            if (path.includes('blog')) return 'blog';
            return 'home';
        }

        // 获取当前页面的激活样式 (桌面端)
        _getActiveClass(id) {
            return this.currentPage === id 
                ? 'text-blue-900 font-bold' 
                : 'text-gray-600 hover:text-blue-900';
        }

        // 获取当前页面的激活样式 (移动端)
        _getMobileActiveClass(id) {
            return this.currentPage === id 
                ? 'text-blue-700 bg-blue-50 font-bold' 
                : 'text-gray-600 hover:bg-gray-50';
        }

        // 处理图片路径 (兼容 CDN 和本地)
        _getImgPath(path) {
            if (path.startsWith('http')) return path;
            return `${this.config.BASE_URL}/${path}`;
        }
    }

    return new LayoutManager();
})();

// DOM 加载完成后自动执行初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => V5Layout.init());
} else {
    V5Layout.init();
}
