import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';
import flowerImg from '../assets/flowers.jpg';

function createConfetti() {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#e91e8c', '#c9a96e', '#7c3aed', '#ff6bb5', '#a78bfa', '#fbbf24'][i % 6],
    size: Math.random() * 10 + 6,
    delay: Math.random() * 0.5,
    duration: Math.random() * 2 + 2,
    rotate: Math.random() * 720 - 360,
  }));
}

function createSparkles() {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    delay: Math.random() * 1,
    size: Math.random() * 16 + 8,
  }));
}

function ConfettiShower({ active }) {
  const pieces = createConfetti();
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9970] overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: -20,
            background: p.color,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: '110vh',
            rotate: p.rotate,
            opacity: [1, 1, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}

function SparkleShower({ active }) {
  const sparkles = createSparkles();
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: s.size,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: 360 }}
          transition={{
            duration: 1.5,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
}

export default function Surprise() {
  const [hearts, setHearts] = useState(false);
  const [shook, setShook] = useState(false);
  const [surpriseText, setSurpriseText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [sparkles, setSparkles] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [isPassClaimed, setIsPassClaimed] = useState(false);

  const handleHearts = () => {
    setHearts(true);
    setShowPassModal(true);
    setTimeout(() => setHearts(false), 4000);
  };

  const handleShake = () => {
    setShook(true);
    setTimeout(() => {
      setShook(false);
      setShowSocialModal(true);
    }, 300);
  };

  const handleReveal = () => {
    setRevealed(true);
    setSparkles(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setRevealed(false);
        setShowSocialModal(false);
        setShowPassModal(false);
      }
    };
    if (revealed || showSocialModal || showPassModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [revealed, showSocialModal, showPassModal]);

  const BUTTONS = [
    {
      label: '💌 Open this',
      desc: 'A gift awaits...',
      bg: 'linear-gradient(135deg, var(--color-pink), #ff6bb5)',
      action: handleHearts,
    },
    {
      label: '🚫 Definitely don\'t click',
      desc: 'Seriously. Don\'t.',
      bg: 'linear-gradient(135deg, #374151, #1f2937)',
      action: handleShake,
    },
    {
      label: '✨ Okay fine, click this',
      desc: 'The last surprise',
      bg: 'linear-gradient(135deg, var(--color-gold), #e6b842)',
      action: handleReveal,
    },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(233,30,140,0.04) 0%, transparent 60%)',
        }}
      />

      <ConfettiShower active={hearts} />

      <div className="relative z-10 max-w-2xl mx-auto w-full text-center">
        <ScrollReveal>
          <h2
            className="text-4xl md:text-6xl font-serif font-bold mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              background: 'linear-gradient(135deg, #fff 0%, var(--color-pink-light) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            One Last Thing...
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mb-6 text-sm" style={{ color: 'var(--color-muted)' }}>
            Three buttons. Open one by one ✨
          </p>
        </ScrollReveal>

        {/* Buttons with generous breathing room */}
        <div className="flex flex-col md:flex-row gap-5 sm:gap-6 justify-center items-center mt-10 sm:mt-12 mb-16 sm:mb-20">
          {BUTTONS.map((btn, i) => (
            <motion.button
              key={i}
              className={`relative px-6 py-4 rounded-2xl text-white font-medium min-w-[200px] min-h-[85px] flex flex-col items-center justify-center gap-1 ${shook && i === 1 ? 'shake' : ''}`}
              style={{
                background: btn.bg,
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                fontFamily: 'var(--font-sans)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={btn.action}
            >
              <span className="text-lg">{btn.label}</span>
              <span className="text-xs opacity-60">{btn.desc}</span>
            </motion.button>
          ))}
        </div>

        {/* Surprise text from shake */}
        <AnimatePresence>
          {surpriseText && (
            <motion.p
              key="surprise"
              className="text-lg mb-4"
              style={{ color: 'var(--color-pink)', fontFamily: 'var(--font-sans)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {surpriseText}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Subtle, discreet note placed thoughtfully below with ample breathing room */}
        <div className="mt-16 sm:mt-24 pt-4 flex flex-col items-center justify-center w-full px-4 select-none">
          <div className="w-1.5 h-1.5 rounded-full bg-white/15 mb-3" />
          <motion.p
            className="text-xs sm:text-sm font-sans text-center max-w-xs sm:max-w-md mx-auto"
            style={{
              color: 'rgba(255, 255, 255, 0.24)',
              letterSpacing: '0.025em',
              lineHeight: 1.65,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Don't think that this whole thing is made with AI, it required some serious skills to make all this
          </motion.p>
        </div>

        {/* Aesthetic Centered Popup Modal */}
        <AnimatePresence>
          {revealed && (
            <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              {/* Blurred Dark Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setRevealed(false)}
              />

              {/* Sparkle Shower inside modal */}
              {sparkles && <SparkleShower active />}

              {/* Angled Polaroid Keepsake Card */}
              <motion.div
                className="relative z-10 cursor-default select-none max-w-[310px] sm:max-w-[360px] w-full"
                initial={{ opacity: 0, scale: 0.7, rotate: -8, y: 30 }}
                animate={{ opacity: 1, scale: 1, rotate: -3.5, y: 0 }}
                exit={{ opacity: 0, scale: 0.75, rotate: -8, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 280 }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Frosted Gold Washi Tape at Top */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-6 sm:h-7 z-30 pointer-events-none"
                  style={{
                    background: 'rgba(254, 240, 138, 0.65)',
                    backdropFilter: 'blur(4px)',
                    border: '1px dashed rgba(201, 169, 110, 0.7)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    transform: 'translateX(-50%) rotate(2deg)',
                  }}
                />

                {/* Close Button */}
                <button
                  onClick={() => setRevealed(false)}
                  className="absolute -top-3 -right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-900/90 hover:bg-stone-900 text-white/90 hover:text-white border border-white/20 shadow-2xl flex items-center justify-center text-sm font-bold transition-all hover:scale-110 cursor-pointer"
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                  }}
                  title="Close"
                >
                  ✕
                </button>

                {/* Physical Polaroid Body */}
                <div
                  className="bg-[#fcfaf7] p-3.5 sm:p-5 pb-5 sm:pb-6 rounded-2xl"
                  style={{
                    boxShadow:
                      '0 35px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(233, 30, 140, 0.3), 0 0 0 1px rgba(255,255,255,0.4)',
                  }}
                >
                  {/* Photo Frame */}
                  <div className="rounded-xl overflow-hidden aspect-[3/4] bg-stone-900 shadow-inner relative">
                    <img
                      src={flowerImg}
                      alt="Kuch yaad aaya"
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 25px rgba(0,0,0,0.2)',
                      }}
                    />
                  </div>

                  {/* Nostalgic Handwritten Style Caption */}
                  <div className="mt-4 sm:mt-5 text-center px-2">
                    <p
                      className="text-2xl sm:text-3xl font-bold tracking-wide select-none"
                      style={{
                        fontFamily: 'Dancing Script, cursive, var(--font-serif)',
                        color: '#2a1a2e',
                        textShadow: '0 1px 2px rgba(0,0,0,0.08)',
                      }}
                    >
                      "Kuch yaad aaya...!!" 🌸
                    </p>
                    <p
                      className="text-[10px] sm:text-[11px] tracking-widest uppercase mt-1.5"
                      style={{
                        color: '#9e738e',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      ✦ Tap outside to close ✦
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Social Modal for 'Definitely don't click' */}
        <AnimatePresence>
          {showSocialModal && (
            <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSocialModal(false)}
              />

              <motion.div
                className="relative z-10 rounded-3xl p-7 sm:p-9 max-w-md w-full text-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(28, 17, 42, 0.96) 0%, rgba(15, 9, 24, 0.98) 100%)',
                  border: '1.5px solid rgba(233, 30, 140, 0.45)',
                  boxShadow: '0 25px 70px rgba(0,0,0,0.85), 0 0 50px rgba(233,30,140,0.3)',
                }}
                initial={{ scale: 0.85, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.85, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowSocialModal(false)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full glass transition-colors cursor-pointer z-20"
                >
                  ✕
                </button>

                {/* Decorative border */}
                <div
                  className="absolute inset-3 rounded-2xl pointer-events-none"
                  style={{ border: '1px dashed rgba(201, 169, 110, 0.3)' }}
                />

                {/* Playful Emoji Header */}
                <motion.div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, #e91e8c, #7c3aed)',
                    boxShadow: '0 0 25px rgba(233, 30, 140, 0.5)',
                  }}
                  animate={{ rotate: [-6, 6, -6], scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-3xl select-none">🙈</span>
                </motion.div>

                {/* Tag */}
                <p
                  className="text-[11px] uppercase tracking-[0.25em] font-medium mb-2.5"
                  style={{ color: 'var(--color-gold)' }}
                >
                  ✦ Caught You! ✦
                </p>

                {/* The Romantic Message */}
                <p
                  className="text-base sm:text-lg font-serif italic text-white/95 leading-relaxed mb-6 px-2"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  "Maine toh pehle he kaha tha don't click, Khair ab tumne open kr he liya tohhh why don't we add each other on socials again like how we used to be 🥺👉👈"
                </p>

                {/* Instagram Profile Button */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <motion.a
                    href="https://instagram.com/chauhansinghshubham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-white font-medium text-sm sm:text-base tracking-wide shadow-xl cursor-pointer transition-all"
                    style={{
                      background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                      boxShadow: '0 8px 30px rgba(220, 39, 67, 0.45)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Instagram className="w-5 h-5 text-white" />
                    <span className="font-sans font-semibold">@chauhansinghshubham</span>
                    <span className="text-xs opacity-75">↗</span>
                  </motion.a>

                  <p className="text-[11px] text-pink-200/50 font-sans mt-1">
                    Tap to visit profile on Instagram
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Golden VIP Pass Modal for 'Open this' */}
        <AnimatePresence>
          {showPassModal && (
            <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPassModal(false)}
              />

              <motion.div
                className="relative z-10 rounded-3xl p-6 sm:p-9 max-w-lg w-full text-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(32, 23, 16, 0.98) 0%, rgba(18, 12, 10, 0.98) 100%)',
                  border: '2px solid rgba(201, 169, 110, 0.55)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.9), 0 0 50px rgba(201, 169, 110, 0.3)',
                }}
                initial={{ scale: 0.85, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.85, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowPassModal(false)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-full glass transition-colors cursor-pointer z-20"
                >
                  ✕
                </button>

                {/* Decorative golden border */}
                <div
                  className="absolute inset-3 rounded-2xl pointer-events-none"
                  style={{ border: '1px dashed rgba(201, 169, 110, 0.35)' }}
                />

                {/* Crown Emblem */}
                <motion.div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, #fef08a, #c9a96e)',
                    boxShadow: '0 0 30px rgba(201, 169, 110, 0.6)',
                  }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-3xl select-none">👑</span>
                </motion.div>

                {/* Tag */}
                <p
                  className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium mb-1.5"
                  style={{ color: 'var(--color-gold)' }}
                >
                  ✦ OFFICIAL VIP VOUCHER ✦
                </p>

                {/* Title */}
                <h2
                  className="font-serif italic font-extrabold text-2xl sm:text-3xl mb-1 leading-tight"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #fef08a 50%, #c9a96e 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  "Win Any Argument Free Pass"
                </h2>

                <p className="text-xs text-amber-200/70 font-sans mb-5">
                  Issued to: <span className="text-white font-semibold">Aakanksha 🌸</span> &nbsp;|&nbsp; Authorized by: <span className="text-white font-semibold">Shubham ✍️</span>
                </p>

                {/* Terms Card */}
                <div
                  className="rounded-2xl p-4 sm:p-5 text-left mb-6 relative z-10 space-y-3"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(201, 169, 110, 0.2)',
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-base mt-0.5">🥇</span>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                      <strong className="text-amber-300">Automatic Victory:</strong> Aage se kisi bhi behes ya disagreement me tum automatically jeet jaogi — koi conditions nahi, mujhe argue karna allowed nahi.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-base mt-0.5">⏳</span>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                      <strong className="text-amber-300">Lifetime Validity:</strong> Tumhare har mood swing, dramatic reaction, aur overthinking ke liye valid hai forever.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-base mt-0.5">🍫</span>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                      <strong className="text-amber-300">Penalty Clause:</strong> Agar maine argue karne ki koshish bhi ki, toh penalty me turant chocolates aur favourite food khilana padega.
                    </p>
                  </div>
                </div>

                {/* Claim Action */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                  {!isPassClaimed ? (
                    <motion.button
                      type="button"
                      onClick={() => setIsPassClaimed(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3.5 rounded-full text-stone-900 font-bold text-xs sm:text-sm tracking-wider uppercase cursor-pointer transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #fef08a, #c9a96e)',
                        boxShadow: '0 0 30px rgba(201, 169, 110, 0.6)',
                      }}
                    >
                      Claim &amp; Activate Pass 👑
                    </motion.button>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ scale: 2, rotate: -20, opacity: 0 }}
                        animate={{ scale: 1, rotate: -3, opacity: 1 }}
                        transition={{ type: 'spring', damping: 14, stiffness: 220 }}
                        className="inline-block px-5 py-2.5 rounded-xl border-2 border-emerald-500/80 bg-emerald-950/70 shadow-xl"
                      >
                        <p className="text-emerald-300 font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                          <span>✅</span>
                          <span>ACTIVATED &amp; VALID FOREVER</span>
                          <span>❤️</span>
                        </p>
                      </motion.div>

                      <p className="text-xs text-amber-200/70 italic font-sans mt-1">
                        Screenshot leke rakh lo... aage kabhi bhi mere khilaaf use kar sakti ho! 😉
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
