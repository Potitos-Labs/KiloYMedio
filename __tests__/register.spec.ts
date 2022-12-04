import { test, expect } from "@playwright/test";
import { getClientTrpcMock } from "../src/utils/trpcMock";

test("noErrors", async ({ page }) => {
  const trpcClient = await getClientTrpcMock("admin");
  await trpcClient.user.delete({ clientEmail: "panchito@mandefua.com" });

  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("Panchito Mandefua");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("panchito@mandefua.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd123");

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd123");

  await page.getByRole("button", { name: "Crear cuenta" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  // await expect(page).toHaveURL("http://localhost:3000/profile");
});

test("errorNameLength", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("a");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("sandra@potitos.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd123");

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd123");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await page.getByText("El nombre tiene que tener como mínimo 3 carácteres");
});

test("errorsNameNumber", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("Sandra2");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("sandra@potitos.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd123");

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd123");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await page.getByText("Este campo no puede contener números");
});

test("errorInvalidEmail", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("Sandra");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("sandra@potitos");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd123");

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd123");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await page.getByText("Introduce un correo válido");
});

test("errorExistentEmail", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("Sandra");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("sandra@potitos.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd123");

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd123");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await page.getByText("El email ya está siendo usado");
});

test("errorPassword", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("Sandra");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("sandra@potitos.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd");

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await page.getByText(
    "La contraseña debe tener como mínimo una longitud de 6, una minúscula y un número",
  );
});

test("errorPasswordMatch", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "registrarse" }).first().click();
  await expect(page).toHaveURL("http://localhost:3000/register");

  await page.getByPlaceholder("Nombre").click();

  await page.getByPlaceholder("Nombre").fill("Sandra");

  await page.getByPlaceholder("E-mail").click();

  await page.getByPlaceholder("E-mail").fill("sandra@potitos.com");

  await page.getByRole("textbox", { name: "Contraseña" }).click();

  await page.getByRole("textbox", { name: "Contraseña" }).fill("abcd123");

  await page.getByPlaceholder("Repetir contraseña").click();

  await page.getByPlaceholder("Repetir contraseña").fill("abcd1234567");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await page.getByText("Las contraseñas no coinciden");
});
