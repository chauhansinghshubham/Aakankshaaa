import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import content from '../config/content';

function NewsModal({ article, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9980] flex items-center justify-center p-4"
      style={{ background: 'rgba(7,5,16,0.9)', backdropFilter: 'blur(10px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="newspaper-card rounded-lg p-8 max-w-lg w-full relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        <div
          className="text-center mb-4 pb-4"
          style={{ borderBottom: '2px solid #9a8560' }}
        >
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">EXCLUSIVE REPORT</p>
          <div className="w-8 h-px bg-gray-400 mx-auto mb-1" />
        </div>

        <h3
          className="text-xl font-bold mb-4 leading-tight"
          style={{ fontFamily: 'Times New Roman, serif', color: '#1a1a1a' }}
        >
          {article.headline}
        </h3>

        <div style={{ borderTop: '1px solid #9a8560', paddingTop: 16 }}>
          <p
            className="leading-relaxed text-sm"
            style={{ fontFamily: 'Times New Roman, serif', color: '#3a3a3a', textAlign: 'justify' }}
          >
            {article.article}
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400" style={{ fontFamily: 'Times New Roman, serif' }}>
            — The Daily Aakanksha, Est. 2026 —
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NewsCard({ item, index, onClick }) {
  return (
    <motion.div
      className="newspaper-card rounded-lg p-5 cursor-pointer w-full h-full flex flex-col justify-between"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{
        y: -4,
        boxShadow: '6px 6px 30px rgba(0,0,0,0.5)',
        transition: { duration: 0.2 },
      }}
      onClick={onClick}
    >
      <div>
        {/* Header */}
        <div
          className="flex items-center gap-2 mb-3 pb-3"
          style={{ borderBottom: '2px solid #9a8560' }}
        >
          <span
            className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
            style={{ background: '#dc2626', color: 'white', fontSize: '0.6rem' }}
          >
            BREAKING
          </span>
          <span className="text-xs text-gray-500" style={{ fontFamily: 'Times New Roman, serif' }}>
            The Daily Aakanksha
          </span>
        </div>

        {/* Headline */}
        <h3
          className="font-bold leading-tight mb-3"
          style={{
            fontFamily: 'Times New Roman, serif',
            color: '#1a1a1a',
            fontSize: '1rem',
          }}
        >
          {item.headline}
        </h3>

        {/* Teaser */}
        <p
          className="text-xs leading-relaxed line-clamp-3 mb-3"
          style={{ color: '#4a4a4a', fontFamily: 'Times New Roman, serif' }}
        >
          {item.article.slice(0, 80)}...
        </p>
      </div>

      <p
        className="text-xs font-bold mt-2"
        style={{ color: '#9a8560', fontFamily: 'Times New Roman, serif' }}
      >
        Click to read full story →
      </p>
    </motion.div>
  );
}

export default function BreakingNews() {
  const [activeArticle, setActiveArticle] = useState(null);
  const headlines = content.breakingNews;

  // Ticker items
  const tickerItems = headlines.map(h => h.headline);

  return (
    <section
      className="relative min-h-screen py-24 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'var(--bg-base)' }}
    >
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Ticker tape */}
        <div
          className="w-full overflow-hidden py-2.5 mb-0"
          style={{
            background: '#dc2626',
            borderTop: '2px solid #991b1b',
            borderBottom: '2px solid #991b1b',
          }}
        >
          <div className="ticker-animate text-white text-sm font-bold tracking-wide" style={{ fontFamily: 'Times New Roman, serif' }}>
            🔴 BREAKING: {tickerItems.join('  ·  🔴 BREAKING: ')}  ·  🔴 BREAKING: {tickerItems.join('  ·  🔴 BREAKING: ')}
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-12 flex flex-col items-center">
          {/* Masthead */}
          <div className="text-center mb-12 flex flex-col items-center w-full">
            <ScrollReveal className="flex justify-center w-full">
              <div
                className="inline-block px-4 sm:px-8 py-3 sm:py-4 rounded-sm max-w-[92vw] text-center"
                style={{
                  background: '#f5f0e8',
                  border: '3px double #9a8560',
                }}
              >
                <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gray-500 mb-1" style={{ fontFamily: 'Times New Roman, serif' }}>
                  Est. 2026  ·  All the news about her
                </p>
                <h2
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight"
                  style={{ fontFamily: 'Times New Roman, serif', color: '#1a1a1a' }}
                >
                  THE DAILY AAKANKSHA
                </h2>
                <div className="flex items-center gap-2 sm:gap-4 justify-center mt-2">
                  <div className="h-px flex-1 bg-gray-400" />
                  <p className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap" style={{ fontFamily: 'Times New Roman, serif' }}>
                    Vol. IV, No. 1  ·  Breaking News Edition
                  </p>
                  <div className="h-px flex-1 bg-gray-400" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl justify-items-center items-stretch">
            {headlines.map((item, i) => (
              <div key={i} className="w-full max-w-md mx-auto">
                <NewsCard
                  item={item}
                  index={i}
                  onClick={() => setActiveArticle(item)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeArticle && (
          <NewsModal
            article={activeArticle}
            onClose={() => setActiveArticle(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
