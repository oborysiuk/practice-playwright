import { test, expect } from "../fixtures/userGaragePage";

test.describe("Garage page with fixture", () => {
  test("Add BMW X5 to Garage", async ({ userGaragePage }) => {
    await userGaragePage.addNewCar("BMW", "X5", "333");
    await userGaragePage.verifyLastAddedCarName("BMW X5");
  });

  test("Add Audi A6 to Garage", async ({ userGaragePage }) => {
    await userGaragePage.addNewCar("Audi", "A6", "111");
    await userGaragePage.verifyLastAddedCarName("Audi A6");
  });
});