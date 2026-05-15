import { useState, useEffect } from 'react';
import { ReelFixed, HeroBlock, ReelPinnedSpacer } from './kl/Hero';
import { FloatingChrome, DrawerMenu, ContactModal } from './kl/Chrome';
import {
  SectionWhatWeDo,
  SectionHowItWorks,
  SectionForWho,
  SectionValues,
  SectionWhoWeAre,
  SectionCTA,
} from './kl/Sections';

const TWEAKS = {
  tagline1: 'There are many ways to make something.',
  tagline2: 'Most of them almost work.',
  accentDominance: 'pink',
  logoTreatment: 'chrome',
  heroFadeOpacity: 0,
  heroBlurPx: 5,
  heroHeightVh: 100,
  reelPinVh: 160,
  grainOn: true,
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.3);
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
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 48,
        behavior: 'smooth',
      });
  };

  const openContact = () => setContactOpen(true);

  return (
    <>
      <ReelFixed tweaks={TWEAKS} />
      <FloatingChrome
        onOpenMenu={() => setMenuOpen(true)}
        onOpenContact={openContact}
        scrolled={scrolled}
        startHidden={true}
      />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroBlock onContact={openContact} tweaks={TWEAKS} />
        <ReelPinnedSpacer tweaks={TWEAKS} />

        <div className="relative bg-kl-black" style={{ zIndex: 5 }}>
          <SectionWhatWeDo />
          <SectionHowItWorks />
          <SectionForWho />
          {/* <SectionValues /> */}
          <SectionWhoWeAre />
          <SectionCTA onContact={openContact} />
        </div>
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
