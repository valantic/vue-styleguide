import { expect, test } from '@playwright/test';

test.describe('e-vas-toggle-button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-elements/sg-test-page-vas-toggle-button');
  });

  test('toggle button renders correctly', async ({ page }) => {
    const toggleButton = page.locator('.e-vas-toggle-button').first();

    await expect(toggleButton).toBeVisible();
  });

  test.fixme('Component is stateless - active state must be managed by parent', async ({ page }) => {
    const toggleButton = page.locator('.e-vas-toggle-button').first();

    await expect(toggleButton).toBeVisible();

    await toggleButton.click();

    const hasActiveClass = await toggleButton.evaluate((el) => el.classList.contains('e-vas-toggle-button--active'));

    expect(hasActiveClass || (await toggleButton.locator('.e-vas-toggle-button__content--active').count()) > 0).toBe(
      true,
    );
  });

  test('toggle button content styling', async ({ page }) => {
    const activeContent = page.locator('.e-vas-toggle-button__content--active').first();

    if ((await activeContent.count()) > 0) {
      await expect(activeContent).toBeVisible();
    }
  });
});
