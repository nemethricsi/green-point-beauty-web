'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { schema, singletonTypes } from '@/sanity/schemaTypes';
import { structure } from '@/sanity/structure';

const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  tools: (prev, { currentUser }) => {
    const isAdmin = currentUser?.roles.some(
      (role) => role.name === 'administrator',
    );

    if (isAdmin) {
      return prev;
    }

    return prev.filter((tool) => tool.name !== 'vision');
  },
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== 'homePage'),
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
