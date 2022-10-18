import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import IncDecButtons from "./IncDecButtons";

function Product({
  name,
  imgUrl,
  id,
  stock,
}: {
  name: string;
  imgUrl: string;
  id: string;
  stock: number;
}) {
  const notify = () => toast.success("Producto añadido");
  const [weight, setWeight] = useState(100);
  const utils = trpc.useContext();
  const mutation = trpc.useMutation(["cart.addProduct"], {
    onSuccess() {
      utils.invalidateQueries("cart.getAllCartProduct");
    },
  });

  function addToCart() {
    if (stock * 1000 >= 100) {
      notify();
      mutation.mutateAsync({ productId: id, amount: weight });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center shadow-lg hover:shadow-2xl">
      <div className="py-6">
        <Link href={`/product/${id}`}>
          <a>
            <Image
              src={imgUrl}
              alt="notfound"
              width="100"
              height="100"
              layout="fixed"
              objectFit="cover"
            ></Image>
          </a>
        </Link>
      </div>
      <h1 className="normal-case">{name}</h1>
      <IncDecButtons setWeight={setWeight} weight={weight} stock={stock} />
      <div>
        <button
          onClick={addToCart}
          className="rounded border border-button bg-transparent px-12 font-semibold text-kym4 hover:border-transparent hover:bg-button_hover hover:text-white"
        >
          Añadir
        </button>
      </div>
    </div>
  );
}
export default Product;
