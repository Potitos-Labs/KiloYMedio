import { SupraCategoryRelation } from "@prisma/client";
import router from "next/router";
import { useState } from "react";

function CategoryCards({
  name,
  relations,
}: {
  name: string;
  relations: SupraCategoryRelation[];
}) {
  const [clicked, setClicked] = useState(Boolean);
  function push() {
    setClicked(true);
    router.push("/product?category=" + name);
  }
  return (
    <div
      className={`${
        clicked && "border-primary bg-primary text-white"
      } relative flex h-full w-full cursor-pointer flex-col rounded-md border-[1px] border-base-content px-5 pt-3 `}
    >
      <button className="h-full" onClick={() => push()}>
        <h1 className="flex  h-full w-full justify-items-start pb-6 text-start align-top font-raleway text-lg uppercase">
          {name}
        </h1>
      </button>

      <div className="absolute bottom-5 gap-2 ">
        {relations.map((cat, index) => (
          <button
            key={index}
            className="z-10 mr-2 rounded-full border-[1px] border-base-100 border-transparent px-2 hover:border-base-content active:border-primary active:bg-primary active:text-white"
            onClick={() => router.push("/product?category=" + cat.category)}
          >
            {cat.category}
          </button>
        ))}
      </div>
    </div>
  );
}
export default CategoryCards;
