<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <c-vas-demo-card>
        <template #header> Default Textarea </template>
        <template #demo>
          <e-vas-textarea
            v-model="value"
            :class="b('textarea')"
            :label="label"
            :placeholder="placeholder"
            :rows="rows"
            :auto-grow="autoGrow"
            :no-resize="noResize"
            :disabled="disabled"
            name="text-area"
          />
        </template>
        <template #sidebar>
          <e-vas-input
            v-model="label"
            name="label"
            label="label"
          />

          <e-vas-input
            v-model="placeholder"
            name="placeholder"
            label="placeholder"
          />

          <e-vas-input
            v-model="rows"
            name="rows"
            type="number"
            label="rows"
          />

          <e-vas-checkbox
            v-model="autoGrow"
            name="autoGrow"
            label="autoGrow"
          />

          <e-vas-checkbox
            v-model="noResize"
            name="noResize"
            label="noResize"
          />

          <e-vas-checkbox
            v-model="disabled"
            name="disabled"
            label="disabled"
          />
        </template>
      </c-vas-demo-card>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eVasCheckbox from '../../../elements/e-vas-checkbox.vue';
  import eVasInput from '../../../elements/e-vas-input.vue';
  import eVasTextarea from '../../../elements/e-vas-textarea.vue';
  import cVasDemoCard from '../../../features/c-vas-demo-card.vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Data = {
    value: string;
    label: string;
    placeholder: string;
    rows: string;
    autoGrow: boolean;
    noResize: boolean;
    disabled: boolean;
  };

  /**
   * Styleguide demo for e-vas-textarea
   */
  export default defineComponent({
    name: 'r-vas-textarea',

    components: {
      cVasDemoCard,
      eVasCheckbox,
      eVasInput,
      eVasTextarea,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {
    //   return {};
    // },
    data(): Data {
      return {
        value: '',
        label: 'Description',
        placeholder: 'Tell us more...',
        rows: '5',
        autoGrow: false,
        noResize: false,
        disabled: false,
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
  .r-vas-textarea {
    &__textarea {
      width: 300px;
    }
  }
</style>
