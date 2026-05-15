import { useState, useEffect } from 'react';
import { FloatingChrome, DrawerMenu, ContactModal } from './kl/Chrome';
import { SectionCTA, SectionProjectsGrid } from './kl/section-components';
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
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setContactOpen(false);
      }
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
        startHidden={true}
      />

      <main className="relative z-2 flex min-h-screen">
        {/* Left half: info */}
        <section
          style={{
            width: '50%',
            padding: 'clamp(120px, 16vh, 200px) clamp(32px, 3.5vw, 80px) 80px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Back link */}
          <a
            href="/#what-we-do"
            className="inline-flex items-center font-sans gap-2 font-light tracking-tight text-kl-fog no-underline mb-12"
            style={{ fontSize: 24, transition: 'color 180ms ease' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--kl-pink)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--kl-ash)';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="11 18 5 12 11 6" />
            </svg>
            What we do
          </a>

          <h1
            className="font-sans font-normal leading-[1.02] tracking-[-0.02em] text-kl-bone m-0"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}
          >
            <span
              className="font-mono tracking-widest text-kl-pink mr-2"
              style={{ fontSize: '0.4em' }}
            >
              {category.n}
            </span>
            {category.label}
          </h1>

          <p
            className="font-sans font-light leading-normal text-kl-fog max-w-160"
            style={{ marginTop: 24, fontSize: 'clamp(18px, 2.2vw, 24px)' }}
          >
            {category.copy}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-4">
            {category.tags.map((t) => (
              <span
                key={t}
                className="font-mono tracking-[0.06em] text-kl-lime-hot px-4 py-2 border border-kl-lime rounded-pill bg-[rgba(20,20,23,0.5)]"
                style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Right half: video grid */}
        <div className="w-1/2 shrink-0">
          <SectionProjectsGrid projects={category.projects} />
        </div>
      </main>

      <SectionCTA onContact={openContact} />

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
