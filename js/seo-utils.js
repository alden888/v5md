/**
 * V5 Medical Enhanced SEO Utilities
 * Generates dynamic JSON-LD structured data for Google Rich Snippets.
 * @version 3.0.0
 * @updated 2024-12-16
 */

class EnhancedSEOUtils {
    constructor() {
        this.config = window.V5Config?.SEO || {};
        this.baseUrl = window.V5Config?.BASE_URL || window.location.origin;
    }

    /**
     * 1. 基础页面 SEO 更新 (Title & Meta)
     */
    updatePage(data) {
        if (data.title) document.title = data.title;
        if (data.description) {
            document.querySelector('meta[name="description"]')?.setAttribute('content', data.description);
            document.querySelector('meta[property="og:description"]')?.setAttribute('content', data.description);
        }
        if (data.image) {
            document.querySelector('meta[property="og:image"]')?.setAttribute('content', this._resolveUrl(data.image));
        }
        
        // 自动注入 Schema
        this.injectAllSchemas(data);
    }

    /**
     * 2. 生成产品结构化数据 (Product Schema)
     */
    generateProductSchema(product) {
        // 防御性检查：确保 images 是数组
        const images = Array.isArray(product.images) ? product.images : [product.images || ''];

        const schema = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.short || product.description,
            "sku": product.id,
            "mpn": product.id.toUpperCase(),
            "image": images.map(img => this._resolveUrl(img)),
            "brand": {
                "@type": "Brand",
                "name": "V5 Medical",
                "logo": "https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5medlogo.png"
            },
            "manufacturer": {
                "@type": "Organization",
                "name": "V5 Medical LTD",
                "url": "https://v5md.com"
            },
            "offers": {
                "@type": "Offer",
                "url": window.location.href,
                "priceCurrency": "USD",
                "price": "0", // Contact for price (Google requires a price, 0 acts as placeholder)
                "priceValidUntil": this._getNextYearDate(),
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "seller": { "@type": "Organization", "name": "V5 Medical LTD" }
            }
        };
        return schema;
    }

    /**
     * 3. 生成 FAQ 结构化数据
     */
    generateFAQSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What certifications does V5 Medical hold?",
                    "acceptedAnswer": { "@type": "Answer", "text": "V5 Medical LTD holds ISO 13485, CE Mark, and FDA registrations for medical device manufacturing." }
                },
                {
                    "@type": "Question",
                    "name": "What is the minimum order quantity (MOQ)?",
                    "acceptedAnswer": { "@type": "Answer", "text": "MOQ varies by product category. We support flexible MOQs for trial orders. Contact our sales team for details." }
                },
                {
                    "@type": "Question",
                    "name": "Do you offer OEM/ODM services?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide comprehensive custom branding (OEM) and product development (ODM) services for global partners." }
                }
            ]
        };
    }

    /**
     * 4. 生成面包屑导航
     */
    generateBreadcrumbSchema(items) {
        if (!items || items.length === 0) return null;
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": this._resolveUrl(item.url)
            }))
        };
    }

    /**
     * 5. 生成本地商家信息 (用于 Contact 页)
     */
    generateLocalBusinessSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "V5 Medical LTD",
            "image": "https://pub-224e4e74685e409e833e89d4ab5143fb.r2.dev/v5medlogo.png",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "No. 168, Luying Road, Kunshan Development Zone",
                "addressLocality": "Kunshan",
                "addressRegion": "Jiangsu",
                "postalCode": "215300",
                "addressCountry": "CN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "31.3884",
                "longitude": "120.9820"
            },
            "telephone": "+86-0512-8781-1988",
            "priceRange": "$$",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "08:30",
                    "closes": "17:30"
                }
            ]
        };
    }

    /**
     * 💉 核心：注入所有 Schema
     */
    injectAllSchemas(data) {
        const schemas = [];

        // Product
        if (data.product) schemas.push(this.generateProductSchema(data.product));
        
        // Breadcrumb
        if (data.breadcrumb) {
            const breadcrumbSchema = this.generateBreadcrumbSchema(data.breadcrumb);
            if (breadcrumbSchema) schemas.push(breadcrumbSchema);
        }

        // FAQ (手动开启)
        if (data.includeFAQ) schemas.push(this.generateFAQSchema());

        // Local Business (手动开启)
        if (data.includeLocalBusiness) schemas.push(this.generateLocalBusinessSchema());

        // 移除旧的 Script
        const oldScript = document.getElementById('v5-dynamic-schema');
        if (oldScript) oldScript.remove();

        // 注入新的 Script
        if (schemas.length > 0) {
            const script = document.createElement('script');
            script.id = 'v5-dynamic-schema';
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(schemas);
            document.head.appendChild(script);
            console.log(`[SEO] Injected ${schemas.length} schema(s)`);
        }
    }

    // Helpers
    _resolveUrl(path) {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        // 使用 window.imageUtils 的逻辑（如果有）或简单拼接
        if (window.imageUtils) return window.imageUtils.getImageUrl(path);
        return `${this.baseUrl}/${path.replace(/^\/+/, '')}`;
    }

    _getNextYearDate() {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        return date.toISOString().split('T')[0];
    }
}

// 初始化
window.seoUtils = new EnhancedSEOUtils();
