<template>
  <l-vas-layout>
    <div :class="b()">
      <c-vas-readme />
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasReadme from '../../components/c-vas-readme.vue';
  import lVasLayout from '../../layouts/l-vas-layout.vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'r-readme',
    components: {
      lVasLayout,
      cVasReadme,
    },

    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
    //   return {
    //   };
    // },

    // computed: {},
  });
</script>
