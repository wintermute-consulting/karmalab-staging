import { useState, useEffect } from 'react';
import { FloatingChrome, DrawerMenu, ContactModal } from './kl/Chrome';
import { SectionCTA, SectionProjectsGrid } from './kl/section-components';
import { categories } from '../data/projects';
import type { Category } from '../data/projects';

function CategorySection({ category, index }: { category: Category; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <section
      id={category.slug}
      className={`relative md:flex md:min-h-screen${reversed ? ' md:flex-row-reverse' : ''}`}
      style={{ borderTop: '1px solid var(--border-1)' }}
    >
      {/* Left half: info */}
      <div className="md:w-1/2 box-border flex flex-col justify-center py-8 px-6 md:px-12 md:py-12">
        <h2
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
        </h2>

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
              className="text-sm md:text-md font-mono tracking-[0.06em] text-kl-lime-hot px-3 py-1.5 md:px-4 md:py-2 border border-kl-lime rounded-pill bg-[rgba(20,20,23,0.5)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right half: video grid */}
      <div className="md:w-1/2 shrink-0">
        <SectionProjectsGrid projects={category.projects} />
      </div>
    </section>
  );
}

export default function ProjectsPage() {
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

  const openContact = () => setContactOpen(true);

  return (
    <>
      <FloatingChrome
        onOpenMenu={() => setMenuOpen(true)}
        onOpenContact={openContact}
        scrolled={scrolled}
        startHidden={false}
      />

      <main className="relative z-2">
        {/* Page header */}
        <h1
          className="font-sans font-normal leading-[1.02] tracking-[-0.02em] text-kl-bone m-0 px-6 pt-24 pb-6 md:pt-28 md:px-12 md:pb-12"
          style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
        >
          Our projects
        </h1>

        {/* Category sections */}
        {categories.map((cat, i) => (
          <CategorySection key={cat.slug} category={cat} index={i} />
        ))}
      </main>

      <SectionCTA onContact={openContact} />

      <DrawerMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
