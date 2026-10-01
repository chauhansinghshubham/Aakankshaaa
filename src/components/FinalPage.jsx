import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MessageCircle, RotateCcw } from 'lucide-react';
import content from '../config/content';

function FairyLightEmbers() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2.5 + 1.2,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '#fcd34d' : '#f472b6',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 6;
        ctx.fill();
        ctx.restore();
      });
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ opacity: 0.85 }}
    />
  );
}

function FinalPhoto() {
  const [errored, setErrored] = useState(false);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {!errored ? (
        <motion.img
          src={content.photos.final}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 18, ease: 'easeOut' }}
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(233,30,140,0.08) 0%, rgba(7,5,16,1) 70%)',
          }}
        />
      )}
      {/* Warm cinematic vignette preserving fairy lights in the background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(7,5,16,0.35) 0%, rgba(7,5,16,0.78) 65%, rgba(7,5,16,0.96) 100%)',
        }}
      />
    </div>
  );
}

/* ── OPTION 2: FLOATING SKY LANTERN COMPONENT ── */
function FloatingSkyLantern({ onRelease, isReleased }) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center my-2">
      {!isReleased ? (
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRelease}
          className="group relative cursor-pointer flex flex-col items-center select-none"
        >
          {/* Glowing Aura */}
          <div
            className="absolute -inset-3 rounded-full blur-xl pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-90"
            style={{
              background: 'radial-gradient(circle, rgba(251,191,36,0.5) 0%, rgba(245,158,11,0.2) 50%, transparent 70%)',
            }}
          />

          {/* Lantern Shape */}
          <div
            className="relative w-20 h-28 rounded-t-3xl rounded-b-xl flex flex-col items-center justify-between p-2 shadow-2xl transition-all"
            style={{
              background: 'linear-gradient(180deg, #fef3c7 0%, #fbbf24 40%, #d97706 80%, #92400e 100%)',
              boxShadow: '0 0 30px rgba(251,191,36,0.65), inset 0 0 12px rgba(255,255,255,0.6)',
              border: '1.5px solid rgba(254,243,199,0.7)',
            }}
          >
            {/* Wooden top frame */}
            <div className="w-14 h-2 rounded-full bg-amber-950/70 border-t border-amber-500/50" />

            {/* Glowing Flame inside */}
            <div className="relative my-auto flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.15, 0.95, 1], opacity: [0.85, 1, 0.9, 0.85] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-6 h-9 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at 50% 60%, #ffffff 0%, #fef08a 35%, #f59e0b 70%, transparent 100%)',
                  filter: 'drop-shadow(0 0 10px #fbbf24)',
                }}
              />
              <span className="text-[9px] font-serif font-bold text-amber-950/80 tracking-widest uppercase mt-0.5">
                A &amp; S
              </span>
            </div>

            {/* Wooden bottom rim & dangling tassel */}
            <div className="w-12 h-2 rounded-full bg-amber-950/80 border-b border-amber-500/40 relative">
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1 h-4 rounded-full bg-red-600 shadow-md" />
            </div>
          </div>

          {/* Pulsing CTA underneath */}
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-3 px-4 py-2 rounded-full glass border border-amber-400/40 shadow-lg text-amber-200 text-xs sm:text-sm font-serif tracking-wide flex items-center gap-2 group-hover:border-amber-300 group-hover:text-amber-100 transition-all text-center"
          >
            <span>🏮</span>
            <span>Tap to release a sky lantern if this made you smile...</span>
            <span className="text-amber-400">✨</span>
          </motion.div>
        </motion.div>
      ) : (
        /* Ascending Sky Lantern */
        <div className="relative w-full flex flex-col items-center">
          <motion.div
            initial={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
            animate={{
              y: -window.innerHeight - 350,
              x: [0, 30, -25, 40],
              scale: [1, 0.8, 0.5, 0.2],
              opacity: [1, 1, 0.8, 0],
              rotate: [0, 5, -4, 3],
            }}
            transition={{ duration: 5, ease: 'easeInOut' }}
            className="fixed pointer-events-none z-[9990] flex flex-col items-center select-none"
            style={{ left: 'calc(50% - 48px)', bottom: '30vh' }}
          >
            <div
              className="w-24 h-32 rounded-t-3xl rounded-b-xl flex flex-col items-center justify-between p-2 shadow-2xl"
              style={{
                background: 'linear-gradient(180deg, #fef3c7 0%, #fbbf24 40%, #d97706 80%, #92400e 100%)',
                boxShadow: '0 0 50px rgba(251,191,36,0.9), inset 0 0 15px rgba(255,255,255,0.6)',
                border: '1.5px solid rgba(254,243,199,0.7)',
              }}
            >
              <div className="w-16 h-2 rounded-full bg-amber-950/70" />
              <div
                className="w-8 h-12 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at 50% 60%, #ffffff 0%, #fef08a 40%, #f59e0b 80%, transparent 100%)',
                  filter: 'drop-shadow(0 0 16px #fbbf24)',
                }}
              />
              <div className="w-14 h-2 rounded-full bg-amber-950/80" />
            </div>
          </motion.div>

          {/* Released Message Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-lg p-5 rounded-2xl text-center relative overflow-hidden mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(251,191,36,0.14) 0%, rgba(233,30,140,0.12) 100%)',
              border: '1.5px solid rgba(251,191,36,0.5)',
              boxShadow: '0 0 35px rgba(251,191,36,0.25)',
            }}
          >
            <p className="text-sm sm:text-base font-serif italic text-amber-200 mb-2 leading-relaxed [text-wrap:balance]">
              "Somewhere under the same sky, I'm right here whenever you're ready."
            </p>
            <p className="text-[11px] uppercase tracking-widest text-amber-300/80 font-sans font-medium flex items-center justify-center gap-1.5">
              <span>🏮</span>
              <span>Your lantern is floating with the stars</span>
              <span>🤍</span>
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ── OPTION 1: GENTLE RECONNECTION INTERACTION ── */
function ReconnectInteraction({ contact }) {
  const [response, setResponse] = useState(null);

  const prefill =
    contact?.prefillMessage ||
    'Maine poori website dekhi... aur haan, meri aankhein choti nahi lagti chashme ke bina! 😉';
  const encodedText = encodeURIComponent(prefill);

  const waUrl = contact?.whatsappNumber
    ? `https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedText}`
    : `https://api.whatsapp.com/send?text=${encodedText}`;

  const igUrl = `https://instagram.com/${contact?.instagramUsername || 'chauhansinghshubham'}`;

  return (
    <div className="pt-5 border-t border-white/10 w-full flex flex-col items-center">
      <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-pink-300 mb-2">
        ✦ One Honest Question ✦
      </p>

      <h3
        className="font-serif italic font-bold text-2xl sm:text-3xl text-white mb-4 text-center"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        "Abhi bhi gussa ho mujhse?"
      </h3>

      {/* Micro-hint to prompt action */}
      <p className="text-[11px] tracking-widest text-pink-200/60 mb-2 uppercase font-sans font-medium flex items-center justify-center gap-1.5">
        <span>👇</span>
        <span>Tap one to answer</span>
        <span>👇</span>
      </p>

      {/* Choice Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 my-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95, y: 4 }}
          onClick={() => setResponse('little')}
          className={`relative px-7 py-3.5 sm:px-9 sm:py-4 rounded-full text-sm sm:text-base font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2.5 text-white select-none ${
            response === 'little'
              ? 'ring-4 ring-pink-300/60 brightness-110'
              : response === 'lot'
              ? 'opacity-40 hover:opacity-80 scale-95'
              : 'hover:brightness-110'
          }`}
          style={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #a855f7 100%)',
            boxShadow:
              response === 'little'
                ? '0 2px 0 #831843, 0 8px 25px rgba(236, 72, 153, 0.6)'
                : '0 5px 0 #831843, 0 10px 25px rgba(236, 72, 153, 0.45)',
            borderTop: '1.5px solid rgba(255, 255, 255, 0.45)',
          }}
        >
          <span>Thoda sa...</span>
          <span className="text-lg sm:text-xl drop-shadow-sm">🥺</span>
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95, y: 4 }}
          onClick={() => setResponse('lot')}
          className={`relative px-7 py-3.5 sm:px-9 sm:py-4 rounded-full text-sm sm:text-base font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2.5 text-white select-none ${
            response === 'lot'
              ? 'ring-4 ring-amber-300/60 brightness-110'
              : response === 'little'
              ? 'opacity-40 hover:opacity-80 scale-95'
              : 'hover:brightness-110'
          }`}
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #e11d48 100%)',
            boxShadow:
              response === 'lot'
                ? '0 2px 0 #7c2d12, 0 8px 25px rgba(245, 158, 11, 0.6)'
                : '0 5px 0 #7c2d12, 0 10px 25px rgba(245, 158, 11, 0.45)',
            borderTop: '1.5px solid rgba(255, 255, 255, 0.45)',
          }}
        >
          <span>Haan bohot</span>
          <span className="text-lg sm:text-xl drop-shadow-sm">😤</span>
        </motion.button>
      </div>

      {/* Response Feedback & Direct Reconnect Buttons */}
      <AnimatePresence mode="wait">
        {response === 'little' && (
          <motion.div
            key="little-ans"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-3 text-center my-3 max-w-md w-full"
          >
            <p className="text-sm sm:text-base text-pink-200 font-serif italic leading-relaxed">
              "Toh phir ek chota sa text kar do na... I've been waiting to talk to you 🤍"
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <motion.a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white shadow-xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
                }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Text on WhatsApp</span>
              </motion.a>

              <motion.a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white shadow-xl cursor-pointer"
                style={{
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  boxShadow: '0 4px 20px rgba(220,39,67,0.45)',
                }}
              >
                <Instagram className="w-4 h-4" />
                <span>Say Hi on Instagram</span>
              </motion.a>
            </div>
          </motion.div>
        )}

        {response === 'lot' && (
          <motion.div
            key="lot-ans"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-3 text-center my-3 max-w-md w-full"
          >
            <p className="text-sm sm:text-base text-amber-200 font-serif italic leading-relaxed">
              "Arey aise mat karo na... pakka tumhari favourite treats &amp; snacks meri taraf se! Ek text toh banta hai na? 🥺🍟"
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <motion.a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white shadow-xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
                }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chalo ek text kar he deti hoon</span>
              </motion.a>

              <motion.a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white shadow-xl cursor-pointer"
                style={{
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  boxShadow: '0 4px 20px rgba(220,39,67,0.45)',
                }}
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram pe text karo</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FinalPage({ onReplay, onReachedLastPage }) {
  const sectionRef = useRef(null);
  const [isLanternReleased, setIsLanternReleased] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onReachedLastPage?.();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onReachedLastPage]);

  return (
    <section
      ref={sectionRef}
      id="final-page"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <FinalPhoto />
      <FairyLightEmbers />

      {/* Content Container */}
      <div className="relative z-20 text-center px-2 sm:px-4 flex flex-col items-center max-w-xl w-full">
        {/* Glowing Sanctuary Card */}
        <motion.div
          className="w-full rounded-3xl p-6 sm:p-10 relative overflow-hidden flex flex-col items-center gap-5 sm:gap-6 text-center"
          style={{
            background: 'rgba(7, 5, 16, 0.72)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(233, 30, 140, 0.25)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(201, 169, 110, 0.12)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => onReachedLastPage?.()}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* Subtle top indicator */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-6 h-px" style={{ background: 'rgba(201,169,110,0.3)' }} />
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium" style={{ color: 'var(--color-gold)' }}>
              ✦ Under The Lights ✦
            </p>
            <span className="w-6 h-px" style={{ background: 'rgba(201,169,110,0.3)' }} />
          </div>

          {/* Title */}
          <h2
            className="font-serif italic font-bold text-3xl sm:text-5xl flex items-center justify-center gap-2.5"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, var(--color-pink-light) 50%, var(--color-gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 20px rgba(233,30,140,0.3))',
              }}
            >
              For Aakanksha
            </span>
            <span className="not-italic text-2xl sm:text-4xl text-pink-300 drop-shadow-[0_0_15px_rgba(233,30,140,0.6)] select-none">
              🤍
            </span>
          </h2>

          {/* Sincere, concise reflection */}
          <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base font-light leading-relaxed text-white/90 text-center max-w-lg mx-auto">
            <p>
              You've reached the very end of this page. I know you're upset with me right now, but honestly... I just really miss us.
            </p>

            <div className="space-y-1.5 py-1">
              <p className="text-white/80 text-xs sm:text-sm">
                Tumhari un baaton ki yaad aati hain...
              </p>
              <div className="py-1.5 px-4 rounded-xl bg-amber-400/[0.08] border border-amber-400/20 max-w-md mx-auto">
                <p className="font-serif italic text-amber-200 text-sm sm:text-base tracking-wide font-normal">
                  "Agar aap baat nahi karenge, toh hum ghar aa jayenge aapke"
                </p>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">
                — because I truly don’t want this silence to be where our story ends.
              </p>
            </div>

            <p className="text-pink-200/95 text-xs sm:text-sm font-medium pt-3 sm:pt-4">
              So if this whole thing made you smile even a little, release a lantern and answer one honest question below 🤍
            </p>
          </div>

          {/* ── OPTION 2: FLOATING SKY LANTERN ── */}
          <FloatingSkyLantern
            isReleased={isLanternReleased}
            onRelease={() => setIsLanternReleased(true)}
          />

          {/* ── OPTION 1: GENTLE RECONNECTION ── */}
          <ReconnectInteraction contact={content.contact} />

          {/* Footer Note */}
          <div className="pt-5 border-t border-white/10 w-full flex flex-col items-center gap-1">
            <p className="text-xs sm:text-sm text-white/50">
              No pressure at all. Whenever you feel like talking, I'm right here.
            </p>
            <p className="font-serif italic text-pink-200 text-sm mt-1">
              — Shubham
            </p>
          </div>
        </motion.div>

        {/* Dignified replay button */}
        <motion.button
          className="mt-6 px-6 py-2.5 rounded-full text-xs tracking-widest uppercase glass text-white/40 hover:text-white transition-all cursor-pointer flex items-center gap-2"
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.15em',
          }}
          whileHover={{ scale: 1.03 }}
          onClick={onReplay}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Everything ↻</span>
        </motion.button>

        {/* Subtle footer */}
        <p className="text-[11px] tracking-[0.25em] text-white/20 uppercase mt-2">
          aakankshaaa.in
        </p>
      </div>
    </section>
  );
}
