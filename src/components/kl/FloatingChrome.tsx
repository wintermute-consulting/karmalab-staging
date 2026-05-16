import { useState } from 'react';
import { KLIconButton } from './KLIconButton';
import { KLButton } from './KLButton';
import { IconMenu } from './Icons';

interface FloatingChromeProps {
  onOpenMenu: () => void;
  onOpenContact: () => void;
  scrolled: boolean;
  startHidden?: boolean;
}

export const FloatingChrome = ({
  onOpenMenu,
  onOpenContact,
  scrolled,
  startHidden = false,
}: FloatingChromeProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed inset-x-0 top-0 z-40 flex justify-between items-center"
      style={{
        padding: '24px clamp(20px, 3vw, 36px)',
        transition: 'background 300ms ease, opacity 300ms ease',
        opacity: startHidden && !scrolled && !hovered ? 0 : 1,
        background: scrolled
          ? 'linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,0))'
          : 'transparent',
      }}
    >
      <div className="pointer-events-auto flex items-center gap-4">
        <KLIconButton onClick={onOpenMenu} accent="pink" title="Open menu" size={48}>
          <IconMenu size={20} stroke={2.2} />
        </KLIconButton>
      </div>
      <div className="pointer-events-auto">
        <KLButton size="sm" accent="pink" onClick={onOpenContact}>
          Contact us
        </KLButton>
      </div>
    </div>
  );
};
