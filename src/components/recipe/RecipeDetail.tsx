import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";

import { trpc } from "../../utils/trpc";
import DotMenu from "../DotMenu";
//import { trpc } from "../../utils/trpc";
import Stars from "../Stars";

const RecipeDetail = ({ id }: { id: string }) => {
  const { data: recipe } = trpc.recipe.getById.useQuery({ id });
  const ingredients = recipe?.RecipeIngredient;
  const directions = recipe?.directions;
  const router = useRouter();

  const notify = () => toast.success("Receta guardada");
  const notifyDeleted = () => toast.success("Receta eliminada");
  const notifyUpdate = () => toast.warn("METODO POR IMPLEMENTAR");
  const utils = trpc.useContext();
  // const utils = trpc.useContext();

  const mutation = trpc.user.client.addFavoriteRecipe.useMutation({
    onSuccess() {
      utils.user.client.getFavoriteRecipes.invalidate();
    },
  });

  const { data: session } = useSession();
  const isAdmin = session?.user?.role == "admin";

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
    notify();
    mutation.mutateAsync({ recipeId: id });
  }

  return (
    <div className="mx-28 mt-16 sm:grid-cols-2">
      {/* Upper section */}
      <div className="mb-14 flex gap-14">
        <img
          className="max-h-64 min-h-full w-96 rounded-md"
          src={recipe?.imageURL}
          alt="not found"
        ></img>

        {/* Title, ratting, button and description */}
        <div className="">
          <div className="flex w-full gap-4">
            <h1 className="flex text-2xl font-bold uppercase">
              {recipe?.name}
            </h1>
            <div className="inline-flex items-center justify-center">
              <Stars average={4}></Stars>
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
            </div>
            <div>
              <u
                onClick={saveRecipe}
                className={`${
                  isAdmin && "invisible"
                } mt-1 flex w-full cursor-pointer items-center gap-1 font-semibold text-kym2 hover:text-kym4`}
              >
                <AiOutlineCheckCircle className="h-4 w-4" />
                Guardar receta
              </u>
            </div>
          </div>
          <div className="my-8">{recipe?.description}</div>

          {/* Features */}
          <hr className="border-1 my-5 border-orange-200"></hr>
          <div className="grid grid-cols-[33%_33%_33%]">
            <h2 className="flex flex-col">
              <span className="text-xs">RACIONES </span> {recipe?.portions}
            </h2>
            <h2 className="flex flex-col">
              <span className="text-xs">DIFICULTAD </span> {recipe?.difficulty}
            </h2>
            <h2 className="flex flex-col">
              <span className="text-xs">TIEMPO </span> {recipe?.timeSpan} min.
            </h2>
          </div>
          <hr className="border-1 my-5 border-orange-200"></hr>
          {/* End Features */}
        </div>
        {/* End Title, ratting, button and description */}
      </div>
      {/* End Upper section */}

      {/* Ingredients and Directions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="mb-2 text-lg font-bold">INGREDIENTES</h2>
          <div className="pr-14">
            {ingredients?.map((i) => {
              return (
                <div key={"id"}>
                  <hr className="border-1 my-5 border-orange-200"></hr>
                  <p className="first-letter:uppercase">{i.Ingredient.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-10 text-lg font-bold">INSTRUCCIONES</h2>
          <div>
            {directions?.map((d) => {
              return (
                <ol key={"id"} className="list-inside list-decimal">
                  <li className="first-letter:uppercase">{d.directions}</li>
                </ol>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <hr className="border-1 my-24 border-orange-200"></hr>
    </div>
  );
};

export default RecipeDetail;
