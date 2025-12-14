/**
 * V5 Medical Product Database
 * ISO 13485 Certified Medical Products Catalog
 * @version 2.1.0
 * @lastUpdated 2024-01-15
 * @description Fixed all issues and optimized for catalog.html compatibility
 */

// Main product database structure
const productDatabase = {
    // Metadata
    metadata: {
        version: '2.1.0',
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
    
    {
        id: 'chromic-catgut',
        name: 'Chromic Catgut Suture',
        category: 'surgical-sutures',
        short: 'Natural chromic catgut for ophthalmic surgery',
        description: 'Natural absorbable suture with delayed absorption for delicate procedures. Chromic salt treatment extends absorption time.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/chromic-catgut.jpg'
        ],
        specifications: {
            material: 'Chromicized Collagen',
            absorption: '90-120 days',
            type: 'Monofilament',
            sizes: '6-0 to 3',
            color: 'Tan',
            treatment: 'Chromic Salt'
        }
    },
    
    {
        id: 'plain-catgut',
        name: 'Plain Catgut Suture',
        category: 'surgical-sutures',
        short: 'Fast-absorbing plain catgut',
        description: 'Natural fast-absorbing suture for superficial wounds. Ideal for mucosal layers and areas requiring rapid absorption.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/plain-catgut.jpg'
        ],
        specifications: {
            material: 'Purified Collagen',
            absorption: '70-90 days',
            type: 'Monofilament',
            sizes: '6-0 to 3',
            color: 'Yellow',
            treatment: 'Plain (non-chromic)'
        }
    },
    
    {
        id: 'silk-suture',
        name: 'Silk Non-Absorbable Suture',
        category: 'surgical-sutures',
        short: 'Braided silk with excellent handling',
        description: 'Natural non-absorbable suture with superior handling characteristics. Coated for smooth passage through tissue.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/silk-suture.jpg'
        ],
        specifications: {
            material: 'Silk Protein',
            absorption: 'Non-absorbable',
            type: 'Braided',
            sizes: '8-0 to 5',
            color: 'Black',
            coating: 'Silicone or Wax'
        }
    },
    
    {
        id: 'nylon-suture',
        name: 'Nylon Monofilament Suture',
        category: 'surgical-sutures',
        short: 'Nylon suture for general surgery',
        description: 'Monofilament non-absorbable suture with excellent tensile strength and minimal tissue reaction.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/nylon-suture.jpg'
        ],
        specifications: {
            material: 'Polyamide (Nylon)',
            absorption: 'Non-absorbable',
            type: 'Monofilament',
            sizes: '11-0 to 2',
            color: 'Black or Blue',
            memory: 'Low'
        }
    },
    
    // Surgical Instruments
    {
        id: 'surgical-blades',
        name: 'Surgical Blades',
        category: 'surgical-instruments',
        short: 'Sterile surgical blades in various sizes',
        description: 'High-quality stainless steel surgical blades for precise cutting. Sterile individually wrapped blades.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-blades.jpg'
        ],
        specifications: {
            material: 'Medical Grade Stainless Steel',
            sterility: 'Sterile',
            packaging: 'Individually wrapped',
            sizes: '#10, #11, #12, #15, #20, #21, #22, #23, #24',
            grade: 'Surgical Grade'
        }
    },
    
    {
        id: 'scalpels',
        name: 'Disposable Scalpels',
        category: 'surgical-instruments',
        short: 'Single-use disposable scalpels',
        description: 'Pre-assembled disposable scalpels with plastic handles. Sterile and ready to use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpels.jpg'
        ],
        specifications: {
            material: 'Stainless Steel Blade / Plastic Handle',
            sterility: 'Sterile',
            type: 'Disposable',
            bladeSizes: '#10, #11, #15, #20, #22, #23',
            handleColor: 'Various'
        }
    },
    
    {
        id: 'surgical-scissors',
        name: 'Surgical Scissors',
        category: 'surgical-instruments',
        short: 'Stainless steel surgical scissors',
        description: 'Various types including Mayo, Metzenbaum, and iris scissors. Reusable and autoclavable.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-scissors.jpg'
        ],
        specifications: {
            material: 'Tungsten Carbide or Stainless Steel',
            types: 'Mayo, Metzenbaum, Iris, Littauer, etc.',
            lengths: '4.5", 5.5", 6.0", 7.0"',
            tips: 'Sharp-Sharp, Sharp-Blunt, Blunt-Blunt',
            finish: 'Matte or Mirror'
        }
    },
    
    {
        id: 'forceps',
        name: 'Surgical Forceps',
        category: 'surgical-instruments',
        short: 'Precision surgical forceps',
        description: 'Toothed and non-toothed forceps for tissue handling. Made from high-quality stainless steel.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps.jpg'
        ],
        specifications: {
            material: 'Stainless Steel',
            types: 'Adson, Debakey, Russian, Tissue, Hemostatic',
            lengths: '4.5", 5.5", 6.0", 7.0", 8.0"',
            tips: 'Toothed (1x2, 2x3), Non-toothed, Serrated',
            locking: 'Some with ratchet lock'
        }
    },
    
    // Gauze Dressings
    {
        id: 'gauze-swabs',
        name: 'Gauze Swabs',
        category: 'gauze-dressings',
        short: 'Sterile cotton gauze swabs',
        description: '100% cotton sterile gauze swabs in various sizes. Highly absorbent and lint-free.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-swabs.jpg'
        ],
        specifications: {
            material: '100% Medical Grade Cotton',
            sterility: 'Sterile',
            ply: '8-ply or 12-ply',
            sizes: '2"x2", 3"x3", 4"x4"',
            packaging: 'Individually wrapped or bulk'
        }
    },
    
    {
        id: 'gauze-rolls',
        name: 'Gauze Rolls',
        category: 'gauze-dressings',
        short: 'Cotton gauze bandage rolls',
        description: 'High-quality gauze rolls for wound dressing. Conformable and highly absorbent.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-rolls.jpg'
        ],
        specifications: {
            material: '100% Medical Grade Cotton',
            sterility: 'Sterile or Non-sterile',
            width: '2", 3", 4", 6"',
            length: '5 yards or 10 yards',
            ply: '4-ply or 6-ply'
        }
    },
    
    {
        id: 'abdominal-pads',
        name: 'Abdominal Pads',
        category: 'gauze-dressings',
        short: 'Large sterile abdominal dressings',
        description: 'High-absorbency pads for large wounds. Extra thick for maximum absorption.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/abdominal-pads.jpg'
        ],
        specifications: {
            material: 'Cotton and Rayon Blend',
            sterility: 'Sterile',
            size: '5"x9" or 8"x10"',
            absorbency: 'High',
            packaging: 'Individually wrapped'
        }
    },
    
    // Protective Equipment
    {
        id: 'surgical-face-masks',
        name: 'Surgical Face Masks',
        category: 'protective-equipment',
        short: '3-ply surgical masks with ear loops',
        description: 'High-filtration 3-ply medical face masks. Fluid resistant with nose clip.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-face-masks.jpg'
        ],
        specifications: {
            layers: '3-ply',
            filtration: 'BFE ≥95%, PFE ≥95%',
            type: 'Ear Loop',
            noseClip: 'Adjustable metal',
            fluidResistance: '≥120 mmHg'
        }
    },
    
    {
        id: 'n95-ffp2-masks',
        name: 'N95/FFP2 Masks',
        category: 'protective-equipment',
        short: 'High-filtration respirator masks',
        description: 'N95/FFP2 respirators with ≥95% filtration. NIOSH approved or equivalent.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA', 'NIOSH'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-ffp2-masks.jpg'
        ],
        specifications: {
            standard: 'N95 (US) / FFP2 (EU)',
            filtration: '≥95% for 0.3 micron particles',
            valve: 'With or without exhalation valve',
            headband: 'Adjustable elastic',
            fitTest: 'Recommended'
        }
    },
    
    {
        id: 'surgical-gowns',
        name: 'Surgical Gowns',
        category: 'protective-equipment',
        short: 'Sterile SMS surgical gowns',
        description: 'AAMI Level 3 protection surgical gowns. Reinforced critical zones.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-gowns.jpg'
        ],
        specifications: {
            material: 'SMS (Spunbond-Meltblown-Spunbond)',
            protection: 'AAMI Level 3',
            zones: 'Reinforced critical zones',
            closure: 'Tie-back or belt',
            sizes: 'S, M, L, XL, XXL'
        }
    },
    
    // Injection & Infusion
    {
        id: 'disposable-syringes',
        name: 'Disposable Syringes',
        category: 'injection-infusion',
        short: 'Sterile medical syringes',
        description: 'Luer lock and slip syringes in all sizes. Latex-free and sterile.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/disposable-syringes.jpg'
        ],
        specifications: {
            type: 'Luer Lock or Luer Slip',
            sizes: '1ml, 3ml, 5ml, 10ml, 20ml, 50ml',
            material: 'Polypropylene',
            sterility: 'Sterile',
            latex: 'Latex-free'
        }
    },
    
    {
        id: 'iv-cannula',
        name: 'IV Cannula',
        category: 'injection-infusion',
        short: 'Intravenous catheter sets',
        description: 'IV cannulas with flashback chamber. Safety versions available.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/iv-cannula.jpg'
        ],
        specifications: {
            sizes: '14G, 16G, 18G, 20G, 22G, 24G',
            length: 'Standard (32mm) or Pediatric (25mm)',
            wings: 'With or without wings',
            safety: 'Safety or Non-safety',
            catheter: 'Teflon or Polyurethane'
        }
    },
    
    {
        id: 'infusion-sets',
        name: 'Infusion Sets',
        category: 'injection-infusion',
        short: 'IV infusion sets with drip chamber',
        description: 'Complete IV infusion sets for fluid administration. Includes drip chamber and roller clamp.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-sets.jpg'
        ],
        specifications: {
            length: '80cm, 150cm, or 200cm',
            dripChamber: 'Standard or Micro-drip',
            filter: 'With or without air filter',
            connector: 'Luer Lock or Luer Slip',
            needle: 'With or without needle'
        }
    },
    
    // Dental Products
    {
        id: 'dental-examination-kits',
        name: 'Dental Examination Kits',
        category: 'dental-products',
        short: 'Disposable dental exam kits',
        description: 'Complete dental examination instrument sets. Sterile and ready to use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-examination-kits.jpg'
        ],
        specifications: {
            contents: 'Mirror, Explorer, Tweezers, Cotton Pliers',
            material: 'Stainless Steel or Plastic',
            sterility: 'Sterile',
            packaging: 'Individually wrapped',
            type: 'Adult or Pediatric'
        }
    },
    
    {
        id: 'dental-bibs',
        name: 'Dental Bibs',
        category: 'dental-products',
        short: 'Disposable patient bibs',
        description: 'Waterproof dental patient bibs. Soft and comfortable.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-bibs.jpg'
        ],
        specifications: {
            material: 'Plastic back / Paper front',
            size: 'Standard or Large',
            absorbency: 'High',
            closure: 'Snap or Tie',
            design: 'Solid or Printed'
        }
    },
    
    // Surgical Packs
    {
        id: 'surgical-packs',
        name: 'Surgical Packs',
        category: 'surgical-packs',
        short: 'Custom surgical procedure packs',
        description: 'Customized surgical packs for specific procedures. Includes all necessary components.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/surgical-packs.jpg'
        ],
        specifications: {
            types: 'Basic, Major, Specialty, OB/GYN, Orthopedic',
            components: 'Gowns, Drapes, Swabs, Instruments',
            sterility: 'Sterile',
            size: 'Small, Medium, Large',
            customization: 'Available'
        }
    }
];

