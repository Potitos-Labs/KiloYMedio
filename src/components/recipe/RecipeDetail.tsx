import Product from "@components/product/Product";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";

import DotMenu from "../DotMenu";
import Stars from "../Stars";

import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { BsArrowLeftShort } from "react-icons/bs";
import Link from "next/link";

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

  function saveRecipe() {
    saveMutation.mutateAsync({ recipeId: id });
  }

  function unsaveRecipe() {
    unsaveMutation.mutateAsync({ recipeId: id });
  }

  return (
    <div>
      <div className="py-10 sm:px-24">
        <Link href={`/recipe`}>
          <div className="flex cursor-pointer items-center gap-4">
            <div className="-ml-10 rounded-lg bg-accent p-0.5">
              <BsArrowLeftShort className="text-base-100" size={25} />
            </div>
            <h3 className="font-raleway text-lg text-base-100">RECETAS</h3>
          </div>
        </Link>
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
                    {recipe?.timeSpan} min
                  </h2>
                  <hr className="my-4 border-base-content"></hr>
                  <h2 className="flex justify-between">
                    <span>Cocinar</span>
                    {recipe?.timeSpan} min {/* Por hacer */}
                  </h2>
                  <hr className="my-4 border-base-content"></hr>
                  <h2 className="flex justify-between">
                    <span>Tiempo total</span>
                    {recipe?.timeSpan} min {/* Por hacer */}
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
                  className="container rounded-md"
                  src={recipe?.imageURL ?? ""}
                  alt="not found"
                  width="300"
                  height="380"
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
                            <div className="flex gap-2">
                              <span>{i.amount}</span>
                              <span>{units[i.unit]}</span>
                              <p className="lowercase">
                                de {i.Ingredient.name}
                              </p>
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
                <div>
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
            </div>
          </div>
          {/* End Ingredients and Directions */}

          {/* Products */}
          <div className="mt-24 rounded-lg bg-[#212529]">
            <h2 className="mb-14 font-raleway text-xl text-base-100">
              DIRECTO A TU CESTA
            </h2>
            <div className="grid w-full grid-cols-1 justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {ingredients ? (
                ingredients.map((i) => {
                  if (i.Ingredient.Edible)
                    return (
                      <Product product={i.Ingredient.Edible.product}></Product>
                    );
                })
              ) : (
                <p className="font-semibold text-kym4">Cargando...</p>
              )}
            </div>
          </div>
          {/* End Products */}
        </div>
      </div>
      {/* Footer */}
      <div className="bg-[#F8F3ED] p-8">
        <h2 className="font-raleway text-xl">COMENTARIOS</h2>
        <Stars average={4}></Stars>
      </div>
    </div>
  );
};

export default RecipeDetail;
