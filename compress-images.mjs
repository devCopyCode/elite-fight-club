import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';

const publicDir = './public';
const files = readdirSync(publicDir);

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const inputPath = join(publicDir, file);
  const outputName = basename(file, ext) + '.jpg';
  const outputPath = join(publicDir, outputName);

  const before = statSync(inputPath).size;

  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 70, mozjpeg: true })
    .toFile(outputPath + '.tmp');

  // Replace original with compressed version
  if (outputPath !== inputPath) {
    try { unlinkSync(inputPath); } catch {}
  }

  import('fs').then(fs => {
    fs.renameSync(outputPath + '.tmp', outputPath);
  });

  const after = statSync(outputPath + '.tmp').size;
  console.log(`${file} → ${outputName}: ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB`);
}
