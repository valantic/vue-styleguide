# E2E Test Plan: All Vue Elements

**Seed:** `tests/e2e/seed.spec.ts`  
**Output:** `specs/elements/all-elements-e2e-plan.md`

---

## Component Coverage Overview

| #   | Component               | Route                                       | Status     |
| --- | ----------------------- | ------------------------------------------- | ---------- |
| 1   | e-vas-button.vue        | /sg-elements/sg-test-page-vas-button        | ✅ Covered |
| 2   | e-vas-checkbox.vue      | /sg-elements/sg-test-page-vas-checkbox      | ✅ Covered |
| 3   | e-vas-icon.vue          | /sg-elements/sg-test-page-icons             | ✅ Covered |
| 4   | e-vas-input.vue         | /sg-elements/sg-test-page-vas-input         | ✅ Covered |
| 5   | e-vas-multiselect.vue   | /sg-elements/sg-test-page-vas-multiselect   | ✅ Covered |
| 6   | e-vas-progress.vue      | /sg-elements/sg-test-page-vas-progress      | ✅ Covered |
| 7   | e-vas-radio.vue         | /sg-elements/sg-test-page-vas-radio         | ✅ Covered |
| 8   | e-vas-select.vue        | /sg-elements/sg-test-page-vas-select        | ✅ Covered |
| 9   | e-vas-toggle.vue        | /sg-elements/sg-test-page-vas-toggle        | ✅ Covered |
| 10  | e-vas-toggle-button.vue | /sg-elements/sg-test-page-vas-toggle-button | ✅ Covered |

---

## Test Suites

### 1. e-vas-button

**Route:** `/sg-elements/sg-test-page-vas-button`

#### Scenario 1.1: Button renders correctly

- **Preconditions:** Page loaded
- **Steps:**
  1. Locate button element by `.e-vas-button`
- **Expected outcomes:**
  - Button is visible
  - Button is enabled (not disabled)
- **Failure conditions:** Button missing or hidden

#### Scenario 1.2: Button click works

- **Preconditions:** Page loaded, button is enabled
- **Steps:**
  1. Click the button
- **Expected outcomes:**
  - Click event fires without error
  - Button remains visible
- **Failure conditions:** Click throws error or button disappears

#### Scenario 1.3: Disabled button state

- **Preconditions:** Page loaded with disabled button present
- **Steps:**
  1. Locate disabled button by `.e-vas-button--disabled` or `[disabled]`
- **Expected outcomes:**
  - Button is visible
  - Button is not focusable (or has reduced interactivity)
- **Failure conditions:** Disabled button is clickable

#### Scenario 1.4: Button with progress state

- **Preconditions:** Page loaded with progress button present
- **Steps:**
  1. Locate button with progress state by `.e-vas-button--progress`
- **Expected outcomes:**
  - Progress indicator is visible
  - Button is not clickable during progress
- **Failure conditions:** Progress state not visible

---

### 2. e-vas-checkbox

**Route:** `/sg-elements/sg-test-page-vas-checkbox`

#### Scenario 2.1: Checkbox renders correctly

- **Preconditions:** Page loaded
- **Steps:**
  1. Locate checkbox by `.e-vas-checkbox`
  2. Locate hidden input by `.e-vas-checkbox__field`
- **Expected outcomes:**
  - Checkbox indicator is visible
  - Hidden input exists in DOM
- **Failure conditions:** Checkbox indicator missing

#### Scenario 2.2: Checkbox toggles on click

- **Preconditions:** Page loaded, checkbox is unchecked
- **Steps:**
  1. Click the checkbox indicator
- **Expected outcomes:**
  - Checkbox becomes checked (has `.e-vas-checkbox--checked` or similar)
  - Hidden input is checked
- **Failure conditions:** Checkbox state does not change

#### Scenario 2.3: Checkbox keyboard activation

- **Preconditions:** Page loaded, checkbox is unchecked
- **Steps:**
  1. Press Tab to focus the checkbox
  2. Press Space to toggle
- **Expected outcomes:**
  - Checkbox becomes checked after Space
- **Failure conditions:** Keyboard does not toggle checkbox

#### Scenario 2.4: Disabled checkbox

- **Preconditions:** Page loaded with disabled checkbox
- **Steps:**
  1. Locate disabled checkbox by `.e-vas-checkbox` with `input[disabled]`
