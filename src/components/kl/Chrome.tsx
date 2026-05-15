import { useState } from 'react';
import { KLIconButton, KLButton, KLMeta } from './Primitives';
import { IconMenu, IconClose, IconArrowRight, IconArrowUpRight } from './Icons';

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

interface DrawerMenuLink {
  id: string;
  n: string;
  label: string;
}

interface DrawerMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenContact: () => void;
  onNavigate: (id: string) => void;
}

const DRAWER_LINKS: DrawerMenuLink[] = [
  { id: 'what-we-do', n: '01', label: 'What we do' },
  { id: 'how-it-works', n: '02', label: 'How it works' },
  { id: 'for-whom', n: '03', label: 'For who' },
  // { id: 'values', n: '04', label: 'Values' },
  { id: 'who-we-are', n: '04', label: 'Who we are' },
  { id: 'cta', n: '05', label: 'Start a project' },
];

export const DrawerMenu = ({ open, onClose, onOpenContact, onNavigate }: DrawerMenuProps) => (
  <>
    {/* backdrop */}
    <div
      onClick={onClose}
      className="fixed inset-0 z-80"
      style={{
        background: 'rgba(0,0,0,.7)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 320ms cubic-bezier(.22,1,.36,1)',
      }}
    />

    {/* drawer */}
    <aside
      className="fixed inset-y-0 left-0 flex flex-col z-81 bg-kl-ink border-r border-white/8 py-7 px-8"
      style={{
        width: 'min(520px, 92vw)',
        transform: open ? 'translateX(0)' : 'translateX(-104%)',
        transition: 'transform 420ms cubic-bezier(.22,1,.36,1)',
        boxShadow: '30px 0 80px rgba(0,0,0,.6)',
      }}
    >
      <div className="flex justify-between items-center shrink-0">
        <img
          src={`${import.meta.env.BASE_URL}uploads/horizontal_logo.png`}
          alt="KarmaLab"
          style={{ height: 40, width: 'auto' }}
        />
        <KLIconButton onClick={onClose} accent="pink" size={40} title="Close menu">
          <IconClose size={18} stroke={2.2} />
        </KLIconButton>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto overflow-x-hidden">
        <nav>
          {DRAWER_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(l.id);
                onClose();
              }}
              className="grid items-baseline gap-3.5 py-4 border-b border-white/8 text-kl-bone no-underline"
              style={{
                gridTemplateColumns: '44px 1fr 20px',
                transition: 'color 180ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--kl-pink)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--kl-bone)';
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.12em] text-kl-ash">{l.n}</span>
              <span className="font-sans font-light text-[30px] tracking-[-0.03em]">{l.label}</span>
              <IconArrowRight
                size={14}
                stroke={1.25}
                style={{ color: 'currentColor', opacity: 0.6 }}
              />
            </a>
          ))}
        </nav>
      </div>

      <div className="pt-6 shrink-0">
        <KLButton
          size="lg"
          onClick={() => {
            onClose();
            onOpenContact();
          }}
        >
          Start a project <IconArrowUpRight size={16} />
        </KLButton>
      </div>

      <img
        src={`${import.meta.env.BASE_URL}assets/menu_shape.png`}
        alt=""
        className="absolute bottom-0 right-0 pointer-events-none block h-auto"
        style={{ width: 'clamp(120px, 60%, 260px)' }}
      />
    </aside>
  </>
);

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const CONTACTS = [
  { label: 'Email', value: 'start@karmalab.tech', href: 'mailto:start@karmalab.tech' },
  { label: 'Instagram', value: '@karmalab.tech', href: 'https://instagram.com/karmalab.tech' },
];

export const ContactModal = ({ open, onClose }: ContactModalProps) => (
  <>
    <div
      onClick={onClose}
      className="fixed inset-0 z-90"
      style={{
        background: 'rgba(0,0,0,.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 320ms cubic-bezier(.22,1,.36,1)',
      }}
    />

    <div
      className="fixed top-1/2 left-1/2 z-91 bg-kl-ink border border-white/14 rounded-xl px-11 pt-11 pb-10"
      style={{
        transform: `translate(-50%, -50%) scale(${open ? 1 : 0.96})`,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition:
          'opacity 320ms cubic-bezier(.22,1,.36,1), transform 420ms cubic-bezier(.22,1,.36,1)',
        width: 'min(560px, 92vw)',
        boxShadow: '0 40px 120px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.06)',
      }}
    >
      <div className="flex justify-between items-start mb-12">
        <div
          className="font-sans font-light leading-none tracking-[-0.04em] text-kl-bone"
          style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
        >
          Say hi.
        </div>
        <KLIconButton onClick={onClose} accent="pink" size={40} title="Close">
          <IconClose size={18} stroke={2.2} />
        </KLIconButton>
      </div>

      <div className="flex flex-col gap-0">
        {CONTACTS.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-center py-5.5 border-t border-white/8 no-underline text-kl-lime cursor-pointer gap-3 transition-colors duration-180"
            style={{
              borderBottom: i === CONTACTS.length - 1 ? '1px solid var(--border-1)' : 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--kl-pink)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--kl-lime)';
            }}
          >
            <KLMeta style={{ color: 'var(--kl-ash)' }}>{c.label}</KLMeta>
            <div className="font-sans font-light text-[22px] tracking-[-0.02em]">{c.value}</div>
            <IconArrowUpRight size={16} stroke={1.75} style={{ opacity: 0.5 }} />
          </a>
        ))}
      </div>
    </div>
  </>
);
