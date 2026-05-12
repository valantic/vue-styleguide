# Release process

Releases are done via the npm scripts defined in `package.json`. There are three release types:

| Command | Bump | Example |
|---|---|---|
| `npm run release` | patch | `1.2.0` → `1.2.1` |
| `npm run release:minor` | minor | `1.2.0` → `1.3.0` |
| `npm run release:major` | major | `1.2.0` → `2.0.0` |

## Before releasing

Move all entries from the `## unreleased` section in `CHANGELOG.md` to confirm they are release-ready. The release script handles the header rename automatically — no manual edits needed.

## What the release script does

Running any of the release commands triggers the following sequence:

1. **Bumps** the version in `package.json`
2. **Updates `CHANGELOG.md`** — renames `## unreleased` to `## v{version}` and inserts a fresh empty `## unreleased` block at the top
3. **Updates `README.md`** — replaces the version tag in the install example with the new version
4. **Creates a git commit** containing all three changed files with the message `Release {version}`
5. **Tags** the commit as `v{version}`
6. **Pushes** the commit and tag to the remote

Steps 2–4 are handled automatically by the `version` npm lifecycle hook (`scripts/update-release-files.js`), which npm calls between the version bump and the git commit.

## After releasing

Verify the new tag appears at [https://github.com/valantic/vue-styleguide/tags](https://github.com/valantic/vue-styleguide/tags) and that the install example in `README.md` points to the correct tag.
