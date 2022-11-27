// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { cartRouter } from "./cart";
import { checkoutRouter } from "./checkout";
import { productRouter } from "./product";
import { authRouter } from "./protected-example-router";
import { recipeRouter } from "./recipe";
import { userRouter } from "./user";
import { workshopRouter } from "./workshop";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  cart: cartRouter,
  checkout: checkoutRouter,
  product: productRouter,
  recipe: recipeRouter,
  workshop: workshopRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
