<template>
  <div :class="b()">
    <e-vas-icon
      :class="b('logo')"
      :icon="icon"
      :size="iconSize"
    />
    <span :class="b('text')">{{ text }}</span>
  </div>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import { Icon } from '../types/icon';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide brand component.
   */
  export default defineComponent({
    name: 'c-vas-icon-headline',
    components: {
      eVasIcon,
    },

    props: {
      /**
       * The text
       */
      text: {
        type: String,
        default: '',
      },

      /**
       * Icon name.
       */
      icon: {
        type: String as PropType<Icon>,
        default: '',
      },

      /**
       * Icon size.
       */
      iconSize: {
        type: String,
        default: '22',
      },
    },
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

  .c-vas-icon-headline {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: variables.$vas-spacing--6;
    color: variables.$vas-font-color--text;
    font-size: variables.$vas-font-size--18;
    font-weight: 900;
  }
</style>
