/**
 * 主题系统模块
 * 管理深色/浅色/自动模式和莫兰迪配色方案
 */

import { getStorage, setStorage } from '../utils/storage.js';
import { $, addClass, removeClass, setAttr } from '../utils/dom.js';

export class ThemeManager {
    constructor() {
        this.root = document.documentElement;
        this.currentMode = getStorage('theme-mode', 'auto');
        this.currentTheme = getStorage('morandi-theme', 'muted-blue');
        this.themes = [
            { name: 'muted-blue', title: '灰蓝' },
            { name: 'muted-green', title: '灰绿' },
            { name: 'muted-pink', title: '灰粉' },
            { name: 'muted-yellow', title: '灰黄' },
            { name: 'muted-purple', title: '灰紫' },
            { name: 'muted-orange', title: '灰橙' },
        ];
    }

    /**
     * 初始化主题系统
     */
    init() {
        this.applyMode(this.currentMode);
        this.applyTheme(this.currentTheme);
        this.updateModeButtons();
    }

    /**
     * 设置主题模式（auto/light/dark）
     * @param {string} mode - 主题模式
     */
    setMode(mode) {
        if (!['auto', 'light', 'dark'].includes(mode)) {
            console.warn(`Invalid mode: ${mode}`);
            return;
        }
        
        this.currentMode = mode;
        setStorage('theme-mode', mode);
        this.applyMode(mode);
        this.updateModeButtons();
    }

    /**
     * 应用主题模式
     * @param {string} mode - 主题模式
     */
    applyMode(mode) {
        let actualMode = mode;

        if (mode === 'auto') {
            // 根据系统时间自动判断
            const hour = new Date().getHours();
            const isNight = hour < 6 || hour >= 18;
            actualMode = isNight ? 'dark' : 'light';
        }

        setAttr(this.root, 'data-mode', actualMode);
    }

    /**
     * 设置莫兰迪主题
     * @param {string} themeName - 主题名称
     */
    setTheme(themeName) {
        if (!this.themes.some(t => t.name === themeName)) {
            console.warn(`Invalid theme: ${themeName}`);
            return;
        }

        this.currentTheme = themeName;
        setStorage('morandi-theme', themeName);
        this.applyTheme(themeName);
        this.updateThemeButtons();
    }

    /**
     * 应用莫兰迪主题
     * @param {string} themeName - 主题名称
     */
    applyTheme(themeName) {
        setAttr(this.root, 'data-theme', themeName);
    }

    /**
     * 获取所有可用主题列表
     * @returns {Array}
     */
    getThemes() {
        return [...this.themes];
    }

    /**
     * 更新模式按钮的视觉反馈
     * @private
     */
    updateModeButtons() {
        ['auto', 'light', 'dark'].forEach(mode => {
            const btn = $(`#btn-${mode}`);
            if (!btn) return;

            if (this.currentMode === mode) {
                addClass(btn, 'text-accent', 'bg-surface', 'shadow-sm');
                removeClass(btn, 'text-muted');
            } else {
                removeClass(btn, 'text-accent', 'bg-surface', 'shadow-sm');
                addClass(btn, 'text-muted');
            }
        });
    }

    /**
     * 更新主题按钮的视觉反馈
     * @private
     */
    updateThemeButtons() {
        const buttons = document.querySelectorAll('[data-theme-name]');
        buttons.forEach((btn) => {
            const themeName = btn.getAttribute('data-theme-name');
            
            if (themeName === this.currentTheme) {
                // 显示选中状态（由CSS处理，这里仅用于标记）
                btn.setAttribute('data-selected', 'true');
            } else {
                btn.removeAttribute('data-selected');
            }
        });
    }

    /**
     * 获取当前模式
     * @returns {string}
     */
    getMode() {
        return this.currentMode;
    }

    /**
     * 获取当前主题
     * @returns {string}
     */
    getTheme() {
        return this.currentTheme;
    }
}

// 导出单例
export const themeManager = new ThemeManager();
