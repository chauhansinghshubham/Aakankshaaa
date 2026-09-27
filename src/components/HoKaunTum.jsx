import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from './ParticleSystem';
import content from '../config/content';

const TYPING_LINES = [
  'Ek ladki...',
  'jo pata nahi kab itni important ho gayi.',
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
      }, 50);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, lines[lineIndex]]);
        setLineIndex(l => l + 1);
        setCharIndex(0);
      }, 600);
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const { displayed, currentPartial, done } = useTypingSequence(TYPING_LINES, inView);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center overflow-hidden"
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
          background: 'linear-gradient(to bottom, rgba(7,5,16,0.6) 0%, rgba(7,5,16,0.85) 50%, rgba(7,5,16,0.98) 100%)',
        }}
      />

      <ParticleSystem />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 flex flex-col items-center gap-6 sm:gap-8 max-w-2xl w-full">
        {/* Big title */}
        <motion.h2
          className="leading-none"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 10vw, 6rem)',
            fontWeight: 900,
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #fff 0%, var(--color-pink-light) 40%, var(--color-gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(233,30,140,0.4))',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          HO KAUN TUM??
        </motion.h2>

        {/* Typing text */}
        <div
          className="text-lg sm:text-2xl leading-relaxed text-center min-h-[4rem]"
          style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-sans)', fontWeight: 300 }}
        >
          {displayed.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="italic"
            >
              "{line}"
            </motion.p>
          ))}
          {!done && (
            <p className="italic">
              "{currentPartial}"
              <span className="typewriter-cursor" />
            </p>
          )}
        </div>

        {/* Lyric */}
        <motion.blockquote
          className="text-center px-6 py-3.5 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.4rem',
            color: 'var(--color-gold)',
            boxShadow: '0 4px 25px rgba(0,0,0,0.3)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          "Musafir main bhatka, tu mera basera ✨"
        </motion.blockquote>

        {/* The true story from the magazine */}
        <motion.div
          className="glass rounded-2xl p-6 sm:p-8 text-left mt-2"
          style={{
            border: '1px solid rgba(233,30,140,0.2)',
            background: 'rgba(7,5,16,0.7)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="text-sm sm:text-base leading-relaxed text-white/80 font-sans font-light">
            I said those words to you when I was angry, and I answered you in a way you never deserved. But those words made me think... If you really asked me that question today: <span className="text-white font-medium italic">Who are you to me?</span>
          </p>
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs sm:text-sm text-pink-200/90 font-sans">
            <p>✦ The person whose messages I look forward to.</p>
            <p>✦ The person whose silence I notice.</p>
            <p>✦ The person I can argue with and still miss.</p>
            <p>✦ The person who can make me ridiculously happy with the smallest things.</p>
            <p>✦ The person who somehow became a part of my everyday life.</p>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-white/90 italic font-sans border-l-2 border-pink-500 pl-3">
            So no, Aakanksha... you are not "nothing" to me. You are someone who means a lot more to me than I have sometimes been able to express.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
