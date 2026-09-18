# Design system guide

Quick reference for fonts, type styles, and colors on the Cyber @ UCI site. All of these live in [`uno.config.ts`](./uno.config.ts) as UnoCSS shortcuts / theme tokens — prefer the class names below instead of inventing one-offs.

For repo layout and Sanity / GROQ, see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Fonts

Three families, loaded via Google Fonts in `+layout.svelte`:

| Family           | Uno token       | Used for                   |
| ---------------- | --------------- | -------------------------- |
| Pixelify Sans    | `font-pixelify` | Big display titles         |
| TASA Explorer    | `font-explorer` | Headings + body copy       |
| Google Sans Code | `font-sans`     | Labels, nav, small UI text |

You almost never need the `font-*` classes directly — use the type shortcuts instead.

## Type styles

| Class            | Font             | Role                   | Typical use                            |
| ---------------- | ---------------- | ---------------------- | -------------------------------------- |
| `type-display`   | Pixelify Sans    | Page / hero title      | Main `h1`, landing headlines           |
| `type-heading-1` | TASA Explorer    | Subheading (larger)    | Section titles, card titles            |
| `type-heading-2` | TASA Explorer    | Subheading (smaller)   | Secondary headings, portable-text `h2` |
| `type-body-1`    | TASA Explorer    | Body (default)         | Paragraphs, descriptions               |
| `type-body-2`    | TASA Explorer    | Body (looser / larger) | Longer prose, hero supporting text     |
| `type-label`     | Google Sans Code | Label / eyebrow        | Section labels, nav, badges, metadata  |

### Titles

For full page titles, use the shared `Title` component:

```svelte
import Title from '$lib/common/components/Title.svelte';

<Title title="Events" />
<!-- large (default): [EVENTS] label + type-display h1 -->

<Title title="Events" size="small" />
<!-- just the uppercase label -->
```

### Subheadings

```svelte
<h2 class="type-heading-1">Why Sponsor</h2><h3 class="type-heading-2">Club Events</h3>
```

Section labels (with an icon, like on the package page) usually sit on `type-label`:

```svelte
<h2 class="flex items-center gap-2 type-label font-550">
	<Info size={18} /> About
</h2>
```

There's also `SectionHeading` if you want the rainbow `////////` prefix used in a few places.

### Paragraphs

```svelte
<p class="type-body-1">Short description next to a heading.</p>
<p class="type-body-2 text-gray-11 dark:text-graydark-11">
	Longer supporting copy. Muted with text-2 / gray-11 is common.
</p>
```

Portable Text paragraphs already use `type-body-1` via `Paragraph.svelte`.

### Quick pairing cheatsheet

```
type-label          → eyebrow / section name
type-display        → page title
type-heading-1/2    → section / card title
type-body-1/2       → the actual words under it
```

## Colors

Accent blues come from a Radix-style scale (1 lightest → 12 darkest). Brand blue is step **9** (`#2975BA`).

### `blue` (light backgrounds)

| Step  | Hex           | Notes                             |
| ----- | ------------- | --------------------------------- |
| 1     | `#f7fbff`     | Near-white blue tint              |
| 2     | `#f0f6fe`     |                                   |
| 3     | `#e1f1ff`     | Soft fills, pill backgrounds      |
| 4     | `#d2eaff`     |                                   |
| 5     | `#c0dfff`     |                                   |
| 6     | `#acd2fa`     |                                   |
| 7     | `#91c1f2`     | Accent text on dark cards         |
| 8     | `#68a9ea`     | Buttons / interactive fills       |
| **9** | **`#2975ba`** | **Primary brand blue**            |
| 10    | `#1767ab`     | Borders, slightly darker brand    |
| 11    | `#1b6aae`     | Readable accent text (light mode) |
| 12    | `#1b3d5d`     | Links / strongest blue text       |

### `bluedark` (dark backgrounds)

Same accent at step 9; lighter steps sit on dark UI, and 11–12 are the bright readables.

| Step  | Hex                   | Notes                                     |
| ----- | --------------------- | ----------------------------------------- |
| 1–2   | `#0e1822` / `#101b27` | Near-black blue surfaces                  |
| 3     | `#0b2945`             | Card / panel backgrounds                  |
| 4–8   | …                     | Intermediate surfaces                     |
| **9** | **`#2975ba`**         | **Same brand blue**                       |
| 10    | `#2968a2`             |                                           |
| 11    | `#75bbff`             | Bright accent text (≈ brand “Light Blue”) |
| 12    | `#cae6ff`             | Softest highlight text                    |

Brand page also calls out `#33B6FB` as Light Blue — closest token in-app is `bluedark-11` (`#75bbff`). Prefer tokens over hardcoding hex.

### How to use them

```svelte
<!-- text -->
<a class="text-blue-12 dark:text-bluedark-12">Link</a>
<h2 class="text-blue-7">Accent title on a dark card</h2>

<!-- backgrounds -->
<div class="bg-blue-9">Brand fill</div>
<div class="bg-bluedark-3">Dark panel</div>

<!-- borders -->
<div class="border-1 border-blue-10 border-solid">…</div>
```

Uno maps these to utilities like `bg-blue-9`, `text-bluedark-11`, `border-blue-10`, etc.

### Neutrals & surfaces

Grays come from Radix (`gray` / `graydark`). Shortcuts you’ll see a lot:

| Class                         | What it does                                     |
| ----------------------------- | ------------------------------------------------ |
| `background` … `background-5` | Page / card surfaces (dark-mode aware)           |
| `text`                        | Primary body text (`gray-12` / `graydark-12`)    |
| `text-2`                      | Muted secondary text (`gray-11` / `graydark-11`) |

```svelte
<div class="background-3 border-1 border-blue-10 rounded border-solid p-6">
	<p class="text">Primary copy</p>
	<p class="text-2">Secondary / muted</p>
</div>
```

## Layout helpers

- `space-x` — horizontal page padding + `max-w-7xl` centering. Most pages wrap content in this.
- Dark mode is class-based (`dark:` variants). Site is currently dark-first.

## Where to change things

| What                               | File                                                        |
| ---------------------------------- | ----------------------------------------------------------- |
| Type shortcuts + color scales      | `apps/site/uno.config.ts`                                   |
| Font loading                       | `apps/site/src/routes/+layout.svelte`                       |
| Page title component               | `apps/site/src/lib/common/components/Title.svelte`          |
| Rainbow section label              | `apps/site/src/lib/common/components/SectionHeading.svelte` |
| Portable Text heading/body mapping | `apps/site/src/lib/portableText/blocks/`                    |
