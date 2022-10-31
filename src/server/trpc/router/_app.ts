// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { cartRouter } from "./cart";
import { checkoutRouter } from "./checkout";
import { productRouter } from "./product";
import { authRouter } from "./protected-example-router";
import { recipeRouter } from "./recipe";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  cart: cartRouter,
  checkout: checkoutRouter,
  product: productRouter,
  recipe: recipeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
