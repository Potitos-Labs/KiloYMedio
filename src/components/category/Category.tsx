import Image from "next/image";
import Link from "next/link";

function Category({
  name,
  englishName,
  imgURL,
}: {
  name: string;
  englishName: string;
  imgURL: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md pb-6 pt-10 text-center shadow-lg hover:shadow-kym4">
      <div className="mb-5">
        <Link href={`/product?category=${englishName}`}>
          <a>
            <Image
              src={imgURL}
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
      <Link href={`/product?category=${englishName}`}>
        <h1 className="cursor-pointer pb-2 font-semibold text-kym4 first-letter:uppercase">
          {name}
        </h1>
      </Link>
    </div>
  );
}
export default Category;
