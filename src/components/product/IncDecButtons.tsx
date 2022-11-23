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
}: {
  setAmount: Dispatch<SetStateAction<number>>;
  amount: number;
  stock: number;
  isEdible: boolean;
  stockLeft: boolean;
  productUnit: ProductUnit;
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
    <div className="flex w-auto flex-row py-4">
      <button
        disabled={!stockLeft || amount == incdecValues[productUnit]}
        className={clsx(
          `rounded-xl border border-button bg-transparent px-3 font-semibold text-kym4`,
          !stockLeft || amount == incdecValues[productUnit]
            ? "cursor-not-allowed opacity-60"
            : "hover:border-transparent hover:bg-button_hover hover:text-white",
          `
        }`,
        )}
        onClick={decrementClick}
      >
        -
      </button>
      <p className="mx-2 rounded-md px-2">
        {amount} {unitDisplay[productUnit]}
      </p>
      <button
        disabled={!stockLeft || maxStock == amount}
        className={`rounded-xl border border-button bg-transparent px-3 font-semibold text-kym4  ${
          !stockLeft || maxStock == amount
            ? "cursor-not-allowed opacity-60"
            : "hover:border-transparent hover:bg-button_hover hover:text-white"
        }`}
        onClick={incrementClick}
      >
        +
      </button>
    </div>
  );
}

export default IncDecButtons;
