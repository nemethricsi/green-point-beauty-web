import { defineType, defineField, defineArrayMember } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigáció',
  type: 'document',
  icon: () => '🔀',
  fields: [
    defineField({
      name: 'navMenuItems',
      title: 'Menüpontok',
      type: 'array',
      validation: (Rule) =>
        Rule.max(5).error('A menüpontok maximális száma 5!'),
      of: [
        defineArrayMember({
          name: 'navMenuItem',
          title: 'Menüpont',
          icon: () => '↗️',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Menüpont szövege',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'mode',
              title: 'Fajta',
              type: 'string',
              options: {
                list: [
                  { title: 'Sima link', value: 'link' },
                  { title: 'Linkek gyűjteménye', value: 'group' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            // Single link (internal or external)
            defineField({
              name: 'linkType',
              title: 'Link típusa',
              type: 'string',
              options: {
                list: [
                  { title: 'Belső hivatkozás', value: 'internal' },
                  { title: 'Külső hivatkozás', value: 'external' },
                ],
                layout: 'radio',
              },
              hidden: ({ parent }) => parent?.mode !== 'link',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { mode: string };
                  if (parent?.mode === 'link' && !value) {
                    return 'Válaszd ki a link típusát!';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'internalLink',
              title: 'Belső hivatkozás',
              type: 'reference',
              to: [{ type: 'treatment' }],
              hidden: ({ parent }) => parent?.linkType !== 'internal',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { linkType: string };
                  if (parent?.linkType === 'internal' && !value) {
                    return 'Válaszd ki a belső hivatkozást!';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'externalLink',
              title: 'Külső hivatkozás',
              type: 'url',
              hidden: ({ parent }) => parent?.linkType !== 'external',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { linkType: string };
                  if (parent?.linkType === 'external' && !value) {
                    return 'Add meg a külső URL-t!';
                  }
                  return true;
                }),
            }),
            // Group of references
            defineField({
              name: 'referencedTreatments',
              title: 'Kezelések',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'reference',
                  to: [{ type: 'treatment' }],
                }),
              ],
              hidden: ({ parent }) => parent?.mode !== 'group',
              validation: (Rule) =>
                Rule.max(7).custom((value, context) => {
                  const parent = context.parent as { mode: string };
                  if (
                    parent?.mode === 'group' &&
                    (!value || value.length === 0)
                  ) {
                    return 'Legalább egy kezelést válassz!';
                  }
                  return true;
                }),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigáció',
      };
    },
  },
});
