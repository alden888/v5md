<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>V5 Medical 工作台 - 财务与对账</title>
    <meta name="robots" content="noindex, nofollow">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#1e40af',
                        xtransfer: '#f64d2a'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-slate-50">

<div class="max-w-7xl mx-auto p-6">
    <!-- 页头 -->
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <i class="fas fa-university text-xtransfer"></i> 财务与对账工具
        </h1>
        <p class="text-sm text-slate-500">Financial Tools - XTransfer 结汇 | 金额大写 | 银行信息</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- 1. XTransfer 收款信息 -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <i class="fas fa-exchange-alt text-xtransfer"></i> XTransfer 结汇账户
                </h3>
                <a href="https://www.xtransfer.cn/" target="_blank" class="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition font-bold">
                    <i class="fas fa-external-link-alt mr-1"></i> 登录后台
                </a>
            </div>

            <div class="space-y-4">
                <!-- JPMorgan 账户 -->
                <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg relative group">
                    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                        <button onclick="copyBankInfo('xtransfer')" class="text-xs bg-white border border-slate-300 px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-600">
                            <i class="fas fa-copy mr-1"></i> 复制
                        </button>
                    </div>

                    <div class="flex items-center gap-2 mb-3">
                        <i class="fas fa-building text-xtransfer"></i>
                        <h4 class="font-bold text-sm text-slate-800">JPMorgan Chase (Hong Kong)</h4>
                    </div>

                    <div id="xtransfer-info" class="space-y-1.5 font-mono text-xs text-slate-700">
                        <p><span class="text-slate-400 font-sans">Beneficiary:</span> Kunshan Vvohoo Industry Co., Ltd</p>
                        <p><span class="text-slate-400 font-sans">Bank Name:</span> JPMorgan Chase Bank N.A., Hong Kong Branch</p>
                        <p><span class="text-slate-400 font-sans">Account:</span> 63007935038</p>
                        <p><span class="text-slate-400 font-sans">SWIFT:</span> CHASHKHH</p>
                        <p><span class="text-slate-400 font-sans">Address:</span> 18/F, 20/F, 22-29/F, CHATER HOUSE, 8 CONNAUGHT ROAD CENTRAL, HONG KONG</p>
                    </div>
                </div>

                <!-- 工商银行账户 (USD) -->
                <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg relative group">
                    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                        <button onclick="copyBankInfo('icbc')" class="text-xs bg-white border border-slate-300 px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-600">
                            <i class="fas fa-copy mr-1"></i> 复制
                        </button>
                    </div>

                    <div class="flex items-center gap-2 mb-3">
                        <i class="fas fa-university text-blue-600"></i>
                        <h4 class="font-bold text-sm text-slate-800">中国工商银行 (USD)</h4>
                    </div>

                    <div id="icbc-info" class="space-y-1.5 font-mono text-xs text-slate-700">
                        <p><span class="text-slate-400 font-sans">Beneficiary:</span> SUZHOU V5 MEDICAL TECHNOLOGY CO., LTD.</p>
                        <p><span class="text-slate-400 font-sans">Bank:</span> CHINA CONSTRUCTION BANK CORP SUZHOU BRANCH</p>
                        <p><span class="text-slate-400 font-sans">Account (USD):</span> 32250198643609850772</p>
                        <p><span class="text-slate-400 font-sans">SWIFT:</span> PCBCCNBJJSS</p>
                        <p><span class="text-slate-400 font-sans">Address:</span> NO 180 QIANJIN MID-ROAD KUNSHAN CITY JIANGSU PROVINCE CHINA</p>
                    </div>
                </div>

                <div class="flex items-center gap-2 text-xs text-slate-400 bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                    <i class="fas fa-shield-alt text-yellow-600"></i>
                    <span>大额转账请务必电话核实 SWIFT Code，防止诈骗</span>
                </div>
            </div>
        </div>

        <!-- 2. 金额转大写工具 -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div class="mb-4 pb-3 border-b border-slate-100">
                <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <i class="fas fa-font text-purple-600"></i> 金额转大写
                </h3>
                <p class="text-xs text-slate-500 mt-1">Amount to Words - 用于 PI 和正式文件</p>
            </div>

            <!-- 英文大写 -->
            <div class="mb-6">
                <label class="block text-sm font-bold text-slate-700 mb-2">English (For PI)</label>
                <div class="flex gap-2 mb-3">
                    <input type="number" id="amount-en" class="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm" placeholder="1234.50" oninput="convertToEnglish()" step="0.01">
                    <select id="currency-en" class="w-28 px-3 py-2 border border-slate-300 rounded-lg text-sm" onchange="convertToEnglish()">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg border border-purple-200 min-h-[80px] flex items-center">
                    <p id="amount-en-text" class="text-sm font-mono text-purple-900 break-words w-full">
                        SAY TOTAL US DOLLARS...
                    </p>
                </div>
                <button onclick="copyText('amount-en-text')" class="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition text-sm">
                    <i class="fas fa-copy mr-1"></i> 复制到剪贴板
                </button>
            </div>

            <!-- 中文大写 -->
            <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">中文 (For RMB)</label>
                <div class="flex gap-2 mb-3">
                    <input type="number" id="amount-cn" class="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm" placeholder="1234.50" oninput="convertToChinese()" step="0.01">
                    <div class="w-28 px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm font-bold text-center flex items-center justify-center">
                        CNY
                    </div>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 min-h-[60px] flex items-center">
                    <p id="amount-cn-text" class="text-sm font-bold text-blue-900 w-full">
                        人民币壹仟贰佰叁拾肆元伍角整
                    </p>
                </div>
            </div>
        </div>

        <!-- 3. 医疗换算工具 -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div class="mb-4 pb-3 border-b border-slate-100">
                <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <i class="fas fa-ruler text-green-600"></i> 医疗单位换算
                </h3>
            </div>

            <div class="space-y-6">
                <!-- Fr/Ch ⇋ mm -->
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">导管尺寸 (Catheter Fr/Ch ⇋ mm)</label>
                    <div class="flex items-center gap-3">
                        <input type="number" id="conv-fr" class="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-center text-sm" placeholder="Fr" oninput="convertMedical('fr')" step="0.1">
                        <i class="fas fa-exchange-alt text-slate-300"></i>
                        <input type="number" id="conv-mm" class="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-center text-sm" placeholder="mm" oninput="convertMedical('mm')" step="0.01">
                    </div>
                    <div class="text-xs text-slate-400 mt-2 text-center">
                        <i class="fas fa-info-circle"></i> 1 Fr = 0.33 mm (外径)
                    </div>
                </div>

                <!-- Needle Gauge -->
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">针头规格 (Needle Gauge)</label>
                    <select id="conv-gauge" class="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm mb-3" onchange="showGaugeInfo()">
                        <option value="18">18G - Pink</option>
                        <option value="20">20G - Yellow</option>
                        <option value="21">21G - Green</option>
                        <option value="22">22G - Black</option>
                        <option value="23">23G - Blue</option>
                        <option value="25">25G - Orange</option>
                    </select>
                    <div id="gauge-display" class="h-12 bg-pink-300 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all">
                        18G - OD: 1.2mm
                    </div>
                </div>

                <!-- 温度转换 -->
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">温度转换 (°C ⇋ °F)</label>
                    <div class="flex items-center gap-3">
                        <input type="number" id="temp-c" class="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-center text-sm" placeholder="°C" oninput="convertTemp('c')" step="0.1">
                        <i class="fas fa-exchange-alt text-slate-300"></i>
                        <input type="number" id="temp-f" class="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-center text-sm" placeholder="°F" oninput="convertTemp('f')" step="0.1">
                    </div>
                </div>
            </div>
        </div>

        <!-- 4. 快速链接 -->
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl shadow-sm p-6">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                <i class="fas fa-link"></i> 财务常用链接
            </h3>

            <div class="grid grid-cols-2 gap-3">
                <a href="https://www.xtransfer.cn/" target="_blank" class="p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition text-center">
                    <i class="fas fa-exchange-alt text-xtransfer text-xl mb-2"></i>
                    <div class="text-xs font-bold">XTransfer</div>
                </a>
                <a href="https://www.boc.cn/sourcedb/whpj/" target="_blank" class="p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition text-center">
                    <i class="fas fa-chart-line text-red-400 text-xl mb-2"></i>
                    <div class="text-xs font-bold">中行汇率</div>
                </a>
                <a href="https://www.chinatax.gov.cn/" target="_blank" class="p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition text-center">
                    <i class="fas fa-file-invoice text-green-400 text-xl mb-2"></i>
                    <div class="text-xs font-bold">税务申报</div>
                </a>
                <a href="https://www.gov.cn/fuwu/zt/swfw/index.htm" target="_blank" class="p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition text-center">
                    <i class="fas fa-landmark text-blue-400 text-xl mb-2"></i>
                    <div class="text-xs font-bold">出口退税</div>
                </a>
            </div>
        </div>

    </div>
