/**
 * 设置菜单模块
 * 管理底部设置菜单的打开/关闭和交互
 */

import { $, addClass, removeClass, hasClass } from '../utils/dom.js';
import { scheduler } from '../utils/animation.js';

export class SettingsManager {
    constructor(themeManager) {
        this.themeManager = themeManager;
        this.settingsMenu = $('#settings-menu');
        this.settingsBtn = $('#settings-btn');
        this.isOpen = false;
    }

    /**
     * 初始化设置菜单
     */
    init() {
        if (!this.settingsMenu || !this.settingsBtn) {
            console.warn('[SettingsManager] Settings menu or button not found');
            return;
        }

        // 绑定按钮点击事件
        this.settingsBtn.addEventListener('click', () => this.toggle());

        // 点击外部关闭菜单
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.settingsMenu.contains(e.target) && 
                !this.settingsBtn.contains(e.target)) {
                this.close();
            }
        }, { passive: true });

        // 绑定主题模式按钮
        this.bindModeButtons();

        // 绑定主题颜色按钮
        this.bindThemeButtons();

        // 绑定缩放按钮（移动端）
        this.bindZoomButtons();
    }

    /**
     * 打开设置菜单
     */
    open() {
        if (this.isOpen) return;
        
        this.isOpen = true;
        scheduler.schedule(this.settingsMenu, (el) => {
            removeClass(el, 'opacity-0', 'pointer-events-none', 'translate-y-4', 'scale-95');
            addClass(el, 'opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
        });

        // 旋转按钮
        addClass(this.settingsBtn, 'rotate-180');
    }

    /**
     * 关闭设置菜单
     */
    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        scheduler.schedule(this.settingsMenu, (el) => {
            addClass(el, 'opacity-0', 'pointer-events-none', 'translate-y-4', 'scale-95');
            removeClass(el, 'opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
        });

        // 恢复按钮
        removeClass(this.settingsBtn, 'rotate-180');
    }

    /**
     * 切换设置菜单
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * 绑定主题模式按钮（auto/light/dark）
     * @private
     */
    bindModeButtons() {
        ['auto', 'light', 'dark'].forEach(mode => {
            const btn = $(`#btn-${mode}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    if (this.themeManager) {
                        this.themeManager.setMode(mode);
                    }
                });
            }
        });
    }

    /**
     * 绑定主题颜色按钮
     * @private
     */
    bindThemeButtons() {
        const buttons = document.querySelectorAll('[data-theme-name]');
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const themeName = btn.getAttribute('data-theme-name');
                if (this.themeManager) {
                    this.themeManager.setTheme(themeName);
                }
            });
        });
    }

    /**
     * 绑定缩放按钮（仅移动端）
     * @private
     */
    bindZoomButtons() {
        const zoomLevelDisplay = $('#zoom-level');
        const decreaseBtn = document.querySelector('[onclick="adjustZoom(-0.1)"]');
        const increaseBtn = document.querySelector('[onclick="adjustZoom(0.1)"]');

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                this.adjustZoom(-0.1, zoomLevelDisplay);
            });
        }

        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => {
                this.adjustZoom(0.1, zoomLevelDisplay);
            });
        }
    }

    /**
     * 调整缩放级别
     * @param {number} delta - 缩放增量
     * @param {Element} display - 显示元素
     * @private
     */
    adjustZoom(delta, display) {
        const htmlElement = document.documentElement;
        const currentZoom = parseFloat(htmlElement.style.zoom) || 1;
        let newZoom = currentZoom + delta;
        
        // 限制缩放范围
        newZoom = Math.max(0.5, Math.min(2, newZoom));
        
        htmlElement.style.zoom = newZoom;
        
        if (display) {
            display.textContent = `${Math.round(newZoom * 100)}%`;
        }
    }

    /**
     * 销毁设置菜单管理器
     */
    destroy() {
        // 移除事件监听
    }
}

// 导出单例实例将在main.js中创建
export const createSettingsManager = (themeManager) => {
    return new SettingsManager(themeManager);
};
