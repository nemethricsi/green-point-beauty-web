import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Studio')
    .items([
      S.listItem()
        .id('homePage')
        .schemaType('homePage')
        .title('Főoldal')
        .child(
          S.editor()
            .id('homePage')
            .schemaType('homePage')
            .documentId('homePage'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['homePage'].includes(item.getId()!),
      ),
    ]);
