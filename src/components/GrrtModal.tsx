import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles, ShieldCheck, Activity, RotateCcw, Sliders } from 'lucide-react';
import * as THREE from 'three';
import { RelativisticBlackHoleShader } from '../engine/shaders/RelativisticBlackHoleShader';

interface GrrtModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrrtModal: React.FC<GrrtModalProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parámetros relativistas interactivos
  const [spin, setSpin] = useState<number>(0.92);
  const [accretionRate, setAccretionRate] = useState<number>(1.35);
  const [inclinationDeg, setInclinationDeg] = useState<number>(72);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Referencias a Three.js en runtime
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shaderMatRef = useRef<THREE.ShaderMaterial | null>(null);
  const blackHoleGroupRef = useRef<THREE.Group | null>(null);
  const animIdRef = useRef<number | null>(null);

  // Control de arrastre del ratón para girar la vista en 3D
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraAngleRef = useRef<{ theta: number; phi: number }>({
    theta: 0.2,
    phi: (72 * Math.PI) / 180
  });

  useEffect(() => {
    if (!isOpen || !canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const radiusDist = 18;
    camera.position.set(0, radiusDist * Math.cos(cameraAngleRef.current.phi), radiusDist * Math.sin(cameraAngleRef.current.phi));
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    const group = new THREE.Group();
    blackHoleGroupRef.current = group;

    // Shader nativo de Agujero Negro y Anillo de Einstein
    const shaderMat = RelativisticBlackHoleShader.createMaterial({
      spin: spin,
      accretionRate: accretionRate,
      inclination: (inclinationDeg * Math.PI) / 180,
      innerHex: '#ffffff',
      outerHex: '#ff5500'
    });
    shaderMatRef.current = shaderMat;

    const sphereGeo = new THREE.SphereGeometry(4.8, 64, 64);
    const blackHoleMesh = new THREE.Mesh(sphereGeo, shaderMat);
    group.add(blackHoleMesh);

    // Disco difuso exterior de plasma ionizado
    const diskGeo = new THREE.RingGeometry(4.9, 13.5, 64);
    const diskMat = new THREE.MeshBasicMaterial({
      color: 0xff6622,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending
    });
    const diskMesh = new THREE.Mesh(diskGeo, diskMat);
    diskMesh.rotation.x = Math.PI / 2;
    group.add(diskMesh);

    scene.add(group);

    const clock = new THREE.Clock();
    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isPaused && shaderMatRef.current) {
        shaderMatRef.current.uniforms.time.value += delta * 1.8;
      }

      // Actualizar cámara por arrastre
      if (cameraRef.current) {
        const r = 18;
        const th = cameraAngleRef.current.theta;
        const ph = cameraAngleRef.current.phi;
        cameraRef.current.position.set(
          r * Math.sin(ph) * Math.sin(th),
          r * Math.cos(ph),
          r * Math.sin(ph) * Math.cos(th)
        );
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isOpen]);

  // Actualizar uniforms en tiempo real sin recargar la escena
  useEffect(() => {
    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.spin.value = spin;
      shaderMatRef.current.uniforms.accretionRate.value = accretionRate;
      shaderMatRef.current.uniforms.inclination.value = (inclinationDeg * Math.PI) / 180;
    }
  }, [spin, accretionRate, inclinationDeg]);

  if (!isOpen) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    cameraAngleRef.current.theta += dx * 0.008;
    cameraAngleRef.current.phi = Math.max(
      0.15,
      Math.min(Math.PI - 0.15, cameraAngleRef.current.phi - dy * 0.008)
    );
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Cálculos astronómicos mostrados en el panel de telemetría
  const rSchw = 2.0; // Radio de Schwarzschild base en unidades normalizadas
  const horizonRadius = (rSchw * (1 - spin * 0.35)).toFixed(2);
  const photonSphere = (Number(horizonRadius) * 1.5).toFixed(2);
  const dopplerBoost = (1 + spin * Math.sin((inclinationDeg * Math.PI) / 180) * 0.85).toFixed(2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="grrt-title"
    >
      <div className="w-full max-w-7xl h-[90vh] flex flex-col rounded-2xl bg-slate-950 border border-white/20 shadow-2xl overflow-hidden">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-orange-500 animate-ping" />
            <div>
              <h2 id="grrt-title" className="text-lg font-outfit font-bold text-white flex items-center space-x-2">
                <span>Simulador Relativista Nativo GRRT (Kerr • Schwarzschild)</span>
                <span className="text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Gargantua • M87*
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Simulación nativa WebGL con curvatura geodésica, esfera fotónica, Anillo de Einstein y efecto Doppler en tiempo real.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setSpin(0.92);
                setAccretionRate(1.35);
                setInclinationDeg(72);
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 transition-colors border border-white/10"
              title="Restaurar parámetros por defecto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Parámetros</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Cerrar simulador GRRT"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cuerpo del simulador: Canvas 3D + Panel lateral de telemetría y controles */}
        <div className="flex-1 w-full h-full relative flex flex-col lg:flex-row overflow-hidden bg-black">
          {/* Visor WebGL 3D en tiempo real */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="flex-1 h-full relative cursor-grab active:cursor-grabbing select-none"
          >
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Ayuda de navegación en pantalla */}
            <div className="absolute top-4 left-4 pointer-events-none px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-xs text-slate-300">
              <span className="font-medium text-orange-300">Arrastra con el ratón</span> para rotar el plano orbital del Agujero Negro en tiempo real.
            </div>

            {/* Ficha rápida superior derecha */}
            <div className="absolute top-4 right-4 pointer-events-none px-3.5 py-2 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md text-right">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Radio de Horizonte</div>
              <div className="text-sm font-bold font-mono text-orange-400">R = {horizonRadius} rₛ</div>
            </div>
          </div>

          {/* Panel Lateral de Control Relativista */}
          <div className="w-full lg:w-96 bg-slate-900/70 border-t lg:border-t-0 lg:border-l border-white/10 p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
                <Sliders className="w-4 h-4 text-orange-400" />
                <h3 className="font-outfit font-semibold text-white text-sm">Controles de Relatividad General</h3>
              </div>

              {/* Slider 1: Espín de Kerr */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Espín de Kerr (a/M)</span>
                  <span className="font-mono text-orange-400 font-bold">{spin.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.99"
                  step="0.01"
                  value={spin}
                  onChange={(e) => setSpin(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <p className="text-[11px] text-slate-400 leading-tight">
                  Controla el arrastre del espacio-tiempo (Frame-Dragging). Valores cercanos a 1 contraen el horizonte interior.
                </p>
              </div>

              {/* Slider 2: Tasa de Acreción */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Tasa de Acreción (Ṁ)</span>
                  <span className="font-mono text-cyan-400 font-bold">{accretionRate.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                  value={accretionRate}
                  onChange={(e) => setAccretionRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <p className="text-[11px] text-slate-400 leading-tight">
                  Intensidad del flujo ionizado en el disco coronal y luminosidad de la esfera fotónica.
                </p>
              </div>

              {/* Slider 3: Inclinación del Observador */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Inclinación Visual (θ)</span>
                  <span className="font-mono text-emerald-400 font-bold">{inclinationDeg}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="88"
                  step="1"
                  value={inclinationDeg}
                  onChange={(e) => setInclinationDeg(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-[11px] text-slate-400 leading-tight">
                  Inclinación respecto al plano del disco. A mayor inclinación, mayor asimetría visual por efecto Doppler.
                </p>
              </div>

              {/* Telemetría Astrofísica calculada en vivo */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2.5 font-mono text-xs">
                <div className="text-slate-400 uppercase tracking-wider text-[10px]">Telemetría Relativista en Vivo</div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Esfera Fotónica (r_ph):</span>
                  <span className="text-white font-bold">{photonSphere} rₛ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Boost Doppler:</span>
                  <span className="text-amber-400 font-bold">x{dopplerBoost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tipo Métrica:</span>
                  <span className="text-emerald-400 font-bold">{spin > 0.05 ? 'Kerr (Rotatorio)' : 'Schwarzschild'}</span>
                </div>
              </div>
            </div>

            {/* Métrica en pie de panel */}
            <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400">
              <div className="flex items-center space-x-1.5 mb-1 text-slate-300 font-medium">
                <Activity className="w-3.5 h-3.5 text-orange-400" />
                <span>Geodésicas Fotónicas Integradas</span>
              </div>
              <p className="leading-snug">
                El haz de luz curvo muestra el Anillo de Einstein donde los fotones orbitan el agujero negro antes de escapar o caer al horizonte.
              </p>
            </div>
          </div>
        </div>

        {/* Pie de página explicativo */}
        <div className="p-3 border-t border-white/10 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Motor nativo 100% WebGL/GLSL integrado en el proyecto (Sin dependencias externas ni iframes).</span>
          </span>
          <span className="font-mono text-orange-400 hidden sm:inline">
            ds² = -(1 - 2Mr/ρ²)dt² - (4Mar sin²θ/ρ²)dtdφ + (ρ²/Δ)dr² + ...
          </span>
        </div>
      </div>
    </div>
  );
};
