import { useState, useCallback } from 'react';
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

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

  const handleEnter = useCallback(() => {
    setHasEntered(true);
    // smooth scroll to top of main content
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
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
            <ChapterDivider whisper="A collection of the girl who lights up every room..." icon="🌸" />
            <Gallery />
            <ChapterDivider whisper="Every picture has a memory, and this is how it all began..." icon="📖" />
            <OurStory />
            <ChapterDivider whisper="Through all those memories, I fell for every piece of you..." icon="💖" />
            <LoveThings />
            <ChapterDivider whisper="Musafir main bhatka, tu mera basera..." icon="✨" />
            <HoKaunTum />
            <ChapterDivider whisper="A little chaos, a lot of drama, and some headlines..." icon="🗞️" />
            <BreakingNews />
            <ChapterDivider whisper="Beyond the laughter, the quiet truths I need to tell you..." icon="💌" />
            <Apology />
            <ChapterDivider whisper="What words couldn't say out loud, written with care..." icon="✒️" />
            <Letter hasReachedLastPage={hasReachedLastPage} />
            <ChapterDivider whisper="A little smile for you before we reach the end..." icon="🎁" />
            <Surprise />
            <ChapterDivider whisper="Under the fairy lights, just you and my honest heart..." icon="🤍" />
            <FinalPage
              onReplay={handleReplay}
              onReachedLastPage={() => setHasReachedLastPage(true)}
            />
          </main>
        </>
      )}
    </>
  );
}
