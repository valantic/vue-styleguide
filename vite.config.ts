/* eslint-disable capitalized-comments, no-case-declarations */
// Vitest instead of Vite was used because of extended Interface.
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { Mode, plugin as mdPlugin } from 'vite-plugin-markdown';
import { UserConfigExport } from 'vitest/config';
import viteBuilds from './vite.builds.json';

interface Modes {
  [key: string]: {
    input: string[];
  };
}

interface ViteBuilds {
  base: string;
  outDir: string;
  assetsDir: string;
  profileBuild: string;
  modes: Modes;
  themeSource: string;
  themeFiles: string[];
}

export const alias = {
  '@': resolve(__dirname, 'src/'),
  '@!production': resolve(__dirname, 'src/'), // Workaround so that no assets from conditional styleguide related imports become part of the build.
  'vue': 'vue/dist/vue.esm-bundler.js', // Was required because inline import of vue.esm-bundler.js resulted in TS issues.
};

/**
 * Notes:
 * - Style only components are imported by src/setup/components.ts.
 */
export default defineConfig(({ command, mode }) => {
  const config: UserConfigExport = {
    plugins: [
      vue(),
      mdPlugin({
        mode: [Mode.VUE],
      }),
    ],
    resolve: {
      alias,
    },
    define: {
      // Was required to get rid of esm build warning for Vue-i18n.
      // @see https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
    },
    json: {
      stringify: true,
    },
    test: {
      environment: 'jsdom',
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or "modern"
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  };

  switch (command) {
    case 'build': // @see https://vitejs.dev/config/build-options.html
      const isProfileBuild = mode === 'profile';
      const { base, outDir, assetsDir, modes, profileBuild } = (viteBuilds as ViteBuilds) || {};

      if (!isProfileBuild && !modes[mode]) {
        throw Error(`Given mode '${mode}' is unknown.`);
      }

      const { input } = modes[isProfileBuild ? profileBuild : mode] || {};

      config.base = base;
      config.build = {
        outDir: `${outDir}/${mode}`,
        assetsInlineLimit: 0, // TODO: check if it makes sense to increase this value.
        manifest: true,
        emptyOutDir: true,
        sourcemap: true,
        copyPublicDir: true,

        // TODO: watch?
        rollupOptions: {
          external: [
            /!dev/, // Removes styleguide/dev only assets.
          ],
          input,
          output: {
            entryFileNames: 'index.[hash].js',
            chunkFileNames(chunkInfo): string {
              const path = `${assetsDir}/js`;

              if (!chunkInfo.facadeModuleId) {
                return `${path}/shared.${chunkInfo.moduleIds.length}-[hash].js`;
              }

              return `${path}/[name].[hash].js`;
            },
            assetFileNames(assetInfo): string {
              const fileName = assetInfo?.name || '';
              const imageExtensions = /\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i;
              const styleExtensions = /\.(css|sass|scss)$/i;
              const fontExtensions = /\.(woff|woff2|eot|ttf|otf)$/i;
              const scriptExtensions = /\.(vue|js|ts)$/i;
              let assetsPath = assetsDir;

              if (imageExtensions.test(fileName)) {
                assetsPath += '/img';
              } else if (styleExtensions.test(fileName)) {
                assetsPath += '/css';
              } else if (fontExtensions.test(fileName)) {
                assetsPath += '/fonts';
              } else if (scriptExtensions.test(fileName)) {
                assetsPath = '';
              }

              return `${assetsPath}/[name].[hash].[ext]`;
            },
            // manualChunks() {}, // Defining manual chunks is supper tricky, since the context of the single imports is hard to evaluate (if even possible). I eventually decided not to use this method.
          },
        },
      };
    // no default
  }

  return config;
});
