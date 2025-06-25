import {test} from "./page-objects/PaginaLogin";

test.describe("Página de Login", () => {
  test("Deve conseguir fazer login com email e senha válidos", async ({ paginaLogin }) => {
    await paginaLogin.fazerLogin("ruama@gmail.com", "1234");
    await paginaLogin.loginFeitoComSucesso();
  });

  test("Não deve conseguir fazer login com email não cadastrado", async ({ paginaLogin }) => {
    await paginaLogin.fazerLogin("v.ruama@gmail.com", "1234");
    await paginaLogin.estaMostrandoMensagemDeErro("Você não está autorizado a acessar este recurso");
  });

  test("Não deve conseguir fazer login com email inválido", async ({ paginaLogin }) => {
    await paginaLogin.emailInvalido("v.ruama", "1234", "E-mail inválido");
  });

  test("Verificar mensagem de erro ao deixar um campo em branco", async ({ paginaLogin }) => {
    await paginaLogin.campoSenhaVazio("v.ruama@gmail.com", "Senha é obrigatória");
  });
});