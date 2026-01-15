/**
 * 主初始化模块
 * 统一管理所有模块的初始化
 */

import { initPerformance } from './modules/performance.js';
import { themeManager } from './modules/theme.js';
import { scrollManager } from './modules/scroll.js';
import { sidebarManager } from './modules/sidebar.js';
import { SettingsManager } from './modules/settings.js';
import { typewriterEffect } from './modules/typewriter.js';
import { $ } from './utils/dom.js';

/**
 * 应用程序主类
 */
class BlogApp {
    constructor() {
        this.initialized = false;
        this.settingsManager = null;
    }

    /**
     * 初始化应用
     */
    async init() {
        if (this.initialized) return;

        try {
            console.log('[BlogApp] Initializing...');

            // 1. 性能优化初始化
            console.log('[BlogApp] Initializing performance...');
            initPerformance();

            // 2. 主题系统初始化
            console.log('[BlogApp] Initializing theme manager...');
            themeManager.init();

            // 3. 滚动效果初始化
            console.log('[BlogApp] Initializing scroll manager...');
            scrollManager.init();

            // 4. 侧边栏初始化
            console.log('[BlogApp] Initializing sidebar...');
            sidebarManager.init();

            // 5. 设置菜单初始化
            console.log('[BlogApp] Initializing settings menu...');
            this.settingsManager = new SettingsManager(themeManager);
            this.settingsManager.init();

            // 6. 打字机效果初始化
            console.log('[BlogApp] Initializing typewriter...');
            const metaElement = document.querySelector('[data-texts]');
            if (metaElement) {
                try {
                    const texts = JSON.parse(metaElement.getAttribute('data-texts'));
                    typewriterEffect.init(texts);
                } catch (e) {
                    console.warn('[BlogApp] Failed to parse typewriter texts:', e);
                    typewriterEffect.init();
                }
            } else {
                typewriterEffect.init();
            }

            // 7. 设置全局适配器（用于HTML中的onclick）
            this.setupGlobalAdapters();

            this.initialized = true;
            console.log('[BlogApp] Initialized successfully ✓');
        } catch (error) {
            console.error('[BlogApp] Initialization failed:', error);
        }
    }

    /**
     * 设置全局函数适配器
     * 用于HTML中的onclick属性和向后兼容
     * @private
     */
    setupGlobalAdapters() {
        // 侧边栏
        window.toggleSidebar = () => {
            sidebarManager.toggle();
        };

        // 设置菜单
        window.toggleSettingsMenu = () => {
            if (this.settingsManager) {
                this.settingsManager.toggle();
            }
        };

        // 主题模式
        window.setThemeMode = (mode) => {
            themeManager.setMode(mode);
        };

        // 莫兰迪主题
        window.setMorandiTheme = (themeName) => {
            themeManager.setTheme(themeName);
        };

        // 缩放控制
        window.adjustZoom = (delta) => {
            const display = $('#zoom-level');
            if (this.settingsManager) {
                this.settingsManager.adjustZoom(delta, display);
            }
        };
    }

    /**
     * 销毁应用（清理资源）
     */
    destroy() {
        if (this.initialized) {
            scrollManager.destroy();
            sidebarManager.destroy();
            if (this.settingsManager) {
                this.settingsManager.destroy();
            }
            typewriterEffect.destroy();
            this.initialized = false;
            console.log('[BlogApp] Destroyed');
        }
    }
}

// 创建全局实例
const app = new BlogApp();

// 在DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app.init();
    });
} else {
    // DOM已加载
    app.init();
}

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
    app.destroy();
});

// 导出应用实例（方便调试）
window.__blogApp = app;
