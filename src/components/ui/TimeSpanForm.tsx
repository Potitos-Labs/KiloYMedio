import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import IncDecRecipe from "./IncDecRecipe";

export default function TimeSpanForm({
  control,
  name,
  label,
}: {
  control: Control<any, any>;
  name: string;
  label: string;
}) {
  return (
    <>
      {/* Cooking time */}
      <div className="flex flex-row items-center gap-2">
        <div className="text-lg">{name}</div>
        <Controller
          name={`${label}.hour`}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <IncDecRecipe
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                maxValue={23}
              ></IncDecRecipe>
            </>
          )}
        ></Controller>
        <p className="pr-5">horas</p>
        <Controller
          name={`${label}.minute`}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IncDecRecipe
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              maxValue={59}
            ></IncDecRecipe>
          )}
        ></Controller>
        <p>minutos</p>
      </div>
      {/* Cooking time End*/}
    </>
  );
}
