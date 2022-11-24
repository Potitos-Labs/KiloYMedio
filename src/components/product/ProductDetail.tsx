import { Allergen } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import router from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { HiArrowLeft } from "react-icons/hi";

import { trpc } from "../../utils/trpc";
import { IProduct } from "../../utils/validations/product";
import AllergensComponent from "../Allergens";
import DotMenu from "../DotMenu";
import IncDecButtons from "./IncDecButtons";

const ProductDetail = ({ product }: { product: IProduct }) => {
  const { data } = useSession();

  return (
    <div className="flex flex-col bg-neutral">
      <div className="ml-16 pt-40">
        <div className="grid w-fit grid-cols-2 gap-3">
          <div className="flex h-auto w-full flex-col rounded-[20px] bg-base-100 px-16">
            <ProductCard product={product} />
            {data?.user?.role != "admin" && (
              <PurchaseOptions product={product} />
            )}
          </div>
          <Image
            height="600"
            width={400}
            layout="intrinsic"
            objectFit="cover"
            className="rounded-[20px]"
            alt={product.name}
            src={product.imageURL}
          />
        </div>
        <button onClick={() => router.back()} className="mt-12">
          <div className="flex flex-nowrap items-center">
            <HiArrowLeft
              color={"a6806d"}
              size="31"
              className="rounded-lg bg-base-100 px-1.5 py-1.5"
            />
            <span className="pl-3 font-raleway text-base text-base-100">
              VOLVER
            </span>
          </div>
        </button>
      </div>
      {product.Edible != null && <NutritionFacts product={product} />}
      {/*<div className="item-center mx-10 mt-4 grid min-w-fit grid-cols-1 content-center gap-14 sm:grid-cols-2">
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
              {" "}
              {isEdible ? (
                <span>{product.Edible?.priceByWeight}</span>
              ) : (
                <span>{product.NonEdible?.price}</span>
              )}
              €/{unitPrice[product.ProductUnit]}
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
                    productUnit={product.ProductUnit}
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
        </div>*/}
      {/*<div className="flex flex-col">
        <DescriptionComponent description={product.description} />
        {allergensList.length > 0 && (
          <AllergenDescription allergens={allergensList} />
        )}
      </div>*/}
    </div>
  );
};

const ProductCard = ({ product }: { product: IProduct }) => {
  const utils = trpc.useContext();
  const { data } = useSession();
  const { mutateAsync } = trpc.product.delete.useMutation({
    onSuccess() {
      utils.product.getAllProducts.invalidate();
      utils.product.getFilteredProducts.invalidate();
    },
  });
  const deleteProduct = (id: string) => {
    mutateAsync({ productId: id });
    router.push(`/product`);
    toast.success("Producto eliminado");
  };
  const updateProduct = (id: string) => {
    router.push(`/product/edit/${id}`);
  };

  const unitPrice = {
    grams: "Kg",
    kilograms: "Kg",
    liters: "L",
    milliliters: "L",
    unit: "U",
  };

  return (
    <div className="flex h-full flex-1 flex-col place-content-center space-y-2">
      {data?.user?.role == "admin" && (
        <div className="inline-block">
          <DotMenu
            id={product.id}
            name={product.name}
            type="producto"
            deleteFunction={deleteProduct}
            updateFunction={updateProduct}
          />
        </div>
      )}
      <p className="font-balck inline-block font-raleway text-2xl uppercase text-base-content">
        {product.name}
      </p>
      <p className="pr-[10%] text-justify font-sans text-sm leading-[20px]">
        {product.description}
      </p>
      <p className="inline-block py-4 text-left font-sans text-base">
        {product.Edible ? (
          <span>{product.Edible?.priceByWeight}</span>
        ) : (
          <span>{product.NonEdible?.price}</span>
        )}
        €/{unitPrice[product.ProductUnit]}
      </p>
    </div>
  );
};

