import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import DotMenu from "../DotMenu";
import IncDecButtons from "./IncDecButtons";

function Product({
  name,
  imgUrl,
  id,
  stock,
  isEdible,
}: {
  name: string;
  imgUrl: string;
  id: string;
  stock: number;
  isEdible: boolean;
}) {
  const notify = () => toast.success("Producto añadido");
  const stockLeft = stock * 1000 >= 100;
  const [amount, setAmount] = useState(isEdible ? 100 : 1);
  const utils = trpc.useContext();
  const mutation = trpc.cart.addProduct.useMutation({
    onSuccess() {
      utils.cart.getAllCartProduct.invalidate();
    },
  });

  function addToCart() {
    if (stockLeft) {
      notify();
      mutation.mutateAsync({ productId: id, amount: amount });
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center rounded-md py-8 text-center shadow-lg hover:shadow-kym4">
      <div className="py-3">
        <Link href={`/product/${id}`}>
          <a>
            <Image
              src={imgUrl}
              alt="notfound"
              width="100"
              height="100"
              layout="fixed"
              objectFit="cover"
              className="rounded-md"
            ></Image>
          </a>
        </Link>
      </div>
      <div className="absolute top-0 right-0">
        <DotMenu id={id} />
      </div>
      <p className="pb-2 font-semibold text-kym4 first-letter:uppercase">
        {name}
      </p>
      <div>
        <IncDecButtons
          setAmount={setAmount}
          amount={amount}
          stock={stock}
          stockLeft={stockLeft}
          isEdible={isEdible}
        />
        <button
          disabled={!stockLeft}
          onClick={addToCart}
          className={`w-full rounded-xl border border-button bg-transparent px-12 text-kym4  ${
            !stockLeft
              ? "cursor-not-allowed px-10 opacity-50"
              : "hover:border-transparent hover:bg-button_hover hover:text-white"
          }`}
        >
          {stockLeft ? "Añadir" : "Agotado"}
        </button>
      </div>
    </div>
  );
}
export default Product;
