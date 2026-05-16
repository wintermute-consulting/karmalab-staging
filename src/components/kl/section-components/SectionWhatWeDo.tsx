import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { KLSectionNumber } from '../KLSectionNumber';
import { ParallaxImage } from '../ParallaxImage';
import { KLButton } from '../KLButton';
import { IconArrowRight } from '../Icons';

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

export const SectionWhatWeDo = () => (
  <section
    id="what-we-do"
    className="grid overflow-hidden bg-kl-black w-full relative z-5 grid-cols-[3fr_2fr] max-md:grid-cols-1"
  >
    {/* Left: header + intro text + 2×2 discipline grid */}
    <div className="sm:pt-24 sm:pb-24 pt-10 px-6 sm:px-16 md:px-24 relative">
      <div className="absolute sm:hidden top-4 right-0 w-[30%] min-h-[100vw] pointer-events-none z-0">
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

      <div className="mb-6 sm:mb-12 relative z-1">
        <KLSectionNumber n="01" label="The problem" />
      </div>

      <div className="mb-8 sm:mb-16 relative z-1 space-y-3 text-lg sm:text-2xl font-sans font-light leading-relaxed">
        <p className="text-kl-bone pr-28 sm:pr-0">
          Most projects start from <span className="text-kl-pink">tools instead of structure</span>.
        </p>
        <p className="text-kl-bone pr-16 sm:pr-0">
          So things move fast but they don't always hold.
        </p>
        <p className="text-kl-fog">It all comes down to how you build it.</p>
      </div>

      <div className="mb-6 sm:mb-12 relative z-1">
        <KLSectionNumber n="02" label="What we do" />
      </div>

      <div className="mb-8 sm:mb-16 relative z-1 space-y-3 text-lg sm:text-2xl font-sans font-light leading-relaxed">
        <p className="text-kl-bone">
          You come to us when something needs to take shape. <br />
          <span className="text-kl-pink">With just an idea.</span>
        </p>
        <p className="text-kl-fog">We design the hybrid pipeline that makes it work.</p>
      </div>
    </div>

    {/* Right: large image area, edge-to-edge on the right */}
    <div className="relative max-sm:hidden">
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
