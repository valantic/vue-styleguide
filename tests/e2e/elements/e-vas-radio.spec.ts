import { expect, test } from '@playwright/test';

test.describe('e-vas-radio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-elements/sg-test-page-vas-radio');
  });

  test('radio group renders correctly', async ({ page }) => {
    const radios = page.locator('.e-vas-radio');
    const radioLabels = page.locator('.e-vas-radio__label');

    await expect(radios.first()).toBeVisible();
    await expect(radioLabels.first()).toBeVisible();
  });

  test('radio selection works', async ({ page }) => {
    const secondLabel = page.locator('.e-vas-radio__label').nth(1);

    await secondLabel.click();

    const secondRadio = page.locator('.e-vas-radio__field').nth(1);
    const firstRadio = page.locator('.e-vas-radio__field').first();

    await expect(secondRadio).toBeChecked();
    await expect(firstRadio).not.toBeChecked();
  });

  test('radio keyboard navigation', async ({ page }) => {
    const firstRadio = page.locator('.e-vas-radio__field').first();

    await firstRadio.focus();
    await firstRadio.press('ArrowRight');

    const secondRadio = page.locator('.e-vas-radio__field').nth(1);

    await expect(secondRadio).toBeChecked();
  });

  test('disabled radio', async ({ page }) => {
    const disabledRadio = page.locator('.e-vas-radio__field:disabled').first();

    if ((await disabledRadio.count()) > 0) {
      await expect(disabledRadio).toHaveAttribute('disabled', '');
    }
  });
});
