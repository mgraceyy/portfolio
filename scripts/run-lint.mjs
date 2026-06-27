import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const eslintBin = path.join(root, 'node_modules', 'eslint', 'bin', 'eslint.js');

const result = spawnSync(
  process.execPath,
  [
    eslintBin,
    'src',
    '--ignore-pattern',
    'src/hooks/useParallax.js',
    'scripts/patches',
    'scripts/patch-plugin.js',
    'scripts/vite-patched.config.js',
    'scripts/apply-patches.mjs',
  ],
  { cwd: root, stdio: 'inherit' },
);

process.exit(result.status ?? 1);