import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'valantic Vue Styleguide',
  description: 'A pluggable Developer Experience (DX) utility for Vue 3 projects.',
  base: '/vue-styleguide/',
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/installation' },
      { text: 'Features', link: '/features/x-ray-mode' },
      { text: 'Hotkeys', link: '/guide/hotkeys' },
      { text: 'Demo', link: '/demo/', target: '_self' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Setup', link: '/guide/setup' },
          { text: 'Demo pages', link: '/guide/demo-pages' },
          { text: 'Sidebar interface', link: '/guide/interface' },
          { text: 'Hotkeys', link: '/guide/hotkeys' },
          { text: 'Settings', link: '/guide/settings' },
          { text: 'Custom settings', link: '/guide/custom-settings' },
          { text: 'Demo card', link: '/guide/demo-card' },
        ],
      },
      {
        text: 'Features',
        items: [
          { text: 'X-ray mode', link: '/features/x-ray-mode' },
          { text: 'HTML validation', link: '/features/html-validation' },
        ],
      },
      {
        text: 'Contributing',
        items: [{ text: 'Release process', link: '/contributing/release-process' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/valantic/vue-styleguide' }],

    editLink: {
      pattern: 'https://github.com/valantic/vue-styleguide/edit/main/docs/:path',
    },

    search: {
      provider: 'local',
    },
  },
});
