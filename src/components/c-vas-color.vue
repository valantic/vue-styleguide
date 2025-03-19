<template>
  <div :class="b()">
    <c-vas-color-item
      v-for="palette in palettes"
      :key="palette"
      :palette="palette"
      :colors="colors[palette]"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import colors, { Colors } from '../setup/js/color';
  import cVasColorItem from './c-vas-color-item.vue';

  // type Setup = {};
  // type Data = {};

  type ColorVariants = keyof Colors;

  export default defineComponent({
    name: 'c-vas-color',

    components: {
      cVasColorItem,
    },

    // props: {},
    // setup(): Setup {
    //   return {
    //   };
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      /**
       * Returns an Object of color lists.
       */
      colors(): Colors {
        return colors;
      },

      /**
       * Returns an Array of color palette names.
       * @returns {ColorVariants[]}
       */
      palettes(): ColorVariants[] {
        return Object.keys(colors) as Array<ColorVariants>;
      },
    },
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
  @use '../setup/scss/variables';

  .c-vas-color {
    font-family: variables.$font-family--primary;
  }
</style>
