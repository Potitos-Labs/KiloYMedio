import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import { IProduct, productSchema } from "../../utils/validations/product";
import Listbox from "../Listbox";

export default function EdibleForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<IProduct>({
    resolver: zodResolver(productSchema),
  });

  const allergens = trpc.useQuery(["product.getAllergenInSpanish"]).data;

  const { mutateAsync } = trpc.useMutation(["product.createNewProduct"]);

  const onSubmit = useCallback(
    /*Cambiar */
    async (data: IProduct) => {
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
      <div className="m-10 w-full p-12 shadow-xl">
        <h2 className="mb-6 ml-6 cursor-default text-center text-xl font-bold text-blue-500">
          NUEVO PRODUCTO COMESTIBLE
        </h2>
        <div className="xs:grid-cols-1 m-6 grid place-content-between gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          <input
            type="text"
            placeholder="Origen del producto"
            className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
            {...register("Edible.origin")}
          />
          <input
            type="text"
            placeholder="Conservación"
            className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
            {...register("Edible.conservation")}
          />
          {/*Falta imagen */}
          <input
            type="number"
            placeholder="Precio/kg"
            className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
            {...register("Edible.price")}
          />
          <input
            type="number"
            placeholder="Stock"
            className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
            {...register("stock")}
          />
          <Listbox
            list={trpc
              .useQuery(["product.getEdibleCategoriesInSpanish"])
              .data?.map((ctaegory) => ctaegory.categoryInSpanish)}
          />
        </div>
        <h3>Información nutricional por cada 100gr</h3>
        <div className="xs:grid-cols-1 mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <textarea
            placeholder="Ingredientes"
            className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8 sm:col-span-2 md:col-span-4"
            {...register("Edible.nutrittionFacts.ingredients")}
          />
          <input
            type="number"
            placeholder="Energía (kcal)"
            className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
            {...register("Edible.nutrittionFacts.energy")}
          />
          <input
            type="number"
            placeholder="Grasas"
            className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
            {...register("Edible.nutrittionFacts.fat")}
          />
          <input
            type="number"
            placeholder="Hidratos de carbono"
            className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
            {...register("Edible.nutrittionFacts.carbohydrates")}
          />
          <input
            type="number"
            placeholder="Proteina"
            className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
            {...register("Edible.nutrittionFacts.protein")}
          />
          <h3>Alérgenos</h3>
        </div>
        <div className="xs:grid-cols-2 grid md:grid-cols-4">
          {allergens ? (
            allergens.map((allergen) => (
              <label key={allergen.allergen}>
                <input
                  type="checkbox"
                  className="mb-4 border-l-4 border-l-blue-500 bg-gray-100 py-1 px-8"
                  {...register("Edible.allergens")} /*Arreglar esto */
                />
                {allergen.allergenInSpanish}
              </label>
            ))
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    </form>
  );
}
