import fs from 'fs';
import https from 'https';
import path from 'path';

const textures = {
  'starmap_8k': 'https://svs.gsfc.nasa.gov/vis/a000000/a003800/a003895/starmap_8k.jpg',
  'starmap_4k': 'https://svs.gsfc.nasa.gov/vis/a000000/a003800/a003895/starmap_4k.jpg'
};

const dir = path.join(process.cwd(), 'public', 'textures');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading high-res starmaps...');
  for (const [name, url] of Object.entries(textures)) {
    const dest = path.join(dir, `${name}.jpg`);
    if (fs.existsSync(dest)) {
      console.log(`Skipping ${name}, already exists.`);
      continue;
    }
    console.log(`Downloading ${name}...`);
    try {
      await download(url, dest);
      console.log(`Saved ${dest}`);
    } catch (e) {
      console.error(`Error downloading ${name}:`, e.message);
    }
  }
  console.log('Done!');
}

run();
