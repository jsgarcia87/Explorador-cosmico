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
  private static earthTextureCache: { map: THREE.CanvasTexture, bumpMap: THREE.CanvasTexture, roughnessMap: THREE.CanvasTexture } | null = null;
  private static sunTextureCache: THREE.CanvasTexture | null = null;
  private static ringTextureCache: THREE.CanvasTexture | null = null;
  private static milkyWayCache: THREE.CanvasTexture | null = null;

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
  public static generateEarthTexture(): { map: THREE.CanvasTexture, bumpMap: THREE.CanvasTexture, roughnessMap: THREE.CanvasTexture } {
    if (this.earthTextureCache) return this.earthTextureCache;

    const w = 1024;
    const h = 512;
    
    const canvas = document.createElement('canvas');
    const bumpCanvas = document.createElement('canvas');
    const roughCanvas = document.createElement('canvas');
    canvas.width = bumpCanvas.width = roughCanvas.width = w;
    canvas.height = bumpCanvas.height = roughCanvas.height = h;
    
    const ctx = canvas.getContext('2d');
    const bumpCtx = bumpCanvas.getContext('2d');
    const roughCtx = roughCanvas.getContext('2d');
    
    if (!ctx || !bumpCtx || !roughCtx) {
      const tex = new THREE.CanvasTexture(canvas);
      return { map: tex, bumpMap: tex, roughnessMap: tex };
    }

    // 1. Océano profundo con degradado batimétrico
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
    oceanGrad.addColorStop(0, '#061633');
    oceanGrad.addColorStop(0.5, '#0b2656');
    oceanGrad.addColorStop(1, '#061633');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, w, h);
    
    // Bump base (océano es nivel 0 o plano)
    bumpCtx.fillStyle = 'rgb(10, 10, 10)';
    bumpCtx.fillRect(0, 0, w, h);
    
    // Roughness base (océano es brillante/suave)
    roughCtx.fillStyle = 'rgb(40, 40, 40)'; // 0.15 roughness
    roughCtx.fillRect(0, 0, w, h);

    const imgData = ctx.getImageData(0, 0, w, h);
    const bumpData = bumpCtx.getImageData(0, 0, w, h);
    const roughData = roughCtx.getImageData(0, 0, w, h);
    
    const data = imgData.data;
    const bData = bumpData.data;
    const rData = roughData.data;

    // 2. Continentes procedimentales fractales y casquetes polares
    for (let y = 0; y < h; y++) {
      const ny = y / h;
      for (let x = 0; x < w; x++) {
        const nx = x / w;
        const n = this.fractalNoise(nx * 8, ny * 4, 6);
        const idx = (y * w + x) * 4;

        // Casquetes polares de hielo (Ártico y Antártida)
        if (ny < 0.12 || ny > 0.88) {
          const iceEdge = (ny < 0.12 ? (0.12 - ny) : (ny - 0.88)) * 8.5;
          if (n + iceEdge > 0.65) {
            // Color Hielo
            data[idx] = 245; data[idx + 1] = 250; data[idx + 2] = 255;
            // Bump Hielo (rugosidad media/baja)
            bData[idx] = bData[idx+1] = bData[idx+2] = 120 + Math.random() * 20;
            // Roughness Hielo
            rData[idx] = rData[idx+1] = rData[idx+2] = 120;
            continue;
          }
        }

        // Continentes terrestres (Umbral n > 0.52)
        if (n > 0.52) {
          const altitude = (n - 0.52) / 0.48; // 0..1
          const bumpVal = Math.floor(20 + altitude * 235); // 20 to 255
          bData[idx] = bData[idx+1] = bData[idx+2] = bumpVal;
          rData[idx] = rData[idx+1] = rData[idx+2] = 220; // Tierra es rugosa

          if (altitude > 0.65) {
            // Alta montaña nevada / rocosa
            data[idx] = 180; data[idx + 1] = 175; data[idx + 2] = 170;
          } else if (altitude > 0.35) {
            // Mesetas áridas
            data[idx] = 142 + Math.round(altitude * 40);
            data[idx + 1] = 118 + Math.round(altitude * 20);
            data[idx + 2] = 68;
          } else {
            // Llanuras
            data[idx] = 42 + Math.round(altitude * 50);
            data[idx + 1] = 104 + Math.round(altitude * 60);
            data[idx + 2] = 48;
          }
        } else if (n > 0.48) {
          // Plataforma continental marina (turquesa)
          data[idx] = 24; data[idx + 1] = 78; data[idx + 2] = 124;
          bData[idx] = bData[idx+1] = bData[idx+2] = 15;
          rData[idx] = rData[idx+1] = rData[idx+2] = 80; // Agua somera menos pulida
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
    bumpCtx.putImageData(bumpData, 0, 0);
    roughCtx.putImageData(roughData, 0, 0);

    // 3. Bandas de formaciones nubosas ciclónicas superpuestas (afectan bump)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    bumpCtx.fillStyle = 'rgba(255, 255, 255, 0.15)'; // nubes dan ligero relieve
    roughCtx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // nubes son totalmente rugosas
    
    for (let i = 0; i < 40; i++) {
      const cx = Math.random() * w;
      const cy = h * (0.2 + Math.random() * 0.6);
      const rx = 30 + Math.random() * 110;
      const ry = rx * (0.2 + Math.random() * 0.25);
      
      [ctx, bumpCtx, roughCtx].forEach(c => {
        c.beginPath();
        c.ellipse(cx, cy, rx, ry, (Math.random() - 0.5) * 0.5, 0, Math.PI * 2);
        c.fill();
      });
    }

    const map = new THREE.CanvasTexture(canvas);
    const bumpMap = new THREE.CanvasTexture(bumpCanvas);
    const roughnessMap = new THREE.CanvasTexture(roughCanvas);

    [map, bumpMap, roughnessMap].forEach(t => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.needsUpdate = true;
    });

    const result = { map, bumpMap, roughnessMap };
    this.earthTextureCache = result;
    return result;
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
  ): { map: THREE.CanvasTexture, bumpMap: THREE.CanvasTexture } {
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
    const bumpCanvas = document.createElement('canvas');
    canvas.width = bumpCanvas.width = w;
    canvas.height = bumpCanvas.height = h;
    const ctx = canvas.getContext('2d');
    const bumpCtx = bumpCanvas.getContext('2d');

    if (!ctx || !bumpCtx) {
      const tex = new THREE.CanvasTexture(canvas);
      return { map: tex, bumpMap: tex };
    }

    const baseColor = new THREE.Color(baseHex);
    ctx.fillStyle = baseColor.getStyle();
    ctx.fillRect(0, 0, w, h);
    
    // Bump base medio
    bumpCtx.fillStyle = 'rgb(128, 128, 128)';
    bumpCtx.fillRect(0, 0, w, h);

    // 1. Bandas atmosféricas gaseosas
    if (bands) {
      const bandCount = bandSoft ? 22 : 36;
      for (let i = 0; i < bandCount; i++) {
        const y = (h / bandCount) * i;
        const shade = baseColor.clone();
        shade.offsetHSL(
          0,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * (bandSoft ? 0.09 : 0.22)
        );

        ctx.fillStyle = `rgba(${Math.round(shade.r * 255)}, ${Math.round(shade.g * 255)}, ${Math.round(shade.b * 255)}, ${bandSoft ? 0.4 + Math.random() * 0.25 : 0.5 + Math.random() * 0.35})`;
        const bh = h / bandCount + 4;
        ctx.fillRect(0, y, w, bh);
        
        // El gas también afecta sutilmente al relieve de las nubes altas
        bumpCtx.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0}, ${Math.random() > 0.5 ? 255 : 0}, ${Math.random() > 0.5 ? 255 : 0}, 0.05)`;
        bumpCtx.fillRect(0, y, w, bh);

        // Vórtices
        if (!bandSoft) {
          for (let s = 0; s < 7; s++) {
            ctx.fillStyle = `rgba(255, 245, 230, ${0.05 + Math.random() * 0.08})`;
            bumpCtx.fillStyle = `rgba(255, 255, 255, 0.1)`;
            [ctx, bumpCtx].forEach(c => {
              c.beginPath();
              c.ellipse(
                Math.random() * w, y + bh / 2, 40 + Math.random() * 130, bh * 0.42,
                (Math.random() - 0.5) * 0.1, 0, Math.PI * 2
              );
              c.fill();
            });
          }
        }
      }
    }

    // 2. Moteado rocoso (afecta al relieve)
    if (blotches && !craters) {
      for (let i = 0; i < 110; i++) {
        const shade = baseColor.clone();
        shade.offsetHSL(0, (Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.22);
        ctx.fillStyle = `rgba(${Math.round(shade.r * 255)}, ${Math.round(shade.g * 255)}, ${Math.round(shade.b * 255)}, ${0.15 + Math.random() * 0.25})`;
        bumpCtx.fillStyle = `rgba(255, 255, 255, ${0.05 + Math.random() * 0.15})`; // Relieve positivo
        
        const rx = 20 + Math.random() * 80;
        const ry = rx * (0.45 + Math.random() * 0.55);
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const rot = Math.random() * Math.PI;
        
        [ctx, bumpCtx].forEach(c => {
          c.beginPath();
          c.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
          c.fill();
        });
      }
    }

    // 3. Cráteres de impacto con relieve
    if (craters) {
      for (let i = 0; i < 140; i++) {
        const shade = baseColor.clone();
        shade.offsetHSL(0, 0, (Math.random() - 0.5) * 0.14);
        ctx.fillStyle = `rgba(${Math.round(shade.r * 255)}, ${Math.round(shade.g * 255)}, ${Math.round(shade.b * 255)}, ${0.12 + Math.random() * 0.22})`;
        // Fondo del cráter (más bajo)
        bumpCtx.fillStyle = 'rgba(50, 50, 50, 0.4)';
        
        const rx = 15 + Math.random() * 60;
        const ry = rx * (0.65 + Math.random() * 0.35);
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const rot = Math.random() * Math.PI;

        [ctx, bumpCtx].forEach(c => {
          c.beginPath();
          c.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
          c.fill();
        });
        
        // Borde del cráter (alto relieve)
        bumpCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        bumpCtx.lineWidth = 4;
        bumpCtx.beginPath();
        bumpCtx.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2);
        bumpCtx.stroke();
      }

      for (let i = 0; i < 55; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const cr = 5 + Math.random() * 34;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        bumpCtx.fillStyle = 'rgba(20, 20, 20, 0.8)';
        [ctx, bumpCtx].forEach(c => {
          c.beginPath();
          c.arc(cx, cy, cr, 0, Math.PI * 2);
          c.fill();
        });

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
        bumpCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)'; // borde muy alto
        ctx.lineWidth = 2.0;
        bumpCtx.lineWidth = 3.0;
        [ctx, bumpCtx].forEach(c => {
          c.beginPath();
          c.arc(cx - cr * 0.12, cy - cr * 0.12, cr * 0.95, 0, Math.PI * 2);
          c.stroke();
        });

        // Rayos de eyección
        if (cr > 18) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
          bumpCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1.5;
          bumpCtx.lineWidth = 2.0;
          for (let r = 0; r < 8; r++) {
            const ang = (Math.PI * 2 / 8) * r + Math.random() * 0.3;
            [ctx, bumpCtx].forEach(c => {
              c.beginPath();
              c.moveTo(cx, cy);
              c.lineTo(cx + Math.cos(ang) * cr * 2.8, cy + Math.sin(ang) * cr * 2.8);
              c.stroke();
            });
          }
        }
      }
    }

    if (poles) {
      const poleH = h * poleSize;
      const gradN = ctx.createLinearGradient(0, 0, 0, poleH);
      gradN.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      gradN.addColorStop(0.7, 'rgba(235, 245, 255, 0.65)');
      gradN.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      const bumpGradN = bumpCtx.createLinearGradient(0, 0, 0, poleH);
      bumpGradN.addColorStop(0, 'rgba(200, 200, 200, 0.5)');
      bumpGradN.addColorStop(1, 'rgba(128, 128, 128, 0)');

      ctx.fillStyle = gradN;
      bumpCtx.fillStyle = bumpGradN;
      [ctx, bumpCtx].forEach(c => c.fillRect(0, 0, w, poleH));

      const gradS = ctx.createLinearGradient(0, h - poleH, 0, h);
      gradS.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradS.addColorStop(0.3, 'rgba(235, 245, 255, 0.65)');
      gradS.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
      
      const bumpGradS = bumpCtx.createLinearGradient(0, h - poleH, 0, h);
      bumpGradS.addColorStop(0, 'rgba(128, 128, 128, 0)');
      bumpGradS.addColorStop(1, 'rgba(200, 200, 200, 0.5)');

      ctx.fillStyle = gradS;
      bumpCtx.fillStyle = bumpGradS;
      [ctx, bumpCtx].forEach(c => c.fillRect(0, h - poleH, w, poleH));
    }

    if (spot) {
      const sx = w * spot.x;
      const sy = h * spot.y;
      const spotColor = new THREE.Color(spot.colorHex);

      ctx.save();
      bumpCtx.save();
      
      ctx.translate(sx, sy);
      bumpCtx.translate(sx, sy);
      
      ctx.fillStyle = `rgba(${Math.round(spotColor.r * 255)}, ${Math.round(spotColor.g * 255)}, ${Math.round(spotColor.b * 255)}, 0.9)`;
      bumpCtx.fillStyle = `rgba(180, 180, 180, 0.5)`; // Alto relieve por presión
      [ctx, bumpCtx].forEach(c => {
        c.beginPath();
        c.ellipse(0, 0, spot.rx, spot.ry, 0, 0, Math.PI * 2);
        c.fill();
      });

      ctx.fillStyle = 'rgba(255, 235, 210, 0.4)';
      bumpCtx.fillStyle = 'rgba(80, 80, 80, 0.6)'; // Ojo hundido
      [ctx, bumpCtx].forEach(c => {
        c.beginPath();
        c.ellipse(0, 0, spot.rx * 0.45, spot.ry * 0.45, 0, 0, Math.PI * 2);
        c.fill();
      });

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      bumpCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3.0;
      bumpCtx.lineWidth = 4.0;
      [ctx, bumpCtx].forEach(c => {
        c.beginPath();
        c.ellipse(0, 0, spot.rx * 1.05, spot.ry * 1.05, 0, 0, Math.PI * 2);
        c.stroke();
      });
      
      ctx.restore();
      bumpCtx.restore();
    }

    const map = new THREE.CanvasTexture(canvas);
    const bumpMap = new THREE.CanvasTexture(bumpCanvas);
    
    [map, bumpMap].forEach(t => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.needsUpdate = true;
    });
    
    return { map, bumpMap };
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

  /**
   * Genera una textura equirectangular fotorealista de la Vía Láctea para domos celestes.
   */
  public static generateMilkyWayTexture(): THREE.CanvasTexture {
    if (this.milkyWayCache) return this.milkyWayCache;

    const w = 2048;
    const h = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Fondo del espacio profundo (azul muy oscuro)
    ctx.fillStyle = '#010206';
    ctx.fillRect(0, 0, w, h);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    
    const centerY = h / 2;

    for (let y = 0; y < h; y++) {
      const ny = y / h;
      for (let x = 0; x < w; x++) {
        const nx = x / w;
        const idx = (y * w + x) * 4;

        // Distancia al plano galáctico (centro en Y) con algo de curvatura de ruido
        const distToEquator = Math.abs(y - centerY) / centerY; 
        
        // Ruido fractal de varias octavas para formar nubes de polvo y gas
        const noise = this.fractalNoise(nx * 12, ny * 12, 5);
        const noise2 = this.fractalNoise(nx * 20 + 5, ny * 15 + 5, 4);

        // Densidad galáctica se concentra fuertemente en el ecuador
        const galacticDensity = Math.max(0, 1 - distToEquator * 2.5);
        
        // Polvo oscuro que tapa estrellas (Dark Rifts)
        const dust = Math.max(0, noise2 * 1.5 - 0.5) * galacticDensity;

        // Gas brillante
        const gas = Math.max(0, noise * galacticDensity - 0.3) * 2;
        
        // Estrellas individuales densamente agrupadas (ruido de alta frecuencia)
        const starNoise = Math.random();
        const starProb = 0.985 - (galacticDensity * 0.05); // más probable en el centro

        if (starNoise > starProb && dust < 0.3) {
          // Generar una estrella brillante
          const intensity = Math.random();
          data[idx] = 200 + intensity * 55;
          data[idx+1] = 200 + intensity * 55;
          data[idx+2] = 255; // Ligeramente azules
          data[idx+3] = 255;
        } else {
          // Color del polvo/gas
          const r = 15 + gas * 40 - dust * 30;
          const g = 20 + gas * 30 - dust * 30;
          const b = 40 + gas * 60 - dust * 20;

          data[idx] = Math.max(2, Math.min(255, r));
          data[idx+1] = Math.max(2, Math.min(255, g));
          data[idx+2] = Math.max(4, Math.min(255, b));
          data[idx+3] = 255;
        }
      }
    }
    
    ctx.putImageData(imgData, 0, 0);

    // Añadir super-estrellas con resplandor, concentradas en el ecuador
    for (let i = 0; i < 500; i++) {
      const sx = Math.random() * w;
      const sy = centerY + (Math.random() - 0.5) * (h * 0.4) * Math.pow(Math.random(), 2);
      const sr = 0.5 + Math.random() * 2;
      
      const radGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr * 3);
      radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      radGrad.addColorStop(1, 'rgba(150, 200, 255, 0)');
      
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(sx, sy, sr * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    
    this.milkyWayCache = tex;
    return tex;
  }

  private static earthCloudsCache: THREE.CanvasTexture | null = null;

  /**
   * Generates a realistic Earth cloud texture with cyclonic swirls, ITCZ band,
   * and proper alpha transparency for clear sky areas.
   */
  public static generateEarthClouds(): THREE.CanvasTexture {
    if (this.earthCloudsCache) return this.earthCloudsCache;

    const w = 1024;
    const h = 512;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    for (let y = 0; y < h; y++) {
      const ny = y / h;
      const lat = (ny - 0.5) * Math.PI;
      for (let x = 0; x < w; x++) {
        const nx = x / w;
        const idx = (y * w + x) * 4;

        // Multi-scale fractal noise for cloud structures
        const n1 = this.fractalNoise(nx * 10 + 3.7, ny * 5 + 1.2, 6);
        const n2 = this.fractalNoise(nx * 20 + 8.5, ny * 10 + 4.3, 5);
        const n3 = this.fractalNoise(nx * 5 + 0.5, ny * 3 + 6.1, 4);

        // ITCZ — equatorial convergence zone (more clouds near equator)
        const itcz = Math.exp(-Math.pow((ny - 0.48) * 8, 2)) * 0.25;

        // Mid-latitude storm bands (30-60 degrees N and S)
        const midLatN = Math.exp(-Math.pow((ny - 0.28) * 6, 2)) * 0.3;
        const midLatS = Math.exp(-Math.pow((ny - 0.72) * 6, 2)) * 0.3;

        // Polar fronts
        const polarN = Math.exp(-Math.pow((ny - 0.08) * 8, 2)) * 0.35;
        const polarS = Math.exp(-Math.pow((ny - 0.92) * 8, 2)) * 0.35;

        // Subtropical clear bands (Hadley cell descending - fewer clouds ~20-30 deg)
        const subtropClear = Math.exp(-Math.pow((ny - 0.35) * 10, 2)) * 0.2
                           + Math.exp(-Math.pow((ny - 0.65) * 10, 2)) * 0.2;

        // Base cloud probability modulated by latitude bands
        let cloudBase = itcz + midLatN + midLatS + polarN + polarS - subtropClear;
        cloudBase = Math.max(0, cloudBase);

        // Combine noise with latitude-dependent coverage
        let density = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) + cloudBase;
        density = density - 0.58;
        density = Math.max(0, Math.min(1, density * 2.0));

        // Cyclonic swirl structures at mid-latitudes
        const swirl = Math.sin(nx * 12 + ny * 8 + n1 * 4) * 0.1;
        density += swirl * density;
        density = Math.max(0, Math.min(1, density));

        // Cloud color: white with slight blue tint in thin areas
        const brightness = 0.92 + density * 0.08;
        data[idx] = Math.round(255 * brightness);
        data[idx + 1] = Math.round(255 * brightness);
        data[idx + 2] = Math.round(255 * brightness);
        data[idx + 3] = Math.round(density * 220);
      }
    }

    ctx.putImageData(imgData, 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    this.earthCloudsCache = tex;
    return tex;
  }

  /**
   * Generates a volumetric nebula cloud billboard texture using fractal noise.
   * Each call produces a unique cloud with the given tint color.
   */
  public static generateNebulaCloud(
    hex: string | number,
    seed: number = 0,
    size: number = 512
  ): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;
    const color = new THREE.Color(hex);
    const half = size / 2;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;
        const dx = (x - half) / half;
        const dy = (y - half) / half;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1.0) {
          data[idx] = data[idx + 1] = data[idx + 2] = data[idx + 3] = 0;
          continue;
        }

        const nx = x / size * 6.0 + seed * 13.7;
        const ny = y / size * 6.0 + seed * 7.3;

        const n1 = this.fractalNoise(nx, ny, 6);
        const n2 = this.fractalNoise(nx * 2.3 + 5.0, ny * 2.3 + 8.0, 5);
        const n3 = this.fractalNoise(nx * 0.7 + 3.0, ny * 0.7 + 2.0, 4);

        // Warped distance for irregular shape (not a perfect circle)
        const warpX = dx + (n1 - 0.5) * 0.6;
        const warpY = dy + (n2 - 0.5) * 0.6;
        const warpDist = Math.sqrt(warpX * warpX + warpY * warpY);

        // Wispy cloud-like structures
        let density = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
        density = Math.pow(density, 0.7);

        // Irregular radial falloff using warped distance
        const radialFalloff = Math.max(0, 1.0 - Math.pow(warpDist * 0.85, 1.8));
        density *= radialFalloff;

        // Filamentary tendrils
        const filament = Math.pow(Math.abs(Math.sin(n1 * 10.0 + n2 * 5.0 + dx * 4.0)), 3.0) * 0.5;
        density = Math.max(density, filament * radialFalloff * 0.5);

        // Void pockets (dark areas within the nebula for depth)
        const voids = this.fractalNoise(nx * 1.5 + 20.0, ny * 1.5 + 20.0, 3);
        if (voids > 0.6) density *= 0.3;

        density = Math.max(0, Math.min(1, density));

        // Color variation: brighter toward center, tinted by the base color
        const brightness = 0.7 + density * 0.3;
        data[idx] = Math.round(color.r * 255 * brightness);
        data[idx + 1] = Math.round(color.g * 255 * brightness);
        data[idx + 2] = Math.round(color.b * 255 * brightness);
        data[idx + 3] = Math.round(density * 200);
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }
}
