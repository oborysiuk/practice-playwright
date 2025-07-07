import test from "@playwright/test";
import HomePage from "../../ pom/page/HomePage";
import SignInForm from "../../ pom/form/SignInForm";
import { userList } from "../../test-data/users";
import GaragePage from "../../ pom/page/GaragePage";

let homepage: HomePage;
let signInForm: SignInForm;
let garagePage: GaragePage;

test.describe("Login & save the state", () => {
  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);
    await homepage.open();
    await homepage.openSignInForm();
  });

  test("Successful SignIn", async ({ page }) => {
    await signInForm.makeLoggingIn(
      userList.mainUser.email,
      userList.mainUser.password
    );
    await garagePage.verifyGaragePageIsOpened();
    await page
      .context()
      .storageState({ path: "test-data/states/mainUserState.json" });
  });
});
