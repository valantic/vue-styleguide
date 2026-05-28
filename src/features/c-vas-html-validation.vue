<template>
  <e-vas-toggle v-model="enabled"> HTML validation </e-vas-toggle>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasToggle from '../elements/e-vas-toggle.vue';
  import { useVasLocalStore } from '../stores/local-store';

  // type Setup = {};

  type Data = {
    enabled: boolean;
  };

  const STORAGE_KEY = 'html-validation';

  /**
   * Adds a toggle to en-/disable CSS driven HTML validation.
   */
  export default defineComponent({
    name: 'c-vas-html-validation',

    components: {
      eVasToggle,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        enabled: useVasLocalStore().get<boolean>(STORAGE_KEY, true),
      };
    },

    // computed: {},
    watch: {
      enabled(enabled: boolean) {
        useVasLocalStore().set(STORAGE_KEY, enabled);
      },
    },

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
  @use 'sass:color';
  @use '../setup/scss/variables';

  // stylelint-disable max-line-length

  .c-vas-html-validation--enabled {
    @mixin html-validator-warning($message: '') {
      outline: 5px solid variables.$vas-color-status--error;

      &::before {
        position: absolute;
        z-index: 1000;
        content: $message;
        max-width: 200px;
        padding: 2px variables.$vas-spacing--6;
        border: 1px solid variables.$vas-color-status--error;
        background: color.adjust(variables.$vas-color-status--error, $lightness: 40%);
        color: variables.$vas-color-grayscale--0;
        font-size: var(--vas-font-size-small);
      }
    }

    a {
      button {
        @include html-validator-warning('The element <button> must not appear as a descendant of the <a> element.');
      }
    }

    button {
      &:not([aria-label]):not([aria-labelledby]):empty {
        @include html-validator-warning('Ensure that <button> has meaningful content or is labelled appropriately.');
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      label,
      div {
        @include html-validator-warning('Element <div> not allowed as child of element <button>.');
      }
    }

    img {
      &[sizes^=','] {
        @include html-validator-warning(
          'Bad value for attribute "sizes" on element <img>: Starts with empty source size.'
        );
      }
    }

    label {
      button,
      input,
      meter,
      output,
      progress,
      select,
      textarea {
        &[aria-label],
        &:nth-of-type(2),
        & ~ button,
        & ~ input,
        & ~ meter,
        & ~ output,
        & ~ progress,
        & ~ select,
        & ~ textarea,
        & ~ * button,
        & ~ * input,
        & ~ * meter,
        & ~ * output,
        & ~ * progress,
        & ~ * select,
        & ~ * textarea {
          @include html-validator-warning(
            'The <label> element may contain at most one <button>, <input>, <meter>, <output>, <progress>, <select>, or <textarea> descendant and/or no duplicated label values.'
          );
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      label,
      div {
        @include html-validator-warning('This element is not allowed as child of element <label> in this context.');
      }
    }

    picture {
      &[width],
      &[height] {
        @include html-validator-warning('Attribute "width" not allowed on element picture at this point.');
      }

      :not(source) ~ img {
        @include html-validator-warning(
          'If element "img" is not used with "source", "width" and "height" should be applied.'
        );
      }
    }

    table {
      > *:not(tr):not(thead):not(tbody):not(tfoot) {
        @include html-validator-warning('This element is not allowed as child of element <table> in this context.');
      }
    }

    tr {
      > *:not(td, th) {
        @include html-validator-warning('This element is not allowed as child of element <tr> in this context.');
      }
    }

    span {
      div {
        @include html-validator-warning('Element <div> not allowed as child of element <span> in this context.');
      }
    }

    ul {
      > *:not(li) {
        @include html-validator-warning('No element except <li> allowed as child of element <ul> in this context.');
      }
    }
  }
</style>
