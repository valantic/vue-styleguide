<template>
  <l-vas-layout :class="b()">
    <div :style="{ '--s-icon-finder--color': color }">
      <div :class="b('filter')">
        <label :class="b('label')">
          Search:
          <e-vas-input
            v-model="filter"
            name="icon-search"
            :class="b('filter-input')"
            placeholder="Search …"
          />
        </label>
        <label :class="b('label')">
          Color: {{ color }}
          <e-vas-input
            v-model="color"
            name="icon-color"
            :class="b('filter-input')"
            type="color"
          />
        </label>
        <label :class="b('label', { variant: true })">
          Variant:
          <e-vas-select
            v-model="variant"
            :options="variantOptions"
            :class="b('filter-input')"
          />
        </label>
      </div>
      <div :class="b('grid')">
        <div
          v-for="(icon, index) in filteredIcons"
          :key="index"
          :class="b('grid-item', { negative: icon.negative })"
          role="button"
          @click="copyToClipboard(icon)"
        >
          <div :class="b('icon-wrapper')">
            <div
              v-if="['mask', 'css'].includes(variant)"
              :class="b('icon', { variant })"
              :style="{ [variant === 'css' ? 'backgroundImage' : 'maskImage']: `url(${spritePath}#${icon.name})` }"
            ></div>
            <e-vas-icon
              v-else
              :key="icon.name"
              :icon="icon.name"
              :inline="variant === 'inline'"
              size="80"
            />
          </div>
          <div :class="b('icon-label')">
            {{ icon.name }}
          </div>
        </div>
      </div>
      <div
        v-if="notification"
        :class="b('notification')"
      >
        {{ notification }}
      </div>
      <input
        ref="input"
        :class="b('clipboard')"
        type="text"
      />
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { Ref, defineComponent, ref } from 'vue';
  import spritePath from '@/assets/icons.svg';
  import eVasIcon from '@/elements/e-vas-icon.vue';
  import eVasInput from '@/elements/e-vas-input.vue';
  import eVasSelect, { Options } from '@/elements/e-vas-select.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';
  import { Icon } from '@/types/icon';

  type Setup = {
    input: Ref<HTMLInputElement | null>;
  };

  type FilteredIcon = {
    name: Icon;
    negative: boolean;
  };

  type Data = {
    icons: string[];
    filter: string;
    notification: string;
    color: string;
    variant: 'inline' | 'image' | 'css' | 'mask';
    spritePath: string;
    variantOptions: Options[];
  };

  const icons = import.meta.glob('@/assets/icons/*.svg');

  export default defineComponent({
    name: 'r-icon',

    components: {
      eVasSelect,
      eVasInput,
      lVasLayout,
      eVasIcon,
    },
    // props: {},

    setup(): Setup {
      const input = ref();

      return {
        input,
      };
    },

    data(): Data {
      return {
        icons: Object.keys(icons)
          .map((path) => path.split('/').pop()?.replace('.svg', '') || '')
          .filter(Boolean),
        filter: '',
        notification: '',
        color: '#000000',
        variant: 'inline',
        spritePath,
        variantOptions: [
          { value: 'inline', label: 'inline (colorable)' },
          { value: 'image', label: 'image' },
          { value: 'css', label: 'css' },
          { value: 'mask', label: 'css mask (colorable)' },
        ],
      };
    },

    // components: {},
    computed: {
      /**
       * Returns an array of query filtered icons.
       */
      filteredIcons(): FilteredIcon[] {
        return this.icons
          .filter((icon): icon is Icon => icon.includes(this.filter))
          .map((icon: Icon) => ({
            name: icon,
            negative: Boolean(/negative/.test(icon)),
          }));
      },
    },
    methods: {
      /**
       * Event handler for copy to clipboard button.
       */
      copyToClipboard(icon: FilteredIcon) {
        const hiddenInput = this.input as HTMLInputElement;
        let template;

        switch (this.variant) {
          case 'mask':
            template = `@include mixins.icon(${icon.name});`;
            break;

          case 'css':
            template = `background-image: url('@/assets/icons.svg#${icon.name}');`;
            break;

          case 'image':
            template = `<e-vas-icon icon="${icon.name}" :inline="false" />`;
            break;

          default:
            template = `<e-vas-icon icon="${icon.name}"/>`;
        }

        hiddenInput.value = template;
        hiddenInput.select();

        document.execCommand('Copy');

        this.setNotification(`copied! - ${template}`);

        setTimeout(() => {
          this.setNotification('');
        }, 2000);
      },

      /**
       * Shows the given notification.
       */
      setNotification(message: string) {
        this.notification = message;
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
  });
</script>

<style lang="scss">
  @use '@/setup/scss/mixins';
  @use '@/setup/scss/variables';

  .r-icon {
    &__filter {
      display: flex;
      margin-bottom: variables.$vas-spacing--30;
    }

    &__label {
      display: flex;
      align-items: center;
      margin: 0 variables.$vas-spacing--10 variables.$vas-spacing--10 0;

      &--variant {
        margin: 0 0 0 auto;
      }
    }

    &__filter-input {
      display: block;
      margin-left: variables.$vas-spacing--6;
    }

    &__grid {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -5px;
    }

    &__grid-item {
      flex: 0 1 10%;
      min-width: 100px;
      margin: 5px;
      overflow: hidden;
      border: 1px solid #000000;
      cursor: pointer;

      &::before {
        display: block;
        content: '';
        float: left;
        width: 0;
        padding-top: 100%;
      }
    }

    &__grid-item--negative {
      background-color: variables.$vas-color-grayscale--500;
    }

    &__icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100%;
      height: 80%;
      color: var(--s-icon-finder--color);
    }

    div#{&}__icon {
      width: 80px;
      height: 80px;
      background: no-repeat center center;

      &--variant-mask {
        background: currentColor;
        mask: no-repeat center center / 80px 80px;
      }
    }

    &__icon-label {
      font-size: variables.$vas-font-size--10;
      text-align: center;
    }

    &__clipboard {
      position: absolute;
      left: -99999px;
    }

    &__notification {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      padding: variables.$vas-spacing--10;
      background-color: variables.$vas-color-green-primary;
      text-align: center;
    }

    &__grid-item:hover &__icon-wrapper {
      color: variables.$vas-color-blue-primary;
    }
  }
</style>
