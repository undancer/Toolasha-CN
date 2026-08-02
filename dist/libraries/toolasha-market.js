/**
 * Toolasha Market Library
 * Market, inventory, and economy features
 * Version: 2.85.1
 * License: CC-BY-NC-SA-4.0
 */

(function(src_core_config_js, src_core_data_manager_js, src_core_dom_observer_js, src_api_marketplace_js, src_utils_house_efficiency_js, src_utils_efficiency_js, src_utils_bonus_revenue_calculator_js, src_utils_enhancement_calculator_js, src_utils_formatters_js, src_utils_market_data_js, src_utils_tea_parser_js, src_core_i18n_js, src_core_storage_js, src_utils_profit_constants_js, src_utils_profit_helpers_js, src_utils_buff_parser_js, src_utils_equipment_parser_js, src_utils_action_calculator_js, src_utils_token_valuation_js, src_utils_enhancement_config_js, src_utils_dom_js, src_utils_material_calculator_js, src_utils_timer_registry_js, src_utils_cleanup_registry_js, src_utils_dom_observer_helpers_js, src_utils_enhancement_multipliers_js, src_utils_react_input_js, src_core_websocket_js, src_utils_ability_cost_calculator_js, src_utils_house_cost_calculator_js) {
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
	src_core_config_js = __toESM(src_core_config_js, 1);
	src_core_data_manager_js = __toESM(src_core_data_manager_js, 1);
	src_core_dom_observer_js = __toESM(src_core_dom_observer_js, 1);
	src_api_marketplace_js = __toESM(src_api_marketplace_js, 1);
	src_core_storage_js = __toESM(src_core_storage_js, 1);
	src_utils_dom_js = __toESM(src_utils_dom_js, 1);
	src_core_websocket_js = __toESM(src_core_websocket_js, 1);
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
	* Get total crafting chain time for an item's upgrade path (recursive).
	* Sums base action times through the upgrade item chain, stopping when market is cheaper.
	* @param {string} itemHrid - Item HRID to get production chain time for
	* @returns {number} Total chain time in seconds (base times, no speed bonuses applied)
	*/
	function getProductionChainTime(itemHrid) {
		if (_chainTimeCache.has(itemHrid)) return _chainTimeCache.get(itemHrid);
		const result = _computeProductionChainTime(itemHrid);
		_chainTimeCache.set(itemHrid, result);
		return result;
	}
	function _computeProductionChainTime(itemHrid) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData?.actionDetailMap) return 0;
		let action = null;
		for (const act of Object.values(gameData.actionDetailMap)) if (act.outputItems?.[0]?.itemHrid === itemHrid) {
			action = act;
			break;
		}
		if (!action || !action.baseTimeCost) return 0;
		let totalTime = action.baseTimeCost / 1e9;
		if (action.upgradeItemHrid) {
			const marketPrice = (0, src_utils_market_data_js.getItemPrice)(action.upgradeItemHrid, { mode: "ask" }) || 0;
			const craftPrice = getProductionCost(action.upgradeItemHrid, "ask");
			if (craftPrice > 0 && (marketPrice === 0 || craftPrice < marketPrice)) totalTime += getProductionChainTime(action.upgradeItemHrid);
		}
		return totalTime;
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
	/**
	* Build HTML for enhancement tooltip section
	* @param {Object} enhancementData - Enhancement analysis from calculateEnhancementPath()
	* @returns {string} HTML string
	*/
	function buildEnhancementTooltipHTML(enhancementData) {
		if (!enhancementData || !enhancementData.optimalStrategy) return "";
		const { itemHrid, targetLevel, optimalStrategy, xpPerHour, totalExpectedXP } = enhancementData;
		if (typeof optimalStrategy.expectedAttempts !== "number" || typeof optimalStrategy.totalTime !== "number" || typeof optimalStrategy.materialCost !== "number" || typeof optimalStrategy.totalCost !== "number") {
			console.error("[Enhancement Tooltip] Missing required fields in optimal strategy:", optimalStrategy);
			return "";
		}
		let html = "<div style=\"border-top: 1px solid rgba(255,255,255,0.2); margin-top: 8px; padding-top: 8px;\">";
		html += "<div style=\"font-weight: bold; margin-bottom: 4px;\">ENHANCEMENT PATH (+0 → +" + targetLevel + ")</div>";
		html += "<div style=\"font-size: 0.9em; margin-left: 8px;\">";
		if (optimalStrategy.protectFrom === 0) html += "<div>No protection needed for +" + targetLevel + "</div>";
		else html += "<div>Protect from: " + optimalStrategy.label + "</div>";
		if (optimalStrategy.usedMirror && optimalStrategy.mirrorStartLevel) html += "<div style=\"color: " + src_core_config_js.default.COLOR_MIRROR + ";\">Uses Philosopher's Mirror from +" + optimalStrategy.mirrorStartLevel + "</div>";
		html += "<div>Expected Attempts: " + (0, src_utils_formatters_js.formatLargeNumber)(optimalStrategy.expectedAttempts.toFixed(1)) + "</div>";
		html += "<div style=\"margin-top: 8px;\">";
		html += `<table style="width: 100%; border-collapse: collapse; font-size: 0.85em; color: ${src_core_config_js.default.COLOR_TOOLTIP_INFO};">`;
		html += `<tr style="border-bottom: 1px solid ${src_core_config_js.default.COLOR_BORDER};">`;
		html += "<th style=\"padding: 2px 4px; text-align: left;\">Material</th>";
		html += "<th style=\"padding: 2px 4px; text-align: center;\">Count</th>";
		html += "<th style=\"padding: 2px 4px; text-align: right;\">Ask</th>";
		html += "<th style=\"padding: 2px 4px; text-align: right;\">Bid</th>";
		html += "</tr>";
		if (optimalStrategy.usedMirror && optimalStrategy.consumedItems && optimalStrategy.consumedItems.length > 0) {
			let totalAsk = 0;
			let totalBid = 0;
			const sortedConsumed = [...optimalStrategy.consumedItems].filter((item) => item.quantity > 0).sort((a, b) => b.level - a.level);
			const gameData = src_core_data_manager_js.default.getInitClientData();
			const consumedHrid = optimalStrategy.consumedItemHrid ?? itemHrid;
			const baseItemName = (gameData?.itemDetailMap[consumedHrid])?.name || consumedHrid;
			const consumedRows = sortedConsumed.map((item) => {
				const prices = (0, src_utils_market_data_js.getItemPrices)(consumedHrid, item.level);
				const askPrice = prices?.ask > 0 ? prices.ask : item.costEach;
				const bidPrice = prices?.bid > 0 ? prices.bid : item.costEach;
				totalAsk += askPrice * item.quantity;
				totalBid += bidPrice * item.quantity;
				return {
					name: baseItemName + " +" + item.level,
					count: item.quantity,
					askPrice,
					bidPrice
				};
			});
			if (optimalStrategy.philosopherMirrorCost > 0 && optimalStrategy.mirrorCount > 0) {
				const mirrorPrices = (0, src_utils_market_data_js.getItemPrices)("/items/philosophers_mirror", 0);
				const mirrorAsk = mirrorPrices?.ask > 0 ? mirrorPrices.ask : 0;
				const mirrorBid = mirrorPrices?.bid > 0 ? mirrorPrices.bid : 0;
				totalAsk += mirrorAsk * optimalStrategy.mirrorCount;
				totalBid += mirrorBid * optimalStrategy.mirrorCount;
				consumedRows.push({
					name: "Philosopher's Mirror",
					count: optimalStrategy.mirrorCount,
					askPrice: mirrorAsk,
					bidPrice: mirrorBid
				});
			}
			const enhancedPrices = (0, src_utils_market_data_js.getItemPrices)(itemHrid, targetLevel);
			const totalAskColor = enhancedPrices?.ask > 0 ? totalAsk < enhancedPrices.ask ? src_core_config_js.default.COLOR_TOOLTIP_PROFIT : src_core_config_js.default.COLOR_TOOLTIP_LOSS : "";
			const totalBidColor = enhancedPrices?.bid > 0 ? totalBid < enhancedPrices.bid ? src_core_config_js.default.COLOR_TOOLTIP_PROFIT : src_core_config_js.default.COLOR_TOOLTIP_LOSS : "";
			html += `<tr style="border-bottom: 1px solid ${src_core_config_js.default.COLOR_BORDER};">`;
			html += "<td style=\"padding: 2px 4px; font-weight: bold;\">Total</td>";
			html += "<td style=\"padding: 2px 4px; text-align: center;\"></td>";
			html += `<td style="padding: 2px 4px; text-align: right; font-weight: bold;${totalAskColor ? " color: " + totalAskColor + ";" : ""}">${(0, src_utils_formatters_js.formatKMB)(totalAsk)}</td>`;
			html += `<td style="padding: 2px 4px; text-align: right; font-weight: bold;${totalBidColor ? " color: " + totalBidColor + ";" : ""}">${(0, src_utils_formatters_js.formatKMB)(totalBid)}</td>`;
			html += "</tr>";
			for (const row of consumedRows) {
				html += "<tr>";
				html += `<td style="padding: 2px 4px;">${row.name}</td>`;
				html += `<td style="padding: 2px 4px; text-align: center;">${(0, src_utils_formatters_js.formatKMB)(row.count)}</td>`;
				html += `<td style="padding: 2px 4px; text-align: right;">${(0, src_utils_formatters_js.formatKMB)(row.askPrice)}</td>`;
				html += `<td style="padding: 2px 4px; text-align: right;">${(0, src_utils_formatters_js.formatKMB)(row.bidPrice)}</td>`;
				html += "</tr>";
			}
		} else {
			let totalCount = 1;
			let totalAsk = optimalStrategy.baseAskPrice || optimalStrategy.baseCost;
			let totalBid = optimalStrategy.baseBidPrice || optimalStrategy.baseCost;
			const rows = [];
			const baseItemLabel = optimalStrategy.baseAskIsCrafted ? (0, src_core_i18n_js.t)("Craft Item") : (0, src_core_i18n_js.t)("Buy Item");
			rows.push({
				name: toolashaConfig.isFeatureEnabled("enhanceSim_baseItemCraftingCost") ? baseItemLabel : "Base Item",
				count: 1,
				askPrice: optimalStrategy.baseAskPrice || optimalStrategy.baseCost,
				bidPrice: optimalStrategy.baseBidPrice || optimalStrategy.baseCost
			});
			if (optimalStrategy.materialBreakdown && optimalStrategy.materialBreakdown.length > 0) for (const mat of optimalStrategy.materialBreakdown) {
				const count = mat.totalQuantity;
				const askPrice = mat.unitPrice;
				const bidPrice = mat.bidPrice || mat.unitPrice;
				totalCount += count;
				totalAsk += askPrice * count;
				totalBid += bidPrice * count;
				rows.push({
					name: mat.name,
					count,
					askPrice,
					bidPrice,
					isCoin: mat.itemHrid === "/items/coin"
				});
			}
			if (optimalStrategy.protectionCost > 0 && optimalStrategy.protectionCount > 0) {
				const count = optimalStrategy.protectionCount;
				const askPrice = optimalStrategy.protectionAskPrice || 0;
				const bidPrice = optimalStrategy.protectionBidPrice || askPrice;
				totalCount += count;
				totalAsk += askPrice * count;
				totalBid += bidPrice * count;
				let protName = (0, src_core_i18n_js.t)("Protection");
				if (optimalStrategy.protectionItemHrid) {
					const protDetails = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap[optimalStrategy.protectionItemHrid];
					if (protDetails?.name) protName = protDetails.name;
				}
				rows.push({
					name: protName,
					count,
					askPrice,
					bidPrice
				});
			}
			const enhancedPrices = (0, src_utils_market_data_js.getItemPrices)(itemHrid, targetLevel);
			const totalAskColor = enhancedPrices?.ask > 0 ? totalAsk < enhancedPrices.ask ? src_core_config_js.default.COLOR_TOOLTIP_PROFIT : src_core_config_js.default.COLOR_TOOLTIP_LOSS : "";
			const totalBidColor = enhancedPrices?.bid > 0 ? totalBid < enhancedPrices.bid ? src_core_config_js.default.COLOR_TOOLTIP_PROFIT : src_core_config_js.default.COLOR_TOOLTIP_LOSS : "";
			html += `<tr style="border-bottom: 1px solid ${src_core_config_js.default.COLOR_BORDER};">`;
			html += "<td style=\"padding: 2px 4px; font-weight: bold;\">Total</td>";
			html += `<td style="padding: 2px 4px; text-align: center;">${(0, src_utils_formatters_js.formatKMB)(totalCount)}</td>`;
			html += `<td style="padding: 2px 4px; text-align: right; font-weight: bold;${totalAskColor ? " color: " + totalAskColor + ";" : ""}">${(0, src_utils_formatters_js.formatKMB)(totalAsk)}</td>`;
			html += `<td style="padding: 2px 4px; text-align: right; font-weight: bold;${totalBidColor ? " color: " + totalBidColor + ";" : ""}">${(0, src_utils_formatters_js.formatKMB)(totalBid)}</td>`;
			html += "</tr>";
			for (const row of rows) {
				html += "<tr>";
				html += `<td style="padding: 2px 4px;">${row.name}</td>`;
				if (row.isCoin) {
					html += "<td style=\"padding: 2px 4px; text-align: center;\">—</td>";
					html += `<td style="padding: 2px 4px; text-align: right;">${(0, src_utils_formatters_js.formatKMB)(row.count)}</td>`;
					html += `<td style="padding: 2px 4px; text-align: right;">${(0, src_utils_formatters_js.formatKMB)(row.count)}</td>`;
				} else {
					html += `<td style="padding: 2px 4px; text-align: center;">${(0, src_utils_formatters_js.formatKMB)(row.count)}</td>`;
					html += `<td style="padding: 2px 4px; text-align: right;">${(0, src_utils_formatters_js.formatKMB)(row.askPrice)}</td>`;
					html += `<td style="padding: 2px 4px; text-align: right;">${(0, src_utils_formatters_js.formatKMB)(row.bidPrice)}</td>`;
				}
				html += "</tr>";
			}
		}
		html += "</table>";
		html += "</div>";
		const totalSeconds = optimalStrategy.totalTime;
		if (totalSeconds < 60) html += "<div>Time: ~" + Math.round(totalSeconds) + " seconds</div>";
		else if (totalSeconds < 3600) {
			const minutes = Math.round(totalSeconds / 60);
			html += "<div>Time: ~" + minutes + " minutes</div>";
		} else if (totalSeconds < 86400) {
			const hours = (totalSeconds / 3600).toFixed(1);
			html += "<div>Time: ~" + hours + " hours</div>";
		} else {
			const days = (totalSeconds / 86400).toFixed(1);
			html += "<div>Time: ~" + days + " days</div>";
		}
		if (xpPerHour !== null && xpPerHour > 0) html += "<div style=\"margin-top: 4px;\">XP/hr: " + (0, src_utils_formatters_js.formatLargeNumber)(xpPerHour) + "</div>";
		if (totalExpectedXP !== null && totalExpectedXP > 0) html += "<div>Total XP: ~" + (0, src_utils_formatters_js.formatLargeNumber)(totalExpectedXP) + "</div>";
		html += "</div>";
		html += "</div>";
		return html;
	}
	var MILESTONE_LEVELS = [
		5,
		7,
		10,
		12
	];
	/**
	* Build compact enhancement milestones HTML for unenhanced item tooltips
	* Shows expected cost and XP for +5, +7, +10, +12
	* @param {string} itemHrid - Item HRID
	* @param {Object} enhancementConfig - Enhancement configuration from getEnhancingParams()
	* @returns {string} HTML string, or empty string if item is not enhanceable
	*/
	function buildEnhancementMilestonesHTML(itemHrid, enhancementConfig) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return "";
		if (!gameData.itemDetailMap[itemHrid]?.enhancementCosts?.length) return "";
		const showPrices = src_core_config_js.default.getSetting("itemTooltip_prices");
		const useKMB = (0, src_utils_formatters_js.isAbbreviationEnabled)();
		const fmt = (n) => n != null && n > 0 ? useKMB ? (0, src_utils_formatters_js.formatLargeNumber)(n, 0) : (0, src_utils_formatters_js.numberFormatter)(Math.round(n)) : "—";
		const fmtCost = (n) => n != null && n > 0 ? useKMB ? (0, src_utils_formatters_js.formatLargeNumber)(n, 1) : (0, src_utils_formatters_js.numberFormatter)(Math.round(n)) : "—";
		const rows = [];
		for (const level of MILESTONE_LEVELS) {
			const data = calculateEnhancementPath(itemHrid, level, enhancementConfig);
			if (!data) continue;
			const cost = fmtCost(data.optimalStrategy.totalCost);
			const xp = data.totalExpectedXP !== null ? fmt(Math.round(data.totalExpectedXP)) : "—";
			let ask = "—";
			let bid = "—";
			if (showPrices) {
				const prices = (0, src_utils_market_data_js.getItemPrices)(itemHrid, level);
				ask = fmt(prices?.ask);
				bid = fmt(prices?.bid);
			}
			rows.push({
				level,
				cost,
				xp,
				ask,
				bid
			});
		}
		if (rows.length === 0) return "";
		const tdStyle = (align = "right", color = "") => `style="padding: 1px 6px; text-align: ${align};${color ? ` color: ${color};` : ""}"`;
		const thStyle = (align = "right") => `style="padding: 1px 6px; text-align: ${align}; opacity: 0.6; font-weight: normal;"`;
		let html = "<div style=\"border-top: 1px solid rgba(255,255,255,0.2); margin-top: 8px; padding-top: 8px;\">";
		html += "<div style=\"font-weight: bold; margin-bottom: 4px;\">Enhancement Milestones</div>";
		html += "<table style=\"font-size: 0.9em; border-collapse: collapse; width: 100%;\">";
		html += "<thead><tr>";
		html += `<th ${thStyle("left")}>Level</th>`;
		html += `<th ${thStyle()}>Cost</th>`;
		if (showPrices) html += `<th ${thStyle()}>Ask / Bid</th>`;
		html += `<th ${thStyle()}>XP</th>`;
		html += "</tr></thead><tbody>";
		for (const row of rows) {
			html += "<tr>";
			html += `<td ${tdStyle("left", src_core_config_js.default.COLOR_TOOLTIP_INFO)}>+${row.level}</td>`;
			html += `<td ${tdStyle("right", src_core_config_js.default.COLOR_TOOLTIP_INFO)}>${row.cost}</td>`;
			if (showPrices) html += `<td ${tdStyle("right", src_core_config_js.default.COLOR_TOOLTIP_INFO)}>${row.ask} / ${row.bid}</td>`;
			html += `<td ${tdStyle("right", src_core_config_js.default.COLOR_XP_RATE)}>${row.xp}</td>`;
			html += "</tr>";
		}
		html += "</tbody></table>";
		html += "</div>";
		return html;
	}
	//#endregion
	//#region src/features/market/profit-calculator.js
	/**
	* Profit Calculator Module
	* Calculates production costs and profit for crafted items
	*/
	/**
	* ProfitCalculator class handles profit calculations for production actions
	*/
	var ProfitCalculator = class {
		constructor() {
			this._itemDetailMap = null;
			this._actionDetailMap = null;
			this._communityBuffMap = null;
		}
		/**
		* Get item detail map (lazy-loaded and cached)
		* @returns {Object} Item details map from init_client_data
		*/
		getItemDetailMap() {
			if (!this._itemDetailMap) {
				const initData = src_core_data_manager_js.default.getInitClientData();
				this._itemDetailMap = initData?.itemDetailMap || {};
			}
			return this._itemDetailMap;
		}
		/**
		* Get action detail map (lazy-loaded and cached)
		* @returns {Object} Action details map from init_client_data
		*/
		getActionDetailMap() {
			if (!this._actionDetailMap) {
				const initData = src_core_data_manager_js.default.getInitClientData();
				this._actionDetailMap = initData?.actionDetailMap || {};
			}
			return this._actionDetailMap;
		}
		/**
		* Get community buff map (lazy-loaded and cached)
		* @returns {Object} Community buff details map from init_client_data
		*/
		getCommunityBuffMap() {
			if (!this._communityBuffMap) {
				const initData = src_core_data_manager_js.default.getInitClientData();
				this._communityBuffMap = initData?.communityBuffTypeDetailMap || {};
			}
			return this._communityBuffMap;
		}
		/**
		* Calculate profit for a crafted item
		* @param {string} itemHrid - Item HRID
		* @returns {Promise<Object|null>} Profit data or null if not craftable
		*/
		async calculateProfit(itemHrid) {
			const itemDetails = src_core_data_manager_js.default.getItemDetails(itemHrid);
			if (!itemDetails) return null;
			const action = this.findProductionAction(itemHrid);
			if (!action) return null;
			const skills = src_core_data_manager_js.default.getSkills();
			if (!skills) return null;
			const actionDetails = src_core_data_manager_js.default.getActionDetails(action.actionHrid);
			if (!actionDetails) return null;
			const getCachedPrice = (0, src_utils_profit_helpers_js.createPriceCache)(src_utils_market_data_js.getItemPrice);
			const baseTime = actionDetails.baseTimeCost / 1e9;
			const skillLevel = this.getSkillLevel(skills, actionDetails.type);
			const communityBuffLevel = src_core_data_manager_js.default.getCommunityBuffLevel("/community_buff_types/production_efficiency");
			const communityEfficiency = this.calculateCommunityBuffBonus(communityBuffLevel, actionDetails.type);
			const { equipment: characterEquipment, drinkSlots: activeDrinks, drinkConcentration, itemDetailMap, actionTime, artisanBonus, gourmetBonus, processingBonus, equipmentEfficiency, equipmentEfficiencyItems, houseEfficiency, teaEfficiency, achievementEfficiency, personalEfficiency, actionLevelBonus, teaSkillLevelBonus, baseRequirement, speedBonus: equipmentSpeedBonus, personalSpeedBonus, efficiencyBreakdown, efficiencyMultiplier } = (0, src_utils_efficiency_js.getActionEfficiencyContext)(actionDetails, {
				isProduction: true,
				communityEfficiency
			});
			const { totalEfficiency, levelEfficiency, effectiveRequirement } = efficiencyBreakdown;
			const timeBreakdown = this.calculateTimeBreakdown(baseTime, equipmentSpeedBonus + personalSpeedBonus);
			let effectiveActionTime = actionTime;
			if (actionDetails.upgradeItemHrid && src_core_config_js.default.getSetting("profitCalc_craftUpgradeItems")) {
				const upgradeChainTime = getProductionChainTime(actionDetails.upgradeItemHrid);
				if (upgradeChainTime > 0) {
					const resolved = (0, src_utils_profit_helpers_js.resolveItemPrice)(actionDetails.upgradeItemHrid, {
						context: "profit",
						side: "buy"
					});
					const craftCost = getProductionCost(actionDetails.upgradeItemHrid, "ask");
					if (craftCost > 0 && (resolved.price === 0 || craftCost < resolved.price)) {
						const chainTimeWithSpeed = upgradeChainTime / (1 + equipmentSpeedBonus + personalSpeedBonus);
						effectiveActionTime += chainTimeWithSpeed;
					}
				}
			}
			const actionsPerHour = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(effectiveActionTime);
			const outputAmount = action.count || action.baseAmount || 1;
			const itemsPerHour = actionsPerHour * outputAmount * efficiencyMultiplier;
			const gourmetBonusItems = itemsPerHour * gourmetBonus;
			const totalItemsPerHour = itemsPerHour + gourmetBonusItems;
			const materialCosts = this.calculateMaterialCosts(actionDetails, artisanBonus);
			const totalMaterialCost = materialCosts.reduce((sum, mat) => sum + mat.totalCost, 0);
			const itemPrice = src_api_marketplace_js.default.getPrice(itemHrid, 0) || {
				ask: 0,
				bid: 0
			};
			const rawOutputPrice = getCachedPrice(itemHrid, {
				context: "profit",
				side: "sell"
			});
			const outputPriceMissing = rawOutputPrice === null;
			const craftingFallback = outputPriceMissing ? this.calculateCraftingCostFallback(itemHrid, getCachedPrice) : 0;
			const outputPriceEstimated = outputPriceMissing && craftingFallback > 0;
			const outputPrice = outputPriceMissing ? craftingFallback : rawOutputPrice;
			const priceAfterTax = (0, src_utils_profit_helpers_js.calculatePriceAfterTax)(outputPrice);
			const costPerItem = totalMaterialCost / outputAmount;
			const materialCostPerHour = actionsPerHour * totalMaterialCost * efficiencyMultiplier;
			const revenuePerHour = itemsPerHour * outputPrice + gourmetBonusItems * outputPrice;
			const teaCostData = (0, src_utils_profit_helpers_js.calculateTeaCostsPerHour)({
				drinkSlots: activeDrinks,
				drinkConcentration,
				itemDetailMap,
				getItemPrice: getCachedPrice
			});
			const teaCosts = teaCostData.costs;
			const totalTeaCostPerHour = teaCostData.totalCostPerHour;
			const bonusRevenue = (0, src_utils_bonus_revenue_calculator_js.calculateBonusRevenue)(actionDetails, actionsPerHour, characterEquipment, itemDetailMap);
			const hasMissingPrices = outputPriceMissing && !outputPriceEstimated || materialCosts.some((material) => material.missingPrice) || teaCostData.hasMissingPrices || (bonusRevenue?.hasMissingPrices ?? false);
			const efficiencyBoostedBonusRevenue = (bonusRevenue?.totalBonusRevenue || 0) * efficiencyMultiplier;
			const marketTax = (revenuePerHour + efficiencyBoostedBonusRevenue) * src_utils_profit_constants_js.MARKET_TAX;
			const totalCostPerHour = materialCostPerHour + totalTeaCostPerHour + marketTax;
			const totalCostPerAction = totalMaterialCost + totalTeaCostPerHour / actionsPerHour + marketTax / actionsPerHour;
			const profitPerHour = revenuePerHour + efficiencyBoostedBonusRevenue - totalCostPerHour;
			const profitPerItem = profitPerHour / totalItemsPerHour;
			const pricingMode = src_core_config_js.default.getSettingValue("profitCalc_pricingMode", "hybrid");
			return {
				itemName: itemDetails.name,
				itemHrid,
				actionTime: effectiveActionTime,
				actionsPerHour,
				itemsPerHour,
				totalItemsPerHour,
				gourmetBonusItems,
				outputAmount,
				materialCosts,
				totalMaterialCost,
				materialCostPerHour,
				totalCostPerAction,
				teaCosts,
				totalTeaCostPerHour,
				costPerItem,
				itemPrice,
				outputPrice,
				outputPriceMissing,
				outputPriceEstimated,
				priceAfterTax,
				revenuePerHour,
				profitPerItem,
				profitPerHour,
				profitPerAction: (0, src_utils_profit_helpers_js.calculateProfitPerAction)(profitPerHour, actionsPerHour * efficiencyMultiplier),
				profitPerDay: (0, src_utils_profit_helpers_js.calculateProfitPerDay)(profitPerHour),
				bonusRevenue,
				hasMissingPrices,
				totalEfficiency,
				levelEfficiency,
				houseEfficiency,
				equipmentEfficiency,
				equipmentEfficiencyItems,
				teaEfficiency,
				communityEfficiency,
				achievementEfficiency,
				personalEfficiency,
				actionLevelBonus,
				artisanBonus,
				gourmetBonus,
				processingBonus,
				drinkConcentration,
				teaSkillLevelBonus,
				efficiencyMultiplier,
				equipmentSpeedBonus,
				personalSpeedBonus,
				skillLevel,
				baseRequirement,
				effectiveRequirement,
				requiredLevel: effectiveRequirement,
				timeBreakdown,
				pricingMode
			};
		}
		/**
		* Estimate an item's value from the cost of its crafting inputs.
		* Used as a fallback when the item has no market listing (e.g. refined items).
		* @param {string} itemHrid - Item HRID to estimate
		* @param {Function} getCachedPrice - Price lookup function
		* @returns {number} Estimated price (0 if no crafting action found)
		*/
		calculateCraftingCostFallback(itemHrid, getCachedPrice) {
			const actionDetailMap = this.getActionDetailMap();
			for (const action of Object.values(actionDetailMap)) {
				if (!action.outputItems) continue;
				const output = action.outputItems.find((o) => o.itemHrid === itemHrid);
				if (!output) continue;
				let totalCost = 0;
				if (action.upgradeItemHrid) {
					const price = getCachedPrice(action.upgradeItemHrid, {
						context: "profit",
						side: "buy"
					}) ?? 0;
					totalCost += price;
				}
				for (const input of action.inputItems || []) {
					const price = getCachedPrice(input.itemHrid, {
						context: "profit",
						side: "buy"
					}) ?? 0;
					totalCost += price * (input.count || 1);
				}
				return totalCost / (output.count || 1);
			}
			return 0;
		}
		/**
		* Find the action that produces a given item
		* @param {string} itemHrid - Item HRID
		* @returns {Object|null} Action output data or null
		*/
		findProductionAction(itemHrid) {
			const actionDetailMap = this.getActionDetailMap();
			for (const [actionHrid, action] of Object.entries(actionDetailMap)) if (action.outputItems) {
				for (const output of action.outputItems) if (output.itemHrid === itemHrid) return {
					actionHrid,
					...output
				};
			}
			return null;
		}
		/**
		* Calculate material costs for an action
		* @param {Object} actionDetails - Action details from game data
		* @param {number} artisanBonus - Artisan material reduction (0 to 1, e.g., 0.112 for 11.2% reduction)
		* @returns {Array} Array of material cost objects
		*/
		calculateMaterialCosts(actionDetails, artisanBonus = 0) {
			const costs = [];
			if (actionDetails.upgradeItemHrid) {
				const itemDetails = src_core_data_manager_js.default.getItemDetails(actionDetails.upgradeItemHrid);
				if (itemDetails) {
					let resolved;
					let isCrafted = false;
					if (actionDetails.upgradeItemHrid === "/items/coin") resolved = {
						price: 1,
						custom: false,
						missing: false
					};
					else {
						resolved = (0, src_utils_profit_helpers_js.resolveItemPrice)(actionDetails.upgradeItemHrid, {
							context: "profit",
							side: "buy"
						});
						const craftCost = src_core_config_js.default.getSetting("profitCalc_craftUpgradeItems") ? getProductionCost(actionDetails.upgradeItemHrid, "ask") : 0;
						isCrafted = craftCost > 0 && (resolved.price === 0 || craftCost < resolved.price);
						if (isCrafted) resolved = {
							price: craftCost,
							custom: false,
							missing: false
						};
					}
					const reducedAmount = 1;
					costs.push({
						itemHrid: actionDetails.upgradeItemHrid,
						itemName: itemDetails.name,
						baseAmount: 1,
						amount: reducedAmount,
						askPrice: resolved.price,
						totalCost: resolved.price * reducedAmount,
						missingPrice: resolved.missing,
						customPrice: resolved.custom,
						isUpgradeItem: true,
						isCrafted
					});
				}
			}
			if (actionDetails.inputItems && actionDetails.inputItems.length > 0) for (const input of actionDetails.inputItems) {
				const itemDetails = src_core_data_manager_js.default.getItemDetails(input.itemHrid);
				if (!itemDetails) continue;
				const baseAmount = input.count || input.amount || 1;
				const reducedAmount = baseAmount * (1 - artisanBonus);
				let resolved;
				if (input.itemHrid === "/items/coin") resolved = {
					price: 1,
					custom: false,
					missing: false
				};
				else resolved = (0, src_utils_profit_helpers_js.resolveItemPrice)(input.itemHrid, {
					context: "profit",
					side: "buy"
				});
				costs.push({
					itemHrid: input.itemHrid,
					itemName: itemDetails.name,
					baseAmount,
					amount: reducedAmount,
					askPrice: resolved.price,
					totalCost: resolved.price * reducedAmount,
					missingPrice: resolved.missing,
					customPrice: resolved.custom
				});
			}
			return costs;
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
			if (!skill) console.error(`[ProfitCalculator] Skill not found: ${skillHrid}`);
			return skill?.level || 1;
		}
		/**
		* Calculate efficiency bonus from multiple sources
		* @param {number} characterLevel - Character's skill level
		* @param {number} requiredLevel - Action's required level
		* @param {string} actionTypeHrid - Action type HRID for house room matching
		* @returns {number} Total efficiency bonus percentage
		*/
		calculateEfficiencyBonus(characterLevel, requiredLevel, actionTypeHrid) {
			return Math.max(0, characterLevel - requiredLevel) + (0, src_utils_house_efficiency_js.calculateHouseEfficiency)(actionTypeHrid);
		}
		/**
		* Calculate time breakdown showing how modifiers affect action time
		* @param {number} baseTime - Base action time in seconds
		* @param {number} equipmentSpeedBonus - Equipment speed bonus as decimal (e.g., 0.15 for 15%)
		* @returns {Object} Time breakdown with steps
		*/
		calculateTimeBreakdown(baseTime, equipmentSpeedBonus) {
			const steps = [];
			if (equipmentSpeedBonus > 0) {
				const finalTime = baseTime / (1 + equipmentSpeedBonus);
				const reduction = baseTime - finalTime;
				steps.push({
					name: "Equipment Speed",
					bonus: equipmentSpeedBonus * 100,
					reduction,
					timeAfter: finalTime
				});
				return {
					baseTime,
					steps,
					finalTime,
					actionsPerHour: (0, src_utils_profit_helpers_js.calculateActionsPerHour)(finalTime)
				};
			}
			return {
				baseTime,
				steps: [],
				finalTime: baseTime,
				actionsPerHour: (0, src_utils_profit_helpers_js.calculateActionsPerHour)(baseTime)
			};
		}
		/**
		* Calculate community buff bonus for production efficiency
		* @param {number} buffLevel - Community buff level (0-20)
		* @param {string} actionTypeHrid - Action type to check if buff applies
		* @returns {number} Efficiency bonus percentage
		*/
		calculateCommunityBuffBonus(buffLevel, actionTypeHrid) {
			if (buffLevel === 0) return 0;
			const buffDef = this.getCommunityBuffMap()["/community_buff_types/production_efficiency"];
			if (!buffDef?.usableInActionTypeMap?.[actionTypeHrid]) return 0;
			return buffDef.buff.flatBoost * 100 + (buffLevel - 1) * buffDef.buff.flatBoostLevelBonus * 100;
		}
	};
	var profitCalculator = new ProfitCalculator();
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
	var workerPool$1 = null;
	var WORKER_SCRIPT$1 = `
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
	async function getWorkerPool$1() {
		if (workerPool$1) return workerPool$1;
		try {
			workerPool$1 = new WorkerPool(new Blob([WORKER_SCRIPT$1], { type: "application/javascript" }));
			await workerPool$1.initialize();
			return workerPool$1;
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
		const pool = await getWorkerPool$1();
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
				const dropValue = itemHrid === this.COIN_HRID ? avgCount * dropRate * price : canBeSold ? (0, src_utils_profit_helpers_js.calculatePriceAfterTax)(avgCount * dropRate * price, this.MARKET_TAX) : avgCount * dropRate * price;
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
				const bagValue = (0, src_utils_market_data_js.getItemPrice)(this.COWBELL_BAG_HRID, {
					context: "profit",
					side: "sell"
				}) || 0;
				if (bagValue > 0) return (0, src_utils_profit_helpers_js.calculatePriceAfterTax)(bagValue, .18) / 10;
				return null;
			}
			if (this.DUNGEON_TOKENS.includes(itemHrid)) return (0, src_utils_token_valuation_js.calculateDungeonTokenValue)(itemHrid, "profitCalc_pricingMode", "expectedValue_respectPricingMode");
			if (this.containerCache.has(itemHrid)) return this.containerCache.get(itemHrid);
			const dropPrice = (0, src_utils_market_data_js.getItemPrice)(itemHrid, {
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
				const dropValue = price !== null ? isCoin ? avgCount * dropRate * price : itemCanBeSold ? (0, src_utils_profit_helpers_js.calculatePriceAfterTax)(avgCount * dropRate * price, this.MARKET_TAX) : avgCount * dropRate * price : 0;
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
	//#region src/features/market/alchemy-profit-calculator.js
	/**
	* Alchemy Profit Calculator Module
	* Calculates profit for alchemy actions (Coinify, Decompose, Transmute) from game JSON data
	*
	* Success Rates (Base, Unmodified):
	* - Coinify: 70% (0.7)
	* - Decompose: 60% (0.6)
	* - Transmute: Varies by item (from item.alchemyDetail.transmuteSuccessRate)
	*
	* Success Rate Modifiers:
	* - Tea: Catalytic Tea provides /buff_types/alchemy_success (5% ratio boost, scales with Drink Concentration)
	* - Catalyst (type-specific): +15% multiplicative, consumed once per successful action
	* - Catalyst (prime): +25% multiplicative, consumed once per successful action
	* - Transmute under-level penalty: perLevel = 0.9 / itemLevel, applied when alchemyLevel < itemLevel
	* - Formula (coinify/decompose): finalRate = min(1, baseRate × (1 + catalystBonus + teaBonus))
	* - Formula (transmute): finalRate = min(1, baseRate × (1 + catalyst + perLevel × (alchemyLvl - itemLvl) + tea))
	*/
	var BASE_SUCCESS_RATES = {
		COINIFY: .7,
		DECOMPOSE: .6
	};
	var CATALYST_HRIDS = {
		coinify: "/items/catalyst_of_coinification",
		decompose: "/items/catalyst_of_decomposition",
		transmute: "/items/catalyst_of_transmutation",
		prime: "/items/prime_catalyst"
	};
	var CATALYST_BONUSES = {
		typeSpecific: .15,
		prime: .25
	};
	/**
	* @param {Object} itemDetails - Item details from dataManager
	* @param {'decompose'|'transmute'} alchemyType - Which alchemy action
	* @returns {number} Gold cost per alchemy action (includes bulkMultiplier)
	*/
	function calculateAlchemyCoinCost(itemDetails, alchemyType) {
		const bulkMultiplier = itemDetails.alchemyDetail?.bulkMultiplier || 1;
		if (alchemyType === "transmute") {
			const sellPrice = itemDetails.sellPrice || 0;
			return Math.max(50, Math.floor(sellPrice / 5)) * bulkMultiplier;
		}
		return (10 + (itemDetails.itemLevel || 1)) * 5 * bulkMultiplier;
	}
	/**
	* Calculate alchemy-specific bonus drops (essences + rares) from item level.
	* Alchemy actions don't have essenceDropTable/rareDropTable in game data,
	* so we compute them from the item's level using reverse-engineered formulas.
	*
	* Essence: baseRate = (100 + itemLevel) / 1800
	* Rare (Small, level 1-34):  baseRate = (100 + itemLevel) / 144000
	* Rare (Medium, level 35-69): baseRate = (65 + itemLevel) / 216000
	* Rare (Large, level 70+):    baseRate = (30 + itemLevel) / 288000
	*
	* @param {number} itemLevel - The item's level (from itemDetails.itemLevel)
	* @param {number} actionsPerHour - Actions per hour (with efficiency)
	* @param {Map} equipment - Character equipment map
	* @param {Object} itemDetailMap - Item details map
	* @returns {Object} Bonus drop data with drops array and breakdowns
	*/
	function calculateAlchemyBonusDrops(itemLevel, actionsPerHour, equipment, itemDetailMap) {
		const essenceFindBonus = (0, src_utils_equipment_parser_js.parseEssenceFindBonus)(equipment, itemDetailMap);
		const equipmentRareFindBonus = (0, src_utils_equipment_parser_js.parseRareFindBonus)(equipment, "/action_types/alchemy", itemDetailMap);
		const houseRareFindBonus = (0, src_utils_house_efficiency_js.calculateHouseRareFind)();
		const achievementRareFindBonus = src_core_data_manager_js.default.getAchievementBuffFlatBoost("/action_types/alchemy", "/buff_types/rare_find") * 100;
		const personalRareFindBonus = src_core_data_manager_js.default.getPersonalBuffFlatBoost("/action_types/alchemy", "/buff_types/rare_find") * 100;
		const guildBuffs = src_core_data_manager_js.default.characterData?.guildActionTypeBuffsMap?.["/action_types/alchemy"] || [];
		const guildRareFindBonus = guildBuffs.reduce((sum, b) => b.typeHrid === "/buff_types/rare_find" ? sum + (b.flatBoost || 0) + (b.ratioBoost || 0) : sum, 0) * 100;
		const guildEssenceFindBonus = guildBuffs.reduce((sum, b) => b.typeHrid === "/buff_types/essence_find" ? sum + (b.flatBoost || 0) + (b.ratioBoost || 0) : sum, 0) * 100;
		const totalEssenceFindBonus = essenceFindBonus + guildEssenceFindBonus;
		const rareFindBonus = equipmentRareFindBonus + houseRareFindBonus + achievementRareFindBonus + personalRareFindBonus + guildRareFindBonus;
		const bonusDrops = [];
		let totalBonusRevenue = 0;
		const finalEssenceRate = (100 + itemLevel) / 1800 * (1 + totalEssenceFindBonus / 100);
		const essenceDropsPerHour = actionsPerHour * finalEssenceRate;
		let essencePrice = 0;
		if (itemDetailMap["/items/alchemy_essence"]?.isOpenable) essencePrice = expectedValueCalculator.getCachedValue("/items/alchemy_essence") || 0;
		else essencePrice = src_api_marketplace_js.default.getPrice("/items/alchemy_essence", 0)?.bid ?? 0;
		const essenceRevenuePerHour = essenceDropsPerHour * essencePrice;
		bonusDrops.push({
			itemHrid: "/items/alchemy_essence",
			count: 1,
			dropRate: finalEssenceRate,
			effectiveDropRate: finalEssenceRate,
			price: essencePrice,
			isEssence: true,
			isRare: false,
			revenuePerAttempt: finalEssenceRate * essencePrice,
			revenuePerHour: essenceRevenuePerHour,
			dropsPerHour: essenceDropsPerHour
		});
		totalBonusRevenue += essenceRevenuePerHour;
		let baseRareRate;
		let crateHrid;
		if (itemLevel < 35) {
			baseRareRate = (100 + itemLevel) / 144e3;
			crateHrid = "/items/small_artisans_crate";
		} else if (itemLevel < 70) {
			baseRareRate = (65 + itemLevel) / 216e3;
			crateHrid = "/items/medium_artisans_crate";
		} else {
			baseRareRate = (30 + itemLevel) / 288e3;
			crateHrid = "/items/large_artisans_crate";
		}
		const finalRareRate = baseRareRate * (1 + rareFindBonus / 100);
		const rareDropsPerHour = actionsPerHour * finalRareRate;
		let cratePrice = 0;
		if (itemDetailMap[crateHrid]?.isOpenable) cratePrice = expectedValueCalculator.getCachedValue(crateHrid) || expectedValueCalculator.calculateSingleContainer(crateHrid) || 0;
		else cratePrice = src_api_marketplace_js.default.getPrice(crateHrid, 0)?.bid ?? 0;
		const rareRevenuePerHour = rareDropsPerHour * cratePrice;
		bonusDrops.push({
			itemHrid: crateHrid,
			count: 1,
			dropRate: finalRareRate,
			effectiveDropRate: finalRareRate,
			price: cratePrice,
			isEssence: false,
			isRare: true,
			revenuePerAttempt: finalRareRate * cratePrice,
			revenuePerHour: rareRevenuePerHour,
			dropsPerHour: rareDropsPerHour
		});
		totalBonusRevenue += rareRevenuePerHour;
		return {
			bonusDrops,
			totalBonusRevenue,
			essenceFindBonus: totalEssenceFindBonus,
			rareFindBonus,
			rareFindBreakdown: {
				equipment: equipmentRareFindBonus,
				house: houseRareFindBonus,
				achievement: achievementRareFindBonus,
				personal: personalRareFindBonus,
				guild: guildRareFindBonus,
				total: rareFindBonus
			},
			essenceFindBreakdown: {
				equipment: essenceFindBonus,
				guild: guildEssenceFindBonus,
				total: totalEssenceFindBonus
			}
		};
	}
	var AlchemyProfitCalculator = class {
		constructor() {
			this._itemDetailMap = null;
		}
		/**
		* Get item detail map (lazy-loaded and cached)
		* @returns {Object} Item details map from init_client_data
		*/
		getItemDetailMap() {
			if (!this._itemDetailMap) {
				const initData = src_core_data_manager_js.default.getInitClientData();
				this._itemDetailMap = initData?.itemDetailMap || {};
			}
			return this._itemDetailMap;
		}
		/**
		* Calculate success rate with detailed breakdown
		* @param {number} baseRate - Base success rate (0-1)
		* @param {number} catalystBonus - Catalyst multiplicative bonus (0, 0.15, or 0.25)
		* @param {number|null} teaBonusOverride - If provided, use this instead of reading live buffs
		* @param {number} levelPenalty - Under-level penalty term (negative when below item level, 0 otherwise)
		* @returns {Object} Success rate breakdown { total, base, tea, catalyst, levelPenalty }
		*/
		calculateSuccessRateBreakdown(baseRate, catalystBonus = 0, teaBonusOverride = null, levelPenalty = 0) {
			try {
				const teaBonus = teaBonusOverride !== null ? teaBonusOverride : (0, src_utils_buff_parser_js.getAlchemySuccessBonus)();
				const total = Math.min(1, baseRate * (1 + catalystBonus + levelPenalty + teaBonus));
				return {
					total: Math.max(0, total),
					base: baseRate,
					tea: teaBonus,
					catalyst: catalystBonus,
					levelPenalty
				};
			} catch (error) {
				console.error("[AlchemyProfitCalculator] Failed to calculate success rate breakdown:", error);
				return {
					total: baseRate,
					base: baseRate,
					tea: 0,
					catalyst: 0
				};
			}
		}
		/**
		* Find the best catalyst+tea combination for an alchemy action.
		* Evaluates 6 combinations (no/type/prime catalyst × no/live tea) and returns
		* the combo that yields the highest profitPerHour.
		*
		* @param {Object} params
		* @param {string} params.actionType - 'coinify' | 'decompose' | 'transmute'
		* @param {number} params.baseSuccessRate - Base success rate before modifiers
		* @param {number} params.actionsPerHour - Actions per hour (with efficiency)
		* @param {number} params.efficiencyDecimal - Efficiency as decimal
		* @param {number} params.actionTime - Action time in seconds
		* @param {number} params.alchemyBonusRevenue - Bonus revenue per hour (essences + rares)
		* @param {Function} params.computeNetProfit - fn(successRate) => netProfitPerAttempt
		* @param {Function} params.computeTeaCost - fn(teaBonus) => totalTeaCostPerHour
		* @param {number} [params.levelPenalty=0] - Under-level penalty for transmute
		* @returns {Object} { catalystBonus, catalystHrid, catalystPrice, teaBonus, teaCostPerHour, successRateBreakdown }
		*/
		_bestCatalystCombo({ actionType, baseSuccessRate, actionsPerHour, efficiencyDecimal, actionTime, alchemyBonusRevenue, computeNetProfit, computeTeaCost, levelPenalty = 0, teaBonusOverride = null }) {
			const liveTeaBonus = teaBonusOverride !== null ? teaBonusOverride : (0, src_utils_buff_parser_js.getAlchemySuccessBonus)();
			const typeSpecificHrid = CATALYST_HRIDS[actionType];
			const primeCatalystHrid = CATALYST_HRIDS.prime;
			const typeSpecificPrice = (0, src_utils_market_data_js.getItemPrice)(typeSpecificHrid, {
				context: "profit",
				side: "buy"
			}) ?? 0;
			const primeCatalystPrice = (0, src_utils_market_data_js.getItemPrice)(primeCatalystHrid, {
				context: "profit",
				side: "buy"
			}) ?? 0;
			const combinations = [
				{
					catalystBonus: 0,
					catalystHrid: null,
					catalystPrice: 0,
					teaBonus: liveTeaBonus
				},
				{
					catalystBonus: 0,
					catalystHrid: null,
					catalystPrice: 0,
					teaBonus: 0
				},
				{
					catalystBonus: CATALYST_BONUSES.typeSpecific,
					catalystHrid: typeSpecificHrid,
					catalystPrice: typeSpecificPrice,
					teaBonus: liveTeaBonus
				},
				{
					catalystBonus: CATALYST_BONUSES.typeSpecific,
					catalystHrid: typeSpecificHrid,
					catalystPrice: typeSpecificPrice,
					teaBonus: 0
				},
				{
					catalystBonus: CATALYST_BONUSES.prime,
					catalystHrid: primeCatalystHrid,
					catalystPrice: primeCatalystPrice,
					teaBonus: liveTeaBonus
				},
				{
					catalystBonus: CATALYST_BONUSES.prime,
					catalystHrid: primeCatalystHrid,
					catalystPrice: primeCatalystPrice,
					teaBonus: 0
				}
			];
			let best = null;
			let bestProfitPerHour = -Infinity;
			for (const combo of combinations) {
				const successRateBreakdown = this.calculateSuccessRateBreakdown(baseSuccessRate, combo.catalystBonus, combo.teaBonus, levelPenalty);
				const successRate = successRateBreakdown.total;
				const catalystCostPerAttempt = combo.catalystPrice * successRate;
				const catalystCostPerHour = catalystCostPerAttempt * actionsPerHour;
				const netProfitPerAttempt = computeNetProfit(successRate) - catalystCostPerAttempt;
				const teaCostPerHour = combo.teaBonus > 0 ? computeTeaCost(combo.teaBonus) : 0;
				const profitPerHour = netProfitPerAttempt * (1 + efficiencyDecimal) / actionTime * src_utils_profit_constants_js.SECONDS_PER_HOUR + alchemyBonusRevenue - teaCostPerHour;
				if (profitPerHour > bestProfitPerHour) {
					bestProfitPerHour = profitPerHour;
					best = {
						...combo,
						successRateBreakdown,
						successRate,
						catalystCostPerAttempt,
						catalystCostPerHour,
						teaCostPerHour,
						netProfitPerAttempt,
						profitPerHour
					};
				}
			}
			return best;
		}
		_liveSetupCombo({ baseSuccessRate, actionsPerHour, efficiencyDecimal, actionTime, alchemyBonusRevenue, computeNetProfit, computeTeaCost, levelPenalty = 0 }) {
			const liveTeaBonus = (0, src_utils_buff_parser_js.getAlchemySuccessBonus)();
			const iconName = document.querySelector("[class*=\"SkillActionDetail_catalystItemInputContainer\"] [class*=\"Item_itemContainer\"] svg use")?.getAttribute("href")?.match(/#(.+)$/)?.[1] || null;
			const liveCatalystHrid = iconName ? `/items/${iconName}` : null;
			let catalystBonus = 0;
			let catalystHrid = null;
			let catalystPrice = 0;
			if (liveCatalystHrid === CATALYST_HRIDS.prime) {
				catalystBonus = CATALYST_BONUSES.prime;
				catalystHrid = liveCatalystHrid;
			} else if (liveCatalystHrid && Object.values(CATALYST_HRIDS).includes(liveCatalystHrid)) {
				catalystBonus = CATALYST_BONUSES.typeSpecific;
				catalystHrid = liveCatalystHrid;
			}
			if (catalystHrid) catalystPrice = (0, src_utils_market_data_js.getItemPrice)(catalystHrid, {
				context: "profit",
				side: "buy"
			}) ?? 0;
			const successRateBreakdown = this.calculateSuccessRateBreakdown(baseSuccessRate, catalystBonus, liveTeaBonus, levelPenalty);
			const successRate = successRateBreakdown.total;
			const catalystCostPerAttempt = catalystPrice * successRate;
			const catalystCostPerHour = catalystCostPerAttempt * actionsPerHour;
			const teaCostPerHour = liveTeaBonus > 0 ? computeTeaCost(liveTeaBonus) : 0;
			const netProfitPerAttempt = computeNetProfit(successRate) - catalystCostPerAttempt;
			const profitPerHour = netProfitPerAttempt * (1 + efficiencyDecimal) / actionTime * src_utils_profit_constants_js.SECONDS_PER_HOUR + alchemyBonusRevenue - teaCostPerHour;
			return {
				catalystBonus,
				catalystHrid,
				catalystPrice,
				teaBonus: liveTeaBonus,
				successRateBreakdown,
				successRate,
				catalystCostPerAttempt,
				catalystCostPerHour,
				teaCostPerHour,
				netProfitPerAttempt,
				profitPerHour
			};
		}
		/**
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level (default 0)
		* @returns {Object|null} Detailed profit data or null if not coinifiable
		*/
		calculateCoinifyProfit(itemHrid, enhancementLevel = 0, useLiveSetup = false, teaBonusOverride = null) {
			try {
				const gameData = src_core_data_manager_js.default.getInitClientData();
				const itemDetails = src_core_data_manager_js.default.getItemDetails(itemHrid);
				if (!gameData || !itemDetails) return null;
				if (!itemDetails.alchemyDetail || itemDetails.alchemyDetail.isCoinifiable !== true) return null;
				const actionDetails = gameData.actionDetailMap["/actions/alchemy/coinify"];
				if (!actionDetails) return null;
				const pricingMode = src_core_config_js.default.getSettingValue("profitCalc_pricingMode", "hybrid");
				const { actionTime, totalEfficiency, efficiencyBreakdown } = (0, src_utils_action_calculator_js.calculateActionStats)(actionDetails, {
					skills: src_core_data_manager_js.default.getSkills(),
					equipment: src_core_data_manager_js.default.getEquipment(),
					itemDetailMap: gameData.itemDetailMap,
					includeCommunityBuff: true,
					includeBreakdown: true,
					levelRequirementOverride: itemDetails.itemLevel || 1
				});
				const equipment = src_core_data_manager_js.default.getEquipment();
				actionDetails.baseTimeCost / 1e9;
				const speedBonus = (0, src_utils_equipment_parser_js.parseEquipmentSpeedBonuses)(equipment, actionDetails.type, gameData.itemDetailMap);
				const allSpeedBonuses = (0, src_utils_equipment_parser_js.debugEquipmentSpeedBonuses)(equipment, gameData.itemDetailMap);
				const skillSpecificSpeed = actionDetails.type.replace("/action_types/", "") + "Speed";
				const relevantSpeeds = allSpeedBonuses.filter((item) => {
					return item.speedType === skillSpecificSpeed || item.speedType === "skillingSpeed";
				});
				const teaSpeed = 0;
				const actionSpeedBreakdown = {
					total: speedBonus + teaSpeed,
					equipment: speedBonus,
					tea: teaSpeed,
					equipmentDetails: relevantSpeeds.map((item) => ({
						name: item.itemName,
						enhancementLevel: item.enhancementLevel,
						speedBonus: item.scaledBonus
					})),
					teaDetails: []
				};
				const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, gameData.itemDetailMap);
				const bulkMultiplier = itemDetails.alchemyDetail?.bulkMultiplier || 1;
				const pricePerItem = (0, src_utils_market_data_js.getItemPrice)(itemHrid, {
					context: "profit",
					side: "buy",
					enhancementLevel
				});
				if (pricePerItem === null) return null;
				const materialCost = pricePerItem * bulkMultiplier;
				const coinCost = 0;
				const coinsProduced = (itemDetails.sellPrice || 0) * bulkMultiplier * 5;
				const efficiencyDecimal = totalEfficiency / 100;
				const actionsPerHourWithEfficiency = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime) * (1 + efficiencyDecimal);
				const alchemyBonus = calculateAlchemyBonusDrops(itemDetails.itemLevel || 1, actionsPerHourWithEfficiency, equipment, gameData.itemDetailMap);
				const teaCostData = (0, src_utils_profit_helpers_js.calculateTeaCostsPerHour)({
					drinkSlots: src_core_data_manager_js.default.getActionDrinkSlots("/action_types/alchemy"),
					drinkConcentration,
					itemDetailMap: gameData.itemDetailMap,
					getItemPrice: (hrid) => (0, src_utils_market_data_js.getItemPrice)(hrid, {
						context: "profit",
						side: "buy"
					})
				});
				const combo = (useLiveSetup ? this._liveSetupCombo.bind(this) : this._bestCatalystCombo.bind(this))({
					actionType: "coinify",
					baseSuccessRate: BASE_SUCCESS_RATES.COINIFY,
					actionsPerHour: actionsPerHourWithEfficiency,
					efficiencyDecimal,
					actionTime,
					alchemyBonusRevenue: alchemyBonus.totalBonusRevenue,
					computeNetProfit: (successRate) => coinsProduced * successRate - (materialCost + coinCost),
					computeTeaCost: () => teaCostData.totalCostPerHour,
					teaBonusOverride
				});
				const { successRateBreakdown, successRate, catalystCostPerAttempt, catalystCostPerHour, teaCostPerHour, netProfitPerAttempt, profitPerHour: comboProfitPerHour } = combo;
				const revenuePerAttempt = coinsProduced * successRate;
				const costPerAttempt = materialCost + coinCost + catalystCostPerAttempt;
				const materialCostPerHour = (materialCost + coinCost) * actionsPerHourWithEfficiency;
				const revenuePerHour = revenuePerAttempt * actionsPerHourWithEfficiency + alchemyBonus.totalBonusRevenue;
				const profitPerHour = comboProfitPerHour;
				const profitPerDay = (0, src_utils_profit_helpers_js.calculateProfitPerDay)(profitPerHour);
				const requirementCosts = [{
					itemHrid,
					count: bulkMultiplier,
					price: pricePerItem,
					costPerAction: materialCost,
					costPerHour: materialCost * actionsPerHourWithEfficiency,
					enhancementLevel: enhancementLevel || 0
				}];
				const dropRevenues = [{
					itemHrid: "/items/coin",
					count: coinsProduced,
					dropRate: 1,
					effectiveDropRate: 1,
					price: 1,
					isEssence: false,
					isRare: false,
					revenuePerAttempt,
					revenuePerHour: revenuePerAttempt * actionsPerHourWithEfficiency,
					dropsPerHour: coinsProduced * successRate * actionsPerHourWithEfficiency
				}];
				for (const drop of alchemyBonus.bonusDrops) dropRevenues.push(drop);
				const catalystCost = {
					itemHrid: combo.catalystHrid,
					price: combo.catalystPrice,
					costPerSuccess: combo.catalystPrice,
					costPerAttempt: catalystCostPerAttempt,
					costPerHour: catalystCostPerHour
				};
				const consumableCosts = teaCostData.costs.map((cost) => ({
					itemHrid: cost.itemHrid,
					price: cost.pricePerDrink,
					drinksPerHour: cost.drinksPerHour,
					costPerHour: cost.totalCost
				}));
				return {
					actionType: "coinify",
					itemHrid,
					enhancementLevel,
					profitPerHour,
					profitPerDay,
					revenuePerHour,
					actionsPerHour: actionsPerHourWithEfficiency,
					actionTime,
					materialCost,
					catalystPrice: combo.catalystPrice,
					costPerAttempt,
					incomePerAttempt: revenuePerAttempt,
					netProfitPerAttempt,
					profitPerAction: profitPerHour / actionsPerHourWithEfficiency,
					materialCostPerHour,
					catalystCostPerHour,
					totalTeaCostPerHour: teaCostPerHour,
					requirementCosts,
					dropRevenues,
					catalystCost,
					consumableCosts,
					successRate,
					efficiency: efficiencyDecimal,
					successRateBreakdown,
					efficiencyBreakdown,
					actionSpeedBreakdown,
					rareFindBreakdown: alchemyBonus.rareFindBreakdown,
					essenceFindBreakdown: alchemyBonus.essenceFindBreakdown,
					winningCatalystHrid: combo.catalystHrid,
					winningTeaUsed: combo.teaBonus > 0,
					pricingMode
				};
			} catch (error) {
				console.error("[AlchemyProfitCalculator] Failed to calculate coinify profit:", error);
				return null;
			}
		}
		/**
		* Calculate Decompose profit for an item with full detailed breakdown
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level (default 0)
		* @returns {Object|null} Profit data or null if not decomposable
		*/
		calculateDecomposeProfit(itemHrid, enhancementLevel = 0, useLiveSetup = false, teaBonusOverride = null) {
			try {
				const gameData = src_core_data_manager_js.default.getInitClientData();
				const itemDetails = src_core_data_manager_js.default.getItemDetails(itemHrid);
				if (!gameData || !itemDetails) return null;
				if (!itemDetails.alchemyDetail || !itemDetails.alchemyDetail.decomposeItems) return null;
				const actionDetails = gameData.actionDetailMap["/actions/alchemy/decompose"];
				if (!actionDetails) return null;
				const pricingMode = src_core_config_js.default.getSettingValue("profitCalc_pricingMode", "hybrid");
				const { actionTime, totalEfficiency, efficiencyBreakdown } = (0, src_utils_action_calculator_js.calculateActionStats)(actionDetails, {
					skills: src_core_data_manager_js.default.getSkills(),
					equipment: src_core_data_manager_js.default.getEquipment(),
					itemDetailMap: gameData.itemDetailMap,
					includeCommunityBuff: true,
					includeBreakdown: true,
					levelRequirementOverride: itemDetails.itemLevel || 1
				});
				const equipment = src_core_data_manager_js.default.getEquipment();
				actionDetails.baseTimeCost / 1e9;
				const speedBonus = (0, src_utils_equipment_parser_js.parseEquipmentSpeedBonuses)(equipment, actionDetails.type, gameData.itemDetailMap);
				const allSpeedBonuses = (0, src_utils_equipment_parser_js.debugEquipmentSpeedBonuses)(equipment, gameData.itemDetailMap);
				const skillSpecificSpeed = actionDetails.type.replace("/action_types/", "") + "Speed";
				const relevantSpeeds = allSpeedBonuses.filter((item) => {
					return item.speedType === skillSpecificSpeed || item.speedType === "skillingSpeed";
				});
				const teaSpeed = 0;
				const actionSpeedBreakdown = {
					total: speedBonus + teaSpeed,
					equipment: speedBonus,
					tea: teaSpeed,
					equipmentDetails: relevantSpeeds.map((item) => ({
						name: item.itemName,
						enhancementLevel: item.enhancementLevel,
						speedBonus: item.scaledBonus
					})),
					teaDetails: []
				};
				const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, gameData.itemDetailMap);
				const inputPrice = (0, src_utils_market_data_js.getItemPrice)(itemHrid, {
					context: "profit",
					side: "buy",
					enhancementLevel
				});
				if (inputPrice === null) return null;
				let outputValue = 0;
				const dropDetails = [];
				for (const output of itemDetails.alchemyDetail.decomposeItems) {
					const outputPrice = (0, src_utils_market_data_js.getItemPrice)(output.itemHrid, {
						context: "profit",
						side: "sell"
					});
					if (outputPrice !== null) {
						const afterTax = (0, src_utils_profit_helpers_js.calculatePriceAfterTax)(outputPrice);
						const dropValue = afterTax * output.count;
						outputValue += dropValue;
						dropDetails.push({
							itemHrid: output.itemHrid,
							count: output.count,
							price: outputPrice,
							afterTax,
							isEssence: false,
							expectedValue: dropValue
						});
					}
				}
				let essenceAmount = 0;
				if (enhancementLevel > 0) {
					const itemLevel = itemDetails.itemLevel || 1;
					essenceAmount = Math.round(2 * (.5 + .1 * Math.pow(1.05, itemLevel)) * Math.pow(2, enhancementLevel));
					const essencePrice = (0, src_utils_market_data_js.getItemPrice)("/items/enhancing_essence", {
						context: "profit",
						side: "sell"
					});
					if (essencePrice !== null) {
						const afterTax = (0, src_utils_profit_helpers_js.calculatePriceAfterTax)(essencePrice);
						const dropValue = afterTax * essenceAmount;
						outputValue += dropValue;
						dropDetails.push({
							itemHrid: "/items/enhancing_essence",
							count: essenceAmount,
							price: essencePrice,
							afterTax,
							isEssence: true,
							expectedValue: dropValue
						});
					}
				}
				const coinCost = calculateAlchemyCoinCost(itemDetails, "decompose");
				const efficiencyDecimal = totalEfficiency / 100;
				const actionsPerHourWithEfficiency = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime) * (1 + efficiencyDecimal);
				const alchemyBonus = calculateAlchemyBonusDrops(itemDetails.itemLevel || 1, actionsPerHourWithEfficiency, equipment, gameData.itemDetailMap);
				const teaCostData = (0, src_utils_profit_helpers_js.calculateTeaCostsPerHour)({
					drinkSlots: src_core_data_manager_js.default.getActionDrinkSlots("/action_types/alchemy"),
					drinkConcentration,
					itemDetailMap: gameData.itemDetailMap,
					getItemPrice: (hrid) => (0, src_utils_market_data_js.getItemPrice)(hrid, {
						context: "profit",
						side: "buy"
					})
				});
				const combo = (useLiveSetup ? this._liveSetupCombo.bind(this) : this._bestCatalystCombo.bind(this))({
					actionType: "decompose",
					baseSuccessRate: BASE_SUCCESS_RATES.DECOMPOSE,
					actionsPerHour: actionsPerHourWithEfficiency,
					efficiencyDecimal,
					actionTime,
					alchemyBonusRevenue: alchemyBonus.totalBonusRevenue,
					computeNetProfit: (successRate) => outputValue * successRate - (inputPrice + coinCost),
					computeTeaCost: () => teaCostData.totalCostPerHour,
					teaBonusOverride
				});
				const { successRateBreakdown, successRate, catalystCostPerAttempt, catalystCostPerHour, teaCostPerHour, netProfitPerAttempt, profitPerHour: comboProfitPerHour } = combo;
				const revenuePerAttempt = outputValue * successRate;
				const costPerAttempt = inputPrice + coinCost + catalystCostPerAttempt;
				const materialCostPerHour = (inputPrice + coinCost) * actionsPerHourWithEfficiency;
				const revenuePerHour = revenuePerAttempt * actionsPerHourWithEfficiency + alchemyBonus.totalBonusRevenue;
				const profitPerHour = comboProfitPerHour;
				const profitPerDay = (0, src_utils_profit_helpers_js.calculateProfitPerDay)(profitPerHour);
				const requirementCosts = [{
					itemHrid,
					count: 1,
					price: inputPrice,
					costPerAction: inputPrice,
					costPerHour: inputPrice * actionsPerHourWithEfficiency,
					enhancementLevel: enhancementLevel || 0
				}];
				if (coinCost > 0) requirementCosts.push({
					itemHrid: "/items/coin",
					count: coinCost,
					price: 1,
					costPerAction: coinCost,
					costPerHour: coinCost * actionsPerHourWithEfficiency,
					enhancementLevel: 0
				});
				const dropRevenues = dropDetails.map((drop) => ({
					itemHrid: drop.itemHrid,
					count: drop.count,
					dropRate: 1,
					effectiveDropRate: 1,
					price: drop.price,
					isEssence: drop.isEssence,
					isRare: false,
					revenuePerAttempt: drop.expectedValue * successRate,
					revenuePerHour: drop.expectedValue * successRate * actionsPerHourWithEfficiency,
					dropsPerHour: drop.count * successRate * actionsPerHourWithEfficiency
				}));
				for (const drop of alchemyBonus.bonusDrops) dropRevenues.push(drop);
				const catalystCost = {
					itemHrid: combo.catalystHrid,
					price: combo.catalystPrice,
					costPerSuccess: combo.catalystPrice,
					costPerAttempt: catalystCostPerAttempt,
					costPerHour: catalystCostPerHour
				};
				const consumableCosts = teaCostData.costs.map((cost) => ({
					itemHrid: cost.itemHrid,
					price: cost.pricePerDrink,
					drinksPerHour: cost.drinksPerHour,
					costPerHour: cost.totalCost
				}));
				return {
					actionType: "decompose",
					itemHrid,
					enhancementLevel,
					profitPerHour,
					profitPerDay,
					revenuePerHour,
					actionsPerHour: actionsPerHourWithEfficiency,
					actionTime,
					materialCost: inputPrice,
					catalystPrice: combo.catalystPrice,
					costPerAttempt,
					incomePerAttempt: revenuePerAttempt,
					netProfitPerAttempt,
					profitPerAction: profitPerHour / actionsPerHourWithEfficiency,
					materialCostPerHour,
					catalystCostPerHour,
					totalTeaCostPerHour: teaCostPerHour,
					requirementCosts,
					dropRevenues,
					catalystCost,
					consumableCosts,
					successRate,
					efficiency: efficiencyDecimal,
					successRateBreakdown,
					efficiencyBreakdown,
					actionSpeedBreakdown,
					rareFindBreakdown: alchemyBonus.rareFindBreakdown,
					essenceFindBreakdown: alchemyBonus.essenceFindBreakdown,
					winningCatalystHrid: combo.catalystHrid,
					winningTeaUsed: combo.teaBonus > 0,
					pricingMode
				};
			} catch (error) {
				console.error("[AlchemyProfitCalculator] Failed to calculate decompose profit:", error);
				return null;
			}
		}
		/**
		* Calculate Transmute profit for an item with full detailed breakdown
		* @param {string} itemHrid - Item HRID
		* @returns {Object|null} Profit data or null if not transmutable
		*/
		calculateTransmuteProfit(itemHrid, useLiveSetup = false, teaBonusOverride = null) {
			try {
				const gameData = src_core_data_manager_js.default.getInitClientData();
				const itemDetails = src_core_data_manager_js.default.getItemDetails(itemHrid);
				if (!gameData || !itemDetails) return null;
				if (!itemDetails.alchemyDetail || !itemDetails.alchemyDetail.transmuteDropTable) return null;
				const baseSuccessRate = itemDetails.alchemyDetail.transmuteSuccessRate || 0;
				if (baseSuccessRate === 0) return null;
				const itemLevel = itemDetails.itemLevel || 1;
				const alchemyLevel = (src_core_data_manager_js.default.getSkills()?.find((s) => s.skillHrid === "/skills/alchemy"))?.level || 1;
				const levelPenalty = alchemyLevel < itemLevel ? .9 / itemLevel * (alchemyLevel - itemLevel) : 0;
				const actionDetails = gameData.actionDetailMap["/actions/alchemy/transmute"];
				if (!actionDetails) return null;
				const pricingMode = src_core_config_js.default.getSettingValue("profitCalc_pricingMode", "hybrid");
				const { actionTime, totalEfficiency, efficiencyBreakdown } = (0, src_utils_action_calculator_js.calculateActionStats)(actionDetails, {
					skills: src_core_data_manager_js.default.getSkills(),
					equipment: src_core_data_manager_js.default.getEquipment(),
					itemDetailMap: gameData.itemDetailMap,
					includeCommunityBuff: true,
					includeBreakdown: true,
					levelRequirementOverride: itemDetails.itemLevel || 1
				});
				const equipment = src_core_data_manager_js.default.getEquipment();
				actionDetails.baseTimeCost / 1e9;
				const speedBonus = (0, src_utils_equipment_parser_js.parseEquipmentSpeedBonuses)(equipment, actionDetails.type, gameData.itemDetailMap);
				const allSpeedBonuses = (0, src_utils_equipment_parser_js.debugEquipmentSpeedBonuses)(equipment, gameData.itemDetailMap);
				const skillSpecificSpeed = actionDetails.type.replace("/action_types/", "") + "Speed";
				const relevantSpeeds = allSpeedBonuses.filter((item) => {
					return item.speedType === skillSpecificSpeed || item.speedType === "skillingSpeed";
				});
				const teaSpeed = 0;
				const actionSpeedBreakdown = {
					total: speedBonus + teaSpeed,
					equipment: speedBonus,
					tea: teaSpeed,
					equipmentDetails: relevantSpeeds.map((item) => ({
						name: item.itemName,
						enhancementLevel: item.enhancementLevel,
						speedBonus: item.scaledBonus
					})),
					teaDetails: []
				};
				const drinkConcentration = (0, src_utils_tea_parser_js.getDrinkConcentration)(equipment, gameData.itemDetailMap);
				const inputPrice = (0, src_utils_market_data_js.getItemPrice)(itemHrid, {
					context: "profit",
					side: "buy"
				});
				if (inputPrice === null) return null;
				const bulkMultiplier = itemDetails.alchemyDetail?.bulkMultiplier || 1;
				let expectedOutputValue = 0;
				let selfReturnRate = 0;
				let selfReturnCount = 0;
				const dropDetails = [];
				for (const drop of itemDetails.alchemyDetail.transmuteDropTable) {
					const isSelfReturn = drop.itemHrid === itemHrid;
					const averageCount = (drop.minCount + drop.maxCount) / 2;
					if (isSelfReturn) {
						selfReturnRate = drop.dropRate;
						selfReturnCount = averageCount * bulkMultiplier;
					}
					const outputPrice = (0, src_utils_market_data_js.getItemPrice)(drop.itemHrid, {
						context: "profit",
						side: "sell"
					});
					if (outputPrice !== null) {
						const dropValue = (0, src_utils_profit_helpers_js.calculatePriceAfterTax)(outputPrice) * drop.dropRate * averageCount * bulkMultiplier;
						if (!isSelfReturn) expectedOutputValue += dropValue;
						dropDetails.push({
							itemHrid: drop.itemHrid,
							dropRate: drop.dropRate,
							minCount: drop.minCount,
							maxCount: drop.maxCount,
							averageCount,
							price: outputPrice,
							expectedValue: isSelfReturn ? 0 : dropValue,
							isSelfReturn
						});
					}
				}
				const coinCost = calculateAlchemyCoinCost(itemDetails, "transmute");
				const grossMaterialCost = inputPrice * bulkMultiplier;
				const efficiencyDecimal = totalEfficiency / 100;
				const actionsPerHourWithEfficiency = (0, src_utils_profit_helpers_js.calculateActionsPerHour)(actionTime) * (1 + efficiencyDecimal);
				const alchemyBonus = calculateAlchemyBonusDrops(itemLevel, actionsPerHourWithEfficiency, equipment, gameData.itemDetailMap);
				const teaCostData = (0, src_utils_profit_helpers_js.calculateTeaCostsPerHour)({
					drinkSlots: src_core_data_manager_js.default.getActionDrinkSlots("/action_types/alchemy"),
					drinkConcentration,
					itemDetailMap: gameData.itemDetailMap,
					getItemPrice: (hrid) => (0, src_utils_market_data_js.getItemPrice)(hrid, {
						context: "profit",
						side: "buy"
					})
				});
				const combo = (useLiveSetup ? this._liveSetupCombo.bind(this) : this._bestCatalystCombo.bind(this))({
					actionType: "transmute",
					baseSuccessRate,
					actionsPerHour: actionsPerHourWithEfficiency,
					efficiencyDecimal,
					actionTime,
					alchemyBonusRevenue: alchemyBonus.totalBonusRevenue,
					computeNetProfit: (successRate) => {
						const selfReturnVal = inputPrice * selfReturnRate * successRate * selfReturnCount;
						const netMat = grossMaterialCost - selfReturnVal;
						return expectedOutputValue * successRate - (netMat + coinCost);
					},
					computeTeaCost: () => teaCostData.totalCostPerHour,
					levelPenalty,
					teaBonusOverride
				});
				const { successRateBreakdown, successRate, catalystCostPerAttempt, catalystCostPerHour, teaCostPerHour, netProfitPerAttempt, profitPerHour: comboProfitPerHour } = combo;
				const selfReturnValue = inputPrice * selfReturnRate * successRate * selfReturnCount;
				const netMaterialCost = grossMaterialCost - selfReturnValue;
				const revenuePerAttempt = expectedOutputValue * successRate;
				const costPerAttempt = netMaterialCost + coinCost + catalystCostPerAttempt;
				const materialCostPerHour = (netMaterialCost + coinCost) * actionsPerHourWithEfficiency;
				const revenuePerHour = revenuePerAttempt * actionsPerHourWithEfficiency + alchemyBonus.totalBonusRevenue;
				const profitPerHour = comboProfitPerHour;
				const profitPerDay = (0, src_utils_profit_helpers_js.calculateProfitPerDay)(profitPerHour);
				const requirementCosts = [{
					itemHrid,
					count: bulkMultiplier,
					price: inputPrice,
					costPerAction: netMaterialCost,
					costPerHour: netMaterialCost * actionsPerHourWithEfficiency,
					enhancementLevel: 0,
					selfReturnRate: selfReturnRate > 0 ? selfReturnRate : void 0,
					selfReturnValue: selfReturnValue > 0 ? selfReturnValue : void 0
				}];
				if (coinCost > 0) requirementCosts.push({
					itemHrid: "/items/coin",
					count: coinCost,
					price: 1,
					costPerAction: coinCost,
					costPerHour: coinCost * actionsPerHourWithEfficiency,
					enhancementLevel: 0
				});
				const dropRevenues = dropDetails.map((drop) => ({
					itemHrid: drop.itemHrid,
					count: drop.averageCount * bulkMultiplier,
					dropRate: drop.dropRate,
					effectiveDropRate: drop.dropRate,
					price: drop.price,
					isEssence: false,
					isRare: false,
					isSelfReturn: drop.isSelfReturn || false,
					revenuePerAttempt: drop.expectedValue * successRate,
					revenuePerHour: drop.expectedValue * successRate * actionsPerHourWithEfficiency,
					dropsPerHour: drop.averageCount * bulkMultiplier * drop.dropRate * successRate * actionsPerHourWithEfficiency
				}));
				for (const drop of alchemyBonus.bonusDrops) dropRevenues.push(drop);
				const catalystCost = {
					itemHrid: combo.catalystHrid,
					price: combo.catalystPrice,
					costPerSuccess: combo.catalystPrice,
					costPerAttempt: catalystCostPerAttempt,
					costPerHour: catalystCostPerHour
				};
				const consumableCosts = teaCostData.costs.map((cost) => ({
					itemHrid: cost.itemHrid,
					price: cost.pricePerDrink,
					drinksPerHour: cost.drinksPerHour,
					costPerHour: cost.totalCost
				}));
				return {
					actionType: "transmute",
					itemHrid,
					enhancementLevel: 0,
					profitPerHour,
					profitPerDay,
					revenuePerHour,
					actionsPerHour: actionsPerHourWithEfficiency,
					actionTime,
					materialCost: netMaterialCost,
					grossMaterialCost,
					selfReturnValue,
					catalystPrice: combo.catalystPrice,
					costPerAttempt,
					incomePerAttempt: revenuePerAttempt,
					netProfitPerAttempt,
					profitPerAction: comboProfitPerHour / actionsPerHourWithEfficiency,
					materialCostPerHour,
					catalystCostPerHour,
					totalTeaCostPerHour: teaCostPerHour,
					requirementCosts,
					dropRevenues,
					catalystCost,
					consumableCosts,
					successRate,
					efficiency: efficiencyDecimal,
					successRateBreakdown,
					efficiencyBreakdown,
					actionSpeedBreakdown,
					rareFindBreakdown: alchemyBonus.rareFindBreakdown,
					essenceFindBreakdown: alchemyBonus.essenceFindBreakdown,
					winningCatalystHrid: combo.catalystHrid,
					winningTeaUsed: combo.teaBonus > 0,
					pricingMode
				};
			} catch (error) {
				console.error("[AlchemyProfitCalculator] Failed to calculate transmute profit:", error);
				return null;
			}
		}
		/**
		* Calculate all applicable profits for an item
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level (default 0)
		* @returns {Object} Object with all applicable profit calculations
		*/
		calculateAllProfits(itemHrid, enhancementLevel = 0) {
			const results = {};
			const coinifyProfit = this.calculateCoinifyProfit(itemHrid, enhancementLevel);
			if (coinifyProfit) results.coinify = coinifyProfit;
			const decomposeProfit = this.calculateDecomposeProfit(itemHrid, enhancementLevel);
			if (decomposeProfit) results.decompose = decomposeProfit;
			if (enhancementLevel === 0) {
				const transmuteProfit = this.calculateTransmuteProfit(itemHrid);
				if (transmuteProfit) results.transmute = transmuteProfit;
			}
			return results;
		}
	};
	var alchemyProfitCalculator = new AlchemyProfitCalculator();
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
	//#region src/utils/number-parser.js
	/**
	* Number Parser Utility
	* Shared utilities for parsing numeric values from text, including item counts
	*/
	/**
	* Parse item count from text
	* Handles various formats including:
	* - Plain numbers: "100", "1000"
	* - K/M suffixes: "1.5K", "2M"
	* - International formats with separators: "1,000", "1 000", "1.000"
	* - Mixed decimal formats: "1.234,56" (European) or "1,234.56" (US)
	* - Prefixed formats: "x5", "Amount: 1000", "Amount: 1 000"
	*
	* @param {string} text - Text containing a number
	* @param {number} defaultValue - Value to return if parsing fails (default: 1)
	* @returns {number} Parsed numeric value
	*/
	function parseItemCount(text, defaultValue = 1) {
		if (!text) return defaultValue;
		text = String(text).toLowerCase().trim();
		const prefixMatch = text.match(/x([\d,\s.kmb]+)|amount:\s*([\d,\s.kmb]+)/i);
		if (prefixMatch) text = prefixMatch[1] || prefixMatch[2];
		const hasPeriod = text.includes(".");
		const hasComma = text.includes(",");
		if (hasPeriod && hasComma) if (text.lastIndexOf(".") > text.lastIndexOf(",")) text = text.replace(/,/g, "");
		else text = text.replace(/\./g, "").replace(",", ".");
		else if (hasComma) if (/,\d{3}$/.test(text)) text = text.replace(/,/g, "");
		else text = text.replace(",", ".");
		else if (hasPeriod) {
			if (/\.\d{3}$/.test(text)) text = text.replace(/\./g, "");
		}
		text = text.replace(/\s/g, "");
		if (/\d[kmb]$/.test(text)) {
			if (text.endsWith("k")) return parseFloat(text) * 1e3;
			else if (text.endsWith("m")) return parseFloat(text) * 1e6;
			else if (text.endsWith("b")) return parseFloat(text) * 1e9;
		}
		const parsed = parseFloat(text);
		return isNaN(parsed) ? defaultValue : parsed;
	}
	//#endregion
	//#region src/features/combat-stats/combat-stats-calculator.js
	/**
	* Combat Statistics Calculator
	* Calculates income, profit, consumable costs, and other statistics
	*/
	var DUNGEON_CHEST_CHEST_KEYS = {
		"/items/chimerical_chest": "/items/chimerical_chest_key",
		"/items/sinister_chest": "/items/sinister_chest_key",
		"/items/enchanted_chest": "/items/enchanted_chest_key",
		"/items/pirate_chest": "/items/pirate_chest_key",
		"/items/chimerical_refinement_chest": "/items/chimerical_chest_key",
		"/items/sinister_refinement_chest": "/items/sinister_chest_key",
		"/items/enchanted_refinement_chest": "/items/enchanted_chest_key",
		"/items/pirate_refinement_chest": "/items/pirate_chest_key"
	};
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
	//#region src/features/market/tooltip-prices.js
	/**
	* Market Tooltip Prices Feature
	* Adds market prices to item tooltips
	*/
	var REGEX_ENHANCEMENT_LEVEL = /\+(\d+)$/;
	var REGEX_ENHANCEMENT_STRIP = /\s*\+\d+$/;
	var REGEX_REFINED_STAR = /\s*★/g;
	/**
	* Get the items sprite URL from the DOM (matches pattern used across other display modules)
	* @returns {string|null} Sprite URL or null if not found
	*/
	function getItemsSpriteUrl() {
		const el = document.querySelector("use[href*=\"items_sprite\"]");
		return el ? el.getAttribute("href").split("#")[0] : null;
	}
	/**
	* Format price for tooltip display based on user setting
	* @param {number} num - The number to format
	* @returns {string} Formatted number
	*/
	function formatTooltipPrice(num) {
		return (0, src_utils_formatters_js.isAbbreviationEnabled)() ? (0, src_utils_formatters_js.networthFormatter)(num) : (0, src_utils_formatters_js.numberFormatter)(num);
	}
	/**
	* TooltipPrices class handles injecting market prices into item tooltips
	*/
	var TooltipPrices = class {
		constructor() {
			this.unregisterObserver = null;
			this.isActive = false;
			this.isInitialized = false;
			this.itemNameToHridCache = null;
			this.itemNameToHridCacheSource = null;
		}
		/**
		* Initialize the tooltip prices feature
		*/
		async initialize() {
			if (this.isInitialized) return;
			const pricesEnabled = src_core_config_js.default.getSetting("itemTooltip_prices");
			const pinTopEnabled = src_core_config_js.default.getSetting("itemTooltip_pinTop");
			if (!pricesEnabled && !pinTopEnabled) return;
			this.isInitialized = true;
			if (pricesEnabled) {
				if (!src_api_marketplace_js.default.isLoaded()) await src_api_marketplace_js.default.fetch(true);
			}
			this.addTooltipStyles();
			this.setupObserver();
		}
		/**
		* Add CSS styles to prevent tooltip cutoff
		*
		* CRITICAL: CSS alone is not enough! MUI uses JavaScript to position tooltips
		* with transform3d(), which can place them off-screen. We need both:
		* 1. CSS: Enables scrolling when tooltip is taller than viewport
		* 2. JavaScript: Repositions tooltip when it extends beyond viewport (see fixTooltipOverflow)
		*/
		addTooltipStyles() {
			if (document.getElementById("mwi-tooltip-fixes")) return;
			src_utils_dom_js.default.addStyles(`
            /* Ensure tooltip content is scrollable if too tall */
            .MuiTooltip-tooltip {
                max-height: calc(100vh - 20px) !important;
                overflow-y: auto !important;
            }

            /* Also target the popper container */
            .MuiTooltip-popper {
                max-height: 100vh !important;
            }

            /* Add subtle scrollbar styling */
            .MuiTooltip-tooltip::-webkit-scrollbar {
                width: 6px;
            }

            .MuiTooltip-tooltip::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
            }

            .MuiTooltip-tooltip::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 3px;
            }

            .MuiTooltip-tooltip::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.5);
            }
        `, "mwi-tooltip-fixes");
		}
		/**
		* Set up observer to watch for tooltip elements
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("TooltipPrices", "MuiTooltip-popper", (tooltipElement) => {
				this.handleTooltip(tooltipElement);
			});
			this.isActive = true;
		}
		/**
		* Handle a tooltip element
		* @param {Element} tooltipElement - The tooltip popper element
		*/
		async handleTooltip(tooltipElement) {
			if (!src_core_config_js.default.getSetting("itemTooltip_prices") && !src_core_config_js.default.getSetting("itemTooltip_pinTop") && !src_core_config_js.default.getSetting("itemTooltip_expectedValue")) return;
			const isCollectionTooltip = !!tooltipElement.querySelector("div.Collection_tooltipContent__2IcSJ");
			const nameElement = tooltipElement.querySelector("div.ItemTooltipText_name__2JAHA");
			const isItemTooltip = !!nameElement;
			if (!isCollectionTooltip && !isItemTooltip) return;
			if (isItemTooltip && src_core_config_js.default.getSetting("itemTooltip_hideInEnhanceSelector") && document.querySelector("[class*=\"EnhancingPanel_enhancingPanel\"]") && document.querySelector("[class*=\"ItemSelector_itemList\"]")) {
				tooltipElement.style.display = "none";
				return;
			}
			if (src_core_config_js.default.getSetting("itemTooltip_pinTop")) src_utils_dom_js.default.fixTooltipOverflow(tooltipElement, { forceTop: true });
			if (!src_core_config_js.default.getSetting("itemTooltip_prices") && !src_core_config_js.default.getSetting("itemTooltip_expectedValue")) return;
			let itemName;
			if (isCollectionTooltip) {
				const collectionNameElement = tooltipElement.querySelector("div.Collection_name__10aep");
				if (!collectionNameElement) return;
				itemName = collectionNameElement.textContent.trim();
			} else itemName = nameElement.textContent.trim();
			if (tooltipElement.dataset.pricesProcessedItem === itemName) return;
			if (tooltipElement.dataset.pricesProcessedItem) {
				const tooltipText = tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
				if (tooltipText) for (const sel of [
					".market-price-injected",
					".market-profit-injected",
					".market-ev-injected",
					".market-gathering-injected",
					".market-multi-action-injected",
					".market-enhancement-injected",
					".mwi-enhancement-milestones",
					".mwi-ability-status"
				]) tooltipText.querySelector(sel)?.remove();
			}
			tooltipElement.dataset.pricesProcessedItem = itemName;
			const itemHrid = this.extractItemHridFromName(itemName);
			if (itemHrid) {
				const capturedEl = isCollectionTooltip ? tooltipElement.querySelector("div.Collection_name__10aep") : nameElement;
				if (capturedEl) itemNameTranslator.captureFromDOM(capturedEl, itemHrid);
			}
			if (!itemHrid) return;
			const itemDetails = src_core_data_manager_js.default.getItemDetails(itemHrid);
			if (!itemDetails) return;
			if (itemDetails.isOpenable && src_core_config_js.default.getSetting("itemTooltip_expectedValue")) {
				const evData = expectedValueCalculator.calculateExpectedValue(itemHrid);
				if (evData) {
					let keyPrice = 0;
					const chestKeyHrid = DUNGEON_CHEST_CHEST_KEYS[itemHrid];
					if (chestKeyHrid) {
						const keyPricingSetting = src_core_config_js.default.getSettingValue("profitCalc_keyPricingMode") || "ask";
						const keyPrices = src_api_marketplace_js.default.getPrice(chestKeyHrid);
						const keyDetails = src_core_data_manager_js.default.getItemDetails(chestKeyHrid);
						keyPrice = keyPrices?.[keyPricingSetting] ?? keyPrices?.ask ?? 0;
						this.injectExpectedValueDisplay(tooltipElement, evData, isCollectionTooltip, keyPrice, keyDetails?.name);
					} else this.injectExpectedValueDisplay(tooltipElement, evData, isCollectionTooltip);
				}
				src_utils_dom_js.default.fixTooltipOverflow(tooltipElement, { forceTop: src_core_config_js.default.getSetting("itemTooltip_pinTop") });
				return;
			}
			let enhancementLevel = 0;
			if (isItemTooltip && !isCollectionTooltip) enhancementLevel = this.extractEnhancementLevel(tooltipElement);
			const price = (0, src_utils_market_data_js.getItemPrices)(itemHrid, enhancementLevel);
			if (src_core_config_js.default.getSetting("itemTooltip_prices") && price && (price.ask > 0 || price.bid > 0)) {
				const amount = this.extractItemAmount(tooltipElement);
				const artisanAmount = this._getArtisanAdjustedAmount(tooltipElement, amount);
				this.injectPriceDisplay(tooltipElement, price, amount, isCollectionTooltip, artisanAmount, itemHrid);
			}
			if (src_core_config_js.default.getSetting("itemTooltip_profit") && enhancementLevel === 0) {
				const profitData = await profitCalculator.calculateProfit(itemHrid);
				if (profitData) this.injectProfitDisplay(tooltipElement, profitData, isCollectionTooltip);
			}
			if (src_core_config_js.default.getSetting("itemTooltip_multiActionProfit")) await this.injectMultiActionProfitDisplay(tooltipElement, itemHrid, enhancementLevel, isCollectionTooltip);
			if (src_core_config_js.default.getSetting("itemTooltip_gathering") && enhancementLevel === 0) {
				const gatheringData = await this.findGatheringSources(itemHrid);
				if (gatheringData && (gatheringData.soloActions.length > 0 || gatheringData.zoneActions.length > 0)) this.injectGatheringDisplay(tooltipElement, gatheringData, isCollectionTooltip);
			}
			if (src_core_config_js.default.getSetting("itemTooltip_abilityStatus") && itemDetails.abilityBookDetail && enhancementLevel === 0) {
				const abilityStatus = this.getAbilityStatus(itemHrid);
				if (abilityStatus) this.injectAbilityStatusDisplay(tooltipElement, abilityStatus, isCollectionTooltip);
			}
			if (enhancementLevel === 0 && src_core_config_js.default.getSetting("itemTooltip_enhancementMilestones")) {
				const enhancementConfig = itemDetails.isTradable !== false ? (0, src_utils_enhancement_config_js.getEnhancingParams)() : (0, src_utils_enhancement_config_js.getAutoDetectedParams)();
				if (enhancementConfig) {
					const milestonesHTML = buildEnhancementMilestonesHTML(itemHrid, enhancementConfig);
					if (milestonesHTML) {
						const tooltipText = tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
						if (tooltipText && !tooltipText.querySelector(".mwi-enhancement-milestones")) {
							const div = src_utils_dom_js.default.createStyledDiv({ color: src_core_config_js.default.COLOR_TOOLTIP_INFO }, "", "mwi-enhancement-milestones");
							div.innerHTML = milestonesHTML;
							tooltipText.appendChild(div);
						}
					}
				}
			}
			if (enhancementLevel > 0 && src_core_config_js.default.getSetting("itemTooltip_enhancementPath")) {
				const enhancementConfig = itemDetails.isTradable !== false ? (0, src_utils_enhancement_config_js.getEnhancingParams)() : (0, src_utils_enhancement_config_js.getAutoDetectedParams)();
				if (enhancementConfig) {
					const enhancementData = calculateEnhancementPath(itemHrid, enhancementLevel, enhancementConfig);
					if (enhancementData) this.injectEnhancementDisplay(tooltipElement, enhancementData);
				}
			}
			src_utils_dom_js.default.fixTooltipOverflow(tooltipElement, { forceTop: src_core_config_js.default.getSetting("itemTooltip_pinTop") });
		}
		/**
		* Extract enhancement level from tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @returns {number} Enhancement level (0 if not enhanced)
		*/
		extractEnhancementLevel(tooltipElement) {
			const nameElement = tooltipElement.querySelector("div.ItemTooltipText_name__2JAHA");
			if (!nameElement) return 0;
			const match = nameElement.textContent.trim().match(REGEX_ENHANCEMENT_LEVEL);
			if (match) return parseInt(match[1], 10);
			return 0;
		}
		/**
		* Inject enhancement display into tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @param {Object} enhancementData - Enhancement analysis data
		*/
		injectEnhancementDisplay(tooltipElement, enhancementData) {
			const tooltipText = tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
			if (!tooltipText) return;
			if (tooltipText.querySelector(".market-enhancement-injected")) return;
			const enhancementDiv = src_utils_dom_js.default.createStyledDiv({ color: src_core_config_js.default.COLOR_TOOLTIP_INFO }, "", "market-enhancement-injected");
			enhancementDiv.innerHTML = buildEnhancementTooltipHTML(enhancementData);
			tooltipText.appendChild(enhancementDiv);
		}
		/**
		* Extract item HRID from tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @returns {string|null} Item HRID or null
		*/
		extractItemHrid(tooltipElement) {
			const nameElement = tooltipElement.querySelector("div.ItemTooltipText_name__2JAHA");
			if (!nameElement) return null;
			let itemName = nameElement.textContent.trim();
			itemName = itemName.replace(REGEX_ENHANCEMENT_STRIP, "").trim();
			return this.extractItemHridFromName(itemName);
		}
		/**
		* Extract item HRID from item name
		* @param {string} itemName - Item name
		* @returns {string|null} Item HRID or null
		*/
		extractItemHridFromName(itemName) {
			itemName = itemName.replace(REGEX_ENHANCEMENT_STRIP, "").trim();
			const initData = src_core_data_manager_js.default.getInitClientData();
			if (!initData || !initData.itemDetailMap) return null;
			let map;
			if (this.itemNameToHridCache && this.itemNameToHridCacheSource === initData.itemDetailMap) map = this.itemNameToHridCache;
			else {
				map = /* @__PURE__ */ new Map();
				for (const [hrid, item] of Object.entries(initData.itemDetailMap)) map.set(item.name, hrid);
				if (map.size > 0) {
					this.itemNameToHridCache = map;
					this.itemNameToHridCacheSource = initData.itemDetailMap;
				}
			}
			if (map.has(itemName)) return map.get(itemName);
			if (itemName.includes("★")) {
				const refinedVariant = itemName.replace(/\s*★/g, " (R)").replace(/\s+/g, " ").trim();
				if (map.has(refinedVariant)) return map.get(refinedVariant);
				const baseName = itemName.replace(REGEX_REFINED_STAR, "").trim();
				return map.get(baseName) || null;
			}
			return null;
		}
		/**
		* Extract item amount from tooltip (for stacks)
		* @param {Element} tooltipElement - Tooltip element
		* @returns {number} Item amount (default 1)
		*/
		extractItemAmount(tooltipElement) {
			const text = tooltipElement.textContent;
			return parseItemCount(text, 1);
		}
		/**
		* Get artisan-adjusted amount if tooltip is inside an action panel.
		* @param {Element} tooltipElement - Tooltip popper element
		* @param {number} baseAmount - Base recipe amount from tooltip
		* @returns {number|null} Adjusted amount, or null if not applicable
		*/
		_getArtisanAdjustedAmount(tooltipElement, baseAmount) {
			if (baseAmount <= 1) return null;
			if (!src_core_config_js.default.getSetting("itemTooltip_artisanPrices")) return null;
			const trigger = document.querySelector(`[aria-describedby="${tooltipElement.id}"]`);
			if (!trigger) return null;
			const actionPanel = trigger.closest("[class*=\"SkillActionDetail_regularComponent\"]") || trigger.closest("[class*=\"SkillActionDetail_enhancingComponent\"]");
			if (!actionPanel) return null;
			const actionNameEl = actionPanel.querySelector("[class*=\"SkillActionDetail_name\"]");
			if (!actionNameEl) return null;
			const actionHrid = getActionHridFromName(actionNameEl.textContent.trim());
			if (!actionHrid) return null;
			const actionDetails = src_core_data_manager_js.default.getActionDetails(actionHrid);
			if (!actionDetails) return null;
			const artisanBonus = (0, src_utils_material_calculator_js.calculateArtisanBonus)(actionDetails);
			if (artisanBonus <= 0) return null;
			const adjusted = Math.ceil(baseAmount * (1 - artisanBonus));
			if (adjusted >= baseAmount) return null;
			return adjusted;
		}
		/**
		* Inject price display into tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @param {Object} price - { ask, bid }
		* @param {number} amount - Item amount (base recipe amount)
		* @param {boolean} isCollectionTooltip - True if this is a collection tooltip
		* @param {number|null} artisanAmount - Artisan-adjusted amount, or null if not applicable
		* @param {string|null} itemHrid - Item HRID for tax rate lookup
		*/
		injectPriceDisplay(tooltipElement, price, amount, isCollectionTooltip = false, artisanAmount = null, itemHrid = null) {
			const tooltipText = isCollectionTooltip ? tooltipElement.querySelector(".Collection_tooltipContent__2IcSJ") : tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
			if (!tooltipText) {
				console.warn("[TooltipPrices] Could not find tooltip text container");
				return;
			}
			if (tooltipText.querySelector(".market-price-injected")) return;
			const priceDiv = src_utils_dom_js.default.createStyledDiv({ color: src_core_config_js.default.COLOR_TOOLTIP_INFO }, "", "market-price-injected");
			if (price.ask <= 0 && price.bid <= 0) {
				priceDiv.innerHTML = `${(0, src_core_i18n_js.t)("Price:")} <span style="color: ${src_core_config_js.default.COLOR_TEXT_SECONDARY}; font-style: italic;">${(0, src_core_i18n_js.t)("No market data")}</span>`;
				tooltipText.appendChild(priceDiv);
				return;
			}
			const askDisplay = price.ask > 0 ? formatTooltipPrice(price.ask) : "-";
			const bidDisplay = price.bid > 0 ? formatTooltipPrice(price.bid) : "-";
			const effectiveAmount = artisanAmount || amount;
			let totalDisplay = "";
			if (effectiveAmount > 1 && price.ask > 0) {
				const amountLabel = ` ×${(0, src_utils_formatters_js.numberFormatter)(effectiveAmount)}`;
				const totalAsk = formatTooltipPrice(price.ask * effectiveAmount);
				if (price.bid > 0) totalDisplay = ` (${totalAsk} / ${formatTooltipPrice(price.bid * effectiveAmount)}${amountLabel})`;
				else totalDisplay = ` (${totalAsk}${amountLabel})`;
			}
			priceDiv.innerHTML = `${(0, src_core_i18n_js.t)("Price:")} ${askDisplay} / ${bidDisplay}${totalDisplay}`;
			if (src_core_config_js.default.getSetting("itemTooltip_effectivePrices") && (price.ask > 0 || price.bid > 0)) {
				const taxRate = itemHrid === src_utils_profit_constants_js.COWBELL_BAG_HRID ? src_utils_profit_constants_js.COWBELL_BAG_TAX : src_utils_profit_constants_js.MARKET_TAX;
				const effAsk = price.ask > 0 ? formatTooltipPrice((0, src_utils_profit_helpers_js.calculatePriceAfterTax)(price.ask, taxRate)) : "-";
				const effBid = price.bid > 0 ? formatTooltipPrice((0, src_utils_profit_helpers_js.calculatePriceAfterTax)(price.bid, taxRate)) : "-";
				priceDiv.innerHTML += `<br><span style="color: ${src_core_config_js.default.COLOR_TEXT_SECONDARY};">Eff: ${effAsk} / ${effBid}</span>`;
			}
			tooltipText.appendChild(priceDiv);
		}
		/**
		* Inject profit display into tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @param {Object} profitData - Profit calculation data
		* @param {boolean} isCollectionTooltip - True if this is a collection tooltip
		*/
		injectProfitDisplay(tooltipElement, profitData, isCollectionTooltip = false) {
			const tooltipText = isCollectionTooltip ? tooltipElement.querySelector(".Collection_tooltipContent__2IcSJ") : tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
			if (!tooltipText) return;
			if (tooltipText.querySelector(".market-profit-injected")) return;
			const profitDiv = src_utils_dom_js.default.createStyledDiv({
				color: src_core_config_js.default.COLOR_TOOLTIP_INFO,
				marginTop: "8px"
			}, "", "market-profit-injected");
			const showDetailed = src_core_config_js.default.getSetting("itemTooltip_detailedProfit");
			let html = "<div style=\"border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;\">";
			if (profitData.itemPrice.bid > 0 && profitData.itemPrice.ask > 0) {
				html += `<div style="font-weight: bold; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("PROFIT")}</div>`;
				html += "<div style=\"font-size: 0.9em; margin-left: 8px;\">";
				const profitPerDay = profitData.profitPerDay;
				const profitColor = profitData.profitPerHour >= 0 ? src_core_config_js.default.COLOR_TOOLTIP_PROFIT : src_core_config_js.default.COLOR_TOOLTIP_LOSS;
				html += `<div style="color: ${profitColor}; font-weight: bold;">${(0, src_core_i18n_js.t)("Net: {0}/hr ({1}/day)", (0, src_utils_formatters_js.formatKMB)(profitData.profitPerHour), (0, src_utils_formatters_js.formatKMB)(profitPerDay))}</div>`;
				if (showDetailed) html += this.buildDetailedProfitDisplay(profitData);
			} else {
				html += "<div style=\"font-size: 0.9em; margin-left: 8px;\">";
				if (showDetailed) html += this.buildDetailedProfitDisplay(profitData, false);
				else html += `<div style="font-weight: bold; color: ${src_core_config_js.default.COLOR_TOOLTIP_INFO};">${(0, src_core_i18n_js.t)("Cost: {0}/item", (0, src_utils_formatters_js.formatKMB)(profitData.totalMaterialCost))}</div>`;
			}
			html += "</div>";
			html += "</div>";
			profitDiv.innerHTML = html;
			tooltipText.appendChild(profitDiv);
		}
		/**
		* Get upgrade chain sub-rows for a crafted upgrade item (recursive).
		* Each row represents one level of the chain with its direct inputs cost only.
		* @param {string} itemHrid - Upgrade item to expand
		* @param {number} depth - Current nesting depth
		* @returns {Array} Flat array of sub-row objects
		*/
		_getUpgradeChainRows(itemHrid, depth) {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData?.actionDetailMap) return [];
			let action = null;
			for (const act of Object.values(gameData.actionDetailMap)) if (act.outputItems?.[0]?.itemHrid === itemHrid) {
				action = act;
				break;
			}
			if (!action || !action.upgradeItemHrid) return [];
			const upgradeHrid = action.upgradeItemHrid;
			const upgradeDetails = src_core_data_manager_js.default.getItemDetails(upgradeHrid);
			if (!upgradeDetails) return [];
			let askPrice = (0, src_utils_profit_helpers_js.resolveItemPrice)(upgradeHrid, {
				mode: "ask",
				side: "buy"
			}).price;
			let bidPrice = (0, src_utils_profit_helpers_js.resolveItemPrice)(upgradeHrid, {
				mode: "bid",
				side: "buy"
			}).price;
			const craftAsk = getProductionCost(upgradeHrid, "ask");
			const craftBid = getProductionCost(upgradeHrid, "bid");
			if (craftAsk > 0 && (askPrice === 0 || craftAsk < askPrice)) {
				const deeperRows = this._getUpgradeChainRows(upgradeHrid, depth + 1);
				const deeperAsk = deeperRows.reduce((s, r) => s + r.askPrice * r.amount, 0);
				const deeperBid = deeperRows.reduce((s, r) => s + r.bidPrice * r.amount, 0);
				askPrice = craftAsk - deeperAsk;
				bidPrice = (craftBid || craftAsk) - deeperBid;
				return [{
					itemName: `Craft ${upgradeDetails.name}`,
					amount: 1,
					askPrice,
					bidPrice,
					depth
				}, ...deeperRows];
			}
			if (craftBid > 0 && (bidPrice === 0 || craftBid < bidPrice)) bidPrice = craftBid;
			return [{
				itemName: `Buy ${upgradeDetails.name}`,
				amount: 1,
				askPrice,
				bidPrice,
				depth
			}];
		}
		/**
		* Build detailed profit display with materials table
		* @param {Object} profitData - Profit calculation data
		* @returns {string} HTML string for detailed display
		*/
		buildDetailedProfitDisplay(profitData, showProfitSummary = true) {
			let html = "";
			if (profitData.materialCosts && profitData.materialCosts.length > 0) {
				html += "<div style=\"margin-top: 8px;\">";
				html += `<table style="width: 100%; border-collapse: collapse; font-size: 0.85em; color: ${src_core_config_js.default.COLOR_TOOLTIP_INFO};">`;
				html += `<tr style="border-bottom: 1px solid ${src_core_config_js.default.COLOR_BORDER};">`;
				html += `<th style="padding: 2px 4px; text-align: left;">${(0, src_core_i18n_js.t)("Material")}</th>`;
				html += `<th style="padding: 2px 4px; text-align: center;">${(0, src_core_i18n_js.t)("Count")}</th>`;
				html += `<th style="padding: 2px 4px; text-align: right;">${(0, src_core_i18n_js.t)("Ask")}</th>`;
				html += `<th style="padding: 2px 4px; text-align: right;">${(0, src_core_i18n_js.t)("Bid")}</th>`;
				html += "</tr>";
				const materialsWithPrices = profitData.materialCosts.map((material) => {
					if (material.itemHrid === "/items/coin") return {
						...material,
						askPrice: 1,
						bidPrice: 1
					};
					let askPrice = (0, src_utils_profit_helpers_js.resolveItemPrice)(material.itemHrid, {
						mode: "ask",
						side: "buy"
					}).price;
					let bidPrice = (0, src_utils_profit_helpers_js.resolveItemPrice)(material.itemHrid, {
						mode: "bid",
						side: "buy"
					}).price;
					if (material.isUpgradeItem) {
						const craftEnabled = src_core_config_js.default.getSetting("profitCalc_craftUpgradeItems");
						const craftAsk = craftEnabled ? getProductionCost(material.itemHrid, "ask") : 0;
						const craftBid = craftEnabled ? getProductionCost(material.itemHrid, "bid") : 0;
						if (craftAsk > 0 && (askPrice === 0 || craftAsk < askPrice)) {
							const subRows = this._getUpgradeChainRows(material.itemHrid, 1);
							const subAskTotal = subRows.reduce((s, r) => s + r.askPrice * r.amount, 0);
							const subBidTotal = subRows.reduce((s, r) => s + r.bidPrice * r.amount, 0);
							askPrice = craftAsk - subAskTotal;
							bidPrice = (craftBid || craftAsk) - subBidTotal;
							return {
								...material,
								itemName: `Craft ${material.itemName}`,
								askPrice,
								bidPrice,
								subRows
							};
						}
						if (craftBid > 0 && (bidPrice === 0 || craftBid < bidPrice)) bidPrice = craftBid;
						return {
							...material,
							itemName: `Buy ${material.itemName}`,
							askPrice,
							bidPrice
						};
					}
					return {
						...material,
						askPrice,
						bidPrice
					};
				});
				let totalCount = 0;
				let totalAsk = 0;
				let totalBid = 0;
				for (const m of materialsWithPrices) {
					totalCount += m.amount;
					totalAsk += m.askPrice * m.amount;
					totalBid += m.bidPrice * m.amount;
					if (m.subRows) for (const sub of m.subRows) {
						totalCount += sub.amount;
						totalAsk += sub.askPrice * sub.amount;
						totalBid += sub.bidPrice * sub.amount;
					}
				}
				html += `<tr style="border-bottom: 1px solid ${src_core_config_js.default.COLOR_BORDER};">`;
				html += `<td style="padding: 2px 4px; font-weight: bold;">${(0, src_core_i18n_js.t)("Total")}</td>`;
				html += `<td style="padding: 2px 4px; text-align: center;">${totalCount.toFixed(1)}</td>`;
				html += `<td style="padding: 2px 4px; text-align: right;">${(0, src_utils_formatters_js.formatKMB)(totalAsk)}</td>`;
				html += `<td style="padding: 2px 4px; text-align: right;">${(0, src_utils_formatters_js.formatKMB)(totalBid)}</td>`;
				html += "</tr>";
				for (const material of materialsWithPrices) {
					html += "<tr>";
					html += `<td style="padding: 2px 4px;">${material.itemName}</td>`;
					html += `<td style="padding: 2px 4px; text-align: center;">${material.amount.toFixed(1)}</td>`;
					html += `<td style="padding: 2px 4px; text-align: right;">${(0, src_utils_formatters_js.formatKMB)(material.askPrice)}</td>`;
					html += `<td style="padding: 2px 4px; text-align: right;">${(0, src_utils_formatters_js.formatKMB)(material.bidPrice)}</td>`;
					html += "</tr>";
					if (material.subRows) for (const sub of material.subRows) {
						const indent = 8 + sub.depth * 10;
						html += "<tr>";
						html += `<td style="padding: 2px 4px; padding-left: ${indent}px; opacity: 0.8;">${sub.itemName}</td>`;
						html += `<td style="padding: 2px 4px; text-align: center; opacity: 0.8;">${sub.amount.toFixed(1)}</td>`;
						html += `<td style="padding: 2px 4px; text-align: right; opacity: 0.8;">${(0, src_utils_formatters_js.formatKMB)(sub.askPrice)}</td>`;
						html += `<td style="padding: 2px 4px; text-align: right; opacity: 0.8;">${(0, src_utils_formatters_js.formatKMB)(sub.bidPrice)}</td>`;
						html += "</tr>";
					}
				}
				html += "</table>";
				html += "</div>";
			}
			if (showProfitSummary) {
				html += "<div style=\"margin-top: 8px; font-size: 0.85em;\">";
				const profitPerAction = profitData.profitPerAction;
				const profitPerDay = profitData.profitPerDay;
				const profitColor = profitData.profitPerHour >= 0 ? src_core_config_js.default.COLOR_TOOLTIP_PROFIT : src_core_config_js.default.COLOR_TOOLTIP_LOSS;
				html += `<div style="color: ${profitColor};">${(0, src_core_i18n_js.t)("Profit: {0}/action, {1}/hour, {2}/day", (0, src_utils_formatters_js.formatKMB)(profitPerAction), (0, src_utils_formatters_js.formatKMB)(profitData.profitPerHour), (0, src_utils_formatters_js.formatKMB)(profitPerDay))}</div>`;
				html += "</div>";
			}
			return html;
		}
		/**
		* Inject expected value display into tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @param {Object} evData - Expected value calculation data
		* @param {boolean} isCollectionTooltip - True if this is a collection tooltip
		*/
		injectExpectedValueDisplay(tooltipElement, evData, isCollectionTooltip = false, keyPrice = 0, keyName = null) {
			const tooltipText = isCollectionTooltip ? tooltipElement.querySelector(".Collection_tooltipContent__2IcSJ") : tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
			if (!tooltipText) return;
			if (tooltipText.querySelector(".market-ev-injected")) return;
			const evDiv = src_utils_dom_js.default.createStyledDiv({
				color: src_core_config_js.default.COLOR_TOOLTIP_INFO,
				marginTop: "8px"
			}, "", "market-ev-injected");
			let html = "<div style=\"border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;\">";
			html += `<div style="font-weight: bold; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("EXPECTED VALUE")}</div>`;
			html += "<div style=\"font-size: 0.9em; margin-left: 8px;\">";
			html += `<div style="color: ${src_core_config_js.default.COLOR_TOOLTIP_PROFIT}; font-weight: bold;">${(0, src_core_i18n_js.t)("Expected Return: {0}", formatTooltipPrice(evData.expectedValue))}</div>`;
			if (keyPrice > 0) {
				const keyLabel = keyName ? `${(0, src_core_i18n_js.t)("Key Cost")} (${keyName})` : (0, src_core_i18n_js.t)("Key Cost");
				html += `<div style="color: ${src_core_config_js.default.COLOR_TOOLTIP_LOSS};">- ${keyLabel}: ${formatTooltipPrice(keyPrice)}</div>`;
				html += `<div style="color: ${src_core_config_js.default.COLOR_TOOLTIP_PROFIT}; font-weight: bold;">${(0, src_core_i18n_js.t)("Net Value: {0}", formatTooltipPrice(evData.expectedValue - keyPrice))}</div>`;
			}
			html += "</div>";
			const showDropsSetting = src_core_config_js.default.getSettingValue("expectedValue_showDrops", "All");
			if (showDropsSetting !== "None" && evData.drops.length > 0) {
				html += "<div style=\"border-top: 1px solid rgba(255,255,255,0.2); margin: 8px 0;\"></div>";
				let dropsToShow = evData.drops;
				let headerLabel = (0, src_core_i18n_js.t)("All Drops");
				if (showDropsSetting === "Top 5") {
					dropsToShow = evData.drops.slice(0, 5);
					headerLabel = (0, src_core_i18n_js.t)("Top 5 Drops");
				} else if (showDropsSetting === "Top 10") {
					dropsToShow = evData.drops.slice(0, 10);
					headerLabel = (0, src_core_i18n_js.t)("Top 10 Drops");
				}
				html += `<div style="font-weight: bold; margin-bottom: 4px;">${headerLabel} (${evData.drops.length} total):</div>`;
				html += "<div style=\"font-size: 0.9em; margin-left: 8px;\">";
				for (const drop of dropsToShow) if (!drop.hasPriceData) html += `<div style="color: ${src_core_config_js.default.COLOR_TEXT_SECONDARY};">• ${drop.itemName} (${(0, src_utils_formatters_js.formatPercentage)(drop.dropRate, 2)}): ${drop.avgCount.toFixed(2)} avg → ${(0, src_core_i18n_js.t)("No price data")}</div>`;
				else {
					const dropRatePercent = (0, src_utils_formatters_js.formatPercentage)(drop.dropRate, 2);
					html += `<div>• ${drop.itemName} (${dropRatePercent}%): ${drop.avgCount.toFixed(2)} avg → ${formatTooltipPrice(drop.expectedValue)}</div>`;
				}
				html += "</div>";
				html += "<div style=\"border-top: 1px solid rgba(255,255,255,0.2); margin: 4px 0;\"></div>";
				html += `<div style="font-size: 0.9em; margin-left: 8px; font-weight: bold;">${(0, src_core_i18n_js.t)("Total from {0} drops: {1}", evData.drops.length, formatTooltipPrice(evData.expectedValue))}</div>`;
				if (keyPrice > 0) html += `<div style="font-size: 0.9em; margin-left: 8px; font-weight: bold;">${(0, src_core_i18n_js.t)("Net after key: {0}", formatTooltipPrice(evData.expectedValue - keyPrice))}</div>`;
			}
			html += "</div>";
			evDiv.innerHTML = html;
			tooltipText.appendChild(evDiv);
		}
		/**
		* Find gathering sources for an item
		* @param {string} itemHrid - Item HRID
		* @returns {Object|null} { soloActions: [...], zoneActions: [...] }
		*/
		async findGatheringSources(itemHrid) {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData || !gameData.actionDetailMap) return null;
			const GATHERING_TYPES = [
				"/action_types/foraging",
				"/action_types/woodcutting",
				"/action_types/milking"
			];
			const soloActions = [];
			const zoneActions = [];
			for (const [actionHrid, action] of Object.entries(gameData.actionDetailMap)) {
				if (!GATHERING_TYPES.includes(action.type)) continue;
				let foundInDrop = false;
				let dropRate = 0;
				let isSolo = false;
				if (action.dropTable) {
					for (const drop of action.dropTable) if (drop.itemHrid === itemHrid) {
						foundInDrop = true;
						dropRate = drop.dropRate;
						isSolo = dropRate === 1;
						break;
					}
				}
				if (!foundInDrop && action.rareDropTable) {
					for (const drop of action.rareDropTable) if (drop.itemHrid === itemHrid) {
						foundInDrop = true;
						dropRate = drop.dropRate;
						isSolo = false;
						break;
					}
				}
				if (foundInDrop || isSolo) {
					const actionData = {
						actionHrid,
						actionName: action.name,
						dropRate
					};
					if (isSolo) soloActions.push(actionData);
					else zoneActions.push(actionData);
				}
			}
			if (soloActions.length === 0 && zoneActions.length === 0) return null;
			for (const action of soloActions) {
				const profitData = await calculateGatheringProfit(action.actionHrid);
				if (profitData) {
					action.itemsPerHour = profitData.baseOutputs?.[0]?.itemsPerHour || 0;
					action.profitPerHour = profitData.profitPerHour || 0;
				}
			}
			for (const action of zoneActions) {
				const itemsPerHour = ((await calculateGatheringProfit(action.actionHrid))?.baseOutputs?.find((o) => o.itemHrid === itemHrid))?.itemsPerHour ?? 0;
				if (action.dropRate < .01) {
					action.itemsPerDay = itemsPerHour * 24;
					action.isRareDrop = true;
				} else {
					action.itemsPerHour = itemsPerHour;
					action.isRareDrop = false;
				}
			}
			return {
				soloActions,
				zoneActions
			};
		}
		/**
		* Inject gathering display into tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @param {Object} gatheringData - { soloActions: [...], zoneActions: [...] }
		* @param {boolean} isCollectionTooltip - True if collection tooltip
		*/
		injectGatheringDisplay(tooltipElement, gatheringData, isCollectionTooltip = false) {
			const tooltipText = isCollectionTooltip ? tooltipElement.querySelector(".Collection_tooltipContent__2IcSJ") : tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
			if (!tooltipText) return;
			if (tooltipText.querySelector(".market-gathering-injected")) return;
			const showRareDrops = src_core_config_js.default.getSetting("itemTooltip_gatheringRareDrops");
			let zoneActions = gatheringData.zoneActions;
			if (!showRareDrops) zoneActions = zoneActions.filter((action) => !action.isRareDrop);
			if (gatheringData.soloActions.length === 0 && zoneActions.length === 0) return;
			const gatheringDiv = src_utils_dom_js.default.createStyledDiv({
				color: src_core_config_js.default.COLOR_TOOLTIP_INFO,
				marginTop: "8px"
			}, "", "market-gathering-injected");
			let html = "<div style=\"border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;\">";
			html += `<div style="font-weight: bold; margin-bottom: 4px;">${(0, src_core_i18n_js.t)("GATHERING")}</div>`;
			if (gatheringData.soloActions.length > 0) {
				html += "<div style=\"font-size: 0.9em; margin-left: 8px; margin-bottom: 6px;\">";
				html += `<div style="font-weight: 500; margin-bottom: 2px;">${(0, src_core_i18n_js.t)("Solo:")}</div>`;
				for (const action of gatheringData.soloActions) {
					const itemsPerHourStr = action.itemsPerHour ? Math.round(action.itemsPerHour) : "?";
					const profitStr = action.profitPerHour ? (0, src_utils_formatters_js.formatKMB)(Math.round(action.profitPerHour)) : "?";
					const profitDayStr = action.profitPerHour ? (0, src_utils_formatters_js.formatKMB)(Math.round(action.profitPerHour * 24)) : "?";
					html += `<div style="margin-left: 8px;">• ${action.actionName}: ${itemsPerHourStr} items/hr | ${profitStr}/hr (${profitDayStr}/day)</div>`;
				}
				html += "</div>";
			}
			if (zoneActions.length > 0) {
				html += "<div style=\"font-size: 0.9em; margin-left: 8px;\">";
				html += `<div style="font-weight: 500; margin-bottom: 2px;">${(0, src_core_i18n_js.t)("Found in:")}</div>`;
				for (const action of zoneActions) {
					const percentValue = action.dropRate * 100;
					const dropRatePercent = percentValue < .1 ? percentValue.toFixed(4) : percentValue.toFixed(1);
					let itemsDisplay;
					if (action.isRareDrop) itemsDisplay = `${action.itemsPerDay ? action.itemsPerDay.toFixed(2) : "?"} items/day`;
					else itemsDisplay = `${action.itemsPerHour ? Math.round(action.itemsPerHour) : "?"} items/hr`;
					html += `<div style="margin-left: 8px;">• ${action.actionName}: ${itemsDisplay} (${dropRatePercent}% drop)</div>`;
				}
				html += "</div>";
			}
			html += "</div>";
			gatheringDiv.innerHTML = html;
			tooltipText.appendChild(gatheringDiv);
		}
		/**
		* Inject multi-action profit display into tooltip
		* Shows all profitable actions (craft, coinify, decompose, transmute) with best highlighted
		* @param {Element} tooltipElement - Tooltip element
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level
		* @param {boolean} isCollectionTooltip - True if this is a collection tooltip
		*/
		async injectMultiActionProfitDisplay(tooltipElement, itemHrid, enhancementLevel, isCollectionTooltip = false) {
			const tooltipText = isCollectionTooltip ? tooltipElement.querySelector(".Collection_tooltipContent__2IcSJ") : tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
			if (!tooltipText) return;
			if (tooltipText.querySelector(".market-multi-action-injected")) return;
			const allProfits = [];
			const alchemyProfits = alchemyProfitCalculator.calculateAllProfits(itemHrid, enhancementLevel);
			if (alchemyProfits.coinify) allProfits.push(alchemyProfits.coinify);
			if (alchemyProfits.decompose) allProfits.push(alchemyProfits.decompose);
			if (alchemyProfits.transmute) allProfits.push(alchemyProfits.transmute);
			if (allProfits.length === 0) return;
			allProfits.sort((a, b) => b.profitPerHour - a.profitPerHour);
			const isCraftable = profitCalculator.findProductionAction(itemHrid) !== null;
			const profitDiv = src_utils_dom_js.default.createStyledDiv({
				color: src_core_config_js.default.COLOR_TOOLTIP_INFO,
				marginTop: "8px"
			}, "", "market-multi-action-injected");
			let html = "<div style=\"border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;\">";
			const heading = isCraftable ? (0, src_core_i18n_js.t)("Alternative Actions:") : (0, src_core_i18n_js.t)("Profits:");
			html += `<div style="font-weight: bold; margin-bottom: 4px;">${heading}</div>`;
			html += "<div style=\"font-size: 0.9em; margin-left: 8px;\">";
			for (let i = 0; i < allProfits.length; i++) {
				const profit = allProfits[i];
				const label = profit.actionType.charAt(0).toUpperCase() + profit.actionType.slice(1);
				const color = profit.profitPerHour >= 0 ? src_core_config_js.default.COLOR_TOOLTIP_INFO : src_core_config_js.default.COLOR_TOOLTIP_LOSS;
				html += `<div style="color: ${color};">• ${label}: ${(0, src_utils_formatters_js.formatKMB)(profit.profitPerHour)}/hr`;
				if (profit.profitPerAction !== void 0) {
					const perActionColor = profit.profitPerAction >= 0 ? "inherit" : src_core_config_js.default.COLOR_TOOLTIP_LOSS;
					html += ` <span style="opacity: 0.7; color: ${perActionColor};">(${(0, src_utils_formatters_js.formatKMB)(profit.profitPerAction)}/action)</span>`;
				}
				if (profit.winningCatalystHrid || profit.winningTeaUsed) {
					const spriteUrl = getItemsSpriteUrl();
					if (spriteUrl) {
						html += ` <span style="display:inline-flex;align-items:center;gap:2px;vertical-align:middle;">`;
						if (profit.winningCatalystHrid) {
							const slug = profit.winningCatalystHrid.split("/").pop();
							html += `<svg role="img" style="width:14px;height:14px;"><use href="${spriteUrl}#${slug}"></use></svg>`;
						}
						if (profit.winningTeaUsed) html += `<svg role="img" style="width:14px;height:14px;"><use href="${spriteUrl}#catalytic_tea"></use></svg>`;
						html += `</span>`;
					}
				}
				html += "</div>";
			}
			html += "</div>";
			html += "</div>";
			profitDiv.innerHTML = html;
			tooltipText.appendChild(profitDiv);
		}
		/**
		* Get ability status for an ability book
		* @param {string} itemHrid - Item HRID (e.g., /items/ice_shield)
		* @returns {Object|null} {learned, level, xp, xpToNext, percentToNext, abilityName} or null
		*/
		getAbilityStatus(itemHrid) {
			const characterData = src_core_data_manager_js.default.characterData;
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!characterData || !gameData) return null;
			const abilityHrid = itemHrid.replace("/items/", "/abilities/");
			const abilityDetails = gameData.abilityDetailMap?.[abilityHrid];
			if (!abilityDetails) return null;
			const ability = characterData.characterAbilities?.find((a) => a.abilityHrid === abilityHrid);
			if (!ability) return {
				learned: false,
				abilityName: abilityDetails.name
			};
			const currentLevel = ability.level || 0;
			const currentXp = ability.experience || 0;
			const levelXpTable = gameData.levelExperienceTable;
			if (!levelXpTable) return {
				learned: true,
				level: currentLevel,
				abilityName: abilityDetails.name
			};
			const nextLevel = currentLevel + 1;
			if (nextLevel > 200 || !levelXpTable[nextLevel]) return {
				learned: true,
				level: currentLevel,
				abilityName: abilityDetails.name,
				maxLevel: true
			};
			const currentLevelXp = levelXpTable[currentLevel] || 0;
			const nextLevelXp = levelXpTable[nextLevel];
			const xpIntoLevel = currentXp - currentLevelXp;
			return {
				learned: true,
				level: currentLevel,
				xp: currentXp,
				xpToNext: nextLevelXp - currentXp,
				percentToNext: xpIntoLevel / (nextLevelXp - currentLevelXp),
				abilityName: abilityDetails.name
			};
		}
		/**
		* Inject ability status display into tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @param {Object} abilityStatus - Ability status data
		* @param {boolean} isCollectionTooltip - Whether this is a collection tooltip
		*/
		injectAbilityStatusDisplay(tooltipElement, abilityStatus, isCollectionTooltip) {
			const tooltipText = isCollectionTooltip ? tooltipElement.querySelector("div.Collection_tooltipContent__2IcSJ") : tooltipElement.querySelector("div.ItemTooltipText_itemTooltipText__zFq3A");
			if (!tooltipText) return;
			if (tooltipText.querySelector(".mwi-ability-status")) return;
			const statusDiv = document.createElement("div");
			statusDiv.className = "mwi-ability-status";
			statusDiv.style.cssText = "margin-top: 8px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;";
			let html = "";
			if (!abilityStatus.learned) {
				html += `<div style="color: ${src_core_config_js.default.COLOR_TOOLTIP_LOSS}; font-weight: 600;">`;
				html += `\u26A0 Unlearned</div>`;
			} else {
				html += `<div style="color: ${src_core_config_js.default.COLOR_TOOLTIP_INFO}; font-weight: 600;">`;
				html += `\u2714 Learned</div>`;
				html += `<div style="margin-top: 4px; margin-left: 8px; font-size: 0.9em;">`;
				html += `<div>Level: ${abilityStatus.level}</div>`;
				if (abilityStatus.maxLevel) html += `<div style="color: ${src_core_config_js.default.COLOR_TOOLTIP_INFO};">Max Level Reached</div>`;
				else if (abilityStatus.percentToNext !== void 0) {
					html += `<div>Progress: ${(0, src_utils_formatters_js.formatPercentage)(abilityStatus.percentToNext)}</div>`;
					html += `<div style="opacity: 0.7;">XP to Next: ${(0, src_utils_formatters_js.numberFormatter)(abilityStatus.xpToNext)}</div>`;
				}
				html += "</div>";
			}
			statusDiv.innerHTML = html;
			tooltipText.appendChild(statusDiv);
		}
		/**
		* Disable the feature
		*/
		disable() {
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			this.isActive = false;
			this.isInitialized = false;
		}
	};
	var tooltipPrices = new TooltipPrices();
	//#endregion
	//#region src/features/market/tooltip-consumables.js
	/**
	* Consumable Tooltips Feature
	* Adds HP/MP restoration stats to food/drink tooltips
	*/
	/**
	* TooltipConsumables class handles injecting consumable stats into item tooltips
	*/
	var TooltipConsumables = class {
		constructor() {
			this.unregisterObserver = null;
			this.isActive = false;
			this.isInitialized = false;
			this.itemNameToHridCache = null;
			this.itemNameToHridCacheSource = null;
		}
		/**
		* Initialize the consumable tooltips feature
		*/
		async initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("showConsumTips")) return;
			this.isInitialized = true;
			if (!src_api_marketplace_js.default.isLoaded()) await src_api_marketplace_js.default.fetch(true);
			this.addTooltipStyles();
			this.setupObserver();
		}
		/**
		* Add CSS styles to prevent tooltip cutoff
		*
		* CRITICAL: CSS alone is not enough! MUI uses JavaScript to position tooltips
		* with transform3d(), which can place them off-screen. We need both:
		* 1. CSS: Enables scrolling when tooltip is taller than viewport
		* 2. JavaScript: Repositions tooltip when it extends beyond viewport (see fixTooltipOverflow)
		*/
		addTooltipStyles() {
			if (document.getElementById("mwi-tooltip-fixes")) return;
			src_utils_dom_js.default.addStyles(`
            /* Ensure tooltip content is scrollable if too tall */
            .MuiTooltip-tooltip {
                max-height: calc(100vh - 20px) !important;
                overflow-y: auto !important;
            }

            /* Also target the popper container */
            .MuiTooltip-popper {
                max-height: 100vh !important;
            }

            /* Add subtle scrollbar styling */
            .MuiTooltip-tooltip::-webkit-scrollbar {
                width: 6px;
            }

            .MuiTooltip-tooltip::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
            }

            .MuiTooltip-tooltip::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 3px;
            }

            .MuiTooltip-tooltip::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.5);
            }
        `, "mwi-tooltip-fixes");
		}
		/**
		* Set up observer to watch for tooltip elements
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("TooltipConsumables", "MuiTooltip-popper", (tooltipElement) => {
				this.handleTooltip(tooltipElement);
			});
			this.isActive = true;
		}
		/**
		* Handle a tooltip element
		* @param {Element} tooltipElement - The tooltip popper element
		*/
		async handleTooltip(tooltipElement) {
			if (tooltipElement.dataset.consumablesProcessed) return;
			tooltipElement.dataset.consumablesProcessed = "true";
			const nameElement = tooltipElement.querySelector("div.ItemTooltipText_name__2JAHA");
			if (!nameElement) return;
			const itemHrid = this.extractItemHrid(tooltipElement);
			if (!itemHrid) return;
			const itemDetails = src_core_data_manager_js.default.getItemDetails(itemHrid);
			if (itemHrid && nameElement) itemNameTranslator.captureFromDOM(nameElement, itemHrid);
			if (!itemDetails || !itemDetails.consumableDetail) return;
			const consumableStats = this.calculateConsumableStats(itemHrid, itemDetails);
			if (!consumableStats) return;
			this.injectConsumableDisplay(tooltipElement, consumableStats);
			src_utils_dom_js.default.fixTooltipOverflow(tooltipElement);
		}
		/**
		* Extract item HRID from tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @returns {string|null} Item HRID or null
		*/
		extractItemHrid(tooltipElement) {
			const nameElement = tooltipElement.querySelector("div.ItemTooltipText_name__2JAHA");
			if (!nameElement) return null;
			const itemName = nameElement.textContent.trim();
			const initData = src_core_data_manager_js.default.getInitClientData();
			if (!initData || !initData.itemDetailMap) return null;
			if (this.itemNameToHridCache && this.itemNameToHridCacheSource === initData.itemDetailMap) return this.itemNameToHridCache.get(itemName) || null;
			const map = /* @__PURE__ */ new Map();
			for (const [hrid, item] of Object.entries(initData.itemDetailMap)) map.set(item.name, hrid);
			if (map.size > 0) {
				this.itemNameToHridCache = map;
				this.itemNameToHridCacheSource = initData.itemDetailMap;
			}
			return map.get(itemName) || null;
		}
		/**
		* Calculate consumable stats
		* @param {string} itemHrid - Item HRID
		* @param {Object} itemDetails - Item details from game data
		* @returns {Object|null} Consumable stats or null
		*/
		calculateConsumableStats(itemHrid, itemDetails) {
			const consumable = itemDetails.consumableDetail;
			if (!consumable) return null;
			let restoreType = null;
			let restoreAmount = 0;
			if (consumable.hitpointRestore) {
				restoreType = "HP";
				restoreAmount = consumable.hitpointRestore;
			} else if (consumable.manapointRestore) {
				restoreType = "MP";
				restoreAmount = consumable.manapointRestore;
			}
			if (!restoreType || restoreAmount === 0) return null;
			const recoveryDuration = consumable.recoveryDuration ? consumable.recoveryDuration / 1e9 : 0;
			const cooldownDuration = consumable.cooldownDuration ? consumable.cooldownDuration / 1e9 : 0;
			const restorePerSecond = recoveryDuration > 0 ? restoreAmount / recoveryDuration : 0;
			const askPrice = src_api_marketplace_js.default.getPrice(itemHrid, 0)?.ask || 0;
			const costPerPoint = askPrice > 0 ? askPrice / restoreAmount : 0;
			const usesPerDay = cooldownDuration > 0 ? 86400 / cooldownDuration : 0;
			const dailyMax = restoreAmount * usesPerDay;
			return {
				restoreType,
				restoreAmount,
				restorePerSecond,
				recoveryDuration,
				cooldownDuration,
				askPrice,
				costPerPoint,
				dailyMax,
				usesPerDay
			};
		}
		/**
		* Inject consumable display into tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @param {Object} stats - Consumable stats
		*/
		injectConsumableDisplay(tooltipElement, stats) {
			const tooltipText = tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
			if (!tooltipText) return;
			if (tooltipText.querySelector(".consumable-stats-injected")) return;
			const consumableDiv = src_utils_dom_js.default.createStyledDiv({
				color: src_core_config_js.default.COLOR_TOOLTIP_INFO,
				marginTop: "8px"
			}, "", "consumable-stats-injected");
			let html = "<div style=\"border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;\">";
			html += "<div style=\"font-weight: bold; margin-bottom: 4px;\">CONSUMABLE STATS</div>";
			html += "<div style=\"font-size: 0.9em; margin-left: 8px;\">";
			if (stats.recoveryDuration > 0) html += `<div>Restores: ${(0, src_utils_formatters_js.numberFormatter)(stats.restorePerSecond, 1)} ${stats.restoreType}/s</div>`;
			else html += `<div>Restores: ${(0, src_utils_formatters_js.numberFormatter)(stats.restoreAmount)} ${stats.restoreType} (instant)</div>`;
			if (stats.costPerPoint > 0) html += `<div>Cost: ${(0, src_utils_formatters_js.numberFormatter)(stats.costPerPoint, 1)} per ${stats.restoreType}</div>`;
			else if (stats.askPrice === 0) html += `<div style="color: gray; font-style: italic;">Cost: No market data</div>`;
			if (stats.dailyMax > 0) html += `<div>Daily Max: ${(0, src_utils_formatters_js.numberFormatter)(stats.dailyMax)} ${stats.restoreType}</div>`;
			if (stats.recoveryDuration > 0) html += `<div>Recovery Time: ${stats.recoveryDuration}s</div>`;
			if (stats.cooldownDuration > 0) html += `<div>Cooldown: ${stats.cooldownDuration}s (${(0, src_utils_formatters_js.numberFormatter)(stats.usesPerDay)} uses/day)</div>`;
			html += "</div>";
			html += "</div>";
			consumableDiv.innerHTML = html;
			tooltipText.appendChild(consumableDiv);
		}
		/**
		* Disable the feature
		*/
		disable() {
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			this.isActive = false;
			this.isInitialized = false;
		}
	};
	var tooltipConsumables = new TooltipConsumables();
	//#endregion
	//#region src/features/market/market-filter.js
	/**
	* Market Filter
	* Adds filter dropdowns to marketplace to filter by level, class (skill requirement), and equipment slot
	*/
	var MarketFilter = class {
		constructor() {
			this.isActive = false;
			this.unregisterHandlers = [];
			this.isInitialized = false;
			this.minLevel = 1;
			this.maxLevel = 1e3;
			this.skillRequirement = "all";
			this.equipmentSlot = "all";
			this.filterContainer = null;
		}
		/**
		* Initialize market filter
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("marketFilter")) return;
			this.isInitialized = true;
			this.registerDOMObservers();
			this.isActive = true;
		}
		/**
		* Register DOM observers for marketplace panel
		*/
		registerDOMObservers() {
			const unregister = src_core_dom_observer_js.default.onClass("market-filter-container", "MarketplacePanel_itemFilterContainer", (filterContainer) => {
				this.injectFilterUI(filterContainer);
			}, {
				debounce: true,
				debounceDelay: 150
			});
			this.unregisterHandlers.push(unregister);
			const unregisterItems = src_core_dom_observer_js.default.onClass("market-filter-items", "MarketplacePanel_marketItems", (_marketItemsContainer) => {
				this.applyFilters();
			}, {
				debounce: true,
				debounceDelay: 150
			});
			this.unregisterHandlers.push(unregisterItems);
			const existingFilterContainer = document.querySelector("div[class*=\"MarketplacePanel_itemFilterContainer\"]");
			if (existingFilterContainer) this.injectFilterUI(existingFilterContainer);
		}
		/**
		* Inject filter UI into marketplace panel
		* @param {HTMLElement} _oriFilterContainer - Original filter container
		*/
		injectFilterUI(_oriFilterContainer) {
			if (document.querySelector("#toolasha-market-filters")) return;
			const filterDiv = document.createElement("div");
			filterDiv.id = "toolasha-market-filters";
			filterDiv.style.cssText = "display: flex; gap: 12px; margin-top: 8px; flex-wrap: wrap;";
			filterDiv.appendChild(this.createLevelFilter("min"));
			filterDiv.appendChild(this.createLevelFilter("max"));
			filterDiv.appendChild(this.createClassFilter());
			filterDiv.appendChild(this.createSlotFilter());
			_oriFilterContainer.parentElement.insertBefore(filterDiv, _oriFilterContainer.nextSibling);
			this.filterContainer = filterDiv;
			this.applyFilters();
		}
		/**
		* Create level filter dropdown
		* @param {string} type - 'min' or 'max'
		* @returns {HTMLElement} Filter element
		*/
		createLevelFilter(type) {
			const container = document.createElement("span");
			container.style.cssText = "display: flex; align-items: center; gap: 4px;";
			const label = document.createElement("label");
			label.textContent = type === "min" ? (0, src_core_i18n_js.t)("Level >= ") : (0, src_core_i18n_js.t)("Level < ");
			label.style.cssText = "font-size: 12px; color: rgba(255, 255, 255, 0.7);";
			const select = document.createElement("select");
			select.id = `toolasha-level-${type}`;
			select.style.cssText = "padding: 4px 8px; border-radius: 4px; background: rgba(0, 0, 0, 0.3); color: #fff; border: 1px solid rgba(91, 141, 239, 0.3);";
			(type === "min" ? [
				1,
				10,
				20,
				30,
				40,
				50,
				60,
				65,
				70,
				75,
				80,
				85,
				90,
				95,
				100
			] : [
				10,
				20,
				30,
				40,
				50,
				60,
				65,
				70,
				75,
				80,
				85,
				90,
				95,
				100,
				1e3
			]).forEach((level) => {
				const option = document.createElement("option");
				option.value = level;
				option.textContent = level === 1e3 ? (0, src_core_i18n_js.t)("All") : level;
				if (type === "min" && level === 1 || type === "max" && level === 1e3) option.selected = true;
				select.appendChild(option);
			});
			select.addEventListener("change", () => {
				if (type === "min") this.minLevel = parseInt(select.value);
				else this.maxLevel = parseInt(select.value);
				this.applyFilters();
			});
			container.appendChild(label);
			container.appendChild(select);
			return container;
		}
		/**
		* Create class (skill requirement) filter dropdown
		* @returns {HTMLElement} Filter element
		*/
		createClassFilter() {
			const container = document.createElement("span");
			container.style.cssText = "display: flex; align-items: center; gap: 4px;";
			const label = document.createElement("label");
			label.textContent = (0, src_core_i18n_js.t)("Class: ");
			label.style.cssText = "font-size: 12px; color: rgba(255, 255, 255, 0.7);";
			const select = document.createElement("select");
			select.id = "toolasha-class-filter";
			select.style.cssText = "padding: 4px 8px; border-radius: 4px; background: rgba(0, 0, 0, 0.3); color: #fff; border: 1px solid rgba(91, 141, 239, 0.3);";
			[
				{
					value: "all",
					label: (0, src_core_i18n_js.t)("All")
				},
				{
					value: "attack",
					label: "Attack"
				},
				{
					value: "melee",
					label: "Melee"
				},
				{
					value: "defense",
					label: "Defense"
				},
				{
					value: "ranged",
					label: "Ranged"
				},
				{
					value: "magic",
					label: "Magic"
				},
				{
					value: "others",
					label: "Others"
				}
			].forEach((cls) => {
				const option = document.createElement("option");
				option.value = cls.value;
				option.textContent = cls.label;
				select.appendChild(option);
			});
			select.addEventListener("change", () => {
				this.skillRequirement = select.value;
				this.applyFilters();
			});
			container.appendChild(label);
			container.appendChild(select);
			return container;
		}
		/**
		* Create slot (equipment type) filter dropdown
		* @returns {HTMLElement} Filter element
		*/
		createSlotFilter() {
			const container = document.createElement("span");
			container.style.cssText = "display: flex; align-items: center; gap: 4px;";
			const label = document.createElement("label");
			label.textContent = (0, src_core_i18n_js.t)("Slot: ");
			label.style.cssText = "font-size: 12px; color: rgba(255, 255, 255, 0.7);";
			const select = document.createElement("select");
			select.id = "toolasha-slot-filter";
			select.style.cssText = "padding: 4px 8px; border-radius: 4px; background: rgba(0, 0, 0, 0.3); color: #fff; border: 1px solid rgba(91, 141, 239, 0.3);";
			[
				{
					value: "all",
					label: (0, src_core_i18n_js.t)("All")
				},
				{
					value: "main_hand",
					label: "Main Hand"
				},
				{
					value: "off_hand",
					label: "Off Hand"
				},
				{
					value: "two_hand",
					label: "Two Hand"
				},
				{
					value: "head",
					label: "Head"
				},
				{
					value: "body",
					label: "Body"
				},
				{
					value: "hands",
					label: "Hands"
				},
				{
					value: "legs",
					label: "Legs"
				},
				{
					value: "feet",
					label: "Feet"
				},
				{
					value: "neck",
					label: "Neck"
				},
				{
					value: "earrings",
					label: "Earrings"
				},
				{
					value: "ring",
					label: "Ring"
				},
				{
					value: "pouch",
					label: "Pouch"
				},
				{
					value: "back",
					label: "Back"
				}
			].forEach((slot) => {
				const option = document.createElement("option");
				option.value = slot.value;
				option.textContent = slot.label;
				select.appendChild(option);
			});
			select.addEventListener("change", () => {
				this.equipmentSlot = select.value;
				this.applyFilters();
			});
			container.appendChild(label);
			container.appendChild(select);
			return container;
		}
		/**
		* Apply filters to all market items
		*/
		applyFilters() {
			const marketItemsContainer = document.querySelector("div[class*=\"MarketplacePanel_marketItems\"]");
			if (!marketItemsContainer) return;
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData || !gameData.itemDetailMap) return;
			marketItemsContainer.querySelectorAll("div[class*=\"Item_itemContainer\"]").forEach((itemDiv) => {
				const useElement = itemDiv.querySelector("use");
				if (!useElement) return;
				const href = useElement.getAttribute("href");
				if (!href) return;
				const hrefName = href.split("#")[1];
				if (!hrefName) return;
				const itemHrid = `/items/${hrefName}`;
				const itemData = gameData.itemDetailMap[itemHrid];
				if (!itemData) {
					itemDiv.style.display = "";
					return;
				}
				if (!itemData.equipmentDetail) {
					if (this.minLevel > 1 || this.maxLevel < 1e3 || this.skillRequirement !== "all" || this.equipmentSlot !== "all") itemDiv.style.display = "none";
					else itemDiv.style.display = "";
					return;
				}
				const passesFilters = this.checkItemFilters(itemData);
				itemDiv.style.display = passesFilters ? "" : "none";
			});
		}
		/**
		* Check if item passes all current filters
		* @param {Object} itemData - Item data from game
		* @returns {boolean} True if item should be shown
		*/
		checkItemFilters(itemData) {
			const itemLevel = itemData.itemLevel || 0;
			const equipmentDetail = itemData.equipmentDetail;
			if (itemLevel < this.minLevel || itemLevel >= this.maxLevel) return false;
			if (this.equipmentSlot !== "all") {
				if (!(equipmentDetail.type || "").includes(this.equipmentSlot)) return false;
			}
			if (this.skillRequirement !== "all") {
				const levelRequirements = equipmentDetail.levelRequirements || [];
				if (this.skillRequirement === "others") {
					const combatSkills = [
						"attack",
						"melee",
						"defense",
						"ranged",
						"magic"
					];
					if (levelRequirements.some((req) => combatSkills.some((skill) => req.skillHrid.includes(skill)))) return false;
				} else if (!levelRequirements.some((req) => req.skillHrid.includes(this.skillRequirement))) return false;
			}
			return true;
		}
		/**
		* Cleanup on disable
		*/
		disable() {
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			if (this.filterContainer) {
				this.filterContainer.remove();
				this.filterContainer = null;
			}
			this.isActive = false;
			this.isInitialized = false;
		}
	};
	var marketFilter = new MarketFilter();
	//#endregion
	//#region src/features/market/market-sort.js
	/**
	* Market Sort by Profitability
	* Adds ability to sort marketplace items by profit/hour
	*/
	var MarketSort = class {
		constructor() {
			this.isActive = false;
			this.unregisterHandlers = [];
			this.isInitialized = false;
			this.profitCache = /* @__PURE__ */ new Map();
			this.originalOrder = [];
			this.sortDirection = "desc";
			this.isSorting = false;
			this.hasSorted = false;
			this.sortButton = null;
		}
		/**
		* Initialize market sort
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("marketSort")) return;
			this.isInitialized = true;
			this.registerDOMObservers();
			this.isActive = true;
		}
		/**
		* Register DOM observers for marketplace panel
		*/
		registerDOMObservers() {
			const unregister = src_core_dom_observer_js.default.onClass("market-sort-container", "MarketplacePanel_itemFilterContainer", (filterContainer) => {
				this.injectSortUI(filterContainer);
			}, {
				debounce: true,
				debounceDelay: 150
			});
			this.unregisterHandlers.push(unregister);
			const unregisterNav = src_core_dom_observer_js.default.onClass("market-sort-nav", "MarketplacePanel_panel", () => {}, () => {
				this.profitCache.clear();
				this.originalOrder = [];
				this.hasSorted = false;
				this.sortDirection = "desc";
				if (this.sortButton) this.sortButton.textContent = (0, src_core_i18n_js.t)("Sort by Profit");
			}, {
				debounce: true,
				debounceDelay: 150
			});
			this.unregisterHandlers.push(unregisterNav);
			const unregisterItems = src_core_dom_observer_js.default.onClass("market-sort-items", "MarketplacePanel_marketItems", () => {
				this.profitCache.clear();
				this.originalOrder = [];
				this.hasSorted = false;
				this.sortDirection = "desc";
				if (this.sortButton) this.sortButton.textContent = (0, src_core_i18n_js.t)("Sort by Profit");
				document.querySelectorAll(".toolasha-profit-indicator").forEach((el) => el.remove());
			});
			this.unregisterHandlers.push(unregisterItems);
			const existingFilterContainer = document.querySelector("div[class*=\"MarketplacePanel_itemFilterContainer\"]");
			if (existingFilterContainer) this.injectSortUI(existingFilterContainer);
		}
		/**
		* Inject sort UI into marketplace panel
		* @param {HTMLElement} filterContainer - Filter container element
		*/
		injectSortUI(filterContainer) {
			if (document.querySelector("#toolasha-market-sort")) return;
			const sortDiv = document.createElement("div");
			sortDiv.id = "toolasha-market-sort";
			sortDiv.style.cssText = "display: flex; gap: 8px; margin-top: 8px; align-items: center;";
			const sortButton = document.createElement("button");
			sortButton.id = "toolasha-sort-profit-btn";
			sortButton.textContent = (0, src_core_i18n_js.t)("Sort by Profit");
			sortButton.style.cssText = `
            padding: 6px 12px;
            border-radius: 4px;
            background: rgba(91, 141, 239, 0.2);
            color: #fff;
            border: 1px solid rgba(91, 141, 239, 0.5);
            cursor: pointer;
            font-size: 12px;
            transition: background 0.2s;
        `;
			sortButton.addEventListener("mouseenter", () => {
				if (!this.isSorting) sortButton.style.background = "rgba(91, 141, 239, 0.4)";
			});
			sortButton.addEventListener("mouseleave", () => {
				if (!this.isSorting) sortButton.style.background = "rgba(91, 141, 239, 0.2)";
			});
			sortButton.addEventListener("click", () => this.handleSortClick());
			this.sortButton = sortButton;
			sortDiv.appendChild(sortButton);
			const resetButton = document.createElement("button");
			resetButton.textContent = (0, src_core_i18n_js.t)("Reset Order");
			resetButton.style.cssText = `
            padding: 6px 12px;
            border-radius: 4px;
            background: rgba(100, 100, 100, 0.2);
            color: #fff;
            border: 1px solid rgba(100, 100, 100, 0.5);
            cursor: pointer;
            font-size: 12px;
            transition: background 0.2s;
        `;
			resetButton.addEventListener("mouseenter", () => {
				resetButton.style.background = "rgba(100, 100, 100, 0.4)";
			});
			resetButton.addEventListener("mouseleave", () => {
				resetButton.style.background = "rgba(100, 100, 100, 0.2)";
			});
			resetButton.addEventListener("click", () => this.resetOrder());
			sortDiv.appendChild(resetButton);
			filterContainer.parentElement.insertBefore(sortDiv, filterContainer.nextSibling);
		}
		/**
		* Handle sort button click
		*/
		async handleSortClick() {
			if (this.isSorting) return;
			if (this.hasSorted) this.sortDirection = this.sortDirection === "desc" ? "asc" : "desc";
			this.sortButton.textContent = this.sortDirection === "desc" ? (0, src_core_i18n_js.t)("Sorting... ▼") : (0, src_core_i18n_js.t)("Sorting... ▲");
			this.sortButton.style.background = "rgba(91, 141, 239, 0.6)";
			this.isSorting = true;
			try {
				await this.sortByProfitability();
			} finally {
				this.isSorting = false;
				this.sortButton.textContent = this.sortDirection === "desc" ? (0, src_core_i18n_js.t)("Sort by Profit ▼") : (0, src_core_i18n_js.t)("Sort by Profit ▲");
				this.sortButton.style.background = "rgba(91, 141, 239, 0.2)";
			}
		}
		/**
		* Sort marketplace items by profitability
		*/
		async sortByProfitability() {
			const marketItemsContainer = document.querySelector("div[class*=\"MarketplacePanel_marketItems\"]");
			if (!marketItemsContainer) return;
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData || !gameData.itemDetailMap) return;
			const visibleItems = Array.from(marketItemsContainer.querySelectorAll("div[class*=\"Item_itemContainer\"]")).filter((div) => div.style.display !== "none");
			if (!this.hasSorted) {
				this.originalOrder = visibleItems.map((div) => {
					return `/items/${(div.querySelector("use")?.getAttribute("href") || "").split("#")[1] || ""}`;
				});
				this.hasSorted = true;
			}
			const itemsWithProfit = [];
			for (const itemDiv of visibleItems) {
				const useElement = itemDiv.querySelector("use");
				if (!useElement) {
					itemsWithProfit.push({
						element: itemDiv,
						profit: null,
						itemHrid: null
					});
					continue;
				}
				const href = useElement.getAttribute("href");
				if (!href) {
					itemsWithProfit.push({
						element: itemDiv,
						profit: null,
						itemHrid: null
					});
					continue;
				}
				const hrefName = href.split("#")[1];
				if (!hrefName) {
					itemsWithProfit.push({
						element: itemDiv,
						profit: null,
						itemHrid: null
					});
					continue;
				}
				const itemHrid = `/items/${hrefName}`;
				if (this.profitCache.has(itemHrid)) {
					const cachedProfit = this.profitCache.get(itemHrid);
					itemsWithProfit.push({
						element: itemDiv,
						profit: cachedProfit,
						itemHrid
					});
					continue;
				}
				const profit = await this.calculateItemProfit(itemHrid, gameData);
				this.profitCache.set(itemHrid, profit);
				itemsWithProfit.push({
					element: itemDiv,
					profit,
					itemHrid
				});
			}
			itemsWithProfit.sort((a, b) => {
				if (a.profit === null && b.profit === null) return 0;
				if (a.profit === null) return 1;
				if (b.profit === null) return -1;
				return this.sortDirection === "desc" ? b.profit - a.profit : a.profit - b.profit;
			});
			for (const item of itemsWithProfit) {
				marketItemsContainer.appendChild(item.element);
				this.addProfitIndicator(item.element, item.profit);
			}
		}
		/**
		* Calculate profit for an item
		* @param {string} itemHrid - Item HRID
		* @param {Object} gameData - Game data
		* @returns {Promise<number|null>} Profit per hour or null if not calculable
		*/
		async calculateItemProfit(itemHrid, gameData) {
			const productionProfit = await profitCalculator.calculateProfit(itemHrid);
			if (productionProfit && productionProfit.profitPerHour !== void 0) return productionProfit.profitPerHour;
			const gatheringAction = this.findGatheringAction(itemHrid, gameData);
			if (gatheringAction) {
				const gatheringProfit = await calculateGatheringProfit(gatheringAction);
				if (gatheringProfit && gatheringProfit.profitPerHour !== void 0) return gatheringProfit.profitPerHour;
			}
			return null;
		}
		/**
		* Find gathering action that produces an item
		* @param {string} itemHrid - Item HRID
		* @param {Object} gameData - Game data
		* @returns {string|null} Action HRID or null
		*/
		findGatheringAction(itemHrid, gameData) {
			const gatheringTypes = [
				"/action_types/foraging",
				"/action_types/woodcutting",
				"/action_types/milking"
			];
			for (const [actionHrid, action] of Object.entries(gameData.actionDetailMap)) {
				if (!gatheringTypes.includes(action.type)) continue;
				if (action.dropTable) {
					for (const drop of action.dropTable) if (drop.itemHrid === itemHrid) return actionHrid;
				}
			}
			return null;
		}
		/**
		* Add profit indicator to item element
		* @param {HTMLElement} itemDiv - Item container element
		* @param {number|null} profit - Profit per hour or null
		*/
		addProfitIndicator(itemDiv, profit) {
			const existing = itemDiv.querySelector(".toolasha-profit-indicator");
			if (existing) existing.remove();
			const indicator = document.createElement("div");
			indicator.className = "toolasha-profit-indicator";
			let displayText;
			let color;
			if (profit === null) {
				displayText = "—";
				color = "rgba(150, 150, 150, 0.8)";
			} else if (profit >= 0) {
				displayText = `+${(0, src_utils_formatters_js.formatLargeNumber)(profit, 0)}`;
				color = profit > 1e5 ? "#4CAF50" : profit > 0 ? "#8BC34A" : "rgba(150, 150, 150, 0.8)";
			} else {
				displayText = (0, src_utils_formatters_js.formatLargeNumber)(profit, 0);
				color = "#F44336";
			}
			indicator.textContent = displayText;
			indicator.style.cssText = `
            position: absolute;
            top: 2px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 9px;
            font-weight: 600;
            color: ${color};
            background: rgba(0, 0, 0, 0.7);
            padding: 1px 3px;
            border-radius: 2px;
            white-space: nowrap;
            pointer-events: none;
            z-index: 10;
        `;
			if (getComputedStyle(itemDiv).position === "static") itemDiv.style.position = "relative";
			itemDiv.appendChild(indicator);
		}
		/**
		* Reset item order to original
		*/
		resetOrder() {
			const marketItemsContainer = document.querySelector("div[class*=\"MarketplacePanel_marketItems\"]");
			if (!marketItemsContainer) return;
			document.querySelectorAll(".toolasha-profit-indicator").forEach((el) => el.remove());
			if (this.originalOrder.length > 0) {
				const itemDivs = Array.from(marketItemsContainer.querySelectorAll("div[class*=\"Item_itemContainer\"]"));
				const elementMap = /* @__PURE__ */ new Map();
				for (const div of itemDivs) {
					const itemHrid = `/items/${(div.querySelector("use")?.getAttribute("href") || "").split("#")[1] || ""}`;
					elementMap.set(itemHrid, div);
				}
				for (const itemHrid of this.originalOrder) {
					const element = elementMap.get(itemHrid);
					if (element) marketItemsContainer.appendChild(element);
				}
			}
			this.profitCache.clear();
			this.originalOrder = [];
			this.hasSorted = false;
			this.sortDirection = "desc";
			if (this.sortButton) this.sortButton.textContent = (0, src_core_i18n_js.t)("Sort by Profit");
		}
		/**
		* Cleanup on disable
		*/
		disable() {
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			const sortDiv = document.querySelector("#toolasha-market-sort");
			if (sortDiv) sortDiv.remove();
			document.querySelectorAll(".toolasha-profit-indicator").forEach((el) => el.remove());
			this.profitCache.clear();
			this.originalOrder = [];
			this.hasSorted = false;
			this.isActive = false;
			this.isInitialized = false;
			this.sortButton = null;
		}
	};
	var marketSort = new MarketSort();
	//#endregion
	//#region src/features/market/auto-fill-price.js
	/**
	* Auto-Fill Market Price
	* Automatically fills marketplace order forms with optimal competitive pricing
	*/
	var AutoFillPrice = class {
		constructor() {
			this.isActive = false;
			this.unregisterHandlers = [];
			this.processedModals = /* @__PURE__ */ new WeakSet();
			this.isInitialized = false;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
		}
		/**
		* Initialize auto-fill price feature
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("fillMarketOrderPrice")) return;
			this.isInitialized = true;
			this.registerDOMObservers();
			this.isActive = true;
		}
		/**
		* Register DOM observers for order modals
		*/
		registerDOMObservers() {
			const unregister = src_core_dom_observer_js.default.onClass("auto-fill-price", "Modal_modalContainer", (modal) => {
				if (!modal.querySelector("div[class*=\"MarketplacePanel_header\"]")) return;
				if (!modal.querySelector("span[class*=\"MarketplacePanel_bestPrice\"]")) return;
				this.handleOrderModal(modal);
			});
			this.unregisterHandlers.push(unregister);
		}
		/**
		* Handle new order modal
		* @param {HTMLElement} modal - Modal container element
		*/
		handleOrderModal(modal) {
			if (this.processedModals.has(modal)) return;
			this.processedModals.add(modal);
			const bestPriceLabel = modal.querySelector("span[class*=\"MarketplacePanel_bestPrice\"]");
			if (!bestPriceLabel) return;
			const isSellOrder = modal.querySelector("[class*=\"Button_sell\"]") !== null;
			const isBuyOrder = modal.querySelector("[class*=\"Button_buy\"]") !== null;
			if (!isBuyOrder && !isSellOrder) return;
			bestPriceLabel.click();
			const adjustTimeout = setTimeout(() => {
				this.adjustPrice(modal, isBuyOrder, isSellOrder);
			}, 50);
			this.timerRegistry.registerTimeout(adjustTimeout);
		}
		/**
		* Adjust the price to be optimally competitive
		* @param {HTMLElement} modal - Modal container element
		* @param {boolean} isBuyOrder - True if buy order
		* @param {boolean} isSellOrder - True if sell order
		*/
		adjustPrice(modal, isBuyOrder, isSellOrder) {
			const inputContainer = modal.querySelector("div[class*=\"MarketplacePanel_inputContainer\"] div[class*=\"MarketplacePanel_priceInputs\"]");
			if (!inputContainer) return;
			const buttonContainers = inputContainer.querySelectorAll("div[class*=\"MarketplacePanel_buttonContainer\"]");
			if (buttonContainers.length < 3) return;
			if (isBuyOrder) {
				const buyStrategy = src_core_config_js.default.getSettingValue("market_autoFillBuyStrategy", "outbid");
				if (buyStrategy === "outbid") {
					const button = buttonContainers[2].querySelector("div button");
					if (button) button.click();
				} else if (buyStrategy === "undercut") {
					const button = buttonContainers[1].querySelector("div button");
					if (button) button.click();
				}
			} else if (isSellOrder) {
				if (src_core_config_js.default.getSettingValue("market_autoFillSellStrategy", "match") === "undercut") {
					const button = buttonContainers[1].querySelector("div button");
					if (button) button.click();
				}
			}
		}
		/**
		* Cleanup on disable
		*/
		disable() {
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			this.timerRegistry.clearAll();
			this.isActive = false;
			this.isInitialized = false;
		}
	};
	var autoFillPrice = new AutoFillPrice();
	//#endregion
	//#region src/features/market/auto-click-max.js
	/**
	* Auto-Click Max Button
	* Automatically clicks the "Max" button in market listing dialogs
	*/
	var AutoClickMax = class {
		constructor() {
			this.isActive = false;
			this.unregisterHandlers = [];
			this.processedModals = /* @__PURE__ */ new WeakSet();
			this.isInitialized = false;
		}
		/**
		* Initialize the auto-click max feature
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_autoClickMax")) return;
			this.isActive = true;
			this.registerDOMObservers();
			this.isInitialized = true;
		}
		/**
		* Register DOM observers to watch for market listing modals
		*/
		registerDOMObservers() {
			const unregister = src_core_dom_observer_js.default.onClass("auto-click-max", "Modal_modalContainer", (modal) => {
				this.handleOrderModal(modal);
			});
			this.unregisterHandlers.push(unregister);
		}
		/**
		* Handle market order modal appearance
		* @param {HTMLElement} modal - Modal container element
		*/
		handleOrderModal(modal) {
			if (!this.isActive || !modal || this.processedModals.has(modal)) return;
			if (!modal.querySelector("div[class*=\"MarketplacePanel_header\"]")) return;
			if (!modal.querySelector("[class*=\"Button_sell\"]")) return;
			this.processedModals.add(modal);
			this.findAndClickMaxButton(modal);
		}
		/**
		* Find and click the Max or All button in the modal
		* @param {HTMLElement} modal - Modal container element
		*/
		findAndClickMaxButton(modal) {
			if (!modal) return;
			const allButtons = modal.querySelectorAll("button");
			const maxButton = Array.from(allButtons).find((btn) => {
				const text = btn.textContent.trim();
				return text === "Max" || text === "All";
			});
			if (!maxButton) return;
			if (maxButton.disabled) return;
			try {
				maxButton.click();
			} catch (error) {
				console.error("[AutoClickMax] Failed to click Max/All button:", error);
			}
		}
		/**
		* Disable and cleanup
		*/
		disable() {
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			this.processedModals = /* @__PURE__ */ new WeakSet();
			this.isActive = false;
			this.isInitialized = false;
		}
	};
	var autoClickMax = new AutoClickMax();
	//#endregion
	//#region src/features/market/item-count-display.js
	/**
	* Market Item Count Display Module
	*
	* Shows inventory count on market item tiles
	* Ported from Ranged Way Idle's visibleItemCountMarket feature
	*/
	var ItemCountDisplay = class {
		constructor() {
			this.unregisterObserver = null;
			this.isInitialized = false;
			this.itemsUpdatedHandler = null;
		}
		/**
		* Initialize the item count display
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_visibleItemCount")) return;
			this.isInitialized = true;
			this.setupObserver();
			this.setupInventoryListener();
		}
		/**
		* Setup DOM observer to watch for market panels
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("ItemCountDisplay", "MarketplacePanel_marketItems", (marketContainer) => {
				this.updateItemCounts(marketContainer);
			}, {
				debounce: true,
				debounceDelay: 150
			});
			const existingContainer = document.querySelector("[class*=\"MarketplacePanel_marketItems\"]");
			if (existingContainer) this.updateItemCounts(existingContainer);
		}
		/**
		* Listen for inventory changes and refresh counts
		*/
		setupInventoryListener() {
			let debounceTimer = null;
			this.itemsUpdatedHandler = () => {
				if (debounceTimer) clearTimeout(debounceTimer);
				debounceTimer = setTimeout(() => {
					const container = document.querySelector("[class*=\"MarketplacePanel_marketItems\"]");
					if (container) this.updateItemCounts(container);
				}, 250);
			};
			src_core_data_manager_js.default.on("items_updated", this.itemsUpdatedHandler);
		}
		/**
		* Update item counts for all items in market container
		* @param {HTMLElement} marketContainer - The market items container
		*/
		updateItemCounts(marketContainer) {
			const itemCountMap = this.buildItemCountMap();
			const itemTiles = marketContainer.querySelectorAll("[class*=\"Item_clickable\"]");
			for (const itemTile of itemTiles) this.updateSingleItem(itemTile, itemCountMap);
		}
		/**
		* Build a map of itemHrid → count from inventory
		* @returns {Object} Map of item HRIDs to counts
		*/
		buildItemCountMap() {
			const itemCountMap = {};
			const inventory = src_core_data_manager_js.default.getInventory();
			const includeEquipped = src_core_config_js.default.getSetting("market_visibleItemCountIncludeEquipped");
			if (!inventory) return itemCountMap;
			for (const item of inventory) {
				if (!item.itemHrid || item.itemLocationHrid !== "/item_locations/inventory") continue;
				itemCountMap[item.itemHrid] = (itemCountMap[item.itemHrid] || 0) + (item.count || 0);
			}
			if (includeEquipped) {
				const equipment = src_core_data_manager_js.default.getEquipment();
				if (equipment) {
					for (const slot of equipment.values()) if (slot && slot.itemHrid) itemCountMap[slot.itemHrid] = (itemCountMap[slot.itemHrid] || 0) + 1;
				}
			}
			return itemCountMap;
		}
		/**
		* Update a single item tile with count
		* @param {HTMLElement} itemTile - The item tile element
		* @param {Object} itemCountMap - Map of item HRIDs to counts
		*/
		updateSingleItem(itemTile, itemCountMap) {
			const useElement = itemTile.querySelector("use");
			if (!useElement || !useElement.href || !useElement.href.baseVal) return;
			const itemId = useElement.href.baseVal.split("#")[1];
			if (!itemId) return;
			const itemCount = itemCountMap[`/items/${itemId}`] || 0;
			let countDiv = itemTile.querySelector(".mwi-item-count");
			if (!countDiv) {
				countDiv = document.createElement("div");
				countDiv.className = "mwi-item-count";
				itemTile.appendChild(countDiv);
				itemTile.style.position = "relative";
				countDiv.style.position = "absolute";
				countDiv.style.bottom = "-1px";
				countDiv.style.right = "2px";
				countDiv.style.textAlign = "right";
				countDiv.style.fontSize = "0.85em";
				countDiv.style.fontWeight = "bold";
				countDiv.style.pointerEvents = "none";
			}
			const opacity = src_core_config_js.default.getSettingValue("market_visibleItemCountOpacity", .25);
			if (itemCount === 0) {
				itemTile.style.opacity = opacity.toString();
				countDiv.textContent = "";
			} else {
				itemTile.style.opacity = "1.0";
				countDiv.textContent = itemCount.toString();
			}
		}
		/**
		* Disable the item count display
		*/
		disable() {
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			if (this.itemsUpdatedHandler) {
				src_core_data_manager_js.default.off("items_updated", this.itemsUpdatedHandler);
				this.itemsUpdatedHandler = null;
			}
			document.querySelectorAll(".mwi-item-count").forEach((el) => el.remove());
			document.querySelectorAll("[class*=\"Item_clickable\"]").forEach((tile) => {
				tile.style.opacity = "1.0";
			});
			this.isInitialized = false;
		}
	};
	var itemCountDisplay = new ItemCountDisplay();
	//#endregion
	//#region src/features/market/estimated-listing-age.js
	/**
	* Estimated Listing Age Module
	*
	* Estimates creation times for all market listings using listing ID interpolation
	* - Collects known listing IDs with timestamps (from your own listings)
	* - Uses linear interpolation/regression to estimate ages for unknown listings
	* - Displays estimated ages on the main Market Listings (order book) tab
	*/
	var EstimatedListingAge = class {
		constructor() {
			this.knownListings = [];
			this.orderBooksCache = {};
			this.currentItemHrid = null;
			this.unregisterWebSocket = null;
			this.unregisterObserver = null;
			this.storageKey = "marketListingTimestamps";
			this.orderBooksCacheKey = "marketOrderBooksCache";
			this.isInitialized = false;
		}
		/**
		* Format timestamp based on user settings
		* @param {number} timestamp - Timestamp in milliseconds
		* @returns {string} Formatted time string
		*/
		formatTimestamp(timestamp) {
			if (src_core_config_js.default.getSettingValue("market_listingAgeFormat", "datetime") === "elapsed") {
				const ageMs = Date.now() - timestamp;
				return (0, src_utils_formatters_js.formatRelativeTime)(ageMs);
			} else return (0, src_utils_formatters_js.formatDateTime)(new Date(timestamp));
		}
		/**
		* Initialize the estimated listing age feature
		*/
		async initialize() {
			if (this.isInitialized) return;
			this.isInitialized = true;
			await this.loadHistoricalData();
			await this.loadOrderBooksCache();
			this.loadInitialListings();
			this.setupWebSocketListeners();
			if (src_core_config_js.default.getSetting("market_showEstimatedListingAge")) {
				this.setupObserver();
				this.setupMyListingsObserver();
			}
		}
		/**
		* Load initial listings from dataManager (already received via init_character_data)
		*/
		loadInitialListings() {
			const listings = src_core_data_manager_js.default.getMarketListings();
			for (const listing of listings) if (listing.id && listing.createdTimestamp) this.recordListing(listing);
		}
		/**
		* Load historical listing data from IndexedDB
		*/
		async loadHistoricalData() {
			try {
				const stored = await src_core_storage_js.default.getJSON(this.storageKey, "marketListings", []);
				this.knownListings = stored.sort((a, b) => a.id - b.id);
				for (const seed of [
					{
						id: 106442952,
						timestamp: 1763409373481
					},
					{
						id: 106791533,
						timestamp: 1763541486867
					},
					{
						id: 107530218,
						timestamp: 1763842767083
					},
					{
						id: 107640371,
						timestamp: 1763890560819
					},
					{
						id: 107678558,
						timestamp: 1763904036320
					}
				]) if (!this.knownListings.find((l) => l.id === seed.id)) this.knownListings.push(seed);
				this.knownListings.sort((a, b) => a.id - b.id);
			} catch (error) {
				console.error("[EstimatedListingAge] Failed to load historical data:", error);
				this.knownListings = [];
			}
		}
		/**
		* Load cached order books from IndexedDB
		*/
		async loadOrderBooksCache() {
			try {
				const raw = await src_core_storage_js.default.getJSON(this.orderBooksCacheKey, "marketListings", {}) || {};
				const cutoff = Date.now() - 6048e5;
				this.orderBooksCache = Object.fromEntries(Object.entries(raw).filter(([, entry]) => entry.lastUpdated && entry.lastUpdated >= cutoff));
			} catch (error) {
				console.error("[EstimatedListingAge] Failed to load order books cache:", error);
				this.orderBooksCache = {};
			}
		}
		/**
		* Save listing data to IndexedDB
		*/
		async saveHistoricalData() {
			try {
				await src_core_storage_js.default.setJSON(this.storageKey, this.knownListings, "marketListings", true);
			} catch (error) {
				console.error("[EstimatedListingAge] Failed to save historical data:", error);
			}
		}
		/**
		* Save order books cache to IndexedDB
		*/
		async saveOrderBooksCache() {
			try {
				await src_core_storage_js.default.setJSON(this.orderBooksCacheKey, this.orderBooksCache, "marketListings");
			} catch (error) {
				console.error("[EstimatedListingAge] Failed to save order books cache:", error);
			}
		}
		/**
		* Setup WebSocket listeners to collect your listing IDs and order book data
		*/
		setupWebSocketListeners() {
			const initHandler = (data) => {
				if (data.myMarketListings) {
					for (const listing of data.myMarketListings) this.recordListing(listing);
					this._reconcileActiveListings(data.myMarketListings);
				}
			};
			const updateHandler = (data) => {
				if (data.newMarketListings) for (const listing of data.newMarketListings) {
					listing._toolashaStatus = "unknown";
					this.recordListing(listing);
				}
				if (data.myMarketListings) {
					for (const listing of data.myMarketListings) this.recordListing(listing);
					this._reconcileActiveListings(data.myMarketListings);
				}
				if (data.endMarketListings) for (const listing of data.endMarketListings) {
					if (listing.status === "/market_listing_status/active") listing._toolashaStatus = "unknown";
					else if (listing.status === "/market_listing_status/cancelled") if (listing.filledQuantity > 0) {
						listing._toolashaStatus = "filled";
						listing.orderQuantity = listing.filledQuantity;
					} else listing._toolashaStatus = "canceled";
					else if (listing.status === "/market_listing_status/filled") listing._toolashaStatus = "filled";
					else if (listing.status === "/market_listing_status/expired") listing._toolashaStatus = "expired";
					else if (listing.filledQuantity >= listing.orderQuantity) listing._toolashaStatus = "filled";
					else listing._toolashaStatus = "canceled";
					this.recordListing(listing);
				}
			};
			const orderBookHandler = (data) => {
				if (data.marketItemOrderBooks) {
					const itemHrid = data.marketItemOrderBooks.itemHrid;
					const orderBooks = data.marketItemOrderBooks.orderBooks;
					if (orderBooks) {
						const orderBooksArray = Array.isArray(orderBooks) ? orderBooks : Object.values(orderBooks);
						for (const orderBook of orderBooksArray) {
							if (!orderBook) continue;
							if (orderBook.asks) {
								for (const listing of orderBook.asks) if (!listing.createdTimestamp && listing.listingId) {
									const estimatedTimestamp = this.estimateTimestamp(listing.listingId);
									listing.createdTimestamp = new Date(estimatedTimestamp).toISOString();
								}
							}
							if (orderBook.bids) {
								for (const listing of orderBook.bids) if (!listing.createdTimestamp && listing.listingId) {
									const estimatedTimestamp = this.estimateTimestamp(listing.listingId);
									listing.createdTimestamp = new Date(estimatedTimestamp).toISOString();
								}
							}
						}
					}
					this.orderBooksCache[itemHrid] = {
						data: data.marketItemOrderBooks,
						lastUpdated: Date.now()
					};
					this.currentItemHrid = itemHrid;
					if (orderBooks) if (Array.isArray(orderBooks)) orderBooks.forEach((orderBook, enhancementLevel) => {
						if (!orderBook) return;
						const topAsk = orderBook.asks?.[0]?.price ?? null;
						const bids = orderBook.bids;
						const topBid = bids?.length > 0 ? bids[0].price : null;
						if (topAsk !== null || topBid !== null) src_api_marketplace_js.default.updatePrice(itemHrid, enhancementLevel, topAsk, topBid);
					});
					else for (const [level, orderBook] of Object.entries(orderBooks)) {
						if (!orderBook) continue;
						const enhancementLevel = parseInt(level, 10);
						const topAsk = orderBook.asks?.[0]?.price ?? null;
						const bids = orderBook.bids;
						const topBid = bids?.length > 0 ? bids[0].price : null;
						if (topAsk !== null || topBid !== null) src_api_marketplace_js.default.updatePrice(itemHrid, enhancementLevel, topAsk, topBid);
					}
					this.saveOrderBooksCache();
					if (src_core_config_js.default.getSetting("market_showEstimatedListingAge")) {
						document.querySelectorAll(".mwi-estimated-age-set").forEach((container) => {
							container.classList.remove("mwi-estimated-age-set");
						});
						document.querySelectorAll(".mwi-listing-prices-set").forEach((table) => {
							table.classList.remove("mwi-listing-prices-set");
						});
						document.querySelectorAll("[class*=\"MarketplacePanel_orderBooksContainer\"]").forEach((container) => {
							this.processOrderBook(container);
						});
					}
				}
			};
			src_core_data_manager_js.default.on("character_initialized", initHandler);
			src_core_data_manager_js.default.on("market_listings_updated", updateHandler);
			src_core_data_manager_js.default.on("market_item_order_books_updated", orderBookHandler);
			this.unregisterWebSocket = () => {
				src_core_data_manager_js.default.off("character_initialized", initHandler);
				src_core_data_manager_js.default.off("market_listings_updated", updateHandler);
				src_core_data_manager_js.default.off("market_item_order_books_updated", orderBookHandler);
			};
		}
		/**
		* Reconcile knownListings against a full snapshot of currently active listings.
		* Any entry with status 'active' or 'unknown' that is absent from the snapshot
		* is downgraded to 'unknown' — it's no longer active but we don't know why.
		* @param {Array} activeListings - Current active listings from the game snapshot
		*/
		_reconcileActiveListings(activeListings) {
			const activeIds = new Set(activeListings.map((l) => l.id));
			let changed = false;
			for (const known of this.knownListings) if (known.status === "active" && !activeIds.has(known.id)) {
				known.status = "unknown";
				changed = true;
			}
			if (changed) this.saveHistoricalData();
		}
		/**
		* Record a listing with its full data
		* @param {Object} listing - Full listing object from WebSocket
		*/
		recordListing(listing) {
			if (!listing.createdTimestamp) return;
			const timestamp = new Date(listing.createdTimestamp).getTime();
			const existingIndex = this.knownListings.findIndex((entry) => entry.id === listing.id);
			let status;
			if (listing._toolashaStatus) status = listing._toolashaStatus;
			else if (existingIndex !== -1 && this.knownListings[existingIndex].status) status = this.knownListings[existingIndex].status;
			else status = "unknown";
			const entry = {
				id: listing.id,
				timestamp,
				createdTimestamp: listing.createdTimestamp,
				itemHrid: listing.itemHrid,
				enhancementLevel: listing.enhancementLevel || 0,
				price: listing.price,
				orderQuantity: listing.orderQuantity,
				filledQuantity: listing.filledQuantity,
				isSell: listing.isSell,
				status
			};
			if (existingIndex !== -1) this.knownListings[existingIndex] = entry;
			else this.knownListings.push(entry);
			this.knownListings.sort((a, b) => a.id - b.id);
			this.saveHistoricalData();
		}
		/**
		* Setup DOM observer to watch for order book table
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("EstimatedListingAge", "MarketplacePanel_orderBooksContainer", (container) => {
				this.processOrderBook(container);
			}, {
				debounce: true,
				debounceDelay: 150
			});
		}
		/**
		* Setup DOM observer for My Listings table to detect expired listings
		*/
		setupMyListingsObserver() {
			this.unregisterMyListingsObserver = src_core_dom_observer_js.default.onClass("EstimatedListingAge_MyListings", "MarketplacePanel_myListingsTableContainer__2s6pm", (container) => {
				this.checkForExpiredListings(container);
			}, {
				debounce: true,
				debounceDelay: 150
			});
		}
		/**
		* Check for expired listings in the My Listings table
		* @param {HTMLElement} container - My Listings table container
		*/
		async checkForExpiredListings(container) {
			const tbody = container.querySelector("table tbody");
			if (!tbody) return;
			const rows = tbody.querySelectorAll("tr");
			for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
				const row = rows[rowIndex];
				try {
					const allCells = row.querySelectorAll("td");
					const statusCell = allCells[0];
					if (!statusCell) continue;
					if (statusCell.textContent.trim() !== "Expired") continue;
					const isSell = allCells[1]?.textContent.trim() === "Sell";
					const allDivsInCell = allCells[2]?.querySelectorAll("div");
					const progressMatch = ((allDivsInCell ? allDivsInCell[allDivsInCell.length - 1] : null)?.textContent.trim())?.match(/(\d+)\s*\/\s*(\d+)/);
					if (!progressMatch) continue;
					const filledQuantity = parseInt(progressMatch[1], 10);
					const orderQuantity = parseInt(progressMatch[2], 10);
					const priceText = allCells[3]?.textContent.trim();
					const price = this.parsePrice(priceText);
					if (price === null) continue;
					const matchingListing = this.knownListings.find((listing) => listing.isSell === isSell && listing.price === price && listing.orderQuantity === orderQuantity && listing.filledQuantity === filledQuantity);
					if (matchingListing && matchingListing.status !== "expired") {
						matchingListing.status = "expired";
						await this.saveHistoricalData();
					}
				} catch (error) {
					console.error(`[EstimatedListingAge] Error processing expired listing row:`, error);
				}
			}
		}
		/**
		* Parse price string (handles K/M/B suffixes)
		* @param {string} priceText - Price text (e.g., "12M", "1.5K", "100")
		* @returns {number|null} Parsed price or null if invalid
		*/
		parsePrice(priceText) {
			if (!priceText) return null;
			const match = priceText.trim().toUpperCase().match(/^([\d,.]+)([KMB])?$/);
			if (!match) return null;
			const value = parseFloat(match[1].replace(/,/g, ""));
			const suffix = match[2];
			if (isNaN(value)) return null;
			switch (suffix) {
				case "K": return Math.round(value * 1e3);
				case "M": return Math.round(value * 1e6);
				case "B": return Math.round(value * 1e9);
				default: return Math.round(value);
			}
		}
		/**
		* Process the order book container and inject age estimates
		* @param {HTMLElement} container - Order book container
		*/
		processOrderBook(container) {
			if (container.classList.contains("mwi-estimated-age-set")) return;
			const tables = container.querySelectorAll("table");
			if (tables.length < 2) return;
			container.classList.add("mwi-estimated-age-set");
			tables.forEach((table) => {
				this.addAgeColumn(table);
			});
		}
		/**
		* Add estimated age column to order book table
		* @param {HTMLElement} table - Order book table
		*/
		addAgeColumn(table) {
			const thead = table.querySelector("thead tr");
			const tbody = table.querySelector("tbody");
			if (!thead || !tbody) return;
			thead.querySelectorAll(".mwi-estimated-age-header").forEach((el) => el.remove());
			tbody.querySelectorAll(".mwi-estimated-age-cell").forEach((el) => el.remove());
			const currentItemHrid = this.getCurrentItemHrid();
			if (!currentItemHrid || !this.orderBooksCache[currentItemHrid]) return;
			const cacheEntry = this.orderBooksCache[currentItemHrid];
			const orderBookData = cacheEntry.data || cacheEntry;
			const enhancementLevel = this.getCurrentEnhancementLevel();
			const isSellTable = table.closest("[class*=\"orderBookTableContainer\"]") === table.closest("[class*=\"orderBooksContainer\"]")?.children[0];
			const orderBookAtLevel = orderBookData.orderBooks?.[enhancementLevel];
			if (!orderBookAtLevel) return;
			const listings = isSellTable ? orderBookAtLevel.asks || [] : orderBookAtLevel.bids || [];
			const header = document.createElement("th");
			header.classList.add("mwi-estimated-age-header");
			header.textContent = "~Age";
			header.title = "Estimated listing age (based on listing ID)";
			thead.appendChild(header);
			const usedListingIds = /* @__PURE__ */ new Set();
			const rows = tbody.querySelectorAll("tr");
			let index = 0;
			rows.forEach((row) => {
				const cell = document.createElement("td");
				cell.classList.add("mwi-estimated-age-cell");
				if (index < listings.length) {
					const listingId = listings[index].listingId;
					const yourListing = this.knownListings.find((known) => known.id === listingId && !usedListingIds.has(known.id));
					if (yourListing) {
						usedListingIds.add(yourListing.id);
						cell.textContent = this.formatTimestamp(yourListing.timestamp);
						cell.style.color = "#00FF00";
						cell.style.fontSize = "0.9em";
					} else {
						const estimatedTimestamp = this.estimateTimestamp(listingId);
						cell.textContent = `~${this.formatTimestamp(estimatedTimestamp)}`;
						cell.style.color = "#999999";
						cell.style.fontSize = "0.9em";
					}
				} else if (index === listings.length) {
					cell.textContent = "· · ·";
					cell.style.color = "#666666";
					cell.style.fontSize = "0.9em";
				} else if (row.textContent.includes("Cancel")) {
					const priceText = row.querySelector("[class*=\"price\"]")?.textContent || "";
					const quantityText = row.children[0]?.textContent || "";
					const price = this.parsePrice(priceText);
					const quantity = this.parseQuantity(quantityText);
					if (price === null) return;
					const activeListings = src_core_data_manager_js.default.getMarketListings();
					const activeListingIds = new Set(activeListings.map((l) => l.id));
					const allOrderBookIds = new Set(listings.map((l) => l.listingId));
					const potentialMatches = this.knownListings.filter((listing) => {
						if (usedListingIds.has(listing.id)) return false;
						if (allOrderBookIds.has(listing.id)) return false;
						if (!activeListingIds.has(listing.id)) return false;
						const itemMatch = listing.itemHrid === currentItemHrid;
						const priceMatch = Math.abs(listing.price - price) < .01;
						const qtyMatch = listing.orderQuantity - listing.filledQuantity === quantity;
						const sideMatch = listing.isSell === isSellTable;
						return itemMatch && priceMatch && qtyMatch && sideMatch;
					});
					const matchedListing = potentialMatches.length > 0 ? potentialMatches[0] : null;
					if (matchedListing) {
						usedListingIds.add(matchedListing.id);
						cell.textContent = this.formatTimestamp(matchedListing.timestamp);
						cell.style.color = "#00FF00";
						cell.style.fontSize = "0.9em";
					} else {
						cell.textContent = "~Unknown";
						cell.style.color = "#666666";
						cell.style.fontSize = "0.9em";
					}
				} else {
					cell.textContent = "· · ·";
					cell.style.color = "#666666";
					cell.style.fontSize = "0.9em";
				}
				row.appendChild(cell);
				index++;
			});
		}
		/**
		* Get current item HRID being viewed in order book
		* @returns {string|null} Item HRID or null
		*/
		getCurrentItemHrid() {
			const currentItemElement = document.querySelector(".MarketplacePanel_currentItem__3ercC");
			if (currentItemElement) {
				const useElement = currentItemElement.querySelector("use");
				if (useElement && useElement.href && useElement.href.baseVal) return "/items/" + useElement.href.baseVal.split("#")[1];
			}
			if (this.currentItemHrid) return this.currentItemHrid;
			const orderBookContainer = document.querySelector("[class*=\"MarketplacePanel_orderBooksContainer\"]");
			if (!orderBookContainer) return null;
			const tables = orderBookContainer.querySelectorAll("table");
			for (const table of tables) {
				const rows = table.querySelectorAll("tbody tr");
				for (const row of rows) if (row.textContent.includes("Cancel")) {
					const priceText = row.querySelector("[class*=\"price\"]")?.textContent || "";
					const quantityText = row.children[0]?.textContent || "";
					const price = this.parsePrice(priceText);
					const quantity = this.parseQuantity(quantityText);
					if (price === null) continue;
					const matchedListing = this.knownListings.find((listing) => {
						const priceMatch = Math.abs(listing.price - price) < .01;
						const qtyMatch = listing.orderQuantity - listing.filledQuantity === quantity;
						return priceMatch && qtyMatch;
					});
					if (matchedListing) return matchedListing.itemHrid;
				}
			}
			return null;
		}
		/**
		* Get current enhancement level being viewed in order book
		* @returns {number} Enhancement level (0 for non-equipment)
		*/
		getCurrentEnhancementLevel() {
			const currentItemElement = document.querySelector(".MarketplacePanel_currentItem__3ercC");
			if (currentItemElement) {
				const enhancementElement = currentItemElement.querySelector("[class*=\"Item_enhancementLevel\"]");
				if (enhancementElement) {
					const match = enhancementElement.textContent.match(/\+(\d+)/);
					if (match) return parseInt(match[1], 10);
				}
			}
			return 0;
		}
		/**
		* Parse quantity from text (handles K/M suffixes)
		* @param {string} text - Quantity text
		* @returns {number} Quantity value
		*/
		parseQuantity(text) {
			let multiplier = 1;
			if (text.toUpperCase().includes("K")) {
				multiplier = 1e3;
				text = text.replace(/K/gi, "");
			} else if (text.toUpperCase().includes("M")) {
				multiplier = 1e6;
				text = text.replace(/M/gi, "");
			}
			const numStr = text.replace(/[^0-9.]/g, "");
			return numStr ? Number(numStr) * multiplier : 0;
		}
		/**
		* Get color based on data staleness
		* @param {number} lastUpdated - Timestamp when data was last updated
		* @returns {string} Color code for display
		*/
		getStalenessColor(lastUpdated) {
			if (!lastUpdated) return "#999999";
			const age = Date.now() - lastUpdated;
			const minutes = age / 6e4;
			const hours = age / 36e5;
			if (minutes < 15) return "#00AA00";
			if (hours < 1) return "#00FF00";
			if (hours < 4) return "#FFAA00";
			if (hours < 12) return "#FF6600";
			return "#FF0000";
		}
		/**
		* Get tooltip text for staleness
		* @param {number} lastUpdated - Timestamp when data was last updated
		* @returns {string} Tooltip text
		*/
		getStalenessTooltip(lastUpdated) {
			if (!lastUpdated) return "Order book data - Visit market page to refresh";
			const age = Date.now() - lastUpdated;
			return `Order book data from ${(0, src_utils_formatters_js.formatRelativeTime)(age)} ago - Visit market page to refresh`;
		}
		/**
		* Estimate timestamp for a listing ID
		* @param {number} listingId - Listing ID to estimate
		* @returns {number} Estimated timestamp in milliseconds
		*/
		estimateTimestamp(listingId) {
			if (this.knownListings.length === 0) return Date.now() - 36e5;
			if (this.knownListings.length === 1) return this.knownListings[0].timestamp;
			const minId = this.knownListings[0].id;
			const maxId = this.knownListings[this.knownListings.length - 1].id;
			let estimate;
			if (listingId >= minId && listingId <= maxId) estimate = this.linearInterpolation(listingId);
			else estimate = this.linearRegression(listingId);
			const now = Date.now();
			if (estimate > now) estimate = now;
			return estimate;
		}
		/**
		* Linear interpolation for IDs within known range
		* @param {number} listingId - Listing ID
		* @returns {number} Estimated timestamp
		*/
		linearInterpolation(listingId) {
			const exact = this.knownListings.find((entry) => entry.id === listingId);
			if (exact) return exact.timestamp;
			let leftIndex = 0;
			let rightIndex = this.knownListings.length - 1;
			for (let i = 0; i < this.knownListings.length - 1; i++) if (listingId >= this.knownListings[i].id && listingId <= this.knownListings[i + 1].id) {
				leftIndex = i;
				rightIndex = i + 1;
				break;
			}
			const left = this.knownListings[leftIndex];
			const right = this.knownListings[rightIndex];
			const idRange = right.id - left.id;
			const ratio = (listingId - left.id) / idRange;
			return left.timestamp + ratio * (right.timestamp - left.timestamp);
		}
		/**
		* Linear regression for IDs outside known range
		* @param {number} listingId - Listing ID
		* @returns {number} Estimated timestamp
		*/
		linearRegression(listingId) {
			let sumX = 0, sumY = 0;
			for (const entry of this.knownListings) {
				sumX += entry.id;
				sumY += entry.timestamp;
			}
			const n = this.knownListings.length;
			const meanX = sumX / n;
			const meanY = sumY / n;
			let numerator = 0;
			let denominator = 0;
			for (const entry of this.knownListings) {
				numerator += (entry.id - meanX) * (entry.timestamp - meanY);
				denominator += (entry.id - meanX) * (entry.id - meanX);
			}
			const slope = numerator / denominator;
			const minId = this.knownListings[0].id;
			const maxId = this.knownListings[this.knownListings.length - 1].id;
			const minTimestamp = this.knownListings[0].timestamp;
			const maxTimestamp = this.knownListings[this.knownListings.length - 1].timestamp;
			if (listingId > maxId) return slope * (listingId - maxId) + maxTimestamp;
			else return slope * (listingId - minId) + minTimestamp;
		}
		/**
		* Clear all injected displays
		*/
		clearDisplays() {
			document.querySelectorAll(".mwi-estimated-age-set").forEach((container) => {
				container.classList.remove("mwi-estimated-age-set");
			});
			document.querySelectorAll(".mwi-estimated-age-header").forEach((el) => el.remove());
			document.querySelectorAll(".mwi-estimated-age-cell").forEach((el) => el.remove());
		}
		/**
		* Disable the estimated listing age feature
		*/
		disable() {
			if (this.unregisterWebSocket) {
				this.unregisterWebSocket();
				this.unregisterWebSocket = null;
			}
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			if (this.unregisterMyListingsObserver) {
				this.unregisterMyListingsObserver();
				this.unregisterMyListingsObserver = null;
			}
			this.clearDisplays();
			this.isInitialized = false;
		}
	};
	var estimatedListingAge = new EstimatedListingAge();
	//#endregion
	//#region src/features/market/listing-price-display.js
	/**
	* Market Listing Price Display Module
	*
	* Shows pricing information on individual market listings
	* - Top Order Price: Current best market price with competitive color coding
	* - Total Price: Total remaining value of the listing
	* Ported from Ranged Way Idle's showListingInfo feature
	*/
	/**
	* Create a styled table cell for the listings table.
	* @param {string|null} content - Text content for the span
	* @param {string} color - CSS color string for the span
	* @param {Object} [options={}] - Optional overrides
	* @param {string} [options.fontSize] - e.g. '0.9em'
	* @param {string} [options.title] - Tooltip title attribute
	* @returns {HTMLElement} <td> element with a styled <span> inside
	*/
	function createStyledCell(content, color, options = {}) {
		const cell = document.createElement("td");
		cell.classList.add("mwi-listing-price-cell");
		const span = document.createElement("span");
		span.classList.add("mwi-listing-price-value");
		if (content !== null && content !== void 0) span.textContent = content;
		span.style.color = color;
		if (options.fontSize) span.style.fontSize = options.fontSize;
		if (options.title) span.title = options.title;
		cell.appendChild(span);
		return cell;
	}
	var ListingPriceDisplay = class {
		constructor() {
			this.allListings = {};
			this.unregisterWebSocket = null;
			this.unregisterObserver = null;
			this.isInitialized = false;
			this.cleanupRegistry = (0, src_utils_cleanup_registry_js.createCleanupRegistry)();
			this.activeRefreshes = /* @__PURE__ */ new WeakSet();
			this.tbodyObservers = /* @__PURE__ */ new WeakMap();
			this.activeSortColumn = null;
			this.activeSortDirection = null;
			this.sortHeaders = /* @__PURE__ */ new Map();
			this.originalRowOrder = [];
		}
		/**
		* Initialize the listing price display
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_showListingPrices")) return;
			this.isInitialized = true;
			this.loadInitialListings();
			this.setupWebSocketListeners();
			this.setupObserver();
		}
		/**
		* Load initial listings from dataManager (already received via init_character_data)
		*/
		loadInitialListings() {
			const listings = src_core_data_manager_js.default.getMarketListings();
			for (const listing of listings) this.handleListing(listing);
		}
		/**
		* Setup WebSocket listeners for listing updates
		*/
		setupWebSocketListeners() {
			const initHandler = (data) => {
				if (data.myMarketListings) for (const listing of data.myMarketListings) this.handleListing(listing);
			};
			const updateHandler = (data) => {
				if (data.endMarketListings) {
					for (const listing of data.endMarketListings) this.handleListing(listing);
					this.clearDisplays();
					const visibleTable = document.querySelector("[class*=\"MarketplacePanel_myListingsTable\"]");
					if (visibleTable) this.scheduleTableRefresh(visibleTable);
				}
			};
			src_core_data_manager_js.default.on("character_initialized", initHandler);
			src_core_data_manager_js.default.on("market_listings_updated", updateHandler);
			let orderBookHandler = null;
			if (src_core_config_js.default.getSetting("market_showTopOrderAge")) {
				orderBookHandler = (data) => {
					if (data.marketItemOrderBooks) setTimeout(() => {
						document.querySelectorAll("[class*=\"MarketplacePanel_myListingsTable\"]").forEach((table) => {
							table.classList.remove("mwi-listing-prices-set");
							this.updateTable(table);
						});
					}, 10);
				};
				src_core_data_manager_js.default.on("market_item_order_books_updated", orderBookHandler);
			}
			this.unregisterWebSocket = () => {
				src_core_data_manager_js.default.off("character_initialized", initHandler);
				src_core_data_manager_js.default.off("market_listings_updated", updateHandler);
				if (orderBookHandler) src_core_data_manager_js.default.off("market_item_order_books_updated", orderBookHandler);
			};
			this.cleanupRegistry.registerCleanup(() => {
				if (this.unregisterWebSocket) {
					this.unregisterWebSocket();
					this.unregisterWebSocket = null;
				}
			});
		}
		/**
		* Setup DOM observer to watch for My Listings table
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("ListingPriceDisplay", "MarketplacePanel_myListingsTable", (tableNode) => {
				this.scheduleTableRefresh(tableNode);
			}, {
				debounce: true,
				debounceDelay: 150
			});
			this.cleanupRegistry.registerCleanup(() => {
				if (this.unregisterObserver) {
					this.unregisterObserver();
					this.unregisterObserver = null;
				}
			});
			const existingTable = document.querySelector("[class*=\"MarketplacePanel_myListingsTable\"]");
			if (existingTable) this.scheduleTableRefresh(existingTable);
		}
		/**
		* Schedule a refresh to wait for React to populate table rows
		* Uses MutationObserver to detect when rows are added instead of polling
		* @param {HTMLElement} tableNode - The listings table element
		*/
		scheduleTableRefresh(tableNode) {
			if (this.activeRefreshes.has(tableNode)) return;
			const tbody = tableNode.querySelector("tbody");
			if (!tbody) return;
			this.activeRefreshes.add(tableNode);
			const rowCount = tbody.querySelectorAll("tr").length;
			if (rowCount === Object.keys(this.allListings).length && rowCount > 0) {
				this.updateTable(tableNode);
				this.activeRefreshes.delete(tableNode);
				return;
			}
			let observer = this.tbodyObservers.get(tbody);
			if (!observer) {
				observer = new MutationObserver(() => {
					const currentRowCount = tbody.querySelectorAll("tr").length;
					if (currentRowCount === Object.keys(this.allListings).length && currentRowCount > 0) {
						this.updateTable(tableNode);
						this.activeRefreshes.delete(tableNode);
						observer.disconnect();
					}
				});
				this.tbodyObservers.set(tbody, observer);
				this.cleanupRegistry.registerCleanup(() => {
					observer.disconnect();
					this.tbodyObservers.delete(tbody);
				});
			}
			observer.observe(tbody, {
				childList: true,
				subtree: false
			});
			const safetyTimeoutId = setTimeout(() => {
				observer.disconnect();
				this.activeRefreshes.delete(tableNode);
				if (tbody.querySelectorAll("tr").length > 0) this.updateTable(tableNode);
			}, 3e3);
			this.cleanupRegistry.registerTimeout(safetyTimeoutId);
		}
		/**
		* Handle listing data from WebSocket
		* @param {Object} listing - Listing data
		*/
		handleListing(listing) {
			if (listing.status === "/market_listing_status/cancelled" || listing.status === "/market_listing_status/filled" && listing.unclaimedItemCount === 0 && listing.unclaimedCoinCount === 0) {
				delete this.allListings[listing.id];
				return;
			}
			this.allListings[listing.id] = {
				id: listing.id,
				isSell: listing.isSell,
				itemHrid: listing.itemHrid,
				enhancementLevel: listing.enhancementLevel,
				orderQuantity: listing.orderQuantity,
				filledQuantity: listing.filledQuantity,
				price: listing.price,
				createdTimestamp: listing.createdTimestamp,
				unclaimedCoinCount: listing.unclaimedCoinCount || 0,
				unclaimedItemCount: listing.unclaimedItemCount || 0
			};
		}
		/**
		* Update the My Listings table with pricing columns
		* @param {HTMLElement} tableNode - The listings table element
		*/
		updateTable(tableNode) {
			if (tableNode.classList.contains("mwi-listing-prices-set")) return;
			tableNode.querySelectorAll(".mwi-listing-price-header").forEach((el) => el.remove());
			tableNode.querySelectorAll(".mwi-listing-price-cell").forEach((el) => el.remove());
			const tbody = tableNode.querySelector("tbody");
			if (!tbody) return;
			if (tbody.querySelectorAll("tr").length !== Object.keys(this.allListings).length) return;
			const itemsToPrice = Object.values(this.allListings).map((listing) => ({
				itemHrid: listing.itemHrid,
				enhancementLevel: listing.enhancementLevel
			}));
			const priceCache = src_api_marketplace_js.default.getPricesBatch(itemsToPrice);
			const ownListingIds = new Set(Object.values(this.allListings).map((l) => l.id));
			this.addTableHeaders(tableNode);
			this.wireHeaderSorting(tableNode);
			this.addDataToRows(tbody);
			this.addPriceDisplays(tbody, priceCache, ownListingIds);
			let fullyProcessed = true;
			if (src_core_config_js.default.getSetting("market_showTopOrderAge")) for (const listing of Object.values(this.allListings)) {
				const orderBookData = estimatedListingAge.orderBooksCache[listing.itemHrid];
				if (!orderBookData || !orderBookData.orderBooks || orderBookData.orderBooks.length === 0) {
					fullyProcessed = false;
					break;
				}
			}
			if (fullyProcessed) tableNode.classList.add("mwi-listing-prices-set");
		}
		/**
		* Add column headers to table head
		* @param {HTMLElement} tableNode - The listings table
		*/
		addTableHeaders(tableNode) {
			const thead = tableNode.querySelector("thead tr");
			if (!thead) return;
			if (thead.querySelector(".mwi-listing-price-header")) return;
			const topOrderHeader = document.createElement("th");
			topOrderHeader.classList.add("mwi-listing-price-header");
			topOrderHeader.textContent = (0, src_core_i18n_js.t)("Top Order Price");
			let topOrderAgeHeader = null;
			if (src_core_config_js.default.getSetting("market_showTopOrderAge")) {
				topOrderAgeHeader = document.createElement("th");
				topOrderAgeHeader.classList.add("mwi-listing-price-header");
				topOrderAgeHeader.textContent = (0, src_core_i18n_js.t)("Top Order Age");
				topOrderAgeHeader.title = (0, src_core_i18n_js.t)("Estimated age of the top competing order");
			}
			const totalPriceHeader = document.createElement("th");
			totalPriceHeader.classList.add("mwi-listing-price-header");
			totalPriceHeader.textContent = (0, src_core_i18n_js.t)("Total Price");
			let listedHeader = null;
			if (src_core_config_js.default.getSetting("market_showListingAge")) {
				listedHeader = document.createElement("th");
				listedHeader.classList.add("mwi-listing-price-header");
				listedHeader.textContent = (0, src_core_i18n_js.t)("Listed");
			}
			let insertIndex = 4;
			thead.insertBefore(topOrderHeader, thead.children[insertIndex++]);
			if (topOrderAgeHeader) thead.insertBefore(topOrderAgeHeader, thead.children[insertIndex++]);
			thead.insertBefore(totalPriceHeader, thead.children[insertIndex++]);
			if (listedHeader) thead.insertBefore(listedHeader, thead.children[insertIndex++]);
		}
		/**
		* Wire click-to-sort on all sortable table headers
		* @param {HTMLElement} tableNode - The listings table
		*/
		wireHeaderSorting(tableNode) {
			const thead = tableNode.querySelector("thead tr");
			if (!thead) return;
			const SKIP_COLS = /* @__PURE__ */ new Set(["chat link", "cancel"]);
			for (const th of thead.querySelectorAll("th")) {
				const rawText = th.textContent.trim().toLowerCase().replace(/\s*[▲▼#]$/, "").trim();
				if (SKIP_COLS.has(rawText)) continue;
				const colKey = this._textToColKey(rawText);
				if (!colKey) continue;
				this.sortHeaders.set(colKey, th);
				if (th.dataset.mwiSortable) continue;
				th.dataset.mwiSortable = "true";
				th.style.cursor = "pointer";
				th.style.userSelect = "none";
				th.title = `Click to sort by ${rawText}`;
				th.addEventListener("click", () => this._handleHeaderClick(colKey, tableNode));
			}
		}
		/** @returns {string|null} */
		_textToColKey(text) {
			return {
				status: "status",
				type: "type",
				progress: "progress",
				price: "price",
				"top order price": "topOrderPrice",
				"top order age": "topOrderAge",
				"total price": "totalPrice",
				listed: "listed",
				collect: "collect"
			}[text] ?? null;
		}
		/** @returns {string} */
		_colKeyToBaseText(colKey) {
			return {
				status: "Status",
				type: "Type",
				progress: "Progress",
				price: "Price",
				topOrderPrice: "Top Order Price",
				topOrderAge: "Top Order Age",
				totalPrice: "Total Price",
				listed: "Listed",
				collect: "Collect"
			}[colKey] ?? colKey;
		}
		/**
		* Handle a sortable header click — cycle direction or switch column
		* @param {string} colKey
		* @param {HTMLElement} tableNode
		*/
		_handleHeaderClick(colKey, tableNode) {
			const tbody = tableNode.querySelector("tbody");
			if (!tbody) return;
			const rows = Array.from(tbody.querySelectorAll("tr"));
			if (rows.length === 0) return;
			if (this.originalRowOrder.length === 0) this.originalRowOrder = rows.slice();
			if (this.activeSortColumn === colKey) this.activeSortDirection = this._nextDirection(colKey, this.activeSortDirection);
			else {
				if (this.activeSortColumn) this._updateHeaderIndicator(this.activeSortColumn, null);
				this.activeSortColumn = colKey;
				this.activeSortDirection = "asc";
			}
			this._updateHeaderIndicator(colKey, this.activeSortDirection);
			if (this.activeSortDirection === null) {
				this.activeSortColumn = null;
				for (const row of this.originalRowOrder) tbody.appendChild(row);
			} else this._sortTable(tableNode, colKey, this.activeSortDirection);
		}
		/** @returns {string|null} */
		_nextDirection(colKey, current) {
			if (current === "asc") return "desc";
			if (current === "desc") return colKey === "progress" ? "sortIndex" : null;
			if (current === "sortIndex") return null;
			return "asc";
		}
		/**
		* Update the sort indicator on a header element
		* @param {string} colKey
		* @param {string|null} direction
		*/
		_updateHeaderIndicator(colKey, direction) {
			const th = this.sortHeaders.get(colKey);
			if (!th) return;
			const base = this._colKeyToBaseText(colKey);
			if (!direction) th.textContent = base;
			else if (direction === "asc") th.textContent = `${base} ▲`;
			else if (direction === "desc") th.textContent = `${base} ▼`;
			else if (direction === "sortIndex") th.textContent = `${base} #`;
		}
		/**
		* Sort table rows by column
		* @param {HTMLElement} tableNode
		* @param {string} colKey
		* @param {string} direction - 'asc' | 'desc' | 'sortIndex'
		*/
		_sortTable(tableNode, colKey, direction) {
			const tbody = tableNode.querySelector("tbody");
			if (!tbody) return;
			const sorted = Array.from(tbody.querySelectorAll("tr")).slice().sort((a, b) => {
				if (direction === "sortIndex") return this.getItemSortIndex(a) - this.getItemSortIndex(b);
				const valA = this._getSortValue(a, colKey);
				const valB = this._getSortValue(b, colKey);
				if (typeof valA === "string" && typeof valB === "string") {
					const cmp = valA.localeCompare(valB);
					return direction === "desc" ? -cmp : cmp;
				}
				if (valA === Infinity && valB !== Infinity) return 1;
				if (valB === Infinity && valA !== Infinity) return -1;
				const cmp = valA - valB;
				return direction === "desc" ? -cmp : cmp;
			});
			for (const row of sorted) tbody.appendChild(row);
		}
		/**
		* Get the numeric or string sort value for a row's column
		* @param {HTMLElement} row
		* @param {string} colKey
		* @returns {string|number}
		*/
		_getSortValue(row, colKey) {
			switch (colKey) {
				case "status": return row.children[0]?.textContent.trim().toLowerCase() ?? "";
				case "type": return row.dataset.isSell === "true" ? 1 : row.dataset.isSell === "false" ? 0 : Infinity;
				case "progress": return `${this.getItemCategory(row)}|${this.getItemNameForRow(row)}`;
				case "price": {
					const p = Number(row.dataset.price);
					return isNaN(p) ? Infinity : p;
				}
				case "topOrderPrice": {
					if (!row.dataset.mwiTopOrderPrice) return Infinity;
					const v = Number(row.dataset.mwiTopOrderPrice);
					return isNaN(v) || v < 0 ? Infinity : v;
				}
				case "topOrderAge": {
					if (!row.dataset.mwiTopOrderAgeMs) return Infinity;
					const v = Number(row.dataset.mwiTopOrderAgeMs);
					return isNaN(v) || v < 0 ? Infinity : v;
				}
				case "totalPrice": {
					if (!row.dataset.mwiTotalPrice) return Infinity;
					const v = Number(row.dataset.mwiTotalPrice);
					return isNaN(v) ? Infinity : v;
				}
				case "listed": {
					if (!row.dataset.createdTimestamp) return Infinity;
					const t = new Date(row.dataset.createdTimestamp).getTime();
					return isNaN(t) ? Infinity : t;
				}
				case "collect": return (Number(row.dataset.unclaimedCoinCount) || 0) + (Number(row.dataset.unclaimedItemCount) || 0) * (Number(row.dataset.price) || 0);
				default: return "";
			}
		}
		/**
		* Add listing data to row datasets for matching
		* @param {HTMLElement} tbody - Table body element
		*/
		addDataToRows(tbody) {
			const listings = Object.values(this.allListings);
			const used = /* @__PURE__ */ new Set();
			for (const row of tbody.querySelectorAll("tr")) {
				const rowInfo = this.extractRowInfo(row);
				const matchedListing = listings.find((listing) => {
					if (used.has(listing.id)) return false;
					const itemMatch = listing.itemHrid === rowInfo.itemHrid;
					const enhancementMatch = listing.enhancementLevel === rowInfo.enhancementLevel;
					const typeMatch = listing.isSell === rowInfo.isSell;
					const priceMatch = !rowInfo.price || Math.abs(listing.price - rowInfo.price) < .01;
					if (!itemMatch || !enhancementMatch || !typeMatch || !priceMatch) return false;
					if (rowInfo.filledQuantity !== null && rowInfo.orderQuantity !== null) {
						const filledMatch = rowInfo.filledSuffixMultiplier > 1 ? Math.floor(listing.filledQuantity / rowInfo.filledSuffixMultiplier) === Math.floor(rowInfo.filledQuantity / rowInfo.filledSuffixMultiplier) : listing.filledQuantity === rowInfo.filledQuantity;
						const orderMatch = rowInfo.orderSuffixMultiplier > 1 ? Math.floor(listing.orderQuantity / rowInfo.orderSuffixMultiplier) === Math.floor(rowInfo.orderQuantity / rowInfo.orderSuffixMultiplier) : listing.orderQuantity === rowInfo.orderQuantity;
						return filledMatch && orderMatch;
					}
					return true;
				});
				if (matchedListing) {
					used.add(matchedListing.id);
					row.dataset.listingId = matchedListing.id;
					row.dataset.itemHrid = matchedListing.itemHrid;
					row.dataset.enhancementLevel = matchedListing.enhancementLevel;
					row.dataset.isSell = matchedListing.isSell;
					row.dataset.price = matchedListing.price;
					row.dataset.orderQuantity = matchedListing.orderQuantity;
					row.dataset.filledQuantity = matchedListing.filledQuantity;
					row.dataset.createdTimestamp = matchedListing.createdTimestamp;
					row.dataset.unclaimedCoinCount = matchedListing.unclaimedCoinCount;
					row.dataset.unclaimedItemCount = matchedListing.unclaimedItemCount;
				}
			}
		}
		/**
		* Extract listing info from table row for matching
		* @param {HTMLElement} row - Table row element
		* @returns {Object} Extracted row info
		*/
		extractRowInfo(row) {
			let itemHrid = null;
			const useElements = row.querySelectorAll("use");
			for (const use of useElements) {
				const href = use.href && use.href.baseVal ? use.href.baseVal : "";
				if (href.includes("#")) {
					const idPart = href.split("#")[1];
					if (idPart && !idPart.toLowerCase().includes("coin")) {
						itemHrid = `/items/${idPart}`;
						break;
					}
				}
			}
			let enhancementLevel = 0;
			const enhNode = row.querySelector("[class*=\"enhancementLevel\"]");
			if (enhNode && enhNode.textContent) {
				const match = enhNode.textContent.match(/\+\s*(\d+)/);
				if (match) enhancementLevel = Number(match[1]);
			}
			let isSell = null;
			const typeCell = row.children[1];
			if (typeCell) {
				const text = (typeCell.textContent || "").toLowerCase();
				if (text.includes("sell")) isSell = true;
				else if (text.includes("buy")) isSell = false;
			}
			let filledQuantity = null;
			let orderQuantity = null;
			let filledSuffixMultiplier = 1;
			let orderSuffixMultiplier = 1;
			const quantityCell = row.children[2];
			if (quantityCell) {
				let text = quantityCell.textContent.trim();
				text = text.replace(/^\+\d+\s*/, "");
				const match = text.match(/([0-9,.]+)\s*([KMB]?)\s*\/\s*([0-9,.]+)\s*([KMB]?)/i);
				if (match) {
					const getSuffixMultiplier = (s) => {
						if (!s) return 1;
						const c = s.toUpperCase();
						return c === "K" ? 1e3 : c === "M" ? 1e6 : c === "B" ? 1e9 : 1;
					};
					filledSuffixMultiplier = getSuffixMultiplier(match[2]);
					orderSuffixMultiplier = getSuffixMultiplier(match[4]);
					filledQuantity = Math.round(parseFloat(match[1].replace(/,/g, "")) * filledSuffixMultiplier);
					orderQuantity = Math.round(parseFloat(match[3].replace(/,/g, "")) * orderSuffixMultiplier);
				}
			}
			let price = NaN;
			const priceNode = row.querySelector("[class*=\"price\"]") || row.children[3];
			if (priceNode) {
				let text = priceNode.firstChild && priceNode.firstChild.textContent ? priceNode.firstChild.textContent : priceNode.textContent;
				text = String(text).trim();
				let multiplier = 1;
				if (text.toUpperCase().includes("B")) {
					multiplier = 1e9;
					text = text.replace(/B/gi, "");
				} else if (text.toUpperCase().includes("M")) {
					multiplier = 1e6;
					text = text.replace(/M/gi, "");
				} else if (text.toUpperCase().includes("K")) {
					multiplier = 1e3;
					text = text.replace(/K/gi, "");
				}
				const lastDotIndex = text.lastIndexOf(".");
				const lastCommaIndex = text.lastIndexOf(",");
				const lastSeparatorIndex = Math.max(lastDotIndex, lastCommaIndex);
				let numStr;
				if (lastSeparatorIndex === -1) numStr = text.replace(/[^0-9]/g, "");
				else {
					const beforeSeparator = text.substring(0, lastSeparatorIndex);
					const afterSeparator = text.substring(lastSeparatorIndex + 1);
					const digitsAfter = afterSeparator.replace(/[^0-9]/g, "").length;
					if (digitsAfter <= 2 && digitsAfter > 0) numStr = beforeSeparator.replace(/[^0-9]/g, "") + "." + afterSeparator.replace(/[^0-9]/g, "");
					else numStr = text.replace(/[^0-9]/g, "");
				}
				price = numStr ? Number(numStr) * multiplier : NaN;
			}
			return {
				itemHrid,
				enhancementLevel,
				isSell,
				price,
				filledQuantity,
				orderQuantity,
				filledSuffixMultiplier,
				orderSuffixMultiplier
			};
		}
		/**
		* Add price display cells to each row
		* @param {HTMLElement} tbody - Table body element
		* @param {Map} priceCache - Pre-fetched price cache
		* @param {Set<number>} ownListingIds - User's own listing IDs (excluded from "top competing order")
		*/
		addPriceDisplays(tbody, priceCache, ownListingIds = /* @__PURE__ */ new Set()) {
			for (const row of tbody.querySelectorAll("tr")) {
				if (row.querySelector(".mwi-listing-price-cell")) continue;
				const dataset = row.dataset;
				const hasMatchedListing = !!dataset.listingId;
				const insertIndex = 4;
				const insertBeforeCell = row.children[insertIndex] || null;
				if (hasMatchedListing) {
					const itemHrid = dataset.itemHrid;
					const enhancementLevel = Number(dataset.enhancementLevel);
					const isSell = dataset.isSell === "true";
					const price = Number(dataset.price);
					const orderQuantity = Number(dataset.orderQuantity);
					const filledQuantity = Number(dataset.filledQuantity);
					const unclaimedCoinCount = Number(dataset.unclaimedCoinCount) || 0;
					const unclaimedItemCount = Number(dataset.unclaimedItemCount) || 0;
					const topOrderCell = this.createTopOrderPriceCell(itemHrid, enhancementLevel, isSell, price, priceCache, ownListingIds);
					row.insertBefore(topOrderCell, insertBeforeCell);
					if (src_core_config_js.default.getSetting("market_showTopOrderAge")) {
						const topOrderAgeCell = this.createTopOrderAgeCell(itemHrid, enhancementLevel, isSell, ownListingIds);
						row.insertBefore(topOrderAgeCell, row.children[5]);
					}
					const currentInsertIndex = insertIndex + (src_core_config_js.default.getSetting("market_showTopOrderAge") ? 2 : 1);
					const totalPriceCell = this.createTotalPriceCell(itemHrid, isSell, price, orderQuantity, filledQuantity, unclaimedCoinCount, unclaimedItemCount);
					row.insertBefore(totalPriceCell, row.children[currentInsertIndex]);
					if (src_core_config_js.default.getSetting("market_showListingAge") && dataset.createdTimestamp) {
						const listedInsertIndex = currentInsertIndex + 1;
						const listedAgeCell = this.createListedAgeCell(dataset.createdTimestamp);
						row.insertBefore(listedAgeCell, row.children[listedInsertIndex]);
					}
					row.dataset.mwiTotalPrice = String(this._computeTotalPrice(itemHrid, isSell, price, orderQuantity, filledQuantity, unclaimedCoinCount, unclaimedItemCount));
					const topOrderPriceVal = this._getTopOrderPrice(itemHrid, enhancementLevel, isSell, priceCache, ownListingIds);
					row.dataset.mwiTopOrderPrice = topOrderPriceVal !== null && topOrderPriceVal >= 0 ? String(topOrderPriceVal) : "";
					if (src_core_config_js.default.getSetting("market_showTopOrderAge")) {
						const ageMs = this._getTopOrderAgeMs(itemHrid, enhancementLevel, isSell, ownListingIds);
						row.dataset.mwiTopOrderAgeMs = ageMs !== null ? String(ageMs) : "";
					}
				} else {
					const topOrderCell = this.createPlaceholderCell();
					row.insertBefore(topOrderCell, insertBeforeCell);
					if (src_core_config_js.default.getSetting("market_showTopOrderAge")) {
						const topOrderAgeCell = this.createPlaceholderCell();
						row.insertBefore(topOrderAgeCell, row.children[5]);
					}
					const currentInsertIndex = insertIndex + (src_core_config_js.default.getSetting("market_showTopOrderAge") ? 2 : 1);
					const totalPriceCell = this.createPlaceholderCell();
					row.insertBefore(totalPriceCell, row.children[currentInsertIndex]);
					if (src_core_config_js.default.getSetting("market_showListingAge")) {
						const listedInsertIndex = currentInsertIndex + 1;
						const listedAgeCell = this.createPlaceholderCell();
						row.insertBefore(listedAgeCell, row.children[listedInsertIndex]);
					}
				}
			}
		}
		/**
		* Compute the total price value for a listing (shared by cell display and sort)
		*/
		_computeTotalPrice(itemHrid, isSell, price, orderQuantity, filledQuantity, unclaimedCoinCount, unclaimedItemCount) {
			if (filledQuantity === orderQuantity) return isSell ? unclaimedCoinCount : unclaimedItemCount * price;
			const taxRate = isSell ? itemHrid === "/items/bag_of_10_cowbells" ? .18 : .02 : 0;
			return (orderQuantity - filledQuantity) * Math.floor((0, src_utils_profit_helpers_js.calculatePriceAfterTax)(price, taxRate));
		}
		/**
		* Get the top competing order price for a listing (shared by cell display and sort)
		* @returns {number|null} Price or null if unavailable
		*/
		_getTopOrderPrice(itemHrid, enhancementLevel, isSell, priceCache, ownListingIds) {
			const cacheEntry = estimatedListingAge.orderBooksCache[itemHrid];
			if (cacheEntry) {
				const orderBookData = cacheEntry.data || cacheEntry;
				if (orderBookData?.orderBooks) {
					const orderBook = orderBookData.orderBooks[enhancementLevel] ?? null;
					if (orderBook) {
						const topCompeting = (isSell ? orderBook.asks : orderBook.bids)?.find((o) => !ownListingIds.has(o.listingId));
						if (topCompeting) return topCompeting.price;
					}
				}
			}
			const key = `${itemHrid}:${enhancementLevel}`;
			const marketPrice = priceCache.get(key);
			return marketPrice ? isSell ? marketPrice.ask : marketPrice.bid : null;
		}
		/**
		* Get the top competing order age in ms for a listing (shared by cell display and sort)
		* Returns -1 if no competing orders exist, null if data unavailable
		* @returns {number|null}
		*/
		_getTopOrderAgeMs(itemHrid, enhancementLevel, isSell, ownListingIds) {
			const cacheEntry = estimatedListingAge.orderBooksCache[itemHrid];
			if (!cacheEntry) return null;
			const orderBookData = cacheEntry.data || cacheEntry;
			if (!orderBookData || !orderBookData.orderBooks || orderBookData.orderBooks.length === 0) return null;
			const orderBook = orderBookData.orderBooks[enhancementLevel] ?? null;
			if (!orderBook) return null;
			const topOrders = isSell ? orderBook.asks : orderBook.bids;
			if (!topOrders || topOrders.length === 0) return -1;
			const topOrder = topOrders.find((o) => !ownListingIds.has(o.listingId));
			if (!topOrder) return -1;
			return Date.now() - estimatedListingAge.estimateTimestamp(topOrder.listingId);
		}
		/**
		* Create Top Order Price cell
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level
		* @param {boolean} isSell - Is sell order
		* @param {number} price - Listing price
		* @param {Map} priceCache - Pre-fetched price cache (fallback)
		* @param {Set<number>} ownListingIds - User's own listing IDs to exclude
		* @returns {HTMLElement} Table cell element
		*/
		createTopOrderPriceCell(itemHrid, enhancementLevel, isSell, price, priceCache, ownListingIds = /* @__PURE__ */ new Set()) {
			const topOrderPrice = this._getTopOrderPrice(itemHrid, enhancementLevel, isSell, priceCache, ownListingIds);
			const lastUpdated = estimatedListingAge.orderBooksCache[itemHrid]?.lastUpdated ?? null;
			if (topOrderPrice === null || topOrderPrice === -1) return createStyledCell((0, src_utils_formatters_js.coinFormatter)(null), "#004FFF");
			const color = isSell ? topOrderPrice < price ? "#FF0000" : "#00FF00" : topOrderPrice > price ? "#FF0000" : "#00FF00";
			const title = lastUpdated ? estimatedListingAge.getStalenessTooltip(lastUpdated) : void 0;
			return createStyledCell((0, src_utils_formatters_js.formatKMB)(topOrderPrice, 1), color, { title });
		}
		/**
		* Create Top Order Age cell
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level
		* @param {boolean} isSell - Is sell order
		* @param {Set<number>} ownListingIds - User's own listing IDs to exclude
		* @returns {HTMLElement} Table cell element
		*/
		createTopOrderAgeCell(itemHrid, enhancementLevel, isSell, ownListingIds = /* @__PURE__ */ new Set()) {
			const cacheEntry = estimatedListingAge.orderBooksCache[itemHrid];
			if (!cacheEntry) return createStyledCell((0, src_core_i18n_js.t)("N/A"), src_core_config_js.default.COLOR_TEXT_SECONDARY, { fontSize: "0.9em" });
			const lastUpdated = cacheEntry.lastUpdated;
			const ageMs = this._getTopOrderAgeMs(itemHrid, enhancementLevel, isSell, ownListingIds);
			if (ageMs === null) return createStyledCell((0, src_core_i18n_js.t)("N/A"), src_core_config_js.default.COLOR_TEXT_SECONDARY, { fontSize: "0.9em" });
			if (ageMs === -1) return createStyledCell((0, src_core_i18n_js.t)("None"), "#00FF00", { fontSize: "0.9em" });
			return createStyledCell(`~${(0, src_utils_formatters_js.formatRelativeTime)(ageMs)}`, estimatedListingAge.getStalenessColor(lastUpdated), {
				fontSize: "0.9em",
				title: lastUpdated ? estimatedListingAge.getStalenessTooltip(lastUpdated) : void 0
			});
		}
		/**
		* Create Total Price cell
		* @param {string} itemHrid - Item HRID
		* @param {boolean} isSell - Is sell order
		* @param {number} price - Unit price
		* @param {number} orderQuantity - Total quantity ordered
		* @param {number} filledQuantity - Quantity already filled
		* @param {number} unclaimedCoinCount - Unclaimed coins (for filled sell orders)
		* @param {number} unclaimedItemCount - Unclaimed items (for filled buy orders)
		* @returns {HTMLElement} Table cell element
		*/
		createTotalPriceCell(itemHrid, isSell, price, orderQuantity, filledQuantity, unclaimedCoinCount, unclaimedItemCount) {
			const totalPrice = this._computeTotalPrice(itemHrid, isSell, price, orderQuantity, filledQuantity, unclaimedCoinCount, unclaimedItemCount);
			return createStyledCell((0, src_utils_formatters_js.formatKMB)(totalPrice, 1), this.getAmountColor(totalPrice));
		}
		/**
		* Create Listed Age cell
		* @param {string} createdTimestamp - ISO timestamp when listing was created
		* @returns {HTMLElement} Table cell element
		*/
		createListedAgeCell(createdTimestamp) {
			const createdDate = new Date(createdTimestamp);
			const ageMs = Date.now() - createdDate.getTime();
			return createStyledCell((0, src_utils_formatters_js.formatRelativeTime)(ageMs), src_core_config_js.default.COLOR_TEXT_SECONDARY);
		}
		/**
		* Create placeholder cell for unmatched rows
		* @returns {HTMLElement} Empty table cell element
		*/
		createPlaceholderCell() {
			return createStyledCell((0, src_core_i18n_js.t)("N/A"), src_core_config_js.default.COLOR_TEXT_SECONDARY, { fontSize: "0.9em" });
		}
		/**
		* Get color for amount based on magnitude
		* @param {number} amount - Amount value
		* @returns {string} Color code
		*/
		getAmountColor(amount) {
			if (amount >= 1e6) return src_core_config_js.default.COLOR_LISTING_PRICE_1M;
			if (amount >= 1e5) return src_core_config_js.default.COLOR_LISTING_PRICE_100K;
			if (amount >= 1e4) return src_core_config_js.default.COLOR_LISTING_PRICE_10K;
			return src_core_config_js.default.COLOR_LISTING_PRICE_LOW;
		}
		/**
		* Get item category for a row (for sorting)
		* @param {HTMLElement} row - Table row element
		* @returns {string} Category HRID
		*/
		getItemCategory(row) {
			const itemHrid = row.dataset.itemHrid;
			if (itemHrid) {
				const details = src_core_data_manager_js.default.getItemDetails(itemHrid);
				if (details?.categoryHrid) return details.categoryHrid;
			}
			return "";
		}
		/**
		* Get item sortIndex for a row
		* @param {HTMLElement} row - Table row element
		* @returns {number} Sort index (defaults to Infinity for unknowns)
		*/
		getItemSortIndex(row) {
			const itemHrid = row.dataset.itemHrid;
			if (itemHrid) {
				const details = src_core_data_manager_js.default.getItemDetails(itemHrid);
				if (details?.sortIndex !== void 0) return details.sortIndex;
			}
			return Infinity;
		}
		/**
		* Get display name for a row's item (for sorting)
		* @param {HTMLElement} row - Table row element
		* @returns {string} Item name (lowercase for consistent sorting)
		*/
		getItemNameForRow(row) {
			const itemHrid = row.dataset.itemHrid;
			if (itemHrid) {
				const details = src_core_data_manager_js.default.getItemDetails(itemHrid);
				if (details?.name) return details.name.toLowerCase();
			}
			const use = row.querySelector("use");
			if (use) return ((use.href?.baseVal || "").split("#")[1] || "").replace(/_/g, " ");
			return "";
		}
		/**
		* Clear all injected displays
		*/
		clearDisplays() {
			document.querySelectorAll(".mwi-listing-prices-set").forEach((table) => {
				table.classList.remove("mwi-listing-prices-set");
			});
			document.querySelectorAll(".mwi-listing-price-header").forEach((el) => el.remove());
			document.querySelectorAll(".mwi-listing-price-cell").forEach((el) => el.remove());
			for (const colKey of this.sortHeaders.keys()) this._updateHeaderIndicator(colKey, null);
			this.sortHeaders = /* @__PURE__ */ new Map();
			this.activeSortColumn = null;
			this.activeSortDirection = null;
			this.originalRowOrder = [];
		}
		/**
		* Disable the listing price display
		*/
		disable() {
			this.tbodyObservers = /* @__PURE__ */ new WeakMap();
			this.cleanupRegistry.cleanupAll();
			this.clearDisplays();
			this.allListings = {};
			this.activeRefreshes = /* @__PURE__ */ new WeakSet();
			this.isInitialized = false;
		}
	};
	var listingPriceDisplay = new ListingPriceDisplay();
	//#endregion
	//#region src/features/market/queue-length-estimator.js
	/**
	* Queue Length Estimator Module
	*
	* Displays total quantity available at the best price in order books
	* - Shows below Buy/Sell buttons on the market order book page
	* - Estimates total queue depth when all 20 visible listings have the same price
	* - Uses listing timestamps to extrapolate queue length
	* Ported from Ranged Way Idle's estimateQueueLength feature
	*/
	var QueueLengthEstimator = class {
		constructor() {
			this.unregisterWebSocket = null;
			this.unregisterObserver = null;
			this.isInitialized = false;
			this.cleanupRegistry = (0, src_utils_cleanup_registry_js.createCleanupRegistry)();
			this.orderBooksCache = {};
		}
		/**
		* Initialize the queue length estimator
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_showQueueLength")) return;
			this.isInitialized = true;
			this.setupWebSocketListeners();
			this.setupObserver();
		}
		/**
		* Setup WebSocket listeners for order book updates
		*/
		setupWebSocketListeners() {
			const orderBookHandler = (data) => {
				if (data.marketItemOrderBooks) {
					const itemHrid = data.marketItemOrderBooks.itemHrid;
					if (itemHrid) this.orderBooksCache[itemHrid] = {
						data: data.marketItemOrderBooks,
						lastUpdated: Date.now()
					};
					document.querySelectorAll(".mwi-queue-length-set").forEach((container) => {
						container.classList.remove("mwi-queue-length-set");
					});
					document.querySelectorAll("[class*=\"MarketplacePanel_orderBooksContainer\"]").forEach((container) => {
						this.processOrderBook(container);
					});
				}
			};
			src_core_data_manager_js.default.on("market_item_order_books_updated", orderBookHandler);
			this.unregisterWebSocket = () => {
				src_core_data_manager_js.default.off("market_item_order_books_updated", orderBookHandler);
			};
			this.cleanupRegistry.registerCleanup(() => {
				if (this.unregisterWebSocket) {
					this.unregisterWebSocket();
					this.unregisterWebSocket = null;
				}
			});
		}
		/**
		* Setup DOM observer to watch for order book container
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("QueueLengthEstimator", "MarketplacePanel_orderBooksContainer", (container) => {
				this.processOrderBook(container);
			}, {
				debounce: true,
				debounceDelay: 150
			});
			this.cleanupRegistry.registerCleanup(() => {
				if (this.unregisterObserver) {
					this.unregisterObserver();
					this.unregisterObserver = null;
				}
			});
		}
		/**
		* Process the order book container and inject queue length displays
		* @param {HTMLElement} _container - Order book container (unused - we query directly)
		*/
		processOrderBook(_container) {
			const buttonContainer = document.querySelector(".MarketplacePanel_newListingButtonsContainer__1MhKJ");
			if (!buttonContainer) return;
			if (buttonContainer.classList.contains("mwi-queue-length-set")) return;
			const currentItemHrid = this.getCurrentItemHrid();
			if (!currentItemHrid) return;
			const orderBooksCache = this.orderBooksCache;
			if (!orderBooksCache[currentItemHrid]) return;
			const cacheEntry = orderBooksCache[currentItemHrid];
			const orderBookData = cacheEntry.data || cacheEntry;
			const enhancementLevel = this.getCurrentEnhancementLevel();
			const orderBookAtLevel = orderBookData.orderBooks?.[enhancementLevel];
			if (!orderBookAtLevel) return;
			buttonContainer.classList.add("mwi-queue-length-set");
			this.displayQueueLength(buttonContainer, orderBookAtLevel.asks, true);
			this.displayQueueLength(buttonContainer, orderBookAtLevel.bids, false);
		}
		/**
		* Calculate and display queue length for asks or bids
		* @param {HTMLElement} buttonContainer - Button container element
		* @param {Array} listings - Array of listings (asks or bids)
		* @param {boolean} isAsk - True for asks (sell side), false for bids (buy side)
		*/
		displayQueueLength(buttonContainer, listings, isAsk) {
			if (!listings || listings.length === 0) return;
			const topPrice = listings[0].price;
			let visibleCount = 0;
			for (const listing of listings) if (listing.price === topPrice) visibleCount += listing.quantity;
			let queueLength = visibleCount;
			let isEstimated = false;
			if (listings.length === 20 && listings[19].price === topPrice) {
				const firstTimestamp = new Date(listings[0].createdTimestamp).getTime();
				const lastTimestamp = new Date(listings[19].createdTimestamp).getTime();
				const now = Date.now();
				const timeSpan = lastTimestamp - firstTimestamp;
				const timeSinceNow = now - lastTimestamp;
				if (timeSpan > 0) {
					const queueMultiplier = 1 + 19 / 20 * (timeSinceNow / timeSpan);
					queueLength = visibleCount * queueMultiplier;
					isEstimated = true;
				}
			}
			const existingElement = buttonContainer.querySelector(`.mwi-queue-length-${isAsk ? "ask" : "bid"}`);
			if (existingElement) existingElement.remove();
			const displayElement = document.createElement("div");
			displayElement.classList.add("mwi-queue-length", `mwi-queue-length-${isAsk ? "ask" : "bid"}`);
			displayElement.style.fontSize = "1.2rem";
			displayElement.style.textAlign = "center";
			displayElement.textContent = (0, src_utils_formatters_js.formatKMB)(queueLength, 1);
			const colorSetting = isEstimated ? "color_queueLength_estimated" : "color_queueLength_known";
			const color = src_core_config_js.default.getSettingValue(colorSetting, isEstimated ? "#60a5fa" : "#ffffff");
			displayElement.style.color = color;
			if (isEstimated) displayElement.title = (0, src_core_i18n_js.t)("Estimated total queue depth (extrapolated from {0} visible orders)", listings.length);
			else displayElement.title = (0, src_core_i18n_js.t)("Total quantity at best {0} price", isAsk ? "sell" : "buy");
			if (isAsk) buttonContainer.insertBefore(displayElement, buttonContainer.children[1]);
			else buttonContainer.insertBefore(displayElement, buttonContainer.lastChild);
		}
		/**
		* Get current item HRID being viewed in order book
		* @returns {string|null} Item HRID or null
		*/
		getCurrentItemHrid() {
			const currentItemElement = document.querySelector(".MarketplacePanel_currentItem__3ercC");
			if (currentItemElement) {
				const useElement = currentItemElement.querySelector("use");
				if (useElement && useElement.href && useElement.href.baseVal) return "/items/" + useElement.href.baseVal.split("#")[1];
			}
			return null;
		}
		/**
		* Get current enhancement level being viewed in order book
		* @returns {number} Enhancement level (0 for non-equipment)
		*/
		getCurrentEnhancementLevel() {
			const currentItemElement = document.querySelector(".MarketplacePanel_currentItem__3ercC");
			if (currentItemElement) {
				const enhancementElement = currentItemElement.querySelector("[class*=\"Item_enhancementLevel\"]");
				if (enhancementElement) {
					const match = enhancementElement.textContent.match(/\+(\d+)/);
					if (match) return parseInt(match[1], 10);
				}
			}
			return 0;
		}
		/**
		* Clear all injected displays
		*/
		clearDisplays() {
			document.querySelectorAll(".mwi-queue-length-set").forEach((container) => {
				container.classList.remove("mwi-queue-length-set");
			});
			document.querySelectorAll(".mwi-queue-length").forEach((el) => el.remove());
		}
		/**
		* Disable the queue length estimator
		*/
		disable() {
			this.clearDisplays();
			this.cleanupRegistry.cleanupAll();
			this.isInitialized = false;
		}
		/**
		* Cleanup when feature is disabled or character switches
		*/
		cleanup() {
			this.disable();
		}
	};
	var queueLengthEstimator = new QueueLengthEstimator();
	//#endregion
	//#region src/features/market/market-order-totals.js
	/**
	* Market Order Totals Module
	*
	* Displays market listing totals in the header area:
	* - Buy Orders (BO): Coins locked in buy orders
	* - Sell Orders (SO): Expected proceeds from sell orders
	* - Unclaimed (💰): Coins waiting to be collected
	*/
	var MarketOrderTotals = class {
		constructor() {
			this.unregisterWebSocket = null;
			this.unregisterObserver = null;
			this.isInitialized = false;
			this.displayElement = null;
			this.marketplaceClickHandler = (event) => {
				event.preventDefault();
				this.openMarketplace();
			};
		}
		/**
		* Initialize the market order totals feature
		*/
		async initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_showOrderTotals")) return;
			this.isInitialized = true;
			this.setupDataListeners();
			this.setupObserver();
		}
		/**
		* Setup WebSocket listeners to detect listing changes
		*/
		setupDataListeners() {
			const updateHandler = () => {
				this.updateDisplay();
			};
			src_core_data_manager_js.default.on("market_listings_updated", updateHandler);
			src_core_data_manager_js.default.on("character_initialized", updateHandler);
			this.unregisterWebSocket = () => {
				src_core_data_manager_js.default.off("market_listings_updated", updateHandler);
				src_core_data_manager_js.default.off("character_initialized", updateHandler);
			};
		}
		/**
		* Setup DOM observer for header area
		*/
		setupObserver() {
			const existingElem = document.querySelector("[class*=\"Header_totalLevel\"]");
			if (existingElem) this.injectDisplay(existingElem);
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("MarketOrderTotals", "Header_totalLevel", (totalLevelElem) => {
				this.injectDisplay(totalLevelElem);
			});
		}
		/**
		* Calculate market order totals from all listings
		* @returns {Object} Totals object with buyOrders, sellOrders, unclaimed
		*/
		calculateTotals() {
			const listings = src_core_data_manager_js.default.getMarketListings();
			let buyOrders = 0;
			let sellOrders = 0;
			let unclaimed = 0;
			for (const listing of listings) {
				if (!listing) continue;
				unclaimed += listing.unclaimedCoinCount || 0;
				if (listing.status === "/market_listing_status/cancelled" || listing.status === "/market_listing_status/filled" && (listing.unclaimedItemCount || 0) === 0 && (listing.unclaimedCoinCount || 0) === 0) continue;
				if (listing.isSell) {
					if (listing.status === "/market_listing_status/filled") continue;
					const tax = listing.itemHrid === "/items/bag_of_10_cowbells" ? .82 : .98;
					const remainingQuantity = Math.max(0, listing.orderQuantity - listing.filledQuantity);
					if (remainingQuantity > 0) sellOrders += remainingQuantity * Math.floor(listing.price * tax);
				} else buyOrders += listing.coinsAvailable || 0;
			}
			return {
				buyOrders,
				sellOrders,
				unclaimed
			};
		}
		/**
		* Inject display element into header
		* @param {HTMLElement} totalLevelElem - Total level element
		*/
		injectDisplay(totalLevelElem) {
			if (this.displayElement && document.body.contains(this.displayElement)) return;
			this.displayElement = document.createElement("div");
			this.displayElement.classList.add("mwi-market-order-totals");
			this.displayElement.style.cssText = `
            display: flex;
            gap: 12px;
            font-size: 0.85em;
            color: #aaa;
            margin-top: 4px;
            padding: 2px 0;
        `;
			const networthHeader = document.querySelector(".mwi-networth-header");
			if (networthHeader) networthHeader.insertAdjacentElement("afterend", this.displayElement);
			else totalLevelElem.insertAdjacentElement("afterend", this.displayElement);
			this.updateDisplay();
		}
		/**
		* Update the display with current totals
		*/
		updateDisplay() {
			if (!this.displayElement || !document.body.contains(this.displayElement)) {
				const headerElement = document.querySelector("[class*=\"Header_totalLevel\"]");
				if (headerElement) this.injectDisplay(headerElement);
				if (!this.displayElement || !document.body.contains(this.displayElement)) return;
			}
			const totals = this.calculateTotals();
			const hasNoData = totals.buyOrders === 0 && totals.sellOrders === 0 && totals.unclaimed === 0;
			this.displayElement.style.justifyContent = hasNoData ? "flex-end" : "flex-start";
			this.displayElement.style.width = hasNoData ? "100%" : "";
			if (hasNoData) {
				const marketplaceIcon = this.getMarketplaceIcon();
				this.displayElement.innerHTML = `
                <button
                    type="button"
                    class="mwi-market-order-totals-link"
                    title="${(0, src_core_i18n_js.t)("No market orders")}"
                    aria-label="${(0, src_core_i18n_js.t)("No market orders")}"
                    style="background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center;"
                >
                    ${marketplaceIcon}
                </button>
            `;
				const linkButton = this.displayElement.querySelector(".mwi-market-order-totals-link");
				if (linkButton) linkButton.addEventListener("click", this.marketplaceClickHandler);
				return;
			}
			const boDisplay = `<span style="color: #ffd700;">${(0, src_utils_formatters_js.formatKMB)(totals.buyOrders)}</span>`;
			const soDisplay = `<span style="color: #ffd700;">${(0, src_utils_formatters_js.formatKMB)(totals.sellOrders)}</span>`;
			const unclaimedDisplay = `<span style="color: #ffd700;">${(0, src_utils_formatters_js.formatKMB)(totals.unclaimed)}</span>`;
			this.displayElement.innerHTML = `
            <div style="display: flex; align-items: center; gap: 4px;" title="${(0, src_core_i18n_js.t)("Buy Orders (coins locked in buy orders)")}">
                <span style="color: #888; font-weight: 500;">BO:</span>
                ${boDisplay}
            </div>
            <div style="display: flex; align-items: center; gap: 4px;" title="${(0, src_core_i18n_js.t)("Sell Orders (expected proceeds after tax)")}">
                <span style="color: #888; font-weight: 500;">SO:</span>
                ${soDisplay}
            </div>
            <div style="display: flex; align-items: center; gap: 4px;" title="${(0, src_core_i18n_js.t)("Unclaimed coins (waiting to be collected)")}">
                <span style="font-weight: 500;">💰:</span>
                ${unclaimedDisplay}
            </div>
        `;
		}
		/**
		* Open the marketplace view
		*/
		openMarketplace() {
			try {
				const navButtons = document.querySelectorAll(".NavigationBar_nav__3uuUl");
				const marketplaceButton = Array.from(navButtons).find((nav) => {
					return nav.querySelector("svg[aria-label=\"navigationBar.marketplace\"]") !== null;
				});
				if (!marketplaceButton) {
					console.error("[MarketOrderTotals] Marketplace navbar button not found");
					return;
				}
				marketplaceButton.click();
			} catch (error) {
				console.error("[MarketOrderTotals] Failed to open marketplace:", error);
			}
		}
		/**
		* Build marketplace icon markup using navbar icon (fallback to emoji).
		* @returns {string} HTML string for icon
		*/
		getMarketplaceIcon() {
			const navIcon = document.querySelector("svg[aria-label=\"navigationBar.marketplace\"]");
			if (navIcon) {
				const clonedIcon = navIcon.cloneNode(true);
				clonedIcon.setAttribute("width", "16");
				clonedIcon.setAttribute("height", "16");
				clonedIcon.setAttribute("aria-hidden", "true");
				return clonedIcon.outerHTML;
			}
			return "<span aria-hidden=\"true\">🏪</span>";
		}
		/**
		* Clear all displays
		*/
		clearDisplay() {
			if (this.displayElement) {
				this.displayElement.remove();
				this.displayElement = null;
			}
		}
		/**
		* Disable the feature
		*/
		disable() {
			if (this.unregisterWebSocket) {
				this.unregisterWebSocket();
				this.unregisterWebSocket = null;
			}
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			this.clearDisplay();
			this.isInitialized = false;
		}
	};
	var marketOrderTotals = new MarketOrderTotals();
	//#endregion
	//#region src/features/market/market-history-viewer.js
	/**
	* Market History Viewer Module
	*
	* Displays a comprehensive table of all market listings with:
	* - Sortable columns
	* - Search/filter functionality
	* - Pagination with user-configurable rows per page
	* - CSV export
	* - Summary statistics
	*/
	var MarketHistoryViewer = class {
		constructor() {
			this.isInitialized = false;
			this.modal = null;
			this.listings = [];
			this.filteredListings = [];
			this.currentPage = 1;
			this.rowsPerPage = 50;
			this.showAll = false;
			this.sortColumn = "createdTimestamp";
			this.sortDirection = "desc";
			this.searchTerm = "";
			this.typeFilter = "all";
			this.statusFilter = "all";
			this.useKMBFormat = false;
			this.storageKey = "marketListingTimestamps";
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.filters = {
				dateFrom: null,
				dateTo: null,
				selectedItems: [],
				selectedEnhLevels: [],
				selectedTypes: []
			};
			this.activeFilterPopup = null;
			this.popupCloseHandler = null;
			this.marketplaceTab = null;
			this.tabCleanupObserver = null;
			this.itemNameCache = /* @__PURE__ */ new Map();
		}
		/**
		* Get the current items sprite URL from the DOM
		* @returns {string|null} Items sprite URL or null if not found
		*/
		getItemsSpriteUrl() {
			const itemIcon = document.querySelector("use[href*=\"items_sprite\"]");
			if (!itemIcon) return null;
			const href = itemIcon.getAttribute("href");
			return href ? href.split("#")[0] : null;
		}
		/**
		* Initialize the feature
		*/
		async initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_showHistoryViewer")) return;
			this.isInitialized = true;
			this.useKMBFormat = await src_core_storage_js.default.get("marketHistoryKMBFormat", "settings", false);
			await this.loadFilters();
			this.addMarketplaceTab();
		}
		/**
		* Load saved filters from storage
		*/
		async loadFilters() {
			try {
				const savedFilters = await src_core_storage_js.default.getJSON("marketHistoryFilters", "settings", null);
				if (savedFilters) {
					this.filters.dateFrom = savedFilters.dateFrom ? new Date(savedFilters.dateFrom) : null;
					this.filters.dateTo = savedFilters.dateTo ? new Date(savedFilters.dateTo) : null;
					this.filters.selectedItems = savedFilters.selectedItems || [];
					this.filters.selectedEnhLevels = savedFilters.selectedEnhLevels || [];
					this.filters.selectedTypes = savedFilters.selectedTypes || [];
				}
			} catch (error) {
				console.error("[MarketHistoryViewer] Failed to load filters:", error);
			}
		}
		/**
		* Save filters to storage
		*/
		async saveFilters() {
			try {
				const filtersToSave = {
					dateFrom: this.filters.dateFrom ? this.filters.dateFrom.toISOString() : null,
					dateTo: this.filters.dateTo ? this.filters.dateTo.toISOString() : null,
					selectedItems: this.filters.selectedItems,
					selectedEnhLevels: this.filters.selectedEnhLevels,
					selectedTypes: this.filters.selectedTypes
				};
				await src_core_storage_js.default.setJSON("marketHistoryFilters", filtersToSave, "settings", true);
			} catch (error) {
				console.error("[MarketHistoryViewer] Failed to save filters:", error);
			}
		}
		/**
		* Add "Market History" tab to marketplace tabs
		*/
		addMarketplaceTab() {
			const ensureTabExists = () => {
				const tabsContainer = document.querySelector(".MuiTabs-flexContainer[role=\"tablist\"]");
				if (!tabsContainer) return;
				if (!Array.from(tabsContainer.children).some((btn) => btn.textContent.includes("Market Listings"))) return;
				if (tabsContainer.querySelector("[data-mwi-market-history-tab=\"true\"]")) return;
				const referenceTab = Array.from(tabsContainer.children).find((btn) => btn.textContent.includes("My Listings"));
				if (!referenceTab) return;
				const tab = referenceTab.cloneNode(true);
				tab.setAttribute("data-mwi-market-history-tab", "true");
				const badgeSpan = tab.querySelector(".TabsComponent_badge__1Du26");
				if (badgeSpan) badgeSpan.innerHTML = `
                    <div style="text-align: center;">
                        <div>Market History</div>
                    </div>
                `;
				tab.classList.remove("Mui-selected");
				tab.setAttribute("aria-selected", "false");
				tab.setAttribute("tabindex", "-1");
				tab.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					this.openModal();
				});
				const firstCustomTab = Array.from(tabsContainer.children).find((btn) => btn.getAttribute("data-mwi-custom-tab") === "true");
				if (firstCustomTab) firstCustomTab.before(tab);
				else tabsContainer.appendChild(tab);
				this.marketplaceTab = tab;
			};
			if (!this.tabCleanupObserver) this.tabCleanupObserver = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(document.body, () => {
				const tabsContainer = document.querySelector(".MuiTabs-flexContainer[role=\"tablist\"]");
				if (!tabsContainer) {
					if (this.marketplaceTab && !document.body.contains(this.marketplaceTab)) this.marketplaceTab = null;
					return;
				}
				if (!Array.from(tabsContainer.children).some((btn) => btn.textContent.includes("Market Listings"))) {
					if (this.marketplaceTab && document.body.contains(this.marketplaceTab)) {
						this.marketplaceTab.remove();
						this.marketplaceTab = null;
					}
					return;
				}
				ensureTabExists();
			}, {
				childList: true,
				subtree: true
			});
			ensureTabExists();
		}
		/**
		* Load listings from storage
		*/
		async loadListings() {
			try {
				const stored = await src_core_storage_js.default.getJSON(this.storageKey, "marketListings", []);
				this.listings = stored.filter((listing) => listing && listing.itemHrid);
				for (const listing of this.listings) if (!listing.status) listing.status = "unknown";
				await this.updateListingStatuses();
				this.cachedDateRange = null;
				this.applyFilters();
			} catch (error) {
				console.error("[MarketHistoryViewer] Failed to load listings:", error);
				this.listings = [];
				this.filteredListings = [];
			}
		}
		/**
		* Update listing statuses by checking active listings
		*/
		async updateListingStatuses() {
			const activeListings = src_core_data_manager_js.default.getMarketListings() || [];
			const activeListingIds = new Set(activeListings.map((l) => l.id));
			for (const listing of this.listings) if (activeListingIds.has(listing.id)) {
				if (listing.status === "unknown" || listing.status === "active") listing.status = "active";
			}
			await src_core_storage_js.default.setJSON(this.storageKey, this.listings, "marketListings", true);
		}
		/**
		* Detect expired listings by scraping the My Listings DOM table
		*/
		async detectExpiredListings() {
			const myListingsTable = document.querySelector(".MarketplacePanel_myListingsTableContainer__2s6pm table tbody");
			if (!myListingsTable) return;
			const rows = myListingsTable.querySelectorAll("tr");
			for (const row of rows) try {
				const statusCell = row.querySelector("td:nth-child(1)");
				if (!statusCell) continue;
				if (statusCell.textContent.trim() !== "Expired") continue;
				const allCells = row.querySelectorAll("td");
				const typeCell = allCells[1];
				const progressCell = allCells[2];
				const priceCell = allCells[3];
				if (!typeCell || !priceCell || !progressCell) continue;
				const isSell = typeCell.textContent.trim() === "Sell";
				const priceText = priceCell.textContent.trim();
				const price = this.parsePrice(priceText);
				const progressMatch = progressCell.textContent.trim().match(/(\d+)\s*\/\s*(\d+)/);
				if (!progressMatch || price === null) continue;
				const filledQuantity = parseInt(progressMatch[1], 10);
				const orderQuantity = parseInt(progressMatch[2], 10);
				const matchingListing = this.listings.find((listing) => listing.isSell === isSell && listing.price === price && listing.orderQuantity === orderQuantity && listing.filledQuantity === filledQuantity && (listing.status === "active" || listing.status === "unknown"));
				if (matchingListing) matchingListing.status = "expired";
			} catch {}
		}
		/**
		* Parse price string to number (handles K/M/B suffixes)
		* @param {string} priceText - Price text (e.g., "12M", "1.5K", "100")
		* @returns {number|null} Parsed price or null if invalid
		*/
		parsePrice(priceText) {
			if (!priceText) return null;
			const match = priceText.trim().toUpperCase().match(/^([\d.]+)([KMB])?$/);
			if (!match) return null;
			const value = parseFloat(match[1]);
			const suffix = match[2];
			if (isNaN(value)) return null;
			switch (suffix) {
				case "K": return Math.round(value * 1e3);
				case "M": return Math.round(value * 1e6);
				case "B": return Math.round(value * 1e9);
				default: return Math.round(value);
			}
		}
		/**
		* Apply filters and search to listings (optimized single-pass version)
		*/
		applyFilters() {
			this.cachedDateRange = null;
			const hasTypeFilter = this.typeFilter !== "all";
			const typeIsBuy = this.typeFilter === "buy";
			const typeIsSell = this.typeFilter === "sell";
			const hasStatusFilter = this.statusFilter && this.statusFilter !== "all";
			const hasSearchTerm = !!this.searchTerm;
			const searchTerm = hasSearchTerm ? this.searchTerm.toLowerCase() : "";
			const hasDateFilter = !!(this.filters.dateFrom || this.filters.dateTo);
			let dateToEndOfDay = null;
			if (hasDateFilter && this.filters.dateTo) {
				dateToEndOfDay = new Date(this.filters.dateTo);
				dateToEndOfDay.setHours(23, 59, 59, 999);
			}
			const hasItemFilter = this.filters.selectedItems.length > 0;
			const itemFilterSet = hasItemFilter ? new Set(this.filters.selectedItems) : null;
			const hasEnhLevelFilter = this.filters.selectedEnhLevels.length > 0;
			const enhLevelFilterSet = hasEnhLevelFilter ? new Set(this.filters.selectedEnhLevels) : null;
			const hasColumnTypeFilter = this.filters.selectedTypes.length > 0 && this.filters.selectedTypes.length < 2;
			const showBuy = hasColumnTypeFilter && this.filters.selectedTypes.includes("buy");
			const showSell = hasColumnTypeFilter && this.filters.selectedTypes.includes("sell");
			const filtered = this.listings.filter((listing) => {
				if (hasTypeFilter) {
					if (typeIsBuy && listing.isSell) return false;
					if (typeIsSell && !listing.isSell) return false;
				}
				if (hasStatusFilter) {
					if (this.statusFilter === "filled_active") {
						if (listing.status !== "filled" && listing.status !== "active") return false;
					} else if (listing.status !== this.statusFilter) return false;
				}
				if (hasSearchTerm) {
					if (!this.getItemName(listing.itemHrid).toLowerCase().includes(searchTerm)) return false;
				}
				if (hasDateFilter) {
					const listingDate = new Date(listing.createdTimestamp || listing.timestamp);
					if (this.filters.dateFrom && listingDate < this.filters.dateFrom) return false;
					if (dateToEndOfDay && listingDate > dateToEndOfDay) return false;
				}
				if (hasItemFilter && !itemFilterSet.has(listing.itemHrid)) return false;
				if (hasEnhLevelFilter && !enhLevelFilterSet.has(listing.enhancementLevel)) return false;
				if (hasColumnTypeFilter) {
					if (showBuy && listing.isSell) return false;
					if (showSell && !listing.isSell) return false;
				}
				return true;
			});
			if (this.sortColumn === "itemHrid") {
				const itemNamesMap = /* @__PURE__ */ new Map();
				for (const listing of filtered) if (!itemNamesMap.has(listing.itemHrid)) itemNamesMap.set(listing.itemHrid, this.getItemName(listing.itemHrid));
				filtered.sort((a, b) => {
					const aVal = itemNamesMap.get(a.itemHrid);
					const bVal = itemNamesMap.get(b.itemHrid);
					return this.sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
				});
			} else if (this.sortColumn === "total") filtered.sort((a, b) => {
				const aVal = a.price * a.filledQuantity;
				const bVal = b.price * b.filledQuantity;
				return this.sortDirection === "asc" ? aVal - bVal : bVal - aVal;
			});
			else if (this.sortColumn === "createdTimestamp") filtered.sort((a, b) => {
				const aVal = a.timestamp;
				const bVal = b.timestamp;
				return this.sortDirection === "asc" ? aVal - bVal : bVal - aVal;
			});
			else filtered.sort((a, b) => {
				const aVal = a[this.sortColumn];
				const bVal = b[this.sortColumn];
				if (typeof aVal === "string") return this.sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
				else return this.sortDirection === "asc" ? aVal - bVal : bVal - aVal;
			});
			this.filteredListings = filtered;
			this.currentPage = 1;
			if (!this._cleanupInProgress) {
				this._cleanupInProgress = true;
				const cleaned = this.cleanupInvalidSelections();
				if (cleaned) this.applyFilters();
				this._cleanupInProgress = false;
				if (cleaned && this.modal && this.modal.style.display !== "none") this.renderTable();
			}
		}
		/**
		* Remove filter selections that yield no results with current filters
		* @returns {boolean} True if any selections were cleaned up
		*/
		cleanupInvalidSelections() {
			let changed = false;
			if (this.filters.selectedItems.length > 0) {
				const validItems = new Set(this.filteredListings.map((l) => l.itemHrid));
				const originalLength = this.filters.selectedItems.length;
				this.filters.selectedItems = this.filters.selectedItems.filter((hrid) => validItems.has(hrid));
				if (this.filters.selectedItems.length !== originalLength) changed = true;
			}
			if (this.filters.selectedEnhLevels.length > 0) {
				const validLevels = new Set(this.filteredListings.map((l) => l.enhancementLevel));
				const originalLength = this.filters.selectedEnhLevels.length;
				this.filters.selectedEnhLevels = this.filters.selectedEnhLevels.filter((level) => validLevels.has(level));
				if (this.filters.selectedEnhLevels.length !== originalLength) changed = true;
			}
			if (this.filters.selectedTypes.length > 0) {
				const hasBuy = this.filteredListings.some((l) => !l.isSell);
				const hasSell = this.filteredListings.some((l) => l.isSell);
				const originalLength = this.filters.selectedTypes.length;
				this.filters.selectedTypes = this.filters.selectedTypes.filter((type) => {
					if (type === "buy") return hasBuy;
					if (type === "sell") return hasSell;
					return false;
				});
				if (this.filters.selectedTypes.length !== originalLength) changed = true;
			}
			if (changed) this.saveFilters();
			return changed;
		}
		/**
		* Get item name from HRID (with caching for performance)
		*/
		getItemName(itemHrid) {
			if (this.itemNameCache.has(itemHrid)) return this.itemNameCache.get(itemHrid);
			const name = src_core_data_manager_js.default.getItemDetails(itemHrid)?.name || itemHrid.split("/").pop().replace(/_/g, " ");
			this.itemNameCache.set(itemHrid, name);
			return name;
		}
		/**
		* Format number based on K/M/B toggle
		* @param {number} num - Number to format
		* @returns {string} Formatted number
		*/
		formatNumber(num) {
			return this.useKMBFormat ? (0, src_utils_formatters_js.formatKMB)(num, 1) : (0, src_utils_formatters_js.formatWithSeparator)(num);
		}
		/**
		* Get paginated listings for current page
		*/
		getPaginatedListings() {
			if (this.showAll) return this.filteredListings;
			const start = (this.currentPage - 1) * this.rowsPerPage;
			const end = start + this.rowsPerPage;
			return this.filteredListings.slice(start, end);
		}
		/**
		* Get total pages
		*/
		getTotalPages() {
			if (this.showAll) return 1;
			return Math.ceil(this.filteredListings.length / this.rowsPerPage);
		}
		/**
		* Open the market history modal
		*/
		async openModal() {
			await this.loadListings();
			if (!this.modal) this.createModal();
			this.modal.style.display = "flex";
			this.renderTable();
		}
		/**
		* Close the modal
		*/
		closeModal() {
			if (this.modal) this.modal.style.display = "none";
		}
		/**
		* Create modal structure
		*/
		createModal() {
			this.modal = document.createElement("div");
			this.modal.className = "mwi-market-history-modal";
			this.modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
			const content = document.createElement("div");
			content.className = "mwi-market-history-content";
			content.style.cssText = `
            background: #2a2a2a;
            border-radius: 8px;
            padding: 20px;
            max-width: 95%;
            max-height: 90%;
            overflow: auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        `;
			const header = document.createElement("div");
			header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        `;
			const title = document.createElement("h2");
			title.textContent = "Market History";
			title.style.cssText = `
            margin: 0;
            color: #fff;
        `;
			const closeBtn = document.createElement("button");
			closeBtn.textContent = "✕";
			closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
        `;
			closeBtn.addEventListener("click", () => this.closeModal());
			header.appendChild(title);
			header.appendChild(closeBtn);
			const controls = document.createElement("div");
			controls.className = "mwi-market-history-controls";
			controls.style.cssText = `
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
        `;
			content.appendChild(header);
			content.appendChild(controls);
			const tableContainer = document.createElement("div");
			tableContainer.className = "mwi-market-history-table-container";
			content.appendChild(tableContainer);
			const pagination = document.createElement("div");
			pagination.className = "mwi-market-history-pagination";
			pagination.style.cssText = `
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
			content.appendChild(pagination);
			this.modal.appendChild(content);
			document.body.appendChild(this.modal);
			this.modal.addEventListener("click", (e) => {
				if (e.target === this.modal) this.closeModal();
			});
		}
		/**
		* Render controls (search, filters, export)
		*/
		renderControls() {
			const controls = this.modal.querySelector(".mwi-market-history-controls");
			if (controls.children.length > 0) {
				this.updateStats();
				return;
			}
			const leftGroup = document.createElement("div");
			leftGroup.style.cssText = `
            display: flex;
            gap: 10px;
            align-items: center;
        `;
			const searchBox = document.createElement("input");
			searchBox.type = "text";
			searchBox.placeholder = "Search items...";
			searchBox.value = this.searchTerm;
			searchBox.className = "mwi-search-box";
			searchBox.style.cssText = `
            padding: 6px 12px;
            border: 1px solid #555;
            border-radius: 4px;
            background: #1a1a1a;
            color: #fff;
            min-width: 200px;
        `;
			searchBox.addEventListener("input", (e) => {
				this.searchTerm = e.target.value;
				this.applyFilters();
				this.renderTable();
			});
			const typeFilter = document.createElement("select");
			typeFilter.style.cssText = `
            padding: 6px 12px;
            border: 1px solid #555;
            border-radius: 4px;
            background: #1a1a1a;
            color: #fff;
        `;
			[
				{
					value: "all",
					label: "All Types"
				},
				{
					value: "buy",
					label: "Buy Orders"
				},
				{
					value: "sell",
					label: "Sell Orders"
				}
			].forEach((opt) => {
				const option = document.createElement("option");
				option.value = opt.value;
				option.textContent = opt.label;
				if (opt.value === this.typeFilter) option.selected = true;
				typeFilter.appendChild(option);
			});
			typeFilter.addEventListener("change", (e) => {
				this.typeFilter = e.target.value;
				this.applyFilters();
				this.renderTable();
			});
			const statusFilter = document.createElement("select");
			statusFilter.style.cssText = `
            padding: 6px 12px;
            border: 1px solid #555;
            border-radius: 4px;
            background: #1a1a1a;
            color: #fff;
        `;
			[
				{
					value: "all",
					label: "All Statuses"
				},
				{
					value: "active",
					label: "Active Only"
				},
				{
					value: "filled",
					label: "Filled Only"
				},
				{
					value: "filled_active",
					label: "Filled or Active"
				},
				{
					value: "canceled",
					label: "Canceled Only"
				},
				{
					value: "expired",
					label: "Expired Only"
				},
				{
					value: "unknown",
					label: "Unknown Only"
				}
			].forEach((opt) => {
				const option = document.createElement("option");
				option.value = opt.value;
				option.textContent = opt.label;
				if (opt.value === this.statusFilter) option.selected = true;
				statusFilter.appendChild(option);
			});
			statusFilter.addEventListener("change", (e) => {
				this.statusFilter = e.target.value;
				this.applyFilters();
				this.renderTable();
			});
			leftGroup.appendChild(searchBox);
			leftGroup.appendChild(typeFilter);
			leftGroup.appendChild(statusFilter);
			const middleGroup = document.createElement("div");
			middleGroup.className = "mwi-active-filters";
			middleGroup.style.cssText = `
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
            flex: 1;
            min-height: 32px;
        `;
			const actionGroup = document.createElement("div");
			actionGroup.style.cssText = `
            display: flex;
            gap: 8px;
            align-items: center;
        `;
			const exportBtn = document.createElement("button");
			exportBtn.textContent = "Export CSV";
			exportBtn.style.cssText = `
            padding: 6px 12px;
            background: #4a90e2;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;
			exportBtn.addEventListener("click", () => this.exportCSV());
			const importBtn = document.createElement("button");
			importBtn.textContent = "Import Market Data";
			importBtn.style.cssText = `
            padding: 6px 12px;
            background: #9b59b6;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;
			importBtn.addEventListener("click", () => this.showImportDialog());
			const clearBtn = document.createElement("button");
			clearBtn.textContent = "Clear History";
			clearBtn.style.cssText = `
            padding: 6px 12px;
            background: #dc2626;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;
			clearBtn.addEventListener("mouseenter", () => {
				clearBtn.style.background = "#b91c1c";
			});
			clearBtn.addEventListener("mouseleave", () => {
				clearBtn.style.background = "#dc2626";
			});
			clearBtn.addEventListener("click", () => this.clearHistory());
			actionGroup.appendChild(exportBtn);
			actionGroup.appendChild(importBtn);
			actionGroup.appendChild(clearBtn);
			const rightGroup = document.createElement("div");
			rightGroup.style.cssText = `
            display: flex;
            gap: 12px;
            align-items: center;
            margin-left: auto;
        `;
			const kmbCheckbox = document.createElement("input");
			kmbCheckbox.type = "checkbox";
			kmbCheckbox.checked = this.useKMBFormat;
			kmbCheckbox.id = "mwi-kmb-format";
			kmbCheckbox.style.cssText = `
            cursor: pointer;
        `;
			kmbCheckbox.addEventListener("change", (e) => {
				this.useKMBFormat = e.target.checked;
				src_core_storage_js.default.set("marketHistoryKMBFormat", this.useKMBFormat, "settings");
				this.renderTable();
			});
			const kmbLabel = document.createElement("label");
			kmbLabel.htmlFor = "mwi-kmb-format";
			kmbLabel.textContent = "K/M/B Format";
			kmbLabel.style.cssText = `
            cursor: pointer;
            color: #aaa;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
        `;
			kmbLabel.prepend(kmbCheckbox);
			const stats = document.createElement("div");
			stats.className = "mwi-market-history-stats";
			stats.style.cssText = `
            color: #aaa;
            font-size: 14px;
            white-space: nowrap;
        `;
			stats.textContent = `Total: ${this.filteredListings.length} listings`;
			rightGroup.appendChild(kmbLabel);
			rightGroup.appendChild(stats);
			controls.appendChild(leftGroup);
			controls.appendChild(middleGroup);
			controls.appendChild(actionGroup);
			controls.appendChild(rightGroup);
			this.updateClearFiltersButton();
			this.renderActiveFilters();
		}
		/**
		* Update just the stats text (without re-rendering controls)
		*/
		updateStats() {
			const stats = this.modal.querySelector(".mwi-market-history-stats");
			if (stats) stats.textContent = `Total: ${this.filteredListings.length} listings`;
			this.updateClearFiltersButton();
			this.renderActiveFilters();
		}
		/**
		* Render active filter badges in the middle section
		*/
		renderActiveFilters() {
			const container = this.modal.querySelector(".mwi-active-filters");
			if (!container) return;
			while (container.firstChild) container.removeChild(container.firstChild);
			const badges = [];
			if (this.filters.dateFrom || this.filters.dateTo) {
				const dateText = [];
				if (this.filters.dateFrom) dateText.push((0, src_utils_formatters_js.formatDateTime)(this.filters.dateFrom, { includeTime: false }));
				if (this.filters.dateTo) dateText.push((0, src_utils_formatters_js.formatDateTime)(this.filters.dateTo, { includeTime: false }));
				badges.push({
					label: `Date: ${dateText.join(" - ")}`,
					onRemove: () => {
						this.filters.dateFrom = null;
						this.filters.dateTo = null;
						this.saveFilters();
						this.applyFilters();
						this.renderTable();
					}
				});
			}
			if (this.filters.selectedItems.length > 0) if (this.filters.selectedItems.length === 1) badges.push({
				label: this.getItemName(this.filters.selectedItems[0]),
				icon: this.filters.selectedItems[0],
				onRemove: () => {
					this.filters.selectedItems = [];
					this.saveFilters();
					this.applyFilters();
					this.renderTable();
				}
			});
			else badges.push({
				label: `${this.filters.selectedItems.length} items selected`,
				icon: this.filters.selectedItems[0],
				onRemove: () => {
					this.filters.selectedItems = [];
					this.saveFilters();
					this.applyFilters();
					this.renderTable();
				}
			});
			if (this.filters.selectedEnhLevels.length > 0) {
				const levels = this.filters.selectedEnhLevels.sort((a, b) => a - b);
				if (levels.length === 1) {
					const levelText = levels[0] > 0 ? `+${levels[0]}` : "No Enhancement";
					badges.push({
						label: `Enh Lvl: ${levelText}`,
						onRemove: () => {
							this.filters.selectedEnhLevels = [];
							this.saveFilters();
							this.applyFilters();
							this.renderTable();
						}
					});
				} else badges.push({
					label: `Enh Lvl: ${levels.length} selected`,
					onRemove: () => {
						this.filters.selectedEnhLevels = [];
						this.saveFilters();
						this.applyFilters();
						this.renderTable();
					}
				});
			}
			if (this.filters.selectedTypes.length > 0 && this.filters.selectedTypes.length < 2) badges.push({
				label: `Type: ${this.filters.selectedTypes.includes("buy") ? "Buy" : "Sell"}`,
				onRemove: () => {
					this.filters.selectedTypes = [];
					this.saveFilters();
					this.applyFilters();
					this.renderTable();
				}
			});
			badges.forEach((badge) => {
				const badgeEl = document.createElement("div");
				badgeEl.style.cssText = `
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 4px 8px;
                background: #3a3a3a;
                border: 1px solid #555;
                border-radius: 4px;
                color: #aaa;
                font-size: 13px;
            `;
				if (badge.icon) {
					const itemsSpriteUrl = this.getItemsSpriteUrl();
					if (itemsSpriteUrl) {
						const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
						svg.setAttribute("width", "16");
						svg.setAttribute("height", "16");
						svg.style.flexShrink = "0";
						const iconName = badge.icon.split("/").pop();
						const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
						use.setAttribute("href", `${itemsSpriteUrl}#${iconName}`);
						svg.appendChild(use);
						badgeEl.appendChild(svg);
					}
				}
				const label = document.createElement("span");
				label.textContent = badge.label;
				const removeBtn = document.createElement("button");
				removeBtn.textContent = "✕";
				removeBtn.style.cssText = `
                background: none;
                border: none;
                color: #aaa;
                cursor: pointer;
                padding: 0;
                font-size: 14px;
                line-height: 1;
            `;
				removeBtn.addEventListener("mouseenter", () => {
					removeBtn.style.color = "#fff";
				});
				removeBtn.addEventListener("mouseleave", () => {
					removeBtn.style.color = "#aaa";
				});
				removeBtn.addEventListener("click", badge.onRemove);
				badgeEl.appendChild(label);
				badgeEl.appendChild(removeBtn);
				container.appendChild(badgeEl);
			});
		}
		/**
		* Update Clear All Filters button visibility based on filter state
		*/
		updateClearFiltersButton() {
			const controls = this.modal.querySelector(".mwi-market-history-controls");
			if (!controls) return;
			const hasActiveFilters = this.filters.dateFrom !== null || this.filters.dateTo !== null || this.filters.selectedItems.length > 0 || this.filters.selectedEnhLevels.length > 0 || this.filters.selectedTypes.length > 0 && this.filters.selectedTypes.length < 2;
			const existingBtn = controls.querySelector(".mwi-clear-filters-button");
			if (hasActiveFilters && !existingBtn) {
				const clearFiltersBtn = document.createElement("button");
				clearFiltersBtn.className = "mwi-clear-filters-button";
				clearFiltersBtn.textContent = "Clear All Filters";
				clearFiltersBtn.style.cssText = `
                padding: 6px 12px;
                background: #e67e22;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                white-space: nowrap;
            `;
				clearFiltersBtn.addEventListener("mouseenter", () => {
					clearFiltersBtn.style.background = "#d35400";
				});
				clearFiltersBtn.addEventListener("mouseleave", () => {
					clearFiltersBtn.style.background = "#e67e22";
				});
				clearFiltersBtn.addEventListener("click", () => this.clearAllFilters());
				const rightGroup = controls.children[3];
				if (rightGroup) rightGroup.insertBefore(clearFiltersBtn, rightGroup.firstChild);
			} else if (!hasActiveFilters && existingBtn) existingBtn.remove();
		}
		/**
		* Render table with listings
		*/
		renderTable() {
			this.renderControls();
			const tableContainer = this.modal.querySelector(".mwi-market-history-table-container");
			while (tableContainer.firstChild) tableContainer.removeChild(tableContainer.firstChild);
			const table = document.createElement("table");
			table.style.cssText = `
            width: 100%;
            border-collapse: collapse;
            color: #fff;
        `;
			const thead = document.createElement("thead");
			const headerRow = document.createElement("tr");
			headerRow.style.cssText = `
            background: #1a1a1a;
        `;
			const columns = [
				{
					key: "createdTimestamp",
					label: "Date"
				},
				{
					key: "itemHrid",
					label: "Item"
				},
				{
					key: "enhancementLevel",
					label: "Enh Lvl"
				},
				{
					key: "isSell",
					label: "Type"
				},
				{
					key: "status",
					label: "Status"
				},
				{
					key: "price",
					label: "Price"
				},
				{
					key: "orderQuantity",
					label: "Quantity"
				},
				{
					key: "filledQuantity",
					label: "Filled"
				},
				{
					key: "total",
					label: "Total"
				},
				{
					key: "_delete",
					label: ""
				}
			];
			columns.forEach((col) => {
				const th = document.createElement("th");
				th.style.cssText = `
                padding: 10px;
                text-align: left;
                border-bottom: 2px solid #555;
                user-select: none;
                position: relative;
            `;
				const headerContent = document.createElement("div");
				headerContent.style.cssText = `
                display: flex;
                align-items: center;
                gap: 8px;
            `;
				const labelSpan = document.createElement("span");
				labelSpan.textContent = col.label;
				if (col.key === "_delete") th.style.width = "30px";
				else {
					labelSpan.style.cursor = "pointer";
					if (this.sortColumn === col.key) labelSpan.textContent += this.sortDirection === "asc" ? " ▲" : " ▼";
					labelSpan.addEventListener("click", () => {
						if (this.sortColumn === col.key) this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
						else {
							this.sortColumn = col.key;
							this.sortDirection = "desc";
						}
						this.applyFilters();
						this.renderTable();
					});
				}
				headerContent.appendChild(labelSpan);
				if ([
					"createdTimestamp",
					"itemHrid",
					"enhancementLevel",
					"isSell"
				].includes(col.key)) {
					const filterBtn = document.createElement("button");
					filterBtn.textContent = "⋮";
					filterBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: #aaa;
                    cursor: pointer;
                    font-size: 16px;
                    padding: 2px 4px;
                    font-weight: bold;
                `;
					if (this.hasActiveFilter(col.key)) {
						filterBtn.style.color = "#4a90e2";
						filterBtn.textContent = "⋮";
					}
					filterBtn.addEventListener("click", (e) => {
						e.stopPropagation();
						this.showFilterPopup(col.key, filterBtn);
					});
					headerContent.appendChild(filterBtn);
				}
				th.appendChild(headerContent);
				headerRow.appendChild(th);
			});
			thead.appendChild(headerRow);
			table.appendChild(thead);
			const tbody = document.createElement("tbody");
			const paginatedListings = this.getPaginatedListings();
			if (paginatedListings.length === 0) {
				const row = document.createElement("tr");
				const cell = document.createElement("td");
				cell.colSpan = columns.length;
				cell.textContent = "No listings found";
				cell.style.cssText = `
                padding: 20px;
                text-align: center;
                color: #888;
            `;
				row.appendChild(cell);
				tbody.appendChild(row);
			} else paginatedListings.forEach((listing, index) => {
				const row = document.createElement("tr");
				row.style.cssText = `
                    border-bottom: 1px solid #333;
                    background: ${index % 2 === 0 ? "#2a2a2a" : "#252525"};
                `;
				const dateCell = document.createElement("td");
				const dateValue = listing.createdTimestamp || listing.timestamp;
				dateCell.textContent = (0, src_utils_formatters_js.formatDateTime)(new Date(dateValue));
				dateCell.style.padding = "4px 10px";
				row.appendChild(dateCell);
				const itemCell = document.createElement("td");
				itemCell.style.cssText = `
                    padding: 4px 10px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                `;
				const itemsSpriteUrl = this.getItemsSpriteUrl();
				if (itemsSpriteUrl) {
					const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					svg.setAttribute("width", "20");
					svg.setAttribute("height", "20");
					const iconName = listing.itemHrid.split("/").pop();
					const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
					use.setAttribute("href", `${itemsSpriteUrl}#${iconName}`);
					svg.appendChild(use);
					itemCell.appendChild(svg);
				}
				const textSpan = document.createElement("span");
				textSpan.textContent = this.getItemName(listing.itemHrid);
				itemCell.appendChild(textSpan);
				row.appendChild(itemCell);
				const enhCell = document.createElement("td");
				enhCell.textContent = listing.enhancementLevel > 0 ? `+${listing.enhancementLevel}` : "-";
				enhCell.style.padding = "4px 10px";
				row.appendChild(enhCell);
				const typeCell = document.createElement("td");
				typeCell.textContent = listing.isSell ? "Sell" : "Buy";
				typeCell.style.cssText = `
                    padding: 4px 10px;
                    color: ${listing.isSell ? "#4ade80" : "#60a5fa"};
                `;
				row.appendChild(typeCell);
				const statusCell = document.createElement("td");
				const status = listing.status || "unknown";
				statusCell.textContent = status.charAt(0).toUpperCase() + status.slice(1);
				const statusColors = {
					active: "#60a5fa",
					filled: "#4ade80",
					canceled: "#fbbf24",
					expired: "#f87171",
					unknown: "#9ca3af"
				};
				statusCell.style.cssText = `
                    padding: 4px 10px;
                    color: ${statusColors[status] || "#9ca3af"};
                    font-weight: 500;
                `;
				row.appendChild(statusCell);
				const priceCell = document.createElement("td");
				priceCell.textContent = this.formatNumber(listing.price);
				priceCell.style.padding = "4px 10px";
				row.appendChild(priceCell);
				const qtyCell = document.createElement("td");
				qtyCell.textContent = this.formatNumber(listing.orderQuantity);
				qtyCell.style.padding = "4px 10px";
				row.appendChild(qtyCell);
				const filledCell = document.createElement("td");
				filledCell.textContent = this.formatNumber(listing.filledQuantity);
				filledCell.style.padding = "4px 10px";
				row.appendChild(filledCell);
				const totalCell = document.createElement("td");
				const totalValue = listing.price * listing.filledQuantity;
				totalCell.textContent = this.formatNumber(totalValue);
				totalCell.style.padding = "4px 10px";
				row.appendChild(totalCell);
				const deleteCell = document.createElement("td");
				deleteCell.style.cssText = "padding: 4px 6px; text-align: center;";
				const deleteBtn = document.createElement("button");
				deleteBtn.textContent = "✕";
				deleteBtn.title = "Delete this listing";
				deleteBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: #666;
                    cursor: pointer;
                    font-size: 13px;
                    padding: 2px 5px;
                    border-radius: 3px;
                    line-height: 1;
                `;
				deleteBtn.addEventListener("mouseenter", () => {
					deleteBtn.style.color = "#f87171";
					deleteBtn.style.background = "rgba(248,113,113,0.15)";
				});
				deleteBtn.addEventListener("mouseleave", () => {
					deleteBtn.style.color = "#666";
					deleteBtn.style.background = "none";
				});
				deleteBtn.addEventListener("click", (e) => {
					e.stopPropagation();
					this.deleteListing(listing.id);
				});
				deleteCell.appendChild(deleteBtn);
				row.appendChild(deleteCell);
				tbody.appendChild(row);
			});
			table.appendChild(tbody);
			tableContainer.appendChild(table);
			this.renderPagination();
		}
		/**
		* Render pagination controls
		*/
		renderPagination() {
			const pagination = this.modal.querySelector(".mwi-market-history-pagination");
			while (pagination.firstChild) pagination.removeChild(pagination.firstChild);
			const leftSide = document.createElement("div");
			leftSide.style.cssText = `
            display: flex;
            gap: 8px;
            align-items: center;
            color: #aaa;
        `;
			const label = document.createElement("span");
			label.textContent = "Rows per page:";
			const rowsInput = document.createElement("input");
			rowsInput.type = "number";
			rowsInput.value = this.rowsPerPage;
			rowsInput.min = "1";
			rowsInput.disabled = this.showAll;
			rowsInput.style.cssText = `
            width: 60px;
            padding: 4px 8px;
            border: 1px solid #555;
            border-radius: 4px;
            background: ${this.showAll ? "#333" : "#1a1a1a"};
            color: ${this.showAll ? "#666" : "#fff"};
        `;
			rowsInput.addEventListener("change", (e) => {
				this.rowsPerPage = Math.max(1, parseInt(e.target.value) || 50);
				this.currentPage = 1;
				this.renderTable();
			});
			const showAllCheckbox = document.createElement("input");
			showAllCheckbox.type = "checkbox";
			showAllCheckbox.checked = this.showAll;
			showAllCheckbox.style.cssText = `
            cursor: pointer;
        `;
			showAllCheckbox.addEventListener("change", (e) => {
				this.showAll = e.target.checked;
				rowsInput.disabled = this.showAll;
				rowsInput.style.background = this.showAll ? "#333" : "#1a1a1a";
				rowsInput.style.color = this.showAll ? "#666" : "#fff";
				this.currentPage = 1;
				this.renderTable();
			});
			const showAllLabel = document.createElement("label");
			showAllLabel.textContent = "Show All";
			showAllLabel.style.cssText = `
            cursor: pointer;
            color: #aaa;
        `;
			showAllLabel.prepend(showAllCheckbox);
			leftSide.appendChild(label);
			leftSide.appendChild(rowsInput);
			leftSide.appendChild(showAllLabel);
			const rightSide = document.createElement("div");
			rightSide.style.cssText = `
            display: flex;
            gap: 8px;
            align-items: center;
            color: #aaa;
        `;
			if (!this.showAll) {
				const totalPages = this.getTotalPages();
				const prevBtn = document.createElement("button");
				prevBtn.textContent = "◀";
				prevBtn.disabled = this.currentPage === 1;
				prevBtn.style.cssText = `
                padding: 4px 12px;
                background: ${this.currentPage === 1 ? "#333" : "#4a90e2"};
                color: ${this.currentPage === 1 ? "#666" : "white"};
                border: none;
                border-radius: 4px;
                cursor: ${this.currentPage === 1 ? "default" : "pointer"};
            `;
				prevBtn.addEventListener("click", () => {
					if (this.currentPage > 1) {
						this.currentPage--;
						this.renderTable();
					}
				});
				const pageInfo = document.createElement("span");
				pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
				const nextBtn = document.createElement("button");
				nextBtn.textContent = "▶";
				nextBtn.disabled = this.currentPage === totalPages;
				nextBtn.style.cssText = `
                padding: 4px 12px;
                background: ${this.currentPage === totalPages ? "#333" : "#4a90e2"};
                color: ${this.currentPage === totalPages ? "#666" : "white"};
                border: none;
                border-radius: 4px;
                cursor: ${this.currentPage === totalPages ? "default" : "pointer"};
            `;
				nextBtn.addEventListener("click", () => {
					if (this.currentPage < totalPages) {
						this.currentPage++;
						this.renderTable();
					}
				});
				rightSide.appendChild(prevBtn);
				rightSide.appendChild(pageInfo);
				rightSide.appendChild(nextBtn);
			} else {
				const showingInfo = document.createElement("span");
				showingInfo.textContent = `Showing all ${this.filteredListings.length} listings`;
				rightSide.appendChild(showingInfo);
			}
			pagination.appendChild(leftSide);
			pagination.appendChild(rightSide);
		}
		/**
		* Export listings to CSV
		*/
		exportCSV() {
			const csv = [[
				"Date",
				"Item",
				"Enhancement",
				"Type",
				"Status",
				"Price",
				"Quantity",
				"Filled",
				"Total",
				"ID"
			], ...this.filteredListings.map((listing) => [
				new Date(listing.createdTimestamp || listing.timestamp).toISOString(),
				this.getItemName(listing.itemHrid),
				listing.enhancementLevel || 0,
				listing.isSell ? "Sell" : "Buy",
				listing.status || "unknown",
				listing.price,
				listing.orderQuantity,
				listing.filledQuantity,
				listing.price * listing.filledQuantity,
				listing.id
			])].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
			const blob = new Blob([csv], { type: "text/csv" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `market-history-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
			a.click();
			URL.revokeObjectURL(url);
		}
		/**
		* Import listings from CSV
		*/
		async importCSV(csvText) {
			try {
				const lines = csvText.trim().split("\n");
				if (lines.length < 2) throw new Error("CSV file is empty or invalid");
				lines[0];
				const progressMsg = document.createElement("div");
				progressMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #2a2a2a;
                padding: 20px;
                border-radius: 8px;
                color: #fff;
                z-index: 10001;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            `;
				progressMsg.textContent = `Importing ${lines.length - 1} listings from CSV...`;
				document.body.appendChild(progressMsg);
				const existingListings = await src_core_storage_js.default.getJSON(this.storageKey, "marketListings", []);
				const existingIds = new Set(existingListings.map((l) => l.id));
				let imported = 0;
				let skipped = 0;
				const itemNameToHrid = {};
				const gameData = src_core_data_manager_js.default.getInitClientData();
				if (gameData?.itemDetailMap) {
					for (const [hrid, details] of Object.entries(gameData.itemDetailMap)) if (details.name) itemNameToHrid[details.name] = hrid;
				}
				for (let i = 1; i < lines.length; i++) {
					const line = lines[i].trim();
					if (!line) continue;
					const fields = [];
					let currentField = "";
					let inQuotes = false;
					for (let j = 0; j < line.length; j++) {
						const char = line[j];
						if (char === "\"") inQuotes = !inQuotes;
						else if (char === "," && !inQuotes) {
							fields.push(currentField);
							currentField = "";
						} else currentField += char;
					}
					fields.push(currentField);
					if (fields.length < 9) {
						console.warn(`[MarketHistoryViewer] Skipping invalid CSV row ${i}: ${line}`);
						continue;
					}
					const [dateStr, itemName, enhStr, typeStr, priceStr, qtyStr, filledStr, _totalStr, idStr] = fields;
					const id = parseInt(idStr);
					if (isNaN(id)) {
						console.warn(`[MarketHistoryViewer] Skipping row with invalid ID: ${idStr}`);
						continue;
					}
					if (existingIds.has(id)) {
						skipped++;
						continue;
					}
					const itemHrid = itemNameToHrid[itemName];
					if (!itemHrid) {
						console.warn(`[MarketHistoryViewer] Could not find HRID for item: ${itemName}`);
						skipped++;
						continue;
					}
					const listing = {
						id,
						timestamp: new Date(dateStr).getTime(),
						createdTimestamp: dateStr,
						itemHrid,
						enhancementLevel: parseInt(enhStr) || 0,
						price: parseFloat(priceStr),
						orderQuantity: parseFloat(qtyStr),
						filledQuantity: parseFloat(filledStr),
						isSell: typeStr.toLowerCase() === "sell"
					};
					existingListings.push(listing);
					imported++;
				}
				await src_core_storage_js.default.setJSON(this.storageKey, existingListings, "marketListings", true);
				document.body.removeChild(progressMsg);
				alert(`Import complete!\n\nImported: ${imported} new listings\nSkipped: ${skipped} duplicates or invalid rows\nTotal: ${existingListings.length} listings`);
				await this.loadListings();
				this.renderTable();
			} catch (error) {
				console.error("[MarketHistoryViewer] CSV import error:", error);
				throw error;
			}
		}
		/**
		* Show import dialog
		*/
		showImportDialog() {
			const fileInput = document.createElement("input");
			fileInput.type = "file";
			fileInput.accept = ".txt,.json,.csv";
			fileInput.style.display = "none";
			fileInput.addEventListener("change", async (e) => {
				const file = e.target.files[0];
				if (!file) return;
				try {
					const text = await file.text();
					if (file.name.endsWith(".csv")) await this.importCSV(text);
					else await this.importEdibleToolsData(text);
				} catch (error) {
					console.error("[MarketHistoryViewer] Import failed:", error);
					alert(`Import failed: ${error.message}`);
				}
			});
			document.body.appendChild(fileInput);
			fileInput.click();
			document.body.removeChild(fileInput);
		}
		/**
		* Import market listing data (supports multiple JSON formats)
		* Accepts:
		* - Edible Tools format: {"market_list": "[...]"} (double-encoded JSON string)
		* - Edible Tools modern: {"market_list": [...]} (proper JSON array)
		* - Direct array: [{listing1}, {listing2}, ...]
		*/
		async importEdibleToolsData(jsonText) {
			try {
				const trimmed = jsonText.trim();
				if (trimmed.startsWith("{") && !trimmed.endsWith("}")) throw new Error("File appears to be truncated or incomplete. The JSON does not end properly. Try exporting from Edible Tools again, or export to CSV from the Market History Viewer and import that instead.");
				const data = JSON.parse(jsonText);
				let marketList;
				if (Array.isArray(data)) marketList = data;
				else if (data && typeof data === "object" && data.market_list) if (typeof data.market_list === "string") marketList = JSON.parse(data.market_list);
				else if (Array.isArray(data.market_list)) marketList = data.market_list;
				else throw new Error("market_list must be an array or JSON string containing an array");
				else throw new Error("Unrecognized format. Expected:\n- Direct array: [{listing1}, {listing2}, ...]\n- Object format: {\"market_list\": [...]}\n- Edible Tools format: {\"market_list\": \"[...]\"}");
				if (!Array.isArray(marketList) || marketList.length === 0) throw new Error("No listings found in file or array is empty");
				const progressMsg = document.createElement("div");
				progressMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #2a2a2a;
                padding: 20px;
                border-radius: 8px;
                color: #fff;
                z-index: 10001;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            `;
				progressMsg.textContent = `Importing ${marketList.length} listings...`;
				document.body.appendChild(progressMsg);
				const existingListings = await src_core_storage_js.default.getJSON(this.storageKey, "marketListings", []);
				const existingIds = new Set(existingListings.map((l) => l.id));
				let imported = 0;
				let skipped = 0;
				for (const etListing of marketList) {
					if (existingIds.has(etListing.id)) {
						skipped++;
						continue;
					}
					const toolashaListing = {
						id: etListing.id,
						timestamp: new Date(etListing.createdTimestamp).getTime(),
						createdTimestamp: etListing.createdTimestamp,
						itemHrid: etListing.itemHrid,
						enhancementLevel: etListing.enhancementLevel || 0,
						price: etListing.price,
						orderQuantity: etListing.orderQuantity,
						filledQuantity: etListing.filledQuantity,
						isSell: etListing.isSell
					};
					existingListings.push(toolashaListing);
					imported++;
				}
				await src_core_storage_js.default.setJSON(this.storageKey, existingListings, "marketListings", true);
				document.body.removeChild(progressMsg);
				alert(`Import complete!\n\nImported: ${imported} new listings\nSkipped: ${skipped} duplicates\nTotal: ${existingListings.length} listings`);
				await this.loadListings();
				this.renderTable();
			} catch (error) {
				console.error("[MarketHistoryViewer] Import error:", error);
				throw error;
			}
		}
		/**
		* Delete a single listing by its ID
		* @param {number} listingId
		*/
		async deleteListing(listingId) {
			this.listings = this.listings.filter((l) => l.id !== listingId);
			await src_core_storage_js.default.setJSON(this.storageKey, this.listings, "marketListings", true);
			this.applyFilters();
			this.renderTable();
		}
		/**
		* Clear all market history data
		*/
		async clearHistory() {
			if (!confirm(`⚠️ WARNING: This will permanently delete ALL market history data!\nYou are about to delete ${this.listings.length} listings.\nRECOMMENDATION: Export to CSV first using the "Export CSV" button.\nThis action CANNOT be undone!\nAre you absolutely sure you want to continue?`)) return;
			try {
				await src_core_storage_js.default.setJSON(this.storageKey, [], "marketListings", true);
				this.listings = [];
				this.filteredListings = [];
				await estimatedListingAge.loadHistoricalData();
				alert("Market history cleared successfully.");
				await this.loadListings();
				this.renderTable();
			} catch (error) {
				console.error("[MarketHistoryViewer] Failed to clear history:", error);
				alert(`Failed to clear history: ${error.message}`);
			}
		}
		/**
		* Get filtered listings excluding a specific filter type
		* Used for dynamic filter options - shows what's available given OTHER active filters
		* @param {string} excludeFilterType - Filter to exclude: 'date', 'item', 'enhancementLevel', 'type'
		* @returns {Array} Filtered listings
		*/
		getFilteredListingsExcluding(excludeFilterType) {
			let filtered = [...this.listings];
			if (this.typeFilter === "buy") filtered = filtered.filter((listing) => !listing.isSell);
			else if (this.typeFilter === "sell") filtered = filtered.filter((listing) => listing.isSell);
			if (this.searchTerm) {
				const term = this.searchTerm.toLowerCase();
				filtered = filtered.filter((listing) => {
					return this.getItemName(listing.itemHrid).toLowerCase().includes(term);
				});
			}
			if (excludeFilterType !== "date" && (this.filters.dateFrom || this.filters.dateTo)) filtered = filtered.filter((listing) => {
				const listingDate = new Date(listing.createdTimestamp || listing.timestamp);
				if (this.filters.dateFrom && listingDate < this.filters.dateFrom) return false;
				if (this.filters.dateTo) {
					const endOfDay = new Date(this.filters.dateTo);
					endOfDay.setHours(23, 59, 59, 999);
					if (listingDate > endOfDay) return false;
				}
				return true;
			});
			if (excludeFilterType !== "item" && this.filters.selectedItems.length > 0) filtered = filtered.filter((listing) => this.filters.selectedItems.includes(listing.itemHrid));
			if (excludeFilterType !== "enhancementLevel" && this.filters.selectedEnhLevels.length > 0) filtered = filtered.filter((listing) => this.filters.selectedEnhLevels.includes(listing.enhancementLevel));
			if (excludeFilterType !== "type" && this.filters.selectedTypes.length > 0 && this.filters.selectedTypes.length < 2) {
				const showBuy = this.filters.selectedTypes.includes("buy");
				const showSell = this.filters.selectedTypes.includes("sell");
				filtered = filtered.filter((listing) => {
					if (showBuy && !listing.isSell) return true;
					if (showSell && listing.isSell) return true;
					return false;
				});
			}
			return filtered;
		}
		/**
		* Check if a column has an active filter
		* @param {string} columnKey - Column key to check
		* @returns {boolean} True if filter is active
		*/
		hasActiveFilter(columnKey) {
			switch (columnKey) {
				case "createdTimestamp": return this.filters.dateFrom !== null || this.filters.dateTo !== null;
				case "itemHrid": return this.filters.selectedItems.length > 0;
				case "enhancementLevel": return this.filters.selectedEnhLevels.length > 0;
				case "isSell": return this.filters.selectedTypes.length > 0 && this.filters.selectedTypes.length < 2;
				default: return false;
			}
		}
		/**
		* Show filter popup for a column
		* @param {string} columnKey - Column key
		* @param {HTMLElement} buttonElement - Button that triggered popup
		*/
		showFilterPopup(columnKey, buttonElement) {
			if (this.activeFilterPopup && this.activeFilterButton === buttonElement) {
				this.activeFilterPopup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
				if (this.popupCloseHandler) {
					document.removeEventListener("click", this.popupCloseHandler);
					this.popupCloseHandler = null;
				}
				return;
			}
			if (this.activeFilterPopup) {
				this.activeFilterPopup.remove();
				this.activeFilterPopup = null;
			}
			if (this.popupCloseHandler) {
				document.removeEventListener("click", this.popupCloseHandler);
				this.popupCloseHandler = null;
			}
			let popup;
			switch (columnKey) {
				case "createdTimestamp":
					popup = this.createDateFilterPopup();
					break;
				case "itemHrid":
					popup = this.createItemFilterPopup();
					break;
				case "enhancementLevel":
					popup = this.createEnhancementFilterPopup();
					break;
				case "isSell":
					popup = this.createTypeFilterPopup();
					break;
				default: return;
			}
			const buttonRect = buttonElement.getBoundingClientRect();
			popup.style.position = "fixed";
			popup.style.top = `${buttonRect.bottom + 5}px`;
			popup.style.left = `${buttonRect.left}px`;
			popup.style.zIndex = "10002";
			document.body.appendChild(popup);
			this.activeFilterPopup = popup;
			this.activeFilterButton = buttonElement;
			this.popupCloseHandler = (e) => {
				if (e.target.type === "date" || e.target.closest("input[type=\"date\"]")) return;
				if (!popup.contains(e.target) && e.target !== buttonElement) {
					popup.remove();
					this.activeFilterPopup = null;
					this.activeFilterButton = null;
					document.removeEventListener("click", this.popupCloseHandler);
					this.popupCloseHandler = null;
				}
			};
			const popupTimeout = setTimeout(() => document.addEventListener("click", this.popupCloseHandler), 10);
			this.timerRegistry.registerTimeout(popupTimeout);
		}
		/**
		* Create date filter popup
		* @returns {HTMLElement} Popup element
		*/
		createDateFilterPopup() {
			const popup = document.createElement("div");
			popup.style.cssText = `
            background: #2a2a2a;
            border: 1px solid #555;
            border-radius: 4px;
            padding: 12px;
            min-width: 250px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        `;
			const title = document.createElement("div");
			title.textContent = "Filter by Date";
			title.style.cssText = `
            color: #fff;
            font-weight: bold;
            margin-bottom: 10px;
        `;
			popup.appendChild(title);
			if (!this.cachedDateRange) {
				const filteredListings = this.getFilteredListingsExcluding("date");
				if (filteredListings.length > 0) {
					const timestamps = filteredListings.map((l) => l.timestamp || new Date(l.createdTimestamp).getTime());
					this.cachedDateRange = {
						minDate: new Date(Math.min(...timestamps)),
						maxDate: new Date(Math.max(...timestamps))
					};
				} else this.cachedDateRange = {
					minDate: null,
					maxDate: null
				};
			}
			const { minDate, maxDate } = this.cachedDateRange;
			if (minDate && maxDate) {
				const rangeInfo = document.createElement("div");
				rangeInfo.style.cssText = `
                color: #aaa;
                font-size: 11px;
                margin-bottom: 10px;
                padding: 6px;
                background: #1a1a1a;
                border-radius: 3px;
            `;
				rangeInfo.textContent = `Available: ${(0, src_utils_formatters_js.formatDateTime)(minDate, { includeTime: false })} - ${(0, src_utils_formatters_js.formatDateTime)(maxDate, { includeTime: false })}`;
				popup.appendChild(rangeInfo);
			}
			const fromLabel = document.createElement("label");
			fromLabel.textContent = "From:";
			fromLabel.style.cssText = `
            display: block;
            color: #aaa;
            margin-bottom: 4px;
            font-size: 12px;
        `;
			const fromInput = document.createElement("input");
			fromInput.type = "date";
			fromInput.value = this.filters.dateFrom ? this.filters.dateFrom.toISOString().split("T")[0] : "";
			if (minDate) fromInput.min = minDate.toISOString().split("T")[0];
			if (maxDate) fromInput.max = maxDate.toISOString().split("T")[0];
			fromInput.style.cssText = `
            width: 100%;
            padding: 6px;
            background: #1a1a1a;
            border: 1px solid #555;
            border-radius: 3px;
            color: #fff;
            margin-bottom: 10px;
        `;
			const toLabel = document.createElement("label");
			toLabel.textContent = "To:";
			toLabel.style.cssText = `
            display: block;
            color: #aaa;
            margin-bottom: 4px;
            font-size: 12px;
        `;
			const toInput = document.createElement("input");
			toInput.type = "date";
			toInput.value = this.filters.dateTo ? this.filters.dateTo.toISOString().split("T")[0] : "";
			if (minDate) toInput.min = minDate.toISOString().split("T")[0];
			if (maxDate) toInput.max = maxDate.toISOString().split("T")[0];
			toInput.style.cssText = `
            width: 100%;
            padding: 6px;
            background: #1a1a1a;
            border: 1px solid #555;
            border-radius: 3px;
            color: #fff;
            margin-bottom: 10px;
        `;
			const buttonContainer = document.createElement("div");
			buttonContainer.style.cssText = `
            display: flex;
            gap: 8px;
            margin-top: 10px;
        `;
			const applyBtn = document.createElement("button");
			applyBtn.textContent = "Apply";
			applyBtn.style.cssText = `
            flex: 1;
            padding: 6px;
            background: #4a90e2;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
			applyBtn.addEventListener("click", () => {
				this.filters.dateFrom = fromInput.value ? new Date(fromInput.value) : null;
				this.filters.dateTo = toInput.value ? new Date(toInput.value) : null;
				this.saveFilters();
				this.applyFilters();
				this.renderTable();
				popup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
			});
			const clearBtn = document.createElement("button");
			clearBtn.textContent = "Clear";
			clearBtn.style.cssText = `
            flex: 1;
            padding: 6px;
            background: #666;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
			clearBtn.addEventListener("click", () => {
				this.filters.dateFrom = null;
				this.filters.dateTo = null;
				this.saveFilters();
				this.applyFilters();
				this.renderTable();
				popup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
			});
			buttonContainer.appendChild(applyBtn);
			buttonContainer.appendChild(clearBtn);
			popup.appendChild(fromLabel);
			popup.appendChild(fromInput);
			popup.appendChild(toLabel);
			popup.appendChild(toInput);
			popup.appendChild(buttonContainer);
			return popup;
		}
		/**
		* Create item filter popup
		* @returns {HTMLElement} Popup element
		*/
		createItemFilterPopup() {
			const popup = document.createElement("div");
			popup.style.cssText = `
            background: #2a2a2a;
            border: 1px solid #555;
            border-radius: 4px;
            padding: 12px;
            min-width: 300px;
            max-height: 400px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        `;
			const title = document.createElement("div");
			title.textContent = "Filter by Item";
			title.style.cssText = `
            color: #fff;
            font-weight: bold;
            margin-bottom: 10px;
        `;
			popup.appendChild(title);
			const searchInput = document.createElement("input");
			searchInput.type = "text";
			searchInput.placeholder = "Search items...";
			searchInput.style.cssText = `
            width: 100%;
            padding: 6px;
            background: #1a1a1a;
            border: 1px solid #555;
            border-radius: 3px;
            color: #fff;
            margin-bottom: 8px;
        `;
			popup.appendChild(searchInput);
			const filteredListings = this.getFilteredListingsExcluding("item");
			const itemsWithNames = [...new Set(filteredListings.map((l) => l.itemHrid))].map((hrid) => ({
				hrid,
				name: this.getItemName(hrid)
			}));
			itemsWithNames.sort((a, b) => a.name.localeCompare(b.name));
			const checkboxContainer = document.createElement("div");
			checkboxContainer.style.cssText = `
            flex: 1;
            overflow-y: auto;
            margin-bottom: 10px;
            max-height: 250px;
        `;
			const renderCheckboxes = (filterText = "") => {
				while (checkboxContainer.firstChild) checkboxContainer.removeChild(checkboxContainer.firstChild);
				(filterText ? itemsWithNames.filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase())) : itemsWithNames).forEach((item) => {
					const label = document.createElement("label");
					label.style.cssText = `
                    display: block;
                    color: #fff;
                    padding: 4px;
                    cursor: pointer;
                `;
					const checkbox = document.createElement("input");
					checkbox.type = "checkbox";
					checkbox.checked = this.filters.selectedItems.includes(item.hrid);
					checkbox.style.marginRight = "6px";
					label.appendChild(checkbox);
					label.appendChild(document.createTextNode(item.name));
					checkboxContainer.appendChild(label);
					checkbox.addEventListener("change", (e) => {
						if (e.target.checked) {
							if (!this.filters.selectedItems.includes(item.hrid)) this.filters.selectedItems.push(item.hrid);
						} else {
							const index = this.filters.selectedItems.indexOf(item.hrid);
							if (index > -1) this.filters.selectedItems.splice(index, 1);
						}
					});
				});
			};
			renderCheckboxes();
			searchInput.addEventListener("input", (e) => renderCheckboxes(e.target.value));
			popup.appendChild(checkboxContainer);
			const buttonContainer = document.createElement("div");
			buttonContainer.style.cssText = `
            display: flex;
            gap: 8px;
        `;
			const applyBtn = document.createElement("button");
			applyBtn.textContent = "Apply";
			applyBtn.style.cssText = `
            flex: 1;
            padding: 6px;
            background: #4a90e2;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
			applyBtn.addEventListener("click", () => {
				this.saveFilters();
				this.applyFilters();
				this.renderTable();
				popup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
			});
			const clearBtn = document.createElement("button");
			clearBtn.textContent = "Clear";
			clearBtn.style.cssText = `
            flex: 1;
            padding: 6px;
            background: #666;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
			clearBtn.addEventListener("click", () => {
				this.filters.selectedItems = [];
				this.saveFilters();
				this.applyFilters();
				this.renderTable();
				popup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
			});
			buttonContainer.appendChild(applyBtn);
			buttonContainer.appendChild(clearBtn);
			popup.appendChild(buttonContainer);
			return popup;
		}
		/**
		* Create enhancement level filter popup
		* @returns {HTMLElement} Popup element
		*/
		createEnhancementFilterPopup() {
			const popup = document.createElement("div");
			popup.style.cssText = `
            background: #2a2a2a;
            border: 1px solid #555;
            border-radius: 4px;
            padding: 12px;
            min-width: 200px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        `;
			const title = document.createElement("div");
			title.textContent = "Filter by Enhancement Level";
			title.style.cssText = `
            color: #fff;
            font-weight: bold;
            margin-bottom: 10px;
        `;
			popup.appendChild(title);
			const filteredListings = this.getFilteredListingsExcluding("enhancementLevel");
			const enhLevels = [...new Set(filteredListings.map((l) => l.enhancementLevel))];
			enhLevels.sort((a, b) => a - b);
			const checkboxContainer = document.createElement("div");
			checkboxContainer.style.cssText = `
            max-height: 250px;
            overflow-y: auto;
            margin-bottom: 10px;
        `;
			enhLevels.forEach((level) => {
				const label = document.createElement("label");
				label.style.cssText = `
                display: block;
                color: #fff;
                padding: 4px;
                cursor: pointer;
            `;
				const checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.checked = this.filters.selectedEnhLevels.includes(level);
				checkbox.style.marginRight = "6px";
				const levelText = level > 0 ? `+${level}` : "No Enhancement";
				label.appendChild(checkbox);
				label.appendChild(document.createTextNode(levelText));
				checkboxContainer.appendChild(label);
				checkbox.addEventListener("change", (e) => {
					if (e.target.checked) {
						if (!this.filters.selectedEnhLevels.includes(level)) this.filters.selectedEnhLevels.push(level);
					} else {
						const index = this.filters.selectedEnhLevels.indexOf(level);
						if (index > -1) this.filters.selectedEnhLevels.splice(index, 1);
					}
				});
			});
			popup.appendChild(checkboxContainer);
			const buttonContainer = document.createElement("div");
			buttonContainer.style.cssText = `
            display: flex;
            gap: 8px;
        `;
			const applyBtn = document.createElement("button");
			applyBtn.textContent = "Apply";
			applyBtn.style.cssText = `
            flex: 1;
            padding: 6px;
            background: #4a90e2;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
			applyBtn.addEventListener("click", () => {
				this.saveFilters();
				this.applyFilters();
				this.renderTable();
				popup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
			});
			const clearBtn = document.createElement("button");
			clearBtn.textContent = "Clear";
			clearBtn.style.cssText = `
            flex: 1;
            padding: 6px;
            background: #666;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
			clearBtn.addEventListener("click", () => {
				this.filters.selectedEnhLevels = [];
				this.saveFilters();
				this.applyFilters();
				this.renderTable();
				popup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
			});
			buttonContainer.appendChild(applyBtn);
			buttonContainer.appendChild(clearBtn);
			popup.appendChild(buttonContainer);
			return popup;
		}
		/**
		* Create type filter popup (Buy/Sell)
		* @returns {HTMLElement} Popup element
		*/
		createTypeFilterPopup() {
			const popup = document.createElement("div");
			popup.style.cssText = `
            background: #2a2a2a;
            border: 1px solid #555;
            border-radius: 4px;
            padding: 12px;
            min-width: 150px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        `;
			const title = document.createElement("div");
			title.textContent = "Filter by Type";
			title.style.cssText = `
            color: #fff;
            font-weight: bold;
            margin-bottom: 10px;
        `;
			popup.appendChild(title);
			const filteredListings = this.getFilteredListingsExcluding("type");
			const hasBuyOrders = filteredListings.some((l) => !l.isSell);
			const hasSellOrders = filteredListings.some((l) => l.isSell);
			if (hasBuyOrders) {
				const buyLabel = document.createElement("label");
				buyLabel.style.cssText = `
                display: block;
                color: #fff;
                padding: 4px;
                cursor: pointer;
                margin-bottom: 6px;
            `;
				const buyCheckbox = document.createElement("input");
				buyCheckbox.type = "checkbox";
				buyCheckbox.checked = this.filters.selectedTypes.includes("buy");
				buyCheckbox.style.marginRight = "6px";
				buyLabel.appendChild(buyCheckbox);
				buyLabel.appendChild(document.createTextNode("Buy Orders"));
				popup.appendChild(buyLabel);
				buyCheckbox.addEventListener("change", (e) => {
					if (e.target.checked) {
						if (!this.filters.selectedTypes.includes("buy")) this.filters.selectedTypes.push("buy");
					} else {
						const index = this.filters.selectedTypes.indexOf("buy");
						if (index > -1) this.filters.selectedTypes.splice(index, 1);
					}
				});
			}
			if (hasSellOrders) {
				const sellLabel = document.createElement("label");
				sellLabel.style.cssText = `
                display: block;
                color: #fff;
                padding: 4px;
                cursor: pointer;
            `;
				const sellCheckbox = document.createElement("input");
				sellCheckbox.type = "checkbox";
				sellCheckbox.checked = this.filters.selectedTypes.includes("sell");
				sellCheckbox.style.marginRight = "6px";
				sellLabel.appendChild(sellCheckbox);
				sellLabel.appendChild(document.createTextNode("Sell Orders"));
				popup.appendChild(sellLabel);
				sellCheckbox.addEventListener("change", (e) => {
					if (e.target.checked) {
						if (!this.filters.selectedTypes.includes("sell")) this.filters.selectedTypes.push("sell");
					} else {
						const index = this.filters.selectedTypes.indexOf("sell");
						if (index > -1) this.filters.selectedTypes.splice(index, 1);
					}
				});
			}
			const buttonContainer = document.createElement("div");
			buttonContainer.style.cssText = `
            display: flex;
            gap: 8px;
            margin-top: 10px;
        `;
			const applyBtn = document.createElement("button");
			applyBtn.textContent = "Apply";
			applyBtn.style.cssText = `
            flex: 1;
            padding: 6px;
            background: #4a90e2;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
			applyBtn.addEventListener("click", () => {
				this.saveFilters();
				this.applyFilters();
				this.renderTable();
				popup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
			});
			const clearBtn = document.createElement("button");
			clearBtn.textContent = "Clear";
			clearBtn.style.cssText = `
            flex: 1;
            padding: 6px;
            background: #666;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
			clearBtn.addEventListener("click", () => {
				this.filters.selectedTypes = [];
				this.saveFilters();
				this.applyFilters();
				this.renderTable();
				popup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
			});
			buttonContainer.appendChild(applyBtn);
			buttonContainer.appendChild(clearBtn);
			popup.appendChild(buttonContainer);
			return popup;
		}
		/**
		* Clear all active filters
		*/
		async clearAllFilters() {
			this.filters.dateFrom = null;
			this.filters.dateTo = null;
			this.filters.selectedItems = [];
			this.filters.selectedEnhLevels = [];
			this.filters.selectedTypes = [];
			await this.saveFilters();
			this.applyFilters();
			this.renderTable();
		}
		/**
		* Disable the feature
		*/
		disable() {
			if (this.activeFilterPopup) {
				this.activeFilterPopup.remove();
				this.activeFilterPopup = null;
				this.activeFilterButton = null;
			}
			if (this.popupCloseHandler) {
				document.removeEventListener("click", this.popupCloseHandler);
				this.popupCloseHandler = null;
			}
			this.timerRegistry.clearAll();
			if (this.modal) {
				this.modal.remove();
				this.modal = null;
			}
			const button = document.querySelector(".mwi-market-history-button");
			if (button) button.remove();
			this.listings = [];
			this.filteredListings = [];
			this.cachedDateRange = null;
			this.isInitialized = false;
		}
	};
	var marketHistoryViewer = new MarketHistoryViewer();
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
	function getGameObject() {
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
		const game = getGameObject();
		if (game?.handleGoToMarketplace) game.handleGoToMarketplace(itemHrid, enhancementLevel);
	}
	//#endregion
	//#region src/features/market/listing-refresh-navigator.js
	/**
	* Listing Refresh Navigator
	*
	* Adds a "Refresh Next" button next to "Upgrade Capacity" on the My Listings page.
	* Each click navigates to the next listing's order book, cycling through all listings.
	*
	* Depends on listing-price-display.js stamping row.dataset.itemHrid / listingId.
	*/
	var LISTING_COUNT_SEL = "[class*=\"MarketplacePanel_listingCount\"]";
	var TABLE_SEL = "[class*=\"MarketplacePanel_myListingsTable\"]";
	var BTN_CLASS = "Button_button__1Fe9z Button_small__3fqC7";
	var ListingRefreshNavigator = class {
		constructor() {
			this.isInitialized = false;
			this.lastListingId = null;
			this.watcher = null;
			this.refreshBtn = null;
		}
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_listingRefreshNavigator")) return;
			this.isInitialized = true;
			this._watch();
		}
		_watch() {
			const ensureButton = () => {
				const countContainer = document.querySelector(LISTING_COUNT_SEL);
				if (!countContainer) {
					if (this.refreshBtn && document.body.contains(this.refreshBtn)) {
						this.refreshBtn.remove();
						this.refreshBtn = null;
					}
					return;
				}
				if (this.refreshBtn && !document.body.contains(this.refreshBtn)) this.refreshBtn = null;
				if (this.refreshBtn) return;
				const btn = document.createElement("button");
				btn.type = "button";
				btn.className = BTN_CLASS;
				btn.textContent = "Refresh Next";
				btn.addEventListener("click", () => this._refreshNext());
				const upgradeBtn = Array.from(countContainer.querySelectorAll("button")).find((b) => b.textContent.includes("Upgrade Capacity"));
				if (upgradeBtn) upgradeBtn.after(btn);
				else countContainer.appendChild(btn);
				this.refreshBtn = btn;
			};
			if (!this.watcher) this.watcher = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(document.body, ensureButton, {
				childList: true,
				subtree: true
			});
			ensureButton();
		}
		_refreshNext() {
			const table = document.querySelector(TABLE_SEL);
			if (!table) return;
			const rows = Array.from(table.querySelectorAll("tbody tr"));
			if (rows.length === 0) return;
			let startIndex = 0;
			if (this.lastListingId !== null) {
				const lastIdx = rows.findIndex((row) => row.dataset.listingId === this.lastListingId);
				if (lastIdx !== -1) startIndex = (lastIdx + 1) % rows.length;
			}
			const row = rows[startIndex];
			const itemHrid = row.dataset.itemHrid;
			const enhancementLevel = parseInt(row.dataset.enhancementLevel || "0", 10);
			if (!itemHrid) return;
			this.lastListingId = row.dataset.listingId || null;
			if (this.refreshBtn) this.refreshBtn.textContent = `Refresh Next (${startIndex + 1}/${rows.length})`;
			navigateToMarketplace(itemHrid, enhancementLevel);
		}
		cleanup() {
			if (this.watcher) {
				this.watcher();
				this.watcher = null;
			}
			if (this.refreshBtn) {
				this.refreshBtn.remove();
				this.refreshBtn = null;
			}
			this.lastListingId = null;
			this.isInitialized = false;
		}
	};
	var listingRefreshNavigator = new ListingRefreshNavigator();
	//#endregion
	//#region src/features/market/philo-calculator.js
	/**
	* Philosopher's Stone Transmutation Calculator
	*
	* Calculates expected value and ROI for transmuting items into Philosopher's Stones.
	* Shows a sortable table of all items that can transmute into philos with live market data.
	*/
	var PHILO_HRID = "/items/philosophers_stone";
	var PRIME_CATALYST_HRID = "/items/prime_catalyst";
	var PRIME_CATALYST_ADDITIVE_BONUS = .25;
	var TRANSMUTE_ACTION_TIME_SECONDS = 20;
	var CATALYTIC_TEA_BUFF_TYPE = "/buff_types/alchemy_success";
	var PhiloCalculator = class {
		constructor() {
			this.isInitialized = false;
			this.modal = null;
			this.sortColumn = "cost";
			this.sortDirection = "desc";
			this.philoPrice = 0;
			this.catalystPrice = 0;
			this.useCatalyst = true;
			this.useCatalyticTea = false;
			this.catalyticTeaRatioBoost = 0;
			this.drinkConcentrationLevel = 0;
			this.hideNegativeProfitItems = true;
			this.filterText = "";
			this.rows = [];
		}
		/**
		* Initialize the feature
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_showPhiloCalculator")) return;
			this.isInitialized = true;
			this.addSettingsButton();
		}
		/**
		* Disable / cleanup the feature
		*/
		disable() {
			if (this.modal) {
				this.modal.remove();
				this.modal = null;
			}
			this.isInitialized = false;
		}
		/**
		* Add "Philo Gamba" button to settings panel
		*/
		addSettingsButton() {
			const ensureButtonExists = () => {
				const settingsPanel = document.querySelector("[class*=\"SettingsPanel\"]");
				if (!settingsPanel) return;
				if (settingsPanel.querySelector(".mwi-philo-calc-button")) return;
				const button = document.createElement("button");
				button.className = "mwi-philo-calc-button";
				button.textContent = (0, src_core_i18n_js.t)("Philo Gamba");
				button.style.cssText = `
                margin: 10px;
                padding: 8px 16px;
                background: #4a90e2;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
            `;
				button.addEventListener("mouseenter", () => {
					button.style.background = "#357abd";
				});
				button.addEventListener("mouseleave", () => {
					button.style.background = "#4a90e2";
				});
				button.addEventListener("click", () => {
					this.openModal();
				});
				const historyButton = settingsPanel.querySelector(".mwi-market-history-button");
				if (historyButton) historyButton.after(button);
				else settingsPanel.insertBefore(button, settingsPanel.firstChild);
			};
			const settingsUI = window.Toolasha?.UI?.settingsUI;
			if (settingsUI && typeof settingsUI.onSettingsPanelAppear === "function") settingsUI.onSettingsPanelAppear(ensureButtonExists);
			ensureButtonExists();
		}
		/**
		* Get item name from game data
		* @param {string} itemHrid - Item HRID
		* @returns {string} Item name
		*/
		getItemName(itemHrid) {
			return itemNameTranslator.getDisplayName(itemHrid);
		}
		/**
		* Load default prices from market data
		*/
		loadDefaultPrices() {
			const philoPriceData = src_api_marketplace_js.default.getPrice(PHILO_HRID, 0);
			this.philoPrice = philoPriceData?.bid || 0;
			const catalystPriceData = src_api_marketplace_js.default.getPrice(PRIME_CATALYST_HRID, 0);
			this.catalystPrice = catalystPriceData?.ask || 0;
		}
		/**
		* Calculate catalytic tea base bonus from game data (item definition)
		* @returns {number} Base ratioBoost from item definition
		*/
		calculateCatalyticTeaRatioBoost() {
			try {
				const gameData = src_core_data_manager_js.default.getInitClientData();
				if (!gameData?.itemDetailMap) return 0;
				const teaItem = gameData.itemDetailMap["/items/catalytic_tea"];
				if (!teaItem?.consumableDetail?.buffs) return 0;
				for (const buff of teaItem.consumableDetail.buffs) if (buff.typeHrid === CATALYTIC_TEA_BUFF_TYPE) return buff.ratioBoost || 0;
				return 0;
			} catch (error) {
				console.error("[PhiloCalculator] Failed to calculate catalytic tea ratio boost:", error);
				return 0;
			}
		}
		/**
		* Load settings from storage
		*/
		async loadSettings() {
			try {
				const saved = await src_core_storage_js.default.getJSON("philoCalculatorSettings", "settings", null);
				if (saved) {
					this.useCatalyst = saved.useCatalyst !== false;
					this.useCatalyticTea = saved.useCatalyticTea || false;
					this.drinkConcentrationLevel = saved.drinkConcentrationLevel || 0;
					this.hideNegativeProfitItems = saved.hideNegativeProfitItems !== false;
					this.filterText = saved.filterText || "";
				}
			} catch (error) {
				console.error("[PhiloCalculator] Failed to load settings:", error);
			}
		}
		/**
		* Save settings to storage
		*/
		async saveSettings() {
			try {
				await src_core_storage_js.default.setJSON("philoCalculatorSettings", {
					useCatalyst: this.useCatalyst,
					useCatalyticTea: this.useCatalyticTea,
					drinkConcentrationLevel: this.drinkConcentrationLevel,
					hideNegativeProfitItems: this.hideNegativeProfitItems,
					filterText: this.filterText
				}, "settings", true);
			} catch (error) {
				console.error("[PhiloCalculator] Failed to save settings:", error);
			}
		}
		/**
		* Get drink concentration for a given enhancement level
		* @param {number} enhancementLevel - Enhancement level (0-20)
		* @returns {number} Drink concentration as decimal (e.g., 0.1032 for 10.32%)
		*/
		getDrinkConcentrationForLevel(enhancementLevel) {
			try {
				const gameData = src_core_data_manager_js.default.getInitClientData();
				const equipment = src_core_data_manager_js.default.getEquipment();
				if (!equipment || !gameData?.itemDetailMap) return 0;
				let totalConcentration = 0;
				const baseConcentrationByLevel = /* @__PURE__ */ new Map();
				for (const [_slotHrid, equippedItem] of equipment) {
					const itemDetails = gameData.itemDetailMap[equippedItem.itemHrid];
					if (!itemDetails?.equipmentDetail?.noncombatStats?.drinkConcentration) continue;
					const baseConcentration = itemDetails.equipmentDetail.noncombatStats.drinkConcentration;
					baseConcentrationByLevel.set(equippedItem.itemHrid, baseConcentration);
				}
				for (const [itemHrid, baseConcentration] of baseConcentrationByLevel) {
					const itemDetails = gameData.itemDetailMap[itemHrid];
					const multiplier = (0, src_utils_enhancement_multipliers_js.getEnhancementMultiplier)(itemDetails, enhancementLevel);
					totalConcentration += baseConcentration * multiplier;
				}
				return totalConcentration;
			} catch (error) {
				console.error("[PhiloCalculator] Failed to get drink concentration:", error);
				return 0;
			}
		}
		/**
		* Scan itemDetailMap for all items that can transmute into Philosopher's Stone
		* @returns {Array} Array of { itemHrid, itemDetails } objects
		*/
		findPhiloTransmuteItems() {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData?.itemDetailMap) return [];
			const results = [];
			for (const [itemHrid, itemDetails] of Object.entries(gameData.itemDetailMap)) {
				const alchemy = itemDetails?.alchemyDetail;
				if (!alchemy?.transmuteDropTable || !alchemy.transmuteSuccessRate) continue;
				if (alchemy.transmuteDropTable.some((drop) => drop.itemHrid === PHILO_HRID)) results.push({
					itemHrid,
					itemDetails
				});
			}
			return results;
		}
		/**
		* Calculate all columns for a single item
		* @param {string} itemHrid - Item HRID
		* @param {Object} itemDetails - Item detail object
		* @returns {Object|null} Row data or null if price unavailable
		*/
		calculateRow(itemHrid, itemDetails) {
			const alchemy = itemDetails.alchemyDetail;
			const baseTransmuteRate = alchemy.transmuteSuccessRate;
			let totalBonus = 0;
			if (this.useCatalyticTea && this.catalyticTeaRatioBoost > 0) {
				const drinkConcentration = this.getDrinkConcentrationForLevel(this.drinkConcentrationLevel);
				totalBonus += this.catalyticTeaRatioBoost * (1 + drinkConcentration);
			}
			if (this.useCatalyst) totalBonus += PRIME_CATALYST_ADDITIVE_BONUS;
			const successRate = Math.min(1, baseTransmuteRate * (1 + totalBonus));
			const bulkMultiplier = alchemy.bulkMultiplier || 1;
			const philoDrop = alchemy.transmuteDropTable.find((d) => d.itemHrid === PHILO_HRID);
			if (!philoDrop) return null;
			const philoChance = successRate * philoDrop.dropRate;
			const itemCost = src_api_marketplace_js.default.getPrice(itemHrid, 0)?.ask;
			if (itemCost === null || itemCost === void 0) return null;
			const catalystCostPerAction = this.useCatalyst ? successRate * this.catalystPrice : 0;
			const sellPrice = itemDetails.sellPrice || 0;
			const coinCost = Math.max(50, Math.floor(sellPrice / 5)) * bulkMultiplier;
			const totalCostPerAction = itemCost * bulkMultiplier + catalystCostPerAction + coinCost;
			let evPerAction = 0;
			for (const drop of alchemy.transmuteDropTable) {
				let dropValue;
				if (drop.itemHrid === PHILO_HRID) dropValue = this.philoPrice;
				else {
					dropValue = src_api_marketplace_js.default.getPrice(drop.itemHrid, 0)?.bid;
					if (dropValue === null || dropValue === void 0) continue;
				}
				const avgCount = (drop.minCount + drop.maxCount) / 2;
				evPerAction += successRate * drop.dropRate * avgCount * dropValue;
			}
			const profitPerAction = evPerAction - totalCostPerAction;
			const actionsPerPhilo = 1 / philoChance;
			const selfDrop = alchemy.transmuteDropTable.find((d) => d.itemHrid === itemHrid);
			const selfDropRate = selfDrop ? selfDrop.dropRate : 0;
			const avgSelfCount = selfDrop ? (selfDrop.minCount + selfDrop.maxCount) / 2 : 0;
			const returnChance = successRate * selfDropRate;
			const itemsPerAction = bulkMultiplier - returnChance * avgSelfCount;
			const itemsPerPhilo = actionsPerPhilo * itemsPerAction;
			const profitPerPhilo = profitPerAction * actionsPerPhilo;
			const profitMargin = profitPerAction / totalCostPerAction;
			const timePerPhiloSeconds = actionsPerPhilo * TRANSMUTE_ACTION_TIME_SECONDS;
			const actionsPerHour = 3600 / TRANSMUTE_ACTION_TIME_SECONDS;
			const profitPerHour = profitPerAction * actionsPerHour;
			const revenuePerHour = evPerAction * actionsPerHour;
			const costPerHour = totalCostPerAction * actionsPerHour;
			return {
				itemHrid,
				name: this.getItemName(itemHrid),
				cost: itemCost,
				philoChance,
				returnChance,
				transmuteChance: baseTransmuteRate,
				effectiveTransmuteChance: successRate,
				transmuteCost: totalCostPerAction,
				ev: evPerAction,
				itemsPerAction,
				actionsPerPhilo,
				itemsPerPhilo,
				profitPerPhilo,
				profitMargin,
				timePerPhiloSeconds,
				profitPerHour,
				revenuePerHour,
				costPerHour
			};
		}
		/**
		* Calculate all rows
		*/
		calculateAllRows() {
			const items = this.findPhiloTransmuteItems();
			this.rows = [];
			for (const { itemHrid, itemDetails } of items) {
				const row = this.calculateRow(itemHrid, itemDetails);
				if (row) this.rows.push(row);
			}
			this.sortRows();
		}
		/**
		* Sort rows by current sort column and direction
		*/
		sortRows() {
			const col = this.sortColumn;
			const dir = this.sortDirection === "asc" ? 1 : -1;
			this.rows.sort((a, b) => {
				const aVal = a[col];
				const bVal = b[col];
				if (typeof aVal === "string") return dir * aVal.localeCompare(bVal);
				return dir * (aVal - bVal);
			});
		}
		/**
		* Handle column header click for sorting
		* @param {string} column - Column key to sort by
		*/
		toggleSort(column) {
			if (this.sortColumn === column) this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
			else {
				this.sortColumn = column;
				this.sortDirection = "desc";
			}
			this.sortRows();
			this.renderTable();
		}
		/**
		* Open the calculator modal
		*/
		async openModal() {
			if (this.modal) this.modal.remove();
			await this.loadSettings();
			this.loadDefaultPrices();
			this.catalyticTeaRatioBoost = this.calculateCatalyticTeaRatioBoost();
			if (this.drinkConcentrationLevel === 0) {
				let currentDrinkEnhancementLevel = 0;
				const gameData = src_core_data_manager_js.default.getInitClientData();
				const equipment = src_core_data_manager_js.default.getEquipment();
				if (equipment && gameData?.itemDetailMap) {
					for (const [_slotHrid, equippedItem] of equipment) if (gameData.itemDetailMap[equippedItem.itemHrid]?.equipmentDetail?.noncombatStats?.drinkConcentration) {
						currentDrinkEnhancementLevel = equippedItem.enhancementLevel || 0;
						break;
					}
				}
				this.drinkConcentrationLevel = currentDrinkEnhancementLevel;
			}
			this.calculateAllRows();
			this.modal = document.createElement("div");
			this.modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
			const dialog = document.createElement("div");
			dialog.style.cssText = `
            background: #2a2a2a;
            color: #ffffff;
            border-radius: 8px;
            width: 95%;
            max-width: 1200px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        `;
			const header = document.createElement("div");
			header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid #444;
        `;
			header.innerHTML = `
            <span style="font-size: 18px; font-weight: bold;">${(0, src_core_i18n_js.t)("Philosopher's Stone Calculator")}</span>
        `;
			const closeBtn = document.createElement("button");
			closeBtn.textContent = "×";
			closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            padding: 0 4px;
        `;
			closeBtn.addEventListener("click", () => closeModal());
			header.appendChild(closeBtn);
			const controls = this.createControls();
			const tableContainer = document.createElement("div");
			tableContainer.className = "philo-calc-table-container";
			tableContainer.style.cssText = `
            overflow: auto;
            flex: 1;
            padding: 0 20px 20px;
        `;
			dialog.appendChild(header);
			dialog.appendChild(controls);
			dialog.appendChild(tableContainer);
			this.modal.appendChild(dialog);
			const closeModal = () => {
				if (!this.modal) return;
				this.modal.remove();
				this.modal = null;
				document.removeEventListener("keydown", escHandler);
			};
			this.modal.addEventListener("click", (e) => {
				if (e.target === this.modal) closeModal();
			});
			const escHandler = (e) => {
				if (e.key === "Escape") closeModal();
			};
			document.addEventListener("keydown", escHandler);
			document.body.appendChild(this.modal);
			this.renderTable();
		}
		/**
		* Create the input controls section (philo price, catalyst price, checkbox)
		* @returns {HTMLElement} Controls container
		*/
		createControls() {
			const container = document.createElement("div");
			container.style.cssText = `
            padding: 12px 20px;
            display: flex;
            gap: 20px;
            align-items: center;
            flex-wrap: wrap;
            border-bottom: 1px solid #444;
        `;
			const philoLabel = document.createElement("label");
			philoLabel.style.cssText = "display: flex; align-items: center; gap: 6px; font-size: 13px;";
			philoLabel.textContent = (0, src_core_i18n_js.t)("Philo Price: ");
			const philoInput = document.createElement("input");
			philoInput.type = "text";
			philoInput.value = this.philoPrice.toLocaleString();
			philoInput.style.cssText = `
            width: 130px;
            padding: 4px 8px;
            background: #1a1a1a;
            color: #fff;
            border: 1px solid #555;
            border-radius: 4px;
            font-size: 13px;
        `;
			philoInput.addEventListener("change", () => {
				const parsed = parseInt(philoInput.value.replaceAll(",", "").replaceAll(".", ""), 10);
				if (!isNaN(parsed)) {
					this.philoPrice = parsed;
					this.recalculate();
				}
			});
			philoLabel.appendChild(philoInput);
			const catLabel = document.createElement("label");
			catLabel.style.cssText = "display: flex; align-items: center; gap: 6px; font-size: 13px;";
			catLabel.textContent = (0, src_core_i18n_js.t)("Catalyst Price: ");
			const catInput = document.createElement("input");
			catInput.type = "text";
			catInput.value = this.catalystPrice.toLocaleString();
			catInput.style.cssText = `
            width: 130px;
            padding: 4px 8px;
            background: #1a1a1a;
            color: #fff;
            border: 1px solid #555;
            border-radius: 4px;
            font-size: 13px;
        `;
			catInput.addEventListener("change", () => {
				const parsed = parseInt(catInput.value.replaceAll(",", "").replaceAll(".", ""), 10);
				if (!isNaN(parsed)) {
					this.catalystPrice = parsed;
					this.recalculate();
				}
			});
			catLabel.appendChild(catInput);
			const checkLabel = document.createElement("label");
			checkLabel.style.cssText = "display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;";
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.checked = this.useCatalyst;
			checkbox.style.cursor = "pointer";
			checkbox.addEventListener("change", () => {
				this.useCatalyst = checkbox.checked;
				this.recalculate();
				this.saveSettings();
			});
			checkLabel.appendChild(checkbox);
			checkLabel.appendChild(document.createTextNode("Use Prime Catalyst"));
			container.appendChild(philoLabel);
			container.appendChild(catLabel);
			container.appendChild(checkLabel);
			const teaCheckLabel = document.createElement("label");
			teaCheckLabel.style.cssText = "display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;";
			const teaCheckbox = document.createElement("input");
			teaCheckbox.type = "checkbox";
			teaCheckbox.checked = this.useCatalyticTea;
			teaCheckbox.style.cursor = "pointer";
			teaCheckbox.addEventListener("change", () => {
				this.useCatalyticTea = teaCheckbox.checked;
				this.recalculate();
				this.saveSettings();
			});
			teaCheckLabel.appendChild(teaCheckbox);
			const boostText = this.catalyticTeaRatioBoost > 0 ? ` (${(0, src_utils_formatters_js.formatPercentage)(this.catalyticTeaRatioBoost, 1)})` : " (unavailable)";
			teaCheckLabel.appendChild(document.createTextNode(`Catalytic Tea${boostText}`));
			container.appendChild(teaCheckLabel);
			const drinkLabel = document.createElement("label");
			drinkLabel.style.cssText = "display: flex; align-items: center; gap: 6px; font-size: 13px;";
			drinkLabel.textContent = (0, src_core_i18n_js.t)("Drink Concentration: ");
			const drinkSelect = document.createElement("select");
			drinkSelect.style.cssText = `
            padding: 4px 8px;
            background: #1a1a1a;
            color: #fff;
            border: 1px solid #555;
            border-radius: 4px;
            font-size: 13px;
        `;
			for (let level = 0; level <= 20; level++) {
				const concentration = this.getDrinkConcentrationForLevel(level);
				const option = document.createElement("option");
				option.value = level;
				option.textContent = `+${level} (${(0, src_utils_formatters_js.formatPercentage)(concentration, 2)})`;
				if (level === this.drinkConcentrationLevel) option.selected = true;
				drinkSelect.appendChild(option);
			}
			drinkSelect.addEventListener("change", () => {
				this.drinkConcentrationLevel = parseInt(drinkSelect.value, 10);
				this.recalculate();
				this.saveSettings();
			});
			drinkLabel.appendChild(drinkSelect);
			container.appendChild(drinkLabel);
			const hideNegCheckLabel = document.createElement("label");
			hideNegCheckLabel.style.cssText = "display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;";
			const hideNegCheckbox = document.createElement("input");
			hideNegCheckbox.type = "checkbox";
			hideNegCheckbox.checked = this.hideNegativeProfitItems;
			hideNegCheckbox.style.cursor = "pointer";
			hideNegCheckbox.addEventListener("change", () => {
				this.hideNegativeProfitItems = hideNegCheckbox.checked;
				this.renderTable();
				this.saveSettings();
			});
			hideNegCheckLabel.appendChild(hideNegCheckbox);
			hideNegCheckLabel.appendChild(document.createTextNode("Hide Negative Profit"));
			container.appendChild(hideNegCheckLabel);
			const filterLabel = document.createElement("label");
			filterLabel.style.cssText = "display: flex; align-items: center; gap: 6px; font-size: 13px;";
			filterLabel.textContent = (0, src_core_i18n_js.t)("Filter: ");
			const filterInput = document.createElement("input");
			filterInput.type = "text";
			filterInput.placeholder = (0, src_core_i18n_js.t)("Item name...");
			filterInput.value = this.filterText;
			filterInput.style.cssText = `
            width: 140px;
            padding: 4px 8px;
            background: #1a1a1a;
            color: #fff;
            border: 1px solid #555;
            border-radius: 4px;
            font-size: 13px;
        `;
			filterInput.addEventListener("input", () => {
				this.filterText = filterInput.value;
				this.renderTable();
				this.saveSettings();
			});
			filterLabel.appendChild(filterInput);
			container.appendChild(filterLabel);
			const refreshBtn = document.createElement("button");
			refreshBtn.textContent = (0, src_core_i18n_js.t)("Refresh Prices");
			refreshBtn.style.cssText = `
            padding: 4px 12px;
            background: #4a90e2;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 13px;
        `;
			refreshBtn.addEventListener("mouseenter", () => {
				refreshBtn.style.background = "#357abd";
			});
			refreshBtn.addEventListener("mouseleave", () => {
				refreshBtn.style.background = "#4a90e2";
			});
			refreshBtn.addEventListener("click", async () => {
				refreshBtn.disabled = true;
				refreshBtn.textContent = (0, src_core_i18n_js.t)("Refreshing...");
				refreshBtn.style.opacity = "0.6";
				try {
					await src_api_marketplace_js.default.fetch(true);
					this.loadDefaultPrices();
					const inputs = container.querySelectorAll("input[type=\"text\"]");
					if (inputs[0]) inputs[0].value = this.philoPrice.toLocaleString();
					if (inputs[1]) inputs[1].value = this.catalystPrice.toLocaleString();
					this.recalculate();
				} catch (error) {
					console.error("[PhiloCalculator] Failed to refresh prices:", error);
				}
				refreshBtn.disabled = false;
				refreshBtn.textContent = (0, src_core_i18n_js.t)("Refresh Prices");
				refreshBtn.style.opacity = "1";
			});
			return container;
		}
		/**
		* Recalculate all rows and re-render
		*/
		recalculate() {
			this.calculateAllRows();
			this.renderTable();
		}
		/**
		* Render the results table
		*/
		renderTable() {
			const container = this.modal?.querySelector(".philo-calc-table-container");
			if (!container) return;
			const columns = [
				{
					key: "name",
					label: "Item",
					align: "left"
				},
				{
					key: "cost",
					label: "Cost"
				},
				{
					key: "philoChance",
					label: "Philo %"
				},
				{
					key: "returnChance",
					label: "Return %"
				},
				{
					key: "transmuteChance",
					label: "Base Xmute %"
				},
				{
					key: "effectiveTransmuteChance",
					label: "Eff. Xmute %"
				},
				{
					key: "transmuteCost",
					label: "Xmute Cost"
				},
				{
					key: "ev",
					label: "EV"
				},
				{
					key: "itemsPerAction",
					label: "Items/Act"
				},
				{
					key: "actionsPerPhilo",
					label: "Acts/Philo"
				},
				{
					key: "itemsPerPhilo",
					label: "Items/Philo"
				},
				{
					key: "profitPerPhilo",
					label: "Profit/Philo"
				},
				{
					key: "profitMargin",
					label: "Margin"
				},
				{
					key: "timePerPhiloSeconds",
					label: "Time/Philo"
				},
				{
					key: "profitPerHour",
					label: "Profit/Hr"
				},
				{
					key: "revenuePerHour",
					label: "Revenue/Hr"
				},
				{
					key: "costPerHour",
					label: "Cost/Hr"
				}
			];
			const table = document.createElement("table");
			table.style.cssText = `
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        `;
			const thead = document.createElement("thead");
			const headerRow = document.createElement("tr");
			for (const col of columns) {
				const th = document.createElement("th");
				th.style.cssText = `
                padding: 8px 6px;
                text-align: ${col.align || "right"};
                border-bottom: 2px solid #555;
                cursor: pointer;
                user-select: none;
                white-space: nowrap;
                position: sticky;
                top: 0;
                background: #2a2a2a;
                z-index: 1;
            `;
				const arrow = this.sortColumn === col.key ? this.sortDirection === "asc" ? " ▲" : " ▼" : "";
				th.textContent = col.label + arrow;
				th.addEventListener("click", () => this.toggleSort(col.key));
				headerRow.appendChild(th);
			}
			thead.appendChild(headerRow);
			table.appendChild(thead);
			const tbody = document.createElement("tbody");
			const filterLower = this.filterText.toLowerCase();
			let filteredRows = filterLower ? this.rows.filter((row) => row.name.toLowerCase().includes(filterLower)) : this.rows;
			if (this.hideNegativeProfitItems) filteredRows = filteredRows.filter((row) => row.profitPerPhilo >= 0);
			for (let i = 0; i < filteredRows.length; i++) {
				const row = filteredRows[i];
				const tr = document.createElement("tr");
				const bgColor = i % 2 === 0 ? "#2a2a2a" : "#252525";
				tr.style.cssText = `background: ${bgColor};`;
				for (const col of columns) {
					const td = document.createElement("td");
					td.style.cssText = `
                    padding: 6px;
                    text-align: ${col.align || "right"};
                    white-space: nowrap;
                `;
					const value = row[col.key];
					switch (col.key) {
						case "name":
							td.textContent = value;
							break;
						case "philoChance":
						case "returnChance":
						case "transmuteChance":
						case "effectiveTransmuteChance":
							td.textContent = (0, src_utils_formatters_js.formatPercentage)(value, 2);
							break;
						case "profitMargin":
							td.textContent = (0, src_utils_formatters_js.formatPercentage)(value, 1);
							td.style.color = value >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
							break;
						case "timePerPhiloSeconds":
							td.textContent = (0, src_utils_formatters_js.timeReadableZh)(value);
							break;
						case "profitPerPhilo":
						case "profitPerHour":
							td.textContent = (0, src_utils_formatters_js.formatLargeNumber)(Math.round(value));
							td.style.color = value >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
							break;
						case "revenuePerHour":
						case "costPerHour":
							td.textContent = (0, src_utils_formatters_js.formatLargeNumber)(Math.round(value));
							break;
						case "actionsPerPhilo":
						case "itemsPerPhilo":
							td.textContent = (0, src_utils_formatters_js.formatLargeNumber)(Math.round(value));
							break;
						case "itemsPerAction":
							td.textContent = value.toFixed(2);
							break;
						default: td.textContent = (0, src_utils_formatters_js.formatLargeNumber)(Math.round(value));
					}
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}
			table.appendChild(tbody);
			container.innerHTML = "";
			container.appendChild(table);
		}
	};
	var philoCalculator = new PhiloCalculator();
	//#endregion
	//#region src/features/market/trade-history.js
	/**
	* Personal Trade History Module
	* Tracks your buy/sell prices for marketplace items
	*/
	/**
	* TradeHistory class manages personal buy/sell price tracking
	*/
	var TradeHistory = class {
		constructor() {
			this.history = {};
			this.isInitialized = false;
			this.isLoaded = false;
			this.characterId = null;
			this.marketUpdateHandler = null;
		}
		/**
		* Get character-specific storage key
		* @returns {string} Storage key with character ID suffix
		*/
		getStorageKey() {
			if (this.characterId) return `tradeHistory_${this.characterId}`;
			return "tradeHistory";
		}
		/**
		* Setup setting listener for feature toggle
		*/
		setupSettingListener() {
			src_core_config_js.default.onSettingChange("market_tradeHistory", (value) => {
				if (value) this.initialize();
				else this.disable();
			});
		}
		/**
		* Initialize trade history tracking
		*/
		async initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_tradeHistory")) return;
			this.characterId = src_core_data_manager_js.default.getCurrentCharacterId();
			await this.loadHistory();
			this.marketUpdateHandler = (data) => {
				this.handleMarketUpdate(data);
			};
			src_core_data_manager_js.default.on("market_listings_updated", this.marketUpdateHandler);
			this.isInitialized = true;
		}
		/**
		* Load trade history from storage
		*/
		async loadHistory() {
			try {
				const storageKey = this.getStorageKey();
				const saved = await src_core_storage_js.default.getJSON(storageKey, "settings", {});
				this.history = saved || {};
				this.isLoaded = true;
			} catch (error) {
				console.error("[TradeHistory] Failed to load history:", error);
				this.history = {};
				this.isLoaded = true;
			}
		}
		/**
		* Save trade history to storage
		*/
		async saveHistory() {
			try {
				const storageKey = this.getStorageKey();
				await src_core_storage_js.default.setJSON(storageKey, this.history, "settings", true);
			} catch (error) {
				console.error("[TradeHistory] Failed to save history:", error);
			}
		}
		/**
		* Handle market_listings_updated WebSocket message
		* @param {Object} data - Market update data
		*/
		handleMarketUpdate(data) {
			if (!data.endMarketListings) return;
			let hasChanges = false;
			data.endMarketListings.forEach((order) => {
				if (order.filledQuantity === 0) return;
				const key = `${order.itemHrid}:${order.enhancementLevel}`;
				const itemHistory = this.history[key] || {};
				if (order.isSell) itemHistory.sell = order.price;
				else itemHistory.buy = order.price;
				this.history[key] = itemHistory;
				hasChanges = true;
			});
			if (hasChanges) this.saveHistory();
		}
		/**
		* Get trade history for a specific item
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level (default 0)
		* @returns {Object|null} { buy, sell } or null if no history
		*/
		getHistory(itemHrid, enhancementLevel = 0) {
			const key = `${itemHrid}:${enhancementLevel}`;
			return this.history[key] || null;
		}
		/**
		* Check if history data is loaded
		* @returns {boolean}
		*/
		isReady() {
			return this.isLoaded;
		}
		/**
		* Clear all trade history
		*/
		async clearHistory() {
			this.history = {};
			await this.saveHistory();
		}
		/**
		* Disable the feature
		*/
		disable() {
			if (this.marketUpdateHandler) {
				src_core_data_manager_js.default.off("market_listings_updated", this.marketUpdateHandler);
				this.marketUpdateHandler = null;
			}
			this.isInitialized = false;
		}
		/**
		* Handle character switch - clear old data and reinitialize
		*/
		async handleCharacterSwitch() {
			this.disable();
			this.history = {};
			this.isLoaded = false;
			await this.initialize();
		}
	};
	var tradeHistory = new TradeHistory();
	tradeHistory.setupSettingListener();
	src_core_data_manager_js.default.on("character_switched", () => {
		if (src_core_config_js.default.getSetting("market_tradeHistory")) tradeHistory.handleCharacterSwitch();
	});
	//#endregion
	//#region src/features/market/trade-history-display.js
	/**
	* Trade History Display Module
	* Shows your last buy/sell prices in the marketplace panel
	*/
	var TradeHistoryDisplay = class {
		constructor() {
			this.isActive = false;
			this.unregisterObserver = null;
			this.unregisterWebSocket = null;
			this.currentItemHrid = null;
			this.currentEnhancementLevel = 0;
			this.currentOrderBookData = null;
			this.isInitialized = false;
			this.needsPriceDataRetry = false;
		}
		/**
		* Initialize the display system
		*/
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_tradeHistory")) return;
			this.isInitialized = true;
			this.setupWebSocketListener();
			this.setupSettingListener();
			this.isActive = true;
		}
		/**
		* Setup setting change listener to refresh display when comparison mode changes
		*/
		setupSettingListener() {
			src_core_config_js.default.onSettingChange("market_tradeHistoryComparisonMode", () => {
				if (this.currentItemHrid) {
					const history = tradeHistory.getHistory(this.currentItemHrid, this.currentEnhancementLevel);
					this.updateDisplay(null, history);
				}
			});
		}
		/**
		* Setup WebSocket listener for order book updates
		*/
		setupWebSocketListener() {
			const orderBookHandler = (data) => {
				if (data.marketItemOrderBooks) {
					this.currentOrderBookData = data.marketItemOrderBooks;
					const itemHrid = data.marketItemOrderBooks.itemHrid;
					const enhancementLevel = this.getCurrentEnhancementLevel();
					if (itemHrid === this.currentItemHrid && enhancementLevel === this.currentEnhancementLevel) {
						if (!this.needsPriceDataRetry && document.querySelector(".mwi-trade-history")) return;
					}
					this.currentItemHrid = itemHrid;
					this.currentEnhancementLevel = enhancementLevel;
					const history = tradeHistory.getHistory(itemHrid, enhancementLevel);
					this.updateDisplay(null, history);
				}
			};
			src_core_data_manager_js.default.on("market_item_order_books_updated", orderBookHandler);
			this.unregisterWebSocket = () => {
				src_core_data_manager_js.default.off("market_item_order_books_updated", orderBookHandler);
			};
		}
		/**
		* Get current enhancement level being viewed in order book
		* @returns {number} Enhancement level (0 for non-equipment)
		*/
		getCurrentEnhancementLevel() {
			const currentItemElement = document.querySelector("[class*=\"MarketplacePanel_currentItem\"]");
			if (currentItemElement) {
				const enhancementElement = currentItemElement.querySelector("[class*=\"Item_enhancementLevel\"]");
				if (enhancementElement) {
					const match = enhancementElement.textContent.match(/\+(\d+)/);
					if (match) return parseInt(match[1], 10);
				}
			}
			return 0;
		}
		/**
		* Update trade history display
		* @param {HTMLElement} panel - Current item panel (unused, kept for signature compatibility)
		* @param {Object|null} history - Trade history { buy, sell } or null
		*/
		updateDisplay(panel, history) {
			document.querySelectorAll(".mwi-trade-history").forEach((el) => el.remove());
			if (!history || !history.buy && !history.sell) return;
			const currentPrices = this.extractCurrentPrices(panel);
			if (!currentPrices) {
				this.needsPriceDataRetry = true;
				return;
			}
			const comparisonMode = src_core_config_js.default.getSettingValue("market_tradeHistoryComparisonMode", "instant");
			const buttonContainer = document.querySelector("[class*=\"MarketplacePanel_marketNavButtonContainer\"]");
			if (!buttonContainer) return;
			const historyDiv = document.createElement("div");
			historyDiv.className = "mwi-trade-history";
			historyDiv.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-left: 12px;
            font-size: 0.85rem;
            color: #888;
            padding: 6px 12px;
            background: rgba(0,0,0,0.8);
            border-radius: 4px;
            white-space: nowrap;
        `;
			const parts = [];
			parts.push(`<span style="color: #aaa; font-weight: 500;">Last:</span>`);
			if (history.buy) {
				const buyColor = this.getBuyColor(history.buy, currentPrices, comparisonMode);
				parts.push(`<span style="color: ${buyColor}; font-weight: 600;" title="${(0, src_core_i18n_js.t)("Your last buy price")}">Buy ${(0, src_utils_formatters_js.formatKMB3Digits)(history.buy)}</span>`);
			}
			if (history.buy && history.sell) parts.push(`<span style="color: #555;">|</span>`);
			if (history.sell) {
				const sellColor = this.getSellColor(history.sell, currentPrices, comparisonMode);
				parts.push(`<span style="color: ${sellColor}; font-weight: 600;" title="${(0, src_core_i18n_js.t)("Your last sell price")}">Sell ${(0, src_utils_formatters_js.formatKMB3Digits)(history.sell)}</span>`);
			}
			historyDiv.innerHTML = parts.join("");
			buttonContainer.appendChild(historyDiv);
			this.needsPriceDataRetry = false;
		}
		/**
		* Extract current top order prices from WebSocket order book data
		* @param {HTMLElement} panel - Current item panel (unused, kept for signature compatibility)
		* @returns {Object|null} { ask, bid } or null
		*/
		extractCurrentPrices(_panel) {
			if (!this.currentOrderBookData || !this.currentOrderBookData.orderBooks) return null;
			const enhancementLevel = this.getCurrentEnhancementLevel();
			const orderBook = this.currentOrderBookData.orderBooks[enhancementLevel];
			if (!orderBook) return null;
			const topAsk = orderBook.asks?.[0]?.price || null;
			const topBid = orderBook.bids?.[0]?.price || null;
			if (!topAsk && !topBid) return null;
			return {
				ask: topAsk,
				bid: topBid
			};
		}
		/**
		* Get color for buy price based on comparison mode
		* @param {number} lastBuy - Your last buy price
		* @param {Object|null} currentPrices - Current market prices { ask, bid }
		* @param {string} comparisonMode - 'instant' or 'listing'
		* @returns {string} Color code
		*/
		getBuyColor(lastBuy, currentPrices, _comparisonMode) {
			if (!currentPrices) return "#888";
			const comparePrice = currentPrices.ask;
			if (!comparePrice || comparePrice === -1) return "#888";
			if (comparePrice > lastBuy) return src_core_config_js.default.COLOR_LOSS;
			else if (comparePrice < lastBuy) return src_core_config_js.default.COLOR_PROFIT;
			return "#888";
		}
		/**
		* Get color for sell price based on comparison mode
		* @param {number} lastSell - Your last sell price
		* @param {Object|null} currentPrices - Current market prices { ask, bid }
		* @param {string} comparisonMode - 'instant' or 'listing'
		* @returns {string} Color code
		*/
		getSellColor(lastSell, currentPrices, comparisonMode) {
			if (!currentPrices) return "#888";
			const comparePrice = comparisonMode === "instant" ? currentPrices.bid : currentPrices.ask;
			if (!comparePrice || comparePrice === -1) return "#888";
			if (comparePrice > lastSell) return src_core_config_js.default.COLOR_PROFIT;
			else if (comparePrice < lastSell) return src_core_config_js.default.COLOR_LOSS;
			return "#888";
		}
		/**
		* Disable the display
		*/
		disable() {
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			if (this.unregisterWebSocket) {
				this.unregisterWebSocket();
				this.unregisterWebSocket = null;
			}
			document.querySelectorAll(".mwi-trade-history").forEach((el) => el.remove());
			this.isActive = false;
			this.currentItemHrid = null;
			this.currentEnhancementLevel = 0;
			this.currentOrderBookData = null;
			this.isInitialized = false;
		}
	};
	var tradeHistoryDisplay = new TradeHistoryDisplay();
	//#endregion
	//#region src/features/market/network-alert.js
	/**
	* Network Alert Display
	* Shows a warning message when market data cannot be fetched
	*/
	var NetworkAlert = class {
		constructor() {
			this.container = null;
			this.unregisterHandlers = [];
			this.isVisible = false;
		}
		/**
		* Initialize network alert display
		*/
		initialize() {
			if (!src_core_config_js.default.getSetting("networkAlert")) return;
			const existingElem = document.querySelector("[class*=\"Header_totalLevel\"]");
			if (existingElem) this.prepareContainer(existingElem);
			const unregister = src_core_dom_observer_js.default.onClass("NetworkAlert", "Header_totalLevel", (elem) => {
				this.prepareContainer(elem);
			});
			this.unregisterHandlers.push(unregister);
		}
		/**
		* Prepare container but don't show yet
		* @param {Element} totalLevelElem - Total level element
		*/
		prepareContainer(totalLevelElem) {
			if (this.container && document.body.contains(this.container)) return;
			if (this.container) this.container.remove();
			this.container = document.createElement("div");
			this.container.className = "mwi-network-alert";
			this.container.style.cssText = `
            display: none;
            font-size: 0.875rem;
            font-weight: 500;
            color: #ff4444;
            text-wrap: nowrap;
            margin-left: 16px;
        `;
			const networthElem = totalLevelElem.parentElement.querySelector(".mwi-networth-header");
			if (networthElem) networthElem.insertAdjacentElement("afterend", this.container);
			else totalLevelElem.insertAdjacentElement("afterend", this.container);
		}
		/**
		* Show the network alert
		* @param {string} message - Alert message to display
		*/
		show(message = (0, src_core_i18n_js.t)("⚠️ Market data unavailable")) {
			if (!src_core_config_js.default.getSetting("networkAlert")) return;
			if (!this.container || !document.body.contains(this.container)) {
				const totalLevelElem = document.querySelector("[class*=\"Header_totalLevel\"]");
				if (totalLevelElem) this.prepareContainer(totalLevelElem);
				else {
					console.warn("[Network Alert]", message);
					return;
				}
			}
			if (this.container) {
				this.container.textContent = message;
				this.container.style.display = "block";
				this.isVisible = true;
			}
		}
		/**
		* Hide the network alert
		*/
		hide() {
			if (this.container && document.body.contains(this.container)) {
				this.container.style.display = "none";
				this.isVisible = false;
			}
		}
		/**
		* Cleanup
		*/
		disable() {
			this.hide();
			if (this.container) {
				this.container.remove();
				this.container = null;
			}
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
		}
	};
	var networkAlert = new NetworkAlert();
	//#endregion
	//#region src/features/market/marketplace-shortcuts.js
	/**
	* Marketplace Shortcuts Module
	* Adds a "Marketplace Action" dropdown to the inventory item submenu
	* with quick actions: Sell Now, Buy Now, New Sell Listing, New Buy Listing
	*/
	/** Native input value setter for triggering React state updates */
	var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
	/**
	* MarketplaceShortcuts class manages the dropdown in item submenus
	*/
	var MarketplaceShortcuts = class {
		constructor() {
			this.unregisterHandlers = [];
			this.isInitialized = false;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.itemNameToHridCache = null;
			this.closeHandler = null;
			this.pendingQuantity = null;
			this.addMode = false;
		}
		/**
		* Initialize marketplace shortcuts feature
		*/
		initialize() {
			if (this.isInitialized) return;
			this.isInitialized = true;
			const unregister = src_core_dom_observer_js.default.onClass("MarketplaceShortcuts", "Item_actionMenu", (actionMenu) => {
				this.injectDropdown(actionMenu);
			});
			this.unregisterHandlers.push(unregister);
			const unregisterModal = src_core_dom_observer_js.default.onClass("MarketplaceShortcuts_modal", "Modal_modalContainer", (modal) => {
				this.autofillQuantity(modal);
				this.injectQuickInputButtons(modal);
				this.injectMultiplierButtons(modal);
				this.injectOwnedCount(modal);
				this.focusQuantityInput(modal);
			});
			this.unregisterHandlers.push(unregisterModal);
		}
		/**
		* Inject marketplace dropdown into the item action menu
		* @param {HTMLElement} actionMenu - The Item_actionMenu element
		*/
		injectDropdown(actionMenu) {
			if (!src_core_config_js.default.getSetting("market_marketplaceShortcuts")) return;
			if (actionMenu.querySelector(".mwi-marketplace-dropdown")) return;
			const nameEl = actionMenu.querySelector("[class*=\"Item_name\"]");
			if (!nameEl) return;
			const itemName = nameEl.textContent.trim();
			const itemHrid = this.findItemHrid(itemName);
			if (!itemHrid) return;
			itemNameTranslator.captureFromDOM(nameEl, itemHrid);
			let enhancementLevel = 0;
			const enhEl = actionMenu.querySelector("[class*=\"Item_enhancementLevel\"]");
			if (enhEl) {
				const match = enhEl.textContent.match(/\+(\d+)/);
				if (match) enhancementLevel = parseInt(match[1], 10);
			}
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData?.itemDetailMap) return;
			if (!gameData.itemDetailMap[itemHrid]?.isTradable) return;
			const gameButtons = Array.from(actionMenu.querySelectorAll("button")).filter((b) => !b.className.includes("mwi-"));
			const viewMarketplaceBtn = gameButtons[gameButtons.length - 1];
			if (!viewMarketplaceBtn) return;
			const dropdown = this.buildDropdown(actionMenu, itemHrid, enhancementLevel);
			viewMarketplaceBtn.insertAdjacentElement("afterend", dropdown);
		}
		/**
		* Build the dropdown UI
		* @param {HTMLElement} actionMenu - The action menu container
		* @param {string} itemHrid - Item HRID for marketplace navigation
		* @param {number} enhancementLevel - Enhancement level (0 for base items)
		* @returns {HTMLElement} Dropdown wrapper element
		*/
		buildDropdown(actionMenu, itemHrid, enhancementLevel = 0) {
			const wrapper = document.createElement("div");
			wrapper.classList.add("mwi-marketplace-dropdown");
			wrapper.style.cssText = "position: relative; width: 100%;";
			const toggle = document.createElement("button");
			const existingBtn = actionMenu.querySelector("button");
			if (existingBtn) toggle.className = existingBtn.className;
			toggle.classList.add("mwi-marketplace-dropdown-toggle");
			toggle.style.cssText = "display: flex; justify-content: space-between; align-items: center; width: 100%;";
			let ageHtml = "";
			const cacheEntry = estimatedListingAge.orderBooksCache[itemHrid];
			if (cacheEntry) {
				const orderBooks = (cacheEntry.data || cacheEntry)?.orderBooks;
				if (orderBooks) {
					const topAsk = (Array.isArray(orderBooks) ? orderBooks[enhancementLevel] : orderBooks[enhancementLevel])?.asks?.[0];
					if (topAsk?.createdTimestamp) {
						const ageMs = Date.now() - new Date(topAsk.createdTimestamp).getTime();
						if (ageMs > 0) {
							const ageStr = (0, src_utils_formatters_js.formatRelativeTime)(ageMs);
							ageHtml = `<div style="font-size: 0.7em; opacity: 0.7; margin-top: 1px;">${(0, src_core_i18n_js.t)("Top ask: ~{0}", ageStr)}</div>`;
						}
					}
				}
			}
			toggle.innerHTML = "<span style=\"flex: 1; text-align: center;\">" + (0, src_core_i18n_js.t)("Marketplace Action") + ageHtml + "</span><span class=\"mwi-mp-chevron\" style=\"font-size: 0.65em; transition: transform 0.15s; display: inline-block;\">▼</span>";
			const panel = document.createElement("div");
			panel.classList.add("mwi-marketplace-dropdown-panel");
			panel.style.cssText = `
            display: none;
            position: absolute;
            top: calc(100% + 4px);
            left: 0;
            width: 100%;
            z-index: 9999;
            flex-direction: column;
            background: var(--color-surface, #1e1e2e);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
            padding: 4px;
            gap: 3px;
            box-sizing: border-box;
        `;
			const actions = [
				{
					label: (0, src_core_i18n_js.t)("Sell Now"),
					type: "sell",
					color: "#c2410c"
				},
				{
					label: (0, src_core_i18n_js.t)("Buy Now"),
					type: "buy",
					color: "#2fc4a7"
				},
				{
					label: (0, src_core_i18n_js.t)("New Sell Listing"),
					type: "sell-listing",
					color: "#9a3412"
				},
				{
					label: (0, src_core_i18n_js.t)("New Buy Listing"),
					type: "buy-listing",
					color: "#2fc4a7"
				}
			];
			for (const action of actions) {
				const btn = document.createElement("button");
				btn.textContent = action.label;
				btn.style.cssText = `
                display: block;
                width: 100%;
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.85rem;
                font-weight: 600;
                color: #fff;
                background: ${action.color};
                text-align: center;
                transition: opacity 0.15s;
            `;
				btn.addEventListener("mouseenter", () => {
					btn.style.opacity = "0.85";
				});
				btn.addEventListener("mouseleave", () => {
					btn.style.opacity = "1";
				});
				btn.addEventListener("click", (e) => {
					e.stopPropagation();
					e.preventDefault();
					closePanel();
					document.dispatchEvent(new KeyboardEvent("keydown", {
						key: "Escape",
						code: "Escape",
						keyCode: 27,
						which: 27,
						bubbles: true,
						cancelable: true
					}));
					this.executeAction(action.type, itemHrid, enhancementLevel);
				});
				panel.appendChild(btn);
			}
			let open = false;
			const closePanel = () => {
				open = false;
				panel.style.display = "none";
				const chevron = toggle.querySelector(".mwi-mp-chevron");
				if (chevron) chevron.style.transform = "";
			};
			toggle.addEventListener("click", (e) => {
				e.stopPropagation();
				e.preventDefault();
				open = !open;
				panel.style.display = open ? "flex" : "none";
				const chevron = toggle.querySelector(".mwi-mp-chevron");
				if (chevron) chevron.style.transform = open ? "rotate(180deg)" : "";
			});
			this.closeHandler = () => closePanel();
			document.addEventListener("click", this.closeHandler);
			wrapper.appendChild(toggle);
			wrapper.appendChild(panel);
			return wrapper;
		}
		/**
		* Execute a marketplace action
		* @param {string} actionType - 'sell', 'buy', 'sell-listing', 'buy-listing'
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level (0 for base items)
		*/
		async executeAction(actionType, itemHrid, enhancementLevel = 0) {
			const amountInput = document.querySelector("[class*=\"Item_amountInputContainer\"] input[type=\"number\"]");
			if (amountInput) {
				const qty = parseInt(amountInput.value, 10);
				if (qty > 0) this.pendingQuantity = qty;
			}
			if (!this.pendingQuantity && (actionType === "sell" || actionType === "sell-listing")) {
				const match = (src_core_data_manager_js.default.characterItems || []).find((item) => item.itemHrid === itemHrid && (item.enhancementLevel || 0) === enhancementLevel && item.itemLocationHrid === "/item_locations/inventory");
				if (match && match.count > 0) this.pendingQuantity = match.count;
			}
			navigateToMarketplace(itemHrid, enhancementLevel);
			await new Promise((r) => setTimeout(r, 300));
			try {
				switch (actionType) {
					case "sell":
						await this.clickInstantActionButton();
						break;
					case "buy":
						await this.clickInstantActionButton();
						break;
					case "sell-listing":
						await this.clickListingButton("Button_sell");
						break;
					case "buy-listing": await this.clickListingButton("Button_buy");
				}
			} catch {
				if (actionType === "sell") await this.clickListingButton("Button_sell").catch(() => {});
				else if (actionType === "buy") await this.clickListingButton("Button_buy").catch(() => {});
			}
		}
		/**
		* Find and click an instant action button (Sell/Buy) on the marketplace order book.
		* These buttons have text inside MarketplacePanel_actionButtonText divs.
		* @param {string} buttonText - 'Sell' or 'Buy'
		* @param {number} timeout - Max wait time in ms (default 3000)
		* @returns {Promise<void>}
		*/
		async clickInstantActionButton(timeout = 3e3) {
			const start = Date.now();
			return new Promise((resolve, reject) => {
				const interval = setInterval(() => {
					const actionTexts = document.querySelectorAll("[class*=\"MarketplacePanel_actionButtonText\"]");
					for (const div of actionTexts) if (!div.querySelector("svg")) {
						const parentBtn = div.closest("button");
						if (parentBtn) {
							clearInterval(interval);
							parentBtn.click();
							resolve();
							return;
						}
					}
					if (Date.now() - start > timeout) {
						clearInterval(interval);
						reject(/* @__PURE__ */ new Error("Timeout waiting for instant action button"));
					}
				}, 50);
				this.timerRegistry.registerInterval(interval);
			});
		}
		/**
		* Find and click a new listing button (+ New Sell Listing / + New Buy Listing).
		* These buttons use game's Button_sell or Button_buy CSS classes.
		* @param {string} buttonText - Full button text to match
		* @param {string} partialClass - Partial CSS class to match (e.g. 'Button_sell')
		* @param {number} timeout - Max wait time in ms (default 3000)
		* @returns {Promise<void>}
		*/
		async clickListingButton(partialClass, timeout = 3e3) {
			const start = Date.now();
			return new Promise((resolve, reject) => {
				const interval = setInterval(() => {
					const candidates = document.querySelectorAll(`[class*="${partialClass}"]`);
					for (const btn of candidates) if (!btn.disabled) {
						clearInterval(interval);
						btn.click();
						resolve();
						return;
					}
					if (Date.now() - start > timeout) {
						clearInterval(interval);
						reject(/* @__PURE__ */ new Error(`Timeout waiting for listing button (class: ${partialClass})`));
					}
				}, 50);
				this.timerRegistry.registerInterval(interval);
			});
		}
		/**
		* Autofill quantity into a marketplace modal when it appears.
		* Delayed slightly to run after auto-click-max has processed the modal.
		* @param {HTMLElement} modal - Modal container element
		*/
		autofillQuantity(modal) {
			if (!this.pendingQuantity) return;
			if (!modal.querySelector("div[class*=\"MarketplacePanel_header\"]")) return;
			const qty = this.pendingQuantity;
			this.pendingQuantity = null;
			setTimeout(() => {
				const quantityInput = this.findQuantityInput(modal);
				if (!quantityInput) return;
				nativeInputValueSetter.call(quantityInput, qty.toString());
				quantityInput.dispatchEvent(new Event("input", { bubbles: true }));
			}, 100);
		}
		/**
		* Auto-focus the quantity input when a marketplace modal opens.
		* Runs after autofill to avoid interfering with value setting.
		* @param {HTMLElement} modal - Modal container element
		*/
		focusQuantityInput(modal) {
			if (!modal.querySelector("div[class*=\"MarketplacePanel_header\"]")) return;
			if (modal.querySelector("[class*=\"Button_sell\"]")) return;
			setTimeout(() => {
				const quantityInput = this.findQuantityInput(modal);
				if (quantityInput) {
					quantityInput.focus();
					quantityInput.select();
				}
			}, 150);
		}
		/**
		* Inject quick input buttons (10, 100, 1000, + toggle) into a marketplace modal.
		* @param {HTMLElement} modal - Modal container element
		*/
		injectQuickInputButtons(modal) {
			if (!src_core_config_js.default.getSetting("market_quickInputButtons")) return;
			if (!modal.querySelector("div[class*=\"MarketplacePanel_header\"]")) return;
			setTimeout(() => {
				if (modal.querySelector(".mwi-mp-quick-input")) return;
				const quantityInput = this.findQuantityInput(modal);
				if (!quantityInput) return;
				const row = document.createElement("div");
				row.className = "mwi-mp-quick-input";
				row.style.cssText = "display: flex; align-items: center; justify-content: center; gap: 2px; margin-top: 2px;";
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
				const applyToggleStyle = (active) => {
					if (active) {
						addToggle.style.background = "rgba(215, 183, 255, 0.2)";
						addToggle.style.color = "#d7b7ff";
						addToggle.style.borderColor = "#d7b7ff";
					} else {
						addToggle.style.background = "transparent";
						addToggle.style.color = "rgba(215, 183, 255, 0.5)";
						addToggle.style.borderColor = "rgba(215, 183, 255, 0.3)";
					}
				};
				applyToggleStyle(this.addMode);
				addToggle.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					this.addMode = !this.addMode;
					applyToggleStyle(this.addMode);
				});
				row.appendChild(addToggle);
				const defaults = [
					10,
					100,
					1e3
				];
				const parsed = src_core_config_js.default.getSettingValue("market_quickInputButtons_presets", "").split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => Number.isFinite(n) && n > 0);
				const presetValues = parsed.length > 0 ? [...new Set(parsed)].sort((a, b) => a - b).slice(0, 8) : defaults;
				for (const value of presetValues) {
					const btn = document.createElement("button");
					btn.textContent = value.toLocaleString();
					btn.className = "mwi-quick-input-btn";
					btn.style.cssText = `
                    background-color: white;
                    color: black;
                    padding: 1px 6px;
                    margin: 1px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 0.9em;
                `;
					btn.addEventListener("mouseenter", () => {
						btn.style.backgroundColor = "#f0f0f0";
					});
					btn.addEventListener("mouseleave", () => {
						btn.style.backgroundColor = "white";
					});
					btn.addEventListener("click", (e) => {
						e.preventDefault();
						e.stopPropagation();
						if (this.addMode) {
							const current = parseInt(quantityInput.value) || 0;
							(0, src_utils_react_input_js.setReactInputValue)(quantityInput, current + value, { focus: true });
						} else (0, src_utils_react_input_js.setReactInputValue)(quantityInput, value, { focus: true });
					});
					row.appendChild(btn);
				}
				const inputRow = quantityInput.closest("div")?.parentElement?.parentElement;
				if (inputRow) inputRow.insertAdjacentElement("afterend", row);
			}, 150);
		}
		/**
		* Inject "owned: X" count into Buy Now / Buy Listing modals.
		* @param {HTMLElement} modal - Modal container element
		*/
		injectOwnedCount(modal) {
			if (!src_core_config_js.default.getSetting("market_showOwnedInBuyModal")) return;
			if (!modal.querySelector("div[class*=\"MarketplacePanel_header\"]")) return;
			if (modal.querySelector("[class*=\"Button_sell\"]")) return;
			setTimeout(() => {
				if (modal.querySelector(".mwi-owned-count")) return;
				const useEl = modal.querySelector("svg use[href], svg use[xlink\\:href]");
				if (!useEl) return;
				const href = useEl.getAttribute("href") || useEl.getAttribute("xlink:href");
				if (!href) return;
				const idMatch = href.match(/#(.+)$/);
				if (!idMatch) return;
				const itemHrid = `/items/${idMatch[1]}`;
				let enhancementLevel = 0;
				const allInputs = modal.querySelectorAll("input[type=\"number\"]");
				if (allInputs.length >= 2) enhancementLevel = parseInt(allInputs[0].value) || 0;
				const inventory = src_core_data_manager_js.default.characterItems || [];
				let count = 0;
				for (const item of inventory) if (item.itemHrid === itemHrid && (item.enhancementLevel || 0) === enhancementLevel && item.itemLocationHrid === "/item_locations/inventory") count += item.count || 0;
				const quantityInput = this.findQuantityInput(modal);
				if (!quantityInput) return;
				const quantityRow = quantityInput.closest("div")?.parentElement?.parentElement;
				if (!quantityRow) return;
				const ownedEl = document.createElement("div");
				ownedEl.className = "mwi-owned-count";
				ownedEl.style.cssText = `text-align: center; font-size: 13px; color: ${src_core_config_js.default.COLOR_TEXT_SECONDARY}; margin: 4px 0;`;
				ownedEl.innerHTML = `${(0, src_core_i18n_js.t)("Owned: ")}<span style="color: ${src_core_config_js.default.COLOR_ACCENT}; font-weight: 600;">${(0, src_utils_formatters_js.formatWithSeparator)(count)}</span>`;
				quantityRow.insertAdjacentElement("beforebegin", ownedEl);
			}, 100);
		}
		/**
		* Find the quantity input in a marketplace modal.
		* Equipment items have multiple number inputs (enhancement level + quantity).
		* Quantity is the last number input in equipment modals.
		* @param {HTMLElement} modal - Modal container element
		* @returns {HTMLInputElement|null} Quantity input element or null
		*/
		findQuantityInput(modal) {
			const allInputs = Array.from(modal.querySelectorAll("input[type=\"number\"]"));
			if (allInputs.length === 0) return null;
			if (allInputs.length === 1) return allInputs[0];
			return allInputs[allInputs.length - 1];
		}
		/**
		* Find item HRID by name using game data
		* @param {string} itemName - Item display name
		* @returns {string|null} Item HRID or null
		*/
		findItemHrid(itemName) {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData?.itemDetailMap) return null;
			if (!this.itemNameToHridCache) {
				this.itemNameToHridCache = /* @__PURE__ */ new Map();
				for (const [hrid, item] of Object.entries(gameData.itemDetailMap)) if (item.name) this.itemNameToHridCache.set(item.name, hrid);
			}
			return this.itemNameToHridCache.get(itemName) || null;
		}
		/**
		* Inject ÷2 and ×2 multiplier buttons into price and quantity rows.
		* @param {HTMLElement} modal - Modal container element
		*/
		injectMultiplierButtons(modal) {
			if (!src_core_config_js.default.getSetting("market_multiplierButtons")) return;
			if (!modal.querySelector("div[class*=\"MarketplacePanel_header\"]")) return;
			setTimeout(() => {
				if (modal.querySelector(".mwi-mp-multiplier")) return;
				const priceRow = modal.querySelector("div[class*=\"MarketplacePanel_priceInputs\"]");
				const quantityRow = modal.querySelector("div[class*=\"MarketplacePanel_quantityInputs\"]");
				for (const row of [priceRow, quantityRow]) {
					if (!row) continue;
					const input = row.querySelector("input[type=\"number\"]");
					if (!input) continue;
					const buttonContainers = row.querySelectorAll("div[class*=\"MarketplacePanel_buttonContainer\"]");
					if (buttonContainers.length < 2) continue;
					const firstContainer = buttonContainers[0];
					const lastContainer = buttonContainers[buttonContainers.length - 1];
					const btnClass = firstContainer.querySelector("button")?.className || "";
					const divideWrapper = document.createElement("div");
					divideWrapper.className = firstContainer.className + " mwi-mp-multiplier";
					const divideBtn = document.createElement("button");
					divideBtn.className = btnClass;
					divideBtn.textContent = "÷2";
					divideBtn.addEventListener("click", (e) => {
						e.preventDefault();
						e.stopPropagation();
						const current = parseInt(input.value) || 0;
						(0, src_utils_react_input_js.setReactInputValue)(input, Math.max(1, Math.floor(current / 2)));
					});
					divideWrapper.appendChild(divideBtn);
					const multiplyWrapper = document.createElement("div");
					multiplyWrapper.className = lastContainer.className + " mwi-mp-multiplier";
					const multiplyBtn = document.createElement("button");
					multiplyBtn.className = btnClass;
					multiplyBtn.textContent = "×2";
					multiplyBtn.addEventListener("click", (e) => {
						e.preventDefault();
						e.stopPropagation();
						const current = parseInt(input.value) || 0;
						(0, src_utils_react_input_js.setReactInputValue)(input, current * 2);
					});
					multiplyWrapper.appendChild(multiplyBtn);
					firstContainer.insertAdjacentElement("beforebegin", divideWrapper);
					lastContainer.insertAdjacentElement("afterend", multiplyWrapper);
				}
			}, 100);
		}
		/**
		* Disable and cleanup
		*/
		disable() {
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			if (this.closeHandler) {
				document.removeEventListener("click", this.closeHandler);
				this.closeHandler = null;
			}
			this.timerRegistry.clearAll();
			document.querySelectorAll(".mwi-marketplace-dropdown").forEach((el) => el.remove());
			document.querySelectorAll(".mwi-mp-quick-input").forEach((el) => el.remove());
			document.querySelectorAll(".mwi-mp-multiplier").forEach((el) => el.remove());
			this.itemNameToHridCache = null;
			this.isInitialized = false;
		}
	};
	var marketplaceShortcuts = new MarketplaceShortcuts();
	marketplaceShortcuts.initialize();
	//#endregion
	//#region src/features/market/sell-queue.js
	/**
	* Sell Queue
	* Shift+RightClick inventory items to queue them for selling.
	* Creates marketplace tabs for each queued item; tabs auto-close when item count hits 0.
	*/
	var timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
	/** @type {Array<{itemHrid: string, itemName: string}>} */
	var queue = [];
	/** @type {HTMLElement[]} */
	var currentTabs = [];
	var cleanupObserver = null;
	var inventoryUpdateHandler = null;
	var currentItemHrid = null;
	var tooltipObserverUnregister = null;
	var contextMenuHandler = null;
	var isActive = false;
	/**
	* Get total inventory count for an item hrid.
	* @param {string} itemHrid
	* @returns {number}
	*/
	function getInventoryCount(itemHrid) {
		const inventory = src_core_data_manager_js.default.getInventory();
		if (!inventory) return 0;
		return inventory.filter((i) => i.itemHrid === itemHrid && i.itemLocationHrid === "/item_locations/inventory").reduce((sum, i) => sum + (i.count || 0), 0);
	}
	/**
	* Navigate to the marketplace by clicking its navbar button.
	* @returns {Promise<boolean>}
	*/
	async function openMarketplacePage() {
		const navButtons = document.querySelectorAll(".NavigationBar_nav__3uuUl");
		const marketplaceButton = Array.from(navButtons).find((nav) => nav.querySelector("svg[aria-label=\"navigationBar.marketplace\"]"));
		if (!marketplaceButton) return false;
		marketplaceButton.click();
		return await waitForMarketplace();
	}
	/**
	* Wait for the marketplace tabs container to appear.
	* @returns {Promise<boolean>}
	*/
	async function waitForMarketplace() {
		for (let i = 0; i < 50; i++) {
			const tabsContainer = document.querySelector(".MuiTabs-flexContainer[role=\"tablist\"]");
			if (tabsContainer) {
				if (Array.from(tabsContainer.children).some((btn) => btn.textContent.includes("Market Listings"))) return true;
			}
			await new Promise((resolve) => {
				timerRegistry.registerTimeout(setTimeout(resolve, 100));
			});
		}
		return false;
	}
	/**
	* Inject tabs for all queued items into the marketplace tab strip.
	*/
	function injectTabs() {
		const tabsContainer = document.querySelector(".MuiTabs-flexContainer[role=\"tablist\"]");
		if (!tabsContainer) return;
		removeMaterialTabs();
		currentTabs.length = 0;
		const referenceTab = Array.from(tabsContainer.children).find((btn) => btn.textContent.includes("My Listings"));
		if (!referenceTab) return;
		tabsContainer.style.flexWrap = "wrap";
		for (const entry of queue) {
			const count = getInventoryCount(entry.itemHrid);
			const tab = createMaterialTab({
				itemHrid: entry.itemHrid,
				itemName: entry.itemName,
				missing: 0,
				required: count,
				isTradeable: true
			}, referenceTab, (_e, mat) => {
				navigateToMarketplace(mat.itemHrid, 0);
			});
			const badgeSpan = tab.querySelector("[class*=\"TabsComponent_badge\"]");
			if (badgeSpan) badgeSpan.innerHTML = buildBadgeHtml(entry.itemName, count);
			tabsContainer.appendChild(tab);
			currentTabs.push(tab);
		}
	}
	/**
	* Build badge HTML for a queued item tab.
	* @param {string} itemName
	* @param {number} count
	* @returns {string}
	*/
	function buildBadgeHtml(itemName, count) {
		return `<div style="text-align:center;"><div>${itemName.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")}</div><div style="font-size:0.75em;color:${count > 0 ? "#4ade80" : "#6b7280"};">${count > 0 ? `In bag: ${count.toLocaleString()}` : "Sold out"}</div></div>`;
	}
	/**
	* Update tab badges and remove tabs for items that have sold out.
	* Auto-navigates to the next queued item when the current one sells out.
	*/
	function updateTabsOnInventoryChange() {
		if (currentTabs.length === 0) return;
		const toRemove = [];
		currentTabs.forEach((tab) => {
			const itemHrid = tab.getAttribute("data-item-hrid");
			const entry = queue.find((e) => e.itemHrid === itemHrid);
			if (!entry) return;
			const count = getInventoryCount(entry.itemHrid);
			const badgeSpan = tab.querySelector("[class*=\"TabsComponent_badge\"]");
			if (badgeSpan) badgeSpan.innerHTML = buildBadgeHtml(entry.itemName, count);
			if (count === 0) toRemove.push(itemHrid);
		});
		for (const hrid of toRemove) {
			const idx = queue.findIndex((e) => e.itemHrid === hrid);
			if (idx !== -1) queue.splice(idx, 1);
			const tabIdx = currentTabs.findIndex((t) => t.getAttribute("data-item-hrid") === hrid);
			if (tabIdx !== -1) {
				currentTabs[tabIdx].remove();
				currentTabs.splice(tabIdx, 1);
			}
		}
		if (toRemove.length > 0 && queue.length > 0) navigateToMarketplace(queue[0].itemHrid, 0);
	}
	/**
	* Set up WebSocket listener to update tabs when inventory changes.
	*/
	function setupInventoryListener() {
		if (inventoryUpdateHandler) src_core_websocket_js.default.off("*", inventoryUpdateHandler);
		inventoryUpdateHandler = (data) => {
			if (data.type?.includes("item") || data.type?.includes("inventory") || data.type?.includes("market") || data.inventory || data.characterItems) updateTabsOnInventoryChange();
		};
		src_core_websocket_js.default.on("*", inventoryUpdateHandler);
	}
	/**
	* Handle cleanup when user leaves the marketplace.
	*/
	function handleMarketplaceCleanup() {
		removeMaterialTabs();
		currentTabs.length = 0;
		queue.length = 0;
		if (inventoryUpdateHandler) {
			src_core_websocket_js.default.off("*", inventoryUpdateHandler);
			inventoryUpdateHandler = null;
		}
	}
	/**
	* Add an item to the queue and inject/update tabs.
	* @param {string} itemHrid
	* @param {string} itemName
	*/
	async function addToQueue(itemHrid, itemName) {
		if (queue.some((e) => e.itemHrid === itemHrid)) return;
		if (getInventoryCount(itemHrid) === 0) return;
		const isFirstItem = queue.length === 0;
		queue.push({
			itemHrid,
			itemName
		});
		if (isFirstItem) {
			const tabsContainer = document.querySelector(".MuiTabs-flexContainer[role=\"tablist\"]");
			if (!(tabsContainer && Array.from(tabsContainer.children).some((btn) => btn.textContent.includes("Market Listings")))) {
				if (!await openMarketplacePage()) {
					queue.length = 0;
					return;
				}
				await new Promise((resolve) => {
					timerRegistry.registerTimeout(setTimeout(resolve, 200));
				});
			}
			cleanupObserver = setupMarketplaceCleanupObserver(handleMarketplaceCleanup, currentTabs);
			setupInventoryListener();
		}
		injectTabs();
		navigateToMarketplace(itemHrid, 0);
	}
	/**
	* Track the hovered item HRID via tooltip observer (same strategy as alt-click-navigation).
	* @param {HTMLElement} tooltipElement
	*/
	function handleTooltipAppear(tooltipElement) {
		currentItemHrid = null;
		try {
			const itemLink = tooltipElement.querySelector("a[href*=\"/items/\"]");
			if (itemLink) {
				const match = itemLink.getAttribute("href").match(/\/items\/(.+?)(?:\/|$)/);
				if (match) {
					currentItemHrid = `/items/${match[1]}`;
					return;
				}
			}
			const svgUse = tooltipElement.querySelector("use[href*=\"items_sprite\"]");
			if (svgUse) {
				const match = svgUse.getAttribute("href").match(/#(.+)$/);
				if (match) {
					currentItemHrid = `/items/${match[1]}`;
					return;
				}
			}
			const nameEl = tooltipElement.querySelector("[class*=\"ItemTooltipText_name\"] span, .ItemTooltipText_name__2JAHA span");
			if (nameEl) currentItemHrid = `/items/${nameEl.textContent.trim().toLowerCase().replace(/\s+/g, "_")}`;
		} catch (error) {
			console.error("[SellQueue] Error parsing tooltip:", error);
		}
	}
	function initialize() {
		if (isActive) return;
		if (!src_core_config_js.default.getSetting("sellQueue")) return;
		tooltipObserverUnregister = src_core_dom_observer_js.default.onClass("SellQueue-Tooltip", "MuiTooltip-popper", (el) => handleTooltipAppear(el));
		contextMenuHandler = (event) => {
			if (!event.shiftKey) return;
			if (!event.target.closest("[class*=\"Inventory_items\"], [class*=\"Inventory_inventory\"]")) return;
			if (!currentItemHrid) return;
			event.preventDefault();
			event.stopPropagation();
			const itemDetails = src_core_data_manager_js.default.getInitClientData()?.itemDetailMap?.[currentItemHrid];
			if (!itemDetails) return;
			if (!itemDetails.isTradable) return;
			addToQueue(currentItemHrid, itemDetails.name);
		};
		document.addEventListener("contextmenu", contextMenuHandler, true);
		isActive = true;
	}
	function cleanup() {
		if (contextMenuHandler) {
			document.removeEventListener("contextmenu", contextMenuHandler, true);
			contextMenuHandler = null;
		}
		if (tooltipObserverUnregister) {
			tooltipObserverUnregister();
			tooltipObserverUnregister = null;
		}
		if (cleanupObserver) {
			cleanupObserver();
			cleanupObserver = null;
		}
		handleMarketplaceCleanup();
		timerRegistry.clearAll();
		currentItemHrid = null;
		isActive = false;
	}
	src_core_config_js.default.onSettingChange("sellQueue", (value) => {
		if (value) initialize();
		else cleanup();
	});
	var sell_queue_default = {
		name: "Sell Queue",
		initialize,
		cleanup
	};
	//#endregion
	//#region src/features/market/milkyway-market-link.js
	/**
	* MilkyWay Market Link
	* Adds a small link to view the current marketplace item on milkyway.market.
	*/
	var LINK_ID = "mwi-milkyway-market-link";
	var MilkyWayMarketLink = class {
		constructor() {
			this.isInitialized = false;
			this.unregisterHandler = null;
			this.currentItemHrid = null;
		}
		initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.getSetting("market_milkywayMarketLink")) return;
			this.isInitialized = true;
			const handler = (data) => {
				if (!data.marketItemOrderBooks) return;
				this.currentItemHrid = data.marketItemOrderBooks.itemHrid;
				this._updateLink();
			};
			src_core_data_manager_js.default.on("market_item_order_books_updated", handler);
			this.unregisterHandler = () => src_core_data_manager_js.default.off("market_item_order_books_updated", handler);
		}
		/**
		* Get current enhancement level from DOM.
		* @returns {number}
		*/
		_getEnhancementLevel() {
			const currentItem = document.querySelector("[class*=\"MarketplacePanel_currentItem\"]");
			if (!currentItem) return 0;
			const el = currentItem.querySelector("[class*=\"Item_enhancementLevel\"]");
			if (!el) return 0;
			const match = el.textContent.match(/\+(\d+)/);
			return match ? parseInt(match[1], 10) : 0;
		}
		_updateLink() {
			const existing = document.getElementById(LINK_ID);
			if (existing) existing.remove();
			if (!this.currentItemHrid) return;
			const container = document.querySelector("[class*=\"MarketplacePanel_marketNavButtonContainer\"]");
			if (!container) return;
			const enhancement = this._getEnhancementLevel();
			const url = `https://milkyway.market/items/${this.currentItemHrid.replace("/items/", "")}${enhancement > 0 ? `?enhancement=${enhancement}` : ""}`;
			const link = document.createElement("a");
			link.id = LINK_ID;
			link.href = url;
			link.target = "_blank";
			link.rel = "noopener noreferrer";
			link.textContent = (0, src_core_i18n_js.t)("MilkyWay Market ↗");
			link.style.cssText = `
            font-size: 10px;
            color: #888;
            text-decoration: none;
            margin-left: 8px;
            white-space: nowrap;
        `;
			link.addEventListener("mouseenter", () => link.style.opacity = "0.7");
			link.addEventListener("mouseleave", () => link.style.opacity = "1");
			container.appendChild(link);
		}
		disable() {
			if (this.unregisterHandler) {
				this.unregisterHandler();
				this.unregisterHandler = null;
			}
			document.getElementById(LINK_ID)?.remove();
			this.currentItemHrid = null;
			this.isInitialized = false;
		}
	};
	var milkywayMarketLink = new MilkyWayMarketLink();
	//#endregion
	//#region src/core/connection-state.js
	var CONNECTION_STATES = {
		CONNECTED: "connected",
		DISCONNECTED: "disconnected",
		RECONNECTING: "reconnecting"
	};
	var ConnectionState = class {
		constructor() {
			this.state = CONNECTION_STATES.RECONNECTING;
			this.eventListeners = /* @__PURE__ */ new Map();
			this.lastDisconnectedAt = null;
			this.lastConnectedAt = null;
			this.setupListeners();
		}
		/**
		* Get current connection state
		* @returns {string} Connection state (connected, disconnected, reconnecting)
		*/
		getState() {
			return this.state;
		}
		/**
		* Check if currently connected
		* @returns {boolean} True if connected
		*/
		isConnected() {
			return this.state === CONNECTION_STATES.CONNECTED;
		}
		/**
		* Register a listener for connection events
		* @param {string} event - Event name (disconnected, reconnected)
		* @param {Function} callback - Handler function
		*/
		on(event, callback) {
			if (!this.eventListeners.has(event)) this.eventListeners.set(event, []);
			this.eventListeners.get(event).push(callback);
		}
		/**
		* Unregister a connection event listener
		* @param {string} event - Event name
		* @param {Function} callback - Handler function to remove
		*/
		off(event, callback) {
			const listeners = this.eventListeners.get(event);
			if (listeners) {
				const index = listeners.indexOf(callback);
				if (index > -1) listeners.splice(index, 1);
			}
		}
		/**
		* Notify connection state from character initialization
		* @param {Object} data - Character initialization payload
		*/
		handleCharacterInitialized(data) {
			if (!data) return;
			this.setConnected("character_initialized");
		}
		setupListeners() {
			src_core_websocket_js.default.onSocketEvent("open", () => {
				this.setReconnecting("socket_open", { allowConnected: true });
			});
			src_core_websocket_js.default.onSocketEvent("close", (event) => {
				this.setDisconnected("socket_close", event);
			});
			src_core_websocket_js.default.onSocketEvent("error", (event) => {
				this.setDisconnected("socket_error", event);
			});
			src_core_websocket_js.default.on("init_character_data", () => {
				this.setConnected("init_character_data");
			});
		}
		setReconnecting(reason, options = {}) {
			if (this.state === CONNECTION_STATES.CONNECTED && !options.allowConnected) return;
			this.updateState(CONNECTION_STATES.RECONNECTING, { reason });
		}
		setDisconnected(reason, event) {
			if (this.state === CONNECTION_STATES.DISCONNECTED) return;
			this.lastDisconnectedAt = Date.now();
			this.updateState(CONNECTION_STATES.DISCONNECTED, {
				reason,
				event,
				disconnectedAt: this.lastDisconnectedAt
			});
		}
		setConnected(reason) {
			if (this.state === CONNECTION_STATES.CONNECTED) return;
			this.lastConnectedAt = Date.now();
			this.updateState(CONNECTION_STATES.CONNECTED, {
				reason,
				disconnectedAt: this.lastDisconnectedAt,
				connectedAt: this.lastConnectedAt
			});
		}
		updateState(nextState, details) {
			if (this.state === nextState) return;
			const previousState = this.state;
			this.state = nextState;
			if (nextState === CONNECTION_STATES.DISCONNECTED) {
				this.emit("disconnected", {
					previousState,
					...details
				});
				return;
			}
			if (nextState === CONNECTION_STATES.CONNECTED) this.emit("reconnected", {
				previousState,
				...details
			});
		}
		emit(event, data) {
			const listeners = this.eventListeners.get(event) || [];
			for (const listener of listeners) try {
				listener(data);
			} catch (error) {
				console.error("[ConnectionState] Listener error:", error);
			}
		}
	};
	var connectionState = new ConnectionState();
	//#endregion
	//#region src/features/actions/production-profit.js
	/**
	* Production Profit Calculator
	*
	* Calculates comprehensive profit/hour for production actions (Brewing, Cooking, Crafting, Tailoring, Cheesesmithing)
	* Reuses existing profit calculator from tooltip system.
	*/
	//#endregion
	//#region src/features/tasks/task-profit-calculator.js
	/**
	* Task Profit Calculator
	* Calculates total profit for gathering and production tasks
	* Includes task rewards (coins, task tokens, Purple's Gift) + action profit
	*/
	/**
	* Calculate Task Token value from Task Shop items
	* Uses same approach as Ranged Way Idle - find best Task Shop item
	* @returns {Object} Token value breakdown or error state
	*/
	function calculateTaskTokenValue() {
		if (!expectedValueCalculator.isInitialized) return {
			tokenValue: null,
			giftPerTask: null,
			totalPerToken: null,
			error: "Market data not loaded"
		};
		const expectedValues = [
			"/items/large_meteorite_cache",
			"/items/large_artisans_crate",
			"/items/large_treasure_chest"
		].map((itemHrid) => {
			const result = expectedValueCalculator.calculateExpectedValue(itemHrid);
			if (!result) console.warn(`[TaskProfit] Expected value returned null for task shop item: ${itemHrid}`);
			return result?.expectedValue || 0;
		});
		const taskTokenValue = Math.max(...expectedValues) / 30;
		const giftResult = expectedValueCalculator.calculateExpectedValue("/items/purples_gift");
		if (!giftResult) console.warn("[TaskProfit] Expected value returned null for /items/purples_gift");
		const giftPerTask = (giftResult?.expectedValue || 0) / 50;
		return {
			tokenValue: taskTokenValue,
			giftPerTask,
			totalPerToken: taskTokenValue + giftPerTask,
			error: null
		};
	}
	//#endregion
	//#region src/features/networth/networth-cache.js
	/**
	* Networth Cache
	* LRU cache for expensive enhancement cost calculations
	* Prevents recalculating the same enhancement paths repeatedly
	*/
	var NetworthCache = class {
		constructor(maxSize = 100) {
			this.maxSize = maxSize;
			this.cache = /* @__PURE__ */ new Map();
			this.marketDataHash = null;
		}
		/**
		* Generate cache key for enhancement calculation
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level
		* @returns {string} Cache key
		*/
		generateKey(itemHrid, enhancementLevel) {
			return `${itemHrid}_${enhancementLevel}`;
		}
		/**
		* Generate hash of market data for cache invalidation
		* Uses first 10 items' prices as a simple hash
		* @param {Object} marketData - Market data object
		* @returns {string} Hash string
		*/
		generateMarketHash(marketData) {
			if (!marketData || !marketData.marketData) return "empty";
			return Object.entries(marketData.marketData).slice(0, 10).map(([hrid, data]) => {
				return `${hrid}:${data[0]?.a || 0}:${data[0]?.b || 0}`;
			}).join("|");
		}
		/**
		* Check if market data has changed and invalidate cache if needed
		* @param {Object} marketData - Current market data
		*/
		checkAndInvalidate(marketData) {
			const newHash = this.generateMarketHash(marketData);
			if (this.marketDataHash !== null && this.marketDataHash !== newHash) this.clear();
			this.marketDataHash = newHash;
		}
		/**
		* Get cached enhancement cost
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level
		* @returns {number|null} Cached cost or null if not found
		*/
		get(itemHrid, enhancementLevel) {
			const key = this.generateKey(itemHrid, enhancementLevel);
			if (!this.cache.has(key)) return null;
			const value = this.cache.get(key);
			this.cache.delete(key);
			this.cache.set(key, value);
			return value;
		}
		/**
		* Set cached enhancement cost
		* @param {string} itemHrid - Item HRID
		* @param {number} enhancementLevel - Enhancement level
		* @param {number} cost - Enhancement cost
		*/
		set(itemHrid, enhancementLevel, cost) {
			const key = this.generateKey(itemHrid, enhancementLevel);
			if (this.cache.has(key)) this.cache.delete(key);
			this.cache.set(key, cost);
			if (this.cache.size > this.maxSize) {
				const firstKey = this.cache.keys().next().value;
				this.cache.delete(firstKey);
			}
		}
		/**
		* Clear entire cache
		*/
		clear() {
			this.cache.clear();
			this.marketDataHash = null;
		}
		/**
		* Get cache statistics
		* @returns {Object} {size, maxSize, hitRate}
		*/
		getStats() {
			return {
				size: this.cache.size,
				maxSize: this.maxSize,
				marketDataHash: this.marketDataHash
			};
		}
	};
	var networthCache = new NetworthCache();
	//#endregion
	//#region src/utils/networth-worker-manager.js
	/**
	* Networth Item Valuation Worker Manager
	* Manages parallel item valuation calculations including enhancement paths
	*/
	var workerPool = null;
	var WORKER_SCRIPT = `
// Import math.js library for enhancement calculations
importScripts('https://cdnjs.cloudflare.com/ajax/libs/mathjs/12.4.2/math.js');

// Cache for item valuations
const valuationCache = new Map();

// Enhancement calculation BASE_SUCCESS_RATES
const BASE_SUCCESS_RATES = [50,45,45,40,40,40,35,35,35,35,30,30,30,30,30,30,30,30,30,30];

/**
 * Calculate production cost from crafting/upgrading recipe
 * @param {string} itemHrid - Item HRID
 * @param {Object} priceMap - Price map
 * @param {Object} actionDetailMap - Action detail map from game data
 * @returns {number} Production cost
 */
function calculateProductionCost(itemHrid, priceMap, actionDetailMap) {
    // Find the action that produces this item
    let action = null;
    for (const actionHrid in actionDetailMap) {
        const actionData = actionDetailMap[actionHrid];
        if (actionData.outputItems && actionData.outputItems.length > 0) {
            if (actionData.outputItems[0].itemHrid === itemHrid) {
                action = actionData;
                break;
            }
        }
    }

    if (!action) {
        return 0;
    }

    let totalPrice = 0;

    // Sum up input material costs
    if (action.inputItems) {
        for (const input of action.inputItems) {
            // Match main thread: getItemPrice(input.itemHrid, { mode: 'ask' }) || 0
            let inputPrice = priceMap[input.itemHrid + ':0_ask'];
            if (inputPrice === undefined) inputPrice = priceMap[input.itemHrid + ':0'];
            if (inputPrice === null || inputPrice === undefined) inputPrice = 0;

            // Recursively calculate production cost if no market price (matches main thread)
            if (inputPrice === 0) {
                inputPrice = calculateProductionCost(input.itemHrid, priceMap, actionDetailMap);
            }

            totalPrice += inputPrice * input.count;
        }
    }

    // Apply Artisan Tea reduction (0.9x)
    totalPrice *= 0.9;

    // Add upgrade item cost if this is an upgrade recipe (for refined items)
    if (action.upgradeItemHrid) {
        // Match main thread: getItemPrice(action.upgradeItemHrid, { mode: 'ask' }) || 0
        let upgradePrice = priceMap[action.upgradeItemHrid + ':0_ask'];
        if (upgradePrice === undefined) upgradePrice = priceMap[action.upgradeItemHrid + ':0'];
        if (upgradePrice === null || upgradePrice === undefined) upgradePrice = 0;

        // Recursively calculate production cost if no market price (matches main thread)
        if (upgradePrice === 0) {
            upgradePrice = calculateProductionCost(action.upgradeItemHrid, priceMap, actionDetailMap);
        }

        totalPrice += upgradePrice;
    }

    return totalPrice;
}

/**
 * Calculate enhancement path cost using proper strategy optimization
 * @param {Object} params - Enhancement calculation parameters
 * @returns {number} Total cost
 */
function calculateEnhancementCost(params) {
    const { itemHrid, targetLevel, enhancementParams, itemDetails, priceMap, actionDetailMap } = params;

    if (!itemDetails.enhancementCosts || targetLevel < 1 || targetLevel > 20) {
        return null;
    }

    const itemLevel = itemDetails.itemLevel || 1;

    // Get base item cost using realistic pricing (matches main thread logic)
    const basePrice = getRealisticPrice(itemHrid, null, priceMap, actionDetailMap);

    // Build cost array for each level by testing all protection strategies
    const targetCosts = new Array(targetLevel + 1);
    targetCosts[0] = basePrice;

    for (let level = 1; level <= targetLevel; level++) {
        // Calculate per-attempt material cost (sum of ALL materials)
        let perAttemptMaterialCost = 0;
        if (itemDetails.enhancementCosts && itemDetails.enhancementCosts.length > 0) {
            for (const material of itemDetails.enhancementCosts) {
                let materialPrice = 0;

                // Special cases
                if (material.itemHrid.startsWith('/items/trainee_')) {
                    materialPrice = 250000; // Trainee charms are untradeable, fixed price
                } else if (material.itemHrid === '/items/coin') {
                    materialPrice = 1; // Coins have face value of 1
                } else {
                    // Get material details for sellPrice fallback
                    const materialDetail = itemDetails.enhancementCosts ?
                        (itemDetails.allItemDetails && itemDetails.allItemDetails[material.itemHrid]) : null;

                    // Try to get market price from priceMap
                    const hasMarketData = (material.itemHrid + ':0_ask') in priceMap || (material.itemHrid + ':0') in priceMap;

                    if (hasMarketData) {
                        let ask = priceMap[material.itemHrid + ':0_ask'];
                        if (ask === undefined) ask = priceMap[material.itemHrid + ':0'];
                        let bid = priceMap[material.itemHrid + ':0_bid'];

                        // Match MCS behavior: if one price is positive and other is negative, use positive for both
                        if (ask > 0 && bid < 0) {
                            bid = ask;
                        }
                        if (bid > 0 && ask < 0) {
                            ask = bid;
                        }

                        // MCS uses just ask for material prices (matches main thread)
                        materialPrice = ask || 0;
                    } else {
                        // Fallback to sellPrice if no market data (matches main thread)
                        materialPrice = materialDetail?.sellPrice || 0;
                    }
                }

                perAttemptMaterialCost += materialPrice * material.count;
            }
        }

        // Test no protection (protectFrom = 0)
        let minCost = Infinity;
        const noProtResult = calculateStrategyRealCost(
            enhancementParams,
            itemLevel,
            level,
            0,
            perAttemptMaterialCost,
            basePrice,
            priceMap,
            itemDetails,
            itemHrid,
            actionDetailMap
        );
        if (noProtResult < minCost) {
            minCost = noProtResult;
        }

        // Test protection from level 2 to current level
        for (let protectFrom = 2; protectFrom <= level; protectFrom++) {
            const protResult = calculateStrategyRealCost(
                enhancementParams,
                itemLevel,
                level,
                protectFrom,
                perAttemptMaterialCost,
                basePrice,
                priceMap,
                itemDetails,
                itemHrid,
                actionDetailMap
            );
            if (protResult < minCost) {
                minCost = protResult;
            }
        }

        targetCosts[level] = minCost;
    }

    // Apply Philosopher's Mirror optimization
    let mirrorPrice = priceMap['/items/philosophers_mirror:0'] || 0;
    if (mirrorPrice === 0) {
        mirrorPrice = calculateProductionCost('/items/philosophers_mirror', priceMap, actionDetailMap);
    }

    if (mirrorPrice > 0) {
        for (let level = 3; level <= targetLevel; level++) {
            const traditionalCost = targetCosts[level];
            const mirrorCost = targetCosts[level - 2] + targetCosts[level - 1] + mirrorPrice;
            if (mirrorCost < traditionalCost) {
                targetCosts[level] = mirrorCost;
            }
        }
    }

    return targetCosts[targetLevel];
}

/**
 * Calculate real cost for a specific protection strategy
 * Now includes support for Blessed Tea
 */
function calculateStrategyRealCost(
    enhancementParams,
    itemLevel,
    targetLevel,
    protectFrom,
    perAttemptMaterialCost,
    baseItemPrice,
    priceMap,
    itemDetails,
    itemHrid,
    actionDetailMap
) {
    const { enhancingLevel, toolBonus, blessedTea = false, guzzlingBonus = 1.0 } = enhancementParams;

    // Calculate success multiplier
    let totalBonus;
    if (enhancingLevel >= itemLevel) {
        const levelAdvantage = 0.05 * (enhancingLevel - itemLevel);
        totalBonus = 1 + (toolBonus + levelAdvantage) / 100;
    } else {
        totalBonus = 1 - 0.5 * (1 - enhancingLevel / itemLevel) + toolBonus / 100;
    }

    // Build Markov chain with Blessed Tea support
    const markov = math.zeros(20, 20);

    for (let i = 0; i < targetLevel; i++) {
        const baseSuccessRate = BASE_SUCCESS_RATES[i] / 100.0;
        const successChance = baseSuccessRate * totalBonus;
        const failureDestination = protectFrom > 0 && i >= protectFrom ? i - 1 : 0;

        if (blessedTea) {
            // Blessed Tea: 1% base chance to jump +2, scaled by guzzling bonus
            const skipChance = successChance * 0.01 * guzzlingBonus;
            const remainingSuccess = successChance * (1 - 0.01 * guzzlingBonus);

            if (i + 2 <= targetLevel) {
                markov.set([i, i + 2], skipChance);
            }
            markov.set([i, i + 1], remainingSuccess);
            markov.set([i, failureDestination], 1 - successChance);
        } else {
            markov.set([i, i + 1], successChance);
            markov.set([i, failureDestination], 1.0 - successChance);
        }
    }

    markov.set([targetLevel, targetLevel], 1.0);

    // Solve for expected attempts and protections
    const Q = markov.subset(math.index(math.range(0, targetLevel), math.range(0, targetLevel)));
    const I = math.identity(targetLevel);
    const M = math.inv(math.subtract(I, Q));

    let attempts = 0;
    for (let i = 0; i < targetLevel; i++) {
        attempts += M.get([0, i]);
    }

    // Calculate expected protection uses
    let protections = 0;
    if (protectFrom > 0 && protectFrom < targetLevel) {
        for (let i = protectFrom; i < targetLevel; i++) {
            const timesAtLevel = M.get([0, i]);
            const failureChance = markov.get([i, i - 1]);
            protections += timesAtLevel * failureChance;
        }
    }

    // Get protection item price using realistic pricing (like main thread)
    let protectionPrice = 0;
    if (protections > 0) {
        protectionPrice = getRealisticPrice(itemHrid, baseItemPrice, priceMap, actionDetailMap);

        // Check mirror of protection
        const mirrorPrice = getRealisticPrice('/items/mirror_of_protection', null, priceMap, actionDetailMap);
        if (mirrorPrice > 0 && mirrorPrice < protectionPrice) {
            protectionPrice = mirrorPrice;
        }

        // Check specific protection items
        if (itemDetails.protectionItemHrids && itemDetails.protectionItemHrids.length > 0) {
            for (const protHrid of itemDetails.protectionItemHrids) {
                const protPrice = getRealisticPrice(protHrid, null, priceMap, actionDetailMap);
                if (protPrice > 0 && protPrice < protectionPrice) {
                    protectionPrice = protPrice;
                }
            }
        }
    }

    const materialCost = perAttemptMaterialCost * attempts;
    const protectionCost = protectionPrice * protections;

    return baseItemPrice + materialCost + protectionCost;
}

/**
 * Get realistic price for an item (matches main thread logic)
 * Handles inflation detection and fallbacks
 */
function getRealisticPrice(itemHrid, knownBasePrice, priceMap, actionDetailMap) {
    let ask = priceMap[itemHrid + ':0_ask'];
    if (ask === undefined) ask = priceMap[itemHrid + ':0'];
    if (ask === null || ask === undefined) ask = 0;

    let bid = priceMap[itemHrid + ':0_bid'];
    if (bid === null || bid === undefined) bid = 0;

    // Calculate production cost as fallback
    const productionCost = calculateProductionCost(itemHrid, priceMap, actionDetailMap);

    // If both ask and bid exist
    if (ask > 0 && bid > 0) {
        // If ask is significantly higher than bid (>30% markup), use max(bid, production)
        if (ask / bid > 1.3) {
            return Math.max(bid, productionCost);
        }
        // Otherwise use ask (normal market)
        return ask;
    }

    // If only ask exists
    if (ask > 0) {
        // If ask is inflated compared to production, use production
        if (productionCost > 0 && ask / productionCost > 1.3) {
            return productionCost;
        }
        // Otherwise use max of ask and production
        return Math.max(ask, productionCost);
    }

    // If only bid exists, use max(bid, production)
    if (bid > 0) {
        return Math.max(bid, productionCost);
    }

    // No market data - use production cost or known base price
    return productionCost > 0 ? productionCost : (knownBasePrice || 0);
}

/**
 * Calculate value for a single item
 * @param {Object} data - Item data
 * @returns {Object} {itemIndex, value}
 */
function calculateItemValue(data) {
    const { itemIndex, item, priceMap, useHighEnhancementCost, minLevel, enhancementParams, itemDetails, actionDetailMap } = data;
    const { itemHrid, enhancementLevel = 0, count = 1 } = item;

    let itemValue = 0;

    // For enhanced items (1+)
    if (enhancementLevel >= 1) {
        // For high enhancement levels, use cost instead of market price (if enabled)
        if (useHighEnhancementCost && enhancementLevel >= minLevel) {
            // Calculate enhancement cost
            const cost = calculateEnhancementCost({
                itemHrid,
                targetLevel: enhancementLevel,
                enhancementParams,
                itemDetails,
                priceMap,
                actionDetailMap
            });

            if (cost !== null && cost > 0) {
                itemValue = cost;
            } else {
                // Fallback to base item price or production cost
                let basePrice = priceMap[itemHrid + ':0'] || 0;
                if (basePrice === 0) {
                    basePrice = calculateProductionCost(itemHrid, priceMap, actionDetailMap);
                }
                itemValue = basePrice;
            }
        } else {
            // Normal logic: try market price first
            const marketPrice = priceMap[itemHrid + ':' + enhancementLevel] || 0;

            if (marketPrice > 0) {
                itemValue = marketPrice;
            } else {
                // No market data, calculate enhancement cost
                const cost = calculateEnhancementCost({
                    itemHrid,
                    targetLevel: enhancementLevel,
                    enhancementParams,
                    itemDetails,
                    priceMap,
                    actionDetailMap
                });

                if (cost !== null && cost > 0) {
                    itemValue = cost;
                } else {
                    let basePrice = priceMap[itemHrid + ':0'] || 0;
                    if (basePrice === 0) {
                        basePrice = calculateProductionCost(itemHrid, priceMap, actionDetailMap);
                    }
                    itemValue = basePrice;
                }
            }
        }
    } else {
        // Unenhanced items: use market price or production cost
        itemValue = priceMap[itemHrid + ':0'] || 0;
        if (itemValue === 0) {
            itemValue = calculateProductionCost(itemHrid, priceMap, actionDetailMap);
        }
    }

    return { itemIndex, value: itemValue * count };
}

/**
 * Calculate values for a batch of items
 * @param {Array} items - Array of item data objects
 * @returns {Array} Array of {itemIndex, value} results
 */
function calculateItemValueBatch(items) {
    const results = [];

    for (const itemData of items) {
        const result = calculateItemValue(itemData);
        results.push(result);
    }

    return results;
}

self.onmessage = function (e) {
    const { taskId, data } = e.data;
    try {
        const { action, params } = data;

        if (action === 'calculateBatch') {
            const results = calculateItemValueBatch(params.items);
            self.postMessage({ taskId, result: results });
        } else if (action === 'clearCache') {
            valuationCache.clear();
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
	* Calculate values for multiple items in parallel
	* @param {Array} items - Array of item objects
	* @param {Object} priceMap - Price map for all items
	* @param {Object} config - Configuration options
	* @param {Object} gameData - Game data with item details
	* @returns {Promise<Array>} Array of values in same order as input
	*/
	async function calculateItemValueBatch(items, priceMap, configOptions, gameData) {
		const pool = await getWorkerPool();
		const itemsWithDetails = items.map((item, index) => {
			const itemDetails = gameData.itemDetailMap[item.itemHrid];
			const allItemDetails = {};
			if (itemDetails && itemDetails.enhancementCosts) for (const material of itemDetails.enhancementCosts) {
				const materialDetail = gameData.itemDetailMap[material.itemHrid];
				if (materialDetail) allItemDetails[material.itemHrid] = {
					sellPrice: materialDetail.sellPrice,
					name: materialDetail.name
				};
			}
			return {
				itemIndex: index,
				item,
				priceMap,
				useHighEnhancementCost: configOptions.useHighEnhancementCost,
				minLevel: configOptions.minLevel,
				enhancementParams: configOptions.enhancementParams,
				itemDetails: itemDetails ? {
					...itemDetails,
					allItemDetails
				} : {},
				actionDetailMap: gameData.actionDetailMap
			};
		});
		const chunkSize = Math.ceil(itemsWithDetails.length / pool.getStats().poolSize);
		const chunks = [];
		for (let i = 0; i < itemsWithDetails.length; i += chunkSize) chunks.push(itemsWithDetails.slice(i, i + chunkSize));
		const tasks = chunks.map((chunk) => ({
			action: "calculateBatch",
			params: { items: chunk }
		}));
		const flatResults = (await pool.executeAll(tasks)).flat();
		flatResults.sort((a, b) => a.itemIndex - b.itemIndex);
		return flatResults.map((r) => r.value);
	}
	//#endregion
	//#region src/features/networth/networth-exclusions.js
	/**
	* Networth Exclusions
	* Manages the list of assets to exclude from net worth calculation.
	* Persisted per character to IndexedDB (settings store).
	*
	* Exclusion types:
	*   assetType  - entire section ('houses', 'abilities', 'abilityBooks', 'listings', 'equipped')
	*   category   - all items in an inventory category ('/item_categories/food', etc.)
	*   item       - all stacks of a specific item type ('/items/...')
	*   houseRoom  - one specific house room ('/house_rooms/...')
	*   ability    - one specific ability ('/abilities/...')
	*   loadout    - all equipment items in a named loadout snapshot
	*/
	var STORAGE_KEY_PREFIX$1 = "networth_exclusions";
	/** @type {Array<{type: string, value: string}>|null} In-memory cache */
	var cache = null;
	/**
	* Get the character-scoped storage key.
	* @returns {string}
	*/
	function getStorageKey$2() {
		return `${STORAGE_KEY_PREFIX$1}_${src_core_data_manager_js.default.getCurrentCharacterId() || "default"}`;
	}
	/**
	* Load exclusions from storage into memory.
	* @returns {Promise<Array<{type: string, value: string}>>}
	*/
	async function loadExclusions() {
		if (cache === null) cache = await src_core_storage_js.default.getJSON(getStorageKey$2(), "settings", []) || [];
		return cache;
	}
	/**
	* Initialize exclusions — call at feature startup to warm the cache.
	* @returns {Promise<void>}
	*/
	async function initExclusions() {
		await loadExclusions();
	}
	/**
	* Get all current exclusions synchronously (may be empty before initExclusions completes).
	* @returns {Array<{type: string, value: string}>}
	*/
	function getExclusions() {
		return cache ?? [];
	}
	/**
	* Check whether a given type/value pair is currently excluded.
	* @param {string} type - 'assetType' | 'category' | 'item' | 'houseRoom' | 'ability' | 'loadout'
	* @param {string} value - HRID or loadout name
	* @returns {boolean}
	*/
	function isExcluded(type, value) {
		return (cache ?? []).some((e) => e.type === type && e.value === value);
	}
	/**
	* Add an exclusion if it does not already exist. Persists to storage.
	* @param {string} type
	* @param {string} value
	* @returns {Promise<void>}
	*/
	async function addExclusion(type, value) {
		const list = await loadExclusions();
		if (!list.some((e) => e.type === type && e.value === value)) {
			list.push({
				type,
				value
			});
			cache = list;
			src_core_storage_js.default.setJSON(getStorageKey$2(), list, "settings");
		}
	}
	/**
	* Remove an exclusion. Persists to storage.
	* @param {string} type
	* @param {string} value
	* @returns {Promise<void>}
	*/
	async function removeExclusion(type, value) {
		const list = await loadExclusions();
		const idx = list.findIndex((e) => e.type === type && e.value === value);
		if (idx !== -1) {
			list.splice(idx, 1);
			cache = list;
			src_core_storage_js.default.setJSON(getStorageKey$2(), list, "settings");
		}
	}
	/**
	* Remove all exclusions. Persists to storage.
	* @returns {Promise<void>}
	*/
	async function clearExclusions() {
		cache = [];
		src_core_storage_js.default.setJSON(getStorageKey$2(), [], "settings");
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
	function getStorageKey$1() {
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
	//#region src/features/networth/networth-calculator.js
	/**
	* Networth Calculator
	* Calculates total character networth including:
	* - Equipped items
	* - Inventory items
	* - Market listings
	* - Houses (all 17)
	* - Abilities (equipped + others)
	*/
	/**
	* Calculate the value of a single item
	* @param {Object} item - Item data {itemHrid, enhancementLevel, count}
	* @param {Map} priceCache - Optional price cache from getPricesBatch()
	* @returns {number} Total value in coins
	*/
	async function calculateItemValue(item, priceCache = null) {
		const { itemHrid, enhancementLevel = 0, count = 1 } = item;
		let itemValue = 0;
		const useHighEnhancementCost = src_core_config_js.default.getSetting("networth_highEnhancementUseCost");
		const minLevel = src_core_config_js.default.getSetting("networth_highEnhancementMinLevel") || 13;
		if (enhancementLevel >= 1) if (useHighEnhancementCost && enhancementLevel >= minLevel) {
			const cachedCost = networthCache.get(itemHrid, enhancementLevel);
			if (cachedCost !== null) itemValue = cachedCost;
			else {
				const enhancementPath = calculateEnhancementPath(itemHrid, enhancementLevel, (0, src_utils_enhancement_config_js.getEnhancingParams)());
				if (enhancementPath && enhancementPath.optimalStrategy) {
					itemValue = enhancementPath.optimalStrategy.totalCost;
					networthCache.set(itemHrid, enhancementLevel, itemValue);
				} else {
					console.warn("[Networth] Enhancement calculation failed for:", itemHrid, "+" + enhancementLevel);
					itemValue = getMarketPrice(itemHrid, 0, priceCache);
				}
			}
		} else {
			const marketPrice = getMarketPrice(itemHrid, enhancementLevel, priceCache);
			if (marketPrice > 0) itemValue = marketPrice;
			else {
				const cachedCost = networthCache.get(itemHrid, enhancementLevel);
				if (cachedCost !== null) itemValue = cachedCost;
				else {
					const enhancementPath = calculateEnhancementPath(itemHrid, enhancementLevel, (0, src_utils_enhancement_config_js.getEnhancingParams)());
					if (enhancementPath && enhancementPath.optimalStrategy) {
						itemValue = enhancementPath.optimalStrategy.totalCost;
						networthCache.set(itemHrid, enhancementLevel, itemValue);
					} else {
						console.warn("[Networth] Enhancement calculation failed for:", itemHrid, "+" + enhancementLevel);
						itemValue = getMarketPrice(itemHrid, 0, priceCache);
					}
				}
			}
		}
		else itemValue = getMarketPrice(itemHrid, enhancementLevel, priceCache);
		return itemValue * count;
	}
	/**
	* Get market price for an item
	* @param {string} itemHrid - Item HRID
	* @param {number} enhancementLevel - Enhancement level
	* @param {Map} priceCache - Optional price cache from getPricesBatch()
	* @returns {number} Price per item (uses networth pricing mode setting)
	*/
	function getMarketPrice(itemHrid, enhancementLevel, priceCache = null) {
		const currencyValue = calculateCurrencyValue(itemHrid);
		if (currencyValue !== null) return currencyValue;
		const pricingMode = src_core_config_js.default.getSettingValue("networth_pricingMode") || "ask";
		let prices;
		if (priceCache) {
			const key = `${itemHrid}:${enhancementLevel}`;
			prices = priceCache.get(key);
		} else prices = (0, src_utils_market_data_js.getItemPrices)(itemHrid, enhancementLevel);
		const price = prices?.[pricingMode];
		if (price && price > 0) return price;
		if (enhancementLevel === 0) {
			if (src_core_data_manager_js.default.getItemDetails(itemHrid)?.isOpenable && expectedValueCalculator.isInitialized) {
				const evData = expectedValueCalculator.calculateExpectedValue(itemHrid);
				if (evData && evData.expectedValue > 0) {
					let netValue = evData.expectedValue;
					const chestKeyHrid = DUNGEON_CHEST_CHEST_KEYS[itemHrid];
					if (chestKeyHrid) {
						const keyPricingSetting = src_core_config_js.default.getSettingValue("profitCalc_keyPricingMode") || "ask";
						const keyPrices = src_api_marketplace_js.default.getPrice(chestKeyHrid);
						const keyPrice = keyPrices?.[keyPricingSetting] ?? keyPrices?.ask ?? 0;
						netValue -= keyPrice;
					}
					return netValue;
				}
			}
			const craftingCost = calculateCraftingCost(itemHrid);
			if (craftingCost > 0) return craftingCost;
			const shopCost = getShopCoinCost(itemHrid);
			if (shopCost > 0) return shopCost;
		}
		return 0;
	}
	/**
	* Calculate value for currency items
	* @param {string} itemHrid - Item HRID
	* @returns {number|null} Currency value per unit, or null if not a currency
	*/
	function calculateCurrencyValue(itemHrid) {
		if (itemHrid === "/items/coin") return 1;
		if (itemHrid === "/items/cowbell") {
			if (!src_core_config_js.default.getSetting("networth_includeCowbells")) return null;
			const pricingMode = src_core_config_js.default.getSettingValue("networth_pricingMode") || "ask";
			const bagPrice = (0, src_utils_market_data_js.getItemPrice)("/items/bag_of_10_cowbells", { mode: pricingMode }) || 0;
			if (bagPrice > 0) return bagPrice / 10;
			return 1e5;
		}
		if (itemHrid === "/items/task_token") {
			if (src_core_config_js.default.getSetting("networth_includeTaskTokens") === false) return null;
			const tokenData = calculateTaskTokenValue();
			if (tokenData && tokenData.tokenValue > 0) return tokenData.tokenValue;
			return 3e4;
		}
		if (itemHrid === "/items/chimerical_token") return (0, src_utils_token_valuation_js.calculateDungeonTokenValue)(itemHrid, "profitCalc_pricingMode", null) || 0;
		if (itemHrid === "/items/sinister_token") return (0, src_utils_token_valuation_js.calculateDungeonTokenValue)(itemHrid, "profitCalc_pricingMode", null) || 0;
		if (itemHrid === "/items/enchanted_token") return (0, src_utils_token_valuation_js.calculateDungeonTokenValue)(itemHrid, "profitCalc_pricingMode", null) || 0;
		if (itemHrid === "/items/pirate_token") return (0, src_utils_token_valuation_js.calculateDungeonTokenValue)(itemHrid, "profitCalc_pricingMode", null) || 0;
		return null;
	}
	/**
	* Calculate crafting cost for an item (simple version without efficiency bonuses)
	* Applies Artisan Tea reduction (0.9x) to input materials
	* @param {string} itemHrid - Item HRID
	* @returns {number} Total material cost or 0 if not craftable
	*/
	function calculateCraftingCost(itemHrid) {
		const gameData = src_core_data_manager_js.default.getInitClientData();
		if (!gameData) return 0;
		for (const action of Object.values(gameData.actionDetailMap || {})) if (action.outputItems) {
			for (const output of action.outputItems) if (output.itemHrid === itemHrid) {
				let inputCost = 0;
				if (action.inputItems && action.inputItems.length > 0) for (const input of action.inputItems) {
					const inputPrice = getMarketPrice(input.itemHrid, 0, null);
					inputCost += inputPrice * input.count;
				}
				inputCost *= .9;
				let upgradeCost = 0;
				if (action.upgradeItemHrid) upgradeCost = getMarketPrice(action.upgradeItemHrid, 0, null);
				return (inputCost + upgradeCost) / (output.count || 1);
			}
		}
		return 0;
	}
	/**
	* Calculate total value of all houses (all 17)
	* @param {Object} characterHouseRooms - Map of character house rooms
	* @returns {Object} {totalCost, breakdown: [{name, level, cost}]}
	*/
	function calculateAllHousesCost(characterHouseRooms) {
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
			const level = houseData.level || 0;
			if (level === 0) continue;
			const cost = (0, src_utils_house_cost_calculator_js.calculateHouseBuildCost)(houseRoomHrid, level);
			totalCost += cost;
			const houseName = houseRoomDetailMap[houseRoomHrid]?.name || houseRoomHrid.replace("/house_rooms/", "");
			breakdown.push({
				hrid: houseRoomHrid,
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
	/**
	* Calculate total value of all abilities
	* @param {Array} characterAbilities - Array of character abilities
	* @param {Object} abilityCombatTriggersMap - Map of equipped abilities
	* @returns {Object} {totalCost, equippedCost, breakdown, equippedBreakdown, otherBreakdown}
	*/
	function calculateAllAbilitiesCost(characterAbilities, abilityCombatTriggersMap) {
		if (!characterAbilities || characterAbilities.length === 0) return {
			totalCost: 0,
			equippedCost: 0,
			breakdown: [],
			equippedBreakdown: [],
			otherBreakdown: []
		};
		let totalCost = 0;
		let equippedCost = 0;
		const breakdown = [];
		const equippedBreakdown = [];
		const otherBreakdown = [];
		const equippedHrids = new Set(Object.keys(abilityCombatTriggersMap || {}));
		for (const ability of characterAbilities) {
			if (!ability.abilityHrid || ability.level === 0) continue;
			const cost = (0, src_utils_ability_cost_calculator_js.calculateAbilityCost)(ability.abilityHrid, ability.level);
			totalCost += cost;
			const abilityName = ability.abilityHrid.replace("/abilities/", "").split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
			const abilityData = {
				hrid: ability.abilityHrid,
				name: `${abilityName} ${ability.level}`,
				cost
			};
			breakdown.push(abilityData);
			if (equippedHrids.has(ability.abilityHrid)) {
				equippedCost += cost;
				equippedBreakdown.push(abilityData);
			} else otherBreakdown.push(abilityData);
		}
		breakdown.sort((a, b) => b.cost - a.cost);
		equippedBreakdown.sort((a, b) => b.cost - a.cost);
		otherBreakdown.sort((a, b) => b.cost - a.cost);
		return {
			totalCost,
			equippedCost,
			breakdown,
			equippedBreakdown,
			otherBreakdown
		};
	}
	/**
	* Calculate values for multiple items in parallel using workers
	* @param {Array} items - Array of items to value
	* @param {Map} priceCache - Price cache
	* @param {Object} gameData - Game data
	* @returns {Promise<Array>} Array of values in same order as items
	*/
	async function calculateItemValuesParallel(items, priceCache, gameData) {
		const useHighEnhancementCost = src_core_config_js.default.getSetting("networth_highEnhancementUseCost");
		const minLevel = src_core_config_js.default.getSetting("networth_highEnhancementMinLevel") || 13;
		const enhancementParams = (0, src_utils_enhancement_config_js.getEnhancingParams)();
		const itemsNeedingWorkers = [];
		const itemsNotNeedingWorkers = [];
		const itemMapping = [];
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			const enhancementLevel = item.enhancementLevel || 0;
			let needsWorker = false;
			if (enhancementLevel >= 1) if (useHighEnhancementCost && enhancementLevel >= minLevel) needsWorker = true;
			else {
				const priceKey = `${item.itemHrid}:${enhancementLevel}`;
				const prices = priceCache ? priceCache.get(priceKey) : null;
				if (!(prices && (typeof prices === "number" && prices > 0 || prices.ask && prices.ask > 0))) needsWorker = true;
			}
			if (needsWorker) {
				itemMapping.push({
					originalIndex: i,
					workerIndex: itemsNeedingWorkers.length,
					useWorker: true
				});
				itemsNeedingWorkers.push(item);
			} else {
				itemMapping.push({
					originalIndex: i,
					sequentialIndex: itemsNotNeedingWorkers.length,
					useWorker: false
				});
				itemsNotNeedingWorkers.push(item);
			}
		}
		const [workerResults, sequentialResults] = await Promise.all([itemsNeedingWorkers.length > 0 ? (async () => {
			const priceMap = {};
			if (priceCache) for (const [key, prices] of priceCache.entries()) if (typeof prices === "number") priceMap[key] = prices;
			else if (prices && typeof prices === "object") {
				priceMap[key + "_ask"] = prices.ask;
				priceMap[key + "_bid"] = prices.bid;
				const modePrice = prices[src_core_config_js.default.getSettingValue("networth_pricingMode") || "ask"];
				priceMap[key] = modePrice && modePrice > 0 ? modePrice : prices.ask;
			} else priceMap[key] = 0;
			try {
				return await calculateItemValueBatch(itemsNeedingWorkers, priceMap, {
					useHighEnhancementCost,
					minLevel,
					enhancementParams
				}, gameData);
			} catch (error) {
				console.warn("[NetworthCalculator] Worker failed, falling back to sequential:", error);
				const values = [];
				for (const item of itemsNeedingWorkers) values.push(await calculateItemValue(item, priceCache));
				return values;
			}
		})() : Promise.resolve([]), itemsNotNeedingWorkers.length > 0 ? (async () => {
			const values = [];
			for (const item of itemsNotNeedingWorkers) {
				const value = await calculateItemValue(item, priceCache);
				values.push(value);
			}
			return values;
		})() : Promise.resolve([])]);
		const finalResults = new Array(items.length);
		for (const mapping of itemMapping) if (mapping.useWorker) finalResults[mapping.originalIndex] = workerResults[mapping.workerIndex];
		else finalResults[mapping.originalIndex] = sequentialResults[mapping.sequentialIndex];
		return finalResults;
	}
	/**
	* Calculate total networth
	* @returns {Promise<Object>} Networth data with breakdowns
	*/
	async function calculateNetworth() {
		const gameData = src_core_data_manager_js.default.getCombinedData();
		if (!gameData) {
			console.error("[Networth] No game data available");
			return createEmptyNetworthData();
		}
		if (!src_api_marketplace_js.default.isLoaded()) {
			if (!await src_api_marketplace_js.default.fetch()) {
				console.error("[Networth] Failed to fetch market data");
				return createEmptyNetworthData();
			}
		}
		networthCache.checkAndInvalidate({ marketData: src_api_marketplace_js.default.marketData });
		const characterItems = gameData.characterItems || [];
		const marketListings = gameData.myMarketListings || [];
		const characterHouseRooms = gameData.characterHouseRoomMap || {};
		const characterAbilities = gameData.characterAbilities || [];
		const abilityCombatTriggersMap = gameData.abilityCombatTriggersMap || {};
		const itemsToPrice = [];
		const itemsToFetch = /* @__PURE__ */ new Set();
		const addItemWithUpgrades = (itemHrid) => {
			if (itemsToFetch.has(itemHrid)) return;
			itemsToFetch.add(itemHrid);
			for (const actionHrid in gameData.actionDetailMap) {
				const action = gameData.actionDetailMap[actionHrid];
				if (action.outputItems && action.outputItems.length > 0 && action.outputItems[0].itemHrid === itemHrid) {
					if (action.inputItems) {
						for (const input of action.inputItems) if (!itemsToFetch.has(input.itemHrid)) itemsToFetch.add(input.itemHrid);
					}
					if (action.upgradeItemHrid) addItemWithUpgrades(action.upgradeItemHrid);
					break;
				}
			}
		};
		for (const item of characterItems) {
			itemsToPrice.push({
				itemHrid: item.itemHrid,
				enhancementLevel: item.enhancementLevel || 0
			});
			addItemWithUpgrades(item.itemHrid);
		}
		for (const listing of marketListings) {
			itemsToPrice.push({
				itemHrid: listing.itemHrid,
				enhancementLevel: listing.enhancementLevel || 0
			});
			addItemWithUpgrades(listing.itemHrid);
		}
		for (const itemHrid of itemsToFetch) itemsToPrice.push({
			itemHrid,
			enhancementLevel: 0
		});
		const priceCache = src_api_marketplace_js.default.getPricesBatch(itemsToPrice);
		const loadoutExcludedHridToName = /* @__PURE__ */ new Map();
		const loadoutExclusions = getExclusions().filter((e) => e.type === "loadout");
		if (loadoutExclusions.length > 0) {
			const allSnapshots = loadoutSnapshot.getAllSnapshots();
			for (const exc of loadoutExclusions) {
				const snapshot = allSnapshots.find((s) => s.name === exc.value);
				if (snapshot) {
					for (const eq of snapshot.equipment) if (!loadoutExcludedHridToName.has(eq.itemHrid)) loadoutExcludedHridToName.set(eq.itemHrid, exc.value);
				}
			}
		}
		const excludedByKey = /* @__PURE__ */ new Map();
		const trackExcluded = (type, value, name, amount) => {
			const key = `${type}:${value}`;
			if (!excludedByKey.has(key)) excludedByKey.set(key, {
				type,
				value,
				name,
				amount: 0
			});
			excludedByKey.get(key).amount += amount;
		};
		let equippedValue = 0;
		const equippedBreakdown = [];
		const entireEquippedExcluded = isExcluded("assetType", "equipped");
		const equippedItems = characterItems.filter((item) => item.itemLocationHrid !== "/item_locations/inventory");
		const equippedValues = await calculateItemValuesParallel(equippedItems, priceCache, gameData);
		for (let i = 0; i < equippedItems.length; i++) {
			const item = equippedItems[i];
			const value = equippedValues[i];
			const itemName = gameData.itemDetailMap[item.itemHrid]?.name || item.itemHrid.replace("/items/", "");
			const displayName = item.enhancementLevel > 0 ? `${itemName} +${item.enhancementLevel}` : itemName;
			if (entireEquippedExcluded) {
				trackExcluded("assetType", "equipped", (0, src_core_i18n_js.t)("All Equipped Items"), value);
				continue;
			}
			if (isExcluded("item", item.itemHrid)) {
				trackExcluded("item", item.itemHrid, displayName, value);
				continue;
			}
			const loadoutName = loadoutExcludedHridToName.get(item.itemHrid);
			if (loadoutName) {
				trackExcluded("loadout", loadoutName, `Loadout: ${loadoutName}`, value);
				continue;
			}
			equippedValue += value;
			equippedBreakdown.push({
				name: displayName,
				value,
				itemHrid: item.itemHrid,
				enhancementLevel: item.enhancementLevel || 0
			});
		}
		let inventoryValue = 0;
		const inventoryBreakdown = [];
		const inventoryByCategory = {};
		let abilityBooksValue = 0;
		const abilityBooksBreakdown = [];
		let coinCount = 0;
		const inventoryItems = characterItems.filter((item) => item.itemLocationHrid === "/item_locations/inventory");
		const inventoryValues = await calculateItemValuesParallel(inventoryItems, priceCache, gameData);
		for (let i = 0; i < inventoryItems.length; i++) {
			const item = inventoryItems[i];
			const value = inventoryValues[i];
			if (item.itemHrid === "/items/coin") coinCount = item.count || 0;
			const itemDetails = gameData.itemDetailMap[item.itemHrid];
			const itemName = itemDetails?.name || item.itemHrid.replace("/items/", "");
			const displayName = item.enhancementLevel > 0 ? `${itemName} +${item.enhancementLevel}` : itemName;
			const itemData = {
				name: displayName,
				value,
				count: item.count,
				itemHrid: item.itemHrid,
				enhancementLevel: item.enhancementLevel || 0,
				isOpenable: itemDetails?.isOpenable === true
			};
			const categoryHrid = itemDetails?.categoryHrid || "/item_categories/other";
			const isAbilityBook = categoryHrid === "/item_categories/ability_book";
			const booksAsInventory = src_core_config_js.default.getSetting("networth_abilityBooksAsInventory") === true;
			if (isExcluded("item", item.itemHrid)) {
				trackExcluded("item", item.itemHrid, displayName, value);
				continue;
			}
			if (item.itemHrid !== "/items/coin" && isExcluded("category", categoryHrid)) {
				trackExcluded("category", categoryHrid, `${gameData.itemCategoryDetailMap?.[categoryHrid]?.name || (0, src_core_i18n_js.t)("Other")} (category)`, value);
				continue;
			}
			if (isAbilityBook && !booksAsInventory && isExcluded("assetType", "abilityBooks")) {
				trackExcluded("assetType", "abilityBooks", (0, src_core_i18n_js.t)("All Ability Books"), value);
				continue;
			}
			if (isAbilityBook && !booksAsInventory) {
				abilityBooksValue += value;
				abilityBooksBreakdown.push(itemData);
			} else {
				inventoryValue += value;
				inventoryBreakdown.push(itemData);
				if (item.itemHrid !== "/items/coin") {
					const categoryName = gameData.itemCategoryDetailMap?.[categoryHrid]?.name || (0, src_core_i18n_js.t)("Other");
					if (!inventoryByCategory[categoryName]) inventoryByCategory[categoryName] = {
						items: [],
						totalValue: 0,
						categoryHrid
					};
					inventoryByCategory[categoryName].items.push(itemData);
					inventoryByCategory[categoryName].totalValue += value;
				}
			}
		}
		for (const category of Object.values(inventoryByCategory)) category.items.sort((a, b) => b.value - a.value);
		abilityBooksBreakdown.sort((a, b) => b.value - a.value);
		let listingsValue = 0;
		const listingsBreakdown = [];
		const clientData = src_core_data_manager_js.default.getInitClientData();
		for (const listing of marketListings) {
			const quantity = listing.orderQuantity - listing.filledQuantity;
			const enhancementLevel = listing.enhancementLevel || 0;
			const itemName = clientData?.itemDetailMap?.[listing.itemHrid]?.name || listing.itemHrid;
			if (listing.isSell) {
				const fee = listing.itemHrid === "/items/bag_of_10_cowbells" ? .18 : .02;
				const listingValue = await calculateItemValue({
					itemHrid: listing.itemHrid,
					enhancementLevel,
					count: quantity
				}, priceCache) * (1 - fee) + listing.unclaimedCoinCount;
				listingsValue += listingValue;
				listingsBreakdown.push({
					itemHrid: listing.itemHrid,
					enhancementLevel,
					name: itemName,
					isSell: true,
					value: listingValue
				});
			} else {
				const unclaimedValue = await calculateItemValue({
					itemHrid: listing.itemHrid,
					enhancementLevel,
					count: listing.unclaimedItemCount
				}, priceCache);
				const listingValue = quantity * listing.price + unclaimedValue;
				listingsValue += listingValue;
				listingsBreakdown.push({
					itemHrid: listing.itemHrid,
					enhancementLevel,
					name: itemName,
					isSell: false,
					value: listingValue
				});
			}
		}
		listingsBreakdown.sort((a, b) => b.value - a.value);
		if (isExcluded("assetType", "listings") && listingsValue > 0) {
			trackExcluded("assetType", "listings", (0, src_core_i18n_js.t)("All Market Listings"), listingsValue);
			listingsValue = 0;
		}
		let housesData = calculateAllHousesCost(characterHouseRooms);
		if (isExcluded("assetType", "houses") && housesData.totalCost > 0) {
			trackExcluded("assetType", "houses", (0, src_core_i18n_js.t)("All Houses"), housesData.totalCost);
			housesData = {
				totalCost: 0,
				breakdown: []
			};
		} else {
			let excludedRoomCost = 0;
			const remainingRooms = [];
			for (const room of housesData.breakdown) if (isExcluded("houseRoom", room.hrid)) {
				trackExcluded("houseRoom", room.hrid, room.name, room.cost);
				excludedRoomCost += room.cost;
			} else remainingRooms.push(room);
			if (excludedRoomCost > 0) housesData = {
				totalCost: housesData.totalCost - excludedRoomCost,
				breakdown: remainingRooms
			};
		}
		let abilitiesData = calculateAllAbilitiesCost(characterAbilities, abilityCombatTriggersMap);
		if (isExcluded("assetType", "abilities") && abilitiesData.totalCost > 0) {
			trackExcluded("assetType", "abilities", (0, src_core_i18n_js.t)("All Abilities"), abilitiesData.totalCost);
			abilitiesData = {
				totalCost: 0,
				equippedCost: 0,
				breakdown: [],
				equippedBreakdown: [],
				otherBreakdown: []
			};
		} else {
			let excludedAbilityCost = 0;
			let excludedEquippedCost = 0;
			const remainingBreakdown = [];
			const remainingEquipped = [];
			const remainingOther = [];
			const equippedHridSet = new Set(abilitiesData.equippedBreakdown.map((a) => a.hrid));
			for (const ability of abilitiesData.breakdown) if (isExcluded("ability", ability.hrid)) {
				trackExcluded("ability", ability.hrid, ability.name, ability.cost);
				excludedAbilityCost += ability.cost;
				if (equippedHridSet.has(ability.hrid)) excludedEquippedCost += ability.cost;
			} else {
				remainingBreakdown.push(ability);
				if (equippedHridSet.has(ability.hrid)) remainingEquipped.push(ability);
				else remainingOther.push(ability);
			}
			if (excludedAbilityCost > 0) abilitiesData = {
				totalCost: abilitiesData.totalCost - excludedAbilityCost,
				equippedCost: abilitiesData.equippedCost - excludedEquippedCost,
				breakdown: remainingBreakdown,
				equippedBreakdown: remainingEquipped,
				otherBreakdown: remainingOther
			};
		}
		const excludedItems = [...excludedByKey.values()].sort((a, b) => b.amount - a.amount);
		const excludedTotal = excludedItems.reduce((sum, e) => sum + e.amount, 0);
		const currentAssetsTotal = equippedValue + inventoryValue + listingsValue;
		const fixedAssetsTotal = housesData.totalCost + abilitiesData.totalCost + abilityBooksValue;
		const totalNetworth = currentAssetsTotal + fixedAssetsTotal;
		equippedBreakdown.sort((a, b) => b.value - a.value);
		inventoryBreakdown.sort((a, b) => b.value - a.value);
		return {
			totalNetworth,
			coins: coinCount,
			excluded: {
				total: excludedTotal,
				items: excludedItems
			},
			currentAssets: {
				total: currentAssetsTotal,
				equipped: {
					value: equippedValue,
					breakdown: equippedBreakdown
				},
				inventory: {
					value: inventoryValue,
					breakdown: inventoryBreakdown,
					byCategory: inventoryByCategory
				},
				listings: {
					value: listingsValue,
					breakdown: listingsBreakdown
				}
			},
			fixedAssets: {
				total: fixedAssetsTotal,
				houses: housesData,
				abilities: abilitiesData,
				abilityBooks: {
					totalCost: abilityBooksValue,
					breakdown: abilityBooksBreakdown
				}
			}
		};
	}
	/**
	* Create empty networth data structure
	* @returns {Object} Empty networth data
	*/
	function createEmptyNetworthData() {
		return {
			totalNetworth: 0,
			coins: 0,
			excluded: {
				total: 0,
				items: []
			},
			currentAssets: {
				total: 0,
				equipped: {
					value: 0,
					breakdown: []
				},
				inventory: {
					value: 0,
					breakdown: [],
					byCategory: {}
				},
				listings: {
					value: 0,
					breakdown: []
				}
			},
			fixedAssets: {
				total: 0,
				houses: {
					totalCost: 0,
					breakdown: []
				},
				abilities: {
					totalCost: 0,
					equippedCost: 0,
					breakdown: [],
					equippedBreakdown: [],
					otherBreakdown: []
				},
				abilityBooks: {
					totalCost: 0,
					breakdown: []
				}
			}
		};
	}
	//#endregion
	//#region src/features/networth/networth-history.js
	/**
	* Networth History Tracker
	* Records hourly snapshots of networth breakdown to IndexedDB.
	* Used by the networth history chart for trend visualization.
	*/
	var STORE_NAME = "networthHistory";
	var SNAPSHOT_INTERVAL = 36e5;
	var MAX_DETAIL_SNAPSHOTS = 25;
	var NetworthHistory = class {
		constructor() {
			this.history = [];
			this.detailHistory = [];
			this.characterId = null;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.networthFeature = null;
		}
		/**
		* Initialize the history tracker
		* @param {Object} networthFeature - Reference to NetworthFeature instance (for currentData)
		*/
		async initialize(networthFeature) {
			this.networthFeature = networthFeature;
			this.characterId = src_core_data_manager_js.default.getCurrentCharacterId();
			if (!this.characterId) {
				console.warn("[NetworthHistory] No character ID available");
				return;
			}
			const storageKey = `networth_${this.characterId}`;
			this.history = await src_core_storage_js.default.get(storageKey, STORE_NAME, []);
			const detailKey = `networthDetail_${this.characterId}`;
			this.detailHistory = await src_core_storage_js.default.get(detailKey, STORE_NAME, []);
			await this.takeSnapshot();
			const intervalId = setInterval(() => this.takeSnapshot(), SNAPSHOT_INTERVAL);
			this.timerRegistry.registerInterval(intervalId);
		}
		/**
		* Take a snapshot of the current networth data
		*/
		async takeSnapshot() {
			if (!connectionState.isConnected()) return;
			if (!this.networthFeature?.currentData) return;
			if (!this.characterId) return;
			const data = this.networthFeature.currentData;
			const snapshot = {
				t: Date.now(),
				total: Math.round(data.totalNetworth + (data.excluded?.total ?? 0)),
				nonExcluded: Math.round(data.totalNetworth),
				gold: Math.round(data.coins),
				inventory: Math.round(data.currentAssets.inventory.value),
				equipment: Math.round(data.currentAssets.equipped.value),
				listings: Math.round(data.currentAssets.listings.value),
				house: Math.round(data.fixedAssets.houses.totalCost),
				abilities: Math.round(data.fixedAssets.abilities.totalCost + data.fixedAssets.abilityBooks.totalCost)
			};
			this.pushSnapshot(snapshot);
			this.takeDetailSnapshot(data);
			const storageKey = `networth_${this.characterId}`;
			await src_core_storage_js.default.set(storageKey, this.history, STORE_NAME, true);
			const detailKey = `networthDetail_${this.characterId}`;
			await src_core_storage_js.default.set(detailKey, this.detailHistory, STORE_NAME, true);
		}
		/**
		* Append a snapshot and compact consecutive identical totals.
		* If 3+ consecutive entries share the same total, keep only the first and last.
		* @param {Object} snapshot - Snapshot object with t, total, and breakdown fields
		*/
		pushSnapshot(snapshot) {
			this.history.push(snapshot);
			if (this.history.length < 3) return;
			const currentTotal = snapshot.total;
			let runStart = this.history.length - 1;
			while (runStart > 0 && this.history[runStart - 1].total === currentTotal) runStart--;
			const runLength = this.history.length - runStart;
			if (runLength >= 3) this.history.splice(runStart + 1, runLength - 2);
		}
		/**
		* Take an item-level detail snapshot for 24h breakdown diffs.
		* Stores inventory + equipped items keyed by "itemHrid:enhancementLevel".
		* Rolling window of MAX_DETAIL_SNAPSHOTS entries.
		* @param {Object} data - Current networthData from calculateNetworth()
		*/
		takeDetailSnapshot(data) {
			const items = {};
			items["/items/coin:0"] = {
				count: Math.round(data.coins),
				value: Math.round(data.coins)
			};
			for (const item of data.currentAssets.inventory.breakdown) {
				if (!item.itemHrid) continue;
				const key = `${item.itemHrid}:${item.enhancementLevel || 0}`;
				items[key] = {
					count: item.count || 0,
					value: Math.round(item.value || 0)
				};
			}
			for (const item of data.currentAssets.equipped.breakdown) {
				if (!item.itemHrid) continue;
				const key = `${item.itemHrid}:${item.enhancementLevel || 0}`;
				items[key] = {
					count: 1,
					value: Math.round(item.value || 0)
				};
			}
			for (const room of data.fixedAssets.houses.breakdown) items[`house:${room.hrid}`] = {
				count: room.level,
				value: Math.round(room.cost)
			};
			for (const ability of data.fixedAssets.abilities.breakdown) items[`ability:${ability.hrid}`] = {
				count: 1,
				value: Math.round(ability.cost)
			};
			for (const book of data.fixedAssets.abilityBooks.breakdown) {
				if (!book.itemHrid) continue;
				items[`abilitybook:${book.itemHrid}`] = {
					count: book.count || 1,
					value: Math.round(book.value || 0)
				};
			}
			for (const listing of data.currentAssets.listings.breakdown) {
				if (!listing.itemHrid) continue;
				const key = `listing:${listing.isSell ? "sell" : "buy"}:${listing.itemHrid}:${listing.enhancementLevel || 0}`;
				if (items[key]) {
					items[key].value += Math.round(listing.value);
					items[key].count += 1;
				} else items[key] = {
					count: 1,
					value: Math.round(listing.value)
				};
			}
			this.detailHistory.push({
				t: Date.now(),
				items
			});
			if (this.detailHistory.length > MAX_DETAIL_SNAPSHOTS) this.detailHistory.splice(0, this.detailHistory.length - MAX_DETAIL_SNAPSHOTS);
		}
		/**
		* Get the detail snapshot closest to the target timestamp.
		* Used to find the ~24h ago snapshot for diffing.
		* @param {number} targetTs - Target timestamp to find closest snapshot to
		* @returns {Object|null} Detail snapshot { t, items } or null if none available
		*/
		getDetailSnapshot(targetTs) {
			if (this.detailHistory.length === 0) return null;
			let closest = this.detailHistory[0];
			let closestDiff = Math.abs(closest.t - targetTs);
			for (let i = 1; i < this.detailHistory.length; i++) {
				const diff = Math.abs(this.detailHistory[i].t - targetTs);
				if (diff < closestDiff) {
					closest = this.detailHistory[i];
					closestDiff = diff;
				}
			}
			return closest;
		}
		/**
		* Get the full history array
		* @returns {Array} Array of snapshot objects
		*/
		getHistory() {
			return this.history;
		}
		/**
		* Delete a snapshot by timestamp and persist the change to storage.
		* @param {number} timestamp - The `t` value of the snapshot to remove
		*/
		async deleteSnapshot(timestamp) {
			const idx = this.history.findIndex((s) => s.t === timestamp);
			if (idx === -1) return;
			this.history.splice(idx, 1);
			const storageKey = `networth_${this.characterId}`;
			await src_core_storage_js.default.set(storageKey, this.history, STORE_NAME);
		}
		/**
		* Cleanup when disabled
		*/
		disable() {
			this.timerRegistry.clearAll();
			this.history = [];
			this.detailHistory = [];
			this.characterId = null;
			this.networthFeature = null;
		}
	};
	var networthHistory = new NetworthHistory();
	//#endregion
	//#region src/features/networth/networth-history-chart.js
	/**
	* Networth History Chart
	* Pop-out modal with Chart.js line chart showing networth over time.
	* Supports time range selection, gap handling, and tooltip breakdown.
	*/
	var RANGE_MS = {
		"24h": 864e5,
		"7d": 6048e5,
		"30d": 2592e6,
		all: Infinity
	};
	var CATEGORIES = [
		{
			key: "gold",
			label: (0, src_core_i18n_js.t)("Gold"),
			color: "#eab308"
		},
		{
			key: "inventory",
			label: (0, src_core_i18n_js.t)("Inventory"),
			color: "#3b82f6"
		},
		{
			key: "equipment",
			label: (0, src_core_i18n_js.t)("Equipment"),
			color: "#ef4444"
		},
		{
			key: "listings",
			label: (0, src_core_i18n_js.t)("Listings"),
			color: "#8b5cf6"
		},
		{
			key: "house",
			label: (0, src_core_i18n_js.t)("House"),
			color: "#f97316"
		},
		{
			key: "abilities",
			label: (0, src_core_i18n_js.t)("Abilities"),
			color: "#06b6d4"
		}
	];
	var NetworthHistoryChart = class {
		constructor() {
			this.chartInstance = null;
			this.escHandler = null;
			this.networthFeature = null;
			this.activeRange = "7d";
			this.connectGaps = false;
			this.showBars = false;
			this.movingAvgWindow = 0;
			this.categoryVisibility = {
				showTotal: true,
				showNonExcluded: true,
				gold: false,
				inventory: false,
				equipment: false,
				listings: false,
				house: false,
				abilities: false
			};
			this.currentRange = "7d";
			this.currentCustomFrom = null;
			this.currentCustomTo = null;
			this._deletePopup = null;
			this._deletePopupOutsideHandler = null;
			this._deletePopupOutsideTimer = null;
			this._outsideClickTimer = null;
		}
		/**
		* Load persisted chart toggle preferences
		*/
		async _loadChartPrefs() {
			const prefs = await src_core_storage_js.default.get("networthChartPrefs", "networthHistory", {});
			if (prefs.connectGaps !== void 0) this.connectGaps = prefs.connectGaps;
			if (prefs.showBars !== void 0) this.showBars = prefs.showBars;
			if (prefs.movingAvgWindow !== void 0) this.movingAvgWindow = prefs.movingAvgWindow;
			if (prefs.categoryVisibility !== void 0) this.categoryVisibility = {
				...this.categoryVisibility,
				...prefs.categoryVisibility
			};
			if (prefs.activeRange !== void 0) this.activeRange = prefs.activeRange;
		}
		/**
		* Returns true if at least one line (Total or any category) is visible
		*/
		_hasAnyVisible() {
			if (this.categoryVisibility.showTotal) return true;
			if (this.categoryVisibility.showNonExcluded) return true;
			return CATEGORIES.some((c) => this.categoryVisibility[c.key]);
		}
		/**
		* Save chart toggle preferences
		*/
		_saveChartPrefs() {
			src_core_storage_js.default.set("networthChartPrefs", {
				connectGaps: this.connectGaps,
				showBars: this.showBars,
				movingAvgWindow: this.movingAvgWindow,
				categoryVisibility: this.categoryVisibility,
				activeRange: this.activeRange
			}, "networthHistory");
		}
		/**
		* Set reference to networth feature for live data access
		* @param {Object} feature - NetworthFeature instance
		*/
		setNetworthFeature(feature) {
			this.networthFeature = feature;
		}
		/**
		* Open the chart modal
		*/
		async openModal() {
			await this._loadChartPrefs();
			const existing = document.getElementById("mwi-nw-chart-modal");
			if (existing) existing.remove();
			const modal = document.createElement("div");
			modal.id = "mwi-nw-chart-modal";
			modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 1200px;
            height: 80%;
            max-height: 750px;
            background: #1a1a1a;
            border: 2px solid #555;
            border-radius: 8px;
            padding: 20px;
            z-index: 100000;
            display: flex;
            flex-direction: column;
        `;
			const header = document.createElement("div");
			header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        `;
			const title = document.createElement("h3");
			title.textContent = (0, src_core_i18n_js.t)("Net Worth History");
			title.style.cssText = "color: #ccc; margin: 0; font-size: 18px;";
			const closeBtn = document.createElement("button");
			closeBtn.textContent = "✕";
			closeBtn.style.cssText = `
            background: #a33;
            color: #fff;
            border: none;
            cursor: pointer;
            font-size: 20px;
            padding: 4px 12px;
            border-radius: 4px;
            font-weight: bold;
        `;
			closeBtn.addEventListener("click", () => this.closeModal());
			header.appendChild(title);
			header.appendChild(closeBtn);
			const rangeRow = document.createElement("div");
			rangeRow.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
        `;
			for (const range of [
				"24h",
				"7d",
				"30d",
				"all"
			]) {
				const btn = document.createElement("button");
				btn.textContent = range === "all" ? (0, src_core_i18n_js.t)("All") : range.toUpperCase();
				btn.dataset.range = range;
				btn.className = "mwi-nw-range-btn";
				btn.style.cssText = `
                background: ${range === this.activeRange ? "#444" : "#2a2a2a"};
                color: ${range === this.activeRange ? "#fff" : "#999"};
                border: 1px solid #555;
                cursor: pointer;
                padding: 4px 14px;
                border-radius: 4px;
                font-size: 13px;
            `;
				btn.addEventListener("click", () => {
					this._selectPresetRange(btn, rangeRow, range);
				});
				rangeRow.appendChild(btn);
			}
			const gapToggle = document.createElement("button");
			gapToggle.textContent = (0, src_core_i18n_js.t)("Connect Gaps");
			gapToggle.className = "mwi-nw-gap-toggle";
			const updateGapToggleStyle = () => {
				gapToggle.style.cssText = `
                background: ${this.connectGaps ? "#444" : "#2a2a2a"};
                color: ${this.connectGaps ? "#fff" : "#999"};
                border: 1px solid #555;
                cursor: pointer;
                padding: 4px 14px;
                border-radius: 4px;
                font-size: 13px;
                margin-left: 4px;
            `;
			};
			updateGapToggleStyle();
			gapToggle.addEventListener("click", () => {
				this.connectGaps = !this.connectGaps;
				updateGapToggleStyle();
				this._saveChartPrefs();
				this.renderChart(this.currentRange, this.currentCustomFrom, this.currentCustomTo);
			});
			rangeRow.appendChild(gapToggle);
			const barToggle = document.createElement("button");
			barToggle.textContent = (0, src_core_i18n_js.t)("Show Bars");
			barToggle.className = "mwi-nw-bar-toggle";
			const updateBarToggleStyle = () => {
				barToggle.style.cssText = `
                background: ${this.showBars ? "#444" : "#2a2a2a"};
                color: ${this.showBars ? "#fff" : "#999"};
                border: 1px solid #555;
                cursor: pointer;
                padding: 4px 14px;
                border-radius: 4px;
                font-size: 13px;
                margin-left: 4px;
            `;
			};
			updateBarToggleStyle();
			barToggle.addEventListener("click", () => {
				this.showBars = !this.showBars;
				updateBarToggleStyle();
				this._saveChartPrefs();
				this.renderChart(this.currentRange, this.currentCustomFrom, this.currentCustomTo);
			});
			rangeRow.appendChild(barToggle);
			const maLabel = document.createElement("span");
			maLabel.textContent = (0, src_core_i18n_js.t)("Avg:");
			maLabel.style.cssText = "color: #999; font-size: 12px; margin-left: 8px;";
			rangeRow.appendChild(maLabel);
			const maSelect = document.createElement("select");
			maSelect.className = "mwi-nw-ma-select";
			maSelect.style.cssText = `
            background: #2a2a2a;
            color: #ccc;
            border: 1px solid #555;
            border-radius: 4px;
            padding: 3px 6px;
            font-size: 13px;
            cursor: pointer;
            color-scheme: dark;
        `;
			const maOptions = [
				{
					value: 0,
					label: (0, src_core_i18n_js.t)("Off")
				},
				{
					value: 3,
					label: "3h"
				},
				{
					value: 6,
					label: "6h"
				},
				{
					value: 12,
					label: "12h"
				},
				{
					value: 24,
					label: "24h"
				},
				{
					value: 48,
					label: "48h"
				},
				{
					value: 168,
					label: "7d"
				}
			];
			if (this.movingAvgWindow > 0 && !maOptions.some((o) => o.value === this.movingAvgWindow)) maOptions.push({
				value: this.movingAvgWindow,
				label: `${this.movingAvgWindow}h`
			});
			maOptions.push({
				value: -1,
				label: (0, src_core_i18n_js.t)("Custom…")
			});
			for (const opt of maOptions) {
				const option = document.createElement("option");
				option.value = opt.value;
				option.textContent = opt.label;
				if (opt.value === this.movingAvgWindow) option.selected = true;
				maSelect.appendChild(option);
			}
			maSelect.addEventListener("change", () => {
				const val = parseInt(maSelect.value, 10);
				if (val === -1) {
					const input = prompt((0, src_core_i18n_js.t)("Enter moving average window in hours:"));
					const parsed = parseInt(input, 10);
					if (parsed > 0) {
						this.movingAvgWindow = parsed;
						if (!maSelect.querySelector(`option[value="${parsed}"]`)) {
							const customOpt = document.createElement("option");
							customOpt.value = parsed;
							customOpt.textContent = `${parsed}h`;
							maSelect.insertBefore(customOpt, maSelect.querySelector("option[value=\"-1\"]"));
						}
						maSelect.value = parsed;
					} else {
						maSelect.value = this.movingAvgWindow;
						return;
					}
				} else this.movingAvgWindow = val;
				this._saveChartPrefs();
				this.renderChart(this.currentRange, this.currentCustomFrom, this.currentCustomTo);
			});
			rangeRow.appendChild(maSelect);
			const spacer = document.createElement("div");
			spacer.style.flex = "1";
			rangeRow.appendChild(spacer);
			const dateInputStyle = `
            background: #2a2a2a;
            color: #ccc;
            border: 1px solid #555;
            border-radius: 4px;
            padding: 3px 8px;
            font-size: 12px;
            color-scheme: dark;
            cursor: pointer;
        `;
			const fromLabel = document.createElement("span");
			fromLabel.textContent = (0, src_core_i18n_js.t)("From:");
			fromLabel.style.cssText = "color: #999; font-size: 12px;";
			rangeRow.appendChild(fromLabel);
			const fromInput = document.createElement("input");
			fromInput.type = "date";
			fromInput.id = "mwi-nw-date-from";
			fromInput.style.cssText = dateInputStyle;
			fromInput.addEventListener("change", () => {
				this._onDateInputChange(rangeRow);
			});
			rangeRow.appendChild(fromInput);
			const toLabel = document.createElement("span");
			toLabel.textContent = (0, src_core_i18n_js.t)("To:");
			toLabel.style.cssText = "color: #999; font-size: 12px;";
			rangeRow.appendChild(toLabel);
			const toInput = document.createElement("input");
			toInput.type = "date";
			toInput.id = "mwi-nw-date-to";
			toInput.style.cssText = dateInputStyle;
			toInput.addEventListener("change", () => {
				this._onDateInputChange(rangeRow);
			});
			rangeRow.appendChild(toInput);
			const categoryRow = document.createElement("div");
			categoryRow.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 10px;
        `;
			const categoryButtons = {};
			const totalColor = src_core_config_js.default.COLOR_ACCENT || "#22c55e";
			const totalBtn = document.createElement("button");
			const updateTotalBtnStyle = () => {
				const active = this.categoryVisibility.showTotal;
				totalBtn.style.cssText = `
                background: ${active ? totalColor + "33" : "#2a2a2a"};
                color: ${active ? "#fff" : "#999"};
                border: 1px solid ${active ? totalColor : "#555"};
                cursor: pointer;
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 0.8em;
                display: flex;
                align-items: center;
                gap: 5px;
            `;
			};
			const totalDot = document.createElement("span");
			totalDot.style.cssText = `
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 2px;
            background: ${totalColor};
            flex-shrink: 0;
        `;
			totalBtn.appendChild(totalDot);
			totalBtn.appendChild(document.createTextNode((0, src_core_i18n_js.t)("Total")));
			updateTotalBtnStyle();
			totalBtn.addEventListener("click", () => {
				this.categoryVisibility.showTotal = !this.categoryVisibility.showTotal;
				if (!this._hasAnyVisible()) this.categoryVisibility.showTotal = true;
				updateTotalBtnStyle();
				this._saveChartPrefs();
				this.renderChart(this.currentRange, this.currentCustomFrom, this.currentCustomTo);
			});
			categoryRow.appendChild(totalBtn);
			const nonExclColor = "#a78bfa";
			const nonExclBtn = document.createElement("button");
			nonExclBtn.id = "mwi-nw-nonexcl-chip";
			const updateNonExclBtnStyle = () => {
				const active = this.categoryVisibility.showNonExcluded;
				nonExclBtn.style.cssText = `
                background: ${active ? "#a78bfa33" : "#2a2a2a"};
                color: ${active ? "#fff" : "#999"};
                border: 1px solid ${active ? nonExclColor : "#555"};
                cursor: pointer;
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 0.8em;
                display: flex;
                align-items: center;
                gap: 5px;
            `;
			};
			const nonExclDot = document.createElement("span");
			nonExclDot.style.cssText = `
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 2px;
            background: ${nonExclColor};
            flex-shrink: 0;
        `;
			nonExclBtn.appendChild(nonExclDot);
			nonExclBtn.appendChild(document.createTextNode((0, src_core_i18n_js.t)("Non-Excluded")));
			updateNonExclBtnStyle();
			nonExclBtn.addEventListener("click", () => {
				this.categoryVisibility.showNonExcluded = !this.categoryVisibility.showNonExcluded;
				if (!this._hasAnyVisible()) this.categoryVisibility.showNonExcluded = true;
				updateNonExclBtnStyle();
				this._saveChartPrefs();
				this.renderChart(this.currentRange, this.currentCustomFrom, this.currentCustomTo);
			});
			categoryRow.appendChild(nonExclBtn);
			for (const cat of CATEGORIES) {
				const btn = document.createElement("button");
				categoryButtons[cat.key] = btn;
				const updateCatBtnStyle = () => {
					const active = this.categoryVisibility[cat.key];
					btn.style.cssText = `
                    background: ${active ? cat.color + "33" : "#2a2a2a"};
                    color: ${active ? "#fff" : "#999"};
                    border: 1px solid ${active ? cat.color : "#555"};
                    cursor: pointer;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 0.8em;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                `;
				};
				const dot = document.createElement("span");
				dot.style.cssText = `
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 2px;
                background: ${cat.color};
                flex-shrink: 0;
            `;
				btn.appendChild(dot);
				btn.appendChild(document.createTextNode((0, src_core_i18n_js.t)(cat.label)));
				updateCatBtnStyle();
				btn.addEventListener("click", () => {
					this.categoryVisibility[cat.key] = !this.categoryVisibility[cat.key];
					if (!this._hasAnyVisible()) {
						this.categoryVisibility.showTotal = true;
						updateTotalBtnStyle();
					}
					updateCatBtnStyle();
					this._saveChartPrefs();
					this.renderChart(this.currentRange, this.currentCustomFrom, this.currentCustomTo);
				});
				categoryRow.appendChild(btn);
			}
			const statsRow = document.createElement("div");
			statsRow.id = "mwi-nw-chart-stats";
			statsRow.style.cssText = `
            display: flex;
            gap: 24px;
            margin-bottom: 12px;
            font-size: 13px;
            color: #ccc;
        `;
			const canvasContainer = document.createElement("div");
			canvasContainer.style.cssText = `
            flex: 1;
            position: relative;
            min-height: 0;
        `;
			const canvas = document.createElement("canvas");
			canvas.id = "mwi-nw-chart-canvas";
			canvasContainer.appendChild(canvas);
			modal.appendChild(header);
			modal.appendChild(rangeRow);
			modal.appendChild(categoryRow);
			modal.appendChild(statsRow);
			modal.appendChild(canvasContainer);
			document.body.appendChild(modal);
			this.escHandler = (e) => {
				if (e.key === "Escape") this.closeModal();
			};
			document.addEventListener("keydown", this.escHandler);
			this.outsideClickHandler = (e) => {
				const breakdownPopout = document.getElementById("mwi-nw-24h-breakdown");
				if (!modal.contains(e.target) && !this._deletePopup?.contains(e.target) && !breakdownPopout?.contains(e.target)) this.closeModal();
			};
			const queuedHandler = this.outsideClickHandler;
			this._outsideClickTimer = setTimeout(() => {
				this._outsideClickTimer = null;
				if (this.outsideClickHandler !== queuedHandler) return;
				document.addEventListener("mousedown", this.outsideClickHandler);
			}, 0);
			this.renderChart(this.activeRange);
		}
		/**
		* Select a preset range button, clear date inputs, and render
		* @param {HTMLElement} btn - Clicked button
		* @param {HTMLElement} rangeRow - Row container for deselecting siblings
		* @param {string} range - '24h', '7d', '30d', or 'all'
		*/
		_selectPresetRange(btn, rangeRow, range) {
			for (const sibling of rangeRow.querySelectorAll(".mwi-nw-range-btn")) {
				sibling.style.background = "#2a2a2a";
				sibling.style.color = "#999";
			}
			btn.style.background = "#444";
			btn.style.color = "#fff";
			const fromInput = document.getElementById("mwi-nw-date-from");
			const toInput = document.getElementById("mwi-nw-date-to");
			if (fromInput) fromInput.value = "";
			if (toInput) toInput.value = "";
			this.activeRange = range;
			this._saveChartPrefs();
			this.renderChart(range);
		}
		/**
		* Handle date input change — deselect preset buttons and render custom range
		* @param {HTMLElement} rangeRow - Row container
		*/
		_onDateInputChange(rangeRow) {
			const fromInput = document.getElementById("mwi-nw-date-from");
			const toInput = document.getElementById("mwi-nw-date-to");
			if (!fromInput || !toInput) return;
			if (!fromInput.value && !toInput.value) return;
			for (const btn of rangeRow.querySelectorAll(".mwi-nw-range-btn")) {
				btn.style.background = "#2a2a2a";
				btn.style.color = "#999";
			}
			const fromMs = fromInput.value ? (/* @__PURE__ */ new Date(fromInput.value + "T00:00:00")).getTime() : 0;
			const toMs = toInput.value ? (/* @__PURE__ */ new Date(toInput.value + "T23:59:59")).getTime() : Date.now();
			this.activeRange = "custom";
			this.renderChart("custom", fromMs, toMs);
		}
		/**
		* Render the chart for a given time range
		* @param {string} range - '24h', '7d', '30d', 'all', or 'custom'
		* @param {number} [customFrom] - Custom start timestamp (for 'custom' range)
		* @param {number} [customTo] - Custom end timestamp (for 'custom' range)
		*/
		renderChart(range, customFrom, customTo) {
			this.currentRange = range;
			this.currentCustomFrom = customFrom;
			this.currentCustomTo = customTo;
			const canvas = document.getElementById("mwi-nw-chart-canvas");
			if (!canvas) return;
			if (this.chartInstance) {
				this.chartInstance.destroy();
				this.chartInstance = null;
			}
			const staleTooltip = document.getElementById("mwi-nw-chart-tooltip");
			if (staleTooltip) staleTooltip.remove();
			const history = networthHistory.getHistory();
			if (history.length === 0) {
				this.updateSummaryStats([]);
				return;
			}
			const now = Date.now();
			let filtered;
			if (range === "custom") {
				const from = customFrom || 0;
				const to = customTo || now;
				filtered = history.filter((p) => p.t >= from && p.t <= to);
			} else {
				const cutoff = range === "all" ? 0 : now - RANGE_MS[range];
				filtered = history.filter((p) => p.t >= cutoff);
			}
			if (filtered.length === 0) {
				this.updateSummaryStats([]);
				return;
			}
			this.updateSummaryStats(filtered);
			let chartData;
			if (this.connectGaps) chartData = filtered.map((p) => ({
				x: p.t,
				y: p.total,
				_raw: p
			}));
			else {
				const segments = [];
				let currentSegment = [filtered[0]];
				for (let i = 1; i < filtered.length; i++) if (filtered[i].t - filtered[i - 1].t > 72e5) {
					segments.push(currentSegment);
					currentSegment = [filtered[i]];
				} else currentSegment.push(filtered[i]);
				segments.push(currentSegment);
				chartData = [];
				for (let i = 0; i < segments.length; i++) {
					for (const point of segments[i]) chartData.push({
						x: point.t,
						y: point.total,
						_raw: point
					});
					if (i < segments.length - 1) {
						const gapTime = segments[i][segments[i].length - 1].t + 1;
						chartData.push({
							x: gapTime,
							y: NaN
						});
					}
				}
			}
			const rangeSpanMs = filtered[filtered.length - 1].t - filtered[0].t;
			const isShortRange = range === "24h" || range === "custom" && rangeSpanMs <= 1728e5;
			const ctx = canvas.getContext("2d");
			const datasets = [];
			const hasNonExcludedData = filtered.some((p) => p.nonExcluded != null && p.nonExcluded !== p.total);
			if (this.showBars) {
				const barData = chartData.filter((p) => !isNaN(p.y));
				datasets.push({
					type: "bar",
					label: "Net Worth (bars)",
					data: barData,
					backgroundColor: "rgba(34, 197, 94, 0.3)",
					borderColor: "transparent",
					borderWidth: 0,
					barThickness: 6,
					minBarLength: 2,
					order: 2
				});
			}
			if (this.categoryVisibility.showTotal) datasets.push({
				type: "line",
				label: "Total Net Worth",
				data: chartData,
				borderColor: src_core_config_js.default.COLOR_ACCENT || "#22c55e",
				backgroundColor: "rgba(34, 197, 94, 0.1)",
				borderWidth: 2,
				pointRadius: filtered.length > 200 ? 0 : 2,
				pointHoverRadius: 5,
				tension: .1,
				fill: true,
				spanGaps: this.connectGaps,
				order: 1
			});
			if (this.categoryVisibility.showNonExcluded && hasNonExcludedData) {
				const neData = chartData.map((p) => ({
					x: p.x,
					y: p._raw?.nonExcluded != null ? p._raw.nonExcluded : NaN
				}));
				datasets.push({
					type: "line",
					label: "Non-Excluded",
					data: neData,
					borderColor: "#a78bfa",
					backgroundColor: "transparent",
					borderWidth: 2,
					pointRadius: filtered.length > 200 ? 0 : 2,
					pointHoverRadius: 5,
					tension: .1,
					fill: false,
					spanGaps: this.connectGaps,
					order: 1
				});
			}
			for (const cat of CATEGORIES) {
				if (!this.categoryVisibility[cat.key]) continue;
				const catData = chartData.map((p) => {
					if (!p._raw) return {
						x: p.x,
						y: NaN
					};
					let val = p._raw[cat.key];
					if (cat.key === "inventory") val = (val || 0) - (p._raw.gold || 0);
					return {
						x: p.x,
						y: val
					};
				});
				datasets.push({
					type: "line",
					label: cat.label,
					data: catData,
					borderColor: cat.color,
					backgroundColor: "transparent",
					borderWidth: 1.5,
					pointRadius: 0,
					pointHoverRadius: 0,
					tension: .1,
					fill: false,
					spanGaps: this.connectGaps,
					parsing: false
				});
			}
			if (this.movingAvgWindow > 0) {
				const realPoints = chartData.filter((p) => !isNaN(p.y));
				const maData = [];
				const half = Math.floor(this.movingAvgWindow / 2);
				for (let i = 0; i < realPoints.length; i++) {
					const reach = Math.min(half, i, realPoints.length - 1 - i);
					let sum = 0;
					let count = 0;
					for (let j = i - reach; j <= i + reach; j++) {
						sum += realPoints[j].y;
						count++;
					}
					maData.push({
						x: realPoints[i].x,
						y: sum / count
					});
				}
				datasets.push({
					type: "line",
					label: `${this.movingAvgWindow >= 24 && this.movingAvgWindow % 24 === 0 ? `${this.movingAvgWindow / 24}d` : `${this.movingAvgWindow}h`} Moving Avg`,
					data: maData,
					borderColor: "#f59e0b",
					backgroundColor: "transparent",
					borderWidth: 2,
					borderDash: [6, 3],
					pointRadius: 0,
					pointHoverRadius: 4,
					tension: .2,
					fill: false,
					spanGaps: true,
					order: 0
				});
			}
			const visibleCategories = CATEGORIES.filter((c) => this.categoryVisibility[c.key]);
			const yAxisTitle = !this.categoryVisibility.showTotal && visibleCategories.length > 0 ? (0, src_core_i18n_js.t)("Category Value") : (0, src_core_i18n_js.t)("Net Worth");
			this.chartInstance = new Chart(ctx, {
				type: "line",
				data: { datasets },
				options: {
					responsive: true,
					maintainAspectRatio: false,
					parsing: false,
					onClick: (event, elements) => {
						this._onChartClick(event, elements);
					},
					interaction: {
						mode: "nearest",
						intersect: false
					},
					plugins: {
						legend: { display: false },
						datalabels: { display: false },
						tooltip: {
							enabled: false,
							external: (context) => this._renderCustomTooltip(context),
							filter: (tooltipItem) => {
								if (tooltipItem.dataset.type === "bar") return false;
								if (isNaN(tooltipItem.raw?.y)) return false;
								if (tooltipItem.dataset.label === "Total Net Worth") return true;
								if (tooltipItem.dataset.label === "Non-Excluded") return true;
								const cat = CATEGORIES.find((c) => c.label === tooltipItem.dataset.label);
								return cat ? this.categoryVisibility[cat.key] : false;
							}
						}
					},
					scales: {
						x: {
							type: "linear",
							offset: false,
							min: filtered[0].t,
							max: filtered[filtered.length - 1].t,
							ticks: {
								color: "#999",
								maxTicksLimit: 10,
								callback: (value) => {
									const d = new Date(value);
									if (isShortRange) return (0, src_utils_formatters_js.formatDateTime)(d, {
										includeDate: false,
										includeSeconds: false
									});
									return (0, src_utils_formatters_js.formatDateTime)(d, { includeTime: false });
								}
							},
							grid: { color: "#333" }
						},
						y: {
							beginAtZero: false,
							title: {
								display: true,
								text: yAxisTitle,
								color: "#ccc"
							},
							ticks: {
								color: "#999",
								callback: (value) => (0, src_utils_formatters_js.networthFormatter)(value)
							},
							grid: { color: "#333" }
						}
					}
				}
			});
		}
		/**
		* Update the summary stats row
		* @param {Array} filtered - Filtered history data for the current range
		*/
		updateSummaryStats(filtered) {
			const statsRow = document.getElementById("mwi-nw-chart-stats");
			if (!statsRow) return;
			if (filtered.length === 0) {
				statsRow.innerHTML = `<span style="color: #666;">${(0, src_core_i18n_js.t)("No data available for this range")}</span>`;
				return;
			}
			const parts = [];
			const first = filtered[0];
			const last = filtered[filtered.length - 1];
			const hoursElapsed = (last.t - first.t) / 36e5;
			const rangeLabel = {
				"24h": "24H",
				"7d": "7D",
				"30d": "30D",
				all: "All",
				custom: "Range"
			}[this.currentRange] || "24H";
			const is24hRange = this.currentRange === "24h";
			if (this.categoryVisibility.showTotal) {
				const liveData = this.networthFeature?.currentData;
				const currentTotal = liveData ? Math.round(liveData.totalNetworth + (liveData.excluded?.total ?? 0)) : last.total;
				const rangeChange = currentTotal - first.total;
				const rangePercent = first.total > 0 ? rangeChange / first.total * 100 : 0;
				const ratePerHour = hoursElapsed > 0 ? (currentTotal - first.total) / hoursElapsed : 0;
				parts.push(`<span>${(0, src_core_i18n_js.t)("Current:")} <strong style="color: ${src_core_config_js.default.COLOR_ACCENT};">${(0, src_utils_formatters_js.networthFormatter)(Math.round(currentTotal))}</strong></span>`);
				if (filtered.length >= 2) {
					const color = rangeChange >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
					const sign = rangeChange >= 0 ? "+" : "";
					const breakdownAttr = is24hRange ? ` id="mwi-nw-24h-toggle" style="cursor: pointer;" title="${(0, src_core_i18n_js.t)("Click for item breakdown")}"` : "";
					const breakdownArrow = is24hRange ? " <span style=\"font-size: 10px; color: #666;\">▼</span>" : "";
					parts.push(`<span${breakdownAttr}>${(0, src_core_i18n_js.t)("Last {0}:", rangeLabel)} <strong style="color: ${color};">${sign}${(0, src_utils_formatters_js.networthFormatter)(Math.round(rangeChange))} (${sign}${rangePercent.toFixed(1)}%)</strong>${breakdownArrow}</span>`);
				}
				if (hoursElapsed >= 1) {
					const color = ratePerHour >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
					const sign = ratePerHour >= 0 ? "+" : "";
					parts.push(`<span>${(0, src_core_i18n_js.t)("Rate:")} <strong style="color: ${color};">${sign}${(0, src_utils_formatters_js.networthFormatter)(Math.round(ratePerHour))}/hr</strong></span>`);
				}
			}
			const hasNonExclStats = filtered.some((p) => p.nonExcluded != null && p.nonExcluded !== p.total);
			if (this.categoryVisibility.showNonExcluded && hasNonExclStats) {
				const currentNE = this.networthFeature?.currentData?.totalNetworth ?? last.nonExcluded ?? last.total;
				const firstNE = first.nonExcluded ?? first.total;
				const neRate = hoursElapsed > 0 ? (currentNE - firstNE) / hoursElapsed : 0;
				let neStatHtml = `<span style="color: #a78bfa;">${(0, src_core_i18n_js.t)("Non-Excl")}</span>: <strong style="color: #a78bfa;">${(0, src_utils_formatters_js.networthFormatter)(Math.round(currentNE))}</strong>`;
				if (filtered.length >= 2) {
					const neChange = currentNE - firstNE;
					const neChangeColor = neChange >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
					neStatHtml += ` <span style="font-size: 11px; color: #aaa;">(${neChange >= 0 ? "+" : ""}<span style="color: ${neChangeColor};">${(0, src_utils_formatters_js.networthFormatter)(Math.round(neChange))}</span> ${rangeLabel})</span>`;
				}
				if (hoursElapsed >= 1) {
					const neRateColor = neRate >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
					neStatHtml += ` <span style="font-size: 11px; color: #aaa;">${neRate >= 0 ? "+" : ""}<span style="color: ${neRateColor};">${(0, src_utils_formatters_js.networthFormatter)(Math.round(neRate))}/hr</span></span>`;
				}
				parts.push(`<span>${neStatHtml}</span>`);
			}
			for (const cat of CATEGORIES) {
				if (!this.categoryVisibility[cat.key]) continue;
				let firstVal = first[cat.key] ?? 0;
				let lastVal = last[cat.key] ?? 0;
				if (cat.key === "inventory") {
					firstVal -= first.gold ?? 0;
					lastVal -= last.gold ?? 0;
				}
				const catChange = lastVal - firstVal;
				const rate = hoursElapsed > 0 ? catChange / hoursElapsed : 0;
				const rateColor = rate >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
				const rateSign = rate >= 0 ? "+" : "";
				const catChangeColor = catChange >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
				const catChangeSign = catChange >= 0 ? "+" : "";
				let statHtml = `${(0, src_core_i18n_js.t)(cat.label)}: <strong style="color: ${catChangeColor};">${(0, src_core_i18n_js.t)("Last {0}:", rangeLabel)} ${catChangeSign}${(0, src_utils_formatters_js.networthFormatter)(Math.round(catChange))}</strong>`;
				if (hoursElapsed >= 1) statHtml += ` <span style="font-size: 11px; color: #aaa;">${rateSign}<span style="color: ${rateColor};">${(0, src_utils_formatters_js.networthFormatter)(Math.round(rate))}/hr</span></span>`;
				parts.push(`<span>${statHtml}</span>`);
			}
			if (parts.length === 0) {
				statsRow.innerHTML = `<span style="color: #666;">${(0, src_core_i18n_js.t)("No data available for this range")}</span>`;
				return;
			}
			statsRow.innerHTML = parts.join("<span style=\"color: #555; margin: 0 2px;\">·</span>");
			const toggle24h = document.getElementById("mwi-nw-24h-toggle");
			if (toggle24h) toggle24h.addEventListener("click", () => this.toggle24hBreakdown());
		}
		/**
		* Toggle the 24h item-level breakdown popout
		*/
		toggle24hBreakdown() {
			const existing = document.getElementById("mwi-nw-24h-breakdown");
			if (existing) {
				existing.remove();
				return;
			}
			const toggle = document.getElementById("mwi-nw-24h-toggle");
			if (!toggle) return;
			const container = document.createElement("div");
			container.id = "mwi-nw-24h-breakdown";
			container.style.cssText = `
            position: absolute;
            background: #222;
            border: 1px solid #444;
            border-radius: 6px;
            padding: 10px 14px;
            max-height: 300px;
            width: 360px;
            overflow-y: auto;
            font-size: 12px;
            color: #ccc;
            z-index: 100001;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        `;
			const rect = toggle.getBoundingClientRect();
			container.style.top = `${rect.bottom + 4}px`;
			container.style.left = `${rect.left}px`;
			this.render24hBreakdown(container);
			document.body.appendChild(container);
			const closeHandler = (e) => {
				if (!container.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
					container.remove();
					document.removeEventListener("mousedown", closeHandler);
				}
			};
			setTimeout(() => {
				if (!document.body.contains(container)) return;
				document.addEventListener("mousedown", closeHandler);
			}, 0);
		}
		/**
		* Render the 24h item-level breakdown into the given container.
		* Decomposes each item's change into activity impact (quantity changes)
		* and market movement (price changes on existing holdings).
		* @param {HTMLElement} container - Breakdown container element
		*/
		render24hBreakdown(container) {
			const currentData = this.networthFeature?.currentData;
			if (!currentData) {
				container.innerHTML = `<span style="color: #666;">${(0, src_core_i18n_js.t)("No live data available")}</span>`;
				return;
			}
			const oneDayAgo = Date.now() - 864e5;
			const oldSnapshot = networthHistory.getDetailSnapshot(oneDayAgo);
			if (!oldSnapshot) {
				container.innerHTML = `<span style="color: #666;">${(0, src_core_i18n_js.t)("No detail snapshot available yet (data collected hourly)")}</span>`;
				return;
			}
			const currentItems = {};
			const gameData = src_core_data_manager_js.default.getInitClientData();
			currentItems["/items/coin:0"] = {
				count: Math.round(currentData.coins),
				value: Math.round(currentData.coins),
				name: (0, src_core_i18n_js.t)("Gold")
			};
			for (const item of currentData.currentAssets.inventory.breakdown) {
				if (!item.itemHrid) continue;
				const key = `${item.itemHrid}:${item.enhancementLevel || 0}`;
				currentItems[key] = {
					count: item.count || 0,
					value: Math.round(item.value || 0),
					name: item.name
				};
			}
			for (const item of currentData.currentAssets.equipped.breakdown) {
				if (!item.itemHrid) continue;
				const key = `${item.itemHrid}:${item.enhancementLevel || 0}`;
				currentItems[key] = {
					count: 1,
					value: Math.round(item.value || 0),
					name: item.name
				};
			}
			for (const room of currentData.fixedAssets.houses.breakdown) currentItems[`house:${room.hrid}`] = {
				count: room.level,
				value: Math.round(room.cost),
				name: room.name
			};
			for (const ability of currentData.fixedAssets.abilities.breakdown) currentItems[`ability:${ability.hrid}`] = {
				count: 1,
				value: Math.round(ability.cost),
				name: ability.name
			};
			for (const book of currentData.fixedAssets.abilityBooks.breakdown) {
				if (!book.itemHrid) continue;
				currentItems[`abilitybook:${book.itemHrid}`] = {
					count: book.count || 1,
					value: Math.round(book.value || 0),
					name: book.name
				};
			}
			for (const listing of currentData.currentAssets.listings.breakdown) {
				if (!listing.itemHrid) continue;
				const key = `listing:${listing.isSell ? "sell" : "buy"}:${listing.itemHrid}:${listing.enhancementLevel || 0}`;
				if (currentItems[key]) {
					currentItems[key].value += Math.round(listing.value);
					currentItems[key].count += 1;
				} else currentItems[key] = {
					count: 1,
					value: Math.round(listing.value),
					name: listing.name,
					isSell: listing.isSell
				};
			}
			const activityItems = [];
			const marketItems = [];
			const otherItems = [];
			let activityTotal = 0;
			let marketTotal = 0;
			let otherTotal = 0;
			const allKeys = /* @__PURE__ */ new Set([...Object.keys(currentItems), ...Object.keys(oldSnapshot.items)]);
			const oldKeys = Object.keys(oldSnapshot.items);
			const oldHasHouse = oldKeys.some((k) => k.startsWith("house:"));
			const oldHasAbility = oldKeys.some((k) => k.startsWith("ability:"));
			const oldHasAbilityBook = oldKeys.some((k) => k.startsWith("abilitybook:"));
			const oldHasListing = oldKeys.some((k) => k.startsWith("listing:"));
			for (const key of allKeys) {
				if (key.startsWith("listing:") && !oldHasListing) continue;
				if (key.startsWith("house:") && !oldHasHouse) continue;
				if (key.startsWith("ability:") && !oldHasAbility) continue;
				if (key.startsWith("abilitybook:") && !oldHasAbilityBook) continue;
				const curr = currentItems[key] || {
					count: 0,
					value: 0
				};
				const old = oldSnapshot.items[key] || {
					count: 0,
					value: 0
				};
				const countDiff = curr.count - old.count;
				const totalDiff = curr.value - old.value;
				if (totalDiff === 0 && countDiff === 0) continue;
				if (key.startsWith("listing:")) {
					let name = curr.name;
					if (!name) {
						const parts = key.split(":");
						const itemHrid = parts[2];
						const enhLevel = parts[3];
						const baseName = (gameData?.itemDetailMap?.[itemHrid])?.name || itemHrid.replace("/items/", "");
						name = Number(enhLevel) > 0 ? `${baseName} +${enhLevel}` : baseName;
					}
					const prefix = key.startsWith("listing:sell:") ? (0, src_core_i18n_js.t)("Sell Listing") : (0, src_core_i18n_js.t)("Buy Listing");
					otherTotal += totalDiff;
					otherItems.push({
						name: `${prefix}: ${name}`,
						key,
						value: totalDiff
					});
					continue;
				}
				let name = curr.name;
				if (!name) {
					const [itemHrid, enhLevel] = key.split(":");
					const baseName = (gameData?.itemDetailMap?.[itemHrid])?.name || itemHrid.replace("/items/", "");
					name = Number(enhLevel) > 0 ? `${baseName} +${enhLevel}` : baseName;
				}
				if (key.startsWith("house:") || key.startsWith("ability:") || key.startsWith("abilitybook:")) {
					if (totalDiff !== 0) {
						activityTotal += totalDiff;
						activityItems.push({
							name,
							key,
							countDiff,
							value: totalDiff
						});
					}
					continue;
				}
				const oldPrice = old.count > 0 ? old.value / old.count : 0;
				const currPrice = curr.count > 0 ? curr.value / curr.count : 0;
				let activity = 0;
				let market = 0;
				if (old.count === 0) activity = curr.value;
				else if (curr.count === 0) activity = -old.value;
				else {
					activity = countDiff * oldPrice;
					market = old.count * (currPrice - oldPrice);
				}
				activity = Math.round(activity);
				market = Math.round(market);
				if (activity !== 0) {
					activityTotal += activity;
					activityItems.push({
						name,
						key,
						countDiff,
						value: activity
					});
				}
				if (market !== 0) {
					marketTotal += market;
					marketItems.push({
						name,
						key,
						count: old.count,
						value: market
					});
				}
			}
			if (activityItems.length === 0 && marketItems.length === 0 && otherItems.length === 0) {
				container.innerHTML = `<span style="color: #666;">${(0, src_core_i18n_js.t)("No item-level changes in the last 24h")}</span>`;
				return;
			}
			activityItems.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
			marketItems.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
			otherItems.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
			let html = "";
			if (activityItems.length > 0) {
				const actColor = activityTotal >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
				const actSign = activityTotal >= 0 ? "+" : "";
				html += `<div style="font-weight: bold; margin-bottom: 4px; display: flex; justify-content: space-between;">`;
				html += `<span>${(0, src_core_i18n_js.t)("Activity")}</span>`;
				html += `<span style="color: ${actColor};">${actSign}${(0, src_utils_formatters_js.networthFormatter)(activityTotal)}</span>`;
				html += `</div>`;
				for (const item of activityItems) {
					const isPos = item.value >= 0;
					const color = isPos ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
					const sign = isPos ? "+" : "";
					let countText = "";
					if (item.countDiff !== 0 && item.key !== "/items/coin:0") countText = ` <span style="color: #888; font-size: 11px;">${item.countDiff > 0 ? "+" : ""}${item.countDiff}</span>`;
					html += `<div style="display: flex; justify-content: space-between; padding: 1px 0 1px 12px;">`;
					html += `<span>${item.name}${countText}</span>`;
					html += `<span style="color: ${color}; white-space: nowrap; margin-left: 12px;">${sign}${(0, src_utils_formatters_js.networthFormatter)(item.value)}</span>`;
					html += `</div>`;
				}
			}
			if (marketItems.length > 0) {
				const mktColor = marketTotal >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
				const mktSign = marketTotal >= 0 ? "+" : "";
				html += `<div style="font-weight: bold; margin-top: 8px; margin-bottom: 4px; display: flex; justify-content: space-between;${activityItems.length > 0 ? " padding-top: 6px; border-top: 1px solid #333;" : ""}">`;
				html += `<span>${(0, src_core_i18n_js.t)("Market Movement")}</span>`;
				html += `<span style="color: ${mktColor};">${mktSign}${(0, src_utils_formatters_js.networthFormatter)(marketTotal)}</span>`;
				html += `</div>`;
				for (const item of marketItems) {
					const isPos = item.value >= 0;
					const color = isPos ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
					const sign = isPos ? "+" : "";
					html += `<div style="display: flex; justify-content: space-between; padding: 1px 0 1px 12px;">`;
					html += `<span>${item.name} <span style="color: #888; font-size: 11px;">\u00d7${item.count}</span></span>`;
					html += `<span style="color: ${color}; white-space: nowrap; margin-left: 12px;">${sign}${(0, src_utils_formatters_js.networthFormatter)(item.value)}</span>`;
					html += `</div>`;
				}
			}
			const history = networthHistory.getHistory();
			if (history.length >= 2) {
				let oldHourly = history[0];
				for (const snap of history) if (Math.abs(snap.t - oneDayAgo) < Math.abs(oldHourly.t - oneDayAgo)) oldHourly = snap;
				const residual = Math.round(currentData.totalNetworth + (currentData.excluded?.total ?? 0)) - oldHourly.total - activityTotal - marketTotal - otherTotal;
				if (Math.abs(residual) > 0) {
					otherTotal += residual;
					otherItems.push({
						name: (0, src_core_i18n_js.t)("Rounding"),
						key: "_rounding",
						value: residual
					});
				}
			}
			const hasPrevSections = activityItems.length > 0 || marketItems.length > 0;
			if (otherItems.length > 0) {
				const otherColor = otherTotal >= 0 ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
				const otherSign = otherTotal >= 0 ? "+" : "";
				html += `<div style="font-weight: bold; margin-top: 8px; margin-bottom: 4px; display: flex; justify-content: space-between;${hasPrevSections ? " padding-top: 6px; border-top: 1px solid #333;" : ""}">`;
				html += `<span>${(0, src_core_i18n_js.t)("Other")}</span>`;
				html += `<span style="color: ${otherColor};">${otherSign}${(0, src_utils_formatters_js.networthFormatter)(otherTotal)}</span>`;
				html += `</div>`;
				for (const item of otherItems) {
					const isPos = item.value >= 0;
					const color = isPos ? src_core_config_js.default.COLOR_PROFIT : src_core_config_js.default.COLOR_LOSS;
					const sign = isPos ? "+" : "";
					html += `<div style="display: flex; justify-content: space-between; padding: 1px 0 1px 12px;">`;
					html += `<span>${item.name}</span>`;
					html += `<span style="color: ${color}; white-space: nowrap; margin-left: 12px;">${sign}${(0, src_utils_formatters_js.networthFormatter)(item.value)}</span>`;
					html += `</div>`;
				}
			}
			const ageHours = Math.round((Date.now() - oldSnapshot.t) / 36e5);
			html += `<div style="color: #555; font-size: 10px; margin-top: 6px; text-align: right;">${(0, src_core_i18n_js.t)("Compared to snapshot from {0}h ago", ageHours)}</div>`;
			container.innerHTML = html;
		}
		/**
		* Find previous valid _raw data by searching backward from currentIndex
		*/
		_getPreviousRaw(dataset, currentIndex) {
			for (let i = currentIndex - 1; i >= 0; i--) {
				const point = dataset[i];
				if (!isNaN(point.y) && point._raw) return point._raw;
			}
			return null;
		}
		/**
		* Format a delta value with color
		*/
		_formatDelta(current, previous) {
			if (previous == null || current == null) return "";
			const diff = current - previous;
			if (diff === 0) return "";
			return `<span style="color:${diff > 0 ? "#4ade80" : "#f87171"}; margin-left:6px;">${diff > 0 ? "+" : ""}${(0, src_utils_formatters_js.networthFormatter)(diff)}</span>`;
		}
		/**
		* Render custom HTML tooltip with colored deltas
		*/
		_renderCustomTooltip(context) {
			const { tooltip } = context;
			let tooltipEl = document.getElementById("mwi-nw-chart-tooltip");
			if (!tooltipEl) {
				tooltipEl = document.createElement("div");
				tooltipEl.id = "mwi-nw-chart-tooltip";
				tooltipEl.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.92);
                border: 1px solid #555;
                border-radius: 4px;
                padding: 8px 12px;
                pointer-events: none;
                font-size: 12px;
                font-family: monospace;
                color: #ccc;
                white-space: nowrap;
                z-index: 10;
                transition: opacity 0.15s;
            `;
				context.chart.canvas.parentElement.appendChild(tooltipEl);
			}
			if (tooltip.opacity === 0) {
				tooltipEl.style.opacity = "0";
				return;
			}
			const totalPoint = tooltip.dataPoints?.find((dp) => dp.dataset.label === "Total Net Worth");
			if (!totalPoint) {
				tooltipEl.style.opacity = "0";
				return;
			}
			const raw = totalPoint.raw._raw;
			if (!raw) {
				tooltipEl.style.opacity = "0";
				return;
			}
			const prevRaw = this._getPreviousRaw(totalPoint.dataset.data, totalPoint.dataIndex);
			let html = `<div style="font-weight:bold; color:#fff; margin-bottom:4px;">${(0, src_utils_formatters_js.formatDateTime)(new Date(totalPoint.raw.x), { includeSeconds: false })}</div>`;
			const totalDelta = this._formatDelta(raw.total, prevRaw?.total);
			html += `<div style="color:#4ade80;">&#9632; ${(0, src_core_i18n_js.t)("Total:")} ${(0, src_utils_formatters_js.networthFormatter)(raw.total)}${totalDelta}</div>`;
			const categories = [];
			categories.push({
				label: (0, src_core_i18n_js.t)("Gold"),
				value: raw.gold || 0,
				prev: prevRaw?.gold
			});
			const inventoryExGold = (raw.inventory || 0) - (raw.gold || 0);
			const prevInventoryExGold = prevRaw ? (prevRaw.inventory || 0) - (prevRaw.gold || 0) : null;
			categories.push({
				label: (0, src_core_i18n_js.t)("Inventory"),
				value: inventoryExGold,
				prev: prevInventoryExGold
			});
			categories.push({
				label: (0, src_core_i18n_js.t)("Equipment"),
				value: raw.equipment || 0,
				prev: prevRaw?.equipment
			});
			categories.push({
				label: (0, src_core_i18n_js.t)("Listings"),
				value: raw.listings || 0,
				prev: prevRaw?.listings
			});
			categories.push({
				label: (0, src_core_i18n_js.t)("House"),
				value: raw.house || 0,
				prev: prevRaw?.house
			});
			categories.push({
				label: (0, src_core_i18n_js.t)("Abilities"),
				value: raw.abilities || 0,
				prev: prevRaw?.abilities
			});
			if (raw.nonExcluded != null && raw.nonExcluded !== raw.total) {
				const excluded = raw.total - raw.nonExcluded;
				const prevExcluded = prevRaw?.nonExcluded != null ? prevRaw.total - prevRaw.nonExcluded : null;
				categories.push({
					label: (0, src_core_i18n_js.t)("Excluded"),
					value: excluded,
					prev: prevExcluded
				});
			}
			for (const cat of categories) {
				const delta = this._formatDelta(cat.value, cat.prev);
				html += `<div style="color:#ccc; padding-left:12px;">${cat.label}: ${(0, src_utils_formatters_js.networthFormatter)(cat.value)}${delta}</div>`;
			}
			tooltipEl.innerHTML = html;
			tooltipEl.style.opacity = "1";
			const containerRect = context.chart.canvas.parentElement.getBoundingClientRect();
			const offsetX = tooltip.caretX;
			const offsetY = tooltip.caretY;
			const tooltipWidth = tooltipEl.offsetWidth;
			const tooltipHeight = tooltipEl.offsetHeight;
			const containerWidth = containerRect.width;
			const containerHeight = containerRect.height;
			let left = offsetX + 12;
			let top = offsetY - tooltipHeight / 2;
			if (left + tooltipWidth > containerWidth) left = offsetX - tooltipWidth - 12;
			if (top < 0) top = 0;
			if (top + tooltipHeight > containerHeight) top = containerHeight - tooltipHeight;
			tooltipEl.style.left = `${left}px`;
			tooltipEl.style.top = `${top}px`;
		}
		/**
		* Handle a click on the chart — show delete popup for the nearest data point.
		* @param {Object} event - Chart.js event object
		* @param {Array} elements - Active elements at click position
		*/
		_onChartClick(event, elements) {
			this._dismissDeletePopup();
			if (!elements || elements.length === 0) return;
			const raw = elements[0].element.$context?.raw;
			if (!raw || isNaN(raw.x)) return;
			const snapshot = raw._raw || networthHistory.getHistory().find((s) => s.t === raw.x);
			if (!snapshot) return;
			this._showDeletePopup(event.native, snapshot);
		}
		/**
		* Show a small popup near the click offering to delete the datapoint.
		* @param {MouseEvent} nativeEvent - Native DOM mouse event for positioning
		* @param {Object} snapshot - The snapshot object to potentially delete
		*/
		_showDeletePopup(nativeEvent, snapshot) {
			const popup = document.createElement("div");
			popup.id = "mwi-nw-delete-popup";
			const left = Math.min(nativeEvent.clientX + 12, window.innerWidth - 210);
			const top = nativeEvent.clientY - 10;
			popup.style.cssText = `
            position: fixed;
            z-index: 100002;
            background: #1e1e2e;
            border: 1px solid #555;
            border-radius: 6px;
            padding: 10px 12px;
            font-size: 12px;
            color: #ccc;
            box-shadow: 0 4px 16px rgba(0,0,0,0.6);
            left: ${left}px;
            top: ${top}px;
            min-width: 180px;
        `;
			popup.innerHTML = `
            <div style="margin-bottom:4px;font-weight:500;color:#fff;">${(0, src_utils_formatters_js.formatDateTime)(new Date(snapshot.t), { includeSeconds: false })}</div>
            <div style="margin-bottom:10px;color:${src_core_config_js.default.COLOR_ACCENT};">${(0, src_utils_formatters_js.networthFormatter)(snapshot.total)}</div>
            <button id="mwi-nw-delete-confirm" style="background:#ef4444;color:#fff;border:none;border-radius:4px;padding:3px 10px;cursor:pointer;font-size:11px;margin-right:6px;">${(0, src_core_i18n_js.t)("Delete point")}</button>
            <button id="mwi-nw-delete-cancel" style="background:#2a2a2a;color:#999;border:1px solid #444;border-radius:4px;padding:3px 10px;cursor:pointer;font-size:11px;">${(0, src_core_i18n_js.t)("Cancel")}</button>
        `;
			document.body.appendChild(popup);
			this._deletePopup = popup;
			popup.querySelector("#mwi-nw-delete-confirm").addEventListener("click", async () => {
				await networthHistory.deleteSnapshot(snapshot.t);
				this._dismissDeletePopup();
				this.renderChart(this.currentRange, this.currentCustomFrom, this.currentCustomTo);
			});
			popup.querySelector("#mwi-nw-delete-cancel").addEventListener("click", () => {
				this._dismissDeletePopup();
			});
			this._deletePopupOutsideTimer = setTimeout(() => {
				this._deletePopupOutsideTimer = null;
				if (!this._deletePopup) return;
				this._deletePopupOutsideHandler = (e) => {
					if (!popup.contains(e.target)) this._dismissDeletePopup();
				};
				document.addEventListener("click", this._deletePopupOutsideHandler);
			}, 0);
		}
		/**
		* Remove the delete popup and clean up its outside-click listener.
		*/
		_dismissDeletePopup() {
			if (this._deletePopup) {
				this._deletePopup.remove();
				this._deletePopup = null;
			}
			if (this._deletePopupOutsideTimer !== null) {
				clearTimeout(this._deletePopupOutsideTimer);
				this._deletePopupOutsideTimer = null;
			}
			if (this._deletePopupOutsideHandler) {
				document.removeEventListener("click", this._deletePopupOutsideHandler);
				this._deletePopupOutsideHandler = null;
			}
		}
		closeModal() {
			this._dismissDeletePopup();
			if (this.chartInstance) {
				this.chartInstance.destroy();
				this.chartInstance = null;
			}
			const breakdown = document.getElementById("mwi-nw-24h-breakdown");
			if (breakdown) breakdown.remove();
			const modal = document.getElementById("mwi-nw-chart-modal");
			if (modal) modal.remove();
			if (this.escHandler) {
				document.removeEventListener("keydown", this.escHandler);
				this.escHandler = null;
			}
			if (this.outsideClickHandler) {
				document.removeEventListener("mousedown", this.outsideClickHandler);
				this.outsideClickHandler = null;
			}
			if (this._outsideClickTimer !== null) {
				clearTimeout(this._outsideClickTimer);
				this._outsideClickTimer = null;
			}
		}
	};
	var networthHistoryChart = new NetworthHistoryChart();
	//#endregion
	//#region src/utils/panel-z-index.js
	/**
	* Floating Panel Z-Index Manager
	* Manages bring-to-front ordering for persistent floating panels.
	* All panels are capped below config.Z_FLOATING_PANEL + 99 (1199)
	* so they never cross the game's MUI modal layer (~1300).
	*/
	var panels = /* @__PURE__ */ new Set();
	var removalObservers = /* @__PURE__ */ new Map();
	/**
	* Register a floating panel element for z-index management
	* @param {HTMLElement} el - The panel element
	*/
	function registerFloatingPanel(el) {
		panels.add(el);
		if (!removalObservers.has(el)) {
			const observer = new MutationObserver(() => {
				if (!document.body.contains(el)) {
					panels.delete(el);
					observer.disconnect();
					removalObservers.delete(el);
				}
			});
			observer.observe(el.parentElement || document.body, {
				childList: true,
				subtree: true
			});
			removalObservers.set(el, observer);
		}
	}
	/**
	* Unregister a floating panel element
	* @param {HTMLElement} el - The panel element
	*/
	function unregisterFloatingPanel(el) {
		panels.delete(el);
		const observer = removalObservers.get(el);
		if (observer) {
			observer.disconnect();
			removalObservers.delete(el);
		}
	}
	/**
	* Bring a panel to the front among all registered panels,
	* without exceeding config.Z_FLOATING_PANEL + 99.
	* @param {HTMLElement} el - The panel to bring forward
	*/
	function bringPanelToFront(el) {
		const base = src_core_config_js.default.Z_FLOATING_PANEL;
		const cap = base + 99;
		let maxZ = base;
		for (const p of panels) {
			const z = parseInt(p.style.zIndex) || base;
			if (z > maxZ) maxZ = z;
		}
		const next = maxZ + 1;
		if (next > cap) {
			let i = base;
			for (const p of panels) if (p !== el) p.style.zIndex = String(i++);
			el.style.zIndex = String(i);
		} else el.style.zIndex = String(next);
	}
	//#endregion
	//#region src/features/networth/networth-exclusion-popup.js
	/**
	* Networth Exclusion Popup
	* Draggable modal for managing net worth exclusions.
	* Shows current exclusions as removable chips and a searchable list of all excludable entries.
	*/
	var NetworthExclusionPopup = class {
		constructor() {
			this.container = null;
			this.networthData = null;
			this.onChangeFn = null;
			this.searchList = [];
			this.searchTimeout = null;
			this.expandedEntries = /* @__PURE__ */ new Set();
			this.isDragging = false;
			this.dragOffset = {
				x: 0,
				y: 0
			};
			this.dragMoveHandler = null;
			this.dragUpHandler = null;
			this.clickOutsideHandler = null;
		}
		/**
		* Open (or refresh) the popup.
		* @param {Object} networthData - Current net worth data from calculator
		* @param {Function} onChangeFn - Called after an exclusion is added/removed
		*/
		open(networthData, onChangeFn) {
			this.networthData = networthData;
			this.onChangeFn = onChangeFn;
			this.searchList = this._buildSearchList(networthData);
			if (this.container) {
				bringPanelToFront(this.container);
				this._refreshContent();
				return;
			}
			this._build();
		}
		/**
		* Close and remove the popup.
		*/
		close() {
			this._teardown();
		}
		/**
		* Refresh the popup content (called after add/remove exclusion).
		* @param {Object} [networthData] - Updated net worth data (optional)
		*/
		refresh(networthData) {
			if (networthData) {
				this.networthData = networthData;
				this.searchList = this._buildSearchList(networthData);
			}
			if (this.container) this._refreshContent();
		}
		/**
		* Build the flat list of all excludable entries for the search.
		* @param {Object} networthData
		* @returns {Array<{type, value, name, amount}>}
		*/
		_buildSearchList(networthData) {
			const entries = [];
			const seen = /* @__PURE__ */ new Map();
			const add = (entry) => {
				const key = entry.dedupKey || `${entry.type}:${entry.value}`;
				const existing = seen.get(key);
				if (!existing) {
					seen.set(key, entry);
					entries.push(entry);
				} else if (entry.amount > existing.amount) existing.amount = entry.amount;
			};
			const ca = networthData?.currentAssets;
			const fa = networthData?.fixedAssets;
			if (!isExcluded("assetType", "equipped") && (ca?.equipped?.value ?? 0) > 0) add({
				type: "assetType",
				value: "equipped",
				name: "All Equipped Items",
				amount: ca.equipped.value
			});
			if (!isExcluded("assetType", "listings") && (ca?.listings?.value ?? 0) > 0) add({
				type: "assetType",
				value: "listings",
				name: "All Market Listings",
				amount: ca.listings.value
			});
			if (!isExcluded("assetType", "houses") && (fa?.houses?.totalCost ?? 0) > 0) add({
				type: "assetType",
				value: "houses",
				name: "All Houses",
				amount: fa.houses.totalCost
			});
			if (!isExcluded("assetType", "abilities") && (fa?.abilities?.totalCost ?? 0) > 0) add({
				type: "assetType",
				value: "abilities",
				name: "All Abilities",
				amount: fa.abilities.totalCost
			});
			if (!isExcluded("assetType", "abilityBooks") && (fa?.abilityBooks?.totalCost ?? 0) > 0) add({
				type: "assetType",
				value: "abilityBooks",
				name: "All Ability Books",
				amount: fa.abilityBooks.totalCost
			});
			for (const [catName, catData] of Object.entries(ca?.inventory?.byCategory ?? {})) {
				if (isExcluded("category", catData.categoryHrid)) continue;
				add({
					type: "category",
					value: catData.categoryHrid,
					name: `${catName} (category)`,
					amount: catData.totalValue
				});
			}
			const itemAmounts = /* @__PURE__ */ new Map();
			for (const item of [...ca?.inventory?.breakdown ?? [], ...ca?.equipped?.breakdown ?? []]) {
				if (!item.itemHrid) continue;
				const enhLevel = item.enhancementLevel || 0;
				const key = enhLevel > 0 ? `${item.itemHrid}:${enhLevel}` : item.itemHrid;
				const cur = itemAmounts.get(key) ?? {
					name: item.name,
					amount: 0,
					itemHrid: item.itemHrid
				};
				cur.amount += item.value;
				itemAmounts.set(key, cur);
			}
			for (const [key, { name, amount, itemHrid }] of itemAmounts) {
				if (isExcluded("item", itemHrid)) continue;
				add({
					type: "item",
					value: itemHrid,
					name,
					amount,
					dedupKey: `item:${key}`
				});
			}
			for (const room of fa?.houses?.breakdown ?? []) {
				if (!room.hrid || isExcluded("houseRoom", room.hrid)) continue;
				add({
					type: "houseRoom",
					value: room.hrid,
					name: room.name,
					amount: room.cost
				});
			}
			for (const ability of fa?.abilities?.breakdown ?? []) {
				if (!ability.hrid || isExcluded("ability", ability.hrid)) continue;
				add({
					type: "ability",
					value: ability.hrid,
					name: ability.name,
					amount: ability.cost
				});
			}
			for (const snapshot of loadoutSnapshot.getAllSnapshots()) {
				if (!snapshot.name || isExcluded("loadout", snapshot.name)) continue;
				const amount = snapshot.equipment.reduce((sum, eq) => {
					return sum + (src_api_marketplace_js.default.getPrice(eq.itemHrid)?.ask ?? 0);
				}, 0);
				add({
					type: "loadout",
					value: snapshot.name,
					name: `Loadout: ${snapshot.name}`,
					amount
				});
			}
			entries.sort((a, b) => b.amount - a.amount);
			return entries;
		}
		/**
		* Filter search list by query string.
		* @param {string} query
		* @returns {Array}
		*/
		_filterEntries(query) {
			if (!query) return this.searchList.slice(0, 40);
			const lower = query.toLowerCase();
			return this.searchList.filter((e) => e.name.toLowerCase().includes(lower)).slice(0, 40);
		}
		/**
		* Build and insert the popup DOM.
		*/
		_build() {
			this.container = document.createElement("div");
			this.container.id = "mwi-networth-exclusion-popup";
			this.container.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: ${src_core_config_js.default.Z_FLOATING_PANEL};
            width: 400px;
            max-height: 580px;
            display: flex;
            flex-direction: column;
            background: rgba(10, 10, 20, 0.96);
            border: 2px solid ${src_core_config_js.default.COLOR_ACCENT};
            border-radius: 8px;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.8);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #fff;
            user-select: none;
            overflow: hidden;
        `;
			const header = document.createElement("div");
			header.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            cursor: grab;
            background: rgba(255,255,255,0.04);
            flex-shrink: 0;
        `;
			const title = document.createElement("span");
			title.style.cssText = `font-size: 0.9rem; font-weight: 600; color: ${src_core_config_js.default.COLOR_ACCENT};`;
			title.textContent = (0, src_core_i18n_js.t)("Net Worth Exclusions");
			const closeBtn = document.createElement("button");
			closeBtn.textContent = "×";
			closeBtn.style.cssText = `
            background: none; border: none; color: #aaa;
            font-size: 1.2rem; line-height: 1; cursor: pointer; padding: 0 2px;
        `;
			closeBtn.addEventListener("mouseenter", () => closeBtn.style.color = "#fff");
			closeBtn.addEventListener("mouseleave", () => closeBtn.style.color = "#aaa");
			closeBtn.addEventListener("click", () => this.close());
			header.appendChild(title);
			header.appendChild(closeBtn);
			const body = document.createElement("div");
			body.id = "mwi-nex-body";
			body.style.cssText = `flex: 1; overflow-y: auto; padding: 10px 14px;`;
			this.container.appendChild(header);
			this.container.appendChild(body);
			document.body.appendChild(this.container);
			registerFloatingPanel(this.container);
			this._renderBody(body);
			this._setupDragging(header);
			this._setupClickOutside();
		}
		/**
		* Refresh the body contents without rebuilding the whole popup.
		*/
		_refreshContent() {
			const body = this.container?.querySelector("#mwi-nex-body");
			if (!body) return;
			const prevQuery = body.querySelector("input[type=\"search\"]")?.value ?? "";
			body.innerHTML = "";
			this._renderBody(body, prevQuery);
		}
		/**
		* Render the full body: current exclusions + search.
		* @param {HTMLElement} body
		* @param {string} [initialQuery=''] - Pre-fill search query (preserved across refreshes)
		*/
		_renderBody(body, initialQuery = "") {
			const exclusions = getExclusions();
			const currentSection = document.createElement("div");
			currentSection.style.cssText = `margin-bottom: 10px;`;
			const currentLabel = document.createElement("div");
			currentLabel.style.cssText = `font-size: 0.75rem; color: rgba(255,255,255,0.45); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: space-between;`;
			const labelText = document.createElement("span");
			labelText.textContent = exclusions.length > 0 ? (0, src_core_i18n_js.t)("Current Exclusions") : (0, src_core_i18n_js.t)("No exclusions configured");
			currentLabel.appendChild(labelText);
			if (exclusions.length > 0) {
				const clearBtn = document.createElement("button");
				clearBtn.textContent = (0, src_core_i18n_js.t)("Clear All");
				clearBtn.style.cssText = `
                background: transparent;
                border: 1px solid rgba(255,100,100,0.4);
                color: rgba(255,100,100,0.7);
                border-radius: 3px;
                padding: 1px 7px;
                font-size: 0.7rem;
                cursor: pointer;
                text-transform: none;
                letter-spacing: 0;
            `;
				clearBtn.addEventListener("mouseenter", () => {
					clearBtn.style.borderColor = "rgba(255,100,100,0.9)";
					clearBtn.style.color = "rgba(255,100,100,1)";
				});
				clearBtn.addEventListener("mouseleave", () => {
					clearBtn.style.borderColor = "rgba(255,100,100,0.4)";
					clearBtn.style.color = "rgba(255,100,100,0.7)";
				});
				clearBtn.addEventListener("click", async () => {
					await clearExclusions();
					this._refreshContent();
					if (this.onChangeFn) this.onChangeFn();
				});
				currentLabel.appendChild(clearBtn);
			}
			currentSection.appendChild(currentLabel);
			if (exclusions.length > 0) {
				const chips = document.createElement("div");
				chips.style.cssText = `display: flex; flex-wrap: wrap; gap: 6px;`;
				for (const exc of exclusions) {
					const displayName = this._resolveExclusionName(exc);
					const chip = this._makeChip(displayName, exc.type, exc.value);
					chips.appendChild(chip);
				}
				currentSection.appendChild(chips);
			}
			body.appendChild(currentSection);
			const divider = document.createElement("div");
			divider.style.cssText = `border-top: 1px solid rgba(255,255,255,0.08); margin-bottom: 10px;`;
			body.appendChild(divider);
			const searchInput = document.createElement("input");
			searchInput.type = "search";
			searchInput.placeholder = (0, src_core_i18n_js.t)("Search items, categories, houses, loadouts...");
			searchInput.style.cssText = `
            width: 100%;
            box-sizing: border-box;
            padding: 7px 10px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 4px;
            color: #fff;
            font-size: 0.85rem;
            outline: none;
            margin-bottom: 8px;
        `;
			searchInput.addEventListener("focus", () => searchInput.style.borderColor = src_core_config_js.default.COLOR_ACCENT);
			searchInput.addEventListener("blur", () => searchInput.style.borderColor = "rgba(255,255,255,0.15)");
			searchInput.value = initialQuery;
			body.appendChild(searchInput);
			const results = document.createElement("div");
			results.id = "mwi-nex-results";
			body.appendChild(results);
			this._renderResults(results, initialQuery);
			searchInput.addEventListener("input", () => {
				clearTimeout(this.searchTimeout);
				this.searchTimeout = setTimeout(() => {
					this._renderResults(results, searchInput.value.trim());
				}, 150);
			});
			setTimeout(() => searchInput.focus({ preventScroll: true }), 50);
		}
		/**
		* Get breakdown items for a multi-item exclusion entry.
		* @param {Object} entry - Search list entry {type, value, name, amount}
		* @returns {Array<{name, value}>|null} Array of sub-items, or null if not expandable
		*/
		_getBreakdownItems(entry) {
			const data = this.networthData;
			if (!data) return null;
			const ca = data.currentAssets;
			const fa = data.fixedAssets;
			if (entry.type === "assetType") switch (entry.value) {
				case "equipped": return (ca?.equipped?.breakdown ?? []).map((i) => ({
					name: i.name,
					value: i.value ?? 0
				}));
				case "listings": return (ca?.listings?.breakdown ?? []).map((i) => ({
					name: i.name,
					value: i.value ?? 0
				}));
				case "houses": return (fa?.houses?.breakdown ?? []).map((i) => ({
					name: i.name,
					value: i.cost ?? 0
				}));
				case "abilities": return (fa?.abilities?.breakdown ?? []).map((i) => ({
					name: i.name,
					value: i.cost ?? 0
				}));
				case "abilityBooks": return (fa?.abilityBooks?.breakdown ?? []).map((i) => ({
					name: `${i.name}${i.count > 1 ? ` x${i.count}` : ""}`,
					value: i.value ?? 0
				}));
			}
			if (entry.type === "category") {
				for (const [, catData] of Object.entries(ca?.inventory?.byCategory ?? {})) if (catData.categoryHrid === entry.value) return (catData.items ?? []).map((i) => ({
					name: `${i.name}${i.count > 1 ? ` x${i.count}` : ""}`,
					value: i.value ?? 0
				}));
			}
			if (entry.type === "loadout") {
				const snapshot = loadoutSnapshot.getAllSnapshots().find((s) => s.name === entry.value);
				if (snapshot) return snapshot.equipment.map((eq) => {
					return {
						name: src_core_data_manager_js.default.getItemDetails(eq.itemHrid)?.name || eq.itemHrid.replace("/items/", ""),
						value: src_api_marketplace_js.default.getPrice(eq.itemHrid)?.ask ?? 0
					};
				});
			}
			return null;
		}
		/**
		* Render the search results list.
		* @param {HTMLElement} container
		* @param {string} query
		*/
		_renderResults(container, query) {
			container.innerHTML = "";
			const filtered = this._filterEntries(query);
			if (filtered.length === 0) {
				const empty = document.createElement("div");
				empty.style.cssText = `color: rgba(255,255,255,0.3); font-size: 0.8rem; text-align: center; padding: 12px 0;`;
				empty.textContent = (0, src_core_i18n_js.t)("No results");
				container.appendChild(empty);
				return;
			}
			for (const entry of filtered) {
				const alreadyExcluded = isExcluded(entry.type, entry.value);
				const breakdownItems = this._getBreakdownItems(entry);
				const entryKey = `${entry.type}:${entry.value}`;
				const isExpanded = this.expandedEntries.has(entryKey);
				const wrapper = document.createElement("div");
				const row = document.createElement("div");
				row.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 5px 6px;
                border-radius: 3px;
                font-size: 0.82rem;
                gap: 8px;
                ${alreadyExcluded ? "opacity: 0.55;" : ""}
            `;
				row.addEventListener("mouseenter", () => {
					row.style.background = "rgba(255,255,255,0.05)";
				});
				row.addEventListener("mouseleave", () => {
					row.style.background = "";
				});
				const nameSpan = document.createElement("span");
				nameSpan.style.cssText = `flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`;
				if (breakdownItems && breakdownItems.length > 0) {
					const toggle = document.createElement("span");
					toggle.textContent = isExpanded ? "▾ " : "▸ ";
					toggle.style.cssText = `cursor: pointer; color: rgba(255,255,255,0.4); font-size: 0.7rem; margin-right: 2px;`;
					nameSpan.appendChild(toggle);
					nameSpan.style.cursor = "pointer";
					nameSpan.addEventListener("click", () => {
						if (this.expandedEntries.has(entryKey)) this.expandedEntries.delete(entryKey);
						else this.expandedEntries.add(entryKey);
						this._renderResults(container, query);
					});
				}
				nameSpan.appendChild(document.createTextNode(entry.name));
				const amountSpan = document.createElement("span");
				amountSpan.style.cssText = `color: rgba(255,255,255,0.5); white-space: nowrap; font-size: 0.78rem;`;
				amountSpan.textContent = entry.amount > 0 ? (0, src_utils_formatters_js.networthFormatter)(Math.round(entry.amount)) : "";
				const actionBtn = document.createElement("button");
				actionBtn.style.cssText = `
                background: transparent;
                border: 1px solid ${alreadyExcluded ? "rgba(255,100,100,0.5)" : "rgba(255,255,255,0.2)"};
                color: ${alreadyExcluded ? "rgba(255,100,100,0.8)" : "rgba(255,255,255,0.6)"};
                border-radius: 3px;
                padding: 2px 8px;
                font-size: 0.75rem;
                cursor: pointer;
                white-space: nowrap;
                flex-shrink: 0;
            `;
				actionBtn.textContent = alreadyExcluded ? (0, src_core_i18n_js.t)("✕ Remove") : (0, src_core_i18n_js.t)("+ Exclude");
				actionBtn.addEventListener("mouseenter", () => {
					actionBtn.style.opacity = "1";
					actionBtn.style.borderColor = alreadyExcluded ? "rgba(255,100,100,0.9)" : src_core_config_js.default.COLOR_ACCENT;
				});
				actionBtn.addEventListener("mouseleave", () => {
					actionBtn.style.opacity = "";
					actionBtn.style.borderColor = alreadyExcluded ? "rgba(255,100,100,0.5)" : "rgba(255,255,255,0.2)";
				});
				actionBtn.addEventListener("click", () => this._toggleExclusion(entry.type, entry.value));
				row.appendChild(nameSpan);
				row.appendChild(amountSpan);
				row.appendChild(actionBtn);
				wrapper.appendChild(row);
				if (isExpanded && breakdownItems && breakdownItems.length > 0) {
					const detail = document.createElement("div");
					detail.style.cssText = `
                    padding: 4px 0 4px 16px;
                    margin: 0 6px 4px;
                    border-left: 1px solid rgba(255,255,255,0.08);
                `;
					const sorted = [...breakdownItems].sort((a, b) => b.value - a.value);
					for (const sub of sorted) {
						const subRow = document.createElement("div");
						subRow.style.cssText = `
                        display: flex;
                        justify-content: space-between;
                        padding: 1px 0;
                        font-size: 0.75rem;
                        color: rgba(255,255,255,0.55);
                        gap: 8px;
                    `;
						const subName = document.createElement("span");
						subName.style.cssText = `flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`;
						subName.textContent = sub.name;
						const subVal = document.createElement("span");
						subVal.style.cssText = `white-space: nowrap; color: rgba(255,255,255,0.4);`;
						subVal.textContent = sub.value > 0 ? (0, src_utils_formatters_js.networthFormatter)(Math.round(sub.value)) : "";
						subRow.appendChild(subName);
						subRow.appendChild(subVal);
						detail.appendChild(subRow);
					}
					wrapper.appendChild(detail);
				}
				container.appendChild(wrapper);
			}
		}
		/**
		* Resolve a human-readable display name for an exclusion entry.
		* Used for chips so names show correctly even when the entry is no longer in searchList.
		* @param {{type: string, value: string}} exc
		* @returns {string}
		*/
		_resolveExclusionName(exc) {
			const entry = this.searchList.find((e) => e.type === exc.type && e.value === exc.value);
			if (entry) return entry.name;
			const ASSET_TYPE_NAMES = {
				equipped: (0, src_core_i18n_js.t)("All Equipped Items"),
				listings: (0, src_core_i18n_js.t)("All Market Listings"),
				houses: (0, src_core_i18n_js.t)("All Houses"),
				abilities: (0, src_core_i18n_js.t)("All Abilities"),
				abilityBooks: (0, src_core_i18n_js.t)("All Ability Books")
			};
			if (exc.type === "assetType") return ASSET_TYPE_NAMES[exc.value] ?? exc.value;
			if (exc.type === "loadout") return (0, src_core_i18n_js.t)("Loadout: {name}", { name: exc.value });
			const gd = src_core_data_manager_js.default.getInitClientData();
			if (!gd) return exc.value;
			if (exc.type === "category") {
				const name = gd.itemCategoryDetailMap?.[exc.value]?.name;
				return name ? (0, src_core_i18n_js.t)("{name} (category)", { name }) : exc.value;
			}
			if (exc.type === "item") return gd.itemDetailMap?.[exc.value]?.name ?? exc.value;
			if (exc.type === "houseRoom") return gd.houseRoomDetailMap?.[exc.value]?.name ?? exc.value;
			if (exc.type === "ability") return gd.abilityDetailMap?.[exc.value]?.name ?? exc.value;
			return exc.value;
		}
		/**
		* Create a chip element representing an active exclusion.
		* @param {string} label
		* @param {string} type
		* @param {string} value
		* @returns {HTMLElement}
		*/
		_makeChip(label, type, value) {
			const chip = document.createElement("div");
			chip.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 3px 8px;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 12px;
            font-size: 0.78rem;
            color: rgba(255,255,255,0.8);
            cursor: default;
        `;
			const text = document.createElement("span");
			text.textContent = label;
			const removeBtn = document.createElement("span");
			removeBtn.textContent = "×";
			removeBtn.title = (0, src_core_i18n_js.t)("Remove exclusion");
			removeBtn.style.cssText = `cursor: pointer; color: rgba(255,100,100,0.7); font-size: 0.9rem; line-height: 1;`;
			removeBtn.addEventListener("mouseenter", () => removeBtn.style.color = "rgba(255,100,100,1)");
			removeBtn.addEventListener("mouseleave", () => removeBtn.style.color = "rgba(255,100,100,0.7)");
			removeBtn.addEventListener("click", () => this._toggleExclusion(type, value));
			chip.appendChild(text);
			chip.appendChild(removeBtn);
			return chip;
		}
		/**
		* Toggle an exclusion on/off, then refresh.
		* @param {string} type
		* @param {string} value
		*/
		async _toggleExclusion(type, value) {
			if (isExcluded(type, value)) await removeExclusion(type, value);
			else await addExclusion(type, value);
			this._refreshContent();
			if (this.onChangeFn) this.onChangeFn();
		}
		_setupDragging(header) {
			header.addEventListener("mousedown", (e) => {
				if (e.target.tagName === "BUTTON") return;
				bringPanelToFront(this.container);
				this.isDragging = true;
				const rect = this.container.getBoundingClientRect();
				this.container.style.transform = "none";
				this.container.style.top = `${rect.top}px`;
				this.container.style.left = `${rect.left}px`;
				this.dragOffset = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top
				};
				header.style.cursor = "grabbing";
				e.preventDefault();
			});
			this.dragMoveHandler = (e) => {
				if (!this.isDragging) return;
				let x = e.clientX - this.dragOffset.x;
				let y = e.clientY - this.dragOffset.y;
				const minVisible = 80;
				y = Math.max(0, Math.min(y, window.innerHeight - minVisible));
				x = Math.max(-this.container.offsetWidth + minVisible, Math.min(x, window.innerWidth - minVisible));
				this.container.style.top = `${y}px`;
				this.container.style.left = `${x}px`;
			};
			this.dragUpHandler = () => {
				if (!this.isDragging) return;
				this.isDragging = false;
				header.style.cursor = "grab";
			};
			document.addEventListener("mousemove", this.dragMoveHandler);
			document.addEventListener("mouseup", this.dragUpHandler);
		}
		_setupClickOutside() {
			this.clickOutsideHandler = (e) => {
				if (this.container && !this.container.contains(e.target)) this.close();
			};
			document.addEventListener("mousedown", this.clickOutsideHandler);
		}
		_teardown() {
			clearTimeout(this.searchTimeout);
			if (this.dragMoveHandler) {
				document.removeEventListener("mousemove", this.dragMoveHandler);
				this.dragMoveHandler = null;
			}
			if (this.dragUpHandler) {
				document.removeEventListener("mouseup", this.dragUpHandler);
				this.dragUpHandler = null;
			}
			if (this.clickOutsideHandler) {
				document.removeEventListener("mousedown", this.clickOutsideHandler);
				this.clickOutsideHandler = null;
			}
			if (this.container) {
				unregisterFloatingPanel(this.container);
				this.container.remove();
				this.container = null;
			}
			this.isDragging = false;
		}
	};
	var networthExclusionPopup = new NetworthExclusionPopup();
	//#endregion
	//#region src/features/networth/networth-display.js
	/**
	* Networth Display Components
	* Handles UI rendering for networth in two locations:
	* 1. Header (top right) - Gold: [amount]
	* 2. Inventory Panel - Detailed breakdown with collapsible sections
	*/
	/**
	* Header Display Component
	* Shows "Gold: [amount]" next to total level
	*/
	var NetworthHeaderDisplay = class {
		constructor() {
			this.container = null;
			this.unregisterHandlers = [];
			this.isInitialized = false;
			this.networthFeature = null;
		}
		/**
		* Set reference to parent networth feature
		* @param {Object} feature - NetworthFeature instance
		*/
		setNetworthFeature(feature) {
			this.networthFeature = feature;
		}
		/**
		* Get the current items sprite URL from the DOM
		* @returns {string|null} Items sprite URL or null if not found
		*/
		getItemsSpriteUrl() {
			const itemIcon = document.querySelector("use[href*=\"items_sprite\"]");
			if (!itemIcon) return null;
			const href = itemIcon.getAttribute("href");
			return href ? href.split("#")[0] : null;
		}
		/**
		* Clone SVG symbol from DOM into defs
		* @param {string} symbolId - Symbol ID to clone
		* @param {SVGDefsElement} defsElement - Defs element to append to
		* @returns {boolean} True if symbol was found and cloned
		*/
		cloneSymbolToDefs(symbolId, defsElement) {
			if (defsElement.querySelector(`symbol[id="${symbolId}"]`)) return true;
			const symbol = document.querySelector(`symbol[id="${symbolId}"]`);
			if (!symbol) {
				console.warn("[NetworthHeaderDisplay] Symbol not found:", symbolId);
				return false;
			}
			const clonedSymbol = symbol.cloneNode(true);
			defsElement.appendChild(clonedSymbol);
			return true;
		}
		/**
		* Initialize header display
		*/
		initialize() {
			const existingElem = document.querySelector("[class*=\"Header_totalLevel\"]");
			if (existingElem) this.renderHeader(existingElem);
			const unregister = src_core_dom_observer_js.default.onClass("NetworthHeader", "Header_totalLevel", (elem) => {
				this.renderHeader(elem);
			});
			this.unregisterHandlers.push(unregister);
			this.isInitialized = true;
		}
		/**
		* Render header display
		* @param {Element} totalLevelElem - Total level element
		*/
		renderHeader(totalLevelElem) {
			if (this.container && document.body.contains(this.container)) return;
			if (this.container) this.container.remove();
			this.container = document.createElement("div");
			this.container.className = "mwi-networth-header";
			this.container.style.cssText = `
            font-size: 0.875rem;
            font-weight: 500;
            color: ${src_core_config_js.default.COLOR_ACCENT};
            text-wrap: nowrap;
        `;
			totalLevelElem.insertAdjacentElement("afterend", this.container);
			this.renderGoldDisplay((0, src_core_i18n_js.t)("Loading..."));
			if (this.networthFeature && typeof this.networthFeature.recalculate === "function") this.networthFeature.recalculate().catch((error) => {
				console.error("[NetworthHeaderDisplay] Immediate recalculation failed:", error);
			});
		}
		/**
		* Render gold display with icon and value
		* @param {string} value - Formatted value text
		*/
		renderGoldDisplay(value) {
			this.container.innerHTML = "";
			const wrapper = document.createElement("span");
			wrapper.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 4px;
        `;
			const itemsSpriteUrl = this.getItemsSpriteUrl();
			if (itemsSpriteUrl) {
				const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				svg.setAttribute("width", "16");
				svg.setAttribute("height", "16");
				svg.style.cssText = `
                vertical-align: middle;
                fill: currentColor;
            `;
				const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
				use.setAttribute("href", `${itemsSpriteUrl}#coin`);
				svg.appendChild(use);
				wrapper.appendChild(svg);
			}
			const textSpan = document.createElement("span");
			textSpan.textContent = (0, src_core_i18n_js.t)("Gold: {0}", value);
			wrapper.appendChild(textSpan);
			this.container.appendChild(wrapper);
		}
		/**
		* Update header with networth data
		* @param {Object} networthData - Networth data from calculator
		*/
		update(networthData) {
			if (!this.container || !document.body.contains(this.container)) return;
			const valueFormatted = (0, src_utils_formatters_js.networthFormatter)(Math.round(networthData.coins));
			this.renderGoldDisplay(valueFormatted);
		}
		/**
		* Refresh colors on existing header element
		*/
		refresh() {
			if (this.container && document.body.contains(this.container)) this.container.style.color = src_core_config_js.default.COLOR_ACCENT;
		}
		/**
		* Disable and cleanup
		*/
		disable() {
			if (this.container) {
				this.container.remove();
				this.container = null;
			}
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			this.isInitialized = false;
		}
	};
	/**
	* Inventory Panel Display Component
	* Shows detailed networth breakdown below inventory search bar
	*/
	var NetworthInventoryDisplay = class {
		constructor() {
			this.container = null;
			this.unregisterHandlers = [];
			this.currentData = null;
			this.isInitialized = false;
			this.networthFeature = null;
		}
		/**
		* Set reference to parent networth feature for recalculation.
		* @param {Object} feature - NetworthFeature instance
		*/
		setNetworthFeature(feature) {
			this.networthFeature = feature;
		}
		/**
		* Initialize inventory panel display
		*/
		initialize() {
			const existingElem = document.querySelector("[class*=\"Inventory_items\"]");
			if (existingElem) this.renderPanel(existingElem);
			const unregister = src_core_dom_observer_js.default.onClass("NetworthInv", "Inventory_items", (elem) => {
				this.renderPanel(elem);
			});
			this.unregisterHandlers.push(unregister);
			this.isInitialized = true;
		}
		/**
		* Render inventory panel
		* @param {Element} inventoryElem - Inventory items element
		*/
		renderPanel(inventoryElem) {
			if (this.container && document.body.contains(this.container)) return;
			if (this.container) this.container.remove();
			this.container = document.createElement("div");
			this.container.className = "mwi-networth-panel";
			this.container.style.cssText = `
            text-align: left;
            color: ${src_core_config_js.default.COLOR_ACCENT};
            font-size: 0.875rem;
            margin-top: -10px;
            margin-bottom: 0;
        `;
			inventoryElem.insertAdjacentElement("beforebegin", this.container);
			if (this.currentData) this.update(this.currentData);
			else this.container.innerHTML = `
                <div style="font-weight: bold; cursor: pointer;">
                    ${(0, src_core_i18n_js.t)("Networth: Loading...")}
                </div>
            `;
		}
		/**
		* Update panel with networth data
		* @param {Object} networthData - Networth data from calculator
		*/
		update(networthData) {
			this.currentData = networthData;
			if (!this.container || !document.body.contains(this.container)) return;
			const expandedStates = {};
			const sectionsToPreserve = [
				"mwi-networth-details",
				"mwi-current-assets-details",
				"mwi-equipment-breakdown",
				"mwi-inventory-breakdown",
				"mwi-listings-breakdown",
				"mwi-fixed-assets-details",
				"mwi-houses-breakdown",
				"mwi-abilities-details",
				"mwi-equipped-abilities-breakdown",
				"mwi-other-abilities-breakdown",
				"mwi-ability-books-breakdown",
				"mwi-excluded-details"
			];
			Object.keys(networthData.currentAssets.inventory.byCategory || {}).forEach((categoryName) => {
				const categoryId = `mwi-inventory-${categoryName.toLowerCase().replace(/\s+/g, "-")}`;
				sectionsToPreserve.push(categoryId);
			});
			const byCatForState = networthData.currentAssets.inventory.byCategory || {};
			for (const categoryData of Object.values(byCatForState)) for (const item of categoryData.items) if (item.isOpenable && item.itemHrid) {
				const slug = item.itemHrid.split("/").pop();
				sectionsToPreserve.push(`mwi-chest-${slug}-detail`);
			}
			sectionsToPreserve.forEach((id) => {
				const elem = this.container.querySelector(`#${id}`);
				if (elem) expandedStates[id] = elem.style.display !== "none";
			});
			const totalNetworth = (0, src_utils_formatters_js.networthFormatter)(Math.round(networthData.totalNetworth));
			const showChartBtn = src_core_config_js.default.getSetting("networth_historyChart");
			const ca = networthData.currentAssets;
			const fa = networthData.fixedAssets;
			const excl = networthData.excluded ?? {
				total: 0,
				items: []
			};
			const showCurrentAssets = ca.total > 0;
			const showEquipped = ca.equipped.value > 0;
			const showInventory = ca.inventory.value > 0;
			const showListings = ca.listings.value > 0;
			const showFixedAssets = fa.total > 0;
			const showHouses = fa.houses.totalCost > 0;
			const showAbilities = fa.abilities.totalCost > 0;
			const showExcluded = excl.total > 0;
			this.container.innerHTML = `
            <div style="display: flex; align-items: center; gap: 6px;">
                <div style="cursor: pointer; font-weight: bold; flex: 1;" id="mwi-networth-toggle">
                        + ${(0, src_core_i18n_js.t)("Net Worth: {0}", totalNetworth)}
                </div>
                ${showChartBtn ? `<span id="mwi-networth-chart-btn" title="${(0, src_core_i18n_js.t)("Net Worth History Chart")}" style="
                    cursor: pointer;
                    font-size: 14px;
                    opacity: 0.7;
                    padding: 2px 4px;
                    border-radius: 3px;
                    line-height: 1;
                ">&#x1F4C8;</span>` : ""}
                <span id="mwi-networth-exclusions-btn" title="${(0, src_core_i18n_js.t)("Configure Net Worth Exclusions")}" style="
                    cursor: pointer;
                    font-size: 12px;
                    opacity: 0.6;
                    padding: 2px 4px;
                    border-radius: 3px;
                    line-height: 1;
                ">🔧</span>
            </div>
            <div id="mwi-networth-details" style="display: none; margin-left: 20px;">
                ${showCurrentAssets ? `
                <!-- Current Assets -->
                <div style="cursor: pointer; margin-top: 8px;" id="mwi-current-assets-toggle">
                    + ${(0, src_core_i18n_js.t)("Current Assets: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(ca.total)))}
                </div>
                <div id="mwi-current-assets-details" style="display: none; margin-left: 20px;">
                    ${showEquipped ? `
                    <!-- Equipment Value -->
                    <div style="cursor: pointer; margin-top: 4px;" id="mwi-equipment-toggle">
                        + ${(0, src_core_i18n_js.t)("Equipment value: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(ca.equipped.value)))}
                    </div>
                    <div id="mwi-equipment-breakdown" style="display: none; margin-left: 20px; font-size: 0.8rem; color: #bbb; white-space: pre-line;">${this.renderEquipmentBreakdown(ca.equipped.breakdown)}</div>
                    ` : ""}

                    ${showInventory ? `
                    <!-- Inventory Value -->
                    <div style="cursor: pointer; margin-top: 4px;" id="mwi-inventory-toggle">
                        + ${(0, src_core_i18n_js.t)("Inventory value: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(ca.inventory.value)))}
                    </div>
                    <div id="mwi-inventory-breakdown" style="display: none; margin-left: 20px;">
                        ${this.renderInventoryBreakdown(ca.inventory)}
                    </div>
                    ` : ""}

                    ${showListings ? `
                    <!-- Market Listings -->
                    <div style="cursor: pointer; margin-top: 4px;" id="mwi-listings-toggle">
                        + ${(0, src_core_i18n_js.t)("Market listings: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(ca.listings.value)))}
                    </div>
                    <div id="mwi-listings-breakdown" style="display: none; margin-left: 20px; font-size: 0.8rem; color: #bbb; white-space: pre-line;">${this.renderListingsBreakdown(ca.listings.breakdown)}</div>
                    ` : ""}
                </div>
                ` : ""}

                ${showFixedAssets ? `
                <!-- Fixed Assets -->
                <div style="cursor: pointer; margin-top: 8px;" id="mwi-fixed-assets-toggle">
                    + ${(0, src_core_i18n_js.t)("Fixed Assets: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.total)))}
                </div>
                <div id="mwi-fixed-assets-details" style="display: none; margin-left: 20px;">
                    ${showHouses ? `
                    <!-- Houses -->
                    <div style="cursor: pointer; margin-top: 4px;" id="mwi-houses-toggle">
                        + ${(0, src_core_i18n_js.t)("Houses: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.houses.totalCost)))}
                    </div>
                    <div id="mwi-houses-breakdown" style="display: none; margin-left: 20px; font-size: 0.8rem; color: #bbb; white-space: pre-line;">${this.renderHousesBreakdown(fa.houses.breakdown)}</div>
                    ` : ""}

                    ${showAbilities ? `
                    <!-- Abilities -->
                    <div style="cursor: pointer; margin-top: 4px;" id="mwi-abilities-toggle">
                        + ${(0, src_core_i18n_js.t)("Abilities: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.abilities.totalCost)))}
                    </div>
                    <div id="mwi-abilities-details" style="display: none; margin-left: 20px;">
                        <!-- Equipped Abilities -->
                        <div style="cursor: pointer; margin-top: 4px;" id="mwi-equipped-abilities-toggle">
                            + ${(0, src_core_i18n_js.t)("Equipped ({0}): {1}", fa.abilities.equippedBreakdown.length, (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.abilities.equippedCost)))}
                        </div>
                        <div id="mwi-equipped-abilities-breakdown" style="display: none; margin-left: 20px; font-size: 0.8rem; color: #bbb; white-space: pre-line;">${this.renderAbilitiesBreakdown(fa.abilities.equippedBreakdown)}</div>

                        ${fa.abilities.otherBreakdown.length > 0 ? `
                            <div style="cursor: pointer; margin-top: 4px;" id="mwi-other-abilities-toggle">
                                + ${(0, src_core_i18n_js.t)("Other Abilities ({0}): {1}", fa.abilities.otherBreakdown.length, (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.abilities.totalCost - fa.abilities.equippedCost)))}
                            </div>
                            <div id="mwi-other-abilities-breakdown" style="display: none; margin-left: 20px; font-size: 0.8rem; color: #bbb; white-space: pre-line;">${this.renderAbilitiesBreakdown(fa.abilities.otherBreakdown)}</div>
                        ` : ""}
                    </div>
                    ` : ""}

                    ${fa.abilityBooks.breakdown.length > 0 ? `
                        <div style="cursor: pointer; margin-top: 4px;" id="mwi-ability-books-toggle">
                            + ${(0, src_core_i18n_js.t)("Ability Books ({0}): {1}", fa.abilityBooks.breakdown.length, (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.abilityBooks.totalCost)))}
                        </div>
                        <div id="mwi-ability-books-breakdown" style="display: none; margin-left: 20px; font-size: 0.8rem; color: #bbb; white-space: pre-line;">${this.renderAbilityBooksBreakdown(fa.abilityBooks.breakdown)}</div>
                    ` : ""}
                </div>
                ` : ""}

                ${showExcluded ? `
                <!-- Excluded -->
                <div style="cursor: pointer; margin-top: 8px; opacity: 0.6;" id="mwi-excluded-toggle">
                    + ${(0, src_core_i18n_js.t)("Excluded: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(excl.total)))}
                </div>
                <div id="mwi-excluded-details" style="display: none; margin-left: 20px; font-size: 0.8rem;">
                    ${excl.items.map((item) => `
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3px; color: rgba(255,255,255,0.45);">
                            <span style="text-decoration: line-through;">${item.name}: ${(0, src_utils_formatters_js.networthFormatter)(Math.round(item.amount))}</span>
                             <span class="mwi-excluded-remove" data-type="${item.type}" data-value="${item.value.replace(/"/g, "&quot;")}" style="cursor: pointer; color: rgba(255,100,100,0.7); margin-left: 8px; font-size: 0.75rem;" title="${(0, src_core_i18n_js.t)("Remove exclusion")}">✕</span>
                        </div>
                    `).join("")}
                </div>
                ` : ""}
            </div>
        `;
			sectionsToPreserve.forEach((id) => {
				const elem = this.container.querySelector(`#${id}`);
				if (elem && expandedStates[id]) {
					elem.style.display = "block";
					let toggleId = id.replace("-details", "-toggle").replace("-breakdown", "-toggle").replace("-detail", "-toggle");
					if (toggleId === id) toggleId = id + "-toggle";
					const toggleBtn = this.container.querySelector(`#${toggleId}`);
					if (toggleBtn) toggleBtn.textContent = toggleBtn.textContent.replace("+ ", "- ");
				}
			});
			this.setupToggleListeners(networthData);
		}
		/**
		* Render houses breakdown HTML
		* @param {Array} breakdown - Array of {name, level, cost}
		* @returns {string} HTML string
		*/
		renderHousesBreakdown(breakdown) {
			if (breakdown.length === 0) return `<div>${(0, src_core_i18n_js.t)("No houses built")}</div>`;
			return breakdown.map((house) => {
				return `${house.name} ${house.level}: ${(0, src_utils_formatters_js.networthFormatter)(Math.round(house.cost))}`;
			}).join("\n");
		}
		/**
		* Render abilities breakdown HTML
		* @param {Array} breakdown - Array of {name, cost}
		* @returns {string} HTML string
		*/
		renderAbilitiesBreakdown(breakdown) {
			if (breakdown.length === 0) return `<div>${(0, src_core_i18n_js.t)("No abilities")}</div>`;
			return breakdown.map((ability) => {
				return `${ability.name}: ${(0, src_utils_formatters_js.networthFormatter)(Math.round(ability.cost))}`;
			}).join("\n");
		}
		/**
		* Render ability books breakdown HTML
		* @param {Array} breakdown - Array of {name, value, count}
		* @returns {string} HTML string
		*/
		renderAbilityBooksBreakdown(breakdown) {
			if (breakdown.length === 0) return `<div>${(0, src_core_i18n_js.t)("No ability books")}</div>`;
			return breakdown.map((book) => {
				return `${book.name} (${(0, src_utils_formatters_js.formatKMB)(book.count)}): ${(0, src_utils_formatters_js.networthFormatter)(Math.round(book.value))}`;
			}).join("\n");
		}
		/**
		* Render equipment breakdown HTML
		* @param {Array} breakdown - Array of {name, value}
		* @returns {string} HTML string
		*/
		renderEquipmentBreakdown(breakdown) {
			if (breakdown.length === 0) return `<div>${(0, src_core_i18n_js.t)("No equipment")}</div>`;
			return breakdown.map((item) => {
				return `${item.name}: ${(0, src_utils_formatters_js.networthFormatter)(Math.round(item.value))}`;
			}).join("\n");
		}
		/**
		* Render market listings breakdown HTML
		* @param {Array} breakdown - Array of listing objects
		* @returns {string} HTML string
		*/
		renderListingsBreakdown(breakdown) {
			if (!breakdown || breakdown.length === 0) return `<div>${(0, src_core_i18n_js.t)("No market listings")}</div>`;
			return breakdown.map((listing) => {
				const typeLabel = listing.isSell ? (0, src_core_i18n_js.t)("Sell") : (0, src_core_i18n_js.t)("Buy");
				return `${listing.name} (${typeLabel}): ${(0, src_utils_formatters_js.networthFormatter)(Math.round(listing.value))}`;
			}).join("\n");
		}
		/**
		* Render inventory breakdown HTML (grouped by category, with Coin as a top-level line item)
		* @param {Object} inventory - inventory object with byCategory and breakdown
		* @returns {string} HTML string
		*/
		renderInventoryBreakdown(inventory) {
			const byCategory = inventory.byCategory ?? {};
			const coinItem = inventory.breakdown?.find((item) => item.itemHrid === "/items/coin") ?? null;
			if (Object.keys(byCategory).length === 0 && !coinItem) return `<div>${(0, src_core_i18n_js.t)("No inventory")}</div>`;
			const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1].totalValue - a[1].totalValue);
			const renderCategory = ([categoryName, categoryData]) => {
				const categoryId = `mwi-inventory-${categoryName.toLowerCase().replace(/\s+/g, "-")}`;
				const categoryToggleId = `${categoryId}-toggle`;
				const itemsHTML = categoryData.items.map((item) => {
					if (item.isOpenable && item.itemHrid) return this.renderOpenableItemRow(item);
					return `<div>${item.name} x${(0, src_utils_formatters_js.formatKMB)(item.count)}: ${(0, src_utils_formatters_js.networthFormatter)(Math.round(item.value))}</div>`;
				}).join("");
				return `
                <div style="cursor: pointer; margin-top: 4px; font-size: 0.85rem;" id="${categoryToggleId}">
                    + ${categoryName}: ${(0, src_utils_formatters_js.networthFormatter)(Math.round(categoryData.totalValue))}
                </div>
                <div id="${categoryId}" style="display: none; margin-left: 20px; font-size: 0.75rem; color: #999;">
                    ${itemsHTML}
                </div>
            `;
			};
			const coinHTML = coinItem ? `<div style="margin-top: 4px; font-size: 0.85rem;">${(0, src_core_i18n_js.t)("Coin: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(coinItem.value)))}</div>` : "";
			let html = "";
			let coinInserted = !coinItem;
			for (const entry of sortedCategories) {
				if (!coinInserted && coinItem.value >= entry[1].totalValue) {
					html += coinHTML;
					coinInserted = true;
				}
				html += renderCategory(entry);
			}
			if (!coinInserted) html += coinHTML;
			return html;
		}
		/**
		* Set up toggle event listeners
		* @param {Object} networthData - Networth data
		*/
		setupToggleListeners(networthData) {
			const ca = networthData.currentAssets;
			const fa = networthData.fixedAssets;
			const excl = networthData.excluded ?? {
				total: 0,
				items: []
			};
			this.setupToggle("mwi-networth-toggle", "mwi-networth-details", (0, src_core_i18n_js.t)("Net Worth: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(networthData.totalNetworth))));
			const chartBtn = this.container.querySelector("#mwi-networth-chart-btn");
			if (chartBtn) {
				chartBtn.addEventListener("click", (e) => {
					e.stopPropagation();
					networthHistoryChart.openModal();
				});
				chartBtn.addEventListener("mouseenter", () => {
					chartBtn.style.opacity = "1";
				});
				chartBtn.addEventListener("mouseleave", () => {
					chartBtn.style.opacity = "0.7";
				});
			}
			const exclusionsBtn = this.container.querySelector("#mwi-networth-exclusions-btn");
			if (exclusionsBtn) {
				exclusionsBtn.addEventListener("click", (e) => {
					e.stopPropagation();
					networthExclusionPopup.open(networthData, () => {
						if (this.networthFeature) this.networthFeature.recalculate();
					});
				});
				exclusionsBtn.addEventListener("mouseenter", () => {
					exclusionsBtn.style.opacity = "1";
				});
				exclusionsBtn.addEventListener("mouseleave", () => {
					exclusionsBtn.style.opacity = "0.6";
				});
			}
			if (ca.total > 0) this.setupToggle("mwi-current-assets-toggle", "mwi-current-assets-details", (0, src_core_i18n_js.t)("Current Assets: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(ca.total))));
			if (ca.equipped.value > 0) this.setupToggle("mwi-equipment-toggle", "mwi-equipment-breakdown", (0, src_core_i18n_js.t)("Equipment value: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(ca.equipped.value))));
			if (ca.inventory.value > 0) {
				this.setupToggle("mwi-inventory-toggle", "mwi-inventory-breakdown", (0, src_core_i18n_js.t)("Inventory value: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(ca.inventory.value))));
				Object.entries(ca.inventory.byCategory || {}).forEach(([categoryName, categoryData]) => {
					const categoryId = `mwi-inventory-${categoryName.toLowerCase().replace(/\s+/g, "-")}`;
					const categoryToggleId = `${categoryId}-toggle`;
					this.setupToggle(categoryToggleId, categoryId, `${categoryName}: ${(0, src_utils_formatters_js.networthFormatter)(Math.round(categoryData.totalValue))}`);
				});
				for (const categoryData of Object.values(ca.inventory.byCategory || {})) for (const item of categoryData.items) if (item.isOpenable && item.itemHrid) {
					const slug = item.itemHrid.split("/").pop();
					this.setupToggle(`mwi-chest-${slug}-toggle`, `mwi-chest-${slug}-detail`, `${item.name} x${(0, src_utils_formatters_js.formatKMB)(item.count)}: ${(0, src_utils_formatters_js.networthFormatter)(Math.round(item.value))}`);
				}
			}
			if (ca.listings.value > 0) this.setupToggle("mwi-listings-toggle", "mwi-listings-breakdown", (0, src_core_i18n_js.t)("Market listings: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(ca.listings.value))));
			if (fa.total > 0) this.setupToggle("mwi-fixed-assets-toggle", "mwi-fixed-assets-details", (0, src_core_i18n_js.t)("Fixed Assets: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.total))));
			if (fa.houses.totalCost > 0) this.setupToggle("mwi-houses-toggle", "mwi-houses-breakdown", (0, src_core_i18n_js.t)("Houses: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.houses.totalCost))));
			if (fa.abilities.totalCost > 0) {
				this.setupToggle("mwi-abilities-toggle", "mwi-abilities-details", (0, src_core_i18n_js.t)("Abilities: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.abilities.totalCost))));
				this.setupToggle("mwi-equipped-abilities-toggle", "mwi-equipped-abilities-breakdown", (0, src_core_i18n_js.t)("Equipped ({0}): {1}", fa.abilities.equippedBreakdown.length, (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.abilities.equippedCost))));
				if (fa.abilities.otherBreakdown.length > 0) this.setupToggle("mwi-other-abilities-toggle", "mwi-other-abilities-breakdown", (0, src_core_i18n_js.t)("Other Abilities ({0}): {1}", fa.abilities.otherBreakdown.length, (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.abilities.totalCost - fa.abilities.equippedCost))));
			}
			if (fa.abilityBooks.breakdown.length > 0) this.setupToggle("mwi-ability-books-toggle", "mwi-ability-books-breakdown", (0, src_core_i18n_js.t)("Ability Books ({0}): {1}", fa.abilityBooks.breakdown.length, (0, src_utils_formatters_js.networthFormatter)(Math.round(fa.abilityBooks.totalCost))));
			if (excl.total > 0) {
				this.setupToggle("mwi-excluded-toggle", "mwi-excluded-details", (0, src_core_i18n_js.t)("Excluded: {0}", (0, src_utils_formatters_js.networthFormatter)(Math.round(excl.total))));
				this.container.querySelectorAll(".mwi-excluded-remove").forEach((btn) => {
					btn.addEventListener("mouseenter", () => {
						btn.style.color = "rgba(255,100,100,1)";
					});
					btn.addEventListener("mouseleave", () => {
						btn.style.color = "rgba(255,100,100,0.7)";
					});
					btn.addEventListener("click", async () => {
						const type = btn.dataset.type;
						const value = btn.dataset.value;
						await removeExclusion(type, value);
						if (this.networthFeature) this.networthFeature.recalculate();
					});
				});
			}
		}
		/**
		* Render an expandable row for an openable item (chest, cache, crate)
		* @param {Object} item - Item data including itemHrid and isOpenable
		* @returns {string} HTML string
		*/
		renderOpenableItemRow(item) {
			const slug = item.itemHrid.split("/").pop();
			const toggleId = `mwi-chest-${slug}-toggle`;
			const detailId = `mwi-chest-${slug}-detail`;
			const evData = expectedValueCalculator.isInitialized ? expectedValueCalculator.calculateExpectedValue(item.itemHrid) : null;
			let detailsHTML = "";
			if (evData) {
				const chestKeyHrid = DUNGEON_CHEST_CHEST_KEYS[item.itemHrid];
				let keyPrice = 0;
				let keyName = null;
				if (chestKeyHrid) {
					const setting = src_core_config_js.default.getSettingValue("profitCalc_keyPricingMode") || "ask";
					const keyPrices = src_api_marketplace_js.default.getPrice(chestKeyHrid);
					keyPrice = keyPrices?.[setting] ?? keyPrices?.ask ?? 0;
					keyName = src_core_data_manager_js.default.getItemDetails(chestKeyHrid)?.name;
				}
				detailsHTML = this.buildChestDropsHTML(evData, keyPrice, keyName);
			}
			return `
            <div id="${toggleId}" style="cursor: pointer; padding: 1px 0;">
                + ${item.name} x${(0, src_utils_formatters_js.formatKMB)(item.count)}: ${(0, src_utils_formatters_js.networthFormatter)(Math.round(item.value))}
            </div>
            <div id="${detailId}" style="display: none; margin-left: 16px; color: #bbb; margin-bottom: 2px;">
                ${detailsHTML}
            </div>`;
		}
		/**
		* Build the drop breakdown HTML for an expanded chest row
		* @param {Object} evData - Expected value data from expectedValueCalculator
		* @param {number} keyPrice - Chest key market price (0 for non-dungeon chests)
		* @param {string|null} keyName - Chest key item name
		* @returns {string} HTML string
		*/
		buildChestDropsHTML(evData, keyPrice, keyName) {
			let html = `<div>${(0, src_core_i18n_js.t)("EV: {0}/chest", (0, src_utils_formatters_js.networthFormatter)(Math.round(evData.expectedValue)))}</div>`;
			if (keyPrice > 0) {
				const label = keyName ? (0, src_core_i18n_js.t)("Key ({0})", keyName) : (0, src_core_i18n_js.t)("Key Cost");
				html += `<div>\u2212 ${label}: ${(0, src_utils_formatters_js.networthFormatter)(Math.round(keyPrice))}</div>`;
				html += `<div>${(0, src_core_i18n_js.t)("Net: {0}/chest", (0, src_utils_formatters_js.networthFormatter)(Math.round(evData.expectedValue - keyPrice)))}</div>`;
			}
			const pricedDrops = evData.drops.filter((d) => d.hasPriceData);
			if (pricedDrops.length > 0) {
				html += "<div style=\"margin-top: 3px;\">";
				for (const drop of pricedDrops) {
					const pct = (drop.dropRate * 100).toFixed(1);
					html += `<div>\u2022 ${drop.itemName} (${pct}%): ${(0, src_utils_formatters_js.networthFormatter)(Math.round(drop.expectedValue))}</div>`;
				}
				html += "</div>";
			}
			return html;
		}
		/**
		* Set up a single toggle button
		* @param {string} toggleId - Toggle button element ID
		* @param {string} detailsId - Details element ID
		* @param {string} label - Label text (without +/- prefix)
		*/
		setupToggle(toggleId, detailsId, label) {
			const toggleBtn = this.container.querySelector(`#${toggleId}`);
			const details = this.container.querySelector(`#${detailsId}`);
			if (!toggleBtn || !details) return;
			toggleBtn.addEventListener("click", () => {
				const isCollapsed = details.style.display === "none";
				details.style.display = isCollapsed ? "block" : "none";
				toggleBtn.textContent = (isCollapsed ? "- " : "+ ") + label;
			});
		}
		/**
		* Refresh colors on existing panel
		*/
		refresh() {
			if (!this.container || !document.body.contains(this.container)) return;
			this.container.style.color = src_core_config_js.default.COLOR_ACCENT;
		}
		/**
		* Disable and cleanup
		*/
		disable() {
			if (this.container) {
				this.container.remove();
				this.container = null;
			}
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			this.currentData = null;
			this.isInitialized = false;
		}
	};
	var networthHeaderDisplay = new NetworthHeaderDisplay();
	var networthInventoryDisplay = new NetworthInventoryDisplay();
	//#endregion
	//#region src/utils/pause-registry.js
	/**
	* Create a pause registry for deterministic pause/resume handling.
	* @param {{ connectionState?: { on: Function, off: Function } }} [options] - Optional dependency overrides.
	* @returns {{
	*   register: (id: string, pauseFn: Function, resumeFn: Function) => void,
	*   unregister: (id: string) => void,
	*   pauseAll: () => void,
	*   resumeAll: () => void,
	*   cleanup: () => void
	* }} Pause registry API
	*/
	function createPauseRegistry(options = {}) {
		const registry = /* @__PURE__ */ new Map();
		const connectionStateRef = options.connectionState || connectionState;
		let isPaused = false;
		const normalizeId = (id) => typeof id === "string" ? id.trim() : id;
		const isValidId = (id) => typeof id === "string" && id.trim().length > 0;
		/**
		* Register pausable work by unique id.
		* @param {string} id - Unique identifier for the pausable work.
		* @param {Function} pauseFn - Callback invoked on pause.
		* @param {Function} resumeFn - Callback invoked on resume.
		*/
		const register = (id, pauseFn, resumeFn) => {
			if (!isValidId(id) || typeof pauseFn !== "function" || typeof resumeFn !== "function") {
				console.warn("[PauseRegistry] register called with invalid arguments");
				return;
			}
			const normalizedId = normalizeId(id);
			if (registry.has(normalizedId)) console.warn(`[PauseRegistry] register called with duplicate id: ${normalizedId}`);
			registry.set(normalizedId, {
				pauseFn,
				resumeFn
			});
			if (isPaused) try {
				pauseFn();
			} catch (error) {
				console.error(`[PauseRegistry] Failed to pause '${normalizedId}' during register:`, error);
			}
		};
		/**
		* Unregister pausable work by id.
		* Note: Unregister does not auto-resume if currently paused.
		* @param {string} id - Identifier to remove.
		*/
		const unregister = (id) => {
			if (!isValidId(id)) {
				console.warn("[PauseRegistry] unregister called with invalid id");
				return;
			}
			registry.delete(normalizeId(id));
		};
		const callAll = (actionLabel, handlerKey) => {
			for (const [entryId, entry] of registry.entries()) {
				const handler = entry[handlerKey];
				if (typeof handler !== "function") continue;
				try {
					handler();
				} catch (error) {
					console.error(`[PauseRegistry] Failed to ${actionLabel} '${entryId}':`, error);
				}
			}
		};
		/**
		* Pause all registered work.
		*/
		const pauseAll = () => {
			if (isPaused) return;
			isPaused = true;
			callAll("pause", "pauseFn");
		};
		/**
		* Resume all registered work.
		*/
		const resumeAll = () => {
			if (!isPaused) return;
			isPaused = false;
			callAll("resume", "resumeFn");
		};
		const handleDisconnected = () => {
			pauseAll();
		};
		const handleReconnected = () => {
			resumeAll();
		};
		if (connectionStateRef && typeof connectionStateRef.on === "function") {
			connectionStateRef.on("disconnected", handleDisconnected);
			connectionStateRef.on("reconnected", handleReconnected);
		} else console.warn("[PauseRegistry] connectionState unavailable; pause/resume events not wired");
		/**
		* Cleanup registry subscriptions.
		*/
		const cleanup = () => {
			if (!connectionStateRef || typeof connectionStateRef.off !== "function") return;
			connectionStateRef.off("disconnected", handleDisconnected);
			connectionStateRef.off("reconnected", handleReconnected);
		};
		return {
			register,
			unregister,
			pauseAll,
			resumeAll,
			cleanup
		};
	}
	//#endregion
	//#region src/features/networth/index.js
	/**
	* Networth Feature - Main Coordinator
	* Manages networth calculation and display updates
	*/
	var NetworthFeature = class {
		constructor() {
			this.isActive = false;
			this.currentData = null;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
			this.pauseRegistry = null;
			this.priceUpdateHandler = null;
			this.pricingModeHandler = null;
			this.itemsUpdateHandler = null;
			this.priceUpdateDebounceTimer = null;
			this.itemsUpdateDebounceTimer = null;
		}
		/**
		* Initialize the networth feature
		*/
		async initialize() {
			if (this.isActive) return;
			networthHeaderDisplay.setNetworthFeature(this);
			networthInventoryDisplay.setNetworthFeature(this);
			await initExclusions();
			if (src_core_config_js.default.isFeatureEnabled("networth")) networthHeaderDisplay.initialize();
			if (src_core_config_js.default.isFeatureEnabled("inventorySummary")) networthInventoryDisplay.initialize();
			if (!this.pauseRegistry) {
				this.pauseRegistry = createPauseRegistry();
				this.pauseRegistry.register("networth-event-listeners", () => this.pauseListeners(), () => this.resumeListeners());
			}
			this.setupEventListeners();
			if (connectionState.isConnected()) await this.recalculate();
			if (src_core_config_js.default.getSetting("networth_historyChart")) {
				networthHistoryChart.setNetworthFeature(this);
				await networthHistory.initialize(this);
			}
			this.isActive = true;
		}
		/**
		* Set up event listeners for automatic updates
		*/
		setupEventListeners() {
			this.priceUpdateHandler = () => {
				clearTimeout(this.priceUpdateDebounceTimer);
				this.priceUpdateDebounceTimer = setTimeout(() => {
					if (this.isActive && connectionState.isConnected()) this.recalculate();
				}, 1e3);
			};
			src_api_marketplace_js.default.on(this.priceUpdateHandler);
			this.pricingModeHandler = () => {
				if (this.isActive && connectionState.isConnected()) {
					networthCache.clear();
					this.recalculate();
				}
			};
			src_core_config_js.default.onSettingChange("networth_pricingMode", this.pricingModeHandler);
			this.itemsUpdateHandler = () => {
				clearTimeout(this.itemsUpdateDebounceTimer);
				this.itemsUpdateDebounceTimer = setTimeout(() => {
					if (this.isActive && connectionState.isConnected()) {
						clearTimeout(this.itemsUpdateMaxWaitTimer);
						this.itemsUpdateMaxWaitTimer = null;
						this.recalculate();
					}
				}, 500);
				if (!this.itemsUpdateMaxWaitTimer) this.itemsUpdateMaxWaitTimer = setTimeout(() => {
					this.itemsUpdateMaxWaitTimer = null;
					clearTimeout(this.itemsUpdateDebounceTimer);
					this.itemsUpdateDebounceTimer = null;
					if (this.isActive && connectionState.isConnected()) this.recalculate();
				}, 5e3);
			};
			src_core_data_manager_js.default.on("items_updated", this.itemsUpdateHandler);
		}
		/**
		* Pause event listeners (called when tab is hidden)
		*/
		pauseListeners() {
			clearTimeout(this.priceUpdateDebounceTimer);
			clearTimeout(this.itemsUpdateDebounceTimer);
			clearTimeout(this.itemsUpdateMaxWaitTimer);
			this.itemsUpdateMaxWaitTimer = null;
		}
		/**
		* Resume event listeners (called when tab is visible)
		*/
		resumeListeners() {
			if (this.isActive && connectionState.isConnected()) this.recalculate();
		}
		/**
		* Recalculate networth and update displays
		*/
		async recalculate() {
			if (!connectionState.isConnected()) return;
			try {
				const networthData = await calculateNetworth();
				this.currentData = networthData;
				if (src_core_config_js.default.isFeatureEnabled("networth")) networthHeaderDisplay.update(networthData);
				if (src_core_config_js.default.isFeatureEnabled("inventorySummary")) networthInventoryDisplay.update(networthData);
				networthExclusionPopup.refresh(networthData);
			} catch (error) {
				console.error("[Networth] Error calculating networth:", error);
			}
		}
		/**
		* Disable the feature
		*/
		disable() {
			clearTimeout(this.priceUpdateDebounceTimer);
			clearTimeout(this.itemsUpdateDebounceTimer);
			clearTimeout(this.itemsUpdateMaxWaitTimer);
			this.itemsUpdateMaxWaitTimer = null;
			if (this.priceUpdateHandler) {
				src_api_marketplace_js.default.off(this.priceUpdateHandler);
				this.priceUpdateHandler = null;
			}
			if (this.pricingModeHandler) {
				src_core_config_js.default.offSettingChange("networth_pricingMode", this.pricingModeHandler);
				this.pricingModeHandler = null;
			}
			if (this.itemsUpdateHandler) {
				src_core_data_manager_js.default.off("items_updated", this.itemsUpdateHandler);
				this.itemsUpdateHandler = null;
			}
			if (this.pauseRegistry) {
				this.pauseRegistry.unregister("networth-event-listeners");
				this.pauseRegistry.cleanup();
				this.pauseRegistry = null;
			}
			this.timerRegistry.clearAll();
			networthHeaderDisplay.disable();
			networthInventoryDisplay.disable();
			networthHistory.disable();
			networthHistoryChart.closeModal();
			networthExclusionPopup.close();
			networthCache.clear();
			this.currentData = null;
			this.isActive = false;
		}
	};
	var networthFeature = new NetworthFeature();
	//#endregion
	//#region src/features/inventory/inventory-badge-manager.js
	/**
	* Inventory Badge Manager
	* Centralized management for all inventory item badges
	* Prevents race conditions with React re-renders by coordinating all badge rendering
	*/
	/**
	* InventoryBadgeManager class manages all inventory item badges from multiple features
	*/
	var InventoryBadgeManager = class {
		constructor() {
			this.providers = /* @__PURE__ */ new Map();
			this.currentInventoryElem = null;
			this.unregisterHandlers = [];
			this.isInitialized = false;
			this.processedItems = /* @__PURE__ */ new WeakSet();
			this.warnedItems = /* @__PURE__ */ new Set();
			this.isCalculating = false;
			this.lastCalculationTime = 0;
			this.CALCULATION_COOLDOWN = 250;
			this.isRendering = false;
			this.lastRenderTime = 0;
			this.RENDER_COOLDOWN = 100;
			this.inventoryLookupCache = null;
			this.inventoryLookupCacheTime = 0;
			this.INVENTORY_CACHE_TTL = 500;
			this.nameToHridMap = null;
		}
		/**
		* Initialize badge manager
		*/
		initialize() {
			if (this.isInitialized) return;
			this.isInitialized = true;
			const existingInv = document.querySelector("[class*=\"Inventory_items\"]");
			if (existingInv) this.currentInventoryElem = existingInv;
			const unregister = src_core_dom_observer_js.default.onClass("InventoryBadgeManager", "Inventory_items", (elem) => {
				this.currentInventoryElem = elem;
			});
			this.unregisterHandlers.push(unregister);
			const unwatchPopper = (0, src_utils_dom_observer_helpers_js.createMutationWatcher)(document.body, (mutations) => {
				for (const mutation of mutations) {
					for (const node of mutation.addedNodes) {
						if (node.nodeType !== Node.ELEMENT_NODE) continue;
						if (node.classList?.contains("MuiTooltip-popperInteractive")) {
							setTimeout(() => this.renderAllBadges(), 50);
							return;
						}
					}
					for (const node of mutation.removedNodes) {
						if (node.nodeType !== Node.ELEMENT_NODE) continue;
						if (node.classList?.contains("MuiTooltip-popperInteractive")) {
							setTimeout(() => this.renderAllBadges(), 50);
							return;
						}
					}
				}
			}, { childList: true });
			this.unregisterHandlers.push(unwatchPopper);
		}
		/**
		* Register a badge provider
		* @param {string} name - Unique provider name
		* @param {Function} renderFn - Function(itemElem) that renders badges for an item
		* @param {number} priority - Render order (lower = earlier, default 100)
		*/
		registerProvider(name, renderFn, priority = 100) {
			this.providers.set(name, {
				renderFn,
				priority
			});
			this.clearProcessedTracking();
		}
		/**
		* Unregister a badge provider
		* @param {string} name - Provider name
		*/
		unregisterProvider(name) {
			this.providers.delete(name);
		}
		/**
		* Clear processed tracking (forces re-render on next pass)
		*/
		clearProcessedTracking() {
			this.processedItems = /* @__PURE__ */ new WeakSet();
		}
		/**
		* Invalidate caches so next renderAllBadges() uses fresh data.
		* Call this when inventory contents change (items_updated events).
		*/
		invalidateCache() {
			this.inventoryLookupCache = null;
			this.inventoryLookupCacheTime = 0;
			this.clearProcessedTracking();
		}
		/**
		* Render all badges on all items from all providers
		*/
		async renderAllBadges() {
			if (!this.currentInventoryElem) return;
			const now = Date.now();
			if (now - this.lastRenderTime < this.RENDER_COOLDOWN) return;
			this.lastRenderTime = now;
			if (this.isRendering) return;
			this.isRendering = true;
			await this.calculatePricesForAllItems();
			const itemElems = this.currentInventoryElem.querySelectorAll("[class*=\"Item_itemContainer\"]");
			const sortedProviders = Array.from(this.providers.entries()).sort((a, b) => a[1].priority - b[1].priority);
			for (const itemElem of itemElems) {
				const wasProcessed = this.processedItems.has(itemElem);
				const hasBadges = this.itemHasBadges(itemElem);
				if (wasProcessed && hasBadges) continue;
				for (const [name, { renderFn }] of sortedProviders) try {
					renderFn(itemElem);
				} catch (error) {
					console.error(`[InventoryBadgeManager] Error in provider "${name}":`, error);
				}
				this.processedItems.add(itemElem);
			}
			this.isRendering = false;
		}
		/**
		* Calculate prices for all items in inventory
		*/
		async calculatePricesForAllItems() {
			if (!this.currentInventoryElem) return;
			if (this.isCalculating) return;
			const now = Date.now();
			if (now - this.lastCalculationTime < this.CALCULATION_COOLDOWN) return;
			this.lastCalculationTime = now;
			this.isCalculating = true;
			const inventoryElem = this.currentInventoryElem;
			let inventory = null;
			let inventoryLookup = null;
			const cacheAge = now - this.inventoryLookupCacheTime;
			if (this.inventoryLookupCache && cacheAge < this.INVENTORY_CACHE_TTL) {
				inventory = this.inventoryLookupCache.inventory;
				inventoryLookup = this.inventoryLookupCache.lookup;
			} else {
				inventory = src_core_data_manager_js.default.getInventory();
				if (inventory) {
					inventoryLookup = /* @__PURE__ */ new Map();
					for (const item of inventory) if (item.itemLocationHrid === "/item_locations/inventory") {
						const key = `${item.itemHrid}|${item.count}|${item.enhancementLevel || 0}`;
						inventoryLookup.set(key, item);
					}
					this.inventoryLookupCache = {
						inventory,
						lookup: inventoryLookup
					};
					this.inventoryLookupCacheTime = now;
				}
			}
			for (const categoryDiv of inventoryElem.children) {
				const itemElems = categoryDiv.querySelectorAll("[class*=\"Item_itemContainer\"]");
				await this.calculateItemPrices(itemElems, inventory, inventoryLookup);
			}
			this.isCalculating = false;
		}
		/**
		* Calculate and store prices for all items (populates dataset.askValue/bidValue)
		* @param {NodeList} itemElems - Item elements
		* @param {Array} cachedInventory - Optional cached inventory data
		* @param {Map} cachedInventoryLookup - Optional cached inventory lookup map
		*/
		async calculateItemPrices(itemElems, cachedInventory = null, cachedInventoryLookup = null) {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData) {
				console.warn("[InventoryBadgeManager] Game data not available yet");
				return;
			}
			let inventory = cachedInventory;
			let inventoryLookup = cachedInventoryLookup;
			if (!inventory || !inventoryLookup) {
				inventory = src_core_data_manager_js.default.getInventory();
				if (!inventory) {
					console.warn("[InventoryBadgeManager] Inventory data not available yet");
					return;
				}
				inventoryLookup = /* @__PURE__ */ new Map();
				for (const item of inventory) if (item.itemLocationHrid === "/item_locations/inventory") {
					const key = `${item.itemHrid}|${item.count}|${item.enhancementLevel || 0}`;
					inventoryLookup.set(key, item);
				}
			}
			const itemsToPrice = [];
			for (const item of inventory) if (item.itemLocationHrid === "/item_locations/inventory") itemsToPrice.push({
				itemHrid: item.itemHrid,
				enhancementLevel: item.enhancementLevel || 0
			});
			const priceCache = src_api_marketplace_js.default.getPricesBatch(itemsToPrice);
			const useHighEnhancementCost = src_core_config_js.default.getSetting("networth_highEnhancementUseCost") && src_core_config_js.default.isFeatureEnabled("networth");
			const minLevel = src_core_config_js.default.getSetting("networth_highEnhancementMinLevel") || 13;
			const currencyHrids = /* @__PURE__ */ new Set([
				"/items/gold_coin",
				"/items/cowbell",
				"/items/task_token",
				"/items/chimerical_token",
				"/items/sinister_token",
				"/items/enchanted_token",
				"/items/pirate_token"
			]);
			for (const itemElem of itemElems) {
				const svg = itemElem.querySelector("svg");
				if (!svg) continue;
				const itemName = svg.getAttribute("aria-label");
				if (!itemName) continue;
				const itemHrid = this.findItemHrid(itemName, gameData);
				if (!itemHrid) continue;
				itemNameTranslator.captureFromDOM(svg, itemHrid);
				if (currencyHrids.has(itemHrid)) {
					itemElem.dataset.askPrice = 0;
					itemElem.dataset.bidPrice = 0;
					itemElem.dataset.askValue = 0;
					itemElem.dataset.bidValue = 0;
					continue;
				}
				const countElem = itemElem.querySelector("[class*=\"Item_count\"]");
				if (!countElem) continue;
				const itemCount = parseItemCount(countElem.textContent, 0);
				const itemDetails = gameData.itemDetailMap[itemHrid];
				if (itemHrid.includes("trainee_")) {
					const isCharm = itemDetails?.equipmentDetail?.type === "/equipment_types/charm";
					const sellPrice = itemDetails?.sellPrice;
					if (isCharm && sellPrice) {
						itemElem.dataset.askPrice = sellPrice;
						itemElem.dataset.bidPrice = sellPrice;
						itemElem.dataset.askValue = sellPrice * itemCount;
						itemElem.dataset.bidValue = sellPrice * itemCount;
					} else {
						itemElem.dataset.askPrice = 0;
						itemElem.dataset.bidPrice = 0;
						itemElem.dataset.askValue = 0;
						itemElem.dataset.bidValue = 0;
					}
					continue;
				}
				if (itemDetails?.isOpenable && expectedValueCalculator.isInitialized) {
					const evData = expectedValueCalculator.calculateExpectedValue(itemHrid);
					if (evData && evData.expectedValue > 0) {
						let netValue = evData.expectedValue;
						const chestKeyHrid = DUNGEON_CHEST_CHEST_KEYS[itemHrid];
						if (chestKeyHrid) {
							const keyPricingSetting = src_core_config_js.default.getSettingValue("profitCalc_keyPricingMode") || "ask";
							const keyPrices = src_api_marketplace_js.default.getPrice(chestKeyHrid);
							const keyPrice = keyPrices?.[keyPricingSetting] ?? keyPrices?.ask ?? 0;
							netValue -= keyPrice;
						}
						itemElem.dataset.askPrice = netValue;
						itemElem.dataset.bidPrice = netValue;
						itemElem.dataset.askValue = netValue * itemCount;
						itemElem.dataset.bidValue = netValue * itemCount;
						continue;
					}
				}
				const enhEl = itemElem.querySelector("[class*=\"Item_enhancementLevel\"]");
				const key = `${itemHrid}|${itemCount}|${enhEl ? parseInt(enhEl.textContent.trim().replace("+", ""), 10) || 0 : 0}`;
				const enhancementLevel = inventoryLookup.get(key)?.enhancementLevel || 0;
				const isEquipment = !!itemDetails?.equipmentDetail;
				let askPrice = 0;
				let bidPrice = 0;
				if (isEquipment && useHighEnhancementCost && enhancementLevel >= minLevel) {
					const cachedCost = networthCache.get(itemHrid, enhancementLevel);
					if (cachedCost !== null) {
						askPrice = cachedCost;
						bidPrice = cachedCost;
					} else {
						const enhancementPath = calculateEnhancementPath(itemHrid, enhancementLevel, (0, src_utils_enhancement_config_js.getEnhancingParams)());
						if (enhancementPath && enhancementPath.optimalStrategy) {
							const enhancementCost = enhancementPath.optimalStrategy.totalCost;
							networthCache.set(itemHrid, enhancementLevel, enhancementCost);
							askPrice = enhancementCost;
							bidPrice = enhancementCost;
						} else {
							const key = `${itemHrid}:${enhancementLevel}`;
							const marketPrice = priceCache.get(key);
							if (marketPrice) {
								askPrice = marketPrice.ask > 0 ? marketPrice.ask : 0;
								bidPrice = marketPrice.bid > 0 ? marketPrice.bid : 0;
							}
						}
					}
				} else {
					const key = `${itemHrid}:${enhancementLevel}`;
					const marketPrice = priceCache.get(key);
					if (marketPrice) {
						askPrice = marketPrice.ask > 0 ? marketPrice.ask : 0;
						bidPrice = marketPrice.bid > 0 ? marketPrice.bid : 0;
					}
					if (useHighEnhancementCost && isEquipment && enhancementLevel > 0 && (askPrice === 0 || bidPrice === 0)) {
						const cachedCost = networthCache.get(itemHrid, enhancementLevel);
						let enhancementCost = cachedCost;
						if (cachedCost === null) {
							const enhancementPath = calculateEnhancementPath(itemHrid, enhancementLevel, (0, src_utils_enhancement_config_js.getEnhancingParams)());
							if (enhancementPath && enhancementPath.optimalStrategy) {
								enhancementCost = enhancementPath.optimalStrategy.totalCost;
								networthCache.set(itemHrid, enhancementLevel, enhancementCost);
							} else enhancementCost = null;
						}
						if (enhancementCost !== null) {
							if (askPrice === 0) askPrice = enhancementCost;
							if (bidPrice === 0) bidPrice = enhancementCost;
						}
					} else if (isEquipment && enhancementLevel === 0 && askPrice === 0 && bidPrice === 0) {
						const craftingCost = this.calculateCraftingCost(itemHrid);
						if (craftingCost > 0) {
							askPrice = craftingCost;
							bidPrice = craftingCost;
						} else if (!this.warnedItems.has(itemHrid)) this.warnedItems.add(itemHrid);
					} else if (!isEquipment && askPrice === 0 && bidPrice === 0) {
						if (!this.warnedItems.has(itemHrid)) this.warnedItems.add(itemHrid);
					}
				}
				if (src_core_config_js.default.getSetting("invSort_netOfTax")) {
					const taxRate = itemHrid === src_utils_profit_constants_js.COWBELL_BAG_HRID ? src_utils_profit_constants_js.COWBELL_BAG_TAX : src_utils_profit_constants_js.MARKET_TAX;
					askPrice *= 1 - taxRate;
					bidPrice *= 1 - taxRate;
				}
				itemElem.dataset.askPrice = askPrice;
				itemElem.dataset.bidPrice = bidPrice;
				itemElem.dataset.askValue = askPrice * itemCount;
				itemElem.dataset.bidValue = bidPrice * itemCount;
			}
		}
		/**
		* Calculate crafting cost for an item (used for unenhanced equipment with no market data)
		* @param {string} itemHrid - Item HRID
		* @returns {number} Total material cost or 0 if not craftable
		*/
		calculateCraftingCost(itemHrid) {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData) return 0;
			for (const action of Object.values(gameData.actionDetailMap || {})) if (action.outputItems) {
				for (const output of action.outputItems) if (output.itemHrid === itemHrid) {
					let inputCost = 0;
					if (action.inputItems && action.inputItems.length > 0) for (const input of action.inputItems) {
						const inputPrice = (0, src_utils_market_data_js.getItemPrice)(input.itemHrid, { mode: "ask" }) || 0;
						inputCost += inputPrice * input.count;
					}
					inputCost *= .9;
					let upgradeCost = 0;
					if (action.upgradeItemHrid) upgradeCost = (0, src_utils_market_data_js.getItemPrice)(action.upgradeItemHrid, { mode: "ask" }) || 0;
					return (inputCost + upgradeCost) / (output.count || 1);
				}
			}
			return 0;
		}
		/**
		* Find item HRID from item name
		* @param {string} itemName - Item display name
		* @param {Object} gameData - Game data
		* @returns {string|null} Item HRID
		*/
		/**
		* Build reverse lookup map from item name to HRID
		* Built once on first use, cached thereafter
		* @param {Object} gameData - Game data
		*/
		buildNameToHridMap(gameData) {
			if (this.nameToHridMap) return;
			this.nameToHridMap = /* @__PURE__ */ new Map();
			if (!gameData || !gameData.itemDetailMap) {
				console.warn("[InventoryBadgeManager] Cannot build name lookup: missing itemDetailMap");
				return;
			}
			for (const [hrid, item] of Object.entries(gameData.itemDetailMap)) if (item.name) {
				this.nameToHridMap.set(item.name, hrid);
				if (item.name.includes("(R)")) this.nameToHridMap.set(item.name.replace(/\s*\(R\)/, " ★"), hrid);
				else if (item.name.includes("★")) this.nameToHridMap.set(item.name.replace(/\s*★/, " (R)"), hrid);
			}
		}
		/**
		* Find item HRID by name (optimized with reverse lookup map)
		* @param {string} itemName - Item name
		* @param {Object} gameData - Game data
		* @returns {string|null} Item HRID or null if not found
		*/
		findItemHrid(itemName, gameData) {
			if (!this.nameToHridMap) this.buildNameToHridMap(gameData);
			const hrid = this.nameToHridMap.get(itemName);
			if (hrid) return hrid;
			return itemNameTranslator.getHridFromChineseName(itemName) || null;
		}
		/**
		* Check if item has any badges
		* @param {Element} itemElem - Item container element
		* @returns {boolean} True if item has any badge elements
		*/
		itemHasBadges(itemElem) {
			return !!(itemElem.querySelector(".mwi-badge-price-bid") || itemElem.querySelector(".mwi-badge-price-ask") || itemElem.querySelector(".mwi-stack-price"));
		}
		/**
		* Disable and cleanup
		*/
		disable() {
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			this.providers.clear();
			this.processedItems = /* @__PURE__ */ new WeakSet();
			this.currentInventoryElem = null;
			this.isInitialized = false;
		}
	};
	var inventoryBadgeManager = new InventoryBadgeManager();
	//#endregion
	//#region src/features/inventory/inventory-sort.js
	/**
	* Inventory Sort Module
	* Sorts inventory items by Ask/Bid price with optional stack value badges
	*/
	/**
	* InventorySort class manages inventory sorting and price badges
	*/
	var InventorySort = class {
		constructor() {
			this.currentMode = "none";
			this.modeChangeListeners = [];
			this.unregisterHandlers = [];
			this.controlsContainer = null;
			this.currentInventoryElem = null;
			this.warnedItems = /* @__PURE__ */ new Set();
			this.isCalculating = false;
			this.isInitialized = false;
			this.itemsUpdatedHandler = null;
			this.itemsUpdatedDebounceTimer = null;
			this.priceUpdateHandler = null;
			this.priceUpdateDebounceTimer = null;
			this.DEBOUNCE_DELAY = 300;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
		}
		/**
		* Setup settings listeners for feature toggle and color changes
		*/
		setupSettingListener() {
			src_core_config_js.default.onSettingChange("invSort", async (value) => {
				if (value) await this.initialize();
				else this.disable();
			});
			src_core_config_js.default.onSettingChange("color_accent", () => {
				if (this.isInitialized) this.refresh();
			});
			src_core_config_js.default.onSettingChange("invSort_showBadges", () => {
				if (this.isInitialized) this.refresh();
			});
			src_core_config_js.default.onSettingChange("invSort_badgesOnNone", () => {
				if (this.isInitialized) this.refresh();
			});
		}
		/**
		* Initialize inventory sort feature
		*/
		async initialize() {
			if (!src_core_config_js.default.getSetting("invSort")) return;
			if (this.unregisterHandlers.length > 0) return;
			await this.loadSettings();
			inventoryBadgeManager.registerProvider("inventory-stack-price", (itemElem) => this.renderBadgesForItem(itemElem), 50);
			const existingInv = document.querySelector("[class*=\"Inventory_items\"]");
			if (existingInv) {
				this.currentInventoryElem = existingInv;
				this.injectSortControls(existingInv);
				this.applyCurrentSort();
			}
			const unregister = src_core_dom_observer_js.default.onClass("InventorySort", "Inventory_items", (elem) => {
				this.currentInventoryElem = elem;
				this.injectSortControls(elem);
				this.applyCurrentSort();
			});
			this.unregisterHandlers.push(unregister);
			this.itemsUpdatedHandler = () => {
				clearTimeout(this.itemsUpdatedDebounceTimer);
				this.itemsUpdatedDebounceTimer = setTimeout(() => {
					if (this.currentInventoryElem) {
						inventoryBadgeManager.invalidateCache();
						this.applyCurrentSort();
					}
				}, this.DEBOUNCE_DELAY);
			};
			src_core_data_manager_js.default.on("items_updated", this.itemsUpdatedHandler);
			this.setupMarketDataListener();
			this.isInitialized = true;
		}
		/**
		* Setup listener for market data updates
		*/
		setupMarketDataListener() {
			const priceUpdateHandler = () => {
				clearTimeout(this.priceUpdateDebounceTimer);
				this.priceUpdateDebounceTimer = setTimeout(() => {
					if (this.currentInventoryElem && this.isInitialized) this.applyCurrentSort();
				}, 500);
			};
			src_api_marketplace_js.default.on(priceUpdateHandler);
			this.priceUpdateHandler = priceUpdateHandler;
			if (!src_api_marketplace_js.default.isLoaded()) {
				let retryCount = 0;
				const maxRetries = 10;
				const retryCheck = setInterval(() => {
					retryCount++;
					if (src_api_marketplace_js.default.isLoaded()) {
						clearInterval(retryCheck);
						if (this.currentInventoryElem) this.applyCurrentSort();
					} else if (retryCount >= maxRetries) {
						console.warn("[InventorySort] Market data still not available after", maxRetries, "retries");
						clearInterval(retryCheck);
					}
				}, 500);
				this.timerRegistry.registerInterval(retryCheck);
			}
		}
		/**
		* Load settings from storage
		*/
		async loadSettings() {
			try {
				const settings = await src_core_storage_js.default.getJSON("inventorySort", "settings");
				if (settings && settings.mode) this.currentMode = settings.mode;
			} catch (error) {
				console.error("[InventorySort] Failed to load settings:", error);
			}
		}
		/**
		* Save settings to storage
		*/
		saveSettings() {
			try {
				src_core_storage_js.default.setJSON("inventorySort", { mode: this.currentMode }, "settings", true);
			} catch (error) {
				console.error("[InventorySort] Failed to save settings:", error);
			}
		}
		/**
		* Inject sort controls into inventory panel
		* @param {Element} inventoryElem - Inventory items container
		*/
		injectSortControls(inventoryElem) {
			this.currentInventoryElem = inventoryElem;
			if (this.controlsContainer && document.body.contains(this.controlsContainer)) return;
			this.controlsContainer = document.createElement("div");
			this.controlsContainer.className = "mwi-inventory-sort-controls";
			this.controlsContainer.style.cssText = `
            color: ${src_core_config_js.default.COLOR_ACCENT};
            font-size: 0.875rem;
            text-align: left;
            margin-top: -8px;
            margin-bottom: 0;
            display: flex;
            align-items: center;
            gap: 3px;
        `;
			const sortLabel = document.createElement("span");
			sortLabel.textContent = (0, src_core_i18n_js.t)("Sort:");
			const askButton = this.createSortButton((0, src_core_i18n_js.t)("Ask"), "ask");
			const bidButton = this.createSortButton((0, src_core_i18n_js.t)("Bid"), "bid");
			const noneButton = this.createSortButton((0, src_core_i18n_js.t)("None"), "none");
			this.controlsContainer.appendChild(sortLabel);
			this.controlsContainer.appendChild(askButton);
			this.controlsContainer.appendChild(bidButton);
			this.controlsContainer.appendChild(noneButton);
			inventoryElem.insertAdjacentElement("beforebegin", this.controlsContainer);
			this.updateButtonStates();
		}
		/**
		* Create a sort button
		* @param {string} label - Button label
		* @param {string} mode - Sort mode
		* @returns {Element} Button element
		*/
		createSortButton(label, mode) {
			const button = document.createElement("button");
			button.textContent = label;
			button.dataset.mode = mode;
			button.style.cssText = `
            border-radius: 4px;
            padding: 2px 8px;
            border: none;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s;
        `;
			button.addEventListener("click", () => {
				this.setSortMode(mode);
			});
			return button;
		}
		/**
		* Update button visual states based on current mode
		*/
		updateButtonStates() {
			if (!this.controlsContainer) return;
			this.controlsContainer.querySelectorAll("button").forEach((button) => {
				if (button.dataset.mode === this.currentMode) {
					button.style.backgroundColor = src_core_config_js.default.COLOR_ACCENT;
					button.style.color = "black";
					button.style.fontWeight = "bold";
				} else {
					button.style.backgroundColor = "#444";
					button.style.color = "#aaa";
					button.style.fontWeight = "normal";
				}
			});
		}
		/**
		* Set sort mode and apply sorting
		* @param {string} mode - Sort mode ('ask', 'bid', 'none')
		*/
		setSortMode(mode) {
			this.currentMode = mode;
			this.saveSettings();
			this.updateButtonStates();
			inventoryBadgeManager.clearProcessedTracking();
			document.querySelectorAll(".mwi-stack-price").forEach((badge) => badge.remove());
			this.modeChangeListeners.forEach((fn) => fn(mode));
			this.applyCurrentSort();
		}
		/**
		* Register a callback to be called when sort mode changes.
		* Returns an unregister function.
		* @param {Function} fn
		* @returns {Function}
		*/
		onModeChange(fn) {
			this.modeChangeListeners.push(fn);
			return () => {
				this.modeChangeListeners = this.modeChangeListeners.filter((f) => f !== fn);
			};
		}
		/**
		* Apply current sort mode to inventory
		*/
		async applyCurrentSort() {
			if (!this.currentInventoryElem) return;
			if (this.isCalculating) return;
			this.isCalculating = true;
			const inventoryElem = this.currentInventoryElem;
			await inventoryBadgeManager.renderAllBadges();
			if (inventoryElem.classList.contains("toolasha-ct-active")) {
				this.isCalculating = false;
				return;
			}
			for (const categoryDiv of inventoryElem.children) {
				const categoryButton = categoryDiv.querySelector("[class*=\"Inventory_categoryButton\"]");
				if (!categoryButton) continue;
				const categoryName = categoryButton.textContent.trim();
				const shouldSort = categoryName === "Loots" ? false : categoryName === "Equipment" ? src_core_config_js.default.getSetting("invSort_sortEquipment") : true;
				const label = categoryDiv.querySelector("[class*=\"Inventory_label\"]");
				if (label) label.style.order = Number.MIN_SAFE_INTEGER;
				const itemElems = categoryDiv.querySelectorAll("[class*=\"Item_itemContainer\"]");
				if (shouldSort && this.currentMode !== "none") this.sortItemsByPrice(itemElems, this.currentMode);
				else itemElems.forEach((itemElem) => {
					itemElem.style.order = 0;
				});
			}
			this.isCalculating = false;
		}
		/**
		* Sort items by price (ask or bid)
		* @param {NodeList} itemElems - Item elements
		* @param {string} mode - 'ask' or 'bid'
		*/
		sortItemsByPrice(itemElems, mode) {
			const items = Array.from(itemElems).map((elem) => ({
				elem,
				value: parseFloat(elem.dataset[mode + "Value"]) || 0
			}));
			items.sort((a, b) => b.value - a.value);
			items.forEach((item, index) => {
				item.elem.style.order = index;
			});
		}
		/**
		* Render stack price badge for a single item (called by badge manager)
		* @param {Element} itemElem - Item container element
		*/
		renderBadgesForItem(itemElem) {
			let showBadges = false;
			let badgeValueKey = null;
			if (this.currentMode === "none") {
				const badgesOnNone = src_core_config_js.default.getSettingValue("invSort_badgesOnNone", "None");
				if (badgesOnNone !== "None") {
					showBadges = true;
					badgeValueKey = badgesOnNone.toLowerCase() + "Value";
				}
			} else if (src_core_config_js.default.getSetting("invSort_showBadges")) {
				showBadges = true;
				badgeValueKey = this.currentMode + "Value";
			}
			if (showBadges && badgeValueKey) {
				const stackValue = parseFloat(itemElem.dataset[badgeValueKey]) || 0;
				const existingBadge = itemElem.querySelector(".mwi-stack-price");
				if (stackValue > 0) if (existingBadge) existingBadge.textContent = (0, src_utils_formatters_js.formatKMB)(stackValue, 0);
				else this.renderPriceBadge(itemElem, stackValue);
				else if (existingBadge) existingBadge.remove();
			}
		}
		/**
		* Update price badges on all items (legacy method - now delegates to manager)
		*/
		updatePriceBadges() {
			inventoryBadgeManager.renderAllBadges();
		}
		/**
		* Render price badge on item
		* @param {Element} itemElem - Item container element
		* @param {number} stackValue - Total stack value
		*/
		renderPriceBadge(itemElem, stackValue) {
			itemElem.style.position = "relative";
			const badge = document.createElement("div");
			badge.className = "mwi-stack-price";
			badge.style.cssText = `
            position: absolute;
            top: 2px;
            right: 2px;
            z-index: 1;
            color: ${src_core_config_js.default.COLOR_ACCENT};
            font-size: 0.7rem;
            font-weight: bold;
            text-align: right;
            pointer-events: none;
            text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px #000;
        `;
			badge.textContent = (0, src_utils_formatters_js.formatKMB)(stackValue, 2);
			const itemInner = itemElem.querySelector("[class*=\"Item_item\"]");
			if (itemInner) itemInner.appendChild(badge);
		}
		/**
		* Refresh badges (called when badge setting changes)
		*/
		refresh() {
			if (this.controlsContainer) this.controlsContainer.style.color = src_core_config_js.default.COLOR_ACCENT;
			this.updateButtonStates();
			document.querySelectorAll(".mwi-stack-price").forEach((badge) => {
				badge.style.color = src_core_config_js.default.COLOR_ACCENT;
			});
		}
		/**
		* Disable and cleanup
		*/
		disable() {
			clearTimeout(this.itemsUpdatedDebounceTimer);
			this.itemsUpdatedDebounceTimer = null;
			clearTimeout(this.priceUpdateDebounceTimer);
			this.priceUpdateDebounceTimer = null;
			if (this.itemsUpdatedHandler) {
				src_core_data_manager_js.default.off("items_updated", this.itemsUpdatedHandler);
				this.itemsUpdatedHandler = null;
			}
			if (this.priceUpdateHandler) {
				src_api_marketplace_js.default.off(this.priceUpdateHandler);
				this.priceUpdateHandler = null;
			}
			this.timerRegistry.clearAll();
			inventoryBadgeManager.unregisterProvider("inventory-stack-price");
			if (this.controlsContainer) {
				this.controlsContainer.remove();
				this.controlsContainer = null;
			}
			document.querySelectorAll(".mwi-stack-price").forEach((badge) => badge.remove());
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			this.warnedItems.clear();
			this.currentInventoryElem = null;
			this.isInitialized = false;
		}
	};
	var inventorySort = new InventorySort();
	inventorySort.setupSettingListener();
	//#endregion
	//#region src/features/inventory/inventory-badge-prices.js
	/**
	* Inventory Badge Prices Module
	* Shows ask/bid price badges on inventory item icons
	* Works independently of inventory sorting feature
	*/
	/**
	* InventoryBadgePrices class manages price badge overlays on inventory items
	*/
	var InventoryBadgePrices = class {
		constructor() {
			this.unregisterHandlers = [];
			this.currentInventoryElem = null;
			this.warnedItems = /* @__PURE__ */ new Set();
			this.isCalculating = false;
			this.isInitialized = false;
			this.itemsUpdatedHandler = null;
			this.itemsUpdatedDebounceTimer = null;
			this.DEBOUNCE_DELAY = 300;
			this.timerRegistry = (0, src_utils_timer_registry_js.createTimerRegistry)();
		}
		/**
		* Setup setting change listener (always active, even when feature is disabled)
		*/
		setupSettingListener() {
			src_core_config_js.default.onSettingChange("invBadgePrices", (enabled) => {
				if (enabled) this.initialize();
				else this.disable();
			});
			src_core_config_js.default.onSettingChange("color_invBadge_bid", () => {
				if (this.isInitialized) this.refresh();
			});
			src_core_config_js.default.onSettingChange("color_invBadge_ask", () => {
				if (this.isInitialized) this.refresh();
			});
		}
		/**
		* Initialize badge prices feature
		*/
		initialize() {
			if (!src_core_config_js.default.getSetting("invBadgePrices")) return;
			if (this.isInitialized) return;
			this.isInitialized = true;
			const existingInv = document.querySelector("[class*=\"Inventory_items\"]");
			if (existingInv) {
				this.currentInventoryElem = existingInv;
				this.updateBadges();
			}
			const unregister = src_core_dom_observer_js.default.onClass("InventoryBadgePrices", "Inventory_items", (elem) => {
				this.currentInventoryElem = elem;
				this.updateBadges();
			});
			this.unregisterHandlers.push(unregister);
			inventoryBadgeManager.registerProvider("inventory-badge-prices", (itemElem) => this.renderBadgesForItem(itemElem), 100);
			this.itemsUpdatedHandler = () => {
				clearTimeout(this.itemsUpdatedDebounceTimer);
				this.itemsUpdatedDebounceTimer = setTimeout(() => {
					if (this.currentInventoryElem) {
						inventoryBadgeManager.invalidateCache();
						this.updateBadges();
					}
				}, this.DEBOUNCE_DELAY);
			};
			src_core_data_manager_js.default.on("items_updated", this.itemsUpdatedHandler);
			this.setupMarketDataListener();
		}
		/**
		* Setup listener for market data updates
		*/
		setupMarketDataListener() {
			if (!src_api_marketplace_js.default.isLoaded()) {
				let retryCount = 0;
				const maxRetries = 10;
				const retryCheck = setInterval(() => {
					retryCount++;
					if (src_api_marketplace_js.default.isLoaded()) {
						clearInterval(retryCheck);
						if (this.currentInventoryElem) this.updateBadges();
					} else if (retryCount >= maxRetries) {
						console.warn("[InventoryBadgePrices] Market data still not available after", maxRetries, "retries");
						clearInterval(retryCheck);
					}
				}, 500);
				this.timerRegistry.registerInterval(retryCheck);
			}
		}
		/**
		* Update all price badges (delegates to badge manager)
		* Skips rendering if InventorySort is active (it already handles badge rendering)
		*/
		async updateBadges() {
			if (inventorySort.isInitialized && src_core_config_js.default.getSetting("invSort")) return;
			await inventoryBadgeManager.renderAllBadges();
		}
		/**
		* Render price badges for a single item (called by badge manager)
		* @param {Element} itemElem - Item container element
		*/
		renderBadgesForItem(itemElem) {
			const bidPrice = parseFloat(itemElem.dataset.bidPrice) || 0;
			const askPrice = parseFloat(itemElem.dataset.askPrice) || 0;
			const existingBid = itemElem.querySelector(".mwi-badge-price-bid");
			if (bidPrice > 0) if (existingBid) existingBid.textContent = (0, src_utils_formatters_js.formatKMB)(Math.round(bidPrice), 0);
			else this.renderPriceBadge(itemElem, bidPrice, "bid");
			else if (existingBid) existingBid.remove();
			const existingAsk = itemElem.querySelector(".mwi-badge-price-ask");
			if (askPrice > 0) if (existingAsk) existingAsk.textContent = (0, src_utils_formatters_js.formatKMB)(Math.round(askPrice), 0);
			else this.renderPriceBadge(itemElem, askPrice, "ask");
			else if (existingAsk) existingAsk.remove();
		}
		/**
		* Render all badges (legacy method - now delegates to manager)
		*/
		renderBadges() {
			inventoryBadgeManager.renderAllBadges();
		}
		/**
		* Render price badge on item
		* @param {Element} itemElem - Item container element
		* @param {number} price - Per-item price
		* @param {string} type - 'bid' or 'ask'
		*/
		renderPriceBadge(itemElem, price, type) {
			itemElem.style.position = "relative";
			const badge = document.createElement("div");
			badge.className = `mwi-badge-price-${type}`;
			const isAsk = type === "ask";
			const color = isAsk ? src_core_config_js.default.COLOR_INVBADGE_ASK : src_core_config_js.default.COLOR_INVBADGE_BID;
			badge.style.cssText = `
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            ${isAsk ? "left: 2px;" : "right: 2px;"}
            z-index: 1;
            color: ${color};
            font-size: 0.7rem;
            font-weight: bold;
            text-align: ${isAsk ? "left" : "right"};
            pointer-events: none;
            text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px #000;
        `;
			badge.textContent = (0, src_utils_formatters_js.formatKMB)(Math.round(price), 0);
			const itemInner = itemElem.querySelector("[class*=\"Item_item\"]");
			if (itemInner) itemInner.appendChild(badge);
		}
		/**
		* Refresh badges (called when settings change)
		*/
		refresh() {
			inventoryBadgeManager.clearProcessedTracking();
			document.querySelectorAll(".mwi-badge-price-bid, .mwi-badge-price-ask").forEach((badge) => badge.remove());
			this.updateBadges();
		}
		/**
		* Disable and cleanup
		*/
		disable() {
			clearTimeout(this.itemsUpdatedDebounceTimer);
			this.itemsUpdatedDebounceTimer = null;
			if (this.itemsUpdatedHandler) {
				src_core_data_manager_js.default.off("items_updated", this.itemsUpdatedHandler);
				this.itemsUpdatedHandler = null;
			}
			inventoryBadgeManager.unregisterProvider("inventory-badge-prices");
			document.querySelectorAll(".mwi-badge-price-bid, .mwi-badge-price-ask").forEach((badge) => badge.remove());
			this.unregisterHandlers.forEach((unregister) => unregister());
			this.unregisterHandlers = [];
			this.timerRegistry.clearAll();
			this.currentInventoryElem = null;
			this.isInitialized = false;
		}
	};
	var inventoryBadgePrices = new InventoryBadgePrices();
	inventoryBadgePrices.setupSettingListener();
	//#endregion
	//#region src/features/inventory/dungeon-token-tooltips.js
	/**
	* Currency Token Shop Tooltips
	* Adds shop item lists and valuations to currency token tooltips with market pricing.
	* Supports dungeon tokens, task tokens, labyrinth tokens, seals, and cowbells.
	*/
	/**
	* Token types and their shop data sources
	*/
	var DUNGEON_TOKENS = /* @__PURE__ */ new Set([
		"/items/chimerical_token",
		"/items/sinister_token",
		"/items/enchanted_token",
		"/items/pirate_token"
	]);
	var TASK_TOKEN = "/items/task_token";
	var LABYRINTH_TOKEN = "/items/labyrinth_token";
	var COWBELL = "/items/cowbell";
	var BAG_OF_COWBELLS = "/items/bag_of_10_cowbells";
	/**
	* All seal HRIDs (cost 30 labyrinth tokens each)
	*/
	var SEAL_HRIDS = /* @__PURE__ */ new Set([
		"/items/seal_of_action_speed",
		"/items/seal_of_attack_speed",
		"/items/seal_of_cast_speed",
		"/items/seal_of_combat_drop",
		"/items/seal_of_critical_rate",
		"/items/seal_of_damage",
		"/items/seal_of_efficiency",
		"/items/seal_of_gathering",
		"/items/seal_of_gourmet",
		"/items/seal_of_processing",
		"/items/seal_of_rare_find",
		"/items/seal_of_wisdom"
	]);
	var SEAL_TOKEN_COST = 30;
	/**
	* DungeonTokenTooltips class handles injecting shop item lists into currency token tooltips
	*/
	var DungeonTokenTooltips = class {
		constructor() {
			this.unregisterObserver = null;
			this.isActive = false;
			this.isInitialized = false;
			this.itemNameToHridCache = null;
			this.itemNameToHridCacheSource = null;
		}
		/**
		* Initialize the dungeon token tooltips feature
		*/
		async initialize() {
			if (this.isInitialized) return;
			if (!src_core_config_js.default.isFeatureEnabled("dungeonTokenTooltips")) return;
			this.isInitialized = true;
			this.setupObserver();
		}
		/**
		* Set up observer to watch for tooltip elements
		*/
		setupObserver() {
			this.unregisterObserver = src_core_dom_observer_js.default.onClass("DungeonTokenTooltips", "MuiTooltip-popper", (tooltipElement) => {
				this.handleTooltip(tooltipElement);
			});
			this.isActive = true;
		}
		/**
		* Handle a tooltip element
		* @param {Element} tooltipElement - The tooltip popper element
		*/
		async handleTooltip(tooltipElement) {
			if (!src_core_config_js.default.isFeatureEnabled("dungeonTokenTooltips")) return;
			if (tooltipElement.dataset.dungeonProcessed) return;
			tooltipElement.dataset.dungeonProcessed = "true";
			const isCollectionTooltip = !!tooltipElement.querySelector("div.Collection_tooltipContent__2IcSJ");
			const nameElement = tooltipElement.querySelector("div.ItemTooltipText_name__2JAHA");
			if (!isCollectionTooltip && !!!nameElement) return;
			let itemName;
			if (isCollectionTooltip) {
				const collectionNameElement = tooltipElement.querySelector("div.Collection_name__10aep");
				if (!collectionNameElement) return;
				itemName = collectionNameElement.textContent.trim();
			} else itemName = nameElement.textContent.trim();
			const itemHrid = this.extractItemHridFromName(itemName);
			if (!itemHrid) return;
			if (DUNGEON_TOKENS.has(itemHrid)) this._handleDungeonToken(tooltipElement, itemHrid, isCollectionTooltip);
			else if (itemHrid === TASK_TOKEN) this._handleTaskToken(tooltipElement, isCollectionTooltip);
			else if (itemHrid === LABYRINTH_TOKEN) this._handleLabyrinthToken(tooltipElement, isCollectionTooltip);
			else if (SEAL_HRIDS.has(itemHrid)) this._handleSeal(tooltipElement, isCollectionTooltip);
			else if (itemHrid === COWBELL) this._handleCowbell(tooltipElement, isCollectionTooltip);
		}
		/**
		* Handle dungeon token tooltip — shop table from shopItemDetailMap
		*/
		_handleDungeonToken(tooltipElement, tokenHrid, isCollectionTooltip) {
			const shopItems = this._getDungeonShopItems(tokenHrid);
			if (!shopItems || shopItems.length === 0) return;
			this._injectShopTable(tooltipElement, shopItems, (0, src_core_i18n_js.t)("Token Shop Value:"), (0, src_core_i18n_js.t)("Gold/Token"), isCollectionTooltip);
			src_utils_dom_js.default.fixTooltipOverflow(tooltipElement);
		}
		/**
		* Handle task token tooltip — shop table from taskShopItemDetailMap
		* Uses expected value for openable chests
		*/
		_handleTaskToken(tooltipElement, isCollectionTooltip) {
			const shopItems = this._getTaskShopItems();
			if (!shopItems || shopItems.length === 0) return;
			this._injectShopTable(tooltipElement, shopItems, (0, src_core_i18n_js.t)("Task Shop Value:"), (0, src_core_i18n_js.t)("Gold/Token"), isCollectionTooltip);
			src_utils_dom_js.default.fixTooltipOverflow(tooltipElement);
		}
		/**
		* Handle labyrinth token tooltip — shop table from labyrinthShopItemDetailMap
		*/
		_handleLabyrinthToken(tooltipElement, isCollectionTooltip) {
			const shopItems = this._getLabyrinthShopItems();
			if (!shopItems || shopItems.length === 0) return;
			this._injectShopTable(tooltipElement, shopItems, (0, src_core_i18n_js.t)("Labyrinth Shop Value:"), (0, src_core_i18n_js.t)("Gold/Token"), isCollectionTooltip);
			src_utils_dom_js.default.fixTooltipOverflow(tooltipElement);
		}
		/**
		* Handle seal tooltip — show value based on labyrinth token cost
		*/
		_handleSeal(tooltipElement, isCollectionTooltip) {
			const labyrinthItems = this._getLabyrinthShopItems();
			if (!labyrinthItems || labyrinthItems.length === 0) return;
			const bestGoldPerToken = labyrinthItems[0].goldPerToken;
			const sealValue = Math.floor(SEAL_TOKEN_COST * bestGoldPerToken);
			if (sealValue <= 0) return;
			this._injectSimpleValue(tooltipElement, `Value: ${(0, src_utils_formatters_js.formatKMB)(sealValue)} gold`, `= ${SEAL_TOKEN_COST} Labyrinth Tokens × ${(0, src_utils_formatters_js.formatKMB)(Math.floor(bestGoldPerToken))} gold/token`, isCollectionTooltip);
			src_utils_dom_js.default.fixTooltipOverflow(tooltipElement);
		}
		/**
		* Handle cowbell tooltip — show value based on bag of 10 cowbells market price
		*/
		_handleCowbell(tooltipElement, isCollectionTooltip) {
			const prices = (0, src_utils_market_data_js.getItemPrices)(BAG_OF_COWBELLS, 0);
			const bagPrice = prices?.ask > 0 ? prices.ask : prices?.bid > 0 ? prices.bid : 0;
			if (bagPrice <= 0) return;
			const cowbellValue = Math.floor(bagPrice / 10);
			this._injectSimpleValue(tooltipElement, `Value: ${(0, src_utils_formatters_js.formatKMB)(cowbellValue)} gold`, `= Bag of 10 Cowbells (${(0, src_utils_formatters_js.formatKMB)(bagPrice)}) ÷ 10`, isCollectionTooltip);
			src_utils_dom_js.default.fixTooltipOverflow(tooltipElement);
		}
		/**
		* Extract item HRID from item name
		* @param {string} itemName - Item name from tooltip
		* @returns {string|null} Item HRID or null if not found
		*/
		extractItemHridFromName(itemName) {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData || !gameData.itemDetailMap) return null;
			if (this.itemNameToHridCache && this.itemNameToHridCacheSource === gameData.itemDetailMap) {
				const hrid = this.itemNameToHridCache.get(itemName);
				if (hrid) return hrid;
				return itemNameTranslator.getHridFromChineseName(itemName) || null;
			}
			const map = /* @__PURE__ */ new Map();
			for (const [hrid, item] of Object.entries(gameData.itemDetailMap)) map.set(item.name, hrid);
			if (map.size > 0) {
				this.itemNameToHridCache = map;
				this.itemNameToHridCacheSource = gameData.itemDetailMap;
			}
			const hrid = map.get(itemName);
			if (hrid) return hrid;
			return itemNameTranslator.getHridFromChineseName(itemName) || null;
		}
		/**
		* Get shop items from shopItemDetailMap (dungeon tokens)
		* @param {string} tokenHrid - Dungeon token HRID
		* @returns {Array} Shop items with pricing data
		*/
		_getDungeonShopItems(tokenHrid) {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData?.shopItemDetailMap || !gameData?.itemDetailMap) return [];
			return Object.values(gameData.shopItemDetailMap).filter((shopItem) => shopItem.costs && shopItem.costs[0]?.itemHrid === tokenHrid).map((shopItem) => {
				const itemDetails = gameData.itemDetailMap[shopItem.itemHrid];
				const tokenCost = shopItem.costs[0].count;
				const askPrice = (0, src_utils_market_data_js.getItemPrices)(shopItem.itemHrid, 0)?.ask || null;
				if (!askPrice || askPrice <= 0) return null;
				return {
					name: itemDetails?.name || (0, src_core_i18n_js.t)("Unknown Item"),
					cost: tokenCost,
					askPrice,
					goldPerToken: askPrice / tokenCost
				};
			}).filter(Boolean).sort((a, b) => b.goldPerToken - a.goldPerToken);
		}
		/**
		* Get shop items from taskShopItemDetailMap (task tokens)
		* Uses expected value for openable items, market price for tradeable items
		* @returns {Array} Shop items with pricing data
		*/
		_getTaskShopItems() {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData?.taskShopItemDetailMap || !gameData?.itemDetailMap) return [];
			return Object.values(gameData.taskShopItemDetailMap).map((shopItem) => {
				const itemDetails = gameData.itemDetailMap[shopItem.itemHrid];
				const tokenCost = shopItem.cost?.count || 0;
				if (tokenCost <= 0) return null;
				let itemValue = 0;
				let valueSource = "";
				const prices = (0, src_utils_market_data_js.getItemPrices)(shopItem.itemHrid, 0);
				if (prices?.ask > 0) {
					itemValue = prices.ask;
					valueSource = "ask";
				}
				if (itemDetails?.isOpenable) {
					const evData = expectedValueCalculator.calculateExpectedValue(shopItem.itemHrid);
					if (evData?.expectedValue > 0) {
						if (evData.expectedValue > itemValue) {
							itemValue = evData.expectedValue;
							valueSource = "EV";
						}
					}
				}
				if (itemValue <= 0) return null;
				return {
					name: itemDetails?.name || (0, src_core_i18n_js.t)("Unknown Item"),
					cost: tokenCost,
					askPrice: itemValue,
					goldPerToken: itemValue / tokenCost,
					valueSource
				};
			}).filter(Boolean).sort((a, b) => b.goldPerToken - a.goldPerToken);
		}
		/**
		* Get shop items from labyrinthShopItemDetailMap (labyrinth tokens)
		* Only includes items with market value (tradeable items)
		* Accounts for outputCount (e.g., 1 token → 10 essences)
		* @returns {Array} Shop items with pricing data
		*/
		_getLabyrinthShopItems() {
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData?.labyrinthShopItemDetailMap || !gameData?.itemDetailMap) return [];
			return Object.values(gameData.labyrinthShopItemDetailMap).map((shopItem) => {
				const itemDetails = gameData.itemDetailMap[shopItem.itemHrid];
				const tokenCost = shopItem.cost?.count || 0;
				const outputCount = shopItem.outputCount || 1;
				if (tokenCost <= 0) return null;
				const askPrice = (0, src_utils_market_data_js.getItemPrices)(shopItem.itemHrid, 0)?.ask || null;
				if (!askPrice || askPrice <= 0) return null;
				const totalValue = askPrice * outputCount;
				return {
					name: itemDetails?.name || (0, src_core_i18n_js.t)("Unknown Item"),
					cost: tokenCost,
					askPrice: totalValue,
					goldPerToken: totalValue / tokenCost,
					outputCount
				};
			}).filter(Boolean).sort((a, b) => b.goldPerToken - a.goldPerToken);
		}
		/**
		* Inject a shop table into tooltip
		* @param {Element} tooltipElement - Tooltip element
		* @param {Array} shopItems - Shop items with pricing data
		* @param {string} title - Table title
		* @param {string} efficiencyLabel - Label for the efficiency column
		* @param {boolean} isCollectionTooltip - True if collection tooltip
		*/
		_injectShopTable(tooltipElement, shopItems, title, efficiencyLabel, isCollectionTooltip = false) {
			const tooltipText = isCollectionTooltip ? tooltipElement.querySelector(".Collection_tooltipContent__2IcSJ") : tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
			if (!tooltipText || tooltipText.querySelector(".dungeon-token-shop-injected")) return;
			const shopDiv = src_utils_dom_js.default.createStyledDiv({ color: src_core_config_js.default.COLOR_TOOLTIP_INFO }, "", "dungeon-token-shop-injected");
			let html = `<div style="margin-top: 8px;"><strong>${title}</strong></div>`;
			html += "<table style=\"width: 100%; margin-top: 4px; font-size: 12px;\">";
			html += "<tr style=\"border-bottom: 1px solid #444;\">";
			html += "<th style=\"text-align: left; padding: 2px 4px;\">Item</th>";
			html += "<th style=\"text-align: right; padding: 2px 4px;\">Cost</th>";
			html += "<th style=\"text-align: right; padding: 2px 4px;\">Value</th>";
			html += `<th style="text-align: right; padding: 2px 4px;">${efficiencyLabel}</th>`;
			html += "</tr>";
			const bestGoldPerToken = shopItems[0].goldPerToken;
			for (const item of shopItems) {
				const isBestValue = item.goldPerToken === bestGoldPerToken;
				const rowStyle = isBestValue ? "background-color: rgba(4, 120, 87, 0.2);" : "";
				const fontWeight = isBestValue ? "bold" : "normal";
				const nameDisplay = item.outputCount > 1 ? `${item.name} ×${item.outputCount}` : item.name;
				const valueDisplay = item.valueSource === "EV" ? `${(0, src_utils_formatters_js.formatKMB)(item.askPrice)} <span style="color:#888; font-size:10px;">EV</span>` : (0, src_utils_formatters_js.formatKMB)(item.askPrice);
				html += `<tr style="${rowStyle}">`;
				html += `<td style="padding: 2px 4px;">${nameDisplay}</td>`;
				html += `<td style="text-align: right; padding: 2px 4px;">${(0, src_utils_formatters_js.formatKMB)(item.cost)}</td>`;
				html += `<td style="text-align: right; padding: 2px 4px;">${valueDisplay}</td>`;
				html += `<td style="text-align: right; padding: 2px 4px; font-weight: ${fontWeight};">${(0, src_utils_formatters_js.formatKMB)(Math.floor(item.goldPerToken))}</td>`;
				html += "</tr>";
			}
			html += "</table>";
			shopDiv.innerHTML = html;
			tooltipText.appendChild(shopDiv);
		}
		/**
		* Inject a simple value line into tooltip (for seals and cowbells)
		* @param {Element} tooltipElement - Tooltip element
		* @param {string} valueLine - Main value text
		* @param {string} detailLine - Detail/explanation text
		* @param {boolean} isCollectionTooltip - True if collection tooltip
		*/
		_injectSimpleValue(tooltipElement, valueLine, detailLine, isCollectionTooltip = false) {
			const tooltipText = isCollectionTooltip ? tooltipElement.querySelector(".Collection_tooltipContent__2IcSJ") : tooltipElement.querySelector(".ItemTooltipText_itemTooltipText__zFq3A");
			if (!tooltipText || tooltipText.querySelector(".dungeon-token-shop-injected")) return;
			const valueDiv = src_utils_dom_js.default.createStyledDiv({ color: src_core_config_js.default.COLOR_TOOLTIP_INFO }, "", "dungeon-token-shop-injected");
			let html = `<div style="margin-top: 8px;"><strong>${valueLine}</strong></div>`;
			html += `<div style="font-size: 11px; color: #888; margin-top: 2px;">${detailLine}</div>`;
			valueDiv.innerHTML = html;
			tooltipText.appendChild(valueDiv);
		}
		/**
		* Cleanup
		*/
		cleanup() {
			if (this.unregisterObserver) {
				this.unregisterObserver();
				this.unregisterObserver = null;
			}
			this.isActive = false;
			this.isInitialized = false;
		}
		disable() {
			this.cleanup();
		}
	};
	var dungeonTokenTooltips = new DungeonTokenTooltips();
	var dungeon_token_tooltips_default = {
		name: "Dungeon Token Tooltips",
		initialize: async () => {
			await dungeonTokenTooltips.initialize();
		},
		cleanup: () => {
			dungeonTokenTooltips.cleanup();
		},
		disable: () => {
			dungeonTokenTooltips.disable();
		}
	};
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
	//#region src/features/inventory/auto-all-button.js
	/**
	* Auto All Button Feature
	* Automatically clicks the "All" button when opening loot boxes/containers
	*/
	var AutoAllButton = class {
		constructor() {
			this.processedContainers = /* @__PURE__ */ new WeakSet();
			this.itemNameToHridCache = null;
		}
		/**
		* Initialize the feature
		*/
		initialize() {
			if (!src_core_config_js.default.getSetting("autoAllButton")) return;
			tooltipObserver.subscribe("auto-all-button", (element, eventType) => {
				if (eventType === "opened") this.handleContainer(element);
			});
		}
		/**
		* Handle container appearance (tooltip/popper)
		* @param {Element} container - Container element
		*/
		handleContainer(container) {
			if (this.processedContainers.has(container)) return;
			this.processedContainers.add(container);
			setTimeout(() => {
				try {
					this.processContainer(container);
				} catch (error) {
					console.error("[AutoAllButton] Error processing container:", error);
				}
			}, 50);
		}
		/**
		* Process the container - check if it's for a loot box and click All button
		* @param {Element} container - Container element
		*/
		processContainer(container) {
			let itemName = null;
			const nameSpan = container.querySelector("[class*=\"Item_name\"]");
			if (nameSpan) itemName = nameSpan.textContent.trim();
			if (!itemName) {
				const svg = container.querySelector("svg[aria-label]");
				if (svg) itemName = svg.getAttribute("aria-label");
			}
			if (!itemName) return;
			const gameData = src_core_data_manager_js.default.getInitClientData();
			if (!gameData || !gameData.itemDetailMap) return;
			const itemHrid = this.findItemHrid(itemName, gameData);
			if (!itemHrid) return;
			const itemDetails = gameData.itemDetailMap[itemHrid];
			const isOpenable = itemDetails?.isOpenable;
			const isAbilityBook = itemDetails?.categoryHrid === "/item_categories/ability_book";
			if (!itemDetails || !isOpenable && !isAbilityBook) return;
			if (src_core_config_js.default.getSetting("autoAllButton_excludeSeals") && itemHrid.startsWith("/items/seal_of_")) return;
			this.clickAllButton(container);
		}
		/**
		* Find and click the "All" button in the container
		* @param {Element} container - Container element
		*/
		clickAllButton(container) {
			const buttons = container.querySelectorAll("button");
			for (const button of buttons) if (button.matches("[class*=\"Button_all\"]") && !button.disabled) {
				button.click();
				break;
			}
		}
		/**
		* Find item HRID by name
		* @param {string} itemName - Item name
		* @param {Object} gameData - Game data
		* @returns {string|null} Item HRID or null if not found
		*/
		findItemHrid(itemName, gameData) {
			if (!this.itemNameToHridCache) {
				this.itemNameToHridCache = /* @__PURE__ */ new Map();
				for (const [hrid, item] of Object.entries(gameData.itemDetailMap)) if (item.name) this.itemNameToHridCache.set(item.name, hrid);
			}
			return this.itemNameToHridCache.get(itemName) || null;
		}
		/**
		* Disable the feature
		*/
		disable() {
			tooltipObserver.unsubscribe("auto-all-button");
			this.processedContainers = /* @__PURE__ */ new WeakSet();
			this.itemNameToHridCache = null;
		}
	};
	var autoAllButton = new AutoAllButton();
	var auto_all_button_default = {
		name: "Auto All Button",
		initialize: () => autoAllButton.initialize(),
		cleanup: () => autoAllButton.disable()
	};
	//#endregion
	//#region src/features/inventory/inventory-category-totals.js
	/**
	* Inventory Category Totals
	*
	* Appends the total market value of all item stacks in each inventory category
	* to the category label (e.g. "Equipment  3.2M", "Food  480K").
	*
	* Registers as a badge provider at priority 200 so it runs after the badge manager
	* has already populated dataset.askValue / dataset.bidValue on every item element.
	*/
	var CSS_ID = "mwi-inv-category-totals";
	var SPAN_ATTR = "data-mwi-category-total";
	var CSS = `
.mwi-category-total {
    margin-left: 8px;
    font-size: 10pt;
    font-weight: bold;
    opacity: 0.8;
}
`;
	var InventoryCategoryTotals = class {
		constructor() {
			this.isInitialized = false;
			this.pendingUpdate = false;
		}
		initialize() {
			if (!src_core_config_js.default.getSetting("invCategoryTotals")) return;
			if (this.isInitialized) return;
			this.isInitialized = true;
			src_utils_dom_js.addStyles(CSS, CSS_ID);
			inventoryBadgeManager.registerProvider("inventory-category-totals", () => this.scheduleUpdate(), 200);
			inventoryBadgeManager.clearProcessedTracking();
		}
		disable() {
			if (!this.isInitialized) return;
			inventoryBadgeManager.unregisterProvider("inventory-category-totals");
			document.querySelectorAll(`.mwi-category-total`).forEach((el) => el.remove());
			src_utils_dom_js.removeStyles(CSS_ID);
			this.isInitialized = false;
			this.pendingUpdate = false;
		}
		scheduleUpdate() {
			if (this.pendingUpdate) return;
			this.pendingUpdate = true;
			setTimeout(() => {
				this.pendingUpdate = false;
				this.updateAllCategoryTotals();
			}, 0);
		}
		updateAllCategoryTotals() {
			const inventoryElem = inventoryBadgeManager.currentInventoryElem;
			if (!inventoryElem) return;
			let valueKey;
			if (inventorySort.currentMode === "none") {
				const badgesOnNone = src_core_config_js.default.getSettingValue("invSort_badgesOnNone", "None");
				valueKey = badgesOnNone !== "None" ? badgesOnNone.toLowerCase() + "Value" : "askValue";
			} else valueKey = inventorySort.currentMode + "Value";
			for (const categoryDiv of inventoryElem.children) {
				const labelEl = categoryDiv.querySelector("[class*=\"Inventory_label\"]");
				if (!labelEl) continue;
				const existingSpan = labelEl.querySelector(`[${SPAN_ATTR}]`);
				if ((existingSpan ? labelEl.textContent.replace(existingSpan.textContent, "").trim() : labelEl.textContent.trim()).toLowerCase() === "currencies") continue;
				const itemContainers = categoryDiv.querySelectorAll("[class*=\"Item_itemContainer\"]");
				let total = 0;
				for (const itemEl of itemContainers) {
					const val = parseFloat(itemEl.dataset[valueKey]);
					if (val > 0) total += val;
				}
				this.injectOrUpdateLabel(labelEl, total);
			}
		}
		/**
		* @param {HTMLElement} labelEl
		* @param {number} total
		*/
		injectOrUpdateLabel(labelEl, total) {
			let span = labelEl.querySelector(`[${SPAN_ATTR}]`);
			if (total <= 0) {
				if (span) span.remove();
				return;
			}
			if (!span) {
				span = document.createElement("span");
				span.className = "mwi-category-total";
				span.setAttribute(SPAN_ATTR, "true");
				labelEl.appendChild(span);
			}
			span.textContent = (0, src_utils_formatters_js.formatKMB)(total);
		}
	};
	var inventoryCategoryTotals = new InventoryCategoryTotals();
	//#endregion
	//#region src/features/inventory/custom-tabs/custom-tabs-data.js
	/**
	* Custom Inventory Tabs — Data Module
	* Manages tab configuration storage and CRUD operations.
	* All mutating helpers return new objects (never mutate in place).
	*/
	var STORAGE_KEY = "inventoryTabs_config";
	var STORE = "settings";
	var CONFIG_VERSION = 1;
	var LINEBREAK_HRID = "__linebreak__";
	/**
	* Generate a unique ID
	* @returns {string}
	*/
	function makeId() {
		if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = Math.random() * 16 | 0;
			return (c === "x" ? r : r & 3 | 8).toString(16);
		});
	}
	/**
	* Build the character-scoped storage key
	* @param {string} characterId
	* @returns {string}
	*/
	function getStorageKey(characterId) {
		return `${characterId}_${STORAGE_KEY}`;
	}
	/**
	* Return a blank config
	* @returns {Object}
	*/
	function defaultConfig() {
		return {
			version: CONFIG_VERSION,
			tabs: [],
			selectedTabId: null
		};
	}
	/**
	* Load the tab config for a character
	* @param {string} characterId
	* @returns {Promise<Object>} { version, tabs, selectedTabId }
	*/
	async function loadConfig(characterId) {
		if (!characterId) return defaultConfig();
		const saved = await src_core_storage_js.default.getJSON(getStorageKey(characterId), STORE, null);
		if (!saved || !Array.isArray(saved.tabs)) return defaultConfig();
		return {
			...defaultConfig(),
			...saved
		};
	}
	/**
	* Persist the tab config for a character
	* @param {string} characterId
	* @param {Object} config
	*/
	async function saveConfig(characterId, config) {
		if (!characterId) return;
		await src_core_storage_js.default.setJSON(getStorageKey(characterId), config, STORE);
	}
	function clone(obj) {
		if (typeof structuredClone === "function") return structuredClone(obj);
		return JSON.parse(JSON.stringify(obj));
	}
	/**
	* Add a tab (at root level or inside a parent)
	* @param {Object} config
	* @param {string|null} parentId - null for root level
	* @param {string} name
	* @returns {Object} { config, tabId }
	*/
	function addTab(config, parentId, name) {
		const c = clone(config);
		const tab = {
			id: makeId(),
			name,
			color: null,
			open: false,
			items: [],
			children: []
		};
		if (!parentId) c.tabs.push(tab);
		else {
			const result = _findNode(c.tabs, parentId);
			if (result) {
				result.tab.children.push(tab);
				result.tab.open = true;
			} else c.tabs.push(tab);
		}
		return {
			config: c,
			tabId: tab.id
		};
	}
	/**
	* Remove a tab (and all its descendants)
	* @param {Object} config
	* @param {string} tabId
	* @returns {Object} new config
	*/
	function removeTab(config, tabId) {
		const c = clone(config);
		_removeFromArray(c.tabs, tabId);
		if (c.selectedTabId === tabId) c.selectedTabId = null;
		return c;
	}
	/**
	* Rename a tab
	* @param {Object} config
	* @param {string} tabId
	* @param {string} name
	* @returns {Object} new config
	*/
	function renameTab(config, tabId, name) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (result) result.tab.name = name;
		return c;
	}
	/**
	* Set a tab's accent color
	* @param {Object} config
	* @param {string} tabId
	* @param {string|null} color
	* @returns {Object} new config
	*/
	function setTabColor(config, tabId, color) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (result) result.tab.color = color;
		return c;
	}
	/**
	* Move a tab to a new position within its parent's children (or root)
	* @param {Object} config
	* @param {string} tabId
	* @param {number} newIndex - target index in the parent's children array
	* @returns {Object} new config
	*/
	function moveTab(config, tabId, newIndex) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (!result) return c;
		const arr = result.parent ? result.parent.children : c.tabs;
		const oldIndex = arr.findIndex((t) => t.id === tabId);
		if (oldIndex === -1) return c;
		const [removed] = arr.splice(oldIndex, 1);
		const clampedIndex = Math.max(0, Math.min(newIndex, arr.length));
		arr.splice(clampedIndex, 0, removed);
		return c;
	}
	/**
	* Add an item to a tab (no-op if already present)
	* @param {Object} config
	* @param {string} tabId
	* @param {string} itemHrid
	* @returns {Object} new config
	*/
	function addItem(config, tabId, itemHrid) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (result && !result.tab.items.includes(itemHrid)) result.tab.items.push(itemHrid);
		return c;
	}
	/**
	* Move an item from one tab to another (atomic remove + insert)
	* @param {Object} config
	* @param {string} sourceTabId - Tab to remove from
	* @param {string} targetTabId - Tab to insert into
	* @param {string} itemHrid
	* @param {number} [insertIndex] - Position in target tab (appends if omitted)
	* @returns {Object} new config
	*/
	function moveItem(config, sourceTabId, targetTabId, itemHrid, insertIndex) {
		if (sourceTabId === targetTabId) return config;
		const c = clone(config);
		const source = _findNode(c.tabs, sourceTabId);
		if (source) source.tab.items = source.tab.items.filter((h) => h !== itemHrid);
		const target = _findNode(c.tabs, targetTabId);
		if (target && !target.tab.items.includes(itemHrid)) if (insertIndex !== void 0) {
			const clamped = Math.max(0, Math.min(insertIndex, target.tab.items.length));
			target.tab.items.splice(clamped, 0, itemHrid);
		} else target.tab.items.push(itemHrid);
		return c;
	}
	/**
	* Append a line break sentinel to a tab's items array.
	* Multiple line breaks are allowed, so no duplicate check is performed.
	* @param {Object} config
	* @param {string} tabId
	* @returns {Object} new config
	*/
	function addLineBreak(config, tabId) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (result) result.tab.items.push(LINEBREAK_HRID);
		return c;
	}
	/**
	* Reorder an item within a tab's items array
	* @param {Object} config
	* @param {string} tabId
	* @param {number} fromIndex
	* @param {number} toIndex
	* @returns {Object} new config
	*/
	function reorderItem(config, tabId, fromIndex, toIndex) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (!result) return c;
		const items = result.tab.items;
		if (fromIndex < 0 || fromIndex >= items.length) return c;
		const clamped = Math.max(0, Math.min(toIndex, items.length - 1));
		const [removed] = items.splice(fromIndex, 1);
		items.splice(clamped, 0, removed);
		return c;
	}
	/**
	* Remove an item from a tab
	* @param {Object} config
	* @param {string} tabId
	* @param {string} itemHrid
	* @returns {Object} new config
	*/
	function removeItem(config, tabId, itemHrid) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (result) result.tab.items = result.tab.items.filter((h) => h !== itemHrid);
		return c;
	}
	/**
	* Remove a single item at a specific index from a tab.
	* Preferred over removeItem when duplicates may exist (e.g. line breaks).
	* @param {Object} config
	* @param {string} tabId
	* @param {number} index
	* @returns {Object} new config
	*/
	function removeItemAtIndex(config, tabId, index) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (result && index >= 0 && index < result.tab.items.length) result.tab.items.splice(index, 1);
		return c;
	}
	/**
	* Toggle a tree node open/closed
	* @param {Object} config
	* @param {string} tabId
	* @param {boolean} open
	* @returns {Object} new config
	*/
	function setTabOpen(config, tabId, open) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (result) result.tab.open = open;
		return c;
	}
	/**
	* Set the open state on every tab in the tree (including nested children).
	* @param {Object} config
	* @param {boolean} open
	* @returns {Object} new config
	*/
	function setAllTabsOpen(config, open) {
		const c = clone(config);
		const walk = (tabs) => {
			for (const tab of tabs) {
				tab.open = open;
				if (tab.children?.length) walk(tab.children);
			}
		};
		walk(c.tabs);
		return c;
	}
	/**
	* Depth-first search for a tab by ID
	* @param {Object} config
	* @param {string} tabId
	* @returns {{ tab: Object, parent: Object|null } | null}
	*/
	function findTab(config, tabId) {
		return _findNode(config.tabs, tabId);
	}
	/**
	* Collect all assigned itemHrids across every tab
	* @param {Object} config
	* @returns {Set<string>}
	*/
	function getAssignedItemSet(config) {
		const set = /* @__PURE__ */ new Set();
		_walkTabs(config.tabs, (tab) => {
			for (const hrid of tab.items) if (hrid !== "__linebreak__") set.add(hrid);
		});
		return set;
	}
	/**
	* Strip the +N enhancement suffix from an HRID to get the base item
	* @param {string} hrid - e.g. "/items/sword+3"
	* @returns {string} e.g. "/items/sword"
	*/
	function getBaseHrid(hrid) {
		const plusIdx = hrid.lastIndexOf("+");
		if (plusIdx === -1) return hrid;
		const suffix = hrid.substring(plusIdx + 1);
		return /^\d+$/.test(suffix) ? hrid.substring(0, plusIdx) : hrid;
	}
	/**
	* Record which items were added from a loadout
	* @param {Object} config
	* @param {string} tabId
	* @param {string} loadoutName
	* @param {string[]} items - HRIDs added from this loadout
	* @returns {Object} new config
	*/
	function addLoadoutBinding(config, tabId, loadoutName, items) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (!result) return c;
		if (!result.tab.loadoutBindings) result.tab.loadoutBindings = {};
		const existing = result.tab.loadoutBindings[loadoutName] || [];
		const merged = new Set(existing);
		for (const h of items) merged.add(h);
		result.tab.loadoutBindings[loadoutName] = [...merged];
		return c;
	}
	/**
	* Remove a specific item from all loadout bindings in a tab
	* Called when the user manually removes an item via the UI
	* @param {Object} config
	* @param {string} tabId
	* @param {string} itemHrid
	* @returns {Object} new config
	*/
	function removeItemFromBindings(config, tabId, itemHrid) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (!result || !result.tab.loadoutBindings) return c;
		for (const [name, items] of Object.entries(result.tab.loadoutBindings)) {
			result.tab.loadoutBindings[name] = items.filter((h) => h !== itemHrid);
			if (result.tab.loadoutBindings[name].length === 0) delete result.tab.loadoutBindings[name];
		}
		return c;
	}
	/**
	* Sync a tab's loadout binding against a new snapshot.
	* Matches items by base HRID to detect enhancement level changes.
	* @param {Object} config
	* @param {string} tabId
	* @param {string} loadoutName
	* @param {string[]} newSnapshotItems - Current items from the loadout snapshot
	* @returns {{ config: Object, changed: boolean }}
	*/
	function syncLoadoutBinding(config, tabId, loadoutName, newSnapshotItems) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (!result || !result.tab.loadoutBindings?.[loadoutName]) return {
			config: c,
			changed: false
		};
		const tab = result.tab;
		const oldBound = tab.loadoutBindings[loadoutName];
		const oldByBase = new Map(oldBound.map((h) => [getBaseHrid(h), h]));
		const newByBase = new Map(newSnapshotItems.map((h) => [getBaseHrid(h), h]));
		let changed = false;
		for (const [base, newHrid] of newByBase) {
			const oldHrid = oldByBase.get(base);
			if (oldHrid && oldHrid !== newHrid) {
				const idx = tab.items.indexOf(oldHrid);
				if (idx !== -1) {
					tab.items[idx] = newHrid;
					changed = true;
				}
			}
		}
		for (const [base, oldHrid] of oldByBase) if (!newByBase.has(base)) {
			tab.items = tab.items.filter((h) => h !== oldHrid);
			changed = true;
		}
		for (const [base, newHrid] of newByBase) if (!oldByBase.has(base) && !tab.items.includes(newHrid)) {
			tab.items.push(newHrid);
			changed = true;
		}
		tab.loadoutBindings[loadoutName] = [...newSnapshotItems];
		return {
			config: c,
			changed
		};
	}
	/**
	* Remove orphaned bindings (loadout no longer exists) and their exclusive items.
	* Items that appear in other remaining bindings are preserved.
	* @param {Object} config
	* @param {string} tabId
	* @param {Set<string>} currentSnapshotNames - Set of loadout names that currently exist
	* @returns {{ config: Object, changed: boolean }}
	*/
	function cleanOrphanedBindings(config, tabId, currentSnapshotNames) {
		const c = clone(config);
		const result = _findNode(c.tabs, tabId);
		if (!result || !result.tab.loadoutBindings) return {
			config: c,
			changed: false
		};
		const tab = result.tab;
		const orphanedNames = Object.keys(tab.loadoutBindings).filter((n) => !currentSnapshotNames.has(n));
		if (orphanedNames.length === 0) return {
			config: c,
			changed: false
		};
		const stillBound = /* @__PURE__ */ new Set();
		for (const [name, items] of Object.entries(tab.loadoutBindings)) if (!orphanedNames.includes(name)) items.forEach((h) => stillBound.add(h));
		for (const orphanName of orphanedNames) {
			const orphanItems = tab.loadoutBindings[orphanName] || [];
			for (const hrid of orphanItems) if (!stillBound.has(hrid)) tab.items = tab.items.filter((h) => h !== hrid);
			delete tab.loadoutBindings[orphanName];
		}
		return {
			config: c,
			changed: true
		};
	}
	/**
	* Find a node by id in a tab tree, returning { tab, parent }
	* @param {Array} tabs
	* @param {string} id
	* @param {Object|null} parent
	* @returns {{ tab: Object, parent: Object|null } | null}
	*/
	function _findNode(tabs, id, parent = null) {
		for (const tab of tabs) {
			if (tab.id === id) return {
				tab,
				parent
			};
			if (tab.children.length > 0) {
				const found = _findNode(tab.children, id, tab);
				if (found) return found;
			}
		}
		return null;
	}
	/**
	* Remove a node by id from a tab tree (mutates the array)
	* @param {Array} tabs
	* @param {string} id
	* @returns {boolean} true if removed
	*/
	function _removeFromArray(tabs, id) {
		const idx = tabs.findIndex((t) => t.id === id);
		if (idx !== -1) {
			tabs.splice(idx, 1);
			return true;
		}
		for (const tab of tabs) if (_removeFromArray(tab.children, id)) return true;
		return false;
	}
	/**
	* Walk all tabs depth-first, calling fn(tab) on each
	* @param {Array} tabs
	* @param {Function} fn
	*/
	function _walkTabs(tabs, fn) {
		for (const tab of tabs) {
			fn(tab);
			if (tab.children.length > 0) _walkTabs(tab.children, fn);
		}
	}
	//#endregion
	//#region src/features/inventory/custom-tabs/custom-tabs-ui.js
	/**
	* Custom Inventory Tabs — UI Module
	* Injects a "Toolasha" tab into the character panel tab bar. When active,
	* uses CSS `display: contents` + `order` to visually reorganize game tiles
	* into accordion sections without moving them out of their React-managed container.
	*
	* Key insight: physically moving React-owned tiles destroys them permanently.
	* Instead we flatten the DOM hierarchy with `display: contents` on wrapper divs,
	* inject accordion headers directly into Inventory_items, and use CSS `order`
	* to visually group tiles under headers. Tiles never leave Inventory_items.
	*/
	function getLoadoutSnapshot() {
		return window.Toolasha?.Combat?.loadoutSnapshot || loadoutSnapshot;
	}
	var PANEL_CSS = `
/* ---------- Toolasha-active mode on Inventory_items ---------- */
/* When our tab is active, Inventory_items becomes a flex container.
   Category wrappers and grids get display:contents so tiles become
   direct flex children and can be reordered with CSS order. */
.toolasha-ct-active {
    display: flex !important;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 0;
    padding-top: 0 !important;
}
/* Flatten game category wrappers so tiles become direct flex children.
   Exclude our own injected elements (they have class starting with toolasha-). */
.toolasha-ct-active > *:not([class*="toolasha-"]) {
    display: contents;
}
.toolasha-ct-active [class*="Inventory_itemGrid"] {
    display: contents;
}

/* Hide game category labels and buttons exposed by display:contents */
.toolasha-ct-active [class*="Inventory_label"],
.toolasha-ct-active [class*="Inventory_categoryButton"] {
    display: none !important;
}

/* When active, hide ALL tiles by default — _applyLayout selectively shows them.
   This prevents flash of unstyled tiles when React re-renders new elements. */
.toolasha-ct-active [class*="Item_itemContainer"] {
    display: none !important;
}
/* Tiles we explicitly want visible get this class */
.toolasha-ct-active [class*="Item_itemContainer"].toolasha-ct-visible {
    display: flex !important;
}

/* ---------- Top bar (injected into Inventory_items, Toolasha tab only) ---------- */
.toolasha-ct-topbar {
    display: flex;
    align-items: center;
    padding: 2px 0 4px;
    flex-basis: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
    gap: 4px;
}
.toolasha-ct-add-btn {
    background: #444;
    color: #aaa;
    border: none;
    border-radius: 4px;
    padding: 2px 8px;
    cursor: pointer;
    font-size: 12px;
}
.toolasha-ct-add-btn:hover { background: #555; }

/* ---------- Accordion header (injected into Inventory_items) ---------- */
.toolasha-ct-section-header {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 2px 10px 2px calc(10px + var(--depth, 0) * 20px);
    cursor: pointer;
    user-select: none;
    flex-basis: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
    border-bottom: 1px solid #2a2a2a;
    color: #d4d4d4;
    font-family: inherit;
    font-size: 12px;
}
.toolasha-ct-section-header:hover { background: rgba(255,255,255,0.04); }
.toolasha-ct-chevron {
    width: 14px;
    text-align: center;
    font-size: 10px;
    color: #888;
    flex-shrink: 0;
}
.toolasha-ct-section-name {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;
    color: #e0e0e0;
    pointer-events: none;
}
.toolasha-ct-section-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    z-index: 1;
}
.toolasha-ct-section-count {
    font-size: 11px;
    color: #666;
}
.toolasha-ct-section-value {
    font-size: 11px;
    color: #aaa;
}
.toolasha-ct-section-actions {
    display: none;
    gap: 2px;
    flex-shrink: 0;
}
.toolasha-ct-section-header:hover .toolasha-ct-section-actions { display: flex; }
.toolasha-ct-node-btn {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    font-size: 12px;
    padding: 0 2px;
    line-height: 1;
}
.toolasha-ct-node-btn:hover { color: #ddd; }

/* ---------- Unorganized bucket header ---------- */
.toolasha-ct-unorg-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 10px 4px;
    margin-top: 4px;
    border-top: 1px solid #333;
    cursor: pointer;
    color: #888;
    font-size: 12px;
    flex-basis: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
}
.toolasha-ct-unorg-header:hover { color: #aaa; }

.toolasha-ct-empty {
    color: #666;
    font-style: italic;
    padding: 12px 10px;
    text-align: center;
    font-size: 12px;
    flex-basis: 100%;
}

/* Drag indicator */
.toolasha-ct-section-header.toolasha-ct-section--drag-over {
    border-top: 2px solid #4a9eff;
}

/* Line break injected between tiles to force a flex row wrap */
.toolasha-ct-linebreak {
    flex-basis: 100%;
    width: 100%;
    height: 0;
    flex-shrink: 0;
}

/* ---------- Editor modal ---------- */
.toolasha-ct-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}
.toolasha-ct-modal {
    background: #1a1a2e;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 16px;
    width: 380px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: #d4d4d4;
}
.toolasha-ct-modal-body {
    overflow-y: auto;
    flex: 1;
    min-height: 0;
}
.toolasha-ct-modal * { box-sizing: border-box; }
.toolasha-ct-modal h3 {
    margin: 0 0 12px;
    font-size: 15px;
    color: #e0e0e0;
}
.toolasha-ct-modal label {
    display: block;
    font-size: 12px;
    color: #aaa;
    margin-bottom: 4px;
}
.toolasha-ct-modal input[type="text"],
.toolasha-ct-modal input[type="search"] {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #444;
    border-radius: 4px;
    background: #111;
    color: #ddd;
    font-size: 13px;
    margin-bottom: 8px;
}
.toolasha-ct-swatches {
    display: flex;
    gap: 6px;
    align-items: center;
    margin-bottom: 12px;
}
.toolasha-ct-swatch {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
}
.toolasha-ct-swatch--active { border-color: #fff; }
.toolasha-ct-swatch-divider {
    width: 1px;
    height: 18px;
    background: #555;
    margin: 0 2px;
}
.toolasha-ct-color-picker {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    padding: 0;
    appearance: none;
    -webkit-appearance: none;
    background: none;
    overflow: hidden;
}
.toolasha-ct-color-picker--active { border-color: #fff; }
.toolasha-ct-color-picker::-webkit-color-swatch-wrapper { padding: 0; }
.toolasha-ct-color-picker::-webkit-color-swatch { border: none; border-radius: 50%; }
.toolasha-ct-color-picker::-moz-color-swatch { border: none; border-radius: 50%; }
.toolasha-ct-modal input.toolasha-ct-hex-input {
    width: 72px;
    height: 22px;
    box-sizing: border-box;
    background: #333;
    border: 1px solid #555;
    border-radius: 3px;
    color: #eee;
    font-size: 11px;
    padding: 0 5px;
    font-family: monospace;
    margin: 0;
}
.toolasha-ct-search-results {
    max-height: 160px;
    overflow-y: auto;
    margin-bottom: 8px;
}
.toolasha-ct-search-result {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 6px;
    cursor: pointer;
    border-radius: 3px;
}
.toolasha-ct-search-result:hover { background: rgba(255,255,255,0.08); }
.toolasha-ct-search-result svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}
.toolasha-ct-search-group-header { font-weight: 500; }
.toolasha-ct-search-level-row { padding-left: 32px; }
.toolasha-ct-level-badges {
    color: #888;
    font-size: 11px;
    margin-left: 4px;
    flex-shrink: 0;
}
.toolasha-ct-expand-btn {
    margin-left: auto;
    color: #666;
    font-size: 11px;
    flex-shrink: 0;
    padding: 0 2px;
}
.toolasha-ct-assigned-list {
    margin-top: 8px;
}
.toolasha-ct-assigned-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 4px;
    border-radius: 3px;
}
.toolasha-ct-assigned-item:hover { background: rgba(255,255,255,0.05); }
.toolasha-ct-assigned-item.toolasha-ct-drag-over { background: rgba(255,255,255,0.12); outline: 1px dashed #888; }
.toolasha-ct-assigned-item svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}
.toolasha-ct-assigned-item .toolasha-ct-node-btn {
    margin-left: auto;
}
.toolasha-ct-drag-handle {
    cursor: grab;
    color: #555;
    font-size: 14px;
    flex-shrink: 0;
    user-select: none;
    padding: 0 2px;
}
.toolasha-ct-drag-handle:active { cursor: grabbing; }
.toolasha-ct-modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid #333;
}
.toolasha-ct-delete-btn {
    background: #5a1a1a;
    color: #faa;
    border: 1px solid #8a2a2a;
    border-radius: 4px;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 12px;
}
.toolasha-ct-delete-btn:hover { background: #7a2a2a; }
.toolasha-ct-close-btn {
    background: #333;
    color: #ccc;
    border: 1px solid #555;
    border-radius: 4px;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 12px;
}
.toolasha-ct-close-btn:hover { background: #444; }
.toolasha-ct-clear-btn {
    background: #3a2a0a;
    color: #f0b040;
    border: 1px solid #6a4a10;
    border-radius: 4px;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 12px;
}
.toolasha-ct-clear-btn:hover { background: #5a3a10; }

/* ---------- Category buttons ---------- */
.toolasha-ct-addall-label {
    margin-left: 6px;
    color: #aaa;
    cursor: pointer;
}
.toolasha-ct-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 10px;
}
.toolasha-ct-cat-btn {
    background: #1e2a3a;
    color: #8ab4f0;
    border: 1px solid #2a4060;
    border-radius: 4px;
    padding: 3px 8px;
    cursor: pointer;
    font-size: 11px;
    white-space: nowrap;
}
.toolasha-ct-cat-btn:hover { background: #2a4060; }
.toolasha-ct-cat-btn--added {
    background: #1a3a2a;
    color: #6c6;
    border-color: #2a5a3a;
    cursor: pointer;
}
.toolasha-ct-cat-btn--added:hover { background: #2a5a3a; }

/* ---------- Category filter ---------- */
.toolasha-ct-search-row {
    display: flex;
    gap: 4px;
    margin-bottom: 8px;
}
.toolasha-ct-search-row input[type="search"] {
    flex: 1;
    margin-bottom: 0;
}
.toolasha-ct-cat-filter {
    padding: 4px 6px;
    border: 1px solid #444;
    border-radius: 4px;
    background: #111;
    color: #ddd;
    font-size: 12px;
    min-width: 100px;
}

/* ---------- Tile drag & drop ---------- */
.toolasha-ct-tile-dragging { opacity: 0.4; }
.toolasha-ct-section-header.toolasha-ct-tile-drop-target,
.toolasha-ct-unorg-header.toolasha-ct-tile-drop-target {
    background: rgba(74, 158, 255, 0.15) !important;
    box-shadow: inset 0 0 0 1px rgba(74, 158, 255, 0.4);
}
.toolasha-ct-active [class*="Item_itemContainer"].toolasha-ct-drop-before {
    box-shadow: -2px 0 0 0 #4a9eff;
}
.toolasha-ct-active [class*="Item_itemContainer"].toolasha-ct-drop-after {
    box-shadow: 2px 0 0 0 #4a9eff;
}
`;
	var _spriteBaseUrl = null;
	/**
	* Discover the game's items SVG sprite URL
	* @returns {string|null}
	*/
	function getSpriteBaseUrl() {
		if (_spriteBaseUrl) return _spriteBaseUrl;
		const allUses = document.querySelectorAll("svg use");
		for (const useEl of allUses) {
			const href = useEl.getAttribute("href") || useEl.getAttribute("xlink:href") || "";
			if (href.includes("items_sprite")) {
				const hashIdx = href.indexOf("#");
				if (hashIdx > 0) {
					_spriteBaseUrl = href.slice(0, hashIdx);
					return _spriteBaseUrl;
				}
			}
		}
		return null;
	}
	var COLOR_PRESETS = [
		"#e06060",
		"#e0a030",
		"#40c060",
		"#40a0e0",
		"#a060e0",
		"#e060c0"
	];
	var CustomTabsUI = class {
		constructor() {
			this._isActive = false;
			this._config = null;
			this._tabBtn = null;
			this._invContainer = null;
			this._injectedEls = [];
			this._unregisterHandlers = [];
			this._onItemsUpdated = null;
			this._styleEl = null;
			this._unorgOpen = true;
			this._editorTabId = null;
			this._deleteConfirmId = null;
			this._dragInProgress = false;
			this._inventoryTabEl = null;
			this._expandedSearchHrids = null;
			this._isApplying = false;
			this._needsAnotherPass = false;
			this._lastRebuildTileCount = 0;
			this._actionBtnsEl = null;
			this._tileObserver = null;
			this._observedContainer = null;
			this._dragBoundTiles = /* @__PURE__ */ new WeakSet();
		}
		async initialize() {
			const charId = src_core_data_manager_js.default.getCurrentCharacterId();
			this._config = await loadConfig(charId);
			this._styleEl = document.createElement("style");
			this._styleEl.textContent = PANEL_CSS;
			document.head.appendChild(this._styleEl);
			this._tryInjectTabButton();
			const unregister = src_core_dom_observer_js.default.onClass("CustomTabs", "TabsComponent_tabsContainer", () => {
				this._tryInjectTabButton();
			});
			this._unregisterHandlers.push(unregister);
			if (!this._tabBtn) {
				let retries = 0;
				const retryInterval = setInterval(() => {
					retries++;
					this._tryInjectTabButton();
					if (this._tabBtn || retries >= 20) clearInterval(retryInterval);
				}, 500);
				this._unregisterHandlers.push(() => clearInterval(retryInterval));
			}
			const onDefaultTabChange = () => {
				this._applyDefaultTabSetting();
			};
			src_core_config_js.default.onSettingChange("inventoryTabs_defaultTab", onDefaultTabChange);
			this._unregisterHandlers.push(() => src_core_config_js.default.offSettingChange("inventoryTabs_defaultTab", onDefaultTabChange));
			const onTileGapChange = () => {
				if (this._isActive) this._applyTileGap();
			};
			src_core_config_js.default.onSettingChange("inventoryTabs_tileGap", onTileGapChange);
			this._unregisterHandlers.push(() => src_core_config_js.default.offSettingChange("inventoryTabs_tileGap", onTileGapChange));
			let rafId = null;
			this._onItemsUpdated = (data) => {
				if (rafId) cancelAnimationFrame(rafId);
				rafId = requestAnimationFrame(() => {
					rafId = null;
					if (this._isActive) this._applyLayout();
				});
				this._checkBindingEnhancements(data);
			};
			src_core_data_manager_js.default.on("items_updated", this._onItemsUpdated);
			const unregisterSort = inventorySort.onModeChange(() => {
				if (this._isActive) this._applyLayout();
			});
			this._unregisterHandlers.push(unregisterSort);
			const unregisterItemAction = src_core_dom_observer_js.default.onClass("CustomTabs_itemAction", "Item_actionMenu", (menu) => {
				this._injectAddToTabButton(menu);
			});
			this._unregisterHandlers.push(unregisterItemAction);
			this._loadoutBindingHandler = () => this._onLoadoutSnapshotUpdate();
			getLoadoutSnapshot().onUpdate(this._loadoutBindingHandler);
			this._unregisterHandlers.push(() => {
				getLoadoutSnapshot().offUpdate(this._loadoutBindingHandler);
			});
		}
		cleanup() {
			if (this._inventoryTabEl) {
				this._inventoryTabEl.style.display = "";
				this._inventoryTabEl = null;
			}
			this._clearLayout();
			if (this._onItemsUpdated) {
				src_core_data_manager_js.default.off("items_updated", this._onItemsUpdated);
				this._onItemsUpdated = null;
			}
			for (const unreg of this._unregisterHandlers) if (typeof unreg === "function") unreg();
			this._unregisterHandlers = [];
			this._tabBtn?.remove();
			this._actionBtnsEl?.remove();
			this._actionBtnsEl = null;
			this._styleEl?.remove();
			document.querySelectorAll(".toolasha-ct-add-to-tab").forEach((el) => el.remove());
			this._isActive = false;
		}
		_findCharacterTabList() {
			const allTabLists = document.querySelectorAll("[role=\"tablist\"]");
			for (const tl of allTabLists) for (const tab of tl.querySelectorAll("[role=\"tab\"]")) if (tab.textContent.trim() === "Inventory") return tl;
			return null;
		}
		_tryInjectTabButton() {
			try {
				const tabList = this._findCharacterTabList();
				if (!tabList) return;
				if (tabList.querySelector(".toolasha-inv-tab")) return;
				const existingTab = tabList.querySelector("[role=\"tab\"]");
				const btn = document.createElement("button");
				btn.className = "toolasha-inv-tab " + (existingTab ? existingTab.className.replace(/Mui-selected/g, "") : "");
				btn.setAttribute("role", "tab");
				btn.setAttribute("type", "button");
				btn.textContent = "Toolasha";
				btn.style.minWidth = "auto";
				btn.addEventListener("click", (e) => {
					e.stopPropagation();
					this._activatePanel();
				});
				const inventoryTab = [...tabList.querySelectorAll("[role=\"tab\"]")].find((t) => t.textContent.trim() === "Inventory");
				if (inventoryTab) this._inventoryTabEl = inventoryTab;
				if (inventoryTab?.nextSibling) tabList.insertBefore(btn, inventoryTab.nextSibling);
				else tabList.appendChild(btn);
				this._tabBtn = btn;
				const scroller = tabList.parentElement;
				if (scroller && scroller.className.includes("MuiTabs-scroller")) scroller.style.overflow = "auto";
				for (const tab of tabList.querySelectorAll("[role=\"tab\"]:not(.toolasha-inv-tab)")) tab.addEventListener("click", () => this._deactivatePanel(tab));
				this._applyDefaultTabSetting();
			} catch (err) {
				console.error("[CustomTabs] _tryInjectTabButton failed:", err);
			}
		}
		/**
		* Apply (or remove) the "show Toolasha tab by default" behaviour.
		* Called when the tab button is first injected and on live setting changes.
		*/
		_applyDefaultTabSetting() {
			if (!this._tabBtn) return;
			const enabled = src_core_config_js.default.getSetting("inventoryTabs_defaultTab");
			if (this._inventoryTabEl) this._inventoryTabEl.style.display = enabled ? "none" : "";
			if (enabled && !this._isActive) this._activatePanel();
			else if (enabled && this._isActive) {
				this._hideGameContent();
				this._applyLayout();
			}
		}
		/**
		* Apply tile gap to the active inventory container based on the setting.
		* @param {HTMLElement} [container]
		*/
		_applyTileGap(container) {
			const el = container || this._invContainer;
			if (!el) return;
			el.style.gap = `${src_core_config_js.default.getSettingValue("inventoryTabs_tileGap", 4)}px`;
		}
		_activatePanel() {
			if (this._isActive) return;
			this._isActive = true;
			if (this._tabBtn) this._tabBtn.classList.add("Mui-selected");
			const tabList = this._tabBtn?.parentElement;
			if (tabList) for (const tab of tabList.querySelectorAll("[role=\"tab\"]:not(.toolasha-inv-tab)")) {
				tab.classList.remove("Mui-selected");
				tab.setAttribute("aria-selected", "false");
			}
			this._hideGameContent();
			this._applyLayout();
		}
		_deactivatePanel(clickedTab = null) {
			if (!this._isActive) return;
			this._isActive = false;
			if (this._tabBtn) this._tabBtn.classList.remove("Mui-selected");
			this._clearLayout();
			this._showGameContent();
			if (clickedTab) {
				clickedTab.classList.add("Mui-selected");
				clickedTab.setAttribute("aria-selected", "true");
			}
		}
		/**
		* Hide the game's TabsComponent_tabPanelsContainer content
		* (the content for Inventory/Equipment/etc.)
		*/
		_hideGameContent() {
			const contentContainer = this._findContentContainer();
			if (contentContainer) contentContainer.style.display = "none";
		}
		/**
		* Restore the game's TabsComponent_tabPanelsContainer content
		*/
		_showGameContent() {
			const contentContainer = this._findContentContainer();
			if (contentContainer) contentContainer.style.display = "";
		}
		/**
		* Find the TabsComponent_tabPanelsContainer that holds game content
		* @returns {HTMLElement|null}
		*/
		_findContentContainer() {
			const tabList = this._findCharacterTabList();
			if (!tabList) return null;
			return tabList.closest("[class*=\"TabsComponent_tabsContainer\"]")?.nextElementSibling || null;
		}
		/**
		* Find the game's Inventory_items element
		* @returns {HTMLElement|null}
		*/
		_findInvContainer() {
			return document.querySelector("[class*=\"Inventory_items\"]");
		}
		/**
		* Count total items across all tabs (recursively) for rebuild detection.
		* @returns {number}
		*/
		_getTotalConfigItemCount() {
			const countTab = (tab) => (tab.items?.length || 0) + (tab.children || []).reduce((s, c) => s + countTab(c), 0);
			return (this._config?.tabs || []).reduce((s, t) => s + countTab(t), 0);
		}
		/**
		* Synchronous layout pass — applies CSS order and visibility to all tiles.
		* Extracted from _applyLayout so it can also be called from a MutationObserver
		* callback (which fires before the browser paints, eliminating flicker when
		* React swaps tile elements during enhancement).
		* @param {HTMLElement} invContainer
		*/
		_applyLayoutSync(invContainer) {
			const isSameNode = invContainer === this._invContainer;
			const injectedStillPresent = this._injectedEls.length > 0 && this._injectedEls[0].parentElement === invContainer;
			let needsFullRebuild = !isSameNode || !injectedStillPresent;
			this._invContainer = invContainer;
			invContainer.classList.add("toolasha-ct-active");
			this._applyTileGap(invContainer);
			this._showInventoryPanel();
			if (needsFullRebuild) this._removeInjectedEls();
			const tileMap = this._buildTileMap(invContainer);
			const allTiles = invContainer.querySelectorAll("[class*=\"Item_itemContainer\"]");
			for (const tile of allTiles) {
				tile.classList.remove("toolasha-ct-visible", "toolasha-ct-drop-before", "toolasha-ct-drop-after");
				tile.style.order = "";
				tile.draggable = false;
				delete tile.dataset.toolashaTabId;
			}
			const configItemCount = this._getTotalConfigItemCount();
			if (!needsFullRebuild && (allTiles.length !== this._lastRebuildTileCount || configItemCount !== this._lastRebuildConfigItemCount)) {
				needsFullRebuild = true;
				this._removeInjectedEls();
			}
			if (needsFullRebuild) {
				let orderCounter = 0;
				const topbar = this._injectActionButtons();
				if (topbar) {
					topbar.style.order = orderCounter++;
					invContainer.appendChild(topbar);
					this._injectedEls.push(topbar);
				}
				if (this._config.tabs.length === 0) {
					const empty = document.createElement("div");
					empty.className = "toolasha-ct-empty";
					empty.textContent = "No custom tabs yet. Click \"+ Tab\" to create one.";
					empty.style.order = orderCounter++;
					invContainer.appendChild(empty);
					this._injectedEls.push(empty);
				} else {
					this._allClaimedHrids = /* @__PURE__ */ new Set();
					orderCounter = this._injectAccordionHeaders(invContainer, this._config.tabs, 0, tileMap, orderCounter);
				}
				if (src_core_config_js.default.getSettingValue("inventoryTabs_showUnorganized")) orderCounter = this._injectUnorganized(invContainer, tileMap, orderCounter);
				this._lastRebuildTileCount = allTiles.length;
				this._lastRebuildConfigItemCount = configItemCount;
			} else this._updateTileVisibility(invContainer, tileMap);
			if (this._tileObserver === null || this._observedContainer !== invContainer) {
				this._tileObserver?.disconnect();
				this._observedContainer = invContainer;
				this._tileObserver = new MutationObserver((mutations) => {
					if (!this._isActive) return;
					if (mutations.some((m) => [...m.addedNodes, ...m.removedNodes].some((n) => n.nodeType === Node.ELEMENT_NODE && (n.className?.includes?.("Item_itemContainer") || n.querySelector?.("[class*=\"Item_itemContainer\"]"))))) this._applyLayoutSync(invContainer);
				});
				this._tileObserver.observe(invContainer, {
					childList: true,
					subtree: true
				});
			}
		}
		/**
		* Apply the CSS order layout. Tiles never leave Inventory_items.
		* We add `display: contents` to flatten wrapper divs, inject accordion
		* headers, and set CSS `order` on each tile to group them visually.
		*
		* Tiles are hidden by default via the CSS rule on .toolasha-ct-active,
		* then selectively shown by adding .toolasha-ct-visible.
		*/
		async _applyLayout() {
			if (this._isApplying) {
				this._needsAnotherPass = true;
				return;
			}
			this._isApplying = true;
			this._needsAnotherPass = false;
			try {
				const invContainer = this._findInvContainer();
				if (!invContainer) return;
				this._applyLayoutSync(invContainer);
				if (!inventoryBadgeManager.currentInventoryElem) inventoryBadgeManager.currentInventoryElem = invContainer;
				while (inventoryBadgeManager.isRendering || inventoryBadgeManager.isCalculating) await new Promise((resolve) => setTimeout(resolve, 20));
				inventoryBadgeManager.lastRenderTime = 0;
				inventoryBadgeManager.lastCalculationTime = 0;
				await inventoryBadgeManager.renderAllBadges();
			} finally {
				this._isApplying = false;
				if (this._needsAnotherPass) {
					this._needsAnotherPass = false;
					this._applyLayout();
				}
			}
		}
		/**
		* Lightweight tile update — headers are already injected with correct order values.
		* Re-apply toolasha-ct-visible and style.order to tiles based on current config.
		* @param {HTMLElement} invContainer
		* @param {Map} tileMap
		*/
		_updateTileVisibility(invContainer, tileMap) {
			const headers = invContainer.querySelectorAll(".toolasha-ct-section-header");
			const headerOrderMap = /* @__PURE__ */ new Map();
			for (const header of headers) headerOrderMap.set(header.dataset.tabId, parseInt(header.style.order, 10));
			this._applyTileOrderForTabs(this._config.tabs, tileMap, headerOrderMap);
			const unorgHeader = invContainer.querySelector(".toolasha-ct-unorg-header");
			if (unorgHeader && this._unorgOpen) {
				const unorgOrder = parseInt(unorgHeader.style.order, 10);
				const assignedSet = getAssignedItemSet(this._config);
				const unorgTiles = [];
				for (const [hrid, tiles] of tileMap) if (/\+\d+$/.test(hrid)) {
					if (!assignedSet.has(hrid)) for (const tile of tiles) unorgTiles.push(tile);
				} else {
					if (assignedSet.has(hrid)) continue;
					for (const tile of tiles) {
						const enhEl = tile.querySelector("[class*=\"Item_enhancementLevel\"]");
						const level = enhEl ? parseInt(enhEl.textContent.trim().replace("+", ""), 10) : 0;
						const tileHrid = level > 0 ? `${hrid}+${level}` : hrid;
						if (!assignedSet.has(tileHrid)) unorgTiles.push(tile);
					}
				}
				this._assignTileOrders(unorgTiles, unorgOrder + 1, "");
			}
		}
		/**
		* Recursively apply tile visibility/order for tabs using existing header order values
		* @param {Array} tabs
		* @param {Map} tileMap
		* @param {Map} headerOrderMap - tabId → order number from injected headers
		*/
		_applyTileOrderForTabs(tabs, tileMap, headerOrderMap) {
			for (const tab of tabs) {
				const headerOrder = headerOrderMap.get(tab.id);
				if (headerOrder === void 0) continue;
				if (tab.open) {
					if (tab.items.includes("__linebreak__")) {
						let currentOrder = headerOrder + 1;
						let lbIndex = 0;
						for (const hrid of tab.items) if (hrid === "__linebreak__") {
							const lb = this._invContainer?.querySelector(`.toolasha-ct-linebreak[data-tab-id="${tab.id}"][data-lb-index="${lbIndex}"]`);
							if (lb) lb.style.order = String(currentOrder);
							currentOrder++;
							lbIndex++;
						} else for (const tile of this._claimTilesForHrid(hrid, tileMap)) {
							tile.classList.add("toolasha-ct-visible");
							tile.style.order = String(currentOrder++);
							tile.dataset.toolashaTabId = tab.id;
							this._setupTileDrag(tile);
						}
					} else {
						const sectionTiles = [];
						for (const hrid of tab.items) for (const tile of this._claimTilesForHrid(hrid, tileMap)) sectionTiles.push(tile);
						this._assignTileOrders(sectionTiles, headerOrder + 1, tab.id);
					}
					if (tab.children.length > 0) this._applyTileOrderForTabs(tab.children, tileMap, headerOrderMap);
				} else {
					if (src_core_config_js.default.getSetting("inventoryTabs_topTabPriority")) {
						for (const hrid of tab.items) if (hrid !== "__linebreak__") this._claimTilesForHrid(hrid, tileMap);
					}
					this._removeTilesFromMapForChildren(tab.children, tileMap);
				}
			}
		}
		/**
		* Ensure the Inventory panel (first tab panel) is visible while hiding others.
		* The content container was hidden on activation; we need to un-hide it but
		* only show the Inventory panel.
		*/
		_showInventoryPanel() {
			const contentContainer = this._findContentContainer();
			if (!contentContainer) return;
			contentContainer.style.display = "";
			for (const child of contentContainer.children) child.style.display = "none";
			if (contentContainer.children[0]) contentContainer.children[0].style.display = "block";
		}
		/**
		* Remove all CSS classes and injected elements; restore normal game layout.
		*/
		_clearLayout() {
			this._tileObserver?.disconnect();
			this._tileObserver = null;
			this._observedContainer = null;
			this._removeInjectedEls();
			if (this._invContainer) {
				this._invContainer.classList.remove("toolasha-ct-active");
				const tiles = this._invContainer.querySelectorAll("[class*=\"Item_itemContainer\"]");
				for (const tile of tiles) {
					tile.classList.remove("toolasha-ct-visible");
					tile.style.order = "";
				}
			}
			const contentContainer = this._findContentContainer();
			if (contentContainer) for (const child of contentContainer.children) child.style.display = "";
		}
		/**
		* Remove all elements we injected into invContainer
		*/
		_removeInjectedEls() {
			this._actionBtnsEl?.remove();
			this._actionBtnsEl = null;
			for (const el of this._injectedEls) el.remove();
			this._injectedEls = [];
		}
		/**
		* Create the top bar with sort proxy buttons and tab action buttons.
		* Shown only on the Toolasha tab; hides the external sort controls row.
		* @returns {HTMLElement}
		*/
		/**
		* Create the tab action buttons and place them to the right of the sort controls row.
		* Falls back to a topbar inside the inventory container if sort controls aren't present.
		* @param {HTMLElement} invContainer
		* @returns {HTMLElement|null} topbar element if fallback was used, null if appended to sort controls
		*/
		_injectActionButtons() {
			this._actionBtnsEl?.remove();
			const actionsDiv = document.createElement("div");
			actionsDiv.className = "toolasha-ct-action-btns";
			actionsDiv.style.cssText = "display:flex;gap:4px;flex-shrink:0;";
			const addBtn = document.createElement("button");
			addBtn.className = "toolasha-ct-add-btn";
			addBtn.textContent = "+ Tab";
			addBtn.addEventListener("click", () => this._onAddTab(null));
			const exportBtn = document.createElement("button");
			exportBtn.className = "toolasha-ct-add-btn";
			exportBtn.textContent = "Export";
			exportBtn.addEventListener("click", () => this._exportLayout());
			const importBtn = document.createElement("div");
			importBtn.className = "toolasha-ct-add-btn";
			importBtn.style.position = "relative";
			importBtn.style.overflow = "hidden";
			importBtn.textContent = "Import";
			const importInput = document.createElement("input");
			importInput.type = "file";
			importInput.accept = ".json,application/json";
			importInput.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;";
			importInput.addEventListener("change", () => {
				const file = importInput.files?.[0];
				if (file) this._handleImportFile(file);
				importInput.value = "";
			});
			importBtn.appendChild(importInput);
			actionsDiv.appendChild(addBtn);
			actionsDiv.appendChild(exportBtn);
			actionsDiv.appendChild(importBtn);
			const expandBtn = document.createElement("button");
			expandBtn.className = "toolasha-ct-add-btn";
			expandBtn.textContent = "Expand All";
			expandBtn.addEventListener("click", () => this._onSetAllTabsOpen(true));
			actionsDiv.appendChild(expandBtn);
			const collapseBtn = document.createElement("button");
			collapseBtn.className = "toolasha-ct-add-btn";
			collapseBtn.textContent = "Collapse All";
			collapseBtn.addEventListener("click", () => this._onSetAllTabsOpen(false));
			actionsDiv.appendChild(collapseBtn);
			this._actionBtnsEl = actionsDiv;
			const sortControls = document.querySelector(".mwi-inventory-sort-controls");
			if (sortControls) {
				actionsDiv.style.marginLeft = "auto";
				sortControls.appendChild(actionsDiv);
				return null;
			}
			const topbar = document.createElement("div");
			topbar.className = "toolasha-ct-topbar";
			topbar.appendChild(actionsDiv);
			return topbar;
		}
		/**
		* Serialize the current layout to a JSON file and trigger a download.
		*/
		_exportLayout() {
			const payload = {
				_toolasha: "tabs-v1",
				...this._config
			};
			const json = JSON.stringify(payload, null, 2);
			const blob = new Blob([json], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "toolasha-tabs.json";
			a.click();
			URL.revokeObjectURL(url);
		}
		/**
		* Process an imported JSON layout file and apply it.
		* @param {File} file
		*/
		async _handleImportFile(file) {
			try {
				const text = await file.text();
				const parsed = JSON.parse(text);
				if (parsed._toolasha !== "tabs-v1" || !Array.isArray(parsed.tabs)) {
					alert("[Toolasha] Invalid layout file.");
					console.error("[CustomTabs] Import failed: missing _toolasha marker or tabs array", parsed);
					return;
				}
				const { _toolasha: _, ...config } = parsed;
				this._config = config;
				this._removeInjectedEls();
				const invContainer = this._findInvContainer();
				if (invContainer) invContainer.scrollTop = 0;
				await this._applyLayout();
				this._save();
			} catch (err) {
				alert("[Toolasha] Failed to read layout file.");
				console.error("[CustomTabs] Import error:", err);
			}
		}
		/**
		* Build a map of itemHrid → array of game tile elements in the inventory DOM.
		* @param {HTMLElement} invContainer
		* @returns {Map<string, HTMLElement[]>}
		*/
		_buildTileMap(invContainer) {
			const map = /* @__PURE__ */ new Map();
			const tiles = invContainer.querySelectorAll("[class*=\"Item_itemContainer\"]");
			for (const tile of tiles) {
				const svg = tile.querySelector("svg[aria-label]");
				if (!svg) continue;
				const baseName = svg.getAttribute("aria-label");
				const hrid = this._nameToHrid(baseName);
				if (!hrid) continue;
				if (!map.has(hrid)) map.set(hrid, []);
				map.get(hrid).push(tile);
				const enhEl = tile.querySelector("[class*=\"Item_enhancementLevel\"]");
				if (enhEl) {
					const level = parseInt(enhEl.textContent.trim().replace("+", ""), 10);
					if (!isNaN(level) && level > 0) {
						const enhancedHrid = `${hrid}+${level}`;
						if (!map.has(enhancedHrid)) map.set(enhancedHrid, []);
						map.get(enhancedHrid).push(tile);
					}
				}
			}
			return map;
		}
		/**
		* Claim tiles for a given hrid from the tileMap.
		* - Base hrid (/items/foo): claims all tiles (all enhancement levels)
		* - Enhanced hrid (/items/foo+3): claims only +3 tiles and removes them from the base key too
		* @param {string} hrid
		* @param {Map} tileMap
		* @returns {HTMLElement[]}
		*/
		_claimTilesForHrid(hrid, tileMap) {
			const entries = tileMap.get(hrid);
			if (!entries) return [];
			tileMap.delete(hrid);
			if (/\+\d+$/.test(hrid)) {
				const baseHrid = hrid.replace(/\+\d+$/, "");
				const baseEntries = tileMap.get(baseHrid);
				if (baseEntries) {
					const claimedSet = new Set(entries);
					const remaining = baseEntries.filter((t) => !claimedSet.has(t));
					if (remaining.length > 0) tileMap.set(baseHrid, remaining);
					else tileMap.delete(baseHrid);
				}
			} else {
				const enhancedPrefix = hrid + "+";
				const reservedTiles = /* @__PURE__ */ new Set();
				for (const [key, keyTiles] of tileMap) if (key.startsWith(enhancedPrefix)) for (const t of keyTiles) reservedTiles.add(t);
				const claimable = reservedTiles.size > 0 ? entries.filter((t) => !reservedTiles.has(t)) : entries;
				if (claimable.length < entries.length) {
					const reserved = entries.filter((t) => reservedTiles.has(t));
					tileMap.set(hrid, reserved);
				}
				return claimable;
			}
			return entries;
		}
		/**
		* Lazy-build a name→hrid lookup map
		* @param {string} name
		* @returns {string|null}
		*/
		_nameToHrid(name) {
			if (!this._nameHridCache) {
				this._nameHridCache = /* @__PURE__ */ new Map();
				const initData = src_core_data_manager_js.default.getInitClientData();
				if (initData?.itemDetailMap) {
					for (const [hrid, details] of Object.entries(initData.itemDetailMap)) if (details.name) {
						this._nameHridCache.set(details.name, hrid);
						if (details.name.includes("(R)")) this._nameHridCache.set(details.name.replace(/\s*\(R\)/, " ★"), hrid);
						else if (details.name.includes("★")) this._nameHridCache.set(details.name.replace(/\s*★/, " (R)"), hrid);
					}
				}
			}
			return this._nameHridCache.get(name) || null;
		}
		/**
		* Extract the full HRID (including enhancement level) from a tile DOM element.
		* @param {HTMLElement} tile - Item tile element
		* @returns {string|null} HRID like "/items/sword" or "/items/sword+3", or null
		*/
		_getHridFromTile(tile) {
			const svg = tile.querySelector("svg[aria-label]");
			if (!svg) return null;
			const baseName = svg.getAttribute("aria-label");
			const hrid = this._nameToHrid(baseName);
			if (!hrid) return null;
			const enhEl = tile.querySelector("[class*=\"Item_enhancementLevel\"]");
			if (enhEl) {
				const level = parseInt(enhEl.textContent.trim().replace("+", ""), 10);
				if (!isNaN(level) && level > 0) return `${hrid}+${level}`;
			}
			return hrid;
		}
		/**
		* Inject accordion headers into invContainer for the given tabs.
		* Show/hide tiles using CSS class + order.
		* @param {HTMLElement} invContainer
		* @param {Array} tabs
		* @param {number} depth
		* @param {Map} tileMap
		* @param {number} orderCounter
		* @returns {number} updated orderCounter
		*/
		_injectAccordionHeaders(invContainer, tabs, depth, tileMap, orderCounter) {
			for (const tab of tabs) orderCounter = this._injectSectionHeader(invContainer, tab, depth, tileMap, orderCounter);
			return orderCounter;
		}
		/**
		* Inject a single section header + show its tiles via CSS order
		* @param {HTMLElement} invContainer
		* @param {Object} tab
		* @param {number} depth
		* @param {Map} tileMap
		* @param {number} orderCounter
		* @returns {number} updated orderCounter
		*/
		_injectSectionHeader(invContainer, tab, depth, tileMap, orderCounter) {
			const header = document.createElement("div");
			header.className = "toolasha-ct-section-header";
			header.dataset.tabId = tab.id;
			header.style.setProperty("--depth", depth);
			header.style.order = orderCounter++;
			if (tab.color) header.style.background = `${tab.color}60`;
			header.draggable = true;
			header.addEventListener("dragstart", (e) => {
				this._dragInProgress = true;
				e.dataTransfer.setData("text/plain", tab.id);
				e.dataTransfer.effectAllowed = "move";
				header.style.opacity = "0.4";
			});
			header.addEventListener("dragend", () => {
				header.style.opacity = "";
				setTimeout(() => {
					this._dragInProgress = false;
				}, 0);
			});
			header.addEventListener("dragover", (e) => {
				e.preventDefault();
				e.dataTransfer.dropEffect = "move";
				if (this._tileDragData) header.classList.add("toolasha-ct-tile-drop-target");
				else header.classList.add("toolasha-ct-section--drag-over");
			});
			header.addEventListener("dragleave", () => {
				header.classList.remove("toolasha-ct-section--drag-over", "toolasha-ct-tile-drop-target");
			});
			header.addEventListener("drop", (e) => {
				e.preventDefault();
				header.classList.remove("toolasha-ct-section--drag-over", "toolasha-ct-tile-drop-target");
				const tileData = e.dataTransfer.getData("application/x-toolasha-tile");
				if (tileData) {
					const { hrid, sourceTabId } = JSON.parse(tileData);
					this._onTileDropOnTab(hrid, sourceTabId, tab.id);
					return;
				}
				const draggedId = e.dataTransfer.getData("text/plain");
				if (draggedId && draggedId !== tab.id) this._onReorderTab(draggedId, tab.id);
			});
			const chevron = document.createElement("span");
			chevron.className = "toolasha-ct-chevron";
			chevron.textContent = tab.open ? "▼" : "▶";
			header.appendChild(chevron);
			const name = document.createElement("span");
			name.className = "toolasha-ct-section-name";
			name.textContent = tab.name;
			header.appendChild(name);
			const rightGroup = document.createElement("span");
			rightGroup.className = "toolasha-ct-section-right";
			if (tab.items.filter((h) => h !== "__linebreak__").length > 0) {
				const countBadge = document.createElement("span");
				countBadge.className = "toolasha-ct-section-count";
				countBadge.textContent = `(${tab.items.filter((h) => h !== LINEBREAK_HRID).length})`;
				rightGroup.appendChild(countBadge);
			}
			header.appendChild(rightGroup);
			const actions = document.createElement("span");
			actions.className = "toolasha-ct-section-actions";
			const editBtn = document.createElement("button");
			editBtn.className = "toolasha-ct-node-btn";
			editBtn.textContent = "✏";
			editBtn.title = "Edit tab";
			editBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				this._openEditor(tab.id);
			});
			actions.appendChild(editBtn);
			const addSubBtn = document.createElement("button");
			addSubBtn.className = "toolasha-ct-node-btn";
			addSubBtn.textContent = "+";
			addSubBtn.title = "Add subtab";
			addSubBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				this._onAddTab(tab.id);
			});
			actions.appendChild(addSubBtn);
			const delBtn = document.createElement("button");
			delBtn.className = "toolasha-ct-node-btn";
			delBtn.textContent = "×";
			delBtn.title = "Delete tab";
			delBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				this._onDeleteTab(tab.id);
			});
			actions.appendChild(delBtn);
			header.appendChild(actions);
			header.addEventListener("click", () => {
				if (this._dragInProgress) return;
				this._onToggleTabOpen(tab.id, !tab.open);
			});
			invContainer.appendChild(header);
			this._injectedEls.push(header);
			if (tab.open) {
				const hasLineBreaks = tab.items.includes(LINEBREAK_HRID);
				const sectionTiles = [];
				if (hasLineBreaks) {
					let lbIndex = 0;
					for (const hrid of tab.items) if (hrid === "__linebreak__") {
						const lb = document.createElement("div");
						lb.className = "toolasha-ct-linebreak";
						lb.dataset.tabId = tab.id;
						lb.dataset.lbIndex = String(lbIndex++);
						lb.style.order = String(orderCounter++);
						invContainer.appendChild(lb);
						this._injectedEls.push(lb);
					} else {
						this._allClaimedHrids?.add(hrid);
						for (const tile of this._claimTilesForHrid(hrid, tileMap)) {
							tile.classList.add("toolasha-ct-visible");
							tile.style.order = String(orderCounter++);
							tile.dataset.toolashaTabId = tab.id;
							this._setupTileDrag(tile);
							sectionTiles.push(tile);
						}
					}
				} else for (const hrid of tab.items) {
					this._allClaimedHrids?.add(hrid);
					for (const tile of this._claimTilesForHrid(hrid, tileMap)) sectionTiles.push(tile);
				}
				const realItems = tab.items.filter((h) => h !== LINEBREAK_HRID);
				if (realItems.length > 0 && sectionTiles.length === 0) {
					const ownedHrids = new Set((src_core_data_manager_js.default.getInventory() || []).filter((i) => i.itemLocationHrid === "/item_locations/inventory").map((i) => {
						const base = i.itemHrid;
						const lvl = i.enhancementLevel || 0;
						return lvl > 0 ? `${base}+${lvl}` : base;
					}));
					if (realItems.some((hrid) => {
						if (this._allClaimedHrids?.has(hrid)) return false;
						if (ownedHrids.has(hrid)) return true;
						if (!/\+\d+$/.test(hrid)) {
							for (const owned of ownedHrids) if (owned.startsWith(hrid + "+")) return true;
						}
						return false;
					})) {
						const warn = document.createElement("span");
						warn.textContent = "⚠";
						warn.title = "Items are hidden — expand the relevant categories in the Inventory tab to show them here.";
						warn.style.cssText = "color:#ff3333;margin-left:4px;cursor:default;font-size:13px;flex-shrink:0;";
						const actionsEl = header.querySelector(".toolasha-ct-section-actions");
						if (actionsEl) header.insertBefore(warn, actionsEl);
						else header.appendChild(warn);
					}
				}
				const valueKey = (() => {
					const mode = inventorySort.currentMode;
					if (mode === "ask" || mode === "bid") return src_core_config_js.default.getSetting("invSort_showBadges") ? mode + "Value" : null;
					if (mode === "none") {
						const badgesOnNone = src_core_config_js.default.getSettingValue("invSort_badgesOnNone", "None");
						return badgesOnNone !== "None" ? badgesOnNone.toLowerCase() + "Value" : null;
					}
					return null;
				})();
				if (valueKey) {
					const total = sectionTiles.reduce((sum, t) => sum + (parseFloat(t.dataset[valueKey]) || 0), 0);
					if (total > 0) {
						const valueBadge = document.createElement("span");
						valueBadge.className = "toolasha-ct-section-value";
						valueBadge.textContent = (0, src_utils_formatters_js.formatKMB)(total, 2);
						const rightEl = header.querySelector(".toolasha-ct-section-right");
						if (rightEl) rightEl.appendChild(valueBadge);
						else header.appendChild(valueBadge);
					}
				}
				if (!hasLineBreaks) orderCounter = this._assignTileOrders(sectionTiles, orderCounter, tab.id);
				if (tab.children.length > 0) orderCounter = this._injectAccordionHeaders(invContainer, tab.children, depth + 1, tileMap, orderCounter);
			} else {
				const valueKey = (() => {
					const mode = inventorySort.currentMode;
					if (mode === "ask" || mode === "bid") return src_core_config_js.default.getSetting("invSort_showBadges") ? mode + "Value" : null;
					if (mode === "none") {
						const badgesOnNone = src_core_config_js.default.getSettingValue("invSort_badgesOnNone", "None");
						return badgesOnNone !== "None" ? badgesOnNone.toLowerCase() + "Value" : null;
					}
					return null;
				})();
				if (valueKey) {
					const total = this._peekTileValue(tab, tileMap, valueKey);
					if (total > 0) {
						const valueBadge = document.createElement("span");
						valueBadge.className = "toolasha-ct-section-value";
						valueBadge.textContent = (0, src_utils_formatters_js.formatKMB)(total, 2);
						const rightEl = header.querySelector(".toolasha-ct-section-right");
						if (rightEl) rightEl.appendChild(valueBadge);
						else header.appendChild(valueBadge);
					}
				}
				if (src_core_config_js.default.getSetting("inventoryTabs_topTabPriority")) {
					for (const hrid of tab.items) if (hrid !== "__linebreak__") {
						this._claimTilesForHrid(hrid, tileMap);
						this._allClaimedHrids?.add(hrid);
					}
				}
				this._removeTilesFromMapForChildren(tab.children, tileMap);
			}
			return orderCounter;
		}
		/**
		* Remove tiles from the tileMap for all descendant tabs (used when a parent is collapsed)
		* @param {Array} tabs
		* @param {Map} tileMap
		*/
		_removeTilesFromMapForChildren(tabs, tileMap) {
			for (const tab of tabs) {
				for (const hrid of tab.items) this._claimTilesForHrid(hrid, tileMap);
				if (tab.children.length > 0) this._removeTilesFromMapForChildren(tab.children, tileMap);
			}
		}
		/**
		* Recursively sum a badge value across a tab's own items and all descendant tabs,
		* peeking at tileMap without claiming tiles.
		* @param {object} tab
		* @param {Map} tileMap
		* @param {string} valueKey - dataset key to sum (e.g. 'askValue', 'bidValue')
		* @returns {number}
		*/
		_peekTileValue(tab, tileMap, valueKey) {
			let total = 0;
			for (const hrid of tab.items) {
				if (hrid === "__linebreak__") continue;
				const tiles = tileMap.get(hrid);
				if (tiles) for (const tile of tiles) total += parseFloat(tile.dataset[valueKey]) || 0;
			}
			for (const child of tab.children) total += this._peekTileValue(child, tileMap, valueKey);
			return total;
		}
		/**
		* Mark tiles as visible and assign sequential CSS order values,
		* sorting by ask/bid value if inventory sort is active.
		* @param {HTMLElement[]} tiles
		* @param {number} startOrder
		* @param {string} [tabId] - Tab ID to stamp on tiles (empty string for unorganized)
		* @returns {number} next available order counter
		*/
		_assignTileOrders(tiles, startOrder, tabId) {
			if (tiles.length === 0) return startOrder;
			const mode = inventorySort.currentMode;
			if (mode && mode !== "none") {
				const valueKey = mode + "Value";
				tiles.sort((a, b) => (parseFloat(b.dataset[valueKey]) || 0) - (parseFloat(a.dataset[valueKey]) || 0));
			}
			for (const tile of tiles) {
				tile.classList.add("toolasha-ct-visible");
				tile.style.order = startOrder++;
				if (tabId !== void 0) tile.dataset.toolashaTabId = tabId;
				this._setupTileDrag(tile);
			}
			return startOrder;
		}
		/**
		* Make a tile draggable and attach drag/drop event handlers.
		* Uses a WeakSet to prevent duplicate listeners (immune to layout resets).
		* @param {HTMLElement} tile
		*/
		_setupTileDrag(tile) {
			tile.draggable = true;
			if (this._dragBoundTiles.has(tile)) return;
			this._dragBoundTiles.add(tile);
			tile.addEventListener("dragstart", (e) => {
				const hrid = this._getHridFromTile(tile);
				if (!hrid) return;
				const sourceTabId = tile.dataset.toolashaTabId || "";
				const payload = JSON.stringify({
					hrid,
					sourceTabId
				});
				e.dataTransfer.setData("application/x-toolasha-tile", payload);
				e.dataTransfer.effectAllowed = "move";
				tile.classList.add("toolasha-ct-tile-dragging");
				this._tileDragData = {
					hrid,
					sourceTabId
				};
			});
			tile.addEventListener("dragend", () => {
				tile.classList.remove("toolasha-ct-tile-dragging");
				this._tileDragData = null;
				if (this._invContainer) for (const el of this._invContainer.querySelectorAll(".toolasha-ct-drop-before, .toolasha-ct-drop-after, .toolasha-ct-tile-drop-target")) el.classList.remove("toolasha-ct-drop-before", "toolasha-ct-drop-after", "toolasha-ct-tile-drop-target");
			});
			tile.addEventListener("dragover", (e) => {
				if (!this._tileDragData) return;
				const targetTabId = tile.dataset.toolashaTabId || "";
				if (!targetTabId || targetTabId !== this._tileDragData.sourceTabId) return;
				e.preventDefault();
				e.dataTransfer.dropEffect = "move";
				const rect = tile.getBoundingClientRect();
				const midX = rect.left + rect.width / 2;
				if (e.clientX < midX) {
					tile.classList.add("toolasha-ct-drop-before");
					tile.classList.remove("toolasha-ct-drop-after");
				} else {
					tile.classList.add("toolasha-ct-drop-after");
					tile.classList.remove("toolasha-ct-drop-before");
				}
			});
			tile.addEventListener("dragleave", () => {
				tile.classList.remove("toolasha-ct-drop-before", "toolasha-ct-drop-after");
			});
			tile.addEventListener("drop", (e) => {
				e.preventDefault();
				tile.classList.remove("toolasha-ct-drop-before", "toolasha-ct-drop-after");
				const raw = e.dataTransfer.getData("application/x-toolasha-tile");
				if (!raw) return;
				const { hrid: draggedHrid, sourceTabId } = JSON.parse(raw);
				const targetTabId = tile.dataset.toolashaTabId || "";
				if (!targetTabId || targetTabId !== sourceTabId) return;
				const targetHrid = this._getHridFromTile(tile);
				if (!targetHrid || targetHrid === draggedHrid) return;
				const rect = tile.getBoundingClientRect();
				const insertAfter = e.clientX >= rect.left + rect.width / 2;
				this._onTileReorder(targetTabId, draggedHrid, targetHrid, insertAfter);
			});
		}
		/**
		* Inject the unorganized bucket header and show unassigned tiles
		* @param {HTMLElement} invContainer
		* @param {Map} tileMap - remaining tiles not placed in any tab
		* @param {number} orderCounter
		* @returns {number} updated orderCounter
		*/
		_injectUnorganized(invContainer, tileMap, orderCounter) {
			const assignedSet = getAssignedItemSet(this._config);
			const remainingEntries = [];
			for (const [hrid, tiles] of tileMap) if (/\+\d+$/.test(hrid)) {
				if (!assignedSet.has(hrid)) remainingEntries.push({
					hrid,
					tiles
				});
			} else {
				if (assignedSet.has(hrid)) continue;
				const unassignedTiles = tiles.filter((tile) => {
					const enhEl = tile.querySelector("[class*=\"Item_enhancementLevel\"]");
					const level = enhEl ? parseInt(enhEl.textContent.trim().replace("+", ""), 10) : 0;
					const tileHrid = level > 0 ? `${hrid}+${level}` : hrid;
					return !assignedSet.has(tileHrid);
				});
				if (unassignedTiles.length > 0) remainingEntries.push({
					hrid,
					tiles: unassignedTiles
				});
			}
			if (remainingEntries.length === 0) return orderCounter;
			const totalTiles = remainingEntries.reduce((sum, e) => sum + e.tiles.length, 0);
			const headerEl = document.createElement("div");
			headerEl.className = "toolasha-ct-unorg-header";
			headerEl.innerHTML = `<span>${this._unorgOpen ? "▼" : "▶"}</span> <span>Unorganized (${totalTiles})</span>`;
			headerEl.style.order = orderCounter++;
			headerEl.addEventListener("click", () => {
				this._unorgOpen = !this._unorgOpen;
				headerEl.querySelector("span").textContent = this._unorgOpen ? "▼" : "▶";
				this._applyLayout();
			});
			headerEl.addEventListener("dragover", (e) => {
				if (!this._tileDragData || !this._tileDragData.sourceTabId) return;
				e.preventDefault();
				e.dataTransfer.dropEffect = "move";
				headerEl.classList.add("toolasha-ct-tile-drop-target");
			});
			headerEl.addEventListener("dragleave", () => {
				headerEl.classList.remove("toolasha-ct-tile-drop-target");
			});
			headerEl.addEventListener("drop", (e) => {
				e.preventDefault();
				headerEl.classList.remove("toolasha-ct-tile-drop-target");
				const raw = e.dataTransfer.getData("application/x-toolasha-tile");
				if (!raw) return;
				const { hrid, sourceTabId } = JSON.parse(raw);
				this._onTileDropOnUnorganized(hrid, sourceTabId);
			});
			invContainer.appendChild(headerEl);
			this._injectedEls.push(headerEl);
			if (this._unorgOpen) {
				const initData = src_core_data_manager_js.default.getInitClientData();
				const itemDetailMap = initData?.itemDetailMap || {};
				const categoryDetailMap = initData?.itemCategoryDetailMap || {};
				remainingEntries.sort((a, b) => {
					const baseA = a.hrid.replace(/\+\d+$/, "");
					const baseB = b.hrid.replace(/\+\d+$/, "");
					const detA = itemDetailMap[baseA];
					const detB = itemDetailMap[baseB];
					const catSortA = categoryDetailMap[detA?.categoryHrid]?.sortIndex ?? 9999;
					const catSortB = categoryDetailMap[detB?.categoryHrid]?.sortIndex ?? 9999;
					if (catSortA !== catSortB) return catSortA - catSortB;
					return (detA?.sortIndex ?? 9999) - (detB?.sortIndex ?? 9999);
				});
				const unorgTiles = remainingEntries.flatMap(({ tiles }) => tiles);
				orderCounter = this._assignTileOrders(unorgTiles, orderCounter, "");
			}
			return orderCounter;
		}
		/**
		* Handle a tile dropped onto a tab header (add or move item to that tab)
		* @param {string} hrid
		* @param {string} sourceTabId - empty string if from unorganized
		* @param {string} targetTabId
		*/
		async _onTileDropOnTab(hrid, sourceTabId, targetTabId) {
			if (sourceTabId === targetTabId) return;
			let newConfig;
			if (!sourceTabId) newConfig = addItem(this._config, targetTabId, hrid);
			else newConfig = moveItem(this._config, sourceTabId, targetTabId, hrid);
			this._config = newConfig;
			this._removeInjectedEls();
			this._applyLayout();
			this._save().catch((error) => {
				console.error("[CustomTabs] Failed to persist tile drop on tab:", error);
			});
		}
		/**
		* Handle a tile dropped onto the unorganized header (remove from tab)
		* @param {string} hrid
		* @param {string} sourceTabId
		*/
		async _onTileDropOnUnorganized(hrid, sourceTabId) {
			if (!sourceTabId) return;
			const newConfig = removeItem(this._config, sourceTabId, hrid);
			this._config = newConfig;
			this._removeInjectedEls();
			this._applyLayout();
			this._save().catch((error) => {
				console.error("[CustomTabs] Failed to persist tile drop on unorganized:", error);
			});
		}
		/**
		* Handle a tile reordered within its tab via drag & drop
		* @param {string} tabId
		* @param {string} draggedHrid
		* @param {string} targetHrid
		* @param {boolean} insertAfter - true to insert after target, false for before
		*/
		async _onTileReorder(tabId, draggedHrid, targetHrid, insertAfter) {
			if (draggedHrid === targetHrid) return;
			const result = findTab(this._config, tabId);
			if (!result) return;
			const items = result.tab.items;
			const fromIndex = items.indexOf(draggedHrid);
			const targetIndex = items.indexOf(targetHrid);
			if (fromIndex === -1 || targetIndex === -1) return;
			let toIndex = targetIndex;
			if (insertAfter) toIndex++;
			if (fromIndex < toIndex) toIndex--;
			const newConfig = reorderItem(this._config, tabId, fromIndex, toIndex);
			this._config = newConfig;
			this._removeInjectedEls();
			this._applyLayout();
			this._save().catch((error) => {
				console.error("[CustomTabs] Failed to persist tile reorder:", error);
			});
		}
		_openEditor(tabId) {
			this._editorTabId = tabId;
			this._deleteConfirmId = null;
			this._expandedSearchHrids = /* @__PURE__ */ new Set();
			const result = findTab(this._config, tabId);
			if (!result) return;
			const tab = result.tab;
			const overlay = document.createElement("div");
			overlay.className = "toolasha-ct-modal-overlay";
			let mousedownOnOverlay = false;
			overlay.addEventListener("mousedown", (e) => {
				mousedownOnOverlay = e.target === overlay;
			});
			overlay.addEventListener("click", (e) => {
				if (e.target === overlay && mousedownOnOverlay) {
					overlay.remove();
					this._removeInjectedEls();
					this._applyLayout();
				}
			});
			const modal = document.createElement("div");
			modal.className = "toolasha-ct-modal";
			modal.innerHTML = `
            <div class="toolasha-ct-modal-body">
                <h3>Edit Tab</h3>
                <label>Name</label>
                <input type="text" class="toolasha-ct-editor-name" value="${this._escHtml(tab.name)}">

                <label>Color</label>
                <div class="toolasha-ct-swatches"></div>

                <label>Add Category <span class="toolasha-ct-addall-label"><input type="checkbox" class="toolasha-ct-addall-cb"${src_core_config_js.default.getSetting("inventoryTabs_categoryAddAll") ? " checked" : ""}> All items</span></label>
                <div class="toolasha-ct-categories"></div>

                <label>From Loadout</label>
                <div class="toolasha-ct-loadouts"></div>

                <label>Items</label>
                <div class="toolasha-ct-search-row">
                    <input type="search" class="toolasha-ct-editor-search" placeholder="Search items to add...">
                    <select class="toolasha-ct-cat-filter">
                        <option value="">All</option>
                    </select>
                </div>
                <div class="toolasha-ct-search-results"></div>
                <div class="toolasha-ct-assigned-list"></div>
                <div style="margin-top:6px;">
                    <button class="toolasha-ct-add-linebreak-btn" style="background:#2a2a3a;color:#888;border:1px solid #444;border-radius:4px;padding:3px 10px;cursor:pointer;font-size:11px;">+ Line Break</button>
                </div>
            </div>

            <div class="toolasha-ct-modal-footer">
                <button class="toolasha-ct-delete-btn">Delete Tab</button>
                <button class="toolasha-ct-clear-btn">${(0, src_core_i18n_js.t)("Clear All")}</button>
                <button class="toolasha-ct-close-btn">Close</button>
            </div>
        `;
			overlay.appendChild(modal);
			document.body.appendChild(overlay);
			const nameInput = modal.querySelector(".toolasha-ct-editor-name");
			nameInput.focus();
			nameInput.addEventListener("change", () => {
				this._config = renameTab(this._config, tabId, nameInput.value.trim() || "Untitled");
				this._save();
			});
			const swatchContainer = modal.querySelector(".toolasha-ct-swatches");
			const isPreset = (color) => color === null || COLOR_PRESETS.includes(color);
			const applyColor = (color) => {
				this._config = setTabColor(this._config, tabId, color);
				this._save();
				this._applyLayout();
			};
			const updateActiveStates = (activeColor) => {
				swatchContainer.querySelectorAll(".toolasha-ct-swatch").forEach((s) => {
					s.classList.toggle("toolasha-ct-swatch--active", s.dataset.color === (activeColor ?? "__null__"));
				});
				colorPicker.classList.toggle("toolasha-ct-color-picker--active", !!activeColor && !isPreset(activeColor));
			};
			for (const color of [null, ...COLOR_PRESETS]) {
				const sw = document.createElement("span");
				sw.className = "toolasha-ct-swatch";
				sw.dataset.color = color ?? "__null__";
				sw.style.background = color || "#555";
				if (!color) {
					sw.textContent = "×";
					sw.style.textAlign = "center";
					sw.style.lineHeight = "18px";
					sw.style.fontSize = "12px";
				}
				sw.addEventListener("click", () => {
					applyColor(color);
					colorPicker.value = color || "#555555";
					hexInput.value = color || "";
					updateActiveStates(color);
				});
				swatchContainer.appendChild(sw);
			}
			const divider = document.createElement("span");
			divider.className = "toolasha-ct-swatch-divider";
			swatchContainer.appendChild(divider);
			const colorPicker = document.createElement("input");
			colorPicker.type = "color";
			colorPicker.className = "toolasha-ct-color-picker";
			colorPicker.title = "Custom color";
			colorPicker.value = tab.color && tab.color.startsWith("#") ? tab.color : "#888888";
			colorPicker.addEventListener("input", () => {
				const hex = colorPicker.value;
				hexInput.value = hex;
				applyColor(hex);
				updateActiveStates(hex);
			});
			swatchContainer.appendChild(colorPicker);
			const hexInput = document.createElement("input");
			hexInput.type = "text";
			hexInput.className = "toolasha-ct-hex-input";
			hexInput.placeholder = "#rrggbb";
			hexInput.maxLength = 7;
			hexInput.value = tab.color || "";
			hexInput.addEventListener("input", () => {
				const val = hexInput.value.trim();
				if (/^#[0-9a-fA-F]{6}$/.test(val)) {
					colorPicker.value = val;
					applyColor(val);
					updateActiveStates(val);
				}
			});
			swatchContainer.appendChild(hexInput);
			updateActiveStates(tab.color);
			this._renderCategoryButtons(modal.querySelector(".toolasha-ct-categories"), tabId);
			const addAllCb = modal.querySelector(".toolasha-ct-addall-cb");
			addAllCb.addEventListener("change", () => {
				src_core_config_js.default.setSetting("inventoryTabs_categoryAddAll", addAllCb.checked);
				this._renderCategoryButtons(modal.querySelector(".toolasha-ct-categories"), tabId);
			});
			this._renderLoadoutButtons(modal.querySelector(".toolasha-ct-loadouts"), tabId);
			this._populateCategoryFilter(modal.querySelector(".toolasha-ct-cat-filter"));
			const searchInput = modal.querySelector(".toolasha-ct-editor-search");
			const catFilter = modal.querySelector(".toolasha-ct-cat-filter");
			const resultsDiv = modal.querySelector(".toolasha-ct-search-results");
			let searchTimeout = null;
			const doSearch = () => {
				clearTimeout(searchTimeout);
				searchTimeout = setTimeout(() => {
					this._renderSearchResults(resultsDiv, searchInput.value.trim(), tabId, catFilter.value);
				}, 150);
			};
			searchInput.addEventListener("input", doSearch);
			catFilter.addEventListener("change", doSearch);
			this._renderAssignedItems(modal.querySelector(".toolasha-ct-assigned-list"), tabId);
			modal.querySelector(".toolasha-ct-add-linebreak-btn").addEventListener("click", () => {
				this._config = addLineBreak(this._config, tabId);
				this._save();
				this._renderAssignedItems(modal.querySelector(".toolasha-ct-assigned-list"), tabId);
				if (this._isActive) this._applyLayout();
			});
			const deleteBtn = modal.querySelector(".toolasha-ct-delete-btn");
			deleteBtn.addEventListener("click", () => {
				if (this._deleteConfirmId === tabId) {
					this._config = removeTab(this._config, tabId);
					this._save();
					overlay.remove();
					this._removeInjectedEls();
					this._applyLayout();
				} else {
					this._deleteConfirmId = tabId;
					deleteBtn.textContent = "Confirm Delete?";
					deleteBtn.style.background = "#a03030";
				}
			});
			let clearConfirm = false;
			const clearBtn = modal.querySelector(".toolasha-ct-clear-btn");
			clearBtn.addEventListener("click", () => {
				if (clearConfirm) {
					const currentTab = findTab(this._config, tabId)?.tab;
					if (currentTab) {
						for (const hrid of [...currentTab.items]) this._config = removeItem(this._config, tabId, hrid);
						this._save();
						this._renderCategoryButtons(modal.querySelector(".toolasha-ct-categories"), tabId);
						this._renderAssignedItems(modal.querySelector(".toolasha-ct-assigned-list"), tabId);
						if (this._isActive) this._applyLayout();
					}
					clearBtn.textContent = "Clear All";
					clearBtn.style.background = "";
					clearConfirm = false;
				} else {
					clearConfirm = true;
					clearBtn.textContent = "Confirm Clear?";
					clearBtn.style.background = "#6a3a00";
				}
			});
			modal.querySelector(".toolasha-ct-close-btn").addEventListener("click", () => {
				overlay.remove();
				this._removeInjectedEls();
				this._applyLayout();
			});
		}
		_renderSearchResults(container, query, tabId, categoryFilter) {
			container.innerHTML = "";
			if ((!query || query.length < 2) && !categoryFilter) return;
			const initData = src_core_data_manager_js.default.getInitClientData();
			if (!initData?.itemDetailMap) return;
			const lowerQuery = query ? query.toLowerCase() : "";
			const currentTab = findTab(this._config, tabId)?.tab;
			const currentItems = new Set(currentTab?.items || []);
			const levelMap = /* @__PURE__ */ new Map();
			for (const item of src_core_data_manager_js.default.getInventory() || []) if (item.itemLocationHrid === "/item_locations/inventory") {
				if (!levelMap.has(item.itemHrid)) levelMap.set(item.itemHrid, /* @__PURE__ */ new Set());
				levelMap.get(item.itemHrid).add(item.enhancementLevel || 0);
			}
			let count = 0;
			for (const [hrid, details] of Object.entries(initData.itemDetailMap)) {
				if (count >= 30) break;
				if (!details.name) continue;
				if (currentItems.has(hrid)) continue;
				if (categoryFilter && details.categoryHrid !== categoryFilter) continue;
				if (lowerQuery && !details.name.toLowerCase().includes(lowerQuery)) continue;
				const iconId = hrid.replace("/items/", "");
				const spriteUrl = getSpriteBaseUrl();
				const iconHref = spriteUrl ? `${spriteUrl}#${iconId}` : `#${iconId}`;
				const ownedLevels = levelMap.get(hrid);
				const maxLevel = details.equipmentDetail ? 20 : 0;
				const isExpandable = maxLevel > 0;
				const isExpanded = this._expandedSearchHrids?.has(hrid);
				if (isExpandable) if (isExpanded) {
					const headerRow = document.createElement("div");
					headerRow.className = "toolasha-ct-search-result toolasha-ct-search-group-header";
					headerRow.innerHTML = `<svg viewBox="0 0 32 32"><use href="${iconHref}"></use></svg><span>${this._escHtml(details.name)}</span><span class="toolasha-ct-expand-btn">▲</span>`;
					headerRow.addEventListener("click", () => {
						this._expandedSearchHrids.delete(hrid);
						this._renderSearchResults(container, query, tabId, categoryFilter);
					});
					container.appendChild(headerRow);
					const addAllRow = document.createElement("div");
					addAllRow.className = "toolasha-ct-search-result toolasha-ct-search-level-row";
					addAllRow.innerHTML = `<span style="color:#7dcea0;font-size:12px;padding-left:4px;">+ Add all levels (+0–+${maxLevel})</span>`;
					addAllRow.addEventListener("click", () => {
						for (let level = 0; level <= maxLevel; level++) {
							const levelHrid = level === 0 ? hrid : `${hrid}+${level}`;
							if (!currentItems.has(levelHrid)) this._config = addItem(this._config, tabId, levelHrid);
						}
						this._save();
						this._renderSearchResults(container, query, tabId, categoryFilter);
						this._renderAssignedItems(container.parentElement.querySelector(".toolasha-ct-assigned-list"), tabId);
						if (this._isActive) this._applyLayout();
					});
					container.appendChild(addAllRow);
					for (let level = 0; level <= maxLevel; level++) {
						const levelHrid = level === 0 ? hrid : `${hrid}+${level}`;
						if (currentItems.has(levelHrid)) continue;
						const owned = ownedLevels?.has(level);
						const levelRow = document.createElement("div");
						levelRow.className = "toolasha-ct-search-result toolasha-ct-search-level-row";
						const displayName = level === 0 ? details.name : `${details.name} +${level}`;
						const ownedDot = owned ? `<span style="color:#7dcea0;margin-left:4px;">In inventory</span>` : "";
						levelRow.innerHTML = `<svg viewBox="0 0 32 32"><use href="${iconHref}"></use></svg><span>${this._escHtml(displayName)}</span>${ownedDot}`;
						levelRow.addEventListener("click", () => {
							this._config = addItem(this._config, tabId, levelHrid);
							this._save();
							this._renderSearchResults(container, query, tabId, categoryFilter);
							this._renderAssignedItems(container.parentElement.querySelector(".toolasha-ct-assigned-list"), tabId);
							if (this._isActive) this._applyLayout();
						});
						container.appendChild(levelRow);
					}
				} else {
					const ownedBadges = ownedLevels ? [...ownedLevels].sort((a, b) => a - b).map((l) => `+${l}`).join(" ") : "";
					const row = document.createElement("div");
					row.className = "toolasha-ct-search-result toolasha-ct-search-group-header";
					row.innerHTML = `<svg viewBox="0 0 32 32"><use href="${iconHref}"></use></svg><span>${this._escHtml(details.name)}</span>${ownedBadges ? `<span class="toolasha-ct-level-badges">${this._escHtml(ownedBadges)}</span>` : ""}<span class="toolasha-ct-expand-btn">▶</span>`;
					row.querySelector(".toolasha-ct-expand-btn").addEventListener("click", (e) => {
						e.stopPropagation();
						if (!this._expandedSearchHrids) this._expandedSearchHrids = /* @__PURE__ */ new Set();
						this._expandedSearchHrids.add(hrid);
						this._renderSearchResults(container, query, tabId, categoryFilter);
					});
					row.addEventListener("click", () => {
						this._config = addItem(this._config, tabId, hrid);
						this._save();
						this._renderSearchResults(container, query, tabId, categoryFilter);
						this._renderAssignedItems(container.parentElement.querySelector(".toolasha-ct-assigned-list"), tabId);
						if (this._isActive) this._applyLayout();
					});
					container.appendChild(row);
				}
				else {
					const row = document.createElement("div");
					row.className = "toolasha-ct-search-result";
					row.innerHTML = `<svg viewBox="0 0 32 32"><use href="${iconHref}"></use></svg><span>${this._escHtml(details.name)}</span>`;
					row.addEventListener("click", () => {
						this._config = addItem(this._config, tabId, hrid);
						this._save();
						row.remove();
						this._renderAssignedItems(container.parentElement.querySelector(".toolasha-ct-assigned-list"), tabId);
						if (this._isActive) this._applyLayout();
					});
					container.appendChild(row);
				}
				count++;
			}
			if (count === 0) container.innerHTML = "<div style=\"color:#666;padding:6px;font-size:12px;\">No matching items found</div>";
		}
		_renderAssignedItems(container, tabId) {
			const scrollParent = container.closest(".toolasha-ct-modal-body");
			const scrollPos = scrollParent?.scrollTop ?? 0;
			container.innerHTML = "";
			const tab = findTab(this._config, tabId)?.tab;
			if (!tab || tab.items.length === 0) {
				container.innerHTML = "<div style=\"color:#555;font-size:12px;padding:4px;\">No items assigned</div>";
				if (scrollParent) scrollParent.scrollTop = scrollPos;
				return;
			}
			let dragFromIndex = null;
			tab.items.forEach((hrid, index) => {
				const row = document.createElement("div");
				row.className = "toolasha-ct-assigned-item";
				row.draggable = true;
				const handle = document.createElement("span");
				handle.className = "toolasha-ct-drag-handle";
				handle.textContent = "⠿";
				row.appendChild(handle);
				if (hrid === "__linebreak__") {
					const label = document.createElement("span");
					label.textContent = "─── Line Break ───";
					label.style.cssText = "color:#555;font-style:italic;font-size:11px;flex:1;text-align:center;";
					row.appendChild(label);
				} else {
					const enhanceMatch = hrid.match(/\+(\d+)$/);
					const baseHrid = enhanceMatch ? hrid.slice(0, hrid.length - enhanceMatch[0].length) : hrid;
					const level = enhanceMatch ? parseInt(enhanceMatch[1], 10) : 0;
					const baseName = src_core_data_manager_js.default.getItemDetails(baseHrid)?.name || baseHrid;
					const name = level > 0 ? `${baseName} +${level}` : baseName;
					const iconId = baseHrid.replace("/items/", "");
					const spriteUrl = getSpriteBaseUrl();
					const iconHref = spriteUrl ? `${spriteUrl}#${iconId}` : `#${iconId}`;
					const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					icon.setAttribute("viewBox", "0 0 32 32");
					icon.innerHTML = `<use href="${iconHref}"></use>`;
					row.appendChild(icon);
					const label = document.createElement("span");
					label.textContent = name;
					row.appendChild(label);
				}
				row.addEventListener("dragstart", (e) => {
					dragFromIndex = index;
					e.dataTransfer.effectAllowed = "move";
					row.style.opacity = "0.4";
				});
				row.addEventListener("dragend", () => {
					row.style.opacity = "";
					container.querySelectorAll(".toolasha-ct-drag-over").forEach((el) => el.classList.remove("toolasha-ct-drag-over"));
				});
				row.addEventListener("dragover", (e) => {
					e.preventDefault();
					e.dataTransfer.dropEffect = "move";
					container.querySelectorAll(".toolasha-ct-drag-over").forEach((el) => el.classList.remove("toolasha-ct-drag-over"));
					row.classList.add("toolasha-ct-drag-over");
				});
				row.addEventListener("dragleave", () => {
					row.classList.remove("toolasha-ct-drag-over");
				});
				row.addEventListener("drop", (e) => {
					e.preventDefault();
					row.classList.remove("toolasha-ct-drag-over");
					if (dragFromIndex !== null && dragFromIndex !== index) {
						this._config = reorderItem(this._config, tabId, dragFromIndex, index);
						this._save();
						this._renderAssignedItems(container, tabId);
						if (this._isActive) this._applyLayout();
					}
					dragFromIndex = null;
				});
				const toTopBtn = document.createElement("button");
				toTopBtn.className = "toolasha-ct-node-btn";
				toTopBtn.textContent = "⇈";
				toTopBtn.title = "Move to top";
				toTopBtn.style.marginLeft = "0";
				if (index === 0) toTopBtn.style.visibility = "hidden";
				else toTopBtn.addEventListener("click", () => {
					this._config = reorderItem(this._config, tabId, index, 0);
					this._save();
					this._renderAssignedItems(container, tabId);
					if (this._isActive) this._applyLayout();
				});
				row.appendChild(toTopBtn);
				const toBottomBtn = document.createElement("button");
				toBottomBtn.className = "toolasha-ct-node-btn";
				toBottomBtn.textContent = "⇊";
				toBottomBtn.title = "Move to bottom";
				toBottomBtn.style.marginLeft = "0";
				if (index >= tab.items.length - 1) toBottomBtn.style.visibility = "hidden";
				else toBottomBtn.addEventListener("click", () => {
					this._config = reorderItem(this._config, tabId, index, tab.items.length - 1);
					this._save();
					this._renderAssignedItems(container, tabId);
					if (this._isActive) this._applyLayout();
				});
				row.appendChild(toBottomBtn);
				const removeBtn = document.createElement("button");
				removeBtn.className = "toolasha-ct-node-btn";
				removeBtn.textContent = "×";
				removeBtn.title = "Remove";
				removeBtn.addEventListener("click", () => {
					this._config = removeItemAtIndex(this._config, tabId, index);
					if (hrid !== "__linebreak__") this._config = removeItemFromBindings(this._config, tabId, hrid);
					this._save();
					this._renderAssignedItems(container, tabId);
					if (this._isActive) this._applyLayout();
				});
				row.appendChild(removeBtn);
				container.appendChild(row);
			});
			if (scrollParent) scrollParent.scrollTop = scrollPos;
		}
		_getCategories() {
			const initData = src_core_data_manager_js.default.getInitClientData();
			if (!initData?.itemCategoryDetailMap) return [];
			const categories = [];
			for (const [hrid, detail] of Object.entries(initData.itemCategoryDetailMap)) if (detail?.name) categories.push({
				hrid,
				name: detail.name,
				sortIndex: detail.sortIndex ?? 9999
			});
			return categories.sort((a, b) => a.sortIndex - b.sortIndex);
		}
		_getItemsInCategory(categoryHrid) {
			const initData = src_core_data_manager_js.default.getInitClientData();
			if (!initData?.itemDetailMap) return [];
			const ownedHrids = src_core_config_js.default.getSettingValue("inventoryTabs_categoryAddAll") ? null : this._getOwnedItemHrids();
			const items = [];
			for (const [hrid, details] of Object.entries(initData.itemDetailMap)) if (details.categoryHrid === categoryHrid) {
				if (!ownedHrids || ownedHrids.has(hrid)) items.push({
					hrid,
					sortIndex: details.sortIndex ?? 9999
				});
			}
			items.sort((a, b) => a.sortIndex - b.sortIndex);
			return items.map((item) => item.hrid);
		}
		_getOwnedItemHrids() {
			const inventory = src_core_data_manager_js.default.getInventory() || [];
			const set = /* @__PURE__ */ new Set();
			for (const item of inventory) if (item.itemLocationHrid === "/item_locations/inventory") {
				set.add(item.itemHrid);
				if (item.enhancementLevel > 0) set.add(`${item.itemHrid}+${item.enhancementLevel}`);
			}
			return set;
		}
		_renderCategoryButtons(container, tabId) {
			container.innerHTML = "";
			const categories = this._getCategories();
			const currentTab = findTab(this._config, tabId)?.tab;
			const currentItems = new Set(currentTab?.items || []);
			for (const cat of categories) {
				const catItems = this._getItemsInCategory(cat.hrid);
				if (catItems.length === 0) continue;
				const allAlreadyAdded = catItems.every((hrid) => currentItems.has(hrid));
				const btn = document.createElement("button");
				btn.className = "toolasha-ct-cat-btn" + (allAlreadyAdded ? " toolasha-ct-cat-btn--added" : "");
				btn.textContent = cat.name;
				btn.title = allAlreadyAdded ? `Click to remove ${catItems.length} items from ${cat.name}` : `Add ${catItems.length} items from ${cat.name}`;
				if (allAlreadyAdded) btn.addEventListener("click", () => {
					for (const hrid of catItems) if (currentItems.has(hrid)) {
						this._config = removeItem(this._config, tabId, hrid);
						currentItems.delete(hrid);
					}
					this._save();
					this._renderCategoryButtons(container, tabId);
					const modal = container.closest(".toolasha-ct-modal");
					if (modal) this._renderAssignedItems(modal.querySelector(".toolasha-ct-assigned-list"), tabId);
					if (this._isActive) this._applyLayout();
				});
				else btn.addEventListener("click", () => {
					for (const hrid of catItems) if (!currentItems.has(hrid)) {
						this._config = addItem(this._config, tabId, hrid);
						currentItems.add(hrid);
					}
					this._save();
					this._renderCategoryButtons(container, tabId);
					const modal = container.closest(".toolasha-ct-modal");
					if (modal) this._renderAssignedItems(modal.querySelector(".toolasha-ct-assigned-list"), tabId);
					if (this._isActive) this._applyLayout();
				});
				container.appendChild(btn);
			}
		}
		/**
		* Check if any changed items have a higher enhancement level than what's in bindings.
		* Runs on every items_updated tick but only does cheap Set lookups for the changed items.
		* @param {Object} data - The items_updated event data
		*/
		_checkBindingEnhancements(data) {
			const changedItems = data?.endCharacterItems;
			if (!changedItems || changedItems.length === 0) return;
			if (!this._boundBaseHrids) this._rebuildBoundBaseHrids();
			if (this._boundBaseHrids.size === 0) return;
			const relevantBases = /* @__PURE__ */ new Set();
			for (const item of changedItems) {
				if (!item.itemHrid) continue;
				if (this._boundBaseHrids.has(item.itemHrid)) relevantBases.add(item.itemHrid);
			}
			if (relevantBases.size === 0) return;
			const inventory = src_core_data_manager_js.default.characterItems || [];
			let anyChanged = false;
			const loadoutSnapshot = getLoadoutSnapshot();
			const snapshots = loadoutSnapshot.snapshots || {};
			for (const baseHrid of relevantBases) {
				if (!this._boundBaseHrids) break;
				const loadoutLevels = this._boundBaseHrids.get(baseHrid);
				if (!loadoutLevels) continue;
				let highestOwned = -1;
				for (const item of inventory) if (item.itemHrid === baseHrid && item.count > 0) {
					const level = item.enhancementLevel || 0;
					if (level > highestOwned) highestOwned = level;
				}
				if (highestOwned < 0) continue;
				for (const [loadoutName, currentLevel] of loadoutLevels) {
					const snap = Object.values(snapshots).find((s) => s.name === loadoutName);
					if (!snap || snap.useExactEnhancement) continue;
					if (highestOwned === currentLevel) continue;
					const oldHrid = currentLevel > 0 ? `${baseHrid}+${currentLevel}` : baseHrid;
					const newHrid = highestOwned > 0 ? `${baseHrid}+${highestOwned}` : baseHrid;
					this._walkAndSwapBinding(oldHrid, newHrid, loadoutName);
					anyChanged = true;
					if (this._boundBaseHrids) this._boundBaseHrids.get(baseHrid)?.set(loadoutName, highestOwned);
				}
				loadoutSnapshot.updateEnhancementLevel(baseHrid, highestOwned);
			}
			if (anyChanged) {
				this._save();
				if (this._isActive) this._applyLayout();
			}
		}
		/**
		* Build a Map of baseHrid → Map<loadoutName, currentLevel> across all bindings.
		* Per-loadout granularity lets us update each binding independently based on
		* its own snapshot's useExactEnhancement flag. Cached and invalidated when
		* bindings change.
		*/
		_rebuildBoundBaseHrids() {
			this._boundBaseHrids = /* @__PURE__ */ new Map();
			const walk = (tabs) => {
				for (const tab of tabs) {
					if (tab.loadoutBindings) for (const [loadoutName, items] of Object.entries(tab.loadoutBindings)) for (const hrid of items) {
						const base = getBaseHrid(hrid);
						const plusIdx = hrid.lastIndexOf("+");
						const level = plusIdx !== -1 && /^\d+$/.test(hrid.substring(plusIdx + 1)) ? parseInt(hrid.substring(plusIdx + 1), 10) : 0;
						if (!this._boundBaseHrids.has(base)) this._boundBaseHrids.set(base, /* @__PURE__ */ new Map());
						const loadoutLevels = this._boundBaseHrids.get(base);
						if (level > (loadoutLevels.get(loadoutName) ?? -1)) loadoutLevels.set(loadoutName, level);
					}
					if (tab.children.length > 0) walk(tab.children);
				}
			};
			walk(this._config.tabs);
		}
		/**
		* Swap an old HRID for a new one in all loadout bindings across all tabs.
		* @param {string} oldHrid
		* @param {string} newHrid
		*/
		/**
		* Swap an old HRID for a new one in loadout bindings across all tabs.
		* @param {string} oldHrid
		* @param {string} newHrid
		* @param {string|null} restrictToLoadoutName - When set, only swap inside
		*   bindings for this loadout. tab.items is swapped only if no other
		*   loadout on the same tab still references oldHrid.
		*/
		_walkAndSwapBinding(oldHrid, newHrid, restrictToLoadoutName = null) {
			const walk = (tabs) => {
				for (const tab of tabs) {
					if (tab.loadoutBindings) {
						let swappedInLoadout = false;
						let oldHridStillReferenced = false;
						for (const [name, items] of Object.entries(tab.loadoutBindings)) {
							if (restrictToLoadoutName && name !== restrictToLoadoutName) {
								if (items.includes(oldHrid)) oldHridStillReferenced = true;
								continue;
							}
							const idx = items.indexOf(oldHrid);
							if (idx !== -1) {
								items[idx] = newHrid;
								swappedInLoadout = true;
							}
						}
						if (swappedInLoadout && !oldHridStillReferenced) {
							const itemIdx = tab.items.indexOf(oldHrid);
							if (itemIdx !== -1) tab.items[itemIdx] = newHrid;
						}
					}
					if (tab.children.length > 0) walk(tab.children);
				}
			};
			walk(this._config.tabs);
		}
		/**
		* Handle loadout snapshot updates — sync bound tabs automatically.
		* Called whenever any loadout is created/updated/deleted in-game.
		*/
		_onLoadoutSnapshotUpdate() {
			const snapshots = getLoadoutSnapshot().snapshots;
			const currentSnapshotNames = new Set(Object.values(snapshots).map((s) => s.name));
			const includeConsumables = src_core_config_js.default.getSetting("inventoryTabs_loadoutIncludeConsumables");
			let anyChanged = false;
			const walkAndSync = (tabs) => {
				for (const tab of tabs) {
					if (tab.loadoutBindings && Object.keys(tab.loadoutBindings).length > 0) {
						for (const [loadoutName, _boundItems] of Object.entries(tab.loadoutBindings)) {
							const snapshot = Object.values(snapshots).find((s) => s.name === loadoutName);
							if (!snapshot) continue;
							const newItems = [];
							for (const eq of snapshot.equipment || []) {
								if (!eq.itemHrid) continue;
								const hrid = eq.enhancementLevel > 0 ? `${eq.itemHrid}+${eq.enhancementLevel}` : eq.itemHrid;
								newItems.push(hrid);
							}
							if (includeConsumables) {
								for (const f of snapshot.food || []) if (f.itemHrid) newItems.push(f.itemHrid);
								for (const d of snapshot.drinks || []) if (d.itemHrid) newItems.push(d.itemHrid);
							}
							const result = syncLoadoutBinding(this._config, tab.id, loadoutName, newItems);
							if (result.changed) {
								this._config = result.config;
								anyChanged = true;
							}
						}
						const orphanResult = cleanOrphanedBindings(this._config, tab.id, currentSnapshotNames);
						if (orphanResult.changed) {
							this._config = orphanResult.config;
							anyChanged = true;
						}
					}
					if (tab.children.length > 0) walkAndSync(tab.children);
				}
			};
			walkAndSync(this._config.tabs);
			if (anyChanged) {
				this._boundBaseHrids = null;
				this._save();
				if (this._isActive) this._applyLayout();
			}
		}
		_renderLoadoutButtons(container, tabId) {
			container.innerHTML = "";
			const snapshots = getLoadoutSnapshot().snapshots;
			const entries = Object.values(snapshots);
			if (entries.length === 0) {
				const msg = document.createElement("span");
				msg.style.cssText = "font-size:11px;color:#888;";
				msg.textContent = "No loadout snapshots — open your loadout panel first.";
				container.appendChild(msg);
				return;
			}
			const includeConsumables = src_core_config_js.default.getSetting("inventoryTabs_loadoutIncludeConsumables");
			const currentTab = findTab(this._config, tabId)?.tab;
			const currentItems = new Set(currentTab?.items || []);
			entries.sort((a, b) => a.name.localeCompare(b.name));
			for (const snapshot of entries) {
				const skillLabel = snapshot.actionTypeHrid ? snapshot.actionTypeHrid.split("/").pop().replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "All Skills";
				const loadoutItems = [];
				for (const eq of snapshot.equipment || []) {
					if (!eq.itemHrid) continue;
					const hrid = eq.enhancementLevel > 0 ? `${eq.itemHrid}+${eq.enhancementLevel}` : eq.itemHrid;
					loadoutItems.push(hrid);
				}
				if (includeConsumables) {
					for (const f of snapshot.food || []) if (f.itemHrid) loadoutItems.push(f.itemHrid);
					for (const d of snapshot.drinks || []) if (d.itemHrid) loadoutItems.push(d.itemHrid);
				}
				const newItems = loadoutItems.filter((h) => !currentItems.has(h));
				const allAdded = newItems.length === 0 && loadoutItems.length > 0;
				const btn = document.createElement("button");
				btn.className = "toolasha-ct-cat-btn" + (allAdded ? " toolasha-ct-cat-btn--added" : "");
				btn.textContent = `${snapshot.name} (${skillLabel})`;
				btn.title = allAdded ? `All items from "${snapshot.name}" already added` : `Add ${newItems.length} item(s) from "${snapshot.name}"`;
				btn.addEventListener("click", () => {
					for (const hrid of newItems) {
						this._config = addItem(this._config, tabId, hrid);
						currentItems.add(hrid);
					}
					if (loadoutItems.length > 0) {
						this._config = addLoadoutBinding(this._config, tabId, snapshot.name, loadoutItems);
						this._boundBaseHrids = null;
					}
					this._save();
					this._renderLoadoutButtons(container, tabId);
					const modal = container.closest(".toolasha-ct-modal");
					if (modal) this._renderAssignedItems(modal.querySelector(".toolasha-ct-assigned-list"), tabId);
					if (this._isActive) this._applyLayout();
				});
				container.appendChild(btn);
			}
		}
		_populateCategoryFilter(select) {
			for (const cat of this._getCategories()) {
				const opt = document.createElement("option");
				opt.value = cat.hrid;
				opt.textContent = cat.name;
				select.appendChild(opt);
			}
		}
		_onAddTab(parentId) {
			const result = addTab(this._config, parentId, "New Tab");
			this._config = result.config;
			this._config = setTabOpen(this._config, result.tabId, true);
			this._removeInjectedEls();
			this._applyLayout();
			this._openEditor(result.tabId);
			this._save();
		}
		_onDeleteTab(tabId) {
			this._config = removeTab(this._config, tabId);
			this._save();
			this._removeInjectedEls();
			this._applyLayout();
		}
		_onToggleTabOpen(tabId, open) {
			this._config = setTabOpen(this._config, tabId, open);
			this._save();
			this._removeInjectedEls();
			this._applyLayout();
		}
		_onSetAllTabsOpen(open) {
			this._config = setAllTabsOpen(this._config, open);
			this._removeInjectedEls();
			this._applyLayout();
			this._save().catch((error) => {
				console.error("[CustomTabs] Failed to persist expand/collapse all:", error);
			});
		}
		_onReorderTab(draggedId, targetId) {
			const dragResult = findTab(this._config, draggedId);
			const targetResult = findTab(this._config, targetId);
			if (!dragResult || !targetResult) return;
			const dragParent = dragResult.parent;
			if (dragParent !== targetResult.parent) return;
			const targetIndex = (dragParent ? dragParent.children : this._config.tabs).findIndex((t) => t.id === targetId);
			this._config = moveTab(this._config, draggedId, targetIndex);
			this._save();
			this._removeInjectedEls();
			this._applyLayout();
		}
		async _save() {
			await saveConfig(src_core_data_manager_js.default.getCurrentCharacterId(), this._config);
		}
		/**
		* Inject an "Add to Tab" dropdown into the game's item action menu.
		* @param {HTMLElement} actionMenu
		*/
		_injectAddToTabButton(actionMenu) {
			if (actionMenu.querySelector(".toolasha-ct-add-to-tab")) return;
			if (!this._config?.tabs?.length) return;
			const nameEl = actionMenu.querySelector("[class*=\"Item_name\"]");
			if (!nameEl) return;
			const itemName = nameEl.textContent.trim();
			const hrid = this._nameToHrid(itemName);
			if (!hrid) return;
			const enhEl = actionMenu.querySelector("[class*=\"Item_enhancementLevel\"]");
			const enhLevel = enhEl ? parseInt(enhEl.textContent.trim().replace("+", ""), 10) : 0;
			const itemHrid = !isNaN(enhLevel) && enhLevel > 0 ? `${hrid}+${enhLevel}` : hrid;
			const wrapper = document.createElement("div");
			wrapper.className = "toolasha-ct-add-to-tab";
			wrapper.style.cssText = "position: relative; width: 100%;";
			const toggle = document.createElement("button");
			const existingBtn = actionMenu.querySelector("button");
			if (existingBtn) toggle.className = existingBtn.className;
			toggle.style.cssText = "display: flex; justify-content: space-between; align-items: center; width: 100%;";
			const label = document.createElement("span");
			label.style.cssText = "flex: 1; text-align: center;";
			label.textContent = "Add to Tab";
			const chevron = document.createElement("span");
			chevron.style.cssText = "font-size: 0.65em; transition: transform 0.15s; display: inline-block;";
			chevron.textContent = "▼";
			toggle.appendChild(label);
			toggle.appendChild(chevron);
			const panel = document.createElement("div");
			panel.style.cssText = `
            display: none;
            position: absolute;
            top: calc(100% + 4px);
            left: 0;
            width: 100%;
            z-index: 9999;
            flex-direction: column;
            background: var(--color-surface, #1e1e2e);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 6px 20px rgba(0,0,0,0.6);
            padding: 4px;
            gap: 3px;
            box-sizing: border-box;
        `;
			const flatTabs = this._flattenTabs(this._config.tabs);
			for (const { tab, depth } of flatTabs) {
				const alreadyAdded = tab.items.includes(itemHrid);
				const btn = document.createElement("button");
				btn.textContent = "\xA0".repeat(depth * 2) + tab.name;
				btn.style.cssText = `
                display: block;
                width: 100%;
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                cursor: ${alreadyAdded ? "default" : "pointer"};
                font-size: 0.85rem;
                font-weight: 600;
                color: ${alreadyAdded ? "#888" : "#fff"};
                background: ${tab.color ? tab.color + "55" : "rgba(255,255,255,0.08)"};
                text-align: left;
                transition: opacity 0.15s;
            `;
				if (tab.color && !alreadyAdded) btn.style.borderLeft = `3px solid ${tab.color}`;
				if (alreadyAdded) btn.title = "Already in this tab";
				else {
					btn.addEventListener("mouseenter", () => {
						btn.style.opacity = "0.8";
					});
					btn.addEventListener("mouseleave", () => {
						btn.style.opacity = "1";
					});
					btn.addEventListener("click", (e) => {
						e.stopPropagation();
						e.preventDefault();
						this._config = addItem(this._config, tab.id, itemHrid);
						this._save();
						if (this._isActive) {
							this._removeInjectedEls();
							this._applyLayout();
						}
						closePanel();
						document.dispatchEvent(new KeyboardEvent("keydown", {
							key: "Escape",
							code: "Escape",
							keyCode: 27,
							which: 27,
							bubbles: true,
							cancelable: true
						}));
					});
				}
				panel.appendChild(btn);
			}
			let open = false;
			let outsideBound = false;
			let outsideTimer = null;
			const outsideClick = (e) => {
				if (!wrapper.contains(e.target)) closePanel();
			};
			const closePanel = () => {
				open = false;
				panel.style.display = "none";
				chevron.style.transform = "";
				if (outsideTimer !== null) {
					clearTimeout(outsideTimer);
					outsideTimer = null;
				}
				if (outsideBound) {
					document.removeEventListener("click", outsideClick);
					outsideBound = false;
				}
			};
			toggle.addEventListener("click", (e) => {
				e.stopPropagation();
				e.preventDefault();
				if (open) {
					closePanel();
					return;
				}
				open = true;
				panel.style.display = "flex";
				chevron.style.transform = "rotate(180deg)";
				if (!outsideBound && outsideTimer === null) outsideTimer = setTimeout(() => {
					outsideTimer = null;
					if (!open || outsideBound) return;
					document.addEventListener("click", outsideClick);
					outsideBound = true;
				}, 0);
			});
			wrapper.appendChild(toggle);
			wrapper.appendChild(panel);
			actionMenu.appendChild(wrapper);
		}
		/**
		* Flatten the tab tree depth-first into [{tab, depth}] pairs.
		* @param {Array} tabs
		* @param {number} depth
		* @returns {Array<{tab: Object, depth: number}>}
		*/
		_flattenTabs(tabs, depth = 0) {
			const result = [];
			for (const tab of tabs) {
				result.push({
					tab,
					depth
				});
				if (tab.children.length > 0) result.push(...this._flattenTabs(tab.children, depth + 1));
			}
			return result;
		}
		_escHtml(str) {
			const div = document.createElement("div");
			div.textContent = str;
			return div.innerHTML;
		}
	};
	//#endregion
	//#region src/features/inventory/custom-tabs/custom-tabs-feature.js
	/**
	* Custom Inventory Tabs — Feature Entry Point
	* Adds a "Toolasha" tab to the character panel for user-defined inventory organization.
	*/
	var CustomTabsFeature = class {
		constructor() {
			this.ui = null;
		}
		async initialize() {
			if (!src_core_config_js.default.getSetting("inventoryTabs")) return;
			this.ui = new CustomTabsUI();
			await this.ui.initialize();
		}
		disable() {
			this.ui?.cleanup();
			this.ui = null;
		}
	};
	var customTabsFeature = new CustomTabsFeature();
	var custom_tabs_feature_default = {
		name: "Custom Inventory Tabs",
		initialize: () => customTabsFeature.initialize(),
		disable: () => customTabsFeature.disable()
	};
	//#endregion
	//#region src/libraries/market.js
	/**
	* Market Library
	* Market, inventory, and economy features
	*
	* Exports to: window.Toolasha.Market
	*/
	var toolashaRoot = window.Toolasha || {};
	window.Toolasha = toolashaRoot;
	if (typeof unsafeWindow !== "undefined") unsafeWindow.Toolasha = toolashaRoot;
	toolashaRoot.Market = {
		tooltipPrices,
		expectedValueCalculator,
		tooltipConsumables,
		marketFilter,
		marketSort,
		autoFillPrice,
		autoClickMax,
		itemCountDisplay,
		listingPriceDisplay,
		estimatedListingAge,
		queueLengthEstimator,
		marketOrderTotals,
		marketHistoryViewer,
		listingRefreshNavigator,
		philoCalculator,
		tradeHistory,
		tradeHistoryDisplay,
		networkAlert,
		profitCalculator,
		alchemyProfitCalculator,
		networthFeature,
		inventoryBadgeManager,
		inventorySort,
		inventoryBadgePrices,
		dungeonTokenTooltips: dungeon_token_tooltips_default,
		autoAllButton: auto_all_button_default,
		inventoryCategoryTotals,
		customTabsFeature: custom_tabs_feature_default,
		marketplaceShortcuts,
		sellQueue: sell_queue_default,
		milkywayMarketLink
	};
	console.log("[Toolasha] Market library loaded");
	//#endregion
})(Toolasha.Core.config, Toolasha.Core.dataManager, Toolasha.Core.domObserver, Toolasha.Core.marketAPI, Toolasha.Utils.houseEfficiency, Toolasha.Utils.efficiency, Toolasha.Utils.bonusRevenueCalculator, Toolasha.Utils.enhancementCalculator, Toolasha.Utils.formatters, Toolasha.Utils.marketData, Toolasha.Utils.teaParser, Toolasha.Core.i18n, Toolasha.Core.storage, Toolasha.Utils.profitConstants, Toolasha.Utils.profitHelpers, Toolasha.Utils.buffParser, Toolasha.Utils.equipmentParser, Toolasha.Utils.actionCalculator, Toolasha.Utils.tokenValuation, Toolasha.Utils.enhancementConfig, Toolasha.Utils.dom, Toolasha.Utils.materialCalculator, Toolasha.Utils.timerRegistry, Toolasha.Utils.cleanupRegistry, Toolasha.Utils.domObserverHelpers, Toolasha.Utils.enhancementMultipliers, Toolasha.Utils.reactInput, Toolasha.Core.webSocketHook, Toolasha.Utils.abilityCalc, Toolasha.Utils.houseCostCalculator);
