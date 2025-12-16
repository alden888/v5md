/**
 * Complete V5 Medical Product Database
 * Optimized Version: Auto-generated IDs, Smart Image Paths, Full Category Coverage
 * @version 3.2.0
 * @updated 2024-12-16
 */

const completeProductDatabase = {
    // Metadata
    metadata: {
        version: '3.2.0',
        lastUpdated: '2024-12-16',
        totalProducts: 51
    },
    
    // Categories mapping (7 Categories)
    categories: {
        'surgical-sutures': 'Surgical Sutures',
        'surgical-instruments': 'Surgical Instruments', 
        'gauze-dressings': 'Gauze Dressings',
        'protective-equipment': 'Protective Equipment',
        'surgical-packs': 'Surgical Packs',
        'injection-infusion': 'Injection & Infusion',
        'dental-products': 'Dental Products'
    },
    
    // Storage
    products: [],
    byId: {}
};

// ==========================================
// 1. Raw Product List (Easy to Maintain)
// ==========================================
const rawProductList = [
    // --- Surgical Sutures ---
    { name: "PGA Absorbable Suture", category: "surgical-sutures" },
    { name: "PGLA Absorbable Suture", category: "surgical-sutures" },
    { name: "Chromic Catgut", category: "surgical-sutures" },
    { name: "Plain Catgut", category: "surgical-sutures" },
    { name: "Silk Suture", category: "surgical-sutures" },
    { name: "Nylon Suture", category: "surgical-sutures" },
    { name: "Polypropylene Suture", category: "surgical-sutures" },
    { name: "Polyester Suture", category: "surgical-sutures" },
    { name: "PDO Suture", category: "surgical-sutures" },

    // --- Surgical Instruments ---
    { name: "Surgical Blades", category: "surgical-instruments" },
    { name: "Scalpels", category: "surgical-instruments" },
    { name: "Lancets", category: "surgical-instruments" },
    { name: "Surgical Scissors", category: "surgical-instruments" },
    { name: "Forceps", category: "surgical-instruments" },
    { name: "Needle Holders", category: "surgical-instruments" },

    // --- Gauze & Dressings ---
    { name: "Gauze Swabs", category: "gauze-dressings" },
    { name: "Gauze Rolls", category: "gauze-dressings" },
    { name: "Gauze Balls", category: "gauze-dressings" },
    { name: "Abdominal Pads", category: "gauze-dressings" },
    { name: "Cotton Rolls", category: "gauze-dressings" },
    { name: "Cotton Balls", category: "gauze-dressings" },
    { name: "Non-woven Sponges", category: "gauze-dressings" },

    // --- Protective Equipment ---
    { name: "Surgical Face Masks", category: "protective-equipment" },
    { name: "N95 / FFP2 Masks", category: "protective-equipment" },
    { name: "Disposable Caps", category: "protective-equipment" },
    { name: "Surgical Gowns", category: "protective-equipment" },
    { name: "Isolation Gowns", category: "protective-equipment" },
    { name: "Shoe Covers", category: "protective-equipment" },

    // --- Injection & Infusion ---
    { name: "Disposable Syringes", category: "injection-infusion" },
    { name: "Insulin Syringes", category: "injection-infusion" },
    { name: "Hypodermic Needles", category: "injection-infusion" },
    { name: "IV Cannula", category: "injection-infusion" },
    { name: "Infusion Sets", category: "injection-infusion" },
    { name: "Blood Transfusion Sets", category: "injection-infusion" },

    // --- Dental Products ---
    { name: "Dental Examination Kits", category: "dental-products" },
    { name: "Oral Care Kits", category: "dental-products" },
    { name: "Saliva Ejectors", category: "dental-products" },
    { name: "Dental Bibs", category: "dental-products" },
    { name: "Impression Trays", category: "dental-products" },
    { name: "Polishing Cups", category: "dental-products" },
    { name: "Polishing Brushes", category: "dental-products" },

    // --- Surgical Packs (High Value Kits) ---
    { name: "Umbilical Cord Protection Kit", category: "surgical-packs" },
    { name: "Gynecological Examination Kit", category: "surgical-packs" },
    { name: "HPV Screening Kit", category: "surgical-packs" },
    { name: "ENT Examination Kit", category: "surgical-packs" },
    { name: "Disposable Suture Set", category: "surgical-packs" },
    { name: "Wound Dressing Kit", category: "surgical-packs" },
    { name: "Debridement Kit", category: "surgical-packs" },
    { name: "Perineal Care Kit", category: "surgical-packs" },
    { name: "Disposable Shaving Kit", category: "surgical-packs" },
    { name: "Sterile Dialysis Care Kit", category: "surgical-packs" },
    { name: "Uterine Suction Curettage Set", category: "surgical-packs" }
];

// ==========================================
// 2. Logic: ID Generator & Data Builder
// ==========================================

function generateId(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace spaces/special chars with hyphens
        .replace(/(^-|-$)/g, '');    // Trim leading/trailing hyphens
}

// Transform raw list into full product objects
const completeProductData = rawProductList.map(item => {
    const id = generateId(item.name);
    // Path convention: images/products/[category]/[id].jpg
    const imagePath = `images/products/${item.category}/${id}.jpg`;
    
    return {
        id: id,
        name: item.name,
        category: item.category,
        short: `Premium quality ${item.name} for professional medical use.`,
        description: `V5 Medical supplies premium ${item.name} manufactured under strict ISO 13485 standards. CE and FDA compliant. Available in various specifications to meet clinical requirements. Custom branding and packaging available upon request.`,
        price: "Contact for Price",
        availability: "In Stock",
        stockLevel: "High",
        certifications: ["ISO 13485", "CE", "FDA"],
        images: [
            imagePath, // Main image
            "images/products/default-product.jpg" // Fallback handled by UI
        ],
        specifications: {
            "Material": "Medical Grade",
            "Sterility": "Sterile (EO Gas)",
            "Quality Standard": "ISO 13485 / CE",
            "Packaging": "Individual Sterile Peel-Pack",
            "Origin": "China"
        }
    };
});

// ==========================================
// 3. Initialization
// ==========================================

function initializeCompleteDatabase() {
    completeProductDatabase.products = [...completeProductData];
    completeProductDatabase.byId = {};
    
    completeProductData.forEach(product => {
        completeProductDatabase.byId[product.id] = product;
    });
    
    completeProductDatabase.metadata.totalProducts = completeProductData.length;
    console.log(`[CompleteProducts.js] v${completeProductDatabase.metadata.version} initialized with ${completeProductData.length} products`);
    
    return completeProductDatabase;
}

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
    initializeCompleteDatabase();
    window.completeProductDatabase = completeProductDatabase;
    window.completeProductData = completeProductData;
}

// Export for Node.js (if used in build scripts)
if (typeof module !== 'undefined') {
    module.exports = { completeProductDatabase, completeProductData };
}
