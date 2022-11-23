/**
 * Integration test example for the `post` router
 */
import { TRPCError } from "@trpc/server";

import { prismaMock } from "../../db/singleton";
import { createContextInner } from "../context";
import { appRouter } from "./_app";

test("Probando jest con mocking de Prisma", async () => {
  // Arrange
  const ctxMock = await createContextInner({
    session: { user: { id: "1" }, expires: "" },
  });

  ctxMock.prisma = prismaMock;

  const caller = appRouter.createCaller(ctxMock);

  // Act
  const secreteMessage = await caller.auth.getSecretMessage();
  const session = await caller.auth.getSession();

  // Assert
  expect(session?.user?.id).toEqual("1");
  expect(secreteMessage).toEqual(
    "You are logged in and can see this secret message!",
  );
});

test("Probando jest con mocking de Prisma 2", async () => {
  // Arrange
  const ctxMock = await createContextInner({ session: null });

  ctxMock.prisma = prismaMock;

  const caller = appRouter.createCaller(ctxMock);

  // Act
  await expect(caller.auth.getSecretMessage()).rejects.toThrow(TRPCError);

  const session = await caller.auth.getSession();

  // Assert
  expect(session?.user?.id).toEqual(undefined);
});
