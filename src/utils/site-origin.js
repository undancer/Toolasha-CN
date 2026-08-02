/**
 * Site Origin Utility
 * 提供安全的站点 origin 获取，Node/测试环境下回退到官方域名。
 * 独立模块（无任何依赖），供各模块安全引用，避免在非浏览器环境下崩溃。
 */

/**
 * 获取当前站点 origin，Node/测试环境下回退到官方域名。
 * 用户脚本支持国服等不同域名，浏览器中直接取当前页面 origin。
 * @returns {string} 站点 origin（不含末尾斜杠）
 */
export function getSiteOrigin() {
    return typeof window !== 'undefined' ? window.location.origin : 'https://www.milkywayidle.com';
}
