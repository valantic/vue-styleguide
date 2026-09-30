# AI skill

`@valantic/vue-styleguide` ships a Claude Code skill, `vue-styleguide-demo-page`, that generates a
new demo page for one of your components, or restructures an existing ad-hoc one, following the
pattern described in [Demo page patterns](/guide/demo-page-patterns). The sidebar's **AI** section
(new icon, top of the right icon bar) links back to this page.

The skill and its templates live in the package at `node_modules/@valantic/vue-styleguide/ai/skills/vue-styleguide-demo-page/`.
It is not installed automatically — Claude Code only discovers skills placed in your own project's
`.claude/skills/`, so you need to point it there once. Two ways to do that:

## Symlink it into `.claude/skills` (recommended)

A symlink keeps the skill discoverable as a real Claude Code skill (so it shows up like any other
project skill) while always resolving to whatever version of the package is currently installed —
nothing to re-copy on update.

```sh
mkdir -p .claude/skills
ln -s ../../node_modules/@valantic/vue-styleguide/ai/skills/vue-styleguide-demo-page .claude/skills/vue-styleguide-demo-page
```

Commit the symlink (most `.gitignore` templates already exclude `node_modules` but not
`.claude/skills`), so teammates get it after `npm install` without repeating this step. On
Windows, creating symlinks may require Developer Mode or an elevated shell — see
[Microsoft's `mklink` docs](https://learn.microsoft.com/windows-server/administration/windows-commands/mklink)
if `ln -s` isn't available.

## Or reference it from your `CLAUDE.md`

If symlinks aren't practical in your environment (restricted permissions, a monorepo tooling setup
that prunes `node_modules` symlinks, etc.), point Claude at the installed copy directly from your
project's `CLAUDE.md`:

```md
When generating or restructuring a styleguide demo page for a component, follow
`node_modules/@valantic/vue-styleguide/ai/skills/vue-styleguide-demo-page/SKILL.md`.
```

This works without any filesystem changes, since `CLAUDE.md` is always loaded into context — but
the skill won't be auto-discovered/listed the way a real `.claude/skills` entry is; it only kicks
in when Claude reads your `CLAUDE.md` and follows the instruction.
