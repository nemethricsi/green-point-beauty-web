import { defineType, defineField, defineArrayMember } from 'sanity';

import { createSlugWithUrlInput } from '@/sanity/schemaTypes/components/SlugWithUrl';

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
        input: createSlugWithUrlInput('kezelesek'),
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
      name: 'variants',
      title: 'Változatok (ár és időtartam)',
      description:
        'Itt lehet megadni, ha több időtartam van ugyanabból a kezelésből, vagy más típusok, amiknek más az ára.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'variant',
          title: 'Változat',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Megnevezés',
              type: 'string',
              description: 'Pl. "60 perc", "90 perc"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'duration',
              title: 'Időtartam',
              description: 'Időtartam PERCBEN megadva.',
              type: 'number',
              validation: (Rule) => Rule.required().positive().integer(),
            }),
            defineField({
              name: 'price',
              title: 'Ár (Ft)',
              type: 'number',
              validation: (Rule) => Rule.required().positive().integer(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'price' },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle ? `${subtitle} Ft` : undefined,
              };
            },
          },
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
      name: 'category',
      title: 'Kategória',
      type: 'reference',
      to: [{ type: 'treatmentCategory' }],
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
