import { describe, expect, test } from 'vitest';
import {
  collectStackedInstances,
  findComponentInstance,
  formatCopyText,
  getComponentBreadcrumb,
  getComponentDisplayName,
  getComponentFilePath,
  hasComponentMarker,
  markComponentInstance,
  resolveComponentAtElement,
  toProjectRelativePath,
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

  test('returns null when no /src/ marker is found, rather than leaking the absolute path', () => {
    const file = getComponentFilePath({ type: { __file: '/Users/dev/project/UserCard.vue' } } as never);

    expect(file).toBeNull();
  });
});

describe('toProjectRelativePath', () => {
  test('returns null for a nullish input', () => {
    expect(toProjectRelativePath(null)).toBeNull();
    // eslint-disable-next-line unicorn/no-useless-undefined -- exercising the undefined branch of the union type
    expect(toProjectRelativePath(undefined)).toBeNull();
  });

  test('trims an absolute path down to the last /src/ segment', () => {
    expect(toProjectRelativePath('/Users/dev/project/src/components/UserCard.vue')).toBe(
      'src/components/UserCard.vue',
    );
  });

  test('returns null (never the raw absolute path) when no /src/ marker is found', () => {
    expect(toProjectRelativePath('/Users/dev/project/UserCard.vue')).toBeNull();
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

  test('falls back to the innermost layer when nothing in the stack has a source file', () => {
    const el = document.createElement('button');
    const outer: FakeInstance = { type: { name: 'SomeUiKitButton' }, parent: null, vnode: { el } };

    withVueInstance(el, { type: { name: 'VBtn' }, parent: outer, vnode: { el } });

    expect(resolveComponentAtElement(el)).toEqual({
      name: 'VBtn',
      file: null,
      wraps: null,
      el,
    });
  });

  test('stops at the first same-root layer with a source file, not the outermost one', () => {
    // Regression test: a deep stack of consumer-owned wrappers (e.g. AppShell > Section > e-button)
    // all collapsed onto the same DOM node used to resolve to the outermost one (AppShell) instead
    // of the most specific, actually-relevant one (e-button).
    const el = document.createElement('button');
    const appShell: FakeInstance = { type: { name: 'AppShell', __file: '/repo/src/layouts/AppShell.vue' }, parent: null, vnode: { el } };
    const eButton: FakeInstance = {
      type: { name: 'e-button', __file: '/repo/src/elements/e-button.vue' },
      parent: appShell,
      vnode: { el },
    };

    withVueInstance(el, { type: { name: 'VBtn' }, parent: eButton, vnode: { el } });

    expect(resolveComponentAtElement(el)).toEqual({
      name: 'e-button',
      file: 'src/elements/e-button.vue',
      wraps: 'VBtn',
      el,
    });
  });
});

describe('markComponentInstance', () => {
  test('does nothing for a non-Element target', () => {
    const fakeElement = {};

    markComponentInstance(fakeElement, 'e-button', '/repo/src/elements/e-button.vue');

    expect(hasComponentMarker(fakeElement)).toBe(false);
  });

  test('does nothing when name is null', () => {
    const el = document.createElement('div');

    markComponentInstance(el, null, '/repo/src/elements/e-button.vue');

    expect(hasComponentMarker(el)).toBe(false);
  });

  test('accumulates multiple marks on the same element instead of overwriting', () => {
    const el = document.createElement('button');

    markComponentInstance(el, 'VBtn', null);
    markComponentInstance(el, 'e-button', '/repo/src/elements/e-button.vue');

    expect(hasComponentMarker(el)).toBe(true);
  });

  test('trims the raw absolute __file path to a project-relative one, never storing it as-is', () => {
    const el = document.createElement('div');

    markComponentInstance(el, 'c-vas-demo-card', '/Users/dev/project/src/components/c-vas-demo-card.vue');

    expect(getComponentBreadcrumb(el)).toEqual([
      { name: 'c-vas-demo-card', file: 'src/components/c-vas-demo-card.vue', wraps: null, el },
    ]);
  });

  test('drops the file entirely (falls back to name-only) when no /src/ marker is found', () => {
    const el = document.createElement('div');

    markComponentInstance(el, 'c-vas-demo-card', '/Users/dev/project/c-vas-demo-card.vue');

    expect(getComponentBreadcrumb(el)).toEqual([{ name: 'c-vas-demo-card', file: null, wraps: null, el }]);
  });
});

describe('hasComponentMarker', () => {
  test('returns false for a plain element with no marks', () => {
    expect(hasComponentMarker(document.createElement('div'))).toBe(false);
  });

  test('returns false for a non-Element value', () => {
    expect(hasComponentMarker(null)).toBe(false);
  });

  test('returns true once the element has been marked', () => {
    const el = document.createElement('div');

    markComponentInstance(el, 'c-vas-demo-card', '/repo/src/components/c-vas-demo-card.vue');

    expect(hasComponentMarker(el)).toBe(true);
  });
});

describe('getComponentBreadcrumb', () => {
  test('returns an empty array when nothing resolves at all', () => {
    expect(getComponentBreadcrumb(document.createElement('div'))).toEqual([]);
  });

  test('builds a component-only chain, nearest first, skipping unmarked DOM nodes in between', () => {
    const card = document.createElement('div');
    const wrapper = document.createElement('div'); // plain DOM node, e.g. a layout <div> — no marker
    const button = document.createElement('button');

    markComponentInstance(card, 'ProductCard', '/repo/src/components/ProductCard.vue');
    markComponentInstance(button, 'e-button', '/repo/src/elements/e-button.vue');

    card.append(wrapper);
    wrapper.append(button);

    const breadcrumb = getComponentBreadcrumb(button);

    expect(breadcrumb).toEqual([
      { name: 'e-button', file: 'src/elements/e-button.vue', wraps: null, el: button },
      { name: 'ProductCard', file: 'src/components/ProductCard.vue', wraps: null, el: card },
    ]);
  });

  test('prefers the innermost marked layer with a file when several stack on the same node', () => {
    const el = document.createElement('button');

    markComponentInstance(el, 'VBtn', null);
    markComponentInstance(el, 'e-button', '/repo/src/elements/e-button.vue');

    expect(getComponentBreadcrumb(el)).toEqual([
      { name: 'e-button', file: 'src/elements/e-button.vue', wraps: 'VBtn', el },
    ]);
  });

  test('falls back to the __vueParentComponent-based resolution when no marker exists anywhere', () => {
    const el = withVueInstance(document.createElement('div'), {
      type: { name: 'c-vas-demo-card', __file: '/repo/src/components/c-vas-demo-card.vue' },
    });

    expect(getComponentBreadcrumb(el)).toEqual([
      { name: 'c-vas-demo-card', file: 'src/components/c-vas-demo-card.vue', wraps: null, el },
    ]);
  });
});

describe('formatCopyText', () => {
  test('prefers the file path over the name when a file is resolvable', () => {
    expect(
      formatCopyText({ name: 'UserCard', file: 'src/components/UserCard.vue', wraps: null, el: document.body }),
    ).toBe('src/components/UserCard.vue');
  });

  test('falls back to the bare name when no file path exists', () => {
    expect(formatCopyText({ name: 'UserCard', file: null, wraps: null, el: document.body })).toBe('UserCard');
  });

  test('ignores wraps entirely — the copy payload is always exactly one of file or name', () => {
    expect(
      formatCopyText({ name: 'e-button', file: 'src/elements/e-button.vue', wraps: 'VBtn', el: document.body }),
    ).toBe('src/elements/e-button.vue');
  });
});
