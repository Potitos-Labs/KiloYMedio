import { Dispatch, SetStateAction, useState } from "react";

function IncDecButtons({
  setAmount,
  amount,
  stock,
  isEdible,
}: {
  setAmount: Dispatch<SetStateAction<number>>;
  amount: number;
  stock: number;
  isEdible: boolean;
}) {
  function incrementClick() {
    if (amount != 10000 && amount + 100 <= stock * 1000 && isEdible) {
      setAmount(amount + 100);
    } else if (amount != 100 && amount + 1 <= stock) {
      setAmount(amount + 1);
    }
  }

  function decrementClick() {
    if (amount != 0 && isEdible) {
      setAmount(amount - 100);
    } else if (amount != 0) {
      setAmount(amount - 1);
    }
  }

  return (
    <div className="flex flex-row py-4">
      <button
        className="rounded border border-button bg-transparent px-2 font-semibold text-kym4 hover:border-transparent hover:bg-button_hover hover:text-white"
        onClick={decrementClick}
      >
        -
      </button>
      <p className="mx-2 rounded-md border-2 px-4">
        {amount} {isEdible ? "g" : "u"}
      </p>
      <button
        className="rounded border border-button bg-transparent px-2 font-semibold text-kym4 hover:border-transparent hover:bg-button_hover hover:text-white"
        onClick={incrementClick}
      >
        +
      </button>
    </div>
  );
}

export default IncDecButtons;
