# Elements Test ID Hardening Plan

**Goal:** Enforce `data-testid`-based E2E selectors for all Vue elements in `src/elements/*.vue`  
**Output:** `specs/elements/elements-testid-hardening-plan.md`

---

## 1. Inventory: Existing Tests & Class Selectors

### Test Files (10)

| Test File                     | # Tests | Class Selectors Used                                                                                                                                                                |
| ----------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `e-vas-button.spec.ts`        | 4       | `.e-vas-button`, `.e-vas-button--disabled`, `.e-vas-button[disabled]`, `.e-vas-button--progress`                                                                                    |
| `e-vas-input.spec.ts`         | 5       | `.e-vas-input`, `.e-vas-input__field`, `.e-vas-input__field:disabled`                                                                                                               |
| `e-vas-select.spec.ts`        | 5       | `.e-vas-select`, `.e-vas-select__select`, `.e-vas-select--disabled`, `.e-vas-select__select:disabled`                                                                               |
| `e-vas-checkbox.spec.ts`      | 4       | `.e-vas-checkbox`, `.e-vas-checkbox__field`, `.e-vas-checkbox__field:disabled`                                                                                                      |
| `e-vas-radio.spec.ts`         | 4       | `.e-vas-radio`, `.e-vas-radio__label`, `.e-vas-radio__field`, `.e-vas-radio__field:disabled`                                                                                        |
| `e-vas-toggle.spec.ts`        | 4       | `.e-vas-toggle`, `.e-vas-toggle__input`, `.e-vas-toggle__label`                                                                                                                     |
| `e-vas-toggle-button.spec.ts` | 3       | `.e-vas-toggle-button`, `.e-vas-toggle-button--active`, `.e-vas-toggle-button__content--active`                                                                                     |
| `e-vas-icon.spec.ts`          | 2       | `.e-vas-icon`                                                                                                                                                                       |
| `e-vas-progress.spec.ts`      | 3       | `.e-vas-progress`, `.e-vas-progress__message`, `.e-vas-progress--negative`                                                                                                          |
| `e-vas-multiselect.spec.ts`   | 5       | `.e-vas-multiselect`, `.e-vas-multiselect__field-wrapper`, `.e-vas-multiselect__options-wrapper`, `.e-vas-multiselect__options-item`, `.e-vas-multiselect__field-wrapper--disabled` |

**Total unique class selectors:** 28  
**Total test scenarios:** 39

---

## 2. Naming Convention

### Pattern: `{component-name}-{element-role}`

| Component           | Base ID             | Notes        |
| ------------------- | ------------------- | ------------ |
| e-vas-button        | `vas-button`        | Base element |
| e-vas-input         | `vas-input`         | Base element |
| e-vas-select        | `vas-select`        | Base element |
| e-vas-checkbox      | `vas-checkbox`      | Base element |
| e-vas-radio         | `vas-radio`         | Base element |
| e-vas-toggle        | `vas-toggle`        | Base element |
| e-vas-toggle-button | `vas-toggle-button` | Base element |
| e-vas-icon          | `vas-icon`          | Base element |
| e-vas-progress      | `vas-progress`      | Base element |
| e-vas-multiselect   | `vas-multiselect`   | Base element |

### Modifier Suffixes

| Modifier       | Suffix               | Example                   |
| -------------- | -------------------- | ------------------------- |
| Field/Input    | `-field`             | `vas-input-field`         |
| Label          | `-label`             | `vas-checkbox-label`      |
| Wrapper        | `-wrapper`           | `vas-multiselect-wrapper` |
| Options        | `-options`           | `vas-multiselect-options` |
| Option Item    | `-option`            | `vas-multiselect-option`  |
| Message        | `-message`           | `vas-progress-message`    |
| Disabled state | (no suffix, use CSS) | N/A                       |
| Active state   | (no suffix, use CSS) | N/A                       |

---

## 3. Component File Changes (data-testid additions)

### 3.1 e-vas-button.vue

| Current Selector | New testid   | Element      |
| ---------------- | ------------ | ------------ |
| `.e-vas-button`  | `vas-button` | Root element |

### 3.2 e-vas-input.vue

| Current Selector      | New testid        | Element       |
| --------------------- | ----------------- | ------------- |
| `.e-vas-input`        | `vas-input`       | Root wrapper  |
| `.e-vas-input__field` | `vas-input-field` | Input element |

### 3.3 e-vas-select.vue

| Current Selector        | New testid         | Element        |
| ----------------------- | ------------------ | -------------- |
| `.e-vas-select`         | `vas-select`       | Root wrapper   |
| `.e-vas-select__select` | `vas-select-field` | Select element |

