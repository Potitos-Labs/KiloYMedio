import Link from "next/link";

import Stars from "../Stars";

const RecipeCard = ({
  id,
  name,
  ratings,
}: {
  id: string;
  name: string;
  ratings: number;
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-md py-8 text-center shadow-lg hover:shadow-kym4">
      <div className="py-3">
        <Link href={`/product/${id}`}>
          <a></a>
        </Link>
      </div>

      <p className="pb-2 font-semibold text-kym4 first-letter:uppercase">
        {name}
      </p>
      <div>
        <Stars average={ratings}></Stars>
      </div>
    </div>
  );
};
export default RecipeCard;
