import { Page } from "@playwright/test";

export default class PaginaLogin {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visitar() {
    await this.page.goto("/");
  }
}