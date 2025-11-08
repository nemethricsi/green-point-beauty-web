import { type SchemaTypeDefinition } from 'sanity';

import { authorType } from '@/sanity/schemaTypes/authorType';
import { blockContentType } from '@/sanity/schemaTypes/blockContentType';
import { categoryType } from '@/sanity/schemaTypes/categoryType';
import { postType } from '@/sanity/schemaTypes/postType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType],
};
