# Contributing to this repository

## Getting started

- Clone this repository.
- Use the Node.js version from `.nvmrc` (e.g. `nvm use`) and install the dependencies with `npm ci`.
- `npm run dev` starts the demo app, `npm run dev:docs` the documentation site.

## Developing

- Create a branch from `main`: `feature/<name>` or `bugfix/<name>`.
- Base new components, plugins and stores on the files in `blueprints/`.
- Run `npm run build:icons` after adding or removing an icon SVG.
- Run `npm test` and fix all issues.
- Update the documentation site in `docs/` if a consumer-facing feature changed, and check it with
  `npm run build:docs`.
- Add a changelog entry (see below).
- Open a pull request using the pull request template.

## Changelog

Every change gets an entry under `## unreleased` in [CHANGELOG.md](CHANGELOG.md), e.g. `- [fix] Description.`.
Breaking changes go under `### Breaking Changes` with a **Migration:** note. The full convention is described in
[AGENTS.md](AGENTS.md#changelog-required-for-every-task).

## Releasing

Releases are made directly from `main` with `npm run release[:minor|:major]`. The full process is described in the
[Release process](https://valantic.github.io/vue-styleguide/contributing/release-process) guide
(`docs/contributing/release-process.md`).
