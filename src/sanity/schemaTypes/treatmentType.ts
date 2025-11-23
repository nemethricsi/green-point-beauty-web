import { defineType, defineField } from 'sanity';

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
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Rövid leírás (max. 160 karakter)',
      validation: (Rule) => Rule.max(160).required(),
    }),
    defineField({
      name: 'salonicUrl',
      type: 'url',
      title: 'Salonic URL',
      validation: (Rule) => Rule.required(),
      description:
        'A kezelés URL-je a Salonic oldalon. (Pl. https://green-point-beauty.salonic.hu/selectEmployee/?placeId=2522&serviceId=240582)',
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
