import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import Layout from "../../components/Layout";
import Category from "../../components/category/Category";
import { trpc } from "../../utils/trpc";

const CategoryDisplay: NextPage = () => {
  const { data: eCategories } = trpc.product.getAllEdibleCategories.useQuery();
  const { data: nCategories } =
    trpc.product.getAllNonEdibleCategories.useQuery();
  return (
    <Layout>
      <div className="mx-12 mt-12 grid grid-cols-2 border-b-2 border-kym3">
        <p className="font-bold sm:text-lg">Comestibles</p>
      </div>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {eCategories ? (
          eCategories.categories.map(
            ({ id, category, imageURL, categoryInSpanish }) => (
              <Category
                key={id}
                name={categoryInSpanish}
                imgURL={imageURL}
                englishName={category}
              ></Category>
            ),
          )
        ) : (
          <p className="items-center font-semibold text-kym4">Cargando...</p>
        )}
      </div>

      <div
        id="nCat"
        className="mx-12 mt-12 grid grid-cols-2 border-b-2 border-kym3"
      >
        <p className="font-bold sm:text-lg">No comestibles</p>
      </div>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {nCategories ? (
          nCategories.map((nCategory) => (
            <Category
              key={nCategory.id}
              name={nCategory.categoryInSpanish}
              englishName={nCategory.category}
              imgURL={nCategory.imageURL}
            ></Category>
          ))
        ) : (
          <p className="items-center font-semibold text-kym4">Cargando...</p>
        )}
      </div>
      <div className="mx-12 mt-12 grid grid-cols-2 border-b-2 border-kym3">
        <p className="font-bold sm:text-lg">General</p>
      </div>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="items-center justify-center rounded-md pb-6 pt-10 text-center shadow-lg hover:shadow-kym4">
          <div className="mb-5">
            <Link href={`/product`}>
              <Image
                src="https://ecologiautil.com/wp-content/uploads/2020/07/productos-ecologicos-y-sin-plastico-1.jpg"
                alt="notfound"
                width="100"
                height="100"
                layout="fixed"
                objectFit="cover"
                className="rounded-md"
              ></Image>
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
