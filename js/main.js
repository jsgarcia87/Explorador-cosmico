/* =========================================================================
   MAIN.JS — Explorador Cósmico (Controlador Principal ES Module, HUD & Kiosco)
   Incluye: Ergonomía Tablet, Inercia Táctil, Shaders Relativistas, Bloom HDR
   ========================================================================= */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SimplexNoise } from 'simplex-noise';
import { PLANETS, DEEPSPACE, CONSTELLATIONS, TOURS, QUIZ_QUESTIONS, EDU_LEVELS } from './datos-cosmicos.js';
import { createMilkyWayBackground, createConstellationsSystem, createSolarSystem, createEarthHorizonSystem, highlightConstellationSelection } from './shaders-espacio.js';
import { buildDeepSpaceScene } from './universe/DeepSpaceObjects.js';

const simplex = new SimplexNoise(101);

/* ---------- Renderer / Scene / Camera ---------- */
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
const _w = window.innerWidth || canvas.clientWidth || 800;
const _h = window.innerHeight || canvas.clientHeight || 600;
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 2, _w < 768 ? 2 : 3));
renderer.setSize(_w, _h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020408);
scene.fog = new THREE.FogExp2(0x020408, 0.00015);
const camera = new THREE.PerspectiveCamera(50, _w / _h, 0.5, 45000);

/* ---------- Luz Solar, HemisphereLight (Fake GI) y Ambiental ---------- */
const sunLight = new THREE.PointLight(0xfffaed, 3.2, 4500, 0.85);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.bias = -0.0001;
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x2a3060, 0.35);
scene.add(ambientLight);

/* ---------- Fondo Estelar de Vía Láctea ---------- */
createMilkyWayBackground(scene);

