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
import { BsFilterSquare } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Loading from "@components/ui/Loading";

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
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div
            className={`${
              openFilter ? "hidden" : "hidden sm:block"
            } ml-12 mt-12 flex h-11 flex-row border-b-2 border-kym3`}
          >
            <p className="font-bold">Filtros de búsqueda</p>
          </div>
          <div className={`${openFilter && "absolute mt-2"} z-10 sm:max-w-xs`}>
            <IoIosCloseCircleOutline
              size={"2rem"}
              onClick={() => setOpenFilter(false)}
              className={`${
                openFilter ? "flex" : "hidden"
              } absolute right-2 top-2 cursor-pointer`}
            />
            <FilterProduct
              className={`${
                openFilter
                  ? "rounded-r-md bg-opacity-95 pt-5"
                  : "my-12 ml-12 hidden rounded-md sm:block"
              } bg-white`}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
        </div>
        <div
          className={`${openFilter && "mr-0 blur-sm"} grow`}
          onClick={() => openFilter && setOpenFilter(false)}
        >
          <div className="mx-6 mt-12 grid h-11 flex-row sm:mx-12 sm:grid-cols-2 sm:border-b-2 sm:border-kym3">
            <Tittle filter={filter} inSpanish={inSpanish} />
            <div className="mt-2 grid grid-cols-[80%_20%] border-b-2 border-kym3 sm:relative sm:mt-0 sm:border-0">
              <div className="b-1 justify-end align-middle">
                <SearchBar filter={filter} setFilter={setFilter} />
              </div>
              <div
                className="flex justify-center"
                onClick={() => setOpenFilter(true)}
              >
                <BsFilterSquare className="ml-3 mb-3 h-6 w-6 justify-self-center sm:hidden" />
              </div>
            </div>
          </div>
          <div className="py-12 px-6">
            {data ? (
              data.length !== 0 ? (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
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
              <Loading message="Cargando productos..." />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
