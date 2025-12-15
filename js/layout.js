/**
 * V5 Medical Shared Layout
 * 统一管理网站的头部、页脚和悬浮按钮
 * 使用方法：在页面中引入此脚本，并添加 id="v5-header" 和 id="v5-footer" 的容器
 */

const V5Layout = {
    // 头部 HTML (源自 index.html)
    headerHTML: `
    <nav id="navbar" class="fixed w-full z-50 transition-all duration-300 bg-white/95 text-gray-800 shadow-md">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center h-20">
                <div class="flex items-center gap-3 cursor-pointer" onclick="window.location.href='index.html';">
                    <img src="images/v5logo.png" onerror="this.src='https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5logo.png'; this.onerror=null;" 
                         class="h-12 w-auto" 
                         alt="V5 Medical LTD Logo">
                    <div>
                        <div class="font-bold text-xl leading-none text-blue-900">V5 Medical LTD</div>
                        <div class="text-xs text-blue-600">Global Medical Supplier</div>
                    </div>
                </div>

                <div class="hidden md:flex items-center gap-8" id="desktop-menu">
                    <a href="index.html" class="nav-link font-semibold text-gray-600 hover:text-blue-900 transition" data-page="home">Home</a>
                    <a href="about.html" class="nav-link font-semibold text-gray-600 hover:text-blue-900 transition" data-page="about">About Us</a>
                    <a href="catalog.html" class="nav-link font-semibold text-gray-600 hover:text-blue-900 transition" data-page="catalog">Products</a>
                    <a href="blog.html" class="nav-link font-semibold text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700" data-page="blog">Blog</a>
                    <a href="contact.html" class="nav-link font-semibold text-gray-600 hover:text-blue-900 transition" data-page="contact">Contact</a>
                    <a href="https://wa.me/447895047944" target="_blank" rel="noopener noreferrer" 
                       class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-semibold transition flex items-center gap-2">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>

                <button id="mobile-menu-btn" class="md:hidden text-gray-800 focus:outline-none" aria-label="Toggle Menu">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>

        <div id="mobile-menu" class="hidden md:hidden bg-white border-t text-gray-800 absolute w-full left-0 top-20 shadow-xl">
            <div class="px-4 py-4 space-y-3">
                <a href="index.html" class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-900 font-semibold" data-page="home">Home</a>
                <a href="about.html" class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-900 font-semibold" data-page="about">About Us</a>
                <a href="catalog.html" class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-900 font-semibold" data-page="catalog">Products</a>
                <a href="blog.html" class="block px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold" data-page="blog">Blog</a>
                <a href="contact.html" class="block px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-900 font-semibold" data-page="contact">Contact</a>
                <a href="https://wa.me/447895047944" target="_blank" rel="noopener noreferrer" 
                   class="block w-full bg-green-500 text-white px-4 py-2 rounded-lg text-center font-semibold mt-4">
                    <i class="fab fa-whatsapp mr-2"></i> WhatsApp Contact
                </a>
            </div>
        </div>
    </nav>`,

    // 页脚 HTML (源自 index.html)
    footerHTML: `
    <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-10 gap-8 mb-12">
            <div class="md:col-span-3">
                <div class="flex items-center gap-2 mb-4">
                    <img src="images/v5logo.png" onerror="this.src='https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5logo.png'; this.onerror=null;" 
                         class="h-10 w-auto" alt="V5 Medical Logo">
                    <span class="text-xl font-bold">V5 Medical LTD</span>
                </div>
                <p class="text-gray-400 text-sm mb-4">Professional Global Medical Consumables Supplier</p>
                <p class="text-gray-400 text-sm mb-4">Factory Direct Medical Consumables Manufacturer</p> 
                <p class="text-gray-400 text-sm italic">20+ Years Exporting Experience</p>
                <p class="text-gray-400 text-sm italic">More Sophisticated, More Professional, More Secure</p>
            </div>
            
            <div class="md:col-span-2 pl-0 md:pl-8">
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
            
            <div class="md:col-span-2">
                <h4 class="font-bold mb-4 text-lg text-white">Product Categories</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li><a href="catalog.html#surgical-sutures" class="hover:text-white transition">Surgical Sutures</a></li>
                    <li><a href="catalog.html#surgical-packs" class="hover:text-white transition">Surgical Packs</a></li>
                    <li><a href="catalog.html#injection" class="hover:text-white transition">Syringes & Needles</a></li>
                    <li><a href="catalog.html#infusion" class="hover:text-white transition">Infusion Sets</a></li>
                    <li><a href="catalog.html#gauze" class="hover:text-white transition">Gauze Dressings</a></li>
                    <li><a href="catalog.html#protective" class="hover:text-white transition">Protective Equipment</a></li>
                </ul>
            </div>
            
            <div class="md:col-span-3">
                <h4 class="font-bold mb-4 text-lg text-white">Contact Info</h4>
                <div class="space-y-3 text-sm text-gray-400">
                    <p class="flex items-center gap-2">
                        <i class="fab fa-whatsapp text-green-500 w-5"></i> 
                        <span>+44 078 9504 7944 (UK)</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <i class="fab fa-whatsapp text-green-500 w-5"></i> 
                        <span>+86 180 1266 9897 (Backup)</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <i class="fas fa-envelope text-blue-400 w-5"></i> 
                        <a href="mailto:sales@v5md.com" class="hover:text-white transition">sales@v5md.com</a>
                    </p>
                    <p class="flex items-center gap-2">
                        <i class="fab fa-google text-red-400 w-5"></i> 
                        <a href="mailto:v5md.com@gmail.com" class="hover:text-white transition">v5md.com@gmail.com</a>
                    </p>
                    <p class="flex items-start gap-2">
                        <i class="fas fa-map-marker-alt mt-1 w-5"></i> 
                        <span>No. 168, Luying Road, Kunshan, Jiangsu, China</span>
                    </p>
                </div>
            </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-6 md:mb-0 text-center md:text-left">
                    <h4 class="font-bold text-lg text-white mb-2">Follow Us</h4>
                    <p class="text-gray-400 text-sm">Connect with us on social media</p>
                </div>
                
                <div class="flex gap-4">
                    <a href="https://linkedin.com/company/v5med" target="_blank" class="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center hover:bg-blue-800 transition text-white"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://www.youtube.com/@v5med" target="_blank" class="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition text-white"><i class="fab fa-youtube"></i></a>
                    <a href="https://www.facebook.com/v5med" target="_blank" class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition text-white"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/v5med" target="_blank" class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 flex items-center justify-center transition text-white"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.tiktok.com/@v5med" target="_blank" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black transition text-white"><i class="fab fa-tiktok"></i></a>
                    <a href="https://x.com/v5med" target="_blank" class="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition text-white"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </div>
        <div class="text-center mt-8 text-sm text-gray-500">
            <p>© 2025 V5 Medical LTD. All rights reserved.</p>
        </div>
    </div>`,

    // 悬浮按钮 HTML
    floatingButtonsHTML: `
    <a href="https://wa.me/447895047944" target="_blank" class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 group">
        <i class="fab fa-whatsapp text-2xl group-hover:scale-110 transition-transform"></i>
    </a>
    <button id="back-to-top" class="fixed bottom-24 right-6 bg-blue-900 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 invisible hover:bg-blue-700 z-40">
        <i class="fas fa-arrow-up"></i>
    </button>
    `,

    // 初始化方法
    init: function() {
        // 1. 渲染头部
        const headerEl = document.getElementById('v5-header');
        if (headerEl) headerEl.innerHTML = this.headerHTML;

        // 2. 渲染页脚
        const footerEl = document.getElementById('v5-footer');
        if (footerEl) {
            footerEl.className = "bg-gray-900 text-white py-12 px-4 border-t border-gray-800";
            footerEl.innerHTML = this.footerHTML;
        }

        // 3. 渲染悬浮按钮
        const floatContainer = document.createElement('div');
        floatContainer.innerHTML = this.floatingButtonsHTML;
        document.body.appendChild(floatContainer);

        // 4. 设置当前页面高亮
        this.highlightActivePage();

        // 5. 初始化移动端菜单逻辑
        this.initMobileMenu();

        // 6. 初始化回到顶部逻辑
        this.initBackToTop();
    },

    // 自动高亮当前页导航
    highlightActivePage: function() {
        const path = window.location.pathname;
        const pageName = path.split('/').pop() || 'index.html';
        
        let activeKey = 'home';
        if (pageName.includes('about')) activeKey = 'about';
        else if (pageName.includes('catalog') || pageName.includes('product')) activeKey = 'catalog';
        else if (pageName.includes('blog')) activeKey = 'blog';
        else if (pageName.includes('contact')) activeKey = 'contact';

        // 桌面端高亮
        const links = document.querySelectorAll(`#desktop-menu a[data-page="${activeKey}"]`);
        links.forEach(link => {
            link.classList.remove('text-gray-600');
            link.classList.add('text-blue-900', 'border-b-2', 'border-blue-900');
        });

        // 移动端高亮
        const mobileLinks = document.querySelectorAll(`#mobile-menu a[data-page="${activeKey}"]`);
        mobileLinks.forEach(link => {
            link.classList.remove('text-gray-600');
            link.classList.add('text-blue-900', 'bg-blue-50');
        });
    },

    // 移动端菜单功能
    initMobileMenu: function() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
                const icon = btn.querySelector('i');
                if (menu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            });
        }
    },

    // 回到顶部功能
    initBackToTop: function() {
        const btn = document.getElementById('back-to-top');
        if (btn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    btn.classList.remove('opacity-0', 'invisible');
                } else {
                    btn.classList.add('opacity-0', 'invisible');
                }
            });
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
};

// 页面加载时立即执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => V5Layout.init());
} else {
    V5Layout.init();
}