// Helper functions
const productHelpers = {
    /**
     * Validate product database
     * @returns {Object} Validation result
     */
    validateDatabase: function() {
        const errors = [];
        const warnings = [];
        
        productData.forEach((product, index) => {
            // Required fields validation
            if (!product.id) {
                errors.push(`Product at index ${index} missing 'id' field`);
            }
            if (!product.name) {
                errors.push(`Product '${product.id}' missing 'name' field`);
            }
            if (!product.category) {
                errors.push(`Product '${product.id}' missing 'category' field`);
            }
            if (!product.description) {
                warnings.push(`Product '${product.id}' missing detailed description`);
            }
            
            // Category validation
            if (product.category && !productDatabase.categories[product.category]) {
                warnings.push(`Product '${product.id}' has unknown category: ${product.category}`);
            }
            
            // Image URL validation (basic)
            if (!product.images || product.images.length === 0) {
                warnings.push(`Product '${product.id}' has no images`);
            }
        });
        
        return {
            valid: errors.length === 0,
            errors: errors,
            warnings: warnings,
            productCount: productData.length,
            categoryCount: Object.keys(productDatabase.categories).length
        };
    },
    
    /**
     * Get products by category
     * @param {string} category - Category ID
     * @returns {Array} Filtered products
     */
    getProductsByCategory: function(category) {
        return productData.filter(product => product.category === category);
    },
    
    /**
     * Get product by ID
     * @param {string} id - Product ID
     * @returns {Object|null} Product or null
     */
    getProductById: function(id) {
        return productData.find(product => product.id === id) || null;
    },
    
    /**
     * Search products
     * @param {string} query - Search query
     * @returns {Array} Matching products
     */
    searchProducts: function(query) {
        if (!query) return [];
        
        const lowerQuery = query.toLowerCase();
        return productData.filter(product => 
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.short.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );
    },
    
    /**
     * Get all unique certifications
     * @returns {Array} Unique certifications
     */
    getAllCertifications: function() {
        const certs = new Set();
        productData.forEach(product => {
            if (product.certifications) {
                product.certifications.forEach(cert => certs.add(cert));
            }
        });
        return Array.from(certs);
    }
};

