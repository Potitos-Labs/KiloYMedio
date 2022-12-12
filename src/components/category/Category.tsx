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
    <Link href={`/product?category=${englishName}`}>
      <div className="flex cursor-pointer flex-col items-center justify-center rounded-md bg-white pb-6 pt-10 text-center shadow-lg hover:shadow-base-200">
        <div className="mb-5">
          <Image
            src={imgURL}
            alt="notfound"
            width="100"
            height="100"
            layout="fixed"
            objectFit="cover"
            className="rounded-md"
          ></Image>
        </div>
        <h1 className="pb-2 font-semibold text-base-200 first-letter:uppercase">
          {name}
        </h1>
      </div>
    </Link>
  );
}
export default Category;
