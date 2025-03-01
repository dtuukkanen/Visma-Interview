import { test, expect } from "@playwright/test";

test("Visma Interview", async ({ page }) => {
  // Website URL
  const url = "https://www.amazon.com/";
  const searchTerm = "Nikon";
  const expectedTitle = "Nikon D3X";

  // Open the page
  await page.goto(url);

  // Search for Nikon
  const search = await page.waitForSelector("#twotabsearchtextbox");
  await search.fill(searchTerm);
  await page.click("#nav-search-submit-button");

  // Wait for sorting dropdown to be available
  await page.waitForSelector("#a-autoid-0-announce");
  await page.click("#a-autoid-0-announce");

  // Wait for dropdown options to appear and select 'Price: High to Low'
  await page.waitForSelector("a#s-result-sort-select_2");
  await page.click("a#s-result-sort-select_2");

  // Select and click the second product in the results
  const secondResult = page.locator("[data-component-type='s-search-result']").nth(1);
  await secondResult.scrollIntoViewIfNeeded();
  // Find the link inside the second result
  const secondResultLink = secondResult.locator("h2 a.a-link-normal, span[data-component-type='s-product-image'] a").first()
  await secondResultLink.click();

  // Get and verify product title
  const productTitle = await page.locator("#productTitle").innerText();
  expect(productTitle.trim()).toContain(expectedTitle);
});
