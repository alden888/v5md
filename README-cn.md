V5 Medical LTD - 官方网站
https://images/v5medlogo.png
专业全球医疗耗材供应商
工厂直供 | ISO 13485认证 | CE认证 | FDA认证
本仓库包含 V5 Medical LTD 官方网站（v5md.com）的源代码。该网站是一个高性能的静态Web应用，使用自定义的JavaScript布局引擎，针对SEO、速度和易维护性进行了优化。
￼
🚀 核心特性
1. 🏗️ 动态布局引擎
• 统一的页眉和页脚：js/layout.js脚本在所有页面中动态渲染导航栏和页脚。
• 易于维护：只需编辑js/layout.js一次即可更新整个网站的菜单或联系信息。
2. ⚙️ 集中式配置
• 配置优先：所有全局变量（联系电话、电子邮件、API URL、CDN路径）都在js/config.js中统一管理。
• 环境感知：自动检测运行环境（本地开发或生产环境），调整API端点和资源路径。
3. 🖼️ 智能图片加载
• 三重回退系统：通过js/image-utils.js采用稳健的图片加载策略：
1. 首选：Cloudflare R2 CDN（最快）
2. 备选：本地路径（开发环境回退）
3. 第三选择：GitHub Raw（应急备份）
4. 最终回退：默认占位图（用户体验保护）
4. 🛍️ 动态产品数据库
• 无需后端：产品目录由js/complete-products.js中的轻量级JSON结构驱动。
• 功能：支持分类筛选、实时搜索（带防抖功能）和基于URL参数的动态产品详情页（如?id=pga-suture）。
5. 🔍 SEO优化
• 动态元标签：js/seo-utils.js根据当前页面内容自动更新<title>、<meta description>和JSON-LD结构化数据。
• 性能优化：高优先级资源（LCP）使用fetchpriority="high"，非关键图片使用loading="lazy"。
￼
📂 项目结构
text
￼
复制
￼
￼
下载
￼
v5md/
├── index.html              # 首页
├── about.html              # 关于我们（公司简介、发展历程）
├── catalog.html            # 产品目录（搜索和筛选）
├── product-detail.html     # 单产品模板（动态生成）
├── contact.html            # 联系表单和付款信息
├── blog.html               # 公司新闻和物流更新
│
├── js/                     # 核心逻辑
│   ├── config.js           # [关键] 全局设置和路径
│   ├── layout.js           # [关键] 页眉/页脚渲染器
│   ├── main.js             # 通用UI交互（移动菜单、滚动）
│   ├── complete-products.js# 产品数据库
│   ├── image-utils.js      # 智能图片加载器
│   └── seo-utils.js        # 动态SEO管理器
│
├── css/
│   └── style.css           # Tailwind自定义样式
│
├── images/                 # 本地资源备份
├── pdf/                    # 可下载的目录
│
├── _headers                # Cloudflare Pages头部配置
└── _redirects              # Cloudflare Pages重定向规则
￼
￼
￼
🛠️ 维护指南
1. 更新联系信息
编辑js/config.js，修改CONTACT对象中的值。这将立即更新页眉、页脚和联系页面。
2. 添加/编辑产品
编辑js/complete-products.js，在completeProductData数组中添加新对象。目录和详情页面将自动更新。
3. 修改布局
编辑js/layout.js，修改renderHeader()或renderFooter()函数。这里注入的HTML将出现在每个页面上。
4. 编辑页面内容
打开特定的HTML文件（如about.html），只编辑<main>标签内的内容。不要手动添加<nav>或<footer>标签，因为它们会自动注入。
￼
💻 本地开发
克隆仓库：
bash
￼
复制
￼
￼
下载
￼
git
 clone https://github.com/alden888/v5md.git
cd v5md
￼
￼
本地运行：
您可以使用任何静态服务器。如果使用VS Code，安装"Live Server"扩展并点击"Go Live"。
注意：直接打开HTML文件（file://）可能会因CORS安全策略而阻止某些JS功能。
￼
🚀 部署
本项目已针对Cloudflare Pages（推荐）或GitHub Pages进行优化。
Cloudflare Pages：
1. 将您的GitHub仓库连接到Cloudflare Pages
2. _headers和_redirects文件已预先配置以实现最佳缓存和安全性
3. 构建命令：无（纯静态）
4. 输出目录：/（根目录）
GitHub Pages：
1. 在仓库设置中启用GitHub Pages
2. 将源设置为根目录
3. 注意：某些高级功能（如自定义头部）可能无法按预期工作
￼
⚡ 性能优化
核心Web指标
• LCP（最大内容绘制）：通过fetchpriority="high"加载关键图片进行优化
• FID（首次输入延迟）：通过推迟非关键JavaScript最小化
• CLS（累积布局偏移）：通过设置图片的明确尺寸来防止
缓存策略
• 静态资源使用长TTL（1年）缓存
• HTML文件使用短TTL（1小时）缓存以实现快速更新
• 通过版本参数实现缓存清除（如js/main.js?v=2.1）
￼
🔒 安全
• 内容安全策略（CSP）：通过_headers文件实现
• 仅限HTTPS：通过Cloudflare设置强制执行
• XSS保护：通过现代浏览器功能和安全的编码实践内置
• CSRF保护：表单通过反CSRF措施进行保护
￼
📊 分析
网站包含基本分析跟踪：
• 页面浏览量
• PDF下载
• WhatsApp点击
• 产品互动
分析数据安全存储，并符合GDPR规定。
￼
🤝 贡献
1. Fork本仓库
2. 创建功能分支（git checkout -b feature/amazing-feature）
3. 提交更改（git commit -m '添加一些很棒的功能'）
4. 推送到分支（git push origin feature/amazing-feature）
5. 开启一个Pull Request
￼
📄 许可证
© 2025 V5 Medical LTD。保留所有权利。
未经V5 Medical LTD事先书面许可，禁止对本软件进行任何复制、修改、分发或使用。
￼
📞 支持
如需技术支持或有关网站的问题：
• 邮箱：tech@v5md.com
• WhatsApp：+44-078-9504-7944
• 网站：v5md.com
最后更新：2025年12月