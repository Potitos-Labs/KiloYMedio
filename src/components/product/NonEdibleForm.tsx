import { useRouter } from "next/router";
import { useCallback, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import { IProduct, productSchema } from "../../utils/validations/product";
import Listbox from "../Listbox";
import { NECategory } from "@prisma/client";
import { z } from "zod";

export default function NonEdibleForm() {
  const router = useRouter();
  const [category, setCategory] = useState("");

  const { register, handleSubmit, setValue } = useForm<IProduct>({
    resolver: zodResolver(productSchema),
  });

  const { data: categories } =
    trpc.product.getAllNonEdibleCategories.useQuery();

  const { mutateAsync } = trpc.product.createNewProduct.useMutation();

  useEffect(() => {
    try {
      const neCategory = z.nativeEnum(NECategory).parse(category);
      setValue("NonEdible.category", neCategory);
    } catch (error) {
      console.log("error en useEffect");
    }
  }, [category, setValue]);

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
      className="flex w-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mx-10 mt-3 flex w-full flex-col items-center rounded-lg border-2 border-kym2/[0.6] p-5 shadow-xl">
        <h2 className="mb-6 cursor-default text-center text-2xl font-bold text-black md:text-3xl">
          Nuevo producto no comestible
        </h2>
        <div className="xs:grid-cols-1 m-6 grid place-content-between gap-4 md:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            placeholder="Nombre del producto *"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            required
            {...register("name", { required: true })}
          />
          <input
            type="text"
            placeholder="Descripción *"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            required
            {...register("description", { required: true })}
          />
          <input
            type="number"
            placeholder="Precio *"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            min={0}
            required
            {...register("NonEdible.price", {
              valueAsNumber: true,
              required: true,
            })}
          />
          <input
            type="number"
            placeholder="Stock *"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            min={0}
            required
            {...register("stock", {
              valueAsNumber: true,
              required: true,
            })}
          />
          <input
            type="url"
            placeholder="Imagen URL *"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            required
            {...register("image", { required: true })}
          />
          <Listbox
            list={
              categories?.map((c) => {
                return { text: c.categoryInSpanish, value: c.category };
              }) ?? []
            }
            label="Categoría:"
            setValue={setCategory}
          />
        </div>
        <button
          className="md:px-26 m-2 mt-3 block rounded bg-button py-1 px-20 font-semibold text-white hover:bg-button_hover"
          type="submit"
        >
          Crear producto
        </button>
      </div>
    </form>
  );
}
