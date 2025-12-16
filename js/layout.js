/**
 * V5 Medical Layout Engine
 * (Unified Layout Manager)
 * Dynamically renders Header, Footer, and Floating elements based on V5Config.
 * @version 2.8.0 (Restored Original 12-Grid Footer Design)
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
        }

        /**
         * 初始化并渲染所有布局组件
         */
        init() {
            this.renderHeader();
            this.renderFooter();
            this.renderFloatingElements();
            
            // 通知 main.js 绑定事件
            window.dispatchEvent(new Event('v5-layout-ready'));
            console.log('[Layout] Initialization complete');
        }

        /**
         * 渲染头部 (Header) - 保持不变
         */
        renderHeader() {
            const headerContainer = document.getElementById('v5-header');
            if (!headerContainer) return;

            // 获取 Logo 路径 (优先 CDN)
            const logoSrc = this.config.IMAGES.LOGO;
            const logoFallback = this.config.IMAGES.LOGO_LOCAL;
            
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
                                     onerror="this.onerror=null; this.src='${logoFallback}';" 
                                     class="h-10 w-auto transition-transform group-hover:scale-105" 
                                     alt="${this.config.SEO.SITE_NAME}">
                                <div>
                                    <div class="font-bold text-xl text-blue-900 leading-none tracking-tight">V5 Medical LTD</div>
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
         * 渲染页脚 (Footer) - 已恢复为您要求的原版设计 (Grid-12 布局 + Downloads)
         */
        renderFooter() {
            const footerContainer = document.getElementById('v5-footer');
            if (!footerContainer) return;

            const year = new Date().getFullYear();
            const { CONTACT, IMAGES } = this.config;
            const logoSrc = IMAGES.LOGO;
            const logoFallback = IMAGES.LOGO_LOCAL;

            // 使用您提供的 HTML 结构，但注入 Config 变量以保持数据同步
            footerContainer.innerHTML = `
                <footer class="bg-gray-900 text-white py-12 px-4 border-t border-gray-800">
                    <div class="max-w-7xl mx-auto">
                        <div class="grid md:grid-cols-12 gap-8 mb-12">
                            
                            <div class="md:col-span-3">
                                <div class="flex items-center gap-2 mb-4">
                                    <img src="${logoSrc}" 
                                         onerror="this.onerror=null; this.src='${logoFallback}';" 
                                         class="h-10 w-auto" 
                                         alt="V5 Medical Logo">
                                    <span class="text-xl font-bold">V5 Medical LTD</span>
                                </div>
                                <p class="text-gray-400 text-sm mb-4">Professional Global Medical Consumables Supplier</p>
                                <p class="text-gray-400 text-sm mb-4">Factory Direct Medical Consumables Manufacturer</p> 
                                <p class="text-gray-400 text-sm italic">20+ Years Exporting Experience</p>
                                <p class="text-gray-400 text-sm italic">More Sophisticated, More Professional, More Secure</p>
                            </div>
                            
                            <div class="hidden md:block md:col-span-1"></div>

                            <div class="md:col-span-2">
                                <h4 class="font-bold mb-4 text-lg text-white">Quick Links</h4>
                                <ul class="space-y-2 text-sm text-gray-400">
                                    <li><a href="index.html" class="hover:text-white transition">Home</a></li>
                                    <li><a href="about.html" class="hover:text-white transition">About Us</a></li>
                                    <li><a href="catalog.html" class="hover:text-white transition">Products</a></li>
                                    <li><a href="blog.html" class="hover:text-white transition">Blog & News</a></li>
                                    <li><a href="contact.html" class="hover:text-white transition">Contact Us</a></li>
                                    <li><a href="privacy.html" class="hover:text-white transition">Privacy Policy</a></li>
                                </ul>
                            </div>
                            
                            <div class="md:col-span-3 pl-0 md:pl-4">
                                <h4 class="font-bold mb-4 text-lg text-white">Contact Info</h4>
                                <div class="space-y-3 text-sm text-gray-400">
                                    <p class="flex items-center gap-2">
                                        <i class="fab fa-whatsapp text-green-500 w-5"></i> 
                                        <span>${CONTACT.WHATSAPP.DISPLAY} (UK)</span>
                                    </p>
                                    <p class="flex items-center gap-2">
                                        <i class="fab fa-whatsapp text-green-500 w-5"></i> 
                                        <span>${CONTACT.WHATSAPP_CN.DISPLAY} (Backup)</span>
                                    </p>
                                    <p class="flex items-center gap-2">
                                        <i class="fas fa-envelope text-blue-400 w-5"></i> 
                                        <a href="mailto:${CONTACT.EMAIL.SALES}" class="hover:text-white transition" onclick="window.trackEmailClick && window.trackEmailClick()">${CONTACT.EMAIL.SALES}</a>
                                    </p>
                                    <p class="flex items-center gap-2">
                                        <i class="fab fa-google text-red-400 w-5"></i> 
                                        <a href="mailto:v5md.com@gmail.com" class="hover:text-white transition" onclick="window.trackEmailClick && window.trackEmailClick()">v5md.com@gmail.com</a>
                                    </p>
                                    <p class="flex items-start gap-2">
                                        <i class="fas fa-map-marker-alt mt-1 w-5"></i> 
                                        <span>${CONTACT.ADDRESS}</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="md:col-span-3 pl-0 md:pl-4">
                                <h4 class="font-bold mb-4 text-lg text-white">Downloads</h4>
                                <div class="space-y-2 mb-8 text-sm">
                                    <a href="pdf/Catalog.pdf" target="_blank" onclick="window.trackPDFDownload && window.trackPDFDownload('Product Catalog')" class="flex items-center gap-2 text-gray-400 hover:text-white transition">
                                        <i class="fas fa-file-pdf text-red-400"></i> Product Catalog
                                    </a>
                                    <a href="pdf/Quotations for dental products.pdf" target="_blank" onclick="window.trackPDFDownload && window.trackPDFDownload('Dental Kit')" class="flex items-center gap-2 text-gray-400 hover:text-white transition">
                                        <i class="fas fa-file-pdf text-red-400"></i> Dental Kit
                                    </a>
                                    <a href="pdf/price list.pdf" target="_blank" onclick="window.trackPDFDownload && window.trackPDFDownload('Price List')" class="flex items-center gap-2 text-gray-400 hover:text-white transition">
                                        <i class="fas fa-file-pdf text-red-400"></i> Price List
                                    </a>
                                </div>
                                
                                <h4 class="font-bold mb-4 text-lg text-white">Follow Us</h4>
                                <div class="flex gap-3 flex-wrap">
                                    <a href="https://linkedin.com/company/v5med" target="_blank" class="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-800 transition text-white"><i class="fab fa-linkedin-in"></i></a>
                                    <a href="https://www.youtube.com/@v5med" target="_blank" class="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition text-white"><i class="fab fa-youtube"></i></a>
                                    <a href="https://www.facebook.com/v5med" target="_blank" class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition text-white"><i class="fab fa-facebook-f"></i></a>
                                    <a href="https://www.instagram.com/v5med" target="_blank" class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-full flex items-center justify-center transition text-white"><i class="fab fa-instagram"></i></a>
                                    <a href="https://www.tiktok.com/@v5med" target="_blank" class="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black transition text-white"><i class="fab fa-tiktok"></i></a>
                                    <a href="https://x.com/v5med" target="_blank" class="w-9 h-9 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition text-white"><i class="fab fa-twitter"></i></a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-center mt-8 text-sm text-gray-500">
                            <p>&copy; ${year} V5 Medical LTD. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            `;
        }

        /**
         * 渲染悬浮按钮 (WhatsApp & BackToTop)
         */
        renderFloatingElements() {
            // 1. WhatsApp Float
            if (!document.getElementById('whatsapp-float')) {
                const waDiv = document.createElement('div');
                waDiv.innerHTML = `
                    <a href="${this.config.CONTACT.WHATSAPP.API_URL}" 
                       id="whatsapp-float"
                       target="_blank" 
                       class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 group"
                       aria-label="Chat on WhatsApp"
                       onclick="window.trackWhatsAppClick && window.trackWhatsAppClick()">
                        <i class="fab fa-whatsapp text-2xl group-hover:scale-110 transition-transform"></i>
                    </a>
                `;
                document.body.appendChild(waDiv.firstElementChild);
            }

            // 2. Back to Top Button
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

        _detectPage() {
            const path = window.location.pathname;
            if (path.includes('catalog') || path.includes('product')) return 'catalog';
            if (path.includes('about')) return 'about';
            if (path.includes('contact')) return 'contact';
            if (path.includes('blog')) return 'blog';
            return 'home';
        }

        _getActiveClass(id) {
            return this.currentPage === id 
                ? 'text-blue-900 font-bold' 
                : 'text-gray-600 hover:text-blue-900';
        }

        _getMobileActiveClass(id) {
            return this.currentPage === id 
                ? 'text-blue-700 bg-blue-50 font-bold' 
                : 'text-gray-600 hover:bg-gray-50';
        }

        // 路径处理优化
        _getImgPath(path) {
            if (!path) return '';
            if (path.startsWith('http')) return path;
            const baseUrl = this.config.BASE_URL.replace(/\/$/, '');
            const cleanPath = path.startsWith('/') ? path.substring(1) : path;
            return baseUrl ? `${baseUrl}/${cleanPath}` : cleanPath;
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
