<template>
  <div :class="b()">
    <c-vas-typography variant="heading">Global configuration</c-vas-typography>

    <div :class="b('clear')">
      <div>
        <div>
          <strong>Persistent Data</strong>
        </div>
        <span :class="b('storage-info')">
          <template v-if="hasPersistedItems">
            {{ persistedCount }} {{ persistedCount === 1 ? 'item' : 'items' }} · {{ persistedSizeLabel }}
          </template>
          <template v-else>No persistent data.</template>
        </span>
      </div>

      <e-vas-button
        type="button"
        icon="i-bin"
        icon-only
        :disabled="!hasPersistedItems"
        @click="onClearAllPersistentItems"
      />
    </div>

    <div
      v-if="$slots.customSettings"
      :class="b('custom-settings')"
    >
      <slot name="customSettings"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasButton from '../elements/e-vas-button.vue';
  import { useVasLocalStore } from '../stores/local-store';
  import cVasTypography from './c-vas-typography.vue';

  // type Setup = {};
  type Data = {
    persistedCount: number;
    persistedSize: number;
  };

  /**
   * Component for managing global settings.
   */
  export default defineComponent({
    name: 'c-vas-config',

    components: {
      cVasTypography,
      eVasButton,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },,
    data(): Data {
      return {
        persistedCount: 0,
        persistedSize: 0,
      };
    },

    computed: {
      hasPersistedItems(): boolean {
        return this.persistedCount > 0;
      },

      persistedSizeLabel(): string {
        if (this.persistedSize < 1024) {
          return `${this.persistedSize} B`;
        }

        return `${(this.persistedSize / 1024).toFixed(1)} KB`;
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.refreshStorageInfo();
      window.addEventListener('storage', this.refreshStorageInfo);
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    unmounted() {
      window.removeEventListener('storage', this.refreshStorageInfo);
    },

    methods: {
      refreshStorageInfo() {
        const store = useVasLocalStore();

        this.persistedCount = store.analytics.itemCount;
        this.persistedSize = store.analytics.storageSize;
      },

      onClearAllPersistentItems() {
        useVasLocalStore().empty();
        this.refreshStorageInfo();
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-config {
    display: flex;
    flex-direction: column;
    gap: variables.$vas-spacing--10;

    &__clear {
      display: grid;
      grid-template-columns: 1fr 50px;
      gap: variables.$vas-spacing--10;
      border: 1px dashed var(--vas-theme-border-color);
      padding: variables.$vas-spacing--10;
      margin-bottom: variables.$vas-spacing--20;
    }

    &__storage-info {
      font-size: 0.75rem;
      color: var(--vas-theme-text-color-muted);
    }

    &__custom-settings {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--10;
      margin-top: variables.$vas-spacing--20;
      border-top: 1px solid variables.$vas-theme-border-color;
    }
  }
</style>
