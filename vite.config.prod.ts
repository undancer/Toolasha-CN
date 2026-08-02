import { rm } from 'node:fs/promises';
import { dirname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build as viteBuild, defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
// @ts-ignore
import pkg from './package.json' with { type: 'json' };
import type { Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, 'dist');

// 库文件头格式：名字 + 描述 + 版本 + 版权
// 版本号构建时从 package.json 注入，无需模板文件或手工维护
const LIBRARY_LICENSE = 'CC-BY-NC-SA-4.0';

const renderLibraryHeader = (name: string, description: string) => `/**
 * ${name}
 * ${description}
 * Version: ${pkg.version}
 * License: ${LIBRARY_LICENSE}
 */
`;

const libraryHeaderCore = renderLibraryHeader('Toolasha Core Library', 'Core infrastructure and API clients');
const libraryHeaderUtils = renderLibraryHeader('Toolasha Utils Library', 'All utility modules');
const libraryHeaderMarket = renderLibraryHeader('Toolasha Market Library', 'Market, inventory, and economy features');
const libraryHeaderActions = renderLibraryHeader('Toolasha Actions Library', 'Production, gathering, and alchemy features');
const libraryHeaderCombat = renderLibraryHeader('Toolasha Combat Library', 'Combat, abilities, and combat stats features');
const libraryHeaderUI = renderLibraryHeader('Toolasha UI Library', 'UI enhancements, tasks, skills, and misc features');

// ---------------------------------------------------------------------------
// external / globals 映射（复用 rollup.config.js 的依赖链逻辑）
// 统一为“正斜杠绝对路径”作为 key，保证 external 匹配与 globals 查找一致
// ---------------------------------------------------------------------------
const normalizeModuleId = (id: string) => (id ? normalize(id.split('?')[0]).replace(/\\/g, '/') : id);
const srcId = (rel: string) => normalize(join(__dirname, 'src', rel)).replace(/\\/g, '/');

const coreExternalGlobals = new Map<string, string>([
    [srcId('core/i18n.js'), 'Toolasha.Core.i18n'],
    [srcId('core/storage.js'), 'Toolasha.Core.storage'],
    [srcId('core/config.js'), 'Toolasha.Core.config'],
    [srcId('core/websocket.js'), 'Toolasha.Core.webSocketHook'],
    [srcId('core/dom-observer.js'), 'Toolasha.Core.domObserver'],
    [srcId('core/data-manager.js'), 'Toolasha.Core.dataManager'],
    [srcId('core/feature-registry.js'), 'Toolasha.Core.featureRegistry'],
    [srcId('core/settings-storage.js'), 'Toolasha.Core.settingsStorage'],
    [srcId('core/settings-schema.js'), 'Toolasha.Core'],
    [srcId('core/profile-manager.js'), 'Toolasha.Core.profileManager'],
    [srcId('api/marketplace.js'), 'Toolasha.Core.marketAPI'],
]);

const utilsExternalGlobals = new Map<string, string>([
    [srcId('utils/formatters.js'), 'Toolasha.Utils.formatters'],
    [srcId('utils/efficiency.js'), 'Toolasha.Utils.efficiency'],
    [srcId('utils/profit-helpers.js'), 'Toolasha.Utils.profitHelpers'],
    [srcId('utils/profit-constants.js'), 'Toolasha.Utils.profitConstants'],
    [srcId('utils/dom.js'), 'Toolasha.Utils.dom'],
    [srcId('utils/dom-observer-helpers.js'), 'Toolasha.Utils.domObserverHelpers'],
    [srcId('utils/timer-registry.js'), 'Toolasha.Utils.timerRegistry'],
    [srcId('utils/bonus-revenue-calculator.js'), 'Toolasha.Utils.bonusRevenueCalculator'],
    [srcId('utils/enhancement-multipliers.js'), 'Toolasha.Utils.enhancementMultipliers'],
    [srcId('utils/experience-parser.js'), 'Toolasha.Utils.experienceParser'],
    [srcId('utils/market-listings.js'), 'Toolasha.Utils.marketListings'],
    [srcId('utils/action-calculator.js'), 'Toolasha.Utils.actionCalculator'],
    [srcId('utils/action-panel-helper.js'), 'Toolasha.Utils.actionPanelHelper'],
    [srcId('utils/tea-parser.js'), 'Toolasha.Utils.teaParser'],
    [srcId('utils/buff-parser.js'), 'Toolasha.Utils.buffParser'],
    [srcId('utils/selectors.js'), 'Toolasha.Utils.selectors'],
    [srcId('utils/house-efficiency.js'), 'Toolasha.Utils.houseEfficiency'],
    [srcId('utils/experience-calculator.js'), 'Toolasha.Utils.experienceCalculator'],
    [srcId('utils/market-data.js'), 'Toolasha.Utils.marketData'],
    [srcId('utils/ability-cost-calculator.js'), 'Toolasha.Utils.abilityCalc'],
    [srcId('utils/equipment-parser.js'), 'Toolasha.Utils.equipmentParser'],
    [srcId('utils/ui-components.js'), 'Toolasha.Utils.uiComponents'],
    [srcId('utils/enhancement-config.js'), 'Toolasha.Utils.enhancementConfig'],
    [srcId('utils/enhancement-gear-detector.js'), 'Toolasha.Utils.enhancementGearDetector'],
    [srcId('utils/react-input.js'), 'Toolasha.Utils.reactInput'],
    [srcId('utils/material-calculator.js'), 'Toolasha.Utils.materialCalculator'],
    [srcId('utils/token-valuation.js'), 'Toolasha.Utils.tokenValuation'],
    [srcId('utils/pricing-helper.js'), 'Toolasha.Utils.pricingHelper'],
    [srcId('utils/cleanup-registry.js'), 'Toolasha.Utils.cleanupRegistry'],
    [srcId('utils/house-cost-calculator.js'), 'Toolasha.Utils.houseCostCalculator'],
    [srcId('utils/enhancement-calculator.js'), 'Toolasha.Utils.enhancementCalculator'],
]);

// Combat 功能模块被 ui 跨库导入：必须 external 以引用共享的 Combat.* 全局，
// 而不是各自打包一份副本。目前为空，保留作跨库单例扩展点。
const combatFeatureExternals = new Map<string, string>([]);

// Market 模块被 combat/actions/ui 跨库导入：必须 external 以引用共享的 Market.* 全局。
const marketExternalGlobals = new Map<string, string>([
    [srcId('features/market/expected-value-calculator.js'), 'Toolasha.Market.expectedValueCalculator'],
    [srcId('features/market/profit-calculator.js'), 'Toolasha.Market.profitCalculator'],
    [srcId('features/market/alchemy-profit-calculator.js'), 'Toolasha.Market.alchemyProfitCalculator'],
]);

const buildGlobals = (globalsMap: Map<string, string>) => Object.fromEntries(globalsMap.entries());
const buildExternal = (globalsMap: Map<string, string>) => (id: string) => globalsMap.has(normalizeModuleId(id));

const sharedCoreGlobals = buildGlobals(coreExternalGlobals);
const sharedFeatureGlobals = buildGlobals(new Map([...coreExternalGlobals, ...utilsExternalGlobals]));

// ---------------------------------------------------------------------------
// worker-bundle 插件（与 vite.config.dev.ts 相同）
// ---------------------------------------------------------------------------
function workerBundlePlugin(): Plugin {
    const suffix = '?worker';
    const cache = new Map<string, string>();
    return {
        name: 'worker-bundle',
        enforce: 'pre',
        resolveId(source, importer) {
            if (source.endsWith(suffix) && importer) {
                const basePath = dirname(importer);
                const workerPath = join(basePath, source.replace(suffix, ''));
                return workerPath + suffix;
            }
            return null;
        },
        async load(id) {
            if (!id.endsWith(suffix)) return null;

            const entryPath = id.replace(suffix, '');

            // 缓存以避免同一轮构建中重复打包
            if (cache.has(entryPath)) return cache.get(entryPath);

            // 用独立的 Vite 构建打包 worker 入口为 IIFE 字符串
            const buildResult = await viteBuild({
                configFile: false,
                logLevel: 'error',
                build: {
                    write: false,
                    minify: false,
                    rolldownOptions: {
                        onLog(level, log, defaultHandler) {
                            // 屏蔽来自 heap-js 的循环依赖警告
                            if (level === 'warn' && log.code === 'CIRCULAR_DEPENDENCY') return;
                            defaultHandler(level, log);
                        },
                    },
                    lib: {
                        entry: entryPath,
                        formats: ['iife'],
                        name: 'CombatSimWorker',
                        fileName: () => 'combat-sim-worker.js',
                    },
                },
            });

            const output = (Array.isArray(buildResult) ? buildResult[0] : buildResult).output;
            const code = output[0].code;
            const result = `export default ${JSON.stringify(code)};`;
            cache.set(entryPath, result);
            return result;
        },
    };
}

/**
 * banner 注入插件。
 * Rolldown 已知问题（vitejs/vite#21076、vitejs/rolldown-vite#459）：
 * `output.banner` 配置后不会写入产物。改用 generateBundle 钩子手动拼接。
 */
function bannerPlugin(bannerText: string): Plugin {
    return {
        name: 'userscript-banner',
        enforce: 'post',
        generateBundle(_options, bundle: Record<string, any>) {
            for (const fileName of Object.keys(bundle)) {
                const chunk = bundle[fileName];
                if (chunk.type === 'chunk') {
                    chunk.code = bannerText + '\n' + chunk.code;
                }
            }
        },
    };
}

// ---------------------------------------------------------------------------
// entrypoint：由 vite-plugin-monkey 生成 userscript 元数据（与 vite.config.dev.ts
// 的 userscript 配置统一），额外追加 6 个库的 @require。
// dist/ 被 .gitignore 忽略，main 分支不包含产物；release 流程把 dist 提交到
// releases 分支，故库文件由 jsdelivr `gh` 直连 releases 分支提供。
// ---------------------------------------------------------------------------
const LIBRARY_REQUIRES = [
    'https://cdn.jsdelivr.net/gh/undancer/Toolasha-CN@releases/dist/libraries/toolasha-core.js',
    'https://cdn.jsdelivr.net/gh/undancer/Toolasha-CN@releases/dist/libraries/toolasha-utils.js',
    'https://cdn.jsdelivr.net/gh/undancer/Toolasha-CN@releases/dist/libraries/toolasha-market.js',
    'https://cdn.jsdelivr.net/gh/undancer/Toolasha-CN@releases/dist/libraries/toolasha-actions.js',
    'https://cdn.jsdelivr.net/gh/undancer/Toolasha-CN@releases/dist/libraries/toolasha-combat.js',
    'https://cdn.jsdelivr.net/gh/undancer/Toolasha-CN@releases/dist/libraries/toolasha-ui.js',
];

/**
 * entrypoint 的 monkey 插件：生成 userscript 头 + 单文件 IIFE 打包。
 * monkey 内部会独立调用 vite build（configFile: false），不会递归触发编排插件。
 */
function entrypointMonkeyPlugin() {
    return monkey({
        entry: 'src/entrypoint.js',
        userscript: {
            name: 'Toolasha-CN',
            namespace: 'http://tampermonkey.net/',
            version: pkg.version,
            downloadURL: 'https://github.com/undancer/Toolasha-CN/releases/latest/download/Toolasha.user.js',
            updateURL: 'https://github.com/undancer/Toolasha-CN/releases/latest/download/Toolasha.user.js',
            description: 'Toolasha - Enhanced tools for Milky Way Idle.',
            icon: 'https://www.google.com/s2/favicons?sz=64&domain=milkywayidle.com',
            author: 'Celasha and Claude, thank you to bot7420, DrDucky, Frotty, Truth_Light, AlphB, qu, and sentientmilk, for providing the basis for a lot of this. Thank you to Shykai, amVoidGuy,  vlad and kuganDev for their immense work on the combat sim. A big special thanks to Paradoxian for the immense bug finding, testing and verbose posts. Thank you to Miku, Orvel, Jigglymoose, Incinarator, Knerd, Maarg, SilkyPanda, MekaPyon! and others for their time and help. Thank you to Steez for testing and helping me figure out where I\'m wrong! Thank you to Tib for his generous contribution of the Character Cards. Thank you SilkyPanda for contributing a few features! Thank you to Sapnas for -deeply- testing and singlehandedly help me improve performance. Special thanks to Zaeter for the name. Thank you also to vidonnus for helping with infrastructure, bug fixes, engineering, issue raising and more.',
            license: 'CC-BY-NC-SA-4.0',
            'run-at': 'document-start',
            match: [
                'https://www.milkywayidle.com/*',
                'https://milkywayidlecn.com/*',
                'https://test.milkywayidle.com/*',
                'https://shykai.github.io/MWICombatSimulatorTest/dist/*',
            ],
            grant: [
                'GM_addStyle',
                'GM.xmlHttpRequest',
                'GM_xmlhttpRequest',
                'GM_notification',
                'GM_getValue',
                'GM_setValue',
                'unsafeWindow',
            ],
            require: [
                'https://cdnjs.cloudflare.com/ajax/libs/mathjs/12.4.2/math.js',
                'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js',
                'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0/dist/chartjs-plugin-datalabels.min.js',
                ...LIBRARY_REQUIRES,
            ],
        },
        build: {
            fileName: 'Toolasha.user.js',
            // 保持 grant 列表与上面声明的完全一致，不要从打包产物中自动收集
            autoGrant: false,
        },
        generate: ({ userscript }) =>
            `${userscript}\n// Note: Combat Sim auto-import requires Tampermonkey for cross-domain storage. Not available on Steam (use manual clipboard copy/paste instead).`,
    });
}

// ---------------------------------------------------------------------------
// 库构建定义（依赖链：core → utils → market → actions/combat/ui → entrypoint）
// ---------------------------------------------------------------------------
interface LibraryConfig {
    key: string;
    entry: string;
    globalName: string;
    fileName: string;
    banner: string;
    external?: (id: string) => boolean;
    globals?: Record<string, string>;
}

const libs: LibraryConfig[] = [
    {
        key: 'core',
        entry: 'src/libraries/core.js',
        globalName: 'ToolashaCore',
        fileName: 'libraries/toolasha-core.js',
        banner: libraryHeaderCore,
    },
    {
        key: 'utils',
        entry: 'src/libraries/utils.js',
        globalName: 'ToolashaUtils',
        fileName: 'libraries/toolasha-utils.js',
        banner: libraryHeaderUtils,
        external: buildExternal(coreExternalGlobals),
        globals: sharedCoreGlobals,
    },
    {
        key: 'market',
        entry: 'src/libraries/market.js',
        globalName: 'ToolashaMarket',
        fileName: 'libraries/toolasha-market.js',
        banner: libraryHeaderMarket,
        external: buildExternal(new Map([...coreExternalGlobals, ...utilsExternalGlobals])),
        globals: sharedFeatureGlobals,
    },
    {
        key: 'actions',
        entry: 'src/libraries/actions.js',
        globalName: 'ToolashaActions',
        fileName: 'libraries/toolasha-actions.js',
        banner: libraryHeaderActions,
        external: buildExternal(new Map([...coreExternalGlobals, ...utilsExternalGlobals, ...marketExternalGlobals, ...combatFeatureExternals])),
        globals: buildGlobals(new Map([...coreExternalGlobals, ...utilsExternalGlobals, ...marketExternalGlobals, ...combatFeatureExternals])),
    },
    {
        key: 'combat',
        entry: 'src/libraries/combat.js',
        globalName: 'ToolashaCombat',
        fileName: 'libraries/toolasha-combat.js',
        banner: libraryHeaderCombat,
        external: buildExternal(new Map([...coreExternalGlobals, ...utilsExternalGlobals, ...marketExternalGlobals])),
        globals: buildGlobals(new Map([...coreExternalGlobals, ...utilsExternalGlobals, ...marketExternalGlobals])),
    },
    {
        key: 'ui',
        entry: 'src/libraries/ui.js',
        globalName: 'ToolashaUI',
        fileName: 'libraries/toolasha-ui.js',
        banner: libraryHeaderUI,
        external: buildExternal(new Map([...coreExternalGlobals, ...utilsExternalGlobals, ...marketExternalGlobals, ...combatFeatureExternals])),
        globals: buildGlobals(new Map([...coreExternalGlobals, ...utilsExternalGlobals, ...marketExternalGlobals, ...combatFeatureExternals])),
    },
];

/**
 * 单库构建：IIFE 单入口。
 * 必须 configFile: false，避免递归加载配置文件。
 */
async function buildLibrary(lib: LibraryConfig) {
    await viteBuild({
        configFile: false,
        logLevel: 'warn',
        plugins: [workerBundlePlugin(), bannerPlugin(lib.banner)],
        build: {
            outDir: distDir,
            emptyOutDir: false,
            write: true,
            minify: false,
            rolldownOptions: {
                input: join(__dirname, lib.entry),
                external: lib.external,
                output: {
                    format: 'iife',
                    name: lib.globalName,
                    globals: lib.globals,
                    entryFileNames: lib.fileName,
                },
            },
        },
    });
    console.log(`[vite:prod] built ${lib.fileName}`);
}

/**
 * 编排插件：外层构建触发后，在 closeBundle 内按依赖序逐个构建。
 * 外层 write: false（不产文件），实际产物全部由内层构建写出。
 */
function orchestratorPlugin(): Plugin {
    return {
        name: 'prod-orchestrator',
        async closeBundle() {
            // 清空旧的 dist，避免残留文件混入发布产物
            await rm(distDir, { recursive: true, force: true });

            for (const lib of libs) {
                await buildLibrary(lib);
            }

            // entrypoint：monkey 插件生成 userscript 元数据 + 单文件 IIFE 打包。
            // 输入由 monkey 的 config 钩子注入（build.rolldownOptions.input），
            // 不要在此重复指定 input，否则会变成多入口触发 code-splitting。
            await viteBuild({
                configFile: false,
                logLevel: 'warn',
                plugins: [entrypointMonkeyPlugin()],
                build: {
                    outDir: distDir,
                    emptyOutDir: false,
                    write: true,
                    minify: false,
                },
            });
            console.log('[vite:prod] built Toolasha.user.js (entrypoint)');
        },
    };
}

export default defineConfig({
    plugins: [orchestratorPlugin()],
    build: {
        outDir: distDir,
        emptyOutDir: false,
        write: false,
        minify: false,
        rolldownOptions: {
            // 占位入口：仅用于触发外层构建（closeBundle 内完成全部真实产物）
            input: join(__dirname, 'src/entrypoint.js'),
            output: {
                format: 'iife',
                name: 'ToolashaEntrypoint',
            },
        },
    },
});
