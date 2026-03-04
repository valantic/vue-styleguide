import { expect, test } from '@playwright/test';

test.describe('e-vas-icon', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-elements/sg-test-page-icons');
  });

  test('icon renders correctly', async ({ page }) => {
    const icon = page.locator('.e-vas-icon').first();

    await expect(icon).toBeAttached();
    await expect(icon).toBeVisible();
  });

  test('icon has correct accessibility', async ({ page }) => {
    const icon = page.locator('.e-vas-icon').first();

    const ariaHidden = await icon.getAttribute('aria-hidden');
    const hasImgWithAlt = await icon.locator('img[alt]').count();

    if ((await icon.locator('img').count()) > 0) {
      expect(hasImgWithAlt).toBeGreaterThan(0);
    } else {
      expect(ariaHidden).toBeTruthy();
    }
  });
});
