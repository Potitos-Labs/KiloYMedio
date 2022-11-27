import React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";

import DotMenu from "../DotMenu";
import Loading from "@components/ui/Loading";
import Product from "@components/product/Product";
import CommentSection from "./comments/CommentSection";

import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

import Link from "next/link";
import Image from "next/image";

const RecipeDetail = ({ id }: { id: string }) => {
  const { data: recipe } = trpc.recipe.getById.useQuery({ id });
  const ingredients = recipe?.RecipeIngredient;
  const directions = recipe?.directions;

  const { data: units } = trpc.recipe.getIngredientUnitInSpanish.useQuery();

  const utils = trpc.useContext();
  const router = useRouter();

  const { data: session } = useSession();
  const isAdmin = session?.user?.role == "admin";

  const notifyDeleted = () => toast.success("Receta eliminada");

  const saveMutation = trpc.user.client.addFavoriteRecipe.useMutation({
    onSuccess() {
      utils.user.client.getFavoriteRecipes.invalidate();
      utils.recipe.getById.invalidate();
    },
  });

  const unsaveMutation = trpc.user.client.deleteFavouriteRecipe.useMutation({
    onSuccess() {
      utils.user.client.getFavoriteRecipes.invalidate();
      utils.recipe.getById.invalidate();
    },
  });

  function saveRecipe() {
    saveMutation.mutateAsync({ recipeId: id });
  }

  function unsaveRecipe() {
    unsaveMutation.mutateAsync({ recipeId: id });
  }

  const { mutateAsync } = trpc.recipe.delete.useMutation({
    onSuccess() {
      utils.recipe.getAllRecipes.invalidate();
      utils.recipe.getRecentRecipes.invalidate();
    },
  });

  const editRecipe = (id: string) => {
    router.push(`/recipe/edit/${id}`);
  };

  const deleteRecipe = (id: string) => {
    mutateAsync({ recipeId: id });
    router.push(`/recipe`);
    notifyDeleted();
  };

  // const cartMutation = trpc.cart.addProduct.useMutation({
  //   onSuccess() {
  //     utils.cart.getAllCartProduct.invalidate();
  //   },
  // });

  // function addToCart() {
  //     cartMutation.mutateAsync({ productId: , amount: });
  //   }
  // }

  return (
    <div>
      {/* Black background */}
      <div className="py-10 sm:px-24">
        {/* Botón atrás (Recetas) */}
        <Link href={`/recipe`}>
          <div className="flex cursor-pointer items-center gap-4">
            <div className="-ml-10 rounded-lg bg-accent p-0.5">
              <BsArrowLeftShort className="text-base-100" size={25} />
            </div>
            <h3 className="font-raleway text-lg text-base-100">RECETAS</h3>
          </div>
        </Link>
        {/* End Botón atrás (Recetas) */}

        {/* Recipe and Products */}
        <div className="py-10">
          <div className="rounded-lg bg-base-100 p-14">
            {/* Upper section */}
            <div className="flex">
              <div className="mr-10 w-full gap-4">
                <div className="mb-16 flex gap-4 lg:flex-row lg:items-center">
                  <h1 className="font-raleway text-xl uppercase">
                    {recipe?.name}
                  </h1>
                  {(session?.user?.id == recipe?.userId || isAdmin) && (
                    <DotMenu
                      id={id}
                      name={recipe ? recipe.name : "Error ocurred"}
                      type="receta"
                      updateFunction={editRecipe}
                      deleteFunction={deleteRecipe}
                    />
                  )}
                </div>
                {/* Features */}
                <div className="mr-20 text-sm">
                  <h2 className="flex justify-between">
                    <span>Tiempo de preparación</span>
                    {recipe?.preparationTime ?? "-"} min
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
                    {/* PROBAR LA SUMA */}
                  </h2>
                  <hr className="my-4 border-base-content"></hr>
                  <h2 className="flex justify-between">
                    <span>Raciones</span> {recipe?.portions} pers
                  </h2>
                  <hr className="my-4 border-base-content"></hr>
                  <h2 className="flex justify-between">
                    <span>Dificultad</span> {recipe?.difficulty}
                  </h2>
                  <hr className="my-4 border-base-content"></hr>
                </div>
                {/* End Features */}
              </div>
              <div className="mt-6">
                <Image
                  className="container rounded-lg"
                  src={recipe?.imageURL ?? ""}
                  alt="not found"
                  width="300"
                  height="400"
                  layout="fixed"
                  objectFit="cover"
                ></Image>
                <button
                  onClick={recipe?.isFav ? unsaveRecipe : saveRecipe}
                  className="relative bottom-14 left-44 z-10 flex gap-2 rounded-full bg-base-100 px-3 pb-1 hover:bg-[#212529] hover:text-white"
                >
                  {recipe?.isFav ? "eliminar" : "guardar"}
                  {recipe?.isFav ? (
                    <IoBookmark className="mt-1.5" />
                  ) : (
                    <IoBookmarkOutline className="mt-1.5" />
                  )}
                </button>
              </div>
            </div>
            {/* End Upper section */}

            {/* Ingredients and Directions */}
            <div className="mt-20 mb-10 grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <div className="mx-10">
                <h2 className="mb-6 border-b-[1px] border-[#0000004D] font-raleway text-lg">
                  INGREDIENTES
                </h2>
                <div className="mb-4 md:pr-14">
                  <ul className="ml-5 list-disc space-y-2">
                    {units &&
                      ingredients?.map((i) => {
                        return (
                          <li key={""}>
                            <div className="lowercase">
                              {i.amount} {units[i.unit]} de {i.Ingredient.name}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>

              <div className="mx-10">
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

          {/* Products */}
          <div className="mt-24 rounded-lg bg-base-content">
            <div className="mb-14 flex flex-col justify-between lg:flex-row lg:items-center">
              <h2 className="font-raleway text-xl text-base-100">
                DIRECTO A TU CESTA
              </h2>
              <button className="flex h-10 w-72 items-center justify-between rounded-full bg-base-100 pr-10 font-satoshiBold">
                <div className="h-full rounded-full bg-secondary px-8 pt-2">
                  6,85€
                </div>
                <div className="flex items-center gap-1">
                  añadir todo
                  <BsArrowRightShort size={18} />
                </div>
              </button>
            </div>
            <div className="grid w-full grid-cols-1 justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {ingredients ? (
                ingredients.map((i) => {
                  if (i.Ingredient.Edible)
                    return (
                      <Product
                        product={i.Ingredient.Edible.product}
                        showButtons={true}
                      ></Product>
                    );
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
      {/* Comments */} <CommentSection recipeId={id} />
    </div>
  );
};

export default RecipeDetail;
