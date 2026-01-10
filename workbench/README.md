# V14.2 PRO Workbench - Cloudflare Pages 修复指南

## 问题诊断

根据您的截图分析，问题在于：

### 1. `_headers` 路径不匹配
**原来的配置：**
```
/js/*.js
  Content-Type: application/javascript
```

**问题：** 这个路径匹配的是网站根目录的 `/js/`，而不是 `/workbench/js/`

### 2. `_redirects` 规则太激进
**原来的配置：**
```
/* /index.html 200
```

**问题：** 这可能干扰静态资源的加载

### 3. 脚本使用相对路径
**原来的引用：**
```html
<script src="js/workbench-config.js"></script>
```

**问题：** 在某些情况下可能解析错误

---

## 修复内容

### 文件 1: `_headers`
- 修改所有路径为 `/workbench/...` 格式
- 添加正确的 Content-Type 和安全头

### 文件 2: `_redirects`  
- 添加静态资源的显式规则
- 限制 SPA 重定向范围

### 文件 3: `index.html`
- 所有脚本引用改为绝对路径 `/workbench/js/...`
- CSS 引用改为绝对路径 `/workbench/css/...`
- 添加更详细的错误提示

### 文件 4: `diagnostic.html`
- 添加模块加载脚本（使用绝对路径）
- 增强诊断功能

---

## 部署步骤

### 方法 1：直接更新文件（推荐）

1. 将以下修复后的文件上传到您的 GitHub 仓库 `workbench/` 目录：
   - `_headers`
   - `_redirects`
   - `index.html`
   - `diagnostic.html`

2. 推送到 GitHub：
   ```bash
   git add .
   git commit -m "修复 Cloudflare Pages 路径问题"
   git push origin main
   ```

3. Cloudflare Pages 会自动重新部署

4. 等待部署完成后访问：
   - https://v5md.com/workbench/
   - https://v5md.com/workbench/diagnostic.html

---

## 可选：方案 B - 创建独立项目

如果修复后仍有问题，可以为 workbench 创建独立的 Cloudflare Pages 项目：

1. 在 Cloudflare Dashboard 创建新的 Pages 项目
2. 连接同一个 GitHub 仓库
3. 设置构建配置：
   - **构建输出目录：** `workbench`
   - **根目录：** `workbench`
4. 绑定子域名：`erp.v5md.com` 或 `workbench.v5md.com`

这样 workbench 就会作为独立站点部署，`_headers` 和 `_redirects` 就会正确生效。

---

## 关键修改对比

| 项目 | 修改前 | 修改后 |
|------|--------|--------|
| _headers 路径 | `/js/*.js` | `/workbench/js/*` |
| _redirects | `/* /index.html 200` | 添加静态资源例外 |
| script src | `js/xxx.js` | `/workbench/js/xxx.js` |
| CSS href | `css/xxx.css` | `/workbench/css/xxx.css` |

---

## 验证方法

部署后，按顺序检查：

1. **直接访问 JS 文件：**
   https://v5md.com/workbench/js/workbench-config.js
   - 应该显示 JavaScript 代码
   - 检查响应头 Content-Type 是否为 `application/javascript`

2. **访问诊断页面：**
   https://v5md.com/workbench/diagnostic.html
   - 所有模块应该显示 ✅

3. **访问主页：**
   https://v5md.com/workbench/
   - 不应该卡在"系统初始化中"

---

如有问题，请检查浏览器控制台（F12）的 Network 标签，查看是否有 404 或 MIME 类型错误。
