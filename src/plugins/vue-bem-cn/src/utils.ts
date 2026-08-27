/**
 * Checks if the given value is a non empty String.
 */
// any is unavoidable here: this is a runtime type-guard meant to accept genuinely arbitrary input.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isString = (value: any): boolean => value && typeof value === 'string';

/**
 * Checks if the given value is a native JS Object with values.
 */
// any is unavoidable here: this is a runtime type-guard meant to accept genuinely arbitrary input.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPObject = (value: any): boolean =>
  !!(value && typeof value === 'object' && value.constructor === Object && Object.keys(value).length);

/**
 * Checks if the given value is a finite number.
 */
// any is unavoidable here: this is a runtime type-guard meant to accept genuinely arbitrary input.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (value: any): boolean => !Number.isNaN(value) && Number.isFinite(value);

/**
 * Converts the given camelCase String to kebab-case.
 */
export const hyphenate = (value: string): string => value.replaceAll(/\B([A-Z])/g, '-$1').toLowerCase();
