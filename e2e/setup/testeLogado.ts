import * as path from "path";
import * as fs from "fs";
import { test } from "./fixtures";
import PaginaCadastro from "e2e/page-objects/PaginaCadastro";
import { gerarPerfil } from "e2e/operacoes/gerarPerfil";
import { expect } from "@playwright/test";
import PaginaLogin from "e2e/page-objects/PaginaLogin";

export const testeLogado = test.extend<object, { arquivoInfoLogin: string}>({
  arquivoInfoLogin: [async ({ browser }, use) => {
    const id = test.info().parallelIndex;
    const caminhoArquivo = path.resolve(test.info().project.outputDir, `.auth/usuario-${id}.json`);

    if (fs.existsSync(caminhoArquivo)) {
      await use(caminhoArquivo);
      return;
    }

    const page = await browser.newPage({storageState: undefined}); //Cria uma nova página sem estado de armazenamento
    const paginaCadastro = new PaginaCadastro(page);
    const paginaLogin = new PaginaLogin(page);
    const novoUsuario = gerarPerfil();

    //Não leva em conta o baseUrl do playwright.config.ts, por isso é necessário informar a URL manualmente
    await page.goto("http://localhost:4200/auth/cadastro");

    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await expect(page).toHaveURL("http://localhost:4200/auth/login");

    await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha);
    await expect(page).toHaveURL("http://localhost:4200/home");

    await page.context().storageState({ path: caminhoArquivo});

    await use(caminhoArquivo);
    await page.close();
    
  }, {scope: "worker"}],
  storageState: ({ arquivoInfoLogin}, use) => use(arquivoInfoLogin)
});