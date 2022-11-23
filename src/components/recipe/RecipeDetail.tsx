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
      <div className="mx-8 mt-24 sm:mx-20">
        <div className="my-20 rounded-lg bg-[#F8F3ED] p-14">
          {/* Upper section */}
          <div className="flex">
            <div className="mr-10 w-full gap-4">
              <div className="mb-16 flex gap-4 lg:flex-row lg:items-center">
                <h1 className="text-xl uppercase">{recipe?.name}</h1>
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
              <div className="mr-20">
                <h2 className="flex justify-between">
                  <span>Tiempo de preparación</span>
                  {recipe?.timeSpan} min
                </h2>
                <hr className="my-4 border-[#0000004D]"></hr>
                <h2 className="flex justify-between">
                  <span>Cocinar</span>
                  {recipe?.timeSpan} min {/* Por hacer */}
                </h2>
                <hr className="my-4 border-[#0000004D]"></hr>
                <h2 className="flex justify-between">
                  <span>Tiempo total</span>
                  {recipe?.timeSpan} min {/* Por hacer */}
                </h2>
                <hr className="my-4 border-[#0000004D]"></hr>
                <h2 className="flex justify-between">
                  <span>Raciones</span> {recipe?.portions}
                </h2>
                <hr className="my-4 border-[#0000004D]"></hr>
                <h2 className="flex justify-between">
                  <span>Dificultad</span> {recipe?.difficulty}
                </h2>
                <hr className="my-4 border-[#0000004D]"></hr>
              </div>
              {/* End Features */}
            </div>
            <div className="mt-6">
              <Image
                className="rounded-md"
                src={recipe?.imageURL ?? ""}
                alt="not found"
                width="300"
                height="380"
                layout="fixed"
                objectFit="cover"
              ></Image>
              <button
                onClick={recipe?.isFav ? unsaveRecipe : saveRecipe}
                className="absolute top-[480px] right-40 z-10 flex gap-2 rounded-full bg-[#F8F3ED] px-4 pb-1 hover:bg-[#212529] hover:text-white"
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
              <h2 className="mb-4 border-b-[1px] border-[#0000004D] text-lg font-bold">
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
                            <p className="lowercase">de {i.Ingredient.name}</p>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>

            <div className="mx-10">
              <h2 className="mb-4 border-b-[1px] border-[#0000004D] text-lg font-bold">
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
        <div className="mb-14 rounded-lg bg-[#212529]">
          <h2 className="mb-10 text-2xl font-bold text-white">
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
      {/* Footer */}
      <div className="bg-[#F8F3ED] p-8">
        <h2 className="text-2xl font-bold">COMENTARIOS</h2>
        <Stars average={4}></Stars>
      </div>
    </div>
  );
};

export default RecipeDetail;
