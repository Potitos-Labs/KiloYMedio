import { Allergen, ProductUnit } from "@prisma/client";
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
import SliderRecipes from "@components/SliderRecipes";

const ProductDetail = ({ product }: { product: IProduct }) => {
  return (
    <div className="relative z-0 flex flex-col bg-base-200">
      <div className="lg:mx-16">
        <div className="flex w-full flex-auto flex-col items-center gap-2 lg:mt-[5%] lg:flex-row">
          <ProductCard
            product={product}
            className="flex-auto place-self-stretch rounded-b-[20px] bg-base-100 px-5 lg:w-[60%] lg:rounded-[20px] lg:px-16"
          />
          <div className="flex w-full place-content-center">
            <Image
              height="600"
              width="600"
              layout="intrinsic"
              objectFit="contain"
              className="rounded-[20px]"
              alt={product.name}
              src={product.imageURL}
            />
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="ml-6 mb-20 w-fit lg:mt-12 lg:ml-0"
        >
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
      {product.Edible != null && (
        <NutritionFacts product={product} className="mx-4 mb-14 " />
      )}
      <RelatedRecipes />
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
      className={`relative flex flex-col place-content-between space-y-4 pb-10 lg:place-content-center lg:py-10 ${className}`}
    >
      {data?.user?.role == "admin" && (
        <DotMenu
          id={product.id}
          name={product.name}
          type="producto"
          deleteFunction={deleteProduct}
          updateFunction={updateProduct}
          className="absolute top-1 right-0 lg:top-5 lg:right-3"
        />
      )}
      <p className="inline-block w-full text-center font-raleway text-[40px] font-black uppercase text-base-content sm:text-2xl lg:text-left">
        {product.name}
      </p>
      <p className="text-center font-sans text-xs leading-[20px] sm:text-sm lg:pr-[10%] lg:text-justify">
        {product.description}
      </p>
      <p className="py-4 text-center font-sans text-sm sm:text-base lg:text-left">
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
  const productAmount: Record<ProductUnit, number> = {
    grams: 100,
    kilograms: 0.5,
    liters: 0.5,
    milliliters: 250,
    unit: 1,
  };
  const [amount, setAmount] = React.useState(
    productAmount[product.ProductUnit],
  );

  return (
    <div className="flex h-10 flex-row place-content-between space-x-6 sm:mx-20 sm:h-12 md:h-14 lg:mx-0 lg:items-center">
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
      <Addproductchart amount={amount} product={product} className="h-full" />
    </div>
  );
};

const NutritionFacts = ({
  product,
  className,
}: {
  product: IProduct;
  className?: string;
}) => {
  const allergensList = product.Edible?.allergens.map((e) => e.allergen) ?? [];
  const unitPrice = {
    grams: "g",
    kilograms: "g",
    liters: "ml",
    milliliters: "ml",
    unit: "u",
  };

  const unit = unitPrice[product.ProductUnit];

  function scroll() {
    window.scrollTo({
      top: 220 + (document.getElementById("nutritionFacts")?.offsetLeft ?? 800),
      behavior: "smooth",
    });
  }

  return !product.Edible ? (
    <></>
  ) : (
    <div
      className={`relative rounded-3xl bg-base-100 px-5 py-10 sm:mx-6 sm:py-16 sm:px-8 lg:px-24 ${className}`}
    >
      <div className="absolute -top-[78px] left-0 flex w-full place-content-center px-[24px]">
        <Image
          src="/img/ellipse.svg"
          alt=""
          className="-z-10 select-none"
          width={"300%"}
          height={"200%"}
          layout="fixed"
          objectFit="contain"
        />
        <p
          id="nutritionFacts"
          onClick={scroll}
          className="absolute top-12 h-12 cursor-pointer select-none font-satoshiBold text-xs"
        >
          saber más
        </p>
      </div>
      <h1 className="whitespace-nowrap text-center font-raleway text-[21px] sm:text-[38px] md:text-[45px] lg:text-left lg:text-xl">
        INFORMACIÓN NUTRICIONAL
      </h1>

      <div className="mt-3 flex flex-col place-content-between lg:flex-row lg:gap-14">
        {allergensList.length > 0 && (
          <AllergenDescription allergens={allergensList} />
        )}
        <table className="mt-3 max-w-7xl grow table-auto text-xs sm:text-base">
          <thead>
            <tr>
              <th className="pb-4 text-left"></th>
              <th className="whitespace-nowrap pb-4 text-left">100 {unit}</th>
              <th className="whitespace-nowrap pb-4 text-left">30 {unit}</th>
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
                {product.Edible?.nutritionFacts.fat + " g"}
              </td>
              <td className="whitespace-nowrap py-3">
                {Math.round(product.Edible?.nutritionFacts.fat * 0.3) + " g"}
              </td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Ácidos grasos saturados</td>
              <td className="whitespace-nowrap py-3 pr-14"> {"-"} </td>
              <td className="whitespace-nowrap py-3"> {"-"} </td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Hidratos</td>
              <td className="whitespace-nowrap py-3 pr-14">
                {product.Edible?.nutritionFacts.carbohydrates + " g"}
              </td>
              <td className="whitespace-nowrap py-3">
                {Math.round(
                  product.Edible?.nutritionFacts.carbohydrates * 0.3,
                ) + " g"}
              </td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Proteínas</td>
              <td className="whitespace-nowrap py-3 pr-14">
                {product.Edible?.nutritionFacts.protein + " g"}
              </td>
              <td className="py-3">
                {Math.round(product.Edible?.nutritionFacts.protein * 0.3) +
                  " g"}
              </td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Fibra</td>
              <td className="whitespace-nowrap py-3 pr-14">{"-"}</td>
              <td className="py-3">{"-"}</td>
            </tr>
            <tr className="border-b border-base-content border-opacity-30">
              <td className="py-3 pr-14">Sal</td>
              <td className="whitespace-nowrap py-3 pr-14">{"-"}</td>
              <td className="whitespace-nowrap py-3">{"-"}</td>
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
    <div className="flex flex-col">
      <p className="text-sm sm:text-base">Alérgenos</p>
      {allergens.map((allergen) => (
        <div className="mt-2 flex py-2 align-middle" key={allergen}>
          <AllergensComponent allergens={[allergen]} size={30} />
          <p className="ml-2 mt-1 inline-block first-letter:uppercase">
            {allergenTransalator?.get(allergen)}
          </p>
        </div>
      ))}
    </div>
  );
};

const RelatedRecipes = ({ product }: { product: IProduct }) => {
  return (
    <SliderRecipes
      isBig={true}
      recipes={product.Edible?.Ingredient?.RecipeIngredient.map(
        (recipe) => recipe.Recipe,
      )}
    />
  );
};

export default ProductDetail;
