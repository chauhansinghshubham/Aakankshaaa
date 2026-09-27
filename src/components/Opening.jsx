import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleSystem from './ParticleSystem';
import content from '../config/content';

const HEADING = `Hey ${content.name}...`;

export default function Opening({ onEnter }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [intensified, setIntensified] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1;
        setDisplayedText(HEADING.slice(0, indexRef.current));
        if (indexRef.current >= HEADING.length) {
          clearInterval(interval);
          setTimeout(() => setShowSubtitle(true), 400);
          setTimeout(() => setShowButton(true), 1000);
        }
      }, 60);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(delay);
  }, []);

  const handleEnter = () => {
    setIntensified(true);
    setTimeout(onEnter, 600);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden w-full h-full min-h-[100dvh]"
      style={{ background: 'var(--bg-base)' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <ParticleSystem intensified={intensified} />

      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: '50%',
            left: '50%',
            transform: 'translate(-60%, -60%)',
            background: 'radial-gradient(circle, rgba(233,30,140,0.08) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: '10%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 flex flex-col items-center gap-6 sm:gap-8 max-w-2xl w-full">
        {/* Heading */}
        <div className="w-full">
          <h1
            className="font-serif font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 8vw, 4.5rem)',
              background: 'linear-gradient(135deg, #fff 0%, var(--color-pink-light) 50%, var(--color-gold) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              minHeight: '1.2em',
              wordBreak: 'break-word',
            }}
          >
            {displayedText}
            {displayedText.length < HEADING.length && (
              <span
                style={{
                  display: 'inline-block',
                  width: 3,
                  height: '0.8em',
                  background: 'var(--color-pink)',
                  marginLeft: 4,
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            )}
          </h1>
        </div>

        {/* Subtitle */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg md:text-xl text-center leading-relaxed"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)', maxWidth: 480 }}
            >
              No pressure. No expectations.
              <br />
              Just a few things I wanted you to see.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Divider */}
        {showButton && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-px"
            style={{ background: 'var(--gradient-primary)' }}
          />
        )}

        {/* Enter Button */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={handleEnter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-12 py-4 rounded-full text-white font-medium text-lg tracking-widest uppercase pulse-glow"
              style={{
                fontFamily: 'var(--font-sans)',
                background: 'linear-gradient(135deg, var(--color-pink), var(--color-purple))',
                letterSpacing: '0.2em',
                fontSize: '0.9rem',
                minHeight: 44,
              }}
            >
              Open ❤️
            </motion.button>
          )}
        </AnimatePresence>

        {/* Small hint */}
        {showButton && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xs tracking-widest uppercase"
            style={{ color: 'var(--color-muted)', letterSpacing: '0.3em' }}
          >
            Made with love
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
