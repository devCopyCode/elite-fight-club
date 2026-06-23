const { createWriteStream, readdirSync, readFileSync, statSync } = require('fs');
const { join, relative } = require('path');
const ZipStream = require('./node_modules/zip-stream').default;

const archive = new ZipStream();
const output = createWriteStream('C:/Users/vinicius/Desktop/elite-fight-club-static.zip');
archive.pipe(output);

const outDir = './out';

function getFiles(dir) {
  const results = [];
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) {
      results.push(...getFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

const files = getFiles(outDir);
let i = 0;

function next() {
  if (i >= files.length) {
    archive.finalize();
    return;
  }
  const file = files[i++];
  const name = relative(outDir, file).split('\\').join('/');
  archive.entry(readFileSync(file), { name }, next);
}

output.on('close', () => {
  const size = (statSync('C:/Users/vinicius/Desktop/elite-fight-club-static.zip').size / 1024 / 1024).toFixed(2);
  console.log('ZIP criado: ' + size + ' MB');
});
archive.on('error', e => console.error(e));
next();
