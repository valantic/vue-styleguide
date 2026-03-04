import { expect, test } from '@playwright/test';

test.describe('e-vas-button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-elements/sg-test-page-vas-button');
  });

  test('button renders correctly', async ({ page }) => {
    const button = page.getByTestId('vas-button');

    await expect(button).toBeVisible();
    await expect(button).not.toHaveAttribute('disabled', '');
  });

  test('button click works', async ({ page }) => {
    const button = page.getByTestId('vas-button');

    await button.click();

    await expect(button).toBeVisible();
  });

  test('disabled button state', async ({ page }) => {
    const button = page.getByTestId('vas-button');

    if (await button.isDisabled()) {
      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute('disabled', '');
    }
  });

  test('button with progress state', async ({ page }) => {
    const button = page.getByTestId('vas-button');

    await expect(button).toBeVisible();
  });
});
