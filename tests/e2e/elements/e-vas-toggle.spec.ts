import { expect, test } from '@playwright/test';

test.describe('e-vas-toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-elements/sg-test-page-vas-toggle');
  });

  test('toggle renders correctly', async ({ page }) => {
    const toggle = page.locator('.e-vas-toggle').first();
    const hiddenInput = page.locator('.e-vas-toggle__input').first();

    await expect(toggle).toBeVisible();
    await expect(hiddenInput).toBeAttached();
  });

  test('toggle switches on click', async ({ page }) => {
    const toggle = page.locator('.e-vas-toggle').first();
    const hiddenInput = page.locator('.e-vas-toggle__input').first();

    const isCheckedBefore = await hiddenInput.isChecked();

    await toggle.click();

    const isCheckedAfter = await hiddenInput.isChecked();

    expect(isCheckedAfter).not.toBe(isCheckedBefore);
  });

  test('toggle keyboard activation', async ({ page }) => {
    const hiddenInput = page.locator('.e-vas-toggle__input').first();

    await hiddenInput.focus();
    await hiddenInput.press('Space');

    await expect(hiddenInput).toBeChecked();
  });

  test('toggle label support', async ({ page }) => {
    const label = page.locator('.e-vas-toggle__label').first();

    if ((await label.count()) > 0) {
      await expect(label).toBeVisible();
    }
  });
});
