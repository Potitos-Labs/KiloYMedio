import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Layout from "../../components/Layout";
import Category from "../../components/category/Category";
import Image from "next/image";
import Link from "next/link";

const CategoryDisplay: NextPage = () => {
  const { data: eCategories } = trpc.product.getAllEdibleCategories.useQuery();
  const { data: nCategories } =
    trpc.product.getAllNonEdibleCategories.useQuery();
  return (
    <Layout>
      <div className="bg-kym3 p-4 font-bold text-white">Comestibles</div>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {eCategories ? (
          eCategories.map((ecategory) => (
            <Category
              key={ecategory.id}
              name={ecategory.categoryInSpanish}
              imgURL={ecategory.imageURL}
              englishName={ecategory.category}
              id={ecategory.id}
            ></Category>
          ))
        ) : (
          <p className="text-right">Cargando...</p>
        )}
      </div>

      <div className="bg-kym3 p-4 font-bold text-white">No comestibles</div>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {nCategories ? (
          nCategories.map((nCategory) => (
            <Category
              key={nCategory.id}
              name={nCategory.categoryInSpanish}
              englishName={nCategory.category}
              imgURL={nCategory.imageURL}
              id={nCategory.id}
            ></Category>
          ))
        ) : (
          <p className="text-right">Cargando...</p>
        )}
      </div>
      <div className="bg-kym3 p-4 font-bold text-white">General</div>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="flex flex-col items-center justify-center rounded-md pb-6 pt-10 text-center shadow-lg hover:shadow-kym4">
          <div className="mb-5">
            <Link href={`/product`}>
              {/* completar */}
              <a>
                <Image
                  src="https://ecologiautil.com/wp-content/uploads/2020/07/productos-ecologicos-y-sin-plastico-1.jpg"
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
          <h1 className="pb-2 font-semibold text-kym4 first-letter:uppercase">
            Todos los productos
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDisplay;
