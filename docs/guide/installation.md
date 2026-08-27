# Installation

`@valantic/vue-styleguide` is only ever loaded in `DEV` mode. It is shipped as raw, uncompiled
source — your project's own build processes these files exactly like first-party source, so
keeping it out of production is your responsibility. See [Setup](/guide/setup) for how to guard it.

## Requirements

- Node.js `>=20`
- npm `>=10`
- Vue `~3.5`

## Install via npm

To reduce dev overhead this package is currently only installable via a GitHub link. Add it to
your `devDependencies`, pinned to a released tag:

```json
{
  "devDependencies": {
    "@valantic/vue-styleguide": "github:valantic/vue-styleguide#v2.1.0"
  }
}
```

Find available versions on the [tags page](https://github.com/valantic/vue-styleguide/tags).

## Part of vue-template

This library is part of the [vue-template](https://github.com/valantic/vue-template) project.
Check that repository for a full, real-world usage reference — in particular
[`src/styleguide/styleguide.vue`](https://github.com/valantic/vue-template/blob/main/src/styleguide/styleguide.vue).

## Next steps

Continue with [Setup](/guide/setup) to wire the sidebar into your project.
