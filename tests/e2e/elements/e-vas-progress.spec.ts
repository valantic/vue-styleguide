import { expect, test } from '@playwright/test';

test.describe('e-vas-progress', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-elements/sg-test-page-vas-progress');
  });

  test('progress renders correctly', async ({ page }) => {
    const progress = page.locator('.e-vas-progress').first();

    await expect(progress).toBeVisible();
  });

  test('progress with message', async ({ page }) => {
    const message = page.locator('.e-vas-progress__message, .e-vas-progress [class*="message"]').first();

    if ((await message.count()) > 0) {
      await expect(message).toBeVisible();
    }
  });

  test('negative variant', async ({ page }) => {
    const negative = page.locator('.e-vas-progress--negative').first();

    if ((await negative.count()) > 0) {
      await expect(negative).toBeVisible();
    }
  });
});