</div>

<!-- Toast Notification -->
<div id="toast" class="fixed bottom-6 right-6 z-50 bg-white shadow-xl rounded-lg border border-slate-200 p-4 flex items-center gap-3 transform translate-y-10 opacity-0 transition-all duration-300 hidden">
    <i class="fas fa-check-circle text-green-500 text-xl"></i>
    <div>
        <div class="font-bold text-sm text-slate-800" id="toast-message">操作成功</div>
    </div>
</div>

<script>
// Toast 通知
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2000);
}

// 复制银行信息
function copyBankInfo(type) {
    const text = document.getElementById(`${type}-info`).innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast('银行信息已复制到剪贴板');
    });
}

// 复制文本
function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast('已复制到剪贴板');
    });
}

// 英文金额大写
function convertToEnglish() {
    const amount = parseFloat(document.getElementById('amount-en').value) || 0;
    const currency = document.getElementById('currency-en').value;
    
    if (amount === 0) {
        document.getElementById('amount-en-text').textContent = 'SAY TOTAL...';
        return;
    }

    const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
    const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
    const teens = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];

    const currencyNames = {
        USD: 'US DOLLARS',
        EUR: 'EUROS',
        GBP: 'POUNDS STERLING'
    };

    const intPart = Math.floor(amount);
    const decPart = Math.round((amount - intPart) * 100);

    let words = 'SAY TOTAL ' + currencyNames[currency] + ' ';
    
    // 处理整数
    if (intPart === 0) {
        words += 'ZERO';
    } else {
        const thousands = Math.floor(intPart / 1000);
        const remainder = intPart % 1000;
        const hundreds = Math.floor(remainder / 100);
        const lastTwo = remainder % 100;

        if (thousands > 0) {
            words += ones[thousands] + ' THOUSAND ';
        }
        if (hundreds > 0) {
            words += ones[hundreds] + ' HUNDRED ';
        }
        if (lastTwo >= 10 && lastTwo < 20) {
            words += teens[lastTwo - 10];
        } else {
            const tensPart = Math.floor(lastTwo / 10);
            const onesPart = lastTwo % 10;
            if (tensPart > 0) words += tens[tensPart] + ' ';
            if (onesPart > 0) words += ones[onesPart];
        }
    }

    if (decPart > 0) {
        words += ` AND ${decPart}/100 CENTS ONLY`;
    } else {
        words += ' ONLY';
    }

    document.getElementById('amount-en-text').textContent = words.trim();
}

