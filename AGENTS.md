# AGENTS.md — KarmaLab website

Astro + React (client-side islands) website for KarmaLab, a creative studio.  
Built with the KarmaLab design system: black canvas, neon pink (#FB48C4) for content emphasis, lime (#85FF00) for interactive elements.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Astro 6 (static output) |
| UI islands | React 19 (`client:load`) |
| Language | TypeScript (strict) |
| Styling | Inline styles + CSS variables (no CSS-in-JS lib) |
| Fonts | Space Grotesk (display/body) + JetBrains Mono (mono) via Google Fonts |

**Key constraint:** All styling is done via inline `style` props using CSS custom properties defined in `src/styles/global.css`. Do NOT introduce Tailwind, styled-components, or CSS modules — keep the existing pattern.

---

## Project structure

```
src/
  styles/
    global.css              # CSS variables, base reset, animations
  layouts/
    Layout.astro            # Base HTML shell with fonts & global CSS
  components/
    kl/
      Primitives.tsx        # KLEyebrow, KLButton, KLIconButton, KLMeta, KLSectionNumber
      Icons.tsx             # Inline SVG icon set (Lucide-style)
      Hero.tsx              # ReelFixed (video bg), HeroBlock, ReelPinnedSpacer
      Chrome.tsx            # FloatingChrome (nav), DrawerMenu, ContactModal
      Sections.tsx          # Home page sections: WhatWeDo, HowItWorks, ForWho, Values, WhoWeAre, CTA
      ProjectCard.tsx       # Slideshow card used on category pages
    HomePage.tsx            # Home page React app (wraps all sections)
    CategoryPage.tsx        # Project category page React app
  data/
    projects.ts             # All category & project data (source of truth)
  pages/
    index.astro             # Home → <HomePage client:load />
    projects/
      [category].astro      # Dynamic route for all 5 project category pages
public/
  assets/                   # Logo images (karmalab-logo-white.png, etc.)
  uploads/                  # Chrome logo, horizontal logo SVG/PNG
  favicon.svg / favicon.ico
```

---

## Design system tokens (key vars)

```css
--kl-pink:    #FB48C4   /* content emphasis, section markers, tags */
--kl-lime:    #85FF00   /* interactive: buttons, links, focus */
--kl-bone:    #EDEDEF   /* primary text */
--kl-fog:     #C6C6CE   /* secondary text */
--kl-ash:     #8A8A94   /* tertiary / meta text */
--kl-ink:     #0A0A0B   /* elevated surfaces (drawer, modal) */
--border-1:   rgba(255,255,255,0.08)
--border-2:   rgba(255,255,255,0.14)
```

Buttons use `accent="lime"` for interactive CTAs and `accent="pink"` for contact/identity actions.  
The pill border radius (999px) is the signature KarmaLab shape — use it everywhere.

---

## Primitive components

### `KLButton`
```tsx
<KLButton variant="primary" size="lg" accent="lime" onClick={fn}>Label</KLButton>
// variants: 'primary' | 'ghost' | 'text'
// sizes: 'sm' | 'md' | 'lg'
// accent: 'lime' (default, interactive) | 'pink' (identity/contact)
```

### `KLIconButton`
Square pill button for icons (burger, close, play/pause).
```tsx
<KLIconButton onClick={fn} accent="pink" size={48} title="Open menu">
  <IconMenu size={20} />
</KLIconButton>
```

### `KLMeta`
Mono uppercase label — section markers, client names, tags.
```tsx
<KLMeta color="var(--kl-pink)">§ 01</KLMeta>
```

### `KLSectionNumber`
Section heading with `§ NN` marker.
```tsx
<KLSectionNumber n="01" label="What we do" />
```

### `KLEyebrow`
Pink mono eyebrow label.
```tsx
<KLEyebrow>Our clients</KLEyebrow>
```

---

## Data: adding/editing content

### Add a project to a category

Edit `src/data/projects.ts`. Find the right category in `categories[]` and add to its `projects` array:

```ts
{
  client: 'Client Name',
  title: 'Project title',
  description: 'Short description (2–3 sentences).',
  keywords: ['keyword1', 'keyword2'],
  // optional external link:
  link: { label: 'Watch on Platform', href: 'https://...' },
  images: [
    // For real images:
    { src: '/projects/my-project/still-1.jpg', caption: 'still 1' },
    // For color placeholders:
    { color: 'linear-gradient(135deg, hsl(280 30% 15%), hsl(280 20% 6%))', caption: 'still 1 / placeholder' },
  ],
}
```

Put real project images in `public/projects/<project-slug>/`.

### Enable a "View projects" link on the home page

In `src/components/kl/Sections.tsx`, find the `disciplines` array. The `caseStudy` field controls the link:

```ts
{ n: '02', label: 'Interactive installations', ..., caseStudy: '/projects/interactive-installations' }
// set to `false` to hide the link
```

### Edit home page copy

- **Tagline:** `src/components/HomePage.tsx` → `TWEAKS.tagline1` / `TWEAKS.tagline2`
- **Sections copy:** `src/components/kl/Sections.tsx` — each section has its data at the top of its function
- **Contact info:** `src/components/kl/Chrome.tsx` → `CONTACTS` array (email, Instagram)
- **Logo treatment:** `TWEAKS.logoTreatment` → `'chrome'` (3D render) or `'white'` (flat white)

### Edit showreel video

In `src/components/kl/Hero.tsx`, update `REEL_SRC`:
```ts
const REEL_SRC = 'https://...';  // or a local /uploads/ path
```

---

## Pages & routing

| URL | Page | Data source |
|---|---|---|
| `/` | Home | `src/components/HomePage.tsx` |
| `/projects/films-and-commercials` | Films & Commercials | `categories[0]` in `projects.ts` |
| `/projects/interactive-installations` | Interactive Installations | `categories[1]` |
| `/projects/digital-experiences` | Digital Experiences | `categories[2]` |
| `/projects/ai-and-generative-systems` | AI & Generative Systems | `categories[3]` |
| `/projects/creative-technology` | Creative Technology | `categories[4]` |

All project pages share `CategoryPage.tsx` — only the data differs.

---

## Dev commands

```bash
npm run dev      # start dev server (http://localhost:4321)
npm run build    # production build → dist/
npm run preview  # preview production build locally
```

---

## Common tasks

### Add a new section to the home page

1. Write the section component in `src/components/kl/Sections.tsx` — give it an `id` prop so scroll-nav works.
2. Export it and import it in `src/components/HomePage.tsx`.
3. Add a `DRAWER_LINKS` entry in `src/components/kl/Chrome.tsx` with the matching `id`.

### Replace placeholder logos/images

Drop files in `public/assets/` or `public/uploads/` and update the `src` path in:
- `src/components/kl/Hero.tsx` — chrome logo & white logo
- `src/components/kl/Chrome.tsx` — horizontal logo in drawer

### Add real project images

Place images in `public/projects/<category-slug>/<project>/` and reference them in `projects.ts`:
```ts
images: [{ src: '/projects/films-and-commercials/arte/still-1.jpg', caption: 'still 1' }]
```

### Style consistency rules

- Always use CSS variables from `global.css`, never raw hex values (except in `Primitives.tsx` where tokens are composed)
- Spacing: use `clamp()` for responsive padding — follow the existing `clamp(24px, 5vw, 72px)` pattern
- Borders: `1px solid var(--border-1)` for subtle dividers, `var(--border-2)` for slightly more visible
- Hover states: use the `--kl-pink` or `--kl-lime` glow pattern already established in `KLButton`/`KLIconButton`
- All interactive elements must have clear hover + active states
