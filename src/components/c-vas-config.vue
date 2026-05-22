<template>
  <div :class="b()">
    <div :class="b('clear')">
      <e-vas-button
        type="button"
        :disabled="!hasPersistedItems"
        @click="onClearAllPersistentItems"
      >
        Remove persisted values
      </e-vas-button>
      <span
        v-if="hasPersistedItems"
        :class="b('storage-info')"
      >
        {{ persistedCount }} {{ persistedCount === 1 ? 'item' : 'items' }} · {{ persistedSizeLabel }}
      </span>
    </div>

    <slot name="globalSettings">
      <div :class="b('headline')">Global Settings</div>
      <c-vas-html-validation />
    </slot>
    <div
      v-if="$slots.customSettings"
      id="teleportDestinationStyleguideConfigFlyout"
      :class="b('custom-settings')"
    >
      <div :class="b('headline')">Custom Project Settings</div>
      <slot name="customSettings"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasButton from '../elements/e-vas-button.vue';
  import cVasHtmlValidation from '../features/c-vas-html-validation.vue';
  import { clearAllPersistentItems, getPersistentItemCount, getPersistentItemsSize } from '../stores/helper';

  /**
   * Component for managing global settings.
   */
  export default defineComponent({
    name: 'c-vas-config',

    components: {
      eVasButton,
      cVasHtmlValidation,
    },

    data() {
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

    mounted() {
      this.refreshStorageInfo();
      window.addEventListener('storage', this.refreshStorageInfo);
    },

    unmounted() {
      window.removeEventListener('storage', this.refreshStorageInfo);
    },

    methods: {
      refreshStorageInfo() {
        this.persistedCount = getPersistentItemCount();
        this.persistedSize = getPersistentItemsSize();
      },

      onClearAllPersistentItems() {
        clearAllPersistentItems();
        this.refreshStorageInfo();
      },
    },
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-vas-config {
    display: flex;
    flex-direction: column;
    gap: variables.$vas-spacing--10;

    &__headline {
      font-weight: bold;
      color: var(--vas-theme-text-color-muted);
      margin: variables.$vas-spacing--10 0;
    }

    &__clear {
      display: flex;
      align-items: center;
      gap: variables.$vas-spacing--10;
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