### 3.4 e-vas-checkbox.vue

| Current Selector             | New testid               | Element          |
| ---------------------------- | ------------------------ | ---------------- |
| `.e-vas-checkbox`            | `vas-checkbox`           | Root wrapper     |
| `.e-vas-checkbox__field`     | `vas-checkbox-field`     | Hidden input     |
| `.e-vas-checkbox__indicator` | `vas-checkbox-indicator` | Visual indicator |

### 3.5 e-vas-radio.vue

| Current Selector      | New testid        | Element       |
| --------------------- | ----------------- | ------------- |
| `.e-vas-radio`        | `vas-radio`       | Root wrapper  |
| `.e-vas-radio__field` | `vas-radio-field` | Hidden input  |
| `.e-vas-radio__label` | `vas-radio-label` | Label element |

### 3.6 e-vas-toggle.vue

| Current Selector       | New testid         | Element         |
| ---------------------- | ------------------ | --------------- |
| `.e-vas-toggle`        | `vas-toggle`       | Root wrapper    |
| `.e-vas-toggle__input` | `vas-toggle-field` | Hidden checkbox |

### 3.7 e-vas-toggle-button.vue

| Current Selector       | New testid          | Element      |
| ---------------------- | ------------------- | ------------ |
| `.e-vas-toggle-button` | `vas-toggle-button` | Root element |

### 3.8 e-vas-icon.vue

| Current Selector | New testid | Element                   |
| ---------------- | ---------- | ------------------------- |
| `.e-vas-icon`    | `vas-icon` | Root element (svg or img) |

### 3.9 e-vas-progress.vue

| Current Selector  | New testid     | Element      |
| ----------------- | -------------- | ------------ |
| `.e-vas-progress` | `vas-progress` | Root wrapper |

### 3.10 e-vas-multiselect.vue

| Current Selector                      | New testid                | Element            |
| ------------------------------------- | ------------------------- | ------------------ |
| `.e-vas-multiselect`                  | `vas-multiselect`         | Root wrapper       |
| `.e-vas-multiselect__field-wrapper`   | `vas-multiselect-trigger` | Trigger button     |
| `.e-vas-multiselect__options-wrapper` | `vas-multiselect-options` | Dropdown container |
| `.e-vas-multiselect__options-item`    | `vas-multiselect-option`  | Option item        |

---

## 4. Test Migration: Selector Mapping

### 4.1 e-vas-button.spec.ts

| Old Selector                                       | New Selector                                            |
| -------------------------------------------------- | ------------------------------------------------------- |
| `.e-vas-button`                                    | `getByTestId('vas-button')`                             |
| `.e-vas-button--disabled, .e-vas-button[disabled]` | `getByTestId('vas-button')` + `.isDisabled()`           |
| `.e-vas-button--progress`                          | `getByTestId('vas-button')` + `toHaveClass(/progress/)` |

### 4.2 e-vas-input.spec.ts

| Old Selector                   | New Selector                                       |
| ------------------------------ | -------------------------------------------------- |
| `.e-vas-input`                 | `getByTestId('vas-input')`                         |
| `.e-vas-input__field`          | `getByTestId('vas-input-field')`                   |
| `.e-vas-input__field:disabled` | `getByTestId('vas-input-field')` + `.isDisabled()` |

### 4.3 e-vas-select.spec.ts

| Old Selector              | New Selector                                             |
| ------------------------- | -------------------------------------------------------- |
| `.e-vas-select`           | `getByTestId('vas-select')`                              |
| `.e-vas-select__select`   | `getByTestId('vas-select-field')`                        |
| `.e-vas-select--disabled` | `getByTestId('vas-select')` + `.toHaveClass(/disabled/)` |

### 4.4 e-vas-checkbox.spec.ts

| Old Selector                      | New Selector                                          |
| --------------------------------- | ----------------------------------------------------- |
| `.e-vas-checkbox`                 | `getByTestId('vas-checkbox')`                         |
| `.e-vas-checkbox__field`          | `getByTestId('vas-checkbox-field')`                   |
| `.e-vas-checkbox__field:disabled` | `getByTestId('vas-checkbox-field')` + `.isDisabled()` |

### 4.5 e-vas-radio.spec.ts

| Old Selector          | New Selector                                   |
| --------------------- | ---------------------------------------------- |
| `.e-vas-radio`        | `getByTestId('vas-radio')`                     |
| `.e-vas-radio__field` | `getByTestId('vas-radio-field')`               |
| `.e-vas-radio__label` | Use `getByTestId('vas-radio-field')` + locator |

### 4.6 e-vas-toggle.spec.ts

