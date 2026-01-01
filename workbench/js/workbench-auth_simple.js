/**
 * V5 Medical Workbench - Simplified Authentication
 * 简化版认证（直接密码比对 + 本地会话）
 * @version 2.0.3
 * @updated 2026-01-02
 */
class WorkbenchAuth {
    constructor() {
        // 🔒 明文密码（仅用于演示环境）
        // 生产环境请使用环境变量或后端验证
        this.VALID_PASSWORD = 'v5admin123';
        
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
        console.log('[Auth] Initializing authentication...');
        
        if (this.isAuthenticated()) {
            console.log('[Auth] Valid session found');
            return true;
        }
        
        console.log('[Auth] No valid session, showing login modal');
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
            
            // 检查会话是否过期
            if (now - data.loginTime > this.SESSION_DURATION) {
                console.log('[Auth] Session expired');
                this.logout();
                return false;
            }

            // 更新最后活动时间
            data.lastActivity = now;
            sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(data));
            
            return true;
        } catch (e) {
            console.error('[Auth] Session parse error:', e);
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
                // 返回剩余锁定分钟数
                return Math.ceil((this.LOCKOUT_DURATION - timeSinceLock) / 60000);
            } else {
                // 锁定时间已过，重置
                this.resetLoginAttempts();
                return false;
            }
        }
        
        return false;
    }

    /**
     * 记录登录尝试
     */
    recordLoginAttempt() {
        const attempts = this.getLoginAttempts();
        attempts.count++;
        attempts.lastAttempt = Date.now();
        localStorage.setItem(this.ATTEMPT_KEY, JSON.stringify(attempts));
    }

    /**
     * 获取登录尝试记录
     */
    getLoginAttempts() {
        try {
            const data = localStorage.getItem(this.ATTEMPT_KEY);
            return data ? JSON.parse(data) : { count: 0, lastAttempt: 0 };
        } catch {
            return { count: 0, lastAttempt: 0 };
        }
    }

    /**
     * 重置登录尝试
     */
    resetLoginAttempts() {
        localStorage.removeItem(this.ATTEMPT_KEY);
    }

    /**
     * 显示登录模态框
     */
    async showLoginModal() {
        return new Promise((resolve) => {
            const lockoutMinutes = this.isLockedOut();
            const isLocked = lockoutMinutes !== false;

            const modal = document.createElement('div');
            modal.id = 'v5-login-modal';
            modal.className = 'fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-[20000]';
            
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
                            <span>测试密码: v5admin123</span>
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
                const form = document.getElementById('v5-login-form');
                const errorDiv = document.getElementById('login-error');

                // 自动聚焦
                setTimeout(() => input.focus(), 100);

                // 处理登录提交
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const password = input.value.trim();

                    if (!password) {
                        errorDiv.textContent = '请输入密码';
                        errorDiv.classList.remove('hidden');
                        return;
                    }

                    // 🔑 简化版密码验证（直接比对）
                    if (password === this.VALID_PASSWORD) {
                        console.log('[Auth] Login successful');
                        this.login();
                        modal.remove();
                        resolve(true);
                    } else {
                        console.log('[Auth] Login failed');
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

    /**
     * 登录成功处理
     */
    login() {
        const session = {
            loginTime: Date.now(),
            lastActivity: Date.now(),
            user: 'V5_Team',
            version: '2.0.3'
        };

        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
        this.resetLoginAttempts();
        
        console.log('[Auth] Session created');
    }

    /**
     * 登出
     */
    logout() {
        sessionStorage.removeItem(this.SESSION_KEY);
        console.log('[Auth] Logged out');
        location.reload();
    }

    /**
     * 获取当前会话
     */
    getSession() {
        try {
            const data = sessionStorage.getItem(this.SESSION_KEY);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }
}

// 全局导出
window.WorkbenchAuth = WorkbenchAuth;
