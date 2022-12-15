import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};
export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="">
      <h2 className="font-raleway text-lg lg:text-2xl">{title}</h2>
      <div className="">{children}</div>
    </div>
  );
}
