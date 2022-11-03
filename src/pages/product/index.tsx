import { ECategory, NECategory } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";

import Layout from "../../components/Layout";
import Product from "../../components/product/Product";
import { trpc } from "../../utils/trpc";
import { productSchema } from "../../utils/validations/product";

const ProductDetails: NextPage = () => {
  let { data } = trpc.product.getAllProducts.useQuery();
  console.log(data);

  const router = useRouter();
  const category = router.query.category as string;

  console.log({ category }, { data });

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
      <div className="grid xs:grid-cols-1 grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
    </Layout>
  );
};
export default ProductDetails;
