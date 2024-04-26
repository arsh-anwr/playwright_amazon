import { test, expect } from "@playwright/test";
import { AmazonHomePage } from "../pages/home-page";

test("Enter input for search and click on search button and validate if we get the appropriate product", async ({
  page,
}) => {
  const amazonHomePage = new AmazonHomePage(page);

  await amazonHomePage.goto();
  await amazonHomePage.enterProductNameForSearch("MacBook Air");
  await amazonHomePage.searchProduct();
  await expect(page.locator("span.a-size-medium").nth(2)).toContainText(
    "MacBook Air"
  );
});

test("Search empty string and it should land back to the home page", async ({
  page,
}) => {
  const amazonHomePage = new AmazonHomePage(page);

  await amazonHomePage.goto();
  await amazonHomePage.enterProductNameForSearch("");
  await amazonHomePage.searchProduct();
  await expect(page.locator('div[id="desktop-banner"]')).toBeVisible();
});

test("by typing a single and then two character user should be able to get suggestions and updated suggestions", async ({
  page,
}) => {
  const amazonHomePage = new AmazonHomePage(page);

  await amazonHomePage.goto();
  await amazonHomePage.enterProductNameForSearch("m");
  await checkSearchSuggestions(page.locator("div.s-suggestion"), "m");

  await amazonHomePage.enterProductNameForSearch("ma");
  await checkSearchSuggestions(page.locator("div.s-suggestion"), "ma");

});

test("Enter a product name and select from suggestion", async ({
  page,
}) => {
  const amazonHomePage = new AmazonHomePage(page);

  await amazonHomePage.goto();
  await amazonHomePage.enterProductNameForSearch("MacBook Air");
  await amazonHomePage.clickOnFirstSuggestedSearch();

  await expect(page.locator("span.a-size-medium").nth(2)).toContainText(
    "MacBook Air"
  );
});

const checkSearchSuggestions = async (locator: any, text: string) => {
  const elementsCount = await locator.count();

  for (var index = 0; index < elementsCount; index++) {
    await expect(locator.nth(index)).toContainText(text);
  }
};
