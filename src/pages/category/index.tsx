import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Layout from "../../components/Layout";
import Category from "../../components/category/Category";

const CategoryDisplay: NextPage = () => {
  const { data } = trpc.useQuery(["product.getAllEdibleCategories"]);
  console.log(data);
  return (
    <Layout>
      <div className="bg-kym3 p-4 font-bold text-white">Comestibles</div>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data ? (
          data.map((category) => (
            <Category
              key={category.id}
              name={category.categoryInSpanish}
              imgURL={category.imageURL}
              id={category.id}
            ></Category>
          ))
        ) : (
          <p className="text-right">Cargando...</p>
        )}
      </div>

      <div className="bg-kym3 p-4 font-bold text-white">No Comestibles</div>
      <div className="grid grid-cols-2 gap-4 p-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data ? (
          data.map((category) => (
            <Category
              key={category.id}
              name={category.categoryInSpanish}
              imgURL={category.imageURL}
              id={category.id}
            ></Category>
          ))
        ) : (
          <p className="text-right">Cargando...</p>
        )}
      </div>
    </Layout>
  );
};

export default CategoryDisplay;
