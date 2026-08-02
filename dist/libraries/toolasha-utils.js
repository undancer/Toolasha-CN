/**
 * Toolasha Utils Library
 * All utility modules
 * Version: 2.85.1
 * License: CC-BY-NC-SA-4.0
 */

(function(src_core_config_js, src_core_i18n_js, src_core_data_manager_js, src_core_websocket_js, src_core_storage_js, src_api_marketplace_js, src_core_dom_observer_js) {
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __exportAll = (all, no_symbols) => {
		let target = {};
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
		if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
		return target;
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	src_core_config_js = __toESM(src_core_config_js, 1);
	src_core_data_manager_js = __toESM(src_core_data_manager_js, 1);
	src_core_websocket_js = __toESM(src_core_websocket_js, 1);
	src_core_storage_js = __toESM(src_core_storage_js, 1);
	src_api_marketplace_js = __toESM(src_api_marketplace_js, 1);
	src_core_dom_observer_js = __toESM(src_core_dom_observer_js, 1);
	//#region src/utils/formatters.js
	/**
	* Formatting Utilities
	* Pure functions for formatting numbers and time
	*/
	var formatters_exports = /* @__PURE__ */ __exportAll({
		coinFormatter: () => coinFormatter,
		coinFormatterZh: () => coinFormatterZh,
		formatCompactNumber: () => formatCompactNumber,
		formatCurrency: () => formatCurrency,
		formatDateTime: () => formatDateTime,
		formatKMB: () => formatKMB,
		formatKMB3Digits: () => formatKMB3Digits,
		formatKMBzh: () => formatKMBzh,
		formatLargeNumber: () => formatLargeNumber,
		formatPercentage: () => formatPercentage,
		formatRelativeTime: () => formatRelativeTime,
		formatThreshold: () => formatThreshold,
		formatWithSeparator: () => formatWithSeparator,
		isAbbreviationEnabled: () => isAbbreviationEnabled,
		networthFormatter: () => networthFormatter,
		numberFormatter: () => numberFormatter,
		timeReadable: () => timeReadable,
		timeReadableZh: () => timeReadableZh
	});
	/**
	* Check if number abbreviation (K/M/B) is enabled based on user settings.
	* Returns true for both 'compact' and 'threshold' modes, false for 'full'.
	* Also handles legacy boolean values from old settings.
	* @returns {boolean}
	*/
	function isAbbreviationEnabled() {
		const mode = src_core_config_js.default.getSettingValue("formatting_useKMBFormat", "compact");
		if (mode === false || mode === "full") return false;
		return true;
	}
	/**
	* Format numbers with thousand separators
	* @param {number} num - The number to format
	* @param {number} digits - Number of decimal places (default: 0 for whole numbers)
	* @returns {string} Formatted number (e.g., "1,500", "1,500,000")
	*
	* @example
	* numberFormatter(1500) // "1,500"
	* numberFormatter(1500000) // "1,500,000"
	* numberFormatter(1500.5, 1) // "1,500.5"
	*/
	function numberFormatter(num, digits = 0) {
		if (num === null || num === void 0) return null;
		const rounded = digits > 0 ? num.toFixed(digits) : Math.round(num);
		return new Intl.NumberFormat().format(rounded);
	}
	/**
	* Convert seconds to human-readable time format
	* @param {number} sec - Seconds to convert
	* @returns {string} Formatted time (e.g., "1h 23m 45s" or "3 years 5 months 3 days")
	*
	* @example
	* timeReadable(3661) // "1h 01m 01s"
	* timeReadable(90000) // "1 day"
	* timeReadable(31536000) // "1 year"
	* timeReadable(100000000) // "3 years 2 months 3 days"
	*/
	function timeReadable(sec) {
		if (sec >= 31536e3) {
			const years = Math.floor(sec / 31536e3);
			const remainingAfterYears = sec - years * 31536e3;
			const months = Math.floor(remainingAfterYears / 2592e3);
			const remainingAfterMonths = remainingAfterYears - months * 2592e3;
			const days = Math.floor(remainingAfterMonths / 86400);
			const parts = [];
			if (years > 0) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
			if (months > 0) parts.push(`${months} month${months !== 1 ? "s" : ""}`);
			if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
			return parts.join(" ");
		}
		if (sec >= 86400) {
			const days = Math.floor(sec / 86400);
			const remainingAfterDays = sec - days * 86400;
			const hours = Math.floor(remainingAfterDays / 3600);
			const remainingAfterHours = remainingAfterDays - hours * 3600;
			const minutes = Math.floor(remainingAfterHours / 60);
			const parts = [];
			if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);
			if (hours > 0) parts.push(`${hours}h`);
			if (minutes > 0) parts.push(`${minutes}m`);
			return parts.join(" ");
		}
		const d = new Date(Math.round(sec * 1e3));
		function pad(i) {
			return ("0" + i).slice(-2);
		}
		const hours = d.getUTCHours();
		const minutes = d.getUTCMinutes();
		const seconds = d.getUTCSeconds();
		if (hours === 0 && minutes === 0) return seconds + "s";
		return hours + "h " + pad(minutes) + "m " + pad(seconds) + "s";
	}
	/**
	* Convert seconds to human-readable Chinese time format
	* Uses Chinese time units: 秒 (seconds), 分 (minutes), 时 (hours), 天 (days), 月 (months), 年 (years)
	* @param {number} sec - Seconds to convert
	* @returns {string} Formatted time (e.g., "1时 01分 01秒" or "3年 2月 3天")
	*
	* @example
	* timeReadableZh(3661) // "1时 01分 01秒"
	* timeReadableZh(90000) // "1天 1时"
	* timeReadableZh(100000000) // "3年 2月 3天"
	*/
	function timeReadableZh(sec) {
		if (sec >= 31536e3) {
			const years = Math.floor(sec / 31536e3);
			const remainingAfterYears = sec - years * 31536e3;
			const months = Math.floor(remainingAfterYears / 2592e3);
			const remainingAfterMonths = remainingAfterYears - months * 2592e3;
			const days = Math.floor(remainingAfterMonths / 86400);
			const parts = [];
			if (years > 0) parts.push(`${years}年`);
			if (months > 0) parts.push(`${months}月`);
			if (days > 0) parts.push(`${days}天`);
			return parts.join(" ");
		}
		if (sec >= 86400) {
			const days = Math.floor(sec / 86400);
			const remainingAfterDays = sec - days * 86400;
			const hours = Math.floor(remainingAfterDays / 3600);
			const remainingAfterHours = remainingAfterDays - hours * 3600;
			const minutes = Math.floor(remainingAfterHours / 60);
			const parts = [];
			if (days > 0) parts.push(`${days}天`);
			if (hours > 0) parts.push(`${hours}时`);
			if (minutes > 0) parts.push(`${minutes}分`);
			return parts.join(" ");
		}
		const d = new Date(Math.round(sec * 1e3));
		function pad(i) {
			return ("0" + i).slice(-2);
		}
		const hours = d.getUTCHours();
		const minutes = d.getUTCMinutes();
		const seconds = d.getUTCSeconds();
		if (hours === 0 && minutes === 0) return seconds + "秒";
		return hours + "时 " + pad(minutes) + "分 " + pad(seconds) + "秒";
	}
	/**
	* Format a number with thousand separators based on locale
	* @param {number} num - The number to format
	* @returns {string} Formatted number with separators
	*
	* @example
	* formatWithSeparator(1000000) // "1,000,000" (US locale)
	*/
	function formatWithSeparator(num) {
		return new Intl.NumberFormat().format(num);
	}
	/**
	* Format large numbers in K/M/B notation
	* @param {number} num - The number to format
	* @param {number} decimals - Number of decimal places (default: 1)
	* @returns {string} Formatted number (e.g., "1.5K", "2.3M", "1.2B")
	*
	* @example
	* formatKMB(1500) // "1.5K"
	* formatKMB(2300000) // "2.3M"
	* formatKMB(1234567890) // "1.2B"
	*/
	function formatKMB(num, decimals = 1) {
		if (num === null || num === void 0) return null;
		const absNum = Math.abs(num);
		const sign = num < 0 ? "-" : "";
		if (absNum >= 1e9) return sign + (absNum / 1e9).toFixed(decimals) + "B";
		else if (absNum >= 1e6) return sign + (absNum / 1e6).toFixed(decimals) + "M";
		else if (absNum >= 1e3) return sign + (absNum / 1e3).toFixed(decimals) + "K";
		else return sign + absNum.toFixed(0);
	}
	/**
	* Format large numbers in Chinese 万/亿 notation
	* @param {number} num - The number to format
	* @param {number} decimals - Number of decimal places (default: 2)
	* @returns {string} Formatted number (e.g., "5万", "150万", "1.2亿", "1万亿")
	*
	* Chinese number system: 万 = 10,000, 亿 = 100,000,000, 万亿 = 1,000,000,000,000
	*
	* @example
	* formatKMBzh(50000) // "5.00万"
	* formatKMBzh(1500000) // "150.00万"
	* formatKMBzh(120000000) // "1.20亿"
	* formatKMBzh(1000000000000) // "1.00万亿"
	*/
	function formatKMBzh(num, decimals = 2) {
		if (num === null || num === void 0) return null;
		const absNum = Math.abs(num);
		const sign = num < 0 ? "-" : "";
		if (absNum >= 0xe8d4a51000) return sign + (absNum / 0xe8d4a51000).toFixed(decimals) + "万亿";
		else if (absNum >= 1e8) return sign + (absNum / 1e8).toFixed(decimals) + "亿";
		else if (absNum >= 1e4) return sign + (absNum / 1e4).toFixed(decimals) + "万";
		else return sign + absNum.toFixed(0);
	}
	/**
	* Format large numbers in K/M/B notation with 3 significant digits
	* @param {number} num - The number to format
	* @returns {string} Formatted number (e.g., "999", "1.25K", "82.1K", "825K", "1.25M")
	*
	* Handles rounding edge cases properly:
	* - 9999 rounds to "10.0K" (not "10.00K")
	* - 99999 rounds to "100K" (not "100.0K")
	* - 999999 promotes to "1.00M" (not "1000K")
	*
	* @example
	* formatKMB3Digits(999) // "999"
	* formatKMB3Digits(1250) // "1.25K"
	* formatKMB3Digits(8210) // "8.21K"
	* formatKMB3Digits(9999) // "10.0K"
	* formatKMB3Digits(82100) // "82.1K"
	* formatKMB3Digits(99999) // "100K"
	* formatKMB3Digits(825000) // "825K"
	* formatKMB3Digits(999999) // "1.00M"
	* formatKMB3Digits(1250000) // "1.25M"
	* formatKMB3Digits(82300000) // "82.3M"
	*/
	function formatKMB3Digits(num) {
		if (num === null || num === void 0) return null;
		const absNum = Math.abs(num);
		const sign = num < 0 ? "-" : "";
		if (absNum >= 1e9) {
			const value = absNum / 1e9;
			const rounded = parseFloat(value.toFixed(2));
			let decimals = 2;
			if (rounded >= 100) decimals = 0;
			else if (rounded >= 10) decimals = 1;
			return sign + value.toFixed(decimals) + "B";
		} else if (absNum >= 1e6) {
			const value = absNum / 1e6;
			const rounded = parseFloat(value.toFixed(2));
			if (rounded >= 1e3) return sign + (value / 1e3).toFixed(2) + "B";
			let decimals = 2;
			if (rounded >= 100) decimals = 0;
			else if (rounded >= 10) decimals = 1;
			return sign + value.toFixed(decimals) + "M";
		} else if (absNum >= 1e3) {
			const value = absNum / 1e3;
			const rounded = parseFloat(value.toFixed(2));
			if (rounded >= 1e3) return sign + (value / 1e3).toFixed(2) + "M";
			let decimals = 2;
			if (rounded >= 100) decimals = 0;
			else if (rounded >= 10) decimals = 1;
			return sign + value.toFixed(decimals) + "K";
		} else return sign + Math.floor(absNum).toString();
	}
	/**
	* Format numbers using game-style coin notation (4-digit maximum display)
	* @param {number} num - The number to format
	* @returns {string} Formatted number (e.g., "999", "1,000", "10K", "9,999K", "10M")
	*
	* Game formatting rules (4-digit bounded notation):
	* - 0-999: Raw number (no formatting)
	* - 1,000-9,999: Comma format
	* - 10,000-9,999,999: K suffix (10K to 9,999K)
	* - 10,000,000-9,999,999,999: M suffix (10M to 9,999M)
	* - 10,000,000,000-9,999,999,999,999: B suffix (10B to 9,999B)
	* - 10,000,000,000,000+: T suffix (10T+)
	*
	* Key rule: Display never exceeds 4 numeric digits. When a 5th digit is needed,
	* promote to the next unit (K→M→B→T).
	*
	* @example
	* coinFormatter(999) // "999"
	* coinFormatter(1000) // "1,000"
	* coinFormatter(9999) // "9,999"
	* coinFormatter(10000) // "10K"
	* coinFormatter(999999) // "999K"
	* coinFormatter(1000000) // "1,000K"
	* coinFormatter(9999999) // "9,999K"
	* coinFormatter(10000000) // "10M"
	*/
	function coinFormatter(num) {
		if (num === null || num === void 0) return null;
		const absNum = Math.abs(num);
		const sign = num < 0 ? "-" : "";
		if (absNum < 1e3) return sign + Math.floor(absNum).toString();
		if (absNum < 1e4) return sign + new Intl.NumberFormat().format(Math.floor(absNum));
		if (absNum < 1e7) {
			const val = Math.floor(absNum / 1e3);
			return sign + (val >= 1e3 ? new Intl.NumberFormat().format(val) : val) + "K";
		}
		if (absNum < 1e10) {
			const val = Math.floor(absNum / 1e6);
			return sign + (val >= 1e3 ? new Intl.NumberFormat().format(val) : val) + "M";
		}
		if (absNum < 0x9184e72a000) {
			const val = Math.floor(absNum / 1e9);
			return sign + (val >= 1e3 ? new Intl.NumberFormat().format(val) : val) + "B";
		}
		const val = Math.floor(absNum / 0xe8d4a51000);
		return sign + (val >= 1e3 ? new Intl.NumberFormat().format(val) : val) + "T";
	}
	/**
	* Format numbers using game-style coin notation with Chinese suffixes (4-digit max display)
	* Uses 万 (10,000) and 亿 (100,000,000) as base units instead of K/M/B/T
	* @param {number} num - The number to format
	* @returns {string} Formatted number (e.g., "999", "1,000", "10万", "9,999万", "10亿")
	*
	* @example
	* coinFormatterZh(999) // "999"
	* coinFormatterZh(1000) // "1,000"
	* coinFormatterZh(9999) // "9,999"
	* coinFormatterZh(10000) // "1万"
	* coinFormatterZh(99999999) // "9,999万"
	* coinFormatterZh(100000000) // "1亿"
	* coinFormatterZh(999999999999) // "9,999亿"
	* coinFormatterZh(1000000000000) // "1万亿"
	*/
	function coinFormatterZh(num) {
		if (num === null || num === void 0) return null;
		const absNum = Math.abs(num);
		const sign = num < 0 ? "-" : "";
		if (absNum < 1e3) return sign + Math.floor(absNum).toString();
		if (absNum < 1e4) return sign + new Intl.NumberFormat().format(Math.floor(absNum));
		if (absNum < 1e8) {
			const val = Math.floor(absNum / 1e4);
			return sign + (val >= 1e3 ? new Intl.NumberFormat().format(val) : val) + "万";
		}
		if (absNum < 0xe8d4a51000) {
			const val = Math.floor(absNum / 1e8);
			return sign + (val >= 1e3 ? new Intl.NumberFormat().format(val) : val) + "亿";
		}
		const val = Math.floor(absNum / 0xe8d4a51000);
		return sign + (val >= 1e3 ? new Intl.NumberFormat().format(val) : val) + "万亿";
	}
	/**
	* Format milliseconds as relative time
	* @param {number} ageMs - Age in milliseconds
	* @returns {string} Formatted relative time (e.g., "5m", "2h 30m", "3d 12h", "14d")
	*
	* @example
	* formatRelativeTime(30000) // "Just now" (< 1 min)
	* formatRelativeTime(300000) // "5m" (5 minutes)
	* formatRelativeTime(7200000) // "2h 0m" (2 hours)
	* formatRelativeTime(93600000) // "1d 2h" (26 hours)
	* formatRelativeTime(864000000) // "10d" (10 days)
	* formatRelativeTime(2678400000) // "30+ days" (31 days)
	*/
	function formatRelativeTime(ageMs) {
		const minutes = Math.floor(ageMs / 6e4);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		if (minutes < 1) return (0, src_core_i18n_js.t)("Just now");
		if (days > 30) return (0, src_core_i18n_js.t)("30+ days");
		if (days > 7) return `${days}d`;
		if (days > 0) return `${days}d ${hours % 24}h`;
		if (hours > 0) return `${hours}h ${minutes % 60}m`;
		return `${minutes}m`;
	}
	/**
	* Format numbers for networth display with decimal precision
	* Uses 2 decimal places for better readability in detailed breakdowns
	* @param {number} num - The number to format
	* @returns {string} Formatted number (e.g., "1.23K", "45.67M", "89.01B")
	*
	* @example
	* networthFormatter(1234) // "1.23K"
	* networthFormatter(45678) // "45.68K"
	* networthFormatter(1234567) // "1.23M"
	* networthFormatter(89012345) // "89.01M"
	* networthFormatter(1234567890) // "1.23B"
	*/
	function networthFormatter(num) {
		if (num === null || num === void 0) return null;
		const absNum = Math.abs(num);
		const sign = num < 0 ? "-" : "";
		if (absNum < 1e3) return sign + Math.floor(absNum).toString();
		if (absNum < 1e6) return sign + (absNum / 1e3).toFixed(2) + "K";
		if (absNum < 1e9) return sign + (absNum / 1e6).toFixed(2) + "M";
		return sign + (absNum / 1e9).toFixed(2) + "B";
	}
	/**
	* Format a decimal value as a percentage
	* @param {number} value - The decimal value to format (e.g., 0.05 for 5%)
	* @param {number} decimals - Number of decimal places (default: 1)
	* @returns {string} Formatted percentage (e.g., "5.0%", "12.5%")
	*
	* @example
	* formatPercentage(0.05) // "5.0%"
	* formatPercentage(0.125, 1) // "12.5%"
	* formatPercentage(0.00123, 2) // "0.12%"
	* formatPercentage(0.00123, 3) // "0.123%"
	*/
	function formatPercentage(value, decimals = 1) {
		if (value === null || value === void 0) return null;
		const percentage = value * 100;
		return new Intl.NumberFormat(void 0, {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		}).format(percentage) + "%";
	}
	/**
	* Format currency/coin amounts intelligently based on context
	* @param {number} amount - The amount to format
	* @param {Object} options - Formatting options
	* @param {string} options.style - 'game' (4-digit), 'compact' (K/M/B), 'full' (thousand separators), 'networth' (2 decimals)
	* @param {number} options.decimals - Decimal places for compact style (default: 1)
	* @returns {string} Formatted currency string
	*
	* @example
	* formatCurrency(1500, {style: 'game'}) // "1,500"
	* formatCurrency(1500000, {style: 'game'}) // "1,500K"
	* formatCurrency(1500000, {style: 'compact'}) // "1.5M"
	* formatCurrency(1500000, {style: 'full'}) // "1,500,000"
	* formatCurrency(1234, {style: 'networth'}) // "1.23K"
	*/
	function formatCurrency(amount, options = {}) {
		const style = options.style || "game";
		const decimals = options.decimals !== void 0 ? options.decimals : 1;
		switch (style) {
			case "game": return coinFormatter(amount);
			case "compact": return formatKMB(amount, decimals);
			case "networth": return networthFormatter(amount);
			case "full": return formatWithSeparator(amount);
			default: return coinFormatter(amount);
		}
	}
	/**
	* Format numbers in compact notation (K/M/B)
	* Alias for formatKMB for clearer naming
	* @param {number} value - The number to format
	* @param {number} decimals - Number of decimal places (default: 1)
	* @returns {string} Formatted number (e.g., "1.5K", "2.3M", "1.2B")
	*
	* @example
	* formatCompactNumber(1500) // "1.5K"
	* formatCompactNumber(2300000) // "2.3M"
	* formatCompactNumber(1234567890) // "1.2B"
	*/
	function formatCompactNumber(value, decimals = 1) {
		return formatKMB(value, decimals);
	}
	/**
	* Format large numbers with threshold-based abbreviation.
	* Keeps full comma-separated digits until the number exceeds 4 display digits,
	* then abbreviates with the configured precision.
	* @param {number} num - The number to format
	* @param {number} decimals - Number of decimal places (default: user setting)
	* @returns {string} Formatted number (e.g., "9,999" or "10.0K" or "1.25M")
	*
	* @example
	* formatThreshold(9999, 2) // "9,999"
	* formatThreshold(10000, 2) // "10.00K"
	* formatThreshold(1250000, 2) // "1.25M"
	*/
	function formatThreshold(num, decimals = 1) {
		if (num === null || num === void 0) return null;
		const absNum = Math.abs(num);
		const sign = num < 0 ? "-" : "";
		if (absNum < 1e4) return sign + new Intl.NumberFormat().format(Math.round(absNum));
		return sign + _abbreviate(absNum, decimals);
	}
	/**
	* Internal: abbreviate a positive number with K/M/B suffix.
	* @private
	*/
	function _abbreviate(absNum, decimals) {
		if (absNum >= 1e9) return (absNum / 1e9).toFixed(decimals) + "B";
		else if (absNum >= 1e6) return (absNum / 1e6).toFixed(decimals) + "M";
		else if (absNum >= 1e3) return (absNum / 1e3).toFixed(decimals) + "K";
		return absNum.toFixed(0);
	}
	/**
	* Format large numbers based on user preference
	* Dispatches to full, threshold, or compact format based on settings
	* @param {number} value - The number to format
	* @param {number} [decimals] - Override decimal places (if omitted, uses user setting)
	* @returns {string} Formatted number
	*
	* @example
	* // compact mode, precision 2: formatLargeNumber(1500000) → "1.50M"
	* // threshold mode, precision 2: formatLargeNumber(9999) → "9,999", formatLargeNumber(10000) → "10.00K"
	* // full mode: formatLargeNumber(1500000) → "1,500,000"
	*/
	function formatLargeNumber(value, decimals) {
		const mode = src_core_config_js.default.getSettingValue("formatting_useKMBFormat", "compact");
		if (mode === "full" || mode === false) return formatWithSeparator(value);
		const precision = decimals !== void 0 ? decimals : Number(src_core_config_js.default.getSettingValue("formatting_precision", "2"));
		if (mode === "threshold") return formatThreshold(value, precision);
		return formatKMB(value, precision);
	}
	/**
	* Format a Date using the user's date/time format settings.
	* @param {Date} date - The date to format
	* @param {Object} [options]
	* @param {boolean} [options.includeDate=true] - Include the date portion (MM-DD or DD-MM)
	* @param {boolean} [options.includeTime=true] - Include the time portion
	* @param {boolean} [options.includeSeconds=true] - Include seconds in time
	* @returns {string}
	*/
	function formatDateTime(date, options = {}) {
		const { includeDate = true, includeTime = true, includeSeconds = true, includeYear = false } = options;
		const use24h = src_core_config_js.default.getSettingValue("market_listingTimeFormat", "24hour") === "24hour";
		const dateFormat = src_core_config_js.default.getSettingValue("market_listingDateFormat", "MM-DD");
		const parts = [];
		if (includeDate) {
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			let datePart = dateFormat === "DD-MM" ? `${day}-${month}` : `${month}-${day}`;
			if (includeYear) datePart += `-${String(date.getFullYear()).slice(-2)}`;
			parts.push(datePart);
		}
		if (includeTime) {
			const timeOpts = {
				hour: "numeric",
				minute: "2-digit",
				hour12: !use24h
			};
			if (includeSeconds) timeOpts.second = "2-digit";
			parts.push(date.toLocaleString("en-US", timeOpts).trim());
		}
		return parts.join(" ");
	}
	//#endregion
	//#region src/features/combat/loadout-snapshot.js
	/**
	* Loadout Snapshot
	*
	* Listens for `loadouts_updated` WebSocket messages to capture all loadout configurations
	* (equipment, abilities, consumables, enhancement levels) in real time.
	*
	* Stored snapshots are used by profit calculators to apply the correct tool/equipment
	* bonuses for a skill even when that loadout is not currently equipped.
	*
	* Skill matching: the loadout's actionTypeHrid (e.g. "/action_types/brewing") is compared
	* to the action type of the profit calculation. An "All Skills" loadout (empty actionTypeHrid)
	* is used as a fallback when no skill-specific snapshot is found.
	*
	* Priority: skill default > all skills default > skill non-default > all skills non-default
	*/
	var STORAGE_KEY_PREFIX = "loadout_snapshots";
	/**
	* Returns the active WebSocket hook instance.
	* In the multi-bundle production build each library bundles its own copy of websocket.js,
	* but only the Core library's instance has install() called on it.
	* Prefer window.Toolasha.Core.webSocketHook so listeners actually receive messages.
	* Falls back to the bundled copy for the dev standalone build (single bundle, one instance).
	*/
	function getWebSocketHook() {
		return typeof window !== "undefined" && window.Toolasha?.Core?.webSocketHook || src_core_websocket_js.default;
	}
	/**
	* Get character-scoped storage key.
	* @returns {string}
	*/
	function getStorageKey() {
		return `${STORAGE_KEY_PREFIX}_${src_core_data_manager_js.default.getCurrentCharacterId() || "default"}`;
	}
	/**
	* Parse a wearable hash string into itemLocationHrid, itemHrid, and enhancementLevel.
	* Format: "characterId::/item_locations/location::/items/item_hrid::enhancementLevel"
	* Empty string means no item in that slot.
	* @param {string} itemLocationHrid - The equipment slot key (e.g. "/item_locations/body")
	* @param {string} wearableHash - The wearable hash value
	* @returns {{ itemLocationHrid: string, itemHrid: string, enhancementLevel: number }|null}
	*/
	function parseWearable(itemLocationHrid, wearableHash) {
		if (!wearableHash) return null;
		const parts = wearableHash.split("::");
		const itemHrid = parts.find((p) => p.startsWith("/items/"));
		if (!itemHrid) return null;
		const lastPart = parts[parts.length - 1];
		return {
			itemLocationHrid,
			itemHrid,
			enhancementLevel: !lastPart.startsWith("/") ? parseInt(lastPart, 10) || 0 : 0
		};
	}
	/**
	* Convert a server loadout object into our snapshot format.
	* @param {Object} loadout - A loadout entry from characterLoadoutMap
	* @returns {Object} snapshot
	*/
	function buildSnapshot(loadout) {
		const equipment = [];
		for (const [locationHrid, hash] of Object.entries(loadout.wearableMap || {})) {
			const parsed = parseWearable(locationHrid, hash);
			if (parsed) equipment.push(parsed);
		}
		const drinks = (loadout.drinkItemHrids || []).map((hrid) => ({ itemHrid: hrid || "" }));
		const food = (loadout.foodItemHrids || []).map((hrid) => ({ itemHrid: hrid || "" }));
		const abilities = [];
		for (const [slot, hrid] of Object.entries(loadout.abilityMap || {})) if (hrid) abilities.push({
			abilityHrid: hrid,
			slot: parseInt(slot, 10)
		});
		return {
			name: loadout.name,
			actionTypeHrid: loadout.actionTypeHrid || "",
			isDefault: !!loadout.isDefault,
			useExactEnhancement: loadout.useExactEnhancement ?? false,
			ordinal: loadout.ordinal || 0,
			equipment,
			abilities,
			food,
			drinks,
			abilityCombatTriggersMap: loadout.abilityCombatTriggersMap || {},
			consumableCombatTriggersMap: loadout.consumableCombatTriggersMap || {},
			savedAt: Date.now()
		};
	}
	var LoadoutSnapshot = class {
		constructor() {
			this.snapshots = {};
			this.characterInitializedHandler = null;
			this.updateListeners = [];
			this.isInitialized = false;
			this.loadoutsUpdatedHandler = (data) => this._onLoadoutsUpdated(data);
			getWebSocketHook().on("loadouts_updated", this.loadoutsUpdatedHandler);
		}
		/**
		* Register a callback to be called whenever snapshots are updated.
		* @param {Function} fn
		*/
		onUpdate(fn) {
			this.updateListeners.push(fn);
		}
		/**
		* Remove a previously registered update callback.
		* @param {Function} fn
		*/
		offUpdate(fn) {
			this.updateListeners = this.updateListeners.filter((l) => l !== fn);
		}
		_emitUpdate() {
			this.updateListeners.forEach((fn) => fn());
		}
		async initialize() {
			if (this.isInitialized) return;
			this.isInitialized = true;
			if (!this.loadoutsUpdatedHandler) {
				this.loadoutsUpdatedHandler = (data) => this._onLoadoutsUpdated(data);
				getWebSocketHook().on("loadouts_updated", this.loadoutsUpdatedHandler);
			}
			if (Object.keys(this.snapshots).length === 0) {
				const storageKey = getStorageKey();
				this.snapshots = await src_core_storage_js.default.getJSON(storageKey, "settings", null) || {};
				if (Object.keys(this.snapshots).length === 0) {
					const characterLoadoutMap = src_core_data_manager_js.default.characterData?.characterLoadoutMap;
					if (characterLoadoutMap && Object.keys(characterLoadoutMap).length > 0) this._onLoadoutsUpdated({ characterLoadoutMap });
				}
			}
			this.characterInitializedHandler = async () => {
				const storageKey = getStorageKey();
				const fresh = await src_core_storage_js.default.getJSON(storageKey, "settings", null) || {};
				if (Object.keys(fresh).length > 0) {
					this.snapshots = fresh;
					this._emitUpdate();
				}
			};
			src_core_data_manager_js.default.on("character_initialized", this.characterInitializedHandler);
		}
		/**
		* Handle a loadouts_updated WebSocket message.
		* Replaces all snapshots with the server's current state.
		* @param {Object} data - The WebSocket message payload
		*/
		_onLoadoutsUpdated(data) {
			const loadoutMap = data.characterLoadoutMap;
			if (!loadoutMap) {
				console.warn("[LoadoutSnapshot] loadouts_updated received but no characterLoadoutMap");
				return;
			}
			const newSnapshots = {};
			for (const [id, loadout] of Object.entries(loadoutMap)) {
				if (!loadout.name) continue;
				newSnapshots[id] = buildSnapshot(loadout);
			}
			this.snapshots = newSnapshots;
			src_core_storage_js.default.setJSON(getStorageKey(), this.snapshots, "settings");
			this._emitUpdate();
		}
		/**
		* Update a snapshot equipment item's enhancement level.
		* Used when the highest owned enhancement of a loadout item changes (up or down).
		* @param {string} itemHrid - Base item HRID (e.g. "/items/sword")
		* @param {number} newLevel - New enhancement level (highest currently owned)
		* @returns {boolean} True if any snapshot was updated
		*/
		updateEnhancementLevel(itemHrid, newLevel) {
			let changed = false;
			for (const snapshot of Object.values(this.snapshots)) {
				if (snapshot.useExactEnhancement) continue;
				for (const eq of snapshot.equipment || []) if (eq.itemHrid === itemHrid && eq.enhancementLevel !== newLevel) {
					eq.enhancementLevel = newLevel;
					snapshot.savedAt = Date.now();
					changed = true;
				}
			}
			if (changed) {
				src_core_storage_js.default.setJSON(getStorageKey(), this.snapshots, "settings");
				this._emitUpdate();
			}
			return changed;
		}
		/**
		* Find the best snapshot for a given action type.
		* Priority: skill default > all skills default > skill non-default > all skills non-default
		* @param {string} actionTypeHrid - e.g. "/action_types/brewing"
		* @returns {Object|null} snapshot entry or null
		*/
		_findSnapshot(actionTypeHrid) {
			if (!src_core_config_js.default.getSetting("loadoutSnapshot")) return null;
			let skillDefault = null;
			let allSkillsDefault = null;
			let skillNonDefault = null;
			let allSkillsNonDefault = null;
			for (const snapshot of Object.values(this.snapshots)) if (snapshot.actionTypeHrid === actionTypeHrid) if (snapshot.isDefault) skillDefault = snapshot;
			else skillNonDefault = snapshot;
			else if (snapshot.actionTypeHrid === "") if (snapshot.isDefault) allSkillsDefault = snapshot;
			else allSkillsNonDefault = snapshot;
			return skillDefault || allSkillsDefault || skillNonDefault || allSkillsNonDefault || null;
		}
		/**
		* Get a Map<itemLocationHrid, item> for the best loadout snapshot matching the given
		* action type. Returns null if no snapshot exists or the feature is disabled.
		* The returned Map has the same format as dataManager.getEquipment().
		* @param {string} actionTypeHrid
		* @returns {Map<string, Object>|null}
		*/
		getSnapshotForSkill(actionTypeHrid) {
			const snapshot = this._findSnapshot(actionTypeHrid);
			if (!snapshot || !snapshot.equipment?.length) return null;
			return new Map(snapshot.equipment.map((e) => [e.itemLocationHrid, e]));
		}
		/**
		* Get the drink slots array for the best loadout snapshot matching the given
		* action type. Returns null if no snapshot exists or the feature is disabled.
		* The returned array has the same format as dataManager.getActionDrinkSlots().
		* @param {string} actionTypeHrid
		* @returns {Array<{itemHrid: string}>|null}
		*/
		getSnapshotDrinksForSkill(actionTypeHrid) {
			const snapshot = this._findSnapshot(actionTypeHrid);
			if (!snapshot) return null;
			const filled = (snapshot.drinks || []).filter((d) => d.itemHrid);
			return filled.length > 0 ? filled : null;
		}
		/**
		* Get all saved loadout snapshots as a flat array.
		* @returns {Array<Object>} Array of snapshot objects
		*/
		getAllSnapshots() {
			return Object.values(this.snapshots).sort((a, b) => a.ordinal - b.ordinal);
		}
		/**
		* Get the name and default status of the saved loadout being used for a given action type.
		* Returns an object with name and isDefault, or null if no snapshot exists or feature is disabled.
		* @param {string} actionTypeHrid
		* @returns {{ name: string, isDefault: boolean }|null}
		*/
		getSnapshotInfoForSkill(actionTypeHrid) {
			const snapshot = this._findSnapshot(actionTypeHrid);
			if (!snapshot) return null;
			return {
				name: snapshot.name,
				isDefault: !!snapshot.isDefault
			};
		}
		disable() {
			if (this.loadoutsUpdatedHandler) {
				getWebSocketHook().off("loadouts_updated", this.loadoutsUpdatedHandler);
				this.loadoutsUpdatedHandler = null;
			}
			if (this.characterInitializedHandler) {
				src_core_data_manager_js.default.off("character_initialized", this.characterInitializedHandler);
				this.characterInitializedHandler = null;
			}
			this.updateListeners = [];
			this.isInitialized = false;
		}
	};
	var loadoutSnapshot = new LoadoutSnapshot();
	//#endregion
	//#region src/utils/action-context.js
	/**
	* Action context resolver
	*
	* Returns the equipment and active drinks to use when predicting an action's
	* outcome (XP, time, profit, materials). When the loadoutSnapshot feature is
	* enabled and a saved loadout matches the action type, that snapshot is used
	* — so predictions reflect the gear the user would auto-equip rather than
	* whatever happens to be on their character right now.
	*
	* Resolution priority (handled inside loadoutSnapshot._findSnapshot):
	*   1. Skill-specific default loadout
	*   2. All-skills default loadout
	*   3. Skill-specific non-default
	*   4. All-skills non-default
	*   5. Fall back to currently-equipped gear / current drinks
	*
	* Equipment and drinks are resolved independently — it's valid to inherit the
	* snapshot's equipment while no snapshot drinks exist, in which case the
	* current drinks are used (and vice-versa).
	*/
	/**
	* @param {string} actionTypeHrid - e.g. "/action_types/cooking"
	* @returns {{equipment: Map, drinks: Array}}
	*/
	function resolveActionContext(actionTypeHrid) {
		const rawDrinks = loadoutSnapshot.getSnapshotDrinksForSkill(actionTypeHrid) ?? src_core_data_manager_js.default.getActionDrinkSlots(actionTypeHrid);
		const inventory = src_core_data_manager_js.default.getInventory();
		const drinks = (rawDrinks || []).filter((d) => d?.itemHrid && inventory.some((i) => i.itemHrid === d.itemHrid && (i.count || 0) > 0));
		return {
			equipment: loadoutSnapshot.getSnapshotForSkill(actionTypeHrid) ?? src_core_data_manager_js.default.getEquipment(),
			drinks
		};
	}
	//#endregion
	//#region src/utils/item-names-zh.js
	var item_names_zh_default = {
		Coin: "金币",
		"Task Token": "任务代币",
		"Labyrinth Token": "迷宫代币",
		"Chimerical Token": "奇幻代币",
		"Sinister Token": "阴森代币",
		"Enchanted Token": "秘法代币",
		"Pirate Token": "海盗代币",
		Cowbell: "牛铃",
		"Bag Of 10 Cowbells": "牛铃袋 (10个)",
		"Purple's Gift": "小紫牛的礼物",
		"Small Meteorite Cache": "小陨石舱",
		"Medium Meteorite Cache": "中陨石舱",
		"Large Meteorite Cache": "大陨石舱",
		"Small Artisan's Crate": "小工匠匣",
		"Medium Artisan's Crate": "中工匠匣",
		"Large Artisan's Crate": "大工匠匣",
		"Small Treasure Chest": "小宝箱",
		"Medium Treasure Chest": "中宝箱",
		"Large Treasure Chest": "大宝箱",
		"Chimerical Chest": "奇幻宝箱",
		"Sinister Chest": "阴森宝箱",
		"Enchanted Chest": "秘法宝箱",
		"Pirate Chest": "海盗宝箱",
		"Purdora's Box (Skilling)": "紫多拉之盒（生活）",
		"Purdora's Box (Combat)": "紫多拉之盒（战斗）",
		"Scroll Of Gathering": "采集卷轴",
		"Scroll Of Gourmet": "美食卷轴",
		"Scroll Of Processing": "加工卷轴",
		"Scroll Of Efficiency": "效率卷轴",
		"Scroll Of Action Speed": "行动速度卷轴",
		"Scroll Of Combat Drop": "战斗掉落卷轴",
		"Scroll Of Attack Speed": "攻击速度卷轴",
		"Scroll Of Cast Speed": "施法速度卷轴",
		"Scroll Of Damage": "伤害卷轴",
		"Scroll Of Critical Rate": "暴击率卷轴",
		"Scroll Of Wisdom": "经验卷轴",
		"Scroll Of Rare Find": "稀有发现卷轴",
		"Blue Key Fragment": "蓝色钥匙碎片",
		"Green Key Fragment": "绿色钥匙碎片",
		"Purple Key Fragment": "紫色钥匙碎片",
		"White Key Fragment": "白色钥匙碎片",
		"Orange Key Fragment": "橙色钥匙碎片",
		"Brown Key Fragment": "棕色钥匙碎片",
		"Stone Key Fragment": "石头钥匙碎片",
		"Dark Key Fragment": "黑暗钥匙碎片",
		"Burning Key Fragment": "燃烧钥匙碎片",
		Donut: "甜甜圈",
		"Blueberry Donut": "蓝莓甜甜圈",
		"Blackberry Donut": "黑莓甜甜圈",
		"Strawberry Donut": "草莓甜甜圈",
		"Mooberry Donut": "哞莓甜甜圈",
		"Marsberry Donut": "火星莓甜甜圈",
		"Spaceberry Donut": "太空莓甜甜圈",
		Cupcake: "纸杯蛋糕",
		"Blueberry Cake": "蓝莓蛋糕",
		"Blackberry Cake": "黑莓蛋糕",
		"Strawberry Cake": "草莓蛋糕",
		"Mooberry Cake": "哞莓蛋糕",
		"Marsberry Cake": "火星莓蛋糕",
		"Spaceberry Cake": "太空莓蛋糕",
		Gummy: "软糖",
		"Apple Gummy": "苹果软糖",
		"Orange Gummy": "橙子软糖",
		"Plum Gummy": "李子软糖",
		"Peach Gummy": "桃子软糖",
		"Dragon Fruit Gummy": "火龙果软糖",
		"Star Fruit Gummy": "杨桃软糖",
		Yogurt: "酸奶",
		"Apple Yogurt": "苹果酸奶",
		"Orange Yogurt": "橙子酸奶",
		"Plum Yogurt": "李子酸奶",
		"Peach Yogurt": "桃子酸奶",
		"Dragon Fruit Yogurt": "火龙果酸奶",
		"Star Fruit Yogurt": "杨桃酸奶",
		"Milking Tea": "挤奶茶",
		"Foraging Tea": "采摘茶",
		"Woodcutting Tea": "伐木茶",
		"Cooking Tea": "烹饪茶",
		"Brewing Tea": "冲泡茶",
		"Alchemy Tea": "炼金茶",
		"Enhancing Tea": "强化茶",
		"Cheesesmithing Tea": "奶酪锻造茶",
		"Crafting Tea": "制作茶",
		"Tailoring Tea": "缝纫茶",
		"Super Milking Tea": "超级挤奶茶",
		"Super Foraging Tea": "超级采摘茶",
		"Super Woodcutting Tea": "超级伐木茶",
		"Super Cooking Tea": "超级烹饪茶",
		"Super Brewing Tea": "超级冲泡茶",
		"Super Alchemy Tea": "超级炼金茶",
		"Super Enhancing Tea": "超级强化茶",
		"Super Crafting Tea": "超级制作茶",
		"Super Tailoring Tea": "超级缝纫茶",
		"Ultra Milking Tea": "究极挤奶茶",
		"Ultra Foraging Tea": "究极采摘茶",
		"Ultra Woodcutting Tea": "究极伐木茶",
		"Ultra Cooking Tea": "究极烹饪茶",
		"Ultra Brewing Tea": "究极冲泡茶",
		"Ultra Alchemy Tea": "究极炼金茶",
		"Ultra Enhancing Tea": "究极强化茶",
		"Ultra Crafting Tea": "究极制作茶",
		"Ultra Tailoring Tea": "究极缝纫茶",
		"Gathering Tea": "采集茶",
		"Gourmet Tea": "美食茶",
		"Wisdom Tea": "经验茶",
		"Processing Tea": "加工茶",
		"Efficiency Tea": "效率茶",
		"Artisan Tea": "工匠茶",
		"Catalytic Tea": "催化茶",
		"Blessed Tea": "福气茶",
		"Stamina Coffee": "耐力咖啡",
		"Intelligence Coffee": "智力咖啡",
		"Defense Coffee": "防御咖啡",
		"Attack Coffee": "攻击咖啡",
		"Melee Coffee": "近战咖啡",
		"Ranged Coffee": "远程咖啡",
		"Magic Coffee": "魔法咖啡",
		"Super Stamina Coffee": "超级耐力咖啡",
		"Super Intelligence Coffee": "超级智力咖啡",
		"Super Defense Coffee": "超级防御咖啡",
		"Super Attack Coffee": "超级攻击咖啡",
		"Super Melee Coffee": "超级近战咖啡",
		"Super Ranged Coffee": "超级远程咖啡",
		"Super Magic Coffee": "超级魔法咖啡",
		"Ultra Stamina Coffee": "究极耐力咖啡",
		"Ultra Intelligence Coffee": "究极智力咖啡",
		"Ultra Defense Coffee": "究极防御咖啡",
		"Ultra Attack Coffee": "究极攻击咖啡",
		"Ultra Melee Coffee": "究极近战咖啡",
		"Ultra Ranged Coffee": "究极远程咖啡",
		"Ultra Magic Coffee": "究极魔法咖啡",
		"Wisdom Coffee": "经验咖啡",
		"Lucky Coffee": "幸运咖啡",
		"Swiftness Coffee": "迅捷咖啡",
		"Channeling Coffee": "吟唱咖啡",
		"Critical Coffee": "暴击咖啡",
		Poke: "破胆之刺",
		Impale: "透骨之刺",
		Puncture: "破甲之刺",
		"Penetrating Strike": "贯心之刺",
		Scratch: "爪影斩",
		Cleave: "分裂斩",
		Maim: "血刃斩",
		"Crippling Slash": "致残斩",
		Smack: "重碾",
		Sweep: "重扫",
		"Stunning Blow": "重锤",
		"Fracturing Impact": "碎裂冲击",
		"Shield Bash": "盾击",
		"Quick Shot": "快速射击",
		"Aqua Arrow": "流水箭",
		"Flame Arrow": "烈焰箭",
		"Rain Of Arrows": "箭雨",
		"Silencing Shot": "沉默之箭",
		"Steady Shot": "稳定射击",
		"Pestilent Shot": "疫病射击",
		"Penetrating Shot": "贯穿射击",
		"Water Strike": "流水冲击",
		"Ice Spear": "冰枪术",
		"Frost Surge": "冰霜爆裂",
		"Mana Spring": "法力喷泉",
		Entangle: "缠绕",
		"Toxic Pollen": "剧毒粉尘",
		"Nature's Veil": "自然菌幕",
		"Life Drain": "生命吸取",
		Fireball: "火球",
		"Flame Blast": "熔岩爆裂",
		Firestorm: "火焰风暴",
		"Smoke Burst": "烟爆灭影",
		"Minor Heal": "初级自愈术",
		Heal: "自愈术",
		"Quick Aid": "快速治疗术",
		Rejuvenate: "群体治疗术",
		Taunt: "嘲讽",
		Provoke: "挑衅",
		Toughness: "坚韧",
		Elusiveness: "闪避",
		Precision: "精确",
		Berserk: "狂暴",
		"Elemental Affinity": "元素增幅",
		Frenzy: "狂速",
		"Spike Shell": "尖刺防护",
		Retribution: "惩戒",
		Vampirism: "吸血",
		Revive: "复活",
		Insanity: "疯狂",
		Invincible: "无敌",
		"Speed Aura": "速度光环",
		"Guardian Aura": "守护光环",
		"Fierce Aura": "物理光环",
		"Critical Aura": "暴击光环",
		"Mystic Aura": "元素光环",
		"Gobo Stabber": "哥布林长剑",
		"Gobo Slasher": "哥布林关刀",
		"Gobo Smasher": "哥布林狼牙棒",
		"Spiked Bulwark": "尖刺重盾",
		"Werewolf Slasher": "狼人关刀",
		"Griffin Bulwark": "狮鹫重盾",
		"Griffin Bulwark (R)": "狮鹫重盾（精）",
		"Gobo Shooter": "哥布林弹弓",
		"Vampiric Bow": "吸血弓",
		"Cursed Bow": "咒怨之弓",
		"Cursed Bow (R)": "咒怨之弓（精）",
		"Gobo Boomstick": "哥布林火棍",
		"Cheese Bulwark": "奶酪重盾",
		"Verdant Bulwark": "翠绿重盾",
		"Azure Bulwark": "蔚蓝重盾",
		"Burble Bulwark": "深紫重盾",
		"Crimson Bulwark": "绛红重盾",
		"Rainbow Bulwark": "彩虹重盾",
		"Holy Bulwark": "神圣重盾",
		"Wooden Bow": "木弓",
		"Birch Bow": "桦木弓",
		"Cedar Bow": "雪松弓",
		"Purpleheart Bow": "紫心弓",
		"Ginkgo Bow": "银杏弓",
		"Redwood Bow": "红杉弓",
		"Arcane Bow": "神秘弓",
		"Stalactite Spear": "石钟长枪",
		"Granite Bludgeon": "花岗岩大棒",
		"Furious Spear": "狂怒长枪",
		"Furious Spear (R)": "狂怒长枪（精）",
		"Regal Sword": "君王之剑",
		"Regal Sword (R)": "君王之剑（精）",
		"Chaotic Flail": "混沌连枷",
		"Chaotic Flail (R)": "混沌连枷（精）",
		"Soul Hunter Crossbow": "灵魂猎手弩",
		"Sundering Crossbow": "裂空之弩",
		"Sundering Crossbow (R)": "裂空之弩（精）",
		"Frost Staff": "冰霜法杖",
		"Infernal Battlestaff": "炼狱法杖",
		"Jackalope Staff": "鹿角兔之杖",
		"Rippling Trident": "涟漪三叉戟",
		"Rippling Trident (R)": "涟漪三叉戟（精）",
		"Blooming Trident": "绽放三叉戟",
		"Blooming Trident (R)": "绽放三叉戟（精）",
		"Blazing Trident": "炽焰三叉戟",
		"Blazing Trident (R)": "炽焰三叉戟（精）",
		"Cheese Sword": "奶酪剑",
		"Verdant Sword": "翠绿剑",
		"Azure Sword": "蔚蓝剑",
		"Burble Sword": "深紫剑",
		"Crimson Sword": "绛红剑",
		"Rainbow Sword": "彩虹剑",
		"Holy Sword": "神圣剑",
		"Cheese Spear": "奶酪长枪",
		"Verdant Spear": "翠绿长枪",
		"Azure Spear": "蔚蓝长枪",
		"Burble Spear": "深紫长枪",
		"Crimson Spear": "绛红长枪",
		"Rainbow Spear": "彩虹长枪",
		"Holy Spear": "神圣长枪",
		"Cheese Mace": "奶酪钉头锤",
		"Verdant Mace": "翠绿钉头锤",
		"Azure Mace": "蔚蓝钉头锤",
		"Burble Mace": "深紫钉头锤",
		"Crimson Mace": "绛红钉头锤",
		"Rainbow Mace": "彩虹钉头锤",
		"Holy Mace": "神圣钉头锤",
		"Wooden Crossbow": "木弩",
		"Birch Crossbow": "桦木弩",
		"Cedar Crossbow": "雪松弩",
		"Purpleheart Crossbow": "紫心弩",
		"Ginkgo Crossbow": "银杏弩",
		"Redwood Crossbow": "红杉弩",
		"Arcane Crossbow": "神秘弩",
		"Wooden Water Staff": "木制水法杖",
		"Birch Water Staff": "桦木水法杖",
		"Cedar Water Staff": "雪松水法杖",
		"Purpleheart Water Staff": "紫心水法杖",
		"Ginkgo Water Staff": "银杏水法杖",
		"Redwood Water Staff": "红杉水法杖",
		"Arcane Water Staff": "神秘水法杖",
		"Wooden Nature Staff": "木制自然法杖",
		"Birch Nature Staff": "桦木自然法杖",
		"Cedar Nature Staff": "雪松自然法杖",
		"Purpleheart Nature Staff": "紫心自然法杖",
		"Ginkgo Nature Staff": "银杏自然法杖",
		"Redwood Nature Staff": "红杉自然法杖",
		"Arcane Nature Staff": "神秘自然法杖",
		"Wooden Fire Staff": "木制火法杖",
		"Birch Fire Staff": "桦木火法杖",
		"Cedar Fire Staff": "雪松火法杖",
		"Purpleheart Fire Staff": "紫心火法杖",
		"Ginkgo Fire Staff": "银杏火法杖",
		"Redwood Fire Staff": "红杉火法杖",
		"Arcane Fire Staff": "神秘火法杖",
		"Eye Watch": "掌上监工",
		"Snake Fang Dirk": "蛇牙短剑",
		"Vision Shield": "视觉盾",
		"Gobo Defender": "哥布林防御者",
		"Vampire Fang Dirk": "吸血鬼短剑",
		"Knight's Aegis": "骑士盾",
		"Knight's Aegis (R)": "骑士盾（精）",
		"Treant Shield": "树人盾",
		"Manticore Shield": "蝎狮盾",
		"Tome Of Healing": "治疗之书",
		"Tome Of The Elements": "元素之书",
		"Watchful Relic": "警戒遗物",
		"Bishop's Codex": "主教法典",
		"Bishop's Codex (R)": "主教法典（精）",
		"Cheese Buckler": "奶酪圆盾",
		"Verdant Buckler": "翠绿圆盾",
		"Azure Buckler": "蔚蓝圆盾",
		"Burble Buckler": "深紫圆盾",
		"Crimson Buckler": "绛红圆盾",
		"Rainbow Buckler": "彩虹圆盾",
		"Holy Buckler": "神圣圆盾",
		"Wooden Shield": "木盾",
		"Birch Shield": "桦木盾",
		"Cedar Shield": "雪松盾",
		"Purpleheart Shield": "紫心盾",
		"Ginkgo Shield": "银杏盾",
		"Redwood Shield": "红杉盾",
		"Arcane Shield": "神秘盾",
		"Gatherer Cape": "采集者披风",
		"Gatherer Cape (R)": "采集者披风（精）",
		"Artificer Cape": "工匠披风",
		"Artificer Cape (R)": "工匠披风（精）",
		"Culinary Cape": "厨师披风",
		"Culinary Cape (R)": "厨师披风（精）",
		"Chance Cape": "机缘披风",
		"Chance Cape (R)": "机缘披风（精）",
		"Sinister Cape": "阴森披风",
		"Sinister Cape (R)": "阴森披风（精）",
		"Chimerical Quiver": "奇幻箭袋",
		"Chimerical Quiver (R)": "奇幻箭袋（精）",
		"Enchanted Cloak": "秘法披风",
		"Enchanted Cloak (R)": "秘法披风（精）",
		"Red Culinary Hat": "红色厨师帽",
		"Snail Shell Helmet": "蜗牛壳头盔",
		"Vision Helmet": "视觉头盔",
		"Fluffy Red Hat": "蓬松红帽子",
		"Corsair Helmet": "掠夺者头盔",
		"Corsair Helmet (R)": "掠夺者头盔（精）",
		"Acrobatic Hood": "杂技师兜帽",
		"Acrobatic Hood (R)": "杂技师兜帽（精）",
		"Magician's Hat": "魔术师帽",
		"Magician's Hat (R)": "魔术师帽（精）",
		"Cheese Helmet": "奶酪头盔",
		"Verdant Helmet": "翠绿头盔",
		"Azure Helmet": "蔚蓝头盔",
		"Burble Helmet": "深紫头盔",
		"Crimson Helmet": "绛红头盔",
		"Rainbow Helmet": "彩虹头盔",
		"Holy Helmet": "神圣头盔",
		"Rough Hood": "粗糙兜帽",
		"Reptile Hood": "爬行动物兜帽",
		"Gobo Hood": "哥布林兜帽",
		"Beast Hood": "野兽兜帽",
		"Umbral Hood": "暗影兜帽",
		"Cotton Hat": "棉帽",
		"Linen Hat": "亚麻帽",
		"Bamboo Hat": "竹帽",
		"Silk Hat": "丝帽",
		"Radiant Hat": "光辉帽",
		"Dairyhand's Top": "挤奶工上衣",
		"Forager's Top": "采摘者上衣",
		"Lumberjack's Top": "伐木工上衣",
		"Cheesemaker's Top": "奶酪师上衣",
		"Crafter's Top": "工匠上衣",
		"Tailor's Top": "裁缝上衣",
		"Chef's Top": "厨师上衣",
		"Brewer's Top": "饮品师上衣",
		"Alchemist's Top": "炼金师上衣",
		"Enhancer's Top": "强化师上衣",
		"Gator Vest": "鳄鱼马甲",
		"Turtle Shell Body": "龟壳胸甲",
		"Colossus Plate Body": "巨像胸甲",
		"Demonic Plate Body": "恶魔胸甲",
		"Anchorbound Plate Body": "锚定胸甲",
		"Anchorbound Plate Body (R)": "锚定胸甲（精）",
		"Maelstrom Plate Body": "怒涛胸甲",
		"Maelstrom Plate Body (R)": "怒涛胸甲（精）",
		"Marine Tunic": "海洋皮衣",
		"Revenant Tunic": "亡灵皮衣",
		"Griffin Tunic": "狮鹫皮衣",
		"Kraken Tunic": "克拉肯皮衣",
		"Kraken Tunic (R)": "克拉肯皮衣（精）",
		"Icy Robe Top": "冰霜袍服",
		"Flaming Robe Top": "烈焰袍服",
		"Luna Robe Top": "月神袍服",
		"Royal Water Robe Top": "皇家水系袍服",
		"Royal Water Robe Top (R)": "皇家水系袍服（精）",
		"Royal Nature Robe Top": "皇家自然系袍服",
		"Royal Nature Robe Top (R)": "皇家自然系袍服（精）",
		"Royal Fire Robe Top": "皇家火系袍服",
		"Royal Fire Robe Top (R)": "皇家火系袍服（精）",
		"Cheese Plate Body": "奶酪胸甲",
		"Verdant Plate Body": "翠绿胸甲",
		"Azure Plate Body": "蔚蓝胸甲",
		"Burble Plate Body": "深紫胸甲",
		"Crimson Plate Body": "绛红胸甲",
		"Rainbow Plate Body": "彩虹胸甲",
		"Holy Plate Body": "神圣胸甲",
		"Rough Tunic": "粗糙皮衣",
		"Reptile Tunic": "爬行动物皮衣",
		"Gobo Tunic": "哥布林皮衣",
		"Beast Tunic": "野兽皮衣",
		"Umbral Tunic": "暗影皮衣",
		"Cotton Robe Top": "棉袍服",
		"Linen Robe Top": "亚麻袍服",
		"Bamboo Robe Top": "竹袍服",
		"Silk Robe Top": "丝绸袍服",
		"Radiant Robe Top": "光辉袍服",
		"Dairyhand's Bottoms": "挤奶工下装",
		"Forager's Bottoms": "采摘者下装",
		"Lumberjack's Bottoms": "伐木工下装",
		"Cheesemaker's Bottoms": "奶酪师下装",
		"Crafter's Bottoms": "工匠下装",
		"Tailor's Bottoms": "裁缝下装",
		"Chef's Bottoms": "厨师下装",
		"Brewer's Bottoms": "饮品师下装",
		"Alchemist's Bottoms": "炼金师下装",
		"Enhancer's Bottoms": "强化师下装",
		"Turtle Shell Legs": "龟壳腿甲",
		"Colossus Plate Legs": "巨像腿甲",
		"Demonic Plate Legs": "恶魔腿甲",
		"Anchorbound Plate Legs": "锚定腿甲",
		"Anchorbound Plate Legs (R)": "锚定腿甲（精）",
		"Maelstrom Plate Legs": "怒涛腿甲",
		"Maelstrom Plate Legs (R)": "怒涛腿甲（精）",
		"Marine Chaps": "航海皮裤",
		"Revenant Chaps": "亡灵皮裤",
		"Griffin Chaps": "狮鹫皮裤",
		"Kraken Chaps": "克拉肯皮裤",
		"Kraken Chaps (R)": "克拉肯皮裤（精）",
		"Icy Robe Bottoms": "冰霜袍裙",
		"Flaming Robe Bottoms": "烈焰袍裙",
		"Luna Robe Bottoms": "月神袍裙",
		"Royal Water Robe Bottoms": "皇家水系袍裙",
		"Royal Water Robe Bottoms (R)": "皇家水系袍裙（精）",
		"Royal Nature Robe Bottoms": "皇家自然系袍裙",
		"Royal Nature Robe Bottoms (R)": "皇家自然系袍裙（精）",
		"Royal Fire Robe Bottoms": "皇家火系袍裙",
		"Royal Fire Robe Bottoms (R)": "皇家火系袍裙（精）",
		"Cheese Plate Legs": "奶酪腿甲",
		"Verdant Plate Legs": "翠绿腿甲",
		"Azure Plate Legs": "蔚蓝腿甲",
		"Burble Plate Legs": "深紫腿甲",
		"Crimson Plate Legs": "绛红腿甲",
		"Rainbow Plate Legs": "彩虹腿甲",
		"Holy Plate Legs": "神圣腿甲",
		"Rough Chaps": "粗糙皮裤",
		"Reptile Chaps": "爬行动物皮裤",
		"Gobo Chaps": "哥布林皮裤",
		"Beast Chaps": "野兽皮裤",
		"Umbral Chaps": "暗影皮裤",
		"Cotton Robe Bottoms": "棉袍裙",
		"Linen Robe Bottoms": "亚麻袍裙",
		"Bamboo Robe Bottoms": "竹袍裙",
		"Silk Robe Bottoms": "丝绸袍裙",
		"Radiant Robe Bottoms": "光辉袍裙",
		"Enchanted Gloves": "附魔手套",
		"Pincer Gloves": "蟹钳手套",
		"Panda Gloves": "熊猫手套",
		"Magnetic Gloves": "磁力手套",
		"Dodocamel Gauntlets": "渡渡驼护手",
		"Dodocamel Gauntlets (R)": "渡渡驼护手（精）",
		"Sighted Bracers": "瞄准护腕",
		"Marksman Bracers": "神射护腕",
		"Marksman Bracers (R)": "神射护腕（精）",
		"Chrono Gloves": "时空手套",
		"Cheese Gauntlets": "奶酪护手",
		"Verdant Gauntlets": "翠绿护手",
		"Azure Gauntlets": "蔚蓝护手",
		"Burble Gauntlets": "深紫护手",
		"Crimson Gauntlets": "绛红护手",
		"Rainbow Gauntlets": "彩虹护手",
		"Holy Gauntlets": "神圣护手",
		"Rough Bracers": "粗糙护腕",
		"Reptile Bracers": "爬行动物护腕",
		"Gobo Bracers": "哥布林护腕",
		"Beast Bracers": "野兽护腕",
		"Umbral Bracers": "暗影护腕",
		"Cotton Gloves": "棉手套",
		"Linen Gloves": "亚麻手套",
		"Bamboo Gloves": "竹手套",
		"Silk Gloves": "丝手套",
		"Radiant Gloves": "光辉手套",
		"Collector's Boots": "收藏家靴",
		"Shoebill Shoes": "鲸头鹳鞋",
		"Black Bear Shoes": "黑熊鞋",
		"Grizzly Bear Shoes": "棕熊鞋",
		"Polar Bear Shoes": "北极熊鞋",
		"Pathbreaker Boots": "开路者靴",
		"Pathbreaker Boots (R)": "开路者靴（精）",
		"Centaur Boots": "半人马靴",
		"Pathfinder Boots": "探路者靴",
		"Pathfinder Boots (R)": "探路者靴（精）",
		"Sorcerer Boots": "巫师靴",
		"Pathseeker Boots": "寻路者靴",
		"Pathseeker Boots (R)": "寻路者靴（精）",
		"Cheese Boots": "奶酪靴",
		"Verdant Boots": "翠绿靴",
		"Azure Boots": "蔚蓝靴",
		"Burble Boots": "深紫靴",
		"Crimson Boots": "绛红靴",
		"Rainbow Boots": "彩虹靴",
		"Holy Boots": "神圣靴",
		"Rough Boots": "粗糙靴",
		"Reptile Boots": "爬行动物靴",
		"Gobo Boots": "哥布林靴",
		"Beast Boots": "野兽靴",
		"Umbral Boots": "暗影靴",
		"Cotton Boots": "棉靴",
		"Linen Boots": "亚麻靴",
		"Bamboo Boots": "竹靴",
		"Silk Boots": "丝靴",
		"Radiant Boots": "光辉靴",
		"Small Pouch": "小袋子",
		"Medium Pouch": "中袋子",
		"Large Pouch": "大袋子",
		"Giant Pouch": "巨大袋子",
		"Gluttonous Pouch": "贪食之袋",
		"Guzzling Pouch": "暴饮之囊",
		"Necklace Of Efficiency": "效率项链",
		"Fighter Necklace": "战士项链",
		"Ranger Necklace": "射手项链",
		"Wizard Necklace": "巫师项链",
		"Necklace Of Wisdom": "经验项链",
		"Necklace Of Speed": "速度项链",
		"Philosopher's Necklace": "贤者项链",
		"Earrings Of Gathering": "采集耳环",
		"Earrings Of Essence Find": "精华发现耳环",
		"Earrings Of Armor": "护甲耳环",
		"Earrings Of Regeneration": "恢复耳环",
		"Earrings Of Resistance": "抗性耳环",
		"Earrings Of Rare Find": "稀有发现耳环",
		"Earrings Of Critical Strike": "暴击耳环",
		"Philosopher's Earrings": "贤者耳环",
		"Ring Of Gathering": "采集戒指",
		"Ring Of Essence Find": "精华发现戒指",
		"Ring Of Armor": "护甲戒指",
		"Ring Of Regeneration": "恢复戒指",
		"Ring Of Resistance": "抗性戒指",
		"Ring Of Rare Find": "稀有发现戒指",
		"Ring Of Critical Strike": "暴击戒指",
		"Philosopher's Ring": "贤者戒指",
		"Trainee Milking Charm": "实习挤奶护符",
		"Basic Milking Charm": "基础挤奶护符",
		"Advanced Milking Charm": "高级挤奶护符",
		"Expert Milking Charm": "专家挤奶护符",
		"Master Milking Charm": "大师挤奶护符",
		"Grandmaster Milking Charm": "宗师挤奶护符",
		"Trainee Foraging Charm": "实习采摘护符",
		"Basic Foraging Charm": "基础采摘护符",
		"Advanced Foraging Charm": "高级采摘护符",
		"Expert Foraging Charm": "专家采摘护符",
		"Master Foraging Charm": "大师采摘护符",
		"Grandmaster Foraging Charm": "宗师采摘护符",
		"Trainee Woodcutting Charm": "实习伐木护符",
		"Basic Woodcutting Charm": "基础伐木护符",
		"Advanced Woodcutting Charm": "高级伐木护符",
		"Expert Woodcutting Charm": "专家伐木护符",
		"Master Woodcutting Charm": "大师伐木护符",
		"Grandmaster Woodcutting Charm": "宗师伐木护符",
		"Trainee Cheesesmithing Charm": "实习奶酪锻造护符",
		"Basic Cheesesmithing Charm": "基础奶酪锻造护符",
		"Advanced Cheesesmithing Charm": "高级奶酪锻造护符",
		"Expert Cheesesmithing Charm": "专家奶酪锻造护符",
		"Master Cheesesmithing Charm": "大师奶酪锻造护符",
		"Grandmaster Cheesesmithing Charm": "宗师奶酪锻造护符",
		"Trainee Crafting Charm": "实习制作护符",
		"Basic Crafting Charm": "基础制作护符",
		"Advanced Crafting Charm": "高级制作护符",
		"Expert Crafting Charm": "专家制作护符",
		"Master Crafting Charm": "大师制作护符",
		"Grandmaster Crafting Charm": "宗师制作护符",
		"Trainee Tailoring Charm": "实习缝纫护符",
		"Basic Tailoring Charm": "基础缝纫护符",
		"Advanced Tailoring Charm": "高级缝纫护符",
		"Expert Tailoring Charm": "专家缝纫护符",
		"Master Tailoring Charm": "大师缝纫护符",
		"Grandmaster Tailoring Charm": "宗师缝纫护符",
		"Trainee Cooking Charm": "实习烹饪护符",
		"Basic Cooking Charm": "基础烹饪护符",
		"Advanced Cooking Charm": "高级烹饪护符",
		"Expert Cooking Charm": "专家烹饪护符",
		"Master Cooking Charm": "大师烹饪护符",
		"Grandmaster Cooking Charm": "宗师烹饪护符",
		"Trainee Brewing Charm": "实习冲泡护符",
		"Basic Brewing Charm": "基础冲泡护符",
		"Advanced Brewing Charm": "高级冲泡护符",
		"Expert Brewing Charm": "专家冲泡护符",
		"Master Brewing Charm": "大师冲泡护符",
		"Grandmaster Brewing Charm": "宗师冲泡护符",
		"Trainee Alchemy Charm": "实习炼金护符",
		"Basic Alchemy Charm": "基础炼金护符",
		"Advanced Alchemy Charm": "高级炼金护符",
		"Expert Alchemy Charm": "专家炼金护符",
		"Master Alchemy Charm": "大师炼金护符",
		"Grandmaster Alchemy Charm": "宗师炼金护符",
		"Trainee Enhancing Charm": "实习强化护符",
		"Basic Enhancing Charm": "基础强化护符",
		"Advanced Enhancing Charm": "高级强化护符",
		"Expert Enhancing Charm": "专家强化护符",
		"Master Enhancing Charm": "大师强化护符",
		"Grandmaster Enhancing Charm": "宗师强化护符",
		"Trainee Stamina Charm": "实习耐力护符",
		"Basic Stamina Charm": "基础耐力护符",
		"Advanced Stamina Charm": "高级耐力护符",
		"Expert Stamina Charm": "专家耐力护符",
		"Master Stamina Charm": "大师耐力护符",
		"Grandmaster Stamina Charm": "宗师耐力护符",
		"Trainee Intelligence Charm": "实习智力护符",
		"Basic Intelligence Charm": "基础智力护符",
		"Advanced Intelligence Charm": "高级智力护符",
		"Expert Intelligence Charm": "专家智力护符",
		"Master Intelligence Charm": "大师智力护符",
		"Grandmaster Intelligence Charm": "宗师智力护符",
		"Trainee Attack Charm": "实习攻击护符",
		"Basic Attack Charm": "基础攻击护符",
		"Advanced Attack Charm": "高级攻击护符",
		"Expert Attack Charm": "专家攻击护符",
		"Master Attack Charm": "大师攻击护符",
		"Grandmaster Attack Charm": "宗师攻击护符",
		"Trainee Defense Charm": "实习防御护符",
		"Basic Defense Charm": "基础防御护符",
		"Advanced Defense Charm": "高级防御护符",
		"Expert Defense Charm": "专家防御护符",
		"Master Defense Charm": "大师防御护符",
		"Grandmaster Defense Charm": "宗师防御护符",
		"Trainee Melee Charm": "实习近战护符",
		"Basic Melee Charm": "基础近战护符",
		"Advanced Melee Charm": "高级近战护符",
		"Expert Melee Charm": "专家近战护符",
		"Master Melee Charm": "大师近战护符",
		"Grandmaster Melee Charm": "宗师近战护符",
		"Trainee Ranged Charm": "实习远程护符",
		"Basic Ranged Charm": "基础远程护符",
		"Advanced Ranged Charm": "高级远程护符",
		"Expert Ranged Charm": "专家远程护符",
		"Master Ranged Charm": "大师远程护符",
		"Grandmaster Ranged Charm": "宗师远程护符",
		"Trainee Magic Charm": "实习魔法护符",
		"Basic Magic Charm": "基础魔法护符",
		"Advanced Magic Charm": "高级魔法护符",
		"Expert Magic Charm": "专家魔法护符",
		"Master Magic Charm": "大师魔法护符",
		"Grandmaster Magic Charm": "宗师魔法护符",
		"Basic Task Badge": "基础任务徽章",
		"Advanced Task Badge": "高级任务徽章",
		"Expert Task Badge": "专家任务徽章",
		"Celestial Brush": "星空刷子",
		"Cheese Brush": "奶酪刷子",
		"Verdant Brush": "翠绿刷子",
		"Azure Brush": "蔚蓝刷子",
		"Burble Brush": "深紫刷子",
		"Crimson Brush": "绛红刷子",
		"Rainbow Brush": "彩虹刷子",
		"Holy Brush": "神圣刷子",
		"Celestial Shears": "星空剪刀",
		"Cheese Shears": "奶酪剪刀",
		"Verdant Shears": "翠绿剪刀",
		"Azure Shears": "蔚蓝剪刀",
		"Burble Shears": "深紫剪刀",
		"Crimson Shears": "绛红剪刀",
		"Rainbow Shears": "彩虹剪刀",
		"Holy Shears": "神圣剪刀",
		"Celestial Hatchet": "星空斧头",
		"Cheese Hatchet": "奶酪斧头",
		"Verdant Hatchet": "翠绿斧头",
		"Azure Hatchet": "蔚蓝斧头",
		"Burble Hatchet": "深紫斧头",
		"Crimson Hatchet": "绛红斧头",
		"Rainbow Hatchet": "彩虹斧头",
		"Holy Hatchet": "神圣斧头",
		"Celestial Hammer": "星空锤子",
		"Cheese Hammer": "奶酪锤子",
		"Verdant Hammer": "翠绿锤子",
		"Azure Hammer": "蔚蓝锤子",
		"Burble Hammer": "深紫锤子",
		"Crimson Hammer": "绛红锤子",
		"Rainbow Hammer": "彩虹锤子",
		"Holy Hammer": "神圣锤子",
		"Celestial Chisel": "星空凿子",
		"Cheese Chisel": "奶酪凿子",
		"Verdant Chisel": "翠绿凿子",
		"Azure Chisel": "蔚蓝凿子",
		"Burble Chisel": "深紫凿子",
		"Crimson Chisel": "绛红凿子",
		"Rainbow Chisel": "彩虹凿子",
		"Holy Chisel": "神圣凿子",
		"Celestial Needle": "星空针",
		"Cheese Needle": "奶酪针",
		"Verdant Needle": "翠绿针",
		"Azure Needle": "蔚蓝针",
		"Burble Needle": "深紫针",
		"Crimson Needle": "绛红针",
		"Rainbow Needle": "彩虹针",
		"Holy Needle": "神圣针",
		"Celestial Spatula": "星空锅铲",
		"Cheese Spatula": "奶酪锅铲",
		"Verdant Spatula": "翠绿锅铲",
		"Azure Spatula": "蔚蓝锅铲",
		"Burble Spatula": "深紫锅铲",
		"Crimson Spatula": "绛红锅铲",
		"Rainbow Spatula": "彩虹锅铲",
		"Holy Spatula": "神圣锅铲",
		"Celestial Pot": "星空壶",
		"Cheese Pot": "奶酪壶",
		"Verdant Pot": "翠绿壶",
		"Azure Pot": "蔚蓝壶",
		"Burble Pot": "深紫壶",
		"Crimson Pot": "绛红壶",
		"Rainbow Pot": "彩虹壶",
		"Holy Pot": "神圣壶",
		"Celestial Alembic": "星空蒸馏器",
		"Cheese Alembic": "奶酪蒸馏器",
		"Verdant Alembic": "翠绿蒸馏器",
		"Azure Alembic": "蔚蓝蒸馏器",
		"Burble Alembic": "深紫蒸馏器",
		"Crimson Alembic": "绛红蒸馏器",
		"Rainbow Alembic": "彩虹蒸馏器",
		"Holy Alembic": "神圣蒸馏器",
		"Celestial Enhancer": "星空强化器",
		"Cheese Enhancer": "奶酪强化器",
		"Verdant Enhancer": "翠绿强化器",
		"Azure Enhancer": "蔚蓝强化器",
		"Burble Enhancer": "深紫强化器",
		"Crimson Enhancer": "绛红强化器",
		"Rainbow Enhancer": "彩虹强化器",
		"Holy Enhancer": "神圣强化器",
		Milk: "牛奶",
		"Verdant Milk": "翠绿牛奶",
		"Azure Milk": "蔚蓝牛奶",
		"Burble Milk": "深紫牛奶",
		"Crimson Milk": "绛红牛奶",
		"Rainbow Milk": "彩虹牛奶",
		"Holy Milk": "神圣牛奶",
		Cheese: "奶酪",
		"Verdant Cheese": "翠绿奶酪",
		"Azure Cheese": "蔚蓝奶酪",
		"Burble Cheese": "深紫奶酪",
		"Crimson Cheese": "绛红奶酪",
		"Rainbow Cheese": "彩虹奶酪",
		"Holy Cheese": "神圣奶酪",
		Log: "原木",
		"Birch Log": "白桦原木",
		"Cedar Log": "雪松原木",
		"Purpleheart Log": "紫心原木",
		"Ginkgo Log": "银杏原木",
		"Redwood Log": "红杉原木",
		"Arcane Log": "神秘原木",
		Lumber: "木板",
		"Birch Lumber": "白桦木板",
		"Cedar Lumber": "雪松木板",
		"Purpleheart Lumber": "紫心木板",
		"Ginkgo Lumber": "银杏木板",
		"Redwood Lumber": "红杉木板",
		"Arcane Lumber": "神秘木板",
		"Rough Hide": "粗糙兽皮",
		"Reptile Hide": "爬行动物皮",
		"Gobo Hide": "哥布林皮",
		"Beast Hide": "野兽皮",
		"Umbral Hide": "暗影皮",
		"Rough Leather": "粗糙皮革",
		"Reptile Leather": "爬行动物皮革",
		"Gobo Leather": "哥布林皮革",
		"Beast Leather": "野兽皮革",
		"Umbral Leather": "暗影皮革",
		Cotton: "棉花",
		Flax: "亚麻",
		"Bamboo Branch": "竹子",
		Cocoon: "蚕茧",
		"Radiant Fiber": "光辉纤维",
		"Cotton Fabric": "棉花布料",
		"Linen Fabric": "亚麻布料",
		"Bamboo Fabric": "竹子布料",
		"Silk Fabric": "丝绸",
		"Radiant Fabric": "光辉布料",
		Egg: "鸡蛋",
		Wheat: "小麦",
		Sugar: "糖",
		Blueberry: "蓝莓",
		Blackberry: "黑莓",
		Strawberry: "草莓",
		Mooberry: "哞莓",
		Marsberry: "火星莓",
		Spaceberry: "太空莓",
		Apple: "苹果",
		Orange: "橙子",
		Plum: "李子",
		Peach: "桃子",
		"Dragon Fruit": "火龙果",
		"Star Fruit": "杨桃",
		"Arabica Coffee Bean": "低级咖啡豆",
		"Robusta Coffee Bean": "中级咖啡豆",
		"Liberica Coffee Bean": "高级咖啡豆",
		"Excelsa Coffee Bean": "特级咖啡豆",
		"Fieriosa Coffee Bean": "火山咖啡豆",
		"Spacia Coffee Bean": "太空咖啡豆",
		"Green Tea Leaf": "绿茶叶",
		"Black Tea Leaf": "黑茶叶",
		"Burble Tea Leaf": "紫茶叶",
		"Moolong Tea Leaf": "哞龙茶叶",
		"Red Tea Leaf": "红茶叶",
		"Emp Tea Leaf": "虚空茶叶",
		"Catalyst Of Coinification": "点金催化剂",
		"Catalyst Of Decomposition": "分解催化剂",
		"Catalyst Of Transmutation": "转化催化剂",
		"Prime Catalyst": "至高催化剂",
		"Snake Fang": "蛇牙",
		"Shoebill Feather": "鲸头鹳羽毛",
		"Snail Shell": "蜗牛壳",
		"Crab Pincer": "蟹钳",
		"Turtle Shell": "乌龟壳",
		"Marine Scale": "海洋鳞片",
		"Treant Bark": "树皮",
		"Centaur Hoof": "半人马蹄",
		"Luna Wing": "月神翼",
		"Gobo Rag": "哥布林抹布",
		Goggles: "护目镜",
		"Magnifying Glass": "放大镜",
		"Eye Of The Watcher": "观察者之眼",
		"Icy Cloth": "冰霜织物",
		"Flaming Cloth": "烈焰织物",
		"Sorcerer's Sole": "魔法师鞋底",
		"Chrono Sphere": "时空球",
		"Frost Sphere": "冰霜球",
		"Panda Fluff": "熊猫绒",
		"Black Bear Fluff": "黑熊绒",
		"Grizzly Bear Fluff": "棕熊绒",
		"Polar Bear Fluff": "北极熊绒",
		"Red Panda Fluff": "小熊猫绒",
		Magnet: "磁铁",
		"Stalactite Shard": "钟乳石碎片",
		"Living Granite": "花岗岩",
		"Colossus Core": "巨像核心",
		"Vampire Fang": "吸血鬼之牙",
		"Werewolf Claw": "狼人之爪",
		"Revenant Anima": "亡者之魂",
		"Soul Fragment": "灵魂碎片",
		"Infernal Ember": "地狱余烬",
		"Demonic Core": "恶魔核心",
		"Griffin Leather": "狮鹫之皮",
		"Manticore Sting": "蝎狮之刺",
		"Jackalope Antler": "鹿角兔之角",
		"Dodocamel Plume": "渡渡驼之翎",
		"Griffin Talon": "狮鹫之爪",
		"Chimerical Refinement Shard": "奇幻精炼碎片",
		"Acrobat's Ribbon": "杂技师彩带",
		"Magician's Cloth": "魔术师织物",
		"Chaotic Chain": "混沌锁链",
		"Cursed Ball": "诅咒之球",
		"Sinister Refinement Shard": "阴森精炼碎片",
		"Royal Cloth": "皇家织物",
		"Knight's Ingot": "骑士之锭",
		"Bishop's Scroll": "主教卷轴",
		"Regal Jewel": "君王宝石",
		"Sundering Jewel": "裂空宝石",
		"Enchanted Refinement Shard": "秘法精炼碎片",
		"Marksman Brooch": "神射胸针",
		"Corsair Crest": "掠夺者徽章",
		"Damaged Anchor": "破损船锚",
		"Maelstrom Plating": "怒涛甲片",
		"Kraken Leather": "克拉肯皮革",
		"Kraken Fang": "克拉肯之牙",
		"Pirate Refinement Shard": "海盗精炼碎片",
		"Pathbreaker Lodestone": "开路者磁石",
		"Pathfinder Lodestone": "探路者磁石",
		"Pathseeker Lodestone": "寻路者磁石",
		"Labyrinth Refinement Shard": "迷宫精炼碎片",
		"Butter Of Proficiency": "精通之油",
		"Thread Of Expertise": "专精之线",
		"Branch Of Insight": "洞察之枝",
		"Gluttonous Energy": "贪食能量",
		"Guzzling Energy": "暴饮能量",
		"Milking Essence": "挤奶精华",
		"Foraging Essence": "采摘精华",
		"Woodcutting Essence": "伐木精华",
		"Cheesesmithing Essence": "奶酪锻造精华",
		"Crafting Essence": "制作精华",
		"Tailoring Essence": "缝纫精华",
		"Cooking Essence": "烹饪精华",
		"Brewing Essence": "冲泡精华",
		"Alchemy Essence": "炼金精华",
		"Enhancing Essence": "强化精华",
		"Swamp Essence": "沼泽精华",
		"Aqua Essence": "海洋精华",
		"Jungle Essence": "丛林精华",
		"Gobo Essence": "哥布林精华",
		Eyessence: "眼精华",
		"Sorcerer Essence": "法师精华",
		"Bear Essence": "熊熊精华",
		"Golem Essence": "魔像精华",
		"Twilight Essence": "暮光精华",
		"Abyssal Essence": "地狱精华",
		"Chimerical Essence": "奇幻精华",
		"Sinister Essence": "阴森精华",
		"Enchanted Essence": "秘法精华",
		"Pirate Essence": "海盗精华",
		"Labyrinth Essence": "迷宫精华",
		"Task Crystal": "任务水晶",
		"Star Fragment": "星光碎片",
		Pearl: "珍珠",
		Amber: "琥珀",
		Garnet: "石榴石",
		Jade: "翡翠",
		Amethyst: "紫水晶",
		Moonstone: "月亮石",
		Sunstone: "太阳石",
		"Philosopher's Stone": "贤者之石",
		"Crushed Pearl": "珍珠碎片",
		"Crushed Amber": "琥珀碎片",
		"Crushed Garnet": "石榴石碎片",
		"Crushed Jade": "翡翠碎片",
		"Crushed Amethyst": "紫水晶碎片",
		"Crushed Moonstone": "月亮石碎片",
		"Crushed Sunstone": "太阳石碎片",
		"Crushed Philosopher's Stone": "贤者之石碎片",
		"Shard Of Protection": "保护碎片",
		"Mirror Of Protection": "保护之镜",
		"Philosopher's Mirror": "贤者之镜",
		"Basic Torch": "基础火把",
		"Advanced Torch": "进阶火把",
		"Expert Torch": "专家火把",
		"Basic Shroud": "基础斗篷",
		"Advanced Shroud": "进阶斗篷",
		"Expert Shroud": "专家斗篷",
		"Basic Beacon": "基础探照灯",
		"Advanced Beacon": "进阶探照灯",
		"Expert Beacon": "专家探照灯",
		"Basic Food Crate": "基础食物箱",
		"Advanced Food Crate": "进阶食物箱",
		"Expert Food Crate": "专家食物箱",
		"Basic Tea Crate": "基础茶叶箱",
		"Advanced Tea Crate": "进阶茶叶箱",
		"Expert Tea Crate": "专家茶叶箱",
		"Basic Coffee Crate": "基础咖啡箱",
		"Advanced Coffee Crate": "进阶咖啡箱",
		"Expert Coffee Crate": "专家咖啡箱"
	};
	//#endregion
	//#region src/utils/ability-names-zh.js
	var ability_names_zh_default = {
		"Mystic Aura": "神秘光环",
		"Elemental Affinity": "元素亲和",
		Firestorm: "烈焰风暴",
		"Flame Blast": "烈焰冲击",
		Fireball: "火球术"
	};
	//#endregion
	//#region src/utils/item-name-translator.js
	/**
	* Auto-discovers Chinese item names from the game DOM and builds a
	* Chinese → English mapping cached in IndexedDB. Provides a unified
	* getDisplayName() returning Chinese when available, English otherwise.
	*/
	var STORAGE_KEY$1 = "Toolasha_cnItemNames";
	var CACHE_VERSION = 2;
	var DEBOUNCE_DELAY = 5e3;
	var MUTATION_SELECTORS = [
		"[class*=\"Item_name\"]",
		"[class*=\"Item_itemName\"]",
		"[class*=\"ItemTooltipText_name\"]",
		"[class*=\"Item_craftingItemName\"]",
		"svg[aria-label]",
		"[class*=\"Ability_\"][class*=\"name\"]",
		"[class*=\"AbilitiesPanel_\"]",
		"[class*=\"SkillActionDetail_\"]",
		"[class*=\"CombatPanel_\"]",
		"[class*=\"SimEditor_\"]"
	];
	var ENHANCEMENT_STRIP_REGEX = /\s*\+\d+$/;
	var CJK_REGEX = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/;
	var ItemNameTranslator = class {
		constructor() {
			this.cnNames = {};
			this.isLoaded = false;
			this._saveTimer = null;
			this._dirty = false;
			this._enToHrid = null;
			this._hridToEn = null;
			this._hridToEnSource = null;
			this._observer = null;
			this._observerStarted = false;
		}
		async load() {
			if (this.isLoaded) return;
			try {
				const saved = await src_core_storage_js.default.get(STORAGE_KEY$1, "settings");
				if (saved && typeof saved === "object" && saved._version === CACHE_VERSION && Object.keys(saved).length > 1) this.cnNames = saved;
			} catch {}
			this.isLoaded = true;
			if (Object.keys(this.cnNames).length <= 1) this._importStaticMapping();
		}
		captureFromDOM(element, itemHrid) {
			if (!element || !itemHrid) return;
			const text = (element.textContent || element.getAttribute("aria-label") || "").trim();
			if (!text || !CJK_REGEX.test(text)) return;
			const baseName = text.replace(ENHANCEMENT_STRIP_REGEX, "").trim();
			if (!baseName) return;
			if (this.cnNames[itemHrid] === baseName) return;
			this.cnNames[itemHrid] = baseName;
			this._scheduleSave();
		}
		_importStaticMapping() {
			const initData = src_core_data_manager_js.default.getInitClientData();
			if (!initData?.itemDetailMap) return;
			let count = 0;
			for (const [hrid, item] of Object.entries(initData.itemDetailMap)) {
				const cnName = item_names_zh_default[item.name];
				if (cnName && !this.cnNames[hrid]) {
					this.cnNames[hrid] = cnName;
					count++;
				}
			}
			if (count > 0) this._scheduleSave();
		}
		_scheduleSave() {
			if (!this.isLoaded) return;
			this._dirty = true;
			if (this._saveTimer) return;
			this._saveTimer = setTimeout(async () => {
				this._saveTimer = null;
				if (!this._dirty) return;
				this._dirty = false;
				try {
					const data = {
						...this.cnNames,
						_version: CACHE_VERSION
					};
					await src_core_storage_js.default.set(STORAGE_KEY$1, data, "settings", true);
				} catch (error) {
					console.warn("[ItemNameTranslator] Failed to save names:", error);
				}
			}, DEBOUNCE_DELAY);
		}
		flush() {
			if (this._saveTimer) {
				clearTimeout(this._saveTimer);
				this._saveTimer = null;
			}
			if (this._dirty) {
				this._dirty = false;
				const data = {
					...this.cnNames,
					_version: CACHE_VERSION
				};
				src_core_storage_js.default.set(STORAGE_KEY$1, data, "settings", true).catch(() => {});
			}
		}
		_scanDomNow() {
			for (const selector of MUTATION_SELECTORS) for (const el of document.querySelectorAll(selector)) this._tryCaptureFromElement(el);
		}
		getDisplayName(itemHrid) {
			if (!itemHrid) return "";
			if (!this.isLoaded) this._lazyLoad();
			const cached = this.cnNames[itemHrid];
			if (cached) return cached;
			const enName = src_core_data_manager_js.default.getItemDetails(itemHrid)?.name;
			if (enName) {
				const staticCn = item_names_zh_default[enName];
				if (staticCn) {
					this.cnNames[itemHrid] = staticCn;
					return staticCn;
				}
				return enName;
			}
			const ability = this._getAbilityDetails(itemHrid);
			if (ability?.name) {
				const staticCn = item_names_zh_default[ability.name] || ability_names_zh_default[ability.name];
				if (staticCn) {
					this.cnNames[itemHrid] = staticCn;
					return staticCn;
				}
				return ability.name;
			}
			return itemHrid;
		}
		_getAbilityDetails(abilityHrid) {
			if (!abilityHrid || !abilityHrid.startsWith("/abilities/")) return null;
			try {
				return src_core_data_manager_js.default.getInitClientData()?.abilityDetailMap?.[abilityHrid] || null;
			} catch (e) {
				return null;
			}
		}
		_lazyLoad() {
			this.load().catch(() => {});
		}
		getHridFromChineseName(chineseName) {
			if (!chineseName) return null;
			const baseName = chineseName.replace(ENHANCEMENT_STRIP_REGEX, "").trim();
			for (const [hrid, cnName] of Object.entries(this.cnNames)) if (cnName === baseName) return hrid;
			return null;
		}
		startObserver() {
			if (this._observerStarted) return;
			this._observerStarted = true;
			console.log("[ItemNameTranslator] Observer starting, selectors:", MUTATION_SELECTORS);
			const processNode = (node) => {
				if (!node || node.nodeType !== 1) return;
				for (const selector of MUTATION_SELECTORS) if (node.matches(selector)) {
					this._tryCaptureFromElement(node);
					break;
				}
				for (const selector of MUTATION_SELECTORS) {
					const children = node.querySelectorAll(selector);
					for (const child of children) this._tryCaptureFromElement(child);
				}
			};
			for (const selector of MUTATION_SELECTORS) {
				const elements = document.querySelectorAll(selector);
				for (const el of elements) this._tryCaptureFromElement(el);
			}
			this._observer = new MutationObserver((mutations) => {
				for (const mutation of mutations) for (const node of mutation.addedNodes) try {
					processNode(node);
				} catch {}
			});
			this._observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		}
		stopObserver() {
			if (this._observer) {
				this._observer.disconnect();
				this._observer = null;
			}
			this._observerStarted = false;
		}
		_tryCaptureFromElement(el) {
			if (!el) return;
			const text = (el.textContent || el.getAttribute("aria-label") || "").trim();
			if (!text) return;
			if (!CJK_REGEX.test(text)) return;
			const baseName = text.replace(ENHANCEMENT_STRIP_REGEX, "").trim();
			if (!baseName) return;
			for (const [, cnName] of Object.entries(this.cnNames)) if (cnName === baseName) return;
			const hrid = this.findHridFromDomName(baseName);
			if (hrid) {
				this.cnNames[hrid] = baseName;
				this._scheduleSave();
			} else {
				if (!this._failCount) this._failCount = 0;
				if (this._failCount < 5) {
					console.log("[ItemNameTranslator] CJK text found but no HRID match:", baseName);
					this._failCount++;
				}
			}
		}
	};
	var itemNameTranslator = new ItemNameTranslator();
	//#endregion
	//#region src/utils/equipment-parser.js
	/**
	* Equipment Parser Utility
	* Parses equipment bonuses for action calculations
	*
	* PART OF EFFICIENCY SYSTEM (Phase 1 of 3):
	* - Phase 1 ✅: Equipment speed bonuses (this module) + level advantage
	* - Phase 2 ✅: Community buffs + house rooms (WebSocket integration)
	* - Phase 3 ✅: Consumable buffs (tea parser integration)
	*
	* Speed bonuses are MULTIPLICATIVE with time (reduce duration).
	* Efficiency bonuses are ADDITIVE with each other, then MULTIPLICATIVE with time.
	*
	* Formula: actionTime = baseTime / (1 + totalEfficiency + totalSpeed)
	*/
	var equipment_parser_exports = /* @__PURE__ */ __exportAll({
		debugEquipmentSpeedBonuses: () => debugEquipmentSpeedBonuses,
		parseEquipmentEfficiencyBonuses: () => parseEquipmentEfficiencyBonuses,
		parseEquipmentEfficiencyBreakdown: () => parseEquipmentEfficiencyBreakdown,
		parseEquipmentSpeedBonuses: () => parseEquipmentSpeedBonuses,
		parseEssenceFindBonus: () => parseEssenceFindBonus,
		parseGatheringQuantityBonus: () => parseGatheringQuantityBonus,
		parseRareFindBonus: () => parseRareFindBonus,
		parseRareFindBreakdown: () => parseRareFindBreakdown
	});
	/**
	* Map action type HRID to equipment field name
	* @param {string} actionTypeHrid - Action type HRID (e.g., "/action_types/cheesesmithing")
	* @param {string} suffix - Field suffix (e.g., "Speed", "Efficiency", "RareFind")
	* @param {Array<string>} validFields - Array of valid field names
	* @returns {string|null} Field name (e.g., "cheesesmithingSpeed") or null
	*/
	function getFieldForActionType(actionTypeHrid, suffix, validFields) {
		if (!actionTypeHrid) return null;
		const fieldName = actionTypeHrid.replace("/action_types/", "") + suffix;
		return validFields.includes(fieldName) ? fieldName : null;
	}
	/**
	* Enhancement percentage table (based on game mechanics)
	* Each enhancement level provides a percentage boost to base stats
	*/
	var ENHANCEMENT_PERCENTAGES = {
		0: 0,
		1: .02,
		2: .042,
		3: .066,
		4: .092,
		5: .12,
		6: .15,
		7: .182,
		8: .216,
		9: .252,
		10: .29,
		11: .334,
		12: .384,
		13: .44,
		14: .502,
		15: .57,
		16: .644,
		17: .724,
		18: .81,
		19: .902,
		20: 1
	};
	/**
	* Slot multipliers for enhancement bonuses
	* Accessories get 5× bonus, weapons/armor get 1× bonus
	* Keys use item_locations (not equipment_types) to match characterEquipment map keys
	*/
	var SLOT_MULTIPLIERS = {
		"/item_locations/neck": 5,
		"/item_locations/ring": 5,
		"/item_locations/earrings": 5,
		"/item_locations/back": 5,
		"/item_locations/trinket": 5,
		"/item_locations/charm": 5,
		"/item_locations/main_hand": 1,
		"/item_locations/two_hand": 1,
		"/item_locations/off_hand": 1,
		"/item_locations/head": 1,
		"/item_locations/body": 1,
		"/item_locations/legs": 1,
		"/item_locations/hands": 1,
		"/item_locations/feet": 1,
		"/item_locations/pouch": 1
	};
	/**
	* Calculate enhancement scaling for equipment stats
	* Uses percentage-based enhancement system with slot multipliers
	*
	* Formula: base × (1 + enhancementPercentage × slotMultiplier)
	*
	* @param {number} baseValue - Base stat value from item data
	* @param {number} enhancementLevel - Enhancement level (0-20)
	* @param {string} slotHrid - Equipment slot HRID (e.g., "/equipment_types/neck")
	* @returns {number} Scaled stat value
	*
	* @example
	* // Philosopher's Necklace +4 (4% base speed, neck slot 5×)
	* calculateEnhancementScaling(0.04, 4, '/equipment_types/neck')
	* // = 0.04 × (1 + 0.092 × 5) = 0.04 × 1.46 = 0.0584 (5.84%)
	*
	* // Lumberjack's Top +10 (10% base efficiency, body slot 1×)
	* calculateEnhancementScaling(0.10, 10, '/equipment_types/body')
	* // = 0.10 × (1 + 0.290 × 1) = 0.10 × 1.29 = 0.129 (12.9%)
	*/
	function calculateEnhancementScaling(baseValue, enhancementLevel, slotHrid) {
		if (enhancementLevel === 0) return baseValue;
		return baseValue * (1 + (ENHANCEMENT_PERCENTAGES[enhancementLevel] || 0) * (SLOT_MULTIPLIERS[slotHrid] || 1));
	}
	/**
	* Generic equipment stat parser - handles all noncombat stats with consistent logic
	* @param {Map} characterEquipment - Equipment map from dataManager.getEquipment()
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {Object} config - Parser configuration
	* @param {string|null} config.skillSpecificField - Skill-specific field (e.g., "brewingSpeed")
	* @param {string|null} config.genericField - Generic skilling field (e.g., "skillingSpeed")
	* @param {boolean} config.returnAsPercentage - Whether to convert to percentage (multiply by 100)
	* @returns {number} Total stat bonus
	*
	* @example
	* // Parse speed bonuses for brewing
	* parseEquipmentStat(equipment, items, {
	*   skillSpecificField: "brewingSpeed",
	*   genericField: "skillingSpeed",
	*   returnAsPercentage: false
	* })
	*/
	function parseEquipmentStat(characterEquipment, itemDetailMap, config) {
		if (!characterEquipment || characterEquipment.size === 0) return 0;
		if (!itemDetailMap) return 0;
		const { skillSpecificField, genericField, returnAsPercentage } = config;
		let totalBonus = 0;
		for (const [slotHrid, equippedItem] of characterEquipment) {
			const itemDetails = itemDetailMap[equippedItem.itemHrid];
			if (!itemDetails || !itemDetails.equipmentDetail) continue;
			const noncombatStats = itemDetails.equipmentDetail.noncombatStats;
			if (!noncombatStats) continue;
			const enhancementLevel = equippedItem.enhancementLevel || 0;
			if (skillSpecificField) {
				const baseValue = noncombatStats[skillSpecificField];
				if (baseValue && baseValue > 0) {
					const scaledValue = calculateEnhancementScaling(baseValue, enhancementLevel, slotHrid);
					totalBonus += scaledValue;
				}
			}
			if (genericField) {
				const baseValue = noncombatStats[genericField];
				if (baseValue && baseValue > 0) {
					const scaledValue = calculateEnhancementScaling(baseValue, enhancementLevel, slotHrid);
					totalBonus += scaledValue;
				}
			}
		}
		return returnAsPercentage ? totalBonus * 100 : totalBonus;
	}
	/**
	* Valid speed fields from game data
	*/
	var VALID_SPEED_FIELDS = [
		"milkingSpeed",
		"foragingSpeed",
		"woodcuttingSpeed",
		"cheesesmithingSpeed",
		"craftingSpeed",
		"tailoringSpeed",
		"brewingSpeed",
		"cookingSpeed",
		"alchemySpeed",
		"enhancingSpeed",
		"taskSpeed"
	];
	/**
	* Parse equipment speed bonuses for a specific action type
	* @param {Map} characterEquipment - Equipment map from dataManager.getEquipment()
	* @param {string} actionTypeHrid - Action type HRID
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @returns {number} Total speed bonus as decimal (e.g., 0.15 for 15%)
	*
	* @example
	* parseEquipmentSpeedBonuses(equipment, "/action_types/brewing", items)
	* // Cheese Pot (base 0.15, bonus 0.003) +0: 0.15 (15%)
	* // Cheese Pot (base 0.15, bonus 0.003) +10: 0.18 (18%)
	* // Azure Pot (base 0.3, bonus 0.006) +10: 0.36 (36%)
	*/
	function parseEquipmentSpeedBonuses(characterEquipment, actionTypeHrid, itemDetailMap) {
		return parseEquipmentStat(characterEquipment, itemDetailMap, {
			skillSpecificField: getFieldForActionType(actionTypeHrid, "Speed", VALID_SPEED_FIELDS),
			genericField: "skillingSpeed",
			returnAsPercentage: false
		});
	}
	/**
	* Valid efficiency fields from game data
	*/
	var VALID_EFFICIENCY_FIELDS = [
		"milkingEfficiency",
		"foragingEfficiency",
		"woodcuttingEfficiency",
		"cheesesmithingEfficiency",
		"craftingEfficiency",
		"tailoringEfficiency",
		"brewingEfficiency",
		"cookingEfficiency",
		"alchemyEfficiency"
	];
	/**
	* Parse equipment efficiency bonuses for a specific action type
	* @param {Map} characterEquipment - Equipment map from dataManager.getEquipment()
	* @param {string} actionTypeHrid - Action type HRID
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @returns {number} Total efficiency bonus as percentage (e.g., 12 for 12%)
	*
	* @example
	* parseEquipmentEfficiencyBonuses(equipment, "/action_types/brewing", items)
	* // Brewer's Top (base 0.1, bonus 0.002) +0: 10%
	* // Brewer's Top (base 0.1, bonus 0.002) +10: 12%
	* // Philosopher's Necklace (skillingEfficiency 0.02, bonus 0.002) +10: 4%
	* // Total: 16%
	*/
	function parseEquipmentEfficiencyBonuses(characterEquipment, actionTypeHrid, itemDetailMap) {
		return parseEquipmentStat(characterEquipment, itemDetailMap, {
			skillSpecificField: getFieldForActionType(actionTypeHrid, "Efficiency", VALID_EFFICIENCY_FIELDS),
			genericField: "skillingEfficiency",
			returnAsPercentage: true
		});
	}
	/**
	* Parse Essence Find bonus from equipment
	* @param {Map} characterEquipment - Equipment map from dataManager.getEquipment()
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @returns {number} Total essence find bonus as percentage (e.g., 15 for 15%)
	*
	* @example
	* parseEssenceFindBonus(equipment, items)
	* // Ring of Essence Find (base 0.15, bonus 0.015) +0: 15%
	* // Ring of Essence Find (base 0.15, bonus 0.015) +10: 30%
	*/
	function parseEssenceFindBonus(characterEquipment, itemDetailMap) {
		return parseEquipmentStat(characterEquipment, itemDetailMap, {
			skillSpecificField: null,
			genericField: "skillingEssenceFind",
			returnAsPercentage: true
		});
	}
	/**
	* Get total gathering quantity bonus from equipment.
	* @param {Map} characterEquipment - Equipment map
	* @param {Object} itemDetailMap - Item details
	* @returns {number} Total gathering quantity bonus (decimal, e.g. 0.02)
	*/
	function parseGatheringQuantityBonus(characterEquipment, itemDetailMap) {
		return parseEquipmentStat(characterEquipment, itemDetailMap, {
			skillSpecificField: null,
			genericField: "gatheringQuantity",
			returnAsPercentage: false
		});
	}
	/**
	* Valid rare find fields from game data
	*/
	var VALID_RARE_FIND_FIELDS = [
		"milkingRareFind",
		"foragingRareFind",
		"woodcuttingRareFind",
		"cheesesmithingRareFind",
		"craftingRareFind",
		"tailoringRareFind",
		"brewingRareFind",
		"cookingRareFind",
		"alchemyRareFind",
		"enhancingRareFind"
	];
	/**
	* Parse Rare Find bonus from equipment
	* @param {Map} characterEquipment - Equipment map from dataManager.getEquipment()
	* @param {string} actionTypeHrid - Action type HRID (for skill-specific rare find)
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @returns {number} Total rare find bonus as percentage (e.g., 15 for 15%)
	*
	* @example
	* parseRareFindBonus(equipment, "/action_types/brewing", items)
	* // Brewer's Top (base 0.15, bonus 0.003) +0: 15%
	* // Brewer's Top (base 0.15, bonus 0.003) +10: 18%
	* // Earrings of Rare Find (base 0.08, bonus 0.002) +0: 8%
	* // Total: 26%
	*/
	function parseRareFindBonus(characterEquipment, actionTypeHrid, itemDetailMap) {
		return parseEquipmentStat(characterEquipment, itemDetailMap, {
			skillSpecificField: getFieldForActionType(actionTypeHrid, "RareFind", VALID_RARE_FIND_FIELDS),
			genericField: "skillingRareFind",
			returnAsPercentage: true
		});
	}
	/**
	* Generic per-item equipment stat breakdown
	* @param {Map} characterEquipment - Equipment map
	* @param {Object} itemDetailMap - Item details
	* @param {string|null} skillSpecificField - e.g. "foragingEfficiency"
	* @param {string|null} genericField - e.g. "skillingEfficiency"
	* @param {boolean} returnAsPercentage - Multiply by 100
	* @returns {Array<{name, enhancementLevel, value}>}
	*/
	function parseEquipmentStatBreakdown(characterEquipment, itemDetailMap, skillSpecificField, genericField, returnAsPercentage) {
		if (!characterEquipment || characterEquipment.size === 0) return [];
		if (!itemDetailMap) return [];
		const items = [];
		for (const [slotHrid, equippedItem] of characterEquipment) {
			const itemDetails = itemDetailMap[equippedItem.itemHrid];
			if (!itemDetails?.equipmentDetail?.noncombatStats) continue;
			const noncombatStats = itemDetails.equipmentDetail.noncombatStats;
			const enhancementLevel = equippedItem.enhancementLevel || 0;
			let value = 0;
			if (skillSpecificField) {
				const base = noncombatStats[skillSpecificField];
				if (base > 0) value += calculateEnhancementScaling(base, enhancementLevel, slotHrid);
			}
			if (genericField) {
				const base = noncombatStats[genericField];
				if (base > 0) value += calculateEnhancementScaling(base, enhancementLevel, slotHrid);
			}
			if (value > 0) items.push({
				name: itemDetails.name,
				enhancementLevel,
				value: returnAsPercentage ? value * 100 : value
			});
		}
		return items;
	}
	/**
	* Get per-item efficiency bonus breakdown for an action type
	* @param {Map} characterEquipment - Equipment map
	* @param {string} actionTypeHrid - Action type HRID
	* @param {Object} itemDetailMap - Item details
	* @returns {Array<{name, enhancementLevel, value}>}
	*/
	function parseEquipmentEfficiencyBreakdown(characterEquipment, actionTypeHrid, itemDetailMap) {
		return parseEquipmentStatBreakdown(characterEquipment, itemDetailMap, getFieldForActionType(actionTypeHrid, "Efficiency", VALID_EFFICIENCY_FIELDS), "skillingEfficiency", true);
	}
	/**
	* Get per-item rare find bonus breakdown for an action type
	* @param {Map} characterEquipment - Equipment map
	* @param {string} actionTypeHrid - Action type HRID
	* @param {Object} itemDetailMap - Item details
	* @returns {Array<{name, enhancementLevel, value}>}
	*/
	function parseRareFindBreakdown(characterEquipment, actionTypeHrid, itemDetailMap) {
		return parseEquipmentStatBreakdown(characterEquipment, itemDetailMap, getFieldForActionType(actionTypeHrid, "RareFind", VALID_RARE_FIND_FIELDS), "skillingRareFind", true);
	}
	/**
	* Get all speed bonuses for debugging
	* @param {Map} characterEquipment - Equipment map
	* @param {Object} itemDetailMap - Item details
	* @returns {Array} Array of speed bonus objects
	*/
	function debugEquipmentSpeedBonuses(characterEquipment, itemDetailMap) {
		if (!characterEquipment || characterEquipment.size === 0) return [];
		const bonuses = [];
		for (const [slotHrid, equippedItem] of characterEquipment) {
			const itemDetails = itemDetailMap[equippedItem.itemHrid];
			if (!itemDetails || !itemDetails.equipmentDetail) continue;
			const noncombatStats = itemDetails.equipmentDetail.noncombatStats;
			if (!noncombatStats) continue;
			for (const [statName, value] of Object.entries(noncombatStats)) if (statName.endsWith("Speed") && value > 0) {
				const enhancementLevel = equippedItem.enhancementLevel || 0;
				const scaledValue = calculateEnhancementScaling(value, enhancementLevel, slotHrid);
				bonuses.push({
					itemName: itemNameTranslator.getDisplayName(equippedItem.itemHrid),
					itemHrid: equippedItem.itemHrid,
					slot: slotHrid,
					speedType: statName,
					baseBonus: value,
					enhancementLevel,
					scaledBonus: scaledValue
				});
			}
		}
		return bonuses;
	}
	//#endregion
	//#region src/utils/enhancement-multipliers.js
	var enhancement_multipliers_exports = /* @__PURE__ */ __exportAll({
		ENHANCEMENT_BONUSES: () => ENHANCEMENT_BONUSES,
		ENHANCEMENT_MULTIPLIERS: () => ENHANCEMENT_MULTIPLIERS,
		getEnhancementMultiplier: () => getEnhancementMultiplier
	});
	/**
	* Enhancement Multiplier System
	*
	* Handles enhancement bonus calculations for equipment.
	* Different equipment slots have different multipliers:
	* - Accessories (neck/ring/earring), Back, Trinket, Charm: 5× multiplier
	* - All other slots (weapons, armor, pouch): 1× multiplier
	*/
	/**
	* Enhancement multiplier by equipment slot type
	*/
	var ENHANCEMENT_MULTIPLIERS = {
		"/equipment_types/neck": 5,
		"/equipment_types/ring": 5,
		"/equipment_types/earring": 5,
		"/equipment_types/back": 5,
		"/equipment_types/trinket": 5,
		"/equipment_types/charm": 5
	};
	/**
	* Enhancement bonus table
	* Maps enhancement level to percentage bonus
	*/
	var ENHANCEMENT_BONUSES = {
		1: .02,
		2: .042,
		3: .066,
		4: .092,
		5: .12,
		6: .15,
		7: .182,
		8: .216,
		9: .252,
		10: .29,
		11: .334,
		12: .384,
		13: .44,
		14: .502,
		15: .57,
		16: .644,
		17: .724,
		18: .81,
		19: .902,
		20: 1
	};
	/**
	* Get enhancement multiplier for an item
	* @param {Object} itemDetails - Item details from itemDetailMap
	* @param {number} enhancementLevel - Current enhancement level of item
	* @returns {number} Multiplier to apply to bonuses
	*/
	function getEnhancementMultiplier(itemDetails, enhancementLevel) {
		if (enhancementLevel === 0) return 1;
		const slotMultiplier = ENHANCEMENT_MULTIPLIERS[itemDetails?.equipmentDetail?.type] || 1;
		return 1 + (ENHANCEMENT_BONUSES[enhancementLevel] || 0) * slotMultiplier;
	}
	//#endregion
	//#region src/utils/tea-parser.js
	/**
	* Tea Buff Parser Utility
	* Calculates efficiency bonuses from active tea buffs
	*
	* Tea efficiency comes from two buff types:
	* 1. /buff_types/efficiency - Generic efficiency (e.g., Efficiency Tea: 10%)
	* 2. /buff_types/{skill}_level - Skill level bonuses (e.g., Brewing Tea: +3 levels)
	*
	* All tea effects scale with Drink Concentration equipment stat.
	*/
	var tea_parser_exports = /* @__PURE__ */ __exportAll({
		default: () => tea_parser_default,
		getDrinkConcentration: () => getDrinkConcentration,
		parseActionLevelBonus: () => parseActionLevelBonus,
		parseActionLevelBonusBreakdown: () => parseActionLevelBonusBreakdown,
		parseArtisanBonus: () => parseArtisanBonus,
		parseGatheringBonus: () => parseGatheringBonus,
		parseGourmetBonus: () => parseGourmetBonus,
		parseProcessingBonus: () => parseProcessingBonus,
		parseTeaEfficiency: () => parseTeaEfficiency,
		parseTeaEfficiencyBreakdown: () => parseTeaEfficiencyBreakdown,
		parseTeaSkillLevelBonus: () => parseTeaSkillLevelBonus
	});
	/**
	* Generic tea buff parser - handles all tea buff types with consistent logic
	* @param {Array} activeDrinks - Array of active drink items from actionTypeDrinkSlotsMap
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {number} drinkConcentration - Drink Concentration stat (as decimal, e.g., 0.12 for 12%)
	* @param {Object} config - Parser configuration
	* @param {Array<string>} config.buffTypeHrids - Buff type HRIDs to check (e.g., ['/buff_types/artisan'])
	* @returns {number} Total buff bonus
	*
	* @example
	* // Parse artisan bonus
	* parseTeaBuff(drinks, items, 0.12, { buffTypeHrids: ['/buff_types/artisan'] })
	*/
	function parseTeaBuff(activeDrinks, itemDetailMap, drinkConcentration, config) {
		if (!activeDrinks || activeDrinks.length === 0) return 0;
		if (!itemDetailMap) return 0;
		const { buffTypeHrids } = config;
		let totalBonus = 0;
		for (const drink of activeDrinks) {
			if (!drink || !drink.itemHrid) continue;
			const itemDetails = itemDetailMap[drink.itemHrid];
			if (!itemDetails || !itemDetails.consumableDetail || !itemDetails.consumableDetail.buffs) continue;
			for (const buff of itemDetails.consumableDetail.buffs) if (buffTypeHrids.includes(buff.typeHrid)) {
				const scaledValue = buff.flatBoost * (1 + drinkConcentration);
				totalBonus += scaledValue;
			}
		}
		return totalBonus;
	}
	/**
	* Parse tea efficiency bonuses for a specific action type
	* @param {string} actionTypeHrid - Action type HRID (e.g., "/action_types/brewing")
	* @param {Array} activeDrinks - Array of active drink items from actionTypeDrinkSlotsMap
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {number} drinkConcentration - Drink Concentration stat (as decimal, e.g., 0.12 for 12%)
	* @returns {number} Total tea efficiency bonus as percentage (e.g., 12 for 12%)
	*
	* @example
	* // With Efficiency Tea (10% base) and 12% Drink Concentration:
	* parseTeaEfficiency("/action_types/brewing", activeDrinks, items, 0.12)
	* // Returns: 11.2 (10% × 1.12 = 11.2%)
	*/
	function parseTeaEfficiency(actionTypeHrid, activeDrinks, itemDetailMap, drinkConcentration = 0) {
		if (!activeDrinks || activeDrinks.length === 0) return 0;
		if (!actionTypeHrid || !itemDetailMap) return 0;
		let totalEfficiency = 0;
		for (const drink of activeDrinks) {
			if (!drink || !drink.itemHrid) continue;
			const itemDetails = itemDetailMap[drink.itemHrid];
			if (!itemDetails || !itemDetails.consumableDetail || !itemDetails.consumableDetail.buffs) continue;
			for (const buff of itemDetails.consumableDetail.buffs) if (buff.typeHrid === "/buff_types/efficiency") {
				const scaledEfficiency = buff.flatBoost * 100 * (1 + drinkConcentration);
				totalEfficiency += scaledEfficiency;
			}
		}
		return totalEfficiency;
	}
	/**
	* Parse tea efficiency bonuses with breakdown by individual tea
	* @param {string} actionTypeHrid - Action type HRID (e.g., "/action_types/brewing")
	* @param {Array} activeDrinks - Array of active drink items from actionTypeDrinkSlotsMap
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {number} drinkConcentration - Drink Concentration stat (as decimal, e.g., 0.12 for 12%)
	* @returns {Array<{name: string, efficiency: number, baseEfficiency: number, dcContribution: number}>} Array of tea contributions
	*
	* @example
	* // With Efficiency Tea (10% base) and Ultra Cheesesmithing Tea (6% base) with 12% DC:
	* parseTeaEfficiencyBreakdown("/action_types/cheesesmithing", activeDrinks, items, 0.12)
	* // Returns: [
	* //   { name: "Efficiency Tea", efficiency: 11.2, baseEfficiency: 10.0, dcContribution: 1.2 },
	* //   { name: "Ultra Cheesesmithing Tea", efficiency: 6.72, baseEfficiency: 6.0, dcContribution: 0.72 }
	* // ]
	*/
	function parseTeaEfficiencyBreakdown(actionTypeHrid, activeDrinks, itemDetailMap, drinkConcentration = 0) {
		if (!activeDrinks || activeDrinks.length === 0) return [];
		if (!actionTypeHrid || !itemDetailMap) return [];
		const teaBreakdown = [];
		for (const drink of activeDrinks) {
			if (!drink || !drink.itemHrid) continue;
			const itemDetails = itemDetailMap[drink.itemHrid];
			if (!itemDetails || !itemDetails.consumableDetail || !itemDetails.consumableDetail.buffs) continue;
			let baseEfficiency = 0;
			let totalEfficiency = 0;
			for (const buff of itemDetails.consumableDetail.buffs) if (buff.typeHrid === "/buff_types/efficiency") {
				const baseValue = buff.flatBoost * 100;
				const scaledValue = baseValue * (1 + drinkConcentration);
				baseEfficiency += baseValue;
				totalEfficiency += scaledValue;
			}
			if (totalEfficiency > 0) teaBreakdown.push({
				name: itemDetails.name,
				efficiency: totalEfficiency,
				baseEfficiency,
				dcContribution: totalEfficiency - baseEfficiency
			});
		}
		return teaBreakdown;
	}
	/**
	* Get Drink Concentration stat from equipped items
	* @param {Map} characterEquipment - Equipment map from dataManager.getEquipment()
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @returns {number} Total drink concentration as decimal (e.g., 0.12 for 12%)
	*
	* @example
	* getDrinkConcentration(equipment, items)
	* // Returns: 0.12 (if wearing items with 12% total drink concentration)
	*/
	function getDrinkConcentration(characterEquipment, itemDetailMap) {
		if (!characterEquipment || characterEquipment.size === 0) return 0;
		if (!itemDetailMap) return 0;
		let totalDrinkConcentration = 0;
		for (const [_slotHrid, equippedItem] of characterEquipment) {
			const itemDetails = itemDetailMap[equippedItem.itemHrid];
			if (!itemDetails || !itemDetails.equipmentDetail) continue;
			const noncombatStats = itemDetails.equipmentDetail.noncombatStats;
			if (!noncombatStats) continue;
			const baseDrinkConcentration = noncombatStats.drinkConcentration;
			if (!baseDrinkConcentration || baseDrinkConcentration <= 0) continue;
			const scaledDrinkConcentration = baseDrinkConcentration * getEnhancementMultiplier(itemDetails, equippedItem.enhancementLevel || 0);
			totalDrinkConcentration += scaledDrinkConcentration;
		}
		return totalDrinkConcentration;
	}
	/**
	* Parse Artisan bonus from active tea buffs
	* @param {Array} activeDrinks - Array of active drink items from actionTypeDrinkSlotsMap
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {number} drinkConcentration - Drink Concentration stat (as decimal, e.g., 0.12 for 12%)
	* @returns {number} Artisan material reduction as decimal (e.g., 0.112 for 11.2% reduction)
	*
	* @example
	* // With Artisan Tea (10% base) and 12% Drink Concentration:
	* parseArtisanBonus(activeDrinks, items, 0.12)
	* // Returns: 0.112 (10% × 1.12 = 11.2% reduction)
	*/
	function parseArtisanBonus(activeDrinks, itemDetailMap, drinkConcentration = 0) {
		return parseTeaBuff(activeDrinks, itemDetailMap, drinkConcentration, { buffTypeHrids: ["/buff_types/artisan"] });
	}
	/**
	* Parse Gourmet bonus from active tea buffs
	* @param {Array} activeDrinks - Array of active drink items from actionTypeDrinkSlotsMap
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {number} drinkConcentration - Drink Concentration stat (as decimal, e.g., 0.12 for 12%)
	* @returns {number} Gourmet bonus chance as decimal (e.g., 0.1344 for 13.44% bonus items)
	*
	* @example
	* // With Gourmet Tea (12% base) and 12% Drink Concentration:
	* parseGourmetBonus(activeDrinks, items, 0.12)
	* // Returns: 0.1344 (12% × 1.12 = 13.44% bonus items)
	*/
	function parseGourmetBonus(activeDrinks, itemDetailMap, drinkConcentration = 0) {
		return parseTeaBuff(activeDrinks, itemDetailMap, drinkConcentration, { buffTypeHrids: ["/buff_types/gourmet"] });
	}
	/**
	* Parse Processing bonus from active tea buffs
	* @param {Array} activeDrinks - Array of active drink items from actionTypeDrinkSlotsMap
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {number} drinkConcentration - Drink Concentration stat (as decimal, e.g., 0.12 for 12%)
	* @returns {number} Processing conversion chance as decimal (e.g., 0.168 for 16.8% conversion chance)
	*
	* @example
	* // With Processing Tea (15% base) and 12% Drink Concentration:
	* parseProcessingBonus(activeDrinks, items, 0.12)
	* // Returns: 0.168 (15% × 1.12 = 16.8% conversion chance)
	*/
	function parseProcessingBonus(activeDrinks, itemDetailMap, drinkConcentration = 0) {
		return parseTeaBuff(activeDrinks, itemDetailMap, drinkConcentration, { buffTypeHrids: ["/buff_types/processing"] });
	}
	/**
	* Parse Action Level bonus from active tea buffs
	* @param {Array} activeDrinks - Array of active drink items from actionTypeDrinkSlotsMap
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {number} drinkConcentration - Drink Concentration stat (as decimal, e.g., 0.12 for 12%)
	* @returns {number} Action Level bonus as flat number (e.g., 5.645 for +5.645 levels, floored to 5 when used)
	*
	* @example
	* // With Artisan Tea (+5 Action Level base) and 12% Drink Concentration:
	* parseActionLevelBonus(activeDrinks, items, 0.129)
	* // Returns: 5.645 (scales with DC, but game floors this to 5 when calculating requirement)
	*/
	function parseActionLevelBonus(activeDrinks, itemDetailMap, drinkConcentration = 0) {
		return parseTeaBuff(activeDrinks, itemDetailMap, drinkConcentration, { buffTypeHrids: ["/buff_types/action_level"] });
	}
	/**
	* Parse Action Level bonus with breakdown by individual tea
	* @param {Array} activeDrinks - Array of active drink items from actionTypeDrinkSlotsMap
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {number} drinkConcentration - Drink Concentration stat (as decimal, e.g., 0.12 for 12%)
	* @returns {Array<{name: string, actionLevel: number, baseActionLevel: number, dcContribution: number}>} Array of tea contributions
	*
	* @example
	* // With Artisan Tea (+5 Action Level base) and 12.9% Drink Concentration:
	* parseActionLevelBonusBreakdown(activeDrinks, items, 0.129)
	* // Returns: [{ name: "Artisan Tea", actionLevel: 5.645, baseActionLevel: 5.0, dcContribution: 0.645 }]
	* // Note: Game floors actionLevel to 5 when calculating requirement, but we show full precision
	*/
	function parseActionLevelBonusBreakdown(activeDrinks, itemDetailMap, drinkConcentration = 0) {
		if (!activeDrinks || activeDrinks.length === 0) return [];
		if (!itemDetailMap) return [];
		const teaBreakdown = [];
		for (const drink of activeDrinks) {
			if (!drink || !drink.itemHrid) continue;
			const itemDetails = itemDetailMap[drink.itemHrid];
			if (!itemDetails || !itemDetails.consumableDetail || !itemDetails.consumableDetail.buffs) continue;
			let baseActionLevel = 0;
			let totalActionLevel = 0;
			for (const buff of itemDetails.consumableDetail.buffs) if (buff.typeHrid === "/buff_types/action_level") {
				const baseValue = buff.flatBoost;
				const scaledValue = baseValue * (1 + drinkConcentration);
				baseActionLevel += baseValue;
				totalActionLevel += scaledValue;
			}
			if (totalActionLevel > 0) teaBreakdown.push({
				name: itemDetails.name,
				actionLevel: totalActionLevel,
				baseActionLevel,
				dcContribution: totalActionLevel - baseActionLevel
			});
		}
		return teaBreakdown;
	}
	/**
	* Parse Gathering bonus from active tea buffs
	* @param {Array} activeDrinks - Array of active drink items from actionTypeDrinkSlotsMap
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {number} drinkConcentration - Drink Concentration stat (as decimal, e.g., 0.12 for 12%)
	* @returns {number} Gathering quantity bonus as decimal (e.g., 0.168 for 16.8% more items)
	*
	* @example
	* // With Gathering Tea (+15% base) and 12% Drink Concentration:
	* parseGatheringBonus(activeDrinks, items, 0.12)
	* // Returns: 0.168 (15% × 1.12 = 16.8% gathering quantity)
	*/
	function parseGatheringBonus(activeDrinks, itemDetailMap, drinkConcentration = 0) {
		return parseTeaBuff(activeDrinks, itemDetailMap, drinkConcentration, { buffTypeHrids: ["/buff_types/gathering"] });
	}
	/**
	* Parse skill level bonus from active tea buffs for a specific action type
	* @param {string} actionTypeHrid - Action type HRID (e.g., "/action_types/cheesesmithing")
	* @param {Array} activeDrinks - Array of active drink items from actionTypeDrinkSlotsMap
	* @param {Object} itemDetailMap - Item details from init_client_data
	* @param {number} drinkConcentration - Drink Concentration stat (as decimal, e.g., 0.129 for 12.9%)
	* @returns {number} Total skill level bonus (e.g., 9.032 for +8 base × 1.129 DC)
	*
	* @example
	* // With Ultra Cheesesmithing Tea (+8 Cheesesmithing base) and 12.9% DC:
	* parseTeaSkillLevelBonus("/action_types/cheesesmithing", activeDrinks, items, 0.129)
	* // Returns: 9.032 (8 × 1.129 = 9.032 levels)
	*/
	function parseTeaSkillLevelBonus(actionTypeHrid, activeDrinks, itemDetailMap, drinkConcentration = 0) {
		if (!activeDrinks || activeDrinks.length === 0) return 0;
		if (!actionTypeHrid || !itemDetailMap) return 0;
		const skillLevelBuffType = `/buff_types/${actionTypeHrid.split("/").pop()}_level`;
		let totalLevelBonus = 0;
		for (const drink of activeDrinks) {
			if (!drink || !drink.itemHrid) continue;
			const itemDetails = itemDetailMap[drink.itemHrid];
			if (!itemDetails || !itemDetails.consumableDetail || !itemDetails.consumableDetail.buffs) continue;
			for (const buff of itemDetails.consumableDetail.buffs) if (buff.typeHrid === skillLevelBuffType) {
				const scaledValue = buff.flatBoost * (1 + drinkConcentration);
				totalLevelBonus += scaledValue;
			}
		}
		return totalLevelBonus;
	}
	var tea_parser_default = {
		parseTeaEfficiency,
		getDrinkConcentration,
		parseArtisanBonus,
		parseGourmetBonus,
		parseProcessingBonus,
		parseActionLevelBonus,
		parseGatheringBonus,
		parseTeaSkillLevelBonus
	};
	//#endregion
	//#region src/utils/game-locale.js
	var CN_MONSTER_NAMES = {
		fly: "苍蝇",
		rat: "杰瑞",
		skunk: "臭鼬",
		porcupine: "豪猪",
		slimy: "史莱姆",
		smelly_planet: "臭臭星球",
		frog: "青蛙",
		snake: "蛇",
		swampy: "沼泽虫",
		alligator: "夏洛克",
		swamp_planet: "沼泽星球",
		sea_snail: "蜗牛",
		crab: "螃蟹",
		aquahorse: "水马",
		nom_nom: "咬咬鱼",
		turtle: "忍者龟",
		aqua_planet: "海洋星球",
		jungle_sprite: "丛林精灵",
		myconid: "蘑菇人",
		treant: "树人",
		centaur_archer: "半人马弓箭手",
		jungle_planet: "丛林星球",
		gobo_stabby: "刺刺",
		gobo_slashy: "砍砍",
		gobo_smashy: "锤锤",
		gobo_shooty: "咻咻",
		gobo_boomy: "轰轰",
		gobo_planet: "哥布林星球",
		eye: "独眼",
		eyes: "叠眼",
		veyes: "复眼",
		planet_of_the_eyes: "眼球星球",
		novice_sorcerer: "新手巫师",
		ice_sorcerer: "冰霜巫师",
		flame_sorcerer: "火焰巫师",
		elementalist: "元素法师",
		sorcerers_tower: "巫师之塔",
		gummy_bear: "软糖熊",
		panda: "熊猫",
		black_bear: "黑熊",
		grizzly_bear: "棕熊",
		polar_bear: "北极熊",
		bear_with_it: "熊熊星球",
		magnetic_golem: "磁力魔像",
		stalactite_golem: "钟乳石魔像",
		granite_golem: "花岗岩魔像",
		golem_cave: "魔像洞穴",
		zombie: "僵尸",
		vampire: "吸血鬼",
		werewolf: "狼人",
		twilight_zone: "暮光之地",
		abyssal_imp: "深渊小鬼",
		soul_hunter: "灵魂猎手",
		infernal_warlock: "地狱术士",
		infernal_abyss: "地狱深渊",
		chimerical_den: "奇幻洞穴",
		sinister_circus: "阴森马戏团",
		enchanted_fortress: "秘法要塞",
		pirate_cove: "海盗基地",
		"Archery Range": "射箭场",
		Armory: "军械库",
		Brewery: "冲泡坊",
		"Dairy Barn": "奶牛棚",
		"Dining Room": "餐厅",
		Dojo: "道场",
		Forge: "锻造间",
		Garden: "花园",
		Gym: "健身房",
		Kitchen: "厨房",
		Laboratory: "实验室",
		Library: "图书馆",
		"Log Shed": "木棚",
		"Mystical Study": "神秘研究室",
		Observatory: "天文台",
		"Sewing Parlor": "缝纫室",
		Workshop: "工作间"
	};
	function getHouseRoomDisplayName(houseRoomHrid) {
		const name = houseRoomHrid.split("/").pop().split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
		return CN_MONSTER_NAMES[name] || name;
	}
	//#endregion
	//#region src/utils/house-efficiency.js
	/**
	* House Efficiency Utility
	* Calculates efficiency bonuses from house rooms
	*
	* PART OF EFFICIENCY SYSTEM (Phase 2):
	* - House rooms provide +1.5% efficiency per level to matching actions
	* - Formula: houseLevel × 1.5%
	* - Data source: WebSocket (characterHouseRoomMap)
	*/
	var house_efficiency_exports = /* @__PURE__ */ __exportAll({
		calculateHouseEfficiency: () => calculateHouseEfficiency,
		calculateHouseRareFind: () => calculateHouseRareFind,
		default: () => house_efficiency_default,
		getHouseRoomName: () => getHouseRoomName
	});
	/**
	* Map action type HRID to house room HRID
	* @param {string} actionTypeHrid - Action type HRID (e.g., "/action_types/brewing")
	* @returns {string|null} House room HRID or null
	*/
	function getHouseRoomForActionType(actionTypeHrid) {
		return {
			"/action_types/brewing": "/house_rooms/brewery",
			"/action_types/cheesesmithing": "/house_rooms/forge",
			"/action_types/cooking": "/house_rooms/kitchen",
			"/action_types/crafting": "/house_rooms/workshop",
			"/action_types/foraging": "/house_rooms/garden",
			"/action_types/milking": "/house_rooms/dairy_barn",
			"/action_types/tailoring": "/house_rooms/sewing_parlor",
			"/action_types/woodcutting": "/house_rooms/log_shed",
			"/action_types/alchemy": "/house_rooms/laboratory"
		}[actionTypeHrid] || null;
	}
	/**
	* Calculate house efficiency bonus for an action type
	* @param {string} actionTypeHrid - Action type HRID
	* @returns {number} Efficiency bonus percentage (e.g., 12 for 12%)
	*
	* @example
	* calculateHouseEfficiency("/action_types/brewing")
	* // Returns: 12 (if brewery is level 8: 8 × 1.5% = 12%)
	*/
	function calculateHouseEfficiency(actionTypeHrid) {
		const houseRoomHrid = getHouseRoomForActionType(actionTypeHrid);
		if (!houseRoomHrid) return 0;
		return src_core_data_manager_js.default.getHouseRoomLevel(houseRoomHrid) * 1.5;
	}
	/**
	* Get friendly name for house room
	* @param {string} houseRoomHrid - House room HRID
	* @returns {string} Friendly name
	*/
	function getHouseRoomName(houseRoomHrid) {
		return getHouseRoomDisplayName(houseRoomHrid);
	}
	/**
	* Calculate total Rare Find bonus from all house rooms
	* @returns {number} Total rare find bonus as percentage (e.g., 1.6 for 1.6%)
	*
	* @example
	* calculateHouseRareFind()
	* // Returns: 1.6 (if total house room levels = 8: 8 × 0.2% per level = 1.6%)
	*
	* Formula from game data:
	* - flatBoostLevelBonus: 0.2% per level
	* - Total: totalLevels × 0.2%
	* - Max: 8 rooms × 8 levels = 64 × 0.2% = 12.8%
	*/
	function calculateHouseRareFind() {
		const houseRooms = src_core_data_manager_js.default.getHouseRooms();
		if (!houseRooms || houseRooms.size === 0) return 0;
		let totalLevels = 0;
		for (const [_hrid, room] of houseRooms) totalLevels += room.level || 0;
		return totalLevels * .2;
	}
	var house_efficiency_default = {
		calculateHouseEfficiency,
		getHouseRoomName,
		calculateHouseRareFind
	};
	//#endregion
	//#region src/utils/profit-constants.js
	var profit_constants_exports = /* @__PURE__ */ __exportAll({
		ALL_SKILL_TYPES: () => ALL_SKILL_TYPES,
		COWBELL_BAG_HRID: () => COWBELL_BAG_HRID,
		COWBELL_BAG_TAX: () => COWBELL_BAG_TAX,
		DRINKS_PER_HOUR_BASE: () => 12,
		GATHERING_TYPES: () => GATHERING_TYPES,
		HOURS_PER_DAY: () => 24,
		MARKET_TAX: () => MARKET_TAX,
		MIN_ACTION_TIME_SECONDS: () => 3,
		PRODUCTION_TYPES: () => PRODUCTION_TYPES,
		SECONDS_PER_HOUR: () => SECONDS_PER_HOUR,
		default: () => profit_constants_default
	});
	/**
	* Profit Calculation Constants
	* Shared constants used across profit calculators
	*/
	/**
	* Marketplace tax rate (2%)
	*/
	var MARKET_TAX = .02;
	/**
	* Bag of 10 Cowbells item HRID (subject to 18% market tax)
	*/
	var COWBELL_BAG_HRID = "/items/bag_of_10_cowbells";
	/**
	* Bag of 10 Cowbells market tax rate (18%)
	*/
	var COWBELL_BAG_TAX = .18;
	/**
	* Seconds per hour (for rate conversions)
	*/
	var SECONDS_PER_HOUR = 3600;
	/**
	* Gathering skill action types
	* Skills that gather raw materials from the world
	*/
	var GATHERING_TYPES = [
		"/action_types/foraging",
		"/action_types/woodcutting",
		"/action_types/milking"
	];
	/**
	* Production skill action types
	* Skills that craft items from materials
	*/
	var PRODUCTION_TYPES = [
		"/action_types/brewing",
		"/action_types/cooking",
		"/action_types/cheesesmithing",
		"/action_types/crafting",
		"/action_types/tailoring"
	];
	/**
	* All non-combat skill action types
	*/
	var ALL_SKILL_TYPES = [...GATHERING_TYPES, ...PRODUCTION_TYPES];
	var profit_constants_default = {
		MARKET_TAX,
		COWBELL_BAG_HRID,
		COWBELL_BAG_TAX,
		DRINKS_PER_HOUR_BASE: 12,
		SECONDS_PER_HOUR,
		MIN_ACTION_TIME_SECONDS: 3,
		HOURS_PER_DAY: 24,
		GATHERING_TYPES,
		PRODUCTION_TYPES,
		ALL_SKILL_TYPES
	};
	//#endregion
	//#region src/utils/efficiency.js
	/**
	* Efficiency Utilities Module
	* Calculations for efficiency stacking and breakdowns
	*/
	var efficiency_exports = /* @__PURE__ */ __exportAll({
		calculateEfficiencyBreakdown: () => calculateEfficiencyBreakdown,
		calculateEfficiencyMultiplier: () => calculateEfficiencyMultiplier,
		default: () => efficiency_default,
		getActionEfficiencyContext: () => getActionEfficiencyContext,
		stackAdditive: () => stackAdditive
	});
	/**
	* Stack additive bonuses (most game bonuses)
	* @param {number[]} bonuses - Array of bonus percentages
	* @returns {number} Total stacked bonus percentage
	*
	* @example
	* stackAdditive([10, 20, 5])
	* // Returns: 35
	* // Because: 10% + 20% + 5% = 35%
	*/
	function stackAdditive(...bonuses) {
		return bonuses.reduce((total, bonus) => total + bonus, 0);
	}
	/**
	* Calculate efficiency multiplier from efficiency percentage
	* Efficiency gives bonus action completions per time-consuming action
	*
	* @param {number} efficiencyPercent - Efficiency as percentage (e.g., 150 for 150%)
	* @returns {number} Multiplier (e.g., 2.5 for 150% efficiency)
	*
	* @example
	* calculateEfficiencyMultiplier(0)   // Returns 1.0 (no bonus)
	* calculateEfficiencyMultiplier(50)  // Returns 1.5
	* calculateEfficiencyMultiplier(150) // Returns 2.5
	*/
	function calculateEfficiencyMultiplier(efficiencyPercent) {
		return 1 + (efficiencyPercent || 0) / 100;
	}
	/**
	* Calculate efficiency breakdown from supplied sources
	* @param {Object} params - Efficiency inputs
	* @param {number} params.requiredLevel - Action required level
	* @param {number} params.skillLevel - Player skill level
	* @param {number} [params.teaSkillLevelBonus=0] - Bonus skill levels from tea
	* @param {number} [params.actionLevelBonus=0] - Action level bonus from tea (affects requirement)
	* @param {number} [params.houseEfficiency=0] - House room efficiency bonus
	* @param {number} [params.equipmentEfficiency=0] - Equipment efficiency bonus
	* @param {number} [params.teaEfficiency=0] - Tea efficiency bonus
	* @param {number} [params.communityEfficiency=0] - Community buff efficiency bonus
	* @param {number} [params.achievementEfficiency=0] - Achievement efficiency bonus
	* @param {number} [params.personalEfficiency=0] - Personal buff (seal) efficiency bonus
	* @returns {Object} Efficiency breakdown
	*/
	function calculateEfficiencyBreakdown({ requiredLevel, skillLevel, teaSkillLevelBonus = 0, actionLevelBonus = 0, houseEfficiency = 0, equipmentEfficiency = 0, teaEfficiency = 0, communityEfficiency = 0, achievementEfficiency = 0, personalEfficiency = 0, guildEfficiency = 0 }) {
		const effectiveRequirement = (requiredLevel || 0) + actionLevelBonus;
		const effectiveLevel = Math.max(skillLevel || 0, requiredLevel || 0) + teaSkillLevelBonus;
		const levelEfficiency = Math.max(0, effectiveLevel - effectiveRequirement);
		return {
			totalEfficiency: stackAdditive(levelEfficiency, houseEfficiency, equipmentEfficiency, teaEfficiency, communityEfficiency, achievementEfficiency, personalEfficiency, guildEfficiency),
			levelEfficiency,
			effectiveRequirement,
			effectiveLevel,
			breakdown: {
				houseEfficiency,
				equipmentEfficiency,
				teaEfficiency,
				communityEfficiency,
				achievementEfficiency,
				personalEfficiency,
				guildEfficiency,
				actionLevelBonus,
				teaSkillLevelBonus
			}
		};
	}
	/**
	* Build the shared efficiency context for a production or gathering action.
	* Consolidates equipment lookup, tea parsing, house bonus, skill level, and
	* efficiency breakdown calculation that would otherwise be duplicated across
	* profit-calculator.js (production) and gathering-profit.js (gathering).
	*
	* @param {Object} actionDetails - Action detail object from dataManager
	* @param {Object} [options={}] - Configuration flags
	* @param {boolean} [options.isProduction=false] - True for production actions.
	*   When true: includes artisanBonus, actionLevelBonus, uses calculateHouseEfficiency.
	*   When false (gathering): uses inline houseRooms loop, includes gatheringQuantity.
	* @param {Object} [options.gameData=null] - Pre-fetched gameData (required for gathering path).
	* @param {number} [options.communityEfficiency=0] - Community buff efficiency (production only).
	*   Caller computes this via their own method (e.g. calculateCommunityBuffBonus) and passes it in.
	* @returns {Object} Efficiency context with all computed values
	*/
	function getActionEfficiencyContext(actionDetails, options = {}) {
		const { isProduction = false, gameData = null, communityEfficiency = 0 } = options;
		const skills = src_core_data_manager_js.default.getSkills();
		const { equipment, drinks: drinkSlots } = resolveActionContext(actionDetails.type);
		const itemDetailMap = gameData?.itemDetailMap ?? src_core_data_manager_js.default.getInitClientData()?.itemDetailMap ?? {};
		const drinkConcentration = getDrinkConcentration(equipment, itemDetailMap);
		const baseTimePerActionSec = actionDetails.baseTimeCost / 1e9;
		const speedBonus = parseEquipmentSpeedBonuses(equipment, actionDetails.type, itemDetailMap);
		const personalSpeedBonus = src_core_data_manager_js.default.getPersonalBuffFlatBoost(actionDetails.type, "/buff_types/action_speed");
		const guildBuffs = src_core_data_manager_js.default.characterData?.guildActionTypeBuffsMap?.[actionDetails.type] || [];
		const guildSpeedBonus = guildBuffs.reduce((sum, b) => b.typeHrid === "/buff_types/action_speed" ? sum + (b.flatBoost || 0) + (b.ratioBoost || 0) : sum, 0);
		const guildEfficiency = guildBuffs.reduce((sum, b) => b.typeHrid === "/buff_types/efficiency" ? sum + ((b.flatBoost || 0) + (b.ratioBoost || 0)) * 100 : sum, 0);
		const actionTime = baseTimePerActionSec / (1 + speedBonus + personalSpeedBonus + guildSpeedBonus);
		const baseRequirement = actionDetails.levelRequirement?.level || 1;
		const skillHrid = actionDetails.levelRequirement?.skillHrid;
		let skillLevel = baseRequirement;
		if (skills) {
			for (const skill of skills) if (skill.skillHrid === skillHrid) {
				skillLevel = skill.level;
				break;
			}
		}
		const teaSkillLevelBonus = parseTeaSkillLevelBonus(actionDetails.type, drinkSlots, itemDetailMap, drinkConcentration);
		const teaEfficiency = parseTeaEfficiency(actionDetails.type, drinkSlots, itemDetailMap, drinkConcentration);
		const processingBonus = GATHERING_TYPES.includes(actionDetails.type) ? parseProcessingBonus(drinkSlots, itemDetailMap, drinkConcentration) + src_core_data_manager_js.default.getPersonalBuffFlatBoost(actionDetails.type, "/buff_types/processing") : 0;
		const gourmetBonus = PRODUCTION_TYPES.includes(actionDetails.type) ? parseGourmetBonus(drinkSlots, itemDetailMap, drinkConcentration) + src_core_data_manager_js.default.getPersonalBuffFlatBoost(actionDetails.type, "/buff_types/gourmet") : 0;
		const equipmentEfficiency = parseEquipmentEfficiencyBonuses(equipment, actionDetails.type, itemDetailMap);
		const equipmentEfficiencyItems = parseEquipmentEfficiencyBreakdown(equipment, actionDetails.type, itemDetailMap);
		const achievementEfficiency = src_core_data_manager_js.default.getAchievementBuffFlatBoost(actionDetails.type, "/buff_types/efficiency") * 100;
		const personalEfficiency = src_core_data_manager_js.default.getPersonalBuffFlatBoost(actionDetails.type, "/buff_types/efficiency") * 100;
		let artisanBonus = 0;
		let actionLevelBonus = 0;
		let houseEfficiency = 0;
		if (isProduction) {
			artisanBonus = parseArtisanBonus(drinkSlots, itemDetailMap, drinkConcentration);
			actionLevelBonus = parseActionLevelBonus(drinkSlots, itemDetailMap, drinkConcentration);
			houseEfficiency = calculateHouseEfficiency(actionDetails.type);
		} else {
			const houseRooms = Array.from(src_core_data_manager_js.default.getHouseRooms().values());
			const initData = gameData ?? src_core_data_manager_js.default.getInitClientData();
			for (const room of houseRooms) if ((initData?.houseRoomDetailMap?.[room.houseRoomHrid])?.usableInActionTypeMap?.[actionDetails.type]) houseEfficiency += (room.level || 0) * 1.5;
		}
		let totalGathering = 0;
		let gatheringDetails = null;
		if (!isProduction && GATHERING_TYPES.includes(actionDetails.type)) {
			const gatheringTea = parseGatheringBonus(drinkSlots, itemDetailMap, drinkConcentration);
			const communityBuffLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/gathering_quantity");
			const communityGathering = communityBuffLevel ? .2 + (communityBuffLevel - 1) * .005 : 0;
			const achievementGathering = src_core_data_manager_js.default.getAchievementBuffFlatBoost(actionDetails.type, "/buff_types/gathering");
			const personalGathering = src_core_data_manager_js.default.getPersonalBuffFlatBoost(actionDetails.type, "/buff_types/gathering");
			totalGathering = gatheringTea + communityGathering + achievementGathering + personalGathering;
			gatheringDetails = {
				gatheringTea,
				communityGathering,
				achievementGathering,
				personalGathering
			};
		}
		const efficiencyBreakdown = calculateEfficiencyBreakdown({
			requiredLevel: baseRequirement,
			skillLevel,
			teaSkillLevelBonus,
			actionLevelBonus,
			houseEfficiency,
			equipmentEfficiency,
			teaEfficiency,
			communityEfficiency,
			achievementEfficiency,
			personalEfficiency,
			guildEfficiency
		});
		const efficiencyMultiplier = calculateEfficiencyMultiplier(efficiencyBreakdown.totalEfficiency);
		return {
			equipment,
			drinkSlots,
			drinkConcentration,
			itemDetailMap,
			actionTime,
			speedBonus,
			personalSpeedBonus,
			guildSpeedBonus,
			baseTimePerActionSec,
			skillLevel,
			baseRequirement,
			teaSkillLevelBonus,
			teaEfficiency,
			processingBonus,
			gourmetBonus,
			equipmentEfficiency,
			equipmentEfficiencyItems,
			achievementEfficiency,
			personalEfficiency,
			guildEfficiency,
			artisanBonus,
			actionLevelBonus,
			houseEfficiency,
			communityEfficiency,
			totalGathering,
			gatheringDetails,
			efficiencyBreakdown,
			efficiencyMultiplier
		};
	}
	var efficiency_default = {
		stackAdditive,
		calculateEfficiencyMultiplier,
		calculateEfficiencyBreakdown,
		getActionEfficiencyContext
	};
	//#endregion
	//#region src/features/settings/custom-price-overrides.js
	/**
	* Custom Price Overrides
	* Manages user-defined buy/sell price overrides for profit calculations.
	* Overrides are stored in IndexedDB and cached in memory.
	*/
	var STORAGE_KEY = "Toolasha_customPriceOverrides";
	/** @type {Object|null} In-memory cache of overrides */
	var overridesCache = null;
	/**
	* Load overrides from storage into cache
	* @returns {Promise<Object>} The overrides object
	*/
	async function loadOverrides() {
		if (overridesCache === null) overridesCache = await src_core_storage_js.default.getJSON(STORAGE_KEY, "settings", {}) || {};
		return overridesCache;
	}
	/**
	* Get all custom price overrides
	* @returns {Object} The overrides object (may be empty if not yet loaded)
	*/
	function getCustomPriceOverrides() {
		if (overridesCache === null) {
			loadOverrides();
			return {};
		}
		return overridesCache;
	}
	/**
	* Get a custom price for a specific item, enhancement level, and transaction side.
	* @param {string} itemHrid - Item HRID
	* @param {number} enhancementLevel - Enhancement level (default 0)
	* @param {string} side - Transaction side ('buy' or 'sell')
	* @returns {number|null} Custom price or null if no override exists
	*/
	function getCustomPrice(itemHrid, enhancementLevel = 0, side = "sell") {
		const override = getCustomPriceOverrides()[`${itemHrid}:${enhancementLevel}`];
		if (!override) return null;
		const price = override[side];
		if (price === void 0 || price === null || price === "") return null;
		return price;
	}
	//#endregion
	//#region src/utils/market-data.js
	/**
	* Market Data Utility
	* Centralized access to market prices with smart pricing mode handling
	*/
	var market_data_exports = /* @__PURE__ */ __exportAll({
		default: () => market_data_default,
		formatPrice: () => formatPrice,
		getItemPrice: () => getItemPrice,
		getItemPrices: () => getItemPrices,
		getItemPricesBatch: () => getItemPricesBatch,
		getPricingMode: () => getPricingMode
	});
	var loggedWarnings = /* @__PURE__ */ new Set();
	/**
	* Get item price based on pricing mode and context
	* @param {string} itemHrid - Item HRID
	* @param {Object} options - Configuration options
	* @param {number} [options.enhancementLevel=0] - Enhancement level
	* @param {string} [options.mode] - Pricing mode ('ask'|'bid'|'average'). If not provided, uses context or user settings
	* @param {string} [options.context] - Context hint ('profit'|'networth'|null). Used to determine pricing mode from settings
	* @param {string} [options.side='sell'] - Transaction side ('buy'|'sell') - used with 'profit' context to determine correct price
	* @returns {number|null} Price in gold, or null if no market data
	*/
	function getItemPrice(itemHrid, options = {}) {
		if (!itemHrid || typeof itemHrid !== "string") return null;
		if (typeof options === "number") options = { enhancementLevel: options };
		if (typeof options !== "object" || options === null) options = {};
		const { enhancementLevel = 0, mode, context, side = "sell" } = options;
		const customPrice = getCustomPrice(itemHrid, enhancementLevel, side);
		if (customPrice !== null) return customPrice;
		const priceData = src_api_marketplace_js.default.getPrice(itemHrid, enhancementLevel);
		if (!priceData) return null;
		const pricingMode = mode || getPricingMode(context, side);
		if (![
			"ask",
			"bid",
			"average"
		].includes(pricingMode)) {
			const warningKey = `mode:${pricingMode}`;
			if (!loggedWarnings.has(warningKey)) {
				console.warn(`[Market Data] Unknown pricing mode: ${pricingMode}, defaulting to ask`);
				loggedWarnings.add(warningKey);
			}
			return priceData.ask || 0;
		}
		const resolvePrice = (value) => {
			if (typeof value !== "number") return null;
			if (value < 0) return null;
			return value;
		};
		switch (pricingMode) {
			case "ask": return resolvePrice(priceData.ask);
			case "bid": return resolvePrice(priceData.bid);
			case "average":
				if (typeof priceData.ask !== "number" || typeof priceData.bid !== "number") return null;
				if (priceData.ask < 0 || priceData.bid < 0) return null;
				return (priceData.ask + priceData.bid) / 2;
			default: return resolvePrice(priceData.ask);
		}
	}
	/**
	* Get all price variants for an item
	* @param {string} itemHrid - Item HRID
	* @param {number} [enhancementLevel=0] - Enhancement level
	* @returns {Object|null} Object with {ask, bid, average} or null if no market data
	*/
	function getItemPrices(itemHrid, enhancementLevel = 0) {
		const priceData = src_api_marketplace_js.default.getPrice(itemHrid, enhancementLevel);
		if (!priceData) return null;
		return {
			ask: priceData.ask,
			bid: priceData.bid,
			average: (priceData.ask + priceData.bid) / 2
		};
	}
	/**
	* Format price with K/M/B suffixes
	* @param {number} amount - Amount to format
	* @param {Object} options - Formatting options
	* @param {number} [options.decimals=1] - Number of decimal places
	* @param {boolean} [options.showZero=true] - Whether to show '0' for zero values
	* @returns {string} Formatted price string
	*/
	function formatPrice(amount, options = {}) {
		const { decimals = 1, showZero = true } = options;
		if (amount === null || amount === void 0) return "--";
		if (amount === 0) return showZero ? "0" : "--";
		const absAmount = Math.abs(amount);
		const sign = amount < 0 ? "-" : "";
		if (absAmount >= 1e9) return `${sign}${(absAmount / 1e9).toFixed(decimals)}B`;
		else if (absAmount >= 1e6) return `${sign}${(absAmount / 1e6).toFixed(decimals)}M`;
		else if (absAmount >= 1e3) return `${sign}${(absAmount / 1e3).toFixed(decimals)}K`;
		else return `${sign}${absAmount.toFixed(decimals)}`;
	}
	/**
	* Determine pricing mode from context and user settings
	* @param {string} [context] - Context hint ('profit'|'networth'|null)
	* @param {string} [side='sell'] - Transaction side ('buy'|'sell') - used with 'profit' context
	* @returns {string} Pricing mode ('ask'|'bid'|'average')
	*/
	function getPricingMode(context, side = "sell") {
		if (!context) return "ask";
		if (typeof context !== "string") return "ask";
		switch (context) {
			case "profit": {
				const profitMode = src_core_config_js.default.getSettingValue("profitCalc_pricingMode");
				let selectedPriceType;
				switch (profitMode) {
					case "conservative":
						selectedPriceType = side === "buy" ? "ask" : "bid";
						break;
					case "hybrid":
						selectedPriceType = "ask";
						break;
					case "optimistic":
						selectedPriceType = side === "buy" ? "bid" : "ask";
						break;
					case "patientBuy":
						selectedPriceType = "bid";
						break;
					default: selectedPriceType = "ask";
				}
				return selectedPriceType;
			}
			case "networth": return src_core_config_js.default.getSettingValue("networth_pricingMode") || "ask";
			default: {
				const warningKey = `context:${context}`;
				if (!loggedWarnings.has(warningKey)) {
					console.warn(`[Market Data] Unknown context: ${context}, defaulting to ask`);
					loggedWarnings.add(warningKey);
				}
				return "ask";
			}
		}
	}
	/**
	* Get prices for multiple items in batch
	* @param {Array<{itemHrid: string, enhancementLevel?: number}>} items - Array of items to price
	* @param {Object} options - Configuration options
	* @param {string} [options.mode] - Pricing mode ('ask'|'bid'|'average')
	* @param {string} [options.context] - Context hint ('profit'|'networth'|null)
	* @param {string} [options.side='sell'] - Transaction side ('buy'|'sell')
	* @returns {Map<string, number>} Map of itemHrid+enhancementLevel to price
	*/
	function getItemPricesBatch(items, options = {}) {
		const result = /* @__PURE__ */ new Map();
		for (const item of items) {
			const key = `${item.itemHrid}:${item.enhancementLevel || 0}`;
			const price = getItemPrice(item.itemHrid, {
				enhancementLevel: item.enhancementLevel || 0,
				mode: options.mode,
				context: options.context,
				side: options.side
			});
			if (price !== null) result.set(key, price);
		}
		return result;
	}
	var market_data_default = {
		getItemPrice,
		getItemPrices,
		formatPrice,
		getPricingMode,
		getItemPricesBatch
	};
	//#endregion
	//#region src/utils/game-lookups.js
	/**
	* Game Data Lookup Utilities
	*
	* Centralized functions for resolving display names to HRIDs.
	* Handles the ★ ↔ (R) refined item display name difference between
	* test server and live server.
	*/
	/**
	* Get the coin cost of an item from the in-game shop.
	* Returns 0 if the item is not available in the shop or not purchasable with coins.
	* @param {string} itemHrid - Item HRID
	* @returns {number} Coin cost, or 0 if not available in shop
	*/
	function getShopCoinCost(itemHrid) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.shopItemDetailMap) return 0;
		for (const shopItem of Object.values(gameData.shopItemDetailMap)) if (shopItem.itemHrid === itemHrid) {
			if (shopItem.costs && shopItem.costs.length > 0) {
				const coinCost = shopItem.costs.find((cost) => cost.itemHrid === "/items/coin");
				if (coinCost) return coinCost.count;
			}
		}
		return 0;
	}
	//#endregion
	//#region src/utils/enhancement-calculator.js
	/**
	* Enhancement Calculator
	*
	* Uses Markov Chain matrix math to calculate exact expected values for enhancement attempts.
	* Based on the original MWI Tools Enhancelate() function.
	*
	* Math.js library is loaded via userscript @require header.
	*/
	var enhancement_calculator_exports = /* @__PURE__ */ __exportAll({
		BASE_SUCCESS_RATES: () => BASE_SUCCESS_RATES,
		calculateEnhancement: () => calculateEnhancement,
		calculatePerActionTime: () => calculatePerActionTime
	});
	/**
	* Base success rates by enhancement level (before bonuses)
	*/
	var BASE_SUCCESS_RATES = [
		50,
		45,
		45,
		40,
		40,
		40,
		35,
		35,
		35,
		35,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30,
		30
	];
	/**
	* Calculate total success rate bonus multiplier
	* @param {Object} params - Enhancement parameters
	* @param {number} params.enhancingLevel - Effective enhancing level (base + tea bonus)
	* @param {number} params.toolBonus - Tool success bonus % (already includes equipment + house bonus)
	* @param {number} params.itemLevel - Item level being enhanced
	* @returns {number} Success rate multiplier (e.g., 1.0519 = 105.19% of base rates)
	*/
	function calculateSuccessMultiplier(params) {
		const { enhancingLevel, toolBonus, itemLevel } = params;
		let totalBonus;
		if (enhancingLevel >= itemLevel) totalBonus = 1 + (toolBonus + .05 * (enhancingLevel - itemLevel)) / 100;
		else totalBonus = 1 - .5 * (1 - enhancingLevel / itemLevel) + toolBonus / 100;
		return totalBonus;
	}
	/**
	* Calculate per-action time for enhancement
	* Simple calculation that doesn't require Markov chain analysis
	* @param {number} enhancingLevel - Effective enhancing level (includes tea bonus)
	* @param {number} itemLevel - Item level being enhanced
	* @param {number} speedBonus - Speed bonus % (for action time calculation)
	* @returns {number} Per-action time in seconds
	*/
	function calculatePerActionTime(enhancingLevel, itemLevel, speedBonus = 0) {
		const baseActionTime = 12;
		let speedMultiplier;
		if (enhancingLevel > itemLevel) speedMultiplier = 1 + (enhancingLevel - itemLevel + speedBonus) / 100;
		else speedMultiplier = 1 + speedBonus / 100;
		return Math.max(3, baseActionTime / speedMultiplier);
	}
	/**
	* Calculate enhancement statistics using Markov Chain matrix inversion
	* @param {Object} params - Enhancement parameters
	* @param {number} params.enhancingLevel - Effective enhancing level (includes tea bonus)
	* @param {number} params.houseLevel - Observatory house room level (used for speed calculation only)
	* @param {number} params.toolBonus - Tool success bonus % (already includes equipment + house success bonus from config)
	* @param {number} params.speedBonus - Speed bonus % (for action time calculation)
	* @param {number} params.itemLevel - Item level being enhanced
	* @param {number} params.targetLevel - Target enhancement level (1-20)
	* @param {number} params.startLevel - Starting enhancement level (0-19, default 0)
	* @param {number} params.protectFrom - Start using protection items at this level (0 = never)
	* @param {boolean} params.blessedTea - Whether Blessed Tea is active (1% double jump)
	* @param {number} params.guzzlingBonus - Drink concentration multiplier (1.0 = no bonus, scales blessed tea)
	* @returns {Object} Enhancement statistics
	*/
	function calculateEnhancement(params) {
		const { enhancingLevel, _houseLevel, toolBonus, speedBonus = 0, itemLevel, targetLevel, startLevel = 0, protectFrom = 0, blessedTea = false, guzzlingBonus = 1 } = params;
		if (targetLevel < 1 || targetLevel > 20) throw new Error("Target level must be between 1 and 20");
		if (protectFrom < 0 || protectFrom > targetLevel) throw new Error("Protection level must be between 0 and target level");
		const successMultiplier = calculateSuccessMultiplier({
			enhancingLevel,
			toolBonus,
			itemLevel
		});
		const markov = math.zeros(20, 20);
		for (let i = 0; i < targetLevel; i++) {
			const successChance = BASE_SUCCESS_RATES[i] / 100 * successMultiplier;
			const failureDestination = protectFrom > 0 && i >= protectFrom ? i - 1 : 0;
			if (blessedTea) {
				const skipChance = successChance * .01 * guzzlingBonus;
				const remainingSuccess = successChance * (1 - .01 * guzzlingBonus);
				markov.set([i, i + 2], skipChance);
				markov.set([i, i + 1], remainingSuccess);
				markov.set([i, failureDestination], 1 - successChance);
			} else {
				markov.set([i, i + 1], successChance);
				markov.set([i, failureDestination], 1 - successChance);
			}
		}
		markov.set([targetLevel, targetLevel], 1);
		const Q = markov.subset(math.index(math.range(0, targetLevel), math.range(0, targetLevel)));
		const I = math.identity(targetLevel);
		const M = math.inv(math.subtract(I, Q));
		let attempts = 0;
		for (let i = startLevel; i < targetLevel; i++) attempts += M.get([startLevel, i]);
		let protects = 0;
		if (protectFrom > 0 && protectFrom < targetLevel) for (let i = protectFrom; i < targetLevel; i++) {
			const timesAtLevel = M.get([startLevel, i]);
			const failureChance = markov.get([i, i - 1]);
			protects += timesAtLevel * failureChance;
		}
		const baseActionTime = 12;
		let speedMultiplier;
		if (enhancingLevel > itemLevel) speedMultiplier = 1 + (enhancingLevel - itemLevel + speedBonus) / 100;
		else speedMultiplier = 1 + speedBonus / 100;
		const perActionTime = Math.max(3, baseActionTime / speedMultiplier);
		const totalTime = perActionTime * attempts;
		return {
			attempts,
			attemptsRounded: Math.round(attempts),
			protectionCount: protects,
			perActionTime,
			totalTime,
			successMultiplier,
			successRates: BASE_SUCCESS_RATES.slice(0, targetLevel).map((base, i) => {
				return {
					level: i + 1,
					baseRate: base,
					actualRate: Math.min(100, base * successMultiplier)
				};
			}),
			visitCounts: Array.from({ length: targetLevel }, (_, i) => M.get([startLevel, i]))
		};
	}
	//#endregion
	//#region src/features/enhancement/tooltip-enhancement.js
	var _costCache = /* @__PURE__ */ new Map();
	var _chainTimeCache = /* @__PURE__ */ new Map();
	src_api_marketplace_js.default.on(() => {
		_costCache.clear();
		_chainTimeCache.clear();
	});
	/**
	* Calculate production cost from crafting recipe
	* Matches original MWI Tools v25.0 getBaseItemProductionCost logic
	* @param {string} itemHrid
	* @param {'ask'|'bid'} [mode='ask'] - Pricing side to use for input materials
	* @private
	*/
	function getProductionCost(itemHrid, mode = "ask") {
		const cacheKey = `${itemHrid}|${mode}`;
		if (_costCache.has(cacheKey)) return _costCache.get(cacheKey);
		const result = _computeProductionCost(itemHrid, mode);
		_costCache.set(cacheKey, result);
		return result;
	}
	function _computeProductionCost(itemHrid, mode = "ask") {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		const itemDetails = gameData.itemDetailMap[itemHrid];
		if (!itemDetails || !itemDetails.name) return 0;
		let actionHrid = null;
		let outputCount = 1;
		for (const [hrid, action] of Object.entries(gameData.actionDetailMap)) if (action.outputItems && action.outputItems.length > 0) {
			const output = action.outputItems[0];
			if (output.itemHrid === itemHrid) {
				actionHrid = hrid;
				outputCount = output.count || 1;
				break;
			}
		}
		if (!actionHrid) return 0;
		const action = gameData.actionDetailMap[actionHrid];
		let totalPrice = 0;
		let artisanBonus = 0;
		try {
			const equipment = src_core_data_manager_js.default.getEquipment();
			const itemDetailMap = gameData.itemDetailMap || {};
			const drinkConcentration = getDrinkConcentration(equipment, itemDetailMap);
			artisanBonus = parseArtisanBonus(src_core_data_manager_js.default.getActionDrinkSlots(action.type), itemDetailMap, drinkConcentration);
		} catch {}
		if (action.inputItems) for (const input of action.inputItems) {
			if (input.itemHrid === "/items/coin") {
				totalPrice += input.count * (1 - artisanBonus);
				continue;
			}
			let inputPrice = getItemPrice(input.itemHrid, { mode }) || 0;
			if (inputPrice === 0) inputPrice = getProductionCost(input.itemHrid, mode);
			totalPrice += inputPrice * input.count * (1 - artisanBonus);
		}
		if (action.upgradeItemHrid) {
			const upgradeMarketPrice = getItemPrice(action.upgradeItemHrid, { mode }) || 0;
			const upgradeCraftPrice = getProductionCost(action.upgradeItemHrid, mode);
			let upgradePrice;
			if (upgradeMarketPrice > 0 && upgradeCraftPrice > 0) upgradePrice = Math.min(upgradeMarketPrice, upgradeCraftPrice);
			else upgradePrice = upgradeMarketPrice || upgradeCraftPrice;
			totalPrice += upgradePrice;
		}
		return totalPrice / outputCount;
	}
	//#endregion
	//#region src/utils/profit-helpers.js
	/**
	* Profit Calculation Helpers
	* Pure functions for profit/rate calculations used across features
	*
	* These functions consolidate duplicated calculations from:
	* - profit-calculator.js
	* - gathering-profit.js
	* - task-profit-calculator.js
	* - action-time-display.js
	* - tooltip-prices.js
	*/
	var profit_helpers_exports = /* @__PURE__ */ __exportAll({
		calculateActionsPerHour: () => calculateActionsPerHour,
		calculateDrinksPerHour: () => calculateDrinksPerHour,
		calculateEffectiveActionsPerHour: () => calculateEffectiveActionsPerHour,
		calculateGatheringActionTotalsFromBase: () => calculateGatheringActionTotalsFromBase,
		calculateHoursForActions: () => calculateHoursForActions,
		calculatePriceAfterTax: () => calculatePriceAfterTax,
		calculateProductionActionTotalsFromBase: () => calculateProductionActionTotalsFromBase,
		calculateProfitPerAction: () => calculateProfitPerAction,
		calculateProfitPerDay: () => calculateProfitPerDay,
		calculateSecondsForActions: () => calculateSecondsForActions,
		calculateTeaCostsPerHour: () => calculateTeaCostsPerHour,
		calculateTotalProfitForActions: () => calculateTotalProfitForActions,
		createPriceCache: () => createPriceCache,
		default: () => profit_helpers_default,
		resolveItemPrice: () => resolveItemPrice
	});
	/**
	* Calculate actions per hour from action time
	* @param {number} actionTimeSeconds - Time per action in seconds
	* @returns {number} Actions per hour (0 if invalid input)
	*
	* @example
	* calculateActionsPerHour(6) // Returns 600 (3600 / 6)
	* calculateActionsPerHour(0) // Returns 0 (invalid)
	*/
	function calculateActionsPerHour(actionTimeSeconds) {
		if (!actionTimeSeconds || actionTimeSeconds <= 0) return 0;
		return SECONDS_PER_HOUR / Math.max(3, actionTimeSeconds);
	}
	/**
	* Calculate effective actions per hour after efficiency
	* @param {number} actionsPerHour - Base actions per hour (without efficiency)
	* @param {number} [efficiencyMultiplier=1] - Efficiency multiplier (1 + efficiencyPercent/100)
	* @returns {number} Effective actions per hour (0 if invalid input)
	*
	* @example
	* calculateEffectiveActionsPerHour(600, 1.2) // Returns 720
	*/
	function calculateEffectiveActionsPerHour(actionsPerHour, efficiencyMultiplier = 1) {
		if (!actionsPerHour || actionsPerHour <= 0) return 0;
		if (!efficiencyMultiplier || efficiencyMultiplier <= 0) return 0;
		return actionsPerHour * efficiencyMultiplier;
	}
	/**
	* Calculate hours needed for a number of actions
	* @param {number} actionCount - Number of queued actions
	* @param {number} actionsPerHour - Actions per hour rate
	* @returns {number} Hours needed (0 if invalid input)
	*
	* @example
	* calculateHoursForActions(600, 600) // Returns 1
	* calculateHoursForActions(1200, 600) // Returns 2
	*/
	function calculateHoursForActions(actionCount, actionsPerHour) {
		if (!actionsPerHour || actionsPerHour <= 0) return 0;
		return actionCount / actionsPerHour;
	}
	/**
	* Calculate seconds needed for a number of actions
	* @param {number} actionCount - Number of queued actions
	* @param {number} actionsPerHour - Actions per hour rate
	* @returns {number} Seconds needed (0 if invalid input)
	*
	* @example
	* calculateSecondsForActions(100, 600) // Returns 600 (100/600 * 3600)
	*/
	function calculateSecondsForActions(actionCount, actionsPerHour) {
		return calculateHoursForActions(actionCount, actionsPerHour) * SECONDS_PER_HOUR;
	}
	/**
	* Calculate profit per action from hourly profit data
	*
	* IMPORTANT: This assumes profitPerHour already includes efficiency.
	* The formula works because:
	* - profitPerHour = actionsPerHour × efficiencyMultiplier × profitPerItem
	* - profitPerHour / actionsPerHour = efficiencyMultiplier × profitPerItem
	* - This gives profit per ATTEMPT (what the queue shows)
	*
	* @param {number} profitPerHour - Profit per hour (includes efficiency)
	* @param {number} actionsPerHour - Base actions per hour (without efficiency)
	* @returns {number} Profit per action (0 if invalid input)
	*
	* @example
	* // With 150% efficiency (2.5x), 600 actions/hr, 50 profit/item:
	* // profitPerHour = 600 × 2.5 × 50 = 75,000
	* calculateProfitPerAction(75000, 600) // Returns 125 (profit per action)
	*/
	function calculateProfitPerAction(profitPerHour, actionsPerHour) {
		if (!actionsPerHour || actionsPerHour <= 0) return 0;
		return profitPerHour / actionsPerHour;
	}
	/**
	* Calculate total profit for a number of actions
	*
	* @param {number} profitPerHour - Profit per hour (includes efficiency)
	* @param {number} actionsPerHour - Base actions per hour (without efficiency)
	* @param {number} actionCount - Number of queued actions
	* @returns {number} Total profit (0 if invalid input)
	*
	* @example
	* // Queue shows "Produce 100 times" with 75,000 profit/hr and 600 actions/hr
	* calculateTotalProfitForActions(75000, 600, 100) // Returns 12,500
	*/
	function calculateTotalProfitForActions(profitPerHour, actionsPerHour, actionCount) {
		return calculateProfitPerAction(profitPerHour, actionsPerHour) * actionCount;
	}
	/**
	* Calculate profit per day from hourly profit
	* @param {number} profitPerHour - Profit per hour
	* @returns {number} Profit per day
	*
	* @example
	* calculateProfitPerDay(10000) // Returns 240,000
	*/
	function calculateProfitPerDay(profitPerHour) {
		return profitPerHour * 24;
	}
	/**
	* Calculate drink consumption rate with Drink Concentration
	* @param {number} drinkConcentration - Drink Concentration stat as decimal (e.g., 0.15 for 15%)
	* @returns {number} Drinks consumed per hour
	*
	* @example
	* calculateDrinksPerHour(0)    // Returns 12 (base rate)
	* calculateDrinksPerHour(0.15) // Returns 13.8 (12 × 1.15)
	*/
	function calculateDrinksPerHour(drinkConcentration = 0) {
		return 12 * (1 + drinkConcentration);
	}
	/**
	* Calculate tea consumption costs per hour
	* @param {Object} params - Tea cost inputs
	* @param {Array} params.drinkSlots - Equipped drink slots
	* @param {number} params.drinkConcentration - Drink Concentration stat as decimal
	* @param {Object} params.itemDetailMap - Item detail map for names
	* @param {Function} params.getItemPrice - Price resolver function
	* @returns {Object} Tea costs breakdown
	*/
	function calculateTeaCostsPerHour({ drinkSlots = [], drinkConcentration = 0, itemDetailMap = {}, getItemPrice }) {
		if (!Array.isArray(drinkSlots) || drinkSlots.length === 0) return {
			costs: [],
			totalCostPerHour: 0,
			hasMissingPrices: false,
			drinksPerHour: calculateDrinksPerHour(drinkConcentration)
		};
		const drinksPerHour = calculateDrinksPerHour(drinkConcentration);
		const costs = drinkSlots.reduce((entries, drink) => {
			if (!drink || !drink.itemHrid) return entries;
			const itemName = itemNameTranslator.getDisplayName(drink.itemHrid);
			const price = typeof getItemPrice === "function" ? getItemPrice(drink.itemHrid, {
				context: "profit",
				side: "buy"
			}) : null;
			const isPriceMissing = price === null;
			const resolvedPrice = isPriceMissing ? 0 : price;
			const totalCost = resolvedPrice * drinksPerHour;
			entries.push({
				itemHrid: drink.itemHrid,
				itemName,
				pricePerDrink: resolvedPrice,
				drinksPerHour,
				totalCost,
				missingPrice: isPriceMissing
			});
			return entries;
		}, []);
		return {
			costs,
			totalCostPerHour: costs.reduce((sum, entry) => sum + entry.totalCost, 0),
			hasMissingPrices: costs.some((entry) => entry.missingPrice),
			drinksPerHour
		};
	}
	/**
	* Calculate price after marketplace tax
	* @param {number} price - Price before tax
	* @param {number} [taxRate=MARKET_TAX] - Tax rate (e.g., 0.02 for 2%)
	* @returns {number} Price after tax deduction
	*
	* @example
	* calculatePriceAfterTax(100) // Returns 98
	*/
	function calculatePriceAfterTax(price, taxRate = MARKET_TAX) {
		return price * (1 - taxRate);
	}
	/**
	* Create a memoized price lookup closure backed by a fresh Map per calculation.
	* Caches results keyed on itemHrid + side + enhancementLevel to avoid redundant
	* market API calls within a single profit calculation pass.
	*
	* @param {Function} getItemPriceFn - Price resolver function (itemHrid, options) => number|null
	* @returns {Function} getCachedPrice(itemHrid, options) closure
	*
	* @example
	* const getCachedPrice = createPriceCache(getItemPrice);
	* const price = getCachedPrice('/items/cotton', { context: 'profit', side: 'sell' });
	*/
	function createPriceCache(getItemPriceFn) {
		const priceCache = /* @__PURE__ */ new Map();
		return function getCachedPrice(itemHrid, options) {
			const cacheKey = `${itemHrid}|${options?.side || ""}|${options?.enhancementLevel ?? ""}`;
			if (priceCache.has(cacheKey)) return priceCache.get(cacheKey);
			const price = getItemPriceFn(itemHrid, options);
			priceCache.set(cacheKey, price);
			return price;
		};
	}
	/**
	* Calculate action-based totals for production actions
	* Uses per-action base inputs (efficiency only affects time)
	*
	* @param {Object} params - Calculation parameters
	* @param {number} params.actionsCount - Number of queued actions
	* @param {number} params.actionsPerHour - Base actions per hour
	* @param {number} params.outputAmount - Items produced per action
	* @param {number} params.outputPrice - Output price per item (pre-tax)
	* @param {number} params.gourmetBonus - Gourmet bonus as decimal (e.g., 0.1 for 10%)
	* @param {Array} [params.bonusDrops] - Bonus drop entries with revenuePerAction
	* @param {Array} [params.materialCosts] - Material cost entries per action
	* @param {number} params.totalTeaCostPerHour - Tea cost per hour
	* @param {number} [params.efficiencyMultiplier=1] - Efficiency multiplier for time scaling
	* @returns {Object} Totals and time values
	*/
	function calculateProductionActionTotalsFromBase({ actionsCount, actionsPerHour, outputAmount, outputPrice, gourmetBonus, bonusDrops = [], materialCosts = [], totalTeaCostPerHour, efficiencyMultiplier = 1 }) {
		const effectiveActionsPerHour = calculateEffectiveActionsPerHour(actionsPerHour, efficiencyMultiplier);
		if (!effectiveActionsPerHour || effectiveActionsPerHour <= 0) return {
			totalBaseItems: 0,
			totalGourmetItems: 0,
			totalBaseRevenue: 0,
			totalGourmetRevenue: 0,
			totalBonusRevenue: 0,
			totalRevenue: 0,
			totalMarketTax: 0,
			totalMaterialCost: 0,
			totalTeaCost: 0,
			totalCosts: 0,
			totalProfit: 0,
			hoursNeeded: 0
		};
		const totalBaseItems = outputAmount * actionsCount;
		const totalGourmetItems = outputAmount * gourmetBonus * actionsCount;
		const totalBaseRevenue = totalBaseItems * outputPrice;
		const totalGourmetRevenue = totalGourmetItems * outputPrice;
		const totalBonusRevenue = bonusDrops.reduce((sum, drop) => sum + (drop.revenuePerAction || 0) * actionsCount, 0);
		const totalRevenue = totalBaseRevenue + totalGourmetRevenue + totalBonusRevenue;
		const totalMarketTax = totalRevenue * MARKET_TAX;
		const totalMaterialCost = materialCosts.reduce((sum, material) => sum + material.totalCost * actionsCount, 0);
		const hoursNeeded = calculateHoursForActions(actionsCount, effectiveActionsPerHour);
		const totalTeaCost = totalTeaCostPerHour * hoursNeeded;
		const totalCosts = totalMaterialCost + totalTeaCost + totalMarketTax;
		return {
			totalBaseItems,
			totalGourmetItems,
			totalBaseRevenue,
			totalGourmetRevenue,
			totalBonusRevenue,
			totalRevenue,
			totalMarketTax,
			totalMaterialCost,
			totalTeaCost,
			totalCosts,
			totalProfit: totalRevenue - totalCosts,
			hoursNeeded
		};
	}
	/**
	* Calculate action-based totals for gathering actions
	* Uses per-action base inputs (efficiency only affects time)
	*
	* @param {Object} params - Calculation parameters
	* @param {number} params.actionsCount - Number of queued actions
	* @param {number} params.actionsPerHour - Base actions per hour
	* @param {Array} [params.baseOutputs] - Base outputs with revenuePerAction
	* @param {Array} [params.bonusDrops] - Bonus drop entries with revenuePerAction
	* @param {number} params.processingRevenueBonusPerAction - Processing bonus per action
	* @param {number} params.gourmetRevenueBonusPerAction - Gourmet bonus revenue per action
	* @param {number} params.drinkCostPerHour - Drink costs per hour
	* @param {number} [params.efficiencyMultiplier=1] - Efficiency multiplier for time scaling
	* @returns {Object} Totals and time values
	*/
	function calculateGatheringActionTotalsFromBase({ actionsCount, actionsPerHour, baseOutputs = [], bonusDrops = [], processingRevenueBonusPerAction, gourmetRevenueBonusPerAction, drinkCostPerHour, efficiencyMultiplier = 1 }) {
		const effectiveActionsPerHour = calculateEffectiveActionsPerHour(actionsPerHour, efficiencyMultiplier);
		if (!effectiveActionsPerHour || effectiveActionsPerHour <= 0) return {
			totalBaseRevenue: 0,
			totalBonusRevenue: 0,
			totalProcessingRevenue: 0,
			totalGourmetRevenue: 0,
			totalRevenue: 0,
			totalMarketTax: 0,
			totalDrinkCost: 0,
			totalCosts: 0,
			totalProfit: 0,
			hoursNeeded: 0
		};
		const totalBaseRevenue = baseOutputs.reduce((sum, output) => sum + (output.revenuePerAction || 0) * actionsCount, 0);
		const totalBonusRevenue = bonusDrops.reduce((sum, drop) => sum + (drop.revenuePerAction || 0) * actionsCount, 0);
		const totalProcessingRevenue = (processingRevenueBonusPerAction || 0) * actionsCount;
		const totalGourmetRevenue = (gourmetRevenueBonusPerAction || 0) * actionsCount;
		const totalRevenue = totalBaseRevenue + totalGourmetRevenue + totalBonusRevenue + totalProcessingRevenue;
		const totalMarketTax = totalRevenue * MARKET_TAX;
		const hoursNeeded = calculateHoursForActions(actionsCount, effectiveActionsPerHour);
		const totalDrinkCost = drinkCostPerHour * hoursNeeded;
		const totalCosts = totalDrinkCost + totalMarketTax;
		return {
			totalBaseRevenue,
			totalBonusRevenue,
			totalProcessingRevenue,
			totalGourmetRevenue,
			totalRevenue,
			totalMarketTax,
			totalDrinkCost,
			totalCosts,
			totalProfit: totalRevenue - totalCosts,
			hoursNeeded
		};
	}
	/**
	* Resolve the best available price for an item through the full resolution chain:
	* custom override → shop floor → market price → production cost fallback
	*
	* @param {string} itemHrid - Item HRID
	* @param {Object} options - Configuration options
	* @param {number} [options.enhancementLevel=0] - Enhancement level
	* @param {string} [options.mode] - Pricing mode ('ask'|'bid'|'average')
	* @param {string} [options.context] - Context for pricing mode ('profit'|'networth')
	* @param {string} [options.side='sell'] - Transaction side ('buy'|'sell')
	* @returns {{ price: number, custom: boolean, missing: boolean }}
	*/
	function resolveItemPrice(itemHrid, options = {}) {
		const { enhancementLevel = 0, mode, context, side = "sell" } = options;
		const customPrice = getCustomPrice(itemHrid, enhancementLevel, side);
		if (customPrice !== null) return {
			price: customPrice,
			custom: true,
			missing: false
		};
		const marketPrice = getItemPrice(itemHrid, {
			enhancementLevel,
			mode,
			context,
			side
		});
		if (side === "buy") {
			const shopCost = getShopCoinCost(itemHrid);
			if (shopCost > 0 && (marketPrice === null || shopCost < marketPrice)) return {
				price: shopCost,
				custom: false,
				missing: false
			};
		}
		if (marketPrice !== null) return {
			price: marketPrice,
			custom: false,
			missing: false
		};
		const prodCost = getProductionCost(itemHrid, mode || "ask");
		if (prodCost > 0) return {
			price: prodCost,
			custom: false,
			missing: false
		};
		return {
			price: 0,
			custom: false,
			missing: true
		};
	}
	var profit_helpers_default = {
		calculateActionsPerHour,
		calculateEffectiveActionsPerHour,
		calculateHoursForActions,
		calculateSecondsForActions,
		calculateProfitPerAction,
		calculateTotalProfitForActions,
		calculateProfitPerDay,
		calculateDrinksPerHour,
		calculateTeaCostsPerHour,
		calculatePriceAfterTax,
		createPriceCache,
		resolveItemPrice,
		calculateProductionActionTotalsFromBase,
		calculateGatheringActionTotalsFromBase
	};
	//#endregion
	//#region src/utils/dom.js
	/**
	* DOM Utilities Module
	* Helpers for DOM manipulation and element creation
	*/
	var dom_exports = /* @__PURE__ */ __exportAll({
		addStyles: () => addStyles,
		createColoredText: () => createColoredText,
		createStyledDiv: () => createStyledDiv,
		createStyledSpan: () => createStyledSpan,
		default: () => dom_default,
		dismissTooltips: () => dismissTooltips,
		fixTooltipOverflow: () => fixTooltipOverflow,
		getOriginalText: () => getOriginalText,
		insertAfter: () => insertAfter,
		insertBefore: () => insertBefore,
		removeElements: () => removeElements,
		removeStyles: () => removeStyles,
		setupScrollTooltipDismissal: () => setupScrollTooltipDismissal,
		waitForElement: () => waitForElement,
		waitForElements: () => waitForElements
	});
	var REGEX_TRANSFORM3D = /translate3d\(([^,]+),\s*([^,]+),\s*([^)]+)\)/;
	/**
	* Wait for an element to appear in the DOM
	* @param {string} selector - CSS selector
	* @param {number} timeout - Max wait time in ms (default: 10000)
	* @param {number} interval - Check interval in ms (default: 100)
	* @returns {Promise<Element|null>} The element or null if timeout
	*/
	function waitForElement(selector, timeout = 1e4, interval = 100) {
		return new Promise((resolve) => {
			const startTime = Date.now();
			const check = () => {
				const element = document.querySelector(selector);
				if (element) resolve(element);
				else if (Date.now() - startTime >= timeout) {
					console.warn(`[DOM] Timeout waiting for: ${selector}`);
					resolve(null);
				} else setTimeout(check, interval);
			};
			check();
		});
	}
	/**
	* Wait for multiple elements to appear
	* @param {string} selector - CSS selector
	* @param {number} minCount - Minimum number of elements to wait for (default: 1)
	* @param {number} timeout - Max wait time in ms (default: 10000)
	* @returns {Promise<NodeList|null>} The elements or null if timeout
	*/
	function waitForElements(selector, minCount = 1, timeout = 1e4) {
		return new Promise((resolve) => {
			const startTime = Date.now();
			const check = () => {
				const elements = document.querySelectorAll(selector);
				if (elements.length >= minCount) resolve(elements);
				else if (Date.now() - startTime >= timeout) {
					console.warn(`[DOM] Timeout waiting for ${minCount}× ${selector}`);
					resolve(null);
				} else setTimeout(check, 100);
			};
			check();
		});
	}
	/**
	* Create a styled div element
	* @param {Object} styles - CSS styles object
	* @param {string} text - Optional text content
	* @param {string} className - Optional class name
	* @returns {HTMLDivElement} Created div
	*/
	function createStyledDiv(styles = {}, text = "", className = "") {
		const div = document.createElement("div");
		if (className) div.className = className;
		if (text) div.textContent = text;
		Object.assign(div.style, styles);
		return div;
	}
	/**
	* Create a styled span element
	* @param {Object} styles - CSS styles object
	* @param {string} text - Text content
	* @param {string} className - Optional class name
	* @returns {HTMLSpanElement} Created span
	*/
	function createStyledSpan(styles = {}, text = "", className = "") {
		const span = document.createElement("span");
		if (className) span.className = className;
		if (text) span.textContent = text;
		Object.assign(span.style, styles);
		return span;
	}
	/**
	* Create a colored text span (uses script colors from config)
	* @param {string} text - Text content
	* @param {string} colorType - 'main', 'tooltip', or 'alert' (default: 'main')
	* @returns {HTMLSpanElement} Created span with color
	*/
	function createColoredText(text, colorType = "main") {
		let color;
		switch (colorType) {
			case "main":
				color = src_core_config_js.default.SCRIPT_COLOR_MAIN;
				break;
			case "tooltip":
				color = src_core_config_js.default.SCRIPT_COLOR_TOOLTIP;
				break;
			case "alert":
				color = src_core_config_js.default.SCRIPT_COLOR_ALERT;
				break;
			default: color = src_core_config_js.default.SCRIPT_COLOR_MAIN;
		}
		return createStyledSpan({ color }, text);
	}
	/**
	* Insert element before another element
	* @param {Element} newElement - Element to insert
	* @param {Element} referenceElement - Element to insert before
	*/
	function insertBefore(newElement, referenceElement) {
		if (!referenceElement?.parentNode) {
			console.warn("[DOM] Cannot insert: reference element has no parent");
			return;
		}
		referenceElement.parentNode.insertBefore(newElement, referenceElement);
	}
	/**
	* Insert element after another element
	* @param {Element} newElement - Element to insert
	* @param {Element} referenceElement - Element to insert after
	*/
	function insertAfter(newElement, referenceElement) {
		if (!referenceElement?.parentNode) {
			console.warn("[DOM] Cannot insert: reference element has no parent");
			return;
		}
		referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
	}
	/**
	* Remove all elements matching selector
	* @param {string} selector - CSS selector
	* @returns {number} Number of elements removed
	*/
	function removeElements(selector) {
		const elements = document.querySelectorAll(selector);
		elements.forEach((el) => el.parentNode?.removeChild(el));
		return elements.length;
	}
	/**
	* Get original text from element (strips our injected content)
	* @param {Element} element - Element to get text from
	* @returns {string} Original text content
	*/
	function getOriginalText(element) {
		if (!element) return "";
		const clone = element.cloneNode(true);
		clone.querySelectorAll(".insertedSpan, .script-injected").forEach((el) => el.remove());
		return clone.textContent.trim();
	}
	/**
	* Add CSS to page
	* @param {string} css - CSS rules to add
	* @param {string} id - Optional style element ID (for removal later)
	*/
	function addStyles(css, id = "") {
		const style = document.createElement("style");
		if (id) style.id = id;
		style.textContent = css;
		document.head.appendChild(style);
	}
	/**
	* Remove CSS by ID
	* @param {string} id - Style element ID to remove
	*/
	function removeStyles(id) {
		const style = document.getElementById(id);
		if (style) style.remove();
	}
	/**
	* Dismiss all open MUI tooltips by dispatching mouseleave events
	* Useful when DOM elements are reordered (e.g., sorting action panels)
	* which can cause tooltips to get "stuck" since no natural mouseleave fires
	*/
	function dismissTooltips() {
		document.querySelectorAll(".MuiTooltip-popper").forEach((tooltip) => {
			if (tooltip.id?.replace("-tooltip", "")) {
				const trigger = document.querySelector(`[aria-describedby="${tooltip.id}"]`);
				if (trigger) {
					if (trigger.matches(":hover")) return;
					trigger.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
					trigger.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
				}
			}
		});
	}
	/**
	* Set up scroll listener to dismiss tooltips when scrolling
	* Prevents tooltips from getting stuck when scrolling quickly
	* @returns {Function} Cleanup function to remove the listener
	*/
	function setupScrollTooltipDismissal() {
		let scrollTimeout = null;
		let lastUserScrollTime = 0;
		const USER_SCROLL_WINDOW_MS = 200;
		const markUserScroll = () => {
			lastUserScrollTime = Date.now();
		};
		const handleUserKeyScroll = (event) => {
			const key = event.key;
			if (key === "ArrowUp" || key === "ArrowDown" || key === "PageUp" || key === "PageDown" || key === " ") markUserScroll();
		};
		const handleScroll = (event) => {
			if (event.target?.closest?.(".MuiTooltip-tooltip, .MuiTooltip-popper")) return;
			if (Date.now() - lastUserScrollTime > USER_SCROLL_WINDOW_MS) return;
			if (!document.querySelector(".MuiTooltip-popper")) return;
			if (scrollTimeout) clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				dismissTooltips();
				scrollTimeout = null;
			}, 50);
		};
		document.addEventListener("scroll", handleScroll, {
			capture: true,
			passive: true
		});
		document.addEventListener("wheel", markUserScroll, {
			capture: true,
			passive: true
		});
		document.addEventListener("touchmove", markUserScroll, {
			capture: true,
			passive: true
		});
		document.addEventListener("keydown", handleUserKeyScroll, { capture: true });
		return () => {
			document.removeEventListener("scroll", handleScroll, { capture: true });
			document.removeEventListener("wheel", markUserScroll, { capture: true });
			document.removeEventListener("touchmove", markUserScroll, { capture: true });
			document.removeEventListener("keydown", handleUserKeyScroll, { capture: true });
			if (scrollTimeout) clearTimeout(scrollTimeout);
		};
	}
	/**
	* Fix tooltip overflow to ensure it stays within viewport
	* @param {Element} tooltipElement - The tooltip popper element
	* @param {Object} [options={}]
	* @param {boolean} [options.forceTop=false] - Pin the tooltip centered at the top of the viewport
	*/
	function fixTooltipOverflow(tooltipElement, { forceTop = false } = {}) {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					if (!tooltipElement.isConnected) return;
					const bBox = tooltipElement.getBoundingClientRect();
					const viewportHeight = window.innerHeight;
					const viewportWidth = window.innerWidth;
					const tooltipContent = tooltipElement.querySelector(".MuiTooltip-tooltip");
					if (forceTop) {
						const targetTop = 10;
						const targetLeft = Math.round((viewportWidth - bBox.width) / 2);
						tooltipElement.style.position = "fixed";
						tooltipElement.style.top = `${targetTop}px`;
						tooltipElement.style.left = `${targetLeft}px`;
						tooltipElement.style.transform = "none";
						if (tooltipContent && bBox.height >= viewportHeight - 20) {
							tooltipContent.style.maxHeight = `${viewportHeight - 20}px`;
							tooltipContent.style.overflowY = "auto";
						}
						return;
					}
					if (bBox.top < 0 || bBox.bottom > viewportHeight) {
						const transformString = tooltipElement.style.transform;
						if (transformString) {
							const match = transformString.match(REGEX_TRANSFORM3D);
							if (match) {
								const x = match[1];
								const currentY = parseFloat(match[2]);
								const z = match[3];
								let newY;
								if (bBox.height >= viewportHeight - 20) {
									newY = 0;
									if (tooltipContent) {
										tooltipContent.style.maxHeight = `${viewportHeight - 20}px`;
										tooltipContent.style.overflowY = "auto";
									}
								} else if (bBox.top < 0) newY = currentY - bBox.top;
								else if (bBox.bottom > viewportHeight) newY = currentY - (bBox.bottom - viewportHeight) - 10;
								if (newY !== void 0) {
									newY = Math.max(0, newY);
									tooltipElement.style.transform = `translate3d(${x}, ${newY}px, ${z})`;
								}
							}
						}
					}
				});
			});
		});
	}
	var dom_default = {
		waitForElement,
		waitForElements,
		createStyledDiv,
		createStyledSpan,
		createColoredText,
		insertBefore,
		insertAfter,
		removeElements,
		getOriginalText,
		addStyles,
		removeStyles,
		dismissTooltips,
		setupScrollTooltipDismissal,
		fixTooltipOverflow
	};
	//#endregion
	//#region src/utils/dom-observer-helpers.js
	/**
	* DOM Observer Helper Utilities
	* Standardized wrappers around domObserver to reduce boilerplate
	*/
	var dom_observer_helpers_exports = /* @__PURE__ */ __exportAll({
		createMutationWatcher: () => createMutationWatcher,
		createPersistentDisplay: () => createPersistentDisplay,
		createSingletonObserver: () => createSingletonObserver,
		createTrackedObserver: () => createTrackedObserver
	});
	/**
	* Create a singleton observer that automatically prevents duplicate processing
	* Uses an internal WeakSet to track processed elements
	*
	* @param {string} name - Observer name for debugging
	* @param {string|string[]} classNames - Class name(s) to watch for
	* @param {Function} handler - Handler function (receives element)
	* @param {Object} options - Optional configuration
	* @param {boolean} options.debounce - Enable debouncing
	* @param {number} options.debounceDelay - Debounce delay in ms
	* @returns {Function} Unregister function
	*
	* @example
	* // Before (20 lines)
	* this.processedDivs = new WeakSet();
	* this.unregister = domObserver.onClass('MyFeature', 'selector', (elem) => {
	*     if (this.processedDivs.has(elem)) return;
	*     this.processedDivs.add(elem);
	*     // do work
	* });
	*
	* // After (5 lines)
	* this.unregister = createSingletonObserver('MyFeature', 'selector', (elem) => {
	*     // do work (processed flag automatic)
	* });
	*/
	function createSingletonObserver(name, classNames, handler, options = {}) {
		const processedElements = /* @__PURE__ */ new WeakSet();
		return src_core_dom_observer_js.default.onClass(name, classNames, (element) => {
			if (processedElements.has(element)) return;
			processedElements.add(element);
			handler(element);
		}, options);
	}
	/**
	* Create a tracked observer that manages cleanup functions for processed elements
	* Uses an internal Map to track element → cleanup function pairs
	* Automatically calls cleanup functions when unregistered
	*
	* @param {string} name - Observer name for debugging
	* @param {string|string[]} classNames - Class name(s) to watch for
	* @param {Function} handler - Handler function (receives element, should return cleanup function or null)
	* @param {Object} options - Optional configuration
	* @param {boolean} options.debounce - Enable debouncing
	* @param {number} options.debounceDelay - Debounce delay in ms
	* @returns {Function} Unregister function (also calls all cleanup functions)
	*
	* @example
	* // Before (15 lines)
	* this.trackedElements = new Map();
	* this.unregister = domObserver.onClass('MyFeature', 'selector', (elem) => {
	*     if (this.trackedElements.has(elem)) return;
	*     const cleanup = attachListeners(...);
	*     this.trackedElements.set(elem, cleanup);
	* });
	*
	* // After (5 lines)
	* this.unregister = createTrackedObserver('MyFeature', 'selector', (elem) => {
	*     return attachListeners(...); // Return cleanup function
	* });
	*/
	function createTrackedObserver(name, classNames, handler, options = {}) {
		const trackedElements = /* @__PURE__ */ new Map();
		const unregister = src_core_dom_observer_js.default.onClass(name, classNames, (element) => {
			if (trackedElements.has(element)) return;
			const cleanup = handler(element);
			if (cleanup && typeof cleanup === "function") trackedElements.set(element, cleanup);
			else trackedElements.set(element, null);
		}, options);
		return () => {
			for (const [_element, cleanup] of trackedElements.entries()) if (cleanup && typeof cleanup === "function") try {
				cleanup();
			} catch (error) {
				console.error(`[DOM Observer Helpers] Cleanup error for ${name}:`, error);
			}
			trackedElements.clear();
			unregister();
		};
	}
	/**
	* Create a simplified MutationObserver with automatic cleanup
	* Wrapper around native MutationObserver that returns unwatch function
	*
	* @param {Element} element - Element to observe
	* @param {Function} callback - Callback function (receives mutations, observer)
	* @param {Object} options - MutationObserver options (default: { childList: true, subtree: true })
	* @returns {Function} Unwatch function (disconnects observer)
	*
	* @example
	* // Before (25 lines)
	* let observer = null;
	* const cleanup = () => {
	*     if (observer) {
	*         observer.disconnect();
	*         observer = null;
	*     }
	* };
	* observer = new MutationObserver(() => { ... });
	* observer.observe(element, { childList: true });
	*
	* // After (5 lines)
	* const unwatch = createMutationWatcher(element, () => {
	*     // callback
	* }, { childList: true });
	*/
	function createMutationWatcher(element, callback, options = null) {
		if (!element) {
			console.warn("[DOM Observer Helpers] createMutationWatcher called with null element");
			return () => {};
		}
		const observerOptions = options || {
			childList: true,
			subtree: true
		};
		const observer = new MutationObserver((mutations) => {
			callback(mutations, observer);
		});
		observer.observe(element, observerOptions);
		return () => {
			observer.disconnect();
		};
	}
	/**
	* Create a persistent display helper
	* Handles cleanup and re-creation of DOM elements on re-render
	*
	* @param {string} name - Helper name for debugging
	* @param {string|string[]} classNames - Class name(s) to watch for
	* @param {Function} createFn - Function to create display element (receives container)
	* @param {Object} options - Optional configuration
	* @param {boolean} options.debounce - Enable debouncing
	* @param {number} options.debounceDelay - Debounce delay in ms
	* @returns {Function} Unregister function
	*
	* @example
	* this.unregister = createPersistentDisplay(
	*     'MyDisplay',
	*     'container-class',
	*     (container) => {
	*         const display = document.createElement('div');
	*         display.className = 'my-display';
	*         display.textContent = 'Hello';
	*         container.appendChild(display);
	*     }
	* );
	*/
	function createPersistentDisplay(name, classNames, createFn, options = {}) {
		return createSingletonObserver(name, classNames, (container) => {
			try {
				createFn(container);
			} catch (error) {
				console.error(`[DOM Observer Helpers] createPersistentDisplay error for ${name}:`, error);
			}
		}, options);
	}
	//#endregion
	//#region src/utils/timer-registry.js
	var timer_registry_exports = /* @__PURE__ */ __exportAll({ createTimerRegistry: () => createTimerRegistry });
	/**
	* Timer Registry Utility
	* Centralized registration for intervals and timeouts.
	*/
	/**
	* Create a timer registry for deterministic teardown.
	* @returns {{
	*   registerInterval: (intervalId: number) => void,
	*   registerTimeout: (timeoutId: number) => void,
	*   clearAll: () => void
	* }} Timer registry API
	*/
	function createTimerRegistry() {
		const intervals = [];
		const timeouts = [];
		const registerInterval = (intervalId) => {
			if (!intervalId) {
				console.warn("[TimerRegistry] registerInterval called with invalid interval id");
				return;
			}
			intervals.push(intervalId);
		};
		const registerTimeout = (timeoutId) => {
			if (!timeoutId) {
				console.warn("[TimerRegistry] registerTimeout called with invalid timeout id");
				return;
			}
			timeouts.push(timeoutId);
		};
		const clearAll = () => {
			intervals.forEach((intervalId) => {
				try {
					clearInterval(intervalId);
				} catch (error) {
					console.error("[TimerRegistry] Failed to clear interval:", error);
				}
			});
			intervals.length = 0;
			timeouts.forEach((timeoutId) => {
				try {
					clearTimeout(timeoutId);
				} catch (error) {
					console.error("[TimerRegistry] Failed to clear timeout:", error);
				}
			});
			timeouts.length = 0;
		};
		return {
			registerInterval,
			registerTimeout,
			clearAll
		};
	}
	//#endregion
	//#region src/utils/token-valuation.js
	/**
	* Token Valuation Utility
	* Shared logic for calculating dungeon token and task token values
	*/
	var token_valuation_exports = /* @__PURE__ */ __exportAll({
		calculateDungeonTokenValue: () => calculateDungeonTokenValue,
		calculateTaskTokenValue: () => calculateTaskTokenValue
	});
	/**
	* Calculate dungeon token value based on best shop item value
	* Uses "best market value per token" approach: finds the shop item with highest (market price / token cost)
	* @param {string} tokenHrid - Token HRID (e.g., '/items/chimerical_token')
	* @param {string} pricingModeSetting - Config setting key for pricing mode (default: 'profitCalc_pricingMode')
	* @param {string} respectModeSetting - Config setting key for respect pricing mode flag (default: 'expectedValue_respectPricingMode')
	* @returns {number|null} Value per token, or null if no data
	*/
	function calculateDungeonTokenValue(tokenHrid, pricingModeSetting = "profitCalc_pricingMode", respectModeSetting = "expectedValue_respectPricingMode") {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return null;
		const shopItems = Object.values(gameData.shopItemDetailMap || {}).filter((item) => item.costs && item.costs[0]?.itemHrid === tokenHrid);
		if (shopItems.length === 0) return null;
		let bestValuePerToken = 0;
		for (const shopItem of shopItems) {
			const itemHrid = shopItem.itemHrid;
			const tokenCost = shopItem.costs[0].count;
			const prices = src_api_marketplace_js.default.getPrice(itemHrid, 0);
			if (!prices) continue;
			const pricingMode = src_core_config_js.default.getSettingValue(pricingModeSetting, "conservative");
			const respectPricingMode = src_core_config_js.default.getSettingValue(respectModeSetting, true);
			let marketPrice = 0;
			if (respectPricingMode) marketPrice = pricingMode === "conservative" || pricingMode === "patientBuy" ? prices.bid : prices.ask;
			else marketPrice = prices.bid;
			if (marketPrice <= 0) continue;
			const valuePerToken = marketPrice / tokenCost;
			if (valuePerToken > bestValuePerToken) bestValuePerToken = valuePerToken;
		}
		if (bestValuePerToken === 0) {
			const essenceHrid = {
				"/items/chimerical_token": "/items/chimerical_essence",
				"/items/sinister_token": "/items/sinister_essence",
				"/items/enchanted_token": "/items/enchanted_essence",
				"/items/pirate_token": "/items/pirate_essence"
			}[tokenHrid];
			if (essenceHrid) {
				const essencePrice = src_api_marketplace_js.default.getPrice(essenceHrid, 0);
				if (essencePrice) {
					const pricingMode = src_core_config_js.default.getSettingValue(pricingModeSetting, "conservative");
					const respectPricingMode = src_core_config_js.default.getSettingValue(respectModeSetting, true);
					let marketPrice = 0;
					if (respectPricingMode) marketPrice = pricingMode === "conservative" || pricingMode === "patientBuy" ? essencePrice.bid : essencePrice.ask;
					else marketPrice = essencePrice.bid;
					return marketPrice > 0 ? marketPrice : null;
				}
			}
		}
		return bestValuePerToken > 0 ? bestValuePerToken : null;
	}
	/**
	* Calculate task token value based on best chest expected value
	* @returns {number} Value per token, or 0 if no data
	*/
	function calculateTaskTokenValue() {
		if (!src_core_data_manager_js.default.getInitClientData()) return 0;
		const chestHrids = [
			"/items/large_artisans_crate",
			"/items/large_meteorite_cache",
			"/items/large_treasure_chest"
		];
		const bestChestValue = 0;
		for (const chestHrid of chestHrids) {
			const itemDetails = src_core_data_manager_js.default.getItemDetails(chestHrid);
			if (!itemDetails || !itemDetails.isOpenable) continue;
		}
		return bestChestValue / 30;
	}
	//#endregion
	//#region src/utils/worker-pool.js
	/**
	* Worker Pool Manager
	* Manages a pool of Web Workers for parallel task execution
	*/
	var WorkerPool = class {
		constructor(workerScript, poolSize = null) {
			this.poolSize = poolSize || Math.min(navigator.hardwareConcurrency || 2, 4);
			this.workerScript = workerScript;
			this.workers = [];
			this.taskQueue = [];
			this.activeWorkers = /* @__PURE__ */ new Set();
			this.nextTaskId = 0;
			this.initialized = false;
		}
		/**
		* Initialize the worker pool
		*/
		async initialize() {
			if (this.initialized) return;
			try {
				for (let i = 0; i < this.poolSize; i++) {
					const worker = new Worker(URL.createObjectURL(this.workerScript));
					this.workers.push({
						id: i,
						worker,
						busy: false,
						currentTask: null
					});
				}
				this.initialized = true;
			} catch (error) {
				console.error("[WorkerPool] Failed to initialize:", error);
				throw error;
			}
		}
		/**
		* Execute a task in the worker pool
		* @param {Object} taskData - Data to send to worker
		* @returns {Promise} Promise that resolves with worker result
		*/
		async execute(taskData) {
			if (!this.initialized) await this.initialize();
			return new Promise((resolve, reject) => {
				const task = {
					id: this.nextTaskId++,
					data: taskData,
					resolve,
					reject,
					timestamp: Date.now()
				};
				const availableWorker = this.workers.find((w) => !w.busy);
				if (availableWorker) this.assignTask(availableWorker, task);
				else this.taskQueue.push(task);
			});
		}
		/**
		* Execute multiple tasks in parallel
		* @param {Array} taskDataArray - Array of task data objects
		* @returns {Promise<Array>} Promise that resolves with array of results
		*/
		async executeAll(taskDataArray) {
			if (!this.initialized) await this.initialize();
			const promises = taskDataArray.map((taskData) => this.execute(taskData));
			return Promise.all(promises);
		}
		/**
		* Assign a task to a worker
		* @private
		*/
		assignTask(workerWrapper, task) {
			workerWrapper.busy = true;
			workerWrapper.currentTask = task;
			const messageHandler = (e) => {
				const { taskId, result, error } = e.data;
				if (taskId === task.id) {
					workerWrapper.worker.removeEventListener("message", messageHandler);
					workerWrapper.worker.removeEventListener("error", errorHandler);
					workerWrapper.busy = false;
					workerWrapper.currentTask = null;
					if (error) task.reject(new Error(error));
					else task.resolve(result);
					this.processQueue();
				}
			};
			const errorHandler = (error) => {
				console.error("[WorkerPool] Worker error:", error);
				workerWrapper.worker.removeEventListener("message", messageHandler);
				workerWrapper.worker.removeEventListener("error", errorHandler);
				workerWrapper.busy = false;
				workerWrapper.currentTask = null;
				task.reject(error);
				this.processQueue();
			};
			workerWrapper.worker.addEventListener("message", messageHandler);
			workerWrapper.worker.addEventListener("error", errorHandler);
			workerWrapper.worker.postMessage({
				taskId: task.id,
				data: task.data
			});
		}
		/**
		* Process the next task in the queue
		* @private
		*/
		processQueue() {
			if (this.taskQueue.length === 0) return;
			const availableWorker = this.workers.find((w) => !w.busy);
			if (availableWorker) {
				const task = this.taskQueue.shift();
				this.assignTask(availableWorker, task);
			}
		}
		/**
		* Get pool statistics
		*/
		getStats() {
			return {
				poolSize: this.poolSize,
				busyWorkers: this.workers.filter((w) => w.busy).length,
				queuedTasks: this.taskQueue.length,
				totalWorkers: this.workers.length
			};
		}
		/**
		* Terminate all workers and clean up
		*/
		terminate() {
			for (const workerWrapper of this.workers) workerWrapper.worker.terminate();
			this.workers = [];
			this.taskQueue = [];
			this.initialized = false;
		}
	};
	//#endregion
	//#region src/utils/ev-worker-manager.js
	/**
	* Expected Value Calculator Worker Manager
	* Manages a worker pool for parallel EV container calculations
	*/
	var workerPool = null;
	var WORKER_SCRIPT = `
// Cache for EV calculation results
const evCache = new Map();

/**
 * Calculate expected value for a single container
 * @param {Object} data - Container calculation data
 * @returns {Object} {containerHrid, ev}
 */
function calculateContainerEV(data) {
    const { containerHrid, dropTable, priceMap, COIN_HRID, MARKET_TAX } = data;

    if (!dropTable || dropTable.length === 0) {
        return { containerHrid, ev: null };
    }

    let totalExpectedValue = 0;

    // Calculate expected value for each drop
    for (const drop of dropTable) {
        const itemHrid = drop.itemHrid;
        const dropRate = drop.dropRate || 0;
        const minCount = drop.minCount || 0;
        const maxCount = drop.maxCount || 0;

        // Skip invalid drops
        if (dropRate <= 0 || (minCount === 0 && maxCount === 0)) {
            continue;
        }

        // Calculate average drop count
        const avgCount = (minCount + maxCount) / 2;

        // Get price for this drop
        const priceData = priceMap[itemHrid];
        if (!priceData || priceData.price === null) {
            continue; // Skip drops with missing data
        }

        const price = priceData.price;
        const canBeSold = priceData.canBeSold;
        const isCoin = itemHrid === COIN_HRID;

        // Calculate drop value with tax
        const dropValue = isCoin
            ? avgCount * dropRate * price
            : canBeSold
              ? avgCount * dropRate * price * (1 - MARKET_TAX)
              : avgCount * dropRate * price;

        totalExpectedValue += dropValue;
    }

    return { containerHrid, ev: totalExpectedValue };
}

/**
 * Calculate EV for a batch of containers
 * @param {Array} containers - Array of container data objects
 * @returns {Array} Array of {containerHrid, ev} results
 */
function calculateBatchEV(containers) {
    const results = [];

    for (const container of containers) {
        const result = calculateContainerEV(container);
        if (result.ev !== null) {
            evCache.set(result.containerHrid, result.ev);
        }
        results.push(result);
    }

    return results;
}

self.onmessage = function (e) {
    const { taskId, data } = e.data;
    try {
        const { action, params } = data;

        if (action === 'calculateBatch') {
            const results = calculateBatchEV(params.containers);
            self.postMessage({ taskId, result: results });
        } else if (action === 'clearCache') {
            evCache.clear();
            self.postMessage({ taskId, result: { success: true, message: 'Cache cleared' } });
        } else {
            throw new Error(\`Unknown action: \${action}\`);
        }
    } catch (error) {
        self.postMessage({ taskId, error: error.message || String(error) });
    }
};
`;
	/**
	* Get or create the worker pool instance
	*/
	async function getWorkerPool() {
		if (workerPool) return workerPool;
		try {
			workerPool = new WorkerPool(new Blob([WORKER_SCRIPT], { type: "application/javascript" }));
			await workerPool.initialize();
			return workerPool;
		} catch (error) {
			throw error;
		}
	}
	/**
	* Calculate EV for multiple containers in parallel
	* @param {Array} containers - Array of container data objects
	* @returns {Promise<Array>} Array of {containerHrid, ev} results
	*/
	async function calculateEVBatch(containers) {
		const pool = await getWorkerPool();
		const chunkSize = Math.ceil(containers.length / pool.getStats().poolSize);
		const chunks = [];
		for (let i = 0; i < containers.length; i += chunkSize) chunks.push(containers.slice(i, i + chunkSize));
		const tasks = chunks.map((chunk) => ({
			action: "calculateBatch",
			params: { containers: chunk }
		}));
		return (await pool.executeAll(tasks)).flat();
	}
	//#endregion
	//#region src/features/market/expected-value-calculator.js
	/**
	* Expected Value Calculator Module
	* Calculates expected value for openable containers
	*/
	/**
	* ExpectedValueCalculator class handles EV calculations for openable containers
	*/
	var ExpectedValueCalculator = class {
		constructor() {
			this.MARKET_TAX = .02;
			this.CONVERGENCE_ITERATIONS = 4;
			this.containerCache = /* @__PURE__ */ new Map();
			this.COIN_HRID = "/items/coin";
			this.COWBELL_HRID = "/items/cowbell";
			this.COWBELL_BAG_HRID = "/items/bag_of_10_cowbells";
			this.DUNGEON_TOKENS = [
				"/items/chimerical_token",
				"/items/sinister_token",
				"/items/enchanted_token",
				"/items/pirate_token"
			];
			this.isInitialized = false;
			this.retryHandler = null;
		}
		/**
		* Initialize the calculator
		* Pre-calculates all openable containers with nested convergence
		*/
		async initialize() {
			if (this.isInitialized) return true;
			if (!src_core_data_manager_js.default.getInitClientData()) {
				if (!this.retryHandler) {
					this.retryHandler = () => {
						this.initialize();
					};
					src_core_data_manager_js.default.on("character_initialized", this.retryHandler);
				}
				return false;
			}
			if (this.retryHandler) {
				src_core_data_manager_js.default.off("character_initialized", this.retryHandler);
				this.retryHandler = null;
			}
			if (!src_api_marketplace_js.default.isLoaded()) await src_api_marketplace_js.default.fetch(true);
			await this.calculateNestedContainers();
			this.isInitialized = true;
			src_core_data_manager_js.default.emit("expected_value_initialized", { timestamp: Date.now() });
			return true;
		}
		/**
		* Calculate all containers with nested convergence using workers
		* Iterates 4 times to resolve nested container values
		*/
		async calculateNestedContainers() {
			const initData = src_core_data_manager_js.default.getInitClientData();
			if (!initData || !initData.openableLootDropMap) return;
			const containerHrids = Object.keys(initData.openableLootDropMap);
			for (let iteration = 0; iteration < this.CONVERGENCE_ITERATIONS; iteration++) {
				const priceMap = this.buildPriceMap(containerHrids, initData);
				const containerData = containerHrids.map((containerHrid) => ({
					containerHrid,
					dropTable: initData.openableLootDropMap[containerHrid],
					priceMap,
					COIN_HRID: this.COIN_HRID,
					MARKET_TAX: this.MARKET_TAX
				}));
				try {
					const results = await calculateEVBatch(containerData);
					for (const result of results) if (result.ev !== null) this.containerCache.set(result.containerHrid, result.ev);
				} catch (error) {
					console.warn("[ExpectedValueCalculator] Worker failed, falling back to main thread:", error);
					for (const containerHrid of containerHrids) {
						const ev = this.calculateSingleContainer(containerHrid, initData);
						if (ev !== null) this.containerCache.set(containerHrid, ev);
					}
				}
			}
		}
		/**
		* Build price map for all items needed for container calculations
		* @param {Array} containerHrids - Array of container HRIDs
		* @param {Object} initData - Game data
		* @returns {Object} Map of itemHrid to {price, canBeSold}
		*/
		buildPriceMap(containerHrids, initData) {
			const priceMap = {};
			const processedItems = /* @__PURE__ */ new Set();
			for (const containerHrid of containerHrids) {
				const dropTable = initData.openableLootDropMap[containerHrid];
				if (!dropTable) continue;
				for (const drop of dropTable) {
					const itemHrid = drop.itemHrid;
					if (processedItems.has(itemHrid)) continue;
					processedItems.add(itemHrid);
					priceMap[itemHrid] = {
						price: this.getDropPrice(itemHrid),
						canBeSold: src_core_data_manager_js.default.getItemDetails(itemHrid)?.isTradable !== false
					};
				}
			}
			return priceMap;
		}
		/**
		* Calculate expected value for a single container
		* @param {string} containerHrid - Container item HRID
		* @param {Object} initData - Cached game data (optional, will fetch if not provided)
		* @returns {number|null} Expected value or null if unavailable
		*/
		calculateSingleContainer(containerHrid, initData = null) {
			if (!initData) initData = src_core_data_manager_js.default.getInitClientData();
			if (!initData || !initData.openableLootDropMap) return null;
			const dropTable = initData.openableLootDropMap[containerHrid];
			if (!dropTable || dropTable.length === 0) return null;
			let totalExpectedValue = 0;
			let _missingDataCount = 0;
			for (const drop of dropTable) {
				const itemHrid = drop.itemHrid;
				const dropRate = drop.dropRate || 0;
				const minCount = drop.minCount || 0;
				const maxCount = drop.maxCount || 0;
				if (dropRate <= 0 || minCount === 0 && maxCount === 0) continue;
				const avgCount = (minCount + maxCount) / 2;
				const price = this.getDropPrice(itemHrid);
				if (price === null) {
					_missingDataCount++;
					continue;
				}
				const canBeSold = src_core_data_manager_js.default.getItemDetails(itemHrid)?.isTradable !== false;
				const dropValue = itemHrid === this.COIN_HRID ? avgCount * dropRate * price : canBeSold ? calculatePriceAfterTax(avgCount * dropRate * price, this.MARKET_TAX) : avgCount * dropRate * price;
				totalExpectedValue += dropValue;
			}
			if (totalExpectedValue > 0) this.containerCache.set(containerHrid, totalExpectedValue);
			return totalExpectedValue;
		}
		/**
		* Get price for a drop item
		* Handles special cases (Coin, Cowbell, Dungeon Tokens, nested containers)
		* @param {string} itemHrid - Item HRID
		* @returns {number|null} Price or null if unavailable
		*/
		getDropPrice(itemHrid) {
			if (itemHrid === this.COIN_HRID) return 1;
			if (itemHrid === this.COWBELL_HRID) {
				if (!src_core_config_js.default.getSetting("expectedValue_includeCowbells")) return 0;
				const bagValue = getItemPrice(this.COWBELL_BAG_HRID, {
					context: "profit",
					side: "sell"
				}) || 0;
				if (bagValue > 0) return calculatePriceAfterTax(bagValue, .18) / 10;
				return null;
			}
			if (this.DUNGEON_TOKENS.includes(itemHrid)) return calculateDungeonTokenValue(itemHrid, "profitCalc_pricingMode", "expectedValue_respectPricingMode");
			if (this.containerCache.has(itemHrid)) return this.containerCache.get(itemHrid);
			const dropPrice = getItemPrice(itemHrid, {
				enhancementLevel: 0,
				context: "profit",
				side: "sell"
			});
			return dropPrice > 0 ? dropPrice : null;
		}
		/**
		* Calculate expected value for an openable container
		* @param {string} itemHrid - Container item HRID
		* @returns {Object|null} EV data or null
		*/
		calculateExpectedValue(itemHrid) {
			if (!this.isInitialized) {
				console.warn("[ExpectedValueCalculator] Not initialized");
				return null;
			}
			const itemDetails = src_core_data_manager_js.default.getItemDetails(itemHrid);
			if (!itemDetails) return null;
			if (!itemDetails.isOpenable) return null;
			const drops = this.getDropBreakdown(itemHrid);
			const expectedReturn = drops.reduce((sum, drop) => sum + drop.expectedValue, 0);
			return {
				itemName: itemDetails.name,
				itemHrid,
				expectedValue: expectedReturn,
				drops
			};
		}
		/**
		* Get cached expected value for a container (for use by other modules)
		* @param {string} itemHrid - Container item HRID
		* @returns {number|null} Cached EV or null
		*/
		getCachedValue(itemHrid) {
			return this.containerCache.get(itemHrid) || null;
		}
		/**
		* Get detailed drop breakdown for display
		* @param {string} containerHrid - Container HRID
		* @returns {Array} Array of drop objects
		*/
		getDropBreakdown(containerHrid) {
			const initData = src_core_data_manager_js.default.getInitClientData();
			if (!initData || !initData.openableLootDropMap) return [];
			const dropTable = initData.openableLootDropMap[containerHrid];
			if (!dropTable) return [];
			const drops = [];
			for (const drop of dropTable) {
				const itemHrid = drop.itemHrid;
				const dropRate = drop.dropRate || 0;
				const minCount = drop.minCount || 0;
				const maxCount = drop.maxCount || 0;
				if (dropRate <= 0) continue;
				const itemDetails = src_core_data_manager_js.default.getItemDetails(itemHrid);
				if (!itemDetails) continue;
				const avgCount = (minCount + maxCount) / 2;
				const price = this.getDropPrice(itemHrid);
				const itemCanBeSold = itemDetails.isTradable !== false;
				const isCoin = itemHrid === this.COIN_HRID;
				const dropValue = price !== null ? isCoin ? avgCount * dropRate * price : itemCanBeSold ? calculatePriceAfterTax(avgCount * dropRate * price, this.MARKET_TAX) : avgCount * dropRate * price : 0;
				drops.push({
					itemHrid,
					itemName: itemDetails.name,
					dropRate,
					avgCount,
					priceEach: price || 0,
					expectedValue: dropValue,
					hasPriceData: price !== null
				});
			}
			drops.sort((a, b) => b.expectedValue - a.expectedValue);
			return drops;
		}
		/**
		* Invalidate cache (call when market data refreshes)
		*/
		invalidateCache() {
			this.containerCache.clear();
			this.isInitialized = false;
			if (src_core_data_manager_js.default.getInitClientData() && src_api_marketplace_js.default.isLoaded()) this.initialize();
		}
		/**
		* Cleanup calculator state and handlers
		*/
		cleanup() {
			if (this.retryHandler) {
				src_core_data_manager_js.default.off("character_initialized", this.retryHandler);
				this.retryHandler = null;
			}
			this.containerCache.clear();
			this.isInitialized = false;
		}
		disable() {
			this.cleanup();
		}
	};
	var expectedValueCalculator = new ExpectedValueCalculator();
	//#endregion
	//#region src/utils/bonus-revenue-calculator.js
	/**
	* Bonus Revenue Calculator Utility
	* Calculates revenue from essence and rare find drops
	* Shared by both gathering and production profit calculators
	*/
	var bonus_revenue_calculator_exports = /* @__PURE__ */ __exportAll({ calculateBonusRevenue: () => calculateBonusRevenue });
	/**
	* Calculate bonus revenue from essence and rare find drops
	* @param {Object} actionDetails - Action details from game data
	* @param {number} actionsPerHour - Base actions per hour (efficiency not applied)
	* @param {Map} characterEquipment - Equipment map
	* @param {Object} itemDetailMap - Item details map
	* @returns {Object} Bonus revenue data with essence and rare find drops
	*/
	function calculateBonusRevenue(actionDetails, actionsPerHour, characterEquipment, itemDetailMap) {
		const essenceFindBonus = parseEssenceFindBonus(characterEquipment, itemDetailMap);
		const equipmentRareFindBonus = parseRareFindBonus(characterEquipment, actionDetails.type, itemDetailMap);
		const houseRareFindBonus = calculateHouseRareFind();
		const achievementRareFindBonus = src_core_data_manager_js.default.getAchievementBuffFlatBoost(actionDetails.type, "/buff_types/rare_find") * 100;
		const personalRareFindBonus = src_core_data_manager_js.default.getPersonalBuffFlatBoost(actionDetails.type, "/buff_types/rare_find") * 100;
		const guildBuffs = src_core_data_manager_js.default.characterData?.guildActionTypeBuffsMap?.[actionDetails.type] || [];
		const guildRareFindBonus = guildBuffs.reduce((sum, b) => b.typeHrid === "/buff_types/rare_find" ? sum + (b.flatBoost || 0) + (b.ratioBoost || 0) : sum, 0) * 100;
		const totalEssenceFindBonus = essenceFindBonus + guildBuffs.reduce((sum, b) => b.typeHrid === "/buff_types/essence_find" ? sum + (b.flatBoost || 0) + (b.ratioBoost || 0) : sum, 0) * 100;
		const rareFindBonus = equipmentRareFindBonus + houseRareFindBonus + achievementRareFindBonus + personalRareFindBonus + guildRareFindBonus;
		const rareFindBreakdown = {
			equipment: equipmentRareFindBonus,
			equipmentItems: parseRareFindBreakdown(characterEquipment, actionDetails.type, itemDetailMap),
			house: houseRareFindBonus,
			achievement: achievementRareFindBonus,
			personal: personalRareFindBonus,
			guild: guildRareFindBonus
		};
		const bonusDrops = [];
		let totalBonusRevenue = 0;
		let hasMissingPrices = false;
		if (actionDetails.essenceDropTable && actionDetails.essenceDropTable.length > 0) for (const drop of actionDetails.essenceDropTable) {
			const itemDetails = itemDetailMap[drop.itemHrid];
			if (!itemDetails) continue;
			const avgCount = (drop.minCount + drop.maxCount) / 2;
			const finalDropRate = drop.dropRate * (1 + totalEssenceFindBonus / 100);
			const dropsPerHour = actionsPerHour * finalDropRate * avgCount;
			let itemPrice = 0;
			let isMissingPrice = false;
			if (itemDetails.isOpenable) {
				itemPrice = expectedValueCalculator.getCachedValue(drop.itemHrid) || expectedValueCalculator.calculateSingleContainer(drop.itemHrid) || 0;
				if (itemPrice === 0) {
					console.warn(`[BonusRevenue] EV lookup returned 0 for openable container: ${drop.itemHrid}`);
					isMissingPrice = true;
				}
			} else {
				const price = src_api_marketplace_js.default.getPrice(drop.itemHrid, 0);
				itemPrice = price?.bid ?? 0;
				isMissingPrice = price?.bid === null || price?.bid === void 0;
			}
			const revenuePerHour = dropsPerHour * itemPrice;
			const dropsPerAction = actionsPerHour > 0 ? dropsPerHour / actionsPerHour : 0;
			const revenuePerAction = actionsPerHour > 0 ? revenuePerHour / actionsPerHour : 0;
			bonusDrops.push({
				itemHrid: drop.itemHrid,
				itemName: itemNameTranslator.getDisplayName(drop.itemHrid),
				dropRate: finalDropRate,
				dropsPerHour,
				dropsPerAction,
				priceEach: itemPrice,
				revenuePerHour,
				revenuePerAction,
				type: "essence",
				missingPrice: isMissingPrice
			});
			totalBonusRevenue += revenuePerHour;
			if (isMissingPrice) hasMissingPrices = true;
		}
		if (actionDetails.rareDropTable && actionDetails.rareDropTable.length > 0) for (const drop of actionDetails.rareDropTable) {
			const itemDetails = itemDetailMap[drop.itemHrid];
			if (!itemDetails) continue;
			const avgCount = (drop.minCount + drop.maxCount) / 2;
			const finalDropRate = drop.dropRate * (1 + rareFindBonus / 100);
			const dropsPerHour = actionsPerHour * finalDropRate * avgCount;
			let itemPrice = 0;
			let isMissingPrice = false;
			if (itemDetails.isOpenable) {
				itemPrice = expectedValueCalculator.getCachedValue(drop.itemHrid) || expectedValueCalculator.calculateSingleContainer(drop.itemHrid) || 0;
				if (itemPrice === 0) {
					console.warn(`[BonusRevenue] EV lookup returned 0 for openable container: ${drop.itemHrid}`);
					isMissingPrice = true;
				}
			} else {
				const price = src_api_marketplace_js.default.getPrice(drop.itemHrid, 0);
				itemPrice = price?.bid ?? 0;
				isMissingPrice = price?.bid === null || price?.bid === void 0;
			}
			const revenuePerHour = dropsPerHour * itemPrice;
			const dropsPerAction = actionsPerHour > 0 ? dropsPerHour / actionsPerHour : 0;
			const revenuePerAction = actionsPerHour > 0 ? revenuePerHour / actionsPerHour : 0;
			bonusDrops.push({
				itemHrid: drop.itemHrid,
				itemName: itemNameTranslator.getDisplayName(drop.itemHrid),
				dropRate: finalDropRate,
				dropsPerHour,
				dropsPerAction,
				priceEach: itemPrice,
				revenuePerHour,
				revenuePerAction,
				type: "rare_find",
				missingPrice: isMissingPrice
			});
			totalBonusRevenue += revenuePerHour;
			if (isMissingPrice) hasMissingPrices = true;
		}
		return {
			essenceFindBonus: totalEssenceFindBonus,
			rareFindBonus,
			rareFindBreakdown,
			bonusDrops,
			totalBonusRevenue,
			hasMissingPrices
		};
	}
	//#endregion
	//#region src/utils/experience-parser.js
	/**
	* Experience Parser Utility
	* Parses wisdom and experience bonuses from all sources
	*
	* Experience Formula (Skilling):
	* Final XP = Base XP × (1 + Wisdom + Charm Experience)
	*
	* Where Wisdom and Charm Experience are ADDITIVE
	*/
	var experience_parser_exports = /* @__PURE__ */ __exportAll({
		calculateExperienceMultiplier: () => calculateExperienceMultiplier,
		default: () => experience_parser_default,
		parseCharmExperience: () => parseCharmExperience,
		parseCommunityBuffWisdom: () => parseCommunityBuffWisdom,
		parseConsumableWisdom: () => parseConsumableWisdom,
		parseEquipmentWisdom: () => parseEquipmentWisdom,
		parseHouseRoomWisdom: () => parseHouseRoomWisdom,
		parseMooPassWisdom: () => parseMooPassWisdom
	});
	/**
	* Parse equipment wisdom bonus (skillingExperience stat)
	* @param {Map} equipment - Character equipment map
	* @param {Object} itemDetailMap - Item details from game data
	* @returns {Object} {total: number, breakdown: Array} Total wisdom and item breakdown
	*/
	function parseEquipmentWisdom(equipment, itemDetailMap) {
		let totalWisdom = 0;
		const breakdown = [];
		for (const [_slot, item] of equipment) {
			const itemDetails = itemDetailMap[item.itemHrid];
			if (!itemDetails?.equipmentDetail) continue;
			const baseWisdom = (itemDetails.equipmentDetail.noncombatStats || {}).skillingExperience || 0;
			if (baseWisdom === 0) continue;
			const enhancementLevel = item.enhancementLevel || 0;
			const itemWisdom = baseWisdom * getEnhancementMultiplier(itemDetails, enhancementLevel) * 100;
			totalWisdom += itemWisdom;
			breakdown.push({
				name: itemDetails.name,
				value: itemWisdom,
				enhancementLevel
			});
		}
		return {
			total: totalWisdom,
			breakdown
		};
	}
	/**
	* Parse skill-specific charm experience (e.g., foragingExperience)
	* @param {Map} equipment - Character equipment map
	* @param {string} skillHrid - Skill HRID (e.g., "/skills/foraging")
	* @param {Object} itemDetailMap - Item details from game data
	* @returns {Object} {total: number, breakdown: Array} Total charm XP and item breakdown
	*/
	function parseCharmExperience(equipment, skillHrid, itemDetailMap) {
		let totalCharmXP = 0;
		const breakdown = [];
		const statName = `${skillHrid.replace("/skills/", "")}Experience`;
		for (const [_slot, item] of equipment) {
			const itemDetails = itemDetailMap[item.itemHrid];
			if (!itemDetails?.equipmentDetail) continue;
			const baseCharmXP = (itemDetails.equipmentDetail.noncombatStats || {})[statName] || 0;
			if (baseCharmXP === 0) continue;
			const enhancementLevel = item.enhancementLevel || 0;
			const itemCharmXP = baseCharmXP * getEnhancementMultiplier(itemDetails, enhancementLevel) * 100;
			totalCharmXP += itemCharmXP;
			breakdown.push({
				name: itemDetails.name,
				value: itemCharmXP,
				enhancementLevel
			});
		}
		return {
			total: totalCharmXP,
			breakdown
		};
	}
	/**
	* Parse house room wisdom bonus
	* All house rooms provide +0.05% wisdom per level
	* @returns {number} Total wisdom from house rooms (e.g., 0.4 for 8 total levels)
	*/
	function parseHouseRoomWisdom() {
		const houseRooms = src_core_data_manager_js.default.getHouseRooms();
		if (!houseRooms || houseRooms.size === 0) return 0;
		let totalLevels = 0;
		for (const [_hrid, room] of houseRooms) totalLevels += room.level || 0;
		return totalLevels * .05;
	}
	/**
	* Parse community buff wisdom bonus
	* Formula: 20% + ((level - 1) × 0.5%)
	* @returns {number} Wisdom percentage from community buff (e.g., 29.5 for T20)
	*/
	function parseCommunityBuffWisdom() {
		const buffLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/experience");
		if (!buffLevel) return 0;
		return 20 + (buffLevel - 1) * .5;
	}
	/**
	* Parse MooPass wisdom bonus
	* MooPass provides a flat 5% wisdom boost
	* @returns {number} Wisdom percentage from MooPass (5% if active, 0 if not)
	*/
	function parseMooPassWisdom() {
		const mooPassBuffs = src_core_data_manager_js.default.getMooPassBuffs();
		if (!mooPassBuffs || mooPassBuffs.length === 0) return 0;
		const wisdomBuff = mooPassBuffs.find((buff) => buff.typeHrid === "/buff_types/wisdom");
		if (!wisdomBuff || !wisdomBuff.flatBoost) return 0;
		return wisdomBuff.flatBoost * 100;
	}
	/**
	* Parse wisdom from active consumables (Wisdom Tea/Coffee)
	* @param {Array} drinkSlots - Active drink slots for the action type
	* @param {Object} itemDetailMap - Item details from game data
	* @param {number} drinkConcentration - Drink concentration bonus (e.g., 12.16 for 12.16%)
	* @returns {number} Wisdom percentage from consumables (e.g., 13.46 for 12% × 1.1216)
	*/
	function parseConsumableWisdom(drinkSlots, itemDetailMap, drinkConcentration) {
		if (!drinkSlots || drinkSlots.length === 0) return 0;
		let totalWisdom = 0;
		for (const drink of drinkSlots) {
			if (!drink || !drink.itemHrid) continue;
			const itemDetails = itemDetailMap[drink.itemHrid];
			if (!itemDetails?.consumableDetail) continue;
			const buffs = itemDetails.consumableDetail.buffs || [];
			for (const buff of buffs) if (buff.typeHrid === "/buff_types/wisdom" && buff.flatBoost) {
				const scaledWisdom = buff.flatBoost * 100 * (1 + drinkConcentration / 100);
				totalWisdom += scaledWisdom;
			}
		}
		return totalWisdom;
	}
	/**
	* Calculate total experience multiplier and breakdown
	* @param {string} skillHrid - Skill HRID (e.g., "/skills/foraging")
	* @param {string} actionTypeHrid - Action type HRID (e.g., "/action_types/foraging")
	* @returns {Object} Experience data with breakdown
	*/
	function calculateExperienceMultiplier(skillHrid, actionTypeHrid) {
		const { equipment, drinks: activeDrinks } = resolveActionContext(actionTypeHrid);
		const itemDetailMap = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap || {};
		const drinkConcentration = equipment ? calculateDrinkConcentration(equipment, itemDetailMap) : 0;
		const equipmentWisdomData = parseEquipmentWisdom(equipment, itemDetailMap);
		const equipmentWisdom = equipmentWisdomData.total;
		const houseWisdom = parseHouseRoomWisdom();
		const communityWisdom = parseCommunityBuffWisdom();
		const consumableWisdom = parseConsumableWisdom(activeDrinks, itemDetailMap, drinkConcentration);
		const achievementWisdom = src_core_data_manager_js.default.getAchievementBuffFlatBoost(actionTypeHrid, "/buff_types/wisdom") * 100;
		const mooPassWisdom = parseMooPassWisdom();
		const personalWisdom = src_core_data_manager_js.default.getPersonalBuffFlatBoost(actionTypeHrid, "/buff_types/wisdom") * 100;
		const guildWisdom = (src_core_data_manager_js.default.characterData?.guildActionTypeBuffsMap?.[actionTypeHrid] || []).reduce((sum, b) => b.typeHrid === "/buff_types/wisdom" ? sum + (b.flatBoost || 0) + (b.ratioBoost || 0) : sum, 0) * 100;
		const totalWisdom = equipmentWisdom + houseWisdom + communityWisdom + consumableWisdom + achievementWisdom + mooPassWisdom + personalWisdom + guildWisdom;
		const charmData = parseCharmExperience(equipment, skillHrid, itemDetailMap);
		const charmExperience = charmData.total;
		return {
			totalMultiplier: 1 + totalWisdom / 100 + charmExperience / 100,
			totalWisdom,
			charmExperience,
			charmBreakdown: charmData.breakdown,
			wisdomBreakdown: equipmentWisdomData.breakdown,
			breakdown: {
				equipmentWisdom,
				houseWisdom,
				communityWisdom,
				consumableWisdom,
				achievementWisdom,
				mooPassWisdom,
				personalWisdom,
				guildWisdom,
				charmExperience
			}
		};
	}
	/**
	* Calculate drink concentration from Guzzling Pouch
	* @param {Map} equipment - Character equipment map
	* @param {Object} itemDetailMap - Item details from game data
	* @returns {number} Drink concentration percentage (e.g., 12.16 for 12.16%)
	*/
	function calculateDrinkConcentration(equipment, itemDetailMap) {
		const pouchItem = equipment.get("/item_locations/pouch");
		if (!pouchItem || !pouchItem.itemHrid.includes("guzzling_pouch")) return 0;
		const itemDetails = itemDetailMap[pouchItem.itemHrid];
		if (!itemDetails?.equipmentDetail) return 0;
		const baseDrinkConcentration = (itemDetails.equipmentDetail.noncombatStats || {}).drinkConcentration || 0;
		if (baseDrinkConcentration === 0) return 0;
		return baseDrinkConcentration * getEnhancementMultiplier(itemDetails, pouchItem.enhancementLevel || 0) * 100;
	}
	var experience_parser_default = {
		parseEquipmentWisdom,
		parseCharmExperience,
		parseHouseRoomWisdom,
		parseCommunityBuffWisdom,
		parseMooPassWisdom,
		parseConsumableWisdom,
		calculateExperienceMultiplier
	};
	//#endregion
	//#region src/utils/market-listings.js
	var market_listings_exports = /* @__PURE__ */ __exportAll({ mergeMarketListings: () => mergeMarketListings });
	/**
	* Merge market listing updates into the current list.
	* @param {Array} currentListings - Existing market listings.
	* @param {Array} updatedListings - Updated listings from WebSocket.
	* @returns {Array} New merged listings array.
	*/
	var mergeMarketListings = (currentListings = [], updatedListings = []) => {
		const safeCurrent = Array.isArray(currentListings) ? currentListings : [];
		const safeUpdates = Array.isArray(updatedListings) ? updatedListings : [];
		if (safeUpdates.length === 0) return [...safeCurrent];
		const indexById = /* @__PURE__ */ new Map();
		safeCurrent.forEach((listing, index) => {
			if (!listing || listing.id === void 0 || listing.id === null) return;
			indexById.set(listing.id, index);
		});
		const merged = [...safeCurrent];
		for (const listing of safeUpdates) {
			if (!listing || listing.id === void 0 || listing.id === null) continue;
			const existingIndex = indexById.get(listing.id);
			if (existingIndex !== void 0) merged[existingIndex] = listing;
			else merged.push(listing);
		}
		return merged.filter((listing) => {
			if (!listing) return false;
			if (listing.status === "/market_listing_status/cancelled" || listing.status === "/market_listing_status/expired") return false;
			if (listing.status === "/market_listing_status/filled" && (listing.unclaimedItemCount || 0) === 0 && (listing.unclaimedCoinCount || 0) === 0) return false;
			return true;
		});
	};
	//#endregion
	//#region src/utils/action-calculator.js
	/**
	* Action Calculator
	* Shared calculation logic for action time and efficiency
	* Used by action-time-display.js and quick-input-buttons.js
	*/
	var action_calculator_exports = /* @__PURE__ */ __exportAll({ calculateActionStats: () => calculateActionStats });
	/**
	* Calculate complete action statistics (time + efficiency)
	* @param {Object} actionDetails - Action detail object from game data
	* @param {Object} options - Configuration options
	* @param {Array} options.skills - Character skills array
	* @param {Array} options.equipment - Character equipment array
	* @param {Object} options.itemDetailMap - Item detail map from game data
	* @param {string} options.actionHrid - Action HRID for task detection (optional)
	* @param {boolean} options.includeCommunityBuff - Include community buff in efficiency (default: false)
	* @param {boolean} options.includeBreakdown - Include detailed breakdown data (default: false)
	* @param {number} options.levelRequirementOverride - Override base level requirement (e.g., item level for alchemy)
	* @returns {Object} { actionTime, totalEfficiency, breakdown? }
	*/
	function calculateActionStats(actionDetails, options = {}) {
		const { skills, equipment, itemDetailMap, actionHrid, includeCommunityBuff = false, includeBreakdown = false, levelRequirementOverride } = options;
		try {
			const baseTime = actionDetails.baseTimeCost / 1e9;
			const speedBonus = parseEquipmentSpeedBonuses(equipment, actionDetails.type, itemDetailMap);
			const personalSpeedBonus = src_core_data_manager_js.default.getPersonalBuffFlatBoost(actionDetails.type, "/buff_types/action_speed");
			const guildBuffs = src_core_data_manager_js.default.characterData?.guildActionTypeBuffsMap?.[actionDetails.type] || [];
			const guildSpeedBonus = guildBuffs.reduce((sum, b) => b.typeHrid === "/buff_types/action_speed" ? sum + (b.flatBoost || 0) + (b.ratioBoost || 0) : sum, 0);
			const guildEfficiency = guildBuffs.reduce((sum, b) => b.typeHrid === "/buff_types/efficiency" ? sum + ((b.flatBoost || 0) + (b.ratioBoost || 0)) * 100 : sum, 0);
			let actionTime = baseTime / (1 + speedBonus + personalSpeedBonus + guildSpeedBonus);
			if (actionHrid && src_core_data_manager_js.default.isTaskAction(actionHrid)) {
				const taskSpeedBonus = src_core_data_manager_js.default.getTaskSpeedBonus();
				actionTime = actionTime / (1 + taskSpeedBonus / 100);
			}
			actionTime = Math.max(3, actionTime);
			const skillLevel = getSkillLevel(skills, actionDetails.type);
			const baseRequirement = levelRequirementOverride ?? actionDetails.levelRequirement?.level ?? 1;
			const drinkConcentration = getDrinkConcentration(equipment, itemDetailMap);
			const activeDrinks = resolveActionContext(actionDetails.type).drinks;
			const actionLevelBonus = parseActionLevelBonus(activeDrinks, itemDetailMap, drinkConcentration);
			let actionLevelBreakdown = null;
			if (includeBreakdown) actionLevelBreakdown = parseActionLevelBonusBreakdown(activeDrinks, itemDetailMap, drinkConcentration);
			const effectiveRequirement = baseRequirement + actionLevelBonus;
			const effectiveLevel = skillLevel + parseTeaSkillLevelBonus(actionDetails.type, activeDrinks, itemDetailMap, drinkConcentration);
			const levelEfficiency = Math.max(0, effectiveLevel - effectiveRequirement);
			const houseEfficiency = calculateHouseEfficiency(actionDetails.type);
			const equipmentEfficiency = parseEquipmentEfficiencyBonuses(equipment, actionDetails.type, itemDetailMap);
			const achievementEfficiency = src_core_data_manager_js.default.getAchievementBuffFlatBoost(actionDetails.type, "/buff_types/efficiency") * 100;
			const personalEfficiency = src_core_data_manager_js.default.getPersonalBuffFlatBoost(actionDetails.type, "/buff_types/efficiency") * 100;
			let teaEfficiency;
			let teaBreakdown = null;
			if (includeBreakdown) {
				teaBreakdown = parseTeaEfficiencyBreakdown(actionDetails.type, activeDrinks, itemDetailMap, drinkConcentration);
				teaEfficiency = teaBreakdown.reduce((sum, tea) => sum + tea.efficiency, 0);
			} else teaEfficiency = parseTeaEfficiency(actionDetails.type, activeDrinks, itemDetailMap, drinkConcentration);
			let communityEfficiency = 0;
			if (includeCommunityBuff) {
				if ([
					"/action_types/alchemy",
					"/action_types/brewing",
					"/action_types/cheesesmithing",
					"/action_types/cooking",
					"/action_types/crafting",
					"/action_types/tailoring"
				].includes(actionDetails.type)) {
					const communityBuffLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/production_efficiency");
					communityEfficiency = communityBuffLevel ? (.14 + (communityBuffLevel - 1) * .003) * 100 : 0;
				}
			}
			const totalEfficiency = stackAdditive(levelEfficiency, houseEfficiency, equipmentEfficiency, teaEfficiency, communityEfficiency, achievementEfficiency, personalEfficiency, guildEfficiency);
			const result = {
				actionTime,
				totalEfficiency
			};
			if (includeBreakdown) result.efficiencyBreakdown = {
				levelEfficiency,
				houseEfficiency,
				equipmentEfficiency,
				teaEfficiency,
				teaBreakdown,
				communityEfficiency,
				achievementEfficiency,
				personalEfficiency,
				guildEfficiency,
				skillLevel,
				baseRequirement,
				actionLevelBonus,
				actionLevelBreakdown,
				effectiveRequirement
			};
			return result;
		} catch (error) {
			console.error("[Action Calculator] Error calculating action stats:", error);
			return null;
		}
	}
	/**
	* Get character skill level for a skill type
	* @param {Array} skills - Character skills array
	* @param {string} skillType - Skill type HRID (e.g., "/action_types/cheesesmithing")
	* @returns {number} Skill level
	*/
	function getSkillLevel(skills, skillType) {
		if (skillType === "/action_types/combat" || skillType === "/action_types/labyrinth") return 1;
		const skillHrid = skillType.replace("/action_types/", "/skills/");
		const skill = skills.find((s) => s.skillHrid === skillHrid);
		if (!skill) console.error(`[ActionCalculator] Skill not found: ${skillHrid}`);
		return skill?.level || 1;
	}
	//#endregion
	//#region src/utils/action-panel-helper.js
	var action_panel_helper_exports = /* @__PURE__ */ __exportAll({
		attachInputListeners: () => attachInputListeners,
		findActionInput: () => findActionInput,
		performInitialUpdate: () => performInitialUpdate
	});
	/**
	* Action Panel Display Helper
	* Utilities for working with action detail panels (gathering, production, enhancement)
	*/
	/**
	* Find the action count input field within a panel
	* @param {HTMLElement} panel - The action detail panel
	* @returns {HTMLInputElement|null} The input element or null if not found
	*/
	function findActionInput(panel) {
		const inputContainer = panel.querySelector("[class*=\"maxActionCountInput\"]");
		if (!inputContainer) return null;
		return inputContainer.querySelector("input") || null;
	}
	/**
	* Attach input listeners to an action panel for tracking value changes
	* Sets up three listeners:
	* - keyup: For manual typing
	* - input: For quick input button clicks (React dispatches input events)
	* - panel click: For any panel interactions with 50ms delay
	*
	* @param {HTMLElement} panel - The action detail panel
	* @param {HTMLInputElement} input - The input element
	* @param {Function} updateCallback - Callback function(value) called on input changes
	* @param {Object} options - Optional configuration
	* @param {number} options.clickDelay - Delay in ms for panel click handler (default: 50)
	* @returns {Function} Cleanup function to remove all listeners
	*/
	function attachInputListeners(panel, input, updateCallback, options = {}) {
		const { clickDelay = 50 } = options;
		const updateHandler = () => {
			updateCallback(input.value);
		};
		const panelClickHandler = (event) => {
			if (event.target === input) return;
			setTimeout(() => {
				updateCallback(input.value);
			}, clickDelay);
		};
		input.addEventListener("keyup", updateHandler);
		input.addEventListener("input", updateHandler);
		panel.addEventListener("click", panelClickHandler);
		return () => {
			input.removeEventListener("keyup", updateHandler);
			input.removeEventListener("input", updateHandler);
			panel.removeEventListener("click", panelClickHandler);
		};
	}
	/**
	* Perform initial update if input already has a valid value
	* @param {HTMLInputElement} input - The input element
	* @param {Function} updateCallback - Callback function(value) called if valid
	* @returns {boolean} True if initial update was performed
	*/
	function performInitialUpdate(input, updateCallback) {
		if (input.value) {
			updateCallback(input.value);
			return true;
		}
		return false;
	}
	//#endregion
	//#region src/utils/buff-parser.js
	/**
	* Buff Parser Utilities
	* Parse active buffs from character data
	*/
	var buff_parser_exports = /* @__PURE__ */ __exportAll({ getAlchemySuccessBonus: () => getAlchemySuccessBonus });
	/**
	* Get alchemy success rate bonus from active buffs
	* @returns {number} Alchemy success rate bonus (0-1, e.g., 0.087 for 8.7% multiplicative bonus)
	*/
	function getAlchemySuccessBonus() {
		try {
			const characterData = src_core_data_manager_js.default.characterData;
			if (!characterData || !characterData.consumableActionTypeBuffsMap) return 0;
			const alchemyBuffs = characterData.consumableActionTypeBuffsMap["/action_types/alchemy"];
			if (!Array.isArray(alchemyBuffs)) return 0;
			let bonus = 0;
			for (const buff of alchemyBuffs) if (buff.typeHrid === "/buff_types/alchemy_success") bonus += buff.ratioBoost || 0;
			return bonus;
		} catch (error) {
			console.error("[BuffParser] Failed to get alchemy success bonus:", error);
			return 0;
		}
	}
	//#endregion
	//#region src/utils/selectors.js
	var selectors_exports = /* @__PURE__ */ __exportAll({
		COMBAT_SIM: () => COMBAT_SIM,
		ENHANCEMENT: () => ENHANCEMENT,
		GAME: () => GAME,
		TOOLASHA: () => TOOLASHA
	});
	/**
	* DOM Selector Constants
	* Centralized selector strings for querying game elements
	* If game class names change, update here only
	*/
	/**
	* Game UI Selectors (class names from game code)
	*/
	var GAME = {
		TOTAL_LEVEL: "[class*=\"Header_totalLevel\"]",
		SETTINGS_PANEL_TITLE: "[class*=\"SettingsPanel_title\"]",
		SETTINGS_TABS_CONTAINER: "div[class*=\"SettingsPanel_tabsComponentContainer\"]",
		TABS_FLEX_CONTAINER: "[class*=\"MuiTabs-flexContainer\"]",
		TAB_PANELS_CONTAINER: "[class*=\"TabsComponent_tabPanelsContainer\"]",
		TAB_PANEL: "[class*=\"TabPanel_tabPanel\"]",
		GAME_PANEL: "div[class*=\"GamePage_gamePanel\"]",
		SKILL_ACTION_DETAIL: "[class*=\"SkillActionDetail_skillActionDetail\"]",
		SKILL_ACTION_NAME: "[class*=\"SkillActionDetail_name\"]",
		ENHANCING_COMPONENT: "div.SkillActionDetail_enhancingComponent__17bOx",
		QUEUED_ACTIONS: "[class*=\"QueuedActions_action\"]",
		MAX_ACTION_COUNT_INPUT: "[class*=\"maxActionCountInput\"]",
		TASK_PANEL: "[class*=\"TasksPanel_taskSlotCount\"]",
		TASK_LIST: "[class*=\"TasksPanel_taskList\"]",
		TASK_CARD: "[class*=\"RandomTask_randomTask\"]",
		TASK_NAME: "[class*=\"RandomTask_name\"]",
		TASK_INFO: ".RandomTask_taskInfo__1uasf",
		TASK_ACTION: ".RandomTask_action__3eC6o",
		TASK_REWARDS: ".RandomTask_rewards__YZk7D",
		TASK_CONTENT: "[class*=\"RandomTask_content\"]",
		TASK_NAME_DIV: "div[class*=\"RandomTask_name\"]",
		HOUSE_HEADER: "[class*=\"HousePanel_header\"]",
		HOUSE_COSTS: "[class*=\"HousePanel_costs\"]",
		HOUSE_ITEM_REQUIREMENTS: "[class*=\"HousePanel_itemRequirements\"]",
		LOOT_LOG_CONTAINER: ".LootLogPanel_actionLoots__3oTid",
		LOOT_LOG_ENTRY: ".LootLogPanel_actionLoot__32gl_",
		INVENTORY_ITEMS: "[class*=\"Inventory_items\"]",
		INVENTORY_CATEGORY_BUTTON: ".Inventory_categoryButton__35s1x",
		INVENTORY_LABEL: ".Inventory_label__XEOAx",
		ITEM_CONTAINER: ".Item_itemContainer__x7kH1",
		ITEM_ITEM: ".Item_item__2De2O",
		ITEM_COUNT: ".Item_count__1HVvv",
		ITEM_TOOLTIP_TEXT: ".ItemTooltipText_itemTooltipText__zFq3A",
		NAV_LEVEL: "[class*=\"NavigationBar_level\"]",
		NAV_CURRENT_EXPERIENCE: "[class*=\"NavigationBar_currentExperience\"]",
		PROTECTION_ITEM_INPUT: "[class*=\"protectionItemInputContainer\"]",
		MUI_TOOLTIP: ".MuiTooltip-tooltip"
	};
	/**
	* Toolasha-specific selectors (our injected elements)
	*/
	var TOOLASHA = {
		SETTINGS_TAB: "#toolasha-settings-tab",
		SETTING_WITH_DEPS: ".toolasha-setting[data-dependencies]",
		TASK_PROFIT: ".mwi-task-profit",
		REROLL_COST_DISPLAY: ".mwi-reroll-cost-display",
		TASK_STATS_BTN: ".toolasha-task-stats-btn",
		TASK_STATS_OVERLAY: ".toolasha-task-stats-overlay",
		QUEUE_TOTAL_TIME: "#mwi-queue-total-time",
		FORAGING_PROFIT: "#mwi-foraging-profit",
		PRODUCTION_PROFIT: "#mwi-production-profit",
		HOUSE_PRICING: ".mwi-house-pricing",
		HOUSE_PRICING_EMPTY: ".mwi-house-pricing-empty",
		HOUSE_TOTAL: ".mwi-house-total",
		HOUSE_TO_LEVEL: ".mwi-house-to-level",
		SCORE_CLOSE_BTN: "#mwi-score-close-btn",
		SCORE_TOGGLE: "#mwi-score-toggle",
		SCORE_DETAILS: "#mwi-score-details",
		HOUSE_TOGGLE: "#mwi-house-toggle",
		HOUSE_BREAKDOWN: "#mwi-house-breakdown",
		ABILITY_TOGGLE: "#mwi-ability-toggle",
		ABILITY_BREAKDOWN: "#mwi-ability-breakdown",
		EQUIPMENT_TOGGLE: "#mwi-equipment-toggle",
		EQUIPMENT_BREAKDOWN: "#mwi-equipment-breakdown",
		MARKET_PRICE_INJECTED: ".market-price-injected",
		MARKET_PROFIT_INJECTED: ".market-profit-injected",
		MARKET_EV_INJECTED: ".market-ev-injected",
		MARKET_ENHANCEMENT_INJECTED: ".market-enhancement-injected",
		ALCHEMY_DIMMED: ".mwi-alchemy-dimmed",
		EXP_PERCENTAGE: ".mwi-exp-percentage",
		STACK_PRICE: ".mwi-stack-price",
		NETWORTH_HEADER: ".mwi-networth-header",
		ENHANCEMENT_STATS: "#mwi-enhancement-stats",
		COLLAPSIBLE_SECTION: ".mwi-collapsible-section",
		EXPANDABLE_HEADER: ".mwi-expandable-header",
		SECTION_HEADER_NEXT: ".mwi-section-header + div",
		INSERTED_SPAN: ".insertedSpan",
		SCRIPT_INJECTED: ".script-injected",
		CONSUMABLE_STATS_INJECTED: ".consumable-stats-injected"
	};
	/**
	* Enhancement-specific input IDs
	*/
	var ENHANCEMENT = {
		TILL_LEVEL: "#tillLevel",
		TILL_LEVEL_INPUT: "#tillLevelInput",
		TILL_LEVEL_NUMBER: "#tillLevelNumber"
	};
	/**
	* Combat Sim Integration
	*/
	var COMBAT_SIM = {
		GROUP_COMBAT_TAB: "a#group-combat-tab",
		GET_PRICES_BUTTON: "button#buttonGetPrices"
	};
	//#endregion
	//#region src/utils/experience-calculator.js
	/**
	* Experience Calculator
	* Shared utility for calculating experience per hour across features
	*
	* Calculates accurate XP/hour including:
	* - Base experience from action
	* - Experience multipliers (Wisdom + Charm Experience)
	* - Action time with speed bonuses
	* - Efficiency repeats (critical for accuracy)
	*/
	var experience_calculator_exports = /* @__PURE__ */ __exportAll({
		calculateExpPerHour: () => calculateExpPerHour,
		calculateMultiLevelProgress: () => calculateMultiLevelProgress,
		default: () => experience_calculator_default
	});
	/**
	* Calculate experience per hour for an action
	* @param {string} actionHrid - The action HRID (e.g., "/actions/cheesesmithing/cheese")
	* @returns {Object|null} Experience data or null if not applicable
	*   {
	*     expPerHour: number,           // Total XP per hour (with all bonuses)
	*     baseExp: number,              // Base XP per action
	*     modifiedXP: number,           // XP per action after multipliers
	*     actionsPerHour: number,       // Actions per hour (with efficiency)
	*     xpMultiplier: number,         // Total XP multiplier (Wisdom + Charm)
	*     actionTime: number,           // Time per action in seconds
	*     totalEfficiency: number       // Total efficiency percentage
	*   }
	*/
	function calculateExpPerHour(actionHrid) {
		const actionDetails = src_core_data_manager_js.default.getActionDetails(actionHrid);
		if (!actionDetails || !actionDetails.experienceGain || !actionDetails.experienceGain.value) return null;
		const skills = src_core_data_manager_js.default.getSkills();
		const { equipment } = resolveActionContext(actionDetails.type);
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData || !skills || !equipment) return null;
		const stats = calculateActionStats(actionDetails, {
			skills,
			equipment,
			itemDetailMap: gameData.itemDetailMap,
			includeCommunityBuff: true,
			includeBreakdown: false
		});
		if (!stats) return null;
		const { actionTime, totalEfficiency } = stats;
		const actionsPerHourWithEfficiency = calculateEffectiveActionsPerHour(calculateActionsPerHour(actionTime), calculateEfficiencyMultiplier(totalEfficiency));
		const skillHrid = actionDetails.experienceGain.skillHrid;
		const xpData = calculateExperienceMultiplier(skillHrid, actionDetails.type);
		const baseExp = actionDetails.experienceGain.value;
		const modifiedXP = baseExp * xpData.totalMultiplier;
		const expPerHour = actionsPerHourWithEfficiency * modifiedXP;
		return {
			expPerHour: Math.floor(expPerHour),
			baseExp,
			modifiedXP,
			actionsPerHour: actionsPerHourWithEfficiency,
			xpMultiplier: xpData.totalMultiplier,
			actionTime,
			totalEfficiency
		};
	}
	/**
	* Calculate actions and time needed to reach a target level
	* Accounts for progressive efficiency gains (+1% per level)
	* @param {number} currentLevel - Current skill level
	* @param {number} currentXP - Current experience points
	* @param {number} targetLevel - Target skill level
	* @param {number} baseEfficiency - Starting efficiency percentage
	* @param {number} actionTime - Time per action in seconds
	* @param {number} xpPerAction - Modified XP per action (with multipliers, success rate, etc.)
	* @param {Object} levelExperienceTable - XP requirements per level
	* @returns {{ actionsNeeded: number, timeNeeded: number }}
	*/
	function calculateMultiLevelProgress(currentLevel, currentXP, targetLevel, baseEfficiency, actionTime, xpPerAction, levelExperienceTable) {
		let totalActions = 0;
		let totalTime = 0;
		for (let level = currentLevel; level < targetLevel; level++) {
			let xpNeeded;
			if (level === currentLevel) xpNeeded = levelExperienceTable[level + 1] - currentXP;
			else xpNeeded = levelExperienceTable[level + 1] - levelExperienceTable[level];
			const efficiencyMultiplier = 1 + (baseEfficiency + (level - currentLevel)) / 100;
			const xpPerPerformedAction = xpPerAction * efficiencyMultiplier;
			const baseActionsForLevel = Math.ceil(xpNeeded / xpPerPerformedAction);
			const actionsToQueue = Math.round(baseActionsForLevel * efficiencyMultiplier);
			totalActions += actionsToQueue;
			totalTime += baseActionsForLevel * actionTime;
		}
		return {
			actionsNeeded: totalActions,
			timeNeeded: totalTime
		};
	}
	var experience_calculator_default = {
		calculateExpPerHour,
		calculateMultiLevelProgress
	};
	//#endregion
	//#region src/utils/ability-cost-calculator.js
	/**
	* Ability Cost Calculator Utility
	* Calculates the cost to reach a specific ability level
	* Extracted from ability-book-calculator.js for reuse in combat score
	*/
	var ability_cost_calculator_exports = /* @__PURE__ */ __exportAll({
		calculateAbilityCost: () => calculateAbilityCost,
		calculateAbilityLevelUpCost: () => calculateAbilityLevelUpCost,
		isStarterAbility: () => isStarterAbility
	});
	/**
	* List of starter abilities that give 50 XP per book (others give 500)
	*/
	var STARTER_ABILITIES = [
		"poke",
		"scratch",
		"smack",
		"quick_shot",
		"water_strike",
		"fireball",
		"entangle",
		"minor_heal"
	];
	/**
	* Check if an ability is a starter ability (50 XP per book)
	* @param {string} abilityHrid - Ability HRID
	* @returns {boolean} True if starter ability
	*/
	function isStarterAbility(abilityHrid) {
		return STARTER_ABILITIES.some((skill) => abilityHrid.includes(skill));
	}
	/**
	* Calculate the cost to reach a specific ability level from level 0
	* @param {string} abilityHrid - Ability HRID (e.g., '/abilities/fireball')
	* @param {number} targetLevel - Target level to reach
	* @returns {number} Total cost in coins
	*/
	function calculateAbilityCost(abilityHrid, targetLevel) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return 0;
		const levelXpTable = gameData.levelExperienceTable;
		if (!levelXpTable) return 0;
		let booksNeeded = (levelXpTable[targetLevel] || 0) / (isStarterAbility(abilityHrid) ? 50 : 500);
		booksNeeded += 1;
		const itemHrid = abilityHrid.replace("/abilities/", "/items/");
		const prices = src_api_marketplace_js.default.getPrice(itemHrid, 0);
		if (!prices) return 0;
		let ask = prices.ask;
		let bid = prices.bid;
		if (ask > 0 && bid < 0) bid = ask;
		if (bid > 0 && ask < 0) ask = bid;
		const weightedPrice = (ask + bid) / 2;
		return booksNeeded * weightedPrice;
	}
	/**
	* Calculate the cost to level up an ability from current level to target level
	* @param {string} abilityHrid - Ability HRID
	* @param {number} currentLevel - Current ability level
	* @param {number} currentXp - Current ability XP
	* @param {number} targetLevel - Target ability level
	* @returns {number} Cost in coins
	*/
	function calculateAbilityLevelUpCost(abilityHrid, currentLevel, currentXp, targetLevel) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return 0;
		const levelXpTable = gameData.levelExperienceTable;
		if (!levelXpTable) return 0;
		let booksNeeded = ((levelXpTable[targetLevel] || 0) - currentXp) / (isStarterAbility(abilityHrid) ? 50 : 500);
		if (currentLevel === 0) booksNeeded += 1;
		const itemHrid = abilityHrid.replace("/abilities/", "/items/");
		const prices = src_api_marketplace_js.default.getPrice(itemHrid, 0);
		if (!prices) return 0;
		let ask = prices.ask;
		let bid = prices.bid;
		if (ask > 0 && bid < 0) bid = ask;
		if (bid > 0 && ask < 0) ask = bid;
		const weightedPrice = (ask + bid) / 2;
		return booksNeeded * weightedPrice;
	}
	//#endregion
	//#region src/utils/ui-components.js
	var ui_components_exports = /* @__PURE__ */ __exportAll({
		createCollapsibleSection: () => createCollapsibleSection,
		default: () => ui_components_default
	});
	/**
	* Shared UI Components
	*
	* Reusable UI component builders for MWI Tools
	*/
	/**
	* Create a collapsible section with expand/collapse functionality
	* @param {string} icon - Icon/emoji for the section (optional, pass empty string to omit)
	* @param {string} title - Section title
	* @param {string} summary - Summary text shown when collapsed (optional)
	* @param {HTMLElement} content - Content element to show/hide
	* @param {boolean} defaultOpen - Whether section starts open (default: false)
	* @param {number} indent - Indentation level: 0 = root, 1 = nested, etc. (default: 0)
	* @returns {HTMLElement} Section container
	*/
	function createCollapsibleSection(icon, title, summary, content, defaultOpen = false, indent = 0) {
		const section = document.createElement("div");
		section.className = "mwi-collapsible-section";
		section.style.cssText = `
        margin-top: ${indent > 0 ? "4px" : "8px"};
        margin-bottom: ${indent > 0 ? "4px" : "8px"};
        margin-left: ${indent * 16}px;
    `;
		const header = document.createElement("div");
		header.className = "mwi-section-header";
		header.style.cssText = `
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        padding: 4px 0;
        color: var(--text-color-primary, #fff);
        font-weight: ${indent === 0 ? "500" : "400"};
        font-size: ${indent > 0 ? "0.9em" : "1em"};
    `;
		const arrow = document.createElement("span");
		arrow.textContent = defaultOpen ? "▼" : "▶";
		arrow.style.cssText = `
        margin-right: 6px;
        font-size: 0.7em;
        transition: transform 0.2s;
    `;
		const label = document.createElement("span");
		if (icon) if (icon === "⏱") label.innerHTML = `<span style="display: inline-block; margin-right: 0.25em;">${icon}</span> ${title}`;
		else label.textContent = `${icon} ${title}`;
		else label.textContent = title;
		header.appendChild(arrow);
		header.appendChild(label);
		const summaryDiv = document.createElement("div");
		summaryDiv.style.cssText = `
        margin-left: 16px;
        margin-top: 2px;
        color: var(--text-color-secondary, #888);
        font-size: 0.9em;
        display: ${defaultOpen ? "none" : "block"};
    `;
		if (summary) summaryDiv.textContent = summary;
		const contentWrapper = document.createElement("div");
		contentWrapper.className = "mwi-section-content";
		contentWrapper.style.cssText = `
        display: ${defaultOpen ? "block" : "none"};
        margin-left: ${indent === 0 ? "16px" : "0px"};
        margin-top: 4px;
        color: var(--text-color-secondary, #888);
        font-size: 0.9em;
        line-height: 1.6;
        text-align: left;
    `;
		contentWrapper.appendChild(content);
		header.addEventListener("click", (e) => {
			e.stopPropagation();
			const isOpen = contentWrapper.style.display === "block";
			contentWrapper.style.display = isOpen ? "none" : "block";
			if (summary) summaryDiv.style.display = isOpen ? "block" : "none";
			arrow.textContent = isOpen ? "▶" : "▼";
		});
		section.appendChild(header);
		if (summary) section.appendChild(summaryDiv);
		section.appendChild(contentWrapper);
		return section;
	}
	var ui_components_default = { createCollapsibleSection };
	//#endregion
	//#region src/utils/enhancement-gear-detector.js
	/**
	* Skill Gear Detector
	*
	* Auto-detects gear and buffs from character equipment for any skill.
	* Originally designed for enhancing, now works generically for all skills.
	*/
	var enhancement_gear_detector_exports = /* @__PURE__ */ __exportAll({
		detectEnhancingGear: () => detectEnhancingGear,
		detectEnhancingTeas: () => detectEnhancingTeas,
		detectSkillGear: () => detectSkillGear,
		getEnhancingTeaLevelBonus: () => getEnhancingTeaLevelBonus,
		getEnhancingTeaSpeedBonus: () => getEnhancingTeaSpeedBonus
	});
	/**
	* Detect best gear for a specific skill by equipment slot
	* @param {string} skillName - Skill name (e.g., 'enhancing', 'cooking', 'milking')
	* @param {Map} equipment - Character equipment map (equipped items only)
	* @param {Object} itemDetailMap - Item details map from init_client_data
	* @returns {Object} Best gear per slot with bonuses
	*/
	function detectSkillGear(skillName, equipment, itemDetailMap) {
		const gear = {
			toolBonus: 0,
			speedBonus: 0,
			rareFindBonus: 0,
			experienceBonus: 0,
			slotBreakdown: [],
			toolSlot: null,
			bodySlot: null,
			legsSlot: null,
			handsSlot: null
		};
		let itemsToScan = [];
		if (equipment) itemsToScan = Array.from(equipment.values()).filter((item) => item && item.itemHrid);
		const slotCandidates = {
			tool: [],
			body: [],
			legs: [],
			hands: [],
			neck: [],
			ring: [],
			earrings: [],
			back: [],
			charm: []
		};
		const successStat = `${skillName}Success`;
		const speedStat = `${skillName}Speed`;
		const rareFindStat = `${skillName}RareFind`;
		const experienceStat = `${skillName}Experience`;
		for (const item of itemsToScan) {
			const itemDetails = itemDetailMap[item.itemHrid];
			if (!itemDetails?.equipmentDetail?.noncombatStats) continue;
			const stats = itemDetails.equipmentDetail.noncombatStats;
			const enhancementLevel = item.enhancementLevel || 0;
			const multiplier = getEnhancementMultiplier(itemDetails, enhancementLevel);
			const equipmentType = itemDetails.equipmentDetail.type;
			const allStats = {};
			for (const [statName, statValue] of Object.entries(stats)) {
				if (typeof statValue !== "number") continue;
				allStats[statName] = statValue * 100 * multiplier;
			}
			if (!(allStats[successStat] || allStats[speedStat] || allStats[rareFindStat] || allStats[experienceStat] || allStats.skillingSpeed || allStats.skillingRareFind || allStats.skillingExperience)) continue;
			const itemBonuses = {
				item,
				itemDetails,
				itemLevel: itemDetails.itemLevel || 0,
				enhancementLevel,
				toolBonus: allStats[successStat] || 0,
				speedBonus: (allStats[speedStat] || 0) + (allStats.skillingSpeed || 0),
				rareFindBonus: (allStats[rareFindStat] || 0) + (allStats.skillingRareFind || 0),
				experienceBonus: (allStats[experienceStat] || 0) + (allStats.skillingExperience || 0),
				allStats
			};
			if (equipmentType === `/equipment_types/${skillName}_tool` || equipmentType === "/equipment_types/main_hand" || equipmentType === "/equipment_types/two_hand") slotCandidates.tool.push(itemBonuses);
			else if (equipmentType === "/equipment_types/body") slotCandidates.body.push(itemBonuses);
			else if (equipmentType === "/equipment_types/legs") slotCandidates.legs.push(itemBonuses);
			else if (equipmentType === "/equipment_types/hands") slotCandidates.hands.push(itemBonuses);
			else if (equipmentType === "/equipment_types/neck") slotCandidates.neck.push(itemBonuses);
			else if (equipmentType === "/equipment_types/ring") slotCandidates.ring.push(itemBonuses);
			else if (equipmentType === "/equipment_types/earrings") slotCandidates.earrings.push(itemBonuses);
			else if (equipmentType === "/equipment_types/back") slotCandidates.back.push(itemBonuses);
			else if (equipmentType === "/equipment_types/charm") slotCandidates.charm.push(itemBonuses);
		}
		const selectBest = (candidates) => {
			if (candidates.length === 0) return null;
			return candidates.reduce((best, current) => {
				if (current.itemLevel > best.itemLevel) return current;
				if (current.itemLevel < best.itemLevel) return best;
				if (current.enhancementLevel > best.enhancementLevel) return current;
				return best;
			});
		};
		const bestTool = selectBest(slotCandidates.tool);
		const bestBody = selectBest(slotCandidates.body);
		const bestLegs = selectBest(slotCandidates.legs);
		const bestHands = selectBest(slotCandidates.hands);
		const bestNeck = selectBest(slotCandidates.neck);
		const bestRing = selectBest(slotCandidates.ring);
		const bestEarrings = selectBest(slotCandidates.earrings);
		const bestBack = selectBest(slotCandidates.back);
		const bestCharm = selectBest(slotCandidates.charm);
		const addSlot = (best) => {
			if (!best) return;
			gear.toolBonus += best.toolBonus;
			gear.speedBonus += best.speedBonus;
			gear.rareFindBonus += best.rareFindBonus;
			gear.experienceBonus += best.experienceBonus;
			gear.slotBreakdown.push({
				name: best.itemDetails.name,
				enhancementLevel: best.enhancementLevel,
				success: best.toolBonus,
				speed: best.speedBonus,
				rareFind: best.rareFindBonus,
				experience: best.experienceBonus
			});
			return {
				name: best.itemDetails.name,
				enhancementLevel: best.enhancementLevel
			};
		};
		gear.toolSlot = addSlot(bestTool) || null;
		gear.bodySlot = addSlot(bestBody) || null;
		gear.legsSlot = addSlot(bestLegs) || null;
		gear.handsSlot = addSlot(bestHands) || null;
		addSlot(bestNeck);
		addSlot(bestRing);
		addSlot(bestEarrings);
		addSlot(bestBack);
		addSlot(bestCharm);
		return gear;
	}
	/**
	* Detect active enhancing teas from drink slots
	* @param {Array} drinkSlots - Active drink slots for enhancing action type
	* @param {Object} itemDetailMap - Item details map from init_client_data
	* @returns {Object} Active teas { enhancing, superEnhancing, ultraEnhancing, blessed }
	*/
	function detectEnhancingTeas(drinkSlots, _itemDetailMap) {
		const teas = {
			enhancing: false,
			superEnhancing: false,
			ultraEnhancing: false,
			blessed: false
		};
		if (!drinkSlots || drinkSlots.length === 0) return teas;
		const teaMap = {
			"/items/enhancing_tea": "enhancing",
			"/items/super_enhancing_tea": "superEnhancing",
			"/items/ultra_enhancing_tea": "ultraEnhancing",
			"/items/blessed_tea": "blessed"
		};
		for (const drink of drinkSlots) {
			if (!drink || !drink.itemHrid) continue;
			const teaKey = teaMap[drink.itemHrid];
			if (teaKey) teas[teaKey] = true;
		}
		return teas;
	}
	/**
	* Get enhancing tea level bonus
	* @param {Object} teas - Active teas from detectEnhancingTeas()
	* @returns {number} Total level bonus from teas
	*/
	function getEnhancingTeaLevelBonus(teas) {
		if (teas.ultraEnhancing) return 8;
		if (teas.superEnhancing) return 6;
		if (teas.enhancing) return 3;
		return 0;
	}
	/**
	* Get enhancing tea speed bonus (base, before concentration)
	* @param {Object} teas - Active teas from detectEnhancingTeas()
	* @returns {number} Base speed bonus % from teas
	*/
	function getEnhancingTeaSpeedBonus(teas) {
		if (teas.ultraEnhancing) return 6;
		if (teas.superEnhancing) return 4;
		if (teas.enhancing) return 2;
		return 0;
	}
	/**
	* Backward-compatible wrapper for enhancing gear detection
	* @param {Map} equipment - Character equipment map (equipped items only)
	* @param {Object} itemDetailMap - Item details map from init_client_data
	* @returns {Object} Best enhancing gear per slot with bonuses
	*/
	function detectEnhancingGear(equipment, itemDetailMap) {
		return detectSkillGear("enhancing", equipment, itemDetailMap);
	}
	//#endregion
	//#region src/utils/enhancement-config.js
	/**
	* Enhancement Configuration Manager
	*
	* Combines auto-detected enhancing parameters with manual overrides from settings.
	* Provides single source of truth for enhancement simulator inputs.
	*/
	var enhancement_config_exports = /* @__PURE__ */ __exportAll({
		getAutoDetectedParams: () => getAutoDetectedParams,
		getDetectedGearSettings: () => getDetectedGearSettings,
		getEnhancingParams: () => getEnhancingParams
	});
	/**
	* Get enhancing parameters (auto-detected or manual)
	* @returns {Object} Enhancement parameters for simulator
	*/
	function getEnhancingParams() {
		if (src_core_config_js.default.getSettingValue("enhanceSim_autoDetect", false)) return getAutoDetectedParams();
		else return getManualParams();
	}
	/**
	* Get auto-detected enhancing parameters from character data
	* @returns {Object} Auto-detected parameters
	*/
	function getAutoDetectedParams() {
		const equipment = src_core_data_manager_js.default.getEquipment();
		const skills = src_core_data_manager_js.default.getSkills();
		const drinkSlots = src_core_data_manager_js.default.getActionDrinkSlots("/action_types/enhancing");
		const itemDetailMap = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap || {};
		const gear = detectEnhancingGear(equipment, itemDetailMap);
		let drinkConcentration = 0;
		const itemsToScan = equipment ? Array.from(equipment.values()).filter((item) => item && item.itemHrid) : [];
		for (const item of itemsToScan) {
			const itemDetails = itemDetailMap[item.itemHrid];
			if (!itemDetails?.equipmentDetail?.noncombatStats?.drinkConcentration) continue;
			const concentration = itemDetails.equipmentDetail.noncombatStats.drinkConcentration;
			const multiplier = getEnhancementMultiplier(itemDetails, item.enhancementLevel || 0);
			const scaledConcentration = concentration * 100 * multiplier;
			if (scaledConcentration > drinkConcentration) drinkConcentration = scaledConcentration;
		}
		const teas = detectEnhancingTeas(drinkSlots, itemDetailMap);
		const baseTeaLevel = getEnhancingTeaLevelBonus(teas);
		const teaLevelBonus = baseTeaLevel > 0 ? baseTeaLevel * (1 + drinkConcentration / 100) : 0;
		const baseTeaSpeed = getEnhancingTeaSpeedBonus(teas);
		const teaSpeedBonus = baseTeaSpeed > 0 ? baseTeaSpeed * (1 + drinkConcentration / 100) : 0;
		let baseTeaWisdom = 0;
		if (drinkSlots && drinkSlots.length > 0) for (const drink of drinkSlots) {
			if (!drink || !drink.itemHrid) continue;
			const drinkDetails = itemDetailMap[drink.itemHrid];
			if (!drinkDetails?.consumableDetail?.buffs) continue;
			const wisdomBuff = drinkDetails.consumableDetail.buffs.find((buff) => buff.typeHrid === "/buff_types/wisdom");
			if (wisdomBuff && wisdomBuff.flatBoost) baseTeaWisdom += wisdomBuff.flatBoost * 100;
		}
		const teaWisdomBonus = baseTeaWisdom > 0 ? baseTeaWisdom * (1 + drinkConcentration / 100) : 0;
		const enhancingSkill = skills?.find((s) => s.skillHrid === "/skills/enhancing");
		if (!enhancingSkill) console.error("[EnhancementConfig] Skill not found: /skills/enhancing");
		const enhancingLevel = enhancingSkill?.level || 1;
		const houseLevel = src_core_data_manager_js.default.getHouseRoomLevel("/house_rooms/observatory");
		const houseRooms = src_core_data_manager_js.default.getHouseRooms();
		let houseRareFindBonus = 0;
		let houseWisdomBonus = 0;
		for (const [_hrid, room] of houseRooms) {
			const level = room.level || 0;
			if (level >= 1) {
				houseRareFindBonus += .2 * level;
				houseWisdomBonus += .05 * level;
			}
		}
		const communityBuffLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/enhancing_speed");
		const communitySpeedBonus = communityBuffLevel > 0 ? 20 + (communityBuffLevel - 1) * .5 : 0;
		const communityWisdomLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/experience");
		const communityWisdomBonus = communityWisdomLevel > 0 ? 20 + (communityWisdomLevel - 1) * .5 : 0;
		const achievementWisdomBonus = src_core_data_manager_js.default.getAchievementBuffFlatBoost("/action_types/enhancing", "/buff_types/wisdom") * 100;
		const achievementRareFindBonus = src_core_data_manager_js.default.getAchievementBuffFlatBoost("/action_types/enhancing", "/buff_types/rare_find") * 100;
		const houseSuccessBonus = houseLevel * .05;
		const equipmentSuccessBonus = gear.toolBonus;
		const achievementSuccessBonus = src_core_data_manager_js.default.getAchievementBuffRatioBoost("/action_types/enhancing", "/buff_types/enhancing_success") * 100;
		const totalSuccessBonus = equipmentSuccessBonus + houseSuccessBonus + achievementSuccessBonus;
		const houseSpeedBonus = houseLevel * 1;
		const totalSpeedBonus = gear.speedBonus + houseSpeedBonus + communitySpeedBonus + teaSpeedBonus;
		const totalExperienceBonus = gear.experienceBonus + houseWisdomBonus + teaWisdomBonus + communityWisdomBonus + achievementWisdomBonus;
		const guzzlingBonus = 1 + drinkConcentration / 100;
		return {
			enhancingLevel: enhancingLevel + teaLevelBonus,
			houseLevel,
			toolBonus: totalSuccessBonus,
			speedBonus: totalSpeedBonus,
			rareFindBonus: gear.rareFindBonus + houseRareFindBonus + achievementRareFindBonus,
			experienceBonus: totalExperienceBonus,
			guzzlingBonus,
			teas,
			toolSlot: gear.toolSlot,
			bodySlot: gear.bodySlot,
			legsSlot: gear.legsSlot,
			handsSlot: gear.handsSlot,
			detectedTeaBonus: teaLevelBonus,
			communityBuffLevel,
			communitySpeedBonus,
			communityWisdomLevel,
			communityWisdomBonus,
			achievementWisdomBonus,
			teaSpeedBonus,
			teaWisdomBonus,
			drinkConcentration,
			houseRareFindBonus,
			achievementRareFindBonus,
			houseWisdomBonus,
			equipmentRareFind: gear.rareFindBonus,
			equipmentExperience: gear.experienceBonus,
			equipmentSuccessBonus,
			houseSuccessBonus,
			achievementSuccessBonus,
			equipmentSpeedBonus: gear.speedBonus,
			houseSpeedBonus,
			slotBreakdown: gear.slotBreakdown || []
		};
	}
	/**
	* Detect current character's enhancing gear and return values mapped to setting keys.
	* Used by settings UI to populate gear inputs when auto-detect is toggled on.
	* @returns {Object} Map of settingId → detected value
	*/
	function getDetectedGearSettings() {
		const equipment = src_core_data_manager_js.default.getEquipment();
		const skills = src_core_data_manager_js.default.getSkills();
		const drinkSlots = src_core_data_manager_js.default.getActionDrinkSlots("/action_types/enhancing");
		const result = {};
		result.enhanceSim_enhancingLevel = (skills?.find((s) => s.skillHrid === "/skills/enhancing"))?.level || 1;
		result.enhanceSim_houseLevel = src_core_data_manager_js.default.getHouseRoomLevel("/house_rooms/observatory");
		result.enhanceSim_communityBuff = {
			enabled: true,
			level: src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/enhancing_speed")
		};
		result.enhanceSim_achievement = src_core_data_manager_js.default.getAchievementBuffRatioBoost("/action_types/enhancing", "/buff_types/enhancing_success") > 0;
		const teaMap = {
			"/items/ultra_enhancing_tea": "ultra",
			"/items/super_enhancing_tea": "super",
			"/items/enhancing_tea": "basic"
		};
		let detectedTea = "none";
		let hasBlessed = false;
		if (drinkSlots) for (const drink of drinkSlots) {
			if (!drink?.itemHrid) continue;
			if (teaMap[drink.itemHrid]) detectedTea = teaMap[drink.itemHrid];
			if (drink.itemHrid === "/items/blessed_tea") hasBlessed = true;
		}
		result.enhanceSim_tea = detectedTea;
		result.enhanceSim_blessedTea = hasBlessed;
		const ENHANCER_HRIDS = {
			"/items/cheese_enhancer": "cheese",
			"/items/verdant_enhancer": "verdant",
			"/items/azure_enhancer": "azure",
			"/items/burble_enhancer": "burble",
			"/items/crimson_enhancer": "crimson",
			"/items/rainbow_enhancer": "rainbow",
			"/items/holy_enhancer": "holy",
			"/items/celestial_enhancer": "celestial"
		};
		const CAPE_HRIDS = {
			"/items/chance_cape": "normal",
			"/items/chance_cape_refined": "refined"
		};
		const CHARM_HRIDS = {
			"/items/trainee_enhancing_charm": "trainee",
			"/items/basic_enhancing_charm": "basic",
			"/items/advanced_enhancing_charm": "advanced",
			"/items/expert_enhancing_charm": "expert",
			"/items/master_enhancing_charm": "master",
			"/items/grandmaster_enhancing_charm": "grandmaster"
		};
		const FIXED_HRIDS = {
			"/items/enchanted_gloves": "gloves",
			"/items/enhancers_top": "top",
			"/items/enhancers_bottoms": "bottoms",
			"/items/guzzling_pouch": "guzzling"
		};
		const NECK_HRIDS = {
			"/items/philosophers_necklace": "philo",
			"/items/necklace_of_speed": "speed"
		};
		const RING_HRIDS = {
			"/items/philosophers_ring": "philo",
			"/items/ring_of_rare_find": "rarefind"
		};
		const EARRING_HRIDS = {
			"/items/philosophers_earrings": "philo",
			"/items/earrings_of_rare_find": "rarefind"
		};
		result.enhanceSim_gear_enhancer = {
			enabled: false,
			tier: "celestial",
			level: 0
		};
		result.enhanceSim_gear_gloves = {
			enabled: false,
			level: 0
		};
		result.enhanceSim_gear_top = {
			enabled: false,
			level: 0
		};
		result.enhanceSim_gear_bottoms = {
			enabled: false,
			level: 0
		};
		result.enhanceSim_gear_neck = {
			enabled: false,
			tier: "philo",
			level: 0
		};
		result.enhanceSim_gear_ring = {
			enabled: false,
			tier: "philo",
			level: 0
		};
		result.enhanceSim_gear_earring = {
			enabled: false,
			tier: "philo",
			level: 0
		};
		result.enhanceSim_gear_cape = {
			enabled: false,
			tier: "normal",
			level: 0
		};
		result.enhanceSim_gear_guzzling = {
			enabled: false,
			level: 0
		};
		result.enhanceSim_gear_charm = {
			enabled: false,
			tier: "grandmaster",
			level: 0
		};
		if (equipment) for (const item of equipment.values()) {
			if (!item?.itemHrid) continue;
			const hrid = item.itemHrid;
			const enhLevel = item.enhancementLevel || 0;
			if (ENHANCER_HRIDS[hrid]) result.enhanceSim_gear_enhancer = {
				enabled: true,
				tier: ENHANCER_HRIDS[hrid],
				level: enhLevel
			};
			else if (CAPE_HRIDS[hrid]) result.enhanceSim_gear_cape = {
				enabled: true,
				tier: CAPE_HRIDS[hrid],
				level: enhLevel
			};
			else if (CHARM_HRIDS[hrid]) result.enhanceSim_gear_charm = {
				enabled: true,
				tier: CHARM_HRIDS[hrid],
				level: enhLevel
			};
			else if (NECK_HRIDS[hrid]) result.enhanceSim_gear_neck = {
				enabled: true,
				tier: NECK_HRIDS[hrid],
				level: enhLevel
			};
			else if (RING_HRIDS[hrid]) result.enhanceSim_gear_ring = {
				enabled: true,
				tier: RING_HRIDS[hrid],
				level: enhLevel
			};
			else if (EARRING_HRIDS[hrid]) result.enhanceSim_gear_earring = {
				enabled: true,
				tier: EARRING_HRIDS[hrid],
				level: enhLevel
			};
			else if (FIXED_HRIDS[hrid]) {
				const slot = FIXED_HRIDS[hrid];
				result[`enhanceSim_gear_${slot}`] = {
					enabled: true,
					level: enhLevel
				};
			}
		}
		return result;
	}
	/**
	* Get manual enhancing parameters from gear-based config settings
	* @returns {Object} Manual parameters
	*/
	function getManualParams() {
		const getValue = (key, defaultValue) => {
			return src_core_config_js.default.getSettingValue(key, defaultValue);
		};
		const itemDetailMap = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap || {};
		const houseLevel = getValue("enhanceSim_houseLevel", 8);
		const baseEnhancingLevel = getValue("enhanceSim_enhancingLevel", 140);
		const teaSelection = getValue("enhanceSim_tea", "ultra");
		const teas = {
			enhancing: teaSelection === "basic",
			superEnhancing: teaSelection === "super",
			ultraEnhancing: teaSelection === "ultra",
			blessed: getValue("enhanceSim_blessedTea", true)
		};
		const teaLevelBonus = teaSelection === "ultra" ? 8 : teaSelection === "super" ? 6 : teaSelection === "basic" ? 3 : 0;
		const teaSpeedBonus = teaSelection === "ultra" ? 6 : teaSelection === "super" ? 4 : teaSelection === "basic" ? 2 : 0;
		const ENHANCER_TIERS = {
			cheese: "/items/cheese_enhancer",
			verdant: "/items/verdant_enhancer",
			azure: "/items/azure_enhancer",
			burble: "/items/burble_enhancer",
			crimson: "/items/crimson_enhancer",
			rainbow: "/items/rainbow_enhancer",
			holy: "/items/holy_enhancer",
			celestial: "/items/celestial_enhancer"
		};
		const CAPE_TIERS = {
			normal: "/items/chance_cape",
			refined: "/items/chance_cape_refined"
		};
		const CHARM_TIERS = {
			trainee: "/items/trainee_enhancing_charm",
			basic: "/items/basic_enhancing_charm",
			advanced: "/items/advanced_enhancing_charm",
			expert: "/items/expert_enhancing_charm",
			master: "/items/master_enhancing_charm",
			grandmaster: "/items/grandmaster_enhancing_charm"
		};
		const FIXED_GEAR = {
			gloves: "/items/enchanted_gloves",
			top: "/items/enhancers_top",
			bottoms: "/items/enhancers_bottoms",
			guzzling: "/items/guzzling_pouch"
		};
		const NECK_TIERS = {
			philo: "/items/philosophers_necklace",
			speed: "/items/necklace_of_speed"
		};
		const RING_TIERS = {
			philo: "/items/philosophers_ring",
			rarefind: "/items/ring_of_rare_find"
		};
		const EARRING_TIERS = {
			philo: "/items/philosophers_earrings",
			rarefind: "/items/earrings_of_rare_find"
		};
		const getGear = (key, defaults) => {
			const val = getValue(key, defaults);
			if (val && typeof val === "object") return val;
			return defaults;
		};
		let equipmentSuccessBonus = 0;
		let equipmentSpeedBonus = 0;
		let equipmentRareFind = 0;
		let equipmentExperience = 0;
		let drinkConcentration = 0;
		const slotBreakdown = [];
		const enhancer = getGear("enhanceSim_gear_enhancer", {
			enabled: true,
			tier: "celestial",
			level: 13
		});
		if (enhancer.enabled) {
			const hrid = ENHANCER_TIERS[enhancer.tier] || ENHANCER_TIERS.celestial;
			const bonus = getGearSlotBonus(hrid, enhancer.level, itemDetailMap);
			equipmentSuccessBonus += bonus.success;
			equipmentSpeedBonus += bonus.speed;
			equipmentRareFind += bonus.rareFind;
			equipmentExperience += bonus.experience;
			const details = itemDetailMap[hrid];
			slotBreakdown.push({
				name: details?.name || "Enhancer",
				enhancementLevel: enhancer.level,
				success: bonus.success,
				speed: bonus.speed,
				rareFind: bonus.rareFind,
				experience: bonus.experience
			});
		}
		const gloves = getGear("enhanceSim_gear_gloves", {
			enabled: true,
			level: 10
		});
		if (gloves.enabled) {
			const bonus = getGearSlotBonus(FIXED_GEAR.gloves, gloves.level, itemDetailMap);
			equipmentSpeedBonus += bonus.speed;
			equipmentExperience += bonus.experience;
			const details = itemDetailMap[FIXED_GEAR.gloves];
			slotBreakdown.push({
				name: details?.name || "Gloves",
				enhancementLevel: gloves.level,
				success: 0,
				speed: bonus.speed,
				rareFind: 0,
				experience: bonus.experience
			});
		}
		const top = getGear("enhanceSim_gear_top", {
			enabled: true,
			level: 10
		});
		if (top.enabled) {
			const bonus = getGearSlotBonus(FIXED_GEAR.top, top.level, itemDetailMap);
			equipmentSpeedBonus += bonus.speed;
			equipmentRareFind += bonus.rareFind;
			equipmentExperience += bonus.experience;
			const details = itemDetailMap[FIXED_GEAR.top];
			slotBreakdown.push({
				name: details?.name || "Top",
				enhancementLevel: top.level,
				success: 0,
				speed: bonus.speed,
				rareFind: bonus.rareFind,
				experience: bonus.experience
			});
		}
		const bottoms = getGear("enhanceSim_gear_bottoms", {
			enabled: true,
			level: 10
		});
		if (bottoms.enabled) {
			const bonus = getGearSlotBonus(FIXED_GEAR.bottoms, bottoms.level, itemDetailMap);
			equipmentSpeedBonus += bonus.speed;
			equipmentExperience += bonus.experience;
			const details = itemDetailMap[FIXED_GEAR.bottoms];
			slotBreakdown.push({
				name: details?.name || "Bottoms",
				enhancementLevel: bottoms.level,
				success: 0,
				speed: bonus.speed,
				rareFind: 0,
				experience: bonus.experience
			});
		}
		const neck = getGear("enhanceSim_gear_neck", {
			enabled: true,
			tier: "philo",
			level: 10
		});
		if (neck.enabled) {
			const hrid = NECK_TIERS[neck.tier] || NECK_TIERS.philo;
			const bonus = getGearSlotBonus(hrid, neck.level, itemDetailMap);
			equipmentSpeedBonus += bonus.speed;
			equipmentRareFind += bonus.rareFind;
			equipmentExperience += bonus.experience;
			const details = itemDetailMap[hrid];
			slotBreakdown.push({
				name: details?.name || "Necklace",
				enhancementLevel: neck.level,
				success: 0,
				speed: bonus.speed,
				rareFind: bonus.rareFind,
				experience: bonus.experience
			});
		}
		const ring = getGear("enhanceSim_gear_ring", {
			enabled: true,
			tier: "philo",
			level: 10
		});
		if (ring.enabled) {
			const hrid = RING_TIERS[ring.tier] || RING_TIERS.philo;
			const bonus = getGearSlotBonus(hrid, ring.level, itemDetailMap);
			equipmentSpeedBonus += bonus.speed;
			equipmentRareFind += bonus.rareFind;
			equipmentExperience += bonus.experience;
			const details = itemDetailMap[hrid];
			slotBreakdown.push({
				name: details?.name || "Ring",
				enhancementLevel: ring.level,
				success: 0,
				speed: bonus.speed,
				rareFind: bonus.rareFind,
				experience: bonus.experience
			});
		}
		const earring = getGear("enhanceSim_gear_earring", {
			enabled: true,
			tier: "philo",
			level: 10
		});
		if (earring.enabled) {
			const hrid = EARRING_TIERS[earring.tier] || EARRING_TIERS.philo;
			const bonus = getGearSlotBonus(hrid, earring.level, itemDetailMap);
			equipmentSpeedBonus += bonus.speed;
			equipmentRareFind += bonus.rareFind;
			equipmentExperience += bonus.experience;
			const details = itemDetailMap[hrid];
			slotBreakdown.push({
				name: details?.name || "Earrings",
				enhancementLevel: earring.level,
				success: 0,
				speed: bonus.speed,
				rareFind: bonus.rareFind,
				experience: bonus.experience
			});
		}
		const cape = getGear("enhanceSim_gear_cape", {
			enabled: true,
			tier: "normal",
			level: 5
		});
		if (cape.enabled) {
			const hrid = CAPE_TIERS[cape.tier] || CAPE_TIERS.normal;
			const bonus = getGearSlotBonus(hrid, cape.level, itemDetailMap);
			equipmentSpeedBonus += bonus.speed;
			equipmentExperience += bonus.experience;
			const details = itemDetailMap[hrid];
			slotBreakdown.push({
				name: details?.name || "Cape",
				enhancementLevel: cape.level,
				success: 0,
				speed: bonus.speed,
				rareFind: 0,
				experience: bonus.experience
			});
		}
		const guzzling = getGear("enhanceSim_gear_guzzling", {
			enabled: true,
			level: 10
		});
		if (guzzling.enabled) drinkConcentration = getGearSlotBonus(FIXED_GEAR.guzzling, guzzling.level, itemDetailMap).drinkConc;
		const charm = getGear("enhanceSim_gear_charm", {
			enabled: true,
			tier: "grandmaster",
			level: 0
		});
		if (charm.enabled) {
			const hrid = CHARM_TIERS[charm.tier] || CHARM_TIERS.grandmaster;
			const bonus = getGearSlotBonus(hrid, charm.level, itemDetailMap);
			equipmentExperience += bonus.experience;
			const details = itemDetailMap[hrid];
			slotBreakdown.push({
				name: details?.name || "Charm",
				enhancementLevel: charm.level,
				success: 0,
				speed: 0,
				rareFind: 0,
				experience: bonus.experience
			});
		}
		const communityBuff = getGear("enhanceSim_communityBuff", {
			enabled: true,
			level: 1
		});
		let communityBuffLevel;
		if (communityBuff.enabled) communityBuffLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/enhancing_speed");
		else communityBuffLevel = communityBuff.level;
		const communitySpeedBonus = communityBuffLevel > 0 ? 20 + (communityBuffLevel - 1) * .5 : 0;
		const achievementSuccessBonus = getValue("enhanceSim_achievement", false) ? .2 : 0;
		const houseSpeedBonus = houseLevel * 1;
		const houseSuccessBonus = houseLevel * .05;
		const houseRooms = src_core_data_manager_js.default.getHouseRooms();
		let houseWisdomBonus = 0;
		for (const [_hrid, room] of houseRooms) {
			const level = room.level || 0;
			if (level >= 1) houseWisdomBonus += .05 * level;
		}
		const scaledTeaLevelBonus = teaLevelBonus > 0 ? teaLevelBonus * (1 + drinkConcentration / 100) : 0;
		const scaledTeaSpeedBonus = teaSpeedBonus > 0 ? teaSpeedBonus * (1 + drinkConcentration / 100) : 0;
		let baseTeaWisdom = 0;
		const drinkSlots = src_core_data_manager_js.default.getActionDrinkSlots("/action_types/enhancing");
		if (drinkSlots && drinkSlots.length > 0) for (const drink of drinkSlots) {
			if (!drink || !drink.itemHrid) continue;
			const drinkDetails = itemDetailMap[drink.itemHrid];
			if (!drinkDetails?.consumableDetail?.buffs) continue;
			const wisdomBuff = drinkDetails.consumableDetail.buffs.find((buff) => buff.typeHrid === "/buff_types/wisdom");
			if (wisdomBuff && wisdomBuff.flatBoost) baseTeaWisdom += wisdomBuff.flatBoost * 100;
		}
		const teaWisdomBonus = baseTeaWisdom > 0 ? baseTeaWisdom * (1 + drinkConcentration / 100) : 0;
		const communityWisdomLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/experience");
		const communityWisdomBonus = communityWisdomLevel > 0 ? 20 + (communityWisdomLevel - 1) * .5 : 0;
		const achievementWisdomBonus = src_core_data_manager_js.default.getAchievementBuffFlatBoost("/action_types/enhancing", "/buff_types/wisdom") * 100;
		const totalToolBonus = equipmentSuccessBonus + houseSuccessBonus + achievementSuccessBonus;
		const totalSpeedBonus = equipmentSpeedBonus + houseSpeedBonus + communitySpeedBonus + scaledTeaSpeedBonus;
		const totalExperienceBonus = equipmentExperience + houseWisdomBonus + teaWisdomBonus + communityWisdomBonus + achievementWisdomBonus;
		const guzzlingBonus = 1 + drinkConcentration / 100;
		return {
			enhancingLevel: baseEnhancingLevel + scaledTeaLevelBonus,
			houseLevel,
			toolBonus: totalToolBonus,
			speedBonus: totalSpeedBonus,
			rareFindBonus: equipmentRareFind,
			experienceBonus: totalExperienceBonus,
			guzzlingBonus,
			teas,
			toolSlot: null,
			bodySlot: null,
			legsSlot: null,
			handsSlot: null,
			detectedTeaBonus: scaledTeaLevelBonus,
			communityBuffLevel,
			communitySpeedBonus,
			teaSpeedBonus: scaledTeaSpeedBonus,
			equipmentSpeedBonus,
			houseSpeedBonus,
			equipmentSuccessBonus,
			houseSuccessBonus,
			achievementSuccessBonus,
			slotBreakdown
		};
	}
	/**
	* Calculate enhancing bonuses from a single gear slot
	* @param {string} itemHrid - Item HRID
	* @param {number} enhancementLevel - Enhancement level (0-20)
	* @param {Object} itemDetailMap - Item details map
	* @returns {Object} { success, speed, rareFind, experience, drinkConc }
	*/
	function getGearSlotBonus(itemHrid, enhancementLevel, itemDetailMap) {
		const itemDetails = itemDetailMap[itemHrid];
		if (!itemDetails) return {
			success: 0,
			speed: 0,
			rareFind: 0,
			experience: 0,
			drinkConc: 0
		};
		const multiplier = getEnhancementMultiplier(itemDetails, enhancementLevel);
		const stats = itemDetails.equipmentDetail?.noncombatStats || {};
		return {
			success: (stats.enhancingSuccess || 0) * 100 * multiplier,
			speed: ((stats.enhancingSpeed || 0) + (stats.skillingSpeed || 0)) * 100 * multiplier,
			rareFind: ((stats.enhancingRareFind || 0) + (stats.skillingRareFind || 0)) * 100 * multiplier,
			experience: ((stats.enhancingExperience || 0) + (stats.skillingExperience || 0)) * 100 * multiplier,
			drinkConc: (stats.drinkConcentration || 0) * 100 * multiplier
		};
	}
	//#endregion
	//#region src/utils/react-input.js
	var react_input_exports = /* @__PURE__ */ __exportAll({
		isReactControlledInput: () => isReactControlledInput,
		setCheckboxValue: () => setCheckboxValue,
		setReactInputValue: () => setReactInputValue,
		setSelectValue: () => setSelectValue
	});
	/**
	* React Input Utility
	* Handles programmatic updates to React-controlled input elements
	*
	* React uses an internal _valueTracker to detect changes. When setting
	* input values programmatically, we must manipulate this tracker to
	* ensure React recognizes the change and updates its state.
	*/
	/**
	* Set value on a React-controlled input element
	* This is the critical pattern for making React recognize programmatic changes
	*
	* @param {HTMLInputElement} input - Input element (text, number, etc.)
	* @param {string|number} value - Value to set
	* @param {Object} options - Optional configuration
	* @param {boolean} options.focus - Whether to focus the input after setting (default: true)
	* @param {boolean} options.dispatchInput - Whether to dispatch input event (default: true)
	* @param {boolean} options.dispatchChange - Whether to dispatch change event (default: false)
	*/
	function setReactInputValue(input, value, options = {}) {
		const { focus = true, dispatchInput = true, dispatchChange = false } = options;
		if (!input) {
			console.warn("[React Input] No input element provided");
			return;
		}
		const lastValue = input.value;
		input.value = value;
		const tracker = input._valueTracker;
		if (tracker) tracker.setValue(lastValue);
		if (dispatchInput) {
			const inputEvent = new Event("input", { bubbles: true });
			inputEvent.simulated = true;
			input.dispatchEvent(inputEvent);
		}
		if (dispatchChange) {
			const changeEvent = new Event("change", { bubbles: true });
			changeEvent.simulated = true;
			input.dispatchEvent(changeEvent);
		}
		if (focus) input.focus();
	}
	/**
	* Check if an input element is React-controlled
	* React-controlled inputs have an internal _valueTracker property
	*
	* @param {HTMLInputElement} input - Input element to check
	* @returns {boolean} True if React-controlled
	*/
	function isReactControlledInput(input) {
		return input && input._valueTracker !== void 0;
	}
	/**
	* Set value on a select element (non-React pattern, for completeness)
	*
	* @param {HTMLSelectElement} select - Select element
	* @param {string} value - Value to select
	* @param {boolean} dispatchChange - Whether to dispatch change event (default: true)
	*/
	function setSelectValue(select, value, dispatchChange = true) {
		if (!select) {
			console.warn("[React Input] No select element provided");
			return;
		}
		for (let i = 0; i < select.options.length; i++) if (select.options[i].value === value) {
			select.options[i].selected = true;
			break;
		}
		if (dispatchChange) select.dispatchEvent(new Event("change", { bubbles: true }));
	}
	/**
	* Set checked state on a checkbox/radio input (non-React pattern, for completeness)
	*
	* @param {HTMLInputElement} input - Checkbox or radio input
	* @param {boolean} checked - Checked state
	* @param {boolean} dispatchChange - Whether to dispatch change event (default: true)
	*/
	function setCheckboxValue(input, checked, dispatchChange = true) {
		if (!input) {
			console.warn("[React Input] No input element provided");
			return;
		}
		input.checked = checked;
		if (dispatchChange) input.dispatchEvent(new Event("change", { bubbles: true }));
	}
	//#endregion
	//#region src/utils/material-calculator.js
	/**
	* Material Calculator Utility
	* Shared calculation logic for material requirements with artisan bonus
	*/
	var material_calculator_exports = /* @__PURE__ */ __exportAll({
		ARTISAN_MATERIAL_MODE: () => ARTISAN_MATERIAL_MODE,
		calculateArtisanBonus: () => calculateArtisanBonus,
		calculateEnhancementMaterialRequirements: () => calculateEnhancementMaterialRequirements,
		calculateMaterialRequirements: () => calculateMaterialRequirements,
		calculateQueuedMaterialsForAction: () => calculateQueuedMaterialsForAction,
		isArtisanTeaOutOfStock: () => isArtisanTeaOutOfStock
	});
	var ARTISAN_MATERIAL_MODE = {
		EXPECTED: "expected",
		WORST_CASE: "worst-case"
	};
	function normalizeArtisanMode(mode) {
		return mode === ARTISAN_MATERIAL_MODE.WORST_CASE ? ARTISAN_MATERIAL_MODE.WORST_CASE : ARTISAN_MATERIAL_MODE.EXPECTED;
	}
	/**
	* Get artisan material mode setting.
	* @returns {string}
	*/
	function getArtisanMaterialMode() {
		return normalizeArtisanMode(src_core_config_js.default.getSettingValue("actions_artisanMaterialMode", ARTISAN_MATERIAL_MODE.EXPECTED));
	}
	/**
	* Calculate total materials required, optionally using conservative per-action rounding.
	* @param {number} basePerAction
	* @param {number} artisanBonus
	* @param {number} numActions
	* @param {string} artisanMode
	* @returns {number}
	*/
	function calculateTotalRequired(basePerAction, artisanBonus, numActions, artisanMode) {
		const materialsPerAction = basePerAction * (1 - artisanBonus);
		if (artisanMode === ARTISAN_MATERIAL_MODE.WORST_CASE) return Math.ceil(materialsPerAction) * numActions;
		return Math.ceil(materialsPerAction * numActions);
	}
	/**
	* Calculate materials reserved by queued actions
	* @param {string} actionHrid - Action HRID to check queue for (optional - if null, calculates for ALL queued actions)
	* @returns {Map<string, number>} Map of itemHrid -> queued quantity
	*/
	function calculateQueuedMaterialsForAction(actionHrid = null) {
		const queuedMaterials = /* @__PURE__ */ new Map();
		if (!src_core_data_manager_js.default.getInitClientData()) return queuedMaterials;
		const queuedActions = src_core_data_manager_js.default.getCurrentActions();
		if (!queuedActions || queuedActions.length === 0) return queuedMaterials;
		const artisanMode = getArtisanMaterialMode();
		for (const queuedAction of queuedActions) {
			if (actionHrid && queuedAction.actionHrid !== actionHrid) continue;
			const actionDetails = src_core_data_manager_js.default.getActionDetails(queuedAction.actionHrid);
			if (!actionDetails) continue;
			let actionCount = 0;
			if (queuedAction.hasMaxCount) actionCount = queuedAction.maxCount - queuedAction.currentCount;
			else continue;
			if (actionCount <= 0) continue;
			const artisanBonus = calculateArtisanBonus(actionDetails);
			if (actionDetails.inputItems && actionDetails.inputItems.length > 0) for (const input of actionDetails.inputItems) {
				const totalForAction = calculateTotalRequired(input.count || input.amount || 1, artisanBonus, actionCount, artisanMode);
				const currentQueued = queuedMaterials.get(input.itemHrid) || 0;
				queuedMaterials.set(input.itemHrid, currentQueued + totalForAction);
			}
			if (actionDetails.upgradeItemHrid) {
				const totalForAction = actionCount;
				const currentQueued = queuedMaterials.get(actionDetails.upgradeItemHrid) || 0;
				queuedMaterials.set(actionDetails.upgradeItemHrid, currentQueued + totalForAction);
			}
		}
		return queuedMaterials;
	}
	/**
	* Calculate material requirements for an action
	* @param {string} actionHrid - Action HRID (e.g., "/actions/crafting/celestial_enhancer")
	* @param {number} numActions - Number of actions to perform
	* @param {boolean} accountForQueue - Whether to subtract queued materials from available inventory (default: false)
	* @returns {Array<Object>} Array of material requirement objects (includes upgrade items)
	*/
	function calculateMaterialRequirements(actionHrid, numActions, accountForQueue = false) {
		const actionDetails = src_core_data_manager_js.default.getActionDetails(actionHrid);
		const inventory = src_core_data_manager_js.default.getInventory();
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!actionDetails) return [];
		const artisanMode = getArtisanMaterialMode();
		const artisanBonus = calculateArtisanBonus(actionDetails);
		const queuedMaterialsMap = accountForQueue ? calculateQueuedMaterialsForAction(null) : /* @__PURE__ */ new Map();
		const materials = [];
		if (actionDetails.inputItems && actionDetails.inputItems.length > 0) for (const input of actionDetails.inputItems) {
			const totalRequired = calculateTotalRequired(input.count || input.amount || 1, artisanBonus, numActions, artisanMode);
			const have = inventory.filter((i) => i.itemHrid === input.itemHrid && !i.enhancementLevel).reduce((sum, i) => sum + (i.count || 0), 0);
			const queued = queuedMaterialsMap.get(input.itemHrid) || 0;
			const available = Math.max(0, have - queued);
			const missingAmount = Math.max(0, totalRequired - available);
			const itemDetails = gameData.itemDetailMap[input.itemHrid];
			if (!itemDetails) continue;
			materials.push({
				itemHrid: input.itemHrid,
				itemName: itemNameTranslator.getDisplayName(input.itemHrid),
				required: totalRequired,
				have,
				queued,
				available,
				missing: missingAmount,
				isTradeable: itemDetails.isTradable === true,
				isUpgradeItem: false
			});
		}
		if (actionDetails.upgradeItemHrid) {
			const totalRequired = numActions;
			const have = inventory.filter((i) => i.itemHrid === actionDetails.upgradeItemHrid && !i.enhancementLevel).reduce((sum, i) => sum + (i.count || 0), 0);
			const queued = queuedMaterialsMap.get(actionDetails.upgradeItemHrid) || 0;
			const available = Math.max(0, have - queued);
			const missingAmount = Math.max(0, totalRequired - available);
			const itemDetails = gameData.itemDetailMap[actionDetails.upgradeItemHrid];
			if (itemDetails) materials.push({
				itemHrid: actionDetails.upgradeItemHrid,
				itemName: itemNameTranslator.getDisplayName(actionDetails.upgradeItemHrid),
				required: totalRequired,
				have,
				queued,
				available,
				missing: missingAmount,
				isTradeable: itemDetails.isTradable === true,
				isUpgradeItem: true
			});
		}
		return materials;
	}
	/**
	* Calculate artisan bonus (material reduction) for an action
	* @param {Object} actionDetails - Action details from game data
	* @returns {number} Artisan bonus (0-1 decimal, e.g., 0.1129 for 11.29% reduction)
	*/
	function calculateArtisanBonus(actionDetails) {
		try {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData) return 0;
			const { equipment, drinks: activeDrinks } = resolveActionContext(actionDetails.type);
			const itemDetailMap = gameData.itemDetailMap || {};
			return parseArtisanBonus(activeDrinks, itemDetailMap, getDrinkConcentration(equipment, itemDetailMap));
		} catch (error) {
			console.error("[Material Calculator] Error calculating artisan bonus:", error);
			return 0;
		}
	}
	/**
	* Returns true if artisan tea is selected in a drink slot but has 0 quantity in inventory.
	* Used to warn the user that material counts reflect no artisan reduction.
	* @param {string} actionHrid
	* @returns {boolean}
	*/
	function isArtisanTeaOutOfStock(actionHrid) {
		try {
			const actionDetails = src_core_data_manager_js.default.getActionDetails(actionHrid);
			if (!actionDetails) return false;
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData) return false;
			const itemDetailMap = gameData.itemDetailMap || {};
			const rawDrinks = src_core_data_manager_js.default.getActionDrinkSlots(actionDetails.type);
			if (!rawDrinks?.length) return false;
			const { equipment, drinks: inStockDrinks } = resolveActionContext(actionDetails.type);
			const drinkConcentration = getDrinkConcentration(equipment, itemDetailMap);
			return parseArtisanBonus(rawDrinks, itemDetailMap, drinkConcentration) > 0 && parseArtisanBonus(inStockDrinks, itemDetailMap, drinkConcentration) === 0;
		} catch (error) {
			console.error("[Material Calculator] Error checking artisan tea stock:", error);
			return false;
		}
	}
	/**
	* Calculate material requirements for enhancement actions
	* Uses Markov chain statistics to determine expected materials needed
	* @param {string} itemHrid - Item HRID being enhanced
	* @param {number} startLevel - Current enhancement level (0-19)
	* @param {number} targetLevel - Target enhancement level (1-20)
	* @param {string|null} protectionItemHrid - Protection item HRID or null
	* @param {number} protectFromLevel - Level at which protection begins (0 = never)
	* @returns {Array<Object>} Array of material requirement objects (same format as calculateMaterialRequirements)
	*/
	function calculateEnhancementMaterialRequirements(itemHrid, startLevel, targetLevel, protectionItemHrid, protectFromLevel, repeatCount) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return [];
		const itemDetails = gameData.itemDetailMap[itemHrid];
		if (!itemDetails) return [];
		const enhancementCosts = itemDetails.enhancementCosts || [];
		if (enhancementCosts.length === 0) return [];
		const params = getEnhancingParams();
		const effectiveProtect = protectFromLevel >= 2 && protectFromLevel <= targetLevel ? protectFromLevel : 0;
		const calc = calculateEnhancement({
			enhancingLevel: params.enhancingLevel,
			houseLevel: params.houseLevel,
			toolBonus: params.toolBonus,
			speedBonus: params.speedBonus,
			itemLevel: itemDetails.itemLevel || 1,
			targetLevel,
			startLevel,
			protectFrom: effectiveProtect,
			blessedTea: params.teas.blessed,
			guzzlingBonus: params.guzzlingBonus
		});
		const inventory = src_core_data_manager_js.default.getInventory();
		const materials = [];
		for (const cost of enhancementCosts) {
			if (cost.itemHrid === "/items/coin") continue;
			const matDetails = gameData.itemDetailMap[cost.itemHrid];
			if (!matDetails) continue;
			const totalQuantity = Math.ceil(cost.count * (repeatCount ?? calc.attempts));
			const have = inventory.filter((i) => i.itemHrid === cost.itemHrid && !i.enhancementLevel).reduce((sum, i) => sum + (i.count || 0), 0);
			const missing = Math.max(0, totalQuantity - have);
			materials.push({
				itemHrid: cost.itemHrid,
				itemName: itemNameTranslator.getDisplayName(cost.itemHrid),
				required: totalQuantity,
				have,
				queued: 0,
				available: have,
				missing,
				isTradeable: matDetails.isTradable === true,
				isUpgradeItem: false
			});
		}
		if (calc.protectionCount > 0 && protectionItemHrid && protectionItemHrid !== "/items/philosophers_mirror") {
			const totalProtection = Math.ceil(calc.protectionCount);
			const protDetails = gameData.itemDetailMap[protectionItemHrid];
			if (protDetails) {
				const have = inventory.filter((i) => i.itemHrid === protectionItemHrid && !i.enhancementLevel).reduce((sum, i) => sum + (i.count || 0), 0);
				const missing = Math.max(0, totalProtection - have);
				materials.push({
					itemHrid: protectionItemHrid,
					itemName: itemNameTranslator.getDisplayName(protectionItemHrid),
					required: totalProtection,
					have,
					queued: 0,
					available: have,
					missing,
					isTradeable: protDetails.isTradable === true,
					isUpgradeItem: false
				});
			}
		}
		return materials;
	}
	//#endregion
	//#region src/utils/pricing-helper.js
	/**
	* Pricing Helper Utility
	* Shared logic for selecting market prices based on pricing mode settings
	*/
	var pricing_helper_exports = /* @__PURE__ */ __exportAll({ selectPrice: () => selectPrice });
	/**
	* Select appropriate price from market data based on pricing mode settings
	* @param {Object} priceData - Market price data with bid/ask properties
	* @param {string} modeSetting - Config setting key for pricing mode (default: 'profitCalc_pricingMode')
	* @param {string} respectSetting - Config setting key for respect pricing mode flag (default: 'expectedValue_respectPricingMode')
	* @returns {number} Selected price (bid or ask)
	*/
	function selectPrice(priceData, modeSetting = "profitCalc_pricingMode", respectSetting = "expectedValue_respectPricingMode") {
		if (!priceData) return 0;
		const pricingMode = src_core_config_js.default.getSettingValue(modeSetting, "conservative");
		if (!src_core_config_js.default.getSettingValue(respectSetting, true) || pricingMode === "conservative" || pricingMode === "patientBuy") return priceData.bid || 0;
		return priceData.ask || 0;
	}
	//#endregion
	//#region src/utils/cleanup-registry.js
	var cleanup_registry_exports = /* @__PURE__ */ __exportAll({ createCleanupRegistry: () => createCleanupRegistry });
	/**
	* Cleanup Registry Utility
	* Centralized registration for listeners, observers, timers, and custom cleanup.
	*/
	/**
	* Create a cleanup registry for deterministic teardown.
	* @returns {{
	*   registerListener: (target: EventTarget, event: string, handler: Function, options?: Object) => void,
	*   registerObserver: (observer: MutationObserver|{ disconnect: Function }) => void,
	*   registerInterval: (intervalId: number) => void,
	*   registerTimeout: (timeoutId: number) => void,
	*   registerCleanup: (cleanupFn: Function) => void,
	*   cleanupAll: () => void
	* }} Cleanup registry API
	*/
	function createCleanupRegistry() {
		const listeners = [];
		const observers = [];
		const intervals = [];
		const timeouts = [];
		const customCleanups = [];
		const registerListener = (target, event, handler, options) => {
			if (!target || !event || !handler) {
				console.warn("[CleanupRegistry] registerListener called with invalid arguments");
				return;
			}
			target.addEventListener(event, handler, options);
			listeners.push({
				target,
				event,
				handler,
				options
			});
		};
		const registerObserver = (observer) => {
			if (!observer || typeof observer.disconnect !== "function") {
				console.warn("[CleanupRegistry] registerObserver called with invalid observer");
				return;
			}
			observers.push(observer);
		};
		const registerInterval = (intervalId) => {
			if (!intervalId) {
				console.warn("[CleanupRegistry] registerInterval called with invalid interval id");
				return;
			}
			intervals.push(intervalId);
		};
		const registerTimeout = (timeoutId) => {
			if (!timeoutId) {
				console.warn("[CleanupRegistry] registerTimeout called with invalid timeout id");
				return;
			}
			timeouts.push(timeoutId);
		};
		const registerCleanup = (cleanupFn) => {
			if (typeof cleanupFn !== "function") {
				console.warn("[CleanupRegistry] registerCleanup called with invalid function");
				return;
			}
			customCleanups.push(cleanupFn);
		};
		const cleanupAll = () => {
			listeners.forEach(({ target, event, handler, options }) => {
				try {
					target.removeEventListener(event, handler, options);
				} catch (error) {
					console.error("[CleanupRegistry] Failed to remove listener:", error);
				}
			});
			listeners.length = 0;
			observers.forEach((observer) => {
				try {
					observer.disconnect();
				} catch (error) {
					console.error("[CleanupRegistry] Failed to disconnect observer:", error);
				}
			});
			observers.length = 0;
			intervals.forEach((intervalId) => {
				try {
					clearInterval(intervalId);
				} catch (error) {
					console.error("[CleanupRegistry] Failed to clear interval:", error);
				}
			});
			intervals.length = 0;
			timeouts.forEach((timeoutId) => {
				try {
					clearTimeout(timeoutId);
				} catch (error) {
					console.error("[CleanupRegistry] Failed to clear timeout:", error);
				}
			});
			timeouts.length = 0;
			customCleanups.forEach((cleanupFn) => {
				try {
					cleanupFn();
				} catch (error) {
					console.error("[CleanupRegistry] Custom cleanup failed:", error);
				}
			});
			customCleanups.length = 0;
		};
		return {
			registerListener,
			registerObserver,
			registerInterval,
			registerTimeout,
			registerCleanup,
			cleanupAll
		};
	}
	//#endregion
	//#region src/utils/house-cost-calculator.js
	/**
	* House Cost Calculator Utility
	* Calculates the total cost to build house rooms to specific levels
	* Used for combat score calculation
	*/
	var house_cost_calculator_exports = /* @__PURE__ */ __exportAll({
		calculateBattleHousesCost: () => calculateBattleHousesCost,
		calculateHouseBuildCost: () => calculateHouseBuildCost
	});
	/**
	* Calculate the total cost to build a house room to a specific level
	* @param {string} houseRoomHrid - House room HRID (e.g., '/house_rooms/dojo')
	* @param {number} currentLevel - Target level (1-8)
	* @returns {number} Total build cost in coins
	*/
	function calculateHouseBuildCost(houseRoomHrid, currentLevel) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return 0;
		const houseRoomDetailMap = gameData.houseRoomDetailMap;
		if (!houseRoomDetailMap) return 0;
		const houseDetail = houseRoomDetailMap[houseRoomHrid];
		if (!houseDetail) return 0;
		const upgradeCostsMap = houseDetail.upgradeCostsMap;
		if (!upgradeCostsMap) return 0;
		let totalCost = 0;
		for (let level = 1; level <= currentLevel; level++) {
			const levelUpgrades = upgradeCostsMap[level];
			if (!levelUpgrades) continue;
			for (const item of levelUpgrades) {
				if (item.itemHrid === "/items/coin") {
					const itemCost = item.count * 1;
					totalCost += itemCost;
					continue;
				}
				const prices = src_api_marketplace_js.default.getPrice(item.itemHrid, 0);
				if (!prices) continue;
				let ask = prices.ask;
				let bid = prices.bid;
				if (ask > 0 && bid < 0) bid = ask;
				if (bid > 0 && ask < 0) ask = bid;
				const weightedPrice = (ask + bid) / 2;
				const itemCost = item.count * weightedPrice;
				totalCost += itemCost;
			}
		}
		return totalCost;
	}
	/**
	* Calculate total cost for all battle houses
	* @param {Object} characterHouseRooms - Map of character house rooms from profile data
	* @returns {Object} {totalCost, breakdown: [{name, level, cost}]}
	*/
	function calculateBattleHousesCost(characterHouseRooms) {
		const battleHouses = [
			"dining_room",
			"library",
			"dojo",
			"gym",
			"armory",
			"archery_range",
			"mystical_study"
		];
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return {
			totalCost: 0,
			breakdown: []
		};
		const houseRoomDetailMap = gameData.houseRoomDetailMap;
		if (!houseRoomDetailMap) return {
			totalCost: 0,
			breakdown: []
		};
		let totalCost = 0;
		const breakdown = [];
		for (const [houseRoomHrid, houseData] of Object.entries(characterHouseRooms)) {
			if (!battleHouses.some((battleHouse) => houseRoomHrid.includes(battleHouse))) continue;
			const level = houseData.level || 0;
			if (level === 0) continue;
			const cost = calculateHouseBuildCost(houseRoomHrid, level);
			totalCost += cost;
			const houseName = houseRoomDetailMap[houseRoomHrid]?.name || houseRoomHrid.replace("/house_rooms/", "");
			breakdown.push({
				name: houseName,
				level,
				cost
			});
		}
		breakdown.sort((a, b) => b.cost - a.cost);
		return {
			totalCost,
			breakdown
		};
	}
	//#endregion
	//#region src/libraries/utils.js
	/**
	* Foundation Utils Library
	* All utility modules
	*
	* Exports to: window.Toolasha.Utils
	*/
	var toolashaRoot = window.Toolasha || {};
	window.Toolasha = toolashaRoot;
	if (typeof unsafeWindow !== "undefined") unsafeWindow.Toolasha = toolashaRoot;
	toolashaRoot.Utils = {
		formatters: formatters_exports,
		efficiency: efficiency_exports,
		profitHelpers: profit_helpers_exports,
		profitConstants: profit_constants_exports,
		dom: dom_exports,
		domObserverHelpers: dom_observer_helpers_exports,
		timerRegistry: timer_registry_exports,
		bonusRevenueCalculator: bonus_revenue_calculator_exports,
		enhancementMultipliers: enhancement_multipliers_exports,
		experienceParser: experience_parser_exports,
		marketListings: market_listings_exports,
		actionCalculator: action_calculator_exports,
		actionPanelHelper: action_panel_helper_exports,
		teaParser: tea_parser_exports,
		buffParser: buff_parser_exports,
		selectors: selectors_exports,
		houseEfficiency: house_efficiency_exports,
		experienceCalculator: experience_calculator_exports,
		marketData: market_data_exports,
		abilityCalc: ability_cost_calculator_exports,
		equipmentParser: equipment_parser_exports,
		uiComponents: ui_components_exports,
		enhancementConfig: enhancement_config_exports,
		enhancementGearDetector: enhancement_gear_detector_exports,
		reactInput: react_input_exports,
		materialCalculator: material_calculator_exports,
		tokenValuation: token_valuation_exports,
		pricingHelper: pricing_helper_exports,
		cleanupRegistry: cleanup_registry_exports,
		houseCostCalculator: house_cost_calculator_exports,
		enhancementCalculator: enhancement_calculator_exports
	};
	console.log("[Toolasha] Utils library loaded");
	//#endregion
})(Toolasha.Core.config, Toolasha.Core.i18n, Toolasha.Core.dataManager, Toolasha.Core.webSocketHook, Toolasha.Core.storage, Toolasha.Core.marketAPI, Toolasha.Core.domObserver);
