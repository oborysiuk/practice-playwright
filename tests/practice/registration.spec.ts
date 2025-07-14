import { test, expect, Locator, errors } from "@playwright/test";

test.describe("Registration form validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");
    await page.click("//button[contains(@class, 'hero-descriptor_btn')]");
  });

  test.describe("Name field validation", () => {
    let nameInput: Locator;
    let errorText: Locator;

    test.beforeEach(async ({ page }) => {
      nameInput = page.locator("//input[@id='signupName']");
      errorText = nameInput.locator(
        '//following-sibling::div[@class="invalid-feedback"]'
      );
    });

    test("Name is required error for empty Name field", async ({ page }) => {
      await nameInput.focus();
      await nameInput.blur();
      await expect(errorText).toHaveText("Name required");
      await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Name is invalid error for Name field wrong data -- numbers", async ({
      page,
    }) => {
      await nameInput.fill("1qwerty");
      await nameInput.blur();
      await expect(errorText).toHaveText("Name is invalid");
      await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Name is invalid error for Name field wrong data -- symbols", async ({
      page,
    }) => {
      await nameInput.fill("!qwerty");
      await nameInput.blur();
      await expect(errorText).toHaveText("Name is invalid");
      await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Name is invalid error for Name field wrong data -- not an english symbols", async ({
      page,
    }) => {
      await nameInput.fill("ñqwerty");
      await nameInput.blur();
      await expect(errorText).toHaveText("Name is invalid");
      await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Wrong length error for too short Name field value", async ({
      page,
    }) => {
      await nameInput.fill("A");
      await nameInput.blur();
      await expect(errorText).toHaveText(
        "Name has to be from 2 to 20 characters long"
      );
      await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Wrong length error for too long Name field value", async ({
      page,
    }) => {
      await nameInput.fill("qwertyuiopqwertyuiopq");
      await nameInput.blur();
      await expect(errorText).toHaveText(
        "Name has to be from 2 to 20 characters long"
      );
      await expect(nameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Positive test for Name field with value", async ({ page }) => {
      await nameInput.fill("TestUserName");
      await nameInput.blur();
      await expect(errorText).toHaveCount(0);
      await expect(nameInput).not.toHaveCSS("border-color", "rgb(220, 53, 69)");
    });
  });

  test.describe("Last Name field validation", async () => {
    let lastNameInput: Locator;
    let errorText: Locator;

    test.beforeEach(async ({ page }) => {
      lastNameInput = page.locator("//input[@id='signupLastName']");
      errorText = lastNameInput.locator(
        '//following-sibling::div[@class="invalid-feedback"]'
      );
    });

    test("Last name is required error for empty Last Name field", async ({
      page,
    }) => {
      await lastNameInput.focus();
      await lastNameInput.blur();
      await expect(errorText).toHaveText("Last name required");
      await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Last name is invalid error for Last Name field wrong data -- numbers", async ({
      page,
    }) => {
      await lastNameInput.fill("1qwerty");
      await lastNameInput.blur();
      await expect(errorText).toHaveText("Last name is invalid");
      await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Last Name is invalid error for Last Name field wrong data -- symbols", async ({
      page,
    }) => {
      await lastNameInput.fill("!qwerty");
      await lastNameInput.blur();
      await expect(errorText).toHaveText("Last name is invalid");
      await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Last Name is invalid error for Last Name field wrong data -- not an english symbols", async ({
      page,
    }) => {
      await lastNameInput.fill("ñqwerty");
      await lastNameInput.blur();
      await expect(errorText).toHaveText("Last name is invalid");
      await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Wrong length error for too short Last Name field value", async ({
      page,
    }) => {
      await lastNameInput.fill("A");
      await lastNameInput.blur();
      await expect(errorText).toHaveText(
        "Last name has to be from 2 to 20 characters long"
      );
      await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Wrong length error for too long Last Name field value", async ({
      page,
    }) => {
      await lastNameInput.fill("qwertyuiopqwertyuiopq");
      await lastNameInput.blur();
      await expect(errorText).toHaveText(
        "Last name has to be from 2 to 20 characters long"
      );
      await expect(lastNameInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Positive test for Last Name field with value", async ({ page }) => {
      await lastNameInput.fill("TestUserLastName");
      await lastNameInput.blur();
      await expect(errorText).toHaveCount(0);
      await expect(lastNameInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });
  });

  test.describe("Email field validation", async () => {
    let emailInput: Locator;
    let errorText: Locator;

    test.beforeEach(async ({ page }) => {
      emailInput = page.locator("//input[@id='signupEmail']");
      errorText = emailInput.locator(
        '//following-sibling::div[@class="invalid-feedback"]'
      );
    });

    test("Email required error for empty Email field", async ({ page }) => {
      await emailInput.focus();
      await emailInput.blur();
      await expect(errorText).toHaveText("Email required");
      await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Email is invalid error for Email field wrong data -- without @", async ({
      page,
    }) => {
      await emailInput.fill("testemailgmail.com");
      await emailInput.blur();
      await expect(errorText).toHaveText("Email is incorrect");
      await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Email is invalid error for Email field wrong data -- without dot", async ({
      page,
    }) => {
      await emailInput.fill("testemail@gmailcom");
      await emailInput.blur();
      await expect(errorText).toHaveText("Email is incorrect");
      await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Email is invalid error for Email field wrong data -- without domain", async ({
      page,
    }) => {
      await emailInput.fill("testemail@.");
      await emailInput.blur();
      await expect(errorText).toHaveText("Email is incorrect");
      await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Positive test for Email field with value", async ({ page }) => {
      await emailInput.fill("testemail123@gmail.com");
      await emailInput.blur();
      await expect(errorText).toHaveCount(0);
      await expect(emailInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });
  });

  test.describe("Password field validation", async () => {
    let passwordInput: Locator;
    let errorText: Locator;

    test.beforeEach(async ({ page }) => {
      passwordInput = page.locator("//input[@id='signupPassword']");
      errorText = passwordInput.locator(
        '//following-sibling::div[@class="invalid-feedback"]'
      );
    });

    test("Password required error for empty Email field", async ({ page }) => {
      await passwordInput.focus();
      await passwordInput.blur();
      await expect(errorText).toHaveText("Password required");
      await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Password is invalid error for Password field wrong data -- without integer", async ({
      page,
    }) => {
      await passwordInput.fill("Aqwertyu");
      await passwordInput.blur();
      await expect(errorText).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Password is invalid error for Password field wrong data -- without capital letter", async ({
      page,
    }) => {
      await passwordInput.fill("1qwertyu");
      await passwordInput.blur();
      await expect(errorText).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Password is invalid error for Password field wrong data -- without small letter", async ({
      page,
    }) => {
      await passwordInput.fill("12345678A");
      await passwordInput.blur();
      await expect(errorText).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Password is invalid error for too short Password field value", async ({
      page,
    }) => {
      await passwordInput.fill("Qwerty1");
      await passwordInput.blur();
      await expect(errorText).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Password is invalid error for too long Password field value", async ({
      page,
    }) => {
      await passwordInput.fill("Qwerty12Qwerty1234");
      await passwordInput.blur();
      await expect(errorText).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)");
    });

    test("Positive test for Password field with value", async ({ page }) => {
      await passwordInput.fill("Password123");
      await passwordInput.blur();
      await expect(errorText).toHaveCount(0);
      await expect(passwordInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });
  });

  test.describe("Re-enter password field validation", async () => {
    let passwordInput: Locator;
    let repeatPasswordInput: Locator;
    let errorText: Locator;

    test.beforeEach(async ({ page }) => {
      passwordInput = page.locator("//input[@id='signupPassword']");
      repeatPasswordInput = page.locator("//input[@id='signupRepeatPassword']");
      errorText = repeatPasswordInput.locator(
        '//following-sibling::div[@class="invalid-feedback"]'
      );
    });
    test("Re-enter password required error for empty Email field", async ({
      page,
    }) => {
      await repeatPasswordInput.focus();
      await repeatPasswordInput.blur();
      await expect(errorText).toHaveText("Re-enter password required");
      await expect(repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Password is invalid error for Re-enter Password field wrong data -- without integer", async ({
      page,
    }) => {
      await repeatPasswordInput.fill("Aqwertyu");
      await repeatPasswordInput.blur();
      await expect(errorText).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await expect(repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Password is invalid error for Re-enter Password field wrong data -- without capital letter", async ({
      page,
    }) => {
      await repeatPasswordInput.fill("1qwertyu");
      await repeatPasswordInput.blur();
      await expect(errorText).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await expect(repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Password is invalid error for Re-enter Password field wrong data -- without small letter", async ({
      page,
    }) => {
      await repeatPasswordInput.fill("12345678A");
      await repeatPasswordInput.blur();
      await expect(errorText).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await expect(repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Password is invalid error for too short Re-enter Password field value", async ({
      page,
    }) => {
      await repeatPasswordInput.fill("Qwerty1");
      await repeatPasswordInput.blur();
      await expect(errorText).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await expect(repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Password is invalid error for too long Re-enter Password field value", async ({
      page,
    }) => {
      await repeatPasswordInput.fill("Qwerty12Qwerty1234");
      await repeatPasswordInput.blur();
      await expect(errorText).toHaveText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      await expect(repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Passwords do not match error if passwords do not match", async ({
      page,
    }) => {
      await passwordInput.fill("Password123");
      await passwordInput.blur();
      await repeatPasswordInput.fill("Password1234");
      await repeatPasswordInput.blur();
      await expect(errorText).toHaveText("Passwords do not match");
      await expect(repeatPasswordInput).toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    test("Positive test for Password & Re-enter Password fields matching values", async ({
      page,
    }) => {
      await passwordInput.fill("Password123");
      await passwordInput.blur();
      await repeatPasswordInput.fill("Password123");
      await repeatPasswordInput.blur();
      await expect(errorText).toHaveCount(0);
      await expect(repeatPasswordInput).not.toHaveCSS(
        "border-color",
        "rgb(220, 53, 69)"
      );
    });
  });

  test.describe("Register button behavior validation", async () => {
    let nameInput: Locator;
    let lastNameInput: Locator;
    let emailInput: Locator;
    let passwordInput: Locator;
    let repeatPasswordInput: Locator;
    let registerButton: Locator;

    test.beforeEach(async ({ page }) => {
      nameInput = page.locator("//input[@id='signupName']");
      lastNameInput = page.locator("//input[@id='signupLastName']");
      emailInput = page.locator("//input[@id='signupEmail']");
      passwordInput = page.locator("//input[@id='signupPassword']");
      repeatPasswordInput = page.locator("//input[@id='signupRepeatPassword']");
      registerButton = page.locator(
        "//div[@class='modal-footer']//button[contains(@class, 'btn-primary')]"
      );
    });

    test("Register button is disabled if form is empty", async ({ page }) => {
      await expect(registerButton).toBeDisabled();
    });

    test("Register button is disabled if Name field is invalid", async ({
      page,
    }) => {
      await nameInput.fill("1qwerty");
      await lastNameInput.fill("TestLastName");
      await emailInput.fill("testemail123@gmail.com");
      await passwordInput.fill("Password123");
      await repeatPasswordInput.fill("Password123");
      await expect(registerButton).toBeDisabled();
    });

    test("Register button is disabled if Last Name field is invalid", async ({
      page,
    }) => {
      await nameInput.fill("TestUserName");
      await lastNameInput.fill("12qwerty");
      await emailInput.fill("testemail123@gmail.com");
      await passwordInput.fill("Password123");
      await repeatPasswordInput.fill("Password1234");
      await expect(registerButton).toBeDisabled();
    });

    test("Register button is disabled if Email field is invalid", async ({
      page,
    }) => {
      await nameInput.fill("TestUserName");
      await lastNameInput.fill("TestUserLastName");
      await emailInput.fill("testemail123@gmailcom");
      await passwordInput.fill("Password123");
      await repeatPasswordInput.fill("Password123");
      await expect(registerButton).toBeDisabled();
    });

    test("Register button is disabled if Password field is invalid", async ({
      page,
    }) => {
      await nameInput.fill("TestUserName");
      await lastNameInput.fill("TestUserLastName");
      await emailInput.fill("testemail123@gmail.com");
      await passwordInput.fill("password123");
      await repeatPasswordInput.fill("Password1234");
      await expect(registerButton).toBeDisabled();
    });

    test("Register button is disabled if Passwords do not match", async ({
      page,
    }) => {
      await nameInput.fill("TestUserName");
      await lastNameInput.fill("TestUserLastName");
      await emailInput.fill("testemail123@gmail.com");
      await passwordInput.fill("Password123");
      await repeatPasswordInput.fill("Password1234");
      await expect(registerButton).toBeDisabled();
    });

    test("New User Registration", async ({ page }) => {
      await nameInput.fill("TestUserName");
      await lastNameInput.fill("TestUserLastName");
      await emailInput.fill(`olga.borysiuk2012+${Date.now()}@gmail.com`);
      await passwordInput.fill("Password123");
      await repeatPasswordInput.fill("Password123");
      await registerButton.click();

      const userProfile = page.locator("//a[@routerlink='profile']");
      await userProfile.click();
      const profileName = page.locator("//p[contains(@class, 'profile_name')]");
      await expect(profileName).toHaveText("TestUserName TestUserLastName");
    });
  });
});
