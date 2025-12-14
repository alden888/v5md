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
    },
    {
        id: 'surgical-scissors',
        name: 'Surgical Scissors',
        category: 'surgical-instruments',
        short: 'Stainless steel surgical scissors',
        description: 'Various types including Mayo, Metzenbaum, and iris scissors.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-scissors.jpg'],
        specifications: {
            'Material': 'Stainless Steel',
            'Types': 'Mayo, Metzenbaum, Iris, Littauer',
            'Lengths': '4.5", 5.5", 6.0", 7.0"',
            'Finish': 'Matte or Mirror'
        }
    },
    {
        id: 'forceps',
        name: 'Forceps',
        category: 'surgical-instruments',
        short: 'Precision surgical forceps',
        description: 'Toothed and non-toothed forceps for tissue handling.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps.jpg'],
        specifications: {
            'Material': 'Stainless Steel',
            'Types': 'Adson, Debakey, Russian, Tissue, Hemostatic',
            'Lengths': '4.5", 5.5", 6.0", 7.0", 8.0"'
        }
    },
    {
        id: 'needle-holders',
        name: 'Needle Holders',
        category: 'surgical-instruments',
        short: 'Surgical needle holders',
        description: 'High-quality needle holders for suturing.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Needle+Holders'],
        specifications: {
            'Material': 'Stainless Steel',
            'Types': 'Mayo-Hegar, Webster, Castroviejo',
            'Lengths': '5", 6", 7", 8"',
            'Jaws': 'Tungsten Carbide inserts'
        }
    },
    
    // ===== GAUZE DRESSINGS =====
    {
        id: 'gauze-swabs',
        name: 'Gauze Swabs',
        category: 'gauze-dressings',
        short: 'Sterile cotton gauze swabs',
        description: '100% cotton sterile gauze swabs in various sizes.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-swabs.jpg'],
        specifications: {
            'Material': '100% Medical Grade Cotton',
            'Sterility': 'Sterile',
            'Sizes': '2"x2", 3"x3", 4"x4"',
            'Ply': '8-ply or 12-ply'
        }
    },
    {
        id: 'gauze-rolls',
        name: 'Gauze Rolls',
        category: 'gauze-dressings',
        short: 'Cotton gauze bandage rolls',
        description: 'High-quality gauze rolls for wound dressing.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-rolls.jpg'],
        specifications: {
            'Material': '100% Medical Grade Cotton',
            'Width': '2", 3", 4", 6"',
            'Length': '5 yards or 10 yards',
            'Ply': '4-ply or 6-ply'
        }
    },
    {
        id: 'gauze-balls',
        name: 'Gauze Balls',
        category: 'gauze-dressings',
        short: 'Sterile gauze balls',
        description: 'Pre-made sterile gauze balls for wound cleaning.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Gauze+Balls'],
        specifications: {
            'Material': '100% Cotton',
            'Sterility': 'Sterile',
            'Size': 'Medium or Large',
            'Packaging': 'Bulk or individual'
        }
    },
    {
        id: 'abdominal-pads',
        name: 'Abdominal Pads',
        category: 'gauze-dressings',
        short: 'Large sterile abdominal dressings',
        description: 'High-absorbency pads for large wounds.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/abdominal-pads.jpg'],
        specifications: {
            'Material': 'Cotton and Rayon Blend',
            'Sterility': 'Sterile',
            'Size': '5"x9" or 8"x10"',
            'Absorbency': 'High'
        }
    },
    {
        id: 'cotton-rolls',
        name: 'Cotton Rolls',
        category: 'gauze-dressings',
        short: 'Dental cotton rolls',
        description: 'Sterile cotton rolls for dental procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Cotton+Rolls'],
        specifications: {
            'Material': '100% Cotton',
            'Size': '1.5" x 1.5"',
            'Sterility': 'Sterile',
            'Packaging': '100/box'
        }
    },
    {
        id: 'cotton-balls',
        name: 'Cotton Balls',
        category: 'gauze-dressings',
        short: 'Sterile cotton balls',
        description: 'High-quality sterile cotton balls.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Cotton+Balls'],
        specifications: {
            'Material': '100% Cotton',
            'Size': 'Small, Medium, Large',
            'Sterility': 'Sterile',
            'Packaging': '100/box or 500/box'
        }
    },
    {
        id: 'non-woven-sponges',
        name: 'Non-woven Sponges',
        category: 'gauze-dressings',
        short: 'Disposable non-woven sponges',
        description: 'High-absorbency non-woven sponges.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Non-woven+Sponges'],
        specifications: {
            'Material': 'Non-woven fabric',
            'Size': '3"x3", 4"x4"',
            'Absorbency': 'High',
            'Sterility': 'Sterile'
        }
    },
    
    // ===== PROTECTIVE EQUIPMENT =====
    {
        id: 'surgical-face-masks',
        name: 'Surgical Face Masks',
        category: 'protective-equipment',
        short: '3-ply surgical masks with ear loops',
        description: 'High-filtration 3-ply medical face masks.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-face-masks.jpg'],
        specifications: {
            'Layers': '3-ply',
            'Filtration': 'BFE ≥95%, PFE ≥95%',
            'Type': 'Ear Loop',
            'Fluid Resistance': '≥120 mmHg'
        }
    },
    {
        id: 'n95-ffp2-masks',
        name: 'N95/FFP2 Masks',
        category: 'protective-equipment',
        short: 'High-filtration respirator masks',
        description: 'N95/FFP2 respirators with ≥95% filtration.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA', 'NIOSH'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-ffp2-masks.jpg'],
        specifications: {
            'Standard': 'N95 (US) / FFP2 (EU)',
            'Filtration': '≥95% for 0.3 micron particles',
            'Valve': 'With or without',
            'Headband': 'Adjustable elastic'
        }
    },
    {
        id: 'disposable-caps',
        name: 'Disposable Caps',
        category: 'protective-equipment',
        short: 'Disposable surgical caps',
        description: 'Non-woven disposable surgical caps.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Disposable+Caps'],
        specifications: {
            'Material': 'Non-woven fabric',
            'Sizes': 'One size fits all',
            'Color': 'Blue, White, Green',
            'Packaging': '100/bag'
        }
    },
    {
        id: 'surgical-gowns',
        name: 'Surgical Gowns',
        category: 'protective-equipment',
        short: 'Sterile SMS surgical gowns',
        description: 'AAMI Level 3 protection surgical gowns.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-gowns.jpg'],
        specifications: {
            'Material': 'SMS (Spunbond-Meltblown-Spunbond)',
            'Protection': 'AAMI Level 3',
            'Sizes': 'S, M, L, XL, XXL',
            'Closure': 'Tie-back'
        }
    },
    {
        id: 'isolation-gowns',
        name: 'Isolation Gowns',
        category: 'protective-equipment',
        short: 'Disposable isolation gowns',
        description: 'Fluid-resistant isolation gowns.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Isolation+Gowns'],
        specifications: {
            'Material': 'PP non-woven',
            'Fluid Resistance': 'Level 1-4',
            'Sizes': 'S, M, L, XL',
            'Closure': 'Tie or adhesive'
        }
    },
    {
        id: 'shoe-covers',
        name: 'Shoe Covers',
        category: 'protective-equipment',
        short: 'Disposable shoe covers',
        description: 'Non-slip disposable shoe covers.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Shoe+Covers'],
        specifications: {
            'Material': 'Non-woven fabric',
            'Size': 'One size fits all',
            'Color': 'Blue, White',
            'Packaging': '100 pairs/bag'
        }
    },
    
    // ===== INJECTION & INFUSION =====
    {
        id: 'disposable-syringes',
        name: 'Disposable Syringes',
        category: 'injection-infusion',
        short: 'Sterile medical syringes',
        description: 'Luer lock and slip syringes in all sizes.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/disposable-syringes.jpg'],
        specifications: {
            'Type': 'Luer Lock or Luer Slip',
            'Sizes': '1ml, 3ml, 5ml, 10ml, 20ml, 50ml',
            'Material': 'Polypropylene',
            'Sterility': 'Sterile'
        }
    },
    {
        id: 'insulin-syringes',
        name: 'Insulin Syringes',
        category: 'injection-infusion',
        short: 'Insulin syringes with fine needles',
        description: 'Precision insulin syringes for diabetes care.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Insulin+Syringes'],
        specifications: {
            'Capacity': '0.3ml, 0.5ml, 1ml',
            'Needle Gauge': '29G, 30G, 31G',
            'Needle Length': '8mm, 12.7mm',
            'Graduations': 'U-100'
        }
    },
    {
        id: 'hypodermic-needles',
        name: 'Hypodermic Needles',
        category: 'injection-infusion',
        short: 'Sterile hypodermic needles',
        description: 'Various sizes of hypodermic needles.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Hypodermic+Needles'],
        specifications: {
            'Gauge': '18G to 30G',
            'Length': '0.5" to 1.5"',
            'Type': 'Regular wall, Thin wall',
            'Sterility': 'Sterile'
        }
    },
    {
        id: 'iv-cannula',
        name: 'IV Cannula',
        category: 'injection-infusion',
        short: 'Intravenous catheter sets',
        description: 'IV cannulas with flashback chamber.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/iv-cannula.jpg'],
        specifications: {
            'Sizes': '14G, 16G, 18G, 20G, 22G, 24G',
            'Length': 'Standard (32mm) or Pediatric (25mm)',
            'Wings': 'With or without wings',
            'Safety': 'Safety or Non-safety'
        }
    },
    {
        id: 'infusion-sets',
        name: 'Infusion Sets',
        category: 'injection-infusion',
        short: 'IV infusion sets with drip chamber',
        description: 'Complete IV infusion sets for fluid administration.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-sets.jpg'],
        specifications: {
            'Length': '80cm, 150cm, 200cm',
            'Drip Chamber': 'Standard or Micro-drip',
            'Filter': 'With or without air filter',
            'Connector': 'Luer Lock or Luer Slip'
        }
    },
    {
        id: 'blood-transfusion-sets',
        name: 'Blood Transfusion Sets',
        category: 'injection-infusion',
        short: 'Blood transfusion administration sets',
        description: 'Sets for safe blood transfusion.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Blood+Transfusion+Sets'],
        specifications: {
            'Length': '150cm, 200cm',
            'Filter': '170-200 micron filter',
            'Drip Chamber': 'Standard',
            'Connector': 'Luer Lock'
        }
    },
    
    // ===== DENTAL PRODUCTS =====
    {
        id: 'dental-examination-kits',
        name: 'Dental Examination Kits',
        category: 'dental-products',
        short: 'Disposable dental exam kits',
        description: 'Complete dental examination instrument sets.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-examination-kits.jpg'],
        specifications: {
            'Contents': 'Mirror, Explorer, Tweezers, Cotton Pliers',
            'Material': 'Stainless Steel or Plastic',
            'Sterility': 'Sterile',
            'Packaging': 'Individually wrapped'
        }
    },
    {
        id: 'saliva-ejectors',
        name: 'Saliva Ejectors',
        category: 'dental-products',
        short: 'Disposable saliva ejectors',
        description: 'Flexible saliva ejectors for dental procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Saliva+Ejectors'],
        specifications: {
            'Material': 'Medical grade plastic',
            'Length': 'Standard or Long',
            'Diameter': 'Small, Medium, Large',
            'Packaging': '100/box'
        }
    },
    {
        id: 'dental-bibs',
        name: 'Dental Bibs',
        category: 'dental-products',
        short: 'Disposable patient bibs',
        description: 'Waterproof dental patient bibs.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-bibs.jpg'],
        specifications: {
            'Material': 'Plastic back / Paper front',
            'Size': 'Standard or Large',
            'Absorbency': 'High',
            'Closure': 'Snap or Tie'
        }
    },
    {
        id: 'impression-trays',
        name: 'Impression Trays',
        category: 'dental-products',
        short: 'Dental impression trays',
        description: 'Various sizes of dental impression trays.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Impression+Trays'],
        specifications: {
            'Material': 'Stainless Steel or Plastic',
            'Types': 'Upper, Lower, Perforated, Non-perforated',
            'Sizes': 'Small, Medium, Large',
            'Sterility': 'Sterile or Non-sterile'
        }
    },
    {
        id: 'polishing-cups',
        name: 'Polishing Cups',
        category: 'dental-products',
        short: 'Dental polishing cups',
        description: 'Rubber polishing cups for dental prophylaxis.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Polishing+Cups'],
        specifications: {
            'Material': 'Medical grade rubber',
            'Sizes': 'Small, Medium, Large',
            'Shape': 'Round, Oval, Conical',
            'Packaging': '100/box'
        }
    },
    {
        id: 'polishing-brushes',
        name: 'Polishing Brushes',
        category: 'dental-products',
        short: 'Dental polishing brushes',
        description: 'Polishing brushes for dental cleaning.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'High',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://via.placeholder.com/600x400?text=Polishing+Brushes'],
        specifications: {
            'Material': 'Nylon bristles',
            'Types': 'Straight, Contra-angle',
            'Sizes': 'Small, Medium, Large',
            'Packaging': '50/box'
        }
    },
    
    // ===== SURGICAL PACKS =====
    {
        id: 'surgical-packs',
        name: 'Surgical Packs',
        category: 'surgical-packs',
        short: 'Custom surgical procedure packs',
        description: 'Customized surgical packs for specific procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        stockLevel: 'Medium',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        images: ['https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/surgical-packs.jpg'],
        specifications: {
            'Types': 'Basic, Major, Specialty, OB/GYN, Orthopedic',
            'Components': 'Gowns, Drapes, Swabs, Instruments',
            'Sterility': 'Sterile',
            'Size': 'Small, Medium, Large'
        }
    }
];

