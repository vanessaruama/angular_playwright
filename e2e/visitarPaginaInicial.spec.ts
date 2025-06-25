import { test, expect } from "@playwright/test";

test.describe("Página Inicial", () => {
  test("Deve visitar a página inicial", async ({page}) => {
    //sempre utilizar o async/await para ações assíncronas
    await page.goto("http://localhost:4200"); //ação de navegação
    await expect(page).toHaveTitle("Jornada Milhas"); //asserção

    const tituloPassagens = page.getByRole("heading", { name: "Passagens" });
    await expect(tituloPassagens).toBeVisible(); //verifica se o título está visível

    const tituloPromocoes = page.getByRole("heading", { name: "Promoções" });
    await expect(tituloPromocoes).toBeVisible(); //verifica se o título está visível

    const tituloDepoimentos = page.getByRole("heading", { name: "Depoimentos" });
    await expect(tituloDepoimentos).toBeVisible(); //verifica se o título está visível
  });
});