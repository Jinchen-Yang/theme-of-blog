/**
 * 本地存储工具函数
 * 提供类型安全的localStorage操作
 */

/**
 * 设置存储值
 * @param {string} key - 存储键
 * @param {*} value - 存储值（会自动JSON序列化）
 */
export const setStorage = (key, value) => {
    try {
        const serialized = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, serialized);
    } catch (e) {
        console.warn(`Storage write failed for key: ${key}`, e);
    }
};

/**
 * 获取存储值
 * @param {string} key - 存储键
 * @param {*} defaultValue - 默认值
 * @returns {*}
 */
export const getStorage = (key, defaultValue = null) => {
    try {
        const stored = localStorage.getItem(key);
        if (!stored) return defaultValue;
        
        try {
            return JSON.parse(stored);
        } catch {
            return stored;
        }
    } catch (e) {
        console.warn(`Storage read failed for key: ${key}`, e);
        return defaultValue;
    }
};

/**
 * 删除存储值
 * @param {string} key - 存储键
 */
export const removeStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.warn(`Storage delete failed for key: ${key}`, e);
    }
};

/**
 * 清空所有存储
 */
export const clearStorage = () => {
    try {
        localStorage.clear();
    } catch (e) {
        console.warn('Storage clear failed', e);
    }
};
