import React from "react";

//import { toast } from "react-toastify";
//import { trpc } from "../../utils/trpc";
import Stars from "../Stars";

const RecipeDetail = ({
  name,
  rattings,
  imageURL,
}: {
  name: string;
  rattings: number;
  imageURL: string;
}) => {
  // const notify = () => toast.success("Receta añadida");
  // const utils = trpc.useContext();

  return (
    <div className="">
      <div className="item-center mx-10 mt-16 grid grid-cols-1 content-center gap-4 sm:grid-cols-2">
        <div className="mt-3 mb-3 flex max-h-64 flex-col items-center">
          <img className="min-h-full rounded-md" src={imageURL}></img>
        </div>

        <div className="mt-5 columns-1">
          <h1 className="mb-4 mr-6 inline-block text-left text-2xl font-bold first-letter:uppercase">
            {name}
          </h1>
          <div className="inline-block">
            <Stars average={rattings}></Stars>
            <div className="mx-2 inline-block"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
