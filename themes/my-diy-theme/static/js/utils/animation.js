/**
 * 动画工具函数
 * 提供性能优化的动画调度
 */

/**
 * 使用requestAnimationFrame优化的动画调度
 * 防止频繁的DOM操作导致重排
 */
export class AnimationScheduler {
    constructor() {
        this.scheduledAnimations = new Map();
    }

    /**
     * 调度一个动画回调
     * @param {Element} element - 目标元素
     * @param {Function} callback - 动画回调函数
     */
    schedule(element, callback) {
        if (!this.scheduledAnimations.has(element)) {
            requestAnimationFrame(() => {
                callback(element);
                this.scheduledAnimations.delete(element);
            });
            this.scheduledAnimations.set(element, true);
        }
    }

    /**
     * 清空所有已调度的动画
     */
    clear() {
        this.scheduledAnimations.clear();
    }
}

export const scheduler = new AnimationScheduler();

/**
 * 触发CSS动画（重新启动）
 * @param {Element} el - 目标元素
 * @param {string} animationName - 动画名称
 * @param {number} duration - 动画时长（毫秒）
 */
export const triggerAnimation = (el, animationName, duration = 600) => {
    if (!el) return;
    
    // 清除动画
    el.style.animation = 'none';
    
    // 触发重排，强制浏览器计算
    void el.offsetWidth;
    
    // 重新应用动画
    el.style.animation = `${animationName} ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) 1`;
};

/**
 * 等待动画完成
 * @param {Element} el - 目标元素
 * @returns {Promise}
 */
export const waitForAnimation = (el) => {
    return new Promise((resolve) => {
        const handler = () => {
            el.removeEventListener('animationend', handler);
            resolve();
        };
        el.addEventListener('animationend', handler, { once: true });
    });
};

/**
 * 等待过渡完成
 * @param {Element} el - 目标元素
 * @returns {Promise}
 */
export const waitForTransition = (el) => {
    return new Promise((resolve) => {
        const handler = () => {
            el.removeEventListener('transitionend', handler);
            resolve();
        };
        el.addEventListener('transitionend', handler, { once: true });
    });
};
