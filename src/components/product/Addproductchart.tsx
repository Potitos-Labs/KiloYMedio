import { trpc } from "../../utils/trpc";
import { IProduct } from "@utils/validations/product";
import { toast } from "react-toastify";
import { Dispatch, useEffect } from "react";
import { ProductUnit } from "@prisma/client";
import { BsArrowRightShort } from "react-icons/bs";
import { useSession } from "next-auth/react";
import router from "next/router";
import { TiShoppingCart } from "react-icons/ti";

const productPrice: Record<ProductUnit, number> = {
  grams: 1000,
  kilograms: 1,
  liters: 1,
  milliliters: 1000,
  unit: 1,
};

const incdecValues = {
  grams: 100,
  kilograms: 0.5,
  liters: 0.5,
  milliliters: 250,
  unit: 1,
  min: 1,
  pers: 1,
};

const maxValues = {
  grams: 1000,
  kilograms: 1,
  liters: 1,
  milliliters: 1000,
  unit: 1,
  min: 1,
  pers: 1,
};

function Addproductchart({
  amount,
  product,
  className,
  index,
  smTextSize,
  setPrices,
}: {
  amount: number;
  product: IProduct;
  className?: string;
  index?: number;
  smTextSize?: string;
  setPrices?: Dispatch<React.SetStateAction<number[]>>;
}) {
  const session = useSession();

  const stockLeft =
    amount + incdecValues[product.ProductUnit] <=
    product.stock * maxValues[product.ProductUnit];
  const utils = trpc.useContext();
  const mutation = trpc.cart.addProduct.useMutation({
    onSuccess() {
      utils.cart.getAllCartProduct.invalidate();
    },
  });

  function addToCart() {
    if (session.status === "unauthenticated") {
      router.push(`/login?prev=${router.asPath}`);
      return;
    }
    if (stockLeft) {
      toast.success("Producto añadido");
      mutation.mutateAsync({ productId: product.id, amount: amount });
    }
  }

  let price = product.Edible
    ? (amount / productPrice[product.ProductUnit]) *
      product.Edible.priceByWeight
    : amount *
      (product.NonEdible?.price ?? 0 / productPrice[product.ProductUnit]);
  price = Math.round(price * 100) / 100;

  useEffect(() => {
    if (setPrices && typeof index === "number") {
      setPrices((prices) => prices.map((p, i) => (i === index ? price : p)));
      console.log({ index, price, setPrices });
    }
  }, [index, price, setPrices]);

  return (
    <button
      onClick={addToCart}
      disabled={mutation.isLoading}
      className={`w-full max-w-[256px] self-center rounded-full bg-transparent ring-1 ring-base-content ring-offset-0 text-base-100${
        !stockLeft && "cursor-not-allowed opacity-50"
      } ${className}`}
    >
      <div className="flex h-full flex-row">
        <div className="flex h-full w-24 min-w-[50px] flex-initial flex-col items-center justify-center self-center whitespace-nowrap rounded-full bg-base-content text-center text-sm text-base-100 sm:w-32">
          <span
            className={`hidden px-1 sm:block sm:px-2 sm:text-sm ${
              smTextSize ? smTextSize : "text-sm"
            }`}
          >
            {price + " €"}
          </span>
          <TiShoppingCart className="block sm:hidden" />
        </div>
        <div className="flex w-full flex-initial flex-row justify-center  px-1 sm:px-2">
          <p
            className={`hidden self-center text-center leading-5 sm:block sm:text-sm ${
              smTextSize ? smTextSize : "text-sm"
            }`}
          >
            {stockLeft ? "añadir" : "agotado"}
          </p>
          <span
            className={`block self-center whitespace-nowrap px-1 sm:hidden sm:px-2 sm:text-sm ${
              smTextSize ? smTextSize : "text-sm"
            }`}
          >
            {price + " €"}
          </span>
          <BsArrowRightShort
            size={25}
            className={`my-auto sm:ml-2 sm:h-8 ${smTextSize ? "h-5" : "h-8"}`}
          />
        </div>
      </div>
    </button>
  );
}
export default Addproductchart;
