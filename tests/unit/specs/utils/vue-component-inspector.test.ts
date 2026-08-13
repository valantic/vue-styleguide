import { describe, expect, test } from 'vitest';
import {
  collectStackedInstances,
  findComponentInstance,
  formatCopyText,
  getComponentDisplayName,
  getComponentFilePath,
  resolveComponentAtElement,
} from '../../../../src/utils/vue-component-inspector';

type FakeInstance = {
  type: { name?: string; __name?: string; __file?: string };
  parent?: FakeInstance | null;
  vnode?: { el: unknown };
};

const withVueInstance = (el: Element, instance: FakeInstance): Element => {
  Object.assign(el, { __vueParentComponent: instance });

  return el;
};

describe('findComponentInstance', () => {
  test('returns null for null input', () => {
    expect(findComponentInstance(null)).toBeNull();
  });

  test('returns null when no ancestor has a Vue instance attached', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');

    parent.append(child);

    expect(findComponentInstance(child)).toBeNull();
  });

  test('finds the instance on the element itself', () => {
    const el = withVueInstance(document.createElement('div'), { type: { name: 'c-vas-demo-card' } });

    expect(findComponentInstance(el)?.el).toBe(el);
  });

  test('walks up to the nearest ancestor carrying a Vue instance', () => {
    const root = withVueInstance(document.createElement('div'), { type: { name: 'r-demo-page' } });
    const leaf = document.createElement('span');

    root.append(leaf);

    const found = findComponentInstance(leaf);

    expect(found?.el).toBe(root);
    expect(found?.instance.type.name).toBe('r-demo-page');
  });
});

describe('collectStackedInstances', () => {
  test('returns a single-entry stack when no parent shares the same root element', () => {
    const el = document.createElement('div');
    const instance: FakeInstance = { type: { name: 'c-vas-demo-card' }, parent: null, vnode: { el } };

    expect(collectStackedInstances(instance as never, el)).toEqual([instance]);
  });

  test('collects every layer collapsed onto the same DOM node (e.g. a wrapper around a library component)', () => {
    const el = document.createElement('button');
    const outer: FakeInstance = { type: { name: 'e-button', __file: '/repo/src/elements/e-button.vue' }, parent: null, vnode: { el } };
    const inner: FakeInstance = { type: { name: 'VBtn' }, parent: outer, vnode: { el } };

    expect(collectStackedInstances(inner as never, el)).toEqual([inner, outer]);
  });

  test('stops once a parent renders a different root element', () => {
    const el = document.createElement('button');
    const otherElement = document.createElement('div');
    const outer: FakeInstance = { type: { name: 'r-demo-page' }, parent: null, vnode: { el: otherElement } };
    const inner: FakeInstance = { type: { name: 'VBtn' }, parent: outer, vnode: { el } };

    expect(collectStackedInstances(inner as never, el)).toEqual([inner]);
  });
});

describe('getComponentDisplayName', () => {
  test('prefers the explicit Options API name', () => {
    expect(getComponentDisplayName({ type: { name: 'c-vas-demo-card', __name: 'anon' } } as never)).toBe(
      'c-vas-demo-card',
    );
  });

  test('falls back to the compiler-injected __name', () => {
    expect(getComponentDisplayName({ type: { __name: 'r-demo-page' } } as never)).toBe('r-demo-page');
  });

  test('returns null when neither is present', () => {
    expect(getComponentDisplayName({ type: {} } as never)).toBeNull();
  });
});

describe('getComponentFilePath', () => {
  test('returns null when no __file is present', () => {
    expect(getComponentFilePath({ type: {} } as never)).toBeNull();
  });

  test('trims the absolute path down to the last /src/ segment', () => {
    const file = getComponentFilePath({ type: { __file: '/Users/dev/project/src/components/UserCard.vue' } } as never);

    expect(file).toBe('src/components/UserCard.vue');
  });

  test('returns the raw path when no /src/ marker is found', () => {
    const file = getComponentFilePath({ type: { __file: '/Users/dev/project/UserCard.vue' } } as never);

    expect(file).toBe('/Users/dev/project/UserCard.vue');
  });
});

describe('resolveComponentAtElement', () => {
  test('returns null when nothing resolves', () => {
    expect(resolveComponentAtElement(document.createElement('div'))).toBeNull();
  });

  test('returns null when the matched instance has no resolvable name', () => {
    const el = withVueInstance(document.createElement('div'), { type: {} });

    expect(resolveComponentAtElement(el)).toBeNull();
  });

  test('returns name, file, and the matched element for a plain (non-stacked) component', () => {
    const el = withVueInstance(document.createElement('div'), {
      type: { name: 'c-vas-demo-card', __file: '/repo/src/components/c-vas-demo-card.vue' },
    });

    expect(resolveComponentAtElement(el)).toEqual({
      name: 'c-vas-demo-card',
      file: 'src/components/c-vas-demo-card.vue',
      wraps: null,
      el,
    });
  });

  test('prefers a same-root wrapper with a source file over an inner library component without one', () => {
    const el = document.createElement('button');
    const outer: FakeInstance = { type: { name: 'e-button', __file: '/repo/src/elements/e-button.vue' }, parent: null, vnode: { el } };

    withVueInstance(el, { type: { name: 'VBtn' }, parent: outer, vnode: { el } });

    expect(resolveComponentAtElement(el)).toEqual({
      name: 'e-button',
      file: 'src/elements/e-button.vue',
      wraps: 'VBtn',
      el,
    });
  });

  test('falls back to the outermost layer when nothing in the stack has a source file', () => {
    const el = document.createElement('button');
    const outer: FakeInstance = { type: { name: 'SomeUiKitButton' }, parent: null, vnode: { el } };

    withVueInstance(el, { type: { name: 'VBtn' }, parent: outer, vnode: { el } });

    expect(resolveComponentAtElement(el)).toEqual({
      name: 'SomeUiKitButton',
      file: null,
      wraps: 'VBtn',
      el,
    });
  });
});

describe('formatCopyText', () => {
  test('combines name and file when a file path exists', () => {
    expect(
      formatCopyText({ name: 'UserCard', file: 'src/components/UserCard.vue', wraps: null, el: document.body }),
    ).toBe('UserCard (src/components/UserCard.vue)');
  });

  test('falls back to just the name when no file path exists', () => {
    expect(formatCopyText({ name: 'UserCard', file: null, wraps: null, el: document.body })).toBe('UserCard');
  });

  test('appends the wrapped component when one was substituted in', () => {
    expect(
      formatCopyText({ name: 'e-button', file: 'src/elements/e-button.vue', wraps: 'VBtn', el: document.body }),
    ).toBe('e-button (src/elements/e-button.vue) — wraps VBtn');
  });
});
