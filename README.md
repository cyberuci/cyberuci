# Cyber @ UCI

Internal Cyber @ UCI members should refer to this [Bookstack book](https://docs.cyberuci.com/books/website) for more detailed documentaion.

This monorepo uses [turborepo](https://turbo.build/repo) with [pnpm](https://pnpm.io) as a package manager. It contains the following:

## `site`

This app contains the [SvelteKit](https://kit.svelte.dev/) app for the [Cyber @ UCI site](https://cyberuci.com/).

## `studio`

This app contains a [Sanity Studio](https://www.sanity.io/docs/sanity-studio) project. The Cyber @ UCI site uses [Sanity](https://www.sanity.io/) as a CMS. Sanity Studio is the customizable interface that board members use to edit content. It's currently deployed at <https://content.cyberuci.com/>.

<!-- TODO: Document or remove og and docs apps. -->

## Utilities

This turborepo has some additional tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io) for code formatting

## Build

If it is your first time, you will need to install the dependencies:

```sh
cd cyberuci
npm install -g pnpm
pnpm install
```

(Assumes you already have Node and npm installed.)

To build all apps and packages, run the following command:

```sh
cd cyberuci
pnpm run build
```

To build an individual app or package, first navigate to the corresponding directory and run the build command.

## Develop

To develop all apps and packages, run the following command:

```sh
cd cyberuci
pnpm run dev
```

To develop an individual app or package, first navigate to the corresponding directory then run the dev command.

## Acknowledgments

### Fonts

- Inter (OFL-1.1): <https://rsms.me/inter/> (<https://github.com/rsms/inter>)
- TINY (OFL-1.1): <http://velvetyne.fr/fonts/tiny> (<https://github.com/jckfa/tinyfonts>)
- BBB Strobo (OFL-1.1)

## License

This repo is source available, but not licensed under an open source license.

Copyright © 2024 Cyber @ UCI
