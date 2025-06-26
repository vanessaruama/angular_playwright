import { defineConfig } from "@playwright/test";
import { gerarPerfil, Perfil } from "e2e/operacoes/gerarPerfil";
import { test } from "e2e/setup/fixtures";

export default defineConfig({
  timeout: 80000 //Define um tempo maior para o teste, caso necessário, aqui rodou em 55 segundos
});

test.describe("Página de Cadastro", () => {
  let novoUsuario: Perfil;
  test.beforeEach(async ({ paginaCadastro }) => {
    await paginaCadastro.visitar();
    
    novoUsuario = gerarPerfil();
  });

  test("Deve conseguir fazer cadastro", async ({ paginaCadastro }) => {
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();
  });

  test("Não deve conseguir fazer cadastro com email duplicado", async ({ paginaCadastro }) => {
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();

    await paginaCadastro.visitar();
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.estaMostrandoMensagemDeErro("E-mail já utilizado");
  });
});