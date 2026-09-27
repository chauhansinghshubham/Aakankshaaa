import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';
import flowerImg from '../assets/flowers.jpg';

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setRevealed(false);
    };
    if (revealed) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [revealed]);

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

        {/* Subtle, discreet note placed thoughtfully below with ample breathing room */}
        <div className="mt-14 sm:mt-20 flex flex-col items-center justify-center w-full px-4 select-none">
          <div className="w-1.5 h-1.5 rounded-full bg-white/15 mb-3" />
          <motion.p
            className="text-xs sm:text-sm font-sans text-center max-w-xs sm:max-w-md mx-auto"
            style={{
              color: 'rgba(255, 255, 255, 0.24)',
              letterSpacing: '0.025em',
              lineHeight: 1.65,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Don't think that this whole thing is made with AI, it required some serious skills to make all this
          </motion.p>
        </div>

        {/* Aesthetic Centered Popup Modal */}
        <AnimatePresence>
          {revealed && (
            <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              {/* Blurred Dark Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setRevealed(false)}
              />

              {/* Sparkle Shower inside modal */}
              {sparkles && <SparkleShower active />}

              {/* Angled Polaroid Keepsake Card */}
              <motion.div
                className="relative z-10 cursor-default select-none max-w-[310px] sm:max-w-[360px] w-full"
                initial={{ opacity: 0, scale: 0.7, rotate: -8, y: 30 }}
                animate={{ opacity: 1, scale: 1, rotate: -3.5, y: 0 }}
                exit={{ opacity: 0, scale: 0.75, rotate: -8, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Frosted Gold Washi Tape at Top */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-6 sm:h-7 z-30 pointer-events-none"
                  style={{
                    background: 'rgba(254, 240, 138, 0.65)',
                    backdropFilter: 'blur(4px)',
                    border: '1px dashed rgba(201, 169, 110, 0.7)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    transform: 'translateX(-50%) rotate(2deg)',
                  }}
                />

                {/* Close Button */}
                <button
                  onClick={() => setRevealed(false)}
                  className="absolute -top-3 -right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-900/90 hover:bg-stone-900 text-white/90 hover:text-white border border-white/20 shadow-2xl flex items-center justify-center text-sm font-bold transition-all hover:scale-110 cursor-pointer"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                  }}
                  title="Close"
                >
                  ✕
                </button>

                {/* Physical Polaroid Body */}
                <div
                  className="bg-[#fcfaf7] p-3.5 sm:p-5 pb-5 sm:pb-6 rounded-2xl"
                  style={{
                    boxShadow:
                      '0 35px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(233, 30, 140, 0.3), 0 0 0 1px rgba(255,255,255,0.4)',
                  }}
                >
                  {/* Photo Frame */}
                  <div className="rounded-xl overflow-hidden aspect-[3/4] bg-stone-900 shadow-inner relative">
                    <img
                      src={flowerImg}
                      alt="Kuch yaad aaya"
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 25px rgba(0,0,0,0.2)',
                      }}
                    />
                  </div>

                  {/* Nostalgic Handwritten Style Caption */}
                  <div className="mt-4 sm:mt-5 text-center px-2">
                    <p
                      className="text-2xl sm:text-3xl font-bold tracking-wide select-none"
                      style={{
                        fontFamily: 'Dancing Script, cursive, var(--font-serif)',
                        color: '#2a1a2e',
                        textShadow: '0 1px 2px rgba(0,0,0,0.08)',
                      }}
                    >
                      "Kuch yaad aaya...!!" 🌸
                    </p>
                    <p
                      className="text-[10px] sm:text-[11px] tracking-widest uppercase mt-1.5"
                      style={{
                        color: '#9e738e',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      ✦ Tap outside to close ✦
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
