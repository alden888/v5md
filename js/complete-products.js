/**
 * Complete V5 Medical Product Database
 * Precise Image Mapping Version
 * @version 3.3.0
 * @updated 2024-12-16
 */

const completeProductDatabase = {
    metadata: {
        version: '3.3.0',
        lastUpdated: '2024-12-16',
        totalProducts: 51
    },
    
    categories: {
        'surgical-sutures': 'Surgical Sutures',
        'surgical-instruments': 'Surgical Instruments', 
        'gauze-dressings': 'Gauze Dressings',
        'protective-equipment': 'Protective Equipment',
        'surgical-packs': 'Surgical Packs',
        'injection-infusion': 'Injection & Infusion',
        'dental-products': 'Dental Products'
    },
    
    products: [],
    byId: {}
};

// ==========================================
// 1. Precise Image Mapping (Based on your GitHub files)
// ==========================================
const productData = [
    // --- 1. Surgical Sutures ---
    { name: "PGA Absorbable Suture", id: "pga-absorbable-suture", category: "surgical-sutures", img: "images/products/surgical-sutures/pga-absorbable-suture.jpg" },
    { name: "PGLA Absorbable Suture", id: "pgla-absorbable-suture", category: "surgical-sutures", img: "images/products/surgical-sutures/pgla-absorbable-suture.jpg" },
    { name: "Chromic Catgut", id: "chromic-catgut", category: "surgical-sutures", img: "images/products/surgical-sutures/chromic-catgut.jpg" },
    { name: "Plain Catgut", id: "plain-catgut", category: "surgical-sutures", img: "images/products/surgical-sutures/plain-catgut.jpg" },
    { name: "Silk Suture", id: "silk-suture", category: "surgical-sutures", img: "images/products/surgical-sutures/silk-suture.jpg" },
    { name: "Nylon Suture", id: "nylon-suture", category: "surgical-sutures", img: "images/products/surgical-sutures/nylon-suture.jpg" },
    { name: "Polypropylene Suture", id: "polypropylene-suture", category: "surgical-sutures", img: "images/products/surgical-sutures/polypropylene-suture.jpg" },
    { name: "Polyester Suture", id: "polyester-suture", category: "surgical-sutures", img: "images/products/surgical-sutures/polyester-suture.jpg" },
    { name: "PDO Suture", id: "pdo-suture", category: "surgical-sutures", img: "images/products/surgical-sutures/pdo-suture.jpg" },

    // --- 2. Surgical Instruments ---
    { name: "Surgical Blades", id: "surgical-blades", category: "surgical-instruments", img: "images/products/surgical-instruments/surgical-blades.jpg" },
    { name: "Scalpels", id: "scalpels", category: "surgical-instruments", img: "images/products/surgical-instruments/scalpels.jpg" },
    { name: "Lancets", id: "lancets", category: "surgical-instruments", img: "images/products/surgical-instruments/lancets.jpg" },
    { name: "Surgical Scissors", id: "surgical-scissors", category: "surgical-instruments", img: "images/products/surgical-instruments/surgical-scissors.jpg" },
    { name: "Forceps", id: "forceps", category: "surgical-instruments", img: "images/products/surgical-instruments/forceps.jpg" },
    { name: "Needle Holders", id: "needle-holders", category: "surgical-instruments", img: "images/products/surgical-instruments/needle-holders.jpg" },

    // --- 3. Gauze & Dressings ---
    { name: "Gauze Swabs", id: "gauze-swabs", category: "gauze-dressings", img: "images/products/gauze-dressings/gauze-swabs.jpg" },
    { name: "Gauze Rolls", id: "gauze-rolls", category: "gauze-dressings", img: "images/products/gauze-dressings/gauze-rolls.jpg" },
    { name: "Gauze Balls", id: "gauze-balls", category: "gauze-dressings", img: "images/products/gauze-dressings/gauze-balls.jpg" },
    { name: "Abdominal Pads", id: "abdominal-pads", category: "gauze-dressings", img: "images/products/gauze-dressings/abdominal-pads.jpg" },
    // Missing exact match images fallback to default or category general
    { name: "Cotton Rolls", id: "cotton-rolls", category: "gauze-dressings", img: "images/products/default-product.jpg" },
    { name: "Cotton Balls", id: "cotton-balls", category: "gauze-dressings", img: "images/products/default-product.jpg" },
    { name: "Non-woven Sponges", id: "non-woven-sponges", category: "gauze-dressings", img: "images/products/default-product.jpg" },

    // --- 4. Protective Equipment ---
    { name: "Surgical Face Masks", id: "surgical-face-masks", category: "protective-equipment", img: "images/products/protective-equipment/surgical-face-masks.jpg" },
    { name: "N95 / FFP2 Masks", id: "n95-ffp2-masks", category: "protective-equipment", img: "images/products/protective-equipment/n95-ffp2-masks.jpg" },
    { name: "Surgical Gowns", id: "surgical-gowns", category: "protective-equipment", img: "images/products/protective-equipment/surgical-gowns.jpg" },
    { name: "Protective Coveralls", id: "protective-coveralls", category: "protective-equipment", img: "images/products/protective-equipment/protective-coveralls.jpg" },
    { name: "Disposable Caps", id: "disposable-caps", category: "protective-equipment", img: "images/products/default-product.jpg" },
    { name: "Shoe Covers", id: "shoe-covers", category: "protective-equipment", img: "images/products/default-product.jpg" },

    // --- 5. Injection & Infusion ---
    { name: "Disposable Syringes", id: "disposable-syringes", category: "injection-infusion", img: "images/products/injection-infusion/disposable-syringes.jpg" },
    { name: "Insulin Syringes", id: "insulin-syringes", category: "injection-infusion", img: "images/products/injection-infusion/insulin-syringes.jpg" },
    { name: "Hypodermic Needles", id: "hypodermic-needles", category: "injection-infusion", img: "images/products/default-product.jpg" },
    { name: "IV Cannula", id: "iv-cannula", category: "injection-infusion", img: "images/products/default-product.jpg" },
    { name: "Infusion Sets", id: "infusion-sets", category: "injection-infusion", img: "images/products/default-product.jpg" },
    { name: "Blood Transfusion Sets", id: "blood-transfusion-sets", category: "injection-infusion", img: "images/products/default-product.jpg" },

    // --- 6. Dental Products ---
    { name: "Dental Examination Kits", id: "dental-examination-kits", category: "dental-products", img: "images/products/dental-products/dental-examination-kits.jpg" },
    { name: "Oral Care Kits", id: "oral-care-kits", category: "dental-products", img: "images/products/default-product.jpg" },
    { name: "Saliva Ejectors", id: "saliva-ejectors", category: "dental-products", img: "images/products/default-product.jpg" },
    { name: "Dental Bibs", id: "dental-bibs", category: "dental-products", img: "images/products/default-product.jpg" },
    { name: "Impression Trays", id: "impression-trays", category: "dental-products", img: "images/products/default-product.jpg" },

    // --- 7. Surgical Packs (Main Image as fallback for sub-items) ---
    // Note: You have one main image 'images/products/surgical-packs/surgical-packs.jpg'
    { name: "Surgical Packs (General)", id: "surgical-packs-general", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "Umbilical Cord Protection Kit", id: "umbilical-cord-protection-kit", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "Gynecological Examination Kit", id: "gynecological-examination-kit", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "HPV Screening Kit", id: "hpv-screening-kit", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "ENT Examination Kit", id: "ent-examination-kit", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "Disposable Suture Set", id: "disposable-suture-set", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "Wound Dressing Kit", id: "wound-dressing-kit", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "Debridement Kit", id: "debridement-kit", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "Perineal Care Kit", id: "perineal-care-kit", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "Disposable Shaving Kit", id: "disposable-shaving-kit", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "Sterile Dialysis Care Kit", id: "sterile-dialysis-care-kit", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" },
    { name: "Uterine Suction Curettage Set", id: "uterine-suction-curettage-set", category: "surgical-packs", img: "images/products/surgical-packs/surgical-packs.jpg" }
];

// ==========================================
// 2. Data Builder
// ==========================================

const completeProductData = productData.map(item => {
    return {
        id: item.id,
        name: item.name,
        category: item.category,
        short: `High-quality ${item.name} for professional medical use. ISO 13485 certified.`,
        description: `V5 Medical supplies premium ${item.name} manufactured under strict standards. Features excellent biocompatibility, sterility, and reliability. Available in various specifications to meet clinical requirements. Custom branding (OEM) available.`,
        price: "Contact for Price",
        availability: "In Stock",
        stockLevel: "High",
        certifications: ["ISO 13485", "CE", "FDA"],
        images: [
            item.img, // Primary mapped image
            "images/products/default-product.jpg" // Fallback
        ],
        specifications: {
            "Material": "Medical Grade",
            "Sterility": "Sterile (EO Gas)",
            "Quality Standard": "ISO 13485 / CE",
            "Packaging": "Individual Sterile Pack",
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

if (typeof window !== 'undefined') {
    initializeCompleteDatabase();
    window.completeProductDatabase = completeProductDatabase;
    window.completeProductData = completeProductData;
}

if (typeof module !== 'undefined') {
    module.exports = { completeProductDatabase, completeProductData };
}
