import { test, expect } from "@playwright/test";

test.describe("Página Inicial", () => {
  test("Deve visitar a página inicial", async ({page}) => {
    await page.goto("http://localhost:4200");
    await expect(page).toHaveTitle("Jornada Milhas");
  });
});