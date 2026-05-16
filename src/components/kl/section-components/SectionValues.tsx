import { KLMeta } from '../KLMeta';
import { KLSectionNumber } from '../KLSectionNumber';
import { KLBorderedGrid, KLBorderedCell } from '../KLBorderedGrid';
import { sectionWrapClass } from './shared';

const values = [
  { n: '01', t: 'Hybrid by design', d: 'Human-led, technology-extended.' },
  {
    n: '02',
    t: 'Knowledge is part of the product',
    d: 'The more you know, the better you decide.',
  },
  { n: '03', t: 'Respect the people who build', d: 'Craft matters, people matter.' },
];

export const SectionValues = () => (
  <section id="values" className={sectionWrapClass} style={{ paddingTop: 192 }}>
    <div className="mb-14">
      <KLSectionNumber n="04" label="Values" />
    </div>

    <KLBorderedGrid
      columns={3}
      className="max-md:grid-cols-1! max-md:*:border-r-0!"
      style={{ marginTop: 80 }}
    >
      {values.map((v, i) => (
        <KLBorderedCell key={v.n} hasRight={i < values.length - 1}>
          <KLMeta color="var(--kl-pink)" style={{ fontSize: 13 }}>
            {v.n}
          </KLMeta>
          <div className="mt-6 font-sans font-normal text-[26px] tracking-[-0.02em] text-kl-bone leading-[1.15]">
            {v.t}
          </div>
          <p className="mt-3.5 text-kl-fog text-base leading-[1.55]">{v.d}</p>
        </KLBorderedCell>
      ))}
    </KLBorderedGrid>
  </section>
);
