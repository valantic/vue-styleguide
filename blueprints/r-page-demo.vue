<template>
  <l-vas-layout :class="b()">
    <template #pageConfig>
      <!-- TODO: page-wide scenario toggles, e.g. loading/empty/error states, permission flags -->
      <e-vas-toggle
        v-for="key in Object.keys(state)"
        v-model="state[key]"
        :key="key"
        :name="key"
      >
        {{ key }}
      </e-vas-toggle>
    </template>

    <!-- TODO: render the page/organism being demoed, bound to `state` -->
  </l-vas-layout>
</template>

<script lang="ts">
  // TODO: adjust these relative import paths to this file's final location under
  // src/styleguide/demo-pages/**; the depth below matches src/styleguide/demo-pages/<category>/.
  import { defineComponent } from 'vue';
  import eVasToggle from '../../../elements/e-vas-toggle.vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Data = {
    state: {
      [key: string]: boolean;
      // TODO: one boolean per scenario toggle, e.g. isEmpty: false;
    };
  };

  /**
   * TODO: add demo page description.
   *
   * Use this blueprint for organisms or full pages that host many components (e.g. a checkout
   * page) — not for a single small component's props/states, which belongs in
   * `r-component-demo.vue` with `c-vas-demo-card` instead.
   */
  export default defineComponent({
    name: 'r-page-demo',

    components: {
      eVasToggle,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        state: {
          // TODO: isEmpty: false, ...
        },
      };
    },

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
