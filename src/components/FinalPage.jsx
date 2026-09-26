import { useState } from 'react';
import { motion } from 'framer-motion';
import content from '../config/content';

function FinalPhoto() {
  const [errored, setErrored] = useState(false);
  return (
    <div className="absolute inset-0">
      {!errored ? (
        <motion.img
          src={content.photos.final}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'linear' }}
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(233,30,140,0.08) 0%, rgba(7,5,16,1) 70%)',
          }}
        />
      )}
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(7,5,16,0.4) 0%, rgba(7,5,16,0.6) 50%, rgba(7,5,16,0.8) 100%)',
        }}
      />
    </div>
  );
}

const TEXT_SEQUENCE = [
  { text: `For ${content.name} ❤️`, delay: 0.5, size: 'clamp(2rem, 6vw, 4rem)', style: 'italic', color: 'var(--color-pink-light)' },
  { text: 'Thank you for being a part of my life.', delay: 1.5, size: 'clamp(1.1rem, 3vw, 1.5rem)', style: 'normal', color: 'rgba(255,255,255,0.8)' },
  { text: content.finalMessage, delay: 2.8, size: 'clamp(0.95rem, 2.5vw, 1.2rem)', style: 'normal', color: 'var(--color-gold)' },
  { text: 'Take your time. No pressure.\nI just wanted you to smile.', delay: 4.5, size: 'clamp(0.85rem, 2vw, 1rem)', style: 'normal', color: 'rgba(255,255,255,0.4)' },
];

export default function FinalPage({ onReplay }) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <FinalPhoto />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6 max-w-3xl">
        {TEXT_SEQUENCE.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: item.delay,
              ease: 'easeOut',
            }}
          >
            <p
              className="leading-relaxed whitespace-pre-line"
              style={{
                fontFamily: i === 0 ? 'var(--font-serif)' : 'var(--font-sans)',
                fontSize: item.size,
                fontStyle: item.style,
                color: item.color,
                fontWeight: i === 0 ? 700 : i === 2 ? 500 : 300,
              }}
            >
              {item.text}
            </p>
          </motion.div>
        ))}

        {/* Divider */}
        <motion.div
          className="w-32 h-px my-4"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 5.5 }}
        />

        {/* Replay button */}
        <motion.button
          className="px-8 py-3 rounded-full text-sm tracking-widest uppercase glass transition-all"
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.2em',
            minHeight: 44,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 6 }}
          whileHover={{
            borderColor: 'rgba(233,30,140,0.4)',
            color: 'rgba(255,255,255,0.9)',
          }}
          onClick={onReplay}
        >
          Replay Everything ↻
        </motion.button>
      </div>

      {/* Bottom credit */}
      <motion.p
        className="absolute bottom-8 text-xs tracking-widest"
        style={{ color: 'rgba(255,255,255,0.15)', letterSpacing: '0.3em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7 }}
      >
        MADE WITH LOVE  ·  2026
      </motion.p>
    </section>
  );
}
