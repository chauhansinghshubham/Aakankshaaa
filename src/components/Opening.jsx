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
  const [showModal, setShowModal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
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

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    setSuccessMsg("Pata tha mujhe, bhooli nahi ho tum... ❤️");
    setIntensified(true);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    const str = inputVal.trim().toLowerCase();
    if (!str) {
      setErrorMsg('Please enter our special date 💕');
      return;
    }

    const clean = str.replace(/[^a-z0-9]/g, '');

    // Validate 13 May 2026 across various natural formats
    const isExact =
      clean === '13may2026' ||
      clean === '13thmay2026' ||
      clean === '13may' ||
      clean === '13thmay' ||
      clean === '13052026' ||
      clean === '1352026' ||
      clean === 'may132026' ||
      clean === 'may13th2026' ||
      clean === 'may13';

    const has13 = /13/.test(str);
    const hasMay = /may|(\b|[-/.])0?5(\b|[-/.])/.test(str);

    if (isExact || (has13 && hasMay)) {
      setErrorMsg('');
      handleUnlockSuccess();
    } else {
      setShake(true);
      const nextCount = wrongAttempts + 1;
      setWrongAttempts(nextCount);

      if (nextCount === 1) {
        setErrorMsg('Aise bhool gayi kya? 🥺 Think of a special day in May...');
      } else if (nextCount === 2) {
        setErrorMsg('Arey... we were talking under the tree near Pond');
      } else {
        setErrorMsg('Mujhse he puchlooo...');
      }

      setTimeout(() => setShake(false), 500);
    }
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
              className="text-base sm:text-lg text-center leading-relaxed"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)', maxWidth: 480 }}
            >
              Pichla ek hafta itna ajeeb aur khali laga na...
              <br />
              Koi pressure nahi hai. Bas thoda time nikaal ke yeh dekhna jo maine tumhare liye banaya hai.
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
              onClick={() => {
                setShowModal(true);
                setErrorMsg('');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-12 py-4 rounded-full text-white font-medium text-lg tracking-widest uppercase pulse-glow cursor-pointer"
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

      {/* Romantic Password Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[9990] flex items-center justify-center p-4"
            style={{ background: 'rgba(7, 5, 16, 0.88)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isUnlocked && setShowModal(false)}
          >
            <motion.div
              className="relative rounded-3xl p-7 sm:p-9 max-w-md w-full text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 16, 38, 0.96) 0%, rgba(14, 8, 22, 0.98) 100%)',
                border: '1.5px solid rgba(233, 30, 140, 0.45)',
                boxShadow: '0 25px 70px rgba(0,0,0,0.8), 0 0 50px rgba(233,30,140,0.3)',
              }}
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0], scale: 1, y: 0, opacity: 1 } : { scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {!isUnlocked && (
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full glass transition-colors cursor-pointer"
                >
                  ✕
                </button>
              )}

              {/* Decorative border */}
              <div
                className="absolute inset-3 rounded-2xl pointer-events-none"
                style={{ border: '1px dashed rgba(201, 169, 110, 0.3)' }}
              />

              {/* Emblem */}
              <motion.div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg relative z-10"
                style={{
                  background: isUnlocked
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'linear-gradient(135deg, #e91e8c, #7c3aed)',
                  boxShadow: isUnlocked
                    ? '0 0 30px rgba(16, 185, 129, 0.7)'
                    : '0 0 30px rgba(233, 30, 140, 0.6)',
                }}
                animate={isUnlocked ? { scale: [1, 1.2, 1] } : { scale: [1, 1.06, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-2xl select-none">{isUnlocked ? '🔓' : '🗝️'}</span>
              </motion.div>

              {/* Question Text */}
              <p
                className="text-[11px] uppercase tracking-[0.25em] font-medium mb-1.5"
                style={{ color: 'var(--color-gold)' }}
              >
                ✦ One Special Question ✦
              </p>

              <h2
                className="font-serif italic font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                "Remember, when we met for the first time?"
              </h2>

              <p className="text-xs sm:text-sm text-pink-200/70 font-sans mb-5">
                Yaad hai na woh din? Enter that special date to open ❤️
              </p>

              {/* Form */}
              <form onSubmit={handleVerify} className="flex flex-col items-center gap-3 w-full relative z-10">
                <div className="w-full max-w-xs">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      setErrorMsg('');
                    }}
                    disabled={isUnlocked}
                    placeholder="e.g. 21 April"
                    autoFocus
                    className="w-full px-5 py-3 rounded-full text-center text-white placeholder-pink-300/35 text-sm sm:text-base outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: errorMsg
                        ? '1.5px solid rgba(244, 63, 94, 0.8)'
                        : '1.5px solid rgba(233, 30, 140, 0.45)',
                      boxShadow: errorMsg
                        ? '0 0 20px rgba(244,63,94,0.3)'
                        : '0 0 25px rgba(233, 30, 140, 0.2)',
                    }}
                  />
                </div>

                {/* Feedback */}
                {errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-rose-300 font-sans italic"
                  >
                    {errorMsg}
                  </motion.p>
                )}

                {successMsg && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs sm:text-sm text-emerald-300 font-medium font-sans flex items-center gap-1.5"
                  >
                    <span>✨</span>
                    <span>{successMsg}</span>
                  </motion.p>
                )}

                {/* Submit button */}
                {!isUnlocked && (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="mt-2 px-8 py-3 rounded-full text-white font-medium text-xs sm:text-sm tracking-wider uppercase shadow-lg cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-pink), var(--color-purple))',
                      boxShadow: '0 0 25px rgba(233,30,140,0.5)',
                    }}
                  >
                    Unlock ❤️
                  </motion.button>
                )}

                {/* Romantic Hint */}
                {!isUnlocked && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!showHint) {
                        setShowHint(true);
                      } else {
                        setInputVal('13 May');
                        setErrorMsg('');
                      }
                    }}
                    className="text-xs text-pink-300/70 hover:text-pink-200 mt-2 transition-colors cursor-pointer"
                  >
                    {showHint ? (
                      <span className="text-pink-300 italic">
                        Hint: I think it was in May, Yaad nhi tumhe?? 🥺
                      </span>
                    ) : (
                      'Need a gentle hint? 💭'
                    )}
                  </button>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
