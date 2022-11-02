import {
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";

import { ICreateRecipe } from "../../utils/validations/recipe";

function IncDecRecipe({
  maximum,
  property,
  register,
  getValues,
  setValue,
}: {
  maximum: number;
  property:
    | "portions"
    | "timeSpan.hour"
    | "timeSpan.minute"
    | "ingredients.amount";
  register: UseFormRegisterReturn<string>;
  getValues: UseFormGetValues<ICreateRecipe>;
  setValue: UseFormSetValue<ICreateRecipe>;
}) {
  const getVal = Number(getValues(property));
  const min = 0;

  //   const maximumValues = {
  //     portion: 15,
  //     hour: 23,
  //     minute: 59,
  //     ingredient: 999,
  //   };

  const max = maximum;
  const length = max.toString.length + 1;

  return (
    <div className="flex flex-row border-[1px] border-solid border-black">
      <button
        disabled={(getVal || 0) == min}
        className={`border-r-[1px] border-black bg-transparent px-3 font-semibold ${
          getVal == min ? "cursor-not-allowed opacity-60" : ""
        }`}
        onClick={() => {
          setValue(property, getVal - 1);
        }}
      >
        -
      </button>
      <input
        className="w-16 text-center focus-within:outline-none"
        type="text"
        min="1"
        max="5"
        maxLength={length}
        defaultValue="1"
        {...register}
      />
      <button
        disabled={getVal >= max}
        className={`border-l-[1px] border-black bg-transparent px-3 font-semibold  ${
          getVal >= max ? "cursor-not-allowed opacity-60" : ""
        }`}
        onClick={() => {
          setValue(property, (getVal || 0) + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

export default IncDecRecipe;
