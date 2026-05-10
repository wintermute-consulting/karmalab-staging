import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  stroke?: number;
}

const mkIcon = (paths: React.ReactNode) =>
  ({ size = 20, stroke = 1.75, style, ...p }: IconProps) => (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round"
      style={style} {...p}
    >
      {paths}
    </svg>
  );

export const IconMenu = mkIcon(<>
  <line x1="3" y1="7" x2="21" y2="7" />
  <line x1="3" y1="17" x2="21" y2="17" />
</>);

export const IconClose = mkIcon(<>
  <line x1="6" y1="6" x2="18" y2="18" />
  <line x1="6" y1="18" x2="18" y2="6" />
</>);

export const IconPlay = mkIcon(
  <polygon points="7 5 19 12 7 19 7 5" fill="currentColor" stroke="none" />
);

export const IconPause = mkIcon(<>
  <rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
  <rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
</>);

export const IconVolume = mkIcon(<>
  <polygon points="4 10 9 10 13 6 13 18 9 14 4 14 4 10" fill="currentColor" stroke="currentColor" />
  <path d="M17 9c1.2 1 1.8 2.2 1.8 3s-.6 2-1.8 3" />
  <path d="M19.5 7c2 1.5 3 3.2 3 5s-1 3.5-3 5" />
</>);

export const IconVolumeOff = mkIcon(<>
  <polygon points="4 10 9 10 13 6 13 18 9 14 4 14 4 10" fill="currentColor" stroke="currentColor" />
  <line x1="17" y1="9" x2="22" y2="14" />
  <line x1="22" y1="9" x2="17" y2="14" />
</>);

export const IconArrowDown = mkIcon(<>
  <line x1="12" y1="5" x2="12" y2="19" />
  <polyline points="6 13 12 19 18 13" />
</>);

export const IconArrowRight = mkIcon(<>
  <line x1="5" y1="12" x2="19" y2="12" />
  <polyline points="13 6 19 12 13 18" />
</>);

export const IconFullscreen = mkIcon(<>
  <polyline points="15 3 21 3 21 9" />
  <polyline points="9 21 3 21 3 15" />
  <line x1="21" y1="3" x2="14" y2="10" />
  <line x1="3" y1="21" x2="10" y2="14" />
</>);

export const IconArrowUpRight = mkIcon(<>
  <line x1="7" y1="17" x2="17" y2="7" />
  <polyline points="8 7 17 7 17 16" />
</>);

export const IconPlus = mkIcon(<>
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
</>);
