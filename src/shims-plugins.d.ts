import dayjs from 'dayjs';
import { Viewport } from '@/plugins/viewport';
import { VueBemFunction } from '@/plugins/vue-bem-cn/src/globals';

declare module 'vue' {
  // provide typings for global properties
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs;
    $viewport: Viewport;
    b: VueBemFunction;
    // needed for tests
    bem: VueBemFunction;
  }
}

export {};
