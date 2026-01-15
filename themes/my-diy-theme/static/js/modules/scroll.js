/**
 * 滚动效果模块
 * 管理全平台弹性滚动回弹效果
 */

import { triggerAnimation } from '../utils/animation.js';

export class ScrollManager {
    constructor(mainSelector = 'main') {
        this.mainContainer = document.querySelector(mainSelector);
        this.lastScrollTop = 0;
        this.scrollVelocity = 0;
        this.isScrolling = false;
        this.scrollTimer = null;
        this.scrollTimeout = 100; // 毫秒
    }

    /**
     * 初始化滚动管理
     */
    init() {
        if (!this.mainContainer) {
            console.warn('[ScrollManager] Main container not found');
            return;
        }

        // 监听滚动事件（passive: true 提高性能）
        this.mainContainer.addEventListener('scroll', this.handleScroll.bind(this), { 
            passive: true 
        });
    }

    /**
     * 处理滚动事件
     * @private
     */
    handleScroll() {
        // 计算滚动速度
        const currentScrollTop = this.mainContainer.scrollTop;
        this.scrollVelocity = currentScrollTop - this.lastScrollTop;
        this.lastScrollTop = currentScrollTop;
        this.isScrolling = true;

        // 清空之前的定时器
        clearTimeout(this.scrollTimer);

        // 设置新的定时器，在滚动停止后触发回弹检测
        this.scrollTimer = setTimeout(() => {
            this.isScrolling = false;
            this.checkAndApplyBounce();
        }, this.scrollTimeout);
    }

    /**
     * 检测是否到达底部并应用回弹效果
     * @private
     */
    checkAndApplyBounce() {
        if (!this.mainContainer) return;

        const { scrollHeight, clientHeight, scrollTop } = this.mainContainer;
        const isAtBottom = scrollHeight - clientHeight - scrollTop < 1;

        if (isAtBottom && this.scrollVelocity > 0) {
            this.applyBounceEffect();
        }
    }

    /**
     * 应用弹性回弹动画
     * @private
     */
    applyBounceEffect() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        triggerAnimation(footer, 'elasticBounce', 600);
    }

    /**
     * 销毁滚动管理器
     */
    destroy() {
        if (this.mainContainer) {
            this.mainContainer.removeEventListener('scroll', this.handleScroll);
        }
        clearTimeout(this.scrollTimer);
    }
}

// 导出单例
export const scrollManager = new ScrollManager();
