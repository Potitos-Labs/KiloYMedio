import { Allergen } from "@prisma/client";
import React from "react";
import Stars from "../Stars";
import AllergensComponent from "../Allergen";
import IncDecButtons from "./IncDecButtons";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import Link from "next/link";

const ProductDetail = ({
  name,
  img,
  description,
  isEdible,
  allergensList,
  price,
  id,
}: {
  name: string;
  img: string;
  description: string;
  isEdible: boolean;
  allergensList: Allergen[];
  price: number;
  id: string;
}) => {
  const [weight, setWeight] = React.useState(100);
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["cart.addProduct"], {
    onSuccess() {
      utils.invalidateQueries("cart.getAllCartProduct");
    },
  });

  function addToCart() {
    mutation.mutateAsync({ productId: id, amount: weight });
  }

  return (
    <div className="">
      <div>
        <div className="bg-kym3 p-4 font-bold text-white">
          {isEdible ? (
            <Link href={`/category`}>Comestible </Link>
          ) : (
            <Link href={`/category`}>No Comestible</Link>
          )}
          {}
        </div>

        <div className="item-center mx-10 mt-16 grid grid-cols-1 content-center gap-4 sm:grid-cols-2">
          <div className="mt-5  flex max-h-64 flex-col items-center">
            <img className="min-h-full" src={img}></img>
          </div>

          <div className="mt-5  columns-1">
            <h1 className="mb-4 mr-6 inline-block text-left text-2xl font-bold capitalize">
              {name}
            </h1>
            <Stars average={4}></Stars>

            {allergensList.length > 0 ? (
              <div>
                <p>Alérgenos:</p>
                <AllergensComponent
                  allergens={allergensList}
                  size={29}
                ></AllergensComponent>
              </div>
            ) : null}

            <p className="mt-4">Precio:</p>
            <p className="mb-3 inline-block text-left text-xl  capitalize">
              {price} {isEdible ? <span> €/Kg </span> : <span> € </span>}
            </p>

            <div className="flex items-center">
              <div className="mr-4">
                <IncDecButtons setWeight={setWeight} weight={weight} />
              </div>

              <button
                onClick={addToCart}
                className=" rounded border border-button bg-transparent py-0.5 px-12 font-semibold text-kym4 hover:border-transparent hover:bg-button_hover hover:text-white  "
              >
                Añadir al Carro
              </button>
            </div>
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
      <p className="mt-2 ml-2 normal-case">{description}</p>
    </div>
  );
};

const AllergenDescription = ({ allergens }: { allergens: Allergen[] }) => {
  const { data: allergenTransalator } = trpc.useQuery([
    "product.getAllergenInSpanishDictionary",
  ]);
  return (
    <div className=" p-6">
      <div className="border-b-2 border-orange-400">
        <h2 className="mb-1 inline-block text-left text-xl font-bold normal-case">
          Descripción de los alérgenos
        </h2>
      </div>
      {allergens.map((allergen) => (
        <div className="mt-2 ml-2 flex py-2 align-middle" key={allergen}>
          <AllergensComponent
            allergens={[allergen]}
            size={30}
          ></AllergensComponent>
          <p className="ml-2  inline-block normal-case">
            {allergenTransalator?.get(allergen)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
