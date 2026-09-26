import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';

const ROTATIONS = [-6, 4, -3, 7, -5, 2];
const NOTE_COLORS = [
  '#fef3c7', // yellow
  '#fce7f3', // pink
  '#e0e7ff', // indigo
  '#dcfce7', // green
  '#fef3c7',
  '#fce7f3',
];

function MemoryPhoto({ photo, index, onClick, isActive }) {
  const [errored, setErrored] = useState(false);
  const rot = ROTATIONS[index % ROTATIONS.length];

  return (
    <motion.div
      className="absolute cursor-pointer polaroid"
      style={{
        rotate: rot,
        width: 200,
        left: `${(index % 3) * 30 + 5}%`,
        top: `${Math.floor(index / 3) * 55 + 5}%`,
        zIndex: isActive ? 30 : 10 + index,
        transformOrigin: 'center bottom',
      }}
      onClick={() => onClick(index)}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 25,
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        transition: { duration: 0.25 },
      }}
      animate={isActive ? {
        scale: 1.15,
        rotate: 0,
        zIndex: 30,
        boxShadow: '0 30px 80px rgba(233,30,140,0.3)',
      } : {
        scale: 1,
        rotate: rot,
        zIndex: 10 + index,
      }}
    >
      <div style={{ height: 150, overflow: 'hidden' }}>
        {errored ? (
          <div className="img-placeholder w-full h-full" style={{ fontSize: 28 }}>♥</div>
        ) : (
          <img
            src={photo.src}
            alt={photo.label}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setErrored(true)}
          />
        )}
      </div>
      <p
        className="text-center mt-1 text-gray-700 text-sm"
        style={{ fontFamily: 'var(--font-handwriting)' }}
      >
        {photo.label}
      </p>
    </motion.div>
  );
}

function StickyNote({ photo, noteColor, onClose }) {
  return (
    <motion.div
      className="absolute z-50 rounded-lg p-4 shadow-2xl"
      style={{
        background: noteColor,
        width: 220,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#1a1a1a',
        fontFamily: 'var(--font-handwriting)',
        fontSize: '1rem',
        rotate: -2,
        boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <button
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
        onClick={onClose}
      >
        ×
      </button>
      <p className="mt-3 leading-relaxed">{photo.label}</p>
      <p className="mt-2 text-xs text-gray-500">— tap to close</p>
    </motion.div>
  );
}

export default function FourMonths() {
  const [activeIndex, setActiveIndex] = useState(null);
  const memories = content.photos.memories;

  const handleClick = (i) => {
    setActiveIndex(prev => prev === i ? null : i);
  };

  return (
    <section
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0712 0%, #070510 50%, #080614 100%)',
      }}
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
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
              4 Months of Us ❤️
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-sm" style={{ color: 'var(--color-muted)' }}>
              Click a memory to read its story
            </p>
          </ScrollReveal>
        </div>

        {/* Scrapbook — desktop */}
        <div className="hidden md:block relative" style={{ height: 600 }}>
          {memories.map((photo, i) => (
            <MemoryPhoto
              key={i}
              photo={photo}
              index={i}
              isActive={activeIndex === i}
              onClick={handleClick}
            />
          ))}

          <AnimatePresence>
            {activeIndex !== null && (
              <StickyNote
                photo={memories[activeIndex]}
                noteColor={NOTE_COLORS[activeIndex % NOTE_COLORS.length]}
                onClose={() => setActiveIndex(null)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Mobile — simple grid */}
        <div className="flex md:hidden flex-col gap-8 items-center">
          {memories.map((photo, i) => (
            <MobileMemoryCard key={i} photo={photo} noteColor={NOTE_COLORS[i % NOTE_COLORS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileMemoryCard({ photo, noteColor }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="polaroid w-72">
      <div style={{ height: 200, overflow: 'hidden' }}>
        {errored ? (
          <div className="img-placeholder w-full h-full" style={{ fontSize: 32 }}>♥</div>
        ) : (
          <img
            src={photo.src}
            alt={photo.label}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setErrored(true)}
          />
        )}
      </div>
      <p
        className="text-center mt-2 text-gray-700"
        style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1rem' }}
      >
        {photo.label}
      </p>
    </div>
  );
}
