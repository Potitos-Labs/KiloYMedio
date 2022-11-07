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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<IProductCreate>({
    resolver: zodResolver(productCreateSchema),
    criteriaMode: "all",
    shouldUseNativeValidation: true,
    defaultValues: product,
  });
  console.log(watch());
  const { data: categories } =
    trpc.product.getAllNonEdibleCategories.useQuery();
  const productCategoryInSpanish = categories?.find(
    (c) => c.category == product?.NonEdible?.category,
  )?.categoryInSpanish;
  console.log(productCategoryInSpanish);
  const utils = trpc.useContext();
  const { mutateAsync: createProduct } =
    trpc.product.createNewProduct.useMutation();
  const { mutateAsync: updateProduct } = trpc.product.update.useMutation({
    onSuccess: () => utils.product.getById.invalidate(),
  });

  useEffect(() => {
    setCategory(product?.NonEdible?.category ?? "");
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
          router.back();
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
          {product ? "Editar" : "Nuevo"} producto no comestible
        </h2>
        <div className="xs:grid-cols-1 m-6 grid place-content-between gap-4 md:grid-cols-2 lg:grid-cols-3">
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Nombre *</span>
            <input
              type="text"
              placeholder="Nombre del producto"
              className={`rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600 ${
                !isUniqueName && "border-pink-600"
              }`}
              {...register("name", {
                onChange: () => setUniqueName(true),
              })}
            />
            <p className="text-sm text-pink-600">
              {(!isUniqueName && "Este producto ya existe") ||
                errors.name?.message}
            </p>
          </label>
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Descripción *</span>
            <input
              type="text"
              placeholder="Descripción"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              {...register("description")}
            />
            <p className="text-sm text-pink-600">
              {errors.description?.message}
            </p>
          </label>
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Precio *</span>
            <input
              type="number"
              step="any"
              placeholder="Precio"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              min={0}
              {...register("NonEdible.price", {
                valueAsNumber: true,
              })}
            />
            <p className="text-sm text-pink-600">
              {errors.NonEdible?.price?.message}
            </p>
          </label>
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Stock *</span>
            <input
              type="number"
              step="any"
              placeholder="Stock(gr)"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              min={0}
              {...register("stock", {
                valueAsNumber: true,
              })}
            />
            <p className="text-sm text-pink-600">{errors.stock?.message}</p>
          </label>
          <label className="flex w-full flex-col">
            <span className="mb-2">URL *</span>
            <input
              type="text"
              placeholder="Imagen URL"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              {...register("imageURL")}
            />
            <p className="text-sm text-pink-600">{errors.imageURL?.message}</p>
          </label>
          <label className="flex w-full flex-col">
            <span className="mb-2">Categoría *</span>
            <Listbox
              list={
                categories?.map((c) => {
                  return { text: c.categoryInSpanish, value: c.category };
                }) ?? []
              }
              setValue={setCategory}
              defaultValue={productCategoryInSpanish}
            />
          </label>
        </div>
        <div className="flex flex-row">
          {product && (
            <button
              className="md:px-26 m-2 mt-3 block rounded border border-button_hover
            py-1 px-20 font-semibold text-button_hover hover:bg-button_hover hover:text-white"
              type="button"
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
