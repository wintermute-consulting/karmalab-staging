import { useState, useEffect } from 'react';
import { FloatingChrome, DrawerMenu, ContactModal } from './kl/Chrome';
import { ProjectCard } from './kl/ProjectCard';
import { KLMeta } from './kl/Primitives';
import { IconArrowUpRight } from './kl/Icons';
import type { Category } from '../data/projects';

interface CategoryPageProps {
  category: Category;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setContactOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navigate = (id: string) => {
    window.location.href = `/#${id}`;
  };

  const openContact = () => setContactOpen(true);

  return (
    <>
      <FloatingChrome
        onOpenMenu={() => setMenuOpen(true)}
        onOpenContact={openContact}
        scrolled={scrolled}
      />

      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* Category hero */}
        <section style={{
          padding: 'clamp(120px, 16vh, 200px) clamp(24px, 5vw, 72px) 80px',
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {/* Back link */}
          <a
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase',
              color: 'var(--kl-ash)',
              textDecoration: 'none',
              marginBottom: 48,
              transition: 'color 180ms ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--kl-pink)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--kl-ash)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="11 18 5 12 11 6" />
            </svg>
            Back to home
          </a>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 24 }}>
            <KLMeta color="var(--kl-pink)">§ {category.n}</KLMeta>
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(42px, 6vw, 88px)',
            lineHeight: 1.02, letterSpacing: '-0.04em',
            color: 'var(--kl-bone)', margin: 0,
          }}>{category.label}</h1>

          <p style={{
            marginTop: 24,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(18px, 2.2vw, 24px)',
            lineHeight: 1.45, color: 'var(--kl-fog)', maxWidth: 640,
          }}>{category.copy}</p>

          <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {category.tags.map((t) => (
              <span key={t} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, letterSpacing: '0.06em',
                color: 'var(--kl-ash)', padding: '6px 12px',
                border: '1px solid var(--border-1)', borderRadius: 999,
                background: 'rgba(20,20,23,0.5)',
              }}>{t}</span>
            ))}
          </div>
        </section>

        {/* Projects list */}
        <section style={{
          padding: '0 clamp(24px, 5vw, 72px) 128px',
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          borderTop: '1px solid var(--border-1)',
        }}>
          {category.projects.length > 0 ? (
            <>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
                color: 'var(--kl-ash)', padding: '28px 0',
              }}>
                {category.projects.length} {category.projects.length === 1 ? 'project' : 'projects'}
              </p>
              {category.projects.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </>
          ) : (
            <div style={{
              padding: '96px 0', textAlign: 'center',
              fontFamily: "'Space Grotesk', sans-serif",
              color: 'var(--kl-steel)', fontSize: 18, fontWeight: 300,
            }}>
              Projects coming soon.
            </div>
          )}
        </section>
      </main>

      <DrawerMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenContact={openContact}
        onNavigate={navigate}
      />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
