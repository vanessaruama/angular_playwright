import { test } from "@playwright/test";
import PaginaPrincipal from "./page-objects/PaginaPrincipal";

test.describe("Buscar Passagens", () => {
  test("Deve buscar passagens de somente ida", async ({ page }) => {
    const paginaPrincipal = new PaginaPrincipal(page);

    await paginaPrincipal.visitar();
  });
});