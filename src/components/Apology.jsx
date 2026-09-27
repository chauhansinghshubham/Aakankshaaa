import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import content from '../config/content';

export default function Apology() {
  const lines = content.apologyLines;
  const containerRef = useRef(null);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
      ref={containerRef}
    >
      {/* Very subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-bold text-center mb-20"
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'rgba(255,255,255,0.9)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          I Know Things Haven't<br />
          <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
            Been Okay.
          </span>
        </motion.h2>

        {/* Lines */}
        <div className="flex flex-col gap-10">
          {lines.map((line, i) => (
            <ApologyLine key={i} line={line} index={i} />
          ))}
        </div>

        {/* End mark */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div
            className="w-16 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
          />
          <p
            className="text-sm text-center"
            style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}
          >
            That's it. That's all I wanted to say.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ApologyLine({ line, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const isHighlighted = index === 3 || index === 4 || index === 5 || index === 6;

  return (
    <motion.p
      ref={ref}
      className="text-lg sm:text-2xl leading-relaxed text-center"
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: isHighlighted ? 400 : 300,
        color: isHighlighted
          ? 'rgba(255,255,255,0.95)'
          : 'rgba(255,255,255,0.6)',
        letterSpacing: '0.01em',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.1,
      }}
    >
      {line}
    </motion.p>
  );
}
