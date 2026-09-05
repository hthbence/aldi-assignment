import { test, expect } from '../../fixtures/login-fixtures';
import { env } from '../../utilities/env';

test.describe('Login', () => {
  test('Successful login with valid credentials', async ({
    loginPage,
    frontPage,
  }) => {
    await loginPage.goto();

    await loginPage.login(
      env.Email,
      env.Password
    );

    await frontPage.expectLoaded();
    await frontPage.expectUserIsAuthenticated();
  });

  test('Attempt to login with invalid credentials', async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();

    await loginPage.login(
      env.Email,
      env.WrongPassword
    );

    await expect(page).toHaveURL(/login/i);

    await expect(
      page.getByText(/Email and password do not match/i)
    ).toBeVisible();
  });
});