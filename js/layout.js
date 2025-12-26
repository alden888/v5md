/**
 * V5 Medical Layout Engine
 * (Unified Layout Manager)
 * Dynamically renders Header, Footer, and Floating elements.
 * @version 4.7.3 (Milestone: Capability Statement Integration & Docsify Support)
 * @updated 2024-12-25
 */

const V5Layout = (() => {
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
            this.injectStyles();
            this.renderHeader();
            this.renderFooter();
            this.renderFloatingElements();
            window.dispatchEvent(new Event('v5-layout-ready'));
            console.log('[Layout] Initialized v4.7.3 (Capability Statement Ready)');
        }

        injectStyles() {
            const style = document.createElement('style');
            style.innerHTML = `
                #google_translate_element { position: fixed !important; z-index: 60 !important; }
                @media (min-width: 769px) { #google_translate_element { top: 22px !important; right: 20px !important; } }
                @media (max-width: 768px) { 
                    #google_translate_element { top: 20px !important; right: 60px !important; }
                    .goog-te-gadget-simple { max-width: 120px !important; padding: 4px !important; font-size: 11px !important; }
                }
                @keyframes menuSlide { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .mobile-menu-enter { animation: menuSlide 0.2s ease-out forwards; }
                
                /* Footer Hover Effects */
                .footer-dept-link:hover { color: #60a5fa; padding-left: 5px; transition: all 0.2s ease; }
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
                { id: 'blog', href: '/blog/', txt: 'Blog' }, // Points to Docsify directory
                { id: 'contact', href: 'contact.html', txt: 'Contact' }
            ];

            const desktopNav = `
                <ul class="flex gap-6 items-center">
                    ${navItems.map(item => `
                        <li>
                            <a href="${item.href}" class="font-medium transition duration-200 text-sm lg:text-base ${this.currentPage === item.id ? 'text-white border-b-2 border-blue-300 pb-1' : 'text-blue-100 hover:text-white'}">
                                ${item.txt}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `;

            const mobileNav = navItems.map(item => `
                <a href="${item.href}" class="block px-6 py-4 border-b border-gray-100 text-base font-medium transition active:bg-blue-50 ${this.currentPage === item.id ? 'text-blue-700 bg-blue-50/50' : 'text-gray-700'}">
                    <div class="flex justify-between items-center">
                        <span>${item.txt}</span>
                        ${this.currentPage === item.id ? '<i class="fas fa-chevron-right text-xs text-blue-400"></i>' : ''}
                    </div>
                </a>
            `).join('');

            container.innerHTML = `
                <nav id="navbar" class="fixed w-full z-50 shadow-lg transition-all duration-300 h-20" aria-label="Main Navigation">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-600 to-blue-900"></div>
                    
                    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                        <div class="flex justify-between items-center h-full">
                            
                            <a href="index.html" class="flex items-center gap-2 sm:gap-3 group relative z-10 pr-2">
                                <img src="${logoSrc}" onerror="this.onerror=null; this.src='${logoFallback}';" class="h-8 sm:h-10 md:h-12 w-auto" alt="V5 Medical Logo">
                                <div class="flex flex-col">
                                    <div class="font-bold text-lg sm:text-xl text-blue-900 leading-none tracking-tight">V5 Medical LTD</div>
                                    <div class="text-[9px] sm:text-[10px] text-blue-700 font-bold tracking-wider uppercase mt-0.5 whitespace-nowrap">Global Medical Supply Chain</div>
                                </div>
                            </a>

                            <div class="hidden md:flex gap-6 items-center pl-8">
                                ${desktopNav}
                                <a href="${this.config.CONTACT.WHATSAPP.API_URL}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-400 text-white px-5 py-2 rounded-full font-bold shadow-md flex items-center gap-2 transition transform hover:-translate-y-0.5 text-sm border border-green-400/30">
                                    <i class="fab fa-whatsapp text-lg"></i><span>Contact</span>
                                </a>
                                <div class="w-20"></div> 
                            </div>

                            <button id="mobile-menu-btn" class="md:hidden text-white p-3 -mr-2 hover:bg-white/10 rounded-full transition z-50 relative focus:outline-none touch-manipulation" aria-label="Toggle menu">
                                <i class="fas fa-bars text-2xl"></i>
                            </button>
                        </div>
                    </div>

                    <div id="mobile-menu" class="hidden md:hidden bg-white absolute w-full shadow-2xl top-20 left-0 z-40 rounded-b-2xl overflow-hidden border-t border-blue-100">
                        <div class="py-2">
                            ${mobileNav}
                            <div class="p-5 bg-gray-50 mt-1">
                                <a href="${this.config.CONTACT.WHATSAPP.API_URL}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full bg-green-600 text-white px-4 py-4 rounded-xl font-bold shadow-sm active:scale-95 transition-transform">
                                    <i class="fab fa-whatsapp text-xl"></i> Contact via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            `;
            
            this.bindMobileMenu();
        }

        bindMobileMenu() {
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            if (!btn || !menu) return;

            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            const icon = newBtn.querySelector('i');

            newBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = menu.classList.contains('hidden');
                if (isHidden) {
                    menu.classList.remove('hidden');
                    menu.classList.add('mobile-menu-enter');
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    menu.classList.add('hidden');
                    menu.classList.remove('mobile-menu-enter');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            document.addEventListener('click', (e) => {
                if (!menu.classList.contains('hidden') && !newBtn.contains(e.target) && !menu.contains(e.target)) {
                    menu.classList.add('hidden');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
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
                <footer class="bg-gray-900 text-white pt-16 pb-8 px-4 border-t border-gray-800 font-sans">
                    <div class="max-w-7xl mx-auto">
                        
                        <div class="border-b border-gray-800 pb-8 mb-10">
                            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h5 class="text-blue-400 font-bold uppercase tracking-wider text-xs mb-1">Quick Department Access</h5>
                                    <p class="text-gray-400 text-sm">Direct your inquiry to the right team for faster response.</p>
                                </div>
                                <div class="flex flex-wrap gap-3">
                                    <a href="mailto:sales@v5md.com" class="bg-gray-800 hover:bg-blue-600 border border-gray-700 hover:border-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 group">
                                        <i class="fas fa-briefcase text-blue-400 group-hover:text-white"></i> Sales
                                    </a>
                                    <a href="mailto:qa@v5md.com" class="bg-gray-800 hover:bg-purple-600 border border-gray-700 hover:border-purple-500 text-white px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 group">
                                        <i class="fas fa-shield-alt text-purple-400 group-hover:text-white"></i> Quality (QA)
                                    </a>
                                    <a href="mailto:logistics@v5md.com" class="bg-gray-800 hover:bg-orange-600 border border-gray-700 hover:border-orange-500 text-white px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 group">
                                        <i class="fas fa-shipping-fast text-orange-400 group-hover:text-white"></i> Logistics
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-12 gap-8 mb-12">
                            
                            <div class="md:col-span-4">
                                <div class="flex items-center gap-2 mb-5">
                                    <img src="${logoSrc}" onerror="this.onerror=null; this.src='${logoFallback}';" class="h-10 w-auto" alt="V5 Medical Logo">
                                    <span class="text-xl font-bold tracking-tight">V5 Medical LTD</span>
                                </div>
                                <p class="text-gray-400 text-sm mb-4 font-medium">Operating Under ISO 13485 Quality Framework</p>
                                <p class="text-gray-500 text-sm mb-4 leading-relaxed">
                                    We integrate audited manufacturing, centralized QC, and global logistics to reduce procurement risk for hospitals and distributors worldwide.
                                </p>
                                <p class="text-blue-400 text-sm font-bold flex items-center gap-2">
                                    <i class="fas fa-certificate"></i> Compliance First: CE / FDA / ISO
                                </p>
                            </div>
                            
                            <div class="md:col-span-2">
                                <h4 class="font-bold mb-5 text-white">Explore</h4>
                                <ul class="space-y-3 text-sm text-gray-400">
                                    <li><a href="catalog.html" class="hover:text-white transition block">Product Catalog</a></li>
                                    <li><a href="about.html" class="hover:text-white transition block">Our Structure</a></li>
                                    <li><a href="contact.html" class="hover:text-white transition block">Contact Teams</a></li>
                                    <li><a href="/blog/" class="hover:text-white transition block">Industry Insights</a></li>
                                </ul>
                            </div>
                            
                            <div class="md:col-span-3">
                                <h4 class="font-bold mb-5 text-white">Contact Info</h4>
                                <div class="space-y-4 text-sm text-gray-400">
                                    <p class="flex items-center gap-3">
                                        <span class="w-8 h-8 rounded bg-gray-800 flex items-center justify-center flex-shrink-0"><i class="fab fa-whatsapp text-green-500"></i></span>
                                        <span>${CONTACT.WHATSAPP.DISPLAY} (Global)</span>
                                    </p>
                                    <p class="flex items-center gap-3">
                                        <span class="w-8 h-8 rounded bg-gray-800 flex items-center justify-center flex-shrink-0"><i class="fas fa-envelope text-blue-400"></i></span>
                                        <a href="mailto:${CONTACT.EMAIL.SALES}" class="hover:text-white transition">${CONTACT.EMAIL.SALES}</a>
                                    </p>
                                    <p class="flex items-start gap-3">
                                        <span class="w-8 h-8 rounded bg-gray-800 flex items-center justify-center flex-shrink-0 mt-1"><i class="fas fa-map-marker-alt text-red-400"></i></span>
                                        <span class="leading-snug">${CONTACT.ADDRESS}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="md:col-span-3">
                                <h4 class="font-bold mb-5 text-white">Downloads & Social</h4>
                                <div class="space-y-3 mb-8 text-sm">
                                    <a href="pdf/Catalog.pdf" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-400 hover:text-white transition group">
                                        <i class="fas fa-file-pdf text-red-500 group-hover:scale-110 transition-transform"></i> 
                                        <span>Product Catalog (PDF)</span>
                                    </a>
                                    <a href="pdf/V5_Medical_Capability_Statement.pdf" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-400 hover:text-white transition group">
                                        <i class="fas fa-file-shield text-blue-500 group-hover:scale-110 transition-transform"></i> 
                                        <span>Capability Statement (PDF)</span>
                                    </a>
                                    <a href="mailto:qa@v5md.com?subject=Request ISO Certificate" class="flex items-center gap-2 text-gray-400 hover:text-purple-300 transition group">
                                        <i class="fas fa-lock text-purple-500 group-hover:scale-110 transition-transform"></i> 
                                        <span>Request ISO/CE Certs</span>
                                    </a>
                                </div>
                                <div class="flex gap-3 flex-wrap">
                                    <a href="https://linkedin.com/company/v5med" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-9 h-9 rounded bg-gray-800 flex items-center justify-center hover:bg-blue-700 text-white transition"><i class="fab fa-linkedin-in"></i></a>
                                    <a href="https://www.facebook.com/v5med" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-9 h-9 rounded bg-gray-800 flex items-center justify-center hover:bg-blue-600 text-white transition"><i class="fab fa-facebook-f"></i></a>
                                    <a href="https://www.instagram.com/v5med" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-9 h-9 rounded bg-gray-800 flex items-center justify-center hover:bg-pink-600 text-white transition"><i class="fab fa-instagram"></i></a>
                                    <a href="https://x.com/v5med" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" class="w-9 h-9 rounded bg-gray-800 flex items-center justify-center hover:bg-black text-white transition"><i class="fab fa-twitter"></i></a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                            <div class="mb-4 md:mb-0 space-y-1">
                                <p>&copy; ${year} V5 Medical LTD. All rights reserved.</p>
                                <p class="italic opacity-70">* Product certifications (CE, FDA, ISO) are held by qualified manufacturing partners unless otherwise stated.</p>
                            </div>
                            <div class="flex gap-4">
                                <a href="privacy.html" class="hover:text-gray-300">Privacy Policy</a>
                                <a href="contact.html" class="hover:text-gray-300">Sitemap</a>
                            </div>
                        </div>
                    </div>
                </footer>
            `;
        }

        // --- 3. Floating Elements ---
        renderFloatingElements() {
            if (!document.getElementById('whatsapp-float')) {
                const div = document.createElement('div');
                div.innerHTML = `<a href="${this.config.CONTACT.WHATSAPP.API_URL}" target="_blank" rel="noopener noreferrer" data-source="float" class="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group" aria-label="Chat on WhatsApp"><i class="fab fa-whatsapp text-2xl group-hover:scale-110 transition-transform"></i></a>`;
                document.body.appendChild(div.firstElementChild);
            }
            if (!document.getElementById('back-to-top')) {
                const topBtn = document.createElement('button');
                topBtn.id = 'back-to-top';
                topBtn.className = 'fixed bottom-24 right-6 bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 opacity-0 invisible translate-y-10 border border-blue-700';
                topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
                topBtn.setAttribute('aria-label', 'Back to top');
                document.body.appendChild(topBtn);
            }
        }

        _detectPage() {
            const path = window.location.pathname;
            if (path.includes('catalog')) return 'catalog';
            if (path.includes('about')) return 'about';
            if (path.includes('contact')) return 'contact';
            if (path.includes('blog')) return 'blog';
            return 'home';
        }
    }
    return new LayoutManager();
})();

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => V5Layout.init());
else V5Layout.init();
