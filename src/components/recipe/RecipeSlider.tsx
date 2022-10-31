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
  //const MaxWidth = document.getElementById("slider")!.offsetWidth;
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft - 500;
    count > 500 ? setCount(count - 500) : setCount(0);
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft + 500;
    count < slider!.offsetWidth
      ? setCount(count + 500)
      : setCount(slider!.offsetWidth);
  };

  return (
    <div className="mt-4">
      <p>{title}</p>
      <div className="relative flex items-center">
        <MdChevronLeft
          className={`opacity-50 cursor-pointer ${
            count <= 0 ? "invisible" : "hover:opacity-100"
          }`}
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className="w-full h-full  py-6 overflow-x-auto whitespace-nowrap scroll-smooth"
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
          className={`opacity-50 cursor-pointer ${
            count >= 5800 ? "invisible" : "hover:opacity-100"
          }`}
          onClick={slideRight}
          size={40}
        />
      </div>
    </div>
  );
};

export default RecipeDisplayer;
