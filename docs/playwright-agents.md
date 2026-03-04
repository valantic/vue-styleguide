# Playwright Agents Setup

This repository uses Playwright Test for E2E checks and Playwright Test Agents (Planner, Generator, Healer) initialized with the `opencode` loop.

## Prerequisites
- Node.js: `>=22 <25` (project `.nvmrc` is `24`)
- npm: `>=10 <12`
- Dependencies installed:
  ```bash
  npm ci
  ```
- Playwright browsers installed:
  ```bash
  npx playwright install
  ```

## Local Run Commands
- Headless E2E:
  ```bash
  npm run test:e2e
  ```
- UI mode:
  ```bash
  npm run test:e2e:ui
  ```
- Headed mode:
  ```bash
  npm run test:e2e:headed
  ```

You can also call Playwright directly:

```bash
npx playwright test
npx playwright test --ui
```

## Environment Variables
- `E2E_BASE_URL`: base URL used by Playwright (`use.baseURL`)
  - Default: `http://127.0.0.1:4173`
  - Example (remote/staging):
    ```bash
    E2E_BASE_URL=https://staging.example.com npm run test:e2e
    ```

## Base URL and Web Server Behavior
- `playwright.config.ts` defaults to `http://127.0.0.1:4173`.
- For local URLs (`127.0.0.1`, `localhost`, `0.0.0.0`, `::1`), Playwright auto-starts the app with:
  ```bash
  npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
  ```
- If `E2E_BASE_URL` is set to a non-local URL, local `webServer` startup is skipped.

## Seed Test
- File: `tests/e2e/seed.spec.ts`
- Route: `/sg/test-readme`
- Assertions:
  - `data-testid="app-shell"`
  - `data-testid="page-content"`
  - `data-testid="nav-main"`
- Includes comment placeholder for future auth setup via `storageState`.

## Playwright Agents in This Repo

Generated with:

```bash
npx playwright init-agents --loop=opencode
```

Generated artifacts:
- `specs/` (test plan markdown location)
- `.opencode/prompts/playwright-test-planner.md`
- `.opencode/prompts/playwright-test-generator.md`
- `.opencode/prompts/playwright-test-healer.md`
- `opencode.json` (opencode config + MCP command wiring)

Repository-visible mirror:
- `.github/playwright-agents/` contains mirrored Planner/Generator/Healer prompt files.

## How to Work with Planner/Generator/Healer
1. Write or refine test plans in `specs/*.md`.
2. Use Planner to explore and save structured scenarios into `specs/`.
3. Use Generator to transform scenarios into Playwright tests in `tests/e2e/`.
4. Use Healer to debug and repair failing tests.
5. Keep seed/environment assumptions current in `tests/e2e/seed.spec.ts`.

## Re-generate Agents
Run again when Playwright updates agent templates:

```bash
npx playwright init-agents --loop=opencode
```

If template files changed and you have local customizations, review and merge changes manually before committing.

## Optional: Codex CLI MCP Server Setup
If you use Codex CLI MCP integrations, add Playwright Test MCP server:

```bash
codex mcp add playwright-test -- npx playwright run-test-mcp-server
```

This registers the same MCP server command that `opencode.json` uses for Playwright agent tooling.
