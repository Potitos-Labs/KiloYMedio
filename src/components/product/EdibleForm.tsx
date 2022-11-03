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

  const { register, setValue, handleSubmit } = useForm<IProductCreate>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: product,
  });
  const { data: allergens } = trpc.product.getAllAllergensInSpanish.useQuery();
  const { data: categories } = trpc.product.getAllEdibleCategories.useQuery();
  const { mutateAsync } = trpc.product.createNewProduct.useMutation();

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
          Nuevo producto comestible
        </h2>
        <div className="xs:grid-cols-1 m-6 grid place-content-between gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
            placeholder="Precio/kg *"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            min={0}
            required
            {...register("Edible.priceByWeight", {
              valueAsNumber: true,
              required: true,
            })}
          />
          <input
            type="number"
            placeholder="Stock(gr) *"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            min={0}
            required
            {...register("stock", {
              valueAsNumber: true,
              required: true,
            })}
          />

          <input
            type="text"
            placeholder="Origen del producto"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            {...register("Edible.origin")}
          />
          <input
            type="text"
            placeholder="Conservación"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            {...register("Edible.conservation")}
          />
          <input
            type="url"
            placeholder="Imagen URL *"
            className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
            {...register("imageURL", { required: true })}
          />
          <Listbox
            list={
              categories?.map((c) => {
                return { value: c.category, text: c.categoryInSpanish };
              }) ?? []
            }
            label="Categoría: "
            setValue={setCategory}
            defaultValue={product?.Edible?.category}
          />
        </div>
        <div>
          <h3 className="mt-8 mb-8 text-center font-semibold sm:mx-[10%] sm:bg-black sm:leading-[0.09]">
            <span className="bg-white px-2">
              Información nutricional por cada 100gr
            </span>
          </h3>
          <div className="xs:grid-cols-1 m-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <textarea
              placeholder="Ingredientes *"
              className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8 sm:col-span-2 md:col-span-4"
              {...register("Edible.nutritionFacts.ingredients", {
                required: true,
              })}
            />
            <input
              type="number"
              placeholder="Energía(kcal) *"
              className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
              {...register("Edible.nutritionFacts.energy", {
                valueAsNumber: true,
                required: true,
              })}
            />
            <input
              type="number"
              placeholder="Grasas *"
              className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
              {...register("Edible.nutritionFacts.fat", {
                valueAsNumber: true,
                required: true,
              })}
            />
            <input
              type="number"
              placeholder="Hidratos de carbono *"
              className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
              {...register("Edible.nutritionFacts.carbohydrates", {
                valueAsNumber: true,
                required: true,
              })}
            />
            <input
              type="number"
              placeholder="Proteina *"
              className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
              {...register("Edible.nutritionFacts.protein", {
                valueAsNumber: true,
                required: true,
              })}
            />
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
                    className="mb-4 border-l-4 border-l-kym2 bg-background/[0.5] py-1 px-8"
                    onChange={(e) => allergensHandler(e.target.value)}
                  />
                  {allergen.allergenInSpanish}
                </label>
              ))
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </div>
        <button
          className="md:px-26 m-2 mt-3 block rounded bg-button py-1 px-20 font-semibold text-white hover:bg-button_hover"
          type="submit"
          onClick={() => setValue("Edible.allergens", allergensList)}
        >
          Crear producto
        </button>
      </div>
    </form>
  );
}
