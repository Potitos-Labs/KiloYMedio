import { UploadImage } from "@components/ui/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { trpc } from "../../utils/trpc";
import {
  IProduct,
  IProductCreate,
  productCreateSchema,
} from "../../utils/validations/product";
import Listbox from "../ui/Listbox";

export default function NonEdibleForm({ product }: { product?: IProduct }) {
  const router = useRouter();
  const [isUniqueName, setUniqueName] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<IProductCreate>({
    resolver: zodResolver(productCreateSchema),
    criteriaMode: "all",
    shouldUseNativeValidation: true,
    defaultValues: product,
  });
  console.log(watch());

  const { data: categories } = trpc.product.getAllCategories.useQuery();
  const { mutateAsync: createProduct } =
    trpc.product.createNewProduct.useMutation();

  const utils = trpc.useContext();
  const { mutateAsync: updateProduct } = trpc.product.update.useMutation({
    onSuccess: () => utils.product.getById.invalidate(),
  });

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
    [updateProduct, createProduct, router, product],
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
            <span className="mb-2">Categoría *</span>
            <Controller
              name="NonEdible.category"
              control={control}
              render={({ field: { onChange } }) => (
                <Listbox
                  list={
                    categories?.neCategories.map((c) => {
                      return { value: c.category, text: c.categoryInSpanish };
                    }) ?? []
                  }
                  setValue={onChange}
                />
              )}
            ></Controller>
          </label>
          <label className="col-span-2 flex w-full flex-col">
            <span className="mb-2">Imagen *</span>
            <Controller
              control={control}
              name="imageURL"
              render={({ field: { onChange, value } }) => (
                <div className="m-2 flex flex-col gap-4 md:flex-row">
                  <UploadImage setImageURL={onChange}></UploadImage>
                  <Image
                    src={value ?? "/img/placeholder.jpg"}
                    width={100}
                    height={100}
                    layout="fixed"
                    objectFit="contain"
                    alt="Imagen del producto"
                  ></Image>
                </div>
              )}
            />
            <p className="text-sm text-pink-600">{errors.imageURL?.message}</p>
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