// Initialize the database
function initializeDatabase() {
    // Add products to the database
    productDatabase.products = [...productData];
    
    // Create byId lookup
    productDatabase.byId = {};
    productData.forEach(product => {
        productDatabase.byId[product.id] = product;
    });
    
    // Update metadata
    productDatabase.metadata.totalProducts = productData.length;
    
    // Log initialization
    console.log(`[Products.js] Database initialized with ${productData.length} products`);
    console.log(`[Products.js] Categories: ${Object.keys(productDatabase.categories).length}`);
    
    // Run validation
    const validation = productHelpers.validateDatabase();
    if (!validation.valid) {
        console.error('[Products.js] Database validation errors:', validation.errors);
    }
    if (validation.warnings.length > 0) {
        console.warn('[Products.js] Database validation warnings:', validation.warnings);
    }
    
    return validation;
}

// Export functions and helpers
productDatabase.helpers = productHelpers;

// Initialize immediately
initializeDatabase();

// ===== EXPORTS =====
// For maximum compatibility with all environments

// 1. For browser global scope
if (typeof window !== 'undefined') {
    window.productDatabase = productDatabase;
    window.finalProductDatabase = productDatabase;
    window.productData = productData;
    window.productHelpers = productHelpers;
    
    // Dispatch event for other scripts to know database is ready
    window.dispatchEvent(new CustomEvent('productDatabaseReady', { 
        detail: { 
            version: productDatabase.metadata.version,
            productCount: productDatabase.metadata.totalProducts
        }
    }));
}

// 2. For CommonJS/Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productDatabase,
        productData,
        productHelpers,
        initializeDatabase
    };
}

// 3. For ES6 modules
if (typeof exports !== 'undefined') {
    exports.default = productDatabase;
    exports.productData = productData;
    exports.productHelpers = productHelpers;
}

// Log success
console.log(`[Products.js] V${productDatabase.metadata.version} loaded successfully`);
console.log(`[Products.js] Products available: ${productDatabase.metadata.totalProducts}`);
console.log(`[Products.js] Available globally as window.productDatabase`);

// For debugging
if (typeof window !== 'undefined' && window.location.href.includes('debug')) {
    console.log('[Products.js] Debug mode: Database structure:', productDatabase);
}