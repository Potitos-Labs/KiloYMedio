import clsx from "clsx";
import Link from "next/link";
import React from "react";

import { trpc } from "../../utils/trpc";
import DropDownCart from "../cart/DropDownCart";

export default function CartHeader({ textDark }: { textDark: boolean }) {
  const { data: allCartProduct } = trpc.cart.getAllCartProduct.useQuery();
  const numberCartProducts = allCartProduct?.productList.length ?? 0;

  return (
    <div className="group flex cursor-pointer items-center">
      <Link href={"/cart"}>
        <div className="flex gap-1">
          <div>cesta</div>
          <div
            className={clsx(
              "h-6 w-6 rounded-full text-center text-xs ",
              textDark ? "lg:text-base-100" : "lg:text-neutral",
              textDark ? "lg:bg-neutral" : "lg:bg-base-100",
            )}
          >
            {numberCartProducts}
          </div>
        </div>
      </Link>
      <div className="invisible sm:visible">
        <DropDownCart />
      </div>
    </div>
  );
}
