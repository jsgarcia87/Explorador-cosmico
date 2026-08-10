import React, { useState, useEffect, useRef } from 'react';
import { X, Play, RefreshCw, Sparkles, FlaskConical, Orbit, Sun, ShieldAlert } from 'lucide-react';

interface PhysicsLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ExperimentId = 'galaxies' | 'lensing' | 'orbits' | 'supernova' | 'eclipse';

export const PhysicsLabModal: React.FC<PhysicsLabModalProps> = ({ isOpen, onClose }) => {
  const [activeExp, setActiveExp] = useState<ExperimentId>('galaxies');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Parámetros interactivos
  const [massParam, setMassParam] = useState<number>(50);
  const [speedParam, setSpeedParam] = useState<number>(50);
  const [lensOffset, setLensOffset] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Animación del canvas del laboratorio
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Partículas para colisión de galaxias
    const stars: { x: number; y: number; vx: number; vy: number; color: string }[] = [];
    if (activeExp === 'galaxies') {
      for (let i = 0; i < 180; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 80;
        stars.push({
          x: 180 + Math.cos(angle) * r,
          y: 150 + Math.sin(angle) * r,
          vx: -Math.sin(angle) * 1.5,
          vy: Math.cos(angle) * 1.5,
          color: '#38bdf8'
        });
      }
      for (let i = 0; i < 180; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 80;
        stars.push({
          x: 420 + Math.cos(angle) * r,
          y: 250 + Math.sin(angle) * r,
          vx: -Math.sin(angle) * 1.2 - 0.5,
          vy: Math.cos(angle) * 1.2 - 0.5,
          color: '#f43f5e'
        });
      }
    }

    const render = () => {
      time += 1;
      ctx.fillStyle = 'rgba(10, 15, 30, 0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (activeExp === 'galaxies') {
        const gMass = (massParam / 50) * 800;
        stars.forEach((s) => {
          // Centro de gravedad galaxia 1 y 2
          const dx1 = 300 - s.x;
          const dy1 = 200 - s.y;
          const dist1 = Math.max(15, Math.sqrt(dx1 * dx1 + dy1 * dy1));
          s.vx += (dx1 / dist1) * (gMass / (dist1 * dist1));
          s.vy += (dy1 / dist1) * (gMass / (dist1 * dist1));

          s.x += s.vx * (isRunning ? 1 : 0);
          s.y += s.vy * (isRunning ? 1 : 0);

          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.fill();
        });
      } else if (activeExp === 'lensing') {
        // Simulación de Lente Gravitacional (Anillo de Einstein)
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const offset = (lensOffset - 50) * 2;

        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1;

        // Cuadrícula de espacio-tiempo distorsionada
        for (let x = 40; x < canvas.width; x += 30) {
          for (let y = 40; y < canvas.height; y += 30) {
            const dx = x - cx;
            const dy = y - cy;
            const d = Math.sqrt(dx * dx + dy * dy);
            const warp = Math.max(0, 35 - d * 0.15);
            ctx.fillStyle = d < 45 ? '#ff79c6' : '#64748b';
            ctx.fillRect(x + (dx / (d || 1)) * warp + offset * 0.2, y + (dy / (d || 1)) * warp, 2, 2);
          }
        }

        // Anillo de Einstein luminoso
        ctx.beginPath();
        ctx.arc(cx, cy, 55 + (massParam / 100) * 30, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 200, 100, 0.8)';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Agujero negro en el centro
        ctx.beginPath();
        ctx.arc(cx, cy, 25, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.strokeStyle = '#ff6b35';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (activeExp === 'orbits') {
        // Órbitas keplerianas con diferente excentricidad
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Sol en el foco
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();

        // Trayectoria elíptica según massParam
        const a = 140;
        const e = (massParam - 50) * 0.012; // Excentricidad
        const b = a * Math.sqrt(1 - e * e);

        ctx.beginPath();
        ctx.ellipse(cx + a * e, cy, a, b, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Planeta orbitando
        const theta = time * 0.03 * (speedParam / 50);
        const px = cx + a * e + Math.cos(theta) * a;
        const py = cy + Math.sin(theta) * b;

        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
      } else if (activeExp === 'supernova') {
        // Onda de choque de supernova
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const radius = (time * 2) % 220;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 100, 50, ${1 - radius / 220})`;
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#8be9fd';
        ctx.fill();
      } else if (activeExp === 'eclipse') {
        // Eclipse solar y cono de sombra
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Sol izquierda
        ctx.beginPath();
        ctx.arc(100, cy, 35, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();

        // Tierra centro
        ctx.beginPath();
        ctx.arc(320, cy, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();

        // Sombra (Umbra)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.moveTo(320, cy - 18);
        ctx.lineTo(520, cy);
        ctx.lineTo(320, cy + 18);
        ctx.fill();

        // Luna orbitando
        const my = cy + Math.sin(time * 0.05) * 60;
        ctx.beginPath();
        ctx.arc(420, my, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#94a3b8';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, activeExp, massParam, speedParam, lensOffset, isRunning]);

  if (!isOpen) return null;

  const experiments: { id: ExperimentId; name: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'galaxies', name: 'Colisión de Galaxias (N-Cuerpos)', icon: <Sparkles className="w-4 h-4 text-pink-400" />, desc: 'Simula cómo la gravedad mutua fusiona cientos de estrellas cuando dos galaxias chocan.' },
    { id: 'lensing', name: 'Lente Gravitacional (Einstein)', icon: <Orbit className="w-4 h-4 text-[#7aafc8]" />, desc: 'Observa cómo un agujero negro o cúmulo curva el espacio-tiempo deforma la luz de un quásar.' },
    { id: 'orbits', name: 'Órbitas Keplerianas Interactivas', icon: <Sun className="w-4 h-4 text-[#c8964a]" />, desc: 'Modifica la excentricidad orbital para entender las leyes de Kepler y las órbitas elípticas.' },
    { id: 'supernova', name: 'Explosión de Supernova Tipo II', icon: <ShieldAlert className="w-4 h-4 text-orange-400" />, desc: 'Simula el colapso gravitacional de un núcleo de hierro y la onda de choque nucleosintética.' },
    { id: 'eclipse', name: 'Alineación y Eclipses', icon: <FlaskConical className="w-4 h-4 text-emerald-400" />, desc: 'Analiza los conos de sombra (umbra y penumbra) durante un eclipse solar o lunar total.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="physics-lab-title">
      <div className="w-full max-w-5xl h-[85vh] flex flex-col rounded-[8px] bg-[rgba(8,8,12,0.95)] border border-[rgba(237,233,228,0.10)] shadow-2xl overflow-hidden">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(237,233,228,0.07)] bg-[rgba(3,3,5,0.60)]">
          <div className="flex items-center space-x-3">
            <FlaskConical className="w-6 h-6 text-[#7aafc8]" />
            <div>
              <h2 id="physics-lab-title" className="text-xl font-outfit font-bold text-[#ede9e4]">
                Laboratorio de Simulaciones Físicas del Cosmos
              </h2>
              <span className="text-xs font-mono text-[#7aafc8]">
                Mecánica Orbital • Gravedad Relativista • Astrofísica Dinámica
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.04)] hover:bg-[rgba(237,233,228,0.08)] text-[rgba(237,233,228,0.5)] hover:text-[#ede9e4] transition-colors"
            aria-label="Cerrar laboratorio de física"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo principal (Izquierda lista, Derecha Canvas y controles) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Panel lateral de experimentos */}
          <div className="w-80 border-r border-[rgba(237,233,228,0.07)] bg-[rgba(3,3,5,0.40)] p-4 space-y-2 overflow-y-auto">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[rgba(237,233,228,0.5)] block mb-2">
              SELECCIONA EXPERIMENTO
            </span>
            {experiments.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveExp(exp.id)}
                className={`w-full flex flex-col text-left p-3 rounded-[6px] border transition-all ${
                  activeExp === exp.id
                    ? 'bg-[rgba(122,175,200,0.15)] border-[rgba(122,175,200,0.3)] text-[#ede9e4] shadow-md'
                    : 'bg-[rgba(237,233,228,0.04)] border-[rgba(237,233,228,0.07)] text-[rgba(237,233,228,0.6)] hover:bg-[rgba(237,233,228,0.08)]'
                }`}
              >
                <div className="flex items-center space-x-2 font-outfit font-bold text-sm">
                  {exp.icon}
                  <span>{exp.name}</span>
                </div>
                <p className="text-xs text-[rgba(237,233,228,0.5)] mt-1 leading-relaxed">
                  {exp.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Área del Canvas y controles interactivos */}
          <div className="flex-1 flex flex-col bg-[rgba(3,3,5,0.80)] p-6">
            <div className="flex-1 relative rounded-[6px] overflow-hidden border border-[rgba(237,233,228,0.07)] bg-black/60 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Controles del experimento inferior */}
            <div className="mt-4 p-4 rounded-[6px] bg-[rgba(237,233,228,0.04)] border border-[rgba(237,233,228,0.07)] flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <label className="block text-xs font-mono text-[rgba(237,233,228,0.5)] mb-1">
                    {activeExp === 'orbits' ? 'EXCENTRICIDAD ORBITAL' : 'MASA GRAVITACIONAL'} ({massParam}%)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={massParam}
                    onChange={(e) => setMassParam(Number(e.target.value))}
                    className="w-36 accent-[#7aafc8] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[rgba(237,233,228,0.5)] mb-1">
                    VELOCIDAD SIMULACIÓN ({speedParam}%)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={speedParam}
                    onChange={(e) => setSpeedParam(Number(e.target.value))}
                    className="w-36 accent-[#7aafc8] cursor-pointer"
                  />
                </div>

                {activeExp === 'lensing' && (
                  <div>
                    <label className="block text-xs font-mono text-[rgba(237,233,228,0.5)] mb-1">
                      DESPLAZAMIENTO LENTE
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={lensOffset}
                      onChange={(e) => setLensOffset(Number(e.target.value))}
                      className="w-32 accent-purple-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="px-4 py-2 rounded-[4px] bg-[#7aafc8] hover:bg-[#8ec5dc] text-black font-outfit font-bold text-xs flex items-center space-x-1 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'Pausar' : 'Reanudar'}</span>
                </button>
                <button
                  onClick={() => {
                    setMassParam(50);
                    setSpeedParam(50);
                    setLensOffset(50);
                  }}
                  className="p-2 rounded-[4px] bg-[rgba(237,233,228,0.08)] hover:bg-[rgba(237,233,228,0.12)] text-[#ede9e4] transition-colors"
                  title="Restablecer parámetros"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
