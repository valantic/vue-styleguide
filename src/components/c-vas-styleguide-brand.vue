<template>
  <div :class="b()">
    <e-vas-icon
      :class="b('logo')"
      icon="i-vuejs"
      size="22"
    />
    <span :class="b('slogan')">Styleguide</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasIcon from '../elements/e-vas-icon.vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide brand component.
   */
  export default defineComponent({
    name: 'c-vas-styleguide-brand',
    components: {
      eVasIcon,
    },

    // props: {},
    // emits: [],

    // setup(): Setup {
    //   return {};
    // },
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
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .c-vas-styleguide-brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: variables.$vas-spacing--6;
    color: variables.$vas-color-green-vue;
    font-size: variables.$vas-font-size--18;
    font-weight: 900;
  }
</style>
