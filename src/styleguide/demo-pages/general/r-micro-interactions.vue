<template>
  <l-vas-layout :class="b()">
    <div :class="b('intro')">
      <p :class="b('intro-text')">
        Micro-interactions give users immediate, consistent feedback for every action. Three rules apply to every
        interactive element: a <strong>150 ms background shift</strong> on hover, a <strong>scale(0.97) press</strong>
        on click, and a <strong>2 px brand-color outline</strong> on keyboard focus. Form inputs additionally show a
        soft glow on focus. These rules are encoded as SCSS mixins so any new component can adopt them in one line.
      </p>
    </div>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Interaction Tokens</h2>
      <div :class="b('token-table')">
        <div
          v-for="token in tokens"
          :key="token.name"
          :class="b('token-row')"
        >
          <code :class="b('token-name')">{{ token.name }}</code>
          <code :class="b('token-value')">{{ token.value }}</code>
          <span :class="b('token-desc')">{{ token.description }}</span>
        </div>
      </div>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Buttons</h2>
      <p :class="b('section-hint')">Hover, click, and Tab to each button to see the three interaction layers.</p>
      <c-vas-demo-card>
        <template #header>e-vas-button</template>
        <template #demo>
          <div :class="b('demo-row')">
            <e-vas-button>Default</e-vas-button>
            <e-vas-button variant="text">Text</e-vas-button>
            <e-vas-button color="primary">Primary</e-vas-button>
            <e-vas-button disabled>Disabled</e-vas-button>
            <e-vas-button icon="i-cog-wheel">With icon</e-vas-button>
          </div>
        </template>
        <template #sidebar>
          <p :class="b('sidebar-text')">
            Hover → background shift (150 ms)<br />
            Click → scale(0.97) (100 ms)<br />
            Tab focus → 2 px brand outline
          </p>
        </template>
      </c-vas-demo-card>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Panel Actions</h2>
      <p :class="b('section-hint')">Icon-only and fluid variants — both include focus ring and press feedback.</p>
      <c-vas-demo-card>
        <template #header>c-vas-panel-action</template>
        <template #demo>
          <div :class="b('demo-row')">
            <c-vas-panel-action
              icon="i-cog-wheel"
              tooltip="Settings"
              tooltip-position="bottom"
            />
            <c-vas-panel-action
              icon="i-star"
              tooltip="Favorites"
              tooltip-position="bottom"
            />
            <c-vas-panel-action
              icon="i-moon"
              tooltip="Dark mode"
              tooltip-position="bottom"
            />
            <c-vas-panel-action
              variant="fluid"
              icon="i-tag"
              text="Label"
              tooltip="Tag"
              tooltip-position="bottom"
            />
            <c-vas-panel-action
              icon="i-bin"
              tooltip="Active example"
              tooltip-position="bottom"
              active
            />
          </div>
        </template>
        <template #sidebar>
          <p :class="b('sidebar-text')">
            Hover → 150 ms bg transition (was instant before)<br />
            Click → scale(0.97)<br />
            Tab focus → 2 px brand outline
          </p>
        </template>
      </c-vas-demo-card>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Tooltips</h2>
      <p :class="b('section-hint')">
        Hover each button to see the directional entrance — the tooltip slides in from a 4 px offset toward the
        trigger.
      </p>
      <c-vas-demo-card>
        <template #header>c-vas-tooltip — all 4 positions</template>
        <template #demo>
          <div :class="b('demo-row', { tooltips: true })">
            <c-vas-tooltip
              text="Slides down from above"
              position="top"
            >
              <e-vas-button>Top</e-vas-button>
            </c-vas-tooltip>
            <c-vas-tooltip
              text="Slides up from below"
              position="bottom"
            >
              <e-vas-button>Bottom</e-vas-button>
            </c-vas-tooltip>
            <c-vas-tooltip
              text="Slides in from the left"
              position="right"
            >
              <e-vas-button>Right</e-vas-button>
            </c-vas-tooltip>
            <c-vas-tooltip
              text="Slides in from the right"
              position="left"
            >
              <e-vas-button>Left</e-vas-button>
            </c-vas-tooltip>
          </div>
        </template>
        <template #sidebar>
          <p :class="b('sidebar-text')">
            opacity: 0→1 (200 ms ease-out)<br />
            + translateY/X: 4px→0 (200 ms ease-out)<br />
            Direction matches the tooltip position.
          </p>
        </template>
      </c-vas-demo-card>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Form Inputs</h2>
      <p :class="b('section-hint')">Tab into each input to see the focus glow.</p>
      <c-vas-demo-card>
        <template #header>e-vas-input &amp; e-vas-select</template>
        <template #demo>
          <div :class="b('demo-col')">
            <e-vas-input
              v-model="inputValue"
              name="demo-input"
              placeholder="Click or Tab to focus"
            />
            <e-vas-select
              v-model="selectValue"
              :options="selectOptions"
            />
          </div>
        </template>
        <template #sidebar>
          <p :class="b('sidebar-text')">
            Tab focus → 0 0 0 3px primary rgba 20%<br />
            (no border change — pure glow)
          </p>
        </template>
      </c-vas-demo-card>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">Toggle Elements</h2>
      <p :class="b('section-hint')">Tab to each control to see the focus ring on the visual element.</p>
      <c-vas-demo-card>
        <template #header>e-vas-toggle, e-vas-checkbox, e-vas-radio</template>
        <template #demo>
          <div :class="b('demo-col')">
            <e-vas-toggle v-model="toggleValue">Toggle (Tab → focus ring on slider)</e-vas-toggle>
            <e-vas-checkbox
              v-model="checkboxValue"
              name="demo-checkbox"
            >
              Checkbox (Tab → focus ring on indicator)
            </e-vas-checkbox>
            <div :class="b('demo-radio-group')">
              <e-vas-radio
                v-model="radioValue"
                name="demo-radio"
                value="a"
              >
                Radio A
              </e-vas-radio>
              <e-vas-radio
                v-model="radioValue"
                name="demo-radio"
                value="b"
              >
                Radio B
              </e-vas-radio>
            </div>
          </div>
        </template>
        <template #sidebar>
          <p :class="b('sidebar-text')">
            Hidden inputs use opacity:0 (not display:none) so they remain focusable. The :focus-visible state
            forwards visually to the custom indicator.
          </p>
        </template>
      </c-vas-demo-card>
    </section>

    <section :class="b('section')">
      <h2 :class="b('section-title')">SCSS Mixin Reference</h2>
      <p :class="b('section-hint')">Apply to any new interactive element with a single include.</p>
      <div :class="b('code-block')">
        <pre><code>{{ mixinSnippet }}</code></pre>
      </div>
    </section>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasDemoCard from '../../../features/c-vas-demo-card.vue';
  import cVasPanelAction from '../../../components/c-vas-panel-action.vue';
  import cVasTooltip from '../../../components/c-vas-tooltip.vue';
  import eVasButton from '../../../elements/e-vas-button.vue';
  import eVasCheckbox from '../../../elements/e-vas-checkbox.vue';
  import eVasInput from '../../../elements/e-vas-input.vue';
  import eVasRadio from '../../../elements/e-vas-radio.vue';
  import eVasSelect from '../../../elements/e-vas-select.vue';
  import eVasToggle from '../../../elements/e-vas-toggle.vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Token = { name: string; value: string; description: string };
  type Data = {
    tokens: Token[];
    inputValue: string;
    selectValue: string;
    selectOptions: { label: string; value: string }[];
    toggleValue: boolean;
    checkboxValue: boolean;
    radioValue: string;
    mixinSnippet: string;
  };

  export default defineComponent({
    name: 'r-micro-interactions',

    components: {
      cVasDemoCard,
      cVasPanelAction,
      cVasTooltip,
      eVasButton,
      eVasCheckbox,
      eVasInput,
      eVasRadio,
      eVasSelect,
      eVasToggle,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        tokens: [
          {
            name: '$vas-transition--fast',
            value: '0.15s ease',
            description: 'Hover background transitions — snappier than the default 300 ms',
          },
          {
            name: '$vas-transition-duration--press',
            value: '100ms',
            description: 'Scale-down duration on click — fast enough to feel tactile',
          },
          {
            name: ':focus-visible outline',
            value: '2px solid #FF5D4C',
            description: 'Keyboard-only focus ring using the Valantic brand color',
          },
          {
            name: 'focus glow (inputs only)',
            value: '0 0 0 3px rgba(#FF5D4C, 0.2)',
            description: 'Soft glow on form inputs — pairs with the existing border',
          },
        ],
        inputValue: '',
        selectValue: 'option-a',
        selectOptions: [
          { label: 'Option A', value: 'option-a' },
          { label: 'Option B', value: 'option-b' },
          { label: 'Option C', value: 'option-c' },
        ],
        toggleValue: true,
        checkboxValue: false,
        radioValue: 'a',
        mixinSnippet: `// In your component's <style lang="scss"> block:
@use '../setup/scss/variables';
@use '../setup/scss/mixins';

.my-interactive-element {
  // ... base styles ...

  // Keyboard focus ring (brand outline, :focus-visible only — not on mouse click)
  @include mixins.focus-ring;

  // Click/press feedback (scale 0.97 for 100ms)
  @include mixins.press-feedback;
}

// For form inputs (glow instead of outline):
.my-input-element {
  @include mixins.focus-glow;
}`,
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

  .r-micro-interactions {
    &__intro {
      margin-bottom: variables.$vas-spacing--20;
    }

    &__intro-text {
      margin: 0;
      font-size: var(--vas-font-size-label);
      color: var(--vas-theme-text-color);
      line-height: 1.6;
    }

    &__section {
      margin-bottom: variables.$vas-spacing--24;
    }

    &__section-title {
      margin: 0 0 variables.$vas-spacing--6;
      font-size: var(--vas-font-size-heading);
      font-weight: variables.$vas-font-weight--bold;
      color: var(--vas-theme-text-color-highlight);
    }

    &__section-hint {
      margin: 0 0 variables.$vas-spacing--10;
      font-size: var(--vas-font-size-base);
      color: var(--vas-theme-text-color-muted);
    }

    &__token-table {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--2;
    }

    &__token-row {
      display: grid;
      grid-template-columns: 1fr 1fr 2fr;
      gap: variables.$vas-spacing--8;
      align-items: baseline;
      padding: variables.$vas-spacing--6 variables.$vas-spacing--8;
      background-color: var(--vas-theme-background-surface);
      border-radius: variables.$vas-theme-border-radius;
    }

    &__token-name {
      font-size: var(--vas-font-size-small);
      color: var(--vas-theme-text-color-highlight);
    }

    &__token-value {
      font-size: var(--vas-font-size-small);
      color: variables.$vas-color-valantic-primary;
    }

    &__token-desc {
      font-size: var(--vas-font-size-base);
      color: var(--vas-theme-text-color-muted);
    }

    &__demo-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: variables.$vas-spacing--8;

      &--tooltips {
        padding: variables.$vas-spacing--16 variables.$vas-spacing--8 variables.$vas-spacing--8;
      }
    }

    &__demo-col {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--10;
      width: 100%;
    }

    &__demo-radio-group {
      display: flex;
      flex-direction: column;
      gap: variables.$vas-spacing--4;
    }

    &__sidebar-text {
      margin: 0;
      font-size: var(--vas-font-size-base);
      color: var(--vas-theme-text-color-muted);
      line-height: 1.6;
    }

    &__code-block {
      background-color: var(--vas-theme-background-surface);
      border: 1px solid var(--vas-theme-border-color);
      border-radius: variables.$vas-theme-border-radius;
      padding: variables.$vas-spacing--16;
      overflow-x: auto;

      pre,
      code {
        margin: 0;
        font-size: var(--vas-font-size-small);
        color: var(--vas-theme-text-color);
        line-height: 1.6;
        white-space: pre;
      }
    }
  }
</style>
