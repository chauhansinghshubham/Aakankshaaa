import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import Opening from './components/Opening';
import HerSection from './components/HerSection';
import Gallery from './components/Gallery';
import OurStory from './components/OurStory';
import LoveThings from './components/LoveThings';
import HoKaunTum from './components/HoKaunTum';
import FourMonths from './components/FourMonths';
import BreakingNews from './components/BreakingNews';
import Apology from './components/Apology';
import Letter from './components/Letter';
import Surprise from './components/Surprise';
import FinalPage from './components/FinalPage';
import MusicPlayer from './components/MusicPlayer';
import Cursor from './components/Cursor';
import ParticleSystem from './components/ParticleSystem';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = useCallback(() => {
    setHasEntered(true);
    // smooth scroll to top of main content
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setHasEntered(false), 400);
  }, []);

  return (
    <>
      {/* Global animated bg */}
      <div className="bg-animated" aria-hidden />

      {/* Custom cursor */}
      <Cursor />

      {/* Opening overlay */}
      <AnimatePresence mode="wait">
        {!hasEntered && (
          <Opening key="opening" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* Main content — only rendered after entering */}
      {hasEntered && (
        <>
          {/* Global particles */}
          <ParticleSystem />

          {/* Music player */}
          <MusicPlayer />

          {/* Pages */}
          <main style={{ position: 'relative', zIndex: 2 }}>
            <HerSection />
            <Gallery />
            <OurStory />
            <LoveThings />
            <HoKaunTum />
            <FourMonths />
            <BreakingNews />
            <Apology />
            <Letter />
            <Surprise />
            <FinalPage onReplay={handleReplay} />
          </main>
        </>
      )}
    </>
  );
}
