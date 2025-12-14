/**
 * V5 Medical Product Database
 * ISO 13485 Certified Medical Products Catalog
 * @version 2.0.0
 */

const productDatabase = {
    // Surgical Sutures
    'pga-suture': {
        id: 'pga-suture',
        name: 'PGA Absorbable Suture',
        chineseName: 'PGA可吸收缝合线',
        category: 'surgical-sutures',
        short: 'Monofilament PGA suture with excellent tensile strength and absorption profile',
        description: 'Polyglactin 910 (PGA) absorbable sutures are synthetic monofilament sutures that provide reliable wound closure. They offer excellent tensile strength retention and predictable absorption within 60-90 days. Ideal for general surgery, gynecology, and orthopedics.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Monofilament structure for smooth tissue passage',
            'Excellent knot security and tensile strength',
            'Predictable absorption (60-90 days)',
            'Minimal tissue reaction',
            'Available in various sizes and configurations'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pga-absorbable-suture.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pga-suture-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/suture-packaging.jpg'
        ],
        specs: {
            'Material': 'Polyglactin 910 (PGA)',
            'Structure': 'Monofilament',
            'Absorption Time': '60-90 days',
            'Sizes': 'USP 6-0 to 2',
            'Needle Type': 'Reverse cutting, taper point',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What is the absorption profile?', a: 'PGA sutures maintain 70% of tensile strength at 2 weeks and are completely absorbed within 60-90 days.' },
            { q: 'What needle types are available?', a: 'Reverse cutting, taper point, and spatula needles in various sizes.' },
            { q: 'Is this suture suitable for cardiovascular surgery?', a: 'PGA is primarily used for general soft tissue approximation and ligation.' }
        ],
        seo: {
            title: 'PGA Absorbable Suture | V5 Medical - ISO 13485 Certified',
            description: 'High-quality PGA absorbable sutures with CE and FDA certification. Monofilament design for minimal tissue reaction and predictable absorption.',
            keywords: 'PGA suture, absorbable suture, surgical suture, monofilament suture, ISO 13485 suture, CE certified suture'
        }
    },
    
    'pgla-suture': {
        id: 'pgla-suture',
        name: 'PGLA Braided Suture',
        chineseName: 'PGLA编织缝合线',
        category: 'surgical-sutures',
        short: 'Braided PGLA suture with excellent handling characteristics',
        description: 'Polyglactin 910 (PGLA) braided absorbable sutures provide superior handling and knot security. The braided structure allows for better capillary action and tissue approximation. Absorption occurs within 56-70 days.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Braided structure for excellent knot security',
            'Superior handling characteristics',
            'Good tissue approximation',
            'Predictable absorption (56-70 days)',
            'Available with or without needles'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pgla-braided-suture.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/braided-suture-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/suture-needle.jpg'
        ],
        specs: {
            'Material': 'Polyglactin 910 (PGLA)',
            'Structure': 'Braided',
            'Absorption Time': '56-70 days',
            'Sizes': 'USP 6-0 to 2',
            'Needle Type': 'Reverse cutting, taper point',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What is the difference between PGA and PGLA?', a: 'PGLA is a copolymer of PGA and PLA, offering different absorption characteristics.' },
            { q: 'Is this suture suitable for ophthalmic surgery?', a: 'Yes, with appropriate needle selection for delicate tissues.' },
            { q: 'What is the shelf life?', a: '3 years from manufacturing date when stored properly.' }
        ],
        seo: {
            title: 'PGLA Braided Suture | V5 Medical - Surgical Sutures',
            description: 'High-quality PGLA braided absorbable sutures with excellent handling and knot security. CE and FDA certified for surgical use.',
            keywords: 'PGLA suture, braided suture, absorbable suture, surgical suture, medical suture, ISO 13485'
        }
    },
    
    'chromic-catgut': {
        id: 'chromic-catgut',
        name: 'Chromic Catgut Suture',
        chineseName: '铬制肠线',
        category: 'surgical-sutures',
        short: 'Natural chromic catgut suture for tissue approximation',
        description: 'Chromic catgut is a natural absorbable suture made from purified animal collagen. The chromic salt treatment delays absorption, making it suitable for soft tissue approximation where extended wound support is needed. Absorption occurs within 70-90 days.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Natural collagen material',
            'Chromic treated for delayed absorption',
            'Good tissue compatibility',
            'Absorption in 70-90 days',
            'Suitable for general soft tissue'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/chromic-catgut.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/catgut-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/suture-pack.jpg'
        ],
        specs: {
            'Material': 'Purified animal collagen',
            'Treatment': 'Chromic salt',
            'Absorption Time': '70-90 days',
            'Sizes': 'USP 6-0 to 2',
            'Needle Type': 'Reverse cutting, taper point',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What is chromic catgut made from?', a: 'Purified collagen from sheep or cow intestines.' },
            { q: 'Is this suture suitable for pediatric use?', a: 'Yes, it is commonly used in pediatric surgery.' },
            { q: 'Does this suture cause allergic reactions?', a: 'Rare, but patients with collagen allergies should avoid.' }
        ],
        seo: {
            title: 'Chromic Catgut Suture | V5 Medical - Natural Sutures',
            description: 'High-quality chromic catgut natural absorbable sutures. CE and FDA certified for surgical use with delayed absorption profile.',
            keywords: 'chromic catgut, natural suture, absorbable suture, surgical suture, medical catgut, ISO 13485'
        }
    },
    
    'plain-catgut': {
        id: 'plain-catgut',
        name: 'Plain Catgut Suture',
        chineseName: '普通肠线',
        category: 'surgical-sutures',
        short: 'Fast-absorbing plain catgut suture',
        description: 'Plain catgut is a natural absorbable suture made from purified animal collagen without chromic treatment. It provides rapid absorption within 7-10 days, making it ideal for superficial wound closure and ophthalmic procedures where fast healing is expected.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Natural collagen material',
            'Fast absorption (7-10 days)',
            'Good tissue compatibility',
            'Suitable for superficial wounds',
            'Ideal for ophthalmic surgery'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/plain-catgut.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/plain-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/suture-ophthalmic.jpg'
        ],
        specs: {
            'Material': 'Purified animal collagen',
            'Treatment': 'Plain (no chromic)',
            'Absorption Time': '7-10 days',
            'Sizes': 'USP 6-0 to 3-0',
            'Needle Type': 'Taper point, spatula',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What is the absorption time?', a: 'Complete absorption within 7-10 days.' },
            { q: 'Is this suture suitable for ophthalmic surgery?', a: 'Yes, ideal for ophthalmic procedures.' },
            { q: 'What sizes are available?', a: 'USP 6-0 to 3-0, primarily for delicate tissues.' }
        ],
        seo: {
            title: 'Plain Catgut Suture | V5 Medical - Fast Absorbing',
            description: 'High-quality plain catgut natural absorbable sutures with fast absorption. CE and FDA certified for ophthalmic and superficial wound use.',
            keywords: 'plain catgut, fast absorbing suture, natural suture, ophthalmic suture, surgical suture, ISO 13485'
        }
    },
    
    'nylon-suture': {
        id: 'nylon-suture',
        name: 'Nylon Non-Absorbable Suture',
        chineseName: '尼龙不可吸收缝合线',
        category: 'surgical-sutures',
        short: 'Non-absorbable nylon suture for permanent wound support',
        description: 'Nylon (polyamide) non-absorbable sutures provide permanent wound support with excellent tensile strength and minimal tissue reaction. The monofilament structure allows for smooth tissue passage and easy removal when needed. Available in blue or black for easy visibility.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Non-absorbable for permanent support',
            'Monofilament structure',
            'Excellent tensile strength',
            'Minimal tissue reaction',
            'Available in colored versions'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/nylon-suture.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/nylon-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/non-absorbable-pack.jpg'
        ],
        specs: {
            'Material': 'Polyamide (nylon)',
            'Structure': 'Monofilament',
            'Absorption': 'Non-absorbable',
            'Sizes': 'USP 6-0 to 5',
            'Needle Type': 'Reverse cutting, taper point',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'Is this suture absorbable?', a: 'No, nylon is a non-absorbable suture.' },
            { q: 'What colors are available?', a: 'Blue and black for enhanced visibility.' },
            { q: 'Is this suture suitable for cardiovascular surgery?', a: 'Yes, for certain cardiovascular applications.' }
        ],
        seo: {
            title: 'Nylon Non-Absorbable Suture | V5 Medical - Permanent',
            description: 'High-quality nylon non-absorbable sutures with permanent wound support. CE and FDA certified for surgical use with excellent tensile strength.',
            keywords: 'nylon suture, non-absorbable suture, permanent suture, surgical suture, medical suture, ISO 13485'
        }
    },
    
    'polypropylene-suture': {
        id: 'polypropylene-suture',
        name: 'Polypropylene Suture',
        chineseName: '聚丙烯缝合线',
        category: 'surgical-sutures',
        short: 'Polypropylene monofilament suture for cardiovascular use',
        description: 'Polypropylene (Prolene) non-absorbable sutures are synthetic monofilament sutures with excellent tensile strength and chemical inertness. They provide permanent wound support and are particularly suitable for cardiovascular, ophthalmic, and plastic surgery procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Non-absorbable for permanent support',
            'Monofilament structure',
            'Excellent tensile strength',
            'Chemically inert',
            'Suitable for cardiovascular surgery'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polypropylene.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polypropylene-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/cardiovascular.jpg'
        ],
        specs: {
            'Material': 'Polypropylene',
            'Structure': 'Monofilament',
            'Absorption': 'Non-absorbable',
            'Sizes': 'USP 6-0 to 5',
            'Needle Type': 'Reverse cutting, taper point, spatula',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What is another name for polypropylene suture?', a: 'Often referred to as Prolene suture.' },
            { q: 'Is this suture suitable for ophthalmic surgery?', a: 'Yes, excellent for ophthalmic procedures.' },
            { q: 'What is the tensile strength retention?', a: 'Maintains 100% tensile strength permanently.' }
        ],
        seo: {
            title: 'Polypropylene Suture | V5 Medical - Cardiovascular',
            description: 'High-quality polypropylene non-absorbable sutures for cardiovascular and ophthalmic surgery. CE and FDA certified with excellent tensile strength.',
            keywords: 'polypropylene suture, prolene suture, cardiovascular suture, non-absorbable suture, surgical suture, ISO 13485'
        }
    },
    
    'silk-suture': {
        id: 'silk-suture',
        name: 'Silk Suture',
        chineseName: '丝线',
        category: 'surgical-sutures',
        short: 'Braided silk suture for general surgical use',
        description: 'Silk sutures are natural non-absorbable sutures made from purified silk fibers. The braided structure provides excellent handling and knot security. Silk sutures are gradually encapsulated by tissue over time and may be removed when no longer needed. Ideal for general soft tissue approximation.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Natural silk material',
            'Braided structure',
            'Excellent handling and knot security',
            'Gradually encapsulated by tissue',
            'Suitable for general surgery'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/silk-suture.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/silk-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/silk-packaging.jpg'
        ],
        specs: {
            'Material': 'Purified silk fibers',
            'Structure': 'Braided',
            'Absorption': 'Non-absorbable (encapsulated)',
            'Sizes': 'USP 6-0 to 5',
            'Needle Type': 'Reverse cutting, taper point',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'Is silk suture absorbable?', a: 'No, silk is a non-absorbable suture but becomes encapsulated by tissue.' },
            { q: 'What is silk suture used for?', a: 'General soft tissue approximation and ligation.' },
            { q: 'Does silk suture cause tissue reaction?', a: 'Minimal tissue reaction compared to other natural sutures.' }
        ],
        seo: {
            title: 'Silk Suture | V5 Medical - Natural Non-Absorbable',
            description: 'High-quality silk non-absorbable sutures with excellent handling and knot security. CE and FDA certified for general surgical use.',
            keywords: 'silk suture, natural suture, non-absorbable suture, surgical suture, medical suture, ISO 13485'
        }
    },
    
    'polyester-suture': {
        id: 'polyester-suture',
        name: 'Polyester Suture',
        chineseName: '聚酯缝合线',
        category: 'surgical-sutures',
        short: 'Braided polyester suture for cardiovascular surgery',
        description: 'Polyester (Dacron) non-absorbable sutures are synthetic braided sutures with excellent tensile strength and dimensional stability. They provide permanent wound support and are particularly suitable for cardiovascular, orthopedic, and plastic surgery procedures where long-term support is required.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Non-absorbable for permanent support',
            'Braided structure',
            'Excellent tensile strength',
            'Dimensional stability',
            'Suitable for cardiovascular surgery'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polyester.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polyester-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/orthopedic.jpg'
        ],
        specs: {
            'Material': 'Polyester (Dacron)',
            'Structure': 'Braided',
            'Absorption': 'Non-absorbable',
            'Sizes': 'USP 6-0 to 5',
            'Needle Type': 'Reverse cutting, taper point',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What is another name for polyester suture?', a: 'Often referred to as Dacron suture.' },
            { q: 'Is this suture suitable for orthopedic surgery?', a: 'Yes, excellent for orthopedic procedures requiring permanent support.' },
            { q: 'What is the advantage of braided structure?', a: 'Excellent knot security and handling characteristics.' }
        ],
        seo: {
            title: 'Polyester Suture | V5 Medical - Cardiovascular',
            description: 'High-quality polyester non-absorbable sutures for cardiovascular and orthopedic surgery. CE and FDA certified with excellent tensile strength.',
            keywords: 'polyester suture, dacron suture, cardiovascular suture, non-absorbable suture, surgical suture, ISO 13485'
        }
    },
    
    'stainless-steel-suture': {
        id: 'stainless-steel-suture',
        name: 'Stainless Steel Suture',
        chineseName: '不锈钢缝合线',
        category: 'surgical-sutures',
        short: 'Stainless steel wire suture for orthopedic surgery',
        description: 'Stainless steel sutures are non-absorbable metal sutures made from high-quality stainless steel alloy. They provide maximum tensile strength and permanent wound support, making them ideal for orthopedic, thoracic, and plastic surgery procedures where extreme strength is required.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Non-absorbable for permanent support',
            'Maximum tensile strength',
            'Corrosion resistant',
            'Sterile and biocompatible',
            'Suitable for orthopedic surgery'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/stainless-steel.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/steel-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/steel-packaging.jpg'
        ],
        specs: {
            'Material': 'Stainless steel alloy',
            'Structure': 'Monofilament or multifilament',
            'Absorption': 'Non-absorbable',
            'Sizes': 'USP 9-0 to 5',
            'Needle Type': 'Reverse cutting, taper point',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What is stainless steel suture used for?', a: 'Orthopedic, thoracic, and plastic surgery where maximum strength is needed.' },
            { q: 'Is this suture flexible?', a: 'Yes, available in different levels of flexibility.' },
            { q: 'What is the corrosion resistance?', a: 'Excellent corrosion resistance in body tissues.' }
        ],
        seo: {
            title: 'Stainless Steel Suture | V5 Medical - Orthopedic',
            description: 'High-quality stainless steel non-absorbable sutures for orthopedic surgery. CE and FDA certified with maximum tensile strength.',
            keywords: 'stainless steel suture, metal suture, orthopedic suture, non-absorbable suture, surgical suture, ISO 13485'
        }
    },
    
    // Surgical Instruments
    'scalpel-handles': {
        id: 'scalpel-handles',
        name: 'Scalpel Handles',
        chineseName: '手术刀柄',
        category: 'surgical-instruments',
        short: 'High-quality scalpel handles for surgical blades',
        description: 'Precision-machined scalpel handles made from high-grade stainless steel. Available in various sizes to accommodate different surgical blade types. Ergonomic design for comfortable grip and precise control during surgical procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-grade stainless steel',
            'Precision machined',
            'Ergonomic design',
            'Various sizes available',
            'Autoclavable and reusable'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpel-handles.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpel-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpel-packaging.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Sizes': '3, 4, 7, 9 (standard sizes)',
            'Finish': 'Matte or polished',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What sizes are available?', a: 'Standard sizes 3, 4, 7, 9 to fit different blade types.' },
            { q: 'Are these handles reusable?', a: 'Yes, fully autoclavable and reusable.' },
            { q: 'What is the material grade?', a: 'High-grade stainless steel for durability.' }
        ],
        seo: {
            title: 'Scalpel Handles | V5 Medical - Surgical Instruments',
            description: 'High-quality stainless steel scalpel handles with ergonomic design. CE and FDA certified for surgical use with various sizes available.',
            keywords: 'scalpel handles, surgical handles, stainless steel handles, surgical instruments, medical instruments, ISO 13485'
        }
    },
    
    'surgical-scissors': {
        id: 'surgical-scissors',
        name: 'Surgical Scissors',
        chineseName: '手术剪',
        category: 'surgical-instruments',
        short: 'Precision surgical scissors for tissue dissection',
        description: 'High-quality surgical scissors with precision-ground blades for clean tissue dissection. Available in various types including Mayo, Metzenbaum, Iris, and suture scissors. Ergonomic handles for comfortable use during extended procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-quality stainless steel',
            'Sharp cutting edges',
            'Ergonomic handles',
            'Reusable and autoclavable',
            'Various types available'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-scissors.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scissors-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scissors-types.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Types': 'Mayo, Metzenbaum, Iris, Suture scissors',
            'Sizes': '4.5" to 10"',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What types of surgical scissors are available?', a: 'Mayo, Metzenbaum, Iris, and suture scissors.' },
            { q: 'What is the difference between Mayo and Metzenbaum scissors?', a: 'Mayo for heavy tissue, Metzenbaum for delicate tissue dissection.' },
            { q: 'Are these scissors autoclavable?', a: 'Yes, fully autoclavable for reuse.' }
        ],
        seo: {
            title: 'Surgical Scissors | V5 Medical - Precision Instruments',
            description: 'High-quality surgical scissors with precision-ground blades. CE and FDA certified with various types for different surgical needs.',
            keywords: 'surgical scissors, medical scissors, Mayo scissors, Metzenbaum scissors, surgical instruments, ISO 13485'
        }
    },
    
    'forceps': {
        id: 'forceps',
        name: 'Surgical Forceps',
        chineseName: '手术镊',
        category: 'surgical-instruments',
        short: 'Surgical forceps for tissue handling and dissection',
        description: 'High-quality surgical forceps with precision tips for tissue handling and dissection. Available in toothed and non-toothed varieties for different applications. Ergonomic design for comfortable grip and precise control during surgical procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-quality stainless steel',
            'Precision tips',
            'Toothed and non-toothed options',
            'Ergonomic handles',
            'Autoclavable and reusable'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps-types.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Types': 'Toothed, non-toothed, tissue, dissecting',
            'Sizes': '4.5" to 10"',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What types of forceps are available?', a: 'Toothed, non-toothed, tissue, and dissecting forceps.' },
            { q: 'When should I use toothed vs non-toothed forceps?', a: 'Toothed for gripping tissue, non-toothed for delicate tissues.' },
            { q: 'What is the material quality?', a: 'High-grade stainless steel for durability and precision.' }
        ],
        seo: {
            title: 'Surgical Forceps | V5 Medical - Tissue Handling',
            description: 'High-quality surgical forceps with precision tips. CE and FDA certified with toothed and non-toothed options for different surgical needs.',
            keywords: 'surgical forceps, medical forceps, tissue forceps, dissecting forceps, surgical instruments, ISO 13485'
        }
    },
    
    'hemostats': {
        id: 'hemostats',
        name: 'Hemostatic Forceps',
        chineseName: '止血钳',
        category: 'surgical-instruments',
        short: 'Hemostatic forceps for blood vessel control',
        description: 'High-quality hemostatic forceps for blood vessel control and hemostasis during surgical procedures. Available in straight and curved varieties with different tip configurations. Ratchet lock mechanism for secure grip and control.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-quality stainless steel',
            'Precision tips',
            'Straight and curved options',
            'Ratchet lock mechanism',
            'Autoclavable and reusable'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/hemostats.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/hemostat-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/hemostat-types.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Types': 'Straight, curved, mosquito, Kelly',
            'Sizes': '3.5" to 8"',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What types of hemostats are available?', a: 'Straight, curved, mosquito, and Kelly hemostats.' },
            { q: 'What is the difference between mosquito and Kelly hemostats?', a: 'Mosquito for small vessels, Kelly for larger vessels.' },
            { q: 'How does the ratchet lock work?', a: 'Secure locking mechanism to maintain pressure during hemostasis.' }
        ],
        seo: {
            title: 'Hemostatic Forceps | V5 Medical - Blood Control',
            description: 'High-quality hemostatic forceps for blood vessel control. CE and FDA certified with various types for different surgical needs.',
            keywords: 'hemostats, hemostatic forceps, surgical forceps, blood control, surgical instruments, ISO 13485'
        }
    },
    
    'needle-holders': {
        id: 'needle-holders',
        name: 'Needle Holders',
        chineseName: '持针器',
        category: 'surgical-instruments',
        short: 'Needle holders for surgical suture needles',
        description: 'High-quality needle holders for secure gripping of surgical suture needles. Available in various sizes with tungsten carbide inserts for superior gripping power. Ergonomic design for comfortable use during suturing procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-quality stainless steel',
            'Tungsten carbide inserts',
            'Secure needle grip',
            'Ergonomic handles',
            'Autoclavable and reusable'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/needle-holders.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/needle-holder-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/needle-holder-types.jpg'
        ],
        specs: {
            'Material': 'Stainless steel with tungsten carbide inserts',
            'Types': 'Mayo-Hegar, Olsen-Hegar, Mathieu',
            'Sizes': '5" to 8"',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What types of needle holders are available?', a: 'Mayo-Hegar, Olsen-Hegar, and Mathieu needle holders.' },
            { q: 'What is the advantage of tungsten carbide inserts?', a: 'Superior gripping power and durability.' },
            { q: 'Can these holders be used with all suture needles?', a: 'Yes, designed to accommodate standard surgical needles.' }
        ],
        seo: {
            title: 'Needle Holders | V5 Medical - Suturing Instruments',
            description: 'High-quality needle holders with tungsten carbide inserts. CE and FDA certified for secure suture needle grip during surgical procedures.',
            keywords: 'needle holders, surgical needle holders, suture instruments, surgical instruments, medical instruments, ISO 13485'
        }
    },
    
    'retractors': {
        id: 'retractors',
        name: 'Surgical Retractors',
        chineseName: '手术拉钩',
        category: 'surgical-instruments',
        short: 'Surgical retractors for wound exposure',
        description: 'High-quality surgical retractors for wound exposure and tissue retraction during surgical procedures. Available in various types including Richardson, Army-Navy, and Deaver retractors. Ergonomic design for comfortable use and effective tissue retraction.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-quality stainless steel',
            'Various blade designs',
            'Ergonomic handles',
            'Effective tissue retraction',
            'Autoclavable and reusable'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/retractors.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/retractor-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/retractor-types.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Types': 'Richardson, Army-Navy, Deaver, Senn',
            'Sizes': '3" to 12"',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What types of retractors are available?', a: 'Richardson, Army-Navy, Deaver, and Senn retractors.' },
            { q: 'What is the difference between different retractor types?', a: 'Different blade shapes for specific tissue retraction needs.' },
            { q: 'Are these retractors suitable for all surgical specialties?', a: 'Yes, with appropriate selection for specific procedures.' }
        ],
        seo: {
            title: 'Surgical Retractors | V5 Medical - Wound Exposure',
            description: 'High-quality surgical retractors for wound exposure. CE and FDA certified with various types for different surgical needs.',
            keywords: 'surgical retractors, medical retractors, wound retractors, surgical instruments, medical instruments, ISO 13485'
        }
    },
    
    // Gauze Dressings
    'gauze-swabs': {
        id: 'gauze-swabs',
        name: 'Gauze Swabs',
        chineseName: '纱布块',
        category: 'gauze-dressings',
        short: 'Sterile gauze swabs for wound care and surgical use',
        description: 'High-quality sterile gauze swabs made from 100% cotton. Available in various sizes and ply counts for wound care, surgical use, and general medical applications. Individually packaged and EO sterilized.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            '100% cotton material',
            'High absorbency',
            'Soft and non-irritating',
            'EO sterilized',
            'Various sizes and ply available'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-swabs.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-packaging.jpg'
        ],
        specs: {
            'Material': '100% cotton',
            'Sizes': '5x5cm, 7.5x7.5cm, 10x10cm',
            'Ply': '4-ply, 8-ply',
            'Sterilization': 'EO sterilized',
            'Packaging': '50 swabs/box, 20 boxes/carton'
        },
        faq: [
            { q: 'What sizes are available?', a: '5x5cm, 7.5x7.5cm, 10x10cm in 4-ply and 8-ply.' },
            { q: 'Are these gauze swabs sterile?', a: 'Yes, EO sterilized and individually packaged.' },
            { q: 'What is the absorbency level?', a: 'High absorbency for effective wound care.' }
        ],
        seo: {
            title: 'Gauze Swabs | V5 Medical - Sterile Dressings',
            description: 'High-quality sterile gauze swabs made from 100% cotton. CE and FDA certified with various sizes for wound care and surgical use.',
            keywords: 'gauze swabs, sterile gauze, medical gauze, wound dressings, surgical dressings, ISO 13485'
        }
    },
    
    'gauze-balls': {
        id: 'gauze-balls',
        name: 'Gauze Balls',
        chineseName: '纱布球',
        category: 'gauze-dressings',
        short: 'Sterile gauze balls for surgical and wound care use',
        description: 'High-quality sterile gauze balls made from 100% cotton. Available in various sizes for surgical use, wound care, and general medical applications. Soft, absorbent, and lint-free for optimal performance.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            '100% cotton material',
            'High absorbency',
            'Soft and lint-free',
            'EO sterilized',
            'Various sizes available'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-balls.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-ball-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-ball-packaging.jpg'
        ],
        specs: {
            'Material': '100% cotton',
            'Sizes': '1cm, 2cm, 3cm diameter',
            'Quantity': '100 balls/box',
            'Sterilization': 'EO sterilized',
            'Packaging': '10 boxes/carton'
        },
        faq: [
            { q: 'What sizes are available?', a: '1cm, 2cm, and 3cm diameter gauze balls.' },
            { q: 'Are these balls sterile?', a: 'Yes, EO sterilized for medical use.' },
            { q: 'What are gauze balls used for?', a: 'Surgical procedures, wound care, and general medical applications.' }
        ],
        seo: {
            title: 'Gauze Balls | V5 Medical - Sterile Medical Balls',
            description: 'High-quality sterile gauze balls made from 100% cotton. CE and FDA certified with various sizes for surgical and wound care use.',
            keywords: 'gauze balls, sterile gauze balls, medical gauze balls, surgical dressings, wound care, ISO 13485'
        }
    },
    
    'abdominal-pads': {
        id: 'abdominal-pads',
        name: 'Abdominal Pads',
        chineseName: '腹部垫',
        category: 'gauze-dressings',
        short: 'Sterile abdominal pads for large wound care',
        description: 'High-quality sterile abdominal pads made from 100% cotton. Designed for large wound care, surgical use, and heavy exudate absorption. Soft, absorbent, and non-irritating to the skin.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            '100% cotton material',
            'High absorbency for heavy exudate',
            'Soft and non-irritating',
            'EO sterilized',
            'Large size for extensive wounds'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/abdominal-pads.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/abdominal-pad-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/abdominal-pad-packaging.jpg'
        ],
        specs: {
            'Material': '100% cotton',
            'Sizes': '10x20cm, 15x20cm, 20x30cm',
            'Ply': '12-ply',
            'Sterilization': 'EO sterilized',
            'Packaging': '20 pads/box, 10 boxes/carton'
        },
        faq: [
            { q: 'What sizes are available?', a: '10x20cm, 15x20cm, and 20x30cm abdominal pads.' },
            { q: 'How absorbent are these pads?', a: 'Highly absorbent for heavy exudate and large wounds.' },
            { q: 'Are these pads suitable for post-operative care?', a: 'Yes, ideal for post-operative wound care.' }
        ],
        seo: {
            title: 'Abdominal Pads | V5 Medical - Large Wound Dressings',
            description: 'High-quality sterile abdominal pads made from 100% cotton. CE and FDA certified for large wound care and heavy exudate absorption.',
            keywords: 'abdominal pads, large wound dressings, surgical dressings, wound care, medical dressings, ISO 13485'
        }
    },
    
    'non-woven-sponges': {
        id: 'non-woven-sponges',
        name: 'Non-Woven Sponges',
        chineseName: '无纺布海绵',
        category: 'gauze-dressings',
        short: 'Non-woven sponges for wound care and cleaning',
        description: 'High-quality non-woven sponges made from polyester and rayon blend. Lint-free, highly absorbent, and soft for wound care, cleaning, and general medical applications. Available in sterile and non-sterile options.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Polyester/rayon blend',
            'Lint-free and highly absorbent',
            'Soft and non-irritating',
            'Strong and durable',
            'Sterile and non-sterile options'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/non-woven-sponges.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/non-woven-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/non-woven-packaging.jpg'
        ],
        specs: {
            'Material': 'Polyester/rayon blend',
            'Sizes': '5x5cm, 7.5x7.5cm, 10x10cm',
            'Ply': '4-ply, 8-ply',
            'Sterilization': 'EO sterilized (sterile option)',
            'Packaging': '50 sponges/box, 20 boxes/carton'
        },
        faq: [
            { q: 'What is the material composition?', a: 'Polyester and rayon blend for optimal performance.' },
            { q: 'Are these sponges lint-free?', a: 'Yes, completely lint-free for clean applications.' },
            { q: 'Are sterile and non-sterile options available?', a: 'Yes, both sterile and non-sterile options are available.' }
        ],
        seo: {
            title: 'Non-Woven Sponges | V5 Medical - Lint-Free Dressings',
            description: 'High-quality non-woven sponges made from polyester/rayon blend. Lint-free and highly absorbent for wound care and cleaning.',
            keywords: 'non-woven sponges, lint-free sponges, medical sponges, wound care, dressing sponges, ISO 13485'
        }
    },
    
    'cotton-rolls': {
        id: 'cotton-rolls',
        name: 'Dental Cotton Rolls',
        chineseName: '牙科棉卷',
        category: 'gauze-dressings',
        short: 'Sterile cotton rolls for dental procedures',
        description: 'High-quality dental cotton rolls made from 100% pure cotton. Designed for oral procedures to absorb saliva and maintain dry field. Soft, absorbent, and non-irritating to oral mucosa.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            '100% pure cotton',
            'High absorbency',
            'Soft and non-irritating',
            'Uniform density',
            'Ideal for dental use'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-rolls.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-roll-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-roll-packaging.jpg'
        ],
        specs: {
            'Material': '100% pure cotton',
            'Sizes': '12mm x 40mm, 15mm x 45mm, 18mm x 50mm',
            'Quantity': '500 rolls/bag',
            'Sterilization': 'EO sterilized',
            'Packaging': '10 bags/carton'
        },
        faq: [
            { q: 'What sizes are available?', a: '12mm x 40mm, 15mm x 45mm, and 18mm x 50mm cotton rolls.' },
            { q: 'Are these rolls sterile?', a: 'Yes, EO sterilized for dental procedures.' },
            { q: 'What is the absorbency level?', a: 'Highly absorbent for maintaining dry field during dental work.' }
        ],
        seo: {
            title: 'Dental Cotton Rolls | V5 Medical - Oral Care',
            description: 'High-quality dental cotton rolls made from 100% pure cotton. Ideal for oral procedures to absorb saliva and maintain dry field.',
            keywords: 'cotton rolls, dental cotton, oral cotton, dental products, medical cotton, ISO 13485'
        }
    },
    
    'cotton-balls': {
        id: 'cotton-balls',
        name: 'Cotton Balls',
        chineseName: '棉球',
        category: 'gauze-dressings',
        short: 'Sterile cotton balls for medical use',
        description: 'High-quality sterile cotton balls made from 100% pure cotton. Soft, absorbent, and non-irritating for medical use, wound care, and general hygiene applications. Individually packaged or in bulk quantities.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            '100% pure cotton',
            'Soft and absorbent',
            'Non-irritating',
            'Sterile and non-sterile options',
            'Versatile medical use'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-balls.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-ball-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-ball-packaging.jpg'
        ],
        specs: {
            'Material': '100% pure cotton',
            'Sizes': '1g, 2g, 3g per ball',
            'Quantity': '100 balls/box, 500 balls/bag',
            'Sterilization': 'EO sterilized (sterile option)',
            'Packaging': '20 boxes/carton, 10 bags/carton'
        },
        faq: [
            { q: 'What sizes are available?', a: '1g, 2g, and 3g cotton balls in various packaging options.' },
            { q: 'Are sterile and non-sterile options available?', a: 'Yes, both sterile and non-sterile cotton balls are available.' },
            { q: 'What are cotton balls used for?', a: 'Medical use, wound care, cleaning, and general hygiene applications.' }
        ],
        seo: {
            title: 'Cotton Balls | V5 Medical - Sterile Cotton Products',
            description: 'High-quality sterile cotton balls made from 100% pure cotton. Soft and absorbent for medical use and wound care.',
            keywords: 'cotton balls, sterile cotton, medical cotton, wound care, hygiene products, ISO 13485'
        }
    },
    
    // Protective Equipment
    'surgical-face-masks': {
        id: 'surgical-face-masks',
        name: 'Surgical Face Masks',
        chineseName: '医用外科口罩',
        category: 'protective-equipment',
        short: '3-ply surgical face masks with ear loops',
        description: 'High-quality 3-ply surgical face masks with ear loops. Made from non-woven fabric with melt-blown filter layer for bacterial filtration efficiency. Comfortable, breathable, and suitable for medical and general use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            '3-ply construction',
            'Melt-blown filter layer',
            'Bacterial filtration efficiency >95%',
            'Ear loop design for comfort',
            'Blue outer layer, white inner layer'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-face-masks.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/mask-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/mask-packaging.jpg'
        ],
        specs: {
            'Material': 'Non-woven fabric, melt-blown filter',
            'Layers': '3-ply',
            'BFE': '>95%',
            'PFE': '>90%',
            'Packaging': '50 masks/box, 40 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What is the filtration efficiency?', a: 'Bacterial Filtration Efficiency (BFE) >95%.' },
            { q: 'Are these masks sterile?', a: 'Non-sterile, suitable for general medical use.' },
            { q: 'What is the shelf life?', a: '3 years from manufacturing date.' }
        ],
        seo: {
            title: 'Surgical Face Masks | V5 Medical - 3-Ply Protection',
            description: 'High-quality 3-ply surgical face masks with melt-blown filter. CE and FDA certified with >95% bacterial filtration efficiency.',
            keywords: 'surgical masks, face masks, medical masks, 3-ply masks, protective equipment, ISO 13485'
        }
    },
    
    'n95-respirators': {
        id: 'n95-respirators',
        name: 'N95 Respirators',
        chineseName: 'N95口罩',
        category: 'protective-equipment',
        short: 'N95/FFP2 respirators for respiratory protection',
        description: 'High-quality N95/FFP2 respirators providing ≥95% filtration efficiency against non-oil based particles. Cup or foldable design with comfortable headband or ear loop options. Adjustable nose clip for secure fit and reduced fogging.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            '≥95% filtration efficiency',
            'Cup or foldable design',
            'Headband or ear loop options',
            'Adjustable nose clip',
            'Comfortable for extended wear'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-respirators.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-packaging.jpg'
        ],
        specs: {
            'Standard': 'N95 (US), FFP2 (EU)',
            'Filtration Efficiency': '≥95%',
            'Design': 'Cup or foldable',
            'Fastening': 'Headband or ear loops',
            'Packaging': '20 respirators/box, 10 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What is the difference between N95 and FFP2?', a: 'Both provide ≥95% filtration efficiency, N95 is US standard, FFP2 is EU standard.' },
            { q: 'Are these masks reusable?', a: 'These are disposable masks for single use.' },
            { q: 'What is the shelf life?', a: '3 years from manufacturing date when stored properly.' }
        ],
        seo: {
            title: 'N95 Respirators | V5 Medical - Respiratory Protection',
            description: 'High-quality N95/FFP2 respirators with ≥95% filtration efficiency. CE and FDA certified for respiratory protection against particles.',
            keywords: 'N95 respirators, FFP2 masks, respiratory protection, protective equipment, medical respirators, ISO 13485'
        }
    },
    
    'disposable-caps': {
        id: 'disposable-caps',
        name: 'Disposable Caps',
        chineseName: '一次性帽子',
        category: 'protective-equipment',
        short: 'Disposable bouffant and surgeon caps',
        description: 'High-quality non-woven disposable caps for medical and surgical use. Elastic band design for comfortable fit. Available in bouffant and surgeon cap styles. Lightweight and breathable for extended wear in operating rooms and clean environments.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Non-woven fabric',
            'Elastic band for secure fit',
            'Bouffant and surgeon styles',
            'Lightweight and breathable',
            'Latex-free'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/disposable-caps.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/cap-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/cap-packaging.jpg'
        ],
        specs: {
            'Material': 'Non-woven fabric',
            'Styles': 'Bouffant, Surgeon cap',
            'Colors': 'Blue, green, white',
            'Packaging': '100 caps/box, 20 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What styles are available?', a: 'Bouffant caps and surgeon caps in various colors.' },
            { q: 'Are these caps latex-free?', a: 'Yes, completely latex-free.' },
            { q: 'What is the shelf life?', a: '3 years from manufacturing date.' }
        ],
        seo: {
            title: 'Disposable Caps | V5 Medical - Surgical Headwear',
            description: 'High-quality non-woven disposable caps for medical use. CE and FDA certified with bouffant and surgeon styles available.',
            keywords: 'disposable caps, surgical caps, bouffant caps, protective equipment, medical headwear, ISO 13485'
        }
    },
    
    'surgical-gowns': {
        id: 'surgical-gowns',
        name: 'Surgical Gowns',
        chineseName: '手术衣',
        category: 'protective-equipment',
        short: 'Sterile surgical gowns for operating rooms',
        description: 'High-quality sterile surgical gowns made from SMS non-woven fabric. Provides AAMI Level 3 protection with excellent barrier properties. Comfortable, breathable, and designed for operating room use with secure ties and thumb loops for proper fit.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'SMS non-woven fabric',
            'AAMI Level 3 protection',
            'EO sterilized',
            'Secure ties and thumb loops',
            'Breathable and comfortable'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/surgical-gowns.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/gown-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/gown-packaging.jpg'
        ],
        specs: {
            'Material': 'SMS non-woven fabric',
            'Protection Level': 'AAMI Level 3',
            'Sizes': 'S, M, L, XL',
            'Sterilization': 'EO sterilized',
            'Packaging': '10 gowns/box, 5 boxes/carton',
            'Shelf Life': '5 years'
        },
        faq: [
            { q: 'What protection level do these gowns provide?', a: 'AAMI Level 3 protection against fluid penetration.' },
            { q: 'Are these gowns sterile?', a: 'Yes, all surgical gowns are EO sterilized.' },
            { q: 'What sizes are available?', a: 'S, M, L, and XL sizes.' }
        ],
        seo: {
            title: 'Surgical Gowns | V5 Medical - Operating Room Protection',
            description: 'High-quality sterile surgical gowns with AAMI Level 3 protection. CE and FDA certified for operating room use with SMS fabric.',
            keywords: 'surgical gowns, operating room gowns, medical gowns, protective equipment, AAMI Level 3, ISO 13485'
        }
    },
    
    'isolation-gowns': {
        id: 'isolation-gowns',
        name: 'Isolation Gowns',
        chineseName: '隔离衣',
        category: 'protective-equipment',
        short: 'Disposable isolation gowns for general protection',
        description: 'High-quality disposable isolation gowns made from non-woven fabric. Provides general protection against splashes and contamination. Comfortable, breathable, and suitable for medical and industrial use with secure ties and thumb loops for proper fit.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Non-woven fabric',
            'Fluid-resistant',
            'Comfortable and breathable',
            'Secure ties and thumb loops',
            'Latex-free'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/isolation-gowns.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/isolation-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/isolation-packaging.jpg'
        ],
        specs: {
            'Material': 'Non-woven fabric',
            'Protection Level': 'Level 1-2',
            'Sizes': 'One size fits most',
            'Sterilization': 'Non-sterile',
            'Packaging': '10 gowns/box, 10 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What protection level do these gowns provide?', a: 'Level 1-2 protection against splashes and contamination.' },
            { q: 'Are these gowns sterile?', a: 'Non-sterile, suitable for general protection.' },
            { q: 'What sizes are available?', a: 'One size fits most adults.' }
        ],
        seo: {
            title: 'Isolation Gowns | V5 Medical - General Protection',
            description: 'High-quality disposable isolation gowns for general protection. CE and FDA certified with fluid-resistant non-woven fabric.',
            keywords: 'isolation gowns, disposable gowns, medical gowns, protective equipment, general protection, ISO 13485'
        }
    },
    
    'disposable-shoe-covers': {
        id: 'disposable-shoe-covers',
        name: 'Disposable Shoe Covers',
        chineseName: '一次性鞋套',
        category: 'protective-equipment',
        short: 'Disposable shoe covers for medical and cleanroom use',
        description: 'High-quality disposable shoe covers made from non-woven fabric. Elasticated design for secure fit. Water-resistant and anti-slip options available. Suitable for medical facilities, cleanrooms, and general use to maintain hygiene and prevent contamination.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Non-woven fabric',
            'Elasticated design',
            'Water-resistant option',
            'Anti-slip option',
            'Latex-free'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/shoe-covers.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/shoe-cover-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/shoe-cover-packaging.jpg'
        ],
        specs: {
            'Material': 'Non-woven fabric',
            'Options': 'Standard, water-resistant, anti-slip',
            'Sizes': 'One size fits most',
            'Packaging': '100 covers/box, 10 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What options are available?', a: 'Standard, water-resistant, and anti-slip shoe covers.' },
            { q: 'Are these covers latex-free?', a: 'Yes, completely latex-free.' },
            { q: 'What is the shelf life?', a: '3 years from manufacturing date.' }
        ],
        seo: {
            title: 'Disposable Shoe Covers | V5 Medical - Hygiene Protection',
            description: 'High-quality disposable shoe covers for medical and cleanroom use. CE and FDA certified with various options including water-resistant and anti-slip.',
            keywords: 'disposable shoe covers, medical shoe covers, cleanroom shoe covers, protective equipment, hygiene products, ISO 13485'
        }
    },
    
    // Injection & Infusion
    'disposable-syringes': {
        id: 'disposable-syringes',
        name: 'Disposable Syringes',
        chineseName: '一次性注射器',
        category: 'injection-infusion',
        short: 'Sterile disposable syringes with needles',
        description: 'High-quality sterile disposable syringes with needles for injection and infusion use. Available in various sizes from 1ml to 60ml. Made from medical-grade plastic with clear barrel for accurate volume measurement. Luer slip or Luer lock options available.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Medical-grade plastic',
            'Clear barrel for accurate measurement',
            'Smooth plunger movement',
            'Luer slip or Luer lock',
            'EO sterilized'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/disposable-syringes.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/syringe-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/syringe-packaging.jpg'
        ],
        specs: {
            'Material': 'Medical-grade polypropylene',
            'Sizes': '1ml, 2ml, 5ml, 10ml, 20ml, 50ml, 60ml',
            'Needle Sizes': '18G to 30G',
            'Type': 'Luer slip or Luer lock',
            'Sterilization': 'EO sterilized',
            'Packaging': '100 syringes/box, 10 boxes/carton'
        },
        faq: [
            { q: 'What sizes are available?', a: '1ml, 2ml, 5ml, 10ml, 20ml, 50ml, and 60ml syringes.' },
            { q: 'Are Luer slip and Luer lock options available?', a: 'Yes, both Luer slip and Luer lock syringes are available.' },
            { q: 'What needle sizes are available?', a: 'Needle sizes from 18G to 30G depending on syringe size.' }
        ],
        seo: {
            title: 'Disposable Syringes | V5 Medical - Injection Supplies',
            description: 'High-quality sterile disposable syringes with needles. CE and FDA certified with various sizes and Luer options for medical use.',
            keywords: 'disposable syringes, medical syringes, injection syringes, Luer slip, Luer lock, ISO 13485'
        }
    },
    
    'needles': {
        id: 'needles',
        name: 'Hypodermic Needles',
        chineseName: '注射针头',
        category: 'injection-infusion',
        short: 'Sterile hypodermic needles for medical use',
        description: 'High-quality sterile hypodermic needles for injection and infusion use. Made from stainless steel with sharp bevel for smooth penetration. Available in various gauges from 18G to 30G and lengths from 13mm to 152mm. Compatible with Luer slip and Luer lock syringes.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Stainless steel construction',
            'Sharp bevel for smooth penetration',
            'Various gauges and lengths',
            'Compatible with Luer systems',
            'EO sterilized'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/needles.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/needle-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/needle-packaging.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Gauges': '18G, 20G, 21G, 22G, 23G, 25G, 26G, 27G, 30G',
            'Lengths': '13mm, 25mm, 38mm, 50mm, 75mm, 100mm, 152mm',
            'Type': 'Regular bevel, precision bevel',
            'Sterilization': 'EO sterilized',
            'Packaging': '100 needles/box, 10 boxes/carton'
        },
        faq: [
            { q: 'What gauges are available?', a: '18G to 30G hypodermic needles in various lengths.' },
            { q: 'Are these needles compatible with all syringes?', a: 'Yes, compatible with standard Luer slip and Luer lock syringes.' },
            { q: 'What is the difference between regular and precision bevel?', a: 'Precision bevel for more delicate procedures requiring smoother penetration.' }
        ],
        seo: {
            title: 'Hypodermic Needles | V5 Medical - Injection Needles',
            description: 'High-quality sterile hypodermic needles with various gauges and lengths. CE and FDA certified for medical injection use.',
            keywords: 'hypodermic needles, medical needles, injection needles, Luer needles, stainless steel needles, ISO 13485'
        }
    },
    
    'iv-catheters': {
        id: 'iv-catheters',
        name: 'IV Catheters',
        chineseName: '静脉留置针',
        category: 'injection-infusion',
        short: 'Intravenous catheters for infusion therapy',
        description: 'High-quality intravenous catheters for infusion therapy and blood sampling. Made from polyurethane with stainless steel introducer needle. Available in various gauges from 14G to 24G with wings and injection port for secure fixation and medication administration.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Polyurethane catheter',
            'Stainless steel introducer needle',
            'Wings for secure fixation',
            'Injection port for medication',
            'EO sterilized'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/iv-catheters.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/iv-catheter-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/iv-catheter-packaging.jpg'
        ],
        specs: {
            'Material': 'Polyurethane catheter, stainless steel needle',
            'Gauges': '14G, 16G, 18G, 20G, 22G, 24G',
            'Lengths': '25mm, 32mm, 45mm',
            'Features': 'Wings, injection port, flashback chamber',
            'Sterilization': 'EO sterilized',
            'Packaging': '50 catheters/box, 4 boxes/carton'
        },
        faq: [
            { q: 'What gauges are available?', a: '14G to 24G IV catheters in various lengths.' },
            { q: 'Do these catheters have injection ports?', a: 'Yes, all IV catheters include an injection port for medication administration.' },
            { q: 'What is the material of the catheter?', a: 'Medical-grade polyurethane for flexibility and biocompatibility.' }
        ],
        seo: {
            title: 'IV Catheters | V5 Medical - Intravenous Supplies',
            description: 'High-quality intravenous catheters for infusion therapy. CE and FDA certified with various gauges and features including wings and injection port.',
            keywords: 'IV catheters, intravenous catheters, infusion catheters, medical catheters, vascular access, ISO 13485'
        }
    },
    
    'infusion-sets': {
        id: 'infusion-sets',
        name: 'Infusion Sets',
        chineseName: '输液器',
        category: 'injection-infusion',
        short: 'Sterile infusion sets for intravenous therapy',
        description: 'High-quality sterile infusion sets for intravenous therapy and fluid administration. Complete with needle, drip chamber, flow regulator, and injection port. Made from medical-grade materials with clear tubing for visual monitoring of fluid flow.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Complete infusion system',
            'Clear tubing for visual monitoring',
            'Flow regulator for precise control',
            'Injection port for medication',
            'EO sterilized'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-sets.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-set-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-set-packaging.jpg'
        ],
        specs: {
            'Components': 'Needle, drip chamber, flow regulator, injection port, catheter',
            'Needle Gauge': '18G, 20G, 21G, 22G',
            'Tubing Length': '150cm, 180cm',
            'Flow Rate': 'Adjustable via regulator',
            'Sterilization': 'EO sterilized',
            'Packaging': '50 sets/box, 4 boxes/carton'
        },
        faq: [
            { q: 'What components are included?', a: 'Complete set with needle, drip chamber, flow regulator, injection port, and catheter.' },
            { q: 'What needle gauges are available?', a: '18G, 20G, 21G, and 22G needles depending on application.' },
            { q: 'Is the flow rate adjustable?', a: 'Yes, includes a precision flow regulator for accurate flow control.' }
        ],
        seo: {
            title: 'Infusion Sets | V5 Medical - IV Therapy Supplies',
            description: 'High-quality sterile infusion sets for intravenous therapy. CE and FDA certified with complete components and adjustable flow regulator.',
            keywords: 'infusion sets, IV sets, intravenous sets, medical infusion, fluid administration, ISO 13485'
        }
    },
    
    'blood-collection-sets': {
        id: 'blood-collection-sets',
        name: 'Blood Collection Sets',
        chineseName: '采血器',
        category: 'injection-infusion',
        short: 'Sterile blood collection sets for phlebotomy',
        description: 'High-quality sterile blood collection sets for phlebotomy and blood sampling procedures. Complete with needle, holder, and vacuum tubes. Available in various needle gauges for different vein sizes and patient types. Designed for safe and efficient blood collection.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Complete blood collection system',
            'Various needle gauges',
            'Vacuum tube compatibility',
            'Safety features available',
            'EO sterilized'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/blood-collection.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/blood-collection-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/blood-collection-packaging.jpg'
        ],
        specs: {
            'Components': 'Needle, holder, vacuum tubes',
            'Needle Gauges': '18G, 20G, 21G, 22G, 23G',
            'Needle Lengths': '19mm, 25mm',
            'Vacuum Tubes': 'Various additives available',
            'Sterilization': 'EO sterilized',
            'Packaging': '100 sets/box, 5 boxes/carton'
        },
        faq: [
            { q: 'What needle gauges are available?', a: '18G to 23G needles for different vein sizes.' },
            { q: 'Are these sets compatible with vacuum tubes?', a: 'Yes, designed for use with standard vacuum blood collection tubes.' },
            { q: 'Are safety features available?', a: 'Yes, safety-engineered needles available to prevent needlestick injuries.' }
        ],
        seo: {
            title: 'Blood Collection Sets | V5 Medical - Phlebotomy Supplies',
            description: 'High-quality sterile blood collection sets for phlebotomy. CE and FDA certified with various needle gauges and vacuum tube compatibility.',
            keywords: 'blood collection sets, phlebotomy sets, medical needles, blood sampling, vacuum tubes, ISO 13485'
        }
    },
    
    'insulin-syringes': {
        id: 'insulin-syringes',
        name: 'Insulin Syringes',
        chineseName: '胰岛素注射器',
        category: 'injection-infusion',
        short: 'Sterile insulin syringes for diabetes management',
        description: 'High-quality sterile insulin syringes specifically designed for diabetes management and insulin administration. Available in 0.3ml, 0.5ml, and 1ml sizes with 29G to 31G ultra-fine needles for minimal pain during injection. Clear markings for accurate dosage measurement.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Ultra-fine needles for minimal pain',
            'Clear dosage markings',
            'Smooth plunger movement',
            'Designed for insulin administration',
            'EO sterilized'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/insulin-syringes.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/insulin-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/insulin-packaging.jpg'
        ],
        specs: {
            'Material': 'Medical-grade polypropylene',
            'Sizes': '0.3ml, 0.5ml, 1ml',
            'Needle Gauges': '29G, 30G, 31G',
            'Needle Lengths': '8mm, 12.7mm',
            'Markings': 'Units (U-40, U-100)',
            'Sterilization': 'EO sterilized',
            'Packaging': '100 syringes/box, 10 boxes/carton'
        },
        faq: [
            { q: 'What sizes are available?', a: '0.3ml, 0.5ml, and 1ml insulin syringes.' },
            { q: 'What needle gauges are available?', a: '29G, 30G, and 31G ultra-fine needles for minimal pain.' },
            { q: 'Are these syringes marked in units?', a: 'Yes, clearly marked in U-40 and U-100 units for accurate dosage.' }
        ],
        seo: {
            title: 'Insulin Syringes | V5 Medical - Diabetes Supplies',
            description: 'High-quality sterile insulin syringes for diabetes management. CE and FDA certified with ultra-fine needles and clear dosage markings.',
            keywords: 'insulin syringes, diabetes syringes, ultra-fine needles, medical syringes, injection supplies, ISO 13485'
        }
    },
    
    // Dental Products
    'dental-drill': {
        id: 'dental-drill',
        name: 'Dental Drill Handpiece',
        chineseName: '牙科手机',
        category: 'dental-products',
        short: 'High-speed dental drill handpiece for restorative dentistry',
        description: 'High-quality high-speed dental drill handpiece for restorative dentistry procedures. Air-driven with ceramic bearings for smooth operation and long life. Push-button chuck for easy bur changes. Lightweight and balanced design for comfortable use during extended procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-speed air-driven',
            'Ceramic bearings for durability',
            'Push-button chuck',
            'Lightweight and balanced',
            'Autoclavable'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-drill.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/drill-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/drill-packaging.jpg'
        ],
        specs: {
            'Type': 'High-speed air-driven',
            'Speed': 'Up to 400,000 rpm',
            'Chuck Type': 'Push-button',
            'Bearings': 'Ceramic',
            'Sterilization': 'Autoclavable (135°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What is the speed range?', a: 'Up to 400,000 rpm for efficient cutting and polishing.' },
            { q: 'Are these handpieces autoclavable?', a: 'Yes, fully autoclavable at 135°C for infection control.' },
            { q: 'What type of chuck is used?', a: 'Push-button chuck for easy and quick bur changes.' }
        ],
        seo: {
            title: 'Dental Drill Handpiece | V5 Medical - Dental Instruments',
            description: 'High-quality high-speed dental drill handpiece with ceramic bearings. CE and FDA certified for restorative dentistry with push-button chuck.',
            keywords: 'dental drill, dental handpiece, high-speed drill, dental instruments, restorative dentistry, ISO 13485'
        }
    },
    
    'dental-burs': {
        id: 'dental-burs',
        name: 'Dental Burs',
        chineseName: '牙科车针',
        category: 'dental-products',
        short: 'Dental burs for cutting and polishing teeth',
        description: 'High-quality dental burs for cutting, shaping, and polishing teeth during restorative dentistry procedures. Made from tungsten carbide with diamond coating options. Available in various shapes and sizes for different applications including cavity preparation, finishing, and polishing.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Tungsten carbide construction',
            'Diamond coating options',
            'Various shapes and sizes',
            'Compatible with standard handpieces',
            'Sterile packaging'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-burs.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/bur-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/bur-packaging.jpg'
        ],
        specs: {
            'Material': 'Tungsten carbide, diamond coating options',
            'Shapes': 'Round, fissure, inverted cone, pear, flame',
            'Sizes': 'ISO sizes 001 to 806',
            'Compatibility': 'Standard dental handpieces',
            'Sterilization': 'Sterile packaging',
            'Packaging': '5 burs/pack, 10 packs/box'
        },
        faq: [
            { q: 'What materials are available?', a: 'Tungsten carbide with optional diamond coating for different applications.' },
            { q: 'What shapes are available?', a: 'Round, fissure, inverted cone, pear, flame, and many other specialized shapes.' },
            { q: 'Are these burs compatible with all handpieces?', a: 'Yes, compatible with standard dental handpieces.' }
        ],
        seo: {
            title: 'Dental Burs | V5 Medical - Dental Cutting Tools',
            description: 'High-quality dental burs made from tungsten carbide with diamond coating options. CE and FDA certified with various shapes for restorative dentistry.',
            keywords: 'dental burs, tungsten carbide burs, diamond burs, dental cutting tools, restorative dentistry, ISO 13485'
        }
    },
    
    'dental-mirrors': {
        id: 'dental-mirrors',
        name: 'Dental Mirrors',
        chineseName: '牙科口镜',
        category: 'dental-products',
        short: 'Dental mirrors for oral examination',
        description: 'High-quality dental mirrors for oral examination and treatment procedures. Made from stainless steel with optical quality mirrors. Available in various sizes and handle types for different applications. Autoclavable for repeated use with proper infection control.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Stainless steel construction',
            'Optical quality mirrors',
            'Various sizes and handles',
            'Autoclavable and reusable',
            'Anti-fog options available'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-mirrors.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/mirror-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/mirror-packaging.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Mirror Sizes': '16mm, 18mm, 20mm diameter',
            'Handle Types': 'Standard, ergonomic, fiber optic',
            'Features': 'Anti-fog coating options',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What mirror sizes are available?', a: '16mm, 18mm, and 20mm diameter mirrors.' },
            { q: 'Are anti-fog options available?', a: 'Yes, anti-fog coated mirrors available for better visibility.' },
            { q: 'Are these mirrors autoclavable?', a: 'Yes, fully autoclavable for repeated use.' }
        ],
        seo: {
            title: 'Dental Mirrors | V5 Medical - Oral Examination Tools',
            description: 'High-quality dental mirrors with optical quality surfaces. CE and FDA certified with various sizes and anti-fog options for oral examination.',
            keywords: 'dental mirrors, oral mirrors, dental instruments, examination tools, anti-fog mirrors, ISO 13485'
        }
    },
    
    'dental-forceps': {
        id: 'dental-forceps',
        name: 'Dental Forceps',
        chineseName: '牙科镊',
        category: 'dental-products',
        short: 'Dental forceps for tooth extraction',
        description: 'High-quality dental forceps for tooth extraction procedures. Made from high-grade stainless steel with precision-machined beaks for secure grip. Available in various patterns for different tooth types and positions. Ergonomic handles for comfortable use and optimal control during extractions.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-grade stainless steel',
            'Precision-machined beaks',
            'Various patterns for different teeth',
            'Ergonomic handles',
            'Autoclavable and reusable'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-forceps.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/forceps-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/forceps-packaging.jpg'
        ],
        specs: {
            'Material': 'High-grade stainless steel',
            'Patterns': 'Upper anterior, upper posterior, lower anterior, lower posterior',
            'Sizes': 'Standard and pediatric',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What patterns are available?', a: 'Upper anterior, upper posterior, lower anterior, and lower posterior forceps for different tooth types.' },
            { q: 'Are pediatric sizes available?', a: 'Yes, specialized pediatric forceps available for children\'s dentistry.' },
            { q: 'What is the material quality?', a: 'High-grade stainless steel for durability and precision.' }
        ],
        seo: {
            title: 'Dental Forceps | V5 Medical - Extraction Instruments',
            description: 'High-quality dental forceps for tooth extraction with various patterns. CE and FDA certified with ergonomic handles and precision-machined beaks.',
            keywords: 'dental forceps, extraction forceps, dental instruments, tooth extraction, oral surgery, ISO 13485'
        }
    },
    
    'dental-scalers': {
        id: 'dental-scalers',
        name: 'Dental Scalers',
        chineseName: '牙科洁治器',
        category: 'dental-products',
        short: 'Dental scalers for periodontal cleaning',
        description: 'High-quality dental scalers for periodontal cleaning and calculus removal. Made from stainless steel with precision tips for effective plaque and calculus removal. Available in various shapes for different areas of the mouth. Ergonomic handles for comfortable use during prophylaxis procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Stainless steel construction',
            'Precision tips for effective cleaning',
            'Various shapes for different areas',
            'Ergonomic handles',
            'Autoclavable and reusable'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-scalers.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/scaler-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/scaler-packaging.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Types': 'Sickle scalers, curettes, periodontal scalers',
            'Shapes': 'Anterior, posterior, universal',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What types of scalers are available?', a: 'Sickle scalers, curettes, and periodontal scalers for different cleaning needs.' },
            { q: 'What shapes are available?', a: 'Anterior, posterior, and universal scalers for different areas of the mouth.' },
            { q: 'Are these scalers suitable for periodontal therapy?', a: 'Yes, specifically designed for periodontal cleaning and calculus removal.' }
        ],
        seo: {
            title: 'Dental Scalers | V5 Medical - Periodontal Tools',
            description: 'High-quality dental scalers for periodontal cleaning with various types and shapes. CE and FDA certified for effective plaque and calculus removal.',
            keywords: 'dental scalers, periodontal scalers, dental instruments, prophylaxis tools, calculus removal, ISO 13485'
        }
    },
    
    'dental-curing-light': {
        id: 'dental-curing-light',
        name: 'Dental Curing Light',
        chineseName: '牙科光固化灯',
        category: 'dental-products',
        short: 'LED dental curing light for composite materials',
        description: 'High-quality LED dental curing light for polymerization of light-cured dental materials. High-intensity LED with broad spectrum for effective curing of composite resins, sealants, and bonding agents. Lightweight and ergonomic design with rechargeable battery for cordless operation.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-intensity LED technology',
            'Broad spectrum for all materials',
            'Cordless operation with rechargeable battery',
            'Lightweight and ergonomic',
            'Multiple curing modes'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/curing-light.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/curing-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/curing-packaging.jpg'
        ],
        specs: {
            'Type': 'LED curing light',
            'Intensity': '1200-2000 mW/cm²',
            'Wavelength': '430-480 nm',
            'Battery': 'Rechargeable lithium-ion',
            'Curing Modes': 'Standard, fast, pulse',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What is the light intensity?', a: '1200-2000 mW/cm² for fast and effective curing.' },
            { q: 'Is this light cordless?', a: 'Yes, cordless operation with rechargeable lithium-ion battery.' },
            { q: 'What materials can be cured?', a: 'All light-cured dental materials including composite resins, sealants, and bonding agents.' }
        ],
        seo: {
            title: 'Dental Curing Light | V5 Medical - LED Polymerization',
            description: 'High-quality LED dental curing light with high intensity and broad spectrum. CE and FDA certified for cordless operation with rechargeable battery.',
            keywords: 'dental curing light, LED curing light, dental instruments, composite curing, polymerization, ISO 13485'
        }
    },
    
    // Surgical Packs
    'surgical-pack': {
        id: 'surgical-pack',
        name: 'Surgical Pack',
        chineseName: '手术包',
        category: 'surgical-packs',
        short: 'Custom surgical packs with procedure-specific instruments',
        description: 'Customized surgical packs containing all necessary instruments and supplies for specific surgical procedures. Each pack is assembled according to procedure requirements and includes instruments, drapes, gauze, and other necessary supplies. EO sterilized and ready for use to reduce preparation time and ensure consistency.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Customized for specific procedures',
            'Complete with all necessary supplies',
            'EO sterilized and ready to use',
            'Reduces preparation time',
            'Ensures consistency and safety'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/surgical-pack.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/pack-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/pack-contents.jpg'
        ],
        specs: {
            'Contents': 'Instruments, drapes, gauze, sutures, needles, and other procedure-specific supplies',
            'Sterilization': 'EO sterilized',
            'Packaging': 'Sterile packaging with indicator',
            'Shelf Life': '5 years',
            'Customization': 'Available according to specific requirements'
        },
        faq: [
            { q: 'What procedure-specific packs are available?', a: 'General surgery, obstetrics, orthopedics, ophthalmology, and many others.' },
            { q: 'Can packs be customized?', a: 'Yes, we can customize packs to meet specific hospital requirements.' },
            { q: 'What is the shelf life?', a: '5 years from manufacturing date when stored properly.' }
        ],
        seo: {
            title: 'Surgical Packs | V5 Medical - Custom Procedure Packs',
            description: 'Customized surgical packs with procedure-specific instruments and supplies. EO sterilized and ready for use to reduce preparation time.',
            keywords: 'surgical packs, custom packs, procedure packs, surgical instruments, medical packs, ISO 13485'
        }
    }
};

// Make database available globally
window.productDatabase = productDatabase;
window.finalProductDatabase = productDatabase; // 新增：兼容product-loader.js的检查

// If using modules, export the database
if (typeof module !== 'undefined') {
    module.exports = productDatabase;
}