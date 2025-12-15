# V5 Medical LTD Official Website

![V5 Medical Logo](https://raw.githubusercontent.com/alden888/v5md/main/images/v5logo.png)

**Professional Global Medical Consumables Supplier**

*More Sophisticated, More Professional, More Secure*

![Live Website](https://img.shields.io/badge/Website-Live-brightgreen?style=for-the-badge)
![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-blue?style=for-the-badge)
![Responsive Design](https://img.shields.io/badge/Design-Responsive-important?style=for-the-badge)
![ISO Certified](https://img.shields.io/badge/Certified-ISO%2013485%20%7C%20CE%20%7C%20FDA-orange?style=for-the-badge)

---

## 📋 Project Overview

V5 Medical LTD is a professional global medical consumables supplier with over 20 years of experience in the medical device industry. This website serves as our digital storefront, showcasing our comprehensive product catalog, company information, and providing seamless communication channels for our global clients.

### 🌟 Key Features

* **Unified Layout System**: Shared header, footer, and floating elements via `layout.js` for consistent UX.
* **Responsive Design**: Optimized for all devices (desktop, tablet, mobile).
* **Dynamic Product Catalog**: JS-driven product loading with category filtering and detail views.
* **Secure Payment Options**: Local currency transfers in 5+ currencies.
* **Lead Generation**: Integrated contact forms (Formspree) and WhatsApp floating buttons.
* **SEO Optimized**: Advanced Schema markup (JSON-LD), sitemap, and optimized meta tags.
* **Fast Loading**: Minified assets, lazy loading images, and Cloudflare CDN delivery.

---

## 🛠️ Technical Stack

| Technology | Purpose | Version |
| :--- | :--- | :--- |
| **HTML5** | Structure and semantics | Latest |
| **CSS3** | Styling | Latest |
| **JavaScript** | Core logic & Layout injection | ES6+ |
| **Tailwind CSS** | Utility-first CSS framework | v3 |
| **Font Awesome** | Icons and visual elements | 6.5.1 |
| **Cloudflare Pages** | Hosting and deployment | - |

---

## 📁 Project Structure

```text
v5md/
├── index.html              # 首页 (Landing Page)
├── catalog.html            # 产品目录 (Dynamic Catalog)
├── product-detail.html     # 产品详情页 (Dynamic Template)
├── about.html              # 关于我们 (Company Profile)
├── contact.html            # 联系我们 (Inquiry Form)
├── blog.html               # 博客与新闻 (Blog & Updates)
├── privacy.html            # 隐私政策 (Legal)
│
├── css/
│   ├── style.css           # 自定义样式
│   └── vendor/             # 第三方CSS
│
├── js/
│   ├── layout.js           # [核心] 统一布局管理 (Header/Footer/Float) ✅
│   ├── main.js             # [核心] 全局交互逻辑 (Loader/Menu/Scroll) ✅
│   ├── complete-products.js # [核心] 完整产品数据库 (Data Source) ✅
│   ├── product-loader.js   # 产品加载与渲染逻辑
│   ├── config.js           # 全局配置
│   ├── image-utils.js      # 图片处理与回退机制
│   ├── seo-utils.js        # SEO 工具函数
│   ├── performance-monitor.js # 性能监控
│   └── vendor/             # 第三方JS库
│
├── images/                 # 图片资源目录
│   ├── products/           # 产品高清图
│   ├── quality/            # 证书 (ISO/CE/FDA)
│   ├── blog/               # 博客图片
│   └── ...
│
├── pdf/                    # 可下载资源 (Catalog/Price List)
├── robots.txt              # 搜索引擎爬虫规则 (SEO Optimized)
├── sitemap.xml             # 站点地图 (SEO Optimized)
└── README.md               # 项目文档


🚀 Recent Optimizations (December 2024)
1. Modular Architecture Implementation ✅
• Shared Layout System: Implemented layout.js to dynamically inject Header, Footer, and Floating Action Buttons. This reduced HTML code duplication by 40% across all pages.
• Unified Main Logic: Centralized core interactions (Loading spinner, Mobile menu, Back-to-top) into main.js.
2. SEO & Performance ✅
• Sitemap Generation: Updated sitemap.xml to include dynamic product links (?id=xyz) and image sitemaps for better Google indexing.
• Robots.txt Optimization: Fixed logic errors to allow proper crawling of CSS/JS/Images by Googlebot while blocking sensitive system files.
• Structured Data: Enhanced JSON-LD Schema markup for Organization, Product, and BreadcrumbList.
3. Data Management ✅
• Centralized Database: Consolidated product data into complete-products.js (V3.0.0), serving as the single source of truth for Catalog and Detail pages.

🔄 Deployment
Cloudflare Pages Deployment
This website is deployed on Cloudflare Pages with automatic CI/CD pipeline:
1. GitHub Integration: Connected to main repository.
2. Auto-Deployment: Commits to main branch trigger instant deployment.
3. Build Configuration: Static HTML (No build command required).
4. Production URL: https://v5md.com

📝 How to Update Content
Adding a New Product
1. Open js/complete-products.js.
2. Add a new object to the completeProductData array.
3. Ensure unique id and correct category mapping.
4. Commit changes. The Catalog and Detail pages will update automatically.
Updating Header/Footer
1. Open js/layout.js.
2. Modify the headerHTML or footerHTML template strings.
3. Changes apply instantly to all pages upon deployment.

📞 Contact & Support
• Business Inquiries: sales@v5md.com
• WhatsApp: +44 78 9504 7944
• Website: v5md.com

📜 License
© 2025 V5 Medical LTD. All rights reserved.
Confidential and Proprietary
This repository contains confidential business information of V5 Medical LTD. Unauthorized use, reproduction, or distribution is prohibited.

