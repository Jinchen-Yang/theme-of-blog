/**
 * 性能优化模块
 * 处理设备检测、GPU加速等性能相关功能
 */

/**
 * 检测是否为触屏设备
 * @returns {boolean}
 */
export const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

/**
 * 标记触屏设备（添加data-touch属性）
 * 用于CSS media query判断
 */
export const markTouchDevice = () => {
    if (isTouchDevice()) {
        document.documentElement.setAttribute('data-touch', 'true');
    } else {
        document.documentElement.removeAttribute('data-touch');
    }
};

/**
 * 获取设备类型信息
 * @returns {Object} { isMobile, isTablet, isDesktop, isTouchEnabled }
 */
export const getDeviceInfo = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouchEnabled = isTouchDevice();
    
    return {
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isTouchEnabled,
        width,
        height,
    };
};

/**
 * 监听窗口大小变化
 * @param {Function} callback - 回调函数
 * @param {number} debounceDelay - 防抖延迟（毫秒）
 * @returns {Function} 取消监听的函数
 */
export const onWindowResize = (callback, debounceDelay = 150) => {
    let timeout;
    
    const handleResize = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(getDeviceInfo());
        }, debounceDelay);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeout);
    };
};

/**
 * 初始化性能优化
 */
export const initPerformance = () => {
    markTouchDevice();
    
    // 监听设备变化（响应式）
    onWindowResize((info) => {
        // 可以在这里处理响应式逻辑
        console.debug('[Performance] Device info updated:', info);
    });
};
