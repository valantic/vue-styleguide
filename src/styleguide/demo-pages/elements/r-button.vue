<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <h3>Variants</h3>
      <c-vas-demo-table>
        <template #thead>
          <th>Value</th>
          <th>Example</th>
          <th>Description</th>
        </template>
        <template #tbody>
          <tr>
            <td>default</td>
            <td><e-vas-button>Button</e-vas-button></td>
            <td>Default tonal button.</td>
          </tr>
          <tr>
            <td><b>text</b></td>
            <td><e-vas-button variant="text">Button</e-vas-button></td>
            <td>Removes background, borders and shadows.</td>
          </tr>
        </template>
      </c-vas-demo-table>
    </div>

    <div :class="b('section')">
      <h3>States</h3>
      <c-vas-demo-card>
        <template #header>
          <e-vas-button
            v-for="variant in variants"
            :key="variant"
            :variant="buttonTestVariant === variant ? 'default' : 'text'"
            @click="buttonTestVariant = variant"
          >
            {{ variant }}
          </e-vas-button>
        </template>
        <template #demo>
          <e-vas-button
            :variant="buttonTestVariant"
            :hover="state.hover"
            :focus="state.focus"
            :active="state.active"
            :disabled="state.disabled"
          >
            Button
          </e-vas-button>
        </template>
        <template #sidebar>
          <e-vas-checkbox
            v-for="key in Object.keys(state)"
            v-model="state[key]"
            :key="key"
            :name="key"
          >
            {{ key }}
          </e-vas-checkbox>
        </template>
      </c-vas-demo-card>
    </div>

    <div :class="b('section')">
      <h3>Colors</h3>
      <c-vas-demo-card>
        <template #header>
          <e-vas-button
            v-for="color in colors"
            :key="color"
            :variant="buttonTestColor === color ? 'default' : 'text'"
            @click="buttonTestColor = color"
          >
            {{ color }}
          </e-vas-button>
        </template>
        <template #demo>
          <e-vas-button
            v-for="variant in variants"
            :key="variant"
            :color="buttonTestColor"
            :variant="variant"
            :hover="state.hover"
            :focus="state.focus"
            :active="state.active"
            :disabled="state.disabled"
          >
            {{ variant }}
          </e-vas-button>
        </template>
        <template #sidebar>
          <e-vas-checkbox
            v-for="key in Object.keys(state)"
            v-model="state[key]"
            :key="key"
            :name="key"
          >
            {{ key }}
          </e-vas-checkbox>
        </template>
      </c-vas-demo-card>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasDemoCard from '@/components/c-vas-demo-card.vue';
  import cVasDemoTable from '@/components/c-vas-demo-table.vue';
  import eVasButton from '@/elements/e-vas-button.vue';
  import eVasCheckbox from '@/elements/e-vas-checkbox.vue';
  import lVasLayout from '@/layouts/l-vas-layout.vue';

  // type Setup = {};
  type Data = {
    state: {
      [key: string]: boolean;
      hover: boolean;
      focus: boolean;
      active: boolean;
      disabled: boolean;
    };
    variants: string[];
    colors: string[];
    buttonTestVariant: string;
    buttonTestColor: string;
  };

  export default defineComponent({
    name: 'r-elements',
    components: {
      cVasDemoTable,
      eVasCheckbox,
      cVasDemoCard,
      eVasButton,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    data(): Data {
      return {
        state: {
          hover: false,
          focus: false,
          active: false,
          disabled: false,
        },
        variants: ['default', 'text'],
        colors: ['default', 'primary'],
        buttonTestVariant: 'default',
        buttonTestColor: 'default',
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
