// V5 Medical Product Database
// Last Updated: 2025-12-12
// Total Products: 39

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
            },
            {
                q: "Are these sutures suitable for all surgical procedures?",
                a: "These sutures are suitable for most soft tissue approximation procedures. For specific procedures, please consult with your surgical team."
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
            },
            {
                q: "Are these sutures MRI compatible?",
                a: "Our polypropylene and nylon sutures are MRI compatible. Silk sutures may cause some artifact, and stainless steel sutures are not MRI compatible."
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
        description: "Polyglycolic acid-lactic acid copolymer sutures offering balanced absorption characteristics and tensile strength retention. Ideal for a wide range of surgical applications.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Balanced absorption profile",
            "Gradual strength loss",
            "Excellent tissue compatibility",
            "Smooth handling properties",
            "Secure knot tying"
        ],
        specs: {
            "Material": "PGLA Copolymer",
            "Sizes": "4/0, 3/0, 2/0, 0, 1",
            "Length": "75cm",
            "Needle Type": "Reverse cutting",
            "Absorption Time": "90-120 days"
        },
        faq: [
            {
                q: "What is the advantage of PGLA sutures compared to other absorbable sutures?",
                a: "PGLA sutures provide a longer absorption time and maintain tensile strength longer than pure PGA sutures, making them ideal for procedures requiring extended wound support."
            },
            {
                q: "Are PGLA sutures suitable for pediatric use?",
                a: "Yes, PGLA sutures are suitable for pediatric use when appropriate for the specific procedure and patient condition."
            }
        ]
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
        description: "Traditional chromic catgut sutures treated with chromium salts to delay absorption. Made from purified collagen for natural tissue compatibility.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Natural collagen material",
            "Good tissue acceptance",
            "Controlled absorption",
            "Smooth handling",
            "Cost-effective option"
        ],
        specs: {
            "Material": "Chromic-treated collagen",
            "Sizes": "3/0, 2/0, 0, 1",
            "Length": "75cm",
            "Needle Type": "Taper point",
            "Absorption Time": "14-21 days"
        },
        faq: [
            {
                q: "What is the difference between plain and chromic catgut?",
                a: "Chromic catgut is treated with chromium salts which delays absorption compared to plain catgut, providing longer wound support."
            },
            {
                q: "Are there any allergy concerns with catgut sutures?",
                a: "Catgut sutures are made from collagen, typically from sheep or cow intestines. Patients with known allergies to these materials should use alternative suture materials."
            }
        ]
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
        description: "Monofilament nylon sutures offering excellent strength and flexibility. Ideal for skin closure and other procedures requiring permanent support.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Exceptional tensile strength",
            "Smooth monofilament design",
            "Excellent flexibility",
            "Resistant to infection",
            "Easy to remove when necessary"
        ],
        specs: {
            "Material": "Nylon",
            "Sizes": "4/0, 3/0, 2/0, 0, 1, 2",
            "Length": "75cm, 100cm",
            "Needle Type": "Reverse cutting",
            "Color": "Black, blue"
        },
        faq: [
            {
                q: "Is nylon suture suitable for skin closure?",
                a: "Yes, nylon suture is commonly used for skin closure due to its excellent strength, flexibility, and low tissue reactivity."
            },
            {
                q: "How long can nylon sutures remain in place?",
                a: "Nylon sutures can remain in place for 7-14 days depending on the location and healing progress, after which they should be removed."
            }
        ]
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
        description: "Monofilament polypropylene sutures with excellent tensile strength and minimal tissue reactivity. Suitable for a wide range of surgical applications including cardiovascular procedures.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Exceptional strength-to-size ratio",
            "Minimal tissue reactivity",
            "Smooth monofilament surface",
            "MRI compatible",
            "Excellent knot security"
        ],
        specs: {
            "Material": "Polypropylene",
            "Sizes": "5/0, 4/0, 3/0, 2/0, 0, 1",
            "Length": "75cm, 100cm",
            "Needle Type": "Reverse cutting, taper point",
            "Color": "Blue"
        },
        faq: [
            {
                q: "Is polypropylene suture suitable for cardiovascular surgery?",
                a: "Yes, polypropylene suture is commonly used in cardiovascular surgery due to its excellent strength, minimal tissue reactivity, and long-term stability."
            },
            {
                q: "Can polypropylene sutures be used in infected tissues?",
                a: "Polypropylene's smooth monofilament surface makes it more resistant to bacterial colonization compared to braided sutures, making it a good choice for use in potentially infected tissues."
            }
        ]
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
        description: "Braided silk sutures offering excellent handling characteristics and knot security. Made from high-quality silk for superior performance in various surgical procedures.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Excellent handling properties",
            "Superior knot security",
            "Good tissue compatibility",
            "Smooth passage through tissue",
            "High tensile strength"
        ],
        specs: {
            "Material": "Silk",
            "Sizes": "3/0, 2/0, 0, 1, 2",
            "Length": "75cm",
            "Needle Type": "Reverse cutting, taper point",
            "Color": "Black"
        },
        faq: [
            {
                q: "What are the advantages of silk sutures?",
                a: "Silk sutures offer excellent handling characteristics, superior knot security, and good tissue compatibility, making them a popular choice for many surgical procedures."
            },
            {
                q: "Is silk suture absorbable?",
                a: "Silk is a non-absorbable suture material, though it does undergo gradual degradation over time (approximately 1-2 years) in the body."
            }
        ]
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
        description: "Sterile stainless steel sutures providing maximum tensile strength for orthopedic, thoracic, and other high-stress surgical procedures. Available in monofilament and twisted varieties.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Maximum tensile strength",
            "Excellent biocompatibility",
            "Resistant to corrosion",
            "Suitable for high-stress applications",
            "Sterile and non-absorbable"
        ],
        specs: {
            "Material": "316L Stainless Steel",
            "Sizes": "20 gauge to 4-0",
            "Length": "30cm, 45cm, 60cm",
            "Type": "Monofilament, twisted",
            "Color": "Metallic"
        },
        faq: [
            {
                q: "What procedures are stainless steel sutures typically used for?",
                a: "Stainless steel sutures are commonly used in orthopedic surgery, thoracic surgery, and other procedures requiring maximum tensile strength and long-term stability."
            },
            {
                q: "Are stainless steel sutures MRI compatible?",
                a: "No, stainless steel sutures are not MRI compatible and can cause significant artifact and potential patient risk during MRI procedures."
            }
        ]
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
        description: "Braided polyglycolic acid sutures offering reliable absorption and good tensile strength. Coated for improved handling and reduced tissue drag.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Reliable absorption profile",
            "Good initial tensile strength",
            "Coated for smooth handling",
            "Reduced tissue drag",
            "Secure knotting"
        ],
        specs: {
            "Material": "Polyglycolic Acid",
            "Sizes": "4/0, 3/0, 2/0, 0, 1",
            "Length": "75cm",
            "Needle Type": "Reverse cutting",
            "Absorption Time": "60-90 days"
        },
        faq: [
            {
                q: "What is the absorption process for polyglycolic acid sutures?",
                a: "Polyglycolic acid sutures are absorbed through hydrolysis, gradually losing tensile strength over 2-3 weeks and being completely absorbed within 60-90 days."
            },
            {
                q: "Are these sutures suitable for abdominal surgery?",
                a: "Yes, polyglycolic acid sutures are commonly used in abdominal surgery and other procedures requiring absorbable sutures with good tensile strength."
            }
        ]
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
        description: "High-quality stainless steel scalpel handles designed for secure blade attachment and precise surgical incisions. Available in various sizes to accommodate different blade types.",
        certifications: ["ISO 13485", "CE"],
        features: [
            "High-grade stainless steel construction",
            "Secure blade locking mechanism",
            "Ergonomic design for comfort",
            "Matte finish to reduce glare",
            "Autoclavable and reusable"
        ],
        specs: {
            "Material": "Stainless Steel",
            "Sizes": "3, 4, 7",
            "Finish": "Matte",
            "Sterilization": "Autoclavable",
            "Compatibility": "Standard scalpel blades"
        },
        faq: [
            {
                q: "What blade sizes are compatible with these handles?",
                a: "Size 3 handles accommodate blades 10-15, size 4 handles accommodate blades 20-25, and size 7 handles accommodate blades 10-15 and 18."
            },
            {
                q: "How should I sterilize these scalpel handles?",
                a: "These handles are autoclavable and can be sterilized using standard autoclave procedures (134°C for 3-5 minutes)."
            }
        ]
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
        description: "Precision surgical scissors for cutting tissue, sutures, and other materials during surgical procedures. Available in various types including Mayo, Metzenbaum, and iris scissors.",
        certifications: ["ISO 13485", "CE"],
        features: [
            "Sharp, precision-ground blades",
            "Smooth cutting action",
            "Ergonomic handle design",
            "Corrosion-resistant stainless steel",
            "Autoclavable and reusable"
        ],
        specs: {
            "Material": "Stainless Steel",
            "Types": "Mayo, Metzenbaum, Iris",
            "Length": "14cm, 16cm, 18cm, 20cm",
            "Blade Style": "Straight, curved",
            "Sterilization": "Autoclavable"
        },
        faq: [
            {
                q: "What is the difference between Mayo and Metzenbaum scissors?",
                a: "Mayo scissors have heavier blades and are used for cutting thick tissue, while Metzenbaum scissors have thinner, more delicate blades for cutting delicate tissue."
            },
            {
                q: "How often should surgical scissors be sharpened?",
                a: "The frequency of sharpening depends on usage, but generally after 10-15 uses or when cutting performance decreases."
            }
        ]
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
        description: "High-precision surgical forceps for grasping and manipulating tissue during surgical procedures. Available in toothed and non-toothed varieties for different applications.",
        certifications: ["ISO 13485", "CE"],
        features: [
            "Precision tips for delicate handling",
            "Secure grip design",
            "Ergonomic handle pattern",
            "Corrosion-resistant stainless steel",
            "Autoclavable and reusable"
        ],
        specs: {
            "Material": "Stainless Steel",
            "Types": "Toothed, non-toothed",
            "Length": "12cm, 14cm, 16cm, 18cm",
            "Tip Style": "Straight, curved",
            "Sterilization": "Autoclavable"
        },
        faq: [
            {
                q: "When should I use toothed vs. non-toothed forceps?",
                a: "Toothed forceps are used for grasping tough tissue like skin, while non-toothed forceps are used for delicate tissue like blood vessels and nerves."
            },
            {
                q: "How should I maintain my surgical forceps?",
                a: "Clean immediately after use, lubricate moving parts regularly, and sterilize according to recommended procedures to maintain performance and longevity."
            }
        ]
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
        description: "Reliable hemostatic forceps for controlling bleeding during surgical procedures. Available in straight and curved varieties with different tip sizes for various applications.",
        certifications: ["ISO 13485", "CE"],
        features: [
            "Precision-machined jaws for secure clamping",
            "Ratcheted locking mechanism",
            "Ergonomic handle design",
            "Corrosion-resistant stainless steel",
            "Autoclavable and reusable"
        ],
        specs: {
            "Material": "Stainless Steel",
            "Types": "Kelly, Crile, Mosquito",
            "Length": "12cm, 14cm, 16cm, 18cm",
            "Tip Style": "Straight, curved",
            "Sterilization": "Autoclavable"
        },
        faq: [
            {
                q: "What is the difference between Kelly, Crile, and Mosquito hemostats?",
                a: "Kelly hemostats have larger jaws for clamping larger vessels, Crile hemostats have smaller jaws, and Mosquito hemostats have the smallest jaws for delicate vessels."
            },
            {
                q: "How tight should hemostats be clamped?",
                a: "Hemostats should be clamped just tight enough to control bleeding without causing unnecessary tissue damage. The ratchet mechanism helps maintain consistent pressure."
            }
        ]
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
        description: "High-quality surgical retractors for holding back tissue and exposing surgical sites. Available in various types including Richardson, Army-Navy, and Senn retractors.",
        certifications: ["ISO 13485", "CE"],
        features: [
            "Sturdy construction for reliable performance",
            "Smooth edges to minimize tissue damage",
            "Ergonomic handle design",
            "Corrosion-resistant stainless steel",
            "Autoclavable and reusable"
        ],
        specs: {
            "Material": "Stainless Steel",
            "Types": "Richardson, Army-Navy, Senn",
            "Length": "16cm, 18cm, 20cm, 22cm",
            "Blade Style": "Straight, curved",
            "Sterilization": "Autoclavable"
        },
        faq: [
            {
                q: "What type of retractor is best for abdominal surgery?",
                a: "Richardson retractors are commonly used for abdominal surgery due to their wide blades that can retract large amounts of tissue."
            },
            {
                q: "How should retractors be cleaned after use?",
                a: "Retractors should be thoroughly cleaned with a soft brush to remove all tissue debris, then sterilized using autoclave or other appropriate methods."
            }
        ]
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
        description: "Precision needle holders for securely grasping and manipulating surgical needles during suturing. Available in various sizes with different jaw designs for optimal performance.",
        certifications: ["ISO 13485", "CE"],
        features: [
            "Diamond or cross-hatched jaw pattern for secure grip",
            "Ratcheted locking mechanism",
            "Ergonomic handle design",
            "Corrosion-resistant stainless steel",
            "Autoclavable and reusable"
        ],
        specs: {
            "Material": "Stainless Steel",
            "Sizes": "14cm, 16cm, 18cm",
            "Jaw Pattern": "Diamond, cross-hatched",
            "Tip Style": "Straight, curved",
            "Sterilization": "Autoclavable"
        },
        faq: [
            {
                q: "What is the advantage of diamond vs. cross-hatched jaws?",
                a: "Diamond jaws provide a more precise grip for delicate needles, while cross-hatched jaws provide a more secure grip for larger needles and heavier suturing."
            },
            {
                q: "How should I adjust the tension on my needle holder?",
                a: "Most needle holders have an adjustable tension screw near the pivot point. Adjust until the jaws close securely but can still be easily opened with one hand."
            }
        ]
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
        description: "High-quality sterile gauze sponges for wound care, dressing, and general medical use. Made from 100% cotton for superior absorbency and patient comfort.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Highly absorbent 100% cotton",
            "Sterile and ready to use",
            "Soft and non-irritating",
            "Low lint generation",
            "Available in various sizes"
        ],
        specs: {
            "Material": "100% Cotton",
            "Sizes": "5cmx5cm, 7.5cmx7.5cm, 10cmx10cm",
            "Ply": "4-ply, 8-ply",
            "Sterility": "Gamma sterilized",
            "Packaging": "Individual or multi-pack"
        },
        faq: [
            {
                q: "How should sterile gauze be stored?",
                a: "Sterile gauze should be stored in a cool, dry place and kept in its original packaging until ready to use to maintain sterility."
            },
            {
                q: "Is this gauze suitable for sensitive skin?",
                a: "Yes, our sterile gauze is made from soft, 100% cotton and is suitable for use on sensitive skin."
            }
        ]
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
        description: "High-quality non-sterile gauze sponges for general cleaning, prepping, and non-sterile wound care applications. Made from 100% cotton for good absorbency and durability.",
        certifications: ["ISO 13485", "CE"],
        features: [
            "Good absorbency cotton construction",
            "Economical option for non-sterile use",
            "Soft and durable",
            "Low lint generation",
            "Available in bulk packaging"
        ],
        specs: {
            "Material": "100% Cotton",
            "Sizes": "5cmx5cm, 7.5cmx7.5cm, 10cmx10cm",
            "Ply": "4-ply",
            "Sterility": "Non-sterile",
            "Packaging": "Bulk packs of 100 or 200"
        },
        faq: [
            {
                q: "What are common uses for non-sterile gauze?",
                a: "Non-sterile gauze is commonly used for cleaning skin before injections, applying medications, general cleaning, and for wounds that do not require sterile dressing."
            },
            {
                q: "Can non-sterile gauze be sterilized?",
                a: "While non-sterile gauze can be sterilized using autoclave, it is more economical to purchase pre-sterilized gauze for procedures requiring sterility."
            }
        ]
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
        description: "Versatile gauze swabs for cleaning, prepping, and applying medications. Available in both sterile and non-sterile options for various medical applications.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Soft cotton construction",
            "Good absorbency",
            "Flexible and easy to use",
            "Low linting",
            "Available in multiple sizes"
        ],
        specs: {
            "Material": "100% Cotton",
            "Sizes": "2.5cmx2.5cm, 5cmx5cm",
            "Ply": "4-ply",
            "Options": "Sterile, non-sterile",
            "Packaging": "Various pack sizes"
        },
        faq: [
            {
                q: "What is the difference between gauze swabs and gauze sponges?",
                a: "Gauze swabs are typically smaller and thinner, designed for precise applications like cleaning small areas or applying medications, while gauze sponges are larger and thicker for wound dressing."
            },
            {
                q: "Are these swabs suitable for dental use?",
                a: "Yes, our gauze swabs are suitable for dental use for procedures like drying teeth before fillings or controlling minor bleeding."
            }
        ]
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
        description: "Highly absorbent gauze rolls for wound dressing, packing, and general medical use. Made from 100%脱脂 cotton for maximum absorbency and patient comfort.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Highly absorbent脱脂 cotton",
            "Soft and gentle on skin",
            "Strong and durable",
            "Easy to tear and apply",
            "Available in various widths"
        ],
        specs: {
            "Material": "100%脱脂 Cotton",
            "Widths": "5cm, 7.5cm, 10cm",
            "Length": "5m per roll",
            "Weight": "40g/m²",
            "Packaging": "Individual rolls"
        },
        faq: [
            {
                q: "What is the advantage of脱脂 cotton gauze?",
                a: "脱脂 (degreased) cotton has had the natural oils removed, making it more absorbent and better suited for medical use compared to regular cotton."
            },
            {
                q: "How should gauze rolls be stored?",
                a: "Gauze rolls should be stored in a cool, dry place and kept in their packaging until use to maintain cleanliness and prevent contamination."
            }
        ]
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
        description: "Elastic gauze bandages providing gentle compression and secure support for sprains, strains, and wound dressing. Made with elastic fibers for comfortable fit and reliable performance.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Elastic construction for compression",
            "Comfortable fit for all-day wear",
            "Secure hold without slipping",
            "Breathable and skin-friendly",
            "Reusable and washable"
        ],
        specs: {
            "Material": "Cotton, elastic fibers",
            "Widths": "5cm, 7.5cm, 10cm",
            "Length": "4.5m per roll",
            "Stretch": "200-300%",
            "Color": "Beige"
        },
        faq: [
            {
                q: "How tight should an elastic bandage be applied?",
                a: "An elastic bandage should be applied snugly enough to provide support and compression but not so tight that it restricts circulation. You should be able to fit two fingers under the bandage."
            },
            {
                q: "Can elastic bandages be washed and reused?",
                a: "Yes, our elastic bandages are washable and reusable. Wash in warm water with mild detergent and air dry for best results."
            }
        ]
    },
    
    "conforming-gauze": {
        id: "conforming-gauze",
        name: "Conforming Gauze Bandage",
        chineseName: " conforming纱布绷带",
        category: "Gauze Dressings",
        price: "Contact for Price",
        availability: "In Stock",
        images: [
            "https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/conforming-gauze.jpg"
        ],
        description: "Lightweight conforming gauze bandages that easily conform to body contours for secure dressing retention. Ideal for securing dressings and providing light support.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Soft, lightweight construction",
            "Easily conforms to body shapes",
            "Secure hold without tightness",
            "Breathable and comfortable",
            "Easy to tear and apply"
        ],
        specs: {
            "Material": "100% Cotton",
            "Widths": "5cm, 7.5cm, 10cm",
            "Length": "4.5m per roll",
            "Stretch": "Conforming",
            "Color": "White"
        },
        faq: [
            {
                q: "What is the difference between conforming and elastic gauze?",
                a: "Conforming gauze stretches to conform to body shapes but does not provide significant compression, while elastic gauze provides both conformity and compression."
            },
            {
                q: "Is conforming gauze suitable for securing wound dressings?",
                a: "Yes, conforming gauze is ideal for securing wound dressings as it conforms to the body shape and holds dressings securely in place."
            }
        ]
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
        description: "Gauze impregnated with various medications for specialized wound care. Available with different formulations to promote healing and prevent infection in various wound types.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Medicated for enhanced healing",
            "Promotes moist wound environment",
            "Reduces pain and discomfort",
            "Facilitates autolytic debridement",
            "Available in various formulations"
        ],
        specs: {
            "Base Material": "100% Cotton",
            "Formulations": "Petrolatum, antibiotic, honey",
            "Sizes": "5cmx5cm, 10cmx10cm",
            "Sterility": "Sterile",
            "Packaging": "Individual packaging"
        },
        faq: [
            {
                q: "What types of impregnated gauze are available?",
                a: "We offer gauze impregnated with petrolatum (for dry wounds), antibiotics (for infected wounds), and medical-grade honey (for antimicrobial properties and wound healing)."
            },
            {
                q: "How often should impregnated gauze be changed?",
                a: "The frequency of changing depends on the type of impregnation and wound condition, but generally every 1-3 days or as directed by a healthcare professional."
            }
        ]
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
        description: "High-quality surgical face masks providing protection against droplets, bacteria, and other contaminants. Made with multiple layers for optimal filtration and comfort.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Three-layer protection system",
            "High bacterial filtration efficiency",
            "Comfortable ear loops",
            "Adjustable nose clip for secure fit",
            "Breathable and hypoallergenic"
        ],
        specs: {
            "Material": "Non-woven fabric",
            "Layers": "3-layer",
            "BFE": "≥95%",
            "PFE": "≥90%",
            "Packaging": "50 masks per box"
        },
        faq: [
            {
                q: "What is the difference between surgical masks and N95 respirators?",
                a: "Surgical masks provide barrier protection against droplets and large particles, while N95 respirators provide higher filtration efficiency for smaller particles and require a proper fit test."
            },
            {
                q: "How long can a surgical mask be worn?",
                a: "Surgical masks should be changed every 4-8 hours or sooner if they become wet, soiled, or damaged."
            }
        ]
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
        description: "N95 respirator masks providing ≥95% filtration efficiency against airborne particles. Designed for healthcare professionals and other users requiring high-level respiratory protection.",
        certifications: ["ISO 13485", "CE", "NIOSH approved"],
        features: [
            "≥95% filtration efficiency",
            "Secure seal around nose and mouth",
            "Adjustable nose clip",
            "Comfortable head straps",
            "Low breathing resistance"
        ],
        specs: {
            "Material": "Non-woven fabric, melt-blown filter",
            "Filtration Efficiency": "≥95%",
            "Particle Size": "0.3 microns",
            "Design": "Cup style, flat fold",
            "Certification": "NIOSH N95"
        },
        faq: [
            {
                q: "Do N95 masks protect against viruses?",
                a: "Yes, N95 masks are designed to filter out at least 95% of airborne particles, including viruses and bacteria, when properly fitted."
            },
            {
                q: "How should I perform a fit check with an N95 mask?",
                a: "After putting on the mask, cup both hands over the mask and exhale forcefully. If air leaks around the nose, adjust the nose clip. If air leaks around the edges, adjust the straps for a better fit."
            }
        ]
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
        description: "High-quality medical examination gloves providing barrier protection against contaminants. Available in latex, nitrile, and vinyl options to meet different needs and preferences.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Excellent barrier protection",
            "Comfortable fit and feel",
            "Good tactile sensitivity",
            "Powder-free options available",
            "Available in multiple sizes"
        ],
        specs: {
            "Materials": "Latex, Nitrile, Vinyl",
            "Sizes": "Small, Medium, Large, X-Large",
            "Powder": "Powdered, Powder-free",
            "Sterility": "Non-sterile",
            "Packaging": "100 gloves per box"
        },
        faq: [
            {
                q: "What is the difference between latex, nitrile, and vinyl gloves?",
                a: "Latex gloves offer excellent elasticity and tactile sensitivity but may cause allergies. Nitrile gloves are puncture-resistant and latex-free. Vinyl gloves are economical but less durable."
            },
            {
                q: "Are these gloves suitable for surgical procedures?",
                a: "These are examination gloves and not intended for surgical procedures. For surgery, please use sterile surgical gloves."
            }
        ]
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
        description: "Sterile surgical gowns providing full-body protection during surgical procedures. Made with high-quality materials for optimal barrier protection and comfort.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Full-body coverage and protection",
            "Fluid-resistant material",
            "Secure closure system",
            "Comfortable for extended wear",
            "Sterile and ready to use"
        ],
        specs: {
            "Material": "SMS non-woven fabric",
            "Sizes": "One size fits most",
            "Sterility": "Sterile",
            "Protection Level": "AAMI Level 4",
            "Packaging": "Individual sterile packaging"
        },
        faq: [
            {
                q: "What protection level do these surgical gowns provide?",
                a: "Our surgical gowns meet AAMI Level 4 standards, providing the highest level of protection against fluid penetration and microbial transfer."
            },
            {
                q: "How should surgical gowns be stored?",
                a: "Surgical gowns should be stored in a cool, dry place and kept in their sterile packaging until immediately before use."
            }
        ]
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
        description: "Protective goggles providing full eye protection against droplets, splashes, and airborne particles. Designed for comfort and safety in medical and industrial settings.",
        certifications: ["ISO 13485", "CE", "ANSI Z87.1"],
        features: [
            "Full eye coverage protection",
            "Anti-fog and scratch-resistant lens",
            "Adjustable headband for secure fit",
            "Comfortable for extended wear",
            "Impact-resistant construction"
        ],
        specs: {
            "Material": "Polycarbonate lens, PVC frame",
            "Lens Coating": "Anti-fog, scratch-resistant",
            "Adjustability": "Elastic headband",
            "Ventilation": "Indirect venting",
            "Certification": "ANSI Z87.1"
        },
        faq: [
            {
                q: "Can these goggles be worn over prescription glasses?",
                a: "Yes, our protective goggles are designed to fit over most prescription glasses for added convenience."
            },
            {
                q: "How should I clean and maintain these goggles?",
                a: "Clean with mild soap and water, avoid abrasive cleaners. Replace if the lens becomes significantly scratched or the frame is damaged."
            }
        ]
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
        description: "Full-face protective shields providing comprehensive protection against droplets, splashes, and airborne particles. Lightweight and comfortable for extended wear in medical settings.",
        certifications: ["ISO 13485", "CE", "ANSI Z87.1"],
        features: [
            "Full-face coverage protection",
            "Clear, distortion-free visor",
            "Lightweight and comfortable",
            "Adjustable headband",
            "Reusable and easy to clean"
        ],
        specs: {
            "Visor Material": "Polycarbonate",
            "Thickness": "0.25mm",
            "Coverage": "Full face",
            "Adjustability": "Elastic headband",
            "Certification": "ANSI Z87.1"
        },
        faq: [
            {
                q: "Are face shields better than masks for protection?",
                a: "Face shields provide additional protection for the eyes and full face, but should be used in conjunction with masks for optimal respiratory protection."
            },
            {
                q: "How should I clean and disinfect my face shield?",
                a: "Clean with mild soap and water, then disinfect with 70% isopropyl alcohol. Allow to air dry completely before reuse."
            }
        ]
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
        description: "High-quality disposable syringes for medical injections and fluid administration. Available in various sizes with different needle gauges to meet clinical needs.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Sterile and single-use",
            "Clear barrel for easy volume reading",
            "Smooth plunger movement",
            "Secure needle attachment",
            "Graduated markings for accuracy"
        ],
        specs: {
            "Material": "Medical-grade plastic",
            "Sizes": "1ml, 2ml, 5ml, 10ml, 20ml, 50ml",
            "Needle Gauges": "21G, 22G, 23G, 25G, 27G",
            "Needle Lengths": "13mm, 25mm",
            "Sterility": "Gamma sterilized"
        },
        faq: [
            {
                q: "What is the difference between insulin syringes and regular syringes?",
                a: "Insulin syringes are specifically designed for insulin administration with smaller volumes (up to 1ml) and finer needles, while regular syringes are for general injections and fluid administration."
            },
            {
                q: "Can these syringes be reused?",
                a: "No, these are single-use disposable syringes and should be properly disposed of after one use to prevent infection and ensure safety."
            }
        ]
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
        description: "High-quality hypodermic needles for medical injections. Available in various gauges and lengths to meet different clinical requirements and patient needs.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Sharp, beveled tip for minimal patient discomfort",
            "Smooth surface for easy insertion",
            "Secure hub attachment",
            "Stainless steel construction",
            "Sterile and single-use"
        ],
        specs: {
            "Material": "Stainless steel",
            "Gauges": "18G, 20G, 21G, 22G, 23G, 25G, 27G",
            "Lengths": "13mm, 25mm, 38mm",
            "Tip Style": "Beveled",
            "Sterility": "Gamma sterilized"
        },
        faq: [
            {
                q: "What do the gauge numbers mean for needles?",
                a: "Needle gauge refers to the diameter of the needle. Smaller gauge numbers mean larger diameter needles (e.g., 18G is larger than 25G)."
            },
            {
                q: "How should needles be disposed of after use?",
                a: "Used needles should be disposed of in puncture-resistant sharps containers and disposed of according to local medical waste regulations."
            }
        ]
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
        description: "High-quality intravenous catheters for peripheral venous access. Designed for easy insertion and secure placement with minimal patient discomfort.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Easy insertion with sharp needle",
            "Smooth catheter advancement",
            "Secure hub design",
            "Integrated flashback chamber",
            "Various sizes for different applications"
        ],
        specs: {
            "Material": "Stainless steel needle, polyurethane catheter",
            "Gauges": "18G, 20G, 22G, 24G, 26G",
            "Lengths": "25mm, 32mm",
            "Features": "Flashback chamber, wings",
            "Sterility": "Gamma sterilized"
        },
        faq: [
            {
                q: "What is the advantage of using an IV catheter vs. a regular needle?",
                a: "IV catheters allow for repeated access to the vein without repeated needle sticks, reducing patient discomfort and risk of vein damage."
            },
            {
                q: "How long can an IV catheter remain in place?",
                a: "Peripheral IV catheters should generally be replaced every 72-96 hours to reduce the risk of infection and phlebitis."
            }
        ]
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
        description: "Complete IV infusion sets for administering fluids and medications intravenously. Designed for safe, reliable infusion therapy with patient comfort in mind.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Complete infusion system",
            "Precise flow control",
            "Sterile and pyrogen-free",
            "Soft, kink-resistant tubing",
            "Various needle sizes available"
        ],
        specs: {
            "Tubing Length": "150cm",
            "Needle Gauges": "18G, 20G, 21G, 22G",
            "Flow Regulator": "Roller clamp",
            "Filter": "0.22μm optional",
            "Sterility": "Gamma sterilized"
        },
        faq: [
            {
                q: "What components are included in an IV infusion set?",
                a: "Our IV infusion sets include spike for connecting to IV bag, drip chamber, flow regulator, tubing, and needle or catheter for patient connection."
            },
            {
                q: "How should infusion sets be stored?",
                a: "Infusion sets should be stored in a cool, dry place and kept in their sterile packaging until immediately before use."
            }
        ]
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
        description: "Specialized blood transfusion sets for safe and efficient blood and blood product administration. Designed to meet the specific requirements of transfusion therapy.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Specialized for blood transfusion",
            "Integrated blood filter",
            "Smooth, kink-resistant tubing",
            "Precise flow control",
            "Sterile and pyrogen-free"
        ],
        specs: {
            "Tubing Length": "170cm",
            "Filter": "170μm blood filter",
            "Needle Gauge": "16G, 18G",
            "Flow Regulator": "Roller clamp",
            "Sterility": "Gamma sterilized"
        },
        faq: [
            {
                q: "What is the purpose of the filter in a blood transfusion set?",
                a: "The 170μm filter removes clots, aggregates, and other debris from the blood product to prevent them from entering the patient's circulation."
            },
            {
                q: "Can a regular IV infusion set be used for blood transfusion?",
                a: "No, blood transfusion requires a specialized set with an appropriate filter to ensure patient safety and proper administration."
            }
        ]
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
        description: "Specialized insulin syringes for accurate insulin administration. Designed with fine needles and precise markings for optimal diabetes management.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Designed specifically for insulin",
            "Fine, sharp needle for minimal discomfort",
            "Clear, easy-to-read markings",
            "Smooth plunger movement",
            "Available in U-100 calibration"
        ],
        specs: {
            "Material": "Medical-grade plastic",
            "Sizes": "0.3ml, 0.5ml, 1ml",
            "Needle Gauge": "29G, 30G",
            "Needle Length": "8mm, 12.7mm",
            "Calibration": "U-100 (100 units/ml)"
        },
        faq: [
            {
                q: "What is the difference between U-100 and other insulin syringes?",
                a: "U-100 syringes are calibrated for insulin containing 100 units per milliliter, which is the standard concentration for most insulin products."
            },
            {
                q: "How should insulin syringes be stored?",
                a: "Insulin syringes should be stored in a cool, dry place and kept in their sterile packaging until immediately before use."
            }
        ]
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
        description: "High-quality dental drill bits for various dental procedures including cavity preparation, enameloplasty, and finishing. Made from premium materials for durability and precision.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Premium tungsten carbide construction",
            "Precision cutting edges",
            "Smooth operation with minimal vibration",
            "Compatible with standard dental handpieces",
            "Sterilizable and reusable"
        ],
        specs: {
            "Material": "Tungsten carbide",
            "Types": "Round, fissure, inverted cone",
            "Sizes": "Various diameters and lengths",
            "Compatibility": "Standard dental handpieces",
            "Sterilization": "Autoclavable"
        },
        faq: [
            {
                q: "What is the difference between diamond and carbide dental burs?",
                a: "Diamond burs are used for grinding and polishing hard tissues like enamel, while carbide burs are used for cutting and shaping both enamel and dentin."
            },
            {
                q: "How many uses can I get from a dental drill bit?",
                a: "The number of uses depends on the type of procedure and material being cut, but generally 5-10 uses before needing replacement for optimal performance."
            }
        ]
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
        description: "High-quality dental mirrors for visualization and retraction during dental procedures. Available in various sizes with different handle designs for optimal performance.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "High-quality stainless steel construction",
            "Optical-grade mirror surface",
            "Anti-fog coating for clear visibility",
            "Ergonomic handle design",
            "Sterilizable and reusable"
        ],
        specs: {
            "Material": "Stainless steel",
            "Mirror Sizes": "18mm, 20mm, 22mm",
            "Handle Length": "16cm",
            "Coating": "Anti-fog",
            "Sterilization": "Autoclavable"
        },
        faq: [
            {
                q: "How should I clean and sterilize dental mirrors?",
                a: "Clean with mild detergent and water, then sterilize using autoclave (134°C for 3-5 minutes) between patients."
            },
            {
                q: "What is the purpose of the anti-fog coating?",
                a: "The anti-fog coating prevents condensation on the mirror surface, ensuring clear visibility during dental procedures even with patient's breath and moisture."
            }
        ]
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
        description: "Precision dental scalers for removing calculus and plaque from teeth surfaces. Designed for optimal access and visibility during periodontal procedures.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Precision-tipped for effective calculus removal",
            "Ergonomic handle design",
            "High-quality stainless steel",
            "Various tip designs for different areas",
            "Sterilizable and reusable"
        ],
        specs: {
            "Material": "Stainless steel",
            "Types": "Sickle, curette, hoe",
            "Tip Styles": "Straight, curved",
            "Handle Length": "16cm",
            "Sterilization": "Autoclavable"
        },
        faq: [
            {
                q: "What is the difference between a scaler and a curette?",
                a: "Scalers have pointed tips for removing supragingival calculus, while curettes have rounded tips for removing subgingival calculus and for root planing."
            },
            {
                q: "How often should dental scalers be sharpened?",
                a: "Scalers should be sharpened regularly, typically after 10-15 uses, to maintain optimal performance and prevent unnecessary tissue damage."
            }
        ]
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
        description: "High-quality dental forceps for tooth extraction procedures. Available in various patterns designed for specific teeth and extraction techniques.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Precision-machined for secure grip",
            "Ergonomic handle design",
            "High-strength stainless steel",
            "Various patterns for different teeth",
            "Sterilizable and reusable"
        ],
        specs: {
            "Material": "Stainless steel",
            "Patterns": "Upper, lower, universal",
            "Sizes": "Adult, pediatric",
            "Handle Design": "Ergonomic",
            "Sterilization": "Autoclavable"
        },
        faq: [
            {
                q: "Why are there different patterns of dental forceps?",
                a: "Different patterns are designed to optimally fit and grip different teeth (incisors, canines, molars) in both upper and lower jaws for safer, more effective extractions."
            },
            {
                q: "How should dental forceps be maintained?",
                a: "Clean thoroughly after use, lubricate hinge regularly, sharpen tips when needed, and sterilize using autoclave between patients."
            }
        ]
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
        description: "High-quality dental impression trays for taking accurate dental impressions. Available in various sizes and designs to accommodate different dental arches and impression materials.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Precision fit for accurate impressions",
            "Perforated design for material retention",
            "Comfortable for patient",
            "Various sizes available",
            "Autoclavable and reusable"
        ],
        specs: {
            "Material": "Stainless steel",
            "Types": "Upper, lower, full arch",
            "Sizes": "Small, medium, large",
            "Design": "Perforated",
            "Sterilization": "Autoclavable"
        },
        faq: [
            {
                q: "What is the advantage of perforated vs. non-perforated impression trays?",
                a: "Perforated trays have holes that allow impression material to flow through, creating mechanical retention and ensuring the impression stays securely in the tray during removal."
            },
            {
                q: "How should impression trays be prepared before use?",
                a: "Impression trays should be cleaned, sterilized, and may be coated with a tray adhesive to ensure the impression material adheres properly to the tray."
            }
        ]
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
        description: "High-quality dental polishing cups for professional teeth polishing and cleaning. Made from soft, durable materials for effective plaque removal and tooth shine.",
        certifications: ["ISO 13485", "CE", "FDA"],
        features: [
            "Soft, non-abrasive material",
            "Effective plaque and stain removal",
            "Compatible with standard handpieces",
            "Various sizes available",
            "Disposable for infection control"
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
            },
            {
                q: "What is the recommended speed for using these polishing cups?",
                a: "These polishing cups should be used at low to medium speeds (1,000-3,000 RPM) to prevent overheating and ensure effective polishing."
            }
        ]
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
            "Packaging": "Sterile, individual packs",
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

