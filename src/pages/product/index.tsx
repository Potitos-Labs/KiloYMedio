import FilterProduct from "components/product/FilterProduct";
import SearchBar from "@components/product/SearchBar";
import { ECategory, NECategory } from "@prisma/client";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";

import superjson from "superjson";
import Layout from "../../components/Layout";
import Product from "../../components/product/Product";
import { trpc } from "../../utils/trpc";
import { IFilterProduct, productSchema } from "../../utils/validations/product";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "@server/trpc/router/_app";
import { createContextInner } from "@server/trpc/context";
import Tittle from "@components/product/Tittle";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFilterSquare } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  const { eCategories, neCategories } =
    await ssg.product.getAllCategories.fetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
      categories: { eCategories, neCategories },
    },
    revalidate: 1,
  };
}
export default function CreateProdcut(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const {
    categories: { eCategories, neCategories },
  } = props;

  function inSpanish(category: ECategory | NECategory | "") {
    if (category === "") return "";
    const ecategory = z.nativeEnum(ECategory).safeParse(category);
    const necategory = z.nativeEnum(NECategory).safeParse(category);
    if (ecategory.success) {
      return (
        eCategories.find((eCategory) => eCategory.category === ecategory.data)
          ?.categoryInSpanish ?? category
      );
    }
    if (necategory.success) {
      return (
        neCategories.find((eCategory) => eCategory.category === necategory.data)
          ?.categoryInSpanish ?? category
      );
    }
  }

  const router = useRouter();
  const category = router.query.category as string;
  const ecategory = z.nativeEnum(ECategory).safeParse(category);
  const necategory = z.nativeEnum(NECategory).safeParse(category);

  const [filter, setFilter] = useState<IFilterProduct>({
    name: "",
    eCategories: ecategory.success ? [ecategory.data] : [],
    neCategories: necategory.success ? [necategory.data] : [],
    minPrice: undefined,
    maxPrice: undefined,
    allergens: [],
    orderByName: "asc",
    orderByPrice: undefined,
  });

  const { data } = trpc.product.getFilteredProducts.useQuery(filter);

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Layout>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div
            className={`${
              openFilter ? "hidden" : "hidden sm:block"
            } ml-12 mt-12 flex h-11 flex-row border-b-2 border-kym3`}
          >
            <p className="grow whitespace-nowrap font-semibold sm:text-lg">
              Filtros de búsqueda
            </p>
          </div>
          <div
            className={`${openFilter ? "absolute mt-2" : ""} z-10 md:max-w-xs`}
          >
            <IoIosCloseCircleOutline
              size={"2rem"}
              onClick={() => setOpenFilter(false)}
              className={`${
                openFilter ? "block" : "hidden"
              } absolute right-2 top-2`}
            />
            <FilterProduct
              className={`${
                openFilter
                  ? "rounded-r-md bg-opacity-95 pt-5 shadow-lg"
                  : "my-12 ml-12 hidden rounded-md sm:block"
              } bg-white`}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
        </div>
        <div className="grow">
          <div className="mx-12 mt-12 flex h-11 flex-row border-b-2 border-kym3">
            <Tittle filter={filter} inSpanish={inSpanish} />
            <div className="b-1 justify-end align-middle">
              <SearchBar filter={filter} setFilter={setFilter} />
            </div>
            <div
              className="flex items-center justify-center justify-items-center"
              onClick={() => setOpenFilter(true)}
            >
              <BsFilterSquare className="ml-3 mb-4 h-6 w-6 self-center justify-self-center sm:hidden" />
            </div>
          </div>
          <div className="min-h-screen py-12 px-12">
            {data ? (
              data.length !== 0 ? (
                <div className="xs:grid-cols-1 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
                  {data.map((product) => {
                    const productParsed = productSchema.safeParse(product);
                    if (productParsed.success)
                      return (
                        <Product
                          key={product.id}
                          product={productParsed.data}
                        ></Product>
                      );
                    console.log(productParsed.error);
                  })}
                </div>
              ) : (
                <p className="absolute self-center justify-self-center font-light text-kym4">
                  Tú búsqueda no obtuvo ningún resultado...😢
                </p>
              )
            ) : (
              <div className="mt-12 flex flex-col items-center justify-center">
                <AiOutlineLoading
                  color="#d28125"
                  size="3rem"
                  className="animate-spin"
                />
                <p className="mt-2 font-semibold text-kym4">
                  Cargando productos...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
