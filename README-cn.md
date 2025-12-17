V5 Medical LTD - 官方网站
https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5medlogo.png
专业全球医疗耗材供应商 | 工厂直供 · 品质认证
Factory Direct | ISO 13485 | CE | FDA Certified
本仓库包含 V5 Medical LTD 官方网站（v5md.com）的完整源代码。网站采用高性能静态架构，基于JavaScript动态布局引擎，专为SEO优化、极速加载和便捷维护而设计。
￼
🚀 核心特性
1. 🏗️ 动态布局引擎
• 统一渲染：通过 js/layout.js 动态生成全站导航栏、页脚和浮动元素
• 一键维护：只需修改一次配置文件，全站布局同步更新
• 响应式设计：完美适配桌面、平板和移动设备
2. ⚙️ 集中式配置管理
• 环境感知：自动识别开发/生产环境，智能切换资源路径
• 数据统一：联系信息、API配置、CDN路径等全局设置集中管理 (js/config.js)
• 灵活扩展：支持多语言、多区域配置
3. 🖼️ 智能图片加载系统
• 四级回退机制：
1. 首选：Cloudflare R2 CDN (极速全球分发)
2. 备选：本地资源 (开发环境备用)
3. 应急：GitHub Raw (网络故障恢复)
4. 兜底：默认占位图 (用户体验保障)
• 按需加载：自动识别关键图片优先加载，非关键图片延迟加载
4. 🛍️ 动态产品数据库
• 零后端依赖：基于静态JSON的产品管理系统 (js/complete-products.js)
• 高级筛选：支持分类、标签、参数多维筛选
• 实时搜索：防抖优化，毫秒级响应
• 动态详情页：URL参数驱动 (product-detail.html?id=产品ID)
5. 🔍 SEO与性能优化
• 动态元标签：每页独立标题、描述和结构化数据
• 核心Web指标：LCP、FID、CLS全面优化
• 缓存策略：智能资源版本控制，长期缓存 + 即时更新
• 移动优先：PWA就绪，渐进式增强
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
├── index.html                 # 首页（核心入口）
├── about.html                 # 关于我们（公司介绍与历程）
├── catalog.html              # 产品目录（搜索与筛选）
├── product-detail.html       # 产品详情（动态模板）
├── contact.html              # 联系页面（表单与支付）
├── blog.html                 # 博客动态（新闻与物流）
│
├── js/                       # 核心逻辑层
│   ├── config.js             # 【关键】全局配置中心
│   ├── layout.js             # 【关键】布局渲染引擎
│   ├── main.js               # 通用UI交互逻辑
│   ├── complete-products.js  # 产品数据库（JSON结构）
│   ├── image-utils.js        # 智能图片加载器
│   └── seo-utils.js          # SEO动态管理器
│
├── css/
│   └── style.css             # Tailwind自定义样式覆盖
│
├── images/                   # 本地图片资源（CDN回退）
│   ├── products/             # 产品图片
│   ├── quality/              # 认证证书
│   └── icons/                # 图标资源
│
├── pdf/                      # 可下载文档
│   ├── Catalog.pdf           # 产品目录
│   ├── Quotations for dental products.pdf
│   └── price list.pdf
│
├── _headers                  # Cloudflare Pages头部配置
├── _redirects                # Cloudflare重定向规则
└── README.md                 # 项目说明文档
￼
￼
￼
🛠️ 维护指南
1. 更新联系信息
编辑 js/config.js 中的 CONTACT 配置段：
javascript
￼
复制
￼
￼
下载
￼
CONTACT: {
    WHATSAPP: {
        DISPLAY: '+44 078 9504 7944',
        API_URL: 'https://wa.me/447895047944'
    },
    EMAIL: {
        SALES: 'sales@v5md.com'
    },
    ADDRESS: 'No. 168, Luying Road, Kunshan...'
}
￼
￼
2. 添加新产品
在 js/complete-products.js 的 completeProductData 数组中新增产品对象：
javascript
￼
复制
￼
￼
下载
￼
{
    id: "新产品ID",
    name: "产品名称",
    category: "产品类别",
    images: ["图片路径"],
    specifications: { ... },
    certifications: ["ISO 13485", "CE"]
}
￼
￼
3. 修改页面布局
编辑 js/layout.js 中的相应渲染函数：
• renderHeader() - 修改导航栏
• renderFooter() - 修改页脚
• renderFloatingElements() - 修改悬浮按钮
4. 编辑页面内容
直接编辑对应HTML文件的 <main> 标签内部内容。注意：不要手动添加导航栏或页脚，它们由布局引擎自动注入。
￼
💻 开发与部署
本地开发环境
bash
￼
复制
￼
￼
下载
￼
# 克隆仓库
git
 clone https://github.com/alden888/v5md.git
