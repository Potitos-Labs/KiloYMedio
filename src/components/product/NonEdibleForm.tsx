import { UploadImage } from "@components/ui/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductUnit } from "@prisma/client";
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
    defaultValues: product ?? { ProductUnit: "unit" },
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

  const unitPrice = {
    grams: "Kg",
    kilograms: "Kg",
    liters: "L",
    milliliters: "L",
    unit: "U",
  };

  return (
    <form
      className="flex w-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="m-3 mx-10 flex w-full flex-col items-center rounded-lg border-2 border-accent p-5 shadow-xl">
        <h2 className="mb-6 text-center font-raleway text-xl font-bold md:text-2xl">
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
              placeholder={`Precio/${unitPrice[watch("ProductUnit")]}`}
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
            <span className="mb-2">Unidad *</span>
            <Controller
              name="ProductUnit"
              control={control}
              render={({ field: { onChange } }) => (
                <Listbox
                  //TODO: spanish version
                  defaultValue={ProductUnit.unit}
                  list={Object.keys(ProductUnit).map((p) => ({
                    value: p,
                    text: p,
                  }))}
                  setValue={onChange}
                />
              )}
            ></Controller>
          </label>
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Stock *</span>
            <input
              type="number"
              step="any"
              placeholder={`Stock(${unitPrice[watch("ProductUnit")]})`}
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
              className="btn mr-2 flex h-[60px] w-[220px] rounded-[30px] bg-transparent font-raleway text-sm hover:bg-transparent md:mt-6"
              type="button"
              onClick={() => router.back()}
            >
              Cancelar
            </button>
          )}
          <button
            className="btn mt-6 ml-2 flex h-[60px] w-[220px] rounded-[30px] font-raleway text-sm text-base-100"
            type="submit"
          >
            {product ? "Editar producto" : "Crear producto"}
          </button>
        </div>
      </div>
    </form>
  );
}
