import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import { IProduct, productSchema } from "../../utils/validations/product";
import Listbox from "../Listbox";

export default function NonEdibleForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: zodResolver(productSchema),
  });

  console.log({ errors });
  const { mutateAsync } = trpc.useMutation(["product.createNewProduct"]);

  const onSubmit = useCallback(
    async (data: IProduct) => {
      console.log("entra en onSubmit");
      const result = await mutateAsync(data);
      if (result.status === 201) {
        router.push("/product");
      }
    },
    [mutateAsync, router],
  );

  return (
    <form
      className="flex w-full max-w-sm items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
        <div className="p-12 shadow-xl">
          <h2 className="mb-6 ml-6 cursor-default text-center text-xl font-bold text-blue-500">
            Añadir nuevo producto
          </h2>
          <div className=" m-6">
            <input
              type="text"
              placeholder="Nombre del producto"
              className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
              {...register("name")}
            />
            <input
              type="text"
              placeholder="Descripción"
              className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
              {...register("description")}
            />
            {/*Falta imagen */}
            <input
              type="number"
              placeholder="Precio"
              className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
              {...register("NonEdible.price", {
                valueAsNumber: true,
              })}
            />
            <input
              type="number"
              placeholder="Stock"
              className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
              {...register("stock", {
                valueAsNumber: true,
              })}
            />
            <Listbox
              list={trpc
                .useQuery(["product.getAllNonEdibleCategories"])
                .data?.map((category) => category.categoryInSpanish)}
              {...register("NonEdible.category", { value: "accessories" })}
            />

            <input
              type="url"
              placeholder="Imagen URL"
              className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
              {...register("image")}
            />
            <button
              className="m-2 mt-3 block rounded bg-button py-1 pl-20 pr-20 font-semibold text-white hover:bg-button_hover"
              type="submit"
            >
              Crear producto
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
