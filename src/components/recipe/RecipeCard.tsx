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
    <div className="relative flex-col items-center justify-center rounded-md py-8 text-center shadow-lg hover:shadow-kym4 w-44 h-64 inline-block mx-4">
      <div className="py-3">
        <Link href={`/product/${id}`}>
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
