<template>
  <l-vas-layout>
    <template #pageConfig>
      <e-vas-toggle v-model="forceConfigurationTop"> Force configuration on top </e-vas-toggle>
    </template>
    <div :class="b()">
      <section :class="b('section')">
        <c-vas-demo-card :force-configuration-top="forceConfigurationTop">
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
  import cVasDemoCard from '../../../components/c-vas-demo-card.vue';
  import eVasButton from '../../../elements/e-vas-button.vue';
  import eVasToggle from '../../../elements/e-vas-toggle.vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Data = {
    forceConfigurationTop: boolean;
  };

  /**
   * Styleguide page for c-vas-demo-card.
   */
  export default defineComponent({
    name: 'r-vas-demo-card',

    components: {
      eVasToggle,
      cVasDemoCard,
      eVasButton,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    data(): Data {
      return {
        forceConfigurationTop: false,
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
