/**
 * DOM操作工具函数
 * 提供通用的DOM查询和操作方法
 */

/**
 * 查询单个元素
 * @param {string} selector - CSS选择器
 * @param {Element} context - 查询上下文，默认为document
 * @returns {Element|null}
 */
export const $ = (selector, context = document) => context.querySelector(selector);

/**
 * 查询多个元素
 * @param {string} selector - CSS选择器
 * @param {Element} context - 查询上下文，默认为document
 * @returns {NodeList}
 */
export const $$ = (selector, context = document) => context.querySelectorAll(selector);

/**
 * 给元素添加类名
 * @param {Element} el - 目标元素
 * @param {...string} classes - 类名列表
 */
export const addClass = (el, ...classes) => {
    if (el) el.classList.add(...classes);
};

/**
 * 给元素移除类名
 * @param {Element} el - 目标元素
 * @param {...string} classes - 类名列表
 */
export const removeClass = (el, ...classes) => {
    if (el) el.classList.remove(...classes);
};

/**
 * 切换元素类名
 * @param {Element} el - 目标元素
 * @param {string} className - 类名
 * @returns {boolean} 是否添加了类名
 */
export const toggleClass = (el, className) => {
    if (!el) return false;
    return el.classList.toggle(className);
};

/**
 * 检查元素是否有某个类名
 * @param {Element} el - 目标元素
 * @param {string} className - 类名
 * @returns {boolean}
 */
export const hasClass = (el, className) => {
    if (!el) return false;
    return el.classList.contains(className);
};

/**
 * 设置元素属性
 * @param {Element} el - 目标元素
 * @param {string} attr - 属性名
 * @param {string} value - 属性值
 */
export const setAttr = (el, attr, value) => {
    if (el) el.setAttribute(attr, value);
};

/**
 * 获取元素属性
 * @param {Element} el - 目标元素
 * @param {string} attr - 属性名
 * @returns {string|null}
 */
export const getAttr = (el, attr) => {
    if (!el) return null;
    return el.getAttribute(attr);
};

/**
 * 给元素设置样式
 * @param {Element} el - 目标元素
 * @param {Object} styles - 样式对象
 */
export const setStyles = (el, styles) => {
    if (!el) return;
    Object.entries(styles).forEach(([key, value]) => {
        el.style[key] = value;
    });
};

/**
 * 检查元素是否隐藏
 * @param {Element} el - 目标元素
 * @returns {boolean}
 */
export const isHidden = (el) => {
    if (!el) return true;
    return el.offsetParent === null || getComputedStyle(el).display === 'none';
};
