<template>
  <c-vas-modal
    v-model:is-open="isOpenInternal"
    title="Styleguide Hotkeys"
    close-on-outside-click
  >
    <p>You can use these hotkeys to navigate the styleguide.</p>

    <div :class="b('mapping')">
      <div
        v-for="(mapping, index) in mappings"
        :key="index"
        :class="b('row')"
      >
        <div :class="b('left')">
          <div
            v-for="(hotkey, hotkeyIndex) in mapping.hotkeys"
            :key="hotkeyIndex"
            :class="b('hotkey')"
          >
            <span
              v-for="(key, keyIndex) in hotkey"
              :key="keyIndex"
            >
              {{ key }}
            </span>
          </div>
        </div>
        <div :class="b('right')">
          {{ mapping.description }}
        </div>
      </div>
    </div>
  </c-vas-modal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasModal from '../components/c-vas-modal.vue';

  // type Setup = {};

  type Mapping = {
    hotkeys: string[][];
    description: string;
  };

  type Data = {
    mappings: Mapping[];
  };

  /**
   * Displays a list of hotkeys that can be used to navigate the styleguide.
   */
  export default defineComponent({
    name: 'c-vas-hotkey-modal',
    components: {
      cVasModal,
    },

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

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        mappings: [
          {
            hotkeys: [['Shift'], ['Shift']],
            description: 'Toggle the styleguide sidebar. Opens the sidebar with the navigation tab preselected.',
          },
          {
            hotkeys: [['↑'], ['↓']],
            description: 'Navigate through menu items.',
          },
          {
            hotkeys: [['Enter']],
            description: 'Open the selected menu item.',
          },
          {
            hotkeys: [['Shift', '+', 'Ctrl', '+', 'O']],
            description: 'Toggle the styleguide sidebar. Opens the sidebar with the navigation tab preselected.',
          },
          {
            hotkeys: [['Esc']],
            description: 'Closes the sidebar, closes modal.',
          },
        ],
      };
    },

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
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .c-vas-hotkey-modal {
    &__mapping {
      display: flex;
      flex-direction: column;
      margin-top: variables.$vas-spacing--30;
    }

    &__row {
      display: grid;
      grid-template-columns: 30% 70%;
      gap: variables.$vas-spacing--16;
      padding: variables.$vas-spacing--16 variables.$vas-spacing--8;
      border-bottom: 1px dashed var(--vas-theme-border-color);

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
      font-size: variables.$vas-font-size--base;
      font-weight: 600;
      padding: variables.$vas-spacing--4 variables.$vas-spacing--6;
      background-color: var(--vas-theme-background-surface);
      border: 1px solid var(--vas-theme-border-color);
      border-radius: 5px;
    }
  }
</style>
