import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};
export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="m-3">
      <h2 className="m-0 mb-8 text-center">{title}</h2>
      <div className="grid flex-initial auto-cols-min grid-cols-[30%_70%] gap-2 gap-y-6">
        {children}
      </div>
    </div>
  );
}
