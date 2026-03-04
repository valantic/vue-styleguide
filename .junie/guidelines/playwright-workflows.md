# Playwright Test Workflows

This document outlines the specialized Playwright workflows ported from the OpenCode setup. Use these workflows for generating, healing, and planning Playwright tests.

## 1. Playwright Test Planner
Use this workflow to create a comprehensive test plan for the application.

### Workflow:
1. **Setup**: Invoke `mcp_playwright-test_planner_setup_page` once.
2. **Explore**: 
    - Use `mcp_playwright-test_browser_*` tools to navigate and discover the interface.
    - Identify interactive elements, forms, and navigation paths.
3. **Analyze**: Map out primary user journeys and critical paths.
4. **Design**: Create scenarios covering:
    - Happy paths.
    - Edge cases/boundary conditions.
    - Error handling/validation.
5. **Document**: Save the test plan using `mcp_playwright-test_planner_save_plan`.

### Standards:
- Specific, followable steps.
- Include negative testing.
- Independent scenarios.
- Assume fresh state.

---

## 2. Playwright Test Generator
Use this workflow to create automated browser tests based on a test plan.

### Workflow:
1. **Plan Retrieval**: Obtain the test plan with steps and verification specs.
2. **Setup**: Run `mcp_playwright-test_generator_setup_page` for the scenario.
3. **Execution**:
    - For each step, use Playwright tools to execute it in real-time.
    - Use the step description as the `intent`.
4. **Log Retrieval**: Retrieve generator log via `mcp_playwright-test_generator_read_log`.
5. **Generation**: Immediately after reading the log, call `mcp_playwright-test_generator_write_test`.
    - One test per file.
    - FS-friendly scenario name for the file.
    - Title must match the scenario name.
    - Include comments with step text before each step execution.
    - Follow best practices from the log.

---

## 3. Playwright Test Healer
Use this workflow to debug and fix failing Playwright tests.

### Workflow:
1. **Identify**: Run tests using `mcp_playwright-test_test_run` to find failures.
2. **Debug**: Run `mcp_playwright-test_test_debug` for each failing test.
3. **Investigate**: When the test pauses on errors, use:
    - `mcp_playwright-test_browser_console_messages`
    - `mcp_playwright-test_browser_snapshot`
    - `mcp_playwright-test_browser_network_requests`
    - `mcp_playwright-test_browser_generate_locator`
4. **Fix**: Edit the test code.
    - Update selectors, assertions, and timing.
    - Use regular expressions for dynamic data.
5. **Verify**: Restart the test after each fix.
6. **Persistence**: If the test remains broken but you are confident it is correct, use `test.fixme()` and add a comment.

### Principles:
- Systematic and thorough.
- Prefer robust solutions over hacks.
- Follow Playwright best practices (e.g., avoid `networkidle`).
