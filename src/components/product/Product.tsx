import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { Dispatch, useState } from "react";
import { toast } from "react-toastify";

import { trpc } from "../../utils/trpc";
import { IProduct } from "../../utils/validations/product";
import DotMenu from "../DotMenu";
import Addproductchart from "./Addproductchart";
import IncDecButtons from "../ui/IncDecButtons";

function Product({
  product,
  showButtons,
  index,
  setPrices,
}: {
  product: IProduct;
  showButtons: boolean;
  index?: number;
  cartMessage?: "añadir a la cesta" | "añadir";
  setPrices?: Dispatch<React.SetStateAction<number[]>>;
}) {
  const { data } = useSession();
  const notifyDeleted = () => toast.success("Producto eliminado");
  const utils = trpc.useContext();

  const defaultValue = {
    grams: 100,
    kilograms: 0.5,
    liters: 0.5,
    milliliters: 250,
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
    <div className="relative flex flex-col items-center justify-center rounded-md border-[1px] border-base-300 bg-base-100 py-4">
      <div className="py-3">
        <Link href={`/product/${product.id}`}>
          <a>
            <Image
              src={product.imageURL}
              alt="notfound"
              width="100"
              height="100"
              layout="fixed"
              objectFit="contain"
              className="cursor-pointer rounded-md"
            />
          </a>
        </Link>
      </div>
      {data?.user?.role == "admin" && (
        <div className="absolute top-4 right-2">
          <DotMenu
            id={product.id}
            name={product.name}
            type="producto"
            updateFunction={updateProduct}
            deleteFunction={deleteProduct}
          />
        </div>
      )}
      <p className="mx-10 text-center font-raleway text-base uppercase">
        {product.name}
      </p>
      {data?.user?.role != "admin" && showButtons && (
        <div className="flex h-full flex-col place-content-end gap-4 px-4 pt-6">
          <IncDecButtons
            setAmount={setAmount}
            amount={amount}
            max={product.stock}
            unit={product.ProductUnit}
            className="h-8"
          />
          <Addproductchart
            amount={amount}
            product={product}
            index={index}
            setPrices={setPrices}
            className={"h-12"}
          />
        </div>
      )}
    </div>
  );
}
export default Product;
