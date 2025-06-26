import { Locator, Page, expect } from "@playwright/test";
import { formatarDataParaForm } from "e2e/operacoes/datas";

export default class PaginaCadastro {
  private readonly page: Page;
  private readonly botaoVisitarPaginaCadastro: Locator;
  private readonly inputNome: Locator;
  private readonly inputDataNascimento: Locator;
  private readonly inputCpf: Locator;
  private readonly inputCidade: Locator;
  private readonly inputTelefone: Locator;
  private readonly inputEstado: Locator;
  private readonly inputEmail: Locator;
  private readonly inputSenha: Locator;
  private readonly inputConfirmarEmail: Locator;
  private readonly inputConfirmarSenha: Locator;
  private readonly botaoSubmeterForm: Locator;
  private readonly checkboxTermos: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.botaoVisitarPaginaCadastro = page.getByTestId('header-botao-cadastre-se');

    this.inputNome = page.getByTestId('form-base-input-nome');
    this.inputDataNascimento = page.getByTestId('form-base-input-data-nascimento');
    this.inputCpf = page.getByTestId('form-base-input-cpf');
    this.inputCidade = page.getByTestId('form-base-input-cidade');
    this.inputTelefone = page.getByTestId('form-base-input-telefone');

    this.inputEstado = page
        .getByTestId('form-base-container-estado')
        .getByLabel('Estado');

    this.inputEmail = page.getByTestId('form-base-input-email');
    this.inputSenha = page.getByTestId('form-base-input-senha');
    this.inputConfirmarEmail = page.getByTestId('form-base-input-confirmar-email');
    this.inputConfirmarSenha = page.getByTestId('form-base-input-confirmar-senha');

    this.botaoSubmeterForm = page.getByTestId('form-base-botao-submeter-form');
    this.checkboxTermos = page
      .getByTestId('form-base-checkbox-termos')
      .getByLabel('Li e aceito os termos e condições deste cadastro');
  }

  async visitar() {
    await this.page.goto("/");
    await this.botaoVisitarPaginaCadastro.click();
    await expect(this.page).toHaveURL("/auth/cadastro");
  }

  async estaMostrandoMensagemDeErro(mensagem: string) {
    const elementoErro = this.page.getByText(mensagem);
    await expect(elementoErro).toBeVisible(); 
  }

  async definirNome(nome: string) {
    await this.inputNome.fill(nome);
  }

  async definirDataNascimento(data: Date) {
    const dataFormatada = formatarDataParaForm(data);
    await this.inputDataNascimento.fill(dataFormatada);
  }

  async definirCpf(cpf: string) {
    await this.inputCpf.fill(cpf);
  }

  async definirCidade(cidade: string) {
    await this.inputCidade.fill(cidade);
  }
  
  async definirEstado(estado: string) {
    await this.inputEstado.selectOption(estado);
    await this.inputEstado.press('Enter');
  }

  async definirTelefone(telefone: string) {
    await this.inputTelefone.fill(telefone);
  }

  async definirEmail(email: string) {
    await this.inputEmail.fill(email);
  }

  async confirmarEmail(email: string) {
    await this.inputConfirmarEmail.fill(email);
  }

  async definirSenha(senha: string) {
    await this.inputSenha.fill(senha);
  }

  async confirmarSenha(senha: string) {
    await this.inputConfirmarSenha.fill(senha);
  }

  async confirmarTermos() {
    await this.checkboxTermos.check();
  }

}