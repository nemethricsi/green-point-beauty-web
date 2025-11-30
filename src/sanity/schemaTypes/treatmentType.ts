import { defineType, defineField } from 'sanity';

import { SlugWithUrlInput } from '@/sanity/schemaTypes/components/SlugWithUrl';

export const treatmentType = defineType({
  name: 'treatment',
  title: 'Kezelések',
  type: 'document',
  icon: () => '💆‍♀️',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Név',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
      components: {
        input: SlugWithUrlInput,
      },
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Rövid leírás (max. 160 karakter)',
      rows: 3,
      validation: (Rule) => Rule.max(160).required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Főkép',
      description: 'A kezelés főképe. Nem feltétlenül használjuk a weboldalon.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) =>
            Rule.required().error('A kép alternatív szövege nem lehet üres!'),
          description: 'Egy leírás, hogy mi látható a képen.',
        }),
      ],
    }),
    defineField({
      name: 'bookingUrl',
      type: 'url',
      title: 'Foglaló URL',
      description:
        'A kezelés URL-je pl. a Salonic oldalon. (Pl. https://green-point-beauty.salonic.hu/selectEmployee/?placeId=2522&serviceId=240582)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'details',
      type: 'array',
      title: 'Részletes leírás',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
