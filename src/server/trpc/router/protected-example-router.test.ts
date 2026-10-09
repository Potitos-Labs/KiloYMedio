import { appRouter } from "./_app";
import { createContextInner } from "../context";

test("unauthenticated visitors cannot read the protected endpoint", async () => {
  const caller = appRouter.createCaller(
    await createContextInner({ session: null }),
  );
  await expect(caller.auth.getSecretMessage()).rejects.toMatchObject({
    code: "UNAUTHORIZED",
  });
});

test("a signed in client can read the protected endpoint", async () => {
  const caller = appRouter.createCaller(
    await createContextInner({
      session: { user: { id: "1", role: "client" }, expires: "" },
    }),
  );
  expect(await caller.auth.getSecretMessage()).toBe(
    "you can now see this secret message!",
  );
});
