# Release process

Releases are made directly from `main` via the npm scripts defined in `package.json`. Tags are always `vX.Y.Z`.

| Command                 | Bump  | Example           |
| ----------------------- | ----- | ----------------- |
| `npm run release`       | patch | `1.2.0` → `1.2.1` |
| `npm run release:minor` | minor | `1.2.0` → `1.3.0` |
| `npm run release:major` | major | `1.2.0` → `2.0.0` |

## Before releasing

Make sure all changes are merged into `main` and described under `## unreleased` in `CHANGELOG.md`. The release script
handles the heading rename — no manual edits needed.

## What the release script does

All three commands run `scripts/release.mjs`, which is shared by all valantic shared-frontend repos. It runs every step
explicitly instead of using an npm `version` lifecycle hook, because `.npmrc` sets `ignore-scripts=true`, which makes
`npm version` skip lifecycle hooks.

1. **Checks** — aborts without changing anything if the current branch is not `main`, the working tree is not clean,
   `main` is behind `origin/main`, or the `## unreleased` section in `CHANGELOG.md` is empty
2. **Bumps** the version in `package.json` and `package-lock.json`
3. **Updates `CHANGELOG.md`** — renames `## unreleased` to `## v{version}` and inserts a fresh empty `## unreleased`
   above it
4. **Updates `README.md`** — replaces the version tag in the install example with the new version
5. **Creates a git commit** with the message `Release v{version}`
6. **Tags** the commit with the annotated tag `v{version}`
7. **Pushes** the commit and tag to the remote

## After releasing

The `Release` workflow (`.github/workflows/release.yml`) runs for the pushed tag and creates the
[GitHub release](https://github.com/valantic/vue-styleguide/releases), using the tag's `CHANGELOG.md` section as release
notes. Verify it there and check that the install example in `README.md` points to the new tag.
