# V5 Medical LTD - 官方网站

<div align="center">
  <img src="https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5medlogo.png" alt="V5 Medical Logo" width="200"/>
  
  <h3>专业全球医疗耗材供应商 | 工厂直供・品质认证</h3>
  <p>Factory Direct | ISO 13485 | CE | FDA Certified</p>

  [![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fv5md.com&label=v5md.com&style=flat-square)](https://v5md.com)
  [![Deploy Status](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-orange?style=flat-square&logo=cloudflare)](https://pages.cloudflare.com/)
  [![License](https://img.shields.io/badge/License-Proprietary-blue?style=flat-square)](LICENSE)
</div>

---

本仓库包含 **V5 Medical LTD** 官方网站（[v5md.com](https://v5md.com)）的完整源代码。网站采用高性能静态架构，基于 JavaScript 动态布局引擎，专为 **SEO 优化**、**极速加载**和**便捷维护**而设计。

## 🚀 核心特性

### 1. 🏗️ 动态布局引擎
* **统一渲染**：通过 `js/layout.js` 动态生成全站导航栏、页脚和浮动元素，告别重复代码。
* **一键维护**：只需修改一次配置文件，全站布局同步更新。
* **响应式设计**：完美适配桌面、平板和移动设备。

### 2. ⚙️ 集中式配置管理
* **环境感知**：自动识别开发 / 生产环境，智能切换资源路径（本地 vs CDN）。
* **数据统一**：联系信息、API 配置、CDN 路径等全局设置集中在 `js/config.js` 管理。
* **灵活扩展**：支持多语言、多区域配置扩展。

### 3. 🖼️ 智能图片加载系统
采用 `js/image-utils.js` 实现四级回退机制，确保图片 100% 可用：
1.  **首选**：Cloudflare R2 CDN (极速全球分发)
2.  **备选**：本地资源 (开发环境备用)
3.  **应急**：GitHub Raw (网络故障恢复)
4.  **兜底**：默认占位图 (用户体验保障)

### 4. 🛍️ 动态产品数据库
* **零后端依赖**：基于静态 JSON 的产品管理系统 (`js/complete-products.js`)。
* **高级筛选**：支持分类、标签、参数多维筛选。
* **实时搜索**：集成防抖 (Debounce) 优化，毫秒级响应。
* **动态详情页**：URL 参数驱动渲染 (`product-detail.html?id=产品ID`)。

### 5. 🔍 SEO 与性能优化
* **动态元标签**：`js/seo-utils.js` 自动管理每页的标题、描述和 JSON-LD 结构化数据。
* **核心 Web 指标**：针对 LCP、FID、CLS 进行全面优化。
* **缓存策略**：智能资源版本控制 (`?v=x.x.x`)，兼顾长期缓存与即时更新。

---

## 📂 项目结构

```text
v5md/
├── index.html              # 首页（核心入口）
├── about.html              # 关于我们（公司介绍与历程）
├── catalog.html            # 产品目录（搜索与筛选）
├── product-detail.html     # 产品详情（动态模板）
├── contact.html            # 联系页面（表单与支付）
├── blog.html               # 博客动态（新闻与物流）
├── privacy.html            # 隐私政策
│
├── js/                     # 核心逻辑层
│   ├── config.js           # 【配置】全局配置中心
│   ├── layout.js           # 【布局】Header/Footer 渲染引擎
│   ├── main.js             # 【交互】通用 UI 交互逻辑
│   ├── complete-products.js# 【数据】产品数据库（JSON）
│   ├── product-loader.js   # 【逻辑】产品数据加载与解析
│   ├── image-utils.js      # 【工具】智能图片加载器
│   ├── seo-utils.js        # 【工具】SEO 动态管理器
│   └── performance-monitor.js # 【工具】性能监控
│
├── css/
│   └── style.css           # Tailwind 自定义样式覆盖
│
├── images/                 # 图片资源
│   ├── products/           # 产品高清图
│   ├── quality/            # 认证证书
│   └── ...
│
├── pdf/                    # 可下载文档 (Catalog, Price List)
│
├── _headers                # Cloudflare Pages 头部配置 (CSP, Cache)
├── _redirects              # Cloudflare 重定向规则
└── README.md               # 项目说明文档

```

---

## 🛠️ 维护指南

### 1. 更新联系信息

编辑 `js/config.js` 中的 `CONTACT` 对象：

```javascript
CONTACT: {
    WHATSAPP: {
        DISPLAY: '+44 078 9504 7944',
        API_URL: '[https://wa.me/447895047944](https://wa.me/447895047944)'
    },
    EMAIL: {
        SALES: 'sales@v5md.com'
    },
    // ...
}

```

### 2. 添加新产品

在 `js/complete-products.js` 的 `completeProductData` 数组中新增对象：

```javascript
{
    id: "new-product-id",
    name: "产品名称",
    category: "产品类别",
    images: ["images/products/category/new-product.jpg"],
    specifications: { "Material": "...", "Size": "..." },
    certifications: ["ISO 13485", "CE"]
}

```

### 3. 修改页面布局

* **导航栏**：编辑 `js/layout.js` 中的 `renderHeader()` 函数。
* **页脚**：编辑 `js/layout.js` 中的 `renderFooter()` 函数。
* **悬浮按钮**：编辑 `js/layout.js` 中的 `renderFloatingElements()` 函数。

### 4. 编辑页面内容

直接编辑对应 HTML 文件的 `<main>` 标签内部内容。

> **注意**：不要手动在 HTML 中添加 `<nav>` 或 `<footer>` 标签，它们由布局引擎自动注入。

---

## 💻 开发与部署

### 本地开发

1. **克隆仓库**
```bash
git clone [https://github.com/alden888/v5md.git](https://github.com/alden888/v5md.git)
cd v5md

```


2. **启动服务**
建议使用 VS Code 的 **Live Server** 插件，或者 Python：
```bash
python3 -m http.server 8000

```



### 生产部署 (Cloudflare Pages)

1. 连接 GitHub 仓库至 Cloudflare Pages。
2. **构建配置**：
* 构建命令：(留空)
* 输出目录：`/` (根目录)


3. **自定义域名**：绑定 `v5md.com`。

---

## 🔒 安全配置

### 内容安全策略 (CSP)

项目通过 `_headers` 文件实施严格的 CSP 策略：

* **脚本源**：仅允许本站、Google Translate、Google Analytics。
* **样式源**：仅允许本站、FontAwesome CDN、Google Fonts。
* **防点击劫持**：`X-Frame-Options: DENY`。

---

## 📊 分析与监控

* **Google Analytics 4**：ID `G-JE15YSMC2W`。
* **事件追踪**：自动追踪产品查看、PDF 下载、WhatsApp 点击、表单提交。
* **性能监控**：集成 Core Web Vitals 监控。

---

## 📄 版权说明

© 2025 **V5 Medical LTD**. All Rights Reserved.

未经书面许可，禁止复制、分发或用于商业竞争用途。

---

## 📞 联系方式

* **业务咨询**: sales@v5md.com
* **WhatsApp**: +44 78 9504 7944
* **官方网站**: [v5md.com](https://v5md.com)

```

```
