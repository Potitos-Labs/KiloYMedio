// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./protected-example-router";

export const appRouter = router({
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
