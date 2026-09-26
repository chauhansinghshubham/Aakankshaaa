import { useEffect, useRef, useState } from 'react';

const PARTICLE_CONFIG = {
  desktop: 60,
  mobile: 20,
};

const SYMBOLS = ['♥', '✦', '·', '✧', '♡', '★', '·'];

function createParticle(canvas) {
  const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    symbol,
    size: Math.random() * 14 + 6,
    speedY: Math.random() * 0.8 + 0.3,
    speedX: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.1,
    fadeRate: Math.random() * 0.003 + 0.001,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.02 + 0.005,
    color: Math.random() > 0.5
      ? `rgba(233, 30, 140, ${Math.random() * 0.6 + 0.1})`
      : Math.random() > 0.5
        ? `rgba(201, 169, 110, ${Math.random() * 0.5 + 0.1})`
        : `rgba(167, 139, 250, ${Math.random() * 0.5 + 0.1})`,
  };
}

export default function ParticleSystem({ intensified = false }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const isMobile = window.innerWidth < 768;
    const maxParticles = intensified
      ? (isMobile ? 40 : 120)
      : (isMobile ? PARTICLE_CONFIG.mobile : PARTICLE_CONFIG.desktop);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // seed initial particles at random heights
    for (let i = 0; i < maxParticles / 2; i++) {
      const p = createParticle(canvas);
      p.y = Math.random() * canvas.height;
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // spawn new
      if (particlesRef.current.length < maxParticles) {
        particlesRef.current.push(createParticle(canvas));
      }

      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0.01 && p.y > -30);

      particlesRef.current.forEach(p => {
        p.y -= p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.3;
        if (p.y < canvas.height * 0.3) {
          p.opacity -= p.fadeRate;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText(p.symbol, p.x, p.y);
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [intensified]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
