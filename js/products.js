/**
 * V5 Medical Product Database
 * ISO 13485 Certified Medical Products Catalog
 * @version 2.1.1
 * @lastUpdated 2024-01-15
 * @description Fixed export issues for better compatibility
 */

// Main product database structure
const productDatabase = {
    // Metadata
    metadata: {
        version: '2.1.1',
        lastUpdated: '2024-01-15',
        totalProducts: 0 // Will be calculated
    },
    
    // Categories mapping
    categories: {
        'surgical-sutures': 'Surgical Sutures',
        'surgical-instruments': 'Surgical Instruments',
        'gauze-dressings': 'Gauze Dressings',
        'protective-equipment': 'Protective Equipment',
        'injection-infusion': 'Injection & Infusion',
        'dental-products': 'Dental Products',
        'surgical-packs': 'Surgical Packs'
    },
    
    // Products array for easier iteration and filtering
    products: [],
    
    // Products by ID (legacy support)
    byId: {}
};

// Product data - using array structure for better compatibility
const productData = [
    // Surgical Sutures
    {
        id: 'pga-suture',
        name: 'PGA Absorbable Suture',
        category: 'surgical-sutures',
        short: 'Monofilament PGA suture with excellent tensile strength',
        description: 'High-quality PGA absorbable sutures with predictable absorption within 60-90 days. Made from polyglycolic acid, these sutures provide strong wound support during the critical healing period.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pga-absorbable-suture.jpg'
        ],
        specifications: {
            material: 'Polyglycolic Acid (PGA)',
            absorption: '60-90 days',
            type: 'Monofilament',
            sizes: '4-0 to 2',
            color: 'Violet',
            needleType: 'Various options available'
        }
    },
    {
        id: 'pgla-suture',
        name: 'PGLA Braided Suture',
        category: 'surgical-sutures',
        short: 'Braided PGLA suture with excellent handling',
        description: 'Superior handling and knot security with predictable absorption. Polyglactin 910 sutures are coated for smooth passage through tissue.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pgla-braided-suture.jpg'
        ],
        specifications: {
            material: 'Polyglactin 910 (PGLA)',
            absorption: '56-70 days',
            type: 'Braided',
            sizes: '6-0 to 2',
            color: 'Violet',
            coating: 'Polyglactin 370 / Calcium Stearate'
        }
    },
    // 其余产品数据保持不变...
];

// 填充产品数据库
productDatabase.products = productData;
productData.forEach(product => {
    productDatabase.byId[product.id] = product;
});
productDatabase.metadata.totalProducts = productData.length;

// 确保全局变量可用 - 兼容多种加载方式
window.productDatabase = productDatabase;
window.productData = productData;

// Make database available globally
window.productDatabase = productDatabase;
window.finalProductDatabase = productDatabase; // 新增：兼容product-loader.js的检查

// 同时添加对模块化加载的支持（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productDatabase,
        productData,
        default: productDatabase
    };
}

// 触发事件通知数据库已准备就绪
const event = new CustomEvent('productDatabaseReady', { 
    detail: { 
        productDatabase,
        productData,
        count: productData.length
    } 
});
window.dispatchEvent(event);
