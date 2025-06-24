import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class GaragePage extends BasePage {
  private readonly userProfile: Locator = this.page.locator(
    "//a[@routerlink='profile']"
  );
  private readonly profileName: Locator = this.page.locator(
    "//p[contains(@class, 'profile_name')]"
  );

  async openUserProfile() {
    await this.userProfile.click();
  }

  async verifyUserProfileData(firstName, lastName) {
    await expect(this.profileName).toHaveText(firstName + " " + lastName);
  }
}
