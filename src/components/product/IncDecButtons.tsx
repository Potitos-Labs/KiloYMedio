import { ProductUnit } from "@prisma/client";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

function IncDecButtons({
  setAmount,
  amount,
  stock,
  isEdible,
  stockLeft,
  productUnit,
  className,
}: {
  setAmount: Dispatch<SetStateAction<number>>;
  amount: number;
  stock: number;
  isEdible: boolean;
  stockLeft: boolean;
  productUnit: ProductUnit;
  className?: string;
}) {
  const maxStock = isEdible ? stock * 1000 : stock;

  const incdecValues = {
    grams: 100,
    kilograms: 0.5,
    liters: 0.5,
    milliliters: 100,
    unit: 1,
  };

  function incrementClick() {
    setAmount((amount) => amount + incdecValues[productUnit]);
  }

  function decrementClick() {
    setAmount((amount) => amount - incdecValues[productUnit]);
  }

  const unitDisplay = {
    grams: "g",
    kilograms: "kg",
    liters: "l",
    milliliters: "ml",
    unit: "u",
  };

  return (
    <div className={` ${className} flex h-full w-full flex-row font-bold`}>
      <button
        disabled={!stockLeft || amount == incdecValues[productUnit]}
        className={clsx(
          `w-6 flex-auto bg-transparent`,
          (!stockLeft || amount == incdecValues[productUnit]) &&
            "cursor-not-allowed opacity-60",
        )}
        onClick={decrementClick}
      >
        -
      </button>
      <p className="place-content-center self-center whitespace-nowrap text-xs sm:text-sm">
        {amount} {unitDisplay[productUnit]}
      </p>
      <button
        disabled={!stockLeft || maxStock == amount}
        className={`h-full w-6 flex-auto bg-transparent font-bold ${
          (!stockLeft || maxStock == amount) && "cursor-not-allowed opacity-60"
        }`}
        onClick={incrementClick}
      >
        +
      </button>
    </div>
  );
}

export default IncDecButtons;
