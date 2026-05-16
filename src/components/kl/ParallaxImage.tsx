import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

interface ParallaxImageProps {
  src: string;
  alt?: string;
  /** Parallax intensity: 0 = static, 0.15 = subtle (default), 0.3 = strong */
  speed?: number;
  style?: CSSProperties;
  /** Enable a slow floating (up/down) animation */
  float?: boolean;
}

export const ParallaxImage = ({
  src,
  alt = '',
  speed = 0.15,
  style,
  float = false,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const [offset, setOffset] = useState(0);
  // Stable random values per instance (generated once on mount)
  const floatParams = useRef({
    duration: 6 + Math.random() * 10, // 6–16 s
    delay: -(Math.random() * 10), // negative = already mid-cycle on mount
  });

  useEffect(() => {
    if (float) return; // float mode: CSS animation handles movement, no scroll listener needed
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
  }, [speed, float]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      style={{
        ...style,
        ...(float
          ? {
              animation: `kl-float ${floatParams.current.duration}s ${floatParams.current.delay}s cubic-bezier(0.45, 0, 0.55, 1) infinite`,
              willChange: 'transform',
            }
          : { transform: `translateY(${offset}px)`, willChange: 'transform' }),
      }}
    />
  );
};
