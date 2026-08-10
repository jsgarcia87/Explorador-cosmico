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
  const dotColor = item.selected ? '#c8964a' : '#7aafc8';

  return (
    <div
      style={{
        position: 'absolute',
        left: item.screenX,
        top: item.screenY,
        transform: 'translate(-50%, -100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        opacity,
      }}
    >
      {/* Dot marker */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          border: `1.5px solid ${dotColor}`,
          background: item.selected ? dotColor : 'transparent',
          boxShadow: `0 0 6px ${dotColor}`,
        }}
      />
      {/* Name */}
      <span
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400,
          fontSize: 11,
          letterSpacing: '0.5px',
          color: '#ede9e4',
          textShadow: '0 1px 4px rgba(0,0,0,.8)',
          whiteSpace: 'nowrap',
          background: 'rgba(3,3,3,0.6)',
          padding: '2px 8px',
          borderRadius: '2px',
          marginTop: 2,
        }}
      >
        {item.name}
      </span>
      {/* Distance */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontWeight: 400,
          fontSize: 9,
          color: 'rgba(237,233,228,0.4)',
          textShadow: '0 1px 3px rgba(0,0,0,.7)',
          whiteSpace: 'nowrap',
        }}
      >
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
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        opacity: 0.6,
      }}
    >
      {/* Arrow */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        style={{ transform: `rotate(${deg}deg)`, flexShrink: 0 }}
      >
        <polygon
          points="18,9 4,2 6,9 4,16"
          fill="#7aafc8"
          opacity="0.85"
        />
      </svg>
      {/* Label */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontWeight: 400,
          fontSize: 9,
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
          color: 'rgba(237,233,228,0.4)',
          textShadow: '0 1px 3px rgba(0,0,0,.8)',
          whiteSpace: 'nowrap',
          background: 'rgba(3,3,3,0.6)',
          padding: '1px 5px',
          borderRadius: '2px',
        }}
      >
        {abbrev}
      </span>
    </div>
  );
};
