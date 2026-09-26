import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    let rafId;
    const lerp = (a, b, t) => a + (b - a) * t;

    const followRing = () => {
      ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.12);
      ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPosRef.current.x}px`;
        ringRef.current.style.top = `${ringPosRef.current.y}px`;
      }
      rafId = requestAnimationFrame(followRing);
    };
    rafId = requestAnimationFrame(followRing);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot — snappy */}
      <div
        ref={dotRef}
        className="hidden md:block fixed pointer-events-none z-[99999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--color-pink)',
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          boxShadow: '0 0 10px rgba(233,30,140,0.8), 0 0 20px rgba(233,30,140,0.4)',
        }}
      />
      {/* Ring — lagging */}
      <div
        ref={ringRef}
        className="hidden md:block fixed pointer-events-none z-[99998]"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(233,30,140,0.5)',
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          boxShadow: '0 0 20px rgba(233,30,140,0.15)',
        }}
      />
    </>
  );
}
