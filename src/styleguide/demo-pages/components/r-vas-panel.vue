<template>
  <l-vas-layout>
    <div
      :class="b('preview')"
      class="vas-styleguide-theme-dark"
    >
      <c-vas-panel
        v-model:active-panel="activePanel"
      />
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasPanel, { type ActivePanel } from '../../../components/c-vas-panel.vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Data = {
    activePanel: ActivePanel;
  };

  /**
   * Styleguide page for c-vas-panel.
   */
  export default defineComponent({
    name: 'r-vas-panel',

    components: {
      lVasLayout,
      cVasPanel,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        activePanel: 'navigation',
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

<style lang="scss">
  .r-vas-panel {
    &__preview {
      width: 400px;
      height: 600px;
    }
  }
</style>
