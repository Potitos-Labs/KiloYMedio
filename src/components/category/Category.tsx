import Image from "next/image";
import Link from "next/link";

function Category({
  name,
  englishName,
  imgURL,
  id,
}: {
  name: string;
  englishName: string;
  imgURL: string;
  id: string;
}) {
  return (
    <div className=" flex flex-col items-center justify-center py-8 text-center shadow-lg hover:shadow-2xl">
      <div className="py-6">
        <Link href={`/product?catergory=${englishName}`}>
          <a>
            <Image
              src={imgURL}
              alt="notfound"
              width="100"
              height="100"
              layout="fixed"
              objectFit="cover"
            ></Image>
          </a>
        </Link>
      </div>
      <h1 className="normal-case">{name}</h1>
    </div>
  );
}
export default Category;
