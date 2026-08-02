import devConfig from './vite.config.dev.ts';
import prodConfig from './vite.config.prod.ts';

/**
 * Vite 配置加载器（双配置编译入口）。
 *
 * 通过环境变量 VITE_BUILD_MODE 加载明确不同的配置文件：
 *   - VITE_BUILD_MODE=prod → vite.config.prod.ts（多 bundle：6 库 + entrypoint）
 *   - 其他 / 未设置         → vite.config.dev.ts（单 bundle，本地测试 / 默认）
 *
 * 也可以直接用 --config 显式指定：
 *   vite build --config vite.config.dev.ts
 *   vite build --config vite.config.prod.ts
 */
const mode = process.env.VITE_BUILD_MODE;

export default mode === 'prod' ? prodConfig : devConfig;
