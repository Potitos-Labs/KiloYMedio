import FilterProduct from "components/product/FilterProduct";
import SearchBar from "@components/product/SearchBar";
import { ECategory, NECategory } from "@prisma/client";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
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
import LoadingBalls from "@components/ui/LoadingBalls";
export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  const { eCategories, neCategories, inSpanish } =
    await ssg.product.getAllCategories.fetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
      categories: { eCategories, neCategories, inSpanish },
    },
    revalidate: 1,
  };
}
export default function CreateProdcut(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const {
    categories: { inSpanish },
  } = props;

  const router = useRouter();
  let category = useMemo(
    () => (router.query.category as string)?.split(","),
    [router.query],
  );

  const [filter, setFilter] = useState<IFilterProduct>({
    name: "",
    eCategories: [],
    neCategories: [],
    minPrice: undefined,
    maxPrice: undefined,
    allergens: [],
    orderByName: "asc",
    orderByPrice: undefined,
  });

  useEffect(() => {
    if (category == undefined || category[0] == "") {
      category =
        supracategories
          ?.find((e) => e.supraCategoryName == router.query.supracategory)
          ?.SupraCategoryRelation.map((cat) => cat.category) ?? [];
    }

    const ecategoryParse = z.array(z.nativeEnum(ECategory)).safeParse(category);
    const necategoryParse = z
      .array(z.nativeEnum(NECategory))
      .safeParse(category);

    if (category && category[0] == "all") {
      setFilter((prev) => ({
        ...prev,
        eCategories: [],
        neCategories: [],
      }));
    }

    if (ecategoryParse.success && ecategoryParse.data.length > 0) {
      setFilter((prev) => ({
        ...prev,
        eCategories: ecategoryParse.data,
        neCategories: [],
      }));
    }

    if (necategoryParse.success && necategoryParse.data.length > 0) {
      setFilter((prev) => ({
        ...prev,
        neCategories: necategoryParse.data,
        eCategories: [],
      }));
    }
  }, [category]);

  const { data: supracategories } =
    trpc.product.getAllSupraCategories.useQuery();
  const { data } = trpc.product.getFilteredProducts.useQuery(filter);

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className="flex min-h-90% flex-col">
        <div className="mx-3 mt-2 flex flex-col place-content-between space-y-3 sm:relative sm:mx-6 sm:mt-6 md:flex-row">
          <Tittle inSpanish={inSpanish} />
          <div className="flex flex-row items-end">
            <button
              onClick={() => setOpenFilter(!openFilter)}
              className="h-10 whitespace-nowrap rounded-3xl bg-accent px-4 font-satoshiBold text-[12px] text-base-100 sm:px-5 sm:text-xs"
            >
              FILTRAR POR:
            </button>
            <SearchBar filter={filter} setFilter={setFilter} />
          </div>
        </div>
        <FilterProduct
          filter={filter}
          setFilter={setFilter}
          setOpen={setOpenFilter}
          className={`${openFilter ? "block" : "hidden"}`}
        />
        <div className="h-full px-3 pb-12 pt-8 sm:px-6">
          {data ? (
            data.length !== 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {data.map((product) => {
                  const productParsed = productSchema.safeParse(product);
                  if (productParsed.success)
                    return (
                      <Product
                        key={product.id}
                        product={productParsed.data}
                        showButtons={true}
                      />
                    );
                })}
              </div>
            ) : (
              <p className="font-ligh absolute self-center justify-self-center">
                Tú búsqueda no obtuvo ningún resultado...😢
              </p>
            )
          ) : (
            <LoadingBalls black={true} />
          )}
        </div>
      </div>
    </Layout>
  );
}
