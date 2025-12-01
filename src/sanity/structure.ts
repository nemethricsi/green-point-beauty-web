import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Green Point Beauty')
    .items([
      S.divider().title('Egyedi tartalmak'),
      S.listItem()
        .id('navigation')
        .schemaType('navigation')
        .title('Főmenü')
        .child(
          S.editor()
            .id('navigation')
            .schemaType('navigation')
            .documentId('navigation'),
        ),
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
      S.divider().title('Gyűjtemények'),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !['homePage', 'navigation'].includes(item.getId()!),
      ),
    ]);
