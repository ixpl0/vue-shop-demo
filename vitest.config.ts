import { fileURLToPath } from 'node:url';

import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';
import path from 'node:path';

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
);
