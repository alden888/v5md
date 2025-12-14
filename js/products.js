/**
 * V5 Medical Product Database
 * Updated with proper GitHub image URLs
 * @version 2.0.0
 */

// Product database with correct image paths
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
            'Braided structure for superior handling',
            'Excellent knot security and tensile strength',
            'Predictable absorption (56-70 days)',
            'Good tissue approximation',
            'Available with or without needle'
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
            { q: 'What is the difference between PGA and PGLA?', a: 'PGLA is a copolymer that offers better handling characteristics than PGA monofilament.' },
            { q: 'Is this suture coated?', a: 'Yes, our PGLA sutures are coated for smoother tissue passage.' },
            { q: 'What sterilization method is used?', a: 'EO (Ethylene Oxide) sterilization.' }
        ],
        seo: {
            title: 'PGLA Braided Suture | V5 Medical - Surgical Sutures Supplier',
            description: 'High-quality PGLA braided absorbable sutures with CE and FDA certification. Excellent handling and knot security for various surgical procedures.',
            keywords: 'PGLA suture, braided suture, absorbable suture, surgical suture, medical suture'
        }
    },
    
    'chromic-catgut': {
        id: 'chromic-catgut',
        name: 'Chromic Catgut Suture',
        chineseName: '铬制肠线',
        category: 'surgical-sutures',
        short: 'Natural chromic catgut suture for ophthalmic and plastic surgery',
        description: 'Chromic catgut is a natural absorbable suture made from purified collagen. The chromic salt treatment delays absorption, making it suitable for ophthalmic, plastic, and oral surgery. Absorption occurs within 70-90 days.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Natural collagen material',
            'Chromic treated for delayed absorption',
            'Excellent tissue compatibility',
            'Good handling characteristics',
            'Suitable for delicate surgeries'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/chromic-catgut.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/catgut-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/ophthalmic-suture.jpg'
        ],
        specs: {
            'Material': 'Purified collagen (sheep intestine)',
            'Structure': 'Monofilament',
            'Absorption Time': '70-90 days',
            'Sizes': 'USP 10-0 to 3-0',
            'Needle Type': 'Taper point, spatula',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What is the absorption time?', a: 'Chromic catgut maintains strength for 14-21 days and is absorbed within 70-90 days.' },
            { q: 'Is this suture suitable for ophthalmic surgery?', a: 'Yes, chromic catgut is commonly used in ophthalmic procedures.' },
            { q: 'Does this suture cause tissue reaction?', a: 'Minimal tissue reaction compared to synthetic sutures.' }
        ],
        seo: {
            title: 'Chromic Catgut Suture | V5 Medical - Natural Absorbable Sutures',
            description: 'High-quality chromic catgut sutures for ophthalmic and plastic surgery. Natural collagen material with minimal tissue reaction.',
            keywords: 'chromic catgut, natural suture, absorbable suture, ophthalmic suture, surgical suture'
        }
    },
    
    'plain-catgut': {
        id: 'plain-catgut',
        name: 'Plain Catgut Suture',
        chineseName: '普通肠线',
        category: 'surgical-sutures',
        short: 'Fast-absorbing plain catgut suture for superficial wounds',
        description: 'Plain catgut is a natural absorbable suture made from purified collagen. Without chromic treatment, it absorbs faster, making it ideal for superficial wounds, dental procedures, and ophthalmic surgery. Absorption occurs within 7-10 days.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Fast absorption (7-10 days)',
            'Natural collagen material',
            'Excellent tissue compatibility',
            'Good handling characteristics',
            'Suitable for superficial wounds'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/plain-catgut.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/catgut-packaging.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/dental-suture.jpg'
        ],
        specs: {
            'Material': 'Purified collagen (sheep intestine)',
            'Structure': 'Monofilament',
            'Absorption Time': '7-10 days',
            'Sizes': 'USP 10-0 to 3-0',
            'Needle Type': 'Taper point, spatula',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What is the difference between plain and chromic catgut?', a: 'Plain catgut absorbs faster (7-10 days) while chromic catgut absorbs slower (70-90 days).' },
            { q: 'Is this suture suitable for dental surgery?', a: 'Yes, plain catgut is commonly used in dental procedures.' },
            { q: 'What is the shelf life?', a: '3 years from manufacturing date when stored properly.' }
        ],
        seo: {
            title: 'Plain Catgut Suture | V5 Medical - Fast Absorbing Sutures',
            description: 'Fast-absorbing plain catgut sutures for superficial wounds and dental procedures. Natural collagen material with excellent tissue compatibility.',
            keywords: 'plain catgut, fast absorbing suture, natural suture, dental suture, surgical suture'
        }
    },
    
    'silk-suture': {
        id: 'silk-suture',
        name: 'Silk Non-Absorbable Suture',
        chineseName: '蚕丝非吸收缝合线',
        category: 'surgical-sutures',
        short: 'Braided silk suture with excellent handling and cosmetic results',
        description: 'Silk non-absorbable sutures are natural braided sutures that provide excellent handling characteristics and cosmetic results. They are commonly used in ophthalmic, plastic, and cardiovascular surgery where permanent support is needed.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Natural silk material',
            'Braided structure for superior handling',
            'Excellent knot security',
            'Good cosmetic results',
            'Non-absorbable for permanent support'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/silk-suture.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/silk-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/cardiovascular-suture.jpg'
        ],
        specs: {
            'Material': 'Natural silk',
            'Structure': 'Braided',
            'Absorption': 'Non-absorbable',
            'Sizes': 'USP 10-0 to 2',
            'Needle Type': 'Reverse cutting, taper point, spatula',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'Is silk suture absorbable?', a: 'No, silk is a non-absorbable suture that provides permanent support.' },
            { q: 'What are the main applications?', a: 'Ophthalmic, plastic, cardiovascular, and general surgery.' },
            { q: 'Does silk suture cause tissue reaction?', a: 'Minimal tissue reaction with excellent biocompatibility.' }
        ],
        seo: {
            title: 'Silk Non-Absorbable Suture | V5 Medical - Surgical Sutures',
            description: 'High-quality silk non-absorbable sutures for ophthalmic and plastic surgery. Excellent handling and cosmetic results with permanent support.',
            keywords: 'silk suture, non-absorbable suture, braided suture, surgical suture, ophthalmic suture'
        }
    },
    
    'nylon-suture': {
        id: 'nylon-suture',
        name: 'Nylon Monofilament Suture',
        chineseName: '尼龙单丝缝合线',
        category: 'surgical-sutures',
        short: 'Nylon monofilament suture for general soft tissue approximation',
        description: 'Nylon (polyamide) monofilament non-absorbable sutures provide excellent tensile strength and long-term support. They are inert, non-reactive, and suitable for general soft tissue approximation, skin closure, and cardiovascular surgery.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Monofilament structure for smooth tissue passage',
            'Excellent tensile strength and knot security',
            'Inert and non-reactive',
            'Non-absorbable for permanent support',
            'Available in clear or black'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/nylon-suture.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/nylon-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/skin-closure.jpg'
        ],
        specs: {
            'Material': 'Nylon (polyamide)',
            'Structure': 'Monofilament',
            'Absorption': 'Non-absorbable',
            'Sizes': 'USP 10-0 to 5',
            'Needle Type': 'Reverse cutting, taper point',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What colors are available?', a: 'Clear (transparent) and black for better visibility.' },
            { q: 'Is this suture suitable for skin closure?', a: 'Yes, nylon is commonly used for skin closure due to its excellent cosmetic results.' },
            { q: 'What is the tensile strength retention?', a: 'Maintains 100% strength indefinitely.' }
        ],
        seo: {
            title: 'Nylon Monofilament Suture | V5 Medical - Non-Absorbable Sutures',
            description: 'High-quality nylon monofilament sutures for general surgery and skin closure. Excellent tensile strength with permanent support.',
            keywords: 'nylon suture, monofilament suture, non-absorbable suture, surgical suture, skin closure'
        }
    },
    
    'polypropylene-suture': {
        id: 'polypropylene-suture',
        name: 'Polypropylene Suture',
        chineseName: '聚丙烯缝合线',
        category: 'surgical-sutures',
        short: 'Polypropylene monofilament suture for cardiovascular surgery',
        description: 'Polypropylene (Prolene) monofilament non-absorbable sutures are inert, non-reactive, and provide excellent tensile strength. They are ideal for cardiovascular, ophthalmic, and plastic surgery where permanent support and minimal tissue reaction are required.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Monofilament structure for smooth tissue passage',
            'Excellent tensile strength and knot security',
            'Inert and non-reactive',
            'Non-absorbable for permanent support',
            'Suitable for cardiovascular surgery'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polypropylene-suture.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polypropylene-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/cardiac-suture.jpg'
        ],
        specs: {
            'Material': 'Polypropylene',
            'Structure': 'Monofilament',
            'Absorption': 'Non-absorbable',
            'Sizes': 'USP 10-0 to 5',
            'Needle Type': 'Reverse cutting, taper point, spatula',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'Is this suture suitable for cardiovascular surgery?', a: 'Yes, polypropylene is the standard for cardiovascular procedures.' },
            { q: 'What is the tissue reaction?', a: 'Minimal to no tissue reaction due to inert nature.' },
            { q: 'Is this suture radiopaque?', a: 'Yes, our polypropylene sutures are radiopaque for visualization.' }
        ],
        seo: {
            title: 'Polypropylene Suture | V5 Medical - Cardiovascular Sutures',
            description: 'High-quality polypropylene sutures for cardiovascular and ophthalmic surgery. Inert, non-reactive material with permanent support.',
            keywords: 'polypropylene suture, prolene suture, cardiovascular suture, non-absorbable suture, surgical suture'
        }
    },
    
    'polyester-suture': {
        id: 'polyester-suture',
        name: 'Polyester Braided Suture',
        chineseName: '聚酯编织缝合线',
        category: 'surgical-sutures',
        short: 'Polyester braided suture for general and orthopedic surgery',
        description: 'Polyester (Ethibond) braided non-absorbable sutures provide excellent tensile strength and knot security. They are coated for smoother tissue passage and are suitable for general, orthopedic, and cardiovascular surgery where permanent support is needed.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Braided structure for superior handling',
            'Excellent tensile strength and knot security',
            'Coated for smoother tissue passage',
            'Non-absorbable for permanent support',
            'Suitable for orthopedic surgery'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polyester-suture.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/polyester-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/orthopedic-suture.jpg'
        ],
        specs: {
            'Material': 'Polyester',
            'Structure': 'Braided',
            'Absorption': 'Non-absorbable',
            'Sizes': 'USP 5-0 to 5',
            'Needle Type': 'Reverse cutting, taper point',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'Is this suture coated?', a: 'Yes, our polyester sutures are coated for smoother tissue passage.' },
            { q: 'What are the main applications?', a: 'General, orthopedic, and cardiovascular surgery.' },
            { q: 'Does this suture maintain strength over time?', a: 'Yes, maintains 100% strength indefinitely.' }
        ],
        seo: {
            title: 'Polyester Braided Suture | V5 Medical - Orthopedic Sutures',
            description: 'High-quality polyester braided sutures for orthopedic and general surgery. Excellent tensile strength with permanent support.',
            keywords: 'polyester suture, braided suture, non-absorbable suture, orthopedic suture, surgical suture'
        }
    },
    
    'pdo-suture': {
        id: 'pdo-suture',
        name: 'PDO Absorbable Suture',
        chineseName: 'PDO可吸收缝合线',
        category: 'surgical-sutures',
        short: 'PDO monofilament suture for plastic and reconstructive surgery',
        description: 'Polydioxanone (PDO) monofilament absorbable sutures provide extended tensile strength retention and slow absorption. They are ideal for plastic, reconstructive, and orthopedic surgery where longer support is needed. Absorption occurs within 180-210 days.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Monofilament structure for smooth tissue passage',
            'Extended tensile strength retention',
            'Slow absorption (180-210 days)',
            'Minimal tissue reaction',
            'Suitable for plastic surgery'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pdo-suture.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/pdo-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-sutures/plastic-surgery.jpg'
        ],
        specs: {
            'Material': 'Polydioxanone (PDO)',
            'Structure': 'Monofilament',
            'Absorption Time': '180-210 days',
            'Sizes': 'USP 6-0 to 2',
            'Needle Type': 'Reverse cutting, taper point',
            'Packaging': '12/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What is the absorption profile?', a: 'PDO maintains 70% strength at 4 weeks and is absorbed within 180-210 days.' },
            { q: 'Is this suture suitable for plastic surgery?', a: 'Yes, PDO is commonly used in plastic and reconstructive procedures.' },
            { q: 'What is the advantage of PDO over other sutures?', a: 'PDO provides longer support than PGA or PGLA sutures.' }
        ],
        seo: {
            title: 'PDO Absorbable Suture | V5 Medical - Plastic Surgery Sutures',
            description: 'High-quality PDO absorbable sutures for plastic and reconstructive surgery. Extended tensile strength retention with slow absorption.',
            keywords: 'PDO suture, polydioxanone suture, absorbable suture, plastic surgery suture, surgical suture'
        }
    },
    
    // Surgical Instruments
    'surgical-blades': {
        id: 'surgical-blades',
        name: 'Surgical Blades',
        chineseName: '手术刀片',
        category: 'surgical-instruments',
        short: 'Sterile surgical blades for various surgical procedures',
        description: 'High-quality surgical blades made from stainless steel with sharp cutting edges. Available in various sizes and configurations for general, ophthalmic, and specialized surgical procedures. Individually packaged and EO sterilized.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-quality stainless steel',
            'Sharp cutting edges',
            'Individually packaged',
            'EO sterilized',
            'Various sizes available'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/surgical-blades.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/blade-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/blade-packaging.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Sizes': '10, 11, 12, 15, 20-25, 60-67',
            'Sterilization': 'EO sterilized',
            'Packaging': '100 blades/box, 10 boxes/carton',
            'Shelf Life': '5 years'
        },
        faq: [
            { q: 'What sizes are available?', a: 'Standard sizes 10, 11, 12, 15, 20-25, and ophthalmic sizes 60-67.' },
            { q: 'Are the blades sterile?', a: 'Yes, all blades are EO sterilized and individually packaged.' },
            { q: 'What is the shelf life?', a: '5 years from manufacturing date when stored properly.' }
        ],
        seo: {
            title: 'Surgical Blades | V5 Medical - Sterile Surgical Instruments',
            description: 'High-quality sterile surgical blades made from stainless steel. Various sizes available for general and specialized surgical procedures.',
            keywords: 'surgical blades, sterile blades, stainless steel blades, surgical instruments, medical blades'
        }
    },
    
    'scalpels': {
        id: 'scalpels',
        name: 'Disposable Scalpels',
        chineseName: '一次性手术刀',
        category: 'surgical-instruments',
        short: 'Disposable scalpels with plastic handles for single use',
        description: 'Disposable scalpels with plastic handles and stainless steel blades. Designed for single use to prevent cross-contamination. Available in various blade sizes with ergonomic handles for comfortable use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Disposable design for single use',
            'Ergonomic plastic handle',
            'Stainless steel blade',
            'EO sterilized',
            'Pre-assembled for convenience'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpels.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpel-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/scalpel-packaging.jpg'
        ],
        specs: {
            'Blade Material': 'Stainless steel',
            'Handle Material': 'Plastic',
            'Sizes': '10, 11, 12, 15, 20-25',
            'Sterilization': 'EO sterilized',
            'Packaging': '50 scalpels/box, 10 boxes/carton'
        },
        faq: [
            { q: 'Are these scalpels sterile?', a: 'Yes, all disposable scalpels are EO sterilized.' },
            { q: 'What is the advantage of disposable scalpels?', a: 'Prevents cross-contamination and eliminates need for sterilization.' },
            { q: 'Can the blades be removed?', a: 'No, these are permanently attached for safety.' }
        ],
        seo: {
            title: 'Disposable Scalpels | V5 Medical - Single Use Surgical Instruments',
            description: 'High-quality disposable scalpels with plastic handles and stainless steel blades. Single use design to prevent cross-contamination.',
            keywords: 'disposable scalpels, single use scalpels, surgical scalpels, medical scalpels, surgical instruments'
        }
    },
    
    'lancets': {
        id: 'lancets',
        name: 'Blood Lancets',
        chineseName: '采血针',
        category: 'surgical-instruments',
        short: 'Sterile blood lancets for capillary blood sampling',
        description: 'Sterile blood lancets designed for capillary blood sampling. Available in various depths for different applications. Easy to use with consistent depth penetration for minimal pain and maximum patient comfort.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Sterile for single use',
            'Various depths available',
            'Consistent depth penetration',
            'Minimal pain design',
            'Easy to use'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/lancets.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/lancet-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/lancet-packaging.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Depths': '1.0mm, 1.5mm, 2.0mm, 2.5mm',
            'Sterilization': 'EO sterilized',
            'Packaging': '100 lancets/box, 100 boxes/carton',
            'Shelf Life': '5 years'
        },
        faq: [
            { q: 'What depths are available?', a: '1.0mm, 1.5mm, 2.0mm, and 2.5mm for different applications.' },
            { q: 'Are these lancets sterile?', a: 'Yes, all lancets are EO sterilized for single use.' },
            { q: 'What is the shelf life?', a: '5 years from manufacturing date when stored properly.' }
        ],
        seo: {
            title: 'Blood Lancets | V5 Medical - Sterile Lancets for Blood Sampling',
            description: 'High-quality sterile blood lancets for capillary blood sampling. Various depths available with minimal pain design.',
            keywords: 'blood lancets, sterile lancets, capillary blood sampling, medical lancets, disposable lancets'
        }
    },
    
    'surgical-scissors': {
        id: 'surgical-scissors',
        name: 'Surgical Scissors',
        chineseName: '手术剪',
        category: 'surgical-instruments',
        short: 'Surgical scissors for cutting tissue and sutures',
        description: 'High-quality surgical scissors made from stainless steel with sharp cutting edges. Available in various types including Mayo, Metzenbaum, and iris scissors for different surgical applications. Reusable and autoclavable.',
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
            { q: 'What types of scissors are available?', a: 'Mayo, Metzenbaum, Iris, and suture scissors in various sizes.' },
            { q: 'Are these scissors reusable?', a: 'Yes, they are made from stainless steel and can be autoclaved.' },
            { q: 'What is the warranty?', a: '1 year warranty against manufacturing defects.' }
        ],
        seo: {
            title: 'Surgical Scissors | V5 Medical - Reusable Surgical Instruments',
            description: 'High-quality surgical scissors made from stainless steel. Various types available for different surgical applications.',
            keywords: 'surgical scissors, mayo scissors, metzenbaum scissors, iris scissors, surgical instruments'
        }
    },
    
    'forceps': {
        id: 'forceps',
        name: 'Surgical Forceps',
        chineseName: '手术镊',
        category: 'surgical-instruments',
        short: 'Surgical forceps for grasping and holding tissue',
        description: 'High-quality surgical forceps made from stainless steel. Available in toothed and non-toothed varieties for different applications. Includes tissue forceps, dressing forceps, and mosquito forceps for precise tissue handling.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-quality stainless steel',
            'Precision tips',
            'Ergonomic handles',
            'Reusable and autoclavable',
            'Toothed and non-toothed available'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/forceps-types.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Types': 'Tissue, dressing, mosquito, hemostatic forceps',
            'Sizes': '3.5" to 8"',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What types of forceps are available?', a: 'Tissue, dressing, mosquito, and hemostatic forceps.' },
            { q: 'What is the difference between toothed and non-toothed?', a: 'Toothed forceps are for grasping tissue, non-toothed for delicate structures.' },
            { q: 'Are these forceps reusable?', a: 'Yes, they are made from stainless steel and can be autoclaved.' }
        ],
        seo: {
            title: 'Surgical Forceps | V5 Medical - Precision Surgical Instruments',
            description: 'High-quality surgical forceps made from stainless steel. Various types available for precise tissue handling.',
            keywords: 'surgical forceps, tissue forceps, dressing forceps, mosquito forceps, surgical instruments'
        }
    },
    
    'needle-holders': {
        id: 'needle-holders',
        name: 'Needle Holders',
        chineseName: '持针器',
        category: 'surgical-instruments',
        short: 'Needle holders for holding surgical needles',
        description: 'High-quality needle holders made from stainless steel with tungsten carbide inserts for secure needle grip. Available in various sizes with ergonomic handles for comfortable use during suturing procedures.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'High-quality stainless steel',
            'Tungsten carbide inserts',
            'Secure needle grip',
            'Ergonomic handles',
            'Reusable and autoclavable'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/needle-holders.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/needle-holder-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-instruments/needle-holder-use.jpg'
        ],
        specs: {
            'Material': 'Stainless steel with tungsten carbide inserts',
            'Sizes': '4.5" to 8"',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year',
            'Grip Type': 'Cross-serrated'
        },
        faq: [
            { q: 'What sizes are available?', a: '4.5" to 8" to accommodate different needle sizes.' },
            { q: 'Why tungsten carbide inserts?', a: 'Provides superior grip and durability compared to stainless steel.' },
            { q: 'Are these needle holders autoclavable?', a: 'Yes, they can be autoclaved at 134°C.' }
        ],
        seo: {
            title: 'Needle Holders | V5 Medical - Surgical Suturing Instruments',
            description: 'High-quality needle holders with tungsten carbide inserts for secure needle grip during suturing procedures.',
            keywords: 'needle holders, surgical needle holders, tungsten carbide needle holders, suturing instruments, surgical instruments'
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
            { q: 'What sizes are available?', a: '5x5cm, 7.5x7.5cm, and 10x10cm in 4-ply and 8-ply.' },
            { q: 'Are these gauze swabs sterile?', a: 'Yes, all gauze swabs are EO sterilized.' },
            { q: 'What is the absorbency rate?', a: 'High absorbency with excellent fluid retention capabilities.' }
        ],
        seo: {
            title: 'Gauze Swabs | V5 Medical - Sterile Gauze Dressings',
            description: 'High-quality sterile gauze swabs made from 100% cotton. Various sizes and ply available for wound care and surgical use.',
            keywords: 'gauze swabs, sterile gauze, cotton gauze, wound care, medical gauze'
        }
    },
    
    'gauze-rolls': {
        id: 'gauze-rolls',
        name: 'Gauze Rolls',
        chineseName: '纱布卷',
        category: 'gauze-dressings',
        short: 'Gauze rolls for wound dressing and bandaging',
        description: 'High-quality gauze rolls made from 100% cotton. Available in various widths for wound dressing, bandaging, and general medical applications. Soft, absorbent, and conformable to body contours.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            '100% cotton material',
            'High absorbency',
            'Soft and conformable',
            'Easy to tear',
            'Various widths available'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-rolls.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-roll-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/gauze-roll-packaging.jpg'
        ],
        specs: {
            'Material': '100% cotton',
            'Widths': '5cm, 7.5cm, 10cm, 15cm',
            'Length': '4.5m per roll',
            'Ply': '12-ply',
            'Packaging': '12 rolls/box, 10 boxes/carton'
        },
        faq: [
            { q: 'What widths are available?', a: '5cm, 7.5cm, 10cm, and 15cm widths.' },
            { q: 'Is this gauze sterile?', a: 'Available in both sterile and non-sterile options.' },
            { q: 'How long is each roll?', a: '4.5 meters per roll.' }
        ],
        seo: {
            title: 'Gauze Rolls | V5 Medical - Cotton Gauze Bandages',
            description: 'High-quality gauze rolls made from 100% cotton. Various widths available for wound dressing and bandaging.',
            keywords: 'gauze rolls, gauze bandages, cotton gauze, wound dressing, medical bandages'
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
            { q: 'Are these gauze balls sterile?', a: 'Yes, all gauze balls are EO sterilized.' },
            { q: 'What are the main applications?', a: 'Surgical use, wound care, and general medical applications.' }
        ],
        seo: {
            title: 'Gauze Balls | V5 Medical - Sterile Gauze Sponges',
            description: 'High-quality sterile gauze balls made from 100% cotton. Various sizes available for surgical and wound care use.',
            keywords: 'gauze balls, sterile gauze, cotton gauze, wound care, surgical gauze'
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
            { q: 'What sizes are available?', a: '10x20cm, 15x20cm, and 20x30cm sizes.' },
            { q: 'Are these pads sterile?', a: 'Yes, all abdominal pads are EO sterilized.' },
            { q: 'What is the absorbency capacity?', a: 'High absorbency designed for heavy exudate wounds.' }
        ],
        seo: {
            title: 'Abdominal Pads | V5 Medical - Large Sterile Dressings',
            description: 'High-quality sterile abdominal pads made from 100% cotton. Large sizes available for extensive wound care and surgical use.',
            keywords: 'abdominal pads, sterile dressings, large wound dressings, surgical dressings, medical pads'
        }
    },
    
    'cotton-rolls': {
        id: 'cotton-rolls',
        name: 'Cotton Rolls',
        chineseName: '棉卷',
        category: 'gauze-dressings',
        short: 'Dental cotton rolls for oral procedures',
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
            'Sizes': '12mm x 40mm, 15mm x 50mm',
            'Quantity': '500 rolls/bag',
            'Packaging': '10 bags/carton',
            'Density': 'Medium'
        },
        faq: [
            { q: 'What sizes are available?', a: '12mm x 40mm and 15mm x 50mm sizes.' },
            { q: 'Are these cotton rolls sterile?', a: 'Available in both sterile and non-sterile options.' },
            { q: 'What are the main applications?', a: 'Dental procedures to absorb saliva and maintain dry field.' }
        ],
        seo: {
            title: 'Cotton Rolls | V5 Medical - Dental Cotton Products',
            description: 'High-quality dental cotton rolls made from 100% pure cotton. Ideal for oral procedures to absorb saliva and maintain dry field.',
            keywords: 'cotton rolls, dental cotton, oral cotton, dental products, medical cotton'
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
            'EO sterilized',
            'Uniform size and quality'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-balls.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-ball-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/gauze-dressings/cotton-ball-packaging.jpg'
        ],
        specs: {
            'Material': '100% pure cotton',
            'Sizes': '1g, 2g per ball',
            'Quantity': '100 balls/box, 1000 balls/bag',
            'Sterilization': 'EO sterilized',
            'Packaging': '10 boxes/carton'
        },
        faq: [
            { q: 'What sizes are available?', a: '1g and 2g cotton balls available.' },
            { q: 'Are these cotton balls sterile?', a: 'Yes, all cotton balls are EO sterilized.' },
            { q: 'What are the main applications?', a: 'Medical use, wound care, and general hygiene applications.' }
        ],
        seo: {
            title: 'Cotton Balls | V5 Medical - Sterile Cotton Products',
            description: 'High-quality sterile cotton balls made from 100% pure cotton. Soft and absorbent for medical use and wound care.',
            keywords: 'cotton balls, sterile cotton, medical cotton, wound care, hygiene products'
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
            { q: 'What sizes are available?', a: '5x5cm, 7.5x7.5cm, and 10x10cm in 4-ply and 8-ply.' },
            { q: 'What is the advantage of non-woven?', a: 'Lint-free, stronger, and more absorbent than traditional gauze.' },
            { q: 'Are these sponges sterile?', a: 'Available in both sterile and non-sterile options.' }
        ],
        seo: {
            title: 'Non-Woven Sponges | V5 Medical - Lint-Free Dressings',
            description: 'High-quality non-woven sponges made from polyester/rayon blend. Lint-free and highly absorbent for wound care and cleaning.',
            keywords: 'non-woven sponges, lint-free sponges, medical sponges, wound care, dressing sponges'
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
            { q: 'Are these masks sterile?', a: 'Available in both sterile and non-sterile options.' },
            { q: 'What is the shelf life?', a: '3 years from manufacturing date when stored properly.' }
        ],
        seo: {
            title: 'Surgical Face Masks | V5 Medical - 3-Ply Medical Masks',
            description: 'High-quality 3-ply surgical face masks with melt-blown filter. BFE >95% for medical and general use.',
            keywords: 'surgical masks, 3-ply masks, medical masks, face masks, protective masks'
        }
    },
    
    'n95-ffp2-masks': {
        id: 'n95-ffp2-masks',
        name: 'N95/FFP2 Masks',
        chineseName: 'N95/FFP2口罩',
        category: 'protective-equipment',
        short: 'N95/FFP2 respirator masks with high filtration efficiency',
        description: 'High-quality N95/FFP2 respirator masks with cup or foldable design. Provides ≥95% filtration efficiency against non-oil based particles. Comfortable headband design with adjustable nose clip for secure fit.',
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
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-ffp2-masks.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/n95-packaging.jpg'
        ],
        specs: {
            'Standard': 'N95 / FFP2',
            'Filtration Efficiency': '≥95%',
            'Design': 'Cup or foldable',
            'Fit': 'Headband or ear loops',
            'Packaging': '20 masks/box, 10 boxes/carton',
            'Shelf Life': '5 years'
        },
        faq: [
            { q: 'What is the difference between N95 and FFP2?', a: 'Both provide ≥95% filtration efficiency, N95 is US standard, FFP2 is EU standard.' },
            { q: 'Are these masks reusable?', a: 'These are disposable masks for single use.' },
            { q: 'What is the shelf life?', a: '5 years from manufacturing date when stored properly.' }
        ],
        seo: {
            title: 'N95/FFP2 Masks | V5 Medical - High Filtration Respirators',
            description: 'High-quality N95/FFP2 respirator masks with ≥95% filtration efficiency. Cup or foldable design with comfortable fit.',
            keywords: 'N95 masks, FFP2 masks, respirator masks, protective masks, high filtration masks'
        }
    },
    
    'disposable-caps': {
        id: 'disposable-caps',
        name: 'Disposable Caps',
        chineseName: '一次性帽子',
        category: 'protective-equipment',
        short: 'Non-woven disposable caps for medical use',
        description: 'High-quality non-woven disposable caps for medical and surgical use. Elastic band design for comfortable fit. Available in bouffant and surgeon cap styles. Lightweight and breathable for extended wear.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Non-woven fabric',
            'Elastic band for secure fit',
            'Bouffant and surgeon cap styles',
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
            'Colors': 'Blue, White, Green',
            'Packaging': '100 caps/box, 50 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What styles are available?', a: 'Bouffant caps (pleated) and surgeon caps (tie-back).' },
            { q: 'Are these caps latex-free?', a: 'Yes, all caps are latex-free.' },
            { q: 'What colors are available?', a: 'Blue, white, and green colors.' }
        ],
        seo: {
            title: 'Disposable Caps | V5 Medical - Non-Woven Medical Caps',
            description: 'High-quality non-woven disposable caps for medical use. Bouffant and surgeon cap styles available.',
            keywords: 'disposable caps, medical caps, non-woven caps, surgical caps, protective caps'
        }
    },
    
    'surgical-gowns': {
        id: 'surgical-gowns',
        name: 'Surgical Gowns',
        chineseName: '手术衣',
        category: 'protective-equipment',
        short: 'Sterile surgical gowns for operating room use',
        description: 'High-quality sterile surgical gowns made from SMS non-woven fabric. Provides AAMI Level 3 protection with excellent barrier properties. Comfortable, breathable, and designed for operating room use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'SMS non-woven fabric',
            'AAMI Level 3 protection',
            'EO sterilized',
            'Reinforced seams',
            'Comfortable and breathable'
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
            'Packaging': '10 gowns/box, 10 boxes/carton'
        },
        faq: [
            { q: 'What protection level do these gowns provide?', a: 'AAMI Level 3 protection against fluid penetration.' },
            { q: 'Are these gowns sterile?', a: 'Yes, all surgical gowns are EO sterilized.' },
            { q: 'What sizes are available?', a: 'S, M, L, and XL sizes.' }
        ],
        seo: {
            title: 'Surgical Gowns | V5 Medical - Sterile Operating Room Gowns',
            description: 'High-quality sterile surgical gowns with AAMI Level 3 protection. SMS non-woven fabric for operating room use.',
            keywords: 'surgical gowns, sterile gowns, operating room gowns, medical gowns, protective gowns'
        }
    },
    
    'isolation-gowns': {
        id: 'isolation-gowns',
        name: 'Isolation Gowns',
        chineseName: '隔离衣',
        category: 'protective-equipment',
        short: 'Disposable isolation gowns for general protection',
        description: 'High-quality disposable isolation gowns made from non-woven fabric. Provides general protection against splashes and contamination. Comfortable, breathable, and suitable for medical and industrial use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Non-woven fabric',
            'Fluid resistant',
            'Tie-back design',
            'Comfortable and breathable',
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
            'Sizes': 'Universal (One size fits most)',
            'Packaging': '50 gowns/box, 10 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What protection level do these gowns provide?', a: 'Level 1-2 protection against light splashes.' },
            { q: 'Are these gowns reusable?', a: 'No, these are disposable gowns for single use.' },
            { q: 'What is the size?', a: 'Universal size that fits most adults.' }
        ],
        seo: {
            title: 'Isolation Gowns | V5 Medical - Disposable Protective Gowns',
            description: 'High-quality disposable isolation gowns made from non-woven fabric. General protection against splashes and contamination.',
            keywords: 'isolation gowns, disposable gowns, protective gowns, medical gowns, safety gowns'
        }
    },
    
    'shoe-covers': {
        id: 'shoe-covers',
        name: 'Shoe Covers',
        chineseName: '鞋套',
        category: 'protective-equipment',
        short: 'Disposable shoe covers for medical and cleanroom use',
        description: 'High-quality disposable shoe covers made from non-woven fabric. Elasticated design for secure fit. Water-resistant and anti-slip options available. Suitable for medical facilities, cleanrooms, and general use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Non-woven fabric',
            'Elasticated ankle for secure fit',
            'Water-resistant option available',
            'Anti-slip sole option available',
            'Latex-free'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/shoe-covers.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/shoe-cover-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/protective-equipment/shoe-cover-packaging.jpg'
        ],
        specs: {
            'Material': 'Non-woven fabric',
            'Styles': 'Standard, Water-resistant, Anti-slip',
            'Sizes': 'Universal',
            'Packaging': '100 covers/box, 50 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What styles are available?', a: 'Standard, water-resistant, and anti-slip options.' },
            { q: 'Are these shoe covers latex-free?', a: 'Yes, all shoe covers are latex-free.' },
            { q: 'What is the size?', a: 'Universal size that fits most shoe sizes.' }
        ],
        seo: {
            title: 'Shoe Covers | V5 Medical - Disposable Protective Shoe Covers',
            description: 'High-quality disposable shoe covers made from non-woven fabric. Elasticated design with water-resistant and anti-slip options.',
            keywords: 'shoe covers, disposable shoe covers, medical shoe covers, protective shoe covers, cleanroom shoe covers'
        }
    },
    
    // Injection & Infusion
    'disposable-syringes': {
        id: 'disposable-syringes',
        name: 'Disposable Syringes',
        chineseName: '一次性注射器',
        category: 'injection-infusion',
        short: 'Sterile disposable syringes with luer lock or slip tip',
        description: 'High-quality sterile disposable syringes made from medical grade plastic. Available with luer lock or slip tip in various sizes. EO sterilized and individually packaged for single use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Medical grade plastic',
            'Luer lock or slip tip',
            'Smooth plunger movement',
            'Clear barrel for easy volume reading',
            'EO sterilized'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/disposable-syringes.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/syringe-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/syringe-packaging.jpg'
        ],
        specs: {
            'Material': 'Medical grade polypropylene',
            'Sizes': '1ml, 2ml, 5ml, 10ml, 20ml, 50ml',
            'Tip Type': 'Luer lock, Luer slip',
            'Sterilization': 'EO sterilized',
            'Packaging': '100 syringes/box, 50 boxes/carton'
        },
        faq: [
            { q: 'What sizes are available?', a: '1ml, 2ml, 5ml, 10ml, 20ml, and 50ml sizes.' },
            { q: 'What tip types are available?', a: 'Luer lock (secure fit) and luer slip (standard fit).' },
            { q: 'Are these syringes sterile?', a: 'Yes, all syringes are EO sterilized.' }
        ],
        seo: {
            title: 'Disposable Syringes | V5 Medical - Sterile Medical Syringes',
            description: 'High-quality sterile disposable syringes with luer lock or slip tip. Various sizes available for medical use.',
            keywords: 'disposable syringes, sterile syringes, medical syringes, luer lock syringes, injection syringes'
        }
    },
    
    'insulin-syringes': {
        id: 'insulin-syringes',
        name: 'Insulin Syringes',
        chineseName: '胰岛素注射器',
        category: 'injection-infusion',
        short: 'Sterile insulin syringes with ultra-fine needles',
        description: 'High-quality sterile insulin syringes with ultra-fine needles for diabetes management. Clear barrel with easy-to-read markings. Comfortable grip and smooth plunger movement for precise insulin delivery.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Ultra-fine 30G or 31G needles',
            'Clear barrel with easy markings',
            'Comfortable grip design',
            'Smooth plunger movement',
            'EO sterilized'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/insulin-syringes.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/insulin-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/insulin-packaging.jpg'
        ],
        specs: {
            'Needle Size': '30G, 31G',
            'Sizes': '0.3ml, 0.5ml, 1ml',
            'Needle Length': '8mm, 12.7mm',
            'Sterilization': 'EO sterilized',
            'Packaging': '100 syringes/box, 50 boxes/carton'
        },
        faq: [
            { q: 'What needle sizes are available?', a: '30G and 31G ultra-fine needles.' },
            { q: 'What are the syringe sizes?', a: '0.3ml, 0.5ml, and 1ml for different insulin doses.' },
            { q: 'Are these syringes sterile?', a: 'Yes, all insulin syringes are EO sterilized.' }
        ],
        seo: {
            title: 'Insulin Syringes | V5 Medical - Ultra-Fine Needle Syringes',
            description: 'High-quality sterile insulin syringes with ultra-fine needles for diabetes management. Clear markings for precise insulin delivery.',
            keywords: 'insulin syringes, ultra-fine needles, diabetes syringes, medical syringes, injection syringes'
        }
    },
    
    'hypodermic-needles': {
        id: 'hypodermic-needles',
        name: 'Hypodermic Needles',
        chineseName: '皮下注射针头',
        category: 'injection-infusion',
        short: 'Sterile hypodermic needles for medical injections',
        description: 'High-quality sterile hypodermic needles made from stainless steel. Available in various gauges and lengths for different injection applications. Sharp bevel for minimal pain and smooth penetration.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Stainless steel construction',
            'Sharp bevel for minimal pain',
            'Various gauges and lengths',
            'Luer lock or slip fit',
            'EO sterilized'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/hypodermic-needles.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/needle-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/needle-packaging.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Gauges': '18G to 30G',
            'Lengths': '13mm to 89mm',
            'Fit': 'Luer lock, Luer slip',
            'Sterilization': 'EO sterilized',
            'Packaging': '100 needles/box, 100 boxes/carton'
        },
        faq: [
            { q: 'What gauges are available?', a: '18G to 30G for different viscosity medications.' },
            { q: 'What lengths are available?', a: '13mm to 89mm for different injection depths.' },
            { q: 'Are these needles sterile?', a: 'Yes, all hypodermic needles are EO sterilized.' }
        ],
        seo: {
            title: 'Hypodermic Needles | V5 Medical - Sterile Injection Needles',
            description: 'High-quality sterile hypodermic needles made from stainless steel. Various gauges and lengths available for medical injections.',
            keywords: 'hypodermic needles, sterile needles, medical needles, injection needles, stainless steel needles'
        }
    },
    
    'iv-cannula': {
        id: 'iv-cannula',
        name: 'IV Cannula',
        chineseName: '静脉留置针',
        category: 'injection-infusion',
        short: 'Intravenous cannula for IV therapy',
        description: 'High-quality intravenous cannula for IV therapy and fluid administration. Available in various gauges with winged or straight design. Features include flashback chamber, secure hub, and smooth insertion bevel.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Stainless steel needle with PTFE catheter',
            'Flashback chamber for vein visualization',
            'Winged or straight design',
            'Secure hub with injection port',
            'Smooth insertion bevel'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/iv-cannula.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/cannula-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/cannula-packaging.jpg'
        ],
        specs: {
            'Gauges': '14G to 24G',
            'Catheter Length': '25mm to 50mm',
            'Design': 'Winged, Straight',
            'Features': 'Flashback chamber, Injection port',
            'Sterilization': 'EO sterilized',
            'Packaging': '50 cannulas/box, 20 boxes/carton'
        },
        faq: [
            { q: 'What gauges are available?', a: '14G to 24G for different flow rates and patient types.' },
            { q: 'What is the advantage of winged design?', a: 'Provides better stability and easier handling during insertion.' },
            { q: 'Does it have a flashback chamber?', a: 'Yes, all IV cannulas have a flashback chamber for vein visualization.' }
        ],
        seo: {
            title: 'IV Cannula | V5 Medical - Intravenous Cannulas',
            description: 'High-quality intravenous cannula for IV therapy. Various gauges with winged or straight design and flashback chamber.',
            keywords: 'IV cannula, intravenous cannula, IV therapy, medical cannula, infusion cannula'
        }
    },
    
    'infusion-sets': {
        id: 'infusion-sets',
        name: 'Infusion Sets',
        chineseName: '输液器',
        category: 'injection-infusion',
        short: 'IV infusion sets for fluid administration',
        description: 'High-quality IV infusion sets for gravity and pump infusion. Includes spike, drip chamber, flow regulator, and injection port. Made from medical grade materials with DEHP-free options available.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Medical grade PVC or DEHP-free material',
            'Clear drip chamber with filter',
            'Precise flow regulator',
            'Injection port for medication',
            'Sterile and pyrogen-free'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-sets.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/infusion-packaging.jpg'
        ],
        specs: {
            'Material': 'PVC or DEHP-free',
            'Length': '150cm standard',
            'Filter': '15μm or 20μm',
            'Needle': '18G to 21G',
            'Sterilization': 'EO sterilized',
            'Packaging': '50 sets/box, 20 boxes/carton'
        },
        faq: [
            { q: 'Are DEHP-free options available?', a: 'Yes, we offer both PVC and DEHP-free infusion sets.' },
            { q: 'What filter sizes are available?', a: '15μm and 20μm filters for particle removal.' },
            { q: 'What needle sizes are available?', a: '18G to 21G needles for different applications.' }
        ],
        seo: {
            title: 'Infusion Sets | V5 Medical - IV Infusion Equipment',
            description: 'High-quality IV infusion sets for gravity and pump infusion. Medical grade materials with DEHP-free options available.',
            keywords: 'infusion sets, IV infusion sets, medical infusion, fluid administration, infusion equipment'
        }
    },
    
    'blood-transfusion-sets': {
        id: 'blood-transfusion-sets',
        name: 'Blood Transfusion Sets',
        chineseName: '输血器',
        category: 'injection-infusion',
        short: 'Sterile blood transfusion sets for blood administration',
        description: 'High-quality sterile blood transfusion sets for safe blood and blood component administration. Includes 170μm blood filter, Y-connector, and roller clamp. Made from medical grade materials with DEHP-free options.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            '170μm blood filter for microaggregate removal',
            'Y-connector for medication addition',
            'Precise roller clamp',
            'Medical grade or DEHP-free material',
            'Sterile and pyrogen-free'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/blood-transfusion-sets.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/blood-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/injection-infusion/blood-packaging.jpg'
        ],
        specs: {
            'Filter': '170μm blood filter',
            'Material': 'PVC or DEHP-free',
            'Length': '180cm standard',
            'Connector': 'Y-connector with injection site',
            'Sterilization': 'EO sterilized',
            'Packaging': '20 sets/box, 10 boxes/carton'
        },
        faq: [
            { q: 'What is the filter size?', a: '170μm filter for removal of microaggregates from blood.' },
            { q: 'Does it have a Y-connector?', a: 'Yes, includes Y-connector for medication addition during transfusion.' },
            { q: 'Are DEHP-free options available?', a: 'Yes, we offer both PVC and DEHP-free blood transfusion sets.' }
        ],
        seo: {
            title: 'Blood Transfusion Sets | V5 Medical - Blood Administration Equipment',
            description: 'High-quality sterile blood transfusion sets with 170μm filter. Safe blood administration with DEHP-free options available.',
            keywords: 'blood transfusion sets, blood administration, transfusion equipment, medical transfusion, blood filter'
        }
    },
    
    // Dental Products
    'dental-examination-kits': {
        id: 'dental-examination-kits',
        name: 'Dental Examination Kits',
        chineseName: '牙科检查套件',
        category: 'dental-products',
        short: 'Disposable dental examination kits for patient use',
        description: 'High-quality disposable dental examination kits containing all necessary instruments for dental check-ups. Includes mouth mirror, explorer, cotton pliers, and disposable tray. Sterile and individually packaged for single patient use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Complete examination kit',
            'Mouth mirror, explorer, cotton pliers',
            'Disposable tray included',
            'EO sterilized',
            'Individually packaged'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-examination-kits.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/exam-kit-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/exam-kit-packaging.jpg'
        ],
        specs: {
            'Components': 'Mouth mirror, explorer, cotton pliers, tray',
            'Sterilization': 'EO sterilized',
            'Packaging': '20 kits/box, 10 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What is included in the kit?', a: 'Mouth mirror, explorer, cotton pliers, and disposable tray.' },
            { q: 'Are these kits sterile?', a: 'Yes, all dental examination kits are EO sterilized.' },
            { q: 'How many kits are in a box?', a: '20 kits per box, 10 boxes per carton.' }
        ],
        seo: {
            title: 'Dental Examination Kits | V5 Medical - Disposable Dental Kits',
            description: 'High-quality disposable dental examination kits with mouth mirror, explorer, cotton pliers, and tray. Sterile and individually packaged.',
            keywords: 'dental examination kits, disposable dental kits, dental instruments, dental check-up, medical dental'
        }
    },
    
    'saliva-ejectors': {
        id: 'saliva-ejectors',
        name: 'Saliva Ejectors',
        chineseName: '吸唾器',
        category: 'dental-products',
        short: 'Disposable saliva ejectors for dental procedures',
        description: 'High-quality disposable saliva ejectors for dental procedures. Flexible plastic tube with suction tip for effective saliva removal. Comfortable design with various tip colors available. Individually packaged for single use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Flexible plastic tube',
            'Effective suction tip',
            'Comfortable design',
            'Various tip colors',
            'Individually packaged'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/saliva-ejectors.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/saliva-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/saliva-packaging.jpg'
        ],
        specs: {
            'Material': 'Flexible plastic',
            'Length': '15cm standard',
            'Tip Colors': 'Clear, Blue, Green, Red',
            'Packaging': '100 ejectors/box, 50 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What colors are available?', a: 'Clear, blue, green, and red tip colors.' },
            { q: 'How long is each ejector?', a: '15cm standard length for comfortable use.' },
            { q: 'Are these ejectors latex-free?', a: 'Yes, all saliva ejectors are latex-free.' }
        ],
        seo: {
            title: 'Saliva Ejectors | V5 Medical - Disposable Dental Suction',
            description: 'High-quality disposable saliva ejectors with flexible tube and effective suction tip. Various colors available for dental procedures.',
            keywords: 'saliva ejectors, dental suction, disposable ejectors, dental saliva, medical dental'
        }
    },
    
    'dental-bibs': {
        id: 'dental-bibs',
        name: 'Dental Bibs',
        chineseName: '牙科围兜',
        category: 'dental-products',
        short: 'Disposable dental bibs for patient protection',
        description: 'High-quality disposable dental bibs for patient protection during dental procedures. Waterproof polyethylene backing with absorbent tissue front. Adhesive strip for secure attachment. Available in various colors and sizes.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Waterproof polyethylene backing',
            'Absorbent tissue front',
            'Adhesive strip for secure attachment',
            'Various colors and sizes',
            'Latex-free'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/dental-bibs.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/bib-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/bib-packaging.jpg'
        ],
        specs: {
            'Material': 'Tissue/polyethylene laminate',
            'Sizes': '13x18", 13x19", 13x24"',
            'Colors': 'Blue, Green, Pink, White',
            'Packaging': '200 bibs/box, 10 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What sizes are available?', a: '13x18", 13x19", and 13x24" sizes.' },
            { q: 'What colors are available?', a: 'Blue, green, pink, and white colors.' },
            { q: 'Are these bibs waterproof?', a: 'Yes, they have a waterproof polyethylene backing.' }
        ],
        seo: {
            title: 'Dental Bibs | V5 Medical - Disposable Patient Protection',
            description: 'High-quality disposable dental bibs with waterproof backing and absorbent front. Various colors and sizes for patient protection.',
            keywords: 'dental bibs, disposable bibs, patient protection, dental drapes, medical dental'
        }
    },
    
    'impression-trays': {
        id: 'impression-trays',
        name: 'Impression Trays',
        chineseName: '印模托盘',
        category: 'dental-products',
        short: 'Dental impression trays for dental impressions',
        description: 'High-quality dental impression trays for taking dental impressions. Available in various sizes and arch types (upper, lower, full arch). Perforated design for better material retention. Reusable and autoclavable.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Stainless steel construction',
            'Perforated design for material retention',
            'Various sizes and arch types',
            'Reusable and autoclavable',
            'Comfortable fit'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/impression-trays.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/tray-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/tray-packaging.jpg'
        ],
        specs: {
            'Material': 'Stainless steel',
            'Types': 'Upper, Lower, Full arch',
            'Sizes': 'Small, Medium, Large, X-Large',
            'Sterilization': 'Autoclavable (134°C)',
            'Warranty': '1 year'
        },
        faq: [
            { q: 'What types of trays are available?', a: 'Upper, lower, and full arch impression trays.' },
            { q: 'What sizes are available?', a: 'Small, medium, large, and X-large sizes.' },
            { q: 'Are these trays reusable?', a: 'Yes, they are made from stainless steel and can be autoclaved.' }
        ],
        seo: {
            title: 'Impression Trays | V5 Medical - Dental Impression Equipment',
            description: 'High-quality dental impression trays with perforated design. Various sizes and arch types for taking dental impressions.',
            keywords: 'impression trays, dental trays, dental impression, stainless steel trays, medical dental'
        }
    },
    
    'polishing-cups': {
        id: 'polishing-cups',
        name: 'Polishing Cups',
        chineseName: '抛光杯',
        category: 'dental-products',
        short: 'Disposable dental polishing cups for prophylaxis',
        description: 'High-quality disposable dental polishing cups for prophylaxis and teeth polishing. Made from soft rubber for gentle polishing. Available in various sizes and colors. Fits standard prophy angles for easy use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Soft rubber material',
            'Gentle polishing action',
            'Various sizes and colors',
            'Fits standard prophy angles',
            'Disposable for single use'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/polishing-cups.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/cup-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/cup-packaging.jpg'
        ],
        specs: {
            'Material': 'Soft rubber',
            'Sizes': 'Small, Medium, Large',
            'Colors': 'Red, Yellow, Green',
            'Packaging': '50 cups/box, 20 boxes/carton',
            'Shelf Life': '3 years'
        },
        faq: [
            { q: 'What sizes are available?', a: 'Small, medium, and large polishing cups.' },
            { q: 'What colors are available?', a: 'Red, yellow, and green colors for different grits.' },
            { q: 'Do these fit standard prophy angles?', a: 'Yes, they fit all standard prophy angles.' }
        ],
        seo: {
            title: 'Polishing Cups | V5 Medical - Disposable Dental Prophylaxis',
            description: 'High-quality disposable dental polishing cups made from soft rubber. Various sizes and colors for prophylaxis and teeth polishing.',
            keywords: 'polishing cups, dental prophylaxis, disposable cups, teeth polishing, medical dental'
        }
    },
    
    'polishing-brushes': {
        id: 'polishing-brushes',
        name: 'Polishing Brushes',
        chineseName: '抛光刷',
        category: 'dental-products',
        short: 'Disposable dental polishing brushes for interproximal cleaning',
        description: 'High-quality disposable dental polishing brushes for interproximal cleaning and stain removal. Nylon bristles with plastic handle. Available in various sizes and shapes. Fits standard prophy angles for easy use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Nylon bristles',
            'Plastic handle',
            'Various sizes and shapes',
            'Fits standard prophy angles',
            'Disposable for single use'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/polishing-brushes.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/brush-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/dental-products/brush-packaging.jpg'
        ],
        specs: {
            'Bristle Material': 'Nylon',
            'Handle Material': 'Plastic',
            'Shapes': 'Conical, Cylindrical, Flame',
            'Sizes': 'Small, Medium',
            'Packaging': '50 brushes/box, 20 boxes/carton'
        },
        faq: [
            { q: 'What shapes are available?', a: 'Conical, cylindrical, and flame shapes for different applications.' },
            { q: 'What sizes are available?', a: 'Small and medium sizes for interproximal cleaning.' },
            { q: 'Do these fit standard prophy angles?', a: 'Yes, they fit all standard prophy angles.' }
        ],
        seo: {
            title: 'Polishing Brushes | V5 Medical - Disposable Dental Brushes',
            description: 'High-quality disposable dental polishing brushes with nylon bristles. Various shapes and sizes for interproximal cleaning and stain removal.',
            keywords: 'polishing brushes, dental brushes, interproximal cleaning, teeth polishing, medical dental'
        }
    },
    
    // Surgical Packs
    'surgical-packs': {
        id: 'surgical-packs',
        name: 'Surgical Packs',
        chineseName: '手术包',
        category: 'surgical-packs',
        short: 'Custom surgical packs with procedure-specific instruments',
        description: 'Customized surgical packs containing all necessary instruments and supplies for specific surgical procedures. Designed to reduce preparation time and ensure all required items are available. EO sterilized and ready for use.',
        price: 'Contact for Price',
        availability: 'In Stock',
        certifications: ['ISO 13485', 'CE', 'FDA'],
        features: [
            'Procedure-specific configuration',
            'Contains all necessary instruments and supplies',
            'Reduces preparation time',
            'EO sterilized',
            'Customizable to specific needs'
        ],
        images: [
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/surgical-packs.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/pack-detail.jpg',
            'https://raw.githubusercontent.com/alden888/v5md/main/images/products/surgical-packs/pack-contents.jpg'
        ],
        specs: {
            'Configurations': 'General surgery, Obstetrics, Orthopedics, Ophthalmology, etc.',
            'Sterilization': 'EO sterilized',
            'Packaging': '1 pack/sterile pouch',
            'Shelf Life': '5 years',
            'Customization': 'Available to specific requirements'
        },
        faq: [
            { q: 'What procedure-specific packs are available?', a: 'General surgery, obstetrics, orthopedics, ophthalmology, and many others.' },
            { q: 'Can packs be customized?', a: 'Yes, we can customize packs to meet specific hospital requirements.' },
            { q: 'What is the shelf life?', a: '5 years from manufacturing date when stored properly.' }
        ],
        seo: {
            title: 'Surgical Packs | V5 Medical - Custom Procedure Packs',
            description: 'Customized surgical packs with procedure-specific instruments and supplies. EO sterilized and ready for use to reduce preparation time.',
            keywords: 'surgical packs, custom packs, procedure packs, surgical instruments, medical packs'
        }
    }
};

// Make database available globally
window.productDatabase = productDatabase;

// If using modules, export the database
if (typeof module !== 'undefined') {
    module.exports = productDatabase;
}