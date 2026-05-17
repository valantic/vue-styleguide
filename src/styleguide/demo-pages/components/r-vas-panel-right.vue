<template>
  <l-vas-layout>
    <div
      :class="b('preview')"
      class="vas-styleguide-reset vas-theme--dark"
    >
      <c-vas-panel-right />
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasPanelRight from '../../../components/c-vas-panel-right.vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide page for c-vas-panel-right.
   */
  export default defineComponent({
    name: 'r-vas-panel-right',

    components: {
      lVasLayout,
      cVasPanelRight,
    },

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
  .r-vas-panel-right {
    &__preview {
      width: 400px;
      height: 600px;
    }
  }
</style>
