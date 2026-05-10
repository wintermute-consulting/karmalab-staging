import { Fragment } from 'react';
import { KLEyebrow, KLSectionNumber, KLBorderedGrid, KLBorderedCell } from '../Primitives';
import { sectionWrap } from './shared';

const clientTypes = [
  { label: 'Production companies', desc: 'Looking to integrate new tools without compromising their quality or production standards.' },
  { label: 'Cultural institutions', desc: 'Seeking meaningful, well-designed technological experiences, not superficial effects.' },
  { label: 'Brands', desc: 'Developing ambitious projects that remain human, crafted, and intentional — amplified by technology.' },
  { label: 'Artists and creators', desc: 'Who want to build their projects with structure, clarity, and the right production approach.' },
];

const clients = [
  'Inrō', 'ARTE', 'France Télévisions', 'Cinétévé', 'Primordial Soup',
  'Ville de Paris', 'Journées du Patrimoine', 'ADAGP', 'LVMH',
  'Nona Source', 'Superfine',
];

export const SectionForWho = () => (
  <section id="for-who" style={{ ...sectionWrap, paddingTop: 192, paddingBottom: 192 }}>
    <div style={{ marginBottom: 72 }}>
      <KLSectionNumber n="03" label="For who" />
    </div>

    <KLBorderedGrid columns={2}>
      {clientTypes.map((ct, i) => (
        <KLBorderedCell key={ct.label} hasRight={i % 2 === 0} style={{ padding: '32px 28px 36px' }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400, fontSize: 26,
            letterSpacing: '-0.02em', color: 'var(--kl-bone)', lineHeight: 1.15,
          }}>{ct.label}</div>
          <p style={{ marginTop: 14, color: 'var(--kl-fog)', fontSize: 16, lineHeight: 1.55, maxWidth: 480 }}>
            {ct.desc}
          </p>
        </KLBorderedCell>
      ))}
    </KLBorderedGrid>

    <div style={{ marginTop: 96 }}>
      <KLEyebrow>Our clients</KLEyebrow>
      <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: '6px 20px' }}>
        {clients.map((c, i) => (
          <Fragment key={c}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300, fontSize: 20, color: 'var(--kl-ash)', lineHeight: 1.6,
            }}>{c}</span>
            {i < clients.length - 1 && (
              <span style={{ color: 'var(--kl-steel)', fontSize: 20, lineHeight: 1.6, userSelect: 'none' }}>·</span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  </section>
);
