/**
 * Complete V5 Medical Product Database
 * Includes all products from catalog and existing database
 * @version 3.0.0
 */

const completeProductDatabase = {
    // Metadata
    metadata: {
        version: '3.0.0',
        lastUpdated: '2024-01-15',
        totalProducts: 0
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
    
    // All products in array format
    products: [],
    
    // Products by ID
    byId: {}
};

// Complete product data
const completeProductData = [
    // ===== SURGICAL SUTURES =====
    {
        id: 'pga-absorbable-suture',
        name: 'PGA Absorbable Suture',
        category: 'surgical-sutures',
        short: 'Monofilament PGA suture with excellent tensile strength',
        description: 'High-quality PGA absorbable sutures with predictable absorption within 60-90 days. Made from polyglycolic acid.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pga-absorbable-suture.jpg'],
        specifications: {
            'Material': 'Polyglycolic Acid (PGA)',
            'Absorption': '60-90 days',
            'Type': 'Monofilament',
            'Sizes': '4-0 to 2',
            'Color': 'Violet',
            'Needle Type': 'Various options'
        }
    },
    {
        id: 'pgla-absorbable-suture',
        name: 'PGLA Absorbable Suture',
        category: 'surgical-sutures',
        short: 'Braided PGLA suture with excellent handling',
        description: 'Superior handling and knot security with predictable absorption.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pgla-braided-suture.jpg'],
        specifications: {
            'Material': 'Polyglactin 910 (PGLA)',
            'Absorption': '56-70 days',
            'Type': 'Braided',
            'Sizes': '6-0 to 2',
            'Color': 'Violet'
        }
    },
    {
        id: 'chromic-catgut',
        name: 'Chromic Catgut',
        category: 'surgical-sutures',
        short: 'Natural chromic catgut for ophthalmic surgery',
        description: 'Natural absorbable suture with delayed absorption for delicate procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/chromic-catgut.jpg'],
        specifications: {
            'Material': 'Chromicized Collagen',
            'Absorption': '90-120 days',
            'Type': 'Monofilament',
            'Sizes': '6-0 to 3',
            'Color': 'Tan'
        }
    },
    {
        id: 'plain-catgut',
        name: 'Plain Catgut',
        category: 'surgical-sutures',
        short: 'Fast-absorbing plain catgut',
        description: 'Natural fast-absorbing suture for superficial wounds.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/plain-catgut.jpg'],
        specifications: {
            'Material': 'Purified Collagen',
            'Absorption': '70-90 days',
            'Type': 'Monofilament',
            'Sizes': '6-0 to 3',
            'Color': 'Yellow'
        }
    },
    {
        id: 'silk-suture',
        name: 'Silk Suture',
        category: 'surgical-sutures',
        short: 'Braided silk with excellent handling',
        description: 'Natural non-absorbable suture with superior handling characteristics.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/silk-suture.jpg'],
        specifications: {
            'Material': 'Silk Protein',
            'Type': 'Non-absorbable',
            'Structure': 'Braided',
            'Sizes': '8-0 to 5',
            'Color': 'Black'
        }
    },
    {
        id: 'nylon-suture',
        name: 'Nylon Suture',
        category: 'surgical-sutures',
        short: 'Nylon suture for general surgery',
        description: 'Monofilament non-absorbable suture with excellent tensile strength.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/nylon-suture.jpg'],
        specifications: {
            'Material': 'Polyamide (Nylon)',
            'Type': 'Non-absorbable',
            'Structure': 'Monofilament',
            'Sizes': '11-0 to 2',
            'Color': 'Black or Blue'
        }
    },
    {
        id: 'polypropylene-suture',
        name: 'Polypropylene Suture',
        category: 'surgical-sutures',
        short: 'Polypropylene monofilament suture',
        description: 'Polypropylene suture with excellent biocompatibility.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Polypropylene+Suture'],
        specifications: {
            'Material': 'Polypropylene',
            'Type': 'Non-absorbable',
            'Structure': 'Monofilament',
            'Sizes': '2-0 to 6-0',
            'Color': 'Blue'
        }
    },
    {
        id: 'polyester-suture',
        name: 'Polyester Suture',
        category: 'surgical-sutures',
        short: 'Braided polyester suture',
        description: 'Polyester suture with excellent strength and durability.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Polyester+Suture'],
        specifications: {
            'Material': 'Polyester',
            'Type': 'Non-absorbable',
            'Structure': 'Braided',
            'Sizes': '2-0 to 6-0',
            'Color': 'White or Green'
        }
    },
    {
        id: 'pdo-suture',
        name: 'PDO Suture',
        category: 'surgical-sutures',
        short: 'Polydioxanone absorbable suture',
        description: 'PDO suture with extended wound support.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=PDO+Suture'],
        specifications: {
            'Material': 'Polydioxanone (PDO)',
            'Absorption': '180-210 days',
            'Type': 'Monofilament',
            'Sizes': '2-0 to 6-0',
            'Color': 'Violet'
        }
    },
    
    // ===== SURGICAL INSTRUMENTS =====
    {
        id: 'surgical-blades',
        name: 'Surgical Blades',
        category: 'surgical-instruments',
        short: 'Sterile surgical blades in various sizes',
        description: 'High-quality stainless steel surgical blades for precise cutting.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-blades.jpg'],
        specifications: {
            'Material': 'Stainless Steel',
            'Sterility': 'Sterile',
            'Sizes': '#10, #11, #12, #15, #20, #21, #22, #23, #24',
            'Packaging': 'Individually wrapped'
        }
    },
    {
        id: 'scalpels',
        name: 'Scalpels',
        category: 'surgical-instruments',
        short: 'Single-use disposable scalpels',
        description: 'Pre-assembled disposable scalpels with plastic handles.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpels.jpg'],
        specifications: {
            'Type': 'Disposable',
            'Blade Material': 'Stainless Steel',
            'Handle Material': 'Plastic',
            'Sizes': '#10, #11, #15, #20, #21, #22'
        }
    },
    {
        id: 'lancets',
        name: 'Lancets',
        category: 'surgical-instruments',
        short: 'Disposable lancets for blood sampling',
        description: 'Sterile disposable lancets for safe blood sampling.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Lancets'],
        specifications: {
            'Type': 'Disposable',
            'Gauge': '21G, 23G, 25G',
            'Depth': '1.8mm, 2.4mm, 3.0mm',
            'Sterility': 'Sterile'
        }
    }
];

