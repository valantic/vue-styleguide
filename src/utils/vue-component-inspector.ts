// Vue attaches `__vueParentComponent` to DOM elements at runtime — the same undocumented internal
// that Vue Devtools and vue-test-utils rely on to map a DOM node back to its component instance.
type VueInternalComponentType = {
  name?: string;
  __name?: string;
  __file?: string;
};

type VueInternalInstance = {
  type: VueInternalComponentType;
};

type VueInternalElement = Element & {
  __vueParentComponent?: VueInternalInstance;
};

export type ResolvedComponent = {
  name: string;
  file: string | null;
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

export function resolveComponentAtElement(el: Element | null): ResolvedComponent | null {
  const found = findComponentInstance(el);

  if (!found) {
    return null;
  }

  const name = getComponentDisplayName(found.instance);

  if (!name) {
    return null;
  }

  return {
    name,
    file: getComponentFilePath(found.instance),
    el: found.el,
  };
}

export function formatCopyText(resolved: ResolvedComponent): string {
  return resolved.file ? `${resolved.name} (${resolved.file})` : resolved.name;
}
