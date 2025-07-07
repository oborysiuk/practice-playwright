import { test as base, expect } from "@playwright/test";
import GaragePage from "../ pom/page/GaragePage";

type MyFixtures = {
  userGaragePage: GaragePage;
};

export const test = base.extend<MyFixtures>({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "test-data/states/mainUserState.json",
    });
    const page = await context.newPage();
    const garagePage = new GaragePage(page);

    await garagePage.open();
    await garagePage.verifyGaragePageIsOpened();
    await use(garagePage);

    await page.close();
    await context.close();
  },
});

export { expect };
