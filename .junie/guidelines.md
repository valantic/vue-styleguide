# Frontend Guidelines

## Tech Stack

- **Framework:** Vue 3.5 (Options API with `defineComponent`)
- **Language:** TypeScript (strict mode, target ES2021)
- **Build Tool:** Vite 7
- **State Management:** This project must not have any dependency to eg. Pinia or vuex
- **Routing:** Vue Router 4
- **Styling:** SCSS (scoped), BEM methodology via `vue-bem-cn`
- **i18n:** vue-i18n 11
- **HTTP:** Axios
- **Testing:** Vitest + @vue/test-utils
- **Linting:** ESLint (valantic config) + Stylelint (valantic config) + Prettier
- **Type Checking:** vue-tsc
- **Node:** >=22 <25, npm >=10 <12

## Project Structure

```
assets/vue/src/
├── assets/          # Static assets (icons, images)
├── components/      # Components (prefix: c-)
├── compositions/    # Vue composables
├── directives/      # Custom Vue directives
├── elements/        # Base/atomic elements (prefix: e-)
├── helpers/         # Pure utility/helper functions
├── layouts/         # Layout components (prefix: l-)
├── plugins/         # Vue plugins (dayjs, tooltip, viewport, etc.)
├── setup/           # App setup (globals, i18n, routes, SCSS, plugins)
├── stores/          # Pinia stores
├── styleguide/      # Styleguide routes and pages (prefix: r-)
├── translations/    # i18n translation files
└── types/           # TypeScript type definitions (.d.ts and .ts)
```

## Component Conventions

### Naming
- **Components:** `c-` prefix, kebab-case (e.g., `c-add-to-cart.vue`)
- **Elements:** `e-` prefix, kebab-case (e.g., `e-button.vue`)
- **Layouts:** `l-` prefix, kebab-case (e.g., `l-default.vue`)
- **Styleguide routes:** `r-` prefix, kebab-case

### Component Structure
Components use the **Options API** with `defineComponent`. Follow this order:

```vue
<template>
    <div :class="b()"></div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    // type Setup = {};
    // type Data = {};

    /**
     * A Description what the component does.
     */
    export default defineComponent({
        name: 'c-component-name',

        // components: {},

        // props: {},
        // emits: {},

        // setup(): Setup {},
        // data(): Data {
        //   return {};
        // },

        // computed: {},
        // watch: {},

        // beforeCreate() {},
        // created() {},
        // beforeMount() {},
        // mounted() {},
        // beforeUpdate() {},
        // updated() {},
        // activated() {},
        // deactivated() {},
        // beforeUnmount() {},
        // unmounted() {},

        // methods: {},
        // render() {},
    });
</script>

<style lang="scss">
    // @use '@/setup/scss/variables';

    .c-component-name {}
</style>

```

### Key Patterns
- **BEM classes:** Use the `b()` helper from `vue-bem-cn` in templates (e.g., `:class="b('element', { modifier })"`)
- **Type annotations:** Define `Setup` and `Data` types above `defineComponent` for typed `setup()` and `data()` return values
- **Commented placeholders:** Unused lifecycle hooks and sections are left as comments (e.g., `// mounted() {}`) to show available options
- **Props:** Always include JSDoc descriptions and use `PropType` for complex types
- **Scoped styles:** Use `<style scoped lang="scss">` (exception: when child component deep styling is needed, omit `scoped`)

## Stores

- Use **Options API** style (`defineStore` with `state`, `getters`, `actions`)
- Define a `StoreState` type for the state
- Store names come from a `Store` enum in `@/setup/globals`
- Export as default: `export default defineStore(storeName, { ... })`
- Use stores in components via `setup()`: `return { store: useMyStore() }`

## Styling

- **SCSS** with `@use` syntax (not `@import`)
- Import shared variables/mixins: `@use '@/setup/scss/variables'` and `@use '@/setup/scss/mixins'`
- Use `mixins.font()` for font declarations
- Use SCSS variables for spacing, colors, font sizes (e.g., `variables.$spacing--35`, `variables.$color-primary--2--rgb`)
- BEM naming: `.c-component-name`, `&__element`, `&--modifier`
- Use `rem` units for sizing

## Path Aliases

- Never use aliases.

## Imports

- Use camelCase for component imports: `import eButton from '@/elements/e-button.vue'`
- Group imports: Vue/external libs → stores → components/elements → helpers → types
- Use Prettier with `@trivago/prettier-plugin-sort-imports` for automatic sorting

## Testing

- Test framework: **Vitest** with **@vue/test-utils**
- Tests located in `tests/unit/specs/`
- Run tests: `npm run test:unit`
- Run all checks: `npm run test` (lint + unit tests)

## Linting & Formatting

- `npm run lint` — Run ESLint + Stylelint + vue-tsc
- `npm run lint:eslint` — ESLint only
- `npm run lint:stylelint` — Stylelint only
- `npm run prettier` — Format with Prettier
- `npm run tsc` — TypeScript type checking via vue-tsc

## Build

- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run build:all` — Build icons + production build
- `npm run build:icons` — Generate SVG sprite from `src/assets/icons/`
