import Link from "next/link";
import Image from "next/image";

function FavouriteRecipes({
  name,
  image,
  id,
}: {
  name: string;
  image: string;
  id: string;
}) {
  return (
    <div className="flex flex-row shadow-lg hover:shadow-kym4">
      <Link href={`/recipe/${id}`}>
        <a>
          <Image
            src={image}
            alt="notfound"
            width="75"
            height="75"
            layout="fixed"
            objectFit="cover"
            className="rounded-md"
          ></Image>
        </a>
      </Link>
      <p className="m-5"> {name} </p>
    </div>
  );
}

export default FavouriteRecipes;
