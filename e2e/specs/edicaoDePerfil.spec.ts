import { test } from "e2e/setup/fixtures";
import { testeLogado } from "e2e/setup/testeLogado";

testeLogado.describe("Pagina de perfil", () => {
  testeLogado("Editar perfil 1", async ({paginaPrincipal}) => {
    test.setTimeout(90000);

    await paginaPrincipal.visitar();
  });

  testeLogado("Editar perfil 2", () => {
    test.setTimeout(90000);
  });
});