// Helper functions to access products
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
    console.log(`searchProducts called with: ${query}`);
    const searchTerm = query.toLowerCase();
    return Object.values(productDatabase).filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
}

// Export for web usage - Make sure these are properly exposed to window
console.log('products.js: Exporting functions to window object');
if (typeof window !== 'undefined') {
    window.productDatabase = productDatabase;
    window.getProductById = getProductById;
    window.getProductsByCategory = getProductsByCategory;
    window.getAllProducts = getAllProducts;
    window.searchProducts = searchProducts;
    
    // Test function to verify exports
    window.testProductsJs = function() {
        console.log('testProductsJs called - products.js is working!');
        console.log(`Total products: ${Object.keys(productDatabase).length}`);
        return {
            status: 'success',
            productCount: Object.keys(productDatabase).length,
            categories: [...new Set(Object.values(productDatabase).map(p => p.category))]
        };
    };
    
    console.log('products.js loaded successfully!');
    console.log(`Total products available: ${Object.keys(productDatabase).length}`);
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productDatabase,
        getProductById,
        getProductsByCategory,
        getAllProducts,
        searchProducts
    };
}

// Log successful loading
console.log('V5 Medical Product Database loaded successfully!');
console.log(`Total products in database: ${Object.keys(productDatabase).length}`);
console.log('Available categories:', [...new Set(Object.values(productDatabase).map(p => p.category))]);