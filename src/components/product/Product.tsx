import Image from "next/image";
import { useState } from "react";
function Product({ name, imgUrl }: { name: string; imgUrl: string }) {
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
  return (
    <div className=" flex flex-col items-center justify-center py-8 text-center shadow-lg hover:shadow-2xl">
      <div className="py-6">
        <Image
          src={imgUrl}
          alt="notfound"
          width="100"
          height="100"
          layout="fixed"
          objectFit="cover"
        ></Image>
      </div>
      <h1>{name}</h1>
      <div className="flex flex-row py-4">
        <button
          className="rounded border border-blue-500 bg-transparent px-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
          onClick={decrementClick}
        >
          -
        </button>
        <p className="mx-2 rounded-md border-2 px-4">{weight} g</p>
        <button
          className="rounded border border-blue-500 bg-transparent px-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
          onClick={incrementClick}
        >
          +
        </button>
      </div>
      <div>
        <button className="rounded border border-blue-500 bg-transparent px-12 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white">
          Añadir
        </button>
      </div>
    </div>
  );
}
export default Product;
