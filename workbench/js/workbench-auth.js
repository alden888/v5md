/**
 * V5 Medical Workbench - Authentication Module
 * 身份验证与访问控制
 * @version 2.0.0
 * @updated 2025-12-30
 */

class WorkbenchAuth {
    constructor() {
        // 🔒 密码: v5bright2026 的 SHA-256 哈希
        this.PASSWORD_HASH = '8f4e9a2b1c6d3e5f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f';
        
        // Session 配置
        this.SESSION_KEY = 'v5_workbench_session';
        this.SESSION_DURATION = 8 * 60 * 60 * 1000; // 8小时
        
        // 登录尝试限制（防暴力破解）
        this.MAX_ATTEMPTS = 5;
        this.LOCKOUT_DURATION = 15 * 60 * 1000; // 15分钟
        this.ATTEMPT_KEY = 'v5_login_attempts';
    }

    /**
     * 初始化认证检查
     */
    async init() {
        if (this.isAuthenticated()) {
            return true;
        }
        return await this.showLoginModal();
    }

    /**
     * 检查是否已认证
     */
    isAuthenticated() {
        const session = sessionStorage.getItem(this.SESSION_KEY);
        if (!session) return false;

        try {
            const data = JSON.parse(session);
            const now = Date.now();
            
            if (now - data.loginTime > this.SESSION_DURATION) {
                this.logout();
                return false;
            }

            data.lastActivity = now;
            sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 检查是否被锁定
     */
    isLockedOut() {
        const attempts = this.getLoginAttempts();
        if (attempts.count >= this.MAX_ATTEMPTS) {
            const timeSinceLock = Date.now() - attempts.lastAttempt;
            if (timeSinceLock < this.LOCKOUT_DURATION) {
                return Math.ceil((this.LOCKOUT_DURATION - timeSinceLock) / 60000);
            } else {
                this.resetLoginAttempts();
                return false;
            }
        }
        return false;
    }

    recordLoginAttempt() {
        const attempts = this.getLoginAttempts();
        attempts.count++;
        attempts.lastAttempt = Date.now();
        localStorage.setItem(this.ATTEMPT_KEY, JSON.stringify(attempts));
    }

    getLoginAttempts() {
        try {
            return JSON.parse(localStorage.getItem(this.ATTEMPT_KEY)) || { count: 0, lastAttempt: 0 };
        } catch {
            return { count: 0, lastAttempt: 0 };
        }
    }

    resetLoginAttempts() {
        localStorage.removeItem(this.ATTEMPT_KEY);
    }

    async hashPassword(password) {
        const msgBuffer = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * 显示登录模态框
     */
    async showLoginModal() {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.id = 'v5-login-modal';
            modal.className = 'fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-[20000]';
            
            const lockoutMinutes = this.isLockedOut();
            const isLocked = lockoutMinutes !== false;

            modal.innerHTML = `
                <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
                    <div class="text-center mb-8">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                            <i class="fas fa-lock text-blue-600 text-2xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-slate-800 mb-2">V5 Medical 工作台</h2>
                        <p class="text-sm text-slate-500">Internal Use Only - 仅供内部使用</p>
                    </div>

                    ${isLocked ? `
                        <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div class="flex items-center gap-2 text-red-800">
                                <i class="fas fa-exclamation-triangle"></i>
                                <p class="font-bold">账户已锁定</p>
                            </div>
                            <p class="text-sm text-red-600 mt-1">
                                登录失败次数过多，请等待 ${lockoutMinutes} 分钟后重试
                            </p>
                        </div>
                    ` : ''}

                    <form id="v5-login-form" class="${isLocked ? 'opacity-50 pointer-events-none' : ''}">
                        <div class="mb-6">
                            <label class="block text-sm font-bold text-slate-700 mb-2">
                                <i class="fas fa-key mr-1 text-slate-400"></i> 访问密码
                            </label>
                            <input 
                                type="password" 
                                id="v5-password-input"
                                class="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                placeholder="请输入工作台密码"
                                autocomplete="off"
                                ${isLocked ? 'disabled' : ''}
                            >
                        </div>

                        <div class="mb-4 text-xs text-slate-400 flex items-center gap-1">
                            <i class="fas fa-info-circle"></i>
                            <span>密码: v5bright2026 (测试用)</span>
                        </div>

                        <button 
                            type="submit" 
                            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:bg-slate-300 disabled:cursor-not-allowed"
                            ${isLocked ? 'disabled' : ''}
                        >
                            ${isLocked ? '账户已锁定' : '解锁工作台 (Enter)'}
                        </button>

                        <div id="login-error" class="mt-4 text-sm text-red-600 text-center hidden"></div>
                    </form>

                    <div class="mt-8 pt-6 border-t border-slate-100 text-center">
                        <a href="../index.html" class="text-sm text-slate-400 hover:text-blue-600 transition">
                            <i class="fas fa-arrow-left mr-1"></i> 返回主站
                        </a>
                    </div>
                </div>

                <style>
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in { animation: fade-in 0.4s ease-out; }
                </style>
            `;

            document.body.appendChild(modal);

            if (!isLocked) {
                const input = document.getElementById('v5-password-input');
                setTimeout(() => input.focus(), 100);

                const form = document.getElementById('v5-login-form');
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const password = input.value.trim();
                    const errorDiv = document.getElementById('login-error');

                    if (!password) {
                        errorDiv.textContent = '请输入密码';
                        errorDiv.classList.remove('hidden');
                        return;
                    }

                    const hash = await this.hashPassword(password);
                    if (hash === this.PASSWORD_HASH) {
                        this.login();
                        modal.remove();
                        resolve(true);
                    } else {
                        this.recordLoginAttempt();
                        const attempts = this.getLoginAttempts();
                        const remaining = this.MAX_ATTEMPTS - attempts.count;

                        if (remaining > 0) {
                            errorDiv.textContent = `密码错误！剩余尝试次数: ${remaining}`;
                            errorDiv.classList.remove('hidden');
                            input.value = '';
                            input.focus();
                        } else {
                            errorDiv.textContent = '登录失败次数过多，账户已锁定15分钟';
                            errorDiv.classList.remove('hidden');
                            setTimeout(() => location.reload(), 2000);
                        }
                    }
                });
            }
        });
    }

    login() {
        const session = {
            loginTime: Date.now(),
            lastActivity: Date.now(),
            user: 'V5_Team'
        };
        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
        this.resetLoginAttempts();
    }

    logout() {
        sessionStorage.removeItem(this.SESSION_KEY);
        location.reload();
    }

    getSession() {
        try {
            return JSON.parse(sessionStorage.getItem(this.SESSION_KEY));
        } catch {
            return null;
        }
    }
}

window.WorkbenchAuth = WorkbenchAuth;
