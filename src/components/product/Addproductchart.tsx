import { trpc } from "../../utils/trpc";
import { IProduct } from "@utils/validations/product";
import { toast } from "react-toastify";
import { Dispatch, useEffect } from "react";
import { ProductUnit } from "@prisma/client";

const productPrice: Record<ProductUnit, number> = {
  grams: 1000,
  kilograms: 1,
  liters: 1,
  milliliters: 1000,
  unit: 1,
};

function Addproductchart({
  amount,
  product,
  className,
  index,
  setPrices,
}: {
  amount: number;
  product: IProduct;
  className?: string;
  index?: number;
  setPrices?: Dispatch<React.SetStateAction<number[]>>;
}) {
  const utils = trpc.useContext();
  const stockLeft = product.stock * 1000 >= 100;
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
      className={`rounded-full bg-transparent ring-1 ring-base-content ring-offset-0 text-base-100${
        !stockLeft && "cursor-not-allowed opacity-50"
      } ${className}`}
    >
      <div className="flex h-full flex-row">
        <div className="flex h-full w-20 flex-col items-center justify-center self-center whitespace-nowrap rounded-full bg-base-content text-center text-sm text-base-100 sm:w-24">
          <span className="px-2 text-xs sm:text-sm">{price + " €"}</span>
        </div>
        <div className=" flex-initial self-center whitespace-nowrap px-2 text-center text-xs sm:text-sm">
          {stockLeft ? "añadir a la cesta" : "agotado"}
        </div>
      </div>
    </button>
  );
}
export default Addproductchart;
