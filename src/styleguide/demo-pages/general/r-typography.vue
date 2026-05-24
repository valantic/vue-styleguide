<template>
  <l-vas-layout :class="b()">
    <div :class="b('grid')">
      <div :class="b('left')">
        <div :class="b('font-highlight')">Aa</div>
        <div :class="b('font-name')">Arial</div>
        <div :class="b('font-special-chars')">
          ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzžАБВГҐ
          ДЂЕЁЄЖЗЅИІЇЙЈКЛЉМНЊОПРСТЋУЎФХЦЧЏШЩЪЫЬЭЮЯабвгґдђеёєжзѕиіїйјклљмнњопр
          стћуўфхцчџшщъыьэюяĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]{@}/&\-+÷×=>®©$€£¥¢:;,.*
        </div>
        <div :class="b('font-special-chars')">0123456789</div>
      </div>
      <div :class="b('right')">
        <div :class="b('section')">
          <div :class="b('scale-title')">Font Scale — Track A (Sidebar UI)</div>
          <table :class="b('scale-table')">
            <thead>
              <tr>
                <th>Token</th>
                <th>Size</th>
                <th>Preview</th>
                <th>Used for</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry in fontScale"
                :key="entry.token"
              >
                <td :class="b('scale-token')">{{ entry.token }}</td>
                <td :class="b('scale-size')">{{ entry.size }}</td>
                <td>
                  <span :style="{ fontSize: entry.size }">{{ entry.sample }}</span>
                </td>
                <td :class="b('scale-usage')">{{ entry.usage }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div :class="b('section')">
          <h1>h1 — h6 Headline (all 15px)</h1>
          <p>{{ dummyText }}</p>
        </div>

        <div :class="b('section')">
          <p>&lt;a&gt; <a href="#">This is a link</a></p>
          <p>&lt;mark&gt; You can use the mark tag to <mark>highlight</mark> text.</p>
          <p>&lt;del&gt; <del>This line of text is meant to be treated as deleted text.</del></p>
          <p>&lt;s&gt; <s>This line of text is meant to be treated as no longer accurate.</s></p>
          <p>&lt;ins&gt; <ins>This line of text is meant to be treated as an addition to the document.</ins></p>
          <p>&lt;u&gt; <u>This line of text will render as underlined.</u></p>
          <p>&lt;small&gt; <small>This line of text is meant to be treated as fine print.</small></p>
          <p>&lt;strong&gt; <strong>This line rendered as bold text.</strong></p>
          <p>&lt;em&gt; <em>This line rendered as italicized text.</em></p>
        </div>
      </div>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { faker } from '@faker-js/faker';
  import { defineComponent } from 'vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Data = {
    dummyText: string;
    fontScale: { token: string; size: string; sample: string; usage: string }[];
  };

  export default defineComponent({
    name: 'r-typography',
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
        dummyText: faker.lorem.words(45),
        fontScale: [
          {
            token: '$vas-font-size--tiny',
            size: '10px',
            sample: 'Badge label, icon annotation',
            usage: 'Badge labels, icon annotations, micro-captions',
          },
          {
            token: '$vas-font-size--small',
            size: '11px',
            sample: 'Nav sub-item, code snippet, metadata',
            usage: 'Nav sub-items, code snippets, tag text, muted metadata',
          },
          {
            token: '$vas-font-size--base',
            size: '12px',
            sample: 'Body text, form fields, nav items, tooltips',
            usage: 'Default body, form inputs, nav items, tooltips, markdown body',
          },
          {
            token: '$vas-font-size--label',
            size: '13px',
            sample: 'Button text, form label, section label',
            usage: 'Button text, form labels, section labels, sidebar root base',
          },
          {
            token: '$vas-font-size--heading',
            size: '15px',
            sample: 'Panel title, modal header',
            usage: 'All h1–h6 inside sidebar, panel/modal titles, page headers',
          },
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

  .r-typography {
    &__grid {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 8rem;
      order: revert;
      margin-top: 4rem;
    }

    &__left {
      display: flex;
      gap: 20px;
      flex-direction: column;
    }

    &__font-highlight {
      font-size: 13rem;
      font-weight: 700;
      line-height: 1;
    }

    &__font-name {
      font-size: 3rem;
      line-height: 1;
    }

    &__font-special-chars {
      font-size: variables.$vas-font-size--base;
      line-height: 1.4;
      overflow-wrap: break-word;
    }

    &__section {
      margin-bottom: 2rem;
      padding: variables.$vas-spacing--16;
      background-color: #fbfbfb;
    }

    &__scale-title {
      font-size: variables.$vas-font-size--label;
      font-weight: variables.$vas-font-weight--bold;
      margin-bottom: variables.$vas-spacing--12;
    }

    &__scale-table {
      width: 100%;
      border-collapse: collapse;
      font-size: variables.$vas-font-size--base;

      th,
      td {
        text-align: left;
        padding: variables.$vas-spacing--6 variables.$vas-spacing--12;
        border-bottom: 1px solid var(--vas-theme-border-color);
        vertical-align: middle;
      }

      th {
        font-size: variables.$vas-font-size--tiny;
        font-weight: variables.$vas-font-weight--bold;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--vas-theme-text-color-muted);
      }
    }

    &__scale-token {
      font-family: monospace;
      font-size: variables.$vas-font-size--small;
      white-space: nowrap;
    }

    &__scale-size {
      font-weight: variables.$vas-font-weight--bold;
      white-space: nowrap;
    }

    &__scale-usage {
      color: var(--vas-theme-text-color-muted);
    }
  }
</style>
