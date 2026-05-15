import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { KLSectionNumber, ParallaxImage } from '../Primitives';
import { sectionWrap, sectionWrapClass } from './shared';

const ParallaxDiv = ({
  children,
  speed = 0,
  style,
}: {
  children: ReactNode;
  speed?: number;
  style?: CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (speed === 0) return;
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
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
    <div
      ref={ref}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: speed !== 0 ? 'transform' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const phases = [
  {
    n: '01',
    label: 'Pipeline design',
    lead: 'You come with something vague or partial.',
    lines: ['You leave with clarity.', 'You can also stay and build it with us.'],
  },
  {
    n: '02',
    label: 'Production',
    lead: 'Then we build it together.',
    lines: ['We assemble the team.', 'We direct the process.'],
  },
  {
    n: '03',
    label: 'Technology',
    lead: 'We design with transparency and the right tool for the job.',
    lines: [
      'What matters for us is to show you how it works.',
      'This knowledge is part of the process.',
    ],
  },
];

type Phase = (typeof phases)[number];

const B = '1px solid var(--border-solid)';

const PhaseCard = ({ phase, style }: { phase: Phase; style?: CSSProperties }) => (
  <div className="p-7 pb-10" style={{ border: B, ...style }}>
    <div className="font-sans font-normal text-[28px] tracking-[-0.02em] text-kl-bone leading-[1.12]">
      <span className="font-mono text-sm tracking-widest text-kl-pink mr-1.5">{phase.n}</span>
      {phase.label}
    </div>
    <p className="mt-5 text-kl-bone text-[17px] leading-normal font-sans font-light">
      {phase.lead}
    </p>
    {phase.lines.map((line, li) => (
      <p
        key={li}
        className="mb-1 text-kl-fog text-[15px] leading-[1.55]"
        style={{ marginTop: li === 0 ? 16 : 4 }}
      >
        {line}
      </p>
    ))}
  </div>
);

// Black-bg container with a parallax shape inside, merges borders via negative margins
const ImgBox = ({
  aspectRatio = '4/3',
  speed = 0.12,
  style,
  src = `${import.meta.env.BASE_URL}assets/shape_1.png`,
}: {
  aspectRatio?: string;
  speed?: number;
  style?: CSSProperties;
  src?: string;
}) => (
  <div
    style={{
      position: 'relative',
      // overflow: 'hidden',
      background: '#000',
      aspectRatio,
      ...style,
    }}
  >
    <ParallaxImage
      src={src}
      speed={speed}
      float
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
        opacity: 0.7,
      }}
    />
  </div>
);

export const SectionHowItWorks = () => (
  <section id="how-it-works" className={`kl-section-wrap ${sectionWrapClass}`} style={sectionWrap}>
    <div className="mb-14">
      <KLSectionNumber n="02" label="How it works" />
    </div>

    {/* Stair layout — no gap between columns, borders merge via marginLeft: -1 */}
    <div className="kl-hiw-stair flex items-start">
      {/* ── Column 1 ── */}
      <div className="flex-1 flex flex-col">
        <ParallaxDiv speed={0} style={{ marginTop: 90 }}>
          <PhaseCard phase={phases[0]} />
        </ParallaxDiv>
        <ImgBox
          src={`${import.meta.env.BASE_URL}assets/pipeline.png`}
          aspectRatio="4/3"
          speed={0.1}
          style={{ marginTop: 40, marginRight: 1 }}
        />
      </div>

      {/* ── Column 2 ── */}
      <div className="flex-1 flex flex-col">
        <ImgBox
          src={`${import.meta.env.BASE_URL}assets/production_1.png`}
          speed={-0.1}
          style={{ marginBottom: 10 }}
          aspectRatio="16/9"
        />
        <ParallaxDiv speed={0.04} style={{ marginTop: 20, marginLeft: -1 }}>
          <PhaseCard phase={phases[1]} />
        </ParallaxDiv>
        <ImgBox
          src={`${import.meta.env.BASE_URL}assets/production_2.png`}
          speed={0.3}
          style={{ marginTop: 10, marginRight: 1 }}
        />
      </div>

      {/* ── Column 3 ── */}
      <div className="flex-1 flex flex-col">
        <ImgBox
          src={`${import.meta.env.BASE_URL}assets/technology_2.png`}
          aspectRatio="4/3"
          speed={0.2}
          style={{ marginTop: 40 }}
        />
        <ParallaxDiv speed={0.1} style={{ marginTop: 60, marginLeft: -1 }}>
          <PhaseCard phase={phases[2]} />
        </ParallaxDiv>
      </div>
    </div>
  </section>
);
