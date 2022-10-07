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
      <div>
        <Image
          src={imgUrl}
          alt="notfound"
          width="80"
          height="80"
          layout="fixed"
          objectFit="cover"
        ></Image>
      </div>
      <h1>{name}</h1>
      <div className="flex flex-row gap-4 ">
        <button onClick={decrementClick}>-</button>
        <p>{weight} g</p>
        <button onClick={incrementClick}>+</button>
      </div>
      <div>
        <button>Añadir</button>
      </div>
    </div>
  );
}
export default Product;
