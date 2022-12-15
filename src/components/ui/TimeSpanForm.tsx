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
    <div className="flex flex-row gap-2 sm:flex-col sm:gap-3 md:flex-row">
      {/* Cooking time */}
      <div className="flex flex-row items-center gap-1 sm:gap-2">
        <Controller
          name={`${label}.hour`}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IncDecButtons
              setAmount={onChange}
              amount={value}
              max={23}
              unit="hour"
              className=" h-[40px] w-[110px] rounded-[30px] border-[1px] border-base-300 sm:h-[60px] sm:w-[150px]"
              onBlur={onBlur}
            ></IncDecButtons>
          )}
        ></Controller>
        <p className="text-[15px] sm:pr-5 sm:text-base">horas</p>
      </div>
      <div className="flex flex-row items-center gap-1 sm:gap-2">
        <Controller
          name={`${label}.minute`}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IncDecButtons
              setAmount={onChange}
              amount={value}
              max={59}
              unit="min"
              className="h-[40px] w-[110] rounded-[30px] border-[1px] border-base-300 sm:h-[60px] sm:w-[150px]"
              onBlur={onBlur}
            ></IncDecButtons>
          )}
        ></Controller>
        <p className="text-[15px] sm:text-base">minutos</p>
      </div>
      {/* Cooking time End*/}
    </div>
  );
}
