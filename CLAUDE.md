# Green Point Beauty - Claude Instructions

## Project Overview

Next.js 16 (App Router) + Sanity v4 CMS website for a Hungarian beauty salon.
UI language in Sanity schemas is Hungarian. Code language is English.

## Tech Stack

- Next.js 16 with App Router and Turbopack
- React 19
- TypeScript (strict)
- Sanity v4 (headless CMS)
- Tailwind CSS v4
- Radix UI primitives
- Lucide React for icons

## Code Style

### General

- Use named exports for all components (not default exports, except Next.js page files which require default exports)
- Use `const` arrow functions for components
- Never use `any` in TypeScript
- Imports: external packages first, then internal `@/` imports, separated by a blank line

### Components

- No inline prop types, separate `type` always.
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Layout structure for pages: `<main>` wrapping `<Container>`, with `<BackgroundShapes />` and `<Footer />` included

### Sanity Schemas

- Use `defineType` and `defineField` from `'sanity'`
- Schema field titles in Hungarian, field names in English camelCase
- Always add `validation: (Rule) => Rule.required()` unless a field is intentionally optional
- Use `createSlugWithUrlInput(basePath)` for slug fields
- Use emoji functions for schema icons (e.g. `icon: () => '🗂️'`), not `@sanity/icons`

### Sanity Queries

- Define queries as `const` with `defineQuery()` from `'next-sanity'`, SCREAMING_SNAKE_CASE name ending in `_QUERY`
- Wrap fetch functions with `sanityFetch` from `@/sanity/lib/live`
- Export fetch functions named `fetch[Resource][ByX]`

### Tailwind

- Use the custom `fuego` color palette (e.g. `text-fuego-900`, `bg-fuego-100`)
- Mobile-first responsive design with `lg:` breakpoint as the primary desktop breakpoint

## Project Structure

- `src/app/` - Next.js app routes and components
- `src/app/components/` - Shared UI components
- `src/app/components/ui/` - Low-level UI primitives (Radix-based)
- `src/sanity/schemaTypes/` - Sanity document and field types
- `src/sanity/lib/` - Sanity client, queries, image helpers
- `src/lib/utils.ts` - Shared utilities (`cn`, etc.)

## After making schema changes

Run `npm run typegen` to regenerate TypeScript types from the Sanity schema.
