import router from "next/router";
import { useState } from "react";

function CategoryCards() {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      className={`${
        clicked && "active:border-primary active:bg-primary active:text-white"
      } relative flex h-full w-full cursor-pointer flex-col rounded-md border-[1px] border-base-content px-5 pt-3 `}
    >
      <button onClick={() => setClicked(true)}>
        <h1 className="flex  h-full w-full justify-items-start pb-6 text-start align-top font-raleway text-lg">
          FRUTOS SECOS Y FRUTAS DESHIDRATADAS
        </h1>
      </button>
      <div className="absolute bottom-5 gap-2 ">
        <button
          className="z-10 mr-2 rounded-full border-[1px] border-base-100 border-transparent px-2 hover:border-base-content active:border-primary active:bg-primary active:text-white"
          onClick={() => router.push("/product")}
        >
          Deshidratadas
        </button>

        <button
          name="categories"
          className="z-10 mr-2 rounded-full border-[1px] border-base-100 border-transparent px-2 hover:border-base-content active:border-primary active:bg-primary active:text-white"
          onClick={() => setClicked(false)}
        >
          Deshidratadas
        </button>

        <button
          name="categories"
          className=" z-10 mr-2 rounded-full border-[1px] border-base-100 border-transparent px-2 hover:border-base-content active:border-primary active:bg-primary active:text-white"
          onClick={() => router.push("/product")}
        >
          Deshidratadas
        </button>
      </div>
    </div>
  );
}
export default CategoryCards;
