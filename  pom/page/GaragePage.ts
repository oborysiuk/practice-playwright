import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../BasePage";

export default class GaragePage extends BasePage {
  private readonly userProfile: Locator = this.page.locator(
    "//a[@routerlink='profile']"
  );
  private readonly profileName: Locator = this.page.locator(
    "//p[contains(@class, 'profile_name')]"
  );
  private readonly addNewCarButton: Locator = this.page.locator(
    '//app-garage//button[contains(@class, "btn-primary")]'
  );
  private readonly brandCarDropdown: Locator = this.page.locator(
    '//select[@id="addCarBrand"]'
  );
  private readonly modelCarDropdown: Locator = this.page.locator(
    '//select[@id="addCarModel"]'
  );
  private readonly mileageField: Locator = this.page.locator(
    '//input[@id="addCarMileage"]'
  );
  private readonly submitAddingCarButton: Locator = this.page.locator(
    '//app-add-car-modal//button[contains(@class, "btn-primary")]'
  );
  private readonly allAddedCarNames: Locator = this.page.locator(
    '//p[contains(@class, "car_name")]'
  );
  private readonly pageHeader: Locator = this.page.locator("//h1", {
    hasText: "Garage",
  });

  async openUserProfile() {
    await this.userProfile.click();
  }

  async verifyUserProfileData(firstName: string, lastName: string) {
    await expect(this.profileName).toHaveText(firstName + " " + lastName);
  }

  async open() {
    await this.page.goto("/panel/garage");
  }

  async addNewCar(brand: string, model: string, mileage: string) {
    await this.addNewCarButton.click();
    await this.brandCarDropdown.selectOption(brand);
    await this.modelCarDropdown.selectOption(model);
    await this.mileageField.fill(mileage);
    await this.submitAddingCarButton.click();
  }

  async verifyLastAddedCarName(expectedName: string) {
    await expect(this.allAddedCarNames.first()).toHaveText(expectedName);
  }

  async verifyGaragePageIsOpened() {
    await expect(this.pageHeader).toBeVisible();
  }
}
