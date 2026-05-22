<template>
  <c-vas-panel-action
    variant="fluid"
    icon="i-tag"
    :text="version"
    :href="githubUrl"
    :badge="updateAvailable"
    :highlighted="updateAvailable"
    :tooltip="updateTooltip"
    target="_blank"
    rel="noopener noreferrer"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import packageJson from '../../package.json';
  import cVasPanelAction from './c-vas-panel-action.vue';

  type Setup = {
    version: string;
    githubUrl: string;
  };

  type Data = {
    updateAvailable: boolean;
    latestVersion: string | null;
  };

  /**
   * Displays the current package version as a GitHub link and asynchronously checks for newer tags.
   */
  export default defineComponent({
    name: 'c-vas-github-version',
    components: {
      cVasPanelAction,
    },

    // props: {},
    // emits: {},

    setup(): Setup {
      return {
        version: packageJson.version,
        githubUrl: `${packageJson.repository.tree}${packageJson.version}`,
      };
    },
    data(): Data {
      return {
        updateAvailable: false,
        latestVersion: null,
      };
    },

    computed: {
      updateTooltip(): string | undefined {
        return this.updateAvailable && this.latestVersion
          ? `Update available: v${this.latestVersion}`
          : undefined;
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.checkForUpdate();
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      async checkForUpdate(): Promise<void> {
        try {
          const response = await fetch('https://api.github.com/repos/valantic/vue-styleguide/tags');

          if (!response.ok) {
            return;
          }

          const tags: Array<{ name: string }> = await response.json();
          const latestTag = tags[0]?.name;

          if (latestTag && latestTag !== `v${packageJson.version}`) {
            this.latestVersion = latestTag.replace(/^v/, '');
            this.updateAvailable = true;
          }
        } catch {
          // silently swallow — never block
        }
      },
    },
    // render() {},
  });
</script>
