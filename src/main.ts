// It's mandatory that common styles are imported before the application. Else they will come last in the CSS build
import { createApp } from 'vue';
import options from './setup/options';
import plugins from './setup/plugins';
import './setup/styles.scss';

const vuePlugins = plugins;
let vueOptions = options;

if (import.meta.env.DEV) {
  const styleguideOptions = await import('./styleguide/setup'); // eslint-disable-line import/no-webpack-loader-syntax

  vueOptions = {
    ...vueOptions,
    ...styleguideOptions.options,
  };

  vuePlugins.push(...styleguideOptions.plugins);
}

const app = createApp(vueOptions);

vuePlugins.forEach(({ plugin, options: pluginOptions }) => app.use(plugin, pluginOptions));

app.mount('#app');
