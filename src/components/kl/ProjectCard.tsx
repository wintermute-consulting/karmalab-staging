import { useState } from 'react';
import { KLMeta, KLButton } from './Primitives';
import { IconArrowUpRight } from './Icons';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
}

const noiseSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .4 0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='.3'/></svg>"
);

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const total = project.images.length;
  const next = () => setCurrentSlide((c) => (c + 1) % total);
  const prev = () => setCurrentSlide((c) => (c - 1 + total) % total);

  return (
    <article style={{ borderBottom: '1px solid var(--border-1)', padding: '64px 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 48, alignItems: 'start',
      }}>
        {/* Slideshow */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100%', aspectRatio: '16 / 10',
            borderRadius: 14, overflow: 'hidden',
            position: 'relative',
            background: 'var(--kl-smoke)',
            border: '1px solid var(--border-1)',
          }}>
            {project.images.map((img, i) => (
              <div key={i} style={{
                position: 'absolute', inset: 0,
                opacity: i === currentSlide ? 1 : 0,
                transition: 'opacity 400ms cubic-bezier(.22,1,.36,1)',
                background: img.color || `linear-gradient(135deg, hsl(${(i * 60 + 200) % 360} 25% 15%) 0%, hsl(${(i * 60 + 200) % 360} 18% 8%) 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {img.src ? (
                  <img src={img.src} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: `url("data:image/svg+xml;utf8,${noiseSvg}")`,
                      mixBlendMode: 'overlay', opacity: 0.4,
                    }} />
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11, letterSpacing: '.12em',
                      textTransform: 'uppercase', color: 'var(--kl-ash)', opacity: 0.7,
                    }}>{img.caption || `image ${i + 1} / ${total}`}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          {total > 1 && (
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={prev}
                style={{
                  background: 'none', border: '1px solid var(--border-2)',
                  borderRadius: 999, width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--kl-ash)', transition: 'all 180ms ease',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = 'var(--kl-pink)'; el.style.color = 'var(--kl-pink)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,.14)'; el.style.color = 'var(--kl-ash)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {project.images.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} style={{
                    width: i === currentSlide ? 20 : 6,
                    height: 6, borderRadius: 999,
                    background: i === currentSlide ? 'var(--kl-pink)' : 'var(--kl-graphite)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 250ms cubic-bezier(.22,1,.36,1)', padding: 0,
                  }} />
                ))}
              </div>

              <button
                onClick={next}
                style={{
                  background: 'none', border: '1px solid var(--border-2)',
                  borderRadius: 999, width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--kl-ash)', transition: 'all 180ms ease',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = 'var(--kl-pink)'; el.style.color = 'var(--kl-pink)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,.14)'; el.style.color = 'var(--kl-ash)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Text */}
        <div style={{ paddingTop: 8 }}>
          <KLMeta color="var(--kl-pink)">{project.client}</KLMeta>
          <h3 style={{
            marginTop: 16,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400, fontSize: 28,
            letterSpacing: '-0.02em', color: 'var(--kl-bone)', lineHeight: 1.15,
          }}>{project.title}</h3>
          <p style={{ marginTop: 16, color: 'var(--kl-fog)', fontSize: 16, lineHeight: 1.6, maxWidth: 480 }}>
            {project.description}
          </p>

          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.keywords.map((kw) => (
              <span key={kw} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, letterSpacing: '0.06em',
                color: 'var(--kl-ash)', padding: '6px 12px',
                border: '1px solid var(--border-1)', borderRadius: 999,
                background: 'rgba(20,20,23,0.5)',
              }}>{kw}</span>
            ))}
          </div>

          {project.link && (
            <div style={{ marginTop: 24 }}>
              <KLButton
                variant="primary"
                size="sm"
                accent="lime"
                onClick={() => window.open(project.link!.href, '_blank')}
              >
                {project.link.label} <IconArrowUpRight size={14} />
              </KLButton>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
