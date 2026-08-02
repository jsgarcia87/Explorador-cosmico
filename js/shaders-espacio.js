/* =========================================================================
   SHADERS Y GRÁFICOS — Explorador Cósmico (Three.js PBR & Shaders HD)
   Realismo visual 3D: Mapas de Normales/Rugosidad PBR, Atmósferas Rayleigh,
   Sol de Plasma GLSL, Gargantua Relativista y Fondo Estelar Multi-Espectral
   ========================================================================= */

/* ---------- Texturas Auxiliares HD de Brillo y Punto Gaussiano ---------- */
function glowTexture(hex) {
  const size = 512;
  const c = document.createElement('canvas'); c.width = c.height = size;
  const ctx = c.getContext('2d');
  const half = size / 2;
  const g = ctx.createRadialGradient(half, half, 0, half, half, half);
  const col = new THREE.Color(hex);
  g.addColorStop(0, `rgba(${col.r * 255},${col.g * 255},${col.b * 255},1.0)`);
  g.addColorStop(0.2, `rgba(${col.r * 255},${col.g * 255},${col.b * 255},0.65)`);
  g.addColorStop(0.5, `rgba(${col.r * 255},${col.g * 255},${col.b * 255},0.22)`);
  g.addColorStop(0.85, `rgba(${col.r * 255},${col.g * 255},${col.b * 255},0.04)`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

function softDot() {
  const size = 256;
  const c = document.createElement('canvas'); c.width = c.height = size;
  const ctx = c.getContext('2d');
  const half = size / 2;
  const g = ctx.createRadialGradient(half, half, 0, half, half, half);
  g.addColorStop(0, 'rgba(255,255,255,1.0)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.7)');
  g.addColorStop(0.65, 'rgba(255,255,255,0.18)');
  g.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}
const DOT = softDot();

/* ---------- 1. Generadores de Texturas Realistas de Alta Calidad ---------- */
function planetTexture(baseHex, opts = {}) {
  const { bands = false, bandSoft = false, blotches = true, craters = false,
          poles = false, poleSize = 0.16, spot = null } = opts;
  const w = 512, h = 256;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const base = new THREE.Color(baseHex);
  ctx.fillStyle = base.getStyle(); ctx.fillRect(0, 0, w, h);

  if (bands) {
    const bandCount = bandSoft ? 14 : 20;
    for (let i = 0; i < bandCount; i++) {
      const y = (h / bandCount) * i;
      const shade = base.clone().offsetHSL(0, (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * (bandSoft ? 0.08 : 0.16));
      ctx.fillStyle = `rgba(${shade.r*255|0},${shade.g*255|0},${shade.b*255|0},${bandSoft ? 0.28 + Math.random() * 0.22 : 0.4 + Math.random() * 0.35})`;
      ctx.fillRect(0, y, w, h / bandCount + 3);
      if (!bandSoft) {
        for (let s = 0; s < 3; s++) {
          ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.05})`;
          ctx.beginPath();
          ctx.ellipse(Math.random() * w, y + (h / bandCount) / 2, 30 + Math.random() * 60, (h / bandCount) * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
  if (blotches && !craters) {
    for (let i = 0; i < 50; i++) {
      const shade = base.clone().offsetHSL(0, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.18);
      ctx.fillStyle = `rgba(${shade.r*255|0},${shade.g*255|0},${shade.b*255|0},${0.12 + Math.random() * 0.22})`;
      const rx = 10 + Math.random() * 40, ry = rx * (0.5 + Math.random() * 0.5);
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, Math.random() * h, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (craters) {
    for (let i = 0; i < 70; i++) {
      const shade = base.clone().offsetHSL(0, 0, (Math.random() - 0.5) * 0.1);
      ctx.fillStyle = `rgba(${shade.r*255|0},${shade.g*255|0},${shade.b*255|0},${0.1 + Math.random() * 0.15})`;
      const rx = 8 + Math.random() * 30, ry = rx * (0.6 + Math.random() * 0.4);
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, Math.random() * h, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 55; i++) {
      const cx = Math.random() * w, cy = Math.random() * h, r = 3 + Math.random() * 16;
      const dark = base.clone().offsetHSL(0, 0, -0.22);
      const light = base.clone().offsetHSL(0, 0, 0.2);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dark.r*255|0},${dark.g*255|0},${dark.b*255|0},0.5)`; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, r * 1.18, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${light.r*255|0},${light.g*255|0},${light.b*255|0},0.35)`;
      ctx.lineWidth = Math.max(1, r * 0.22); ctx.stroke();
    }
  }
  if (spot) {
    const sc = new THREE.Color(spot.color || 0xb5451f);
    const sx = (spot.x || spot.u || 0.64) * w, sy = (spot.y || spot.v || 0.58) * h;
    const srx = spot.rx || (spot.r ? spot.r * h : 26), sry = spot.ry || srx * 0.58;
    const g = ctx.createRadialGradient(sx, sy, 2, sx, sy, srx);
    g.addColorStop(0, `rgba(${sc.r*255|0},${sc.g*255|0},${sc.b*255|0},0.85)`);
    g.addColorStop(0.7, `rgba(${sc.r*255|0},${sc.g*255|0},${sc.b*255|0},0.45)`);
    g.addColorStop(1, `rgba(${sc.r*255|0},${sc.g*255|0},${sc.b*255|0},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(sx, sy, srx, sry, -0.2, 0, Math.PI * 2); ctx.fill();
  }
  if (poles) {
    const capH = h * poleSize;
    const gTop = ctx.createLinearGradient(0, 0, 0, capH * 1.6);
    gTop.addColorStop(0, 'rgba(255,255,255,0.95)'); gTop.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gTop; ctx.fillRect(0, 0, w, capH * 1.6);
    const gBot = ctx.createLinearGradient(0, h - capH * 1.6, 0, h);
    gBot.addColorStop(0, 'rgba(255,255,255,0)'); gBot.addColorStop(1, 'rgba(255,255,255,0.95)');
    ctx.fillStyle = gBot; ctx.fillRect(0, h - capH * 1.6, w, capH * 1.6);
  }
  const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true;
  return tex;
}

function generateNormalMap(opts = {}) {
  const { roughnessFactor = 1.0, craterDepth = 2.5 } = opts;
  const w = 512, h = 256;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = Math.sin(x * 0.05) * Math.cos(y * 0.05) * roughnessFactor;
      const ny = Math.cos(x * 0.08) * Math.sin(y * 0.08) * roughnessFactor;
      const idx = (y * w + x) * 4;
      data[idx]     = Math.min(255, Math.max(0, 128 + nx * 60 * craterDepth)); // R -> normal X
      data[idx + 1] = Math.min(255, Math.max(0, 128 + ny * 60 * craterDepth)); // G -> normal Y
      data[idx + 2] = 255;                                                     // B -> normal Z
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

function generateRoughnessMap(opts = {}) {
  const { baseRoughness = 0.65, variance = 0.3 } = opts;
  const w = 512, h = 256;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const noise = (Math.sin(x * 0.04) * Math.cos(y * 0.04) + 1.0) * 0.5;
      const rVal = Math.min(255, Math.max(0, (baseRoughness + (noise - 0.5) * variance) * 255));
      const idx = (y * w + x) * 4;
      data[idx]     = rVal;
      data[idx + 1] = rVal;
      data[idx + 2] = rVal;
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

function sunTexture() {
  const w = 512, h = 256;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const base = new THREE.Color(0xffcf5e);
  ctx.fillStyle = base.getStyle(); ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 260; i++) {
    const shade = base.clone().offsetHSL((Math.random() - 0.5) * 0.02, 0, (Math.random() - 0.5) * 0.22);
    ctx.fillStyle = `rgba(${shade.r*255|0},${shade.g*255|0},${shade.b*255|0},${0.25 + Math.random() * 0.35})`;
    const r = 4 + Math.random() * 10;
    ctx.beginPath(); ctx.arc(Math.random() * w, Math.random() * h, r, 0, Math.PI * 2); ctx.fill();
  }
  for (let i = 0; i < 18; i++) {
    ctx.fillStyle = `rgba(255,255,255,${0.08 + Math.random() * 0.12})`;
    const rx = 20 + Math.random() * 60, ry = rx * 0.3;
    ctx.beginPath();
    ctx.ellipse(Math.random() * w, Math.random() * h, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 6; i++) {
    const dark = base.clone().offsetHSL(0, 0.1, -0.32);
    ctx.fillStyle = `rgba(${dark.r*255|0},${dark.g*255|0},${dark.b*255|0},0.55)`;
    const r = 6 + Math.random() * 10;
    ctx.beginPath(); ctx.arc(Math.random() * w, Math.random() * h, r, 0, Math.PI * 2); ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true;
  return tex;
}

function earthTexture() {
  const w = 1024, h = 512;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
  oceanGrad.addColorStop(0, '#1a3d7a'); oceanGrad.addColorStop(0.5, '#1c5fc9'); oceanGrad.addColorStop(1, '#1a3d7a');
  ctx.fillStyle = oceanGrad; ctx.fillRect(0, 0, w, h);
  const landTones = ['rgba(58,110,60,0.92)', 'rgba(96,133,63,0.88)', 'rgba(150,124,80,0.85)', 'rgba(120,150,90,0.8)'];
  for (let i = 0; i < 22; i++) {
    ctx.fillStyle = landTones[i % landTones.length];
    const rx = 16 + Math.random() * 46, ry = rx * (0.35 + Math.random() * 0.5);
    ctx.beginPath();
    ctx.ellipse(Math.random() * w, 30 + Math.random() * (h - 60), rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 14; i++) {
    ctx.fillStyle = 'rgba(150,110,70,0.4)';
    const rx = 6 + Math.random() * 16, ry = rx * 0.5;
    ctx.beginPath();
    ctx.ellipse(Math.random() * w, 30 + Math.random() * (h - 60), rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  const capH = h * 0.14;
  const gTop = ctx.createLinearGradient(0, 0, 0, capH * 1.5);
  gTop.addColorStop(0, 'rgba(255,255,255,0.97)'); gTop.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gTop; ctx.fillRect(0, 0, w, capH * 1.5);
  const gBot = ctx.createLinearGradient(0, h - capH * 1.5, 0, h);
  gBot.addColorStop(0, 'rgba(255,255,255,0)'); gBot.addColorStop(1, 'rgba(255,255,255,0.97)');
  ctx.fillStyle = gBot; ctx.fillRect(0, h - capH * 1.5, w, capH * 1.5);
  const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true;
  return tex;
}

function cloudsTexture() {
  const w = 1024, h = 512;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * w, y = Math.random() * h;
    const r = 15 + Math.random() * 50;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true;
  return tex;
}

function ringTexture(hex, innerRatio = 0.56) {
  const size = 512;
  const c = document.createElement('canvas'); c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const cx = size / 2, cy = size / 2, R = size / 2;
  const base = new THREE.Color(hex);
  const bands = [
    { r0: innerRatio, r1: innerRatio + 0.045, alpha: 0.28, light: -0.08 },
    { r0: innerRatio + 0.045, r1: innerRatio + 0.18, alpha: 0.5, light: -0.02 },
    { r0: innerRatio + 0.18, r1: 0.855, alpha: 0.95, light: 0.09 },
    { r0: 0.855, r1: 0.872, alpha: 0.04, light: -0.35 },
    { r0: 0.872, r1: 0.955, alpha: 0.78, light: 0.02 },
    { r0: 0.955, r1: 0.965, alpha: 0.12, light: -0.28 },
    { r0: 0.965, r1: 1.0, alpha: 0.42, light: 0.06 },
  ];
  bands.forEach(b => {
    const rMid = (b.r0 + b.r1) / 2 * R;
    const lw = Math.max(1, (b.r1 - b.r0) * R);
    const shade = base.clone().offsetHSL(0, 0, b.light);
    ctx.beginPath(); ctx.arc(cx, cy, rMid, 0, Math.PI * 2);
    ctx.lineWidth = lw;
    ctx.strokeStyle = `rgba(${shade.r*255|0},${shade.g*255|0},${shade.b*255|0},${b.alpha})`;
    ctx.stroke();
  });
  for (let i = 0; i < 260; i++) {
    const rr = innerRatio + Math.random() * (1 - innerRatio);
    const shade = base.clone().offsetHSL(0, 0, (Math.random() - 0.5) * 0.14);
    ctx.beginPath(); ctx.arc(cx, cy, rr * R, 0, Math.PI * 2);
    ctx.lineWidth = 0.5 + Math.random() * 1.3;
    ctx.strokeStyle = `rgba(${shade.r*255|0},${shade.g*255|0},${shade.b*255|0},${0.06 + Math.random() * 0.12})`;
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true;
  return tex;
}

function diskGradientTexture() {
  const w = 512, h = 512;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const cx = w / 2, cy = h / 2;
  const g = ctx.createRadialGradient(cx, cy, w * 0.14, cx, cy, w * 0.5);
  g.addColorStop(0, 'rgba(235,245,255,0.95)');
  g.addColorStop(0.28, 'rgba(255,244,214,0.85)');
  g.addColorStop(0.55, 'rgba(255,178,110,0.6)');
  g.addColorStop(0.8, 'rgba(255,110,70,0.35)');
  g.addColorStop(1, 'rgba(140,40,30,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 160; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = w * 0.16 + Math.random() * w * 0.32;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    ctx.fillStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.1})`;
    ctx.beginPath(); ctx.arc(x, y, 1 + Math.random() * 2.5, 0, Math.PI * 2); ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true;
  return tex;
}

function atmosphereMesh(radius, hexColor, opacity = 0.4) {
  const geo = new THREE.SphereGeometry(radius * 1.12, 32, 32);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(hexColor) },
      op: { value: opacity },
      sunDirection: { value: new THREE.Vector3(-1, 0, 0) }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float op;
      uniform vec3 sunDirection;
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      void main() {
        float rim = pow(0.62 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
        // Rayleigh scattering: intensify on sun-facing limb
        vec3 toSun = normalize(sunDirection - vWorldPos);
        float scatter = max(0.0, dot(normalize(-vNormal), toSun));
        float rayleigh = pow(scatter, 1.8) * 0.6 + 0.4;
        // Blue shift for forward scattering
        vec3 scatteredColor = mix(color, color * vec3(0.7, 0.85, 1.3), scatter * 0.4);
        float intensity = rim * rayleigh;
        gl_FragColor = vec4(scatteredColor, intensity * op);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  });
  return new THREE.Mesh(geo, mat);
}

function makeGlowMesh(radius, hexColor, opacity = 0.4) {
  const geo = new THREE.SphereGeometry(radius, 32, 32);
  const mat = new THREE.MeshBasicMaterial({
    color: hexColor,
    transparent: true,
    opacity: opacity,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  });
  return new THREE.Mesh(geo, mat);
}

/* ---------- 8. Fondo Estelar Multi-Espectral y Vía Láctea ---------- */
function createMilkyWayBackground(scene) {
  const isMobile = window.innerWidth < 768;
  const sCount = isMobile ? 12000 : 35000;
  const sGeo = new THREE.BufferGeometry();
  const sPos = new Float32Array(sCount * 3);
  const sCol = new Float32Array(sCount * 3);
  const sSiz = new Float32Array(sCount);

  // Clases espectrales Planckianas / Cuerpo Negro (Kelvin -> RGB NASA-calibrado)
  // Con ponderación por Función Inicial de Masa (IMF): M rojas muy frecuentes, O/B azules muy raras
  const starTypes = [
    { color: new THREE.Color(0x9bb0ff), weight: 0.005, temp: 40000 }, // Clase O (40,000K actinic blue)
    { color: new THREE.Color(0xbbccff), weight: 0.015, temp: 18000 }, // Clase B (18,000K blue-white)
    { color: new THREE.Color(0xf8f9ff), weight: 0.050, temp: 9000 },  // Clase A (9,000K white)
    { color: new THREE.Color(0xfff4e8), weight: 0.130, temp: 6800 },  // Clase F (6,800K yellow-white)
    { color: new THREE.Color(0xffeaaf), weight: 0.200, temp: 5800 },  // Clase G (5,800K solar yellow)
    { color: new THREE.Color(0xffd2a1), weight: 0.250, temp: 4300 },  // Clase K (4,300K orange)
    { color: new THREE.Color(0xffae76), weight: 0.350, temp: 3100 }   // Clase M (3,100K crimson orange)
  ];
  const cumWeights = [];
  let tw = 0;
  starTypes.forEach(s => { tw += s.weight; cumWeights.push(tw); });

  for (let i = 0; i < sCount; i++) {
    const th = Math.random() * Math.PI * 2;

    // 60% en el plano de la Vía Láctea (disco galáctico), 40% halo esférico
    let ph;
    if (Math.random() < 0.60) {
      const g = (Math.random() + Math.random() + Math.random()) / 3.0;
      ph = Math.PI / 2 + (g - 0.5) * 0.65;
    } else {
      ph = Math.acos(2 * Math.random() - 1);
    }

    // 3 Capas de profundidad de paralaje (Foreground: 280-520, Midground: 520-1100, Background Halo: 1100-2200)
    const layerRand = Math.random();
    let r;
    if (layerRand < 0.18) {
      r = 280 + Math.random() * 240; // Capa 1: Vecindario solar cercano
    } else if (layerRand < 0.65) {
      r = 520 + Math.random() * 580; // Capa 2: Disco galáctico medio
    } else {
      r = 1100 + Math.random() * 1100; // Capa 3: Bulbo y halo profundo
    }

    sPos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
    sPos[i * 3 + 1] = r * Math.cos(ph);
    sPos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);

    // Selección espectral de cuerpo negro según IMF
    const rnd = Math.random() * tw;
    let ci = 0;
    for (let j = 0; j < cumWeights.length; j++) {
      if (rnd <= cumWeights[j]) { ci = j; break; }
    }
    const c = starTypes[ci].color;
    const vary = 0.035;
    sCol[i * 3]     = Math.min(1, Math.max(0, c.r + (Math.random() - 0.5) * vary));
    sCol[i * 3 + 1] = Math.min(1, Math.max(0, c.g + (Math.random() - 0.5) * vary));
    sCol[i * 3 + 2] = Math.min(1, Math.max(0, c.b + (Math.random() - 0.5) * vary));

    // Escala astronómica de magnitud visual (10^-0.4m) con diferenciación por capa
    const mag = Math.pow(Math.random(), 2.8);
    sSiz[i] = (0.18 + mag * (ci < 2 ? 3.2 : 1.7)) * (r < 500 ? 1.4 : (r < 1100 ? 1.0 : 0.65));
  }
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  sGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
  sGeo.setAttribute('aSize', new THREE.BufferAttribute(sSiz, 1));

  // ShaderMaterial con tamaño por vértice y centelleo atmosférico dependiente de la magnitud
  const sMat = new THREE.ShaderMaterial({
    uniforms: { uDot: { value: DOT }, uTime: { value: 0.0 } },
    vertexShader: `
      attribute float aSize;
      uniform float uTime;
      varying vec3 vColor;
      varying float vTwinkle;
      void main() {
        vColor = color;
        float phase = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);
        float twinkle = 0.70 + 0.30 * sin(uTime * (1.1 + phase * 3.8) + phase * 6.2831);
        vTwinkle = twinkle;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * twinkle * (320.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D uDot;
      varying vec3 vColor;
      varying float vTwinkle;
      void main() {
        vec4 texel = texture2D(uDot, gl_PointCoord);
        // Subtle chromatic scintillation (atmospheric dispersion simulation)
        float chromatic = vTwinkle * 0.08;
        vec3 tintedColor = vColor + vec3(chromatic, -chromatic * 0.5, -chromatic);
        gl_FragColor = vec4(tintedColor * texel.rgb * vTwinkle, texel.a * smoothstep(0.0, 0.40, vTwinkle));
      }
    `,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const deepStars = new THREE.Points(sGeo, sMat);
  scene.add(deepStars);
  return deepStars;
}

/* ---------- 8.5 Sistema de Constelaciones Reales con Líneas y Estrellas en la Bóveda ---------- */
function createConstellationsSystem(scene, focusables) {
  const constellationsGroup = new THREE.Group();
  scene.add(constellationsGroup);

  if (typeof CONSTELLATIONS !== 'undefined') {
    CONSTELLATIONS.forEach(c => {
      const cGroup = new THREE.Group();
      constellationsGroup.add(cGroup);

      // Estrellas de la constelación con brillo y magnitud
      if (c.stars && c.stars.length) {
        c.stars.forEach((st, idx) => {
          const starSize = Math.max(0.8, 3.2 - Math.max(-1.5, st.mag) * 0.45);
          const starGeo = new THREE.SphereGeometry(starSize, 16, 16);
          const starMat = new THREE.MeshBasicMaterial({ color: c.color || 0xffffff });
          const starMesh = new THREE.Mesh(starGeo, starMat);
          starMesh.position.set(...st.p);
          cGroup.add(starMesh);

          // Corona luminosa resplandeciente para estrellas brillantes
          if (st.mag <= 2.2) {
            const haloGeo = new THREE.PlaneGeometry(starSize * 4.5, starSize * 4.5);
            const haloMat = new THREE.MeshBasicMaterial({
              map: DOT, color: c.color || 0xffffff,
              transparent: true, opacity: 0.75,
              blending: THREE.AdditiveBlending, depthWrite: false
            });
            const haloMesh = new THREE.Mesh(haloGeo, haloMat);
            haloMesh.position.copy(starMesh.position);
            haloMesh.onBeforeRender = (renderer, scene, camera) => {
              haloMesh.quaternion.copy(camera.quaternion);
            };
            cGroup.add(haloMesh);
          }
        });
      }

      // Líneas de unión astrométricas (figuras de la constelación)
      const lineMaterials = [];
      if (c.lines && c.lines.length && c.stars) {
        c.lines.forEach(pair => {
          const p0 = c.stars[pair[0]]?.p;
          const p1 = c.stars[pair[1]]?.p;
          if (p0 && p1) {
            const points = [new THREE.Vector3(...p0), new THREE.Vector3(...p1)];
            const lGeo = new THREE.BufferGeometry().setFromPoints(points);
            const lMat = new THREE.LineBasicMaterial({
              color: c.color || 0x818cf8,
              transparent: true,
              opacity: 0.65,
              linewidth: 1.5,
              blending: THREE.AdditiveBlending
            });
            const lMesh = new THREE.Line(lGeo, lMat);
            cGroup.add(lMesh);
            lineMaterials.push(lMat);
          }
        });
      }

      // Marcador objetivo para foco de cámara y clic
      const markerGeo = new THREE.SphereGeometry(2.5, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({
        color: c.color || 0xffffff,
        transparent: true, opacity: 0.01
      });
      const markerMesh = new THREE.Mesh(markerGeo, markerMat);
      markerMesh.position.set(...c.pos);
      cGroup.add(markerMesh);

      focusables[c.id] = {
        mesh: markerMesh,
        data: c,
        group: cGroup,
        lineMaterials: lineMaterials,
        type: 'constelacion'
      };
    });
  }

  return constellationsGroup;
}

/* ---------- Creación del Sistema Solar HD con Shaders PBR ---------- */
function createSolarSystem(scene, focusables) {
  const planetsGroup = new THREE.Group();
  const orbitsGroup = new THREE.Group();
  scene.add(planetsGroup);
  scene.add(orbitsGroup);

  // Sol con Shader Convectivo y Granulación de Plasma en GLSL
  const sunGeo = new THREE.SphereGeometry(4.8, 64, 64);
  const sunMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMap: { value: sunTexture() }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPos;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform sampler2D uMap;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPos;
      void main() {
        vec3 base = texture2D(uMap, vUv).rgb;
        float pulse = sin(vPos.x * 2.0 + uTime * 3.0) * cos(vPos.y * 2.0 - uTime * 2.0) * 0.15;
        float limb = pow(1.0 - abs(vNormal.z), 0.85);
        vec3 col = base + vec3(pulse * 0.4, pulse * 0.2, 0.0);
        col += vec3(0.5, 0.2, 0.0) * limb;
        gl_FragColor = vec4(col * 1.5, 1.0);
      }
    `
  });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  planetsGroup.add(sunMesh);
  focusables['sol'] = { mesh: sunMesh, data: PLANETS[0], mat: sunMat };

  // Corona Solar Volumétrica GLSL
  const coronaMat = new THREE.ShaderMaterial({
    uniforms: {
      c: { value: 0.22 },
      p: { value: 3.4 },
      glowColor: { value: new THREE.Color(0xffaa00) },
      viewVector: { value: new THREE.Vector3() }
    },
    vertexShader: `
      uniform vec3 viewVector;
      uniform float c;
      uniform float p;
      varying float intensity;
      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vNormel = normalize(normalMatrix * viewVector);
        intensity = pow(c - dot(vNormal, vNormel), p);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying float intensity;
      void main() {
        vec3 glow = glowColor * intensity;
        gl_FragColor = vec4(glow, intensity * 0.85);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  });
  const coronaMesh = new THREE.Mesh(new THREE.SphereGeometry(5.8, 64, 64), coronaMat);
  sunMesh.add(coronaMesh);
  sunMesh.userData.coronaMat = coronaMat;

  // Corona Multicapa de Glow Sprites (complementa el shader corona)
  [[6, 0.95], [9, 0.55], [13, 0.3], [18, 0.15]].forEach(([scale, op]) => {
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture(0xffd166), transparent: true,
      blending: THREE.AdditiveBlending, opacity: op
    }));
    glow.scale.set(4.8 * scale, 4.8 * scale, 1);
    sunMesh.add(glow);
  });

  // Prominencias y Fulgores Solares
  for (let i = 0; i < 6; i++) {
    const pMat = new THREE.SpriteMaterial({
      map: glowTexture(0xff5500),
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.6
    });
    const pSprite = new THREE.Sprite(pMat);
    const angle = (i / 6) * Math.PI * 2;
    pSprite.position.set(Math.cos(angle) * 5.2, (Math.random() - 0.5) * 3, Math.sin(angle) * 5.2);
    pSprite.scale.set(7, 7, 1);
    sunMesh.add(pSprite);
  }

  // Generar 8 Planetas PBR (Normal Map, Roughness Map & Atmósferas)
  for (let i = 1; i < PLANETS.length; i++) {
    const p = PLANETS[i];

    // Línea de Órbita
    const oPts = [];
    for (let j = 0; j <= 128; j++) {
      const th = (j / 128) * Math.PI * 2;
      oPts.push(new THREE.Vector3(Math.cos(th) * p.dist, 0, Math.sin(th) * p.dist));
    }
    const oGeo = new THREE.BufferGeometry().setFromPoints(oPts);
    const oMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.4 });
    const orbitLine = new THREE.Line(oGeo, oMat);
    orbitsGroup.add(orbitLine);

    // Texturas personalizadas y Material PBR limpio y realista
    let tex;
    if (p.id === 'tierra') {
      tex = earthTexture();
    } else if (p.id === 'mercurio') {
      tex = planetTexture(p.color, { craters: true });
    } else if (p.id === 'venus') {
      tex = planetTexture(p.color, { bands: true, bandSoft: true });
    } else if (p.id === 'marte') {
      tex = planetTexture(p.color, { craters: true, poles: true });
    } else if (p.id === 'jupiter') {
      tex = planetTexture(p.color, {
        bands: true, bandSoft: false,
        spot: p.spot || { u: 0.65, v: 0.68, r: 0.08, h: 0.04, s: 0.9, l: 0.45 }
      });
    } else if (p.id === 'saturno') {
      tex = planetTexture(p.color, { bands: true, bandSoft: true });
    } else if (p.id === 'urano') {
      tex = planetTexture(p.color, { bands: true, bandSoft: true });
    } else if (p.id === 'neptuno') {
      tex = planetTexture(p.color, { bands: true, bandSoft: false });
    } else {
      tex = planetTexture(p.color, { bands: !!p.bands, bandSoft: !!p.bandSoft, craters: !!p.craters, poles: !!p.poles });
    }

    const pGeo = new THREE.SphereGeometry(p.radius, 64, 64);
    const pMat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: p.id === 'tierra' ? 0.8 : 0.92,
      metalness: 0.05
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.set(p.dist, 0, 0);
    pMesh.castShadow = true;
    pMesh.receiveShadow = true;

    const pivot = new THREE.Group();
    pivot.add(pMesh);
    planetsGroup.add(pivot);

    // Capa Independiente de Nubes 3D para la Tierra
    if (p.id === 'tierra') {
      const cloudGeo = new THREE.SphereGeometry(p.radius * 1.015, 64, 64);
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudsTexture(),
        transparent: true,
        opacity: 0.85,
        roughness: 0.9,
        depthWrite: false
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      cloudMesh.castShadow = true;
      cloudMesh.receiveShadow = true;
      pMesh.add(cloudMesh);
      pMesh.userData.cloudMesh = cloudMesh;
    }

    // Atmósfera Realista con atmosphereMesh para todos los planetas con atmósfera
    if (p.id === 'tierra') pMesh.add(atmosphereMesh(p.radius, 0x3b82f6, 0.38));
    else if (p.id === 'venus') pMesh.add(atmosphereMesh(p.radius, 0xfde047, 0.45));
    else if (p.id === 'marte') pMesh.add(atmosphereMesh(p.radius, 0xef4444, 0.25));
    else if (p.id === 'jupiter') pMesh.add(atmosphereMesh(p.radius, 0xf59e0b, 0.28));
    else if (p.id === 'saturno') pMesh.add(atmosphereMesh(p.radius, 0xfde047, 0.25));
    else if (p.id === 'urano') pMesh.add(atmosphereMesh(p.radius, 0x22d3ee, 0.32));
    else if (p.id === 'neptuno') pMesh.add(atmosphereMesh(p.radius, 0x2563eb, 0.32));

    // Anillos HD con División de Cassini (Saturno & Urano)
    if (p.id === 'saturno' || p.id === 'urano') {
      const inner = p.radius * 1.35;
      const outer = p.radius * (p.id === 'saturno' ? 2.5 : 1.95);
      const ringGeo = new THREE.RingGeometry(inner, outer, 80);
      const ringMat = new THREE.MeshStandardMaterial({
        map: ringTexture(p.color, inner / outer),
        side: THREE.DoubleSide,
        transparent: true,
        roughness: 0.8,
        metalness: 0.05,
        opacity: 0.95
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + 0.35;
      ringMesh.receiveShadow = true;
      ringMesh.castShadow = true;
      pMesh.add(ringMesh);
    }

    // Lunas
    const moons = [];
    if (p.id === 'tierra') moons.push({ name: 'Luna', r: 0.35, d: 2.8, s: 2.5, col: 0xcccccc });
    else if (p.id === 'marte') {
      moons.push({ name: 'Fobos', r: 0.15, d: 1.6, s: 3.8, col: 0x999999 });
      moons.push({ name: 'Deimos', r: 0.12, d: 2.3, s: 2.1, col: 0x888888 });
    } else if (p.id === 'jupiter') {
      moons.push({ name: 'Ío', r: 0.38, d: 3.8, s: 3.2, col: 0xeab308 });
      moons.push({ name: 'Europa', r: 0.32, d: 4.8, s: 2.4, col: 0x93c5fd });
      moons.push({ name: 'Ganimedes', r: 0.45, d: 6.0, s: 1.8, col: 0xa8a29e });
      moons.push({ name: 'Calisto', r: 0.40, d: 7.2, s: 1.2, col: 0x78716c });
    } else if (p.id === 'saturno') {
      moons.push({ name: 'Titán', r: 0.42, d: 6.5, s: 1.9, col: 0xfde047 });
      moons.push({ name: 'Encélado', r: 0.22, d: 4.2, s: 2.8, col: 0xffffff });
    } else if (p.id === 'neptuno') {
      moons.push({ name: 'Tritón', r: 0.35, d: 4.0, s: 2.2, col: 0xbae6fd });
    }

    const moonMeshes = [];
    moons.forEach(m => {
      const mGeo = new THREE.SphereGeometry(m.r, 24, 24);
      const mMat = new THREE.MeshStandardMaterial({ color: m.col, roughness: 0.9, metalness: 0.05 });
      const mMesh = new THREE.Mesh(mGeo, mMat);
      mMesh.position.set(m.d, 0, 0);
      mMesh.castShadow = true;
      mMesh.receiveShadow = true;
      pMesh.add(mMesh);
      moonMeshes.push({ mesh: mMesh, data: m });
    });

    focusables[p.id] = { mesh: pMesh, data: p, pivot, moonMeshes };
  }

  // Cinturón de Asteroides entre Marte y Júpiter
  (function asteroidBelt() {
    const count = 1400;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const beltBase = new THREE.Color(0xaa9c86);
    for (let i = 0; i < count; i++) {
      const r = 32 + Math.random() * 5.5;
      const a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.3;
      pos[i * 3 + 2] = Math.sin(a) * r;
      const shade = beltBase.clone().offsetHSL(0, 0, (Math.random() - 0.5) * 0.25);
      col[i * 3] = shade.r; col[i * 3 + 1] = shade.g; col[i * 3 + 2] = shade.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.3, vertexColors: true, map: DOT, transparent: true, depthWrite: false });
    planetsGroup.add(new THREE.Points(geo, mat));
  })();

  return { sunMesh, planetsGroup, orbitsGroup };
}

/* ---------- Creación del Universo Profundo HD ---------- */
function createDeepSpace(scene, focusables) {
  const deepGroup = new THREE.Group();
  scene.add(deepGroup);

  // 1. Púlsar de Neutrones
  {
    const d = DEEPSPACE.find(x => x.id === 'pulsar');
    const pGeo = new THREE.SphereGeometry(1.6, 48, 48);
    const pMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x00f0ff) },
        uColor2: { value: new THREE.Color(0x7000ff) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float bands = sin(vPosition.y * 6.0 + uTime * 20.0) * 0.5 + 0.5;
          float pole = pow(abs(vNormal.y), 3.0);
          vec3 col = mix(uColor2, uColor1, pole + bands * 0.4);
          gl_FragColor = vec4(col * 2.2, 1.0);
        }
      `,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const pulsarMesh = new THREE.Mesh(pGeo, pMat);
    pulsarMesh.position.set(...d.pos);
    deepGroup.add(pulsarMesh);

    // Haz Sincrotrón (Bipolar)
    const jetGeo = new THREE.CylinderGeometry(0.08, 1.4, 55, 32, 1, true);
    jetGeo.translate(0, 27.5, 0);
    const jetMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, transparent: true, opacity: 0.85,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false
    });
    const jetTop = new THREE.Mesh(jetGeo, jetMat);
    const jetBot = new THREE.Mesh(jetGeo, jetMat);
    jetBot.rotation.z = Math.PI;
    pulsarMesh.add(jetTop);
    pulsarMesh.add(jetBot);
    pulsarMesh.rotation.z = 0.45;

    focusables[d.id] = { mesh: pulsarMesh, data: d, mat: pMat };
  }

  // 2. Agujero Negro Schwarzschild/Kerr — Disco de Acreción con Perfil Térmico
  //    Shakura-Sunyaev, Beaming Doppler, Anillo Fotónico, Lente Gravitacional
  //    e Imagen Lensada Secundaria (inspirado en geodésicas de Schwarzschild)
  {
    const d = DEEPSPACE.find(x => x.id === 'agujero');
    const rs = 2.4;

    // --- Horizonte de Eventos (esfera negra pura) ---
    const horizonGeo = new THREE.SphereGeometry(rs, 64, 64);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eventHorizon = new THREE.Mesh(horizonGeo, horizonMat);
    eventHorizon.position.set(...d.pos);
    deepGroup.add(eventHorizon);

    // --- Halo Púrpura Exterior (Sincrotrón) ---
    eventHorizon.add(makeGlowMesh(rs * 1.42, 0xa78bfa, 0.18));

    // --- Anillo Fotónico Principal (Photon Ring at ~1.5 rs) ---
    const photonGeo = new THREE.TorusGeometry(rs * 1.5, 0.022, 32, 256);
    const photonMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vPos;
        void main() {
          float pulse = 0.82 + 0.18 * sin(uTime * 4.5 + vPos.x * 10.0);
          vec3 col = vec3(1.0, 0.97, 0.88) * pulse * 3.2;
          gl_FragColor = vec4(col, 0.95);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const photonRing = new THREE.Mesh(photonGeo, photonMat);
    photonRing.rotation.x = Math.PI / 2 - 0.35;
    eventHorizon.add(photonRing);

    // Segundo anillo fotónico (secondary, más delgado y tenue)
    const photon2Geo = new THREE.TorusGeometry(rs * 1.35, 0.01, 16, 256);
    const photon2 = new THREE.Mesh(photon2Geo, photonMat.clone());
    photon2.rotation.x = Math.PI / 2 - 0.35;
    eventHorizon.add(photon2);

    // --- Disco de Acreción Relativista con Perfil Térmico Shakura-Sunyaev,
    //     Beaming Doppler y Turbulencia Espiral (ShaderMaterial) ---
    const diskInnerR = rs * 1.5;
    const diskOuterR = rs * 5.0;
    const diskGeo = new THREE.RingGeometry(diskInnerR, diskOuterR, 256, 8);
    const diskMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uCamAngle: { value: 0 } },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uCamAngle;
        varying vec3 vPos;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        float noise(vec2 p){
          vec2 i=floor(p);vec2 f=fract(p);
          f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
                     mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
        }
        float fbm(vec2 p){
          float v=0.0,a=0.5;
          for(int i=0;i<5;i++){v+=a*noise(p);p*=2.1;a*=0.5;}
          return v;
        }
        void main(){
          float r=length(vPos.xz);
          float theta=atan(vPos.z,vPos.x);
          float innerR=3.6;
          float outerR=12.0;
          float t=clamp((r-innerR)/(outerR-innerR),0.0,1.0);
          float temp=pow(max(0.0,1.0-sqrt(innerR/max(r,0.001))),0.25);
          vec3 hotCol =vec3(0.75,0.85,1.0);
          vec3 warmCol=vec3(1.0,0.92,0.65);
          vec3 coolCol=vec3(1.0,0.45,0.08);
          vec3 coldCol=vec3(0.6,0.12,0.02);
          vec3 diskColor;
          if(t<0.12) diskColor=mix(hotCol,warmCol,t/0.12);
          else if(t<0.4) diskColor=mix(warmCol,coolCol,(t-0.12)/0.28);
          else diskColor=mix(coolCol,coldCol,(t-0.4)/0.6);
          float camTheta=theta-uCamAngle;
          float doppler=1.0+0.55*cos(camTheta);
          float dShift=0.15*cos(camTheta);
          diskColor.b+=dShift*(1.0-t);
          diskColor.r-=dShift*0.3;
          diskColor*=doppler;
          float spiral=theta*3.0-r*2.0+uTime*0.5;
          float turb=fbm(vec2(spiral,r*12.0));
          float turb2=fbm(vec2(theta*6.0+uTime*0.2,r*18.0+uTime*0.1));
          diskColor*=0.65+turb*0.5+turb2*0.2;
          float brightness=(1.0-t*0.65)*doppler;
          brightness*=smoothstep(outerR,outerR-outerR*0.2,r);
          brightness*=smoothstep(innerR-innerR*0.1,innerR+innerR*0.3,r);
          gl_FragColor=vec4(diskColor*brightness*2.5,clamp(brightness*0.92,0.0,1.0));
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const disk = new THREE.Mesh(diskGeo, diskMat);
    disk.rotation.x = Math.PI / 2 - 0.35;
    eventHorizon.add(disk);

    // --- Imagen Lensada del Disco (Secondary Gravitationally Lensed Image) ---
    // Luz del lado lejano del disco curvada por la gravedad del agujero negro
    const lensedInner = rs * 1.15;
    const lensedOuter = rs * 2.8;
    const lensedGeo = new THREE.RingGeometry(lensedInner, lensedOuter, 256, 4);
    const lensedMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uCamAngle: { value: 0 } },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uCamAngle;
        varying vec3 vPos;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        float noise(vec2 p){
          vec2 i=floor(p);vec2 f=fract(p);
          f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
                     mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
        }
        void main(){
          float r=length(vPos.xz);
          float theta=atan(vPos.z,vPos.x);
          float camTheta=theta-uCamAngle;
          float lIn=2.76;
          float lRange=3.96;
          float t=clamp((r-lIn)/lRange,0.0,1.0);
          vec3 col=mix(vec3(1.0,0.95,0.82),vec3(1.0,0.4,0.1),t);
          float doppler=1.0+0.4*cos(camTheta);
          float turb=0.7+0.3*noise(vec2(theta*5.0+uTime*0.3,r*15.0));
          float brightness=(1.0-t*0.5)*doppler*turb*0.6;
          gl_FragColor=vec4(col*brightness*2.0,clamp(brightness*0.7,0.0,1.0));
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const lensedDisk = new THREE.Mesh(lensedGeo, lensedMat);
    lensedDisk.rotation.x = -(Math.PI / 2 - 0.35);
    lensedDisk.rotation.z = Math.PI;
    eventHorizon.add(lensedDisk);

    // --- Anillo de Einstein / Halo de Lente Gravitacional ---
    const einsteinGeo = new THREE.SphereGeometry(rs * 1.12, 64, 64);
    const einsteinMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          float rim = 1.0 - abs(vNormal.z);
          // Anillo fotónico fino y brillante en el borde de la silueta
          float ring = pow(rim, 6.0) * 4.0;
          // Resplandor cálido amplio
          float glow = pow(rim, 2.5) * 0.8;
          // Intensificación ecuatorial (contribución del plano del disco)
          float equatorial = (1.0 - abs(vNormal.y)) * pow(rim, 3.0) * 2.0;
          float intensity = (ring + glow + equatorial) * (0.9 + 0.1 * sin(uTime * 3.0 + vPos.x * 4.0));
          vec3 col = mix(vec3(1.0, 0.55, 0.15), vec3(1.0, 0.97, 0.9), clamp(intensity * 0.3, 0.0, 1.0));
          gl_FragColor = vec4(col * intensity, clamp(intensity, 0.0, 0.96));
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    const einsteinHalo = new THREE.Mesh(einsteinGeo, einsteinMat);
    eventHorizon.add(einsteinHalo);

    // --- Chorros Relativistas Mejorados con Gradiente y Pulsación ---
    const jetLen = 35;
    const jetGeoUp = new THREE.CylinderGeometry(0.06, 2.0, jetLen, 32, 1, true);
    jetGeoUp.translate(0, jetLen / 2, 0);
    const jetMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying float vAlpha;
        varying vec3 vPos;
        void main() {
          vPos = position;
          vAlpha = clamp(1.0 - abs(position.y) / 17.5, 0.0, 1.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying float vAlpha;
        varying vec3 vPos;
        void main() {
          float pulse = 0.7 + 0.3 * sin(vPos.y * 2.0 - uTime * 5.0);
          vec3 col = mix(vec3(0.6, 0.8, 1.0), vec3(0.3, 0.5, 1.0), vAlpha) * pulse;
          gl_FragColor = vec4(col, vAlpha * 0.35 * pulse);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const jetTop = new THREE.Mesh(jetGeoUp, jetMat);
    const jetBot = new THREE.Mesh(jetGeoUp, jetMat);
    jetBot.rotation.z = Math.PI;
    eventHorizon.add(jetTop);
    eventHorizon.add(jetBot);

    // --- Estrella Hiperveloz S2 (Clase B0V, 18,000K) en Órbita Kepleriana Elíptica ---
    const s2Geo = new THREE.SphereGeometry(0.38, 24, 24);
    const s2Mat = new THREE.MeshBasicMaterial({ color: 0x9fbfff });
    const s2Star = new THREE.Mesh(s2Geo, s2Mat);
    s2Star.add(makeGlowMesh(0.75, 0x6e9fff, 0.45));
    s2Star.position.set(rs * 4.2, 0.5, 0);
    eventHorizon.add(s2Star);

    focusables[d.id] = {
      mesh: eventHorizon, data: d,
      disk, lensedDisk, photonRing, s2Star,
      einsteinMat, diskMat, lensedMat, photonMat, jetMat,
      mat: einsteinMat
    };
  }

  // 3. Gigante Roja
  {
    const d = DEEPSPACE.find(x => x.id === 'gigante');
    const redGeo = new THREE.SphereGeometry(14.0, 64, 64);
    const redMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorDark: { value: new THREE.Color(0x8b0000) },
        uColorBright: { value: new THREE.Color(0xff4500) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorDark;
        uniform vec3 uColorBright;
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          float conv = sin(vPos.x * 0.4 + uTime) * cos(vPos.y * 0.4 + uTime * 0.8) * sin(vPos.z * 0.4) * 0.5 + 0.5;
          float limb = pow(1.0 - abs(vNormal.z), 1.8);
          vec3 col = mix(uColorDark, uColorBright, conv);
          col += vec3(1.0, 0.3, 0.0) * limb * 0.8;
          gl_FragColor = vec4(col * 1.6, 1.0);
        }
      `
    });
    const giganteMesh = new THREE.Mesh(redGeo, redMat);
    giganteMesh.position.set(...d.pos);
    deepGroup.add(giganteMesh);
    focusables[d.id] = { mesh: giganteMesh, data: d, mat: redMat };
  }

  // 4. Enana Blanca con Anillo de Escombros
  {
    const d = DEEPSPACE.find(x => x.id === 'enana');
    const wGeo = new THREE.SphereGeometry(1.3, 48, 48);
    const wMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xe0f7ff) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vNormal;
        void main() {
          float rim = pow(1.0 - abs(vNormal.z), 2.2);
          gl_FragColor = vec4(uColor * (1.5 + rim * 2.0), 1.0);
        }
      `
    });
    const enanaMesh = new THREE.Mesh(wGeo, wMat);
    enanaMesh.position.set(...d.pos);
    deepGroup.add(enanaMesh);

    // Anillo de escombros circunestelar
    const debGeo = new THREE.RingGeometry(2.4, 7.8, 80);
    const debMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd, side: THREE.DoubleSide,
      transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending
    });
    const debrisRing = new THREE.Mesh(debGeo, debMat);
    debrisRing.rotation.x = Math.PI / 2 + 0.3;
    enanaMesh.add(debrisRing);

    focusables[d.id] = { mesh: enanaMesh, data: d, mat: wMat };
  }

  // 5. Nebulosa de Emisión Volumétrica H-alpha/OIII (10,000 partículas con Curva Gaussiana Analítica)
  {
    const d = DEEPSPACE.find(x => x.id === 'nebulosa');
    const count = 10000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const size = new Float32Array(count);

    // Paletas de Banda Estrecha Hubble SHO (H-alpha, [OIII], [SII]) y Polvo Oscuro Barnard
    const palettes = [
      [0.98, 0.22, 0.32], // 0: H-alpha (crimson pink/red emisión de hidrógeno)
      [0.10, 0.82, 0.85], // 1: [OIII] (teal/cian oxígeno doblemente ionizado)
      [0.99, 0.68, 0.18], // 2: [SII] (ámbar dorado sulfuro ionizado)
      [0.06, 0.05, 0.08], // 3: Polvo molecular oscuro tipo Barnard (absorción interestelar)
      [0.35, 0.60, 0.98]  // 4: Reflexión azul de estrellas calientes
    ];

    for (let i = 0; i < count; i++) {
      const u = Math.random(), v = Math.random();
      const th = u * Math.PI * 2;
      const ph = Math.acos(2 * v - 1);
      const r = Math.pow(Math.random(), 0.65) * 22;

      const arm = Math.sin(th * 2.0) * 4.0;
      const x = r * Math.sin(ph) * Math.cos(th) + (Math.random() - 0.5) * 5.0;
      const y = r * Math.cos(ph) * 0.6 + arm;
      const z = r * Math.sin(ph) * Math.sin(th) + (Math.random() - 0.5) * 5.0;

      pos[i * 3] = d.pos[0] + x;
      pos[i * 3 + 1] = d.pos[1] + y;
      pos[i * 3 + 2] = d.pos[2] + z;

      let colorIdx = 0;
      const dist = Math.sqrt(x * x + y * y + z * z);
      const laneNoise = Math.sin(x * 0.7) * Math.cos(z * 0.7);
      if (laneNoise > 0.42 && dist < 12.0) {
        colorIdx = 3; // Polvo oscuro interestelar (Barnard dust lanes)
      } else if (dist < 5.5) {
        colorIdx = Math.random() < 0.65 ? 1 : 4; // [OIII] y Reflexión azul en núcleo caliente
      } else if (dist < 13.5) {
        colorIdx = Math.random() < 0.70 ? 0 : 2; // H-alpha y [SII]
      } else {
        colorIdx = Math.random() < 0.60 ? 2 : 0; // [SII] y H-alpha en periferia
      }

      const c = palettes[colorIdx];
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
      size[i] = (colorIdx === 3 ? 2.4 : 1.8) + Math.random() * 2.8;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float aSize;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          float alpha = exp(-dist * dist * 18.0) * smoothstep(0.5, 0.12, dist);
          gl_FragColor = vec4(vColor * 1.8, alpha * 0.88);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });
    const cloud = new THREE.Points(geo, mat);

    // Cúmulo de estrellas jóvenes
    const sCount = 120;
    const sGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(sCount * 3);
    for (let i = 0; i < sCount; i++) {
      sPos[i * 3] = d.pos[0] + (Math.random() - 0.5) * 12;
      sPos[i * 3 + 1] = d.pos[1] + (Math.random() - 0.5) * 8;
      sPos[i * 3 + 2] = d.pos[2] + (Math.random() - 0.5) * 12;
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    const sMat = new THREE.PointsMaterial({
      size: 1.1, color: 0xfffcf0, map: DOT, transparent: true, opacity: 0.95,
      blending: THREE.AdditiveBlending, depthWrite: false
    });
    const babyStars = new THREE.Points(sGeo, sMat);

    const nebGroup = new THREE.Group();
    nebGroup.add(cloud);
    nebGroup.add(babyStars);
    deepGroup.add(nebGroup);

    focusables[d.id] = { mesh: cloud, data: d };
  }

  // 6. Galaxia Espiral (20,000 partículas con Curva Gaussiana Analítica)
  {
    const d = DEEPSPACE.find(x => x.id === 'galaxia');
    const count = 20000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const size = new Float32Array(count);

    const cBlue = new THREE.Color(0x60a5fa);
    const cCyan = new THREE.Color(0x38bdf8);
    const cYellow = new THREE.Color(0xfde047);
    const cOrange = new THREE.Color(0xf97316);

    for (let i = 0; i < count; i++) {
      const arm = (i % 2) * Math.PI;
      const r = Math.pow(Math.random(), 0.55) * 28;
      const twist = r * 0.42;
      const th = arm + twist + (Math.random() - 0.5) * (0.45 + r * 0.02);

      const x = r * Math.cos(th);
      const z = r * Math.sin(th);
      const y = (Math.random() - 0.5) * (3.5 * Math.exp(-r * 0.15));

      pos[i * 3] = d.pos[0] + x;
      pos[i * 3 + 1] = d.pos[1] + y;
      pos[i * 3 + 2] = d.pos[2] + z;

      const dist = Math.sqrt(x * x + z * z);
      let color = new THREE.Color();
      if (dist < 4.5) {
        color.copy(cYellow).lerp(cOrange, Math.random() * 0.5);
      } else {
        const armCenter = Math.abs(Math.sin(th * 2.0));
        color.copy(cBlue).lerp(cCyan, armCenter).lerp(cYellow, Math.random() * 0.2);
      }

      col[i * 3] = color.r; col[i * 3 + 1] = color.g; col[i * 3 + 2] = color.b;
      size[i] = dist < 5.0 ? (1.5 + Math.random() * 1.8) : (0.8 + Math.random() * 1.4);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float aSize;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          float alpha = exp(-dist * dist * 16.0) * smoothstep(0.5, 0.10, dist);
          gl_FragColor = vec4(vColor * 1.6, alpha * 0.92);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const galaxyStars = new THREE.Points(geo, mat);
    galaxyStars.rotation.x = 0.55;
    galaxyStars.rotation.z = 0.25;

    // Bulbo central
    const coreGeo = new THREE.SphereGeometry(3.2, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xfffaed, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(...d.pos);
    deepGroup.add(coreMesh);
    deepGroup.add(galaxyStars);

    focusables[d.id] = { mesh: coreMesh, data: d, galaxyStars };
  }

  // 7. Disco Protoplanetario Herbig-Haro (HH-24) — Estrella T-Tauri, Disco Kepleriano con Brechas y Chorros Bipolares
  {
    const d = DEEPSPACE.find(x => x.id === 'protoplanetario');
    if (d) {
      const protoGroup = new THREE.Group();
      protoGroup.position.set(...d.pos);
      deepGroup.add(protoGroup);

      // Estrella joven central T-Tauri (4300K - naranja rojiza cálida)
      const starGeo = new THREE.SphereGeometry(1.4, 32, 32);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xffa050 });
      const protoStar = new THREE.Mesh(starGeo, starMat);
      protoStar.add(makeGlowMesh(1.4 * 1.6, 0xff8c42, 0.45));
      protoGroup.add(protoStar);

      // Disco Protoplanetario con Brechas de Acreción Keplerianas
      const diskGeo = new THREE.RingGeometry(2.2, 11.5, 128, 8);
      const diskMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec3 vPos;
          void main() {
            float r = length(vPos.xz);
            float theta = atan(vPos.z, vPos.x);
            float normR = clamp((r - 2.2) / 9.3, 0.0, 1.0);
            // Brechas keplerianas donde protoplanetas han limpiado la órbita (gaps en r~4.6 y r~8.2)
            float gap1 = smoothstep(4.2, 4.6, r) * (1.0 - smoothstep(4.6, 5.0, r));
            float gap2 = smoothstep(7.7, 8.2, r) * (1.0 - smoothstep(8.2, 8.7, r));
            float density = 1.0 - gap1 * 0.88 - gap2 * 0.92;
            density *= smoothstep(2.2, 2.8, r) * smoothstep(11.5, 10.5, r);
            // Rotación diferencial Kepleriana y textura de polvo
            float spiral = sin(theta * 4.0 - r * 3.5 + uTime * 0.4) * 0.15 + 0.85;
            vec3 warmDust = vec3(0.98, 0.65, 0.35);
            vec3 coolDust = vec3(0.65, 0.45, 0.30);
            vec3 col = mix(warmDust, coolDust, normR) * density * spiral;
            gl_FragColor = vec4(col * 1.5, density * 0.85);
          }
        `,
        side: THREE.DoubleSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const protoDisk = new THREE.Mesh(diskGeo, diskMat);
      protoDisk.rotation.x = Math.PI / 2 - 0.28;
      protoGroup.add(protoDisk);

      // Chorros Bipolares Colimados Herbig-Haro (Norte y Sur)
      const jetLen = 22;
      const jetGeo = new THREE.CylinderGeometry(0.1, 1.6, jetLen, 24, 1, true);
      jetGeo.translate(0, jetLen / 2, 0);
      const jetMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying float vAlpha;
          varying vec3 vPos;
          void main() {
            vPos = position;
            vAlpha = clamp(1.0 - abs(position.y) / 18.0, 0.0, 1.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying float vAlpha;
          varying vec3 vPos;
          void main() {
            float shock = sin(vPos.y * 1.5 - uTime * 6.0) * 0.35 + 0.65;
            vec3 col = mix(vec3(0.1, 0.9, 1.0), vec3(1.0, 0.2, 0.5), vAlpha) * shock;
            gl_FragColor = vec4(col * 1.8, vAlpha * 0.55 * shock);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const jetNorth = new THREE.Mesh(jetGeo, jetMat);
      const jetSouth = new THREE.Mesh(jetGeo, jetMat);
      jetSouth.rotation.z = Math.PI;
      protoGroup.add(jetNorth);
      protoGroup.add(jetSouth);

      focusables[d.id] = {
        mesh: protoGroup, data: d,
        protoStar, protoDisk, jetNorth, jetSouth,
        diskMat, jetMat, mat: diskMat
      };
    }
  }

  // 8. Sistema Binario de Contacto (Transferencia de Masa y Lóbulo de Roche L1)
  {
    const d = DEEPSPACE.find(x => x.id === 'binario');
    if (d) {
      const binGroup = new THREE.Group();
      binGroup.position.set(...d.pos);
      deepGroup.add(binGroup);

      // Estrella Primaria Caliente (Clase B, 12500K - Azul Blanco)
      const primaryGeo = new THREE.SphereGeometry(1.6, 32, 32);
      const primaryMat = new THREE.MeshBasicMaterial({ color: 0x9bbcff });
      const primaryStar = new THREE.Mesh(primaryGeo, primaryMat);
      primaryStar.add(makeGlowMesh(1.6 * 1.5, 0x7da4ff, 0.45));
      primaryStar.position.set(-2.8, 0, 0);
      binGroup.add(primaryStar);

      // Estrella Secundaria Gigante (Clase K, 4500K - Naranja, llenando su lóbulo de Roche)
      const secondaryGeo = new THREE.SphereGeometry(1.4, 32, 32);
      const secondaryMat = new THREE.MeshBasicMaterial({ color: 0xffa85e });
      const secondaryStar = new THREE.Mesh(secondaryGeo, secondaryMat);
      secondaryStar.add(makeGlowMesh(1.4 * 1.4, 0xff883e, 0.4));
      secondaryStar.position.set(2.8, 0, 0);
      binGroup.add(secondaryStar);

      // Disco de acreción alrededor de la estrella primaria
      const accGeo = new THREE.RingGeometry(1.8, 3.5, 64);
      const accMat = new THREE.MeshBasicMaterial({
        color: 0x99ddff, side: THREE.DoubleSide,
        transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending
      });
      const accDisk = new THREE.Mesh(accGeo, accMat);
      accDisk.rotation.x = Math.PI / 2 - 0.2;
      primaryStar.add(accDisk);

      // Corriente de Acreción L1 (Puente de Plasma entre Secundaria y Primaria)
      const streamCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(2.8, 0, 0),
        new THREE.Vector3(0.0, 1.2, 0.8),
        new THREE.Vector3(-2.8, 0, 0)
      );
      const streamGeo = new THREE.TubeGeometry(streamCurve, 32, 0.18, 12, false);
      const streamMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying float vUvX;
          void main() {
            vUvX = uv.x;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying float vUvX;
          void main() {
            float flow = sin(vUvX * 18.0 - uTime * 8.0) * 0.4 + 0.6;
            vec3 col = mix(vec3(1.0, 0.65, 0.25), vec3(0.6, 0.85, 1.0), vUvX) * flow;
            gl_FragColor = vec4(col * 2.0, 0.85 * flow);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const l1Stream = new THREE.Mesh(streamGeo, streamMat);
      binGroup.add(l1Stream);

      focusables[d.id] = {
        mesh: binGroup, data: d,
        primaryStar, secondaryStar, accDisk, l1Stream,
        streamMat, mat: streamMat
      };
    }
  }

  return deepGroup;
}
