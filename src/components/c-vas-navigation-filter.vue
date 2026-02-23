<template>
  <div :class="b()">
    <e-vas-input
      v-model.trim="internalValue"
      :class="b('input')"
      name="filter"
      type="search"
      placeholder="Search …"
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
      <span :class="b('close-icon')"></span>
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasInput from '../elements/e-vas-input.vue';

  // typ;
  // type Data = {};

  export default defineComponent({
    name: 'c-vas-navigation-filter',

    components: {
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
    position: relative;

    &__input {
      position: relative;
      width: 100%;
      padding: variables.$vas-spacing--8 variables.$vas-spacing--30 variables.$vas-spacing--8 variables.$vas-spacing--8;
    }

    &__button-clear {
      position: absolute;
      top: 0;
      right: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      cursor: pointer;
      background-color: rgba(variables.$vas-color-grayscale--0, 0.08);
      padding: variables.$vas-spacing--2;
    }

    &__close-icon {
      width: 20px;
      height: 20px;
      background-color: transparent;
      background-image: url('../assets/icons/i-close.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 10px;
    }
  }
</style>
