import type {ConfigContext} from 'sanity'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import groq from 'groq'

export default defineConfig({
  name: 'default',
  title: 'cyberuci.com',

  projectId: 'bbsuwd70',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: async (S, context: ConfigContext) => {
        const {getClient} = context
        const client = getClient({apiVersion: '2023-04-08'})

        const getBoardYearList = async (id: string) => {
          const query = groq`
            *[_type == "board" && _id == $boardId][0] {
              year,
              sections[] {
                label,
                members[] {
                  title,
                  terms,
                  person->
                }
              }
            }
          `
          const board = await client.fetch<{
            year: number
            sections: {
              label: string
              members: {
                title: string
                terms: string[]
                person: {
                  _id: string
                  name: string
                }
              }[]
            }[]
          }>(query, {boardId: id})

          const sections = (board.sections ?? [])
            .map((section) => [
              section.members.map((member) =>
                S.documentListItem()
                  .title(member.person.name)
                  .schemaType('person')
                  .id(section.label + member.person._id)
              ),
              S.divider(),
            ])
            .flat(2)

          return S.list()
            .title(board.year + ' Board')
            .items(sections)
        }

        const getBoardYearItems = async () => {
          // Currently excluding board drafts.
          // Members that appear under a specific board year will be the currently published values.
          // This might not be desirable behavior.
          const query = groq`
            *[_type == "board" && !(_id in path("drafts.**"))] | order(year desc) {
              _id,
              year
            }
          `
          const boardYears = await client.fetch<{_id: string; year: number}[]>(query)

          const listItems = boardYears.map(async ({_id, year}) =>
            S.listItem()
              .title(year + ' Board')
              .child(await getBoardYearList(_id))
          )
          return Promise.all(listItems)
        }

        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('People')
              .child(
                S.list()
                  .title('People')
                  .items([
                    S.listItem()
                      .title('All')
                      .child(
                        S.documentList()
                          .title('People')
                          .filter('_type == "person"')
                          .menuItems([...S.documentTypeList('person').getMenuItems()!])
                      ),
                    S.divider(),
                    ...(await getBoardYearItems()),
                  ])
              ),
            S.listItem()
              .title('Boards')
              .child(
                S.documentList()
                  .title('Boards')
                  .filter('_type == "board"')
                  .menuItems([...S.documentTypeList('board').getMenuItems()!])
                  .defaultOrdering([{field: 'year', direction: 'desc'}])
              ),
            S.listItem()
              .title('Events')
              .child(
                S.documentList()
                  .title('Events')
                  .filter('_type == "event"')
                  .menuItems([...S.documentTypeList('event').getMenuItems()!])
                  .defaultOrdering([{field: 'start', direction: 'desc'}])
              ),
          ])
      },
      // structure: (S) =>
      //   S.list()
      //     .title('Content')
      //     .items([
      //       ...S.documentTypeListItems().filter(
      //         (listItem) => !['event'].includes(listItem.getId()!)
      //       ),
      //
      //     ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
