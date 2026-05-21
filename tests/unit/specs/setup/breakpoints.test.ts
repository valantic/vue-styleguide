import { readFileSync } from 'node:fs';
import { join } from 'node:path/posix';
import { describe, expect, test } from 'vitest';
import { BREAKPOINTS } from '../../../../src/setup/breakpoints';

/**
 * Verifies that the SCSS breakpoint map in _variables.scss stays in sync with
 * the TypeScript BREAKPOINTS constant. If this test fails, update _variables.scss
 * to match src/setup/breakpoints.ts (the single source of truth).
 */
describe('breakpoints sync — TS ↔ SCSS', () => {
  const scssPath = join(import.meta.dirname, '../../../../src/setup/scss/_variables.scss');
  const scssContent = readFileSync(scssPath, 'utf8');

  for (const [name, value] of Object.entries(BREAKPOINTS)) {
    test(`breakpoint "${name}" matches SCSS (${value}px)`, () => {
      if (value === 0) {
        expect(scssContent).toMatch(new RegExp(String.raw`${name}:\s*0`));
      } else {
        expect(scssContent).toContain(`${name}: ${value}px`);
      }
    });
  }
});
