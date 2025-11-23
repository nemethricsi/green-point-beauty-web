import { defineQuery } from 'next-sanity';
import * as z from 'zod';

import { sanityFetch } from '@/sanity/lib/live';

const HomePageDataSchema = z.object({
  headline: z.string(),
  subheading: z.string(),
  ctaLabel: z.string(),
});

type HomePageData = z.infer<typeof HomePageDataSchema>;

const HOME_PAGE_QUERY = defineQuery(`*[_type == 'homePage'][0]{
  headline,
  subheading,
  ctaLabel,
}`);

export const fetchHomePage = async (): Promise<HomePageData> => {
  const result = await sanityFetch({
    query: HOME_PAGE_QUERY,
  });

  // Handle null/undefined case during build when data does not exist yet
  if (!result.data) {
    // Return default values so build can succeed
    // Once deployed, you can add the actual data in Sanity Studio
    return {
      headline: 'Welcome',
      subheading: 'Content coming soon',
      ctaLabel: 'Coming soon',
    };
  }

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
