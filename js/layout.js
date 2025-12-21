/**
 * V5 Medical Layout Engine
 * @version 3.6.1 (Fixed Mobile Translate Overlap)
 */

const V5Layout = (() => {
    // 依赖检查
    const config = window.V5Config;
    if (!config) {
        console.error('[Layout] V5Config not found. Ensure config.js is loaded before layout.js.');
        return { init: () => {} };
    }

    class LayoutManager {
        constructor() {
            this.config = config;
            this.currentPage = this._detectPage();
        }

        init() {
            this.renderHeader();
            this.renderFooter();
            this.renderFloatingElements();
            this.injectCustomStyles(); // 新增：注入修复样式
            window.dispatchEvent(new Event('v5-layout-ready'));
            console.log('[Layout] Initialized v3.6.1');
        }

        // --- 0. 样式注入 (核心修复) ---
        injectCustomStyles() {
            const style = document.createElement('style');
            style.innerHTML = `
                /* 桌面端：翻译按钮在右上角 */
                #google_translate_element {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 40; /* 低于导航栏 z-50 */
                }

                /* 移动端优化：防止与汉堡菜单(z-50)重叠 */
                @media (max-width: 768px) {
                    #google_translate_element {
                        top: 15px;       /* 稍微靠上 */
                        right: 60px;     /* 向左移动，避开右侧的汉堡菜单 */
                        z-index: 45;
                    }
                    
                    /* 调整翻译组件大小，防止太宽 */
                    .goog-te-gadget-simple {
                        max-width: 140px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // --- 1. Header Rendering ---
        renderHeader() {
            const container = document.getElementById('v5-header');
            if (!container) return;

            const logoSrc = this.config.IMAGES.LOGO;
            const logoFallback = this.config.IMAGES.LOGO_LOCAL;

            const navItems = [
                { id: 'home', href: 'index.html', txt: 'Home' },
                { id: 'about', href: 'about.html', txt: 'About Us' },
                { id: 'catalog', href: 'catalog.html', txt: 'Products' },
                { id: 'blog', href: 'blog.html', txt: 'Blog' },
                { id: 'contact', href: 'contact.html', txt: 'Contact' }
            ];

            const navHtml = navItems.map(item => `
                <a href="${item.href}" class="nav-link font-medium transition duration-200 ${this.currentPage === item.id ? 'text-white border-b-2 border-blue-400' : 'text-blue-100 hover:text-white'}">
                    ${item.txt}
                </a>
            `).join('');

            const mobileHtml = navItems.map(item => `
                <a href="${item.href}" class="block px-4 py-3 rounded-lg font-medium transition ${this.currentPage === item.id ? 'text-blue-700 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}">
                    ${item.txt}
                </a>
            `).join('');

            container.innerHTML = `
                <nav id="navbar" class="fixed w-full z-50 shadow-lg transition-all duration-300 bg-white">
                    <div class="absolute inset-0 bg-gradient-to-r from-white via-white via-30% to-blue-900 to-50%"></div>
                    
                    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center h-20">
                            
                            <a href="index.html" class="flex items-center gap-3 group relative z-10 pr-4 bg-white/0">
                                <img src="${logoSrc}" onerror="this.onerror=null; this.src='${logoFallback}';" class="h-10 md:h-12 w-auto transition-transform group-hover:scale-105" alt="${this.config.SEO.SITE_NAME}">
                                <div class="hidden sm:block">
                                    <div class="font-bold text-xl text-blue-900 leading-none">V5 Medical LTD</div>
                                    <div class="text-[10px] text-blue-600 font-medium tracking-wider uppercase mt-0.5">Global Medical Supply Chain</div>
                                </div>
                            </a>

                            <div class="hidden md:flex gap-6 items-center pl-8">
                                ${navHtml}
                                <a href="${this.config.CONTACT.WHATSAPP.API_URL}" target="_blank" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow-md flex items-center gap-2 transition hover:-translate-y-0.5 text-sm">
                                    <i class="fab fa-whatsapp text-lg"></i><span>Quick Chat</span>
                                </a>
                                <div class="w-16"></div>
                            </div>

                            <button id="mobile-menu-btn" class="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition z-50 relative">
                                <i class="fas fa-bars text-2xl"></i>
                            </button>
                        </div>
                    </div>

                    <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-40">
                        <div class="px-4 py-4 space-y-2">
                            ${mobileHtml}
                            <div class="pt-4 mt-2 border-t border-gray-100">
                                <a href="${this.config.CONTACT.WHATSAPP.API_URL}" target="_blank" class="flex items-center justify-center gap-2 w-full bg-green-500 text-white px-4 py-3 rounded-lg font-bold">
                                    <i class="fab fa-whatsapp"></i> WhatsApp Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            `;
        }

        // --- 2. Footer Rendering ---
        renderFooter() {
            const container = document.getElementById('v5-footer');
            if (!container) return;

            const year = new Date().getFullYear();
            const { CONTACT, IMAGES } = this.config;
            const logoSrc = IMAGES.LOGO;
            const logoFallback = IMAGES.LOGO_LOCAL;

            container.innerHTML = `
                <footer class="bg-gray-900 text-white py-12 px-4 border-t border-gray-800">
                    <div class="max-w-7xl mx-auto">
                        <div class="grid md:grid-cols-12 gap-8 mb-12">
                            <div class="md:col-span-3">
                                <div class="flex items-center gap-2 mb-4">
                                    <img src="${logoSrc}" onerror="this.onerror=null; this.src='${logoFallback}';" class="h-10 w-auto" alt="V5 Medical Logo">
                                    <span class="text-xl font-bold">V5 Medical LTD</span>
                                </div>
                                <p class="text-gray-400 text-sm mb-4">Professional Global Medical Consumables Supplier</p>
                                <p class="text-gray-400 text-sm italic">More Sophisticated, More Professional, More Secure</p>
                            </div>
                            <div class="hidden md:block md:col-span-1"></div>
                            <div class="md:col-span-2">
                                <h4 class="font-bold mb-4 text-lg text-white">Quick Links</h4>
                                <ul class="space-y-2 text-sm text-gray-400">
                                    <li><a href="index.html" class="hover:text-white transition">Home</a></li>
                                    <li><a href="about.html" class="hover:text-white transition">About Us</a></li>
                                    <li><a href="catalog.html" class="hover:text-white transition">Products</a></li>
                                    <li><a href="blog.html" class="hover:text-white transition">Blog</a></li>
                                    <li><a href="contact.html" class="hover:text-white transition">Contact</a></li>
                                </ul>
                            </div>
                            <div class="md:col-span-3 pl-0 md:pl-4">
                                <h4 class="font-bold mb-4 text-lg text-white">Contact Info</h4>
                                <div class="space-y-3 text-sm text-gray-400">
                                    <p class="flex items-center gap-2"><i class="fab fa-whatsapp text-green-500 w-5"></i> ${CONTACT.WHATSAPP.DISPLAY} (UK)</p>
                                    <p class="flex items-center gap-2"><i class="fab fa-whatsapp text-green-500 w-5"></i> ${CONTACT.WHATSAPP_CN.DISPLAY} (Backup)</p>
                                    <p class="flex items-center gap-2"><i class="fas fa-envelope text-blue-400 w-5"></i> ${CONTACT.EMAIL.SALES}</p>
                                    <p class="flex items-center gap-2"><i class="fab fa-google text-red-400 w-5"></i> v5md.com@gmail.com</p>
                                    <p class="flex items-start gap-2"><i class="fas fa-map-marker-alt mt-1 w-5"></i> ${CONTACT.ADDRESS}</p>
                                </div>
                            </div>
                            <div class="md:col-span-3 pl-0 md:pl-4">
                                <h4 class="font-bold mb-4 text-lg text-white">Downloads</h4>
                                <div class="space-y-2 mb-8 text-sm">
                                    <a href="pdf/Catalog.pdf" target="_blank" class="flex items-center gap-2 text-gray-400 hover:text-white transition"><i class="fas fa-file-pdf text-red-400"></i> Product Catalog</a>
                                    <a href="pdf/Quotations for dental products.pdf" target="_blank" class="flex items-center gap-2 text-gray-400 hover:text-white transition"><i class="fas fa-file-pdf text-red-400"></i> Dental Kit</a>
                                    <a href="pdf/price list.pdf" target="_blank" class="flex items-center gap-2 text-gray-400 hover:text-white transition"><i class="fas fa-file-pdf text-red-400"></i> Price List</a>
                                </div>
                                <h4 class="font-bold mb-4 text-lg text-white">Follow Us</h4>
                                <div class="flex gap-3 flex-wrap">
                                    <a href="https://linkedin.com/company/v5med" target="_blank" class="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-800 text-white"><i class="fab fa-linkedin-in"></i></a>
                                    <a href="https://www.youtube.com/@v5med" target="_blank" class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 text-white"><i class="fab fa-youtube"></i></a>
                                    <a href="https://www.facebook.com/v5med" target="_blank" class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 text-white"><i class="fab fa-facebook-f"></i></a>
                                    <a href="https://www.instagram.com/v5med" target="_blank" class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 flex items-center justify-center transition text-white"><i class="fab fa-instagram"></i></a>
                                    <a href="https://www.tiktok.com/@v5med" target="_blank" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black transition text-white"><i class="fab fa-tiktok"></i></a>
                                    <a href="https://x.com/v5med" target="_blank" class="w-8 h-8 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition text-white"><i class="fab fa-twitter"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-8 text-sm text-gray-500 border-t border-gray-800 pt-8">
                            <p>&copy; ${year} V5 Medical LTD. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            `;
        }

        // --- 3. Floating Elements ---
        renderFloatingElements() {
            if (!document.getElementById('whatsapp-float')) {
                const waDiv = document.createElement('div');
                waDiv.innerHTML = `
                    <a href="${this.config.CONTACT.WHATSAPP.API_URL}" target="_blank" class="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group">
                        <i class="fab fa-whatsapp text-2xl group-hover:scale-110 transition-transform"></i>
                    </a>`;
                document.body.appendChild(waDiv.firstElementChild);
            }
            if (!document.getElementById('back-to-top')) {
                const topBtn = document.createElement('button');
                topBtn.id = 'back-to-top';
                topBtn.className = 'fixed bottom-24 right-6 bg-blue-900 hover:bg-blue-900 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 opacity-0 invisible translate-y-10';
                topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
                topBtn.setAttribute('aria-label', 'Back to top');
                document.body.appendChild(topBtn);
            }
        }

        // Helpers
        _detectPage() {
            const path = window.location.pathname;
            if (path.includes('catalog')) return 'catalog';
            if (path.includes('about')) return 'about';
            if (path.includes('contact')) return 'contact';
            if (path.includes('blog')) return 'blog';
            return 'home';
        }
        
        _getActiveClass(id) { return this.currentPage === id ? 'text-white border-b-2 border-blue-400' : 'text-blue-100 hover:text-white'; }
        _getMobileActiveClass(id) { return this.currentPage === id ? 'text-blue-700 bg-blue-50 font-bold' : 'text-gray-600 hover:bg-gray-50'; }
        
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

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => V5Layout.init());
else V5Layout.init();
