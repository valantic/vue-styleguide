<template>
  <l-vas-layout :class="b()">
    <c-vas-demo-card>
      <template #header>TODO: component name</template>
      <template #demo>
        <!-- TODO: render the component being demoed, bound to `state` -->
      </template>
      <template #sidebar>
        <e-vas-checkbox
          v-for="key in Object.keys(state)"
          v-model="state[key]"
          :key="key"
          :name="key"
        >
          {{ key }}
        </e-vas-checkbox>
      </template>
    </c-vas-demo-card>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { eVasCheckbox } from '@valantic/vue-styleguide/elements';
  import { cVasDemoCard } from '@valantic/vue-styleguide/features';
  import { lVasLayout } from '@valantic/vue-styleguide/layouts';

  // type Setup = {};
  type Data = {
    state: {
      [key: string]: boolean;
      // TODO: one boolean per prop/state you want a sidebar toggle for, e.g. disabled: false;
    };
  };

  /**
   * TODO: add demo page description.
   */
  export default defineComponent({
    name: 'r-component-demo',

    components: {
      cVasDemoCard,
      eVasCheckbox,
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
          // TODO: disabled: false, ...
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
