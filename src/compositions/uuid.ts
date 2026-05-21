/**
 * Module-level counter. This is intentionally browser-only — the library is
 * loaded exclusively in DEV mode so SSR request isolation is not a concern.
 */
let globalUuid = 0;

export type Uuid = {
  uuid: number;
};

/**
 * Returns a unique integer ID for each component instance that mixes this in.
 * Use it to generate stable `id` attributes for form elements and their labels.
 *
 * @mixin
 */
export default (): Uuid => {
  globalUuid += 1;

  return {
    uuid: globalUuid,
  };
};
