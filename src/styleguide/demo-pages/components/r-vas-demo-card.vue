<template>
  <l-vas-layout>
    <div :class="b()">
      <section :class="b('section')">
        <c-vas-demo-card>
          <template #header> Demo Card Header </template>
          <template #demo>
            <e-vas-button primary>Action</e-vas-button>
          </template>
          <template #sidebar> Sidebar info </template>
        </c-vas-demo-card>
      </section>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasDemoCard from '@/components/c-vas-demo-card.vue';
  import eVasButton from '@/elements/e-vas-button.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Styleguide page for c-vas-demo-card.
   */
  export default defineComponent({
    name: 'r-vas-demo-card',

    components: {
      cVasDemoCard,
      eVasButton,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
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
