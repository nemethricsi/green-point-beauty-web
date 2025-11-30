import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/live';

const HOME_PAGE_QUERY = defineQuery(`*[_type == 'homePage'][0]{
  headline,
  subheading,
  image,
  ctaLabel,
}`);

export const fetchHomePage = async () => {
  return sanityFetch({ query: HOME_PAGE_QUERY });
};

const TREATMENTS_QUERY = defineQuery(`*[
  _type == 'treatment'
]{
  "id":_id,
  name,
  "slug":slug.current,
  shortDescription,
  bookingUrl,
}`);

export const fetchTreatments = async () => {
  return sanityFetch({ query: TREATMENTS_QUERY });
};

const SINGLE_TREATMENT_QUERY = defineQuery(`*[
  _type == 'treatment' &&
  slug.current == $slug
][0]{
  "id":_id,
  name,
  shortDescription,
  bookingUrl,
  details
}`);

export const fetchTreatmentBySlug = async (slug: string) => {
  return sanityFetch({ query: SINGLE_TREATMENT_QUERY, params: { slug } });
};
