import Heart from "@components/Heart";
import Product from "@components/product/Product";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

import { trpc } from "../../utils/trpc";
import DotMenu from "../DotMenu";
import Stars from "../Stars";

const RecipeDetail = ({ id }: { id: string }) => {
  const { data: recipe } = trpc.recipe.getById.useQuery({ id });
  const ingredients = recipe?.RecipeIngredient;
  const directions = recipe?.directions;

  const utils = trpc.useContext();
  const router = useRouter();

  const { data: session } = useSession();
  const isAdmin = session?.user?.role == "admin";

  const notifyDeleted = () => toast.success("Receta eliminada");
  const notifyUpdate = () => toast.warn("METODO POR IMPLEMENTAR");

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

  const updateRecipe = (id: string) => {
    //ACABAR
    notifyUpdate();
    console.log(id + "HAY QUE COMPLETAR METODO WOO");
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
    <div className="mx-8 mt-16 sm:mx-28">
      {/* Upper section */}
      <div className="mb-14 flex flex-col gap-14 lg:flex-row">
        <img
          className="max-h-64 min-h-full w-96 rounded-md"
          src={recipe?.imageURL}
          alt="not found"
        ></img>

        {/* Title, ratting, heart and description */}
        <div className="w-full">
          {/* Name, ratting, dot/heart */}
          <div className="flex w-full gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <h1 className="text-2xl font-bold uppercase">{recipe?.name}</h1>
              <Stars average={4}></Stars>
            </div>
            {session?.user?.id == recipe?.userId ||
              (isAdmin && (
                <DotMenu
                  id={id}
                  name={recipe ? recipe.name : "Error Ocurred"}
                  type="receta"
                  updateFunction={updateRecipe}
                  deleteFunction={deleteRecipe}
                />
              ))}
            <div>
              {!isAdmin && (
                <Heart
                  id={id}
                  favorite={recipe?.isFav}
                  addFavorite={saveRecipe}
                  removeFavorite={unsaveRecipe}
                />
              )}
            </div>
          </div>
          {/* End Name, ratting, dot/heart */}
          <div className="my-8">{recipe?.description}</div>

          {/* Features */}
          <hr className="border-1 my-5 border-orange-200"></hr>
          <div className="grid grid-cols-[33%_37%_29%]">
            <h2 className="flex flex-col">
              <span className="text-xs">RACIONES</span> {recipe?.portions}
            </h2>
            <h2 className="flex flex-col">
              <span className="text-xs">DIFICULTAD</span> {recipe?.difficulty}
            </h2>
            <h2 className="flex flex-col">
              <span className="text-xs">TIEMPO</span> {recipe?.timeSpan} min.
            </h2>
          </div>
          <hr className="border-1 my-5 border-orange-200"></hr>
          {/* End Features */}
        </div>
        {/* End Title, ratting, button and description */}
      </div>
      {/* End Upper section */}

      {/* Ingredients and Directions */}
      <div className="mb-40 grid grid-cols-2 gap-4">
        <div>
          <h2 className="mb-2 text-lg font-bold">INGREDIENTES</h2>
          <div className="pr-14">
            {ingredients?.map((i) => {
              return (
                <div key={"id"}>
                  <hr className="border-1 my-5 border-orange-200"></hr>
                  <div className="flex justify-between">
                    <p className="first-letter:uppercase">
                      {i.Ingredient.name}
                    </p>
                    <div className="flex gap-2">
                      <span>{i.amount}</span>
                      <span>{i.unit}</span> {/* provisional */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-10 text-lg font-bold">INSTRUCCIONES</h2>
          <div>
            <ol key={"id"} className="list-inside list-decimal">
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
      {/* End Ingredients and Directions */}

      {/* Products */}
      <div className="mb-14 text-center">
        <h2 className="text-lg font-bold">COMPRA NUESTROS PRODUCTOS</h2>
        <hr className="border-3 mt-5 mb-10 border-orange-200"></hr>
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

      {/* Footer */}
      <hr className="border-1 my-24 border-orange-200"></hr>
    </div>
  );
};

export default RecipeDetail;
