import { Locator, Page, expect } from "@playwright/test";
import { formatarDataParaForm } from "e2e/operacoes/datas";
import { Genero } from "e2e/operacoes/gerarPerfil";

export default class PaginaCadastro {
  private readonly page: Page;
  private readonly botaoVisitarPaginaCadastro: Locator;
  private readonly inputNome: Locator;
  private readonly inputDataNascimento: Locator;
  private readonly radioGenero: { [chave in Genero]: Locator };
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

    const radioGeneroFeminino = page
      .getByTestId('form-base-radio-genero-feminino')
      .getByLabel('Feminino');

    const radioGeneroMasculino = page
      .getByTestId('form-base-radio-genero-masculino')
      .getByLabel('Masculino');

    const radioGeneroOutro = page
      .getByTestId('form-base-radio-genero-nao-informar')
      .getByLabel('Prefiro não informar'); 

    this.radioGenero = {
      [Genero.FEMININO]: radioGeneroFeminino,
      [Genero.MASCULINO]: radioGeneroMasculino,
      [Genero.OUTRO]: radioGeneroOutro
    }; //Mapeamento para informar o gênero selecionado

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

  async definirGenero(genero: Genero) {
    const radioGenero = this.radioGenero[genero];
    await radioGenero.check();
  }

  async definirCpf(cpf: string) {
    await this.inputCpf.fill(cpf);
  }

  async definirCidade(cidade: string) {
    await this.inputCidade.fill(cidade);
  }
  
  async definirEstado(estado: string) {
    await this.inputEstado.fill(estado);
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

  async submeterForm() {
    await this.botaoSubmeterForm.click();
  }

  async cadastroFeitoComSucesso() {
    await expect(this.page).toHaveURL("/auth/login");
  }

}