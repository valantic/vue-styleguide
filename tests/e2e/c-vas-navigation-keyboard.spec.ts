import { expect, test } from '@playwright/test';

test.describe('c-vas-navigation keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-components/sg-test-page-navigation');
  });

  test('menu is visible with search input', async ({ page }) => {
    await expect(page.getByTestId('nav-menu')).toBeVisible();

    const searchInput = page.getByTestId('nav-search');

    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'Search …');
  });

  test('search filters navigation items', async ({ page }) => {
    const searchInput = page.getByTestId('nav-search');
    const navItems = page.getByTestId('nav-item');

    // Wait for initial nav items to be visible before counting
    await expect(navItems.first()).toBeVisible();

    const initialCount = await navItems.count();

    await searchInput.fill('components');

    await expect(navItems.first()).toBeVisible();

    const filteredCount = await navItems.count();

    expect(filteredCount).toBeLessThanOrEqual(initialCount);
    expect(filteredCount).toBeGreaterThan(0);

    // Verify "Elements" is not in the filtered results
    const allItemsText = await navItems.allTextContents();
    const hasElements = allItemsText.some((text) => text.includes('Elements'));

    expect(hasElements).toBe(false);
  });

  test('arrow keys navigate menu items', async ({ page }) => {
    const searchInput = page.getByTestId('nav-search');
    const selectedItem = page.getByTestId('nav-item-selected');

    await searchInput.focus();

    await searchInput.press('ArrowDown');

    await expect(selectedItem).toBeVisible();

    const firstSelectedText = (await selectedItem.textContent()) ?? '';

    await searchInput.press('ArrowDown');

    const secondSelectedText = (await selectedItem.textContent()) ?? '';

    expect(firstSelectedText).not.toBe(secondSelectedText);

    await searchInput.press('ArrowUp');

    await expect(selectedItem).toHaveText(firstSelectedText);
  });
});