/* ---------- Controlador de Cámara Táctil/Ratón con Inercia para Tablet ---------- */
const controller = {
  target: new THREE.Vector3(0, 0, 0),
  radius: 145, theta: 0.9, phi: 1.15,
  targetRadius: 145, targetTheta: 0.9, targetPhi: 1.15,
  minRadius: 6, maxRadius: 350,
  dragging: false, lastX: 0, lastY: 0,
  cameraDriftMode: false, driftPhase: 0, driftSpeed: 0.00035,
  earthSkyView: false,
  lookFromEarthAt(vec3Pos) {
    const dir = vec3Pos.clone().sub(new THREE.Vector3(0, -10, 0)).normalize();
    this.targetPhi = Math.acos(THREE.MathUtils.clamp(dir.y, -1, 1));
    this.targetTheta = Math.atan2(dir.x, dir.z);
  },
  init() {
    this.update();
    window.addEventListener('pointerdown', e => {
      if (e.target.closest('header') || e.target.closest('.info-panel') ||
          e.target.closest('.bottom-bar') || e.target.closest('.modal-overlay') ||
          e.target.closest('.tour-bar') || e.target.closest('.floating-controls')) return;
      this.dragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    });
    window.addEventListener('pointermove', e => {
      if (!this.dragging) return;
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.targetTheta -= dx * 0.0055;
      this.targetPhi = Math.max(0.08, Math.min(Math.PI - 0.08, this.targetPhi - dy * 0.0055));
    });
    window.addEventListener('pointerup', () => this.dragging = false);
    window.addEventListener('wheel', e => {
      if (e.target.closest('.info-panel') || e.target.closest('.modal-overlay')) return;
      this.targetRadius = Math.max(this.minRadius, Math.min(this.maxRadius, this.targetRadius + e.deltaY * 0.08));
    }, { passive: true });

    // Gestos Táctiles Pinch-to-Zoom para iPad / Android Tablet
    let touchDist = 0;
    window.addEventListener('touchstart', e => {
      if (e.touches.length === 2) {
        touchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (e.touches.length === 2) {
        const d = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = (touchDist - d) * 0.45;
        touchDist = d;
        this.targetRadius = Math.max(this.minRadius, Math.min(this.maxRadius, this.targetRadius + delta));
      }
    }, { passive: true });
  },
  update() {
    // Amortiguación suave e inercia cinemática (Damping)
    this.theta += (this.targetTheta - this.theta) * 0.12;
    this.phi += (this.targetPhi - this.phi) * 0.12;
    this.radius += (this.targetRadius - this.radius) * 0.12;

    // Modo Deriva Telescópica con Perlin Noise (JWST/Hubble micro-drift simulation)
    if (this.cameraDriftMode && !this.dragging) {
      this.driftPhase += 0.006;
      const n1 = simplex.noise2D(this.driftPhase * 0.4, 0.0);
      const n2 = simplex.noise2D(0.0, this.driftPhase * 0.3);
      this.targetTheta += n1 * this.driftSpeed * 1.2;
      this.targetPhi = Math.max(0.1, Math.min(Math.PI - 0.1, this.targetPhi + n2 * this.driftSpeed * 0.6));
    }

    if (this.earthSkyView) {
      const lookDist = 500;
      const lx = 0 + lookDist * Math.sin(this.phi) * Math.sin(this.theta);
      const ly = -10 + lookDist * Math.cos(this.phi);
      const lz = 0 + lookDist * Math.sin(this.phi) * Math.cos(this.theta);
      camera.position.set(0, -10, 0);
      camera.lookAt(lx, ly, lz);
      return;
    }

    const x = this.target.x + this.radius * Math.sin(this.phi) * Math.sin(this.theta);
    const y = this.target.y + this.radius * Math.cos(this.phi);
    const z = this.target.z + this.radius * Math.sin(this.phi) * Math.cos(this.theta);
    camera.position.set(x, y, z);
    camera.lookAt(this.target);
  }
};
controller.init();

/* ---------- Construcción de la Escena ---------- */
const focusables = {};
const { sunMesh, planetsGroup, orbitsGroup } = createSolarSystem(scene, focusables);
const deepGroup = buildDeepSpaceScene(scene, focusables);
deepGroup.visible = false;
const constellationsGroup = createConstellationsSystem(scene, focusables);
constellationsGroup.visible = false;
const earthHorizonGroup = createEarthHorizonSystem(scene);
earthHorizonGroup.visible = false;

/* ---------- Post-Procesado: Lente Gravitacional + Bloom (UnrealBloomPass) ---------- */
let composer = new EffectComposer(renderer);
let lensingPass = null;

composer.addPass(new RenderPass(scene, camera));

const LensingShader = {
  uniforms: {
    tDiffuse: { value: null },
    uBHScreen: { value: new THREE.Vector2(0.5, 0.5) },
    uStrength: { value: 0.0 },
    uAspect: { value: window.innerWidth / window.innerHeight }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 uBHScreen;
    uniform float uStrength;
    uniform float uAspect;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - uBHScreen;
      d.x *= uAspect;
      float dist = length(d);
      float falloff = 1.0 / (dist * dist * 55.0 + 0.4);
      vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
      vec2 offset = dir * falloff * uStrength * 0.05;
      vec2 uv2 = clamp(vUv - offset, 0.001, 0.999);
      gl_FragColor = texture2D(tDiffuse, uv2);
    }
  `
};
lensingPass = new ShaderPass(LensingShader);
composer.addPass(lensingPass);
composer.lensingPass = lensingPass;

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.65, 0.4, 0.85
);
composer.addPass(bloomPass);
composer.bloomPass = bloomPass;

/* ---------- Rendimiento Adaptativo (FPS Detection) ---------- */
let perfFrames = 0, perfLast = performance.now(), perfQuality = 'high';
function checkPerformance() {
  perfFrames++;
  const now = performance.now();
  if (now - perfLast >= 3000) {
    const fps = perfFrames / ((now - perfLast) / 1000);
    perfFrames = 0;
    perfLast = now;
    if (fps < 24 && perfQuality === 'high') {
      perfQuality = 'medium';
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      if (composer && composer.bloomPass) {
        composer.bloomPass.resolution.set(window.innerWidth * 0.5, window.innerHeight * 0.5);
      }
    } else if (fps < 18 && perfQuality === 'medium') {
      perfQuality = 'low';
      renderer.setPixelRatio(1);
      if (composer && composer.bloomPass) {
        composer.bloomPass.strength = 0.4;
      }
      if (composer.lensingPass) composer.lensingPass.enabled = false;
    }
  }
}

/* ---------- Auto-Ocultar UI tras Inactividad ---------- */
let uiHideTimer = null;
const UI_HIDE_DELAY = 5000;
function showUI() {
  document.body.classList.remove('ui-hidden');
  if (uiHideTimer) clearTimeout(uiHideTimer);
  uiHideTimer = setTimeout(() => {
    if (!document.getElementById('infoPanel').classList.contains('show') &&
        !document.getElementById('tourBar').classList.contains('show') &&
        !document.getElementById('modalOverlay').classList.contains('show')) {
      document.body.classList.add('ui-hidden');
    }
  }, UI_HIDE_DELAY);
}
['mousemove', 'mousedown', 'touchstart', 'keydown', 'wheel'].forEach(evt => {
  window.addEventListener(evt, showUI, { passive: true });
});
showUI();

/* ---------- Estado Global de la Aplicación ---------- */
let mode = 'solar'; // 'solar' | 'deep' | 'constelaciones'
let simSpeed = 1.0;
let currentLevel = 'primaria'; // 'primaria' | 'secundaria' | 'avanzado'
let currentFocusData = null;
let activeTourKey = null;
let tourStepIdx = 0;
let kioskActive = true;
let kioskTimer = null;
const KIOSK_TIMEOUT_MS = 90000; // 90 segundos

/* ---------- 1. Modo Kiosco de Museo (Auto-Reset tras Inactividad) ---------- */
function resetKioskTimer() {
  if (!kioskActive) return;
  if (kioskTimer) clearTimeout(kioskTimer);
  kioskTimer = setTimeout(() => {
    triggerKioskAutoReset();
  }, KIOSK_TIMEOUT_MS);
}

function triggerKioskAutoReset() {
  showToast('🏛️ Modo Museo: Reiniciando para el próximo explorador...', 4000);
  setMode('solar');
  closeInfoPanel();
  closeModal();
  exitTour();
  focusObject('sol');
  simSpeed = 1.0;
  updateSpeedButtons(1);
  controller.targetRadius = 145;
  controller.targetTheta = 0.9;
  controller.targetPhi = 1.15;
  controller.target.set(0, 0, 0);
}

function toggleDriftMode() {
  controller.cameraDriftMode = !controller.cameraDriftMode;
  const btn = document.getElementById('btnDriftTop');
  if (btn) btn.classList.toggle('active-drift', controller.cameraDriftMode);
  showToast(
    controller.cameraDriftMode
      ? '🛸 Deriva Telescópica ACTIVADA (JWST/Hubble Micro-drift)'
      : '🎯 Deriva Telescópica DESACTIVADA',
    3000
  );

}

function toggleKioskMode() {
  kioskActive = !kioskActive;
  const badge = document.getElementById('kioskBadge');
  const btn = document.getElementById('btnKiosk');
  if (kioskActive) {
    badge.classList.remove('inactive');
    badge.innerHTML = '🏛️ Modo Museo: ACTIVO';
    btn.classList.add('active-kiosk');
    showToast('🏛️ Modo Kiosco de Museo activado (Auto-reset tras 90s)', 3000);
    resetKioskTimer();
  } else {
    badge.classList.add('inactive');
    badge.innerHTML = '🏛️ Modo Museo: INACTIVO';
    btn.classList.remove('active-kiosk');
    if (kioskTimer) clearTimeout(kioskTimer);
    showToast('Modo Kiosco desactivado', 2500);
  }
}

['mousemove', 'mousedown', 'touchstart', 'keydown', 'click'].forEach(evt => {
  window.addEventListener(evt, resetKioskTimer, { passive: true });
});
resetKioskTimer();

/* ---------- 2. Gestión de Modos ('solar' | 'deep' | 'constelaciones') ---------- */
function setMode(newMode) {
  mode = newMode;
  document.getElementById('btnSolar').classList.toggle('active', mode === 'solar');
  document.getElementById('btnDeep').classList.toggle('active', mode === 'deep');
  const btnConst = document.getElementById('btnConstelaciones');
  if (btnConst) btnConst.classList.toggle('active', mode === 'constelaciones');

  if (mode === 'solar') {
    planetsGroup.visible = true;
    orbitsGroup.visible = true;
    deepGroup.visible = false;
    if (typeof constellationsGroup !== 'undefined') constellationsGroup.visible = false;
    if (typeof earthHorizonGroup !== 'undefined') earthHorizonGroup.visible = false;
    controller.earthSkyView = false;
    const btnEV = document.getElementById('btnEarthViewToggle');
    if (btnEV) btnEV.style.display = 'none';
    sunLight.castShadow = true;
    controller.target.set(0, 0, 0);
    controller.targetRadius = 145;
    renderPlanetChips();
  } else if (mode === 'deep') {
    planetsGroup.visible = false;
    orbitsGroup.visible = false;
    deepGroup.visible = true;
    if (typeof constellationsGroup !== 'undefined') constellationsGroup.visible = false;
    if (typeof earthHorizonGroup !== 'undefined') earthHorizonGroup.visible = false;
    controller.earthSkyView = false;
    const btnEV = document.getElementById('btnEarthViewToggle');
    if (btnEV) btnEV.style.display = 'none';
    sunLight.castShadow = false;
    controller.target.set(0, -2, -26);
    controller.targetRadius = 160;
    renderDeepChips();
  } else if (mode === 'constelaciones') {
    planetsGroup.visible = false;
    orbitsGroup.visible = false;
    deepGroup.visible = false;
    if (typeof constellationsGroup !== 'undefined') constellationsGroup.visible = true;
    if (typeof earthHorizonGroup !== 'undefined') earthHorizonGroup.visible = true;
    controller.earthSkyView = true;
    const btnEV = document.getElementById('btnEarthViewToggle');
    if (btnEV) {
      btnEV.style.display = 'inline-block';
      btnEV.innerHTML = '🌍 VISTA DESDE TIERRA (ACTIVO)';
      btnEV.style.background = 'rgba(0, 240, 255, 0.15)';
    }
    highlightConstellationSelection(focusables, null);
    controller.lookFromEarthAt(new THREE.Vector3(0, 60, -280));
    sunLight.castShadow = false;
    controller.target.set(0, 0, 0);
    controller.targetRadius = 290;
    renderConstellationChips();
  }
  closeInfoPanel();
}

/* ---------- 3. Fichas Rápidas en la Barra Inferior (con Scroll Táctil Tablet) ---------- */
const chipsContainer = document.getElementById('planetChips');
function renderPlanetChips() {
  chipsContainer.innerHTML = '';
  PLANETS.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'planet-chip';
    btn.innerHTML = `<span style="color:#${p.color.toString(16).padStart(6,'0')}">●</span> ${p.name}`;
    btn.onclick = () => focusObject(p.id);
    chipsContainer.appendChild(btn);
  });
}

function renderDeepChips() {
  chipsContainer.innerHTML = '';
  DEEPSPACE.forEach(d => {
    const btn = document.createElement('button');
    btn.className = 'planet-chip';
    btn.innerHTML = `✦ ${d.name.split(' ')[0]}`;
    btn.onclick = () => focusObject(d.id);
    chipsContainer.appendChild(btn);
  });
}

function renderConstellationChips() {
  chipsContainer.innerHTML = '';
  if (typeof CONSTELLATIONS !== 'undefined') {
    CONSTELLATIONS.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'planet-chip';
      btn.innerHTML = `✨ ${c.name.split(' ')[0]}`;
      btn.onclick = () => focusObject(c.id);
      chipsContainer.appendChild(btn);
    });
  }
}
renderPlanetChips();

/* ---------- 4. Enfocar Astro y Abrir Panel Informativo ---------- */
const visitedSet = new Set();
function focusObject(id) {
  const item = focusables[id];
  if (!item) return;
  currentFocusData = item.data;

  if (PLANETS.some(p => p.id === id) && mode !== 'solar') setMode('solar');
  if (DEEPSPACE.some(d => d.id === id) && mode !== 'deep') setMode('deep');
  if (typeof CONSTELLATIONS !== 'undefined' && CONSTELLATIONS.some(c => c.id === id) && mode !== 'constelaciones') {
    setMode('constelaciones');
  }

  const targetPos = new THREE.Vector3();
  item.mesh.getWorldPosition(targetPos);
  controller.target.copy(targetPos);

  if (mode === 'solar') {
    controller.targetRadius = item.data.id === 'sol' ? 18 : item.data.radius * 6.5;
  } else if (mode === 'constelaciones') {
    highlightConstellationSelection(focusables, id);
    if (controller.earthSkyView) {
      controller.lookFromEarthAt(targetPos);
    } else {
      controller.targetRadius = 310;
    }
  } else {
    controller.targetRadius = item.data.id === 'agujero' ? 24 : item.data.id === 'nebulosa' ? 42 : 28;
  }

  updateInfoPanel(currentFocusData);
  document.getElementById('infoPanel').classList.add('show');

  visitedSet.add(id);
  checkBadges();
}

/* ---------- 5. Selector de Nivel Didáctico & Comparador de Escalas ---------- */
function setEduLevel(lvl) {
  currentLevel = lvl;
  document.querySelectorAll('.edu-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab${lvl.charAt(0).toUpperCase() + lvl.slice(1)}`).classList.add('active');
  if (currentFocusData) updateInfoPanel(currentFocusData);
}

