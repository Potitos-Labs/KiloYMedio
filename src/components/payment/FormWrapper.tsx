import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};
export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="mt-8 flex w-full flex-wrap gap-5">
      <h2 className="mb-5 w-full bg-background py-2 pl-3 text-xl">{title}</h2>
      <div className="relative flex flex w-full gap-4">{children}</div>
    </div>
  );
}
