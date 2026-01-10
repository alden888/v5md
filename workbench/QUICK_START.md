# 🚀 V5 Medical 战时指挥台 - 快速开始

## ⚡ 5分钟部署指南

### 步骤 1：准备文件

确保您的 GitHub 仓库中有以下结构：

```
your-repo/
└── workbench/
    ├── index.html
    ├── _headers
    ├── _redirects
    ├── diagnostic.html
    ├── css/
    │   └── workbench-v14.css
    └── js/
        ├── workbench-app.js
        ├── workbench-config.js
        ├── workbench-utils.js
        ├── (其他 JS 文件...)
```

### 步骤 2：推送到 GitHub

```bash
cd your-repo
git add .
git commit -m "部署 V14.2 PRO 优化版"
git push origin main
```

### 步骤 3：Cloudflare Pages 配置

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Pages**
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 授权并选择您的仓库
6. 配置构建设置：
   ```
   Build command: (留空)
   Build output directory: workbench
   Root directory: /
   ```
7. 点击 **Save and Deploy**

### 步骤 4：验证部署

访问以下地址验证：

1. **诊断页面**（先访问这个）:
   ```
   https://your-project.pages.dev/workbench/diagnostic.html
   ```

2. **主应用**（诊断通过后）:
   ```
   https://your-project.pages.dev/workbench/
   ```

## ✅ 部署检查清单

- [ ] 所有 JS 文件都在 `js/` 文件夹中
- [ ] 所有 CSS 文件都在 `css/` 文件夹中
- [ ] `_headers` 文件在 `workbench/` 根目录
- [ ] `_redirects` 文件在 `workbench/` 根目录
- [ ] Firebase 配置已更新（如需云同步）
- [ ] 访问 diagnostic.html 显示全绿 ✅

## 🔧 常见问题快速修复

### 问题 1: JS 文件 404 错误

**症状**: 浏览器控制台显示 `GET .../js/workbench-xxx.js 404`

**解决**:
```bash
# 检查文件是否存在
ls -la workbench/js/

# 确保文件路径正确（注意大小写）
# Linux 系统区分大小写！
```

### 问题 2: 页面空白

**症状**: 打开页面后一片空白

**解决**:
1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签页的错误信息
3. 访问 diagnostic.html 查看详细诊断

### 问题 3: 模块未定义

**症状**: 控制台显示 `WorkbenchXXX is not defined`

**解决**:
1. 检查 index.html 中的 script 标签顺序
2. 确保所有 JS 文件都正确加载
3. 清除浏览器缓存后重试

## 🎯 优化建议

### 1. 启用自定义域名

在 Cloudflare Pages 项目设置中：
- 进入 **Custom domains**
- 添加您的域名（如 `v5md.com`）
- 等待 DNS 验证完成

### 2. 配置 Firebase

编辑 `js/workbench-firebase.js`：

```javascript
const DEFAULT_CONFIG = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.firebasestorage.app",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdefg"
};
```

### 3. 性能监控

安装 Cloudflare Analytics:
- 进入项目 **Analytics** 标签
- 查看访问量、性能指标
- 监控错误日志

## 📞 获取帮助

### 1. 系统诊断

访问: `https://your-domain.com/workbench/diagnostic.html`

### 2. 浏览器控制台

按 `F12` 打开开发者工具，查看：
- **Console**: JavaScript 错误
- **Network**: 文件加载状态
- **Application**: localStorage 数据

### 3. Cloudflare 日志

在 Cloudflare Pages 项目中：
- 查看 **Deployments** 的构建日志
- 检查 **Functions** 的运行日志

## 🎉 部署成功！

恭喜！您的 V5 Medical 战时指挥台已成功部署。

**下一步**:
1. 登录系统（首次使用需设置"今日三件事"）
2. 添加供应商、客户信息
3. 开始记录订单和财务数据
4. 启用 Firebase 云同步（可选）

---

**需要更多帮助？** 查看完整的 [DEPLOYMENT_README.md](./DEPLOYMENT_README.md)
