import { test, expect } from "@playwright/test";
import { beforeEach, describe } from "node:test";
import HomePage from "../ pom/page/HomePage";
import SignUpForm from "../ pom/form/SignUpForm";
import GaragePage from "../ pom/page/GaragePage";
let signUpForm: SignUpForm;
let homePage: HomePage;
let garagePage: GaragePage;

test.describe("POM > registration form validation", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    garagePage = new GaragePage(page);
    await homePage.open();
    await homePage.openSignUpForm();
  });

  test.describe("Name field validation", () => {
    test("Name is required error for empty Name field", async ({ page }) => {
      await signUpForm.triggerEmptyErrorForField("name");
      await signUpForm.verifyErrorIsDisplayed("name", "Name required");
    });

    test("Name is invalid error for Name field wrong data -- numbers", async ({
      page,
    }) => {
      await signUpForm.enterName("1qwerty");
      await signUpForm.verifyErrorIsDisplayed("name", "Name is invalid");
    });

    test("Name is invalid error for Name field wrong data -- symbols", async ({
      page,
    }) => {
      await signUpForm.enterName("!qwerty");
      await signUpForm.verifyErrorIsDisplayed("name", "Name is invalid");
    });

    test("Name is invalid error for Name field wrong data -- not an english symbols", async ({
      page,
    }) => {
      await signUpForm.enterName("!ñqwerty");
      await signUpForm.verifyErrorIsDisplayed("name", "Name is invalid");
    });

    test("Wrong length error for too short Name field value", async ({
      page,
    }) => {
      await signUpForm.enterName("A");
      await signUpForm.verifyErrorIsDisplayed(
        "name",
        "Name has to be from 2 to 20 characters long"
      );
    });

    test("Wrong length error for too long Name field value", async ({
      page,
    }) => {
      await signUpForm.enterName("qwertyuiopqwertyuiopq");
      await signUpForm.verifyErrorIsDisplayed(
        "name",
        "Name has to be from 2 to 20 characters long"
      );
    });

    test("Positive test for Name field with value", async ({ page }) => {
      await signUpForm.enterName("TestUserName");
      await signUpForm.verifyThereIsNoError("name", "Name is invalid");
    });
  });

  test.describe("Last Name field validation", async () => {
    test("Last name is required error for empty Last Name field", async ({
      page,
    }) => {
      await signUpForm.triggerEmptyErrorForField("lastName");
      await signUpForm.verifyErrorIsDisplayed("lastName", "Last name required");
    });

    test("Last name is invalid error for Last Name field wrong data -- numbers", async ({
      page,
    }) => {
      await signUpForm.enterLastName("1qwerty");
      await signUpForm.verifyErrorIsDisplayed(
        "lastName",
        "Last name is invalid"
      );
    });

    test("Last Name is invalid error for Last Name field wrong data -- symbols", async ({
      page,
    }) => {
      await signUpForm.enterLastName("!qwerty");
      await signUpForm.verifyErrorIsDisplayed(
        "lastName",
        "Last name is invalid"
      );
    });

    test("Last Name is invalid error for Last Name field wrong data -- not an english symbols", async ({
      page,
    }) => {
      await signUpForm.enterLastName("ñqwerty");
      await signUpForm.verifyErrorIsDisplayed(
        "lastName",
        "Last name is invalid"
      );
    });

    test("Wrong length error for too short Last Name field value", async ({
      page,
    }) => {
      await signUpForm.enterLastName("A");
      await signUpForm.verifyErrorIsDisplayed(
        "lastName",
        "Last name has to be from 2 to 20 characters long"
      );
    });

    test("Wrong length error for too long Last Name field value", async ({
      page,
    }) => {
      await signUpForm.enterLastName("qwertyuiopqwertyuiopq");
      await signUpForm.verifyErrorIsDisplayed(
        "lastName",
        "Last name has to be from 2 to 20 characters long"
      );
    });

    test("Positive test for Last Name field with value", async ({ page }) => {
      await signUpForm.enterLastName("TestUserLastName");
      await signUpForm.verifyThereIsNoError("lastName", "Last name is invalid");
    });
  });

  test.describe("Email field validation", async () => {
    test("Email required error for empty Email field", async ({ page }) => {
      await signUpForm.triggerEmptyErrorForField("email");
      await signUpForm.verifyErrorIsDisplayed("email", "Email required");
    });

    test("Email is invalid error for Email field wrong data -- without @", async ({
      page,
    }) => {
      await signUpForm.enterEmail("testemailgmail.com");
      await signUpForm.verifyErrorIsDisplayed("email", "Email is incorrect");
    });

    test("Email is invalid error for Email field wrong data -- without dot", async ({
      page,
    }) => {
      await signUpForm.enterEmail("testemail@gmailcom");
      await signUpForm.verifyErrorIsDisplayed("email", "Email is incorrect");
    });

    test("Email is invalid error for Email field wrong data -- without domain", async ({
      page,
    }) => {
      await signUpForm.enterEmail("testemail@.");
      await signUpForm.verifyErrorIsDisplayed("email", "Email is incorrect");
    });

    test("Positive test for Email field with value", async ({ page }) => {
      await signUpForm.enterEmail("testemail123@gmail.com");
      await signUpForm.verifyThereIsNoError("email", "Email is incorrect");
    });
  });

  test.describe("Password field validation", async () => {
    test("Password required error for empty Email field", async ({ page }) => {
      await signUpForm.triggerEmptyErrorForField("password");
      await signUpForm.verifyErrorIsDisplayed("password", "Password required");
    });

    test("Password is invalid error for Password field wrong data -- without integer", async ({
      page,
    }) => {
      await signUpForm.enterPassword("Aqwertyu");
      await signUpForm.verifyErrorIsDisplayed(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("Password is invalid error for Password field wrong data -- without capital letter", async ({
      page,
    }) => {
      await signUpForm.enterPassword("1qwertyu");
      await signUpForm.verifyErrorIsDisplayed(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("Password is invalid error for Password field wrong data -- without small letter", async ({
      page,
    }) => {
      await signUpForm.enterPassword("12345678A");
      await signUpForm.verifyErrorIsDisplayed(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("Password is invalid error for too short Password field value", async ({
      page,
    }) => {
      await signUpForm.enterPassword("Qwerty1");
      await signUpForm.verifyErrorIsDisplayed(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("Password is invalid error for too long Password field value", async ({
      page,
    }) => {
      await signUpForm.enterPassword("Qwerty12Qwerty1234");
      await signUpForm.verifyErrorIsDisplayed(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("Positive test for Password field with value", async ({ page }) => {
      await signUpForm.enterPassword("Password123");
      await signUpForm.verifyThereIsNoError(
        "password",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });
  });

  test.describe("Re-enter password field validation", async () => {
    test("Re-enter password required error for empty Email field", async ({
      page,
    }) => {
      await signUpForm.triggerEmptyErrorForField("repeatPassword");
      await signUpForm.verifyErrorIsDisplayed(
        "repeatPassword",
        "Re-enter password required"
      );
    });

    test("Password is invalid error for Re-enter Password field wrong data -- without integer", async ({
      page,
    }) => {
      await signUpForm.enterRepeatPassword("Aqwertyu");
      await signUpForm.verifyErrorIsDisplayed(
        "repeatPassword",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("Password is invalid error for Re-enter Password field wrong data -- without capital letter", async ({
      page,
    }) => {
      await signUpForm.enterRepeatPassword("1qwertyu");
      await signUpForm.verifyErrorIsDisplayed(
        "repeatPassword",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("Password is invalid error for Re-enter Password field wrong data -- without small letter", async ({
      page,
    }) => {
      await signUpForm.enterRepeatPassword("12345678A");
      await signUpForm.verifyErrorIsDisplayed(
        "repeatPassword",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("Password is invalid error for too short Re-enter Password field value", async ({
      page,
    }) => {
      await signUpForm.enterRepeatPassword("Qwerty1");
      await signUpForm.verifyErrorIsDisplayed(
        "repeatPassword",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("Password is invalid error for too long Re-enter Password field value", async ({
      page,
    }) => {
      await signUpForm.enterRepeatPassword("Qwerty12Qwerty1234");
      await signUpForm.verifyErrorIsDisplayed(
        "repeatPassword",
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    test("Passwords do not match error if passwords do not match", async ({
      page,
    }) => {
      await signUpForm.enterPassword("Password123");
      await signUpForm.enterRepeatPassword("Password1234");
      await signUpForm.verifyErrorIsDisplayed(
        "repeatPassword",
        "Passwords do not match"
      );
    });

    test("Positive test for Password & Re-enter Password fields matching values", async ({
      page,
    }) => {
      await signUpForm.enterPassword("Password123");
      await signUpForm.enterRepeatPassword("Password123");
      await signUpForm.verifyThereIsNoError(
        "repeatPassword",
        "Passwords do not match"
      );
    });
  });

  test.describe("Register button behavior validation", async () => {
    test("Register button is disabled if form is empty", async ({ page }) => {
      await signUpForm.verifyRegisterButtonIsDisabled();
    });

    test("Register button is disabled if Name field is invalid", async ({
      page,
    }) => {
      await signUpForm.fillTheSignUpForm(
        "1qwerty",
        "TestLastName",
        "testemail123@gmail.com",
        "Password123",
        "Password123"
      );
      await signUpForm.verifyRegisterButtonIsDisabled();
    });

    test("Register button is disabled if Last Name field is invalid", async ({
      page,
    }) => {
      await signUpForm.fillTheSignUpForm(
        "TestUserName",
        "12qwerty",
        "testemail123@gmail.com",
        "Password123",
        "Password123"
      );
      await signUpForm.verifyRegisterButtonIsDisabled();
    });

    test("Register button is disabled if Email field is invalid", async ({
      page,
    }) => {
      await signUpForm.fillTheSignUpForm(
        "TestUserName",
        "TestLastName",
        "testemail123@gmailcom",
        "Password123",
        "Password123"
      );
      await signUpForm.verifyRegisterButtonIsDisabled();
    });

    test("Register button is disabled if Password field is invalid", async ({
      page,
    }) => {
      await signUpForm.fillTheSignUpForm(
        "TestUserName",
        "TestLastName",
        "testemail123@gmail.com",
        "password123",
        "Password123"
      );
      await signUpForm.verifyRegisterButtonIsDisabled();
    });

    test("Register button is disabled if Passwords do not match", async ({
      page,
    }) => {
      await signUpForm.fillTheSignUpForm(
        "TestUserName",
        "TestLastName",
        "testemail123@gmail.com",
        "Password123",
        "Password1234"
      );
      await signUpForm.verifyRegisterButtonIsDisabled();
    });

    test("New User Registration", async ({ page }) => {
      await signUpForm.fillTheSignUpForm(
        "TestUserName",
        "TestLastName",
        `olga.borysiuk2012+${Date.now()}@gmail.com`,
        "Password123",
        "Password123"
      );
      await signUpForm.clickOnRegisterButton();
      await garagePage.openUserProfile();
      await garagePage.verifyUserProfileData("TestUserName", "TestLastName");
    });
  });
});
