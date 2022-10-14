import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Layout from "../../components/Layout";
import Category from "../../components/category/Category";
import Image from "next/image";
import Link from "next/link";

const CategoryDisplay: NextPage = () => {
  const { data: eCategories } = trpc.useQuery([
    "product.getAllEdibleCategories",
  ]);
  const { data: nCategories } = trpc.useQuery([
    "product.getAllNonEdibleCategories",
  ]);
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

      <div className="bg-kym3 p-4 font-bold text-white">No Comestibles</div>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {nCategories ? (
          nCategories.map((ecategory) => (
            <Category
              key={ecategory.id}
              name={ecategory.categoryInSpanish}
              englishName={ecategory.category}
              imgURL={ecategory.imageURL}
              id={ecategory.id}
            ></Category>
          ))
        ) : (
          <p className="text-right">Cargando...</p>
        )}
      </div>
      <div className="bg-kym3 p-4 font-bold text-white">General</div>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className=" flex flex-col items-center justify-center py-8 text-center shadow-lg hover:shadow-2xl">
          <div className="py-6">
            <Link href={`/category/`}>
              {/* completar */}
              <a>
                <Image
                  src="https://cdn.shopify.com/s/files/1/0469/5280/8611/articles/harina_1024x.jpg?v=1609951043"
                  alt="notfound"
                  width="100"
                  height="100"
                  layout="fixed"
                  objectFit="cover"
                ></Image>
              </a>
            </Link>
          </div>
          <h1 className="normal-case">Todos los productos</h1>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDisplay;