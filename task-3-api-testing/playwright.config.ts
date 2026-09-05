import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  reporter: 'html',

  use: {
    baseURL: process.env.API_BASE_URL,
    trace: 'on-first-retry',
  },
});