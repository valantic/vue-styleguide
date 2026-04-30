import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { RouteRecordRaw } from 'vue-router';
import cVasNavigation from '../../../../src/components/c-vas-navigation.vue';
import vueBemCn from '../../../../src/plugins/vue-bem-cn';

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

  test('should sort routes by sortOrder if provided', () => {
    const customRoutes: RouteRecordRaw[] = [
      {
        path: '/b',
        name: 'b',
        meta: { title: 'B', sortOrder: 1 },
        redirect: '',
      },
      {
        path: '/a',
        name: 'a',
        meta: { title: 'A', sortOrder: 2 },
        redirect: '',
      },
      {
        path: '/c',
        name: 'c',
        meta: { title: 'C' }, // No sortOrder, should come after those with sortOrder
        redirect: '',
      },
    ];

    const wrapper = mount(cVasNavigation, {
      global: {
        plugins: [vueBemCn],
        stubs: {
          'c-vas-navigation-filter': true,
          'c-vas-navigation-block': true,
        },
      },
      props: {
        routes: customRoutes,
      },
    });

    const filteredRoutes = (wrapper.vm as unknown as { filteredRoutes: RouteRecordRaw[] }).filteredRoutes;

    expect(filteredRoutes[0]?.meta?.title).toBe('B'); // sortOrder 1
    expect(filteredRoutes[1]?.meta?.title).toBe('A'); // sortOrder 2
    expect(filteredRoutes[2]?.meta?.title).toBe('C'); // No sortOrder
  });
});
