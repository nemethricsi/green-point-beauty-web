import { type SchemaPluginOptions } from 'sanity';

import { blockContentType } from '@/sanity/schemaTypes/blockContentType';
import { homePage } from '@/sanity/schemaTypes/singletons/homePage';
import { treatmentType } from '@/sanity/schemaTypes/treatmentType';

export const singletonTypes = new Set(['homePage']);

export const schema: SchemaPluginOptions = {
  types: [blockContentType, homePage, treatmentType],
  templates: (templates) =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
};
