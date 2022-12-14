import { UploadImage } from "@components/ui/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Allergen, ProductUnit } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { trpc } from "../../utils/trpc";
import {
  IProduct,
  IProductCreate,
  productCreateSchema,
} from "../../utils/validations/product";
import Listbox from "../ui/Listbox";

export default function EdibleForm({ product }: { product?: IProduct }) {
  const router = useRouter();
  const [isUniqueName, setUniqueName] = useState(true);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm<IProductCreate>({
    resolver: zodResolver(productCreateSchema),
    criteriaMode: "all",
    shouldUseNativeValidation: true,
    defaultValues: product ?? { ProductUnit: "grams" },
  });
  console.log(watch());

  const { data: allergens } = trpc.product.getAllAllergensInSpanish.useQuery();
  const { data: categories } = trpc.product.getAllCategories.useQuery();

  const { mutateAsync: createProduct } =
    trpc.product.createNewProduct.useMutation();

  const utils = trpc.useContext();
  const { mutateAsync: updateProduct } = trpc.product.update.useMutation({
    onSuccess: () => {
      utils.product.getById.invalidate();
      utils.product.getAllProducts.invalidate();
    },
  });

  const [allergensList, setAllergensList] = useState<{ allergen: Allergen }[]>(
    product?.Edible?.allergens ?? [],
  );

  const allergensHandler = (value: string) => {
    const allergen = z.nativeEnum(Allergen).parse(value);
    const index = allergensList.findIndex((obj) => obj.allergen == allergen);
    if (index != -1) allergensList.splice(index, 1);
    else allergensList.push({ allergen });
    setAllergensList(allergensList);
  };

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
            <span className="mb-2">Descripci??n *</span>
            <input
              type="text"
              placeholder="Descripci??n"
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
              {...register("Edible.priceByWeight", {
                valueAsNumber: true,
              })}
            />
            <p className="text-sm text-pink-600">
              {errors.Edible?.priceByWeight?.message}
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
                  defaultValue={ProductUnit.grams}
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
            <span className="mb-2">Conservaci??n</span>
            <input
              type="text"
              placeholder="Conservaci??n"
              className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
              {...register("Edible.conservation")}
            />
            <p className="text-sm text-pink-600">
              {errors.Edible?.conservation?.message}
            </p>
          </label>
          <label className="relative flex w-full flex-col">
            <span className="mb-2">Categor??a *</span>
            <Controller
              name="Edible.category"
              control={control}
              render={({ field: { onChange } }) => (
                <Listbox
                  list={
                    categories?.eCategories.map((c) => {
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
                    layout="intrinsic"
                    objectFit="contain"
                    alt="Imagen del producto"
                  ></Image>
                </div>
              )}
            />
            <p className="text-sm text-pink-600">{errors.imageURL?.message}</p>
          </label>
        </div>
        <div>
          <div className="divider sm:mx-[10%]">
            Informaci??n nutricional por cada 100gr
          </div>
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
              <span className="mb-2">Energ??a *</span>
              <input
                type="number"
                step="any"
                placeholder="Energ??a(kcal)"
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
                step="any"
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
                step="any"
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
              <span className="mb-2">Prote??na *</span>
              <input
                type="number"
                step="any"
                placeholder="Prote??na"
                className="rounded-md border-2 border-gray-300 py-2 px-4 placeholder-gray-300 invalid:border-pink-600"
                {...register("Edible.nutritionFacts.protein", {
                  valueAsNumber: true,
                })}
              />
              <p className="text-sm text-pink-600">
                {errors.Edible?.nutritionFacts?.protein?.message}
              </p>
            </label>
          </div>
        </div>
        <div className="w-full">
          <div className="divider sm:mx-[10%]">Al??rgenos</div>
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
            onClick={() => setValue("Edible.allergens", allergensList)}
          >
            {product ? "Editar producto" : "Crear producto"}
          </button>
        </div>
      </div>
    </form>
  );
}
