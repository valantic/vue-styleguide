import { expect, test } from '@playwright/test';

test.describe('E2E setup', () => {
  test('loads the styleguide shell', async ({ page }) => {
    // Future auth flows can preload login state via Playwright storageState.
    await page.goto('/sg/test-readme');

    await expect(page.getByTestId('app-shell')).toBeVisible();
    await expect(page.getByTestId('page-content')).toBeVisible();
    await expect(page.getByTestId('nav-main')).toBeVisible();
  });
});