function updateInfoPanel(data) {
  document.getElementById('infoType').textContent = data.type;
  document.getElementById('infoTitle').textContent = data.name;

  const descText = (data.descLevels && data.descLevels[currentLevel]) || data.desc;
  document.getElementById('infoDesc').textContent = descText;

  const scaleBox = document.getElementById('scaleComparator');
  if (data.scaleComp) {
    scaleBox.style.display = 'flex';
    document.getElementById('scaleRefBadge').textContent = `Ref: ${data.scaleComp.ref}`;
    document.getElementById('scaleSizeText').textContent = data.scaleComp.sizeStr;
    document.getElementById('scaleMassText').textContent = data.scaleComp.massStr;
  } else {
    scaleBox.style.display = 'none';
  }

  const telemHud = document.getElementById('nasaTelemetryHud');
  if (telemHud && (data.teff || data.spectralClass || data.mass || data.keplerianVelocity)) {
    telemHud.style.display = 'block';
    document.getElementById('telemClass').textContent = data.spectralClass || 'N/A';
    document.getElementById('telemTeff').textContent = data.teff ? `${data.teff} K` : 'N/A';
    document.getElementById('telemMass').textContent = data.mass || 'N/A';
    document.getElementById('telemLuminosity').textContent = data.luminosity || 'N/A';
    document.getElementById('telemVelocity').textContent = data.keplerianVelocity || 'N/A';
    document.getElementById('telemDensity').textContent = data.density || 'N/A';
  } else if (telemHud) {
    telemHud.style.display = 'none';
  }

  const relControls = document.getElementById('relativityControls');
  if (relControls) {
    if (data.id === 'agujero') {
      relControls.style.display = 'block';
      setupRelativityControls(data);
    } else {
      relControls.style.display = 'none';
    }
  }

  const factsUl = document.getElementById('infoFacts');
  factsUl.innerHTML = '';
  (data.facts || []).forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    factsUl.appendChild(li);
  });

  document.getElementById('infoFun').textContent = data.fun || '';
}

