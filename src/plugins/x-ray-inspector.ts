import type { App, ComponentPublicInstance, Plugin } from 'vue';
import { markComponentInstance } from '../utils/vue-component-inspector';

/**
 * Marks every component's root DOM element with its name and source file, via a global mixin,
 * so x-ray mode can resolve accurate component boundaries — including third-party components
 * (e.g. from Vuetify) — instead of relying solely on Vue's internal, single-slot
 * `__vueParentComponent` reference. Register once, before `app.mount()`:
 *
 *   import { vasXRayInspector } from '@valantic/vue-styleguide';
 *
 *   if (import.meta.env.DEV) {
 *     app.use(vasXRayInspector);
 *   }
 *
 * See docs/x-ray-mode.md for the full setup guide.
 */
export default {
  install(app: App): void {
    app.mixin({
      mounted(this: ComponentPublicInstance): void {
        const options = this.$options as { name?: string; __name?: string; __file?: string };
        // eslint-disable-next-line no-underscore-dangle
        const name = options.name ?? options.__name ?? null;
        // eslint-disable-next-line no-underscore-dangle
        const file = options.__file ?? null;

        markComponentInstance(this.$el, name, file);
      },
    });
  },
} satisfies Plugin;
