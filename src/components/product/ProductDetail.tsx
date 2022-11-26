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
import Addproductchart from "./Addproductchart";

const ProductDetail = ({ product }: { product: IProduct }) => {
  return (
    <div className="relative z-0 flex flex-col bg-base-200">
      <div className="lg:ml-16 lg:pt-40">
        <div className="grid w-fit grid-rows-2 gap-3 lg:grid-cols-2">
          <ProductCard
            product={product}
            className="h-auto w-full rounded-b-[20px] bg-base-100 px-5 lg:rounded-[20px] lg:px-16"
          />
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
        <button onClick={() => router.back()} className="mt-12 ml-6 lg:ml-0">
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
    </div>
  );
};

const ProductCard = ({
  product,
  className,
}: {
  product: IProduct;
  className?: string;
}) => {
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
    <div
      className={`flex h-full flex-1 flex-col place-content-between space-y-2 py-[10%] lg:place-content-center ${className}`}
    >
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
      <p className="inline-block text-center font-raleway text-2xl font-black uppercase text-base-content lg:text-left">
        {product.name}
      </p>
      <p className="text-center font-sans text-sm leading-[20px] lg:pr-[10%] lg:text-justify">
        {product.description}
      </p>
      <p className="py-4 text-center font-sans text-base lg:text-left">
        {product.Edible ? (
          <span>{product.Edible?.priceByWeight}</span>
        ) : (
          <span>{product.NonEdible?.price}</span>
        )}
        €/{unitPrice[product.ProductUnit]}
      </p>
      {data?.user?.role != "admin" && <PurchaseOptions product={product} />}
    </div>
  );
};

const PurchaseOptions = ({ product }: { product: IProduct }) => {
  const stockLeft = product.stock * 1000 >= 100;
  const [amount, setAmount] = React.useState(product.Edible ? 100 : 1);

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
          className={"rounded-full ring-1 ring-base-content ring-offset-0"}
        />
      </div>
      <Addproductchart amount={amount} product={product} />
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
    <div className="relative mx-6 my-14 rounded-3xl bg-base-100 px-24 pt-16 pb-16">
      <div className="absolute -top-[78px] left-0 -z-10 flex w-full place-content-center">
        <Image
          src="/img/ellipse.svg"
          alt=""
          className="select-none"
          width={"300%"}
          height={"200%"}
          layout="fixed"
          objectFit="contain"
        />
        <button className="absolute top-8 h-12 font-satoshiBold text-xs">
          saber más
        </button>
      </div>
      <h1 className="whitespace-nowrap font-raleway text-sm lg:text-xl">
        INFORMACIÓN NUTRICIONAL
      </h1>
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
        <table className="mt-3 w-[65%] table-auto text-base">
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

//const relatedRecipes = ({ product }: { product: IProduct }) => {};

export default ProductDetail;
