// src/server/trpc/router/_app.ts
import { router } from "../trpc";

export const appRouter = router({});

// export type definition of API
export type AppRouter = typeof appRouter;
