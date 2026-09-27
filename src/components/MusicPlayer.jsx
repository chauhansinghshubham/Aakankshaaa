import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../config/content';

export default function MusicPlayer({ hasReachedLastPage = false }) {
  const audioRef = useRef(null);
  const popupTimerRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [expanded, setExpanded] = useState(false);
  const [playAttemptCount, setPlayAttemptCount] = useState(0);
  const [popup, setPopup] = useState(null);

  const showPopup = useCallback((message, emoji = '✨') => {
    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    setPopup({ message, emoji, id: Date.now() });
    popupTimerRef.current = setTimeout(() => {
      setPopup(null);
    }, 5500);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.loop = true;

    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handlePlayClick = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // If already playing, pausing is always allowed
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    // SCENARIO 1: User tries to play after reaching the last page
    if (hasReachedLastPage) {
      try {
        await audio.play();
        setPlaying(true);
        showPopup('This was the first song you gave to me ❤️', '❤️');
      } catch (err) {
        console.error('Audio play error:', err);
      }
      return;
    }

    // SCENARIO 2: User tries to play BEFORE reaching the last page
    if (playAttemptCount === 0) {
      // 1st attempt: Do NOT play song, show playful warning
      setPlayAttemptCount(1);
      showPopup('Gaana baad me sun lena Aakanksha, Pehle meri baatein sun lo', '🧸');
      return;
    }

    // 2nd attempt (or subsequent before last page): Let her listen!
    setPlayAttemptCount(prev => prev + 1);
    showPopup('Achha thik hain itna mann hain to sun he lo', '🎶');
    try {
      await audio.play();
      setPlaying(true);
    } catch (err) {
      console.error('Audio play error:', err);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const songTitle = content.musicTitle || 'Jaavedaan Hai - KK (1920)';

  return (
    <>
      <audio ref={audioRef} src={content.music} preload="auto" />

      <div
        className="fixed z-[9990] flex flex-col items-end gap-2"
        style={{
          fontFamily: 'var(--font-sans)',
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
        }}
      >
        {/* Playful / Emotional Toast Popup */}
        <AnimatePresence>
          {popup && (
            <motion.div
              key={popup.id}
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 350 }}
              className="max-w-[280px] sm:max-w-xs p-3.5 sm:p-4 rounded-2xl pointer-events-auto cursor-pointer select-none mb-1 text-left"
              style={{
                background: 'linear-gradient(135deg, rgba(35, 20, 52, 0.97) 0%, rgba(18, 12, 30, 0.99) 100%)',
                border: '1.5px solid rgba(233, 30, 140, 0.55)',
                boxShadow: '0 15px 45px rgba(0, 0, 0, 0.8), 0 0 30px rgba(233, 30, 140, 0.3)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              onClick={() => setPopup(null)}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-xl shrink-0 select-none">
                  {popup.emoji}
                </span>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed font-sans">
                    {popup.message}
                  </p>
                  <span className="text-[10px] text-pink-300/60 block mt-1">
                    Tap to dismiss ✕
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded settings panel */}
        {expanded && (
          <div
            className="glass rounded-2xl p-4 flex flex-col gap-3 mb-1"
            style={{
              minWidth: 230,
              border: '1px solid rgba(233,30,140,0.25)',
              boxShadow: '0 8px 40px rgba(233,30,140,0.2)',
            }}
          >
            <div className="flex items-center gap-2">
              <Music size={14} style={{ color: 'var(--color-pink)' }} />
              <span className="text-xs truncate font-medium text-white/80" style={{ maxWidth: 170 }}>
                {songTitle}
              </span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors cursor-pointer">
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={e => {
                  const v = parseFloat(e.target.value);
                  setVolume(v);
                  if (v > 0 && muted) setMuted(false);
                }}
                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: 'var(--color-pink)' }}
              />
            </div>
          </div>
        )}

        {/* Main audio player controls */}
        <div className="flex items-center gap-2">
          {playing && (
            <div className="flex items-end gap-[3px] h-5 mr-1">
              {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    background: 'var(--color-pink)',
                    height: `${h * 100}%`,
                    animation: `bounce ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => setExpanded(e => !e)}
            className="glass rounded-full w-10 h-10 flex items-center justify-center transition-all cursor-pointer"
            style={{
              border: '1px solid rgba(233,30,140,0.3)',
              color: 'var(--color-pink)',
            }}
            title="Music settings"
          >
            <Music size={16} />
          </button>

          <button
            onClick={handlePlayClick}
            className="rounded-full w-12 h-12 flex items-center justify-center transition-all pulse-glow cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, var(--color-pink), var(--color-purple))',
              boxShadow: '0 4px 20px rgba(233,30,140,0.4)',
            }}
            title={playing ? 'Pause' : 'Play Jaavedaan Hai'}
          >
            {playing ? <Pause size={18} fill="white" color="white" /> : <Play size={18} fill="white" color="white" />}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          from { transform: scaleY(0.3); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </>
  );
}
