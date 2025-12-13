// ===== Auto-generated from Catalog.pdf =====

const catalogProducts = [
  // Surgical Sutures
  { name: "PGA Absorbable Suture", category: "Surgical Sutures" },
  { name: "PGLA Absorbable Suture", category: "Surgical Sutures" },
  { name: "Chromic Catgut", category: "Surgical Sutures" },
  { name: "Plain Catgut", category: "Surgical Sutures" },
  { name: "Silk Suture", category: "Surgical Sutures" },
  { name: "Nylon Suture", category: "Surgical Sutures" },
  { name: "Polypropylene Suture", category: "Surgical Sutures" },
  { name: "Polyester Suture", category: "Surgical Sutures" },
  { name: "PDO Suture", category: "Surgical Sutures" },

  // Surgical Instruments
  { name: "Surgical Blades", category: "Surgical Instruments" },
  { name: "Scalpels", category: "Surgical Instruments" },
  { name: "Lancets", category: "Surgical Instruments" },
  { name: "Surgical Scissors", category: "Surgical Instruments" },
  { name: "Forceps", category: "Surgical Instruments" },
  { name: "Needle Holders", category: "Surgical Instruments" },

  // Gauze & Dressings
  { name: "Gauze Swabs", category: "Gauze Dressings" },
  { name: "Gauze Rolls", category: "Gauze Dressings" },
  { name: "Gauze Balls", category: "Gauze Dressings" },
  { name: "Abdominal Pads", category: "Gauze Dressings" },
  { name: "Cotton Rolls", category: "Gauze Dressings" },
  { name: "Cotton Balls", category: "Gauze Dressings" },
  { name: "Non-woven Sponges", category: "Gauze Dressings" },

  // Protective Equipment
  { name: "Surgical Face Masks", category: "Protective Equipment" },
  { name: "N95 / FFP2 Masks", category: "Protective Equipment" },
  { name: "Disposable Caps", category: "Protective Equipment" },
  { name: "Surgical Gowns", category: "Protective Equipment" },
  { name: "Isolation Gowns", category: "Protective Equipment" },
  { name: "Shoe Covers", category: "Protective Equipment" },

  // Injection & Infusion
  { name: "Disposable Syringes", category: "Injection & Infusion" },
  { name: "Insulin Syringes", category: "Injection & Infusion" },
  { name: "Hypodermic Needles", category: "Injection & Infusion" },
  { name: "IV Cannula", category: "Injection & Infusion" },
  { name: "Infusion Sets", category: "Injection & Infusion" },
  { name: "Blood Transfusion Sets", category: "Injection & Infusion" },

  // Dental
  { name: "Dental Examination Kits", category: "Dental Products" },
  { name: "Saliva Ejectors", category: "Dental Products" },
  { name: "Dental Bibs", category: "Dental Products" },
  { name: "Impression Trays", category: "Dental Products" },
  { name: "Polishing Cups", category: "Dental Products" },
  { name: "Polishing Brushes", category: "Dental Products" }
];

// ===== Convert to productDatabase =====

const productDatabase = {};

catalogProducts.forEach(p => {
  const id = p.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  productDatabase[id] = {
    id,
    name: p.name,
    chineseName: "",
    category: p.category,
    price: "Contact for Pricing",
    availability: "In Stock",
    images: [
      "https://raw.githubusercontent.com/alden888/v5md/main/images/products/default-product.jpg"
    ],
    description: `V5 Medical supplies ${p.name} with ISO 13485, CE and FDA compliance. Detailed specifications available upon request.`,
    certifications: ["ISO 13485", "CE", "FDA"],
    features: [],
    relatedProducts: []
  };
});

{
  id: "pga-suture",
  name: "PGA Absorbable Surgical Suture",
  category: "Surgical Sutures",
  categoryName: "Surgical Sutures",

  image: "images/products/pga.jpg",

  seoDescription: "PGA absorbable surgical sutures manufactured under ISO 13485, CE and FDA standards. Reliable wound closure for general surgery.",

  description: "PGA sutures are synthetic absorbable sutures suitable for general and soft tissue surgery.",

  features: [
    "Absorbable synthetic material",
    "Smooth tissue passage",
    "High tensile strength retention"
  ],

  specs: {
    "Material": "PGA",
    "Absorption Time": "60–90 days",
    "Sizes": "USP 6/0 – 2",
    "Sterilization": "EO",
    "OEM": "Available"
  }
}

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

