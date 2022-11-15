import { Allergen } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { toast } from "react-toastify";

import { trpc } from "../../utils/trpc";
import { IProduct } from "../../utils/validations/product";
import AllergensComponent from "../Allergen";
import DotMenu from "../DotMenu";
import Stars from "../Stars";
import IncDecButtons from "./IncDecButtons";

const ProductDetail = ({ product }: { product: IProduct }) => {
  const { data } = useSession();
  const isEdible = product.Edible != null;
  const allergensList = product.Edible?.allergens.map((e) => e.allergen) ?? [];

  const stockLeft = product.stock * 1000 >= 100;
  const notify = () => toast.success("Producto añadido");
  const notifyDeleted = () => toast.success("Producto eliminado");
  const [amount, setAmount] = React.useState(isEdible ? 100 : 1);
  const utils = trpc.useContext();
  const mutation = trpc.cart.addProduct.useMutation({
    onSuccess() {
      utils.cart.getAllCartProduct.invalidate();
    },
  });

  const { mutateAsync } = trpc.product.delete.useMutation({
    onSuccess() {
      utils.product.getAllProducts.invalidate();
    },
  });

  const updateProduct = (id: string) => {
    router.push(`/product/edit/${id}`);
  };

  const deleteProduct = (id: string) => {
    mutateAsync({ productId: id });
    router.push(`/product`);
    notifyDeleted();
  };

  function addToCart() {
    if (product.stock * 1000 >= 100) {
      notify();
      mutation.mutateAsync({ productId: product.id, amount: amount });
    }
  }

  return (
    <div className="">
      <div className="flex flex-col items-center">
        <div className="w-full">
          {isEdible ? (
            <div className="m-12 grid grid-cols-2 border-b-2 border-kym3">
              <Link href={`/category`}>
                <p className="mb-3 cursor-pointer font-bold sm:text-lg">
                  Comestible
                </p>
              </Link>
            </div>
          ) : (
            <div className="m-12 grid grid-cols-2 border-b-2 border-kym3">
              <Link href={`/category`}>
                <p className="mb-3 cursor-pointer font-bold sm:text-lg">
                  No comestible
                </p>
              </Link>
            </div>
          )}
        </div>

        <div className="item-center mx-10 mt-4 grid min-w-fit grid-cols-1 content-center gap-14 sm:grid-cols-2">
          <div className="mb-10 flex max-h-64 flex-col items-center">
            <Image
              height="500"
              width={300}
              layout="intrinsic"
              objectFit="cover"
              className="rounded-md"
              alt={product.name}
              src={product.imageURL}
            />
          </div>

          <div className="columns-1 lg:mt-3">
            <h1 className="mb-4 mr-6 inline-block text-left text-2xl font-bold first-letter:uppercase">
              {product.name}
            </h1>
            <div className="inline-block">
              <Stars average={4}></Stars>
              <div className="mx-2 inline-block">
                {data?.user?.role == "admin" && (
                  <DotMenu
                    id={product.id}
                    name={product.name}
                    type="producto"
                    deleteFunction={deleteProduct}
                    updateFunction={updateProduct}
                  ></DotMenu>
                )}
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
            <p className="mb-3 inline-block text-left text-xl">
              {isEdible ? (
                <span> {product.Edible?.priceByWeight} €/Kg</span>
              ) : (
                <span> {product.NonEdible?.price} €</span>
              )}
            </p>

            {data?.user?.role != "admin" && (
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="mr-4">
                  <IncDecButtons
                    setAmount={setAmount}
                    amount={amount}
                    stock={product.stock}
                    isEdible={isEdible}
                    stockLeft={stockLeft} //cambiar
                  />
                </div>

                <button
                  onClick={addToCart}
                  className={`w-[200px] rounded-xl border border-button bg-transparent px-0 text-kym4 sm:w-auto md:px-12 ${
                    !stockLeft
                      ? "cursor-not-allowed px-10 opacity-50"
                      : "hover:border-transparent hover:bg-button_hover hover:text-white"
                  }`}
                >
                  Añadir al carrito
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <DescriptionComponent description={product.description} />
        {allergensList.length > 0 && (
          <AllergenDescription allergens={allergensList} />
        )}
      </div>
    </div>
  );
};

const DescriptionComponent = ({ description }: { description: string }) => {
  return (
    <div className="my-6 p-6 sm:mx-2 md:mx-6 lg:mx-20">
      <div className="border-b-2 border-orange-400">
        <h2 className="mb-1 text-xl font-bold normal-case">
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
    <div className="mx-20 p-6">
      <div className="border-b-2 border-orange-400">
        <h2 className="mb-1 text-xl font-bold">Descripción de los alérgenos</h2>
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

export default ProductDetail;
