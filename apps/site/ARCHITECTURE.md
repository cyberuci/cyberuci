# Architecture guide

How the Cyber @ UCI monorepo is put together, where things live, and how to pull content from Sanity with GROQ.

For fonts / colors / type styles, see [`DESIGN.md`](./DESIGN.md).

## Big picture

```
cyberuci/
├── apps/
│   ├── site/      # Public website (SvelteKit → Cloudflare)
│   └── studio/    # Sanity Studio CMS (content.cyberuci.com)
├── package.json   # pnpm + turborepo root
└── README.md
```

| App      | Stack                                                  | Deployed at                                          |
| -------- | ------------------------------------------------------ | ---------------------------------------------------- |
| `site`   | SvelteKit 5, UnoCSS, Sanity client, Cloudflare adapter | [cyberuci.com](https://cyberuci.com)                 |
| `studio` | Sanity Studio v3                                       | [content.cyberuci.com](https://content.cyberuci.com) |

Content editors change data in **Studio**. The **site** reads that data at request/build time via GROQ queries — it doesn’t store page copy in the repo (except design tokens, components, etc.).

```
Studio (schemas + desk)  →  Sanity Content Lake  →  site (+page.server.ts GROQ)  →  Svelte pages
```

## Running things

From the repo root:

```sh
pnpm install
pnpm run dev      # both apps via turbo
```

Or one app at a time:

```sh
cd apps/site && pnpm run dev
cd apps/studio && pnpm run dev
```

Site env vars live in `apps/site/.env` (`PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, etc.).

---

## Site (`apps/site`)

### Layout

```
apps/site/src/
├── routes/                 # SvelteKit pages (file-based routing)
│   ├── +layout.svelte      # global shell: fonts, Nav, Footer
│   ├── +layout.server.ts   # sitewide data (e.g. club email)
│   ├── (homepage)/         # `/` — homepage sections
│   ├── board/, alumni/, timeline/, …
│   └── package/            # corporate sponsorship page
├── lib/
│   ├── sanity/             # Sanity clients
│   ├── common/components/  # shared UI (Nav, Title, Calendar, …)
│   └── portableText/       # rich-text rendering from Sanity
├── app.css                 # mostly empty — tokens live in Uno
└── sanity.types.ts         # generated types from GROQ (don’t edit by hand)
```

Config worth knowing:

| File                                  | What it’s for                                     |
| ------------------------------------- | ------------------------------------------------- |
| `uno.config.ts`                       | Design tokens + shortcuts (`type-*`, `blue-*`, …) |
| `svelte.config.js` / `vite.config.ts` | SvelteKit + Vite                                  |
| `wrangler.jsonc`                      | Cloudflare Workers deploy                         |
| `sanity-typegen.json`                 | Points typegen at Studio’s `schema.json`          |

### Routes ↔ content

Most pages follow the same pattern:

1. `+page.server.ts` — fetch from Sanity with GROQ
2. `+page.svelte` — render with shared components / Portable Text

| URL            | Route folder   | Sanity type(s)                         |
| -------------- | -------------- | -------------------------------------- |
| `/`            | `(homepage)/`  | `homePage`, `info`, calendars          |
| `/board`       | `board/`       | `board` → `person`                     |
| `/alumni`      | `alumni/`      | `alumni`                               |
| `/timeline`    | `timeline/`    | `achievementsPage`, `timelineCategory` |
| `/events`      | `events/`      | `calendar` (+ Google Calendar API)     |
| `/news`        | `news/`        | `news`                                 |
| `/resources`   | `resources/`   | `resourcecopy`, `tag`                  |
| `/sponsors`    | `sponsors/`    | `sponsor`                              |
| `/package`     | `package/`     | `corporatePage`                        |
| `/competition` | `competition/` | `competitionPage`                      |
| `/subteams`    | `subteams/`    | `subteamsPage`                         |
| `/brand`       | `brand/`       | (static / local assets)                |

Singleton pages (one document in Studio) usually use a fixed `_id`, e.g. `homePage`, `corporatePage`, `achievementsPage`, `info`.

### Shared UI

| Path                                          | Use                                        |
| --------------------------------------------- | ------------------------------------------ |
| `lib/common/components/Title.svelte`          | Page title (`type-label` + `type-display`) |
| `lib/common/components/SectionHeading.svelte` | Rainbow `////////` section label           |
| `lib/common/components/Nav/`                  | Desktop + mobile nav                       |
| `lib/common/components/Footer.svelte`         | Footer (email from layout load)            |
| `lib/common/components/Calendar/`             | Schedule-X calendar helpers                |
| `lib/portableText/`                           | Maps Sanity blocks → Svelte components     |

### Data loading pattern

```ts
// routes/example/+page.server.ts
import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/sanityClient';
import { defineQuery } from 'groq';

export const load: PageServerLoad = async () => {
	const query = defineQuery(`
		*[_type == "someType"][0] {
			title,
			description
		}
	`);
	const data = await client.fetch(query);
	if (data === null) throw Error('Failed to load …');
	return { data };
};
```

Then in `+page.svelte`, use `data` from props (`PageData`).

Two clients exist:

- `$lib/sanity/sanityClient` — public CDN client (most pages)
- `$lib/sanity/sanityServer.server.ts` — tokenized client when you need drafts / private fields

---

## Studio (`apps/studio`)

```
apps/studio/
├── sanity.config.ts     # desk structure, plugins, project id
├── schemas/
│   ├── index.ts         # register all types here
│   ├── helpers.ts       # shared field helpers (blocks, alt images, …)
│   ├── pages/           # singleton page documents
│   ├── person.ts, board.ts, news.ts, …
│   └── …
└── schema.json          # exported schema for site typegen
```

- **Schemas** define what editors can enter (`defineType` / `defineField`).
- **Desk structure** in `sanity.config.ts` controls the sidebar (Home Page, Timeline, People, …).
- After schema changes that affect queries, regenerate site types (see below).

Document kinds:

| Kind           | Examples                                        | Notes                        |
| -------------- | ----------------------------------------------- | ---------------------------- |
| Singleton page | `homePage`, `corporatePage`, `achievementsPage` | One doc, fixed `_id` in desk |
| Collection     | `news`, `sponsor`, `alumni`, `person`           | Many docs, listed in desk    |
| Supporting     | `timelineCategory`, `tag`, `calendar`           | Referenced by other docs     |

---

## GROQ cheat sheet

GROQ is Sanity’s query language. You filter documents, then project the fields you need.

### Anatomy

```groq
*[_type == "news" && defined(slug.current)] | order(date desc) [0...10] {
  _id,
  title,
  "slug": slug.current,
  cover
}
```

| Piece              | Meaning                        |
| ------------------ | ------------------------------ | ---- |
| `*`                | All documents                  |
| `[filter]`         | Keep matching docs             |
| `                  | order(...)`                    | Sort |
| `[0]` / `[0...10]` | Take one / a slice             |
| `{ ... }`          | Projection — only these fields |

### Filters you’ll use a lot

```groq
*[_type == "news"]
*[_type == "homePage" && _id == "homePage"][0]
*[_type == "news" && slug.current == $slug][0]
*[_type == "sponsor" && tier == "gold"]
```

Pass params to `client.fetch(query, { slug })` when you use `$slug`.

### References

`->` follows a reference:

```groq
category->{ name, color }
article->{ title, cover, slug }
members[].person->{ name, email, image }
```

Expand an array of objects and pull nested refs:

```groq
years[] | order(year desc) {
  year,
  achievements[] | order(month desc) {
    _key,
    title,
    category->{ name, color }
  }
}
```

### Images & files

For URLs in the projection:

```groq
logo {
  asset->{ url },
  alt
}
file {
  asset->{ url }
}
```

On the site you can also build image URLs with `@sanity/image-url` + `imageUrlBuilder(client)` (see alumni / package pages).

### Ordering & slicing

```groq
*[_type == "news"] | order(date desc)
*[_type == "board"] | order(year desc)[0]   // latest board only
*[_type == "news"] | order(date desc)[0...3]
```

### Computed / renamed fields

```groq
{
  "slug": slug.current,
  "memberCount": count(members)
}
```

### Portable Text

If a field is an array of blocks, just select it and pass to `<PortableText>`:

```groq
description   // array of blocks
content
```

Custom block types (e.g. embedded `achievements`) are wired in `lib/portableText/PortableText.svelte`.

### Real examples from this repo

**Singleton page** (`timeline/+page.server.ts`):

```groq
*[_type == "achievementsPage" && _id == "achievementsPage"][0] {
  description,
  years[] | order(year desc) {
    year,
    achievements[] | order(month desc) {
      _key,
      title,
      month,
      category->{ name, color },
      description,
      placing,
      image
    }
  }
}
```

**Collection list** (`news/+page.server.ts`):

```groq
*[_type == "news"] | order(date desc) {
  _id,
  title,
  slug,
  date,
  cover
}
```

**Join-ish board query** (`board/+page.server.ts`) — people + their titles:

```groq
*[_type == "board"] | order(year desc) {
  _id,
  year,
  sections[] {
    _key,
    label,
    "members": members[].person-> {
      "person": @,
      "titles": ^.members[person._ref match ^._id].title
    }
  }
}
```

### Trying queries

Use **Vision** inside Studio (`/` → Vision tool) against the `production` dataset. Paste a query, inspect JSON, then copy it into a `+page.server.ts`.

### Typegen

After adding/changing `defineQuery` strings:

```sh
cd apps/site
pnpm run sanity-typegen
```

That regenerates `src/sanity.types.ts` from Studio’s `schema.json`. Commit the updated types when queries change.

---

## Where do I change X?

| I want to…                     | Go here                                                   |
| ------------------------------ | --------------------------------------------------------- |
| Add / edit a page route        | `apps/site/src/routes/<name>/`                            |
| Change nav links               | `lib/common/components/Nav/Big.svelte` (+ `Small.svelte`) |
| Change footer / club email     | `Footer.svelte` + `+layout.server.ts` + Studio **Info**   |
| Change colors / type styles    | `apps/site/uno.config.ts` (see DESIGN.md)                 |
| Add a Sanity field             | `apps/studio/schemas/…`, register in `schemas/index.ts`   |
| Change Studio sidebar          | `apps/studio/sanity.config.ts`                            |
| Fetch new CMS fields on a page | that page’s `+page.server.ts` GROQ projection             |
| Render rich text differently   | `lib/portableText/`                                       |
| Calendar look & behavior       | `routes/events/` + `lib/common/components/Calendar/`      |

---

## Conventions (short)

- Prefer Uno shortcuts (`type-body-1`, `background-3`, `text-blue-12`) over one-off CSS.
- Keep GROQ projections tight — only request fields the page uses.
- Singleton documents: filter by `_id` as well as `_type` when the desk pins an id.
- Don’t rename Sanity `_type`s lightly (`resourcecopy` is awkward on purpose — content already uses it).
- Schema cleanup is fine; **field renames need a content migration** or you’ll blank published data.
