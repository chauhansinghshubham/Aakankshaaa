import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';

function createConfetti() {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#e91e8c', '#c9a96e', '#7c3aed', '#ff6bb5', '#a78bfa', '#fbbf24'][i % 6],
    size: Math.random() * 10 + 6,
    delay: Math.random() * 0.5,
    duration: Math.random() * 2 + 2,
    rotate: Math.random() * 720 - 360,
  }));
}

function createSparkles() {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    delay: Math.random() * 1,
    size: Math.random() * 16 + 8,
  }));
}

function ConfettiShower({ active }) {
  const pieces = createConfetti();
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9970] overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: -20,
            background: p.color,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: '110vh',
            rotate: p.rotate,
            opacity: [1, 1, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}

function SparkleShower({ active }) {
  const sparkles = createSparkles();
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: s.size,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: 360 }}
          transition={{
            duration: 1.5,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
}

export default function Surprise() {
  const [hearts, setHearts] = useState(false);
  const [shook, setShook] = useState(false);
  const [surpriseText, setSurpriseText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [sparkles, setSparkles] = useState(false);

  const handleHearts = () => {
    setHearts(true);
    setTimeout(() => setHearts(false), 4000);
  };

  const handleShake = () => {
    setShook(true);
    setSurpriseText('You were literally warned. 😭💀');
    setTimeout(() => {
      setShook(false);
      setSurpriseText('');
    }, 3000);
  };

  const handleReveal = () => {
    setRevealed(true);
    setSparkles(true);
  };

  const BUTTONS = [
    {
      label: '💌 Open this',
      desc: 'A gift awaits...',
      bg: 'linear-gradient(135deg, var(--color-pink), #ff6bb5)',
      action: handleHearts,
    },
    {
      label: '🚫 Definitely don\'t click',
      desc: 'Seriously. Don\'t.',
      bg: 'linear-gradient(135deg, #374151, #1f2937)',
      action: handleShake,
    },
    {
      label: '✨ Okay fine, click this',
      desc: 'The last surprise',
      bg: 'linear-gradient(135deg, var(--color-gold), #e6b842)',
      action: handleReveal,
    },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(233,30,140,0.04) 0%, transparent 60%)',
        }}
      />

      <ConfettiShower active={hearts} />

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-6xl font-serif font-bold mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              background: 'linear-gradient(135deg, #fff 0%, var(--color-pink-light) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            One Last Thing...
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mb-16 text-sm" style={{ color: 'var(--color-muted)' }}>
            Three buttons. Choose wisely.
          </p>
        </ScrollReveal>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
          {BUTTONS.map((btn, i) => (
            <motion.button
              key={i}
              className={`relative px-6 py-4 rounded-2xl text-white font-medium min-w-[180px] min-h-[80px] flex flex-col items-center justify-center gap-1 ${shook && i === 1 ? 'shake' : ''}`}
              style={{
                background: btn.bg,
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                fontFamily: 'var(--font-sans)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={btn.action}
            >
              <span className="text-lg">{btn.label}</span>
              <span className="text-xs opacity-60">{btn.desc}</span>
            </motion.button>
          ))}
        </div>

        {/* Surprise text from shake */}
        <AnimatePresence>
          {surpriseText && (
            <motion.p
              key="surprise"
              className="text-lg mb-4"
              style={{ color: 'var(--color-pink)', fontFamily: 'var(--font-sans)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {surpriseText}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Final reveal */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              className="relative mt-8 glass rounded-2xl p-8"
              style={{
                border: '1px solid rgba(201,169,110,0.3)',
                boxShadow: '0 0 60px rgba(201,169,110,0.1)',
              }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {sparkles && <SparkleShower active />}
              <p
                className="text-3xl mb-4"
                style={{ fontFamily: 'var(--font-serif)', color: 'white' }}
              >
                You've officially reached the end ❤️
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
              >
                {content.finalMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
