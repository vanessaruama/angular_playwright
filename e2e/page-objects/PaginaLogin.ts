import { Locator, Page, expect } from "@playwright/test";

export default class PaginaLogin {
  private readonly page: Page;
  private readonly botaoLogin: Locator; //Elementos da tela
  private readonly inputEmail: Locator;
  private readonly inputSenha: Locator;
  private readonly botaoAcessarConta: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botaoLogin = page.getByTestId("botao-login");
    this.inputEmail = page.getByTestId("input-email");
    this.inputSenha = page.getByTestId("input-senha");
    this.botaoAcessarConta = page.getByTestId("botao-acessar-conta");
  }

  async visitar() {
    await this.page.goto("/");
    await this.botaoLogin.click(); //Clica no botão de login
    await expect(this.page).toHaveURL("/auth/login"); //Verifica se a URL mudou para /auth/login
  }

  async fazerLogin(email: string, senha: string) {
    await this.inputEmail.fill(email); //Preenche o campo de email
    await this.inputSenha.fill(senha); //Preenche o campo de senha
    await this.botaoAcessarConta.click(); //Clica no botão de acessar conta
  }

  async loginFeitoComSucesso() {
    await expect(this.page).toHaveURL("/home"); //Verifica se a URL voltou para a página inicial
  }

  async estaMostrandoMensagemDeErro(mensagem: string) {
    const elementoErro = this.page.getByText(mensagem); //Capturando de forma dinâmica a mensagem de erro
    await expect(elementoErro).toBeVisible(); //Verifica se a mensagem de erro está visível
  }
}