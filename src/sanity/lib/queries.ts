import { defineQuery } from 'next-sanity';
import * as z from 'zod';

import { sanityFetch } from '@/sanity/lib/live';

const HOME_PAGE_QUERY = defineQuery(`*[_type == 'homePage'][0]{
  headline,
  subheading,
  ctaLabel,
}`);

const HomePageDataSchema = z.object({
  headline: z.string(),
  subheading: z.string(),
  ctaLabel: z.string(),
});

type HomePageData = z.infer<typeof HomePageDataSchema>;

export const fetchHomePage = async (): Promise<HomePageData> => {
  const result = await sanityFetch({
    query: HOME_PAGE_QUERY,
  });
  const parsed = HomePageDataSchema.safeParse(result.data);

  if (!parsed.success) {
    throw new Error(`Validation failed: ${parsed.error.message}`);
  }
  return parsed.data; // Type-safe, validated data
};

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
