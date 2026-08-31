<template>
  <div :class="b()">
    <c-vas-typography
      variant="heading"
      text="AI"
    />

    <p :class="b('intro')">
      This library ships a Claude Code skill that generates or restructures demo pages for you. See
      the
      <a
        :href="setupGuideUrl"
        :class="b('link')"
        target="_blank"
        rel="noopener noreferrer"
      >
        setup guide
      </a>
      for how to add it to your project.
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasTypography from './c-vas-typography.vue';

  // type Setup = {};
  // type Data = {};

  const SETUP_GUIDE_URL = 'https://valantic.github.io/vue-styleguide/guide/ai-skill';

  /**
   * Introduces the AI-assisted demo-page skill and links to its setup guide.
   */
  export default defineComponent({
    name: 'c-vas-ai',

    components: {
      cVasTypography,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      setupGuideUrl(): string {
        return SETUP_GUIDE_URL;
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

  .c-vas-ai {
    display: flex;
    flex-direction: column;
    gap: variables.$vas-spacing--10;

    &__intro {
      margin: 0;
      color: var(--vas-theme-text-color);
      font-size: var(--vas-font-size-small);
    }

    &__link {
      // !important: needed to win against c-vas-sidebar's own `a { color: inherit }` default,
      // which itself needs real specificity to survive host project CSS. See its comment.
      color: variables.$vas-color-blue-primary !important; // stylelint-disable-line declaration-no-important
      text-decoration: underline;
    }
  }
</style>
