import { defineType, defineField } from 'sanity';

import { createSlugWithUrlInput } from '@/sanity/schemaTypes/components/SlugWithUrl';

export const customPageType = defineType({
  name: 'customPage',
  title: 'Egyedi landing oldalak',
  type: 'document',
  icon: () => '📄',
  groups: [
    { name: 'content', title: 'Tartalom', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
      components: {
        input: createSlugWithUrlInput('p'),
      },
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Tartalom',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO cím',
      description: 'Ha üresen hagyod, az oldal címe lesz a SEO cím.',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO leírás',
      description: 'Max. 160 karakter.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'OG / Share kép',
      description:
        'Ideális méret: 1200×630px (1.91:1 arány). Ha üresen hagyod, az alapértelmezett kép jelenik meg.',
      type: 'image',
      options: {
        hotspot: {
          previews: [{ title: 'OG / Share (1.91:1)', aspectRatio: 1200 / 630 }],
        },
      },
      group: 'seo',
    }),
  ],
});
