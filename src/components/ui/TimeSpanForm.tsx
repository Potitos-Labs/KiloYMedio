import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import IncDecButtons from "@components/ui/IncDecButtons";

export default function TimeSpanForm({
  control,
  label,
}: {
  control: Control<any, any>;
  label: string;
}) {
  return (
    <>
      {/* Cooking time */}
      <div className="flex flex-row items-center gap-2">
        <Controller
          name={`${label}.hour`}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IncDecButtons
              setAmount={onChange}
              amount={value}
              max={23}
              unit="hour"
              className="h-[60px] w-[150px] rounded-[30px] border-[1px] border-base-300"
              onBlur={onBlur}
            ></IncDecButtons>
          )}
        ></Controller>
        <p className="pr-5">horas</p>
        <Controller
          name={`${label}.minute`}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IncDecButtons
              setAmount={onChange}
              amount={value}
              max={59}
              unit="min"
              className="h-[60px] w-[150px] rounded-[30px] border-[1px] border-base-300"
              onBlur={onBlur}
            ></IncDecButtons>
          )}
        ></Controller>
        <p>minutos</p>
      </div>
      {/* Cooking time End*/}
    </>
  );
}
