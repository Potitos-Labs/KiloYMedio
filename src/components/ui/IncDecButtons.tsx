import { ProductUnit } from "@prisma/client";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { Noop } from "react-hook-form";
import { clearNumber } from "../payment/utils";

function IncDecButtons({
  setAmount,
  amount,
  max, //stock
  unit,
  className,
  onBlur,
}: {
  setAmount: Dispatch<SetStateAction<number>>;
  amount: number;
  max: number;
  unit: ProductUnit | "hour" | "min" | "pers" | "other";
  className?: string;
  onBlur?: Noop;
}) {
  const incdecValues = {
    grams: 100,
    kilograms: 0.5,
    liters: 0.5,
    milliliters: 250,
    unit: 1,
    hour: 1,
    min: 1,
    pers: 1,
    other: 1,
  };
  const calcMaxValues = {
    grams: 1000,
    kilograms: 1,
    liters: 1,
    milliliters: 1000,
    unit: 1,
    hour: 1,
    min: 1,
    pers: 1,
    other: 1,
  };

  const stockLeft = amount + incdecValues[unit] <= max * calcMaxValues[unit];

  function incrementClick() {
    setAmount(amount + incdecValues[unit]);
  }

  function decrementClick() {
    setAmount(amount - incdecValues[unit]);
  }

  const unitDisplay = {
    grams: "g",
    kilograms: "kg",
    liters: "L",
    milliliters: "ml",
    unit: "u",
    hour: "h",
    min: "min",
    pers: "pers",
    other: "",
  };

  const recipe =
    unit == "hour" || unit == "min" || unit == "pers" || unit == "other";

  return (
    <div className={` ${className} flex h-full w-full flex-row font-bold`}>
      <button
        disabled={(!recipe && !stockLeft) || amount == incdecValues[unit] - 1}
        type="button"
        className={clsx(
          `w-6 flex-auto bg-transparent`,
          ((!recipe && !stockLeft) || amount == incdecValues[unit] - 1) &&
            "cursor-not-allowed opacity-60",
        )}
        onClick={decrementClick}
      >
        -
      </button>
      {recipe ? (
        <input
          className="input h-full w-[70px] text-center text-sm focus-within:outline-none"
          type="text"
          value={amount}
          onChange={({ target: { value } }) =>
            setAmount(
              Number(clearNumber(value) || 0) > max * calcMaxValues[unit]
                ? max * calcMaxValues[unit]
                : Number(clearNumber(value) || 0),
            )
          }
          onBlur={onBlur}
        />
      ) : (
        <p className="place-content-center self-center whitespace-nowrap text-xs sm:text-sm">
          {amount} {unitDisplay[unit]}
        </p>
      )}
      <button
        disabled={!stockLeft}
        type="button"
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
