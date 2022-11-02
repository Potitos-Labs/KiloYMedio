import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import RecipeCard from "./RecipeCard";

const RecipeDisplayer = ({
  title,
  recipes,
}: {
  title: string;
  recipes?: { id: string; name: string; imageURL: string }[];
}) => {
  const [count, setCount] = useState(0);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft - 500;
    count > 500 ? setCount(count - 500) : setCount(0);
    console.log(count);
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft + 500;

    count + 500 < slider!.offsetWidth
      ? setCount(count + 500)
      : setCount(slider!.offsetWidth);
    console.log(count);
  };

  return (
    <div className="mt-4 mx-6">
      <p className="font-bold mb-2 text-kym3  normal-case text-2xl">{title}</p>

      <div className="relative flex items-center  border-slate-200 border-2  rounded-md shadow-xl">
        <MdChevronLeft
          className="opacity-50 cursor-pointer  hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className="hide-scroll-bar w-full h-full  py-6 overflow-x-auto whitespace-nowrap scroll-smooth align-middle items-center flex"
        >
          {recipes?.map((recipe) => (
            <RecipeCard
              id={recipe.id}
              name={recipe.name}
              ratings={0}
              imageURL={recipe.imageURL}
              key={recipe.id}
            ></RecipeCard>
          ))}
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer  hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </div>
  );
};

export default RecipeDisplayer;
