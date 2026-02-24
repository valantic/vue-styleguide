<template>
  <div :class="b('', { spacing })">
    <table :class="b('table')">
      <thead v-if="$slots.thead">
        <tr>
          <slot name="thead"></slot>
        </tr>
      </thead>
      <tbody>
        <slot name="tbody"></slot>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Demo Table
   */
  export default defineComponent({
    name: 'c-vas-demo-table',

    // components: {},

    props: {
      /**
       * Define if there should be a spacing.
       */
      spacing: {
        type: Boolean,
        default: true,
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

  .c-vas-demo-table {
    border: 1px solid variables.$vas-theme-border-color;
    border-radius: variables.$vas-theme-border-radius;

    &--spacing {
      margin: variables.$vas-spacing--30 0;
    }

    &__table {
      width: 100%;
      border-spacing: 0;

      thead tr {
        border-bottom: 1px solid variables.$vas-theme-border-color;
      }

      th,
      td {
        padding: variables.$vas-spacing--6 variables.$vas-spacing--16;
        vertical-align: middle;
      }

      th {
        user-select: none;
        height: 48px;
      }

      td {
        height: 44px;
      }

      tbody tr:not(tbody tr:last-child) {
        border-bottom: 1px solid variables.$vas-theme-border-color;
      }
    }
  }
</style>
