import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { FrontPage } from '../pages/FrontPage';

type LoginFixtures = {
  loginPage: LoginPage;
  frontPage: FrontPage;
};

export const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  frontPage: async ({ page }, use) => {
    await use(new FrontPage(page));
  },
});

export { expect };