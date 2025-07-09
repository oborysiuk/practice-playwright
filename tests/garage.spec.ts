import { test, expect } from "@playwright/test";
import GaragePage from "../ pom/page/GaragePage";
let garagePage: GaragePage;

test.describe("Garage Page tests", () => {
  test.use({ storageState: "test-data/states/mainUserState.json" });
  test.beforeEach(async ({ page }) => {
    garagePage = new GaragePage(page);
    await garagePage.open();
  });

  test("Add BMW X5 to Garage", async () => {
    await garagePage.addNewCar("BMW", "X5", "333");
    await garagePage.verifyLastAddedCarName("BMW X5");
  });

  test("Add Audi A6 to Garage", async () => {
    await garagePage.addNewCar("Audi", "A6", "111");
    await garagePage.verifyLastAddedCarName("Audi A6");
  });
});
