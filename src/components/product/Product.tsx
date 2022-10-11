import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
function Product({
  name,
  imgUrl,
  id,
}: {
  name: string;
  imgUrl: string;
  id: string;
}) {
  const [weight, setWeight] = useState(100);
  function incrementClick() {
    if (weight != 10000) {
      setWeight(weight + 100);
    }
  }
  function decrementClick() {
    if (weight != 0) {
      setWeight(weight - 100);
    }
  }
  function addToCart() {
    //trpc.useMutation(["cart.addProduct"], {productId: id, amount: weight });
  }
  return (
    <div className=" flex flex-col items-center justify-center py-8 text-center shadow-lg hover:shadow-2xl">
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
      <h1 className="capitalize">{name}</h1>
      <div className="flex flex-row py-4">
        <button
          className="rounded border border-button bg-transparent px-2 font-semibold text-kym4 hover:border-transparent hover:bg-button_hover hover:text-white"
          onClick={decrementClick}
        >
          -
        </button>
        <p className="mx-2 rounded-md border-2 px-4">{weight} g</p>
        <button
          className="rounded border border-button bg-transparent px-2 font-semibold text-kym4 hover:border-transparent hover:bg-button_hover hover:text-white"
          onClick={incrementClick}
        >
          +
        </button>
      </div>
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