- **Expected outcomes:**
  - Checkbox is visible
  - Input is disabled
- **Failure conditions:** Disabled checkbox is interactive

---

### 3. e-vas-icon

**Route:** `/sg-elements/sg-test-page-icons`

#### Scenario 3.1: Icon renders correctly

- **Preconditions:** Page loaded
- **Steps:**
  1. Locate icon by `.e-vas-icon`
- **Expected outcomes:**
  - Icon is visible
  - SVG element exists
- **Failure conditions:** Icon not rendered

#### Scenario 3.2: Icon has correct accessibility

- **Preconditions:** Page loaded with icon that has alt text
- **Steps:**
  1. Locate icon by `.e-vas-icon`
- **Expected outcomes:**
  - If alt provided: aria-hidden is false or img with alt
  - If no alt: aria-hidden is true
- **Failure conditions:** Missing accessibility attributes

---

### 4. e-vas-input

**Route:** `/sg-elements/sg-test-page-vas-input`

#### Scenario 4.1: Input renders correctly

- **Preconditions:** Page loaded
- **Steps:**
  1. Locate input by `.e-vas-input__field` or `input[name]`
- **Expected outcomes:**
  - Input is visible
  - Input has correct name attribute
- **Failure conditions:** Input missing or hidden

#### Scenario 4.2: Input accepts text

- **Preconditions:** Page loaded, input is empty
- **Steps:**
  1. Click the input to focus
  2. Type "test value"
- **Expected outcomes:**
  - Input value equals "test value"
- **Failure conditions:** Input does not accept text

#### Scenario 4.3: Input focus and blur events

- **Preconditions:** Page loaded
- **Steps:**
  1. Click the input (triggers focus)
  2. Click outside the input (triggers blur)
- **Expected outcomes:**
  - Input shows focus state (`.e-vas-input--focus`)
  - Focus state is removed after blur
- **Failure conditions:** Focus states not applied

#### Scenario 4.4: Disabled input

- **Preconditions:** Page loaded with disabled input
- **Steps:**
  1. Locate disabled input by `input:disabled`
- **Expected outcomes:**
  - Input is visible
  - Input is not editable
- **Failure conditions:** Disabled input is editable

#### Scenario 4.5: Input with placeholder

- **Preconditions:** Page loaded with placeholder input
- **Steps:**
  1. Locate input by `.e-vas-input__field`
- **Expected outcomes:**
  - Input has placeholder attribute
  - Placeholder text is visible when empty
- **Failure conditions:** Placeholder missing

---

### 5. e-vas-multiselect

**Route:** `/sg-elements/sg-test-page-vas-multiselect`

#### Scenario 5.1: Multiselect renders correctly

- **Preconditions:** Page loaded
- **Steps:**
  1. Locate multiselect by `.e-vas-multiselect`
  2. Locate trigger by `.e-vas-multiselect__field-wrapper`
- **Expected outcomes:**
  - Multiselect is visible
  - Trigger button is visible
- **Failure conditions:** Multiselect not visible

#### Scenario 5.2: Multiselect opens on click

- **Preconditions:** Page loaded, dropdown is closed
- **Steps:**
  1. Click the trigger button
- **Expected outcomes:**
  - Dropdown opens (has `.e-vas-multiselect__field-wrapper--open`)
  - Options list is visible (`.e-vas-multiselect__options-wrapper`)
- **Failure conditions:** Dropdown does not open

#### Scenario 5.3: Multiselect allows multiple selection

- **Preconditions:** Page loaded, dropdown is open
- **Steps:**
  1. Click first option checkbox
  2. Click second option checkbox
- **Expected outcomes:**
  - Both options are selected
  - Selected values appear in trigger display
- **Failure conditions:** Cannot select multiple options

#### Scenario 5.4: Multiselect closes on click outside

- **Preconditions:** Page loaded, dropdown is open
- **Steps:**
  1. Click outside the multiselect
- **Expected outcomes:**
  - Dropdown closes
  - Open class is removed
- **Failure conditions:** Dropdown stays open

#### Scenario 5.5: Disabled multiselect

- **Preconditions:** Page loaded with disabled multiselect
- **Steps:**
  1. Locate disabled multiselect by `.e-vas-multiselect__field-wrapper--disabled`
- **Expected outcomes:**
  - Multiselect is visible
  - Trigger is not clickable
