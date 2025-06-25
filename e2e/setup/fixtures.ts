import { test as base } from "@playwright/test";
import PaginaLogin from "../page-objects/PaginaLogin";
import PaginaPrincipal from "e2e/page-objects/PaginaPrincipal";

export const test = base.extend<{ 
  paginaLogin: PaginaLogin,
  paginaPrincipal: PaginaPrincipal
}>({
  paginaLogin: async ({page}, use) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.visitar(); //Visita a página de login antes de cada teste
    await use(paginaLogin); //Passa a instância da página de login para os testes
  },
  paginaPrincipal: async ({page}, use) => {
    const paginaPrincipal = new PaginaPrincipal(page);
    await paginaPrincipal.visitar();
    await use(paginaPrincipal);
  }
});