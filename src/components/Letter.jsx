import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';

const LETTER_TEXT = content.letter;

function useHealingLetter(text, started) {
  const [displayed, setDisplayed] = useState('');
  const [isInstant, setIsInstant] = useState(false);
  const timeoutRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!started) return;
    if (isInstant) {
      setDisplayed(text);
      return;
    }

    const typeNext = () => {
      if (indexRef.current >= text.length) return;
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      // Speed adapts: Slower at the start so user can watch the paper uncrunch
      let delay = 26;
      if (indexRef.current < 90) {
        delay = 62; // Slow & deliberate opening lines
      } else if (indexRef.current < 240) {
        delay = 44; // Gentle pickup
      } else {
        delay = 26; // Natural cursive flow
      }

      timeoutRef.current = setTimeout(typeNext, delay);
    };

    timeoutRef.current = setTimeout(typeNext, 80);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [started, text, isInstant]);

  const showAll = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    indexRef.current = text.length;
    setDisplayed(text);
    setIsInstant(true);
  };

  const reset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    indexRef.current = 0;
    setDisplayed('');
    setIsInstant(false);
  };

  return { displayed, showAll, reset, isInstant };
}

export default function Letter({ hasReachedLastPage = false }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Automatically start typing and uncrunching when scrolled into view (no click required)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const { displayed, showAll, reset, isInstant } = useHealingLetter(LETTER_TEXT, inView);

  // Reset if user replays from start
  useEffect(() => {
    if (!hasReachedLastPage) {
      const handleTop = () => {
        if (window.scrollY < 100 && inView) {
          reset();
        }
      };
      window.addEventListener('scroll', handleTop, { passive: true });
      return () => window.removeEventListener('scroll', handleTop);
    }
  }, [hasReachedLastPage, inView, reset]);

  // Progress from 0.0 (crunched/crinkled vintage) to 1.0 (smooth, pristine letter)
  const progress = LETTER_TEXT.length > 0 ? Math.min(1, displayed.length / LETTER_TEXT.length) : 0;
  const isFinished = progress >= 0.999;
  const crunched = Math.max(0, 1 - progress);
  const crunchedEase = Math.pow(crunched, 1.3); // Natural paper elasticity curve
  const healed = Math.min(1, progress);

  // Crunched physical dimensions that expand and straighten out
  const scaleX = (0.94 + 0.06 * healed).toFixed(3);
  const scaleY = (0.93 + 0.07 * healed).toFixed(3);
  const rotX = (3.5 * crunched).toFixed(2);
  const rotY = (-2.5 * crunched).toFixed(2);
  const rotZ = (-1.4 * crunched).toFixed(2);

  // Irregular pinched border radius when crunched, smoothing to perfect 16px
  const rTopLeft = Math.round(16 - 6 * crunched);
  const rTopRight = Math.round(16 + 10 * crunched);
  const rBottomRight = Math.round(16 - 8 * crunched);
  const rBottomLeft = Math.round(16 + 12 * crunched);
  const borderRadius = `${rTopLeft}px ${rTopRight}px ${rBottomRight}px ${rBottomLeft}px`;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
      ref={sectionRef}
      id="letter-section"
    >
      {/* Background Ambience */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(201,169,110,${(0.04 + 0.05 * healed).toFixed(2)}) 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8">
          <ScrollReveal>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3 transition-colors duration-500"
              style={{
                color: isFinished ? 'var(--color-gold)' : '#c29b63',
                fontFamily: 'var(--font-sans)',
              }}
            >
              ✦ {isFinished ? 'Written Honestly' : 'Smoothing Crunched Parchment'} ✦
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold"
              style={{
                fontFamily: 'var(--font-serif)',
                background: 'linear-gradient(135deg, #fff 0%, var(--color-gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Something I Couldn't<br />
              <span style={{ fontStyle: 'italic' }}>Say Properly</span>
            </h2>
          </ScrollReveal>

          {/* Dynamic Paper Uncrunching & Healing Status */}
          <div className="mt-4 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-sans tracking-wide">
              {!isFinished ? (
                <span className="text-amber-200/80 flex items-center gap-2">
                  <span className="inline-block animate-pulse">📜</span>
                  <span>Uncrunching & smoothing paper...</span>
                  <span className="font-mono text-amber-300 font-bold">
                    {Math.round(progress * 100)}%
                  </span>
                </span>
              ) : (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-amber-300 flex items-center gap-1.5 font-medium"
                >
                  <span>✨</span>
                  <span>Completely smoothed & written with care</span>
                  <span>🤍</span>
                </motion.span>
              )}
            </div>

            {/* Subtle Progress Bar */}
            <div className="w-52 h-1.5 bg-amber-950/50 rounded-full mt-2 overflow-hidden border border-amber-800/40">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 transition-all duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* ─── DYNAMIC LETTER PAPER (STARTS CRUNCHED, FIXES BIT BY BIT) ─── */}
        <motion.div
          className="relative overflow-hidden transition-all duration-300"
          style={{
            // Physical paper crumple transformation: contracts, tilts, and expands smooth
            transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scaleX}, ${scaleY})`,
            borderRadius: borderRadius,
            // Base background is the clean pristine ivory paper
            background: 'linear-gradient(135deg, #fdfbf7 0%, #f6efe2 100%)',
            border: `1px solid rgba(201, 169, 110, ${(0.3 + 0.3 * healed).toFixed(2)})`,
            boxShadow: `0 20px 80px rgba(0,0,0,0.5), inset 0 0 ${Math.round(60 * crunched)}px rgba(45, 20, 5, ${(0.85 * crunched).toFixed(2)}), inset 0 0 ${Math.round(20 * crunched)}px rgba(20, 8, 2, ${(0.95 * crunched).toFixed(2)}), 0 0 ${Math.round(45 * healed)}px rgba(201,169,110,${(0.22 * healed).toFixed(2)})`,
          }}
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* ── LAYER 1: VINTAGE AGED TEA-STAINED CRUNCHED BACKGROUND ── */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
            style={{
              opacity: crunched,
              background:
                'linear-gradient(135deg, #caa56e 0%, #b89158 25%, #c89f66 50%, #a88147 75%, #8e6833 100%)',
            }}
          >
            {/* Water stains & Tea burns */}
            <div
              className="absolute top-6 left-8 w-36 h-36 rounded-full blur-md"
              style={{
                background: 'radial-gradient(circle, rgba(55, 22, 6, 0.45) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-8 right-10 w-44 h-44 rounded-full blur-lg"
              style={{
                background: 'radial-gradient(circle, rgba(45, 18, 5, 0.5) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute top-10 right-14 w-24 h-24 rounded-full border-2 border-amber-950/35 opacity-40 rotate-12"
            />
          </div>

          {/* ── LAYER 2: 3D CRUNCHED PAPER FACET SHADING (CRUMPLED PLANES) ── */}
          <div
            className="absolute inset-0 pointer-events-none z-15 transition-opacity duration-300"
            style={{ opacity: crunchedEase }}
          >
            {/* Triangular & angular facet shadows and highlights of crushed paper */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 25% 30%, rgba(255,255,255,0.25) 0%, transparent 40%), radial-gradient(ellipse at 75% 65%, rgba(0,0,0,0.3) 0%, transparent 45%), radial-gradient(ellipse at 35% 75%, rgba(255,255,255,0.2) 0%, transparent 35%), radial-gradient(ellipse at 80% 25%, rgba(0,0,0,0.35) 0%, transparent 40%)',
              }}
            />
          </div>

          {/* ── LAYER 3: REALISTIC CRUNCHED CREASE RIDGES (HIGH-RELIEF SVG) ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-300"
            style={{ opacity: crunchedEase }}
            viewBox="0 0 600 800"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="shadow-blur">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
            </defs>

            {/* CRUNCH RIDGE 1: Major diagonal crush (top-left to bottom-right) */}
            <path
              d="M 20 40 Q 150 180 280 240 T 420 480 T 560 740"
              fill="none"
              stroke="rgba(20, 8, 2, 0.65)"
              strokeWidth="3.5"
              filter="url(#shadow-blur)"
            />
            <path
              d="M 22 38 Q 152 178 282 238 T 422 478 T 562 738"
              fill="none"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="2"
            />

            {/* CRUNCH RIDGE 2: Crossing diagonal crush (top-right to bottom-left) */}
            <path
              d="M 570 60 Q 430 210 320 310 T 180 540 T 30 720"
              fill="none"
              stroke="rgba(20, 8, 2, 0.6)"
              strokeWidth="3"
              filter="url(#shadow-blur)"
            />
            <path
              d="M 568 58 Q 428 208 318 308 T 178 538 T 28 718"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.8"
            />

            {/* CRUNCH RIDGE 3: Upper horizontal crunch fold */}
            <path
              d="M 0 260 Q 180 290 320 270 T 600 280"
              fill="none"
              stroke="rgba(20, 8, 2, 0.55)"
              strokeWidth="2.5"
            />
            <path
              d="M 0 258 Q 180 288 320 268 T 600 278"
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.5"
            />

            {/* CRUNCH RIDGE 4: Lower horizontal crunch fold */}
            <path
              d="M 0 530 Q 220 510 380 540 T 600 520"
              fill="none"
              stroke="rgba(20, 8, 2, 0.55)"
              strokeWidth="2.5"
            />
            <path
              d="M 0 528 Q 220 508 380 538 T 600 518"
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.5"
            />

            {/* CRUNCH RIDGE 5: Side crinkle branches */}
            <path
              d="M 80 140 L 220 180 L 190 280"
              fill="none"
              stroke="rgba(25, 10, 2, 0.45)"
              strokeWidth="2"
            />
            <path
              d="M 82 138 L 222 178 L 192 278"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1.2"
            />

            <path
              d="M 520 380 L 380 430 L 440 560"
              fill="none"
              stroke="rgba(25, 10, 2, 0.45)"
              strokeWidth="2"
            />
            <path
              d="M 518 378 L 378 428 L 438 558"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1.2"
            />

            <path
              d="M 120 620 L 260 670 L 340 640"
              fill="none"
              stroke="rgba(25, 10, 2, 0.4)"
              strokeWidth="1.8"
            />
          </svg>

          {/* ── LAYER 4: CRUMPLED DOG-EARED CORNER (FLATTENS AS LETTER HEALS) ── */}
          <div
            className="absolute top-0 right-0 w-14 h-14 overflow-hidden pointer-events-none z-30 transition-all duration-300"
            style={{
              opacity: Math.max(0, 1 - progress * 1.5),
              transform: `scale(${Math.max(0, 1 - progress * 1.5)})`,
              transformOrigin: 'top right',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(225deg, rgba(25, 10, 3, 0.9) 0%, rgba(45, 20, 8, 0.7) 48%, transparent 50%)',
                borderBottom: '1px solid rgba(40, 15, 5, 0.7)',
                borderLeft: '1px solid rgba(40, 15, 5, 0.7)',
                boxShadow: '-3px 3px 6px rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {/* ── LETTER HEADER ── */}
          <div
            className="relative px-6 sm:px-8 pt-8 pb-4 z-25 transition-colors duration-500"
            style={{
              borderBottom: `1px solid rgba(154, 133, 96, ${(0.2 + 0.2 * healed).toFixed(2)})`,
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.2em] font-mono transition-colors duration-500"
                  style={{ color: isFinished ? '#8f6e3c' : '#573315' }}
                >
                  {isFinished ? 'Smooth & Restored' : 'Smoothing crunched paper...'}
                </p>
                <p
                  className="text-sm font-serif italic transition-colors duration-500"
                  style={{ color: isFinished ? '#785b30' : '#4a2b10' }}
                >
                  A letter, written honestly.
                </p>
              </div>

              {/* Wax Seal at top right */}
              <div
                className="wax-seal scale-90 sm:scale-100 transition-all duration-500"
                style={{
                  boxShadow: isFinished
                    ? '0 6px 20px rgba(220, 38, 38, 0.6), 0 0 15px rgba(201, 169, 110, 0.4)'
                    : '0 4px 15px rgba(120, 20, 20, 0.6)',
                }}
              >
                S
              </div>
            </div>
          </div>

          {/* ── LETTER BODY (TYPEWRITER IN CURSIVE) ── */}
          <div className="relative px-6 sm:px-8 py-8 z-25">
            <pre
              className="whitespace-pre-wrap leading-loose select-text transition-colors duration-500"
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.15rem',
                // Text subtly sharpens from vintage brownish sepia to warm deep ink
                color: isFinished ? '#241712' : '#331d10',
                minHeight: 320,
              }}
            >
              {displayed}
              {!isFinished && (
                <span
                  className="typewriter-cursor inline-block w-2 h-5 ml-1 align-middle animate-pulse"
                  style={{ background: isFinished ? 'var(--color-gold)' : '#78481c' }}
                />
              )}
            </pre>
          </div>

          {/* ── DECORATIVE NOTEBOOK RULER LINES ── */}
          <div className="relative px-6 sm:px-8 pb-4 z-25 pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-full mb-6 transition-all duration-500"
                style={{
                  height: 1,
                  background: isFinished
                    ? 'rgba(154, 133, 96, 0.16)'
                    : 'rgba(80, 40, 10, 0.22)',
                }}
              />
            ))}
          </div>

          {/* ── HELPER: SKIP TO FULL SMOOTH RESTORED LETTER ── */}
          {!isFinished && inView && (
            <div className="relative text-center pb-6 z-25">
              <button
                type="button"
                onClick={showAll}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-sans tracking-wider uppercase text-amber-900/80 bg-amber-900/10 hover:bg-amber-900/20 border border-amber-900/25 transition-all hover:scale-105 cursor-pointer"
              >
                <span>⚡</span>
                <span>Smooth & show entire letter</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
