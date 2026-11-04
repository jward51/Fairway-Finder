import { copyFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const output = new URL('../dist/', import.meta.url);
const assets = ['index.html','app.js','styles.css','courses.json','manifest.webmanifest','sw.js','icon.svg','apple-touch-icon.png','_headers','availability.js','availability-ui.js','booking-links.js','sourced-booking.js'];
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const asset of assets) await copyFile(new URL(asset, root), new URL(asset, output));
console.log(`Built ${assets.length} static app assets in ${fileURLToPath(output)}`);
