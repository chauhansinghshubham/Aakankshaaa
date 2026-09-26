import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from './ParticleSystem';
import content from '../config/content';

const TYPING_LINES = [
  'Tu hi meri subah...',
  'Tu hi meri shaam...',
  'Aur bata bhi de —',
  'Ho kaun tum? 🤍',
];

function useTypingSequence(lines, started) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    if (!started) return;
    if (lineIndex >= lines.length) return;

    if (charIndex < lines[lineIndex].length) {
      const t = setTimeout(() => {
        setCharIndex(c => c + 1);
      }, 60);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, lines[lineIndex]]);
        setLineIndex(l => l + 1);
        setCharIndex(0);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [started, lineIndex, charIndex, lines]);

  const currentPartial = started && lineIndex < lines.length
    ? lines[lineIndex].slice(0, charIndex)
    : '';

  return { displayed, currentPartial, done: lineIndex >= lines.length };
}

export default function HoKaunTum() {
  const [inView, setInView] = useState(false);
  const [bgErrored, setBgErrored] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const { displayed, currentPartial, done } = useTypingSequence(TYPING_LINES, inView);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#070510' }}
    >
      {/* Background photo */}
      {!bgErrored && content.photos.hoKaunTum && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={inView ? { scale: 1.08 } : { scale: 1 }}
          transition={{ duration: 20, ease: 'linear' }}
        >
          <img
            src={content.photos.hoKaunTum}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setBgErrored(true)}
          />
        </motion.div>
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: bgErrored
            ? 'radial-gradient(ellipse at 50% 40%, rgba(233,30,140,0.08) 0%, rgba(7,5,16,1) 70%)'
            : 'linear-gradient(to bottom, rgba(7,5,16,0.3) 0%, rgba(7,5,16,0.7) 50%, rgba(7,5,16,0.95) 100%)',
        }}
      />

      <ParticleSystem />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-8 max-w-3xl">
        {/* Big title */}
        <motion.h2
          className="leading-none"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3rem, 12vw, 8rem)',
            fontWeight: 900,
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #fff 0%, var(--color-pink-light) 40%, var(--color-gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 30px rgba(233,30,140,0.4))',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          Ho Kaun Tum??
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="w-32 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Typing text */}
        <div
          className="text-xl md:text-2xl leading-loose text-center min-h-[8rem]"
          style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-sans)', fontWeight: 300 }}
        >
          {displayed.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {line}
            </motion.p>
          ))}
          {!done && (
            <p>
              {currentPartial}
              <span className="typewriter-cursor" />
            </p>
          )}
        </div>

        {/* Lyric */}
        <motion.blockquote
          className="text-center px-8 py-4 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(10px)',
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.3rem',
            color: 'var(--color-gold)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          "Musafir main bhatka, tu mera basera ❤️"
        </motion.blockquote>
      </div>
    </section>
  );
}
