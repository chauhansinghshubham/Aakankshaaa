import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Opening from './components/Opening';
import HerSection from './components/HerSection';
import Gallery from './components/Gallery';
import OurStory from './components/OurStory';
import LoveThings from './components/LoveThings';
import HoKaunTum from './components/HoKaunTum';
import BreakingNews from './components/BreakingNews';
import Apology from './components/Apology';
import Letter from './components/Letter';
import Surprise from './components/Surprise';
import FinalPage from './components/FinalPage';
import MusicPlayer from './components/MusicPlayer';
import Cursor from './components/Cursor';
import ParticleSystem from './components/ParticleSystem';
import ChapterDivider from './components/ChapterDivider';
import { trackSiteOpen, trackSiteEntered, trackReachedFinalPage } from './utils/tracker';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  // Initialize tracker and log initial site visit
  useEffect(() => {
    trackSiteOpen();
  }, []);

  const handleEnter = useCallback(() => {
    setHasEntered(true);
    trackSiteEntered();
    // smooth scroll to top of main content
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  const handleReachedLastPage = useCallback(() => {
    setHasReachedLastPage(true);
    trackReachedFinalPage();
  }, []);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setHasEntered(false);
      setHasReachedLastPage(false);
    }, 400);
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
          <MusicPlayer hasReachedLastPage={hasReachedLastPage} />

          {/* Pages */}
          <main style={{ position: 'relative', zIndex: 2 }}>
            <HerSection />
            <ChapterDivider whisper="Yeh kuch photos hain jo mujhe sabse zyada pyaari lagti hain..." icon="🌸" />
            <Gallery />
            <ChapterDivider whisper="Every picture has a memory, and this is how it all began..." icon="📖" />
            <OurStory />
            <ChapterDivider whisper="Tumhari woh choti aadaatein jinpe main secretly fida hoon..." icon="💖" />
            <LoveThings />
            <ChapterDivider whisper="Musafir main bhatka, tu mera basera..." icon="✨" />
            <HoKaunTum />
            <ChapterDivider whisper="Thoda drama, thodi bakwaas, aur humare headlines..." icon="🗞️" />
            <BreakingNews />
            <ChapterDivider whisper="Mazaak se hatt ke, kuch sach jo bolna zaroori tha..." icon="💌" />
            <Apology />
            <ChapterDivider whisper="Jo baatein main samne se theek se keh nahi pata..." icon="✒️" />
            <Letter hasReachedLastPage={hasReachedLastPage} />
            <ChapterDivider whisper="End tak aane se pehle, bas ek choti si smile tumhare liye..." icon="🎁" />
            <Surprise />
            <ChapterDivider whisper="Bas tum, main, aur meri bilkul sachhi baatein..." icon="🤍" />
            <FinalPage
              onReplay={handleReplay}
              onReachedLastPage={handleReachedLastPage}
            />
          </main>
        </>
      )}
    </>
  );
}
