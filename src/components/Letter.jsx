import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';

const LETTER_TEXT = content.letter;

function useTypewriter(text, started, speed = 25) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    if (!started) return;
    indexRef.current = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return displayed;
}

export default function Letter() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const displayed = useTypewriter(LETTER_TEXT, inView, 18);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
      ref={sectionRef}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(201,169,110,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)' }}
            >
              ✦ For You ✦
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-3xl md:text-5xl font-serif font-bold"
              style={{
                fontFamily: 'var(--font-serif)',
                background: 'linear-gradient(135deg, #fff 0%, var(--color-gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Something I Couldn't<br />
              <span style={{ fontStyle: 'italic' }}>Say Properly</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Letter Card */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f9f4ec 0%, #f0e8d8 100%)',
            border: '1px solid rgba(201,169,110,0.3)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.4), 0 0 40px rgba(201,169,110,0.1)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Letter header */}
          <div
            className="px-8 pt-8 pb-4"
            style={{ borderBottom: '1px solid rgba(154,133,96,0.3)' }}
          >
            <div className="flex items-center justify-between">
              <p
                className="text-sm"
                style={{ color: '#9a8560', fontFamily: 'Times New Roman, serif' }}
              >
                A letter, written honestly.
              </p>
              <div className="wax-seal">S</div>
            </div>
          </div>

          {/* Letter body */}
          <div className="px-8 py-8">
            <pre
              className="whitespace-pre-wrap leading-loose"
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.1rem',
                color: '#2d2020',
                minHeight: 300,
              }}
            >
              {displayed}
              {displayed.length < LETTER_TEXT.length && (
                <span className="typewriter-cursor" style={{ background: '#9a8560' }} />
              )}
            </pre>
          </div>

          {/* Decorative lines */}
          <div className="px-8 pb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full mb-6"
                style={{ height: 1, background: 'rgba(154,133,96,0.15)' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
