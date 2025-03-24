<template>
  <div :class="b()">
    <e-vas-input
      v-model.trim="internalValue"
      :class="b('input')"
      name="filter"
      type="search"
      placeholder="Search …"
      autofocus
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
      eVasInput
    },

    props: {
      /**
       * The searchTerm to filter the navigation for.
       * Comes in as 2-way binding (v-model) from the parent component.
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
      /**
       * Getter / setter for the internal value.
       */
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
      width: 100%;
      padding: 10px 20px 10px 10px;
      position: relative;
    }

    &__button-clear {
      position: absolute;
      top: 0;
      right: 1px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 30px;
    }

    &__close-icon {
      width: 20px;
      height: 20px;
      background-color: variables.$color-grayscale--1000;
      background-image: url('../assets/close.svg');
      background-size: 12px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
</style>
