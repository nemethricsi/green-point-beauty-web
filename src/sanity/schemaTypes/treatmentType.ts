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
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Rövid leírás (max. 100 karakter)',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'details',
      type: 'array',
      title: 'Részletes leírás',
      of: [{ type: 'block' }],
    }),
  ],
});
