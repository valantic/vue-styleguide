<template>
  <div :class="b()">
    <div :class="b('container')">
      <div :class="b('headline')">
        <e-vas-icon
          :class="b('logo')"
          icon="i-vuejs"
          size="22"
        />
        vue-styleguide
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasIcon from '../../elements/e-vas-icon.vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide header.
   */
  export default defineComponent({
    name: 's-header',
    components: {
      eVasIcon,
    },

    // props: {},
    // emits: {},

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
  @use '../../setup/scss/mixins';
  @use '../../setup/scss/variables';

  .s-header {
    border-bottom: 1px solid variables.$vas-color-grayscale--600;
    background-color: rgba(variables.$vas-color-green-vue, 0.1);

    &__container {
      @include mixins.container;

      padding: variables.$vas-spacing--10;
      display: flex;
    }

    &__headline {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: variables.$vas-spacing--6;
      color: variables.$vas-font-color--text;
      font-size: variables.$vas-font-size--heading;
      font-weight: variables.$vas-font-weight--bold;
    }
  }
</style>