cd
 v5md

# 使用Live Server启动（VS Code扩展）
# 或使用Python简易服务器
python3 
-m http.server 8000
￼
￼
生产部署
Cloudflare Pages（推荐）
1. 连接GitHub仓库至Cloudflare Pages
2. 构建命令：留空（纯静态站点）
3. 输出目录：/（根目录）
4. 环境变量：无需额外配置
GitHub Pages
1. 仓库设置 → Pages → Source: main分支根目录
2. 自定义域名：v5md.com（需配置DNS）
环境配置
• 开发环境：自动使用本地资源
• 生产环境：自动切换至CDN加速资源
• 路径策略：相对路径 + BASE_URL动态适配
￼
⚡ 性能优化策略
核心Web指标
￼
￼
指标
优化策略
目标值
LCP
关键图片预加载、CDN加速
<2.5s
FID
JavaScript分块加载、交互优化
<100ms
CLS
图片尺寸预设、布局稳定性
<0.1
缓存策略
• 静态资源：Cache-Control: max-age=31536000（1年）
• HTML页面：Cache-Control: max-age=3600（1小时）
• 版本控制：?v=版本号 参数避免缓存冲突
图片优化
• 格式选择：优先WebP，JPEG/PNG备选
• 尺寸适配：响应式图片，按设备加载
• 懒加载：非首屏图片延迟加载
￼
🔒 安全配置
内容安全策略 (CSP)
通过 _headers 文件实施：
text
￼
复制
￼
￼
下载
￼
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' https://translate.google.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; img-src 'self' data: https: http:; font-src 'self' https://cdnjs.cloudflare.com; connect-src 'self'
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
￼
￼
HTTPS强制
• 全站HTTPS加密
• HSTS预加载列表
• 安全证书自动续期
表单保护
• CSRF令牌验证
• 输入数据清理
• 提交频率限制
￼
📊 分析与监控
集成分析
• Google Analytics：GA4测量ID G-JE15YSMC2W
• 自定义事件：追踪产品查看、PDF下载、WhatsApp咨询
• 性能监控：Core Web Vitals实时监控
数据收集
• 页面浏览量
• 用户交互行为
• 转化漏斗分析
• 设备与地域分布
￼
🌐 国际化支持
多语言功能
• 谷歌翻译：集成官方翻译API
• 语言检测：自动识别用户偏好
• 界面适配：布局支持RTL/LTR双向文本
区域适配
• 联系信息分区域显示
• 价格货币本地化
• 时区智能转换
￼
🤝 贡献指南
开发流程
1. Fork本仓库
2. 创建功能分支：git checkout -b feature/新功能
3. 提交更改：git commit -m '添加新功能描述'
4. 推送到分支：git push origin feature/新功能
5. 提交Pull Request
代码规范
• HTML：语义化标签，W3C标准验证
• CSS：Tailwind优先，自定义样式补充
• JavaScript：ES6+语法，模块化组织
• 提交信息：清晰描述，英文优先
测试要求
• 跨浏览器测试（Chrome, Firefox, Safari, Edge）
• 移动设备适配测试
• 性能基准测试
• SEO结构验证
￼
📄 许可证与版权
版权声明
© 2025 V5 Medical LTD。保留所有权利。
使用限制
未经V5 Medical LTD书面许可，禁止：
• 商业性复制、分发或修改
• 移除版权标识或水印
• 用于竞争性商业活动
• 反编译或逆向工程
开源组件
• Tailwind CSS - MIT License
• Font Awesome - SIL OFL 1.1 License
• Google Translate API - Terms of Service
￼
📞 技术支持
技术问题
• GitHub Issues：提交问题报告
• 技术邮箱：tech@v5md.com
• 响应时间：24小时内（工作日）
业务咨询
• 销售邮箱：sales@v5md.com
• WhatsApp：+44-078-9504-7944
• 官方网站：v5md.com
紧急联系
• 电话：+44-078-9504-7944（英国）
• 电话：+86-180-1266-9897（中国）
• 服务时间：周一至周五 9:00-18:00（GMT+8）
￼
最后更新：2025年12月
当前版本：v2.3.0
维护状态：🟢 活跃维护中
