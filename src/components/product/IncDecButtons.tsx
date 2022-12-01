import { ProductUnit } from "@prisma/client";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

function IncDecButtons({
  setAmount,
  amount,
  max, //stock
  unit,
  className,
}: {
  setAmount: Dispatch<SetStateAction<number>>;
  amount: number;
  max: number;
  unit: ProductUnit | "min" | "pers";
  className?: string;
}) {
  const incdecValues = {
    grams: 100,
    kilograms: 0.5,
    liters: 0.5,
    milliliters: 250,
    unit: 1,
    min: 1,
    pers: 1,
  };
  const maxValues = {
    grams: 1000,
    kilograms: 1,
    liters: 1,
    milliliters: 1000,
    unit: 1,
    min: 1,
    pers: 1,
  };

  const stockLeft = amount + incdecValues[unit] <= max * maxValues[unit];

  function incrementClick() {
    setAmount((amount) => amount + incdecValues[unit]);
  }

  function decrementClick() {
    setAmount((amount) => amount - incdecValues[unit]);
  }

  const unitDisplay = {
    grams: "g",
    kilograms: "kg",
    liters: "L",
    milliliters: "ml",
    unit: "u",
    min: "min",
    pers: "pers",
  };

  return (
    <div className={` ${className} flex h-full w-full flex-row font-bold`}>
      <button
        disabled={amount == incdecValues[unit]}
        className={clsx(
          `w-6 flex-auto bg-transparent`,
          amount == incdecValues[unit] && "cursor-not-allowed opacity-60",
        )}
        onClick={decrementClick}
      >
        -
      </button>
      <p className="place-content-center self-center whitespace-nowrap text-xs sm:text-sm">
        {amount} {unitDisplay[unit]}
      </p>
      <button
        disabled={!stockLeft}
        className={`h-full w-6 flex-auto bg-transparent font-bold ${
          !stockLeft && "cursor-not-allowed opacity-60"
        }`}
        onClick={incrementClick}
      >
        +
      </button>
    </div>
  );
}

export default IncDecButtons;
