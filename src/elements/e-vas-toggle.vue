<template>
  <label :class="b('', { active: internalValue })">
    <span
      v-if="$slots.default"
      :class="b('label')"
    >
      <slot></slot>
    </span>
    <input
      v-model="internalValue"
      :class="b('input')"
      type="checkbox"
    />
    <span :class="b('slider')"></span>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'e-vas-toggle',

    // components: {},

    props: {
      /**
       * The model value to be used for v-model.
       */
      modelValue: {
        type: Boolean,
        default: false,
      },
    },

    emits: {
      'update:modelValue': (value: unknown): boolean => value !== 'undefined',
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
        get(): boolean {
          return this.modelValue;
        },
        set(value: boolean) {
          this.$emit('update:modelValue', value);
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
  @use '../setup/scss/variables';

  .e-vas-toggle {
    $this: &;
    $e-vas-toggle-size: 18px;

    --e-vas-toggle-background-color: #{variables.$vas-color-grayscale--500};
    --e-vas-toggle-toggle-color: #{variables.$vas-color-grayscale--0};

    display: flex;
    justify-content: space-between;

    &--active {
      --e-vas-toggle-background-color: #{variables.$vas-color-grayscale--0};
      --e-vas-toggle-toggle-color: #{variables.$vas-color-grayscale--1000};
    }

    &__slider {
      position: relative;
      align-self: flex-end;
      width: calc(2 * #{$e-vas-toggle-size});
      height: $e-vas-toggle-size;
      border-radius: $e-vas-toggle-size;
      background-color: var(--e-vas-toggle-background-color);
      cursor: pointer;
      transition: variables.$vas-transition-duration--default;

      &::before {
        $absolute-position: calc(0.1 * #{$e-vas-toggle-size});
        $size: calc(0.8 * #{$e-vas-toggle-size});

        position: absolute;
        top: $absolute-position;
        left: $absolute-position;
        content: '';
        width: $size;
        height: $size;
        border-radius: 50%;
        background-color: var(--e-vas-toggle-toggle-color);
        transition: variables.$vas-transition-duration--default;
      }
    }

    &__input {
      display: none;

      &:checked + #{$this}__slider::before {
        transform: translateX(#{$e-vas-toggle-size});
      }
    }
  }
</style>
