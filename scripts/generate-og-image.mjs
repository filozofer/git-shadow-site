/**
 * Generates public/og-image.png from the og-image SVG template.
 * Run once (or whenever the logo/design changes):
 *   node scripts/generate-og-image.mjs
 *
 * Requires: npm install -D @resvg/resvg-js
 */

import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath  = join(__dirname, '../public/og-image.svg');
const pngPath  = join(__dirname, '../public/og-image.png');

const svg = readFileSync(svgPath, 'utf-8');

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
});

const pngData = resvg.render();
writeFileSync(pngPath, pngData.asPng());
console.log(`✓ og-image.png generated (1200×630)`);
