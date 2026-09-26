import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ImageWithFallback({ src, alt, className, style }) {
  const [errored, setErrored] = useState(false);
  return errored ? (
    <div
      className={`img-placeholder ${className}`}
      style={style}
    >
      <span>♥</span>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

export default function Lightbox({ photos, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(null);

  const photo = photos[index];

  const prev = () => {
    setDirection(-1);
    setIndex(i => (i - 1 + photos.length) % photos.length);
  };
  const next = () => {
    setDirection(1);
    setIndex(i => (i + 1) % photos.length);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <motion.div
      className="fixed inset-0 z-[99990] flex items-center justify-center"
      style={{ background: 'rgba(7,5,16,0.95)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl z-10 transition-colors"
        onClick={onClose}
      >
        ×
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/40 text-sm font-mono">
        {index + 1} / {photos.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 text-white/40 hover:text-white text-4xl z-10 transition-colors p-4"
        onClick={(e) => { e.stopPropagation(); prev(); }}
      >
        ‹
      </button>

      {/* Image */}
      <motion.div
        key={index}
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, x: direction * 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -direction * 60 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div
          className="polaroid"
          style={{ maxWidth: '80vw', maxHeight: '75vh' }}
        >
          <ImageWithFallback
            src={photo.src}
            alt={photo.caption}
            className="block object-cover"
            style={{ maxWidth: '75vw', maxHeight: '65vh', width: 'auto', height: 'auto' }}
          />
          <p
            className="mt-2 text-center text-gray-700 text-sm"
            style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1rem' }}
          >
            {photo.caption}
          </p>
        </div>
      </motion.div>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 text-white/40 hover:text-white text-4xl z-10 transition-colors p-4"
        onClick={(e) => { e.stopPropagation(); next(); }}
      >
        ›
      </button>
    </motion.div>
  );
}
