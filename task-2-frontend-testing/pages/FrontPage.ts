import { expect, Locator, Page } from '@playwright/test';

export class FrontPage {
  private readonly logoutButton: Locator;

  constructor(private readonly page: Page) {
    this.logoutButton = page.getByRole('button', {
      name: /logout/i,
    });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard|home|storefront/i);
  }

  async expectUserIsAuthenticated(): Promise<void> {
    await expect(this.logoutButton).toBeVisible();
  }
}