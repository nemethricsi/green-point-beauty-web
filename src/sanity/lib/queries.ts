import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/live';

const HOME_PAGE_QUERY = defineQuery(`*[_type == 'homePage'][0]{
  headline,
  subheading,
  image,
  ctaLabel,
  defaultOgImage,
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
  mainImage
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
  details,
  variants[] {
    _key,
    label,
    duration,
    price
  },
  seoTitle,
  seoDescription,
  seoImage
}`);

export const fetchTreatmentBySlug = async (slug: string) => {
  return sanityFetch({ query: SINGLE_TREATMENT_QUERY, params: { slug } });
};

const PRICING_PAGE_QUERY =
  defineQuery(`*[_type == "treatmentCategory"] | order(name asc) {
  "id": _id,
  name,
  "treatments": *[_type == "treatment" && references(^._id)] | order(name asc) {
    "id": _id,
    name,
    slug,
    bookingUrl,
    variants[] {
      _key,
      label,
      duration,
      price
    }
  }
}`);

export const fetchPricingPage = async () => {
  return sanityFetch({ query: PRICING_PAGE_QUERY });
};

const CUSTOM_PAGE_QUERY =
  defineQuery(`*[_type == 'customPage' && slug.current == $slug][0]{
  title,
  content,
  seoTitle,
  seoDescription,
  seoImage
}`);

export const fetchCustomPageBySlug = async (slug: string) => {
  return sanityFetch({ query: CUSTOM_PAGE_QUERY, params: { slug } });
};

const NAVIGATION_QUERY = defineQuery(`*[_type == 'navigation'][0]{
  navMenuItems[]{
    _id,
    label,
    mode,
    mode == 'link' && linkType == "external" => {
      "link": {
        "type": "external",
        "url": externalLink
      }
    },
    mode == "link" && linkType == "static" => {
      "link": {
        "type": "static",
        "path": staticPath
      }
    },
    mode == "link" && linkType == "internal" => {
      "link": {
        "type": "internal",
        "target": internalLink->{
          name,
          shortDescription,
          "slug": slug.current,
          "pageType": _type,
          mainImage
        }
      }
    },
    mode == "group" => {
      "group": referencedTreatments[]->{
        name,
        shortDescription,
        "slug": slug.current,
        "pageType": _type,
        mainImage
      }
    }
  }
}`);

export const fetchNavigation = async () => {
  return sanityFetch({ query: NAVIGATION_QUERY });
};
