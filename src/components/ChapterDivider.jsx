import { motion } from 'framer-motion';

export default function ChapterDivider({ whisper, icon = '✦' }) {
  return (
    <div className="relative py-12 sm:py-16 flex flex-col items-center justify-center select-none overflow-hidden w-full">
      {/* Soft atmospheric ambient glow */}
      <div
        className="absolute w-72 sm:w-96 h-24 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(233, 30, 140, 0.12) 0%, rgba(201, 169, 110, 0.05) 50%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Floating stardust constellation hairlines */}
      <motion.div
        className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Left hairline */}
        <div
          className="flex-1 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.4), rgba(233, 30, 140, 0.6))',
          }}
        />

        {/* Center glowing emblem */}
        <div className="flex items-center gap-1.5 px-1">
          <span className="text-[10px] text-pink-300/40">✧</span>
          <motion.span
            className="text-sm sm:text-base drop-shadow-[0_0_12px_rgba(233,30,140,0.8)]"
            style={{ color: 'var(--color-gold)' }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.75, 1, 0.75],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {icon}
          </motion.span>
          <span className="text-[10px] text-pink-300/40">✧</span>
        </div>

        {/* Right hairline */}
        <div
          className="flex-1 h-px"
          style={{
            background:
              'linear-gradient(90deg, rgba(233, 30, 140, 0.6), rgba(201, 169, 110, 0.4), transparent)',
          }}
        />
      </motion.div>

      {/* Romantic whisper beneath the line */}
      {whisper && (
        <motion.p
          className="relative z-10 text-center font-serif italic text-xs sm:text-sm mt-3 px-6 tracking-wide"
          style={{
            color: 'rgba(255, 230, 245, 0.55)',
            textShadow: '0 0 10px rgba(233, 30, 140, 0.25)',
          }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {whisper}
        </motion.p>
      )}
    </div>
  );
}
