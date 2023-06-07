# Cyber @ UCI

![two staggered iPad Pros, the left showing Sanity Studio editing a user and the right showing the Cyber @ UCI homepage.](./assets/mockup.png)

This monorepo uses [turborepo](https://turbo.build/repo) with [pnpm](https://pnpm.io) as a package manager. It contains the following:

## `site`

This app contains the [SvelteKit](https://kit.svelte.dev/) app for the [Cyber @ UCI site](https://cyberuci.com/).

## `studio`

This app contains a [Sanity Studio](https://www.sanity.io/docs/sanity-studio) project. The Cyber @ UCI site uses [Sanity](https://www.sanity.io/) as a CMS. Sanity Studio is the customizable interface that board members use to edit content. It's currently deployed at <https://content.cyberuci.com/>.

## Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io) for code formatting

## Build

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

To develop an individual app or package, first navigate to the corresponding directory and run the dev command.

## Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```sh
cd cyberuci
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```sh
pnpm dlx turbo link
```

## Acknowledgments

Special thanks to the following people and projects.

### People

[Katherine Phung](https://www.linkedin.com/in/katherine-phung-b12003262/) for her numerous contributions to the Cyber brand and site design.

[Cyber Board](https://cyberuci.com/board)

### Projects

Inter: <https://rsms.me/inter/> (<https://github.com/rsms/inter>)

TINY: <http://velvetyne.fr/fonts/tiny> (<https://github.com/jckfa/tinyfonts>)

## License

This repo is source available and not licensed under an open source license.

Copyright © 2023 Cyber @ UCI
