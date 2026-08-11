import React, { useEffect, useState, useRef } from 'react';
import type { CosmicEngine } from '../engine/CosmicEngine';

interface LegendItem {
  id: string;
  name: string;
  type: string;
  distance: number;
  screenX: number;
  screenY: number;
  onScreen: boolean;
  behind: boolean;
  selected: boolean;
}

interface DeepSpaceLegendHUDProps {
  engine: CosmicEngine | null;
}

const EDGE_MARGIN = 40;

function formatDistance(d: number): string {
  if (d < 10) return d.toFixed(1) + ' ly';
  if (d < 1000) return Math.round(d) + ' ly';
  return (d / 1000).toFixed(1) + ' kly';
}

export const DeepSpaceLegendHUD: React.FC<DeepSpaceLegendHUDProps> = ({ engine }) => {
  const [items, setItems] = useState<LegendItem[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!engine) return;

    const tick = () => {
      setItems(engine.getLegendData());
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [engine]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 15,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {items.map((item) =>
        item.onScreen ? (
          <OnScreenLabel key={item.id} item={item} />
        ) : (
          <OffScreenArrow key={item.id} item={item} />
        )
      )}
    </div>
  );
};

const OnScreenLabel: React.FC<{ item: LegendItem }> = ({ item }) => {
  const opacity = Math.max(0.35, 1 - item.distance / 200);
  const dotClass = item.selected ? 'border-accent bg-accent shadow-[0_0_8px_var(--accent)]' : 'border-primary bg-transparent shadow-[0_0_8px_var(--primary)]';

  return (
    <div
      className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-full font-mono"
      style={{ left: item.screenX, top: item.screenY, opacity }}
    >
      <div className={`w-1.5 h-1.5 border-[1px] ${dotClass}`} />
      <span className="font-display font-bold text-[11px] md:text-[10px] tracking-widest text-white whitespace-nowrap bg-space-dark/80 px-2 py-0.5 border border-primary/30 uppercase mt-1">
        {item.name}
      </span>
      <span className="text-[10px] md:text-[9px] text-primary/60 tracking-widest whitespace-nowrap font-data">
        {formatDistance(item.distance)}
      </span>
    </div>
  );
};

const OffScreenArrow: React.FC<{ item: LegendItem }> = ({ item }) => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const cx = w / 2;
  const cy = h / 2;

  let dx = item.screenX - cx;
  let dy = item.screenY - cy;
  if (item.behind) {
    dx = -dx;
    dy = -dy;
  }

  const angle = Math.atan2(dy, dx);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const maxX = w / 2 - EDGE_MARGIN;
  const maxY = h / 2 - EDGE_MARGIN;

  let t = Infinity;
  if (Math.abs(cos) > 0.001) t = Math.min(t, maxX / Math.abs(cos));
  if (Math.abs(sin) > 0.001) t = Math.min(t, maxY / Math.abs(sin));

  const x = cx + cos * t;
  const y = cy + sin * t;
  const deg = (angle * 180) / Math.PI;

  const abbrev = item.name.length > 12 ? item.name.slice(0, 10) + '…' : item.name;

  return (
    <div
      className="absolute flex items-center gap-1 -translate-x-1/2 -translate-y-1/2 opacity-60 font-mono"
      style={{ left: x, top: y }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        className="flex-shrink-0"
        style={{ transform: `rotate(${deg}deg)` }}
      >
        <polygon points="16,8 4,2 6,8 4,14" className="fill-primary opacity-80" />
      </svg>
      <span className="text-[10px] md:text-[8px] tracking-widest uppercase text-telemetry-muted whitespace-nowrap bg-space-dark/80 px-1.5 py-0.5 border border-primary/20">
        {abbrev}
      </span>
    </div>
  );
};
