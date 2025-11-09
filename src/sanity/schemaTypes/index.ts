import { type SchemaPluginOptions } from 'sanity';

import { authorType } from '@/sanity/schemaTypes/authorType';
import { blockContentType } from '@/sanity/schemaTypes/blockContentType';
import { categoryType } from '@/sanity/schemaTypes/categoryType';
import { postType } from '@/sanity/schemaTypes/postType';
import { homePage } from '@/sanity/schemaTypes/singeltons/homePage';

export const singletonTypes = new Set(['homePage']);

export const schema: SchemaPluginOptions = {
  types: [blockContentType, categoryType, postType, authorType, homePage],
  templates: (templates) =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
};
