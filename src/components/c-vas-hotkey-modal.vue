<template>
  <c-vas-modal
    v-model:is-open="isOpenInternal"
    title="Styleguide Hotkeys"
    close-on-outside-click
  >
    <p>You can use these hotkeys to navigate the styleguide.</p>

    <div :class="b('mapping')">
      <div :class="b('row')">
        <div :class="b('left')">
          <div :class="b('hotkey')">
            <span>Shift</span>
            <span>+</span>
            <span>Ctrl</span>
            <span>+</span>
            <span>O</span>
          </div>
        </div>
        <div :class="b('right')">
          Toggle the styleguide sidebar. Opens the sidebar with the navigation tab preselected.
        </div>
      </div>
      <div :class="b('row')">
        <div :class="b('left')">
          <div :class="b('hotkey')">
            <span>Shift</span>
            <span>+</span>
            <span>Ctrl</span>
            <span>+</span>
            <span>.</span>
          </div>
        </div>
        <div :class="b('right')">Open the styleguide sidebar with the config tab preselected.</div>
      </div>
      <div :class="b('row')">
        <div :class="b('left')">
          <div :class="b('hotkey')">
            <span>Esc</span>
          </div>
        </div>
        <div :class="b('right')">Closes the sidebar, closes modal.</div>
      </div>
    </div>
  </c-vas-modal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasModal from '@/components/c-vas-modal.vue';

  // type Setup = {};
  // type Data = {};

  /**
   *
   */
  export default defineComponent({
    name: 'c-vas-hotkey-modal',
    components: {
      cVasModal,
    },

    // components: {},

    props: {
      /**
       * Toggles the visibility of the modal.
       */
      isOpen: {
        type: Boolean,
        default: false,
      },
    },
    emits: {
      'update:isOpen': (state: unknown): boolean => typeof state === 'boolean',
    },
    // emits: [],

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      isOpenInternal: {
        get() {
          return this.isOpen;
        },
        set(value: boolean) {
          this.$emit('update:isOpen', value);
        },
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
  @use '@/setup/scss/mixins';
  @use '@/setup/scss/variables';

  .c-vas-hotkey-modal {
    &__mapping {
      display: flex;
      flex-direction: column;
      margin-top: variables.$vas-spacing--30;
    }

    &__row {
      display: grid;
      grid-template-columns: 0.8fr 1fr;
      gap: variables.$vas-spacing--16;
      padding: variables.$vas-spacing--16 variables.$vas-spacing--8;
      border-bottom: 1px dashed variables.$vas-color-grayscale--600;

      &:last-child {
        border-bottom: 0;
      }
    }

    &__left {
      display: flex;
      flex-flow: row wrap;
      align-items: start;
      gap: variables.$vas-spacing--6;
    }

    &__hotkey {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: variables.$vas-spacing--4;
      font-size: 14px;
      font-weight: 600;
      padding: variables.$vas-spacing--4 variables.$vas-spacing--6;
      background-color: variables.$vas-color-grayscale--800;
      border: 1px solid variables.$vas-color-grayscale--600;
      border-radius: 5px;
    }
  }
</style>
