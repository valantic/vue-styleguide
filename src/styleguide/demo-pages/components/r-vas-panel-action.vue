<template>
  <l-vas-layout :class="b()">
    <div :class="b('section')">
      <h3>Icon variant</h3>
      <c-vas-demo-table>
        <template #thead>
          <th>State</th>
          <th>Light</th>
          <th>Dark</th>
        </template>
        <template #tbody>
          <tr>
            <td>default</td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-light"
              >
                <c-vas-panel-action
                  icon="i-cog-wheel"
                  title="Settings"
                />
                <c-vas-panel-action
                  icon="i-close"
                  title="Close"
                />
                <c-vas-panel-action
                  icon="i-chevron--down"
                  title="Collapse"
                />
                <c-vas-panel-action
                  icon="i-page-setting"
                  title="Options"
                />
              </div>
            </td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-dark"
              >
                <c-vas-panel-action
                  icon="i-cog-wheel"
                  title="Settings"
                />
                <c-vas-panel-action
                  icon="i-close"
                  title="Close"
                />
                <c-vas-panel-action
                  icon="i-chevron--down"
                  title="Collapse"
                />
                <c-vas-panel-action
                  icon="i-page-setting"
                  title="Options"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>active</td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-light"
              >
                <c-vas-panel-action
                  icon="i-cog-wheel"
                  title="Settings"
                  active
                />
              </div>
            </td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-dark"
              >
                <c-vas-panel-action
                  icon="i-cog-wheel"
                  title="Settings"
                  active
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-light"
              >
                <c-vas-panel-action
                  icon="i-cog-wheel"
                  title="Settings"
                  disabled
                />
              </div>
            </td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-dark"
              >
                <c-vas-panel-action
                  icon="i-cog-wheel"
                  title="Settings"
                  disabled
                />
              </div>
            </td>
          </tr>
        </template>
      </c-vas-demo-table>
    </div>

    <div :class="b('section')">
      <h3>Tooltip positions</h3>
      <c-vas-demo-table>
        <template #thead>
          <th>Position</th>
          <th>Light</th>
          <th>Dark</th>
        </template>
        <template #tbody>
          <tr
            v-for="pos in tooltipPositions"
            :key="pos"
          >
            <td>{{ pos }}</td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-light"
              >
                <c-vas-panel-action
                  icon="i-cog-wheel"
                  title="Settings"
                  :tooltip-position="pos"
                />
              </div>
            </td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-dark"
              >
                <c-vas-panel-action
                  icon="i-cog-wheel"
                  title="Settings"
                  :tooltip-position="pos"
                />
              </div>
            </td>
          </tr>
        </template>
      </c-vas-demo-table>
    </div>

    <div :class="b('section')">
      <h3>Link variant (href)</h3>
      <c-vas-demo-table>
        <template #thead>
          <th>State</th>
          <th>Light</th>
          <th>Dark</th>
        </template>
        <template #tbody>
          <tr>
            <td>icon link</td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-light"
              >
                <c-vas-panel-action
                  icon="i-tag"
                  title="Visit repo"
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-dark"
              >
                <c-vas-panel-action
                  icon="i-tag"
                  title="Visit repo"
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>fluid link</td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-light"
              >
                <c-vas-panel-action
                  variant="fluid"
                  icon="i-tag"
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  v1.3.0
                </c-vas-panel-action>
              </div>
            </td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-dark"
              >
                <c-vas-panel-action
                  variant="fluid"
                  icon="i-tag"
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  v1.3.0
                </c-vas-panel-action>
              </div>
            </td>
          </tr>
        </template>
      </c-vas-demo-table>
    </div>

    <div :class="b('section')">
      <h3>Fluid variant</h3>
      <c-vas-demo-table>
        <template #thead>
          <th>State</th>
          <th>Light</th>
          <th>Dark</th>
        </template>
        <template #tbody>
          <tr>
            <td>text only</td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-light"
              >
                <c-vas-panel-action variant="fluid">Run</c-vas-panel-action>
                <c-vas-panel-action variant="fluid">Debug</c-vas-panel-action>
              </div>
            </td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-dark"
              >
                <c-vas-panel-action variant="fluid">Run</c-vas-panel-action>
                <c-vas-panel-action variant="fluid">Debug</c-vas-panel-action>
              </div>
            </td>
          </tr>
          <tr>
            <td>icon + text</td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-light"
              >
                <c-vas-panel-action
                  variant="fluid"
                  icon="i-cog-wheel"
                  >Settings</c-vas-panel-action
                >
                <c-vas-panel-action
                  variant="fluid"
                  icon="i-close"
                  >Close</c-vas-panel-action
                >
              </div>
            </td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-dark"
              >
                <c-vas-panel-action
                  variant="fluid"
                  icon="i-cog-wheel"
                  >Settings</c-vas-panel-action
                >
                <c-vas-panel-action
                  variant="fluid"
                  icon="i-close"
                  >Close</c-vas-panel-action
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>active</td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-light"
              >
                <c-vas-panel-action
                  variant="fluid"
                  icon="i-cog-wheel"
                  active
                  >Settings</c-vas-panel-action
                >
              </div>
            </td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-dark"
              >
                <c-vas-panel-action
                  variant="fluid"
                  icon="i-cog-wheel"
                  active
                  >Settings</c-vas-panel-action
                >
              </div>
            </td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-light"
              >
                <c-vas-panel-action
                  variant="fluid"
                  icon="i-cog-wheel"
                  disabled
                  >Settings</c-vas-panel-action
                >
              </div>
            </td>
            <td>
              <div
                :class="b('toolbar')"
                class="vas-styleguide-theme-dark"
              >
                <c-vas-panel-action
                  variant="fluid"
                  icon="i-cog-wheel"
                  disabled
                  >Settings</c-vas-panel-action
                >
              </div>
            </td>
          </tr>
        </template>
      </c-vas-demo-table>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cVasDemoTable from '../../../components/c-vas-demo-table.vue';
  import cVasPanelAction from '../../../components/c-vas-panel-action.vue';
  import lVasLayout from '../../../layouts/l-vas-layout.vue';

  // type Setup = {};
  type Data = {
    tooltipPositions: Array<'top' | 'bottom' | 'left' | 'right'>;
  };

  /**
   * Demo page for c-vas-panel-action.
   */
  export default defineComponent({
    name: 'r-vas-panel-action',
    components: {
      cVasDemoTable,
      cVasPanelAction,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    data(): Data {
      return {
        tooltipPositions: ['top', 'bottom', 'left', 'right'],
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

  .r-vas-panel-action {
    &__section {
      margin-bottom: variables.$vas-spacing--24;
    }

    &__toolbar {
      display: flex;
      align-items: center;
      height: 32px;
      background-color: var(--vas-theme-background-container);
      border-radius: variables.$vas-theme-border-radius;
    }
  }
</style>
