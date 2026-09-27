import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';

const ICONS = ['🌸', '🎵', '⚡', '💌', '✨', '🎭', '🌙', '🔥', '🌺', '🌀', '❤️', '🎈', '🌟', '😊', '💫'];
const GRADIENTS = [
  'linear-gradient(135deg, rgba(233,30,140,0.3) 0%, rgba(124,58,237,0.3) 100%)',
  'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(201,169,110,0.2) 100%)',
  'linear-gradient(135deg, rgba(201,169,110,0.2) 0%, rgba(233,30,140,0.3) 100%)',
  'linear-gradient(135deg, rgba(233,30,140,0.2) 0%, rgba(124,58,237,0.4) 100%)',
  'linear-gradient(135deg, rgba(124,58,237,0.4) 0%, rgba(233,30,140,0.2) 100%)',
];

function FlipCard({ item, index, isLast }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className={`cursor-pointer ${
        isLast
          ? 'col-span-2 md:col-span-1 w-full max-w-[calc(50%-0.5rem)] md:max-w-none mx-auto justify-self-center'
          : ''
      }`}
      style={{ perspective: 1000, height: 180 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.08 }}
      whileHover={{ y: -4 }}
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div
          className="flip-card-front flex flex-col items-center justify-center gap-3 p-4"
          style={{
            background: GRADIENTS[index % GRADIENTS.length],
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span style={{ fontSize: 36 }}>{ICONS[index % ICONS.length]}</span>
          <h3
            className="text-center font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'white',
              fontSize: '1rem',
            }}
          >
            {item.title}
          </h3>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Click to flip ↗
          </p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back flex items-center justify-center p-5"
          style={{
            background: 'rgba(7,5,16,0.95)',
            border: '1px solid rgba(233,30,140,0.2)',
            boxShadow: 'inset 0 0 40px rgba(233,30,140,0.05)',
          }}
        >
          <p
            className="text-center leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
            }}
          >
            {item.message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LoveThings() {
  const things = content.loveThings;

  return (
    <section
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)' }}
            >
              ✦ The List ✦
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-3xl md:text-5xl font-serif font-bold"
              style={{
                fontFamily: 'var(--font-serif)',
                background: 'linear-gradient(135deg, #fff 0%, var(--color-pink-light) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Things About You That I<br />
              <span style={{ fontStyle: 'italic' }}>Somehow Fell For</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-sm" style={{ color: 'var(--color-muted)' }}>
              Click each card to read the message inside
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {things.map((item, i) => (
            <FlipCard
              key={i}
              item={item}
              index={i}
              isLast={i === things.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
