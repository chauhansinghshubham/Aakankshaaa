import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import content from '../config/content';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.loop = true;

    const handleLoaded = () => setLoaded(true);
    const handleError = () => setLoaded(false);

    audio.addEventListener('canplaythrough', handleLoaded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplaythrough', handleLoaded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // autoplay blocked or file missing
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const songName = content.music.split('/').pop().replace('.mp3', '').replace(/_/g, ' ');

  return (
    <>
      <audio ref={audioRef} src={content.music} preload="none" />

      <div
        className="fixed z-[9990] flex flex-col items-end gap-2"
        style={{
          fontFamily: 'var(--font-sans)',
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
        }}
      >
        {/* Expanded panel */}
        {expanded && (
          <div
            className="glass rounded-2xl p-4 flex flex-col gap-3 mb-1"
            style={{
              minWidth: 220,
              border: '1px solid rgba(233,30,140,0.2)',
              boxShadow: '0 8px 40px rgba(233,30,140,0.15)',
            }}
          >
            <div className="flex items-center gap-2">
              <Music size={14} style={{ color: 'var(--color-pink)' }} />
              <span className="text-xs truncate capitalize" style={{ color: 'var(--color-muted)', maxWidth: 150 }}>
                {songName || 'Your song'}
              </span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
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

        {/* Main widget */}
        <div className="flex items-center gap-2">
          {playing && (
            <div className="flex items-end gap-[3px] h-5">
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
            className="glass rounded-full w-10 h-10 flex items-center justify-center transition-all"
            style={{
              border: '1px solid rgba(233,30,140,0.3)',
              color: 'var(--color-pink)',
            }}
            title="Music settings"
          >
            <Music size={16} />
          </button>

          <button
            onClick={toggle}
            className="rounded-full w-12 h-12 flex items-center justify-center transition-all pulse-glow"
            style={{
              background: 'linear-gradient(135deg, var(--color-pink), var(--color-purple))',
              boxShadow: '0 4px 20px rgba(233,30,140,0.4)',
            }}
            title={playing ? 'Pause' : 'Play'}
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
