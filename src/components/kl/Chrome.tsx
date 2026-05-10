import { useState } from 'react';
import { KLIconButton, KLButton, KLMeta } from './Primitives';
import { IconMenu, IconClose, IconArrowRight, IconArrowUpRight } from './Icons';

interface FloatingChromeProps {
  onOpenMenu: () => void;
  onOpenContact: () => void;
  scrolled: boolean;
}

export const FloatingChrome = ({ onOpenMenu, onOpenContact, scrolled }: FloatingChromeProps) => (
  <div style={{
    position: 'fixed', top: 0, left: 0, right: 0,
    zIndex: 40,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '24px clamp(20px, 3vw, 36px)',
    pointerEvents: 'none',
    transition: 'background 220ms ease',
    background: scrolled
      ? 'linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,0))'
      : 'transparent',
  }}>
    <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
      <KLIconButton onClick={onOpenMenu} accent="pink" title="Open menu" size={48}>
        <IconMenu size={20} stroke={2.2} />
      </KLIconButton>
    </div>
    <div style={{ pointerEvents: 'auto' }}>
      <KLButton size="sm" accent="pink" onClick={onOpenContact}>
        Contact us
      </KLButton>
    </div>
  </div>
);

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
  { id: 'what-we-do',   n: '01', label: 'What we do' },
  { id: 'how-it-works', n: '02', label: 'How it works' },
  { id: 'for-who',      n: '03', label: 'For who' },
  { id: 'values',       n: '04', label: 'Values' },
  { id: 'who-we-are',   n: '05', label: 'Who we are' },
  { id: 'cta',          n: '06', label: 'Start a project' },
];

export const DrawerMenu = ({ open, onClose, onOpenContact, onNavigate }: DrawerMenuProps) => (
  <>
    {/* backdrop */}
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,.7)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 320ms cubic-bezier(.22,1,.36,1)',
        zIndex: 80,
      }}
    />

    {/* drawer */}
    <aside style={{
      position: 'fixed', top: 0, bottom: 0, left: 0,
      width: 'min(520px, 92vw)',
      background: 'var(--kl-ink)',
      borderRight: '1px solid var(--border-1)',
      zIndex: 81,
      transform: open ? 'translateX(0)' : 'translateX(-104%)',
      transition: 'transform 420ms cubic-bezier(.22,1,.36,1)',
      display: 'flex', flexDirection: 'column',
      padding: '28px 32px 28px',
      boxShadow: '30px 0 80px rgba(0,0,0,.6)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <img src="/uploads/horizontal_logo.png" alt="KarmaLab" style={{ height: 40, width: 'auto' }} />
        <KLIconButton onClick={onClose} accent="pink" size={40} title="Close menu">
          <IconClose size={18} stroke={2.2} />
        </KLIconButton>
      </div>

      <div style={{ marginTop: 24, flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <nav>
          {DRAWER_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); onNavigate(l.id); onClose(); }}
              style={{
                display: 'grid',
                gridTemplateColumns: '44px 1fr 20px',
                gap: 14,
                alignItems: 'baseline',
                padding: '16px 0',
                borderBottom: '1px solid var(--border-1)',
                color: 'var(--kl-bone)',
                textDecoration: 'none',
                transition: 'color 180ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--kl-pink)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--kl-bone)'; }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                letterSpacing: '.12em', color: 'var(--kl-ash)',
              }}>{l.n}</span>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 300,
                fontSize: 30,
                letterSpacing: '-0.03em',
              }}>{l.label}</span>
              <IconArrowRight size={14} stroke={1.25} style={{ color: 'currentColor', opacity: .6 }} />
            </a>
          ))}
        </nav>
      </div>

      <div style={{ paddingTop: 24, flexShrink: 0 }}>
        <KLButton size="lg" onClick={() => { onClose(); onOpenContact(); }}>
          Start a project <IconArrowUpRight size={16} />
        </KLButton>
      </div>
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
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,.85)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 320ms cubic-bezier(.22,1,.36,1)',
        zIndex: 90,
      }}
    />

    <div style={{
      position: 'fixed',
      top: '50%', left: '50%',
      transform: `translate(-50%, -50%) scale(${open ? 1 : 0.96})`,
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 320ms cubic-bezier(.22,1,.36,1), transform 420ms cubic-bezier(.22,1,.36,1)',
      zIndex: 91,
      width: 'min(560px, 92vw)',
      background: 'var(--kl-ink)',
      border: '1px solid var(--border-2)',
      borderRadius: 28,
      padding: '44px 44px 40px',
      boxShadow: '0 40px 120px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 300,
          fontSize: 'clamp(36px, 5vw, 56px)',
          lineHeight: 1.0,
          letterSpacing: '-0.04em',
          color: 'var(--kl-bone)',
        }}>
          Say hi.
        </div>
        <KLIconButton onClick={onClose} accent="pink" size={40} title="Close">
          <IconClose size={18} stroke={2.2} />
        </KLIconButton>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {CONTACTS.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '22px 0',
              borderTop: '1px solid var(--border-1)',
              borderBottom: i === CONTACTS.length - 1 ? '1px solid var(--border-1)' : 'none',
              textDecoration: 'none',
              color: 'var(--kl-lime)',
              transition: 'color 180ms ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--kl-pink)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--kl-lime)'; }}
          >
            <KLMeta style={{ color: 'var(--kl-ash)' }}>{c.label}</KLMeta>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300,
              fontSize: 22,
              letterSpacing: '-0.02em',
            }}>{c.value}</div>
            <IconArrowUpRight size={16} stroke={1.75} style={{ opacity: 0.5 }} />
          </a>
        ))}
      </div>
    </div>
  </>
);
