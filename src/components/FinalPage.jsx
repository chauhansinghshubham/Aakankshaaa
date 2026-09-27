import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import content from '../config/content';

function FairyLightEmbers() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2.5 + 1.2,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '#fcd34d' : '#f472b6',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 6;
        ctx.fill();
        ctx.restore();
      });
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ opacity: 0.85 }}
    />
  );
}

function FinalPhoto() {
  const [errored, setErrored] = useState(false);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {!errored ? (
        <motion.img
          src={content.photos.final}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 18, ease: 'easeOut' }}
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(233,30,140,0.08) 0%, rgba(7,5,16,1) 70%)',
          }}
        />
      )}
      {/* Warm cinematic vignette preserving fairy lights in the background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(7,5,16,0.35) 0%, rgba(7,5,16,0.78) 65%, rgba(7,5,16,0.96) 100%)',
        }}
      />
    </div>
  );
}

export default function FinalPage({ onReplay, onReachedLastPage }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onReachedLastPage?.();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onReachedLastPage]);

  return (
    <section
      ref={sectionRef}
      id="final-page"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <FinalPhoto />
      <FairyLightEmbers />

      {/* Content Container */}
      <div className="relative z-20 text-center px-2 sm:px-4 flex flex-col items-center max-w-xl w-full">
        {/* Glowing Sanctuary Card */}
        <motion.div
          className="w-full rounded-3xl p-6 sm:p-10 relative overflow-hidden text-center"
          style={{
            background: 'rgba(7, 5, 16, 0.68)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(233, 30, 140, 0.22)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.75), 0 0 50px rgba(201, 169, 110, 0.1)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => onReachedLastPage?.()}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* Subtle top indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-px" style={{ background: 'rgba(201,169,110,0.3)' }} />
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium" style={{ color: 'var(--color-gold)' }}>
              ✦ Under The Lights ✦
            </p>
            <span className="w-6 h-px" style={{ background: 'rgba(201,169,110,0.3)' }} />
          </div>

          {/* Title */}
          <h2
            className="font-serif italic font-bold text-3xl sm:text-5xl mb-6"
            style={{
              fontFamily: 'var(--font-serif)',
              background: 'linear-gradient(135deg, #ffffff 0%, var(--color-pink-light) 50%, var(--color-gold) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 20px rgba(233,30,140,0.3))',
            }}
          >
            For Aakanksha 🤍
          </h2>

          {/* Sincere, natural reflection */}
          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base font-light leading-relaxed text-white/85 text-left sm:text-center">
            <p>
              I know you're upset with me and showing like you don't want to talk anymore... but as far as I know you, there's a corner in you that doesn't completely agree with this decision. <span className="text-pink-200/90 font-normal italic">You're just not showing it.</span>
            </p>

            <p className="text-white/75">
              I just miss us. The late calls, you taking off your glasses even when you complained your eyes look small, getting soaked in the rain without an umbrella...
            </p>

            {/* The Highlighted Quote */}
            <div
              className="py-3 px-4 sm:px-6 my-1 rounded-2xl text-center"
              style={{
                background: 'rgba(201, 169, 110, 0.08)',
                border: '1px solid rgba(201, 169, 110, 0.22)',
              }}
            >
              <p
                className="font-serif italic text-base sm:text-lg"
                style={{ color: 'var(--color-gold)' }}
              >
                "Agar aap baat nahi karenge, toh hum ghar aa jayenge aapke."
              </p>
            </div>

            <p className="text-white/85">
              I don't know what I feel for you or if I even have feelings for you or not, but I literally miss us. The thing without any tag that was between us will always be my core memory.
            </p>

            <p className="text-white font-medium text-base sm:text-lg pt-1" style={{ color: 'var(--color-pink-light)' }}>
              And honestly... I just really don't want this to be where we end.
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-1">
              <p className="text-xs sm:text-sm text-white/50">
                No pressure at all. Whenever you feel like talking, I'm right here.
              </p>
              <p className="font-serif italic text-pink-200 text-sm mt-1">
                — Shubham
              </p>
            </div>
          </div>
        </motion.div>

        {/* Simple dignified replay button */}
        <motion.button
          className="mt-6 px-6 py-2.5 rounded-full text-xs tracking-widest uppercase glass text-white/40 hover:text-white transition-all cursor-pointer"
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.15em',
          }}
          whileHover={{ scale: 1.03 }}
          onClick={onReplay}
        >
          Replay ↻
        </motion.button>

        {/* Subtle footer */}
        <p className="text-[11px] tracking-[0.25em] text-white/20 uppercase mt-2">
          aakankshaaa.in
        </p>
      </div>
    </section>
  );
}
