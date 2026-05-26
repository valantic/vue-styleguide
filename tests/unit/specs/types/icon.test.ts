import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path/posix';
import { describe, expect, test } from 'vitest';

/**
 * Verifies that src/types/icon.d.ts is up-to-date with the SVG files in
 * src/assets/icons/. If this test fails, run `npm run build:icons` to
 * regenerate the type file.
 */
describe('icon types — icon.d.ts covers all SVG assets', () => {
  const iconsDirectory = join(import.meta.dirname, '../../../../src/assets/icons');
  const typeFile = readFileSync(join(import.meta.dirname, '../../../../src/types/icon.d.ts'), 'utf8');

  const svgFiles = readdirSync(iconsDirectory)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => file.replace('.svg', ''));

  for (const iconName of svgFiles) {
    test(`icon.d.ts includes '${iconName}'`, () => {
      expect(typeFile).toContain(`'${iconName}'`);
    });
  }
});
