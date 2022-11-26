import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

import { trpc } from "../../utils/trpc";
import { IProduct } from "../../utils/validations/product";
import DotMenu from "../DotMenu";
import Addproductchart from "./Addproductchart";
import IncDecButtons from "./IncDecButtons";

function Product({ product }: { product: IProduct }) {
  const { data } = useSession();
  const isEdible = product.Edible != null;
  const notifyDeleted = () => toast.success("Producto eliminado");
  const stockLeft = product.stock * 1000 >= 100;
  const utils = trpc.useContext();

  const defaultValue = {
    grams: 100,
    kilograms: 0.5,
    liters: 0.5,
    milliliters: 100,
    unit: 1,
  };
  const [amount, setAmount] = useState(defaultValue[product.ProductUnit]);

  const { mutateAsync } = trpc.product.delete.useMutation({
    onSuccess() {
      utils.product.getAllProducts.invalidate();
      utils.product.getFilteredProducts.invalidate();
    },
  });

  const updateProduct = (id: string) => {
    router.push(`/product/edit/${id}`);
  };

  const deleteProduct = (id: string) => {
    mutateAsync({ productId: id });
    router.push(`/product`);
    notifyDeleted();
  };

  return (
    <div className="bg-pase-100 flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-black py-4  shadow-lg hover:shadow-kym4">
      <div className="py-3">
        <Link href={`/product/${product.id}`}>
          <a>
            <Image
              src={product.imageURL}
              alt="notfound"
              width="100"
              height="100"
              layout="fixed"
              objectFit="cover"
              className="cursor-pointer rounded-md"
            ></Image>
          </a>
        </Link>
      </div>
      {data?.user?.role == "admin" && (
        <div className="absolute top-0 right-0">
          <DotMenu
            id={product.id}
            name={product.name}
            type="producto"
            updateFunction={updateProduct}
            deleteFunction={deleteProduct}
          />
        </div>
      )}
      <Link href={`/product/${product.id}`}>
        <p className="font-raleway text-base">{product.name}</p>
      </Link>
      {data?.user?.role != "admin" && (
        <div className="">
          <IncDecButtons
            setAmount={setAmount}
            amount={amount}
            stock={product.stock}
            stockLeft={stockLeft}
            isEdible={isEdible}
            productUnit={product.ProductUnit}
          />
          <Addproductchart
            amount={amount}
            product={product}
            className={"w-30"}
          />
        </div>
      )}
    </div>
  );
}
export default Product;
