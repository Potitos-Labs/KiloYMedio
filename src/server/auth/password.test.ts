import { hashPassword, verifyPassword } from "./password";

test("passwords are salted and reject incorrect or old plaintext credentials", async () => {
  const password = "DemoPassword12";
  const first = await hashPassword(password);
  expect(first).not.toContain(password);
  expect(await hashPassword(password)).not.toBe(first);
  expect(await verifyPassword(password, first)).toBe(true);
  expect(await verifyPassword("wrong", first)).toBe(false);
  expect(await verifyPassword(password, password)).toBe(false);
  expect(await verifyPassword(password, null)).toBe(false);
});
