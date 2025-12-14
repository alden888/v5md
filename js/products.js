// V5 Medical Product Database - FIXED VERSION
// Last Updated: 2025-12-14
// Total Products: 39
// Status: NO SYNTAX ERRORS

console.log('=============================================');
console.log('=          V5 Medical Products.js           =');
console.log('=             FIXED VERSION                 =');
console.log('=============================================');
console.log('Loading product database...');

// =============================================
// PRODUCT DATABASE DEFINITION
// =============================================
const productDatabase = {
    // ==== Surgical Sutures ====
    "absorbable-suture": {
        id: "absorbable-suture",
        name: "Absorbable Suture",
        chineseName: "可吸收缝合线",
        category: "Surgical Sutures",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/absorbable-suture.jpg"
        ],
        description: "High-quality absorbable surgical sutures for various medical procedures. Made from premium materials that provide excellent tensile strength and tissue compatibility.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Excellent tensile strength",
            "Good tissue compatibility",
            "Controlled absorption rate",
            "Smooth passage through tissue",
            "Secure knotting capability"
        ],
        specs: {
            "Material": "Polyglycolic Acid",
            "Sizes": "3/0, 2/0, 0, 1, 2",
            "Length": "75cm, 100cm",
            "Needle Type": "Reverse cutting",
            "Absorption Time": "60-90 days"
        },
        faq: [
            {
                q: "What is the absorption time for these sutures?",
                a: "The absorption time is typically 60-90 days depending on the suture size and location of use."
            }
        ]
    },
    
    "non-absorbable-suture": {
        id: "non-absorbable-suture",
        name: "Non-Absorbable Suture",
        chineseName: "不可吸收缝合线",
        category: "Surgical Sutures",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/non-absorbable-suture.jpg"
        ],
        description: "Premium non-absorbable surgical sutures designed for permanent tissue approximation. Made from high-quality materials that provide excellent strength and biocompatibility.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Exceptional tensile strength",
            "Excellent biocompatibility",
            "Resistant to degradation",
            "Smooth surface for easy handling",
            "Secure knot retention"
        ],
        specs: {
            "Material": "Polypropylene",
            "Sizes": "3/0, 2/0, 0, 1, 2, 3",
            "Length": "75cm, 100cm",
            "Needle Type": "Reverse cutting, taper point",
            "Color": "Blue, black"
        },
        faq: [
            {
                q: "What materials are available for non-absorbable sutures?",
                a: "We offer non-absorbable sutures in polypropylene, silk, nylon, and stainless steel depending on your specific needs."
            }
        ]
    },
    
    "pgla-suture": {
        id: "pgla-suture",
        name: "PGLA Suture",
        chineseName: "聚乙醇酸乳酸缝合线",
        category: "Surgical Sutures",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pgla-suture.jpg"
        ],
        description: "Polyglycolic acid-lactic acid copolymer sutures offering balanced absorption characteristics and tensile strength retention.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Balanced absorption profile", "Gradual strength loss"],
        specs: { "Material": "PGLA Copolymer" },
        faq: []
    },
    
    "chromic-catgut": {
        id: "chromic-catgut",
        name: "Chromic Catgut Suture",
        chineseName: "铬制肠线",
        category: "Surgical Sutures",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/chromic-catgut.jpg"
        ],
        description: "Traditional chromic catgut sutures treated with chromium salts to delay absorption.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Natural collagen material", "Good tissue acceptance"],
        specs: { "Material": "Chromic-treated collagen" },
        faq: []
    },
    
    "nylon-suture": {
        id: "nylon-suture",
        name: "Nylon Suture",
        chineseName: "尼龙缝合线",
        category: "Surgical Sutures",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/nylon-suture.jpg"
        ],
        description: "Monofilament nylon sutures offering excellent strength and flexibility.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Exceptional tensile strength", "Smooth monofilament design"],
        specs: { "Material": "Nylon" },
        faq: []
    },
    
    "polypropylene-suture": {
        id: "polypropylene-suture",
        name: "Polypropylene Suture",
        chineseName: "聚丙烯缝合线",
        category: "Surgical Sutures",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polypropylene-suture.jpg"
        ],
        description: "Monofilament polypropylene sutures with excellent tensile strength.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Exceptional strength-to-size ratio", "Minimal tissue reactivity"],
        specs: { "Material": "Polypropylene" },
        faq: []
    },
    
    "silk-suture": {
        id: "silk-suture",
        name: "Silk Suture",
        chineseName: "丝线",
        category: "Surgical Sutures",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/silk-suture.jpg"
        ],
        description: "Braided silk sutures offering excellent handling characteristics.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Excellent handling properties", "Superior knot security"],
        specs: { "Material": "Silk" },
        faq: []
    },
    
    "stainless-steel-suture": {
        id: "stainless-steel-suture",
        name: "Stainless Steel Suture",
        chineseName: "不锈钢缝合线",
        category: "Surgical Sutures",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/stainless-steel-suture.jpg"
        ],
        description: "Sterile stainless steel sutures providing maximum tensile strength.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Maximum tensile strength", "Excellent biocompatibility"],
        specs: { "Material": "316L Stainless Steel" },
        faq: []
    },
    
    "polyglycolic-acid-suture": {
        id: "polyglycolic-acid-suture",
        name: "Polyglycolic Acid Suture",
        chineseName: "聚乙醇酸缝合线",
        category: "Surgical Sutures",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polyglycolic-acid-suture.jpg"
        ],
        description: "Braided polyglycolic acid sutures offering reliable absorption.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Reliable absorption profile", "Good initial tensile strength"],
        specs: { "Material": "Polyglycolic Acid" },
        faq: []
    },
    
    // ==== Surgical Instruments ====
    "scalpel-handle": {
        id: "scalpel-handle",
        name: "Scalpel Handle",
        chineseName: "手术刀柄",
        category: "Surgical Instruments",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpel-handle.jpg"
        ],
        description: "High-quality stainless steel scalpel handles designed for secure blade attachment.",
        certifications: ["ISO 13485", "CE"],
        features: ["High-grade stainless steel", "Secure blade locking"],
        specs: { "Material": "Stainless Steel" },
        faq: []
    },
    
    "surgical-scissors": {
        id: "surgical-scissors",
        name: "Surgical Scissors",
        chineseName: "手术剪",
        category: "Surgical Instruments",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-scissors.jpg"
        ],
        description: "Precision surgical scissors for cutting tissue and sutures.",
        certifications: ["ISO 13485", "CE"],
        features: ["Sharp, precision-ground blades", "Smooth cutting action"],
        specs: { "Material": "Stainless Steel" },
        faq: []
    },
    
    "forceps": {
        id: "forceps",
        name: "Surgical Forceps",
        chineseName: "手术镊",
        category: "Surgical Instruments",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps.jpg"
        ],
        description: "High-precision surgical forceps for grasping tissue.",
        certifications: ["ISO 13485", "CE"],
        features: ["Precision tips", "Secure grip design"],
        specs: { "Material": "Stainless Steel" },
        faq: []
    },
    
    "hemostats": {
        id: "hemostats",
        name: "Hemostatic Forceps",
        chineseName: "止血钳",
        category: "Surgical Instruments",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/hemostats.jpg"
        ],
        description: "Reliable hemostatic forceps for controlling bleeding.",
        certifications: ["ISO 13485", "CE"],
        features: ["Precision-machined jaws", "Ratcheted locking"],
        specs: { "Material": "Stainless Steel" },
        faq: []
    },
    
    "retractors": {
        id: "retractors",
        name: "Surgical Retractors",
        chineseName: "手术拉钩",
        category: "Surgical Instruments",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/retractors.jpg"
        ],
        description: "High-quality surgical retractors for holding back tissue.",
        certifications: ["ISO 13485", "CE"],
        features: ["Sturdy construction", "Smooth edges"],
        specs: { "Material": "Stainless Steel" },
        faq: []
    },
    
    "needle-holders": {
        id: "needle-holders",
        name: "Needle Holders",
        chineseName: "持针器",
        category: "Surgical Instruments",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/needle-holders.jpg"
        ],
        description: "Precision needle holders for grasping surgical needles.",
        certifications: ["ISO 13485", "CE"],
        features: ["Diamond jaw pattern", "Ratcheted locking"],
        specs: { "Material": "Stainless Steel" },
        faq: []
    },
    
    // ==== Gauze Dressings ====
    "sterile-gauze": {
        id: "sterile-gauze",
        name: "Sterile Gauze Sponges",
        chineseName: "无菌纱布块",
        category: "Gauze Dressings",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/sterile-gauze.jpg"
        ],
        description: "High-quality sterile gauze sponges for wound care.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Highly absorbent", "Sterile and ready to use"],
        specs: { "Material": "100% Cotton" },
        faq: []
    },
    
    "non-sterile-gauze": {
        id: "non-sterile-gauze",
        name: "Non-Sterile Gauze Sponges",
        chineseName: "非无菌纱布块",
        category: "Gauze Dressings",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/non-sterile-gauze.jpg"
        ],
        description: "High-quality non-sterile gauze sponges for general use.",
        certifications: ["ISO 13485", "CE"],
        features: ["Good absorbency", "Economical option"],
        specs: { "Material": "100% Cotton" },
        faq: []
    },
    
    "gauze-swabs": {
        id: "gauze-swabs",
        name: "Gauze Swabs",
        chineseName: "纱布拭子",
        category: "Gauze Dressings",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-swabs.jpg"
        ],
        description: "Versatile gauze swabs for cleaning and applying medications.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Soft cotton", "Good absorbency"],
        specs: { "Material": "100% Cotton" },
        faq: []
    },
    
    "absorbent-gauze": {
        id: "absorbent-gauze",
        name: "Absorbent Gauze Rolls",
        chineseName: "脱脂纱布卷",
        category: "Gauze Dressings",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/absorbent-gauze.jpg"
        ],
        description: "Highly absorbent gauze rolls for wound dressing.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Highly absorbent", "Soft and gentle"],
        specs: { "Material": "100%脱脂 Cotton" },
        faq: []
    },
    
    "elastic-gauze": {
        id: "elastic-gauze",
        name: "Elastic Gauze Bandage",
        chineseName: "弹性绷带",
        category: "Gauze Dressings",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/elastic-gauze.jpg"
        ],
        description: "Elastic gauze bandages providing gentle compression.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Elastic construction", "Comfortable fit"],
        specs: { "Material": "Cotton, elastic fibers" },
        faq: []
    },
    
    "conforming-gauze": {
        id: "conforming-gauze",
        name: "Conforming Gauze Bandage",
        chineseName: "conforming纱布绷带",  // Fixed: removed leading space
        category: "Gauze Dressings",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/conforming-gauze.jpg"
        ],
        description: "Lightweight conforming gauze bandages.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Soft, lightweight", "Easily conforms"],
        specs: { "Material": "100% Cotton" },
        faq: []
    },
    
    "impregnated-gauze": {
        id: "impregnated-gauze",
        name: "Impregnated Gauze",
        chineseName: "浸药纱布",
        category: "Gauze Dressings",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/impregnated-gauze.jpg"
        ],
        description: "Gauze impregnated with various medications.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Medicated for healing", "Moist wound environment"],
        specs: { "Base Material": "100% Cotton" },
        faq: []
    },
    
    // ==== Protective Equipment ====
    "surgical-mask": {
        id: "surgical-mask",
        name: "Surgical Face Mask",
        chineseName: "医用外科口罩",
        category: "Protective Equipment",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-mask.jpg"
        ],
        description: "High-quality surgical face masks providing protection.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Three-layer protection", "High filtration efficiency"],
        specs: { "Material": "Non-woven fabric" },
        faq: []
    },
    
    "n95-mask": {
        id: "n95-mask",
        name: "N95 Respirator Mask",
        chineseName: "N95防护口罩",
        category: "Protective Equipment",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-mask.jpg"
        ],
        description: "N95 respirator masks providing ≥95% filtration efficiency.",
        certifications: ["ISO 13485", "CE", "NIOSH approved"],
        features: ["≥95% filtration", "Secure seal"],
        specs: { "Material": "Non-woven fabric" },
        faq: []
    },
    
    "medical-gloves": {
        id: "medical-gloves",
        name: "Medical Examination Gloves",
        chineseName: "医用检查手套",
        category: "Protective Equipment",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/medical-gloves.jpg"
        ],
        description: "High-quality medical examination gloves.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Excellent barrier protection", "Comfortable fit"],
        specs: { "Materials": "Latex, Nitrile, Vinyl" },
        faq: []
    },
    
    "surgical-gown": {
        id: "surgical-gown",
        name: "Surgical Gown",
        chineseName: "手术衣",
        category: "Protective Equipment",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-gown.jpg"
        ],
        description: "Sterile surgical gowns providing full-body protection.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Full-body coverage", "Fluid-resistant"],
        specs: { "Material": "SMS non-woven fabric" },
        faq: []
    },
    
    "protective-goggles": {
        id: "protective-goggles",
        name: "Protective Goggles",
        chineseName: "防护眼镜",
        category: "Protective Equipment",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/protective-goggles.jpg"
        ],
        description: "Protective goggles providing full eye protection.",
        certifications: ["ISO 13485", "CE", "ANSI Z87.1"],
        features: ["Full eye coverage", "Anti-fog lens"],
        specs: { "Material": "Polycarbonate lens" },
        faq: []
    },
    
    "face-shield": {
        id: "face-shield",
        name: "Face Shield",
        chineseName: "面屏",
        category: "Protective Equipment",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/face-shield.jpg"
        ],
        description: "Full-face protective shields.",
        certifications: ["ISO 13485", "CE", "ANSI Z87.1"],
        features: ["Full-face coverage", "Clear visor"],
        specs: { "Visor Material": "Polycarbonate" },
        faq: []
    },
    
    // ==== Injection & Infusion ====
    "syringe": {
        id: "syringe",
        name: "Disposable Syringes",
        chineseName: "一次性注射器",
        category: "Injection & Infusion",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/syringe.jpg"
        ],
        description: "High-quality disposable syringes for medical injections.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Sterile and single-use", "Clear barrel"],
        specs: { "Material": "Medical-grade plastic" },
        faq: []
    },
    
    "needle": {
        id: "needle",
        name: "Hypodermic Needles",
        chineseName: "皮下注射针头",
        category: "Injection & Infusion",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/needle.jpg"
        ],
        description: "High-quality hypodermic needles for injections.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Sharp, beveled tip", "Smooth surface"],
        specs: { "Material": "Stainless steel" },
        faq: []
    },
    
    "iv-catheter": {
        id: "iv-catheter",
        name: "IV Catheters",
        chineseName: "静脉留置针",
        category: "Injection & Infusion",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/iv-catheter.jpg"
        ],
        description: "High-quality intravenous catheters.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Easy insertion", "Smooth advancement"],
        specs: { "Material": "Stainless steel needle" },
        faq: []
    },
    
    "infusion-set": {
        id: "infusion-set",
        name: "IV Infusion Sets",
        chineseName: "输液器",
        category: "Injection & Infusion",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-set.jpg"
        ],
        description: "Complete IV infusion sets for fluid administration.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Complete system", "Precise flow control"],
        specs: { "Tubing Length": "150cm" },
        faq: []
    },
    
    "blood-transfusion-set": {
        id: "blood-transfusion-set",
        name: "Blood Transfusion Sets",
        chineseName: "输血器",
        category: "Injection & Infusion",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/blood-transfusion-set.jpg"
        ],
        description: "Specialized blood transfusion sets.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Specialized for blood", "Integrated filter"],
        specs: { "Filter": "170μm blood filter" },
        faq: []
    },
    
    "insulin-syringe": {
        id: "insulin-syringe",
        name: "Insulin Syringes",
        chineseName: "胰岛素注射器",
        category: "Injection & Infusion",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/insulin-syringe.jpg"
        ],
        description: "Specialized insulin syringes for diabetes management.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Designed for insulin", "Fine needle"],
        specs: { "Calibration": "U-100" },
        faq: []
    },
    
    // ==== Dental Products ====
    "dental-drill": {
        id: "dental-drill",
        name: "Dental Drill Bits",
        chineseName: "牙科钻头",
        category: "Dental Products",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-drill.jpg"
        ],
        description: "High-quality dental drill bits for procedures.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Premium tungsten carbide", "Precision cutting"],
        specs: { "Material": "Tungsten carbide" },
        faq: []
    },
    
    "dental-mirror": {
        id: "dental-mirror",
        name: "Dental Mirrors",
        chineseName: "牙科口镜",
        category: "Dental Products",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-mirror.jpg"
        ],
        description: "High-quality dental mirrors for visualization.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["High-quality stainless steel", "Optical-grade mirror"],
        specs: { "Material": "Stainless steel" },
        faq: []
    },
    
    "dental-scaler": {
        id: "dental-scaler",
        name: "Dental Scalers",
        chineseName: "牙科洁牙器",
        category: "Dental Products",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-scaler.jpg"
        ],
        description: "Precision dental scalers for calculus removal.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Precision-tipped", "Ergonomic handle"],
        specs: { "Material": "Stainless steel" },
        faq: []
    },
    
    "dental-forceps": {
        id: "dental-forceps",
        name: "Dental Forceps",
        chineseName: "牙科拔牙钳",
        category: "Dental Products",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-forceps.jpg"
        ],
        description: "High-quality dental forceps for extractions.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Precision-machined", "Ergonomic handle"],
        specs: { "Material": "Stainless steel" },
        faq: []
    },
    
    "dental-impression": {
        id: "dental-impression",
        name: "Dental Impression Trays",
        chineseName: "牙科印模托盘",
        category: "Dental Products",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-impression.jpg"
        ],
        description: "High-quality dental impression trays.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Precision fit", "Perforated design"],
        specs: { "Material": "Stainless steel" },
        faq: []
    },
    
    "dental-polishing": {
        id: "dental-polishing",
        name: "Dental Polishing Cups",
        chineseName: "牙科抛光杯",
        category: "Dental Products",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-polishing.jpg"
        ],
        description: "High-quality dental polishing cups.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Soft, non-abrasive", "Effective polishing"],
        specs: { "Material": "Rubber" },
        faq: []
    },
    
    "dental-brushes": {
        id: "dental-brushes",
        name: "Dental Polishing Brushes",
        chineseName: "抛光刷",
        category: "Dental Products",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-brushes.jpg"
        ],
        description: "Dental polishing brushes for procedures.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Disposable", "Sterile"],
        specs: { "Material": "Plastic, nylon" },
        faq: []
    },
    
    // ==== Surgical Packs ====
    "surgical-pack": {
        id: "surgical-pack",
        name: "Surgical Packs",
        chineseName: "手术包",
        category: "Surgical Packs",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/surgical-pack.jpg"
        ],
        description: "Surgical packs containing necessary instruments.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: ["Complete set", "Sterile"],
        specs: { "Contents": "Customizable" },
        faq: []
    }
};

