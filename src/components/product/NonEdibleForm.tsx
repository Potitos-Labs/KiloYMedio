import { zodResolver } from "@hookform/resolvers/zod";
import { NECategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { trpc } from "../../utils/trpc";
import {
  IProduct,
  IProductCreate,
  productCreateSchema,
} from "../../utils/validations/product";
import Listbox from "../Listbox";

export default function NonEdibleForm({ product }: { product?: IProduct }) {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [isUniqueName, setUniqueName] = useState(true);

  const { register, handleSubmit, setValue } = useForm<IProductCreate>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: product,
  });
  const { data: categories } =
    trpc.product.getAllNonEdibleCategories.useQuery();

  const { mutateAsync: createProduct } =
    trpc.product.createNewProduct.useMutation();
  const { mutateAsync: updateProduct } = trpc.product.update.useMutation();

  useEffect(() => {
    setCategory(product?.NonEdible?.category ?? "Ninguno");
  }, []);

  useEffect(() => {
    try {
      const neCategory = z.nativeEnum(NECategory).parse(category);
      setValue("NonEdible.category", neCategory);
    } catch (error) {
      console.log("error en useEffect");
    }
  }, [category, setValue]);

  const onSubmit = useCallback(
    async (data: IProductCreate) => {
      try {
        const result = product
          ? await updateProduct({ ...data, id: product.id })
          : await createProduct(data);
        if (result.status === 201) {
          router.push("/product");
        }
      } catch {
        setUniqueName(false);
      }
    },
    [updateProduct, createProduct, router],
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
          <div className="">
            <input
              type="text"
              placeholder="Nombre del producto *"
              className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
              required
              {...register("name", {
                required: true,
                onChange: () => setUniqueName(true),
              })}
            />
            <p className="text-sm text-pink-600">
              {!isUniqueName && "Este producto ya existe"}
            </p>
          </div>
          <input
            type="text"
            placeholder="Descripción *"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            required
            {...register("description", { required: true })}
          />
          <input
            type="number"
            step="any"
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
            step="any"
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
            {...register("imageURL", { required: true })}
          />
          <Listbox
            list={
              categories?.map((c) => {
                return { text: c.categoryInSpanish, value: c.category };
              }) ?? []
            }
            label="Categoría:"
            setValue={setCategory}
            defaultValue={product?.NonEdible?.category}
          />
        </div>
        <div className="flex flex-row relative">
          {product && (
            <button
              className="md:px-26 m-2 mt-3 block rounded border-button_hover border
            py-1 px-20 font-semibold text-button_hover hover:bg-button_hover hover:text-white"
              onClick={() => router.back()}
            >
              Cancelar
            </button>
          )}
          <button
            className="md:px-26 m-2 mt-3 block rounded bg-button py-1 px-20 font-semibold text-white hover:bg-button_hover"
            type="submit"
          >
            {product ? "Editar producto" : "Crear producto"}
          </button>
        </div>
      </div>
    </form>
  );
}
