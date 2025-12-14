/**
 * Shared Components for V5 Medical Website
 * Reusable UI components like navigation, footer, etc.
 * @version 1.0.0
 */

class Components {
    constructor() {
        this.config = window.V5Config || {};
        this.currentPage = this.detectCurrentPage();
        this.logger = this.createLogger();
    }

    /**
     * Detect current page for active navigation
     * @returns {string} Page identifier
     */
    detectCurrentPage() {
        const pathname = window.location.pathname.toLowerCase();
        if (pathname.includes('catalog')) return 'catalog';
        if (pathname.includes('about')) return 'about';
        if (pathname.includes('contact')) return 'contact';
        if (pathname.includes('blog')) return 'blog';
        if (pathname.includes('product-detail')) return 'product';
        return 'home';
    }

    /**
     * Create navigation component
     * @returns {string} Navigation HTML
     */
    createNavigation() {
        const isProductPage = this.currentPage === 'product';
        const navItems = [
            { id: 'home', label: 'Home', href: 'index.html' },
            { id: 'catalog', label: 'Products', href: 'catalog.html' },
            { id: 'about', label: 'About', href: 'about.html' },
            { id: 'contact', label: 'Contact', href: 'contact.html' }
        ];

        return `
            <nav class="fixed w-full z-50 bg-white shadow-md transition-all duration-300">
                <div class="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
                    <div class="flex items-center gap-3 cursor-pointer" onclick="location.href='index.html'">
                        <img src="${this.config.GITHUB_RAW_BASE}${this.config.PATHS.IMAGES}/${this.config.IMAGES.LOGO}" 
                             onerror="this.onerror=null;" 
                             class="h-12" 
                             alt="V5 Medical" />
                        <div>
                            <div class="font-bold text-xl text-blue-900">V5 Medical LTD</div>
                            <div class="text-xs text-blue-600">Global Medical Supplier</div>
                        </div>
                    </div>
                    <div class="hidden md:flex gap-8 items-center">
                        ${navItems.map(item => `
                            <a href="${item.href}" 
                               class="font-medium ${this.currentPage === item.id ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-600 hover:text-blue-900'} transition">
                                ${item.label}
                            </a>
                        `).join('')}
                        <a href="https://wa.me/${this.config.CONTACT.WHATSAPP_UK.replace(/\s/g, '')}" 
                           target="_blank" rel="noopener noreferrer"
                           class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-semibold transition flex items-center"
                           onclick="trackWhatsAppClick()">
                            <i class="fab fa-whatsapp mr-2"></i> WhatsApp
                        </a>
                    </div>
                    <button id="mobile-menu-btn" class="md:hidden text-gray-800" aria-label="Toggle Menu">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
                
                <div id="mobile-menu" class="hidden md:hidden bg-white border-t text-gray-800 absolute w-full left-0 top-20 shadow-lg animate-fade-in">
                    <div class="px-4 py-4 space-y-3">
                        ${navItems.map(item => `
                            <a href="${item.href}" 
                               class="block px-4 py-2 rounded-lg ${this.currentPage === item.id ? 'text-blue-900 font-semibold bg-blue-50' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-900'} transition">
                                ${item.label}
                            </a>
                        `).join('')}
                        <a href="https://wa.me/${this.config.CONTACT.WHATSAPP_UK.replace(/\s/g, '')}" 
                           target="_blank" rel="noopener noreferrer"
                           class="block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center font-semibold transition"
                           onclick="trackWhatsAppClick()">
                            <i class="fab fa-whatsapp mr-2"></i> WhatsApp Contact
                        </a>
                    </div>
                </div>
            </nav>
        `;
    }

