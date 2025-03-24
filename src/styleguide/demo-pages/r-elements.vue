<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <h2>Button</h2>
      <div :class="b('variants')">
        <e-vas-button>Button</e-vas-button>
        <e-vas-button active>Button (active)</e-vas-button>
        <e-vas-button focus>Button (focus)</e-vas-button>
        <e-vas-button hover>Button (hover)</e-vas-button>
        <e-vas-button disabled>Button (disabled)</e-vas-button>
        <e-vas-button progress>Button (progress)</e-vas-button>
      </div>
      <div :class="b('variants')">
        <e-vas-button primary>Button Primary</e-vas-button>
        <e-vas-button primary active>Button Primary (active)</e-vas-button>
        <e-vas-button primary focus>Button Primary (focus)</e-vas-button>
        <e-vas-button primary hover>Button Primary (hover)</e-vas-button>
        <e-vas-button primary disabled>Button Primary (disabled)</e-vas-button>
        <e-vas-button primary progress>Button (progress)</e-vas-button>
      </div>
    </div>
    <div :class="b('section')">
      <h2>Input</h2>
      <e-vas-input name="text-input" />
    </div>
    <div :class="b('section')">
      <h2>Checkbox</h2>
      <e-vas-checkbox v-model="checkbox" name="yes" value="yes">Checkbox</e-vas-checkbox>
      <e-vas-checkbox v-model="checkbox" name="no" value="no">Checkbox</e-vas-checkbox>
    </div>
    <div :class="b('section')">
      <h2>Radio</h2>
      <e-vas-radio v-model="radio" name="radio" value="radio 1">Radio</e-vas-radio>
    </div>
    <div :class="b('section')">
      <h2>Toggle</h2>
      <e-vas-toggle v-model="toggle">Toggle</e-vas-toggle>
    </div>
    <div :class="b('section')">
      <h2>Select</h2>
      <e-vas-select :options="options"></e-vas-select>
    </div>
    <div :class="b('section')">
      <h2>Multiselect</h2>
      <e-vas-multiselect :options="options"></e-vas-multiselect>
    </div>
    <div :class="b('section')">
      <h2>Progress</h2>
      <e-vas-progress />
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import lVasLayout from '../../layouts/l-vas-layout.vue';
  import eVasButton from '../../elements/e-vas-button.vue';
  import eVasInput from '../../elements/e-vas-input.vue';
  import eVasCheckbox from '../../elements/e-vas-checkbox.vue';
  import eVasSelect from '../../elements/e-vas-select.vue';
  import eVasMultiselect from '../../elements/e-vas-multiselect.vue';
  import eVasToggle from '../../elements/e-vas-toggle.vue';
  import eVasRadio from '../../elements/e-vas-radio.vue';
  import eVasProgress from '@/elements/e-vas-progress.vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'r-elements',
    components: {
      eVasProgress,
      eVasRadio,
      eVasToggle,
      eVasMultiselect,
      eVasSelect,
      eVasCheckbox,
      eVasInput,
      eVasButton,
      lVasLayout,
    },

    // setup(): Setup {
    //   return {};
    // },
    data() {
      return {
        checkbox: ['yes'],
        radio: '',
        toggle: '',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]
      };
    },

    // computed: {},
  });
</script>

<style lang="scss">
 .r-elements {
   &__section {
     padding: 2rem 0;
   }

   &__variants {
     display: flex;
     gap: 1rem;
     margin-bottom: 10px;
   }
 }
</style>
