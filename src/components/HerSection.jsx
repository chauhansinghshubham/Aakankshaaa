import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';

const TAGS = [
  { text: 'Cute — unfortunately', emoji: '🌸', color: 'rgba(233,30,140,0.15)' },
  { text: 'Professional Overthinker', emoji: '🌀', color: 'rgba(124,58,237,0.15)' },
  { text: 'CEO of Random Mood Swings', emoji: '🎭', color: 'rgba(201,169,110,0.12)' },
  { text: 'Food Department Head', emoji: '🍜', color: 'rgba(233,30,140,0.12)' },
  { text: 'Too Pretty To Stay Mad', emoji: '✨', color: 'rgba(124,58,237,0.12)' },
  { text: 'Main Character Energy', emoji: '👑', color: 'rgba(201,169,110,0.15)' },
];

function ProfilePhoto() {
  const [errored, setErrored] = useState(false);
  return (
    <div
      className="relative w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden"
      style={{
        border: '2px solid rgba(233,30,140,0.3)',
        boxShadow: '0 0 60px rgba(233,30,140,0.2), 0 0 120px rgba(124,58,237,0.1)',
      }}
    >
      {errored ? (
        <div className="img-placeholder w-full h-full flex flex-col gap-2">
          <span style={{ fontSize: 48 }}>🌸</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Her photo here</span>
        </div>
      ) : (
        <img
          src={content.photos.profile}
          alt={content.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setErrored(true)}
        />
      )}
      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(7,5,16,0.4) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}

function FloatingTag({ tag, index }) {
  return (
    <motion.div
      className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2 whitespace-nowrap"
      style={{
        background: tag.color,
        border: '1px solid rgba(255,255,255,0.08)',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.85)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <span>{tag.emoji}</span>
      <span>{tag.text}</span>
    </motion.div>
  );
}

export default function HerSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(233,30,140,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Section title */}
      <ScrollReveal>
        <p
          className="text-xs tracking-[0.4em] uppercase mb-4 text-center"
          style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)' }}
        >
          ✦ Presenting ✦
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2
          className="text-4xl md:text-7xl font-black text-center leading-none mb-4"
          style={{
            fontFamily: 'var(--font-serif)',
            background: 'linear-gradient(135deg, #fff 0%, var(--color-pink-light) 40%, var(--color-gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          THE {content.name.toUpperCase()}
          <br />
          <span style={{ fontStyle: 'italic', fontSize: '0.75em' }}>EDITION</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p
          className="text-base md:text-lg text-center mb-16"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)', maxWidth: 420 }}
        >
          20 Years of Chaos, Cuteness &amp; Main-Character Energy ✨
        </p>
      </ScrollReveal>

      {/* Central card + floating tags */}
      <div className="relative flex flex-col items-center">
        {/* Tags above */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-lg">
          {TAGS.slice(0, 3).map((tag, i) => (
            <FloatingTag key={tag.text} tag={tag} index={i} />
          ))}
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="relative"
        >
          <ProfilePhoto />
          {/* Name badge */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-2 whitespace-nowrap"
            style={{
              border: '1px solid rgba(233,30,140,0.3)',
              boxShadow: '0 4px 20px rgba(233,30,140,0.2)',
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <span
              className="font-serif text-lg"
              style={{
                fontFamily: 'var(--font-serif)',
                background: 'linear-gradient(90deg, var(--color-pink), var(--color-gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {content.name} ❤️
            </span>
          </motion.div>
        </motion.div>

        {/* Tags below */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-lg">
          {TAGS.slice(3).map((tag, i) => (
            <FloatingTag key={tag.text} tag={tag} index={i + 3} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="mt-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-pink-500/40" />
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-muted)', letterSpacing: '0.3em' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
