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
    <div>
      <div>
        <img src={imgUrl} alt="notfound" className="w-20 h-20"></img>
      </div>
      <h1>{name}</h1>
      <div>
        <button onClick={decrementClick}>-</button>
        <p>{weight} g</p>
        <button onClick={incrementClick}>+</button>
        <button>Añadir</button>
      </div>
    </div>
  );
}
export default Product;
