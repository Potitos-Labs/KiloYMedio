import { count } from "console";
import Image from "next/image";
import { useState } from "react";
function Product({ name, imgUrl }: { name: string; imgUrl: string }) {
  const [weight, setWeight] = useState(100);
  function incrementClick() {
    setWeight(weight + 100);
  }
  function decrementClick() {
    setWeight(weight - 100);
  }
  return (
    <div className=" py-8 shadow-lg hover:shadow-2xl flex flex-col text-center justify-center items-center">
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
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"
          onClick={decrementClick}
        >
          -
        </button>
        <p className="border-2 rounded-md px-4 mx-2">{weight} g</p>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"
          onClick={incrementClick}
        >
          +
        </button>
      </div>
      <div>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-12 border border-blue-500 hover:border-transparent rounded">
          Añadir
        </button>
      </div>
    </div>
  );
}
export default Product;
