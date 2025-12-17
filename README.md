# V5 Medical LTD - Official Website

![V5 Medical Logo](images/v5medlogo.png)

> **Professional Global Medical Consumables Supplier** > Factory Direct | ISO 13485 | CE | FDA Certified

This repository contains the source code for the official website of **V5 Medical LTD** (v5md.com). The site is built as a high-performance static web application, optimized for SEO, speed, and ease of maintenance using a custom JavaScript-based layout engine.

---

## 🚀 Key Features (核心特性)

### 1. 🏗️ Dynamic Layout Engine (动态布局引擎)
- **Unified Header & Footer**: The `js/layout.js` script dynamically renders the navigation bar and footer across all pages.
- **Maintenance**: You only need to edit `js/layout.js` once to update the menu or contact info for the entire site.

### 2. ⚙️ Centralized Configuration (集中配置)
- **Config First**: All global variables (Contact numbers, Email, API URLs, CDN paths) are managed in `js/config.js`.
- **Environment Aware**: Automatically detects if running on `localhost` or Production (`v5md.com`) to adjust API endpoints and asset paths.

### 3. 🖼️ Smart Image Loading (智能图片加载)
- **Triple Fallback System**: Images are loaded with a robust strategy via `js/image-utils.js`:
    1.  **Primary**: Cloudflare R2 CDN (Fastest)
    2.  **Secondary**: Local path (Development fallback)
    3.  **Tertiary**: GitHub Raw (Emergency backup)
    4.  **Final**: Default Placeholder (User experience protection)

### 4. 🛍️ Dynamic Product Database (动态产品库)
- **No Backend Required**: The product catalog is powered by a lightweight JSON-like structure in `js/complete-products.js`.
- **Features**: Supports Category Filtering, Real-time Search (with Debounce), and Dynamic Product Detail pages based on URL parameters (e.g., `?id=pga-suture`).

### 5. 🔍 SEO Optimized (搜索引擎优化)
- **Dynamic Meta Tags**: `js/seo-utils.js` automatically updates `<title>`, `<meta description>`, and JSON-LD Structured Data based on the current page content.
- **Performance**: High priority resources (LCP) use `fetchpriority="high"`, and non-critical images use `loading="lazy"`.

---

## 📂 Project Structure (项目结构)

```text
v5md/
├── index.html              # Homepage
├── about.html              # About Us (Company Profile, Milestones)
├── catalog.html            # Product Catalog (Search & Filter)
├── product-detail.html     # Single Product Template (Dynamic)
├── contact.html            # Contact Form & Payment Info
├── blog.html               # Company News & Logistics Updates
│
├── js/                     # Core Logic
│   ├── config.js           # [CRITICAL] Global Settings & Paths
│   ├── layout.js           # [CRITICAL] Header/Footer Renderer
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
├── _headers                # Cloudflare Pages Headers config
└── _redirects              # Cloudflare Pages Redirect rules
________________________________________

🛠️ How to Maintain (维护指南)
1. Updating Contact Info (修改联系方式)
Edit js/config.js. Change values under CONTACT object. This will instantly update the Header, Footer, and Contact Page.
2. Adding/Editing Products (管理产品)
Edit js/complete-products.js. Add a new object to the completeProductData array. The Catalog and Detail pages will update automatically.
3. Modifying Layout (修改页眉页脚)
Edit js/layout.js. Modify the renderHeader() or renderFooter() functions. HTML injected here appears on every page.
4. Editing Page Content (修改页面正文)
Open the specific HTML file (e.g., about.html). Only edit content inside the <main> tag. Do not manually add <nav> or <footer> tags, as they are auto-injected.
________________________________________
💻 Local Development (本地开发)
1.	Clone the repository:
Bash
git clone [https://github.com/alden888/v5md.git](https://github.com/alden888/v5md.git)
2.	Run locally: You can use any static server. If using VS Code, install the "Live Server" extension and click "Go Live". Note: Opening HTML files directly (file://) may block some JS features due to CORS security policies.
________________________________________
🚀 Deployment (部署)
This project is optimized for Cloudflare Pages (Recommended) or GitHub Pages.
•	Cloudflare Pages: Connect your GitHub repo. The _headers and _redirects files are pre-configured for optimal caching and security.
•	Build Command: None (It's purely static).
•	Output Directory: / (Root).
________________________________________
📄 License
© 2025 V5 Medical LTD. All Rights Reserved.

