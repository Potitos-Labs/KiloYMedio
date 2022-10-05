import { NextPage } from "next";
import { trpc } from "../../utils/trpc";

const ProductDetails: NextPage = () => {
  const { data } = trpc.useQuery(["product.getAllProducts"]);
  return (
    <div>
      {" "}
      {data ? (
        data.map((user) => (
          <DisplayProducts key={user.id} id={user.id}></DisplayProducts>
        ))
      ) : (
        <p className="text-right">Loading..</p>
      )}
      ;
    </div>
  );
};

const DisplayProducts = ({ id }: { id: string }) => {
  return (
    <div>
      <h1>Mi productito :D</h1>
      <p>{id}</p>
    </div>
  );
};

export default ProductDetails;
