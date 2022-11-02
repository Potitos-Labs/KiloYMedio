import { Allergen } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";

//import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import AllergensComponent from "../Allergen";
import DotMenu from "../DotMenu";
import Stars from "../Stars";

const RecipeDetail = ({
  name,
  img,
  description,
  allergensList,
  id,
}: {
  name: string;
  img: string;
  description: string;
  allergensList: Allergen[];
  id: string;
}) => {
  const { data } = useSession();
  // const notify = () => toast.success("Receta añadida");
  //   const utils = trpc.useContext();

  return (
    <div className="">
      <div>
        <div className="item-center mx-10 mt-16 grid grid-cols-1 content-center gap-4 sm:grid-cols-2">
          <div className="mt-3 mb-3 flex max-h-64 flex-col items-center">
            <img className="min-h-full rounded-md" src={img}></img>
          </div>

          <div className="mt-5 columns-1">
            <h1 className="mb-4 mr-6 inline-block text-left text-2xl font-bold first-letter:uppercase">
              {name}
            </h1>
            <div className="inline-block">
              <Stars average={4}></Stars>
              <div className="mx-2 inline-block">
                {data?.user?.role == "admin" && <DotMenu id={id}></DotMenu>}
              </div>
            </div>

            {allergensList.length > 0 ? (
              <div>
                <p>Alérgenos:</p>
                <AllergensComponent
                  allergens={allergensList}
                  size={29}
                ></AllergensComponent>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <DescriptionComponent description={description} />
      {allergensList.length > 0 ? (
        <AllergenDescription allergens={allergensList} />
      ) : null}
    </div>
  );
};

const DescriptionComponent = ({ description }: { description: string }) => {
  return (
    <div className="mt-6 p-6">
      <div className="border-b-2 border-orange-400">
        <h2 className="mb-1 inline-block text-left text-xl font-bold normal-case">
          Descripción del producto
        </h2>
      </div>
      <p className="mt-2 ml-2 first-letter:uppercase">{description}</p>
    </div>
  );
};

const AllergenDescription = ({ allergens }: { allergens: Allergen[] }) => {
  const { data: allergenTransalator } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();
  return (
    <div className="p-6">
      <div className="border-b-2 border-orange-400">
        <h2 className="mb-1 inline-block text-left text-xl font-bold">
          Descripción de los alérgenos
        </h2>
      </div>
      {allergens.map((allergen) => (
        <div className="mt-2 ml-2 flex py-2 align-middle" key={allergen}>
          <AllergensComponent
            allergens={[allergen]}
            size={30}
          ></AllergensComponent>
          <p className="ml-2 mt-1 inline-block first-letter:uppercase">
            {allergenTransalator?.get(allergen)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecipeDetail;