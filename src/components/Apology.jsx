import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../config/content';

function TeddyBear({ isOpen }) {
  return (
    <motion.div
      className="relative flex flex-col items-center select-none"
      animate={{ y: isOpen ? 0 : [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width="140"
        height="120"
        viewBox="0 0 140 120"
        className="drop-shadow-lg"
      >
        {/* Left Ear */}
        <circle cx="36" cy="36" r="20" fill="#b38258" />
        <circle cx="36" cy="36" r="12" fill="#f5c2ad" />

        {/* Right Ear */}
        <circle cx="104" cy="36" r="20" fill="#b38258" />
        <circle cx="104" cy="36" r="12" fill="#f5c2ad" />

        {/* Head */}
        <ellipse cx="70" cy="62" rx="46" ry="42" fill="#c49469" />

        {/* Cheeks blush */}
        <ellipse cx="44" cy="74" rx="9" ry="6" fill="#f472b6" opacity="0.45" />
        <ellipse cx="96" cy="74" rx="9" ry="6" fill="#f472b6" opacity="0.45" />

        {/* Snout */}
        <ellipse cx="70" cy="74" rx="18" ry="14" fill="#fae1cf" />

        {/* Nose */}
        <ellipse cx="70" cy="68" rx="6.5" ry="4.5" fill="#3b2314" />
        {/* Mouth */}
        <path
          d="M 64 74 Q 70 79 76 74"
          stroke="#3b2314"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Eyes (innocent, apologetic sparkle) */}
        <circle cx="52" cy="58" r="5" fill="#2b170c" />
        <circle cx="50" cy="56" r="1.8" fill="#ffffff" />
        <circle cx="88" cy="58" r="5" fill="#2b170c" />
        <circle cx="86" cy="56" r="1.8" fill="#ffffff" />

        {/* Eyebrows (gentle, apologetic tilt) */}
        <path d="M 46 50 Q 53 47 58 51" stroke="#875836" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 94 50 Q 87 47 82 51" stroke="#875836" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

function TeddyPaws() {
  return (
    <div className="absolute -bottom-4 inset-x-0 flex justify-between px-10 pointer-events-none z-30">
      {/* Left Paw */}
      <div className="w-10 h-10 rounded-full bg-[#b38258] border-2 border-[#8f5e38] shadow-md flex items-center justify-center">
        <div className="w-4 h-3 bg-[#f5c2ad] rounded-full" />
      </div>
      {/* Right Paw */}
      <div className="w-10 h-10 rounded-full bg-[#b38258] border-2 border-[#8f5e38] shadow-md flex items-center justify-center">
        <div className="w-4 h-3 bg-[#f5c2ad] rounded-full" />
      </div>
    </div>
  );
}

export default function Apology() {
  const [isOpen, setIsOpen] = useState(false);
  const lines = content.apologyLines;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Soft background ambient light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(233,30,140,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto w-full flex flex-col items-center">
        {/* The Teddy Bear Header */}
        <div className="mb-2 z-10 flex flex-col items-center">
          <TeddyBear isOpen={isOpen} />
          {!isOpen && (
            <motion.p
              className="text-xs tracking-widest text-pink-300/80 font-sans uppercase mt-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              He brought something for you 🧸
            </motion.p>
          )}
        </div>

        {/* The Greeting Card */}
        <div className="relative w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED GREETING CARD */
              <motion.div
                key="closed"
                className="relative rounded-3xl p-8 sm:p-10 cursor-pointer overflow-hidden text-center select-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 20, 45, 0.9) 0%, rgba(18, 12, 30, 0.95) 100%)',
                  border: '2px solid rgba(233, 30, 140, 0.35)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(233,30,140,0.2)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, rotateX: -20 }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
              >
                {/* Decorative stitches */}
                <div
                  className="absolute inset-3 rounded-2xl pointer-events-none"
                  style={{ border: '1px dashed rgba(201, 169, 110, 0.35)' }}
                />

                {/* Wax Seal / Heart Button */}
                <motion.div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
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

                <p className="text-xs sm:text-sm text-white/60 font-sans mt-3">
                  Tap to open card ✉️
                </p>

                <TeddyPaws />
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

                <TeddyPaws />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
