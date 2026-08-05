import * as THREE from 'three';

export interface PlanetTextureOptions {
  bands?: boolean;
  bandSoft?: boolean;
  blotches?: boolean;
  craters?: boolean;
  poles?: boolean;
  poleSize?: number;
  spot?: {
    colorHex: string | number;
    x: number; // 0..1 relative to width
    y: number; // 0..1 relative to height
    rx: number; // radius x in px
    ry: number; // radius y in px
  };
}

export class ProceduralTextures {
  private static glowCache: Map<string, THREE.CanvasTexture> = new Map();
  private static starDotTexture: THREE.CanvasTexture | null = null;
  private static sunCoronaTexture: THREE.CanvasTexture | null = null;
  private static earthTextureCache: THREE.CanvasTexture | null = null;
  private static sunTextureCache: THREE.CanvasTexture | null = null;
  private static ringTextureCache: THREE.CanvasTexture | null = null;

  /**
   * Generador de ruido pseudo-Perlin 2D rápido para turbulencia planetaria fotorrealista.
   */
  private static noise2D(x: number, y: number): number {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
  }

  private static fractalNoise(x: number, y: number, octaves: number = 4): number {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;
    let totalAmp = 0;
    for (let i = 0; i < octaves; i++) {
      const xi = Math.floor(x * frequency);
      const yi = Math.floor(y * frequency);
      const xf = (x * frequency) - xi;
      const yf = (y * frequency) - yi;
      const n00 = this.noise2D(xi, yi);
      const n10 = this.noise2D(xi + 1, yi);
      const n01 = this.noise2D(xi, yi + 1);
      const n11 = this.noise2D(xi + 1, yi + 1);
      const nx0 = n00 * (1 - xf) + n10 * xf;
      const nx1 = n01 * (1 - xf) + n11 * xf;
      const n = nx0 * (1 - yf) + nx1 * yf;
      value += n * amplitude;
      totalAmp += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    return value / totalAmp;
  }

  /**
   * Genera la textura fotorrealista de la Tierra (Océanos profundos, continentes fractales, cordilleras, hielo y nubes)
   */
  public static generateEarthTexture(): THREE.CanvasTexture {
    if (this.earthTextureCache) return this.earthTextureCache;

    const w = 1024;
    const h = 512;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // 1. Océano profundo con degradado batimétrico
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
    oceanGrad.addColorStop(0, '#061633');
    oceanGrad.addColorStop(0.5, '#0b2656');
    oceanGrad.addColorStop(1, '#061633');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, w, h);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // 2. Continentes procedimentales fractales y casquetes polares
    for (let y = 0; y < h; y++) {
      const ny = y / h;
      const lat = (ny - 0.5) * Math.PI; // -PI/2 to PI/2
      for (let x = 0; x < w; x++) {
        const nx = x / w;
        const n = this.fractalNoise(nx * 8, ny * 4, 6);
        const idx = (y * w + x) * 4;

        // Casquetes polares de hielo (Ártico y Antártida)
        if (ny < 0.12 || ny > 0.88) {
          const iceEdge = (ny < 0.12 ? (0.12 - ny) : (ny - 0.88)) * 8.5;
          if (n + iceEdge > 0.65) {
            data[idx] = 245;
            data[idx + 1] = 250;
            data[idx + 2] = 255;
            continue;
          }
        }

        // Continentes terrestres (Umbral n > 0.52)
        if (n > 0.52) {
          const altitude = (n - 0.52) / 0.48; // 0..1
          if (altitude > 0.65) {
            // Alta montaña nevada / rocosa
            data[idx] = 180;
            data[idx + 1] = 175;
            data[idx + 2] = 170;
          } else if (altitude > 0.35) {
            // Mesetas áridas / praderas pardo-amarillentas
            data[idx] = 142 + Math.round(altitude * 40);
            data[idx + 1] = 118 + Math.round(altitude * 20);
            data[idx + 2] = 68;
          } else {
            // Llanuras fértiles verdes
            data[idx] = 42 + Math.round(altitude * 50);
            data[idx + 1] = 104 + Math.round(altitude * 60);
            data[idx + 2] = 48;
          }
        } else if (n > 0.48) {
          // Plataforma continental marina poco profunda (turquesa)
          data[idx] = 24;
          data[idx + 1] = 78;
          data[idx + 2] = 124;
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // 3. Bandas de formaciones nubosas ciclónicas superpuestas
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    for (let i = 0; i < 40; i++) {
      const cx = Math.random() * w;
      const cy = h * (0.2 + Math.random() * 0.6);
      const rx = 30 + Math.random() * 110;
      const ry = rx * (0.2 + Math.random() * 0.25);
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, (Math.random() - 0.5) * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    this.earthTextureCache = texture;
    return texture;
  }

  /**
   * Genera la textura fotosférica del Sol (Estrella G2V con células de granulación, fulgores y manchas solares)
   */
  public static generateSunTexture(): THREE.CanvasTexture {
    if (this.sunTextureCache) return this.sunTextureCache;

    const w = 1024;
    const h = 512;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Fondo dorado incandescente
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#ffaa11');
    grad.addColorStop(0.5, '#ffcc22');
    grad.addColorStop(1, '#ffaa11');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Granulación solar turbulenta
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const n = this.fractalNoise((x / w) * 32, (y / h) * 16, 4);
        const idx = (y * w + x) * 4;
        const bright = 0.85 + n * 0.45;
        data[idx] = Math.min(255, Math.round(255 * bright));
        data[idx + 1] = Math.min(255, Math.round(180 * bright));
        data[idx + 2] = Math.min(255, Math.round(30 * bright));
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Manchas solares magnéticas (Sunspots oscuras rodeadas de fulgor incandescente)
    for (let i = 0; i < 12; i++) {
      const cx = Math.random() * w;
      const cy = h * (0.3 + Math.random() * 0.4);
      const cr = 8 + Math.random() * 22;

      // Halo brillante alrededor de la mancha
      ctx.fillStyle = 'rgba(255, 255, 210, 0.45)';
      ctx.beginPath();
      ctx.ellipse(cx, cy, cr * 1.5, cr * 1.2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Umbra y penumbra oscura de la mancha solar
      ctx.fillStyle = 'rgba(40, 15, 5, 0.85)';
      ctx.beginPath();
      ctx.ellipse(cx, cy, cr, cr * 0.75, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    this.sunTextureCache = texture;
    return texture;
  }

  /**
   * Genera la textura fotorrealista de anillos de Saturno (División de Cassini y Brecha de Encke)
   */
  public static generateRingTexture(): THREE.CanvasTexture {
    if (this.ringTextureCache) return this.ringTextureCache;

    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const imgData = ctx.getImageData(0, 0, size, 1);
    const data = imgData.data;

    for (let x = 0; x < size; x++) {
      const u = x / size; // 0 (borde interno) a 1 (borde externo)
      const idx = x * 4;

      // Anillo C (interno tenue)
      if (u < 0.22) {
        data[idx] = 160;
        data[idx + 1] = 145;
        data[idx + 2] = 125;
        data[idx + 3] = Math.round(110 * (u / 0.22));
      }
      // Anillo B (más denso y brillante)
      else if (u < 0.65) {
        const bandNoise = Math.sin(u * 140) * 15;
        data[idx] = Math.min(255, 220 + bandNoise);
        data[idx + 1] = Math.min(255, 205 + bandNoise);
        data[idx + 2] = Math.min(255, 175 + bandNoise);
        data[idx + 3] = 245;
      }
      // División de Cassini (brecha oscura casi transparente)
      else if (u >= 0.65 && u < 0.72) {
        data[idx] = 80;
        data[idx + 1] = 70;
        data[idx + 2] = 60;
        data[idx + 3] = 25;
      }
      // Anillo A (exterior con la brecha fina de Encke en 0.88)
      else {
        if (u >= 0.87 && u <= 0.89) {
          // Brecha de Encke
          data[idx] = 90;
          data[idx + 1] = 80;
          data[idx + 2] = 70;
          data[idx + 3] = 30;
        } else {
          const bandNoise = Math.sin(u * 180) * 12;
          data[idx] = Math.min(255, 195 + bandNoise);
          data[idx + 1] = Math.min(255, 180 + bandNoise);
          data[idx + 2] = Math.min(255, 155 + bandNoise);
          data[idx + 3] = 210;
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    this.ringTextureCache = texture;
    return texture;
  }

  /**
   * Genera una textura planetaria procedimental fotorrealista en Canvas 2D
   * Inspirada en la simulación astronómica realista del documento doc/.
   */
  public static generatePlanetTexture(
    baseHex: string | number,
    options: PlanetTextureOptions = {}
  ): THREE.CanvasTexture {
    const {
      bands = false,
      bandSoft = false,
      blotches = true,
      craters = false,
      poles = false,
      poleSize = 0.16,
      spot = undefined
    } = options;

    const w = 1024;
    const h = 512;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return new THREE.CanvasTexture(canvas);
    }

    const baseColor = new THREE.Color(baseHex);
    ctx.fillStyle = baseColor.getStyle();
    ctx.fillRect(0, 0, w, h);

    // 1. Bandas atmosféricas gaseosas con cizalladura y vórtices (Júpiter, Saturno, Urano, Neptuno)
    if (bands) {
      const bandCount = bandSoft ? 22 : 36;
      for (let i = 0; i < bandCount; i++) {
        const y = (h / bandCount) * i;
        const hsl = { h: 0, s: 0, l: 0 };
        baseColor.getHSL(hsl);

        const shade = baseColor.clone();
        shade.offsetHSL(
          0,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * (bandSoft ? 0.09 : 0.22)
        );

        ctx.fillStyle = `rgba(${Math.round(shade.r * 255)}, ${Math.round(
          shade.g * 255
        )}, ${Math.round(shade.b * 255)}, ${
          bandSoft ? 0.4 + Math.random() * 0.25 : 0.5 + Math.random() * 0.35
        })`;
        const bh = h / bandCount + 4;
        ctx.fillRect(0, y, w, bh);

        // Vórtices de cizalladura atmosférica en la frontera de las bandas
        if (!bandSoft) {
          for (let s = 0; s < 7; s++) {
            ctx.fillStyle = `rgba(255, 245, 230, ${0.05 + Math.random() * 0.08})`;
            ctx.beginPath();
            ctx.ellipse(
              Math.random() * w,
              y + bh / 2,
              40 + Math.random() * 130,
              bh * 0.42,
              (Math.random() - 0.5) * 0.1,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }
    }

    // 2. Moteado rocoso y albedo superficial con ruido fractal
    if (blotches && !craters) {
      for (let i = 0; i < 110; i++) {
        const shade = baseColor.clone();
        shade.offsetHSL(0, (Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.22);
        ctx.fillStyle = `rgba(${Math.round(shade.r * 255)}, ${Math.round(
          shade.g * 255
        )}, ${Math.round(shade.b * 255)}, ${0.15 + Math.random() * 0.25})`;
        const rx = 20 + Math.random() * 80;
        const ry = rx * (0.45 + Math.random() * 0.55);
        ctx.beginPath();
        ctx.ellipse(
          Math.random() * w,
          Math.random() * h,
          rx,
          ry,
          Math.random() * Math.PI,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    // 3. Cráteres de impacto con sistemas de rayos brillantes y sombras rocosas (Mercurio, Marte, Luna)
    if (craters) {
      for (let i = 0; i < 140; i++) {
        const shade = baseColor.clone();
        shade.offsetHSL(0, 0, (Math.random() - 0.5) * 0.14);
        ctx.fillStyle = `rgba(${Math.round(shade.r * 255)}, ${Math.round(
          shade.g * 255
        )}, ${Math.round(shade.b * 255)}, ${0.12 + Math.random() * 0.22})`;
        const rx = 15 + Math.random() * 60;
        const ry = rx * (0.65 + Math.random() * 0.35);
        ctx.beginPath();
        ctx.ellipse(
          Math.random() * w,
          Math.random() * h,
          rx,
          ry,
          Math.random() * Math.PI,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Cuencas de impacto con rayos de eyección de regolito
      for (let i = 0; i < 55; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const cr = 5 + Math.random() * 34;

        // Sombras interiores del cráter
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fill();

        // Aro superior iluminado por el Sol
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.lineWidth = 2.0;
        ctx.beginPath();
        ctx.arc(cx - cr * 0.12, cy - cr * 0.12, cr * 0.95, 0, Math.PI * 2);
        ctx.stroke();

        // Rayos de eyección en los cráteres grandes
        if (cr > 18) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
          ctx.lineWidth = 1.5;
          for (let r = 0; r < 8; r++) {
            const ang = (Math.PI * 2 / 8) * r + Math.random() * 0.3;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(ang) * cr * 2.8, cy + Math.sin(ang) * cr * 2.8);
            ctx.stroke();
          }
        }
      }
    }

    // 4. Casquetes polares de hielo y regolito congelado (Marte)
    if (poles) {
      const poleH = h * poleSize;

      // Polo norte
      const gradN = ctx.createLinearGradient(0, 0, 0, poleH);
      gradN.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      gradN.addColorStop(0.7, 'rgba(235, 245, 255, 0.65)');
      gradN.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradN;
      ctx.fillRect(0, 0, w, poleH);

      // Polo sur
      const gradS = ctx.createLinearGradient(0, h - poleH, 0, h);
      gradS.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradS.addColorStop(0.3, 'rgba(235, 245, 255, 0.65)');
      gradS.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
      ctx.fillStyle = gradS;
      ctx.fillRect(0, h - poleH, w, poleH);
    }

    // 5. Tormenta gigante (Gran Mancha Roja de Júpiter o Gran Mancha Oscura de Neptuno)
    if (spot) {
      const sx = w * spot.x;
      const sy = h * spot.y;
      const spotColor = new THREE.Color(spot.colorHex);

      ctx.save();
      ctx.translate(sx, sy);
      ctx.fillStyle = `rgba(${Math.round(spotColor.r * 255)}, ${Math.round(
        spotColor.g * 255
      )}, ${Math.round(spotColor.b * 255)}, 0.9)`;
      ctx.beginPath();
      ctx.ellipse(0, 0, spot.rx, spot.ry, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ojo interior ciclónico de la tormenta
      ctx.fillStyle = 'rgba(255, 235, 210, 0.4)';
      ctx.beginPath();
      ctx.ellipse(0, 0, spot.rx * 0.45, spot.ry * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();

      // Anillo periférico de turbulencia de alta velocidad
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.ellipse(0, 0, spot.rx * 1.05, spot.ry * 1.05, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * Genera un sprite circular suave para halos de resplandor atmosférico y coronas planetarias.
   */
  public static generateGlowSprite(hex: string | number): THREE.CanvasTexture {
    const key = String(hex);
    if (this.glowCache.has(key)) {
      return this.glowCache.get(key)!;
    }

    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const half = size / 2;
      const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
      const color = new THREE.Color(hex);

      gradient.addColorStop(0, `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, 0.95)`);
      gradient.addColorStop(0.35, `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, 0.45)`);
      gradient.addColorStop(0.75, `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, 0.08)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    this.glowCache.set(key, texture);
    return texture;
  }

  /**
   * Genera la corona solar ámbar radiante.
   */
  public static generateSunCorona(): THREE.CanvasTexture {
    if (this.sunCoronaTexture) return this.sunCoronaTexture;

    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const half = size / 2;
      const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);

      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 235, 170, 0.9)');
      gradient.addColorStop(0.5, 'rgba(255, 150, 40, 0.38)');
      gradient.addColorStop(0.85, 'rgba(240, 80, 10, 0.06)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }

    this.sunCoronaTexture = new THREE.CanvasTexture(canvas);
    this.sunCoronaTexture.needsUpdate = true;
    return this.sunCoronaTexture;
  }

  /**
   * Genera el punto estelar de alto contraste para estrellas del cielo nocturno (sin corte cuadrado).
   */
  public static generateStarDot(): THREE.CanvasTexture {
    if (this.starDotTexture) return this.starDotTexture;

    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const half = size / 2;
      const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.75)');
      gradient.addColorStop(0.7, 'rgba(220, 235, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }

    this.starDotTexture = new THREE.CanvasTexture(canvas);
    this.starDotTexture.needsUpdate = true;
    return this.starDotTexture;
  }
}
