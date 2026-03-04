import { expect, test } from '@playwright/test';

test.describe('e-vas-input', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-elements/sg-test-page-vas-input');
  });

  test('input renders correctly', async ({ page }) => {
    const input = page.locator('.e-vas-input__field').first();

    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('name');
  });

  test('input accepts text', async ({ page }) => {
    const input = page.locator('.e-vas-input__field').first();

    await input.fill('test value');

    await expect(input).toHaveValue('test value');
  });

  test('input focus and blur events', async ({ page }) => {
    const input = page.locator('.e-vas-input__field').first();
    const wrapper = page.locator('.e-vas-input').first();

    await input.focus();

    await expect(wrapper).toHaveClass(/focus/);

    await input.blur();

    await expect(wrapper).not.toHaveClass(/focus/);
  });

  test('disabled input', async ({ page }) => {
    const input = page.locator('.e-vas-input__field:disabled').first();

    if ((await input.count()) > 0) {
      await expect(input).toHaveAttribute('disabled', '');
      await expect(input).toBeEditable({ editable: false });
    }
  });

  test('input with placeholder', async ({ page }) => {
    const input = page.locator('.e-vas-input__field[placeholder]').first();

    await expect(input).toHaveAttribute('placeholder');
  });
});