function closeInfoPanel() {
  document.getElementById('infoPanel').classList.remove('show');
}

function setupRelativityControls(data) {
  const bhObj = focusables['agujero'];
  if (!bhObj || !bhObj.shaderMat) return;

  const sliderMass = document.getElementById('sliderMass');
  const valMass = document.getElementById('valMass');
  const sliderAccretion = document.getElementById('sliderAccretion');
  const valAccretion = document.getElementById('valAccretion');
  const sliderInclination = document.getElementById('sliderInclination');
  const valInclination = document.getElementById('valInclination');
  const sliderDoppler = document.getElementById('sliderDoppler');
  const valDoppler = document.getElementById('valDoppler');
  const btnGeodesicGrid = document.getElementById('btnGeodesicGrid');

  if (sliderMass && valMass) {
    sliderMass.value = bhObj.shaderMat.uniforms.uMass ? bhObj.shaderMat.uniforms.uMass.value : 1.0;
    valMass.textContent = `${parseFloat(sliderMass.value).toFixed(2)} M_☉`;
    sliderMass.oninput = (e) => {
      const v = parseFloat(e.target.value);
      valMass.textContent = `${v.toFixed(2)} M_☉`;
      if (bhObj.shaderMat.uniforms.uMass) bhObj.shaderMat.uniforms.uMass.value = v;
    };
  }

  if (sliderAccretion && valAccretion) {
    sliderAccretion.value = bhObj.shaderMat.uniforms.uAccretionRate ? bhObj.shaderMat.uniforms.uAccretionRate.value : 1.2;
    valAccretion.textContent = parseFloat(sliderAccretion.value).toFixed(2);
    sliderAccretion.oninput = (e) => {
      const v = parseFloat(e.target.value);
      valAccretion.textContent = v.toFixed(2);
      if (bhObj.shaderMat.uniforms.uAccretionRate) bhObj.shaderMat.uniforms.uAccretionRate.value = v;
    };
  }

  if (sliderInclination && valInclination) {
    sliderInclination.value = bhObj.shaderMat.uniforms.uInclination ? bhObj.shaderMat.uniforms.uInclination.value : 0.15;
    valInclination.textContent = `${parseFloat(sliderInclination.value).toFixed(2)} rad`;
    sliderInclination.oninput = (e) => {
      const v = parseFloat(e.target.value);
      valInclination.textContent = `${v.toFixed(2)} rad`;
      if (bhObj.shaderMat.uniforms.uInclination) bhObj.shaderMat.uniforms.uInclination.value = v;
    };
  }

  if (sliderDoppler && valDoppler) {
    sliderDoppler.value = bhObj.shaderMat.uniforms.uDopplerStrength ? bhObj.shaderMat.uniforms.uDopplerStrength.value : 1.35;
    valDoppler.textContent = `${parseFloat(sliderDoppler.value).toFixed(2)}x`;
    sliderDoppler.oninput = (e) => {
      const v = parseFloat(e.target.value);
      valDoppler.textContent = `${v.toFixed(2)}x`;
      if (bhObj.shaderMat.uniforms.uDopplerStrength) bhObj.shaderMat.uniforms.uDopplerStrength.value = v;
    };
  }

  if (btnGeodesicGrid) {
    let showGrid = bhObj.shaderMat.uniforms.uShowGeodesicGrid ? (bhObj.shaderMat.uniforms.uShowGeodesicGrid.value > 0.5) : false;
    btnGeodesicGrid.textContent = showGrid ? 'ACTIVA (ON)' : 'INACTIVA';
    if (showGrid) btnGeodesicGrid.classList.add('active');
    else btnGeodesicGrid.classList.remove('active');

    btnGeodesicGrid.onclick = () => {
      showGrid = !showGrid;
      if (bhObj.shaderMat.uniforms.uShowGeodesicGrid) {
        bhObj.shaderMat.uniforms.uShowGeodesicGrid.value = showGrid ? 1.0 : 0.0;
      }
      btnGeodesicGrid.textContent = showGrid ? 'ACTIVA (ON)' : 'INACTIVA';
      if (showGrid) btnGeodesicGrid.classList.add('active');
      else btnGeodesicGrid.classList.remove('active');
    };
  }
}

