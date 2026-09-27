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
  return (
    <section
      className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      <FinalPhoto />

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6 max-w-xl w-full">
        {/* Title */}
        <motion.h2
          className="font-serif italic font-bold text-4xl sm:text-6xl"
          style={{
            fontFamily: 'var(--font-serif)',
            background: 'linear-gradient(135deg, #fff 0%, var(--color-pink-light) 50%, var(--color-gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          For Aakanksha 🤍
        </motion.h2>

        {/* Calm, honest, natural reflection */}
        <motion.div
          className="space-y-5 text-base sm:text-lg font-light leading-relaxed text-white/85"
          style={{ fontFamily: 'var(--font-sans)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p>
            I know you're upset with me and showing like you don't want to talk anymore... but as far as I know you, there's a corner in you that doesn't completely agree with this decision. You're just not showing it.
          </p>

          <p className="text-white/75">
            I just miss us. The late calls, you taking off your glasses even when you complained your eyes look small, getting soaked in the rain without an umbrella, and that line you once told me — <span className="text-gold font-normal italic" style={{ color: 'var(--color-gold)' }}>"Agar aap baat nahi karenge, toh hum ghar aa jayenge aapke."</span>
          </p>

          <p className="text-sm sm:text-base text-white/60 pt-2">
            No pressure at all. Whenever you feel like talking, I'm right here.
          </p>

          <p className="text-sm font-serif italic text-pink-200">
            — Shubham
          </p>
        </motion.div>

        {/* Simple dignified replay button */}
        <motion.button
          className="mt-4 px-6 py-2.5 rounded-full text-xs tracking-widest uppercase glass text-white/50 hover:text-white transition-all cursor-pointer"
          style={{
            border: '1px solid rgba(255,255,255,0.15)',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.15em',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          onClick={onReplay}
        >
          Replay ↻
        </motion.button>

        {/* Subtle footer */}
        <p className="text-[11px] tracking-[0.25em] text-white/20 uppercase mt-2">
          aakankshaaa.in
        </p>
      </div>
    </section>
  );
}
