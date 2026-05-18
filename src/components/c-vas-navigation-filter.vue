<template>
  <div :class="b()">
    <e-vas-input
      v-model.trim="internalValue"
      :class="b('input')"
      name="filter"
      type="search"
      placeholder="Search Menu ..."
      autofocus
      select-on-focus
      @click.stop
    />
    <button
      v-if="internalValue"
      :class="b('button-clear')"
      type="button"
      @click.stop="onReset"
    >
      <e-vas-icon
        icon="i-close"
        size="8"
      />
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasIcon from '../elements/e-vas-icon.vue';
  import eVasInput from '../elements/e-vas-input.vue';

  // type Setup = {}
  // type Data = {}

  export default defineComponent({
    name: 'c-vas-navigation-filter',

    components: {
      eVasIcon,
      eVasInput,
    },

    props: {
      /**
       * The searchTerm to filter the navigation for.
       */
      modelValue: {
        type: String,
        default: '',
      },
    },
    emits: {
      'update:modelValue': (value: string) => typeof value === 'string',
    },

    // setup(): Setup {
    //   return {
    //   };
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      internalValue: {
        get(): string {
          return this.modelValue;
        },
        set(newVal: string): void {
          this.$emit('update:modelValue', newVal);
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

    methods: {
      onReset() {
        this.internalValue = '';
      },
    },

    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-navigation-filter {
    &__input {
      position: relative;
      width: 100%;
      padding: variables.$vas-spacing--8 variables.$vas-spacing--30 variables.$vas-spacing--8 variables.$vas-spacing--8;
      font-size: 14px;
    }

    &__button-clear {
      position: absolute;
      top: 6px;
      right: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      cursor: pointer;
      background-color: var(--vas-theme-highlight);
      padding: variables.$vas-spacing--2;
      z-index: 99;

      &:hover {
        background-color: var(--vas-theme-button-bg-hover);
      }
    }
  }
</style>
