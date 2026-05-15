import type { CSSProperties } from 'react';

/** Static Tailwind classes for all section wrappers. Keep kl-section-wrap for mobile breakpoint override. */
export const sectionWrapClass = 'relative z-[4] bg-kl-black max-w-[1400px] mx-auto w-full';

/** Residual inline styles — only what can't be expressed as a Tailwind class (clamp padding). */
export const sectionWrap: CSSProperties = {
  padding: '96px clamp(24px, 5vw, 72px) 96px',
};
