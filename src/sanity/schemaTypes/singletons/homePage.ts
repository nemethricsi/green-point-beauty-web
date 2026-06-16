import { defineField, defineType } from 'sanity';

import { createPrefilledInput } from '@/sanity/schemaTypes/components/PrefilledInput';

export const homePage = defineType({
  name: 'homePage',
  title: 'Főoldal',
  type: 'document',
  icon: () => '🏠',
  groups: [
    { name: 'content', title: 'Tartalom', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Főcím',
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      type: 'text',
      title: 'Alcím',
      description: 'A főcím alatti magyarázó, kísérő szöveg.',
      group: 'content',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Kép',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Egy leírás, hogy mi látható a képen.',
          validation: (Rule) =>
            Rule.required().error('A kép alternatív szövege nem lehet üres!'),
        }),
      ],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'ctaLabel',
      type: 'string',
      title: 'Call To Action gomb szövege',
      group: 'content',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO cím',
      description:
        'Ha üresen hagyod, a főcím és az oldalnév kerül ide. Céld az 50–60 karaktert a SERP-tér optimális kihasználásához.',
      type: 'string',
      group: 'seo',
      components: {
        input: createPrefilledInput(
          'headline',
          (v) => `${v} • Green Point Beauty`,
        ),
      },
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO leírás',
      description:
        'Céld a 120–160 karaktert a keresési találat szövegének maximális kihasználásához.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      group: 'seo',
      components: { input: createPrefilledInput('subheading') },
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Alapértelmezett OG / Share kép',
      description:
        'Ideális méret: 1200×630px (1.91:1 arány). Ez jelenik meg minden olyan oldalon, ahol nincs saját kép beállítva.',
      type: 'image',
      options: {
        hotspot: {
          previews: [{ title: 'OG / Share (1.91:1)', aspectRatio: 1200 / 630 }],
        },
      },
      validation: (Rule) => Rule.required(),
      group: 'seo',
    }),
  ],
});
