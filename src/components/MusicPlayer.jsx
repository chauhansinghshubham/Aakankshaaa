import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Heart, Shuffle, Repeat, SkipBack, SkipForward, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../config/content';

function SpotifyIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.306c-.215.353-.674.464-1.026.25-2.812-1.718-6.353-2.107-10.523-1.155-.403.092-.807-.16-.9-.562-.092-.404.16-.807.563-.9 4.566-1.043 8.487-.597 11.636 1.339.352.215.464.675.25 1.028zm1.467-3.262c-.27.44-.848.578-1.287.308-3.22-1.978-8.128-2.55-11.936-1.393-.497.151-1.024-.132-1.176-.628-.15-.497.133-1.025.63-1.177 4.354-1.321 9.775-.68 13.46 1.583.44.27.578.847.309 1.307zm.126-3.41c-3.86-2.293-10.232-2.505-13.918-1.386-.593.18-1.223-.156-1.403-.75-.18-.593.156-1.223.75-1.403 4.238-1.287 11.278-1.037 15.733 1.609.533.316.707 1.01.39 1.543-.316.533-1.01.706-1.552.387z" />
    </svg>
  );
}

export default function MusicPlayer({ hasReachedLastPage = false }) {
  const audioRef = useRef(null);
  const popupTimerRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [expanded, setExpanded] = useState(false);
  const [playAttemptCount, setPlayAttemptCount] = useState(0);
  const [popup, setPopup] = useState(null);
  const [showSpotifyCard, setShowSpotifyCard] = useState(false);
  const [isLiked, setIsLiked] = useState(true);

  // Audio track timing
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(266); // ~4:26 default fallback for Samjhawan

  // Scroll detection fallback
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 650;
      if (scrollPos >= threshold) {
        setIsAtBottom(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isFinalPageReached = hasReachedLastPage || isAtBottom;

  const showPopup = useCallback((message, emoji = '✨') => {
    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    setPopup({ message, emoji, id: Date.now() });
    popupTimerRef.current = setTimeout(() => {
      setPopup(null);
    }, 7000);
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

  // If user reaches last page while music is already playing, reveal Spotify card
  useEffect(() => {
    if (isFinalPageReached && playing) {
      setShowSpotifyCard(true);
    }
  }, [isFinalPageReached, playing]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlayClick = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // If already playing, pausing is always allowed
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    // SCENARIO 1: User taps play AFTER reaching end of page -> Spotify Animation + Play!
    if (isFinalPageReached) {
      try {
        await audio.play();
        setPlaying(true);
        setShowSpotifyCard(true);
      } catch (err) {
        console.error('Audio play error:', err);
      }
      return;
    }

    // SCENARIO 2: User taps play BEFORE reaching end of page
    if (playAttemptCount === 0) {
      // 1st attempt: Do NOT play, show requested cute warning
      setPlayAttemptCount(1);
      showPopup('Pehle meri baatein sun lo Aakanksha, fir gaane sun lenaaa', '🥺');
      return;
    }

    // 2nd attempt before reaching end: Let her listen!
    setPlayAttemptCount((prev) => prev + 1);
    showPopup('Achha thik hain agar itna hi mann hain toh sun hi lo pehle 😉🎶', '🙈');
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

  const songTitle = content.musicTitle || 'Samjhawan - Arijit Singh, Shreya Ghoshal';

  return (
    <>
      <audio
        ref={audioRef}
        src={content.music}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div
        className="fixed z-[9990] flex flex-col items-end gap-2"
        style={{
          fontFamily: 'var(--font-sans)',
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
        }}
      >
        {/* ── PLAYFUL TOAST POPUP (Before end of page) ── */}
        <AnimatePresence>
          {popup && (
            <motion.div
              key={popup.id}
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 350 }}
              className="max-w-[310px] sm:max-w-sm p-3.5 sm:p-4 rounded-2xl pointer-events-auto cursor-pointer select-none mb-1 text-left"
              style={{
                background: 'linear-gradient(135deg, rgba(28, 14, 40, 0.97) 0%, rgba(10, 8, 18, 0.99) 100%)',
                border: '1.5px solid rgba(233, 30, 140, 0.55)',
                boxShadow: '0 15px 45px rgba(0, 0, 0, 0.8), 0 0 30px rgba(233, 30, 140, 0.3)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              onClick={() => setPopup(null)}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-2xl shrink-0 select-none">{popup.emoji}</span>
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

        {/* ── SPOTIFY NOW PLAYING ANIMATION CARD (Triggered when reaching end) ── */}
        <AnimatePresence>
          {showSpotifyCard && (
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.9 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="w-[92vw] max-w-[340px] sm:max-w-[370px] p-4 sm:p-5 rounded-3xl text-left select-none mb-2 overflow-hidden relative"
              style={{
                background: 'linear-gradient(180deg, #181818 0%, #101010 100%)',
                border: '1.5px solid rgba(29, 185, 84, 0.45)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(29, 185, 84, 0.25)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
              }}
            >
              {/* Subtle Spotify Ambient Glow */}
              <div
                className="absolute -top-16 -left-16 w-36 h-36 rounded-full pointer-events-none blur-3xl opacity-30"
                style={{ background: '#1DB954' }}
              />

              {/* Spotify Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2">
                  <SpotifyIcon className="w-5 h-5 text-[#1DB954]" />
                  <span className="text-[11px] font-bold tracking-wider text-[#1DB954] uppercase flex items-center gap-1.5 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-ping" />
                    Spotify Now Playing
                  </span>
                </div>
                <button
                  onClick={() => setShowSpotifyCard(false)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Minimize"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Album Art & Spinning Vinyl Record Animation */}
              <div className="flex items-center gap-3.5 my-4 relative z-10">
                {/* Vinyl Record & Sleeve Container */}
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
                  {/* Rotating Vinyl Record */}
                  <motion.div
                    animate={playing ? { rotate: 360 } : { rotate: 0 }}
                    transition={playing ? { duration: 3.5, repeat: Infinity, ease: 'linear' } : { duration: 0.6 }}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#0a0a0a] border-2 border-[#252525] shadow-xl flex items-center justify-center relative overflow-hidden select-none"
                    style={{
                      boxShadow: '0 8px 25px rgba(0,0,0,0.9), inset 0 0 10px rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Vinyl Grooves */}
                    <div className="absolute inset-1.5 rounded-full border border-white/5" />
                    <div className="absolute inset-3 rounded-full border border-white/5" />
                    <div className="absolute inset-4.5 rounded-full border border-white/5" />

                    {/* Center Vinyl Label */}
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-[#1DB954] shadow-md relative z-10 flex items-center justify-center bg-zinc-900">
                      <img
                        src="/photos/profile.jpg"
                        alt="Samjhawan"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {/* Spindle hole */}
                      <div className="absolute w-1.5 h-1.5 rounded-full bg-black border border-white/40" />
                    </div>
                  </motion.div>
                </div>

                {/* Track Info & Bouncing Equalizer */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-white font-bold text-sm sm:text-base truncate font-sans tracking-wide">
                      Samjhawan
                    </h4>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="text-[#1DB954] hover:scale-110 transition-transform cursor-pointer p-0.5"
                      title={isLiked ? 'Liked' : 'Like'}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#1DB954]' : ''}`} />
                    </button>
                  </div>

                  <p className="text-xs text-[#b3b3b3] truncate mt-0.5 font-sans">
                    Arijit Singh, Shreya Ghoshal
                  </p>
                  <p className="text-[10px] text-[#1DB954] font-medium tracking-wide mt-0.5 truncate">
                    Humpty Sharma Ki Dulhania
                  </p>

                  {/* Bouncing Green Spotify Equalizer */}
                  {playing && (
                    <div className="flex items-end gap-[3px] h-3.5 mt-2">
                      {[0.5, 1, 0.4, 0.85, 0.65, 0.9].map((h, i) => (
                        <div
                          key={i}
                          className="w-[2.5px] rounded-full bg-[#1DB954]"
                          style={{
                            height: `${h * 100}%`,
                            animation: `spotifyBounce ${0.45 + i * 0.09}s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.07}s`,
                          }}
                        />
                      ))}
                      <span className="text-[10px] text-[#1DB954] font-sans font-medium ml-1.5 tracking-wider">
                        PLAYING
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Scrubber Bar */}
              <div className="relative z-10 mb-3">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.5}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/15 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: '#1DB954' }}
                />
                <div className="flex justify-between text-[10px] text-[#b3b3b3] font-mono mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Spotify Player Control Buttons */}
              <div className="flex items-center justify-between relative z-10 pt-1">
                <button
                  type="button"
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                  title="Shuffle"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSeek({ target: { value: Math.max(0, currentTime - 10) } })}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Rewind 10s"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                {/* Main Play/Pause Button (Spotify signature white circle) */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handlePlayClick}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg transition-transform cursor-pointer"
                  title={playing ? 'Pause' : 'Play'}
                >
                  {playing ? (
                    <Pause className="w-4 h-4 fill-black text-black" />
                  ) : (
                    <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={() => handleSeek({ target: { value: Math.min(duration, currentTime + 10) } })}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                  title="Forward 10s"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  className="text-[#1DB954] hover:scale-110 transition-transform cursor-pointer relative"
                  title="Repeat"
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span className="w-1 h-1 rounded-full bg-[#1DB954] absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </button>
              </div>

              {/* Sweet dedication footer */}
              <div className="mt-3 pt-2.5 border-t border-white/10 text-center">
                <p className="text-[11px] font-serif italic text-pink-200/80">
                  "Main tenu samjhawan ki... na tere bina lagda jee" 🤍
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── EXPANDED MUSIC SETTINGS PANEL ── */}
        {expanded && !showSpotifyCard && (
          <div
            className="glass rounded-2xl p-4 flex flex-col gap-3 mb-1"
            style={{
              minWidth: 240,
              background: 'rgba(18, 14, 26, 0.95)',
              border: '1px solid rgba(29, 185, 84, 0.35)',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(29, 185, 84, 0.2)',
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <SpotifyIcon className="w-4 h-4 text-[#1DB954] shrink-0" />
                <span className="text-xs truncate font-medium text-white/90" style={{ maxWidth: 170 }}>
                  {songTitle}
                </span>
              </div>
              {isFinalPageReached && (
                <button
                  onClick={() => setShowSpotifyCard(true)}
                  className="text-[10px] text-[#1DB954] hover:underline shrink-0 font-medium"
                >
                  Expand ↗
                </button>
              )}
            </div>

            {/* Volume Scrubber */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setVolume(v);
                  if (v > 0 && muted) setMuted(false);
                }}
                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#1DB954' }}
              />
            </div>
          </div>
        )}

        {/* ── MAIN FLOATING MUSIC CONTROLS ── */}
        <div className="flex items-center gap-2">
          {/* Bouncing Equalizer indicator when playing */}
          {playing && (
            <div
              onClick={() => isFinalPageReached && setShowSpotifyCard(true)}
              className="flex items-end gap-[3px] h-5 mr-1 cursor-pointer"
              title={isFinalPageReached ? 'Open Spotify Player' : 'Playing Samjhawan'}
            >
              {[0.6, 1, 0.4, 0.85, 0.5].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    background: '#1DB954',
                    height: `${h * 100}%`,
                    animation: `spotifyBounce ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Settings / Spotify Toggle button */}
          <button
            onClick={() => {
              if (isFinalPageReached) {
                setShowSpotifyCard((prev) => !prev);
              } else {
                setExpanded((e) => !e);
              }
            }}
            className="glass rounded-full w-10 h-10 flex items-center justify-center transition-all cursor-pointer relative"
            style={{
              border: isFinalPageReached
                ? '1px solid rgba(29, 185, 84, 0.4)'
                : '1px solid rgba(233, 30, 140, 0.3)',
              color: isFinalPageReached ? '#1DB954' : 'var(--color-pink)',
            }}
            title={isFinalPageReached ? 'Spotify Player' : 'Music Settings'}
          >
            {isFinalPageReached ? <SpotifyIcon className="w-4 h-4 text-[#1DB954]" /> : <Music size={16} />}
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={handlePlayClick}
            className="rounded-full w-12 h-12 flex items-center justify-center transition-all cursor-pointer shadow-xl"
            style={{
              background: playing
                ? 'linear-gradient(135deg, #1DB954 0%, #15883e 100%)'
                : 'linear-gradient(135deg, var(--color-pink), var(--color-purple))',
              boxShadow: playing
                ? '0 4px 20px rgba(29, 185, 84, 0.5)'
                : '0 4px 20px rgba(233, 30, 140, 0.4)',
            }}
            title={playing ? 'Pause' : 'Play Samjhawan'}
          >
            {playing ? (
              <Pause size={18} fill="white" color="white" />
            ) : (
              <Play size={18} fill="white" color="white" className="ml-0.5" />
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spotifyBounce {
          0% { transform: scaleY(0.25); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </>
  );
}
