# Test Plan: `c-vas-navigation` Keyboard Navigation

**Target:** `tests/e2e/c-vas-navigation-keyboard.spec.ts`  
**Seed:** `tests/e2e/seed.spec.ts`  
**Page:** `http://127.0.0.1:4173/sg-components/sg-test-page-navigation`

## Test Structure

```typescript
import { expect, test } from '@playwright/test';

test.describe('c-vas-navigation keyboard navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sg-components/sg-test-page-navigation');
  });
```

## Scenario 1: Menu is visible

```typescript
test('menu is visible with search input', async ({ page }) => {
  await expect(page.getByTestId('nav-menu')).toBeVisible();

  const searchInput = page.getByTestId('nav-search');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toHaveAttribute('placeholder', 'Search …');
});
```

## Scenario 2: Search filters the menu

```typescript
test('search filters navigation items', async ({ page }) => {
  const searchInput = page.getByTestId('nav-search');
  const navItems = page.getByTestId('nav-item');

  const initialCount = await navItems.count();

  await searchInput.fill('components');

  await expect(navItems.first()).toBeVisible();

  const filteredCount = await navItems.count();
  expect(filteredCount).toBeLessThanOrEqual(initialCount);
  expect(filteredCount).toBeGreaterThan(0);
});
```

## Scenario 3: ArrowDown/ArrowUp navigation

```typescript
test('arrow keys navigate menu items', async ({ page }) => {
  const searchInput = page.getByTestId('nav-search');
  const selectedItem = page.getByTestId('nav-item-selected');

  await searchInput.focus();

  await searchInput.press('ArrowDown');

  await expect(selectedItem).toBeVisible();

  const firstSelectedText = await selectedItem.textContent();

  await searchInput.press('ArrowDown');

  const secondSelectedText = await selectedItem.textContent();
  expect(firstSelectedText).not.toBe(secondSelectedText);

  await searchInput.press('ArrowUp');

  await expect(selectedItem).toHaveText(firstSelectedText);
});
```

## Test IDs Used

| Element        | Test ID             |
| -------------- | ------------------- |
| Menu container | `nav-menu`          |
| Search input   | `nav-search`        |
| Nav items      | `nav-item`          |
| Selected item  | `nav-item-selected` |

## Notes

- Uses Playwright's `expect().toBeVisible()` for robust assertions
- No hard-coded titles or random child element references
- No `networkidle` or fixed sleeps
- Follows existing seed test patterns (`test.describe`, `async ({ page })`)