- **Failure conditions:** Disabled multiselect is interactive

---

### 6. e-vas-progress

**Route:** `/sg-elements/sg-test-page-vas-progress`

#### Scenario 6.1: Progress renders correctly

- **Preconditions:** Page loaded
- **Steps:**
  1. Locate progress by `.e-vas-progress`
- **Expected outcomes:**
  - Progress indicator is visible
- **Failure conditions:** Progress not visible

#### Scenario 6.2: Progress with message

- **Preconditions:** Page loaded with progress and message
- **Steps:**
  1. Locate progress message element
- **Expected outcomes:**
  - Message text is visible
- **Failure conditions:** Message not displayed

#### Scenario 6.3: Negative variant

- **Preconditions:** Page loaded with negative progress
- **Steps:**
  1. Locate progress by `.e-vas-progress--negative`
- **Expected outcomes:**
  - Negative variant is visible
- **Failure conditions:** Wrong variant displayed

---

### 7. e-vas-radio

**Route:** `/sg-elements/sg-test-page-vas-radio`

#### Scenario 7.1: Radio group renders correctly

- **Preconditions:** Page loaded
- **Steps:**
  1. Locate radio group by `.e-vas-radio`
  2. Locate all radio inputs by `.e-vas-radio__field`
- **Expected outcomes:**
  - All radio options are visible
  - Radio inputs exist in DOM
- **Failure conditions:** Radio options missing

#### Scenario 7.2: Radio selection works

- **Preconditions:** Page loaded, no option selected
- **Steps:**
  1. Click second radio option
- **Expected outcomes:**
  - Second option is selected
  - First option is not selected
  - Selected input has `:checked` state
- **Failure conditions:** Selection does not change

#### Scenario 7.3: Radio keyboard navigation

- **Preconditions:** Page loaded
- **Steps:**
  1. Press Tab to focus first radio
  2. Press ArrowDown/ArrowRight to select next
- **Expected outcomes:**
  - Selection moves to next radio option
- **Failure conditions:** Arrow keys do not change selection

#### Scenario 7.4: Disabled radio

- **Preconditions:** Page loaded with disabled radio option
- **Steps:**
  1. Locate disabled radio by `.e-vas-radio` with `input:disabled`
- **Expected outcomes:**
  - Radio is visible
  - Input is disabled
- **Failure conditions:** Disabled radio is selectable

---

### 8. e-vas-select

**Route:** `/sg-elements/sg-test-page-vas-select`

#### Scenario 8.1: Select renders correctly

- **Preconditions:** Page loaded
- **Steps:**
  1. Locate select by `.e-vas-select`
  2. Locate select element by `.e-vas-select__select`
- **Expected outcomes:**
  - Select is visible
  - Native select element exists
- **Failure conditions:** Select not visible

#### Scenario 8.2: Select options are available

- **Preconditions:** Page loaded
- **Steps:**
  1. Check select has options
- **Expected outcomes:**
  - Options are available in the select
- **Failure conditions:** Options not displayed

#### Scenario 8.3: Select selection works

- **Preconditions:** Page loaded
- **Steps:**
  1. Click select to open
  2. Select second option by clicking it
- **Expected outcomes:**
  - Selected option value changes
  - Display shows selected option label
- **Failure conditions:** Selection does not update

#### Scenario 8.4: Disabled select

- **Preconditions:** Page loaded with disabled select
- **Steps:**
  1. Locate disabled select by `.e-vas-select--disabled` or `select:disabled`
- **Expected outcomes:**
  - Select is visible
  - Select is not interactive
- **Failure conditions:** Disabled select is interactive

#### Scenario 8.5: Select with placeholder

- **Preconditions:** Page loaded with placeholder enabled
- **Steps:**
  1. Locate select by `.e-vas-select`
- **Expected outcomes:**
  - Placeholder text is visible when no selection made
- **Failure conditions:** Placeholder not displayed

---

### 9. e-vas-toggle

**Route:** `/sg-elements/sg-test-page-vas-toggle`

#### Scenario 9.1: Toggle renders correctly

- **Preconditions:** Page loaded
- **Steps:**
  1. Locate toggle by `.e-vas-toggle`
  2. Locate hidden input by `.e-vas-toggle__input`
- **Expected outcomes:**
  - Toggle is visible
  - Hidden checkbox exists
