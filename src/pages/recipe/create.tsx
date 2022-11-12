import { UploadImage } from "@components/ui/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContextInner } from "@server/trpc/context";
import { appRouter } from "@server/trpc/router/_app";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";

import superjson from "superjson";
import Layout from "../../components/Layout";
import IncDecRecipe from "../../components/ui/IncDecRecipe";
import ListboxDesign from "../../components/ui/ListboxDesign";
import { trpc } from "../../utils/trpc";
import {
  ICreateRecipe,
  createRecipeSchema,
} from "../../utils/validations/recipe";

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  const units = await ssg.recipe.getIngredientUnitInSpanish.fetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
      units,
    },
    revalidate: 1,
  };
}
export default function CreateRecipe(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  //   const { data: allProducts } = trpc.product.getAllProducts.useQuery();
  const { units } = props;

  const { mutateAsync } = trpc.recipe.create.useMutation();

  function onSubmit() {
    handleSubmit(async (recipe) => {
      await mutateAsync(recipe);
    });
  }

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICreateRecipe>({
    resolver: zodResolver(createRecipeSchema),
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    defaultValues: {
      timeSpan: { hour: 0, minute: 1 },
      portions: 1,
      ingredients: [{ amount: 1, unit: "unit" }],
      directions: [{ direction: "", index: 0 }],
    },
  });

  const {
    fields: fieldsIngredients,
    append: appendIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: fieldsDirections,
    append: appendDirections,
    remove: removeDirections,
  } = useFieldArray({
    control,
    name: "directions",
  });

  console.log(watch());
  console.log({ errors });

  return (
    <Layout>
      <section>
        <div className="mt-12 pl-10">
          {/*Details*/}
          <section className="flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-row items-center gap-2">
              <div className="text-lg">Título </div>
              <input
                className="input input-bordered max-h-8 border-black"
                type="text"
                placeholder="Título"
                {...register("name")}
              />
            </div>
            {/* Title End*/}
            {/* Difficulty */}
            <div className="flex flex-row items-center gap-2">
              <div className="text-lg">Dificultad </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="easy"
                    className="radio radio-sm border-black checked:bg-blue-500"
                    {...register("difficulty")}
                  />
                  <span className="label-text pl-2">Baja</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="moderate"
                    className="radio radio-sm border-black checked:bg-blue-500"
                    {...register("difficulty")}
                  />
                  <span className="label-text pl-2">Media</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="hard"
                    className="radio radio-sm border-black checked:bg-blue-500"
                    {...register("difficulty")}
                  />
                  <span className="label-text pl-2">Alta</span>
                </label>
              </div>
            </div>
            {/* Difficulty End*/}

            {/* Time Span */}
            <div className="flex flex-row items-center gap-2">
              <div className="text-lg">Duración </div>
              <Controller
                name="timeSpan.hour"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <IncDecRecipe
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    maxValue={23}
                  ></IncDecRecipe>
                )}
              ></Controller>
              <p className="pr-5">horas</p>
              <Controller
                name="timeSpan.minute"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <IncDecRecipe
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    maxValue={59}
                  ></IncDecRecipe>
                )}
              ></Controller>
              <p>minutos</p>
            </div>
            {/* Time Span End*/}

            {/* Portions */}
            <div className="flex flex-row items-center gap-2">
              <div className="text-lg">Raciones </div>
              <Controller
                name="portions"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <IncDecRecipe
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    maxValue={15}
                  ></IncDecRecipe>
                )}
              ></Controller>
            </div>
            {/* Portions End*/}

            {/* Image */}
            <Controller
              name="imageURL"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <UploadImage setImageURL={onChange} />
                  <Image
                    src={value}
                    alt={value}
                    height={100}
                    width={100}
                    layout="fixed"
                    objectFit="cover"
                  />
                </>
              )}
            ></Controller>
            {/* Image End */}
          </section>
          {/*End Details*/}

          {/*Recipe*/}
          <section className="flex flex-col gap-6 pt-6">
            {/* Description */}
            <div>
              <div className="text-lg">Descripción </div>
              <textarea
                className="textarea textarea-bordered w-80 border-black"
                {...register("description", {})}
              />
            </div>
            {/* Description End*/}

            {/* Ingredients */}
            <div className="flex w-full flex-row gap-2">
              <div>
                <div className="w-full text-lg">Ingredientes </div>

                <div className="flex flex-col gap-2">
                  {fieldsIngredients.map((field, index) => {
                    return (
                      <div key={field.id}>
                        <section className="section flex flex-row gap-3">
                          <div className="flex flex-col justify-center">
                            <input
                              placeholder="Ingrediente"
                              className="input input-bordered max-h-8 border-black"
                              {...register(`ingredients.${index}.name`)}
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <Controller
                              name={`ingredients.${index}.amount`}
                              control={control}
                              render={({
                                field: { onChange, onBlur, value, ref },
                              }) => (
                                <IncDecRecipe
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                  ref={ref}
                                  maxValue={999}
                                ></IncDecRecipe>
                              )}
                            ></Controller>
                          </div>
                          <div className="flex flex-col">
                            <Controller
                              name={`ingredients.${index}.unit`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <ListboxDesign
                                  onChange={onChange}
                                  value={value}
                                  list={units}
                                ></ListboxDesign>
                              )}
                            ></Controller>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeIngredients(index)}
                          >
                            <FaTimes className="text-xl text-red-600"></FaTimes>
                          </button>
                        </section>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    appendIngredients({
                      name: "",
                      amount: 1,
                      unit: "unit",
                    })
                  }
                  className="inline-flex items-center gap-2 pt-2"
                >
                  <FaPlus></FaPlus>
                  Agregar ingrediente
                </button>
              </div>
            </div>
            {/* Ingredients End*/}

            {/* Directions */}
            <div>
              <div className="text-lg">Pasos </div>

              <div className="flex flex-col gap-2">
                {fieldsDirections.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <section className="section flex flex-row gap-3">
                        <div>{index + 1 + "."}</div>
                        <div className="flex flex-col justify-center">
                          <textarea
                            placeholder="Paso"
                            className="input input-bordered w-80 border-black"
                            {...register(`directions.${index}.direction`)}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDirections(index)}
                        >
                          <FaTimes className="text-xl text-red-600"></FaTimes>
                        </button>
                      </section>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() =>
                  appendDirections({
                    direction: "",
                    index: 0,
                  })
                }
                className="inline-flex items-center gap-2 pt-2"
              >
                <FaPlus></FaPlus>
                Agregar paso
              </button>
            </div>
            {/* Directions End*/}
          </section>
          {/*End Recipe*/}
          <button
            className="btn mt-6 border-black bg-button capitalize text-black hover:bg-button_hover"
            onClick={() => onSubmit()}
          >
            Crear receta
          </button>
        </div>
      </section>
    </Layout>
  );
}
