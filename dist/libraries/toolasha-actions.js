/**
 * Toolasha Actions Library
 * Production, gathering, and alchemy features
 * Version: 2.85.1
 * License: CC-BY-NC-SA-4.0
 */

(function(src_core_data_manager_js, src_core_config_js, src_core_dom_observer_js, src_utils_enhancement_config_js, src_utils_enhancement_calculator_js, src_utils_profit_constants_js, src_utils_formatters_js, src_api_marketplace_js, src_utils_dom_observer_helpers_js, src_core_i18n_js, src_utils_bonus_revenue_calculator_js, src_utils_market_data_js, src_utils_efficiency_js, src_utils_profit_helpers_js, src_core_storage_js, src_features_market_profit_calculator_js, src_utils_ui_components_js, src_utils_action_panel_helper_js, src_core_websocket_js, src_utils_dom_js, src_utils_timer_registry_js, src_utils_tea_parser_js, src_features_market_alchemy_profit_calculator_js, src_utils_action_calculator_js, src_utils_cleanup_registry_js, src_utils_buff_parser_js, src_utils_equipment_parser_js, src_utils_experience_parser_js, src_utils_react_input_js, src_utils_experience_calculator_js, src_utils_material_calculator_js, src_features_market_expected_value_calculator_js) {
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
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
	src_core_data_manager_js = __toESM(src_core_data_manager_js, 1);
	src_core_config_js = __toESM(src_core_config_js, 1);
	src_core_dom_observer_js = __toESM(src_core_dom_observer_js, 1);
	src_api_marketplace_js = __toESM(src_api_marketplace_js, 1);
	src_core_storage_js = __toESM(src_core_storage_js, 1);
	src_features_market_profit_calculator_js = __toESM(src_features_market_profit_calculator_js, 1);
	src_core_websocket_js = __toESM(src_core_websocket_js, 1);
	src_features_market_alchemy_profit_calculator_js = __toESM(src_features_market_alchemy_profit_calculator_js, 1);
	src_features_market_expected_value_calculator_js = __toESM(src_features_market_expected_value_calculator_js, 1);
	//#region src/features/actions/enhancement-display.js
	/**
	* Enhancement Display
	*
	* Displays enhancement calculations in the enhancement action panel.
	* Shows expected attempts, time, and protection items needed.
	*/
	/**
	* Format a number with thousands separator and 2 decimal places
	* @param {number} num - Number to format
	* @returns {string} Formatted number (e.g., "1,234.56")
	*/
	function formatAttempts(num) {
		return new Intl.NumberFormat("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(num);
	}
	/**
	* Get protection item HRID from the Protection slot in the UI
	* @param {HTMLElement} panel - Enhancement action panel element
	* @returns {string|null} Protection item HRID or null if none equipped
	*/
	function getProtectionItemFromUI(panel) {
		try {
			const protectionContainer = panel.querySelector("[class*=\"protectionItemInputContainer\"]");
			if (!protectionContainer) return null;
			const useElements = protectionContainer.querySelectorAll("use[href*=\"items_sprite\"]");
			if (useElements.length === 0) return null;
			const match = useElements[0].getAttribute("href").match(/#(.+)$/);
			if (match) return `/items/${match[1]}`;
			return null;
		} catch (error) {
			console.error("[Toolasha] Error detecting protection item:", error);
			return null;
		}
	}
	/**
	* Calculate and display enhancement statistics in the panel
	* @param {HTMLElement} panel - Enhancement action panel element
	* @param {string} itemHrid - Item HRID (e.g., "/items/cheese_sword")
	*/
	async function displayEnhancementStats(panel, itemHrid) {
		try {
			if (!src_core_config_js.default.getSetting("enhanceSim")) {
				const existing = panel.querySelector("#mwi-enhancement-stats");
				if (existing) existing.remove();
				return;
			}
			const itemDetails = src_core_data_manager_js.default.getInitClientData().itemDetailMap[itemHrid];
			if (!itemDetails) return;
			const params = (0, src_utils_enhancement_config_js.getEnhancingParams)();
			const protectFromLevel = getProtectFromLevelFromUI(panel);
			const effectiveProtectFrom = protectFromLevel < 2 ? 0 : protectFromLevel;
			const protectionItemHrid = getProtectionItemFromUI(panel);
			const itemLevel = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap?.[itemHrid]?.itemLevel || 0;
			const levelAdvantage = params.enhancingLevel > itemLevel ? (params.enhancingLevel - itemLevel) / 100 : 0;
			const personalSpeed = src_core_config_js.default.getSettingValue("enhanceSim_autoDetect", false) ? src_core_data_manager_js.default.getPersonalBuffFlatBoost("/action_types/enhancing", "/buff_types/action_speed") : 0;
			const speedBreakdown = {
				equipment: (params.equipmentSpeedBonus || 0) / 100,
				house: (params.houseSpeedBonus || 0) / 100,
				community: (params.communitySpeedBonus || 0) / 100,
				consumable: (params.teaSpeedBonus || 0) / 100,
				personal: personalSpeed,
				levelAdvantage,
				total: (params.equipmentSpeedBonus || 0) / 100 + (params.houseSpeedBonus || 0) / 100 + (params.communitySpeedBonus || 0) / 100 + (params.teaSpeedBonus || 0) / 100 + personalSpeed + levelAdvantage
			};
			const actionDetails = src_core_data_manager_js.default.getActionDetails("/actions/enhancing/enhance");
			const baseTime = actionDetails?.baseTimeCost ? actionDetails.baseTimeCost / 1e9 : 12;
			injectDisplay(panel, formatEnhancementDisplay(panel, params, Math.max(src_utils_profit_constants_js.MIN_ACTION_TIME_SECONDS, baseTime / (1 + speedBreakdown.total)), baseTime, itemDetails, effectiveProtectFrom, itemDetails.enhancementCosts || [], protectionItemHrid, speedBreakdown));
			const modeToggleBtn = panel.querySelector("#mwi-enhance-mode-toggle");
			if (modeToggleBtn) modeToggleBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				src_core_config_js.default.toggleSetting("enhanceSim_autoDetect");
				displayEnhancementStats(panel, itemHrid);
			});
		} catch (error) {
			console.error("[Toolasha] ❌ Error displaying enhancement stats:", error);
			console.error("[Toolasha] Error stack:", error.stack);
		}
	}
	/**
	* Generate costs by level table HTML for all 20 enhancement levels
	* @param {HTMLElement} panel - Enhancement action panel element
	* @param {Object} params - Enhancement parameters
	* @param {number} itemLevel - Item level being enhanced
	* @param {number} protectFromLevel - Protection level from UI
	* @param {Array} enhancementCosts - Array of {itemHrid, count} for materials
	* @param {string|null} protectionItemHrid - Protection item HRID (cached, avoid repeated DOM queries)
	* @returns {string} HTML string
	*/
	function generateCostsByLevelTable(panel, params, itemDetails, protectFromLevel, enhancementCosts, protectionItemHrid, perActionTime) {
		const lines = [];
		const gameData = src_core_data_manager_js.default.getInitClientData();
		const itemLevel = itemDetails.itemLevel || 1;
		const xpBaseLevel = itemDetails.level || itemDetails.equipmentDetail?.levelRequirements?.[0]?.level || 0;
		const wisdomDecimal = params.experienceBonus / 100;
		lines.push("<div style=\"margin-top: 12px; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;\">");
		lines.push("<div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;\">");
		lines.push("<div style=\"color: #ffa500; font-weight: bold; font-size: 0.95em;\">Costs by Enhancement Level:</div>");
		lines.push("<button id=\"mwi-expand-costs-table-btn\" style=\"background: rgba(0, 255, 234, 0.1); border: 1px solid #00ffe7; color: #00ffe7; cursor: pointer; font-size: 18px; font-weight: bold; padding: 4px 10px; border-radius: 4px; transition: all 0.15s ease;\" title=\"View full table\">⤢</button>");
		lines.push("</div>");
		const costData = [];
		for (let level = 1; level <= 20; level++) {
			const effectiveProtect = protectFromLevel >= 2 && level >= protectFromLevel ? protectFromLevel : 0;
			const calc = (0, src_utils_enhancement_calculator_js.calculateEnhancement)({
				enhancingLevel: params.enhancingLevel,
				houseLevel: params.houseLevel,
				toolBonus: params.toolBonus,
				speedBonus: params.speedBonus,
				itemLevel,
				targetLevel: level,
				protectFrom: effectiveProtect,
				blessedTea: params.teas.blessed,
				guzzlingBonus: params.guzzlingBonus
			});
			let materialCost = 0;
			const materialBreakdown = {};
			if (enhancementCosts && enhancementCosts.length > 0) enhancementCosts.forEach((cost) => {
				const itemDetail = gameData.itemDetailMap[cost.itemHrid];
				let itemPrice = 0;
				if (cost.itemHrid === "/items/coin") itemPrice = 1;
				else {
					const marketData = src_api_marketplace_js.default.getPrice(cost.itemHrid, 0);
					if (marketData && marketData.ask) itemPrice = marketData.ask;
					else itemPrice = itemDetail?.sellPrice || 0;
				}
				const quantity = cost.count * calc.attempts;
				const itemCost = quantity * itemPrice;
				materialCost += itemCost;
				const itemName = itemDetail?.name || cost.itemHrid;
				materialBreakdown[itemName] = {
					cost: itemCost,
					quantity,
					unitPrice: itemPrice
				};
			});
			let protectionCost = 0;
			if (calc.protectionCount > 0 && protectionItemHrid && protectionItemHrid !== "/items/philosophers_mirror") {
				const protectionItemDetail = gameData.itemDetailMap[protectionItemHrid];
				let protectionPrice = 0;
				const protectionMarketData = src_api_marketplace_js.default.getPrice(protectionItemHrid, 0);
				if (protectionMarketData && protectionMarketData.ask) protectionPrice = protectionMarketData.ask;
				else protectionPrice = protectionItemDetail?.sellPrice || 0;
				protectionCost = calc.protectionCount * protectionPrice;
				const protectionName = protectionItemDetail?.name || protectionItemHrid;
				materialBreakdown[protectionName] = {
					cost: protectionCost,
					quantity: calc.protectionCount,
					unitPrice: protectionPrice
				};
			}
			const totalCost = materialCost + protectionCost;
			const totalTime = perActionTime * calc.attempts;
			let totalXP = 0;
			if (calc.visitCounts && totalTime > 0) for (let i = 0; i < level; i++) {
				const visits = calc.visitCounts[i];
				const successRate = calc.successRates[i].actualRate / 100;
				const enhMult = i === 0 ? 1 : i + 1;
				const successXP = Math.floor(1.4 * (1 + wisdomDecimal) * enhMult * (10 + xpBaseLevel));
				const failXP = Math.floor(successXP * .1);
				totalXP += visits * (successRate * successXP + (1 - successRate) * failXP);
			}
			const xpPerHour = totalTime > 0 ? Math.round(totalXP / totalTime * 3600) : 0;
			costData.push({
				level,
				attempts: calc.attempts,
				protection: calc.protectionCount,
				time: totalTime,
				xpPerHour,
				cost: totalCost,
				breakdown: materialBreakdown
			});
		}
		const isPhilosopherMirror = protectionItemHrid === "/items/philosophers_mirror";
		let mirrorStartLevel = null;
		let totalSavings = 0;
		if (isPhilosopherMirror) {
			const mirrorPrice = src_api_marketplace_js.default.getPrice("/items/philosophers_mirror", 0)?.ask || 0;
			for (let level = 3; level <= 20; level++) {
				const traditionalCost = costData[level - 1].cost;
				const mirrorCost = costData[level - 3].cost + costData[level - 2].cost + mirrorPrice;
				costData[level - 1].mirrorCost = mirrorCost;
				costData[level - 1].isMirrorCheaper = mirrorCost < traditionalCost;
				if (mirrorStartLevel === null && mirrorCost < traditionalCost) mirrorStartLevel = level;
			}
			if (mirrorStartLevel !== null) totalSavings = costData[19].cost - costData[19].mirrorCost;
		}
		if (isPhilosopherMirror && mirrorStartLevel !== null) {
			lines.push("<div style=\"background: linear-gradient(90deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05)); border: 1px solid #FFD700; border-radius: 4px; padding: 8px; margin-bottom: 8px;\">");
			lines.push("<div style=\"color: #FFD700; font-weight: bold; font-size: 0.95em;\">💎 Philosopher's Mirror Strategy:</div>");
			lines.push(`<div style="color: #fff; font-size: 0.85em; margin-top: 4px;">• Use mirrors starting at <strong>+${mirrorStartLevel}</strong></div>`);
			lines.push(`<div style="color: #88ff88; font-size: 0.85em;">• Total savings to +20: <strong>${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalSavings))}</strong> coins</div>`);
			lines.push(`<div style="color: #aaa; font-size: 0.75em; margin-top: 4px; font-style: italic;">Rows highlighted in gold show where mirror is cheaper</div>`);
			lines.push("</div>");
		}
		lines.push("<div id=\"mwi-enhancement-table-scroll\" style=\"max-height: 300px; overflow-y: auto;\">");
		lines.push("<table style=\"width: 100%; border-collapse: collapse; font-size: 0.85em;\">");
		const allMaterials = /* @__PURE__ */ new Set();
		costData.forEach((data) => {
			Object.keys(data.breakdown).forEach((mat) => allMaterials.add(mat));
		});
		const materialNames = Array.from(allMaterials);
		lines.push("<tr style=\"color: #888; border-bottom: 1px solid #444; position: sticky; top: 0; background: rgba(0,0,0,0.9);\">");
		lines.push("<th style=\"text-align: left; padding: 4px;\">Level</th>");
		lines.push("<th style=\"text-align: right; padding: 4px;\">Attempts</th>");
		lines.push("<th style=\"text-align: right; padding: 4px;\">Protection</th>");
		materialNames.forEach((matName) => {
			lines.push(`<th style="text-align: right; padding: 4px;">${matName}</th>`);
		});
		lines.push("<th style=\"text-align: right; padding: 4px;\">Time</th>");
		lines.push("<th style=\"text-align: right; padding: 4px;\">XP/hr</th>");
		lines.push("<th style=\"text-align: right; padding: 4px;\">Total Cost</th>");
		if (isPhilosopherMirror) lines.push("<th style=\"text-align: right; padding: 4px; color: #FFD700;\">Mirror Cost</th>");
		lines.push("</tr>");
		costData.forEach((data, index) => {
			let rowStyle = index === costData.length - 1 ? "" : "border-bottom: 1px solid #333;";
			if (isPhilosopherMirror && data.isMirrorCheaper) rowStyle += " background: linear-gradient(90deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05));";
			lines.push(`<tr style="${rowStyle}">`);
			lines.push(`<td style="padding: 6px 4px; color: #fff; font-weight: bold;">+${data.level}</td>`);
			lines.push(`<td style="padding: 6px 4px; text-align: right; color: #ccc;">${formatAttempts(data.attempts)}</td>`);
			lines.push(`<td style="padding: 6px 4px; text-align: right; color: ${data.protection > 0 ? "#ffa500" : "#888"};">${data.protection > 0 ? formatAttempts(data.protection) : "-"}</td>`);
			materialNames.forEach((matName) => {
				const matData = data.breakdown[matName];
				if (matData && matData.cost > 0) {
					const cost = Math.round(matData.cost).toLocaleString();
					const unitPrice = Math.round(matData.unitPrice).toLocaleString();
					const qty = matData.quantity % 1 === 0 ? Math.round(matData.quantity).toLocaleString() : matData.quantity.toLocaleString(void 0, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					});
					lines.push(`<td style="padding: 6px 4px; text-align: right; color: #ccc;">${qty} × ${unitPrice} → ${cost}</td>`);
				} else lines.push(`<td style="padding: 6px 4px; text-align: right; color: #888;">-</td>`);
			});
			lines.push(`<td style="padding: 6px 4px; text-align: right; color: #ccc;">${(0, src_utils_formatters_js.timeReadable)(data.time)}</td>`);
			lines.push(`<td style="padding: 6px 4px; text-align: right; color: ${src_core_config_js.default.COLOR_XP_RATE};">${data.xpPerHour > 0 ? (0, src_utils_formatters_js.formatLargeNumber)(data.xpPerHour) : "-"}</td>`);
			lines.push(`<td style="padding: 6px 4px; text-align: right; color: #ffa500;">${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(data.cost))}</td>`);
			if (isPhilosopherMirror) if (data.mirrorCost !== void 0) {
				const mirrorCostFormatted = Math.round(data.mirrorCost).toLocaleString();
				const isCheaper = data.isMirrorCheaper;
				const color = isCheaper ? "#FFD700" : "#888";
				const symbol = isCheaper ? "✨ " : "";
				lines.push(`<td style="padding: 6px 4px; text-align: right; color: ${color}; font-weight: ${isCheaper ? "bold" : "normal"};">${symbol}${mirrorCostFormatted}</td>`);
			} else lines.push(`<td style="padding: 6px 4px; text-align: right; color: #666;">N/A</td>`);
			lines.push("</tr>");
		});
		lines.push("</table>");
		lines.push("</div>");
		lines.push("</div>");
		return lines.join("");
	}
	/**
	* Get Protect From Level from UI input
	* @param {HTMLElement} panel - Enhancing panel
	* @returns {number} Protect from level (0 = never, 1-20)
	*/
	function getProtectFromLevelFromUI(panel) {
		const labels = Array.from(panel.querySelectorAll("*")).filter((el) => el.textContent.trim() === "Protect From Level" && el.children.length === 0);
		if (labels.length > 0) {
			const input = labels[0].parentElement.querySelector("input[type=\"number\"], input[type=\"text\"]");
			if (input && input.value) {
				const value = parseInt(input.value, 10);
				return Math.max(0, Math.min(20, value));
			}
		}
		return 0;
	}
	/**
	* Format enhancement display HTML
	* @param {HTMLElement} panel - Enhancement action panel element (for reading protection slot)
	* @param {Object} params - Auto-detected parameters
	* @param {number} perActionTime - Per-action time in seconds
	* @param {number} baseTime - Base action time in seconds (before speed bonuses)
	* @param {Object} itemDetails - Item being enhanced
	* @param {number} protectFromLevel - Protection level from UI
	* @param {Array} enhancementCosts - Array of {itemHrid, count} for materials
	* @param {string|null} protectionItemHrid - Protection item HRID (cached, avoid repeated DOM queries)
	* @returns {string} HTML string
	*/
	function formatEnhancementDisplay(panel, params, perActionTime, baseTime, itemDetails, protectFromLevel, enhancementCosts, protectionItemHrid, speedBreakdown) {
		const lines = [];
		lines.push("<div style=\"margin-top: 15px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 4px; font-size: 0.9em;\">");
		const isAutoDetect = src_core_config_js.default.getSettingValue("enhanceSim_autoDetect", false);
		lines.push(`<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;"><button id="mwi-enhance-mode-toggle" style="font-size: 0.7em; padding: 2px 7px; border-radius: 3px; border: 1px solid #888; background: rgba(0,0,0,0.3); color: #ccc; cursor: pointer;" title="Toggle between Auto-Detect and Manual modes">${isAutoDetect ? "🔍 Auto" : "✏️ Manual"}</button><span style="color: #ffa500; font-weight: bold; font-size: 1.1em;">⚙️ ENHANCEMENT CALCULATOR</span></div>`);
		lines.push(`<div style="color: #ddd; margin-bottom: 12px; font-weight: bold;">${itemDetails.name} <span style="color: #888;">(Item Level ${itemDetails.itemLevel})</span></div>`);
		lines.push("<div style=\"background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px; margin-bottom: 12px;\">");
		lines.push("<div style=\"color: #ffa500; font-weight: bold; margin-bottom: 6px; font-size: 0.95em;\">Your Enhancing Stats:</div>");
		lines.push("<div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.85em;\">");
		lines.push("<div>");
		lines.push(`<div style="color: #ccc;"><span style="color: #888;">Level:</span> ${Math.round(params.enhancingLevel - params.detectedTeaBonus)}${params.detectedTeaBonus > 0 ? ` <span style="color: #88ff88;">(+${params.detectedTeaBonus.toFixed(1)} tea)</span>` : ""}</div>`);
		lines.push(`<div style="color: #ccc;"><span style="color: #888;">House:</span> Observatory Lvl ${params.houseLevel}</div>`);
		if (params.toolSlot) lines.push(`<div style="color: #ccc;"><span style="color: #888;">Tool:</span> ${params.toolSlot.name}${params.toolSlot.enhancementLevel > 0 ? ` +${params.toolSlot.enhancementLevel}` : ""}</div>`);
		if (params.bodySlot) lines.push(`<div style="color: #ccc;"><span style="color: #888;">Body:</span> ${params.bodySlot.name}${params.bodySlot.enhancementLevel > 0 ? ` +${params.bodySlot.enhancementLevel}` : ""}</div>`);
		if (params.legsSlot) lines.push(`<div style="color: #ccc;"><span style="color: #888;">Legs:</span> ${params.legsSlot.name}${params.legsSlot.enhancementLevel > 0 ? ` +${params.legsSlot.enhancementLevel}` : ""}</div>`);
		if (params.handsSlot) lines.push(`<div style="color: #ccc;"><span style="color: #888;">Hands:</span> ${params.handsSlot.name}${params.handsSlot.enhancementLevel > 0 ? ` +${params.handsSlot.enhancementLevel}` : ""}</div>`);
		lines.push("</div>");
		lines.push("<div>");
		let totalSuccess = params.toolBonus;
		let successLevelAdvantage = 0;
		if (params.enhancingLevel > itemDetails.itemLevel) {
			successLevelAdvantage = (params.enhancingLevel - itemDetails.itemLevel) * .05;
			totalSuccess += successLevelAdvantage;
		}
		if (totalSuccess > 0) {
			lines.push(`<div class="mwi-enh-toggle" data-target="mwi-enh-success" style="color: #88ff88; cursor: pointer;"><span style="color: #888;">Success:</span> +${totalSuccess.toFixed(2)}% <span class="mwi-enh-arrow" style="color: #666; font-size: 0.8em;">▸</span></div>`);
			lines.push("<div id=\"mwi-enh-success\" style=\"display: none;\">");
			let currentLevel = null;
			const enhancingAction = src_core_data_manager_js.default.getCurrentActions().find((a) => a.actionHrid === "/actions/enhancing/enhance");
			if (enhancingAction?.primaryItemHash) {
				const parts = enhancingAction.primaryItemHash.split("::");
				const lastPart = parts[parts.length - 1];
				if (lastPart && !lastPart.startsWith("/")) {
					const parsed = parseInt(lastPart, 10);
					if (!isNaN(parsed)) currentLevel = parsed;
				}
			}
			if (currentLevel === null) {
				const inputItems = panel.querySelectorAll(".SkillActionDetail_item__2vEAz .Item_name__2C42x");
				if (inputItems.length > 0) {
					const levelMatch = inputItems[0].textContent.trim().match(/\+(\d+)$/);
					currentLevel = levelMatch ? parseInt(levelMatch[1], 10) : 0;
				}
			}
			if (currentLevel !== null && currentLevel >= 0 && currentLevel < src_utils_enhancement_calculator_js.BASE_SUCCESS_RATES.length) {
				const baseRate = src_utils_enhancement_calculator_js.BASE_SUCCESS_RATES[currentLevel];
				const successMultiplier = 1 + totalSuccess / 100;
				const finalRate = Math.min(100, baseRate * successMultiplier);
				lines.push(`<div style="color: #88ff88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">+${currentLevel} → +${currentLevel + 1}:</span> ${baseRate}% → ${finalRate.toFixed(2)}%</div>`);
			}
			const equipmentSuccess = params.equipmentSuccessBonus || 0;
			const houseSuccess = params.houseSuccessBonus || 0;
			if (equipmentSuccess > 0) {
				lines.push(`<div style="color: #88ff88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Equipment:</span> +${equipmentSuccess.toFixed(2)}%</div>`);
				const successSlots = (params.slotBreakdown || []).filter((s) => s.success > 0);
				for (const slot of successSlots) {
					const label = slot.enhancementLevel > 0 ? `${slot.name} +${slot.enhancementLevel}` : slot.name;
					lines.push(`<div style="color: #88ff88; font-size: 0.75em; padding-left: 20px;"><span style="color: #555;">└</span> ${label}: +${slot.success.toFixed(2)}%</div>`);
				}
			}
			if (houseSuccess > 0) lines.push(`<div style="color: #88ff88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">House (Observatory):</span> +${houseSuccess.toFixed(2)}%</div>`);
			const achievementSuccess = params.achievementSuccessBonus || 0;
			if (achievementSuccess > 0) lines.push(`<div style="color: #88ff88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Achievement:</span> +${achievementSuccess.toFixed(2)}%</div>`);
			if (successLevelAdvantage > 0) lines.push(`<div style="color: #88ff88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Level advantage:</span> +${successLevelAdvantage.toFixed(2)}%</div>`);
			lines.push("</div>");
		}
		const totalSpeed = speedBreakdown.total * 100;
		if (totalSpeed > 0) {
			lines.push(`<div class="mwi-enh-toggle" data-target="mwi-enh-speed" style="color: #88ccff; cursor: pointer;"><span style="color: #888;">Speed:</span> +${totalSpeed.toFixed(1)}% <span class="mwi-enh-arrow" style="color: #666; font-size: 0.8em;">▸</span></div>`);
			lines.push("<div id=\"mwi-enh-speed\" style=\"display: none;\">");
			if (speedBreakdown.equipment > 0) {
				lines.push(`<div style="color: #aaddff; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Equipment:</span> +${(speedBreakdown.equipment * 100).toFixed(1)}%</div>`);
				const speedSlots = (params.slotBreakdown || []).filter((s) => s.speed > 0);
				for (const slot of speedSlots) {
					const label = slot.enhancementLevel > 0 ? `${slot.name} +${slot.enhancementLevel}` : slot.name;
					lines.push(`<div style="color: #aaddff; font-size: 0.75em; padding-left: 20px;"><span style="color: #555;">└</span> ${label}: +${slot.speed.toFixed(1)}%</div>`);
				}
			}
			if (speedBreakdown.house > 0) lines.push(`<div style="color: #aaddff; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">House (Observatory):</span> +${(speedBreakdown.house * 100).toFixed(1)}%</div>`);
			if (speedBreakdown.community > 0) lines.push(`<div style="color: #aaddff; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Community:</span> +${(speedBreakdown.community * 100).toFixed(1)}%</div>`);
			if (speedBreakdown.consumable > 0) lines.push(`<div style="color: #aaddff; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Tea:</span> +${(speedBreakdown.consumable * 100).toFixed(1)}%</div>`);
			if (speedBreakdown.personal > 0) lines.push(`<div style="color: #aaddff; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Labyrinth:</span> +${(speedBreakdown.personal * 100).toFixed(1)}%</div>`);
			if (speedBreakdown.levelAdvantage > 0) lines.push(`<div style="color: #aaddff; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Level advantage:</span> +${(speedBreakdown.levelAdvantage * 100).toFixed(1)}%</div>`);
			lines.push("</div>");
		} else lines.push(`<div style="color: #88ccff;"><span style="color: #888;">Speed:</span> +0.0%</div>`);
		lines.push(`<div style="color: #aaddff; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Base:</span> ${baseTime.toFixed(2)}s → ${perActionTime.toFixed(2)}s</div>`);
		if (params.teas.blessed) {
			const blessedBonus = 1.1;
			lines.push(`<div class="mwi-enh-toggle" data-target="mwi-enh-blessed" style="color: #ffdd88; cursor: pointer;"><span style="color: #888;">Blessed:</span> +${blessedBonus.toFixed(1)}% <span class="mwi-enh-arrow" style="color: #666; font-size: 0.8em;">▸</span></div>`);
			lines.push("<div id=\"mwi-enh-blessed\" style=\"display: none;\">");
			lines.push(`<div style="color: #ffdd88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Blessed Tea:</span> ${blessedBonus}% chance to skip a level</div>`);
			lines.push("</div>");
		}
		if (params.rareFindBonus > 0) {
			lines.push(`<div class="mwi-enh-toggle" data-target="mwi-enh-rarefind" style="color: #ffaa55; cursor: pointer;"><span style="color: #888;">Rare Find:</span> +${params.rareFindBonus.toFixed(1)}% <span class="mwi-enh-arrow" style="color: #666; font-size: 0.8em;">▸</span></div>`);
			lines.push("<div id=\"mwi-enh-rarefind\" style=\"display: none;\">");
			const achievementRareFind = params.achievementRareFindBonus || 0;
			const equipmentRareFind = Math.max(0, params.rareFindBonus - (params.houseRareFindBonus || 0) - achievementRareFind);
			if (equipmentRareFind > 0) {
				lines.push(`<div style="color: #ffaa55; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Equipment:</span> +${equipmentRareFind.toFixed(1)}%</div>`);
				const rfSlots = (params.slotBreakdown || []).filter((s) => s.rareFind > 0);
				for (const slot of rfSlots) {
					const label = slot.enhancementLevel > 0 ? `${slot.name} +${slot.enhancementLevel}` : slot.name;
					lines.push(`<div style="color: #ffaa55; font-size: 0.75em; padding-left: 20px;"><span style="color: #555;">└</span> ${label}: +${slot.rareFind.toFixed(1)}%</div>`);
				}
			}
			if (params.houseRareFindBonus > 0) lines.push(`<div style="color: #ffaa55; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">House Rooms:</span> +${params.houseRareFindBonus.toFixed(1)}%</div>`);
			if (achievementRareFind > 0) lines.push(`<div style="color: #ffaa55; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Achievement:</span> +${achievementRareFind.toFixed(1)}%</div>`);
			lines.push("</div>");
		}
		if (params.experienceBonus > 0) {
			lines.push(`<div class="mwi-enh-toggle" data-target="mwi-enh-experience" style="color: #ffdd88; cursor: pointer;"><span style="color: #888;">Experience:</span> +${params.experienceBonus.toFixed(1)}% <span class="mwi-enh-arrow" style="color: #666; font-size: 0.8em;">▸</span></div>`);
			lines.push("<div id=\"mwi-enh-experience\" style=\"display: none;\">");
			const teaWisdom = params.teaWisdomBonus || 0;
			const houseWisdom = params.houseWisdomBonus || 0;
			const communityWisdom = params.communityWisdomBonus || 0;
			const achievementWisdom = params.achievementWisdomBonus || 0;
			const equipmentExperience = Math.max(0, params.experienceBonus - houseWisdom - teaWisdom - communityWisdom - achievementWisdom);
			if (equipmentExperience > 0) {
				lines.push(`<div style="color: #ffdd88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Equipment:</span> +${equipmentExperience.toFixed(1)}%</div>`);
				const expSlots = (params.slotBreakdown || []).filter((s) => s.experience > 0);
				for (const slot of expSlots) {
					const label = slot.enhancementLevel > 0 ? `${slot.name} +${slot.enhancementLevel}` : slot.name;
					lines.push(`<div style="color: #ffdd88; font-size: 0.75em; padding-left: 20px;"><span style="color: #555;">└</span> ${label}: +${slot.experience.toFixed(1)}%</div>`);
				}
			}
			if (houseWisdom > 0) lines.push(`<div style="color: #ffdd88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">House Rooms (Wisdom):</span> +${houseWisdom.toFixed(1)}%</div>`);
			if (communityWisdom > 0) {
				const wisdomLevel = params.communityWisdomLevel || 0;
				lines.push(`<div style="color: #ffdd88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Community (Wisdom T${wisdomLevel}):</span> +${communityWisdom.toFixed(1)}%</div>`);
			}
			if (teaWisdom > 0) lines.push(`<div style="color: #ffdd88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Wisdom Tea:</span> +${teaWisdom.toFixed(1)}%</div>`);
			if (achievementWisdom > 0) lines.push(`<div style="color: #ffdd88; font-size: 0.8em; padding-left: 10px;"><span style="color: #666;">Achievement:</span> +${achievementWisdom.toFixed(1)}%</div>`);
			lines.push("</div>");
		}
		lines.push("</div>");
		lines.push("</div>");
		lines.push("</div>");
		const costsByLevelHTML = generateCostsByLevelTable(panel, params, itemDetails, protectFromLevel, enhancementCosts, protectionItemHrid, perActionTime);
		lines.push(costsByLevelHTML);
		if (enhancementCosts && enhancementCosts.length > 0) {
			lines.push("<div style=\"margin-top: 12px; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;\">");
			lines.push("<div style=\"color: #ffa500; font-weight: bold; margin-bottom: 6px; font-size: 0.95em;\">Materials Per Attempt:</div>");
			const gameData = src_core_data_manager_js.default.getInitClientData();
			enhancementCosts.forEach((cost) => {
				const itemDetail = gameData.itemDetailMap[cost.itemHrid];
				const itemName = itemDetail ? itemDetail.name : cost.itemHrid;
				let itemPrice = 0;
				if (cost.itemHrid === "/items/coin") itemPrice = 1;
				else {
					const marketData = src_api_marketplace_js.default.getPrice(cost.itemHrid, 0);
					if (marketData && marketData.ask) itemPrice = marketData.ask;
					else itemPrice = itemDetail?.sellPrice || 0;
				}
				const totalCost = cost.count * itemPrice;
				const formattedCount = Number.isInteger(cost.count) ? cost.count.toLocaleString() : cost.count.toLocaleString(void 0, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				});
				lines.push(`<div style="font-size: 0.85em; color: #ccc;">${formattedCount}× ${itemName} <span style="color: #888;">(@${itemPrice.toLocaleString()} → ${totalCost.toLocaleString()})</span></div>`);
			});
			if (protectFromLevel >= 2) {
				if (protectionItemHrid) {
					const protectionItemDetail = gameData.itemDetailMap[protectionItemHrid];
					const protectionItemName = protectionItemDetail?.name || protectionItemHrid;
					let protectionPrice = 0;
					const protectionMarketData = src_api_marketplace_js.default.getPrice(protectionItemHrid, 0);
					if (protectionMarketData && protectionMarketData.ask) protectionPrice = protectionMarketData.ask;
					else protectionPrice = protectionItemDetail?.sellPrice || 0;
					lines.push(`<div style="font-size: 0.85em; color: #ffa500; margin-top: 4px;">1× ${protectionItemName} <span style="color: #888;">(if used) (@${protectionPrice.toLocaleString()})</span></div>`);
				}
			}
			lines.push("</div>");
		}
		lines.push("<div style=\"margin-top: 8px; color: #666; font-size: 0.75em; line-height: 1.3;\">");
		if (protectFromLevel >= 2) lines.push(`• Protection active from +${protectFromLevel} onwards (enhancement level -1 on failure)<br>`);
		else lines.push("• No protection used (all failures return to +0)<br>");
		lines.push("• Attempts and time are statistical averages<br>");
		lines.push(`• Action time: ${perActionTime.toFixed(2)}s (includes ${(speedBreakdown.total * 100).toFixed(1)}% speed bonus)`);
		lines.push("</div>");
		lines.push("</div>");
		lines.push("</div>");
		return lines.join("");
	}
	/**
	* Find the "Current Action" tab button (cached on panel for performance)
	* @param {HTMLElement} panel - Enhancement panel element
	* @returns {HTMLButtonElement|null} Current Action tab button or null
	*/
	function findCurrentActionTab(panel) {
		if (panel._cachedCurrentActionTab) return panel._cachedCurrentActionTab;
		let current = panel;
		let depth = 0;
		const maxDepth = 5;
		while (current && depth < maxDepth) {
			const currentActionTab = Array.from(current.querySelectorAll("button[role=\"tab\"]")).find((btn) => btn.textContent.trim() === "Current Action");
			if (currentActionTab) {
				panel._cachedCurrentActionTab = currentActionTab;
				return currentActionTab;
			}
			current = current.parentElement;
			depth++;
		}
		return null;
	}
	/**
	* Inject enhancement display into panel
	* @param {HTMLElement} panel - Action panel element
	* @param {string} html - HTML to inject
	*/
	function injectDisplay(panel, html) {
		const currentActionTab = findCurrentActionTab(panel);
		if (currentActionTab) {
			if (currentActionTab.getAttribute("aria-selected") === "true" || currentActionTab.classList.contains("Mui-selected") || currentActionTab.getAttribute("tabindex") === "0") return;
		}
		let savedScrollTop = 0;
		const expandedSections = /* @__PURE__ */ new Set();
		const existing = panel.querySelector("#mwi-enhancement-stats");
		if (existing) {
			const scrollContainer = existing.querySelector("#mwi-enhancement-table-scroll");
			if (scrollContainer) savedScrollTop = scrollContainer.scrollTop;
			existing.querySelectorAll(".mwi-enh-toggle").forEach((toggle) => {
				const target = existing.querySelector(`#${toggle.dataset.target}`);
				if (target && target.style.display !== "none") expandedSections.add(toggle.dataset.target);
			});
			existing.remove();
		}
		const container = document.createElement("div");
		container.id = "mwi-enhancement-stats";
		container.innerHTML = html;
		const dropTable = panel.querySelector("div.SkillActionDetail_dropTable__3ViVp");
		const expGain = panel.querySelector("div.SkillActionDetail_expGain__F5xHu");
		if (dropTable || expGain) {
			const insertAfter = dropTable || expGain;
			insertAfter.parentNode.insertBefore(container, insertAfter.nextSibling);
		} else panel.appendChild(container);
		if (savedScrollTop > 0) {
			const newScrollContainer = container.querySelector("#mwi-enhancement-table-scroll");
			if (newScrollContainer) requestAnimationFrame(() => {
				newScrollContainer.scrollTop = savedScrollTop;
			});
		}
		container.querySelectorAll(".mwi-enh-toggle").forEach((toggle) => {
			toggle.addEventListener("click", () => {
				const target = container.querySelector(`#${toggle.dataset.target}`);
				if (!target) return;
				const arrow = toggle.querySelector(".mwi-enh-arrow");
				const isHidden = target.style.display === "none";
				target.style.display = isHidden ? "" : "none";
				if (arrow) arrow.textContent = isHidden ? "▾" : "▸";
			});
			if (expandedSections.has(toggle.dataset.target)) {
				const target = container.querySelector(`#${toggle.dataset.target}`);
				if (target) {
					target.style.display = "";
					const arrow = toggle.querySelector(".mwi-enh-arrow");
					if (arrow) arrow.textContent = "▾";
				}
			}
		});
		const expandBtn = container.querySelector("#mwi-expand-costs-table-btn");
		if (expandBtn) {
			expandBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				showCostsTableModal(container);
			});
			expandBtn.addEventListener("mouseenter", () => {
				expandBtn.style.background = "rgba(255, 0, 212, 0.2)";
				expandBtn.style.borderColor = "#ff00d4";
				expandBtn.style.color = "#ff00d4";
			});
			expandBtn.addEventListener("mouseleave", () => {
				expandBtn.style.background = "rgba(0, 255, 234, 0.1)";
				expandBtn.style.borderColor = "#00ffe7";
				expandBtn.style.color = "#00ffe7";
			});
		}
	}
	/**
	* Show costs table in expanded modal overlay
	* @param {HTMLElement} container - Enhancement stats container with the table
	*/
	function showCostsTableModal(container) {
		const tableScroll = container.querySelector("#mwi-enhancement-table-scroll");
		if (!tableScroll) return;
		const table = tableScroll.querySelector("table");
		if (!table) return;
		const backdrop = document.createElement("div");
		backdrop.id = "mwi-costs-table-backdrop";
		Object.assign(backdrop.style, {
			position: "fixed",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			background: "rgba(0, 0, 0, 0.85)",
			zIndex: "10002",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			backdropFilter: "blur(4px)"
		});
		const modal = document.createElement("div");
		modal.id = "mwi-costs-table-modal";
		Object.assign(modal.style, {
			background: "rgba(5, 5, 15, 0.98)",
			border: "2px solid #00ffe7",
			borderRadius: "12px",
			padding: "20px",
			minWidth: "800px",
			maxWidth: "95vw",
			maxHeight: "90vh",
			overflow: "auto",
			boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)"
		});
		const clonedTable = table.cloneNode(true);
		clonedTable.style.fontSize = "1em";
		clonedTable.querySelectorAll("th, td").forEach((cell) => {
			cell.style.padding = "8px 12px";
		});
		modal.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(0, 255, 234, 0.4); padding-bottom: 10px;">
            <h2 style="margin: 0; color: #00ffe7; font-size: 20px;">📊 Costs by Enhancement Level</h2>
            <button id="mwi-close-costs-modal" style="
                background: none;
                border: none;
                color: #e0f7ff;
                cursor: pointer;
                font-size: 28px;
                padding: 0 8px;
                line-height: 1;
                transition: all 0.15s ease;
            " title="Close">×</button>
        </div>
        <div style="color: #9b9bff; font-size: 0.9em; margin-bottom: 15px;">
            Full breakdown of enhancement costs for all levels
        </div>
    `;
		modal.appendChild(clonedTable);
		backdrop.appendChild(modal);
		document.body.appendChild(backdrop);
		const closeBtn = modal.querySelector("#mwi-close-costs-modal");
		if (closeBtn) {
			closeBtn.addEventListener("click", () => {
				backdrop.remove();
			});
			closeBtn.addEventListener("mouseenter", () => {
				closeBtn.style.color = "#ff0055";
			});
			closeBtn.addEventListener("mouseleave", () => {
				closeBtn.style.color = "#e0f7ff";
			});
		}
		backdrop.addEventListener("click", (e) => {
			if (e.target === backdrop) backdrop.remove();
		});
		const escHandler = (e) => {
			if (e.key === "Escape") {
				backdrop.remove();
				document.removeEventListener("keydown", escHandler);
			}
		};
		document.addEventListener("keydown", escHandler);
		const observer = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(document.body, () => {
			if (!document.body.contains(backdrop)) {
				document.removeEventListener("keydown", escHandler);
				observer();
			}
		}, { childList: true });
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
	var STORAGE_KEY = "Toolasha_cnItemNames";
	var CACHE_VERSION = 2;
	var DEBOUNCE_DELAY$1 = 5e3;
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
				const saved = await src_core_storage_js.default.get(STORAGE_KEY, "settings");
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
					await src_core_storage_js.default.set(STORAGE_KEY, data, "settings", true);
				} catch (error) {
					console.warn("[ItemNameTranslator] Failed to save names:", error);
				}
			}, DEBOUNCE_DELAY$1);
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
				src_core_storage_js.default.set(STORAGE_KEY, data, "settings", true).catch(() => {});
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
	//#region src/features/actions/gathering-profit.js
	/**
	* Gathering Profit Calculator
	*
	* Calculates comprehensive profit/hour for gathering actions (Foraging, Woodcutting, Milking) including:
	* - All drop table items at market prices
	* - Drink consumption costs
	* - Equipment speed bonuses
	* - Efficiency buffs (level, house, tea, equipment)
	* - Gourmet tea bonus items (production skills only)
	* - Market tax (2%)
	*/
	/**
	* Cache for processing action conversions (inputItemHrid → conversion data)
	* Built once per game data load to avoid O(n) searches through action map
	*/
	var processingConversionCache = null;
	/**
	* Build processing conversion cache from game data
	* @param {Object} gameData - Game data from dataManager
	* @returns {Map} Map of inputItemHrid → {actionHrid, outputItemHrid, conversionRatio}
	*/
	function buildProcessingConversionCache(gameData) {
		const cache = /* @__PURE__ */ new Map();
		const validProcessingTypes = [
			"/action_types/cheesesmithing",
			"/action_types/crafting",
			"/action_types/tailoring"
		];
		for (const [actionHrid, action] of Object.entries(gameData.actionDetailMap)) {
			if (!validProcessingTypes.includes(action.type)) continue;
			const inputItem = action.inputItems?.[0];
			const outputItem = action.outputItems?.[0];
			if (inputItem && outputItem) cache.set(inputItem.itemHrid, {
				actionHrid,
				outputItemHrid: outputItem.itemHrid,
				conversionRatio: inputItem.count
			});
		}
		return cache;
	}
	/**
	* Calculate comprehensive profit for a gathering action
	* @param {string} actionHrid - Action HRID (e.g., "/actions/foraging/asteroid_belt")
	* @returns {Object|null} Profit data or null if not applicable
	*/
	async function calculateGatheringProfit(actionHrid) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		const actionDetail = gameData.actionDetailMap[actionHrid];
		if (!actionDetail) return null;
		if (!src_utils_profit_constants_js.GATHERING_TYPES.includes(actionDetail.type)) return null;
		if (!actionDetail.dropTable) return null;
		if (!processingConversionCache) processingConversionCache = buildProcessingConversionCache(gameData);
		const getCachedPrice = (0, src_utils_profit_helpers_js.createPriceCache)(src_utils_market_data_js.getItemPrice);
		const { equipment, drinkSlots, drinkConcentration, actionTime: actualTimePerActionSec, speedBonus, gourmetBonus, processingBonus, equipmentEfficiency, equipmentEfficiencyItems, houseEfficiency, teaEfficiency, achievementEfficiency, personalEfficiency, totalGathering, gatheringDetails, efficiencyBreakdown, efficiencyMultiplier } = (0, src_utils_efficiency_js.getActionEfficiencyContext)(actionDetail, {
			isProduction: false,
			gameData
		});
		const { totalEfficiency, levelEfficiency } = efficiencyBreakdown;
		const { gatheringTea = 0, communityGathering = 0, achievementGathering = 0, personalGathering = 0 } = gatheringDetails ?? {};
		const teaCostData = (0, src_utils_profit_helpers_js.calculateTeaCostsPerHour)({
			drinkSlots,
			drinkConcentration,
			itemDetailMap: gameData.itemDetailMap,
			getItemPrice: getCachedPrice
		});
		const drinkCostPerHour = teaCostData.totalCostPerHour;
		const drinkCosts = teaCostData.costs.map((tea) => ({
			name: tea.itemName,
			priceEach: tea.pricePerDrink,
			drinksPerHour: tea.drinksPerHour,
			costPerHour: tea.totalCost,
			missingPrice: tea.missingPrice
		}));
		const actionsPerHour = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actualTimePerActionSec);
		let baseRevenuePerHour = 0;
		let gourmetRevenueBonus = 0;
		let gourmetRevenueBonusPerAction = 0;
		let processingRevenueBonus = 0;
		let processingRevenueBonusPerAction = 0;
		const processingConversions = [];
		const baseOutputs = [];
		const gourmetBonuses = [];
		const dropTable = actionDetail.dropTable;
		for (const drop of dropTable) {
			const rawPrice = getCachedPrice(drop.itemHrid, {
				context: "profit",
				side: "sell"
			});
			const rawPriceMissing = rawPrice === null;
			const resolvedRawPrice = rawPriceMissing ? 0 : rawPrice;
			const avgAmountPerAction = (drop.minCount + drop.maxCount) / 2 * (1 + totalGathering);
			const conversionData = processingConversionCache.get(drop.itemHrid);
			const processedItemHrid = conversionData?.outputItemHrid || null;
			conversionData?.actionHrid;
			let rawPerAction = 0;
			let processedPerAction = 0;
			const rawItemName = itemNameTranslator.getDisplayName(drop.itemHrid);
			const baseItemsPerHour = actionsPerHour * drop.dropRate * avgAmountPerAction * efficiencyMultiplier;
			const baseItemsPerAction = drop.dropRate * avgAmountPerAction;
			const baseRevenuePerAction = baseItemsPerAction * resolvedRawPrice;
			const baseRevenueLine = baseItemsPerHour * resolvedRawPrice;
			baseRevenuePerHour += baseRevenueLine;
			baseOutputs.push({
				itemHrid: drop.itemHrid,
				name: rawItemName,
				itemsPerHour: baseItemsPerHour,
				itemsPerAction: baseItemsPerAction,
				dropRate: drop.dropRate,
				priceEach: resolvedRawPrice,
				revenuePerHour: baseRevenueLine,
				revenuePerAction: baseRevenuePerAction,
				missingPrice: rawPriceMissing
			});
			if (processedItemHrid && processingBonus > 0) {
				const conversionRatio = conversionData.conversionRatio;
				const processedIfProcs = Math.floor(avgAmountPerAction / conversionRatio);
				const rawLeftoverIfProcs = avgAmountPerAction % conversionRatio;
				const rawIfNoProc = avgAmountPerAction;
				processedPerAction = processingBonus * processedIfProcs;
				rawPerAction = processingBonus * rawLeftoverIfProcs + (1 - processingBonus) * rawIfNoProc;
				const processedPrice = getCachedPrice(processedItemHrid, {
					context: "profit",
					side: "sell"
				});
				const processedPriceMissing = processedPrice === null;
				const resolvedProcessedPrice = processedPriceMissing ? 0 : processedPrice;
				const processedItemsPerHour = actionsPerHour * drop.dropRate * processedPerAction * efficiencyMultiplier;
				const processedItemsPerAction = drop.dropRate * processedPerAction;
				const processedItemName = itemNameTranslator.getDisplayName(processedItemHrid);
				const valueGainPerConversion = resolvedProcessedPrice - conversionRatio * resolvedRawPrice;
				const revenueFromConversion = processedItemsPerHour * valueGainPerConversion;
				const rawConsumedPerHour = processedItemsPerHour * conversionRatio;
				const rawConsumedPerAction = processedItemsPerAction * conversionRatio;
				processingRevenueBonus += revenueFromConversion;
				processingRevenueBonusPerAction += processedItemsPerAction * valueGainPerConversion;
				processingConversions.push({
					rawItem: rawItemName,
					processedItem: processedItemName,
					valueGain: valueGainPerConversion,
					conversionsPerHour: processedItemsPerHour,
					conversionsPerAction: processedItemsPerAction,
					rawConsumedPerHour,
					rawConsumedPerAction,
					rawPriceEach: resolvedRawPrice,
					processedPriceEach: resolvedProcessedPrice,
					revenuePerHour: revenueFromConversion,
					revenuePerAction: processedItemsPerAction * valueGainPerConversion,
					missingPrice: rawPriceMissing || processedPriceMissing
				});
			} else rawPerAction = avgAmountPerAction;
			if (gourmetBonus > 0) {
				const bonusPerAction = (rawPerAction + processedPerAction) * (gourmetBonus / 100);
				const bonusItemsPerHour = actionsPerHour * drop.dropRate * bonusPerAction * efficiencyMultiplier;
				const bonusItemsPerAction = drop.dropRate * bonusPerAction;
				if (processedItemHrid && processingBonus > 0) {
					const processedPrice = getCachedPrice(processedItemHrid, {
						context: "profit",
						side: "sell"
					});
					const processedPriceMissing = processedPrice === null;
					const resolvedProcessedPrice = processedPriceMissing ? 0 : processedPrice;
					const weightedPrice = (rawPerAction * resolvedRawPrice + processedPerAction * resolvedProcessedPrice) / (rawPerAction + processedPerAction);
					const bonusRevenue = bonusItemsPerHour * weightedPrice;
					gourmetRevenueBonus += bonusRevenue;
					gourmetRevenueBonusPerAction += bonusItemsPerAction * weightedPrice;
					gourmetBonuses.push({
						name: rawItemName,
						itemsPerHour: bonusItemsPerHour,
						itemsPerAction: bonusItemsPerAction,
						dropRate: drop.dropRate,
						priceEach: weightedPrice,
						revenuePerHour: bonusRevenue,
						revenuePerAction: bonusItemsPerAction * weightedPrice,
						missingPrice: rawPriceMissing || processedPriceMissing
					});
				} else {
					const bonusRevenue = bonusItemsPerHour * resolvedRawPrice;
					gourmetRevenueBonus += bonusRevenue;
					gourmetRevenueBonusPerAction += bonusItemsPerAction * resolvedRawPrice;
					gourmetBonuses.push({
						name: rawItemName,
						itemsPerHour: bonusItemsPerHour,
						itemsPerAction: bonusItemsPerAction,
						dropRate: drop.dropRate,
						priceEach: resolvedRawPrice,
						revenuePerHour: bonusRevenue,
						revenuePerAction: bonusItemsPerAction * resolvedRawPrice,
						missingPrice: rawPriceMissing
					});
				}
			}
		}
		const bonusRevenue = (0, src_utils_bonus_revenue_calculator_js.calculateBonusRevenue)(actionDetail, actionsPerHour, equipment, gameData.itemDetailMap);
		const efficiencyBoostedBonusRevenue = bonusRevenue.totalBonusRevenue * efficiencyMultiplier;
		const revenuePerHour = baseRevenuePerHour + gourmetRevenueBonus + processingRevenueBonus + efficiencyBoostedBonusRevenue;
		const hasMissingPrices = drinkCosts.some((drink) => drink.missingPrice) || baseOutputs.some((output) => output.missingPrice) || gourmetBonuses.some((output) => output.missingPrice) || processingConversions.some((conversion) => conversion.missingPrice) || (bonusRevenue?.hasMissingPrices ?? false);
		const profitPerHour = revenuePerHour - revenuePerHour * src_utils_profit_constants_js.MARKET_TAX - drinkCostPerHour;
		return {
			profitPerHour,
			profitPerAction: (0, src_utils_profit_helpers_js.calculateProfitPerAction)(profitPerHour, actionsPerHour * efficiencyMultiplier),
			profitPerDay: (0, src_utils_profit_helpers_js.calculateProfitPerDay)(profitPerHour),
			revenuePerHour,
			drinkCostPerHour,
			drinkCosts,
			actionsPerHour,
			baseOutputs,
			gourmetBonuses,
			totalEfficiency,
			efficiencyMultiplier,
			speedBonus,
			bonusRevenue,
			gourmetBonus,
			processingBonus,
			processingRevenueBonus,
			processingConversions,
			processingRevenueBonusPerAction,
			gourmetRevenueBonus,
			gourmetRevenueBonusPerAction,
			gatheringQuantity: totalGathering,
			totalGathering,
			hasMissingPrices,
			gatheringTea,
			communityGathering,
			achievementGathering,
			personalGathering,
			details: {
				levelEfficiency,
				houseEfficiency,
				teaEfficiency,
				equipmentEfficiency,
				equipmentEfficiencyItems,
				achievementEfficiency,
				personalEfficiency,
				gourmetBonus,
				communityBuffQuantity: communityGathering,
				gatheringTeaBonus: gatheringTea,
				achievementGathering,
				personalGathering
			}
		};
	}
	//#endregion
	//#region src/features/actions/production-profit.js
	/**
	* Production Profit Calculator
	*
	* Calculates comprehensive profit/hour for production actions (Brewing, Cooking, Crafting, Tailoring, Cheesesmithing)
	* Reuses existing profit calculator from tooltip system.
	*/
	/**
	* Action types for production skills (5 skills)
	*/
	var PRODUCTION_TYPES$7 = [
		"/action_types/brewing",
		"/action_types/cooking",
		"/action_types/cheesesmithing",
		"/action_types/crafting",
		"/action_types/tailoring"
	];
	/**
	* Calculate comprehensive profit for a production action
	* @param {string} actionHrid - Action HRID (e.g., "/actions/brewing/efficiency_tea")
	* @returns {Object|null} Profit data or null if not applicable
	*/
	async function calculateProductionProfit(actionHrid) {
		const actionDetail = src_core_data_manager_js.default.getInitClientData().actionDetailMap[actionHrid];
		if (!actionDetail) return null;
		if (!PRODUCTION_TYPES$7.includes(actionDetail.type)) return null;
		if (!actionDetail.outputItems || actionDetail.outputItems.length === 0) return null;
		const outputItemHrid = actionDetail.outputItems[0].itemHrid;
		const profitData = await src_features_market_profit_calculator_js.default.calculateProfit(outputItemHrid);
		if (!profitData) return null;
		return profitData;
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
	var STORAGE_KEY_PREFIX$1 = "loadout_snapshots";
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
	function getStorageKey$1() {
		return `${STORAGE_KEY_PREFIX$1}_${src_core_data_manager_js.default.getCurrentCharacterId() || "default"}`;
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
				const storageKey = getStorageKey$1();
				this.snapshots = await src_core_storage_js.default.getJSON(storageKey, "settings", null) || {};
				if (Object.keys(this.snapshots).length === 0) {
					const characterLoadoutMap = src_core_data_manager_js.default.characterData?.characterLoadoutMap;
					if (characterLoadoutMap && Object.keys(characterLoadoutMap).length > 0) this._onLoadoutsUpdated({ characterLoadoutMap });
				}
			}
			this.characterInitializedHandler = async () => {
				const storageKey = getStorageKey$1();
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
			src_core_storage_js.default.setJSON(getStorageKey$1(), this.snapshots, "settings");
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
				src_core_storage_js.default.setJSON(getStorageKey$1(), this.snapshots, "settings");
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
	//#region src/features/combat/scroll-simulator.js
	/**
	* Scroll Simulator
	* Manages per-loadout and global default scroll selections for profit/XP simulation.
	*
	* Storage: scroll_simulation_${charId} in 'settings' store.
	* Structure: { '__default__': [buffTypeHrid, ...], 'Loadout Name': [...], ... }
	*
	* Priority when resolving scrolls for an action type:
	*   1. Loadout-specific selection (if a snapshot is active for the skill)
	*   2. Global default ('__default__')
	*   3. Empty set (if toggle is off or nothing configured)
	*/
	var STORAGE_KEY_PREFIX = "scroll_simulation";
	function getStorageKey() {
		return `${STORAGE_KEY_PREFIX}_${src_core_data_manager_js.default.getCurrentCharacterId() || "default"}`;
	}
	var ScrollSimulator = class {
		constructor() {
			/** @type {Object.<string, Set<string>>} loadoutName → Set of buffTypeHrids */
			this.scrollsByLoadout = {};
			this.initialized = false;
		}
		async initialize() {
			if (this.initialized) return;
			const saved = await src_core_storage_js.default.getJSON(getStorageKey(), "settings", {});
			for (const [name, arr] of Object.entries(saved)) if (Array.isArray(arr)) this.scrollsByLoadout[name] = new Set(arr);
			this.initialized = true;
		}
		/**
		* Returns the Set of buffTypeHrids to simulate for the given action type.
		* Respects the master toggle and loadout priority.
		* @param {string} actionTypeHrid
		* @returns {Set<string>}
		*/
		getScrollSetForActionType(actionTypeHrid) {
			if (!src_core_config_js.default.getSetting("simulateScrollEffects")) return /* @__PURE__ */ new Set();
			const loadoutName = loadoutSnapshot.getSnapshotInfoForSkill(actionTypeHrid)?.name;
			if (loadoutName && this.scrollsByLoadout[loadoutName]) return this.scrollsByLoadout[loadoutName];
			return this.scrollsByLoadout["__default__"] ?? /* @__PURE__ */ new Set();
		}
		/**
		* Returns the Set of buffTypeHrids configured for a specific loadout (or the default).
		* @param {string|null} loadoutName - null for global defaults
		* @returns {Set<string>}
		*/
		getScrollsForLoadout(loadoutName) {
			return this.scrollsByLoadout[loadoutName ?? "__default__"] ?? /* @__PURE__ */ new Set();
		}
		/**
		* Save scroll selections for a loadout (or global defaults).
		* @param {string|null} loadoutName - null for global defaults
		* @param {string[]} buffTypeHrids
		*/
		async saveScrollsForLoadout(loadoutName, buffTypeHrids) {
			const key = loadoutName ?? "__default__";
			this.scrollsByLoadout[key] = new Set(buffTypeHrids);
			await this._persist();
		}
		async _persist() {
			const toSave = {};
			for (const [name, set] of Object.entries(this.scrollsByLoadout)) toSave[name] = [...set];
			await src_core_storage_js.default.setJSON(getStorageKey(), toSave, "settings");
		}
	};
	var scrollSimulator = new ScrollSimulator();
	//#endregion
	//#region src/utils/scroll-buff-values.js
	var SCROLL_BUFF_ITEMS = {
		"/buff_types/efficiency": "seal_of_efficiency",
		"/buff_types/gathering": "seal_of_gathering",
		"/buff_types/wisdom": "seal_of_wisdom",
		"/buff_types/action_speed": "seal_of_action_speed",
		"/buff_types/rare_find": "seal_of_rare_find",
		"/buff_types/processing": "seal_of_processing",
		"/buff_types/gourmet": "seal_of_gourmet"
	};
	//#endregion
	//#region src/features/actions/profit-display.js
	/**
	* Profit Display Functions
	*
	* Handles displaying profit calculations in action panels for:
	* - Gathering actions (Foraging, Woodcutting, Milking)
	* - Production actions (Brewing, Cooking, Crafting, Tailoring, Cheesesmithing)
	*/
	var getMissingPriceIndicator = (isMissing) => isMissing ? " ⚠" : "";
	var formatMissingLabel = (isMissing, value) => isMissing ? "-- ⚠" : value;
	var _spriteUrl = null;
	function scrollSpriteHtml$1(buffTypeHrid, size = 14) {
		if (_spriteUrl === null) {
			const el = document.querySelector("use[href*=\"items_sprite\"]");
			_spriteUrl = el ? el.getAttribute("href").split("#")[0] : "";
		}
		const itemSuffix = SCROLL_BUFF_ITEMS[buffTypeHrid];
		if (!_spriteUrl || !itemSuffix) return "";
		return `<svg width="${size}" height="${size}" style="vertical-align:middle;margin-right:3px"><use href="${_spriteUrl}#${itemSuffix}"></use></svg>`;
	}
	var getBonusDropPerHourTotals = (drop, efficiencyMultiplier = 1) => ({
		dropsPerHour: drop.dropsPerHour * efficiencyMultiplier,
		revenuePerHour: drop.revenuePerHour * efficiencyMultiplier
	});
	var getBonusDropTotalsForActions = (drop, actionsCount, actionsPerHour) => {
		const dropsPerAction = drop.dropsPerAction ?? drop.dropsPerHour / actionsPerHour;
		const revenuePerAction = drop.revenuePerAction ?? drop.revenuePerHour / actionsPerHour;
		return {
			totalDrops: dropsPerAction * actionsCount,
			totalRevenue: revenuePerAction * actionsCount
		};
	};
	var formatRareFindBonusSummary = (bonusRevenue) => {
		return `${(bonusRevenue?.rareFindBonus || 0).toFixed(2)}% rare find`;
	};
	/**
	* Display gathering profit calculation in panel
	* @param {HTMLElement} panel - Action panel element
	* @param {string} actionHrid - Action HRID
	* @param {string} dropTableSelector - CSS selector for drop table element
	*/
	async function displayGatheringProfit(panel, actionHrid, dropTableSelector) {
		if (!src_core_config_js.default.getSetting("actionPanel_showProfitDetail")) return;
		const gatheringActionType = src_core_data_manager_js.default.getActionDetails(actionHrid)?.type;
		src_core_data_manager_js.default.setScrollSimulation(gatheringActionType, scrollSimulator.getScrollSetForActionType(gatheringActionType));
		const profitData = await calculateGatheringProfit(actionHrid);
		if (!profitData) {
			src_core_data_manager_js.default.clearScrollSimulation(gatheringActionType);
			console.error("❌ Gathering profit calculation failed for:", actionHrid);
			return;
		}
		const existingProfit = panel.querySelector("#mwi-foraging-profit");
		const openSectionTitles = /* @__PURE__ */ new Set();
		if (existingProfit) {
			existingProfit.querySelectorAll(".mwi-section-header").forEach((header) => {
				if (header.parentElement.querySelector(".mwi-section-content")?.style.display === "block") {
					const label = header.querySelector("span:last-child");
					if (label) openSectionTitles.add(label.textContent.trim());
				}
			});
			existingProfit.remove();
		}
		const profit = Math.round(profitData.profitPerHour);
		const profitPerDay = Math.round(profitData.profitPerDay);
		const baseMissing = profitData.baseOutputs?.some((output) => output.missingPrice) || false;
		const gourmetMissing = profitData.gourmetBonuses?.some((output) => output.missingPrice) || false;
		const bonusMissing = profitData.bonusRevenue?.hasMissingPrices || false;
		const processingMissing = profitData.processingConversions?.some((conversion) => conversion.missingPrice) || false;
		const primaryMissing = baseMissing || gourmetMissing || processingMissing;
		const revenueMissing = primaryMissing || bonusMissing;
		const drinkCostsMissing = profitData.drinkCosts?.some((drink) => drink.missingPrice) || false;
		const costsMissing = drinkCostsMissing || revenueMissing;
		const marketTaxMissing = revenueMissing;
		const netMissing = profitData.hasMissingPrices;
		const efficiencyMultiplier = profitData.efficiencyMultiplier || 1;
		const revenue = Math.round(profitData.revenuePerHour);
		const marketTax = Math.round(revenue * src_utils_profit_constants_js.MARKET_TAX);
		const costs = Math.round(profitData.drinkCostPerHour + marketTax);
		const summary = formatMissingLabel(netMissing, `${(0, src_utils_formatters_js.formatLargeNumber)(profit)}/hr, ${(0, src_utils_formatters_js.formatLargeNumber)(profitPerDay)}/day | ${(0, src_core_i18n_js.t)("Total profit: 0")}`);
		const detailsContent = document.createElement("div");
		const revenueDiv = document.createElement("div");
		const revenueLabel = formatMissingLabel(revenueMissing, `${(0, src_utils_formatters_js.formatLargeNumber)(revenue)}/hr`);
		revenueDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_PROFIT}; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Revenue: ") + revenueLabel}</div>`;
		const primaryDropsContent = document.createElement("div");
		if (profitData.baseOutputs && profitData.baseOutputs.length > 0) for (const output of profitData.baseOutputs) {
			const decimals = output.itemsPerHour < 1 ? 2 : 1;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(output.missingPrice);
			line.textContent = `• ${output.name} (Base): ${output.itemsPerHour.toFixed(decimals)}/hr @ ${(0, src_utils_formatters_js.formatWithSeparator)(output.priceEach)}${missingPriceNote} each → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(output.revenuePerHour))}/hr`;
			primaryDropsContent.appendChild(line);
		}
		if (profitData.gourmetBonuses && profitData.gourmetBonuses.length > 0) for (const output of profitData.gourmetBonuses) {
			const decimals = output.itemsPerHour < 1 ? 2 : 1;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(output.missingPrice);
			line.textContent = `• ${output.name} (Gourmet ${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus || 0, 1)}): ${output.itemsPerHour.toFixed(decimals)}/hr @ ${(0, src_utils_formatters_js.formatWithSeparator)(output.priceEach)}${missingPriceNote} each → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(output.revenuePerHour))}/hr`;
			primaryDropsContent.appendChild(line);
		}
		if (profitData.processingConversions && profitData.processingConversions.length > 0) {
			const netProcessingValue = Math.round(profitData.processingRevenueBonus || 0);
			const netProcessingLabel = formatMissingLabel(processingMissing, `${netProcessingValue >= 0 ? "+" : "-"}${(0, src_utils_formatters_js.formatLargeNumber)(Math.abs(netProcessingValue))}`);
			const processingContent = document.createElement("div");
			for (const conversion of profitData.processingConversions) {
				const consumedLine = document.createElement("div");
				consumedLine.style.marginLeft = "8px";
				const consumedMissingNote = getMissingPriceIndicator(conversion.missingPrice);
				const consumedRevenue = conversion.rawConsumedPerHour * conversion.rawPriceEach;
				consumedLine.textContent = `• ${conversion.rawItem} consumed: -${conversion.rawConsumedPerHour.toFixed(2)}/hr @ ${(0, src_utils_formatters_js.formatWithSeparator)(conversion.rawPriceEach)}${consumedMissingNote} → -${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(consumedRevenue))}/hr`;
				processingContent.appendChild(consumedLine);
				const producedLine = document.createElement("div");
				producedLine.style.marginLeft = "8px";
				const producedMissingNote = getMissingPriceIndicator(conversion.missingPrice);
				const producedRevenue = conversion.conversionsPerHour * conversion.processedPriceEach;
				producedLine.textContent = `• ${conversion.processedItem} produced: ${conversion.conversionsPerHour.toFixed(2)}/hr @ ${(0, src_utils_formatters_js.formatWithSeparator)(conversion.processedPriceEach)}${producedMissingNote} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(producedRevenue))}/hr`;
				processingContent.appendChild(producedLine);
			}
			const processingSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `• Processing (${(0, src_utils_formatters_js.formatPercentage)(profitData.processingBonus || 0, 1)} proc): Net ${netProcessingLabel}/hr`, null, processingContent, false, 1);
			primaryDropsContent.appendChild(processingSection);
		}
		const baseRevenue = profitData.baseOutputs?.reduce((sum, o) => sum + o.revenuePerHour, 0) || 0;
		const gourmetRevenue = profitData.gourmetRevenueBonus || 0;
		const processingRevenue = profitData.processingRevenueBonus || 0;
		const primaryRevenue = baseRevenue + gourmetRevenue + processingRevenue;
		const primaryRevenueLabel = formatMissingLabel(primaryMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(primaryRevenue)));
		const outputItemCount = (profitData.baseOutputs?.length || 0) + (profitData.processingConversions && profitData.processingConversions.length > 0 ? 1 : 0);
		const primaryDropsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Primary Outputs: ${primaryRevenueLabel}/hr (${outputItemCount} item${outputItemCount !== 1 ? "s" : ""})`, null, primaryDropsContent, false, 1);
		const bonusDrops = profitData.bonusRevenue?.bonusDrops || [];
		const essenceDrops = bonusDrops.filter((drop) => drop.type === "essence");
		const rareFinds = bonusDrops.filter((drop) => drop.type === "rare_find");
		let essenceSection = null;
		if (essenceDrops.length > 0) {
			const essenceContent = document.createElement("div");
			for (const drop of essenceDrops) {
				const { dropsPerHour, revenuePerHour } = getBonusDropPerHourTotals(drop, efficiencyMultiplier);
				const decimals = dropsPerHour < 1 ? 2 : 1;
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${dropsPerHour.toFixed(decimals)}/hr (${dropRatePct}) → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(revenuePerHour))}/hr`;
				essenceContent.appendChild(line);
			}
			const essenceRevenue = essenceDrops.reduce((sum, drop) => sum + getBonusDropPerHourTotals(drop, efficiencyMultiplier).revenuePerHour, 0);
			const essenceRevenueLabel = formatMissingLabel(bonusMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(essenceRevenue)));
			const essenceFindBonus = profitData.bonusRevenue?.essenceFindBonus || 0;
			essenceSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Essence Drops: ${essenceRevenueLabel}/hr (${essenceDrops.length} item${essenceDrops.length !== 1 ? "s" : ""}, ${essenceFindBonus.toFixed(2)}% essence find)`, null, essenceContent, false, 1);
		}
		let rareFindSection = null;
		if (rareFinds.length > 0) {
			const rareFindContent = document.createElement("div");
			for (const drop of rareFinds) {
				const { dropsPerHour, revenuePerHour } = getBonusDropPerHourTotals(drop, efficiencyMultiplier);
				const decimals = dropsPerHour < 1 ? 2 : 1;
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${dropsPerHour.toFixed(decimals)}/hr (${dropRatePct}) → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(revenuePerHour))}/hr`;
				rareFindContent.appendChild(line);
			}
			const rareFindRevenue = rareFinds.reduce((sum, drop) => sum + getBonusDropPerHourTotals(drop, efficiencyMultiplier).revenuePerHour, 0);
			const rareFindRevenueLabel = formatMissingLabel(bonusMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(rareFindRevenue)));
			const rareFindSummary = formatRareFindBonusSummary(profitData.bonusRevenue);
			rareFindSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Rare Finds: ${rareFindRevenueLabel}/hr (${rareFinds.length} item${rareFinds.length !== 1 ? "s" : ""}, ${rareFindSummary})`, null, rareFindContent, false, 1);
		}
		revenueDiv.appendChild(primaryDropsSection);
		if (essenceSection) revenueDiv.appendChild(essenceSection);
		if (rareFindSection) revenueDiv.appendChild(rareFindSection);
		const costsDiv = document.createElement("div");
		const costsLabel = formatMissingLabel(costsMissing, `${(0, src_utils_formatters_js.formatLargeNumber)(costs)}/hr`);
		costsDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_LOSS}; margin-top: 12px; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Costs: ") + costsLabel}</div>`;
		const drinkCostsContent = document.createElement("div");
		if (profitData.drinkCosts && profitData.drinkCosts.length > 0) for (const drink of profitData.drinkCosts) {
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(drink.missingPrice);
			line.textContent = `• ${drink.name}: ${drink.drinksPerHour.toFixed(2)}/hr @ ${(0, src_utils_formatters_js.formatWithSeparator)(drink.priceEach)}${missingPriceNote} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(drink.costPerHour))}/hr`;
			drinkCostsContent.appendChild(line);
		}
		const drinkCount = profitData.drinkCosts?.length || 0;
		const drinkCostsLabel = drinkCostsMissing ? "-- ⚠" : (0, src_utils_formatters_js.formatLargeNumber)(Math.round(profitData.drinkCostPerHour));
		const drinkCostsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Drink Costs: ${drinkCostsLabel}/hr (${drinkCount} drink${drinkCount !== 1 ? "s" : ""})`, null, drinkCostsContent, false, 1);
		costsDiv.appendChild(drinkCostsSection);
		const marketTaxContent = document.createElement("div");
		const marketTaxLine = document.createElement("div");
		marketTaxLine.style.marginLeft = "8px";
		const marketTaxLabel = marketTaxMissing ? "-- ⚠" : `${(0, src_utils_formatters_js.formatLargeNumber)(marketTax)}/hr`;
		marketTaxLine.textContent = (0, src_core_i18n_js.t)("• Market Tax: 2% of revenue → {0}", marketTaxLabel);
		marketTaxContent.appendChild(marketTaxLine);
		const marketTaxHeader = marketTaxMissing ? "-- ⚠" : `${(0, src_utils_formatters_js.formatLargeNumber)(marketTax)}/hr`;
		const marketTaxSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", (0, src_core_i18n_js.t)("Market Tax: {0} (2%)", marketTaxHeader), null, marketTaxContent, false, 1);
		costsDiv.appendChild(marketTaxSection);
		const modifierSummaryParts = [];
		const modifierSubSections = [];
		const makeModifierSection = (title, total, rows) => {
			const content = document.createElement("div");
			for (const row of rows) {
				const line = document.createElement("div");
				line.innerHTML = row;
				content.appendChild(line);
			}
			return (0, src_utils_ui_components_js.createCollapsibleSection)(null, `${title}: +${total}`, null, content, false, 1);
		};
		const effRows = [];
		if (profitData.details.levelEfficiency > 0) effRows.push(`+${profitData.details.levelEfficiency.toFixed(2)}% Level advantage`);
		if (profitData.details.houseEfficiency > 0) effRows.push(`+${profitData.details.houseEfficiency.toFixed(2)}% House room`);
		if (profitData.details.teaEfficiency > 0) effRows.push(`+${profitData.details.teaEfficiency.toFixed(2)}% Tea`);
		if ((profitData.details.equipmentEfficiencyItems || []).length > 0) for (const item of profitData.details.equipmentEfficiencyItems) {
			const enh = item.enhancementLevel > 0 ? ` +${item.enhancementLevel}` : "";
			effRows.push(`+${item.value.toFixed(2)}% ${item.name}${enh}`);
		}
		else if (profitData.details.equipmentEfficiency > 0) effRows.push(`+${profitData.details.equipmentEfficiency.toFixed(2)}% Equipment`);
		if (profitData.details.communityEfficiency > 0) effRows.push(`+${profitData.details.communityEfficiency.toFixed(2)}% Community buff`);
		if (profitData.details.achievementEfficiency > 0) effRows.push(`+${profitData.details.achievementEfficiency.toFixed(2)}% Achievement`);
		if (profitData.details.personalEfficiency > 0) {
			const icon = src_core_data_manager_js.default.isBuffBeingSimulated(gatheringActionType, "/buff_types/efficiency") ? scrollSpriteHtml$1("/buff_types/efficiency") : "";
			effRows.push(`${icon}+${profitData.details.personalEfficiency.toFixed(2)}% Scroll of Efficiency`);
		}
		if (effRows.length > 0) {
			modifierSummaryParts.push(`+${profitData.totalEfficiency.toFixed(2)}% eff`);
			modifierSubSections.push(makeModifierSection("Efficiency", `${profitData.totalEfficiency.toFixed(2)}%`, effRows));
		}
		if (profitData.gatheringQuantity > 0) {
			const gatherRows = [];
			if (profitData.details.communityBuffQuantity > 0) gatherRows.push(`+${(profitData.details.communityBuffQuantity * 100).toFixed(2)}% Community buff`);
			if (profitData.details.gatheringTeaBonus > 0) gatherRows.push(`+${(profitData.details.gatheringTeaBonus * 100).toFixed(2)}% Tea`);
			if (profitData.details.achievementGathering > 0) gatherRows.push(`+${(profitData.details.achievementGathering * 100).toFixed(2)}% Achievement`);
			if (profitData.details.personalGathering > 0) {
				const icon = src_core_data_manager_js.default.isBuffBeingSimulated(gatheringActionType, "/buff_types/gathering") ? scrollSpriteHtml$1("/buff_types/gathering") : "";
				gatherRows.push(`${icon}+${(profitData.details.personalGathering * 100).toFixed(2)}% Scroll of Gathering`);
			}
			const gatherTotal = `${(profitData.gatheringQuantity * 100).toFixed(2)}%`;
			modifierSummaryParts.push(`+${(profitData.gatheringQuantity * 100).toFixed(2)}% gather`);
			modifierSubSections.push(makeModifierSection("Gathering Quantity", gatherTotal, gatherRows));
		}
		const rareFindBonus = profitData.bonusRevenue?.rareFindBonus || 0;
		const rareFindBreakdown = profitData.bonusRevenue?.rareFindBreakdown || {};
		if (rareFindBonus > 0) {
			const rareRows = [];
			for (const item of rareFindBreakdown.equipmentItems || []) {
				const enh = item.enhancementLevel > 0 ? ` +${item.enhancementLevel}` : "";
				rareRows.push(`+${item.value.toFixed(2)}% ${item.name}${enh}`);
			}
			if (rareFindBreakdown.house > 0) rareRows.push(`+${rareFindBreakdown.house.toFixed(2)}% House rooms`);
			if (rareFindBreakdown.achievement > 0) rareRows.push(`+${rareFindBreakdown.achievement.toFixed(2)}% Achievement`);
			if (rareFindBreakdown.personal > 0) {
				const icon = src_core_data_manager_js.default.isBuffBeingSimulated(gatheringActionType, "/buff_types/rare_find") ? scrollSpriteHtml$1("/buff_types/rare_find") : "";
				rareRows.push(`${icon}+${rareFindBreakdown.personal.toFixed(2)}% Scroll of Rare Find`);
			}
			if (rareFindBreakdown.guild > 0) rareRows.push(`+${rareFindBreakdown.guild.toFixed(2)}% Guild Shrine`);
			modifierSummaryParts.push(`+${rareFindBonus.toFixed(2)}% rare`);
			modifierSubSections.push(makeModifierSection("Rare Find", `${rareFindBonus.toFixed(2)}%`, rareRows));
		}
		detailsContent.appendChild(revenueDiv);
		detailsContent.appendChild(costsDiv);
		if (modifierSubSections.length > 0) {
			const modifierContent = document.createElement("div");
			for (const sub of modifierSubSections) modifierContent.appendChild(sub);
			const modifiersSection = (0, src_utils_ui_components_js.createCollapsibleSection)("⚙️", (0, src_core_i18n_js.t)("Modifiers"), modifierSummaryParts.join(" | "), modifierContent, false, 0);
			detailsContent.appendChild(modifiersSection);
		}
		const topLevelContent = document.createElement("div");
		topLevelContent.innerHTML = `
        <div style="margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Actions: {0}/hr | Efficiency: +{1}%", profitData.actionsPerHour.toFixed(2), profitData.totalEfficiency.toFixed(2))}</div>
    `;
		const profitColor = netMissing ? src_core_config_js.default.SCRIPT_COLOR_ALERT : profit >= 0 ? "#4ade80" : src_core_config_js.default.COLOR_LOSS;
		const netProfitLine = document.createElement("div");
		netProfitLine.style.cssText = `
        font-weight: 500;
        color: ${profitColor};
        margin-bottom: 8px;
    `;
		netProfitLine.textContent = netMissing ? (0, src_core_i18n_js.t)("Net Profit: -- ⚠") : (0, src_core_i18n_js.t)("Net Profit: {0}/hr, {1}/day", (0, src_utils_formatters_js.formatLargeNumber)(profit), (0, src_utils_formatters_js.formatLargeNumber)(profitPerDay));
		topLevelContent.appendChild(netProfitLine);
		const pricingMode = profitData.pricingMode || "hybrid";
		const modeLabel = src_core_config_js.default.getPricingModeLabel(pricingMode);
		const modeDiv = document.createElement("div");
		modeDiv.style.cssText = `
        margin-bottom: 8px;
        color: #888;
        font-size: 0.85em;
    `;
		const gatheringSnapshotInfo = gatheringActionType ? loadoutSnapshot.getSnapshotInfoForSkill(gatheringActionType) : null;
		const gatheringLoadoutLabel = gatheringSnapshotInfo ? `${gatheringSnapshotInfo.name}${gatheringSnapshotInfo.isDefault ? (0, src_core_i18n_js.t)(" (Default)") : ""}` : (0, src_core_i18n_js.t)("Equipped");
		modeDiv.textContent = (0, src_core_i18n_js.t)("Pricing Mode: ") + modeLabel + " • " + (0, src_core_i18n_js.t)("Loadout: ") + gatheringLoadoutLabel;
		topLevelContent.appendChild(modeDiv);
		const detailedBreakdownSection = (0, src_utils_ui_components_js.createCollapsibleSection)("📊", (0, src_core_i18n_js.t)("Per hour breakdown"), null, detailsContent, false, 0);
		topLevelContent.appendChild(detailedBreakdownSection);
		const perActionBreakdown = buildGatheringPerActionBreakdown(profitData);
		topLevelContent.appendChild(perActionBreakdown);
		const inputField = (0, src_utils_action_panel_helper_js.findActionInput)(panel);
		if (inputField) {
			const inputValue = parseInt(inputField.value) || 0;
			if (inputValue > 0) {
				const actionsBreakdown = buildGatheringActionsBreakdown(profitData, inputValue);
				topLevelContent.appendChild(actionsBreakdown);
			}
			(0, src_utils_action_panel_helper_js.attachInputListeners)(panel, inputField, (newValue) => {
				const existingBreakdown = topLevelContent.querySelector(".mwi-actions-breakdown");
				if (existingBreakdown) existingBreakdown.remove();
				if (newValue > 0) {
					const actionsBreakdown = buildGatheringActionsBreakdown(profitData, newValue);
					topLevelContent.appendChild(actionsBreakdown);
				}
			});
		}
		const profitSection = (0, src_utils_ui_components_js.createCollapsibleSection)("💰", (0, src_core_i18n_js.t)("Profitability"), summary, topLevelContent, false, 0);
		profitSection.id = "mwi-foraging-profit";
		profitSection.setAttribute("data-mwi-profit-display", "true");
		profitSection.dataset.mwiActionHrid = actionHrid;
		profitSection.dataset.mwiActionType = "gathering";
		const profitSummaryDiv = profitSection.querySelector(".mwi-section-header + div");
		if (inputField && profitSummaryDiv) {
			const baseSummary = formatMissingLabel(netMissing, `${(0, src_utils_formatters_js.formatLargeNumber)(profit)}/hr, ${(0, src_utils_formatters_js.formatLargeNumber)(profitPerDay)}/day`);
			const updateSummary = (newValue) => {
				if (netMissing) {
					profitSummaryDiv.textContent = `${baseSummary} | ${(0, src_core_i18n_js.t)("Total profit: -- ⚠")}`;
					return;
				}
				if (inputField.value === "∞") profitSummaryDiv.textContent = `${baseSummary} | ${(0, src_core_i18n_js.t)("Total profit: {0}", (0, src_core_i18n_js.t)("[infinite]"))}`;
				else if (newValue > 0) {
					const totals = (0, src_utils_profit_helpers_js.calculateGatheringActionTotalsFromBase)({
						actionsCount: newValue,
						actionsPerHour: profitData.actionsPerHour,
						baseOutputs: profitData.baseOutputs,
						bonusDrops: profitData.bonusRevenue?.bonusDrops || [],
						processingRevenueBonusPerAction: profitData.processingRevenueBonusPerAction,
						gourmetRevenueBonusPerAction: profitData.gourmetRevenueBonusPerAction,
						drinkCostPerHour: profitData.drinkCostPerHour,
						efficiencyMultiplier: profitData.efficiencyMultiplier || 1
					});
					const totalProfit = Math.round(totals.totalProfit);
					profitSummaryDiv.textContent = `${baseSummary} | ${(0, src_core_i18n_js.t)("Total profit: {0}", (0, src_utils_formatters_js.formatLargeNumber)(totalProfit))}`;
				} else profitSummaryDiv.textContent = `${baseSummary} | ${(0, src_core_i18n_js.t)("Total profit: 0")}`;
			};
			updateSummary(parseInt(inputField.value) || 0);
			(0, src_utils_action_panel_helper_js.attachInputListeners)(panel, inputField, updateSummary);
		}
		let insertionPoint = panel.querySelector(".mwi-collapsible-section");
		if (insertionPoint) {
			while (insertionPoint.nextElementSibling && insertionPoint.nextElementSibling.className === "mwi-collapsible-section") insertionPoint = insertionPoint.nextElementSibling;
			insertionPoint.insertAdjacentElement("afterend", profitSection);
		} else {
			const dropTableElement = panel.querySelector(dropTableSelector);
			if (dropTableElement) dropTableElement.parentNode.insertBefore(profitSection, dropTableElement.nextSibling);
			else panel.appendChild(profitSection);
		}
		if (openSectionTitles.size > 0) profitSection.querySelectorAll(".mwi-section-header").forEach((header) => {
			const label = header.querySelector("span:last-child");
			const title = label?.textContent.trim();
			if (label && openSectionTitles.has(title)) header.click();
		});
		src_core_data_manager_js.default.clearScrollSimulation(gatheringActionType);
	}
	/**
	* Display production profit calculation in panel
	* @param {HTMLElement} panel - Action panel element
	* @param {string} actionHrid - Action HRID
	* @param {string} dropTableSelector - CSS selector for drop table element
	*/
	async function displayProductionProfit(panel, actionHrid, dropTableSelector) {
		if (!src_core_config_js.default.getSetting("actionPanel_showProfitDetail")) return;
		const productionActionType = src_core_data_manager_js.default.getActionDetails(actionHrid)?.type;
		src_core_data_manager_js.default.setScrollSimulation(productionActionType, scrollSimulator.getScrollSetForActionType(productionActionType));
		const profitData = await calculateProductionProfit(actionHrid);
		if (!profitData) {
			console.error("❌ Production profit calculation failed for:", actionHrid);
			return;
		}
		const missingFields = [
			"profitPerHour",
			"profitPerDay",
			"itemsPerHour",
			"priceAfterTax",
			"gourmetBonusItems",
			"materialCostPerHour",
			"totalTeaCostPerHour",
			"actionsPerHour",
			"totalEfficiency",
			"levelEfficiency",
			"houseEfficiency",
			"teaEfficiency",
			"equipmentEfficiency",
			"artisanBonus",
			"gourmetBonus",
			"materialCosts",
			"teaCosts"
		].filter((field) => profitData[field] === void 0);
		if (missingFields.length > 0) {
			console.error("❌ Production profit data missing required fields:", missingFields, "for action:", actionHrid);
			console.error("Received profitData:", profitData);
			return;
		}
		const existingProfit = panel.querySelector("#mwi-production-profit");
		const openSectionTitles = /* @__PURE__ */ new Set();
		if (existingProfit) {
			existingProfit.querySelectorAll(".mwi-section-header").forEach((header) => {
				if (header.parentElement.querySelector(".mwi-section-content")?.style.display === "block") {
					const label = header.querySelector("span:last-child");
					if (label) openSectionTitles.add(label.textContent.trim());
				}
			});
			existingProfit.remove();
		}
		const profit = Math.round(profitData.profitPerHour);
		const profitPerDay = Math.round(profitData.profitPerDay);
		const outputMissing = profitData.outputPriceMissing || false;
		const outputEstimated = profitData.outputPriceEstimated || false;
		const bonusMissing = profitData.bonusRevenue?.hasMissingPrices || false;
		const materialMissing = profitData.materialCosts?.some((material) => material.missingPrice) || false;
		const teaMissing = profitData.teaCosts?.some((tea) => tea.missingPrice) || false;
		const revenueMissing = outputMissing && !outputEstimated || bonusMissing;
		const outputItemDetails = src_core_data_manager_js.default.getItemDetails(profitData.itemHrid);
		if (outputItemDetails && !outputItemDetails.isTradable) return;
		const revenueEstimated = outputEstimated && !revenueMissing;
		const costsMissing = materialMissing || teaMissing || revenueMissing;
		const costsEstimated = revenueEstimated && !costsMissing;
		const marketTaxMissing = revenueMissing;
		const marketTaxEstimated = revenueEstimated && !marketTaxMissing;
		const netMissing = profitData.hasMissingPrices;
		const netEstimated = (revenueEstimated || costsEstimated) && !netMissing;
		const bonusDrops = profitData.bonusRevenue?.bonusDrops || [];
		const bonusRevenueTotal = profitData.bonusRevenue?.totalBonusRevenue || 0;
		const efficiencyMultiplier = profitData.efficiencyMultiplier || 1;
		const revenue = Math.round(profitData.itemsPerHour * profitData.outputPrice + profitData.gourmetBonusItems * profitData.outputPrice + bonusRevenueTotal * efficiencyMultiplier);
		const marketTax = Math.round(revenue * src_utils_profit_constants_js.MARKET_TAX);
		const costs = Math.round(profitData.materialCostPerHour + profitData.totalTeaCostPerHour + marketTax);
		const summary = netMissing ? "-- ⚠" : `${(0, src_utils_formatters_js.formatLargeNumber)(profit)}/hr, ${(0, src_utils_formatters_js.formatLargeNumber)(profitPerDay)}/day | Total profit: 0`;
		const detailsContent = document.createElement("div");
		const revenueDiv = document.createElement("div");
		const revenueLabel = revenueMissing ? "-- ⚠" : revenueEstimated ? `${(0, src_utils_formatters_js.formatLargeNumber)(revenue)}/hr ⚠` : `${(0, src_utils_formatters_js.formatLargeNumber)(revenue)}/hr`;
		revenueDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_PROFIT}; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Revenue: ") + revenueLabel}</div>`;
		const primaryOutputContent = document.createElement("div");
		const baseOutputLine = document.createElement("div");
		baseOutputLine.style.marginLeft = "8px";
		const baseOutputMissingNote = getMissingPriceIndicator(profitData.outputPriceMissing || profitData.outputPriceEstimated);
		baseOutputLine.textContent = `• ${profitData.itemName} (Base): ${profitData.itemsPerHour.toFixed(2)}/hr @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(profitData.outputPrice))}${baseOutputMissingNote} each → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(profitData.itemsPerHour * profitData.outputPrice))}/hr`;
		primaryOutputContent.appendChild(baseOutputLine);
		if (profitData.gourmetBonusItems > 0) {
			const gourmetLine = document.createElement("div");
			gourmetLine.style.marginLeft = "8px";
			gourmetLine.textContent = `• ${profitData.itemName} (Gourmet +${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus, 1)}): ${profitData.gourmetBonusItems.toFixed(2)}/hr @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(profitData.outputPrice))}${baseOutputMissingNote} each → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(profitData.gourmetBonusItems * profitData.outputPrice))}/hr`;
			primaryOutputContent.appendChild(gourmetLine);
		}
		const primaryRevenue = profitData.itemsPerHour * profitData.outputPrice + profitData.gourmetBonusItems * profitData.outputPrice;
		const primaryRevenueLabel = outputMissing ? "-- ⚠" : (0, src_utils_formatters_js.formatLargeNumber)(Math.round(primaryRevenue));
		const gourmetLabel = profitData.gourmetBonus > 0 ? ` (${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus, 1)} gourmet)` : "";
		const primaryOutputSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Primary Outputs: ${primaryRevenueLabel}/hr${gourmetLabel}`, null, primaryOutputContent, false, 1);
		revenueDiv.appendChild(primaryOutputSection);
		const essenceDrops = bonusDrops.filter((drop) => drop.type === "essence");
		const rareFinds = bonusDrops.filter((drop) => drop.type === "rare_find");
		let essenceSection = null;
		if (essenceDrops.length > 0) {
			const essenceContent = document.createElement("div");
			for (const drop of essenceDrops) {
				const { dropsPerHour, revenuePerHour } = getBonusDropPerHourTotals(drop, efficiencyMultiplier);
				const decimals = dropsPerHour < 1 ? 2 : 1;
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${dropsPerHour.toFixed(decimals)}/hr (${dropRatePct}) → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(revenuePerHour))}/hr`;
				essenceContent.appendChild(line);
			}
			const essenceRevenue = essenceDrops.reduce((sum, drop) => sum + getBonusDropPerHourTotals(drop, efficiencyMultiplier).revenuePerHour, 0);
			const essenceRevenueLabel = bonusMissing ? "-- ⚠" : (0, src_utils_formatters_js.formatLargeNumber)(Math.round(essenceRevenue));
			const essenceFindBonus = profitData.bonusRevenue?.essenceFindBonus || 0;
			essenceSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Essence Drops: ${essenceRevenueLabel}/hr (${essenceDrops.length} item${essenceDrops.length !== 1 ? "s" : ""}, ${essenceFindBonus.toFixed(2)}% essence find)`, null, essenceContent, false, 1);
		}
		let rareFindSection = null;
		if (rareFinds.length > 0) {
			const rareFindContent = document.createElement("div");
			for (const drop of rareFinds) {
				const { dropsPerHour, revenuePerHour } = getBonusDropPerHourTotals(drop, efficiencyMultiplier);
				const decimals = dropsPerHour < 1 ? 2 : 1;
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${dropsPerHour.toFixed(decimals)}/hr (${dropRatePct}) → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(revenuePerHour))}/hr`;
				rareFindContent.appendChild(line);
			}
			const rareFindRevenue = rareFinds.reduce((sum, drop) => sum + getBonusDropPerHourTotals(drop, efficiencyMultiplier).revenuePerHour, 0);
			const rareFindRevenueLabel = bonusMissing ? "-- ⚠" : (0, src_utils_formatters_js.formatLargeNumber)(Math.round(rareFindRevenue));
			const rareFindSummary = formatRareFindBonusSummary(profitData.bonusRevenue);
			rareFindSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Rare Finds: ${rareFindRevenueLabel}/hr (${rareFinds.length} item${rareFinds.length !== 1 ? "s" : ""}, ${rareFindSummary})`, null, rareFindContent, false, 1);
		}
		if (essenceSection) revenueDiv.appendChild(essenceSection);
		if (rareFindSection) revenueDiv.appendChild(rareFindSection);
		const costsDiv = document.createElement("div");
		const costsLabel = costsMissing ? "-- ⚠" : costsEstimated ? `${(0, src_utils_formatters_js.formatLargeNumber)(costs)}/hr ⚠` : `${(0, src_utils_formatters_js.formatLargeNumber)(costs)}/hr`;
		costsDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_LOSS}; margin-top: 12px; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Costs: ") + costsLabel}</div>`;
		const materialCostsContent = document.createElement("div");
		if (profitData.materialCosts && profitData.materialCosts.length > 0) for (const material of profitData.materialCosts) {
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const amountPerAction = material.amount || 0;
			const efficiencyMultiplier = profitData.efficiencyMultiplier;
			const amountPerHour = amountPerAction * profitData.actionsPerHour * efficiencyMultiplier;
			let materialText = `• ${material.itemName}: ${amountPerHour.toFixed(2)}/hr`;
			if (profitData.artisanBonus > 0 && material.baseAmount && material.amount !== material.baseAmount) {
				const baseAmountPerHour = material.baseAmount * profitData.actionsPerHour * efficiencyMultiplier;
				materialText += ` (${baseAmountPerHour.toFixed(2)} base -${(0, src_utils_formatters_js.formatPercentage)(profitData.artisanBonus, 1)} 🍵)`;
			}
			const missingPriceNote = getMissingPriceIndicator(material.missingPrice);
			const customPriceNote = material.customPrice ? " *" : "";
			materialText += ` @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(material.askPrice))}${missingPriceNote}${customPriceNote} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(material.totalCost * profitData.actionsPerHour * efficiencyMultiplier))}/hr`;
			line.textContent = materialText;
			materialCostsContent.appendChild(line);
		}
		const materialCostsLabel = formatMissingLabel(materialMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(profitData.materialCostPerHour)));
		const materialCostsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Material Costs: ${materialCostsLabel}/hr (${profitData.materialCosts?.length || 0} material${profitData.materialCosts?.length !== 1 ? "s" : ""})`, null, materialCostsContent, false, 1);
		const teaCostsContent = document.createElement("div");
		if (profitData.teaCosts && profitData.teaCosts.length > 0) for (const tea of profitData.teaCosts) {
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(tea.missingPrice);
			line.textContent = `• ${tea.itemName}: ${tea.drinksPerHour.toFixed(2)}/hr @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(tea.pricePerDrink))}${missingPriceNote} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(tea.totalCost))}/hr`;
			teaCostsContent.appendChild(line);
		}
		const teaCount = profitData.teaCosts?.length || 0;
		const teaCostsLabel = formatMissingLabel(teaMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(profitData.totalTeaCostPerHour)));
		const teaCostsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Drink Costs: ${teaCostsLabel}/hr (${teaCount} drink${teaCount !== 1 ? "s" : ""})`, null, teaCostsContent, false, 1);
		costsDiv.appendChild(materialCostsSection);
		costsDiv.appendChild(teaCostsSection);
		const marketTaxContent = document.createElement("div");
		const marketTaxLine = document.createElement("div");
		marketTaxLine.style.marginLeft = "8px";
		const marketTaxLabel = marketTaxMissing ? "-- ⚠" : marketTaxEstimated ? `${(0, src_utils_formatters_js.formatLargeNumber)(marketTax)}/hr ⚠` : `${(0, src_utils_formatters_js.formatLargeNumber)(marketTax)}/hr`;
		marketTaxLine.textContent = (0, src_core_i18n_js.t)("• Market Tax: 2% of revenue → {0}", marketTaxLabel);
		marketTaxContent.appendChild(marketTaxLine);
		const marketTaxSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", (0, src_core_i18n_js.t)("Market Tax: {0} (2%)", marketTaxLabel), null, marketTaxContent, false, 1);
		costsDiv.appendChild(marketTaxSection);
		const modifierSummaryParts = [];
		const modifierSubSections = [];
		const makeModifierSectionProd = (title, total, rows) => {
			const content = document.createElement("div");
			for (const row of rows) {
				const line = document.createElement("div");
				line.innerHTML = row;
				content.appendChild(line);
			}
			return (0, src_utils_ui_components_js.createCollapsibleSection)(null, `${title}: +${total}`, null, content, false, 1);
		};
		const effRows = [];
		if (profitData.levelEfficiency > 0) effRows.push(`+${profitData.levelEfficiency}% Level advantage`);
		if (profitData.houseEfficiency > 0) effRows.push(`+${profitData.houseEfficiency.toFixed(2)}% House room`);
		if (profitData.teaEfficiency > 0) effRows.push(`+${profitData.teaEfficiency.toFixed(2)}% Tea`);
		if ((profitData.equipmentEfficiencyItems || []).length > 0) for (const item of profitData.equipmentEfficiencyItems) {
			const enh = item.enhancementLevel > 0 ? ` +${item.enhancementLevel}` : "";
			effRows.push(`+${item.value.toFixed(2)}% ${item.name}${enh}`);
		}
		else if (profitData.equipmentEfficiency > 0) effRows.push(`+${profitData.equipmentEfficiency.toFixed(2)}% Equipment`);
		if (profitData.communityEfficiency > 0) effRows.push(`+${profitData.communityEfficiency.toFixed(2)}% Community buff`);
		if (profitData.achievementEfficiency > 0) effRows.push(`+${profitData.achievementEfficiency.toFixed(2)}% Achievement`);
		if (profitData.personalEfficiency > 0) {
			const simSprite = src_core_data_manager_js.default.isBuffBeingSimulated(productionActionType, "/buff_types/efficiency") ? scrollSpriteHtml$1("/buff_types/efficiency") : "";
			effRows.push(`${simSprite}+${profitData.personalEfficiency.toFixed(2)}% Scroll of Efficiency`);
		}
		if (effRows.length > 0) {
			modifierSummaryParts.push(`+${profitData.totalEfficiency.toFixed(2)}% eff`);
			modifierSubSections.push(makeModifierSectionProd("Efficiency", `${profitData.totalEfficiency.toFixed(2)}%`, effRows));
		}
		const productionRareFindBonus = profitData.bonusRevenue?.rareFindBonus || 0;
		const productionRareFindBreakdown = profitData.bonusRevenue?.rareFindBreakdown || {};
		if (productionRareFindBonus > 0) {
			const rareRows = [];
			for (const item of productionRareFindBreakdown.equipmentItems || []) {
				const enh = item.enhancementLevel > 0 ? ` +${item.enhancementLevel}` : "";
				rareRows.push(`+${item.value.toFixed(2)}% ${item.name}${enh}`);
			}
			if (productionRareFindBreakdown.house > 0) rareRows.push(`+${productionRareFindBreakdown.house.toFixed(2)}% House rooms`);
			if (productionRareFindBreakdown.achievement > 0) rareRows.push(`+${productionRareFindBreakdown.achievement.toFixed(2)}% Achievement`);
			if (productionRareFindBreakdown.personal > 0) {
				const simSprite = src_core_data_manager_js.default.isBuffBeingSimulated(productionActionType, "/buff_types/rare_find") ? scrollSpriteHtml$1("/buff_types/rare_find") : "";
				rareRows.push(`${simSprite}+${productionRareFindBreakdown.personal.toFixed(2)}% Scroll of Rare Find`);
			}
			modifierSummaryParts.push(`+${productionRareFindBonus.toFixed(2)}% rare`);
			modifierSubSections.push(makeModifierSectionProd("Rare Find", `${productionRareFindBonus.toFixed(2)}%`, rareRows));
		}
		if (profitData.artisanBonus > 0) {
			const artisanContent = document.createElement("div");
			artisanContent.textContent = `-${(0, src_utils_formatters_js.formatPercentage)(profitData.artisanBonus, 1)} material requirement from Artisan Tea`;
			modifierSummaryParts.push(`-${(0, src_utils_formatters_js.formatPercentage)(profitData.artisanBonus, 1)} artisan`);
			modifierSubSections.push((0, src_utils_ui_components_js.createCollapsibleSection)(null, `Artisan: -${(0, src_utils_formatters_js.formatPercentage)(profitData.artisanBonus, 1)}`, null, artisanContent, false, 1));
		}
		if (profitData.gourmetBonus > 0) {
			const gourmetContent = document.createElement("div");
			gourmetContent.textContent = `+${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus, 1)} bonus items from Gourmet Tea`;
			modifierSummaryParts.push(`+${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus, 1)} gourmet`);
			modifierSubSections.push((0, src_utils_ui_components_js.createCollapsibleSection)(null, `Gourmet: +${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus, 1)}`, null, gourmetContent, false, 1));
		}
		detailsContent.appendChild(revenueDiv);
		detailsContent.appendChild(costsDiv);
		if (modifierSubSections.length > 0) {
			const modifierContent = document.createElement("div");
			for (const sub of modifierSubSections) modifierContent.appendChild(sub);
			const modifiersSection = (0, src_utils_ui_components_js.createCollapsibleSection)("⚙️", (0, src_core_i18n_js.t)("Modifiers"), modifierSummaryParts.join(" | "), modifierContent, false, 0);
			detailsContent.appendChild(modifiersSection);
		}
		const topLevelContent = document.createElement("div");
		const effectiveActionsPerHour = profitData.actionsPerHour * profitData.efficiencyMultiplier;
		topLevelContent.innerHTML = `
        <div style="margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Actions: {0}/hr", effectiveActionsPerHour.toFixed(2))}</div>
    `;
		const profitColor = netMissing ? src_core_config_js.default.SCRIPT_COLOR_ALERT : profit >= 0 ? "#4ade80" : src_core_config_js.default.COLOR_LOSS;
		const netProfitLine = document.createElement("div");
		netProfitLine.style.cssText = `
        font-weight: 500;
        color: ${profitColor};
        margin-bottom: 8px;
    `;
		netProfitLine.textContent = netMissing ? (0, src_core_i18n_js.t)("Net Profit: -- ⚠") : netEstimated ? (0, src_core_i18n_js.t)("Net Profit: {0}/hr ⚠, {1}/day ⚠", (0, src_utils_formatters_js.formatLargeNumber)(profit), (0, src_utils_formatters_js.formatLargeNumber)(profitPerDay)) : (0, src_core_i18n_js.t)("Net Profit: {0}/hr, {1}/day", (0, src_utils_formatters_js.formatLargeNumber)(profit), (0, src_utils_formatters_js.formatLargeNumber)(profitPerDay));
		topLevelContent.appendChild(netProfitLine);
		const pricingMode = profitData.pricingMode || "hybrid";
		const modeLabel = src_core_config_js.default.getPricingModeLabel(pricingMode);
		const modeDiv = document.createElement("div");
		modeDiv.style.cssText = `
        margin-bottom: 8px;
        color: #888;
        font-size: 0.85em;
    `;
		const productionSnapshotInfo = productionActionType ? loadoutSnapshot.getSnapshotInfoForSkill(productionActionType) : null;
		const productionLoadoutLabel = productionSnapshotInfo ? `${productionSnapshotInfo.name}${productionSnapshotInfo.isDefault ? (0, src_core_i18n_js.t)(" (Default)") : ""}` : (0, src_core_i18n_js.t)("Equipped");
		modeDiv.textContent = (0, src_core_i18n_js.t)("Pricing Mode: ") + modeLabel + " • " + (0, src_core_i18n_js.t)("Loadout: ") + productionLoadoutLabel;
		topLevelContent.appendChild(modeDiv);
		const detailedBreakdownSection = (0, src_utils_ui_components_js.createCollapsibleSection)("📊", (0, src_core_i18n_js.t)("Per hour breakdown"), null, detailsContent, false, 0);
		topLevelContent.appendChild(detailedBreakdownSection);
		const perActionBreakdown = buildProductionPerActionBreakdown(profitData);
		topLevelContent.appendChild(perActionBreakdown);
		const inputField = (0, src_utils_action_panel_helper_js.findActionInput)(panel);
		if (inputField) {
			const inputValue = parseInt(inputField.value) || 0;
			if (inputValue > 0) {
				const actionsBreakdown = buildProductionActionsBreakdown(profitData, inputValue);
				topLevelContent.appendChild(actionsBreakdown);
			}
			(0, src_utils_action_panel_helper_js.attachInputListeners)(panel, inputField, (newValue) => {
				const existingBreakdown = topLevelContent.querySelector(".mwi-actions-breakdown");
				if (existingBreakdown) existingBreakdown.remove();
				if (newValue > 0) {
					const actionsBreakdown = buildProductionActionsBreakdown(profitData, newValue);
					topLevelContent.appendChild(actionsBreakdown);
				}
			});
		}
		const profitSection = (0, src_utils_ui_components_js.createCollapsibleSection)("💰", (0, src_core_i18n_js.t)("Profitability"), summary, topLevelContent, false, 0);
		profitSection.id = "mwi-production-profit";
		profitSection.setAttribute("data-mwi-profit-display", "true");
		profitSection.dataset.mwiActionHrid = actionHrid;
		profitSection.dataset.mwiActionType = "production";
		const profitSummaryDiv = profitSection.querySelector(".mwi-section-header + div");
		if (inputField && profitSummaryDiv) {
			const baseSummary = formatMissingLabel(netMissing, `${(0, src_utils_formatters_js.formatLargeNumber)(profit)}/hr, ${(0, src_utils_formatters_js.formatLargeNumber)(profitPerDay)}/day`);
			const updateSummary = (newValue) => {
				if (netMissing) {
					profitSummaryDiv.textContent = `${baseSummary} | ${(0, src_core_i18n_js.t)("Total profit: -- ⚠")}`;
					return;
				}
				if (inputField.value === "∞") profitSummaryDiv.textContent = `${baseSummary} | ${(0, src_core_i18n_js.t)("Total profit: {0}", (0, src_core_i18n_js.t)("[infinite]"))}`;
				else if (newValue > 0) {
					const totals = (0, src_utils_profit_helpers_js.calculateProductionActionTotalsFromBase)({
						actionsCount: newValue,
						actionsPerHour: profitData.actionsPerHour,
						outputAmount: profitData.outputAmount || 1,
						outputPrice: profitData.outputPrice,
						gourmetBonus: profitData.gourmetBonus || 0,
						bonusDrops: profitData.bonusRevenue?.bonusDrops || [],
						materialCosts: profitData.materialCosts,
						totalTeaCostPerHour: profitData.totalTeaCostPerHour,
						efficiencyMultiplier: profitData.efficiencyMultiplier || 1
					});
					const totalProfit = Math.round(totals.totalProfit);
					profitSummaryDiv.textContent = `${baseSummary} | ${(0, src_core_i18n_js.t)("Total profit: {0}", (0, src_utils_formatters_js.formatLargeNumber)(totalProfit))}`;
				} else profitSummaryDiv.textContent = `${baseSummary} | ${(0, src_core_i18n_js.t)("Total profit: 0")}`;
			};
			updateSummary(parseInt(inputField.value) || 0);
			(0, src_utils_action_panel_helper_js.attachInputListeners)(panel, inputField, updateSummary);
		}
		let insertionPoint = panel.querySelector(".mwi-collapsible-section");
		if (insertionPoint) {
			while (insertionPoint.nextElementSibling && insertionPoint.nextElementSibling.className === "mwi-collapsible-section") insertionPoint = insertionPoint.nextElementSibling;
			insertionPoint.insertAdjacentElement("afterend", profitSection);
		} else {
			const dropTableElement = panel.querySelector(dropTableSelector);
			if (dropTableElement) dropTableElement.parentNode.insertBefore(profitSection, dropTableElement.nextSibling);
			else panel.appendChild(profitSection);
		}
		if (openSectionTitles.size > 0) profitSection.querySelectorAll(".mwi-section-header").forEach((header) => {
			const label = header.querySelector("span:last-child");
			if (label && openSectionTitles.has(label.textContent.trim())) header.click();
		});
		src_core_data_manager_js.default.clearScrollSimulation(productionActionType);
	}
	/**
	* Format a per-action value with appropriate decimal precision
	* @param {number} value - The per-action value
	* @returns {string} Formatted value
	*/
	function formatPerAction(value) {
		const abs = Math.abs(value);
		if (abs >= 1e3) return (0, src_utils_formatters_js.formatLargeNumber)(Math.round(value));
		if (abs >= 10) return value.toFixed(2);
		if (abs >= 1) return value.toFixed(2);
		if (abs === 0) return "0";
		return value.toFixed(2);
	}
	/**
	* Build "Per action breakdown" section for gathering actions
	* @param {Object} profitData - Profit calculation data
	* @returns {HTMLElement} Breakdown section element
	*/
	function buildGatheringPerActionBreakdown(profitData) {
		const actionsPerHour = profitData.actionsPerHour;
		const baseMissing = profitData.baseOutputs?.some((output) => output.missingPrice) || false;
		const gourmetMissing = profitData.gourmetBonuses?.some((output) => output.missingPrice) || false;
		const bonusMissing = profitData.bonusRevenue?.hasMissingPrices || false;
		const processingMissing = profitData.processingConversions?.some((conversion) => conversion.missingPrice) || false;
		const primaryMissing = baseMissing || gourmetMissing || processingMissing;
		const revenueMissing = primaryMissing || bonusMissing;
		const drinkCostsMissing = profitData.drinkCosts?.some((drink) => drink.missingPrice) || false;
		const costsMissing = drinkCostsMissing || revenueMissing;
		const marketTaxMissing = revenueMissing;
		const netMissing = profitData.hasMissingPrices;
		const efficiencyMultiplier = profitData.efficiencyMultiplier || 1;
		const revenuePerHour = profitData.revenuePerHour;
		const revenuePerAction = revenuePerHour / actionsPerHour;
		const marketTaxPerAction = revenuePerHour * src_utils_profit_constants_js.MARKET_TAX / actionsPerHour;
		const drinkCostPerAction = profitData.drinkCostPerHour / actionsPerHour;
		const costsPerAction = drinkCostPerAction + marketTaxPerAction;
		const profitPerAction = profitData.profitPerAction;
		const detailsContent = document.createElement("div");
		const revenueDiv = document.createElement("div");
		const revenueLabel = formatMissingLabel(revenueMissing, `${formatPerAction(revenuePerAction)}/action`);
		revenueDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_PROFIT}; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Revenue: ") + revenueLabel}</div>`;
		const primaryDropsContent = document.createElement("div");
		if (profitData.baseOutputs && profitData.baseOutputs.length > 0) for (const output of profitData.baseOutputs) {
			const itemsPerAction = output.itemsPerAction ?? output.itemsPerHour / actionsPerHour;
			const revPerAction = output.revenuePerAction ?? output.revenuePerHour / actionsPerHour;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(output.missingPrice);
			line.textContent = `• ${output.name} (Base): ${itemsPerAction.toFixed(2)}/action @ ${(0, src_utils_formatters_js.formatWithSeparator)(output.priceEach)}${missingPriceNote} each → ${formatPerAction(revPerAction)}/action`;
			primaryDropsContent.appendChild(line);
		}
		if (profitData.gourmetBonuses && profitData.gourmetBonuses.length > 0) for (const output of profitData.gourmetBonuses) {
			const itemsPerAction = output.itemsPerAction ?? output.itemsPerHour / actionsPerHour;
			const revPerAction = output.revenuePerAction ?? output.revenuePerHour / actionsPerHour;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(output.missingPrice);
			line.textContent = `• ${output.name} (Gourmet ${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus || 0, 1)}): ${itemsPerAction.toFixed(2)}/action @ ${(0, src_utils_formatters_js.formatWithSeparator)(output.priceEach)}${missingPriceNote} each → ${formatPerAction(revPerAction)}/action`;
			primaryDropsContent.appendChild(line);
		}
		if (profitData.processingConversions && profitData.processingConversions.length > 0) {
			const netProcessingPerAction = (profitData.processingRevenueBonus || 0) / actionsPerHour;
			const netProcessingLabel = formatMissingLabel(processingMissing, `${netProcessingPerAction >= 0 ? "+" : "-"}${formatPerAction(Math.abs(netProcessingPerAction))}`);
			const processingContent = document.createElement("div");
			for (const conversion of profitData.processingConversions) {
				const rawConsumedPerAction = conversion.rawConsumedPerAction ?? conversion.rawConsumedPerHour / actionsPerHour;
				const conversionsPerAction = conversion.conversionsPerAction ?? conversion.conversionsPerHour / actionsPerHour;
				const consumedRevenuePerAction = rawConsumedPerAction * conversion.rawPriceEach;
				const producedRevenuePerAction = conversionsPerAction * conversion.processedPriceEach;
				const missingPriceNote = getMissingPriceIndicator(conversion.missingPrice);
				const consumedLine = document.createElement("div");
				consumedLine.style.marginLeft = "8px";
				consumedLine.textContent = `• ${conversion.rawItem} consumed: -${rawConsumedPerAction.toFixed(2)}/action @ ${(0, src_utils_formatters_js.formatWithSeparator)(conversion.rawPriceEach)}${missingPriceNote} → -${formatPerAction(consumedRevenuePerAction)}/action`;
				processingContent.appendChild(consumedLine);
				const producedLine = document.createElement("div");
				producedLine.style.marginLeft = "8px";
				producedLine.textContent = `• ${conversion.processedItem} produced: ${conversionsPerAction.toFixed(2)}/action @ ${(0, src_utils_formatters_js.formatWithSeparator)(conversion.processedPriceEach)}${missingPriceNote} → ${formatPerAction(producedRevenuePerAction)}/action`;
				processingContent.appendChild(producedLine);
			}
			const processingSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `• Processing (${(0, src_utils_formatters_js.formatPercentage)(profitData.processingBonus || 0, 1)} proc): Net ${netProcessingLabel}/action`, null, processingContent, false, 1);
			primaryDropsContent.appendChild(processingSection);
		}
		const baseRevenuePerAction = profitData.baseOutputs?.reduce((sum, o) => {
			return sum + (o.revenuePerAction ?? o.revenuePerHour / actionsPerHour);
		}, 0) || 0;
		const gourmetRevenuePerAction = (profitData.gourmetRevenueBonus || 0) / actionsPerHour;
		const processingRevenuePerAction = (profitData.processingRevenueBonus || 0) / actionsPerHour;
		const primaryRevenueLabel = formatMissingLabel(primaryMissing, `${formatPerAction(baseRevenuePerAction + gourmetRevenuePerAction + processingRevenuePerAction)}/action`);
		const outputItemCount = (profitData.baseOutputs?.length || 0) + (profitData.processingConversions && profitData.processingConversions.length > 0 ? 1 : 0);
		const primaryDropsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Primary Outputs: ${primaryRevenueLabel} (${outputItemCount} item${outputItemCount !== 1 ? "s" : ""})`, null, primaryDropsContent, false, 1);
		const bonusDrops = profitData.bonusRevenue?.bonusDrops || [];
		const essenceDrops = bonusDrops.filter((drop) => drop.type === "essence");
		const rareFinds = bonusDrops.filter((drop) => drop.type === "rare_find");
		let essenceSection = null;
		if (essenceDrops.length > 0) {
			const essenceContent = document.createElement("div");
			for (const drop of essenceDrops) {
				const { dropsPerHour, revenuePerHour } = getBonusDropPerHourTotals(drop, efficiencyMultiplier);
				const dropsPA = dropsPerHour / actionsPerHour;
				const revenuePA = revenuePerHour / actionsPerHour;
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${dropsPA.toFixed(4)}/action (${dropRatePct}) → ${formatPerAction(revenuePA)}/action`;
				essenceContent.appendChild(line);
			}
			const essenceRevenueLabel = formatMissingLabel(bonusMissing, `${formatPerAction(essenceDrops.reduce((sum, drop) => sum + getBonusDropPerHourTotals(drop, efficiencyMultiplier).revenuePerHour / actionsPerHour, 0))}/action`);
			const essenceFindBonus = profitData.bonusRevenue?.essenceFindBonus || 0;
			essenceSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Essence Drops: ${essenceRevenueLabel} (${essenceDrops.length} item${essenceDrops.length !== 1 ? "s" : ""}, ${essenceFindBonus.toFixed(2)}% essence find)`, null, essenceContent, false, 1);
		}
		let rareFindSection = null;
		if (rareFinds.length > 0) {
			const rareFindContent = document.createElement("div");
			for (const drop of rareFinds) {
				const { dropsPerHour, revenuePerHour } = getBonusDropPerHourTotals(drop, efficiencyMultiplier);
				const dropsPA = dropsPerHour / actionsPerHour;
				const revenuePA = revenuePerHour / actionsPerHour;
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${dropsPA.toFixed(4)}/action (${dropRatePct}) → ${formatPerAction(revenuePA)}/action`;
				rareFindContent.appendChild(line);
			}
			const rareFindRevenueLabel = formatMissingLabel(bonusMissing, `${formatPerAction(rareFinds.reduce((sum, drop) => sum + getBonusDropPerHourTotals(drop, efficiencyMultiplier).revenuePerHour / actionsPerHour, 0))}/action`);
			const rareFindSummary = formatRareFindBonusSummary(profitData.bonusRevenue);
			rareFindSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Rare Finds: ${rareFindRevenueLabel} (${rareFinds.length} item${rareFinds.length !== 1 ? "s" : ""}, ${rareFindSummary})`, null, rareFindContent, false, 1);
		}
		revenueDiv.appendChild(primaryDropsSection);
		if (essenceSection) revenueDiv.appendChild(essenceSection);
		if (rareFindSection) revenueDiv.appendChild(rareFindSection);
		const costsDiv = document.createElement("div");
		const costsLabel = formatMissingLabel(costsMissing, `${formatPerAction(costsPerAction)}/action`);
		costsDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_LOSS}; margin-top: 12px; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Costs: ") + costsLabel}</div>`;
		const drinkCostsContent = document.createElement("div");
		if (profitData.drinkCosts && profitData.drinkCosts.length > 0) for (const drink of profitData.drinkCosts) {
			const drinksPA = drink.drinksPerHour / actionsPerHour;
			const costPA = drink.costPerHour / actionsPerHour;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(drink.missingPrice);
			line.textContent = `• ${drink.name}: ${drinksPA.toFixed(2)}/action @ ${(0, src_utils_formatters_js.formatWithSeparator)(drink.priceEach)}${missingPriceNote} each → ${formatPerAction(costPA)}/action`;
			drinkCostsContent.appendChild(line);
		}
		const drinkCount = profitData.drinkCosts?.length || 0;
		const drinkCostsLabel = formatMissingLabel(drinkCostsMissing, `${formatPerAction(drinkCostPerAction)}/action`);
		const drinkCostsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Drink Costs: ${drinkCostsLabel} (${drinkCount} drink${drinkCount !== 1 ? "s" : ""})`, null, drinkCostsContent, false, 1);
		costsDiv.appendChild(drinkCostsSection);
		const marketTaxContent = document.createElement("div");
		const marketTaxLine = document.createElement("div");
		marketTaxLine.style.marginLeft = "8px";
		const marketTaxLabel = formatMissingLabel(marketTaxMissing, `${formatPerAction(marketTaxPerAction)}/action`);
		marketTaxLine.textContent = (0, src_core_i18n_js.t)("• Market Tax: 2% of revenue → {0}", marketTaxLabel);
		marketTaxContent.appendChild(marketTaxLine);
		const marketTaxSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", (0, src_core_i18n_js.t)("Market Tax: {0} (2%)", marketTaxLabel), null, marketTaxContent, false, 1);
		costsDiv.appendChild(marketTaxSection);
		detailsContent.appendChild(revenueDiv);
		detailsContent.appendChild(costsDiv);
		const topLevelContent = document.createElement("div");
		const profitColor = netMissing ? src_core_config_js.default.SCRIPT_COLOR_ALERT : profitPerAction >= 0 ? "#4ade80" : src_core_config_js.default.COLOR_LOSS;
		const netProfitLine = document.createElement("div");
		netProfitLine.style.cssText = `
        font-weight: 500;
        color: ${profitColor};
        margin-bottom: 8px;
    `;
		netProfitLine.textContent = netMissing ? (0, src_core_i18n_js.t)("Net Profit: -- ⚠") : (0, src_core_i18n_js.t)("Net Profit: {0}/action", formatPerAction(profitPerAction));
		topLevelContent.appendChild(netProfitLine);
		const summarySection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Revenue: ${formatMissingLabel(revenueMissing, `${formatPerAction(revenuePerAction)}/action`)} | Costs: ${formatMissingLabel(costsMissing, `${formatPerAction(costsPerAction)}/action`)}`, null, detailsContent, false, 1);
		topLevelContent.appendChild(summarySection);
		return (0, src_utils_ui_components_js.createCollapsibleSection)("🔢", (0, src_core_i18n_js.t)("Per action breakdown"), null, topLevelContent, false, 0);
	}
	/**
	* Build "Per action breakdown" section for production actions
	* @param {Object} profitData - Profit calculation data
	* @returns {HTMLElement} Breakdown section element
	*/
	function buildProductionPerActionBreakdown(profitData) {
		const actionsPerHour = profitData.actionsPerHour;
		const efficiencyMultiplier = profitData.efficiencyMultiplier || 1;
		const outputMissing = profitData.outputPriceMissing || false;
		const outputEstimated = profitData.outputPriceEstimated || false;
		const bonusMissing = profitData.bonusRevenue?.hasMissingPrices || false;
		const materialMissing = profitData.materialCosts?.some((material) => material.missingPrice) || false;
		const teaMissing = profitData.teaCosts?.some((tea) => tea.missingPrice) || false;
		const revenueMissing = outputMissing && !outputEstimated || bonusMissing;
		const revenueEstimated = outputEstimated && !revenueMissing;
		const costsMissing = materialMissing || teaMissing || revenueMissing;
		const costsEstimated = revenueEstimated && !costsMissing;
		const marketTaxMissing = revenueMissing;
		const marketTaxEstimated = revenueEstimated && !marketTaxMissing;
		const netMissing = profitData.hasMissingPrices;
		const netEstimated = (revenueEstimated || costsEstimated) && !netMissing;
		const bonusDrops = profitData.bonusRevenue?.bonusDrops || [];
		const bonusRevenueTotal = profitData.bonusRevenue?.totalBonusRevenue || 0;
		const baseItemsPerAction = profitData.outputAmount || 1;
		const baseRevenuePerAction = baseItemsPerAction * profitData.outputPrice;
		const gourmetItemsPerAction = baseItemsPerAction * (profitData.gourmetBonus || 0);
		const gourmetRevenuePerAction = gourmetItemsPerAction * profitData.outputPrice;
		const bonusRevenuePerAction = bonusRevenueTotal / actionsPerHour;
		const revenuePerAction = baseRevenuePerAction + gourmetRevenuePerAction + bonusRevenuePerAction;
		const marketTaxPerAction = revenuePerAction * src_utils_profit_constants_js.MARKET_TAX;
		const materialCostPerAction = profitData.totalMaterialCost;
		const teaCostPerAction = profitData.totalTeaCostPerHour / actionsPerHour;
		const costsPerAction = materialCostPerAction + teaCostPerAction + marketTaxPerAction;
		const profitPerAction = revenuePerAction - costsPerAction;
		const detailsContent = document.createElement("div");
		const revenueDiv = document.createElement("div");
		const revenueLabel = revenueMissing ? "-- ⚠" : revenueEstimated ? `${formatPerAction(revenuePerAction)}/action ⚠` : `${formatPerAction(revenuePerAction)}/action`;
		revenueDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_PROFIT}; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Revenue: ") + revenueLabel}</div>`;
		const primaryOutputContent = document.createElement("div");
		const baseOutputLine = document.createElement("div");
		baseOutputLine.style.marginLeft = "8px";
		const baseOutputMissingNote = getMissingPriceIndicator(profitData.outputPriceMissing || profitData.outputPriceEstimated);
		baseOutputLine.textContent = `• ${profitData.itemName} (Base): ${baseItemsPerAction.toFixed(2)}/action @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(profitData.outputPrice))}${baseOutputMissingNote} each → ${formatPerAction(baseRevenuePerAction)}/action`;
		primaryOutputContent.appendChild(baseOutputLine);
		if (profitData.gourmetBonus > 0) {
			const gourmetLine = document.createElement("div");
			gourmetLine.style.marginLeft = "8px";
			gourmetLine.textContent = `• ${profitData.itemName} (Gourmet +${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus, 1)}): ${gourmetItemsPerAction.toFixed(2)}/action @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(profitData.outputPrice))}${baseOutputMissingNote} each → ${formatPerAction(gourmetRevenuePerAction)}/action`;
			primaryOutputContent.appendChild(gourmetLine);
		}
		const primaryRevenuePerAction = baseRevenuePerAction + gourmetRevenuePerAction;
		const primaryOutputLabel = outputMissing && !outputEstimated ? "-- ⚠" : outputEstimated ? `${formatPerAction(primaryRevenuePerAction)}/action ⚠` : `${formatPerAction(primaryRevenuePerAction)}/action`;
		const gourmetLabel = profitData.gourmetBonus > 0 ? ` (${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus, 1)} gourmet)` : "";
		const primaryOutputSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Primary Outputs: ${primaryOutputLabel}${gourmetLabel}`, null, primaryOutputContent, false, 1);
		revenueDiv.appendChild(primaryOutputSection);
		const essenceDrops = bonusDrops.filter((drop) => drop.type === "essence");
		const rareFinds = bonusDrops.filter((drop) => drop.type === "rare_find");
		let essenceSection = null;
		if (essenceDrops.length > 0) {
			const essenceContent = document.createElement("div");
			for (const drop of essenceDrops) {
				const { dropsPerHour, revenuePerHour } = getBonusDropPerHourTotals(drop, efficiencyMultiplier);
				const dropsPA = dropsPerHour / actionsPerHour;
				const revenuePA = revenuePerHour / actionsPerHour;
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${dropsPA.toFixed(4)}/action (${dropRatePct}) → ${formatPerAction(revenuePA)}/action`;
				essenceContent.appendChild(line);
			}
			const essenceRevenueLabel = formatMissingLabel(bonusMissing, `${formatPerAction(essenceDrops.reduce((sum, drop) => sum + getBonusDropPerHourTotals(drop, efficiencyMultiplier).revenuePerHour / actionsPerHour, 0))}/action`);
			const essenceFindBonus = profitData.bonusRevenue?.essenceFindBonus || 0;
			essenceSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Essence Drops: ${essenceRevenueLabel} (${essenceDrops.length} item${essenceDrops.length !== 1 ? "s" : ""}, ${essenceFindBonus.toFixed(2)}% essence find)`, null, essenceContent, false, 1);
		}
		let rareFindSection = null;
		if (rareFinds.length > 0) {
			const rareFindContent = document.createElement("div");
			for (const drop of rareFinds) {
				const { dropsPerHour, revenuePerHour } = getBonusDropPerHourTotals(drop, efficiencyMultiplier);
				const dropsPA = dropsPerHour / actionsPerHour;
				const revenuePA = revenuePerHour / actionsPerHour;
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${dropsPA.toFixed(4)}/action (${dropRatePct}) → ${formatPerAction(revenuePA)}/action`;
				rareFindContent.appendChild(line);
			}
			const rareFindRevenueLabel = formatMissingLabel(bonusMissing, `${formatPerAction(rareFinds.reduce((sum, drop) => sum + getBonusDropPerHourTotals(drop, efficiencyMultiplier).revenuePerHour / actionsPerHour, 0))}/action`);
			const rareFindSummary = formatRareFindBonusSummary(profitData.bonusRevenue);
			rareFindSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Rare Finds: ${rareFindRevenueLabel} (${rareFinds.length} item${rareFinds.length !== 1 ? "s" : ""}, ${rareFindSummary})`, null, rareFindContent, false, 1);
		}
		if (essenceSection) revenueDiv.appendChild(essenceSection);
		if (rareFindSection) revenueDiv.appendChild(rareFindSection);
		const costsDiv = document.createElement("div");
		const costsLabel = costsMissing ? "-- ⚠" : costsEstimated ? `${formatPerAction(costsPerAction)}/action ⚠` : `${formatPerAction(costsPerAction)}/action`;
		costsDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_LOSS}; margin-top: 12px; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Costs: ") + costsLabel}</div>`;
		const materialCostsContent = document.createElement("div");
		if (profitData.materialCosts && profitData.materialCosts.length > 0) for (const material of profitData.materialCosts) {
			const amountPerAction = material.amount;
			const costPerAction = material.totalCost;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			let materialText = `• ${material.itemName}: ${amountPerAction.toFixed(2)}/action`;
			if (profitData.artisanBonus > 0 && material.baseAmount && material.amount !== material.baseAmount) {
				const baseAmountPerAction = material.baseAmount;
				materialText += ` (${baseAmountPerAction.toFixed(2)} base -${(0, src_utils_formatters_js.formatPercentage)(profitData.artisanBonus, 1)} 🍵)`;
			}
			const missingPriceNote = getMissingPriceIndicator(material.missingPrice);
			const customPriceNote = material.customPrice ? " *" : "";
			materialText += ` @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(material.askPrice))}${missingPriceNote}${customPriceNote} → ${formatPerAction(costPerAction)}/action`;
			line.textContent = materialText;
			materialCostsContent.appendChild(line);
		}
		const materialCostsLabel = formatMissingLabel(materialMissing, `${formatPerAction(materialCostPerAction)}/action`);
		const materialCostsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Material Costs: ${materialCostsLabel} (${profitData.materialCosts?.length || 0} material${profitData.materialCosts?.length !== 1 ? "s" : ""})`, null, materialCostsContent, false, 1);
		const teaCostsContent = document.createElement("div");
		if (profitData.teaCosts && profitData.teaCosts.length > 0) for (const tea of profitData.teaCosts) {
			const drinksPA = tea.drinksPerHour / actionsPerHour;
			const costPA = tea.totalCost / actionsPerHour;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(tea.missingPrice);
			line.textContent = `• ${tea.itemName}: ${drinksPA.toFixed(2)}/action @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(tea.pricePerDrink))}${missingPriceNote} each → ${formatPerAction(costPA)}/action`;
			teaCostsContent.appendChild(line);
		}
		const teaCount = profitData.teaCosts?.length || 0;
		const teaCostsLabel = formatMissingLabel(teaMissing, `${formatPerAction(teaCostPerAction)}/action`);
		const teaCostsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Drink Costs: ${teaCostsLabel} (${teaCount} drink${teaCount !== 1 ? "s" : ""})`, null, teaCostsContent, false, 1);
		costsDiv.appendChild(materialCostsSection);
		costsDiv.appendChild(teaCostsSection);
		const marketTaxContent = document.createElement("div");
		const marketTaxLine = document.createElement("div");
		marketTaxLine.style.marginLeft = "8px";
		const marketTaxLabel = marketTaxMissing ? "-- ⚠" : marketTaxEstimated ? `${formatPerAction(marketTaxPerAction)}/action ⚠` : `${formatPerAction(marketTaxPerAction)}/action`;
		marketTaxLine.textContent = (0, src_core_i18n_js.t)("• Market Tax: 2% of revenue → {0}", marketTaxLabel);
		marketTaxContent.appendChild(marketTaxLine);
		const marketTaxSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", (0, src_core_i18n_js.t)("Market Tax: {0} (2%)", marketTaxLabel), null, marketTaxContent, false, 1);
		costsDiv.appendChild(marketTaxSection);
		detailsContent.appendChild(revenueDiv);
		detailsContent.appendChild(costsDiv);
		const topLevelContent = document.createElement("div");
		const profitColor = netMissing ? src_core_config_js.default.SCRIPT_COLOR_ALERT : profitPerAction >= 0 ? "#4ade80" : src_core_config_js.default.COLOR_LOSS;
		const netProfitLine = document.createElement("div");
		netProfitLine.style.cssText = `
        font-weight: 500;
        color: ${profitColor};
        margin-bottom: 8px;
    `;
		netProfitLine.textContent = netMissing ? (0, src_core_i18n_js.t)("Net Profit: -- ⚠") : netEstimated ? (0, src_core_i18n_js.t)("Net Profit: {0}/action ⚠", formatPerAction(profitPerAction)) : (0, src_core_i18n_js.t)("Net Profit: {0}/action", formatPerAction(profitPerAction));
		topLevelContent.appendChild(netProfitLine);
		const revenueSummaryLabel = revenueMissing ? "-- ⚠" : revenueEstimated ? `${formatPerAction(revenuePerAction)}/action ⚠` : `${formatPerAction(revenuePerAction)}/action`;
		const costsSummaryLabel = costsMissing ? "-- ⚠" : costsEstimated ? `${formatPerAction(costsPerAction)}/action ⚠` : `${formatPerAction(costsPerAction)}/action`;
		const summarySection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Revenue: ${revenueSummaryLabel} | Costs: ${costsSummaryLabel}`, null, detailsContent, false, 1);
		topLevelContent.appendChild(summarySection);
		return (0, src_utils_ui_components_js.createCollapsibleSection)("🔢", (0, src_core_i18n_js.t)("Per action breakdown"), null, topLevelContent, false, 0);
	}
	/**
	* Build "X actions breakdown" section for gathering actions
	* @param {Object} profitData - Profit calculation data
	* @param {number} actionsCount - Number of actions from input field
	* @returns {HTMLElement} Breakdown section element
	*/
	function buildGatheringActionsBreakdown(profitData, actionsCount) {
		const totals = (0, src_utils_profit_helpers_js.calculateGatheringActionTotalsFromBase)({
			actionsCount,
			actionsPerHour: profitData.actionsPerHour,
			baseOutputs: profitData.baseOutputs,
			bonusDrops: profitData.bonusRevenue?.bonusDrops || [],
			processingRevenueBonusPerAction: profitData.processingRevenueBonusPerAction,
			gourmetRevenueBonusPerAction: profitData.gourmetRevenueBonusPerAction,
			drinkCostPerHour: profitData.drinkCostPerHour,
			efficiencyMultiplier: profitData.efficiencyMultiplier || 1
		});
		const hoursNeeded = totals.hoursNeeded;
		const baseMissing = profitData.baseOutputs?.some((output) => output.missingPrice) || false;
		const gourmetMissing = profitData.gourmetBonuses?.some((output) => output.missingPrice) || false;
		const bonusMissing = profitData.bonusRevenue?.hasMissingPrices || false;
		const processingMissing = profitData.processingConversions?.some((conversion) => conversion.missingPrice) || false;
		const primaryMissing = baseMissing || gourmetMissing || processingMissing;
		const revenueMissing = primaryMissing || bonusMissing;
		const drinkCostsMissing = profitData.drinkCosts?.some((drink) => drink.missingPrice) || false;
		const costsMissing = drinkCostsMissing || revenueMissing;
		const marketTaxMissing = revenueMissing;
		const netMissing = profitData.hasMissingPrices;
		const totalRevenue = Math.round(totals.totalRevenue);
		const totalMarketTax = Math.round(totals.totalMarketTax);
		const totalDrinkCosts = Math.round(totals.totalDrinkCost);
		const totalCosts = Math.round(totals.totalCosts);
		const totalProfit = Math.round(totals.totalProfit);
		const detailsContent = document.createElement("div");
		const revenueDiv = document.createElement("div");
		const revenueLabel = formatMissingLabel(revenueMissing, (0, src_utils_formatters_js.formatLargeNumber)(totalRevenue));
		revenueDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_PROFIT}; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Revenue: ") + revenueLabel}</div>`;
		const primaryDropsContent = document.createElement("div");
		if (profitData.baseOutputs && profitData.baseOutputs.length > 0) for (const output of profitData.baseOutputs) {
			const itemsPerAction = output.itemsPerAction ?? output.itemsPerHour / profitData.actionsPerHour;
			const revenuePerAction = output.revenuePerAction ?? output.revenuePerHour / profitData.actionsPerHour;
			const totalItems = itemsPerAction * actionsCount;
			const totalRevenueLine = revenuePerAction * actionsCount;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(output.missingPrice);
			line.textContent = `• ${output.name} (Base): ${totalItems.toFixed(2)} items @ ${(0, src_utils_formatters_js.formatWithSeparator)(output.priceEach)}${missingPriceNote} each → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalRevenueLine))}`;
			primaryDropsContent.appendChild(line);
		}
		if (profitData.gourmetBonuses && profitData.gourmetBonuses.length > 0) for (const output of profitData.gourmetBonuses) {
			const itemsPerAction = output.itemsPerAction ?? output.itemsPerHour / profitData.actionsPerHour;
			const revenuePerAction = output.revenuePerAction ?? output.revenuePerHour / profitData.actionsPerHour;
			const totalItems = itemsPerAction * actionsCount;
			const totalRevenueLine = revenuePerAction * actionsCount;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(output.missingPrice);
			line.textContent = `• ${output.name} (Gourmet ${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus || 0, 1)}): ${totalItems.toFixed(2)} items @ ${(0, src_utils_formatters_js.formatWithSeparator)(output.priceEach)}${missingPriceNote} each → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalRevenueLine))}`;
			primaryDropsContent.appendChild(line);
		}
		if (profitData.processingConversions && profitData.processingConversions.length > 0) {
			const totalProcessingRevenue = totals.totalProcessingRevenue;
			const processingLabel = formatMissingLabel(processingMissing, `${totalProcessingRevenue >= 0 ? "+" : "-"}${(0, src_utils_formatters_js.formatLargeNumber)(Math.abs(Math.round(totalProcessingRevenue)))}`);
			const processingContent = document.createElement("div");
			for (const conversion of profitData.processingConversions) {
				const conversionsPerAction = conversion.conversionsPerAction ?? conversion.conversionsPerHour / profitData.actionsPerHour;
				const totalConsumed = (conversion.rawConsumedPerAction ?? conversion.rawConsumedPerHour / profitData.actionsPerHour) * actionsCount;
				const totalProduced = conversionsPerAction * actionsCount;
				const consumedRevenue = totalConsumed * conversion.rawPriceEach;
				const producedRevenue = totalProduced * conversion.processedPriceEach;
				const missingPriceNote = getMissingPriceIndicator(conversion.missingPrice);
				const consumedLine = document.createElement("div");
				consumedLine.style.marginLeft = "8px";
				consumedLine.textContent = `• ${conversion.rawItem} consumed: -${totalConsumed.toFixed(2)} items @ ${(0, src_utils_formatters_js.formatWithSeparator)(conversion.rawPriceEach)}${missingPriceNote} → -${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(consumedRevenue))}`;
				processingContent.appendChild(consumedLine);
				const producedLine = document.createElement("div");
				producedLine.style.marginLeft = "8px";
				producedLine.textContent = `• ${conversion.processedItem} produced: ${totalProduced.toFixed(2)} items @ ${(0, src_utils_formatters_js.formatWithSeparator)(conversion.processedPriceEach)}${missingPriceNote} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(producedRevenue))}`;
				processingContent.appendChild(producedLine);
			}
			const processingSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `• Processing (${(0, src_utils_formatters_js.formatPercentage)(profitData.processingBonus || 0, 1)} proc): Net ${processingLabel}`, null, processingContent, false, 1);
			primaryDropsContent.appendChild(processingSection);
		}
		const baseRevenue = profitData.baseOutputs?.reduce((sum, output) => {
			return sum + (output.revenuePerAction ?? output.revenuePerHour / profitData.actionsPerHour) * actionsCount;
		}, 0) || 0;
		const gourmetRevenue = totals.totalGourmetRevenue;
		const processingRevenue = totals.totalProcessingRevenue;
		const primaryRevenue = baseRevenue + gourmetRevenue + processingRevenue;
		const primaryRevenueLabel = formatMissingLabel(primaryMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(primaryRevenue)));
		const outputItemCount = (profitData.baseOutputs?.length || 0) + (profitData.processingConversions && profitData.processingConversions.length > 0 ? 1 : 0);
		const primaryDropsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Primary Outputs: ${primaryRevenueLabel} (${outputItemCount} item${outputItemCount !== 1 ? "s" : ""})`, null, primaryDropsContent, false, 1);
		const bonusDrops = profitData.bonusRevenue?.bonusDrops || [];
		const essenceDrops = bonusDrops.filter((drop) => drop.type === "essence");
		const rareFinds = bonusDrops.filter((drop) => drop.type === "rare_find");
		let essenceSection = null;
		if (essenceDrops.length > 0) {
			const essenceContent = document.createElement("div");
			for (const drop of essenceDrops) {
				const { totalDrops, totalRevenue } = getBonusDropTotalsForActions(drop, actionsCount, profitData.actionsPerHour);
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${totalDrops.toFixed(2)} drops (${dropRatePct}) → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalRevenue))}`;
				essenceContent.appendChild(line);
			}
			const essenceRevenue = essenceDrops.reduce((sum, drop) => {
				return sum + getBonusDropTotalsForActions(drop, actionsCount, profitData.actionsPerHour).totalRevenue;
			}, 0);
			const essenceRevenueLabel = formatMissingLabel(bonusMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(essenceRevenue)));
			const essenceFindBonus = profitData.bonusRevenue?.essenceFindBonus || 0;
			essenceSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Essence Drops: ${essenceRevenueLabel} (${essenceDrops.length} item${essenceDrops.length !== 1 ? "s" : ""}, ${essenceFindBonus.toFixed(2)}% essence find)`, null, essenceContent, false, 1);
		}
		let rareFindSection = null;
		if (rareFinds.length > 0) {
			const rareFindContent = document.createElement("div");
			for (const drop of rareFinds) {
				const { totalDrops, totalRevenue } = getBonusDropTotalsForActions(drop, actionsCount, profitData.actionsPerHour);
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${totalDrops.toFixed(2)} drops (${dropRatePct}) → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalRevenue))}`;
				rareFindContent.appendChild(line);
			}
			const rareFindRevenue = rareFinds.reduce((sum, drop) => {
				return sum + getBonusDropTotalsForActions(drop, actionsCount, profitData.actionsPerHour).totalRevenue;
			}, 0);
			const rareFindRevenueLabel = formatMissingLabel(bonusMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(rareFindRevenue)));
			const rareFindSummary = formatRareFindBonusSummary(profitData.bonusRevenue);
			rareFindSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Rare Finds: ${rareFindRevenueLabel} (${rareFinds.length} item${rareFinds.length !== 1 ? "s" : ""}, ${rareFindSummary})`, null, rareFindContent, false, 1);
		}
		revenueDiv.appendChild(primaryDropsSection);
		if (essenceSection) revenueDiv.appendChild(essenceSection);
		if (rareFindSection) revenueDiv.appendChild(rareFindSection);
		const costsDiv = document.createElement("div");
		const costsLabel = costsMissing ? "-- ⚠" : (0, src_utils_formatters_js.formatLargeNumber)(totalCosts);
		costsDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_LOSS}; margin-top: 12px; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Costs: ") + costsLabel}</div>`;
		const drinkCostsContent = document.createElement("div");
		if (profitData.drinkCosts && profitData.drinkCosts.length > 0) for (const drink of profitData.drinkCosts) {
			const totalDrinks = drink.drinksPerHour * hoursNeeded;
			const totalCostLine = drink.costPerHour * hoursNeeded;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(drink.missingPrice);
			line.textContent = `• ${drink.name}: ${totalDrinks.toFixed(2)} drinks @ ${(0, src_utils_formatters_js.formatWithSeparator)(drink.priceEach)}${missingPriceNote} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalCostLine))}`;
			drinkCostsContent.appendChild(line);
		}
		const drinkCount = profitData.drinkCosts?.length || 0;
		const drinkCostsLabel = drinkCostsMissing ? "-- ⚠" : (0, src_utils_formatters_js.formatLargeNumber)(totalDrinkCosts);
		const drinkCostsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Drink Costs: ${drinkCostsLabel} (${drinkCount} drink${drinkCount !== 1 ? "s" : ""})`, null, drinkCostsContent, false, 1);
		costsDiv.appendChild(drinkCostsSection);
		const marketTaxContent = document.createElement("div");
		const marketTaxLine = document.createElement("div");
		marketTaxLine.style.marginLeft = "8px";
		const marketTaxLabel = marketTaxMissing ? "-- ⚠" : (0, src_utils_formatters_js.formatLargeNumber)(totalMarketTax);
		marketTaxLine.textContent = (0, src_core_i18n_js.t)("• Market Tax: 2% of revenue → {0}", marketTaxLabel);
		marketTaxContent.appendChild(marketTaxLine);
		const marketTaxHeader = marketTaxMissing ? "-- ⚠" : (0, src_utils_formatters_js.formatLargeNumber)(totalMarketTax);
		const marketTaxSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", (0, src_core_i18n_js.t)("Market Tax: {0} (2%)", marketTaxHeader), null, marketTaxContent, false, 1);
		costsDiv.appendChild(marketTaxSection);
		detailsContent.appendChild(revenueDiv);
		detailsContent.appendChild(costsDiv);
		const topLevelContent = document.createElement("div");
		const profitColor = netMissing ? src_core_config_js.default.SCRIPT_COLOR_ALERT : totalProfit >= 0 ? "#4ade80" : src_core_config_js.default.COLOR_LOSS;
		const netProfitLine = document.createElement("div");
		netProfitLine.style.cssText = `
        font-weight: 500;
        color: ${profitColor};
        margin-bottom: 8px;
    `;
		netProfitLine.textContent = netMissing ? (0, src_core_i18n_js.t)("Net Profit: -- ⚠") : (0, src_core_i18n_js.t)("Net Profit: {0}", (0, src_utils_formatters_js.formatLargeNumber)(totalProfit));
		topLevelContent.appendChild(netProfitLine);
		const actionsSummary = `Revenue: ${formatMissingLabel(revenueMissing, (0, src_utils_formatters_js.formatLargeNumber)(totalRevenue))} | Costs: ${formatMissingLabel(costsMissing, (0, src_utils_formatters_js.formatLargeNumber)(totalCosts))}`;
		const actionsBreakdownSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", actionsSummary, null, detailsContent, false, 1);
		topLevelContent.appendChild(actionsBreakdownSection);
		const mainSection = (0, src_utils_ui_components_js.createCollapsibleSection)("📋", `${(0, src_utils_formatters_js.formatWithSeparator)(actionsCount)} actions breakdown`, null, topLevelContent, false, 0);
		mainSection.className = "mwi-collapsible-section mwi-actions-breakdown";
		return mainSection;
	}
	/**
	* Build "X actions breakdown" section for production actions
	* @param {Object} profitData - Profit calculation data
	* @param {number} actionsCount - Number of actions from input field
	* @returns {HTMLElement} Breakdown section element
	*/
	function buildProductionActionsBreakdown(profitData, actionsCount) {
		const efficiencyMultiplier = profitData.efficiencyMultiplier || 1;
		const outputMissing = profitData.outputPriceMissing || false;
		const outputEstimated = profitData.outputPriceEstimated || false;
		const bonusMissing = profitData.bonusRevenue?.hasMissingPrices || false;
		const materialMissing = profitData.materialCosts?.some((material) => material.missingPrice) || false;
		const teaMissing = profitData.teaCosts?.some((tea) => tea.missingPrice) || false;
		const revenueMissing = outputMissing && !outputEstimated || bonusMissing;
		const revenueEstimated = outputEstimated && !revenueMissing;
		const costsMissing = materialMissing || teaMissing || revenueMissing;
		const costsEstimated = revenueEstimated && !costsMissing;
		const marketTaxMissing = revenueMissing;
		const marketTaxEstimated = revenueEstimated && !marketTaxMissing;
		const netMissing = profitData.hasMissingPrices;
		const netEstimated = (revenueEstimated || costsEstimated) && !netMissing;
		const bonusDrops = profitData.bonusRevenue?.bonusDrops || [];
		const totals = (0, src_utils_profit_helpers_js.calculateProductionActionTotalsFromBase)({
			actionsCount,
			actionsPerHour: profitData.actionsPerHour,
			outputAmount: profitData.outputAmount || 1,
			outputPrice: profitData.outputPrice,
			gourmetBonus: profitData.gourmetBonus || 0,
			bonusDrops,
			materialCosts: profitData.materialCosts,
			totalTeaCostPerHour: profitData.totalTeaCostPerHour,
			efficiencyMultiplier
		});
		const totalRevenue = Math.round(totals.totalRevenue);
		const totalMarketTax = Math.round(totals.totalMarketTax);
		const totalCosts = Math.round(totals.totalCosts);
		const totalProfit = Math.round(totals.totalProfit);
		const detailsContent = document.createElement("div");
		const revenueDiv = document.createElement("div");
		const revenueLabel = revenueMissing ? "-- ⚠" : revenueEstimated ? `${(0, src_utils_formatters_js.formatLargeNumber)(totalRevenue)} ⚠` : (0, src_utils_formatters_js.formatLargeNumber)(totalRevenue);
		revenueDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_PROFIT}; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Revenue: ") + revenueLabel}</div>`;
		const primaryOutputContent = document.createElement("div");
		const totalBaseItems = totals.totalBaseItems;
		const totalBaseRevenue = totals.totalBaseRevenue;
		const baseOutputLine = document.createElement("div");
		baseOutputLine.style.marginLeft = "8px";
		const baseOutputMissingNote = getMissingPriceIndicator(profitData.outputPriceMissing || profitData.outputPriceEstimated);
		baseOutputLine.textContent = `• ${profitData.itemName} (Base): ${totalBaseItems.toFixed(2)} items @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(profitData.outputPrice))}${baseOutputMissingNote} each → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalBaseRevenue))}`;
		primaryOutputContent.appendChild(baseOutputLine);
		if (profitData.gourmetBonus > 0) {
			const totalGourmetItems = totals.totalGourmetItems;
			const totalGourmetRevenue = totals.totalGourmetRevenue;
			const gourmetLine = document.createElement("div");
			gourmetLine.style.marginLeft = "8px";
			gourmetLine.textContent = `• ${profitData.itemName} (Gourmet +${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus, 1)}): ${totalGourmetItems.toFixed(2)} items @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(profitData.outputPrice))}${baseOutputMissingNote} each → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalGourmetRevenue))}`;
			primaryOutputContent.appendChild(gourmetLine);
		}
		const primaryRevenue = totals.totalBaseRevenue + totals.totalGourmetRevenue;
		const primaryOutputLabel = outputMissing && !outputEstimated ? "-- ⚠" : outputEstimated ? `${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(primaryRevenue))} ⚠` : (0, src_utils_formatters_js.formatLargeNumber)(Math.round(primaryRevenue));
		const gourmetLabel = profitData.gourmetBonus > 0 ? ` (${(0, src_utils_formatters_js.formatPercentage)(profitData.gourmetBonus, 1)} gourmet)` : "";
		const primaryOutputSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Primary Outputs: ${primaryOutputLabel}${gourmetLabel}`, null, primaryOutputContent, false, 1);
		revenueDiv.appendChild(primaryOutputSection);
		const essenceDrops = bonusDrops.filter((drop) => drop.type === "essence");
		const rareFinds = bonusDrops.filter((drop) => drop.type === "rare_find");
		let essenceSection = null;
		if (essenceDrops.length > 0) {
			const essenceContent = document.createElement("div");
			for (const drop of essenceDrops) {
				const dropsPerAction = drop.dropsPerAction ?? (0, src_utils_profit_helpers_js.calculateProfitPerAction)(drop.dropsPerHour, profitData.actionsPerHour);
				const revenuePerAction = drop.revenuePerAction ?? (0, src_utils_profit_helpers_js.calculateProfitPerAction)(drop.revenuePerHour, profitData.actionsPerHour);
				const totalDrops = dropsPerAction * actionsCount;
				const totalRevenueLine = revenuePerAction * actionsCount;
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${totalDrops.toFixed(2)} drops (${dropRatePct}) → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalRevenueLine))}`;
				essenceContent.appendChild(line);
			}
			const essenceRevenue = essenceDrops.reduce((sum, drop) => {
				return sum + (drop.revenuePerAction ?? (0, src_utils_profit_helpers_js.calculateProfitPerAction)(drop.revenuePerHour, profitData.actionsPerHour)) * actionsCount;
			}, 0);
			const essenceRevenueLabel = formatMissingLabel(bonusMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(essenceRevenue)));
			const essenceFindBonus = profitData.bonusRevenue?.essenceFindBonus || 0;
			essenceSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Essence Drops: ${essenceRevenueLabel} (${essenceDrops.length} item${essenceDrops.length !== 1 ? "s" : ""}, ${essenceFindBonus.toFixed(2)}% essence find)`, null, essenceContent, false, 1);
		}
		let rareFindSection = null;
		if (rareFinds.length > 0) {
			const rareFindContent = document.createElement("div");
			for (const drop of rareFinds) {
				const dropsPerAction = drop.dropsPerAction ?? (0, src_utils_profit_helpers_js.calculateProfitPerAction)(drop.dropsPerHour, profitData.actionsPerHour);
				const revenuePerAction = drop.revenuePerAction ?? (0, src_utils_profit_helpers_js.calculateProfitPerAction)(drop.revenuePerHour, profitData.actionsPerHour);
				const totalDrops = dropsPerAction * actionsCount;
				const totalRevenueLine = revenuePerAction * actionsCount;
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
				line.textContent = `• ${drop.itemName}: ${totalDrops.toFixed(2)} drops (${dropRatePct}) → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalRevenueLine))}`;
				rareFindContent.appendChild(line);
			}
			const rareFindRevenue = rareFinds.reduce((sum, drop) => {
				return sum + (drop.revenuePerAction ?? (0, src_utils_profit_helpers_js.calculateProfitPerAction)(drop.revenuePerHour, profitData.actionsPerHour)) * actionsCount;
			}, 0);
			const rareFindRevenueLabel = formatMissingLabel(bonusMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(rareFindRevenue)));
			const rareFindSummary = formatRareFindBonusSummary(profitData.bonusRevenue);
			rareFindSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Rare Finds: ${rareFindRevenueLabel} (${rareFinds.length} item${rareFinds.length !== 1 ? "s" : ""}, ${rareFindSummary})`, null, rareFindContent, false, 1);
		}
		if (essenceSection) revenueDiv.appendChild(essenceSection);
		if (rareFindSection) revenueDiv.appendChild(rareFindSection);
		const costsDiv = document.createElement("div");
		const costsLabel = costsMissing ? "-- ⚠" : costsEstimated ? `${(0, src_utils_formatters_js.formatLargeNumber)(totalCosts)} ⚠` : (0, src_utils_formatters_js.formatLargeNumber)(totalCosts);
		costsDiv.innerHTML = `<div style="font-weight: 500; color: ${src_core_config_js.default.COLOR_TOOLTIP_LOSS}; margin-top: 12px; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("Costs: ") + costsLabel}</div>`;
		const materialCostsContent = document.createElement("div");
		if (profitData.materialCosts && profitData.materialCosts.length > 0) for (const material of profitData.materialCosts) {
			const totalMaterial = material.amount * actionsCount;
			const totalMaterialCost = material.totalCost * actionsCount;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			let materialText = `• ${material.itemName}: ${totalMaterial.toFixed(2)} items`;
			if (profitData.artisanBonus > 0 && material.baseAmount && material.amount !== material.baseAmount) {
				const baseTotalAmount = material.baseAmount * actionsCount;
				materialText += ` (${baseTotalAmount.toFixed(2)} base -${(0, src_utils_formatters_js.formatPercentage)(profitData.artisanBonus, 1)} 🍵)`;
			}
			const missingPriceNote = getMissingPriceIndicator(material.missingPrice);
			const customPriceNote = material.customPrice ? " *" : "";
			materialText += ` @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(material.askPrice))}${missingPriceNote}${customPriceNote} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalMaterialCost))}`;
			line.textContent = materialText;
			materialCostsContent.appendChild(line);
		}
		const totalMaterialCost = totals.totalMaterialCost;
		const materialCostsLabel = formatMissingLabel(materialMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalMaterialCost)));
		const materialCostsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Material Costs: ${materialCostsLabel} (${profitData.materialCosts?.length || 0} material${profitData.materialCosts?.length !== 1 ? "s" : ""})`, null, materialCostsContent, false, 1);
		const teaCostsContent = document.createElement("div");
		if (profitData.teaCosts && profitData.teaCosts.length > 0) for (const tea of profitData.teaCosts) {
			const totalDrinks = tea.drinksPerHour * totals.hoursNeeded;
			const totalTeaCost = tea.totalCost * totals.hoursNeeded;
			const line = document.createElement("div");
			line.style.marginLeft = "8px";
			const missingPriceNote = getMissingPriceIndicator(tea.missingPrice);
			line.textContent = `• ${tea.itemName}: ${totalDrinks.toFixed(2)} drinks @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(tea.pricePerDrink))}${missingPriceNote} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalTeaCost))}`;
			teaCostsContent.appendChild(line);
		}
		const totalTeaCost = totals.totalTeaCost;
		const teaCount = profitData.teaCosts?.length || 0;
		const teaCostsLabel = formatMissingLabel(teaMissing, (0, src_utils_formatters_js.formatLargeNumber)(Math.round(totalTeaCost)));
		const teaCostsSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", `Drink Costs: ${teaCostsLabel} (${teaCount} drink${teaCount !== 1 ? "s" : ""})`, null, teaCostsContent, false, 1);
		costsDiv.appendChild(materialCostsSection);
		costsDiv.appendChild(teaCostsSection);
		const marketTaxContent = document.createElement("div");
		const marketTaxLine = document.createElement("div");
		marketTaxLine.style.marginLeft = "8px";
		const marketTaxLabel = marketTaxMissing ? "-- ⚠" : marketTaxEstimated ? `${(0, src_utils_formatters_js.formatLargeNumber)(totalMarketTax)} ⚠` : (0, src_utils_formatters_js.formatLargeNumber)(totalMarketTax);
		marketTaxLine.textContent = (0, src_core_i18n_js.t)("• Market Tax: 2% of revenue → {0}", marketTaxLabel);
		marketTaxContent.appendChild(marketTaxLine);
		const marketTaxSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", (0, src_core_i18n_js.t)("Market Tax: {0} (2%)", marketTaxLabel), null, marketTaxContent, false, 1);
		costsDiv.appendChild(marketTaxSection);
		detailsContent.appendChild(revenueDiv);
		detailsContent.appendChild(costsDiv);
		const topLevelContent = document.createElement("div");
		const profitColor = netMissing ? src_core_config_js.default.SCRIPT_COLOR_ALERT : totalProfit >= 0 ? "#4ade80" : src_core_config_js.default.COLOR_LOSS;
		const netProfitLine = document.createElement("div");
		netProfitLine.style.cssText = `
        font-weight: 500;
        color: ${profitColor};
        margin-bottom: 8px;
    `;
		netProfitLine.textContent = netMissing ? (0, src_core_i18n_js.t)("Net Profit: -- ⚠") : netEstimated ? (0, src_core_i18n_js.t)("Net Profit: {0} ⚠", (0, src_utils_formatters_js.formatLargeNumber)(totalProfit)) : (0, src_core_i18n_js.t)("Net Profit: {0}", (0, src_utils_formatters_js.formatLargeNumber)(totalProfit));
		topLevelContent.appendChild(netProfitLine);
		const actionsSummary = `Revenue: ${revenueMissing ? "-- ⚠" : revenueEstimated ? `${(0, src_utils_formatters_js.formatLargeNumber)(totalRevenue)} ⚠` : (0, src_utils_formatters_js.formatLargeNumber)(totalRevenue)} | Costs: ${costsMissing ? "-- ⚠" : costsEstimated ? `${(0, src_utils_formatters_js.formatLargeNumber)(totalCosts)} ⚠` : (0, src_utils_formatters_js.formatLargeNumber)(totalCosts)}`;
		const actionsBreakdownSection = (0, src_utils_ui_components_js.createCollapsibleSection)("", actionsSummary, null, detailsContent, false, 1);
		topLevelContent.appendChild(actionsBreakdownSection);
		const mainSection = (0, src_utils_ui_components_js.createCollapsibleSection)("📋", `${(0, src_utils_formatters_js.formatWithSeparator)(actionsCount)} actions breakdown`, null, topLevelContent, false, 0);
		mainSection.className = "mwi-collapsible-section mwi-actions-breakdown";
		return mainSection;
	}
	//#endregion
	//#region src/features/actions/action-panel-sort.js
	/**
	* Action Panel Sort Manager
	*
	* Centralized sorting logic for action panels.
	* Handles both profit-based sorting and pin priority.
	* Used by max-produceable and gathering-stats features.
	*/
	var ActionPanelSort = class {
		constructor() {
			this.panels = /* @__PURE__ */ new Map();
			this.pinnedActions = /* @__PURE__ */ new Set();
			this.cachedStats = {};
			this.sortMode = "default";
			this.sortTimeout = null;
			this.initialized = false;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.handlers = {};
			this.pinChangeListeners = [];
			this.sortModeListeners = [];
		}
		/**
		* Get character-scoped storage key for sort mode.
		* @returns {string}
		*/
		_getSortStorageKey() {
			return `actionSortMode_${src_core_data_manager_js.default.getCurrentCharacterId() || "default"}`;
		}
		/**
		* Get character-scoped storage key for pinned actions.
		* @returns {string}
		*/
		_getPinnedStorageKey() {
			return `pinnedActions_${src_core_data_manager_js.default.getCurrentCharacterId() || "default"}`;
		}
		/**
		* Initialize - load pinned actions from storage
		*/
		async initialize() {
			if (this.initialized) return;
			const pinnedData = await src_core_storage_js.default.getJSON(this._getPinnedStorageKey(), "settings", []);
			this.pinnedActions = new Set(pinnedData);
			this.sortMode = await src_core_storage_js.default.get(this._getSortStorageKey(), "settings", "default");
			this.initialized = true;
			this._notifySortModeListeners();
			if (!this.handlers.characterSwitch) {
				this.handlers.characterSwitch = () => this.onCharacterSwitching();
				src_core_data_manager_js.default.on("character_switching", this.handlers.characterSwitch);
			}
			if (!this.handlers.characterInit) {
				this.handlers.characterInit = (data) => {
					if (data?._isCharacterSwitch) this.onCharacterInitialized();
				};
				src_core_data_manager_js.default.on("character_initialized", this.handlers.characterInit);
			}
		}
		/**
		* Handle character switching - clear cached data only (character ID is still old)
		*/
		onCharacterSwitching() {
			this.clearAllPanels();
			this.pinnedActions.clear();
			this.cachedStats = {};
			this.initialized = false;
		}
		/**
		* Handle character initialized - reload pins for the new character
		*/
		async onCharacterInitialized() {
			const pinnedData = await src_core_storage_js.default.getJSON(this._getPinnedStorageKey(), "settings", []);
			this.pinnedActions = new Set(pinnedData);
			this.sortMode = await src_core_storage_js.default.get(this._getSortStorageKey(), "settings", "default");
			this.initialized = true;
			this._notifySortModeListeners();
		}
		/**
		* Disable - cleanup event listeners
		*/
		disable() {
			this.clearAllPanels();
			if (this.handlers.characterSwitch) {
				src_core_data_manager_js.default.off("character_switching", this.handlers.characterSwitch);
				this.handlers.characterSwitch = null;
			}
			if (this.handlers.characterInit) {
				src_core_data_manager_js.default.off("character_initialized", this.handlers.characterInit);
				this.handlers.characterInit = null;
			}
			this.initialized = false;
		}
		/**
		* Register a panel for sorting
		* @param {HTMLElement} actionPanel - The action panel element
		* @param {string} actionHrid - The action HRID
		* @param {number|null} profitPerHour - Profit per hour (null if not calculated yet)
		*/
		registerPanel(actionPanel, actionHrid, profitPerHour = null) {
			this.panels.set(actionPanel, {
				actionHrid,
				profitPerHour,
				expPerHour: null
			});
		}
		/**
		* Update profit for a registered panel
		* @param {HTMLElement} actionPanel - The action panel element
		* @param {number|null} profitPerHour - Profit per hour
		*/
		updateProfit(actionPanel, profitPerHour) {
			const data = this.panels.get(actionPanel);
			if (data) {
				data.profitPerHour = profitPerHour;
				if (!this.cachedStats[data.actionHrid]) this.cachedStats[data.actionHrid] = {};
				this.cachedStats[data.actionHrid].profitPerHour = profitPerHour;
			}
		}
		/**
		* Update exp/hr for a registered panel
		* @param {HTMLElement} actionPanel - The action panel element
		* @param {number|null} expPerHour - Experience per hour
		*/
		updateExpPerHour(actionPanel, expPerHour) {
			const data = this.panels.get(actionPanel);
			if (data) {
				data.expPerHour = expPerHour;
				if (!this.cachedStats[data.actionHrid]) this.cachedStats[data.actionHrid] = {};
				this.cachedStats[data.actionHrid].expPerHour = expPerHour;
			}
		}
		/**
		* Set the active sort mode
		* @param {'default'|'profit'|'xp'|'coinsPerXp'} mode
		*/
		setSortMode(mode) {
			this.sortMode = mode;
			src_core_storage_js.default.set(this._getSortStorageKey(), mode, "settings");
			this._notifySortModeListeners();
		}
		/**
		* Get the active sort mode
		* @returns {'default'|'profit'|'xp'|'coinsPerXp'}
		*/
		getSortMode() {
			return this.sortMode;
		}
		onSortModeChange(callback) {
			this.sortModeListeners.push(callback);
		}
		_notifySortModeListeners() {
			for (const cb of this.sortModeListeners) cb(this.sortMode);
		}
		/**
		* Unregister a panel (cleanup when panel removed from DOM)
		* @param {HTMLElement} actionPanel - The action panel element
		*/
		unregisterPanel(actionPanel) {
			this.panels.delete(actionPanel);
		}
		/**
		* Toggle pin state for an action
		* @param {string} actionHrid - Action HRID to toggle
		* @returns {boolean} New pin state
		*/
		async togglePin(actionHrid) {
			if (this.pinnedActions.has(actionHrid)) this.pinnedActions.delete(actionHrid);
			else this.pinnedActions.add(actionHrid);
			await src_core_storage_js.default.setJSON(this._getPinnedStorageKey(), Array.from(this.pinnedActions), "settings", true);
			for (const cb of this.pinChangeListeners) try {
				cb();
			} catch {}
			return this.pinnedActions.has(actionHrid);
		}
		/**
		* Check if action is pinned
		* @param {string} actionHrid - Action HRID
		* @returns {boolean}
		*/
		isPinned(actionHrid) {
			return this.pinnedActions.has(actionHrid);
		}
		onPinChange(cb) {
			this.pinChangeListeners.push(cb);
		}
		offPinChange(cb) {
			const idx = this.pinChangeListeners.indexOf(cb);
			if (idx > -1) this.pinChangeListeners.splice(idx, 1);
		}
		/**
		* Get all pinned actions
		* @returns {Set<string>}
		*/
		getPinnedActions() {
			return this.pinnedActions;
		}
		/**
		* Get cached profit/xp stats for an action
		* @param {string} actionHrid - Action HRID
		* @returns {Object|null} { profitPerHour, expPerHour } or null
		*/
		getCachedStats(actionHrid) {
			return this.cachedStats[actionHrid] || null;
		}
		/**
		* Clear all panel references (called during character switch to prevent memory leaks)
		*/
		clearAllPanels() {
			if (this.sortTimeout) {
				clearTimeout(this.sortTimeout);
				this.sortTimeout = null;
			}
			this.timerRegistry.clearAll();
			this.panels.clear();
		}
		/**
		* Trigger a debounced sort
		*/
		triggerSort() {
			this.scheduleSortIfEnabled();
		}
		/**
		* Schedule a sort to run after a short delay (debounced)
		*/
		scheduleSortIfEnabled() {
			const hasPinnedActions = this.pinnedActions.size > 0;
			if (this.sortMode === "default" && !hasPinnedActions) return;
			if (this.sortTimeout) clearTimeout(this.sortTimeout);
			this.sortTimeout = setTimeout(() => {
				this.sortPanelsByProfit();
				this.sortTimeout = null;
			}, 300);
			this.timerRegistry.registerTimeout(this.sortTimeout);
		}
		/**
		* Sort action panels by the active sort mode, with pinned actions at top
		*/
		sortPanelsByProfit() {
			const sortMode = this.sortMode;
			const containerMap = /* @__PURE__ */ new Map();
			for (const [actionPanel, data] of this.panels.entries()) {
				const container = actionPanel.parentElement;
				if (!container) {
					this.panels.delete(actionPanel);
					continue;
				}
				if (!containerMap.has(container)) containerMap.set(container, []);
				const isPinned = this.pinnedActions.has(data.actionHrid);
				containerMap.get(container).push({
					panel: actionPanel,
					profit: data.profitPerHour ?? null,
					exp: data.expPerHour ?? null,
					pinned: isPinned,
					originalIndex: containerMap.get(container).length,
					actionHrid: data.actionHrid
				});
			}
			const openTooltip = document.querySelector(".MuiTooltip-popper");
			if (openTooltip) {
				const trigger = document.querySelector(`[aria-describedby="${openTooltip.id}"]`);
				if (!trigger || !trigger.matches(":hover")) (0, src_utils_dom_js.dismissTooltips)();
			}
			for (const [container, panels] of containerMap.entries()) {
				panels.sort((a, b) => {
					if (a.pinned && !b.pinned) return -1;
					if (!a.pinned && b.pinned) return 1;
					return this._compareByMode(a, b, sortMode);
				});
				const fragment = document.createDocumentFragment();
				panels.forEach(({ panel }) => {
					fragment.appendChild(panel);
				});
				container.appendChild(fragment);
			}
		}
		/**
		* Compare two panel entries by the active sort mode
		* @private
		*/
		_compareByMode(a, b, sortMode) {
			if (sortMode === "profit") {
				if (a.profit === null && b.profit === null) return 0;
				if (a.profit === null) return 1;
				if (b.profit === null) return -1;
				return b.profit - a.profit;
			}
			if (sortMode === "xp") {
				if (a.exp === null && b.exp === null) return 0;
				if (a.exp === null) return 1;
				if (b.exp === null) return -1;
				return b.exp - a.exp;
			}
			if (sortMode === "coinsPerXp") {
				const aRatio = a.profit !== null && a.exp ? a.profit / a.exp : null;
				const bRatio = b.profit !== null && b.exp ? b.profit / b.exp : null;
				if (aRatio === null && bRatio === null) return 0;
				if (aRatio === null) return 1;
				if (bRatio === null) return -1;
				return bRatio - aRatio;
			}
			const aLevel = src_core_data_manager_js.default.getActionDetails(a.actionHrid)?.levelRequirement?.level ?? null;
			const bLevel = src_core_data_manager_js.default.getActionDetails(b.actionHrid)?.levelRequirement?.level ?? null;
			if (aLevel === null && bLevel === null) return a.originalIndex - b.originalIndex;
			if (aLevel === null) return 1;
			if (bLevel === null) return -1;
			if (aLevel !== bLevel) return aLevel - bLevel;
			return a.originalIndex - b.originalIndex;
		}
	};
	var actionPanelSort = new ActionPanelSort();
	//#endregion
	//#region src/features/actions/action-filter.js
	/**
	* Action Filter Manager
	*
	* Adds a search/filter input box to action panel pages (gathering/production).
	* Filters action panels in real-time based on action name.
	* Works alongside existing sorting and hide negative profit features.
	*/
	var ActionFilter = class {
		constructor() {
			this.panels = /* @__PURE__ */ new Map();
			this.filterValue = "";
			this.filterInput = null;
			this.sortButton = null;
			this.modeButton = null;
			this.noResultsMessage = null;
			this.initialized = false;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.filterTimeout = null;
			this.unregisterHandlers = [];
			this.currentTitleElement = null;
			this._updateModeBtn = null;
			this._updateCraftBtn = null;
			this._updateSortBtn = null;
		}
		/**
		* Initialize - set up DOM observers
		*/
		async initialize() {
			if (this.initialized) return;
			const unregisterTitleObserver = src_core_dom_observer_js.default.onClass("ActionFilter-Title", "GatheringProductionSkillPanel_title__3VihQ", (titleElement) => {
				this.injectFilterInput(titleElement);
			}, {
				debounce: true,
				debounceDelay: 150
			});
			this.unregisterHandlers.push(unregisterTitleObserver);
			src_core_config_js.default.onSettingChange("profitCalc_pricingMode", () => {
				if (this._updateModeBtn) this._updateModeBtn();
			});
			src_core_config_js.default.onSettingChange("profitCalc_craftUpgradeItems", () => {
				if (this._updateCraftBtn) this._updateCraftBtn();
			});
			actionPanelSort.onSortModeChange(() => {
				if (this._updateSortBtn) this._updateSortBtn();
			});
			this.initialized = true;
		}
		/**
		* Inject filter input into the title bar
		* @param {HTMLElement} titleElement - The h1 title element
		*/
		injectFilterInput(titleElement) {
			if (this.currentTitleElement && this.currentTitleElement !== titleElement) this.clearFilter();
			if (titleElement.querySelector("#mwi-action-filter")) return;
			this.currentTitleElement = titleElement;
			this.filterValue = "";
			this.filterInput = null;
			this.sortButton = null;
			this.modeButton = null;
			this.noResultsMessage = null;
			if (src_core_config_js.default.getSetting("actionPanel_showFilter") || src_core_config_js.default.getSetting("actionPanel_showSort") || src_core_config_js.default.getSetting("actionPanel_showPricingMode") || src_core_config_js.default.getSetting("actionPanel_showCraftToggle")) {
				titleElement.style.setProperty("display", "flex", "important");
				titleElement.style.alignItems = "center";
				titleElement.style.gap = "15px";
				titleElement.style.flexWrap = "wrap";
			}
			const input = document.createElement("input");
			input.id = "mwi-action-filter";
			input.type = "text";
			input.placeholder = (0, src_core_i18n_js.t)("Filter actions...");
			input.className = "MuiInputBase-input";
			input.style.padding = "8px 12px";
			input.style.fontSize = "14px";
			input.style.border = "1px solid rgba(255, 255, 255, 0.23)";
			input.style.borderRadius = "4px";
			input.style.backgroundColor = "transparent";
			input.style.color = "inherit";
			input.style.width = "200px";
			input.style.fontFamily = "inherit";
			input.style.flexShrink = "0";
			input.addEventListener("focus", () => {
				input.style.borderColor = src_core_config_js.default.COLOR_ACCENT;
				input.style.outline = "none";
			});
			input.addEventListener("blur", () => {
				input.style.borderColor = "rgba(255, 255, 255, 0.23)";
			});
			input.addEventListener("input", (e) => {
				this.handleFilterInput(e.target.value);
			});
			titleElement.insertBefore(input, titleElement.firstChild);
			this.filterInput = input;
			if (!src_core_config_js.default.getSetting("actionPanel_showFilter")) input.style.display = "none";
			const SORT_MODES = [
				"default",
				"profit",
				"xp",
				"coinsPerXp"
			];
			const SORT_LABELS = {
				default: (0, src_core_i18n_js.t)("Sort: Default"),
				profit: (0, src_core_i18n_js.t)("Sort: Profit"),
				xp: (0, src_core_i18n_js.t)("Sort: XP"),
				coinsPerXp: (0, src_core_i18n_js.t)("Sort: Profit/XP")
			};
			const sortBtn = document.createElement("button");
			sortBtn.id = "mwi-action-sort-toggle";
			const updateSortBtn = () => {
				const mode = actionPanelSort.getSortMode();
				sortBtn.textContent = SORT_LABELS[mode] || (0, src_core_i18n_js.t)("Sort: Default");
				const isActive = mode !== "default";
				sortBtn.style.borderColor = isActive ? src_core_config_js.default.COLOR_ACCENT : "rgba(255, 255, 255, 0.23)";
				sortBtn.style.color = isActive ? src_core_config_js.default.COLOR_ACCENT : "inherit";
			};
			sortBtn.style.cssText = `
            padding: 8px 12px;
            font-size: 14px;
            border: 1px solid rgba(255, 255, 255, 0.23);
            border-radius: 4px;
            background: transparent;
            cursor: pointer;
            font-family: inherit;
            flex-shrink: 0;
        `;
			updateSortBtn();
			this._updateSortBtn = updateSortBtn;
			sortBtn.addEventListener("click", () => {
				const current = actionPanelSort.getSortMode();
				const nextIndex = (SORT_MODES.indexOf(current) + 1) % SORT_MODES.length;
				actionPanelSort.setSortMode(SORT_MODES[nextIndex]);
				updateSortBtn();
				actionPanelSort.sortPanelsByProfit();
			});
			input.insertAdjacentElement("afterend", sortBtn);
			this.sortButton = sortBtn;
			if (!src_core_config_js.default.getSetting("actionPanel_showSort")) sortBtn.style.display = "none";
			const PROFIT_MODES = [
				"hybrid",
				"conservative",
				"optimistic",
				"patientBuy"
			];
			const modeBtn = document.createElement("button");
			modeBtn.id = "mwi-action-profit-mode";
			const updateModeBtn = () => {
				const mode = src_core_config_js.default.getSettingValue("profitCalc_pricingMode", "hybrid");
				modeBtn.textContent = (0, src_core_i18n_js.t)("Mode: {0}", src_core_config_js.default.getPricingModeLabel(mode));
			};
			modeBtn.style.cssText = `
            padding: 8px 12px;
            font-size: 14px;
            border: 1px solid rgba(255, 255, 255, 0.23);
            border-radius: 4px;
            background: transparent;
            cursor: pointer;
            font-family: inherit;
            flex-shrink: 0;
        `;
			updateModeBtn();
			this._updateModeBtn = updateModeBtn;
			modeBtn.addEventListener("click", async () => {
				const current = src_core_config_js.default.getSettingValue("profitCalc_pricingMode", "hybrid");
				const nextIndex = (PROFIT_MODES.indexOf(current) + 1) % PROFIT_MODES.length;
				src_core_config_js.default.setSettingValue("profitCalc_pricingMode", PROFIT_MODES[nextIndex]);
				updateModeBtn();
				await this._refreshProfitDisplays();
			});
			sortBtn.insertAdjacentElement("afterend", modeBtn);
			this.modeButton = modeBtn;
			if (!src_core_config_js.default.getSetting("actionPanel_showPricingMode")) modeBtn.style.display = "none";
			const craftBtn = document.createElement("button");
			craftBtn.id = "mwi-action-craft-toggle";
			craftBtn.title = (0, src_core_i18n_js.t)("When on, uses crafting cost for upgrade items if cheaper than market, and includes crafting time in profit/hr");
			const updateCraftBtn = () => {
				const enabled = src_core_config_js.default.getSetting("profitCalc_craftUpgradeItems");
				craftBtn.textContent = enabled ? (0, src_core_i18n_js.t)("Craft: On") : (0, src_core_i18n_js.t)("Craft: Off");
			};
			craftBtn.style.cssText = `
            padding: 8px 12px;
            font-size: 14px;
            border: 1px solid rgba(255, 255, 255, 0.23);
            border-radius: 4px;
            background: transparent;
            cursor: pointer;
            font-family: inherit;
            flex-shrink: 0;
        `;
			updateCraftBtn();
			this._updateCraftBtn = updateCraftBtn;
			craftBtn.addEventListener("click", async () => {
				const current = src_core_config_js.default.getSetting("profitCalc_craftUpgradeItems");
				src_core_config_js.default.setSetting("profitCalc_craftUpgradeItems", !current);
				updateCraftBtn();
				await this._refreshProfitDisplays();
			});
			modeBtn.insertAdjacentElement("afterend", craftBtn);
			this.craftButton = craftBtn;
			if (!src_core_config_js.default.getSetting("actionPanel_showCraftToggle")) craftBtn.style.display = "none";
			this.setupNoResultsMessage(titleElement);
		}
		/**
		* Set up "No matching actions" message container
		* @param {HTMLElement} titleElement - The h1 title element
		*/
		setupNoResultsMessage(titleElement) {
			let container = titleElement.parentElement;
			let depth = 0;
			const maxDepth = 3;
			while (container && depth < maxDepth) {
				if (container.querySelectorAll(".SkillActionDetail_regularComponent__3oCgr").length > 0) {
					const message = document.createElement("div");
					message.id = "mwi-action-filter-no-results";
					message.style.display = "none";
					message.style.textAlign = "center";
					message.style.padding = "40px 20px";
					message.style.color = "rgba(255, 255, 255, 0.6)";
					message.style.fontSize = "16px";
					message.textContent = (0, src_core_i18n_js.t)("No matching actions");
					titleElement.parentElement.insertBefore(message, titleElement.nextSibling);
					this.noResultsMessage = message;
					break;
				}
				container = container.parentElement;
				depth++;
			}
		}
		/**
		* Handle filter input with debouncing
		* @param {string} value - Filter text
		*/
		handleFilterInput(value) {
			if (this.filterTimeout) clearTimeout(this.filterTimeout);
			this.filterTimeout = setTimeout(() => {
				this.filterValue = value.toLowerCase().trim();
				this.applyFilter();
				this.filterTimeout = null;
			}, 300);
			this.timerRegistry.registerTimeout(this.filterTimeout);
		}
		/**
		* Register a panel for filtering
		* @param {HTMLElement} actionPanel - The action panel element
		* @param {string} actionName - The action/item name
		*/
		registerPanel(actionPanel, actionName) {
			const container = actionPanel.parentElement;
			this.panels.set(actionPanel, {
				actionName: actionName.toLowerCase(),
				container
			});
			if (this.filterValue) {
				this.applyFilterToPanel(actionPanel);
				if (actionPanel.dataset.mwiFilterHidden === "true") actionPanel.style.display = "none";
			}
		}
		/**
		* Unregister a panel (cleanup when panel removed from DOM)
		* @param {HTMLElement} actionPanel - The action panel element
		*/
		unregisterPanel(actionPanel) {
			this.panels.delete(actionPanel);
		}
		/**
		* Apply filter to a specific panel
		* @param {HTMLElement} actionPanel - The action panel element
		*/
		applyFilterToPanel(actionPanel) {
			const data = this.panels.get(actionPanel);
			if (!data) return;
			if (!this.filterValue) {
				actionPanel.dataset.mwiFilterHidden = "false";
				return;
			}
			const matches = data.actionName.includes(this.filterValue);
			actionPanel.dataset.mwiFilterHidden = matches ? "false" : "true";
		}
		/**
		* Apply filter to all registered panels
		*/
		applyFilter() {
			let totalPanels = 0;
			let visiblePanels = 0;
			const containerMap = /* @__PURE__ */ new Map();
			for (const [actionPanel, data] of this.panels.entries()) {
				if (!actionPanel.parentElement) {
					this.panels.delete(actionPanel);
					continue;
				}
				totalPanels++;
				if (!containerMap.has(data.container)) containerMap.set(data.container, {
					total: 0,
					visible: 0
				});
				const containerStats = containerMap.get(data.container);
				containerStats.total++;
				this.applyFilterToPanel(actionPanel);
				const isFilterHidden = actionPanel.dataset.mwiFilterHidden === "true";
				if (!isFilterHidden) {
					visiblePanels++;
					containerStats.visible++;
				}
				if (isFilterHidden) actionPanel.style.display = "none";
				else if (actionPanel.style.display === "none") actionPanel.style.display = "";
			}
			if (this.noResultsMessage) if (this.filterValue && visiblePanels === 0 && totalPanels > 0) this.noResultsMessage.style.display = "block";
			else this.noResultsMessage.style.display = "none";
		}
		/**
		* Check if a panel is hidden by the filter
		* @param {HTMLElement} actionPanel - The action panel element
		* @returns {boolean} True if panel is hidden by filter
		*/
		isFilterHidden(actionPanel) {
			return actionPanel.dataset.mwiFilterHidden === "true";
		}
		/**
		* Clear filter and reset state
		*/
		clearFilter() {
			if (this.filterInput) this.filterInput.value = "";
			this.filterValue = "";
			for (const [actionPanel] of this.panels.entries()) if (!actionPanel.parentElement) this.panels.delete(actionPanel);
			else actionPanel.dataset.mwiFilterHidden = "false";
			if (this.noResultsMessage) this.noResultsMessage.style.display = "none";
			if (this.filterInput && this.filterInput.parentElement) {
				this.filterInput.remove();
				this.filterInput = null;
			}
			if (this.sortButton && this.sortButton.parentElement) {
				this.sortButton.remove();
				this.sortButton = null;
			}
			if (this.modeButton && this.modeButton.parentElement) {
				this.modeButton.remove();
				this.modeButton = null;
			}
			if (this.craftButton && this.craftButton.parentElement) {
				this.craftButton.remove();
				this.craftButton = null;
			}
			this._updateModeBtn = null;
			this._updateCraftBtn = null;
			this._updateSortBtn = null;
			if (this.noResultsMessage && this.noResultsMessage.parentElement) {
				this.noResultsMessage.remove();
				this.noResultsMessage = null;
			}
		}
		/**
		* Get the current skill name from the tracked title element
		* @returns {string|null} Skill name (e.g., "Foraging", "Woodcutting", "Cooking") or null
		*/
		getCurrentSkillName() {
			if (!this.currentTitleElement) return null;
			for (const child of this.currentTitleElement.children) {
				if (child.id === "mwi-action-filter") continue;
				if (child.tagName === "DIV" && child.textContent) return child.textContent.trim();
			}
			const text = this.currentTitleElement.textContent.trim();
			if (this.filterInput && this.filterInput.value) return text.replace(this.filterInput.value, "").trim();
			return text || null;
		}
		/**
		* Re-render all visible profit sections using the current pricing mode.
		* Called after the mode button changes profitCalc_pricingMode.
		*/
		async _refreshProfitDisplays() {
			const DROP_TABLE_SELECTOR = "div.SkillActionDetail_dropTable__3ViVp";
			const toRefresh = [];
			document.querySelectorAll("[data-mwi-action-hrid]").forEach((section) => {
				const panel = section.closest("div.SkillActionDetail_regularComponent__3oCgr");
				const actionHrid = section.dataset.mwiActionHrid;
				const actionType = section.dataset.mwiActionType;
				if (panel && actionHrid && actionType) toRefresh.push({
					panel,
					actionHrid,
					actionType
				});
			});
			for (const { panel, actionHrid, actionType } of toRefresh) {
				if (!document.body.contains(panel)) continue;
				if (actionType === "gathering") await displayGatheringProfit(panel, actionHrid, DROP_TABLE_SELECTOR);
				else if (actionType === "production") await displayProductionProfit(panel, actionHrid, DROP_TABLE_SELECTOR);
			}
		}
		/**
		* Cleanup function for disabling filter
		*/
		cleanup() {
			if (this.filterTimeout) {
				clearTimeout(this.filterTimeout);
				this.filterTimeout = null;
			}
			this.timerRegistry.clearAll();
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			this.clearFilter();
			this.panels.clear();
			this.initialized = false;
		}
	};
	var actionFilter = new ActionFilter();
	//#endregion
	//#region src/utils/action-names-zh.js
	/**
	* Chinese action name mapping.
	* Data derived from MWITools (bot7420) Chinese localization.
	* License: CC-BY-NC-SA-4.0
	*/
	var action_names_zh_default = {
		"/actions/milking/cow": "奶牛",
		"/actions/milking/verdant_cow": "翠绿奶牛",
		"/actions/milking/azure_cow": "蔚蓝奶牛",
		"/actions/milking/burble_cow": "深紫奶牛",
		"/actions/milking/crimson_cow": "绛红奶牛",
		"/actions/milking/unicow": "彩虹奶牛",
		"/actions/milking/holy_cow": "神圣奶牛",
		"/actions/foraging/egg": "鸡蛋",
		"/actions/foraging/wheat": "小麦",
		"/actions/foraging/sugar": "糖",
		"/actions/foraging/cotton": "棉花",
		"/actions/foraging/farmland": "翠野农场",
		"/actions/foraging/blueberry": "蓝莓",
		"/actions/foraging/apple": "苹果",
		"/actions/foraging/arabica_coffee_bean": "低级咖啡豆",
		"/actions/foraging/flax": "亚麻",
		"/actions/foraging/shimmering_lake": "波光湖泊",
		"/actions/foraging/blackberry": "黑莓",
		"/actions/foraging/orange": "橙子",
		"/actions/foraging/robusta_coffee_bean": "中级咖啡豆",
		"/actions/foraging/misty_forest": "迷雾森林",
		"/actions/foraging/strawberry": "草莓",
		"/actions/foraging/plum": "李子",
		"/actions/foraging/liberica_coffee_bean": "高级咖啡豆",
		"/actions/foraging/bamboo_branch": "竹子",
		"/actions/foraging/burble_beach": "深紫沙滩",
		"/actions/foraging/mooberry": "哞莓",
		"/actions/foraging/peach": "桃子",
		"/actions/foraging/excelsa_coffee_bean": "特级咖啡豆",
		"/actions/foraging/cocoon": "蚕茧",
		"/actions/foraging/silly_cow_valley": "傻牛山谷",
		"/actions/foraging/marsberry": "火星莓",
		"/actions/foraging/dragon_fruit": "火龙果",
		"/actions/foraging/fieriosa_coffee_bean": "火山咖啡豆",
		"/actions/foraging/olympus_mons": "奥林匹斯山",
		"/actions/foraging/spaceberry": "太空莓",
		"/actions/foraging/star_fruit": "杨桃",
		"/actions/foraging/spacia_coffee_bean": "太空咖啡豆",
		"/actions/foraging/radiant_fiber": "光辉纤维",
		"/actions/foraging/asteroid_belt": "小行星带",
		"/actions/woodcutting/tree": "树",
		"/actions/woodcutting/birch_tree": "桦树",
		"/actions/woodcutting/cedar_tree": "雪松树",
		"/actions/woodcutting/purpleheart_tree": "紫心树",
		"/actions/woodcutting/ginkgo_tree": "银杏树",
		"/actions/woodcutting/redwood_tree": "红杉树",
		"/actions/woodcutting/arcane_tree": "奥秘树",
		"/actions/cheesesmithing/cheese": "奶酪",
		"/actions/cheesesmithing/cheese_boots": "奶酪靴",
		"/actions/cheesesmithing/cheese_gauntlets": "奶酪护手",
		"/actions/cheesesmithing/cheese_sword": "奶酪剑",
		"/actions/cheesesmithing/cheese_brush": "奶酪刷子",
		"/actions/cheesesmithing/cheese_shears": "奶酪剪刀",
		"/actions/cheesesmithing/cheese_hatchet": "奶酪斧头",
		"/actions/cheesesmithing/cheese_spear": "奶酪长枪",
		"/actions/cheesesmithing/cheese_hammer": "奶酪锤子",
		"/actions/cheesesmithing/cheese_chisel": "奶酪凿子",
		"/actions/cheesesmithing/cheese_needle": "奶酪针",
		"/actions/cheesesmithing/cheese_spatula": "奶酪锅铲",
		"/actions/cheesesmithing/cheese_pot": "奶酪壶",
		"/actions/cheesesmithing/cheese_mace": "奶酪钉头锤",
		"/actions/cheesesmithing/cheese_alembic": "奶酪蒸馏器",
		"/actions/cheesesmithing/cheese_enhancer": "奶酪强化器",
		"/actions/cheesesmithing/cheese_helmet": "奶酪头盔",
		"/actions/cheesesmithing/cheese_buckler": "奶酪圆盾",
		"/actions/cheesesmithing/cheese_bulwark": "奶酪重盾",
		"/actions/cheesesmithing/cheese_plate_legs": "奶酪腿甲",
		"/actions/cheesesmithing/cheese_plate_body": "奶酪胸甲",
		"/actions/cheesesmithing/verdant_cheese": "翠绿奶酪",
		"/actions/cheesesmithing/verdant_boots": "翠绿靴",
		"/actions/cheesesmithing/verdant_gauntlets": "翠绿护手",
		"/actions/cheesesmithing/verdant_sword": "翠绿剑",
		"/actions/cheesesmithing/verdant_brush": "翠绿刷子",
		"/actions/cheesesmithing/verdant_shears": "翠绿剪刀",
		"/actions/cheesesmithing/verdant_hatchet": "翠绿斧头",
		"/actions/cheesesmithing/verdant_spear": "翠绿长枪",
		"/actions/cheesesmithing/verdant_hammer": "翠绿锤子",
		"/actions/cheesesmithing/verdant_chisel": "翠绿凿子",
		"/actions/cheesesmithing/verdant_needle": "翠绿针",
		"/actions/cheesesmithing/verdant_spatula": "翠绿锅铲",
		"/actions/cheesesmithing/verdant_pot": "翠绿壶",
		"/actions/cheesesmithing/verdant_mace": "翠绿钉头锤",
		"/actions/cheesesmithing/snake_fang_dirk": "蛇牙短剑",
		"/actions/cheesesmithing/verdant_alembic": "翠绿蒸馏器",
		"/actions/cheesesmithing/verdant_enhancer": "翠绿强化器",
		"/actions/cheesesmithing/verdant_helmet": "翠绿头盔",
		"/actions/cheesesmithing/verdant_buckler": "翠绿圆盾",
		"/actions/cheesesmithing/verdant_bulwark": "翠绿重盾",
		"/actions/cheesesmithing/verdant_plate_legs": "翠绿腿甲",
		"/actions/cheesesmithing/verdant_plate_body": "翠绿胸甲",
		"/actions/cheesesmithing/azure_cheese": "蔚蓝奶酪",
		"/actions/cheesesmithing/azure_boots": "蔚蓝靴",
		"/actions/cheesesmithing/basic_beacon": "基础探照灯",
		"/actions/cheesesmithing/azure_gauntlets": "蔚蓝护手",
		"/actions/cheesesmithing/azure_sword": "蔚蓝剑",
		"/actions/cheesesmithing/azure_brush": "蔚蓝刷子",
		"/actions/cheesesmithing/azure_shears": "蔚蓝剪刀",
		"/actions/cheesesmithing/azure_hatchet": "蔚蓝斧头",
		"/actions/cheesesmithing/azure_spear": "蔚蓝长枪",
		"/actions/cheesesmithing/azure_hammer": "蔚蓝锤子",
		"/actions/cheesesmithing/azure_chisel": "蔚蓝凿子",
		"/actions/cheesesmithing/azure_needle": "蔚蓝针",
		"/actions/cheesesmithing/azure_spatula": "蔚蓝锅铲",
		"/actions/cheesesmithing/azure_pot": "蔚蓝壶",
		"/actions/cheesesmithing/azure_mace": "蔚蓝钉头锤",
		"/actions/cheesesmithing/pincer_gloves": "蟹钳手套",
		"/actions/cheesesmithing/azure_alembic": "蔚蓝蒸馏器",
		"/actions/cheesesmithing/azure_enhancer": "蔚蓝强化器",
		"/actions/cheesesmithing/azure_helmet": "蔚蓝头盔",
		"/actions/cheesesmithing/azure_buckler": "蔚蓝圆盾",
		"/actions/cheesesmithing/azure_bulwark": "蔚蓝重盾",
		"/actions/cheesesmithing/azure_plate_legs": "蔚蓝腿甲",
		"/actions/cheesesmithing/snail_shell_helmet": "蜗牛壳头盔",
		"/actions/cheesesmithing/azure_plate_body": "蔚蓝胸甲",
		"/actions/cheesesmithing/turtle_shell_legs": "龟壳腿甲",
		"/actions/cheesesmithing/turtle_shell_body": "龟壳胸甲",
		"/actions/cheesesmithing/burble_cheese": "深紫奶酪",
		"/actions/cheesesmithing/burble_boots": "深紫靴",
		"/actions/cheesesmithing/burble_gauntlets": "深紫护手",
		"/actions/cheesesmithing/burble_sword": "深紫剑",
		"/actions/cheesesmithing/burble_brush": "深紫刷子",
		"/actions/cheesesmithing/burble_shears": "深紫剪刀",
		"/actions/cheesesmithing/burble_hatchet": "深紫斧头",
		"/actions/cheesesmithing/burble_spear": "深紫长枪",
		"/actions/cheesesmithing/burble_hammer": "深紫锤子",
		"/actions/cheesesmithing/burble_chisel": "深紫凿子",
		"/actions/cheesesmithing/burble_needle": "深紫针",
		"/actions/cheesesmithing/burble_spatula": "深紫锅铲",
		"/actions/cheesesmithing/burble_pot": "深紫壶",
		"/actions/cheesesmithing/burble_mace": "深紫钉头锤",
		"/actions/cheesesmithing/burble_alembic": "深紫蒸馏器",
		"/actions/cheesesmithing/burble_enhancer": "深紫强化器",
		"/actions/cheesesmithing/burble_helmet": "深紫头盔",
		"/actions/cheesesmithing/burble_buckler": "深紫圆盾",
		"/actions/cheesesmithing/burble_bulwark": "深紫重盾",
		"/actions/cheesesmithing/burble_plate_legs": "深紫腿甲",
		"/actions/cheesesmithing/burble_plate_body": "深紫胸甲",
		"/actions/cheesesmithing/crimson_cheese": "绛红奶酪",
		"/actions/cheesesmithing/crimson_boots": "绛红靴",
		"/actions/cheesesmithing/advanced_beacon": "进阶探照灯",
		"/actions/cheesesmithing/crimson_gauntlets": "绛红护手",
		"/actions/cheesesmithing/crimson_sword": "绛红剑",
		"/actions/cheesesmithing/crimson_brush": "绛红刷子",
		"/actions/cheesesmithing/crimson_shears": "绛红剪刀",
		"/actions/cheesesmithing/crimson_hatchet": "绛红斧头",
		"/actions/cheesesmithing/crimson_spear": "绛红长枪",
		"/actions/cheesesmithing/crimson_hammer": "绛红锤子",
		"/actions/cheesesmithing/crimson_chisel": "绛红凿子",
		"/actions/cheesesmithing/crimson_needle": "绛红针",
		"/actions/cheesesmithing/crimson_spatula": "绛红锅铲",
		"/actions/cheesesmithing/crimson_pot": "绛红壶",
		"/actions/cheesesmithing/crimson_mace": "绛红钉头锤",
		"/actions/cheesesmithing/crimson_alembic": "绛红蒸馏器",
		"/actions/cheesesmithing/crimson_enhancer": "绛红强化器",
		"/actions/cheesesmithing/crimson_helmet": "绛红头盔",
		"/actions/cheesesmithing/crimson_buckler": "绛红圆盾",
		"/actions/cheesesmithing/crimson_bulwark": "绛红重盾",
		"/actions/cheesesmithing/crimson_plate_legs": "绛红腿甲",
		"/actions/cheesesmithing/vision_helmet": "视觉头盔",
		"/actions/cheesesmithing/vision_shield": "视觉盾",
		"/actions/cheesesmithing/crimson_plate_body": "绛红胸甲",
		"/actions/cheesesmithing/rainbow_cheese": "彩虹奶酪",
		"/actions/cheesesmithing/rainbow_boots": "彩虹靴",
		"/actions/cheesesmithing/black_bear_shoes": "黑熊鞋",
		"/actions/cheesesmithing/grizzly_bear_shoes": "棕熊鞋",
		"/actions/cheesesmithing/polar_bear_shoes": "北极熊鞋",
		"/actions/cheesesmithing/rainbow_gauntlets": "彩虹护手",
		"/actions/cheesesmithing/rainbow_sword": "彩虹剑",
		"/actions/cheesesmithing/panda_gloves": "熊猫手套",
		"/actions/cheesesmithing/rainbow_brush": "彩虹刷子",
		"/actions/cheesesmithing/rainbow_shears": "彩虹剪刀",
		"/actions/cheesesmithing/rainbow_hatchet": "彩虹斧头",
		"/actions/cheesesmithing/rainbow_spear": "彩虹长枪",
		"/actions/cheesesmithing/rainbow_hammer": "彩虹锤子",
		"/actions/cheesesmithing/rainbow_chisel": "彩虹凿子",
		"/actions/cheesesmithing/rainbow_needle": "彩虹针",
		"/actions/cheesesmithing/rainbow_spatula": "彩虹锅铲",
		"/actions/cheesesmithing/rainbow_pot": "彩虹壶",
		"/actions/cheesesmithing/rainbow_mace": "彩虹钉头锤",
		"/actions/cheesesmithing/rainbow_alembic": "彩虹蒸馏器",
		"/actions/cheesesmithing/rainbow_enhancer": "彩虹强化器",
		"/actions/cheesesmithing/rainbow_helmet": "彩虹头盔",
		"/actions/cheesesmithing/rainbow_buckler": "彩虹圆盾",
		"/actions/cheesesmithing/rainbow_bulwark": "彩虹重盾",
		"/actions/cheesesmithing/rainbow_plate_legs": "彩虹腿甲",
		"/actions/cheesesmithing/rainbow_plate_body": "彩虹胸甲",
		"/actions/cheesesmithing/holy_cheese": "神圣奶酪",
		"/actions/cheesesmithing/holy_boots": "神圣靴",
		"/actions/cheesesmithing/expert_beacon": "专家探照灯",
		"/actions/cheesesmithing/holy_gauntlets": "神圣护手",
		"/actions/cheesesmithing/holy_sword": "神圣剑",
		"/actions/cheesesmithing/holy_brush": "神圣刷子",
		"/actions/cheesesmithing/holy_shears": "神圣剪刀",
		"/actions/cheesesmithing/holy_hatchet": "神圣斧头",
		"/actions/cheesesmithing/holy_spear": "神圣长枪",
		"/actions/cheesesmithing/holy_hammer": "神圣锤子",
		"/actions/cheesesmithing/holy_chisel": "神圣凿子",
		"/actions/cheesesmithing/holy_needle": "神圣针",
		"/actions/cheesesmithing/holy_spatula": "神圣锅铲",
		"/actions/cheesesmithing/holy_pot": "神圣壶",
		"/actions/cheesesmithing/holy_mace": "神圣钉头锤",
		"/actions/cheesesmithing/magnetic_gloves": "磁力手套",
		"/actions/cheesesmithing/stalactite_spear": "石钟长枪",
		"/actions/cheesesmithing/granite_bludgeon": "花岗岩大棒",
		"/actions/cheesesmithing/vampire_fang_dirk": "吸血鬼短剑",
		"/actions/cheesesmithing/werewolf_slasher": "狼人关刀",
		"/actions/cheesesmithing/holy_alembic": "神圣蒸馏器",
		"/actions/cheesesmithing/holy_enhancer": "神圣强化器",
		"/actions/cheesesmithing/holy_helmet": "神圣头盔",
		"/actions/cheesesmithing/holy_buckler": "神圣圆盾",
		"/actions/cheesesmithing/holy_bulwark": "神圣重盾",
		"/actions/cheesesmithing/holy_plate_legs": "神圣腿甲",
		"/actions/cheesesmithing/holy_plate_body": "神圣胸甲",
		"/actions/cheesesmithing/celestial_brush": "星空刷子",
		"/actions/cheesesmithing/celestial_shears": "星空剪刀",
		"/actions/cheesesmithing/celestial_hatchet": "星空斧头",
		"/actions/cheesesmithing/celestial_hammer": "星空锤子",
		"/actions/cheesesmithing/celestial_chisel": "星空凿子",
		"/actions/cheesesmithing/celestial_needle": "星空针",
		"/actions/cheesesmithing/celestial_spatula": "星空锅铲",
		"/actions/cheesesmithing/celestial_pot": "星空壶",
		"/actions/cheesesmithing/celestial_alembic": "星空蒸馏器",
		"/actions/cheesesmithing/celestial_enhancer": "星空强化器",
		"/actions/cheesesmithing/colossus_plate_body": "巨像胸甲",
		"/actions/cheesesmithing/colossus_plate_legs": "巨像腿甲",
		"/actions/cheesesmithing/demonic_plate_body": "恶魔胸甲",
		"/actions/cheesesmithing/demonic_plate_legs": "恶魔腿甲",
		"/actions/cheesesmithing/spiked_bulwark": "尖刺重盾",
		"/actions/cheesesmithing/pathbreaker_boots": "开路者靴",
		"/actions/cheesesmithing/dodocamel_gauntlets": "渡渡驼护手",
		"/actions/cheesesmithing/corsair_helmet": "掠夺者头盔",
		"/actions/cheesesmithing/knights_aegis": "骑士盾",
		"/actions/cheesesmithing/anchorbound_plate_legs": "锚定腿甲",
		"/actions/cheesesmithing/maelstrom_plate_legs": "怒涛腿甲",
		"/actions/cheesesmithing/griffin_bulwark": "狮鹫重盾",
		"/actions/cheesesmithing/furious_spear": "狂怒长枪",
		"/actions/cheesesmithing/chaotic_flail": "混沌连枷",
		"/actions/cheesesmithing/regal_sword": "君王之剑",
		"/actions/cheesesmithing/anchorbound_plate_body": "锚定胸甲",
		"/actions/cheesesmithing/maelstrom_plate_body": "怒涛胸甲",
		"/actions/cheesesmithing/pathbreaker_boots_refined": "开路者靴 ★",
		"/actions/cheesesmithing/dodocamel_gauntlets_refined": "渡渡驼护手 ★",
		"/actions/cheesesmithing/corsair_helmet_refined": "掠夺者头盔 ★",
		"/actions/cheesesmithing/knights_aegis_refined": "骑士盾 ★",
		"/actions/cheesesmithing/anchorbound_plate_legs_refined": "锚定腿甲 ★",
		"/actions/cheesesmithing/maelstrom_plate_legs_refined": "怒涛腿甲 ★",
		"/actions/cheesesmithing/griffin_bulwark_refined": "狮鹫重盾 ★",
		"/actions/cheesesmithing/furious_spear_refined": "狂怒长枪 ★",
		"/actions/cheesesmithing/chaotic_flail_refined": "混沌连枷 ★",
		"/actions/cheesesmithing/regal_sword_refined": "君王之剑 ★",
		"/actions/cheesesmithing/anchorbound_plate_body_refined": "锚定胸甲 ★",
		"/actions/cheesesmithing/maelstrom_plate_body_refined": "怒涛胸甲 ★",
		"/actions/crafting/lumber": "木板",
		"/actions/crafting/wooden_crossbow": "木弩",
		"/actions/crafting/wooden_water_staff": "木制水法杖",
		"/actions/crafting/basic_task_badge": "基础任务徽章",
		"/actions/crafting/advanced_task_badge": "高级任务徽章",
		"/actions/crafting/expert_task_badge": "专家任务徽章",
		"/actions/crafting/wooden_shield": "木盾",
		"/actions/crafting/wooden_nature_staff": "木制自然法杖",
		"/actions/crafting/wooden_bow": "木弓",
		"/actions/crafting/wooden_fire_staff": "木制火法杖",
		"/actions/crafting/birch_lumber": "白桦木板",
		"/actions/crafting/birch_crossbow": "桦木弩",
		"/actions/crafting/birch_water_staff": "桦木水法杖",
		"/actions/crafting/crushed_pearl": "珍珠碎片",
		"/actions/crafting/birch_shield": "桦木盾",
		"/actions/crafting/birch_nature_staff": "桦木自然法杖",
		"/actions/crafting/birch_bow": "桦木弓",
		"/actions/crafting/ring_of_gathering": "采集戒指",
		"/actions/crafting/birch_fire_staff": "桦木火法杖",
		"/actions/crafting/earrings_of_gathering": "采集耳环",
		"/actions/crafting/cedar_lumber": "雪松木板",
		"/actions/crafting/cedar_crossbow": "雪松弩",
		"/actions/crafting/cedar_water_staff": "雪松水法杖",
		"/actions/crafting/basic_milking_charm": "基础挤奶护符",
		"/actions/crafting/basic_foraging_charm": "基础采摘护符",
		"/actions/crafting/basic_woodcutting_charm": "基础伐木护符",
		"/actions/crafting/basic_cheesesmithing_charm": "基础奶酪锻造护符",
		"/actions/crafting/basic_crafting_charm": "基础制作护符",
		"/actions/crafting/basic_tailoring_charm": "基础缝纫护符",
		"/actions/crafting/basic_cooking_charm": "基础烹饪护符",
		"/actions/crafting/basic_brewing_charm": "基础冲泡护符",
		"/actions/crafting/basic_alchemy_charm": "基础炼金护符",
		"/actions/crafting/basic_enhancing_charm": "基础强化护符",
		"/actions/crafting/basic_torch": "基础火把",
		"/actions/crafting/cedar_shield": "雪松盾",
		"/actions/crafting/cedar_nature_staff": "雪松自然法杖",
		"/actions/crafting/cedar_bow": "雪松弓",
		"/actions/crafting/crushed_amber": "琥珀碎片",
		"/actions/crafting/cedar_fire_staff": "雪松火法杖",
		"/actions/crafting/ring_of_essence_find": "精华发现戒指",
		"/actions/crafting/earrings_of_essence_find": "精华发现耳环",
		"/actions/crafting/necklace_of_efficiency": "效率项链",
		"/actions/crafting/purpleheart_lumber": "紫心木板",
		"/actions/crafting/purpleheart_crossbow": "紫心弩",
		"/actions/crafting/purpleheart_water_staff": "紫心水法杖",
		"/actions/crafting/purpleheart_shield": "紫心盾",
		"/actions/crafting/purpleheart_nature_staff": "紫心自然法杖",
		"/actions/crafting/purpleheart_bow": "紫心弓",
		"/actions/crafting/advanced_milking_charm": "高级挤奶护符",
		"/actions/crafting/advanced_foraging_charm": "高级采摘护符",
		"/actions/crafting/advanced_woodcutting_charm": "高级伐木护符",
		"/actions/crafting/advanced_cheesesmithing_charm": "高级奶酪锻造护符",
		"/actions/crafting/advanced_crafting_charm": "高级制作护符",
		"/actions/crafting/advanced_tailoring_charm": "高级缝纫护符",
		"/actions/crafting/advanced_cooking_charm": "高级烹饪护符",
		"/actions/crafting/advanced_brewing_charm": "高级冲泡护符",
		"/actions/crafting/advanced_alchemy_charm": "高级炼金护符",
		"/actions/crafting/advanced_enhancing_charm": "高级强化护符",
		"/actions/crafting/advanced_stamina_charm": "高级耐力护符",
		"/actions/crafting/advanced_intelligence_charm": "高级智力护符",
		"/actions/crafting/advanced_attack_charm": "高级攻击护符",
		"/actions/crafting/advanced_defense_charm": "高级防御护符",
		"/actions/crafting/advanced_melee_charm": "高级近战护符",
		"/actions/crafting/advanced_ranged_charm": "高级远程护符",
		"/actions/crafting/advanced_magic_charm": "高级魔法护符",
		"/actions/crafting/crushed_garnet": "石榴石碎片",
		"/actions/crafting/crushed_jade": "翡翠碎片",
		"/actions/crafting/crushed_amethyst": "紫水晶碎片",
		"/actions/crafting/catalyst_of_coinification": "点金催化剂",
		"/actions/crafting/treant_shield": "树人盾",
		"/actions/crafting/purpleheart_fire_staff": "紫心火法杖",
		"/actions/crafting/ring_of_regeneration": "恢复戒指",
		"/actions/crafting/earrings_of_regeneration": "恢复耳环",
		"/actions/crafting/fighter_necklace": "战士项链",
		"/actions/crafting/ginkgo_lumber": "银杏木板",
		"/actions/crafting/ginkgo_crossbow": "银杏弩",
		"/actions/crafting/ginkgo_water_staff": "银杏水法杖",
		"/actions/crafting/ring_of_armor": "护甲戒指",
		"/actions/crafting/catalyst_of_decomposition": "分解催化剂",
		"/actions/crafting/advanced_torch": "进阶火把",
		"/actions/crafting/ginkgo_shield": "银杏盾",
		"/actions/crafting/earrings_of_armor": "护甲耳环",
		"/actions/crafting/ginkgo_nature_staff": "银杏自然法杖",
		"/actions/crafting/ranger_necklace": "射手项链",
		"/actions/crafting/ginkgo_bow": "银杏弓",
		"/actions/crafting/ring_of_resistance": "抗性戒指",
		"/actions/crafting/crushed_moonstone": "月亮石碎片",
		"/actions/crafting/ginkgo_fire_staff": "银杏火法杖",
		"/actions/crafting/earrings_of_resistance": "抗性耳环",
		"/actions/crafting/wizard_necklace": "巫师项链",
		"/actions/crafting/ring_of_rare_find": "稀有发现戒指",
		"/actions/crafting/expert_milking_charm": "专家挤奶护符",
		"/actions/crafting/expert_foraging_charm": "专家采摘护符",
		"/actions/crafting/expert_woodcutting_charm": "专家伐木护符",
		"/actions/crafting/expert_cheesesmithing_charm": "专家奶酪锻造护符",
		"/actions/crafting/expert_crafting_charm": "专家制作护符",
		"/actions/crafting/expert_tailoring_charm": "专家缝纫护符",
		"/actions/crafting/expert_cooking_charm": "专家烹饪护符",
		"/actions/crafting/expert_brewing_charm": "专家冲泡护符",
		"/actions/crafting/expert_alchemy_charm": "专家炼金护符",
		"/actions/crafting/expert_enhancing_charm": "专家强化护符",
		"/actions/crafting/expert_stamina_charm": "专家耐力护符",
		"/actions/crafting/expert_intelligence_charm": "专家智力护符",
		"/actions/crafting/expert_attack_charm": "专家攻击护符",
		"/actions/crafting/expert_defense_charm": "专家防御护符",
		"/actions/crafting/expert_melee_charm": "专家近战护符",
		"/actions/crafting/expert_ranged_charm": "专家远程护符",
		"/actions/crafting/expert_magic_charm": "专家魔法护符",
		"/actions/crafting/catalyst_of_transmutation": "转化催化剂",
		"/actions/crafting/earrings_of_rare_find": "稀有发现耳环",
		"/actions/crafting/necklace_of_wisdom": "经验项链",
		"/actions/crafting/redwood_lumber": "红杉木板",
		"/actions/crafting/redwood_crossbow": "红杉弩",
		"/actions/crafting/redwood_water_staff": "红杉水法杖",
		"/actions/crafting/redwood_shield": "红杉盾",
		"/actions/crafting/redwood_nature_staff": "红杉自然法杖",
		"/actions/crafting/redwood_bow": "红杉弓",
		"/actions/crafting/crushed_sunstone": "太阳石碎片",
		"/actions/crafting/chimerical_entry_key": "奇幻钥匙",
		"/actions/crafting/chimerical_chest_key": "奇幻宝箱钥匙",
		"/actions/crafting/eye_watch": "掌上监工",
		"/actions/crafting/watchful_relic": "警戒遗物",
		"/actions/crafting/redwood_fire_staff": "红杉火法杖",
		"/actions/crafting/ring_of_critical_strike": "暴击戒指",
		"/actions/crafting/mirror_of_protection": "保护之镜",
		"/actions/crafting/earrings_of_critical_strike": "暴击耳环",
		"/actions/crafting/necklace_of_speed": "速度项链",
		"/actions/crafting/arcane_lumber": "神秘木板",
		"/actions/crafting/arcane_crossbow": "神秘弩",
		"/actions/crafting/arcane_water_staff": "神秘水法杖",
		"/actions/crafting/master_milking_charm": "大师挤奶护符",
		"/actions/crafting/master_foraging_charm": "大师采摘护符",
		"/actions/crafting/master_woodcutting_charm": "大师伐木护符",
		"/actions/crafting/master_cheesesmithing_charm": "大师奶酪锻造护符",
		"/actions/crafting/master_crafting_charm": "大师制作护符",
		"/actions/crafting/master_tailoring_charm": "大师缝纫护符",
		"/actions/crafting/master_cooking_charm": "大师烹饪护符",
		"/actions/crafting/master_brewing_charm": "大师冲泡护符",
		"/actions/crafting/master_alchemy_charm": "大师炼金护符",
		"/actions/crafting/master_enhancing_charm": "大师强化护符",
		"/actions/crafting/master_stamina_charm": "大师耐力护符",
		"/actions/crafting/master_intelligence_charm": "大师智力护符",
		"/actions/crafting/master_attack_charm": "大师攻击护符",
		"/actions/crafting/master_defense_charm": "大师防御护符",
		"/actions/crafting/master_melee_charm": "大师近战护符",
		"/actions/crafting/master_ranged_charm": "大师远程护符",
		"/actions/crafting/master_magic_charm": "大师魔法护符",
		"/actions/crafting/sinister_entry_key": "阴森钥匙",
		"/actions/crafting/sinister_chest_key": "阴森宝箱钥匙",
		"/actions/crafting/expert_torch": "专家火把",
		"/actions/crafting/arcane_shield": "神秘盾",
		"/actions/crafting/arcane_nature_staff": "神秘自然法杖",
		"/actions/crafting/manticore_shield": "蝎狮盾",
		"/actions/crafting/arcane_bow": "神秘弓",
		"/actions/crafting/enchanted_entry_key": "秘法钥匙",
		"/actions/crafting/enchanted_chest_key": "秘法宝箱钥匙",
		"/actions/crafting/pirate_entry_key": "海盗钥匙",
		"/actions/crafting/pirate_chest_key": "海盗宝箱钥匙",
		"/actions/crafting/arcane_fire_staff": "神秘火法杖",
		"/actions/crafting/vampiric_bow": "吸血弓",
		"/actions/crafting/soul_hunter_crossbow": "灵魂猎手弩",
		"/actions/crafting/frost_staff": "冰霜法杖",
		"/actions/crafting/infernal_battlestaff": "炼狱法杖",
		"/actions/crafting/jackalope_staff": "鹿角兔之杖",
		"/actions/crafting/philosophers_ring": "贤者戒指",
		"/actions/crafting/crushed_philosophers_stone": "贤者之石碎片",
		"/actions/crafting/philosophers_earrings": "贤者耳环",
		"/actions/crafting/philosophers_necklace": "贤者项链",
		"/actions/crafting/bishops_codex": "主教法典",
		"/actions/crafting/cursed_bow": "咒怨之弓",
		"/actions/crafting/sundering_crossbow": "裂空之弩",
		"/actions/crafting/rippling_trident": "涟漪三叉戟",
		"/actions/crafting/blooming_trident": "绽放三叉戟",
		"/actions/crafting/blazing_trident": "炽焰三叉戟",
		"/actions/crafting/grandmaster_milking_charm": "宗师挤奶护符",
		"/actions/crafting/grandmaster_foraging_charm": "宗师采摘护符",
		"/actions/crafting/grandmaster_woodcutting_charm": "宗师伐木护符",
		"/actions/crafting/grandmaster_cheesesmithing_charm": "宗师奶酪锻造护符",
		"/actions/crafting/grandmaster_crafting_charm": "宗师制作护符",
		"/actions/crafting/grandmaster_tailoring_charm": "宗师缝纫护符",
		"/actions/crafting/grandmaster_cooking_charm": "宗师烹饪护符",
		"/actions/crafting/grandmaster_brewing_charm": "宗师冲泡护符",
		"/actions/crafting/grandmaster_alchemy_charm": "宗师炼金护符",
		"/actions/crafting/grandmaster_enhancing_charm": "宗师强化护符",
		"/actions/crafting/grandmaster_stamina_charm": "宗师耐力护符",
		"/actions/crafting/grandmaster_intelligence_charm": "宗师智力护符",
		"/actions/crafting/grandmaster_attack_charm": "宗师攻击护符",
		"/actions/crafting/grandmaster_defense_charm": "宗师防御护符",
		"/actions/crafting/grandmaster_melee_charm": "宗师近战护符",
		"/actions/crafting/grandmaster_ranged_charm": "宗师远程护符",
		"/actions/crafting/grandmaster_magic_charm": "宗师魔法护符",
		"/actions/crafting/philosophers_mirror": "贤者之镜",
		"/actions/crafting/bishops_codex_refined": "主教法典 ★",
		"/actions/crafting/cursed_bow_refined": "咒怨之弓 ★",
		"/actions/crafting/sundering_crossbow_refined": "裂空之弩 ★",
		"/actions/crafting/rippling_trident_refined": "涟漪三叉戟 ★",
		"/actions/crafting/blooming_trident_refined": "绽放三叉戟 ★",
		"/actions/crafting/blazing_trident_refined": "炽焰三叉戟 ★",
		"/actions/tailoring/rough_leather": "粗糙皮革",
		"/actions/tailoring/cotton_fabric": "棉花布料",
		"/actions/tailoring/rough_boots": "粗糙靴",
		"/actions/tailoring/cotton_boots": "棉靴",
		"/actions/tailoring/rough_bracers": "粗糙护腕",
		"/actions/tailoring/cotton_gloves": "棉手套",
		"/actions/tailoring/small_pouch": "小袋子",
		"/actions/tailoring/rough_hood": "粗糙兜帽",
		"/actions/tailoring/cotton_hat": "棉帽",
		"/actions/tailoring/rough_chaps": "粗糙皮裤",
		"/actions/tailoring/cotton_robe_bottoms": "棉袍裙",
		"/actions/tailoring/rough_tunic": "粗糙皮衣",
		"/actions/tailoring/cotton_robe_top": "棉袍服",
		"/actions/tailoring/reptile_leather": "爬行动物皮革",
		"/actions/tailoring/linen_fabric": "亚麻布料",
		"/actions/tailoring/reptile_boots": "爬行动物靴",
		"/actions/tailoring/linen_boots": "亚麻靴",
		"/actions/tailoring/reptile_bracers": "爬行动物护腕",
		"/actions/tailoring/linen_gloves": "亚麻手套",
		"/actions/tailoring/basic_shroud": "基础斗篷",
		"/actions/tailoring/reptile_hood": "爬行动物兜帽",
		"/actions/tailoring/linen_hat": "亚麻帽",
		"/actions/tailoring/reptile_chaps": "爬行动物皮裤",
		"/actions/tailoring/linen_robe_bottoms": "亚麻袍裙",
		"/actions/tailoring/medium_pouch": "中袋子",
		"/actions/tailoring/reptile_tunic": "爬行动物皮衣",
		"/actions/tailoring/linen_robe_top": "亚麻袍服",
		"/actions/tailoring/shoebill_shoes": "鲸头鹳鞋",
		"/actions/tailoring/gobo_leather": "哥布林皮革",
		"/actions/tailoring/bamboo_fabric": "竹子布料",
		"/actions/tailoring/gobo_boots": "哥布林靴",
		"/actions/tailoring/bamboo_boots": "竹靴",
		"/actions/tailoring/gobo_bracers": "哥布林护腕",
		"/actions/tailoring/bamboo_gloves": "竹手套",
		"/actions/tailoring/gobo_hood": "哥布林兜帽",
		"/actions/tailoring/bamboo_hat": "竹帽",
		"/actions/tailoring/gobo_chaps": "哥布林皮裤",
		"/actions/tailoring/bamboo_robe_bottoms": "竹袍裙",
		"/actions/tailoring/large_pouch": "大袋子",
		"/actions/tailoring/gobo_tunic": "哥布林皮衣",
		"/actions/tailoring/bamboo_robe_top": "竹袍服",
		"/actions/tailoring/marine_tunic": "海洋皮衣",
		"/actions/tailoring/marine_chaps": "航海皮裤",
		"/actions/tailoring/icy_robe_top": "冰霜袍服",
		"/actions/tailoring/icy_robe_bottoms": "冰霜袍裙",
		"/actions/tailoring/flaming_robe_top": "烈焰袍服",
		"/actions/tailoring/flaming_robe_bottoms": "烈焰袍裙",
		"/actions/tailoring/advanced_shroud": "进阶斗篷",
		"/actions/tailoring/beast_leather": "野兽皮革",
		"/actions/tailoring/silk_fabric": "丝绸",
		"/actions/tailoring/beast_boots": "野兽靴",
		"/actions/tailoring/silk_boots": "丝靴",
		"/actions/tailoring/beast_bracers": "野兽护腕",
		"/actions/tailoring/silk_gloves": "丝手套",
		"/actions/tailoring/collectors_boots": "收藏家靴",
		"/actions/tailoring/sighted_bracers": "瞄准护腕",
		"/actions/tailoring/beast_hood": "野兽兜帽",
		"/actions/tailoring/silk_hat": "丝帽",
		"/actions/tailoring/beast_chaps": "野兽皮裤",
		"/actions/tailoring/silk_robe_bottoms": "丝绸袍裙",
		"/actions/tailoring/centaur_boots": "半人马靴",
		"/actions/tailoring/sorcerer_boots": "巫师靴",
		"/actions/tailoring/giant_pouch": "巨大袋子",
		"/actions/tailoring/beast_tunic": "野兽皮衣",
		"/actions/tailoring/silk_robe_top": "丝绸袍服",
		"/actions/tailoring/red_culinary_hat": "红色厨师帽",
		"/actions/tailoring/luna_robe_top": "月神袍服",
		"/actions/tailoring/luna_robe_bottoms": "月神袍裙",
		"/actions/tailoring/umbral_leather": "暗影皮革",
		"/actions/tailoring/radiant_fabric": "光辉布料",
		"/actions/tailoring/umbral_boots": "暗影靴",
		"/actions/tailoring/radiant_boots": "光辉靴",
		"/actions/tailoring/umbral_bracers": "暗影护腕",
		"/actions/tailoring/radiant_gloves": "光辉手套",
		"/actions/tailoring/enchanted_gloves": "附魔手套",
		"/actions/tailoring/fluffy_red_hat": "蓬松红帽子",
		"/actions/tailoring/chrono_gloves": "时空手套",
		"/actions/tailoring/expert_shroud": "专家斗篷",
		"/actions/tailoring/umbral_hood": "暗影兜帽",
		"/actions/tailoring/radiant_hat": "光辉帽",
		"/actions/tailoring/umbral_chaps": "暗影皮裤",
		"/actions/tailoring/radiant_robe_bottoms": "光辉袍裙",
		"/actions/tailoring/umbral_tunic": "暗影皮衣",
		"/actions/tailoring/radiant_robe_top": "光辉袍服",
		"/actions/tailoring/revenant_chaps": "亡灵皮裤",
		"/actions/tailoring/griffin_chaps": "狮鹫皮裤",
		"/actions/tailoring/dairyhands_top": "挤奶工上衣",
		"/actions/tailoring/dairyhands_bottoms": "挤奶工下装",
		"/actions/tailoring/foragers_top": "采摘者上衣",
		"/actions/tailoring/foragers_bottoms": "采摘者下装",
		"/actions/tailoring/lumberjacks_top": "伐木工上衣",
		"/actions/tailoring/lumberjacks_bottoms": "伐木工下装",
		"/actions/tailoring/cheesemakers_top": "奶酪师上衣",
		"/actions/tailoring/cheesemakers_bottoms": "奶酪师下装",
		"/actions/tailoring/crafters_top": "工匠上衣",
		"/actions/tailoring/crafters_bottoms": "工匠下装",
		"/actions/tailoring/tailors_top": "裁缝上衣",
		"/actions/tailoring/tailors_bottoms": "裁缝下装",
		"/actions/tailoring/chefs_top": "厨师上衣",
		"/actions/tailoring/chefs_bottoms": "厨师下装",
		"/actions/tailoring/brewers_top": "饮品师上衣",
		"/actions/tailoring/brewers_bottoms": "饮品师下装",
		"/actions/tailoring/alchemists_top": "炼金师上衣",
		"/actions/tailoring/alchemists_bottoms": "炼金师下装",
		"/actions/tailoring/enhancers_top": "强化师上衣",
		"/actions/tailoring/enhancers_bottoms": "强化师下装",
		"/actions/tailoring/revenant_tunic": "亡灵皮衣",
		"/actions/tailoring/griffin_tunic": "狮鹫皮衣",
		"/actions/tailoring/gluttonous_pouch": "贪食之袋",
		"/actions/tailoring/guzzling_pouch": "暴饮之囊",
		"/actions/tailoring/pathfinder_boots": "探路者靴",
		"/actions/tailoring/pathseeker_boots": "寻路者靴",
		"/actions/tailoring/marksman_bracers": "神射护腕",
		"/actions/tailoring/acrobatic_hood": "杂技师兜帽",
		"/actions/tailoring/magicians_hat": "魔术师帽",
		"/actions/tailoring/kraken_chaps": "克拉肯皮裤",
		"/actions/tailoring/royal_water_robe_bottoms": "皇家水系袍裙",
		"/actions/tailoring/royal_nature_robe_bottoms": "皇家自然系袍裙",
		"/actions/tailoring/royal_fire_robe_bottoms": "皇家火系袍裙",
		"/actions/tailoring/kraken_tunic": "克拉肯皮衣",
		"/actions/tailoring/royal_water_robe_top": "皇家水系袍服",
		"/actions/tailoring/royal_nature_robe_top": "皇家自然系袍服",
		"/actions/tailoring/royal_fire_robe_top": "皇家火系袍服",
		"/actions/tailoring/gatherer_cape_refined": "采集者披风 ★",
		"/actions/tailoring/artificer_cape_refined": "工匠披风 ★",
		"/actions/tailoring/culinary_cape_refined": "厨师披风 ★",
		"/actions/tailoring/chance_cape_refined": "机缘披风 ★",
		"/actions/tailoring/chimerical_quiver_refined": "奇幻箭袋 ★",
		"/actions/tailoring/sinister_cape_refined": "阴森披风 ★",
		"/actions/tailoring/enchanted_cloak_refined": "秘法披风 ★",
		"/actions/tailoring/pathfinder_boots_refined": "探路者靴 ★",
		"/actions/tailoring/pathseeker_boots_refined": "寻路者靴 ★",
		"/actions/tailoring/marksman_bracers_refined": "神射护腕 ★",
		"/actions/tailoring/acrobatic_hood_refined": "杂技师兜帽 ★",
		"/actions/tailoring/magicians_hat_refined": "魔术师帽 ★",
		"/actions/tailoring/kraken_chaps_refined": "克拉肯皮裤 ★",
		"/actions/tailoring/royal_water_robe_bottoms_refined": "皇家水系袍裙 ★",
		"/actions/tailoring/royal_nature_robe_bottoms_refined": "皇家自然系袍裙 ★",
		"/actions/tailoring/royal_fire_robe_bottoms_refined": "皇家火系袍裙 ★",
		"/actions/tailoring/kraken_tunic_refined": "克拉肯皮衣 ★",
		"/actions/tailoring/royal_water_robe_top_refined": "皇家水系袍服 ★",
		"/actions/tailoring/royal_nature_robe_top_refined": "皇家自然系袍服 ★",
		"/actions/tailoring/royal_fire_robe_top_refined": "皇家火系袍服 ★",
		"/actions/cooking/donut": "甜甜圈",
		"/actions/cooking/cupcake": "纸杯蛋糕",
		"/actions/cooking/gummy": "软糖",
		"/actions/cooking/yogurt": "酸奶",
		"/actions/cooking/blueberry_donut": "蓝莓甜甜圈",
		"/actions/cooking/blueberry_cake": "蓝莓蛋糕",
		"/actions/cooking/apple_gummy": "苹果软糖",
		"/actions/cooking/apple_yogurt": "苹果酸奶",
		"/actions/cooking/blackberry_donut": "黑莓甜甜圈",
		"/actions/cooking/blackberry_cake": "黑莓蛋糕",
		"/actions/cooking/orange_gummy": "橙子软糖",
		"/actions/cooking/orange_yogurt": "橙子酸奶",
		"/actions/cooking/basic_food_crate": "基础食物箱",
		"/actions/cooking/strawberry_donut": "草莓甜甜圈",
		"/actions/cooking/strawberry_cake": "草莓蛋糕",
		"/actions/cooking/plum_gummy": "李子软糖",
		"/actions/cooking/plum_yogurt": "李子酸奶",
		"/actions/cooking/mooberry_donut": "哞莓甜甜圈",
		"/actions/cooking/mooberry_cake": "哞莓蛋糕",
		"/actions/cooking/peach_gummy": "桃子软糖",
		"/actions/cooking/peach_yogurt": "桃子酸奶",
		"/actions/cooking/advanced_food_crate": "进阶食物箱",
		"/actions/cooking/marsberry_donut": "火星莓甜甜圈",
		"/actions/cooking/marsberry_cake": "火星莓蛋糕",
		"/actions/cooking/dragon_fruit_gummy": "火龙果软糖",
		"/actions/cooking/dragon_fruit_yogurt": "火龙果酸奶",
		"/actions/cooking/spaceberry_donut": "太空莓甜甜圈",
		"/actions/cooking/spaceberry_cake": "太空莓蛋糕",
		"/actions/cooking/star_fruit_gummy": "杨桃软糖",
		"/actions/cooking/star_fruit_yogurt": "杨桃酸奶",
		"/actions/cooking/expert_food_crate": "专家食物箱",
		"/actions/brewing/milking_tea": "挤奶茶",
		"/actions/brewing/stamina_coffee": "耐力咖啡",
		"/actions/brewing/foraging_tea": "采摘茶",
		"/actions/brewing/intelligence_coffee": "智力咖啡",
		"/actions/brewing/gathering_tea": "采集茶",
		"/actions/brewing/woodcutting_tea": "伐木茶",
		"/actions/brewing/cooking_tea": "烹饪茶",
		"/actions/brewing/defense_coffee": "防御咖啡",
		"/actions/brewing/brewing_tea": "冲泡茶",
		"/actions/brewing/attack_coffee": "攻击咖啡",
		"/actions/brewing/gourmet_tea": "美食茶",
		"/actions/brewing/alchemy_tea": "炼金茶",
		"/actions/brewing/enhancing_tea": "强化茶",
		"/actions/brewing/cheesesmithing_tea": "奶酪锻造茶",
		"/actions/brewing/melee_coffee": "近战咖啡",
		"/actions/brewing/basic_tea_crate": "基础茶叶箱",
		"/actions/brewing/basic_coffee_crate": "基础咖啡箱",
		"/actions/brewing/crafting_tea": "制作茶",
		"/actions/brewing/ranged_coffee": "远程咖啡",
		"/actions/brewing/wisdom_tea": "经验茶",
		"/actions/brewing/wisdom_coffee": "经验咖啡",
		"/actions/brewing/tailoring_tea": "缝纫茶",
		"/actions/brewing/magic_coffee": "魔法咖啡",
		"/actions/brewing/super_milking_tea": "超级挤奶茶",
		"/actions/brewing/super_stamina_coffee": "超级耐力咖啡",
		"/actions/brewing/super_foraging_tea": "超级采摘茶",
		"/actions/brewing/super_intelligence_coffee": "超级智力咖啡",
		"/actions/brewing/processing_tea": "加工茶",
		"/actions/brewing/lucky_coffee": "幸运咖啡",
		"/actions/brewing/super_woodcutting_tea": "超级伐木茶",
		"/actions/brewing/super_cooking_tea": "超级烹饪茶",
		"/actions/brewing/super_defense_coffee": "超级防御咖啡",
		"/actions/brewing/advanced_tea_crate": "进阶茶叶箱",
		"/actions/brewing/advanced_coffee_crate": "进阶咖啡箱",
		"/actions/brewing/super_brewing_tea": "超级冲泡茶",
		"/actions/brewing/ultra_milking_tea": "究极挤奶茶",
		"/actions/brewing/super_attack_coffee": "超级攻击咖啡",
		"/actions/brewing/ultra_stamina_coffee": "究极耐力咖啡",
		"/actions/brewing/efficiency_tea": "效率茶",
		"/actions/brewing/swiftness_coffee": "迅捷咖啡",
		"/actions/brewing/super_alchemy_tea": "超级炼金茶",
		"/actions/brewing/super_enhancing_tea": "超级强化茶",
		"/actions/brewing/ultra_foraging_tea": "究极采摘茶",
		"/actions/brewing/ultra_intelligence_coffee": "究极智力咖啡",
		"/actions/brewing/channeling_coffee": "吟唱咖啡",
		"/actions/brewing/super_cheesesmithing_tea": "超级奶酪锻造茶",
		"/actions/brewing/ultra_woodcutting_tea": "究极伐木茶",
		"/actions/brewing/super_melee_coffee": "超级近战咖啡",
		"/actions/brewing/artisan_tea": "工匠茶",
		"/actions/brewing/super_crafting_tea": "超级制作茶",
		"/actions/brewing/ultra_cooking_tea": "究极烹饪茶",
		"/actions/brewing/super_ranged_coffee": "超级远程咖啡",
		"/actions/brewing/ultra_defense_coffee": "究极防御咖啡",
		"/actions/brewing/catalytic_tea": "催化茶",
		"/actions/brewing/critical_coffee": "暴击咖啡",
		"/actions/brewing/super_tailoring_tea": "超级缝纫茶",
		"/actions/brewing/ultra_brewing_tea": "究极冲泡茶",
		"/actions/brewing/super_magic_coffee": "超级魔法咖啡",
		"/actions/brewing/ultra_attack_coffee": "究极攻击咖啡",
		"/actions/brewing/blessed_tea": "福气茶",
		"/actions/brewing/ultra_alchemy_tea": "究极炼金茶",
		"/actions/brewing/ultra_enhancing_tea": "究极强化茶",
		"/actions/brewing/expert_tea_crate": "专家茶叶箱",
		"/actions/brewing/expert_coffee_crate": "专家咖啡箱",
		"/actions/brewing/ultra_cheesesmithing_tea": "究极奶酪锻造茶",
		"/actions/brewing/ultra_melee_coffee": "究极近战咖啡",
		"/actions/brewing/ultra_crafting_tea": "究极制作茶",
		"/actions/brewing/ultra_ranged_coffee": "究极远程咖啡",
		"/actions/brewing/ultra_tailoring_tea": "究极缝纫茶",
		"/actions/brewing/ultra_magic_coffee": "究极魔法咖啡",
		"/actions/alchemy/coinify": "点金",
		"/actions/alchemy/transmute": "转化",
		"/actions/alchemy/decompose": "分解",
		"/actions/alchemy/unrefine": "解精炼",
		"/actions/enhancing/enhance": "强化",
		"/actions/combat/fly": "苍蝇",
		"/actions/combat/rat": "杰瑞",
		"/actions/combat/skunk": "臭鼬",
		"/actions/combat/porcupine": "豪猪",
		"/actions/combat/slimy": "史莱姆",
		"/actions/combat/smelly_planet": "臭臭星球",
		"/actions/combat/frog": "青蛙",
		"/actions/combat/snake": "蛇",
		"/actions/combat/swampy": "沼泽虫",
		"/actions/combat/alligator": "夏洛克",
		"/actions/combat/swamp_planet": "沼泽星球",
		"/actions/combat/sea_snail": "蜗牛",
		"/actions/combat/crab": "螃蟹",
		"/actions/combat/aquahorse": "水马",
		"/actions/combat/nom_nom": "咬咬鱼",
		"/actions/combat/turtle": "忍者龟",
		"/actions/combat/aqua_planet": "海洋星球",
		"/actions/combat/jungle_sprite": "丛林精灵",
		"/actions/combat/myconid": "蘑菇人",
		"/actions/combat/treant": "树人",
		"/actions/combat/centaur_archer": "半人马弓箭手",
		"/actions/combat/jungle_planet": "丛林星球",
		"/actions/combat/gobo_stabby": "刺刺",
		"/actions/combat/gobo_slashy": "砍砍",
		"/actions/combat/gobo_smashy": "锤锤",
		"/actions/combat/gobo_shooty": "咻咻",
		"/actions/combat/gobo_boomy": "轰轰",
		"/actions/combat/gobo_planet": "哥布林星球",
		"/actions/combat/eye": "独眼",
		"/actions/combat/eyes": "叠眼",
		"/actions/combat/veyes": "复眼",
		"/actions/combat/planet_of_the_eyes": "眼球星球",
		"/actions/combat/novice_sorcerer": "新手巫师",
		"/actions/combat/ice_sorcerer": "冰霜巫师",
		"/actions/combat/flame_sorcerer": "火焰巫师",
		"/actions/combat/elementalist": "元素法师",
		"/actions/combat/sorcerers_tower": "巫师之塔",
		"/actions/combat/gummy_bear": "软糖熊",
		"/actions/combat/panda": "熊猫",
		"/actions/combat/black_bear": "黑熊",
		"/actions/combat/grizzly_bear": "棕熊",
		"/actions/combat/polar_bear": "北极熊",
		"/actions/combat/bear_with_it": "熊熊星球",
		"/actions/combat/magnetic_golem": "磁力魔像",
		"/actions/combat/stalactite_golem": "钟乳石魔像",
		"/actions/combat/granite_golem": "花岗岩魔像",
		"/actions/combat/golem_cave": "魔像洞穴",
		"/actions/combat/zombie": "僵尸",
		"/actions/combat/vampire": "吸血鬼",
		"/actions/combat/werewolf": "狼人",
		"/actions/combat/twilight_zone": "暮光之地",
		"/actions/combat/abyssal_imp": "深渊小鬼",
		"/actions/combat/soul_hunter": "灵魂猎手",
		"/actions/combat/infernal_warlock": "地狱术士",
		"/actions/combat/infernal_abyss": "地狱深渊",
		"/actions/combat/chimerical_den": "奇幻洞穴",
		"/actions/combat/sinister_circus": "阴森马戏团",
		"/actions/combat/enchanted_fortress": "秘法要塞",
		"/actions/combat/pirate_cove": "海盗基地",
		"/actions/labyrinth/explore": "探索迷宫",
		"/actions/special/party_ready": "队伍准备就绪"
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
	* Generate alternate display names to handle ★ ↔ (R) refined item naming.
	* @param {string} name - Original display name
	* @returns {string[]} Array of alternate names to try (may be empty)
	*/
	function getRefinedNameVariants(name) {
		const variants = [];
		if (name.includes("★")) variants.push(name.replace(/\s*★/, " (R)"));
		if (name.includes("(R)")) variants.push(name.replace(/\s*\(R\)/, " ★"));
		return variants;
	}
	var zhActionNameToHrid = null;
	function getZhActionNameMap() {
		if (!zhActionNameToHrid) zhActionNameToHrid = new Map(Object.entries(action_names_zh_default).map(([hrid, zhName]) => [zhName, hrid]));
		return zhActionNameToHrid;
	}
	/**
	* Find an action HRID from its display name.
	* Tries exact match first, then ★ ↔ (R) variants for refined items.
	* @param {string} actionName - Display name of the action
	* @returns {string|null} Action HRID or null if not found
	*/
	function getActionHridFromName(actionName) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.actionDetailMap) return null;
		for (const [hrid, detail] of Object.entries(gameData.actionDetailMap)) if (detail.name === actionName) return hrid;
		const zhHrid = getZhActionNameMap().get(actionName);
		if (zhHrid && gameData.actionDetailMap[zhHrid]) return zhHrid;
		for (const variant of getRefinedNameVariants(actionName)) for (const [hrid, detail] of Object.entries(gameData.actionDetailMap)) if (detail.name === variant) return hrid;
		return null;
	}
	/**
	* Find an item HRID from its display name.
	* Tries exact match first, then ★ ↔ (R) variants for refined items.
	* @param {string} itemName - Display name of the item
	* @returns {string|null} Item HRID or null if not found
	*/
	function getItemHridFromName(itemName) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.itemDetailMap) return null;
		for (const [hrid, detail] of Object.entries(gameData.itemDetailMap)) if (detail.name === itemName) return hrid;
		for (const variant of getRefinedNameVariants(itemName)) for (const [hrid, detail] of Object.entries(gameData.itemDetailMap)) if (detail.name === variant) return hrid;
		return null;
	}
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
	//#region src/features/enhancement/tooltip-enhancement.js
	/**
	* Enhancement Tooltip Module
	*
	* Provides enhancement analysis for item tooltips.
	* Calculates optimal enhancement path and total costs for reaching current enhancement level.
	*
	* This module is part of Phase 2 of Option D (Hybrid Approach):
	* - Enhancement panel: Shows 20-level enhancement table
	* - Item tooltips: Shows optimal path to reach current enhancement level
	*/
	var toolashaConfig = src_core_config_js.default;
	var _costCache = /* @__PURE__ */ new Map();
	var _chainTimeCache = /* @__PURE__ */ new Map();
	src_api_marketplace_js.default.on(() => {
		_costCache.clear();
		_chainTimeCache.clear();
	});
	/**
	* Calculate optimal enhancement path for an item
	* Matches Enhancelator's algorithm exactly:
	* 1. Test all protection strategies for each level
	* 2. Pick minimum cost for each level (mixed strategies)
	* 3. Apply mirror optimization to mixed array
	*
	* @param {string} itemHrid - Item HRID (e.g., '/items/cheese_sword')
	* @param {number} currentEnhancementLevel - Current enhancement level (1-20)
	* @param {Object} config - Enhancement configuration from enhancement-config.js
	* @returns {Object|null} Enhancement analysis or null if not enhanceable
	*/
	function calculateEnhancementPath(itemHrid, currentEnhancementLevel, config) {
		if (!itemHrid || currentEnhancementLevel < 1 || currentEnhancementLevel > 20) return null;
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return null;
		const itemDetails = gameData.itemDetailMap[itemHrid];
		if (!itemDetails) return null;
		if (!itemDetails.enhancementCosts || itemDetails.enhancementCosts.length === 0) return null;
		const itemLevel = itemDetails.itemLevel || 1;
		const allResults = [];
		for (let targetLevel = 1; targetLevel <= currentEnhancementLevel; targetLevel++) {
			const resultsForLevel = [];
			const neverProtect = calculateCostForStrategy(itemHrid, targetLevel, 0, itemLevel, config);
			if (neverProtect) resultsForLevel.push({
				protectFrom: 0,
				...neverProtect
			});
			for (let protectFrom = 2; protectFrom <= targetLevel; protectFrom++) {
				const result = calculateCostForStrategy(itemHrid, targetLevel, protectFrom, itemLevel, config);
				if (result) resultsForLevel.push({
					protectFrom,
					...result
				});
			}
			allResults.push(resultsForLevel);
		}
		const targetCosts = new Array(currentEnhancementLevel + 1);
		const targetTimes = new Array(currentEnhancementLevel + 1);
		const targetAttempts = new Array(currentEnhancementLevel + 1);
		targetCosts[0] = toolashaConfig.isFeatureEnabled("enhanceSim_baseItemCraftingCost") ? Math.min(getProductionCost(itemHrid) || Infinity, (0, src_utils_market_data_js.getItemPrices)(itemHrid, 0)?.ask || Infinity) || getRealisticBaseItemPrice(itemHrid) : getRealisticBaseItemPrice(itemHrid);
		targetTimes[0] = 0;
		targetAttempts[0] = 0;
		for (let level = 1; level <= currentEnhancementLevel; level++) {
			const minResult = allResults[level - 1].reduce((best, curr) => curr.totalCost < best.totalCost ? curr : best);
			targetCosts[level] = minResult.totalCost;
			targetTimes[level] = minResult.totalTime;
			targetAttempts[level] = minResult.expectedAttempts;
		}
		const mirrorTargetCosts = targetCosts;
		const mirrorTargetTimes = targetTimes;
		const mirrorTargetAttempts = targetAttempts;
		const mirrorPrice = getRealisticBaseItemPrice("/items/philosophers_mirror");
		let mirrorStartLevel = null;
		if (mirrorPrice > 0) for (let level = 3; level <= currentEnhancementLevel; level++) {
			const traditionalCost = targetCosts[level];
			const mirrorCost = targetCosts[level - 2] + targetCosts[level - 1] + mirrorPrice;
			if (mirrorCost < traditionalCost) {
				if (mirrorStartLevel === null) mirrorStartLevel = level;
				targetCosts[level] = mirrorCost;
			}
		}
		targetCosts[currentEnhancementLevel];
		const optimalTraditional = allResults[currentEnhancementLevel - 1].reduce((best, curr) => curr.totalCost < best.totalCost ? curr : best);
		let optimalStrategy;
		if (mirrorStartLevel !== null) optimalStrategy = buildMirrorOptimizedResult(itemHrid, currentEnhancementLevel, mirrorStartLevel, targetCosts, itemHrid, mirrorTargetCosts, mirrorTargetTimes, mirrorTargetAttempts, optimalTraditional, mirrorPrice, config);
		else optimalStrategy = {
			protectFrom: optimalTraditional.protectFrom,
			label: optimalTraditional.protectFrom === 0 ? (0, src_core_i18n_js.t)("Never") : `+${optimalTraditional.protectFrom}`,
			expectedAttempts: optimalTraditional.expectedAttempts,
			totalTime: optimalTraditional.totalTime,
			baseCost: optimalTraditional.baseCost,
			baseAskPrice: optimalTraditional.baseAskPrice,
			baseBidPrice: optimalTraditional.baseBidPrice,
			baseAskIsCrafted: optimalTraditional.baseAskIsCrafted,
			baseBidIsCrafted: optimalTraditional.baseBidIsCrafted,
			materialCost: optimalTraditional.materialCost,
			materialBreakdown: optimalTraditional.materialBreakdown,
			protectionCost: optimalTraditional.protectionCost,
			protectionItemHrid: optimalTraditional.protectionItemHrid,
			protectionCount: optimalTraditional.protectionCount,
			protectionAskPrice: optimalTraditional.protectionAskPrice,
			protectionBidPrice: optimalTraditional.protectionBidPrice,
			totalCost: optimalTraditional.totalCost,
			usedMirror: false,
			mirrorStartLevel: null
		};
		let xpPerHour = null;
		let totalExpectedXP = null;
		try {
			const xpCalc = (0, src_utils_enhancement_calculator_js.calculateEnhancement)({
				enhancingLevel: config.enhancingLevel,
				houseLevel: config.houseLevel,
				toolBonus: config.toolBonus || 0,
				speedBonus: config.speedBonus || 0,
				itemLevel,
				targetLevel: currentEnhancementLevel,
				protectFrom: optimalStrategy.protectFrom,
				blessedTea: config.teas.blessed,
				guzzlingBonus: config.guzzlingBonus
			});
			if (xpCalc && xpCalc.visitCounts && xpCalc.totalTime > 0) {
				const wisdomDecimal = (config.experienceBonus || 0) / 100;
				const xpBaseLevel = itemDetails.level || itemDetails.equipmentDetail?.levelRequirements?.[0]?.level || 0;
				let totalXP = 0;
				for (let i = 0; i < currentEnhancementLevel; i++) {
					const visits = xpCalc.visitCounts[i];
					const successRate = xpCalc.successRates[i].actualRate / 100;
					const enhMult = i === 0 ? 1 : i + 1;
					const successXP = Math.floor(1.4 * (1 + wisdomDecimal) * enhMult * (10 + xpBaseLevel));
					const failXP = Math.floor(successXP * .1);
					totalXP += visits * (successRate * successXP + (1 - successRate) * failXP);
				}
				xpPerHour = Math.round(totalXP / xpCalc.totalTime * 3600);
				totalExpectedXP = Math.round(totalXP);
			}
		} catch {}
		return {
			itemHrid,
			targetLevel: currentEnhancementLevel,
			itemLevel,
			optimalStrategy,
			allStrategies: [optimalStrategy],
			xpPerHour,
			totalExpectedXP
		};
	}
	/**
	* Calculate cost for a single protection strategy to reach a target level
	* @private
	*/
	function calculateCostForStrategy(itemHrid, targetLevel, protectFrom, itemLevel, config) {
		try {
			const params = {
				enhancingLevel: config.enhancingLevel,
				houseLevel: config.houseLevel,
				toolBonus: config.toolBonus || 0,
				speedBonus: config.speedBonus || 0,
				itemLevel,
				targetLevel,
				protectFrom,
				blessedTea: config.teas.blessed,
				guzzlingBonus: config.guzzlingBonus
			};
			const result = (0, src_utils_enhancement_calculator_js.calculateEnhancement)(params);
			if (!result || typeof result.attempts !== "number" || typeof result.totalTime !== "number") {
				console.error("[Enhancement Tooltip] Invalid result from calculateEnhancement:", result);
				return null;
			}
			const costs = calculateTotalCost(itemHrid, targetLevel, protectFrom, config);
			return {
				expectedAttempts: result.attempts,
				totalTime: result.totalTime,
				...costs
			};
		} catch (error) {
			console.error("[Enhancement Tooltip] Strategy calculation error:", error);
			return null;
		}
	}
	/**
	* Build mirror-optimized result with Fibonacci quantities
	* @private
	*/
	function buildMirrorOptimizedResult(itemHrid, targetLevel, mirrorStartLevel, targetCosts, consumedItemHrid, mirrorTargetCosts, mirrorTargetTimes, mirrorTargetAttempts, optimalTraditional, mirrorPrice, _config) {
		src_core_data_manager_js.default.getInitClientData().itemDetailMap[itemHrid];
		const n = targetLevel - mirrorStartLevel;
		const numLowerTier = fib(n);
		const numUpperTier = fib(n + 1);
		const numMirrors = mirrorFib(n);
		const lowerTierLevel = mirrorStartLevel - 2;
		const upperTierLevel = mirrorStartLevel - 1;
		const costLowerTier = mirrorTargetCosts[lowerTierLevel];
		const costUpperTier = mirrorTargetCosts[upperTierLevel];
		const timeLowerTier = mirrorTargetTimes[lowerTierLevel];
		const timeUpperTier = mirrorTargetTimes[upperTierLevel];
		const attemptsLowerTier = mirrorTargetAttempts[lowerTierLevel];
		const attemptsUpperTier = mirrorTargetAttempts[upperTierLevel];
		const totalLowerTierCost = numLowerTier * costLowerTier;
		const totalUpperTierCost = numUpperTier * costUpperTier;
		const totalMirrorsCost = numMirrors * mirrorPrice;
		const totalTime = numLowerTier * timeLowerTier + numUpperTier * timeUpperTier;
		const totalAttempts = numLowerTier * attemptsLowerTier + numUpperTier * attemptsUpperTier;
		const consumedItems = [{
			level: lowerTierLevel,
			quantity: numLowerTier,
			costEach: costLowerTier,
			totalCost: totalLowerTierCost
		}, {
			level: upperTierLevel,
			quantity: numUpperTier,
			costEach: costUpperTier,
			totalCost: totalUpperTierCost
		}];
		return {
			protectFrom: optimalTraditional.protectFrom,
			label: optimalTraditional.protectFrom === 0 ? (0, src_core_i18n_js.t)("Never") : `From +${optimalTraditional.protectFrom}`,
			expectedAttempts: totalAttempts,
			totalTime,
			baseCost: 0,
			materialCost: 0,
			protectionCost: 0,
			protectionItemHrid: null,
			protectionCount: 0,
			consumedItemsCost: totalLowerTierCost + totalUpperTierCost,
			philosopherMirrorCost: totalMirrorsCost,
			totalCost: targetCosts[targetLevel],
			mirrorStartLevel,
			usedMirror: true,
			traditionalCost: optimalTraditional.totalCost,
			consumedItems,
			mirrorCount: numMirrors,
			consumedItemHrid
		};
	}
	/**
	* Calculate total cost for enhancement path
	* Matches original MWI Tools v25.0 cost calculation
	* @private
	*/
	function calculateTotalCost(itemHrid, targetLevel, protectFrom, config) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		const itemDetails = gameData.itemDetailMap[itemHrid];
		const itemLevel = itemDetails.itemLevel || 1;
		const pathResult = (0, src_utils_enhancement_calculator_js.calculateEnhancement)({
			enhancingLevel: config.enhancingLevel,
			houseLevel: config.houseLevel,
			toolBonus: config.toolBonus || 0,
			speedBonus: config.speedBonus || 0,
			itemLevel,
			targetLevel,
			protectFrom,
			blessedTea: config.teas.blessed,
			guzzlingBonus: config.guzzlingBonus
		});
		let perActionCost = 0;
		const materialBreakdown = [];
		if (itemDetails.enhancementCosts) for (const material of itemDetails.enhancementCosts) {
			const materialDetail = gameData.itemDetailMap[material.itemHrid];
			let price;
			let bidPrice = 0;
			if (material.itemHrid.startsWith("/items/trainee_")) {
				price = 25e4;
				bidPrice = 25e4;
			} else if (material.itemHrid === "/items/coin") {
				price = 1;
				bidPrice = 1;
			} else {
				const marketPrice = (0, src_utils_market_data_js.getItemPrices)(material.itemHrid, 0);
				if (marketPrice) {
					let ask = marketPrice.ask;
					let bid = marketPrice.bid;
					if (ask > 0 && bid < 0) bid = ask;
					if (bid > 0 && ask < 0) ask = bid;
					price = ask;
					bidPrice = bid;
				} else {
					price = getProductionCost(material.itemHrid, "ask") || materialDetail?.sellPrice || 0;
					bidPrice = getProductionCost(material.itemHrid, "bid") || materialDetail?.sellPrice || 0;
				}
			}
			perActionCost += price * material.count;
			const totalQuantity = material.count * pathResult.attempts;
			materialBreakdown.push({
				itemHrid: material.itemHrid,
				name: itemNameTranslator.getDisplayName(material.itemHrid),
				countPerAction: material.count,
				totalQuantity,
				unitPrice: price,
				bidPrice,
				totalCost: price * totalQuantity
			});
		}
		const materialCost = perActionCost * pathResult.attempts;
		let protectionCost = 0;
		let protectionItemHrid = null;
		let protectionCount = 0;
		let protectionAskPrice = 0;
		let protectionBidPrice = 0;
		if (protectFrom > 0 && pathResult.protectionCount > 0) {
			const protectionInfo = getCheapestProtectionPrice(itemHrid);
			if (protectionInfo.price > 0) {
				protectionCost = protectionInfo.price * pathResult.protectionCount;
				protectionItemHrid = protectionInfo.itemHrid;
				protectionCount = pathResult.protectionCount;
				protectionAskPrice = protectionInfo.price;
				const protPrices = (0, src_utils_market_data_js.getItemPrices)(protectionInfo.itemHrid, 0);
				protectionBidPrice = protPrices?.bid > 0 ? protPrices.bid : protectionInfo.price;
			}
		}
		const craftingCostAsk = getProductionCost(itemHrid, "ask");
		const craftingCostBid = getProductionCost(itemHrid, "bid");
		const baseItemPrices = (0, src_utils_market_data_js.getItemPrices)(itemHrid, 0);
		const marketAsk = baseItemPrices?.ask > 0 ? baseItemPrices.ask : 0;
		const marketBid = baseItemPrices?.bid > 0 ? baseItemPrices.bid : 0;
		const askIsCrafted = toolashaConfig.isFeatureEnabled("enhanceSim_baseItemCraftingCost") && craftingCostAsk > 0 && (marketAsk === 0 || craftingCostAsk < marketAsk);
		const baseAskPrice = askIsCrafted ? craftingCostAsk : marketAsk || getRealisticBaseItemPrice(itemHrid);
		const baseBidPrice = askIsCrafted ? craftingCostBid || craftingCostAsk : marketBid || getProductionCost(itemHrid, "bid") || getRealisticBaseItemPrice(itemHrid);
		const baseCost = baseAskPrice;
		return {
			baseCost,
			baseAskPrice,
			baseBidPrice,
			baseAskIsCrafted: askIsCrafted,
			baseBidIsCrafted: askIsCrafted,
			materialCost,
			materialBreakdown,
			protectionCost,
			protectionItemHrid,
			protectionCount,
			protectionAskPrice,
			protectionBidPrice,
			totalCost: baseCost + materialCost + protectionCost
		};
	}
	/**
	* Get realistic base item price with production cost fallback
	* Matches original MWI Tools v25.0 getRealisticBaseItemPrice logic
	* @private
	*/
	function getRealisticBaseItemPrice(itemHrid) {
		const marketPrice = (0, src_utils_market_data_js.getItemPrices)(itemHrid, 0);
		const ask = marketPrice?.ask > 0 ? marketPrice.ask : 0;
		const bid = marketPrice?.bid > 0 ? marketPrice.bid : 0;
		const productionCost = getProductionCost(itemHrid);
		if (ask > 0 && bid > 0) {
			if (ask / bid > 1.3) return Math.max(bid, productionCost);
			return ask;
		}
		if (ask > 0) {
			if (productionCost > 0 && ask / productionCost > 1.3) return productionCost;
			return Math.max(ask, productionCost);
		}
		if (bid > 0) return Math.max(bid, productionCost);
		return productionCost;
	}
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
			const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
			const activeDrinks = src_core_data_manager_js.default.getActionDrinkSlots(action.type);
			artisanBonus = (0, src_utils_tea_parser_js.parseArtisanBonus)(activeDrinks, itemDetailMap, drinkConcentration);
		} catch {}
		if (action.inputItems) for (const input of action.inputItems) {
			if (input.itemHrid === "/items/coin") {
				totalPrice += input.count * (1 - artisanBonus);
				continue;
			}
			let inputPrice = (0, src_utils_market_data_js.getItemPrice)(input.itemHrid, { mode }) || 0;
			if (inputPrice === 0) inputPrice = getProductionCost(input.itemHrid, mode);
			totalPrice += inputPrice * input.count * (1 - artisanBonus);
		}
		if (action.upgradeItemHrid) {
			const upgradeMarketPrice = (0, src_utils_market_data_js.getItemPrice)(action.upgradeItemHrid, { mode }) || 0;
			const upgradeCraftPrice = getProductionCost(action.upgradeItemHrid, mode);
			let upgradePrice;
			if (upgradeMarketPrice > 0 && upgradeCraftPrice > 0) upgradePrice = Math.min(upgradeMarketPrice, upgradeCraftPrice);
			else upgradePrice = upgradeMarketPrice || upgradeCraftPrice;
			totalPrice += upgradePrice;
		}
		return totalPrice / outputCount;
	}
	/**
	* Get cheapest protection item price
	* Tests: item itself, mirror of protection, and specific protection items
	* @private
	*/
	function getCheapestProtectionPrice(itemHrid) {
		const itemDetails = src_core_data_manager_js.default.getInitClientData().itemDetailMap[itemHrid];
		const protectionOptions = [itemHrid, "/items/mirror_of_protection"];
		if (itemDetails.protectionItemHrids && itemDetails.protectionItemHrids.length > 0) protectionOptions.push(...itemDetails.protectionItemHrids);
		let cheapestPrice = Infinity;
		let cheapestItemHrid = null;
		for (const protectionHrid of protectionOptions) {
			const price = getRealisticBaseItemPrice(protectionHrid);
			if (price > 0 && price < cheapestPrice) {
				cheapestPrice = price;
				cheapestItemHrid = protectionHrid;
			}
		}
		return {
			price: cheapestPrice === Infinity ? 0 : cheapestPrice,
			itemHrid: cheapestItemHrid
		};
	}
	/**
	* Fibonacci calculation for item quantities (from Enhancelator)
	* @private
	*/
	function fib(n) {
		let a = 1, b = 1;
		for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
		return b;
	}
	/**
	* Mirror Fibonacci calculation for mirror quantities (from Enhancelator)
	* @private
	*/
	function mirrorFib(n) {
		if (n === 0) return 1;
		let a = 1, b = 2;
		for (let i = 2; i <= n; i++) [a, b] = [b, a + b + 1];
		return b;
	}
	//#endregion
	//#region src/features/actions/panel-observer.js
	/**
	* Action Panel Observer
	*
	* Detects when action panels appear and enhances them with:
	* - Gathering profit calculations (Foraging, Woodcutting, Milking)
	* - Production profit calculations (Brewing, Cooking, Crafting, Tailoring, Cheesesmithing)
	* - Other action panel enhancements (future)
	*
	* Automatically filters out combat action panels.
	*/
	/**
	* Action types for gathering skills (3 skills)
	*/
	var GATHERING_TYPES$3 = [
		"/action_types/foraging",
		"/action_types/woodcutting",
		"/action_types/milking"
	];
	/**
	* Action types for production skills (5 skills)
	*/
	var PRODUCTION_TYPES$6 = [
		"/action_types/brewing",
		"/action_types/cooking",
		"/action_types/cheesesmithing",
		"/action_types/crafting",
		"/action_types/tailoring"
	];
	/**
	* Debounced update tracker for enhancement calculations
	* Maps itemHrid to timeout ID
	*/
	var updateTimeouts = /* @__PURE__ */ new Map();
	var timerRegistry$1 = (0, src_utils_timer_registry_js.createTimerRegistry)();
	/**
	* Event handler debounce timers
	*/
	var itemsUpdatedDebounceTimer = null;
	var consumablesUpdatedDebounceTimer = null;
	var DEBOUNCE_DELAY = 300;
	var observedEnhancingPanels = /* @__PURE__ */ new WeakSet();
	var enhancingPanelWatchers = [];
	var itemsUpdatedHandler = null;
	var consumablesUpdatedHandler = null;
	/**
	* Trigger debounced enhancement stats update
	* @param {HTMLElement} panel - Enhancing panel element
	* @param {string} itemHrid - Item HRID
	*/
	function triggerEnhancementUpdate(panel, itemHrid) {
		if (updateTimeouts.has(itemHrid)) clearTimeout(updateTimeouts.get(itemHrid));
		const timeoutId = setTimeout(async () => {
			await displayEnhancementStats(panel, itemHrid);
			updateTimeouts.delete(itemHrid);
		}, 500);
		timerRegistry$1.registerTimeout(timeoutId);
		updateTimeouts.set(itemHrid, timeoutId);
	}
	/**
	* CSS selectors for action panel detection
	*/
	var SELECTORS = {
		MODAL_CONTAINER: ".Modal_modalContainer__3B80m",
		REGULAR_PANEL: "div.SkillActionDetail_regularComponent__3oCgr",
		ENHANCING_PANEL: "div.SkillActionDetail_enhancingComponent__17bOx",
		EXP_GAIN: "div.SkillActionDetail_expGain__F5xHu",
		ACTION_NAME: "div.SkillActionDetail_name__3erHV",
		DROP_TABLE: "div.SkillActionDetail_dropTable__3ViVp",
		ENHANCING_OUTPUT: "div.SkillActionDetail_enhancingOutput__VPHbY",
		ITEM_NAME: "div.Item_name__2C42x"
	};
	/**
	* Initialize action panel observer
	* Sets up MutationObserver on document.body to watch for action panels
	*/
	function initActionPanelObserver() {
		setupMutationObserver();
		checkExistingEnhancingPanel();
		setupEnhancementRefreshListeners();
		actionFilter.initialize();
	}
	/**
	* Set up MutationObserver to detect action panels
	*/
	function setupMutationObserver() {
		src_core_dom_observer_js.default.onClass("ActionPanelObserver-Modal", "Modal_modalContainer__3B80m", (modal) => {
			const panel = modal.querySelector(SELECTORS.REGULAR_PANEL);
			if (panel) handleActionPanel(panel);
		}, {
			debounce: true,
			debounceDelay: 150
		}), src_core_dom_observer_js.default.onClass("ActionPanelObserver-Enhancing", "SkillActionDetail_enhancingComponent__17bOx", (panel) => {
			handleEnhancingPanel(panel);
			registerEnhancingPanelWatcher(panel);
		}, {
			debounce: true,
			debounceDelay: 150
		}), src_core_dom_observer_js.default.onClass("ActionPanelObserver-SkillAction", "SkillAction_skillAction__1esCp", (actionTile) => {
			handleSkillActionTile(actionTile);
		}, {
			debounce: true,
			debounceDelay: 150
		});
	}
	/**
	* Set up listeners for equipment and consumable changes
	* Refreshes enhancement calculator and production/gathering profit panels when gear or teas change
	*/
	function setupEnhancementRefreshListeners() {
		if (!itemsUpdatedHandler) {
			itemsUpdatedHandler = () => {
				clearTimeout(itemsUpdatedDebounceTimer);
				itemsUpdatedDebounceTimer = setTimeout(() => {
					refreshEnhancementCalculator();
					refreshProfitPanel();
				}, DEBOUNCE_DELAY);
			};
			src_core_data_manager_js.default.on("items_updated", itemsUpdatedHandler);
		}
		if (!consumablesUpdatedHandler) {
			consumablesUpdatedHandler = () => {
				clearTimeout(consumablesUpdatedDebounceTimer);
				consumablesUpdatedDebounceTimer = setTimeout(() => {
					refreshEnhancementCalculator();
					refreshProfitPanel();
				}, DEBOUNCE_DELAY);
			};
			src_core_data_manager_js.default.on("consumables_updated", consumablesUpdatedHandler);
		}
	}
	/**
	* Refresh enhancement calculator if panel is currently visible
	*/
	function refreshEnhancementCalculator() {
		const panel = document.querySelector(SELECTORS.ENHANCING_PANEL);
		if (!panel) return;
		const itemHrid = panel.dataset.mwiItemHrid;
		if (!itemHrid) return;
		triggerEnhancementUpdate(panel, itemHrid);
	}
	/**
	* Refresh production/gathering profit panel if currently visible in a modal
	*/
	function refreshProfitPanel() {
		const modal = document.querySelector(SELECTORS.MODAL_CONTAINER);
		if (!modal) return;
		const panel = modal.querySelector(SELECTORS.REGULAR_PANEL);
		if (!panel) return;
		handleActionPanel(panel);
	}
	/**
	* Check for existing enhancing panel on page load
	* The enhancing panel may already exist when MWI Tools initializes
	*/
	function checkExistingEnhancingPanel() {
		const checkTimeout = setTimeout(() => {
			const existingPanel = document.querySelector(SELECTORS.ENHANCING_PANEL);
			if (existingPanel) {
				handleEnhancingPanel(existingPanel);
				registerEnhancingPanelWatcher(existingPanel);
			}
		}, 500);
		timerRegistry$1.registerTimeout(checkTimeout);
	}
	/**
	* Register a mutation watcher for enhancing panels
	* @param {HTMLElement} panel - Enhancing panel element
	*/
	function registerEnhancingPanelWatcher(panel) {
		if (!panel || observedEnhancingPanels.has(panel)) return;
		const unwatch = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(panel, (mutations) => {
			handleEnhancingPanelMutations(panel, mutations);
		}, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeOldValue: true
		}, {
			debounce: true,
			debounceDelay: 150
		});
		observedEnhancingPanels.add(panel);
		enhancingPanelWatchers.push(unwatch);
	}
	/**
	* Handle mutations within an enhancing panel
	* @param {HTMLElement} panel - Enhancing panel element
	* @param {MutationRecord[]} mutations - Mutation records
	*/
	function handleEnhancingPanelMutations(panel, mutations) {
		for (const mutation of mutations) {
			if (mutation.type === "attributes") {
				if (mutation.attributeName === "value" && mutation.target.tagName === "INPUT") {
					const itemHrid = panel.dataset.mwiItemHrid;
					if (itemHrid) triggerEnhancementUpdate(panel, itemHrid);
				}
				if (mutation.attributeName === "href" && mutation.target.tagName === "use") handleEnhancingPanel(panel);
			}
			if (mutation.type === "childList") mutation.addedNodes.forEach((addedNode) => {
				if (addedNode.nodeType !== Node.ELEMENT_NODE) return;
				if (addedNode.classList?.contains("SkillActionDetail_enhancingOutput__VPHbY") || addedNode.querySelector && addedNode.querySelector(SELECTORS.ENHANCING_OUTPUT)) handleEnhancingPanel(panel);
				if (addedNode.classList?.contains("SkillActionDetail_item__2vEAz") || addedNode.classList?.contains("Item_name__2C42x")) handleEnhancingPanel(panel);
				if (addedNode.tagName === "INPUT" && (addedNode.type === "number" || addedNode.type === "text")) {
					const itemHrid = panel.dataset.mwiItemHrid;
					if (itemHrid) addInputListener(addedNode, panel, itemHrid);
				}
			});
		}
	}
	/**
	* Handle skill action tile appearance (the clickable tiles on gathering/production pages)
	* @param {HTMLElement} actionTile - Skill action tile element
	*/
	function handleSkillActionTile(actionTile) {
		if (!actionTile) return;
		const nameElement = actionTile.querySelector("[class*=\"name\"]");
		if (!nameElement) return;
		const actionName = nameElement.textContent.trim();
		if (!actionName) return;
		actionFilter.registerPanel(actionTile, actionName);
	}
	/**
	* Handle action panel appearance (gathering/crafting/production)
	* @param {HTMLElement} panel - Action panel element
	*/
	async function handleActionPanel(panel) {
		if (!panel) return;
		if (!panel.querySelector(SELECTORS.EXP_GAIN)) return;
		const actionNameElement = panel.querySelector(SELECTORS.ACTION_NAME);
		if (!actionNameElement) return;
		const actionHrid = getActionHridFromName((0, src_utils_dom_js.getOriginalText)(actionNameElement));
		if (!actionHrid) return;
		const actionDetail = src_core_data_manager_js.default.getInitClientData().actionDetailMap[actionHrid];
		if (!actionDetail) return;
		if (GATHERING_TYPES$3.includes(actionDetail.type)) {
			if (panel.querySelector(SELECTORS.DROP_TABLE)) await displayGatheringProfit(panel, actionHrid, SELECTORS.DROP_TABLE);
		}
		if (PRODUCTION_TYPES$6.includes(actionDetail.type)) await displayProductionProfit(panel, actionHrid, SELECTORS.DROP_TABLE);
	}
	/**
	* Find and cache the Current Action tab button
	* @param {HTMLElement} panel - Enhancing panel element
	* @returns {HTMLButtonElement|null} Current Action tab button or null
	*/
	function getCurrentActionTabButton(panel) {
		if (panel._cachedCurrentActionTab) return panel._cachedCurrentActionTab;
		let current = panel;
		let depth = 0;
		const maxDepth = 5;
		while (current && depth < maxDepth) {
			const currentActionTab = Array.from(current.querySelectorAll("button[role=\"tab\"]"))[0];
			if (currentActionTab) {
				panel._cachedCurrentActionTab = currentActionTab;
				return currentActionTab;
			}
			current = current.parentElement;
			depth++;
		}
		return null;
	}
	/**
	* Check if we're on the "Enhance" tab (not "Current Action" tab)
	* @param {HTMLElement} panel - Enhancing panel element
	* @returns {boolean} True if on Enhance tab
	*/
	function isEnhanceTabActive(panel) {
		const currentActionTab = getCurrentActionTabButton(panel);
		if (!currentActionTab) return true;
		if (currentActionTab.getAttribute("aria-selected") === "true") return false;
		if (currentActionTab.classList.contains("Mui-selected")) return false;
		if (currentActionTab.getAttribute("tabindex") === "0") return false;
		return true;
	}
	/**
	* Fill the Protect From Level input with the optimal value for the current item and target level.
	* @param {HTMLElement} panel
	* @param {string} itemHrid
	*/
	function autoFillProtectFrom(panel, itemHrid) {
		if (!getProtectionItemFromUI(panel)) return;
		const targetInput = Array.from(panel.querySelectorAll("*")).filter((el) => el.textContent.trim() === "Target Level" && el.children.length === 0)[0]?.parentElement?.querySelector("input[type=\"number\"], input[type=\"text\"]");
		const targetLevel = targetInput ? parseInt(targetInput.value, 10) : 0;
		if (!targetLevel || targetLevel < 1) return;
		const pathResult = calculateEnhancementPath(itemHrid, targetLevel, (0, src_utils_enhancement_config_js.getEnhancingParams)());
		if (!pathResult?.optimalStrategy) return;
		const optimalProtectFrom = pathResult.optimalStrategy.protectFrom;
		const protectInput = Array.from(panel.querySelectorAll("*")).filter((el) => el.textContent.trim() === "Protect From Level" && el.children.length === 0)[0]?.parentElement?.querySelector("input[type=\"number\"], input[type=\"text\"]");
		if (!protectInput) return;
		const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
		if (protectInput.value === optimalProtectFrom.toString()) return;
		nativeSetter.call(protectInput, optimalProtectFrom.toString());
		protectInput.dispatchEvent(new Event("input", { bubbles: true }));
		protectInput.dispatchEvent(new Event("change", { bubbles: true }));
	}
	/**
	* Watch the protection item slot for changes and auto-fill protect-from level.
	* @param {HTMLElement} panel
	* @param {string} itemHrid
	*/
	function setupProtectionSlotObserver(panel, itemHrid) {
		if (panel.dataset.mwiProtectObserverAdded) return;
		panel.dataset.mwiProtectObserverAdded = "true";
		const protectionContainer = panel.querySelector("[class*=\"protectionItemInputContainer\"]");
		if (!protectionContainer) return;
		let debounceTimer = null;
		const unwatch = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(protectionContainer, () => {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				if (src_core_config_js.default.getSetting("enhanceSim_autoProtectFrom")) autoFillProtectFrom(panel, itemHrid);
			}, 300);
		}, {
			childList: true,
			subtree: true,
			attributes: true
		});
		enhancingPanelWatchers.push(unwatch);
	}
	/**
	* Handle enhancing panel appearance
	* @param {HTMLElement} panel - Enhancing panel element
	*/
	async function handleEnhancingPanel(panel) {
		if (!panel) return;
		if (!panel.dataset.mwiTabListenersAdded) {
			setupTabClickListeners(panel);
			panel.dataset.mwiTabListenersAdded = "true";
		}
		if (!isEnhanceTabActive(panel)) {
			const existingDisplay = panel.querySelector("#mwi-enhancement-stats");
			if (existingDisplay) existingDisplay.remove();
			return;
		}
		const outputsSection = panel.querySelector(SELECTORS.ENHANCING_OUTPUT);
		if (!outputsSection) return;
		if (!outputsSection.querySelector("svg[role=\"img\"], img")) {
			const existingDisplay = panel.querySelector("#mwi-enhancement-stats");
			if (existingDisplay) existingDisplay.remove();
			return;
		}
		const itemNameElement = outputsSection.querySelector(SELECTORS.ITEM_NAME);
		if (!itemNameElement) return;
		const itemName = itemNameElement.textContent.trim();
		if (!itemName) return;
		const gameData = src_core_data_manager_js.default.getInitClientData();
		const itemHrid = getItemHridFromName(itemName);
		if (!itemHrid) return;
		if (!gameData.itemDetailMap[itemHrid]) return;
		panel.dataset.mwiItemHrid = itemHrid;
		if (panel.dataset.mwiAutoTargetFilledFor !== itemHrid) {
			const autoTargetLevel = src_core_config_js.default.getSettingValue("enhanceSim_autoTargetLevel", 0);
			if (autoTargetLevel >= 1 && autoTargetLevel <= 20) {
				const labels = Array.from(panel.querySelectorAll("*")).filter((el) => el.textContent.trim() === "Target Level" && el.children.length === 0);
				if (labels.length > 0) {
					const input = labels[0].parentElement?.querySelector("input[type=\"number\"], input[type=\"text\"]");
					if (input) {
						Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set.call(input, autoTargetLevel.toString());
						input.dispatchEvent(new Event("input", { bubbles: true }));
						input.dispatchEvent(new Event("change", { bubbles: true }));
					}
				}
			}
			panel.dataset.mwiAutoTargetFilledFor = itemHrid;
		}
		setupProtectionSlotObserver(panel, itemHrid);
		if (src_core_config_js.default.getSetting("enhanceSim_autoProtectFrom")) autoFillProtectFrom(panel, itemHrid);
		if (!isEnhanceTabActive(panel)) return;
		await displayEnhancementStats(panel, itemHrid);
		setupInputObservers(panel, itemHrid);
		if (!panel.dataset.mwiAutoProtectTargetListenerAdded) {
			panel.dataset.mwiAutoProtectTargetListenerAdded = "true";
			const targetInput = Array.from(panel.querySelectorAll("*")).filter((el) => el.textContent.trim() === "Target Level" && el.children.length === 0)[0]?.parentElement?.querySelector("input[type=\"number\"], input[type=\"text\"]");
			if (targetInput) targetInput.addEventListener("change", () => {
				if (src_core_config_js.default.getSetting("enhanceSim_autoProtectFrom")) autoFillProtectFrom(panel, panel.dataset.mwiItemHrid);
			});
		}
	}
	/**
	* Set up click listeners on tab buttons to show/hide calculator
	* @param {HTMLElement} panel - Enhancing panel element
	*/
	function setupTabClickListeners(panel) {
		let current = panel;
		let depth = 0;
		const maxDepth = 5;
		let tabButtons = [];
		while (current && depth < maxDepth) {
			const buttons = Array.from(current.querySelectorAll("button[role=\"tab\"]"));
			if (buttons.length >= 2) {
				tabButtons = buttons;
				break;
			}
			current = current.parentElement;
			depth++;
		}
		if (tabButtons.length !== 2) return;
		tabButtons.forEach((button) => {
			button.addEventListener("click", async () => {
				const tabTimeout = setTimeout(async () => {
					const isEnhanceActive = isEnhanceTabActive(panel);
					const existingDisplay = panel.querySelector("#mwi-enhancement-stats");
					if (!isEnhanceActive) {
						if (existingDisplay) existingDisplay.remove();
					} else {
						const itemHrid = panel.dataset.mwiItemHrid;
						if (itemHrid && !existingDisplay) await displayEnhancementStats(panel, itemHrid);
					}
				}, 100);
				timerRegistry$1.registerTimeout(tabTimeout);
			});
		});
	}
	/**
	* Add input listener to a single input element
	* @param {HTMLInputElement} input - Input element
	* @param {HTMLElement} panel - Enhancing panel element
	* @param {string} itemHrid - Item HRID
	*/
	function addInputListener(input, panel, itemHrid) {
		const handleInputChange = () => {
			triggerEnhancementUpdate(panel, itemHrid);
		};
		input.addEventListener("input", handleInputChange);
		input.addEventListener("change", handleInputChange);
	}
	/**
	* Set up observers for Target Level and Protect From Level inputs
	* Re-calculates enhancement stats when user changes these values
	* @param {HTMLElement} panel - Enhancing panel element
	* @param {string} itemHrid - Item HRID
	*/
	function setupInputObservers(panel, itemHrid) {
		panel.querySelectorAll("input[type=\"number\"], input[type=\"text\"]").forEach((input) => {
			addInputListener(input, panel, itemHrid);
		});
	}
	//#endregion
	//#region src/core/tooltip-observer.js
	/**
	* Tooltip Observer
	* Centralized observer for tooltip/popper appearances
	* Any feature can subscribe to be notified when tooltips appear
	*/
	var TooltipObserver = class {
		constructor() {
			this.subscribers = /* @__PURE__ */ new Map();
			this.unregisterObserver = null;
			this.isInitialized = false;
		}
		/**
		* Initialize the observer (call once)
		*/
		initialize() {
			if (this.isInitialized) return;
			this.isInitialized = true;
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("TooltipObserver", ["MuiPopper", "MuiTooltip"], (element) => {
				this.notifySubscribers(element);
			});
		}
		/**
		* Subscribe to tooltip appearance events
		* @param {string} name - Unique subscriber name
		* @param {Function} callback - Function(element) to call when tooltip appears
		*/
		subscribe(name, callback) {
			this.subscribers.set(name, callback);
			if (!this.isInitialized) this.initialize();
		}
		/**
		* Unsubscribe from tooltip events
		* @param {string} name - Subscriber name
		*/
		unsubscribe(name) {
			this.subscribers.delete(name);
		}
		/**
		* Notify all subscribers that a tooltip appeared
		* @param {Element} element - The tooltip/popper element
		* @private
		*/
		notifySubscribers(element) {
			const removalObserver = new MutationObserver((mutations) => {
				for (const mutation of mutations) for (const removedNode of mutation.removedNodes) if (removedNode === element) {
					for (const [name, callback] of this.subscribers.entries()) try {
						callback(element, "closed");
					} catch (error) {
						console.error(`[TooltipObserver] Error in subscriber "${name}" (close):`, error);
					}
					removalObserver.disconnect();
					return;
				}
			});
			if (element.parentNode) removalObserver.observe(element.parentNode, { childList: true });
			for (const [name, callback] of this.subscribers.entries()) try {
				callback(element, "opened");
			} catch (error) {
				console.error(`[TooltipObserver] Error in subscriber "${name}" (open):`, error);
			}
		}
		/**
		* Cleanup and disable
		*/
		disable() {
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			this.subscribers.clear();
			this.isInitialized = false;
		}
	};
	var tooltipObserver = new TooltipObserver();
	//#endregion
	//#region src/features/enhancement/enhancement-xp.js
	/**
	* Enhancement XP Calculations
	* Based on Ultimate Enhancement Tracker formulas
	*/
	/**
	* Get base item level from item HRID
	* @param {string} itemHrid - Item HRID
	* @returns {number} Base item level
	*/
	function getBaseItemLevel(itemHrid) {
		try {
			const itemData = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap?.[itemHrid];
			if (itemData?.itemLevel) return itemData.itemLevel;
			return 0;
		} catch {
			return 0;
		}
	}
	/**
	* Calculate enhancing action time from the game's buff maps
	* Reads the pre-computed action_speed flatBoost values from all buff sources
	* and adds level advantage, matching the game's actual speed calculation
	* @param {string} itemHrid - Item HRID being enhanced
	* @returns {number} Per-action time in seconds
	*/
	function getEnhancingActionTime(itemHrid) {
		try {
			const charData = src_core_data_manager_js.default.characterData;
			if (!charData) return 12;
			const actionDetails = src_core_data_manager_js.default.getActionDetails("/actions/enhancing/enhance");
			const baseTime = actionDetails?.baseTimeCost ? actionDetails.baseTimeCost / 1e9 : 12;
			const baseLevel = (charData.characterSkills?.find((s) => s.skillHrid === "/skills/enhancing"))?.level || 1;
			let teaLevelBonus = 0;
			const consumableBuffs = charData.consumableActionTypeBuffsMap?.["/action_types/enhancing"];
			if (Array.isArray(consumableBuffs)) {
				for (const buff of consumableBuffs) if (buff.typeHrid === "/buff_types/enhancing_level") teaLevelBonus = buff.flatBoost || 0;
			}
			let totalSpeedBuff = 0;
			const buffMaps = [
				charData.equipmentActionTypeBuffsMap,
				charData.houseActionTypeBuffsMap,
				charData.guildActionTypeBuffsMap,
				charData.communityActionTypeBuffsMap,
				charData.consumableActionTypeBuffsMap
			];
			for (const buffMap of buffMaps) {
				const enhancingBuffs = buffMap?.["/action_types/enhancing"];
				if (!Array.isArray(enhancingBuffs)) continue;
				for (const buff of enhancingBuffs) if (buff.typeHrid === "/buff_types/action_speed") totalSpeedBuff += buff.flatBoost || 0;
			}
			totalSpeedBuff += src_core_data_manager_js.default.getPersonalBuffFlatBoost("/action_types/enhancing", "/buff_types/action_speed");
			const effectiveLevel = baseLevel + teaLevelBonus;
			const itemLevel = getBaseItemLevel(itemHrid);
			if (effectiveLevel > itemLevel) totalSpeedBuff += (effectiveLevel - itemLevel) / 100;
			return Math.max(src_utils_profit_constants_js.MIN_ACTION_TIME_SECONDS, baseTime / (1 + totalSpeedBuff));
		} catch {
			return 12;
		}
	}
	/**
	* Calculate enhancement predictions using character stats
	* @param {string} itemHrid - Item HRID being enhanced
	* @param {number} startLevel - Starting enhancement level
	* @param {number} targetLevel - Target enhancement level
	* @param {number} protectFrom - Level to start using protection
	* @returns {Object|null} Prediction data or null if cannot calculate
	*/
	function calculateEnhancementPredictions(itemHrid, startLevel, targetLevel, protectFrom) {
		try {
			const itemLevel = getBaseItemLevel(itemHrid);
			const params = (0, src_utils_enhancement_config_js.getEnhancingParams)();
			const hasBlessed = params.teas?.blessed || false;
			const result = (0, src_utils_enhancement_calculator_js.calculateEnhancement)({
				enhancingLevel: params.enhancingLevel,
				houseLevel: params.houseLevel,
				toolBonus: params.toolBonus,
				speedBonus: params.speedBonus,
				itemLevel,
				targetLevel,
				startLevel,
				protectFrom,
				blessedTea: hasBlessed,
				guzzlingBonus: params.guzzlingBonus
			});
			if (!result) return null;
			const perActionTime = getEnhancingActionTime(itemHrid);
			return {
				expectedAttempts: Math.round(result.attemptsRounded),
				expectedProtections: Math.round(result.protectionCount),
				expectedTime: perActionTime * result.attempts,
				perActionTime,
				successMultiplier: result.successMultiplier
			};
		} catch {
			return null;
		}
	}
	//#endregion
	//#region src/features/actions/action-time-display.js
	/**
	* Action Time Display Module
	*
	* Displays estimated completion time for queued actions.
	* Uses WebSocket data from data-manager instead of DOM scraping.
	*
	* Features:
	* - Appends stats to game's action name (queue count, time/action, actions/hr)
	* - Shows time estimates below (total time → completion time)
	* - Updates automatically on action changes
	* - Queue tooltip enhancement (time for each action + total)
	*/
	/**
	* Format a completion Date as a clock string, respecting user's time/date format settings.
	* @param {Date} completionTime
	* @param {boolean} includeDate - Whether to include the date portion
	* @returns {string}
	*/
	function formatCompletionTime(completionTime, includeDate) {
		return (0, src_utils_formatters_js.formatDateTime)(completionTime, {
			includeDate,
			includeTime: true,
			includeSeconds: true
		});
	}
	/**
	* ActionTimeDisplay class manages the time display panel and queue tooltips
	*/
	var ActionTimeDisplay = class {
		constructor() {
			this.displayElement = null;
			this.profitElement = null;
			this.isInitialized = false;
			this.updateTimer = null;
			this.unregisterQueueObserver = null;
			this.actionNameObserver = null;
			this.queueMenuObserver = null;
			this.unregisterActionNameObserver = null;
			this.characterInitHandler = null;
			this.activeProfitCalculationId = null;
			this.activeBarProfitId = null;
			this.waitForPanelTimeout = null;
			this.retryUpdateTimeout = null;
			this.settingChangeHandlers = [];
			this.cleanupRegistry = (0, src_utils_cleanup_registry_js.createCleanupRegistry)();
		}
		/**
		* Initialize the action time display
		*/
		async initialize() {
			if (this.isInitialized) return;
			await this.migrateDisplayMode();
			if (!src_core_config_js.default.getSetting("actionBar_enabled")) return;
			for (const key of [
				"actionBar_enabled",
				"actionBar_compactWidth",
				"actionBar_showQueueCount",
				"actionBar_showActionDuration",
				"actionBar_showActionsPerHour",
				"actionBar_showTimeRemaining",
				"profitCalc_pricingMode"
			]) {
				const fn = (newValue) => {
					if (key === "actionBar_enabled" && !newValue) {
						this.disable();
						return;
					}
					this.updateDisplay();
				};
				src_core_config_js.default.onSettingChange(key, fn);
				this.settingChangeHandlers.push({
					key,
					fn
				});
			}
			this.cleanupRegistry.registerCleanup(() => {
				this.settingChangeHandlers.forEach(({ key, fn }) => src_core_config_js.default.offSettingChange(key, fn));
				this.settingChangeHandlers = [];
			});
			if (!this.characterInitHandler) {
				this.characterInitHandler = () => {
					this.handleCharacterSwitch();
				};
				src_core_data_manager_js.default.on("character_initialized", this.characterInitHandler);
				this.cleanupRegistry.registerCleanup(() => {
					if (this.characterInitHandler) {
						src_core_data_manager_js.default.off("character_initialized", this.characterInitHandler);
						this.characterInitHandler = null;
					}
				});
			}
			if (!this.actionsUpdatedHandler) {
				this.actionsUpdatedHandler = () => {
					this.updateDisplay();
				};
				src_core_data_manager_js.default.on("actions_updated", this.actionsUpdatedHandler);
				this.cleanupRegistry.registerCleanup(() => {
					if (this.actionsUpdatedHandler) {
						src_core_data_manager_js.default.off("actions_updated", this.actionsUpdatedHandler);
						this.actionsUpdatedHandler = null;
					}
				});
			}
			this.cleanupRegistry.registerCleanup(() => {
				const actionNameElement = document.querySelector("div[class*=\"Header_actionName\"]");
				if (actionNameElement) this.clearAppendedStats(actionNameElement);
			});
			this.cleanupRegistry.registerCleanup(() => {
				if (this.waitForPanelTimeout) {
					clearTimeout(this.waitForPanelTimeout);
					this.waitForPanelTimeout = null;
				}
			});
			this.cleanupRegistry.registerCleanup(() => {
				if (this.retryUpdateTimeout) {
					clearTimeout(this.retryUpdateTimeout);
					this.retryUpdateTimeout = null;
				}
			});
			this.cleanupRegistry.registerCleanup(() => {
				if (this.updateTimer) {
					clearInterval(this.updateTimer);
					this.updateTimer = null;
				}
			});
			this.cleanupRegistry.registerCleanup(() => {
				if (this.actionNameObserver) {
					this.actionNameObserver();
					this.actionNameObserver = null;
				}
			});
			this.cleanupRegistry.registerCleanup(() => {
				if (this.queueMenuObserver) {
					this.queueMenuObserver();
					this.queueMenuObserver = null;
				}
			});
			this.cleanupRegistry.registerCleanup(() => {
				if (this.unregisterActionNameObserver) {
					this.unregisterActionNameObserver();
					this.unregisterActionNameObserver = null;
				}
			});
			this.waitForActionPanel();
			this.initializeActionNameWatcher();
			this.initializeQueueObserver();
			this.initializeQueueTooltipObserver();
			this.isInitialized = true;
		}
		/**
		* Migrate old totalActionTime display mode to granular toggle settings
		*/
		async migrateDisplayMode() {
			const oldMode = src_core_config_js.default.getSettingValue("totalActionTime", null);
			const alreadyMigrated = src_core_config_js.default.getSettingValue("actionBar_enabled", null);
			if (oldMode === null || alreadyMigrated !== null) return;
			if (oldMode === "off") src_core_config_js.default.setSetting("actionBar_enabled", false);
			else if (oldMode === "minimal") {
				src_core_config_js.default.setSetting("actionBar_showActionDuration", false);
				src_core_config_js.default.setSetting("actionBar_showActionsPerHour", false);
			} else if (oldMode === "compact") src_core_config_js.default.setSetting("actionBar_compactWidth", true);
		}
		/**
		* Initialize observer for queue tooltip
		*/
		initializeQueueObserver() {
			this.unregisterQueueObserver = src_core_dom_observer_js.default.onClass("ActionTimeDisplay-Queue", "QueuedActions_queuedActionsEditMenu", (queueMenu) => {
				this.injectQueueTimes(queueMenu);
				this.setupQueueMenuObserver(queueMenu);
			}, {
				debounce: true,
				debounceDelay: 150
			});
			this.cleanupRegistry.registerCleanup(() => {
				if (this.unregisterQueueObserver) {
					this.unregisterQueueObserver();
					this.unregisterQueueObserver = null;
				}
			});
		}
		/**
		* Initialize observer for queue hover tooltip (the MUI Tooltip that appears on hover over "+N Queued Actions")
		*/
		initializeQueueTooltipObserver() {
			tooltipObserver.subscribe("queue-tooltip-timing", (element, eventType) => {
				if (eventType !== "opened") return;
				const tooltipContent = element.querySelector("[class*=\"QueuedActions_queuedActionsTooltip\"]");
				if (!tooltipContent) return;
				this.injectQueueTimesTooltip(tooltipContent);
			});
			this.cleanupRegistry.registerCleanup(() => {
				tooltipObserver.unsubscribe("queue-tooltip-timing");
			});
		}
		/**
		* Inject time display into queue hover tooltip
		* Reuses matchActionFromDiv and calculation logic from injectQueueTimes,
		* but simplified (no mutation observer, no async profit).
		* @param {HTMLElement} tooltipContent - The QueuedActions_queuedActionsTooltip container
		*/
		injectQueueTimesTooltip(tooltipContent) {
			try {
				const currentActions = src_core_data_manager_js.default.getCurrentActions();
				if (!currentActions || currentActions.length === 0) return;
				const actionDivs = tooltipContent.querySelectorAll("[class^=\"QueuedActions_action__\"]");
				if (actionDivs.length === 0) return;
				if (tooltipContent.querySelector(".mwi-queue-action-time")) return;
				const inventoryLookup = this.buildInventoryLookup(src_core_data_manager_js.default.getInventory());
				let accumulatedTime = 0;
				let hasInfinite = false;
				const currentActionTime = this.calculateCurrentActionTime(currentActions, inventoryLookup);
				if (currentActionTime) {
					accumulatedTime += currentActionTime.totalTime;
					if (currentActionTime.hasInfinite) hasInfinite = true;
				}
				const usedActionIds = /* @__PURE__ */ new Set();
				if (currentActionTime?.actionId) usedActionIds.add(currentActionTime.actionId);
				for (const actionDiv of actionDivs) {
					const actionObj = this.matchActionFromDiv(actionDiv, currentActions, usedActionIds);
					if (!actionObj) {
						this.appendTimeToActionDiv(actionDiv, (0, src_core_i18n_js.t)("[Unknown action]"));
						continue;
					}
					usedActionIds.add(actionObj.id);
					const actionDetails = src_core_data_manager_js.default.getActionDetails(actionObj.actionHrid);
					if (!actionDetails) continue;
					const result = this.calculateSingleQueueActionTime(actionObj, actionDetails, inventoryLookup);
					if (result.isTrulyInfinite) hasInfinite = true;
					else accumulatedTime += result.actionTimeSeconds;
					let timeText;
					if (result.isTrulyInfinite) timeText = "[∞]";
					else if (result.isInfinite && result.materialLimit !== null) timeText = `[${(0, src_utils_formatters_js.timeReadable)(result.totalTime)} · ${result.limitLabel}: ${this.formatLargeNumber(result.materialLimit)}]`;
					else timeText = `[${(0, src_utils_formatters_js.timeReadable)(result.totalTime)}]`;
					if (!hasInfinite && !result.isTrulyInfinite) {
						const completionDate = /* @__PURE__ */ new Date();
						completionDate.setSeconds(completionDate.getSeconds() + accumulatedTime);
						const isToday = completionDate.toDateString() === (/* @__PURE__ */ new Date()).toDateString();
						timeText += ` Complete at ${formatCompletionTime(completionDate, !isToday)}`;
					}
					this.appendTimeToActionDiv(actionDiv, timeText);
				}
				const actionsContainer = tooltipContent.querySelector("[class*=\"QueuedActions_actions\"]");
				if (actionsContainer) {
					const totalDiv = document.createElement("div");
					totalDiv.className = "mwi-queue-tooltip-total";
					totalDiv.style.cssText = `
                    color: ${src_core_config_js.default.COLOR_TOOLTIP_INFO};
                    font-weight: bold;
                    margin-top: 8px;
                    padding-top: 6px;
                    border-top: 1px solid rgba(0, 0, 0, 0.2);
                    text-align: center;
                    font-size: 0.85em;
                `;
					let totalText;
					if (hasInfinite) totalText = accumulatedTime > 0 ? `Total: ${(0, src_utils_formatters_js.timeReadable)(accumulatedTime)} + [∞]` : "Total: [∞]";
					else totalText = `Total: ${(0, src_utils_formatters_js.timeReadable)(accumulatedTime)}`;
					totalDiv.textContent = totalText;
					actionsContainer.appendChild(totalDiv);
				}
			} catch (error) {
				console.error("[Action Time Display] Error injecting queue tooltip times:", error);
			}
		}
		/**
		* Append a time display div to an action div in the queue tooltip
		* @param {HTMLElement} actionDiv - The action container div
		* @param {string} text - Time text to display
		*/
		appendTimeToActionDiv(actionDiv, text) {
			const timeDiv = document.createElement("div");
			timeDiv.className = "mwi-queue-action-time";
			timeDiv.style.cssText = `
            color: ${src_core_config_js.default.COLOR_TOOLTIP_INFO};
            font-size: 0.85em;
            margin-top: 2px;
        `;
			timeDiv.textContent = text;
			const actionTextContainer = actionDiv.querySelector("[class*=\"QueuedActions_actionText\"]");
			if (actionTextContainer) actionTextContainer.appendChild(timeDiv);
			else actionDiv.appendChild(timeDiv);
		}
		/**
		* Calculate time for the currently active action (for total time calculation)
		* @param {Array} currentActions - All current actions from dataManager
		* @param {Object} inventoryLookup - Inventory lookup map
		* @returns {Object|null} { totalTime, hasInfinite, actionId } or null
		*/
		calculateCurrentActionTime(currentActions, inventoryLookup) {
			const actionNameElement = document.querySelector("div[class*=\"Header_actionName\"]");
			if (!actionNameElement || !actionNameElement.textContent) return null;
			const actionNameText = this.getCleanActionName(actionNameElement);
			const sorted = [...currentActions].sort((a, b) => a.ordinal - b.ordinal);
			const currentAction = this.matchCurrentActionFromText(sorted.slice(0, 1), actionNameText);
			if (!currentAction) return null;
			const actionDetails = src_core_data_manager_js.default.getActionDetails(currentAction.actionHrid);
			if (!actionDetails) return null;
			const result = this.calculateSingleQueueActionTime(currentAction, actionDetails, inventoryLookup);
			return {
				totalTime: result.actionTimeSeconds,
				hasInfinite: result.isTrulyInfinite,
				actionId: currentAction.id
			};
		}
		/**
		* Calculate time for a single queued action
		* @param {Object} actionObj - Action object from dataManager cache
		* @param {Object} actionDetails - Action details from dataManager
		* @param {Object} inventoryLookup - Inventory lookup map
		* @returns {Object} { totalTime, actionTimeSeconds, count, baseActionsNeeded, isTrulyInfinite, isInfinite, materialLimit, limitType, limitLabel, isEnhancing }
		*/
		calculateSingleQueueActionTime(actionObj, actionDetails, inventoryLookup) {
			const isEnhancing = actionDetails.type === "/action_types/enhancing";
			const isInfinite = !actionObj.hasMaxCount || actionObj.actionHrid.includes("/combat/");
			let totalTime = 0;
			let actionTimeSeconds = 0;
			let count = 0;
			let baseActionsNeeded = 0;
			let isTrulyInfinite = false;
			let materialLimit = null;
			let limitType = null;
			let limitLabel = "";
			if (isEnhancing) {
				const enhancingTime = this.calculateEnhancingQueueTime(actionObj, actionDetails, inventoryLookup);
				if (enhancingTime) {
					count = enhancingTime.count;
					totalTime = enhancingTime.totalTime;
					actionTimeSeconds = enhancingTime.totalTime;
				} else if (isInfinite) {
					isTrulyInfinite = true;
					totalTime = Infinity;
				}
			} else {
				const timeData = this.calculateActionTime(actionDetails, actionObj.actionHrid);
				if (!timeData) return {
					totalTime: 0,
					actionTimeSeconds: 0,
					count: 0,
					baseActionsNeeded: 0,
					isTrulyInfinite: isInfinite,
					isInfinite,
					materialLimit: null,
					limitType: null,
					limitLabel: "",
					isEnhancing
				};
				const { actionTime, totalEfficiency } = timeData;
				if (isInfinite) {
					const equipment = src_core_data_manager_js.default.getEquipment();
					const itemDetailMap = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap || {};
					const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
					const activeDrinks = src_core_data_manager_js.default.getActionDrinkSlots(actionDetails.type);
					const artisanBonus = (0, src_utils_tea_parser_js.parseArtisanBonus)(activeDrinks, itemDetailMap, drinkConcentration);
					const limitResult = this.calculateMaterialLimit(actionDetails, inventoryLookup, artisanBonus, actionObj);
					if (limitResult) {
						materialLimit = limitResult.maxActions;
						limitType = limitResult.limitType;
					}
				}
				isTrulyInfinite = isInfinite && materialLimit === null;
				if (!isInfinite) count = actionObj.maxCount - actionObj.currentCount;
				else if (materialLimit !== null) count = materialLimit;
				if (!isTrulyInfinite && count > 0) {
					const avgActionsPerBaseAction = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(totalEfficiency);
					baseActionsNeeded = Math.ceil(count / avgActionsPerBaseAction);
					totalTime = baseActionsNeeded * actionTime;
					actionTimeSeconds = totalTime;
				} else if (isTrulyInfinite) totalTime = Infinity;
			}
			if (limitType === "gold") limitLabel = "gold";
			else if (limitType && limitType.startsWith("material:")) limitLabel = "mat";
			else if (limitType && limitType.startsWith("upgrade:")) limitLabel = "upgrade";
			else limitLabel = "max";
			return {
				totalTime,
				actionTimeSeconds,
				count,
				baseActionsNeeded,
				isTrulyInfinite,
				isInfinite,
				materialLimit,
				limitType,
				limitLabel,
				isEnhancing
			};
		}
		/**
		* Initialize observer for action name element replacement
		*/
		initializeActionNameWatcher() {
			if (this.unregisterActionNameObserver) return;
			this.unregisterActionNameObserver = src_core_dom_observer_js.default.onClass("ActionTimeDisplay-ActionName", "Header_actionName", (actionNameElement) => {
				if (!actionNameElement) return;
				this.createDisplayPanel();
				this.setupActionNameObserver(actionNameElement);
				this.updateDisplay();
			}, {
				debounce: true,
				debounceDelay: 150
			});
		}
		/**
		* Setup mutation observer for queue menu reordering
		* @param {HTMLElement} queueMenu - Queue menu container element
		*/
		setupQueueMenuObserver(queueMenu) {
			if (!queueMenu) return;
			if (this.queueMenuObserver) {
				this.queueMenuObserver();
				this.queueMenuObserver = null;
			}
			this.queueMenuObserver = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(queueMenu, () => {
				if (this.queueMenuObserver) {
					this.queueMenuObserver();
					this.queueMenuObserver = null;
				}
				this.injectQueueTimes(queueMenu);
			}, {
				childList: true,
				subtree: true
			}, {
				debounce: true,
				debounceDelay: 150
			});
		}
		/**
		* Handle character switch
		* Clean up old observers and re-initialize for new character's action panel
		*/
		handleCharacterSwitch() {
			this.activeProfitCalculationId = null;
			const oldActionNameElement = document.querySelector("div[class*=\"Header_actionName\"]");
			if (oldActionNameElement) this.clearAppendedStats(oldActionNameElement);
			if (this.actionNameObserver) {
				this.actionNameObserver();
				this.actionNameObserver = null;
			}
			this.displayElement = null;
			this.profitElement = null;
			this.waitForActionPanel();
		}
		/**
		* Wait for action panel to exist in DOM
		*/
		async waitForActionPanel() {
			const actionNameElement = document.querySelector("div[class*=\"Header_actionName\"]");
			if (actionNameElement) {
				this.createDisplayPanel();
				this.setupActionNameObserver(actionNameElement);
				this.updateDisplay();
			} else {
				if (this.waitForPanelTimeout) clearTimeout(this.waitForPanelTimeout);
				this.waitForPanelTimeout = setTimeout(() => {
					this.waitForPanelTimeout = null;
					this.waitForActionPanel();
				}, 200);
				this.cleanupRegistry.registerTimeout(this.waitForPanelTimeout);
			}
		}
		/**
		* Setup MutationObserver to watch action name changes
		* @param {HTMLElement} actionNameElement - The action name DOM element
		*/
		setupActionNameObserver(actionNameElement) {
			this.actionNameObserver = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(actionNameElement, () => {
				this.updateDisplay();
			}, {
				childList: true,
				characterData: true,
				subtree: true
			}, {
				debounce: true,
				debounceDelay: 150
			});
		}
		/**
		* Create the display panel in the DOM
		*/
		createDisplayPanel() {
			if (this.displayElement && this.displayElement.isConnected) return;
			this.displayElement = null;
			const orphan = document.getElementById("mwi-action-time-display");
			if (orphan) orphan.remove();
			const actionNameContainer = document.querySelector("div[class*=\"Header_actionName\"]");
			if (!actionNameContainer) return;
			this.displayElement = document.createElement("div");
			this.displayElement.id = "mwi-action-time-display";
			this.displayElement.style.cssText = `
            font-size: 0.9em;
            color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
            margin-top: 2px;
            line-height: 1.4;
            text-align: left;
            white-space: pre-wrap;
        `;
			actionNameContainer.parentNode.insertBefore(this.displayElement, actionNameContainer.nextSibling);
			this.profitElement = document.createElement("div");
			this.profitElement.id = "mwi-action-profit-display";
			this.profitElement.style.cssText = `
            font-size: 0.9em;
            color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
            line-height: 1.4;
            text-align: left;
            white-space: pre-wrap;
        `;
			this.displayElement.parentNode.insertBefore(this.profitElement, this.displayElement.nextSibling);
			this.cleanupRegistry.registerCleanup(() => {
				if (this.displayElement && this.displayElement.parentNode) this.displayElement.parentNode.removeChild(this.displayElement);
				this.displayElement = null;
				if (this.profitElement && this.profitElement.parentNode) this.profitElement.parentNode.removeChild(this.profitElement);
				this.profitElement = null;
			});
		}
		/**
		* Update the display with current action data
		*/
		updateDisplay() {
			if (!this.displayElement) {
				this.createDisplayPanel();
				if (!this.displayElement) return;
			}
			if (!this.displayElement.isConnected) {
				this.createDisplayPanel();
				if (!this.displayElement) return;
			}
			const actionNameElement = document.querySelector("div[class*=\"Header_actionName\"]");
			if (this.actionNameObserver) {
				this.actionNameObserver();
				this.actionNameObserver = null;
			}
			if (!actionNameElement || !actionNameElement.textContent) {
				this.displayElement.innerHTML = "";
				this.clearAppendedStats(actionNameElement);
				this.reconnectActionNameObserver(actionNameElement);
				return;
			}
			const actionNameText = this.getCleanActionName(actionNameElement);
			if (actionNameText.includes("Doing nothing")) {
				this.displayElement.innerHTML = "";
				if (this.profitElement) this.profitElement.innerHTML = "";
				this.clearAppendedStats(actionNameElement);
				this.reconnectActionNameObserver(actionNameElement);
				return;
			}
			const inventoryCountMatch = actionNameText.match(/\(([\d,]+)\)$/);
			const inventoryCount = inventoryCountMatch ? parseInt(inventoryCountMatch[1].replace(/,/g, ""), 10) : null;
			const cachedActions = src_core_data_manager_js.default.getCurrentActions();
			let action;
			if (cachedActions.length > 0) {
				const sorted = cachedActions.sort((a, b) => a.ordinal - b.ordinal);
				action = this.matchCurrentActionFromText(sorted.slice(0, 1), actionNameText);
			}
			if (!action) {
				this.displayElement.innerHTML = "";
				this.clearAppendedStats(actionNameElement);
				if (cachedActions.length === 0) this.scheduleUpdateRetry();
				this.reconnectActionNameObserver(actionNameElement);
				return;
			}
			const actionDetails = src_core_data_manager_js.default.getActionDetails(action.actionHrid);
			if (!actionDetails) {
				this.displayElement.innerHTML = "";
				this.clearAppendedStats(actionNameElement);
				this.reconnectActionNameObserver(actionNameElement);
				return;
			}
			if (actionDetails.type === "/action_types/combat") {
				this.displayElement.innerHTML = "";
				if (this.profitElement) this.profitElement.innerHTML = "";
				this.clearAppendedStats(actionNameElement);
				if (!src_core_config_js.default.getSetting("actionBar_compactWidth")) {
					actionNameElement.style.removeProperty("overflow");
					actionNameElement.style.removeProperty("text-overflow");
					actionNameElement.style.removeProperty("white-space");
					actionNameElement.style.removeProperty("max-width");
					actionNameElement.style.removeProperty("width");
					actionNameElement.style.removeProperty("min-width");
					const parent1 = actionNameElement.parentElement;
					const parent2 = parent1?.parentElement;
					if (parent1) {
						parent1.style.setProperty("max-width", "none", "important");
						parent1.style.setProperty("width", "auto", "important");
						parent1.style.setProperty("overflow", "visible", "important");
					}
					if (parent2) {
						parent2.style.setProperty("max-width", "none", "important");
						parent2.style.setProperty("width", "auto", "important");
						parent2.style.setProperty("overflow", "visible", "important");
					}
				} else {
					actionNameElement.style.removeProperty("overflow");
					actionNameElement.style.removeProperty("text-overflow");
					actionNameElement.style.removeProperty("white-space");
					actionNameElement.style.removeProperty("max-width");
					actionNameElement.style.removeProperty("width");
					actionNameElement.style.removeProperty("min-width");
					let parent = actionNameElement.parentElement;
					let levels = 0;
					while (parent && levels < 5) {
						parent.style.removeProperty("overflow");
						parent.style.removeProperty("text-overflow");
						parent.style.removeProperty("white-space");
						parent.style.removeProperty("max-width");
						parent.style.removeProperty("width");
						parent.style.removeProperty("min-width");
						parent = parent.parentElement;
						levels++;
					}
				}
				this.reconnectActionNameObserver(actionNameElement);
				return;
			}
			if (actionDetails.type === "/action_types/enhancing") {
				if (this.profitElement) this.profitElement.innerHTML = "";
				this.buildEnhancingDisplay(action, actionDetails, actionNameElement);
				this.reconnectActionNameObserver(actionNameElement);
				return;
			}
			if (src_core_config_js.default.getSetting("actionBar_compactWidth")) {
				actionNameElement.style.setProperty("max-width", "800px", "important");
				actionNameElement.style.setProperty("overflow", "hidden", "important");
				actionNameElement.style.setProperty("text-overflow", "clip", "important");
				actionNameElement.style.setProperty("white-space", "nowrap", "important");
				actionNameElement.style.setProperty("width", "", "important");
				const parent1 = actionNameElement.parentElement;
				const parent2 = parent1?.parentElement;
				if (parent1) {
					parent1.style.removeProperty("max-width");
					parent1.style.removeProperty("width");
					parent1.style.removeProperty("overflow");
				}
				if (parent2) {
					parent2.style.removeProperty("max-width");
					parent2.style.removeProperty("width");
					parent2.style.removeProperty("overflow");
				}
			} else {
				actionNameElement.style.setProperty("overflow", "visible", "important");
				actionNameElement.style.setProperty("text-overflow", "clip", "important");
				actionNameElement.style.setProperty("white-space", "nowrap", "important");
				actionNameElement.style.setProperty("max-width", "none", "important");
				actionNameElement.style.setProperty("width", "auto", "important");
				const parent1 = actionNameElement.parentElement;
				const parent2 = parent1?.parentElement;
				if (parent1) {
					parent1.style.setProperty("max-width", "none", "important");
					parent1.style.setProperty("width", "auto", "important");
					parent1.style.setProperty("overflow", "visible", "important");
				}
				if (parent2) {
					parent2.style.setProperty("max-width", "none", "important");
					parent2.style.setProperty("width", "auto", "important");
					parent2.style.setProperty("overflow", "visible", "important");
				}
			}
			const equipment = src_core_data_manager_js.default.getEquipment();
			const skills = src_core_data_manager_js.default.getSkills();
			const itemDetailMap = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap || {};
			let levelRequirementOverride = void 0;
			if (actionDetails.type === "/action_types/alchemy" && action.primaryItemHash) {
				const { itemHrid: alchItemHrid } = this.parseItemHash(action.primaryItemHash);
				if (alchItemHrid) {
					const itemDetails = itemDetailMap[alchItemHrid];
					if (itemDetails && itemDetails.itemLevel) levelRequirementOverride = itemDetails.itemLevel;
				}
			}
			const stats = (0, src_utils_action_calculator_js.calculateActionStats)(actionDetails, {
				skills,
				equipment,
				itemDetailMap,
				actionHrid: action.actionHrid,
				includeCommunityBuff: true,
				includeBreakdown: false,
				levelRequirementOverride
			});
			if (!stats) {
				this.reconnectActionNameObserver(actionNameElement);
				return;
			}
			const { actionTime, totalEfficiency } = stats;
			const baseActionsPerHour = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime);
			const avgActionsPerBaseAction = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(totalEfficiency);
			const actionsPerHourWithEfficiency = (0, src_utils_profit_helpers_js.calculateEffectiveActionsPerHour)(baseActionsPerHour, avgActionsPerBaseAction);
			let itemsPerHour;
			const GATHERING_TYPES = [
				"/action_types/foraging",
				"/action_types/woodcutting",
				"/action_types/milking"
			];
			const PRODUCTION_TYPES = ["/action_types/brewing", "/action_types/cooking"];
			if (actionDetails.dropTable && actionDetails.dropTable.length > 0 && GATHERING_TYPES.includes(actionDetails.type)) {
				const mainDrop = actionDetails.dropTable[0];
				const baseAvgAmount = (mainDrop.minCount + mainDrop.maxCount) / 2;
				const activeDrinks = src_core_data_manager_js.default.getActionDrinkSlots(actionDetails.type);
				const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
				const gatheringTea = (0, src_utils_tea_parser_js.parseGatheringBonus)(activeDrinks, itemDetailMap, drinkConcentration);
				const communityBuffLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/gathering_quantity");
				const communityGathering = communityBuffLevel ? .2 + (communityBuffLevel - 1) * .005 : 0;
				const achievementGathering = src_core_data_manager_js.default.getAchievementBuffFlatBoost(actionDetails.type, "/buff_types/gathering");
				const avgAmountPerAction = baseAvgAmount * (1 + (gatheringTea + communityGathering + achievementGathering));
				itemsPerHour = baseActionsPerHour * mainDrop.dropRate * avgAmountPerAction * avgActionsPerBaseAction;
			} else if (actionDetails.outputItems && actionDetails.outputItems.length > 0) {
				itemsPerHour = baseActionsPerHour * (actionDetails.outputItems[0].count || 1) * avgActionsPerBaseAction;
				if (PRODUCTION_TYPES.includes(actionDetails.type)) {
					const activeDrinks = src_core_data_manager_js.default.getActionDrinkSlots(actionDetails.type);
					const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
					const gourmetBonus = (0, src_utils_tea_parser_js.parseGourmetBonus)(activeDrinks, itemDetailMap, drinkConcentration);
					const gourmetBonusItems = itemsPerHour * gourmetBonus;
					itemsPerHour += gourmetBonusItems;
				}
			} else itemsPerHour = actionsPerHourWithEfficiency;
			let materialLimit = null;
			let limitType = null;
			if (!action.hasMaxCount) {
				const inventory = src_core_data_manager_js.default.getInventory();
				const inventoryLookup = this.buildInventoryLookup(inventory);
				const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
				const activeDrinks = src_core_data_manager_js.default.getActionDrinkSlots(actionDetails.type);
				const artisanBonus = (0, src_utils_tea_parser_js.parseArtisanBonus)(activeDrinks, itemDetailMap, drinkConcentration);
				const limitResult = this.calculateMaterialLimit(actionDetails, inventoryLookup, artisanBonus, action);
				if (limitResult) {
					materialLimit = limitResult.maxActions;
					limitType = limitResult.limitType;
				}
			}
			let limitingItemHrid = null;
			if (limitType?.startsWith("material:")) limitingItemHrid = limitType.slice(9);
			else if (limitType === "gold") limitingItemHrid = "/items/coin";
			let queueSizeDisplay;
			if (action.hasMaxCount) queueSizeDisplay = action.maxCount;
			else if (materialLimit !== null) queueSizeDisplay = Infinity;
			else if (inventoryCount !== null) queueSizeDisplay = inventoryCount;
			else queueSizeDisplay = Infinity;
			let remainingQueuedActions;
			if (action.hasMaxCount) remainingQueuedActions = action.maxCount - action.currentCount;
			else if (materialLimit !== null) remainingQueuedActions = materialLimit;
			else if (inventoryCount !== null) remainingQueuedActions = inventoryCount;
			else remainingQueuedActions = Infinity;
			let baseActionsNeeded;
			if (!action.hasMaxCount && materialLimit !== null) baseActionsNeeded = Math.ceil(materialLimit / avgActionsPerBaseAction);
			else baseActionsNeeded = Math.ceil(remainingQueuedActions / avgActionsPerBaseAction);
			const totalTimeSeconds = baseActionsNeeded * actionTime;
			let recycleTimeSeconds = null;
			if (actionDetails.hrid?.includes("transmute") && actionDetails.type === "/action_types/alchemy" && action.primaryItemHash && src_core_config_js.default.getSetting("actionBar_showRecycleTime")) {
				const { itemHrid: transmuteItemHrid } = this.parseItemHash(action.primaryItemHash);
				if (transmuteItemHrid) {
					const transmuteItemDetails = itemDetailMap[transmuteItemHrid];
					const dropTable = transmuteItemDetails?.alchemyDetail?.transmuteDropTable;
					if (dropTable) {
						const selfReturn = dropTable.find((d) => d.itemHrid === transmuteItemHrid);
						if (selfReturn && selfReturn.dropRate > 0) {
							const baseSuccessRate = transmuteItemDetails.alchemyDetail.transmuteSuccessRate || 0;
							let catalystBonus = 0;
							if (action.secondaryItemHash) {
								const { itemHrid: catHrid } = this.parseItemHash(action.secondaryItemHash);
								if (catHrid?.includes("prime_catalyst")) catalystBonus = .25;
								else if (catHrid?.includes("catalyst_of_transmutation")) catalystBonus = .15;
							}
							const teaBonus = (0, src_utils_buff_parser_js.getAlchemySuccessBonus)();
							const successRate = Math.min(1, baseSuccessRate * (1 + catalystBonus + teaBonus));
							const recycleRate = selfReturn.dropRate * successRate;
							if (recycleRate > 0 && recycleRate < 1) recycleTimeSeconds = totalTimeSeconds / (1 - recycleRate);
						}
					}
				}
			}
			const completionTime = /* @__PURE__ */ new Date();
			completionTime.setSeconds(completionTime.getSeconds() + totalTimeSeconds);
			const timeStr = (0, src_utils_formatters_js.timeReadable)(totalTimeSeconds);
			const now = /* @__PURE__ */ new Date();
			const clockTime = formatCompletionTime(completionTime, !(completionTime.toDateString() === now.toDateString()));
			const statsToAppend = [];
			if (src_core_config_js.default.getSetting("actionBar_showQueueCount")) if (queueSizeDisplay !== Infinity) statsToAppend.push(`(${queueSizeDisplay.toLocaleString()} queued)`);
			else if (materialLimit !== null) {
				let limitLabel = "";
				if (limitType === "gold") limitLabel = "gold limit";
				else if (limitType && limitType.startsWith("material:")) limitLabel = "mat limit";
				else if (limitType && limitType.startsWith("upgrade:")) limitLabel = "upgrade limit";
				else limitLabel = "max";
				statsToAppend.push(`(∞ · ${limitLabel}: ${this.formatLargeNumber(materialLimit)})`);
			} else statsToAppend.push(`(∞)`);
			if (src_core_config_js.default.getSetting("actionBar_showActionDuration")) statsToAppend.push(`${actionTime.toFixed(2)}s/action`);
			if (src_core_config_js.default.getSetting("actionBar_showActionsPerHour")) statsToAppend.push(`${actionsPerHourWithEfficiency.toFixed(0)} actions/hr (${itemsPerHour.toFixed(0)} items/hr)`);
			this.appendStatsToActionName(actionNameElement, statsToAppend.join(" · "));
			if (src_core_config_js.default.getSetting("actionBar_showTimeRemaining") && remainingQueuedActions !== Infinity && !isNaN(remainingQueuedActions) && remainingQueuedActions > 0) {
				const itemIconHtml = this.getItemIconHtml(limitingItemHrid);
				const matsLabel = itemIconHtml ? `${itemIconHtml}:` : "";
				let recycleHtml = "";
				if (recycleTimeSeconds !== null) {
					const recycleCompletion = /* @__PURE__ */ new Date();
					recycleCompletion.setSeconds(recycleCompletion.getSeconds() + recycleTimeSeconds);
					recycleHtml = `<span style="color:#4dd0a0; margin-left:12px; font-size:11px;">Est. w/ recycle: ${(0, src_utils_formatters_js.timeReadable)(recycleTimeSeconds)} → ${formatCompletionTime(recycleCompletion, !(recycleCompletion.toDateString() === (/* @__PURE__ */ new Date()).toDateString()))}</span>`;
				}
				this.displayElement.innerHTML = `<span style="display: inline-flex; flex-wrap: nowrap; align-items: baseline; gap: 0.25em;"><span>⏱</span>${matsLabel} ${timeStr} → ${clockTime}</span>${recycleHtml}`;
			} else this.displayElement.innerHTML = "";
			this.updateActionBarProfit(action, remainingQueuedActions);
			this.reconnectActionNameObserver(actionNameElement);
		}
		/**
		* Reconnect action name observer after making our changes
		* @param {HTMLElement} actionNameElement - Action name element
		*/
		reconnectActionNameObserver(actionNameElement) {
			if (!actionNameElement) return;
			if (this.actionNameObserver) this.actionNameObserver();
			this.actionNameObserver = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(actionNameElement, () => {
				this.updateDisplay();
			}, {
				childList: true,
				characterData: true,
				subtree: true
			}, {
				debounce: true,
				debounceDelay: 150
			});
		}
		/**
		* Build and display enhancing-specific stats in the action bar
		* @param {Object} action - Current action object from dataManager
		* @param {Object} actionDetails - Action details
		* @param {HTMLElement} actionNameElement - Action name DOM element
		* @param {string} displayMode - Display mode ('full', 'compact', 'minimal')
		*/
		buildEnhancingDisplay(action, actionDetails, actionNameElement) {
			if (!action.primaryItemHash) {
				this.displayElement.innerHTML = "";
				this.clearAppendedStats(actionNameElement);
				return;
			}
			const { itemHrid, level: currentLevel } = this.parseItemHash(action.primaryItemHash);
			if (!itemHrid) {
				this.displayElement.innerHTML = "";
				this.clearAppendedStats(actionNameElement);
				return;
			}
			const targetLevel = action.enhancingMaxLevel || 0;
			const protectFrom = action.enhancingProtectionMinLevel || 0;
			if (targetLevel <= currentLevel) {
				this.displayElement.innerHTML = "";
				this.clearAppendedStats(actionNameElement);
				return;
			}
			const predictions = calculateEnhancementPredictions(itemHrid, currentLevel, targetLevel, protectFrom);
			if (!predictions) {
				this.displayElement.innerHTML = "";
				this.clearAppendedStats(actionNameElement);
				return;
			}
			const { expectedAttempts, expectedProtections, perActionTime, successMultiplier } = predictions;
			let protectionItemHrid = null;
			if (action.secondaryItemHash) {
				const { itemHrid: secItemHrid } = this.parseItemHash(action.secondaryItemHash);
				protectionItemHrid = secItemHrid;
			}
			if (!protectionItemHrid && action.enhancingProtectionItemHrid) protectionItemHrid = action.enhancingProtectionItemHrid;
			const usesMirror = protectionItemHrid === "/items/philosophers_mirror";
			const effectiveAttempts = usesMirror ? targetLevel - currentLevel : expectedAttempts;
			const effectiveProtections = usesMirror ? 0 : expectedProtections;
			const baseRate = currentLevel < src_utils_enhancement_calculator_js.BASE_SUCCESS_RATES.length ? src_utils_enhancement_calculator_js.BASE_SUCCESS_RATES[currentLevel] : 30;
			const actualSuccessRate = usesMirror ? 100 : Math.min(100, baseRate * successMultiplier);
			let queuedActions;
			let materialLimit = null;
			let limitingItemHrid = null;
			if (action.hasMaxCount) queuedActions = action.maxCount - action.currentCount;
			else {
				const inventory = src_core_data_manager_js.default.getInventory();
				const inventoryLookup = this.buildInventoryLookup(inventory);
				const limitResult = this.calculateMaterialLimit(actionDetails, inventoryLookup, 0, action);
				if (limitResult) {
					materialLimit = limitResult.maxActions;
					queuedActions = materialLimit;
					if (limitResult.limitType?.startsWith("material:")) limitingItemHrid = limitResult.limitType.slice(9);
				} else queuedActions = Infinity;
				if (protectFrom > 0 && effectiveProtections > 0 && src_core_config_js.default.getSetting("actionPanel_enhanceMatLimitProtections")) {
					if (protectionItemHrid) {
						const availableProtections = (inventoryLookup?.byHrid || {})[protectionItemHrid] || 0;
						if (availableProtections < effectiveProtections) {
							const protectionRatio = effectiveProtections / effectiveAttempts;
							const maxAttemptsFromProtection = protectionRatio > 0 ? Math.floor(availableProtections / protectionRatio) : Infinity;
							if (maxAttemptsFromProtection < queuedActions) {
								queuedActions = maxAttemptsFromProtection;
								materialLimit = maxAttemptsFromProtection;
								limitingItemHrid = protectionItemHrid;
							}
						}
					}
				}
				if (usesMirror) {
					const availableMirrors = (inventoryLookup?.byHrid || {})["/items/philosophers_mirror"] || 0;
					if (availableMirrors < queuedActions) {
						queuedActions = availableMirrors;
						materialLimit = availableMirrors;
						limitingItemHrid = "/items/philosophers_mirror";
					}
				}
			}
			const materialTime = materialLimit !== null ? materialLimit * perActionTime : null;
			if (src_core_config_js.default.getSetting("actionBar_compactWidth")) {
				actionNameElement.style.setProperty("max-width", "800px", "important");
				actionNameElement.style.setProperty("overflow", "hidden", "important");
				actionNameElement.style.setProperty("text-overflow", "clip", "important");
				actionNameElement.style.setProperty("white-space", "nowrap", "important");
				actionNameElement.style.setProperty("width", "", "important");
			} else {
				actionNameElement.style.setProperty("overflow", "visible", "important");
				actionNameElement.style.setProperty("text-overflow", "clip", "important");
				actionNameElement.style.setProperty("white-space", "nowrap", "important");
				actionNameElement.style.setProperty("max-width", "none", "important");
				actionNameElement.style.setProperty("width", "auto", "important");
				const parent1 = actionNameElement.parentElement;
				const parent2 = parent1?.parentElement;
				if (parent1) {
					parent1.style.setProperty("max-width", "none", "important");
					parent1.style.setProperty("width", "auto", "important");
					parent1.style.setProperty("overflow", "visible", "important");
				}
				if (parent2) {
					parent2.style.setProperty("max-width", "none", "important");
					parent2.style.setProperty("width", "auto", "important");
					parent2.style.setProperty("overflow", "visible", "important");
				}
			}
			const statsToAppend = [];
			if (src_core_config_js.default.getSetting("actionBar_showActionDuration")) statsToAppend.push(`${perActionTime.toFixed(2)}s/action`);
			statsToAppend.push(`${actualSuccessRate.toFixed(1)}% success`);
			statsToAppend.push(`~${(0, src_utils_formatters_js.formatWithSeparator)(effectiveAttempts)} to target`);
			if (protectFrom > 0 && effectiveProtections > 0) statsToAppend.push(`~${(0, src_utils_formatters_js.formatWithSeparator)(effectiveProtections)} protections`);
			this.appendStatsToActionName(actionNameElement, statsToAppend.join(" · "));
			if (src_core_config_js.default.getSetting("actionBar_showTimeRemaining") && materialTime !== null && materialTime > 0 && isFinite(materialTime)) {
				const timeStr = (0, src_utils_formatters_js.timeReadable)(materialTime);
				const completionTime = /* @__PURE__ */ new Date();
				completionTime.setSeconds(completionTime.getSeconds() + materialTime);
				const now = /* @__PURE__ */ new Date();
				const clockTime = formatCompletionTime(completionTime, !(completionTime.toDateString() === now.toDateString()));
				const itemIconHtml = this.getItemIconHtml(limitingItemHrid);
				const matsLabel = itemIconHtml ? `${itemIconHtml}:` : "Mats:";
				this.displayElement.innerHTML = `<span style="display: inline-flex; flex-wrap: nowrap; align-items: baseline; gap: 0.25em;"><span>⏱</span>${matsLabel} ${timeStr} → ${clockTime} (${(0, src_utils_formatters_js.formatWithSeparator)(materialLimit)} actions)</span>`;
			} else this.displayElement.innerHTML = "";
		}
		/**
		* Calculate time for an enhancing action in the queue
		* Uses enhancement predictions to determine realistic time based on min(queued, expected attempts)
		* @param {Object} actionObj - Action object from dataManager
		* @param {Object} actionDetails - Action details
		* @param {Object} inventoryLookup - Inventory lookup maps
		* @returns {Object|null} { count, totalTime } or null if cannot calculate
		*/
		calculateEnhancingQueueTime(actionObj, actionDetails, inventoryLookup) {
			if (!actionObj.primaryItemHash) return null;
			const { itemHrid, level: currentLevel } = this.parseItemHash(actionObj.primaryItemHash);
			if (!itemHrid) return null;
			const targetLevel = actionObj.enhancingMaxLevel || 0;
			const protectFrom = actionObj.enhancingProtectionMinLevel || 0;
			if (targetLevel <= currentLevel) return null;
			const predictions = calculateEnhancementPredictions(itemHrid, currentLevel, targetLevel, protectFrom);
			if (!predictions || predictions.expectedAttempts <= 0) return null;
			const perActionTime = predictions.perActionTime;
			let usesMirror = false;
			if (actionObj.secondaryItemHash) {
				const { itemHrid: secItemHrid } = this.parseItemHash(actionObj.secondaryItemHash);
				if (secItemHrid === "/items/philosophers_mirror") usesMirror = true;
			}
			if (!usesMirror && actionObj.enhancingProtectionItemHrid === "/items/philosophers_mirror") usesMirror = true;
			if (usesMirror) {
				let actions = targetLevel - currentLevel;
				if (actionObj.hasMaxCount) actions = Math.min(actions, actionObj.maxCount - actionObj.currentCount);
				return {
					count: actions,
					totalTime: actions * perActionTime
				};
			}
			let queuedActions;
			if (actionObj.hasMaxCount) queuedActions = actionObj.maxCount - actionObj.currentCount;
			else queuedActions = this.calculateMaterialLimit(actionDetails, inventoryLookup, 0, actionObj)?.maxActions ?? Infinity;
			const realisticActions = queuedActions === Infinity ? predictions.expectedAttempts : Math.min(queuedActions, predictions.expectedAttempts);
			return {
				count: realisticActions,
				totalTime: realisticActions * perActionTime
			};
		}
		parseActionNameFromDom(actionNameText) {
			const actionNameMatch = actionNameText.match(/^(.+?)(?:\s*\([^)]+\))*$/);
			const fullNameFromDom = actionNameMatch ? actionNameMatch[1].trim() : actionNameText;
			if (fullNameFromDom.includes(":")) {
				const parts = fullNameFromDom.split(":");
				return {
					actionNameFromDom: parts[0].trim(),
					itemNameFromDom: parts.slice(1).join(":").trim()
				};
			}
			return {
				actionNameFromDom: fullNameFromDom,
				itemNameFromDom: null
			};
		}
		buildItemHridFromName(itemName) {
			return `/items/${itemName.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "_")}`;
		}
		/**
		* Parse primaryItemHash to extract item HRID and enhancement level
		* Handles both formats:
		*   "/item_locations/inventory::/items/cheese_sword::1" (3 parts)
		*   "161296::/item_locations/inventory::/items/cheese_sword::5" (4 parts)
		* @param {string} hash - primaryItemHash string
		* @returns {Object} {itemHrid, level} or {itemHrid: null, level: 0} on failure
		*/
		parseItemHash(hash) {
			try {
				const parts = hash.split("::");
				const itemHrid = parts.find((part) => part.startsWith("/items/")) || null;
				let level = 0;
				const lastPart = parts[parts.length - 1];
				if (lastPart && !lastPart.startsWith("/")) {
					const parsed = parseInt(lastPart, 10);
					if (!isNaN(parsed)) level = parsed;
				}
				return {
					itemHrid,
					level
				};
			} catch {
				return {
					itemHrid: null,
					level: 0
				};
			}
		}
		matchCurrentActionFromText(currentActions, actionNameText) {
			const { actionNameFromDom, itemNameFromDom } = this.parseActionNameFromDom(actionNameText);
			const itemHridFromDom = this.buildItemHridFromName(itemNameFromDom || actionNameFromDom);
			return currentActions.find((currentAction) => {
				const actionDetails = src_core_data_manager_js.default.getActionDetails(currentAction.actionHrid);
				if (!actionDetails) return false;
				if (actionDetails.type === "/action_types/enhancing" && currentAction.primaryItemHash) {
					const baseItemName = actionNameFromDom.replace(/\s*\+\d+$/, "");
					const baseItemHrid = this.buildItemHridFromName(baseItemName);
					if (currentAction.primaryItemHash.includes(baseItemHrid)) return true;
				}
				const outputItems = actionDetails.outputItems || [];
				const dropTable = actionDetails.dropTable || [];
				const matchesOutput = outputItems.some((item) => item.itemHrid === itemHridFromDom);
				const matchesDrop = dropTable.some((drop) => drop.itemHrid === itemHridFromDom);
				if (!(actionDetails.name === actionNameFromDom || actionNameFromDom.includes("★") && actionDetails.name === actionNameFromDom.replace(/\s*★/, " (R)") || actionNameFromDom.includes("(R)") && actionDetails.name === actionNameFromDom.replace(/\s*\(R\)/, " ★")) && !matchesOutput && !matchesDrop) return false;
				if (itemNameFromDom && currentAction.primaryItemHash) {
					const { itemHrid: hashItemHrid } = this.parseItemHash(currentAction.primaryItemHash);
					if (hashItemHrid) {
						if (src_core_data_manager_js.default.getItemDetails(hashItemHrid)?.name === itemNameFromDom) return true;
					}
					return currentAction.primaryItemHash.includes(itemHridFromDom);
				}
				return true;
			});
		}
		scheduleUpdateRetry(attempt = 0) {
			if (this.retryUpdateTimeout || attempt >= 3) return;
			const delays = [
				150,
				300,
				500
			];
			this.retryUpdateTimeout = setTimeout(() => {
				this.retryUpdateTimeout = null;
				this.updateDisplay();
				if (!this.displayElement || !this.displayElement.innerHTML) this.scheduleUpdateRetry(attempt + 1);
			}, delays[attempt]);
			this.cleanupRegistry.registerTimeout(this.retryUpdateTimeout);
		}
		/**
		* Get clean action name from element, stripping any stats we appended
		* @param {HTMLElement} actionNameElement - Action name element
		* @returns {string} Clean action name text
		*/
		getCleanActionName(actionNameElement) {
			const markerSpan = actionNameElement.querySelector(".mwi-appended-stats");
			const parts = [];
			for (const node of actionNameElement.childNodes) {
				if (node === markerSpan) continue;
				const text = node.textContent.trim();
				if (text) parts.push(text);
			}
			return parts.join(" ").replace(/\s+/g, " ").trim();
		}
		/**
		* Clear any stats we previously appended to action name
		* @param {HTMLElement} actionNameElement - Action name element
		*/
		clearAppendedStats(actionNameElement) {
			if (!actionNameElement) return;
			const markerSpan = actionNameElement.querySelector(".mwi-appended-stats");
			if (markerSpan) markerSpan.remove();
		}
		/**
		* Append stats to game's action name element
		* @param {HTMLElement} actionNameElement - Action name element
		* @param {string} statsText - Stats text to append
		*/
		appendStatsToActionName(actionNameElement, statsText) {
			this.clearAppendedStats(actionNameElement);
			const cleanActionName = this.getCleanActionName(actionNameElement);
			const statsSpan = document.createElement("span");
			statsSpan.className = "mwi-appended-stats";
			if (src_core_config_js.default.getSetting("actionBar_compactWidth")) {
				statsSpan.style.cssText = `
                color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
                display: inline-block;
                max-width: 400px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: bottom;
            `;
				const fullText = cleanActionName + " " + statsText;
				statsSpan.setAttribute("title", fullText);
				actionNameElement.setAttribute("title", fullText);
			} else {
				statsSpan.style.cssText = `color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});`;
				actionNameElement.removeAttribute("title");
			}
			statsSpan.textContent = " " + statsText;
			actionNameElement.appendChild(statsSpan);
		}
		/**
		* Calculate action time for a given action
		* @param {Object} actionDetails - Action details from data manager
		* @param {string} actionHrid - Action HRID for task detection (optional)
		* @returns {Object} {actionTime, totalEfficiency} or null if calculation fails
		*/
		calculateActionTime(actionDetails, actionHrid = null) {
			const skills = src_core_data_manager_js.default.getSkills();
			const equipment = src_core_data_manager_js.default.getEquipment();
			const itemDetailMap = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap || {};
			return (0, src_utils_action_calculator_js.calculateActionStats)(actionDetails, {
				skills,
				equipment,
				itemDetailMap,
				actionHrid,
				includeCommunityBuff: true,
				includeBreakdown: false
			});
		}
		/**
		* Format a number with K/M suffix for large values
		* @param {number} num - Number to format
		* @returns {string} Formatted string (e.g., "1.23K", "5.67M")
		*/
		formatLargeNumber(num) {
			if (num < 1e4) return num.toLocaleString();
			else if (num < 1e6) return (num / 1e3).toFixed(1) + "K";
			else return (num / 1e6).toFixed(2) + "M";
		}
		/**
		* Build inventory lookup maps for fast material queries
		* @param {Array} inventory - Character inventory items
		/**
		* Build an inline SVG icon HTML string for an item HRID.
		* Returns an empty string if the sprite URL cannot be found or no HRID given.
		* @param {string|null} itemHrid - e.g. "/items/mirror_of_protection"
		* @returns {string} HTML string with an inline <svg> element, or ''
		*/
		getItemIconHtml(itemHrid) {
			if (!itemHrid) return "";
			const spriteEl = document.querySelector("use[href*=\"items_sprite\"]");
			if (!spriteEl) return "";
			const spriteUrl = spriteEl.getAttribute("href")?.split("#")[0];
			if (!spriteUrl) return "";
			return `<svg width="16" height="16" style="vertical-align: middle; margin: 0 1px;"><use href="${spriteUrl}#${itemHrid.replace("/items/", "")}"></use></svg>`;
		}
		/**
		* @returns {Object} Lookup maps by HRID and enhancement
		*/
		buildInventoryLookup(inventory) {
			const byHrid = {};
			const byEnhancedKey = {};
			if (!Array.isArray(inventory)) return {
				byHrid,
				byEnhancedKey
			};
			for (const item of inventory) {
				if (item.itemLocationHrid !== "/item_locations/inventory") continue;
				const count = item.count || 0;
				if (!count) continue;
				byHrid[item.itemHrid] = (byHrid[item.itemHrid] || 0) + count;
				const enhancementLevel = item.enhancementLevel || 0;
				const enhancedKey = `${item.itemHrid}::${enhancementLevel}`;
				byEnhancedKey[enhancedKey] = (byEnhancedKey[enhancedKey] || 0) + count;
			}
			return {
				byHrid,
				byEnhancedKey
			};
		}
		/**
		* Calculate maximum actions possible based on inventory materials
		* @param {Object} actionDetails - Action detail object
		* @param {Object|Array} inventoryLookup - Inventory lookup maps or raw inventory array
		* @param {number} artisanBonus - Artisan material reduction (0-1 decimal)
		* @param {Object} actionObj - Character action object (for primaryItemHash)
		* @returns {Object|null} {maxActions: number, limitType: string} or null if unlimited
		*/
		calculateMaterialLimit(actionDetails, inventoryLookup, artisanBonus, actionObj = null) {
			if (!actionDetails || !inventoryLookup) return null;
			const lookup = Array.isArray(inventoryLookup) ? this.buildInventoryLookup(inventoryLookup) : inventoryLookup;
			const byHrid = lookup?.byHrid || {};
			const byEnhancedKey = lookup?.byEnhancedKey || {};
			if (actionDetails.type === "/action_types/enhancing" && actionObj && actionObj.primaryItemHash) {
				const { itemHrid } = this.parseItemHash(actionObj.primaryItemHash);
				if (itemHrid) {
					const costs = src_core_data_manager_js.default.getItemDetails(itemHrid)?.enhancementCosts;
					if (costs && Array.isArray(costs) && costs.length > 0) {
						let minLimit = Infinity;
						let limitingType = "unknown";
						for (const cost of costs) {
							const available = byHrid[cost.itemHrid] || 0;
							const maxFromThis = Math.floor(available / cost.count);
							if (maxFromThis < minLimit) {
								minLimit = maxFromThis;
								limitingType = cost.itemHrid.includes("coin") ? "gold" : `material:${cost.itemHrid}`;
							}
						}
						if (minLimit !== Infinity) return {
							maxActions: minLimit,
							limitType: limitingType
						};
					}
				}
			}
			if (actionDetails.type === "/action_types/alchemy" && actionObj && actionObj.primaryItemHash) {
				const { itemHrid: alchItemHrid, level: enhancementLevel } = this.parseItemHash(actionObj.primaryItemHash);
				if (alchItemHrid) {
					let minLimit = Infinity;
					let limitType = "unknown";
					const availableCount = byEnhancedKey[`${alchItemHrid}::${enhancementLevel}`] || 0;
					const alchItemDetails = src_core_data_manager_js.default.getItemDetails(alchItemHrid);
					const bulkMultiplier = alchItemDetails?.alchemyDetail?.bulkMultiplier || 1;
					const maxFromItem = Math.floor(availableCount / bulkMultiplier);
					if (maxFromItem < minLimit) {
						minLimit = maxFromItem;
						limitType = `material:${alchItemHrid}`;
					}
					if (actionDetails.coinCost && actionDetails.coinCost > 0) {
						const availableGold = byHrid["/items/coin"] || 0;
						const maxFromGold = Math.floor(availableGold / actionDetails.coinCost);
						if (maxFromGold < minLimit) {
							minLimit = maxFromGold;
							limitType = "gold";
						}
					}
					if (actionObj.secondaryItemHash) {
						const { itemHrid: catalystHrid } = this.parseItemHash(actionObj.secondaryItemHash);
						if (catalystHrid) {
							const availableCatalyst = byHrid[catalystHrid] || 0;
							let baseSuccessRate = .7;
							if (actionDetails.hrid?.includes("decompose")) baseSuccessRate = .6;
							else if (actionDetails.hrid?.includes("transmute")) baseSuccessRate = alchItemDetails?.alchemyDetail?.transmuteSuccessRate || .5;
							if (baseSuccessRate > 0) {
								const maxFromCatalyst = Math.floor(availableCatalyst / baseSuccessRate);
								if (maxFromCatalyst < minLimit) {
									minLimit = maxFromCatalyst;
									limitType = `material:${catalystHrid}`;
								}
							}
						}
					}
					if (minLimit === Infinity) return null;
					return {
						maxActions: minLimit,
						limitType
					};
				}
			}
			const hasInputItems = actionDetails.inputItems && actionDetails.inputItems.length > 0;
			const hasUpgradeItem = actionDetails.upgradeItemHrid;
			const hasCoinCost = actionDetails.coinCost && actionDetails.coinCost > 0;
			if (!hasInputItems && !hasUpgradeItem && !hasCoinCost) return null;
			let minLimit = Infinity;
			let limitType = "unknown";
			if (hasCoinCost) {
				const availableGold = byHrid["/items/coin"] || 0;
				const maxActionsFromGold = Math.floor(availableGold / actionDetails.coinCost);
				if (maxActionsFromGold < minLimit) {
					minLimit = maxActionsFromGold;
					limitType = "gold";
				}
			}
			if (hasInputItems) for (const inputItem of actionDetails.inputItems) {
				const availableCount = byHrid[inputItem.itemHrid] || 0;
				const requiredPerAction = inputItem.count * (1 - artisanBonus);
				const maxActions = Math.floor(availableCount / requiredPerAction);
				if (maxActions < minLimit) {
					minLimit = maxActions;
					limitType = `material:${inputItem.itemHrid}`;
				}
			}
			if (hasUpgradeItem) {
				const availableCount = byHrid[hasUpgradeItem] || 0;
				if (availableCount < minLimit) {
					minLimit = availableCount;
					limitType = `upgrade:${hasUpgradeItem}`;
				}
			}
			if (minLimit === Infinity) return null;
			return {
				maxActions: minLimit,
				limitType
			};
		}
		/**
		* Match an action from cache by reading its name from a queue div
		* @param {HTMLElement} actionDiv - The queue action div element
		* @param {Array} cachedActions - Array of actions from dataManager
		* @returns {Object|null} Matched action object or null
		*/
		matchActionFromDiv(actionDiv, cachedActions, usedActionIds = /* @__PURE__ */ new Set()) {
			const actionTextContainer = actionDiv.querySelector("[class*=\"QueuedActions_actionText\"]");
			if (!actionTextContainer) return null;
			const firstChildDiv = actionTextContainer.querySelector("[class*=\"QueuedActions_text__\"]");
			if (!firstChildDiv) return null;
			const svgIcon = firstChildDiv.querySelector("svg use");
			const isEnhancingAction = svgIcon && svgIcon.getAttribute("href")?.includes("#enhancing");
			const actionNameText = firstChildDiv.textContent.trim().replace(/^#\d+/, "").trim();
			if (isEnhancingAction) {
				const itemHrid = "/items/" + actionNameText.replace(/\s*\+\d+$/, "").toLowerCase().replace(/\s+/g, "_");
				return cachedActions.find((a) => {
					if (usedActionIds.has(a.id)) return false;
					const actionDetails = src_core_data_manager_js.default.getActionDetails(a.actionHrid);
					if (!actionDetails || actionDetails.type !== "/action_types/enhancing") return false;
					return a.primaryItemHash && a.primaryItemHash.includes(itemHrid);
				});
			}
			let actionNameFromDiv, itemNameFromDiv;
			if (actionNameText.includes(":")) {
				const parts = actionNameText.split(":");
				actionNameFromDiv = parts[0].trim();
				itemNameFromDiv = parts.slice(1).join(":").trim();
			} else {
				actionNameFromDiv = actionNameText;
				itemNameFromDiv = null;
			}
			return cachedActions.find((a) => {
				if (usedActionIds.has(a.id)) return false;
				const actionDetails = src_core_data_manager_js.default.getActionDetails(a.actionHrid);
				if (!actionDetails) return false;
				if (actionDetails.name !== actionNameFromDiv) {
					const itemHridFromDiv = itemNameFromDiv ? `/items/${itemNameFromDiv.toLowerCase().replace(/\s+/g, "_")}` : `/items/${actionNameFromDiv.toLowerCase().replace(/\s+/g, "_")}`;
					const outputItems = actionDetails.outputItems || [];
					const dropTable = actionDetails.dropTable || [];
					const matchesOutput = outputItems.some((item) => item.itemHrid === itemHridFromDiv);
					const matchesDrop = dropTable.some((drop) => drop.itemHrid === itemHridFromDiv);
					if (!matchesOutput && !matchesDrop) return false;
				}
				if (itemNameFromDiv && a.primaryItemHash) {
					const { itemHrid: hashItemHrid } = this.parseItemHash(a.primaryItemHash);
					if (hashItemHrid) {
						if (src_core_data_manager_js.default.getItemDetails(hashItemHrid)?.name === itemNameFromDiv) return true;
					}
					const itemHrid = "/items/" + itemNameFromDiv.toLowerCase().replace(/\s+/g, "_");
					return a.primaryItemHash.includes(itemHrid);
				}
				return true;
			});
		}
		/**
		* Inject time display into queue tooltip
		* @param {HTMLElement} queueMenu - Queue menu container element
		*/
		injectQueueTimes(queueMenu) {
			let shouldReconnectObserver = false;
			try {
				const currentActions = src_core_data_manager_js.default.getCurrentActions();
				if (!currentActions || currentActions.length === 0) return;
				const actionDivs = queueMenu.querySelectorAll("[class^=\"QueuedActions_action__\"]");
				if (actionDivs.length === 0) return;
				const inventoryLookup = this.buildInventoryLookup(src_core_data_manager_js.default.getInventory());
				queueMenu.querySelectorAll(".mwi-queue-action-time").forEach((el) => el.remove());
				queueMenu.querySelectorAll(".mwi-queue-action-profit").forEach((el) => el.remove());
				const existingTotal = document.querySelector("#mwi-queue-total-time");
				if (existingTotal) existingTotal.remove();
				shouldReconnectObserver = true;
				let accumulatedTime = 0;
				let hasInfinite = false;
				const actionsToCalculate = [];
				let currentAction = null;
				const actionNameElement = document.querySelector("div[class*=\"Header_actionName\"]");
				if (actionNameElement && actionNameElement.textContent) {
					const actionNameText = this.getCleanActionName(actionNameElement);
					const sorted = [...currentActions].sort((a, b) => a.ordinal - b.ordinal);
					currentAction = this.matchCurrentActionFromText(sorted.slice(0, 1), actionNameText);
				}
				if (currentAction) {
					const actionDetails = src_core_data_manager_js.default.getActionDetails(currentAction.actionHrid);
					if (actionDetails) {
						const isEnhancing = actionDetails.type === "/action_types/enhancing";
						const isInfinite = !currentAction.hasMaxCount || currentAction.actionHrid.includes("/combat/");
						let actionTimeSeconds = 0;
						let count = 0;
						let baseActionsNeeded = 0;
						if (isEnhancing) {
							const enhancingTime = this.calculateEnhancingQueueTime(currentAction, actionDetails, inventoryLookup);
							if (enhancingTime) {
								count = enhancingTime.count;
								actionTimeSeconds = enhancingTime.totalTime;
								accumulatedTime += enhancingTime.totalTime;
							} else if (isInfinite) hasInfinite = true;
						} else if (isInfinite) {
							const equipment = src_core_data_manager_js.default.getEquipment();
							const itemDetailMap = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap || {};
							const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
							const activeDrinks = src_core_data_manager_js.default.getActionDrinkSlots(actionDetails.type);
							const artisanBonus = (0, src_utils_tea_parser_js.parseArtisanBonus)(activeDrinks, itemDetailMap, drinkConcentration);
							const timeData = this.calculateActionTime(actionDetails, currentAction.actionHrid);
							if (timeData) {
								const { actionTime, totalEfficiency } = timeData;
								const materialLimit = this.calculateMaterialLimit(actionDetails, inventoryLookup, artisanBonus, currentAction)?.maxActions || null;
								if (materialLimit !== null) {
									count = materialLimit;
									const avgActionsPerBaseAction = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(totalEfficiency);
									baseActionsNeeded = Math.ceil(count / avgActionsPerBaseAction);
									const totalTime = baseActionsNeeded * actionTime;
									accumulatedTime += totalTime;
									actionTimeSeconds = totalTime;
								}
							} else hasInfinite = true;
						} else {
							count = currentAction.maxCount - currentAction.currentCount;
							const timeData = this.calculateActionTime(actionDetails, currentAction.actionHrid);
							if (timeData) {
								const { actionTime, totalEfficiency } = timeData;
								const avgActionsPerBaseAction = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(totalEfficiency);
								baseActionsNeeded = Math.ceil(count / avgActionsPerBaseAction);
								const totalTime = baseActionsNeeded * actionTime;
								accumulatedTime += totalTime;
								actionTimeSeconds = totalTime;
							}
						}
						if (actionTimeSeconds > 0 && !isEnhancing) actionsToCalculate.push({
							actionHrid: currentAction.actionHrid,
							primaryItemHash: currentAction.primaryItemHash || null,
							timeSeconds: actionTimeSeconds,
							count,
							baseActionsNeeded
						});
					}
				}
				const usedActionIds = /* @__PURE__ */ new Set();
				if (currentAction) usedActionIds.add(currentAction.id);
				for (let divIndex = 0; divIndex < actionDivs.length; divIndex++) {
					const actionDiv = actionDivs[divIndex];
					const actionObj = this.matchActionFromDiv(actionDiv, currentActions, usedActionIds);
					if (!actionObj) {
						const timeDiv = document.createElement("div");
						timeDiv.className = "mwi-queue-action-time";
						timeDiv.style.cssText = `
                        color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
                        font-size: 0.85em;
                        margin-top: 2px;
                    `;
						timeDiv.textContent = (0, src_core_i18n_js.t)("[Unknown action]");
						const actionTextContainer = actionDiv.querySelector("[class*=\"QueuedActions_actionText\"]");
						if (actionTextContainer) actionTextContainer.appendChild(timeDiv);
						else actionDiv.appendChild(timeDiv);
						continue;
					}
					usedActionIds.add(actionObj.id);
					const actionDetails = src_core_data_manager_js.default.getActionDetails(actionObj.actionHrid);
					if (!actionDetails) {
						console.warn("[Action Time Display] Unknown queued action:", actionObj.actionHrid);
						continue;
					}
					const isEnhancing = actionDetails.type === "/action_types/enhancing";
					const isInfinite = !actionObj.hasMaxCount || actionObj.actionHrid.includes("/combat/");
					let totalTime;
					let actionTimeSeconds = 0;
					let baseActionsNeeded = 0;
					let count = 0;
					let isTrulyInfinite = false;
					let materialLimit = null;
					let limitType = null;
					if (isEnhancing) {
						const enhancingTime = this.calculateEnhancingQueueTime(actionObj, actionDetails, inventoryLookup);
						if (enhancingTime) {
							count = enhancingTime.count;
							totalTime = enhancingTime.totalTime;
							actionTimeSeconds = enhancingTime.totalTime;
							accumulatedTime += enhancingTime.totalTime;
						} else if (isInfinite) {
							isTrulyInfinite = true;
							hasInfinite = true;
							totalTime = Infinity;
						} else totalTime = 0;
					} else {
						const timeData = this.calculateActionTime(actionDetails, actionObj.actionHrid);
						if (!timeData) continue;
						const { actionTime, totalEfficiency } = timeData;
						if (isInfinite) {
							const equipment = src_core_data_manager_js.default.getEquipment();
							const itemDetailMap = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap || {};
							const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
							const activeDrinks = src_core_data_manager_js.default.getActionDrinkSlots(actionDetails.type);
							const artisanBonus = (0, src_utils_tea_parser_js.parseArtisanBonus)(activeDrinks, itemDetailMap, drinkConcentration);
							const limitResult = this.calculateMaterialLimit(actionDetails, inventoryLookup, artisanBonus, actionObj);
							if (limitResult) {
								materialLimit = limitResult.maxActions;
								limitType = limitResult.limitType;
							}
						}
						isTrulyInfinite = isInfinite && materialLimit === null;
						if (isTrulyInfinite) hasInfinite = true;
						if (!isInfinite) count = actionObj.maxCount - actionObj.currentCount;
						else if (materialLimit !== null) count = materialLimit;
						if (isTrulyInfinite) totalTime = Infinity;
						else {
							const avgActionsPerBaseAction = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(totalEfficiency);
							baseActionsNeeded = Math.ceil(count / avgActionsPerBaseAction);
							totalTime = baseActionsNeeded * actionTime;
							accumulatedTime += totalTime;
							actionTimeSeconds = totalTime;
						}
					}
					if (actionTimeSeconds > 0 && !isTrulyInfinite && !isEnhancing) actionsToCalculate.push({
						actionHrid: actionObj.actionHrid,
						primaryItemHash: actionObj.primaryItemHash || null,
						timeSeconds: actionTimeSeconds,
						count,
						baseActionsNeeded,
						divIndex
					});
					let completionText = "";
					if (!hasInfinite && !isTrulyInfinite) {
						const completionDate = /* @__PURE__ */ new Date();
						completionDate.setSeconds(completionDate.getSeconds() + accumulatedTime);
						completionText = ` Complete at ${formatCompletionTime(completionDate, !(completionDate.toDateString() === (/* @__PURE__ */ new Date()).toDateString()))}`;
					}
					const timeDiv = document.createElement("div");
					timeDiv.className = "mwi-queue-action-time";
					timeDiv.style.cssText = `
                    color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
                    font-size: 0.85em;
                    margin-top: 2px;
                `;
					if (isTrulyInfinite) timeDiv.textContent = "[∞]";
					else if (isInfinite && materialLimit !== null) {
						let limitLabel = "";
						if (limitType === "gold") limitLabel = "gold";
						else if (limitType && limitType.startsWith("material:")) limitLabel = "mat";
						else if (limitType && limitType.startsWith("upgrade:")) limitLabel = "upgrade";
						else limitLabel = "max";
						timeDiv.textContent = `[${(0, src_utils_formatters_js.timeReadable)(totalTime)} · ${limitLabel}: ${this.formatLargeNumber(materialLimit)}]${completionText}`;
					} else timeDiv.textContent = `[${(0, src_utils_formatters_js.timeReadable)(totalTime)}]${completionText}`;
					const actionTextContainer = actionDiv.querySelector("[class*=\"QueuedActions_actionText\"]");
					if (actionTextContainer) actionTextContainer.appendChild(timeDiv);
					else actionDiv.appendChild(timeDiv);
					if (!isTrulyInfinite && actionTimeSeconds > 0 && !isEnhancing && src_core_config_js.default.getSettingValue("actionQueue_showValue", true)) {
						const profitDiv = document.createElement("div");
						profitDiv.className = "mwi-queue-action-profit";
						profitDiv.dataset.divIndex = divIndex;
						profitDiv.style.cssText = `
                        color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
                        font-size: 0.85em;
                        margin-top: 2px;
                    `;
						profitDiv.textContent = "";
						if (actionTextContainer) actionTextContainer.appendChild(profitDiv);
						else actionDiv.appendChild(profitDiv);
					}
				}
				const totalDiv = document.createElement("div");
				totalDiv.id = "mwi-queue-total-time";
				totalDiv.style.cssText = `
                color: var(--text-color-primary, ${src_core_config_js.default.COLOR_TEXT_PRIMARY});
                font-weight: bold;
                margin-top: 12px;
                padding: 8px;
                border-top: 1px solid var(--border-color, ${src_core_config_js.default.COLOR_BORDER});
                text-align: center;
            `;
				let totalText = "";
				if (hasInfinite) if (accumulatedTime > 0) totalText = `Total time: ${(0, src_utils_formatters_js.timeReadable)(accumulatedTime)} + [∞]`;
				else totalText = "Total time: [∞]";
				else totalText = `Total time: ${(0, src_utils_formatters_js.timeReadable)(accumulatedTime)}`;
				totalDiv.innerHTML = totalText;
				queueMenu.insertAdjacentElement("afterend", totalDiv);
				if (actionsToCalculate.length > 0 && src_api_marketplace_js.default.isLoaded() && src_core_config_js.default.getSettingValue("actionQueue_showValue", true)) {
					shouldReconnectObserver = false;
					this.calculateAndDisplayTotalProfit(totalDiv, actionsToCalculate, totalText, queueMenu);
				}
			} catch (error) {
				console.error("[Toolasha] Error injecting queue times:", error);
			} finally {
				if (shouldReconnectObserver) this.setupQueueMenuObserver(queueMenu);
			}
		}
		/**
		* Calculate and display total profit asynchronously (non-blocking)
		* @param {HTMLElement} totalDiv - The total display div element
		* @param {Array} actionsToCalculate - Array of {actionHrid, timeSeconds, count, baseActionsNeeded, divIndex} objects
		* @param {string} baseText - Base text (time) to prepend
		* @param {HTMLElement} queueMenu - Queue menu element to reconnect observer after updates
		*/
		async calculateAndDisplayTotalProfit(totalDiv, actionsToCalculate, baseText, queueMenu) {
			const calculationId = Date.now() + Math.random();
			this.activeProfitCalculationId = calculationId;
			try {
				let totalProfit = 0;
				let hasProfitData = false;
				const profitPromises = actionsToCalculate.map((action) => Promise.race([this.calculateProfitForAction(action), new Promise((_, reject) => setTimeout(() => reject(/* @__PURE__ */ new Error("Timeout")), 500))]).catch(() => null));
				const results = await Promise.allSettled(profitPromises);
				if (this.activeProfitCalculationId !== calculationId) return;
				results.forEach((result, index) => {
					const actionProfit = result.status === "fulfilled" && result.value !== null ? result.value : null;
					if (actionProfit !== null) {
						totalProfit += actionProfit;
						hasProfitData = true;
						const action = actionsToCalculate[index];
						if (action.divIndex !== void 0) {
							const profitDiv = document.querySelector(`.mwi-queue-action-profit[data-div-index="${action.divIndex}"]`);
							if (profitDiv) profitDiv.innerHTML = `Profit: <span style="color: ${actionProfit >= 0 ? src_core_config_js.default.getSettingValue("color_profit", "#4ade80") : src_core_config_js.default.getSettingValue("color_loss", "#f87171")};">${actionProfit >= 0 ? "+" : ""}${this.formatLargeNumber(Math.abs(Math.round(actionProfit)))}</span>`;
						}
					}
				});
				if (hasProfitData) {
					const isEstimatedValue = src_core_config_js.default.getSettingValue("actionQueue_valueMode", "profit") === "estimated_value";
					const valueColor = isEstimatedValue || totalProfit >= 0 ? src_core_config_js.default.getSettingValue("color_profit", "#4ade80") : src_core_config_js.default.getSettingValue("color_loss", "#f87171");
					totalDiv.innerHTML = baseText + `<br>${isEstimatedValue ? "Estimated value" : "Total profit"}: <span style="color: ${valueColor};">${totalProfit >= 0 ? "+" : ""}${this.formatLargeNumber(Math.abs(Math.round(totalProfit)))}</span>`;
				}
			} catch (error) {
				console.warn("[Action Time Display] Error calculating total profit:", error);
			} finally {
				this.setupQueueMenuObserver(queueMenu);
			}
		}
		/**
		* Calculate profit or estimated value for a single action based on action count
		* @param {Object} action - Action object with {actionHrid, timeSeconds, count, baseActionsNeeded}
		* @returns {Promise<number|null>} Total value (profit or revenue) or null if unavailable
		*/
		async calculateProfitForAction(action) {
			const actionDetails = src_core_data_manager_js.default.getActionDetails(action.actionHrid);
			if (!actionDetails) return null;
			const valueMode = src_core_config_js.default.getSettingValue("actionQueue_valueMode", "profit");
			let profitData = null;
			let isAlchemy = false;
			if (actionDetails.type === "/action_types/alchemy" && action.primaryItemHash) {
				profitData = this.calculateAlchemyProfitForAction(action);
				isAlchemy = !!profitData;
			}
			if (!profitData) {
				const gatheringProfit = await calculateGatheringProfit(action.actionHrid);
				if (gatheringProfit) profitData = gatheringProfit;
				else if (actionDetails.outputItems?.[0]?.itemHrid) profitData = await src_features_market_profit_calculator_js.default.calculateProfit(actionDetails.outputItems[0].itemHrid);
			}
			if (!profitData) return null;
			const actionsCount = action.count ?? 0;
			if (!actionsCount) return 0;
			if (typeof profitData.actionsPerHour !== "number") return null;
			if (isAlchemy) {
				const totalProfit = profitData.profitPerHour / profitData.actionsPerHour * actionsCount;
				if (valueMode === "estimated_value") return (profitData.revenuePerHour || 0) / profitData.actionsPerHour * actionsCount;
				return totalProfit;
			}
			if (profitData.baseOutputs) {
				const totals = (0, src_utils_profit_helpers_js.calculateGatheringActionTotalsFromBase)({
					actionsCount,
					actionsPerHour: profitData.actionsPerHour,
					baseOutputs: profitData.baseOutputs,
					bonusDrops: profitData.bonusRevenue?.bonusDrops || [],
					processingRevenueBonusPerAction: profitData.processingRevenueBonusPerAction,
					gourmetRevenueBonusPerAction: profitData.gourmetRevenueBonusPerAction,
					drinkCostPerHour: profitData.drinkCostPerHour,
					efficiencyMultiplier: profitData.efficiencyMultiplier || 1
				});
				return valueMode === "estimated_value" ? totals.totalRevenue : totals.totalProfit;
			}
			const totals = (0, src_utils_profit_helpers_js.calculateProductionActionTotalsFromBase)({
				actionsCount,
				actionsPerHour: profitData.actionsPerHour,
				outputAmount: profitData.outputAmount || 1,
				outputPrice: profitData.outputPrice,
				gourmetBonus: profitData.gourmetBonus || 0,
				bonusDrops: profitData.bonusRevenue?.bonusDrops || [],
				materialCosts: profitData.materialCosts,
				totalTeaCostPerHour: profitData.totalTeaCostPerHour,
				efficiencyMultiplier: profitData.efficiencyMultiplier || 1
			});
			return valueMode === "estimated_value" ? totals.totalRevenue : totals.totalProfit;
		}
		/**
		* Calculate alchemy profit for a queued action using the alchemy profit calculator.
		* @param {Object} action - Action object with {actionHrid, primaryItemHash}
		* @returns {Object|null} Profit data with profitPerHour and actionsPerHour, or null
		*/
		calculateAlchemyProfitForAction(action) {
			const { itemHrid, level: enhancementLevel } = this.parseItemHash(action.primaryItemHash);
			if (!itemHrid) return null;
			const actionHrid = action.actionHrid;
			if (actionHrid === "/actions/alchemy/coinify") return src_features_market_alchemy_profit_calculator_js.default.calculateCoinifyProfit(itemHrid, enhancementLevel || 0, true);
			else if (actionHrid === "/actions/alchemy/transmute") return src_features_market_alchemy_profit_calculator_js.default.calculateTransmuteProfit(itemHrid, true);
			else if (actionHrid === "/actions/alchemy/decompose") return src_features_market_alchemy_profit_calculator_js.default.calculateDecomposeProfit(itemHrid, enhancementLevel || 0, true);
			return null;
		}
		/**
		* Calculate and display profit in the action bar for the current action.
		* @param {Object} action - Current action object from dataManager
		* @param {number} remainingActions - Remaining queued actions (Infinity if unlimited)
		*/
		async updateActionBarProfit(action, remainingActions) {
			if (!this.profitElement) return;
			if (!src_core_config_js.default.getSetting("actionBar_showProfit")) {
				this.profitElement.innerHTML = "";
				return;
			}
			const calcId = Date.now() + Math.random();
			this.activeBarProfitId = calcId;
			try {
				const actionHrid = action.actionHrid;
				const actionDetails = src_core_data_manager_js.default.getActionDetails(actionHrid);
				if (!actionDetails) {
					this.profitElement.innerHTML = "";
					return;
				}
				let profitData = null;
				if (actionDetails.type === "/action_types/alchemy" && action.primaryItemHash) profitData = this.calculateAlchemyProfitForAction(action);
				if (!profitData) {
					const gatheringProfit = await calculateGatheringProfit(actionHrid);
					if (gatheringProfit) profitData = gatheringProfit;
					else if (actionDetails.outputItems?.[0]?.itemHrid) profitData = await src_features_market_profit_calculator_js.default.calculateProfit(actionDetails.outputItems[0].itemHrid);
				}
				if (this.activeBarProfitId !== calcId) return;
				if (!profitData || typeof profitData.profitPerHour !== "number") {
					this.profitElement.innerHTML = "";
					return;
				}
				const profitPerHour = profitData.profitPerHour;
				let html = `<span style="color:#888;">Profit:</span> <span style="color:${profitPerHour >= 0 ? src_core_config_js.default.getSettingValue("color_profit", "#4ade80") : src_core_config_js.default.getSettingValue("color_loss", "#f87171")}; font-weight:600;">${profitPerHour >= 0 ? "+" : ""}${this.formatLargeNumber(Math.abs(Math.round(profitPerHour)))}/hr</span>`;
				if (isFinite(remainingActions) && remainingActions > 0 && profitData.actionsPerHour > 0) {
					const remainingProfit = profitPerHour / (profitData.actionsPerHour * (profitData.efficiencyMultiplier || 1)) * remainingActions;
					const remColor = remainingProfit >= 0 ? src_core_config_js.default.getSettingValue("color_profit", "#4ade80") : src_core_config_js.default.getSettingValue("color_loss", "#f87171");
					html += ` <span style="color:#888;">·</span> <span style="color:#888;">remaining</span> <span style="color:${remColor}; font-weight:600;">${remainingProfit >= 0 ? "+" : ""}${this.formatLargeNumber(Math.abs(Math.round(remainingProfit)))}</span>`;
				}
				if (this.activeBarProfitId !== calcId) return;
				this.profitElement.innerHTML = html;
			} catch {
				if (this.activeBarProfitId === calcId) this.profitElement.innerHTML = "";
			}
		}
		/**
		* Disable the action time display (cleanup)
		*/
		disable() {
			this.cleanupRegistry.cleanupAll();
			this.displayElement = null;
			this.profitElement = null;
			this.updateTimer = null;
			this.unregisterQueueObserver = null;
			this.actionNameObserver = null;
			this.queueMenuObserver = null;
			this.characterInitHandler = null;
			this.waitForPanelTimeout = null;
			this.activeProfitCalculationId = null;
			this.activeBarProfitId = null;
			this.isInitialized = false;
		}
	};
	var actionTimeDisplay = new ActionTimeDisplay();
	//#endregion
	//#region src/features/actions/action-countdown.js
	/**
	* Action Countdown
	* Replaces the static time text on the action progress bar with a live countdown.
	* Syncs to the game's progress bar fill via scaleX transform.
	*/
	var ActionCountdown = class {
		constructor() {
			this.initialized = false;
			this.rafId = null;
			this.textEl = null;
			this.fillBar = null;
			this.totalTime = null;
			this.unregisterObserver = null;
			this.actionCompletedHandler = null;
			this.lastCompletedAt = null;
			this.settingChangeHandler = null;
		}
		initialize() {
			if (this.initialized) return;
			if (!this.settingChangeHandler) {
				this.settingChangeHandler = (enabled) => {
					if (enabled) {
						this.initialized = false;
						this.initialize();
					} else this.disable();
				};
				src_core_config_js.default.onSettingChange("actionPanel_liveCountdown", this.settingChangeHandler);
			}
			if (!src_core_config_js.default.getSetting("actionPanel_liveCountdown")) return;
			this.actionCompletedHandler = () => this._onActionCompleted();
			src_core_data_manager_js.default.on("action_completed", this.actionCompletedHandler);
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("ActionCountdown", "ProgressBar_text", (el) => {
				this._onProgressBarText(el);
			});
			const existing = document.querySelector("[class*=\"ProgressBar_text\"]");
			if (existing) this._onProgressBarText(existing);
			this.initialized = true;
		}
		_onProgressBarText(textEl) {
			this.textEl = textEl;
			this.fillBar = null;
			this._parseTotalTime();
			this._startLoop();
		}
		_parseTotalTime() {
			if (!this.textEl) return;
			const span = this.textEl.querySelector("span");
			if (!span) return;
			const val = parseFloat(span.textContent);
			if (!isNaN(val) && val > 0) this.totalTime = val;
		}
		_onActionCompleted() {
			this.lastCompletedAt = Date.now();
			setTimeout(() => this._parseTotalTime(), 50);
		}
		/**
		* Find the animated inner bar element.
		* DOM: progressBar > innerBarContainer > innerBar (scaleX animated)
		*/
		_findFillBar() {
			if (!this.textEl) return null;
			const parent = this.textEl.parentElement;
			if (!parent) return null;
			for (const child of parent.children) {
				if (child === this.textEl) continue;
				if (child.children.length > 0) {
					for (const grandchild of child.children) if (grandchild.className?.includes("innerBar")) return grandchild;
				}
			}
			return null;
		}
		_startLoop() {
			if (this.rafId) return;
			this._tick();
		}
		_stopLoop() {
			if (this.rafId) {
				cancelAnimationFrame(this.rafId);
				this.rafId = null;
			}
		}
		_tick() {
			this.rafId = requestAnimationFrame(() => this._tick());
			if (!this.textEl || !this.textEl.isConnected || !this.totalTime) return;
			const span = this.textEl.querySelector("span");
			if (!span) return;
			if (!this.fillBar || !this.fillBar.isConnected) this.fillBar = this._findFillBar();
			let remaining;
			if (this.fillBar) {
				const transform = getComputedStyle(this.fillBar).transform;
				if (transform && transform !== "none") {
					const match = transform.match(/matrix\(([^)]+)\)/);
					if (match) {
						const scaleX = parseFloat(match[1]);
						const progressBar = this.fillBar.parentElement?.parentElement;
						const duration = progressBar ? parseFloat(getComputedStyle(progressBar).getPropertyValue("--duration")) : this.totalTime;
						if (duration > 0) {
							this.totalTime = duration;
							remaining = duration * (1 - scaleX);
						}
					}
				}
			}
			if (remaining === void 0 && this.lastCompletedAt) {
				const elapsed = (Date.now() - this.lastCompletedAt) / 1e3;
				remaining = Math.max(0, this.totalTime - elapsed);
			}
			if (remaining !== void 0) {
				remaining = Math.max(0, remaining);
				span.textContent = remaining.toFixed(1) + (0, src_core_i18n_js.t)("s / ") + this.totalTime.toFixed(1) + "s";
			}
		}
		disable() {
			this._stopLoop();
			if (this.textEl && this.totalTime) {
				const span = this.textEl.querySelector("span");
				if (span) span.textContent = this.totalTime.toFixed(1) + "s";
			}
			if (this.actionCompletedHandler) {
				src_core_data_manager_js.default.off("action_completed", this.actionCompletedHandler);
				this.actionCompletedHandler = null;
			}
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			this.textEl = null;
			this.fillBar = null;
			this.totalTime = null;
			this.lastCompletedAt = null;
			this.initialized = false;
		}
	};
	var actionCountdown = new ActionCountdown();
	//#endregion
	//#region src/utils/game-locale.js
	/**
	* Locale-safe DOM matching utilities for game UI interactions.
	* All functions use CSS classes, data attributes, or structural positions
	* instead of textContent matching, which breaks when the game is in Chinese.
	*/
	/**
	* Check if a tabs container belongs to the marketplace panel.
	* Uses the panel's CSS module class (partial match for hash stability).
	*
	* @param {Element} tablistContainer - A tablist container element
	* @returns {boolean} True if the container is part of the marketplace panel
	*/
	function isMarketplacePanel(tablistContainer) {
		return !!tablistContainer.closest("[class*=\"MarketplacePanel_marketplacePanel\"]");
	}
	/**
	* Get the "My Listings" tab from a marketplace tablist.
	* "My Listings" tab is at index 1 in the marketplace MUI tab bar.
	* Index 0 = search/filter tab (verified via the panel detection above).
	*
	* @param {Element} tablist - The marketplace tablist element
	* @returns {Element|null} The "My Listings" tab element, or null if not found
	*/
	function getMyListingsTab(tablist) {
		return Array.from(tablist.children).filter((child) => !child.hasAttribute("data-mwi-custom-tab") && !child.classList.contains("toolasha-inv-tab"))[1] || null;
	}
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
	//#region src/features/actions/quick-input-buttons.js
	/**
	* Quick Input Buttons Module
	*
	* Adds quick action buttons (10, 100, 1000, Max) to action panels
	* for fast queue input without manual typing.
	*
	* Features:
	* - Preset buttons: 10, 100, 1000
	* - Max button (fills to maximum inventory amount)
	* - Works on all action panels (gathering, production, combat)
	* - Uses React's internal _valueTracker for proper state updates
	* - Auto-detects input fields and injects buttons
	*/
	var _qibSpriteUrl = null;
	function scrollSpriteHtml(buffTypeHrid, size = 14) {
		if (_qibSpriteUrl === null) {
			const el = document.querySelector("use[href*=\"items_sprite\"]");
			_qibSpriteUrl = el ? el.getAttribute("href").split("#")[0] : "";
		}
		const itemSuffix = SCROLL_BUFF_ITEMS[buffTypeHrid];
		if (!_qibSpriteUrl || !itemSuffix) return "";
		return `<svg width="${size}" height="${size}" style="vertical-align:middle;margin-right:3px"><use href="${_qibSpriteUrl}#${itemSuffix}"></use></svg>`;
	}
	/**
	* Compute wall-clock seconds for a queue, accounting for efficiency gains as levels are gained.
	* Each level gained adds 1% efficiency (game mechanic: efficiency = effective_level − requirement).
	* @param {number} queueCount - Number of queued actions
	* @param {Object} levelContext - From _buildLevelContext: { currentLevel, currentXP, modifiedXP, levelExperienceTable }
	* @param {number} baseEfficiency - Current efficiency percentage (e.g., 131.02)
	* @param {number} actionTime - Seconds per time-consuming action
	* @returns {number} Total wall-clock seconds
	*/
	function computeProgressiveQueueTime(queueCount, levelContext, baseEfficiency, actionTime) {
		let remaining = queueCount;
		let totalTime = 0;
		let level = levelContext.currentLevel;
		let xp = levelContext.currentXP;
		let levelsGained = 0;
		const { levelExperienceTable, modifiedXP } = levelContext;
		while (remaining > 0) {
			const effMult = 1 + (baseEfficiency + levelsGained) / 100;
			const nextLevelXP = levelExperienceTable[level + 1];
			if (!nextLevelXP) {
				totalTime += remaining / effMult * actionTime;
				break;
			}
			const queueActionsToLevel = (nextLevelXP - xp) / modifiedXP;
			if (remaining <= queueActionsToLevel) {
				totalTime += remaining / effMult * actionTime;
				break;
			}
			totalTime += queueActionsToLevel / effMult * actionTime;
			remaining -= queueActionsToLevel;
			level++;
			xp = nextLevelXP;
			levelsGained++;
		}
		return totalTime;
	}
	/**
	* QuickInputButtons class manages quick input button injection
	*/
	var QuickInputButtons = class {
		constructor() {
			this.isInitialized = false;
			this.addMode = false;
			this.unregisterObserver = null;
			this.presetHours = [
				.5,
				1,
				2,
				3,
				4,
				5,
				6,
				10,
				12,
				24
			];
			this.presetValues = [
				10,
				100,
				1e3
			];
			this.cleanupRegistry = (0, src_utils_cleanup_registry_js.createCleanupRegistry)();
			this._targetLevelByAction = /* @__PURE__ */ new Map();
		}
		/**
		* Initialize the quick input buttons feature
		*/
		async initialize() {
			if (this.isInitialized) return;
			this.addMode = await src_core_storage_js.default.get("quickInput_addMode", "settings", false);
			this.startObserving();
			this.isInitialized = true;
		}
		/**
		* Format an hours value into a compact combined label e.g. "1mo2w3d4h30m"
		* @param {number} totalHours
		* @returns {string}
		*/
		_formatHoursLabel(totalHours) {
			const months = Math.floor(totalHours / 720);
			let rem = totalHours % 720;
			const weeks = Math.floor(rem / 168);
			rem %= 168;
			const days = Math.floor(rem / 24);
			rem %= 24;
			const hours = Math.floor(rem);
			const mins = Math.round((rem - hours) * 60);
			let result = "";
			if (months) result += `${months}mo`;
			if (weeks) result += `${weeks}w`;
			if (days) result += `${days}d`;
			if (hours) result += `${hours}h`;
			if (mins) result += `${mins}m`;
			return result || "0h";
		}
		/**
		* Parse a comma-separated preset string into a sorted array of positive numbers.
		* Returns defaults if the string is blank or yields no valid values.
		* Capped at 8 entries to avoid UI overflow.
		* @param {string} raw - Comma-separated string from settings
		* @param {number[]} defaults - Fallback values
		* @returns {number[]}
		*/
		_parsePresets(raw, defaults) {
			if (!raw || !raw.trim()) return defaults;
			const parsed = raw.split(",").map((s) => parseFloat(s.trim())).filter((n) => isFinite(n) && n > 0);
			if (parsed.length === 0) return defaults;
			return [...new Set(parsed)].sort((a, b) => a - b).slice(0, 8);
		}
		/**
		* Create the count preset row (add-mode toggle + count buttons + Max + "times" label)
		* @param {HTMLElement} panel - Action panel element
		* @param {HTMLElement} numberInput - The queue input element
		* @param {Object} gameData - Cached game data
		* @param {Object} actionDetails - Action details object
		* @returns {DocumentFragment} Fragment containing the row elements
		*/
		_createCountPresetRow(panel, numberInput, gameData, actionDetails) {
			const fragment = document.createDocumentFragment();
			const applyToggleStyle = (btn, active) => {
				if (active) {
					btn.style.background = "rgba(215, 183, 255, 0.2)";
					btn.style.color = "#d7b7ff";
					btn.style.borderColor = "#d7b7ff";
				} else {
					btn.style.background = "transparent";
					btn.style.color = "rgba(215, 183, 255, 0.5)";
					btn.style.borderColor = "rgba(215, 183, 255, 0.3)";
				}
			};
			const addToggle = document.createElement("button");
			addToggle.textContent = "+";
			addToggle.title = (0, src_core_i18n_js.t)("Toggle add mode: click to accumulate counts instead of setting them");
			addToggle.style.cssText = `
            font-size: 11px;
            font-weight: 700;
            padding: 1px 5px;
            border-radius: 4px;
            border: 1px solid rgba(215, 183, 255, 0.3);
            background: transparent;
            color: rgba(215, 183, 255, 0.5);
            cursor: pointer;
            margin-right: 4px;
            line-height: 1.4;
            transition: background 0.15s, color 0.15s, border-color 0.15s;
        `;
			applyToggleStyle(addToggle, this.addMode);
			addToggle.addEventListener("click", () => {
				this.addMode = !this.addMode;
				applyToggleStyle(addToggle, this.addMode);
				src_core_storage_js.default.set("quickInput_addMode", this.addMode, "settings");
			});
			fragment.appendChild(addToggle);
			fragment.appendChild(document.createTextNode((0, src_core_i18n_js.t)("Do ")));
			this._parsePresets(src_core_config_js.default.getSettingValue("actionPanel_quickInputs_countPresets", ""), [
				10,
				100,
				1e3
			]).forEach((value) => {
				const button = this.createButton((0, src_utils_formatters_js.formatKMB)(value), () => {
					const currentInput = panel.querySelector("[class*=\"maxActionCountInput\"] input") || panel.querySelector("input[type=\"number\"]") || numberInput;
					if (this.addMode) {
						const current = parseInt(currentInput.value) || 0;
						this.setInputValue(currentInput, current + value);
					} else this.setInputValue(currentInput, value);
				});
				fragment.appendChild(button);
			});
			const maxButton = this.createButton((0, src_core_i18n_js.t)("Max"), () => {
				const currentInput = panel.querySelector("[class*=\"maxActionCountInput\"] input") || panel.querySelector("input[type=\"number\"]") || numberInput;
				const currentName = panel.querySelector("[class*=\"SkillActionDetail_name\"]")?.textContent?.trim();
				const currentDetails = currentName && currentName !== actionDetails.name ? this.getActionDetailsByName(currentName, gameData) || actionDetails : actionDetails;
				const maxValue = this.calculateMaxValue(panel, currentDetails, gameData);
				if (maxValue === "∞" || maxValue > 0) this.setInputValue(currentInput, maxValue);
			});
			fragment.appendChild(maxButton);
			fragment.appendChild(document.createTextNode((0, src_core_i18n_js.t)(" times")));
			return fragment;
		}
		/**
		* Start observing for action panels using centralized observer
		*/
		startObserving() {
			this._modalObserver = new MutationObserver((mutations) => {
				for (const m of mutations) for (const node of m.addedNodes) {
					if (node.nodeType !== 1) continue;
					const panel = node.classList?.contains("Modal_modalContainer__3B80m") ? node.querySelector("[class*=\"SkillActionDetail_skillActionDetail\"]") : node.querySelector?.("[class*=\"SkillActionDetail_skillActionDetail\"]");
					if (panel) this.injectButtons(panel);
				}
			});
			this._modalObserver.observe(document.body, {
				childList: true,
				subtree: true
			});
			this.cleanupRegistry.registerCleanup(() => {
				if (this._modalObserver) {
					this._modalObserver.disconnect();
					this._modalObserver = null;
				}
			});
			document.querySelectorAll("[class*=\"SkillActionDetail_skillActionDetail\"]").forEach((panel) => {
				this.injectButtons(panel);
			});
		}
		/**
		* Inject quick input buttons into action panel
		* @param {HTMLElement} panel - Action panel element
		*/
		injectButtons(panel) {
			let actionDetails = null;
			try {
				const actionNameElement = panel.querySelector("[class*=\"SkillActionDetail_name\"]");
				const currentActionName = actionNameElement?.textContent?.trim() || "";
				const previousActionName = panel.dataset.mwiInjectedAction || "";
				if (panel.querySelector(".mwi-collapsible-section") || panel.querySelector(".mwi-quick-input-btn")) {
					if (currentActionName && currentActionName === previousActionName) return;
					panel.querySelectorAll(".mwi-collapsible-section").forEach((el) => el.remove());
					panel.querySelectorAll(".mwi-quick-input-btn").forEach((el) => el.remove());
				}
				let numberInput = null;
				const maxInputContainer = panel.querySelector("[class*=\"maxActionCountInput\"]");
				if (maxInputContainer) numberInput = maxInputContainer.querySelector("input");
				if (!numberInput) numberInput = panel.querySelector("input[type=\"number\"]");
				if (!numberInput) {
					console.warn("[QuickInput] skip: no number input found in", panel.className?.slice(0, 80));
					return;
				}
				const gameData = src_core_data_manager_js.default.getInitClientData();
				if (!gameData) {
					console.warn("[QuickInput] no game data, injecting count-only buttons");
					const fallbackInput = numberInput;
					const fallbackPanel = panel;
					const fallbackActionName = currentActionName;
					this._createCountPresetRow(fallbackPanel, fallbackInput, {
						itemDetailMap: {},
						actionDetailMap: {}
					}, {
						hrid: "",
						name: fallbackActionName,
						type: "",
						baseTimeCost: 0
					});
					this._finalizeInjection(fallbackPanel, fallbackActionName, fallbackInput);
					return;
				}
				if (!actionNameElement) {
					console.warn("[QuickInput] skip: no SkillActionDetail_name in", panel.className?.slice(0, 80));
					return;
				}
				const actionName = currentActionName;
				actionDetails = this.getActionDetailsByName(actionName, gameData);
				if (!actionDetails) {
					console.warn("[QuickInput] skip: no action details for", actionName);
					return;
				}
				panel.dataset.mwiInjectedAction = actionName;
				const experienceGain = actionDetails.experienceGain;
				const hasNormalXP = experienceGain && experienceGain.skillHrid && experienceGain.value > 0;
				src_core_data_manager_js.default.setScrollSimulation(actionDetails.type, scrollSimulator.getScrollSetForActionType(actionDetails.type));
				const { actionTime, totalEfficiency, efficiencyBreakdown } = this.calculateActionMetrics(actionDetails, gameData);
				const efficiencyMultiplier = 1 + totalEfficiency / 100;
				let levelContext = null;
				const inputContainer = numberInput.parentNode.parentNode.parentNode;
				if (!inputContainer) return;
				const equipment = src_core_data_manager_js.default.getEquipment();
				const itemDetailMap = gameData.itemDetailMap || {};
				const baseTime = actionDetails.baseTimeCost / 1e9;
				const equipmentSpeedBonus = (0, src_utils_equipment_parser_js.parseEquipmentSpeedBonuses)(equipment, actionDetails.type, itemDetailMap);
				const personalSpeedBonus = src_core_data_manager_js.default.getPersonalBuffFlatBoost(actionDetails.type, "/buff_types/action_speed");
				const speedBonus = equipmentSpeedBonus + personalSpeedBonus;
				let speedSection = null;
				if (hasNormalXP) {
					levelContext = this._buildLevelContext(actionDetails, gameData);
					const speedContent = document.createElement("div");
					speedContent.style.cssText = `
                color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
                font-size: 0.9em;
                line-height: 1.6;
            `;
					const speedLines = [];
					const isTaskAction = actionDetails.hrid && src_core_data_manager_js.default.isTaskAction(actionDetails.hrid);
					const taskSpeedBonus = isTaskAction ? src_core_data_manager_js.default.getTaskSpeedBonus() : 0;
					const timeAfterEquipment = baseTime / (1 + speedBonus);
					const displayTimeAfterEquipment = Math.max(src_utils_profit_constants_js.MIN_ACTION_TIME_SECONDS, timeAfterEquipment);
					const equipmentClampSuffix = timeAfterEquipment < src_utils_profit_constants_js.MIN_ACTION_TIME_SECONDS ? ` (${timeAfterEquipment.toFixed(2)}s)` : "";
					speedLines.push(`${(0, src_core_i18n_js.t)("Base:")} ${baseTime.toFixed(2)}s → ${displayTimeAfterEquipment.toFixed(2)}s${equipmentClampSuffix}`);
					if (speedBonus > 0) speedLines.push(`${(0, src_core_i18n_js.t)("Speed:")} +${(0, src_utils_formatters_js.formatPercentage)(speedBonus, 1)} | ${(0, src_utils_profit_helpers_js.calculateActionsPerHour)(timeAfterEquipment).toFixed(0)}/hr`);
					else speedLines.push(`${(0, src_utils_profit_helpers_js.calculateActionsPerHour)(timeAfterEquipment).toFixed(0)}/hr`);
					const speedBreakdown = this.calculateSpeedBreakdown(actionDetails, equipment, itemDetailMap);
					if (speedBreakdown.total > 0) {
						for (const item of speedBreakdown.equipmentAndTools) {
							const enhText = item.enhancementLevel > 0 ? ` +${item.enhancementLevel}` : "";
							const detailText = item.enhancementBonus > 0 ? ` (${(0, src_utils_formatters_js.formatPercentage)(item.baseBonus, 1)} + ${(0, src_utils_formatters_js.formatPercentage)(item.enhancementBonus * item.enhancementLevel, 1)})` : "";
							speedLines.push(`  - ${item.itemName}${enhText}: +${(0, src_utils_formatters_js.formatPercentage)(item.scaledBonus, 1)}${detailText}`);
						}
						for (const item of speedBreakdown.consumables) {
							const detailText = item.drinkConcentration > 0 ? ` (${item.baseSpeed.toFixed(2)}% × ${(1 + item.drinkConcentration / 100).toFixed(2)})` : "";
							speedLines.push(`  - ${item.name}: +${item.speed.toFixed(2)}%${detailText}`);
						}
						if (personalSpeedBonus > 0) {
							const simSprite = src_core_data_manager_js.default.isBuffBeingSimulated(actionDetails.type, "/buff_types/action_speed") ? scrollSpriteHtml("/buff_types/action_speed") : "";
							speedLines.push(`  - ${simSprite}Scroll of Action Speed: +${(0, src_utils_formatters_js.formatPercentage)(personalSpeedBonus, 1)}`);
						}
						if (speedBreakdown.guild > 0) speedLines.push(`  - Guild Shrine: +${speedBreakdown.guild.toFixed(1)}%`);
					}
					if (isTaskAction && taskSpeedBonus > 0) {
						speedLines.push("");
						speedLines.push(`<span style="font-weight: 500;">${(0, src_core_i18n_js.t)("Task Speed (multiplicative):")} +${taskSpeedBonus.toFixed(2)}%</span>`);
						speedLines.push(`${displayTimeAfterEquipment.toFixed(2)}s${equipmentClampSuffix} → ${actionTime.toFixed(2)}s | ${(0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime).toFixed(0)}/hr`);
						const trinketSlot = equipment.get("/item_locations/trinket");
						if (trinketSlot && trinketSlot.itemHrid) {
							const itemDetails = itemDetailMap[trinketSlot.itemHrid];
							if (itemDetails) {
								const enhText = trinketSlot.enhancementLevel > 0 ? ` +${trinketSlot.enhancementLevel}` : "";
								const baseTaskSpeed = itemDetails.equipmentDetail?.noncombatStats?.taskSpeed || 0;
								const enhancementBonus = itemDetails.equipmentDetail?.noncombatEnhancementBonuses?.taskSpeed || 0;
								const enhancementLevel = trinketSlot.enhancementLevel || 0;
								const detailText = enhancementBonus > 0 ? ` (${(baseTaskSpeed * 100).toFixed(2)}% + ${(enhancementBonus * enhancementLevel * 100).toFixed(2)}%)` : "";
								speedLines.push(`  - ${itemDetails.name}${enhText}: +${taskSpeedBonus.toFixed(2)}%${detailText}`);
							}
						}
					}
					speedLines.push("");
					speedLines.push(`<span style="font-weight: 500; color: var(--text-color-primary, ${src_core_config_js.default.COLOR_TEXT_PRIMARY});">${(0, src_core_i18n_js.t)("Efficiency:")} +${totalEfficiency.toFixed(2)}% → ${(0, src_core_i18n_js.t)("Output: ×{0}", efficiencyMultiplier.toFixed(2))} (${Math.round((0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime) * efficiencyMultiplier)}/hr)</span>`);
					if (efficiencyBreakdown.levelEfficiency > 0 || efficiencyBreakdown.actionLevelBreakdown && efficiencyBreakdown.actionLevelBreakdown.length > 0) {
						const rawLevelDelta = efficiencyBreakdown.skillLevel - efficiencyBreakdown.baseRequirement;
						speedLines.push(`  - ${(0, src_core_i18n_js.t)("Level:")} +${efficiencyBreakdown.levelEfficiency.toFixed(2)}%`);
						speedLines.push(`    - Raw level delta: +${rawLevelDelta.toFixed(2)}% (${efficiencyBreakdown.skillLevel} - ${efficiencyBreakdown.baseRequirement} base requirement)`);
						if (efficiencyBreakdown.actionLevelBreakdown && efficiencyBreakdown.actionLevelBreakdown.length > 0) for (const tea of efficiencyBreakdown.actionLevelBreakdown) {
							const baseTeaImpact = -tea.baseActionLevel;
							speedLines.push(`    - ${tea.name} impact: ${baseTeaImpact.toFixed(2)}% (raises requirement)`);
							if (tea.dcContribution > 0) {
								const dcImpact = -tea.dcContribution;
								speedLines.push(`      - ${(0, src_core_i18n_js.t)("Drink Concentration: ")}${dcImpact.toFixed(2)}%`);
							}
						}
					}
					if (efficiencyBreakdown.houseEfficiency > 0) {
						const houseRoomName = this.getHouseRoomName(actionDetails.type);
						speedLines.push(`  - ${(0, src_core_i18n_js.t)("House:")} +${efficiencyBreakdown.houseEfficiency.toFixed(2)}% (${houseRoomName})`);
					}
					if (efficiencyBreakdown.equipmentEfficiency > 0) speedLines.push(`  - ${(0, src_core_i18n_js.t)("Equipment:")} +${efficiencyBreakdown.equipmentEfficiency.toFixed(2)}%`);
					if (efficiencyBreakdown.achievementEfficiency > 0) speedLines.push(`  - ${(0, src_core_i18n_js.t)("Achievement:")} +${efficiencyBreakdown.achievementEfficiency.toFixed(2)}%`);
					if (efficiencyBreakdown.teaBreakdown && efficiencyBreakdown.teaBreakdown.length > 0) for (const tea of efficiencyBreakdown.teaBreakdown) {
						speedLines.push(`  - ${tea.name}: +${tea.baseEfficiency.toFixed(2)}%`);
						if (tea.dcContribution > 0) speedLines.push(`    - ${(0, src_core_i18n_js.t)("Drink Concentration: ")}${tea.dcContribution.toFixed(2)}%`);
					}
					if (efficiencyBreakdown.communityEfficiency > 0) {
						const communityBuffLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/production_efficiency");
						speedLines.push(`  - Community: +${efficiencyBreakdown.communityEfficiency.toFixed(2)}% (Production Efficiency T${communityBuffLevel})`);
					}
					if (efficiencyBreakdown.personalEfficiency > 0) {
						const simSprite = src_core_data_manager_js.default.isBuffBeingSimulated(actionDetails.type, "/buff_types/efficiency") ? scrollSpriteHtml("/buff_types/efficiency") : "";
						speedLines.push(`  - ${simSprite}Seal: +${efficiencyBreakdown.personalEfficiency.toFixed(2)}%`);
					}
					if (efficiencyBreakdown.guildEfficiency > 0) speedLines.push(`  - Guild Shrine: +${efficiencyBreakdown.guildEfficiency.toFixed(2)}%`);
					const totalTimeLine = document.createElement("div");
					totalTimeLine.style.cssText = `
                color: var(--text-color-main, ${src_core_config_js.default.COLOR_INFO});
                font-weight: 500;
                margin-top: 4px;
            `;
					const computeTotalSeconds = (queueCount) => levelContext ? computeProgressiveQueueTime(queueCount, levelContext, totalEfficiency, actionTime) : Math.ceil(queueCount / efficiencyMultiplier) * actionTime;
					const updateTotalTime = () => {
						const inputValue = numberInput.value;
						if (inputValue === "∞") {
							totalTimeLine.textContent = (0, src_core_i18n_js.t)("Total time: ∞");
							return;
						}
						const queueCount = parseInt(inputValue) || 0;
						if (queueCount > 0) {
							const totalSeconds = computeTotalSeconds(queueCount);
							totalTimeLine.textContent = (0, src_core_i18n_js.t)("Total time: {0}", (0, src_utils_formatters_js.timeReadableZh)(totalSeconds));
						} else totalTimeLine.textContent = (0, src_core_i18n_js.t)("Total time: 0s");
					};
					speedLines.push("");
					speedContent.innerHTML = speedLines.join("<br>");
					speedContent.appendChild(totalTimeLine);
					updateTotalTime();
					let inputObserverCleanup = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(numberInput, () => {
						updateTotalTime();
					}, {
						attributes: true,
						attributeFilter: ["value"]
					}, {
						debounce: true,
						debounceDelay: 150
					});
					this.cleanupRegistry.registerCleanup(() => {
						if (inputObserverCleanup) {
							inputObserverCleanup();
							inputObserverCleanup = null;
						}
					});
					const updateOnInput = () => updateTotalTime();
					const updateOnChange = () => updateTotalTime();
					const updateOnClick = () => {
						const clickTimeout = setTimeout(updateTotalTime, 50);
						this.cleanupRegistry.registerTimeout(clickTimeout);
					};
					numberInput.addEventListener("input", updateOnInput);
					numberInput.addEventListener("change", updateOnChange);
					panel.addEventListener("click", updateOnClick);
					this.cleanupRegistry.registerListener(numberInput, "input", updateOnInput);
					this.cleanupRegistry.registerListener(numberInput, "change", updateOnChange);
					this.cleanupRegistry.registerListener(panel, "click", updateOnClick);
					const actionsPerHourWithEfficiency = Math.round((0, src_utils_profit_helpers_js.calculateEffectiveActionsPerHour)((0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime), efficiencyMultiplier));
					const initialSummary = (0, src_core_i18n_js.t)("{0}/hr | Total time: 0s", actionsPerHourWithEfficiency);
					speedSection = (0, src_utils_ui_components_js.createCollapsibleSection)("⏱", (0, src_core_i18n_js.t)("Action Speed & Time"), initialSummary, speedContent, false);
					const speedSummaryDiv = speedSection.querySelector(".mwi-section-header + div");
					const originalUpdateTotalTime = updateTotalTime;
					const enhancedUpdateTotalTime = () => {
						originalUpdateTotalTime();
						if (speedSummaryDiv) {
							const inputValue = numberInput.value;
							if (inputValue === "∞") speedSummaryDiv.textContent = (0, src_core_i18n_js.t)("{0}/hr | Total time: ∞", actionsPerHourWithEfficiency);
							else {
								const queueCount = parseInt(inputValue) || 0;
								if (queueCount > 0) {
									const totalSeconds = computeTotalSeconds(queueCount);
									speedSummaryDiv.textContent = (0, src_core_i18n_js.t)("{0}/hr | Total time: {1}", actionsPerHourWithEfficiency, (0, src_utils_formatters_js.timeReadableZh)(totalSeconds));
								} else speedSummaryDiv.textContent = (0, src_core_i18n_js.t)("{0}/hr | Total time: 0s", actionsPerHourWithEfficiency);
							}
						}
					};
					if (inputObserverCleanup) {
						inputObserverCleanup();
						inputObserverCleanup = null;
					}
					const newInputObserverCleanup = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(numberInput, () => {
						enhancedUpdateTotalTime();
					}, {
						attributes: true,
						attributeFilter: ["value"]
					}, {
						debounce: true,
						debounceDelay: 150
					});
					this.cleanupRegistry.registerCleanup(() => {
						newInputObserverCleanup();
					});
					numberInput.removeEventListener("input", updateOnInput);
					numberInput.removeEventListener("change", updateOnChange);
					panel.removeEventListener("click", updateOnClick);
					const updateOnInputEnhanced = () => enhancedUpdateTotalTime();
					const updateOnChangeEnhanced = () => enhancedUpdateTotalTime();
					const updateOnClickEnhanced = () => {
						const clickTimeout = setTimeout(enhancedUpdateTotalTime, 50);
						this.cleanupRegistry.registerTimeout(clickTimeout);
					};
					numberInput.addEventListener("input", updateOnInputEnhanced);
					numberInput.addEventListener("change", updateOnChangeEnhanced);
					panel.addEventListener("click", updateOnClickEnhanced);
					this.cleanupRegistry.registerListener(numberInput, "input", updateOnInputEnhanced);
					this.cleanupRegistry.registerListener(numberInput, "change", updateOnChangeEnhanced);
					this.cleanupRegistry.registerListener(panel, "click", updateOnClickEnhanced);
					enhancedUpdateTotalTime();
				}
				const levelProgressSection = this.createLevelProgressSection(actionDetails, actionTime, gameData, numberInput, totalEfficiency, levelContext);
				let queueContent = null;
				if (hasNormalXP) {
					queueContent = document.createElement("div");
					queueContent.style.cssText = `
                    color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
                    font-size: 0.9em;
                    margin-top: 8px;
                    margin-bottom: 8px;
                `;
					queueContent.appendChild(document.createTextNode((0, src_core_i18n_js.t)("Do ")));
					this._parsePresets(src_core_config_js.default.getSettingValue("actionPanel_quickInputs_hourPresets", ""), [
						.5,
						1,
						2,
						3,
						4,
						5,
						6,
						10,
						12,
						24
					]).forEach((hours) => {
						const button = this.createButton(this._formatHoursLabel(hours), () => {
							const baseActions = hours * 60 * 60 / actionTime;
							const actionCount = Math.round(baseActions * efficiencyMultiplier);
							this.setInputValue(numberInput, actionCount);
						});
						queueContent.appendChild(button);
					});
					queueContent.appendChild(document.createTextNode(" "));
					queueContent.appendChild(document.createElement("div"));
					queueContent.appendChild(this._createCountPresetRow(panel, numberInput, gameData, actionDetails));
				} else {
					queueContent = document.createElement("div");
					queueContent.style.cssText = `
                    color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
                    font-size: 0.9em;
                    margin-top: 8px;
                    margin-bottom: 8px;
                `;
					queueContent.appendChild(this._createCountPresetRow(panel, numberInput, gameData, actionDetails));
				}
				const hideSpeedTime = !src_core_config_js.default.getSetting("actionPanel_showSpeedTime");
				const hideLevelProgress = !src_core_config_js.default.getSetting("actionPanel_showLevelProgress");
				inputContainer.insertAdjacentElement("afterend", queueContent);
				let lastInserted = queueContent;
				if (speedSection && !hideSpeedTime) {
					lastInserted.insertAdjacentElement("afterend", speedSection);
					lastInserted = speedSection;
				}
				if (levelProgressSection && !hideLevelProgress) lastInserted.insertAdjacentElement("afterend", levelProgressSection);
				const actionContainer = inputContainer.parentElement;
				const regularComponent = actionContainer?.closest("[class*=\"SkillActionDetail_regularComponent\"]");
				if (actionContainer && regularComponent) {
					const contentEl = regularComponent.querySelector("[class*=\"SkillActionDetail_content\"]");
					if (contentEl) contentEl.style.overflow = "visible";
					actionContainer.style.maxHeight = "";
					actionContainer.style.overflowY = "";
					const maxH = Math.max(300, Math.floor(window.innerHeight * .96 - 20));
					regularComponent.style.maxHeight = maxH + "px";
					regularComponent.style.overflowY = "auto";
				}
			} catch (error) {
				console.error("[Toolasha] Error injecting quick input buttons:", error);
			} finally {
				if (actionDetails?.type) src_core_data_manager_js.default.clearScrollSimulation(actionDetails.type);
			}
		}
		/**
		* Disable quick input buttons and cleanup observers/listeners
		*/
		disable() {
			this.cleanupRegistry.cleanupAll();
			if (this._modalObserver) {
				this._modalObserver.disconnect();
				this._modalObserver = null;
			}
			document.querySelectorAll(".mwi-collapsible-section").forEach((section) => section.remove());
			document.querySelectorAll(".mwi-quick-input-btn").forEach((button) => button.remove());
			document.querySelectorAll("[class*=\"SkillActionDetail_regularComponent\"]").forEach((el) => {
				el.style.maxHeight = "";
				el.style.overflowY = "";
				const content = el.querySelector("[class*=\"SkillActionDetail_content\"]");
				if (content) content.style.overflow = "";
			});
			this.isInitialized = false;
		}
		/**
		* Get action details by name
		* @param {string} actionName - Display name of the action
		* @param {Object} gameData - Cached game data from dataManager
		* @returns {Object|null} Action details or null if not found
		*/
		getActionDetailsByName(actionName, gameData) {
			const hrid = getActionHridFromName(actionName);
			if (!hrid) return null;
			const details = gameData?.actionDetailMap?.[hrid];
			if (!details) return null;
			return {
				...details,
				hrid
			};
		}
		/**
		* Calculate action time and efficiency for current character state
		* Uses shared calculator with community buffs and detailed breakdown
		* @param {Object} actionDetails - Action details from game data
		* @param {Object} gameData - Cached game data from dataManager
		* @returns {Object} {actionTime, totalEfficiency, efficiencyBreakdown}
		*/
		calculateActionMetrics(actionDetails, gameData) {
			const equipment = src_core_data_manager_js.default.getEquipment();
			const skills = src_core_data_manager_js.default.getSkills();
			const itemDetailMap = gameData?.itemDetailMap || {};
			const stats = (0, src_utils_action_calculator_js.calculateActionStats)(actionDetails, {
				skills,
				equipment,
				itemDetailMap,
				actionHrid: actionDetails.hrid,
				includeCommunityBuff: true,
				includeBreakdown: true
			});
			if (!stats) return {
				actionTime: 1,
				totalEfficiency: 0,
				efficiencyBreakdown: {
					levelEfficiency: 0,
					houseEfficiency: 0,
					equipmentEfficiency: 0,
					teaEfficiency: 0,
					teaBreakdown: [],
					communityEfficiency: 0,
					achievementEfficiency: 0,
					skillLevel: 1,
					baseRequirement: 1,
					actionLevelBonus: 0,
					actionLevelBreakdown: [],
					effectiveRequirement: 1
				}
			};
			return stats;
		}
		/**
		* Get house room name for an action type
		* @param {string} actionType - Action type HRID
		* @returns {string} House room name with level
		*/
		getHouseRoomName(actionType) {
			const houseRooms = src_core_data_manager_js.default.getHouseRooms();
			const roomHrid = {
				"/action_types/cheesesmithing": "/house_rooms/forge",
				"/action_types/cooking": "/house_rooms/kitchen",
				"/action_types/crafting": "/house_rooms/workshop",
				"/action_types/foraging": "/house_rooms/garden",
				"/action_types/milking": "/house_rooms/dairy_barn",
				"/action_types/tailoring": "/house_rooms/sewing_parlor",
				"/action_types/woodcutting": "/house_rooms/log_shed",
				"/action_types/brewing": "/house_rooms/brewery"
			}[actionType];
			if (!roomHrid) return (0, src_core_i18n_js.t)("Unknown Room");
			const room = houseRooms.get(roomHrid);
			return `${getHouseRoomDisplayName(roomHrid)} level ${room?.level || 0}`;
		}
		/**
		* Calculate speed breakdown from all sources
		* @param {Object} actionData - Action data
		* @param {Map} equipment - Equipment map
		* @param {Object} itemDetailMap - Item detail map from game data
		* @returns {Object} Speed breakdown by source
		*/
		calculateSpeedBreakdown(actionData, equipment, itemDetailMap) {
			const breakdown = {
				equipmentAndTools: [],
				consumables: [],
				total: 0
			};
			const allSpeedBonuses = (0, src_utils_equipment_parser_js.debugEquipmentSpeedBonuses)(equipment, itemDetailMap);
			const skillSpecificSpeed = actionData.type.replace("/action_types/", "") + "Speed";
			const relevantSpeeds = allSpeedBonuses.filter((item) => {
				return item.speedType === skillSpecificSpeed || item.speedType === "skillingSpeed";
			});
			for (const item of relevantSpeeds) {
				breakdown.equipmentAndTools.push(item);
				breakdown.total += item.scaledBonus * 100;
			}
			const consumableSpeed = this.getConsumableSpeed(actionData, equipment, itemDetailMap);
			breakdown.consumables = consumableSpeed;
			breakdown.total += consumableSpeed.reduce((sum, c) => sum + c.speed, 0);
			const guildSpeed = (src_core_data_manager_js.default.characterData?.guildActionTypeBuffsMap?.[actionData.type] || []).reduce((sum, b) => b.typeHrid === "/buff_types/action_speed" ? sum + (b.flatBoost || 0) + (b.ratioBoost || 0) : sum, 0) * 100;
			if (guildSpeed > 0) {
				breakdown.guild = guildSpeed;
				breakdown.total += guildSpeed;
			}
			return breakdown;
		}
		/**
		* Get consumable speed bonuses (Enhancing Teas only)
		* @param {Object} actionData - Action data
		* @param {Map} equipment - Equipment map
		* @param {Object} itemDetailMap - Item detail map
		* @returns {Array} Consumable speed info
		*/
		getConsumableSpeed(actionData, equipment, itemDetailMap) {
			const actionType = actionData.type;
			const drinkSlots = src_core_data_manager_js.default.getActionDrinkSlots(actionType);
			if (!drinkSlots || drinkSlots.length === 0) return [];
			const consumables = [];
			if (actionType === "/action_types/combat") return consumables;
			const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
			const enhancingTeas = {
				"/items/enhancing_tea": {
					name: "Enhancing Tea",
					baseSpeed: .02
				},
				"/items/super_enhancing_tea": {
					name: "Super Enhancing Tea",
					baseSpeed: .04
				},
				"/items/ultra_enhancing_tea": {
					name: "Ultra Enhancing Tea",
					baseSpeed: .06
				}
			};
			for (const drink of drinkSlots) {
				if (!drink || !drink.itemHrid) continue;
				const teaInfo = enhancingTeas[drink.itemHrid];
				if (teaInfo) {
					const scaledSpeed = teaInfo.baseSpeed * (1 + drinkConcentration);
					consumables.push({
						name: teaInfo.name,
						baseSpeed: teaInfo.baseSpeed * 100,
						drinkConcentration: drinkConcentration * 100,
						speed: scaledSpeed * 100
					});
				}
			}
			return consumables;
		}
		/**
		* Create a quick input button
		* @param {string} label - Button label
		* @param {Function} onClick - Click handler
		* @returns {HTMLElement} Button element
		*/
		createButton(label, onClick) {
			const button = document.createElement("button");
			button.textContent = label;
			button.className = "mwi-quick-input-btn";
			button.style.cssText = `
            background-color: white;
            color: black;
            padding: 1px 6px;
            margin: 1px;
            border: 1px solid #ccc;
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.9em;
        `;
			button.addEventListener("mouseenter", () => {
				button.style.backgroundColor = "#f0f0f0";
			});
			button.addEventListener("mouseleave", () => {
				button.style.backgroundColor = "white";
			});
			button.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			});
			return button;
		}
		/**
		* Set input value using React utility
		* @param {HTMLInputElement} input - Number input element
		* @param {number} value - Value to set
		*/
		setInputValue(input, value) {
			(0, src_utils_react_input_js.setReactInputValue)(input, value, { focus: true });
		}
		/**
		* Calculate maximum possible value based on inventory
		* @param {HTMLElement} panel - Action panel element
		* @param {Object} actionDetails - Action details from game data
		* @param {Object} gameData - Cached game data from dataManager
		* @returns {number|string} Maximum value (number for production, '∞' for gathering)
		*/
		calculateMaxValue(panel, actionDetails, gameData) {
			try {
				if (!actionDetails.inputItems && !actionDetails.upgradeItemHrid) return "∞";
				const inventory = src_core_data_manager_js.default.getInventory();
				if (!inventory) return 0;
				const equipment = src_core_data_manager_js.default.getEquipment();
				const itemDetailMap = gameData?.itemDetailMap || {};
				const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
				const activeDrinks = src_core_data_manager_js.default.getActionDrinkSlots(actionDetails.type);
				const artisanBonus = (0, src_utils_tea_parser_js.parseArtisanBonus)(activeDrinks, itemDetailMap, drinkConcentration);
				let maxActions = Infinity;
				if (actionDetails.upgradeItemHrid) {
					const availableAmount = inventory.find((item) => item.itemHrid === actionDetails.upgradeItemHrid && item.enhancementLevel === 0)?.count || 0;
					const materialsPerAction = 1;
					{
						const possibleActions = Math.floor(availableAmount / materialsPerAction);
						maxActions = Math.min(maxActions, possibleActions);
					}
				}
				if (actionDetails.inputItems && actionDetails.inputItems.length > 0) for (const input of actionDetails.inputItems) {
					const availableAmount = inventory.filter((item) => item.itemHrid === input.itemHrid).reduce((total, item) => total + (item.count || 0), 0);
					const materialsPerAction = input.count * (1 - artisanBonus);
					if (materialsPerAction > 0) {
						const possibleActions = Math.floor(availableAmount / materialsPerAction);
						maxActions = Math.min(maxActions, possibleActions);
					}
				}
				if (maxActions === Infinity) return 0;
				return maxActions;
			} catch (error) {
				console.error("[Toolasha] Error calculating max value:", error);
				return 1e4;
			}
		}
		/**
		* Get character skill level for a skill type
		* @param {Array} skills - Character skills array
		* @param {string} skillType - Skill type HRID (e.g., "/action_types/cheesesmithing")
		* @returns {number} Skill level
		*/
		getSkillLevel(skills, skillType) {
			const skillHrid = skillType.replace("/action_types/", "/skills/");
			const skill = skills.find((s) => s.skillHrid === skillHrid);
			if (!skill) console.error(`[QuickInputButtons] Skill not found: ${skillHrid}`);
			return skill?.level || 1;
		}
		/**
		* Build the level context object needed for level progress display and progressive time estimation.
		* Returns null if the action has no XP gain, the player is at max level, or required data is missing.
		* @param {Object} actionDetails
		* @param {Object} gameData
		* @returns {Object|null}
		*/
		_buildLevelContext(actionDetails, gameData) {
			const experienceGain = actionDetails.experienceGain;
			if (!experienceGain || !experienceGain.skillHrid || experienceGain.value <= 0) return null;
			const skillHrid = experienceGain.skillHrid;
			const skills = src_core_data_manager_js.default.getSkills();
			if (!skills) return null;
			const skill = skills.find((s) => s.skillHrid === skillHrid);
			if (!skill) return null;
			const levelExperienceTable = gameData?.levelExperienceTable;
			if (!levelExperienceTable) return null;
			const currentLevel = skill.level;
			const currentXP = skill.experience || 0;
			if (!levelExperienceTable[currentLevel + 1]) return null;
			const xpData = (0, src_utils_experience_parser_js.calculateExperienceMultiplier)(skillHrid, actionDetails.type);
			const baseXP = experienceGain.value;
			return {
				skillHrid,
				skill,
				currentLevel,
				currentXP,
				levelExperienceTable,
				xpData,
				baseXP,
				modifiedXP: baseXP * xpData.totalMultiplier
			};
		}
		/**
		* Create level progress section
		* @param {Object} actionDetails - Action details from game data
		* @param {number} actionTime - Time per action in seconds
		* @param {Object} gameData - Cached game data from dataManager
		* @param {HTMLInputElement} numberInput - Queue input element
		* @param {number} totalEfficiency - Current efficiency percentage
		* @param {Object|null} levelContext - Pre-computed from _buildLevelContext; null returns null
		* @returns {HTMLElement|null} Level progress section or null if not applicable
		*/
		createLevelProgressSection(actionDetails, actionTime, gameData, numberInput, totalEfficiency, levelContext) {
			try {
				if (!levelContext) return null;
				const { currentLevel, currentXP, levelExperienceTable, xpData, baseXP, modifiedXP } = levelContext;
				const nextLevel = currentLevel + 1;
				const xpForNextLevel = levelExperienceTable[nextLevel];
				const xpForCurrentLevel = levelExperienceTable[currentLevel] || 0;
				const progressPercent = (currentXP - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel) * 100;
				const xpNeeded = xpForNextLevel - currentXP;
				const actionsNeeded = Math.ceil(xpNeeded / modifiedXP);
				const xpPerHour = (0, src_utils_experience_calculator_js.calculateExpPerHour)(actionDetails.hrid)?.expPerHour || (actionsNeeded > 0 ? (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime) * modifiedXP : 0);
				const xpPerDay = xpPerHour * 24;
				const content = document.createElement("div");
				content.style.cssText = `
                color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
                font-size: 0.9em;
                line-height: 1.6;
            `;
				const lines = [];
				lines.push(`Current: Level ${currentLevel} | ${progressPercent.toFixed(2)}% to Level ${nextLevel}`);
				lines.push("");
				lines.push(`${(0, src_core_i18n_js.t)("XP per action: {0} base → {1} (×{2})", (0, src_utils_formatters_js.formatWithSeparator)(baseXP.toFixed(2)), (0, src_utils_formatters_js.formatWithSeparator)(modifiedXP.toFixed(2)), xpData.totalMultiplier.toFixed(2))}`);
				if (xpData.totalWisdom > 0 || xpData.charmExperience > 0) {
					const totalXPBonus = xpData.totalWisdom + xpData.charmExperience;
					lines.push(`  ${(0, src_core_i18n_js.t)("Total XP Bonus: +{0}", totalXPBonus.toFixed(2))}`);
					if (xpData.charmBreakdown && xpData.charmBreakdown.length > 0) for (const item of xpData.charmBreakdown) {
						const enhText = item.enhancementLevel > 0 ? ` +${item.enhancementLevel}` : "";
						lines.push(`    • ${item.name}${enhText}: +${item.value.toFixed(2)}%`);
					}
					if (xpData.wisdomBreakdown && xpData.wisdomBreakdown.length > 0) for (const item of xpData.wisdomBreakdown) {
						const enhText = item.enhancementLevel > 0 ? ` +${item.enhancementLevel}` : "";
						lines.push(`    • ${item.name}${enhText}: +${item.value.toFixed(2)}%`);
					}
					if (xpData.breakdown.houseWisdom > 0) lines.push(`    • House Rooms: +${xpData.breakdown.houseWisdom.toFixed(2)}%`);
					if (xpData.breakdown.communityWisdom > 0) lines.push(`    • Community Buff: +${xpData.breakdown.communityWisdom.toFixed(2)}%`);
					if (xpData.breakdown.consumableWisdom > 0) lines.push(`    • Wisdom Tea: +${xpData.breakdown.consumableWisdom.toFixed(2)}%`);
					if (xpData.breakdown.achievementWisdom > 0) lines.push(`    • Achievement: +${xpData.breakdown.achievementWisdom.toFixed(2)}%`);
					if (xpData.breakdown.mooPassWisdom > 0) lines.push(`    • MooPass: +${xpData.breakdown.mooPassWisdom.toFixed(2)}%`);
					if (xpData.breakdown.personalWisdom > 0) {
						const simSprite = src_core_data_manager_js.default.isBuffBeingSimulated(actionDetails.type, "/buff_types/wisdom") ? scrollSpriteHtml("/buff_types/wisdom") : "";
						lines.push(`    • ${simSprite}Scroll of Wisdom: +${xpData.breakdown.personalWisdom.toFixed(2)}%`);
					}
					if (xpData.breakdown.guildWisdom > 0) lines.push(`    • Guild Shrine: +${xpData.breakdown.guildWisdom.toFixed(2)}%`);
				}
				lines.push("");
				const singleLevel = (0, src_utils_experience_calculator_js.calculateMultiLevelProgress)(currentLevel, currentXP, nextLevel, totalEfficiency, actionTime, modifiedXP, levelExperienceTable);
				lines.push(`<span style="font-weight: 500; color: var(--text-color-primary, ${src_core_config_js.default.COLOR_TEXT_PRIMARY});">${(0, src_core_i18n_js.t)("To Level {0}:", nextLevel)}</span>`);
				lines.push(`  Actions: ${(0, src_utils_formatters_js.formatWithSeparator)(singleLevel.actionsNeeded)}`);
				lines.push(`  Time: ${(0, src_utils_formatters_js.timeReadableZh)(singleLevel.timeNeeded)}`);
				lines.push("");
				const savedTargetLevel = this._targetLevelByAction.get(actionDetails.hrid);
				const initialTargetLevel = savedTargetLevel && savedTargetLevel > currentLevel ? savedTargetLevel : nextLevel;
				lines.push(`<span style="font-weight: 500; color: var(--text-color-primary, ${src_core_config_js.default.COLOR_TEXT_PRIMARY});">${(0, src_core_i18n_js.t)("Target Level Calculator:")}</span>`);
				lines.push(`<div style="margin-top: 4px;">
                <span>To level </span>
                <input
                    type="number"
                    id="mwi-target-level-input"
                    value="${initialTargetLevel}"
                    min="${nextLevel}"
                    max="200"
                    style="
                        width: 50px;
                        padding: 2px 4px;
                        background: var(--background-secondary, #2a2a2a);
                        color: var(--text-color-primary, ${src_core_config_js.default.COLOR_TEXT_PRIMARY});
                        border: 1px solid var(--border-color, ${src_core_config_js.default.COLOR_BORDER});
                        border-radius: 3px;
                        font-size: 0.9em;
                    "
                >
                <span>:</span>
            </div>`);
				lines.push(`<div id="mwi-target-level-result" style="margin-top: 4px; margin-left: 8px;">
                ${(0, src_utils_formatters_js.formatWithSeparator)(singleLevel.actionsNeeded)} actions | ${(0, src_utils_formatters_js.timeReadableZh)(singleLevel.timeNeeded)}
            </div>`);
				lines.push("");
				lines.push(`${(0, src_core_i18n_js.t)("XP/hour: {0}", (0, src_utils_formatters_js.formatWithSeparator)(Math.round(xpPerHour)))} | ${(0, src_core_i18n_js.t)("XP/day: {0}", (0, src_utils_formatters_js.formatWithSeparator)(Math.round(xpPerDay)))}`);
				content.innerHTML = lines.join("<br>");
				const targetLevelInput = content.querySelector("#mwi-target-level-input");
				const targetLevelResult = content.querySelector("#mwi-target-level-result");
				const updateTargetLevel = () => {
					const targetLevel = parseInt(targetLevelInput.value);
					this._targetLevelByAction.set(actionDetails.hrid, targetLevel);
					if (targetLevel > currentLevel && targetLevel <= 200) {
						const result = (0, src_utils_experience_calculator_js.calculateMultiLevelProgress)(currentLevel, currentXP, targetLevel, totalEfficiency, actionTime, modifiedXP, levelExperienceTable);
						targetLevelResult.innerHTML = `
                        ${(0, src_utils_formatters_js.formatWithSeparator)(result.actionsNeeded)} actions | ${(0, src_utils_formatters_js.timeReadableZh)(result.timeNeeded)}
                    `;
						targetLevelResult.style.color = "var(--text-color-primary, ${config.COLOR_TEXT_PRIMARY})";
						this.setInputValue(numberInput, result.actionsNeeded);
					} else {
						targetLevelResult.textContent = (0, src_core_i18n_js.t)("Invalid level");
						targetLevelResult.style.color = "var(--color-error, #ff4444)";
					}
				};
				targetLevelInput.addEventListener("input", updateTargetLevel);
				targetLevelInput.addEventListener("change", updateTargetLevel);
				if (initialTargetLevel !== nextLevel) updateTargetLevel();
				const summary = `${(0, src_utils_formatters_js.timeReadableZh)(singleLevel.timeNeeded)} to Level ${nextLevel}`;
				return (0, src_utils_ui_components_js.createCollapsibleSection)("📈", (0, src_core_i18n_js.t)("Level Progress"), summary, content, false);
			} catch (error) {
				console.error("[Toolasha] Error creating level progress section:", error);
				return null;
			}
		}
	};
	var quickInputButtons = new QuickInputButtons();
	//#endregion
	//#region src/features/actions/output-totals.js
	/**
	* Output Totals Display Module
	*
	* Shows total expected outputs below per-action outputs when user enters
	* a quantity in the action input box.
	*
	* Example:
	* - Game shows: "Outputs: 1.3 - 3.9 Flax"
	* - User enters: 100 actions
	* - Module shows: "130.0 - 390.0" below the per-action output
	*/
	var OutputTotals = class {
		constructor() {
			this.observedInputs = /* @__PURE__ */ new Map();
			this.unregisterObserver = null;
			this.isInitialized = false;
		}
		/**
		* Initialize the output totals display
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("actionPanel_outputTotals")) return;
			this.isInitialized = true;
			this.setupObserver();
		}
		/**
		* Setup DOM observer to watch for action detail panels
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("OutputTotals", "SkillActionDetail_skillActionDetail", (detailPanel) => {
				this.attachToActionPanel(detailPanel);
			}, {
				debounce: true,
				debounceDelay: 150
			});
		}
		/**
		* Attach input listener to an action panel
		* @param {HTMLElement} detailPanel - The action detail panel element
		*/
		attachToActionPanel(detailPanel) {
			const inputBox = (0, src_utils_action_panel_helper_js.findActionInput)(detailPanel);
			if (!inputBox) return;
			if (this.observedInputs.has(inputBox)) return;
			const cleanup = (0, src_utils_action_panel_helper_js.attachInputListeners)(detailPanel, inputBox, (_value) => {
				this.updateOutputTotals(detailPanel, inputBox);
			});
			this.observedInputs.set(inputBox, cleanup);
			(0, src_utils_action_panel_helper_js.performInitialUpdate)(inputBox, () => {
				this.updateOutputTotals(detailPanel, inputBox);
			});
		}
		/**
		* Extract alchemy success rate from the detail panel DOM.
		* @param {HTMLElement} detailPanel - The action detail panel
		* @returns {number} Success rate as decimal (0-1), or 1 if not an alchemy action
		*/
		getSuccessRate(detailPanel) {
			const el = detailPanel.querySelector("[class*=\"SkillActionDetail_successRate\"] [class*=\"SkillActionDetail_value\"]");
			if (!el) return 1;
			const match = el.textContent.trim().match(/([\d,.]+)%/);
			if (!match) return 1;
			return parseFloat(match[1].replace(",", ".")) / 100;
		}
		/**
		* Update output totals based on input value
		* @param {HTMLElement} detailPanel - The action detail panel
		* @param {HTMLInputElement} inputBox - The action count input
		*/
		updateOutputTotals(detailPanel, inputBox) {
			const amount = parseFloat(inputBox.value);
			detailPanel.querySelectorAll(".mwi-output-total").forEach((el) => el.remove());
			const isIndeterminate = isNaN(amount) || amount <= 0;
			const placeholderLabel = isNaN(amount) ? "∞" : "0.0";
			const successRate = this.getSuccessRate(detailPanel);
			let dropTable = detailPanel.querySelector("[class*=\"SkillActionDetail_dropTable\"]");
			if (!dropTable) return;
			const outputItems = detailPanel.querySelector("[class*=\"SkillActionDetail_outputItems\"]");
			if (outputItems) dropTable = outputItems;
			const processedContainers = /* @__PURE__ */ new Set();
			this.processDropContainer(dropTable, amount, isIndeterminate, placeholderLabel, successRate);
			processedContainers.add(dropTable);
			detailPanel.querySelectorAll("[class*=\"SkillActionDetail_dropTable\"]").forEach((container) => {
				if (processedContainers.has(container)) return;
				if (container.querySelector("[class*=\"essence\"]")) {
					this.processDropContainer(container, amount, isIndeterminate, placeholderLabel);
					processedContainers.add(container);
					return;
				}
				if (container.innerText.includes("%")) {
					const percentageMatch = container.innerText.match(/([\d.]+)%/);
					if (percentageMatch && parseFloat(percentageMatch[1]) < 5) {
						this.processDropContainer(container, amount, isIndeterminate, placeholderLabel);
						processedContainers.add(container);
					}
				}
			});
			this.processXpElement(detailPanel, amount, isIndeterminate, placeholderLabel);
		}
		/**
		* Process drop container (matches MWIT-E implementation)
		* @param {HTMLElement} container - The drop table container
		* @param {number} amount - Number of actions
		* @param {boolean} isIndeterminate - Whether the amount is indeterminate
		* @param {string} placeholderLabel - Placeholder text for indeterminate
		* @param {number} [successRate=1] - Success rate multiplier for main outputs
		*/
		processDropContainer(container, amount, isIndeterminate, placeholderLabel, successRate = 1) {
			if (!container) return;
			Array.from(container.children).forEach((child) => {
				if (child.nextSibling?.classList?.contains("mwi-output-total")) return;
				if (child.children.length > 1 && child.querySelector("[class*=\"SkillActionDetail_drop\"]")) child.querySelectorAll("[class*=\"SkillActionDetail_drop\"]").forEach((dropEl) => {
					if (dropEl.nextSibling?.classList?.contains("mwi-output-total")) return;
					const clone = this.processChildElement(dropEl, amount, isIndeterminate, placeholderLabel, successRate);
					if (clone) dropEl.after(clone);
				});
				else {
					const clone = this.processChildElement(child, amount, isIndeterminate, placeholderLabel, successRate);
					if (clone) child.parentNode.insertBefore(clone, child.nextSibling);
				}
			});
		}
		/**
		* Process a single child element and return clone with calculated total
		* @param {HTMLElement} child - The child element to process
		* @param {number} amount - Number of actions
		* @param {boolean} isIndeterminate - Whether the amount is indeterminate
		* @param {string} placeholderLabel - Placeholder text for indeterminate
		* @param {number} [successRate=1] - Success rate multiplier
		* @returns {HTMLElement|null} Clone element or null
		*/
		processChildElement(child, amount, isIndeterminate, placeholderLabel, successRate = 1) {
			const hasRange = child.children[0]?.innerText?.includes("-");
			const hasNumbers = child.children[0]?.innerText?.match(/[\d.]+/);
			const outputElement = hasRange || hasNumbers ? child.children[0] : null;
			if (!outputElement) return null;
			const rateMatch = child.innerText.match(/~?([\d.]+)%/);
			const dropRate = rateMatch ? parseFloat(rateMatch[1]) / 100 : 1;
			const clone = outputElement.cloneNode(true);
			clone.classList.add("mwi-output-total");
			const color = src_core_config_js.default.COLOR_TEXT_SECONDARY;
			clone.style.cssText = `
            color: ${color};
            font-weight: 600;
            margin-top: 2px;
        `;
			if (isIndeterminate) {
				clone.innerText = placeholderLabel;
				return clone;
			}
			const output = outputElement.innerText.split("-");
			if (output.length > 1) {
				const minOutput = parseFloat(output[0].trim());
				const maxOutput = parseFloat(output[1].trim());
				clone.innerText = `${(minOutput * amount * dropRate * successRate).toLocaleString(void 0, {
					minimumFractionDigits: 1,
					maximumFractionDigits: 1
				})} - ${(maxOutput * amount * dropRate * successRate).toLocaleString(void 0, {
					minimumFractionDigits: 1,
					maximumFractionDigits: 1
				})} (${((minOutput + maxOutput) / 2 * amount * dropRate * successRate).toLocaleString(void 0, {
					minimumFractionDigits: 1,
					maximumFractionDigits: 1
				}, {
					debounce: true,
					debounceDelay: 150
				})})`;
			} else clone.innerText = `${(parseFloat(output[0].trim()) * amount * dropRate * successRate).toLocaleString(void 0, {
				minimumFractionDigits: 1,
				maximumFractionDigits: 1
			})}`;
			return clone;
		}
		/**
		* Extract action HRID from detail panel
		* @param {HTMLElement} detailPanel - The action detail panel element
		* @returns {string|null} Action HRID or null
		*/
		getActionHridFromPanel(detailPanel) {
			const nameElement = detailPanel.querySelector("[class*=\"SkillActionDetail_name\"]");
			if (!nameElement) return null;
			return getActionHridFromName(nameElement.textContent.trim());
		}
		/**
		* Process XP element and display total XP
		* @param {HTMLElement} detailPanel - The action detail panel
		* @param {number} amount - Number of actions
		*/
		processXpElement(detailPanel, amount, isIndeterminate, placeholderLabel) {
			const xpElement = detailPanel.querySelector("[class*=\"SkillActionDetail_expGain\"]");
			if (!xpElement) return;
			const actionHrid = this.getActionHridFromPanel(detailPanel);
			if (!actionHrid) return;
			const actionDetails = src_core_data_manager_js.default.getActionDetails(actionHrid);
			if (!actionDetails || !actionDetails.experienceGain) return;
			const clone = xpElement.cloneNode(true);
			clone.classList.add("mwi-output-total");
			clone.style.cssText = `
            color: ${src_core_config_js.default.COLOR_TEXT_SECONDARY};
            font-weight: 600;
            margin-top: 2px;
        `;
			if (isIndeterminate) clone.childNodes[0].textContent = placeholderLabel;
			else {
				const skillHrid = actionDetails.experienceGain.skillHrid;
				const xpData = (0, src_utils_experience_parser_js.calculateExperienceMultiplier)(skillHrid, actionDetails.type);
				const totalXP = actionDetails.experienceGain.value * xpData.totalMultiplier * amount;
				clone.childNodes[0].textContent = totalXP.toLocaleString(void 0, {
					minimumFractionDigits: 1,
					maximumFractionDigits: 1
				});
			}
			xpElement.parentNode.insertBefore(clone, xpElement.nextSibling);
		}
		/**
		* Disable the output totals display
		*/
		disable() {
			for (const cleanup of this.observedInputs.values()) cleanup();
			this.observedInputs.clear();
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			document.querySelectorAll(".mwi-output-total").forEach((el) => el.remove());
			this.isInitialized = false;
		}
	};
	var outputTotals = new OutputTotals();
	//#endregion
	//#region src/features/actions/max-produceable.js
	/**
	* Max Produceable Display Module
	*
	* Shows maximum craftable quantity on action panels based on current inventory.
	*
	* Example:
	* - Cheesy Sword requires: 10 Cheese, 5 Iron Bar
	* - Inventory: 120 Cheese, 65 Iron Bar
	* - Display: "Can produce: 12" (limited by 120/10 = 12)
	*/
	/**
	* Action type constants for classification
	*/
	var GATHERING_TYPES$2 = [
		"/action_types/foraging",
		"/action_types/woodcutting",
		"/action_types/milking"
	];
	var PRODUCTION_TYPES$5 = [
		"/action_types/brewing",
		"/action_types/cooking",
		"/action_types/cheesesmithing",
		"/action_types/crafting",
		"/action_types/tailoring"
	];
	/**
	* Build inventory index map for O(1) lookups
	* @param {Array} inventory - Inventory array from dataManager
	* @returns {Map} Map of itemHrid → inventory item
	*/
	function buildInventoryIndex(inventory) {
		const index = /* @__PURE__ */ new Map();
		for (const item of inventory) if (item.itemLocationHrid === "/item_locations/inventory") index.set(item.itemHrid, item);
		return index;
	}
	var MaxProduceable = class {
		constructor() {
			this.actionElements = /* @__PURE__ */ new Map();
			this.unregisterObserver = null;
			this.lastCrimsonMilkCount = null;
			this.itemsUpdatedHandler = null;
			this.actionCompletedHandler = null;
			this.characterSwitchingHandler = null;
			this.pricingModeHandler = null;
			this.maxProduceableHandler = null;
			this.showProfitPerHourHandler = null;
			this.showExpPerHourHandler = null;
			this.profitCalcTimeout = null;
			this.actionNameToHridCache = null;
			this.isInitialized = false;
			this.itemsUpdatedDebounceTimer = null;
			this.DEBOUNCE_DELAY = 300;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.resizeObserver = null;
		}
		/**
		* Initialize the max produceable display
		*/
		async initialize() {
			if (this.isInitialized) return;
			this.isInitialized = true;
			await actionPanelSort.initialize();
			this.setupObserver();
			this.itemsUpdatedHandler = () => {
				clearTimeout(this.itemsUpdatedDebounceTimer);
				this.itemsUpdatedDebounceTimer = setTimeout(() => {
					this.updateAllCounts();
				}, this.DEBOUNCE_DELAY);
			};
			this.consumablesUpdatedHandler = () => {
				clearTimeout(this.itemsUpdatedDebounceTimer);
				this.itemsUpdatedDebounceTimer = setTimeout(() => {
					this.updateAllCounts();
				}, this.DEBOUNCE_DELAY);
			};
			this.characterSwitchingHandler = () => {
				this.clearAllReferences();
			};
			src_core_data_manager_js.default.on("items_updated", this.itemsUpdatedHandler);
			src_core_data_manager_js.default.on("consumables_updated", this.consumablesUpdatedHandler);
			src_core_data_manager_js.default.on("character_switching", this.characterSwitchingHandler);
			this.pricingModeHandler = () => {
				this.updateAllCounts();
			};
			this.maxProduceableHandler = () => {
				this.updateAllCounts();
			};
			this.showProfitPerHourHandler = () => {
				this.updateAllCounts();
			};
			this.showExpPerHourHandler = () => {
				this.updateAllCounts();
			};
			src_core_config_js.default.onSettingChange("profitCalc_pricingMode", this.pricingModeHandler);
			src_core_config_js.default.onSettingChange("actionPanel_maxProduceable", this.maxProduceableHandler);
			src_core_config_js.default.onSettingChange("actionPanel_showProfitPerHour_production", this.showProfitPerHourHandler);
			src_core_config_js.default.onSettingChange("actionPanel_showExpPerHour_production", this.showExpPerHourHandler);
		}
		/**
		* Setup DOM observer to watch for action panels
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("MaxProduceable", "SkillAction_skillAction", (actionPanel) => {
				const isNew = !this.actionElements.has(actionPanel);
				this.injectMaxProduceable(actionPanel);
				if (!isNew) return;
				clearTimeout(this.profitCalcTimeout);
				this.profitCalcTimeout = setTimeout(() => {
					this.updateAllCounts();
				}, 50);
				this.timerRegistry.registerTimeout(this.profitCalcTimeout);
			});
			const existingPanels = document.querySelectorAll("[class*=\"SkillAction_skillAction\"]");
			existingPanels.forEach((panel) => {
				this.injectMaxProduceable(panel);
			});
			if (existingPanels.length > 0) {
				clearTimeout(this.profitCalcTimeout);
				this.profitCalcTimeout = setTimeout(() => {
					this.updateAllCounts();
				}, 50);
				this.timerRegistry.registerTimeout(this.profitCalcTimeout);
			}
		}
		/**
		* Inject max produceable display and pin icon into an action panel
		* @param {HTMLElement} actionPanel - The action panel element
		*/
		injectMaxProduceable(actionPanel) {
			const actionHrid = this.getActionHridFromPanel(actionPanel);
			if (!actionHrid) return;
			const actionDetails = src_core_data_manager_js.default.getActionDetails(actionHrid);
			if (!actionDetails) return;
			const isProductionAction = actionDetails.inputItems && actionDetails.inputItems.length > 0;
			const existingDisplay = actionPanel.querySelector(".mwi-max-produceable");
			const existingPin = actionPanel.querySelector(".mwi-action-pin");
			if (existingPin) {
				this.actionElements.set(actionPanel, {
					actionHrid,
					displayElement: existingDisplay || null,
					pinElement: existingPin
				});
				this.updatePinIcon(existingPin, actionHrid);
				if (existingDisplay) {
					this.scheduleStatsLayoutSync(actionPanel, existingDisplay);
					this.getResizeObserver().observe(existingDisplay);
				}
				return;
			}
			if (actionPanel.style.position !== "relative" && actionPanel.style.position !== "absolute") actionPanel.style.position = "relative";
			let display = null;
			if (isProductionAction) {
				actionPanel.style.alignSelf = "flex-start";
				actionPanel.style.overflow = "visible";
				display = document.createElement("div");
				display.className = "mwi-max-produceable";
				display.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                font-size: 11px;
                padding: 4px 8px;
                text-align: center;
                background: rgba(0, 0, 0, 0.7);
                border-top: 1px solid var(--border-color, ${src_core_config_js.default.COLOR_BORDER});
                z-index: 10;
                line-height: 1.3;
                overflow: hidden;
            `;
				actionPanel.appendChild(display);
				this.scheduleStatsLayoutSync(actionPanel, display);
				this.getResizeObserver().observe(display);
			}
			if (isProductionAction) actionPanelSort.registerPanel(actionPanel, actionHrid);
			if (!src_core_config_js.default.getSetting("actions_pinnedPage")) {
				this.actionElements.set(actionPanel, {
					actionHrid,
					displayElement: display,
					pinElement: null
				});
				if (display) this.updateCount(actionPanel);
				actionPanelSort.triggerSort();
				return;
			}
			const pinIcon = document.createElement("div");
			pinIcon.className = "mwi-action-pin";
			pinIcon.innerHTML = "📌";
			pinIcon.style.cssText = `
            position: absolute;
            bottom: 8px;
            right: 8px;
            font-size: 1.5em;
            cursor: pointer;
            transition: all 0.2s;
            z-index: 11;
            user-select: none;
            filter: grayscale(100%) brightness(0.7);
        `;
			pinIcon.title = "Pin this action to keep it visible";
			pinIcon.addEventListener("mouseenter", () => {
				if (!actionPanelSort.isPinned(actionHrid)) pinIcon.style.filter = "grayscale(50%) brightness(1)";
			});
			pinIcon.addEventListener("mouseleave", () => {
				this.updatePinIcon(pinIcon, actionHrid);
			});
			pinIcon.addEventListener("click", (e) => {
				e.stopPropagation();
				this.togglePin(actionHrid, pinIcon);
			});
			this.updatePinIcon(pinIcon, actionHrid);
			actionPanel.appendChild(pinIcon);
			this.actionElements.set(actionPanel, {
				actionHrid,
				displayElement: display,
				pinElement: pinIcon
			});
			actionPanelSort.triggerSort();
		}
		/**
		* Extract action HRID from action panel
		* @param {HTMLElement} actionPanel - The action panel element
		* @returns {string|null} Action HRID or null
		*/
		getActionHridFromPanel(actionPanel) {
			const nameElement = actionPanel.querySelector("div[class*=\"SkillAction_name\"]");
			if (!nameElement) return null;
			const actionName = Array.from(nameElement.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join("").trim();
			if (!this.actionNameToHridCache) {
				const initData = src_core_data_manager_js.default.getInitClientData();
				if (!initData) return null;
				this.actionNameToHridCache = /* @__PURE__ */ new Map();
				for (const [hrid, action] of Object.entries(initData.actionDetailMap)) {
					this.actionNameToHridCache.set(action.name, hrid);
					if (action.name.includes("(R)")) this.actionNameToHridCache.set(action.name.replace(/\s*\(R\)/, " ★"), hrid);
					else if (action.name.includes("★")) this.actionNameToHridCache.set(action.name.replace(/\s*★/, " (R)"), hrid);
				}
			}
			return this.actionNameToHridCache.get(actionName) || null;
		}
		/**
		* Calculate max produceable count for an action
		* @param {string} actionHrid - The action HRID
		* @param {Map} inventoryIndex - Inventory index map (itemHrid → item)
		* @param {Object} gameData - Game data (optional, will fetch if not provided)
		* @returns {number|null} Max produceable count or null
		*/
		calculateMaxProduceable(actionHrid, inventoryIndex = null, gameData = null) {
			const actionDetails = src_core_data_manager_js.default.getActionDetails(actionHrid);
			if (!inventoryIndex) inventoryIndex = buildInventoryIndex(src_core_data_manager_js.default.getInventory());
			if (!actionDetails || !inventoryIndex) return null;
			const equipment = src_core_data_manager_js.default.getEquipment();
			const itemDetailMap = gameData?.itemDetailMap || src_core_data_manager_js.default.getInitClientData()?.itemDetailMap || {};
			const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
			const activeDrinks = src_core_data_manager_js.default.getActionDrinkSlots(actionDetails.type);
			const artisanBonus = (0, src_utils_tea_parser_js.parseArtisanBonus)(activeDrinks, itemDetailMap, drinkConcentration);
			let upgradeAccountedFor = false;
			const maxCraftsPerInput = actionDetails.inputItems.map((input) => {
				const invCount = inventoryIndex.get(input.itemHrid)?.count || 0;
				let materialsPerAction = input.count * (1 - artisanBonus);
				if (actionDetails.upgradeItemHrid === input.itemHrid) {
					materialsPerAction += 1;
					upgradeAccountedFor = true;
				}
				return Math.floor(invCount / materialsPerAction);
			});
			let minCrafts = Math.min(...maxCraftsPerInput);
			if (actionDetails.upgradeItemHrid && !upgradeAccountedFor) {
				const upgradeCount = inventoryIndex.get(actionDetails.upgradeItemHrid)?.count || 0;
				minCrafts = Math.min(minCrafts, upgradeCount);
			}
			return minCrafts;
		}
		/**
		* Update display count for a single action panel
		* @param {HTMLElement} actionPanel - The action panel element
		* @param {Map} inventoryIndex - Inventory index map (optional)
		*/
		async updateCount(actionPanel, inventoryIndex = null) {
			const data = this.actionElements.get(actionPanel);
			if (!data) return;
			let maxCrafts = null;
			if (data.displayElement) {
				maxCrafts = this.calculateMaxProduceable(data.actionHrid, inventoryIndex, src_core_data_manager_js.default.getInitClientData());
				if (maxCrafts === null) {
					data.displayElement.style.display = "none";
					this.syncStatsLayout(actionPanel, data.displayElement);
					return;
				}
			}
			let profitPerHour = null;
			let hasMissingPrices = false;
			let outputPriceEstimated = false;
			const actionDetails = src_core_data_manager_js.default.getActionDetails(data.actionHrid);
			if (actionDetails) {
				if (GATHERING_TYPES$2.includes(actionDetails.type)) {
					const profitData = await calculateGatheringProfit(data.actionHrid);
					profitPerHour = profitData?.profitPerHour || null;
					hasMissingPrices = profitData?.hasMissingPrices || false;
				} else if (PRODUCTION_TYPES$5.includes(actionDetails.type)) {
					const profitData = await calculateProductionProfit(data.actionHrid);
					profitPerHour = profitData?.profitPerHour || null;
					hasMissingPrices = profitData?.hasMissingPrices || false;
					outputPriceEstimated = profitData?.outputPriceEstimated || false;
				}
			}
			const resolvedProfitPerHour = hasMissingPrices ? null : profitPerHour;
			data.profitPerHour = resolvedProfitPerHour;
			actionPanelSort.updateProfit(actionPanel, resolvedProfitPerHour);
			const hideNegativeProfit = src_core_config_js.default.getSetting("actionPanel_hideNegativeProfit");
			const isPinned = actionPanelSort.isPinned(data.actionHrid);
			const isFilterHidden = actionFilter.isFilterHidden(actionPanel);
			if (hideNegativeProfit && resolvedProfitPerHour !== null && resolvedProfitPerHour < 0 && !isPinned) {
				actionPanel.style.display = "none";
				return;
			} else if (isFilterHidden) {
				actionPanel.style.display = "none";
				return;
			} else actionPanel.style.display = "";
			if (!data.displayElement) return;
			const expPerHour = (0, src_utils_experience_calculator_js.calculateExpPerHour)(data.actionHrid)?.expPerHour || null;
			let canProduceColor;
			if (maxCrafts === 0) canProduceColor = src_core_config_js.default.COLOR_LOSS;
			else if (maxCrafts < 5) canProduceColor = src_core_config_js.default.COLOR_WARNING;
			else canProduceColor = src_core_config_js.default.COLOR_PROFIT;
			data.maxCrafts = maxCrafts;
			data.profitPerHour = resolvedProfitPerHour;
			data.expPerHour = expPerHour;
			data.hasMissingPrices = hasMissingPrices;
			data.outputPriceEstimated = outputPriceEstimated;
			actionPanelSort.updateExpPerHour(actionPanel, expPerHour);
			const showMaxProduceable = src_core_config_js.default.getSetting("actionPanel_maxProduceable");
			const showProfit = src_core_config_js.default.getSetting("actionPanel_showProfitPerHour_production");
			const showExp = src_core_config_js.default.getSetting("actionPanel_showExpPerHour_production");
			let html = "";
			if (showMaxProduceable) {
				html += `<div class="mwi-action-stat-line" style="white-space: nowrap;">`;
				html += `<span style="color: ${canProduceColor};">Can produce: ${maxCrafts.toLocaleString()}</span></div>`;
			}
			if (showProfit) {
				if (hasMissingPrices) {
					html += `<div class="mwi-action-stat-line" style="white-space: nowrap;">`;
					html += `<span data-stat="profit" style="color: ${src_core_config_js.default.SCRIPT_COLOR_ALERT};">Profit/hr: -- ⚠</span></div>`;
				} else if (resolvedProfitPerHour !== null) {
					const profitColor = resolvedProfitPerHour >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
					const profitSign = resolvedProfitPerHour >= 0 ? "" : "-";
					const estimatedNote = outputPriceEstimated ? " ⚠" : "";
					html += `<div class="mwi-action-stat-line" style="white-space: nowrap;">`;
					html += `<span data-stat="profit" style="color: ${profitColor};">Profit/hr: ${profitSign}${(0, src_utils_formatters_js.formatKMB)(Math.abs(resolvedProfitPerHour))}${estimatedNote}</span></div>`;
				}
			}
			if (showExp && expPerHour !== null && expPerHour > 0) {
				html += `<div class="mwi-action-stat-line" style="white-space: nowrap;">`;
				html += `<span data-stat="exp" style="color: #fff;">Exp/hr: ${(0, src_utils_formatters_js.formatKMB)(expPerHour)}</span></div>`;
			}
			if (showProfit && showExp && !hasMissingPrices && resolvedProfitPerHour !== null && expPerHour !== null && expPerHour > 0) {
				html += `<div class="mwi-action-stat-line" style="white-space: nowrap;">`;
				html += `<span data-stat="overall" style="color: #fff;">Eff. XP/hr: ${(0, src_utils_formatters_js.formatKMB)(expPerHour)}</span></div>`;
			}
			data.displayElement.innerHTML = html;
			if (!html) {
				data.displayElement.style.display = "none";
				return;
			}
			data.displayElement.style.display = "block";
			data.displayElement.style.visibility = "hidden";
			this.fitLineFontSizes(actionPanel, data.displayElement);
		}
		/**
		* Update all counts
		*/
		async updateAllCounts() {
			if (!src_api_marketplace_js.default.isLoaded()) await src_api_marketplace_js.default.fetch();
			const inventory = src_core_data_manager_js.default.getInventory();
			if (!inventory) return;
			const inventoryIndex = buildInventoryIndex(inventory);
			const updatePromises = [];
			for (const actionPanel of [...this.actionElements.keys()]) if (document.body.contains(actionPanel)) updatePromises.push(this.updateCount(actionPanel, inventoryIndex));
			else {
				const data = this.actionElements.get(actionPanel);
				if (data) {
					if (data.displayElement) {
						data.displayElement.innerHTML = "";
						data.displayElement.remove();
						data.displayElement = null;
					}
					if (data.pinElement) {
						data.pinElement.innerHTML = "";
						data.pinElement.remove();
						data.pinElement = null;
					}
				}
				this.actionElements.delete(actionPanel);
				actionPanelSort.unregisterPanel(actionPanel);
			}
			await Promise.all(updatePromises);
			this.addBestActionIndicators();
			actionPanelSort.triggerSort();
			this.syncAllStatsLayouts();
		}
		/**
		* Find best actions and add visual indicators
		*/
		addBestActionIndicators() {
			let bestProfit = null;
			let bestProfitExp = null;
			let bestProfitHrid = null;
			let bestExp = null;
			let bestOverall = null;
			let bestProfitPanels = [];
			let bestExpPanels = [];
			let bestOverallPanels = [];
			for (const [actionPanel, data] of this.actionElements.entries()) {
				if (!document.body.contains(actionPanel) || !data.displayElement) continue;
				const { profitPerHour, expPerHour, hasMissingPrices, outputPriceEstimated } = data;
				if (!(hasMissingPrices || outputPriceEstimated) && profitPerHour !== null && profitPerHour > 0) {
					if (bestProfit === null || profitPerHour > bestProfit) {
						bestProfit = profitPerHour;
						bestProfitExp = expPerHour;
						bestProfitHrid = data.actionHrid;
						bestProfitPanels = [actionPanel];
					} else if (profitPerHour === bestProfit) bestProfitPanels.push(actionPanel);
				}
				if (expPerHour !== null && expPerHour > 0) {
					if (bestExp === null || expPerHour > bestExp) {
						bestExp = expPerHour;
						bestExpPanels = [actionPanel];
					} else if (expPerHour === bestExp) bestExpPanels.push(actionPanel);
				}
			}
			for (const [actionPanel, data] of this.actionElements.entries()) {
				if (!document.body.contains(actionPanel) || !data.displayElement) continue;
				const { profitPerHour, expPerHour, hasMissingPrices, outputPriceEstimated } = data;
				if (hasMissingPrices || outputPriceEstimated || profitPerHour === null || expPerHour === null || expPerHour <= 0) continue;
				let effectiveXp;
				if (profitPerHour >= 0) effectiveXp = expPerHour;
				else if (bestProfit > 0) {
					const recoveryRatio = Math.abs(profitPerHour) / bestProfit;
					effectiveXp = (expPerHour + recoveryRatio * (bestProfitExp || 0)) / (1 + recoveryRatio);
				} else continue;
				data.effectiveXpPerHour = effectiveXp;
				if (bestOverall === null || effectiveXp > bestOverall) {
					bestOverall = effectiveXp;
					bestOverallPanels = [actionPanel];
				} else if (effectiveXp === bestOverall) bestOverallPanels.push(actionPanel);
			}
			const EMOJIS = [
				" 💰",
				" 🧠",
				" 🏆"
			];
			const stripEmoji = (text) => {
				let t = text;
				for (const e of EMOJIS) t = t.replace(e, "");
				return t;
			};
			const bestProfitName = bestProfitHrid ? src_core_data_manager_js.default.getActionDetails(bestProfitHrid)?.name || bestProfitHrid : null;
			for (const [actionPanel, data] of this.actionElements.entries()) {
				if (!document.body.contains(actionPanel) || !data.displayElement) continue;
				const isBestProfit = bestProfitPanels.includes(actionPanel);
				const isBestExp = bestExpPanels.includes(actionPanel);
				const isBestOverall = bestOverallPanels.includes(actionPanel);
				const profitSpan = data.displayElement.querySelector("[data-stat=\"profit\"]");
				if (profitSpan) profitSpan.textContent = stripEmoji(profitSpan.textContent) + (isBestProfit ? " 💰" : "");
				const expSpan = data.displayElement.querySelector("[data-stat=\"exp\"]");
				if (expSpan) expSpan.textContent = stripEmoji(expSpan.textContent) + (isBestExp ? " 🧠" : "");
				const overallSpan = data.displayElement.querySelector("[data-stat=\"overall\"]");
				if (overallSpan) {
					const effXp = data.effectiveXpPerHour;
					overallSpan.textContent = (effXp != null ? `Eff. XP/hr: ${(0, src_utils_formatters_js.formatKMB)(effXp)}` : stripEmoji(overallSpan.textContent)) + (isBestOverall ? " 🏆" : "");
					if (data.profitPerHour < 0 && bestProfit > 0 && effXp != null) {
						const loss = Math.abs(data.profitPerHour);
						const ratio = loss / bestProfit;
						overallSpan.title = `Gold-neutral XP rate\nThis action: ${(0, src_utils_formatters_js.formatKMB)(data.expPerHour)} XP/hr, -${(0, src_utils_formatters_js.formatKMB)(loss)}/hr\nRecovery: ${bestProfitName} (+${(0, src_utils_formatters_js.formatKMB)(bestProfit)}/hr, ${(0, src_utils_formatters_js.formatKMB)(bestProfitExp || 0)} XP/hr)\nRatio: ${ratio.toFixed(2)}hr recovery per 1hr action\nBlended: (${(0, src_utils_formatters_js.formatKMB)(data.expPerHour)} + ${ratio.toFixed(2)} × ${(0, src_utils_formatters_js.formatKMB)(bestProfitExp || 0)}) / ${(1 + ratio).toFixed(2)} = ${(0, src_utils_formatters_js.formatKMB)(effXp)}`;
					} else overallSpan.title = "";
				}
				this.fitLineFontSizes(actionPanel, data.displayElement);
			}
		}
		/**
		* Fit each stat line to the action panel width
		* @param {HTMLElement} actionPanel - Action panel container
		* @param {HTMLElement} displayElement - Stats container
		*/
		fitLineFontSizes(actionPanel, displayElement, retries = 4) {
			requestAnimationFrame(() => {
				const panelWidth = actionPanel.getBoundingClientRect().width;
				const fallbackWidth = displayElement.getBoundingClientRect().width;
				const availableWidth = Math.max(0, (panelWidth || fallbackWidth) - 16);
				if (!availableWidth) {
					if (retries > 0) setTimeout(() => this.fitLineFontSizes(actionPanel, displayElement, retries - 1), 60);
					else displayElement.style.visibility = "";
					return;
				}
				const baseFontSize = 11;
				const minFontSize = 5;
				displayElement.querySelectorAll(".mwi-action-stat-line").forEach((line) => {
					const textSpan = line.querySelector("span");
					if (!textSpan) return;
					textSpan.style.setProperty("display", "inline-block");
					textSpan.style.setProperty("transform-origin", "left center");
					textSpan.style.setProperty("transform", "scaleX(1)");
					let fontSize = baseFontSize;
					textSpan.style.setProperty("font-size", `${fontSize}px`, "important");
					let textWidth = textSpan.getBoundingClientRect().width;
					let iterations = 0;
					while (textWidth > availableWidth && fontSize > minFontSize && iterations < 20) {
						fontSize -= 1;
						textSpan.style.setProperty("font-size", `${fontSize}px`, "important");
						textWidth = textSpan.getBoundingClientRect().width;
						iterations += 1;
					}
					if (textWidth > availableWidth) {
						const scaleX = Math.max(.6, availableWidth / textWidth);
						textSpan.style.setProperty("transform", `scaleX(${scaleX})`);
					}
				});
				displayElement.style.visibility = "";
				this.syncStatsLayout(actionPanel, displayElement);
				this.scheduleStatsLayoutSync(actionPanel, displayElement);
			});
		}
		getResizeObserver() {
			if (!this.resizeObserver) this.resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const displayElement = entry.target;
					const actionPanel = displayElement.parentElement;
					if (actionPanel) {
						this.syncStatsLayout(actionPanel, displayElement);
						this.scheduleStatsLayoutSync(actionPanel, displayElement);
					}
				}
			});
			return this.resizeObserver;
		}
		syncStatsLayout(actionPanel, displayElement) {
			if (!actionPanel || !displayElement) return;
			if (!document.body.contains(actionPanel) || !document.body.contains(displayElement)) return;
			actionPanel.style.alignSelf = "flex-start";
			actionPanel.style.overflow = "visible";
			if (actionPanel.style.position !== "relative" && actionPanel.style.position !== "absolute") actionPanel.style.position = "relative";
			if (displayElement.style.display === "none") {
				actionPanel.style.marginBottom = "";
				return;
			}
			const height = Math.ceil(displayElement.getBoundingClientRect().height || displayElement.offsetHeight || 0);
			if (height > 0) actionPanel.style.marginBottom = `${height}px`;
		}
		scheduleStatsLayoutSync(actionPanel, displayElement) {
			requestAnimationFrame(() => {
				this.syncStatsLayout(actionPanel, displayElement);
				requestAnimationFrame(() => {
					this.syncStatsLayout(actionPanel, displayElement);
				});
			});
		}
		syncAllStatsLayouts() {
			for (const [actionPanel, data] of this.actionElements.entries()) {
				if (!document.body.contains(actionPanel) || !data.displayElement) continue;
				this.scheduleStatsLayoutSync(actionPanel, data.displayElement);
			}
		}
		/**
		* Toggle pin state for an action
		* @param {string} actionHrid - Action HRID to toggle
		* @param {HTMLElement} pinIcon - Pin icon element
		*/
		async togglePin(actionHrid, pinIcon) {
			await actionPanelSort.togglePin(actionHrid);
			this.updatePinIcon(pinIcon, actionHrid);
			await this.updateAllCounts();
		}
		/**
		* Update pin icon appearance based on pinned state
		* @param {HTMLElement} pinIcon - Pin icon element
		* @param {string} actionHrid - Action HRID
		*/
		updatePinIcon(pinIcon, actionHrid) {
			const isPinned = actionPanelSort.isPinned(actionHrid);
			if (isPinned) {
				pinIcon.style.filter = "grayscale(0%) brightness(1.2) drop-shadow(0 0 3px rgba(255, 100, 0, 0.8))";
				pinIcon.style.transform = "scale(1.1)";
			} else {
				pinIcon.style.filter = "grayscale(100%) brightness(0.7)";
				pinIcon.style.transform = "scale(1)";
			}
			pinIcon.title = isPinned ? "Unpin this action" : "Pin this action to keep it visible";
		}
		/**
		* Clear all DOM references to prevent memory leaks during character switch
		*/
		clearAllReferences() {
			if (this.profitCalcTimeout) {
				clearTimeout(this.profitCalcTimeout);
				this.profitCalcTimeout = null;
			}
			this.timerRegistry.clearAll();
			if (this.resizeObserver) {
				this.resizeObserver.disconnect();
				this.resizeObserver = null;
			}
			for (const [actionPanel, data] of this.actionElements.entries()) {
				if (data.displayElement) {
					data.displayElement.innerHTML = "";
					data.displayElement.remove();
					data.displayElement = null;
				}
				if (data.pinElement) {
					data.pinElement.innerHTML = "";
					data.pinElement.remove();
					data.pinElement = null;
				}
				actionPanel.style.marginBottom = "";
				actionPanel.style.overflow = "";
			}
			this.actionElements.clear();
			if (this.actionNameToHridCache) {
				this.actionNameToHridCache.clear();
				this.actionNameToHridCache = null;
			}
			actionPanelSort.clearAllPanels();
		}
		/**
		* Disable the max produceable display
		*/
		disable() {
			clearTimeout(this.itemsUpdatedDebounceTimer);
			clearTimeout(this.actionCompletedDebounceTimer);
			this.itemsUpdatedDebounceTimer = null;
			this.actionCompletedDebounceTimer = null;
			if (this.itemsUpdatedHandler) {
				src_core_data_manager_js.default.off("items_updated", this.itemsUpdatedHandler);
				this.itemsUpdatedHandler = null;
			}
			if (this.consumablesUpdatedHandler) {
				src_core_data_manager_js.default.off("consumables_updated", this.consumablesUpdatedHandler);
				this.consumablesUpdatedHandler = null;
			}
			if (this.characterSwitchingHandler) {
				src_core_data_manager_js.default.off("character_switching", this.characterSwitchingHandler);
				this.characterSwitchingHandler = null;
			}
			if (this.pricingModeHandler) {
				src_core_config_js.default.offSettingChange("profitCalc_pricingMode", this.pricingModeHandler);
				this.pricingModeHandler = null;
			}
			if (this.maxProduceableHandler) {
				src_core_config_js.default.offSettingChange("actionPanel_maxProduceable", this.maxProduceableHandler);
				this.maxProduceableHandler = null;
			}
			if (this.showProfitPerHourHandler) {
				src_core_config_js.default.offSettingChange("actionPanel_showProfitPerHour_production", this.showProfitPerHourHandler);
				this.showProfitPerHourHandler = null;
			}
			if (this.showExpPerHourHandler) {
				src_core_config_js.default.offSettingChange("actionPanel_showExpPerHour_production", this.showExpPerHourHandler);
				this.showExpPerHourHandler = null;
			}
			this.clearAllReferences();
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			if (this.mutationObserver) {
				this.mutationObserver.disconnect();
				this.mutationObserver = null;
			}
			document.querySelectorAll(".mwi-max-produceable").forEach((el) => el.remove());
			document.querySelectorAll(".mwi-action-pin").forEach((el) => el.remove());
			this.actionElements.clear();
			this.isInitialized = false;
		}
	};
	var maxProduceable = new MaxProduceable();
	//#endregion
	//#region src/features/actions/gathering-stats.js
	/**
	* Gathering Stats Display Module
	*
	* Shows profit/hr and exp/hr on gathering action tiles
	* (foraging, woodcutting, milking)
	*/
	var GatheringStats = class {
		constructor() {
			this.actionElements = /* @__PURE__ */ new Map();
			this.unregisterObserver = null;
			this.itemsUpdatedHandler = null;
			this.actionCompletedHandler = null;
			this.consumablesUpdatedHandler = null;
			this.characterSwitchingHandler = null;
			this.pricingModeHandler = null;
			this.showProfitPerHourHandler = null;
			this.showExpPerHourHandler = null;
			this.isInitialized = false;
			this.itemsUpdatedDebounceTimer = null;
			this.consumablesUpdatedDebounceTimer = null;
			this.indicatorUpdateDebounceTimer = null;
			this.DEBOUNCE_DELAY = 300;
			this.resizeObserver = null;
		}
		/**
		* Initialize the gathering stats display
		*/
		async initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("actionPanel_showProfitPerHour_gathering") && !src_core_config_js.default.getSetting("actionPanel_showExpPerHour_gathering")) return;
			this.isInitialized = true;
			await actionPanelSort.initialize();
			this.setupObserver();
			this.itemsUpdatedHandler = () => {
				clearTimeout(this.itemsUpdatedDebounceTimer);
				this.itemsUpdatedDebounceTimer = setTimeout(() => {
					this.updateAllStats();
				}, this.DEBOUNCE_DELAY);
			};
			this.consumablesUpdatedHandler = () => {
				clearTimeout(this.consumablesUpdatedDebounceTimer);
				this.consumablesUpdatedDebounceTimer = setTimeout(() => {
					this.updateAllStats();
				}, this.DEBOUNCE_DELAY);
			};
			this.characterSwitchingHandler = () => {
				this.clearAllReferences();
			};
			src_core_data_manager_js.default.on("items_updated", this.itemsUpdatedHandler);
			src_core_data_manager_js.default.on("consumables_updated", this.consumablesUpdatedHandler);
			src_core_data_manager_js.default.on("character_switching", this.characterSwitchingHandler);
			this.pricingModeHandler = () => {
				this.updateAllStats();
			};
			src_core_config_js.default.onSettingChange("profitCalc_pricingMode", this.pricingModeHandler);
			this.showProfitPerHourHandler = () => this.updateAllStats();
			this.showExpPerHourHandler = () => this.updateAllStats();
			src_core_config_js.default.onSettingChange("actionPanel_showProfitPerHour_gathering", this.showProfitPerHourHandler);
			src_core_config_js.default.onSettingChange("actionPanel_showExpPerHour_gathering", this.showExpPerHourHandler);
		}
		/**
		* Setup DOM observer to watch for action panels
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("GatheringStats", "SkillAction_skillAction", (actionPanel) => {
				this.injectGatheringStats(actionPanel);
			});
			document.querySelectorAll("[class*=\"SkillAction_skillAction\"]").forEach((panel) => {
				this.injectGatheringStats(panel);
			});
		}
		/**
		* Inject gathering stats display into an action panel
		* @param {HTMLElement} actionPanel - The action panel element
		*/
		injectGatheringStats(actionPanel) {
			const actionHrid = this.getActionHridFromPanel(actionPanel);
			if (!actionHrid) return;
			const actionDetails = src_core_data_manager_js.default.getActionDetails(actionHrid);
			if (!actionDetails || ![
				"/action_types/foraging",
				"/action_types/woodcutting",
				"/action_types/milking"
			].includes(actionDetails.type)) return;
			const existingDisplay = actionPanel.querySelector(".mwi-gathering-stats");
			if (existingDisplay) {
				if (this.actionElements.has(actionPanel)) return;
				this.actionElements.set(actionPanel, {
					actionHrid,
					displayElement: existingDisplay
				});
				this.updateStats(actionPanel, { skipRender: true }).then(() => {
					this.scheduleIndicatorUpdate();
				});
				actionPanelSort.registerPanel(actionPanel, actionHrid);
				if (existingDisplay) {
					this.scheduleStatsLayoutSync(actionPanel, existingDisplay);
					this.getResizeObserver().observe(existingDisplay);
				}
				actionPanelSort.triggerSort();
				return;
			}
			const display = document.createElement("div");
			display.className = "mwi-gathering-stats";
			display.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            font-size: 11px;
            padding: 4px 8px;
            text-align: center;
            background: rgba(0, 0, 0, 0.7);
            border-top: 1px solid var(--border-color, ${src_core_config_js.default.COLOR_BORDER});
            z-index: 10;
            line-height: 1.3;
            overflow: hidden;
        `;
			if (actionPanel.style.position !== "relative" && actionPanel.style.position !== "absolute") actionPanel.style.position = "relative";
			actionPanel.style.alignSelf = "flex-start";
			actionPanel.style.overflow = "visible";
			actionPanel.appendChild(display);
			this.scheduleStatsLayoutSync(actionPanel, display);
			this.getResizeObserver().observe(display);
			this.actionElements.set(actionPanel, {
				actionHrid,
				displayElement: display
			});
			actionPanelSort.registerPanel(actionPanel, actionHrid);
			this.updateStats(actionPanel).then(() => {
				this.scheduleIndicatorUpdate();
			});
			actionPanelSort.triggerSort();
		}
		/**
		* Extract action HRID from action panel
		* @param {HTMLElement} actionPanel - The action panel element
		* @returns {string|null} Action HRID or null
		*/
		getActionHridFromPanel(actionPanel) {
			const nameElement = actionPanel.querySelector("div[class*=\"SkillAction_name\"]");
			if (!nameElement) return null;
			return getActionHridFromName(Array.from(nameElement.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join("").trim());
		}
		/**
		* Update stats display for a single action panel
		* @param {HTMLElement} actionPanel - The action panel element
		* @param {Object} [options] - Optional flags
		* @param {boolean} [options.skipRender=false] - Skip DOM rendering
		*/
		async updateStats(actionPanel, options = {}) {
			const data = this.actionElements.get(actionPanel);
			if (!data) return;
			const { skipRender = false } = options;
			const profitData = await calculateGatheringProfit(data.actionHrid);
			const profitPerHour = profitData?.profitPerHour || null;
			const hasMissingPrices = profitData?.hasMissingPrices || false;
			const expPerHour = (0, src_utils_experience_calculator_js.calculateExpPerHour)(data.actionHrid)?.expPerHour || null;
			data.profitPerHour = profitPerHour;
			data.expPerHour = expPerHour;
			data.hasMissingPrices = hasMissingPrices;
			actionPanelSort.updateProfit(actionPanel, profitPerHour);
			actionPanelSort.updateExpPerHour(actionPanel, expPerHour);
			const hideNegativeProfit = src_core_config_js.default.getSetting("actionPanel_hideNegativeProfit");
			const isPinned = actionPanelSort.isPinned(data.actionHrid);
			const isFilterHidden = actionFilter.isFilterHidden(actionPanel);
			if (hideNegativeProfit && profitPerHour !== null && profitPerHour < 0 && !isPinned) {
				actionPanel.style.display = "none";
				return;
			} else if (isFilterHidden) {
				actionPanel.style.display = "none";
				return;
			} else actionPanel.style.display = "";
			if (skipRender) return;
			this.renderIndicators(actionPanel, data);
		}
		/**
		* Update all stats
		*/
		async updateAllStats() {
			const updatePromises = [];
			for (const actionPanel of [...this.actionElements.keys()]) if (document.body.contains(actionPanel)) updatePromises.push(this.updateStats(actionPanel, { skipRender: true }));
			else {
				const data = this.actionElements.get(actionPanel);
				if (data && data.displayElement) {
					data.displayElement.innerHTML = "";
					data.displayElement.remove();
					data.displayElement = null;
				}
				this.actionElements.delete(actionPanel);
				actionPanelSort.unregisterPanel(actionPanel);
			}
			await Promise.all(updatePromises);
			for (const [actionPanel, data] of this.actionElements.entries()) if (document.body.contains(actionPanel) && data.displayElement) this.renderIndicators(actionPanel, data);
			this.scheduleIndicatorUpdate();
			actionPanelSort.triggerSort();
			this.syncAllStatsLayouts();
		}
		/**
		* Debounce indicator rendering to batch panel updates
		*/
		scheduleIndicatorUpdate() {
			clearTimeout(this.indicatorUpdateDebounceTimer);
			this.indicatorUpdateDebounceTimer = setTimeout(() => {
				this.addBestActionIndicators();
			}, this.DEBOUNCE_DELAY);
		}
		/**
		* Find best actions and add visual indicators
		*/
		addBestActionIndicators() {
			let bestProfit = null;
			let bestProfitExp = null;
			let bestProfitHrid = null;
			let bestExp = null;
			let bestOverall = null;
			let bestProfitPanels = [];
			let bestExpPanels = [];
			let bestOverallPanels = [];
			for (const [actionPanel, data] of this.actionElements.entries()) {
				if (!document.body.contains(actionPanel) || !data.displayElement) continue;
				const { profitPerHour, expPerHour, hasMissingPrices } = data;
				if (!hasMissingPrices && profitPerHour !== null) {
					if (bestProfit === null || profitPerHour > bestProfit) {
						bestProfit = profitPerHour;
						bestProfitExp = expPerHour;
						bestProfitHrid = data.actionHrid;
						bestProfitPanels = [actionPanel];
					} else if (profitPerHour === bestProfit) bestProfitPanels.push(actionPanel);
				}
				if (expPerHour !== null && expPerHour > 0) {
					if (bestExp === null || expPerHour > bestExp) {
						bestExp = expPerHour;
						bestExpPanels = [actionPanel];
					} else if (expPerHour === bestExp) bestExpPanels.push(actionPanel);
				}
			}
			for (const [actionPanel, data] of this.actionElements.entries()) {
				if (!document.body.contains(actionPanel) || !data.displayElement) continue;
				const { profitPerHour, expPerHour, hasMissingPrices } = data;
				if (hasMissingPrices || profitPerHour === null || expPerHour === null || expPerHour <= 0) continue;
				let effectiveXp;
				if (profitPerHour >= 0) effectiveXp = expPerHour;
				else if (bestProfit > 0) {
					const recoveryRatio = Math.abs(profitPerHour) / bestProfit;
					effectiveXp = (expPerHour + recoveryRatio * (bestProfitExp || 0)) / (1 + recoveryRatio);
				} else continue;
				data.effectiveXpPerHour = effectiveXp;
				if (bestOverall === null || effectiveXp > bestOverall) {
					bestOverall = effectiveXp;
					bestOverallPanels = [actionPanel];
				} else if (effectiveXp === bestOverall) bestOverallPanels.push(actionPanel);
			}
			const EMOJIS = [
				" 💰",
				" 🧠",
				" 🏆"
			];
			const stripEmoji = (text) => {
				let t = text;
				for (const e of EMOJIS) t = t.replace(e, "");
				return t;
			};
			const bestProfitName = bestProfitHrid ? src_core_data_manager_js.default.getActionDetails(bestProfitHrid)?.name || bestProfitHrid : null;
			for (const [actionPanel, data] of this.actionElements.entries()) {
				if (!document.body.contains(actionPanel) || !data.displayElement) continue;
				const isBestProfit = bestProfitPanels.includes(actionPanel);
				const isBestExp = bestExpPanels.includes(actionPanel);
				const isBestOverall = bestOverallPanels.includes(actionPanel);
				const profitSpan = data.displayElement.querySelector("[data-stat=\"profit\"]");
				if (profitSpan) profitSpan.textContent = stripEmoji(profitSpan.textContent) + (isBestProfit ? " 💰" : "");
				const expSpan = data.displayElement.querySelector("[data-stat=\"exp\"]");
				if (expSpan) expSpan.textContent = stripEmoji(expSpan.textContent) + (isBestExp ? " 🧠" : "");
				const overallSpan = data.displayElement.querySelector("[data-stat=\"overall\"]");
				if (overallSpan) {
					const effXp = data.effectiveXpPerHour;
					overallSpan.textContent = (effXp != null ? `Eff. XP/hr: ${(0, src_utils_formatters_js.formatKMB)(effXp)}` : stripEmoji(overallSpan.textContent)) + (isBestOverall ? " 🏆" : "");
					if (data.profitPerHour < 0 && bestProfit > 0 && effXp != null) {
						const loss = Math.abs(data.profitPerHour);
						const ratio = loss / bestProfit;
						overallSpan.title = `Gold-neutral XP rate\nThis action: ${(0, src_utils_formatters_js.formatKMB)(data.expPerHour)} XP/hr, -${(0, src_utils_formatters_js.formatKMB)(loss)}/hr\nRecovery: ${bestProfitName} (+${(0, src_utils_formatters_js.formatKMB)(bestProfit)}/hr, ${(0, src_utils_formatters_js.formatKMB)(bestProfitExp || 0)} XP/hr)\nRatio: ${ratio.toFixed(2)}hr recovery per 1hr action\nBlended: (${(0, src_utils_formatters_js.formatKMB)(data.expPerHour)} + ${ratio.toFixed(2)} × ${(0, src_utils_formatters_js.formatKMB)(bestProfitExp || 0)}) / ${(1 + ratio).toFixed(2)} = ${(0, src_utils_formatters_js.formatKMB)(effXp)}`;
					} else overallSpan.title = "";
				}
				this.fitLineFontSizes(actionPanel, data.displayElement);
			}
		}
		/**
		* Render stat lines into the display element and size them to fit.
		* @param {HTMLElement} actionPanel - Action panel container
		* @param {Object} data - Stored action data
		*/
		renderIndicators(actionPanel, data) {
			const { profitPerHour, expPerHour } = data;
			const showProfit = src_core_config_js.default.getSetting("actionPanel_showProfitPerHour_gathering");
			const showExp = src_core_config_js.default.getSetting("actionPanel_showExpPerHour_gathering");
			let html = "";
			if (showProfit && profitPerHour !== null) {
				const profitColor = profitPerHour >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
				const profitSign = profitPerHour >= 0 ? "" : "-";
				html += `<div class="mwi-action-stat-line" style="white-space: nowrap;">`;
				html += `<span data-stat="profit" style="color: ${profitColor};">Profit/hr: ${profitSign}${(0, src_utils_formatters_js.formatKMB)(Math.abs(profitPerHour))}</span></div>`;
			}
			if (showExp && expPerHour !== null && expPerHour > 0) {
				html += `<div class="mwi-action-stat-line" style="white-space: nowrap;">`;
				html += `<span data-stat="exp" style="color: #fff;">Exp/hr: ${(0, src_utils_formatters_js.formatKMB)(expPerHour)}</span></div>`;
			}
			if (showProfit && showExp && profitPerHour !== null && expPerHour !== null && expPerHour > 0) {
				html += `<div class="mwi-action-stat-line" style="white-space: nowrap;">`;
				html += `<span data-stat="overall" style="color: #fff;">Eff. XP/hr: ${(0, src_utils_formatters_js.formatKMB)(expPerHour)}</span></div>`;
			}
			data.displayElement.innerHTML = html;
			if (!html) {
				data.displayElement.style.display = "none";
				this.syncStatsLayout(actionPanel, data.displayElement);
				return;
			}
			data.displayElement.style.display = "block";
			data.displayElement.style.visibility = "hidden";
			this.fitLineFontSizes(actionPanel, data.displayElement);
		}
		/**
		* Fit each stat line to the action panel width
		* @param {HTMLElement} actionPanel - Action panel container
		* @param {HTMLElement} displayElement - Stats container
		*/
		fitLineFontSizes(actionPanel, displayElement, retries = 4) {
			requestAnimationFrame(() => {
				const panelWidth = actionPanel.getBoundingClientRect().width;
				const fallbackWidth = displayElement.getBoundingClientRect().width;
				const availableWidth = Math.max(0, (panelWidth || fallbackWidth) - 16);
				if (!availableWidth) {
					if (retries > 0) setTimeout(() => this.fitLineFontSizes(actionPanel, displayElement, retries - 1), 60);
					else displayElement.style.visibility = "";
					return;
				}
				const baseFontSize = 11;
				const minFontSize = 5;
				displayElement.querySelectorAll(".mwi-action-stat-line").forEach((line) => {
					const textSpan = line.querySelector("span");
					if (!textSpan) return;
					textSpan.style.setProperty("display", "inline-block");
					textSpan.style.setProperty("transform-origin", "left center");
					textSpan.style.setProperty("transform", "scaleX(1)");
					let fontSize = baseFontSize;
					textSpan.style.setProperty("font-size", `${fontSize}px`, "important");
					let textWidth = textSpan.getBoundingClientRect().width;
					let iterations = 0;
					while (textWidth > availableWidth && fontSize > minFontSize && iterations < 20) {
						fontSize -= 1;
						textSpan.style.setProperty("font-size", `${fontSize}px`, "important");
						textWidth = textSpan.getBoundingClientRect().width;
						iterations += 1;
					}
					if (textWidth > availableWidth) {
						const scaleX = Math.max(.6, availableWidth / textWidth);
						textSpan.style.setProperty("transform", `scaleX(${scaleX})`);
					}
				});
				displayElement.style.visibility = "";
				this.syncStatsLayout(actionPanel, displayElement);
				this.scheduleStatsLayoutSync(actionPanel, displayElement);
			});
		}
		getResizeObserver() {
			if (!this.resizeObserver) this.resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const displayElement = entry.target;
					const actionPanel = displayElement.parentElement;
					if (actionPanel) {
						this.syncStatsLayout(actionPanel, displayElement);
						this.scheduleStatsLayoutSync(actionPanel, displayElement);
					}
				}
			});
			return this.resizeObserver;
		}
		syncStatsLayout(actionPanel, displayElement) {
			if (!actionPanel || !displayElement) return;
			if (!document.body.contains(actionPanel) || !document.body.contains(displayElement)) return;
			actionPanel.style.alignSelf = "flex-start";
			actionPanel.style.overflow = "visible";
			if (actionPanel.style.position !== "relative" && actionPanel.style.position !== "absolute") actionPanel.style.position = "relative";
			if (displayElement.style.display === "none") {
				actionPanel.style.marginBottom = "";
				return;
			}
			const height = Math.ceil(displayElement.getBoundingClientRect().height || displayElement.offsetHeight || 0);
			if (height > 0) actionPanel.style.marginBottom = `${height}px`;
		}
		scheduleStatsLayoutSync(actionPanel, displayElement) {
			requestAnimationFrame(() => {
				this.syncStatsLayout(actionPanel, displayElement);
				requestAnimationFrame(() => {
					this.syncStatsLayout(actionPanel, displayElement);
				});
			});
		}
		syncAllStatsLayouts() {
			for (const [actionPanel, data] of this.actionElements.entries()) {
				if (!document.body.contains(actionPanel) || !data.displayElement) continue;
				this.scheduleStatsLayoutSync(actionPanel, data.displayElement);
			}
		}
		/**
		* Clear all DOM references to prevent memory leaks during character switch
		*/
		clearAllReferences() {
			clearTimeout(this.indicatorUpdateDebounceTimer);
			this.indicatorUpdateDebounceTimer = null;
			if (this.resizeObserver) {
				this.resizeObserver.disconnect();
				this.resizeObserver = null;
			}
			for (const [actionPanel, data] of this.actionElements.entries()) {
				if (data.displayElement) {
					data.displayElement.innerHTML = "";
					data.displayElement.remove();
					data.displayElement = null;
				}
				actionPanel.style.marginBottom = "";
				actionPanel.style.overflow = "";
			}
			this.actionElements.clear();
			actionPanelSort.clearAllPanels();
		}
		/**
		* Disable the gathering stats display
		*/
		disable() {
			clearTimeout(this.itemsUpdatedDebounceTimer);
			clearTimeout(this.actionCompletedDebounceTimer);
			clearTimeout(this.consumablesUpdatedDebounceTimer);
			clearTimeout(this.indicatorUpdateDebounceTimer);
			this.itemsUpdatedDebounceTimer = null;
			this.actionCompletedDebounceTimer = null;
			this.consumablesUpdatedDebounceTimer = null;
			this.indicatorUpdateDebounceTimer = null;
			if (this.itemsUpdatedHandler) {
				src_core_data_manager_js.default.off("items_updated", this.itemsUpdatedHandler);
				this.itemsUpdatedHandler = null;
			}
			if (this.consumablesUpdatedHandler) {
				src_core_data_manager_js.default.off("consumables_updated", this.consumablesUpdatedHandler);
				this.consumablesUpdatedHandler = null;
			}
			if (this.characterSwitchingHandler) {
				src_core_data_manager_js.default.off("character_switching", this.characterSwitchingHandler);
				this.characterSwitchingHandler = null;
			}
			if (this.pricingModeHandler) {
				src_core_config_js.default.offSettingChange("profitCalc_pricingMode", this.pricingModeHandler);
				this.pricingModeHandler = null;
			}
			if (this.showProfitPerHourHandler) {
				src_core_config_js.default.offSettingChange("actionPanel_showProfitPerHour_gathering", this.showProfitPerHourHandler);
				this.showProfitPerHourHandler = null;
			}
			if (this.showExpPerHourHandler) {
				src_core_config_js.default.offSettingChange("actionPanel_showExpPerHour_gathering", this.showExpPerHourHandler);
				this.showExpPerHourHandler = null;
			}
			this.clearAllReferences();
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			document.querySelectorAll(".mwi-gathering-stats").forEach((el) => el.remove());
			this.actionElements.clear();
			this.isInitialized = false;
		}
	};
	var gatheringStats = new GatheringStats();
	//#endregion
	//#region src/features/actions/required-materials.js
	/**
	* Required Materials Display
	* Shows total required materials and missing amounts for production actions
	*/
	var RequiredMaterials = class {
		constructor() {
			this.initialized = false;
			this.observers = [];
			this.processedPanels = /* @__PURE__ */ new WeakSet();
		}
		initialize() {
			if (this.initialized) return;
			const unregister = src_core_dom_observer_js.default.onClass("RequiredMaterials-ActionPanel", "SkillActionDetail_skillActionDetail", () => this.processActionPanels());
			this.observers.push(unregister);
			this.processActionPanels();
			this.initialized = true;
		}
		processActionPanels() {
			document.querySelectorAll("[class*=\"SkillActionDetail_skillActionDetail\"]").forEach((panel) => {
				if (this.processedPanels.has(panel)) return;
				const inputField = (0, src_utils_action_panel_helper_js.findActionInput)(panel);
				if (!inputField) return;
				this.processedPanels.add(panel);
				(0, src_utils_action_panel_helper_js.attachInputListeners)(panel, inputField, (value) => {
					this.updateRequiredMaterials(panel, value);
				});
				(0, src_utils_action_panel_helper_js.performInitialUpdate)(inputField, (value) => {
					this.updateRequiredMaterials(panel, value);
				});
			});
		}
		updateRequiredMaterials(panel, amount) {
			panel.querySelectorAll(".mwi-required-materials, .mwi-artisan-warning").forEach((el) => el.remove());
			const numActions = parseInt(amount) || 0;
			const isIndeterminate = numActions <= 0;
			const placeholderLabel = isNaN(parseInt(amount)) ? "∞" : "0";
			const actionHrid = this.getActionHridFromPanel(panel);
			if (!actionHrid) return;
			const materials = (0, src_utils_material_calculator_js.calculateMaterialRequirements)(actionHrid, isIndeterminate ? 1 : numActions, true);
			if (!materials || materials.length === 0) return;
			const requiresDiv = panel.querySelector("[class*=\"SkillActionDetail_itemRequirements\"]");
			if (!requiresDiv) return;
			if ((0, src_utils_material_calculator_js.isArtisanTeaOutOfStock)(actionHrid)) {
				const warning = document.createElement("div");
				warning.className = "mwi-artisan-warning";
				warning.style.cssText = "color:#f0a830; font-size:11px; text-align:center; padding:3px 0 1px 0;";
				warning.textContent = "⚠ Artisan Tea out of stock — full material amounts shown";
				requiresDiv.insertAdjacentElement("afterend", warning);
			}
			const children = Array.from(requiresDiv.children);
			let materialIndex = 0;
			const regularMaterials = materials.filter((m) => !m.isUpgradeItem);
			const upgradeMaterial = materials.find((m) => m.isUpgradeItem);
			if (upgradeMaterial) this.processUpgradeItemWithData(panel, upgradeMaterial, isIndeterminate, placeholderLabel);
			children.forEach((child, index) => {
				if (child.className && child.className.includes("inputCount")) {
					const targetContainer = requiresDiv.children[index + 1];
					if (!targetContainer) return;
					if (materialIndex >= regularMaterials.length) return;
					const material = regularMaterials[materialIndex];
					const displaySpan = document.createElement("span");
					displaySpan.className = "mwi-required-materials";
					displaySpan.style.cssText = `
                    display: block;
                    font-size: 0.85em;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-top: 2px;
                `;
					let text;
					if (isIndeterminate) {
						text = `Required: ${placeholderLabel}`;
						displaySpan.style.color = "";
					} else {
						const queuedText = material.queued > 0 ? ` (${(0, src_utils_formatters_js.numberFormatter)(material.queued)} Q'd)` : "";
						text = `Required: ${(0, src_utils_formatters_js.numberFormatter)(material.required)}${queuedText}`;
						if (material.missing > 0) {
							const missingQueuedText = material.queued > 0 ? ` (${(0, src_utils_formatters_js.numberFormatter)(material.queued)} Q'd)` : "";
							text += ` || Missing: ${(0, src_utils_formatters_js.numberFormatter)(material.missing)}${missingQueuedText}`;
							displaySpan.style.color = src_core_config_js.default.COLOR_LOSS;
						} else displaySpan.style.color = src_core_config_js.default.COLOR_PROFIT;
					}
					displaySpan.textContent = text;
					targetContainer.appendChild(displaySpan);
					materialIndex++;
				}
			});
		}
		/**
		* Process upgrade item display with material data
		* @param {HTMLElement} panel - Action panel element
		* @param {Object} material - Material object from calculateMaterialRequirements
		*/
		processUpgradeItemWithData(panel, material, isIndeterminate, placeholderLabel) {
			try {
				const upgradeContainer = panel.querySelector("[class*=\"SkillActionDetail_upgradeItemSelectorInput\"]");
				if (!upgradeContainer) return;
				const displaySpan = document.createElement("span");
				displaySpan.className = "mwi-required-materials";
				displaySpan.style.cssText = `
                display: block;
                font-size: 0.85em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 2px;
            `;
				let text;
				if (isIndeterminate) {
					text = `Required: ${placeholderLabel}`;
					displaySpan.style.color = "";
				} else {
					const queuedText = material.queued > 0 ? ` (${(0, src_utils_formatters_js.numberFormatter)(material.queued)} Q'd)` : "";
					text = `Required: ${(0, src_utils_formatters_js.numberFormatter)(material.required)}${queuedText}`;
					if (material.missing > 0) {
						const missingQueuedText = material.queued > 0 ? ` (${(0, src_utils_formatters_js.numberFormatter)(material.queued)} Q'd)` : "";
						text += ` || Missing: ${(0, src_utils_formatters_js.numberFormatter)(material.missing)}${missingQueuedText}`;
						displaySpan.style.color = src_core_config_js.default.COLOR_LOSS;
					} else displaySpan.style.color = src_core_config_js.default.COLOR_PROFIT;
				}
				displaySpan.textContent = text;
				upgradeContainer.after(displaySpan);
			} catch (error) {
				console.error("[Required Materials] Error processing upgrade item:", error);
			}
		}
		/**
		* Get action HRID from panel
		* @param {HTMLElement} panel - Action panel element
		* @returns {string|null} Action HRID or null
		*/
		getActionHridFromPanel(panel) {
			const actionNameElement = panel.querySelector("[class*=\"SkillActionDetail_name\"]");
			if (!actionNameElement) return null;
			return getActionHridFromName(Array.from(actionNameElement.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE).map((node) => node.textContent).join("").trim());
		}
		cleanup() {
			this.observers.forEach((unregister) => unregister());
			this.observers = [];
			this.processedPanels = /* @__PURE__ */ new WeakSet();
			document.querySelectorAll(".mwi-required-materials").forEach((el) => el.remove());
			this.initialized = false;
		}
		disable() {
			this.cleanup();
		}
	};
	var requiredMaterials = new RequiredMaterials();
	//#endregion
	//#region src/utils/marketplace-autofill.js
	/**
	* Marketplace Buy Modal Autofill Utility
	* Provides shared functionality for auto-filling quantity in marketplace buy modals
	* Used by missing materials features (actions, houses, etc.)
	*/
	/**
	* Find the quantity input in the buy modal
	* For equipment items, there are multiple number inputs (enhancement level + quantity)
	* We need to find the correct one by checking parent containers for label text
	* @param {HTMLElement} modal - Modal container element
	* @returns {HTMLInputElement|null} Quantity input element or null
	*/
	function findQuantityInput(modal) {
		const allInputs = Array.from(modal.querySelectorAll("input[type=\"number\"]"));
		if (allInputs.length === 0) return null;
		if (allInputs.length === 1) return allInputs[0];
		return allInputs[allInputs.length - 1];
	}
	/**
	* Handle buy modal appearance and auto-fill quantity if available
	* @param {HTMLElement} modal - Modal container element
	* @param {number|null} activeQuantity - Static quantity to auto-fill (null if using pending fn)
	* @param {Function|null} pendingCalculation - Lazy fn that returns current quantity (takes priority)
	*/
	function handleBuyModal(modal, activeQuantity, pendingCalculation) {
		const quantity = pendingCalculation ? pendingCalculation() : activeQuantity;
		if (!quantity || quantity <= 0) return;
		if (!(modal.querySelector("[class*=\"Button_buy\"]") || modal.textContent.includes("Buy Now") || modal.textContent.includes("Buy Listing") || modal.textContent.includes("立即购买") || modal.textContent.includes("买入挂单"))) return;
		const quantityInput = findQuantityInput(modal);
		if (!quantityInput) return;
		Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set.call(quantityInput, quantity.toString());
		const inputEvent = new Event("input", { bubbles: true });
		quantityInput.dispatchEvent(inputEvent);
	}
	/**
	* Create an autofill manager instance
	* Manages storing quantity to autofill and observing buy modals
	* @param {string} observerId - Unique ID for this observer (e.g., 'MissingMats-Actions')
	* @returns {Object} Autofill manager with methods: setQuantity, setPendingCalculation, clearQuantity, initialize, cleanup
	*/
	function createAutofillManager(observerId) {
		let activeQuantity = null;
		let pendingCalculation = null;
		let observerUnregister = null;
		return {
			/**
			* Set a static quantity to auto-fill in the next buy modal
			* @param {number} quantity - Quantity to auto-fill
			*/
			setQuantity(quantity) {
				activeQuantity = quantity;
				pendingCalculation = null;
			},
			/**
			* Set a lazy calculation function that is called each time a buy modal opens.
			* Takes priority over setQuantity — quantity is recomputed fresh on every modal open,
			* so subsequent purchases within the same session always autofill the remaining needed amount.
			* @param {Function} fn - Function returning the current quantity to fill
			*/
			setPendingCalculation(fn) {
				pendingCalculation = fn;
				activeQuantity = null;
			},
			/**
			* Clear the stored quantity (cancel autofill)
			*/
			clearQuantity() {
				activeQuantity = null;
				pendingCalculation = null;
			},
			/**
			* Get the current active quantity
			* @returns {number|null} Current quantity or null
			*/
			getQuantity() {
				return pendingCalculation ? pendingCalculation() : activeQuantity;
			},
			/**
			* Initialize buy modal observer
			* Sets up watching for buy modals to appear and auto-fills them
			*/
			initialize() {
				observerUnregister = src_core_dom_observer_js.default.onClass(observerId, "Modal_modalContainer", (modal) => {
					handleBuyModal(modal, activeQuantity, pendingCalculation);
					if (activeQuantity !== null && !pendingCalculation) activeQuantity = null;
				});
			},
			/**
			* Cleanup observer
			* Stops watching for buy modals and clears quantity
			*/
			cleanup() {
				if (observerUnregister) {
					observerUnregister();
					observerUnregister = null;
				}
				activeQuantity = null;
				pendingCalculation = null;
			}
		};
	}
	//#endregion
	//#region src/utils/marketplace-tabs.js
	/**
	* Marketplace Custom Tabs Utility
	* Provides shared functionality for creating and managing custom marketplace tabs
	* Used by missing materials features (actions, houses, etc.)
	*/
	/**
	* Create a custom material tab for the marketplace
	* @param {Object} material - Material data object
	* @param {string} material.itemHrid - Item HRID
	* @param {string} material.itemName - Display name for the item
	* @param {number} material.missing - Amount missing (0 if sufficient)
	* @param {number} [material.queued=0] - Amount reserved by queue
	* @param {boolean} material.isTradeable - Whether item can be traded
	* @param {HTMLElement} referenceTab - Tab element to clone structure from
	* @param {Function} onClickCallback - Callback when tab is clicked, receives (e, material)
	* @returns {HTMLElement} Created tab element
	*/
	function createMaterialTab(material, referenceTab, onClickCallback) {
		const tab = referenceTab.cloneNode(true);
		tab.setAttribute("data-mwi-custom-tab", "true");
		tab.setAttribute("data-item-hrid", material.itemHrid);
		tab.setAttribute("data-missing-quantity", material.missing.toString());
		let statusColor;
		let statusText;
		if (!material.isTradeable) {
			statusColor = "#888888";
			statusText = "Not Tradeable";
		} else if (material.missing > 0) {
			statusColor = "#ef4444";
			const queuedText = material.queued > 0 ? ` (${(0, src_utils_formatters_js.formatWithSeparator)(material.queued)} Q'd)` : "";
			statusText = `Missing: ${(0, src_utils_formatters_js.formatWithSeparator)(material.missing)}${queuedText}`;
		} else {
			statusColor = "#4ade80";
			statusText = `Sufficient (${(0, src_utils_formatters_js.formatWithSeparator)(material.required)})`;
		}
		const badgeSpan = tab.querySelector("[class*=\"TabsComponent_badge\"]");
		if (badgeSpan) badgeSpan.innerHTML = `
            <div style="text-align: center;">
                <div>${material.itemName.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")}</div>
                <div style="font-size: 0.75em; color: ${statusColor};">
                    ${statusText}
                </div>
            </div>
        `;
		if (!material.isTradeable) {
			tab.style.opacity = "0.5";
			tab.style.cursor = "not-allowed";
		}
		tab.classList.remove("Mui-selected");
		tab.setAttribute("aria-selected", "false");
		tab.setAttribute("tabindex", "-1");
		tab.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (!material.isTradeable) return;
			if (onClickCallback) onClickCallback(e, material);
		});
		return tab;
	}
	/**
	* Remove all custom material tabs from the marketplace
	*/
	function removeMaterialTabs() {
		document.querySelectorAll("[data-mwi-custom-tab=\"true\"]").forEach((tab) => tab.remove());
	}
	/**
	* Setup marketplace cleanup observer
	* Watches for marketplace panel removal and calls cleanup callback
	* @param {Function} onCleanup - Callback when marketplace closes, receives no args
	* @param {Array} tabsArray - Array reference to track tabs (will be checked for length)
	* @returns {Function} Unregister function to stop observing
	*/
	function setupMarketplaceCleanupObserver(onCleanup, tabsArray) {
		let pollInterval = null;
		function poll() {
			if (!tabsArray || tabsArray.length === 0) return;
			if (!tabsArray.some((tab) => document.body.contains(tab))) {
				if (onCleanup) onCleanup();
				return;
			}
			const subPanelContainer = document.querySelector(".MarketplacePanel_marketplacePanel__21b7o")?.closest(".MainPanel_subPanelContainer__1i-H9");
			if (subPanelContainer && getComputedStyle(subPanelContainer).display === "none") {
				if (onCleanup) onCleanup();
			}
		}
		pollInterval = setInterval(poll, 1e3);
		return () => {
			if (pollInterval) {
				clearInterval(pollInterval);
				pollInterval = null;
			}
		};
	}
	/**
	* Get game object via React fiber
	* @returns {Object|null} Game component instance
	*/
	function getGameObject$2() {
		const rootEl = document.getElementById("root");
		const rootFiber = rootEl?._reactRootContainer?.current || rootEl?._reactRootContainer?._internalRoot?.current;
		if (!rootFiber) return null;
		function find(fiber) {
			if (!fiber) return null;
			if (fiber.stateNode?.handleGoToMarketplace) return fiber.stateNode;
			return find(fiber.child) || find(fiber.sibling);
		}
		return find(rootFiber);
	}
	/**
	* Navigate to marketplace for a specific item
	* @param {string} itemHrid - Item HRID to navigate to
	* @param {number} enhancementLevel - Enhancement level (default 0)
	*/
	function navigateToMarketplace(itemHrid, enhancementLevel = 0) {
		const game = getGameObject$2();
		if (game?.handleGoToMarketplace) game.handleGoToMarketplace(itemHrid, enhancementLevel);
	}
	//#endregion
	//#region src/features/actions/missing-materials-button.js
	/**
	* Missing Materials Marketplace Button
	* Adds button to production and enhancement panels that opens marketplace with tabs for missing materials
	*/
	/**
	* Module-level state
	*/
	var cleanupObserver$1 = null;
	var currentMaterialsTabs = [];
	var domObserverUnregister$1 = null;
	var enhancementDomObserverUnregister = null;
	var processedPanels$1 = /* @__PURE__ */ new WeakSet();
	var processedEnhancingPanels = /* @__PURE__ */ new WeakSet();
	var inventoryUpdateHandler = null;
	var storedActionHrid = null;
	var storedNumActions = 0;
	var storedEnhancementContext = null;
	var timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
	var autofillManager$1 = createAutofillManager("MissingMats-Actions");
	/**
	* Enhancement panel debounce timeout
	*/
	var enhancementDebounceTimeout = null;
	/**
	* Production action types (where button should appear)
	*/
	var PRODUCTION_TYPES$4 = [
		"/action_types/brewing",
		"/action_types/cooking",
		"/action_types/cheesesmithing",
		"/action_types/crafting",
		"/action_types/tailoring"
	];
	/**
	* Initialize missing materials button feature
	*/
	function initialize$1() {
		cleanupObserver$1 = setupMarketplaceCleanupObserver(handleMarketplaceCleanup, currentMaterialsTabs);
		autofillManager$1.initialize();
		domObserverUnregister$1 = src_core_dom_observer_js.default.onClass("MissingMaterialsButton-ActionPanel", "SkillActionDetail_skillActionDetail", () => processActionPanels$1());
		enhancementDomObserverUnregister = src_core_dom_observer_js.default.onClass("MissingMaterialsButton-EnhancingPanel", "SkillActionDetail_enhancingComponent__17bOx", (panel) => processEnhancingPanel(panel));
		processActionPanels$1();
		processExistingEnhancingPanels();
	}
	/**
	* Cleanup function
	*/
	function cleanup$1() {
		if (domObserverUnregister$1) {
			domObserverUnregister$1();
			domObserverUnregister$1 = null;
		}
		if (enhancementDomObserverUnregister) {
			enhancementDomObserverUnregister();
			enhancementDomObserverUnregister = null;
		}
		if (cleanupObserver$1) {
			cleanupObserver$1();
			cleanupObserver$1 = null;
		}
		autofillManager$1.cleanup();
		handleMarketplaceCleanup();
		processedPanels$1 = /* @__PURE__ */ new WeakSet();
		processedEnhancingPanels = /* @__PURE__ */ new WeakSet();
		if (enhancementDebounceTimeout) {
			clearTimeout(enhancementDebounceTimeout);
			enhancementDebounceTimeout = null;
		}
		timerRegistry.clearAll();
	}
	/**
	* Process action panels - watch for input changes
	*/
	function processActionPanels$1() {
		document.querySelectorAll("[class*=\"SkillActionDetail_skillActionDetail\"]").forEach((panel) => {
			if (processedPanels$1.has(panel)) return;
			const inputField = (0, src_utils_action_panel_helper_js.findActionInput)(panel);
			if (!inputField) return;
			processedPanels$1.add(panel);
			(0, src_utils_action_panel_helper_js.attachInputListeners)(panel, inputField, (value) => {
				updateButtonForPanel(panel, value);
			});
			(0, src_utils_action_panel_helper_js.performInitialUpdate)(inputField, (value) => {
				updateButtonForPanel(panel, value);
			});
		});
	}
	/**
	* Update button visibility and content for a panel based on input value
	* @param {HTMLElement} panel - Action panel element
	* @param {string} value - Input value (number of actions)
	*/
	function updateButtonForPanel(panel, value) {
		const numActions = parseInt(value) || 0;
		const existingButton = panel.querySelector("#mwi-missing-mats-button");
		if (existingButton) existingButton.remove();
		if (!src_core_config_js.default.getSetting("actions_missingMaterialsButton")) return;
		const actionHrid = getActionHridFromPanel$3(panel);
		if (!actionHrid) return;
		const actionDetail = src_core_data_manager_js.default.getInitClientData().actionDetailMap[actionHrid];
		if (!actionDetail) return;
		if (!PRODUCTION_TYPES$4.includes(actionDetail.type)) return;
		if (!actionDetail.inputItems || actionDetail.inputItems.length === 0) return;
		let missingMaterials = [];
		let disabled = false;
		if (numActions <= 0) disabled = true;
		else {
			const accountForQueue = !(src_core_config_js.default.getSetting("actions_missingMaterialsButton_ignoreQueue") || false);
			missingMaterials = (0, src_utils_material_calculator_js.calculateMaterialRequirements)(actionHrid, numActions, accountForQueue);
			if (missingMaterials.length === 0) disabled = true;
		}
		const button = createMissingMaterialsButton(missingMaterials, actionHrid, numActions, disabled);
		const itemRequirements = panel.querySelector(".SkillActionDetail_itemRequirements__3SPnA");
		if (itemRequirements) itemRequirements.parentNode.insertBefore(button, itemRequirements.nextSibling);
		else panel.insertBefore(button, panel.firstChild);
	}
	/**
	* Get action HRID from panel
	* @param {HTMLElement} panel - Action panel element
	* @returns {string|null} Action HRID or null
	*/
	function getActionHridFromPanel$3(panel) {
		const actionNameElement = panel.querySelector("[class*=\"SkillActionDetail_name\"]");
		if (!actionNameElement) return null;
		return getActionHridFromName(Array.from(actionNameElement.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE).map((node) => node.textContent).join("").trim());
	}
	/**
	* Process existing enhancing panels on the page
	*/
	function processExistingEnhancingPanels() {
		document.querySelectorAll("[class*=\"SkillActionDetail_enhancingComponent\"]").forEach((panel) => processEnhancingPanel(panel));
	}
	/**
	* Process an enhancing panel - set up mutation watcher and create button
	* @param {HTMLElement} panel - Enhancing panel element
	*/
	function processEnhancingPanel(panel) {
		if (!panel || processedEnhancingPanels.has(panel)) return;
		processedEnhancingPanels.add(panel);
		(0, src_utils_dom_observer_helpers_js.createMutationWatcher)(panel, (mutations) => {
			if (mutations.every((m) => {
				const nodes = [...m.addedNodes, ...m.removedNodes];
				return nodes.length > 0 && nodes.every((n) => n.id === "mwi-missing-mats-button");
			})) return;
			if (enhancementDebounceTimeout) clearTimeout(enhancementDebounceTimeout);
			enhancementDebounceTimeout = setTimeout(() => {
				enhancementDebounceTimeout = null;
				updateEnhancementButton(panel);
			}, 500);
		}, {
			childList: true,
			subtree: true,
			attributes: true
		});
		setTimeout(() => updateEnhancementButton(panel), 600);
	}
	/**
	* Get current enhancement level from action queue or DOM
	* @param {HTMLElement} panel - Enhancing panel element
	* @returns {number} Current enhancement level (0-19)
	*/
	function getCurrentEnhancementLevel(panel) {
		const enhancingAction = src_core_data_manager_js.default.getCurrentActions().find((a) => a.actionHrid === "/actions/enhancing/enhance");
		if (enhancingAction?.primaryItemHash) {
			const parts = enhancingAction.primaryItemHash.split("::");
			const lastPart = parts[parts.length - 1];
			if (lastPart && !lastPart.startsWith("/")) {
				const parsed = parseInt(lastPart, 10);
				if (!isNaN(parsed)) return parsed;
			}
		}
		const inputItems = panel.querySelectorAll(".SkillActionDetail_item__2vEAz .Item_name__2C42x");
		if (inputItems.length > 0) {
			const levelMatch = inputItems[0].textContent.trim().match(/\+(\d+)$/);
			if (levelMatch) return parseInt(levelMatch[1], 10);
		}
		return 0;
	}
	/**
	* Get target enhancement level from UI input
	* @param {HTMLElement} panel - Enhancing panel element
	* @returns {number|null} Target level (1-20) or null if not found
	*/
	/**
	* Get repeat count from enhancement panel UI
	* @param {HTMLElement} panel - Enhancing panel element
	* @returns {number} Repeat count (defaults to 1 if not found)
	*/
	function getRepeatCountFromUI(panel) {
		const inputs = Array.from(panel.querySelectorAll("input[type=\"number\"]"));
		if (inputs.length > 0) {
			const input = inputs[0];
			if (input) {
				if (input.value === "∞") return null;
				const value = parseInt(input.value, 10);
				if (!isNaN(value) && value > 0) return value;
			}
		}
		return 1;
	}
	function getTargetLevelFromUI(panel) {
		const inputs = Array.from(panel.querySelectorAll("input[type=\"number\"]"));
		if (inputs.length > 1) {
			const input = inputs[1];
			if (input && input.value) {
				const value = parseInt(input.value, 10);
				if (!isNaN(value)) return Math.max(1, Math.min(20, value));
			}
		}
		return null;
	}
	/**
	* Update the missing materials button on an enhancement panel
	* @param {HTMLElement} panel - Enhancing panel element
	*/
	function updateEnhancementButton(panel) {
		const existingButton = panel.querySelector("#mwi-missing-mats-button");
		if (existingButton) existingButton.remove();
		if (!src_core_config_js.default.getSetting("actions_missingMaterialsButton")) return;
		const itemHrid = panel.dataset.mwiItemHrid;
		if (!itemHrid) return;
		const startLevel = getCurrentEnhancementLevel(panel);
		const targetLevel = getTargetLevelFromUI(panel);
		if (targetLevel === null || targetLevel <= startLevel) return;
		const protectionItemHrid = getProtectionItemFromUI(panel);
		const protectFromLevel = getProtectFromLevelFromUI(panel);
		const repeatCount = getRepeatCountFromUI(panel);
		let resolvedProtectFrom = protectFromLevel;
		let resolvedProtectionItem = protectionItemHrid;
		let autoProtection = false;
		if (protectFromLevel === 0) {
			const pathResult = calculateEnhancementPath(itemHrid, targetLevel, (0, src_utils_enhancement_config_js.getEnhancingParams)());
			if (pathResult?.optimalStrategy) {
				resolvedProtectFrom = pathResult.optimalStrategy.protectFrom;
				resolvedProtectionItem = pathResult.optimalStrategy.protectionItemHrid || protectionItemHrid;
				autoProtection = true;
			}
		}
		const missingMaterials = (0, src_utils_material_calculator_js.calculateEnhancementMaterialRequirements)(itemHrid, startLevel, targetLevel, resolvedProtectionItem, resolvedProtectFrom, repeatCount);
		const disabled = missingMaterials.length === 0;
		const button = createEnhancementMissingMaterialsButton(missingMaterials, itemHrid, startLevel, targetLevel, resolvedProtectionItem, resolvedProtectFrom, repeatCount, disabled, autoProtection ? {
			protectFrom: resolvedProtectFrom,
			protectionItemHrid: resolvedProtectionItem
		} : null);
		const itemRequirements = panel.querySelector(".SkillActionDetail_itemRequirements__3SPnA");
		if (itemRequirements) itemRequirements.parentNode.insertBefore(button, itemRequirements.nextSibling);
		else {
			const enhancementStats = panel.querySelector("#mwi-enhancement-stats");
			if (enhancementStats) enhancementStats.parentNode.insertBefore(button, enhancementStats);
			else panel.appendChild(button);
		}
	}
	/**
	* Create missing materials button for enhancement panels
	* @param {Array} missingMaterials - Array of missing material objects
	* @param {string} itemHrid - Item being enhanced
	* @param {number} startLevel - Current enhancement level
	* @param {number} targetLevel - Target enhancement level
	* @param {string|null} protectionItemHrid - Protection item HRID
	* @param {number} protectFromLevel - Protect from level
	* @param {boolean} disabled - Whether button should be disabled
	* @returns {HTMLElement} Button element
	*/
	function createEnhancementMissingMaterialsButton(missingMaterials, itemHrid, startLevel, targetLevel, protectionItemHrid, protectFromLevel, repeatCount, disabled, strategyInfo) {
		const button = document.createElement("button");
		button.id = "mwi-missing-mats-button";
		button.textContent = (0, src_core_i18n_js.t)("Missing Mats Marketplace");
		button.disabled = disabled;
		button.style.cssText = `
        width: 100%;
        padding: 10px 16px;
        margin: 8px 0 16px 0;
        background: linear-gradient(180deg, rgba(91, 141, 239, 0.2) 0%, rgba(91, 141, 239, 0.1) 100%);
        color: #ffffff;
        border: 1px solid rgba(91, 141, 239, 0.4);
        border-radius: 8px;
        cursor: ${disabled ? "default" : "pointer"};
        font-size: 14px;
        font-weight: 600;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        opacity: ${disabled ? "0.45" : "1"};
    `;
		if (!disabled) {
			button.addEventListener("mouseenter", () => {
				button.style.background = "linear-gradient(180deg, rgba(91, 141, 239, 0.35) 0%, rgba(91, 141, 239, 0.25) 100%)";
				button.style.borderColor = "rgba(91, 141, 239, 0.6)";
				button.style.boxShadow = "0 3px 6px rgba(0, 0, 0, 0.3)";
			});
			button.addEventListener("mouseleave", () => {
				button.style.background = "linear-gradient(180deg, rgba(91, 141, 239, 0.2) 0%, rgba(91, 141, 239, 0.1) 100%)";
				button.style.borderColor = "rgba(91, 141, 239, 0.4)";
				button.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
			});
			button.addEventListener("click", async () => {
				await handleEnhancementMissingMaterialsClick(itemHrid, startLevel, targetLevel, protectionItemHrid, protectFromLevel, repeatCount, strategyInfo);
			});
		}
		return button;
	}
	/**
	* Handle enhancement missing materials button click
	* @param {Array} missingMaterials - Array of missing material objects
	* @param {string} itemHrid - Item being enhanced
	* @param {number} startLevel - Current enhancement level
	* @param {number} targetLevel - Target enhancement level
	* @param {string|null} protectionItemHrid - Protection item HRID
	* @param {number} protectFromLevel - Protect from level
	*/
	async function handleEnhancementMissingMaterialsClick(itemHrid, startLevel, targetLevel, protectionItemHrid, protectFromLevel, repeatCount, strategyInfo) {
		storedEnhancementContext = {
			itemHrid,
			startLevel,
			targetLevel,
			protectionItemHrid,
			protectFromLevel,
			repeatCount,
			strategyInfo
		};
		storedActionHrid = null;
		storedNumActions = 0;
		if (!await openMarketplacePage()) {
			console.error("[MissingMats] Failed to navigate to marketplace");
			return;
		}
		await new Promise((resolve) => {
			const delayTimeout = setTimeout(resolve, 200);
			timerRegistry.registerTimeout(delayTimeout);
		});
		createMissingMaterialTabs((0, src_utils_material_calculator_js.calculateEnhancementMaterialRequirements)(itemHrid, startLevel, targetLevel, protectionItemHrid, protectFromLevel, repeatCount), strategyInfo);
		setupInventoryListener();
	}
	/**
	* Create missing materials marketplace button
	* @param {Array} missingMaterials - Array of missing material objects
	* @param {string} actionHrid - Action HRID for recalculating materials
	* @param {number} numActions - Number of actions for recalculating materials
	* @param {boolean} disabled - Whether the button should be rendered in a disabled state
	* @returns {HTMLElement} Button element
	*/
	function createMissingMaterialsButton(missingMaterials, actionHrid, numActions, disabled = false) {
		const button = document.createElement("button");
		button.id = "mwi-missing-mats-button";
		button.textContent = (0, src_core_i18n_js.t)("Missing Mats Marketplace");
		button.disabled = disabled;
		button.title = disabled && numActions <= 0 ? (0, src_core_i18n_js.t)("Enter a quantity to check missing materials") : "";
		button.style.cssText = `
        width: 100%;
        padding: 10px 16px;
        margin: 8px 0 16px 0;
        background: linear-gradient(180deg, rgba(91, 141, 239, 0.2) 0%, rgba(91, 141, 239, 0.1) 100%);
        color: #ffffff;
        border: 1px solid rgba(91, 141, 239, 0.4);
        border-radius: 8px;
        cursor: ${disabled ? "default" : "pointer"};
        font-size: 14px;
        font-weight: 600;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        opacity: ${disabled ? "0.45" : "1"};
    `;
		if (!disabled) {
			button.addEventListener("mouseenter", () => {
				button.style.background = "linear-gradient(180deg, rgba(91, 141, 239, 0.35) 0%, rgba(91, 141, 239, 0.25) 100%)";
				button.style.borderColor = "rgba(91, 141, 239, 0.6)";
				button.style.boxShadow = "0 3px 6px rgba(0, 0, 0, 0.3)";
			});
			button.addEventListener("mouseleave", () => {
				button.style.background = "linear-gradient(180deg, rgba(91, 141, 239, 0.2) 0%, rgba(91, 141, 239, 0.1) 100%)";
				button.style.borderColor = "rgba(91, 141, 239, 0.4)";
				button.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
			});
			button.addEventListener("click", async () => {
				await handleMissingMaterialsClick(actionHrid, numActions);
			});
		}
		return button;
	}
	/**
	* Handle missing materials button click
	* @param {Array} missingMaterials - Array of missing material objects
	* @param {string} actionHrid - Action HRID for recalculating materials
	* @param {number} numActions - Number of actions for recalculating materials
	*/
	async function handleMissingMaterialsClick(actionHrid, numActions) {
		storedActionHrid = actionHrid;
		storedNumActions = numActions;
		storedEnhancementContext = null;
		if (!await openMarketplacePage()) {
			console.error("[MissingMats] Failed to navigate to marketplace");
			return;
		}
		await new Promise((resolve) => {
			const delayTimeout = setTimeout(resolve, 200);
			timerRegistry.registerTimeout(delayTimeout);
		});
		const accountForQueue = !(src_core_config_js.default.getSetting("actions_missingMaterialsButton_ignoreQueue") || false);
		createMissingMaterialTabs((0, src_utils_material_calculator_js.calculateMaterialRequirements)(actionHrid, numActions, accountForQueue));
		setupInventoryListener();
	}
	/**
	* Navigate to marketplace by simulating click on navbar
	* @returns {Promise<boolean>} True if successful
	*/
	async function openMarketplacePage() {
		const navButtons = document.querySelectorAll(".NavigationBar_nav__3uuUl");
		const marketplaceButton = Array.from(navButtons).find((nav) => {
			return nav.querySelector("svg[aria-label=\"navigationBar.marketplace\"]") !== null;
		});
		if (!marketplaceButton) {
			console.error("[MissingMats] Marketplace navbar button not found");
			return false;
		}
		marketplaceButton.click();
		return await waitForMarketplace();
	}
	/**
	* Wait for marketplace panel to appear
	* @returns {Promise<boolean>} True if marketplace appeared within timeout
	*/
	async function waitForMarketplace() {
		const maxAttempts = 50;
		const delayMs = 100;
		for (let i = 0; i < maxAttempts; i++) {
			const tabsContainer = document.querySelector(".MuiTabs-flexContainer[role=\"tablist\"]");
			if (tabsContainer && isMarketplacePanel(tabsContainer)) return true;
			await new Promise((resolve) => {
				const delayTimeout = setTimeout(resolve, delayMs);
				timerRegistry.registerTimeout(delayTimeout);
			});
		}
		console.error("[MissingMats] Marketplace did not open within timeout");
		return false;
	}
	/**
	* Build the click handler for a material tab.
	* Defined outside the loop to satisfy the no-loop-func lint rule.
	* @param {{ tab: HTMLElement|null }} tabRef - Holder updated to the tab element after creation
	* @returns {Function}
	*/
	function makeMaterialClickHandler(tabRef) {
		return (_e, mat) => {
			autofillManager$1.setPendingCalculation(() => {
				return parseInt(tabRef.tab?.getAttribute("data-missing-quantity") || "0", 10);
			});
			navigateToMarketplace(mat.itemHrid, 0);
		};
	}
	/**
	* Create a strategy indicator element for the marketplace tab row
	* @param {Object} strategyInfo - Auto-calculated protection strategy
	* @returns {HTMLElement}
	*/
	function createStrategyIndicator(strategyInfo) {
		const indicator = document.createElement("div");
		indicator.setAttribute("data-mwi-custom-tab", "true");
		indicator.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        font-size: 12px;
        color: #aaa;
        white-space: nowrap;
    `;
		if (strategyInfo.protectFrom === 0) indicator.textContent = (0, src_core_i18n_js.t)("No protection needed");
		else {
			const spriteUse = document.querySelector("use[href*=\"items_sprite\"]");
			if (spriteUse && strategyInfo.protectionItemHrid) {
				const spriteUrl = spriteUse.getAttribute("href").split("#")[0];
				const iconName = strategyInfo.protectionItemHrid.split("/").pop();
				const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				svg.setAttribute("width", "20");
				svg.setAttribute("height", "20");
				svg.style.flexShrink = "0";
				const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
				use.setAttribute("href", `${spriteUrl}#${iconName}`);
				svg.appendChild(use);
				indicator.appendChild(svg);
			}
			const label = document.createElement("span");
			label.textContent = (0, src_core_i18n_js.t)("From: +{0}", strategyInfo.protectFrom);
			indicator.appendChild(label);
		}
		return indicator;
	}
	/**
	* Get game object via React fiber tree traversal
	* @returns {Object|null} Game component instance
	*/
	function getGameObject$1() {
		const rootEl = document.getElementById("root");
		const rootFiber = rootEl?._reactRootContainer?.current || rootEl?._reactRootContainer?._internalRoot?.current;
		if (!rootFiber) return null;
		function find(fiber) {
			if (!fiber) return null;
			if (fiber.stateNode?.handleGoToAction) return fiber.stateNode;
			return find(fiber.child) || find(fiber.sibling);
		}
		return find(rootFiber);
	}
	/**
	* Create a "Return to Action" tab for navigating back after buying materials
	* @param {HTMLElement} referenceTab - Tab element to clone structure from
	* @returns {HTMLElement|null} Return tab element, or null if no stored context
	*/
	function createReturnTab(referenceTab) {
		let displayName;
		if (storedActionHrid) {
			displayName = src_core_data_manager_js.default.getActionDetails(storedActionHrid)?.name || storedActionHrid.split("/").pop();
			if (storedNumActions > 0) displayName += ` (\u00d7${(0, src_utils_formatters_js.formatWithSeparator)(storedNumActions)})`;
		} else if (storedEnhancementContext) {
			const ctx = storedEnhancementContext;
			displayName = `${itemNameTranslator.getDisplayName(ctx.itemHrid)} +${ctx.startLevel}\u2192+${ctx.targetLevel}`;
		} else return null;
		const tab = referenceTab.cloneNode(true);
		tab.setAttribute("data-mwi-custom-tab", "true");
		tab.classList.remove("Mui-selected");
		tab.setAttribute("aria-selected", "false");
		tab.setAttribute("tabindex", "-1");
		const badgeSpan = tab.querySelector("[class*=\"TabsComponent_badge\"]");
		if (badgeSpan) badgeSpan.innerHTML = `
            <div style="text-align: center;">
                <div>${(0, src_core_i18n_js.t)("↩ Return")}</div>
                <div style="font-size: 0.75em; color: #60a5fa;">${displayName}</div>
            </div>
        `;
		tab.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			handleReturnToAction();
		});
		return tab;
	}
	/**
	* Navigate back to the stored action and restore input values
	*/
	async function handleReturnToAction() {
		const game = getGameObject$1();
		if (!game) return;
		if (storedActionHrid) game.handleGoToAction(storedActionHrid);
		else if (storedEnhancementContext) game.handleChangeNavTarget("enhancing");
		else return;
		if (storedActionHrid && storedNumActions > 0) {
			const maxAttempts = 20;
			for (let i = 0; i < maxAttempts; i++) {
				await new Promise((resolve) => {
					const t = setTimeout(resolve, 100);
					timerRegistry.registerTimeout(t);
				});
				const input = document.querySelector("[class*=\"maxActionCountInput\"] input") || document.querySelector("[class*=\"SkillActionDetail_skillActionDetail\"] input[type=\"number\"]");
				if (input) {
					(0, src_utils_react_input_js.setReactInputValue)(input, storedNumActions);
					break;
				}
			}
		}
	}
	/**
	* Create custom tabs for missing materials
	* @param {Array} missingMaterials - Array of missing material objects
	* @param {Object|null} strategyInfo - Auto-calculated protection strategy info
	*/
	function createMissingMaterialTabs(missingMaterials, strategyInfo = null) {
		const tabsContainer = document.querySelector(".MuiTabs-flexContainer[role=\"tablist\"]");
		if (!tabsContainer) {
			console.error("[MissingMats] Tabs container not found");
			return;
		}
		removeMaterialTabs();
		currentMaterialsTabs.length = 0;
		const referenceTab = getMyListingsTab(tabsContainer);
		if (!referenceTab) {
			console.error("[MissingMats] Reference tab not found");
			return;
		}
		if (tabsContainer) tabsContainer.style.flexWrap = "wrap";
		if (!tabsContainer.hasAttribute("data-mwi-delegated-listener")) {
			tabsContainer.setAttribute("data-mwi-delegated-listener", "true");
			tabsContainer.addEventListener("click", (e) => {
				const clickedTab = e.target.closest("button");
				if (clickedTab && !clickedTab.hasAttribute("data-mwi-custom-tab")) autofillManager$1.clearQuantity();
			});
		}
		currentMaterialsTabs.length = 0;
		if (strategyInfo) {
			const indicator = createStrategyIndicator(strategyInfo);
			tabsContainer.appendChild(indicator);
			currentMaterialsTabs.push(indicator);
		}
		for (const material of missingMaterials) {
			const tabRef = { tab: null };
			const tab = createMaterialTab(material, referenceTab, makeMaterialClickHandler(tabRef));
			tabRef.tab = tab;
			tabsContainer.appendChild(tab);
			currentMaterialsTabs.push(tab);
		}
		const returnTab = createReturnTab(referenceTab);
		if (returnTab) {
			tabsContainer.appendChild(returnTab);
			currentMaterialsTabs.push(returnTab);
		}
	}
	/**
	* Setup inventory listener for live tab updates
	* Listens for inventory changes via websocket and updates tabs accordingly
	*/
	function setupInventoryListener() {
		if (inventoryUpdateHandler) src_core_websocket_js.default.off("*", inventoryUpdateHandler);
		inventoryUpdateHandler = (data) => {
			if (data.type?.includes("item") || data.type?.includes("inventory") || data.type?.includes("market") || data.inventory || data.characterItems) updateTabsOnInventoryChange();
		};
		src_core_websocket_js.default.on("*", inventoryUpdateHandler);
	}
	/**
	* Update all custom tabs when inventory changes
	* Recalculates materials and updates badge display
	*/
	function updateTabsOnInventoryChange() {
		if (currentMaterialsTabs.length === 0) return;
		let updatedMaterials;
		if (storedEnhancementContext) {
			const ctx = storedEnhancementContext;
			updatedMaterials = (0, src_utils_material_calculator_js.calculateEnhancementMaterialRequirements)(ctx.itemHrid, ctx.startLevel, ctx.targetLevel, ctx.protectionItemHrid, ctx.protectFromLevel, ctx.repeatCount);
		} else if (storedActionHrid && storedNumActions > 0) {
			const accountForQueue = !(src_core_config_js.default.getSetting("actions_missingMaterialsButton_ignoreQueue") || false);
			updatedMaterials = (0, src_utils_material_calculator_js.calculateMaterialRequirements)(storedActionHrid, storedNumActions, accountForQueue);
		} else return;
		currentMaterialsTabs.forEach((tab) => {
			const itemHrid = tab.getAttribute("data-item-hrid");
			const material = updatedMaterials.find((m) => m.itemHrid === itemHrid);
			if (material) updateTabBadge(tab, material);
		});
	}
	/**
	* Update a single tab's badge with new material data
	* @param {HTMLElement} tab - Tab element to update
	* @param {Object} material - Material object with updated counts
	*/
	function updateTabBadge(tab, material) {
		const badgeSpan = tab.querySelector("[class*=\"TabsComponent_badge\"]");
		if (!badgeSpan) return;
		let statusColor;
		let statusText;
		if (!material.isTradeable) {
			statusColor = "#888888";
			statusText = (0, src_core_i18n_js.t)("Not Tradeable");
		} else if (material.missing > 0) {
			statusColor = "#ef4444";
			const queuedText = material.queued > 0 ? ` (${(0, src_utils_formatters_js.formatWithSeparator)(material.queued)} Q'd)` : "";
			statusText = (0, src_core_i18n_js.t)("Missing: {0}", `${(0, src_utils_formatters_js.formatWithSeparator)(material.missing)}${queuedText}`);
		} else {
			statusColor = "#4ade80";
			statusText = (0, src_core_i18n_js.t)("Sufficient ({0})", (0, src_utils_formatters_js.formatWithSeparator)(material.required));
		}
		badgeSpan.innerHTML = `
        <div style="text-align: center;">
            <div>${material.itemName.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")}</div>
            <div style="font-size: 0.75em; color: ${statusColor};">
                ${statusText}
            </div>
        </div>
    `;
		tab.setAttribute("data-missing-quantity", material.missing.toString());
		if (!material.isTradeable) {
			tab.style.opacity = "0.5";
			tab.style.cursor = "not-allowed";
		} else {
			tab.style.opacity = "1";
			tab.style.cursor = "pointer";
			tab.title = "";
		}
	}
	/**
	* Handle marketplace cleanup (when leaving marketplace)
	* Called by the marketplace cleanup observer
	*/
	function handleMarketplaceCleanup() {
		removeMaterialTabs();
		currentMaterialsTabs.length = 0;
		if (inventoryUpdateHandler) {
			src_core_websocket_js.default.off("*", inventoryUpdateHandler);
			inventoryUpdateHandler = null;
		}
		storedActionHrid = null;
		storedNumActions = 0;
		storedEnhancementContext = null;
		autofillManager$1.clearQuantity();
	}
	var missing_materials_button_default = {
		initialize: initialize$1,
		cleanup: cleanup$1
	};
	//#endregion
	//#region src/features/actions/budget-calculator.js
	/**
	* Budget Calculator
	* Calculates how many units you can produce within a gold budget,
	* buying missing tradeable materials at ask price.
	*/
	var PRODUCTION_TYPES$3 = [
		"/action_types/brewing",
		"/action_types/cooking",
		"/action_types/cheesesmithing",
		"/action_types/crafting",
		"/action_types/tailoring"
	];
	var UI_ID$2 = "mwi-budget-calculator";
	/**
	* Parse a KMB shorthand string to a number.
	* e.g. "50m" → 50000000, "1.5b" → 1500000000, "100k" → 100000
	* @param {string} str
	* @returns {number} Parsed value, or NaN if invalid
	*/
	function parseKMB(str) {
		const match = str.trim().toLowerCase().match(/^(\d+\.?\d*)\s*([kmb]?)$/);
		if (!match) return NaN;
		return parseFloat(match[1]) * ({
			k: 1e3,
			m: 1e6,
			b: 1e9
		}[match[2]] || 1);
	}
	/**
	* Get action HRID from panel element.
	* @param {HTMLElement} panel
	* @returns {string|null}
	*/
	function getActionHridFromPanel$2(panel) {
		const nameEl = panel.querySelector("[class*=\"SkillActionDetail_name\"]");
		if (!nameEl) return null;
		return getActionHridFromName(Array.from(nameEl.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join("").trim());
	}
	/**
	* Find the action count input element within a panel.
	* @param {HTMLElement} panel
	* @returns {HTMLInputElement|null}
	*/
	function findActionInput$2(panel) {
		return panel.querySelector("[class*=\"maxActionCountInput\"] input") || null;
	}
	/**
	* Binary search for maximum units produceable within budget.
	* @param {string} actionHrid
	* @param {number} budget
	* @returns {{n: number, materials: Array}|null} null if no tradeable materials with prices
	*/
	function findMaxUnits(actionHrid, budget) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		const actionDetail = gameData?.actionDetailMap[actionHrid];
		if (!actionDetail) return null;
		if (!PRODUCTION_TYPES$3.includes(actionDetail.type)) return null;
		if (!actionDetail.inputItems?.length) return null;
		if (!actionDetail.inputItems.some((input) => {
			if (!gameData.itemDetailMap[input.itemHrid]?.isTradable) return false;
			return src_api_marketplace_js.default.getPrice(input.itemHrid)?.ask > 0;
		})) return null;
		/**
		* Calculate purchase cost for N units using current inventory.
		* @param {number} n
		* @returns {number}
		*/
		const costForN = (n) => {
			if (n <= 0) return 0;
			const mats = (0, src_utils_material_calculator_js.calculateMaterialRequirements)(actionHrid, n, false);
			let total = 0;
			for (const mat of mats) {
				if (!mat.isTradeable || mat.missing <= 0) continue;
				const price = src_api_marketplace_js.default.getPrice(mat.itemHrid);
				if (!price?.ask) continue;
				total += mat.missing * price.ask;
			}
			return total;
		};
		if (costForN(1) > budget) return {
			n: 0,
			materials: (0, src_utils_material_calculator_js.calculateMaterialRequirements)(actionHrid, 1, false)
		};
		let lo = 1;
		let hi = 1e7;
		while (lo < hi) {
			const mid = Math.floor((lo + hi + 1) / 2);
			if (costForN(mid) <= budget) lo = mid;
			else hi = mid - 1;
		}
		const materials = (0, src_utils_material_calculator_js.calculateMaterialRequirements)(actionHrid, lo, false);
		return {
			n: lo,
			materials
		};
	}
	/**
	* Show the breakdown modal for a budget calculation result.
	* @param {number} budget - The budget entered
	* @param {{n: number, materials: Array}} result
	*/
	function showBreakdownModal(budget, result) {
		document.getElementById("mwi-budget-modal-overlay")?.remove();
		const overlay = document.createElement("div");
		overlay.id = "mwi-budget-modal-overlay";
		overlay.style.cssText = `
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.75);
        z-index: 99999;
        display: flex; align-items: center; justify-content: center;
    `;
		const modal = document.createElement("div");
		modal.style.cssText = `
        background: #1a1a1a;
        border: 2px solid #3a3a3a;
        border-radius: 8px;
        padding: 20px;
        max-width: 680px;
        width: 95%;
        max-height: 85vh;
        overflow-y: auto;
        color: #e0e0e0;
        font-size: 13px;
    `;
		const header = document.createElement("div");
		header.style.cssText = `
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #3a3a3a;
    `;
		header.innerHTML = `
        <div>
            <span style="font-size:15px; font-weight:600; color:#e0e0e0;">${(0, src_core_i18n_js.t)("Budget Calculator")}</span>
            <span style="margin-left:10px; color:#aaa;">
                ${(0, src_core_i18n_js.t)("Budget: {0}", (0, src_utils_formatters_js.formatKMB)(budget))}
                &nbsp;→&nbsp;
                <strong style="color:#7ec87e;">${(0, src_core_i18n_js.t)("{0} units", (0, src_utils_formatters_js.formatWithSeparator)(result.n))}</strong>
            </span>
        </div>
        <button id="mwi-budget-modal-close" style="
            background:none; border:none; color:#aaa; font-size:24px; cursor:pointer; padding:0; line-height:1;
        ">×</button>
    `;
		const tableWrap = document.createElement("div");
		tableWrap.style.cssText = "overflow-x: auto;";
		const thStyle = "padding:6px 10px; text-align:right; color:#aaa; font-weight:500; white-space:nowrap; border-bottom:1px solid #3a3a3a;";
		const thLeftStyle = "padding:6px 10px; text-align:left; color:#aaa; font-weight:500; white-space:nowrap; border-bottom:1px solid #3a3a3a;";
		const tdStyle = "padding:5px 10px; text-align:right; border-bottom:1px solid #252525;";
		const tdLeftStyle = "padding:5px 10px; text-align:left; border-bottom:1px solid #252525;";
		const tdDimStyle = "padding:5px 10px; text-align:right; color:#666; border-bottom:1px solid #252525;";
		let totalSpend = 0;
		let perUnitCost = 0;
		const rows = result.materials.map((mat) => {
			const price = mat.isTradeable ? src_api_marketplace_js.default.getPrice(mat.itemHrid) : null;
			const ask = price?.ask > 0 ? price.ask : null;
			const lineCost = ask && mat.missing > 0 ? mat.missing * ask : 0;
			totalSpend += lineCost;
			if (ask) perUnitCost += ask * (mat.required / (result.n || 1));
			const toBuyCell = mat.isTradeable ? `<td style="${tdStyle}; color:${mat.missing > 0 ? "#e8a87c" : "#7ec87e"};">${(0, src_utils_formatters_js.formatWithSeparator)(mat.missing)}</td>` : `<td style="${tdDimStyle}">—</td>`;
			const askCell = ask ? `<td style="${tdStyle}">${(0, src_utils_formatters_js.formatKMB)(ask)}</td>` : `<td style="${tdDimStyle}">${mat.isTradeable ? (0, src_core_i18n_js.t)("No data") : "—"}</td>`;
			const costCell = lineCost > 0 ? `<td style="${tdStyle}; color:#e8a87c;">${(0, src_utils_formatters_js.formatKMB)(lineCost)}</td>` : `<td style="${tdDimStyle}">${mat.isTradeable ? "0" : "—"}</td>`;
			return `
            <tr>
                <td style="${tdLeftStyle}">${mat.itemName}</td>
                <td style="${tdStyle}">${(0, src_utils_formatters_js.formatWithSeparator)(mat.required)}</td>
                <td style="${tdStyle}; color:${mat.have >= mat.required ? "#7ec87e" : "#e0e0e0"};">${(0, src_utils_formatters_js.formatWithSeparator)(mat.have)}</td>
                ${toBuyCell}
                ${askCell}
                ${costCell}
            </tr>
        `;
		}).join("");
		const summaryRowStyle = "padding:7px 10px; text-align:right; border-top:2px solid #3a3a3a; font-weight:600;";
		tableWrap.innerHTML = `
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr>
                    <th style="${thLeftStyle}">${(0, src_core_i18n_js.t)("Ingredient")}</th>
                    <th style="${thStyle}">${(0, src_core_i18n_js.t)("Required")}</th>
                    <th style="${thStyle}">${(0, src_core_i18n_js.t)("On Hand")}</th>
                    <th style="${thStyle}">${(0, src_core_i18n_js.t)("To Buy")}</th>
                    <th style="${thStyle}">${(0, src_core_i18n_js.t)("Ask Price")}</th>
                    <th style="${thStyle}">${(0, src_core_i18n_js.t)("Total Cost")}</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
            <tfoot>
                <tr>
                    <td colspan="5" style="${summaryRowStyle}; text-align:left; color:#aaa;">${(0, src_core_i18n_js.t)("Per unit cost (ask)")}</td>
                    <td style="${summaryRowStyle}">${(0, src_utils_formatters_js.formatKMB)(Math.round(perUnitCost))}</td>
                </tr>
                <tr>
                    <td colspan="5" style="${summaryRowStyle}; text-align:left; color:#aaa;">${(0, src_core_i18n_js.t)("Total spend")}</td>
                    <td style="${summaryRowStyle}; color:#7ec87e;">${(0, src_utils_formatters_js.formatKMB)(totalSpend)}</td>
                </tr>
            </tfoot>
        </table>
    `;
		modal.appendChild(header);
		modal.appendChild(tableWrap);
		overlay.appendChild(modal);
		document.body.appendChild(overlay);
		const close = () => {
			overlay.remove();
			document.removeEventListener("keydown", onEsc);
		};
		overlay.querySelector("#mwi-budget-modal-close").addEventListener("click", close);
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) close();
		});
		function onEsc(e) {
			if (e.key === "Escape") close();
		}
		document.addEventListener("keydown", onEsc);
	}
	var BudgetCalculator = class {
		constructor() {
			this.isInitialized = false;
			this.unregisterHandlers = [];
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.processedPanels = /* @__PURE__ */ new WeakSet();
			this.panelObservers = /* @__PURE__ */ new Map();
		}
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("actions_budgetCalculator")) return;
			this.isInitialized = true;
			const unregister = src_core_dom_observer_js.default.onClass("BudgetCalculator", "SkillActionDetail_skillActionDetail", () => this._processActionPanels());
			this.unregisterHandlers.push(unregister);
			this._processActionPanels();
		}
		_processActionPanels() {
			document.querySelectorAll("[class*=\"SkillActionDetail_skillActionDetail\"]").forEach((panel) => {
				if (this.processedPanels.has(panel)) return;
				const actionHrid = getActionHridFromPanel$2(panel);
				if (!actionHrid) return;
				const actionDetail = src_core_data_manager_js.default.getInitClientData()?.actionDetailMap[actionHrid];
				if (!actionDetail || !PRODUCTION_TYPES$3.includes(actionDetail.type)) return;
				if (!actionDetail.inputItems?.length) return;
				this.processedPanels.add(panel);
				this._attachToPanel(panel);
			});
		}
		/**
		* Create and inject the budget UI into a panel, and keep it positioned
		* after #mwi-missing-mats-button via a MutationObserver.
		* @param {HTMLElement} panel
		*/
		_attachToPanel(panel) {
			const ui = this._createUI(panel);
			const position = () => {
				const existing = panel.querySelector(`#${UI_ID$2}`);
				const missingMatsBtn = panel.querySelector("#mwi-missing-mats-button");
				const itemRequirements = panel.querySelector("[class*=\"SkillActionDetail_itemRequirements\"]");
				const anchor = missingMatsBtn || itemRequirements;
				if (!anchor) return;
				if (existing) {
					if (existing.previousSibling !== anchor) anchor.parentNode.insertBefore(existing, anchor.nextSibling);
				} else anchor.parentNode.insertBefore(ui, anchor.nextSibling);
			};
			position();
			const obs = new MutationObserver((mutations) => {
				if (mutations.some((m) => [...m.addedNodes, ...m.removedNodes].some((n) => n.id === "mwi-missing-mats-button" || n.id === UI_ID$2))) position();
			});
			obs.observe(panel, {
				childList: true,
				subtree: false
			});
			this.panelObservers.set(panel, obs);
		}
		/**
		* Build the budget input + Calculate button + Details link for a panel.
		* @param {HTMLElement} panel
		* @returns {HTMLElement}
		*/
		_createUI(panel) {
			const wrapper = document.createElement("div");
			wrapper.id = UI_ID$2;
			wrapper.style.cssText = "display:flex; align-items:center; gap:6px; margin: 4px 0 8px 0; padding: 0 0;";
			const input = document.createElement("input");
			input.type = "text";
			input.placeholder = (0, src_core_i18n_js.t)("Budget (e.g. 50m)");
			input.style.cssText = `
            flex: 1;
            background: #2a2a2a;
            color: #e0e0e0;
            border: 1px solid #555;
            border-radius: 6px;
            padding: 6px 10px;
            font-size: 13px;
            min-width: 0;
        `;
			const calcBtn = document.createElement("button");
			calcBtn.textContent = (0, src_core_i18n_js.t)("Calculate");
			calcBtn.style.cssText = `
            background: linear-gradient(180deg, rgba(126,200,126,0.2) 0%, rgba(126,200,126,0.1) 100%);
            color: #e0e0e0;
            border: 1px solid rgba(126,200,126,0.4);
            border-radius: 6px;
            padding: 6px 12px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
        `;
			calcBtn.addEventListener("mouseenter", () => {
				calcBtn.style.background = "linear-gradient(180deg, rgba(126,200,126,0.35) 0%, rgba(126,200,126,0.25) 100%)";
			});
			calcBtn.addEventListener("mouseleave", () => {
				calcBtn.style.background = "linear-gradient(180deg, rgba(126,200,126,0.2) 0%, rgba(126,200,126,0.1) 100%)";
			});
			const detailsLink = document.createElement("span");
			detailsLink.title = (0, src_core_i18n_js.t)("View last breakdown");
			detailsLink.style.cssText = "font-size:14px; cursor:pointer; opacity:0.4; user-select:none;";
			detailsLink.textContent = "📋";
			detailsLink.style.display = "none";
			let lastResult = null;
			let lastBudget = null;
			calcBtn.addEventListener("click", () => {
				const raw = input.value.trim();
				if (!raw) return;
				const budget = parseKMB(raw);
				if (isNaN(budget) || budget <= 0) {
					input.style.borderColor = "#c0392b";
					const t = setTimeout(() => {
						input.style.borderColor = "#555";
					}, 1500);
					this.timerRegistry.registerTimeout(t);
					return;
				}
				input.style.borderColor = "#555";
				const actionHrid = getActionHridFromPanel$2(panel);
				if (!actionHrid) return;
				const result = findMaxUnits(actionHrid, budget);
				if (!result) {
					calcBtn.textContent = (0, src_core_i18n_js.t)("No data");
					const timeout = setTimeout(() => {
						calcBtn.textContent = (0, src_core_i18n_js.t)("Calculate");
					}, 2e3);
					this.timerRegistry.registerTimeout(timeout);
					return;
				}
				if (result.n > 0) {
					const actionInput = findActionInput$2(panel);
					if (actionInput) (0, src_utils_react_input_js.setReactInputValue)(actionInput, result.n);
				}
				lastResult = result;
				lastBudget = budget;
				detailsLink.style.display = "";
				detailsLink.style.opacity = "1";
				showBreakdownModal(budget, result);
			});
			input.addEventListener("keydown", (e) => {
				if (e.key === "Enter") calcBtn.click();
			});
			detailsLink.addEventListener("click", () => {
				if (lastResult !== null) showBreakdownModal(lastBudget, lastResult);
			});
			wrapper.appendChild(input);
			wrapper.appendChild(calcBtn);
			wrapper.appendChild(detailsLink);
			return wrapper;
		}
		disable() {
			this.unregisterHandlers.forEach((fn) => fn());
			this.unregisterHandlers = [];
			this.timerRegistry.clearAll();
			document.querySelectorAll(`#${UI_ID$2}`).forEach((el) => el.remove());
			document.getElementById("mwi-budget-modal-overlay")?.remove();
			this.panelObservers.forEach((obs) => obs.disconnect());
			this.panelObservers = /* @__PURE__ */ new Map();
			this.processedPanels = /* @__PURE__ */ new WeakSet();
			this.isInitialized = false;
		}
	};
	var budgetCalculator = new BudgetCalculator();
	//#endregion
	//#region src/features/crafting-plan/crafting-plan-calculator.js
	/**
	* Crafting Plan Calculator
	* Computes the optimal buy-vs-craft plan for a target item by recursively
	* comparing market price against crafting cost at each material tier.
	*/
	var MAX_DEPTH = 15;
	/**
	* Find the production action that creates a given item.
	* @param {string} itemHrid
	* @returns {{ actionHrid: string, action: Object, outputCount: number } | null}
	*/
	function findProductionAction(itemHrid) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.actionDetailMap) return null;
		for (const [actionHrid, action] of Object.entries(gameData.actionDetailMap)) {
			if (!action.outputItems) continue;
			for (const output of action.outputItems) if (output.itemHrid === itemHrid) return {
				actionHrid,
				action,
				outputCount: output.count || 1
			};
		}
		return null;
	}
	/**
	* Get artisan tea material reduction bonus for an action type.
	* @param {string} actionType - e.g. '/action_types/brewing'
	* @returns {number} Reduction as decimal (e.g. 0.112 for 11.2%)
	*/
	function getArtisanBonus(actionType) {
		try {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			const equipment = src_core_data_manager_js.default.getEquipment();
			const itemDetailMap = gameData?.itemDetailMap || {};
			const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
			const activeDrinks = src_core_data_manager_js.default.getActionDrinkSlots(actionType);
			return (0, src_utils_tea_parser_js.parseArtisanBonus)(activeDrinks, itemDetailMap, drinkConcentration);
		} catch {
			return 0;
		}
	}
	/**
	* Compute the optimal crafting plan for an item.
	* At each node, decides whether buying from market or crafting is cheaper.
	*
	* @param {string} itemHrid - Target item
	* @param {number} quantity - How many needed
	* @param {string} [mode='ask'] - Pricing mode for market lookups
	* @param {Set} [visited] - Circular dependency guard
	* @param {Map} [memo] - Memoization cache (unit cost per itemHrid)
	* @param {number} [depth=0] - Current recursion depth
	* @param {number} [maxDepth=MAX_DEPTH] - Maximum recursion depth (1 = buy all sub-materials)
	* @param {boolean} [buyRawOnly=false] - When true, always craft items that have a recipe; only buy uncraftable items
	* @param {boolean} [forceRootCraft=false] - When true, forces the root item (depth 0) to be crafted
	* @param {number} [timeCostPerHour=0] - Gold value per hour of player time (0 = disabled)
	* @param {boolean} [skipProcessing=false] - When true, forces buy for processing actions (single input, no upgrade)
	* @returns {CraftingPlanNode}
	*/
	function computeBestCraftingPlan(itemHrid, quantity = 1, mode = "ask", visited = /* @__PURE__ */ new Set(), memo = /* @__PURE__ */ new Map(), depth = 0, maxDepth = MAX_DEPTH, buyRawOnly = false, forceRootCraft = false, timeCostPerHour = 0, skipProcessing = false) {
		const itemDetails = src_core_data_manager_js.default.getItemDetails(itemHrid);
		const itemName = itemDetails?.name || itemHrid.split("/").pop();
		const isTradable = itemDetails?.isTradable ?? false;
		let buyPrice = null;
		if (isTradable) {
			const marketPrice = (0, src_utils_market_data_js.getItemPrice)(itemHrid, {
				mode,
				context: "profit",
				side: "buy"
			});
			if (marketPrice !== null && marketPrice > 0) buyPrice = marketPrice;
		}
		const shopCost = getShopCoinCost(itemHrid);
		if (shopCost > 0 && (buyPrice === null || shopCost < buyPrice)) buyPrice = shopCost;
		if (itemHrid === "/items/coin") return {
			itemHrid,
			itemName: "Coin",
			quantity,
			strategy: "buy",
			unitCost: 1,
			totalCost: quantity,
			buyPrice: 1,
			craftCost: null,
			actionHrid: null,
			actionsNeeded: 0,
			children: []
		};
		if (memo.has(itemHrid)) {
			const cachedUnitCost = memo.get(itemHrid);
			return {
				itemHrid,
				itemName,
				quantity,
				strategy: cachedUnitCost.strategy,
				unitCost: cachedUnitCost.unitCost,
				totalCost: cachedUnitCost.unitCost * quantity,
				buyPrice,
				craftCost: cachedUnitCost.craftCost,
				actionHrid: cachedUnitCost.actionHrid,
				actionsNeeded: cachedUnitCost.strategy === "craft" ? Math.ceil(quantity / (cachedUnitCost.outputCount || 1)) : 0,
				children: cachedUnitCost.strategy === "craft" ? cachedUnitCost.childrenTemplate.map((c) => computeBestCraftingPlan(c.itemHrid, c.qtyPerUnit * quantity, mode, visited, memo, depth + 1, maxDepth, buyRawOnly, forceRootCraft, timeCostPerHour, skipProcessing)) : []
			};
		}
		if (visited.has(itemHrid) || depth >= maxDepth) return {
			itemHrid,
			itemName,
			quantity,
			strategy: "buy",
			unitCost: buyPrice ?? Infinity,
			totalCost: (buyPrice ?? Infinity) * quantity,
			buyPrice,
			craftCost: null,
			actionHrid: null,
			actionsNeeded: 0,
			children: []
		};
		const production = findProductionAction(itemHrid);
		if (!production) {
			const unitCost = buyPrice ?? 0;
			memo.set(itemHrid, {
				strategy: "buy",
				unitCost,
				craftCost: null,
				actionHrid: null,
				outputCount: 1,
				childrenTemplate: []
			});
			return {
				itemHrid,
				itemName,
				quantity,
				strategy: "buy",
				unitCost,
				totalCost: unitCost * quantity,
				buyPrice,
				craftCost: null,
				actionHrid: null,
				actionsNeeded: 0,
				children: []
			};
		}
		const isProcessingAction = production.action.category?.endsWith("/material") || production.action.category?.endsWith("/lumber");
		if (skipProcessing && isProcessingAction) {
			const unitCost = buyPrice ?? Infinity;
			memo.set(itemHrid, {
				strategy: "buy",
				unitCost,
				craftCost: null,
				actionHrid: null,
				outputCount: 1,
				childrenTemplate: []
			});
			return {
				itemHrid,
				itemName,
				quantity,
				strategy: "buy",
				unitCost,
				totalCost: unitCost * quantity,
				buyPrice,
				craftCost: null,
				actionHrid: null,
				actionsNeeded: 0,
				children: []
			};
		}
		visited.add(itemHrid);
		const { actionHrid, action, outputCount } = production;
		const artisanBonus = getArtisanBonus(action.type);
		const actionsForOne = 1 / outputCount;
		let craftCostPerUnit = 0;
		const childrenTemplate = [];
		if (action.inputItems) for (const input of action.inputItems) {
			const reducedCount = (input.count || 1) * (1 - artisanBonus);
			const qtyPerUnit = reducedCount * actionsForOne;
			const inputQty = Math.ceil(reducedCount * Math.ceil(quantity / outputCount));
			const childPlan = computeBestCraftingPlan(input.itemHrid, inputQty, mode, visited, memo, depth + 1, maxDepth, buyRawOnly, forceRootCraft, timeCostPerHour, skipProcessing);
			craftCostPerUnit += childPlan.unitCost * qtyPerUnit;
			childrenTemplate.push({
				itemHrid: input.itemHrid,
				qtyPerUnit
			});
		}
		if (action.upgradeItemHrid) {
			const qtyPerUnit = actionsForOne;
			const upgradeQty = Math.ceil(quantity / outputCount);
			const upgradePlan = computeBestCraftingPlan(action.upgradeItemHrid, upgradeQty, mode, visited, memo, depth + 1, maxDepth, buyRawOnly, forceRootCraft, timeCostPerHour, skipProcessing);
			craftCostPerUnit += upgradePlan.unitCost * qtyPerUnit;
			childrenTemplate.push({
				itemHrid: action.upgradeItemHrid,
				qtyPerUnit
			});
		}
		visited.delete(itemHrid);
		if (timeCostPerHour > 0) {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			const actionDetails = gameData?.actionDetailMap?.[actionHrid];
			if (actionDetails) {
				const stats = (0, src_utils_action_calculator_js.calculateActionStats)(actionDetails, {
					skills: src_core_data_manager_js.default.getSkills(),
					equipment: src_core_data_manager_js.default.getEquipment(),
					itemDetailMap: gameData.itemDetailMap
				});
				const effMultiplier = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(stats.totalEfficiency);
				const timePerUnit = stats.actionTime / effMultiplier * actionsForOne;
				craftCostPerUnit += timePerUnit * (timeCostPerHour / 3600);
			}
		}
		const shouldBuy = !buyRawOnly && !(forceRootCraft && depth === 0) && buyPrice !== null && buyPrice <= craftCostPerUnit;
		const strategy = shouldBuy ? "buy" : "craft";
		const unitCost = shouldBuy ? buyPrice : craftCostPerUnit;
		memo.set(itemHrid, {
			strategy,
			unitCost,
			craftCost: craftCostPerUnit,
			actionHrid: strategy === "craft" ? actionHrid : null,
			outputCount,
			childrenTemplate: strategy === "craft" ? childrenTemplate : []
		});
		let children = [];
		if (!shouldBuy) {
			const actionsNeeded = Math.ceil(quantity / outputCount);
			children = [];
			if (action.inputItems) for (const input of action.inputItems) {
				const reducedCount = (input.count || 1) * (1 - artisanBonus);
				const inputQty = Math.ceil(reducedCount * actionsNeeded);
				children.push(computeBestCraftingPlan(input.itemHrid, inputQty, mode, visited, memo, depth + 1, maxDepth, buyRawOnly, forceRootCraft, timeCostPerHour, skipProcessing));
			}
			if (action.upgradeItemHrid) children.push(computeBestCraftingPlan(action.upgradeItemHrid, actionsNeeded, mode, visited, memo, depth + 1, maxDepth, buyRawOnly, forceRootCraft, timeCostPerHour, skipProcessing));
		}
		return {
			itemHrid,
			itemName,
			quantity,
			strategy,
			unitCost,
			totalCost: unitCost * quantity,
			buyPrice,
			craftCost: craftCostPerUnit,
			actionHrid: strategy === "craft" ? actionHrid : null,
			actionsNeeded: strategy === "craft" ? Math.ceil(quantity / outputCount) : 0,
			children
		};
	}
	//#endregion
	//#region src/features/actions/cost-summary.js
	/**
	* Cost Summary
	* Compact 4-line cost comparison block for production action panels.
	* Shows: direct recipe cost, missing direct mats cost, best crafting plan
	* cost, and finished item market price for the selected produce quantity.
	*/
	var UI_ID$1 = "mwi-cost-summary";
	var PRODUCTION_TYPES$2 = [
		"/action_types/brewing",
		"/action_types/cooking",
		"/action_types/cheesesmithing",
		"/action_types/crafting",
		"/action_types/tailoring"
	];
	var PRICING_MODE_LABELS = {
		conservative: "Buy: Ask / Sell: Bid",
		hybrid: "Buy: Ask / Sell: Ask",
		optimistic: "Buy: Bid / Sell: Ask",
		patientBuy: "Buy: Bid / Sell: Bid"
	};
	var domObserverUnregister = null;
	var processedPanels = /* @__PURE__ */ new WeakSet();
	function initialize() {
		domObserverUnregister = src_core_dom_observer_js.default.onClass("CostSummary-ActionPanel", "SkillActionDetail_skillActionDetail", () => processActionPanels());
		processActionPanels();
	}
	function cleanup() {
		if (domObserverUnregister) {
			domObserverUnregister();
			domObserverUnregister = null;
		}
		document.querySelectorAll(`#${UI_ID$1}`).forEach((el) => el.remove());
		processedPanels = /* @__PURE__ */ new WeakSet();
	}
	function processActionPanels() {
		document.querySelectorAll("[class*=\"SkillActionDetail_skillActionDetail\"]").forEach((panel) => {
			if (processedPanels.has(panel)) return;
			const inputField = (0, src_utils_action_panel_helper_js.findActionInput)(panel);
			if (!inputField) return;
			processedPanels.add(panel);
			(0, src_utils_action_panel_helper_js.attachInputListeners)(panel, inputField, (value) => updatePanel(panel, value));
			(0, src_utils_action_panel_helper_js.performInitialUpdate)(inputField, (value) => updatePanel(panel, value));
		});
	}
	function getActionHridFromPanel$1(panel) {
		const nameEl = panel.querySelector("[class*=\"SkillActionDetail_name\"]");
		if (!nameEl) return null;
		return getActionHridFromName(Array.from(nameEl.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join("").trim());
	}
	function updatePanel(panel, value) {
		const existing = panel.querySelector(`#${UI_ID$1}`);
		if (existing) existing.remove();
		if (!src_core_config_js.default.getSetting("actions_costSummary")) return;
		const numActions = parseInt(value) || 0;
		if (numActions <= 0) return;
		const actionHrid = getActionHridFromPanel$1(panel);
		if (!actionHrid) return;
		const actionDetail = src_core_data_manager_js.default.getInitClientData()?.actionDetailMap?.[actionHrid];
		if (!actionDetail) return;
		if (!PRODUCTION_TYPES$2.includes(actionDetail.type)) return;
		if (!actionDetail.inputItems || actionDetail.inputItems.length === 0) return;
		const output = actionDetail.outputItems?.[0];
		insertBlock(panel, buildBlock(actionHrid, numActions, output?.itemHrid || null, (output?.count || 1) * numActions));
	}
	function insertBlock(panel, block) {
		const budgetCalc = panel.querySelector("#mwi-budget-calculator");
		const missingMatsBtn = panel.querySelector("#mwi-missing-mats-button");
		const itemRequirements = panel.querySelector("[class*=\"SkillActionDetail_itemRequirements\"]");
		if (budgetCalc) budgetCalc.parentNode.insertBefore(block, budgetCalc);
		else if (missingMatsBtn) missingMatsBtn.parentNode.insertBefore(block, missingMatsBtn.nextSibling);
		else if (itemRequirements) itemRequirements.parentNode.insertBefore(block, itemRequirements.nextSibling);
		else panel.appendChild(block);
	}
	function buildBlock(actionHrid, numActions, outputHrid, outputCount) {
		const materials = (0, src_utils_material_calculator_js.calculateMaterialRequirements)(actionHrid, numActions, true);
		let directCost = 0;
		let missingCost = 0;
		let directComplete = true;
		let missingComplete = true;
		for (const mat of materials) {
			if (!mat.isTradeable) continue;
			const unitPrice = (0, src_utils_market_data_js.getItemPrice)(mat.itemHrid, {
				context: "profit",
				side: "buy"
			});
			if (unitPrice === null) {
				if (mat.required > 0) directComplete = false;
				if (mat.missing > 0) missingComplete = false;
				continue;
			}
			directCost += unitPrice * mat.required;
			missingCost += unitPrice * mat.missing;
		}
		let planCost = null;
		if (outputHrid) try {
			const plan = computeBestCraftingPlan(outputHrid, outputCount, src_core_config_js.default.getSetting("profitCalc_pricingMode") || "hybrid");
			if (plan && plan.totalCost !== Infinity && plan.totalCost !== null) planCost = plan.totalCost;
		} catch (error) {
			console.error("[CostSummary] computeBestCraftingPlan error:", error);
		}
		let marketCost = null;
		if (outputHrid) {
			const unitSellPrice = (0, src_utils_market_data_js.getItemPrice)(outputHrid, {
				context: "profit",
				side: "sell"
			});
			if (unitSellPrice !== null) marketCost = unitSellPrice * outputCount;
		}
		const pricingMode = src_core_config_js.default.getSetting("profitCalc_pricingMode") || "hybrid";
		const pricingLabel = PRICING_MODE_LABELS[pricingMode] || pricingMode;
		return renderBlock({
			directCost,
			directComplete,
			missingCost,
			missingComplete,
			planCost,
			marketCost,
			pricingLabel
		});
	}
	function renderBlock({ directCost, directComplete, missingCost, missingComplete, planCost, marketCost, pricingLabel }) {
		const container = document.createElement("div");
		container.id = UI_ID$1;
		container.style.cssText = `
        margin: 8px 0 16px 0;
        padding: 10px 14px;
        background: linear-gradient(180deg, rgba(91, 141, 239, 0.12) 0%, rgba(91, 141, 239, 0.05) 100%);
        border: 1px solid rgba(91, 141, 239, 0.3);
        border-radius: 8px;
        color: #ffffff;
        font-size: 13px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    `;
		const header = document.createElement("div");
		header.textContent = "Cost Summary";
		header.style.cssText = `
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 6px;
        color: #93c5fd;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    `;
		container.appendChild(header);
		container.appendChild(renderLine("Direct recipe cost", directCost, !directComplete));
		container.appendChild(renderLine("Missing direct mats", missingCost, !missingComplete));
		container.appendChild(renderLine("Best crafting plan", planCost));
		container.appendChild(renderLine("Finished item market", marketCost));
		const footer = document.createElement("div");
		footer.textContent = `Pricing: ${pricingLabel}`;
		footer.style.cssText = `
        margin-top: 6px;
        padding-top: 6px;
        border-top: 1px solid rgba(91, 141, 239, 0.2);
        font-size: 11px;
        color: #94a3b8;
    `;
		container.appendChild(footer);
		return container;
	}
	function renderLine(label, value, partial = false) {
		const row = document.createElement("div");
		row.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        line-height: 1.5;
    `;
		const labelEl = document.createElement("span");
		labelEl.textContent = label;
		labelEl.style.color = "#cbd5e1";
		const valueEl = document.createElement("span");
		if (value === null || value === void 0 || value === 0) {
			valueEl.textContent = "—";
			valueEl.style.color = "#64748b";
		} else {
			valueEl.textContent = (0, src_utils_market_data_js.formatPrice)(value, { decimals: 1 }) + (partial ? "*" : "");
			valueEl.style.color = "#e2e8f0";
			valueEl.style.fontVariantNumeric = "tabular-nums";
			if (partial) valueEl.title = "Partial — some materials have no market data";
		}
		row.appendChild(labelEl);
		row.appendChild(valueEl);
		return row;
	}
	var cost_summary_default = {
		initialize,
		cleanup
	};
	//#endregion
	//#region src/features/crafting-plan/crafting-plan-display.js
	/**
	* Crafting Plan Display
	* Renders the buy-vs-craft decision tree in action panels.
	* Shows a summary comparison plus a shopping list of materials to buy.
	*/
	var UI_ID = "mwi-crafting-plan";
	var PRICING_MODES = [
		{
			value: "conservative",
			label: "Instant Buy"
		},
		{
			value: "hybrid",
			label: "Instant Buy / Patient Sell"
		},
		{
			value: "optimistic",
			label: "Patient Buy / Patient Sell"
		},
		{
			value: "patientBuy",
			label: "Patient Buy"
		}
	];
	var craftingPlanTabs = [];
	var cleanupObserver = null;
	var autofillManager = createAutofillManager("CraftingPlan");
	var PRODUCTION_TYPES$1 = [
		"/action_types/brewing",
		"/action_types/cooking",
		"/action_types/cheesesmithing",
		"/action_types/crafting",
		"/action_types/tailoring"
	];
	/**
	* Get action HRID from panel element.
	* @param {HTMLElement} panel
	* @returns {string|null}
	*/
	function getActionHridFromPanel(panel) {
		const nameEl = panel.querySelector("[class*=\"SkillActionDetail_name\"]");
		if (!nameEl) return null;
		return getActionHridFromName(Array.from(nameEl.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join("").trim());
	}
	/**
	* Get the primary output item for an action.
	* @param {Object} actionDetail
	* @returns {{ itemHrid: string, count: number }|null}
	*/
	function getPrimaryOutput(actionDetail) {
		if (!actionDetail?.outputItems?.length) return null;
		return actionDetail.outputItems[0];
	}
	/**
	* Get the pricing mode from user settings.
	* @returns {string}
	*/
	function getPricingMode() {
		return src_core_config_js.default.getSetting("profitCalc_pricingMode") || "ask";
	}
	/**
	* Collect all leaf "buy" items from the plan tree into a flat shopping list.
	* Aggregates quantities for the same item across branches.
	* @param {Object} node - CraftingPlanNode
	* @param {Map} buyItems - Map of itemHrid → { itemName, quantity, unitCost, totalCost }
	*/
	function collectBuyItems(node, buyItems) {
		if (node.strategy === "buy") {
			const existing = buyItems.get(node.itemHrid);
			if (existing) {
				existing.quantity += node.quantity;
				existing.totalCost += node.totalCost;
			} else buyItems.set(node.itemHrid, {
				itemName: node.itemName,
				quantity: node.quantity,
				unitCost: node.unitCost,
				totalCost: node.totalCost
			});
			return;
		}
		for (const child of node.children) collectBuyItems(child, buyItems);
	}
	/**
	* Collect all "craft" steps from the plan tree.
	* @param {Object} node - CraftingPlanNode
	* @param {Array} craftSteps - Array to collect craft steps into
	*/
	function collectCraftSteps(node, craftSteps) {
		for (const child of node.children) collectCraftSteps(child, craftSteps);
		if (node.strategy === "craft" && node.actionHrid) craftSteps.push({
			itemName: node.itemName,
			quantity: Math.ceil(node.quantity),
			actionsNeeded: node.actionsNeeded,
			actionHrid: node.actionHrid
		});
	}
	/**
	* Create a styled row with left label and right value.
	* @param {string} leftText
	* @param {string} rightText
	* @param {Object} [options]
	* @returns {HTMLElement}
	*/
	function createRow(leftText, rightText, options = {}) {
		const row = document.createElement("div");
		row.style.cssText = `
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding: 2px 0;
    `;
		const left = document.createElement("span");
		left.style.cssText = "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;";
		left.textContent = leftText;
		if (options.leftColor) left.style.color = options.leftColor;
		const right = document.createElement("span");
		right.style.cssText = "flex-shrink: 0; white-space: nowrap;";
		right.textContent = rightText;
		if (options.rightColor) right.style.color = options.rightColor;
		row.appendChild(left);
		row.appendChild(right);
		return row;
	}
	/**
	* Build the full crafting plan UI for an action.
	* @param {string} actionHrid
	* @param {Function} [onToggle] - Callback when buy-intermediates toggle changes
	* @param {boolean} [defaultOpen=false] - Whether the section should be open
	* @returns {HTMLElement|null}
	*/
	function buildPlanUI(actionHrid, onToggle, defaultOpen = false) {
		const actionDetail = src_core_data_manager_js.default.getInitClientData()?.actionDetailMap?.[actionHrid];
		if (!actionDetail) return null;
		if (!PRODUCTION_TYPES$1.includes(actionDetail.type)) return null;
		const output = getPrimaryOutput(actionDetail);
		if (!output) return null;
		const mode = getPricingMode();
		const buyIntermediates = src_core_config_js.default.getSetting("actionPanel_craftingPlanBuyIntermediates");
		const noProcessing = src_core_config_js.default.getSetting("actionPanel_craftingPlanNoProcessing");
		const taskMode = src_core_config_js.default.getSetting("actionPanel_craftingPlanTaskMode");
		const timeCostEnabled = src_core_config_js.default.getSetting("actionPanel_craftingPlanTimeCost");
		const goldPerHour = src_core_config_js.default.getSetting("actionPanel_craftingPlanGoldPerHour") || 0;
		let plan;
		try {
			plan = computeBestCraftingPlan(output.itemHrid, 1, mode, /* @__PURE__ */ new Set(), /* @__PURE__ */ new Map(), 0, void 0, buyIntermediates, taskMode, timeCostEnabled ? goldPerHour : 0, noProcessing);
		} catch (e) {
			console.error("[CraftingPlan] computeBestCraftingPlan error:", e);
			return null;
		}
		if (plan.craftCost === null) return null;
		const content = document.createElement("div");
		const unitCostText = plan.unitCost === Infinity ? "?" : (0, src_utils_formatters_js.formatWithSeparator)(Math.round(plan.unitCost));
		const buyText = plan.buyPrice !== null ? (0, src_utils_formatters_js.formatWithSeparator)(Math.round(plan.buyPrice)) : "N/A";
		const craftText = plan.craftCost !== null ? (0, src_utils_formatters_js.formatWithSeparator)(Math.round(plan.craftCost)) : "N/A";
		const strategyText = plan.strategy === "buy" ? "Buy from market" : "Craft from materials";
		const summary = document.createElement("div");
		summary.style.cssText = "margin-bottom: 6px;";
		summary.innerHTML = `
        <div style="display: flex; justify-content: space-between; color: var(--text-color-primary, #fff);">
            <span>Optimal: <strong>${strategyText}</strong></span>
            <span>${unitCostText}/ea</span>
        </div>
        <div style="display: flex; justify-content: space-between; color: var(--text-color-secondary, #888); font-size: 0.9em;">
            <span>Market buy: ${buyText}</span>
            <span>Craft cost: ${craftText}</span>
        </div>
    `;
		content.appendChild(summary);
		const currentMode = PRICING_MODES.find((m) => m.value === mode) || PRICING_MODES[0];
		const pricingRow = document.createElement("div");
		pricingRow.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85em;
        color: var(--text-color-secondary, #888);
        margin-bottom: 4px;
    `;
		const pricingLabel = document.createElement("span");
		pricingLabel.textContent = "Pricing:";
		const pricingBtn = document.createElement("button");
		pricingBtn.textContent = currentMode.label;
		pricingBtn.style.cssText = `
        font-size: 0.85em;
        padding: 1px 6px;
        background: var(--bg-color-tertiary, #1a1a1a);
        color: var(--text-color-secondary, #ccc);
        border: 1px solid var(--border-color, #444);
        border-radius: 3px;
        cursor: pointer;
    `;
		pricingBtn.addEventListener("click", () => {
			const next = PRICING_MODES[(PRICING_MODES.findIndex((m) => m.value === mode) + 1) % PRICING_MODES.length];
			src_core_config_js.default.setSetting("profitCalc_pricingMode", next.value);
			if (onToggle) onToggle();
		});
		pricingRow.appendChild(pricingLabel);
		pricingRow.appendChild(pricingBtn);
		content.appendChild(pricingRow);
		const toggleRow = document.createElement("label");
		toggleRow.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85em;
        color: var(--text-color-secondary, #888);
        cursor: pointer;
        margin-bottom: 4px;
    `;
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = buyIntermediates;
		checkbox.style.cssText = "margin: 0; cursor: pointer;";
		checkbox.addEventListener("change", () => {
			src_core_config_js.default.setSetting("actionPanel_craftingPlanBuyIntermediates", checkbox.checked);
			if (onToggle) onToggle();
		});
		toggleRow.appendChild(checkbox);
		toggleRow.appendChild(document.createTextNode("Buy raw materials only"));
		content.appendChild(toggleRow);
		const noProcessingRow = document.createElement("label");
		noProcessingRow.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85em;
        color: var(--text-color-secondary, #888);
        cursor: pointer;
        margin-bottom: 4px;
    `;
		const noProcessingCheckbox = document.createElement("input");
		noProcessingCheckbox.type = "checkbox";
		noProcessingCheckbox.checked = noProcessing;
		noProcessingCheckbox.style.cssText = "margin: 0; cursor: pointer;";
		noProcessingCheckbox.addEventListener("change", () => {
			src_core_config_js.default.setSetting("actionPanel_craftingPlanNoProcessing", noProcessingCheckbox.checked);
			if (onToggle) onToggle();
		});
		noProcessingRow.appendChild(noProcessingCheckbox);
		noProcessingRow.appendChild(document.createTextNode("No processing (buy intermediates)"));
		content.appendChild(noProcessingRow);
		const taskToggleRow = document.createElement("label");
		taskToggleRow.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85em;
        color: var(--text-color-secondary, #888);
        cursor: pointer;
        margin-bottom: 4px;
    `;
		const taskCheckbox = document.createElement("input");
		taskCheckbox.type = "checkbox";
		taskCheckbox.checked = taskMode;
		taskCheckbox.style.cssText = "margin: 0; cursor: pointer;";
		taskCheckbox.addEventListener("change", () => {
			src_core_config_js.default.setSetting("actionPanel_craftingPlanTaskMode", taskCheckbox.checked);
			if (onToggle) onToggle();
		});
		taskToggleRow.appendChild(taskCheckbox);
		taskToggleRow.appendChild(document.createTextNode("Task mode (force last step)"));
		content.appendChild(taskToggleRow);
		const timeCostRow = document.createElement("label");
		timeCostRow.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85em;
        color: var(--text-color-secondary, #888);
        cursor: pointer;
        margin-bottom: 4px;
    `;
		const timeCostCheckbox = document.createElement("input");
		timeCostCheckbox.type = "checkbox";
		timeCostCheckbox.checked = timeCostEnabled;
		timeCostCheckbox.style.cssText = "margin: 0; cursor: pointer;";
		timeCostRow.appendChild(timeCostCheckbox);
		timeCostRow.appendChild(document.createTextNode("Factor in time cost"));
		const goldInput = document.createElement("input");
		goldInput.type = "number";
		goldInput.value = goldPerHour || "";
		goldInput.placeholder = "500000";
		goldInput.style.cssText = `
        width: 80px; margin-left: auto; padding: 2px 4px;
        background: var(--input-bg, #1a1a2e); border: 1px solid var(--border-color, #333);
        border-radius: 3px; color: var(--text-color-primary, #fff); font-size: 0.85em;
    `;
		goldInput.style.display = timeCostEnabled ? "" : "none";
		const goldLabel = document.createElement("span");
		goldLabel.textContent = "gold/hr";
		goldLabel.style.fontSize = "0.85em";
		goldLabel.style.display = timeCostEnabled ? "" : "none";
		timeCostCheckbox.addEventListener("change", () => {
			src_core_config_js.default.setSetting("actionPanel_craftingPlanTimeCost", timeCostCheckbox.checked);
			goldInput.style.display = timeCostCheckbox.checked ? "" : "none";
			goldLabel.style.display = timeCostCheckbox.checked ? "" : "none";
			if (onToggle) onToggle();
		});
		goldInput.addEventListener("change", () => {
			src_core_config_js.default.setSetting("actionPanel_craftingPlanGoldPerHour", parseInt(goldInput.value) || 0);
			if (onToggle) onToggle();
		});
		timeCostRow.appendChild(goldInput);
		timeCostRow.appendChild(goldLabel);
		content.appendChild(timeCostRow);
		if (plan.strategy !== "craft" || plan.children.length === 0) {
			const costText = plan.unitCost === Infinity ? "?" : `${(0, src_utils_formatters_js.formatKMB)(Math.round(plan.unitCost))}/ea`;
			const section = (0, src_utils_ui_components_js.createCollapsibleSection)("", "Best Crafting Plan", costText, content, defaultOpen, 0);
			section.id = UI_ID;
			section.className = "mwi-crafting-plan-section";
			return section;
		}
		const buyItems = /* @__PURE__ */ new Map();
		collectBuyItems(plan, buyItems);
		if (buyItems.size > 0) {
			const divider = document.createElement("div");
			divider.style.cssText = "border-top: 1px solid var(--border-color, #333); margin: 6px 0;";
			content.appendChild(divider);
			const shoppingHeader = document.createElement("div");
			shoppingHeader.style.cssText = `
            font-weight: 500;
            color: var(--text-color-primary, #fff);
            margin-bottom: 4px;
        `;
			shoppingHeader.textContent = "Shopping List";
			content.appendChild(shoppingHeader);
			const sortedItems = [...buyItems.values()].sort((a, b) => b.totalCost - a.totalCost);
			for (const item of sortedItems) {
				const qty = Math.ceil(item.quantity);
				const cost = (0, src_utils_formatters_js.formatKMB)(Math.round(item.totalCost));
				const unit = (0, src_utils_formatters_js.formatWithSeparator)(Math.round(item.unitCost));
				content.appendChild(createRow(`${item.itemName} x${(0, src_utils_formatters_js.formatWithSeparator)(qty)}`, `${cost} (${unit}/ea)`));
			}
			const totalBuyCost = sortedItems.reduce((sum, item) => sum + item.totalCost, 0);
			const totalRow = createRow("Total material cost", (0, src_utils_formatters_js.formatWithSeparator)(Math.round(totalBuyCost)), { leftColor: "var(--text-color-primary, #fff)" });
			totalRow.style.borderTop = "1px solid var(--border-color, #333)";
			totalRow.style.marginTop = "4px";
			totalRow.style.paddingTop = "4px";
			content.appendChild(totalRow);
			const buyButton = document.createElement("button");
			buyButton.textContent = "Buy Missing Materials";
			buyButton.style.cssText = `
            width: 100%; margin-top: 6px; padding: 6px;
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            border: 1px solid #60a5fa; border-radius: 4px;
            color: white; cursor: pointer; font-size: 0.85em;
        `;
			buyButton.addEventListener("click", async () => {
				const panel = buyButton.closest("[class*=\"SkillActionDetail_skillActionDetail\"]");
				const inputField = (0, src_utils_action_panel_helper_js.findActionInput)(panel);
				const totalQty = (parseInt(inputField?.value) || 1) * (output.count || 1);
				const inventory = src_core_data_manager_js.default.getInventory() || [];
				const missingMaterials = [];
				for (const [itemHrid, item] of buyItems) {
					const needed = Math.ceil(item.quantity * totalQty);
					const have = inventory.filter((i) => i.itemHrid === itemHrid && !i.enhancementLevel).reduce((sum, i) => sum + (i.count || 0), 0);
					const missing = Math.max(0, needed - have);
					const isTradeable = src_core_data_manager_js.default.getItemDetails(itemHrid)?.isTradable !== false;
					if (missing > 0 && isTradeable) missingMaterials.push({
						itemHrid,
						itemName: item.itemName,
						missing,
						required: needed,
						isTradeable
					});
				}
				if (missingMaterials.length === 0) return;
				const navButtons = document.querySelectorAll(".NavigationBar_nav__3uuUl");
				const marketplaceButton = Array.from(navButtons).find((nav) => {
					return nav.querySelector("svg[aria-label=\"navigationBar.marketplace\"]") !== null;
				});
				if (!marketplaceButton) return;
				marketplaceButton.click();
				for (let i = 0; i < 50; i++) {
					const tabsContainer = document.querySelector(".MuiTabs-flexContainer[role=\"tablist\"]");
					if (tabsContainer) {
						if (Array.from(tabsContainer.children).some((btn) => btn.textContent.includes("Market Listings"))) break;
					}
					await new Promise((resolve) => setTimeout(resolve, 100));
				}
				await new Promise((resolve) => setTimeout(resolve, 200));
				createCraftingPlanTabs(missingMaterials);
			});
			content.appendChild(buyButton);
		}
		const craftSteps = [];
		collectCraftSteps(plan, craftSteps);
		if (craftSteps.length > 0) {
			const divider2 = document.createElement("div");
			divider2.style.cssText = "border-top: 1px solid var(--border-color, #333); margin: 6px 0;";
			content.appendChild(divider2);
			const stepsHeader = document.createElement("div");
			stepsHeader.style.cssText = `
            font-weight: 500;
            color: var(--text-color-primary, #fff);
            margin-bottom: 4px;
        `;
			stepsHeader.textContent = "Crafting Steps";
			content.appendChild(stepsHeader);
			const gameData = src_core_data_manager_js.default.getInitClientData();
			const skills = src_core_data_manager_js.default.getSkills();
			const equipment = src_core_data_manager_js.default.getEquipment();
			let totalCraftSeconds = 0;
			let totalXP = 0;
			for (let i = 0; i < craftSteps.length; i++) {
				const step = craftSteps[i];
				const qty = (0, src_utils_formatters_js.formatWithSeparator)(step.quantity);
				let timeStr = "";
				let xpStr = "";
				if (step.actionHrid) {
					const actionDetails = gameData?.actionDetailMap?.[step.actionHrid];
					if (actionDetails) {
						const stats = (0, src_utils_action_calculator_js.calculateActionStats)(actionDetails, {
							skills,
							equipment,
							itemDetailMap: gameData.itemDetailMap
						});
						const effMultiplier = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(stats.totalEfficiency);
						const totalSeconds = stats.actionTime * step.actionsNeeded / effMultiplier;
						totalCraftSeconds += totalSeconds;
						timeStr = ` (${(0, src_utils_formatters_js.timeReadable)(totalSeconds)}`;
					}
					const expData = (0, src_utils_experience_calculator_js.calculateExpPerHour)(step.actionHrid);
					if (expData?.expPerHour > 0 && expData.actionsPerHour > 0) {
						const xpPerAction = expData.expPerHour / expData.actionsPerHour;
						totalXP += xpPerAction * step.actionsNeeded;
						xpStr = ` · ${(0, src_utils_formatters_js.formatKMB)(expData.expPerHour)} xp/hr`;
					}
					if (timeStr) timeStr += `${xpStr})`;
					else if (xpStr) timeStr = ` (${xpStr.slice(3)})`;
				}
				content.appendChild(createRow(`${i + 1}. ${step.itemName}`, `x${qty}${timeStr}`));
			}
			if (totalCraftSeconds > 0) {
				const totalTimeRow = createRow("Total craft time", (0, src_utils_formatters_js.timeReadable)(totalCraftSeconds), { leftColor: "var(--text-color-primary, #fff)" });
				totalTimeRow.style.borderTop = "1px solid var(--border-color, #333)";
				totalTimeRow.style.marginTop = "4px";
				totalTimeRow.style.paddingTop = "4px";
				content.appendChild(totalTimeRow);
			}
			if (totalXP > 0) content.appendChild(createRow("Total XP", (0, src_utils_formatters_js.formatKMB)(Math.round(totalXP)), { leftColor: "var(--text-color-primary, #fff)" }));
		}
		const costText = plan.unitCost === Infinity ? "?" : `${(0, src_utils_formatters_js.formatKMB)(Math.round(plan.unitCost))}/ea`;
		const section = (0, src_utils_ui_components_js.createCollapsibleSection)("", "Best Crafting Plan", costText, content, defaultOpen, 0);
		section.id = UI_ID;
		section.className = "mwi-crafting-plan-section";
		return section;
	}
	/**
	* Create marketplace tabs for crafting plan shopping list materials.
	* @param {Array} missingMaterials - Array of { itemHrid, itemName, missing, required, isTradeable }
	*/
	function createCraftingPlanTabs(missingMaterials) {
		const tabsContainer = document.querySelector(".MuiTabs-flexContainer[role=\"tablist\"]");
		if (!tabsContainer) return;
		removeMaterialTabs();
		craftingPlanTabs.length = 0;
		const referenceTab = Array.from(tabsContainer.children).find((btn) => btn.textContent.includes("My Listings"));
		if (!referenceTab) return;
		tabsContainer.style.flexWrap = "wrap";
		for (const material of missingMaterials) {
			const tabRef = { tab: null };
			const handler = () => {
				autofillManager.setPendingCalculation(() => {
					return parseInt(tabRef.tab?.getAttribute("data-missing-quantity") || "0", 10);
				});
				navigateToMarketplace(material.itemHrid, 0);
			};
			const tab = createMaterialTab(material, referenceTab, handler);
			tabRef.tab = tab;
			tabsContainer.appendChild(tab);
			craftingPlanTabs.push(tab);
		}
		if (!cleanupObserver) cleanupObserver = setupMarketplaceCleanupObserver(() => {
			craftingPlanTabs.length = 0;
		}, craftingPlanTabs);
	}
	var CraftingPlanDisplay = class {
		constructor() {
			this.isInitialized = false;
			this.unregisterHandlers = [];
			this.processedPanels = /* @__PURE__ */ new WeakSet();
			this.panelObservers = /* @__PURE__ */ new Map();
		}
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("actionPanel_bestCraftingPlan")) return;
			this.isInitialized = true;
			autofillManager.initialize();
			const unregister = src_core_dom_observer_js.default.onClass("CraftingPlan", "SkillActionDetail_skillActionDetail", () => this._processActionPanels());
			this.unregisterHandlers.push(unregister);
		}
		_processActionPanels() {
			document.querySelectorAll("[class*=\"SkillActionDetail_skillActionDetail\"]").forEach((panel) => {
				if (this.processedPanels.has(panel)) return;
				const actionHrid = getActionHridFromPanel(panel);
				if (!actionHrid) return;
				this.processedPanels.add(panel);
				this._attachToPanel(panel, actionHrid);
			});
		}
		_attachToPanel(panel, actionHrid) {
			const rebuild = () => {
				const existing = panel.querySelector(`#${UI_ID}`);
				const wasOpen = existing?.querySelector(".mwi-section-header span")?.textContent === "▼";
				if (existing) existing.remove();
				const newUI = buildPlanUI(actionHrid, rebuild, wasOpen);
				if (!newUI) return;
				const profitSection = panel.querySelector("[data-mwi-profit-display]");
				if (profitSection) profitSection.parentNode.insertBefore(newUI, profitSection);
				else panel.appendChild(newUI);
			};
			const ui = buildPlanUI(actionHrid, rebuild);
			if (!ui) return;
			const position = () => {
				const existing = panel.querySelector(`#${UI_ID}`);
				const profitSection = panel.querySelector("[data-mwi-profit-display]");
				if (profitSection) {
					if (existing) {
						if (existing.nextElementSibling !== profitSection) profitSection.parentNode.insertBefore(existing, profitSection);
					} else profitSection.parentNode.insertBefore(ui, profitSection);
					return;
				}
				if (!existing) panel.appendChild(ui);
			};
			position();
			const observeTarget = ui.parentNode || panel;
			const obs = new MutationObserver((mutations) => {
				if (mutations.some((m) => [...m.addedNodes, ...m.removedNodes].some((n) => n.id === UI_ID || n.getAttribute && n.getAttribute("data-mwi-profit-display")))) position();
			});
			obs.observe(observeTarget, {
				childList: true,
				subtree: true
			});
			this.panelObservers.set(panel, obs);
		}
		disable() {
			this.unregisterHandlers.forEach((fn) => fn());
			this.unregisterHandlers = [];
			document.querySelectorAll(`#${UI_ID}`).forEach((el) => el.remove());
			this.panelObservers.forEach((obs) => obs.disconnect());
			this.panelObservers = /* @__PURE__ */ new Map();
			this.processedPanels = /* @__PURE__ */ new WeakSet();
			this.isInitialized = false;
		}
	};
	var craftingPlanDisplay = new CraftingPlanDisplay();
	//#endregion
	//#region src/features/crafting-plan/index.js
	/**
	* Crafting Plan Feature
	* Shows the cheapest way to obtain a crafted item by comparing
	* buy vs craft at each material tier.
	*/
	var crafting_plan_default = {
		name: "Crafting Plan",
		initialize: () => {
			craftingPlanDisplay.initialize();
		},
		disable: () => {
			craftingPlanDisplay.disable();
		}
	};
	//#endregion
	//#region src/features/alchemy/alchemy-profit.js
	/**
	* Alchemy Profit Calculator Module
	* Calculates real-time profit for alchemy actions accounting for:
	* - Success rate (failures consume materials but not catalyst)
	* - Efficiency bonuses
	* - Tea buff costs and duration
	* - Market prices (ask/bid based on pricing mode)
	*/
	var AlchemyProfit = class {
		constructor() {
			this.cachedData = null;
			this.lastFingerprint = null;
		}
		/**
		* Extract alchemy action data from the DOM
		* @returns {Object|null} Action data or null if extraction fails
		*/
		async extractActionData() {
			try {
				if (!document.querySelector("[class*=\"SkillActionDetail_alchemyComponent\"]")) return null;
				const actionHrid = this.getCurrentActionHrid();
				const successRateBreakdown = this.extractSuccessRate();
				if (successRateBreakdown === null) return null;
				const actionSpeedBreakdown = this.extractActionSpeed();
				const actionTime = 20 / (1 + actionSpeedBreakdown.total);
				const efficiencyBreakdown = this.extractEfficiency();
				const rareFindBreakdown = this.extractRareFind();
				const essenceFindBreakdown = this.extractEssenceFind();
				const requirements = await this.extractRequirements();
				const drops = await this.extractDrops(actionHrid);
				const catalyst = await this.extractCatalyst();
				const consumables = await this.extractConsumables();
				const teaDuration = this.extractTeaDuration();
				return {
					successRate: successRateBreakdown.total,
					successRateBreakdown,
					actionTime,
					efficiency: efficiencyBreakdown.total,
					efficiencyBreakdown,
					actionSpeedBreakdown,
					rareFindBreakdown,
					essenceFindBreakdown,
					requirements,
					drops,
					catalyst,
					consumables,
					teaDuration
				};
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract action data:", error);
				return null;
			}
		}
		/**
		* Get current alchemy action HRID
		* @returns {string|null} Action HRID or null
		*/
		getCurrentActionHrid() {
			try {
				const currentActions = src_core_data_manager_js.default.getCurrentActions();
				if (!currentActions || currentActions.length === 0) return null;
				for (const action of currentActions) if (action.actionHrid && action.actionHrid.startsWith("/actions/alchemy/")) return action.actionHrid;
				return null;
			} catch (error) {
				console.error("[AlchemyProfit] Failed to get current action HRID:", error);
				return null;
			}
		}
		/**
		* Extract success rate with breakdown from the DOM and active buffs
		* @returns {Object} Success rate breakdown { total, base, tea }
		*/
		extractSuccessRate() {
			try {
				const element = document.querySelector("[class*=\"SkillActionDetail_successRate\"] [class*=\"SkillActionDetail_value\"]");
				if (!element) return null;
				const match = element.textContent.trim().match(/(\d+\.?\d*)/);
				if (!match) return null;
				const totalSuccessRate = parseFloat(match[1]) / 100;
				const gameData = src_core_data_manager_js.default.getInitClientData();
				if (!gameData) return {
					total: totalSuccessRate,
					base: totalSuccessRate,
					tea: 0
				};
				const drinkSlots = src_core_data_manager_js.default.getActionDrinkSlots("/action_types/alchemy");
				const equipment = src_core_data_manager_js.default.getEquipment();
				const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, gameData.itemDetailMap);
				let teaBonus = 0;
				if (drinkSlots && drinkSlots.length > 0) for (const drink of drinkSlots) {
					if (!drink || !drink.itemHrid) continue;
					const itemDetails = gameData.itemDetailMap[drink.itemHrid];
					if (!itemDetails || !itemDetails.consumableDetail || !itemDetails.consumableDetail.buffs) continue;
					for (const buff of itemDetails.consumableDetail.buffs) if (buff.typeHrid === "/buff_types/alchemy_success") {
						const ratioBoost = buff.ratioBoost * (1 + drinkConcentration);
						teaBonus += ratioBoost;
					}
				}
				return {
					total: totalSuccessRate,
					base: totalSuccessRate / (1 + teaBonus),
					tea: teaBonus
				};
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract success rate:", error);
				return null;
			}
		}
		/**
		* Extract action speed buff using dataManager (matches Action Panel pattern)
		* @returns {Object} Action speed breakdown { total, equipment, tea }
		*/
		extractActionSpeed() {
			try {
				const gameData = src_core_data_manager_js.default.getInitClientData();
				if (!gameData) return {
					total: 0,
					equipment: 0,
					tea: 0
				};
				const equipment = src_core_data_manager_js.default.getEquipment();
				const equipmentSpeed = (0, src_utils_equipment_parser_js.parseEquipmentSpeedBonuses)(equipment, "/action_types/alchemy", gameData.itemDetailMap);
				const teaSpeed = 0;
				return {
					total: equipmentSpeed + teaSpeed,
					equipment: equipmentSpeed,
					tea: teaSpeed
				};
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract action speed:", error);
				return {
					total: 0,
					equipment: 0,
					tea: 0
				};
			}
		}
		/**
		* Extract efficiency using dataManager (matches Action Panel pattern)
		* @returns {Object} Efficiency breakdown { total, level, house, tea, equipment, community }
		*/
		extractEfficiency() {
			try {
				const gameData = src_core_data_manager_js.default.getInitClientData();
				if (!gameData) return {
					total: 0,
					level: 0,
					house: 0,
					tea: 0,
					equipment: 0,
					community: 0
				};
				const equipment = src_core_data_manager_js.default.getEquipment();
				const skills = src_core_data_manager_js.default.getSkills();
				const houseRooms = Array.from(src_core_data_manager_js.default.getHouseRooms().values());
				const actionTypeHrid = "/action_types/alchemy";
				const requiredLevel = this.extractRequiredLevel();
				let currentLevel = requiredLevel;
				for (const skill of skills) if (skill.skillHrid === "/skills/alchemy") {
					currentLevel = skill.level;
					break;
				}
				let houseEfficiency = 0;
				for (const room of houseRooms) if ((gameData.houseRoomDetailMap?.[room.houseRoomHrid])?.usableInActionTypeMap?.[actionTypeHrid]) houseEfficiency += (room.level || 0) * 1.5;
				const drinkSlots = src_core_data_manager_js.default.getActionDrinkSlots(actionTypeHrid);
				const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, gameData.itemDetailMap);
				const teaEfficiency = (0, src_utils_tea_parser_js.parseTeaEfficiency)(actionTypeHrid, drinkSlots, gameData.itemDetailMap, drinkConcentration);
				const teaLevelBonus = (0, src_utils_tea_parser_js.parseTeaSkillLevelBonus)(actionTypeHrid, drinkSlots, gameData.itemDetailMap, drinkConcentration);
				const equipmentEfficiency = (0, src_utils_equipment_parser_js.parseEquipmentEfficiencyBonuses)(equipment, actionTypeHrid, gameData.itemDetailMap);
				const communityBuffLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/production_efficiency");
				let communityEfficiency = 0;
				if (communityBuffLevel > 0) communityEfficiency = (.14 + (communityBuffLevel - 1) * .003) * 100;
				const achievementEfficiency = src_core_data_manager_js.default.getAchievementBuffFlatBoost(actionTypeHrid, "/buff_types/efficiency") * 100;
				const efficiencyBreakdown = (0, src_utils_efficiency_js.calculateEfficiencyBreakdown)({
					requiredLevel,
					skillLevel: currentLevel,
					teaSkillLevelBonus: teaLevelBonus,
					houseEfficiency,
					teaEfficiency,
					equipmentEfficiency,
					communityEfficiency,
					achievementEfficiency
				});
				const totalEfficiency = efficiencyBreakdown.totalEfficiency;
				const levelEfficiency = efficiencyBreakdown.levelEfficiency;
				return {
					total: totalEfficiency / 100,
					level: levelEfficiency,
					house: houseEfficiency,
					tea: teaEfficiency,
					equipment: equipmentEfficiency,
					community: communityEfficiency,
					achievement: achievementEfficiency
				};
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract efficiency:", error);
				return {
					total: 0,
					level: 0,
					house: 0,
					tea: 0,
					equipment: 0,
					community: 0,
					achievement: 0
				};
			}
		}
		/**
		* Extract rare find bonus from equipment and buffs
		* @returns {Object} Rare find breakdown { total, equipment, achievement }
		*/
		extractRareFind() {
			try {
				const gameData = src_core_data_manager_js.default.getInitClientData();
				if (!gameData) return {
					total: 0,
					equipment: 0,
					achievement: 0
				};
				const equipment = src_core_data_manager_js.default.getEquipment();
				const actionTypeHrid = "/action_types/alchemy";
				let equipmentRareFind = 0;
				for (const slot of equipment) {
					if (!slot || !slot.itemHrid) continue;
					const itemDetail = gameData.itemDetailMap[slot.itemHrid];
					if (!itemDetail?.noncombatStats?.rareFind) continue;
					const enhancementLevel = slot.enhancementLevel || 0;
					const enhancementBonus = this.getEnhancementBonus(enhancementLevel);
					const slotMultiplier = this.getSlotMultiplier(itemDetail.equipmentType);
					equipmentRareFind += itemDetail.noncombatStats.rareFind * (1 + enhancementBonus * slotMultiplier);
				}
				const achievementRareFind = src_core_data_manager_js.default.getAchievementBuffFlatBoost(actionTypeHrid, "/buff_types/rare_find") * 100;
				return {
					total: (equipmentRareFind + achievementRareFind) / 100,
					equipment: equipmentRareFind,
					achievement: achievementRareFind
				};
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract rare find:", error);
				return {
					total: 0,
					equipment: 0,
					achievement: 0
				};
			}
		}
		/**
		* Extract essence find bonus from equipment and buffs
		* @returns {Object} Essence find breakdown { total, equipment }
		*/
		extractEssenceFind() {
			try {
				const gameData = src_core_data_manager_js.default.getInitClientData();
				if (!gameData) return {
					total: 0,
					equipment: 0
				};
				const equipment = src_core_data_manager_js.default.getEquipment();
				let equipmentEssenceFind = 0;
				for (const slot of equipment) {
					if (!slot || !slot.itemHrid) continue;
					const itemDetail = gameData.itemDetailMap[slot.itemHrid];
					if (!itemDetail?.noncombatStats?.essenceFind) continue;
					const enhancementLevel = slot.enhancementLevel || 0;
					const enhancementBonus = this.getEnhancementBonus(enhancementLevel);
					const slotMultiplier = this.getSlotMultiplier(itemDetail.equipmentType);
					equipmentEssenceFind += itemDetail.noncombatStats.essenceFind * (1 + enhancementBonus * slotMultiplier);
				}
				return {
					total: equipmentEssenceFind / 100,
					equipment: equipmentEssenceFind
				};
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract essence find:", error);
				return {
					total: 0,
					equipment: 0
				};
			}
		}
		/**
		* Get enhancement bonus percentage for a given enhancement level
		* @param {number} enhancementLevel - Enhancement level (0-20)
		* @returns {number} Enhancement bonus as decimal
		*/
		getEnhancementBonus(enhancementLevel) {
			return {
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
			}[enhancementLevel] || 0;
		}
		/**
		* Get slot multiplier for enhancement bonuses
		* @param {string} equipmentType - Equipment type HRID
		* @returns {number} Multiplier (1 or 5)
		*/
		getSlotMultiplier(equipmentType) {
			return [
				"/equipment_types/neck",
				"/equipment_types/ring",
				"/equipment_types/earrings",
				"/equipment_types/back",
				"/equipment_types/trinket",
				"/equipment_types/charm",
				"/equipment_types/pouch"
			].includes(equipmentType) ? 5 : 1;
		}
		/**
		* Extract required level from notes
		* @returns {number} Required alchemy level
		*/
		extractRequiredLevel() {
			try {
				const notesEl = document.querySelector("[class*=\"SkillActionDetail_notes\"]");
				if (!notesEl) return 0;
				const match = notesEl.textContent.match(/(\d+)/);
				return match ? parseInt(match[1]) : 0;
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract required level:", error);
				return 0;
			}
		}
		/**
		* Extract tea buff duration from React props
		* @returns {number} Duration in seconds (default 300)
		*/
		extractTeaDuration() {
			try {
				const rootEl = document.getElementById("root");
				const rootFiber = rootEl?._reactRootContainer?.current || rootEl?._reactRootContainer?._internalRoot?.current;
				if (!rootFiber) return 300;
				function find(fiber) {
					if (!fiber) return null;
					if (fiber.memoizedProps?.actionBuffs) return fiber;
					return find(fiber.child) || find(fiber.sibling);
				}
				const fiberNode = find(rootFiber);
				if (!fiberNode) return 300;
				const buffs = fiberNode.memoizedProps.actionBuffs;
				for (const buff of buffs) if (buff.uniqueHrid && buff.uniqueHrid.endsWith("tea")) return (buff.duration || 0) / 1e9;
				return 300;
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract tea duration:", error);
				return 300;
			}
		}
		/**
		* Extract requirements (input materials) from the DOM
		* @returns {Promise<Array>} Array of requirement objects
		*/
		async extractRequirements() {
			try {
				const elements = document.querySelectorAll("[class*=\"SkillActionDetail_itemRequirements\"] [class*=\"Item_itemContainer\"]");
				const requirements = [];
				for (let i = 0; i < elements.length; i++) {
					const el = elements[i];
					const itemData = await this.extractItemData(el, true, i);
					if (itemData) requirements.push(itemData);
				}
				return requirements;
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract requirements:", error);
				return [];
			}
		}
		/**
		* Extract drops (outputs) from the DOM
		* @returns {Promise<Array>} Array of drop objects
		*/
		async extractDrops(actionHrid) {
			try {
				const elements = document.querySelectorAll("[class*=\"SkillActionDetail_dropTable\"] [class*=\"Item_itemContainer\"]");
				const drops = [];
				const gameData = src_core_data_manager_js.default.getInitClientData();
				const actionDetail = actionHrid && gameData ? gameData.actionDetailMap?.[actionHrid] : null;
				for (let i = 0; i < elements.length; i++) {
					const el = elements[i];
					const itemData = await this.extractItemData(el, false, i, actionDetail);
					if (itemData) drops.push(itemData);
				}
				return drops;
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract drops:", error);
				return [];
			}
		}
		/**
		* Extract catalyst from the DOM
		* @returns {Promise<Object>} Catalyst object with prices
		*/
		async extractCatalyst() {
			try {
				const element = document.querySelector("[class*=\"SkillActionDetail_catalystItemInputContainer\"] [class*=\"ItemSelector_itemContainer\"]") || document.querySelector("[class*=\"SkillActionDetail_catalystItemInputContainer\"] [class*=\"SkillActionDetail_itemContainer\"]");
				if (!element) return {
					ask: 0,
					bid: 0
				};
				return await this.extractItemData(element, false, -1) || {
					ask: 0,
					bid: 0
				};
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract catalyst:", error);
				return {
					ask: 0,
					bid: 0
				};
			}
		}
		/**
		* Extract consumables (tea/drinks) from the DOM
		* @returns {Promise<Array>} Array of consumable objects
		*/
		async extractConsumables() {
			try {
				const elements = document.querySelectorAll("[class*=\"ActionTypeConsumableSlots_consumableSlots\"] [class*=\"Item_itemContainer\"]");
				const consumables = [];
				for (const el of elements) {
					const itemData = await this.extractItemData(el, false, -1);
					if (itemData && itemData.itemHrid !== "/items/coin") consumables.push(itemData);
				}
				return consumables;
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract consumables:", error);
				return [];
			}
		}
		/**
		* Calculate the cost to create an enhanced item
		* @param {string} itemHrid - Item HRID
		* @param {number} targetLevel - Target enhancement level
		* @param {string} priceType - 'ask' or 'bid'
		* @returns {number} Total cost to create the enhanced item
		*/
		calculateEnhancementCost(itemHrid, targetLevel, priceType) {
			if (targetLevel === 0) {
				const priceData = src_api_marketplace_js.default.getPrice(itemHrid, 0);
				return priceType === "ask" ? priceData?.ask || 0 : priceData?.bid || 0;
			}
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData) return 0;
			const itemData = gameData.itemDetailMap?.[itemHrid];
			if (!itemData) return 0;
			const basePriceData = src_api_marketplace_js.default.getPrice(itemHrid, 0);
			let totalCost = priceType === "ask" ? basePriceData?.ask || 0 : basePriceData?.bid || 0;
			const enhancementMaterials = itemData.enhancementCosts;
			if (!enhancementMaterials || !Array.isArray(enhancementMaterials)) return totalCost;
			for (let level = 0; level < targetLevel; level++) for (const cost of enhancementMaterials) {
				const materialHrid = cost.itemHrid;
				const materialCount = cost.count || 0;
				if (materialHrid === "/items/coin") totalCost += materialCount;
				else {
					const materialPrice = src_api_marketplace_js.default.getPrice(materialHrid, 0);
					const price = priceType === "ask" ? materialPrice?.ask || 0 : materialPrice?.bid || 0;
					totalCost += price * materialCount;
				}
			}
			return totalCost;
		}
		/**
		* Calculate value recovered from decomposing an enhanced item
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level
		* @param {string} priceType - 'ask' or 'bid'
		* @returns {number} Total value recovered from decomposition
		*/
		calculateDecompositionValue(itemHrid, enhancementLevel, priceType) {
			if (enhancementLevel === 0) return 0;
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData) return 0;
			const itemDetails = gameData.itemDetailMap?.[itemHrid];
			if (!itemDetails) return 0;
			let totalValue = 0;
			if (itemDetails.decompositionDetail?.results) for (const result of itemDetails.decompositionDetail.results) {
				const priceData = src_api_marketplace_js.default.getPrice(result.itemHrid, 0);
				if (priceData) {
					const price = priceType === "ask" ? priceData.ask : priceData.bid;
					totalValue += (0, src_utils_profit_helpers_js.calculatePriceAfterTax)(price * result.amount);
				}
			}
			const itemLevel = itemDetails.itemLevel || 1;
			const essenceAmount = Math.round(2 * (.5 + .1 * Math.pow(1.05, itemLevel)) * Math.pow(2, enhancementLevel));
			const essencePriceData = src_api_marketplace_js.default.getPrice("/items/enhancing_essence", 0);
			if (essencePriceData) {
				const essencePrice = priceType === "ask" ? essencePriceData.ask : essencePriceData.bid;
				totalValue += (0, src_utils_profit_helpers_js.calculatePriceAfterTax)(essencePrice * essenceAmount);
			}
			return totalValue;
		}
		/**
		* Extract item data (HRID, prices, count, drop rate) from DOM element
		* @param {HTMLElement} element - Item container element
		* @param {boolean} isRequirement - True if this is a requirement (has count), false if drop (has drop rate)
		* @param {number} index - Index in the list (for extracting count/rate text)
		* @returns {Promise<Object|null>} Item data object or null
		*/
		async extractItemData(element, isRequirement, index, actionDetail = null) {
			try {
				const use = element.querySelector("svg use");
				if (!use) return null;
				const href = use.getAttribute("href");
				if (!href) return null;
				const itemId = href.split("#")[1];
				if (!itemId) return null;
				const itemHrid = `/items/${itemId}`;
				let enhancementLevel = 0;
				if (isRequirement) {
					const enhEl = element.querySelector("[class*=\"Item_enhancementLevel\"]");
					if (enhEl) {
						const match = enhEl.textContent.match(/\+(\d+)/);
						enhancementLevel = match ? parseInt(match[1]) : 0;
					}
				}
				let ask = 0, bid = 0;
				if (itemHrid === "/items/coin") ask = bid = 1;
				else if (src_core_data_manager_js.default.getItemDetails(itemHrid)?.isOpenable) {
					const containerValue = src_features_market_expected_value_calculator_js.default.getCachedValue(itemHrid);
					if (containerValue !== null && containerValue > 0) ask = bid = containerValue;
					else {
						const priceData = src_api_marketplace_js.default.getPrice(itemHrid, enhancementLevel);
						ask = priceData?.ask || 0;
						bid = priceData?.bid || 0;
					}
				} else {
					const priceData = src_api_marketplace_js.default.getPrice(itemHrid, enhancementLevel);
					if (priceData && (priceData.ask > 0 || priceData.bid > 0)) {
						ask = priceData.ask || 0;
						bid = priceData.bid || 0;
					} else {
						ask = this.calculateEnhancementCost(itemHrid, enhancementLevel, "ask");
						bid = this.calculateEnhancementCost(itemHrid, enhancementLevel, "bid");
					}
				}
				const result = {
					itemHrid,
					ask,
					bid,
					enhancementLevel
				};
				if (isRequirement && index >= 0) {
					const countElements = document.querySelectorAll("[class*=\"SkillActionDetail_itemRequirements\"] [class*=\"SkillActionDetail_inputCount\"]");
					if (countElements[index]) {
						const match = countElements[index].textContent.trim().match(/\/\s*([\d,]+)/);
						let parsedCount = 1;
						if (match) {
							const cleaned = match[1].replace(/,/g, "");
							parsedCount = parseFloat(cleaned);
						}
						result.count = parsedCount || 1;
					} else result.count = 1;
				} else if (!isRequirement) {
					let dropRateFromGameData = null;
					if (actionDetail && actionDetail.dropTable) {
						const dropEntry = actionDetail.dropTable.find((drop) => drop.itemHrid === itemHrid);
						if (dropEntry) dropRateFromGameData = dropEntry.dropRate;
					}
					const dropElements = document.querySelectorAll("[class*=\"SkillActionDetail_drop\"], [class*=\"SkillActionDetail_essence\"], [class*=\"SkillActionDetail_rare\"]");
					for (const dropElement of dropElements) {
						const dropItemElement = dropElement.querySelector("[class*=\"Item_itemContainer\"] svg use");
						if (dropItemElement) {
							const dropHref = dropItemElement.getAttribute("href");
							const dropItemId = dropHref ? dropHref.split("#")[1] : null;
							if ((dropItemId ? `/items/${dropItemId}` : null) === itemHrid) {
								const text = dropElement.textContent.trim();
								const countMatch = text.match(/^([\d\s,.]+)/);
								if (countMatch) {
									const cleaned = countMatch[1].replace(/,/g, "").trim();
									result.count = parseFloat(cleaned) || 1;
								} else result.count = 1;
								if (dropRateFromGameData !== null) result.dropRate = dropRateFromGameData;
								else {
									const rateMatch = text.match(/~?([\d,.]+)%/);
									if (rateMatch) {
										const cleaned = rateMatch[1].replace(/,/g, "");
										result.dropRate = parseFloat(cleaned) / 100 || 1;
									} else result.dropRate = 1;
								}
								break;
							}
						}
					}
					if (result.count === void 0) result.count = 1;
					if (result.dropRate === void 0) result.dropRate = dropRateFromGameData !== null ? dropRateFromGameData : 1;
				}
				return result;
			} catch (error) {
				console.error("[AlchemyProfit] Failed to extract item data:", error);
				return null;
			}
		}
		/**
		* Generate state fingerprint for change detection
		* @returns {string} Fingerprint string
		*/
		getStateFingerprint() {
			try {
				const successRate = document.querySelector("[class*=\"SkillActionDetail_successRate\"] [class*=\"SkillActionDetail_value\"]")?.textContent || "";
				const consumables = Array.from(document.querySelectorAll("[class*=\"ActionTypeConsumableSlots_consumableSlots\"] [class*=\"Item_itemContainer\"]")).map((el) => el.querySelector("svg use")?.getAttribute("href") || "empty").join("|");
				const catalystUse = document.querySelector("[class*=\"SkillActionDetail_catalystItemInputContainer\"] [class*=\"Item_itemContainer\"] svg use");
				const catalyst = catalystUse?.getAttribute("xlink:href") || catalystUse?.getAttribute("href") || "none";
				const requirements = Array.from(document.querySelectorAll("[class*=\"SkillActionDetail_itemRequirements\"] [class*=\"Item_itemContainer\"]")).map((el) => {
					return `${el.querySelector("svg use")?.getAttribute("href") || "empty"}${el.querySelector("[class*=\"Item_enhancementLevel\"]")?.textContent || "0"}`;
				}).join("|");
				return `${document.querySelector("[class*=\"AlchemyPanel_tabsComponentContainer\"]")?.querySelector("[role=\"tab\"][aria-selected=\"true\"]")?.textContent?.trim() || ""}:${successRate}:${consumables}:${catalyst}:${requirements}`;
			} catch {
				return "";
			}
		}
	};
	var alchemyProfit = new AlchemyProfit();
	//#endregion
	//#region src/utils/tea-optimizer.js
	/**
	* Tea Optimizer Utility
	* Calculates optimal tea combinations for XP or Gold optimization
	*/
	var SKILL_TO_ACTION_TYPE = {
		milking: "/action_types/milking",
		foraging: "/action_types/foraging",
		woodcutting: "/action_types/woodcutting",
		cheesesmithing: "/action_types/cheesesmithing",
		crafting: "/action_types/crafting",
		tailoring: "/action_types/tailoring",
		cooking: "/action_types/cooking",
		brewing: "/action_types/brewing",
		alchemy: "/action_types/alchemy"
	};
	var GATHERING_SKILLS$1 = [
		"milking",
		"foraging",
		"woodcutting"
	];
	var PRODUCTION_SKILLS = [
		"cheesesmithing",
		"crafting",
		"tailoring",
		"cooking",
		"brewing",
		"alchemy"
	];
	/**
	* Get all relevant teas for a skill and optimization goal
	* Returns teas grouped by exclusivity (skill teas are mutually exclusive)
	* @param {string} skillName - Skill name (e.g., 'milking')
	* @param {string} goal - 'xp' or 'gold'
	* @returns {Object} { skillTeas: [], generalTeas: [] }
	*/
	function getRelevantTeas(skillName, goal) {
		const skill = skillName.toLowerCase();
		const isGathering = GATHERING_SKILLS$1.includes(skill);
		const skillTeas = [
			`/items/${skill}_tea`,
			`/items/super_${skill}_tea`,
			`/items/ultra_${skill}_tea`
		];
		const generalTeas = /* @__PURE__ */ new Set();
		generalTeas.add("/items/efficiency_tea");
		if (skill !== "alchemy") generalTeas.add("/items/artisan_tea");
		if (skill === "alchemy") generalTeas.add("/items/catalytic_tea");
		generalTeas.add("/items/wisdom_tea");
		if (goal === "xp") {
			if (skill === "cooking" || skill === "brewing") generalTeas.add("/items/gourmet_tea");
		} else if (goal === "gold") {
			if (isGathering) {
				generalTeas.add("/items/gathering_tea");
				generalTeas.add("/items/processing_tea");
			} else if (skill === "cooking" || skill === "brewing") generalTeas.add("/items/gourmet_tea");
		}
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.itemDetailMap) return {
			skillTeas: [],
			generalTeas: []
		};
		return {
			skillTeas: skillTeas.filter((hrid) => gameData.itemDetailMap[hrid]),
			generalTeas: Array.from(generalTeas).filter((hrid) => gameData.itemDetailMap[hrid])
		};
	}
	/**
	* Generate all valid tea combinations respecting exclusivity rules
	* - Can only use ONE skill-specific tea (mutually exclusive)
	* - Can use any combination of general teas
	* - Max 3 teas total
	* @param {Object} teaGroups - { skillTeas: [], generalTeas: [] }
	* @returns {Array<Array<string>>} Array of valid tea combinations
	*/
	function generateCombinations(teaGroups, constraints = null) {
		const { skillTeas, generalTeas } = teaGroups;
		const combinations = [];
		const addCombo = (combo) => {
			if (combo.length > 0 && combo.length <= 3) {
				if (constraints) {
					if ([...constraints.pinned].some((t) => !combo.includes(t))) return;
					if (combo.some((t) => constraints.banned.has(t))) return;
				}
				combinations.push(combo);
			}
		};
		for (let i = 0; i < generalTeas.length; i++) {
			addCombo([generalTeas[i]]);
			for (let j = i + 1; j < generalTeas.length; j++) {
				addCombo([generalTeas[i], generalTeas[j]]);
				for (let k = j + 1; k < generalTeas.length; k++) addCombo([
					generalTeas[i],
					generalTeas[j],
					generalTeas[k]
				]);
			}
		}
		for (const skillTea of skillTeas) {
			addCombo([skillTea]);
			for (let i = 0; i < generalTeas.length; i++) {
				addCombo([skillTea, generalTeas[i]]);
				for (let j = i + 1; j < generalTeas.length; j++) addCombo([
					skillTea,
					generalTeas[i],
					generalTeas[j]
				]);
			}
		}
		return combinations;
	}
	/**
	* Parse tea buffs from a tea combination
	* @param {Array<string>} teaHrids - Array of tea item HRIDs
	* @param {Object} itemDetailMap - Item details from game data
	* @param {number} drinkConcentration - Drink concentration as decimal
	* @returns {Object} Aggregated buff values
	*/
	function parseTeaBuffs(teaHrids, itemDetailMap, drinkConcentration) {
		const buffs = {
			efficiency: 0,
			wisdom: 0,
			gathering: 0,
			processing: 0,
			artisan: 0,
			gourmet: 0,
			actionLevel: 0,
			alchemySuccess: 0,
			skillLevels: {}
		};
		for (const teaHrid of teaHrids) {
			const itemDetails = itemDetailMap[teaHrid];
			if (!itemDetails?.consumableDetail?.buffs) continue;
			for (const buff of itemDetails.consumableDetail.buffs) {
				const scaledValue = (buff.flatBoost || 0) * (1 + drinkConcentration);
				switch (buff.typeHrid) {
					case "/buff_types/efficiency":
						buffs.efficiency += scaledValue * 100;
						break;
					case "/buff_types/wisdom":
						buffs.wisdom += scaledValue * 100;
						break;
					case "/buff_types/gathering":
						buffs.gathering += scaledValue;
						break;
					case "/buff_types/processing":
						buffs.processing += scaledValue;
						break;
					case "/buff_types/artisan":
						buffs.artisan += scaledValue;
						break;
					case "/buff_types/gourmet":
						buffs.gourmet += scaledValue;
						break;
					case "/buff_types/action_level":
						buffs.actionLevel += scaledValue;
						break;
					case "/buff_types/alchemy_success":
						buffs.alchemySuccess += (buff.ratioBoost || 0) * (1 + drinkConcentration);
						break;
					default: if (buff.typeHrid.endsWith("_level")) {
						const skillMatch = buff.typeHrid.match(/\/buff_types\/(\w+)_level/);
						if (skillMatch) {
							const skill = skillMatch[1];
							buffs.skillLevels[skill] = (buffs.skillLevels[skill] || 0) + scaledValue;
						}
					}
				}
			}
		}
		return buffs;
	}
	/**
	* Calculate XP/hour for an action with a specific tea combination
	* @param {Object} actionDetails - Action details from game data
	* @param {Object} buffs - Parsed tea buffs
	* @param {number} playerLevel - Player's skill level
	* @param {Object} otherEfficiency - Other efficiency sources (house, equipment, etc.)
	* @param {Object} context - Additional context (equipment, itemDetailMap)
	* @returns {number} XP per hour
	*/
	function calculateXpPerHour(actionDetails, buffs, playerLevel, otherEfficiency, context) {
		if (!actionDetails.experienceGain?.value) return 0;
		const { equipment, itemDetailMap } = context;
		const requiredLevel = actionDetails.levelRequirement?.level || 1;
		const skillName = actionDetails.type.split("/").pop();
		const teaSkillLevelBonus = buffs.skillLevels[skillName] || 0;
		const equipmentSpeedBonus = (0, src_utils_equipment_parser_js.parseEquipmentSpeedBonuses)(equipment, actionDetails.type, itemDetailMap) || 0;
		const equipmentEfficiencyBonus = (0, src_utils_equipment_parser_js.parseEquipmentEfficiencyBonuses)(equipment, actionDetails.type, itemDetailMap) || 0;
		const totalEfficiency = (0, src_utils_efficiency_js.calculateEfficiencyBreakdown)({
			requiredLevel,
			skillLevel: playerLevel,
			teaSkillLevelBonus,
			actionLevelBonus: buffs.actionLevel,
			houseEfficiency: otherEfficiency.house || 0,
			equipmentEfficiency: equipmentEfficiencyBonus,
			teaEfficiency: buffs.efficiency,
			communityEfficiency: otherEfficiency.community || 0,
			achievementEfficiency: otherEfficiency.achievement || 0
		}).totalEfficiency;
		const efficiencyMultiplier = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(totalEfficiency);
		const actionTime = (actionDetails.baseTimeCost || 3e9) / 1e9 / (1 + equipmentSpeedBonus);
		const baseActionsPerHour = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime);
		const actionsPerHour = (0, src_utils_profit_helpers_js.calculateEffectiveActionsPerHour)(baseActionsPerHour, efficiencyMultiplier);
		const skillHrid = actionDetails.experienceGain.skillHrid;
		const currentXpData = (0, src_utils_experience_parser_js.calculateExperienceMultiplier)(skillHrid, actionDetails.type);
		const currentTeaWisdom = currentXpData.breakdown?.consumableWisdom || 0;
		const totalWisdomWithOurTea = currentXpData.totalWisdom - currentTeaWisdom + buffs.wisdom;
		const charmExperience = currentXpData.charmExperience || 0;
		const xpMultiplier = 1 + totalWisdomWithOurTea / 100 + charmExperience / 100;
		return actionsPerHour * actionDetails.experienceGain.value * xpMultiplier;
	}
	/**
	* Calculate Gold/hour for a gathering action with a specific tea combination
	* @param {Object} actionDetails - Action details from game data
	* @param {Object} buffs - Parsed tea buffs
	* @param {number} playerLevel - Player's skill level
	* @param {Object} otherEfficiency - Other efficiency sources
	* @param {Object} gameData - Full game data
	* @param {Object} context - Additional context (equipment, itemDetailMap)
	* @returns {number} Gold per hour (profit after market tax)
	*/
	function calculateGatheringGoldPerHour(actionDetails, buffs, playerLevel, otherEfficiency, gameData, context) {
		const { equipment, itemDetailMap } = context;
		const requiredLevel = actionDetails.levelRequirement?.level || 1;
		const skillName = actionDetails.type.split("/").pop();
		const teaSkillLevelBonus = buffs.skillLevels[skillName] || 0;
		const equipmentSpeedBonus = (0, src_utils_equipment_parser_js.parseEquipmentSpeedBonuses)(equipment, actionDetails.type, itemDetailMap) || 0;
		const equipmentEfficiencyBonus = (0, src_utils_equipment_parser_js.parseEquipmentEfficiencyBonuses)(equipment, actionDetails.type, itemDetailMap) || 0;
		const totalEfficiency = (0, src_utils_efficiency_js.calculateEfficiencyBreakdown)({
			requiredLevel,
			skillLevel: playerLevel,
			teaSkillLevelBonus,
			actionLevelBonus: buffs.actionLevel,
			houseEfficiency: otherEfficiency.house || 0,
			equipmentEfficiency: equipmentEfficiencyBonus,
			teaEfficiency: buffs.efficiency,
			communityEfficiency: otherEfficiency.community || 0,
			achievementEfficiency: otherEfficiency.achievement || 0
		}).totalEfficiency;
		const efficiencyMultiplier = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(totalEfficiency);
		const actionTime = (actionDetails.baseTimeCost || 3e9) / 1e9 / (1 + equipmentSpeedBonus);
		const actionsPerHour = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime);
		let totalRevenue = 0;
		const dropTable = actionDetails.dropTable || [];
		const gatheringBonus = 1 + buffs.gathering + (otherEfficiency.gathering || 0);
		for (const drop of dropTable) {
			const dropRate = drop.dropRate || 1;
			const minCount = drop.minCount || 1;
			const avgAmountPerAction = (minCount + (drop.maxCount || minCount)) / 2 * gatheringBonus;
			const rawPrice = (0, src_utils_market_data_js.getItemPrice)(drop.itemHrid, {
				context: "profit",
				side: "sell"
			}) || 0;
			if (buffs.processing > 0) {
				const processedData = findProcessingConversion(drop.itemHrid, gameData);
				if (processedData) {
					const processedPrice = (0, src_utils_market_data_js.getItemPrice)(processedData.outputItemHrid, {
						context: "profit",
						side: "sell"
					}) || 0;
					const conversionRatio = processedData.conversionRatio;
					const processedIfProcs = Math.floor(avgAmountPerAction / conversionRatio);
					const processedPerAction = buffs.processing * processedIfProcs;
					const processingNetValue = actionsPerHour * dropRate * efficiencyMultiplier * (processedPerAction * (processedPrice - conversionRatio * rawPrice));
					const baseRawItemsPerHour = actionsPerHour * dropRate * avgAmountPerAction * efficiencyMultiplier;
					totalRevenue += baseRawItemsPerHour * rawPrice + processingNetValue;
					continue;
				}
			}
			const itemsPerHour = actionsPerHour * dropRate * avgAmountPerAction * efficiencyMultiplier;
			totalRevenue += itemsPerHour * rawPrice;
		}
		const efficiencyBoostedBonusRevenue = (0, src_utils_bonus_revenue_calculator_js.calculateBonusRevenue)(actionDetails, actionsPerHour, equipment, itemDetailMap).totalBonusRevenue * efficiencyMultiplier;
		totalRevenue += efficiencyBoostedBonusRevenue;
		return totalRevenue * .98;
	}
	/**
	* Calculate Gold/hour for a production action with a specific tea combination
	* @param {Object} actionDetails - Action details from game data
	* @param {Object} buffs - Parsed tea buffs
	* @param {number} playerLevel - Player's skill level
	* @param {Object} otherEfficiency - Other efficiency sources
	* @param {Object} gameData - Full game data
	* @param {Object} context - Additional context (equipment, itemDetailMap)
	* @returns {number} Gold per hour (profit after market tax)
	*/
	function calculateProductionGoldPerHour(actionDetails, buffs, playerLevel, otherEfficiency, gameData, context) {
		const { equipment, itemDetailMap } = context;
		const requiredLevel = actionDetails.levelRequirement?.level || 1;
		const skillName = actionDetails.type.split("/").pop();
		const teaSkillLevelBonus = buffs.skillLevels[skillName] || 0;
		const equipmentSpeedBonus = (0, src_utils_equipment_parser_js.parseEquipmentSpeedBonuses)(equipment, actionDetails.type, itemDetailMap) || 0;
		const equipmentEfficiencyBonus = (0, src_utils_equipment_parser_js.parseEquipmentEfficiencyBonuses)(equipment, actionDetails.type, itemDetailMap) || 0;
		const totalEfficiency = (0, src_utils_efficiency_js.calculateEfficiencyBreakdown)({
			requiredLevel,
			skillLevel: playerLevel,
			teaSkillLevelBonus,
			actionLevelBonus: buffs.actionLevel,
			houseEfficiency: otherEfficiency.house || 0,
			equipmentEfficiency: equipmentEfficiencyBonus,
			teaEfficiency: buffs.efficiency,
			communityEfficiency: otherEfficiency.community || 0,
			achievementEfficiency: otherEfficiency.achievement || 0
		}).totalEfficiency;
		const efficiencyMultiplier = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(totalEfficiency);
		const actionTime = (actionDetails.baseTimeCost || 3e9) / 1e9 / (1 + equipmentSpeedBonus);
		const actionsPerHour = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime);
		let inputCost = 0;
		const artisanReduction = 1 - buffs.artisan;
		if (actionDetails.upgradeItemHrid) {
			let upgradePrice = (0, src_utils_market_data_js.getItemPrice)(actionDetails.upgradeItemHrid, {
				context: "profit",
				side: "buy"
			}) || 0;
			if (actionDetails.upgradeItemHrid === "/items/coin" && upgradePrice === 0) upgradePrice = 1;
			inputCost += upgradePrice;
		}
		for (const input of actionDetails.inputItems || []) {
			let price = (0, src_utils_market_data_js.getItemPrice)(input.itemHrid, {
				context: "profit",
				side: "buy"
			}) || 0;
			if (input.itemHrid === "/items/coin" && price === 0) price = 1;
			const effectiveCount = input.count * artisanReduction;
			inputCost += price * effectiveCount;
		}
		let outputRevenue = 0;
		const gourmetBonus = actionDetails.type === "/action_types/cooking" || actionDetails.type === "/action_types/brewing" ? 1 + buffs.gourmet : 1;
		for (const output of actionDetails.outputItems || []) {
			const price = (0, src_utils_market_data_js.getItemPrice)(output.itemHrid, {
				context: "profit",
				side: "sell"
			}) || 0;
			const effectiveCount = output.count * gourmetBonus;
			outputRevenue += price * effectiveCount;
		}
		const grossProfitPerHour = actionsPerHour * (outputRevenue - inputCost) * efficiencyMultiplier;
		const efficiencyBoostedBonusRevenue = ((0, src_utils_bonus_revenue_calculator_js.calculateBonusRevenue)(actionDetails, actionsPerHour, equipment, itemDetailMap)?.totalBonusRevenue || 0) * efficiencyMultiplier;
		const marketTax = (actionsPerHour * outputRevenue * efficiencyMultiplier + efficiencyBoostedBonusRevenue) * .02;
		return grossProfitPerHour + efficiencyBoostedBonusRevenue - marketTax;
	}
	/**
	* Calculate Gold/hour for an alchemy action with a specific tea combination
	* @param {Object} alchemyContext - { actionType: 'coinify'|'decompose'|'transmute', itemHrid, enhancementLevel }
	* @param {Object} buffs - Parsed tea buffs (includes alchemySuccess)
	* @returns {number} Gold per hour (profit after all costs)
	*/
	function calculateAlchemyGoldPerHour(alchemyContext, buffs) {
		const { actionType, itemHrid, enhancementLevel = 0 } = alchemyContext;
		const teaBonusOverride = buffs.alchemySuccess || 0;
		let profitData = null;
		if (actionType === "coinify") profitData = src_features_market_alchemy_profit_calculator_js.default.calculateCoinifyProfit(itemHrid, enhancementLevel, false, teaBonusOverride);
		else if (actionType === "decompose") profitData = src_features_market_alchemy_profit_calculator_js.default.calculateDecomposeProfit(itemHrid, enhancementLevel, false, teaBonusOverride);
		else if (actionType === "transmute") profitData = src_features_market_alchemy_profit_calculator_js.default.calculateTransmuteProfit(itemHrid, false, teaBonusOverride);
		if (!profitData) return 0;
		return profitData.profitPerHour || 0;
	}
	/**
	* Calculate XP/hour for an alchemy action with a specific tea combination.
	* Alchemy XP is derived from item level, not from actionDetails.experienceGain.
	* @param {Object} alchemyContext - { actionType, itemHrid, enhancementLevel }
	* @param {Object} buffs - Parsed tea buffs
	* @param {number} playerLevel - Player's alchemy level
	* @param {Object} otherEfficiency - Non-tea efficiency sources
	* @param {Object} calcContext - { equipment, itemDetailMap }
	* @returns {number} XP per hour
	*/
	function calculateAlchemyXpPerHour(alchemyContext, buffs, playerLevel, otherEfficiency, calcContext) {
		const { actionType, itemHrid } = alchemyContext;
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.actionDetailMap) return 0;
		const actionHrid = `/actions/alchemy/${actionType}`;
		const actionDetails = gameData.actionDetailMap[actionHrid];
		if (!actionDetails) return 0;
		const itemDetails = gameData.itemDetailMap?.[itemHrid];
		if (!itemDetails?.itemLevel) return 0;
		const itemLevel = itemDetails.itemLevel;
		let baseXP;
		switch (actionType) {
			case "coinify":
				baseXP = itemLevel + 10;
				break;
			case "decompose":
				baseXP = itemLevel * 1.4 + 14;
				break;
			case "transmute":
				baseXP = itemLevel * 1.6 + 16;
				break;
			default: return 0;
		}
		const teaBonusOverride = buffs.alchemySuccess || 0;
		let baseSuccessRate;
		if (actionType === "coinify") baseSuccessRate = .7;
		else if (actionType === "decompose") baseSuccessRate = .6;
		else baseSuccessRate = itemDetails.alchemyDetail?.transmuteSuccessRate || 0;
		const levelPenalty = actionType === "transmute" && playerLevel < itemLevel ? .9 / itemLevel * (playerLevel - itemLevel) : 0;
		const successRate = Math.max(0, Math.min(1, baseSuccessRate * (1 + levelPenalty) * (1 + teaBonusOverride)));
		const xpData = (0, src_utils_experience_parser_js.calculateExperienceMultiplier)("/skills/alchemy", "/action_types/alchemy");
		const currentTeaWisdom = xpData.breakdown?.consumableWisdom || 0;
		const totalWisdomWithOurTea = xpData.totalWisdom - currentTeaWisdom + buffs.wisdom;
		const charmExperience = xpData.charmExperience || 0;
		const wisdomMultiplier = 1 + totalWisdomWithOurTea / 100 + charmExperience / 100;
		const fullXP = baseXP * wisdomMultiplier;
		const xpPerAction = successRate * fullXP + (1 - successRate) * fullXP * .1;
		const requiredLevel = itemLevel;
		const { equipment, itemDetailMap } = calcContext;
		const teaSkillLevelBonus = buffs.skillLevels["alchemy"] || 0;
		const equipmentSpeedBonus = (0, src_utils_equipment_parser_js.parseEquipmentSpeedBonuses)(equipment, actionDetails.type, itemDetailMap) || 0;
		const equipmentEfficiencyBonus = (0, src_utils_equipment_parser_js.parseEquipmentEfficiencyBonuses)(equipment, actionDetails.type, itemDetailMap) || 0;
		const efficiencyData = (0, src_utils_efficiency_js.calculateEfficiencyBreakdown)({
			requiredLevel,
			skillLevel: playerLevel,
			teaSkillLevelBonus,
			actionLevelBonus: buffs.actionLevel,
			houseEfficiency: otherEfficiency.house || 0,
			equipmentEfficiency: equipmentEfficiencyBonus,
			teaEfficiency: buffs.efficiency,
			communityEfficiency: otherEfficiency.community || 0,
			achievementEfficiency: otherEfficiency.achievement || 0
		});
		const efficiencyMultiplier = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(efficiencyData.totalEfficiency);
		const actionTime = (actionDetails.baseTimeCost || 2e10) / 1e9 / (1 + equipmentSpeedBonus);
		const baseActionsPerHour = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime);
		return (0, src_utils_profit_helpers_js.calculateEffectiveActionsPerHour)(baseActionsPerHour, efficiencyMultiplier) * xpPerAction;
	}
	/**
	* Find processing conversion for an item
	* @param {string} itemHrid - Item HRID
	* @param {Object} gameData - Game data
	* @returns {Object|null} Conversion data or null
	*/
	function findProcessingConversion(itemHrid, gameData) {
		const validProcessingTypes = [
			"/action_types/cheesesmithing",
			"/action_types/crafting",
			"/action_types/tailoring"
		];
		for (const [_actionHrid, action] of Object.entries(gameData.actionDetailMap)) {
			if (!validProcessingTypes.includes(action.type)) continue;
			const inputItem = action.inputItems?.[0];
			const outputItem = action.outputItems?.[0];
			if (inputItem?.itemHrid === itemHrid && outputItem) return {
				outputItemHrid: outputItem.itemHrid,
				conversionRatio: inputItem.count
			};
		}
		return null;
	}
	/**
	* Get all actions for a skill that the player can do
	* @param {string} skillName - Skill name
	* @param {number} playerLevel - Player's skill level
	* @returns {Array<Object>} Array of action details
	*/
	/**
	* Get all actions for a skill, separating available from excluded
	* @param {string} skillName - Skill name
	* @param {number} playerLevel - Player's skill level
	* @returns {Object} { available: [], excluded: [] } with exclusion reasons
	*/
	function getActionsForSkill(skillName, playerLevel, selectedActionHrids = null) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.actionDetailMap) return {
			available: [],
			excluded: []
		};
		const actionType = SKILL_TO_ACTION_TYPE[skillName.toLowerCase()];
		if (!actionType) return {
			available: [],
			excluded: []
		};
		const available = [];
		const excluded = [];
		for (const [hrid, action] of Object.entries(gameData.actionDetailMap)) {
			if (action.type !== actionType) continue;
			if (selectedActionHrids && !selectedActionHrids.has(hrid)) continue;
			const requiredLevel = action.levelRequirement?.level || 1;
			if (playerLevel >= requiredLevel) available.push(action);
			else excluded.push({
				action,
				reason: "level",
				requiredLevel
			});
		}
		return {
			available,
			excluded
		};
	}
	/**
	* Get all actions for a skill for display purposes, including level-locked ones.
	* @param {string} skillName
	* @param {number} playerLevel
	* @returns {Array<{ hrid, name, requiredLevel, available }>} Sorted by level requirement
	*/
	function getSkillActionsForDisplay(skillName, playerLevel) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.actionDetailMap) return [];
		const actionType = SKILL_TO_ACTION_TYPE[skillName.toLowerCase()];
		if (!actionType) return [];
		const result = [];
		for (const [hrid, action] of Object.entries(gameData.actionDetailMap)) {
			if (action.type !== actionType) continue;
			const requiredLevel = action.levelRequirement?.level || 1;
			result.push({
				hrid,
				name: action.name,
				requiredLevel,
				available: playerLevel >= requiredLevel
			});
		}
		return result.sort((a, b) => a.requiredLevel - b.requiredLevel || a.name.localeCompare(b.name));
	}
	/**
	* Calculate tea consumption cost per hour for a tea combination
	* Uses the same pricing logic as the tile calculation
	* @param {Array<string>} teaHrids - Array of tea item HRIDs
	* @param {number} drinkConcentration - Drink concentration as decimal
	* @returns {{ total: number, breakdown: Array<{hrid: string, name: string, unitsPerHour: number, unitPrice: number, costPerHour: number}> }}
	*/
	function calculateTeaCostPerHour(teaHrids, drinkConcentration) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		const drinksPerHour = (0, src_utils_profit_helpers_js.calculateDrinksPerHour)(drinkConcentration);
		const breakdown = [];
		let total = 0;
		for (const teaHrid of teaHrids) {
			const unitPrice = (0, src_utils_market_data_js.getItemPrice)(teaHrid, {
				context: "profit",
				side: "buy"
			}) || 0;
			const costPerHour = unitPrice * drinksPerHour;
			const name = gameData?.itemDetailMap?.[teaHrid]?.name || teaHrid;
			breakdown.push({
				hrid: teaHrid,
				name,
				unitsPerHour: drinksPerHour,
				unitPrice,
				costPerHour
			});
			total += costPerHour;
		}
		return {
			total,
			breakdown
		};
	}
	/**
	* Get other efficiency sources (non-tea)
	* @param {string} actionType - Action type HRID
	* @returns {Object} Other efficiency values
	*/
	function getOtherEfficiencySources(actionType) {
		src_core_data_manager_js.default.getEquipment();
		const houseRoomsMap = src_core_data_manager_js.default.getHouseRooms();
		const houseRooms = houseRoomsMap ? Array.from(houseRoomsMap.values()) : [];
		const gameData = src_core_data_manager_js.default.getInitClientData();
		const result = {
			house: 0,
			equipment: 0,
			community: 0,
			achievement: 0,
			wisdom: 0,
			gathering: 0
		};
		if (!gameData) return result;
		if (houseRooms) {
			for (const room of houseRooms) if ((gameData.houseRoomDetailMap?.[room.houseRoomHrid])?.usableInActionTypeMap?.[actionType]) result.house += (room.level || 0) * 1.5;
		}
		const communityBuffType = PRODUCTION_SKILLS.some((skill) => actionType.includes(skill)) ? "/community_buff_types/production_efficiency" : "/community_buff_types/efficiency";
		const communityEffLevel = src_core_data_manager_js.default.getCommunityBuffLevel(communityBuffType);
		if (communityEffLevel) {
			const buffDef = gameData.communityBuffTypeDetailMap?.[communityBuffType];
			if (buffDef?.usableInActionTypeMap?.[actionType] && buffDef?.buff) result.community = (buffDef.buff.flatBoost || 0) * 100 + (communityEffLevel - 1) * (buffDef.buff.flatBoostLevelBonus || 0) * 100;
			else result.community = 0;
		}
		const communityGatheringLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/gathering_quantity");
		if (communityGatheringLevel) result.gathering = .2 + (communityGatheringLevel - 1) * .005;
		const achievementGathering = src_core_data_manager_js.default.getAchievementBuffFlatBoost(actionType, "/buff_types/gathering");
		result.gathering += achievementGathering;
		const communityWisdomLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/experience");
		if (communityWisdomLevel) result.wisdom = 20 + (communityWisdomLevel - 1) * .5;
		result.achievement = src_core_data_manager_js.default.getAchievementBuffFlatBoost(actionType, "/buff_types/efficiency") * 100;
		return result;
	}
	/**
	* Find optimal tea combination for a skill and goal
	* @param {string} skillName - Skill name (e.g., 'Milking')
	* @param {string} goal - 'xp' or 'gold'
	* @param {string|null} locationName - Optional location name to filter actions (e.g., "Silly Cow Valley")
	* @param {string|null} actionNameFilter - Optional action name to restrict optimization to a single action
	* @returns {Object} Optimization result
	*/
	function findOptimalTeas(skillName, goal, locationName = null, actionNameFilter = null, constraints = null, alchemyContext = null, equipmentOverride = null, selectedActionHrids = null) {
		const normalizedSkill = skillName.toLowerCase();
		const isGathering = GATHERING_SKILLS$1.includes(normalizedSkill);
		const isProduction = PRODUCTION_SKILLS.includes(normalizedSkill);
		if (!isGathering && !isProduction) return { error: `Unknown skill: ${skillName}` };
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.itemDetailMap) return { error: "Game data not loaded" };
		const skills = src_core_data_manager_js.default.getSkills();
		const skillHrid = `/skills/${normalizedSkill}`;
		let playerLevel = 1;
		for (const skill of skills || []) if (skill.skillHrid === skillHrid) {
			playerLevel = skill.level;
			break;
		}
		const equipment = equipmentOverride ?? src_core_data_manager_js.default.getEquipment();
		const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, gameData.itemDetailMap);
		const combinations = generateCombinations(getRelevantTeas(normalizedSkill, goal), constraints);
		const actionData = getActionsForSkill(normalizedSkill, playerLevel, selectedActionHrids);
		let actions = actionData.available;
		let excludedActions = actionData.excluded;
		if (locationName && gameData.actionCategoryDetailMap) {
			let targetCategoryHrid = null;
			const skillPrefix = `/action_categories/${normalizedSkill}/`;
			for (const [categoryHrid, categoryDetail] of Object.entries(gameData.actionCategoryDetailMap)) if (categoryDetail.name === locationName && categoryHrid.startsWith(skillPrefix)) {
				targetCategoryHrid = categoryHrid;
				break;
			}
			if (targetCategoryHrid) {
				actions = actions.filter((action) => action.category === targetCategoryHrid);
				excludedActions = excludedActions.filter((item) => item.action.category === targetCategoryHrid);
			}
		}
		if (actionNameFilter) {
			actions = actions.filter((a) => a.name === actionNameFilter);
			excludedActions = excludedActions.filter((item) => item.action.name === actionNameFilter);
		}
		if (actions.length === 0) {
			const locationSuffix = locationName ? ` at ${locationName}` : "";
			if (excludedActions.length > 0) {
				const lowestLevel = Math.min(...excludedActions.map((item) => item.requiredLevel));
				return { error: `No actions available for ${skillName}${locationSuffix} at level ${playerLevel}. All actions require level ${lowestLevel}+.` };
			} else return { error: `No actions available for ${skillName}${locationSuffix} at level ${playerLevel}` };
		}
		const actionType = SKILL_TO_ACTION_TYPE[normalizedSkill];
		const otherEfficiency = getOtherEfficiencySources(actionType);
		const results = [];
		const calcContext = {
			equipment,
			itemDetailMap: gameData.itemDetailMap
		};
		for (const combo of combinations) {
			const buffs = parseTeaBuffs(combo, gameData.itemDetailMap, drinkConcentration);
			const teaCostPerHour = calculateTeaCostPerHour(combo, drinkConcentration);
			let totalScore = 0;
			let profitableCount = 0;
			const actionScores = [];
			if (alchemyContext) {
				const actionName = `${alchemyContext.actionType}: ${alchemyContext.itemName || alchemyContext.itemHrid}`;
				let score;
				if (goal === "xp") {
					score = calculateAlchemyXpPerHour(alchemyContext, buffs, playerLevel, otherEfficiency, calcContext);
					totalScore += score;
				} else {
					score = calculateAlchemyGoldPerHour(alchemyContext, buffs) - teaCostPerHour.total;
					if (score > 0) {
						totalScore += score;
						profitableCount++;
					}
				}
				actionScores.push({
					action: actionName,
					score
				});
			} else for (const action of actions) {
				let score;
				if (goal === "xp") {
					score = calculateXpPerHour(action, buffs, playerLevel, otherEfficiency, calcContext);
					totalScore += score;
				} else if (isGathering) {
					score = calculateGatheringGoldPerHour(action, buffs, playerLevel, otherEfficiency, gameData, calcContext);
					score -= teaCostPerHour.total;
					if (score > 0) {
						totalScore += score;
						profitableCount++;
					}
				} else {
					score = calculateProductionGoldPerHour(action, buffs, playerLevel, otherEfficiency, gameData, calcContext);
					score -= teaCostPerHour.total;
					if (score > 0) {
						totalScore += score;
						profitableCount++;
					}
				}
				actionScores.push({
					action: action.name,
					score
				});
			}
			const avgDivisor = goal === "gold" ? profitableCount || 1 : alchemyContext ? 1 : actions.length;
			results.push({
				teas: combo,
				totalScore,
				avgScore: totalScore / avgDivisor,
				actionScores,
				buffs,
				teaCostPerHour,
				profitableCount
			});
		}
		results.sort((a, b) => b.totalScore - a.totalScore);
		const getTeaName = (hrid) => gameData.itemDetailMap[hrid]?.name || hrid;
		const excludedForDisplay = excludedActions.map((item) => ({
			action: item.action.name,
			reason: item.reason,
			requiredLevel: item.requiredLevel
		})).sort((a, b) => a.requiredLevel - b.requiredLevel);
		if (results.length === 0 || !results[0]) return {
			optimal: null,
			isConsistent: false,
			skill: skillName,
			goal,
			playerLevel,
			drinkConcentration,
			otherEfficiency,
			actionsEvaluated: 0,
			profitableActionsCount: 0,
			combinationsEvaluated: combinations.length,
			allResults: [],
			excludedActions: excludedForDisplay,
			teaCostPerHour: {
				total: 0,
				breakdown: []
			}
		};
		const topResult = results[0];
		const isConsistent = topResult.actionScores.every((as, _i, _arr) => {
			return as.score > 0;
		});
		return {
			optimal: {
				teas: topResult.teas.map((hrid) => ({
					hrid,
					name: getTeaName(hrid)
				})),
				totalScore: topResult.totalScore,
				avgScore: topResult.avgScore,
				actionScores: topResult.actionScores,
				buffs: topResult.buffs,
				profitableCount: topResult.profitableCount
			},
			isConsistent,
			skill: skillName,
			goal,
			playerLevel,
			drinkConcentration,
			otherEfficiency,
			actionsEvaluated: alchemyContext ? 1 : actions.length,
			profitableActionsCount: topResult.profitableCount,
			combinationsEvaluated: combinations.length,
			allResults: results.slice(0, 5).map((r) => ({
				teas: r.teas.map(getTeaName),
				avgScore: r.avgScore,
				teaCostPerHour: r.teaCostPerHour
			})),
			excludedActions: excludedForDisplay,
			teaCostPerHour: topResult.teaCostPerHour
		};
	}
	/**
	* Find the highest-level item at or below the player's alchemy level for use as a scoring reference.
	* Falls back to the lowest available alchemy item if none are at/below the player's level.
	* @param {number} playerLevel
	* @param {Object} itemDetailMap
	* @returns {string|null}
	*/
	function getRepresentativeAlchemyItemHrid(playerLevel, itemDetailMap) {
		let bestHrid = null;
		let bestLevel = 0;
		let fallbackHrid = null;
		let fallbackLevel = Infinity;
		for (const [hrid, detail] of Object.entries(itemDetailMap)) {
			if (!detail.alchemyDetail || !detail.itemLevel) continue;
			if (detail.itemLevel <= playerLevel) {
				if (detail.itemLevel > bestLevel) {
					bestLevel = detail.itemLevel;
					bestHrid = hrid;
				}
			} else if (detail.itemLevel < fallbackLevel) {
				fallbackLevel = detail.itemLevel;
				fallbackHrid = hrid;
			}
		}
		return bestHrid ?? fallbackHrid;
	}
	/**
	* Score a hypothetical equipment setup for a skill and goal with zero tea buffs.
	* Used by the skilling optimizer to rank equipment candidates per slot independently of teas.
	* @param {string} skillName
	* @param {string} goal - 'xp' or 'gold'
	* @param {Map} equipment - Map<itemLocationHrid, { itemHrid, enhancementLevel }>
	* @param {number} playerLevel
	* @returns {number} Average XP/hr or Gold/hr across available actions
	*/
	function scoreEquipmentSetup(skillName, goal, equipment, playerLevel, selectedActionHrids = null) {
		const normalizedSkill = skillName.toLowerCase();
		const isGathering = GATHERING_SKILLS$1.includes(normalizedSkill);
		const isProduction = PRODUCTION_SKILLS.includes(normalizedSkill);
		if (!isGathering && !isProduction) return 0;
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.itemDetailMap) return 0;
		const actionType = SKILL_TO_ACTION_TYPE[normalizedSkill];
		if (!actionType) return 0;
		const otherEfficiency = getOtherEfficiencySources(actionType);
		if (isGathering) {
			const equipGathering = (0, src_utils_equipment_parser_js.parseGatheringQuantityBonus)(equipment, gameData.itemDetailMap);
			if (equipGathering > 0) otherEfficiency.gathering = (otherEfficiency.gathering || 0) + equipGathering;
		}
		const { available: actions } = getActionsForSkill(normalizedSkill, playerLevel, selectedActionHrids);
		if (!actions.length) return 0;
		const emptyBuffs = {
			efficiency: 0,
			wisdom: 0,
			gathering: 0,
			processing: 0,
			artisan: 0,
			gourmet: 0,
			actionLevel: 0,
			alchemySuccess: 0,
			skillLevels: {}
		};
		const calcContext = {
			equipment,
			itemDetailMap: gameData.itemDetailMap
		};
		if (normalizedSkill === "alchemy") {
			const repItemHrid = getRepresentativeAlchemyItemHrid(playerLevel, gameData.itemDetailMap);
			if (!repItemHrid) return 0;
			return calculateAlchemyXpPerHour({
				actionType: "decompose",
				itemHrid: repItemHrid
			}, emptyBuffs, playerLevel, otherEfficiency, calcContext);
		}
		let totalScore = 0;
		let count = 0;
		for (const action of actions) {
			let score;
			if (goal === "xp") {
				score = calculateXpPerHour(action, emptyBuffs, playerLevel, otherEfficiency, calcContext);
				totalScore += score;
				count++;
			} else if (isGathering) {
				score = calculateGatheringGoldPerHour(action, emptyBuffs, playerLevel, otherEfficiency, gameData, calcContext);
				if (score > 0) {
					totalScore += score;
					count++;
				}
			} else {
				score = calculateProductionGoldPerHour(action, emptyBuffs, playerLevel, otherEfficiency, gameData, calcContext);
				if (score > 0) {
					totalScore += score;
					count++;
				}
			}
		}
		return count > 0 ? totalScore / count : 0;
	}
	/**
	* Get buff description for a tea
	* @param {string} teaHrid - Tea item HRID
	* @returns {string} Human-readable buff description
	*/
	function getTeaBuffDescription(teaHrid, drinkConcentration = 0) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.itemDetailMap) return "";
		const itemDetails = gameData.itemDetailMap[teaHrid];
		if (!itemDetails?.consumableDetail?.buffs) return "";
		const dcMultiplier = 1 + drinkConcentration;
		const descriptions = [];
		for (const buff of itemDetails.consumableDetail.buffs) {
			const baseValue = buff.flatBoost || 0;
			const scaledValue = baseValue * dcMultiplier;
			const dcBonus = baseValue * drinkConcentration;
			switch (buff.typeHrid) {
				case "/buff_types/efficiency":
					descriptions.push(formatBuffWithDC(scaledValue * 100, dcBonus * 100, "% eff", true));
					break;
				case "/buff_types/wisdom":
					descriptions.push(formatBuffWithDC(scaledValue * 100, dcBonus * 100, "% XP", true));
					break;
				case "/buff_types/gathering":
					descriptions.push(formatBuffWithDC(scaledValue * 100, dcBonus * 100, "% gathering", true));
					break;
				case "/buff_types/processing":
					descriptions.push(formatBuffWithDC(scaledValue * 100, dcBonus * 100, "% processing", true));
					break;
				case "/buff_types/artisan":
					descriptions.push(formatBuffWithDC(scaledValue * 100, dcBonus * 100, "% mat savings", true));
					break;
				case "/buff_types/gourmet":
					descriptions.push(formatBuffWithDC(scaledValue * 100, dcBonus * 100, "% extra output", true));
					break;
				case "/buff_types/action_level":
					descriptions.push(formatBuffWithDC(scaledValue, dcBonus, " action lvl", false));
					break;
				default: if (buff.typeHrid.endsWith("_level")) {
					const skill = buff.typeHrid.match(/\/buff_types\/(\w+)_level/)?.[1];
					if (skill) descriptions.push(formatBuffWithDC(scaledValue, dcBonus, ` ${skill}`, false));
				}
			}
		}
		return descriptions.join(", ");
	}
	/**
	* Format a buff value with optional drink concentration bonus
	* @param {number} scaledValue - Total value including DC
	* @param {number} dcBonus - Just the DC bonus portion
	* @param {string} suffix - Unit suffix (e.g., '% eff', ' tailoring')
	* @param {boolean} isPercent - Whether to format as percentage
	* @returns {string} Formatted string like "+8.8 tailoring (+.8)"
	*/
	function formatBuffWithDC(scaledValue, dcBonus, suffix, isPercent) {
		const mainFormatted = isPercent ? `+${Number.isInteger(scaledValue) ? scaledValue : scaledValue.toFixed(1)}${suffix}` : `+${Number.isInteger(scaledValue) ? scaledValue : scaledValue.toFixed(1)}${suffix}`;
		if (dcBonus === 0) return mainFormatted;
		return `${mainFormatted} ${isPercent ? `(+${dcBonus < 1 ? dcBonus.toFixed(1) : dcBonus.toFixed(0)}%)` : `(+${dcBonus < 1 ? dcBonus.toFixed(1) : dcBonus.toFixed(0)})`}`;
	}
	/**
	* Calculate XP/hr and Gold/hr for a specific equipment and tea setup.
	* Unlike scoreEquipmentSetup (which uses empty teas for equipment comparison),
	* this evaluates a real configured setup and returns both metrics.
	* @param {string} skillName
	* @param {Map} equipment - Map<itemLocationHrid, { itemHrid, enhancementLevel }>
	* @param {string[]} teaHrids - Tea item HRIDs (null/empty entries are filtered)
	* @param {number} playerLevel
	* @param {Set<string>|null} selectedActionHrids
	* @returns {{ xpPerHour: number, goldPerHour: number, teaCostPerHour: number }}
	*/
	function calculateSkillPerformance(skillName, equipment, teaHrids, playerLevel, selectedActionHrids = null) {
		const normalizedSkill = skillName.toLowerCase();
		const isGathering = GATHERING_SKILLS$1.includes(normalizedSkill);
		const isProduction = PRODUCTION_SKILLS.includes(normalizedSkill);
		const empty = {
			xpPerHour: 0,
			goldPerHour: 0,
			teaCostPerHour: 0
		};
		if (!isGathering && !isProduction) return empty;
		if (selectedActionHrids !== null && selectedActionHrids.size === 0) return empty;
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.itemDetailMap) return empty;
		const actionType = SKILL_TO_ACTION_TYPE[normalizedSkill];
		if (!actionType) return empty;
		const { available: actions } = getActionsForSkill(normalizedSkill, playerLevel, selectedActionHrids);
		if (!actions.length) return empty;
		const filteredTeas = (teaHrids || []).filter(Boolean);
		const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, gameData.itemDetailMap);
		const buffs = parseTeaBuffs(filteredTeas, gameData.itemDetailMap, drinkConcentration);
		const otherEfficiency = getOtherEfficiencySources(actionType);
		if (isGathering) {
			const equipGathering = (0, src_utils_equipment_parser_js.parseGatheringQuantityBonus)(equipment, gameData.itemDetailMap);
			if (equipGathering > 0) otherEfficiency.gathering = (otherEfficiency.gathering || 0) + equipGathering;
		}
		const teaCost = calculateTeaCostPerHour(filteredTeas, drinkConcentration);
		const calcContext = {
			equipment,
			itemDetailMap: gameData.itemDetailMap
		};
		let totalXp = 0, xpCount = 0;
		let totalGold = 0, goldCount = 0;
		for (const action of actions) {
			const xp = calculateXpPerHour(action, buffs, playerLevel, otherEfficiency, calcContext);
			if (xp > 0) {
				totalXp += xp;
				xpCount++;
			}
			const gold = isGathering ? calculateGatheringGoldPerHour(action, buffs, playerLevel, otherEfficiency, gameData, calcContext) - teaCost.total : calculateProductionGoldPerHour(action, buffs, playerLevel, otherEfficiency, gameData, calcContext) - teaCost.total;
			if (gold > 0) {
				totalGold += gold;
				goldCount++;
			}
		}
		return {
			xpPerHour: xpCount > 0 ? totalXp / xpCount : 0,
			goldPerHour: goldCount > 0 ? totalGold / goldCount : 0,
			teaCostPerHour: teaCost.total
		};
	}
	//#endregion
	//#region src/features/actions/tea-recommendation.js
	/**
	* Tea Recommendation UI
	* Adds XP and Gold buttons to skill pages that show optimal tea combinations
	*/
	/**
	* Get the currently selected location tab name
	* @returns {string|null} Location name or null if no location tabs exist
	*/
	function getCurrentLocationTab() {
		const skillPanel = document.querySelector("[class*=\"GatheringProductionSkillPanel_\"]");
		if (!skillPanel) return null;
		const tabButtons = skillPanel.querySelectorAll("button[role=\"tab\"]");
		for (const button of tabButtons) if (button.getAttribute("aria-selected") === "true") {
			const tablist = button.closest("[role=\"tablist\"]");
			const allButtons = Array.from(tablist?.querySelectorAll("button[role=\"tab\"]") || []);
			const tabIndex = allButtons.indexOf(button);
			if (tabIndex >= 0 && allButtons.length - tabIndex > 1) return button.textContent?.trim() || null;
		}
		return null;
	}
	/**
	* Build alchemy context for tea optimization when on the alchemy page.
	* Detects action type from DOM tabs or active action, extracts current item.
	* @returns {Promise<Object|null>} { actionType, itemHrid, enhancementLevel, itemName } or null
	*/
	async function getAlchemyContext() {
		let actionType = null;
		const tabText = (document.querySelector("[class*=\"AlchemyPanel_tabsComponentContainer\"]")?.querySelector("[role=\"tab\"][aria-selected=\"true\"]"))?.textContent?.trim()?.toLowerCase() || "";
		if (tabText.includes("coinify")) actionType = "coinify";
		else if (tabText.includes("transmute")) actionType = "transmute";
		else if (tabText.includes("decompose")) actionType = "decompose";
		if (!actionType) {
			const actionHrid = alchemyProfit.getCurrentActionHrid();
			if (actionHrid) {
				if (actionHrid === "/actions/alchemy/coinify") actionType = "coinify";
				else if (actionHrid === "/actions/alchemy/transmute") actionType = "transmute";
				else if (actionHrid === "/actions/alchemy/decompose") actionType = "decompose";
			}
		}
		if (!actionType) return null;
		const requirements = await alchemyProfit.extractRequirements();
		if (!requirements || requirements.length === 0) return null;
		const itemHrid = requirements[0].itemHrid;
		if (!itemHrid) return null;
		const enhancementLevel = requirements[0].enhancementLevel || 0;
		const itemName = itemNameTranslator.getDisplayName(itemHrid);
		return {
			actionType,
			itemHrid,
			enhancementLevel,
			itemName
		};
	}
	var TeaRecommendation = class {
		constructor() {
			this.initialized = false;
			this.unregisterHandlers = [];
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.currentPopup = null;
			this.buttonContainer = null;
			this.closeHandlerCleanup = null;
			this.dragCleanup = null;
			this.pinnedTeas = /* @__PURE__ */ new Set();
			this.bannedTeas = /* @__PURE__ */ new Set();
		}
		/**
		* Initialize tea recommendation feature
		*/
		async initialize() {
			if (this.initialized) return;
			this.initialized = true;
			await actionFilter.initialize();
			const unregisterLabelObserver = src_core_dom_observer_js.default.onClass("TeaRecommendation-Label", "GatheringProductionSkillPanel_label", (labelElement) => {
				this.checkAndInjectButtons(labelElement);
			}, {
				debounce: true,
				debounceDelay: 150
			});
			const unregisterAlchemyLabelObserver = src_core_dom_observer_js.default.onClass("TeaRecommendation-AlchemyLabel", "AlchemyPanel_label", (labelElement) => {
				this.checkAndInjectButtons(labelElement);
			}, {
				debounce: true,
				debounceDelay: 150
			});
			this.unregisterHandlers.push(unregisterLabelObserver);
			this.unregisterHandlers.push(unregisterAlchemyLabelObserver);
			document.querySelectorAll("[class*=\"GatheringProductionSkillPanel_label\"], [class*=\"AlchemyPanel_label\"]").forEach((label) => {
				this.checkAndInjectButtons(label);
			});
		}
		/**
		* Check if label is "Consumables" and inject buttons
		* @param {HTMLElement} labelElement - The label element
		*/
		checkAndInjectButtons(labelElement) {
			if (!labelElement.matches("[class*=\"GatheringProductionSkillPanel_label\"], [class*=\"AlchemyPanel_label\"]")) return;
			if (labelElement.querySelector(".mwi-tea-recommendation-buttons")) return;
			const buttonContainer = document.createElement("div");
			buttonContainer.className = "mwi-tea-recommendation-buttons";
			buttonContainer.style.cssText = `
            display: inline-flex;
            gap: 6px;
            margin-left: 12px;
            vertical-align: middle;
        `;
			const xpButton = this.createButton((0, src_core_i18n_js.t)("XP"), "xp", src_core_config_js.default.COLOR_INFO);
			const goldButton = this.createButton((0, src_core_i18n_js.t)("Gold"), "gold", src_core_config_js.default.COLOR_PROFIT);
			const bothButton = this.createButton((0, src_core_i18n_js.t)("Both"), "both", src_core_config_js.default.COLOR_ACCENT);
			buttonContainer.appendChild(xpButton);
			buttonContainer.appendChild(goldButton);
			buttonContainer.appendChild(bothButton);
			labelElement.style.display = "inline-flex";
			labelElement.style.alignItems = "center";
			labelElement.style.gap = "8px";
			labelElement.appendChild(buttonContainer);
			this.buttonContainer = buttonContainer;
		}
		/**
		* Create an optimization button
		* @param {string} label - Button label
		* @param {string} goal - 'xp' or 'gold'
		* @param {string} color - Button color
		* @returns {HTMLElement} Button element
		*/
		createButton(label, goal, color) {
			const button = document.createElement("button");
			button.className = `mwi-tea-recommend-${goal}`;
			button.textContent = label;
			button.style.cssText = `
            background: transparent;
            color: ${color};
            border: 1px solid ${color};
            border-radius: 4px;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        `;
			button.addEventListener("mouseenter", () => {
				button.style.background = color;
				button.style.color = "#000";
			});
			button.addEventListener("mouseleave", () => {
				button.style.background = "transparent";
				button.style.color = color;
			});
			button.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.showRecommendation(goal, button);
			});
			return button;
		}
		/**
		* Show tea recommendation popup
		* @param {string} goal - 'xp', 'gold', or 'both'
		* @param {HTMLElement} anchorButton - Button that was clicked
		*/
		async showRecommendation(goal, anchorButton) {
			this.closePopup();
			const isAlchemy = !!anchorButton.closest("[class*=\"AlchemyPanel_\"]");
			const skillName = isAlchemy ? "Alchemy" : actionFilter.getCurrentSkillName();
			if (!skillName) {
				this.showError(anchorButton, (0, src_core_i18n_js.t)("Could not detect current skill"));
				return;
			}
			const locationTab = getCurrentLocationTab();
			let alchemyContext = null;
			if (isAlchemy) {
				alchemyContext = await getAlchemyContext();
				if (!alchemyContext) {
					this.showError(anchorButton, (0, src_core_i18n_js.t)("No item selected in alchemy panel"));
					return;
				}
			}
			if (goal === "both") {
				this.showBothRecommendation(anchorButton, skillName, locationTab, alchemyContext);
				return;
			}
			const result = findOptimalTeas(skillName, goal, locationTab, null, null, alchemyContext);
			if (result.error) {
				this.showError(anchorButton, result.error);
				return;
			}
			const popup = document.createElement("div");
			popup.className = "mwi-tea-recommendation-popup";
			popup.style.cssText = `
            position: absolute;
            z-index: 10000;
            background: #1a1a1a;
            border: 1px solid ${src_core_config_js.default.COLOR_BORDER};
            border-radius: 8px;
            padding: 16px;
            min-width: 280px;
            max-width: 350px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            cursor: default;
        `;
			this.buildPopupContent(popup, result, goal, skillName, locationTab, null, alchemyContext);
			document.body.appendChild(popup);
			const buttonRect = anchorButton.getBoundingClientRect();
			const popupRect = popup.getBoundingClientRect();
			let top = buttonRect.bottom + 8;
			let left = buttonRect.left;
			if (left + popupRect.width > window.innerWidth - 16) left = window.innerWidth - popupRect.width - 16;
			if (top + popupRect.height > window.innerHeight - 16) top = buttonRect.top - popupRect.height - 8;
			popup.style.top = `${top}px`;
			popup.style.left = `${left}px`;
			this.currentPopup = popup;
			const closeHandler = (e) => {
				if (!popup.contains(e.target) && e.target !== anchorButton && e.target.isConnected) {
					this.closePopup();
					document.removeEventListener("click", closeHandler);
				}
			};
			setTimeout(() => {
				document.addEventListener("click", closeHandler);
				this.closeHandlerCleanup = () => document.removeEventListener("click", closeHandler);
			}, 100);
		}
		/**
		* Build (or rebuild) popup inner content in place
		* Called on initial open and again when drilling into a specific action or returning to all-actions view.
		* @param {HTMLElement} popup - Popup container (preserved across re-renders)
		* @param {Object} result - findOptimalTeas result
		* @param {string} goal - 'xp' or 'gold'
		* @param {string} skillName - Current skill name
		* @param {string|null} locationTab - Current location tab
		* @param {string|null} drilldownAction - Action name when showing single-action view, null for all-actions
		* @param {Object|null} alchemyContext - Alchemy context for alchemy skills
		*/
		buildPopupContent(popup, result, goal, skillName, locationTab, drilldownAction, alchemyContext = null) {
			popup.innerHTML = "";
			const goalLabel = goal === "xp" ? "XP" : "Gold";
			const header = document.createElement("div");
			header.style.cssText = `
            font-size: 14px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid ${src_core_config_js.default.COLOR_BORDER};
            cursor: grab;
            user-select: none;
        `;
			header.title = (0, src_core_i18n_js.t)("Drag to move");
			if (drilldownAction) header.textContent = (0, src_core_i18n_js.t)("Optimal {0}/hr for {1}", goalLabel, drilldownAction);
			else if (alchemyContext) {
				const dcPercent = result.drinkConcentration ? (result.drinkConcentration * 100).toFixed(2) : 0;
				const dcSuffix = dcPercent > 0 ? ` (${dcPercent}% DC)` : "";
				header.textContent = (0, src_core_i18n_js.t)("Optimal {0}/hr for {1}: {2}", goalLabel, alchemyContext.actionType, alchemyContext.itemName + dcSuffix);
			} else {
				const displayName = locationTab || skillName;
				const dcPercent = result.drinkConcentration ? (result.drinkConcentration * 100).toFixed(2) : 0;
				const dcSuffix = dcPercent > 0 ? ` (${dcPercent}% DC)` : "";
				header.textContent = (0, src_core_i18n_js.t)("Optimal {0}/hr for {1}", goalLabel, displayName + dcSuffix);
			}
			popup.appendChild(header);
			this.dragCleanup = this.makeDraggable(popup, header);
			if (!result.optimal) {
				const noResult = document.createElement("div");
				noResult.style.cssText = `
                color: ${src_core_config_js.default.COLOR_WARNING};
                font-size: 12px;
                margin-bottom: 12px;
                padding: 8px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 4px;
            `;
				noResult.textContent = (0, src_core_i18n_js.t)("No valid combinations with current constraints.");
				popup.appendChild(noResult);
			} else {
				const teaList = document.createElement("div");
				teaList.style.cssText = "margin-bottom: 12px;";
				for (const tea of result.optimal.teas) {
					const teaRow = document.createElement("div");
					teaRow.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 6px 0;
            `;
					const teaName = document.createElement("span");
					teaName.style.cssText = `
                color: #fff;
                font-weight: 500;
            `;
					teaName.textContent = tea.name;
					const teaBuffs = document.createElement("span");
					teaBuffs.style.cssText = `
                color: rgba(255, 255, 255, 0.6);
                font-size: 11px;
            `;
					teaBuffs.innerHTML = getTeaBuffDescription(tea.hrid, result.drinkConcentration || 0).replace(/\(([^)]+)\)/g, "<span style=\"color: rgba(255, 255, 255, 0.4);\">($1)</span>");
					teaRow.appendChild(teaName);
					teaRow.appendChild(teaBuffs);
					teaList.appendChild(teaRow);
				}
				popup.appendChild(teaList);
			}
			const stats = document.createElement("div");
			stats.style.cssText = `
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            padding-top: 8px;
            border-top: 1px solid ${src_core_config_js.default.COLOR_BORDER};
        `;
			const avgValue = result.optimal ? (0, src_utils_formatters_js.formatKMB)(result.optimal.avgScore) : "0";
			const profitableCount = result.profitableActionsCount || result.actionsEvaluated;
			const excludedCount = result.excludedActions?.length || 0;
			stats.innerHTML = `
            <div style="margin-bottom: 4px;">
                <span style="color: ${goal === "xp" ? src_core_config_js.default.COLOR_INFO : src_core_config_js.default.COLOR_PROFIT};">
                    ${(0, src_core_i18n_js.t)("Avg {0}/hr: {1}", goalLabel, avgValue)}
                </span>
            </div>
            <div style="font-size: 11px;">
                ${(0, src_core_i18n_js.t)("Level")} ${result.playerLevel} •
            </div>
        `;
			if (drilldownAction) {
				const backLink = document.createElement("span");
				backLink.style.cssText = `
                cursor: pointer;
                text-decoration: underline;
                color: rgba(255, 255, 255, 0.5);
            `;
				backLink.textContent = (0, src_core_i18n_js.t)("← All {0} actions", skillName);
				backLink.addEventListener("click", () => {
					const allResult = findOptimalTeas(skillName, goal, locationTab, null, null, alchemyContext);
					if (!allResult.error && allResult.optimal) this.buildPopupContent(popup, allResult, goal, skillName, locationTab, null, alchemyContext);
				});
				stats.querySelector("div:last-child").appendChild(backLink);
			} else {
				let actionsText;
				if (alchemyContext) actionsText = `${alchemyContext.actionType}: ${alchemyContext.itemName}`;
				else if (goal === "gold") actionsText = excludedCount > 0 ? (0, src_core_i18n_js.t)("{0} profitable of {1} (+{2} excluded)", profitableCount, result.actionsEvaluated, excludedCount) : (0, src_core_i18n_js.t)("{0} profitable of {1}", profitableCount, result.actionsEvaluated);
				else actionsText = excludedCount > 0 ? (0, src_core_i18n_js.t)("{0} actions (+{1} excluded)", result.actionsEvaluated, excludedCount) : (0, src_core_i18n_js.t)("{0} actions evaluated", result.actionsEvaluated);
				const actionsToggle = document.createElement("span");
				actionsToggle.style.cssText = `
                cursor: pointer;
                text-decoration: underline;
                color: rgba(255, 255, 255, 0.5);
            `;
				actionsToggle.textContent = actionsText;
				actionsToggle.title = (0, src_core_i18n_js.t)("Click to expand");
				const actionsDetail = document.createElement("div");
				actionsDetail.style.cssText = `
                display: none;
                margin-top: 8px;
                padding: 8px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 4px;
                max-height: 150px;
                overflow-y: auto;
            `;
				const sortedActions = [...result.optimal?.actionScores || []].sort((a, b) => b.score - a.score);
				for (const actionData of sortedActions) {
					const actionRow = document.createElement("div");
					actionRow.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    font-size: 11px;
                    padding: 2px 4px;
                    border-radius: 3px;
                    cursor: pointer;
                `;
					const actionName = document.createElement("span");
					actionName.textContent = actionData.action;
					actionName.style.color = "rgba(255, 255, 255, 0.7)";
					const actionScore = document.createElement("span");
					actionScore.textContent = (0, src_utils_formatters_js.formatKMB)(actionData.score);
					actionScore.style.color = actionData.score >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
					actionRow.appendChild(actionName);
					actionRow.appendChild(actionScore);
					actionsDetail.appendChild(actionRow);
					actionRow.addEventListener("mouseenter", () => {
						actionRow.style.background = "rgba(255, 255, 255, 0.05)";
					});
					actionRow.addEventListener("mouseleave", () => {
						actionRow.style.background = "";
					});
					actionRow.addEventListener("click", () => {
						const drillResult = findOptimalTeas(skillName, goal, locationTab, actionData.action, null, alchemyContext);
						if (!drillResult.error && drillResult.optimal) this.buildPopupContent(popup, drillResult, goal, skillName, locationTab, actionData.action, alchemyContext);
					});
				}
				const excludedActions = result.excludedActions || [];
				if (excludedActions.length > 0) {
					if (sortedActions.length > 0) {
						const separator = document.createElement("div");
						separator.style.cssText = `
                        border-top: 1px solid rgba(255, 255, 255, 0.2);
                        margin: 6px 0;
                        font-size: 10px;
                        color: rgba(255, 255, 255, 0.4);
                        padding-top: 4px;
                    `;
						separator.textContent = (0, src_core_i18n_js.t)("Excluded ({0} - level too low)", excludedActions.length);
						actionsDetail.appendChild(separator);
					}
					for (const excluded of excludedActions) {
						const actionRow = document.createElement("div");
						actionRow.style.cssText = `
                        display: flex;
                        justify-content: space-between;
                        font-size: 11px;
                        padding: 2px 0;
                    `;
						const actionName = document.createElement("span");
						actionName.textContent = excluded.action;
						actionName.style.cssText = `
                        color: rgba(255, 255, 255, 0.35);
                        text-decoration: line-through;
                    `;
						const levelReq = document.createElement("span");
						levelReq.textContent = (0, src_core_i18n_js.t)("Lvl {0}", excluded.requiredLevel);
						levelReq.style.cssText = `
                        color: rgba(255, 255, 255, 0.35);
                        font-style: italic;
                    `;
						actionRow.appendChild(actionName);
						actionRow.appendChild(levelReq);
						actionsDetail.appendChild(actionRow);
					}
				}
				actionsToggle.addEventListener("click", () => {
					const isHidden = actionsDetail.style.display === "none";
					actionsDetail.style.display = isHidden ? "block" : "none";
					let expandedText;
					if (alchemyContext) expandedText = `▼ ${alchemyContext.actionType}: ${alchemyContext.itemName}`;
					else if (goal === "gold") expandedText = excludedCount > 0 ? (0, src_core_i18n_js.t)("▼ {0} profitable (+{1})", profitableCount, excludedCount) : (0, src_core_i18n_js.t)("▼ {0} profitable", profitableCount);
					else expandedText = excludedCount > 0 ? (0, src_core_i18n_js.t)("▼ {0} (+{1})", result.actionsEvaluated, excludedCount) : (0, src_core_i18n_js.t)("▼ {0} actions", result.actionsEvaluated);
					actionsToggle.textContent = isHidden ? expandedText : actionsText;
				});
				stats.querySelector("div:last-child").appendChild(actionsToggle);
				stats.appendChild(actionsDetail);
			}
			const costData = result.teaCostPerHour;
			if (costData?.total > 0) {
				const costSection = document.createElement("div");
				costSection.style.cssText = "margin-top: 6px; font-size: 11px;";
				const costToggle = document.createElement("span");
				costToggle.style.cssText = `
                cursor: pointer;
                text-decoration: underline;
                color: ${src_core_config_js.default.COLOR_GOLD};
            `;
				costToggle.textContent = (0, src_core_i18n_js.t)("Tea cost: {0}/hr ▶", (0, src_utils_formatters_js.formatKMB)(costData.total));
				costToggle.title = (0, src_core_i18n_js.t)("Click to expand");
				const costDetail = document.createElement("div");
				costDetail.style.cssText = `
                display: none;
                margin-top: 6px;
                padding: 8px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 4px;
            `;
				const headerRow = document.createElement("div");
				headerRow.style.cssText = `
                display: grid;
                grid-template-columns: 1fr auto auto auto;
                gap: 8px;
                font-size: 10px;
                color: rgba(255, 255, 255, 0.4);
                padding-bottom: 4px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                margin-bottom: 4px;
            `;
				[
					(0, src_core_i18n_js.t)("Tea"),
					(0, src_core_i18n_js.t)("Units/hr"),
					(0, src_core_i18n_js.t)("Unit cost"),
					(0, src_core_i18n_js.t)("Cost/hr")
				].forEach((label) => {
					const cell = document.createElement("span");
					cell.textContent = label;
					cell.style.textAlign = "right";
					if (label === "Tea") cell.style.textAlign = "left";
					headerRow.appendChild(cell);
				});
				costDetail.appendChild(headerRow);
				for (const tea of costData.breakdown) {
					const row = document.createElement("div");
					row.style.cssText = `
                    display: grid;
                    grid-template-columns: 1fr auto auto auto;
                    gap: 8px;
                    font-size: 11px;
                    padding: 2px 0;
                    color: rgba(255, 255, 255, 0.7);
                `;
					const cells = [
						{
							text: tea.name,
							align: "left"
						},
						{
							text: tea.unitsPerHour.toFixed(1),
							align: "right"
						},
						{
							text: (0, src_utils_formatters_js.formatKMB)(tea.unitPrice),
							align: "right"
						},
						{
							text: (0, src_utils_formatters_js.formatKMB)(tea.costPerHour),
							align: "right",
							color: src_core_config_js.default.COLOR_GOLD
						}
					];
					for (const { text, align, color } of cells) {
						const cell = document.createElement("span");
						cell.textContent = text;
						cell.style.textAlign = align;
						if (color) cell.style.color = color;
						row.appendChild(cell);
					}
					costDetail.appendChild(row);
				}
				const totalRow = document.createElement("div");
				totalRow.style.cssText = `
                display: grid;
                grid-template-columns: 1fr auto auto auto;
                gap: 8px;
                font-size: 11px;
                padding-top: 4px;
                margin-top: 4px;
                border-top: 1px solid rgba(255, 255, 255, 0.15);
                color: rgba(255, 255, 255, 0.5);
            `;
				[
					(0, src_core_i18n_js.t)("Total"),
					"",
					"",
					(0, src_utils_formatters_js.formatKMB)(costData.total)
				].forEach((text, i) => {
					const cell = document.createElement("span");
					cell.textContent = text;
					cell.style.textAlign = i === 0 ? "left" : "right";
					if (i === 3) cell.style.color = src_core_config_js.default.COLOR_GOLD;
					totalRow.appendChild(cell);
				});
				costDetail.appendChild(totalRow);
				costToggle.addEventListener("click", () => {
					const isHidden = costDetail.style.display === "none";
					costDetail.style.display = isHidden ? "block" : "none";
					costToggle.textContent = (0, src_core_i18n_js.t)("Tea cost: {0}/hr {1}", (0, src_utils_formatters_js.formatKMB)(costData.total), isHidden ? "▼" : "▶");
				});
				costSection.appendChild(costToggle);
				costSection.appendChild(costDetail);
				stats.appendChild(costSection);
			}
			popup.appendChild(stats);
			if (result.allResults && result.allResults.length > 1) {
				const altSection = document.createElement("div");
				altSection.style.cssText = `
                margin-top: 12px;
                padding-top: 8px;
                border-top: 1px solid ${src_core_config_js.default.COLOR_BORDER};
            `;
				const altHeader = document.createElement("div");
				altHeader.style.cssText = `
                font-size: 11px;
                color: rgba(255, 255, 255, 0.5);
                margin-bottom: 6px;
            `;
				altHeader.textContent = (0, src_core_i18n_js.t)("Alternatives:");
				altSection.appendChild(altHeader);
				for (let i = 1; i < Math.min(4, result.allResults.length); i++) {
					const alt = result.allResults[i];
					const altRow = document.createElement("div");
					altRow.style.cssText = `
                    font-size: 11px;
                    color: rgba(255, 255, 255, 0.6);
                    padding: 2px 0;
                `;
					const costSuffix = alt.teaCostPerHour?.total > 0 ? ` · ${(0, src_utils_formatters_js.formatKMB)(alt.teaCostPerHour.total)} cost/hr` : "";
					altRow.textContent = `${alt.teas.join(", ")} (${(0, src_utils_formatters_js.formatKMB)(alt.avgScore)}/hr${costSuffix})`;
					altSection.appendChild(altRow);
				}
				popup.appendChild(altSection);
			}
			const constraintSection = document.createElement("div");
			constraintSection.style.cssText = `
            margin-top: 12px;
            padding-top: 8px;
            border-top: 1px solid ${src_core_config_js.default.COLOR_BORDER};
        `;
			const constraintHeader = document.createElement("div");
			constraintHeader.style.cssText = `font-size: 11px; color: rgba(255,255,255,0.5); margin-bottom: 6px;`;
			constraintHeader.textContent = (0, src_core_i18n_js.t)("Tea Constraints:");
			constraintSection.appendChild(constraintHeader);
			const relevantTeas = getRelevantTeas(skillName.toLowerCase(), goal);
			const allConstraintTeas = [...relevantTeas.skillTeas, ...relevantTeas.generalTeas];
			const gameData = src_core_data_manager_js.default.getInitClientData();
			for (const hrid of allConstraintTeas) {
				const isPinned = this.pinnedTeas.has(hrid);
				const isBanned = this.bannedTeas.has(hrid);
				const teaDisplayName = gameData?.itemDetailMap?.[hrid]?.name || hrid;
				const row = document.createElement("div");
				row.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 2px 0;
                font-size: 11px;
            `;
				const teaLabel = document.createElement("span");
				teaLabel.textContent = teaDisplayName;
				teaLabel.style.color = isPinned ? src_core_config_js.default.COLOR_GOLD : isBanned ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)";
				if (isBanned) teaLabel.style.textDecoration = "line-through";
				const btnContainer = document.createElement("div");
				btnContainer.style.cssText = "display:flex; gap:4px;";
				const pinBtn = document.createElement("button");
				pinBtn.textContent = "⊕";
				pinBtn.title = isPinned ? (0, src_core_i18n_js.t)("Remove pin") : (0, src_core_i18n_js.t)("Pin (force include)");
				pinBtn.style.cssText = `
                background: transparent;
                border: 1px solid ${isPinned ? src_core_config_js.default.COLOR_GOLD : "rgba(255,255,255,0.2)"};
                color: ${isPinned ? src_core_config_js.default.COLOR_GOLD : "rgba(255,255,255,0.4)"};
                border-radius: 3px;
                padding: 1px 5px;
                font-size: 11px;
                cursor: pointer;
            `;
				pinBtn.addEventListener("click", () => {
					if (isPinned) this.pinnedTeas.delete(hrid);
					else {
						this.pinnedTeas.add(hrid);
						this.bannedTeas.delete(hrid);
					}
					this._rerunWithConstraints(popup, goal, skillName, locationTab, drilldownAction, alchemyContext);
				});
				const banBtn = document.createElement("button");
				banBtn.textContent = "⊘";
				banBtn.title = isBanned ? (0, src_core_i18n_js.t)("Remove ban") : (0, src_core_i18n_js.t)("Ban (force exclude)");
				banBtn.style.cssText = `
                background: transparent;
                border: 1px solid ${isBanned ? src_core_config_js.default.COLOR_LOSS : "rgba(255,255,255,0.2)"};
                color: ${isBanned ? src_core_config_js.default.COLOR_LOSS : "rgba(255,255,255,0.4)"};
                border-radius: 3px;
                padding: 1px 5px;
                font-size: 11px;
                cursor: pointer;
            `;
				banBtn.addEventListener("click", () => {
					if (isBanned) this.bannedTeas.delete(hrid);
					else {
						this.bannedTeas.add(hrid);
						this.pinnedTeas.delete(hrid);
					}
					this._rerunWithConstraints(popup, goal, skillName, locationTab, drilldownAction, alchemyContext);
				});
				btnContainer.appendChild(pinBtn);
				btnContainer.appendChild(banBtn);
				row.appendChild(teaLabel);
				row.appendChild(btnContainer);
				constraintSection.appendChild(row);
			}
			popup.appendChild(constraintSection);
			const closeBtn = document.createElement("button");
			closeBtn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            font-size: 16px;
            cursor: pointer;
            padding: 4px;
            line-height: 1;
        `;
			closeBtn.innerHTML = "&times;";
			closeBtn.addEventListener("click", () => this.closePopup());
			popup.appendChild(closeBtn);
		}
		/**
		* Show both XP and Gold recommendations side by side
		* @param {HTMLElement} anchorButton - Button that was clicked
		* @param {string} skillName - Current skill name
		* @param {string|null} locationTab - Current location tab
		*/
		showBothRecommendation(anchorButton, skillName, locationTab, alchemyContext = null) {
			const xpResult = findOptimalTeas(skillName, "xp", locationTab, null, null, alchemyContext);
			const goldResult = findOptimalTeas(skillName, "gold", locationTab, null, null, alchemyContext);
			if (xpResult.error && goldResult.error) {
				this.showError(anchorButton, xpResult.error);
				return;
			}
			const popup = document.createElement("div");
			popup.className = "mwi-tea-recommendation-popup";
			popup.style.cssText = `
            position: absolute;
            z-index: 10000;
            background: #1a1a1a;
            border: 1px solid ${src_core_config_js.default.COLOR_BORDER};
            border-radius: 8px;
            padding: 16px;
            min-width: 320px;
            max-width: 420px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            cursor: default;
        `;
			const displayName = alchemyContext ? `${alchemyContext.actionType}: ${alchemyContext.itemName}` : locationTab || skillName;
			const header = document.createElement("div");
			header.style.cssText = `
            font-size: 14px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid ${src_core_config_js.default.COLOR_BORDER};
            cursor: grab;
            user-select: none;
        `;
			header.textContent = (0, src_core_i18n_js.t)("Optimal Teas for {0}", displayName);
			header.title = (0, src_core_i18n_js.t)("Drag to move");
			popup.appendChild(header);
			this.dragCleanup = this.makeDraggable(popup, header);
			const columns = document.createElement("div");
			columns.style.cssText = `
            display: flex;
            gap: 16px;
        `;
			if (!xpResult.error && xpResult.optimal) {
				const xpCol = document.createElement("div");
				xpCol.style.cssText = "flex: 1;";
				const xpHeader = document.createElement("div");
				xpHeader.style.cssText = `
                font-size: 12px;
                font-weight: 600;
                color: ${src_core_config_js.default.COLOR_INFO};
                margin-bottom: 8px;
            `;
				xpHeader.textContent = `XP/hr: ${(0, src_utils_formatters_js.formatKMB)(xpResult.optimal.avgScore)}`;
				xpCol.appendChild(xpHeader);
				for (const tea of xpResult.optimal.teas) {
					const teaRow = document.createElement("div");
					teaRow.style.cssText = `
                    font-size: 11px;
                    color: rgba(255, 255, 255, 0.8);
                    padding: 2px 0;
                `;
					teaRow.textContent = tea.name;
					xpCol.appendChild(teaRow);
				}
				columns.appendChild(xpCol);
			}
			if (!goldResult.error && goldResult.optimal) {
				const goldCol = document.createElement("div");
				goldCol.style.cssText = "flex: 1;";
				const goldHeader = document.createElement("div");
				goldHeader.style.cssText = `
                font-size: 12px;
                font-weight: 600;
                color: ${src_core_config_js.default.COLOR_PROFIT};
                margin-bottom: 8px;
            `;
				goldHeader.textContent = `Gold/hr: ${(0, src_utils_formatters_js.formatKMB)(goldResult.optimal.avgScore)}`;
				goldCol.appendChild(goldHeader);
				for (const tea of goldResult.optimal.teas) {
					const teaRow = document.createElement("div");
					teaRow.style.cssText = `
                    font-size: 11px;
                    color: rgba(255, 255, 255, 0.8);
                    padding: 2px 0;
                `;
					teaRow.textContent = tea.name;
					goldCol.appendChild(teaRow);
				}
				columns.appendChild(goldCol);
			}
			popup.appendChild(columns);
			const closeBtn = document.createElement("button");
			closeBtn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            font-size: 16px;
            cursor: pointer;
            padding: 4px;
            line-height: 1;
        `;
			closeBtn.innerHTML = "&times;";
			closeBtn.addEventListener("click", () => this.closePopup());
			popup.appendChild(closeBtn);
			document.body.appendChild(popup);
			const buttonRect = anchorButton.getBoundingClientRect();
			const popupRect = popup.getBoundingClientRect();
			let top = buttonRect.bottom + 8;
			let left = buttonRect.left;
			if (left + popupRect.width > window.innerWidth - 16) left = window.innerWidth - popupRect.width - 16;
			if (top + popupRect.height > window.innerHeight - 16) top = buttonRect.top - popupRect.height - 8;
			popup.style.top = `${top}px`;
			popup.style.left = `${left}px`;
			this.currentPopup = popup;
			const closeHandler = (e) => {
				if (!popup.contains(e.target) && e.target !== anchorButton) {
					this.closePopup();
					document.removeEventListener("click", closeHandler);
				}
			};
			setTimeout(() => {
				document.addEventListener("click", closeHandler);
			}, 100);
		}
		/**
		* Show error message
		* @param {HTMLElement} anchorButton - Button that was clicked
		* @param {string} message - Error message
		*/
		showError(anchorButton, message) {
			this.closePopup();
			const popup = document.createElement("div");
			popup.className = "mwi-tea-recommendation-popup";
			popup.style.cssText = `
            position: absolute;
            z-index: 10000;
            background: #1a1a1a;
            border: 1px solid ${src_core_config_js.default.COLOR_WARNING};
            border-radius: 8px;
            padding: 12px 16px;
            max-width: 280px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            color: ${src_core_config_js.default.COLOR_WARNING};
            font-size: 13px;
        `;
			popup.textContent = message;
			document.body.appendChild(popup);
			const buttonRect = anchorButton.getBoundingClientRect();
			popup.style.top = `${buttonRect.bottom + 8}px`;
			popup.style.left = `${buttonRect.left}px`;
			this.currentPopup = popup;
			const timeout = setTimeout(() => this.closePopup(), 3e3);
			this.timerRegistry.registerTimeout(timeout);
		}
		/**
		* Re-run optimizer with current pin/ban constraints and re-render popup
		* @param {HTMLElement} popup - Popup container
		* @param {string} goal - 'xp' or 'gold'
		* @param {string} skillName - Current skill name
		* @param {string|null} locationTab - Current location tab
		* @param {string|null} drilldownAction - Current drilldown action name, or null
		* @param {Object|null} alchemyContext - Alchemy context for alchemy skills
		*/
		_rerunWithConstraints(popup, goal, skillName, locationTab, drilldownAction, alchemyContext = null) {
			const constraints = {
				pinned: this.pinnedTeas,
				banned: this.bannedTeas
			};
			const result = findOptimalTeas(skillName, goal, locationTab, drilldownAction || null, constraints, alchemyContext);
			if (result.error) return;
			this.buildPopupContent(popup, result, goal, skillName, locationTab, drilldownAction, alchemyContext);
		}
		/**
		* Close the current popup
		*/
		closePopup() {
			if (this.closeHandlerCleanup) {
				this.closeHandlerCleanup();
				this.closeHandlerCleanup = null;
			}
			if (this.dragCleanup) {
				this.dragCleanup();
				this.dragCleanup = null;
			}
			if (this.currentPopup) {
				this.currentPopup.remove();
				this.currentPopup = null;
			}
			this.pinnedTeas.clear();
			this.bannedTeas.clear();
		}
		/**
		* Make an element draggable via a handle
		* @param {HTMLElement} element - Element to make draggable
		* @param {HTMLElement} handle - Handle element for dragging
		*/
		makeDraggable(element, handle) {
			let isDragging = false;
			let hasDragged = false;
			let startX, startY, initialX, initialY;
			handle.addEventListener("mousedown", (e) => {
				isDragging = true;
				hasDragged = false;
				startX = e.clientX;
				startY = e.clientY;
				initialX = element.offsetLeft;
				initialY = element.offsetTop;
				handle.style.cursor = "grabbing";
				e.preventDefault();
			});
			const onMouseMove = (e) => {
				if (!isDragging) return;
				hasDragged = true;
				const dx = e.clientX - startX;
				const dy = e.clientY - startY;
				element.style.left = `${initialX + dx}px`;
				element.style.top = `${initialY + dy}px`;
			};
			const onMouseUp = () => {
				if (isDragging) {
					isDragging = false;
					handle.style.cursor = "grab";
					if (hasDragged) {
						const suppressClick = (e) => {
							e.stopPropagation();
							document.removeEventListener("click", suppressClick, true);
						};
						document.addEventListener("click", suppressClick, true);
					}
				}
			};
			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", onMouseUp);
			return () => {
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", onMouseUp);
			};
		}
		/**
		* Disable the feature
		*/
		disable() {
			this.closePopup();
			this.timerRegistry.clearAll();
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			document.querySelectorAll(".mwi-tea-recommendation-buttons").forEach((el) => el.remove());
			document.querySelectorAll(".mwi-tea-recommendation-popup").forEach((el) => el.remove());
			this.buttonContainer = null;
			this.initialized = false;
		}
	};
	var teaRecommendation = new TeaRecommendation();
	//#endregion
	//#region src/features/actions/inventory-count-display.js
	/**
	* Inventory Count Display
	* Shows how many of the output item you currently own on:
	*  - Skill action tiles (SkillAction_skillAction) — bottom-center overlay on the tile
	*  - Action detail panels (SkillActionDetail_regularComponent) — inline after the action name heading
	*/
	var GATHERING_TYPES$1 = [
		"/action_types/foraging",
		"/action_types/woodcutting",
		"/action_types/milking"
	];
	var PRODUCTION_TYPES = [
		"/action_types/brewing",
		"/action_types/cooking",
		"/action_types/cheesesmithing",
		"/action_types/crafting",
		"/action_types/tailoring",
		"/action_types/alchemy"
	];
	/**
	* Build an itemHrid → count map from the current inventory.
	* @returns {Map<string, number>}
	*/
	function buildCountMap() {
		const inventory = src_core_data_manager_js.default.getInventory();
		const map = /* @__PURE__ */ new Map();
		if (!Array.isArray(inventory)) return map;
		for (const item of inventory) {
			if (item.itemLocationHrid !== "/item_locations/inventory") continue;
			if (item.enhancementLevel) continue;
			const count = item.count || 0;
			if (!count) continue;
			map.set(item.itemHrid, (map.get(item.itemHrid) || 0) + count);
		}
		return map;
	}
	/**
	* Return the primary output itemHrid for an action, or null if not applicable.
	* Gathering: first entry of dropTable (the main resource, not rare drops).
	* Production: first entry of outputItems.
	* @param {object} actionDetails
	* @returns {string|null}
	*/
	function getPrimaryOutputHrid(actionDetails) {
		if (!actionDetails) return null;
		if (GATHERING_TYPES$1.includes(actionDetails.type)) {
			const firstDrop = actionDetails.dropTable?.[0];
			if (!firstDrop || firstDrop.dropRate < 1) return null;
			return firstDrop.itemHrid;
		}
		if (PRODUCTION_TYPES.includes(actionDetails.type)) return actionDetails.outputItems?.[0]?.itemHrid ?? null;
		return null;
	}
	/**
	* @param {number} count
	* @returns {string}
	*/
	function formatCount(count) {
		return (0, src_utils_formatters_js.formatKMB)(count);
	}
	var InventoryCountDisplay = class {
		constructor() {
			this.tileElements = /* @__PURE__ */ new Map();
			this.detailPanels = /* @__PURE__ */ new Set();
			this.unregisterObservers = [];
			this.itemsUpdatedHandler = null;
			this.isInitialized = false;
			this.DEBOUNCE_DELAY = 300;
			this.debounceTimer = null;
		}
		initialize() {
			if (this.isInitialized) return;
			this.isInitialized = true;
			src_core_config_js.default.onSettingChange("inventoryCountDisplay", (enabled) => {
				if (enabled) this._enable();
				else this._disable();
			});
			if (src_core_config_js.default.getSetting("inventoryCountDisplay", true)) this._enable();
		}
		_enable() {
			if (this.unregisterObservers.length > 0) return;
			this._setupTileObserver();
			this._setupDetailObserver();
			this.itemsUpdatedHandler = () => {
				clearTimeout(this.debounceTimer);
				this.debounceTimer = setTimeout(() => this._refreshAll(), this.DEBOUNCE_DELAY);
			};
			src_core_data_manager_js.default.on("items_updated", this.itemsUpdatedHandler);
			this.unregisterObservers.push(() => {
				src_core_data_manager_js.default.off("items_updated", this.itemsUpdatedHandler);
			});
		}
		_disable() {
			this.unregisterObservers.forEach((fn) => fn());
			this.unregisterObservers = [];
			document.querySelectorAll(".mwi-inv-count-tile").forEach((el) => el.remove());
			document.querySelectorAll(".mwi-inv-count-detail").forEach((el) => el.remove());
			this.tileElements.clear();
			this.detailPanels.clear();
		}
		_setupTileObserver() {
			const unregister = src_core_dom_observer_js.default.onClass("InventoryCountDisplay-Tile", "SkillAction_skillAction", (actionPanel) => this._injectTile(actionPanel));
			this.unregisterObservers.push(unregister);
			document.querySelectorAll("[class*=\"SkillAction_skillAction\"]").forEach((panel) => {
				this._injectTile(panel);
			});
		}
		/**
		* Inject a count strip just below the tile using the same pattern as
		* gathering-stats / max-produceable: position absolute at top:100% with
		* marginBottom on the panel so the grid row makes room for it.
		* @param {HTMLElement} actionPanel
		*/
		_injectTile(actionPanel) {
			const actionHrid = this._getActionHridFromTile(actionPanel);
			if (!actionHrid) return;
			const outputHrid = getPrimaryOutputHrid(src_core_data_manager_js.default.getActionDetails(actionHrid));
			if (!outputHrid) return;
			let span = actionPanel.querySelector(".mwi-inv-count-tile");
			if (span && span.dataset.outputHrid !== outputHrid) {
				span.remove();
				span = null;
			}
			if (!span) {
				if (!actionPanel.querySelector("[class*=\"SkillAction_name\"]")) return;
				span = document.createElement("span");
				span.className = "mwi-inv-count-tile";
				span.dataset.outputHrid = outputHrid;
				if (actionPanel.style.position !== "relative" && actionPanel.style.position !== "absolute") actionPanel.style.position = "relative";
				span.style.cssText = `
                position: absolute;
                bottom: 4px;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                font-size: 0.75em;
                color: ${src_core_config_js.default.COLOR_INV_COUNT};
                font-weight: 600;
                pointer-events: none;
                line-height: 1.4;
                z-index: 12;
                background: rgba(0, 0, 0, 0.55);
                border-radius: 3px;
                padding: 0 4px;
                white-space: nowrap;
            `;
				actionPanel.appendChild(span);
			}
			this.tileElements.set(actionPanel, {
				outputHrid,
				span
			});
			this._updateTileSpan(span, outputHrid, buildCountMap());
		}
		_updateTileSpan(span, outputHrid, countMap) {
			const count = countMap.get(outputHrid) || 0;
			span.textContent = count > 0 ? formatCount(count) : "";
			span.style.color = src_core_config_js.default.COLOR_INV_COUNT;
		}
		_setupDetailObserver() {
			const unregister = src_core_dom_observer_js.default.onClass("InventoryCountDisplay-Detail", "SkillActionDetail_regularComponent", (panel) => this._injectDetail(panel));
			this.unregisterObservers.push(unregister);
			document.querySelectorAll("[class*=\"SkillActionDetail_regularComponent\"]").forEach((panel) => {
				this._injectDetail(panel);
			});
		}
		/**
		* Inject count inline after the action name heading in the detail panel.
		* Reads textContent before injecting so the name lookup is always clean.
		* @param {HTMLElement} panel
		*/
		_injectDetail(panel) {
			const nameEl = panel.querySelector("[class*=\"SkillActionDetail_name\"]");
			if (!nameEl) return;
			const actionHrid = getActionHridFromName(nameEl.textContent.trim());
			if (!actionHrid) return;
			const outputHrid = getPrimaryOutputHrid(src_core_data_manager_js.default.getActionDetails(actionHrid));
			if (!outputHrid) return;
			const infoContainer = nameEl.closest("[class*=\"SkillActionDetail_info\"]") ?? nameEl.parentElement;
			(infoContainer.parentElement ?? infoContainer).querySelector(".mwi-inv-count-detail")?.remove();
			const count = buildCountMap().get(outputHrid) || 0;
			const span = document.createElement("span");
			span.className = "mwi-inv-count-detail";
			span.dataset.outputHrid = outputHrid;
			span.style.cssText = `
            display: block;
            font-size: 0.75em;
            color: ${src_core_config_js.default.COLOR_INV_COUNT};
            font-weight: 600;
            margin-top: 2px;
            pointer-events: none;
        `;
			span.textContent = count > 0 ? (0, src_core_i18n_js.t)("({0} in inventory)", formatCount(count)) : "";
			infoContainer.after(span);
			this.detailPanels.add(panel);
		}
		_refreshAll() {
			const countMap = buildCountMap();
			for (const [actionPanel, { outputHrid, span }] of this.tileElements) {
				if (!document.body.contains(actionPanel)) {
					this.tileElements.delete(actionPanel);
					continue;
				}
				this._updateTileSpan(span, outputHrid, countMap);
			}
			for (const panel of this.detailPanels) {
				if (!document.body.contains(panel)) {
					this.detailPanels.delete(panel);
					continue;
				}
				const nameEl = panel.querySelector("[class*=\"SkillActionDetail_name\"]");
				const infoContainer = nameEl ? nameEl.closest("[class*=\"SkillActionDetail_info\"]") ?? nameEl.parentElement : panel;
				const span = (infoContainer.parentElement ?? infoContainer).querySelector(".mwi-inv-count-detail");
				if (!span || !span.dataset.outputHrid) continue;
				const count = countMap.get(span.dataset.outputHrid) || 0;
				span.style.color = src_core_config_js.default.COLOR_INV_COUNT;
				span.textContent = count > 0 ? (0, src_core_i18n_js.t)("({0} in inventory)", formatCount(count)) : "";
			}
		}
		_getActionHridFromTile(actionPanel) {
			const nameEl = actionPanel.querySelector("[class*=\"SkillAction_name\"]");
			if (!nameEl) return null;
			return getActionHridFromName(Array.from(nameEl.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join("").trim());
		}
		disable() {
			this._disable();
			this.isInitialized = false;
		}
	};
	var inventoryCountDisplay = new InventoryCountDisplay();
	var inventory_count_display_default = {
		name: "Inventory Count Display",
		initialize: () => inventoryCountDisplay.initialize(),
		cleanup: () => inventoryCountDisplay.disable()
	};
	//#endregion
	//#region src/utils/site-origin.js
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
	function getSiteOrigin() {
		return typeof window !== "undefined" ? window.location.origin : "https://www.milkywayidle.com";
	}
	//#endregion
	//#region src/utils/asset-manifest.js
	/**
	* Asset Manifest Utility
	*
	* Fetches the game's asset-manifest.json to resolve current webpack hashed
	* sprite URLs without hardcoding hashes that break on game updates.
	*/
	var MANIFEST_URL = `${getSiteOrigin()}/asset-manifest.json`;
	var SPRITE_KEYS = {
		actions: "actions_sprite",
		items: "items_sprite",
		monsters: "combat_monsters_sprite",
		misc: "misc_sprite",
		abilities: "abilities_sprite"
	};
	var manifestPromise = null;
	var cachedUrls = null;
	/**
	* Fetch and parse the asset manifest, returning a map of sprite name → URL.
	* Result is cached for the lifetime of the page.
	* @returns {Promise<Object>} Map of sprite key → full URL
	*/
	async function fetchManifest() {
		if (cachedUrls) return cachedUrls;
		if (manifestPromise) return manifestPromise;
		manifestPromise = (async () => {
			try {
				const response = await fetch(MANIFEST_URL);
				if (!response.ok) {
					console.warn("[AssetManifest] Failed to fetch manifest:", response.status);
					return {};
				}
				const manifest = await response.json();
				const files = manifest.files || manifest;
				const urls = {};
				for (const [key, spriteName] of Object.entries(SPRITE_KEYS)) {
					const entry = Object.entries(files).find(([k]) => k.includes(spriteName) && k.endsWith(".svg"));
					if (entry) urls[key] = entry[1];
				}
				cachedUrls = urls;
				return urls;
			} catch (error) {
				console.warn("[AssetManifest] Error fetching manifest:", error);
				return {};
			}
		})();
		return manifestPromise;
	}
	/**
	* Get a specific sprite URL by key.
	* @param {'actions'|'items'|'monsters'|'misc'|'abilities'} key
	* @returns {Promise<string|null>}
	*/
	async function getSpriteUrl(key) {
		return (await fetchManifest())[key] || null;
	}
	var asset_manifest_default = {
		fetchManifest,
		getSpriteUrl
	};
	//#endregion
	//#region src/features/actions/pinned-actions-page.js
	/**
	* Pinned Actions Page
	* Adds a "Pinned" button to the left nav bar that shows all pinned actions
	* in a consolidated list with skill, level, profit/hr, and XP/hr.
	* Columns are sortable (click header) and skill is filterable (⋮ button).
	*/
	var GATHERING_TYPES = [
		"/action_types/foraging",
		"/action_types/woodcutting",
		"/action_types/milking"
	];
	var COLUMNS = [
		{
			key: "name",
			label: (0, src_core_i18n_js.t)("Action"),
			align: "left",
			filterable: false
		},
		{
			key: "skill",
			label: (0, src_core_i18n_js.t)("Skill"),
			align: "left",
			filterable: true
		},
		{
			key: "level",
			label: (0, src_core_i18n_js.t)("Lv"),
			align: "left",
			filterable: false
		},
		{
			key: "profitPerHour",
			label: (0, src_core_i18n_js.t)("Profit/hr"),
			align: "right",
			filterable: false
		},
		{
			key: "expPerHour",
			label: (0, src_core_i18n_js.t)("XP/hr"),
			align: "right",
			filterable: false
		}
	];
	var GRID_COLUMNS = "28px 1fr 120px 50px 90px 90px";
	/**
	* Get game object via React fiber tree traversal
	* @returns {Object|null} Game component instance
	*/
	function getGameObject() {
		const rootEl = document.getElementById("root");
		const rootFiber = rootEl?._reactRootContainer?.current || rootEl?._reactRootContainer?._internalRoot?.current;
		if (!rootFiber) return null;
		function find(fiber) {
			if (!fiber) return null;
			if (fiber.stateNode?.handleGoToAction) return fiber.stateNode;
			return find(fiber.child) || find(fiber.sibling);
		}
		return find(rootFiber);
	}
	/**
	* Format skill name from action type HRID
	* @param {string} typeHrid - e.g. "/action_types/milking"
	* @returns {string} Display name, e.g. "Milking"
	*/
	function formatSkillName(typeHrid) {
		if (!typeHrid) return "Unknown";
		const slug = typeHrid.split("/").pop();
		return slug.charAt(0).toUpperCase() + slug.slice(1);
	}
	/**
	* Format profit/xp number compactly
	* @param {number|null} value - Value to format
	* @returns {string} Formatted string or '-'
	*/
	function formatCompact(value) {
		if (value === null || value === void 0) return "-";
		const abs = Math.abs(value);
		let formatted;
		if (abs >= 1e9) formatted = (value / 1e9).toFixed(1) + "B";
		else if (abs >= 1e6) formatted = (value / 1e6).toFixed(1) + "M";
		else if (abs >= 1e3) formatted = (value / 1e3).toFixed(1) + "K";
		else formatted = (0, src_utils_formatters_js.numberFormatter)(value);
		return formatted;
	}
	var PinnedActionsPage = class {
		constructor() {
			this.navButton = null;
			this.pageContainer = null;
			this.isActive = false;
			this.navigationObserver = null;
			this.unregisterObserver = null;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.navInjected = false;
			this.hiddenElements = [];
			this.sortColumn = "skill";
			this.sortDirection = "asc";
			this.selectedSkills = [];
			this.activeFilterPopup = null;
			this.activeFilterButton = null;
			this.popupCloseHandler = null;
			this.allActions = [];
			this.activeTab = "overview";
			this.itemsSpriteUrl = null;
			this.contentArea = null;
			this.deactivatedNavItem = null;
			this.navClickInterceptor = null;
		}
		/**
		* Initialize the pinned actions page feature
		*/
		initialize() {
			if (!src_core_config_js.default.getSetting("actions_pinnedPage")) return;
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("PinnedActionsPage", "NavigationBar_nav", () => {
				if (!this.navInjected) this.injectNavButton();
			});
			if (document.querySelector("[class*=\"NavigationBar_nav\"]") && !this.navInjected) this.injectNavButton();
		}
		/**
		* Inject the "Pinned" nav button above the first skill in the nav bar
		*/
		injectNavButton() {
			const navLinks = document.querySelector("[class*=\"NavigationBar_navigationLinks\"]");
			if (!navLinks) return;
			this.navInjected = true;
			const btn = document.createElement("div");
			btn.className = "mwi-pinned-nav";
			btn.style.cssText = `
            padding: 4px 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.85em;
            color: ${src_core_config_js.default.COLOR_ACCENT};
            border-left: 3px solid transparent;
            transition: background 0.15s, border-color 0.15s;
            user-select: none;
            margin-bottom: 2px;
        `;
			btn.innerHTML = `<span style="font-size: 1.1em;">📌</span><span>${(0, src_core_i18n_js.t)("Pinned")}</span>`;
			btn.addEventListener("mouseenter", () => {
				if (!this.isActive) btn.style.background = "rgba(255, 255, 255, 0.05)";
			});
			btn.addEventListener("mouseleave", () => {
				if (!this.isActive) btn.style.background = "";
			});
			btn.addEventListener("click", () => {
				if (this.isActive) this.hidePage();
				else this.showPage();
			});
			navLinks.insertBefore(btn, navLinks.firstChild);
			this.navButton = btn;
		}
		/**
		* Show the pinned actions page, replacing the main content
		*/
		showPage() {
			if (this.isActive) return;
			const mainPanel = document.querySelector("[class*=\"MainPanel_mainPanel\"]");
			if (!mainPanel) return;
			this.isActive = true;
			this.updateNavButtonState(true);
			this.deactivateGameNav();
			this.startNavClickInterceptor();
			this.hiddenElements = [];
			for (const child of mainPanel.children) if (child !== this.pageContainer) {
				this.hiddenElements.push({
					el: child,
					prevDisplay: child.style.display
				});
				child.style.display = "none";
			}
			this.pageContainer = document.createElement("div");
			this.pageContainer.className = "mwi-pinned-page";
			this.pageContainer.style.cssText = `
            width: 100%;
            height: 100%;
            overflow-y: auto;
            padding: 16px;
            box-sizing: border-box;
        `;
			mainPanel.appendChild(this.pageContainer);
			this._onPinChange = () => this.loadActions();
			actionPanelSort.onPinChange(this._onPinChange);
			this.loadActions();
			this.setupNavigationObserver(mainPanel);
		}
		/**
		* Load action data (async), then render
		*/
		async loadActions() {
			const pinnedActions = actionPanelSort.getPinnedActions();
			this.allActions = [];
			for (const pinnedKey of pinnedActions) {
				let actionHrid = pinnedKey;
				let pinnedItemHrid = null;
				if (pinnedKey.includes("|")) {
					const parts = pinnedKey.split("|");
					actionHrid = parts[0];
					pinnedItemHrid = parts[1];
				}
				const details = src_core_data_manager_js.default.getActionDetails(actionHrid);
				if (!details) continue;
				let displayName = details.name;
				if (pinnedItemHrid) {
					const itemDetails = src_core_data_manager_js.default.getItemDetails(pinnedItemHrid);
					if (itemDetails) displayName = `${details.name} ${itemDetails.name}`;
				}
				let stats = actionPanelSort.getCachedStats(pinnedKey);
				if (!stats || stats.profitPerHour === void 0) stats = await this.computeStats(actionHrid, details, pinnedItemHrid);
				this.allActions.push({
					actionHrid: pinnedKey,
					baseActionHrid: actionHrid,
					name: displayName,
					skill: formatSkillName(details.type),
					type: details.type,
					outputItemHrid: pinnedItemHrid || details.outputItems?.[0]?.itemHrid || null,
					level: details.levelRequirement?.level ?? 0,
					profitPerHour: stats?.profitPerHour ?? null,
					expPerHour: stats?.expPerHour ?? null
				});
			}
			if (!this.itemsSpriteUrl) this.itemsSpriteUrl = await asset_manifest_default.getSpriteUrl("items");
			this.renderTable();
		}
		/**
		* Get filtered and sorted actions based on current state
		* @returns {Array} Filtered and sorted action array
		*/
		getFilteredSorted() {
			let actions = [...this.allActions];
			if (this.selectedSkills.length > 0) {
				const skillSet = new Set(this.selectedSkills);
				actions = actions.filter((a) => skillSet.has(a.skill));
			}
			const col = this.sortColumn;
			const dir = this.sortDirection === "asc" ? 1 : -1;
			actions.sort((a, b) => {
				const aVal = a[col];
				const bVal = b[col];
				if (aVal === null && bVal === null) return 0;
				if (aVal === null) return 1;
				if (bVal === null) return -1;
				if (typeof aVal === "string") return dir * aVal.localeCompare(bVal);
				return dir * (aVal - bVal);
			});
			return actions;
		}
		/**
		* Render the full page (header + tab bar + content area)
		* Called on initial load, filter change, sort change
		*/
		renderTable() {
			if (!this.pageContainer) return;
			this.closeFilterPopup();
			const actions = this.getFilteredSorted();
			while (this.pageContainer.firstChild) this.pageContainer.removeChild(this.pageContainer.firstChild);
			this.contentArea = null;
			const header = document.createElement("div");
			header.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid #444;
        `;
			header.innerHTML = `
            <span style="font-size: 1.3em;">📌</span>
            <span style="font-size: 1.1em; font-weight: bold;">${(0, src_core_i18n_js.t)("Pinned Actions")}</span>
            <span style="color: #888; font-size: 0.85em;">(${actions.length})</span>
        `;
			this.pageContainer.appendChild(header);
			const tabBar = document.createElement("div");
			tabBar.style.cssText = `
            display: flex;
            gap: 0;
            margin-bottom: 12px;
            border-bottom: 1px solid #444;
        `;
			for (const tab of ["overview", "materials"]) {
				const label = tab === "overview" ? (0, src_core_i18n_js.t)("Overview") : (0, src_core_i18n_js.t)("Materials");
				const btn = document.createElement("button");
				btn.dataset.tab = tab;
				btn.textContent = label;
				const isActive = this.activeTab === tab;
				btn.style.cssText = `
                background: none;
                border: none;
                border-bottom: 2px solid ${isActive ? src_core_config_js.default.COLOR_ACCENT : "transparent"};
                color: ${isActive ? "#fff" : "#888"};
                padding: 6px 16px;
                cursor: pointer;
                font-size: 0.9em;
                font-weight: ${isActive ? "600" : "400"};
                margin-bottom: -1px;
                transition: color 0.15s, border-color 0.15s;
            `;
				btn.addEventListener("click", () => {
					if (this.activeTab === tab) return;
					this.activeTab = tab;
					tabBar.querySelectorAll("button").forEach((b) => {
						const active = b.dataset.tab === tab;
						b.style.borderBottomColor = active ? src_core_config_js.default.COLOR_ACCENT : "transparent";
						b.style.color = active ? "#fff" : "#888";
						b.style.fontWeight = active ? "600" : "400";
					});
					this.renderContent();
				});
				tabBar.appendChild(btn);
			}
			this.pageContainer.appendChild(tabBar);
			this.contentArea = document.createElement("div");
			this.pageContainer.appendChild(this.contentArea);
			this.renderContent();
		}
		/**
		* Render only the content area (tab switch — no header/tab bar rebuild)
		*/
		renderContent() {
			if (!this.contentArea) return;
			while (this.contentArea.firstChild) this.contentArea.removeChild(this.contentArea.firstChild);
			if (this.activeTab === "materials") this.renderMaterialsTab();
			else this.renderOverviewTab();
		}
		/**
		* Render the overview tab (profit/hr, XP/hr table)
		*/
		renderOverviewTab() {
			const actions = this.getFilteredSorted();
			if (this.allActions.length === 0) {
				const empty = document.createElement("div");
				empty.style.cssText = "text-align: center; padding: 40px 20px; color: #999;";
				empty.innerHTML = `
                <div style="font-size: 2em; margin-bottom: 12px;">📌</div>
                <div style="font-size: 1.1em; margin-bottom: 8px;">${(0, src_core_i18n_js.t)("No pinned actions yet")}</div>
                <div style="font-size: 0.85em; color: #666;">
                    ${(0, src_core_i18n_js.t)("Pin actions using the 📌 icon on action tiles to see them here.")}
                </div>
            `;
				this.contentArea.appendChild(empty);
				return;
			}
			const headerRow = document.createElement("div");
			headerRow.style.cssText = `
            display: grid;
            grid-template-columns: ${GRID_COLUMNS};
            gap: 8px;
            padding: 4px 8px;
            font-size: 0.75em;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #555;
            user-select: none;
        `;
			const iconHeader = document.createElement("div");
			headerRow.appendChild(iconHeader);
			for (const col of COLUMNS) {
				const th = document.createElement("div");
				th.style.cssText = `
                display: flex;
                align-items: center;
                gap: 4px;
                ${col.align === "right" ? "justify-content: flex-end;" : ""}
            `;
				const label = document.createElement("span");
				label.style.cursor = "pointer";
				let labelText = col.label;
				if (this.sortColumn === col.key) labelText += this.sortDirection === "asc" ? " ▲" : " ▼";
				label.textContent = labelText;
				label.addEventListener("click", () => {
					if (this.sortColumn === col.key) this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
					else {
						this.sortColumn = col.key;
						this.sortDirection = col.key === "name" || col.key === "skill" ? "asc" : "desc";
					}
					this.renderTable();
				});
				th.appendChild(label);
				if (col.filterable) {
					const filterBtn = document.createElement("button");
					filterBtn.textContent = "⋮";
					const hasActive = this.selectedSkills.length > 0;
					filterBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: ${hasActive ? "#4a90e2" : "#aaa"};
                    cursor: pointer;
                    font-size: 14px;
                    padding: 2px 4px;
                    font-weight: bold;
                `;
					filterBtn.addEventListener("click", (e) => {
						e.stopPropagation();
						this.showSkillFilterPopup(filterBtn);
					});
					th.appendChild(filterBtn);
				}
				headerRow.appendChild(th);
			}
			this.contentArea.appendChild(headerRow);
			for (let ri = 0; ri < actions.length; ri++) {
				const action = actions[ri];
				const profitColor = action.profitPerHour === null ? "#888" : action.profitPerHour >= 0 ? src_core_config_js.default.COLOR_PROFIT || "#5fda5f" : src_core_config_js.default.COLOR_LOSS || "#ff6b6b";
				const profitPrefix = action.profitPerHour !== null && action.profitPerHour > 0 ? "+" : "";
				const rowBg = ri % 2 === 1 ? "rgba(255, 255, 255, 0.03)" : "transparent";
				const row = document.createElement("div");
				row.className = "mwi-pinned-row";
				row.dataset.actionHrid = action.actionHrid;
				row.dataset.rowBg = rowBg;
				row.style.cssText = `
                display: grid;
                grid-template-columns: ${GRID_COLUMNS};
                gap: 8px;
                padding: 8px;
                cursor: pointer;
                border-radius: 4px;
                transition: background 0.15s;
                align-items: center;
                background: ${rowBg};
            `;
				const iconSlug = action.outputItemHrid ? action.outputItemHrid.split("/").pop() : "";
				row.innerHTML = `
                <span style="display: flex; align-items: center; justify-content: center;">${this.itemsSpriteUrl && iconSlug ? `<svg width="24" height="24"><use href="${this.itemsSpriteUrl}#${iconSlug}"></use></svg>` : ""}</span>
                <span style="font-weight: 500; text-align: left;">${action.name}</span>
                <span style="color: #aaa; font-size: 0.9em; text-align: left;">${action.skill}</span>
                <span style="color: #aaa; text-align: left;">${action.level}</span>
                <span style="text-align: right; color: ${profitColor};">
                    ${profitPrefix}${formatCompact(action.profitPerHour)}
                </span>
                <span style="text-align: right; color: #7ec8e3;">
                    ${formatCompact(action.expPerHour)}
                </span>
            `;
				row.addEventListener("mouseenter", () => {
					row.style.background = "rgba(255, 255, 255, 0.08)";
				});
				row.addEventListener("mouseleave", () => {
					row.style.background = row.dataset.rowBg || "transparent";
				});
				row.addEventListener("click", () => {
					const game = getGameObject();
					if (game?.handleGoToAction) {
						this.hidePage(true);
						game.handleGoToAction(action.baseActionHrid);
					}
				});
				this.contentArea.appendChild(row);
			}
			if (actions.length === 0 && this.allActions.length > 0) {
				const noResults = document.createElement("div");
				noResults.style.cssText = "text-align: center; padding: 20px; color: #888;";
				noResults.textContent = (0, src_core_i18n_js.t)("No actions match the current filter.");
				this.contentArea.appendChild(noResults);
			}
		}
		/**
		* Render the materials tab (per-production-action material breakdown)
		*/
		async renderMaterialsTab() {
			const contentArea = this.contentArea;
			if (!contentArea) return;
			if (!this.itemsSpriteUrl) {
				this.itemsSpriteUrl = await asset_manifest_default.getSpriteUrl("items");
				if (contentArea !== this.contentArea) return;
			}
			const productionActions = this.getFilteredSorted().filter((a) => !GATHERING_TYPES.includes(a.type));
			if (productionActions.length === 0) {
				const empty = document.createElement("div");
				empty.style.cssText = "text-align: center; padding: 40px 20px; color: #999;";
				empty.textContent = (0, src_core_i18n_js.t)("No production actions pinned");
				contentArea.appendChild(empty);
				return;
			}
			let first = true;
			for (const action of productionActions) {
				const materials = (0, src_utils_material_calculator_js.calculateMaterialRequirements)(action.actionHrid, 1, false);
				if (!materials || materials.length === 0) continue;
				const canProduce = Math.max(0, Math.min(...materials.map((m) => Math.floor(m.have / m.required))));
				const groupHeader = document.createElement("div");
				groupHeader.style.cssText = `
                display: grid;
                grid-template-columns: 36px 1fr auto;
                align-items: center;
                gap: 8px;
                padding: 8px;
                border-bottom: 1px solid #fff;
                ${first ? "" : "border-top: 1px solid #333;"}
            `;
				first = false;
				const iconEl = document.createElement("div");
				iconEl.style.cssText = "display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;";
				if (this.itemsSpriteUrl && action.outputItemHrid) {
					const slug = action.outputItemHrid.split("/").pop();
					iconEl.innerHTML = `<svg width="28" height="28"><use href="${this.itemsSpriteUrl}#${slug}"></use></svg>`;
				}
				const nameEl = document.createElement("div");
				nameEl.style.cssText = "font-weight: 500;";
				nameEl.textContent = action.name;
				const canProduceEl = document.createElement("div");
				canProduceEl.style.cssText = `font-size: 0.85em; color: ${canProduce > 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS};`;
				canProduceEl.textContent = (0, src_core_i18n_js.t)("Can produce: {0}", canProduce.toLocaleString());
				groupHeader.appendChild(iconEl);
				groupHeader.appendChild(nameEl);
				groupHeader.appendChild(canProduceEl);
				contentArea.appendChild(groupHeader);
				for (let i = 0; i < materials.length; i++) {
					const m = materials[i];
					const rowBg = i % 2 === 1 ? "rgba(255, 255, 255, 0.03)" : "transparent";
					const matRow = document.createElement("div");
					matRow.style.cssText = `
                    display: grid;
                    grid-template-columns: 16px 1fr 100px;
                    align-items: center;
                    gap: 8px;
                    padding: 4px 8px;
                    background: ${rowBg};
                `;
					const spacer = document.createElement("div");
					const matName = document.createElement("div");
					matName.style.cssText = "font-size: 0.85em; color: #ccc; text-align: left;";
					matName.textContent = m.itemName;
					const haveNeeded = document.createElement("div");
					const sufficient = m.have >= m.required;
					haveNeeded.style.cssText = `font-size: 0.85em; text-align: right; color: ${sufficient ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS};`;
					haveNeeded.textContent = `${m.have.toLocaleString()} / ${m.required.toLocaleString()}`;
					matRow.appendChild(spacer);
					matRow.appendChild(matName);
					matRow.appendChild(haveNeeded);
					contentArea.appendChild(matRow);
				}
			}
		}
		/**
		* Show skill filter popup below the filter button
		* @param {HTMLElement} buttonElement - The filter button
		*/
		showSkillFilterPopup(buttonElement) {
			if (this.activeFilterPopup && this.activeFilterButton === buttonElement) {
				this.closeFilterPopup();
				return;
			}
			this.closeFilterPopup();
			const skills = [...new Set(this.allActions.map((a) => a.skill))].sort();
			const popup = document.createElement("div");
			popup.style.cssText = `
            background: #2a2a2a;
            border: 1px solid #555;
            border-radius: 4px;
            padding: 12px;
            min-width: 180px;
            max-height: 300px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        `;
			const title = document.createElement("div");
			title.textContent = (0, src_core_i18n_js.t)("Filter by Skill");
			title.style.cssText = "color: #fff; font-weight: bold; margin-bottom: 10px; font-size: 0.85em;";
			popup.appendChild(title);
			const checkboxContainer = document.createElement("div");
			checkboxContainer.style.cssText = "flex: 1; overflow-y: auto; margin-bottom: 10px;";
			for (const skill of skills) {
				const label = document.createElement("label");
				label.style.cssText = `
                display: block;
                color: #fff;
                padding: 4px 0;
                cursor: pointer;
                font-size: 0.85em;
            `;
				const checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.checked = this.selectedSkills.length === 0 || this.selectedSkills.includes(skill);
				checkbox.style.marginRight = "6px";
				label.appendChild(checkbox);
				label.appendChild(document.createTextNode(skill));
				checkboxContainer.appendChild(label);
			}
			popup.appendChild(checkboxContainer);
			const btnRow = document.createElement("div");
			btnRow.style.cssText = "display: flex; gap: 8px;";
			const applyBtn = document.createElement("button");
			applyBtn.textContent = (0, src_core_i18n_js.t)("Apply");
			applyBtn.style.cssText = `
            flex: 1;
            padding: 6px;
            background: #4a90e2;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.8em;
        `;
			const clearBtn = document.createElement("button");
			clearBtn.textContent = (0, src_core_i18n_js.t)("Clear");
			clearBtn.style.cssText = `
            flex: 1;
            padding: 6px;
            background: #666;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.8em;
        `;
			applyBtn.addEventListener("click", () => {
				const checked = [];
				checkboxContainer.querySelectorAll("input[type=\"checkbox\"]").forEach((cb, i) => {
					if (cb.checked) checked.push(skills[i]);
				});
				this.selectedSkills = checked.length === skills.length ? [] : checked;
				this.closeFilterPopup();
				this.renderTable();
			});
			clearBtn.addEventListener("click", () => {
				this.selectedSkills = [];
				this.closeFilterPopup();
				this.renderTable();
			});
			btnRow.appendChild(applyBtn);
			btnRow.appendChild(clearBtn);
			popup.appendChild(btnRow);
			const rect = buttonElement.getBoundingClientRect();
			popup.style.position = "fixed";
			popup.style.top = `${rect.bottom + 5}px`;
			popup.style.left = `${rect.left}px`;
			popup.style.zIndex = "10002";
			document.body.appendChild(popup);
			this.activeFilterPopup = popup;
			this.activeFilterButton = buttonElement;
			const closeTimeout = setTimeout(() => {
				this.popupCloseHandler = (e) => {
					if (!popup.contains(e.target) && e.target !== buttonElement) this.closeFilterPopup();
				};
				document.addEventListener("click", this.popupCloseHandler);
			}, 10);
			this.timerRegistry.registerTimeout(closeTimeout);
		}
		/**
		* Close any open filter popup
		*/
		closeFilterPopup() {
			if (this.activeFilterPopup) {
				this.activeFilterPopup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
			}
			if (this.popupCloseHandler) {
				document.removeEventListener("click", this.popupCloseHandler);
				this.popupCloseHandler = null;
			}
		}
		/**
		* Compute profit/hr and XP/hr for an action on demand
		* @param {string} actionHrid - Action HRID
		* @param {Object} details - Action details from dataManager
		* @returns {Object|null} { profitPerHour, expPerHour }
		*/
		async computeStats(actionHrid, details, pinnedItemHrid = null) {
			try {
				let profitPerHour = null;
				let expPerHour = null;
				if (pinnedItemHrid && actionHrid.startsWith("/actions/alchemy/")) {
					const alchemyType = actionHrid.replace("/actions/alchemy/", "");
					const profitData = this._computeAlchemyStats(alchemyType, pinnedItemHrid);
					profitPerHour = profitData?.profitPerHour ?? null;
					expPerHour = profitData?.expPerHour ?? null;
				} else {
					if (GATHERING_TYPES.includes(details.type)) profitPerHour = (await calculateGatheringProfit(actionHrid))?.profitPerHour ?? null;
					else profitPerHour = (await calculateProductionProfit(actionHrid))?.profitPerHour ?? null;
					expPerHour = (0, src_utils_experience_calculator_js.calculateExpPerHour)(actionHrid)?.expPerHour ?? null;
				}
				const stats = {
					profitPerHour,
					expPerHour
				};
				if (!actionPanelSort.cachedStats) actionPanelSort.cachedStats = {};
				const cacheKey = pinnedItemHrid ? `${actionHrid}|${pinnedItemHrid}` : actionHrid;
				actionPanelSort.cachedStats[cacheKey] = stats;
				return stats;
			} catch (error) {
				console.error("[PinnedActionsPage] Failed to compute stats for", actionHrid, error);
				return null;
			}
		}
		/**
		* Compute profit/hr and XP/hr for an alchemy action + item combo
		* @param {string} alchemyType - 'coinify', 'decompose', or 'transmute'
		* @param {string} itemHrid - Item HRID
		* @returns {Object|null} { profitPerHour, expPerHour }
		*/
		_computeAlchemyStats(alchemyType, itemHrid) {
			try {
				let profitData;
				if (alchemyType === "transmute") profitData = src_features_market_alchemy_profit_calculator_js.default.calculateTransmuteProfit(itemHrid);
				else if (alchemyType === "decompose") profitData = src_features_market_alchemy_profit_calculator_js.default.calculateDecomposeProfit(itemHrid, 0);
				else profitData = src_features_market_alchemy_profit_calculator_js.default.calculateCoinifyProfit(itemHrid, 0);
				if (!profitData) return null;
				const itemLevel = src_core_data_manager_js.default.getItemDetails(itemHrid)?.itemLevel || 1;
				const fullXP = this._getAlchemyBaseXP(alchemyType, itemLevel) * (0, src_utils_experience_parser_js.calculateExperienceMultiplier)("/skills/alchemy", "/action_types/alchemy").totalMultiplier;
				const expectedXP = profitData.successRate * fullXP + (1 - profitData.successRate) * fullXP * .1;
				const expPerHour = profitData.actionsPerHour * expectedXP;
				return {
					profitPerHour: profitData.profitPerHour,
					expPerHour
				};
			} catch (error) {
				console.error("[PinnedActionsPage] Failed to compute alchemy stats:", error);
				return null;
			}
		}
		_getAlchemyBaseXP(actionType, itemLevel) {
			switch (actionType) {
				case "coinify": return itemLevel + 10;
				case "decompose": return itemLevel * 1.4 + 14;
				case "transmute": return itemLevel * 1.6 + 16;
				default: return 0;
			}
		}
		/**
		* Hide the pinned page and restore original content
		* @param {boolean} [navigatedAway=false] - True if hiding because user navigated to a skill
		*/
		hidePage(navigatedAway = false) {
			if (!this.isActive) return;
			this.closeFilterPopup();
			if (this._onPinChange) {
				actionPanelSort.offPinChange(this._onPinChange);
				this._onPinChange = null;
			}
			for (const { el, prevDisplay } of this.hiddenElements) el.style.display = prevDisplay;
			this.hiddenElements = [];
			if (this.pageContainer) {
				this.pageContainer.remove();
				this.pageContainer = null;
			}
			if (this.navigationObserver) {
				this.navigationObserver.disconnect();
				this.navigationObserver = null;
			}
			this.isActive = false;
			this.updateNavButtonState(false);
			this.stopNavClickInterceptor();
			if (!navigatedAway) this.restoreGameNav();
			else this.deactivatedNavItem = null;
		}
		/**
		* Update nav button visual state
		* @param {boolean} active - Whether the pinned page is active
		*/
		updateNavButtonState(active) {
			if (!this.navButton) return;
			if (active) {
				this.navButton.style.borderLeftColor = src_core_config_js.default.COLOR_ACCENT;
				this.navButton.style.background = "rgba(255, 255, 255, 0.08)";
			} else {
				this.navButton.style.borderLeftColor = "transparent";
				this.navButton.style.background = "";
			}
		}
		/**
		* Remove the active class from the game's currently-selected nav item
		* so that clicking it again triggers a real navigation event.
		*/
		deactivateGameNav() {
			const activeNav = document.querySelector(".NavigationBar_active__2Oj_e");
			if (activeNav) {
				this.deactivatedNavItem = activeNav;
				activeNav.classList.remove("NavigationBar_active__2Oj_e");
			}
		}
		/**
		* Restore the active class to the nav item we deactivated
		*/
		restoreGameNav() {
			if (this.deactivatedNavItem) {
				this.deactivatedNavItem.classList.add("NavigationBar_active__2Oj_e");
				this.deactivatedNavItem = null;
			}
		}
		/**
		* Start listening for clicks on game nav items while pinned page is active.
		* When a game nav item is clicked, hide the pinned page and let the game navigate.
		*/
		startNavClickInterceptor() {
			this.stopNavClickInterceptor();
			const navParent = this.navButton?.parentElement;
			if (!navParent) return;
			this.navClickInterceptor = (e) => {
				if (!this.isActive) return;
				if (this.navButton && this.navButton.contains(e.target)) return;
				if (!e.target.closest("[class*=\"NavigationBar_nav\"]")) return;
				for (const { el, prevDisplay } of this.hiddenElements) el.style.display = prevDisplay;
				this.hiddenElements = [];
				if (this.pageContainer) {
					this.pageContainer.remove();
					this.pageContainer = null;
				}
				if (this.navigationObserver) {
					this.navigationObserver.disconnect();
					this.navigationObserver = null;
				}
				this.isActive = false;
				this.updateNavButtonState(false);
				this.deactivatedNavItem = null;
				this.stopNavClickInterceptor();
			};
			navParent.addEventListener("click", this.navClickInterceptor);
		}
		/**
		* Stop the nav click interceptor
		*/
		stopNavClickInterceptor() {
			if (this.navClickInterceptor) {
				const navParent = this.navButton?.parentElement;
				if (navParent) navParent.removeEventListener("click", this.navClickInterceptor);
				this.navClickInterceptor = null;
			}
		}
		/**
		* Watch for React replacing the main panel content (user navigated to a skill)
		* @param {HTMLElement} mainPanel - The MainPanel_mainPanel element
		*/
		setupNavigationObserver(mainPanel) {
			if (this.navigationObserver) this.navigationObserver.disconnect();
			this.navigationObserver = new MutationObserver((mutations) => {
				for (const mutation of mutations) for (const node of mutation.addedNodes) if (node.nodeType === Node.ELEMENT_NODE && node !== this.pageContainer && node.className?.includes?.("MainPanel_subPanelContainer")) {
					this.hidePage(true);
					return;
				}
			});
			this.navigationObserver.observe(mainPanel, { childList: true });
		}
		/**
		* Disable the feature and clean up
		*/
		disable() {
			if (this.isActive) this.hidePage();
			if (this.navButton) {
				this.navButton.remove();
				this.navButton = null;
			}
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			if (this.navigationObserver) {
				this.navigationObserver.disconnect();
				this.navigationObserver = null;
			}
			this.closeFilterPopup();
			this.stopNavClickInterceptor();
			this.timerRegistry.clearAll();
			this.navInjected = false;
		}
	};
	var pinnedActionsPage = new PinnedActionsPage();
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
	//#region src/utils/drink-calculator.js
	/**
	* Drink Calculator Utility
	* Calculates remaining drink time and queue coverage for non-combat skill panels.
	*
	* Total remaining time per drink =
	*   currentActivationNs (from slot.duration) +
	*   inventoryCount × buffDurationNs × (1 + concentration)
	*
	* slot.duration is the remaining nanoseconds on the current activation as reported
	* by the server at last action completion. It is frozen while the skill is inactive
	* and refreshes each action cycle while active — accurate enough for hour-scale estimates.
	*/
	var FALLBACK_BUFF_DURATION_NS = 3e11;
	/**
	* Calculate remaining drink time (in seconds) for each slotted drink of an action type.
	* Deduplicates slots if the same drink is slotted more than once.
	*
	* @param {string} actionTypeHrid - e.g. "/action_types/woodcutting"
	* @returns {Array<{itemHrid: string, name: string, totalSeconds: number}>}
	*/
	function calculateDrinkRemainingSeconds(actionTypeHrid) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return [];
		const slots = src_core_data_manager_js.default.getActionDrinkSlots(actionTypeHrid);
		if (!slots?.length) return [];
		const inventory = src_core_data_manager_js.default.getInventory();
		const { equipment } = resolveActionContext(actionTypeHrid);
		const itemDetailMap = gameData.itemDetailMap || {};
		const concentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, itemDetailMap);
		const results = [];
		const seen = /* @__PURE__ */ new Set();
		for (const slot of slots) {
			if (!slot?.itemHrid) continue;
			if (seen.has(slot.itemHrid)) continue;
			seen.add(slot.itemHrid);
			const itemDetails = itemDetailMap[slot.itemHrid];
			if (!itemDetails) continue;
			const effectiveDurationNs = (itemDetails.consumableDetail?.buffs?.[0]?.duration ?? FALLBACK_BUFF_DURATION_NS) * (1 + concentration);
			const inventoryCount = inventory.filter((i) => i.itemHrid === slot.itemHrid).reduce((sum, i) => sum + (i.count || 0), 0);
			const totalNs = (slot.isActive ? slot.duration || 0 : 0) + inventoryCount * effectiveDurationNs;
			results.push({
				itemHrid: slot.itemHrid,
				name: itemDetails.name,
				totalSeconds: totalNs / 1e9
			});
		}
		return results;
	}
	/**
	* Calculate total remaining queue time in seconds for a given action type.
	* Only counts finite queued actions (infinite queues are skipped).
	*
	* @param {string} actionTypeHrid - e.g. "/action_types/woodcutting"
	* @returns {number} Total queue time in seconds, or 0 if no finite queue
	*/
	function calculateQueueTimeSeconds(actionTypeHrid) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return 0;
		const skills = src_core_data_manager_js.default.getSkills();
		const { equipment } = resolveActionContext(actionTypeHrid);
		if (!skills || !equipment) return 0;
		const queuedActions = src_core_data_manager_js.default.getCurrentActions();
		let totalSeconds = 0;
		for (const queuedAction of queuedActions) {
			if (!queuedAction.hasMaxCount) continue;
			const actionDetails = src_core_data_manager_js.default.getActionDetails(queuedAction.actionHrid);
			if (!actionDetails || actionDetails.type !== actionTypeHrid) continue;
			const remaining = queuedAction.maxCount - queuedAction.currentCount;
			if (remaining <= 0) continue;
			const stats = (0, src_utils_action_calculator_js.calculateActionStats)(actionDetails, {
				skills,
				equipment,
				itemDetailMap: gameData.itemDetailMap,
				includeCommunityBuff: true,
				includeBreakdown: false
			});
			if (!stats) continue;
			const effMultiplier = (0, src_utils_efficiency_js.calculateEfficiencyMultiplier)(stats.totalEfficiency);
			totalSeconds += remaining / effMultiplier * stats.actionTime;
		}
		return totalSeconds;
	}
	//#endregion
	//#region src/features/actions/drink-timer.js
	/**
	* Drink Timer
	* Displays remaining drink time per slot inside each non-combat skill panel's
	* consumables section. Warns when any drink falls below the configured threshold
	* and highlights if the queued actions will outlast available drink supply.
	*/
	var SECONDS_PER_HOUR = 3600;
	var DrinkTimer = class {
		constructor() {
			this.initialized = false;
			this.observers = [];
		}
		initialize() {
			if (this.initialized) return;
			const unregister = src_core_dom_observer_js.default.onClass("DrinkTimer", "GatheringProductionSkillPanel_consumablesContainer", (el) => this._updatePanel(el));
			this.observers.push(unregister);
			const unregisterAlchemy = src_core_dom_observer_js.default.onClass("DrinkTimer-Alchemy", "AlchemyPanel_consumablesContainer", (el) => this._updatePanel(el));
			this.observers.push(unregisterAlchemy);
			const unregisterEnhancing = src_core_dom_observer_js.default.onClass("DrinkTimer-Enhancing", "EnhancingPanel_consumablesContainer", (el) => this._updatePanel(el));
			this.observers.push(unregisterEnhancing);
			const onUpdate = () => this._updateAllPanels();
			src_core_data_manager_js.default.on("consumables_updated", onUpdate);
			src_core_data_manager_js.default.on("items_updated", onUpdate);
			this.observers.push(() => {
				src_core_data_manager_js.default.off("consumables_updated", onUpdate);
				src_core_data_manager_js.default.off("items_updated", onUpdate);
			});
			this._updateAllPanels();
			this.initialized = true;
		}
		_updateAllPanels() {
			document.querySelectorAll("[class*=\"GatheringProductionSkillPanel_consumablesContainer\"]").forEach((el) => {
				this._updatePanel(el);
			});
			document.querySelectorAll("[class*=\"AlchemyPanel_consumablesContainer\"]").forEach((el) => {
				this._updatePanel(el);
			});
			document.querySelectorAll("[class*=\"EnhancingPanel_consumablesContainer\"]").forEach((el) => {
				this._updatePanel(el);
			});
		}
		_updatePanel(consumablesContainer) {
			consumablesContainer.querySelector(".mwi-drink-timer")?.remove();
			const slotsEl = consumablesContainer.querySelector("[class*=\"ActionTypeConsumableSlots_actionTypeConsumableSlots\"]");
			if (!slotsEl) return;
			const actionTypeHrid = this._getActionTypeHrid(slotsEl);
			if (!actionTypeHrid || actionTypeHrid === "/action_types/combat") return;
			const drinks = calculateDrinkRemainingSeconds(actionTypeHrid);
			if (!drinks.length) return;
			const thresholdSeconds = src_core_config_js.default.getSettingValue("drinkTimer_warningThreshold", 24) * SECONDS_PER_HOUR;
			const queueSeconds = calculateQueueTimeSeconds(actionTypeHrid);
			const wrapper = document.createElement("div");
			wrapper.className = "mwi-drink-timer";
			wrapper.style.cssText = "padding: 3px 8px 4px; font-size: 11px; line-height: 1.5;";
			const drinkParts = drinks.map(({ name, totalSeconds }) => {
				return `<span style="color:${totalSeconds < SECONDS_PER_HOUR ? "#ef4444" : totalSeconds < thresholdSeconds ? "#f0a830" : "#9ca3af"};">${totalSeconds < thresholdSeconds ? "⚠ " : ""}${name}: ${this._formatTime(totalSeconds)}</span>`;
			});
			const drinkRow = document.createElement("div");
			drinkRow.innerHTML = drinkParts.join("<span style=\"color:#4b5563;\"> · </span>");
			wrapper.appendChild(drinkRow);
			if (queueSeconds > 0) {
				const minDrinkSeconds = Math.min(...drinks.map((d) => d.totalSeconds));
				const shortfall = queueSeconds - minDrinkSeconds;
				if (shortfall > 0) {
					const shortDrink = drinks.find((d) => d.totalSeconds === minDrinkSeconds);
					const queueRow = document.createElement("div");
					queueRow.style.color = "#f0a830";
					queueRow.textContent = `⚠ Queue (${this._formatTime(queueSeconds)}) outlasts ${shortDrink.name} by ${this._formatTime(shortfall)}`;
					wrapper.appendChild(queueRow);
				}
			}
			slotsEl.insertAdjacentElement("afterend", wrapper);
		}
		/**
		* Get actionTypeHrid from the ActionTypeConsumableSlots element via fiber.
		* The prop lives one level up in the return fiber.
		*/
		_getActionTypeHrid(slotsEl) {
			const root = document.getElementById("root");
			const rootFiber = root?._reactRootContainer?.current || root?._reactRootContainer?._internalRoot?.current;
			if (!rootFiber) return null;
			function walk(f, target) {
				if (!f) return null;
				if (f.stateNode === target) return f;
				return walk(f.child, target) || walk(f.sibling, target);
			}
			return walk(rootFiber, slotsEl)?.return?.memoizedProps?.actionTypeHrid ?? null;
		}
		_formatTime(seconds) {
			if (seconds <= 0) return "0m";
			const h = Math.floor(seconds / SECONDS_PER_HOUR);
			const m = Math.floor(seconds % SECONDS_PER_HOUR / 60);
			if (h >= 48) return `${Math.round(seconds / 86400)}d`;
			if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`;
			return `${m}m`;
		}
		cleanup() {
			this.observers.forEach((fn) => fn());
			this.observers = [];
			document.querySelectorAll(".mwi-drink-timer").forEach((el) => el.remove());
			this.initialized = false;
		}
	};
	var drinkTimer = new DrinkTimer();
	var drink_timer_default = {
		name: "Drink Timer",
		initialize: () => drinkTimer.initialize(),
		cleanup: () => drinkTimer.cleanup()
	};
	//#endregion
	//#region src/features/alchemy/alchemy-profit-display.js
	/**
	* Alchemy Profit Display Module
	* Displays profit calculator in alchemy action detail panel
	*/
	var AlchemyProfitDisplay = class {
		constructor() {
			this.isActive = false;
			this.unregisterObserver = null;
			this.contentObserver = null;
			this.tabObserver = null;
			this.displayElement = null;
			this.updateTimeout = null;
			this.lastFingerprint = null;
			this.isInitialized = false;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.equipmentChangeHandler = null;
			this.sectionExpanded = /* @__PURE__ */ new Map();
			this.cachedInputField = null;
			this._alchemyTargetLevel = null;
		}
		/**
		* Initialize the display system
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("alchemy_profitDisplay")) return;
			this.isInitialized = true;
			this.setupObserver();
			this.equipmentChangeHandler = () => {
				clearTimeout(this.equipmentChangeTimeout);
				this.equipmentChangeTimeout = setTimeout(() => {
					if (this.isActive) {
						this.lastFingerprint = null;
						this.checkAndUpdateDisplay();
					}
				}, 100);
			};
			src_core_data_manager_js.default.on("items_updated", this.equipmentChangeHandler);
			this.consumablesChangeHandler = () => {
				clearTimeout(this.consumablesChangeTimeout);
				this.consumablesChangeTimeout = setTimeout(() => {
					if (this.isActive) {
						this.lastFingerprint = null;
						this.checkAndUpdateDisplay();
					}
				}, 300);
			};
			src_core_data_manager_js.default.on("consumables_updated", this.consumablesChangeHandler);
			this.isActive = true;
		}
		/**
		* Setup DOM observer to watch for alchemy panel
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("AlchemyProfitDisplay", "SkillActionDetail_alchemyComponent", (alchemyComponent) => {
				this.checkAndUpdateDisplay();
				this.setupContentObserver(alchemyComponent);
			}, {
				debounce: true,
				debounceDelay: 150
			});
			const existingComponent = document.querySelector("[class*=\"SkillActionDetail_alchemyComponent\"]");
			if (existingComponent) {
				this.checkAndUpdateDisplay();
				this.setupContentObserver(existingComponent);
			}
		}
		/**
		* Setup observer for content changes within alchemy component
		* Watches for tab switches and item selection changes
		* @param {HTMLElement} alchemyComponent - The alchemy component container
		*/
		setupContentObserver(alchemyComponent) {
			if (this.contentObserver) this.contentObserver.disconnect();
			if (this.tabObserver) this.tabObserver.disconnect();
			let debounceTimer = null;
			const triggerUpdate = () => {
				if (debounceTimer) clearTimeout(debounceTimer);
				debounceTimer = setTimeout(() => {
					this.checkAndUpdateDisplay();
				}, 50);
			};
			const tabContainer = document.querySelector("[class*=\"AlchemyPanel_tabsComponentContainer\"]");
			if (tabContainer) {
				this.tabObserver = new MutationObserver((mutations) => {
					for (const mutation of mutations) if (mutation.type === "attributes" && mutation.attributeName === "aria-selected") {
						if (mutation.target.getAttribute("aria-selected") === "true") {
							triggerUpdate();
							return;
						}
					}
				});
				this.tabObserver.observe(tabContainer, {
					attributes: true,
					attributeFilter: ["aria-selected"],
					subtree: true
				});
			}
			this.contentObserver = new MutationObserver((mutations) => {
				for (const mutation of mutations) {
					if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
						let el = mutation.target;
						while (el && el !== alchemyComponent) {
							if (typeof el.className === "string" && el.className.includes("catalystItemInputContainer")) {
								triggerUpdate();
								break;
							}
							el = el.parentElement;
						}
						for (const node of mutation.addedNodes) if (node.nodeType === Node.ELEMENT_NODE) {
							const className = node.className || "";
							if (typeof className === "string" && (className.includes("SkillActionDetail_itemRequirements") || className.includes("SkillActionDetail_alchemyOutput") || className.includes("SkillActionDetail_primaryItemSelectorContainer") || className.includes("SkillActionDetail_instructions"))) {
								triggerUpdate();
								return;
							}
						}
					}
					if (mutation.type === "attributes") {
						if (mutation.target.tagName === "use" && (mutation.attributeName === "href" || mutation.attributeName === "xlink:href")) {
							triggerUpdate();
							return;
						}
					}
				}
			});
			this.contentObserver.observe(alchemyComponent, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ["href", "xlink:href"]
			});
		}
		/**
		* Check DOM state and update display accordingly
		* Pattern from enhancement-ui.js
		*/
		checkAndUpdateDisplay() {
			const alchemyComponent = document.querySelector("[class*=\"SkillActionDetail_alchemyComponent\"]");
			const instructionsEl = document.querySelector("[class*=\"SkillActionDetail_instructions\"]");
			const infoContainer = document.querySelector("[class*=\"SkillActionDetail_info\"]");
			const shouldShow = alchemyComponent && !instructionsEl && infoContainer;
			if (shouldShow && (!this.displayElement || !this.displayElement.parentNode)) this.handleAlchemyPanelUpdate(alchemyComponent);
			else if (!shouldShow && this.displayElement?.parentNode) this.removeDisplay();
			else if (shouldShow && this.displayElement?.parentNode) {
				if (alchemyProfit.getStateFingerprint() !== this.lastFingerprint) this.handleAlchemyPanelUpdate(alchemyComponent);
			}
		}
		/**
		* Handle alchemy panel update
		* @param {HTMLElement} alchemyComponent - Alchemy component container
		*/
		handleAlchemyPanelUpdate(alchemyComponent) {
			const infoContainer = alchemyComponent.querySelector("[class*=\"SkillActionDetail_info\"]");
			if (!infoContainer) {
				this.removeDisplay();
				return;
			}
			const fingerprint = alchemyProfit.getStateFingerprint();
			if (fingerprint === this.lastFingerprint && this.displayElement?.parentNode) return;
			this.lastFingerprint = fingerprint;
			if (this.updateTimeout) clearTimeout(this.updateTimeout);
			this.updateTimeout = setTimeout(() => {
				this.updateDisplay(infoContainer);
			}, 100);
			this.timerRegistry.registerTimeout(this.updateTimeout);
		}
		/**
		* Update or create profit display
		* @param {HTMLElement} infoContainer - Info container to append display to
		*/
		async updateDisplay(infoContainer) {
			try {
				const actionHrid = alchemyProfit.getCurrentActionHrid();
				let profitData = null;
				const drops = await alchemyProfit.extractDrops(actionHrid);
				const requirements = await alchemyProfit.extractRequirements();
				let isCoinify = false;
				let isTransmute = false;
				let isDecompose = false;
				const tabText = (document.querySelector("[class*=\"AlchemyPanel_tabsComponentContainer\"]")?.querySelector("[role=\"tab\"][aria-selected=\"true\"]"))?.textContent?.trim()?.toLowerCase() || "";
				if (tabText.includes("coinify")) isCoinify = true;
				else if (tabText.includes("transmute")) isTransmute = true;
				else if (tabText.includes("decompose")) isDecompose = true;
				else if (actionHrid) {
					isCoinify = actionHrid === "/actions/alchemy/coinify";
					isTransmute = actionHrid === "/actions/alchemy/transmute";
					isDecompose = actionHrid === "/actions/alchemy/decompose";
				} else {
					isCoinify = drops.length > 0 && drops[0].itemHrid === "/items/coin";
					if (!isCoinify && requirements && requirements.length > 0) {
						const reqItemHrid = requirements[0].itemHrid;
						const reqItemDetails = src_core_data_manager_js.default.getItemDetails(reqItemHrid);
						const hasDecompose = Array.isArray(reqItemDetails?.alchemyDetail?.decomposeItems) && reqItemDetails.alchemyDetail.decomposeItems.length > 0;
						const hasTransmute = !!reqItemDetails?.alchemyDetail?.transmuteDropTable;
						if (hasDecompose && !hasTransmute) isDecompose = true;
						else if (hasTransmute) isTransmute = true;
						else if (hasDecompose) isDecompose = true;
					}
				}
				if (isCoinify) {
					if (requirements && requirements.length > 0) {
						const itemHrid = requirements[0].itemHrid;
						const enhancementLevel = requirements[0].enhancementLevel || 0;
						profitData = src_features_market_alchemy_profit_calculator_js.default.calculateCoinifyProfit(itemHrid, enhancementLevel, true);
					}
				} else if (isTransmute) {
					if (requirements && requirements.length > 0) {
						const itemHrid = requirements[0].itemHrid;
						profitData = src_features_market_alchemy_profit_calculator_js.default.calculateTransmuteProfit(itemHrid, true);
					}
				} else if ((isDecompose || !isCoinify && !isTransmute) && requirements && requirements.length > 0) {
					const itemHrid = requirements[0].itemHrid;
					const enhancementLevel = requirements[0].enhancementLevel || 0;
					profitData = src_features_market_alchemy_profit_calculator_js.default.calculateDecomposeProfit(itemHrid, enhancementLevel, true);
				}
				if (!profitData) {
					this.removeDisplay();
					return;
				}
				let actionType = null;
				if (isCoinify) actionType = "coinify";
				else if (isDecompose) actionType = "decompose";
				else if (isTransmute) actionType = "transmute";
				const itemHrid = requirements && requirements.length > 0 ? requirements[0].itemHrid : null;
				this.createDisplay(infoContainer, profitData, actionType, itemHrid);
			} catch (error) {
				console.error("[AlchemyProfitDisplay] Failed to update display:", error);
				this.removeDisplay();
			}
		}
		/**
		* Create a collapsible section that persists its expanded state across display rebuilds.
		* Uses this.sectionExpanded as the source of truth so concurrent rebuilds always
		* create sections in the correct state without any save/restore timing issues.
		* @param {string} icon - Icon/emoji (or empty string)
		* @param {string} title - Section title
		* @param {string|null} summary - Collapsed summary text
		* @param {HTMLElement} content - Content element
		* @param {boolean} defaultOpen - Initial state if not yet tracked
		* @param {number} indent - Indentation level
		* @returns {HTMLElement} Section element
		*/
		createTrackedCollapsible(icon, title, summary, content, defaultOpen = false, indent = 0) {
			const key = (icon ? `${icon} ${title}` : title).replace(/:.+$/, "").trim();
			const isOpen = this.sectionExpanded.has(key) ? this.sectionExpanded.get(key) : defaultOpen;
			const section = (0, src_utils_ui_components_js.createCollapsibleSection)(icon, title, summary, content, isOpen, indent);
			section.querySelector(".mwi-section-header").addEventListener("click", () => {
				const contentEl = section.querySelector(".mwi-section-content");
				this.sectionExpanded.set(key, contentEl.style.display === "block");
			});
			return section;
		}
		/**
		* Create profit display element with detailed breakdown
		* @param {HTMLElement} container - Container to append to
		* @param {Object} profitData - Profit calculation results from calculateProfit()
		* @param {string} actionType - Alchemy action type ('coinify', 'decompose', or 'transmute')
		* @param {string} itemHrid - Item HRID being processed
		*/
		createDisplay(container, profitData, actionType, itemHrid) {
			this.removeDisplay();
			if (!src_core_config_js.default.getSetting("actionPanel_showProfitDetail")) return;
			if (!profitData || !profitData.dropRevenues || !profitData.requirementCosts || !profitData.catalystCost || !profitData.consumableCosts) {
				console.error("[AlchemyProfitDisplay] Missing required profit data fields:", profitData);
				return;
			}
			const profit = Math.round(profitData.profitPerHour);
			const profitPerDay = Math.round(profitData.profitPerDay);
			const revenue = Math.round(profitData.revenuePerHour);
			const costs = Math.round(profitData.materialCostPerHour + profitData.catalystCostPerHour + profitData.totalTeaCostPerHour);
			const summary = `${(0, src_utils_formatters_js.formatLargeNumber)(profit)}/hr, ${(0, src_utils_formatters_js.formatLargeNumber)(profitPerDay)}/day`;
			const detailsContent = document.createElement("div");
			const revenueDiv = document.createElement("div");
			revenueDiv.innerHTML = `<div style="font-weight: 500; color: var(--text-color-primary, #fff); margin-bottom: 4px;">Revenue: ${(0, src_utils_formatters_js.formatLargeNumber)(revenue)}/hr</div>`;
			const normalDrops = profitData.dropRevenues.filter((drop) => !drop.isEssence && !drop.isRare);
			const essenceDrops = profitData.dropRevenues.filter((drop) => drop.isEssence);
			const rareDrops = profitData.dropRevenues.filter((drop) => drop.isRare);
			if (normalDrops.length > 0) {
				const normalDropsContent = document.createElement("div");
				let normalDropsRevenue = 0;
				for (const drop of normalDrops) {
					const itemName = src_core_data_manager_js.default.getItemDetails(drop.itemHrid)?.name || drop.itemHrid;
					const decimals = 2;
					const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
					const dropsDisplay = drop.dropsPerHour >= 1e4 ? (0, src_utils_formatters_js.formatLargeNumber)(Math.round(drop.dropsPerHour)) : drop.dropsPerHour.toFixed(decimals);
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					if (drop.isSelfReturn) {
						line.style.textDecoration = "line-through";
						line.style.opacity = "0.6";
					}
					line.textContent = `• ${itemName}: ${dropsDisplay}/hr (${dropRatePct} × ${(0, src_utils_formatters_js.formatPercentage)(profitData.successRate, 1)} success) @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(drop.price))} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(drop.revenuePerHour))}/hr`;
					normalDropsContent.appendChild(line);
					normalDropsRevenue += drop.revenuePerHour;
				}
				const normalDropsSection = this.createTrackedCollapsible("", `Normal Drops: ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(normalDropsRevenue))}/hr (${normalDrops.length} item${normalDrops.length !== 1 ? "s" : ""})`, null, normalDropsContent, false, 1);
				revenueDiv.appendChild(normalDropsSection);
			}
			if (essenceDrops.length > 0) {
				const essenceContent = document.createElement("div");
				let essenceRevenue = 0;
				for (const drop of essenceDrops) {
					const itemName = src_core_data_manager_js.default.getItemDetails(drop.itemHrid)?.name || drop.itemHrid;
					const decimals = 2;
					const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					line.textContent = `• ${itemName}: ${drop.dropsPerHour.toFixed(decimals)}/hr (${dropRatePct}, not affected by success rate) @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(drop.price))} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(drop.revenuePerHour))}/hr`;
					essenceContent.appendChild(line);
					essenceRevenue += drop.revenuePerHour;
				}
				const essenceSection = this.createTrackedCollapsible("", `Essence Drops: ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(essenceRevenue))}/hr (${essenceDrops.length} item${essenceDrops.length !== 1 ? "s" : ""})`, null, essenceContent, false, 1);
				revenueDiv.appendChild(essenceSection);
			}
			if (rareDrops.length > 0) {
				const rareContent = document.createElement("div");
				let rareRevenue = 0;
				for (const drop of rareDrops) {
					const itemName = src_core_data_manager_js.default.getItemDetails(drop.itemHrid)?.name || drop.itemHrid;
					const decimals = drop.dropsPerHour < 1 ? 2 : 1;
					const baseDropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
					const effectiveDropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.effectiveDropRate, drop.effectiveDropRate < .01 ? 3 : 2);
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					if (profitData.rareFindBreakdown && profitData.rareFindBreakdown.total > 0) {
						const rareFindBonus = `${profitData.rareFindBreakdown.total.toFixed(2)}%`;
						line.textContent = `• ${itemName}: ${drop.dropsPerHour.toFixed(decimals)}/hr (${baseDropRatePct} base × ${rareFindBonus} rare find = ${effectiveDropRatePct}, not affected by success rate) @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(drop.price))} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(drop.revenuePerHour))}/hr`;
					} else line.textContent = `• ${itemName}: ${drop.dropsPerHour.toFixed(decimals)}/hr (${baseDropRatePct}, not affected by success rate) @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(drop.price))} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(drop.revenuePerHour))}/hr`;
					rareContent.appendChild(line);
					rareRevenue += drop.revenuePerHour;
				}
				const rareSection = this.createTrackedCollapsible("", `Rare Drops: ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(rareRevenue))}/hr (${rareDrops.length} item${rareDrops.length !== 1 ? "s" : ""})`, null, rareContent, false, 1);
				revenueDiv.appendChild(rareSection);
			}
			const costsDiv = document.createElement("div");
			costsDiv.innerHTML = `<div style="font-weight: 500; color: var(--text-color-primary, #fff); margin-top: 12px; margin-bottom: 4px;">Costs: ${(0, src_utils_formatters_js.formatLargeNumber)(costs)}/hr</div>`;
			if (profitData.requirementCosts && profitData.requirementCosts.length > 0) {
				const materialCostsContent = document.createElement("div");
				for (const material of profitData.requirementCosts) {
					const itemName = src_core_data_manager_js.default.getItemDetails(material.itemHrid)?.name || material.itemHrid;
					const amountPerHour = material.count * profitData.actionsPerHour;
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					const enhText = material.enhancementLevel > 0 ? ` +${material.enhancementLevel}` : "";
					const formattedAmount = amountPerHour >= 1e4 ? (0, src_utils_formatters_js.formatLargeNumber)(amountPerHour) : (0, src_utils_formatters_js.formatWithSeparator)(amountPerHour.toFixed(2));
					if (material.enhancementLevel > 0 && material.decompositionValuePerHour > 0) {
						const netCostPerHour = material.costPerHour - material.decompositionValuePerHour;
						line.textContent = `• ${itemName}${enhText}: ${formattedAmount}/hr @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(material.price))} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(material.costPerHour))}/hr (recovers ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(material.decompositionValuePerHour))}/hr, net ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(netCostPerHour))}/hr)`;
					} else line.textContent = `• ${itemName}${enhText}: ${formattedAmount}/hr (consumed on all attempts) @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(material.price))} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(material.costPerHour))}/hr`;
					materialCostsContent.appendChild(line);
				}
				const materialCostsSection = this.createTrackedCollapsible("", `Material Costs: ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(profitData.materialCostPerHour))}/hr (${profitData.requirementCosts.length} material${profitData.requirementCosts.length !== 1 ? "s" : ""})`, null, materialCostsContent, false, 1);
				costsDiv.appendChild(materialCostsSection);
			}
			if (profitData.catalystCost && profitData.catalystCost.itemHrid) {
				const catalystContent = document.createElement("div");
				const itemName = src_core_data_manager_js.default.getItemDetails(profitData.catalystCost.itemHrid)?.name || profitData.catalystCost.itemHrid;
				const catalystsPerHour = profitData.actionsPerHour * profitData.successRate;
				const formattedCatalystAmount = catalystsPerHour >= 1e4 ? (0, src_utils_formatters_js.formatLargeNumber)(catalystsPerHour) : (0, src_utils_formatters_js.formatWithSeparator)(catalystsPerHour.toFixed(2));
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				line.textContent = `• ${itemName}: ${formattedCatalystAmount}/hr (consumed only on success, ${(0, src_utils_formatters_js.formatPercentage)(profitData.successRate, 2)}) @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(profitData.catalystCost.price))} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(profitData.catalystCost.costPerHour))}/hr`;
				catalystContent.appendChild(line);
				const catalystSection = this.createTrackedCollapsible("", `Catalyst Cost: ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(profitData.catalystCost.costPerHour))}/hr`, null, catalystContent, false, 1);
				costsDiv.appendChild(catalystSection);
			}
			if (profitData.consumableCosts && profitData.consumableCosts.length > 0) {
				const drinkCostsContent = document.createElement("div");
				for (const drink of profitData.consumableCosts) {
					const itemName = src_core_data_manager_js.default.getItemDetails(drink.itemHrid)?.name || drink.itemHrid;
					const formattedDrinkAmount = drink.drinksPerHour >= 1e4 ? (0, src_utils_formatters_js.formatLargeNumber)(drink.drinksPerHour) : (0, src_utils_formatters_js.formatWithSeparator)(drink.drinksPerHour.toFixed(2));
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					line.textContent = `• ${itemName}: ${formattedDrinkAmount}/hr @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(drink.price))} → ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(drink.costPerHour))}/hr`;
					drinkCostsContent.appendChild(line);
				}
				const drinkCount = profitData.consumableCosts.length;
				const drinkCostsSection = this.createTrackedCollapsible("", `Drink Costs: ${(0, src_utils_formatters_js.formatLargeNumber)(Math.round(profitData.totalTeaCostPerHour))}/hr (${drinkCount} drink${drinkCount !== 1 ? "s" : ""})`, null, drinkCostsContent, false, 1);
				costsDiv.appendChild(drinkCostsSection);
			}
			const modifiersDiv = document.createElement("div");
			modifiersDiv.style.cssText = `
            margin-top: 12px;
        `;
			const modifiersHeader = document.createElement("div");
			modifiersHeader.style.cssText = "font-weight: 500; color: var(--text-color-primary, #fff); margin-bottom: 4px;";
			modifiersHeader.textContent = "Modifiers:";
			modifiersDiv.appendChild(modifiersHeader);
			if (profitData.successRateBreakdown) {
				const successBreakdown = profitData.successRateBreakdown;
				const successContent = document.createElement("div");
				const line = document.createElement("div");
				line.style.marginLeft = "8px";
				line.textContent = `• Base Success Rate: ${(0, src_utils_formatters_js.formatPercentage)(successBreakdown.base, 1)}`;
				successContent.appendChild(line);
				if (successBreakdown.tea > 0) {
					const teaLine = document.createElement("div");
					teaLine.style.marginLeft = "8px";
					teaLine.textContent = `• Tea Bonus: +${(0, src_utils_formatters_js.formatPercentage)(successBreakdown.tea, 1)} (multiplicative)`;
					successContent.appendChild(teaLine);
				}
				const successSection = this.createTrackedCollapsible("", `Success Rate: ${(0, src_utils_formatters_js.formatPercentage)(profitData.successRate, 1)}`, null, successContent, false, 1);
				modifiersDiv.appendChild(successSection);
			} else {
				const successRateLine = document.createElement("div");
				successRateLine.style.marginLeft = "8px";
				successRateLine.textContent = `• Success Rate: ${(0, src_utils_formatters_js.formatPercentage)(profitData.successRate, 1)}`;
				modifiersDiv.appendChild(successRateLine);
			}
			if (profitData.efficiencyBreakdown) {
				const effBreakdown = profitData.efficiencyBreakdown;
				const effContent = document.createElement("div");
				if (effBreakdown.levelEfficiency > 0) {
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					line.textContent = `• Level Bonus: +${effBreakdown.levelEfficiency.toFixed(2)}%`;
					effContent.appendChild(line);
				}
				if (effBreakdown.houseEfficiency > 0) {
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					line.textContent = `• House Bonus: +${effBreakdown.houseEfficiency.toFixed(2)}%`;
					effContent.appendChild(line);
				}
				if (effBreakdown.teaEfficiency > 0) {
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					line.textContent = `• Tea Bonus: +${effBreakdown.teaEfficiency.toFixed(2)}%`;
					effContent.appendChild(line);
				}
				if (effBreakdown.equipmentEfficiency > 0) {
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					line.textContent = `• Equipment Bonus: +${effBreakdown.equipmentEfficiency.toFixed(2)}%`;
					effContent.appendChild(line);
				}
				if (effBreakdown.communityEfficiency > 0) {
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					line.textContent = `• Community Buff: +${effBreakdown.communityEfficiency.toFixed(2)}%`;
					effContent.appendChild(line);
				}
				if (effBreakdown.achievementEfficiency > 0) {
					const line = document.createElement("div");
					line.style.marginLeft = "8px";
					line.textContent = `• Achievement Bonus: +${effBreakdown.achievementEfficiency.toFixed(2)}%`;
					effContent.appendChild(line);
				}
				const effSection = this.createTrackedCollapsible("", `Efficiency: +${(0, src_utils_formatters_js.formatPercentage)(profitData.efficiency, 1)}`, null, effContent, false, 1);
				modifiersDiv.appendChild(effSection);
			}
			if (profitData.actionSpeedBreakdown) {
				const speedBreakdown = profitData.actionSpeedBreakdown;
				const actionSpeed = 20 / profitData.actionTime - 1;
				if (actionSpeed > 0) {
					const speedContent = document.createElement("div");
					if (speedBreakdown.equipment > 0) {
						const line = document.createElement("div");
						line.style.marginLeft = "8px";
						line.textContent = `• Equipment Bonus: +${(0, src_utils_formatters_js.formatPercentage)(speedBreakdown.equipment, 1)}`;
						speedContent.appendChild(line);
					}
					if (speedBreakdown.tea > 0) {
						const line = document.createElement("div");
						line.style.marginLeft = "8px";
						line.textContent = `• Tea Bonus: +${(0, src_utils_formatters_js.formatPercentage)(speedBreakdown.tea, 1)}`;
						speedContent.appendChild(line);
					}
					const speedSection = this.createTrackedCollapsible("", `Action Speed: +${(0, src_utils_formatters_js.formatPercentage)(actionSpeed, 1)}`, null, speedContent, false, 1);
					modifiersDiv.appendChild(speedSection);
				}
			}
			if (profitData.rareFindBreakdown) {
				const rareBreakdown = profitData.rareFindBreakdown;
				if (rareBreakdown.total > 0) {
					const rareContent = document.createElement("div");
					if (rareBreakdown.equipment > 0) {
						const line = document.createElement("div");
						line.style.marginLeft = "8px";
						line.textContent = `• Equipment Bonus: +${rareBreakdown.equipment.toFixed(2)}%`;
						rareContent.appendChild(line);
					}
					if (rareBreakdown.house > 0) {
						const line = document.createElement("div");
						line.style.marginLeft = "8px";
						line.textContent = `• House Bonus: +${rareBreakdown.house.toFixed(2)}%`;
						rareContent.appendChild(line);
					}
					if (rareBreakdown.achievement > 0) {
						const line = document.createElement("div");
						line.style.marginLeft = "8px";
						line.textContent = `• Achievement Bonus: +${rareBreakdown.achievement.toFixed(2)}%`;
						rareContent.appendChild(line);
					}
					const rareSection = this.createTrackedCollapsible("", `Rare Find: +${rareBreakdown.total.toFixed(2)}%`, null, rareContent, false, 1);
					modifiersDiv.appendChild(rareSection);
				}
			}
			if (profitData.essenceFindBreakdown) {
				const essenceBreakdown = profitData.essenceFindBreakdown;
				if (essenceBreakdown.total > 0) {
					const essenceContent = document.createElement("div");
					if (essenceBreakdown.equipment > 0) {
						const line = document.createElement("div");
						line.style.marginLeft = "8px";
						line.textContent = `• Equipment Bonus: +${essenceBreakdown.equipment.toFixed(2)}%`;
						essenceContent.appendChild(line);
					}
					const essenceSection = this.createTrackedCollapsible("", `Essence Find: +${essenceBreakdown.total.toFixed(2)}%`, null, essenceContent, false, 1);
					modifiersDiv.appendChild(essenceSection);
				}
			}
			detailsContent.appendChild(revenueDiv);
			detailsContent.appendChild(costsDiv);
			detailsContent.appendChild(modifiersDiv);
			const topLevelContent = document.createElement("div");
			topLevelContent.innerHTML = `
            <div style="margin-bottom: 4px;">Actions: ${profitData.actionsPerHour.toFixed(2)}/hr | Success Rate: ${(0, src_utils_formatters_js.formatPercentage)(profitData.successRate, 2)}</div>
        `;
			const profitColor = profit >= 0 ? "#4ade80" : src_core_config_js.default.getSetting("color_loss") || "#f87171";
			const netProfitLine = document.createElement("div");
			netProfitLine.style.cssText = `
            font-weight: 500;
            color: ${profitColor};
            margin-bottom: 8px;
        `;
			netProfitLine.textContent = `Net Profit: ${(0, src_utils_formatters_js.formatLargeNumber)(profit)}/hr, ${(0, src_utils_formatters_js.formatLargeNumber)(profitPerDay)}/day`;
			topLevelContent.appendChild(netProfitLine);
			const pricingMode = profitData.pricingMode || "hybrid";
			const modeLabel = src_core_config_js.default.getPricingModeLabel(pricingMode);
			const modeDiv = document.createElement("div");
			modeDiv.style.cssText = `
            margin-bottom: 8px;
            color: #888;
            font-size: 0.85em;
        `;
			modeDiv.textContent = `Pricing Mode: ${modeLabel}`;
			topLevelContent.appendChild(modeDiv);
			const detailedBreakdownSection = this.createTrackedCollapsible("📊", "Detailed Breakdown", null, detailsContent, false, 0);
			topLevelContent.appendChild(detailedBreakdownSection);
			const profitSection = this.createTrackedCollapsible("💰", "Profitability", summary, topLevelContent, false, 0);
			profitSection.id = "mwi-alchemy-profit";
			profitSection.classList.add("mwi-alchemy-profit");
			profitSection.setAttribute("data-mwi-profit-display", "true");
			container.appendChild(profitSection);
			const inputField = (document.querySelector("[class*=\"SkillActionDetail_alchemyComponent\"]")?.querySelector("[class*=\"maxActionCountInput\"]"))?.querySelector("input");
			if (inputField) this.cachedInputField = inputField;
			const effectiveInputField = inputField || this.cachedInputField;
			if (effectiveInputField && profitData.actionTime && profitData.efficiencyBreakdown) {
				const speedTimeSection = this.createActionSpeedTimeSection(profitData, effectiveInputField);
				if (speedTimeSection) {
					speedTimeSection.id = "mwi-alchemy-speed-time";
					speedTimeSection.classList.add("mwi-alchemy-speed-time");
					speedTimeSection.setAttribute("data-mwi-profit-display", "true");
					container.appendChild(speedTimeSection);
				}
			}
			if (actionType && itemHrid) {
				const levelProgressSection = this.createLevelProgressSection(actionType, itemHrid, profitData);
				if (levelProgressSection) {
					levelProgressSection.id = "mwi-alchemy-level-progress";
					levelProgressSection.classList.add("mwi-alchemy-level-progress");
					levelProgressSection.setAttribute("data-mwi-profit-display", "true");
					container.appendChild(levelProgressSection);
				}
			}
			this.displayElement = profitSection;
		}
		/**
		* Calculate alchemy base XP based on action type and item level
		* @param {string} actionType - 'coinify', 'decompose', or 'transmute'
		* @param {number} itemLevel - Item level from itemDetailMap
		* @returns {number} Base XP before wisdom multiplier
		*/
		getAlchemyBaseXP(actionType, itemLevel) {
			switch (actionType) {
				case "coinify": return itemLevel + 10;
				case "decompose": return itemLevel * 1.4 + 14;
				case "transmute": return itemLevel * 1.6 + 16;
				default: return 0;
			}
		}
		/**
		* Calculate expected XP per action accounting for success rate and wisdom
		* @param {string} actionType - Alchemy action type
		* @param {string} itemHrid - Item HRID
		* @param {number} successRate - Success rate (0-1)
		* @returns {number} Expected XP per action
		*/
		calculateAlchemyXPPerAction(actionType, itemHrid, successRate) {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData || !itemHrid) return 0;
			const itemDetails = gameData.itemDetailMap?.[itemHrid];
			if (!itemDetails) return 0;
			const baseXP = this.getAlchemyBaseXP(actionType, itemDetails.itemLevel || 0);
			if (baseXP === 0) return 0;
			const successXP = baseXP * (0, src_utils_experience_parser_js.calculateExperienceMultiplier)("/skills/alchemy", "/action_types/alchemy").totalMultiplier;
			const failureXP = successXP * .1;
			return successRate * successXP + (1 - successRate) * failureXP;
		}
		/**
		* Create Action Speed & Time section
		* @param {Object} profitData - Profit data with action time and efficiency
		* @param {HTMLInputElement} inputField - Repeat input field
		* @returns {HTMLElement|null} Action Speed & Time section element
		*/
		createActionSpeedTimeSection(profitData, inputField) {
			try {
				const actionTime = profitData.actionTime;
				const actionsPerHourBase = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime);
				const efficiencyMultiplier = 1 + profitData.efficiency;
				const effectiveActionsPerHour = Math.round(actionsPerHourBase * efficiencyMultiplier);
				const content = document.createElement("div");
				content.style.cssText = `
                color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
                font-size: 0.9em;
                line-height: 1.6;
            `;
				const lines = [];
				lines.push(`Base: ${20 .toFixed(2)}s → ${actionTime.toFixed(2)}s`);
				lines.push(`${(0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime).toFixed(0)}/hr`);
				if (profitData.actionSpeedBreakdown && profitData.actionSpeedBreakdown.total > 0) {
					const speedBonus = profitData.actionSpeedBreakdown.total;
					lines.push(`Speed: +${(0, src_utils_formatters_js.formatPercentage)(speedBonus, 1)}`);
					const speedBreakdown = profitData.actionSpeedBreakdown;
					if (speedBreakdown.equipmentDetails && speedBreakdown.equipmentDetails.length > 0) for (const item of speedBreakdown.equipmentDetails) {
						const enhText = item.enhancementLevel > 0 ? ` +${item.enhancementLevel}` : "";
						lines.push(`  - ${item.name}${enhText}: +${(0, src_utils_formatters_js.formatPercentage)(item.speedBonus, 1)}`);
					}
					else if (speedBreakdown.equipment > 0) lines.push(`  - Equipment: +${(0, src_utils_formatters_js.formatPercentage)(speedBreakdown.equipment, 1)}`);
					if (speedBreakdown.teaDetails && speedBreakdown.teaDetails.length > 0) for (const tea of speedBreakdown.teaDetails) lines.push(`  - ${tea.name}: +${(0, src_utils_formatters_js.formatPercentage)(tea.speedBonus, 1)}`);
					else if (speedBreakdown.tea > 0) lines.push(`  - Tea: +${(0, src_utils_formatters_js.formatPercentage)(speedBreakdown.tea, 1)}`);
				}
				lines.push("");
				lines.push(`<span style="font-weight: 500; color: var(--text-color-primary, ${src_core_config_js.default.COLOR_TEXT_PRIMARY});">Efficiency: +${(profitData.efficiency * 100).toFixed(2)}% → Output: ×${efficiencyMultiplier.toFixed(2)} (${effectiveActionsPerHour}/hr)</span>`);
				const effBreakdown = profitData.efficiencyBreakdown;
				if (effBreakdown.levelEfficiency > 0) lines.push(`  - Level: +${effBreakdown.levelEfficiency.toFixed(2)}%`);
				if (effBreakdown.houseEfficiency > 0) lines.push(`  - House: +${effBreakdown.houseEfficiency.toFixed(2)}%`);
				if (effBreakdown.equipmentEfficiency > 0) lines.push(`  - Equipment: +${effBreakdown.equipmentEfficiency.toFixed(2)}%`);
				if (effBreakdown.teaEfficiency > 0) lines.push(`  - Tea: +${effBreakdown.teaEfficiency.toFixed(2)}%`);
				if (effBreakdown.achievementEfficiency > 0) lines.push(`  - Achievement: +${effBreakdown.achievementEfficiency.toFixed(2)}%`);
				if (effBreakdown.communityEfficiency > 0) lines.push(`  - Community: +${effBreakdown.communityEfficiency.toFixed(2)}%`);
				const totalTimeLine = document.createElement("div");
				totalTimeLine.style.cssText = `
                color: var(--text-color-main, ${src_core_config_js.default.COLOR_INFO});
                font-weight: 500;
                margin-top: 4px;
            `;
				const updateTotalTime = () => {
					const inputValue = inputField.value;
					if (inputValue === "∞") {
						totalTimeLine.textContent = "Total time: ∞";
						return;
					}
					const repeatCount = parseInt(inputValue) || 0;
					if (repeatCount > 0) {
						const totalSeconds = Math.ceil(repeatCount / efficiencyMultiplier) * actionTime;
						totalTimeLine.textContent = `Total time: ${(0, src_utils_formatters_js.timeReadable)(totalSeconds)}`;
					} else totalTimeLine.textContent = "Total time: 0s";
				};
				lines.push("");
				content.innerHTML = lines.join("<br>");
				content.appendChild(totalTimeLine);
				updateTotalTime();
				const updateOnInput = () => updateTotalTime();
				const updateOnChange = () => updateTotalTime();
				inputField.addEventListener("input", updateOnInput);
				inputField.addEventListener("change", updateOnChange);
				const getSummary = () => {
					const inputValue = inputField.value;
					if (inputValue === "∞") return `${effectiveActionsPerHour}/hr | Total time: ∞`;
					const repeatCount = parseInt(inputValue) || 0;
					if (repeatCount > 0) {
						const totalSeconds = Math.ceil(repeatCount / efficiencyMultiplier) * actionTime;
						return `${effectiveActionsPerHour}/hr | Total time: ${(0, src_utils_formatters_js.timeReadable)(totalSeconds)}`;
					}
					return `${effectiveActionsPerHour}/hr | Total time: 0s`;
				};
				const summary = getSummary();
				return this.createTrackedCollapsible("⏱", "Action Speed & Time", summary, content, false);
			} catch (error) {
				console.error("[AlchemyProfitDisplay] Error creating action speed/time section:", error);
				return null;
			}
		}
		/**
		* Create Level Progress section
		* @param {string} actionType - Alchemy action type
		* @param {string} itemHrid - Item HRID being processed
		* @param {Object} profitData - Profit data
		* @returns {HTMLElement|null} Level Progress section element
		*/
		createLevelProgressSection(actionType, itemHrid, profitData) {
			try {
				const gameData = src_core_data_manager_js.default.getInitClientData();
				if (!gameData) return null;
				const skills = src_core_data_manager_js.default.getSkills();
				if (!skills) return null;
				const alchemySkill = skills.find((s) => s.skillHrid === "/skills/alchemy");
				if (!alchemySkill) return null;
				const levelExperienceTable = gameData.levelExperienceTable;
				if (!levelExperienceTable) return null;
				const currentLevel = alchemySkill.level;
				const currentXP = alchemySkill.experience || 0;
				const nextLevel = currentLevel + 1;
				const xpForNextLevel = levelExperienceTable[nextLevel];
				if (!xpForNextLevel) return null;
				const xpPerAction = this.calculateAlchemyXPPerAction(actionType, itemHrid, profitData.successRate);
				if (xpPerAction === 0) return null;
				const xpForCurrentLevel = levelExperienceTable[currentLevel] || 0;
				const progressPercent = (currentXP - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel) * 100;
				const xpNeeded = xpForNextLevel - currentXP;
				const actionsNeeded = Math.ceil(xpNeeded / xpPerAction);
				const actionTime = profitData.actionTime;
				const efficiencyMultiplier = 1 + profitData.efficiency;
				const timeNeeded = Math.ceil(actionsNeeded / efficiencyMultiplier) * actionTime;
				const xpPerHour = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime) * efficiencyMultiplier * xpPerAction;
				const xpPerDay = xpPerHour * 24;
				const content = document.createElement("div");
				content.style.cssText = `
                color: var(--text-color-secondary, ${src_core_config_js.default.COLOR_TEXT_SECONDARY});
                font-size: 0.9em;
                line-height: 1.6;
            `;
				const lines = [];
				lines.push(`Current: Level ${currentLevel} | ${progressPercent.toFixed(2)}% to Level ${nextLevel}`);
				lines.push("");
				const itemLevel = (gameData.itemDetailMap?.[itemHrid])?.itemLevel || 0;
				const baseXP = this.getAlchemyBaseXP(actionType, itemLevel);
				const xpData = (0, src_utils_experience_parser_js.calculateExperienceMultiplier)("/skills/alchemy", "/action_types/alchemy");
				const wisdomMultiplier = xpData.totalMultiplier;
				const modifiedXPSuccess = baseXP * wisdomMultiplier;
				lines.push(`XP per action: ${(0, src_utils_formatters_js.formatWithSeparator)(baseXP.toFixed(2))} base → ${(0, src_utils_formatters_js.formatWithSeparator)(modifiedXPSuccess.toFixed(2))} (×${wisdomMultiplier.toFixed(3)})`);
				if (profitData.successRate < 1) lines.push(`  Expected XP: ${(0, src_utils_formatters_js.formatWithSeparator)(xpPerAction.toFixed(2))} (${(0, src_utils_formatters_js.formatPercentage)(profitData.successRate, 2)} success, 10% XP on fail)`);
				if (xpData.totalWisdom > 0 || xpData.charmExperience > 0) {
					const totalXPBonus = xpData.totalWisdom + xpData.charmExperience;
					lines.push(`  Total XP Bonus: +${totalXPBonus.toFixed(2)}%`);
					if (xpData.charmBreakdown && xpData.charmBreakdown.length > 0) for (const item of xpData.charmBreakdown) {
						const enhText = item.enhancementLevel > 0 ? ` +${item.enhancementLevel}` : "";
						lines.push(`    • ${item.name}${enhText}: +${item.value.toFixed(2)}%`);
					}
					if (xpData.wisdomBreakdown && xpData.wisdomBreakdown.length > 0) for (const item of xpData.wisdomBreakdown) {
						const enhText = item.enhancementLevel > 0 ? ` +${item.enhancementLevel}` : "";
						lines.push(`    • ${item.name}${enhText}: +${item.value.toFixed(2)}%`);
					}
					if (xpData.breakdown.houseWisdom > 0) lines.push(`    • House Rooms: +${xpData.breakdown.houseWisdom.toFixed(2)}%`);
					if (xpData.breakdown.communityWisdom > 0) lines.push(`    • Community Buff: +${xpData.breakdown.communityWisdom.toFixed(2)}%`);
					if (xpData.breakdown.consumableWisdom > 0) lines.push(`    • Wisdom Tea: +${xpData.breakdown.consumableWisdom.toFixed(2)}%`);
					if (xpData.breakdown.achievementWisdom > 0) lines.push(`    • Achievement: +${xpData.breakdown.achievementWisdom.toFixed(2)}%`);
					if (xpData.breakdown.mooPassWisdom > 0) lines.push(`    • MooPass: +${xpData.breakdown.mooPassWisdom.toFixed(2)}%`);
				}
				lines.push("");
				lines.push(`<span style="font-weight: 500; color: var(--text-color-primary, ${src_core_config_js.default.COLOR_TEXT_PRIMARY});">To Level ${nextLevel}:</span>`);
				lines.push(`  Actions: ${(0, src_utils_formatters_js.formatWithSeparator)(actionsNeeded)}`);
				lines.push(`  Time: ${(0, src_utils_formatters_js.timeReadable)(timeNeeded)}`);
				lines.push("");
				const savedTarget = this._alchemyTargetLevel;
				const initialTargetLevel = savedTarget && savedTarget > currentLevel ? savedTarget : nextLevel;
				lines.push(`<span style="font-weight: 500; color: var(--text-color-primary, ${src_core_config_js.default.COLOR_TEXT_PRIMARY});">Target Level Calculator:</span>`);
				lines.push(`<div style="margin-top: 4px;">
                <span>To level </span>
                <input
                    type="number"
                    id="mwi-alchemy-target-level-input"
                    value="${initialTargetLevel}"
                    min="${nextLevel}"
                    max="200"
                    style="
                        width: 50px;
                        padding: 2px 4px;
                        background: var(--background-secondary, #2a2a2a);
                        color: var(--text-color-primary, ${src_core_config_js.default.COLOR_TEXT_PRIMARY});
                        border: 1px solid var(--border-color, ${src_core_config_js.default.COLOR_BORDER});
                        border-radius: 3px;
                        font-size: 0.9em;
                    "
                >
                <span>:</span>
            </div>`);
				lines.push(`<div id="mwi-alchemy-target-level-result" style="margin-top: 4px; margin-left: 8px;">
                ${(0, src_utils_formatters_js.formatWithSeparator)(actionsNeeded)} actions | ${(0, src_utils_formatters_js.timeReadable)(timeNeeded)}
            </div>`);
				lines.push("");
				lines.push(`XP/hour: ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(xpPerHour))} | XP/day: ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(xpPerDay))}`);
				content.innerHTML = lines.join("<br>");
				const targetLevelInput = content.querySelector("#mwi-alchemy-target-level-input");
				const targetLevelResult = content.querySelector("#mwi-alchemy-target-level-result");
				const baseEfficiency = profitData.efficiency * 100;
				const updateTargetLevel = () => {
					const targetLevelValue = parseInt(targetLevelInput.value);
					this._alchemyTargetLevel = targetLevelValue;
					if (targetLevelValue > currentLevel && targetLevelValue <= 200) {
						const result = (0, src_utils_experience_calculator_js.calculateMultiLevelProgress)(currentLevel, currentXP, targetLevelValue, baseEfficiency, actionTime, xpPerAction, levelExperienceTable);
						targetLevelResult.innerHTML = `${(0, src_utils_formatters_js.formatWithSeparator)(result.actionsNeeded)} actions | ${(0, src_utils_formatters_js.timeReadable)(result.timeNeeded)}`;
						targetLevelResult.style.color = `var(--text-color-primary, ${src_core_config_js.default.COLOR_TEXT_PRIMARY})`;
					} else {
						targetLevelResult.textContent = "Invalid level";
						targetLevelResult.style.color = "var(--color-error, #ff4444)";
					}
				};
				targetLevelInput.addEventListener("input", updateTargetLevel);
				targetLevelInput.addEventListener("change", updateTargetLevel);
				if (initialTargetLevel !== nextLevel) updateTargetLevel();
				const summary = `${(0, src_utils_formatters_js.timeReadable)(timeNeeded)} to Level ${nextLevel}`;
				return this.createTrackedCollapsible("📈", "Level Progress", summary, content, false);
			} catch (error) {
				console.error("[AlchemyProfitDisplay] Error creating level progress section:", error);
				return null;
			}
		}
		/**
		* Remove profit display
		*/
		removeDisplay() {
			if (this.displayElement && this.displayElement.parentNode) this.displayElement.remove();
			this.displayElement = null;
			const speedTimeSection = document.getElementById("mwi-alchemy-speed-time");
			if (speedTimeSection && speedTimeSection.parentNode) speedTimeSection.remove();
			const levelProgressSection = document.getElementById("mwi-alchemy-level-progress");
			if (levelProgressSection && levelProgressSection.parentNode) levelProgressSection.remove();
		}
		/**
		* Disable the display
		*/
		disable() {
			if (this.updateTimeout) {
				clearTimeout(this.updateTimeout);
				this.updateTimeout = null;
			}
			if (this.equipmentChangeTimeout) {
				clearTimeout(this.equipmentChangeTimeout);
				this.equipmentChangeTimeout = null;
			}
			if (this.equipmentChangeHandler) {
				src_core_data_manager_js.default.off("items_updated", this.equipmentChangeHandler);
				this.equipmentChangeHandler = null;
			}
			if (this.consumablesChangeTimeout) {
				clearTimeout(this.consumablesChangeTimeout);
				this.consumablesChangeTimeout = null;
			}
			if (this.consumablesChangeHandler) {
				src_core_data_manager_js.default.off("consumables_updated", this.consumablesChangeHandler);
				this.consumablesChangeHandler = null;
			}
			if (this.contentObserver) {
				this.contentObserver.disconnect();
				this.contentObserver = null;
			}
			if (this.tabObserver) {
				this.tabObserver.disconnect();
				this.tabObserver = null;
			}
			this.timerRegistry.clearAll();
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			this.removeDisplay();
			this.lastFingerprint = null;
			this.isActive = false;
			this.isInitialized = false;
		}
	};
	var alchemyProfitDisplay = new AlchemyProfitDisplay();
	//#endregion
	//#region src/features/alchemy/alchemy-best-items.js
	/**
	* Alchemy Best Items
	* Shows a ranked table of all eligible items by profit/hr or XP/hr
	* for the active alchemy type (Coinify, Decompose, Transmute).
	*/
	var ALCHEMY_TYPES = [
		"coinify",
		"decompose",
		"transmute"
	];
	var CATALYST_LABELS = {
		"/items/catalyst_of_coinification": "Coinify",
		"/items/catalyst_of_decomposition": "Decompose",
		"/items/catalyst_of_transmutation": "Transmute",
		"/items/prime_catalyst": "Prime"
	};
	/**
	* Get base XP for an alchemy action type and item level
	* (mirrors alchemy-profit-display.js getAlchemyBaseXP)
	*/
	function getAlchemyBaseXP(actionType, itemLevel) {
		switch (actionType) {
			case "coinify": return itemLevel + 10;
			case "decompose": return itemLevel * 1.4 + 14;
			case "transmute": return itemLevel * 1.6 + 16;
			default: return 0;
		}
	}
	/**
	* Calculate expected XP per action for an item
	*/
	function calcXpPerAction(actionType, itemLevel, successRate) {
		const baseXP = getAlchemyBaseXP(actionType, itemLevel);
		if (baseXP === 0) return 0;
		const fullXP = baseXP * (0, src_utils_experience_parser_js.calculateExperienceMultiplier)("/skills/alchemy", "/action_types/alchemy").totalMultiplier;
		return successRate * fullXP + (1 - successRate) * fullXP * .1;
	}
	var AlchemyBestItems = class {
		constructor() {
			this.isInitialized = false;
			this.modal = null;
			this.alchemyTab = null;
			this.tabWatcher = null;
			this.cachedRankings = {};
			this.sortMode = "profit";
			this.currentType = "coinify";
			this.itemsSpriteUrl = null;
			this.profitableOnly = false;
			this.searchQuery = "";
			this.filterProfitMin = null;
			this.filterProfitMax = null;
			this.filterPriceMin = null;
			this.filterPriceMax = null;
		}
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("alchemy_bestItems")) return;
			this.isInitialized = true;
			this.addAlchemyTab();
		}
		disable() {
			if (this.tabWatcher) {
				this.tabWatcher();
				this.tabWatcher = null;
			}
			if (this.alchemyTab?.parentNode) {
				this.alchemyTab.remove();
				this.alchemyTab = null;
			}
			if (this.modal?.parentNode) this.modal.remove();
			this.modal = null;
			this.cachedRankings = {};
			this.isInitialized = false;
		}
		/**
		* Inject "Best Items" tab into the alchemy tab bar
		*/
		addAlchemyTab() {
			const ensureTabExists = () => {
				const tablist = document.querySelector("[role=\"tablist\"]");
				if (!tablist) return;
				if (!Array.from(tablist.children).some((btn) => btn.textContent.includes("Coinify") && !btn.dataset.mwiBestItemsTab)) return;
				if (tablist.querySelector("[data-mwi-best-items-tab=\"true\"]")) return;
				const referenceTab = Array.from(tablist.children).find((btn) => btn.textContent.includes("Coinify") && !btn.dataset.mwiBestItemsTab);
				if (!referenceTab) return;
				const tab = referenceTab.cloneNode(true);
				tab.setAttribute("data-mwi-best-items-tab", "true");
				tab.classList.remove("Mui-selected");
				tab.setAttribute("aria-selected", "false");
				tab.setAttribute("tabindex", "-1");
				const badge = tab.querySelector(".TabsComponent_badge__1Du26");
				if (badge) {
					const badgeSpan = badge.querySelector(".MuiBadge-badge");
					badge.textContent = "";
					badge.appendChild(document.createTextNode("Best Items"));
					if (badgeSpan) badge.appendChild(badgeSpan);
				} else tab.textContent = "Best Items";
				tab.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					this.openModal();
				});
				tablist.appendChild(tab);
				this.alchemyTab = tab;
			};
			if (!this.tabWatcher) this.tabWatcher = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(document.body, () => {
				if (this.alchemyTab && !document.body.contains(this.alchemyTab)) this.alchemyTab = null;
				ensureTabExists();
			}, {
				childList: true,
				subtree: true
			});
			ensureTabExists();
		}
		/**
		* Detect which alchemy tab is active
		* @returns {string} 'coinify', 'decompose', or 'transmute'
		*/
		detectAlchemyType() {
			const text = (document.querySelector("[class*=\"AlchemyPanel_tabsComponentContainer\"]")?.querySelector("[role=\"tab\"][aria-selected=\"true\"]"))?.textContent?.trim()?.toLowerCase() || "";
			if (text.includes("decompose")) return "decompose";
			if (text.includes("transmute")) return "transmute";
			return "coinify";
		}
		/**
		* Calculate rankings for a given alchemy type
		* @param {string} alchemyType - 'coinify', 'decompose', or 'transmute'
		* @returns {Array} Sorted array of item results
		*/
		calculateRankings(alchemyType) {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData?.itemDetailMap) return [];
			const results = [];
			const calcMethod = alchemyType === "coinify" ? "calculateCoinifyProfit" : alchemyType === "decompose" ? "calculateDecomposeProfit" : "calculateTransmuteProfit";
			for (const [itemHrid, itemDetails] of Object.entries(gameData.itemDetailMap)) {
				if (!itemDetails.alchemyDetail) continue;
				if (alchemyType === "coinify" && !itemDetails.alchemyDetail.isCoinifiable) continue;
				if (alchemyType === "decompose" && !itemDetails.alchemyDetail.decomposeItems) continue;
				if (alchemyType === "transmute" && !itemDetails.alchemyDetail.transmuteDropTable) continue;
				let profitData;
				try {
					if (alchemyType === "transmute") profitData = src_features_market_alchemy_profit_calculator_js.default[calcMethod](itemHrid);
					else profitData = src_features_market_alchemy_profit_calculator_js.default[calcMethod](itemHrid, 0);
				} catch {
					continue;
				}
				if (!profitData) continue;
				const itemLevel = itemDetails.itemLevel || 1;
				const xpPerAction = calcXpPerAction(alchemyType, itemLevel, profitData.successRate);
				const xpPerHour = profitData.actionsPerHour * xpPerAction;
				results.push({
					itemHrid,
					name: itemDetails.name,
					itemLevel,
					itemPrice: (0, src_utils_market_data_js.getItemPrice)(itemHrid, {
						context: "profit",
						side: "buy"
					}) || 0,
					profitPerHour: profitData.profitPerHour,
					xpPerHour,
					catalyst: profitData.winningCatalystHrid || null,
					profitData
				});
			}
			return results;
		}
		/**
		* Open the modal with rankings for the current alchemy type
		*/
		async openModal() {
			this.currentType = this.detectAlchemyType();
			if (!this.itemsSpriteUrl) this.itemsSpriteUrl = await asset_manifest_default.getSpriteUrl("items");
			this.cachedRankings[this.currentType] = this.calculateRankings(this.currentType);
			if (!this.modal) this.createModal();
			this.modal.style.display = "flex";
			this.renderTable();
		}
		closeModal() {
			if (this.modal) this.modal.style.display = "none";
		}
		/**
		* Invalidate cached rankings (call when prices update)
		*/
		invalidateCache() {
			this.cachedRankings = {};
		}
		createModal() {
			this.modal = document.createElement("div");
			this.modal.className = "mwi-alchemy-best-items-modal";
			this.modal.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
			this.modal.addEventListener("click", (e) => {
				if (e.target === this.modal) this.closeModal();
			});
			const content = document.createElement("div");
			content.className = "mwi-alchemy-best-items-content";
			content.style.cssText = `
            background: #2a2a2a;
            border-radius: 8px;
            padding: 20px;
            min-width: 500px;
            max-width: 95vw;
            max-height: 90%;
            overflow: auto;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        `;
			const header = document.createElement("div");
			header.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;";
			const title = document.createElement("h3");
			title.style.cssText = "margin: 0; color: #fff;";
			title.setAttribute("data-mwi-best-title", "true");
			header.appendChild(title);
			const closeBtn = document.createElement("button");
			closeBtn.textContent = "✕";
			closeBtn.style.cssText = "background: none; border: none; color: #fff; font-size: 20px; cursor: pointer;";
			closeBtn.addEventListener("click", () => this.closeModal());
			header.appendChild(closeBtn);
			content.appendChild(header);
			const controls = document.createElement("div");
			controls.style.cssText = "display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; align-items: center;";
			for (const type of ALCHEMY_TYPES) {
				const tab = document.createElement("button");
				tab.textContent = type.charAt(0).toUpperCase() + type.slice(1);
				tab.setAttribute("data-mwi-type-tab", type);
				tab.style.cssText = `
                padding: 4px 12px; border-radius: 4px; cursor: pointer;
                border: 1px solid #555; font-size: 0.8rem; color: #fff;
            `;
				tab.addEventListener("click", () => {
					this.currentType = type;
					this.cachedRankings[type] = this.calculateRankings(type);
					this.renderTable();
				});
				controls.appendChild(tab);
			}
			const spacer = document.createElement("div");
			spacer.style.flex = "1";
			controls.appendChild(spacer);
			const sortLabel = document.createElement("span");
			sortLabel.style.cssText = "color: #aaa; font-size: 0.75rem;";
			sortLabel.textContent = "Sort by:";
			controls.appendChild(sortLabel);
			for (const mode of ["profit", "xp"]) {
				const btn = document.createElement("button");
				btn.textContent = mode === "profit" ? "Profit/hr" : "XP/hr";
				btn.setAttribute("data-mwi-sort-btn", mode);
				btn.style.cssText = `
                padding: 3px 8px; border-radius: 4px; cursor: pointer;
                border: 1px solid #555; font-size: 0.75rem; color: #fff;
            `;
				btn.addEventListener("click", () => {
					this.sortMode = mode;
					this.renderTable();
				});
				controls.appendChild(btn);
			}
			const profitToggle = document.createElement("button");
			profitToggle.setAttribute("data-mwi-profit-toggle", "true");
			profitToggle.textContent = "Profitable only";
			profitToggle.style.cssText = `
            padding: 3px 8px; border-radius: 4px; cursor: pointer;
            border: 1px solid #555; font-size: 0.75rem; color: #fff;
            margin-left: 4px;
        `;
			profitToggle.addEventListener("click", () => {
				this.profitableOnly = !this.profitableOnly;
				this.renderTable();
			});
			controls.appendChild(profitToggle);
			content.appendChild(controls);
			const searchRow = document.createElement("div");
			searchRow.style.cssText = "display: flex; margin-bottom: 8px;";
			const searchInput = document.createElement("input");
			searchInput.type = "text";
			searchInput.placeholder = "Search items...";
			searchInput.setAttribute("data-mwi-best-search", "true");
			searchInput.style.cssText = `
            flex: 1; padding: 5px 10px; border-radius: 4px;
            border: 1px solid #555; background: #1a1a2e; color: #fff;
            font-size: 0.8rem; outline: none;
        `;
			searchInput.addEventListener("input", () => {
				this.searchQuery = searchInput.value.trim().toLowerCase();
				this.renderTable();
			});
			searchRow.appendChild(searchInput);
			content.appendChild(searchRow);
			const filterRow = document.createElement("div");
			filterRow.style.cssText = "display: flex; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; align-items: center; font-size: 0.75rem; color: #aaa;";
			const filterInputStyle = `
            width: 70px; padding: 3px 6px; border-radius: 3px;
            border: 1px solid #555; background: #1a1a2e; color: #fff;
            font-size: 0.75rem; outline: none;
        `;
			const profitFilter = document.createElement("span");
			profitFilter.style.cssText = "display: flex; align-items: center; gap: 4px;";
			profitFilter.innerHTML = "Profit/hr:";
			const profitMin = document.createElement("input");
			profitMin.type = "text";
			profitMin.placeholder = "Min";
			profitMin.style.cssText = filterInputStyle;
			const profitMax = document.createElement("input");
			profitMax.type = "text";
			profitMax.placeholder = "Max";
			profitMax.style.cssText = filterInputStyle;
			const parseFilterValue = (val) => {
				if (!val) return null;
				val = val.trim().toLowerCase();
				const multipliers = {
					k: 1e3,
					m: 1e6,
					b: 1e9
				};
				const match = val.match(/^(-?[\d.]+)\s*([kmb])?$/);
				if (!match) return null;
				const num = parseFloat(match[1]);
				return isNaN(num) ? null : num * (multipliers[match[2]] || 1);
			};
			const onFilterChange = () => {
				this.filterProfitMin = parseFilterValue(profitMin.value);
				this.filterProfitMax = parseFilterValue(profitMax.value);
				this.filterPriceMin = parseFilterValue(priceMin.value);
				this.filterPriceMax = parseFilterValue(priceMax.value);
				this.renderTable();
			};
			profitMin.addEventListener("change", onFilterChange);
			profitMax.addEventListener("change", onFilterChange);
			profitFilter.appendChild(profitMin);
			profitFilter.appendChild(document.createTextNode("–"));
			profitFilter.appendChild(profitMax);
			filterRow.appendChild(profitFilter);
			const priceFilter = document.createElement("span");
			priceFilter.style.cssText = "display: flex; align-items: center; gap: 4px;";
			priceFilter.innerHTML = "Item price:";
			const priceMin = document.createElement("input");
			priceMin.type = "text";
			priceMin.placeholder = "Min";
			priceMin.style.cssText = filterInputStyle;
			const priceMax = document.createElement("input");
			priceMax.type = "text";
			priceMax.placeholder = "Max";
			priceMax.style.cssText = filterInputStyle;
			priceMin.addEventListener("change", onFilterChange);
			priceMax.addEventListener("change", onFilterChange);
			priceFilter.appendChild(priceMin);
			priceFilter.appendChild(document.createTextNode("–"));
			priceFilter.appendChild(priceMax);
			filterRow.appendChild(priceFilter);
			content.appendChild(filterRow);
			const tableContainer = document.createElement("div");
			tableContainer.setAttribute("data-mwi-best-table", "true");
			content.appendChild(tableContainer);
			this.modal.appendChild(content);
			document.body.appendChild(this.modal);
		}
		renderTable() {
			if (!this.modal) return;
			const rankings = this.cachedRankings[this.currentType] || [];
			let filtered = this.profitableOnly ? rankings.filter((r) => r.profitPerHour > 0) : rankings;
			if (this.searchQuery) filtered = filtered.filter((r) => r.name.toLowerCase().includes(this.searchQuery));
			if (this.filterProfitMin !== null) filtered = filtered.filter((r) => r.profitPerHour >= this.filterProfitMin);
			if (this.filterProfitMax !== null) filtered = filtered.filter((r) => r.profitPerHour <= this.filterProfitMax);
			if (this.filterPriceMin !== null) filtered = filtered.filter((r) => r.itemPrice >= this.filterPriceMin);
			if (this.filterPriceMax !== null) filtered = filtered.filter((r) => r.itemPrice <= this.filterPriceMax);
			const sorted = [...filtered].sort((a, b) => {
				if (this.sortMode === "xp") {
					const primary = b.xpPerHour - a.xpPerHour;
					return primary !== 0 ? primary : b.profitPerHour - a.profitPerHour;
				}
				const primary = b.profitPerHour - a.profitPerHour;
				return primary !== 0 ? primary : b.xpPerHour - a.xpPerHour;
			});
			const title = this.modal.querySelector("[data-mwi-best-title]");
			if (title) title.textContent = `Best Items \u2014 ${this.currentType.charAt(0).toUpperCase() + this.currentType.slice(1)}`;
			this.modal.querySelectorAll("[data-mwi-type-tab]").forEach((tab) => {
				const isActive = tab.getAttribute("data-mwi-type-tab") === this.currentType;
				tab.style.background = isActive ? src_core_config_js.default.COLOR_ACCENT : "transparent";
			});
			this.modal.querySelectorAll("[data-mwi-sort-btn]").forEach((btn) => {
				const isActive = btn.getAttribute("data-mwi-sort-btn") === this.sortMode;
				btn.style.background = isActive ? "#555" : "transparent";
			});
			const profitToggle = this.modal.querySelector("[data-mwi-profit-toggle]");
			if (profitToggle) profitToggle.style.background = this.profitableOnly ? "#555" : "transparent";
			const container = this.modal.querySelector("[data-mwi-best-table]");
			if (!container) return;
			const table = document.createElement("table");
			table.style.cssText = "width: 100%; border-collapse: collapse; font-size: 0.8rem;";
			const thead = document.createElement("thead");
			const headerRow = document.createElement("tr");
			headerRow.style.cssText = "border-bottom: 1px solid #555;";
			for (const col of [
				"#",
				"Item",
				"Lvl",
				"Catalyst",
				"Profit/hr",
				"XP/hr"
			]) {
				const th = document.createElement("th");
				th.textContent = col;
				th.style.cssText = "padding: 6px 8px; text-align: left; color: #aaa; font-weight: 500;";
				if (col === "#" || col === "Lvl") th.style.textAlign = "center";
				if (col === "Profit/hr" || col === "XP/hr") th.style.textAlign = "right";
				headerRow.appendChild(th);
			}
			thead.appendChild(headerRow);
			table.appendChild(thead);
			const tbody = document.createElement("tbody");
			const maxRows = 100;
			for (let i = 0; i < Math.min(sorted.length, maxRows); i++) {
				const item = sorted[i];
				const row = document.createElement("tr");
				row.style.cssText = "border-bottom: 1px solid #333;";
				const rankTd = document.createElement("td");
				rankTd.textContent = i + 1;
				rankTd.style.cssText = "padding: 4px 8px; text-align: center; color: #888;";
				row.appendChild(rankTd);
				const nameTd = document.createElement("td");
				nameTd.style.cssText = "padding: 4px 8px;";
				const nameLink = document.createElement("span");
				nameLink.textContent = item.name;
				nameLink.style.cssText = "color: #93c5fd; cursor: pointer; text-decoration: underline;";
				nameLink.addEventListener("click", (e) => {
					e.stopPropagation();
					navigateToMarketplace(item.itemHrid);
				});
				nameTd.appendChild(nameLink);
				row.appendChild(nameTd);
				const levelTd = document.createElement("td");
				levelTd.textContent = item.itemLevel;
				levelTd.style.cssText = "padding: 4px 8px; text-align: center; color: #888;";
				row.appendChild(levelTd);
				const catTd = document.createElement("td");
				catTd.style.cssText = "padding: 4px 8px; text-align: center;";
				if (item.catalyst && this.itemsSpriteUrl) {
					const symbolId = item.catalyst.replace("/items/", "");
					const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					svg.setAttribute("width", "20");
					svg.setAttribute("height", "20");
					svg.setAttribute("viewBox", "0 0 1024 1024");
					svg.style.verticalAlign = "middle";
					const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
					use.setAttribute("href", `${this.itemsSpriteUrl}#${symbolId}`);
					svg.appendChild(use);
					catTd.appendChild(svg);
					catTd.title = CATALYST_LABELS[item.catalyst] || symbolId;
				} else {
					catTd.textContent = "—";
					catTd.style.color = "#555";
				}
				row.appendChild(catTd);
				const profitTd = document.createElement("td");
				const profitVal = Math.round(item.profitPerHour);
				profitTd.textContent = (0, src_utils_formatters_js.formatKMB)(profitVal);
				profitTd.style.cssText = `padding: 4px 8px; text-align: right; color: ${profitVal >= 0 ? "#4ade80" : "#f87171"};`;
				row.appendChild(profitTd);
				const xpTd = document.createElement("td");
				xpTd.textContent = (0, src_utils_formatters_js.formatKMB)(Math.round(item.xpPerHour));
				xpTd.style.cssText = "padding: 4px 8px; text-align: right; color: #93c5fd;";
				row.appendChild(xpTd);
				row.style.cursor = "pointer";
				row.addEventListener("click", () => this.toggleBreakdown(row, item, tbody));
				tbody.appendChild(row);
			}
			table.appendChild(tbody);
			container.innerHTML = "";
			if (sorted.length === 0) container.innerHTML = "<div style=\"color: #888; padding: 20px; text-align: center;\">No eligible items found</div>";
			else {
				container.appendChild(table);
				if (sorted.length > maxRows) {
					const more = document.createElement("div");
					more.style.cssText = "color: #888; text-align: center; padding: 8px; font-size: 0.75rem;";
					more.textContent = `Showing top ${maxRows} of ${sorted.length} items`;
					container.appendChild(more);
				}
			}
		}
		/**
		* Toggle breakdown expansion for a row
		*/
		toggleBreakdown(row, item, tbody) {
			const existing = row.nextElementSibling;
			if (existing?.classList.contains("mwi-best-items-breakdown")) {
				existing.remove();
				return;
			}
			tbody.querySelectorAll(".mwi-best-items-breakdown").forEach((el) => el.remove());
			const expansionRow = document.createElement("tr");
			expansionRow.classList.add("mwi-best-items-breakdown");
			const td = document.createElement("td");
			td.setAttribute("colspan", "6");
			td.style.cssText = "padding: 8px 16px; background: #1e1e1e; font-size: 0.75rem;";
			td.appendChild(this.renderBreakdownContent(item));
			expansionRow.appendChild(td);
			row.after(expansionRow);
		}
		/**
		* Create a clickable item name span that navigates to marketplace
		*/
		_makeItemLink(name, itemHrid) {
			const link = document.createElement("span");
			link.textContent = name;
			link.style.cssText = "color: #93c5fd; cursor: pointer; text-decoration: underline;";
			link.addEventListener("click", (e) => {
				e.stopPropagation();
				navigateToMarketplace(itemHrid);
			});
			return link;
		}
		/**
		* Render breakdown content for an expanded item row
		*/
		renderBreakdownContent(item) {
			const container = document.createElement("div");
			const profitData = item.profitData;
			if (!profitData) {
				container.textContent = "No breakdown data available";
				container.style.color = "#888";
				return container;
			}
			if (profitData.dropRevenues?.length > 0) {
				const revenueHeader = document.createElement("div");
				revenueHeader.style.cssText = "color: #fff; font-weight: 500; margin-bottom: 2px;";
				const totalRevenue = profitData.dropRevenues.filter((d) => !d.isSelfReturn).reduce((sum, d) => sum + d.revenuePerHour, 0);
				revenueHeader.textContent = `Revenue: ${(0, src_utils_formatters_js.formatKMB)(Math.round(totalRevenue))}/hr`;
				container.appendChild(revenueHeader);
				for (const drop of profitData.dropRevenues) {
					const itemName = src_core_data_manager_js.default.getItemDetails(drop.itemHrid)?.name || drop.itemHrid.split("/").pop();
					const dropRatePct = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, drop.dropRate < .01 ? 3 : 2);
					const dropsDisplay = drop.dropsPerHour >= 1e4 ? (0, src_utils_formatters_js.formatKMB)(Math.round(drop.dropsPerHour)) : drop.dropsPerHour.toFixed(2);
					const line = document.createElement("div");
					line.style.cssText = "margin-left: 8px; color: #aaa;";
					if (drop.isSelfReturn) {
						line.style.textDecoration = "line-through";
						line.style.opacity = "0.6";
					}
					line.append(`\u2022 `, this._makeItemLink(itemName, drop.itemHrid), `: ${dropsDisplay}/hr (${dropRatePct} \u00d7 ${(0, src_utils_formatters_js.formatPercentage)(profitData.successRate, 1)} success) @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(drop.price))} \u2192 ${(0, src_utils_formatters_js.formatKMB)(Math.round(drop.revenuePerHour))}/hr`);
					container.appendChild(line);
				}
			}
			const totalCosts = (profitData.materialCostPerHour || 0) + (profitData.catalystCostPerHour || 0) + (profitData.totalTeaCostPerHour || 0);
			if (totalCosts > 0 || profitData.requirementCosts?.length > 0) {
				const costsHeader = document.createElement("div");
				costsHeader.style.cssText = "color: #fff; font-weight: 500; margin-top: 6px; margin-bottom: 2px;";
				costsHeader.textContent = `Costs: ${(0, src_utils_formatters_js.formatKMB)(Math.round(totalCosts))}/hr`;
				container.appendChild(costsHeader);
				if (profitData.requirementCosts) for (const req of profitData.requirementCosts) {
					const itemName = src_core_data_manager_js.default.getItemDetails(req.itemHrid)?.name || req.itemHrid.split("/").pop();
					const line = document.createElement("div");
					line.style.cssText = "margin-left: 8px; color: #aaa;";
					line.append(`\u2022 `, this._makeItemLink(itemName, req.itemHrid), `: ${req.count}\u00d7 @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(req.price))} \u2192 ${(0, src_utils_formatters_js.formatKMB)(Math.round(req.costPerHour))}/hr`);
					container.appendChild(line);
				}
				if (profitData.catalystCost?.itemHrid && profitData.catalystCostPerHour > 0) {
					const catName = src_core_data_manager_js.default.getItemDetails(profitData.catalystCost.itemHrid)?.name || profitData.catalystCost.itemHrid.split("/").pop();
					const line = document.createElement("div");
					line.style.cssText = "margin-left: 8px; color: #aaa;";
					line.append(`\u2022 `, this._makeItemLink(catName, profitData.catalystCost.itemHrid), ` @ ${(0, src_utils_formatters_js.formatWithSeparator)(Math.round(profitData.catalystCost.price))} \u2192 ${(0, src_utils_formatters_js.formatKMB)(Math.round(profitData.catalystCostPerHour))}/hr`);
					container.appendChild(line);
				}
				if (profitData.consumableCosts?.length > 0) for (const tea of profitData.consumableCosts) {
					const teaName = src_core_data_manager_js.default.getItemDetails(tea.itemHrid)?.name || tea.itemHrid.split("/").pop();
					const line = document.createElement("div");
					line.style.cssText = "margin-left: 8px; color: #aaa;";
					line.append(`\u2022 `, this._makeItemLink(teaName, tea.itemHrid), ` \u2192 ${(0, src_utils_formatters_js.formatKMB)(Math.round(tea.costPerHour))}/hr`);
					container.appendChild(line);
				}
			}
			const statsLine = document.createElement("div");
			statsLine.style.cssText = "color: #888; margin-top: 6px; font-size: 0.7rem;";
			const parts = [];
			if (profitData.actionsPerHour) parts.push(`${Math.round(profitData.actionsPerHour)}/hr`);
			if (profitData.successRate) parts.push(`${(0, src_utils_formatters_js.formatPercentage)(profitData.successRate, 1)} success`);
			if (profitData.efficiency != null) parts.push(`${(0, src_utils_formatters_js.formatPercentage)(profitData.efficiency, 1)} efficiency`);
			statsLine.textContent = parts.join(" | ");
			container.appendChild(statsLine);
			return container;
		}
	};
	var alchemyBestItems = new AlchemyBestItems();
	//#endregion
	//#region src/features/skilling-optimizer/skilling-optimizer-engine.js
	/**
	* Skilling Optimizer Engine
	* Per-slot independent optimization: for each equipment slot, finds the best item
	* at each enhancement breakpoint. Uses the same breakpoint tables as the combat
	* upgrade advisor.
	*/
	var EQUIPMENT_TYPE_TO_LOCATION = {
		"/equipment_types/back": "/item_locations/back",
		"/equipment_types/head": "/item_locations/head",
		"/equipment_types/trinket": "/item_locations/trinket",
		"/equipment_types/main_hand": "/item_locations/main_hand",
		"/equipment_types/two_hand": "/item_locations/main_hand",
		"/equipment_types/body": "/item_locations/body",
		"/equipment_types/off_hand": "/item_locations/off_hand",
		"/equipment_types/hands": "/item_locations/hands",
		"/equipment_types/legs": "/item_locations/legs",
		"/equipment_types/pouch": "/item_locations/pouch",
		"/equipment_types/feet": "/item_locations/feet",
		"/equipment_types/neck": "/item_locations/neck",
		"/equipment_types/earrings": "/item_locations/earrings",
		"/equipment_types/ring": "/item_locations/ring",
		"/equipment_types/charm": "/item_locations/charm",
		"/equipment_types/milking_tool": "/item_locations/milking_tool",
		"/equipment_types/foraging_tool": "/item_locations/foraging_tool",
		"/equipment_types/woodcutting_tool": "/item_locations/woodcutting_tool",
		"/equipment_types/cheesesmithing_tool": "/item_locations/cheesesmithing_tool",
		"/equipment_types/crafting_tool": "/item_locations/crafting_tool",
		"/equipment_types/tailoring_tool": "/item_locations/tailoring_tool",
		"/equipment_types/cooking_tool": "/item_locations/cooking_tool",
		"/equipment_types/brewing_tool": "/item_locations/brewing_tool",
		"/equipment_types/alchemy_tool": "/item_locations/alchemy_tool"
	};
	var LOCATION_TO_EQUIPMENT_TYPES = {};
	for (const [eqType, loc] of Object.entries(EQUIPMENT_TYPE_TO_LOCATION)) {
		if (!LOCATION_TO_EQUIPMENT_TYPES[loc]) LOCATION_TO_EQUIPMENT_TYPES[loc] = [];
		LOCATION_TO_EQUIPMENT_TYPES[loc].push(eqType);
	}
	var BREAKPOINTS_DEFAULT = [
		7,
		10,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20
	];
	var BREAKPOINTS_JEWELRY = [
		5,
		7,
		10,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20
	];
	var BREAKPOINTS_BACK = [
		3,
		5,
		7,
		10,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20
	];
	var BREAKPOINTS_REFINED = [
		10,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20
	];
	var JEWELRY_LOCATIONS = /* @__PURE__ */ new Set([
		"/item_locations/neck",
		"/item_locations/ring",
		"/item_locations/earrings"
	]);
	var SKILLING_LOCATIONS = [
		"/item_locations/milking_tool",
		"/item_locations/foraging_tool",
		"/item_locations/woodcutting_tool",
		"/item_locations/cheesesmithing_tool",
		"/item_locations/crafting_tool",
		"/item_locations/tailoring_tool",
		"/item_locations/cooking_tool",
		"/item_locations/brewing_tool",
		"/item_locations/alchemy_tool",
		"/item_locations/main_hand",
		"/item_locations/off_hand",
		"/item_locations/head",
		"/item_locations/body",
		"/item_locations/legs",
		"/item_locations/hands",
		"/item_locations/feet",
		"/item_locations/back",
		"/item_locations/neck",
		"/item_locations/ring",
		"/item_locations/earrings",
		"/item_locations/trinket",
		"/item_locations/pouch",
		"/item_locations/charm"
	];
	var SLOT_DISPLAY_NAMES = {
		"/item_locations/milking_tool": "Milking Tool",
		"/item_locations/foraging_tool": "Foraging Tool",
		"/item_locations/woodcutting_tool": "Woodcutting Tool",
		"/item_locations/cheesesmithing_tool": "Cheesesmithing Tool",
		"/item_locations/crafting_tool": "Crafting Tool",
		"/item_locations/tailoring_tool": "Tailoring Tool",
		"/item_locations/cooking_tool": "Cooking Tool",
		"/item_locations/brewing_tool": "Brewing Tool",
		"/item_locations/alchemy_tool": "Alchemy Tool",
		"/item_locations/main_hand": "Main Hand",
		"/item_locations/off_hand": "Off Hand",
		"/item_locations/head": "Head",
		"/item_locations/body": "Body",
		"/item_locations/legs": "Legs",
		"/item_locations/hands": "Hands",
		"/item_locations/feet": "Feet",
		"/item_locations/back": "Back",
		"/item_locations/neck": "Neck",
		"/item_locations/ring": "Ring",
		"/item_locations/earrings": "Earrings",
		"/item_locations/trinket": "Trinket",
		"/item_locations/pouch": "Pouch",
		"/item_locations/charm": "Charm"
	};
	var SKILL_TOOL_LOCATION = {
		Milking: "/item_locations/milking_tool",
		Foraging: "/item_locations/foraging_tool",
		Woodcutting: "/item_locations/woodcutting_tool",
		Cheesesmithing: "/item_locations/cheesesmithing_tool",
		Crafting: "/item_locations/crafting_tool",
		Tailoring: "/item_locations/tailoring_tool",
		Cooking: "/item_locations/cooking_tool",
		Brewing: "/item_locations/brewing_tool",
		Alchemy: "/item_locations/alchemy_tool"
	};
	var GATHERING_SKILLS = /* @__PURE__ */ new Set([
		"milking",
		"foraging",
		"woodcutting"
	]);
	var SKILL_NAMES = [
		"Milking",
		"Foraging",
		"Woodcutting",
		"Cheesesmithing",
		"Crafting",
		"Tailoring",
		"Cooking",
		"Brewing",
		"Alchemy"
	];
	/**
	* Get the player's current level for a skill.
	* @param {string} skillName
	* @returns {number}
	*/
	function getPlayerSkillLevel(skillName) {
		const skills = src_core_data_manager_js.default.getSkills();
		const skillHrid = `/skills/${skillName.toLowerCase()}`;
		return skills?.find((s) => s.skillHrid === skillHrid)?.level ?? 1;
	}
	/**
	* Get breakpoints for a location/item combination.
	* @param {string} locationHrid
	* @param {string} itemHrid
	* @returns {number[]}
	*/
	function getBreakpoints(locationHrid, itemHrid) {
		if (itemHrid.includes("_refined")) return BREAKPOINTS_REFINED;
		if (JEWELRY_LOCATIONS.has(locationHrid)) return BREAKPOINTS_JEWELRY;
		if (locationHrid === "/item_locations/back") return BREAKPOINTS_BACK;
		return BREAKPOINTS_DEFAULT;
	}
	/**
	* Build a map of all player skill levels, with the target skill overridden.
	* @param {string} skillName
	* @param {number} overrideLevel
	* @returns {Map<string, number>}
	*/
	function buildPlayerLevelMap(skillName, overrideLevel) {
		const skills = src_core_data_manager_js.default.getSkills() || [];
		const map = new Map(skills.map((s) => [s.skillHrid, s.level]));
		map.set(`/skills/${skillName.toLowerCase()}`, overrideLevel);
		return map;
	}
	/**
	* Check if the player meets all level requirements for an item.
	* @param {Object} itemDetail
	* @param {Map<string, number>} playerLevels
	* @returns {boolean}
	*/
	function meetsLevelRequirements(itemDetail, playerLevels) {
		for (const req of itemDetail.equipmentDetail?.levelRequirements || []) {
			if (!req.levelTypeHrid) continue;
			const skillHrid = req.levelTypeHrid.replace("/level_types/", "/skills/");
			if ((playerLevels.get(skillHrid) ?? 1) < req.level) return false;
		}
		return true;
	}
	/**
	* Get all equipment candidates for a slot that the player can equip.
	* @param {string} locationHrid
	* @param {Map<string, number>} playerLevels
	* @param {Object} itemDetailMap
	* @returns {Array<{ hrid: string, name: string }>}
	*/
	function getCandidatesForSlot(locationHrid, playerLevels, itemDetailMap) {
		const validEqTypes = new Set(LOCATION_TO_EQUIPMENT_TYPES[locationHrid] || []);
		if (!validEqTypes.size) return [];
		return Object.entries(itemDetailMap).filter(([_hrid, detail]) => {
			if (!detail.equipmentDetail) return false;
			if (!validEqTypes.has(detail.equipmentDetail.type)) return false;
			if (!detail.equipmentDetail.noncombatStats) return false;
			return meetsLevelRequirements(detail, playerLevels);
		}).map(([hrid, detail]) => ({
			hrid,
			name: detail.name
		}));
	}
	/**
	* Score a single candidate item in a slot at a specific enhancement level.
	* @param {string} itemHrid
	* @param {string} locationHrid
	* @param {string} skillName
	* @param {string} goal
	* @param {number} enhancementLevel
	* @param {number} playerLevel
	* @returns {number}
	*/
	function scoreCandidate(itemHrid, locationHrid, skillName, goal, enhancementLevel, playerLevel, selectedActionHrids) {
		return scoreEquipmentSetup(skillName, goal, /* @__PURE__ */ new Map([[locationHrid, {
			itemHrid,
			enhancementLevel
		}]]), playerLevel, selectedActionHrids);
	}
	/**
	* Build the set of noncombatStats field names that are relevant to a skill.
	* @param {string} skillName
	* @returns {Set<string>}
	*/
	function getRelevantStatsForSkill(skillName) {
		const key = skillName.toLowerCase();
		const fields = /* @__PURE__ */ new Set([
			`${key}Speed`,
			`${key}Efficiency`,
			`${key}RareFind`,
			"skillingSpeed",
			"skillingEfficiency",
			"skillingRareFind",
			"skillingEssenceFind"
		]);
		if (GATHERING_SKILLS.has(key)) fields.add("gatheringQuantity");
		return fields;
	}
	/**
	* Get all equippable items for a slot that have stats relevant to the given skill.
	* Availability is based on the player's actual skill levels.
	* @param {string} locationHrid
	* @param {string} skillName
	* @returns {Array<{ hrid, name, available, maxReq, itemLevel }>} Sorted by itemLevel descending
	*/
	function getItemsForSlot(locationHrid, skillName) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.itemDetailMap) return [];
		const validEqTypes = new Set(LOCATION_TO_EQUIPMENT_TYPES[locationHrid] || []);
		if (!validEqTypes.size) return [];
		const skills = src_core_data_manager_js.default.getSkills() || [];
		const playerLevels = new Map(skills.map((s) => [s.skillHrid, s.level]));
		const relevantStats = getRelevantStatsForSkill(skillName);
		const result = [];
		for (const [hrid, detail] of Object.entries(gameData.itemDetailMap)) {
			if (!detail.equipmentDetail) continue;
			if (!validEqTypes.has(detail.equipmentDetail.type)) continue;
			const stats = detail.equipmentDetail.noncombatStats;
			if (!stats) continue;
			if (!Object.entries(stats).some(([field, val]) => val > 0 && relevantStats.has(field))) continue;
			let available = true;
			let maxReq = 1;
			for (const req of detail.equipmentDetail.levelRequirements || []) {
				if (!req.levelTypeHrid) continue;
				const skillHrid = req.levelTypeHrid.replace("/level_types/", "/skills/");
				if (req.level > maxReq) maxReq = req.level;
				if ((playerLevels.get(skillHrid) ?? 1) < req.level) available = false;
			}
			result.push({
				hrid,
				name: detail.name,
				available,
				maxReq,
				itemLevel: detail.itemLevel || 0
			});
		}
		return result.sort((a, b) => b.itemLevel - a.itemLevel || a.name.localeCompare(b.name));
	}
	var SKILLING_BUFF_TYPES = /* @__PURE__ */ new Set([
		"/buff_types/efficiency",
		"/buff_types/wisdom",
		"/buff_types/gathering",
		"/buff_types/processing",
		"/buff_types/artisan",
		"/buff_types/gourmet",
		"/buff_types/action_level",
		"/buff_types/alchemy_success"
	]);
	/**
	* Get all consumable drink items that provide skilling-relevant buffs.
	* @returns {Array<{ hrid, name }>} Sorted by name
	*/
	function getSkillDrinkItems() {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.itemDetailMap) return [];
		const result = [];
		for (const [hrid, detail] of Object.entries(gameData.itemDetailMap)) {
			if (!detail.consumableDetail?.buffs?.length) continue;
			if (!detail.consumableDetail.buffs.some((b) => SKILLING_BUFF_TYPES.has(b.typeHrid) || b.typeHrid?.endsWith("_level"))) continue;
			result.push({
				hrid,
				name: detail.name
			});
		}
		return result.sort((a, b) => a.name.localeCompare(b.name));
	}
	/**
	* Optimize a skill for the given player level and selected actions.
	* Equipment is always scored for XP (efficiency/speed benefit both goals equally).
	* Returns per-slot progression plus tea results for both XP and Gold goals.
	*
	* @param {string} skillName
	* @param {number} playerLevel
	* @param {Set<string>|null} selectedActionHrids - HRIDs of actions to score against, or null for all
	* @returns {Object|null}
	*/
	function optimizeSkill(skillName, playerLevel, selectedActionHrids = null) {
		const goal = GATHERING_SKILLS.has(skillName.toLowerCase()) ? "gold" : "xp";
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.itemDetailMap) return null;
		const { itemDetailMap } = gameData;
		const playerLevels = buildPlayerLevelMap(skillName, playerLevel);
		const xpBaseline = scoreEquipmentSetup(skillName, "xp", /* @__PURE__ */ new Map(), playerLevel, selectedActionHrids);
		const goldBaseline = scoreEquipmentSetup(skillName, "gold", /* @__PURE__ */ new Map(), playerLevel, selectedActionHrids);
		const baseline = goal === "xp" ? xpBaseline : goldBaseline;
		const slots = {};
		const optimalEquipmentAtMax = /* @__PURE__ */ new Map();
		for (const locationHrid of SKILLING_LOCATIONS) {
			const candidates = getCandidatesForSlot(locationHrid, playerLevels, itemDetailMap);
			if (!candidates.length) continue;
			const allBreakpoints = /* @__PURE__ */ new Set();
			for (const candidate of candidates) for (const bp of getBreakpoints(locationHrid, candidate.hrid)) allBreakpoints.add(bp);
			const sortedBreakpoints = [...allBreakpoints].sort((a, b) => a - b);
			const progression = [];
			let lastWinnerHrid = null;
			for (const bp of sortedBreakpoints) {
				let bestItem = null;
				let bestScore = baseline;
				for (const candidate of candidates) {
					const effectiveLevel = candidate.hrid.includes("_refined") ? Math.max(bp, 10) : bp;
					const score = scoreCandidate(candidate.hrid, locationHrid, skillName, goal, effectiveLevel, playerLevel, selectedActionHrids);
					if (score > bestScore) {
						bestScore = score;
						bestItem = candidate;
					}
				}
				progression.push({
					breakpoint: bp,
					itemHrid: bestItem?.hrid ?? null,
					itemName: bestItem?.name ?? null,
					score: bestScore,
					xpScore: (() => {
						if (!bestItem) return xpBaseline;
						if (goal === "xp") return bestScore;
						const eBp = bestItem.hrid.includes("_refined") ? Math.max(bp, 10) : bp;
						return scoreCandidate(bestItem.hrid, locationHrid, skillName, "xp", eBp, playerLevel, selectedActionHrids);
					})(),
					goldScore: (() => {
						if (!bestItem) return goldBaseline;
						if (goal === "gold") return bestScore;
						const eBp = bestItem.hrid.includes("_refined") ? Math.max(bp, 10) : bp;
						return scoreCandidate(bestItem.hrid, locationHrid, skillName, "gold", eBp, playerLevel, selectedActionHrids);
					})(),
					isChange: (bestItem?.hrid ?? null) !== lastWinnerHrid
				});
				lastWinnerHrid = bestItem?.hrid ?? null;
			}
			if (!progression.some((p) => p.itemHrid !== null)) continue;
			slots[locationHrid] = {
				name: SLOT_DISPLAY_NAMES[locationHrid] || locationHrid,
				candidateCount: candidates.length,
				progression
			};
			const maxEntry = progression[progression.length - 1];
			if (maxEntry?.itemHrid) optimalEquipmentAtMax.set(locationHrid, {
				itemHrid: maxEntry.itemHrid,
				enhancementLevel: 20
			});
		}
		const xpTeaResult = findOptimalTeas(skillName, "xp", null, null, null, null, optimalEquipmentAtMax, selectedActionHrids);
		const goldTeaResult = findOptimalTeas(skillName, "gold", null, null, null, null, optimalEquipmentAtMax, selectedActionHrids);
		return {
			skill: skillName,
			playerLevel,
			goal,
			xpBaseline,
			goldBaseline,
			slots,
			xpTeaResult: xpTeaResult?.error ? null : xpTeaResult,
			goldTeaResult: goldTeaResult?.error ? null : goldTeaResult
		};
	}
	//#endregion
	//#region src/utils/loadout-scraper.js
	/**
	* Loadout Scraper Utilities
	*
	* Shared DOM scraping helpers for reading equipment, abilities, and consumables
	* from the game's LoadoutsPanel_selectedLoadout element.
	*
	* Used by loadout-export-button.js and loadout-snapshot.js.
	*/
	/**
	* Build a map of itemHrid → highest enhancementLevel across all character items.
	* Covers both currently equipped items and inventory items.
	* @returns {Map<string, number>}
	*/
	function buildEnhancementLevelMap() {
		const inventory = src_core_data_manager_js.default.getInventory();
		const map = /* @__PURE__ */ new Map();
		if (!inventory) return map;
		for (const item of inventory) {
			if (!item.itemHrid || item.count === 0) continue;
			const existing = map.get(item.itemHrid) ?? 0;
			const level = item.enhancementLevel ?? 0;
			if (level > existing) map.set(item.itemHrid, level);
		}
		return map;
	}
	//#endregion
	//#region src/features/skilling-optimizer/skilling-optimizer-ui.js
	/**
	* Skilling Simulator UI
	* Injects a "Optimizer" tab next to Loadouts in the character panel.
	* Lets the user configure equipment + teas (optionally loading from a saved loadout),
	* pick which actions to include, and simulate XP/hr + Gold/hr.
	*/
	function getLoadoutSnapshot() {
		return window.Toolasha?.Combat?.loadoutSnapshot || loadoutSnapshot;
	}
	var TAB_CLASS = "toolasha-skilling-opt-tab";
	var PANEL_CLASS = "toolasha-skilling-opt-panel";
	var HIDE_CLASS = "toolasha-opt-hide-content";
	var STYLE_EL = document.createElement("style");
	STYLE_EL.textContent = `.${HIDE_CLASS} [class*="TabsComponent_tabPanelsContainer"] { display: none !important; }`;
	var SkillingSimulatorUI = class {
		constructor() {
			this.tabBtn = null;
			this.panel = null;
			this.isActive = false;
			this.watcher = null;
			this.contentParent = null;
			this.currentMode = "simulator";
			this.lastOptimizerResult = null;
			this.optimizerLoadout = null;
			this.currentSkill = "Woodcutting";
			this.currentLevel = 1;
			this.equipment = /* @__PURE__ */ new Map();
			this.teas = [
				null,
				null,
				null
			];
			this.selectedActionHrids = null;
			this._slotBtns = /* @__PURE__ */ new Map();
			this._teaBtns = [];
			this._actionBtn = null;
			this._actionBtnGetLabel = null;
			this._resultsArea = null;
			this._picker = null;
			this._pickerCleanup = null;
		}
		initialize() {
			this.currentLevel = getPlayerSkillLevel(this.currentSkill);
			this.watcher = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(document.body, () => this._tryInjectTabButton(), {
				childList: true,
				subtree: true
			});
			this._tryInjectTabButton();
		}
		_findTabList() {
			for (const tl of document.querySelectorAll("[role=\"tablist\"]")) for (const tab of tl.querySelectorAll("[role=\"tab\"]")) if (tab.textContent.trim().startsWith("Loadouts")) return tl;
			return null;
		}
		_tryInjectTabButton() {
			const tabList = this._findTabList();
			if (!tabList) return;
			if (tabList.querySelector(`.${TAB_CLASS}`)) return;
			const existingTab = tabList.querySelector("[role=\"tab\"]");
			const btn = document.createElement("button");
			btn.className = `${TAB_CLASS} ${existingTab ? existingTab.className.replace(/Mui-selected/g, "").trim() : ""}`;
			btn.setAttribute("role", "tab");
			btn.setAttribute("type", "button");
			btn.textContent = "Optimizer";
			btn.style.minWidth = "auto";
			btn.addEventListener("click", (e) => {
				e.stopPropagation();
				this._activatePanel();
			});
			const loadoutsTab = [...tabList.querySelectorAll("[role=\"tab\"]")].find((t) => t.textContent.trim().startsWith("Loadouts"));
			if (loadoutsTab?.nextSibling) tabList.insertBefore(btn, loadoutsTab.nextSibling);
			else tabList.appendChild(btn);
			this.tabBtn = btn;
			const scroller = tabList.parentElement;
			if (scroller?.className?.includes("MuiTabs-scroller")) scroller.style.overflow = "auto";
			for (const tab of tabList.querySelectorAll(`[role="tab"]:not(.${TAB_CLASS})`)) tab.addEventListener("click", (e) => this._deactivatePanel(e.currentTarget));
			if (this.isActive) this._activatePanel();
		}
		_findContentContainer() {
			const tabList = this._findTabList();
			if (!tabList) return null;
			return tabList.closest("[class*=\"TabsComponent_tabsContainer\"]")?.nextElementSibling || null;
		}
		_activatePanel() {
			this.isActive = true;
			if (this.tabBtn) {
				this.tabBtn.classList.add("Mui-selected");
				this.tabBtn.setAttribute("aria-selected", "true");
			}
			const tabList = this.tabBtn?.parentElement;
			if (tabList) for (const tab of tabList.querySelectorAll(`[role="tab"]:not(.${TAB_CLASS})`)) {
				tab.classList.remove("Mui-selected");
				tab.setAttribute("aria-selected", "false");
			}
			const contentContainer = this._findContentContainer();
			if (contentContainer?.parentElement) {
				this.contentParent = contentContainer.parentElement;
				this.contentParent.classList.add(HIDE_CLASS);
			}
			this.panel?.remove();
			this._picker?.remove();
			this._picker = null;
			if (contentContainer) {
				this.panel = this._buildPanel();
				contentContainer.parentElement?.insertBefore(this.panel, contentContainer.nextSibling);
			}
		}
		_rebuildPanel() {
			const contentContainer = this._findContentContainer();
			if (!contentContainer) return;
			this._closePicker();
			this.panel?.remove();
			this.panel = this._buildPanel();
			contentContainer.parentElement?.insertBefore(this.panel, contentContainer.nextSibling);
		}
		_deactivatePanel(clickedTab = null) {
			this.isActive = false;
			this._closePicker();
			this.panel?.remove();
			this.panel = null;
			this.contentParent?.classList.remove(HIDE_CLASS);
			this.contentParent = null;
			if (this.tabBtn) {
				this.tabBtn.classList.remove("Mui-selected");
				this.tabBtn.setAttribute("aria-selected", "false");
			}
			if (clickedTab) {
				clickedTab.classList.add("Mui-selected");
				clickedTab.setAttribute("aria-selected", "true");
			}
		}
		_buildPanel() {
			if (!STYLE_EL.isConnected) document.head.appendChild(STYLE_EL);
			this._slotBtns.clear();
			this._teaBtns = [];
			const panel = document.createElement("div");
			panel.className = PANEL_CLASS;
			panel.style.cssText = `
            padding: 12px;
            color: rgba(255,255,255,0.85);
            font-size: 13px;
            overflow-y: auto;
            flex: 1;
            min-height: 0;
            box-sizing: border-box;
        `;
			panel.addEventListener("click", (e) => {
				if (this._picker && !this._picker.contains(e.target)) this._closePicker();
			});
			const modeRow = document.createElement("div");
			modeRow.style.cssText = "display: flex; gap: 6px; margin-bottom: 14px;";
			for (const [mode, label] of [["simulator", "Simulator"], ["optimizer", "Optimizer"]]) {
				const btn = document.createElement("button");
				btn.type = "button";
				btn.textContent = label;
				const active = this.currentMode === mode;
				btn.style.cssText = `
                padding: 4px 14px; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer;
                border: 1px solid ${active ? src_core_config_js.default.COLOR_ACCENT : "rgba(255,255,255,0.2)"};
                background: ${active ? src_core_config_js.default.COLOR_ACCENT + "22" : "transparent"};
                color: ${active ? src_core_config_js.default.COLOR_ACCENT : "rgba(255,255,255,0.5)"};
            `;
				btn.addEventListener("click", (e) => {
					e.stopPropagation();
					if (this.currentMode !== mode) {
						this.currentMode = mode;
						this._rebuildPanel();
					}
				});
				modeRow.appendChild(btn);
			}
			panel.appendChild(modeRow);
			panel.appendChild(this._buildTopControls());
			if (this.currentMode === "simulator") {
				panel.appendChild(this._buildEquipmentSection());
				panel.appendChild(this._buildTeasSection());
				const simulateBtn = document.createElement("button");
				simulateBtn.type = "button";
				simulateBtn.textContent = "Simulate";
				simulateBtn.style.cssText = `
                margin-top: 12px; padding: 6px 20px;
                background: ${src_core_config_js.default.COLOR_ACCENT}; color: #000;
                border: none; border-radius: 4px;
                font-size: 12px; font-weight: 700; cursor: pointer;
            `;
				simulateBtn.addEventListener("click", () => {
					simulateBtn.textContent = "Simulating…";
					simulateBtn.disabled = true;
					requestAnimationFrame(() => setTimeout(() => {
						this._runSimulation();
						simulateBtn.textContent = "Simulate";
						simulateBtn.disabled = false;
					}, 0));
				});
				panel.appendChild(simulateBtn);
				const resultsArea = document.createElement("div");
				resultsArea.style.marginTop = "16px";
				panel.appendChild(resultsArea);
				this._resultsArea = resultsArea;
			} else {
				const compareRow = document.createElement("div");
				compareRow.style.cssText = "display: flex; align-items: center; gap: 8px; margin-bottom: 8px;";
				const compareLabel = document.createElement("span");
				compareLabel.textContent = "Compare:";
				compareLabel.style.cssText = "color: rgba(255,255,255,0.5); font-size: 12px; width: 56px; flex-shrink: 0;";
				const compareSelect = document.createElement("select");
				compareSelect.style.cssText = "background: #2a2a2a; color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; padding: 4px 8px; font-size: 12px; flex: 1; cursor: pointer;";
				const noneOpt = document.createElement("option");
				noneOpt.value = "";
				noneOpt.textContent = "— None —";
				compareSelect.appendChild(noneOpt);
				for (const snap of getLoadoutSnapshot().getAllSnapshots()) {
					const opt = document.createElement("option");
					opt.value = snap.name;
					opt.textContent = snap.name + (snap.isDefault ? " ★" : "");
					if (this.optimizerLoadout?.name === snap.name) opt.selected = true;
					compareSelect.appendChild(opt);
				}
				compareSelect.addEventListener("change", () => {
					const name = compareSelect.value;
					this.optimizerLoadout = name ? getLoadoutSnapshot().getAllSnapshots().find((s) => s.name === name) || null : null;
				});
				compareRow.appendChild(compareLabel);
				compareRow.appendChild(compareSelect);
				panel.appendChild(compareRow);
				const optimizeBtn = document.createElement("button");
				optimizeBtn.type = "button";
				optimizeBtn.textContent = "Optimize";
				optimizeBtn.style.cssText = `
                padding: 6px 20px;
                background: ${src_core_config_js.default.COLOR_ACCENT}; color: #000;
                border: none; border-radius: 4px;
                font-size: 12px; font-weight: 700; cursor: pointer;
            `;
				const resultsArea = document.createElement("div");
				resultsArea.style.marginTop = "16px";
				optimizeBtn.addEventListener("click", () => {
					optimizeBtn.textContent = "Optimizing…";
					optimizeBtn.disabled = true;
					requestAnimationFrame(() => setTimeout(() => {
						const result = optimizeSkill(this.currentSkill, this.currentLevel, this.selectedActionHrids);
						this.lastOptimizerResult = result;
						const enhMap = buildEnhancementLevelMap();
						const achievableEquipment = /* @__PURE__ */ new Map();
						if (result) for (const [locationHrid, slotData] of Object.entries(result.slots)) {
							const best = slotData.progression[slotData.progression.length - 1];
							if (best?.itemHrid) achievableEquipment.set(locationHrid, {
								itemHrid: best.itemHrid,
								enhancementLevel: enhMap.get(best.itemHrid) ?? 0
							});
						}
						const xpAchievable = result ? findOptimalTeas(this.currentSkill, "xp", null, null, null, null, achievableEquipment, this.selectedActionHrids) : null;
						const goldAchievable = result ? findOptimalTeas(this.currentSkill, "gold", null, null, null, null, achievableEquipment, this.selectedActionHrids) : null;
						const loadoutItemMap = /* @__PURE__ */ new Map();
						if (this.optimizerLoadout) {
							for (const eq of this.optimizerLoadout.equipment || []) if (eq.itemHrid) loadoutItemMap.set(eq.itemLocationHrid, {
								itemHrid: eq.itemHrid,
								enhancementLevel: eq.enhancementLevel || 0
							});
						}
						optimizeBtn.textContent = "Optimize";
						optimizeBtn.disabled = false;
						resultsArea.innerHTML = "";
						if (result) this._renderOptimizerResults(resultsArea, result, {
							xpResult: xpAchievable,
							goldResult: goldAchievable
						}, loadoutItemMap.size > 0 ? loadoutItemMap : null);
					}, 0));
				});
				panel.appendChild(optimizeBtn);
				panel.appendChild(resultsArea);
				if (this.lastOptimizerResult) this._renderOptimizerResults(resultsArea, this.lastOptimizerResult, null, null);
			}
			return panel;
		}
		_buildTopControls() {
			const wrap = document.createElement("div");
			wrap.style.cssText = "display: flex; flex-direction: column; gap: 7px;";
			const makeRow = (labelText) => {
				const row = document.createElement("div");
				row.style.cssText = "display: flex; align-items: center; gap: 8px;";
				const label = document.createElement("span");
				label.textContent = labelText;
				label.style.cssText = "color: rgba(255,255,255,0.5); font-size: 12px; width: 56px; flex-shrink: 0;";
				row.appendChild(label);
				return row;
			};
			const inputCss = `
            background: #2a2a2a; color: #fff;
            border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;
            padding: 4px 8px; font-size: 12px;
        `;
			const skillRow = makeRow("Skill:");
			const skillSelect = document.createElement("select");
			skillSelect.style.cssText = inputCss + " flex: 1; cursor: pointer;";
			for (const s of SKILL_NAMES) {
				const opt = document.createElement("option");
				opt.value = s;
				opt.textContent = s;
				if (s === this.currentSkill) opt.selected = true;
				skillSelect.appendChild(opt);
			}
			skillRow.appendChild(skillSelect);
			wrap.appendChild(skillRow);
			const levelRow = makeRow("Level:");
			const levelInput = document.createElement("input");
			levelInput.type = "number";
			levelInput.min = "1";
			levelInput.max = "200";
			levelInput.value = String(this.currentLevel);
			levelInput.style.cssText = inputCss + " width: 64px;";
			levelRow.appendChild(levelInput);
			wrap.appendChild(levelRow);
			if (this.currentMode === "simulator") {
				const loadoutRow = makeRow("Loadout:");
				const loadoutSelect = document.createElement("select");
				loadoutSelect.style.cssText = inputCss + " flex: 1; cursor: pointer;";
				this._populateLoadoutSelect(loadoutSelect);
				loadoutRow.appendChild(loadoutSelect);
				wrap.appendChild(loadoutRow);
				loadoutSelect.addEventListener("change", () => this._loadLoadout(loadoutSelect.value));
			}
			const actionsRow = makeRow("Actions:");
			actionsRow.style.position = "relative";
			const actionBtn = document.createElement("button");
			actionBtn.type = "button";
			actionBtn.style.cssText = inputCss + " flex: 1; cursor: pointer; text-align: left;";
			const getActionLabel = () => {
				const avail = getSkillActionsForDisplay(this.currentSkill, this.currentLevel).filter((a) => a.available);
				if (!this.selectedActionHrids) return `All (${avail.length})`;
				return `${[...this.selectedActionHrids].filter((h) => avail.some((a) => a.hrid === h)).length} / ${avail.length}`;
			};
			actionBtn.textContent = getActionLabel();
			this._actionBtn = actionBtn;
			this._actionBtnGetLabel = getActionLabel;
			actionBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				if (this._picker) {
					this._closePicker();
					return;
				}
				this._openActionPicker(actionBtn, getActionLabel);
			});
			actionsRow.appendChild(actionBtn);
			wrap.appendChild(actionsRow);
			const resetActions = () => {
				this.selectedActionHrids = null;
				actionBtn.textContent = getActionLabel();
				this._closePicker();
			};
			skillSelect.addEventListener("change", () => {
				this.currentSkill = skillSelect.value;
				this.currentLevel = getPlayerSkillLevel(this.currentSkill);
				this.teas = [
					null,
					null,
					null
				];
				this.selectedActionHrids = null;
				this._rebuildPanel();
			});
			levelInput.addEventListener("change", () => {
				this.currentLevel = Math.max(1, Math.min(200, parseInt(levelInput.value, 10) || 1));
				levelInput.value = String(this.currentLevel);
				resetActions();
			});
			return wrap;
		}
		_populateLoadoutSelect(select) {
			const empty = document.createElement("option");
			empty.value = "";
			empty.textContent = "— No loadout —";
			select.appendChild(empty);
			const snapshots = getLoadoutSnapshot().getAllSnapshots();
			for (const snap of snapshots) {
				const opt = document.createElement("option");
				opt.value = snap.name;
				opt.textContent = snap.name + (snap.isDefault ? " ★" : "");
				select.appendChild(opt);
			}
		}
		_loadLoadout(name) {
			if (!name) return;
			const snap = getLoadoutSnapshot().getAllSnapshots().find((s) => s.name === name);
			if (!snap) return;
			this.equipment.clear();
			for (const eq of snap.equipment || []) if (eq.itemHrid) this.equipment.set(eq.itemLocationHrid, {
				itemHrid: eq.itemHrid,
				enhancementLevel: eq.enhancementLevel || 0
			});
			this.teas = [
				snap.drinks?.[0]?.itemHrid || null,
				snap.drinks?.[1]?.itemHrid || null,
				snap.drinks?.[2]?.itemHrid || null
			];
			for (const [locationHrid, refs] of this._slotBtns) {
				const eq = this.equipment.get(locationHrid);
				this._updateSlotUI(locationHrid, refs, eq?.itemHrid || null, eq?.enhancementLevel ?? 0);
			}
			for (let i = 0; i < 3; i++) {
				const refs = this._teaBtns[i];
				if (!refs) continue;
				const hrid = this.teas[i];
				this._updateTeaUI(i, refs, hrid);
			}
		}
		_buildEquipmentSection() {
			const section = document.createElement("div");
			section.style.marginTop = "14px";
			section.appendChild(this._makeSectionHeader("Equipment"));
			const relevantTool = SKILL_TOOL_LOCATION[this.currentSkill];
			const locations = SKILLING_LOCATIONS.filter((loc) => !loc.endsWith("_tool") || loc === relevantTool);
			for (const locationHrid of locations) {
				if (getItemsForSlot(locationHrid, this.currentSkill).length === 0) continue;
				section.appendChild(this._buildSlotRow(locationHrid));
			}
			return section;
		}
		_buildSlotRow(locationHrid) {
			const eq = this.equipment.get(locationHrid);
			const currentHrid = eq?.itemHrid || null;
			const currentEnh = eq?.enhancementLevel ?? 0;
			const row = document.createElement("div");
			row.style.cssText = "display: flex; align-items: center; gap: 6px; padding: 2px 0;";
			const label = document.createElement("span");
			label.textContent = SLOT_DISPLAY_NAMES[locationHrid] || locationHrid;
			label.style.cssText = "font-size: 10px; color: rgba(255,255,255,0.35); width: 58px; flex-shrink: 0; text-transform: uppercase; letter-spacing: 0.04em;";
			row.appendChild(label);
			const nameBtn = document.createElement("button");
			nameBtn.type = "button";
			nameBtn.style.cssText = `
            flex: 1; padding: 3px 6px; font-size: 11px; text-align: left;
            background: #2a2a2a; color: ${currentHrid ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)"};
            border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
            cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        `;
			nameBtn.textContent = currentHrid ? this._getItemName(currentHrid) || currentHrid : "—";
			const enhInput = document.createElement("input");
			enhInput.type = "number";
			enhInput.min = "0";
			enhInput.max = "20";
			enhInput.value = String(currentEnh);
			enhInput.style.cssText = `
            width: 40px; padding: 3px 4px; font-size: 11px; text-align: center;
            background: #2a2a2a; color: #fff;
            border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
            display: ${currentHrid ? "block" : "none"};
        `;
			enhInput.addEventListener("change", () => {
				const level = Math.max(0, Math.min(20, parseInt(enhInput.value, 10) || 0));
				enhInput.value = String(level);
				const existing = this.equipment.get(locationHrid);
				if (existing) existing.enhancementLevel = level;
			});
			const clearBtn = document.createElement("button");
			clearBtn.type = "button";
			clearBtn.textContent = "✕";
			clearBtn.style.cssText = `
            padding: 2px 5px; font-size: 10px; cursor: pointer;
            background: transparent; color: rgba(255,255,255,0.3);
            border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
            display: ${currentHrid ? "block" : "none"};
        `;
			clearBtn.addEventListener("click", () => {
				this.equipment.delete(locationHrid);
				this._updateSlotUI(locationHrid, {
					nameBtn,
					enhInput,
					clearBtn
				}, null, 0);
			});
			nameBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				if (this._picker) {
					this._closePicker();
					return;
				}
				const items = getItemsForSlot(locationHrid, this.currentSkill);
				this._openItemPicker(nameBtn, items, this.equipment.get(locationHrid)?.itemHrid || null, (hrid) => {
					if (hrid) this.equipment.set(locationHrid, {
						itemHrid: hrid,
						enhancementLevel: 0
					});
					else this.equipment.delete(locationHrid);
					this._updateSlotUI(locationHrid, {
						nameBtn,
						enhInput,
						clearBtn
					}, hrid, 0);
				});
			});
			row.appendChild(nameBtn);
			row.appendChild(enhInput);
			row.appendChild(clearBtn);
			this._slotBtns.set(locationHrid, {
				nameBtn,
				enhInput,
				clearBtn
			});
			return row;
		}
		_updateSlotUI(locationHrid, refs, itemHrid, enhLevel) {
			const { nameBtn, enhInput, clearBtn } = refs;
			nameBtn.textContent = (itemHrid ? this._getItemName(itemHrid) || itemHrid : null) || "—";
			nameBtn.style.color = itemHrid ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)";
			enhInput.value = String(enhLevel);
			enhInput.style.display = itemHrid ? "block" : "none";
			clearBtn.style.display = itemHrid ? "block" : "none";
		}
		_buildTeasSection() {
			const section = document.createElement("div");
			section.style.marginTop = "14px";
			section.appendChild(this._makeSectionHeader("Teas"));
			for (let i = 0; i < 3; i++) {
				const row = this._buildTeaRow(i);
				section.appendChild(row);
			}
			return section;
		}
		_buildTeaRow(index) {
			const currentHrid = this.teas[index];
			const row = document.createElement("div");
			row.style.cssText = "display: flex; align-items: center; gap: 6px; padding: 2px 0;";
			const label = document.createElement("span");
			label.textContent = `TEA ${index + 1}`;
			label.style.cssText = "font-size: 10px; color: rgba(255,255,255,0.35); width: 58px; flex-shrink: 0; text-transform: uppercase; letter-spacing: 0.04em;";
			row.appendChild(label);
			const nameBtn = document.createElement("button");
			nameBtn.type = "button";
			nameBtn.style.cssText = `
            flex: 1; padding: 3px 6px; font-size: 11px; text-align: left;
            background: #2a2a2a; color: ${currentHrid ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)"};
            border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
            cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        `;
			nameBtn.textContent = currentHrid ? this._getItemName(currentHrid) || currentHrid : "—";
			const clearBtn = document.createElement("button");
			clearBtn.type = "button";
			clearBtn.textContent = "✕";
			clearBtn.style.cssText = `
            padding: 2px 5px; font-size: 10px; cursor: pointer;
            background: transparent; color: rgba(255,255,255,0.3);
            border: 1px solid rgba(255,255,255,0.15); border-radius: 3px;
            display: ${currentHrid ? "block" : "none"};
        `;
			clearBtn.addEventListener("click", () => {
				this.teas[index] = null;
				this._updateTeaUI(index, {
					nameBtn,
					clearBtn
				}, null);
			});
			nameBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				if (this._picker) {
					this._closePicker();
					return;
				}
				const drinks = getSkillDrinkItems();
				this._openItemPicker(nameBtn, drinks, this.teas[index], (hrid) => {
					this.teas[index] = hrid;
					this._updateTeaUI(index, {
						nameBtn,
						clearBtn
					}, hrid);
				});
			});
			row.appendChild(nameBtn);
			row.appendChild(clearBtn);
			this._teaBtns[index] = {
				nameBtn,
				clearBtn
			};
			return row;
		}
		_updateTeaUI(index, refs, hrid) {
			const { nameBtn, clearBtn } = refs;
			nameBtn.textContent = (hrid ? this._getItemName(hrid) || hrid : null) || "—";
			nameBtn.style.color = hrid ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)";
			clearBtn.style.display = hrid ? "block" : "none";
		}
		_openItemPicker(anchorEl, items, currentHrid, onSelect) {
			this._closePicker();
			const popup = document.createElement("div");
			popup.style.cssText = `
            position: fixed; z-index: 20000;
            background: #1e1e1e; border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px; width: 260px; max-height: 300px;
            display: flex; flex-direction: column;
            box-shadow: 0 4px 20px rgba(0,0,0,0.6);
        `;
			const rect = anchorEl.getBoundingClientRect();
			let top = rect.bottom + 4;
			let left = rect.left;
			if (left + 260 > window.innerWidth - 8) left = window.innerWidth - 268;
			if (top + 300 > window.innerHeight - 8) top = rect.top - 304;
			popup.style.top = `${Math.max(8, top)}px`;
			popup.style.left = `${Math.max(8, left)}px`;
			const search = document.createElement("input");
			search.placeholder = "Search…";
			search.style.cssText = `
            padding: 7px 10px; background: #2a2a2a; color: #fff; font-size: 12px;
            border: none; border-bottom: 1px solid rgba(255,255,255,0.15); outline: none;
            border-radius: 6px 6px 0 0; flex-shrink: 0;
        `;
			popup.appendChild(search);
			const list = document.createElement("div");
			list.style.cssText = "overflow-y: auto; flex: 1;";
			popup.appendChild(list);
			const render = (filter) => {
				list.innerHTML = "";
				const emptyRow = document.createElement("div");
				emptyRow.textContent = "— Empty —";
				emptyRow.style.cssText = "padding: 6px 10px; cursor: pointer; font-size: 12px; color: rgba(255,255,255,0.35); font-style: italic; border-bottom: 1px solid rgba(255,255,255,0.08);";
				emptyRow.addEventListener("mouseenter", () => emptyRow.style.background = "rgba(255,255,255,0.05)");
				emptyRow.addEventListener("mouseleave", () => emptyRow.style.background = "");
				emptyRow.addEventListener("click", () => {
					onSelect(null);
					this._closePicker();
				});
				list.appendChild(emptyRow);
				const lc = filter.toLowerCase();
				const filtered = filter ? items.filter((i) => i.name.toLowerCase().includes(lc)) : items;
				const avail = filtered.filter((i) => i.available !== false);
				const locked = filtered.filter((i) => i.available === false);
				for (const item of avail) list.appendChild(this._makePickerRow(item, currentHrid, onSelect));
				if (locked.length) {
					const sep = document.createElement("div");
					sep.textContent = "— Level locked —";
					sep.style.cssText = "padding: 4px 10px; font-size: 10px; color: rgba(255,255,255,0.3); border-top: 1px solid rgba(255,255,255,0.08);";
					list.appendChild(sep);
					for (const item of locked) list.appendChild(this._makePickerRow(item, currentHrid, onSelect));
				}
			};
			render("");
			search.addEventListener("input", () => render(search.value));
			document.body.appendChild(popup);
			this._picker = popup;
			const closeHandler = (e) => {
				if (!popup.contains(e.target) && e.target !== anchorEl) {
					this._closePicker();
					document.removeEventListener("click", closeHandler, true);
				}
			};
			setTimeout(() => document.addEventListener("click", closeHandler, true), 100);
			this._pickerCleanup = () => document.removeEventListener("click", closeHandler, true);
			search.focus();
		}
		_makePickerRow(item, currentHrid, onSelect) {
			const isSelected = item.hrid === currentHrid;
			const isLocked = item.available === false;
			const row = document.createElement("div");
			row.style.cssText = `
            padding: 5px 10px; font-size: 12px; cursor: ${isLocked ? "default" : "pointer"};
            color: ${isLocked ? "rgba(255,255,255,0.2)" : isSelected ? src_core_config_js.default.COLOR_ACCENT : "rgba(255,255,255,0.8)"};
            ${isLocked ? "text-decoration: line-through;" : ""}
            ${isSelected ? "font-weight: 600; background: rgba(255,255,255,0.04);" : ""}
            display: flex; justify-content: space-between;
        `;
			const name = document.createElement("span");
			name.textContent = item.name;
			row.appendChild(name);
			if (item.itemLevel > 0) {
				const req = document.createElement("span");
				req.textContent = `T${item.itemLevel}`;
				req.style.cssText = "font-size: 10px; color: rgba(255,255,255,0.25); flex-shrink: 0; margin-left: 6px;";
				row.appendChild(req);
			}
			if (!isLocked) {
				row.addEventListener("mouseenter", () => {
					if (!isSelected) row.style.background = "rgba(255,255,255,0.06)";
				});
				row.addEventListener("mouseleave", () => {
					row.style.background = isSelected ? "rgba(255,255,255,0.04)" : "";
				});
				row.addEventListener("click", () => {
					onSelect(item.hrid);
					this._closePicker();
				});
			}
			return row;
		}
		_closePicker() {
			if (this._pickerCleanup) {
				this._pickerCleanup();
				this._pickerCleanup = null;
			}
			this._picker?.remove();
			this._picker = null;
		}
		_openActionPicker(anchorBtn, getBtnLabel) {
			this._closePicker();
			const actions = getSkillActionsForDisplay(this.currentSkill, this.currentLevel);
			const available = actions.filter((a) => a.available);
			const popup = document.createElement("div");
			popup.style.cssText = `
            position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 10000;
            background: #1e1e1e; border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px; max-height: 260px; overflow-y: auto;
            box-shadow: 0 4px 16px rgba(0,0,0,0.5); font-size: 12px;
        `;
			const makeRow = (label, checked, disabled, onToggle) => {
				const row = document.createElement("label");
				row.style.cssText = `
                display: flex; align-items: center; gap: 8px; padding: 5px 10px;
                cursor: ${disabled ? "default" : "pointer"};
                color: ${disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.85)"};
                ${disabled ? "text-decoration: line-through;" : ""}
            `;
				if (!disabled) {
					row.addEventListener("mouseenter", () => row.style.background = "rgba(255,255,255,0.06)");
					row.addEventListener("mouseleave", () => row.style.background = "");
				}
				const cb = document.createElement("input");
				cb.type = "checkbox";
				cb.checked = checked;
				cb.disabled = disabled;
				cb.addEventListener("change", () => onToggle(cb.checked));
				row.appendChild(cb);
				const text = document.createElement("span");
				text.textContent = label;
				row.appendChild(text);
				return {
					row,
					cb
				};
			};
			const allChecked = this.selectedActionHrids === null;
			const itemRows = [];
			const { row: allRow, cb: allCb } = makeRow("All", allChecked, false, (checked) => {
				if (checked) {
					this.selectedActionHrids = null;
					itemRows.forEach(({ cb }) => {
						cb.checked = true;
					});
				} else {
					this.selectedActionHrids = /* @__PURE__ */ new Set();
					itemRows.forEach(({ cb }) => {
						cb.checked = false;
					});
				}
				anchorBtn.textContent = getBtnLabel();
			});
			allRow.style.cssText += " font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.1);";
			popup.appendChild(allRow);
			for (const action of actions) {
				const isChecked = action.available && (this.selectedActionHrids === null || this.selectedActionHrids.has(action.hrid));
				const { row, cb } = makeRow(action.available ? action.name : `${action.name} (lv ${action.requiredLevel})`, isChecked, !action.available, (checked) => {
					if (this.selectedActionHrids === null) this.selectedActionHrids = new Set(available.map((a) => a.hrid));
					if (checked) this.selectedActionHrids.add(action.hrid);
					else this.selectedActionHrids.delete(action.hrid);
					if (available.every((a) => this.selectedActionHrids.has(a.hrid))) {
						this.selectedActionHrids = null;
						allCb.checked = true;
					} else allCb.checked = false;
					anchorBtn.textContent = getBtnLabel();
				});
				itemRows.push({
					cb,
					hrid: action.hrid
				});
				popup.appendChild(row);
			}
			anchorBtn.parentElement.style.position = "relative";
			anchorBtn.parentElement.appendChild(popup);
			this._picker = popup;
			const closeHandler = (e) => {
				if (!popup.contains(e.target) && e.target !== anchorBtn) {
					this._closePicker();
					document.removeEventListener("click", closeHandler, true);
				}
			};
			setTimeout(() => document.addEventListener("click", closeHandler, true), 100);
			this._pickerCleanup = () => document.removeEventListener("click", closeHandler, true);
		}
		_runSimulation() {
			if (!this._resultsArea) return;
			const result = calculateSkillPerformance(this.currentSkill, this.equipment, this.teas, this.currentLevel, this.selectedActionHrids);
			this._resultsArea.innerHTML = "";
			const section = document.createElement("div");
			section.appendChild(this._makeSectionHeader("Results"));
			const stats = document.createElement("div");
			stats.style.cssText = "display: flex; gap: 20px; margin-bottom: 8px;";
			const makeStat = (label, value, color) => {
				const el = document.createElement("div");
				el.innerHTML = `
                <div style="font-size:10px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px;">${label}</div>
                <div style="font-size:15px;font-weight:700;color:${color};">${value > 0 ? (0, src_utils_formatters_js.formatKMB)(value) : "—"}</div>
            `;
				return el;
			};
			stats.appendChild(makeStat("XP / hr", result.xpPerHour, src_core_config_js.default.COLOR_INFO));
			stats.appendChild(makeStat("Gold / hr", result.goldPerHour, src_core_config_js.default.COLOR_PROFIT));
			section.appendChild(stats);
			if (result.teaCostPerHour > 0) {
				const cost = document.createElement("div");
				cost.style.cssText = "font-size: 11px; color: rgba(255,255,255,0.4);";
				cost.textContent = `Tea cost: ${(0, src_utils_formatters_js.formatKMB)(result.teaCostPerHour)}/hr`;
				section.appendChild(cost);
			}
			this._resultsArea.appendChild(section);
		}
		_renderOptimizerResults(container, result, achievableStats, loadoutItemMap) {
			const { slots } = result;
			const slotEntries = Object.entries(slots);
			if (!slotEntries.length) {
				const empty = document.createElement("div");
				empty.style.color = "rgba(255,255,255,0.5)";
				empty.textContent = "No relevant equipment found for this skill at the selected level.";
				container.appendChild(empty);
				return;
			}
			container.appendChild(this._makeSectionHeader("Equipment Progression"));
			for (const [locationHrid, slotData] of slotEntries) {
				const loadoutEntry = loadoutItemMap?.get(locationHrid) ?? null;
				let slotXpBaseline = result.xpBaseline;
				let slotGoldBaseline = result.goldBaseline;
				if (loadoutEntry) {
					const equipment = /* @__PURE__ */ new Map([[locationHrid, loadoutEntry]]);
					slotXpBaseline = scoreEquipmentSetup(result.skill, "xp", equipment, result.playerLevel);
					slotGoldBaseline = scoreEquipmentSetup(result.skill, "gold", equipment, result.playerLevel);
				}
				this._renderSlotRow(container, slotData, loadoutEntry, slotXpBaseline, slotGoldBaseline);
			}
			const xpResult = achievableStats?.xpResult;
			const goldResult = achievableStats?.goldResult;
			const hasXp = xpResult?.optimal?.avgScore > 0;
			const hasGold = goldResult?.optimal?.avgScore > 0;
			if (hasXp || hasGold) {
				const statsRow = document.createElement("div");
				statsRow.style.cssText = "display: flex; gap: 20px; margin-top: 16px; margin-bottom: 4px;";
				if (hasXp) statsRow.appendChild(this._makeStat("Avg XP/hr", xpResult.optimal.avgScore, src_core_config_js.default.COLOR_INFO));
				if (hasGold) statsRow.appendChild(this._makeStat("Avg Gold/hr", goldResult.optimal.avgScore, src_core_config_js.default.COLOR_PROFIT));
				container.appendChild(statsRow);
			}
			if (hasXp || hasGold) {
				const teasSection = document.createElement("div");
				teasSection.style.marginTop = "14px";
				teasSection.appendChild(this._makeSectionHeader("Optimal Teas"));
				const cols = document.createElement("div");
				cols.style.cssText = "display: flex; gap: 16px;";
				if (hasXp) cols.appendChild(this._makeTeaCol("For XP", src_core_config_js.default.COLOR_INFO, xpResult.optimal.teas));
				if (hasGold) cols.appendChild(this._makeTeaCol("For Gold", src_core_config_js.default.COLOR_PROFIT, goldResult.optimal.teas));
				teasSection.appendChild(cols);
				container.appendChild(teasSection);
			}
			const note = document.createElement("div");
			note.style.cssText = "margin-top: 12px; font-size: 10px; color: rgba(255,255,255,0.3); font-style: italic;";
			note.textContent = loadoutItemMap ? "% shows gain over your compared loadout item for each slot." : "% shows gain over an empty slot. Select a loadout in Compare to see gains over your current gear.";
			container.appendChild(note);
		}
		_renderSlotRow(container, slotData, loadoutEntry = null, xpBaseline = 0, goldBaseline = 0) {
			const loadoutItemHrid = loadoutEntry?.itemHrid ?? null;
			const optimalItemHrid = slotData.progression[slotData.progression.length - 1]?.itemHrid;
			const row = document.createElement("div");
			row.style.cssText = "margin-bottom: 10px;";
			const headerRow = document.createElement("div");
			headerRow.style.cssText = "display: flex; align-items: center; gap: 6px; margin-bottom: 2px;";
			const slotLabel = document.createElement("div");
			slotLabel.style.cssText = "font-size: 10px; color: rgba(255,255,255,0.38); text-transform: uppercase; letter-spacing: 0.04em;";
			slotLabel.textContent = slotData.name;
			headerRow.appendChild(slotLabel);
			if (loadoutItemHrid !== null) {
				const enhStr = ` +${loadoutEntry.enhancementLevel}`;
				if (loadoutItemHrid === optimalItemHrid) {
					const check = document.createElement("span");
					check.textContent = `✓${enhStr}`;
					check.style.cssText = `font-size: 10px; color: ${src_core_config_js.default.COLOR_PROFIT};`;
					headerRow.appendChild(check);
				} else {
					const diff = document.createElement("span");
					diff.textContent = `≠ ${loadoutItemHrid ? this._getItemName(loadoutItemHrid) || loadoutItemHrid : "empty"}${enhStr}`;
					diff.style.cssText = `font-size: 10px; color: ${src_core_config_js.default.COLOR_WARNING}; font-style: italic;`;
					headerRow.appendChild(diff);
				}
			}
			row.appendChild(headerRow);
			const spriteUrl = document.querySelector("use[href*=\"items_sprite\"]")?.getAttribute("href")?.split("#")[0] ?? null;
			if (loadoutEntry) {
				let prevItemHrid = null;
				let anyVisible = false;
				for (const entry of slotData.progression) {
					if (!entry.itemHrid) {
						prevItemHrid = null;
						continue;
					}
					const xpDelta = entry.xpScore - xpBaseline;
					const goldDelta = entry.goldScore - goldBaseline;
					if (xpDelta <= 0 && goldDelta <= 0) {
						prevItemHrid = entry.itemHrid;
						continue;
					}
					anyVisible = true;
					const entryRow = document.createElement("div");
					entryRow.style.cssText = "display: flex; align-items: baseline; gap: 8px; padding: 1px 0 1px 6px;";
					const bpSpan = document.createElement("span");
					bpSpan.style.cssText = "font-size: 10px; color: rgba(255,255,255,0.35); flex-shrink: 0; min-width: 32px;";
					bpSpan.textContent = `+${entry.breakpoint}`;
					entryRow.appendChild(bpSpan);
					const isRepeat = entry.itemHrid === prevItemHrid;
					const isDifferentFromLoadout = entry.itemHrid !== loadoutItemHrid;
					const nameColor = isRepeat ? "rgba(255,255,255,0.3)" : isDifferentFromLoadout ? src_core_config_js.default.COLOR_ACCENT : "rgba(255,255,255,0.85)";
					const nameSpan = document.createElement("span");
					nameSpan.style.cssText = `font-size: 12px; color: ${nameColor}; font-weight: ${!isRepeat && isDifferentFromLoadout ? "600" : "400"};`;
					nameSpan.textContent = entry.itemName;
					entryRow.appendChild(nameSpan);
					const gainEl = this._makeGainEl(entry.xpScore, xpBaseline, entry.goldScore, goldBaseline, spriteUrl);
					if (gainEl) entryRow.appendChild(gainEl);
					row.appendChild(entryRow);
					prevItemHrid = entry.itemHrid;
					break;
				}
				if (!anyVisible) {
					const none = document.createElement("div");
					none.style.cssText = "padding: 1px 0 1px 6px; font-size: 11px; color: rgba(255,255,255,0.25); font-style: italic;";
					none.textContent = "Already at optimal enhancement";
					row.appendChild(none);
				}
			} else {
				const tiers = this._groupTiers(slotData.progression);
				for (let i = 0; i < tiers.length; i++) {
					const tier = tiers[i];
					const tierRow = document.createElement("div");
					tierRow.style.cssText = "display: flex; align-items: baseline; gap: 8px; padding: 1px 0 1px 6px;";
					const range = document.createElement("span");
					range.style.cssText = "font-size: 10px; color: rgba(255,255,255,0.35); flex-shrink: 0; min-width: 56px;";
					range.textContent = i === tiers.length - 1 ? `+${tier.fromBp}+` : `+${tier.fromBp} – +${tier.toBp}`;
					tierRow.appendChild(range);
					const name = document.createElement("span");
					name.style.cssText = `font-size: 12px; color: ${i === 0 ? "rgba(255,255,255,0.85)" : src_core_config_js.default.COLOR_ACCENT}; font-weight: ${i > 0 ? "600" : "400"};`;
					name.textContent = tier.itemName;
					tierRow.appendChild(name);
					const gainEl = this._makeGainEl(tier.xpScore, xpBaseline, tier.goldScore, goldBaseline, spriteUrl);
					if (gainEl) tierRow.appendChild(gainEl);
					row.appendChild(tierRow);
				}
			}
			container.appendChild(row);
		}
		_makeGainEl(xpScore, xpBaseline, goldScore, goldBaseline, spriteUrl) {
			const gainParts = [];
			if (xpBaseline > 0 && xpScore > xpBaseline) {
				const delta = xpScore - xpBaseline;
				const pct = (delta / xpBaseline * 100).toFixed(1);
				const span = document.createElement("span");
				span.textContent = `+${(0, src_utils_formatters_js.formatKMB)(delta)} XP (+${pct}%)`;
				gainParts.push(span);
			}
			if (goldBaseline > 0 && goldScore > goldBaseline) {
				const delta = goldScore - goldBaseline;
				const pct = (delta / goldBaseline * 100).toFixed(1);
				const span = document.createElement("span");
				span.style.cssText = "display: inline-flex; align-items: center; gap: 2px;";
				span.appendChild(document.createTextNode(`+${(0, src_utils_formatters_js.formatKMB)(delta)}`));
				if (spriteUrl) {
					const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					svg.setAttribute("width", "12");
					svg.setAttribute("height", "12");
					svg.style.flexShrink = "0";
					const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
					use.setAttribute("href", `${spriteUrl}#coin`);
					svg.appendChild(use);
					span.appendChild(svg);
				} else span.appendChild(document.createTextNode(" G"));
				span.appendChild(document.createTextNode(` (+${pct}%)`));
				gainParts.push(span);
			}
			if (!gainParts.length) return null;
			const wrapper = document.createElement("span");
			wrapper.style.cssText = "font-size: 10px; color: rgba(140,210,140,0.65); margin-left: auto; flex-shrink: 0; white-space: nowrap; display: inline-flex; align-items: center; gap: 4px;";
			for (let i = 0; i < gainParts.length; i++) {
				if (i > 0) wrapper.appendChild(document.createTextNode(" · "));
				wrapper.appendChild(gainParts[i]);
			}
			return wrapper;
		}
		_groupTiers(progression) {
			const tiers = [];
			let current = null;
			for (const entry of progression) {
				if (!entry.itemHrid) {
					current = null;
					continue;
				}
				if (!current || entry.itemHrid !== current.itemHrid) {
					if (current) tiers.push(current);
					current = {
						itemHrid: entry.itemHrid,
						itemName: entry.itemName,
						fromBp: entry.breakpoint,
						toBp: entry.breakpoint,
						score: entry.score,
						xpScore: entry.xpScore,
						goldScore: entry.goldScore
					};
				} else current.toBp = entry.breakpoint;
			}
			if (current) tiers.push(current);
			return tiers;
		}
		_makeStat(label, value, color) {
			const el = document.createElement("div");
			el.innerHTML = `
            <div style="font-size:10px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px;">${label}</div>
            <div style="font-size:15px;font-weight:700;color:${color};">${value > 0 ? (0, src_utils_formatters_js.formatKMB)(value) : "—"}</div>
        `;
			return el;
		}
		_makeTeaCol(label, color, teas) {
			const col = document.createElement("div");
			col.style.flex = "1";
			const h = document.createElement("div");
			h.style.cssText = `font-size:11px;font-weight:600;color:${color};margin-bottom:4px;`;
			h.textContent = label;
			col.appendChild(h);
			for (const tea of teas) {
				const row = document.createElement("div");
				row.style.cssText = "font-size:12px;color:rgba(255,255,255,0.8);padding:1px 0;";
				row.textContent = `• ${tea.name}`;
				col.appendChild(row);
			}
			return col;
		}
		_makeSectionHeader(text) {
			const h = document.createElement("div");
			h.style.cssText = `
            font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.4);
            text-transform: uppercase; letter-spacing: 0.06em;
            margin-bottom: 6px; padding-bottom: 4px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        `;
			h.textContent = text;
			return h;
		}
		_getItemName(hrid) {
			return (window.Toolasha?.Core?.dataManager?.getInitClientData?.())?.itemDetailMap?.[hrid]?.name || null;
		}
		cleanup() {
			if (this.watcher) {
				this.watcher();
				this.watcher = null;
			}
			this._closePicker();
			this.tabBtn?.remove();
			this.panel?.remove();
			this.contentParent?.classList.remove(HIDE_CLASS);
			STYLE_EL.remove();
			this.tabBtn = null;
			this.panel = null;
			this.contentParent = null;
			this.isActive = false;
		}
	};
	var skillingSimulatorUI = new SkillingSimulatorUI();
	var skilling_optimizer_ui_default = {
		name: "Skilling Simulator",
		initialize: () => skillingSimulatorUI.initialize(),
		cleanup: () => skillingSimulatorUI.cleanup()
	};
	//#endregion
	//#region src/libraries/actions.js
	/**
	* Actions Library
	* Production, gathering, and alchemy features
	*
	* Exports to: window.Toolasha.Actions
	*/
	var toolashaRoot = window.Toolasha || {};
	window.Toolasha = toolashaRoot;
	if (typeof unsafeWindow !== "undefined") unsafeWindow.Toolasha = toolashaRoot;
	toolashaRoot.Actions = {
		initActionPanelObserver,
		actionTimeDisplay,
		actionCountdown,
		quickInputButtons,
		outputTotals,
		maxProduceable,
		gatheringStats,
		requiredMaterials,
		missingMaterialsButton: missing_materials_button_default,
		budgetCalculator,
		costSummary: cost_summary_default,
		craftingPlan: crafting_plan_default,
		alchemyProfitDisplay,
		alchemyBestItems,
		teaRecommendation,
		inventoryCountDisplay: inventory_count_display_default,
		pinnedActionsPage,
		drinkTimer: drink_timer_default,
		skillingOptimizer: skilling_optimizer_ui_default
	};
	console.log("[Toolasha] Actions library loaded");
	//#endregion
})(Toolasha.Core.dataManager, Toolasha.Core.config, Toolasha.Core.domObserver, Toolasha.Utils.enhancementConfig, Toolasha.Utils.enhancementCalculator, Toolasha.Utils.profitConstants, Toolasha.Utils.formatters, Toolasha.Core.marketAPI, Toolasha.Utils.domObserverHelpers, Toolasha.Core.i18n, Toolasha.Utils.bonusRevenueCalculator, Toolasha.Utils.marketData, Toolasha.Utils.efficiency, Toolasha.Utils.profitHelpers, Toolasha.Core.storage, Toolasha.Market.profitCalculator, Toolasha.Utils.uiComponents, Toolasha.Utils.actionPanelHelper, Toolasha.Core.webSocketHook, Toolasha.Utils.dom, Toolasha.Utils.timerRegistry, Toolasha.Utils.teaParser, Toolasha.Market.alchemyProfitCalculator, Toolasha.Utils.actionCalculator, Toolasha.Utils.cleanupRegistry, Toolasha.Utils.buffParser, Toolasha.Utils.equipmentParser, Toolasha.Utils.experienceParser, Toolasha.Utils.reactInput, Toolasha.Utils.experienceCalculator, Toolasha.Utils.materialCalculator, Toolasha.Market.expectedValueCalculator);
