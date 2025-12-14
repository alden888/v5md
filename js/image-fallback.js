// 图像备用方案
window.imageFallback = {
    getPlaceholder: function(text, width = 400, height = 300) {
        // 使用简单的SVG作为占位图，避免外部依赖
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <rect width="${width}" height="${height}" fill="#f3f4f6"/>
            <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">${text}</text>
        </svg>`;
        return 'data:image/svg+xml;base64,' + btoa(svg);
    },
    
    handleImageError: function(img, productName) {
        const text = productName ? encodeURIComponent(productName.substring(0, 20)) : 'Product';
        img.src = this.getPlaceholder(text);
        img.onerror = null; // 防止循环错误
    }
};