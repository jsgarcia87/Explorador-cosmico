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

/* ---------- 1. Generador de Normal Maps PBR (Relieve de Montañas y Cráteres) ---------- */
function planetNormalTexture(opts = {}) {
  const { craters = false, mountains = true, scale = 1.0 } = opts;
  const w = 1024, h = 512;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;

  // Función de altura en punto (u, v)
  function getHeight(u, v) {
    const lat = (v - 0.5) * Math.PI;
    const cosLat = Math.cos(lat);
    const lon = u * Math.PI * 2;
    const nx = cosLat * Math.cos(lon), ny = Math.sin(lat), nz = cosLat * Math.sin(lon);
    let hVal = 0, amp = 1, freq = 3.0, norm = 0;
    for (let o = 0; o < 6; o++) {
      hVal += simplex.noise3D(nx * freq, ny * freq, nz * freq) * amp;
      norm += amp; amp *= 0.48; freq *= 2.05;
    }
    hVal /= norm;
    if (craters) {
      const c1 = simplex.noise3D(nx * 20, ny * 20, nz * 20);
      if (c1 > 0.45) hVal -= (c1 - 0.45) * 2.0;
    }
    return hVal * scale;
  }

  const epsU = 1.0 / w, epsV = 1.0 / h;
  for (let y = 0; y < h; y++) {
    const v = y / h;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const idx = (y * w + x) * 4;
      const h0 = getHeight(u, v);
      const hU = getHeight(u + epsU, v);
      const hV = getHeight(u, v + epsV);

      // Calcular vector normal en espacio tangente
      const dx = (h0 - hU) * 8.0;
      const dy = (h0 - hV) * 8.0;
      const dz = 1.0;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);

      d[idx]     = Math.floor(((dx / len) * 0.5 + 0.5) * 255);
      d[idx + 1] = Math.floor(((dy / len) * 0.5 + 0.5) * 255);
      d[idx + 2] = Math.floor(((dz / len) * 0.5 + 0.5) * 255);
      d[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 16;
  return tex;
}

/* ---------- 2. Generador de Roughness Maps PBR (Océanos brillantes, tierra rugosa) ---------- */
function planetRoughnessTexture(opts = {}) {
  const { isEarth = false } = opts;
  const w = 1024, h = 512;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;

  for (let y = 0; y < h; y++) {
    const v = y / h;
    const lat = (v - 0.5) * Math.PI;
    const cosLat = Math.cos(lat);
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const lon = u * Math.PI * 2;
      const nx = cosLat * Math.cos(lon), ny = Math.sin(lat), nz = cosLat * Math.sin(lon);
      const idx = (y * w + x) * 4;
      let n = 0, amp = 1, freq = 2.0, norm = 0;
      for (let o = 0; o < 6; o++) {
        n += simplex.noise3D(nx * freq, ny * freq, nz * freq) * amp;
        norm += amp; amp *= 0.48; freq *= 2.05;
      }
      n /= norm;
      let roughness = 0.75;
      if (isEarth) {
        // Océanos más brillantes/especulares (0.22), Tierra firme rugosa (0.85)
        roughness = n < 0.0 ? 0.22 : 0.85;
      } else {
        roughness = THREE.MathUtils.lerp(0.6, 0.95, (n + 1) * 0.5);
      }
      const val = Math.floor(roughness * 255);
      d[idx] = val; d[idx + 1] = val; d[idx + 2] = val; d[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

/* ---------- 3. Mapa Emisor de Luces Nocturnas de la Tierra ---------- */
function earthNightShader() {
  const w = 1024, h = 512;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;

  for (let y = 0; y < h; y++) {
    const v = y / h;
    const lat = (v - 0.5) * Math.PI;
    const cosLat = Math.cos(lat);
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const lon = u * Math.PI * 2;
      const nx = cosLat * Math.cos(lon), ny = Math.sin(lat), nz = cosLat * Math.sin(lon);
      const idx = (y * w + x) * 4;

      let n = 0, amp = 1, freq = 2.0, norm = 0;
      for (let o = 0; o < 7; o++) {
        n += simplex.noise3D(nx * freq, ny * freq, nz * freq) * amp;
        norm += amp; amp *= 0.48; freq *= 2.05;
      }
      n /= norm;

      let cityLight = 0;
      // Ciudades costeras y en tierra firme (donde n > 0.01 y n < 0.25)
      if (n > 0.01 && n < 0.28) {
        const cityNoise = simplex.noise3D(nx * 22, ny * 22, nz * 22);
        if (cityNoise > 0.35) {
          cityLight = Math.pow((cityNoise - 0.35) * 1.5, 1.6);
        }
      }

      const r = Math.min(255, cityLight * 255 * 1.2);
      const gCol = Math.min(255, cityLight * 185 * 1.1);
      const b = Math.min(255, cityLight * 60);

      d[idx] = r; d[idx + 1] = gCol; d[idx + 2] = b; d[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

/* ---------- 4. Textura Albedo de Planetas con Ruido fBm ---------- */
function planetTexture(baseHex, opts = {}) {
  const { bands = false, bandSoft = false, craters = false, poles = false, poleSize = 0.16, spot = null } = opts;
  const w = 1024, h = 512;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const base = new THREE.Color(baseHex);
  const hsl = {}; base.getHSL(hsl);

  for (let y = 0; y < h; y++) {
    const v = y / h;
    const lat = (v - 0.5) * Math.PI;
    const cosLat = Math.cos(lat);
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const lon = u * Math.PI * 2;
      const nx = cosLat * Math.cos(lon), ny = Math.sin(lat), nz = cosLat * Math.sin(lon);
      const idx = (y * w + x) * 4;

      let n = 0, amp = 1, freq = 2.2, norm = 0;
      for (let o = 0; o < 6; o++) {
        n += simplex.noise3D(nx * freq, ny * freq, nz * freq) * amp;
        norm += amp; amp *= 0.48; freq *= 2.05;
      }
      n /= norm;

      let l = hsl.l + n * 0.16;
      let s = hsl.s;
      let hCol = hsl.h;

      if (bands) {
        const bFreq = bandSoft ? 14 : 26;
        const bNoise = simplex.noise3D(nx * 1.5, ny * bFreq, nz * 1.5) * 0.5;
        const bVal = Math.sin(ny * bFreq + bNoise * 3.0);
        l += bVal * 0.08;
        if (bVal > 0.3) s *= 1.15;
      }

      if (craters) {
        const c1 = simplex.noise3D(nx * 18, ny * 18, nz * 18);
        const c2 = simplex.noise3D(nx * 42, ny * 42, nz * 42);
        if (c1 > 0.45 || c2 > 0.62) {
          l *= 0.65; s *= 0.4;
        }
      }

      if (poles) {
        const pDist = Math.min(v, 1 - v);
        if (pDist < poleSize) {
          const mix = 1 - (pDist / poleSize);
          const pNoise = simplex.noise3D(nx * 8, ny * 8, nz * 8) * 0.15;
          if (mix + pNoise > 0.3) {
            l = THREE.MathUtils.lerp(l, 0.94, Math.min(1, mix * 1.5));
            s *= 0.2;
          }
        }
      }

      if (spot) {
        const dx = u - spot.u, dy = (v - spot.v) * 2.0;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < spot.r) {
          const sm = 1 - dist / spot.r;
          hCol = spot.h;
          l = THREE.MathUtils.lerp(l, spot.l, sm);
          s = THREE.MathUtils.lerp(s, spot.s, sm);
        }
      }

      l = Math.max(0.02, Math.min(0.98, l));
      s = Math.max(0, Math.min(1, s));
      const col = new THREE.Color().setHSL(hCol, s, l);
      d[idx] = col.r * 255; d[idx + 1] = col.g * 255; d[idx + 2] = col.b * 255; d[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 16;
  return tex;
}

/* ---------- 5. Textura Solar HD de Granulación ---------- */
function sunTexture() {
  const w = 1024, h = 512;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let y = 0; y < h; y++) {
    const v = y / h;
    const lat = (v - 0.5) * Math.PI;
    const cosLat = Math.cos(lat);
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const lon = u * Math.PI * 2;
      const nx = cosLat * Math.cos(lon), ny = Math.sin(lat), nz = cosLat * Math.sin(lon);
      const idx = (y * w + x) * 4;
      let n = 0, amp = 1, freq = 4.0, norm = 0;
      for (let o = 0; o < 6; o++) {
        n += Math.abs(simplex.noise3D(nx * freq, ny * freq, nz * freq)) * amp;
        norm += amp; amp *= 0.5; freq *= 2.1;
      }
      n = 1.0 - (n / norm);
      n = Math.pow(n, 1.8);
      const r = THREE.MathUtils.lerp(0.95, 1.0, n);
      const gCol = THREE.MathUtils.lerp(0.35, 0.85, n);
      const b = THREE.MathUtils.lerp(0.0, 0.25, n * n);
      d[idx] = r * 255; d[idx + 1] = gCol * 255; d[idx + 2] = b * 255; d[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 16;
  return tex;
}

/* ---------- 6. Textura Terrestre HD con Océanos y Continentes ---------- */
function earthShader() {
  const w = 1024, h = 512;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;

  for (let y = 0; y < h; y++) {
    const v = y / h;
    const lat = (v - 0.5) * Math.PI;
    const cosLat = Math.cos(lat);
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const lon = u * Math.PI * 2;
      const nx = cosLat * Math.cos(lon), ny = Math.sin(lat), nz = cosLat * Math.sin(lon);
      const idx = (y * w + x) * 4;

      let n = 0, amp = 1, freq = 2.0, norm = 0;
      for (let o = 0; o < 7; o++) {
        n += simplex.noise3D(nx * freq, ny * freq, nz * freq) * amp;
        norm += amp; amp *= 0.48; freq *= 2.05;
      }
      n /= norm;

      let col;
      if (n < -0.05) {
        const depth = Math.min(1, Math.abs(n) * 2.5);
        col = new THREE.Color().setHSL(0.58, 0.85, 0.18 + depth * 0.15);
      } else if (n < 0.02) {
        col = new THREE.Color(0xd4a373);
      } else if (n < 0.35) {
        const green = (n - 0.02) * 2.5;
        col = new THREE.Color().setHSL(0.31, 0.65, 0.28 - green * 0.08);
      } else {
        col = new THREE.Color(0x8d6e63);
      }

      const pDist = Math.min(v, 1 - v);
      if (pDist < 0.15) {
        const mix = 1 - (pDist / 0.15);
        if (mix > 0.2) col.lerp(new THREE.Color(0xffffff), mix);
      }

      d[idx] = col.r * 255; d[idx + 1] = col.g * 255; d[idx + 2] = col.b * 255; d[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 16;
  return tex;
}

/* ---------- 7. Textura de Nubes Terrestres 3D con Sombra ---------- */
function earthCloudsTexture() {
  const w = 1024, h = 512;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  const d = img.data;

  for (let y = 0; y < h; y++) {
    const v = y / h;
    const lat = (v - 0.5) * Math.PI;
    const cosLat = Math.cos(lat);
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const lon = u * Math.PI * 2;
      const nx = cosLat * Math.cos(lon), ny = Math.sin(lat), nz = cosLat * Math.sin(lon);
      const idx = (y * w + x) * 4;

      let cn = 0, camp = 1, cf = 3.5, cnorm = 0;
      for (let o = 0; o < 5; o++) {
        cn += simplex.noise3D(nx * cf + 50, ny * cf + 50, nz * cf + 50) * camp;
        cnorm += camp; camp *= 0.5; cf *= 2.0;
      }
      cn /= cnorm;
      let alpha = 0;
      if (cn > 0.16) {
        alpha = Math.min(255, (cn - 0.16) * 4.0 * 255);
      }
      d[idx] = 255; d[idx + 1] = 255; d[idx + 2] = 255; d[idx + 3] = alpha;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

/* ---------- 8. Fondo Estelar Multi-Espectral y Vía Láctea ---------- */
function createMilkyWayBackground(scene) {
  const sCount = 7000;
  const sGeo = new THREE.BufferGeometry();
  const sPos = new Float32Array(sCount * 3);
  const sCol = new Float32Array(sCount * 3);

  // Clases espectrales reales (O azulado, B, A, F, G amarillo, K, M rojizo)
  const starColors = [
    new THREE.Color(0x9db4ff), // O/B
    new THREE.Color(0xbbccff), // A
    new THREE.Color(0xfbf8ff), // F
    new THREE.Color(0xfff4e8), // G (Sol)
    new THREE.Color(0xffddb4), // K
    new THREE.Color(0xffb78c)  // M
  ];

  for (let i = 0; i < sCount; i++) {
    const u = Math.random(), v = Math.random();
    const th = u * Math.PI * 2;
    const ph = Math.acos(2 * v - 1);
    const r = 400 + Math.random() * 800;
    sPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    sPos[i * 3 + 1] = r * Math.cos(ph);
    sPos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);

    const c = starColors[Math.floor(Math.random() * starColors.length)];
    sCol[i * 3] = c.r; sCol[i * 3 + 1] = c.g; sCol[i * 3 + 2] = c.b;
  }
  sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  sGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));

  const sMat = new THREE.PointsMaterial({
    size: 0.65, vertexColors: true, map: DOT,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
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

    // Texturas personalizadas
    let tex, nTex = null, rTex = null, emTex = null;
    if (p.id === 'tierra') {
      tex = earthShader();
      nTex = planetNormalTexture({ mountains: true });
      rTex = planetRoughnessTexture({ isEarth: true });
      emTex = earthNightShader();
    } else if (p.id === 'mercurio') {
      tex = planetTexture(0x9b9b9b, { craters: true });
      nTex = planetNormalTexture({ craters: true });
      rTex = planetRoughnessTexture();
    } else if (p.id === 'venus') {
      tex = planetTexture(0xe8c170, { bands: true, bandSoft: true });
      nTex = planetNormalTexture({ scale: 0.3 });
      rTex = planetRoughnessTexture();
    } else if (p.id === 'marte') {
      tex = planetTexture(0xef4444, { craters: true, poles: true });
      nTex = planetNormalTexture({ craters: true, scale: 1.2 });
      rTex = planetRoughnessTexture();
    } else if (p.id === 'jupiter') {
      tex = planetTexture(0xf59e0b, {
        bands: true, bandSoft: false,
        spot: { u: 0.65, v: 0.68, r: 0.08, h: 0.04, s: 0.9, l: 0.45 }
      });
      rTex = planetRoughnessTexture();
    } else if (p.id === 'saturno') {
      tex = planetTexture(0xfde047, { bands: true, bandSoft: true });
      rTex = planetRoughnessTexture();
    } else if (p.id === 'urano') {
      tex = planetTexture(0x22d3ee, { bands: true, bandSoft: true });
      rTex = planetRoughnessTexture();
    } else if (p.id === 'neptuno') {
      tex = planetTexture(0x2563eb, { bands: true, bandSoft: false });
      rTex = planetRoughnessTexture();
    }

    const pGeo = new THREE.SphereGeometry(p.radius, 48, 48);
    const pMat = new THREE.MeshStandardMaterial({
      map: tex,
      normalMap: nTex,
      normalScale: nTex ? new THREE.Vector2(0.9, 0.9) : undefined,
      roughnessMap: rTex,
      roughness: rTex ? 1.0 : 0.8,
      emissiveMap: emTex,
      emissive: emTex ? new THREE.Color(0xffffff) : new THREE.Color(0x000000),
      emissiveIntensity: emTex ? 0.95 : 0.0,
      metalness: 0.04
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
      const cloudGeo = new THREE.SphereGeometry(p.radius * 1.015, 48, 48);
      const cloudMat = new THREE.MeshStandardMaterial({
        map: earthCloudsTexture(),
        transparent: true,
        opacity: 0.9,
        roughness: 0.9,
        depthWrite: false
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      cloudMesh.castShadow = true;
      cloudMesh.receiveShadow = true;
      pMesh.add(cloudMesh);
      pMesh.userData.cloudMesh = cloudMesh;
    }

    // Atmósfera Realista de Rayleigh/Fresnel para Tierra & Venus
    if (p.id === 'tierra' || p.id === 'venus') {
      const atmColor = p.id === 'tierra' ? 0x3b82f6 : 0xfde047;
      const atmMat = new THREE.ShaderMaterial({
        uniforms: {
          c: { value: 0.28 },
          p: { value: 4.2 },
          glowColor: { value: new THREE.Color(atmColor) },
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
      const atmMesh = new THREE.Mesh(new THREE.SphereGeometry(p.radius * 1.18, 48, 48), atmMat);
      pMesh.add(atmMesh);
      pMesh.userData.atmMat = atmMat;
    }

    // Anillos HD con División de Cassini (Saturno & Urano)
    if (p.id === 'saturno' || p.id === 'urano') {
      const inner = p.radius * 1.35;
      const outer = p.radius * (p.id === 'saturno' ? 2.5 : 1.95);
      const ringGeo = new THREE.RingGeometry(inner, outer, 80);
      const pos = ringGeo.attributes.position;
      const v3 = new THREE.Vector3();
      const colors = [];
      for (let k = 0; k < pos.count; k++) {
        v3.fromBufferAttribute(pos, k);
        const dist = v3.length();
        const norm = (dist - inner) / (outer - inner);
        let alpha = Math.sin(norm * Math.PI) * (p.id === 'saturno' ? 0.9 : 0.45);
        // Simular división de Cassini en Saturno
        if (p.id === 'saturno' && norm > 0.65 && norm < 0.72) {
          alpha *= 0.12;
        }
        colors.push(1, 1, 1, alpha);
      }
      ringGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
      const ringMat = new THREE.MeshStandardMaterial({
        color: p.id === 'saturno' ? 0xd4a373 : 0x94a3b8,
        side: THREE.DoubleSide,
        transparent: true,
        roughness: 0.8,
        vertexColors: true
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

  // Activar sombras en el renderer
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

  // 2. Agujero Negro Relativista tipo Kerr ("Gargantua") con Anillo Fotónico & Doppler Beaming
  {
    const d = DEEPSPACE.find(x => x.id === 'agujero');
    const horizonGeo = new THREE.SphereGeometry(2.6, 64, 64);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eventHorizon = new THREE.Mesh(horizonGeo, horizonMat);
    eventHorizon.position.set(...d.pos);
    deepGroup.add(eventHorizon);

    // Anillo Fotónico / Esfera de Fotones (ISCO Photon Ring)
    const photonGeo = new THREE.TorusGeometry(2.72, 0.08, 32, 128);
    const photonMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xe0f7ff) }
      },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vPos;
        void main() {
          float pulse = 0.85 + 0.15 * sin(uTime * 4.0);
          gl_FragColor = vec4(uColor * pulse * 2.8, 0.95);
        }
      `,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    const photonRing = new THREE.Mesh(photonGeo, photonMat);
    eventHorizon.add(photonRing);

    // Anillos de Einstein (Lentes Gravitacionales Superior e Inferior)
    const lensGeo = new THREE.TorusGeometry(3.6, 0.48, 48, 160, Math.PI);
    const lensMat = new THREE.ShaderMaterial({
      uniforms: {
        uColorHot: { value: new THREE.Color(0xffffff) },
        uColorCold: { value: new THREE.Color(0xff3300) }
      },
      vertexShader: `
        varying vec3 vPos;
        varying vec2 vUv;
        void main() {
          vPos = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorHot;
        uniform vec3 uColorCold;
        varying vec3 vPos;
        varying vec2 vUv;
        void main() {
          float beam = smoothstep(-3.6, 3.6, vPos.x);
          vec3 col = mix(uColorCold, uColorHot, pow(beam, 1.4));
          float edge = sin(vUv.y * 3.14159);
          gl_FragColor = vec4(col * (1.8 + beam * 1.6) * edge, 0.95);
        }
      `,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    const upperLens = new THREE.Mesh(lensGeo, lensMat);
    upperLens.rotation.x = Math.PI / 2;
    eventHorizon.add(upperLens);

    const lowerLens = new THREE.Mesh(lensGeo, lensMat);
    lowerLens.rotation.x = -Math.PI / 2;
    lowerLens.rotation.z = Math.PI;
    eventHorizon.add(lowerLens);

    // Disco de Acreción Relativista de Kerr con Doppler Beaming y Turbulencia MRI
    const diskGeo = new THREE.RingGeometry(2.9, 12.0, 180, 16);
    const pos = diskGeo.attributes.position;
    const colors = [];
    const v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      const dist = v3.length();
      const norm = (dist - 2.9) / (12.0 - 2.9);
      const alpha = Math.sin(Math.pow(1 - norm, 0.7) * Math.PI) * 0.95;
      colors.push(1, 1, 1, alpha);
    }
    diskGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));

    const diskMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorHot: { value: new THREE.Color(0xffffff) },
        uColorMid: { value: new THREE.Color(0xffaa00) },
        uColorFar: { value: new THREE.Color(0x881100) }
      },
      vertexShader: `
        attribute vec4 color;
        varying vec4 vColor;
        varying vec3 vPos;
        varying vec2 vUv;
        void main() {
          vColor = color;
          vPos = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorHot;
        uniform vec3 uColorMid;
        uniform vec3 uColorFar;
        varying vec4 vColor;
        varying vec3 vPos;
        varying vec2 vUv;

        float noise(vec2 p) {
          return sin(p.x * 12.0 + uTime * 4.0) * cos(p.y * 12.0 - uTime * 3.0) * 0.5 + 0.5;
        }

        void main() {
          float dist = length(vPos.xy);
          float radNorm = clamp((dist - 2.9) / (12.0 - 2.9), 0.0, 1.0);
          float doppler = smoothstep(-12.0, 12.0, vPos.x);

          // Factor Doppler relativista asimétrico de Kerr
          float beaming = pow(doppler, 1.7) * 2.6 + 0.4;

          vec3 baseCol = mix(uColorFar, uColorMid, pow(1.0 - radNorm, 0.8));
          baseCol = mix(baseCol, uColorHot, pow(beaming, 1.5) * (1.0 - radNorm * 0.4));

          float angle = atan(vPos.y, vPos.x);
          float spiral = sin(radNorm * 38.0 - uTime * 5.0 + angle * 3.0) * 0.5 + 0.5;
          float n = noise(vPos.xy * 0.7);
          float detail = mix(0.65, 1.35, spiral * 0.6 + n * 0.4);

          float alpha = vColor.a * detail * clamp(0.35 + doppler * 0.85, 0.0, 1.0);
          gl_FragColor = vec4(baseCol * detail * beaming * 1.4, alpha);
        }
      `,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });

    const disk = new THREE.Mesh(diskGeo, diskMat);
    disk.rotation.x = Math.PI / 2 + 0.28;
    disk.rotation.y = 0.15;
    eventHorizon.add(disk);

    // Chorros Polares Relativistas de Sincrotrón
    const jetGeo = new THREE.CylinderGeometry(0.12, 2.6, 60, 32, 1, true);
    jetGeo.translate(0, 30, 0);
    const jetMat = new THREE.MeshBasicMaterial({
      color: 0xcceeff, transparent: true, opacity: 0.45,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false
    });
    const jetTop = new THREE.Mesh(jetGeo, jetMat);
    const jetBot = new THREE.Mesh(jetGeo, jetMat);
    jetBot.rotation.z = Math.PI;
    eventHorizon.add(jetTop);
    eventHorizon.add(jetBot);

    focusables[d.id] = { mesh: eventHorizon, data: d, diskMat, lensMat, photonMat };
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

    const palettes = [
      [0.92, 0.18, 0.38],
      [0.85, 0.28, 0.65],
      [0.15, 0.78, 0.72],
      [0.22, 0.55, 0.95],
      [0.98, 0.68, 0.22]
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
      if (dist < 6.0) colorIdx = Math.random() < 0.7 ? 2 : 3;
      else if (dist < 14.0) colorIdx = Math.random() < 0.6 ? 0 : 1;
      else colorIdx = Math.random() < 0.5 ? 4 : 0;

      const c = palettes[colorIdx];
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
      size[i] = 1.8 + Math.random() * 2.8;
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

  return deepGroup;
}
