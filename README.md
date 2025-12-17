# V5 Medical LTD - Official Website



![V5 Medical Logo](images/v5medlogo.png)

> **Professional Global Medical Consumables Supplier**

Factory Direct | ISO 13485 | CE | FDA Certified

This repository contains the source code for the official website of **V5 Medical LTD** ([v5md.com](https://v5md.com)). The site is built as a high-performance static web application, optimized for SEO, speed, and ease of maintenance using a custom JavaScript-based layout engine.



***

## 🚀 Key Features (核心特性)

### 1. 🏗️ Dynamic Layout Engine (动态布局引擎)



* **Unified Header & Footer**: The `js/layout.js` script dynamically renders the navigation bar and footer across all pages.

* **Maintenance**: You only need to edit `js/layout.js` once to update the menu or contact info for the entire site.

### 2. ⚙️ Centralized Configuration (集中配置)



* **Config First**: All global variables (Contact numbers, Email, API URLs, CDN paths) are managed in `js/config.js`.

* **Environment Aware**: Automatically detects if running on `localhost` or Production (`v5md.com`) to adjust API endpoints and asset paths.

### 3. 🖼️ Smart Image Loading (智能图片加载)



* **Triple Fallback System**: Images are loaded with a robust strategy via `js/image-utils.js`:

1. **Primary**: Cloudflare R2 CDN (Fastest)

2. **Secondary**: Local path (Development fallback)

3. **Tertiary**: GitHub Raw (Emergency backup)

4. **Final**: Default Placeholder (User experience protection)

### 4. 🛍️ Dynamic Product Database (动态产品库)



* **No Backend Required**: The product catalog is powered by a lightweight JSON-like structure in `js/complete-products.js`.

* **Features**: Supports Category Filtering, Real-time Search (with Debounce), and Dynamic Product Detail pages based on URL parameters (e.g., `?id=pga-suture`).

### 5. 🔍 SEO Optimized (搜索引擎优化)



* **Dynamic Meta Tags**: `js/seo-utils.js` automatically updates `<title>`, `<meta description>`, and JSON-LD Structured Data based on the current page content.

* **Performance**: High priority resources (LCP) use `fetchpriority="high"`, and non-critical images use `loading="lazy"`.



***

## 📂 Project Structure (项目结构)



```
v5md/

├── index.html              # Homepage

├── about.html              # About Us (Company Profile, Milestones)

├── catalog.html            # Product Catalog (Search & Filter)

├── product-detail.html     # Single Product Template (Dynamic)

├── contact.html            # Contact Form & Payment Info

├── blog.html               # Company News & Logistics Updates

│

├── js/                     # Core Logic

│   ├── config.js           # \[CRITICAL] Global Settings & Paths

│   ├── layout.js           # \[CRITICAL] Header/Footer Renderer

│   ├── main.js             # General UI Interactions (Mobile Menu, Scroll)

│   ├── complete-products.js# Product Database

│   ├── image-utils.js      # Smart Image Loader

│   └── seo-utils.js        # Dynamic SEO Manager

│

├── css/

│   └── style.css           # Custom Overrides for Tailwind

│

├── images/                 # Local Asset Fallbacks

├── pdf/                    # Downloadable Catalogs

│

├── \_headers                # Cloudflare Pages Headers config

└── \_redirects              # Cloudflare Pages Redirect rules
```



***

## 🛠️ How to Maintain (维护指南)

### 1. Updating Contact Info (修改联系方式)

Edit `js/config.js`. Change values under `CONTACT` object. This will instantly update the Header, Footer, and Contact Page.

### 2. Adding/Editing Products (管理产品)

Edit `js/complete-products.js`. Add a new object to the `completeProductData` array. The Catalog and Detail pages will update automatically.

### 3. Modifying Layout (修改页眉页脚)

Edit `js/layout.js`. Modify the `renderHeader()` or `renderFooter()` functions. HTML injected here appears on every page.

### 4. Editing Page Content (修改页面正文)

Open the specific HTML file (e.g., `about.html`). Only edit content inside the `<main>` tag. Do not manually add `<nav>` or `<footer>` tags, as they are auto-injected.



***

## 💻 Local Development (本地开发)

### Clone the repository:



```
git clone https://github.com/alden888/v5md.git

cd v5md
```

### Run locally:

You can use any static server. If using VS Code, install the "Live Server" extension and click "Go Live".

> **Note**
>
> : Opening HTML files directly (file://) may block some JS features due to CORS security policies.



***

## 🚀 Deployment (部署)

This project is optimized for **Cloudflare Pages** (Recommended) or **GitHub Pages**.

### Cloudflare Pages:



1. Connect your GitHub repo to Cloudflare Pages

2. The `_headers` and `_redirects` files are pre-configured for optimal caching and security

3. **Build Command**: None (It's purely static)

4. **Output Directory**: / (Root)

### GitHub Pages:



1. Enable GitHub Pages in your repository settings

2. Set the source to the root directory

3. Note: Some advanced features like custom headers may not work as expected



***

## ⚡ Performance Optimization (性能优化)

### Core Web Vitals



* **LCP (Largest Contentful Paint)**: Optimized by loading critical images with `fetchpriority="high"`

* **FID (First Input Delay)**: Minimized by deferring non-critical JavaScript

* **CLS (Cumulative Layout Shift)**: Prevented by setting explicit dimensions for images

### Caching Strategy



* Static assets are cached with long TTLs (1 year)

* HTML files are cached with short TTLs (1 hour) for quick updates

* Cache busting via version parameters (e.g., `js/main.js?v=2.1`)



***

## 🔒 Security (安全)



* **Content Security Policy (CSP)**: Implemented via `_headers` file

* **HTTPS Only**: Enforced via Cloudflare settings

* **XSS Protection**: Built-in via modern browser features and secure coding practices

* **CSRF Protection**: Forms are protected with anti-CSRF measures



***

## 📊 Analytics (分析)

The site includes basic analytics tracking for:



* Page views

* PDF downloads

* WhatsApp clicks

* Product interactions

Analytics data is stored securely and complies with GDPR regulations.



***

## 🤝 Contributing (贡献)



1. Fork the repository

2. Create your feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add some amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request



***

## 📄 License

© 2025 V5 Medical LTD. All Rights Reserved.

Unauthorized copying, modification, distribution, or use of this software is prohibited without prior written permission from V5 Medical LTD.



***

## 📞 Support (支持)

For technical support or questions about the website:



* **Email**: tech@v5md.com

* **WhatsApp**: +44-078-9504-7944

* **Website**: [v5md.com](https://v5md.com)

Last updated: December 2025

> （注：文档部分内容可能由 AI 生成）