import { gerarPerfil, Perfil } from "e2e/operacoes/gerarPerfil";
import { test } from "e2e/setup/fixtures";

test.describe("Página de Cadastro", () => {
  let novoUsuario: Perfil;
  test.beforeEach(async ({ paginaCadastro }) => {
    await paginaCadastro.visitar();
    
    novoUsuario = gerarPerfil();
  });

  test("Deve conseguir fazer cadastro", async ({ paginaCadastro }) => {
    test.setTimeout(90000); //Tive que aumentar pois o teste estava demorando mais de 30 segundos para ser executado

    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();
  });

  test("Não deve conseguir fazer cadastro com email duplicado", async ({ paginaCadastro }) => {
    test.setTimeout(90000);

    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();

    await paginaCadastro.visitar();
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.estaMostrandoMensagemDeErro("E-mail já utilizado");
  });
});