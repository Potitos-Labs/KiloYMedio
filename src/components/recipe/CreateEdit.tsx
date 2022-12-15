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
import { IngredientUnit, RecipeDifficulty } from "@prisma/client";
import TimeSpanForm from "@components/ui/TimeSpanForm";
import IncDecButtons from "@components/ui/IncDecButtons";
import { UploadImageRecipe } from "@components/ui/UploadImageRecipe";
import { FaTimes } from "react-icons/fa";
import DropdownCheckAllergen from "@components/ui/dropdownCheckAllergen";
import { AllergenComponent } from "../Allergens";

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
    getValues,
    formState: { errors },
  } = useForm<ICreateRecipe>({
    resolver: zodResolver(createRecipeSchema),
    criteriaMode: "all",
    defaultValues: recipe,
  });

  const { data: allergensFromProducts } =
    trpc.product.getAlergensFromProduct.useQuery(
      getValues("ingredients").map((i) => ({ productName: i.name })),
    );

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

  const difficultyOptions: Record<RecipeDifficulty, string> = {
    easy: "Fácil",
    moderate: "Medio",
    hard: "Difícil",
  };

  const { data: allergens } =
    trpc.product.getAllergenInSpanishDictionary.useQuery();

  return (
    <>
      <div className="sm:mr-none mr-[5px] mt-[50px] ml-[20px] max-w-[769px] font-raleway text-[28px] sm:mr-0 sm:text-[38px] md:ml-[80px]  md:text-xl">
        COMPARTE TU RECETA EN UNOS SENCILLOS PASOS
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-12 ml-[20px] md:ml-[80px]">
          {/*Details*/}
          <section className="grid grid-cols-1 xl:grid-cols-[50%_50%]">
            <div className="grid grid-cols-1">
              <section className="flex flex-col gap-6">
                {/* Title */}
                <div className="flex flex-col gap-[20px] sm:gap-[30px]">
                  <div className="font-raleway text-[20px] sm:text-lg ">
                    PONLE NOMBRE A TU RECETA
                  </div>
                  <input
                    className="input input-bordered mr-[20px] rounded-[30px] border-base-300 text-sm text-base-300 sm:mr-[50px] sm:h-[60px]"
                    type="text"
                    placeholder="Título"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="-mt-4 flex text-xs text-red-500 sm:-mt-6 sm:text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                {/* Title End*/}
                {/* Info */}
                <div className="mt-4 font-raleway text-[20px] sm:mt-8 sm:text-lg">
                  TIEMPO Y PORCIONES
                </div>
                <div
                  className="gap-y-[20px] gap-x-[10px]  text-start 
                  sm:grid sm:auto-cols-auto 
                  
                sm:grid-cols-[45%-55%] sm:grid-rows-[35%-35%-15%-15%] md:grid-cols-[30%_35%_35%] md:grid-rows-4 xl:w-1/2"
                >
                  {/* Grid Row 1: Preparation time */}
                  <div className=" col-start-1 row-start-1 mb-1 self-start pt-0  text-[18px] sm:mb-0 sm:pt-3 sm:text-sm md:self-center md:pt-0 md:text-lg">
                    Tiempo de preparación:
                  </div>
                  <div className="col-start-2 row-start-1 mr-5 self-center text-xs sm:text-sm md:col-span-2 md:text-lg">
                    <TimeSpanForm control={control} label={"preparationTime"} />
                    {errors.preparationTime && (
                      <p className="flex text-xs text-red-500 sm:text-sm">
                        {errors.preparationTime?.minute?.message}
                      </p>
                    )}
                  </div>
                  {/* End Grid Row 1: Preparation time */}

                  {/* Grid Row 2: Cooking time */}
                  <div className="col-start-1 row-start-2 mb-1 self-start pt-4 text-[18px] sm:mb-0 sm:text-sm md:self-center md:pt-0 md:text-lg">
                    Tiempo de cocinado:
                  </div>
                  <div className="col-start-2 row-start-2 mr-5 self-center text-xs sm:text-sm md:col-span-2 md:text-lg">
                    <TimeSpanForm control={control} label={"cookingTime"} />
                    {errors.cookingTime && (
                      <p className="flex text-xs text-red-500 sm:text-sm">
                        {errors.cookingTime?.minute?.message}
                      </p>
                    )}
                  </div>
                  {/* End Grid Row 2: Cooking time */}

                  {/* Grid Row 3: Portions */}
                  <div className="col-start-1 row-start-3 mb-1 self-center pt-4 text-[18px] sm:mb-0  sm:pt-0 sm:text-sm md:text-lg">
                    Porciones:
                  </div>
                  <div className="col-start-2 row-start-3 mr-5 flex flex-row items-center gap-2 self-center text-xs sm:text-sm md:text-lg ">
                    <Controller
                      name="portions"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <IncDecButtons
                          setAmount={onChange}
                          amount={value}
                          max={15}
                          unit="pers"
                          className="h-[40px] w-[110px]  rounded-[30px] border-[1px] border-base-300 sm:h-[60px] sm:w-[150px]"
                          onBlur={onBlur}
                        ></IncDecButtons>
                      )}
                    ></Controller>

                    <p className="text-xs sm:text-sm md:text-lg"> pers</p>
                    {errors.portions && (
                      <p className="flex text-xs text-red-500 sm:text-sm">
                        {errors.portions.message}
                      </p>
                    )}
                  </div>
                  {/* End Grid Row 3: Portions */}

                  {/* Grid Row 4: Difficulty */}
                  <div className="col-start-1 row-start-4 mb-1 self-center pt-4 text-[18px] sm:mb-0 sm:pt-0 sm:text-sm md:text-lg">
                    Dificultad:
                  </div>
                  <div className=" col-start-2 row-start-4 mr-5 text-xs sm:text-sm md:text-lg">
                    <Controller
                      name={`difficulty`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <ListboxDesign
                          onChange={onChange}
                          value={value}
                          list={difficultyOptions}
                          order="normal"
                        ></ListboxDesign>
                      )}
                    ></Controller>
                  </div>

                  {/* End Grid Row 4: Difficulty */}
                </div>
              </section>
            </div>
            {/* Image */}
            <div className="grid-cols col-start-1 mt-12 grid sm:mt-0 xl:col-start-2 xl:ml-8">
              <div className="font-raleway text-[20px] sm:text-lg">
                AÑADE UNA FOTO
              </div>
              <div className="mt-6 grid place-content-center text-center sm:mt-[35px] sm:block">
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
                  <p className="flex text-xs text-red-500 sm:text-sm">
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
            <div className="flex max-w-[700px] flex-col gap-[15px] sm:gap-[30px]">
              <div className="font-raleway text-[20px] sm:text-lg">
                DESCRIPCIÓN
              </div>
              <textarea
                className="textarea textarea-bordered mr-5 h-[120px] rounded-[30px] border-base-300 text-sm leading-[30px] text-base-300"
                {...register("description", {})}
              />
              {errors.name && (
                <p className="-mt-6 flex text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Description End*/}

            {/* Ingredients */}
            <div className="w-full gap-2">
              <div>
                <div className="mb-[20px] mt-8 font-raleway text-[20px] sm:text-lg">
                  AÑADE INGREDIENTES
                </div>

                <div className="flex flex-col gap-3" ref={listRef}>
                  {fieldsIngredients.map((field, index) => {
                    return (
                      <div key={field.id}>
                        <section className="section flex flex-col gap-3 sm:flex-row">
                          <div className="mr-5 flex flex-col sm:mr-0">
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
                              <p className="flex text-xs text-red-500 sm:text-sm">
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
                                  className="h-[40px] w-[110px] rounded-[30px] border-[1px] border-base-300 sm:h-[60px] sm:w-[150px]"
                                  onBlur={onBlur}
                                ></IncDecButtons>
                              )}
                            ></Controller>
                            {errors.ingredients?.[index] && (
                              <p className="flex text-xs text-red-500 sm:text-sm">
                                {errors.ingredients?.[index]?.amount?.message}
                              </p>
                            )}
                          </div>
                          <div className="pr-5 text-sm sm:flex sm:pr-0">
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
                <p className="flex text-xs text-red-500 sm:text-sm">
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
                  <label className="text-[18px] hover:cursor-pointer sm:text-lg">
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

              <div className="mr-5 flex flex-col gap-3 sm:mr-0" ref={listRef2}>
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
                            <p className="flex text-xs text-red-500 sm:text-sm">
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
              <p className="flex text-xs text-red-500 sm:text-sm">
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
                <label className="text-[18px] hover:cursor-pointer sm:text-lg ">
                  Añadir paso
                </label>
              </button>
            </div>
            {/* Directions End*/}
          </section>
          <section className="flex flex-col gap-3">
            {/* Allergens */}
            <div>
              <div className="mt-8 mb-[20px] font-raleway text-lg">
                ¿TU RECETA CONTIENE ALÉRGENOS?
              </div>
              <div className="flex pr-5 text-xs sm:max-w-full sm:pr-0 sm:text-sm">
                {allergens && (
                  <Controller
                    name={"allergens"}
                    control={control}
                    render={({ field: { onChange } }) => (
                      <DropdownCheckAllergen
                        allergens={allergens}
                        productAllergens={allergensFromProducts ?? []}
                        onChange={onChange}
                      ></DropdownCheckAllergen>
                    )}
                  ></Controller>
                )}
              </div>
              <div className="ml-5 mt-2 grid max-w-[300px] grid-cols-5">
                {getValues("allergens")?.map((allergen) => (
                  <div className="py-2 align-middle" key={allergen}>
                    <AllergenComponent allergen={allergen} size={40} />
                  </div>
                ))}
              </div>
              {/* <div className="text-sm text-red-500">
                Si alguien sabe hacer un dropdown con checks, please send help
              </div> */}
            </div>
            {/* End Allergens */}
          </section>
          {/*End Recipe*/}
          {/* Button */}
          <div className="mt-3 flex flex-row-reverse justify-end gap-2 pb-6 sm:mt-0 sm:justify-start sm:gap-5 md:flex-row">
            <button
              className="btn flex h-[40px] w-[170px] rounded-[30px] bg-transparent font-raleway text-sm hover:bg-transparent sm:h-[60px] sm:w-[220px] md:mt-6"
              type="button"
              onClick={() => router.push("/recipe")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn flex h-[40px] w-[170px] rounded-[30px] font-raleway text-sm text-base-100 sm:mt-6 sm:h-[60px] sm:w-[220px]"
            >
              {buttonText}
            </button>
          </div>
          {/* Button End */}
        </div>
      </form>
    </>
  );
}
