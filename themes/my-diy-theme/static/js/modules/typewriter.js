/**
 * 打字机效果模块
 * 管理侧边栏的动态打字机文本效果
 */

import { $ } from '../utils/dom.js';

export class TypewriterEffect {
    constructor(elementSelector = '#typewriter') {
        this.element = $(elementSelector);
        this.texts = [];
        this.currentIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 100; // 毫秒
        this.deletingSpeed = 50; // 毫秒
        this.pauseDuration = 2000; // 毫秒
        this.timeout = null;
    }

    /**
     * 初始化打字机
     * @param {Array} texts - 文本列表
     */
    init(texts = []) {
        if (!this.element) {
            console.warn('[TypewriterEffect] Element not found');
            return;
        }

        this.texts = texts && texts.length > 0 ? texts : ['欢迎来到我的博客'];
        this.startTyping();
    }

    /**
     * 开始打字
     * @private
     */
    startTyping() {
        if (this.texts.length === 0) return;

        const currentText = this.texts[this.currentIndex];
        
        if (!this.isDeleting && this.currentCharIndex < currentText.length) {
            // 正在输入
            this.element.textContent += currentText[this.currentCharIndex];
            this.currentCharIndex++;
            this.timeout = setTimeout(() => this.startTyping(), this.typingSpeed);
        } else if (this.isDeleting && this.currentCharIndex > 0) {
            // 正在删除
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            this.timeout = setTimeout(() => this.startTyping(), this.deletingSpeed);
        } else if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            // 完成输入，准备删除
            this.isDeleting = true;
            this.timeout = setTimeout(() => this.startTyping(), this.pauseDuration);
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            // 完成删除，切换到下一个文本
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            this.timeout = setTimeout(() => this.startTyping(), 500);
        }
    }

    /**
     * 停止打字机
     */
    stop() {
        clearTimeout(this.timeout);
    }

    /**
     * 销毁打字机
     */
    destroy() {
        this.stop();
    }
}

// 导出单例
export const typewriterEffect = new TypewriterEffect();
