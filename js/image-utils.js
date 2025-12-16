/**
 * V5 Medical Image Utilities
 * @version 2.1.0
 */
class ImageUtils {
    constructor() {
        this.config = window.V5Config || { BASE_URL: '', IMAGES: {} };
        this.placeholder = this.config.IMAGES.PLACEHOLDER || 'images/products/default-product.jpg';
    }

    // 获取图片链接：自动判断是否为绝对路径
    getImageUrl(path) {
        if (!path) return this.placeholder;
        if (path.startsWith('http')) return path;
        
        // 拼接本地路径或 CDN 路径
        const baseUrl = this.config.BASE_URL ? this.config.BASE_URL.replace(/\/$/, '') : '';
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return baseUrl ? `${baseUrl}/${cleanPath}` : cleanPath;
    }

    // 全局错误处理
    handleError(img) {
        img.onerror = null; // 防止死循环
        // 如果当前是绝对路径（如 R2）失败了，尝试本地路径
        if (img.src.startsWith('http') && !img.src.includes('localhost') && !img.src.includes('127.0.0.1')) {
             // 尝试回退到 fallback base 或者 placeholder
             const fallback = this.config.IMAGES.FALLBACK_BASE;
             if (fallback && !img.src.includes(fallback)) {
                 // 简单的回退尝试逻辑，或者直接显示占位图
                 img.src = this.placeholder;
             } else {
                 img.src = this.placeholder;
             }
        } else {
            img.src = this.placeholder;
        }
    }
}

window.imageUtils = new ImageUtils();
