import type {ConfigContext} from 'sanity'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {
  CogIcon,
  EarthAmericasIcon,
  EnvelopeIcon,
  UserIcon,
  UsersIcon,
  CalendarIcon,
} from '@sanity/icons'
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
                _key,
                label,
                members[] {
                  title,
                  terms,
                  person->{
                    _id,
                    name,
                    "imageUrl": image.asset->url
                  }
                }
              }
            }
          `
          const board = await client.fetch<{
            year: number
            sections: {
              _key: string
              label: string
              members: {
                title: string
                terms: string[]
                person: {
                  _id: string
                  name: string
                  imageUrl: string
                }
              }[]
            }[]
          }>(query, {boardId: id})

          // TODO: This is probably pretty susceptible to breaking with empty sections.
          const memberIds = Array.from(
            new Set(
              board.sections
                ?.map((section) => [section.members?.map((member) => member.person._id)])
                .flat(2)
            )
          )

          return S.list()
            .title(board.year + ' Board')
            .items(memberIds.map((id) => S.documentListItem().schemaType('person').id(id)))
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
              .title('Site Settings')
              .icon(CogIcon)
              .child(
                S.list()
                  .title('Site Settings')
                  .items([
                    S.listItem()
                      .title('Info')
                      .icon(EarthAmericasIcon)
                      .child(S.document().schemaType('info').documentId('info')),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title('Landing Page')
              .child(S.document().schemaType('landingPage').documentId('landingPage')),
            S.listItem()
              .title('Contact Page')
              .icon(EnvelopeIcon)
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.divider(),
            S.listItem()
              .title('People')
              .icon(UserIcon)
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
              .icon(UsersIcon)
              .child(
                S.documentList()
                  .title('Boards')
                  .filter('_type == "board"')
                  .menuItems([...S.documentTypeList('board').getMenuItems()!])
                  .defaultOrdering([{field: 'year', direction: 'desc'}])
              ),
            S.listItem()
              .title('Events')
              .icon(CalendarIcon)
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
