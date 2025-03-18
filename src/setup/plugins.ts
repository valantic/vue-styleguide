/* eslint-disable import/first */
import { Plugin } from 'vue';
// MUST come after i18n because of build order.
import i18n from './i18n';
import VueBemCn from '../plugins/vue-bem-cn';
import viewport from '../plugins/viewport';

export type CustomPlugin = {
  plugin: Plugin;
  options?: Record<string, unknown>;
};

export default [
  { plugin: i18n },
  { plugin: viewport },
  {
    plugin: VueBemCn,
    options: {
      // please note: if you change the VueBemCn methodName, adjust the global definition in shims-plugins.d.ts
      hyphenate: true,
    },
  },
] satisfies CustomPlugin[];
