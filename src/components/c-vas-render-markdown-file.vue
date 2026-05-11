<template>
  <div :class="b()">
    <component
      v-if="markdownComponent"
      :is="markdownComponent"
    />
  </div>
</template>

<script lang="ts">
  import type { Component, Ref } from 'vue';
  import { defineAsyncComponent, defineComponent, markRaw, ref, watch } from 'vue';

  type Setup = {
    markdownComponent: Ref<Component | null>;
  };

  /**
   * Renders a markdown file as a Vue component.
   */
  export default defineComponent({
    name: 'c-vas-render-markdown-file',

    // components: {},

    props: {
      /**
       * The relative path to the markdown file to render.
       * e.g. '../../README.md'
       */
      file: {
        type: String,
        required: true,
      },
    },
    // emits: {},

    setup(props): Setup {
      const markdownComponent = ref<Component | null>(null);

      const updateMarkdownComponent = (): void => {
        if (!props.file) {
          markdownComponent.value = null;

          return;
        }

        markdownComponent.value = markRaw(
          defineAsyncComponent(async () => {
            try {
              // Vite dynamic import with a template literal.
              // Note: Paths must be somewhat static for Vite to resolve them.
              // It's recommended to provide paths relative to this component.
              const markdownModule = await import(/* @vite-ignore */ props.file);

              return markdownModule.VueComponent;
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error(`Failed to load markdown file: ${props.file}`, error);

              return {
                render() {
                  return null;
                },
              };
            }
          }),
        );
      };

      watch(
        () => props.file,
        () => {
          updateMarkdownComponent();
        },
        { immediate: true },
      );

      return {
        markdownComponent,
      };
    },
    // data(): Data {
    //   return {};
    // },

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
  // stylelint-disable selector-class-pattern,selector-max-id
  .c-vas-render-markdown-file {
    $color-black: #000000;
    $color-white: #ffffff;
    $color-gray-dark: #333333;
    $color-gray-medium-dark: #555555;
    $color-gray-medium: #777777;
    $color-gray-light-medium: #999999;
    $color-gray-light: #ccccccc;
    $color-gray-very-light: #dddddd;
    $color-gray-extra-light: #eeeeee;
    $color-gray-background: #f8f8f8;
    $color-blue-dark: #445588;
    $color-purple: #800080;
    $color-dark-teal: #252a2a;
    $color-selection-black: rgba(0, 0, 0, 70%);

    color: #1a1a1a;
    background: #ffffff;
    border-radius: 3px;

    > * {
      &:first-child {
        margin-top: 0 !important; // stylelint-disable-line declaration-no-important
      }

      &:last-child {
        margin-bottom: 0 !important; // stylelint-disable-line declaration-no-important
      }
    }

    p {
      margin: 15px 0;
    }

    a {
      text-decoration: underline;

      &:first-child {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin-top: 0;
          padding-top: 0;
        }
      }

      &.footnote {
        font-size: 14px;
        height: 0;
        line-height: 1;
        vertical-align: super;
        position: relative;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      cursor: text;
      position: relative;
      margin: 1em 0 15px;
      padding: 0;
      border-bottom: 1px solid $color-gray-very-light;

      + p {
        margin-top: 0;
      }
    }

    h2 {
      border-bottom-color: $color-gray-extra-light;
    }

    h3,
    h4,
    h5 {
      border-bottom-color: transparent;
    }

    h6 {
      cursor: text;
      position: relative;
      margin: 1em 0 15px;
      padding: 0;
      color: $color-gray-medium;

      + p {
        margin-top: 0;
      }
    }

    blockquote {
      margin: 15px 0;
      border-left: 4px solid $color-gray-very-light;
      padding: 0 15px;
      color: $color-gray-medium;

      > {
        :first-child {
          margin-top: 0;
        }

        :last-child {
          margin-bottom: 0;
        }
      }
    }

    table {
      margin: 15px 0;
      border-collapse: collapse;
      border-spacing: 0;
      font: inherit;

      th {
        font-weight: bold;
        border: 1px solid $color-gray-light;
        padding: 6px 13px;
      }

      td {
        border: 1px solid $color-gray-light;
        padding: 6px 13px;
      }

      tr {
        border-top: 1px solid $color-gray-light;
        background-color: $color-white;

        &:nth-child(2n) {
          background-color: $color-gray-background;
        }
      }
    }

    pre {
      font-size: 14px;
      background-color: $color-gray-background;
      border: 1px solid $color-gray-light;
      line-height: 19px;
      overflow: auto;
      padding: 6px 10px;
      border-radius: 3px;
      margin: 26px 0;

      > code {
        margin: 0;
        padding: 0;
        white-space: pre;
        border: none;
        background: transparent;
      }

      code,
      tt {
        background-color: transparent;
        border: none;
      }
    }

    ul,
    ol {
      padding-left: 30px;
      list-style: decimal;

      li + li {
        margin-top: 10px;
      }
    }

    ol {
      list-style: decimal;
    }

    hr {
      border: 0;
      border-top: 1px solid $color-gray-light;
      height: 0;
      margin: 15px 0;
      padding: 0;
    }

    #wrapper {
      > h1:first-child {
        + h2 {
          margin-top: 0;
          padding-top: 0;
        }
      }

      > h1:first-child,
      > h2:first-child,
      > h3:first-child,
      > h4:first-child,
      > h5:first-child,
      > h6:first-child {
        margin-top: 0;
        padding-top: 0;
      }
    }

    dl {
      padding: 0;

      dt {
        font-size: 14px;
        font-weight: bold;
        font-style: italic;
        padding: 0;
        margin: 15px 0 5px;

        &:first-child {
          padding: 0;
        }
      }

      dd {
        margin: 0 0 15px;
        padding: 0 15px;
      }

      dt,
      dd {
        > {
          :first-child {
            margin-top: 0;
          }

          :last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    img {
      max-width: 100%;
    }

    code,
    tt {
      font-size: 12px;
      margin: 0 2px;
      padding: 0 5px;
      white-space: nowrap;
      border: 1px solid #eaeaea;
      background-color: $color-gray-background;
      border-radius: 3px;
      font-family: Consolas, 'Liberation Mono', Courier, monospace;
      color: $color-gray-dark;
    }

    .highlight {
      pre {
        font-size: 12px;
        background-color: $color-gray-background;
        border: 1px solid $color-gray-light;
        line-height: 19px;
        overflow: auto;
        padding: 6px 10px;
        border-radius: 3px;
      }

      .err {
        color: #a61717;
        background-color: #e3d2d2;
      }

      .k,
      .o {
        font-weight: bold;
      }

      .cp {
        color: $color-gray-light-medium;
        font-weight: bold;
      }

      .c,
      .c1,
      .cm {
        color: #999988;
        font-style: italic;
      }

      .cs {
        color: $color-gray-light-medium;
        font-weight: bold;
        font-style: italic;
      }

      .gd {
        color: $color-black;
        background-color: #ffdddd;

        .x {
          color: $color-black;
          background-color: #ffaaaa;
        }
      }

      .ge {
        font-style: italic;
      }

      .gh {
        color: $color-gray-light-medium;
      }

      .gi {
        color: $color-black;
        background-color: #ddffdd;

        .x {
          color: $color-black;
          background-color: #aaffaa;
        }
      }

      .go {
        color: #888888;
      }

      .gp {
        color: $color-gray-medium-dark;
      }

      .gu {
        color: $color-purple;
        font-weight: bold;
      }

      .gt,
      .gr {
        color: #aa0000;
      }

      .kc,
      .kd,
      .kn,
      .kp,
      .kr,
      .gs {
        font-weight: bold;
      }

      .kt {
        color: $color-blue-dark;
        font-weight: bold;
      }

      .nb {
        color: #0086b3;
      }

      .nc {
        color: $color-blue-dark;
        font-weight: bold;
      }

      .ni {
        color: $color-purple;
      }

      .ne,
      .nf {
        color: #990000;
        font-weight: bold;
      }

      .nn {
        color: $color-gray-medium-dark;
      }

      .nt {
        color: #000080;
      }

      .ow {
        font-weight: bold;
      }

      .w {
        color: #bbbbbb;
      }

      .mf,
      .mh,
      .mi,
      .mo,
      .il,
      .m {
        color: #009999;
      }

      .sb,
      .sc,
      .sd,
      .s2,
      .se,
      .sh,
      .si,
      .sx,
      .s1,
      .s {
        color: #dd1144;
      }

      .sr {
        color: #009926;
      }

      .ss {
        color: #990073;
      }

      .bp {
        color: $color-gray-light-medium;
      }

      .vc,
      .vg,
      .vi,
      .no,
      .na,
      .nv {
        color: #008080;
      }

      .gc {
        color: $color-gray-light-medium;
        background-color: #eaf2f5;
      }
    }

    sup {
      font-size: 14px;
      height: 0;
      line-height: 1;
      vertical-align: super;
      position: relative;
    }

    sub {
      font-size: 14px;
      height: 0;
      line-height: 1;
      position: relative;
      vertical-align: sub;
      top: -1px;
    }

    .poetry pre {
      font-family: Georgia, Garamond, serif !important; // stylelint-disable-line declaration-no-important
      font-style: italic;
      font-size: 110% !important; // stylelint-disable-line declaration-no-important
      line-height: 1.6em;
      display: block;
      margin-left: 1em;

      code {
        font-family: Georgia, Garamond, serif !important; // stylelint-disable-line declaration-no-important
        word-break: break-all;
        hyphens: auto;
        white-space: pre-wrap;
      }
    }

    .type-csharp .highlight {
      .k,
      .kt {
        color: #0000ff;
      }

      .nf {
        color: $color-black;
        font-weight: normal;
      }

      .nc {
        color: #2b91af;
      }

      .nn {
        color: $color-black;
      }

      .s,
      .sc {
        color: #a31515;
      }
    }

    body.dark #wrapper {
      background: transparent !important; // stylelint-disable-line declaration-no-important
      box-shadow: none !important; // stylelint-disable-line declaration-no-important
    }

    // Start Inverted styling
    .inverted {
      background: $color-dark-teal;

      #wrapper {
        color: $color-gray-extra-light !important; // stylelint-disable-line declaration-no-important
        border-color: $color-gray-medium-dark;
        background: $color-dark-teal;
        box-shadow: none;
      }

      hr {
        color: $color-gray-extra-light !important; // stylelint-disable-line declaration-no-important
        border-color: $color-gray-medium;
        border-width: 1px !important; // stylelint-disable-line declaration-no-important
        box-shadow: none;
      }

      th,
      td {
        color: $color-gray-extra-light !important; // stylelint-disable-line declaration-no-important
        border-color: $color-gray-medium-dark;
        background: $color-gray-dark;
        box-shadow: none;
      }

      p,
      li,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      .math,
      caption,
      dd,
      dt,
      blockquote {
        color: $color-gray-extra-light !important; // stylelint-disable-line declaration-no-important
        border-color: $color-gray-medium-dark;
        box-shadow: none;
      }

      pre,
      code,
      tt {
        background: $color-gray-extra-light !important; // stylelint-disable-line declaration-no-important
        color: #111111;
      }

      a::selection {
        background-color: rgba(255, 230, 102, 60%);
      }

      a {
        color: #acd1d5;
      }
    }

    ::selection {
      background: rgba(157, 193, 200, 50%);
    }

    h1::selection {
      background-color: rgba(45, 156, 208, 30%);
    }

    h2::selection {
      background-color: rgba(90, 182, 224, 30%);
    }

    h3::selection,
    h4::selection,
    h5::selection,
    h6::selection,
    li::selection,
    ol::selection {
      background-color: rgba(133, 201, 232, 30%);
    }

    code::selection {
      background-color: $color-selection-black;
      color: $color-gray-extra-light;
    }

    a::selection {
      background-color: rgba(255, 230, 102, 20%);
    }

    td::selection,
    th::selection,
    caption::selection {
      background-color: rgba(180, 237, 95, 50%);
    }

    body.inverted {
      color: $color-gray-extra-light !important; // stylelint-disable-line declaration-no-important
      border-color: $color-gray-medium-dark;
      box-shadow: none;
    }

    code span::selection {
      background-color: $color-selection-black !important; // stylelint-disable-line declaration-no-important
      color: $color-gray-extra-light !important; // stylelint-disable-line declaration-no-important
    }
  }
</style>
