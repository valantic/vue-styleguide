import { describe, expect, test } from 'vitest';
import {
  findComponentInstance,
  formatCopyText,
  getComponentDisplayName,
  getComponentFilePath,
  resolveComponentAtElement,
} from '../../../../src/utils/vue-component-inspector';

type FakeInstance = { type: { name?: string; __name?: string; __file?: string } };

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

describe('getComponentDisplayName', () => {
  test('prefers the explicit Options API name', () => {
    expect(getComponentDisplayName({ type: { name: 'c-vas-demo-card', __name: 'anon' } })).toBe('c-vas-demo-card');
  });

  test('falls back to the compiler-injected __name', () => {
    expect(getComponentDisplayName({ type: { __name: 'r-demo-page' } })).toBe('r-demo-page');
  });

  test('returns null when neither is present', () => {
    expect(getComponentDisplayName({ type: {} })).toBeNull();
  });
});

describe('getComponentFilePath', () => {
  test('returns null when no __file is present', () => {
    expect(getComponentFilePath({ type: {} })).toBeNull();
  });

  test('trims the absolute path down to the last /src/ segment', () => {
    const file = getComponentFilePath({ type: { __file: '/Users/dev/project/src/components/UserCard.vue' } });

    expect(file).toBe('src/components/UserCard.vue');
  });

  test('returns the raw path when no /src/ marker is found', () => {
    const file = getComponentFilePath({ type: { __file: '/Users/dev/project/UserCard.vue' } });

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

  test('returns name, file, and the matched element', () => {
    const el = withVueInstance(document.createElement('div'), {
      type: { name: 'c-vas-demo-card', __file: '/repo/src/components/c-vas-demo-card.vue' },
    });

    expect(resolveComponentAtElement(el)).toEqual({
      name: 'c-vas-demo-card',
      file: 'src/components/c-vas-demo-card.vue',
      el,
    });
  });
});

describe('formatCopyText', () => {
  test('combines name and file when a file path exists', () => {
    expect(formatCopyText({ name: 'UserCard', file: 'src/components/UserCard.vue', el: document.body })).toBe(
      'UserCard (src/components/UserCard.vue)',
    );
  });

  test('falls back to just the name when no file path exists', () => {
    expect(formatCopyText({ name: 'UserCard', file: null, el: document.body })).toBe('UserCard');
  });
});
