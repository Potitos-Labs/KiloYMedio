import { trpc } from "../../utils/trpc";
import { IProduct } from "@utils/validations/product";
import { toast } from "react-toastify";
import { Dispatch, useEffect, useRef, useState } from "react";
import { ProductUnit } from "@prisma/client";
import { BsArrowRightShort } from "react-icons/bs";
import { useSession } from "next-auth/react";
import router from "next/router";
import { TiShoppingCart } from "react-icons/ti";
import { motion, useAnimation, PanInfo } from "framer-motion";

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
  const controls = useAnimation();
  const cartRef = useRef(null);
  const [cartWidth, setCartWidth] = useState(0);
  const session = useSession();
  const utils = trpc.useContext();

  const mutation = trpc.cart.addProduct.useMutation({
    onSuccess() {
      utils.cart.getAllCartProduct.invalidate();
    },
  });

  const stockLeft =
    amount + incdecValues[product.ProductUnit] <=
    product.stock * maxValues[product.ProductUnit];

  let price = product.Edible
    ? (amount / productPrice[product.ProductUnit]) *
      product.Edible.priceByWeight
    : amount *
      (product.NonEdible?.price ?? 0 / productPrice[product.ProductUnit]);
  price = Math.round(price * 100) / 100;

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

  useEffect(() => {
    if (setPrices && typeof index === "number") {
      setPrices((prices) => prices.map((p, i) => (i === index ? price : p)));
    }
  }, [index, price, setPrices]);

  const handlePan = (event: any, info: PanInfo) => {
    const x = info.offset.x;
    if (x > 0) {
      controls.set({ x: x < cartWidth ? x : cartWidth });
    }
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    if (info.offset.x >= cartWidth) {
      addToCart();
    }
    controls.start({ x: 0 });
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setCartWidth(
          Number(
            cartRef.current &&
              window.getComputedStyle(cartRef.current).width.slice(0, -2),
          ) - (window.innerWidth <= 640 ? 50 : 128), //Tamaños del div negro que se arrastra (defaultWidth: 50, sm:w-32 -> 128)
        );
      },
      {},
    );
    setCartWidth(
      Number(
        cartRef.current &&
          window.getComputedStyle(cartRef.current).width.slice(0, -2),
      ) - (window.innerWidth <= 640 ? 50 : 128), //Tamaños del div negro que se arrastra (defaultWidth: 50, sm:w-32 -> 128)
    );
  }, [cartRef]);

  return (
    <div
      ref={cartRef}
      className={`relative w-36 max-w-[256px] self-center rounded-full bg-transparent ring-1 ring-base-content ring-offset-0 sm:w-56 lg:w-64 text-base-100${
        !stockLeft && "cursor-not-allowed opacity-50"
      } ${className}`}
    >
      <>
        <motion.div
          animate={controls}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          className="absolute top-0 left-0	flex h-full w-[50px] cursor-grabbing touch-none select-none flex-col items-center justify-center self-center whitespace-nowrap rounded-full bg-base-content text-center text-sm text-base-100 sm:w-32"
        >
          <span
            className={`hidden px-1 sm:block sm:px-2 sm:text-sm ${
              smTextSize ? smTextSize : "text-sm"
            }`}
          >
            {price + " €"}
          </span>
          <TiShoppingCart className="block sm:hidden" />
        </motion.div>
        <div
          onClick={addToCart}
          className="ml-[50px] flex h-full flex-initial cursor-pointer flex-row justify-center self-center px-1 sm:ml-32 sm:px-2"
        >
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
      </>
    </div>
  );
}
export default Addproductchart;