// 中文金额大写
function convertToChinese() {
    const amount = parseFloat(document.getElementById('amount-cn').value) || 0;
    
    const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const units = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿'];
    
    if (amount === 0) {
        document.getElementById('amount-cn-text').textContent = '人民币零元整';
        return;
    }

    let [intPart, decPart] = amount.toFixed(2).split('.');
    let result = '人民币';

    // 处理整数部分
    intPart = parseInt(intPart);
    if (intPart > 0) {
        const intStr = intPart.toString().split('').reverse();
        let temp = '';
        for (let i = 0; i < intStr.length; i++) {
            const digit = parseInt(intStr[i]);
            if (digit !== 0) {
                temp = digits[digit] + units[i] + temp;
            } else if (temp && !temp.startsWith('零')) {
                temp = '零' + temp;
            }
        }
        result += temp + '元';
    }

    // 处理小数
    if (decPart && parseInt(decPart) > 0) {
        const [jiao, fen] = decPart.split('');
        if (jiao !== '0') result += digits[parseInt(jiao)] + '角';
        if (fen !== '0') result += digits[parseInt(fen)] + '分';
    } else {
        result += '整';
    }

    document.getElementById('amount-cn-text').textContent = result;
}

// 医疗单位转换 (Fr ⇋ mm)
function convertMedical(type) {
    const fr = document.getElementById('conv-fr');
    const mm = document.getElementById('conv-mm');
    
    if (type === 'fr') {
        mm.value = (parseFloat(fr.value) / 3).toFixed(2);
    } else {
        fr.value = (parseFloat(mm.value) * 3).toFixed(1);
    }
}

// Gauge 信息显示
function showGaugeInfo() {
    const gauge = document.getElementById('conv-gauge').value;
    const display = document.getElementById('gauge-display');
    
    const gaugeData = {
        '18': { color: 'pink', od: '1.2mm', bg: 'bg-pink-300' },
        '20': { color: 'yellow', od: '0.9mm', bg: 'bg-yellow-300' },
        '21': { color: 'green', od: '0.8mm', bg: 'bg-green-400' },
        '22': { color: 'black', od: '0.7mm', bg: 'bg-slate-800' },
        '23': { color: 'blue', od: '0.6mm', bg: 'bg-blue-400' },
        '25': { color: 'orange', od: '0.5mm', bg: 'bg-orange-400' }
    };
    
    const info = gaugeData[gauge];
    display.className = `h-12 ${info.bg} rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all`;
    display.textContent = `${gauge}G - OD: ${info.od}`;
}

// 温度转换
function convertTemp(type) {
    const c = document.getElementById('temp-c');
    const f = document.getElementById('temp-f');
    
    if (type === 'c') {
        f.value = ((parseFloat(c.value) * 9/5) + 32).toFixed(1);
    } else {
        c.value = ((parseFloat(f.value) - 32) * 5/9).toFixed(1);
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    showGaugeInfo();
});
</script>

</body>
</html>
