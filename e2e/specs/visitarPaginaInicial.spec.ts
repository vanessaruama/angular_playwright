import { test, expect } from "@playwright/test";

test.describe("Página Inicial", () => {
  test("Deve visitar a página inicial", async ({page}) => {
    //sempre utilizar o async/await para ações assíncronas
    await page.goto("/"); //ação de navegação
    await expect(page).toHaveTitle("Jornada Milhas"); //asserção

    // const tituloPassagens = page.getByRole("heading", { name: "Passagens" }); //getByRole é usado para selecionar elementos com base no seu papel (role) e nome
    const tituloPassagens = page.getByTestId('titulo-passagens'); //getByTestId é usado para selecionar elementos com base no atributo data-testid
    await expect(tituloPassagens).toBeVisible(); //verifica se o título está visível

    // const tituloPromocoes = page.getByRole("heading", { name: "Promoções" });
    const tituloPromocoes = page.getByTestId('titulo-promocoes');
    await expect(tituloPromocoes).toBeVisible();

    // const tituloDepoimentos = page.getByRole("heading", { name: "Depoimentos" });
    const tituloDepoimentos = page.getByTestId('titulo-depoimentos');
    await expect(tituloDepoimentos).toBeVisible();
  });
});