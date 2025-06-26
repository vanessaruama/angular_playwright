import { Locator, Page, expect } from "@playwright/test";

export default class PaginaPrincipal {
  private readonly page: Page;
  private readonly botaoSomenteIda: Locator;
  private readonly botaoAbrirModalPassageiros: Locator;
  private readonly botaoIncrementarAdultos: Locator;
  private readonly botaoIncrementarCriancas: Locator;
  private readonly botaoIncrementarBebes: Locator;
  private readonly botaoFecharModalPassageiros: Locator;
  private readonly campoDropdownOrigem: Locator;
  private readonly campoDropdownDestino: Locator;
  private readonly campoDataIda: Locator;
  private readonly botaoBuscarPassagens: Locator;
  private readonly textoIdaVolta: Locator;
  private readonly containerOrigem: Locator;
  private readonly containerDestino: Locator;
  private readonly botaoComprar: Locator;
  private readonly textoDataIda: Locator;
  private readonly menorPreco: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botaoSomenteIda = page.getByTestId('botao-somente-ida');

    this.botaoAbrirModalPassageiros = page.getByTestId('abrir-modal-passageiros');
    this.botaoIncrementarAdultos = page
      .getByTestId('seletor-passageiro-adultos')
      .getByRole('button', { name: 'adição' });
    this.botaoIncrementarCriancas = page
      .getByTestId('seletor-passageiro-criancas')
      .getByRole('button', { name: 'adição' });
    this.botaoIncrementarBebes = page
      .getByTestId('seletor-passageiro-bebes')
      .getByRole('button', { name: 'adição' });

    this.botaoFecharModalPassageiros = page.getByTestId('fechar-modal-passageiros');

    this.campoDropdownOrigem = page
      .getByTestId('campo-dropdown-origem')
      .getByLabel('Origem');
    this.campoDropdownDestino = page
      .getByTestId('campo-dropdown-destino')
      .getByLabel('Destino');

    this.campoDataIda = page.getByTestId('campo-data-ida');
    this.botaoBuscarPassagens = page.getByTestId('botao-buscar-passagens');

    this.textoIdaVolta = page.getByTestId('texto-ida-volta');
    this.containerOrigem = page.getByTestId('container-origem');
    this.containerDestino = page.getByTestId('container-destino');
    this.botaoComprar = page.getByTestId('botao-comprar');
    this.textoDataIda = page.getByTestId('texto-data-ida');

    this.menorPreco = page.getByText('Menor preço');
  }

  async visitar() {
    await this.page.goto("/");
  }

  async definirSomenteIda() {
    await this.botaoSomenteIda.click();
  }

  async abrirModalPassageiros() {
    await this.botaoAbrirModalPassageiros.click();
  }

  async definirPassageirosAdultos(quantidade: number) {
    for (let i = 1; i < quantidade; i++) {
      await this.botaoIncrementarAdultos.click();
    }
  }

  async definirPassageirosCriancas(quantidade: number) {
    for (let i = 0; i < quantidade; i++) {
      await this.botaoIncrementarCriancas.click();
    }
  }

  async definirPassageirosBebes(quantidade: number) {
    for (let i = 0; i < quantidade; i++) {
      await this.botaoIncrementarBebes.click();
    }
  }

  async fecharModalPassageiros() {
    await this.botaoFecharModalPassageiros.click();
  }

  async definirOrigemEDestino(origem: string, destino: string) {
    await this.campoDropdownOrigem.fill(origem);
    await this.campoDropdownOrigem.press('Enter'); // Simula a tecla Enter
    await this.campoDropdownDestino.fill(destino);
    await this.campoDropdownDestino.press('Enter');
  }

  async definirDataIda(data: Date) {
    const dataFormatada = data.toLocaleDateString('en-US', { dateStyle: 'short'}); //formata a data para o formato MM/DD/AAAA
    await  this.campoDataIda.fill(dataFormatada);
  }

  async buscarPassagens() {
    await this.botaoBuscarPassagens.click();
  }

  async estaMostrandoPassagem(
    tipoTrajeto: 'Somente ida' | 'Ida e Volta',
    origem: string,
    destino: string,
    dataIda: Date,
    menorPreco: string
  ) {
    const dataIdaExibicao = this.obterDataExibicao(dataIda);

    await expect(this.textoIdaVolta).toHaveText(tipoTrajeto, {timeout: 10000});
    await expect(this.containerOrigem).toContainText(origem);
    await expect(this.containerDestino).toContainText(destino);
    await expect(this.botaoComprar).toBeVisible();
    await expect(this.textoDataIda).toHaveText(dataIdaExibicao);
    await expect(this.menorPreco).toContainText(menorPreco);
  }

  private obterDataExibicao(data: Date) {
    return data.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit' });
  }
}
