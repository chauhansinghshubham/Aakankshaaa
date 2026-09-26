import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import Lightbox from './Lightbox';
import content from '../config/content';

const SIZES = ['small', 'medium', 'large'];
const SIZE_DIMS = {
  small: { width: 160, height: 180 },
  medium: { width: 200, height: 220 },
  large: { width: 240, height: 260 },
};

function PolaroidCard({ photo, index, onClick }) {
  const [errored, setErrored] = useState(false);
  const rotation = useMemo(() => (Math.random() - 0.5) * 12, []);
  const size = SIZES[index % 3];
  const dims = SIZE_DIMS[size];

  return (
    <motion.div
      className="polaroid cursor-pointer flex-shrink-0"
      style={{
        width: dims.width,
        rotate: rotation,
        transformOrigin: 'center center',
        userSelect: 'none',
      }}
      initial={{ opacity: 0, y: 40, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 20,
        boxShadow: '0 20px 60px rgba(233,30,140,0.3)',
        transition: { duration: 0.25 },
      }}
      onClick={onClick}
    >
      <div
        style={{
          width: '100%',
          height: dims.height,
          overflow: 'hidden',
        }}
      >
        {errored ? (
          <div
            className="w-full h-full img-placeholder"
            style={{ fontSize: 32 }}
          >
            <span>♥</span>
          </div>
        ) : (
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setErrored(true)}
          />
        )}
      </div>
      <p
        className="text-center mt-1 text-gray-600 leading-tight"
        style={{
          fontFamily: 'var(--font-handwriting)',
          fontSize: '0.85rem',
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
      className="relative min-h-screen py-24 px-4 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.04) 0%, transparent 60%)',
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

        {/* Desktop: scattered layout */}
        <div className="hidden md:flex flex-wrap justify-center gap-6">
          {photos.map((photo, i) => (
            <PolaroidCard
              key={i}
              photo={photo}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>

        {/* Mobile: single column */}
        <div className="flex md:hidden flex-col items-center gap-8">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className="polaroid cursor-pointer"
              style={{ width: '80vw', maxWidth: 280 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setLightboxIndex(i)}
            >
              <MobilePhoto photo={photo} />
            </motion.div>
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

function MobilePhoto({ photo }) {
  const [errored, setErrored] = useState(false);
  return (
    <>
      <div style={{ height: 220, overflow: 'hidden' }}>
        {errored ? (
          <div className="img-placeholder w-full h-full" style={{ fontSize: 32 }}>♥</div>
        ) : (
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setErrored(true)}
          />
        )}
      </div>
      <p
        className="text-center mt-2 text-gray-600"
        style={{ fontFamily: 'var(--font-handwriting)', fontSize: '0.9rem' }}
      >
        {photo.caption}
      </p>
    </>
  );
}
