import { AiOutlineLoading } from "react-icons/ai";

export default function Loading({ message }: { message: string }) {
  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <AiOutlineLoading color="#d28125" size="3rem" className="animate-spin" />
      <p className="mt-2 font-semibold text-primary">{message}</p>
    </div>
  );
}
