import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build as viteBuild, defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
// @ts-ignore
import pkg from './package.json' with { type: 'json' };
import type { Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * worker-bundle 插件
 * 将 `?worker` 导入内联为 IIFE 字符串（运行时通过 Blob 消费），
 * 与之前的 Rollup 行为保持一致。以 `enforce: 'pre'` 运行，使其优先于
 * Vite 默认的 `?worker` 处理（否则会把 worker 作为单独文件输出）。
 */
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

            // 缓存以避免在同一轮 watch 重建中重复打包
            if (cache.has(entryPath)) return cache.get(entryPath);

            // 用独立的 Vite 构建来打包 worker 入口。
            // Vite 8 使用 rolldown 取代 rollup：IIFE 输出格式通过
            // `build.lib.formats` 控制，警告通过 `rolldownOptions.onLog`
            // 处理（取代 rollup 的 `onwarn`）。
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

export default defineConfig({
    plugins: [
        workerBundlePlugin(),
        // vite-plugin-monkey 生成 userscript 元数据块
        // （// ==UserScript== ... ==/UserScript==），并将各个 chunk
        // 重新打包为单个 IIFE 文件（Toolasha.user.js）。
        monkey({
            entry: 'src/dev-entrypoint.js',
            userscript: {
                name: 'Toolasha-CN',
                namespace: 'http://tampermonkey.net/',
                version: pkg.version,
                downloadURL: 'https://github.com/Chiron-Brahm/Toolasha-CN/releases/latest/download/Toolasha.user.js',
                updateURL: 'https://github.com/Chiron-Brahm/Toolasha-CN/releases/latest/download/Toolasha.user.js',
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
                ],
            },
            build: {
                fileName: 'Toolasha.user.js',
                // 保持 grant 列表与上面声明的完全一致，不要从打包产物中
                // 自动收集额外的 GM_* API。
                autoGrant: false,
            },
            generate: ({ userscript }) =>
                `${userscript}\n// Note: Combat Sim auto-import requires Tampermonkey for cross-domain storage. Not available on Steam (use manual clipboard copy/paste instead).`,
        }),
    ],
    build: {
        outDir: 'dist',
        emptyOutDir: false,
    },
});
