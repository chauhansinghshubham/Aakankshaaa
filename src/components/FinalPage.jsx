import { useState } from 'react';
import { motion } from 'framer-motion';
import content from '../config/content';

function FinalPhoto() {
  const [errored, setErrored] = useState(false);
  return (
    <div className="absolute inset-0">
      {!errored ? (
        <motion.img
          src={content.photos.final}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: 'easeOut' }}
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(233,30,140,0.08) 0%, rgba(7,5,16,1) 70%)',
          }}
        />
      )}
      {/* Dark gradient overlay for crystal clear text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(7,5,16,0.65) 0%, rgba(7,5,16,0.88) 50%, rgba(7,5,16,0.97) 100%)',
        }}
      />
    </div>
  );
}

export default function FinalPage({ onReplay }) {
  const [copied, setCopied] = useState(false);

  const handleTextHim = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3500);
  };

  return (
    <section
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <FinalPhoto />

      {/* Content Container */}
      <div className="relative z-10 text-center px-2 sm:px-4 flex flex-col items-center gap-6 max-w-2xl w-full">
        {/* Title */}
        <motion.h2
          className="font-serif font-bold text-4xl sm:text-6xl"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #fff 0%, var(--color-pink-light) 50%, var(--color-gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          For Aakanksha 🤍
        </motion.h2>

        {/* The Knowing Truth */}
        <motion.p
          className="text-lg sm:text-2xl font-light"
          style={{
            color: 'rgba(255,255,255,0.95)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.01em',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          I know that you also want to talk to me...
          <br />
          <span style={{ color: 'var(--color-pink-light)', fontStyle: 'italic', fontWeight: 400 }}>
            you're just not showing it.
          </span>
        </motion.p>

        {/* Memory Box — The Magical Callbacks */}
        <motion.div
          className="glass rounded-3xl p-6 sm:p-8 text-left w-full relative overflow-hidden"
          style={{
            border: '1px solid rgba(233,30,140,0.25)',
            background: 'rgba(7,5,16,0.72)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(233,30,140,0.1)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4 font-sans font-medium" style={{ color: 'var(--color-gold)' }}>
            ✦ Do you remember these? ✦
          </p>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/85 font-sans font-light">
            <div className="flex items-start gap-3">
              <span className="text-lg">📞</span>
              <p>
                Those endless calls and texts that used to go on till late night, where neither of us ever wanted to hang up or say bye.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-lg">👓</span>
              <p>
                How I would always tell you to take off your specs so I could see your eyes... and you’d complain, <span className="italic text-pink-300">"Nahi, meri aankhein bohot choti lagti hain!"</span> — but you still took them off for me every single time just to make me smile.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-lg">🌧️</span>
              <p>
                How you refused an umbrella in the rain, because you wanted to get completely drenched in the rain with me.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-start gap-3">
              <span className="text-lg">🏠</span>
              <p>
                And how you once looked at me and said:
                <span className="block my-2 text-base sm:text-lg font-serif italic text-gold font-normal" style={{ color: 'var(--color-gold)' }}>
                  "Agar aap in future merese baat nahi karenge toh, Hum ghar aa jayenge aapke."
                </span>
                Toh ab batao... jab sach mein itne din se baat nahi hui, should I wait for you at my door? Ya ek chota sa text bhej dogi? 🤍
              </p>
            </div>
          </div>
        </motion.div>

        {/* Soft, Sincere Ending */}
        <motion.div
          className="space-y-2 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-sm sm:text-base text-white/80 font-sans font-light">
            Zero pressure. No ego. Just someone who misses his favourite person more than he can ever say.
          </p>
          <p className="text-xs tracking-widest text-gold uppercase font-medium pt-1" style={{ color: 'var(--color-gold)' }}>
            Whenever you're ready, I'm right here.
          </p>
          <p className="text-sm font-serif italic text-pink-200 pt-1">
            — Shubham
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="px-8 py-3.5 rounded-full text-sm font-medium text-white shadow-xl flex items-center gap-2 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, var(--color-pink), var(--color-purple))',
              boxShadow: '0 8px 30px rgba(233,30,140,0.4)',
              fontFamily: 'var(--font-sans)',
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleTextHim}
          >
            <span>💬</span>
            <span>{copied ? 'He is waiting for your text right now 🤍' : 'Pick Up Your Phone & Text Him'}</span>
          </motion.button>

          <motion.button
            className="px-6 py-3 rounded-full text-xs tracking-widest uppercase glass text-white/60 hover:text-white transition-all cursor-pointer"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.15em',
            }}
            whileHover={{ scale: 1.03 }}
            onClick={onReplay}
          >
            Replay Everything ↻
          </motion.button>
        </motion.div>

        {/* Domain footer watermark */}
        <p className="text-[11px] tracking-[0.25em] text-white/20 uppercase mt-4">
          aakankshaaa.in · made with genuine effort &amp; love
        </p>
      </div>
    </section>
  );
}
