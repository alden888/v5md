// 修复：检查是否已定义，避免重复声明
if (!window.ProductLoader) {
    class ProductLoader {
        constructor() {
            this.products = null;
            this.loading = false;
        }

        async loadProducts() {
            if (this.products) return this.products;
            this.loading = true;
            console.log('[ProductLoader] Loading products...');

            try {
                for (let attempt = 1; attempt <= 3; attempt++) {
                    try {
                        // 确保数据库已初始化
                        if (window.initializeDatabase && !window.productDatabase.products.length) {
                            window.initializeDatabase();
                        }
                        if (window.completeProductDatabase && window.completeProductDatabase.products.length) {
                            this.products = window.completeProductDatabase;
                            console.log('[ProductLoader] Loaded from complete database');
                            break;
                        } else if (window.productDatabase && window.productDatabase.products.length) {
                            this.products = window.productDatabase;
                            break;
                        } else {
                            await this.loadExternalDatabase();
                            if (this.products) break;
                        }
                    } catch (error) {
                        console.warn(`Attempt ${attempt} failed:`, error);
                        if (attempt === 3) throw error;
                        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                    }
                }

                if (!this.products || !this.products.products.length) {
                    throw new Error('No products found');
                }
                return this.products;
            } catch (error) {
                console.error('Load error:', error);
                window.dispatchEvent(new CustomEvent('productLoadError', { detail: error }));
                return null;
            } finally {
                this.loading = false;
            }
        }

        async loadExternalDatabase() {
            try {
                const response = await fetch('https://api.v5md.com/products');
                if (!response.ok) throw new Error('API failed');
                const data = await response.json();
                this.products = data;
                return data;
            } catch (error) {
                console.error('External load failed:', error);
                throw error;
            }
        }
    }
    window.ProductLoader = ProductLoader; // 暴露到全局，避免重复定义
}
