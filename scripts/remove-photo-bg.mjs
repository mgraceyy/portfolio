import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '../public/photo.jpg');
const outputPath = path.join(__dirname, '../public/photo.png');

const input = await readFile(inputPath);
const normalized = await sharp(input).rotate().png().toBuffer();
const blob = new Blob([normalized], { type: 'image/png' });
const result = await removeBackground(blob);
const buffer = Buffer.from(await result.arrayBuffer());
const optimized = await sharp(buffer)
  .png({ quality: 90, compressionLevel: 9 })
  .toBuffer();

await writeFile(outputPath, optimized);
console.log('Saved transparent photo to public/photo.png');