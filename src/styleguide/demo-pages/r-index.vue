<!-- eslint-disable max-len -->
<template>
  <l-vas-layout>
    <div :class="b()">
      <h1>Styleguide</h1>
      <hr />
      <p>Welcome to the styleguide.</p>
      <div
        v-if="isProduction"
        :class="b('warning')"
      >
        Please note: this build is not meant for production. Please use <code :class="b('code')">npm run build</code> to
        create a production build.
      </div>

      <h2>README.md</h2>
      <hr />
      <c-vas-readme />
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasReadme from '../../components/c-vas-readme.vue';
  import lVasLayout from '../../layouts/l-vas-layout.vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'r-index',
    components: {
      lVasLayout,
      cVasReadme
    },

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {
    //   };
    // },

    computed: {
      /**
       * Checks, if production mode is active.
       */
      isProduction(): boolean {
        return import.meta.env.MODE === 'production';
      },
    },
  });
</script>

<style lang="scss">
  @use 'sass:map';
  @use '../../setup/scss/mixins';
  @use '../../setup/scss/variables';

  .r-index {
    &__warning {
      padding: variables.$spacing--10;
      border: 1px solid variables.$color-status--error;
      background: rgba(variables.$color-status--error--rgb, 0.5);
      text-align: center;
    }

    &__code {
      display: inline-block;
      border: 1px solid variables.$color-grayscale--400;
      background: rgba(variables.$color-primary--2--rgb, 0.5);
      color: variables.$color-primary--3;
    }
  }
</style>
