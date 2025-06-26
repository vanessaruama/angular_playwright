import { gerarPerfil } from "e2e/operacoes/gerarPerfil";
import { test } from "e2e/setup/fixtures";

test.describe("Página de Cadastro", () => {
  test("Deve conseguir fazer cadastro", async ({ paginaCadastro }) => {
    test.setTimeout(90000); //Define um tempo maior para o teste, caso necessário, aqui rodou em 55 segundos
    await paginaCadastro.visitar();
    
    const novoUsuario = gerarPerfil();
    
    await paginaCadastro.visitar();
    await paginaCadastro.definirNome(novoUsuario.nome);
    await paginaCadastro.definirDataNascimento(novoUsuario.dataNascimento);
    await paginaCadastro.definirGenero(novoUsuario.genero);
    await paginaCadastro.definirCpf(novoUsuario.cpf);
    await paginaCadastro.definirTelefone(novoUsuario.telefone);
    await paginaCadastro.definirCidade(novoUsuario.cidade);
    await paginaCadastro.definirEstado(novoUsuario.estado);

    await paginaCadastro.definirEmail(novoUsuario.email);
    await paginaCadastro.confirmarEmail(novoUsuario.email);
    await paginaCadastro.definirSenha(novoUsuario.senha);
    await paginaCadastro.confirmarSenha(novoUsuario.senha);
    await paginaCadastro.confirmarTermos();
    await paginaCadastro.submeterForm();
    await paginaCadastro.cadastroFeitoComSucesso();
  });
});