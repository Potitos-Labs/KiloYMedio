import { useState } from "react";

function IncDecButtons() {
  const [weight, setWeight] = useState(100);

  function incrementClick() {
    if (weight != 10000) {
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
