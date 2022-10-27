import { Allergen } from "@prisma/client";
import React from "react";
import Stars from "../Stars";
import AllergensComponent from "../Allergen";
import IncDecButtons from "./IncDecButtons";
import { trpc } from "../../utils/trpc";
import Link from "next/link";
import { toast } from "react-toastify";
import DotMenu from "../DotMenu";
import { useSession } from "next-auth/react";

const ProductDetail = ({
  name,
  img,
  description,
  isEdible,
  allergensList,
  price,
  id,
  stock,
}: {
  name: string;
  img: string;
  description: string;
  isEdible: boolean;
  allergensList: Allergen[];
  price: number;
  id: string;
  stock: number;
}) => {
  const { data, status } = useSession();

  const stockLeft = stock * 1000 >= 100;
  const notify = () => toast.success("Producto añadido");
  const [amount, setAmount] = React.useState(isEdible ? 100 : 1);
  const utils = trpc.useContext();
  const mutation = trpc.cart.addProduct.useMutation({
    onSuccess() {
      utils.cart.getAllCartProduct.invalidate();
    },
  });

  function addToCart() {
    if (stock * 1000 >= 100) {
      notify();
      mutation.mutateAsync({ productId: id, amount: amount });
    }
  }

  return (
    <div className="">
      <div>
        <div className="bg-kym3 p-4 font-bold text-white">
          {isEdible ? (
            <Link href={`/category`}>Comestible</Link>
          ) : (
            <Link href={`/category`}>No comestible</Link>
          )}
          {}
        </div>

        <div className="item-center mx-10 mt-16 grid grid-cols-1 content-center gap-4 sm:grid-cols-2">
          <div className="mt-5  flex max-h-64 flex-col items-center">
            <img className="min-h-full rounded-md" src={img}></img>
          </div>

          <div className="mt-5  columns-1">
            <h1 className="mb-4 mr-6 inline-block text-left text-2xl font-bold capitalize">
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

            <p className="mt-4">Precio:</p>
            <p className="mb-3 inline-block text-left text-xl  capitalize">
              {price} {isEdible ? <span> €/Kg </span> : <span> € </span>}
            </p>

            <div className="flex items-center">
              <div className="mr-4">
                <IncDecButtons
                  setAmount={setAmount}
                  amount={amount}
                  stock={stock}
                  isEdible={isEdible}
                  stockLeft={stockLeft} //cambiar
                />
              </div>

              <button
                onClick={addToCart}
                className={`rounded-xl border border-button bg-transparent px-12 text-kym4  ${
                  !stockLeft
                    ? "cursor-not-allowed px-10 opacity-50"
                    : "hover:border-transparent hover:bg-button_hover hover:text-white"
                }`}
              >
                Añadir al carrito
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
  const { data: allergenTransalator } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();
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
