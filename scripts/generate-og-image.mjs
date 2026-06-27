import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'public', 'og-image.jpg');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf7f9"/>
      <stop offset="55%" stop-color="#fff5f8"/>
      <stop offset="100%" stop-color="#f0dce6"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d4849f"/>
      <stop offset="100%" stop-color="#b8a4c9"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="15%" r="45%">
      <stop offset="0%" stop-color="#e8a8be" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#e8a8be" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="12%" cy="88%" r="40%">
      <stop offset="0%" stop-color="#b8a4c9" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#b8a4c9" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect x="72" y="72" width="4" height="120" fill="url(#accent)" rx="2"/>
  <text x="96" y="148" font-family="Georgia, 'Times New Roman', serif" font-size="28" fill="#a8949e" letter-spacing="6">PORTFOLIO</text>
  <text x="96" y="248" font-family="Georgia, 'Times New Roman', serif" font-size="72" fill="#3d2b36" font-weight="500">Mary Grace Inayawan</text>
  <text x="96" y="318" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#6b4a5e">Computer Engineer · Full-Stack Developer</text>
  <text x="96" y="378" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#7a6570">Powering Growth Through Technology</text>
  <rect x="96" y="420" width="320" height="3" fill="url(#accent)" rx="1.5"/>
  <text x="96" y="500" font-family="monospace" font-size="22" fill="#d4849f" letter-spacing="2">mgraceyy.github.io/portfolio</text>
  <circle cx="1040" cy="120" r="88" fill="#fce8f0"/>
  <text x="1040" y="136" text-anchor="middle" font-family="Georgia, serif" font-size="52" fill="#6b4a5e" font-style="italic">MG</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toFile(outPath);
console.log('Created', outPath);