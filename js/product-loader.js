class ProductLoader {
    constructor() {
        this.products = null;
        this.loading = false;
    }

    /**
     * 增强的加载方法，添加重试机制
     */
    async loadProducts() {
        if (this.products) {
            return this.products;
        }

        this.loading = true;
        console.log('[ProductLoader] Loading products...');

        try {
            // 最多重试3次
            for (let attempt = 1; attempt <= 3; attempt++) {
                try {
                    // 先尝试初始化数据库（确保初始化完成）
                    if (window.initializeDatabase) window.initializeDatabase();
                    if (window.initializeCompleteDatabase) window.initializeCompleteDatabase();

                    // 尝试加载数据
                    if (window.completeProductDatabase && window.completeProductDatabase.products.length > 0) {
                        this.products = window.completeProductDatabase;
                        console.log('[ProductLoader] Loaded from completeProductDatabase');
                        break;
                    } else if (window.productDatabase && window.productDatabase.products.length > 0) {
                        this.products = window.productDatabase;
                        console.log('[ProductLoader] Loaded from productDatabase');
                        break;
                    } else {
                        await this.loadExternalDatabase();
                        if (this.products) break;
                    }
                } catch (error) {
                    console.warn(`[ProductLoader] Attempt ${attempt} failed:`, error);
                    if (attempt === 3) throw error; // 最后一次尝试失败则抛出
                    await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // 指数退避重试
                }
            }

            if (!this.products || this.products.products.length === 0) {
                throw new Error('No products found in database');
            }

            console.log(`[ProductLoader] Successfully loaded ${this.products.products.length} products`);
            return this.products;
        } catch (error) {
            console.error('[ProductLoader] Critical error loading products:', error);
            // 触发全局错误事件，供页面处理
            window.dispatchEvent(new CustomEvent('productLoadError', { detail: error }));
            return null;
        } finally {
            this.loading = false;
        }
    }

    // 加载外部数据库（保留原有逻辑）
    async loadExternalDatabase() {
        try {
            const response = await fetch('https://api.v5md.com/products');
            if (!response.ok) throw new Error('External API request failed');
            const data = await response.json();
            this.products = data;
            return data;
        } catch (error) {
            console.error('[ProductLoader] External database load failed:', error);
            throw error;
        }
    }
}
