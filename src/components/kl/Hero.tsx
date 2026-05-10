import { useState, useRef, useEffect } from 'react';
import { KLIconButton, KLButton } from './Primitives';
import {
  IconPlay, IconPause, IconVolume, IconVolumeOff, IconFullscreen,
  IconArrowRight,
} from './Icons';

const REEL_SRC = 'https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_25fps.mp4';

interface Tweaks {
  tagline1: string;
  tagline2: string;
  accentDominance: string;
  logoTreatment: string;
  heroFadeOpacity: number;
  heroBlurPx: number;
  heroHeightVh: number;
  reelPinVh: number;
  grainOn: boolean;
}

interface ReelFixedProps {
  tweaks: Tweaks;
}

export const ReelFixed = ({ tweaks }: ReelFixedProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const h1 = vh * (tweaks.heroHeightVh / 100);
      const h2 = vh * (tweaks.reelPinVh / 100);
      let p: number;
      if (y < h1) { p = y / h1; }
      else if (y < h1 + h2) { p = 1 + (y - h1) / h2; }
      else { p = 2 + Math.min(1, (y - h1 - h2) / (vh * 0.5)); }
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tweaks.heroHeightVh, tweaks.reelPinVh]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  const toggleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!document.fullscreenElement) {
      v.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const heroFadeMax = tweaks.heroFadeOpacity;
  const heroBlurMax = tweaks.heroBlurPx;
  let opacity: number, blur: number;
  if (progress < 1) {
    const t = progress;
    opacity = heroFadeMax + (1 - heroFadeMax) * t;
    blur = heroBlurMax * (1 - t);
  } else if (progress < 2) {
    opacity = 1;
    blur = 0;
  } else {
    const t = Math.max(0, Math.min(1, progress - 2));
    opacity = 1 - t;
    blur = 0;
  }

  const controlsOpacity =
    progress >= 0.92 && progress <= 2.0
      ? Math.min(1, Math.max(0, (progress - 0.92) / 0.22)) *
        Math.min(1, Math.max(0, (1.88 - progress) / 0.16))
      : 0;

  const grainSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.35'/></svg>`
  );

  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'fixed', inset: 0,
          zIndex: 0, pointerEvents: 'none',
          background: '#000',
        }}
      >
        <video
          ref={videoRef}
          src={REEL_SRC}
          autoPlay loop muted={muted} playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity,
            filter: `blur(${blur}px) saturate(${0.6 + 0.4 * Math.min(1, progress)})`,
            transition: 'filter 120ms linear',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.9) 100%),
                       linear-gradient(180deg, rgba(0,0,0,${0.35 + 0.15 * (1 - Math.min(1, progress))}) 0%, rgba(0,0,0,.2) 40%, rgba(0,0,0,.5) 100%)`,
          opacity,
        }} />
        {tweaks.grainOn && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml;utf8,${grainSvg}")`,
            mixBlendMode: 'overlay',
            opacity: 0.22,
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* Reel controls */}
      <div style={{
        position: 'fixed',
        left: 0, right: 0, bottom: 48,
        display: 'flex', justifyContent: 'center', gap: 14,
        zIndex: 1,
        opacity: controlsOpacity,
        pointerEvents: controlsOpacity > 0.1 ? 'auto' : 'none',
        transition: 'opacity 180ms linear',
      }}>
        <KLIconButton onClick={togglePlay} accent="lime" title={playing ? 'Pause reel' : 'Play reel'} size={52}>
          {playing ? <IconPause size={20} /> : <IconPlay size={20} />}
        </KLIconButton>
        <KLIconButton onClick={toggleMute} accent="lime" title={muted ? 'Unmute' : 'Mute'} size={52}>
          {muted ? <IconVolumeOff size={20} /> : <IconVolume size={20} />}
        </KLIconButton>
        <KLIconButton onClick={toggleFullscreen} accent="lime" title="Fullscreen" size={52}>
          <IconFullscreen size={20} />
        </KLIconButton>
      </div>
    </>
  );
};

interface HeroBlockProps {
  onContact: () => void;
  tweaks: Tweaks;
}

export const HeroBlock = ({ onContact, tweaks }: HeroBlockProps) => {
  const [hp, setHp] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight * (tweaks.heroHeightVh / 100);
      setHp(Math.min(1, window.scrollY / h));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tweaks.heroHeightVh]);

  const fade = Math.max(0, 1 - hp * 1.4);
  const shift = hp * -40;

  return (
    <section style={{ position: 'relative', height: `${tweaks.heroHeightVh}vh`, zIndex: 2 }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        alignItems: 'center',
        padding: '0 clamp(24px, 6vw, 96px)',
        gap: 'clamp(24px, 6vw, 80px)',
        opacity: fade,
        transform: `translateY(${shift}px)`,
      }}>
        {/* Left: logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {tweaks.logoTreatment === 'chrome' ? (
            <div style={{
              width: 'min(560px, 46vw)',
              aspectRatio: '1 / 1',
              position: 'relative',
              animation: 'kl-breathe 9s ease-in-out infinite',
            }}>
              <img
                src="/uploads/chrome_logo_transparent.png"
                alt="KarmaLab"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          ) : (
            <img
              src="/assets/karmalab-logo-white.png"
              alt="KarmaLab"
              style={{ width: 'min(520px, 44vw)' }}
            />
          )}
        </div>

        {/* Right: tagline */}
        <div style={{ maxWidth: 620, display: 'flex', flexDirection: 'column', gap: 48 }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300,
            fontSize: '54px',
            lineHeight: 1.15,
            letterSpacing: '-2px',
            color: 'var(--kl-bone)',
            margin: 0,
          }}>
            {tweaks.tagline1}<br />
            <span style={{
              color: 'var(--kl-pink)',
              fontWeight: 300,
            }}>{tweaks.tagline2}</span>
          </h1>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <KLButton
              size="lg"
              accent={tweaks.accentDominance === 'pink' ? 'pink' : 'lime'}
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight * (tweaks.heroHeightVh / 100) * 0.5,
                  behavior: 'smooth',
                });
              }}
            >
              <IconPlay size={16} />
              Watch video
            </KLButton>
            <KLButton variant="text" size="md" onClick={onContact}>
              or get in touch <IconArrowRight size={14} />
            </KLButton>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ReelPinnedSpacerProps {
  tweaks: Tweaks;
}

export const ReelPinnedSpacer = ({ tweaks }: ReelPinnedSpacerProps) => (
  <section style={{ position: 'relative', height: `${tweaks.reelPinVh}vh`, zIndex: 3 }}>
    <div style={{ position: 'sticky', top: 0, height: '100vh' }} />
  </section>
);
