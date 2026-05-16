import { Fragment } from 'react';
import { KLEyebrow } from '../KLEyebrow';
import { KLSectionNumber } from '../KLSectionNumber';
import { KLBorderedGrid, KLBorderedCell } from '../KLBorderedGrid';
import { sectionWrapClass } from './shared';

const clientTypes = [
  {
    label: 'Production companies',
    desc: 'Looking to integrate new tools without compromising their quality or production standards.',
    image: '/assets/production_companies.png',
  },
  {
    label: 'Cultural institutions',
    desc: 'Seeking meaningful, well-designed technological experiences, not superficial effects.',
    image: '/assets/cultural_institutions.png',
  },
  {
    label: 'Brands',
    desc: 'Developing ambitious projects that remain human, crafted, and intentional — amplified by technology.',
    image: '/assets/brands.png',
  },
  {
    label: 'Artists and creators',
    desc: 'Who want to build their projects with structure, clarity, and the right production approach.',
    image: '/assets/artists.png',
  },
];

const clients = [
  'Inrō',
  'ARTE',
  'France Télévisions',
  'Cinétévé',
  'Primordial Soup',
  'Ville de Paris',
  'Journées du Patrimoine',
  'ADAGP',
  'LVMH',
  'Nona Source',
  'Kenzo',
];

export const SectionForWho = () => (
  <section id="clients" className={`${sectionWrapClass} max-md:px-0`}>
    <div className="mb-10 md:mb-18 max-md:px-8">
      <KLSectionNumber n="03" label="For whom" />
    </div>

    <KLBorderedGrid columns={2} className="max-md:grid-cols-1! max-md:*:border-r-0!">
      {clientTypes.map((ct, i) => (
        <KLBorderedCell key={ct.label} hasRight={i % 2 === 0} lastRow={i >= clientTypes.length - 2}>
          <div className="flex gap-6 items-start max-md:hidden">
            <div className="shrink-0 w-[100px] h-[100px] overflow-hidden">
              {ct.image && (
                <img src={ct.image} alt={ct.label} className="w-full h-full object-cover block" />
              )}
            </div>
            <div>
              <div className="font-sans font-normal text-[26px] tracking-[-0.02em] text-kl-bone leading-[1.15]">
                {ct.label}
              </div>
              <p className="mt-3.5 mb-0 text-kl-fog text-base leading-[1.55] max-w-[480px]">
                {ct.desc}
              </p>
            </div>
          </div>
          <div className="md:hidden">
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-[100px] h-[100px] overflow-hidden">
                {ct.image && (
                  <img src={ct.image} alt={ct.label} className="w-full h-full object-cover block" />
                )}
              </div>
              <div className="font-sans font-normal text-[26px] tracking-[-0.02em] text-kl-bone leading-[1.15]">
                {ct.label}
              </div>
            </div>
            <p className="mt-3.5 mb-0 text-kl-fog text-base leading-[1.55] px-5">{ct.desc}</p>
          </div>
        </KLBorderedCell>
      ))}
    </KLBorderedGrid>

    <div className="mt-24 max-md:px-8">
      <KLEyebrow>Our clients</KLEyebrow>
      <div className="mt-8 flex flex-wrap gap-x-6 md:gap-x-5 gap-y-1.5">
        {clients.map((c, i) => (
          <Fragment key={c}>
            <span className="font-sans font-light text-xl text-kl-ash leading-[1.6]">{c}</span>
            {i < clients.length - 1 && (
              <span className="text-kl-steel text-xl leading-[1.6] select-none max-md:hidden">
                ·
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  </section>
);
