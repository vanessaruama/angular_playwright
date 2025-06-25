import { test, expect } from "@playwright/test";
import PaginaLogin from "./page-objects/PaginaLogin";

test.describe("Página de Login", () => {
  test("Deve conseguir fazer login com email e senha válidos", async ({ page }) => {
    const paginaLogin = new PaginaLogin(page);

    await paginaLogin.visitar();
    await paginaLogin.fazerLogin("ruama@gmail.com", "1234");
    await paginaLogin.loginFeitoComSucesso();
  });
});