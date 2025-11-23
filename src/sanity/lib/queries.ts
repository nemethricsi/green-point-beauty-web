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

  const parsed = HomePageDataSchema.safeParse(result.data);

  if (!parsed.success) {
    throw new Error(`Validation failed: ${parsed.error.message}`);
  }

  return parsed.data; // Type-safe, validated data
};

export const TREATMENTS_QUERY = defineQuery(`*[
  _type == 'treatment' &&
  slug.current == $slug
][0]{
  "id":_id,
  name,
  shortDescription,
  salonicUrl,
  details
}`);

export const fetchTreatmentBySlug = async (slug: string) => {
  return sanityFetch({ query: TREATMENTS_QUERY, params: { slug } });
};
