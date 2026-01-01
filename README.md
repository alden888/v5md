# V5 Medical LTD - Official Website

![V5 Medical Logo](https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5medlogo.png)

> **Professional Global Medical Consumables Supplier**  
> Factory Direct | ISO 13485 | CE | FDA Certified

[![Website](https://img.shields.io/badge/Website-v5md.com-blue)](https://v5md.com)
[![Version](https://img.shields.io/badge/Version-2.7.0-green)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white)

---

## 🎯 Project Overview

This repository contains the **official website** for **V5 Medical LTD** ([v5md.com](https://v5md.com)), a China-based medical supply chain integrator specializing in surgical consumables, sterile packs, and medical devices for global distributors.

The site is built as a **high-performance static web application**, optimized for:
- ⚡ **Speed**: Cloudflare CDN with <1s LCP
- 🔍 **SEO**: Dynamic meta tags, JSON-LD structured data (via `seo-utils.js`)
- 🎨 **UX**: Mobile-first responsive design
- 🛡️ **Security**: CSP headers, XSS protection

---

## 🚀 Key Features

### 1. 🏗️ Dynamic Layout Engine
- **Unified Header & Footer**: `js/layout.js` renders navigation across all pages
- **Single Source of Truth**: Update menu/contact once, applies globally

### 2. ⚙️ Centralized Configuration
- **Config First**: All globals (contact, API URLs, CDN paths) in `js/config.js`
- **Environment Aware**: Auto-detects localhost vs production

### 3. 🖼️ Smart Image Loading
- **Triple Fallback System** via `js/image-utils.js`:
  1. Cloudflare R2 CDN (Primary)
  2. Local path (Development, aligned with `images/products/` structured catalog)
  3. GitHub Raw (Emergency)
  4. Default Placeholder (Final)
- Standardized product image directory structure for surgical sutures, protective equipment, dental products, etc.

### 4. 🛍️ Dynamic Product Database
- **No Backend Required**: Product catalog in `js/complete-products.js`
- **Features**: Category filtering, real-time search (debounced in `catalog.html`), dynamic detail pages
- **Dual Database Support**: `product-loader.js` supports legacy (`productDatabase`) and new (`completeProductDatabase`) schemas

### 5. 🔍 SEO Optimized
- **Dynamic Meta Tags**: `js/seo-utils.js` updates `<title>`, `<meta>`, JSON-LD per page
- **Performance**: LCP images use `fetchpriority="high"`, lazy loading for below-fold content
- **Analytics**: Built-in tracking for page views, WhatsApp clicks, product interactions (GDPR compliant)

### 6. 📝 Docsify-Powered Knowledge Hub
- **Blog & Technical Content**: `/blog/` runs Docsify for Markdown-based content
  - Medical packaging specs (Tyvek vs. Medical Paper)
  - CE Marking (MDR) compliance guides
  - Surgical pack sterilization standards (EN ISO 13408)
  - Payment strategy ("Two-Lane" system for fast delivery)
- **Categories**: Sourcing Strategy, Technical Specs, Compliance (MDR), Sterilization Standards

### 7. 💳 Payment Gateway Integration
- **Stripe**: Credit card payments for samples (<$500)
- **Bank Wire (T/T)**: For bulk orders (>$500)
- **Dual-lane system**: Fast lane (Credit Card) for trials, Commercial lane (T/T) for production

### 8. 🔒 Internal Workbench (Private)
- **URL**: `/workbench/`
- **Authentication**: Password-protected (SHA-256 hashed in `workbench-auth.js`) with brute-force protection
- **Modules**: 
  - Order management (`workbench-orders.js`)
  - Pricing calculator, Finance Tools
  - Config utilities (`workbench-config.js`)
- **Storage**: Cloudflare Workers KV + localStorage fallback

### 9. 📊 Performance Monitoring
- **Core Web Vitals Tracking**: `performance-monitor.js` records TTFB, DOM Ready, Full Load metrics
- **Optimized Loading**: Non-critical JS deferred, explicit image dimensions (0 CLS)

---

## 📂 Project Structure

```
v5md/
├── index.html              # Homepage (Hero, Features, CTA)
├── about.html              # Company Profile, Team, Certifications
├── catalog.html            # Product Catalog (Search & Filter with WhatsApp CTA)
├── product-detail.html     # Dynamic Product Template
├── contact.html            # Multi-type Contact Form (Quote/QA/OEM)
├── payment.html            # Secure Payment Portal (Stripe + Bank Wire)
├── blog/                   # Docsify Knowledge Hub
│   ├── index.html          # Blog Entry Point
│   ├── README.md           # Blog Homepage (Technical Specs & Guides)
│   ├── _sidebar.md         # Navigation Sidebar
│   └── posts/              # Markdown Articles
│       ├── tyvek-vs-paper.md
│       ├── payment-strategy-guide.md
│       ├── ce-marking-process.md
│       ├── surgical-pack-sterilization.md
│       └── ...
├── workbench/              # Internal Tool (Password-Protected)
│   ├── index.html          # Workbench Entry
│   └── js/                 # Workbench Modules
│       ├── workbench-auth.js       # Login with brute-force protection
│       ├── workbench-dashboard.js
│       ├── workbench-orders.js      # Order clearing & management
│       ├── workbench-pricing.js
│       ├── workbench-finance.js
│       └── workbench-config.js      # Config helper methods
├── js/                     # Core Logic
│   ├── config.js           # 🔧 [CRITICAL] Global Settings & Paths
│   ├── layout.js           # 🔧 [CRITICAL] Header/Footer Renderer
│   ├── main.js             # General UI Interactions (Mobile Menu, Scroll)
│   ├── complete-products.js# Product Database (51 SKUs)
│   ├── image-utils.js      # Smart Image Loader (Triple Fallback)
│   ├── seo-utils.js        # Dynamic SEO Manager (JSON-LD, Meta Tags)
│   ├── product-loader.js   # Async Product Data Loader (dual DB support)
│   ├── security-utils.js   # XSS Protection, Input Validation
│   ├── seo-utils.js        # Page title/meta update & Schema injection
│   ├── performance-monitor.js # Core Web Vitals tracking
│   └── ...
├── css/
│   └── style.css           # Custom Overrides for Tailwind
├── images/                 # Local Asset Fallbacks
│   ├── products/           # Standardized Product Images (51 files)
│   │   ├── surgical-sutures/
│   │   ├── surgical-instruments/
│   │   ├── gauze-dressings/
│   │   ├── protective-equipment/
│   │   ├── injection-infusion/
│   │   ├── dental-products/
│   │   └── surgical-packs/
│   ├── logo/
│   │   └── v5logo.png
│   ├── hero-bg.jpg
│   └── ...
├── pdf/                    # Downloadable Catalogs
│   ├── Catalog.pdf
│   ├── price list.pdf
│   └── V5_Medical_Capability_Statement.pdf
├── _headers                # Cloudflare Pages Headers (CSP, HSTS, CORS)
├── _redirects              # Cloudflare Pages Redirects (SEO, UTM)
├── robots.txt              # SEO Crawler Instructions
├── sitemap.xml             # Main Site Sitemap
└── README.md               # This File
```

---

## 🛠️ How to Maintain

### 1️⃣ Updating Contact Info
Edit `js/config.js` → Change `CONTACT` object → Auto-updates Header, Footer, Contact Page.

### 2️⃣ Adding/Editing Products
Edit `js/complete-products.js` → Add/modify object in `completeProductData` array → Catalog updates automatically:
```javascript
{
    id: 'new-product',
    name: 'New Surgical Suture',
    category: 'surgical-sutures', // Aligned with image directory structure
    images: ['images/products/surgical-sutures/new-product.jpg'],
    price: 'Contact for Price',
    certifications: ['ISO 13485', 'CE']
}
```

### 3️⃣ Modifying Layout (Header/Footer)
Edit `js/layout.js` → Update `renderHeader()` or `renderFooter()` → Changes apply site-wide.

### 4️⃣ Editing Page Content
Open specific HTML file → Edit content inside `<main>` tag → **Do not manually add `<nav>` or `<footer>`** (auto-injected).

### 5️⃣ Adding Blog Posts
1. Create Markdown file in `blog/posts/`
2. Add YAML frontmatter:
   ```markdown
   ---
   title: "Your Title"
   date: "2025-01-02"
   author: "V5 Team"
   category: "Compliance"
   ---
   ```
3. Update `blog/_sidebar.md` with link (e.g., technical specs for sterile barrier systems)

### 6️⃣ Managing Internal Workbench
- **Clear Orders**: Use `clearAllOrders()` in `workbench-orders.js` (with confirmation prompt)
- **Auth Management**: `workbench-auth.js` handles login attempts, lockout logic (15min lockout after max attempts)
- **Config Access**: Use `get()` method in `workbench-config.js` for safe nested config access

---

## 💻 Local Development

### Prerequisites
- Any static web server (e.g., Live Server, Python `http.server`, Node.js `http-server`)

### Clone & Run
```bash
git clone https://github.com/alden888/v5md.git
cd v5md

# Option 1: VS Code Live Server
# Install "Live Server" extension → Click "Go Live"

# Option 2: Python
python3 -m http.server 8000
# Visit http://localhost:8000

# Option 3: Node.js
npx http-server -p 8000
```

> ⚠️ **CORS Warning**: Opening HTML files directly (`file://`) may block JS features (e.g., product database loading) due to browser security policies.

---

## 🚀 Deployment

### Recommended: Cloudflare Pages
1. Connect GitHub repo to Cloudflare Pages
2. Pre-configured files:
   - `_headers`: CSP, HSTS, caching rules
   - `_redirects`: SEO-friendly redirects, WhatsApp shortcuts
3. **Build Command**: None (purely static)
4. **Output Directory**: `/` (root)

### Alternative: GitHub Pages
1. Enable GitHub Pages in repo settings
2. Set source to root directory
3. ⚠️ Note: Custom headers (`_headers`) won't work (no CSP/HSTS support)

---

## ⚡ Performance Optimization

### Core Web Vitals
- **LCP** (<2.5s): Critical images use `fetchpriority="high"`
- **FID** (<100ms): Non-critical JS deferred
- **CLS** (0): Explicit image dimensions (aligned with standardized product image structure)

### Caching Strategy
- **Static Assets**: 1 year cache (`immutable`)
- **HTML**: 1 hour cache (`must-revalidate`)
- **Cache Busting**: Version parameters (`main.js?v=2.2.0`)

### CDN Configuration
- **Cloudflare R2**: Primary image host (for product images, logo)
- **GitHub Raw**: Emergency fallback
- **Auto-failover**: Triple-layer error handling in `image-utils.js`

---

## 🔒 Security

- **Content Security Policy (CSP)**: Enforced via `_headers`
- **HTTPS Only**: Cloudflare auto-redirect
- **XSS Protection**: `security-utils.js` sanitizes inputs
- **CSRF Protection**: Form nonces, SameSite cookies
- **Workbench Security**: Password hashing, brute-force protection, lockout mechanism

---

## 📊 Analytics

Built-in tracking for:
- Page views (via `performance-monitor.js`)
- PDF downloads
- WhatsApp clicks (tracked in `catalog.html` WhatsApp button)
- Product interactions
- Core Web Vitals (TTFB, DOM Ready, Full Load)

Compliant with GDPR (anonymous data, no PII).

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Header/Footer render on all pages
- [ ] Product images load with fallback (test broken CDN paths)
- [ ] Contact form submission (test mode)
- [ ] Mobile responsiveness (375px → 1920px)
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Workbench authentication & lockout logic
- [ ] Product search in `catalog.html`
- [ ] SEO meta tags update (verify via `seo-utils.js`)

### Performance Testing
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --config=lighthouserc.json
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- **JS**: ES6+, no jQuery (consistent with existing utils like `seo-utils.js`, `performance-monitor.js`)
- **CSS**: Tailwind utility-first, minimal custom CSS (`css/style.css`)
- **HTML**: Semantic tags, ARIA labels for accessibility
- **File Naming**: Lowercase with hyphens (aligned with product image structure)

---

## 📄 License

© 2025 V5 Medical LTD. All Rights Reserved.

**Unauthorized copying, modification, distribution, or use of this software is prohibited** without prior written permission from V5 Medical LTD.

---

## 📞 Support

### Technical Support
- **Email**: tech@v5md.com
- **WhatsApp**: +44-078-9504-7944
- **Website**: [v5md.com](https://v5md.com)

### Business Inquiries
- **Sales**: sales@v5md.com
- **QA/Regulatory**: qa@v5md.com (CE Marking, sterilization standards)
- **Finance**: finance@v5md.com (payment strategy, T/T/Credit Card lanes)

---

## 🎓 Documentation References
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Docsify Docs](https://docsify.js.org/)
- [Stripe Payment Links](https://stripe.com/docs/payment-links)
- [EN ISO 13408 - Sterilization Standards](https://www.iso.org/standard/74439.html)
- [MDR (EU 2017/745)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32017R0745)

---

## 🗓️ Changelog

### [2.7.0] - 2025-01-02
#### Added
- Payment portal (`payment.html`) with Stripe integration (Two-Lane payment system)
- Internal workbench (`/workbench/`) with authentication & order management
- Blog knowledge hub (`/blog/`) powered by Docsify (CE Marking, sterilization, packaging specs)
- Enhanced SEO utilities (`seo-utils.js`) with JSON-LD injection
- Product loader system (`product-loader.js`) with dual database support
- Standardized product image directory structure (`images/products/`)

#### Changed
- Migrated to complete product database (51 SKUs)
- Updated image loading with triple fallback (aligned with new image structure)
- Improved mobile responsiveness for `catalog.html` search & WhatsApp CTA
- Refactored performance monitoring (`performance-monitor.js`) for Core Web Vitals

#### Fixed
- Image path resolution in product catalog (matching `images/products/` structure)
- Mobile menu z-index conflicts
- Google Translate positioning
- Workbench login error handling

### [2.0.0] - 2024-12-15
- Initial public release

---

**Last Updated**: January 2, 2025  
**Maintained by**: V5 Medical Development Team  
**Build Status**: ✅ Stable (Production-Ready)