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

// Recursion instead of a loop — walks up via parentElement, nearest first.
function collectAncestorElements(el: Element | null): Element[] {
  return el ? [el, ...collectAncestorElements(el.parentElement)] : [];
}

export function findComponentInstance(el: Element | null): { instance: VueInternalInstance; el: Element } | null {
  for (const candidate of collectAncestorElements(el)) {
    // eslint-disable-next-line no-underscore-dangle
    const instance = (candidate as VueInternalElement).__vueParentComponent;

    if (instance?.type) {
      return { instance, el: candidate };
    }
  }

  return null;
}

type ComponentStack = [VueInternalInstance, ...VueInternalInstance[]];

// When a component's template root is itself another component (no wrapping element), both
// instances share the exact same DOM node — Vue only keeps the innermost one on `__vueParentComponent`.
// Walking `instance.parent` while its root element (`vnode.el`) stays the same DOM node recovers
// the full stack of collapsed layers at that spot, ordered innermost (leaf) to outermost.
// Recursion instead of a loop.
function collectStackedInstanceChain(instance: VueInternalInstance, el: Element): ComponentStack {
  if (instance.parent && instance.parent.vnode?.el === el) {
    return [instance, ...collectStackedInstanceChain(instance.parent, el)];
  }

  return [instance];
}

export function collectStackedInstances(instance: VueInternalInstance, el: Element): ComponentStack {
  return collectStackedInstanceChain(instance, el);
}

export function getComponentDisplayName(instance: VueInternalInstance): string | null {
  // eslint-disable-next-line no-underscore-dangle
  return instance.type.name ?? instance.type.__name ?? null;
}

// `__file` is a dev-only absolute filesystem path. Trimming to the last `/src/` segment is a
// best-effort heuristic for a project-relative path. When no such marker is found, this returns
// null rather than the raw absolute path — that path contains the local username/filesystem layout,
// which must never end up in the clipboard text. Callers fall back to the component name instead;
// see formatCopyText().
export function toProjectRelativePath(file: string | null | undefined): string | null {
  if (!file) {
    return null;
  }

  const markerIndex = file.lastIndexOf(SRC_MARKER);

  return markerIndex === -1 ? null : file.slice(markerIndex + 1);
}

export function getComponentFilePath(instance: VueInternalInstance): string | null {
  // eslint-disable-next-line no-underscore-dangle
  return toProjectRelativePath(instance.type.__file);
}

// Prefer the innermost layer in the stack that has a resolvable source file — i.e. skip past
// third-party components (e.g. from Vuetify), which are pre-compiled and never carry one, but
// stop at the first layer that does rather than climbing all the way out to some outer,
// unrelated container that merely happens to also render without a wrapping element.
function pickPreferredInstance(stack: ComponentStack): VueInternalInstance {
  for (const candidate of stack) {
    if (getComponentFilePath(candidate)) {
      return candidate;
    }
  }

  return stack[0];
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

// The clipboard payload is deliberately just one or the other, not a combined "Name (file)"
// string: the file path (project-relative, not the full absolute user path) is the more directly
// actionable reference for an AI coding prompt, and the name is only a fallback for when no file
// is resolvable at all (e.g. a third-party component, or a plain DOM element with no component).
export function formatCopyText(resolved: ResolvedComponent): string {
  return resolved.file ?? resolved.name;
}

// --- Marker-based resolution -------------------------------------------------------------
//
// __vueParentComponent only ever reflects the single deepest component sharing a DOM root.
// It can't see past a nearby generic container (e.g. a Vuetify VCol) to a meaningful ancestor
// elsewhere in the DOM tree — that's a different node entirely, not a collapsed-root situation.
//
// The `vasXRayInspector` plugin (see ../plugins/x-ray-inspector) fixes this by having every
// component mark its own root element via markComponentInstance() when mounted, using a global
// mixin — which also applies to third-party components (Vuetify, etc.), since they're mounted by
// the same app. That gives an accurate, complete marker at every real component boundary, letting
// the breadcrumb walk below build a clean, component-only ancestor chain. __vueParentComponent
// remains as a same-element fallback for when the plugin isn't installed.

export type MarkerEntry = { name: string; file: string | null };

type MarkedElement = Element & { vasComponents?: MarkerEntry[] };

// `file` is the raw, dev-only __file value straight off the component's options — trimmed to a
// project-relative path here (see toProjectRelativePath()) so every caller gets the same
// Leak-free result regardless of where the mark originates.
export function markComponentInstance(el: unknown, name: string | null, file: string | null): void {
  if (!(el instanceof Element) || !name) {
    return;
  }

  const marked = el as MarkedElement;

  marked.vasComponents = [...(marked.vasComponents ?? []), { name, file: toProjectRelativePath(file) }];
}

// Used to detect whether the plugin is actually registered on the running app — check a DOM
// element known to belong to a component that definitely mounted (e.g. the feature toggle's own
// $el): if the plugin ran, that exact element carries at least one marker.
export function hasComponentMarker(el: unknown): boolean {
  return el instanceof Element && Boolean((el as MarkedElement).vasComponents?.length);
}

function pickPreferredMarkerEntry(entries: [MarkerEntry, ...MarkerEntry[]]): MarkerEntry {
  for (const entry of entries) {
    if (entry.file) {
      return entry;
    }
  }

  return entries[0];
}

function resolveMarkedElement(el: Element, entries: [MarkerEntry, ...MarkerEntry[]]): ResolvedComponent {
  const preferred = pickPreferredMarkerEntry(entries);
  const innermost = entries[0];
  const wraps = preferred === innermost ? null : innermost.name;

  return {
    name: preferred.name,
    file: preferred.file,
    wraps: wraps === preferred.name ? null : wraps,
    el,
  };
}

// Walks every ancestor carrying component markers, nearest first — a clean, component-only
// breadcrumb that skips every plain DOM node in between (divs, spans, layout wrappers with no
// matching Vue component of their own). Falls back to a single best-effort entry via
// resolveComponentAtElement() when no marker is found anywhere in the chain, i.e. the
// vasXRayInspector plugin isn't installed on this app.
export function getComponentBreadcrumb(el: Element | null): ResolvedComponent[] {
  const breadcrumb: ResolvedComponent[] = [];

  for (const current of collectAncestorElements(el)) {
    const entries = (current as MarkedElement).vasComponents;

    if (entries && entries.length > 0) {
      breadcrumb.push(resolveMarkedElement(current, entries as [MarkerEntry, ...MarkerEntry[]]));
    }
  }

  if (breadcrumb.length > 0) {
    return breadcrumb;
  }

  const fallback = resolveComponentAtElement(el);

  return fallback ? [fallback] : [];
}