| Old Selector           | New Selector                      |
| ---------------------- | --------------------------------- |
| `.e-vas-toggle`        | `getByTestId('vas-toggle')`       |
| `.e-vas-toggle__input` | `getByTestId('vas-toggle-field')` |

### 4.7 e-vas-toggle-button.spec.ts

| Old Selector           | New Selector                       |
| ---------------------- | ---------------------------------- |
| `.e-vas-toggle-button` | `getByTestId('vas-toggle-button')` |

### 4.8 e-vas-icon.spec.ts

| Old Selector  | New Selector              |
| ------------- | ------------------------- |
| `.e-vas-icon` | `getByTestId('vas-icon')` |

### 4.9 e-vas-progress.spec.ts

| Old Selector      | New Selector                  |
| ----------------- | ----------------------------- |
| `.e-vas-progress` | `getByTestId('vas-progress')` |

### 4.10 e-vas-multiselect.spec.ts

| Old Selector                          | New Selector                             |
| ------------------------------------- | ---------------------------------------- |
| `.e-vas-multiselect`                  | `getByTestId('vas-multiselect')`         |
| `.e-vas-multiselect__field-wrapper`   | `getByTestId('vas-multiselect-trigger')` |
| `.e-vas-multiselect__options-wrapper` | `getByTestId('vas-multiselect-options')` |
| `.e-vas-multiselect__options-item`    | `getByTestId('vas-multiselect-option')`  |

---

## 5. Rollout Order

### Phase 1: Low-risk components (no state complexity)

1. **e-vas-icon** - Simple render-only component
2. **e-vas-progress** - Simple render-only component
3. **e-vas-button** - Stateless, click-only

### Phase 2: Form input components

4. **e-vas-input** - Single input field
5. **e-vas-checkbox** - Single boolean toggle
6. **e-vas-radio** - Single selection

### Phase 3: Advanced form components

7. **e-vas-toggle** - Boolean toggle with visual state
8. **e-vas-toggle-button** - Stateless toggle
9. **e-vas-select** - Native dropdown

### Phase 4: Complex components

10. **e-vas-multiselect** - Most complex, multiple sub-elements

---

## 6. Risk Notes

| Risk                                       | Mitigation                                                                          |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| **Visual regression**                      | Only adding `data-testid` attributes; no CSS/styling changes                        |
| **Test breakage during migration**         | Run tests after each component migration; keep both selectors temporarily if needed |
| **Missing testids in nested elements**     | Add testids to all interactive children; verify with `getByTestId().count()`        |
| **Dynamic elements (multiselect options)** | Use scoped testids + nth() for dynamic lists                                        |
| **Accessibility impact**                   | `data-testid` is ignored by screen readers; no a11y impact                          |

---

## 7. Acceptance Criteria

- [ ] No `.e-vas-*` class selectors remain in `tests/e2e/elements/*.spec.ts`
- [ ] All tests use `getByTestId()` as primary selector
- [ ] Fallback to role/label only when no testid exists (document reason)
- [ ] All 10 component files have `data-testid` attributes on interactive elements
- [ ] Tests pass after each phase
- [ ] No visual/behavioral changes (attributes only)

---

## 8. File Change Summary

### Component Files to Update (10)

1. `src/elements/e-vas-button.vue` - Add 1 testid
2. `src/elements/e-vas-input.vue` - Add 2 testids
3. `src/elements/e-vas-select.vue` - Add 2 testids
4. `src/elements/e-vas-checkbox.vue` - Add 3 testids
5. `src/elements/e-vas-radio.vue` - Add 3 testids
6. `src/elements/e-vas-toggle.vue` - Add 2 testids
7. `src/elements/e-vas-toggle-button.vue` - Add 1 testid
8. `src/elements/e-vas-icon.vue` - Add 1 testid
9. `src/elements/e-vas-progress.vue` - Add 1 testid
10. `src/elements/e-vas-multiselect.vue` - Add 4 testids

**Total testids to add:** 20

### Test Files to Migrate (10)

1. `tests/e2e/elements/e-vas-button.spec.ts`
2. `tests/e2e/elements/e-vas-input.spec.ts`
3. `tests/e2e/elements/e-vas-select.spec.ts`
4. `tests/e2e/elements/e-vas-checkbox.spec.ts`
5. `tests/e2e/elements/e-vas-radio.spec.ts`
6. `tests/e2e/elements/e-vas-toggle.spec.ts`
7. `tests/e2e/elements/e-vas-toggle-button.spec.ts`
8. `tests/e2e/elements/e-vas-icon.spec.ts`
9. `tests/e2e/elements/e-vas-progress.spec.ts`
10. `tests/e2e/elements/e-vas-multiselect.spec.ts`