- **Failure conditions:** Toggle not visible

#### Scenario 9.2: Toggle switches on click

- **Preconditions:** Page loaded, toggle is off
- **Steps:**
  1. Click the toggle
- **Expected outcomes:**
  - Toggle shows active state (`.e-vas-toggle--active`)
  - Hidden input is checked
- **Failure conditions:** Toggle state does not change

#### Scenario 9.3: Toggle keyboard activation

- **Preconditions:** Page loaded, toggle is off
- **Steps:**
  1. Press Tab to focus toggle
  2. Press Space to toggle
- **Expected outcomes:**
  - Toggle becomes active after Space
- **Failure conditions:** Keyboard does not toggle

#### Scenario 9.4: Toggle label support

- **Preconditions:** Page loaded with toggle that has label
- **Steps:**
  1. Locate toggle label by `.e-vas-toggle__label`
- **Expected outcomes:**
  - Label text is visible
  - Clicking label toggles the switch
- **Failure conditions:** Label missing or not functional

---

### 10. e-vas-toggle-button

**Route:** `/sg-elements/sg-test-page-vas-toggle-button`

#### Scenario 10.1: Toggle button renders correctly

- **Preconditions:** Page loaded
- **Steps:**
  1. Locate toggle button by `.e-vas-toggle-button`
- **Expected outcomes:**
  - Toggle button is visible
- **Failure conditions:** Toggle button not visible

#### Scenario 10.2: Toggle button active state

- **Preconditions:** Page loaded with inactive toggle button
- **Steps:**
  1. Click the toggle button
- **Expected outcomes:**
  - Button shows active state (`.e-vas-toggle-button--active`)
- **Failure conditions:** Active state not applied
- **Note:** Component is stateless - active state must be managed by parent

#### Scenario 10.3: Toggle button content styling

- **Preconditions:** Page loaded with active toggle button
- **Steps:**
  1. Locate active content by `.e-vas-toggle-button__content--active`
- **Expected outcomes:**
  - Active content styling is applied
- **Failure conditions:** Active content not styled

---

## Selector Strategy

### Preferred Selectors (in order)

1. **data-testid** - Not yet implemented (recommend adding to components)
2. **Role/Label** - For form elements with accessible names
3. **Class selectors** - BEM-style classes (`.e-vas-*`)
4. **Attribute selectors** - For disabled, checked states

### Example Selectors

| Component     | Selector                 |
| ------------- | ------------------------ |
| Button        | `.e-vas-button`          |
| Checkbox      | `.e-vas-checkbox__field` |
| Icon          | `.e-vas-icon`            |
| Input         | `.e-vas-input__field`    |
| Multiselect   | `.e-vas-multiselect`     |
| Progress      | `.e-vas-progress`        |
| Radio         | `.e-vas-radio__field`    |
| Select        | `.e-vas-select__select`  |
| Toggle        | `.e-vas-toggle__input`   |
| Toggle Button | `.e-vas-toggle-button`   |

---

## Coverage Gaps

### Recommended Test IDs

None of the 10 components currently have `data-testid` attributes. For more robust tests, consider adding:

| Component           | Suggested Test ID   |
| ------------------- | ------------------- |
| e-vas-button        | `vas-button`        |
| e-vas-checkbox      | `vas-checkbox`      |
| e-vas-icon          | `vas-icon`          |
| e-vas-input         | `vas-input`         |
| e-vas-multiselect   | `vas-multiselect`   |
| e-vas-progress      | `vas-progress`      |
| e-vas-radio         | `vas-radio`         |
| e-vas-select        | `vas-select`        |
| e-vas-toggle        | `vas-toggle`        |
| e-vas-toggle-button | `vas-toggle-button` |

---

## Notes

1. **State Management:** Some components (toggle-button) are stateless - parent must manage active state. Tests should verify visual feedback only.

2. **Form States:** Several components support `state` prop (default, error, success, warning, info). Consider adding scenarios for validation states if demo page includes them.

3. **Native vs Custom:** Some components use hidden native inputs (checkbox, radio, toggle) for accessibility. Tests should verify both the native input state and visual indicator.

4. **Test Independence:** All scenarios assume fresh state. Use `test.beforeEach` to navigate to route.

5. **No Random Values:** Tests avoid hardcoding specific option labels/values from demo data.
