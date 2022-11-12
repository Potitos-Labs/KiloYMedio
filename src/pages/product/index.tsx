import FilterProduct from "components/product/FilterProduct";
import SearchBar from "@components/product/SearchBar";
import { ECategory, NECategory } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";

import Layout from "../../components/Layout";
import Product from "../../components/product/Product";
import { trpc } from "../../utils/trpc";
import { IFilterProduct, productSchema } from "../../utils/validations/product";

const ProductDetails: NextPage = () => {
  const [searchInput, setSearchInput] = useState("");
  //let { data } = trpc.product.getAllProducts.useQuery();

  const [filter, setFilter] = useState<IFilterProduct>({
    name: "",
    eCategories: [],
    neCategories: [],
    minPrice: 0,
    maxPrice: 1000,
    allergens: [],
    orderByName: undefined,
    orderByPrice: undefined,
  });

  let { data } = trpc.product.getFilteredProducts.useQuery(filter);

  console.log(data);
  //BORRAR LUEGO :]
  console.log(searchInput);

  const router = useRouter();
  const category = router.query.category as string;

  if (category && data) {
    const ecategory = z.nativeEnum(ECategory).safeParse(category);
    const necategory = z.nativeEnum(NECategory).safeParse(category);

    if (ecategory.success) {
      data = data.filter((p) => p.Edible?.category === ecategory.data);
    } else if (necategory.success) {
      data = data.filter((p) => p.NonEdible?.category === necategory.data);
    }
  }

  return (
    <Layout>
      <div className="flex flex-row">
        <FilterProduct filter={filter} setFilter={setFilter} />
        <div className="grow">
          {/* Meterlo en un componente -> codigo mas limpio */}
          <div className="mr-12 mt-12 flex h-11 flex-row border-b-2 border-kym3">
            <p className="grow font-bold capitalize sm:text-lg">
              {category ? category : "Todos los productos"}
            </p>
            <div className="b-1 justify-end align-middle">
              <SearchBar updateSearchFunction={setSearchInput} />
            </div>
          </div>
          <div className="xs:grid-cols-1 grid grid-cols-2 gap-4 py-12 pr-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {data ? (
              data.map((product) => {
                const productParsed = productSchema.safeParse(product);
                if (productParsed.success)
                  return <Product product={productParsed.data}></Product>;
                console.log(productParsed.error);
              })
            ) : (
              <p className="font-semibold text-kym4">Cargando...</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ProductDetails;
