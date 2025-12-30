/**
 * V5 Medical Workbench - Pricing Module
 * 智能报价计算与利润分析
 * @version 2.0.0
 */

class WorkbenchPricing {
    constructor() {
        this.config = window.WorkbenchConfig;
        this.currentRate = 7.25;
    }

    /**
     * 初始化报价模块
     */
    async init() {
        this.loadSavedRate();
        await this.render();
        this.bindCalculator();
    }

    /**
     * 加载保存的汇率
     */
    loadSavedRate() {
        const saved = localStorage.getItem('v5_usd_rate');
        if (saved) {
            this.currentRate = parseFloat(saved);
        }
    }

    /**
     * 渲染报价界面
     */
    async render() {
        const container = document.getElementById('workbench-content');
        if (!container) return;

        container.innerHTML = `
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-slate-800 mb-2">智能报价核算</h2>
                <p class="text-sm text-slate-500">FOB/CIF 价格计算 + 退税核算 + 利润分析</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- 主计算器 -->
                <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                        <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
                            <i class="fas fa-calculator text-blue-600"></i> FOB/CIF 计算器
                        </h3>
                        <div class="flex gap-2">
                            <button onclick="window.V5Workbench.pricing.saveRate()" class="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition font-bold">
                                <i class="fas fa-save mr-1"></i> 保存汇率
                            </button>
                            <button onclick="window.V5Workbench.pricing.resetCalculator()" class="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition font-bold">
                                <i class="fas fa-redo mr-1"></i> 重置
                            </button>
                        </div>
                    </div>

                    <!-- 基础参数输入 -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">工厂含税价 (CNY)</label>
                            <input type="number" id="calc-cost" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="100.00" step="0.01">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">当前汇率 (USD)</label>
                            <input type="number" id="calc-rate" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" value="${this.currentRate}" step="0.01">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">退税率 (%)</label>
                            <input type="number" id="calc-rebate" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" value="${this.config.WORKBENCH.PRICING.DEFAULT_REBATE}" min="0" max="20">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">目标利润率 (%)</label>
                            <input type="number" id="calc-margin" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" value="${this.config.WORKBENCH.PRICING.DEFAULT_MARGIN}" min="0" max="100">
                        </div>
                    </div>

                    <!-- 高级参数 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">国内杂费 (CNY)</label>
                            <input type="number" id="calc-extra" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" value="0" step="0.01">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">贸易条款</label>
                            <select id="trade-term" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" onchange="window.V5Workbench.pricing.toggleFreightField()">
                                <option value="FOB">FOB</option>
                                <option value="CIF">CIF</option>
                                <option value="EXW">EXW</option>
                            </select>
                        </div>
                        <div id="freight-field" class="hidden">
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1.5">海运费 (USD)</label>
                            <input type="number" id="calc-freight" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" value="0" step="0.01">
                        </div>
                    </div>

                    <!-- 计算按钮 -->
                    <button onclick="window.V5Workbench.pricing.calculate()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-md flex items-center justify-center gap-2">
                        <i class="fas fa-search-dollar"></i> 立即计算报价 & 利润
                    </button>

                    <!-- 结果展示 -->
                    <div id="pricing-result" class="hidden mt-6 p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">建议报价 (USD)</div>
                                <div class="text-4xl font-black text-blue-600 mb-1" id="res-price">$0.00</div>
                                <div class="text-xs text-slate-400" id="price-note">FOB Shanghai</div>
                            </div>
                            <div class="border-l border-slate-200 pl-6 space-y-3">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-slate-600">退税收入:</span>
                                    <span id="res-tax" class="font-bold text-green-600 text-lg">¥0.00</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-slate-600">净利润:</span>
                                    <span id="res-profit" class="font-bold text-blue-600 text-lg">¥0.00</span>
                                </div>
                                <div class="flex justify-between items-center pt-3 border-t border-slate-100">
                                    <span class="text-xs text-slate-500">实际利润率:</span>
                                    <span id="profit-margin" class="font-bold text-slate-700">0%</span>
                                </div>
                            </div>
                        </div>

                        <!-- 详细分解 -->
                        <div class="mt-6 pt-6 border-t border-slate-200">
                            <h4 class="text-xs font-bold text-slate-500 uppercase mb-3">成本拆解 (Cost Breakdown)</h4>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                <div class="bg-white rounded-lg p-3 border border-slate-100">
                                    <div class="text-slate-500 mb-1">不含税价</div>
                                    <div class="font-bold text-slate-800" id="cost-base">¥0.00</div>
                                </div>
                                <div class="bg-white rounded-lg p-3 border border-slate-100">
                                    <div class="text-slate-500 mb-1">增值税</div>
                                    <div class="font-bold text-slate-800" id="cost-vat">¥0.00</div>
                                </div>
                                <div class="bg-white rounded-lg p-3 border border-slate-100">
                                    <div class="text-slate-500 mb-1">退税收入</div>
                                    <div class="font-bold text-green-600" id="cost-rebate">¥0.00</div>
                                </div>
                                <div class="bg-white rounded-lg p-3 border border-slate-100">
                                    <div class="text-slate-500 mb-1">实际成本</div>
                                    <div class="font-bold text-red-600" id="cost-real">¥0.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 右侧工具 -->
                <div class="space-y-6">
                    <!-- 汇率查询 -->
                    <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <i class="fas fa-chart-line text-red-600"></i> 官方汇率查询
                        </h3>
                        <div class="space-y-3">
                            <a href="https://www.boc.cn/sourcedb/whpj/" target="_blank" class="flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg border border-red-100 transition">
                                <i class="fas fa-university text-xl"></i>
                                <div>
                                    <div class="font-bold text-sm">中国银行</div>
                                    <div class="text-[10px] opacity-70">权威汇率参考</div>
                                </div>
                            </a>
                            <a href="https://finance.sina.com.cn/forex/" target="_blank" class="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-100 transition">
                                <i class="fas fa-globe text-xl"></i>
                                <div>
                                    <div class="font-bold text-sm">新浪财经</div>
                                    <div class="text-[10px] opacity-70">实时汇率走势</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <!-- 快速预估 -->
                    <div class="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-sm border border-purple-200 p-6">
                        <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <i class="fas fa-bolt text-yellow-500"></i> 快速预估器
                        </h3>
                        <div class="space-y-3">
                            <div>
                                <label class="block text-xs font-bold text-slate-600 mb-1.5">含税价 (CNY)</label>
                                <input type="number" id="quick-cost" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="100.00">
                            </div>
                            <button onclick="window.V5Workbench.pricing.quickEstimate()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg transition text-sm">
                                快速估价 (标准20%利润)
                            </button>
                            <div id="quick-result" class="hidden mt-3 p-3 bg-white rounded-lg border border-purple-200">
                                <div class="text-xs text-slate-500 mb-1">预估 FOB 报价:</div>
                                <div class="text-2xl font-black text-purple-600" id="quick-price">$0.00</div>
                            </div>
                        </div>
                    </div>

                    <!-- 常用公式 -->
                    <div class="bg-slate-50 rounded-xl border border-slate-200 p-6">
                        <h4 class="text-xs font-bold text-slate-500 uppercase mb-3">核算公式</h4>
                        <div class="space-y-2 text-xs text-slate-600 font-mono">
                            <div>不含税价 = 含税价 ÷ 1.13</div>
                            <div>退税额 = 不含税价 × 退税率</div>
                            <div>实际成本 = 含税价 - 退税额</div>
                            <div class="text-blue-600 font-bold">FOB = 实际成本 ÷ (1-利润率) ÷ 汇率</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 切换海运费字段
     */
    toggleFreightField() {
        const term = document.getElementById('trade-term').value;
        const field = document.getElementById('freight-field');
        
        if (term === 'CIF') {
            field.classList.remove('hidden');
        } else {
            field.classList.add('hidden');
        }
    }

    /**
     * 主计算逻辑
     */
    calculate() {
        const cost = parseFloat(document.getElementById('calc-cost').value) || 0;
        const rate = parseFloat(document.getElementById('calc-rate').value) || 0;
        const rebate = parseFloat(document.getElementById('calc-rebate').value) || 0;
        const margin = parseFloat(document.getElementById('calc-margin').value) || 0;
        const extra = parseFloat(document.getElementById('calc-extra').value) || 0;
        const term = document.getElementById('trade-term').value;
        const freight = parseFloat(document.getElementById('calc-freight').value) || 0;

        if (cost <= 0 || rate <= 0) {
            window.WorkbenchUtils.toast.error('请输入有效的工厂价和汇率');
            return;
        }

        // 计算过程
        const vatRate = this.config.WORKBENCH.PRICING.VAT_RATE / 100;
        const costBase = cost / (1 + vatRate); // 不含税价
        const vat = cost - costBase; // 增值税
        const taxRefund = costBase * (rebate / 100); // 退税收入
        const realCost = cost - taxRefund + extra; // 实际成本

        let fobPrice = (realCost / (1 - margin / 100)) / rate;
        
        let finalPrice = fobPrice;
        let priceTerm = term;

        if (term === 'CIF' && freight > 0) {
            finalPrice = fobPrice + freight;
            priceTerm = 'CIF';
        } else if (term === 'EXW') {
            finalPrice = fobPrice * 0.95; // EXW 约为 FOB 的 95%
            priceTerm = 'EXW Kunshan';
        }

        const profitRMB = (fobPrice * rate) - realCost;
        const actualMargin = (profitRMB / realCost) * 100;

        // 显示结果
        document.getElementById('res-price').textContent = '$' + finalPrice.toFixed(2);
        document.getElementById('price-note').textContent = priceTerm;
        document.getElementById('res-tax').textContent = '¥' + taxRefund.toFixed(2);
        document.getElementById('res-profit').textContent = '¥' + profitRMB.toFixed(2);
        document.getElementById('profit-margin').textContent = actualMargin.toFixed(1) + '%';

        // 成本拆解
        document.getElementById('cost-base').textContent = '¥' + costBase.toFixed(2);
        document.getElementById('cost-vat').textContent = '¥' + vat.toFixed(2);
        document.getElementById('cost-rebate').textContent = '¥' + taxRefund.toFixed(2);
        document.getElementById('cost-real').textContent = '¥' + realCost.toFixed(2);

        document.getElementById('pricing-result').classList.remove('hidden');
        
        window.WorkbenchUtils.toast.success('计算完成！');
    }

    /**
     * 快速预估
     */
    quickEstimate() {
        const cost = parseFloat(document.getElementById('quick-cost').value) || 0;
        
        if (cost <= 0) {
            window.WorkbenchUtils.toast.error('请输入有效金额');
            return;
        }

        // 使用标准参数快速计算
        const rate = this.currentRate;
        const rebate = 13;
        const margin = 20;

        const costBase = cost / 1.13;
        const taxRefund = costBase * 0.13;
        const realCost = cost - taxRefund;
        const fobPrice = (realCost / 0.8) / rate;

        document.getElementById('quick-price').textContent = '$' + fobPrice.toFixed(2);
        document.getElementById('quick-result').classList.remove('hidden');
        
        window.WorkbenchUtils.toast.success('快速估价完成');
    }

    /**
     * 保存汇率
     */
    saveRate() {
        const rate = parseFloat(document.getElementById('calc-rate').value);
        
        if (rate && rate > 0) {
            this.currentRate = rate;
            localStorage.setItem('v5_usd_rate', rate.toString());
            window.WorkbenchUtils.toast.success('汇率已保存: ' + rate);
        }
    }

    /**
     * 重置计算器
     */
    resetCalculator() {
        document.getElementById('calc-cost').value = '';
        document.getElementById('calc-extra').value = '0';
        document.getElementById('calc-freight').value = '0';
        document.getElementById('pricing-result').classList.add('hidden');
        document.getElementById('quick-cost').value = '';
        document.getElementById('quick-result').classList.add('hidden');
        
        window.WorkbenchUtils.toast.info('已重置');
    }

    /**
     * 绑定计算器事件
     */
    bindCalculator() {
        // Enter 键触发计算
        const inputs = ['calc-cost', 'calc-rate', 'calc-rebate', 'calc-margin'];
        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.calculate();
                    }
                });
            }
        });
    }
}

window.WorkbenchPricing = WorkbenchPricing;
