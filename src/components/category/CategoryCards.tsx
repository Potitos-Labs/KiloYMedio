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

  return (
    <div
      className={`${
        clicked && "border-primary bg-primary text-white"
      } relative flex h-full w-full cursor-pointer flex-col rounded-md border-[1px] border-base-content  `}
    >
      <button
        className="h-full w-full px-3 pt-1 lg:px-5 lg:pt-3"
        onMouseDown={() => setClicked(true)}
        onMouseLeave={() => setClicked(false)}
        onMouseUp={() => {
          setClicked(true);
          router.push(`/product?supracategory=${name}&category=`);
          closePopUp();
        }}
      >
        <h1 className="flex  h-full w-full justify-items-start pb-6 text-start align-top font-raleway  text-xs uppercase lg:text-lg">
          {name}
        </h1>
      </button>

      <div className="absolute bottom-1 left-1 flex gap-1 md:gap-2 xl:bottom-5 xl:left-5 ">
        {relations.map((cat, index) => (
          <div
            key={index}
            className="z-10 mr-1 flex rounded-full border-[1px] border-base-100 border-transparent px-1 text-center text-[14px] hover:border-base-content active:border-primary active:bg-primary active:text-white md:px-2 md:text-xs lg:mr-2 lg:text-sm"
            onClick={() => {
              closePopUp();
            }}
          >
            <Link
              href={`/product?supracategory=${name}&category=${cat.category}`}
            >
              {cat.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryCards;
