import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { trpc } from "../../utils/trpc";

import { toast } from "react-toastify";
//import { trpc } from "../../utils/trpc";
import Stars from "../Stars";

const RecipeDetail = ({ id }: { id: string }) => {
  const { data } = trpc.recipe.getById.useQuery({ id });
  const notify = () => toast.success("Receta guardada");
  // const utils = trpc.useContext();

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
          <div className="mt-1">
            <Stars average={4}></Stars>
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
