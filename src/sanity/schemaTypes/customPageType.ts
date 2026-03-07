import { defineType, defineField } from 'sanity';

import { createSlugWithUrlInput } from '@/sanity/schemaTypes/components/SlugWithUrl';

export const customPageType = defineType({
  name: 'customPage',
  title: 'Egyedi landing oldalak',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Cím',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
    }),
    defineField({
      name: 'content',
      title: 'Tartalom',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
