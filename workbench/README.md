# V5 Medical 战时指挥台 V14.0 ERP Edition

> 供应链 · 财务 · 真实利润

## 🚀 快速开始

### 方式1: 本地测试
```bash
cd workbench/
python3 -m http.server 8000
# 访问 http://localhost:8000/
```

### 方式2: GitHub Pages部署
```bash
# 1. 将workbench目录上传到GitHub仓库
git add workbench/
git commit -m "V14.0 ERP Edition"
git push origin main

# 2. 启用GitHub Pages (Settings → Pages → Source: main branch)

# 3. 访问
https://your-username.github.io/repo-name/workbench/
```

---

## 📁 文件结构

```
workbench/
├── index.html                    # 主入口 (500行)
├── css/
│   └── workbench-v14.css        # 样式表 (532行)
└── js/
    ├── workbench-config.js      # 配置模块
    ├── workbench-storage.js     # 存储模块
    ├── workbench-dashboard.js   # 仪表盘模块
    ├── workbench-orders.js      # 订单模块
    ├── workbench-suppliers.js   # 供应商模块
    └── workbench-utils.js       # 工具函数
```

---

## 🔑 登录密码

生存模式铁幕密码:
- `cash2025`
- `override`

---

## ✨ 核心功能

### 1. 现金流仪表盘
- 营收、成本、毛利实时计算
- 净利润 = 毛利 - 运营支出
- 目标进度追踪

### 2. 订单管理 (看板)
- Quick Add / Full Add
- 8阶段看板 (Lead → Paid)
- 实时利润计算
- 订单编辑/删除

### 3. 供应商管理 🆕
- 供应商档案CRUD
- 证书管理 (CE, ISO)
- 历史采购记录

### 4. 客户档案
- 自动从订单提取
- 智能联想输入
- 交易历史

### 5. 运营支出
- 分类记录 (房租/差旅/招待)
- 月度/年度统计
- 客户关联 (ROI分析)

### 6. 红屏警戒 (Critical Mode)
- 72小时未进账触发
- 非核心功能自动隐藏
- 铁幕紧急通道 (60秒)

---

## 🔧 配置说明

### 修改目标金额
```javascript
// js/workbench-config.js
DEFAULT_TARGET: 5000000, // RMB
```

### 启用云端同步
```javascript
// js/workbench-storage.js
USE_CLOUD: true,
WORKER_URL: 'https://your-worker.workers.dev',
```

### 修改汇率
```javascript
// js/workbench-config.js
DEFAULT_EXCHANGE_RATE: 6.98,
```

---

## 🧪 测试场景

### 场景1: 录入Paid订单解除红屏
```
1. Quick Add
2. Customer: Test Corp
3. Status: Paid
4. Amount: $10,000
5. Cost: $7,000
6. 点击"创建订单"

预期:
✅ 红屏消失
✅ 毛利显示: ¥20,940 (30%)
✅ 所有模块恢复显示
```

### 场景2: 新增供应商
```
1. 点击"🏭 供应商"Tab
2. 点击"新增供应商"
3. 公司名称: Ningbo Medical
4. 主营产品: PGA Sutures
5. 证书: CE, ISO 13485
6. 保存

预期:
✅ 供应商列表更新
✅ 订单录入时可选择该供应商
```

---

## 📊 数据持久化

### LocalStorage Keys
```
v5_orders          # 订单数据
v5_customers       # 客户数据
v5_suppliers       # 供应商数据 🆕
v5_expenses        # 运营支出 🆕
v5_target          # 年度目标
v5_usd_rate        # 美元汇率
v5_feishu_webhook  # 飞书Webhook
v5_today_actions   # 今日行动
v5_worker_url      # Cloudflare Worker URL
v5_last_sync       # 上次同步时间
```

### 数据导出
```javascript
app.exportData();
// 下载: V5_Medical_V14.0_Backup_2025-01-02.json
```

### 数据导入
```javascript
// 在设置中选择备份文件导入
```

---

## 🐛 已修复的Bug

### 1. 生存模式解锁
- ✅ 解除红屏后，所有模块正常显示
- ✅ 单证工具、物流、时钟全部恢复

### 2. 供应商Tab
- ✅ 点击后正确显示供应商列表
- ✅ CSS隐藏逻辑修复

### 3. 利润计算
- ✅ 实时计算毛利和毛利率
- ✅ 负毛利红色警告

---

## 🔄 从V13.5升级

1. **备份数据**
```javascript
// 在V13.5中执行
app.exportData();
```

2. **部署V14.0**
```bash
# 上传workbench目录
```

3. **导入数据**
```javascript
// 在V14.0设置中导入备份
```

4. **验证**
- [ ] 订单正常
- [ ] 客户已提取
- [ ] 红屏逻辑正确
- [ ] 利润计算准确

---

## 📝 版本历史

### V14.0 ERP Edition (2025-01-02)
- ✅ 模块化重构 (单文件 → 7模块)
- ✅ 供应商管理
- ✅ 利润核算
- ✅ 运营支出
- ✅ Bug修复

### V13.5 CRM Strategic (2025-01-02)
- 客户档案
- 红屏修复
- 智能联想

### V13.4 Commander (2025-01-01)
- 订单编辑
- B2B月度指标
- 大单追踪

---

## 🆘 故障排除

### 问题1: 红屏无法解除
```javascript
// 检查控制台
[V14.0 CRITICAL] ========== RED LINE CHECK START ==========
// 查看详细日志
```

### 问题2: 供应商Tab空白
```javascript
// 检查控制台
[V14.0 Suppliers] suppliers-tab not found in DOM
// 确认HTML中存在 <div id="suppliers-tab">
```

### 问题3: 利润不显示
```javascript
// 检查订单是否有cost字段
console.log(order.cost, order.grossProfit);
```

---

## 📞 支持

- **文档**: [V14.0-REFACTORING-GUIDE.md](V14.0-REFACTORING-GUIDE.md)
- **验证脚本**: `bash verify.sh`
- **控制台**: 按F12查看详细日志

---

## 📄 许可证

Private - V5 Medical Internal Use Only

---

**V14.0 ERP Edition - 从销售追踪到全链路财务管理！** 🏭💰📊
