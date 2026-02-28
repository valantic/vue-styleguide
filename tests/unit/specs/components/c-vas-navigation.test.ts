import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { RouteRecordRaw } from 'vue-router';
import cVasNavigation from '@/components/c-vas-navigation.vue';
import vueBemCn from '@/plugins/vue-bem-cn';

describe('c-vas-navigation', () => {
  const routes: RouteRecordRaw[] = [
    {
      path: '/b',
      name: 'b',
      meta: { title: 'B' },
      redirect: '',
      children: [
        { path: 'sub-b', name: 'sub-b', meta: { title: 'Sub B' }, redirect: '' },
        { path: 'sub-a', name: 'sub-a', meta: { title: 'Sub A' }, redirect: '' },
      ],
    },
    {
      path: '/a',
      name: 'a',
      meta: { title: 'A' },
      redirect: '',
    },
  ];

  test('should sort top-level routes and their children by title', () => {
    const wrapper = mount(cVasNavigation, {
      global: {
        plugins: [vueBemCn],
        stubs: {
          'c-vas-navigation-filter': true,
          'c-vas-navigation-block': true,
        },
      },
      props: {
        routes,
      },
    });

    const filteredRoutes = (wrapper.vm as unknown as { filteredRoutes: RouteRecordRaw[] }).filteredRoutes;

    // Check top-level sorting
    expect(filteredRoutes[0]?.meta?.title).toBe('A');
    expect(filteredRoutes[1]?.meta?.title).toBe('B');

    // Check children sorting
    expect(filteredRoutes[1]?.children?.[0]?.meta?.title).toBe('Sub A');
    expect(filteredRoutes[1]?.children?.[1]?.meta?.title).toBe('Sub B');
  });
});
