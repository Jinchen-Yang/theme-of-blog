/**
 * 侧边栏模块
 * 管理侧边栏的打开/关闭和响应式行为
 */

import { $, addClass, removeClass, hasClass } from '../utils/dom.js';
import { scheduler } from '../utils/animation.js';

export class SidebarManager {
    constructor() {
        this.sidebar = $('#sidebar');
        this.mainContent = $('#main-content');
        this.overlay = $('#sidebar-overlay');
        this.isOpen = false;
    }

    /**
     * 初始化侧边栏
     */
    init() {
        if (!this.sidebar || !this.mainContent) {
            console.warn('[SidebarManager] Sidebar or main content not found');
            return;
        }

        // 绑定overlay点击事件
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // 初始状态
        this.isOpen = !hasClass(this.sidebar, '-translate-x-full');
    }

    /**
     * 打开侧边栏
     */
    open() {
        if (this.isOpen) return;
        
        this.isOpen = true;
        scheduler.schedule(this.sidebar, (el) => {
            removeClass(el, '-translate-x-full');
        });

        const isMobile = window.innerWidth < 768;
        if (isMobile && this.overlay) {
            removeClass(this.overlay, 'hidden');
        }
    }

    /**
     * 关闭侧边栏
     */
    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        scheduler.schedule(this.sidebar, (el) => {
            addClass(el, '-translate-x-full');
        });

        if (this.overlay) {
            addClass(this.overlay, 'hidden');
        }
    }

    /**
     * 切换侧边栏
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * 处理窗口大小变化
     * @private
     */
    handleResize() {
        const isMobile = window.innerWidth < 768;
        
        if (!isMobile && this.isOpen) {
            // 桌面端：侧边栏应该显示
            if (this.mainContent && !hasClass(this.mainContent, 'md:pl-72')) {
                addClass(this.mainContent, 'md:pl-72');
            }
        } else if (isMobile && this.isOpen && this.overlay) {
            // 移动端：显示overlay
            removeClass(this.overlay, 'hidden');
        } else if (isMobile && this.overlay) {
            // 移动端：隐藏overlay
            addClass(this.overlay, 'hidden');
        }
    }

    /**
     * 销毁侧边栏管理器
     */
    destroy() {
        if (this.overlay) {
            this.overlay.removeEventListener('click', () => this.close());
        }
        window.removeEventListener('resize', () => this.handleResize());
    }
}

// 导出单例
export const sidebarManager = new SidebarManager();
