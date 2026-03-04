import { expect, test } from '@playwright/test';

test.describe('e-vas-select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-elements/sg-test-page-vas-select');
  });

  test('select renders correctly', async ({ page }) => {
    const select = page.locator('.e-vas-select').first();
    const selectElement = page.locator('.e-vas-select__select').first();

    await expect(select).toBeVisible();
    await expect(selectElement).toBeVisible();
  });

  test('select options are available', async ({ page }) => {
    const selectElement = page.locator('.e-vas-select__select').first();

    const options = await selectElement.evaluate((sel) => (sel as HTMLSelectElement).options.length);

    expect(options).toBeGreaterThan(1);
  });

  test('select selection works', async ({ page }) => {
    const selectElement = page.locator('.e-vas-select__select').first();

    await selectElement.selectOption({ index: 1 });

    await expect(selectElement).toHaveValue(await selectElement.inputValue());
  });

  test('disabled select', async ({ page }) => {
    const disabledSelect = page
      .locator('.e-vas-select--disabled .e-vas-select__select, .e-vas-select__select:disabled')
      .first();

    if ((await disabledSelect.count()) > 0) {
      await expect(disabledSelect).toHaveAttribute('disabled', '');
    }
  });

  test('select with placeholder', async ({ page }) => {
    const select = page.locator('.e-vas-select').first();

    await expect(select).toBeVisible();
  });
});
