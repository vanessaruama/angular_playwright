import { gerarPerfil, Perfil } from "e2e/operacoes/gerarPerfil";
import { test } from "e2e/setup/fixtures";

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