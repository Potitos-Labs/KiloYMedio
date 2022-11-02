import Image from "next/image";
import Link from "next/link";

import Stars from "../Stars";

const RecipeCard = ({
  id,
  name,
  ratings,
  imageURL,
}: {
  id: string;
  name: string;
  ratings: number;
  imageURL: string;
}) => {
  return (
    <div className="relative  rounded-md py-8 text-center shadow-lg hover:shadow-kym4 w-48 h-64 min-w-48 inline-block mx-4 flex-col items-center justify-center flex-none">
      <div className="py-3">
        <Link href={`/recipe/${id}`}>
          <a>
            <Image
              src={imageURL}
              alt="notfound"
              width="100"
              height="100"
              layout="fixed"
              objectFit="cover"
              className="rounded-md"
            ></Image>
          </a>
        </Link>
      </div>
      <p className="mb-2 mx-1 font-semibold text-kym4 first-letter:uppercase whitespace-normal">
        {name}
      </p>
      <div className="absolute bottom-0  flex-col justify-center  items-center w-full mb-1">
        <Stars average={ratings}></Stars>
      </div>
    </div>
  );
};
export default RecipeCard;
