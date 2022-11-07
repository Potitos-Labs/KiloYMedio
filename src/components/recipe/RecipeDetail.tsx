import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { trpc } from "../../utils/trpc";

import { toast } from "react-toastify";
//import { trpc } from "../../utils/trpc";
import Stars from "../Stars";
import DotMenu from "../DotMenu";
import { useSession } from "next-auth/react";
import router from "next/router";

const RecipeDetail = ({ id }: { id: string }) => {
  const { data: userData } = useSession();
  const { data } = trpc.recipe.getById.useQuery({ id });
  const notify = () => toast.success("Receta guardada");
  const notifyDeleted = () => toast.success("Receta eliminada");
  const notifyUpdate = () => toast.warn("METODO POR IMPLEMENTAR");
  const utils = trpc.useContext();
  // const utils = trpc.useContext();

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
    // guardar receta en el perfil
  }

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2">
      <div className="mx-20 w-full">
        <div className="mb-4 flex flex-row gap-4">
          <h1 className="inline-block text-left text-2xl font-bold uppercase">
            RECETA DE {data?.name}
          </h1>
          <div className=" inline-flex items-center justify-center">
            <Stars average={4}></Stars>
            {userData?.user?.id == data?.userId ||
              (userData?.user?.role == "admin" && (
                <DotMenu
                  id={id}
                  name={data ? data.name : "Error Ocurred"}
                  type="receta"
                  updateFunction={updateRecipe}
                  deleteFunction={deleteRecipe}
                />
              ))}
          </div>
          <u
            onClick={saveRecipe}
            className="flex cursor-pointer items-center gap-2 text-right text-kym2 hover:text-kym4"
          >
            <AiOutlineCheckCircle className="h-4 w-4" />
            Guardar receta
          </u>
        </div>
        <div className="mt-4 mb-8 flex max-h-64 flex-col">
          <img
            className="min-h-full w-60 rounded-md"
            src={data?.imageURL}
          ></img>
        </div>
        <div>
          <h2 className="font-bold">INGREDIENTES</h2>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
