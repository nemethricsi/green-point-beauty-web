import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/live';

export const AUTHOR_QUERY =
  defineQuery(`*[_type == 'author'] | order(lower(name) asc){
  _id,
  name,
  bio,
}`);

export const fetchAuthors = async <T>(): Promise<T[]> => {
  const result = await sanityFetch({
    query: AUTHOR_QUERY,
  });
  return result.data as T[];
};
