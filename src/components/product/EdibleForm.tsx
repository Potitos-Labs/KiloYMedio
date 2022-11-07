import { zodResolver } from "@hookform/resolvers/zod";
import { Allergen, ECategory } from "@prisma/client";
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

export default function EdibleForm({ product }: { product?: IProduct }) {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [isUniqueName, setUniqueName] = useState(true);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IProductCreate>({
    resolver: zodResolver(productCreateSchema),
    criteriaMode: "all",
    shouldUseNativeValidation: true,
    defaultValues: product,
  });
  const utils = trpc.useContext();
  const { data: allergens } = trpc.product.getAllAllergensInSpanish.useQuery();
  const { data: categories } = trpc.product.getAllEdibleCategories.useQuery();
  const { mutateAsync: createProduct } =
    trpc.product.createNewProduct.useMutation();
  const { mutateAsync: updateProduct } = trpc.product.update.useMutation({
    onSuccess: () => {
      utils.product.getById.invalidate();
      utils.product.getAllProducts.invalidate();
    },
  });

  const allergensList: { allergen: Allergen }[] =
    product?.Edible?.allergens ?? [];

  const allergensHandler = (value: string) => {
    const allergen = z.nativeEnum(Allergen).parse(value);
    const index = allergensList.findIndex((obj) => obj.allergen == allergen);
    if (index != -1) allergensList.splice(index, 1);
    else allergensList.push({ allergen });
  };

  useEffect(() => {
    try {
      const eCategory = z.nativeEnum(ECategory).parse(category);
      setValue("Edible.category", eCategory);
    } catch (error) {
      console.log("error en useEffect");
    }
  }, [category, setValue]);

  useEffect(() => {
    setCategory(product?.Edible?.category ?? "");
  }, []);

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
          {product ? "Editar" : "Nuevo"} producto comestible
        </h2>
        <div className="xs:grid-cols-1 m-6 grid place-content-between gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              placeholder="Precio/kg"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              min={0}
              {...register("Edible.priceByWeight", {
                valueAsNumber: true,
              })}
            />
            <p className="text-sm text-pink-600">
              {errors.Edible?.priceByWeight?.message}
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
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Origen</span>
            <input
              type="text"
              placeholder="Origen del producto"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              {...register("Edible.origin")}
            />
            <p className="text-sm text-pink-600">
              {errors.Edible?.origin?.message}
            </p>
          </label>
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Conservación</span>
            <input
              type="text"
              placeholder="Conservación"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              {...register("Edible.conservation")}
            />
            <p className="text-sm text-pink-600">
              {errors.Edible?.conservation?.message}
            </p>
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
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Categoría *</span>
            <Listbox
              list={
                categories?.map((c) => {
                  return { value: c.category, text: c.categoryInSpanish };
                }) ?? []
              }
              setValue={setCategory}
              defaultValue={
                categories?.find((c) => c.category == product?.Edible?.category)
                  ?.categoryInSpanish
              }
            />
          </label>
        </div>
        <div>
          <h3 className="mt-8 mb-8 text-center font-semibold sm:mx-[10%] sm:bg-black sm:leading-[0.09]">
            <span className="bg-white px-2">
              Información nutricional por cada 100gr
            </span>
          </h3>
          <div className="xs:grid-cols-1 m-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <label className="flex w-full flex-col sm:col-span-2 md:col-span-4">
              <span className="mb-2">Ingredientes *</span>
              <textarea
                placeholder="Ingredientes"
                className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
                {...register("Edible.nutritionFacts.ingredients")}
              />
              <p className="text-sm text-pink-600">
                {errors.Edible?.nutritionFacts?.ingredients?.message}
              </p>
            </label>
            <label className="flex w-full flex-col">
              <span className="mb-2">Energía *</span>
              <input
                type="number"
                placeholder="Energía(kcal)"
                className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
                {...register("Edible.nutritionFacts.energy", {
                  valueAsNumber: true,
                })}
              />
              <p className="text-sm text-pink-600">
                {errors.Edible?.nutritionFacts?.energy?.message}
              </p>
            </label>
            <label className="flex w-full flex-col">
              <span className="mb-2">Grasas *</span>
              <input
                type="number"
                placeholder="Grasas"
                className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
                {...register("Edible.nutritionFacts.fat", {
                  valueAsNumber: true,
                })}
              />
              <p className="text-sm text-pink-600">
                {errors.Edible?.nutritionFacts?.fat?.message}
              </p>
            </label>
            <label className="flex w-full flex-col">
              <span className="mb-2">Hidratos *</span>
              <input
                type="number"
                placeholder="Hidratos de carbono"
                className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
                {...register("Edible.nutritionFacts.carbohydrates", {
                  valueAsNumber: true,
                })}
              />
              <p className="text-sm text-pink-600">
                {errors.Edible?.nutritionFacts?.carbohydrates?.message}
              </p>
            </label>
            <label className="flex w-full flex-col">
              <span className="mb-2">Proteina *</span>
              <input
                type="number"
                placeholder="Proteina"
                className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
                {...register("Edible.nutritionFacts.protein", {
                  valueAsNumber: true,
                })}
              />
              <p className="text-sm text-pink-600">
                {errors.Edible?.nutritionFacts?.energy?.message}
              </p>
            </label>
          </div>
        </div>
        <div className="w-full">
          <h3 className="mt-8 mb-8 text-center font-semibold sm:mx-[10%] sm:bg-black sm:leading-[0.09]">
            <span className="bg-white px-2">Alérgenos</span>
          </h3>
          <div className="m-6 grid w-full sm:grid-cols-2 md:ml-[10%] md:grid-cols-4">
            {allergens ? (
              allergens.map((allergen) => (
                <label key={allergen.allergen}>
                  <input
                    type="checkbox"
                    value={allergen.allergen}
                    defaultChecked={
                      product?.Edible?.allergens.find(
                        (a) => a.allergen == allergen.allergen,
                      )
                        ? true
                        : false
                    }
                    className="checkbox checkbox-xs"
                    onChange={(e) => allergensHandler(e.target.value)}
                  />
                  <span className="label-text pl-2">
                    {allergen.allergenInSpanish}
                  </span>
                </label>
              ))
            ) : (
              <p>Cargando...</p>
            )}
          </div>
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
            onClick={() => setValue("Edible.allergens", allergensList)}
          >
            {product ? "Editar producto" : "Crear producto"}
          </button>
        </div>
      </div>
    </form>
  );
}
