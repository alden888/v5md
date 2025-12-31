/**
 * V5 Medical Workbench - Finance Module
 * 财务与对账工具
 * @version 2.0.0
 */

class WorkbenchFinance {
    constructor() {
        this.config = window.WorkbenchConfig;
    }

    /**
     * 初始化财务模块
     */
    async init() {
        await this.render();
        this.bindEvents();
    }

    /**
     * 渲染财务界面
     */
    async render() {
        const container = document.getElementById('workbench-content');
        if (!container) return;

        container.innerHTML = `
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                    <i class="fas fa-university text-red-600"></i> 财务与对账工具
                </h2>
                <p class="text-sm text-slate-500">XTransfer 结汇 | 金额大写 | 银行信息</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <!-- XTransfer 收款信息 -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                        <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
                            <i class="fas fa-exchange-alt text-red-600"></i> XTransfer 结汇账户
                        </h3>
                        <a href="https://www.xtransfer.cn/" target="_blank" class="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition font-bold">
                            <i class="fas fa-external-link-alt mr-1"></i> 登录后台
                        </a>
                    </div>

                    <div class="space-y-4">
                        <!-- JPMorgan 账户 -->
                        <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg relative group">
                            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                                <button onclick="window.V5Workbench.finance.copyBankInfo('xtransfer')" class="text-xs bg-white border border-slate-300 px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-600">
                                    <i class="fas fa-copy mr-1"></i> 复制
                                </button>
                            </div>

                            <div class="flex items-center gap-2 mb-3">
                                <i class="fas fa-building text-red-600"></i>
                                <h4 class="font-bold text-sm text-slate-800">JPMorgan Chase (Hong Kong)</h4>
                            </div>

                            <div id="xtransfer-info" class="space-y-1.5 font-mono text-xs text-slate-700">
                                <p><span class="text-slate-400 font-sans">Beneficiary:</span> ${this.config.WORKBENCH.FINANCE.XTRANSFER.BENEFICIARY}</p>
                                <p><span class="text-slate-400 font-sans">Bank:</span> ${this.config.WORKBENCH.FINANCE.XTRANSFER.BANK}</p>
                                <p><span class="text-slate-400 font-sans">Account:</span> ${this.config.WORKBENCH.FINANCE.XTRANSFER.ACCOUNT}</p>
                                <p><span class="text-slate-400 font-sans">SWIFT:</span> ${this.config.WORKBENCH.FINANCE.XTRANSFER.SWIFT}</p>
                                <p><span class="text-slate-400 font-sans">Address:</span> ${this.config.WORKBENCH.FINANCE.XTRANSFER.ADDRESS}</p>
                            </div>
                        </div>

                        <!-- 工行账户 -->
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg relative group">
                            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                                <button onclick="window.V5Workbench.finance.copyBankInfo('icbc')" class="text-xs bg-white border border-slate-300 px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-600">
                                    <i class="fas fa-copy mr-1"></i> 复制
                                </button>
                            </div>

                            <div class="flex items-center gap-2 mb-3">
                                <i class="fas fa-university text-blue-600"></i>
                                <h4 class="font-bold text-sm text-slate-800">中国建设银行 (USD)</h4>
                            </div>

                            <div id="icbc-info" class="space-y-1.5 font-mono text-xs text-slate-700">
                                <p><span class="text-slate-400 font-sans">Beneficiary:</span> ${this.config.WORKBENCH.FINANCE.BANK.BENEFICIARY}</p>
                                <p><span class="text-slate-400 font-sans">Bank:</span> ${this.config.WORKBENCH.FINANCE.BANK.BANK_NAME}</p>
                                <p><span class="text-slate-400 font-sans">Account (USD):</span> ${this.config.WORKBENCH.FINANCE.BANK.ACCOUNT_USD}</p>
                                <p><span class="text-slate-400 font-sans">SWIFT:</span> ${this.config.WORKBENCH.FINANCE.BANK.SWIFT}</p>
                                <p><span class="text-slate-400 font-sans">Address:</span> ${this.config.WORKBENCH.FINANCE.BANK.ADDRESS}</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 text-xs text-slate-400 bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                            <i class="fas fa-shield-alt text-yellow-600"></i>
                            <span>大额转账请务必电话核实 SWIFT Code</span>
                        </div>
                    </div>
                </div>

                <!-- 金额转大写 -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div class="mb-4 pb-3 border-b border-slate-100">
                        <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
                            <i class="fas fa-font text-purple-600"></i> 金额转大写
                        </h3>
                    </div>

                    <!-- 英文 -->
                    <div class="mb-6">
                        <label class="block text-sm font-bold text-slate-700 mb-2">English (For PI)</label>
                        <div class="flex gap-2 mb-3">
                            <input type="number" id="amount-en" class="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm" placeholder="1234.50" oninput="window.V5Workbench.finance.convertToEnglish()">
                            <select id="currency-en" class="w-28 px-3 py-2 border border-slate-300 rounded-lg text-sm" onchange="window.V5Workbench.finance.convertToEnglish()">
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-lg border border-purple-200 min-h-[80px] flex items-center">
                            <p id="amount-en-text" class="text-sm font-mono text-purple-900">SAY TOTAL...</p>
                        </div>
                        <button onclick="window.V5Workbench.finance.copyAmountText('en')" class="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition text-sm">
                            <i class="fas fa-copy mr-1"></i> 复制
                        </button>
                    </div>

                    <!-- 中文 -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 mb-2">中文 (For RMB)</label>
                        <input type="number" id="amount-cn" class="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm mb-3" placeholder="1234.50" oninput="window.V5Workbench.finance.convertToChinese()">
                        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 min-h-[60px] flex items-center">
                            <p id="amount-cn-text" class="text-sm font-bold text-blue-900">人民币...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 复制银行信息
     */
    copyBankInfo(type) {
        const text = document.getElementById(`${type}-info`).innerText;
        window.WorkbenchUtils.copyToClipboard(text);
    }

    /**
     * 英文金额转换
     */
    convertToEnglish() {
        const amount = parseFloat(document.getElementById('amount-en').value) || 0;
        const currency = document.getElementById('currency-en').value;
        
        const result = window.WorkbenchUtils.numberToEnglishWords(amount, currency);
        document.getElementById('amount-en-text').textContent = result;
    }

    /**
     * 中文金额转换
     */
    convertToChinese() {
        const amount = parseFloat(document.getElementById('amount-cn').value) || 0;
        const result = window.WorkbenchUtils.numberToChinese(amount);
        document.getElementById('amount-cn-text').textContent = result;
    }

    /**
     * 复制金额文本
     */
    copyAmountText(type) {
        const elementId = type === 'en' ? 'amount-en-text' : 'amount-cn-text';
        const text = document.getElementById(elementId).textContent;
        window.WorkbenchUtils.copyToClipboard(text);
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // Enter 键触发
    }
}

window.WorkbenchFinance = WorkbenchFinance;
