import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');

const env = {
  ...process.env,
  VITE_BASE_URL: process.env.VITE_BASE_URL || '/portfolio/',
};

const result = spawnSync(
  process.execPath,
  [viteBin, 'build', '--config', 'scripts/vite-patched.config.js'],
  { cwd: root, stdio: 'inherit', env },
);

process.exit(result.status ?? 1);