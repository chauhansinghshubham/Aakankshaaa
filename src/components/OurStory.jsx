import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';

function TimelinePhoto({ src, isActive }) {
  const [errored, setErrored] = useState(false);
  return (
    <motion.div
      className="w-full rounded-2xl overflow-hidden mb-4 relative"
      animate={{
        height: isActive ? 360 : 190,
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        border: isActive
          ? '1px solid rgba(233,30,140,0.4)'
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: isActive
          ? '0 10px 40px rgba(233,30,140,0.25)'
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {errored ? (
        <div className="img-placeholder w-full h-full flex items-center justify-center" style={{ fontSize: 36 }}>
          <span>🌸</span>
        </div>
      ) : (
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover object-center"
          loading="lazy"
          onError={() => setErrored(true)}
        />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isActive
            ? 'linear-gradient(to top, rgba(7,5,16,0.3) 0%, transparent 60%)'
            : 'linear-gradient(to top, rgba(7,5,16,0.5) 0%, transparent 50%)',
        }}
      />
    </motion.div>
  );
}

function TimelineCard({ item, index, isActive, onClick }) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Centered Node / Heart Marker */}
      <motion.div
        className="rounded-full flex items-center justify-center cursor-pointer mb-3 select-none"
        style={{
          width: 32,
          height: 32,
          background: isActive
            ? 'linear-gradient(135deg, var(--color-pink), var(--color-purple))'
            : 'rgba(255,255,255,0.06)',
          border: isActive
            ? '2px solid var(--color-pink)'
            : '2px solid rgba(255,255,255,0.2)',
          boxShadow: isActive
            ? '0 0 25px rgba(233,30,140,0.7)'
            : 'none',
        }}
        animate={{ scale: isActive ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
      >
        <span style={{ fontSize: 13 }}>{isActive ? '❤️' : '✦'}</span>
      </motion.div>

      {/* Card container */}
      <motion.div
        className="glass rounded-3xl p-5 sm:p-7 cursor-pointer w-full text-center relative overflow-hidden"
        style={{
          background: isActive
            ? 'linear-gradient(135deg, rgba(233,30,140,0.12) 0%, rgba(124,58,237,0.12) 100%)'
            : 'var(--bg-glass)',
          border: isActive
            ? '1px solid rgba(233,30,140,0.35)'
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: isActive
            ? '0 15px 50px rgba(233,30,140,0.2), 0 0 30px rgba(124,58,237,0.15)'
            : '0 4px 25px rgba(0,0,0,0.3)',
        }}
        layout
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        onClick={onClick}
      >
        {/* Date badge */}
        <p
          className="text-xs tracking-widest uppercase mb-3 inline-block px-3.5 py-1 rounded-full font-medium"
          style={{
            color: 'var(--color-gold)',
            background: 'rgba(201,169,110,0.12)',
            border: '1px solid rgba(201,169,110,0.25)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.12em',
          }}
        >
          {item.date}
        </p>

        {/* Dynamic Expanding Photo */}
        {item.photo && <TimelinePhoto src={item.photo} isActive={isActive} />}

        {/* Title */}
        <h3
          className="text-xl sm:text-2xl font-bold mb-2 leading-tight"
          style={{
            fontFamily: 'var(--font-serif)',
            color: isActive ? '#ffffff' : 'rgba(255,255,255,0.92)',
          }}
        >
          {item.title}
        </h3>

        {/* Description that expands with smooth animation */}
        <AnimatePresence>
          {isActive ? (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4 }}
              className="pt-3 border-t border-white/10"
            >
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                }}
              >
                {item.description}
              </p>
              <p className="text-xs text-pink-400/80 mt-3.5 italic">
                Tap to collapse ✕
              </p>
            </motion.div>
          ) : (
            <p className="text-xs mt-2 text-white/40 flex items-center justify-center gap-1">
              <span>Tap to expand &amp; read story</span>
              <span>↓</span>
            </p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function OurStory() {
  const [activeIndex, setActiveIndex] = useState(null);
  const items = content.timeline;

  const toggle = (i) => setActiveIndex(prev => prev === i ? null : i);

  return (
    <section
      className="relative min-h-screen py-24 px-4 sm:px-6 overflow-hidden flex flex-col items-center"
      style={{ background: 'var(--bg-base)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(233,30,140,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)' }}
            >
              ✦ Chapters ✦
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
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
          <ScrollReveal delay={0.2}>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-muted)' }}>
              Tap any memory to view photo &amp; read the story
            </p>
          </ScrollReveal>
        </div>

        {/* Centered Timeline */}
        <div className="flex flex-col items-center gap-0 w-full">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <TimelineCard
                item={item}
                index={i}
                isActive={activeIndex === i}
                onClick={() => toggle(i)}
              />
              {/* Connector line */}
              {i < items.length - 1 && (
                <div
                  style={{
                    width: 2,
                    height: 48,
                    background: 'linear-gradient(to bottom, rgba(233,30,140,0.6), rgba(124,58,237,0.4))',
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
