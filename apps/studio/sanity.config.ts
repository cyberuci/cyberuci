import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'cyberuci.com',

  projectId: 'bbsuwd70',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            ...S.documentTypeListItems().filter(
              (listItem) => !['event'].includes(listItem.getId()!)
            ),
            S.listItem()
              .title('Event')
              .child(
                S.documentList()
                  .title('Event')
                  .filter('_type == "event"')
                  .menuItems([...S.documentTypeList('event').getMenuItems()!])
                  .defaultOrdering([{field: 'start', direction: 'desc'}])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
