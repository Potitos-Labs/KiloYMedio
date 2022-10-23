import { Dispatch, SetStateAction } from "react";

function IncDecButtons({
  setAmount,
  amount,
  stock,
  isEdible,
  stockLeft,
}: {
  setAmount: Dispatch<SetStateAction<number>>;
  amount: number;
  stock: number;
  isEdible: boolean;
  stockLeft: boolean;
}) {
  const maxStock = isEdible ? stock * 1000 : stock;

  function incrementClick() {
    isEdible ? setAmount(amount + 100) : setAmount(amount + 1);
  }

  function decrementClick() {
    isEdible ? setAmount(amount - 100) : setAmount(amount - 1);
  }

  return (
    <div className="flex flex-row py-4">
      <button
        disabled={!stockLeft || amount == 100 || amount == 1}
        className={`rounded-xl border border-button bg-transparent px-3 font-semibold text-kym4 ${
          !stockLeft || amount == 100 || amount == 1
            ? "cursor-not-allowed opacity-60"
            : "hover:border-transparent hover:bg-button_hover hover:text-white"
        }`}
        onClick={decrementClick}
      >
        -
      </button>
      <div className={`${isEdible ? "" : "w-full"}`}>
        <p className="mx-2 rounded-md px-2">
          {amount} {isEdible ? "g" : "u"}
        </p>
      </div>
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
