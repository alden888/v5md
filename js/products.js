// ===== Optimized Product Database for V5 Medical =====
// This file contains the complete product database with optimized image paths
// based on the GitHub repository structure

const productDatabase = {
  // ===== Surgical Sutures =====
  "pga-absorbable-suture": {
    id: "pga-absorbable-suture",
    name: "PGA Absorbable Suture",
    chineseName: "PGA可吸收缝合线",
    category: "Surgical Sutures",
    categoryName: "Surgical Sutures",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pga-absorbable-suture.jpg"
    ],
    description: "PGA sutures are synthetic absorbable sutures suitable for general and soft tissue surgery. Manufactured under ISO 13485 quality system.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Absorbable synthetic material",
      "Smooth tissue passage",
      "High tensile strength retention",
      "Biocompatible"
    ],
    specs: {
      "Material": "PGA",
      "Absorption Time": "60–90 days",
      "Sizes": "USP 6/0 – 2",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Is this suture CE and FDA certified?",
        a: "Yes, this product is manufactured under ISO 13485 quality system and complies with CE and FDA requirements."
      },
      {
        q: "Can you provide OEM or private labeling?",
        a: "Yes, OEM and private label services are available based on order quantity."
      },
      {
        q: "What is the minimum order quantity?",
        a: "MOQ depends on specification and packaging requirements. Please contact us for details."
      }
    ]
  },

  "pgla-absorbable-suture": {
    id: "pgla-absorbable-suture",
    name: "PGLA Absorbable Suture",
    chineseName: "PGLA可吸收缝合线",
    category: "Surgical Sutures",
    categoryName: "Surgical Sutures",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pgla-absorbable-suture.jpg"
    ],
    description: "PGLA sutures are copolymer absorbable sutures with excellent handling characteristics. Suitable for various surgical procedures.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Copolymer of PGA and PLA",
      "Controlled absorption profile",
      "Excellent knot security",
      "Minimal tissue reaction"
    ],
    specs: {
      "Material": "PGLA",
      "Absorption Time": "90–120 days",
      "Sizes": "USP 6/0 – 2",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Is this suture CE and FDA certified?",
        a: "Yes, this product is manufactured under ISO 13485 quality system and complies with CE and FDA requirements."
      },
      {
        q: "Can you provide OEM or private labeling?",
        a: "Yes, OEM and private label services are available based on order quantity."
      }
    ]
  },

  "chromic-catgut": {
    id: "chromic-catgut",
    name: "Chromic Catgut",
    chineseName: "铬制羊肠线",
    category: "Surgical Sutures",
    categoryName: "Surgical Sutures",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/chromic-catgut.jpg"
    ],
    description: "Chromic catgut sutures are natural absorbable sutures treated with chromic salt for delayed absorption. Ideal for soft tissue approximation.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Natural collagen material",
      "Chromic salt treated",
      "Gradual absorption",
      "Good tissue compatibility"
    ],
    specs: {
      "Material": "Chromic Catgut",
      "Absorption Time": "70–90 days",
      "Sizes": "USP 6/0 – 2",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Is this suture CE and FDA certified?",
        a: "Yes, this product is manufactured under ISO 13485 quality system and complies with CE and FDA requirements."
      }
    ]
  },

  "plain-catgut": {
    id: "plain-catgut",
    name: "Plain Catgut",
    chineseName: "普通羊肠线",
    category: "Surgical Sutures",
    categoryName: "Surgical Sutures",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/plain-catgut.jpg"
    ],
    description: "Plain catgut sutures are natural absorbable sutures for general soft tissue approximation and ligation.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Natural collagen material",
      "Rapid absorption",
      "Good handling properties",
      "Biodegradable"
    ],
    specs: {
      "Material": "Plain Catgut",
      "Absorption Time": "60–70 days",
      "Sizes": "USP 6/0 – 2",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Is this suture CE and FDA certified?",
        a: "Yes, this product is manufactured under ISO 13485 quality system and complies with CE and FDA requirements."
      }
    ]
  },

  "silk-suture": {
    id: "silk-suture",
    name: "Silk Suture",
    chineseName: "丝线缝合线",
    category: "Surgical Sutures",
    categoryName: "Surgical Sutures",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/silk-suture.jpg"
    ],
    description: "Silk sutures are non-absorbable sutures made from natural silk fibers. Ideal for general soft tissue approximation.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Natural silk material",
      "Excellent handling",
      "Good knot security",
      "Non-absorbable"
    ],
    specs: {
      "Material": "Silk",
      "Absorption": "Non-absorbable",
      "Sizes": "USP 6/0 – 2",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Is this suture CE and FDA certified?",
        a: "Yes, this product is manufactured under ISO 13485 quality system and complies with CE and FDA requirements."
      }
    ]
  },

  "nylon-suture": {
    id: "nylon-suture",
    name: "Nylon Suture",
    chineseName: "尼龙缝合线",
    category: "Surgical Sutures",
    categoryName: "Surgical Sutures",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/nylon-suture.jpg"
    ],
    description: "Nylon sutures are monofilament non-absorbable sutures with excellent tensile strength and minimal tissue reaction.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Monofilament nylon",
      "High tensile strength",
      "Minimal tissue drag",
      "Non-absorbable"
    ],
    specs: {
      "Material": "Nylon",
      "Absorption": "Non-absorbable",
      "Sizes": "USP 6/0 – 2",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Is this suture CE and FDA certified?",
        a: "Yes, this product is manufactured under ISO 13485 quality system and complies with CE and FDA requirements."
      }
    ]
  },

  "polypropylene-suture": {
    id: "polypropylene-suture",
    name: "Polypropylene Suture",
    chineseName: "聚丙烯缝合线",
    category: "Surgical Sutures",
    categoryName: "Surgical Sutures",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polypropylene-suture.jpg"
    ],
    description: "Polypropylene sutures are monofilament non-absorbable sutures with excellent tensile strength and biocompatibility.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Monofilament polypropylene",
      "High tensile strength",
      "Minimal tissue reaction",
      "Non-absorbable"
    ],
    specs: {
      "Material": "Polypropylene",
      "Absorption": "Non-absorbable",
      "Sizes": "USP 6/0 – 2",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Is this suture CE and FDA certified?",
        a: "Yes, this product is manufactured under ISO 13485 quality system and complies with CE and FDA requirements."
      }
    ]
  },

  "polyester-suture": {
    id: "polyester-suture",
    name: "Polyester Suture",
    chineseName: "聚酯缝合线",
    category: "Surgical Sutures",
    categoryName: "Surgical Sutures",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polyester-suture.jpg"
    ],
    description: "Polyester sutures are braided non-absorbable sutures with excellent handling characteristics and knot security.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Braided polyester",
      "Excellent knot security",
      "Good handling properties",
      "Non-absorbable"
    ],
    specs: {
      "Material": "Polyester",
      "Absorption": "Non-absorbable",
      "Sizes": "USP 6/0 – 2",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Is this suture CE and FDA certified?",
        a: "Yes, this product is manufactured under ISO 13485 quality system and complies with CE and FDA requirements."
      }
    ]
  },

  "pdo-suture": {
    id: "pdo-suture",
    name: "PDO Suture",
    chineseName: "PDO可吸收缝合线",
    category: "Surgical Sutures",
    categoryName: "Surgical Sutures",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pdo-suture.jpg"
    ],
    description: "PDO sutures are synthetic absorbable sutures with excellent tensile strength and controlled absorption profile.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Polydioxanone material",
      "Long-term strength retention",
      "Controlled absorption",
      "Biocompatible"
    ],
    specs: {
      "Material": "PDO",
      "Absorption Time": "180–210 days",
      "Sizes": "USP 6/0 – 2",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Is this suture CE and FDA certified?",
        a: "Yes, this product is manufactured under ISO 13485 quality system and complies with CE and FDA requirements."
      }
    ]
  },

  // ===== Surgical Instruments =====
  "surgical-blades": {
    id: "surgical-blades",
    name: "Surgical Blades",
    chineseName: "手术刀片",
    category: "Surgical Instruments",
    categoryName: "Surgical Instruments",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-blades.jpg"
    ],
    description: "Surgical blades made from high-quality stainless steel for precision cutting in surgical procedures.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "High-quality stainless steel",
      "Sharp cutting edge",
      "Sterile packaging",
      "Various sizes available"
    ],
    specs: {
      "Material": "Stainless Steel",
      "Sizes": "10, 11, 12, 15, 20-25",
      "Sterilization": "EO",
      "Packaging": "Sterile individual packs",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these blades CE and FDA certified?",
        a: "Yes, our surgical blades are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "scalpels": {
    id: "scalpels",
    name: "Scalpels",
    chineseName: "手术刀",
    category: "Surgical Instruments",
    categoryName: "Surgical Instruments",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpels.jpg"
    ],
    description: "Disposable scalpels with plastic handles and stainless steel blades for surgical procedures.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Plastic handle",
      "Stainless steel blade",
      "Sterile packaging",
      "Ergonomic design"
    ],
    specs: {
      "Material": "Plastic handle, stainless steel blade",
      "Sizes": "Various blade sizes",
      "Sterilization": "EO",
      "Packaging": "Sterile individual packs",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these scalpels CE and FDA certified?",
        a: "Yes, our scalpels are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "lancets": {
    id: "lancets",
    name: "Lancets",
    chineseName: "采血针",
    category: "Surgical Instruments",
    categoryName: "Surgical Instruments",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/lancets.jpg"
    ],
    description: "Blood lancets for capillary blood sampling procedures. Available in various sizes.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Stainless steel needle",
      "Safety design",
      "Sterile packaging",
      "Various gauges available"
    ],
    specs: {
      "Material": "Stainless steel",
      "Gauges": "21G, 23G, 25G, 26G",
      "Sterilization": "EO",
      "Packaging": "Sterile individual packs",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these lancets CE and FDA certified?",
        a: "Yes, our lancets are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "surgical-scissors": {
    id: "surgical-scissors",
    name: "Surgical Scissors",
    chineseName: "手术剪刀",
    category: "Surgical Instruments",
    categoryName: "Surgical Instruments",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-scissors.jpg"
    ],
    description: "Surgical scissors made from high-quality stainless steel for various surgical procedures.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "High-quality stainless steel",
      "Sharp cutting edges",
      "Ergonomic handles",
      "Various types available"
    ],
    specs: {
      "Material": "Stainless Steel",
      "Types": "Straight, curved, blunt, sharp",
      "Sizes": "10cm - 25cm",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these scissors CE and FDA certified?",
        a: "Yes, our surgical scissors are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "forceps": {
    id: "forceps",
    name: "Forceps",
    chineseName: "镊子",
    category: "Surgical Instruments",
    categoryName: "Surgical Instruments",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps.jpg"
    ],
    description: "Surgical forceps for grasping and holding tissues during surgical procedures.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "High-quality stainless steel",
      "Precision tips",
      "Ergonomic design",
      "Various types available"
    ],
    specs: {
      "Material": "Stainless Steel",
      "Types": "Thumb, tissue, dressing",
      "Sizes": "10cm - 25cm",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these forceps CE and FDA certified?",
        a: "Yes, our forceps are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "needle-holders": {
    id: "needle-holders",
    name: "Needle Holders",
    chineseName: "持针器",
    category: "Surgical Instruments",
    categoryName: "Surgical Instruments",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/needle-holders.jpg"
    ],
    description: "Needle holders for holding surgical needles during suturing procedures.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "High-quality stainless steel",
      "Locking mechanism",
      "Ergonomic handles",
      "Various sizes available"
    ],
    specs: {
      "Material": "Stainless Steel",
      "Sizes": "12cm - 25cm",
      "Sterilization": "EO",
      "Packaging": "Sterile individual packs",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these needle holders CE and FDA certified?",
        a: "Yes, our needle holders are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  // ===== Gauze Dressings =====
  "gauze-swabs": {
    id: "gauze-swabs",
    name: "Gauze Swabs",
    chineseName: "纱布块",
    category: "Gauze Dressings",
    categoryName: "Gauze Dressings",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-swabs.jpg"
    ],
    description: "Sterile gauze swabs for wound dressing and cleaning. Made from 100% cotton.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "100% cotton",
      "Sterile",
      "High absorbency",
      "Various sizes available"
    ],
    specs: {
      "Material": "100% Cotton",
      "Sizes": "5x5cm, 7.5x7.5cm, 10x10cm",
      "Ply": "4 ply, 8 ply",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these gauze swabs CE and FDA certified?",
        a: "Yes, our gauze swabs are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "gauze-rolls": {
    id: "gauze-rolls",
    name: "Gauze Rolls",
    chineseName: "纱布卷",
    category: "Gauze Dressings",
    categoryName: "Gauze Dressings",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-rolls.jpg"
    ],
    description: "Gauze rolls for wound dressing and bandaging. Made from 100% cotton.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "100% cotton",
      "Soft and absorbent",
      "Easy to tear",
      "Various widths available"
    ],
    specs: {
      "Material": "100% Cotton",
      "Widths": "5cm, 7.5cm, 10cm",
      "Length": "5m, 10m",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these gauze rolls CE and FDA certified?",
        a: "Yes, our gauze rolls are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "gauze-balls": {
    id: "gauze-balls",
    name: "Gauze Balls",
    chineseName: "纱布球",
    category: "Gauze Dressings",
    categoryName: "Gauze Dressings",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-balls.jpg"
    ],
    description: "Sterile gauze balls for wound cleaning and dressing. Made from 100% cotton.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "100% cotton",
      "Sterile",
      "Soft texture",
      "Various sizes available"
    ],
    specs: {
      "Material": "100% Cotton",
      "Sizes": "1.5cm, 2cm, 2.5cm",
      "Quantity": "10s, 20s, 50s",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these gauze balls CE and FDA certified?",
        a: "Yes, our gauze balls are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "abdominal-pads": {
    id: "abdominal-pads",
    name: "Abdominal Pads",
    chineseName: "腹部垫",
    category: "Gauze Dressings",
    categoryName: "Gauze Dressings",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/abdominal-pads.jpg"
    ],
    description: "Abdominal pads for large wound dressing and absorption. Made from 100% cotton.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "100% cotton",
      "High absorbency",
      "Sterile",
      "Non-adherent"
    ],
    specs: {
      "Material": "100% Cotton",
      "Sizes": "10x20cm, 15x20cm, 20x30cm",
      "Absorbency": "High",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these abdominal pads CE and FDA certified?",
        a: "Yes, our abdominal pads are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "cotton-rolls": {
    id: "cotton-rolls",
    name: "Cotton Rolls",
    chineseName: "棉卷",
    category: "Gauze Dressings",
    categoryName: "Gauze Dressings",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-rolls.jpg"
    ],
    description: "Cotton rolls for dental and medical applications. Made from 100% pure cotton.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "100% pure cotton",
      "Soft and absorbent",
      "Non-linting",
      "Various sizes available"
    ],
    specs: {
      "Material": "100% Cotton",
      "Sizes": "1.5cm x 5cm, 2cm x 5cm",
      "Quantity": "100s, 500s",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these cotton rolls CE and FDA certified?",
        a: "Yes, our cotton rolls are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "cotton-balls": {
    id: "cotton-balls",
    name: "Cotton Balls",
    chineseName: "棉球",
    category: "Gauze Dressings",
    categoryName: "Gauze Dressings",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-balls.jpg"
    ],
    description: "Sterile cotton balls for wound cleaning and application of medications. Made from 100% pure cotton.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "100% pure cotton",
      "Soft and absorbent",
      "Sterile",
      "Uniform size"
    ],
    specs: {
      "Material": "100% Cotton",
      "Sizes": "1g, 2g",
      "Quantity": "50s, 100s, 200s",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these cotton balls CE and FDA certified?",
        a: "Yes, our cotton balls are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "non-woven-sponges": {
    id: "non-woven-sponges",
    name: "Non-woven Sponges",
    chineseName: "无纺布海绵",
    category: "Gauze Dressings",
    categoryName: "Gauze Dressings",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/non-woven-sponges.jpg"
    ],
    description: "Non-woven sponges for wound dressing and cleaning. Made from non-woven materials.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Non-woven material",
      "High absorbency",
      "Soft texture",
      "Non-linting"
    ],
    specs: {
      "Material": "Non-woven",
      "Sizes": "5x5cm, 7.5x7.5cm",
      "Ply": "4 ply, 8 ply",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these non-woven sponges CE and FDA certified?",
        a: "Yes, our non-woven sponges are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  // ===== Protective Equipment =====
  "surgical-face-masks": {
    id: "surgical-face-masks",
    name: "Surgical Face Masks",
    chineseName: "医用口罩",
    category: "Protective Equipment",
    categoryName: "Protective Equipment",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-face-masks.jpg"
    ],
    description: "Surgical face masks for medical professionals. 3-ply with ear loops.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "3-ply construction",
      "Ear loops",
      "Bacterial filtration efficiency >95%",
      "Comfortable fit"
    ],
    specs: {
      "Material": "Non-woven fabric",
      "Layers": "3 ply",
      "BFE": ">95%",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these masks CE and FDA certified?",
        a: "Yes, our surgical face masks are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "n95-ffp2-masks": {
    id: "n95-ffp2-masks",
    name: "N95 / FFP2 Masks",
    chineseName: "N95/FFP2口罩",
    category: "Protective Equipment",
    categoryName: "Protective Equipment",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-ffp2-masks.jpg"
    ],
    description: "N95/FFP2 respirator masks for high level protection against airborne particles.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "FFP2/N95 certified",
      "Filtration efficiency >94%",
      "Adjustable nose clip",
      "Ear loops or head straps"
    ],
    specs: {
      "Material": "Non-woven fabric",
      "Certification": "FFP2/N95",
      "PFE": ">94%",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these masks CE and FDA certified?",
        a: "Yes, our N95/FFP2 masks are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "disposable-caps": {
    id: "disposable-caps",
    name: "Disposable Caps",
    chineseName: "一次性帽子",
    category: "Protective Equipment",
    categoryName: "Protective Equipment",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/disposable-caps.jpg"
    ],
    description: "Disposable bouffant caps for medical professionals. Elasticated for comfortable fit.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Non-woven material",
      "Elasticated",
      "Lightweight",
      "Various colors available"
    ],
    specs: {
      "Material": "Non-woven fabric",
      "Size": "Universal",
      "Color": "Blue, white",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these caps CE and FDA certified?",
        a: "Yes, our disposable caps are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "surgical-gowns": {
    id: "surgical-gowns",
    name: "Surgical Gowns",
    chineseName: "手术衣",
    category: "Protective Equipment",
    categoryName: "Protective Equipment",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-gowns.jpg"
    ],
    description: "Surgical gowns for medical professionals. Fluid resistant and sterile.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Fluid resistant",
      "Sterile",
      "Elastic cuffs",
      "Tie back closure"
    ],
    specs: {
      "Material": "Non-woven fabric",
      "Level": "AAMI Level 3",
      "Sizes": "S, M, L, XL",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these gowns CE and FDA certified?",
        a: "Yes, our surgical gowns are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "isolation-gowns": {
    id: "isolation-gowns",
    name: "Isolation Gowns",
    chineseName: "隔离衣",
    category: "Protective Equipment",
    categoryName: "Protective Equipment",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/isolation-gowns.jpg"
    ],
    description: "Isolation gowns for medical professionals. Protective against fluids and contaminants.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Fluid resistant",
      "Comfortable fit",
      "Tie back closure",
      "Various levels available"
    ],
    specs: {
      "Material": "Non-woven fabric",
      "Level": "AAMI Level 2",
      "Sizes": "S, M, L, XL",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these isolation gowns CE and FDA certified?",
        a: "Yes, our isolation gowns are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "shoe-covers": {
    id: "shoe-covers",
    name: "Shoe Covers",
    chineseName: "鞋套",
    category: "Protective Equipment",
    categoryName: "Protective Equipment",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/shoe-covers.jpg"
    ],
    description: "Disposable shoe covers for medical professionals. Elasticated for secure fit.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Non-woven material",
      "Elasticated",
      "Water resistant",
      "Universal size"
    ],
    specs: {
      "Material": "Non-woven fabric",
      "Size": "Universal",
      "Color": "Blue, white",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these shoe covers CE and FDA certified?",
        a: "Yes, our shoe covers are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  // ===== Injection & Infusion =====
  "disposable-syringes": {
    id: "disposable-syringes",
    name: "Disposable Syringes",
    chineseName: "一次性注射器",
    category: "Injection & Infusion",
    categoryName: "Injection & Infusion",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/disposable-syringes.jpg"
    ],
    description: "Disposable syringes with needles for medical injections. Sterile and individually packaged.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Sterile",
      "Individually packaged",
      "Latex-free",
      "Various sizes available"
    ],
    specs: {
      "Material": "PP, stainless steel needle",
      "Sizes": "1ml, 2ml, 5ml, 10ml, 20ml, 50ml",
      "Needle Gauge": "21G, 22G, 23G, 25G",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these syringes CE and FDA certified?",
        a: "Yes, our disposable syringes are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "insulin-syringes": {
    id: "insulin-syringes",
    name: "Insulin Syringes",
    chineseName: "胰岛素注射器",
    category: "Injection & Infusion",
    categoryName: "Injection & Infusion",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/insulin-syringes.jpg"
    ],
    description: "Insulin syringes for diabetes patients. Designed for precise insulin injections.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Sterile",
      "Individually packaged",
      "Fine needle",
      "Easy to read markings"
    ],
    specs: {
      "Material": "PP, stainless steel needle",
      "Sizes": "0.3ml, 0.5ml, 1ml",
      "Needle Gauge": "29G, 30G",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these insulin syringes CE and FDA certified?",
        a: "Yes, our insulin syringes are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "hypodermic-needles": {
    id: "hypodermic-needles",
    name: "Hypodermic Needles",
    chineseName: "皮下注射针",
    category: "Injection & Infusion",
    categoryName: "Injection & Infusion",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/hypodermic-needles.jpg"
    ],
    description: "Hypodermic needles for medical injections. Sterile and individually packaged.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Stainless steel",
      "Sterile",
      "Individually packaged",
      "Various gauges available"
    ],
    specs: {
      "Material": "Stainless steel",
      "Gauges": "18G-30G",
      "Lengths": "13mm-80mm",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these hypodermic needles CE and FDA certified?",
        a: "Yes, our hypodermic needles are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "iv-cannula": {
    id: "iv-cannula",
    name: "IV Cannula",
    chineseName: "静脉套管针",
    category: "Injection & Infusion",
    categoryName: "Injection & Infusion",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/iv-cannula.jpg"
    ],
    description: "IV cannula for intravenous therapy. With wings and injection port.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Stainless steel needle",
      "Plastic cannula",
      "Wings for secure fixation",
      "Injection port"
    ],
    specs: {
      "Material": "Stainless steel, plastic",
      "Gauges": "14G-24G",
      "Lengths": "25mm-45mm",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these IV cannulas CE and FDA certified?",
        a: "Yes, our IV cannulas are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "infusion-sets": {
    id: "infusion-sets",
    name: "Infusion Sets",
    chineseName: "输液器",
    category: "Injection & Infusion",
    categoryName: "Injection & Infusion",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-sets.jpg"
    ],
    description: "Infusion sets for intravenous therapy. With drip chamber and roller clamp.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "PVC tubing",
      "Drip chamber",
      "Roller clamp",
      "Needle or luer lock"
    ],
    specs: {
      "Material": "PVC, stainless steel",
      "Length": "150cm",
      "Needle Gauge": "18G-22G",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these infusion sets CE and FDA certified?",
        a: "Yes, our infusion sets are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "blood-transfusion-sets": {
    id: "blood-transfusion-sets",
    name: "Blood Transfusion Sets",
    chineseName: "输血器",
    category: "Injection & Infusion",
    categoryName: "Injection & Infusion",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/blood-transfusion-sets.jpg"
    ],
    description: "Blood transfusion sets for blood and blood product administration.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "PVC tubing",
      "Filter",
      "Roller clamp",
      "Needle or luer lock"
    ],
    specs: {
      "Material": "PVC, stainless steel",
      "Length": "150cm",
      "Filter": "170µm",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these blood transfusion sets CE and FDA certified?",
        a: "Yes, our blood transfusion sets are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  // ===== Dental Products =====
  "dental-examination-kits": {
    id: "dental-examination-kits",
    name: "Dental Examination Kits",
    chineseName: "牙科检查套件",
    category: "Dental Products",
    categoryName: "Dental Products",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-examination-kits.jpg"
    ],
    description: "Dental examination kits containing all necessary instruments for dental check-ups.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Complete set",
      "Sterile",
      "Disposable",
      "Various configurations available"
    ],
    specs: {
      "Contents": "Mouth mirror, probe, tweezers",
      "Material": "Plastic, stainless steel",
      "Sterilization": "EO",
      "Packaging": "Sterile individual packs",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these dental examination kits CE and FDA certified?",
        a: "Yes, our dental examination kits are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "saliva-ejectors": {
    id: "saliva-ejectors",
    name: "Saliva Ejectors",
    chineseName: "吸唾器",
    category: "Dental Products",
    categoryName: "Dental Products",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/saliva-ejectors.jpg"
    ],
    description: "Saliva ejectors for dental procedures. Disposable and sterile.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Disposable",
      "Sterile",
      "Flexible",
      "Various lengths available"
    ],
    specs: {
      "Material": "Plastic",
      "Length": "15cm-20cm",
      "Color": "Clear",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these saliva ejectors CE and FDA certified?",
        a: "Yes, our saliva ejectors are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "dental-bibs": {
    id: "dental-bibs",
    name: "Dental Bibs",
    chineseName: "牙科围巾",
    category: "Dental Products",
    categoryName: "Dental Products",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-bibs.jpg"
    ],
    description: "Dental bibs for patient protection during dental procedures.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Water resistant",
      "Tissue paper",
      "Poly backing",
      "Various sizes available"
    ],
    specs: {
      "Material": "Tissue/poly",
      "Sizes": "33x45cm, 45x45cm",
      "Color": "Blue",
      "Quantity": "50s, 100s",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these dental bibs CE and FDA certified?",
        a: "Yes, our dental bibs are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "impression-trays": {
    id: "impression-trays",
    name: "Impression Trays",
    chineseName: "印模托盘",
    category: "Dental Products",
    categoryName: "Dental Products",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/impression-trays.jpg"
    ],
    description: "Dental impression trays for taking dental impressions. Disposable and sterile.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Disposable",
      "Sterile",
      "Various sizes",
      "Perforated design"
    ],
    specs: {
      "Material": "Plastic",
      "Sizes": "Small, medium, large",
      "Type": "Upper, lower",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these impression trays CE and FDA certified?",
        a: "Yes, our impression trays are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "polishing-cups": {
    id: "polishing-cups",
    name: "Polishing Cups",
    chineseName: "抛光杯",
    category: "Dental Products",
    categoryName: "Dental Products",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/polishing-cups.jpg"
    ],
    description: "Dental polishing cups for teeth polishing procedures. Disposable and sterile.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Disposable",
      "Sterile",
      "Soft material",
      "Various sizes available"
    ],
    specs: {
      "Material": "Rubber",
      "Sizes": "Small, medium, large",
      "Color": "White",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these polishing cups CE and FDA certified?",
        a: "Yes, our polishing cups are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  "polishing-brushes": {
    id: "polishing-brushes",
    name: "Polishing Brushes",
    chineseName: "抛光刷",
    category: "Dental Products",
    categoryName: "Dental Products",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/polishing-brushes.jpg"
    ],
    description: "Dental polishing brushes for teeth polishing procedures. Disposable and sterile.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Disposable",
      "Sterile",
      "Soft bristles",
      "Various designs available"
    ],
    specs: {
      "Material": "Plastic, nylon",
      "Types": "Flat, pointed",
      "Color": "White",
      "Sterilization": "EO",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these polishing brushes CE and FDA certified?",
        a: "Yes, our polishing brushes are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  },

  // ===== Surgical Packs =====
  "surgical-packs": {
    id: "surgical-packs",
    name: "Surgical Packs",
    chineseName: "手术包",
    category: "Surgical Packs",
    categoryName: "Surgical Packs",
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/surgical-packs.jpg"
    ],
    description: "Surgical packs containing all necessary instruments and supplies for specific surgical procedures.",
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [
      "Complete set",
      "Sterile",
      "Customizable",
      "Various configurations available"
    ],
    specs: {
      "Contents": "Customizable",
      "Material": "Various",
      "Sterilization": "EO",
      "Packaging": "Sterile individual packs",
      "OEM": "Available"
    },
    faq: [
      {
        q: "Are these surgical packs CE and FDA certified?",
        a: "Yes, our surgical packs are manufactured under ISO 13485 quality system and comply with CE and FDA requirements."
      }
    ]
  }
};

// ===== Helper functions =====
function getProductById(productId) {
  return productDatabase[productId];
}

function getProductsByCategory(categoryName) {
  return Object.values(productDatabase).filter(product => 
    product.category === categoryName
  );
}

function getAllProducts() {
  return Object.values(productDatabase);
}

function searchProducts(query) {
  const searchTerm = query.toLowerCase();
  return Object.values(productDatabase).filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
}

// ===== Export for web usage =====
if (typeof window !== 'undefined') {
  window.productDatabase = productDatabase;
  window.getProductById = getProductById;
  window.getProductsByCategory = getProductsByCategory;
  window.getAllProducts = getAllProducts;
  window.searchProducts = searchProducts;
}

// ===== Export for Node.js usage =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    productDatabase,
    getProductById,
    getProductsByCategory,
    getAllProducts,
    searchProducts
  };
}