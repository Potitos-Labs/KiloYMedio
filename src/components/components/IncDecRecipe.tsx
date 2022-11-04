import { Noop, RefCallBack } from "react-hook-form";

import { clearNumber } from "../../components/payment/utils";

function IncDecRecipe({
  onChange,
  onBlur,
  value,
  ref,
  maxValue,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: number;
  ref: RefCallBack;
  maxValue: number;
}) {
  return (
    <>
      <button
        disabled={(value || 0) == 0}
        className={`border-r-[1px] border-black bg-transparent px-3 font-semibold ${
          value == 0 ? "cursor-not-allowed opacity-60" : ""
        }`}
        onClick={() => {
          onChange(Number(value) - 1);
        }}
      >
        -
      </button>
      <input
        className="w-16 text-center focus-within:outline-none"
        type="text"
        maxLength={2}
        value={value}
        onChange={({ target: { value } }) =>
          onChange(
            Number(clearNumber(value) || 0) > maxValue
              ? maxValue
              : Number(clearNumber(value) || 0),
          )
        }
        onBlur={onBlur}
        ref={ref}
      />
      <button
        disabled={(value || 0) == maxValue}
        className={`border-l-[1px] border-black bg-transparent px-3 font-semibold  ${
          value >= maxValue ? "cursor-not-allowed opacity-60" : ""
        }`}
        onClick={() => {
          console.log({ value });
          onChange(Number(value) + 1);
        }}
      >
        +
      </button>
    </>
  );
}

export default IncDecRecipe;
