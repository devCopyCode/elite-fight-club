import { createWriteStream, readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';
import { createGzip } from 'zlib';

// Use JSZip which is already available through other packages, or use a simple ZIP implementation
// Let's use the 'yazl' package via dynamic require

const { default: JSZip } = await import('./node_modules/jszip/dist/jszip.min.js').catch(() => null) ||
  await import('jszip').catch(() => null) || { default: null };

if (!JSZip) {
  console.error('JSZip not found');
  process.exit(1);
}

const zip = new JSZip();
const outDir = './out';

function addDir(zip, dirPath, basePath) {
  const entries = readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const zipPath = relative(basePath, fullPath).replace(/\\/g, '/');
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      addDir(zip, fullPath, basePath);
    } else {
      zip.file(zipPath, readFileSync(fullPath));
    }
  }
}

addDir(zip, outDir, outDir);

const content = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } });
const dest = 'C:/Users/vinicius/Desktop/elite-fight-club-static.zip';
createWriteStream(dest).end(content, () => {
  console.log(`ZIP criado: ${(content.length / 1024 / 1024).toFixed(2)} MB`);
});
