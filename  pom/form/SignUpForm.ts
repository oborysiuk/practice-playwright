import { expect, Locator } from "@playwright/test";
import BasePage from "../BasePage";

export default class SignUpForm extends BasePage {
  private readonly nameInput: Locator = this.page.locator(
    "//input[@id='signupName']"
  );
  private readonly lastNameInput: Locator = this.page.locator(
    "//input[@id='signupLastName']"
  );
  private readonly emailInput: Locator = this.page.locator(
    "//input[@id='signupEmail']"
  );
  private readonly passwordInput: Locator = this.page.locator(
    "//input[@id='signupPassword']"
  );
  private readonly repeatPasswordInput: Locator = this.page.locator(
    "//input[@id='signupRepeatPassword']"
  );

  private readonly registerButton: Locator = this.page.locator(
    "//div[@class='modal-footer']//button[contains(@class, 'btn-primary')]"
  );

  async enterName(name) {
    await this.nameInput.fill(name);
    await this.nameInput.blur();
  }

  async enterLastName(lastName) {
    await this.lastNameInput.fill(lastName);
    await this.lastNameInput.blur();
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
    await this.emailInput.blur();
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }

  async enterRepeatPassword(repeatPassword) {
    await this.repeatPasswordInput.fill(repeatPassword);
    await this.repeatPasswordInput.blur();
  }

  async fillTheSignUpForm(name, lastName, email, password, repeatPassword) {
    await this.enterName(name);
    await this.enterLastName(lastName);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.enterRepeatPassword(repeatPassword);
  }

  async clickOnRegisterButton() {
    await this.registerButton.click();
  }

  async triggerEmptyErrorForField(fieldName) {
    let element: Locator;
    switch (fieldName) {
      case "name":
        element = this.nameInput;
        break;
      case "lastName":
        element = this.lastNameInput;
        break;
      case "email":
        element = this.emailInput;
        break;
      case "password":
        element = this.passwordInput;
        break;
      case "repeatPassword":
        element = this.repeatPasswordInput;
        break;
    }
    await element.focus();
    await element.blur();
  }

  async verifyErrorIsDisplayed(fieldName, errorText: string) {
    let element: Locator;
    switch (fieldName) {
      case "name":
        element = this.nameInput;
        break;
      case "lastName":
        element = this.lastNameInput;
        break;
      case "email":
        element = this.emailInput;
        break;
      case "password":
        element = this.passwordInput;
        break;
      case "repeatPassword":
        element = this.repeatPasswordInput;
        break;
    }
    await expect(element).toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(this.page.getByText(errorText)).toBeVisible();
  }

  async verifyThereIsNoError(fieldName, errorText: string) {
    let element: Locator;
    switch (fieldName) {
      case "name":
        element = this.nameInput;
        break;
      case "lastName":
        element = this.lastNameInput;
        break;
      case "email":
        element = this.emailInput;
        break;
      case "password":
        element = this.passwordInput;
        break;
      case "repeatPassword":
        element = this.repeatPasswordInput;
        break;
    }
    await expect(element).not.toHaveCSS("border-color", "rgb(220, 53, 69)");
    await expect(this.page.getByText(errorText)).not.toBeVisible();
  }

  async verifyRegisterButtonIsDisabled() {
    await expect(this.registerButton).toBeDisabled();
  }
}
