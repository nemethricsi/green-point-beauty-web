import { defineField, defineType } from 'sanity';

export const treatmentCategoryType = defineType({
  name: 'treatmentCategory',
  title: 'Kezelés kategóriák',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({
      name: 'name',
      title: 'Név',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
