import { Allergen } from "@prisma/client";
import React from "react";
import Stars from "../Stars";
import AllergensComponent from "../Allergen";
import IncDecButtons from "./IncDecButtons";
import { trpc } from "../../utils/trpc";

const ProductDetail = ({
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
          Producto / Comestible / Mi Producto{" "}
          <span className="font-light"> MOCKUP</span>
        </div>

        <div className="item-center mx-10 mt-16 grid grid-cols-2 content-center gap-4">
          <img
            className=" m-4 w-3/4 columns-1 justify-center justify-self-center"
            src={img}
            alt={name}
          />

          <div className="mt-3  columns-1">
            <h1 className="mb-4 inline-block text-left text-2xl font-bold capitalize">
              {name}
            </h1>
            <Stars average={2.5}></Stars>

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
              3.5 €/Kg <span className="text-red-700">MOCKUP</span>
            </p>

            <div className="mt-auto ">
              <IncDecButtons setWeight={setWeight} weight={weight} />
              <button
                onClick={addToCart}
                className="rigth my-4 ml-6 inline-block h-7 bg-button px-4  text-center font-bold text-white  hover:bg-button_hover "
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
    <div className="mt-6 px-10">
      <div className="border-b-2 border-orange-400">
        <h2 className="mb-1 inline-block text-left text-xl font-bold capitalize">
          Descripción del producto
        </h2>
      </div>
      <p className="mt-2 ml-2">{description}</p>
    </div>
  );
};

const AllergenDescription = ({ allergens }: { allergens: Allergen[] }) => {
  return (
    <div className="mt-6 px-10">
      <div className="border-b-2 border-orange-400">
        <h2 className="mb-1 inline-block text-left text-xl font-bold capitalize">
          Descripción de los alérgenos
        </h2>
      </div>
      {allergens.map((allergen) => (
        <div className="mt-2 ml-2 flex py-2 align-middle" key={allergen}>
          <AllergensComponent
            allergens={allergens}
            size={30}
          ></AllergensComponent>
          <p className="ml-2  inline-block">{allergen}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