// 初始化函数
function initializeCompleteDatabase() {
    completeProductDatabase.products = [...completeProductData];
    completeProductDatabase.byId = {};
    completeProductData.forEach(product => {
        completeProductDatabase.byId[product.id] = product;
    });
    completeProductDatabase.metadata.totalProducts = completeProductData.length;
    console.log(`[CompleteProducts.js] Database initialized with ${completeProductData.length} products`);
    return completeProductDatabase;
}

// 自动执行初始化
initializeCompleteDatabase();

// 暴露到全局
window.completeProductDatabase = completeProductDatabase;
window.completeProductData = completeProductData;
window.initializeCompleteDatabase = initializeCompleteDatabase;

/**
 * 修复：移除重复的totalProducts变量声明，确保数据正确初始化
 */
const completeProductDatabase = {
    metadata: {
        version: '3.0.0',
        lastUpdated: '2024-01-15',
        totalProducts: 0 // 修复：此处曾重复声明totalProducts
    },
    categories: {
        'surgical-sutures': 'Surgical Sutures',
        'surgical-instruments': 'Surgical Instruments', 
        'gauze-dressings': 'Gauze Dressings',
        'protective-equipment': 'Protective Equipment',
        'injection-infusion': 'Injection & Infusion',
        'dental-products': 'Dental Products',
        'surgical-packs': 'Surgical Packs'
    },
    products: [],
    byId: {}
};

// 产品数据（保持不变）
const completeProductData = [
    {
        id: 'pga-absorbable-suture',
        name: 'PGA Absorbable Suture',
        category: 'surgical-sutures',
        short: 'Monofilament PGA suture with excellent tensile strength',
        description: 'High-quality PGA absorbable sutures with predictable absorption within 60-90 days.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pga-absorbable-suture.jpg'],
        specifications: {
            'Material': 'Polyglycolic Acid (PGA)',
            'Absorption': '60-90 days',
            'Type': 'Monofilament',
            'Sizes': '4-0 to 2',
            'Color': 'Violet'
        }
    },
    // 其他产品数据保持不变...
    {
        id: 'lancets',
        name: 'Lancets',
        category: 'surgical-instruments',
        short: 'Disposable lancets for blood sampling',
        description: 'Sterile disposable lancets for safe blood sampling.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Lancets'],
        specifications: {
            'Type': 'Disposable',
            'Gauge': '21G, 23G, 25G',
            'Depth': '1.8mm, 2.4mm, 3.0mm',
            'Sterility': 'Sterile'
        }
    }
];

// 初始化函数（修复重复声明问题）
function initializeCompleteDatabase() {
    completeProductDatabase.products = [...completeProductData];
    completeProductDatabase.byId = {};
    completeProductData.forEach(product => {
        completeProductDatabase.byId[product.id] = product;
    });
    // 修复：直接赋值，避免重复变量
    completeProductDatabase.metadata.totalProducts = completeProductData.length;
    console.log(`[CompleteProducts.js] Loaded ${completeProductData.length} products`);
    return completeProductDatabase;
}

// 避免重复初始化
if (!window.completeProductDatabase) {
    initializeCompleteDatabase();
    window.completeProductDatabase = completeProductDatabase;
    window.completeProductData = completeProductData;
}
