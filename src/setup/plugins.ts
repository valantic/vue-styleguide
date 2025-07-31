/* eslint-disable import/first */
import { Plugin } from 'vue';
import VueBemCn from '../plugins/vue-bem-cn';
import viewport from '../plugins/viewport';

export type CustomPlugin = {
  plugin: Plugin;
  options?: Record<string, unknown>;
};

export default [
  { plugin: viewport },
  {
    plugin: VueBemCn,
    options: {
      // please note: if you change the VueBemCn methodName, adjust the global definition in shims-plugins.d.ts
      hyphenate: true,
    },
  },
] satisfies CustomPlugin[];
