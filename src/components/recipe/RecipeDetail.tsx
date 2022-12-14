import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import AllergensComponent from "@components/Allergens";

import DotMenu from "../DotMenu";
import SaveIcon from "./SaveIcon";
import Loading from "@components/ui/Loading";
import Product from "@components/product/Product";
import CommentSection from "./comments/CommentSection";

import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IRecipe } from "@utils/validations/recipe";
import { motion, PanInfo, useAnimation } from "framer-motion";

const RecipeDetail = ({ recipe }: { recipe: IRecipe }) => {
  const controls = useAnimation();

  const ingredients = recipe?.RecipeIngredient;
  const directions = recipe?.directions;
  const { data: units } = trpc.recipe.getIngredientUnitInSpanish.useQuery();

  const [prices, setPrices] = useState<number[]>([
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  ]);
  let cont = -1;
  let cont2 = -1;
  let productsCont = 0;

  ingredients
    ? ingredients.map((i) => {
        if (i.Ingredient.Edible) {
          productsCont++;
        }
      })
    : "";

  const utils = trpc.useContext();
  const router = useRouter();

  const { data: session } = useSession();
  const isAdmin = session?.user?.role == "admin";

  const editRecipe = (id: string) => {
    router.push(`/recipe/edit/${id}`);
  };

  const notifyDeleted = () => toast.success("Receta eliminada");
  const { mutateAsync } = trpc.recipe.delete.useMutation({
    onSuccess() {
      utils.recipe.getAllRecipes.invalidate();
      utils.recipe.getRecentRecipes.invalidate();
    },
  });
  const deleteRecipe = (id: string) => {
    mutateAsync({ recipeId: id });
    router.push(`/recipe`);
    notifyDeleted();
  };

  const allergens = recipe?.allergens?.map((a) => a.allergen) ?? [];
  const cartMutation = trpc.cart.addProduct.useMutation({
    onSuccess() {
      utils.cart.getAllCartProduct.invalidate();
    },
  });

  const handlePan = (event: any, info: PanInfo) => {
    const x = info.offset.x;
    if (x > 0) {
      controls.set({ x: x < 160 ? x : 160 });
    }
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    if (info.offset.x >= 160) {
      addToCart();
    }
    controls.start({ x: 0 });
  };

  function addToCart() {
    ingredients?.map((i) => {
      cont2++;
      if (i.Ingredient.Edible) {
        const amount = Math.round(
          ((prices[cont2] ?? 1) /
            (i.Ingredient.Edible.Edible?.priceByWeight ?? 1)) *
            1000,
        );
        i.Ingredient.Edible.Edible?.priceByWeight;
        cartMutation.mutateAsync({
          productId: i.Ingredient.Edible.id,
          amount: amount,
        });
      }
    });

    toast.success("Productos a??adidos");
  }

  return (
    <div>
      {/* Black background */}
      <div className="mx-4 py-10 sm:px-24">
        {/* Bot??n atr??s (Recetas) */}
        <Link href={`/recipe`}>
          <div className="btn ml-4 flex w-[150px] cursor-pointer items-center gap-4 sm:ml-0">
            <div className="-ml-9 rounded-lg bg-accent p-0.5 sm:-ml-24">
              <BsArrowLeftShort className="text-base-100" size={25} />
            </div>
            <h3 className="flex font-raleway text-lg text-base-100">RECETAS</h3>
          </div>
        </Link>
        {/* End Bot??n atr??s (Recetas) */}

        {/* Recipe and Products */}
        <div className="py-4 sm:py-10">
          <div className="rounded-lg bg-base-100 p-14">
            {/* Upper section */}
            <div className="lg:flex">
              <div className="mr-10 w-full">
                <div className="mb-8 flex gap-4 sm:mb-16 lg:flex-row lg:items-center">
                  <h1 className="font-raleway text-lg uppercase sm:text-xl">
                    {recipe?.name}
                  </h1>
                  {(session?.user?.id == recipe?.userId || isAdmin) && (
                    <DotMenu
                      id={recipe.id}
                      name={recipe ? recipe.name : "Error ocurred"}
                      type="receta"
                      updateFunction={editRecipe}
                      deleteFunction={deleteRecipe}
                    />
                  )}
                </div>
                {/* Features */}
                <div className="text-sm lg:mr-20">
                  <h2 className="flex justify-between">
                    <span>Tiempo de preparaci??n</span>
                    <div className="text-end">
                      {recipe?.preparationTime ?? "-"} min
                    </div>
                  </h2>
                  <hr className="my-4 border-base-content"></hr>
                  <h2 className="flex justify-between">
                    <span>Cocinar</span>
                    {recipe?.cookingTime ?? "-"} min
                  </h2>
                  <hr className="my-4 border-base-content"></hr>
                  <h2 className="flex justify-between">
                    <span>Tiempo total</span>
                    {(recipe?.preparationTime ?? 0) +
                      (recipe?.cookingTime ?? 0)}{" "}
                    min
                  </h2>
                  <hr className="my-4 border-base-content"></hr>
                  <h2 className="flex justify-between">
                    <span>Raciones</span> {recipe?.portions} pers
                  </h2>
                  <hr className="my-4 border-base-content"></hr>
                  <h2 className="flex justify-between">
                    <span>Dificultad</span>{" "}
                    {recipe?.difficulty == "easy"
                      ? "f??cil"
                      : recipe?.difficulty == "moderate"
                      ? "media"
                      : "dif??cil"}
                  </h2>
                  <hr className="my-4 border-base-content"></hr>
                  <h2 className="flex items-center justify-between">
                    Al??rgenos
                    <div className="flex">
                      <AllergensComponent
                        key={recipe.id}
                        allergens={allergens}
                        size={25}
                      ></AllergensComponent>
                    </div>
                  </h2>
                </div>
                {/* End Features */}
              </div>
              <div className="mt-6">
                <Image
                  className="rounded-lg"
                  src={recipe?.imageURL ?? ""}
                  alt="not found"
                  width="600"
                  height="880"
                  layout="intrinsic"
                  objectFit="cover"
                ></Image>
                <SaveIcon recipe={recipe as IRecipe} isBig={true} />
              </div>
            </div>
            {/* End Upper section */}

            {/* Allergens, Ingredients and Directions */}
            <div className="mt-20 mb-10">
              {/* Ingredients and Directions */}
              <div className="mx-0 grid grid-cols-1 sm:mx-10 md:grid-cols-2 md:gap-32">
                <div>
                  <h2 className="mb-6 border-b-[1px] border-[#0000004D] font-raleway text-lg">
                    INGREDIENTES
                  </h2>
                  <div className="mb-4 md:pr-14">
                    <ul className="ml-5 list-disc space-y-2">
                      {units &&
                        ingredients?.map((i, index) => {
                          return (
                            <li key={index}>
                              <div className="lowercase">
                                {i.amount} {units[i.unit]} de{" "}
                                {i.Ingredient.name}
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="mb-6 border-b-[1px] border-[#0000004D] font-raleway text-lg">
                    PASOS
                  </h2>
                  <ol className="list-inside list-decimal space-y-6">
                    {directions?.map((d) => {
                      return (
                        <li key={d.number} className="first-letter:uppercase">
                          {d.direction}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              {/* End Ingredients and Directions */}
            </div>
          </div>
          {/* End Allergens, Ingredients and Directions */}

          {/* Products */}
          <div
            className={`${
              productsCont <= 0 && "hidden"
            } mt-24 rounded-lg bg-base-content`}
          >
            <div className="mb-14 flex flex-col justify-between lg:flex-row lg:items-center">
              <h2 className="select-none font-raleway text-xl text-base-100">
                DIRECTO A TU CESTA
              </h2>
              <div className="flex h-10 w-72 items-center justify-between rounded-full bg-base-100 font-satoshiBold">
                <motion.div
                  animate={controls}
                  onPan={handlePan}
                  onPanEnd={handlePanEnd}
                  className="absolute flex h-10 w-32 cursor-grabbing touch-none items-center justify-center rounded-full bg-secondary"
                >
                  <p className="select-none">
                    {prices
                      .reduce((totalPrice, price) => totalPrice + price, 0)
                      .toFixed(2) + "???"}
                  </p>
                </motion.div>
                <div
                  className="ml-32 flex w-full cursor-pointer select-none place-content-center items-center gap-1"
                  onClick={addToCart}
                >
                  a??adir todo
                  <BsArrowRightShort size={18} />
                </div>
              </div>
            </div>
            <div className="grid w-full select-none grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {ingredients ? (
                ingredients.map((i, index) => {
                  if (i.Ingredient.Edible) {
                    cont++;
                    return (
                      <Product
                        product={i.Ingredient.Edible}
                        showButtons={true}
                        index={cont}
                        setPrices={setPrices}
                        key={index}
                      />
                    );
                  }
                })
              ) : (
                <Loading message="Cargando productos" />
              )}
            </div>
          </div>
          {/* End Products */}
        </div>
        {/* End Recipe and Products */}
      </div>
      {/* End Black background */}
      {/* Comments */} <CommentSection recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetail;
