<template>
  <l-vas-layout :class="b()">
    <section
      v-for="group in colorGroups"
      :key="group.title"
      :class="b('group')"
    >
      <h2 :class="b('group-title')">{{ group.title }}</h2>
      <div :class="b('swatches')">
        <div
          v-for="color in group.colors"
          :key="color.token"
          :class="b('swatch')"
        >
          <div
            :class="b('swatch-block')"
            :style="{ backgroundColor: color.value }"
          ></div>
          <div :class="b('swatch-info')">
            <code :class="b('swatch-token')">{{ color.token }}</code>
            <span :class="b('swatch-value')">{{ color.value }}</span>
            <span
              v-if="color.note"
              :class="b('swatch-note')"
            >{{ color.note }}</span>
          </div>
        </div>
      </div>
    </section>

    <section :class="b('group')">
      <h2 :class="b('group-title')">Theme Tokens</h2>
      <p :class="b('theme-hint')">
        Theme tokens are CSS custom properties. Their values depend on the active theme class
        (<code>.vas-styleguide-theme-light</code> / <code>.vas-styleguide-theme-dark</code>).
      </p>
      <div :class="b('theme-tokens')">
        <div
          v-for="token in themeTokens"
          :key="token.prop"
          :class="b('theme-token')"
        >
          <div :class="b('theme-token-swatch')">
            <div
              :class="b('theme-token-block', { light: true })"
              :style="{ backgroundColor: token.light }"
            ></div>
            <div
              :class="b('theme-token-block', { dark: true })"
              :style="{ backgroundColor: token.dark }"
            ></div>
          </div>
          <div :class="b('theme-token-info')">
            <code :class="b('theme-token-prop')">{{ token.prop }}</code>
            <div :class="b('theme-token-values')">
              <span :class="b('theme-token-pair')">
                <span :class="b('theme-token-label')">light</span>
                <span :class="b('theme-token-value')">{{ token.light }}</span>
              </span>
              <span :class="b('theme-token-pair')">
                <span :class="b('theme-token-label')">dark</span>
                <span :class="b('theme-token-value')">{{ token.dark }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'r-color-palette',

    components: {
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    data() {
      return {
        colorGroups: [
          {
            title: 'Grayscale',
            colors: [
              { token: '$vas-color-grayscale--0', value: '#1a1a1a', note: 'Deep charcoal' },
              { token: '$vas-color-grayscale--100', value: '#2f2f2f', note: 'Dark gray' },
              { token: '$vas-color-grayscale--200', value: '#4a4a4a', note: 'Neutral gray' },
              { token: '$vas-color-grayscale--300', value: '#6b6b6b', note: 'Medium gray' },
              { token: '$vas-color-grayscale--400', value: '#8c8c8c' },
              { token: '$vas-color-grayscale--500', value: '#b0b0b0', note: 'Light gray' },
              { token: '$vas-color-grayscale--600', value: '#d3d3d3', note: 'Soft silver' },
              { token: '$vas-color-grayscale--700', value: '#e9e9e9' },
              { token: '$vas-color-grayscale--800', value: '#f5f5f5' },
              { token: '$vas-color-grayscale--900', value: '#fafafa' },
              { token: '$vas-color-grayscale--1000', value: '#ffffff', note: 'Pure white' },
            ],
          },
          {
            title: 'Brand',
            colors: [
              { token: '$vas-color-valantic-primary', value: '#FF5D4C', note: 'Primary accent — use sparingly' },
            ],
          },
          {
            title: 'Status',
            colors: [
              { token: '$vas-color-green-primary', value: '#4caf50' },
              { token: '$vas-color-green-light', value: '#a8d5ba' },
              { token: '$vas-color-green-dark', value: '#388e3c' },
              { token: '$vas-color-red-primary', value: '#e53935' },
              { token: '$vas-color-red-light', value: '#f9b5b5' },
              { token: '$vas-color-red-dark', value: '#c62828' },
              { token: '$vas-color-yellow-primary', value: '#ffeb3b' },
              { token: '$vas-color-yellow-dark', value: '#fbc02d' },
              { token: '$vas-color-orange-primary', value: '#ff9800' },
              { token: '$vas-color-blue-primary', value: '#2196f3' },
              { token: '$vas-color-blue-light', value: '#bbdefb' },
              { token: '$vas-color-blue-dark', value: '#1e88e5' },
            ],
          },
        ],
        themeTokens: [
          { prop: '--vas-theme-text-color', light: '#1a1a1a', dark: '#BBBBBB' },
          { prop: '--vas-theme-text-color-muted', light: 'rgba(0,0,0,38%)', dark: 'rgba(232,232,232,55%)' },
          { prop: '--vas-theme-text-color-highlight', light: '#000000', dark: '#FEFEFE' },
          { prop: '--vas-theme-border-color', light: '#d3d3d3', dark: '#606368' },
          { prop: '--vas-theme-background-content', light: '#ffffff', dark: '#272C34' },
          { prop: '--vas-theme-background-surface', light: '#f5f5f5', dark: '#1C1E23' },
          { prop: '--vas-theme-background-surface-hover', light: '#e9e9e9', dark: '#2f2f2f' },
          { prop: '--vas-theme-button-bg', light: '#d3d3d3', dark: '#3a3a3a' },
          { prop: '--vas-theme-button-bg-hover', light: '#e9e9e9', dark: '#4a4a4a' },
        ],
      };
    },

    // computed: {},
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
  @use '../../../setup/scss/variables';

  .r-color-palette {
    &__group {
      margin-bottom: variables.$vas-spacing--30;
    }

    &__group-title {
      font-size: variables.$vas-font-size--tiny;
      font-weight: variables.$vas-font-weight--bold;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--vas-theme-text-color-muted);
      margin-bottom: variables.$vas-spacing--12;
      padding-bottom: variables.$vas-spacing--8;
      border-bottom: 1px solid var(--vas-theme-border-color);
    }

    &__swatches {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: variables.$vas-spacing--8;
    }

    &__swatch {
      border: 1px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      overflow: hidden;
      background-color: var(--vas-theme-background-surface);
    }

    &__swatch-block {
      height: 52px;
      width: 100%;
    }

    &__swatch-info {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--2;
      padding: variables.$vas-spacing--8;
    }

    &__swatch-token {
      font-family: monospace;
      font-size: variables.$vas-font-size--tiny;
      color: var(--vas-theme-text-color);
      word-break: break-all;
    }

    &__swatch-value {
      font-family: monospace;
      font-size: variables.$vas-font-size--tiny;
      color: var(--vas-theme-text-color-muted);
    }

    &__swatch-note {
      font-size: variables.$vas-font-size--tiny;
      color: var(--vas-theme-text-color-muted);
      font-style: italic;
    }

    &__theme-hint {
      font-size: variables.$vas-font-size--base;
      color: var(--vas-theme-text-color-muted);
      margin-bottom: variables.$vas-spacing--12;
      line-height: 1.5;

      code {
        font-family: monospace;
        font-size: variables.$vas-font-size--tiny;
        padding: 1px variables.$vas-spacing--4;
        background-color: var(--vas-theme-highlight);
        border-radius: 2px;
      }
    }

    &__theme-tokens {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--2;
    }

    &__theme-token {
      display: flex;
      align-items: center;
      gap: variables.$vas-spacing--12;
      padding: variables.$vas-spacing--8 variables.$vas-spacing--12;
      border: 1px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      background-color: var(--vas-theme-background-surface);
    }

    &__theme-token-swatch {
      display: flex;
      gap: 2px;
      flex-shrink: 0;
    }

    &__theme-token-block {
      width: 28px;
      height: 28px;
      border-radius: 2px;
      border: 1px solid var(--vas-theme-border-color);

      &--light {
        border-radius: 2px 0 0 2px;
      }

      &--dark {
        border-radius: 0 2px 2px 0;
      }
    }

    &__theme-token-info {
      flex: 1;
      min-width: 0;
    }

    &__theme-token-prop {
      font-family: monospace;
      font-size: variables.$vas-font-size--small;
      color: var(--vas-theme-text-color);
      display: block;
      margin-bottom: variables.$vas-spacing--4;
    }

    &__theme-token-values {
      display: flex;
      gap: variables.$vas-spacing--16;
    }

    &__theme-token-pair {
      display: flex;
      gap: variables.$vas-spacing--6;
      align-items: center;
    }

    &__theme-token-label {
      font-size: variables.$vas-font-size--tiny;
      font-weight: variables.$vas-font-weight--bold;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--vas-theme-text-color-muted);
    }

    &__theme-token-value {
      font-family: monospace;
      font-size: variables.$vas-font-size--tiny;
      color: var(--vas-theme-text-color-muted);
    }
  }
</style>
