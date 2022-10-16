import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import { IProduct, productSchema } from "../../utils/validations/product";
import Listbox from "../Listbox";

export default function NonEdibleForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: zodResolver(productSchema),
  });

  console.log(watch());
  console.log({ errors }, control);

  const { data: categories } = trpc.useQuery([
    "product.getAllNonEdibleCategories",
  ]);

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
              {...register("name", { required: true })}
            />
            <input
              type="text"
              placeholder="Descripción"
              className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
              required
              {...register("description", { required: true })}
            />
            <input
              type="number"
              placeholder="Precio"
              className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
              required
              {...register("NonEdible.price", {
                valueAsNumber: true,
                required: true,
              })}
            />
            <input
              type="number"
              placeholder="Stock"
              className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
              required
              {...register("stock", {
                valueAsNumber: true,
                required: true,
              })}
            />
            {/*<Controller
              name="NonEdible.category"
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Listbox
                    list={categories}
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />*/}
            <Listbox list={categories ?? []} setValue={setValue} />
            <input
              type="url"
              placeholder="Imagen URL"
              className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
              required
              {...register("image", { required: true })}
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
