import ProductSearchBar from "@components/recipe/ProductSearchBar";
import { zodResolver } from "@hookform/resolvers/zod";
import router from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ListboxDesign from "../../components/ui/ListboxDesign";
import { trpc } from "../../utils/trpc";
import {
  ICreateRecipe,
  IUpdateRecipe,
  createRecipeSchema,
} from "../../utils/validations/recipe";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IngredientUnit } from "@prisma/client";
import TimeSpanForm from "@components/ui/TimeSpanForm";
import Layout from "@components/Layout";
import IncDecButtons from "@components/ui/IncDecButtons";
import { Listbox } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { useState } from "react";
import { UploadImageRecipe } from "@components/ui/UploadImageRecipe";
import { FaTimes } from "react-icons/fa";

const defaultRecipe: ICreateRecipe = {
  cookingTime: { hour: 0, minute: 1 },
  preparationTime: { hour: 0, minute: 1 },
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
    watch,
    formState: { errors },
  } = useForm<ICreateRecipe>({
    resolver: zodResolver(createRecipeSchema),
    criteriaMode: "all",
    defaultValues: recipe,
  });
  console.log(watch());

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

  const difficultyOptions = [
    { value: "easy", label: "Fácil" },
    { value: "moderate", label: "Medio" },
    { value: "hard", label: "Difícil" },
  ];

  const [selectedDifficulty, setSelectedDifficulty] = useState(
    difficultyOptions[0],
  );

  return (
    <Layout bgColor={"bg-base-100"} headerBgLight={true} headerTextDark={true}>
      <div className="mt-[50px] ml-[80px] max-w-[769px] font-raleway text-xl">
        COMPARTE TU RECETA EN UNOS SENCILLOS PASOS
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-12 ml-[80px]">
          {/*Details*/}
          <section className="grid grid-cols-1 gap-8 xl:grid-cols-[50%_50%]">
            <div className="grid grid-cols-1">
              <section className="flex flex-col gap-6">
                {/* Title */}
                <div className="flex flex-col gap-[30px]">
                  <div className="font-raleway text-lg">
                    PONLE NOMBRE A TU RECETA
                  </div>
                  <input
                    className="input input-bordered mr-[50px] h-[60px] rounded-[30px] border-base-300 text-sm text-base-300"
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
                {/* Info */}
                <div className="mt-8 font-raleway text-lg">
                  TIEMPO Y PORCIONES
                </div>
                <div className="grid auto-cols-auto grid-cols-[30%_35%_35%] grid-rows-4 gap-y-[20px] gap-x-[10px] text-start">
                  {/* Grid Row 1: Preparation time */}
                  <div className="col-start-1 row-start-1 self-center text-lg">
                    Tiempo de preparación:
                  </div>
                  <div className="col-span-2 self-center text-lg">
                    <TimeSpanForm control={control} label={"preparationTime"} />
                    {errors.preparationTime && (
                      <p className="flex text-sm text-red-500">
                        {errors.preparationTime?.minute?.message}
                      </p>
                    )}
                  </div>
                  {/* End Grid Row 1: Preparation time */}

                  {/* Grid Row 2: Cooking time */}
                  <div className="col-start-1 row-start-2 self-center text-lg">
                    Tiempo de cocinado:
                  </div>
                  <div className="col-span-2 self-center text-lg">
                    <TimeSpanForm control={control} label={"cookingTime"} />
                    {errors.cookingTime && (
                      <p className="flex text-sm text-red-500">
                        {errors.cookingTime?.minute?.message}
                      </p>
                    )}
                  </div>
                  {/* End Grid Row 2: Cooking time */}

                  {/* Grid Row 3: Portions */}
                  <div className="col-start-1 row-start-3 self-center text-lg">
                    Porciones:
                  </div>
                  <div className="flex flex-row items-center gap-2 self-center text-lg">
                    <Controller
                      name="portions"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <IncDecButtons
                          setAmount={onChange}
                          amount={value}
                          max={15}
                          unit="pers"
                          className="h-[60px] w-[150px] rounded-[30px] border-[1px] border-base-300"
                          onBlur={onBlur}
                        ></IncDecButtons>
                      )}
                    ></Controller>
                    <p className="text-lg"> pers</p>
                    {errors.portions && (
                      <p className="flex text-sm text-red-500">
                        {errors.portions.message}
                      </p>
                    )}
                  </div>
                  {/* End Grid Row 3: Portions */}

                  {/* Grid Row 4: Difficulty */}
                  <div className="col-start-1 row-start-4 self-center text-lg">
                    Dificultad:
                  </div>
                  <div className="col-start-2 row-start-4">
                    <Listbox
                      value={selectedDifficulty}
                      onChange={setSelectedDifficulty}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">
                            {selectedDifficulty?.label}
                          </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {difficultyOptions.map((dif, difIdx) => (
                            <Listbox.Option
                              key={difIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-amber-100 text-amber-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={dif}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {dif.label}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <AiOutlineCheck
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>

                  {/* <div className="col-start-2 row-start-4">
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
                </div>
                <div className="col-start-3 row-start-4">
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
                </div>
                <div className="col-start-3 row-start-4">
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
                </div> */}
                  {/* End Grid Row 4: Difficulty */}
                </div>
              </section>
            </div>
            {/* Image */}
            <div className="grid-cols col-start-1 grid xl:col-start-2">
              <div className="font-raleway text-lg">AÑADE UNA FOTO</div>
              <div className="mt-[35px] text-center">
                <Controller
                  name="imageURL"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <div className="">
                        <UploadImageRecipe
                          setImageURL={onChange}
                          value={value}
                        />
                      </div>
                    </>
                  )}
                ></Controller>
                {errors.imageURL && (
                  <p className="flex text-sm text-red-500">
                    {errors.imageURL?.message}
                  </p>
                )}
              </div>
            </div>
            {/* Image End */}
          </section>
          {/*End Details*/}

          {/*Recipe*/}
          <section className="mt-8 flex flex-col gap-6">
            {/* Description */}
            <div className="flex max-w-[700px] flex-col gap-[30px]">
              <div className="font-raleway text-lg">DESCRIPCIÓN</div>
              <textarea
                className="textarea textarea-bordered mr-[50px] h-[120px] rounded-[30px] border-base-300 text-sm leading-[30px] text-base-300"
                {...register("description", {})}
              />
              {errors.name && (
                <p className="flex text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Description End*/}

            {/* Ingredients */}
            <div className="w-full gap-2">
              <div>
                <div className="mb-[20px] mt-8 font-raleway text-lg">
                  AÑADE INGREDIENTES
                </div>

                <div className="flex flex-col gap-3" ref={listRef}>
                  {fieldsIngredients.map((field, index) => {
                    return (
                      <div key={field.id}>
                        <section className="section flex gap-3">
                          <div className="flex justify-center">
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
                          <div className="flex text-lg text-neutral">
                            <Controller
                              name={`ingredients.${index}.amount`}
                              control={control}
                              render={({
                                field: { onChange, onBlur, value },
                              }) => (
                                <IncDecButtons
                                  setAmount={onChange}
                                  amount={value}
                                  max={999}
                                  unit="other"
                                  className="h-[60px] w-[150px] rounded-[30px] border-[1px] border-base-300"
                                  onBlur={onBlur}
                                ></IncDecButtons>
                              )}
                            ></Controller>
                            {errors.ingredients?.[index] && (
                              <p className="flex text-sm text-red-500">
                                {errors.ingredients?.[index]?.amount?.message}
                              </p>
                            )}
                          </div>
                          <div className="flex text-sm">
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
                            <FaTimes className="text-[35px] text-red-600"></FaTimes>
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
                  className="inline-flex items-center gap-2 pt-4"
                >
                  <label className="h-[40px] w-[40px] rounded-full border-none bg-[#AEAAA6] pt-0.5 text-[35px] leading-none text-base-100 hover:cursor-pointer">
                    +
                  </label>
                  <label className="text-lg hover:cursor-pointer">
                    Añadir ingrediente
                  </label>
                </button>
              </div>
            </div>
            {/* Ingredients End*/}

            {/* Directions */}
            <div>
              <div className="mb-[30px] mt-8 font-raleway text-lg">
                AÑADE PASOS
              </div>

              <div className="flex flex-col gap-3" ref={listRef2}>
                {fieldsDirections.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <section className="section flex w-full gap-3">
                        <div className="items-center text-sm">
                          {index + 1 + "."}
                        </div>
                        <div className="flex w-[570px] flex-col justify-center">
                          <textarea
                            placeholder="Paso"
                            className="textarea textarea-bordered h-[110px] rounded-[30px] border-base-300 text-sm leading-[30px] text-base-300"
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
                          <FaTimes className="text-[35px] text-red-600"></FaTimes>
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
                className="inline-flex items-center gap-2 pt-4"
              >
                <label className="h-[40px] w-[40px] rounded-full border-none bg-[#AEAAA6] pt-0.5 text-[35px] leading-none text-base-100 hover:cursor-pointer">
                  +
                </label>
                <label className="text-lg hover:cursor-pointer">
                  Añadir paso
                </label>
              </button>
            </div>
            {/* Directions End*/}
          </section>
          <section className="flex flex-col gap-3">
            {/* Allergens */}
            <div>
              <div className="mt-8 font-raleway text-lg">
                ¿TU RECETA CONTIENE ALÉRGENOS?
              </div>
              <div className="text-sm text-red-500">
                Si alguien sabe hacer un dropdown con checks, please send help
              </div>
            </div>
            {/* End Allergens */}
          </section>
          {/*End Recipe*/}
          {/* Button */}
          <div className="flex gap-5 pb-6">
            <button
              className="btn mt-6 h-[60px] w-[220px] rounded-[30px] bg-transparent font-raleway text-sm hover:bg-transparent"
              type="button"
              onClick={() => router.push("/recipe")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn mt-6 h-[60px] w-[220px] rounded-[30px] font-raleway text-sm text-base-100"
            >
              {buttonText}
            </button>
          </div>
          {/* Button End */}
        </div>
      </form>
    </Layout>
  );
}
