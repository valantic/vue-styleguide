import { defineConfig } from '@playwright/test';

const localBaseUrl = 'http://127.0.0.1:4173';
const configuredBaseUrl = process.env.E2E_BASE_URL ?? localBaseUrl;

const isLocalHostname = (hostname: string): boolean =>
  ['127.0.0.1', 'localhost', '0.0.0.0', '::1'].includes(hostname);

const shouldUseLocalWebServer = (): boolean => {
  if (!process.env.E2E_BASE_URL) {
    return true;
  }

  try {
    return isLocalHostname(new URL(configuredBaseUrl).hostname);
  } catch {
    return false;
  }
};

export default defineConfig({
  testDir: './tests/e2e',
  reporter: 'list',
  use: {
    baseURL: configuredBaseUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
  webServer: shouldUseLocalWebServer()
    ? {
        command: 'npm run dev -- --host 127.0.0.1 --port 4173 --strictPort',
        url: localBaseUrl,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined,
});