const PurchaseOptions = ({ product }: { product: IProduct }) => {
  const stockLeft = product.stock * 1000 >= 100;
  const [amount, setAmount] = React.useState(product.Edible ? 100 : 1);
  const utils = trpc.useContext();
  const mutation = trpc.cart.addProduct.useMutation({
    onSuccess() {
      utils.cart.getAllCartProduct.invalidate();
    },
  });

  function addToCart() {
    if (stockLeft) {
      toast.success("Producto añadido");
      mutation.mutateAsync({ productId: product.id, amount: amount });
    }
  }

  function getTotalPrice() {
    let price = product.Edible
      ? (amount / 1000) * product.Edible.priceByWeight
      : amount * (product.NonEdible?.price ?? 0);
    price = Math.round(price * 100) / 100;
    return price;
  }

  return (
    <div className="mb-20 flex h-12 flex-row place-content-between space-x-6 md:items-center">
      <div className="h-full w-36 flex-initial">
        <IncDecButtons
          setAmount={setAmount}
          amount={amount}
          stock={product.stock}
          isEdible={product.Edible ? true : false}
          stockLeft={stockLeft} //cambiar
          productUnit={product.ProductUnit}
        />
      </div>
      <button
        onClick={addToCart}
        className={`h-full w-72 flex-initial rounded-full bg-transparent ring-1 ring-base-content ring-offset-0 text-base-100${
          !stockLeft && "cursor-not-allowed opacity-50"
        }`}
      >
        <div className="flex h-full flex-row">
          <div className="flex h-full w-28 flex-col items-center justify-center self-center rounded-full bg-base-content text-center text-sm text-base-100">
            <span className="px-2 text-sm">{getTotalPrice() + " €"}</span>
          </div>
          <div className="w-56 flex-initial self-center whitespace-nowrap px-2 text-center text-sm">
            {stockLeft ? "añadir a la cesta" : "agotado"}
          </div>
        </div>
      </button>
    </div>
  );
};

const NutritionFacts = ({ product }: { product: IProduct }) => {
  const allergensList = product.Edible?.allergens.map((e) => e.allergen) ?? [];
  const unitPrice = {
    grams: "g",
    kilograms: "g",
    liters: "ml",
    milliliters: "ml",
    unit: "u",
  };
  const unit = unitPrice[product.ProductUnit];

  return !product.Edible ? (
    <></>
  ) : (
    <div className="mx-6 mt-14 rounded-3xl bg-base-100 px-24 pt-16">
      <h1 className="font-raleway text-xl">INFORMACIÓN NUTRICIONAL</h1>
      <div className="mt-3 flex flex-row place-content-between">
        <div className="flex w-[35%] flex-col">
          {allergensList.length > 0 && (
            <>
              <p className="text-base">Alérgenos</p>
              {allergensList.length > 0 && (
                <AllergenDescription allergens={allergensList} />
              )}
            </>
          )}
        </div>
        <table className="my-3 w-[65%] table-auto text-base">
          <thead>
            <tr>
              <th className="pb-4 text-left"></th>
              <th className="pb-4 text-left">100 {unit}</th>
              <th className="pb-4 text-left">30 {unit}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Valor energético</td>
              <td className="py-3 pr-14">
                {product.Edible?.nutritionFacts.energy} kcal
              </td>
              <td className="py-3">
                {Math.round(product.Edible?.nutritionFacts.energy * 0.3)} kcal
              </td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Grasas</td>
              <td className="whitespace-nowrap py-3 pr-14">
                {product.Edible?.nutritionFacts.fat} {unit}
              </td>
              <td className="whitespace-nowrap py-3">
                {Math.round(product.Edible?.nutritionFacts.fat * 0.3)} {unit}
              </td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Ácidos grasos saturados</td>
              <td className="whitespace-nowrap py-3 pr-14">- </td>
              <td className="whitespace-nowrap py-3">- </td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Hidratos</td>
              <td className="whitespace-nowrap py-3 pr-14">
                {product.Edible?.nutritionFacts.carbohydrates} {unit}
              </td>
              <td className="whitespace-nowrap py-3">
                {Math.round(product.Edible?.nutritionFacts.carbohydrates * 0.3)}{" "}
                {unit}
              </td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Proteínas</td>
              <td className="whitespace-nowrap py-3 pr-14">
                {product.Edible?.nutritionFacts.protein} {unit}
              </td>
              <td className="py-3">
                {Math.round(product.Edible?.nutritionFacts.protein * 0.3)}{" "}
                {unit}
              </td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Fibra</td>
              <td className="whitespace-nowrap py-3 pr-14">-</td>
              <td className="py-3">-</td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Sal</td>
              <td className="whitespace-nowrap py-3 pr-14">-</td>
              <td className="whitespace-nowrap py-3">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AllergenDescription = ({ allergens }: { allergens: Allergen[] }) => {
  const { data: allergenTransalator } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();
  return (
    <>
      {allergens.map((allergen) => (
        <div className="mt-2 flex py-2 align-middle" key={allergen}>
          <AllergensComponent allergens={[allergen]} size={30} />
          <p className="ml-2 mt-1 inline-block first-letter:uppercase">
            {allergenTransalator?.get(allergen)}
          </p>
        </div>
      ))}
    </>
  );
};

export default ProductDetail;
