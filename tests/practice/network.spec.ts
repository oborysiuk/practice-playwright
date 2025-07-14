import test from "@playwright/test";
import GaragePage from "../../ pom/page/GaragePage";
import SignInForm from "../../ pom/form/SignInForm";
import HomePage from "../../ pom/page/HomePage";
import { userList } from "../../test-data/users";
import { expect } from "@playwright/test";
let homepage: HomePage;
let signInForm: SignInForm;
let garagePage: GaragePage;

test.describe("Mocking request", () => {
  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);
  });

  test("Mock user name", async ({ page }) => {
    await page.route("**/api/users/profile", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: "ok",
          data: {
            userId: 226601,
            photoFilename: "default-user.png",
            name: "Polar",
            lastName: "Bear",
          },
        }),
      })
    );
    await homepage.open();
    await homepage.openSignInForm();
    await signInForm.makeLoggingIn(
      userList.mainUser.email,
      userList.mainUser.password
    );
    await garagePage.openUserProfile();
    await page.waitForTimeout(3000);

    await garagePage.verifyUserProfileData("Polar", "Bear");
  });
});

test.describe("API tests", () => {
  test.describe("/api/cars tests", () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
      const authRequest = await request.post("/api/auth/signin", {
        data: {
          email: userList.mainUser.email,
          password: userList.mainUser.password,
          remember: false,
        },
      });
      sid = authRequest.headers()["set-cookie"].split(";")[0];
      expect(sid).not.toBeUndefined();
    });

    test("Get cars [/api/cars/]", async ({ request }) => {
      const response = await request.get("/api/cars/", {
        headers: {
          Cookie: sid,
        },
      });
      const body = await response.json();
      expect(response.status()).toBe(200);
    });

    test("Add new car Ford Focus [/api/cars/]", async ({ request }) => {
      const response = await request.post("/api/cars/", {
        headers: {
          Cookie: sid,
        },
        data: {
          carBrandId: 3,
          carModelId: 12,
          mileage: 122,
        },
      });
      const body = await response.json();
      expect(response.status()).toBe(201);
      expect(body.data.carBrandId).toBe(3);
      expect(body.data.carModelId).toBe(12);
      expect(body.data.mileage).toBe(122);
    });

    test("Adding car with unknown id [/api/cars/]", async ({ request }) => {
      const response = await request.post("/api/cars/", {
        headers: {
          Cookie: sid,
        },
        data: {
          carBrandId: 300,
          carModelId: 12,
          mileage: 122,
        },
      });
      const body = await response.json();
      expect(response.status()).toBe(404);
      expect(body.status).toBe("error");
      expect(body.message).toBe("Brand not found");
    });

    test("Adding too big mileage value [/api/cars/]", async ({ request }) => {
      const response = await request.post("/api/cars/", {
        headers: {
          Cookie: sid,
        },
        data: {
          carBrandId: 3,
          carModelId: 12,
          mileage: 122120020,
        },
      });
      const body = await response.json();
      expect(response.status()).toBe(400);
      expect(body.status).toBe("error");
      expect(body.message).toBe("Mileage has to be from 0 to 999999");
    });
  });
});
