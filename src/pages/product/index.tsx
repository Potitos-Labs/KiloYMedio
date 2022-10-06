import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Product from "../../components/product/Product";

const ProductDetails: NextPage = () => {
  const { data } = trpc.useQuery(["product.getAllProducts"]);
  return (
    <div>
      {" "}
      {data ? (
        data.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            imgUrl={product.imageURL}
          ></Product>
        ))
      ) : (
        <p className="text-right">Loading..</p>
      )}
      ;
    </div>
  );
};
export default ProductDetails;
