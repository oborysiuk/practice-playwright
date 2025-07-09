import { expect, Locator } from "@playwright/test";
import BasePage from "../BasePage";

export default class SignInForm extends BasePage {
  private readonly emailInput: Locator = this.page.locator(
    "//input[@id='signinEmail']"
  );
  private readonly passwordInput: Locator = this.page.locator(
    "//input[@id='signinPassword']"
  );
  private readonly logInButton: Locator = this.page.locator(
    "//app-signin-modal//button[contains(@class, 'btn-primary')]"
  );

  async makeLoggingIn(email, password){
     await this.emailInput.fill(email);
     await this.passwordInput.fill(password);
     await this.logInButton.click();
  }

}
