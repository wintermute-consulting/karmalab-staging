import { useState, useRef, useEffect } from 'react';
import { KLIconButton } from './KLIconButton';
import { KLButton } from './KLButton';
import {
  IconPlay,
  IconPause,
  IconVolume,
  IconVolumeOff,
  IconFullscreen,
  IconRestart,
  IconArrowRight,
} from './Icons';

const REEL_SRC = 'https://videos.pexels.com/video-files/7794287/7794287-hd_1920_1080_25fps.mp4';

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
  const [active, setActive] = useState(true);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      setActive(true);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => setActive(false), 2000);
    };
    resetTimer();
    window.addEventListener('mousemove', resetTimer, { passive: true });
    window.addEventListener('scroll', resetTimer, { passive: true });
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const h1 = vh * (tweaks.heroHeightVh / 100);
      const h2 = vh * (tweaks.reelPinVh / 100);
      let p: number;
      if (y < h1) {
        p = y / h1;
      } else if (y < h1 + h2) {
        p = 1 + (y - h1) / h2;
      } else {
        p = 2 + Math.min(1, (y - h1 - h2) / (vh * 0.5));
      }
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [tweaks.heroHeightVh, tweaks.reelPinVh]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
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

  const scrollControlsOpacity =
    progress >= 0.92 && progress <= 2.0
      ? Math.min(1, Math.max(0, (progress - 0.92) / 0.22)) *
        Math.min(1, Math.max(0, (1.88 - progress) / 0.16))
      : 0;
  const controlsOpacity = scrollControlsOpacity * (active ? 1 : 0);

  const grainSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.35'/></svg>`,
  );

  return (
    <>
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none bg-kl-black">
        <video
          ref={videoRef}
          src={REEL_SRC}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity,
            filter: `blur(${blur}px) saturate(${0.6 + 0.4 * Math.min(1, progress)})`,
            transition: 'filter 120ms linear',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.9) 100%),
                       linear-gradient(180deg, rgba(0,0,0,${0.35 + 0.15 * (1 - Math.min(1, progress))}) 0%, rgba(0,0,0,.2) 40%, rgba(0,0,0,.5) 100%)`,
            opacity,
          }}
        />
        {tweaks.grainOn && (
          <div
            className="absolute inset-0 mix-blend-overlay opacity-[0.22] pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml;utf8,${grainSvg}")` }}
          />
        )}
      </div>

      {/* Reel controls */}
      <div
        className="fixed inset-x-0 bottom-12 flex justify-center"
        style={{
          gap: 14,
          opacity: controlsOpacity,
          pointerEvents: controlsOpacity > 0.1 ? 'auto' : 'none',
          transition: 'opacity 500ms ease',
          zIndex: 4,
        }}
      >
        <KLIconButton
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            v.currentTime = 0;
            v.play();
            setPlaying(true);
          }}
          accent="lime"
          title="Restart"
          size={52}
        >
          <IconRestart size={20} />
        </KLIconButton>
        <KLIconButton
          onClick={togglePlay}
          accent="lime"
          title={playing ? 'Pause reel' : 'Play reel'}
          size={52}
        >
          {playing ? <IconPause size={20} /> : <IconPlay size={20} />}
        </KLIconButton>
        <KLIconButton
          onClick={toggleMute}
          accent="lime"
          title={muted ? 'Unmute' : 'Mute'}
          size={52}
        >
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
      <div
        className="sticky top-0 h-screen grid items-center grid-cols-[1.1fr_1fr] p-[0_clamp(24px,6vw,96px)] gap-[clamp(24px,6vw,80px)] max-md:grid-cols-1! max-md:p-[0_24px_32px]! max-md:gap-4! max-md:justify-items-center!"
        style={{
          opacity: fade,
          transform: `translateY(${shift}px)`,
        }}
      >
        {/* Left: logo */}
        <div className="flex items-center justify-center max-md:w-[min(220px,60vw)] max-md:aspect-square max-md:mt-4">
          <img
            src={`${import.meta.env.BASE_URL}uploads/chrome_logo_transparent.png`}
            alt="KarmaLab"
            className="w-full h-full object-contain"
            style={{ animation: 'kl-breathe 9s ease-in-out infinite' }}
          />
        </div>

        {/* Right: tagline */}
        <div className="flex flex-col max-w-155 gap-12 max-md:max-w-full max-md:gap-6">
          <h1
            className="max-md:text-[clamp(26px,7.5vw,40px)]! max-md:tracking-[-1px]!"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 5vw, 54px)',
              lineHeight: 1.15,
              letterSpacing: '-2px',
              color: 'var(--kl-bone)',
              margin: 0,
            }}
          >
            <div className="mb-4">{tweaks.tagline1}</div>
            <div className="text-kl-pink font-light">{tweaks.tagline2}</div>
          </h1>

          <div className="flex items-center flex-wrap gap-5 max-md:flex-col max-md:items-start max-md:gap-2.5">
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
            <KLButton variant="text" size="lg" onClick={onContact}>
              or get in touch <IconArrowRight size={14} />
            </KLButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute left-1/2 flex flex-col items-center max-md:hidden"
          aria-hidden
          style={{
            bottom: 36,
            gap: 6,
            transform: 'translateX(-50%)',
            opacity: fade * (1 - hp * 3),
            pointerEvents: 'none',
            animation: 'kl-scroll-bounce 2s ease-in-out infinite',
          }}
        >
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-kl-ash">
            scroll
          </span>
          <svg
            width="16"
            height="22"
            viewBox="0 0 16 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="15"
              height="21"
              rx="7.5"
              stroke="var(--kl-ash)"
              strokeOpacity="0.5"
            />
            <rect
              x="7"
              y="4"
              width="2"
              height="6"
              rx="1"
              fill="var(--kl-lime)"
              style={{ animation: 'kl-scroll-bounce 2s ease-in-out infinite' }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

interface ReelPinnedSpacerProps {
  tweaks: Tweaks;
}

export const ReelPinnedSpacer = ({ tweaks }: ReelPinnedSpacerProps) => (
  <section
    style={{
      position: 'relative',
      height: `${tweaks.reelPinVh}vh`,
      zIndex: 3,
      pointerEvents: 'none',
    }}
  >
    <div className="sticky top-0 h-screen pointer-events-none" />
  </section>
);