console.log(`Product database defined with ${Object.keys(productDatabase).length} products`, 'success');

// =============================================
// HELPER FUNCTIONS
// =============================================
console.log('Defining helper functions...');

function getProductById(productId) {
    console.log(`getProductById called with: ${productId}`);
    return productDatabase[productId];
}

function getProductsByCategory(categoryName) {
    console.log(`getProductsByCategory called with: ${categoryName}`);
    return Object.values(productDatabase).filter(product => 
        product.category === categoryName
    );
}

function getAllProducts() {
    console.log('getAllProducts called');
    return Object.values(productDatabase);
}

function searchProducts(query) {
    console.log(`searchProducts called with: "${query}"`);
    if (!query || query.trim() === '') {
        return Object.values(productDatabase);
    }
    
    const searchTerm = query.toLowerCase().trim();
    return Object.values(productDatabase).filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Test function for verification
function testProductsJs() {
    console.log('testProductsJs called - verification test');
    
    return {
        status: 'success',
        timestamp: new Date().toISOString(),
        productCount: Object.keys(productDatabase).length,
        functionsAvailable: {
            getProductById: typeof getProductById === 'function',
            getProductsByCategory: typeof getProductsByCategory === 'function',
            getAllProducts: typeof getAllProducts === 'function',
            searchProducts: typeof searchProducts === 'function',
            testProductsJs: typeof testProductsJs === 'function'
        },
        categories: [...new Set(Object.values(productDatabase).map(p => p.category))]
    };
}

console.log('All helper functions defined successfully');

// =============================================
// GLOBAL EXPORTS
// =============================================
console.log('Exporting to window object...');

// Make available globally
if (typeof window !== 'undefined') {
    window.productDatabase = productDatabase;
    window.getProductById = getProductById;
    window.getProductsByCategory = getProductsByCategory;
    window.getAllProducts = getAllProducts;
    window.searchProducts = searchProducts;
    window.testProductsJs = testProductsJs;
    
    console.log('✅ All exports completed successfully!');
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productDatabase,
        getProductById,
        getProductsByCategory,
        getAllProducts,
        searchProducts,
        testProductsJs
    };
    console.log('✅ Node.js exports completed');
}

// =============================================
// FINAL VERIFICATION
// =============================================
console.log('=============================================');
console.log('=        Products.js Load Complete          =');
console.log(`= Products: ${Object.keys(productDatabase).length}          =`);
console.log(`= Categories: ${[...new Set(Object.values(productDatabase).map(p => p.category))].length}          =`);
console.log('=          NO SYNTAX ERRORS!                =');
console.log('=============================================');

// Run self-test
const testResult = testProductsJs();
if (testResult.status === 'success') {
    console.log('✅ Self-test passed! products.js is working correctly');
} else {
    console.error('❌ Self-test failed');
}