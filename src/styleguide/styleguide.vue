<template>
  <div :class="b()">
    <s-header :class="b('header')" />
    <main :class="b('container')">
      <router-view />
    </main>
    <s-footer :class="b('footer')" />
    <c-vas-sidebar :settings="settings">
      <template
        #customSettings
        v-if="false"
      >
        Custom Settings can be placed here.
      </template>
    </c-vas-sidebar>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { VasSettingsStore, useVasSettingsStore } from '@/stores/settings';
  import cVasSidebar from '@/components/c-vas-sidebar.vue';
  import sFooter from '@/styleguide/components/s-footer.vue';
  import sHeader from '@/styleguide/components/s-header.vue';
  import { StyleguideSettings } from '@/types/settings';

  type Setup = {
    vasSettingsStore: VasSettingsStore;
  };
  type Data = {
    settings: Partial<StyleguideSettings>;
  };

  export default defineComponent({
    name: 'styleguide',

    components: {
      sHeader,
      sFooter,
      cVasSidebar,
    },

    // props: {},

    setup(): Setup {
      return {
        vasSettingsStore: useVasSettingsStore(),
      };
    },
    data(): Data {
      return {
        settings: {
          availableThemes: [
            {
              label: 'theme-01',
              value: 'theme-01',
            },
            {
              label: 'theme-02',
              value: 'theme-02',
              selected: true,
            },
          ],
          availableLanguages: [
            {
              label: 'English',
              value: 'en',
              selected: true,
            },
            {
              label: 'Deutsch',
              value: 'de',
            },
          ],
          isLoggedIn: true,
        },
      };
    },

    // computed: {},
    watch: {
      'vasSettingsStore.state.settings': {
        handler(newSettings) {
          // eslint-disable-next-line no-console
          console.log('settings have changed', newSettings);
        },
        deep: true,
        immediate: false,
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      // this.vasSettingsStore.initialize(this.settings);
    },
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
  @use 'sass:map';
  @use '@/setup/scss/variables';
  @use '@/setup/scss/mixins';

  // stylelint-disable selector-max-id
  html,
  #app {
    height: 100%;
  }
  // Define #app styles in setup/scss/_globals.scss
  // stylelint-disable selector-class-pattern
  .styleguide {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;

    &__container {
      @include mixins.container;
    }
  }
</style>
