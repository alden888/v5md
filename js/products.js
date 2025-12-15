// 假设原有产品数据库定义...
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

// 假设原有初始化函数...
function initializeDatabase() {
    // 原有初始化逻辑...
    console.log('[Products.js] Database initialized');
    return productDatabase;
}

// 自动执行初始化
initializeDatabase();

// 暴露到全局
window.productDatabase = productDatabase;
window.initializeDatabase = initializeDatabase;
