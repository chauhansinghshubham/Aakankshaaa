import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';

function TimelinePhoto({ src }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="w-full h-32 rounded-xl overflow-hidden mb-3">
      {errored ? (
        <div className="img-placeholder w-full h-full" style={{ fontSize: 28 }}>♥</div>
      ) : (
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

function TimelineCard({ item, index, isActive, onClick }) {
  const colors = [
    'rgba(233,30,140,0.15)',
    'rgba(124,58,237,0.15)',
    'rgba(201,169,110,0.12)',
    'rgba(233,30,140,0.12)',
    'rgba(124,58,237,0.12)',
  ];

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onClick}
    >
      {/* Node dot */}
      <motion.div
        className="w-5 h-5 rounded-full border-2 mx-auto mb-4 z-10 relative"
        style={{
          borderColor: isActive ? 'var(--color-pink)' : 'rgba(255,255,255,0.2)',
          background: isActive
            ? 'var(--color-pink)'
            : 'rgba(255,255,255,0.05)',
          boxShadow: isActive ? '0 0 20px rgba(233,30,140,0.6)' : 'none',
        }}
        animate={{ scale: isActive ? 1.2 : 1 }}
      />

      {/* Card */}
      <motion.div
        className="glass rounded-2xl p-5"
        style={{
          background: isActive ? colors[index] : 'var(--bg-glass)',
          border: isActive ? '1px solid rgba(233,30,140,0.3)' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: isActive ? '0 8px 40px rgba(233,30,140,0.15)' : '0 4px 20px rgba(0,0,0,0.2)',
          minWidth: 200,
        }}
        animate={{ scale: isActive ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <p
          className="text-xs mb-2"
          style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}
        >
          {item.date}
        </p>

        {item.photo && <TimelinePhoto src={item.photo} />}

        <h3
          className="text-lg font-bold mb-2"
          style={{
            fontFamily: 'var(--font-serif)',
            color: isActive ? 'white' : 'rgba(255,255,255,0.85)',
          }}
        >
          {item.title}
        </h3>

        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
            >
              {item.description}
            </motion.p>
          )}
        </AnimatePresence>

        {!isActive && (
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
            Tap to read ↓
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function OurStory() {
  const [activeIndex, setActiveIndex] = useState(null);
  const items = content.timeline;

  const toggle = (i) => setActiveIndex(prev => prev === i ? null : i);

  return (
    <section
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(233,30,140,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2
              className="text-4xl md:text-6xl font-serif font-bold"
              style={{
                fontFamily: 'var(--font-serif)',
                background: 'linear-gradient(135deg, #fff 0%, var(--color-pink-light) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Little Story ❤️
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-sm" style={{ color: 'var(--color-muted)' }}>
              Tap a memory to read it
            </p>
          </ScrollReveal>
        </div>

        {/* Vertical timeline (all screens) */}
        <div className="flex flex-col gap-0 max-w-xl mx-auto">
          {items.map((item, i) => (
            <div key={i} className="relative">
              <TimelineCard
                item={item}
                index={i}
                isActive={activeIndex === i}
                onClick={() => toggle(i)}
              />
              {/* Connector line */}
              {i < items.length - 1 && (
                <div
                  className="w-0.5 mx-auto"
                  style={{
                    height: 40,
                    background: 'linear-gradient(to bottom, rgba(233,30,140,0.4), rgba(124,58,237,0.4))',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
