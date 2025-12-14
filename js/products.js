/**
 * V5 Medical Product Database
 * ISO 13485 Certified Medical Products Catalog
 * @version 2.1.0 - Fixed for catalog.html compatibility
 */

const productDatabase = {
    // Surgical Sutures
    'pga-suture': {
        id: 'pga-suture',
        name: 'PGA Absorbable Suture',
        category: 'surgical-sutures',
        short: 'Monofilament PGA suture with excellent tensile strength',
        description: 'High-quality PGA absorbable sutures with predictable absorption within 60-90 days.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pga-absorbable-suture.jpg'
        ]
    },
    
    'pgla-suture': {
        id: 'pgla-suture',
        name: 'PGLA Braided Suture',
        category: 'surgical-sutures',
        short: 'Braided PGLA suture with excellent handling',
        description: 'Superior handling and knot security with predictable absorption.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pgla-braided-suture.jpg'
        ]
    },
    
    'chromic-catgut': {
        id: 'chromic-catgut',
        name: 'Chromic Catgut Suture',
        category: 'surgical-sutures',
        short: 'Natural chromic catgut for ophthalmic surgery',
        description: 'Natural absorbable suture with delayed absorption for delicate procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/chromic-catgut.jpg'
        ]
    },
    
    'plain-catgut': {
        id: 'plain-catgut',
        name: 'Plain Catgut Suture',
        category: 'surgical-sutures',
        short: 'Fast-absorbing plain catgut',
        description: 'Natural fast-absorbing suture for superficial wounds.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/plain-catgut.jpg'
        ]
    },
    
    'silk-suture': {
        id: 'silk-suture',
        name: 'Silk Non-Absorbable Suture',
        category: 'surgical-sutures',
        short: 'Braided silk with excellent handling',
        description: 'Natural non-absorbable suture with superior handling characteristics.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/silk-suture.jpg'
        ]
    },
    
    'nylon-suture': {
        id: 'nylon-suture',
        name: 'Nylon Monofilament Suture',
        category: 'surgical-sutures',
        short: 'Nylon suture for general surgery',
        description: 'Monofilament non-absorbable suture with excellent tensile strength.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/nylon-suture.jpg'
        ]
    },
    
    // Surgical Instruments
    'surgical-blades': {
        id: 'surgical-blades',
        name: 'Surgical Blades',
        category: 'surgical-instruments',
        short: 'Sterile surgical blades in various sizes',
        description: 'High-quality stainless steel surgical blades for precise cutting.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-blades.jpg'
        ]
    },
    
    'scalpels': {
        id: 'scalpels',
        name: 'Disposable Scalpels',
        category: 'surgical-instruments',
        short: 'Single-use disposable scalpels',
        description: 'Pre-assembled disposable scalpels with plastic handles.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpels.jpg'
        ]
    },
    
    'surgical-scissors': {
        id: 'surgical-scissors',
        name: 'Surgical Scissors',
        category: 'surgical-instruments',
        short: 'Stainless steel surgical scissors',
        description: 'Various types including Mayo, Metzenbaum, and iris scissors.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-scissors.jpg'
        ]
    },
    
    'forceps': {
        id: 'forceps',
        name: 'Surgical Forceps',
        category: 'surgical-instruments',
        short: 'Precision surgical forceps',
        description: 'Toothed and non-toothed forceps for tissue handling.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps.jpg'
        ]
    },
    
    // Gauze Dressings
    'gauze-swabs': {
        id: 'gauze-swabs',
        name: 'Gauze Swabs',
        category: 'gauze-dressings',
        short: 'Sterile cotton gauze swabs',
        description: '100% cotton sterile gauze swabs in various sizes.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-swabs.jpg'
        ]
    },
    
    'gauze-rolls': {
        id: 'gauze-rolls',
        name: 'Gauze Rolls',
        category: 'gauze-dressings',
        short: 'Cotton gauze bandage rolls',
        description: 'High-quality gauze rolls for wound dressing.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-rolls.jpg'
        ]
    },
    
    'abdominal-pads': {
        id: 'abdominal-pads',
        name: 'Abdominal Pads',
        category: 'gauze-dressings',
        short: 'Large sterile abdominal dressings',
        description: 'High-absorbency pads for large wounds.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/abdominal-pads.jpg'
        ]
    },
    
    // Protective Equipment
    'surgical-face-masks': {
        id: 'surgical-face-masks',
        name: 'Surgical Face Masks',
        category: 'protective-equipment',
        short: '3-ply surgical masks with ear loops',
        description: 'High-filtration 3-ply medical face masks.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-face-masks.jpg'
        ]
    },
    
    'n95-ffp2-masks': {
        id: 'n95-ffp2-masks',
        name: 'N95/FFP2 Masks',
        category: 'protective-equipment',
        short: 'High-filtration respirator masks',
        description: 'N95/FFP2 respirators with ≥95% filtration.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-ffp2-masks.jpg'
        ]
    },
    
    'surgical-gowns': {
        id: 'surgical-gowns',
        name: 'Surgical Gowns',
        category: 'protective-equipment',
        short: 'Sterile SMS surgical gowns',
        description: 'AAMI Level 3 protection surgical gowns.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-gowns.jpg'
        ]
    },
    
    // Injection & Infusion
    'disposable-syringes': {
        id: 'disposable-syringes',
        name: 'Disposable Syringes',
        category: 'injection-infusion',
        short: 'Sterile medical syringes',
        description: 'Luer lock and slip syringes in all sizes.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/disposable-syringes.jpg'
        ]
    },
    
    'iv-cannula': {
        id: 'iv-cannula',
        name: 'IV Cannula',
        category: 'injection-infusion',
        short: 'Intravenous catheter sets',
        description: 'IV cannulas with flashback chamber.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/iv-cannula.jpg'
        ]
    },
    
    'infusion-sets': {
        id: 'infusion-sets',
        name: 'Infusion Sets',
        category: 'injection-infusion',
        short: 'IV infusion sets with drip chamber',
        description: 'Complete IV infusion sets for fluid administration.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-sets.jpg'
        ]
    },
    
    // Dental Products
    'dental-examination-kits': {
        id: 'dental-examination-kits',
        name: 'Dental Examination Kits',
        category: 'dental-products',
        short: 'Disposable dental exam kits',
        description: 'Complete dental examination instrument sets.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-examination-kits.jpg'
        ]
    },
    
    'dental-bibs': {
        id: 'dental-bibs',
        name: 'Dental Bibs',
        category: 'dental-products',
        short: 'Disposable patient bibs',
        description: 'Waterproof dental patient bibs.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-bibs.jpg'
        ]
    },
    
    // Surgical Packs
    'surgical-packs': {
        id: 'surgical-packs',
        name: 'Surgical Packs',
        category: 'surgical-packs',
        short: 'Custom surgical procedure packs',
        description: 'Customized surgical packs for specific procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/surgical-packs.jpg'
        ]
    }
};

// CRITICAL: Export in multiple ways for maximum compatibility
window.productDatabase = productDatabase;
window.finalProductDatabase = productDatabase;

// For ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productDatabase;
}

// Log successful load
console.log('[Products.js] Database loaded with', Object.keys(productDatabase).length, 'products');
console.log('[Products.js] Available globally as window.productDatabase and window.finalProductDatabase');
