// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from 'next-sanity/live';

import { client } from '@/sanity/lib/client';

export const { sanityFetch, SanityLive } = defineLive({
  client,

  /**
   * No `serverToken` provided to `defineLive`.
   * This means that only published content will be fetched
   * and respond to live events. You can silence this warning
   * by setting `serverToken: false`.
   */
  serverToken: false,

  /**
   * No `browserToken` provided to `defineLive`.
   * This means that live previewing drafts will only work
   * when using the Presentation Tool in your Sanity Studio.
   * To support live previewing drafts stand-alone, provide a `browserToken`.
   * It is shared with the browser so it should only have Viewer rights or lower.
   * You can silence this warning by setting `browserToken: false
   */
  browserToken: false,
});
