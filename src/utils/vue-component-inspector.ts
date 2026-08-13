// Vue attaches `__vueParentComponent` to DOM elements at runtime — the same undocumented internal
// that Vue Devtools and vue-test-utils rely on to map a DOM node back to its component instance.
type VueInternalComponentType = {
  name?: string;
  __name?: string;
  __file?: string;
};

type VueInternalInstance = {
  type: VueInternalComponentType;
  parent: VueInternalInstance | null;
  vnode: { el: unknown };
};

type VueInternalElement = Element & {
  __vueParentComponent?: VueInternalInstance;
};

export type ResolvedComponent = {
  name: string;
  file: string | null;
  // Set when the reported component is a wrapper we substituted in for a same-root child
  // (e.g. a third-party component with no source file) — see resolveComponentAtElement.
  wraps: string | null;
  el: Element;
};

const SRC_MARKER = '/src/';

export function findComponentInstance(el: Element | null): { instance: VueInternalInstance; el: Element } | null {
  let current = el;

  while (current) {
    // eslint-disable-next-line no-underscore-dangle
    const instance = (current as VueInternalElement).__vueParentComponent;

    if (instance?.type) {
      return { instance, el: current };
    }

    current = current.parentElement;
  }

  return null;
}

type ComponentStack = [VueInternalInstance, ...VueInternalInstance[]];

// When a component's template root is itself another component (no wrapping element), both
// instances share the exact same DOM node — Vue only keeps the innermost one on `__vueParentComponent`.
// Walking `instance.parent` while its root element (`vnode.el`) stays the same DOM node recovers
// the full stack of collapsed layers at that spot, ordered innermost (leaf) to outermost.
export function collectStackedInstances(instance: VueInternalInstance, el: Element): ComponentStack {
  const stack: ComponentStack = [instance];
  let current = instance;

  while (current.parent && current.parent.vnode?.el === el) {
    current = current.parent;
    stack.push(current);
  }

  return stack;
}

export function getComponentDisplayName(instance: VueInternalInstance): string | null {
  // eslint-disable-next-line no-underscore-dangle
  return instance.type.name ?? instance.type.__name ?? null;
}

// `__file` is a dev-only absolute filesystem path. Trimming to the last `/src/` segment is a
// best-effort heuristic for a project-relative path — it won't be accurate for projects that
// don't root their source in a `src/` folder.
export function getComponentFilePath(instance: VueInternalInstance): string | null {
  // eslint-disable-next-line no-underscore-dangle
  const file = instance.type.__file;

  if (!file) {
    return null;
  }

  const markerIndex = file.lastIndexOf(SRC_MARKER);

  return markerIndex === -1 ? file : file.slice(markerIndex + 1);
}

// Prefer the outermost layer in the stack that has a resolvable source file. Third-party
// components (e.g. from Vuetify) are pre-compiled and never carry one, so this naturally
// skips past them to surface the consumer's own wrapping component instead.
function pickPreferredInstance(stack: ComponentStack): VueInternalInstance {
  const outerToInner = [...stack].reverse();

  for (const candidate of outerToInner) {
    if (getComponentFilePath(candidate)) {
      return candidate;
    }
  }

  // Array.prototype.at() isn't in this project's configured TS lib target — index access is
  // equivalent here since `stack` is always non-empty.
  // eslint-disable-next-line unicorn/prefer-at
  return stack[stack.length - 1] ?? stack[0];
}

export function resolveComponentAtElement(el: Element | null): ResolvedComponent | null {
  const found = findComponentInstance(el);

  if (!found) {
    return null;
  }

  const stack = collectStackedInstances(found.instance, found.el);
  const preferred = pickPreferredInstance(stack);
  const name = getComponentDisplayName(preferred);

  if (!name) {
    return null;
  }

  const innermost = stack[0];
  const wraps = preferred === innermost ? null : getComponentDisplayName(innermost);

  return {
    name,
    file: getComponentFilePath(preferred),
    wraps: wraps === name ? null : wraps,
    el: found.el,
  };
}

export function formatCopyText(resolved: ResolvedComponent): string {
  const base = resolved.file ? `${resolved.name} (${resolved.file})` : resolved.name;

  return resolved.wraps ? `${base} — wraps ${resolved.wraps}` : base;
}