// Initialize the database
function initializeCompleteDatabase() {
    // Add products to the database
    completeProductDatabase.products = [...completeProductData];
    
    // Create byId lookup
    completeProductDatabase.byId = {};
    completeProductData.forEach(product => {
        completeProductDatabase.byId[product.id] = product;
    });
    
    // Update metadata
    completeProductDatabase.metadata.totalProducts = completeProductData.length;
    
    console.log(`[CompleteProducts.js] Database initialized with ${completeProductData.length} products`);
    console.log(`[CompleteProducts.js] Categories: ${Object.keys(completeProductDatabase.categories).length}`);
    
    return completeProductDatabase;
}

// Initialize immediately
initializeCompleteDatabase();

// Export for global use
if (typeof window !== 'undefined') {
    window.completeProductDatabase = completeProductDatabase;
    window.productDatabase = completeProductDatabase; // For compatibility
    
    // Dispatch event for other scripts to know database is ready
    window.dispatchEvent(new CustomEvent('productDatabaseReady', { 
        detail: { 
            version: completeProductDatabase.metadata.version,
            productCount: completeProductDatabase.metadata.totalProducts
        }
    }));
}

// For CommonJS/Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = completeProductDatabase;
}

console.log(`[CompleteProducts.js] V${completeProductDatabase.metadata.version} loaded successfully`);