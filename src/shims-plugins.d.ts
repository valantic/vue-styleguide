import dayjs from 'dayjs';
import { VueBemFunction } from './plugins/vue-bem-cn/src/globals';

declare module 'vue' {
  // provide typings for global properties
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs;
    b: VueBemFunction;
    // needed for tests
    bem: VueBemFunction;
  }
}
