import { expect, type Locator, type Page } from "@playwright/test";

export class AmazonHomePage {
  readonly page: Page;
  readonly searchInputLocator: Locator;
  readonly searchButtonLocator: Locator;
  readonly firstSuggestionLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInputLocator = page.locator('input[id="twotabsearchtextbox"]');
    this.searchButtonLocator = page.locator('input[id="nav-search-submit-button"]');
    this.firstSuggestionLocator = page.locator('div.s-suggestion').nth(0);
  }

  async goto() {
    await this.page.goto("https://amazon.in");
  }

  async enterProductNameForSearch(productName: string) {
    await this.searchInputLocator.click();
    await this.searchInputLocator.fill(productName);
  }

  async searchProduct() {
    await this.searchButtonLocator.click();
  }

  async clickOnFirstSuggestedSearch() {
    await this.firstSuggestionLocator.click();
  }
}
