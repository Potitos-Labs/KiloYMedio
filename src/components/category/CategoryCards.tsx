import { ECategory } from "@prisma/client";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";

function CategoryCards({
  name,
  relations,
  closePopUp,
}: {
  name: string;
  relations: { category: ECategory; text: string }[];
  closePopUp: () => void;
}) {
  const [clicked, setClicked] = useState(Boolean);
  function buildURL() {
    let URL = "/product?category=";
    for (let i = 0; i < relations.length; i++) {
      URL += relations[i]?.category;
      if (i != relations.length - 1) {
        URL += ",";
      }
    }
    return URL;
  }
  function push() {
    setClicked(true);
    const URL = buildURL();
    router.push(URL);
    closePopUp();
  }
  return (
    <div
      className={`${
        clicked && "border-primary bg-primary text-white"
      } relative flex h-full w-full cursor-pointer flex-col rounded-md border-[1px] border-base-content px-3 pt-1 lg:px-5 lg:pt-3 `}
    >
      <button
        className="h-full"
        onMouseDown={() => setClicked(true)}
        onMouseUp={() => push()}
      >
        <h1 className="flex  h-full w-full justify-items-start pb-6 text-start align-top font-raleway  text-xs uppercase lg:text-lg">
          {name}
        </h1>
      </button>

      <div className="absolute bottom-1 flex gap-1 md:gap-2 xl:bottom-5 ">
        {relations.map((cat, index) => (
          <div
            key={index}
            className="z-10 mr-1 flex rounded-full border-[1px] border-base-100 border-transparent px-1 text-center text-xs hover:border-base-content active:border-primary active:bg-primary active:text-white md:px-2 lg:mr-2 lg:text-sm"
            onClick={() => {
              closePopUp();
            }}
          >
            <Link href={`/product?category=${cat.category}`}>{cat.text}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryCards;
