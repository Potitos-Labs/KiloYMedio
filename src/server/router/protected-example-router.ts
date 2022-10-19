import { createClientProtectedRouter } from "./context";

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedExampleRouter = createClientProtectedRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("getSecretMessage", {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resolve({ ctx }) {
      return "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.";
    },
  });
