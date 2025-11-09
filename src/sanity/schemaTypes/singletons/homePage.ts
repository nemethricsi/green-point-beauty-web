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
    }),
    defineField({
      name: 'ctaLabel',
      type: 'string',
      title: 'Call To Action gomb szövege',
    }),
  ],
});
