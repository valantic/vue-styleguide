import { expect, test } from '@playwright/test';

test.describe('e-vas-checkbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-elements/sg-test-page-vas-checkbox');
  });

  test('checkbox renders correctly', async ({ page }) => {
    const checkbox = page.locator('.e-vas-checkbox').first();
    const hiddenInput = page.locator('.e-vas-checkbox__field').first();

    await expect(checkbox).toBeVisible();
    await expect(hiddenInput).toBeAttached();
  });

  test('checkbox toggles on click', async ({ page }) => {
    const checkbox = page.locator('.e-vas-checkbox').first();
    const hiddenInput = page.locator('.e-vas-checkbox__field').first();

    const isCheckedBefore = await hiddenInput.isChecked();

    await checkbox.click();

    const isCheckedAfter = await hiddenInput.isChecked();

    expect(isCheckedAfter).not.toBe(isCheckedBefore);
  });

  test('checkbox keyboard activation', async ({ page }) => {
    const hiddenInput = page.locator('.e-vas-checkbox__field').first();

    await hiddenInput.focus();
    await hiddenInput.press('Space');

    await expect(hiddenInput).toBeChecked();
  });

  test('disabled checkbox', async ({ page }) => {
    const disabledInput = page.locator('.e-vas-checkbox__field:disabled').first();

    if ((await disabledInput.count()) > 0) {
      await expect(disabledInput).toHaveAttribute('disabled', '');
    }
  });
});