    /**
     * Create footer component
     * @returns {string} Footer HTML
     */
    createFooter() {
        return `
            <footer class="bg-gray-900 text-white py-12 text-center text-sm text-gray-400">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
                        <a href="index.html" class="hover:text-white transition">Home</a>
                        <a href="catalog.html" class="hover:text-white transition">Products</a>
                        <a href="about.html" class="hover:text-white transition">About</a>
                        <a href="contact.html" class="hover:text-white transition">Contact</a>
                        <a href="privacy.html" class="hover:text-white transition">Privacy Policy</a>
                    </div>
                    <div class="flex justify-center gap-6 mb-6">
                        <a href="https://linkedin.com/company/v5med" target="_blank" rel="noopener noreferrer" class="hover:text-white transition">
                            <i class="fab fa-linkedin-in text-xl"></i>
                        </a>
                        <a href="https://www.youtube.com/@v5med" target="_blank" rel="noopener noreferrer" class="hover:text-white transition">
                            <i class="fab fa-youtube text-xl"></i>
                        </a>
                        <a href="https://www.facebook.com/v5med" target="_blank" rel="noopener noreferrer" class="hover:text-white transition">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                        <a href="https://www.instagram.com/v5med" target="_blank" rel="noopener noreferrer" class="hover:text-white transition">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                    </div>
                    <p>© 2025 V5 Medical LTD. All rights reserved.</p>
                </div>
            </footer>
        `;
    }

    /**
     * Create WhatsApp float button
     * @returns {string} WhatsApp button HTML
     */
    createWhatsAppButton() {
        return `
            <a href="https://wa.me/${this.config.CONTACT.WHATSAPP_UK.replace(/\s/g, '')}" 
               target="_blank" rel="noopener noreferrer" 
               class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all z-50 hover:scale-110"
               onclick="trackWhatsAppClick()">
                <i class="fab fa-whatsapp text-2xl"></i>
            </a>
        `;
    }

    /**
     * Create certifications section
     * @returns {string} Certifications HTML
     */
    createCertifications() {
        return `
            <div class="flex gap-6 items-center">
                <img src="${this.config.GITHUB_RAW_BASE}${this.config.PATHS.IMAGES}/${this.config.IMAGES.QUALITY_CERTS.CE}" 
                     onerror="this.onerror=null;" 
                     class="h-12 opacity-70 hover:opacity-100 transition" 
                     alt="CE" />
                <img src="${this.config.GITHUB_RAW_BASE}${this.config.PATHS.IMAGES}/${this.config.IMAGES.QUALITY_CERTS.ISO}" 
                     onerror="this.onerror=null;" 
                     class="h-12 opacity-70 hover:opacity-100 transition" 
                     alt="ISO 13485" />
                <img src="${this.config.GITHUB_RAW_BASE}${this.config.PATHS.IMAGES}/${this.config.IMAGES.QUALITY_CERTS.FDA}" 
                     onerror="this.onerror=null;" 
                     class="h-12 opacity-70 hover:opacity-100 transition" 
                     alt="FDA" />
            </div>
        `;
    }

    /**
     * Initialize navigation functionality
     */
    initNavigation() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (event) => {
                if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('nav');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-white/95', 'shadow-md');
                    navbar.classList.remove('bg-transparent');
                } else {
                    navbar.classList.add('bg-transparent');
                    navbar.classList.remove('bg-white/95', 'shadow-md');
                }
            }
        });
    }

    /**
     * Create logger instance
     * @returns {Object} Logger object
     */
    createLogger() {
        const logLevel = this.config.PERFORMANCE?.LOG_LEVEL || 'info';
        const levels = ['debug', 'info', 'warn', 'error'];
        const levelIndex = levels.indexOf(logLevel);

        return {
            debug: (...args) => levelIndex <= 0 && console.debug('[Components]', ...args),
            info: (...args) => levelIndex <= 1 && console.info('[Components]', ...args),
            warn: (...args) => levelIndex <= 2 && console.warn('[Components]', ...args),
            error: (...args) => levelIndex <= 3 && console.error('[Components]', ...args)
        };
    }
}

// Initialize and make globally available
const components = new Components();
window.components = components;

// Export for module usage
if (typeof module !== 'undefined') {
    module.exports = components;
}