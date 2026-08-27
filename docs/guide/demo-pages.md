# Demo pages

## Favorites and Last Opened

The sidebar navigation displays your "Favorites" and "Last 5 Opened" pages at the top.

### Favorites

You can mark any route as a favorite to group it at the top of the navigation. To do so, add
`favorite: true` to the route's `meta` object:

```ts
{
  path: 'my-page',
  name: 'my-page',
  component: () => import('./MyPage.vue'),
  meta: {
    title: 'My Page',
    favorite: true,
  },
}
```

### Last Opened

The styleguide automatically tracks the last 5 pages you've visited during your session. They are
displayed at the top of the navigation for quick access.

## Readme page

Import a default demo page to display the project's `README.md` file.

In your `styleguide/setup/routes.ts` you can add:

```ts
import { styleguideRouterConfig, styleguideTestPages } from '@valantic/vue-styleguide';

export default [
  {
    path: styleguideRouterConfig.rootPath,
    name: 'sg-root',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    redirect: `${styleguideRouterConfig.rootPath}/${styleguideTestPages.readme.path}`,
    meta: {
      title: 'Styleguide',
    },
    children: [styleguideTestPages.readme],
  },
];
```
