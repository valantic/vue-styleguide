import { readFileSync } from 'node:fs';
import { join } from 'node:path/posix';
import { describe, expect, test } from 'vitest';

/**
 * Verifies that both themes declare the same set of `--vas-theme-*` custom properties.
 *
 * A token defined for only one theme resolves to nothing on the other one, which drops the
 * whole declaration using it — e.g. a dropdown ending up with a transparent background
 * instead of its surface color. That failure is invisible until somebody switches the theme,
 * so it is guarded here instead.
 */
const tokensOf = (block: string): string[] =>
  [...block.matchAll(/(--vas-theme-[\w-]+)\s*:/g)].map((match) => match[1] ?? '');

describe('theme tokens — light ↔ dark parity', () => {
  const scssPath = join(import.meta.dirname, '../../../../src/setup/scss/_themes.scss');
  const scssContent = readFileSync(scssPath, 'utf8');

  // The declarations contain `#{…}` interpolations, so the blocks are sliced by their
  // selectors instead of matched by braces.
  const darkStart = scssContent.indexOf('.vas-styleguide-theme-dark');
  const lightBlock = scssContent.slice(scssContent.indexOf('.vas-styleguide-theme-light'), darkStart);
  const darkBlock = scssContent.slice(darkStart);

  const lightTokens = tokensOf(lightBlock);
  const darkTokens = tokensOf(darkBlock);

  // `--vas-theme-border-color-decent` is declared on the dark theme only and referenced
  // nowhere; it is tolerated here rather than silently removed by this test.
  const knownDarkOnly = new Set(['--vas-theme-border-color-decent']);

  test('both theme blocks were found', () => {
    expect(lightTokens.length).toBeGreaterThan(0);
    expect(darkTokens.length).toBeGreaterThan(0);
  });

  test('every light token is also defined for the dark theme', () => {
    expect(lightTokens.filter((token) => !darkTokens.includes(token))).toEqual([]);
  });

  test('every dark token is also defined for the light theme', () => {
    const missing = darkTokens.filter((token) => !darkTokensAllowed(token) && !lightTokens.includes(token));

    expect(missing).toEqual([]);
  });

  function darkTokensAllowed(token: string): boolean {
    return knownDarkOnly.has(token);
  }
});
