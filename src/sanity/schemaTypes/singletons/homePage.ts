import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Főoldal',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Főcím',
    }),
    defineField({
      name: 'subheading',
      type: 'text',
      title: 'Alcím',
      description: 'A főcím alatti magyarázó, kísérő szöveg.',
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
    }),
    defineField({
      name: 'ctaLabel',
      type: 'string',
      title: 'Call To Action gomb szövege',
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
    }),
  ],
});
