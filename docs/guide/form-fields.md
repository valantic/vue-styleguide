# Form fields

Every form element ships with a built-in `label` property, so a field no longer has to be
wrapped in a hand-styled `<label>` on every page:

```vue
<template>
  <e-vas-input
    v-model="name"
    name="name"
    label="Your name"
  />
</template>

<script lang="ts">
  import { eVasInput } from '@valantic/vue-styleguide/elements';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'my-form',

    components: {
      eVasInput,
    },

    data() {
      return {
        name: '',
      };
    },
  });
</script>
```

The styling is a port of [Vuetify's](https://vuetifyjs.com) `filled` field variant — the
framework default — scaled down to the styleguide's compact type scale. Both the light and
the dark theme are covered, because every color comes from the `--vas-theme-*` custom
properties (see [Settings](/guide/settings)).

## Available elements

| Element             | Control                   | Label behaviour         |
| ------------------- | ------------------------- | ----------------------- |
| `e-vas-input`       | `<input>`                 | Floats out of the field |
| `e-vas-textarea`    | `<textarea>`              | Floats out of the field |
| `e-vas-select`      | `<select>`                | Floats out of the field |
| `e-vas-multiselect` | dropdown with checkboxes  | Floats out of the field |
| `e-vas-checkbox`    | `<input type="checkbox">` | Next to the control     |
| `e-vas-radio`       | `<input type="radio">`    | Next to the control     |
| `e-vas-toggle`      | switch                    | Next to the control     |

All of them are exported from `@valantic/vue-styleguide/elements`.

## Text fields

`e-vas-input`, `e-vas-textarea`, `e-vas-select` and `e-vas-multiselect` share the same field
shell (`e-vas-field`). The label starts inside the field and floats above the value as soon as
the field is focused or holds a value — exactly like Vuetify's text fields.

Because the label occupies the field while it is empty, a `placeholder` is only shown once the
label has floated out of the way. This keeps the two from overlapping and means you can pass
both:

```vue
<e-vas-input v-model="name" name="name" label="Your name" placeholder="e.g. Ada Lovelace" />
```

The label is connected to its control with a matching `id`/`for` pair, which is generated for
you. `e-vas-multiselect` is the exception: its control is a `<button>`, so the label is
referenced with `aria-labelledby` instead.

Without a `label`, the field renders exactly as before — the control is vertically centered and
the placeholder shows immediately.

### Textarea

`e-vas-textarea` is the multiline counterpart of `e-vas-input`:

```vue
<e-vas-textarea v-model="description" name="description" label="Description" :rows="3" auto-grow />
```

| Prop       | Type               | Default | Purpose                                                                       |
| ---------- | ------------------ | ------- | ----------------------------------------------------------------------------- |
| `rows`     | `String \| Number` | `5`     | Amount of visible text lines.                                                 |
| `autoGrow` | `Boolean`          | `false` | Grows the field with its content instead of scrolling it. Implies `noResize`. |
| `noResize` | `Boolean`          | `false` | Prevents the user from resizing the field.                                    |

Everything else (`modelValue`, `name`, `title`, `placeholder`, `state`, `label`) matches
`e-vas-input`.

## Selection controls

`e-vas-checkbox`, `e-vas-radio` and `e-vas-toggle` render their label next to the control, the
way Vuetify's `VCheckbox`, `VRadio` and `VSwitch` do — for `e-vas-toggle` that means **after**
the track:

```vue
<e-vas-checkbox v-model="accepted" name="terms" label="I accept the terms" />

<e-vas-toggle v-model="enabled" label="Notifications" />
```

`e-vas-toggle` additionally shows a check icon in its thumb while it is on and a close icon
while it is off, so the state never depends on color alone.

The default slot still works and takes precedence over the `label` property, so a label that
needs markup stays possible:

```vue
<e-vas-checkbox v-model="accepted" name="terms">
  I accept the <a href="/terms">terms</a>
</e-vas-checkbox>
```

## States

All form fields accept a `state` property (`default`, `success`, `info`, `warning`, `error`),
which colors the label, the underline and the selection indicators:

```vue
<e-vas-input v-model="email" name="email" label="E-mail" state="error" />
```

## Sizing

The fields size themselves from `--vas-font-size-label`, so they follow the font size chosen in
the sidebar settings instead of using fixed pixel heights. Inside the sidebar that variable is
set by `c-vas-sidebar`; elsewhere the fields fall back to the default of 13px.
