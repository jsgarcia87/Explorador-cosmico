import fs from 'fs';
import https from 'https';
import path from 'path';

const textures = {
  'sol': 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg',
  'mercurio': 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
  'venus': 'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg',
  'tierra': 'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
  'marte': 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
  'jupiter': 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
  'saturno': 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
  'urano': 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
  'neptuno': 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg',
  'luna': 'https://www.solarsystemscope.com/textures/download/2k_moon.jpg',
  'saturno_anillo': 'https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png'
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
  console.log('Downloading high-res textures...');
  for (const [name, url] of Object.entries(textures)) {
    const dest = path.join(dir, `${name}${url.endsWith('.png') ? '.png' : '.jpg'}`);
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
