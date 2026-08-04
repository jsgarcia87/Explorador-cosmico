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

    // 1. Bandas atmosféricas gaseosas (Júpiter, Saturno, Urano, Neptuno)
    if (bands) {
      const bandCount = bandSoft ? 18 : 28;
      for (let i = 0; i < bandCount; i++) {
        const y = (h / bandCount) * i;
        const hsl = { h: 0, s: 0, l: 0 };
        baseColor.getHSL(hsl);

        const shade = baseColor.clone();
        shade.offsetHSL(
          0,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * (bandSoft ? 0.08 : 0.18)
        );

        ctx.fillStyle = `rgba(${Math.round(shade.r * 255)}, ${Math.round(
          shade.g * 255
        )}, ${Math.round(shade.b * 255)}, ${
          bandSoft ? 0.35 + Math.random() * 0.25 : 0.45 + Math.random() * 0.35
        })`;
        const bh = h / bandCount + 4;
        ctx.fillRect(0, y, w, bh);

        // Ráfagas turbulentas de viento en la banda
        if (!bandSoft) {
          for (let s = 0; s < 5; s++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.04 + Math.random() * 0.06})`;
            ctx.beginPath();
            ctx.ellipse(
              Math.random() * w,
              y + bh / 2,
              50 + Math.random() * 120,
              bh * 0.45,
              0,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }
    }

    // 2. Moteado rocoso y albedo superficial
    if (blotches && !craters) {
      for (let i = 0; i < 90; i++) {
        const shade = baseColor.clone();
        shade.offsetHSL(0, (Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.2);
        ctx.fillStyle = `rgba(${Math.round(shade.r * 255)}, ${Math.round(
          shade.g * 255
        )}, ${Math.round(shade.b * 255)}, ${0.15 + Math.random() * 0.25})`;
        const rx = 20 + Math.random() * 70;
        const ry = rx * (0.5 + Math.random() * 0.5);
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

    // 3. Cráteres y relieve rocoso (Mercurio, Marte, Luna)
    if (craters) {
      for (let i = 0; i < 120; i++) {
        const shade = baseColor.clone();
        shade.offsetHSL(0, 0, (Math.random() - 0.5) * 0.12);
        ctx.fillStyle = `rgba(${Math.round(shade.r * 255)}, ${Math.round(
          shade.g * 255
        )}, ${Math.round(shade.b * 255)}, ${0.12 + Math.random() * 0.18})`;
        const rx = 15 + Math.random() * 50;
        const ry = rx * (0.6 + Math.random() * 0.4);
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

      // Cuencas de impacto con aro claro y fondo oscuro
      for (let i = 0; i < 45; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const cr = 6 + Math.random() * 32;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(cx - cr * 0.12, cy - cr * 0.12, cr * 0.95, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // 4. Casquetes polares de hielo (Marte / Tierra)
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
      )}, ${Math.round(spotColor.b * 255)}, 0.85)`;
      ctx.beginPath();
      ctx.ellipse(0, 0, spot.rx, spot.ry, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ojo interior de tormenta
      ctx.fillStyle = 'rgba(255, 230, 200, 0.35)';
      ctx.beginPath();
      ctx.ellipse(0, 0, spot.rx * 0.45, spot.ry * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
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
