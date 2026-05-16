import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { KLSectionNumber } from '../KLSectionNumber';
import { IconArrowRight } from '../Icons';
import { ParallaxImage } from '../ParallaxImage';
import { sectionWrapClass } from './shared';
import { KLButton } from '../KLButton';

const ParallaxDiv = ({
  children,
  speed = 0,
  className,
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
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
      className={className}
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
    link: undefined as { label: string; href: string } | undefined,
  },
  {
    n: '02',
    label: 'Production',
    lead: 'Then we build it together.',
    lines: ['We assemble the team.', 'We direct the process.'],
    link: {
      label: 'Our projects',
      href: '/projects',
    },
  },
  {
    n: '03',
    label: 'Technology',
    lead: 'We design with transparency and the right tool for the job.',
    lines: [
      'What matters for us is to show you how it works.',
      'This knowledge is part of the process.',
    ],
    link: undefined as { label: string; href: string } | undefined,
  },
];

type Phase = (typeof phases)[number];

const PhaseCard = ({ phase }: { phase: Phase }) => (
  <div className="p-7 pb-10 border-y sm:border-x border-(--border-solid)">
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
        className={`mb-1 text-kl-fog text-[15px] leading-[1.55] ${li === 0 ? 'mt-4' : 'mt-1'}`}
      >
        {line}
      </p>
    ))}
    {phase.link && (
      <KLButton variant="text" size="md" href={phase.link.href}>
        {phase.link.label} <IconArrowRight size={14} />
      </KLButton>
    )}
  </div>
);

// Black-bg container with a parallax shape inside, merges borders via negative margins
const ImgBox = ({
  aspectRatio = '4/3',
  speed = 0.12,
  className,
  src = `${import.meta.env.BASE_URL}assets/shape_1.png`,
}: {
  aspectRatio?: string;
  speed?: number;
  className?: string;
  src?: string;
}) => (
  <div
    className={['relative bg-black', className].filter(Boolean).join(' ')}
    style={{ aspectRatio }}
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
  <section id="how-it-works" className={`${sectionWrapClass} max-md:px-0!`}>
    <div className="mb-4 md:mb-14 max-md:px-6">
      <KLSectionNumber n="02" label="How it works" />
    </div>

    {/* Stair layout — no gap between columns, borders merge via marginLeft: -1 */}
    <div className="flex md:items-start max-md:flex-col">
      {/* ── Column 1 ── */}
      <div className="flex-1 flex flex-col">
        <ParallaxDiv speed={0} className="md:mt-22">
          <PhaseCard phase={phases[0]} />
        </ParallaxDiv>
        <ImgBox
          src={`${import.meta.env.BASE_URL}assets/pipeline.png`}
          aspectRatio="4/3"
          speed={0.1}
          className="md:mt-10 md:mr-px"
        />
      </div>

      {/* ── Column 2 ── */}
      <div className="flex-1 flex flex-col">
        <ImgBox
          src={`${import.meta.env.BASE_URL}assets/production_1.png`}
          speed={-0.1}
          className="md:mb-2.5 max-md:hidden"
          aspectRatio="16/9"
        />
        <ParallaxDiv speed={0.04} className="md:mt-5 md:-ml-px">
          <PhaseCard phase={phases[1]} />
        </ParallaxDiv>
        <ImgBox
          src={`${import.meta.env.BASE_URL}assets/production_2.png`}
          speed={0.3}
          className="mt-2.5 mr-px max-md:hidden"
        />
      </div>

      {/* ── Column 3 ── */}
      <div className="flex-1 flex flex-col">
        <ImgBox
          src={`${import.meta.env.BASE_URL}assets/technology_2.png`}
          aspectRatio="4/3"
          speed={0.2}
          className="md:mt-10"
        />
        <ParallaxDiv speed={0.1} className="md:mt-15 md:-ml-px">
          <PhaseCard phase={phases[2]} />
        </ParallaxDiv>
      </div>
    </div>
  </section>
);
