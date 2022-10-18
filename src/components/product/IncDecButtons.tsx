import { Dispatch, SetStateAction, useState } from "react";

function IncDecButtons({
  setWeight,
  weight,
  stock,
}: {
  setWeight: Dispatch<SetStateAction<number>>;
  weight: number;
  stock: number;
}) {
  function incrementClick() {
    if (weight != 10000 && weight + 100 <= stock) {
      setWeight(weight + 100);
    }
  }

  function decrementClick() {
    if (weight != 0) {
      setWeight(weight - 100);
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
      <p className="mx-2 rounded-md border-2 px-4">{weight} g</p>
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
