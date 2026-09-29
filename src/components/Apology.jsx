import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../config/content';
import teddyImg from '../assets/teddy_bear.jpg';

function TeddyBear({ isOpen }) {
  return (
    <motion.div
      className="relative flex flex-col items-center select-none"
      animate={{ y: isOpen ? 0 : [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Soft warm glow behind teddy */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(233, 30, 140, 0.2) 0%, rgba(201, 169, 110, 0.12) 45%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
        }}
      />
      <img
        src={teddyImg}
        alt="Adorable realistic teddy bear holding note"
        className="w-72 sm:w-84 h-auto object-contain relative z-10"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, black 54%, rgba(0,0,0,0.85) 68%, transparent 84%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 54%, rgba(0,0,0,0.85) 68%, transparent 84%)',
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.85))',
        }}
      />
    </motion.div>
  );
}

export default function Apology() {
  const [isOpen, setIsOpen] = useState(false);
  const lines = content.apologyLines;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Soft background ambient light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(233,30,140,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto w-full flex flex-col items-center">
        {/* Cute Hint Header */}
        {!isOpen && (
          <motion.div
            className="mb-2 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs sm:text-sm tracking-[0.25em] text-pink-300 font-sans uppercase font-medium drop-shadow">
              He brought something for you 🧸
            </p>
          </motion.div>
        )}

        {/* Teddy Bear & Card Composition Container */}
        <div className="relative w-full max-w-lg mx-auto flex flex-col items-center">
          {/* The Teddy Bear */}
          <div className="relative z-0 -mb-24 sm:-mb-32">
            <TeddyBear isOpen={isOpen} />
          </div>

          {/* The Greeting Card */}
          <div className="relative z-10 w-full max-w-md px-3 sm:px-0">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                /* CLOSED GREETING CARD - Tilted at angle as if held with pop-out spring */
                <motion.div
                  key="closed"
                  className="relative rounded-3xl p-8 sm:p-10 cursor-pointer overflow-hidden text-center select-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(32, 20, 48, 0.95) 0%, rgba(18, 12, 30, 0.98) 100%)',
                    border: '2px solid rgba(233, 30, 140, 0.55)',
                    boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.85), 0 0 45px rgba(233, 30, 140, 0.35)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                  initial={{ opacity: 0, scale: 0.65, y: 55, rotate: 0 }}
                  whileInView={{
                    opacity: 1,
                    scale: [0.65, 1.08, 0.97, 1],
                    y: [55, -12, 3, 0],
                    rotate: [-1, -9, -6, -7],
                  }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{
                    duration: 0.85,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
                  whileHover={{
                    scale: 1.04,
                    rotate: -4,
                    boxShadow: '0 30px 70px rgba(0,0,0,0.9), 0 0 60px rgba(233,30,140,0.6)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsOpen(true)}
                >
                  {/* Decorative stitches */}
                  <div
                    className="absolute inset-3 rounded-2xl pointer-events-none"
                    style={{ border: '1px dashed rgba(201, 169, 110, 0.4)' }}
                  />

                  {/* Wax Seal / Heart Button with animated ping aura */}
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div
                      className="absolute inset-0 rounded-full bg-pink-500/40 animate-ping pointer-events-none"
                      style={{ animationDuration: '2.5s' }}
                    />
                    <motion.div
                      className="relative w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                        border: '2px solid rgba(255,255,255,0.4)',
                        boxShadow: '0 0 25px rgba(233, 30, 140, 0.6)',
                      }}
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-2xl">💌</span>
                    </motion.div>
                  </div>

                  <p
                    className="text-xs uppercase tracking-[0.3em] font-medium mb-2"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    ✦ A Note For You ✦
                  </p>

                  <h3
                    className="font-serif italic font-bold text-2xl sm:text-3xl text-white mb-2"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    "I Know Things Haven't Been Okay..."
                  </h3>

                  {/* Glowing Open Button Callout */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full mt-4 text-xs sm:text-sm font-semibold text-white tracking-wide shadow-lg cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, rgba(233,30,140,0.9) 0%, rgba(124,58,237,0.9) 100%)',
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}
                    animate={{
                      scale: [1, 1.04, 1],
                      boxShadow: [
                        '0 0 15px rgba(233,30,140,0.4)',
                        '0 0 30px rgba(233,30,140,0.75)',
                        '0 0 15px rgba(233,30,140,0.4)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span>✉️</span>
                    <span>Tap to Open Note</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      ➔
                    </motion.span>
                  </motion.div>
                </motion.div>
            ) : (
              /* OPENED GREETING CARD */
              <motion.div
                key="open"
                className="relative rounded-3xl p-7 sm:p-9 text-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 17, 40, 0.95) 0%, rgba(14, 9, 24, 0.98) 100%)',
                  border: '2px solid rgba(233, 30, 140, 0.4)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 50px rgba(233,30,140,0.25)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                }}
                initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Decorative border */}
                <div
                  className="absolute inset-3 rounded-2xl pointer-events-none"
                  style={{ border: '1px solid rgba(201, 169, 110, 0.25)' }}
                />

                {/* Close badge */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full glass text-white/50 hover:text-white transition-all cursor-pointer z-20"
                  style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  Fold Card ✕
                </button>

                {/* Card Header */}
                <div className="mb-6 pt-2">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] font-medium mb-1"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    ✦ Sincere &amp; Honest ✦
                  </p>
                  <h2
                    className="font-serif italic font-bold text-2xl sm:text-3xl text-white"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    I Know Things Haven't
                    <br />
                    <span style={{ color: 'var(--color-pink-light)' }}>Been Okay.</span>
                  </h2>
                </div>

                {/* Apology Lines */}
                <div className="space-y-4 my-6 text-sm sm:text-base leading-relaxed font-sans">
                  {lines.map((line, i) => {
                    const isHighlight = i === 3 || i === 4 || i === 5 || i === 6;
                    return (
                      <motion.p
                        key={i}
                        className={isHighlight ? 'font-normal' : 'font-light'}
                        style={{
                          color: isHighlight
                            ? 'rgba(255, 255, 255, 0.96)'
                            : 'rgba(255, 255, 255, 0.65)',
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                      >
                        {line}
                      </motion.p>
                    );
                  })}
                </div>

                {/* Subtle Divider & Sign-off */}
                <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-1">
                  <p className="text-xs text-white/40 italic font-sans">
                    That's it. That's all I wanted to say.
                  </p>
                  <p className="text-xs font-serif italic text-pink-200 mt-1">
                    — Shubham
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  );
}
