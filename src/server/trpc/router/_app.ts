// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./protected-example-router";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
