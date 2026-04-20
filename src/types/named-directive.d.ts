import type { Directive } from 'vue';

type NamedDirective = Directive & {
  name: string;
};