/* ---------- 5b. Gesto Swipe-Down para Cerrar Drawer ---------- */
{
  const panel = document.getElementById('infoPanel');
  let startY = 0, currentY = 0, swiping = false;
  panel.addEventListener('touchstart', e => {
    const t = e.touches[0];
    if (e.target.closest('.drawer-handle') || panel.scrollTop <= 0) {
      startY = t.clientY;
      currentY = startY;
      swiping = true;
    }
  }, { passive: true });
  panel.addEventListener('touchmove', e => {
    if (!swiping) return;
    currentY = e.touches[0].clientY;
    const dy = currentY - startY;
    if (dy > 0) {
      panel.style.transform = `translateY(${dy}px)`;
      panel.style.transition = 'none';
    }
  }, { passive: true });
  panel.addEventListener('touchend', () => {
    if (!swiping) return;
    swiping = false;
    const dy = currentY - startY;
    panel.style.transition = '';
    panel.style.transform = '';
    if (dy > 80) closeInfoPanel();
  });
}

/* ---------- 6. Tours Temáticos Guiados para Docentes ---------- */
function openToursModal() {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <h2 class="modal-title">🚀 Tours Didácticos para Docentes</h2>
    <p class="modal-subtitle">Selecciona una ruta escolar curada para explorar el cosmos paso a paso:</p>
    <div class="tour-card" onclick="startTour('estrellas')">
      <div>
        <div class="tour-card-title">✦ El Ciclo de Vida de las Estrellas</div>
        <div class="tour-card-desc">5 etapas: Nacimiento, Gigante Roja, Enana Blanca, Púlsar y Agujero Negro.</div>
      </div>
      <span style="font-size:20px">➔</span>
    </div>
    <div class="tour-card" onclick="startTour('oceanos')">
      <div>
        <div class="tour-card-title">✦ Mundos Océano y Habitabilidad</div>
        <div class="tour-card-desc">5 etapas: Tierra, Marte y lunas heladas del Sistema Solar.</div>
      </div>
      <span style="font-size:20px">➔</span>
    </div>
    <div class="tour-card" onclick="startTour('gigantes')">
      <div>
        <div class="tour-card-title">✦ Los Colosos del Sistema Solar</div>
        <div class="tour-card-desc">4 etapas: Júpiter, Saturno, Urano y Neptuno.</div>
      </div>
      <span style="font-size:20px">➔</span>
    </div>
    <div style="text-align:right; margin-top:20px">
      <button class="btn-hud" onclick="closeModal()">Cerrar</button>
    </div>
  `;
  overlay.classList.add('show');
}

function startTour(tourKey) {
  closeModal();
  activeTourKey = tourKey;
  tourStepIdx = 0;
  document.getElementById('btnTours').classList.add('active-tour');
  document.getElementById('tourBar').classList.add('show');
  navigateToTourStep();
}

function navigateToTourStep() {
  const tour = TOURS[activeTourKey];
  if (!tour) return;
  const step = tour.steps[tourStepIdx];
  document.getElementById('tourStepBadge').textContent = `${tour.title} — Paso ${tourStepIdx + 1} de ${tour.steps.length}`;
  document.getElementById('tourStepTitle').textContent = step.title;
  focusObject(step.id);
}

function tourNext() {
  const tour = TOURS[activeTourKey];
  if (!tour) return;
  if (tourStepIdx < tour.steps.length - 1) {
    tourStepIdx++;
    navigateToTourStep();
  } else {
    showToast('🎉 ¡Has completado el tour didáctico con éxito!', 4000);
    exitTour();
  }
}

function tourPrev() {
  if (tourStepIdx > 0) {
    tourStepIdx--;
    navigateToTourStep();
  }
}

function exitTour() {
  activeTourKey = null;
  tourStepIdx = 0;
  document.getElementById('btnTours').classList.remove('active-tour');
  document.getElementById('tourBar').classList.remove('show');
}

/* ---------- 7. Cuestionario Cósmico (Quiz) ---------- */
const QUIZ = QUIZ_QUESTIONS;
function openQuizModal() {
  const q = QUIZ[Math.floor(Math.random() * QUIZ.length)];
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  let optsHTML = '';
  q.opts.forEach((o, i) => {
    optsHTML += `<div class="tour-card" onclick="checkQuizAnswer(${i}, ${q.ans}, '${q.exp.replace(/'/g, "\\'")}')">
      <span class="tour-card-title">${o}</span>
    </div>`;
  });
  content.innerHTML = `
    <h2 class="modal-title">🧠 Desafío Astrofísico</h2>
    <p class="modal-subtitle">${q.q}</p>
    ${optsHTML}
    <div id="quizResult" style="margin-top:16px; font-weight:700"></div>
    <div style="text-align:right; margin-top:20px">
      <button class="btn-hud" onclick="closeModal()">Cerrar</button>
    </div>
  `;
  overlay.classList.add('show');
}

function checkQuizAnswer(selected, correct, explanation) {
  const res = document.getElementById('quizResult');
  if (selected === correct) {
    res.style.color = '#34d399';
    res.innerHTML = `¡CORRECTO! 🌟 <br><span style="font-size:13px; font-weight:400; color:#e2e8f0">${explanation}</span>`;
    showToast('🏆 ¡Reto superado! Has ganado la insignia Explorador Sabio', 4000);
    document.getElementById('badgeQuiz').classList.add('unlocked');
  } else {
    res.style.color = '#ef4444';
    res.innerHTML = `Incorrecto. Intenta otra opción.`;
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
}
window.checkQuizAnswer = checkQuizAnswer;
window.closeModal = closeModal;

/* ---------- 8. Insignias de Logros ---------- */
function checkBadges() {
  if (visitedSet.size >= 4) {
    const b = document.getElementById('badgePlanets');
    if (!b.classList.contains('unlocked')) {
      b.classList.add('unlocked');
      showToast('🌟 ¡Logro desbloqueado! Navegante Planetario', 3500);
    }
  }
  if (visitedSet.has('agujero') && visitedSet.has('pulsar') && visitedSet.has('nebulosa')) {
    const b = document.getElementById('badgeDeep');
    if (!b.classList.contains('unlocked')) {
      b.classList.add('unlocked');
      showToast('🚀 ¡Logro desbloqueado! Explorador del Espacio Profundo', 3500);
    }
  }
}

/* ---------- 9. Toast de Notificaciones ---------- */
let toastTimeout = null;
function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), duration);
}

/* ---------- 10. Raycaster e Interacción Táctil Directa ---------- */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let pointerDownPos = null;
window.addEventListener('pointerdown', e => {
  if (e.target.closest('header') || e.target.closest('.info-panel') ||
      e.target.closest('.bottom-bar') || e.target.closest('.modal-overlay') ||
      e.target.closest('.tour-bar') || e.target.closest('.floating-controls')) return;
  pointerDownPos = { x: e.clientX, y: e.clientY };
});
window.addEventListener('pointerup', e => {
  if (!pointerDownPos) return;
  const dx = e.clientX - pointerDownPos.x;
  const dy = e.clientY - pointerDownPos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  pointerDownPos = null;
  if (dist > 6) return;
  if (e.target.closest('header') || e.target.closest('.info-panel') ||
      e.target.closest('.bottom-bar') || e.target.closest('.modal-overlay') ||
      e.target.closest('.tour-bar') || e.target.closest('.floating-controls')) return;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const meshes = Object.values(focusables).map(x => x.mesh);
  const hits = raycaster.intersectObjects(meshes, true);
  if (hits.length > 0) {
    let top = hits[0].object;
    while (top.parent && top.parent !== scene && top.parent !== planetsGroup && top.parent !== deepGroup && !top.parent.isGroup) {
      top = top.parent;
    }
    const foundEntry = Object.entries(focusables).find(([k, v]) => v.mesh === top || v.mesh.children.includes(top));
    if (foundEntry) {
      focusObject(foundEntry[0]);
    }
  }
});

/* ---------- 11. Controles HUD Event Listeners ---------- */
document.getElementById('btnSolar').onclick = () => setMode('solar');
document.getElementById('btnDeep').onclick = () => setMode('deep');
const btnConstEl = document.getElementById('btnConstelaciones');
if (btnConstEl) btnConstEl.onclick = () => setMode('constelaciones');
const btnEarthView = document.getElementById('btnEarthViewToggle');
if (btnEarthView) {
  btnEarthView.onclick = () => {
    controller.earthSkyView = !controller.earthSkyView;
    if (controller.earthSkyView) {
      if (typeof earthHorizonGroup !== 'undefined') earthHorizonGroup.visible = true;
      btnEarthView.innerHTML = '🌍 VISTA DESDE TIERRA (ACTIVO)';
      btnEarthView.style.background = 'rgba(0, 240, 255, 0.15)';
      if (currentFocusData && focusables[currentFocusData.id] && focusables[currentFocusData.id].type === 'constelacion') {
        controller.lookFromEarthAt(new THREE.Vector3(...currentFocusData.pos));
      } else {
        controller.lookFromEarthAt(new THREE.Vector3(0, 60, -280));
      }
      showToast('🌍 Vista Observatorio: Cielo Estrellado desde la Tierra', 2500);
    } else {
      if (typeof earthHorizonGroup !== 'undefined') earthHorizonGroup.visible = false;
      btnEarthView.innerHTML = '🛰️ VISTA BÓVEDA ORBITAL';
      btnEarthView.style.background = 'rgba(255, 255, 255, 0.08)';
      controller.targetRadius = 310;
      showToast('🛰️ Vista Orbital 3D de la Bóveda Celeste', 2500);
    }
  };
}
const btnDriftEl = document.getElementById('btnDriftTop');
if (btnDriftEl) btnDriftEl.onclick = toggleDriftMode;
document.getElementById('btnKiosk').onclick = toggleKioskMode;
document.getElementById('btnTours').onclick = openToursModal;
document.getElementById('btnQuiz').onclick = openQuizModal;

function openGrrtSimulation() {
  const grrtOverlay = document.getElementById('grrtOverlay');
  const grrtIframe = document.getElementById('grrtIframe');
  if (grrtIframe && grrtOverlay) {
    grrtIframe.src = './simulador-grrt/index.html';
    grrtOverlay.classList.add('show');
    showToast('⚛️ Motor Raytracing Binet (GRRT) Iniciado', 3000);
  }
}

function closeGrrtSimulation() {
  const grrtOverlay = document.getElementById('grrtOverlay');
  const grrtIframe = document.getElementById('grrtIframe');
  if (grrtOverlay) {
    grrtOverlay.classList.remove('show');
  }
  if (grrtIframe) {
    grrtIframe.src = '';
  }
}

const btnGrrtEl = document.getElementById('btnGrrt');
if (btnGrrtEl) btnGrrtEl.onclick = openGrrtSimulation;

const btnOpenGrrtPanelEl = document.getElementById('btnOpenGrrtPanel');
if (btnOpenGrrtPanelEl) btnOpenGrrtPanelEl.onclick = openGrrtSimulation;

const btnCloseGrrtEl = document.getElementById('btnCloseGrrt');
if (btnCloseGrrtEl) btnCloseGrrtEl.onclick = closeGrrtSimulation;

document.getElementById('closeInfoBtn').onclick = closeInfoPanel;

document.getElementById('tourPrevBtn').onclick = tourPrev;
document.getElementById('tourNextBtn').onclick = tourNext;
document.getElementById('tourExitBtn').onclick = exitTour;

document.getElementById('tabPrimaria').onclick = () => setEduLevel('primaria');
document.getElementById('tabSecundaria').onclick = () => setEduLevel('secundaria');
document.getElementById('tabAvanzado').onclick = () => setEduLevel('avanzado');

document.getElementById('btnResetCam').onclick = () => {
  if (mode === 'solar') focusObject('sol');
  else if (mode === 'constelaciones') focusObject('osa_mayor');
  else focusObject('agujero');
  showToast('🎯 Vista centrada', 2000);
};

function updateSpeedButtons(speedVal) {
  simSpeed = speedVal;
  document.querySelectorAll('.speedbtn').forEach(btn => btn.classList.remove('active'));
  if (speedVal === 0) document.getElementById('btnSpeed0').classList.add('active');
  else if (speedVal === 1) document.getElementById('btnSpeed1').classList.add('active');
  else if (speedVal === 2) document.getElementById('btnSpeed2').classList.add('active');
  else if (speedVal === 5) document.getElementById('btnSpeed5').classList.add('active');
}
document.getElementById('btnSpeed0').onclick = () => updateSpeedButtons(0);
document.getElementById('btnSpeed1').onclick = () => updateSpeedButtons(1);
document.getElementById('btnSpeed2').onclick = () => updateSpeedButtons(2);
document.getElementById('btnSpeed5').onclick = () => updateSpeedButtons(5);

/* ---------- 12. Bucle de Animación PBR HD (60 FPS) ---------- */
const clock = new THREE.Clock();
function animate() {
  window._cosmicRafId = requestAnimationFrame(animate);
  const dt = clock.getDelta();
  const t = clock.getElapsedTime();
  checkPerformance();

  // Rotación y órbita Kepleriana de los planetas (v ∝ r^-0.5)
  PLANETS.forEach((p, i) => {
    const item = focusables[p.id];
    if (!item) return;
    if (i > 0) {
      const keplerSpeed = p.dist > 0 ? 1.0 / Math.sqrt(p.dist / 11.0) : 1.0;
      if (item.pivot) item.pivot.rotation.y += dt * 0.12 * keplerSpeed * simSpeed;
      item.mesh.rotation.y += dt * 0.4 * simSpeed;
      // Nubes de la Tierra giran de forma independiente
      if (item.mesh.userData.cloudMesh) {
        item.mesh.userData.cloudMesh.rotation.y += dt * 0.48 * simSpeed;
      }
      if (item.moonMeshes) {
        item.moonMeshes.forEach(m => {
          const ang = t * 0.5 * m.data.s * simSpeed;
          m.mesh.position.x = Math.cos(ang) * m.data.d;
          m.mesh.position.z = Math.sin(ang) * m.data.d;
        });
      }
    } else {
      item.mesh.rotation.y += dt * 0.08 * simSpeed;
    }
  });

  // Animación de astros del Universo Profundo PBR & Shaders Relativistas
  const pulsarItem = focusables['pulsar'];
  if (pulsarItem) {
    if (pulsarItem.surfaceMat?.uniforms?.uTime) pulsarItem.surfaceMat.uniforms.uTime.value = t;
    if (pulsarItem.coneMat?.uniforms?.uTime) pulsarItem.coneMat.uniforms.uTime.value = t;
    if (pulsarItem.mesh) pulsarItem.mesh.rotation.y += dt * 3.5 * simSpeed;
  }

  const agujeroItem = focusables['agujero'];
  if (agujeroItem) {
    if (agujeroItem.shaderMat?.uniforms) {
      agujeroItem.shaderMat.uniforms.uTime.value = t;
      agujeroItem.shaderMat.uniforms.uCameraPos.value.copy(camera.position);
      agujeroItem.shaderMat.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }
    if (agujeroItem.s2Star) {
      const s2Angle = t * 0.65 * simSpeed;
      const rS2 = 4.8 / (1 + 0.58 * Math.cos(s2Angle));
      agujeroItem.s2Star.position.x = rS2 * Math.cos(s2Angle);
      agujeroItem.s2Star.position.z = rS2 * Math.sin(s2Angle) * 0.6;
      agujeroItem.s2Star.position.y = Math.sin(s2Angle * 2.0) * 0.45;
    }
    if (agujeroItem.mesh) agujeroItem.mesh.rotation.y += dt * 0.08 * simSpeed;
  }

  if (composer && composer.lensingPass) {
    const lp = composer.lensingPass;
    let targetStrength = 0;
    if (agujeroItem && agujeroItem.mesh && deepGroup.visible) {
      const bhWorldPos = agujeroItem.mesh.getWorldPosition(new THREE.Vector3());
      const ndc = bhWorldPos.clone().project(camera);
      if (!isNaN(ndc.x) && ndc.z < 1) {
        lp.uniforms.uBHScreen.value.set((ndc.x + 1) / 2, (ndc.y + 1) / 2);
        const distToCam = camera.position.distanceTo(bhWorldPos);
        const onScreen = Math.abs(ndc.x) < 1.3 && Math.abs(ndc.y) < 1.3;
        targetStrength = onScreen ? THREE.MathUtils.clamp(1.0 - distToCam / 260, 0.15, 1) : 0;
      }
    }
    lp.uniforms.uStrength.value += (targetStrength - lp.uniforms.uStrength.value) * 0.08;
  }

  const giganteItem = focusables['gigante'];
  if (giganteItem && giganteItem.mat && giganteItem.mat.uniforms?.uTime) {
    giganteItem.mat.uniforms.uTime.value = t;
    giganteItem.mesh.rotation.y += dt * 0.12 * simSpeed;
  }

  const enanaItem = focusables['enana'];
  if (enanaItem && enanaItem.mat && enanaItem.mat.uniforms?.uTime) {
    enanaItem.mat.uniforms.uTime.value = t;
    enanaItem.mesh.rotation.y += dt * 0.8 * simSpeed;
  }

  const nebItem = focusables['nebulosa'];
  if (nebItem) {
    if (nebItem.mat?.uniforms?.uTime) nebItem.mat.uniforms.uTime.value = t;
    if (nebItem.mat?.uniforms?.uCameraPos) nebItem.mat.uniforms.uCameraPos.value.copy(camera.position);
    if (nebItem.mesh) nebItem.mesh.rotation.y += dt * 0.015 * simSpeed;
  }

  const galItem = focusables['galaxia'];
  if (galItem && galItem.galaxyStars) {
    galItem.galaxyStars.rotation.y += dt * 0.04 * simSpeed;
  }

  const protoItem = focusables['protoplanetario'];
  if (protoItem) {
    if (protoItem.diskMat?.uniforms?.uTime) protoItem.diskMat.uniforms.uTime.value = t;
    if (protoItem.jetMat?.uniforms?.uTime) protoItem.jetMat.uniforms.uTime.value = t;
    if (protoItem.protoDisk) protoItem.protoDisk.rotation.z -= dt * 0.35 * simSpeed;
    if (protoItem.mesh) protoItem.mesh.rotation.y += dt * 0.05 * simSpeed;
  }

  const binItem = focusables['binario'];
  if (binItem) {
    if (binItem.streamMat?.uniforms?.uTime) binItem.streamMat.uniforms.uTime.value = t;
    if (binItem.mesh) binItem.mesh.rotation.y += dt * 0.45 * simSpeed;
    if (binItem.accDisk) binItem.accDisk.rotation.z -= dt * 0.8 * simSpeed;
  }

  // Actualizar Sol GLSL y Corona
  const solItem = focusables['sol'];
  if (solItem && solItem.mesh) {
    if (solItem.mat && solItem.mat.uniforms?.uTime) solItem.mat.uniforms.uTime.value = t;
    if (solItem.mesh.userData.coronaMat?.uniforms?.viewVector) {
      solItem.mesh.userData.coronaMat.uniforms.viewVector.value.subVectors(camera.position, solItem.mesh.position);
    }
  }

  // Centelleo estelar — actualizar uTime del fondo
  if (scene.children) {
    scene.children.forEach(child => {
      if (child.isPoints && child.material?.uniforms?.uTime) {
        child.material.uniforms.uTime.value = t;
      }
    });
  }

  // Deriva sutil de cámara con Perlin noise cuando el usuario está inactivo
  if (document.body.classList.contains('ui-hidden')) {
    controller.targetTheta += simplex.noise2D(t * 0.08, 1.5) * 0.00015;
    controller.targetPhi += simplex.noise2D(1.5, t * 0.06) * 0.00008;
  }

  // Barra de escala dinámica
  const scaleLabel = document.getElementById('scaleBarLabel');
  if (scaleLabel) {
    if (mode === 'solar') {
      const auPerUnit = 0.02;
      const visibleAU = controller.radius * auPerUnit;
      if (visibleAU < 0.5) scaleLabel.textContent = Math.round(visibleAU * 1496e5) + ' km';
      else scaleLabel.textContent = visibleAU.toFixed(1) + ' UA';
    } else if (mode === 'deep') {
      const lyPerUnit = 0.8;
      const visibleLY = controller.radius * lyPerUnit;
      if (visibleLY > 1000) scaleLabel.textContent = (visibleLY / 1000).toFixed(1) + ' kly';
      else scaleLabel.textContent = Math.round(visibleLY) + ' al';
    } else {
      scaleLabel.textContent = Math.round(controller.radius * 0.35) + ' grados';
    }
  }

  controller.update();
  if (composer) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}

/* ---------- 13. Carga y Redimensionado de Ventana ---------- */
window.addEventListener('resize', () => {
  const w = window.innerWidth || canvas.clientWidth || 1;
  const h = window.innerHeight || canvas.clientHeight || 1;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 2, w < 768 ? 2 : 3));
  renderer.setSize(w, h);
  if (composer) {
    composer.setSize(w, h);
    if (composer.bloomPass) {
      composer.bloomPass.resolution.set(w, h);
    }
    if (composer.lensingPass) {
      composer.lensingPass.uniforms.uAspect.value = w / h;
    }
  }
});

function hideLoadingScreen() {
  const l = document.getElementById('loading');
  if (l && !l.dataset.removed) {
    l.dataset.removed = 'true';
    l.style.opacity = '0';
    setTimeout(() => l.remove(), 750);
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(hideLoadingScreen, 600);
} else {
  window.addEventListener('load', () => setTimeout(hideLoadingScreen, 600));
  document.addEventListener('DOMContentLoaded', () => setTimeout(hideLoadingScreen, 600));
}

if (window._cosmicRafId) cancelAnimationFrame(window._cosmicRafId);
window._cosmicAnimate = animate;
animate();
