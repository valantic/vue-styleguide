<template>
  <section :class="b('', modifiers)">
    <h1
      v-if="showHeadline"
      :class="b('headline')"
    >
      {{ routeName }}
    </h1>
    <slot></slot>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Modifiers } from '../plugins/vue-bem-cn/src/globals';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'l-vas-layout',

    // components: {},

    props: {
      /**
       * Define content padding class.
       */
      padding: {
        type: String,
        default: 'default',
        validator: (value: string) => ['none', 'default'].includes(value),
      },

      /**
       * Define if the headline should be shown.
       */
      showHeadline: {
        type: Boolean,
        default: true,
      },
    },

    // setup(): Setup {
    //   return {
    //   };
    // },
    // data(): Data {
    //   return {};
    // },

    computed: {
      routeName(): string {
        return this.$route?.meta?.title ?? (this.$route.name as string);
      },

      modifiers(): Modifiers {
        return {
          padding: this.padding,
        };
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

<style lang="scss">
  .l-vas-layout {
    &--padding-default {
      padding: 6rem 0;
    }

    &--padding-none {
      padding: 0;
    }

    &__headline {
      margin-bottom: 2rem;
    }
  }
</style>
