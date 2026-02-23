import { Plugin } from 'vue';
import viewport from '../plugins/viewport';
import VueBemCn from '../plugins/vue-bem-cn';
import directives from './directives';

export type CustomPlugin = {
  plugin: Plugin;
  options?: Record<string, unknown>;
};

export default [
  { plugin: directives },
  { plugin: viewport },
  {
    plugin: VueBemCn,
    options: {
      // please note: if you change the VueBemCn methodName, adjust the global definition in shims-plugins.d.ts
      hyphenate: true,
    },
  },
] satisfies CustomPlugin[];
