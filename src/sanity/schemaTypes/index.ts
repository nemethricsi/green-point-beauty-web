import { type SchemaPluginOptions } from 'sanity';

import { blockContentType } from '@/sanity/schemaTypes/blockContentType';
import { customPageType } from '@/sanity/schemaTypes/customPageType';
import { homePage } from '@/sanity/schemaTypes/singletons/homePage';
import { navigation } from '@/sanity/schemaTypes/singletons/navigation';
import { treatmentCategoryType } from '@/sanity/schemaTypes/treatmentCategoryType';
import { treatmentType } from '@/sanity/schemaTypes/treatmentType';

export const singletonTypes = new Set(['homePage', 'navigation']);

export const schema: SchemaPluginOptions = {
  types: [
    blockContentType,
    homePage,
    treatmentCategoryType,
    treatmentType,
    navigation,
    customPageType,
  ],
  templates: (templates) =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
};
