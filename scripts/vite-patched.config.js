import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig } from 'vite';
import baseConfig from '../vite.config.js';
import { portfolioPatchPlugin } from './patch-plugin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = process.env.VITE_BASE_URL || '/';

export default mergeConfig(
  baseConfig,
  defineConfig({
    base,
    cacheDir: path.join(__dirname, '.vite-cache'),
    build: {
      outDir: process.env.GITHUB_ACTIONS === 'true' ? 'dist' : 'dist-build',
    },
    plugins: [portfolioPatchPlugin()],
  }),
);