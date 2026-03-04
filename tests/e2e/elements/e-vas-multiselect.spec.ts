import { expect, test } from '@playwright/test';

test.describe('e-vas-multiselect', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-elements/sg-test-page-vas-multiselect');
  });

  test('multiselect renders correctly', async ({ page }) => {
    const multiselect = page.locator('.e-vas-multiselect').first();
    const trigger = page.locator('.e-vas-multiselect__field-wrapper').first();

    await expect(multiselect).toBeVisible();
    await expect(trigger).toBeVisible();
  });

  test('multiselect opens on click', async ({ page }) => {
    const trigger = page.locator('.e-vas-multiselect__field-wrapper').first();
    const optionsWrapper = page.locator('.e-vas-multiselect__options-wrapper').first();

    await trigger.click();

    await expect(trigger).toHaveClass(/open/);
    await expect(optionsWrapper).toBeVisible();
  });

  test('multiselect allows multiple selection', async ({ page }) => {
    const trigger = page.locator('.e-vas-multiselect__field-wrapper').first();
    const options = page.locator('.e-vas-multiselect__options-item');

    await trigger.click();

    const firstOption = options.nth(0);
    const secondOption = options.nth(1);

    await firstOption.click();
    await secondOption.click();

    const selectedCount = await page.locator('.e-vas-multiselect__options-item input:checked').count();

    expect(selectedCount).toBeGreaterThanOrEqual(2);
  });

  test('multiselect closes on click outside', async ({ page }) => {
    const trigger = page.locator('.e-vas-multiselect__field-wrapper').first();

    await trigger.click();
    await expect(trigger).toHaveClass(/open/);

    await page.locator('body').click({ position: { x: 0, y: 0 } });

    await expect(trigger).not.toHaveClass(/open/);
  });

  test('disabled multiselect', async ({ page }) => {
    const disabledTrigger = page.locator('.e-vas-multiselect__field-wrapper--disabled').first();

    if ((await disabledTrigger.count()) > 0) {
      await expect(disabledTrigger).toHaveClass(/disabled/);
    }
  });
});
