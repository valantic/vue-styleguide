<template>
  <l-vas-layout :class="b()">
    <c-vas-render-markdown-file :file="fileName" />
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasRenderMarkdownFile from '../../components/c-vas-render-markdown-file.vue';
  import lVasLayout from '../../layouts/l-vas-layout.vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'r-readme',
    components: {
      lVasLayout,
      cVasRenderMarkdownFile,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    // data(): Data {
    //   return {};
    // },

    computed: {
      fileName(): string {
        return (this.$route?.meta?.file as string) ?? '';
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

    // methods: {},
    // render() {},
  });
</script>
