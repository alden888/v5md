# V5 Medical 战时指挥台 V14.2 PRO - 部署指南

## 📦 目录结构

```
workbench/
├── index.html              # 主页面（优化版）
├── _headers                # Cloudflare Pages HTTP 头配置
├── _redirects              # Cloudflare Pages 重定向配置
├── css/
│   └── workbench-v14.css  # 样式文件
└── js/
    ├── workbench-app.js        # 主应用入口
    ├── workbench-config.js     # 配置模块
    ├── workbench-utils.js      # 工具模块
    ├── workbench-modal.js      # 模态框模块
    ├── workbench-state.js      # 状态管理
    ├── workbench-storage.js    # 存储模块
    ├── workbench-auth.js       # 认证模块
    ├── workbench-firebase.js   # Firebase 集成
    ├── workbench-dashboard.js  # 仪表盘
    ├── workbench-orders.js     # 订单管理
    ├── workbench-suppliers.js  # 供应商管理
    ├── workbench-finance.js    # 财务模块
    ├── workbench-expenses.js   # 运营支出
    └── workbench-crm.js        # 客户关系管理
```

## 🚀 Cloudflare Pages 部署步骤

### 方法一：通过 GitHub 自动部署（推荐）

1. **将代码推送到 GitHub**
   ```bash
   git add .
   git commit -m "优化 Cloudflare Pages 部署"
   git push origin main
   ```

2. **在 Cloudflare Pages 创建项目**
   - 登录 Cloudflare Dashboard
   - 进入 Pages
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 授权并选择您的仓库

3. **配置构建设置**
   ```
   Build command: (留空)
   Build output directory: workbench
   Root directory: /
   ```

4. **环境变量**（如果需要）
   ```
   NODE_ENV=production
   ```

5. **保存并部署**
   - 点击 "Save and Deploy"
   - 等待部署完成

### 方法二：直接上传部署

1. 在 Cloudflare Pages 选择 "Upload assets"
2. 将 `workbench` 文件夹打包为 ZIP
3. 上传 ZIP 文件
4. 等待部署完成

## 🔧 关键修复说明

### 1. **路径修复**
所有 JS 和 CSS 引用改为相对路径：
```html
<!-- 修复前 -->
<script src="js/workbench-config.js"></script>

<!-- 修复后 -->
<script src="./js/workbench-config.js"></script>
```

### 2. **模块加载顺序**
严格按依赖顺序加载模块，避免 `undefined` 错误：
```
Config → Utils → Modal → State → Storage → Auth → Firebase → 业务模块
```

### 3. **错误处理**
- 添加了 `onerror` 处理器
- 显示加载失败的详细信息
- 提供重新加载按钮

### 4. **MIME 类型配置**
通过 `_headers` 文件确保 Cloudflare 正确识别文件类型：
```
/js/*.js
  Content-Type: application/javascript; charset=utf-8
```

## 🐛 常见问题排查

### 问题：JS 文件显示空白

**原因**：
- MIME 类型错误
- 文件路径不对
- 模块加载顺序错误

**解决方案**：
1. 检查浏览器控制台错误信息
2. 确认 `_headers` 文件已正确部署
3. 清除 Cloudflare 缓存
4. 检查文件大小写（Linux 区分大小写）

### 问题：页面显示但功能不工作

**原因**：
- JavaScript 执行错误
- Firebase 未正确初始化
- localStorage 被禁用

**解决方案**：
1. 打开浏览器控制台查看错误
2. 检查 `workbench-config.js` 中的 Firebase 配置
3. 确保浏览器允许 localStorage

### 问题：404 错误

**原因**：
- 部署目录配置错误
- `_redirects` 文件未生效

**解决方案**：
1. 确认 Cloudflare Pages 的 "Root directory" 设置正确
2. 检查 `_redirects` 文件是否在根目录
3. 重新部署项目

## 🔍 调试技巧

### 1. 浏览器控制台
打开开发者工具（F12），查看：
- Console：JavaScript 错误
- Network：文件加载状态
- Application：localStorage 数据

### 2. Cloudflare 日志
在 Cloudflare Pages 项目中：
- 查看 "Deployments" 部署日志
- 检查 "Functions" 函数日志（如果使用）

### 3. 本地测试
使用简单的 HTTP 服务器测试：
```bash
# Python 3
python -m http.server 8000

# Node.js (需要安装 http-server)
npx http-server -p 8000
```

访问 `http://localhost:8000/workbench/`

## 📱 访问地址

部署成功后，访问地址：
- Cloudflare Pages: `https://your-project.pages.dev/workbench/`
- 自定义域名: `https://v5md.com/workbench/`

## ☁️ Firebase 云同步配置

Firebase 配置在 `js/workbench-firebase.js` 中：

```javascript
const DEFAULT_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.firebasestorage.app",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdefg"
};
```

## 🎯 性能优化

1. **CDN 缓存**
   - Cloudflare 自动优化静态资源
   - 使用 `_headers` 配置缓存策略

2. **资源预加载**
   - 关键 CSS 内联
   - 使用 `rel="preconnect"` 预连接外部资源

3. **延迟加载**
   - 非关键模块延迟初始化
   - 按需加载业务模块

## 📞 技术支持

如遇问题，请检查：
1. GitHub Issues
2. Cloudflare 社区论坛
3. Firebase 官方文档

---

**版本**: V14.2 PRO ERP EDITION  
**最后更新**: 2026-01-10  
**维护者**: V5 Medical 技术团队
