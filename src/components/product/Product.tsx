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
    <div className="relative">
      <Link href={`/product/${product.id}`}>
        <div className="flex h-full flex-col items-center justify-center rounded-md border-[1px] border-base-300 bg-base-100 py-1 pb-[90px] sm:py-4 sm:pb-[118px]">
          <div className="sm:py-3">
            <Image
              src={product.imageURL}
              alt="notfound"
              width="100"
              height="100"
              layout="fixed"
              objectFit="contain"
              className="rounded-md"
            />
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
          <p className="sm: mx-10 text-center font-raleway text-xs uppercase leading-[18px] sm:text-base sm:leading-normal">
            {product.name}
          </p>
        </div>
      </Link>

      {data?.user?.role != "admin" && showButtons && (
        <div className="absolute bottom-3 left-0 right-0 z-10 mx-auto flex max-w-[256px] flex-col place-content-center gap-1 sm:gap-4">
          <IncDecButtons
            setAmount={setAmount}
            amount={amount}
            max={product.stock}
            unit={product.ProductUnit}
            textSize="text-xs"
            className="h-8"
          />
          <Addproductchart
            amount={amount}
            product={product}
            index={index}
            setPrices={setPrices}
            smTextSize={"text-xs"}
            className={"h-10 sm:h-12"}
          />
        </div>
      )}
    </div>
  );
}
export default Product;
