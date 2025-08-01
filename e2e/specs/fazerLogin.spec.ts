import { gerarPerfil } from "e2e/operacoes/gerarPerfil";
import {test} from "../setup/fixtures";

test.describe("Página de Login", () => {

  test("Deve conseguir fazer login com email e senha válidos", async ({ paginaLogin, paginaCadastro  }) => {
    test.setTimeout(90000);
    
    await paginaCadastro.visitar();
    const novoUsuario = gerarPerfil();

    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadastroFeitoComSucesso();

    await paginaLogin.visitar();
    await paginaLogin.fazerLogin("ruama@gmail.com", "1234");
    await paginaLogin.loginFeitoComSucesso();
  });

  test("Não deve conseguir fazer login com email não cadastrado", async ({ paginaLogin }) => {
    paginaLogin.visitar();
    await paginaLogin.fazerLogin("v.ruama.error@gmail.com", "1234");
    await paginaLogin.estaMostrandoMensagemDeErro("Você não está autorizado a acessar este recurso");
  });

  test("Não deve conseguir fazer login com email inválido", async ({ paginaLogin }) => {
    paginaLogin.visitar();
    await paginaLogin.emailInvalido("v.ruama", "1234", "E-mail inválido");
  });

  test("Verificar mensagem de erro ao deixar um campo em branco", async ({ paginaLogin }) => {
    paginaLogin.visitar();
    await paginaLogin.campoSenhaVazio("v.ruama@gmail.com", "Senha é obrigatória");
  });
});