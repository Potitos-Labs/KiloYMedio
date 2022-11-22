import ProductSearchBar from "@components/recipe/ProductSearchBar";
import { UploadImage } from "@components/ui/UploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import router from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import IncDecRecipe from "../../components/ui/IncDecRecipe";
import ListboxDesign from "../../components/ui/ListboxDesign";
import { trpc } from "../../utils/trpc";
import {
  ICreateRecipe,
  IUpdateRecipe,
  createRecipeSchema,
} from "../../utils/validations/recipe";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IngredientUnit } from "@prisma/client";

const defaultRecipe: ICreateRecipe = {
  timeSpan: { hour: 0, minute: 1 },
  portions: 1,
  ingredients: [{ name: "", amount: 1, unit: "tablespoon" }],
  directions: [{ direction: "", index: 0 }],
  description: "",
  difficulty: "easy",
  imageURL: "",
  name: "",
};

export default function CreateEdit(props: {
  units: Record<IngredientUnit, string>;
  recipe?: IUpdateRecipe;
}) {
  const { units, recipe = defaultRecipe } = props;
  const { mutateAsync: createMutation } = trpc.recipe.create.useMutation();
  const { mutateAsync: updateMutation } = trpc.recipe.update.useMutation();

  async function onSubmit(recipe: ICreateRecipe) {
    if (!!props.recipe) {
      // If we are editing a recipe
      await updateMutation({ ...recipe, id: props.recipe.id });
    } else {
      await createMutation(recipe);
    }
    router.push("/recipe");
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateRecipe>({
    resolver: zodResolver(createRecipeSchema),
    criteriaMode: "all",
    defaultValues: recipe,
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

  const [listRef] = useAutoAnimate<HTMLDivElement>();
  const [listRef2] = useAutoAnimate<HTMLDivElement>();

  const buttonText = props.recipe ? "Guardar" : "Crear receta";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              {errors.name && (
                <p className="flex text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
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
                    defaultChecked={true}
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <IncDecRecipe
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      maxValue={23}
                    ></IncDecRecipe>
                  </>
                )}
              ></Controller>
              <p className="pr-5">horas</p>
              <Controller
                name="timeSpan.minute"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IncDecRecipe
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    maxValue={59}
                  ></IncDecRecipe>
                )}
              ></Controller>
              <p>minutos</p>
              {errors.timeSpan && (
                <p className="flex text-sm text-red-500">
                  {errors.timeSpan?.minute?.message}
                </p>
              )}
            </div>
            {/* Time Span End*/}

            {/* Portions */}
            <div className="flex flex-row items-center gap-2">
              <div className="text-lg">Raciones </div>
              <Controller
                name="portions"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <IncDecRecipe
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    maxValue={15}
                  ></IncDecRecipe>
                )}
              ></Controller>
              {errors.portions && (
                <p className="flex text-sm text-red-500">
                  {errors.portions.message}
                </p>
              )}
            </div>
            {/* Portions End*/}

            {/* Image */}
            <div className="flex flex-row">
              <Controller
                name="imageURL"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <UploadImage setImageURL={onChange} />
                    <Image
                      src={value ?? "/img/placeholder.jpg"}
                      alt={value}
                      height={100}
                      width={100}
                      layout="fixed"
                      objectFit="cover"
                    />
                  </>
                )}
              ></Controller>
              {errors.imageURL && (
                <p className="flex text-sm text-red-500">
                  {errors.imageURL?.message}
                </p>
              )}
            </div>
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

                <div className="flex flex-col gap-2" ref={listRef}>
                  {fieldsIngredients.map((field, index) => {
                    return (
                      <div key={field.id}>
                        <section className="section flex flex-row gap-3">
                          <div className="flex flex-col justify-center">
                            <Controller
                              name={`ingredients.${index}.name`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <ProductSearchBar
                                  value={value}
                                  setValue={onChange}
                                ></ProductSearchBar>
                              )}
                            ></Controller>
                            {errors.ingredients?.[index] && (
                              <p className="flex text-sm text-red-500">
                                {errors.ingredients?.[index]?.name?.message}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <Controller
                              name={`ingredients.${index}.amount`}
                              control={control}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <IncDecRecipe
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                  maxValue={999}
                                ></IncDecRecipe>
                              )}
                            ></Controller>
                            {errors.ingredients?.[index] && (
                              <p className="flex text-sm text-red-500">
                                {errors.ingredients?.[index]?.amount?.message}
                              </p>
                            )}
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
                <p className="flex text-sm text-red-500">
                  {errors.ingredients?.message}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    appendIngredients({
                      name: "",
                      amount: 1,
                      unit: "tablespoon",
                    })
                  }
                  className="inline-flex items-center gap-2 pt-2"
                >
                  <FaPlus></FaPlus>
                  Añadir ingrediente
                </button>
              </div>
            </div>
            {/* Ingredients End*/}

            {/* Directions */}
            <div>
              <div className="text-lg">Pasos </div>

              <div className="flex flex-col gap-2" ref={listRef2}>
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
                          {errors.directions?.[index] && (
                            <p className="flex text-sm text-red-500">
                              {errors.directions?.[index]?.direction?.message}
                            </p>
                          )}
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
              <p className="flex text-sm text-red-500">
                {errors.directions?.message}
              </p>
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
          {/* Button */}
          <div className="flex gap-5 pb-6">
            <button
              className="btn mt-6 border-black bg-button text-black hover:bg-button_hover"
              type="button"
              onClick={() => router.push("/recipe")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn mt-6 border-black bg-button text-black hover:bg-button_hover"
            >
              {buttonText}
            </button>
          </div>
          {/* Button End */}
        </div>
      </section>
    </form>
  );
}
