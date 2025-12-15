// 仅保留基础结构，避免与complete-products.js冲突
const productDatabase = {
    metadata: {
        version: '2.0.0',
        lastUpdated: '2024-01-10',
        totalProducts: 0
    },
    categories: {},
    products: [],
    byId: {}
};

function initializeDatabase() {
    console.log('[Products.js] Database initialized');
    return productDatabase;
}

// 避免重复暴露全局变量
if (!window.productDatabase) {
    window.productDatabase = productDatabase;
    window.initializeDatabase = initializeDatabase;
}
