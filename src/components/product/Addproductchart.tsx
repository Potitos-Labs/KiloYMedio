import { trpc } from "../../utils/trpc";
import { IProduct } from "@utils/validations/product";
import { toast } from "react-toastify";

function Addproductchart({
  amount,
  product,
  className,
}: {
  amount: number;
  product: IProduct;
  className?: string;
}) {
  const utils = trpc.useContext();
  const stockLeft = product.stock * 1000 >= 100;
  const mutation = trpc.cart.addProduct.useMutation({
    onSuccess() {
      utils.cart.getAllCartProduct.invalidate();
    },
  });

  function addToCart() {
    if (stockLeft) {
      toast.success("Producto añadido");
      mutation.mutateAsync({ productId: product.id, amount: amount });
    }
  }

  function getTotalPrice() {
    let price = product.Edible
      ? (amount / 1000) * product.Edible.priceByWeight
      : amount * (product.NonEdible?.price ?? 0);
    price = Math.round(price * 100) / 100;
    return price;
  }
  return (
    <button
      onClick={addToCart}
      className={`h-full  flex-initial rounded-full bg-transparent ring-1 ring-base-content ring-offset-0 text-base-100${
        !stockLeft && "cursor-not-allowed opacity-50"
      } ${className}`}
    >
      <div className="flex h-full flex-row">
        <div className="flex h-full flex-col items-center justify-center self-center rounded-full bg-base-content text-center text-sm text-base-100">
          <span className="px-2 text-sm">{getTotalPrice() + " €"}</span>
        </div>
        <div className=" flex-initial self-center whitespace-nowrap px-2 text-center text-sm">
          {stockLeft ? "añadir a la cesta" : "agotado"}
        </div>
      </div>
    </button>
  );
}
export default Addproductchart;
