import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { KLSectionNumber, ParallaxImage } from '../Primitives';
import { sectionWrap, sectionWrapClass } from './shared';

const ParallaxVideo = ({
  src,
  speed = 0.15,
  style,
}: {
  src: string;
  speed?: number;
  style?: CSSProperties;
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = (el.parentElement ?? el).getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [speed]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      style={{ ...style, transform: `translateY(${offset}px)`, willChange: 'transform' }}
    />
  );
};

const disciplines = [
  {
    n: '01',
    label: 'Films & commercials',
    copy: 'Ideas brought to screen through film, motion, and visual storytelling.',
    href: '/projects/films-and-commercials',
  },
  {
    n: '02',
    label: 'Interactive installations',
    copy: 'Spaces that react, transform, and invite people to participate.',
    href: '/projects/interactive-installations',
  },
  {
    n: '03',
    label: 'Digital experiences',
    copy: 'Online experiences designed to be explored, played with, and shared.',
    href: '/projects/digital-experiences',
  },
  {
    n: '04',
    label: 'AI & generative systems',
    copy: 'Creative tools and visuals powered by generative technologies.',
    href: '/projects/ai-and-generative-systems',
  },
];

export const SectionWhatWeDo = () => (
  <section
    id="what-we-do"
    className={`kl-what-we-do grid overflow-hidden bg-kl-black w-full`}
    style={{
      position: 'relative',
      zIndex: 4,
      gridTemplateColumns: '3fr 2fr',
    }}
  >
    {/* Left: header + intro text + 2×2 discipline grid */}
    <div
      className="kl-what-we-do-left"
      style={{ padding: 'clamp(72px, 10vw, 128px) clamp(24px, 5vw, 72px)' }}
    >
      <div className="mb-12">
        <KLSectionNumber n="01" label="What we do" />
      </div>

      <div className="mb-16">
        <p
          className="font-sans font-light leading-[1.6] tracking-[-0.01em] text-kl-bone m-0"
          style={{ fontSize: 'clamp(18px, 1.7vw, 22px)' }}
        >
          You come to us when something needs to take shape. <br />
          <span className="text-kl-pink">With just an idea.</span>
        </p>
        <p
          className="font-sans font-light leading-[1.6] tracking-[-0.01em] text-kl-fog mt-2.5 mb-0"
          style={{ fontSize: 'clamp(18px, 1.7vw, 23px)' }}
        >
          We design the hybrid pipeline that makes it work.
        </p>
      </div>

      {/* 2×2 discipline grid */}
      <div className="grid grid-cols-2 border border-white/8 rounded-2xl overflow-hidden">
        {disciplines.map((d, i) => (
          <a
            key={d.n}
            href={d.href}
            className="kl-discipline-cell block no-underline p-7"
            style={{
              borderRight: i % 2 === 0 ? '1px solid var(--border-1)' : 'none',
              borderBottom: i < 2 ? '1px solid var(--border-1)' : 'none',
            }}
          >
            <div className="kl-discipline-cell-label font-sans font-normal text-xl tracking-[-0.02em] text-kl-bone leading-[1.2] mb-2.5">
              <span className="font-mono text-sm tracking-widest text-kl-pink mr-1.5">{d.n}</span>
              {d.label}
            </div>
            <p className="text-kl-fog text-sm leading-normal m-0 font-light">{d.copy}</p>
          </a>
        ))}
      </div>
    </div>

    {/* Right: large image area, edge-to-edge on the right */}
    <div className="kl-what-we-do-right bg-kl-black relative overflow-hidden min-h-150">
      <ParallaxImage
        src={`${import.meta.env.BASE_URL}assets/shape_1.png`}
        speed={0.2}
        style={{
          position: 'absolute',
          top: '20px',
          right: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'right top',
        }}
        float
      />
    </div>
  </section>
);
