<template>
  <l-vas-layout :class="b()">
    <section :class="b('section')">
      <h2 :class="b('section-title')">Spacing Scale</h2>
      <p :class="b('hint')">
        All spacing values are defined as SCSS variables. Use only these tokens — no arbitrary pixel values.
      </p>
      <div :class="b('scale')">
        <div
          v-for="step in spacingSteps"
          :key="step.token"
          :class="b('step')"
        >
          <code :class="b('step-token')">{{ step.token }}</code>
          <span :class="b('step-value')">{{ step.value }}</span>
          <div :class="b('step-bar-wrap')">
            <div
              :class="b('step-bar')"
              :style="{ width: step.value }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Spacing in Context</h2>
      <p :class="b('hint')">Visual examples of spacing applied as padding and gap.</p>
      <div :class="b('examples')">
        <div
          v-for="step in contextSteps"
          :key="step.token"
          :class="b('example')"
        >
          <div
            :class="b('example-box')"
            :style="{ padding: step.value }"
          >
            <div :class="b('example-inner')"></div>
          </div>
          <code :class="b('example-label')">padding: {{ step.value }}</code>
        </div>
      </div>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Derived Values</h2>
      <div :class="b('derived')">
        <div
          v-for="item in derivedValues"
          :key="item.name"
          :class="b('derived-item')"
        >
          <code :class="b('derived-token')">{{ item.token }}</code>
          <span :class="b('derived-name')">{{ item.name }}</span>
          <span :class="b('derived-value')">{{ item.value }}</span>
        </div>
      </div>
    </section>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type SpacingStep = { token: string; value: string };
  type DerivedValue = { token: string; name: string; value: string };
  type Data = {
    spacingSteps: SpacingStep[];
    contextSteps: SpacingStep[];
    derivedValues: DerivedValue[];
  };

  export default defineComponent({
    name: 'r-spacing-scale',

    components: {
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        spacingSteps: [
          { token: '$vas-spacing--2', value: '2px' },
          { token: '$vas-spacing--4', value: '4px' },
          { token: '$vas-spacing--6', value: '6px' },
          { token: '$vas-spacing--8', value: '8px' },
          { token: '$vas-spacing--10', value: '10px' },
          { token: '$vas-spacing--12', value: '12px' },
          { token: '$vas-spacing--14', value: '14px' },
          { token: '$vas-spacing--16', value: '16px' },
          { token: '$vas-spacing--18', value: '18px' },
          { token: '$vas-spacing--20', value: '20px' },
          { token: '$vas-spacing--22', value: '22px' },
          { token: '$vas-spacing--24', value: '24px' },
          { token: '$vas-spacing--26', value: '26px' },
          { token: '$vas-spacing--28', value: '28px' },
          { token: '$vas-spacing--30', value: '30px' },
        ],
        contextSteps: [
          { token: '$vas-spacing--4', value: '4px' },
          { token: '$vas-spacing--8', value: '8px' },
          { token: '$vas-spacing--12', value: '12px' },
          { token: '$vas-spacing--16', value: '16px' },
          { token: '$vas-spacing--20', value: '20px' },
          { token: '$vas-spacing--24', value: '24px' },
          { token: '$vas-spacing--30', value: '30px' },
        ],
        derivedValues: [
          { token: '$vas-form-field-padding', name: 'Form field padding', value: '8px' },
          { token: '$vas-form-border-radius', name: 'Form border radius', value: '3px' },
          { token: '$vas-theme-border-radius', name: 'Theme border radius', value: '4px' },
          { token: '$vas-flyout--width', name: 'Flyout panel width', value: '440px' },
          { token: '$vas-transition-duration--default', name: 'Transition duration', value: '300ms' },
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

  .r-spacing-scale {
    &__section {
      margin-bottom: variables.$vas-spacing--30;
    }

    &__section-title {
      font-size: variables.$vas-font-size--tiny;
      font-weight: variables.$vas-font-weight--bold;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--vas-theme-text-color-muted);
      margin-bottom: variables.$vas-spacing--12;
      padding-bottom: variables.$vas-spacing--8;
      border-bottom: 1px solid var(--vas-theme-border-color);
    }

    &__hint {
      font-size: variables.$vas-font-size--base;
      color: var(--vas-theme-text-color-muted);
      margin-bottom: variables.$vas-spacing--16;
      line-height: 1.5;
    }

    &__scale {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--2;
    }

    &__step {
      display: grid;
      grid-template-columns: 200px 36px 1fr;
      align-items: center;
      gap: variables.$vas-spacing--12;
      padding: variables.$vas-spacing--6 variables.$vas-spacing--8;
      border-radius: variables.$vas-theme-border-radius;

      &:hover {
        background-color: var(--vas-theme-background-surface-hover);
      }
    }

    &__step-token {
      font-family: monospace;
      font-size: variables.$vas-font-size--small;
      color: var(--vas-theme-text-color);
    }

    &__step-value {
      font-family: monospace;
      font-size: variables.$vas-font-size--tiny;
      color: var(--vas-theme-text-color-muted);
      text-align: right;
    }

    &__step-bar-wrap {
      height: 10px;
      display: flex;
      align-items: center;
    }

    &__step-bar {
      height: 6px;
      background-color: variables.$vas-color-valantic-primary;
      border-radius: 2px;
      opacity: 0.7;
      min-width: 2px;
    }

    &__examples {
      display: flex;
      flex-wrap: wrap;
      gap: variables.$vas-spacing--12;
      align-items: flex-end;
    }

    &__example {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: variables.$vas-spacing--6;
    }

    &__example-box {
      border: 1px solid variables.$vas-color-valantic-primary;
      border-radius: variables.$vas-theme-border-radius;
      background-color: var(--vas-theme-background-surface);
    }

    &__example-inner {
      width: 24px;
      height: 24px;
      background-color: var(--vas-theme-border-color);
      border-radius: 2px;
    }

    &__example-label {
      font-family: monospace;
      font-size: variables.$vas-font-size--tiny;
      color: var(--vas-theme-text-color-muted);
      white-space: nowrap;
    }

    &__derived {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--2;
    }

    &__derived-item {
      display: grid;
      grid-template-columns: 260px 1fr auto;
      align-items: center;
      gap: variables.$vas-spacing--12;
      padding: variables.$vas-spacing--8 variables.$vas-spacing--12;
      border-bottom: 1px solid var(--vas-theme-border-color);

      &:last-child {
        border-bottom: none;
      }
    }

    &__derived-token {
      font-family: monospace;
      font-size: variables.$vas-font-size--small;
      color: var(--vas-theme-text-color);
    }

    &__derived-name {
      font-size: variables.$vas-font-size--base;
      color: var(--vas-theme-text-color-muted);
    }

    &__derived-value {
      font-family: monospace;
      font-size: variables.$vas-font-size--small;
      color: variables.$vas-color-valantic-primary;
    }
  }
</style>
