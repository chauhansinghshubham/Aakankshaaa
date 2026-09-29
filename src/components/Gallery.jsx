import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import Lightbox from './Lightbox';
import content from '../config/content';

const ROTATIONS = [-2.5, 2, -1.8, 2.5, -2, 1.8];

function PolaroidCard({ photo, index, onClick }) {
  const [errored, setErrored] = useState(false);
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <motion.div
      className="polaroid cursor-pointer w-full max-w-[270px] select-none"
      style={{
        rotate: rotation,
        transformOrigin: 'center center',
      }}
      initial={{ opacity: 0, y: 35, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        zIndex: 30,
        boxShadow: '0 20px 50px rgba(233,30,140,0.35)',
        transition: { duration: 0.25 },
      }}
      onClick={onClick}
    >
      <div className="w-full aspect-[4/5] overflow-hidden bg-black/20 rounded-sm">
        {errored ? (
          <div
            className="w-full h-full img-placeholder flex items-center justify-center"
            style={{ fontSize: 32 }}
          >
            <span>♥</span>
          </div>
        ) : (
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            loading="lazy"
            onError={() => setErrored(true)}
          />
        )}
      </div>
      <p
        className="text-center mt-3 text-gray-700 leading-tight"
        style={{
          fontFamily: 'var(--font-handwriting)',
          fontSize: '1.05rem',
        }}
      >
        {photo.caption}
      </p>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const photos = content.photos.gallery;

  return (
    <section
      className="relative min-h-screen py-24 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-14 flex flex-col items-center">
          <ScrollReveal>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)' }}
            >
              ✦ Captured ✦
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
              Photographs
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-sm" style={{ color: 'var(--color-muted)' }}>
              Click any photo to see it bigger ↗
            </p>
          </ScrollReveal>
        </div>

        {/* Centered Responsive Grid (Mobile 1 col, Tablet 2 cols, Desktop 3 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 w-full max-w-4xl justify-items-center items-center">
          {photos.map((photo, i) => (
            <PolaroidCard
              key={i}
              photo={photo}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
