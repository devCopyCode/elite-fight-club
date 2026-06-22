'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const scale = useRef(1);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.body.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => { scale.current = 2.4; };
    const onLeave = () => { scale.current = 1; };

    const bindHovers = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    bindHovers();

    const tick = () => {
      const { x, y } = pos.current;

      // Dot: instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      // Ring + scale: lerp
      ring.current.x += (x - ring.current.x) * 0.1;
      ring.current.y += (y - ring.current.y) * 0.1;
      const s = scale.current;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) scale(${s})`;
        ringRef.current.style.opacity = s > 1 ? '0.35' : '0.6';
      }

      raf.current = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('mousemove', onMove);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Dot — instant, red */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          background: 'var(--red)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />
      {/* Ring — trailing, expands on interactives */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: -14,
          left: -14,
          width: 28,
          height: 28,
          border: '1px solid var(--red)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'opacity 0.2s, transform 0.05s linear',
        }}
      />
    </>
  );
}
