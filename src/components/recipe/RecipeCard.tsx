import Image from "next/image";
import Link from "next/link";

import Stars from "../Stars";

export function RecipeCard({
  id,
  name,
  ratings,
  imageURL,
}: {
  id: string;
  name: string;
  ratings: number;
  imageURL: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="min-w-48  relative mx-4 my-4 inline-block h-64 w-48 flex-none flex-col items-center justify-center rounded-md py-8 text-center shadow-md hover:shadow-kym4"
    >
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
      <p className="mx-1 mb-2 whitespace-normal font-semibold text-kym4 first-letter:uppercase">
        {name}
      </p>
      <div className="absolute bottom-0  mb-1 w-full  flex-col items-center justify-center">
        <Stars average={ratings}></Stars>
      </div>
    </div>
  );
}
